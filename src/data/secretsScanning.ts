// Secrets Scanning module data
// Single source of truth for all Secrets Scanning content

export interface SecretType {
  name: string;
  desc: string;
}

export interface LeakSurface {
  surface: string;
  leak: string;
  missed: string;
}

export interface ControlPoint {
  layer: string;
  purpose: string;
  tooling: string;
}

export interface ToolRow {
  tool: string;
  type: string;
  strengths: string;
  watchouts: string;
}

export interface FrameworkMapping {
  framework: string;
  controls: string;
  note?: string;
}

export interface RoadmapCard {
  size: string;
  label: string;
  items: string[];
}

export interface GapRow {
  observation: string;
  pushback: string;
  response: string;
}

export interface TriageQuestion {
  id: string;
  label: string;
}

export const SECRET_TYPES: SecretType[] = [
  { name: 'Cloud access keys', desc: 'AWS, Azure, GCP long-lived credentials.' },
  { name: 'API keys', desc: 'Third-party service keys (Stripe, Twilio, etc.).' },
  { name: 'OAuth client secrets', desc: 'Confidential client credentials.' },
  { name: 'DB connection strings', desc: 'Passwords embedded in connection URIs.' },
  { name: 'Private keys', desc: 'SSH, TLS, PGP, JWT signing keys.' },
  { name: 'Webhook URLs', desc: 'Slack, Discord, CI trigger URLs with tokens.' },
  { name: 'Session tokens', desc: 'Bearer tokens, refresh tokens, JWTs.' },
  { name: 'Service account files', desc: 'JSON/P12 key files for cloud service accounts.' },
  { name: 'Passwords', desc: 'Hardcoded database or admin passwords.' },
];

export const LEAK_SURFACES: LeakSurface[] = [
  { surface: 'Git working tree', leak: '.env, config.yaml, hardcoded keys', missed: 'Developer convenience, "temporary" test code' },
  { surface: 'Git history', leak: 'Key removed in a later commit but still in history', missed: 'Deleting a file does not remove it from history' },
  { surface: 'CI/CD', leak: 'Secrets echoed in build logs, set as plain env vars', missed: 'Debug output, set -x' },
  { surface: 'Containers / IaC', leak: 'Keys baked into Docker layers, Terraform state, Helm values', missed: 'Layers and state files are rarely reviewed' },
  { surface: 'Collaboration tools', leak: 'Tokens pasted in Slack, Jira, Confluence, Notion', missed: 'Outside the code security program' },
  { surface: 'Client-side code', leak: 'Keys in frontend JS bundles, mobile apps', missed: '"It is only a publishable key" assumptions' },
  { surface: 'AI tools and prompts', leak: 'Secrets pasted into ChatGPT, Copilot context, prompt logs', missed: 'GenAI DLP gaps; prompts are stored by vendors' },
  { surface: 'Package registries', leak: 'Secrets inside published npm/PyPI packages', missed: 'Build artifacts include .env' },
];

export const CONTROL_POINTS: ControlPoint[] = [
  { layer: 'IDE', purpose: 'Earliest feedback', tooling: 'GitGuardian / Snyk / Gitleaks IDE plugins' },
  { layer: 'Pre-commit hook', purpose: 'Block before it enters history', tooling: 'Gitleaks, detect-secrets, TruffleHog via pre-commit' },
  { layer: 'Server-side push protection', purpose: 'Block at the remote even if hooks bypassed', tooling: 'GitHub Push Protection, GitLab Secret Push Protection' },
  { layer: 'CI pipeline', purpose: 'Gate PRs and merges', tooling: 'Gitleaks/TruffleHog GitHub Action, GitGuardian ggshield' },
  { layer: 'Full history / org-wide scan', purpose: 'Find existing debt', tooling: 'TruffleHog, GitGuardian, GitHub Secret Scanning' },
  { layer: 'Runtime / non-code', purpose: 'Slack, Jira, Confluence, S3, container registries', tooling: 'GitGuardian, Nightfall, TruffleHog sources, cloud DLP' },
  { layer: 'Public monitoring', purpose: 'Detect employee leaks on public GitHub', tooling: 'GitGuardian Public Monitoring, partner programs' },
];

export const TOOLS: ToolRow[] = [
  { tool: 'Gitleaks', type: 'OSS', strengths: 'Fast, simple TOML rules, great for pre-commit and CI', watchouts: 'No native validation' },
  { tool: 'TruffleHog (OSS)', type: 'OSS', strengths: '700+ detectors, live verification, many sources (S3, Docker, Slack)', watchouts: 'Verification calls need governance' },
  { tool: 'detect-secrets (Yelp)', type: 'OSS', strengths: 'Baseline file model, low noise', watchouts: 'Fewer detectors' },
  { tool: 'GitHub Secret Scanning + Push Protection', type: 'Platform', strengths: 'Native, partner revocation program, free for public repos', watchouts: 'Private repos need GitHub Advanced Security / Secret Protection licensing' },
  { tool: 'GitLab Secret Detection', type: 'Platform', strengths: 'Native pipeline template', watchouts: 'Feature depth depends on tier' },
  { tool: 'GitGuardian', type: 'Commercial', strengths: 'Broad coverage, incident workflow, public monitoring', watchouts: 'Cost per developer' },
  { tool: 'Others (Snyk, Wiz, Nightfall, Cycode, Aikido)', type: 'Commercial', strengths: 'Part of broader platforms', watchouts: 'Overlap with existing tools' },
];

