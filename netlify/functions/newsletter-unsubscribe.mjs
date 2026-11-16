import { connectDb, json, Subscriber, verifyLink, redirect } from './_shared/newsletter.js';

const unsubscribe = async (email) => Subscriber.updateOne(
  { email: String(email).toLowerCase() },
  { $set: { status: 'unsubscribed', unsubscribedAt: new Date() }, $inc: { tokenVersion: 1 } }
);

// GET  ?t=<signed token>  one-click link in every email, then shows the "You are unsubscribed" page.
// POST ?t=<signed token>  RFC 8058 one-click from mail clients.
// GET  ?email=...         links in issues sent before signed tokens existed.
// POST {email}            original API, kept for compatibility.
export default async (req) => {
  try {
    const url = new URL(req.url);
    const t = url.searchParams.get('t');
    await connectDb();
    if (t) {
      const p = verifyLink(t, 'unsub');
      if (!p) return req.method === 'GET' ? redirect('/newsletter/status?s=invalid') : json({ message: 'Invalid link.' }, 400);
      const sub = await Subscriber.findOne({ email: p.e });
      if (sub && (sub.tokenVersion || 1) === p.v) await unsubscribe(p.e);
      return req.method === 'GET' ? redirect('/newsletter/status?s=unsubscribed') : json({ message: 'You have been unsubscribed.' });
    }
    if (req.method === 'GET') {
      const legacy = url.searchParams.get('email');
      if (legacy) await unsubscribe(legacy);
      return redirect(legacy ? '/newsletter/status?s=unsubscribed' : '/newsletter/status?s=invalid');
    }
    if (req.method !== 'POST') return json({ message: 'Method not allowed.' }, 405);
    const { email } = await req.json().catch(() => ({}));
    if (!email) return json({ message: 'Email is required.' }, 400);
    await unsubscribe(email);
    return json({ message: 'You have been unsubscribed.' });
  } catch (err) {
    console.error('unsubscribe error', err);
    return json({ message: 'Something went wrong.' }, 500);
  }
};

export const config = { path: '/api/newsletter/unsubscribe' };
