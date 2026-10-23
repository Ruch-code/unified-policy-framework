// AI Vendor Assurance module data

export interface SectionCard {
  title: string;
  icon: string;
  purpose: string;
  bullets: string[];
  evidence: string[];
  redFlags: string[];
}

export interface DpaRow {
  check: string;
  position: string;
}

export interface DataFlowRow {
  dataType: string;
  stored: string;
  retention: string;
  access: string;
  why: string;
  encryption: string;
  training: string;
  evidence: string;
}

export interface AssuranceRow {
  question: string;
  evidence: string;
  verified: string;
}

export const DPA_CHECKLIST: DpaRow[] = [
  { check: 'Scope and subject matter', position: 'Processing limited to documented instructions and agreed purposes.' },
  { check: 'Documented instructions', position: 'Controller instructions are specific, written and binding on the processor.' },
  { check: 'Data categories and data subjects', position: 'Clear list of personal data types and categories of individuals.' },
  { check: 'Security measures (Annex II style)', position: 'Technical and organizational measures described with enough detail to assess.' },
  { check: 'Sub-processor list, notice and objection rights', position: 'Prior written notice with a defined objection window and clear termination right.' },
  { check: 'Assistance with data subject rights', position: 'Processor assists controller within agreed timelines and at agreed cost.' },
  { check: 'Incident notification timeline', position: 'Flag fixed hour commitments versus "without undue delay" and confirm feasibility.' },
  { check: 'Deletion or return at termination', position: 'Certification of deletion or return within a defined period after termination.' },
  { check: 'International transfers', position: 'SCCs, UK IDTA, DPDPA cross-border rules and transfer impact assessment in place.' },
  { check: 'Audit rights', position: 'Report reliance first, onsite audit as fallback, with notice and cost terms defined.' },
  { check: 'Liability caps and indemnity', position: 'Caps aligned to risk, with carve-outs for data protection breaches and IP infringement.' },
];

export const DATA_FLOW_ROWS: DataFlowRow[] = [
  { dataType: 'Prompts and user input', stored: 'Confirm where prompts are persisted', retention: 'Confirm retention period', access: 'Confirm who can access', why: 'Confirm access justification', encryption: 'Confirm encryption in transit and at rest', training: 'Confirm whether used for training', evidence: 'Request data flow documentation' },
  { dataType: 'Source code and repositories', stored: 'Confirm storage location', retention: 'Confirm retention period', access: 'Confirm who can access', why: 'Confirm access justification', encryption: 'Confirm encryption in transit and at rest', training: 'Confirm whether used for training', evidence: 'Request access control documentation' },
  { dataType: 'Uploaded files', stored: 'Confirm storage location', retention: 'Confirm retention period', access: 'Confirm who can access', why: 'Confirm access justification', encryption: 'Confirm encryption in transit and at rest', training: 'Confirm whether used for training', evidence: 'Request storage and retention policy' },
  { dataType: 'Secrets and credentials', stored: 'Confirm storage location', retention: 'Confirm retention period', access: 'Confirm who can access', why: 'Confirm access justification', encryption: 'Confirm encryption in transit and at rest', training: 'Confirm whether used for training', evidence: 'Request secrets management documentation' },
  { dataType: 'Generated outputs and code', stored: 'Confirm storage location', retention: 'Confirm retention period', access: 'Confirm who can access', why: 'Confirm access justification', encryption: 'Confirm encryption in transit and at rest', training: 'Confirm whether used for training', evidence: 'Request output handling documentation' },
  { dataType: 'Tool calls and third-party API actions', stored: 'Confirm storage location', retention: 'Confirm retention period', access: 'Confirm who can access', why: 'Confirm access justification', encryption: 'Confirm encryption in transit and at rest', training: 'Confirm whether used for training', evidence: 'Request tool call logging documentation' },
  { dataType: 'Execution environments and sandboxes', stored: 'Confirm storage location', retention: 'Confirm retention period', access: 'Confirm who can access', why: 'Confirm access justification', encryption: 'Confirm encryption in transit and at rest', training: 'Confirm whether used for training', evidence: 'Request sandbox isolation documentation' },
  { dataType: 'Logs and telemetry', stored: 'Confirm storage location', retention: 'Confirm retention period', access: 'Confirm who can access', why: 'Confirm access justification', encryption: 'Confirm encryption in transit and at rest', training: 'Confirm whether used for training', evidence: 'Request logging and telemetry documentation' },
  { dataType: 'Model providers', stored: 'Confirm storage location', retention: 'Confirm retention period', access: 'Confirm who can access', why: 'Confirm access justification', encryption: 'Confirm encryption in transit and at rest', training: 'Confirm whether used for training', evidence: 'Request model provider agreement' },
  { dataType: 'Other sub-processors', stored: 'Confirm storage location', retention: 'Confirm retention period', access: 'Confirm who can access', why: 'Confirm access justification', encryption: 'Confirm encryption in transit and at rest', training: 'Confirm whether used for training', evidence: 'Request sub-processor list' },
];