export const FRAMEWORK_MAPPINGS: FrameworkMapping[] = [
  { framework: 'SOC 2 (2017 TSC)', controls: 'CC6.1, CC6.6, CC6.7, CC7.1, CC7.2, CC7.3, CC7.4, CC8.1' },
  { framework: 'ISO 27001:2022', controls: 'A.5.17, A.5.26, A.8.4, A.8.9, A.8.12, A.8.24, A.8.25, A.8.26, A.8.27, A.8.28' },
  { framework: 'ISO/IEC 42001', controls: 'AI system lifecycle and data security controls (supporting)' },
  { framework: 'NIST CSF 2.0', controls: 'PR.AA, PR.DS, DE.CM, RS.MI' },
  { framework: 'NIST 800-53 r5', controls: 'IA-5, SC-12, SA-11, CM-6, SI-4' },
  { framework: 'NIST SSDF (800-218)', controls: 'PS.1, PW.7, PW.8' },
  { framework: 'PCI DSS v4.0', controls: '3.6, 3.7, 6.2.4, 8.3, 8.6.2' },
  { framework: 'HIPAA', controls: '164.308(a)(1)(ii)(D), 164.312(a)(1), 164.312(d)' },
  { framework: 'CIS v8', controls: 'Control 3, Control 16' },
  { framework: 'GDPR', controls: 'Art. 32, Art. 33' },
  { framework: 'DPDP Act (India)', controls: 'Reasonable security safeguards, breach intimation' },
  { framework: 'FedRAMP', controls: 'Inherits NIST 800-53 IA-5, SC-12' },
];

export const ROADMAP: RoadmapCard[] = [
  { size: 'Small (1-50)', label: '30/60/90 days', items: ['Gitleaks pre-commit', 'GitHub push protection', 'CI action', 'One secrets manager', 'One-time history scan', 'Simple runbook'] },
  { size: 'Medium (51-500)', label: '2 quarters', items: ['Org-wide enforcement', 'Verified findings tool', 'Ticketing integration', 'SLAs', 'Leadership metrics', 'Slack/Jira scanning'] },
  { size: 'Large (500+)', label: '12 months', items: ['Central platform', 'Public monitoring', 'Automated revocation', 'OIDC/workload identity migration', 'TPRM and M&A due diligence'] },
];

export const MATURITY_LEVELS = [
  { level: 1, name: 'Ad hoc', desc: 'No scanning; leaks found by accident or by attackers' },
  { level: 2, name: 'Reactive', desc: 'Occasional manual scans; no SLA' },
  { level: 3, name: 'Defined', desc: 'CI scanning on all repos, policy, rotation SLAs' },
  { level: 4, name: 'Managed', desc: 'Push protection org-wide, verified findings, metrics, non-code sources' },
  { level: 5, name: 'Optimized', desc: 'Short-lived credentials (OIDC, workload identity) so most static secrets no longer exist' },
];

export const GAP_ROWS: GapRow[] = [
  { observation: 'Pre-commit hooks only, no server-side control', pushback: '"All devs have the hook"', response: 'Hooks are bypassable; enable push protection or CI gate' },
  { observation: 'Secret removed from code but not rotated', pushback: '"It was a private repo"', response: 'Private repos leak; rotation evidence required' },
  { observation: 'No coverage of git history', pushback: '"We scan new commits"', response: 'Run a one-time full history scan and track debt' },
  { observation: 'Findings closed without evidence', pushback: '"We fixed it"', response: 'Require rotation timestamp or provider log' },
  { observation: 'Allowlist growing without review', pushback: '"Those are test keys"', response: 'Time-bound exceptions with quarterly review' },
  { observation: 'Secrets in CI variables unmasked', pushback: '"Only admins see logs"', response: 'Mask variables, use OIDC federation instead of static keys' },
  { observation: 'No scanning outside code', pushback: '"Slack is not in scope"', response: 'It is if tokens are shared there; extend scope or add DLP' },
];

export const SLA_ROWS = [
  { severity: 'Critical', example: 'Verified live cloud admin key, prod DB credentials, public repo exposure', sla: '4 hours' },
  { severity: 'High', example: 'Live third-party API key with write access, private repo', sla: '24 hours' },
  { severity: 'Medium', example: 'Unverified key, test environment credential', sla: '7 days' },
  { severity: 'Low', example: 'Revoked/expired, false positive pending confirmation', sla: '30 days (triage)' },
];

