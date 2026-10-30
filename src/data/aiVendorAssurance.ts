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

// ---------------------------------------------------------------------------
// Worked example: AI coding (vibe coding) platform, production on GCP and AWS
// with Kubernetes and object storage buckets. Every cell describes a typical
// design to VERIFY against your own platform, not a claim to copy.
// ---------------------------------------------------------------------------

export interface RoleRow { activity: string; role: string; why: string; document: string; }

export const PLATFORM_ROLES: RoleRow[] = [
  { activity: 'Customer account, sign-in, billing and support contacts', role: 'Controller', why: 'The platform decides why and how this data is used to run its own business.', document: 'Privacy notice and terms of service (not the DPA).' },
  { activity: 'Prompts, uploaded files, source code, repositories and generated code', role: 'Processor', why: 'The customer decides what to build and what content to submit; the platform acts on their instructions.', document: 'Customer DPA: scope, instructions, data categories, security measures.' },
  { activity: 'Personal data of end users inside apps customers build and host on the platform', role: 'Processor (sub-processor if the customer is itself a processor)', why: 'The customer controls the app, its users and its purposes.', document: 'Customer DPA and published sub-processor list.' },
  { activity: 'Security, abuse and fraud monitoring of platform usage', role: 'Controller for this purpose', why: 'The platform decides to monitor to protect the service (legitimate interests).', document: 'Stated as a permitted purpose in the DPA and privacy notice.' },
  { activity: 'Product improvement or model training using customer content', role: 'Controller for this purpose, only if contractually permitted', why: 'Using content for the platform\'s own purposes makes it a controller for that use.', document: 'Explicit training position in DPA and terms (default off, opt-in, or opt-out); without it, do not use the content.' },
  { activity: 'LLM model providers, GCP, AWS, logging and email providers', role: 'Sub-processors', why: 'They process customer data on the platform\'s behalf.', document: 'Sub-processor list with notice and objection process; flow-down terms.' },
];

