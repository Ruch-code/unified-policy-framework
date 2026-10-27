import type { ScaleLevel, ScoreBand, TreatmentOption, WorkflowState } from './types';

export const METHOD_ALIGNMENT = [
  'ISO/IEC 27001:2022 clauses 6.1.2, 6.1.3, 8.2 and 8.3',
  'ISO 31000:2018 clause 6.4 to 6.6',
  'NIST SP 800-30 Rev. 1',
  'SOC 2 (TSC 2017, revised points of focus 2022) CC3.1 to CC3.4',
];

export interface MethodStep {
  step: number;
  title: string;
  detail: string;
  output: string;
}

export const METHOD_STEPS: MethodStep[] = [
  { step: 1, title: 'Define objectives and risk criteria', detail: 'Write down the business, security and compliance objectives the assessment protects, and agree the likelihood scale, impact scale, scoring bands and risk appetite before anyone scores a risk.', output: 'Approved Risk Management Policy with criteria and appetite' },
  { step: 2, title: 'Identify assets and threats', detail: 'Start from the asset inventory and system boundary. For each in-scope system, data store, vendor and team, list the threats and vulnerabilities that apply, including insider and fraud threats.', output: 'Asset list linked to threat sources' },
  { step: 3, title: 'Identify risk scenarios', detail: 'Write each risk as a scenario: a threat exploits a weakness and causes a specific harm. Use the scenario library below so coverage is consistent from year to year.', output: 'Draft risk register with scenarios, categories and CIA impact' },
  { step: 4, title: 'Analyse likelihood and impact', detail: 'Score inherent likelihood and impact on the 1 to 5 scales, based on the current state. Record the reasoning, not just the number, so the score can be challenged later.', output: 'Inherent score (L x I) per risk' },
  { step: 5, title: 'Evaluate against risk appetite', detail: 'Compare each score with the bands and the appetite statement. Anything above appetite needs a treatment decision; anything within appetite can be accepted and monitored.', output: 'Prioritised list of risks needing treatment' },
  { step: 6, title: 'Select treatment', detail: 'Choose Mitigate, Transfer, Avoid or Accept. For Mitigate, link the specific controls that reduce likelihood or impact and estimate the residual score once they are fully in place.', output: 'Treatment plan with linked controls and target residual score' },
  { step: 7, title: 'Assign owner', detail: 'Every risk gets a named Risk Owner (a role accountable for the outcome) and a due date for treatment actions.', output: 'Owner and due date on every row' },
  { step: 8, title: 'Approve', detail: 'The Approver reviews the treatment plan and residual score. Residual risk above appetite needs a documented risk acceptance signed by the Approver.', output: 'Approval record with date, and signed acceptances' },
  { step: 9, title: 'Monitor and review', detail: 'Track treatment progress, confirm linked controls have current evidence, and re-score risks on the review cycle or when something material changes.', output: 'Updated register, review date and change log' },
];

export const CADENCE = {
  periodic: 'Full risk assessment at least annually.',
  triggers: [
    'New product, service or major feature',
    'New vendor or subservice organisation that handles in-scope data',
    'Architecture or infrastructure change (new cloud account, region, data store)',
    'New or changed law, regulation or contractual commitment',
    'A security incident, near miss or audit finding',
    'Merger, acquisition, reorganisation or change in key personnel',
  ],
  sla: 'Update the register within 30 days of a material change, and record what changed and who approved it.',
};

export const CALLOUTS = [
  {
    ref: 'SOC 2 CC3.3',
    title: 'Fraud must be considered',
    text: 'CC3.3 requires the risk assessment to consider the potential for fraud, including incentives and pressures, opportunities and attitudes, and the risk of management override. Auditors look for at least one explicit fraud scenario in the register, not just a sentence in the policy.',
  },
  {
    ref: 'SOC 2 CC3.4',
    title: 'Changes must be assessed',
    text: 'CC3.4 requires you to identify and assess changes in the external environment (regulatory, economic, physical), in the business model, and in technology and leadership that could affect your service commitments and system requirements. Keep evidence that changes triggered a review.',
  },
];

export const LIKELIHOOD: ScaleLevel[] = [
  { value: 1, label: 'Very unlikely', definition: 'Not expected to happen in the next 3 years; no known history in the company or peer group.' },
  { value: 2, label: 'Unlikely', definition: 'Could happen in the next 2 to 3 years; strong controls are in place.' },
  { value: 3, label: 'Possible', definition: 'Could happen within the next year; has happened at peers or in the past.' },
  { value: 4, label: 'Likely', definition: 'Expected to happen within the next year; weaknesses are known and exploitable.' },
  { value: 5, label: 'Very likely', definition: 'Expected to happen within months, or is already happening.' },
];

