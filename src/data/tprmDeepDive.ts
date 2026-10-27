// TPRM practitioner deep dive for the Vendor Risk Management module.
// Generic content only; no client or personal names.

export interface Table { headers: string[]; rows: string[][] }
export interface DeepDiveSection {
  id: string;
  title: string;
  lead: string;
  tables?: { caption: string; table: Table }[];
  lists?: { caption: string; items: string[]; ordered?: boolean; check?: boolean }[];
  note?: string;
}

export const DEEP_DIVE: DeepDiveSection[] = [
  {
    id: 'residual',
    title: 'Residual risk and risk profiling',
    lead: 'Tier on inherent risk; approve on residual risk. Only credit controls you have evidence for. Vendor controls mostly reduce likelihood; impact drops through your own measures, such as minimising the data shared or holding the encryption keys.',
    tables: [
      { caption: 'Worked example (5 x 5 likelihood x impact)', table: { headers: ['Vendor', 'Inherent', 'Evidence reviewed', 'Control credit', 'Residual', 'Decision'], rows: [
        ['Payroll SaaS with employee PII and bank details', '4 x 5 = 20 Critical', 'Clean SOC 2 Type II, 12-month period, current bridge letter', 'Strong: likelihood down 2 levels', '2 x 5 = 10 High', 'Approve with contract terms; residual above appetite, so CISO accepts in writing'],
        ['Same vendor, SOC 2 with access review exceptions', '4 x 5 = 20 Critical', 'Qualified opinion on CC6', 'Partial: likelihood down 1 level', '3 x 5 = 15 High', 'Conditional approval, remediation plan, 90-day follow-up'],
        ['Marketing analytics tool, pseudonymous data', '3 x 2 = 6 Medium', 'Questionnaire only', 'Moderate: down 1 level', '2 x 2 = 4 Low', 'Approve; annual light review'],
      ] } },
      { caption: 'Risk profiling beyond security', table: { headers: ['Risk type', 'What to check', 'Signals that raise the score', 'Typical treatment'], rows: [
        ['Country / geopolitical', 'Where data is stored, processed and accessed from; where support staff sit; sanctions', 'Sanctions exposure, government access laws, conflict zones, weak rule of law', 'Residency terms, restricted access locations, transfer impact assessment, exit plan'],
        ['Regulatory', 'Which laws attach to the data and service', 'Regulated data, vendor unaware of its obligations', 'DPA or BAA, regulator notification where required, regulator audit rights'],
        ['Outsourcing', 'Whether a regulator expects you to control the function', 'Core or customer-facing function, material outsourcing (RBI, DORA)', 'Board-approved policy, enhanced due diligence, exit strategy'],
        ['Concentration', 'How many critical services sit on one provider, region or fourth party', 'One cloud region or identity provider behind several critical services', 'Multi-region design, secondary provider, tested exit plan, concentration register'],
        ['Nth party', "The vendor's own suppliers touching your data or service", 'Unlisted subprocessors, hosting carved out of the SOC report, offshore support', 'Subprocessor list and notice clause, flow-down terms, review of the vendor\'s own TPRM'],
      ] } },
    ],
  },
  {
    id: 'evidence',
    title: 'Assurance evidence review',
    lead: 'A report only helps if it covers the service you buy, for the period you rely on, with no exceptions in the controls that matter to you.',
    tables: [
      { caption: 'SOC 1 vs SOC 2', table: { headers: ['', 'SOC 1', 'SOC 2'], rows: [
        ['Purpose', "Controls relevant to the customer's financial reporting", 'Security, availability, processing integrity, confidentiality, privacy'],
        ['Criteria', 'Control objectives defined by the service organisation', 'AICPA Trust Services Criteria'],
        ['Typical reader', 'Financial auditors, SOX teams', 'Security, TPRM, customers'],
        ['TPRM use', 'Payroll, billing and payment processors', 'Most SaaS and infrastructure vendors'],
      ] } },
    ],
    lists: [
      { caption: 'Read a SOC 2 Type II in this order', ordered: true, items: [
        'Opinion: unqualified, qualified, adverse or disclaimer',
        'Scope: is the product and region you use in scope, and which TSCs',
        'Period: covers the last 12 months, and how old the period end is',
        'Subservice organisations: carve-out means you need the provider\'s own report; inclusive means it was tested here',
        'CSOCs: controls the vendor relies on its subservice providers to perform; check the vendor monitors them',
        'CUECs: controls you must operate; map each to an owner on your side',
        'Exceptions: read every deviation and management response against the controls you care about',
        'Bridge letter: unaudited management statement for the gap since period end; accept for about 3 months at most',
      ] },
      { caption: 'Red flags: SOC 2', check: true, items: [
        'Qualified, adverse or disclaimer opinion', 'Product or region you use is out of scope', 'Type I only for a critical vendor',
        'Period ended over 12 months ago, or gap over 3 months covered only by a bridge letter', 'Hosting carved out with no subservice report',
        'Exceptions in access, change, logging or incident response', 'CUECs you are not performing', 'Security TSC only when you rely on availability or confidentiality',
      ] },
      { caption: 'Red flags: ISO 27001 certificate and SoA', check: true, items: [
        'Scope does not cover the service, site or entity you contract with', 'Expired, or certification body not accredited (check the accreditation register or IAF CertSearch)',
        'Still on the 2013 version after the transition deadline (31 October 2025)', 'SoA excludes supplier, logging or secure development controls without a convincing reason',
        'Vendor will not share the SoA even under NDA, or surveillance audit overdue',
      ] },
      { caption: 'Red flags: penetration test and vulnerability reports', check: true, items: [
        'Older than 12 months or predates a major release', 'Scope excludes the app or API you use', 'Tested by the team that built it',
        'Critical or high findings open with no dates or retest', 'Letter of attestation only, no methodology or finding counts', 'Automated scan presented as a pen test',
      ] },
    ],
    note: 'Scenario: a critical vendor\'s SOC 2 is qualified on logical access and the bridge letter is 4 months old. Read the exceptions, ask for root cause and remediation evidence, request current evidence for the failed controls, raise a finding and increase monitoring, reduce exposure meanwhile, and get documented risk acceptance or escalate to exit if residual risk stays above appetite.',
  },
  {
    id: 'questionnaires',
    title: 'Questionnaires and validating answers',
    lead: 'A questionnaire is the vendor\'s own claim. Decide which answers matter and prove them.',
    tables: [
      { caption: 'Which questionnaire', table: { headers: ['Questionnaire', 'Maintained by', 'Use'], rows: [
        ['SIG Lite', 'Shared Assessments', 'Lower risk or initial screening'],
        ['SIG Core', 'Shared Assessments', 'High-risk vendors, scoped by domain'],
        ['CAIQ', 'Cloud Security Alliance', 'Cloud vendors; mapped to the Cloud Controls Matrix; often published in CSA STAR'],
        ['Custom', 'Your organisation', 'Gaps the standard sets miss (AI use, sector rules, contract terms); keep it short'],
      ] } },
    ],
    lists: [
      { caption: 'Validate rather than accept', ordered: true, items: [
        'Every high-risk yes needs evidence: a document, screenshot, report section or demo',
        'Cross-check against the SOC 2 or ISO SoA; independent evidence wins over the questionnaire',
        'Look for inconsistencies and follow them up',
        'Check external signals: ratings, breach history, trust pages, subprocessor lists',
        'For critical vendors, ask an engineer to walk through key controls',
        'Watch for copy-paste answers and N/A on obviously relevant questions',
      ] },
    ],
  },
  {
    id: 'frameworks',
    title: 'Framework alignment',
    lead: 'Use frameworks for structure (how the program runs) and for the control set (what you test in vendors).',
    tables: [
      { caption: 'Where each framework shows up', table: { headers: ['Framework', 'What it is', 'In a vendor assessment'], rows: [
        ['NIST CSF 2.0', 'Outcome framework; Govern function includes GV.SC supply chain risk management', 'Program design and maturity; GV.SC-01 to GV.SC-10 cover the supplier lifecycle'],
        ['NIST SP 800-53 Rev. 5', 'Control catalogue', 'SR (Supply Chain Risk Management) family, SA-9 external system services'],
        ['NIST RMF (SP 800-37)', 'Categorise, select, implement, assess, authorise, monitor', 'Authorising vendor systems that connect to yours; federal contexts'],
        ['NIST SP 800-161 Rev. 1', 'Cybersecurity supply chain risk management (C-SCRM)', 'Enterprise C-SCRM strategy, supplier criticality, software and hardware supply chain'],
        ['ISO/IEC 27001:2022', 'ISMS certification standard', 'Annex A 5.19 to 5.23: supplier policy, agreements, ICT supply chain, monitoring, cloud services'],
        ['ISO/IEC 27036', 'Guidance on supplier relationship security (parts 1 to 4; part 4 cloud)', 'Designing the supplier lifecycle and contract security requirements; not certifiable'],
      ] } },
    ],
  },
  {
    id: 'reporting',
    title: 'Findings, risk acceptance, KRIs and reporting',
    lead: 'Each finding needs an owner, a date, a rating and a decision: fix, accept or exit. Close only on evidence you have checked.',
    lists: [
      { caption: 'Finding lifecycle', ordered: true, items: [
        'Rate by effect on residual risk (Critical, High, Medium, Low)',
        'Agree remediation with the vendor; Critical often 30 days, High 60 to 90 days',
        'Track in the vendor risk register or TPRM platform and chase on a schedule',
        'Close only on evidence',
        'Missed date or refusal: escalate to the business owner, then the risk committee',
        'Risk acceptance: documented, time-bound (6 to 12 months), signed at the right level, compensating controls noted',
      ] },
      { caption: 'Vendor risk register columns', items: ['Vendor, tier, inherent and residual score', 'Open findings by severity', 'Accepted risks with expiry', 'Last assessment and next due', 'Contract renewal date', 'Business owner'] },
    ],
    tables: [
      { caption: 'KRIs that work', table: { headers: ['KRI', 'Why it matters', 'Example threshold'], rows: [
        ['% Tier 1 and 2 vendors with an overdue assessment', 'Coverage slipping', 'Above 5%'],
        ['Vendors in use without assessment (found via AP or SSO)', 'Intake bypass', 'Any Tier 1'],
        ['Critical and high findings past due', 'Remediation failing', 'Any critical over 30 days'],
        ['Risk acceptances past expiry', 'Exceptions becoming permanent', 'Any'],
        ['Tier 1 vendors with a security rating drop', 'Early warning', 'Drop of 50+ points in a month'],
        ['Critical services per provider', 'Concentration', '3 or more on one provider'],
        ['Vendor incidents affecting you', 'Outcome', 'Trend with root cause'],
      ] } },
    ],
    note: 'Executive summary: one page. Lead with the decision needed, then the top five vendor risks with trend, KRIs against thresholds, overdue items and acceptances expiring this quarter.',
  },
  {
    id: 'operations',
    title: 'Monitoring platforms and working with stakeholders',
    lead: 'Monitoring triggers reviews between assessments; the program runs on clean hand-offs between functions.',
    tables: [
      { caption: 'Continuous monitoring signals', table: { headers: ['Signal', 'Tools', 'Limits'], rows: [
        ['Security ratings', 'BitSight, SecurityScorecard, UpGuard, Black Kite', 'Outside-in only; attribution errors; a trigger, never a verdict'],
        ['Adverse media and financial health', 'News monitoring, credit data, sanctions screening', 'Noisy; focus on Tier 1 and 2'],
        ['Assurance refresh', 'TPRM platform reminders', 'Only as good as the dates captured'],
        ['Internal signals', 'Your incident, SSO and procurement data', 'Needs integration with procurement and IT'],
      ] } },
      { caption: 'TPRM platforms', table: { headers: ['Platform', 'Typical fit'], rows: [
        ['OneTrust Third-Party Risk', 'Privacy-led programs; DPIA and GDPR workflows'],
        ['ProcessUnity', 'Mature, configurable workflows for large programs'],
        ['Archer', 'Enterprise GRC suites, often financial services'],
        ['ServiceNow VRM', 'Organisations already on ServiceNow; ties to procurement and IT'],
        ['Vanta / Drata vendor modules', 'Startups and mid-size companies running SOC 2 or ISO'],
        ['Whistic, Prevalent', 'Questionnaire exchange and shared assessment libraries'],
      ] } },
      { caption: 'Who owns what', table: { headers: ['Function', 'Owns', 'TPRM needs from them'], rows: [
        ['Procurement', 'Sourcing, POs, renewals', 'No PO without a TPRM ticket; renewal dates 90 days ahead'],
        ['Legal', 'Contract negotiation', 'Security schedule and DPA templates; deviations routed to TPRM'],
        ['IT and Security', 'Integrations, access, technical review', 'SSO enforcement, provisioning, deep dives for Tier 1'],
        ['Privacy', 'DPIAs, transfers, DPAs', 'DPIA triggers and transfer assessments'],
        ['Business owner', 'The relationship and the risk decision', 'Accountability and risk acceptance sign-off'],
        ['Internal audit', 'Independent assurance on the program', 'Clear policy, evidence by tier, metrics, remediation tracking'],
      ] } },
    ],
    note: 'For a regulatory review or program audit, be able to pull any sampled vendor\'s full trail: intake, tier, assessment, approval, contract, monitoring and exceptions.',
  },
];
