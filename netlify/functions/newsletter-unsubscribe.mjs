import { connectDb, json, Subscriber } from './_shared/newsletter.js';

export default async (req) => {
  try {
    if (req.method !== 'POST') return json({ message: 'Method not allowed.' }, 405);
    const { email } = await req.json();
    if (!email) return json({ message: 'Email is required.' }, 400);

    await connectDb();
    await Subscriber.findOneAndUpdate(
      { email: email.toLowerCase() },
      { $set: { unsubscribedAt: new Date() } },
      { upsert: true, new: false }
    );
    return json({ message: 'You have been unsubscribed.' });
  } catch (err) {
    return json({ message: err.message }, 500);
  }
};

export const config = { path: '/api/newsletter/unsubscribe' };
