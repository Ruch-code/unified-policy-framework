// Explicit pairing of audit observations to their rebuttal (by the rebuttal's own `finding` title).
// Previously cards were paired by array position, which mismatched headings and answers.
// Observations without a matching rebuttal show no pushback; rebuttals without an observation render as their own card.
const BG = 'Background verification delayed';
const AR = 'Access review frequency mismatch';
const HR = 'HR policy mandates background check but not performed';
const COMMON = {
  'Background verification completed weeks/months after hire': BG,
  'Access review policy states quarterly but performed annually/semi-annually; no s': AR,
  'HR policy mandates background verification via Checkr/e': HR,
};
export const REBUTTAL_PAIRS = {
  soc2: {
    'Access reviews not evidenced or incomplete': 'Access reviews not evidenced',
    'Stale system description (§3)': 'Stale system description (§3)',
    'System description omits key subservice organisations': 'System description omits key subservice organisations',
    'System description lacks CUEC completeness': 'System description lacks CUEC completeness',
    'System boundaries vague or overstated': 'System boundaries vague or overstated',
    'Criteria mapping missing or generic': 'Criteria mapping missing or generic',
    'Significant changes not disclosed': 'Significant changes not disclosed',
    'Subservice organisation monitoring absent': 'Subservice not monitored',
  },
  iso27001: {
    'SoA not accurate': 'Control claimed but not in SoA',
    'Risk assessment not asset/process complete': 'Risk assessment scope',
    'Management review not evidenced': 'Management review',
    'Internal audit not independent': 'Internal audit independence',
  },
  pci: {
    'Logs not retained 12 months / 90 days retrievable': 'Log retention gap',
    'MFA gaps': 'MFA for service accounts',
    'Failed quarterly ASV scans / no retest': 'Failed ASV scan',
    'Network diagrams / segmentation not validated': 'Segmentation assertion',
  },
  hipaa: {
    'Risk analysis not current': 'Risk analysis methodology',
    'Encryption "addressable" unaddressed': 'Addressable control not implemented',
    'Breach notification timeliness': 'Breach notification',
  },
  nist: {
    'Implementation tier unjustified': 'Tier challenged',
    'No supply chain risk (ID.SC)': 'Supply chain shortfall',
    'Recovery plans not tested': 'No testing of recovery',
  },
  gdpr: {
    'Consent not demonstrable': 'Consent challenged',
    'No DPIA for high-risk': 'No DPIA',
    'Transfers without safeguards': 'Transfer gap',
  },
  cis: {
    'Known-exploited vulnerabilities unpatched': 'Patch latency on KEV',
  },
  iso42001: {
    'No AI-specific risk assessment': 'AI risk assessment not performed',
    'Bias assessment missing for high-impact AI': 'Bias assessment missing',
  },
  hitrust: { 'Maturity level inflated': 'Maturity score disputed' },
  dpdpa: { 'No notice / consent records': 'Consent deployment timing' },
  fedramp: {
    'Incomplete SSP scoping': 'SSP scoping incomplete',
    'Missing inherited vs. assigned control map': 'Inherited control gap attributed to customer',
    'No SBOM or asset inventory': 'SBOM/asset inventory missing',
    'Continuous monitoring not operational': 'ConMon not evidenced',
  },
  cjis: {
    'Non-citizen or uncleared personnel accessing CJI': 'Uncleared user access',
    'Audit log gaps': 'Audit log gap',
    'Encryption not enforced for CJI in transit': 'Encryption exception',
  },
};

// Returns [{ observation, rebuttal }] plus standalone rebuttals with no observation.
export function pairRebuttals(fwKey, fw) {
  const rebs = fw.rebuttals || [];
  const byTitle = new Map(rebs.map((r) => [r.finding, r]));
  const map = REBUTTAL_PAIRS[fwKey] || {};
  const used = new Set();
  const pairs = (fw.observations || []).map((o) => {
    let title = map[o.finding];
    if (!title) title = Object.entries(COMMON).find(([k]) => o.finding.startsWith(k))?.[1];
    if (!title && fwKey === 'iso42001') title = o.finding; // titles already identical
    const r = title ? byTitle.get(title) : undefined;
    if (r) used.add(r);
    return { observation: o, rebuttal: r };
  });
  const standalone = rebs.filter((r) => !used.has(r));
  return { pairs, standalone };
}
