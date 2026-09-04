// Rule-based GRC assistant. Advises from the knowledge base by intent + keyword
// matching, returning structured sections the UI renders. Swappable for an LLM later.
import {
  FRAMEWORK_KB,
  UNIFIED_POLICY_MAP,
  DISCREPANCY_MATRIX,
  VENDOR_CLAUSE_BASE,
  VENDOR_CLAUSE_CONDITIONAL,
  GRC_RESPONSE_PLAYBOOK,
  ASSISTANT_SUGGESTIONS,
} from './grcKnowledgeBase.js';

const order = ['soc2', 'iso27001', 'pci', 'hipaa', 'nist', 'gdpr', 'cis', 'hitrust', 'dpdpa'];

const INTENTS = [
  { id: 'pushback', words: ['pushback', 'push back', 'rebut', 'respond', 'dispute', 'challenge', 'defend', 'appeal', 'argue', 'push-back'] },
  { id: 'contract', words: ['contract', 'clause', 'vendor', 'msa', 'sla', 'dpa', 'subprocess', 'sub-process', 'third.party', 'flow.down', 'engage', 'outsource', 'procure', 'vendor risk'] },
  { id: 'audit', words: ['audit', 'observation', 'finding', 'nc', 'non.conform', 'noncompliance', 'gap', 'deficit'] },
  { id: 'discrepancy', words: ['discrep', 'conflict', 'overlap', 'differ', 'contradict', 'mismatch', 'vs', 'versus', 'between', 'tension'] },
  { id: 'map', words: ['policy', 'control', 'map', 'tie', 'relate', 'link', 'connect', 'which framework', 'what framework'] },
];

const FW_MATCH = [
  { slug: 'soc2', re: /\bsoc\b|trust services|tsc/i },
  { slug: 'iso27001', re: /\biso\b|isms|\bism\b/i },
  { slug: 'pci', re: /\bpci\b|cardholder|payment card|\bpan\b/i },
  { slug: 'hipaa', re: /\bhipaa\b|\bphi\b|health insurance/i },
  { slug: 'nist', re: /\bnist\b|\bcsf\b|800-171/i },
  { slug: 'gdpr', re: /\bgdpr\b|eu privacy|art 28|\bsccs?\b/i },
  { slug: 'cis', re: /\bcis\b|safeguard|implementation group/i },
  { slug: 'hitrust', re: /\bhitrust\b|\be1\b|\bi1\b|\br2\b/i },
  { slug: 'dpdpa', re: /\bdpdpa\b|digital personal data|cert-in|\bindia\b/i },
];

function norm(s) {
  return s.toLowerCase().replace(/[^a-z0-9.\s-]/g, ' ').replace(/\s+/g, ' ').trim();
}

function pickFrameworks(q) {
  return FW_MATCH.filter(fw => fw.re.test(q)).map(fw => fw.slug);
}

function detectIntent(q) {
  let best = null;
  let bestScore = 0;
  for (const it of INTENTS) {
    const score = it.words.reduce((s, w) => (q.includes(norm(w)) ? s + w.length : s), 0);
    if (score > bestScore) {
      bestScore = score;
      best = it.id;
    }
  }
  return best;
}

