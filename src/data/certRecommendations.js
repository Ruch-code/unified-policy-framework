// Decision rules: given a company profile, which certifications to pursue and in what priority order.
// Built from current industry guidance (SOC 2 = US B2B default; ISO 27001 = global/EMEA; HIPAA/PCI = mandatory-by-data; HITRUST = healthcare depth).

export const PROFILE_QUESTIONS = [
  {
    id: 'industry',
    label: 'What best describes your organization?',
    options: [
      { value: 'saas', label: 'B2B SaaS / Software / Cloud' },
      { value: 'healthtech', label: 'Healthcare / Health-tech / Pharma' },
      { value: 'fintech', label: 'Fintech / Payments / Financial Services' },
      { value: 'ecommerce', label: 'E-commerce / Retail' },
      { value: 'enterprise', label: 'Enterprise / Multi-industry' },
      { value: 'global', label: 'Global / Multi-region operation' },
    ],
  },
  {
    id: 'data',
    label: 'Which sensitive data do you handle? (select all that apply)',
    multiple: true,
    options: [
      { value: 'phi', label: 'Protected Health Information (PHI)' },
      { value: 'card', label: 'Credit / Debit card (payment) data' },
      { value: 'pii', label: 'Customer personal data (PII)' },
      { value: 'none', label: 'No specially regulated data' },
    ],
  },
  {
    id: 'geo',
    label: 'Where are your primary customers?',
    options: [
      { value: 'us', label: 'United States (enterprise)' },
      { value: 'emea', label: 'Europe / UK / international' },
      { value: 'global', label: 'Global mix' },
      { value: 'india', label: 'India' },
      { value: 'asia', label: 'Asia-Pacific (Singapore / China / etc.)' },
    ],
  },
  {
    id: 'stage',
    label: 'What stage are you at?',
    options: [
      { value: 'early', label: 'Early seed / pre-revenue' },
      { value: 'growth', label: 'Growth — closing enterprise deals' },
      { value: 'established', label: 'Established / regulated & scaling' },
    ],
  },
];

