import { connectDb, User, authAdmin, json } from './_shared/auth.js';

export default async (req) => {
  try {
    await connectDb();
    const admin = await authAdmin(req);
    if (!admin) return json({ message: 'Admins only.' }, 403);

    const users = await User.find({}).sort({ createdAt: -1 }).select('-password -resetToken -resetTokenExpires');
    return json({ users });
  } catch (err) {
    return json({ message: err.message }, 500);
  }
};

export const config = { path: '/api/admin/users' };
