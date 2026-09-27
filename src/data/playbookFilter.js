// Dynamic playbook relevance mapper for the Certification Roadmap quiz.
// Maps the 4-step org picker answers (industry / data / geo / stage) to the
// platform's playbook catalog so playbooks can be filtered + highlighted in real-time.

export const PLAYBOOK_CATALOG = [
  { id: 'pci-dss', name: 'PCI-DSS v4.0', path: '/pci-dss', tags: ['fintech', 'ecommerce', 'card', 'payments', 'enterprise'] },
  { id: 'soc2', name: 'SOC 2 Type II', path: '/soc2', tags: ['saas', 'fintech', 'healthtech', 'enterprise', 'global'] },
  { id: 'iso27001', name: 'ISO/IEC 27001:2022 Lead Implementer', path: '/iso/27001/li', tags: ['saas', 'fintech', 'healthtech', 'enterprise', 'global', 'starter'] },
  { id: 'iso27701', name: 'ISO/IEC 27701 (Privacy Info Management)', path: '/iso-27701', tags: ['global', 'emea', 'pii', 'saas'] },
  { id: 'iso22317', name: 'ISO 22317 Business Impact Analysis', path: '/iso-22317', tags: ['enterprise', 'established'] },
  { id: 'nist', name: 'NIST CSF 2.0', path: '/nist', tags: ['us', 'enterprise', 'saas'] },
  { id: 'hipaa', name: 'HIPAA', path: '/hipaa', tags: ['healthtech', 'phi', 'us'] },
  { id: 'hitrust', name: 'HITRUST CSF', path: '/hitrust', tags: ['healthtech', 'phi', 'us'] },
  { id: 'coppa', name: 'COPPA', path: '/coppa', tags: ['ecommerce', 'consumer'] },
  { id: 'ccpa', name: 'CCPA / CPRA', path: '/ccpa', tags: ['us', 'ecommerce', 'pii'] },
  { id: 'gdpr', name: 'GDPR (EU)', path: '/gdpr', tags: ['emea', 'global', 'pii', 'ecommerce'] },
  { id: 'dpdpa', name: 'DPDP Act 2023 (India)', path: '/dpdpa', tags: ['india', 'pii'] },
  { id: 'rbi', name: 'RBI Cyber Security Framework', path: '/rbi', tags: ['fintech', 'india', 'payments'] },
  { id: 'sebi', name: 'SEBI', path: '/sebi', tags: ['fintech', 'india'] },
  { id: 'cscrf', name: 'CSCRF (India Cyber Security)', path: '/cscrf', tags: ['india', 'fintech'] },
  { id: 'cert-in', name: 'CERT-In', path: '/cert-in', tags: ['india'] },
  { id: 'lgpd', name: 'LGPD (Brazil)', path: '/lgpd', tags: ['pii', 'global'] },
  { id: 'pdpa', name: 'PDPA (Singapore)', path: '/pdpa', tags: ['asia', 'pii'] },
  { id: 'pipl', name: 'PIPL (China)', path: '/pipl', tags: ['asia', 'pii'] },
  { id: 'fedramp', name: 'FedRAMP', path: '/fedramp', tags: ['us', 'saas', 'enterprise', 'gov'] },
  { id: 'aigp', name: 'IAPP AIGP — AI Governance', path: '/aigp', tags: ['ai', 'saas', 'global'] },
];

const GEO_RULES = {
  us: ['us', 'nist', 'fedramp', 'ccpa'],
  emea: ['emea', 'gdpr', 'iso27701'],
  global: ['global', 'gdpr', 'iso27701'],
  india: ['india', 'dpdpa', 'rbi', 'cscrf'],
  asia: ['asia', 'pdpa', 'pipl', 'dpdpa'],
};

const INDUSTRY_RULES = {
  fintech: ['fintech', 'pci-dss', 'soc2', 'rbi', 'iso27001'],
  healthtech: ['healthtech', 'hipaa', 'hitrust', 'soc2', 'iso27001'],
  saas: ['saas', 'soc2', 'iso27001', 'nist', 'iso27701'],
  ecommerce: ['ecommerce', 'pci-dss', 'ccpa', 'gdpr'],
  enterprise: ['enterprise', 'soc2', 'iso27001', 'nist', 'iso22317'],
  global: ['global', 'soc2', 'iso27001', 'gdpr', 'iso27701', 'aigp'],
};

const DATA_RULES = {
  phi: ['phi', 'hipaa', 'hitrust'],
  card: ['card', 'pci-dss'],
  pii: ['pii'],
};

/**
 * Rank the playbook catalog against the current wizard answers.
 * Returns [{ id, name, path, reasons: [..], highlight }] sorted by relevance,
 * with `highlight` true for the 3 most relevant stackable playbooks.
 */
export function relevantPlaybooks(answers = {}) {
  const industry = answers.industry;
  const data = answers.data || [];
  const geo = answers.geo;
  const stage = answers.stage;

  const required = new Set();
  const reasons = {};

  const add = (tag, why) => {
    required.add(tag);
    if (!reasons[tag]) reasons[tag] = new Set();
    reasons[tag].add(why);
  };

  if (industry && INDUSTRY_RULES[industry]) {
    INDUSTRY_RULES[industry].forEach(t => add(t, `Your ${industry} industry`));
  }
  if (geo && GEO_RULES[geo]) {
    GEO_RULES[geo].forEach(t => add(t, `Your ${geo} customer base`));
  }
  data.forEach(d => {
    if (DATA_RULES[d]) DATA_RULES[d].forEach(t => add(t, `Handling ${d} data`));
  });
  if (stage === 'established') add('established', 'Established, regulated & scaling');
  if (answers.ai) add('ai', 'AI governance interest');

  const scored = PLAYBOOK_CATALOG.map(p => {
    const matched = p.tags.filter(t => required.has(t));
    if (!matched.length) return null;
    return { ...p, reasons: [...new Set(matched.map(t => [...(reasons[t] || [])][0]))].filter(Boolean), score: matched.length };
  }).filter(Boolean).sort((a, b) => b.score - a.score);

  return scored.map((p, i) => ({ ...p, highlight: i < 3 }));
}