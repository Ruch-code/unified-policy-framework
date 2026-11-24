import { connectDb, User, authAdmin, json, hashPassword, makeTempPassword } from './_shared/auth.js';
import { sendAccessRejected, sendAccessApproved } from './_shared/mailer.js';

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
      // Issue a unique one-off password, emailed to the user only.
      var tempPassword = makeTempPassword();
      user.password = await hashPassword(tempPassword);
      user.mustChangePassword = true;
      user.sessionVersion = (user.sessionVersion || 0) + 1;
    } else {
      // reject = delete
      user.deletedAt = new Date();
    }
    await user.save();
    let emailNote = '';
    let showPassword;
    if (action === 'reject') {
      try { await sendAccessRejected(user); emailNote = ' Rejection email sent.'; }
      catch (e) { emailNote = ` Rejection email not sent: ${e.message}`; }
    } else {
      try { await sendAccessApproved(user, tempPassword); emailNote = ' Password emailed to the user.'; }
      catch (e) { emailNote = ` Email not sent (${e.message}). Share the one-time password below with the user privately.`; showPassword = tempPassword; }
    }
    return json({ message: (action === 'approve' ? 'User approved.' : 'User rejected and removed.') + emailNote, user, ...(showPassword ? { tempPassword: showPassword } : {}) });
  } catch (err) {
    return json({ message: err.message }, 500);
  }
};

export const config = { path: '/api/admin/approve' };
