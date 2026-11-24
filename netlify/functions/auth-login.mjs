// DEPLOY MARKER: jose-v1
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

    // The old shared temporary password is retired: accounts still using it must get a new one-time password.
    const legacyShared = process.env.DEFAULT_USER_PASSWORD;
    if (legacyShared && password === legacyShared && user.role !== 'admin') {
      return json({ message: 'This temporary password is no longer valid. Use "Forgot password" or ask the admin for a new one-time password.' }, 403);
    }

    if (user.status === 'pending') {
      return json({ message: 'Your account is awaiting admin approval.' }, 403);
    }
    if (user.status === 'deactivated') {
      return json({ message: 'Your account has been deactivated. Contact an admin.' }, 403);
    }

    const token = await signToken(user);
    return json({ token, user, isDefaultPassword: !!user.mustChangePassword });
  } catch (err) {
    return json({ message: err.message }, 500);
  }
};

export const config = { path: '/api/auth/login' };
