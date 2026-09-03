import { connectDb, User, hashPassword, json, DEFAULT_PASSWORD } from './_shared/auth.js';

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
