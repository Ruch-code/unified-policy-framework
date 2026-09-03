export const ITGC_DOMAINS = [
  'Access Management',
  'Change Management',
  'IT Operations',
  'Program / System Development',
  'Data Privacy / Governance',
  'Business Continuity & Incident',
  'General / Cross-Cutting',
];

// Which ITGC domains each framework requires. Keyed by the framework "name" string
// used in Home.jsx REGIONS so the region clubbing stays in sync with the UI.
export const FRAMEWORK_ITGC = {
  'ISO 27001 LA': new Set(['Access Management', 'Change Management', 'IT Operations', 'Program / System Development', 'Data Privacy / Governance', 'Business Continuity & Incident', 'General / Cross-Cutting']),
  'ISO 27001 LI': new Set(['Access Management', 'Change Management', 'IT Operations', 'Program / System Development', 'Data Privacy / Governance', 'Business Continuity & Incident', 'General / Cross-Cutting']),
  'ISO 31000': new Set(['Program / System Development', 'Data Privacy / Governance', 'Business Continuity & Incident', 'General / Cross-Cutting']),
  'ISO 27701': new Set(['Access Management', 'Data Privacy / Governance', 'Business Continuity & Incident', 'General / Cross-Cutting']),
  'PCI-DSS': new Set(['Access Management', 'Change Management', 'IT Operations', 'Program / System Development', 'Data Privacy / Governance', 'Business Continuity & Incident', 'General / Cross-Cutting']),
  'SOC 2': new Set(['Access Management', 'Change Management', 'IT Operations', 'Program / System Development', 'Data Privacy / Governance', 'Business Continuity & Incident', 'General / Cross-Cutting']),
  'CIS Controls v8': new Set(['Access Management', 'Change Management', 'IT Operations', 'Program / System Development', 'Data Privacy / Governance', 'Business Continuity & Incident', 'General / Cross-Cutting']),
  'HIPAA': new Set(['Access Management', 'Change Management', 'IT Operations', 'Data Privacy / Governance', 'Business Continuity & Incident', 'General / Cross-Cutting']),
  'NIST CSF 2.0': new Set(['Access Management', 'Change Management', 'IT Operations', 'Program / System Development', 'Data Privacy / Governance', 'Business Continuity & Incident', 'General / Cross-Cutting']),
  'CIPPE/US': new Set(['Data Privacy / Governance', 'General / Cross-Cutting']),
  'HITRUST CSF': new Set(['Access Management', 'Change Management', 'IT Operations', 'Program / System Development', 'Data Privacy / Governance', 'Business Continuity & Incident', 'General / Cross-Cutting']),
  'COPPA': new Set(['Data Privacy / Governance', 'General / Cross-Cutting']),
  'CCPA / CPRA': new Set(['Data Privacy / Governance', 'IT Operations', 'Business Continuity & Incident', 'General / Cross-Cutting']),
  'GDPR': new Set(['Access Management', 'IT Operations', 'Data Privacy / Governance', 'Business Continuity & Incident', 'General / Cross-Cutting']),
  'CIPPE/EU': new Set(['Data Privacy / Governance', 'General / Cross-Cutting']),
  'DPDPA': new Set(['Access Management', 'IT Operations', 'Data Privacy / Governance', 'Business Continuity & Incident', 'General / Cross-Cutting']),
  'SEBI': new Set(['Access Management', 'Change Management', 'IT Operations', 'Program / System Development', 'Data Privacy / Governance', 'Business Continuity & Incident', 'General / Cross-Cutting']),
  'RBI': new Set(['Access Management', 'Change Management', 'IT Operations', 'Program / System Development', 'Data Privacy / Governance', 'Business Continuity & Incident', 'General / Cross-Cutting']),
  'CSCRF': new Set(['Access Management', 'Change Management', 'IT Operations', 'Program / System Development', 'Data Privacy / Governance', 'Business Continuity & Incident', 'General / Cross-Cutting']),
  'CERT-In': new Set(['Access Management', 'IT Operations', 'Business Continuity & Incident', 'General / Cross-Cutting']),
  'LGPD': new Set(['Access Management', 'IT Operations', 'Data Privacy / Governance', 'Business Continuity & Incident', 'General / Cross-Cutting']),
  'PDPA': new Set(['Access Management', 'IT Operations', 'Data Privacy / Governance', 'Business Continuity & Incident', 'General / Cross-Cutting']),
  'PIPL': new Set(['Access Management', 'IT Operations', 'Data Privacy / Governance', 'Business Continuity & Incident', 'General / Cross-Cutting']),
};

// Reverse lookup: resolve a framework name to its ITGC domain set, tolerant of missing entries.
export function domainsFor(name) {
  return FRAMEWORK_ITGC[name] || new Set(['General / Cross-Cutting']);
}
