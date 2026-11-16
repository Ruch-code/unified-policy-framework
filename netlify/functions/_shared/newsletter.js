import crypto from 'node:crypto';
import mongoose from 'mongoose';
import { connectDb, json, authAdmin } from './auth.js';

// ---------- models (fields added to the original ones; nothing removed) ----------
const subscriberSchema = new mongoose.Schema(
  {
    email: { type: String, required: true, unique: true, lowercase: true, trim: true },
    source: { type: String, default: 'popup' },
    unsubscribedAt: Date,
    // Double opt-in. Records created before this field existed have no status and are treated as confirmed (legacy).
    status: { type: String, enum: ['pending', 'confirmed', 'unsubscribed'] },
    consentAt: Date, // when the subscribe form was submitted
    confirmedAt: Date, // when the confirmation link was clicked
    consentText: String, // what the person agreed to
    tokenVersion: { type: Number, default: 1 },
    confirmMailAt: Date,
  },
  { timestamps: true }
);

const newsletterSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, trim: true },
    body: { type: String, required: true },
    sentTo: { type: Number, default: 0 },
    publishedAt: Date,
    slug: { type: String, index: true, sparse: true },
    status: { type: String, enum: ['draft', 'scheduled', 'sending', 'sent'], default: 'sent' },
    scheduledAt: Date,
    sentAt: Date,
    sendRound: { type: Number, default: 1 }, // bumped by an explicit Resend
    kind: { type: String, default: 'manual' }, // manual | digest
    failedCount: { type: Number, default: 0 },
  },
  { timestamps: true }
);

const deliverySchema = new mongoose.Schema(
  {
    issueId: { type: mongoose.Schema.Types.ObjectId, required: true },
    round: { type: Number, default: 1 },
    email: { type: String, required: true },
    status: { type: String, enum: ['queued', 'sent', 'failed'], default: 'queued' },
    error: String,
    sentAt: Date,
  },
  { timestamps: true }
);
deliverySchema.index({ issueId: 1, round: 1, email: 1 }, { unique: true });

const settingsSchema = new mongoose.Schema(
  {
    key: { type: String, unique: true, default: 'newsletter' },
    sendingPaused: { type: Boolean, default: false }, // master switch: nothing goes to the list while on
    scheduledSendingEnabled: { type: Boolean, default: true },
    digestEnabled: { type: Boolean, default: false },
    digestFrequency: { type: String, enum: ['weekly', 'fortnightly', 'monthly'], default: 'weekly' },
    digestDay: { type: Number, default: 1 }, // 0 Sunday .. 6 Saturday (weekly, fortnightly); day of month for monthly
    digestHour: { type: Number, default: 9 }, // Asia/Kolkata
    digestNotify: { type: Boolean, default: true },
    sources: [{ name: String, url: String, lastSeenAt: Date }],
    lastDigestAt: Date,
  },
  { timestamps: true }
);

const rateSchema = new mongoose.Schema({ key: { type: String, unique: true }, count: Number, expiresAt: Date });
rateSchema.index({ expiresAt: 1 }, { expireAfterSeconds: 0 });

export const Subscriber = mongoose.models.Subscriber || mongoose.model('Subscriber', subscriberSchema);
export const Newsletter = mongoose.models.Newsletter || mongoose.model('Newsletter', newsletterSchema);
export const Delivery = mongoose.models.NewsletterDelivery || mongoose.model('NewsletterDelivery', deliverySchema);
export const Settings = mongoose.models.NewsletterSettings || mongoose.model('NewsletterSettings', settingsSchema);
const RateLimit = mongoose.models.NewsletterRateLimit || mongoose.model('NewsletterRateLimit', rateSchema);

export const getSettings = async () => (await Settings.findOne({ key: 'newsletter' })) || Settings.create({ key: 'newsletter' });

// Confirmed subscribers: explicit "confirmed", plus legacy rows with no status that never unsubscribed.
export const CONFIRMED = { $or: [{ status: 'confirmed' }, { status: { $exists: false }, unsubscribedAt: { $exists: false } }] };

export function getFrom() {
  return process.env.NEWSLETTER_FROM || 'onboarding@resend.dev';
}
export const SITE = (process.env.SITE_URL || process.env.URL || 'https://spectacular-genie-bda511.netlify.app').replace(/\/$/, '');
export const TZ = 'Asia/Kolkata';

// ---------- signed tokens for confirm / unsubscribe links ----------
const b64u = (s) => Buffer.from(s).toString('base64url');
const tokenSecret = () => {
  const s = process.env.NEWSLETTER_TOKEN_SECRET || process.env.JWT_SECRET;
  if (!s) throw new Error('NEWSLETTER_TOKEN_SECRET is not set');
  return s;
};
export function signLink(email, action, version = 1, ttlDays = action === 'confirm' ? 3 : 365) {
  const payload = b64u(JSON.stringify({ e: email, a: action, v: version, x: Date.now() + ttlDays * 86400000 }));
  const sig = crypto.createHmac('sha256', tokenSecret()).update(payload).digest('base64url');
  return `${payload}.${sig}`;
}
export function verifyLink(token, action) {
  const [payload, sig] = String(token || '').split('.');
  if (!payload || !sig) return null;
  const expected = crypto.createHmac('sha256', tokenSecret()).update(payload).digest();
  const given = Buffer.from(sig, 'base64url');
  if (given.length !== expected.length || !crypto.timingSafeEqual(given, expected)) return null;
  try {
    const p = JSON.parse(Buffer.from(payload, 'base64url').toString());
    if (p.a !== action || p.x < Date.now()) return null;
    return p;
  } catch { return null; }
}
export const unsubscribeUrl = (sub) => `${SITE}/api/newsletter/unsubscribe?t=${signLink(sub.email, 'unsub', sub.tokenVersion || 1)}`;

// ---------- rate limit (per hashed IP, fixed window) ----------
export async function rateLimited(req, bucket, max, windowMin) {
  const ip = req.headers.get('x-nf-client-connection-ip') || req.headers.get('x-forwarded-for')?.split(',')[0] || 'unknown';
  const key = `${bucket}:${crypto.createHash('sha256').update(ip + tokenSecret()).digest('hex').slice(0, 32)}`;
  const now = new Date();
  const doc = await RateLimit.findOneAndUpdate(
    { key, expiresAt: { $gt: now } },
    { $inc: { count: 1 } },
    { new: true }
  );
  if (doc) return doc.count > max;
  await RateLimit.findOneAndUpdate({ key }, { $set: { count: 1, expiresAt: new Date(now.getTime() + windowMin * 60000) } }, { upsert: true });
  return false;
}

// ---------- helpers ----------
export const escapeHtml = (s) => String(s ?? '').replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
export const slugify = (s) => String(s).toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '').slice(0, 70) || 'issue';
export const redirect = (path) => new Response(null, { status: 302, headers: { Location: `${SITE}${path}` } });

export { connectDb, json, authAdmin };
