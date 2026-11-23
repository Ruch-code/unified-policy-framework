import { Resend } from 'resend';
import { markdownToHtml } from './markdown.js';
import { Subscriber, Newsletter, Delivery, CONFIRMED, getFrom, SITE, escapeHtml, unsubscribeUrl, signLink } from './newsletter.js';

const resendClient = () => (process.env.RESEND_API_KEY ? new Resend(process.env.RESEND_API_KEY) : null);

const shell = (inner, unsubUrl) => `
<div style="font-family:Arial,Helvetica,sans-serif;max-width:600px;margin:auto;padding:24px;background:#ffffff">
  <p style="margin:0 0 16px;font-size:13px;color:#475569;font-weight:bold">OneLens by Ruchi</p>
  ${inner}
  <hr style="border:none;border-top:1px solid #e2e8f0;margin:24px 0" />
  <p style="color:#64748b;font-size:12px;margin:0">You are receiving this because you subscribed to the OneLens newsletter.</p>
  ${unsubUrl ? `<p style="margin:6px 0 0"><a href="${unsubUrl}" style="color:#64748b;font-size:12px">Unsubscribe</a></p>` : ''}
</div>`;

const button = (href, label) => `<a href="${href}" style="display:inline-block;margin:8px 0 16px;background:#1e3a5f;color:#ffffff;text-decoration:none;padding:10px 18px;border-radius:4px;font-weight:bold">${label}</a>`;

export const issueUrl = (issue) => `${SITE}/newsletter/${issue.slug || issue._id}`;

export function renderIssue(issue, unsubUrl) {
  const inner = `<h1 style="font-size:24px;margin:0 0 12px;color:#0f172a">${escapeHtml(issue.title)}</h1>
  ${markdownToHtml(issue.body, { email: true })}
  <p style="margin:16px 0 0;font-size:13px"><a href="${issueUrl(issue)}" style="color:#1d4ed8">Read this issue on the web</a></p>`;
  return shell(inner, unsubUrl);
}

const listHeaders = (unsubUrl) => (unsubUrl ? { 'List-Unsubscribe': `<${unsubUrl}>`, 'List-Unsubscribe-Post': 'List-Unsubscribe=One-Click' } : undefined);

export async function sendOne({ to, subject, html, unsubUrl }) {
  const r = resendClient();
  if (!r) throw new Error('RESEND_API_KEY is not set');
  const { error } = await r.emails.send({ from: getFrom(), to: [to], subject, html, headers: listHeaders(unsubUrl) });
  if (error) throw new Error(error.message || 'Send failed');
}

export async function sendConfirm(sub) {
  const url = `${SITE}/api/newsletter/confirm?t=${signLink(sub.email, 'confirm', sub.tokenVersion || 1)}`;
  const inner = `<h1 style="font-size:22px;margin:0 0 12px;color:#0f172a">Confirm your subscription</h1>
  <p style="margin:0 0 12px;line-height:1.6;color:#1f2937">Please confirm you want one practical GRC note every two weeks. The link works for 3 days.</p>
  ${button(url, 'Confirm subscription')}
  <p style="margin:0;color:#64748b;font-size:12px">If you did not sign up, ignore this email and nothing will happen.</p>`;
  await sendOne({ to: sub.email, subject: 'Confirm your OneLens newsletter subscription', html: shell(inner) });
}

export async function sendWelcome(sub) {
  const unsub = unsubscribeUrl(sub);
  const inner = `<h1 style="font-size:22px;margin:0 0 12px;color:#0f172a">You are subscribed</h1>
  <p style="margin:0 0 12px;line-height:1.6;color:#1f2937">Thanks for confirming. As promised, here is the 113-control cross-framework mapping.</p>
  ${button(`${SITE}/OneLens_Control_Mapping.xlsx`, 'Download the mapping (Excel)')}
  <p style="margin:0 0 12px;line-height:1.6;color:#1f2937">Past issues are at <a href="${SITE}/newsletter" style="color:#1d4ed8">${SITE.replace(/^https?:\/\//, '')}/newsletter</a>.</p>`;
  await sendOne({ to: sub.email, subject: 'Welcome to the OneLens newsletter', html: shell(inner, unsub), unsubUrl: unsub });
}

