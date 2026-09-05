// Rule-based GRC assistant. Advises from the knowledge base by intent + keyword
// matching, returning structured sections the UI renders. Swappable for an LLM later.
// Enhanced to detect compound intent, multiple frameworks, and produce a
// "Wise Advisor" synthesis with concrete next steps + reasoning for trust.
import {
  FRAMEWORK_KB,
  UNIFIED_POLICY_MAP,
  DISCREPANCY_MATRIX,
  VENDOR_CLAUSE_BASE,
  VENDOR_CLAUSE_CONDITIONAL,
  GRC_RESPONSE_PLAYBOOK,
  ASSISTANT_SUGGESTIONS,
} from './grcKnowledgeBase.js';

const order = ['soc2', 'iso27001', 'pci', 'hipaa', 'nist', 'gdpr', 'cis', 'hitrust', 'dpdpa', 'fedramp', 'cjis'];

const INTENTS = [
  { id: 'pushback', words: ['pushback', 'push back', 'rebut', 'respond', 'dispute', 'challenge', 'defend', 'appeal', 'argue', 'push-back', 'disagreement'] },
  { id: 'contract', words: ['contract', 'clause', 'vendor', 'msa', 'sla', 'dpa', 'subprocess', 'sub-process', 'third.party', 'flow.down', 'engage', 'outsource', 'procure', 'vendor risk', 'daa', 'addendum', 'sbom', 'software bill of materials', 'asset inventory', 'carve.out', 'carve.in', 'byod', 'endpoint security', 'control objective', 'physical server', 'on-prem'] },
  { id: 'audit', words: ['audit', 'observation', 'finding', 'nc', 'non.conform', 'noncompliance', 'gap', 'deficit', 'finding'] },
  { id: 'discrepancy', words: ['discrep', 'conflict', 'overlap', 'differ', 'contradict', 'mismatch', 'vs', 'versus', 'between', 'tension', 'clash'] },
  { id: 'map', words: ['policy', 'control', 'map', 'tie', 'relate', 'link', 'connect', 'which framework', 'what framework', 'which control'] },
  { id: 'environment', words: ['sbom', 'software bill of materials', 'asset inventory', 'carve.out', 'carve.in', 'byod', 'endpoint security', 'control objective', 'physical server', 'on-prem', 'on-premises', 'purchased asset', 'mdm', 'edr', 'disk encryption', 'inherited control', 'shared responsibility'] },
];

const FW_MATCH = [
  { slug: 'soc2', re: /\bsoc[ _\-]?2\b|trust services|tsc/i },
  { slug: 'iso27001', re: /\biso[ _\-]?27001\b|isms|\bism\b/i },
  { slug: 'pci', re: /\bpci[ _\-]?dss?\b|cardholder|payment card|\bpan\b|pci-dss/i },
  { slug: 'hipaa', re: /\bhipaa\b|\bphi\b|health insurance|hipaa\b/i },
  { slug: 'nist', re: /\bnist\b|\bcsf\b|800-171|800-53/i },
  { slug: 'gdpr', re: /\bgdpr\b|eu privacy|art 28|\bsccs?\b|gdpr/i },
  { slug: 'cis', re: /\bcis\b|safeguard|implementation group/i },
  { slug: 'hitrust', re: /\bhitrust\b|\be1\b|\bi1\b|\br2\b/i },
  { slug: 'dpdpa', re: /\bdpdpa\b|digital personal data|cert-in|\bindia\b|data protection board/i },
  { slug: 'iso27701', re: /\biso[ _\-]?27701\b|privacy information management|\bpims\b/i },
  { slug: 'coppa', re: /\bcoppa\b|childrens? data|verifiable parental consent/i },
  { slug: 'lgpd', re: /\blgpd\b|lei geral|brazil data|brazil privacy/i },
  { slug: 'pdpa', re: /\bpdpa\b|singapore data|singapore privacy|pdpc\b/i },
  { slug: 'pipl', re: /\bpipl\b|china personal|personal information protection|\bccac\b/i },
  { slug: 'ccpa', re: /\bccpa\b|california consumer|california privacy|cpra\b|do not sell/i },
  { slug: 'fedramp', re: /\bfedramp\b|\bat o\b|3pao\b|joint authorization|fips 199|\b800-53\b|security assessment plan|\bssp\b/i },
  { slug: 'cjis', re: /\bcjis\b|criminal justice|ncic\b|nleats?\b|n-dex|\bfbi\b|background check|fingerprint/i },
];

