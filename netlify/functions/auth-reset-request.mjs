import { connectDb, User, makeResetToken, json } from './_shared/auth.js';

// Self-service password reset request.
// NOTE: No mail provider is configured, so the reset token is returned in the response.
// Integrate an email service (e.g. Resend/SendGrid) and email the token instead.
export default async (req) => {
  try {
    const { email } = await req.json();
    if (!email) return json({ message: 'Email is required.' }, 400);
    await connectDb();
    const user = await User.findOne({ email: email.toLowerCase(), deletedAt: null });
    if (!user) return json({ message: 'If that email exists, a reset link has been generated.' }, 200);

    const token = makeResetToken();
    user.resetToken = token;
    user.resetTokenExpires = new Date(Date.now() + 30 * 60 * 1000); // 30 min
    await user.save();

    return json({
      message: 'Reset token generated. (For production, email this to the user.)',
      resetToken: token,
    });
  } catch (err) {
    return json({ message: err.message }, 500);
  }
};

export const config = { path: '/api/auth/reset-request' };
