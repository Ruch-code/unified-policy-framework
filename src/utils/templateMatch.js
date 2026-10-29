// Finds ready-to-use templates relevant to a piece of framework guidance text.
import INDEX from '../data/templateIndex.json';

const REF_RE = /\b(?:CC|PI|C|P)\d\.\d+\b|\bA1\.\d\b|\bA\.\d{1,2}\.\d{1,2}\b|\bClause\s+\d+(?:\.\d+)*|\b164\.\d{3}\b|\bArt(?:icle)?\.?\s*\d{1,2}\b/gi;

// Broad references (shared by many templates) count for less than specific ones.
const REF_FREQ = {};
for (const t of INDEX) for (const r of t.refs) REF_FREQ[r] = (REF_FREQ[r] || 0) + 1;
const refWeight = r => (REF_FREQ[r] || 0) <= 6 ? 2 : (REF_FREQ[r] <= 12 ? 1 : 0.5);
const esc = s => s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
const KW_RE = new Map();
const kwHit = (k, t) => {
  if (!KW_RE.has(k)) KW_RE.set(k, new RegExp('(^|[^a-z0-9])' + esc(k)));
  return KW_RE.get(k).test(t);
};

function normRef(r) {
  const s = r.replace(/\s+/g, ' ').trim();
  if (/^art/i.test(s)) return 'Art. ' + s.match(/\d+/)[0];
  if (/^clause/i.test(s)) return 'Clause ' + s.replace(/^clause\s*/i, '');
  return s.toUpperCase().replace(/^A\.(\d)/, 'A.$1');
}

export function extractRefs(text) {
  return [...new Set((String(text || '').match(REF_RE) || []).map(normRef))];
}

/** Returns up to `limit` templates ranked by control-reference and keyword matches. */
export function findTemplates(text, { limit = 3, framework } = {}) {
  const t = String(text || '').toLowerCase();
  if (!t.trim()) return [];
  const refs = extractRefs(text);
  const scored = [];
  for (const tpl of INDEX) {
    let score = 0;
    for (const r of refs) {
      if (tpl.refs.includes(r)) score += refWeight(r);
      else if (r.startsWith('Clause ') && tpl.refs.some(x => x.startsWith(r + '.') || r.startsWith(x + '.'))) score += 1;
    }
    for (const k of tpl.kw) if (k.length >= 3 && kwHit(k, t)) score += k.includes(' ') ? 4 : 3;
    if (framework && tpl.fw.includes(framework)) score += score > 0 ? 0.5 : 0;
    if (score >= 2) scored.push({ tpl, score });
  }
  scored.sort((a, b) => b.score - a.score || a.tpl.name.localeCompare(b.tpl.name));
  return scored.slice(0, limit).map(s => s.tpl);
}

/** Free-text search over all templates (name, keywords, control references). */
export function searchTemplates(query, limit = 20) {
  const q = String(query || '').toLowerCase().trim();
  if (q.length < 2) return [];
  const terms = q.split(/\s+/);
  const refs = extractRefs(query);
  const res = [];
  for (const tpl of INDEX) {
    const hay = (tpl.name + ' ' + tpl.kw.join(' ') + ' ' + tpl.refs.join(' ')).toLowerCase();
    let score = 0;
    if (tpl.name.toLowerCase().includes(q)) score += 5;
    if (tpl.kw.some(k => k.includes(q) || q.includes(k))) score += 4;
    for (const r of refs) if (tpl.refs.includes(r)) score += 4;
    if (terms.every(w => hay.includes(w))) score += 2;
    if (score > 0) res.push({ tpl, score });
  }
  res.sort((a, b) => b.score - a.score || a.tpl.name.localeCompare(b.tpl.name));
  return res.slice(0, limit).map(r => r.tpl);
}

export function templateBySlug(slug) { return INDEX.find(t => t.slug === slug); }
