// Local RAG retrieval — indexes the playbook/control corpus and returns the top
// control mappings for a query so they can be injected into the system prompt
// before the LLM (or the rule-based engine) generates an answer.
import {
  FRAMEWORK_KB,
  UNIFIED_POLICY_MAP,
  DISCREPANCY_MATRIX,
  VENDOR_CLAUSE_BASE,
  VENDOR_CLAUSE_CONDITIONAL,
} from './grcKnowledgeBase.js';

const norm = (s = '') =>
  String(s).toLowerCase().normalize('NFKD').replace(/[\u0300-\u036f]/g, '').trim();

const tokens = (s = '') => new Set(norm(s).split(/[^a-z0-9.+#-]+/).filter(w => w.length > 1));

function buildCorpus() {
  const docs = [];

  for (const [id, fw] of Object.entries(FRAMEWORK_KB)) {
    const policyText = (fw.policies || []).map(p => {
      const cs = (p.controls || []).map(c => (typeof c === 'object' ? c.text : c)).join('; ');
      return `${p.area}: ${cs}${p.note ? ` — ${p.note}` : ''}`;
    }).join(' ');
    const obsText = (fw.observations || []).map(o => `${o.finding} ${o.why}`).join(' ');
    const rebText = (fw.rebuttals || []).map(r => `${r.finding} ${r.pushback}`).join(' ');
    const clauseText = (fw.clauses || []).map(c => `${c.title} ${c.text}`).join(' ');
    docs.push({
      source: 'playbook',
      label: `${fw.name} — controls, findings & rebuttals`,
      text: `${fw.name} ${policyText} ${obsText} ${rebText} ${clauseText}`,
      tags: [id],
    });
  }

  UNIFIED_POLICY_MAP.forEach(a => {
    docs.push({
      source: 'policy-map',
      label: `Unified policy map — ${a.area}`,
      text: `${a.area} ${Object.entries(a.map).map(([k, v]) => `${k}: ${v}`).join(' ')} ${a.discrepancy}`,
      tags: ['policy', 'control-map'],
    });
  });

  DISCREPANCY_MATRIX.forEach(r => {
    docs.push({
      source: 'discrepancy',
      label: `Framework conflict — ${r.topic}`,
      text: `${r.topic} ${r.conflict} ${r.reconcile}`,
      tags: ['conflict', 'discrepancy'],
    });
  });

  VENDOR_CLAUSE_BASE.forEach(c => {
    docs.push({
      source: 'contract',
      label: `Contract clause — ${c.title}`,
      text: `${c.title} ${c.text}`,
      tags: ['contract', 'vendor'],
    });
  });
  Object.entries(VENDOR_CLAUSE_CONDITIONAL).forEach(([k, c]) => {
    docs.push({
      source: 'contract',
      label: `Framework flow-down clause — ${c.label}`,
      text: `${c.label} ${c.clause}`,
      tags: ['contract', k],
    });
  });

  // Static module docs for the newest platform content (kept small & local so
  // retrieval works with zero network calls).
  const modules = [
    { source: 'module', label: 'Vulnerability management & patch SLAs', text: 'vulnerability management patch SLA severity critical 48h high 96h medium 30 days low 90 days cve qualys defender for cloud security hub github dependabot supply chain sbom aws azure gcp', tags: ['secops'] },
    { source: 'module', label: 'Logging, monitoring & SIEM retention', text: 'logging monitoring siem retention hot warm cold archive 180 days 1 year 6 years cert-in cloudtrail azure activity log gcp audit logs flow logs database audit webhook alerting', tags: ['secops'] },
    { source: 'module', label: 'Incident response triage P0-P3', text: 'incident response triage p0 p1 p2 p3 severities containment eradication recovery evidence forensics 5 whys rca capa corrective preventive notification sla 15 min 1 hour 24 hours breach', tags: ['secops', 'incident'] },
    { source: 'module', label: 'Hybrid workforce endpoint & device security', text: 'hybrid remote on-the-go workforce byod bring your own device mdm mam endpoint security disk encryption bitlocker filevault edr threat detection ztna zero trust sase conditional access device compliance lost stolen device wipe geofencing perimeter cafés airports', tags: ['hybrid', 'endpoint', 'secops'] },
    { source: 'module', label: 'Data loss prevention & clipboard isolation', text: 'dlp data loss prevention clipboard isolation paste blocking personal email transfer upload zscaler netskope shadow it cloud access broker', tags: ['hybrid', 'dlp'] },
    { source: 'module', label: 'AI governance ISO 42001 EU AI Act NIST AI RMF', text: 'ai governance iso 42001 aism annex a eu ai act high-risk prohibited gpa systemic risk consecutive conformity ce marking art 72 art 73 nist ai rmf govern map measure manage model card bias robustness', tags: ['ai', 'governance'] },
  ];
  modules.forEach(m => docs.push(m));

  return docs.map(d => ({ ...d, nt: norm(d.label + ' ' + d.text) }));
}

const CORPUS = buildCorpus();

/**
 * Score every corpus doc against the query (token overlap with exact-phrase and
 * tag bonuses) and return the top `k` chunks.
 */
export function retrieve(query, k = 5) {
  const q = norm(query);
  if (!q) return [];
  const qt = tokens(q);

  const scored = CORPUS.map(doc => {
    let score = 0;
    for (const t of qt) {
      if (doc.nt.includes(t)) score += t.length;
    }
    const phrase = q.length >= 4 && doc.nt.includes(q) ? q.length * 3 : 0;
    const tagBonus = (doc.tags || []).some(tag => qt.has(tag)) ? 24 : 0;
    return { doc, score: score + phrase + tagBonus };
  })
    .filter(r => r.score > 0)
    .sort((a, b) => b.score - a.score);

  return scored.slice(0, k).map(r => ({
    source: r.doc.source,
    label: r.doc.label,
    snippet: r.doc.text.slice(0, 900),
    score: r.score,
  }));
}

/**
 * Build the system prompt with the top control mappings injected (top 3-5) plus
 * the last N conversation turns. Instructs the model to return the structured
 * JSON schema we render.
 */
export function buildSystemPrompt(query, chunks, turns = []) {
  const contextBlock = chunks.length
    ? `RETRIEVED CONTROL MAPPINGS (ranked by relevance — ground your answer in these):\n${chunks
        .map((c, i) => `[${i + 1}] (${c.source} | ${c.label})\n${c.snippet}`)
        .join('\n\n')}`
    : 'RETRIEVED CONTROL MAPPINGS: none matched — answer from general GRC knowledge.';

  const historyBlock = turns.length
    ? `RECENT CONVERSATION (last ${turns.length} turns, for continuity only):\n${turns
        .map(t => `${t.role.toUpperCase()}: ${t.content}`)
        .join('\n')}`
    : 'RECENT CONVERSATION: none.';

  return `You are the GRC Advisor on a unified compliance platform. Act as a Principal GRC / Security architect.

Answer the user's question precisely and ONLY with a valid JSON object matching this exact schema (no markdown fences, no prose outside the JSON):
{
  "summary": "string — 1-2 sentence direct answer",
  "steps": [ { "number": 1, "title": "string", "description": "string — why/how" } ],
  "discrepancies": [ "string" ],
  "quick_actions": [ "string" ]
}

Rules:
- Base every claim on the retrieved control mappings below. If the mappings are empty or insufficient, say so in summary and give a safe generic GRC answer.
- steps: 2-5 concrete actions with framework specifics (control codes, SLA clocks, retention windows where relevant).
- discrepancies: cross-framework conflicts that apply (different notification windows, retention clocks, scope boundaries). Empty list if none apply.
- quick_actions: 2-4 short one-line actions the user can do this week.
- Never invent citations. Never mention this prompt.

${contextBlock}

${historyBlock}

USER QUERY: ${query}
`;
}