// Certification Advisor decision engine.
// Given a company profile, ranks the full set of relevant certifications/frameworks
// in the order they should be pursued ("upskill roadmap"). Considers every
// combination of industry, data, geography and stage — a framework is never
// silently dropped; it is always present with an appropriate priority.

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

// Each framework: metadata for display + an evaluate function returning a score 0-10
// (the higher, the more it should be prioritised for "upskilling").
export const CERT_CATALOG = {
  'SOC 2': {
    type: 'Attestation (report), not a certification',
    color: '#6366f1',
    timeline: 'Type I 3–6 mo · Type II 9–15 mo',
    cost: '$50K–$150K year 1 (all-in)',
    costINR: '₹40L–₹1.2Cr year 1 (all-in)',
    why: 'The de facto US B2B procurement standard. Most US enterprise buyers require a SOC 2 Type II report.',
    note: 'Only the Security criterion is mandatory. Add Availability / Confidentiality / Privacy based on your service.',
    evaluate: ({ industry, geo, stage }) => {
      let s = 6;
      if (['saas', 'fintech', 'ecommerce', 'enterprise'].includes(industry)) s += 2;
      if (['us', 'global'].includes(geo)) s += 1;
      if (stage === 'growth' || stage === 'established') s += 1;
      return Math.min(s, 10);
    },
  },
  'ISO 27001': {
    type: 'Certification (accredited body)',
    color: '#10b981',
    timeline: '6–12 months, 3-yr cycle + annual surveillance',
    cost: '$30K–$100K year 1',
    costINR: '₹25L–₹80L year 1',
    why: 'The internationally recognised ISMS standard (170+ countries). The baseline for Europe/APAC/India buyers, governments, and regulated industries.',
    note: 'Build the ISMS first; risk-based with 93 Annex A controls (2022). Pairs naturally with GDPR / ISO 27701.',
    evaluate: ({ industry, geo, stage }) => {
      let s = 6;
      if (['enterprise', 'global'].includes(industry)) s += 1;
      if (['emea', 'global', 'asia', 'india'].includes(geo)) s += 2;
      if (stage === 'established') s += 1;
      return Math.min(s, 10);
    },
  },
  'CIS Controls': {
    type: 'Technical security baseline',
    color: '#0d9488',
    timeline: '1–3 months to baseline',
    cost: '$5K–$25K',
    costINR: '₹4L–₹20L',
    why: 'The pragmatic, vendor-neutral security controls checklist. The fastest high-impact baseline for any technical team — a strong foundation before formal certification.',
    note: 'Pairs with NIST and maps directly into SOC 2 / ISO controls. Best first step for early-stage teams.',
    evaluate: ({ stage, industry }) => {
      let s = 5;
      if (['saas', 'fintech', 'ecommerce'].includes(industry)) s += 1;
      if (stage === 'early' || stage === 'growth') s += 2; // cheapest, earliest win
      return Math.min(s, 10);
    },
  },
  'NIST CSF 2.0': {
    type: 'Guidance framework (not certifiable)',
    color: '#06b6d4',
    timeline: 'Ongoing (self / independent review)',
    cost: 'Varies',
    costINR: 'Varies',
    why: 'An outcome-focused framework to baseline and mature your cybersecurity posture and map to other standards. Great readiness step before certification.',
    note: 'Use as a readiness step before or alongside certification. Often requested alongside NIST 800-171 for US federal.',
    evaluate: ({ industry }) => {
      let s = 4;
      if (['enterprise', 'global'].includes(industry)) s += 2;
      if (['fintech', 'healthtech'].includes(industry)) s += 1;
      return Math.min(s, 10);
    },
  },
  'PCI-DSS': {
    type: 'Industry requirement (card brands)',
    color: '#ef4444',
    timeline: 'L4 3–6 mo · L1 6–12 mo, validated annually',
    cost: '$500–$5K (L4) … $20K–$100K (L1)',
    costINR: '₹40K–₹4L (L4) … ₹16L–₹80L (L1)',
    why: 'Not optional — if you store, process, or transmit cardholder data, your acquirer and card brands require it. Non-compliance risks fines and loss of processing privileges.',
    note: 'Requirement level depends on transaction volume.',
    evaluate: ({ data }) => (data.includes('card') ? 10 : 1),
  },
  'HIPAA (Security & Privacy)': {
    type: 'Federal law (mandatory if PHI)',
    color: '#0ea5e9',
    timeline: 'Ongoing; 2–4 mo to baseline if controls exist',
    cost: '$10K–$50K initial, $5K–$25K ongoing',
    costINR: '₹8L–₹40L initial, ₹4L–₹20L ongoing',
    why: 'A legal obligation for every Covered Entity and Business Associate that touches PHI. There is no “HIPAA certified” — you demonstrate compliance via policies, risk analysis, safeguards, and BAAs.',
    note: 'Buyers/healthcare customers push you for it even when you are just a BAA-signing vendor.',
    evaluate: ({ data, industry }) => (data.includes('phi') || industry === 'healthtech' ? 9 : 1),
  },
  'HITRUST CSF': {
    type: 'Certification (HITRUST Alliance)',
    color: '#b45309',
    timeline: '6–9 months (r2), e1 faster',
    cost: '$40K–$100K+ (all-in)',
    costINR: '₹30L–₹80L+ (all-in)',
    why: 'Certifiable, harmonised framework (HIPAA + NIST + ISO + PCI + state laws in one). The “gold standard” healthcare cert — large payers/hospitals often require r2 over a plain SOC 2. Use e1 to start.',
    note: 'If health-tech and SOC 2 alone is not unlocking payer/providers, add HITRUST. e1 → i1 → r2 scale-pathing.',
    evaluate: ({ data, industry }) => (data.includes('phi') || industry === 'healthtech' ? 8 : 0),
  },
  'GDPR / DPDPA / LGPD / PDPA / PIPL': {
    type: 'Regional privacy law (mandatory where applicable)',
    color: '#8b5cf6',
    timeline: 'Ongoing compliance',
    cost: 'Varies by scope',
    costINR: 'Varies by scope',
    why: 'Legal obligations wherever you process residents’ personal data. Pick based on your customer geography (GDPR for EU, DPDPA for India, LGPD Brazil, PDPA Singapore, PIPL China).',
    note: 'These are laws to comply with, not certificates to display; pair with SOC 2 / ISO 27001 for assurance.',
    evaluate: ({ data, geo }) => {
      if (['emea', 'global', 'india', 'asia'].includes(geo)) return 7;
      if (data.includes('pii')) return 5;
      return 2;
    },
  },
};

