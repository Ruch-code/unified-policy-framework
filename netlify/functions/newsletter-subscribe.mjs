import { connectDb, json, Subscriber, getFrom } from './_shared/newsletter.js';
import { Resend } from 'resend';

const SITE = 'https://spectacular-genie-bda511.netlify.app';

export default async (req) => {
  try {
    if (req.method !== 'POST') return json({ message: 'Method not allowed.' }, 405);

    const { email } = await req.json();
    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return json({ message: 'A valid email is required.' }, 400);
    }

    await connectDb();
    const normalized = email.toLowerCase();
    const sub = await Subscriber.findOneAndUpdate(
      { email: normalized },
      { $set: { source: 'popup' }, $unset: { unsubscribedAt: '' } },
      { upsert: true, new: true }
    );
    const isNew = sub.createdAt && Date.now() - new Date(sub.createdAt).getTime() < 5000;

    // Send a welcome email (works to the owner's verified inbox; full broadcast
    // requires the sending domain to be verified in Resend).
    const apiKey = process.env.RESEND_API_KEY;
    if (apiKey) {
      try {
        const resend = new Resend(apiKey);
        await resend.emails.send({
          from: getFrom(),
          to: [normalized],
          subject: "You're subscribed! 👋",
          html: `
            <div style="font-family:Arial,sans-serif;max-width:560px;margin:auto;padding:24px">
              <h2 style="color:#6d28d9;margin:0 0 8px">Welcome to the Unified Compliance newsletter!</h2>
              <p style="color:#333">Thanks for subscribing. You'll get practical, no-jargon guidance on certifications, security compliance, privacy, and how to choose what matters for your business.</p>
              <p style="color:#333">In the meantime, try the <strong>Certification Advisor</strong> to see your tailored upskill roadmap:</p>
              <a href="${SITE}" style="display:inline-block;margin-top:12px;background:#6d28d9;color:#fff;text-decoration:none;padding:10px 18px;border-radius:8px;font-weight:600">Open the site</a>
              <p style="color:#999;font-size:12px;margin-top:24px">You can unsubscribe anytime using the link in any email.</p>
            </div>`,
        });
      } catch (err) {
        console.warn('Welcome email failed:', err.message);
      }
    }

    return json({ message: isNew ? 'Subscribed!' : 'You are already subscribed.', subscribed: true }, isNew ? 201 : 200);
  } catch (err) {
    return json({ message: err.message }, 500);
  }
};

export const config = { path: '/api/newsletter/subscribe' };
