// HIPAA-specific domain data: role determination, scope, PHI flows, and
// citation / mandate metadata. Kept separate so the playbook stays declarative.
//
// Nothing in here invents a legal requirement. Every rule reference points at
// 45 CFR Part 164 (or Part 160 for definitions) and every link is an official
// HHS / eCFR URL.

export const ROLE_STORAGE_KEY = 'hipaa-role-scope-v1';
export const FLOW_STORAGE_KEY = 'hipaa-phi-flows-v1';

export const ROLE_OPTIONS = [
  {
    id: 'ce',
    label: 'Covered Entity (CE)',
    short: 'CE',
    blurb: 'You are a health plan, healthcare provider who bills electronically, or a healthcare clearinghouse.',
    cite: '45 CFR §160.103',
    citeUrl: 'https://www.hhs.gov/hipaa/for-professionals/covered-entities/index.html',
    duties: [
      'Issue a Notice of Privacy Practices (§164.520)',
      'Give individuals access, amendment, accounting and restriction rights (§164.524–528)',
      'Notify affected individuals, HHS and media of breaches (§164.404, §164.406, §164.408)',
      'Sign BAAs with every business associate that touches PHI (§164.504(e))',
    ],
  },
  {
    id: 'ba',
    label: 'Business Associate (BA)',
    short: 'BA',
    blurb: 'You create, receive, maintain or transmit PHI on behalf of a covered entity, under a BAA.',
    cite: '45 CFR §160.103',
    citeUrl: 'https://www.hhs.gov/hipaa/for-professionals/privacy/guidance/business-associates/index.html',
    duties: [
      'Implement the applicable Security Rule safeguards (§164.308(b), §164.314(a))',
      'Report breaches of unsecured PHI to the covered entity without unreasonable delay (§164.410(b))',
      'Flow the same obligations down to subcontractors (§164.502(e)(1)(ii))',
      'Give the covered entity access to records and support its compliance',
    ],
    notYourDuty: [
      'You do not publish your own Notice of Privacy Practices — the covered entity does.',
      'You do not notify individuals, HHS or media of a breach; you report to the covered entity and it notifies.',
    ],
  },
  {
    id: 'dual',
    label: 'Both — Covered Entity and Business Associate',
    short: 'CE + BA',
    blurb: 'A hybrid entity: you run your own PHI obligations and also act as a BA for other covered entities.',
    cite: '45 CFR §164.105',
    citeUrl: 'https://www.hhs.gov/hipaa/for-professionals/covered-entities/hybrid-entities/index.html',
    duties: [
      'CE duties apply to your own covered functions; BA duties apply to services you perform for other covered entities',
      'Keep the two sets of records and obligations separated so each obligation is met against the right data',
      'The same system can hold both; track which is which',
    ],
  },
  {
    id: 'subcontractor',
    label: 'Business Associate Subcontractor',
    short: 'BA sub',
    blurb: 'A vendor engaged by a business associate to perform a function involving PHI.',
    cite: '45 CFR §160.103',
    citeUrl: 'https://www.hhs.gov/hipaa/for-professionals/privacy/guidance/business-associates/index.html',
    duties: [
      'You are a business associate, and a BAA is required directly between you and the business associate that engages you',
      'Your flow-down obligations come from your contract with that BA, not only from its BAA with the covered entity',
      'Report to the engaging business associate, who reports onward to the covered entity',
    ],
  },
  {
    id: 'none',
    label: 'No regulated activity',
    short: 'None',
    blurb: 'You neither hold PHI on behalf of others, nor run a covered function, nor operate a BA relationship.',
    cite: '45 CFR §160.103',
    citeUrl: 'https://www.hhs.gov/hipaa/for-professionals/covered-entities/index.html',
    duties: [
      'HIPAA currently does not apply to you, and there is no HIPAA programme obligation to meet',
      'Re-evaluate before you start handling PHI, or before a customer asks you to sign a BAA',
    ],
  },
  {
    id: 'uncertain',
    label: 'Not sure — needs a human decision',
    short: 'Unclear',
    blurb: 'You have not determined your status, or the answer depends on facts you have not confirmed yet.',
    cite: '45 CFR §160.103',
    citeUrl: 'https://www.hhs.gov/hipaa/for-professionals/covered-entities/index.html',
    duties: [
      'HIPAA content stays available to read, but nothing below is treated as a settled obligation for you',
      'Unresolved questions stay marked unresolved — they are not quietly closed',
      'A named human has to record the determination before you rely on any of it',
    ],
  },
];

