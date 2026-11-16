import { connectDb, json, Newsletter } from './_shared/newsletter.js';
import { plainExcerpt } from './_shared/markdown.js';

const PUBLISHED = { $or: [{ status: 'sent' }, { status: { $exists: false } }] };

// Public: GET /api/newsletter/archive            list of sent issues
//         GET /api/newsletter/archive?slug=<slug> one sent issue (slug or id)
export default async (req) => {
  try {
    if (req.method !== 'GET') return json({ message: 'Method not allowed.' }, 405);
    await connectDb();
    const slug = new URL(req.url).searchParams.get('slug');
    if (slug) {
      const or = [{ slug }];
      if (/^[a-f0-9]{24}$/.test(slug)) or.push({ _id: slug });
      const doc = await Newsletter.findOne({ $and: [PUBLISHED, { $or: or }] }).lean();
      if (!doc) return json({ message: 'Not found.' }, 404);
      return json({ issue: { slug: doc.slug || String(doc._id), title: doc.title, body: doc.body, date: doc.sentAt || doc.publishedAt || doc.createdAt } });
    }
    const docs = await Newsletter.find(PUBLISHED).sort({ sentAt: -1, publishedAt: -1, createdAt: -1 }).limit(100).lean();
    return json({ issues: docs.map((d) => ({ slug: d.slug || String(d._id), title: d.title, date: d.sentAt || d.publishedAt || d.createdAt, excerpt: plainExcerpt(d.body) })) });
  } catch (err) {
    console.error('archive error', err);
    return json({ message: 'Could not load issues.' }, 500);
  }
};

export const config = { path: '/api/newsletter/archive' };
