import { getStore } from '@netlify/blobs';
import { connectDb, authUser, json } from './_shared/auth.js';

const GEMINI_URL = 'https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent';

export const config = { path: '/api/gemini' };

const MAX_QUERY = 6000, PER_MINUTE = 10, PER_DAY = 50;

// Counts requests per user. Fails closed so a storage fault cannot expose the quota.
async function overLimit(userId, context) {
  const store = await getStore({ name: 'gemini-rate-limit', ...context.blobs });
  const now = new Date();
  const dayKey = `${userId}-${now.toISOString().slice(0, 10)}`;
  const minuteKey = `${userId}-${now.toISOString().slice(0, 16)}`;
  const day = Number((await store.get(dayKey)) || 0);
  const minute = Number((await store.get(minuteKey)) || 0);
  if (day >= PER_DAY || minute >= PER_MINUTE) return true;
  await Promise.all([store.set(dayKey, String(day + 1)), store.set(minuteKey, String(minute + 1))]);
  return false;
}

const CONVERSATION_STYLE = 'Answer like an experienced GRC colleague talking to the user. First work out what they actually mean, then answer that directly in natural, plain sentences. Use short paragraphs, not headings or markdown. Keep it under 150 words unless they ask for detail, and it must sound good read aloud. Use the retrieved context first. Use Google Search only when the context is not enough or the question depends on recent information. If you are unsure, say so. Never fabricate citations.';

export default async (req, context) => {
  try {
    if (req.method !== 'POST') return json({ message: 'Method not allowed.' }, 405);
    await connectDb();
    const user = await authUser(req);
    if (!user) return json({ message: 'Please sign in.' }, 401);
    const { query, context: retrieved, history, structured } = await req.json();
    if (typeof query !== 'string' || query.trim().length < 3) return json({ message: 'Query too short.' }, 400);
    if (query.length > MAX_QUERY) return json({ message: 'Query too long.' }, 413);
    let limited;
    try { limited = await overLimit(String(user._id || user.id), context); } catch (e) { console.error('Rate limit error:', e); return json({ message: 'Assistant is temporarily unavailable.' }, 503); }
    if (limited) return json({ message: 'Usage limit reached. Please try again later.' }, 429);

    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) return json({ message: 'Gemini API key not configured.' }, 500);

    const base = structured
      ? `${CONVERSATION_STYLE}\nRetrieved context: ${JSON.stringify(retrieved || []).slice(0, 8000)}\nRecent conversation: ${JSON.stringify(history || []).slice(0, 3000)}\nUser: ${query}`
      : `You are a GRC (Governance, Risk, Compliance) assistant. Answer accurately and do not fabricate citations.\n${query}`;
    const call = (tools) => fetch(GEMINI_URL + '?key=' + apiKey, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ contents: [{ role: 'user', parts: [{ text: base }] }], ...(tools ? { tools: [{ google_search: {} }] } : {}) }),
    });
    // Try with Google Search first, and fall back to the model alone if search is unavailable.
    let res = await call(!!structured);
    if (!res.ok && structured) res = await call(false);
    if (!res.ok) return json({ message: 'Gemini API error.' }, 502);
    const data = await res.json();
    const cand = data?.candidates?.[0];
    const answer = (cand?.content?.parts || []).map((p) => p.text || '').join('').trim();
    if (!answer) return json({ message: 'Gemini returned an empty response.' }, 502);
    if (structured) {
      const sources = (cand?.groundingMetadata?.groundingChunks || []).map((c) => c.web).filter((w) => w?.uri).slice(0, 4).map((w) => ({ title: w.title || 'Source', uri: w.uri }));
      return json({ structured: { summary: answer, steps: [], discrepancies: [], quick_actions: [], sources } });
    }
    return json({ answer });
  } catch (e) {
    console.error('Gemini function error:', e);
    return json({ message: 'Internal server error.' }, 500);
  }
};