export const SCOPE_ACTIVITIES = [
  { id: 'plan', label: 'Health plan', hint: 'Administering health benefits, claims, eligibility' },
  { id: 'provider', label: 'Healthcare provider', hint: 'Delivering care and billing electronically' },
  { id: 'clearinghouse', label: 'Healthcare clearinghouse', hint: 'Routing claims and transactions between entities' },
  { id: 'ba-services', label: 'You provide services to a covered entity', hint: 'Under a BAA — hosting, support, billing, analytics' },
  { id: 'phi-inbound', label: 'You receive or hold PHI for your own operations', hint: 'Case notes, messages, claims files, support tickets' },
  { id: 'baa-requested', label: 'A customer has asked you to sign a BAA', hint: 'Often the clearest signal you are treated as a BA' },
];

// AI / communications surfaces where PHI commonly leaks. Every PHI-touching
// answer defaults to "unknown" so nothing is assumed safe or assumed scoped.
export const PHI_FLOW_QUESTIONS = [
  {
    id: 'llm-prompt',
    group: 'AI model calls',
    label: 'Do you send PHI to a hosted LLM API (Claude, OpenAI, Gemini, Bedrock, Azure OpenAI)?',
    why: 'Prompts to a hosted model are a disclosure of PHI to a third party. If the vendor is a BA, a BAA must be in place first.',
    cite: '45 CFR §164.502(b) minimum necessary; §164.308(b) BA contracts',
  },
  {
    id: 'llm-training',
    group: 'AI model calls',
    label: 'Do you use your own prompts or PHI to fine-tune / train any model?',
    why: 'Training runs retain data outside the request lifecycle and often sit outside the region a BAA covers.',
    cite: '45 CFR §164.502(b); §164.308(a)(1)(ii)(A) risk analysis',
  },
  {
    id: 'ai-gateway',
    group: 'AI model calls',
    label: 'Do you route model calls through an AI gateway, proxy or internal model router?',
    why: 'A gateway sees every prompt and response, which makes it a system in your ePHI inventory and a BA in its own right.',
    cite: '45 CFR §164.308(a)(1)(ii)(B) risk management; §164.502(e)(1)(ii) subcontractors',
  },
  {
    id: 'vector-rag',
    group: 'AI model calls',
    label: 'Do you use a vector store or RAG index built over PHI (embeddings of notes, claims, transcripts)?',
    why: 'Embeddings are derived from PHI and inherit its status. The index is usually forgotten in asset inventories.',
    cite: '45 CFR §164.308(a)(1)(ii)(A) risk analysis; §164.312(c)(1) integrity',
  },
  {
    id: 'inference-subprocessor',
    group: 'AI model calls',
    label: 'Do your model or AI vendors use their own subprocessors to serve you?',
    why: 'A BAA is only useful if it binds the vendors actually in the chain. HHS requires a BAA with each subprocessor that creates, receives, maintains or transmits PHI.',
    cite: '45 CFR §164.502(e)(1)(ii); §164.504(e)(2)(i)',
  },
  {
    id: 'ai-output',
    group: 'AI outputs',
    label: 'Do model outputs get written back to a chart, ticket, record or other system of record?',
    why: 'Output is a new disclosure of PHI. It also needs the same integrity controls as any other write.',
    cite: '45 CFR §164.312(c)(1) integrity; §164.502(b) minimum necessary',
  },
  {
    id: 'ai-logging',
    group: 'AI outputs',
    label: 'Do you log prompts, completions or traces (in your own logs, or a vendor’s observability stack)?',
    why: 'Debug logs routinely persist more PHI than the feature needs, and logs get shipped to third-party tools.',
    cite: '45 CFR §164.308(a)(1)(ii)(B) risk management; §164.312(b) audit controls',
  },
  {
    id: 'eval-snapshots',
    group: 'AI outputs',
    label: 'Do you keep eval sets, few-shot examples, test fixtures or prompt snapshots that contain real PHI?',
    why: 'These are almost always copied straight from production and are long-lived. They are rarely in scope for any BAA.',
    cite: '45 CFR §164.308(a)(1)(ii)(A) risk analysis; §164.514(b)(2) de-identification',
  },
  {
    id: 'sms-email',
    group: 'Messaging surfaces',
    label: 'Do you send or receive PHI by SMS, MMS or consumer messaging apps?',
    why: 'Consumer messaging is typically end-to-end encrypted with no BAA and no audit trail. It is a recognised breach path.',
    cite: '45 CFR §164.312(e)(1) transmission security; §164.402 breach definition',
  },
  {
    id: 'chat-slack',
    group: 'Messaging surfaces',
    label: 'Do you receive PHI in Slack, Teams, or a shared support inbox?',
    why: 'Workplace chat retention and search are usually outside your control and rarely covered by a BAA.',
    cite: '45 CFR §164.308(a)(1)(ii)(B) risk management; §164.312(b) audit controls',
  },
  {
    id: 'support-tickets',
    group: 'Messaging surfaces',
    label: 'Do customers or patients submit PHI in support tickets or forms?',
    why: 'Support tooling is a classic unrecognised BA, and free/consumer tiers are rarely BAA-eligible.',
    cite: '45 CFR §160.103 business associate; §164.504(e)(2)',
  },
  {
    id: 'session-recordings',
    group: 'Messaging surfaces',
    label: 'Do you record calls, screen sessions, or transcribe conversations that may contain PHI?',
    why: 'Recordings and transcripts are new copies of PHI held by a vendor you may not have assessed.',
    cite: '45 CFR §164.312(a)(2)(iv) encryption; §164.308(b) BA contracts',
  },
];

