import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

let cachedConnection = null;

export async function connectDb() {
  if (cachedConnection && cachedConnection.readyState === 1) {
    return cachedConnection;
  }
  const uri = process.env.MONGODB_URI;
  if (!uri) {
    throw new Error('MONGODB_URI env var is not set');
  }
  cachedConnection = await mongoose.connect(uri, {
    serverSelectionTimeoutMS: 8000,
  });
  return cachedConnection;
}

const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    email: { type: String, required: true, unique: true, lowercase: true, trim: true },
    password: { type: String, required: true, minlength: 6 },
    role: { type: String, enum: ['user', 'admin'], default: 'user' },
    // account status: pending = awaiting approval, active = approved, deactivated = admin disabled
    status: { type: String, enum: ['pending', 'active', 'deactivated'], default: 'pending' },
    resetToken: String,
    resetTokenExpires: Date,
    approvedAt: Date,
    approvedBy: String,
    deletedAt: Date,
  },
  { timestamps: true }
);

userSchema.methods.toJSON = function () {
  const obj = this.toObject();
  delete obj.password;
  delete obj.resetToken;
  delete obj.resetTokenExpires;
  return obj;
};

export const User = mongoose.models.User || mongoose.model('User', userSchema);

export const signToken = (user) => {
  const secret = process.env.JWT_SECRET;
  if (!secret) throw new Error('JWT_SECRET env var is not set');
  return jwt.sign({ id: user._id, role: user.role }, secret, { expiresIn: '30d' });
};

export async function authUser(req) {
  const header = req.headers.get('authorization') || '';
  const token = header.startsWith('Bearer ') ? header.slice(7) : '';
  if (!token) return null;
  const secret = process.env.JWT_SECRET;
  if (!secret) return null;
  try {
    const decoded = jwt.verify(token, secret);
    const user = await User.findById(decoded.id);
    if (!user || user.status !== 'active' || user.deletedAt) return null;
    return user;
  } catch {
    return null;
  }
}

export async function authAdmin(req) {
  const user = await authUser(req);
  return user && user.role === 'admin' ? user : null;
}

export async function findByToken(token, req, res) {
  const parts = (token || '').trim().split(' ');
  if (parts.length === 2 && parts[0] === 'TOKEN') return parts[1];
  return null;
}

export function json(data, status = 200) {
  return new Response(JSON.stringify(data), {
    status,
    headers: { 'Content-Type': 'application/json' },
  });
}

// Default password shown to a user on first login / when admin sets one.
export const DEFAULT_PASSWORD = process.env.DEFAULT_USER_PASSWORD;
if (!DEFAULT_PASSWORD) {
  console.warn('DEFAULT_USER_PASSWORD env var is not set');
}

export function hashPassword(pw) {
  return bcrypt.hash(pw, 10);
}

export function makeResetToken() {
  // 32 char hex token
  const arr = new Uint8Array(32);
  crypto.getRandomValues(arr);
  return Array.from(arr, (b) => b.toString(16).padStart(2, '0')).join('');
}

// Ensure the default admin exists (idempotent). Call after connectDb on login/admin init.
export async function seedAdmin() {
  const email = (process.env.ADMIN_EMAIL || '').toLowerCase().trim();
  const password = process.env.ADMIN_PASSWORD || '';
  if (!email || !password) return;
  const exists = await User.findOne({ email });
  if (exists) return;
  await User.create({
    name: 'Administrator',
    email,
    password: await bcrypt.hash(password, 10),
    role: 'admin',
    status: 'active',
    approvedAt: new Date(),
  });
}
