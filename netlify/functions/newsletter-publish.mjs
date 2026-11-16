import { connectDb, json, authAdmin, Newsletter, getSettings } from './_shared/newsletter.js';
import { deliverIssue, uniqueSlug, issueUrl } from './_shared/mailer.js';

// Original "publish now" endpoint, kept for compatibility. It now sends only to confirmed
// subscribers, through the same once-only delivery log as the admin page.
export default async (req) => {
  try {
    if (req.method !== 'POST') return json({ message: 'Method not allowed.' }, 405);
    await connectDb();
    const admin = await authAdmin(req);
    if (!admin) return json({ message: 'Not authorized.' }, 401);
    if ((await getSettings()).sendingPaused) return json({ message: 'Sending is paused in settings.' }, 409);
    const { title, body } = await req.json();
    if (!title || !body) return json({ message: 'Title and body are required.' }, 400);
    const doc = await Newsletter.create({ title, body, status: 'sending', kind: 'manual', slug: await uniqueSlug(title) });
    const r = await deliverIssue(doc._id);
    return json({
      message: `Published to ${r.total} subscribers.`, subscribers: r.total + (r.done ? 0 : 1), sent: r.total, id: doc._id,
      linkedInUrl: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(issueUrl(doc))}`,
    });
  } catch (err) {
    return json({ message: err.message }, 500);
  }
};

export const config = { path: '/api/newsletter/publish' };
