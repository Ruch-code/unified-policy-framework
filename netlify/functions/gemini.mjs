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

const STRUCTURED_FORMAT = 'Reply only with JSON using these keys: summary (string, 2 sentences at most), steps (array of 3 to 5 objects with title and description), discrepancies (array of strings), quick_actions (array of up to 4 short strings). Use the retrieved context first, and never fabricate citations.';

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

    const body = {
      contents: [{ role: 'user', parts: [{ text: `You are a GRC (Governance, Risk, Compliance) assistant. Answer the following question accurately, with concrete references to frameworks (SOC 2, ISO 27001, PCI-DSS, HIPAA, NIST CSF, GDPR, DPDPA, CCPA/CPRA, COPPA, LGPD, PDPA, PIPL, FedRAMP, CJIS) where relevant. If the question is about a specific framework, cite the relevant control, article, or requirement. Structure the answer with a short summary and 3-5 actionable bullets. Do not fabricate citations.` + (structured
        ? `\n${STRUCTURED_FORMAT}\nRetrieved context: ${JSON.stringify(retrieved || []).slice(0, 8000)}\nRecent conversation: ${JSON.stringify(history || []).slice(0, 3000)}\nQuestion: `
        : '\n') + query }] }],
      ...(structured ? { generationConfig: { responseMimeType: 'application/json' } } : {}),
    };

    const res = await fetch(GEMINI_URL + '?key=' + apiKey, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
    });
    if (!res.ok) return json({ message: 'Gemini API error.' }, 502);
    const data = await res.json();
    const answer = data?.candidates?.[0]?.content?.parts?.[0]?.text || 'Gemini returned an empty response.';
    if (structured) {
      try { return json({ structured: JSON.parse(answer) }); } catch { return json({ message: 'Unexpected Gemini response.' }, 502); }
    }
    return json({ answer });
  } catch (e) {
    console.error('Gemini function error:', e);
    return json({ message: 'Internal server error.' }, 500);
  }
};
