import { connectDb, User, signToken, json, seedAdmin } from './_shared/auth.js';
import bcrypt from 'bcryptjs';

export default async (req) => {
  try {
    const { email, password } = await req.json();
    if (!email || !password) return json({ message: 'Email and password required.' }, 400);
    await connectDb();
    await seedAdmin();
    const user = await User.findOne({ email: email.toLowerCase() });
    if (!user) return json({ message: 'Invalid credentials.' }, 401);
    if (user.deletedAt) return json({ message: 'Invalid credentials.' }, 401);

    const ok = await bcrypt.compare(password, user.password);
    if (!ok) return json({ message: 'Invalid credentials.' }, 401);

    if (user.status === 'pending') {
      return json({ message: 'Your account is awaiting admin approval.' }, 403);
    }
    if (user.status === 'deactivated') {
      return json({ message: 'Your account has been deactivated. Contact an admin.' }, 403);
    }

    const token = signToken(user);
    return json({ token, user, isDefaultPassword: password === (process.env.DEFAULT_USER_PASSWORD || 'ChangeMe#123') });
  } catch (err) {
    return json({ message: err.message }, 500);
  }
};

export const config = { path: '/api/auth/login' };
