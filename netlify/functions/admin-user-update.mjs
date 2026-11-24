import { connectDb, User, authAdmin, json, hashPassword, makeTempPassword } from './_shared/auth.js';
import { sendAccessApproved } from './_shared/mailer.js';

// actions:
//   'activate'      -> set active
//   'deactivate'    -> set deactivated
//   'delete'        -> soft delete
//   'reset-password'-> issue a new one-off password, emailed to the user, and sign them out
//   'make-admin'    -> promote to admin
//   'revoke-admin'  -> demote to user
export default async (req) => {
  try {
    const { id, action } = await req.json();
    const valid = ['activate', 'deactivate', 'delete', 'reset-password', 'make-admin', 'revoke-admin'];
    if (!id || !valid.includes(action)) {
      return json({ message: 'A valid user id and action are required.', codes: valid }, 400);
    }
    await connectDb();
    const admin = await authAdmin(req);
    if (!admin) return json({ message: 'Admins only.' }, 403);

    let tempPassword;
    const target = await User.findById(id);
    if (!target) return json({ message: 'User not found.' }, 404);

    // Prevent an admin from locking themselves out.
    if (String(target._id) === String(admin.id) && ['deactivate', 'delete', 'revoke-admin'].includes(action)) {
      return json({ message: 'You cannot deactivate, delete, or demote your own account.' }, 400);
    }

    switch (action) {
      case 'activate':
        target.status = 'active';
        target.deletedAt = null;
        break;
      case 'deactivate':
        target.status = 'deactivated';
        target.sessionVersion = (target.sessionVersion || 0) + 1;
        break;
      case 'delete':
        target.deletedAt = new Date();
        target.status = 'deactivated';
        break;
      case 'reset-password': {
        tempPassword = makeTempPassword();
        target.password = await hashPassword(tempPassword);
        target.mustChangePassword = true;
        target.sessionVersion = (target.sessionVersion || 0) + 1;
        break;
      }
      case 'make-admin':
        target.role = 'admin';
        break;
      case 'revoke-admin':
        target.role = 'user';
        break;
    }
    await target.save();
    if (action === 'reset-password') {
      try { await sendAccessApproved(target, tempPassword, true); return json({ message: 'New one-time password emailed to the user.', user: target }); }
      catch (e) { return json({ message: `Password reset, but the email was not sent (${e.message}). Share the one-time password below privately.`, user: target, tempPassword }); }
    }
    return json({ message: `User ${action.replace('-', ' ')}d.`, user: target });
  } catch (err) {
    return json({ message: err.message }, 500);
  }
};

export const config = { path: '/api/admin/user-update' };
