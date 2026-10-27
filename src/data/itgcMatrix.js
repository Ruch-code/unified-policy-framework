export const ITGC_DOMAINS = [
  'Access Management',
  'Change Management',
  'IT Operations',
  'Program / System Development',
  'Data Privacy / Governance',
  'Business Continuity & Incident',
  'Risk Management',
];

// Which ITGC domains each framework requires. Keyed by the framework "name" string
// used in Home.jsx REGIONS so the region clubbing stays in sync with the UI.
export const FRAMEWORK_ITGC = {
  'ISO 27001 LA': new Set(['Access Management', 'Change Management', 'IT Operations', 'Program / System Development', 'Data Privacy / Governance', 'Business Continuity & Incident', 'Risk Management']),
  'ISO 27001 LI': new Set(['Access Management', 'Change Management', 'IT Operations', 'Program / System Development', 'Data Privacy / Governance', 'Business Continuity & Incident', 'Risk Management']),
  'ISO 31000': new Set(['Program / System Development', 'Data Privacy / Governance', 'Business Continuity & Incident', 'Risk Management']),
  'ISO 27701': new Set(['Access Management', 'Data Privacy / Governance', 'Business Continuity & Incident', 'Risk Management']),
  'PCI-DSS': new Set(['Access Management', 'Change Management', 'IT Operations', 'Program / System Development', 'Data Privacy / Governance', 'Business Continuity & Incident', 'Risk Management']),
  'SOC 2': new Set(['Access Management', 'Change Management', 'IT Operations', 'Program / System Development', 'Data Privacy / Governance', 'Business Continuity & Incident', 'Risk Management']),
  'CIS Controls v8': new Set(['Access Management', 'Change Management', 'IT Operations', 'Program / System Development', 'Data Privacy / Governance', 'Business Continuity & Incident']),
  'GDPR': new Set(['Access Management', 'IT Operations', 'Data Privacy / Governance', 'Business Continuity & Incident', 'Risk Management']),
  'CIPPE/EU': new Set(['Data Privacy / Governance']),
  'DPDPA': new Set(['Access Management', 'IT Operations', 'Data Privacy / Governance', 'Business Continuity & Incident', 'Risk Management']),
  'SEBI': new Set(['Access Management', 'Change Management', 'IT Operations', 'Program / System Development', 'Data Privacy / Governance', 'Business Continuity & Incident', 'Risk Management']),
  'RBI': new Set(['Access Management', 'Change Management', 'IT Operations', 'Program / System Development', 'Data Privacy / Governance', 'Business Continuity & Incident', 'Risk Management']),
  'CSCRF': new Set(['Access Management', 'Change Management', 'IT Operations', 'Program / System Development', 'Data Privacy / Governance', 'Business Continuity & Incident', 'Risk Management']),
  'CERT-In': new Set(['Access Management', 'IT Operations', 'Business Continuity & Incident']),
  'LGPD': new Set(['Access Management', 'IT Operations', 'Data Privacy / Governance', 'Business Continuity & Incident', 'Risk Management']),
  'PDPA': new Set(['Access Management', 'IT Operations', 'Data Privacy / Governance', 'Business Continuity & Incident', 'Risk Management']),
  'PIPL': new Set(['Access Management', 'IT Operations', 'Data Privacy / Governance', 'Business Continuity & Incident', 'Risk Management']),
};

// Reverse lookup: resolve a framework name to its ITGC domain set, tolerant of missing entries.
export function domainsFor(name) {
  return FRAMEWORK_ITGC[name] || new Set();
}
