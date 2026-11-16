import { connectDb, Subscriber, verifyLink, redirect } from './_shared/newsletter.js';
import { sendWelcome } from './_shared/mailer.js';

export default async (req) => {
  try {
    const p = verifyLink(new URL(req.url).searchParams.get('t'), 'confirm');
    if (!p) return redirect('/newsletter/status?s=invalid');
    await connectDb();
    const sub = await Subscriber.findOne({ email: p.e });
    if (!sub || (sub.tokenVersion || 1) !== p.v) return redirect('/newsletter/status?s=invalid');
    if (sub.status === 'confirmed') return redirect('/newsletter/status?s=confirmed');
    sub.status = 'confirmed';
    sub.confirmedAt = new Date();
    sub.unsubscribedAt = undefined;
    await sub.save();
    try { await sendWelcome(sub); } catch (err) { console.warn('Welcome email failed:', err.message); }
    return redirect('/newsletter/status?s=confirmed');
  } catch (err) {
    console.error('confirm error', err);
    return redirect('/newsletter/status?s=error');
  }
};

export const config = { path: '/api/newsletter/confirm' };
