import { Resend } from 'resend';
import { json } from './_shared/auth.js';

export const config = { path: '/api/privacy-request' };

const TYPES = ['Access a copy of my data', 'Correct my data', 'Delete my data and account', 'Unsubscribe and delete my newsletter address', 'Other privacy question'];
const hits = new Map(); // best-effort limit per IP: 3 requests per hour
const esc = (s) => String(s).replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));

export default async (req, context) => {
  if (req.method !== 'POST') return json({ message: 'Method not allowed.' }, 405);
  const ip = context?.ip || req.headers.get('x-nf-client-connection-ip') || 'unknown';
  const now = Date.now();
  const recent = (hits.get(ip) || []).filter((t) => now - t < 3600000);
  if (recent.length >= 3) return json({ message: 'Too many requests. Please try again later.' }, 429);

  let body;
  try { body = await req.json(); } catch { return json({ message: 'Invalid request.' }, 400); }
  const name = String(body.name || '').trim().slice(0, 100);
  const email = String(body.email || '').trim().toLowerCase().slice(0, 200);
  const type = String(body.type || '');
  const details = String(body.details || '').trim().slice(0, 2000);
  if (body.website) return json({ message: 'Request received.' }); // honeypot field filled by bots
  if (!name || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return json({ message: 'Please enter your name and a valid email address.' }, 400);
  if (!TYPES.includes(type)) return json({ message: 'Please choose a request type.' }, 400);
  if (body.consent !== true) return json({ message: 'Please confirm you agree to us using these details to handle your request.' }, 400);

  const apiKey = process.env.RESEND_API_KEY;
  const to = (process.env.ADMIN_EMAIL || '').trim();
  if (!apiKey || !to) return json({ message: 'Requests cannot be sent right now. Please use the LinkedIn link in the footer.' }, 503);
  recent.push(now); hits.set(ip, recent);
  try {
    await new Resend(apiKey).emails.send({
      from: process.env.RESEND_FROM || 'onboarding@resend.dev',
      to: [to],
      reply_to: email,
      subject: `Privacy request: ${type}`,
      html: `<p><strong>Type:</strong> ${esc(type)}</p><p><strong>Name:</strong> ${esc(name)}</p><p><strong>Email:</strong> ${esc(email)}</p><p><strong>Details:</strong><br>${esc(details || '(none)').replace(/\n/g, '<br>')}</p><p>Received ${new Date(now).toISOString()}. Verify the requester controls this email address before acting, and respond within 30 days.</p>`,
    });
  } catch {
    return json({ message: 'Your request could not be sent. Please try again later.' }, 502);
  }
  return json({ message: 'Request received. You will get a reply by email within 30 days. We may ask you to confirm your identity first.' });
};
