import { connectDb, seedAdmin, json } from './_shared/auth.js';

// Creates the default admin from env vars if it doesn't already exist.
// This also runs automatically on first login.
export default async (req) => {
  try {
    await connectDb();
    await seedAdmin();
    const email = (process.env.ADMIN_EMAIL || 'admin@example.com').toLowerCase();
    return json({ message: 'Default admin ensured.', email });
  } catch (err) {
    return json({ message: err.message }, 500);
  }
};

export const config = { path: '/api/admin/init' };
