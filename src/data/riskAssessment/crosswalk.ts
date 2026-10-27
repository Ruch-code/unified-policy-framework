import type { FrameworkCrossCheck } from './types';
import { CONTROL_BY_ID } from './controls';

// Framework cross-check: how each framework's risk assessment requirement is
// met by the controls in the Risk Assessment & Treatment module.

function fromControls(ids: string[]) {
  const tests = new Set<string>();
  const evidence = new Set<string>();
  ids.forEach((id) => {
    const c = CONTROL_BY_ID[id];
    if (!c) return;
    c.tests.forEach((t) => tests.add(t));
    c.evidence.forEach((e) => evidence.add(e));
  });
  return { controls: ids, tests: [...tests], evidence: [...evidence] };
}

const row = (ref: string, requirement: string, whatToDo: string, ids: string[]) => ({ ref, requirement, whatToDo, ...fromControls(ids) });

export const CROSSWALK: FrameworkCrossCheck[] = [
  {
    id: 'soc2', name: 'SOC 2',
    summary: 'Risk assessment sits in CC3 (Risk Assessment) and CC9 (Risk Mitigation). Auditors test that the assessment ran in the period, covered fraud and change, and fed treatment decisions.',
    rows: [
      row('CC3.1', 'Specifies objectives with enough clarity to identify and assess risks relating to them.', 'Document objectives and risk criteria in an approved Risk Management Policy.', ['RSK-1', 'RSK-3']),
      row('CC3.2', 'Identifies risks to the achievement of objectives across the entity and analyses them to decide how to manage them.', 'Run the assessment at least annually, score every risk, assign owners and treatments.', ['RSK-2', 'RSK-3', 'TPM-2']),
      row('CC3.3', 'Considers the potential for fraud when assessing risks.', 'Include explicit fraud scenarios (for example R-12 and R-13) with linked controls such as segregation of duties and dual approval.', ['RSK-2', 'RSK-3', 'IAC-5', 'FIN-1', 'CPL-2']),
      row('CC3.4', 'Identifies and assesses changes that could significantly affect the system of internal control.', 'Define change triggers, and keep evidence that new vendors, products, regulations and incidents prompted a register review.', ['RSK-2', 'RSK-3']),
      row('CC9.1', 'Identifies, selects and develops risk mitigation activities for risks from potential business disruptions.', 'Link continuity risks to tested BC/DR plans, backups and insurance where used.', ['RSK-2', 'RSK-3', 'BCD-1', 'BCD-2']),
      row('CC9.2', 'Assesses and manages risks associated with vendors and business partners.', 'Assess vendors before onboarding, assign risk levels, collect SOC 2 reports for high-risk vendors and review annually.', ['TPM-1', 'TPM-2']),
    ],
  },
  {
    id: 'iso27001', name: 'ISO/IEC 27001:2022',
    summary: 'Clauses 6.1.2, 6.1.3, 8.2 and 8.3 are mandatory. The risk treatment plan and Statement of Applicability must trace back to the register.',
    rows: [
      row('6.1.2', 'Information security risk assessment process with defined criteria, producing consistent, valid and comparable results.', 'Use the documented methodology and scoring rubric; identify risk owners.', ['RSK-1', 'RSK-3']),
      row('6.1.3', 'Risk treatment: select options and controls, compare with Annex A, produce a Statement of Applicability and a risk treatment plan, and get risk owner approval of the plan and residual risks.', 'Link each risk to controls, record the SoA justification and get owner sign-off on residual risk.', ['RSK-3']),
      row('8.2', 'Perform risk assessments at planned intervals and when significant changes are proposed or occur.', 'Annual assessment plus change-triggered reviews, with documented results.', ['RSK-2']),
      row('8.3', 'Implement the risk treatment plan and retain documented results.', 'Track treatment status and keep evidence that linked controls operate.', ['RSK-3', 'IAO-1']),
      row('A.5.7', 'Threat intelligence is collected and analysed.', 'Feed threat intelligence into risk identification.', ['RSK-2']),
      row('A.5.19 to A.5.22', 'Supplier relationships: policy, agreements, ICT supply chain, monitoring and change.', 'Run vendor assessments and annual reviews; link vendor risks in the register.', ['TPM-1', 'TPM-2']),
    ],
  },
  {
    id: 'iso31000', name: 'ISO 31000:2018',
    summary: 'ISO 31000 is guidance, not certifiable. Its process (clauses 6.4 to 6.6) is the basis of the methodology in this module.',
    rows: [
      row('6.3.4', 'Define risk criteria.', 'Agree scales, bands and appetite before scoring.', ['RSK-1']),
      row('6.4', 'Risk assessment: identification, analysis and evaluation.', 'Follow methodology steps 2 to 5.', ['RSK-2']),
      row('6.5', 'Risk treatment: select options, prepare and implement treatment plans.', 'Choose Mitigate, Transfer, Avoid or Accept and link controls.', ['RSK-3']),
      row('6.6', 'Monitoring and review.', 'Review the register on cycle and on change.', ['RSK-2', 'IAO-1']),
    ],
  },
  {
    id: 'iso42001', name: 'ISO/IEC 42001:2023',
    summary: 'AI risk assessment and AI system impact assessment are separate requirements. Both must cover AI-specific risks such as bias, misuse and data provenance.',
    rows: [
      row('6.1.2', 'AI risk assessment process with defined criteria.', 'Extend the register with AI scenarios (R-14, R-15) and the AI inventory.', ['AIG-2', 'AIG-3']),
      row('6.1.4', 'AI system impact assessment of consequences for individuals, groups and society.', 'Complete an impact assessment for each AI system that affects people.', ['AIG-4']),
      row('8.2', 'Perform AI risk assessments at planned intervals and on significant change.', 'Re-assess on model, data or vendor change.', ['AIG-3']),
      row('8.3', 'Implement the AI risk treatment plan.', 'Track AI treatments such as oversight and testing to completion.', ['AIG-5', 'AIG-6']),
    ],
  },
  {
    id: 'nist', name: 'NIST CSF 2.0',
    summary: 'GV.RM sets the risk strategy and appetite; ID.RA performs the assessment.',
    rows: [
      row('GV.RM', 'Risk management objectives, appetite and tolerance are established and communicated.', 'Publish the appetite statement and criteria.', ['RSK-1', 'RSK-3']),
      row('ID.RA', 'Assets, threats, vulnerabilities, likelihood and impact are identified and risk responses are chosen.', 'Run the assessment and record responses.', ['RSK-2', 'VPM-2']),
    ],
  },
  {
    id: 'hipaa', name: 'HIPAA Security Rule',
    summary: 'Risk analysis and risk management are required implementation specifications, and are among the most cited findings in enforcement actions.',
    rows: [
      row('164.308(a)(1)(ii)(A)', 'Accurate and thorough assessment of risks and vulnerabilities to ePHI.', 'Cover every system that creates, receives, maintains or transmits ePHI.', ['RSK-2']),
      row('164.308(a)(1)(ii)(B)', 'Security measures sufficient to reduce risks and vulnerabilities to a reasonable and appropriate level.', 'Track treatment and residual risk with owners and dates.', ['RSK-3']),
    ],
  },
  {
    id: 'gdpr', name: 'GDPR',
    summary: 'Security must be appropriate to the risk, and high-risk processing needs a DPIA before it starts.',
    rows: [
      row('Art. 32', 'Security of processing appropriate to the risk to rights and freedoms.', 'Use the register to justify the level of security for personal data.', ['RSK-2', 'CRY-1']),
      row('Art. 35', 'Data protection impact assessment for processing likely to result in high risk.', 'Complete a DPIA before launch and link its risks to the register.', ['AIG-4']),
    ],
  },
  {
    id: 'dpdpa', name: 'DPDPA (India)',
    summary: 'Significant data fiduciaries must carry out periodic DPIAs and periodic audits.',
    rows: [
      row('Sec. 10(2)(c)', 'Significant data fiduciary: periodic data protection impact assessment and periodic audit.', 'Schedule DPIAs and an independent audit, and link findings to the register.', ['AIG-4', 'IAO-1']),
      row('Sec. 8(5)', 'Reasonable security safeguards to prevent personal data breach.', 'Use the risk assessment to justify safeguards.', ['RSK-2', 'RSK-3']),
    ],
  },
  {
    id: 'euaiact', name: 'EU AI Act',
    summary: 'Providers of high-risk AI systems must run a continuous, iterative risk management system across the lifecycle.',
    rows: [
      row('Art. 9', 'Risk management system for high-risk AI: identify, estimate and evaluate risks, adopt measures, test, and review across the lifecycle.', 'Run AI risk assessments per system and record measures and test results.', ['AIG-3', 'AIG-6', 'AIG-5']),
    ],
  },
  {
    id: 'nis2', name: 'NIS2',
    summary: 'Essential and important entities must take risk-based cybersecurity measures, starting with risk analysis policies.',
    rows: [
      row('Art. 21(2)(a)', 'Policies on risk analysis and information system security.', 'Approve the Risk Management Policy and run the assessment.', ['RSK-1', 'RSK-3']),
      row('Art. 21(2)(d)', 'Supply chain security.', 'Assess suppliers and link their risks.', ['TPM-2']),
    ],
  },
  {
    id: 'dora', name: 'DORA',
    summary: 'Financial entities must keep a documented ICT risk management framework, reviewed at least yearly.',
    rows: [
      row('Art. 6', 'ICT risk management framework, documented and reviewed at least once a year.', 'Maintain the policy, methodology and register as part of the framework.', ['RSK-1', 'RSK-3']),
      row('Art. 8', 'Identify, classify and document ICT functions, assets and risks.', 'Link register risks to the asset inventory.', ['RSK-2']),
      row('Art. 28', 'Management of ICT third-party risk.', 'Assess and monitor ICT providers.', ['TPM-1', 'TPM-2']),
    ],
  },
];

export const CROSSWALK_BY_ID: Record<string, FrameworkCrossCheck> = Object.fromEntries(CROSSWALK.map((f) => [f.id, f]));