export const FLOW_ANSWERS = [
  { id: 'unknown', label: 'Needs confirmation' },
  { id: 'yes', label: 'Yes' },
  { id: 'no', label: 'No' },
];

export const BAA_ANSWERS = [
  { id: 'unknown', label: 'Not checked' },
  { id: 'signed', label: 'Signed' },
  { id: 'pending', label: 'In progress' },
  { id: 'none', label: 'No — not applicable / not signed' },
];

// ---------------------------------------------------------------------------
// Citations and mandate status
// ---------------------------------------------------------------------------

export const HHS_SOURCES = {
  security: {
    label: 'HHS Security Rule',
    url: 'https://www.hhs.gov/hipaa/for-professionals/security/index.html',
  },
  securityRegs: {
    label: 'Security Rule — 45 CFR §164.302–318',
    url: 'https://www.hhs.gov/hipaa/for-professionals/security/laws-regulations/index.html',
  },
  riskAnalysis: {
    label: 'HHS Security Risk Assessment guidance',
    url: 'https://www.hhs.gov/hipaa/for-professionals/security/guidance/risk-analysis-guidance.html',
  },
  privacy: {
    label: 'HHS Privacy Rule',
    url: 'https://www.hhs.gov/hipaa/for-professionals/privacy/index.html',
  },
  privacyRegs: {
    label: 'Privacy Rule — 45 CFR §164.500–534',
    url: 'https://www.hhs.gov/hipaa/for-professionals/privacy/laws-regulations/index.html',
  },
  npp: {
    label: 'Notice of Privacy Practices — HHS guidance',
    url: 'https://www.hhs.gov/hipaa/for-professionals/privacy/guidance/notices/index.html',
  },
  individualsRights: {
    label: 'Individual rights — HHS guidance',
    url: 'https://www.hhs.gov/hipaa/for-professionals/privacy/guidance/rights/index.html',
  },
  minimumNecessary: {
    label: 'Minimum necessary — HHS guidance',
    url: 'https://www.hhs.gov/hipaa/for-professionals/privacy/guidance/minimum-necessary-requirement/index.html',
  },
  deidentification: {
    label: 'De-identification guidance — HHS',
    url: 'https://www.hhs.gov/hipaa/for-professionals/privacy/special-topics/de-identification/index.html',
  },
  ba: {
    label: 'Business associates — HHS guidance',
    url: 'https://www.hhs.gov/hipaa/for-professionals/privacy/guidance/business-associates/index.html',
  },
  baContracts: {
    label: 'Business associate contracts — HHS guidance',
    url: 'https://www.hhs.gov/hipaa/for-professionals/privacy/guidance/business-associates/index.html',
  },
  breach: {
    label: 'Breach Notification Rule — HHS',
    url: 'https://www.hhs.gov/hipaa/for-professionals/breach-notification/index.html',
  },
  breachPortal: {
    label: 'OCR Breach Portal',
    url: 'https://portal.hhs.gov/breach-portal/',
  },
  ocr: {
    label: 'OCR — compliance & enforcement',
    url: 'https://www.hhs.gov/hipaa/for-professionals/compliance-enforcement/index.html',
  },
  coveredEntity: {
    label: 'Covered entities — HHS',
    url: 'https://www.hhs.gov/hipaa/for-professionals/covered-entities/index.html',
  },
  hybridEntity: {
    label: 'Hybrid entities — HHS guidance',
    url: 'https://www.hhs.gov/hipaa/for-professionals/covered-entities/hybrid-entities/index.html',
  },
  training: {
    label: 'Privacy Rule training — HHS guidance',
    url: 'https://www.hhs.gov/hipaa/for-professionals/privacy/guidance/training/index.html',
  },
  policies: {
    label: 'Policies and procedures — HHS guidance',
    url: 'https://www.hhs.gov/hipaa/for-professionals/security/guidance/policies-procedures.html',
  },
  contingency: {
    label: 'Contingency planning — HHS guidance',
    url: 'https://www.hhs.gov/hipaa/for-professionals/security/guidance/contingency-plan.html',
  },
  workforce: {
    label: 'Workforce security — HHS guidance',
    url: 'https://www.hhs.gov/hipaa/for-professionals/security/guidance/workforce-security.html',
  },
  auditControls: {
    label: 'Audit controls — HHS guidance',
    url: 'https://www.hhs.gov/hipaa/for-professionals/security/guidance/audit-controls.html',
  },
  accessControl: {
    label: 'Access control — HHS guidance',
    url: 'https://www.hhs.gov/hipaa/for-professionals/security/guidance/access-control.html',
  },
  transmission: {
    label: 'Transmission security — HHS guidance',
    url: 'https://www.hhs.gov/hipaa/for-professionals/security/guidance/transmission-security.html',
  },
  media: {
    label: 'Device and media controls — HHS guidance',
    url: 'https://www.hhs.gov/hipaa/for-professionals/security/guidance/device-media-controls.html',
  },
  facilities: {
    label: 'Facility access controls — HHS guidance',
    url: 'https://www.hhs.gov/hipaa/for-professionals/security/guidance/facility-access-controls.html',
  },
  workstations: {
    label: 'Workstation use & security — HHS guidance',
    url: 'https://www.hhs.gov/hipaa/for-professionals/security/guidance/workstation-use.html',
  },
  evaluation: {
    label: 'Evaluation — HHS guidance',
    url: 'https://www.hhs.gov/hipaa/for-professionals/security/guidance/evaluation.html',
  },
  eCfr: {
    label: '45 CFR Part 164 — eCFR (current text)',
    url: 'https://www.ecfr.gov/current/title-45/subtitle-A/subchapter-C/part-164',
  },
  definitions: {
    label: '45 CFR §160.103 Definitions — eCFR',
    url: 'https://www.ecfr.gov/current/title-45/subtitle-A/subchapter-C/part-160/subpart-A/section-160.103',
  },
  penalties: {
    label: '42 U.S.C. §1320d-5 — civil monetary penalties',
    url: 'https://www.law.cornell.edu/uscode/text/42/1320d-5',
  },
};

