// November 2026 updates: DPDPA phased rollout and core rules, AI pipeline privacy, agentic AI,
// AI agent persona, vendor case studies, incident communications, CISO continuity and interview questions.
// Items with `verify: true` show a "Pending verification" chip until the site owner confirms them.

export const LAST_VERIFIED = '14 Nov 2026';

export const SRC = {
  meity: { label: 'MeitY', url: 'https://www.meity.gov.in/' },
  act: { label: 'Digital Personal Data Protection Act, 2023 (MeitY)', url: 'https://www.meity.gov.in/' },
  rules: { label: 'DPDP Rules, 2025, Gazette G.S.R. 846(E) (MeitY)', url: 'https://www.meity.gov.in/' },
  board: { label: 'Board notification G.S.R. 844(E) (MeitY)', url: 'https://www.meity.gov.in/' },
  pib: { label: 'Press Information Bureau', url: 'https://pib.gov.in/' },
  tsmcSec: { label: 'TSMC filings on SEC EDGAR (Form 6-K)', url: 'https://www.sec.gov/cgi-bin/browse-edgar?action=getcompany&CIK=0001046179&type=6-K' },
  tsmcNews: { label: 'Cyber Security News, 13 Nov 2026', url: 'https://cybersecuritynews.com/tsmc-data-breach/' },
  m365a: { label: 'BleepingComputer', url: 'https://www.bleepingcomputer.com/news/microsoft/massive-microsoft-365-outage-disrupts-outlook-teams-copilot-worldwide/' },
  m365b: { label: 'Cyberpress', url: 'https://cyberpress.org/microsoft-365-outage/' },
  nydfs: { label: 'NYDFS cybersecurity submissions', url: 'https://www.dfs.ny.gov/cybersecurity/submissions-notifications' },
  nistAi: { label: 'NIST AI Risk Management Framework', url: 'https://www.nist.gov/itl/ai-risk-management-framework' },
  iso42001: { label: 'ISO/IEC 42001:2023', url: 'https://www.iso.org/standard/81230.html' },
};

// 1a. Phased rollout
export const DPDPA_PHASES = [
  {
    date: '13 Nov 2025', target: '2025-11-13', phase: 'Phase 1', status: 'In force',
    points: [
      { text: 'DPDP Rules, 2025 notified in the Gazette as G.S.R. 846(E).', src: ['rules'], note: 'PIB summaries give 14 Nov 2025; the Gazette date is used here. Law firm commentary also differs by one day on the later phase dates, so confirm exact dates against the Gazette.' },
      { text: 'Rules 1, 2 and 17 to 21 apply immediately.', src: ['rules'] },
      { text: 'The Data Protection Board of India is established under Section 18 by G.S.R. 844(E), with its head office in the National Capital Region.', src: ['board', 'act'] },
      { text: 'The Rules set up a digital-first Board with four members, online complaints, and appeals to the Appellate Tribunal (TDSAT).', src: ['rules', 'act'] },
      { text: 'The SPDI Rules 2011 and Section 43A of the IT Act stay in force until 13 May 2027.', src: ['rules', 'pib'] },
    ],
  },
  {
    date: '13 Nov 2026', target: '2026-11-13', phase: 'Phase 2', status: 'In force from 13 Nov 2026',
    points: [
      { text: 'Rule 4 applies: registration and obligations of Consent Managers, with Section 6(9) and Section 27(1)(d).', src: ['rules', 'act'] },
      { text: 'Consent Managers are interoperable consent platforms registered with the Board.', src: ['rules'] },
      { text: 'Eligibility under the First Schedule, as reported by secondary sources: a company incorporated in India, net worth of at least two crore rupees, and consent records kept for at least seven years.', src: ['rules'], verify: true },
    ],
  },
  {
    date: '13 May 2027', target: '2027-05-13', phase: 'Phase 3', status: 'Upcoming',
    points: [
      { text: 'Rules 3, 5 to 16, 22 and 23 and all remaining sections of the Act apply.', src: ['rules'] },
      { text: 'Covers notice and consent, security safeguards, breach notification, erasure, Data Principal rights, children\'s data, Significant Data Fiduciary obligations and cross-border transfer.', src: ['rules', 'act'] },
      { text: 'The Board\'s powers to inquire, adjudicate and impose penalties start on this date.', src: ['act', 'pib'] },
    ],
  },
];
export const DPDPA_COUNTDOWN_TARGET = '2027-05-13T00:00:00+05:30';
export const DPDPA_PORTAL_NOTE = { text: 'Board portal: dpbi.gov.in reported live in November 2026; some sources cite dpdpa-grievance.gov.in. The confirmed address will be linked once MeitY or PIB confirms it.', verify: true };

