import { connectDb, User, authUser, hashPassword, json } from './_shared/auth.js';
import bcrypt from 'bcryptjs';

export default async (req) => {
  try {
    const { currentPassword, newPassword } = await req.json();
    await connectDb();
    const user = await authUser(req);
    if (!user) return json({ message: 'Not authorized.' }, 401);
    if (!newPassword || newPassword.length < 6) {
      return json({ message: 'New password must be at least 6 characters.' }, 400);
    }
    const ok = await bcrypt.compare(currentPassword || '', user.password);
    if (!ok) return json({ message: 'Current password is incorrect.' }, 400);
    user.password = await hashPassword(newPassword);
    await user.save();
    return json({ message: 'Password updated successfully.' });
  } catch (err) {
    return json({ message: err.message }, 500);
  }
};

export const config = { path: '/api/auth/password' };