// Each certification entry: triggers, priority tier, rationale, path, typical timeline & cost.
export const CERT_CATALOG = {
  'SOC 2': {
    type: 'Attestation (report), not a certification',
    tier: 1,
    color: '#6366f1',
    // Which elements of a selection prioritize SOC 2
    priorityScore: ({ industry, geo }) => {
      let s = 0;
      if (['saas', 'fintech', 'ecommerce', 'enterprise'].includes(industry)) s += 2;
      if (['us', 'global'].includes(geo)) s += 2;
      return s;
    },
    why: 'The de facto US B2B procurement standard. 91% of US orgs pursuing compliance start here; most US enterprise buyers require a SOC 2 Type II report.',
    timeline: 'Type I 3–6 mo · Type II 9–15 mo',
    cost: '$50K–$150K year 1 (all-in)',
    note: 'Only the Security criterion is mandatory. Add Availability / Confidentiality / Privacy based on your service.',
  },
  'ISO 27001': {
    type: 'Certification (accredited body)',
    tier: 1,
    color: '#10b981',
    priorityScore: ({ industry, geo }) => {
      let s = 0;
      if (['enterprise', 'global'].includes(industry)) s += 2;
      if (['emea', 'global', 'asia', 'india'].includes(geo)) s += 2;
      return s;
    },
    why: 'The internationally recognised ISMS standard (170+ countries). The baseline for Europe/APAC/India buyers, governments, and regulated industries.',
    timeline: '6–12 months, 3-yr cycle + annual surveillance',
    cost: '$30K–$100K year 1',
    note: 'Build the ISMS first; risk-based with 93 Annex A controls (2022). Pairs naturally with GDPR / ISO 27701.',
  },
  'PCI-DSS': {
    type: 'Industry requirement (card brands)',
    mandatory: true,
    color: '#ef4444',
    priorityScore: ({ data }) => (data.includes('card') ? 10 : -10),
    why: 'Not optional — if you store, process, or transmit cardholder data, your acquirer and card brands require it. Non-compliance risks fines and loss of processing privileges.',
    timeline: 'L4 3–6 mo · L1 6–12 mo, validated annually',
    cost: '$500–$5K (L4) … $20K–$100K (L1)',
    note: 'Requirement level depends on transaction volume.',
  },
  'HIPAA (Security & Privacy)': {
    type: 'Federal law (mandatory if PHI)',
    mandatory: true,
    color: '#0ea5e9',
    priorityScore: ({ data }) => (data.includes('phi') ? 10 : -10),
    why: 'A legal obligation for every Covered Entity and Business Associate that touches PHI. There is no “HIPAA certified” — you demonstrate compliance via policies, risk analysis, safeguards, and BAAs.',
    timeline: 'Ongoing; 2–4 mo to baseline if controls exist',
    cost: '$10K–$50K initial, $5K–$25K ongoing',
    note: 'Buyers/healthcare customers push you for it even when you are just a BAA-signing vendor.',
  },
  'HITRUST CSF': {
    type: 'Certification (HITRUST Alliance)',
    tier: 2,
    color: '#b45309',
    priorityScore: ({ industry, data }) => (['healthtech'].includes(industry) || data.includes('phi') ? 3 : 0),
    why: 'Certifiable, harmonised framework (HIPAA + NIST + ISO + PCI + state laws in one). The “gold standard” healthcare cert — large payers/hospitals often require r2 over a plain SOC 2. Use e1 to start.',
    timeline: '6–9 months (r2), e1 faster',
    cost: '$40K–$100K+ (all-in)',
    note: 'If health-tech and SOC 2 alone is not unlocking payer/providers, add HITRUST. e1 → i1 → r2 scale-pathing.',
  },
  'NIST CSF 2.0': {
    type: 'Guidance framework (not certifiable)',
    color: '#06b6d4',
    priorityScore: ({ industry }) => (industry === 'enterprise' || industry === 'global' ? 1 : 0),
    why: 'Not a certification — an outcome-focused framework to baseline and mature your cybersecurity posture and map to other standards (great for a readiness NIST gap assessment first).',
    timeline: 'Ongoing (self / independent review)',
    cost: 'Varies',
    note: 'Use as a readiness step before or alongside certification.',
  },
  'GDPR / DPDPA / LGPD / PDPA / PIPL': {
    type: 'Regional privacy law (mandatory where applicable)',
    mandatory: true,
    color: '#8b5cf6',
    priorityScore: ({ geo }) => (['emea', 'global', 'india', 'asia'].includes(geo) ? 2 : 0),
    why: 'Legal obligations wherever you process residents’ personal data. Pick based on your customer geography (GDPR for EU, DPDPA for India, LGPD Brazil, PDPA Singapore, PIPL China).',
    timeline: 'Ongoing compliance',
    cost: 'Varies by scope',
    note: 'These are laws to comply with, not certificates to display; pair with SOC 2 / ISO 27001 for assurance.',
  },
};

export const PRIORITY_META = [
  { level: 1, label: 'Priority 1 — Start here', desc: 'Highest impact: unblocks the most revenue or is legally mandated.' },
  { level: 2, label: 'Priority 2 — Add as you scale', desc: 'Second market or regulatory requirement; builds on control overlap.' },
  { level: 3, label: 'Priority 3 — Consider later', desc: 'Deeper/market-specific assurance once strategic need is clear.' },
];

// Compute a ranked list of recommendations for a given profile.
export function recommendCertifications(profile) {
  const data = profile.data || [];
  const hasPHI = data.includes('phi');
  const hasCard = data.includes('card');

  const scored = Object.entries(CERT_CATALOG).map(([name, c]) => {
    let score = c.priorityScore(profile);
    // Nudge overlap-friendly combos
    if (hasPHI && name === 'SOC 2') score += 1; // SOC 2 proves HIPAA effectiveness
    if (hasCard && name === 'SOC 2') score += 1;
    return { name, c, score };
  });

  const recommended = scored
    .filter(x => x.score > 0)
    .sort((a, b) => b.score - a.score);

  // Assign priority: mandatory first, then by score into tiers.
  const rankOrder = [];
  const mandatory = recommended.filter(x => x.c.mandatory || x.c.mandatoryIf?.(profile));
  const voluntary = recommended.filter(x => !x.c.mandatory);

  // mandatory items are highest priority regardless of score
  const tiers = [...mandatory, ...voluntary].map((x, i) => ({
    ...x,
    priority: i < mandatory.length ? 1 : 2,
  }));

  return { tiers, hasPHI, hasCard };
}