export const REMEDIATION_STEPS = [
  { step: 1, title: 'Revoke / rotate', desc: 'Revoke or rotate the secret at the provider immediately. Assume compromise.' },
  { step: 2, title: 'Investigate logs', desc: 'Check CloudTrail, provider audit logs, access logs for the exposure window.' },
  { step: 3, title: 'Replace with secrets manager', desc: 'Replace with a reference to a secrets manager (Vault, AWS Secrets Manager, Azure Key Vault, GCP Secret Manager, Doppler, 1Password).' },
  { step: 4, title: 'Clean history if needed', desc: 'Use git filter-repo or BFG. Forks and clones keep copies, so this is hygiene, not containment.' },
  { step: 5, title: 'Close with root cause', desc: 'Document root cause and prevention: hook added, rule tuned, training completed.' },
];

export const REGEX_PATTERNS = `# Illustrative patterns (for documentation only)
AWS access key ID:     AKIA[0-9A-Z]{16}
GitHub tokens:         ghp_[A-Za-z0-9]{36} | gho_ | ghs_ | github_pat_
Slack:                 xoxb- | xoxp-
Stripe live key:       sk_live_ | rk_live_
Private key header:    -----BEGIN (RSA|EC|OPENSSH) PRIVATE KEY-----`;

export const METRICS = [
  'New secrets detected per month (trend, by repo/team)',
  '% blocked at push vs found after merge',
  'Mean time to revoke (MTTR) by severity',
  'Open findings past SLA',
  '% repos covered by push protection and CI scanning',
  'False positive rate',
];

export const GOVERNANCE_CARDS = [
  { title: 'Ownership', desc: 'AppSec owns tooling and rules; engineering teams own remediation; GRC owns policy, metrics and evidence.' },
  { title: 'Policy content', desc: 'No secrets in code or tickets; approved secrets managers; rotation periods; exception process; incident classification for exposed secrets.' },
  { title: 'Exceptions and allowlisting', desc: 'Documented, time-bound, reviewed quarterly. Baseline files must be reviewed in PRs.' },
  { title: 'Developer experience', desc: 'High false positive rates kill adoption. Start with high-precision provider rules, add entropy rules later, measure FP rate.' },
  { title: 'Third-party risk', desc: 'Ask vendors in TPRM questionnaires whether they scan for secrets, use push protection and have a rotation SLA.' },
  { title: 'Privacy and legal', desc: 'Scanning chat and tickets touches employee communications; cover it in acceptable use notices. Verification calls need an approved runbook.' },
  { title: 'AI and ISO 42001 angle', desc: 'Secrets in prompts, RAG corpora, agent tool configs and MCP server configs. AI coding assistants can autocomplete secrets seen in context.' },
];

export const AUDIT_EVIDENCE = {
  evidence: [
    'Secrets management policy and secure SDLC standard',
    'Tool configuration screenshots: push protection enabled at org level, CI job definitions',
    'Repo coverage report (all in-scope repos scanned)',
    'Sample of findings in the audit period with ticket, rotation proof and closure date',
    'Exception/allowlist register with approvals',
    'Metrics report reviewed by management',
    'Incident record for any critical exposure, including log review',
  ],
  maturity: [
    { level: 1, name: 'Ad hoc', desc: 'No scanning; leaks found by accident or by attackers' },
    { level: 2, name: 'Reactive', desc: 'Occasional manual scans; no SLA' },
    { level: 3, name: 'Defined', desc: 'CI scanning on all repos, policy, rotation SLAs' },
    { level: 4, name: 'Managed', desc: 'Push protection org-wide, verified findings, metrics, non-code sources' },
    { level: 5, name: 'Optimized', desc: 'Short-lived credentials (OIDC, workload identity) so most static secrets no longer exist' },
  ],
};

export const ASSESSMENT_QUESTIONS = [
  { id: 'q1', label: 'Push protection enabled at org level' },
  { id: 'q2', label: 'CI scanning on all repos' },
  { id: 'q3', label: 'Git history scanned at least once' },
  { id: 'q4', label: 'Secrets manager adopted' },
  { id: 'q5', label: 'Rotation SLAs defined' },
  { id: 'q6', label: 'Findings verified (liveness checks)' },
  { id: 'q7', label: 'Non-code sources scanned (Slack, Jira)' },
  { id: 'q8', label: 'Exception register reviewed quarterly' },
  { id: 'q9', label: 'Metrics reported to leadership' },
  { id: 'q10', label: 'OIDC used for CI to cloud' },
];

export const TRIAGE_OPTIONS = {
  secretType: ['API key', 'Cloud access key', 'Database credential', 'Private key', 'OAuth secret', 'Webhook URL', 'Session token', 'Service account file', 'Password'],
  repoVisibility: ['Public', 'Private'],
  verifiedLive: ['Yes', 'No', 'Unknown'],
  environment: ['Production', 'Non-production'],
  privilege: ['Admin', 'Write', 'Read'],
};