export const PLATFORM_DATA_FLOWS: DataFlowRow[] = [
  { dataType: 'Prompts and user input', stored: 'Application database (Cloud SQL / RDS) and conversation store, partitioned by workspace', retention: 'Life of the project; deleted within [30] days of project or account deletion', access: 'Workspace members; agent service scoped to the workspace; support only through time-limited, customer-approved, logged access', why: 'Show history and give the agent context', encryption: 'TLS 1.2+; KMS-managed keys at rest', training: 'State the default and the contractual position (e.g. not used for training on business plans)', evidence: 'Data model, retention job config, support access log' },
  { dataType: 'Source code and repositories', stored: 'Object storage per project prefix (GCS / S3) or managed Git, private', retention: 'Life of the project; versioned; deleted on project deletion plus backup expiry', access: 'Workspace members; build and agent service accounts scoped to the project', why: 'Edit, build and run the customer app', encryption: 'TLS 1.2+; bucket encryption with KMS', training: 'State the contractual position', evidence: 'Bucket IAM and conditions, lifecycle rules' },
  { dataType: 'Uploaded files', stored: 'Object storage with per-tenant prefix; short-lived signed URLs', retention: 'Life of the project', access: 'Workspace members; agent in that workspace', why: 'Provide context or assets for the app', encryption: 'TLS 1.2+; KMS at rest', training: 'State the contractual position', evidence: 'Bucket policy, signed URL expiry setting, malware scanning config' },
  { dataType: 'Secrets and credentials (customer API keys, env vars)', stored: 'Secret Manager / AWS Secrets Manager or KMS-encrypted Kubernetes secrets', retention: 'Until deleted by the customer or project deletion', access: 'Injected only into that tenant\'s runtime; no plaintext staff access; never sent to the model provider', why: 'Let the generated app call external services', encryption: 'TLS 1.2+; envelope encryption with KMS', training: 'Never', evidence: 'Secret store IAM, log redaction tests, prompt construction code review' },
  { dataType: 'Generated outputs and code', stored: 'Same store as source code; built images in a private container registry', retention: 'Life of the project', access: 'Workspace members; deploy pipeline', why: 'Deliver and deploy the app', encryption: 'TLS 1.2+; KMS at rest', training: 'State the contractual position', evidence: 'Registry permissions, image scanning config' },
  { dataType: 'Tool calls and third-party API actions', stored: 'Action metadata in audit log; payloads not stored by default', retention: 'Audit log [1 year]', access: 'Workspace admins (own actions); security team', why: 'Accountability and incident investigation', encryption: 'TLS 1.2+ through an egress proxy', training: 'No', evidence: 'Egress proxy allowlist, OAuth scopes per integration, audit log sample' },
  { dataType: 'Execution environments and sandboxes', stored: 'Ephemeral sandboxed pods (GKE Sandbox / gVisor, Kata or microVMs) on dedicated node pools', retention: 'Destroyed at session end or idle timeout', access: 'Only the owning workspace session; no shell access for staff without break-glass', why: 'Run and preview generated code safely', encryption: 'Encrypted node disks; TLS for traffic', training: 'No', evidence: 'Node pool sandbox config, network policies, pod security admission, isolation test results' },
  { dataType: 'Logs and telemetry', stored: 'Cloud Logging / CloudWatch, central log project or account', retention: 'Application logs [30 to 90] days; audit logs [1 year]', access: 'On-call engineers and security, least privilege', why: 'Operate, debug and investigate incidents', encryption: 'TLS 1.2+; provider-managed or KMS at rest', training: 'No', evidence: 'Redaction rules for prompts, code and secrets; log IAM; retention settings' },
  { dataType: 'Model providers (LLM APIs)', stored: 'Provider side, under API terms (zero or limited retention where contracted)', retention: 'Per provider terms, e.g. none or [30] days for abuse monitoring', access: 'Provider systems under contract', why: 'Generate code and responses', encryption: 'TLS 1.2+', training: 'Contractually no training on API data; verify in terms', evidence: 'Model provider DPA, zero-data-retention confirmation, region settings' },
  { dataType: 'Other sub-processors', stored: 'GCP, AWS, email, error tracking, analytics, payments', retention: 'Per contract', access: 'Per contract', why: 'Hosting and supporting services', encryption: 'Per provider; verify', training: 'No', evidence: 'Sub-processor list, DPAs, SOC 2 / ISO reports reviewed' },
];

export interface IsolationRow { control: string; verify: string; evidence: string; }

export const PLATFORM_ISOLATION_CHECKS: IsolationRow[] = [
  { control: 'Tenant separation in Kubernetes', verify: 'Namespace per tenant or per session; Kubernetes RBAC denies cross-namespace access; no shared service accounts. Test with kubectl auth can-i --as=SERVICE_ACCOUNT across namespaces.', evidence: 'Namespace and RBAC config; cross-tenant access test result' },
  { control: 'Sandboxed runtime for untrusted code', verify: 'Generated code runs under a sandbox runtime (GKE Sandbox / gVisor, Kata or microVMs) on a dedicated, tainted node pool, never on system nodes.', evidence: 'gcloud container node-pools describe (sandboxConfig) or EKS node group config; pod runtimeClassName' },
  { control: 'Network boundaries', verify: 'Default-deny NetworkPolicies; egress only through a proxy with an allowlist; no access to internal services or other tenants.', evidence: 'kubectl get networkpolicy -A; egress proxy rules; blocked-request test' },
  { control: 'Cloud credential exposure', verify: 'Metadata server blocked from sandboxes; Workload Identity (GKE) or IRSA / Pod Identity (EKS) scoped per service; IMDSv2 with hop limit 1.', evidence: 'Node metadata config; IAM bindings per workload' },
  { control: 'Storage bucket isolation', verify: 'Per-tenant prefixes with IAM conditions or per-tenant buckets; uniform bucket-level access; public access prevention; short-lived signed URLs.', evidence: 'Bucket IAM policy, public access settings, signed URL TTL' },
  { control: 'Permissions and least privilege for agents', verify: 'Agent tools scoped per workspace; OAuth scopes minimal; no standing admin credentials in sandboxes.', evidence: 'Tool permission matrix; OAuth scope list' },
  { control: 'Human approval before high-impact actions', verify: 'Approval required before production deploys, data deletion, external messages, spending or permission changes.', evidence: 'Approval workflow screenshots; audit log of approvals' },
  { control: 'Prompt injection (direct and indirect)', verify: 'Untrusted content from repos, files, web pages and tool output is treated as data; tool calls constrained; outputs checked before action.', evidence: 'Red-team or test results against OWASP LLM01; defense design doc' },
  { control: 'Sensitive data and secret exposure', verify: 'Secrets and personal data redacted from logs and not included in prompts sent to model providers; output scanning for secrets.', evidence: 'Redaction tests; secret scanning results' },
  { control: 'Resource limits and abuse', verify: 'CPU, memory and time limits per sandbox; rate limits per workspace.', evidence: 'ResourceQuota / LimitRange config; rate limit settings' },
  { control: 'Retention and training use', verify: 'Retention matches what the DPA and questionnaires say; model provider zero-retention or no-training terms in place.', evidence: 'Retention configs; provider terms; DPA training clause' },
];