// Which Security Rule implementation specifications are addressable.
// Anything not listed here is treated as required. Where a task cites a range
// that mixes both, the task is left as "mixed" and the range is shown in full.
export const ADDRESSABLE_SPECS = [
  '164.308(a)(1)(ii)(B)',
  '164.308(a)(1)(ii)(D)',
  '164.308(a)(3)(ii)(A)',
  '164.308(a)(3)(ii)(B)',
  '164.308(a)(3)(ii)(D)',
  '164.308(a)(4)(ii)(C)',
  '164.308(a)(5)(ii)(C)',
  '164.308(a)(8)(ii)(B)',
  '164.310(a)(1)(ii)(A)',
  '164.310(a)(1)(ii)(B)',
  '164.310(a)(1)(ii)(C)',
  '164.310(a)(2)(ii)(B)',
  '164.310(b)',
  '164.310(c)',
  '164.310(d)(2)(ii)',
  '164.310(d)(2)(iii)',
  '164.310(d)(2)(iv)',
  '164.312(a)(1)(ii)(A)',
  '164.312(a)(1)(ii)(B)',
  '164.312(a)(2)(ii)',
  '164.312(a)(2)(iii)',
  '164.312(a)(2)(iv)',
  '164.312(b)(ii)',
  '164.312(c)(2)',
  '164.312(d)',
  '164.312(e)(2)(ii)(A)',
  '164.312(e)(2)(ii)(B)',
];