// 1b. Core Data Fiduciary rules: [rule, section, obligation, evidence, mapping]
export const DPDPA_CORE_RULES = [
  ['Rule 6', 's.8(5)', 'Reasonable security safeguards: encryption, masking, obfuscation or tokenisation; access control; logging and monitoring of access; logs and relevant personal data retained at least 1 year (longer if another law requires it); backups and continuity; security obligations written into Data Processor contracts.', 'Encryption standard, access reviews, log retention configuration, backup tests, processor contract clauses.', 'ISO 27001: A.8.24, A.5.15, A.8.2, A.8.3, A.8.15, A.8.16, A.8.13, A.5.19 to A.5.21. SOC 2: CC6.1, CC7.2, A1.2. GDPR: Art. 28, 32.'],
  ['Rule 7', 's.8(6)', 'Two-stage breach intimation: (i) without delay to each affected Data Principal and an initial intimation to the Board; (ii) a detailed report to the Board within 72 hours of becoming aware, which the Board can extend on request.', 'Incident response plan, breach register, notification templates, evidence of the 72-hour clock.', 'ISO 27001: A.5.24 to A.5.28, A.6.8. SOC 2: CC7.3 to CC7.5. GDPR: Art. 33, 34.'],
  ['Rule 8 and Third Schedule', 's.8(7), 8(8)', 'Erase personal data when the specified purpose is deemed no longer served. For Third Schedule classes (large e-commerce, online gaming and social media intermediaries) this follows the prescribed inactivity period. Notify the Data Principal at least 48 hours before that period ends. Keep processing logs at least 1 year.', 'Retention schedule, deletion jobs, 48-hour notice template, deletion logs.', 'ISO 27001: A.8.10, A.5.33. SOC 2: CC6.5, P4.2. GDPR: Art. 5(1)(e), 17.'],
  ['Rule 9', 's.8(9)', 'Publish the business contact information of the DPO (if any) or of a person who can answer Data Principals\' questions, prominently on the website or app, and include it in every response to a Data Principal.', 'Privacy notice, response templates.', 'ISO 27001: A.5.34. SOC 2: P1.1. GDPR: Art. 13(1)(b).'],
  ['Rule 14', 's.11 to 13', 'Publish how Data Principals can exercise their rights (access, correction, erasure, grievance, nomination). Respond to grievances within 90 days at most.', 'Rights request tracker with an SLA clock.', 'ISO 27001: A.5.34. SOC 2: P5, P8. GDPR: Art. 12 to 22.'],
  ['Rule 13', 's.10', 'Significant Data Fiduciaries only: annual DPIA and audit, due diligence on algorithmic software, and data localisation measures where notified.', 'DPIA report, independent audit report, algorithm due diligence records.', 'ISO 27001: Clause 9.2, A.5.35. ISO/IEC 42001 for algorithmic systems. GDPR: Art. 35.'],
];

// 1c. Grievance and contact point
export const DPDPA_GRIEVANCE = [
  { title: 'Who must appoint a DPO', text: 'Only Significant Data Fiduciaries (s.10(2)(a)). The DPO must be based in India, be an individual answerable to the Board of Directors, and be the point of contact for grievances. A common misreading is that every business needs a DPO; it does not.', src: ['act'] },
  { title: 'Everyone else', text: 'Publish the contact details of a person who can answer questions about processing (s.8(9)).', src: ['act'] },
  { title: 'Grievance mechanism', text: 'Every Data Fiduciary needs an effective grievance mechanism (s.8(10)), and Data Principals must use it before approaching the Board (s.13).', src: ['act'] },
];
export const DPDPA_GRIEVANCE_CHECKLIST = [
  'Replace info@, hello@ or contact@ in privacy notices with a dedicated privacy@, dpo@ or grievance@ mailbox.',
  'Name an owner for the mailbox.',
  'Run a ticket tracker with a 90-day SLA clock.',
  'Acknowledge every request on receipt.',
  'Keep an audit trail of each request and response.',
];

