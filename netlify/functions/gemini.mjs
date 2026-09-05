import { json } from './_shared/newsletter.js';

const GEMINI_URL = 'https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent';

export const config = { path: '/api/gemini' };

export default async (req) => {
  try {
    if (req.method !== 'POST') return json({ message: 'Method not allowed.' }, 405);
    const { query } = await req.json();
    if (!query || query.trim().length < 3) return json({ message: 'Query too short.' }, 400);

    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) return json({ message: 'Gemini API key not configured.' }, 500);

    const body = {
      contents: [{ role: 'user', parts: [{ text: `You are a GRC (Governance, Risk, Compliance) assistant. Answer the following question accurately, with concrete references to frameworks (SOC 2, ISO 27001, PCI-DSS, HIPAA, NIST CSF, GDPR, DPDPA, CCPA/CPRA, COPPA, LGPD, PDPA, PIPL, FedRAMP, CJIS) where relevant. If the question is about a specific framework, cite the relevant control, article, or requirement. Structure the answer with a short summary and 3-5 actionable bullets. Do not fabricate citations.` + query }] }],
    };

    const res = await fetch(GEMINI_URL + '?key=' + apiKey, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
    });
    if (!res.ok) return json({ message: 'Gemini API error.' }, 502);
    const data = await res.json();
    const answer = data?.candidates?.[0]?.content?.parts?.[0]?.text || 'Gemini returned an empty response.';
    return json({ answer });
  } catch (e) {
    console.error('Gemini function error:', e);
    return json({ message: 'Internal server error.' }, 500);
  }
};