// Ranges that deliberately mix required and addressable specs.
export const MIXED_RANGES = [
  '164.306',
  '164.308',
  '164.310',
  '164.312',
  '164.314',
  '164.316',
  '164.302',
];

export const MANDATE_NOTES = {
  guidance:
    'Not a HIPAA requirement. This is HHS guidance, a third-party framework, or an internal practice. Nothing in HIPAA obliges you to adopt it.',
  addressable:
    'Addressable — not optional. §164.306(d) requires you to assess whether it is reasonable and appropriate in your circumstances; if you decide not to implement it, you must document the decision and the alternative safeguard you used instead.',
  required:
    'Required implementation specification.',
  mixed:
    'This range contains both required and addressable specifications — the citation below lists the individual specs so you can tell which is which.',
};

function normaliseSection(s) {
  return s.replace(/^§/, '').replace(/\s+/g, '');
}

const ROMAN = ['i', 'ii', 'iii', 'iv', 'v', 'vi', 'vii', 'viii', 'ix', 'x'];

// Matches 45 CFR references, keeping a trailing range suffix intact for display.
// "§164.302–318" -> "164.302–318", "§164.308(a)(1)(ii)(A)–(D)" -> as written.
const RANGE_TAIL = String.raw`(\s*[–\-]\s*(?:§\s*)?(?:\d+|\([^()]*\)))?`;
const CFR_RE = new RegExp(String.raw`§\s*(\d{3}\.\d+(?:\([^()]*\))*)` + RANGE_TAIL, 'g');
// Fallback for controls that cite a section without the § symbol.
const BARE_RE = new RegExp(String.raw`(\d{3}\.\d+(?:\([^()]*\))*)` + RANGE_TAIL);
// Matches the HITECH penalty sections, which live outside the CFR.
const USC_RE = new RegExp(
  String.raw`(42\s*U\.?S\.?C\.?[^,;]*?§\s*\d+[a-z]*(?:-[0-9a-z]+)*(?:\([^()]*\))*)` + RANGE_TAIL,
  'gi',
);

export function extractSections(control) {
  if (!control) return [];
  const out = [];
  let m;
  CFR_RE.lastIndex = 0;
  while ((m = CFR_RE.exec(control))) {
    const tail = (m[2] || '').replace(/\s+/g, '');
    out.push(tail ? `${m[1]}${tail}` : m[1]);
  }
  USC_RE.lastIndex = 0;
  while ((m = USC_RE.exec(control))) {
    out.push(m[0].replace(/\s+/g, ' ').trim());
  }
  if (out.length === 0) {
    const bare = control.match(BARE_RE);
    if (bare) {
      const tail = (bare[2] || '').replace(/\s+/g, '');
      out.push(tail ? `${bare[1]}${tail}` : bare[1]);
    }
  }
  return out;
}

// Expand "164.308(a)(1)(ii)(A)–(D)" into the individual specs it covers, so each
// one can be checked separately. The trailing designators are either lower-case
// roman numerals (§164.310(d)(2)(i)–(iv)) or upper-case letters
// (§164.308(a)(1)(ii)(A)–(D)). Returns null when the suffix is a bare section
// number rather than a sub-paragraph sequence, e.g. "164.302–318".
function expandSpecRange(section) {
  const s = String(section);
  let m = s.match(/^(.*?)\(([ivx]+)\)\s*[–\-]\s*\(([ivx]+)\)$/i);
  if (m) {
    const start = ROMAN.indexOf(m[2].toLowerCase());
    const end = ROMAN.indexOf(m[3].toLowerCase());
    if (start < 0 || end < 0 || end <= start || end - start > 12) return null;
    const stem = m[1];
    const out = [];
    for (let i = start; i <= end; i++) out.push(`${stem}(${ROMAN[i]})`);
    return out;
  }
  m = s.match(/^(.*?)\(([A-Z])\)\s*[–\-]\s*\(([A-Z])\)$/);
  if (m) {
    const start = m[2].charCodeAt(0) - 65;
    const end = m[3].charCodeAt(0) - 65;
    if (start < 0 || end < 0 || end <= start || end - start > 12) return null;
    const stem = m[1];
    const out = [];
    for (let i = start; i <= end; i++) out.push(`${stem}(${String.fromCharCode(65 + i)})`);
    return out;
  }
  return null;
}

