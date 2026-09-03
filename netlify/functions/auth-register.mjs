import { connectDb, User, hashPassword, json, DEFAULT_PASSWORD } from './_shared/auth.js';
import { Resend } from 'resend';

async function notifyAdmin(name, email) {
  const apiKey = process.env.RESEND_API_KEY;
  const adminEmail = (process.env.ADMIN_EMAIL || '').toLowerCase().trim();
  if (!apiKey || !adminEmail) {
    console.warn('Email notification skipped: RESEND_API_KEY or ADMIN_EMAIL not set');
    return;
  }
  try {
    const resend = new Resend(apiKey);
    await resend.emails.send({
      from: process.env.RESEND_FROM || 'onboarding@resend.dev',
      to: [adminEmail],
      subject: 'New access request: ' + name,
      html: `
        <div style="font-family:Arial,sans-serif;max-width:560px;margin:auto;padding:24px">
          <h2 style="color:#6d28d9;margin:0 0 8px">New access request</h2>
          <p>A new account is awaiting your approval on the Compliance Framework.</p>
          <table style="border-collapse:collapse;margin:16px 0">
            <tr><td style="padding:6px 12px 6px 0;color:#555">Name</td><td style="padding:6px 0;font-weight:600">${name}</td></tr>
            <tr><td style="padding:6px 12px 6px 0;color:#555">Email</td><td style="padding:6px 0;font-weight:600">${email}</td></tr>
          </table>
          <p style="margin:0">Approve or reject it in the admin panel:</p>
          <a href="https://spectacular-genie-bda511.netlify.app/admin"
             style="display:inline-block;margin-top:12px;background:#6d28d9;color:#fff;text-decoration:none;padding:10px 18px;border-radius:8px;font-weight:600">
            Open Admin Panel
          </a>
        </div>`,
    });
  } catch (err) {
    console.warn('Email notification failed:', err.message);
  }
}

export default async (req) => {
  try {
    const { name, email } = await req.json();
    if (!name || !email || !email.includes('@')) {
      return json({ message: 'Name and a valid email are required.' }, 400);
    }
    await connectDb();
    const existing = await User.findOne({ email: email.toLowerCase() });
    if (existing) {
      return json({ message: 'A user with that email already exists.' }, 400);
    }
    // New users start with a default password they must reset on first login.
    await User.create({
      name,
      email: email.toLowerCase(),
      password: await hashPassword(DEFAULT_PASSWORD),
      status: 'pending',
    });
    await notifyAdmin(name, email.toLowerCase());
    return json(
      {
        message:
          'Account created and awaiting approval. You will be able to sign in once an admin approves you. Your temporary password is ' +
          DEFAULT_PASSWORD,
        defaultPassword: DEFAULT_PASSWORD,
      },
      201
    );
  } catch (err) {
    return json({ message: err.message }, 500);
  }
};

export const config = { path: '/api/auth/register' };