export const ASSURANCE_ROWS: AssuranceRow[] = [
  { question: 'Confirm whether agents operate with least privilege and scoped permissions.', evidence: 'Request IAM policy documentation and permission scope review.', verified: 'No' },
  { question: 'Confirm whether tenant separation is enforced at the data and compute layer.', evidence: 'Request architecture diagram and tenant isolation documentation.', verified: 'No' },
  { question: 'Confirm whether execution boundaries and sandbox isolation are in place.', evidence: 'Request sandbox configuration and isolation test results.', verified: 'No' },
  { question: 'Confirm whether human approval is required before high-impact actions.', evidence: 'Request approval workflow documentation and audit logs.', verified: 'No' },
  { question: 'Confirm whether prompt injection defenses cover direct and indirect vectors (files, web pages, tool output).', evidence: 'Request security testing results and defense documentation.', verified: 'No' },
  { question: 'Confirm whether sensitive data and secrets are filtered from outputs and logs.', evidence: 'Request DLP and output filtering configuration.', verified: 'No' },
  { question: 'Confirm the retention period for prompts and outputs.', evidence: 'Request data retention policy and configuration.', verified: 'No' },
  { question: 'Confirm training use and opt-out settings and contractual commitments.', evidence: 'Request terms of service and data processing agreement.', verified: 'No' },
  { question: 'Confirm model provider terms align with your requirements.', evidence: 'Request model provider agreement and terms review.', verified: 'No' },
];

export const FRAMEWORK_MAPPINGS = [
  { framework: 'GDPR', controls: 'Art. 28, 32, 33, 44-49' },
  { framework: 'UK GDPR', controls: 'International transfer provisions, SCCs, UK IDTA' },
  { framework: 'DPDPA (India)', controls: 's.8 (reasonable security safeguards), cross-border transfer rules' },
  { framework: 'ISO 27001:2022', controls: 'A.5.12, A.5.14, A.8.10, A.8.11, A.8.24' },
  { framework: 'ISO 27701', controls: 'Controller and processor requirements, PII protection' },
  { framework: 'ISO/IEC 42001', controls: 'A.7 (data for AI systems), Annex A AI controls' },
  { framework: 'SOC 2', controls: 'CC6.1, CC6.6, CC6.7, CC7.2, C1.1, P-series, CC9.2' },
  { framework: 'NIST AI RMF', controls: 'MAP, MEASURE, MANAGE functions' },
  { framework: 'NIST AI 600-1', controls: 'AI risk management guidance' },
  { framework: 'OWASP Top 10 for LLM', controls: 'LLM01-LLM10' },
  { framework: 'MITRE ATLAS', controls: 'AI threat framework' },
];

export const ROADMAP = [
  { size: 'Small (1-50)', label: '30/60/90 days', items: ['Draft and review customer DPA template', 'Map AI agent data flows for in-scope products', 'Build security questionnaire answer library', 'Document AI control claims with evidence links', 'Define retention and training-use positions'] },
  { size: 'Medium (51-500)', label: '2 quarters', items: ['Formalize DPA review workflow with Legal', 'Implement data flow review in change management', 'Establish questionnaire review cadence', 'Conduct AI assurance self-assessment', 'Track vendor AI terms across procurement'] },
  { size: 'Large (500+)', label: '12 months', items: ['Centralize AI vendor assurance program', 'Automate data flow and DPA tracking', 'Integrate AI controls into SOC 2 and ISO audits', 'Establish AI governance committee', 'Publish AI transparency documentation'] },
];

export const MATURITY_LEVELS = [
  { level: 1, name: 'Ad hoc', desc: 'No formal AI vendor assurance process; answers improvised per request.' },
  { level: 2, name: 'Reactive', desc: 'DPA reviews happen but are inconsistent; no data flow documentation.' },
  { level: 3, name: 'Defined', desc: 'Documented DPA review, data flow maps and questionnaire answer library.' },
  { level: 4, name: 'Managed', desc: 'AI-specific assurance checklist completed; metrics tracked; governance in place.' },
  { level: 5, name: 'Optimized', desc: 'Continuous monitoring; AI controls integrated into audits and procurement.' },
];