// Every individual specification a citation refers to.
export function expandSpecs(section) {
  const s = String(section).replace(/^§/, '').replace(/\s+/g, '');
  const range = expandSpecRange(s);
  if (range) return range;
  if (/[–\-]/.test(s)) {
    const [left, right] = s.split(/[–\-]/);
    const l = left.trim();
    const r = right.trim();
    // A trailing bare number names the same part at a different section level,
    // e.g. "164.302–318" -> 164.302 and 164.318.
    if (/^\d+$/.test(r) && l.includes('.')) {
      const base = l.slice(0, l.indexOf('.') + 1);
      return [l, `${base}${r}`];
    }
    return [l, r];
  }
  return [s];
}

function specStatus(spec) {
  const p = normaliseSection(spec);
  if (ADDRESSABLE_SPECS.includes(p)) return 'addressable';
  if (p.split('.').length <= 2 && MIXED_RANGES.includes(p)) return 'mixed-range';
  return 'required';
}

export function mandateFor(control) {
  const sections = extractSections(control);
  if (sections.length === 0) return { status: 'none', sections: [] };
  const results = [];
  for (const sec of sections) {
    for (const spec of expandSpecs(sec)) results.push(specStatus(spec));
  }
  if (results.length === 0) return { status: 'none', sections };

  const concrete = results.filter(r => r !== 'mixed-range');
  const hasMixed = results.includes('mixed-range');
  const hasAddr = concrete.includes('addressable');
  const hasReq = concrete.includes('required');

  let status;
  if (hasAddr && hasReq) status = 'mixed';
  else if (hasAddr) status = 'addressable';
  // A section-level range such as §164.302–318 spans specs that are both
  // required and addressable, so it is reported as mixed rather than required.
  else if (hasMixed) status = 'mixed';
  else if (hasReq) status = 'required';
  else status = 'required';

  return { status, sections };
}

// Tasks that carry no CFR citation because they are not regulatory
// requirements — HHS audit guidance, third-party frameworks, or internal
// planning practice. They are labelled as such rather than presented as
// HIPAA obligations.
export const NON_REGULATORY = [
  {
    match: /ocr audit protocol/i,
    label: 'HHS OCR Audit Protocol — HHS guidance, not a regulation',
    url: 'https://www.hhs.gov/hipaa/for-professionals/compliance-enforcement/index.html',
  },
  {
    match: /corrective action plan/i,
    label: 'HHS OCR — resolution agreements and CAPs',
    url: 'https://www.hhs.gov/hipaa/for-professionals/compliance-enforcement/index.html',
  },
  {
    match: /enforcement action|enforcement trends|ocr case stud/i,
    label: 'HHS OCR enforcement actions and breach portal',
    url: 'https://www.hhs.gov/hipaa/for-professionals/compliance-enforcement/index.html',
  },
  {
    match: /hitrust/i,
    label: 'HITRUST CSF — third-party framework, not HIPAA',
    url: 'https://hitrustalliance.net/hitrust-framework',
  },
  {
    match: /nist/i,
    label: 'NIST CSF — voluntary framework, not HIPAA',
    url: 'https://www.nist.gov/cyberframework',
  },
  {
    match: /strategic compliance|maturity model/i,
    label: 'Internal programme design — no HIPAA requirement',
    url: 'https://www.hhs.gov/hipaa/for-professionals/security/index.html',
  },
];

function nonRegulatoryFor(control) {
  const c = String(control || '');
  return NON_REGULATORY.find(n => n.match.test(c)) || null;
}

export function buildCitation(control) {
  const { status, sections } = mandateFor(control);
  if (status === 'none') {
    const nr = nonRegulatoryFor(control);
    if (nr) {
      return { sections: [], status: 'guidance', note: MANDATE_NOTES.guidance, source: { label: nr.label, url: nr.url } };
    }
  }
  return {
    sections,
    status,
    note: MANDATE_NOTES[status] || null,
    source: sections.length ? sourceForSection(sections[0]) : HHS_SOURCES.security,
  };
}