export const DPDPA_BOARD_READINESS = 'From 13 May 2027 the Board can inquire and penalise. If a complaint came in tomorrow, could you produce consent records, breach response logs and the grievance trail within days?';

// 1e. Resources
export const DPDPA_RESOURCES = [
  { title: 'Privacy Engineering in India: Operationalizing the DPDPA', by: 'DPO Club, launched at the Bharat Privacy Conference 2026', type: 'Book' },
  { title: 'DPDP Act, 2023 and DPDP Rules, 2025', by: 'Ministry of Electronics and Information Technology', type: 'Primary source', url: 'https://www.meity.gov.in/' },
];

// 2a. AI privacy risk row
export const AI_PIPELINE_RISK = {
  title: 'Personal data in AI pipelines (DPDPA)',
  scope: 'Prompts, retrieved RAG records, agent memory and tool-call logs that contain personal data fall under Rule 6 (logging and 1-year retention), Rule 7 (breach) and Rule 8 (erasure).',
  risk: 'Deletion requests conflict with mandatory log retention, and AI logging has to be redesigned before 13 May 2027.',
  likelihood: 'High', impact: 'High',
  treatment: ['Data inventory of AI data flows', 'PII redaction in prompts before they reach the model', 'Separate retention tiers for security logs and content logs', 'Deletion that propagates to vector stores, caches and agent memory'],
};

// 2b. Security layers for AI (bottom to top)
export const AI_LAYERS = [
  ['Infrastructure', 'Servers, networks, identity and the cloud foundations everything else runs on.'],
  ['Application', 'The software that calls models and handles user data.'],
  ['Cloud', 'Managed services, storage, keys and configuration.'],
  ['AI', 'Prompt injection, data poisoning, model theft and sensitive data exposure.'],
  ['Agentic AI', 'What autonomous systems can access, decide and execute.'],
];
export const AI_LAYERS_CAPTION = 'Each layer inherits the weaknesses of the layers beneath it.';

// 2c. Agentic AI controls: [control, ISO/IEC 42001 Annex A area, NIST AI RMF function]
export const AGENTIC_RISK = 'An authorized agent with valid credentials takes an unintended action because of manipulated instructions, excessive permissions or weak oversight.';
export const AGENTIC_CONTROLS = [
  ['Least-privilege tool permissions', 'A.9 Use of AI systems', 'Manage'],
  ['Strong identity and delegated access', 'A.9 Use of AI systems; A.4 Resources for AI systems', 'Govern, Manage'],
  ['Sandboxed execution', 'A.6 AI system life cycle', 'Manage'],
  ['Human approval for high-impact actions', 'A.9 Use of AI systems', 'Govern, Manage'],
  ['Protected memory', 'A.7 Data for AI systems', 'Map, Manage'],
  ['Complete audit trails', 'A.6 AI system life cycle', 'Measure'],
];

// 3. AI agent persona
export const AI_AGENT_PERSONA = {
  title: 'AI Agents (Non-Human Identities)',
  note: 'Applies to any autonomous or semi-autonomous agent that uses tools or credentials. Added 14 Nov 2026.',
  categories: [
    { name: 'Ownership and Identity', requirements: ['A named human owner is assigned to every agent', 'Each agent has its own identity, never a shared or personal account', 'Logs tie every agent action to the human principal it acts for'], frameworks: ['ISO/IEC 42001 A.9', 'ISO 27001 A.5.16, A.8.15', 'NIST AI RMF Govern'] },
    { name: 'Access and Credentials', requirements: ['Tool permissions scoped to the task, nothing broader', 'Short-lived delegated credentials, no long-lived keys', 'Approval gates for writes, payments and deletions'], frameworks: ['ISO 27001 A.8.2, A.8.5', 'SOC 2 CC6.1, CC6.3', 'NIST AI RMF Manage'] },
    { name: 'Review', requirements: ['Quarterly access review of agent permissions', 'Revoke unused tools and credentials', 'Review agent actions alongside human access reviews'], frameworks: ['ISO 27001 A.5.18', 'SOC 2 CC6.2', 'NIST AI RMF Measure'] },
  ],
};

