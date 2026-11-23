import { connectDb, json, authAdmin, Subscriber, Newsletter, Delivery, CONFIRMED, getSettings } from './_shared/newsletter.js';
import { renderIssue, sendOne, deliverIssue, uniqueSlug, issueUrl } from './_shared/mailer.js';
import { buildDigest } from './_shared/digest.js';

const linkedIn = (issue) => `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(issueUrl(issue))}`;
const pub = (d) => ({
  id: String(d._id), title: d.title, body: d.body, status: d.status || 'sent', kind: d.kind || 'manual',
  slug: d.slug || String(d._id), scheduledAt: d.scheduledAt, sentAt: d.sentAt || d.publishedAt, sentTo: d.sentTo || 0,
  failedCount: d.failedCount || 0, updatedAt: d.updatedAt, url: issueUrl(d), linkedInUrl: linkedIn(d),
});
const SETTING_KEYS = ['sendingPaused', 'scheduledSendingEnabled', 'digestEnabled', 'digestFrequency', 'digestDay', 'digestHour', 'digestNotify'];

// Admin-only. GET returns state; POST { action, ... } changes it.
export default async (req) => {
  try {
    await connectDb();
    const admin = await authAdmin(req);
    if (!admin) return json({ message: 'Not authorized.' }, 401);

    if (req.method === 'GET') {
      const [confirmed, pending, issues, s] = await Promise.all([
        Subscriber.countDocuments(CONFIRMED), Subscriber.countDocuments({ status: 'pending' }),
        Newsletter.find().sort({ updatedAt: -1 }).limit(100).lean(), getSettings(),
      ]);
      return json({ confirmed, pending, adminEmail: admin.email, issues: issues.map(pub),
        settings: { ...Object.fromEntries(SETTING_KEYS.map((k) => [k, s[k]])), sources: (s.sources || []).map((x) => ({ name: x.name, url: x.url })), lastDigestAt: s.lastDigestAt } });
    }
    if (req.method !== 'POST') return json({ message: 'Method not allowed.' }, 405);

    const b = await req.json().catch(() => ({}));
    const title = String(b.title || '').trim();
    const body = String(b.body || '').trim();
    const load = async () => (b.id ? Newsletter.findById(b.id) : null);

    switch (b.action) {
      case 'save': {
        if (!title || !body) return json({ message: 'Title and body are required.' }, 400);
        let doc = await load();
        if (doc && ['sent', 'sending'].includes(doc.status || 'sent')) return json({ message: 'A sent issue cannot be edited.' }, 409);
        if (!doc) doc = new Newsletter({ status: 'draft', kind: 'manual' });
        doc.title = title; doc.body = body;
        if (doc.status !== 'scheduled') doc.status = 'draft';
        doc.slug = await uniqueSlug(title, doc._id);
        await doc.save();
        return json({ message: 'Draft saved.', issue: pub(doc) });
      }
      case 'test': {
        if (!title || !body) return json({ message: 'Title and body are required.' }, 400);
        await sendOne({ to: admin.email, subject: `[Test] ${title}`, html: renderIssue({ title, body, slug: 'preview' }, null) });
        return json({ message: `Test sent to ${admin.email}.` });
      }
      case 'schedule': {
        const doc = await load();
        if (!doc) return json({ message: 'Save the draft first.' }, 400);
        if ((doc.status || 'sent') === 'sent' || doc.status === 'sending') return json({ message: 'This issue was already sent.' }, 409);
        const when = new Date(b.scheduledAt);
        if (Number.isNaN(when.getTime()) || when < new Date(Date.now() - 60000)) return json({ message: 'Pick a future date and time.' }, 400);
        if (title && body) { doc.title = title; doc.body = body; }
        doc.status = 'scheduled'; doc.scheduledAt = when;
        await doc.save();
        return json({ message: 'Scheduled.', issue: pub(doc) });
      }
      case 'unschedule': {
        const doc = await load();
        if (!doc || doc.status !== 'scheduled') return json({ message: 'This issue is not scheduled.' }, 400);
        doc.status = 'draft'; doc.scheduledAt = undefined;
        await doc.save();
        return json({ message: 'Moved back to drafts. It will not be sent.', issue: pub(doc) });
      }
      case 'delete-draft': {
        const doc = await load();
        if (!doc || doc.status !== 'draft') return json({ message: 'Only drafts can be deleted.' }, 400);
        await doc.deleteOne();
        return json({ message: 'Draft deleted.' });
      }
      case 'publish': {
        const s = await getSettings();
        if (s.sendingPaused) return json({ message: 'Sending is paused in settings. Turn it back on to publish.' }, 409);
        let doc = await load();
        if (!doc) {
          if (!title || !body) return json({ message: 'Title and body are required.' }, 400);
          doc = await Newsletter.create({ title, body, status: 'draft', kind: 'manual', slug: await uniqueSlug(title) });
        } else if (title && body && ['draft', 'scheduled'].includes(doc.status)) {
          doc.title = title; doc.body = body;
        }
        const st = doc.status || 'sent';
        if (st === 'sent' || st === 'sending') {
          if (!b.resend) return json({ message: 'This issue was already sent. Confirm "Resend" to send it again.', needsResend: true }, 409);
          doc.sendRound = (doc.sendRound || 1) + 1;
        }
        doc.status = 'sending'; doc.scheduledAt = undefined;
        await doc.save();
        const r = await deliverIssue(doc._id);
        const fresh = await Newsletter.findById(doc._id).lean();
        return json({ message: r.done ? `Sent to ${r.total} subscribers${r.failed ? ` (${r.failed} failed)` : ''}.` : `Sending started: ${r.total} so far. The rest go out in the next 15 minutes.`, issue: pub(fresh) });
      }
      case 'settings': {
        const s = await getSettings();
        for (const k of SETTING_KEYS) if (k in b.settings) s[k] = b.settings[k];
        if (Array.isArray(b.settings.sources)) {
          const prev = new Map((s.sources || []).map((x) => [x.url, x.lastSeenAt]));
          s.sources = b.settings.sources.filter((x) => /^https?:\/\//.test(x.url || '')).slice(0, 30)
            .map((x) => ({ name: String(x.name || '').slice(0, 80), url: String(x.url).slice(0, 500), lastSeenAt: prev.get(x.url) }));
        }
        await s.save();
        return json({ message: 'Settings saved.' });
      }
      case 'digest-now': {
        const r = await buildDigest({ force: true });
        return json({ message: r.created ? `Draft created: ${r.title}` : `No draft created (${r.reason}).` });
      }
      case 'subscribers': {
        const rows = await Subscriber.find().sort({ createdAt: -1 }).limit(5000)
          .select('email status source createdAt confirmedAt unsubscribedAt').lean();
        return json({ subscribers: rows.map((r) => ({
          id: String(r._id), email: r.email, source: r.source || '',
          status: r.status || (r.unsubscribedAt ? 'unsubscribed' : 'confirmed'),
          createdAt: r.createdAt, confirmedAt: r.confirmedAt, unsubscribedAt: r.unsubscribedAt,
        })) });
      }
      case 'unsubscribe-subscriber': {
        const sub = await Subscriber.findById(b.subId);
        if (!sub) return json({ message: 'Subscriber not found.' }, 404);
        sub.status = 'unsubscribed'; sub.unsubscribedAt = new Date();
        sub.tokenVersion = (sub.tokenVersion || 1) + 1;
        await sub.save();
        return json({ message: `${sub.email} unsubscribed.` });
      }
      case 'delete-subscriber': {
        const sub = await Subscriber.findByIdAndDelete(b.subId);
        if (!sub) return json({ message: 'Subscriber not found.' }, 404);
        return json({ message: `${sub.email} deleted.` });
      }
      case 'failures': {
        const rows = await Delivery.find({ issueId: b.id, status: 'failed' }).select('email error').limit(200).lean();
        return json({ failures: rows });
      }
      default:
        return json({ message: 'Unknown action.' }, 400);
    }
  } catch (err) {
    console.error('newsletter admin error', err);
    return json({ message: err.message || 'Something went wrong.' }, 500);
  }
};

export const config = { path: '/api/newsletter/admin' };
