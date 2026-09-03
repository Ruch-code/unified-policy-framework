import { connectDb, User, hashPassword, json } from './_shared/auth.js';

export default async (req) => {
  try {
    const { email, resetToken, newPassword } = await req.json();
    if (!email || !resetToken || !newPassword) {
      return json({ message: 'Email, reset token, and new password are required.' }, 400);
    }
    if (newPassword.length < 6) return json({ message: 'Password must be at least 6 characters.' }, 400);
    await connectDb();
    const user = await User.findOne({ email: email.toLowerCase(), deletedAt: null });
    if (!user) return json({ message: 'Invalid reset request.' }, 400);
    if (!user.resetToken || user.resetToken !== resetToken || !user.resetTokenExpires || user.resetTokenExpires < new Date()) {
      return json({ message: 'Reset token is invalid or expired.' }, 400);
    }
    user.password = await hashPassword(newPassword);
    user.resetToken = null;
    user.resetTokenExpires = null;
    await user.save();
    return json({ message: 'Password has been reset. You can now sign in.' });
  } catch (err) {
    return json({ message: err.message }, 500);
  }
};

export const config = { path: '/api/auth/reset-confirm' };