// 4a. TSMC case study
export const TSMC_CASE = {
  title: 'TSMC employee data exposure via a cloud provider (Nov 2026)',
  confirmed: [
    'Personal data of some current and former employees appeared on an external website without authorization.',
    'The data matched records held in a cloud service provider\'s systems.',
    'TSMC said the incident was unrelated to its operations or customer data.',
    'TSMC engaged the vendor, investigating authorities and a third-party cybersecurity firm.',
  ],
  confirmedSrc: ['tsmcSec', 'tsmcNews'],
  unconfirmed: ['About 46,000 records', 'A 6.9 GB dataset', 'A demand of 3 BTC'],
  lessons: [
    'Inventory which vendors hold employee and HR data, not only customer data.',
    'Contractual breach notification SLAs with the vendor.',
    'Right to audit the vendor and its sub-processors.',
    'Data minimisation and deletion on offboarding written into the contract.',
    'Visibility of fourth parties (the vendor\'s own providers).',
  ],
  dpdpaLink: 'Under DPDPA, Rule 6 requires security obligations in Data Processor contracts and Rule 7 starts the breach clock when the Data Fiduciary becomes aware, even when the breach happened at the processor.',
};

// 4b. Concentration risk
export const CONCENTRATION = {
  title: 'Concentration risk: single-provider dependency',
  example: 'The Microsoft 365 outage of 12 to 13 Nov 2026 disrupted Outlook, Teams, SharePoint, Copilot and Defender XDR. Microsoft\'s updates described failed automated health checks and overloaded servers, not a cyberattack.',
  exampleSrc: ['m365a', 'm365b'],
  controls: [
    'Tier critical SaaS by business impact.',
    'Keep an alternate out-of-band communication channel.',
    'Document manual workarounds for critical processes.',
    'Maintain exit and failover plans.',
    'Include vendor outages in BCP and DR tests.',
  ],
  mapping: 'ISO 27001: A.5.29, A.5.30, A.5.23. SOC 2: A1.2, A1.3.',
  note: 'Replacing one vendor with another moves the dependency rather than removing it.',
};

// 5. Incident response additions
export const IR_COMMS = [
  'An incident commander and a separate communications lead.',
  'A fixed update cadence, for example every 30 to 60 minutes.',
  'A single source of truth, such as the status page.',
  'A fact check before each external update.',
  'A handover protocol for long bridge calls, to avoid fatigue.',
];
export const KEY_PERSON = {
  risk: 'Undocumented dependencies, and the reasons behind configurations, leave with people.',
  controls: ['Runbooks', 'Architecture decision records', 'Documented exceptions with approvers', 'Cross-training'],
};
export const DPDPA_BREACH_CLOCK = [
  ['On becoming aware', 'Intimate each affected Data Principal without delay, and send an initial intimation to the Board.'],
  ['Within 72 hours', 'Send the detailed report to the Board. The Board can extend this on request.'],
];

// 6. CISO continuity
export const CISO_CONTINUITY = {
  points: [
    'Keep the risk register in a governed system, not on one person\'s laptop.',
    'Document every open exception and who approved it.',
    'Make sure someone besides the CISO has briefed the board in the last 12 months.',
    'Name an interim CISO or vCISO in advance.',
  ],
  regulatory: { text: 'Example: the NYDFS 23 NYCRR Part 500 annual compliance filing is still due during a leadership change. NYDFS lists 15 April as the annual deadline.', verify: true, src: ['nydfs'] },
};