export function askGrcAssistant(query) {
  const q = norm(query);
  const fws = pickFrameworks(q);
  const intent = detectIntent(query) || (fws.length ? 'framework' : 'general');
  const sections = [];
  let summary = '';
  const fwObjs = fws.map(id => FRAMEWORK_KB[id]).filter(Boolean);

  // 1) Contract / vendor clauses
  if (intent === 'contract') {
    summary = 'Here is what to explicitly include when your client deals with a vendor that must comply with these frameworks — plus the supporting evidence to require.';
    sections.push({
      heading: 'Baseline clauses for every vendor agreement',
      bullets: VENDOR_CLAUSE_BASE.map(c => `• ${c.title}: ${c.text}`),
    });
    const conds = (fws.length ? fws : ['soc2', 'iso27001', 'pci', 'hipaa', 'gdpr', 'dpdpa'])
      .map(id => VENDOR_CLAUSE_CONDITIONAL[id])
      .filter(Boolean);
    sections.push({
      heading: 'Framework-specific flow-down clauses',
      bullets: conds.map(c => `• [${c.label}] ${c.clause}`),
    });
    sections.push({
      heading: 'Why it matters',
      bullets: [
        '• Certifications lapse — contract the maintenance + evidence, not the sticker.',
        '• Audit rights without independence protections are rarely exercised; pair them with "rely on report" language.',
        '• Notification timelines conflict (CERT-In 6h vs GDPR 72h vs HIPAA 60d) — tie the vendor to the most stringent.',
        '• Flow everything down to subcontractors with the vendor remaining liable.',
      ],
    });
  }

  // 2) Audit observations + 3) pushback
  if (intent === 'audit' || intent === 'pushback') {
    const scoped = (intent === 'audit' ? fws : fws) || [];
    const list = (scoped.length ? scoped : order).map(id => FRAMEWORK_KB[id]).filter(Boolean);
    if (intent === 'audit') {
      summary = 'Common audit observations by framework — and what really drives them:';
      list.forEach(fw => {
        if (fw.observations.length) {
          sections.push({
            heading: `${fw.name} — typical findings`,
            bullets: fw.observations.map(o => `• ${o.finding} — ${o.why}`),
          });
        }
      });
      sections.push({
        heading: 'Themes that recur across all frameworks',
        bullets: [
          '• Evidence of operating effectiveness across the whole period (not a snapshot).',
          '• Reviews that lack sign-off, dates, or completeness (access reviews are #1).',
          '• Stale scope/description, network diagrams, or vendor lists.',
          '• Emergency changes, subservices/sub-processors, and restores that are configured but never tested.',
        ],
      });
    } else {
      summary = 'GRC rebuttal playbook — how to professionally challenge an audit finding without eroding trust:';
      sections.push({
        heading: 'General response technique',
        bullets: GRC_RESPONSE_PLAYBOOK.map(c => `• ${c.title}: ${c.body}`),
      });
      list.forEach(fw => {
        if (fw.rebuttals.length) {
          sections.push({
            heading: `${fw.name} — framework-specific pushback`,
            bullets: fw.rebuttals.map(r => `• ${r.finding}: ${r.pushback} (Evidence: ${r.evidence})`),
          });
        }
      });
    }
  }

  // 4) Discrepancies / conflicts
  if (intent === 'discrepancy') {
    const rows = DISCREPANCY_MATRIX;
    const rel = fws.length
      ? rows.filter(row => fws.some(f => {
          const s = JSON.stringify(row).toLowerCase();
          const name = FRAMEWORK_KB[f].name.toLowerCase();
          return s.includes(name.toLowerCase().split(' ')[0]) || s.includes(FRAMEWORK_KB[f].name.toLowerCase());
        }))
      : rows;
    summary = 'Cross-framework discrepancies your auditors, vendors and contracts must reconcile:';
    sections.push({
      heading: 'Discrepancy radar',
      bullets: (rel.length ? rel : rows).map(r => `• ${r.topic}: ${r.conflict}\n   → Reconcile: ${r.reconcile}`),
    });
    sections.push({
      heading: 'One-liner reconciliation principle',
      bullets: [
        '• Implement the strictest control; document the marginal others in risk treatment or a retention/schedule matrix.',
      ],
    });
  }

  // 5) Policies → controls map
  if (intent === 'map') {
    const areas = UNIFIED_POLICY_MAP.filter(a => {
      if (!fws.length) return true;
      return fws.some(f => a.map[FRAMEWORK_KB[f].name]);
    });
    summary = 'What policies tie to what frameworks and what controls (and where they\u2019re honest with you about the tension):';
    sections.push({
      heading: 'Unified policy → framework → control map',
      bullets: areas.map(a => {
        const mapStr = Object.entries(a.map).map(([k, v]) => `${k}: ${v}`).join(' | ');
        return `• ${a.area} — ${mapStr}\n   ⚠ ${a.discrepancy}`;
      }),
    });
    if (!fws.length) {
      sections.push({
        heading: 'Drill into a framework to see its full policy list',
        bullets: order.map(id => `• ${FRAMEWORK_KB[id].name} — ask "policies for ${FRAMEWORK_KB[id].name}"`),
      });
    }
  }

  // 6) Framework deep-dive when no specific intent matched
  if (intent === 'framework' && fws.length) {
    const fw = fwObjs[0];
    summary = `Deep dive into ${fw.name}. Here is the essentials:`;
    if (fw.policies.length) {
      sections.push({
        heading: `${fw.name} — key policies → controls`,
        bullets: fw.policies.map(p => `• ${p.area}: ${p.controls.join('; ')} ${p.note ? '— ' + p.note : ''}`),
      });
    }
    if (fw.observations.length) {
      sections.push({
        heading: 'Common audit observations',
        bullets: fw.observations.map(o => `• ${o.finding} — ${o.why}`),
      });
    }
    if (fw.rebuttals.length) {
      sections.push({
        heading: 'Suggested GRC pushback',
        bullets: fw.rebuttals.map(r => `• ${r.finding}: ${r.pushback}`),
      });
    }
    if (fw.clauses.length) {
      sections.push({
        heading: 'Contract clauses to request/offer',
        bullets: fw.clauses.map(c => `• [${c.required ? 'Required' : 'Recommended'}] ${c.title}: ${c.text}`),
      });
    }
  }

  // Fallback — still advise wisely.
  if (!sections.length) {
    summary = 'I could not pinpoint that yet in the knowledge base, but here is how to use it — and a start that will actually help:';
    sections.push({
      heading: 'Try phrasing your question around one of these areas',
      bullets: [
        '• "What policies tie to <framework> and its controls?"',
        '• "Common audit observations in <framework>"',
        '• "How to push back on <finding>"',
        '• "Contract clauses when engaging a vendor"',
        '• "Where do <framework A> and <framework B> conflict?"',
      ],
    });
    sections.push({
      heading: 'General advice for GRC teams',
      bullets: [
        '• Always implement the strictest overlapping control; document the rest in risk treatment.',
        '• Keep a retention schedule + password policy that cite current standard text (no 90-day rotation).',
        '• Audit the evidence pipeline, not just the control: sign-off, dates, completeness.',
        '• Maintain one vendor list with per-regulation addenda (SOC report, BAA, DPA, PCI 12.8).',
      ],
    });
  }

  return { summary, sections, intents: [intent], frameworks: fws, suggestions: ASSISTANT_SUGGESTIONS, rawQuery: query };
}