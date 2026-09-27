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
  return jwt.sign({ id: user._id, email: user.email, role: user.role }, secret, { expiresIn: '7d' });
};

export const verifyToken = (token) => {
  const secret = process.env.JWT_SECRET;
  if (!secret) throw new Error('JWT_SECRET env var is not set');
  return jwt.verify(token, secret);
};

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