export function ruleForSection(section) {
  const s = normaliseSection(section);
  if (s.startsWith('160.')) return 'definitions';
  if (s.startsWith('1320d')) return 'penalties';
  const n = parseInt(s.split('.')[0], 10);
  if (n === 164) {
    const p = parseInt(s.split('.')[1], 10);
    if (p >= 400 && p <= 414) return 'breach';
    if (p >= 500 && p <= 534) return 'privacyRegs';
    if (p >= 302 && p <= 318) return 'securityRegs';
    if (p === 308) return 'workforce';
    if (p === 310) return 'facilities';
    if (p === 312) return 'technical';
    if (p === 316) return 'policies';
    return 'eCfr';
  }
  return 'eCfr';
}

const TECHNICAL_SOURCES = {
  technical: 'accessControl',
  '164.312': 'technical',
  '164.312(b)': 'auditControls',
  '164.312(a)': 'accessControl',
  '164.312(e)': 'transmission',
  '164.312(d)': 'media',
  '164.310(d)': 'media',
  '164.310(b)': 'workstations',
  '164.310(c)': 'workstations',
  '164.310(a)': 'facilities',
  '164.308(a)(1)': 'riskAnalysis',
  '164.308(a)(1)(ii)(A)': 'riskAnalysis',
  '164.308(a)(3)': 'workforce',
  '164.308(a)(5)': 'training',
  '164.308(a)(7)': 'contingency',
  '164.308(b)': 'baContracts',
  '164.308(a)(8)': 'evaluation',
  '164.520': 'npp',
  '164.524': 'individualsRights',
  '164.526': 'individualsRights',
  '164.528': 'individualsRights',
  '164.522': 'individualsRights',
  '164.502(b)': 'minimumNecessary',
  '164.514(b)': 'deidentification',
  '164.514(d)': 'minimumNecessary',
  '164.404': 'breach',
  '164.406': 'breach',
  '164.408': 'breach',
  '164.410': 'breach',
  '164.504': 'baContracts',
  '164.502': 'ba',
  '164.530': 'training',
  '164.160': 'definitions',
};

function sourceForSection(section) {
  const s = normaliseSection(section);
  const keys = Object.keys(TECHNICAL_SOURCES).sort((a, b) => b.length - a.length);
  for (const k of keys) {
    if (s === k || s.startsWith(k)) return HHS_SOURCES[TECHNICAL_SOURCES[k]];
  }
  return HHS_SOURCES[ruleForSection(section)];
}

// Role applicability.
//
// This is deliberately conservative. Under 45 CFR §164.308(b) and §164.314(a)
// a business associate must implement the applicable parts of the Security
// Rule, and under §164.504(e)(3) a BA is bound by the Privacy Rule provisions
// HHS lists there. So most Security Rule work is NOT covered-entity-only.
// The genuine CE-only obligations are the Notice of Privacy Practices and
// notifying individuals / HHS / the media.
export const ALL_REGULATED = ['ce', 'dual', 'ba', 'subcontractor'];
export const CE_ONLY = ['ce', 'dual'];
export const ROLE_KEYS = ['ce', 'ba', 'dual', 'subcontractor', 'none', 'uncertain'];

const ROLE_NOTES = {
  npp: 'A Notice of Privacy Practices is a covered-entity obligation. If you are a business associate you do not publish one — but you must support the covered entity’s notice and its effective-date changes under §164.504(e)(3)(ii)(A).',
  individualRights: 'The right to answer the request belongs to the covered entity. As a business associate you are required to support the request, not to respond to the patient directly — §164.504(e)(3)(ii)(C)–(G).',
  externalNotification: 'Notifying individuals, HHS and the media is a covered-entity duty. A business associate reports the breach to the covered entity without unreasonable delay instead — §164.410(b).',
  baReport: 'As a business associate your duty runs upward: report the breach to the covered entity without unreasonable delay, and let the covered entity notify individuals and HHS. §164.410(b).',
  securityRule: 'Business associates must implement the applicable Security Rule safeguards, not just the covered entity — §164.308(b) and §164.314(a).',
  baContract: 'Both sides of a BAA have obligations: the covered entity signs it, and the business associate must comply with the terms and flow them down to subcontractors — §164.504(e)(1)(ii).',
  hybrid: 'In a hybrid entity you have two sets of obligations against the same systems. Track which is which, or obligations get applied to the wrong data.',
};