export const GAP_ROWS = [
  { observation: 'DPA scope does not match actual processing', pushback: '"The DPA covers everything"', response: 'Request a processing activity inventory and compare to DPA scope.' },
  { observation: 'No sub-processor notification process', pushback: '"We will notify if asked"', response: 'Require prior written notice with defined objection window.' },
  { observation: 'Incident notification lacks fixed timeline', pushback: '"Without undue delay is standard"', response: 'Flag the gap and request a specific notification commitment.' },
  { observation: 'Data flow undocumented for AI features', pushback: '"It is in the architecture docs"', response: 'Request a data flow diagram with trust boundaries marked.' },
  { observation: 'Questionnaire answers unverified', pushback: '"The security team reviewed it"', response: 'Require evidence links and last-verified dates per answer.' },
  { observation: 'AI controls claimed without evidence', pushback: '"We have those features"', response: 'Treat each item as a claim to verify; request test results or configuration evidence.' },
  { observation: 'No retention or training-use position', pushback: '"We do not retain data"', response: 'Request written retention policy and training-use terms.' },
];

export const AUDIT_EVIDENCE = {
  evidence: [
    'Customer DPA template and review checklist',
    'Controller/processor role determination records',
    'AI agent data flow diagrams with trust boundaries',
    'Data type inventory with access and retention details',
    'Security questionnaire answer library with owners and last-verified dates',
    'AI assurance checklist with evidence links',
    'Regulatory applicability assessment',
    'Vendor AI terms review documentation',
  ],
};

export const SECTION1_BULLETS = [
  'Step 1: Determine controller, processor or sub-processor role for each processing activity, not per contract.',
  'Step 2: Review scope and subject matter, documented instructions, data categories and data subjects.',
  'Step 3: Review security measures, sub-processor list with notice and objection rights.',
  'Step 4: Review assistance with data subject rights, incident notification timeline.',
  'Step 5: Review deletion or return at termination, international transfers, audit rights, liability caps.',
];

export const SECTION1_REDFLAGS = [
  'DPA scope broader than actual processing activities.',
  'No documented instructions or vague processing descriptions.',
  'Sub-processor changes without notice.',
  'Incident notification only "without undue delay" with no fixed commitment.',
  'No deletion or return certification at termination.',
  'Audit rights limited to report reliance with no fallback.',
];

export const SECTION2_BULLETS = [
  'Map every data type an AI agent touches and who can access it.',
  'Include prompts, source code, uploaded files, secrets, outputs, tool calls, execution environments, logs, model providers and sub-processors.',
  'Document storage location, retention, access, justification, encryption, training use and evidence source for each data type.',
  'Mark trust boundaries in the data flow diagram.',
];

export const SECTION2_REDFLAGS = [
  'No data flow documentation for AI features.',
  'Unclear retention periods for prompts and outputs.',
  'Model provider access not documented.',
  'No encryption details for data in transit or at rest.',
  'Training use not addressed contractually.',
];

export const SECTION3_BULLETS = [
  'Answer statuses: Implemented, Partially implemented, Planned (with target date), Not applicable (with reason).',
  'Never mark planned work as implemented.',
  'Base answers on product documentation and verified evidence.',
  'State scope: which product, environment and region.',
  'State exceptions explicitly.',
  'Route each question to the named control owner instead of guessing.',
  'Keep an answer library with last-verified date and owner.',
];

export const SECTION3_REDFLAGS = [
  'Answering for the whole company when only one product is in scope.',
  'Citing a SOC 2 report whose period has lapsed.',
  'Copying old answers without re-verifying.',
  'Marking planned work as implemented.',
];

export const SECTION4_BULLETS = [
  'Permissions and least privilege for agents.',
  'Tenant separation.',
  'Execution boundaries and sandbox isolation.',
  'Human approval before high-impact actions.',
  'Prompt injection defenses (direct and indirect through files, web pages and tool output).',
  'Sensitive data and secret exposure in outputs and logs.',
  'Data retention for prompts and outputs.',
  'Training use and opt-out (default setting, contractual commitment).',
  'Model provider terms.',
];

export const SECTION4_REDFLAGS = [
  'Controls claimed without supporting evidence.',
  'No sandbox isolation documentation.',
  'No prompt injection testing results.',
  'Unclear training-use terms.',
  'No human approval workflow for high-impact actions.',
];

export const SECTION5_BULLETS = [
  'Identify which AI regulations apply based on facts: jurisdiction, data types, use case, risk level.',
  'Map applicable rules to existing controls and identify gaps.',
  'Document the applicability assessment with rationale.',
  'Review regulatory changes on a defined cadence.',
  'Engage Legal and Compliance for jurisdiction-specific requirements.',
];

export const SECTION5_REDFLAGS = [
  'Assuming all AI regulations apply without assessment.',
  'No documented applicability rationale.',
  'No process to track regulatory changes.',
  'Conflating AI governance with general data protection.',
];