export const IMPACT: ScaleLevel[] = [
  { value: 1, label: 'Very low', definition: 'Negligible cost, no customer impact, no data exposed, no regulatory interest.' },
  { value: 2, label: 'Low', definition: 'Minor cost or a short internal disruption; limited internal data affected; no notification needed.' },
  { value: 3, label: 'Moderate', definition: 'Noticeable cost or service degradation; some customers affected; possible regulatory inquiry or contractual notice.' },
  { value: 4, label: 'High', definition: 'Significant financial loss or outage; confidential or personal data exposed; likely regulatory notification or penalty; press coverage.' },
  { value: 5, label: 'Very high', definition: 'Severe or existential loss; large-scale data breach; major fines or litigation; loss of key customers or certifications.' },
];

export const IMPACT_DIMENSIONS = ['Financial', 'Operational', 'Legal and regulatory', 'Reputational', 'Data'];

export const BANDS: ScoreBand[] = [
  { label: 'Low', min: 1, max: 4, color: '#22c55e', text: '#052e16', action: 'Accept and monitor within the normal review cycle.' },
  { label: 'Medium', min: 5, max: 9, color: '#facc15', text: '#422006', action: 'Treat within 6 months or accept within appetite with owner sign-off.' },
  { label: 'High', min: 10, max: 16, color: '#f97316', text: '#431407', action: 'Treatment plan within 30 days; residual above appetite needs Approver acceptance.' },
  { label: 'Critical', min: 17, max: 25, color: '#ef4444', text: '#ffffff', action: 'Immediate action; escalate to leadership; report at the next governance meeting.' },
];

export function bandFor(score: number): ScoreBand {
  return BANDS.find((b) => score >= b.min && score <= b.max) || BANDS[0];
}

export const INHERENT_VS_RESIDUAL = {
  inherent: 'Inherent score is the risk as it stands today, with the controls that are actually operating now.',
  residual: 'Residual score is the risk that remains once the treatment plan is fully implemented and its controls are operating with evidence.',
  difference: 'The gap between the two shows how much the treatment plan is worth. If a treatment is marked complete but the linked controls have no current evidence, the inherent score still applies.',
};

export const APPETITE = {
  statement: 'Example Co. accepts residual risks scored Medium (9) or lower. It has no appetite for risks that could cause a breach of customer personal data, a material misstatement of financial or security records, or a regulatory penalty.',
  rule: 'Any residual score above appetite (10 or more) requires a documented risk acceptance, signed and dated by the Approver, with a review date no later than 12 months away.',
};

export interface TreatmentInfo {
  option: TreatmentOption;
  when: string;
  example: string;
}

export const TREATMENTS: TreatmentInfo[] = [
  { option: 'Mitigate', when: 'The risk is above appetite and controls can reduce likelihood or impact at a reasonable cost.', example: 'Enforce MFA and access reviews to reduce the likelihood of account takeover.' },
  { option: 'Transfer', when: 'Part of the financial impact can be moved to another party, usually by insurance or contract. Accountability for the data stays with you.', example: 'Cyber insurance, or vendor contract terms with liability caps, indemnities and breach notification duties.' },
  { option: 'Avoid', when: 'The activity creates more risk than value, or no affordable control brings it within appetite.', example: 'Stop storing payment card data and use a tokenising payment provider instead.' },
  { option: 'Accept', when: 'The score is within appetite, or the cost of treatment outweighs the benefit. Above appetite, acceptance needs Approver sign-off.', example: 'Accept a Low risk from an office without badge access because no production data is reachable from it.' },
];

export const WORKFLOW: { state: WorkflowState; meaning: string }[] = [
  { state: 'Identified', meaning: 'Scenario recorded with categories and CIA impact; not yet scored.' },
  { state: 'Assessed', meaning: 'Inherent likelihood and impact scored with reasoning.' },
  { state: 'Treatment planned', meaning: 'Treatment option chosen, controls linked, owner and due date set.' },
  { state: 'Treatment incomplete', meaning: 'One or more linked controls not yet operating or missing current evidence.' },
  { state: 'Treatment OK', meaning: 'All linked controls operating with current evidence; residual score confirmed.' },
  { state: 'Pending approval', meaning: 'Waiting for the Approver to accept the treatment and residual score.' },
  { state: 'Approved', meaning: 'Approver signed off; approval date recorded.' },
  { state: 'Review due', meaning: 'Review date passed or a trigger event occurred; re-score needed.' },
];

export const REQUIRED_FIELDS = [
  'Risk Owner (role)',
  'Approver (role)',
  'Identified date',
  'Last reviewed date',
  'Approval date',
  'CIA impact (Confidentiality, Integrity, Availability)',
  'One or more categories',
];

export const WHAT_CAN_GO_WRONG = [
  'Audit exceptions on SOC 2 CC3.1 to CC3.4: no annual assessment, no evidence of review on significant change, or scores without reasoning.',
  'Missing fraud consideration: the register has no fraud scenario, so CC3.3 is not met even if the policy mentions fraud.',
  'Stale register: risks last reviewed more than 12 months ago, or not updated after a new vendor, product or incident.',
  'Risks without owners or approvals: nobody is accountable and residual risk above appetite was never formally accepted.',
  'Treatment marked complete while linked controls still need evidence: the residual score is overstated and the auditor will test the controls anyway.',
];