function anySectionStarts(sections, prefixes) {
  return sections.some(s => {
    const parts = String(s).split(/[–\-]/).map(p => p.trim());
    return parts.some(p => prefixes.some(pre => p.startsWith(pre)));
  });
}

export function classifyRoles(title, control) {
  const t = String(title || '').toLowerCase();
  const sections = extractSections(control);
  const sig = String(control || '').toLowerCase();

  if (/notice of privacy practices/.test(t) || anySectionStarts(sections, ['164.520'])) {
    return { roles: CE_ONLY, note: ROLE_NOTES.npp, kind: 'npp' };
  }
  if (/patient rights|individual rights/.test(t) || anySectionStarts(sections, ['164.522', '164.524', '164.526', '164.528'])) {
    return { roles: ALL_REGULATED, note: ROLE_NOTES.individualRights, kind: 'individual-rights' };
  }
  // A breach citation framed around a business associate is the BA reporting
  // upward, not the covered entity notifying individuals. §164.404(d), §164.410(b).
  const baFramed = /business associate|\bBA\b|vendor/i.test(`${t} ${sig}`)
    && !/individuals|media|hhs|press|newspaper/i.test(`${t} ${sig}`);
  if (baFramed && anySectionStarts(sections, ['164.40', '164.41', '164.414'])) {
    return { roles: ALL_REGULATED, note: ROLE_NOTES.baReport, kind: 'breach-report-to-ce' };
  }
  if (anySectionStarts(sections, ['164.404', '164.406', '164.408'])) {
    return { roles: CE_ONLY, note: ROLE_NOTES.externalNotification, kind: 'breach-notify-external' };
  }
  if (anySectionStarts(sections, ['164.410'])) {
    return { roles: ALL_REGULATED, note: ROLE_NOTES.baReport, kind: 'breach-report-to-ce' };
  }
  // The rest of the Breach Notification Rule — definitions, the four-factor
  // assessment, exceptions — applies to every regulated party.
  if (anySectionStarts(sections, ['164.4'])) {
    return { roles: ALL_REGULATED, note: null, kind: 'breach-general' };
  }
  if (/baa|business associate|ba contract|subcontractor/.test(t) || anySectionStarts(sections, ['164.502(e)', '164.504', '164.308(b)'])) {
    return { roles: ALL_REGULATED, note: ROLE_NOTES.baContract, kind: 'ba-contracting' };
  }
  if (/hybrid/.test(t) || anySectionStarts(sections, ['164.105'])) {
    return { roles: CE_ONLY, note: ROLE_NOTES.hybrid, kind: 'hybrid' };
  }
  if (anySectionStarts(sections, ['164.30', '164.31', '164.32', '164.316', '164.302'])) {
    return { roles: ALL_REGULATED, note: ROLE_NOTES.securityRule, kind: 'security-rule' };
  }
  if (anySectionStarts(sections, ['160.103', '160.105', '160.203'])) {
    return { roles: ALL_REGULATED, note: null, kind: 'definitions' };
  }
  if (/(1320d|42\s*u\.?s\.?c)/.test(sig.replace(/§/g, ''))) {
    return { roles: ALL_REGULATED, note: 'Civil monetary penalties apply to covered entities and business associates alike — 42 U.S.C. §1320d-5.', kind: 'enforcement' };
  }
  if (anySectionStarts(sections, ['164.5'])) {
    return { roles: ALL_REGULATED, note: null, kind: 'privacy-rule' };
  }
  return { roles: ALL_REGULATED, note: null, kind: 'general' };
}

// Applied to the shared startup-gap cards, which are ITGC guidance rather than
// role-specific legal duties.
export function startupGapRoleNote(gapText) {
  const t = String(gapText || '').toLowerCase();
  if (/baa/.test(t)) {
    return 'A BAA is required when the vendor is a business associate — that is, when it creates, receives, maintains or transmits PHI on your behalf. A tool that never touches PHI is not a business associate just because it handles personal data, and a BAA is not a general privacy contract.';
  }
  return null;
}

export function roleLabel(roleId) {
  const r = ROLE_OPTIONS.find(r => r.id === roleId);
  return r ? r.label : 'Not determined';
}
export function roleShort(roleId) {
  const r = ROLE_OPTIONS.find(r => r.id === roleId);
  return r ? r.short : '—';
}
