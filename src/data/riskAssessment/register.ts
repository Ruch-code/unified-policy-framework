import type { RiskRow } from './types';

// Sample risk register for a generic SaaS company ("Example Co.").
// Inherent scores reflect a typical starting point; residual scores assume the
// treatment plan is fully implemented and its controls have current evidence.

const base = {
  owner: 'Security Lead',
  approver: 'CTO',
  treatment: 'Mitigate' as const,
  residualLikelihood: 1,
  residualImpact: 1,
  identifiedDate: '2026-01-15',
  lastReviewedDate: '2026-07-15',
  source: 'seed' as const,
};

const approved = { treatmentStatus: 'Treatment OK' as const, approvalStatus: 'Approved' as const, approvalDate: '2026-07-20' };
const recommended = { treatmentStatus: 'Treatment planned' as const, approvalStatus: 'Pending approval' as const, approvalDate: '', recommended: true };

export const SEED_REGISTER: RiskRow[] = [
  { ...base, ...approved, id: 'R-1', scenario: 'Company systems and data are breached by a vendor.', categories: ['Vendor relationships', 'Communications security'], cia: ['C', 'I', 'A'], likelihood: 2, impact: 4,
    controls: ['TPM-1', 'TPM-2', 'RSK-2', 'RSK-3', 'BCD-2', 'IAO-1', 'CPL-2', 'IRO-1', 'POL-1', 'GOV-4', 'HRS-1', 'COM-1', 'COM-2', 'COM-3', 'COM-4', 'MDM-1', 'CRY-3', 'CRY-1'] },
  { ...base, ...approved, id: 'R-2', scenario: 'Company systems or data are breached via a compromised development environment or system.', categories: ['Software development and acquisition', 'Operations security'], cia: ['C', 'I', 'A'], likelihood: 2, impact: 4,
    controls: ['CHG-1', 'CHG-3', 'IAO-2', 'VPM-1', 'VPM-2', 'VPM-4', 'CHG-2', 'VPM-3'] },
  { ...base, ...approved, id: 'R-3', owner: 'CTO', approver: 'Approver', scenario: 'Developments are not aligned with business and user expectations, causing financial and productivity losses.', categories: ['Software development and acquisition'], cia: ['I', 'A'], likelihood: 3, impact: 4,
    controls: ['CHG-1', 'CHG-3', 'IAO-2', 'VPM-1', 'VPM-2', 'CHG-2', 'VPM-3'] },
  { ...base, ...approved, id: 'R-4', owner: 'Risk Owner', scenario: 'Information security responsibilities are not defined or allocated.', categories: ['Information security operations', 'People operations'], cia: ['C', 'I', 'A'], likelihood: 2, impact: 2,
    controls: ['GOV-2', 'GOV-3', 'GOV-4', 'GOV-5', 'HRS-4', 'HRS-5', 'HRS-1', 'HRS-2'] },
  { ...base, ...approved, id: 'R-5', owner: 'Risk Owner', scenario: 'Information security policies are not defined, reviewed, approved, published or communicated, so personnel do not understand requirements.', categories: ['Information security operations', 'Compliance'], cia: ['C', 'I', 'A'], likelihood: 2, impact: 2,
    controls: ['HRS-2', 'HRS-3', 'HRS-4', 'HRS-5', 'GOV-4', 'HRS-1', 'DAT-1', 'CHG-1', 'CHG-3', 'BCD-1', 'POL-1', 'IRO-1', 'RSK-1', 'RSK-3', 'TPM-2'] },
  { ...base, ...approved, id: 'R-6', scenario: 'Insecure remote work sites lead to compromise of company systems and data.', categories: ['Communications security', 'Access control'], cia: ['C', 'I'], likelihood: 2, impact: 3,
    controls: ['IAC-12', 'VPM-1', 'VPM-2', 'MON-1'] },
  { ...base, ...approved, id: 'R-7', owner: 'Risk Owner', scenario: 'Personnel mishandle data due to misunderstanding company requirements.', categories: ['People operations', 'Privacy'], cia: ['C', 'I'], likelihood: 2, impact: 3,
    controls: ['IAO-1', 'MON-2', 'VPM-2', 'CPL-2', 'GOV-4', 'POL-1', 'HRS-1', 'BCD-2', 'RSK-2', 'RSK-3', 'TPM-1', 'TPM-2', 'CHG-1', 'CHG-3', 'IAO-2', 'VPM-1', 'VPM-3', 'CHG-2'] },
  { ...base, ...approved, id: 'R-8', scenario: 'Risks from mobile device use are not identified or treated.', categories: ['Asset management', 'Cryptography'], cia: ['C'], likelihood: 2, impact: 3,
    controls: ['CRY-3', 'MDM-1', 'CRY-1'] },
  { ...base, ...approved, id: 'R-9', scenario: 'Company records are altered due to weak access control, segregation of duties or supervision.', categories: ['Access control', 'Fraud'], cia: ['I'], likelihood: 2, impact: 4,
    controls: ['RSK-2', 'RSK-3'],
    note: 'Only risk management controls are linked today. Also link access reviews (IAC-6), segregation of duties (IAC-5) and audit logging of record changes (MON-3), otherwise the residual score is not supported by evidence.' },
  { ...base, ...approved, id: 'R-10', scenario: 'Developers introduce vulnerabilities that lead to compromise of systems or data.', categories: ['Software development and acquisition'], cia: ['C', 'I', 'A'], likelihood: 3, impact: 4,
    controls: ['CHG-3', 'IAO-2', 'VPM-1', 'VPM-2', 'CHG-2', 'VPM-3'] },
  { ...base, ...approved, id: 'R-11', owner: 'Risk Owner', scenario: 'A privacy complaint or non-compliance leads to a lawsuit or regulatory fine.', categories: ['Privacy', 'Compliance'], cia: ['C'], likelihood: 2, impact: 4,
    controls: ['GOV-1', 'IAO-1', 'IRO-3', 'RSK-3'] },

  // ---- Recommended additions (coverage gaps) ----
  { ...base, ...recommended, id: 'R-12', owner: 'Risk Owner', scenario: 'Personnel fraudulently alter security records under pressure to pass external audits.', categories: ['Fraud'], cia: ['I'], likelihood: 2, impact: 4,
    controls: ['IAC-5', 'IAC-6', 'MON-3', 'CPL-2', 'RSK-2', 'IAO-1'] },
  { ...base, ...recommended, id: 'R-13', owner: 'Risk Owner', scenario: 'Personnel fraudulently create or pay vendors due to lack of dual approval in accounts payable.', categories: ['Fraud'], cia: ['I'], likelihood: 2, impact: 4,
    controls: ['FIN-1', 'IAC-5', 'IAC-6', 'CPL-2', 'RSK-2'] },
  { ...base, ...recommended, id: 'R-14', scenario: 'Customer data used in AI model training or prompts is exposed or used beyond consented purpose.', categories: ['Artificial intelligence', 'Privacy'], cia: ['C'], likelihood: 3, impact: 4,
    controls: ['AIG-1', 'AIG-2', 'AIG-3', 'AIG-4', 'TPM-2', 'DAT-1'] },
  { ...base, ...recommended, id: 'R-15', owner: 'CTO', scenario: 'AI model outputs are inaccurate, biased or manipulated (prompt injection, data poisoning), harming customers.', categories: ['Artificial intelligence'], cia: ['I'], likelihood: 3, impact: 4,
    controls: ['AIG-2', 'AIG-3', 'AIG-5', 'AIG-6', 'MON-2'] },
  { ...base, ...recommended, id: 'R-16', scenario: 'Business continuity and disaster recovery plans fail during an outage.', categories: ['Business continuity and disaster recovery'], cia: ['A'], likelihood: 2, impact: 5,
    controls: ['BCD-2', 'BCD-1', 'RSK-2'] },
];

export const COVERAGE_GAPS = [
  'A register for an AI SaaS company should include at least one explicit fraud scenario. SOC 2 CC3.3 requires the assessment to consider the potential for fraud, and a register with none is a common audit exception.',
  'It should also include AI-specific scenarios covering customer data in training or prompts, and inaccurate, biased or manipulated outputs.',
  'Sample risks R-12 to R-16 are marked "Recommended addition" and appear in the traceability section and the register template. Several equivalents are already required baseline risks in your register.',
];