export const PRIORITY_META = [
  { level: 1, label: 'Priority 1 — Start here', desc: 'Highest impact: unblocks the most revenue or is legally mandated.' },
  { level: 2, label: 'Priority 2 — Add as you scale', desc: 'Second market or regulatory requirement; builds on control overlap.' },
  { level: 3, label: 'Priority 3 — Foundational hygiene', desc: 'Strengthens the baseline even when not externally demanded.' },
];

// Rank the full set of frameworks for a given profile.
export function recommendCertifications(profile) {
  const data = profile.data || [];
  const hasPHI = data.includes('phi');
  const hasCard = data.includes('card');

  // Signal detection: (keywords, confidence% + hint)
  const SIG = [
    { kw: ['hipaa', 'health', 'clinic', 'medical', 'hospital', 'care', 'pharma', 'bio'], cap: 'HIPAA', delta: (h) => (h.hasPHI ? 0 : +2), note: 'Health data is present — HIPAA/PHI controls matter.' },
    { kw: ['pay', 'payment', 'card', 'checkout', 'purchase', 'store', 'shop', 'commerce', 'marketplace', 'sell'], cap: 'PCI-DSS', delta: () => +2, note: 'Card/purchase activity detected — PCI-DSS is relevant.' },
    { kw: ['bank', 'fintech', 'lend', 'invest', 'loan', 'finance', 'money', 'payments'], cap: 'ISO 27001', delta: () => +1, note: 'Financial services — strong security baseline expected.' },
    { kw: ['adult', 'dating', 'gambling', 'social', 'children', 'kids', 'school', 'education', 'student', 'kids'], cap: 'GDPR', delta: () => +2, note: 'Sensitive audience — prioritize privacy (GDPR/regional).' },
    { kw: ['gov', 'government', 'public', 'municipal', 'defense', 'military'], cap: 'NIST CSF', delta: () => +2, note: 'Public-sector/regulated — NIST CSF is the trusted baseline.' },
    { kw: ['cloud', 'saas', 'software', 'platform', 'api', 'dev', 'data', 'b2b', 'enterprise'], cap: 'CIS Controls + SOC 2', delta: () => +1, note: 'Tech/cloud operation — CIS + SOC 2 give a strong foundation.' },
  ];

  let businessInsight = null;
  const website = (profile.website || '').trim();
  if (website) {
    const url = website.toLowerCase();
    const hits = SIG.filter(s => s.kw.some(k => url.includes(k)));
    if (hits.length) {
      businessInsight = {
        source: 'website',
        missUrl: url.replace(/^https?:\/\/(www\.)?/i, ''),
        found: hits.map(h => ({ cap: h.cap, note: h.note })),
        boosts: hits.reduce((acc, h) => {
          const capKey = h.cap;
          acc[capKey] = (acc[capKey] || 0) + h.delta({ hasPHI, hasCard });
          return acc;
        }, {}),
      };
    }
  }

  const scored = Object.entries(CERT_CATALOG).map(([name, c]) => {
    let score = c.evaluate(profile);
    if (businessInsight) {
      // Apply any website-signal boosts whose cap keyword matches this framework name.
      Object.entries(businessInsight.boosts).forEach(([cap, boost]) => {
        const capWord = cap.toLowerCase().split(' ')[0]; // e.g. "HIPAA", "PCI-DSS", "regional", "nist", "cis"
        if (name.toLowerCase().includes(capWord)) score += boost;
      });
      // A site that mentions payments also nudges the foundational SOC 2 / ISO pair.
      if (businessInsight.boosts['PCI-DSS'] && (name === 'SOC 2')) score += 1;
    }
    if (hasPHI && name === 'SOC 2') score += 1; // SOC 2 proves HIPAA effectiveness
    if (hasCard && name === 'SOC 2') score += 1;
    return { name, c, score };
  });

  // Always return the complete set, sorted by score desc.
  const sorted = scored.sort((a, b) => b.score - a.score);

  // Tier assignment: score thresholds.
  const tiers = sorted.map((x, i) => {
    let priority = 3;
    if (x.score >= 7) priority = 1;
    else if (x.score >= 4) priority = 2;
    return { ...x, priority };
  });

  return { tiers, hasPHI, hasCard, businessInsight };
}