// Alias groups for fuzzy matching.
const ALIASES = [
  { slugs: ['gdpr', 'dpdpa', 'ccpa', 'lgpd', 'pdpa', 'pipl', 'coppa'], re: /\bprivacy\b|\bdata protection\b|\bpersonal data\b|\bpersonal information\b/i },
  { slugs: ['iso27001', 'nist', 'cis', 'soc2', 'iso27701', 'hitrust'], re: /\binfosec\b|information security\b|security program\b|cybersecurity\b|security framework\b/i },
];

function norm(s) {
  return s.toLowerCase().replace(/[^a-z0-9.\s-]/g, ' ').replace(/\s+/g, ' ').trim();
}

// Detect which frameworks a query references (multi-framework support).
function pickFrameworks(q) {
  const matched = [];
  const seen = new Set();
  for (const fw of FW_MATCH) {
    if (fw.re.test(q) && !seen.has(fw.slug)) { matched.push(fw.slug); seen.add(fw.slug); }
  }
  // Check alias groups.
  for (const group of ALIASES) {
    if (group.re.test(q)) {
      for (const slug of group.slugs) {
        if (!seen.has(slug) && !matched.includes(slug)) { matched.push(slug); seen.add(slug); }
      }
    }
  }
  // Detect "X vs Y" / "X and Y" patterns for multi-framework.
  if (!matched.length) {
    const pairs = q.match(/(?:across|between|vs|versus|and|or)\s*([a-z][a-z ]{2,30})/gi);
    if (pairs) {
      for (const pair of pairs) {
        const words = pair.toLowerCase().split(/\s+(?:vs|versus|and|or)\s+/);
        for (const w of words) {
          const slug = FW_MATCH.find(f => f.re.test(w));
          if (slug && !seen.has(slug.slug)) { matched.push(slug.slug); seen.add(slug.slug); }
        }
      }
    }
  }
  return matched;
}

// Detect whether a query contains multiple intents (compound).
function detectIntents(q) {
  const found = [];
  for (const it of INTENTS) {
    const score = it.words.reduce((s, w) => (q.includes(norm(w)) ? s + w.length : s), 0);
    if (score > 0) found.push({ id: it.id, score });
  }
  if (!found.length) return [{ id: 'general', score: 0 }];
  found.sort((a, b) => b.score - a.score);
  // Always include the top intent; also include others if clearly present (compound).
  const top = found[0];
  const compound = found.filter(f => f.id !== top.id && f.score >= top.score * 0.4);
  return [top, ...compound];
}

