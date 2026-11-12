import { getStore } from '@netlify/blobs';
import { connectDb, authUser, json } from './_shared/auth.js';

const GEMINI_URL = 'https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent';

export const config = { path: '/api/gemini' };

const MAX_QUERY = 6000, PER_MINUTE = 10, PER_DAY = 120;

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

const ADVISOR_SYSTEM = `You are a senior GRC (governance, risk and compliance) advisor with hands-on audit experience across SOC 2, ISO 27001, ISO 42001, HIPAA, GDPR, PCI DSS, SOX, NIST and vendor risk. You are talking with a practitioner.
How to answer:
- Work out what the person is really trying to achieve, and answer that directly in the first sentence.
- Reason from the situation, not only from definitions. Give the practical answer: what to do, in what order, what evidence proves it, and what auditors usually challenge.
- Use a short, concrete example whenever it makes the point clearer.
- If the question depends on facts you do not have (company size, framework, cloud provider, audit stage), state the assumption you are making, answer on that basis, and ask one short follow-up question at the end.
- Use the conversation so far. Do not repeat what was already said; build on it.
- The retrieved context is reference material from the site. Use it when it is relevant, and go beyond it with your own expertise when it is not enough. Use Google Search for recent or jurisdiction-specific facts.
- Say when something is uncertain or varies by auditor. Never invent citations, clause numbers or statistics.
Style: plain conversational sentences, short paragraphs, no markdown symbols, no headings, no em dashes. Aim for 120 to 220 words, longer only if asked for detail.`;

function interviewSystem(iv = {}) {
  const role = String(iv.role || 'GRC Analyst').slice(0, 80);
  const level = String(iv.level || 'mid-level').slice(0, 40);
  const focus = String(iv.focus || 'a balanced mix').slice(0, 120);
  return `You are a senior hiring manager running a realistic mock interview for a ${level} ${role} position. Focus area: ${focus}.
Rules:
- Ask ONE question at a time. Mix technical, scenario-based and behavioural questions, and make each new question build on the candidate's earlier answers the way a real interviewer probes. Increase difficulty gradually. Do not repeat a question.
- When the candidate message is START, greet them in one sentence and ask the first question. Output only the greeting and the question.
- When the candidate answers, reply in exactly this layout, using these labels on their own lines:
Score: N/10
What worked: one or two sentences, specific to what they said.
What to improve: one to three sentences on what was missing, vague or wrong. Be honest and direct, never harsh.
What to say instead: a model answer in the first person, as the candidate should say it aloud, 90 to 150 words. Use a clear structure (for behavioural questions use situation, task, action, result). Use realistic generic details and never invent facts about the candidate's own history; write placeholders like [your example] where personal experience is needed.
Next question: the next interview question.
- When the candidate says they do not know or asks for the answer (SKIP), do not score. Reply with:
What to say: the model answer as above.
Why interviewers ask this: one sentence.
Next question: the next question.
- When the candidate message is FINISH, give a short debrief: overall score out of 10, three strengths, three priorities to practise, and one sentence of encouragement. Ask no further question.
Style: plain text, no markdown symbols, no em dashes. Keep technical content accurate; if a standard or clause is uncertain, say so rather than guess.`;
}

export default async (req, context) => {
  try {
    if (req.method !== 'POST') return json({ message: 'Method not allowed.' }, 405);
    await connectDb();
    const user = await authUser(req);
    if (!user) return json({ message: 'Please sign in.' }, 401);
    const { query, context: retrieved, history, structured, mode, interview } = await req.json();
    if (typeof query !== 'string' || query.trim().length < 3) return json({ message: 'Query too short.' }, 400);
    if (query.length > MAX_QUERY) return json({ message: 'Query too long.' }, 413);
    let limited;
    try { limited = await overLimit(String(user._id || user.id), context); } catch (e) { console.error('Rate limit error:', e); return json({ message: 'Assistant is temporarily unavailable.' }, 503); }
    if (limited) return json({ message: 'Usage limit reached. Please try again later.' }, 429);

    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) return json({ message: 'Gemini API key not configured.' }, 500);

    const isInterview = mode === 'interview';
    // Real multi-turn conversation so the model can follow up on earlier answers.
    const turns = (Array.isArray(history) ? history : []).slice(-16)
      .filter((m) => m && typeof m.content === 'string' && m.content.trim())
      .map((m) => ({ role: m.role === 'assistant' ? 'model' : 'user', parts: [{ text: m.content.slice(0, 2500) }] }));
    while (turns.length && turns[0].role !== 'user') turns.shift();
    // The API expects alternating roles, ending on the model before the new user message.
    const merged = [];
    for (const t of turns) { const last = merged[merged.length - 1]; if (last && last.role === t.role) last.parts[0].text += '\n' + t.parts[0].text; else merged.push(t); }
    if (merged.length && merged[merged.length - 1].role === 'user') merged.pop();
    let system, userText;
    if (isInterview) {
      system = interviewSystem(interview);
      userText = query;
    } else if (structured) {
      system = ADVISOR_SYSTEM;
      const ctx = JSON.stringify(retrieved || []).slice(0, 8000);
      userText = `${query}\n\n[Reference material from the site, use if relevant]\n${ctx}`;
    } else {
      system = 'You are a GRC (Governance, Risk, Compliance) assistant. Answer accurately and do not fabricate citations.';
      userText = query;
    }
    const multi = isInterview || structured;
    const call = (tools) => fetch(GEMINI_URL + '?key=' + apiKey, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        systemInstruction: { parts: [{ text: system }] },
        contents: [...(multi ? merged : []), { role: 'user', parts: [{ text: userText }] }],
        generationConfig: { temperature: isInterview ? 0.8 : 0.5 },
        ...(tools ? { tools: [{ google_search: {} }] } : {}),
      }),
    });
    // Try with Google Search first, and fall back to the model alone if search is unavailable.
    const useSearch = !!structured && !isInterview;
    let res = await call(useSearch);
    if (!res.ok && useSearch) res = await call(false);
    if (!res.ok) return json({ message: 'Gemini API error.' }, 502);
    const data = await res.json();
    const cand = data?.candidates?.[0];
    const answer = (cand?.content?.parts || []).map((p) => p.text || '').join('').trim();
    if (!answer) return json({ message: 'Gemini returned an empty response.' }, 502);
    if (isInterview) return json({ answer });
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