// 7. Interview questions: { q, a, section }
export const NOV2026_QUESTIONS = [
  { q: 'Walk me through the DPDPA rollout phases and what changes on 13 May 2027.', a: 'The Rules were notified on 13 November 2025 (Phase 1), which set up the Data Protection Board and the procedural rules. Phase 2, from 13 November 2026, brought in Consent Manager registration. Phase 3, from 13 May 2027, switches on the substantive duties: notice and consent, security safeguards under Rule 6, breach reporting under Rule 7, erasure under Rule 8, Data Principal rights and SDF obligations, plus the Board\'s power to inquire and penalise. In practice I would use the gap to May 2027 for a data inventory, consent redesign, log retention changes and a breach runbook with the 72-hour report.', section: 'DPDPA Phased Rollout (Regional Frameworks)' },
  { q: 'Does every company need a DPO under DPDPA?', a: 'No. Only Significant Data Fiduciaries must appoint a DPO under Section 10, based in India and answerable to the Board of Directors. Every other Data Fiduciary must publish the contact details of a person who can answer questions about processing under Section 8(9), and run an effective grievance mechanism. I would still name an owner and use a dedicated privacy mailbox with a 90-day SLA tracker.', section: 'Grievance Redressal and Contact Point' },
  { q: 'How does DPDPA breach notification differ from GDPR Article 33?', a: 'GDPR notifies the supervisory authority within 72 hours unless the breach is unlikely to result in a risk, and individuals only when the risk is high. DPDPA has no risk threshold: every personal data breach is intimated to each affected Data Principal without delay and to the Board, followed by a detailed report to the Board within 72 hours, which the Board can extend. So the DPDPA runbook needs individual notification templates ready for every breach.', section: 'Core Data Fiduciary Rules and the DPDPA breach clock' },
  { q: 'How do you reconcile an erasure request with Rule 6\'s one-year log retention?', a: 'Separate the two kinds of data. Security and access logs are kept for the one year Rule 6 requires, with minimal personal data, restricted access and a fixed deletion date. The underlying personal data is erased when the purpose ends or on a valid request, including copies in caches, backups on their normal cycle and vector stores. I document the legal basis for what is retained, tell the Data Principal what remains and why, and keep a deletion log as evidence.', section: 'Personal data in AI pipelines and Rule 8' },
  { q: 'How do you secure agentic AI systems differently from traditional applications?', a: 'A traditional application does what its code says; an agent decides what to do, so the risk is an authorised agent taking an unintended action. I treat each agent as a non-human identity with a named owner, scoped tool permissions, short-lived delegated credentials, sandboxed execution, human approval for writes, payments and deletions, protected memory and complete audit trails tied to the human principal. I map these to ISO/IEC 42001 Annex A and the NIST AI RMF functions.', section: 'Agentic AI controls and AI agent persona' },
  { q: 'A vendor\'s cloud environment leaks your employees\' data. Walk through your TPRM and IR response.', a: 'Situation: employee data appears online and matches what a cloud vendor holds. Task: contain, notify and fix the vendor relationship. Action: open an incident, confirm scope with the vendor under the contract\'s notification clause, preserve evidence, start the DPDPA clock for affected employees and the Board, engage authorities and an independent firm, and check whether the data should have been with that vendor at all. Result: notifications on time, then contract changes covering breach SLAs, audit rights, minimisation, deletion on exit and fourth-party visibility, and HR data added to the vendor inventory.', section: 'TSMC case study (Vendor Risk Management)' },
  { q: 'How do you manage concentration risk on a single SaaS provider?', a: 'Tier critical SaaS by business impact, then for the top tier keep an out-of-band communication channel, documented manual workarounds and an exit plan, and include a provider outage in BCP and DR tests. A multi-day outage of a productivity suite is a realistic scenario. Switching vendors only moves the dependency, so the goal is a tested degraded mode, not zero dependency.', section: 'Concentration risk (Vendor Risk Management)' },
  { q: 'Security architect versus security engineer: how do scope and access differ?', a: 'The architect works across systems: setting patterns, reviewing designs and deciding trade-offs, usually with read access and design authority rather than standing production rights. The engineer builds and runs controls within systems: deploying tools, writing detections, fixing findings, often with just-in-time privileged access. Both should follow least privilege, and their access should be reviewed against these different needs.', section: 'Persona and Access Governance' },
  { q: 'How would you keep a security programme running if the CISO left suddenly?', a: 'Situation: the CISO leaves with audits and filings pending. Task: keep governance and obligations on track. Action: confirm the named interim or vCISO, check that the risk register and exception log live in a governed system, brief the board through someone already known to it, and list regulatory deadlines such as annual filings. Result: no missed obligations, and a documented handover that reduces key-person risk next time.', section: 'Security programme continuity (Risk Assessment and Treatment)' },
];
