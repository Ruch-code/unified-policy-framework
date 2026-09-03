export const ITGC_DOMAINS = [
  'Access Management',
  'Change Management',
  'IT Operations',
  'Program / System Development',
  'Data Privacy / Governance',
  'Business Continuity & Incident',
];

// Which ITGC domains each framework requires. Keyed by the framework "name" string
// used in Home.jsx REGIONS so the region clubbing stays in sync with the UI.
export const FRAMEWORK_ITGC = {
  'ISO 27001 LA': new Set(['Access Management', 'Change Management', 'IT Operations', 'Program / System Development', 'Data Privacy / Governance', 'Business Continuity & Incident']),
  'ISO 27001 LI': new Set(['Access Management', 'Change Management', 'IT Operations', 'Program / System Development', 'Data Privacy / Governance', 'Business Continuity & Incident']),
  'ISO 31000': new Set(['Program / System Development', 'Data Privacy / Governance', 'Business Continuity & Incident']),
  'ISO 27701': new Set(['Access Management', 'Data Privacy / Governance', 'Business Continuity & Incident']),
  'PCI-DSS': new Set(['Access Management', 'Change Management', 'IT Operations', 'Program / System Development', 'Data Privacy / Governance', 'Business Continuity & Incident']),
  'SOC 2': new Set(['Access Management', 'Change Management', 'IT Operations', 'Program / System Development', 'Data Privacy / Governance', 'Business Continuity & Incident']),
  'CIS Controls v8': new Set(['Access Management', 'Change Management', 'IT Operations', 'Program / System Development', 'Data Privacy / Governance', 'Business Continuity & Incident']),
  'GDPR': new Set(['Access Management', 'IT Operations', 'Data Privacy / Governance', 'Business Continuity & Incident']),
  'CIPPE/EU': new Set(['Data Privacy / Governance']),
  'DPDPA': new Set(['Access Management', 'IT Operations', 'Data Privacy / Governance', 'Business Continuity & Incident']),
  'SEBI': new Set(['Access Management', 'Change Management', 'IT Operations', 'Program / System Development', 'Data Privacy / Governance', 'Business Continuity & Incident']),
  'RBI': new Set(['Access Management', 'Change Management', 'IT Operations', 'Program / System Development', 'Data Privacy / Governance', 'Business Continuity & Incident']),
  'CSCRF': new Set(['Access Management', 'Change Management', 'IT Operations', 'Program / System Development', 'Data Privacy / Governance', 'Business Continuity & Incident']),
  'CERT-In': new Set(['Access Management', 'IT Operations', 'Business Continuity & Incident']),
  'LGPD': new Set(['Access Management', 'IT Operations', 'Data Privacy / Governance', 'Business Continuity & Incident']),
  'PDPA': new Set(['Access Management', 'IT Operations', 'Data Privacy / Governance', 'Business Continuity & Incident']),
  'PIPL': new Set(['Access Management', 'IT Operations', 'Data Privacy / Governance', 'Business Continuity & Incident']),
};

// Reverse lookup: resolve a framework name to its ITGC domain set, tolerant of missing entries.
export function domainsFor(name) {
  return FRAMEWORK_ITGC[name] || new Set();
}
