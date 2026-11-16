import { connectDb, json, Subscriber, rateLimited } from './_shared/newsletter.js';
import { sendConfirm } from './_shared/mailer.js';

const CONSENT = 'Subscribe to the OneLens newsletter: one practical GRC note every two weeks. Unsubscribe anytime.';
const NEUTRAL = { message: 'Thanks. Check your inbox for a confirmation link to finish subscribing.', subscribed: true };

export default async (req) => {
  try {
    if (req.method !== 'POST') return json({ message: 'Method not allowed.' }, 405);
    const body = await req.json().catch(() => ({}));
    const email = String(body.email || '').trim().toLowerCase();
    // Honeypot: real people never fill the hidden "website" field. Pretend success.
    if (body.website) return json(NEUTRAL, 200);
    if (!email || email.length > 254 || !/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email)) {
      return json({ message: 'Please enter a valid email address.' }, 400);
    }

    await connectDb();
    if (await rateLimited(req, 'subscribe', 5, 60)) {
      return json({ message: 'Too many attempts. Please try again in an hour.' }, 429);
    }

    const existing = await Subscriber.findOne({ email });
    const legacyConfirmed = existing && !existing.status && !existing.unsubscribedAt;
    if (existing && (existing.status === 'confirmed' || legacyConfirmed)) {
      // Already on the list: same reply, no email, nothing revealed.
      return json(NEUTRAL, 200);
    }
    // Do not re-send a confirmation more than once every 10 minutes for the same address.
    if (existing?.confirmMailAt && Date.now() - existing.confirmMailAt.getTime() < 10 * 60000) return json(NEUTRAL, 200);

    const sub = await Subscriber.findOneAndUpdate(
      { email },
      {
        $set: { status: 'pending', source: body.source ? String(body.source).slice(0, 40) : 'site', consentAt: new Date(), consentText: CONSENT, confirmMailAt: new Date() },
        $unset: { unsubscribedAt: '' },
        $setOnInsert: { tokenVersion: 1 },
      },
      { upsert: true, new: true }
    );
    try { await sendConfirm(sub); } catch (err) { console.warn('Confirmation email failed:', err.message); }
    return json(NEUTRAL, 200);
  } catch (err) {
    console.error('subscribe error', err);
    return json({ message: 'Something went wrong. Please try again.' }, 500);
  }
};

export const config = { path: '/api/newsletter/subscribe' };