// Sends an issue to confirmed subscribers. Safe to call again: each (issue, round, email) is claimed once
// in the delivery log before sending, so a retry or a second run never emails the same person twice.
// Stops after maxPerRun recipients so it fits in a function's time limit; the next run continues.
export async function deliverIssue(issueId, { maxPerRun = 400, batchSize = 50, pauseMs = 600 } = {}) {
  const issue = await Newsletter.findById(issueId);
  if (!issue) return { done: true, sent: 0, failed: 0 };
  const round = issue.sendRound || 1;
  const already = new Set((await Delivery.find({ issueId, round }).select('email').lean()).map((d) => d.email));
  const subs = (await Subscriber.find(CONFIRMED).select('email tokenVersion').lean()).filter((s) => !already.has(s.email));
  const todo = subs.slice(0, maxPerRun);
  let sent = 0; let failed = 0;
  for (let i = 0; i < todo.length; i += batchSize) {
    const batch = todo.slice(i, i + batchSize);
    const claimed = [];
    for (const s of batch) {
      try { await Delivery.create({ issueId, round, email: s.email }); claimed.push(s); } catch { /* claimed by another run */ }
    }
    for (const s of claimed) {
      const unsub = unsubscribeUrl(s);
      try {
        await sendOne({ to: s.email, subject: issue.title, html: renderIssue(issue, unsub), unsubUrl: unsub });
        await Delivery.updateOne({ issueId, round, email: s.email }, { $set: { status: 'sent', sentAt: new Date() } });
        sent++;
      } catch (e) {
        await Delivery.updateOne({ issueId, round, email: s.email }, { $set: { status: 'failed', error: String(e.message).slice(0, 300) } });
        console.warn('Newsletter send failed', String(issue._id), s.email, e.message);
        failed++;
      }
    }
    if (i + batchSize < todo.length) await new Promise((r) => setTimeout(r, pauseMs));
  }
  const done = subs.length <= maxPerRun;
  const total = await Delivery.countDocuments({ issueId, round, status: 'sent' });
  const fails = await Delivery.countDocuments({ issueId, round, status: 'failed' });
  await Newsletter.updateOne({ _id: issueId }, { $set: done
    ? { status: 'sent', sentAt: new Date(), publishedAt: issue.publishedAt || new Date(), sentTo: total, failedCount: fails }
    : { status: 'sending', sentTo: total, failedCount: fails } });
  return { done, sent, failed, total };
}

export async function uniqueSlug(title, excludeId) {
  const { slugify } = await import('./newsletter.js');
  const base = slugify(title);
  let slug = base; let n = 2;
  // eslint-disable-next-line no-await-in-loop
  while (await Newsletter.exists({ slug, ...(excludeId ? { _id: { $ne: excludeId } } : {}) })) slug = `${base}-${n++}`;
  return slug;
}

// Sent when an admin rejects a pending account request. Neutral and short.
export async function sendAccessRejected(user) {
  const name = escapeHtml((user.name || '').split(' ')[0] || 'there');
  const inner = `<h1 style="font-size:22px;margin:0 0 12px;color:#0f172a">Access request not approved</h1>
  <p style="margin:0 0 12px;line-height:1.6;color:#1f2937">Hi ${name},</p>
  <p style="margin:0 0 12px;line-height:1.6;color:#1f2937">Thank you for your interest in OneLens. Your request for access has not been approved, and the account request has been closed.</p>
  <p style="margin:0;line-height:1.6;color:#1f2937">Regards,<br/>OneLens by Ruchi</p>`;
  const html = `<div style="font-family:Arial,Helvetica,sans-serif;max-width:600px;margin:auto;padding:24px;background:#ffffff">${inner}</div>`;
  await sendOne({ to: user.email, subject: 'Your OneLens access request', html });
}
