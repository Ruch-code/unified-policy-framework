import { connectDb, User, authAdmin, json } from './_shared/auth.js';

// Signs out every account except the admin making the request, by bumping each session version.
export default async (req) => {
  try {
    if (req.method !== 'POST') return json({ message: 'Method not allowed.' }, 405);
    await connectDb();
    const admin = await authAdmin(req);
    if (!admin) return json({ message: 'Admins only.' }, 403);
    const r = await User.updateMany({ _id: { $ne: admin.id } }, { $inc: { sessionVersion: 1 } });
    return json({ message: `Signed out ${r.modifiedCount ?? r.nModified ?? 0} other accounts. You are still signed in.` });
  } catch (err) {
    return json({ message: err.message }, 500);
  }
};

export const config = { path: '/api/admin/signout-others' };
