import { connectDb, User, authUser, json } from './_shared/auth.js';

export default async (req) => {
  try {
    await connectDb();
    const user = await authUser(req);
    if (!user) return json({ message: 'Not authorized.' }, 401);
    return json({ user });
  } catch (err) {
    return json({ message: err.message }, 500);
  }
};

export const config = { path: '/api/auth/me' };