// Build a "Wise Advisor" recommendation: concrete next steps with reasoning.
function buildRecommendation(intents, fws, q) {
  const fwNames = fws.map(id => FRAMEWORK_KB[id]?.name || id);
  const hasAudit = intents.some(i => i.id === 'audit');
  const hasPushback = intents.some(i => i.id === 'pushback');
  const hasContract = intents.some(i => i.id === 'contract');
  const hasDiscrepancy = intents.some(i => i.id === 'discrepancy');
  const hasMap = intents.some(i => i.id === 'map');
  const hasEnvironment = intents.some(i => i.id === 'environment');

  // Generic quick wins (always useful).
  const quickWins = [
    'Implement phishing-resistant MFA on all privileged and externally exposed accounts.',
    'Publish a single retention schedule and wire deletion jobs to it.',
    'Stand up a vendor programme: one inventory, one DPA template, per-regulation addenda.',
  ];

  if (hasContract || fwNames.length === 0 && q.includes('vendor')) {
    return {
      heading: 'What I recommend you do next',
      steps: [
        { title: 'Send the baseline clause set first', why: 'Baseline clauses (compliance obligations, evidence, audit rights, incident response, retention, flow-down) apply to every vendor regardless of framework — they establish the floor.', evidence: "Draft the clause set from VENDOR_CLAUSE_BASE; send with the security questionnaire." },
        { title: 'Layer framework-specific addenda', why: `Each framework your vendor touches adds a required clause (${fwNames.join(', ')}). The contract must name them and the most stringent notification SLA.`, evidence: 'VENDOR_CLAUSE_CONDITIONAL for each framework; the tightest regulatory window.' },
        { title: 'Require evidence on a cadence, not a sticker', why: 'Certifications lapse — contract maintenance + evidence delivery, not just the certificate attachment.', evidence: 'Annual reports, exception addenda, subservice SOC 2 reports.' },
      ],
      nextSteps: ['Ask for the most recent SOC 2 / ISO report', 'Confirm sub-processor list and DPA chain', 'Agree the most stringent breach-notification SLA'],
    };
  }

  if (hasEnvironment) {
    return {
      heading: 'What I recommend you do next',
      steps: [
        { title: 'Build a single asset inventory', why: 'Every control evaluation starts from an accurate asset inventory — cloud services, on-prem servers, physical servers, databases, and purchased assets. Tag each asset with its environment and control objective.', evidence: 'Asset inventory (cloud + on-prem + purchased), CM-8 artifacts.' },
        { title: 'Generate and maintain a machine SBOM', why: 'FedRAMP (CM-11) and federal procurement now require a software bill of materials for every deliverable. An SBOM makes the software supply chain visible to the auditor.', evidence: 'SBOM generation tool output (CycloneDX/SPDX), CI pipeline integration.' },
        { title: 'Decide carve-out vs carve-in per vendor', why: 'The carve-out/carve-in choice determines who provides evidence to the auditor. Document it explicitly — auditors ask for this decision, not a default.', evidence: 'Vendor carve-out/carve-in decision log; CUECs for carve-out; vendor evidence for carve-in.' },
        { title: 'Segment BYOD from sensitive data', why: 'BYOD devices cannot be fully controlled like corporate endpoints. Restrict BYOD to a managed container/VDI or block access to sensitive data (CJI, PII, PHI).', evidence: 'MDM/EDR policy, container/VDI config, BYOD access rules.' },
        { title: 'Define the shared-responsibility matrix', why: 'Cloud inherits CSP controls; on-prem/physical servers and on-prem databases are fully customer-owned. The matrix shows what each party evidences.', evidence: 'Shared-responsibility matrix per asset class.' },
      ],
      nextSteps: ['Complete the asset inventory', 'Generate the SBOM', 'Decide carve-out/carve-in for each vendor', 'Restrict BYOD from sensitive data'],
    };
  }

  if (hasDiscrepancy) {
    return {
      heading: 'What I recommend you do next',
      steps: [
        { title: 'Implement the strictest overlapping control', why: 'Auditors accept documented reconciliation far more often than they admit. One control satisfying the strictest requirement closes multiple frameworks.', evidence: 'Pick the strictest clock (PCI 12mo online, HIPAA 6yr) and apply it everywhere.' },
        { title: 'Document the marginal differences in a retention/risk matrix', why: 'The conflict is rarely in the control itself — it is in the retention/notification clock. A signed schedule is your defence.', evidence: 'Retention schedule, risk-treatment register, legal sign-off.' },
        { title: 'Show the reconciliation to the auditor proactively', why: 'Presenting the matrix before they raise it reframes you as rigorous, not non-compliant.', evidence: 'One-page reconciliation matrix per conflict topic.' },
      ],
      nextSteps: ['List the conflicting clocks across your frameworks', 'Draft a one-page reconciliation matrix', 'Present it in your next readiness review'],
    };
  }

  if (hasAudit) {
    return {
      heading: 'What I recommend you do next',
      steps: [
        { title: 'Pin the finding to the exact control text', why: 'A vague finding often dissolves when pinned to the precise criterion (TSC, Annex A, PCI req, CFR citation). Ask for the citation in writing.', evidence: 'Auditor report excerpt, the cited control text.' },
        { title: 'Distinguish design vs operating effectiveness', why: 'If the control exists and meets its intent but evidence is thin, argue operating-effectiveness — not a gap.', evidence: 'Control description + operating evidence (logs, reviews, tests).' },
        { title: 'Propose compensating or equivalent controls', why: 'Where the exact control isn\u2019t feasible, documented compensating controls (PCI CSF, ISO equivalent) are defensible.', evidence: 'Compensating control declaration signed by the owner.' },
      ],
      nextSteps: ['Get the exact control citation', 'Assemble the operating evidence pack', 'Prepare the compensating-control argument'],
    };
  }

  if (hasPushback) {
    return {
      heading: 'What I recommend you do next',
      steps: [
        { title: 'Challenge the scope before challenging the finding', why: 'If the item sits outside the attestation boundary (carved-out subservice, CUEC), the finding should be withdrawn — this is the cheapest win.', evidence: 'Signed system description, control mapping matrix.' },
        { title: 'Prove completeness, not volume', why: 'A full review queue with sign-offs beats a sampled one. Show nothing slipped through.', evidence: 'IAM review tickets, exception logs, owner lists.' },
        { title: 'Acknowledge residual risk explicitly', why: 'Risk-based frameworks (ISO/NIST/HIPAA-addressable) reward a documented risk decision with an owner and date over silent non-compliance.', evidence: 'Risk register entry + accepted residual risk signature.' },
      ],
      nextSteps: ['Request the auditor scope the finding precisely', 'Pull the complete evidence pack', 'Draft your response with the risk decision'],
    };
  }

  if (hasMap) {
    return {
      heading: 'What I recommend you do next',
      steps: [
        { title: 'Start from the unified policy map', why: 'One area (e.g. Access Management) maps to controls across every framework — map once, satisfy many.', evidence: 'UNIFIED_POLICY_MAP by area.' },
        { title: 'Drill into your highest-risk framework first', why: 'Pick the framework with the broadest scope or strictest enforcement and build outward.', evidence: 'Framework scope, enforcement history.' },
        { title: 'Document the honest tension', why: 'Each mapping has a discrepancy — auditors respect a documented reconciliation more than a clean but false claim.', evidence: 'Discrepancy note per area + retention matrix.' },
      ],
      nextSteps: ['Pick your top 3 policy areas', 'Map them across your frameworks', 'Write the discrepancy note for each'],
    };
  }

  // Framework deep-dive fallback.
  if (fwNames.length) {
    return {
      heading: 'What I recommend you do next',
      steps: [
        { title: 'Close the top findings first', why: `The ${fwNames.join(' & ')} observations that recur in audits are evidence-gaps (reviews, scope, subservices). Fix those before anything else.`, evidence: `${fwNames.map(f => FRAMEWORK_KB[f]?.observations?.[0]?.finding).filter(Boolean).join('; ')}` },
        { title: 'Assemble the evidence pack', why: 'Maturity is evidence of operating effectiveness across the period — sign-offs, dates, completeness — not the control description alone.', evidence: 'Review tickets, exception logs, system-generated owner lists.' },
        { title: 'Prepare the pushback playbook', why: 'For each likely finding, have the scope-boundary, citation, compensating-control, and risk-decision arguments ready.', evidence: 'GRC_RESPONSE_PLAYBOOK + framework rebuttals.' },
      ],
      nextSteps: ['List your top 3 likely findings', 'Pull the operating evidence', 'Rehearse the scope-boundary argument'],
    };
  }

  // Truly general: quick wins.
  return {
    heading: 'What I recommend you do next',
    steps: quickWins.slice(0, 3).map((title, i) => ({
      title,
      why: 'These are the controls that satisfy the strictest overlapping requirement across most frameworks — one action closes several obligations.',
      evidence: 'Framework gap analysis, current control inventory.',
    })),
    nextSteps: quickWins.slice(0, 3),
  };
}

