import { connectDb, User, authAdmin, json, DEFAULT_PASSWORD, hashPassword } from './_shared/auth.js';

// Approve (activate) or reject (delete) a pending user.
// action: 'approve' | 'reject'
export default async (req) => {
  try {
    const { id, action } = await req.json();
    if (!id || !['approve', 'reject'].includes(action)) {
      return json({ message: 'A valid user id and action (approve|reject) are required.' }, 400);
    }
    await connectDb();
    const admin = await authAdmin(req);
    if (!admin) return json({ message: 'Admins only.' }, 403);

    const user = await User.findById(id);
    if (!user) return json({ message: 'User not found.' }, 404);

    if (action === 'approve') {
      user.status = 'active';
      user.approvedAt = new Date();
      user.approvedBy = admin.email;
      // Re-deliver default password on approval (ensures the user can log in).
      user.password = await hashPassword(DEFAULT_PASSWORD);
    } else {
      // reject = delete
      user.deletedAt = new Date();
    }
    await user.save();
    return json({ message: action === 'approve' ? 'User approved.' : 'User rejected and removed.', user });
  } catch (err) {
    return json({ message: err.message }, 500);
  }
};

export const config = { path: '/api/admin/approve' };