export const PLATFORM_EVIDENCE_TO_PROVIDE: string[] = [
  'Provide the agent permission model and IAM policies with a dated review.',
  'Provide the tenant isolation architecture and a cross-tenant access test result.',
  'Provide sandbox configuration and isolation test results.',
  'Provide the approval workflow and a sample of approval audit logs.',
  'Provide prompt injection test results covering files, web pages and tool output.',
  'Provide log redaction and secret scanning configuration with test results.',
  'Provide the retention policy and the configuration that enforces it.',
  'Provide the training-use position in the DPA and terms, and the default setting.',
  'Provide model provider terms showing retention and training commitments.',
];

export interface GovStep { step: string; detail: string; example: string; }

export const GOVERNANCE_STEPS: GovStep[] = [
  { step: '1. Describe the intended purpose', detail: 'What the system is for, who uses it, in what context, and what its outputs are used for. Classification follows intended purpose, not the technology.', example: 'An AI coding platform that generates, runs and deploys software for developers and business users.' },
  { step: '2. Determine your role for each AI system', detail: 'Under the EU AI Act: provider (develops or has it developed and places it on the market under its own name), deployer (uses it under its authority), importer or distributor. Separately, identify any general-purpose AI (GPAI) model providers you rely on.', example: 'Likely provider of the platform as an AI system; downstream user of third-party GPAI models; customers are deployers of the platform and may become providers of the apps they build.' },
  { step: '3. Screen for prohibited practices', detail: 'Check the intended purpose against Art. 5 prohibited practices and document the result.', example: 'Code generation is not a prohibited practice; record the screening.' },
  { step: '4. Check high-risk classification', detail: 'High-risk only if the system is a safety component under Annex I or its intended purpose falls in an Annex III area (e.g. employment, credit, education), subject to the Art. 6(3) exceptions.', example: 'A general coding platform is not listed in Annex III by itself. If a customer builds an app for an Annex III use, obligations fall on that customer as provider of that app; consider contract terms and acceptable use.' },
  { step: '5. Check transparency obligations', detail: 'Art. 50 duties such as informing people they are interacting with AI and marking synthetic content where applicable.', example: 'Confirm whether any chat interface or generated media needs disclosure or marking.' },
  { step: '6. Map GPAI obligations', detail: 'GPAI model obligations sit with the model provider. As a downstream provider, obtain the model documentation you need to meet your own obligations.', example: 'Request model documentation and usage policies from each LLM provider.' },
  { step: '7. Check other applicable rules', detail: 'GDPR (including Art. 22 automated decisions), US state AI laws, sector rules and customer contract requirements, based on markets and data processed.', example: 'Record jurisdictions where customers and end users are located.' },
  { step: '8. Document and review', detail: 'Record the assessment with rationale, owner and review date. Re-run it when the intended purpose, markets or role change, and when rules change.', example: 'Use the AI Regulatory Applicability Assessment template.' },
];

export const GOVERNANCE_RULE = 'Using AI does not by itself make a system high-risk or subject to specific obligations. Start from the intended purpose and your role, then derive the obligations. Confirm the conclusion with Legal; this guidance is not legal advice.';
