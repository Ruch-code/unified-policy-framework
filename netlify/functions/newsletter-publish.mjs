import { connectDb, json, authAdmin, Subscriber, Newsletter, getFrom } from './_shared/newsletter.js';
import { Resend } from 'resend';

const SITE = 'https://spectacular-genie-bda511.netlify.app';
const UNSUB_URL = SITE + '/api/newsletter/unsubscribe';

export default async (req) => {
  try {
    if (req.method !== 'POST') return json({ message: 'Method not allowed.' }, 405);

    await connectDb();
    const admin = await authAdmin(req);
    if (!admin) return json({ message: 'Not authorized.' }, 401);

    const { title, body } = await req.json();
    if (!title || !body) return json({ message: 'Title and body are required.' }, 400);

    const subscribers = await Subscriber.find({ unsubscribedAt: { $exists: false } });
    const emails = subscribers.map((s) => s.email);

    const html = `
      <div style="font-family:Arial,sans-serif;max-width:600px;margin:auto;padding:24px">
        <h1 style="color:#6d28d9;margin:0 0 12px">${title}</h1>
        <div style="color:#333;line-height:1.7;white-space:pre-wrap">${body}</div>
        <hr style="border:none;border-top:1px solid #eee;margin:24px 0" />
        <p style="color:#999;font-size:12px">You're receiving this because you subscribed to the Unified Compliance newsletter.</p>
        <a href="${UNSUB_URL}?email=%EMAIL%" style="color:#999;font-size:12px">Unsubscribe</a>
      </div>`;

    // Store the newsletter record.
    const doc = await Newsletter.create({ title, body, sentTo: emails.length, publishedAt: new Date() });

    let sent = 0;
    const apiKey = process.env.RESEND_API_KEY;
    if (apiKey && emails.length) {
      try {
        const resend = new Resend(apiKey);
        for (const email of emails) {
          try {
            await resend.emails.send({
              from: getFrom(),
              to: [email],
              subject: title,
              html: html.replace('%EMAIL%', encodeURIComponent(email)),
            });
            sent++;
          } catch (e) {
            console.warn('Send failed for', email, e.message);
          }
        }
        await Newsletter.updateOne({ _id: doc._id }, { $set: { sentTo: sent } });
      } catch (err) {
        console.warn('Broadcast error:', err.message);
      }
    }

    // LinkedIn share URL — pre-filled with the newsletter post text + site link.
    const shareText = `${title} — Read the latest from the Unified Compliance newsletter.`;
    const linkedInUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(SITE)}&text=${encodeURIComponent(shareText)}`;

    return json({
      message: `Published to ${sent} of ${emails.length} subscribers.`,
      subscribers: emails.length,
      sent,
      id: doc._id,
      linkedInUrl,
    });
  } catch (err) {
    return json({ message: err.message }, 500);
  }
};

export const config = { path: '/api/newsletter/publish' };
