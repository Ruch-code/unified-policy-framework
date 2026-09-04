import mongoose from 'mongoose';
import { connectDb, json, authAdmin } from './auth.js';

const subscriberSchema = new mongoose.Schema(
  {
    email: { type: String, required: true, unique: true, lowercase: true, trim: true },
    source: { type: String, default: 'popup' },
    unsubscribedAt: Date,
  },
  { timestamps: true }
);

const newsletterSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, trim: true },
    body: { type: String, required: true },
    sentTo: { type: Number, default: 0 },
    publishedAt: Date,
  },
  { timestamps: true }
);

export const Subscriber = mongoose.models.Subscriber || mongoose.model('Subscriber', subscriberSchema);
export const Newsletter = mongoose.models.Newsletter || mongoose.model('Newsletter', newsletterSchema);

export function getFrom() {
  return process.env.NEWSLETTER_FROM || 'onboarding@resend.dev';
}

export { connectDb, json, authAdmin };