export function askGrcAssistant(query) {
  const q = norm(query);
  const fws = pickFrameworks(q);
  const intents = detectIntents(q);
  const primary = intents[0].id;
  const sections = [];
  let summary = '';
  const fwObjs = fws.map(id => FRAMEWORK_KB[id]).filter(Boolean);

  // 1) Contract / vendor clauses
  if (primary === 'contract' || q.includes('vendor') && !fws.length) {
    summary = 'Here is what to explicitly include when your client deals with a vendor that must comply with these frameworks — plus the evidence to require.';
    sections.push({
      heading: 'Baseline clauses for every vendor agreement',
      why: 'These clauses apply regardless of framework — they establish the contractual floor and are non-negotiable in mature vendor programmes.',
      bullets: VENDOR_CLAUSE_BASE.map(c => `• ${c.title}: ${c.text}`),
    });
    const conds = (fws.length ? fws : ['soc2', 'iso27001', 'pci', 'hipaa', 'gdpr', 'dpdpa'])
      .map(id => VENDOR_CLAUSE_CONDITIONAL[id])
      .filter(Boolean);
    sections.push({
      heading: 'Framework-specific flow-down clauses',
      why: `Each framework your vendor touches adds a required clause (${fws.map(id => FRAMEWORK_KB[id]?.name || id).join(', ')}). The contract must name them and the most stringent notification SLA.`,
      bullets: conds.map(c => `• [${c.label}] ${c.clause}`),
    });
    sections.push({
      heading: 'Why it matters',
      why: 'Certifications lapse; audit rights without independence protections are rarely exercised; notification timelines conflict.',
      bullets: [
        '• Certifications lapse — contract maintenance + evidence, not the sticker.',
        '• Audit rights without independence protections are rarely exercised; pair them with "rely on report" language.',
        '• Notification timelines conflict (CERT-In 6h vs GDPR 72h vs HIPAA 60d) — tie the vendor to the most stringent.',
        '• Flow everything down to subcontractors with the vendor remaining liable.',
      ],
    });
  }

   // 0.5) Control environment — SBOM, asset inventory, carve-out/in, BYOD, endpoint security
   if (primary === 'environment' || intents.some(i => i.id === 'environment')) {
     summary = 'Evaluating the control environment: SBOM, asset inventory, carve-out/carve-in, control objectives, BYOD, endpoint security, and on-prem vs cloud.';
     sections.push(
       { heading: 'Asset inventory & SBOM', why: 'Every control evaluation starts from an accurate asset inventory — cloud services, on-prem servers, physical servers, databases, and purchased assets. FedRAMP (CM-8/CM-11) and federal procurement require a machine-generated SBOM.', bullets: ['• Maintain one asset inventory across all environments (cloud, on-prem/physical servers, on-prem databases, purchased assets).', '• Generate a machine-readable SBOM (CycloneDX/SPDX) for every software deliverable; keep it updated in CI.', '• Tag each asset with its environment and control objective (confidentiality/integrity/availability).'] },
       { heading: 'Carve-out vs carve-in vendor assessment', why: 'The carve-out/carve-in choice determines who provides evidence to the auditor — it must be decided explicitly, not assumed.', bullets: ['• Carve-out: the subservice is excluded; the client must assess complementary user entity controls (CUECs).', '• Carve-in: the vendor is in scope; the vendor must provide evidence (SOC 2, FedRAMP ATO, CJIS compliance).', '• Document the decision and the evidence each party provides.'] },
       { heading: 'BYOD & endpoint security', why: 'Corporate endpoints get full EDR/MDM/disk encryption; BYOD devices cannot be controlled the same way and must be segregated.', bullets: ['• Corporate assets (purchased, on-prem servers, physical servers): full EDR/MDM/disk encryption.', '• BYOD: restrict to a managed container/VDI, or block access to sensitive data (CJI, PII, PHI).', '• Define endpoint security control objectives per device class and evidence accordingly.'] },
       { heading: 'On-prem / physical vs cloud shared responsibility', why: 'Cloud inherits CSP baseline controls; on-prem servers, physical servers, and on-prem databases are fully customer-owned.', bullets: ['• Cloud: CSP-inherited + customer-configured controls.', '• On-prem/physical servers & databases: 100% customer (physical access, environmental, encryption, segmentation).', '• Purchased assets: vendor-supported — clarify support scope in the contract.', '• Publish a shared-responsibility matrix per asset class.'] },
     );
   }

   // 2) Audit observations + 3) pushback
  if (primary === 'audit') {
    const list = (fws.length ? fws : order).map(id => FRAMEWORK_KB[id]).filter(Boolean);
    summary = 'Common audit observations by framework — and what really drives them:';
    list.forEach(fw => {
      if (fw.observations.length) {
        sections.push({
          heading: `${fw.name} — typical findings`,
          why: 'These findings recur because they are evidence-gaps, not control-gaps — the controls usually exist but lack operating proof.',
          bullets: fw.observations.map(o => `• ${o.finding} — ${o.why}`),
        });
      }
    });
    sections.push({
      heading: 'Themes that recur across all frameworks',
      why: 'Auditors sample evidence across the attestation period; anything that is a snapshot or undocumented fails.',
      bullets: [
        '• Evidence of operating effectiveness across the whole period (not a snapshot).',
        '• Reviews that lack sign-off, dates, or completeness (access reviews are #1).',
        '• Stale scope/description, network diagrams, or vendor lists.',
        '• Emergency changes, subservices/sub-processors, and restores that are configured but never tested.',
      ],
    });
  } else if (primary === 'pushback') {
    const list = (fws.length ? fws : order).map(id => FRAMEWORK_KB[id]).filter(Boolean);
    summary = 'GRC rebuttal playbook — how to professionally challenge an audit finding without eroding trust:';
    sections.push({
      heading: 'General response technique',
      why: 'The goal is not to argue — it is to show the auditor the control exists, meets its intent, and is evidenced.',
      bullets: GRC_RESPONSE_PLAYBOOK.map(c => `• ${c.title}: ${c.body}`),
    });
    list.forEach(fw => {
      if (fw.rebuttals.length) {
        sections.push({
          heading: `${fw.name} — framework-specific pushback`,
          why: 'Framework-specific pushbacks work because they cite the exact boundary or criterion the auditor must respect.',
          bullets: fw.rebuttals.map(r => `• ${r.finding}: ${r.pushback} (Evidence: ${r.evidence})`),
        });
      }
    });
  }

  // 4) Discrepancies / conflicts (compound: audit + discrepancy)
  if (primary === 'discrepancy' || intents.some(i => i.id === 'discrepancy')) {
    const rel = fws.length
      ? DISCREPANCY_MATRIX.filter(row => fws.some(f => {
          const s = JSON.stringify(row).toLowerCase();
          return s.includes((FRAMEWORK_KB[f]?.name || f).toLowerCase().split(' ')[0]);
        }))
      : DISCREPANCY_MATRIX;
    summary = 'Cross-framework discrepancies your auditors, vendors and contracts must reconcile:';
    sections.push({
      heading: 'Discrepancy radar',
      why: 'The conflicts are rarely about the control itself — they are about retention clocks, notification windows, and scope boundaries.',
      bullets: (rel.length ? rel : DISCREPANCY_MATRIX).map(r => `• ${r.topic}: ${r.conflict}\n   → Reconcile: ${r.reconcile}`),
    });
    sections.push({
      heading: 'One-liner reconciliation principle',
      why: 'Implement the strictest control; document the marginal others in risk treatment or a retention/schedule matrix.',
      bullets: [
        '• Implement the strictest control; document the marginal others in risk treatment or a retention/schedule matrix.',
      ],
    });
  }

  // 5) Policies → controls map
  if (primary === 'map') {
    const areas = UNIFIED_POLICY_MAP.filter(a => {
      if (!fws.length) return true;
      return fws.some(f => a.map[FRAMEWORK_KB[f]?.name]);
    });
    summary = 'What policies tie to what frameworks and what controls (and where they\u2019re honest with you about the tension):';
    sections.push({
      heading: 'Unified policy → framework → control map',
      why: 'One policy area often maps to controls across many frameworks — map once, satisfy many.',
      bullets: areas.map(a => {
        const mapStr = Object.entries(a.map).map(([k, v]) => `${k}: ${v}`).join(' | ');
        return `• ${a.area} — ${mapStr}\n   ⚠ ${a.discrepancy}`;
      }),
    });
    if (!fws.length) {
      sections.push({
        heading: 'Drill into a framework to see its full policy list',
        why: 'Each framework has its own policy structure; start with the one carrying the broadest scope or strictest enforcement.',
        bullets: order.map(id => `• ${FRAMEWORK_KB[id]?.name} — ask "policies for ${FRAMEWORK_KB[id]?.name}"`),
      });
    }
  }

  // 6) Framework deep-dive when no specific intent matched
  if (primary === 'framework' && fws.length && !sections.length) {
    const fw = fwObjs[0];
    summary = `Deep dive into ${fw.name}. Here is the essentials:`;
    if (fw.policies.length) {
      sections.push({ heading: `${fw.name} — key policies → controls`, why: 'Controls are the concrete requirements the auditor will test.', bullets: fw.policies.map(p => `• ${p.area}: ${p.controls.join('; ')} ${p.note ? '— ' + p.note : ''}`) });
    }
    if (fw.observations.length) {
      sections.push({ heading: 'Common audit observations', why: 'Findings usually trace back to missing evidence.', bullets: fw.observations.map(o => `• ${o.finding} — ${o.why}`) });
    }
    if (fw.rebuttals.length) {
      sections.push({ heading: 'Suggested GRC pushback', why: 'Framework-specific rebuttals cite the exact boundary or criterion.', bullets: fw.rebuttals.map(r => `• ${r.finding}: ${r.pushback}`) });
    }
    if (fw.clauses.length) {
      sections.push({ heading: 'Contract clauses to request/offer', why: 'The required clauses are non-negotiable in mature vendor programmes.', bullets: fw.clauses.map(c => `• [${c.required ? 'Required' : 'Recommended'}] ${c.title}: ${c.text}`) });
    }
  }

  // Fallback — still advise wisely.
  if (!sections.length) {
    summary = 'I could not pinpoint that yet, but here is how to use the knowledge base — and a start that will actually help:';
    sections.push({
      heading: 'Try phrasing your question around one of these areas',
      why: 'The assistant understands policy/control mapping, audit findings, GRC pushback, vendor contract clauses, and cross-framework conflicts.',
      bullets: [
        '• "What policies tie to <framework> and its controls?"',
        '• "Common audit observations in <framework>"',
        '• "How to push back on <finding>"',
        '• "Contract clauses when engaging a vendor"',
        '• "Where do <framework A> and <framework B> conflict?"',
        '• "What to include in a BAA with a subcontractor"',
      ],
    });
    sections.push({
      heading: 'General advice for GRC teams',
      why: 'These quick wins satisfy the strictest overlapping requirement across most frameworks.',
      bullets: [
        '• Always implement the strictest overlapping control; document the rest in risk treatment.',
        '• Keep a retention schedule + password policy that cite current standard text (no 90-day rotation).',
        '• Audit the evidence pipeline, not just the control: sign-off, dates, completeness.',
        '• Maintain one vendor list with per-regulation addenda (SOC report, BAA, DPA, PCI 12.8).',
      ],
    });
  }

  // Build the Wise Advisor recommendation.
  const recommendation = buildRecommendation(intents, fws, q);
  const nextSteps = recommendation.nextSteps;

  return { summary, sections, recommendation, nextSteps, intents: intents.map(i => i.id), frameworks: fws, suggestions: ASSISTANT_SUGGESTIONS, rawQuery: query };
}
