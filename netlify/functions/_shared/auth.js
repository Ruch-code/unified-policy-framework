import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';
import crypto from 'crypto';

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

const getSecret = () => {
  const secret = process.env.JWT_SECRET;
  if (!secret) throw new Error('JWT_SECRET env var is not set');
  return secret;
};

const base64url = (buf) => Buffer.from(buf).toString('base64').replace(/=/g, '').replace(/\+/g, '-').replace(/\//g, '_');

const b64u = (s) => Buffer.from(s).toString('base64').replace(/=/g, '').replace(/\+/g, '-').replace(/\//g, '_');

export const signToken = async (user) => {
  const secret = getSecret();
  const header = b64u(JSON.stringify({ alg: 'HS256', typ: 'JWT' }));
  const now = Math.floor(Date.now() / 1000);
  const payload = b64u(JSON.stringify({ id: user._id, email: user.email, role: user.role, iat: now, exp: now + 604800 }));
  const data = `${header}.${payload}`;
  const sig = crypto.createHmac('sha256', secret).update(data).digest();
  return `${data}.${base64url(sig)}`;
};

export const verifyToken = async (token) => {
  const secret = getSecret();
  const [header, payload, sig] = token.split('.');
  const data = `${header}.${payload}`;
  const expected = crypto.createHmac('sha256', secret).update(data).digest();
  if (!crypto.timingSafeEqual(Buffer.from(sig.replace(/-/g, '+').replace(/_/g, '/'), 'base64'), expected)) {
    throw new Error('Invalid signature');
  }
  const p = JSON.parse(Buffer.from(payload.replace(/-/g, '+').replace(/_/g, '/'), 'base64').toString());
  if (p.exp * 1000 < Date.now()) throw new Error('Token expired');
  return p;
};

export const authUser = async (req) => {
  const auth = req.headers.get('authorization');
  if (!auth || !auth.startsWith('Bearer ')) return null;
  try {
    return await verifyToken(auth.slice(7));
  } catch {
    return null;
  }
};

export const authAdmin = async (req) => {
  const user = await authUser(req);
  if (!user || user.role !== 'admin') return null;
  return user;
};

export const hashPassword = async (password) => {
  return await bcrypt.hash(password, 12);
};

export const makeResetToken = () => {
  return crypto.randomBytes(32).toString('hex');
};

export const DEFAULT_PASSWORD = process.env.DEFAULT_USER_PASSWORD || '';

export const json = (data, status = 200) => {
  return new Response(JSON.stringify(data), {
    status,
    headers: { 'Content-Type': 'application/json' }
  });
};

export const seedAdmin = async () => {
  const adminEmail = process.env.ADMIN_EMAIL?.toLowerCase();
  const adminPass = process.env.ADMIN_PASSWORD;
  if (!adminEmail || !adminPass) return;
  const existing = await User.findOne({ email: adminEmail });
  if (!existing) {
    const hash = await bcrypt.hash(adminPass, 12);
    await User.create({ name: 'Admin', email: adminEmail, password: hash, role: 'admin', status: 'active', approvedAt: new Date() });
    console.log('Seeded admin user:', adminEmail);
  }
};
