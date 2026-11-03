// Engineering & Infrastructure Partnership. Generic guidance for GRC and
// security teams working with engineers. Tool names are examples only.
// Framework references are limited to ones verified against the source text:
// SOC 2 (2017 TSC, revised points of focus 2022) and ISO/IEC 27001:2022 Annex A.
// Anything not verified is left unmapped.

export const ENG_PRINCIPLE = [
  ['Understand', 'Learn how the system is built and deployed before writing a requirement.'],
  ['Agree the risk', 'Write the risk in the engineers\' terms and agree it is real.'],
  ['Build it in', 'Put the control in the normal workflow: the pipeline, the IdP, the platform.'],
  ['Verify', 'Check design once and operation over the period, from system evidence.'],
  ['Expose exceptions', 'Make exceptions visible, owned, approved and time-limited.'],
];

export const ENG_SECTIONS = [
  { id: 'eng-control-delivery', label: 'Control delivery' },
  { id: 'eng-access', label: 'Access and identity' },
  { id: 'eng-logging', label: 'Logging and audit trails' },
  { id: 'eng-change', label: 'Change management' },
  { id: 'eng-cicd', label: 'CI/CD controls' },
  { id: 'eng-agent-exec', label: 'Cloud and agent execution' },
  { id: 'eng-scenarios', label: 'Walkthrough scenarios' },
];

// Each section carries owner, evidence source and exception path (acceptance check).
export const SECTION_META = {
  'eng-control-delivery': { owner: 'GRC lead (control owner); engineering lead (implementation owner)', evidence: 'Ticket, merged PR and system export named on the card', exception: 'Exception ticket approved by the control owner and system owner, with expiry of no more than 90 days' },
  'eng-access': { owner: 'System owner for each system; IdP administrator for the directory', evidence: 'IdP and system account exports, review sign-off, removal tickets', exception: 'Exception register entry approved by the system owner and security, with expiry and compensating control' },
  'eng-logging': { owner: 'Platform or SRE lead for pipelines; security operations for alerting', evidence: 'Log source inventory, SIEM configuration export, sample events', exception: 'Logged gap with risk acceptance by the system owner and security, and a fix date' },
  'eng-change': { owner: 'Engineering manager per service; change approver role for normal changes', evidence: 'PR history, branch protection settings, deployment log', exception: 'Emergency change path with retrospective review within 2 business days' },
  'eng-cicd': { owner: 'Platform or DevOps lead', evidence: 'Pipeline configuration in version control, run logs, signing and SBOM records', exception: 'Pipeline bypass recorded as an emergency change, reviewed by the platform lead' },
  'eng-agent-exec': { owner: 'Platform lead with the AI risk owner', evidence: 'Agent identity and permission export, sandbox configuration, action logs', exception: 'Expanded permission granted per task by ticket, with expiry and logging' },
  'eng-scenarios': { owner: 'As stated in each scenario', evidence: 'As stated in each scenario', exception: 'As stated in each scenario' },
};

/* 1. Control delivery */
export const CARD_FIELDS = [
  ['Risk statement', 'Because of [cause], [event] could happen, leading to [impact on customers, data or service].'],
  ['Control owner', 'Accountable for the control working over time (usually GRC or the system owner).'],
  ['Implementation owner', 'Builds and maintains it (an engineering team or person by role).'],
  ['Engineering task', 'The ticket in the team\'s own backlog, in their language.'],
  ['Acceptance criteria', 'Testable statements that say when the task is done.'],
  ['Evidence source', 'The system that produces proof without screenshots where possible.'],
  ['Evidence frequency', 'Continuous, per event, or per period, matched to the risk.'],
  ['Exception path', 'Who approves, where it is recorded, and when it expires.'],
  ['Friction assessment', 'Added steps, delay or toil for engineers, and how it is reduced.'],
  ['Automation decision', 'Automate, semi-automate or keep manual, with the reason.'],
];

export const CARD_EXAMPLES = [
  {
    title: 'Production database access',
    risk: 'Because engineers hold standing read access to the production database, customer data could be viewed without a business need, leading to a confidentiality breach.',
    controlOwner: 'Head of Security',
    implOwner: 'Platform team lead',
    task: 'Move production database access to just-in-time grants through the access broker; remove standing grants.',
    criteria: ['No user holds standing read or write access to production databases', 'Access is granted per request with a ticket reference and expires within 8 hours', 'Every session is logged with user, ticket, start and end time'],
    evidence: 'Access broker grant log and IdP group membership export',
    frequency: 'Continuous log; monthly review of grants against tickets',
    exception: 'Break-glass account for incidents, approved by the on-call lead, reviewed within 2 business days',
    friction: 'Request takes under 2 minutes from chat; approval auto-granted for on-call engineers during an incident',
    automation: 'Automate: grant expiry and logging are built into the broker',
  },
  {
    title: 'Secrets in source code',
    risk: 'Because developers can commit credentials to repositories, secrets could be exposed to anyone with repository access or in a leak, leading to account compromise.',
    controlOwner: 'AppSec lead',
    implOwner: 'Developer experience team',
    task: 'Enable secret scanning with push protection on all repositories; route findings to the owning team.',
    criteria: ['Push protection on for every repository in the organisation', 'Detected secrets are revoked and rotated within 24 hours', 'Bypass requires a reason that is logged'],
    evidence: 'Repository security settings export and secret scanning alert history',
    frequency: 'Continuous; quarterly coverage check',
    exception: 'Test fixtures marked as false positives by the AppSec lead',
    friction: 'Blocks only on a likely secret; false-positive bypass takes one click with a reason',
    automation: 'Automate: settings enforced at organisation level',
  },
];

export const TICKET_TEXT = `Title: Replace standing production DB access with just-in-time grants

Why
Standing read access to production databases lets customer data be viewed without a business need. We want access only when there is a ticket, for a limited time, with a record.

Task
- Configure the access broker for the production database clusters
- Remove standing grants from engineer groups
- Add an on-call fast path during declared incidents

Acceptance criteria
- No user has standing access to production databases (IdP export attached)
- Grants need a ticket reference and expire within 8 hours
- Every session is logged with user, ticket, start and end time

Evidence
- Access broker grant log (system export, monthly)
- IdP group membership export

Exception path
- Break-glass account for incidents, approved by the on-call lead, reviewed within 2 business days

Owners
- Control owner: [Role]
- Implementation owner: [Team]`;

export const AUTOMATION_GUIDE = [
  ['Automate', 'High volume, rule-based, and the system already has the data (branch protection, MFA enforcement, log forwarding).'],
  ['Semi-automate', 'The system gathers data but a person judges it (access reviews with pre-filled owners and last-used dates).'],
  ['Keep manual', 'Rare, judgement-heavy events (annual architecture review, exception approval).'],
];

export const FRICTION_TIPS = [
  'Put the control where engineers already work: PR checks, chat approvals, the IdP.',
  'Make the safe path the fast path, for example pre-approved templates and paved roads.',
  'Measure the delay a control adds and set a target for it.',
  'Give a clear, logged bypass for real emergencies instead of a hard block with no way out.',
  'Retire controls that duplicate another control with better evidence.',
];

export const DESIGN_VS_OPERATING = [
  ['Design effectiveness', 'Would the control, as built, address the risk?', 'Walkthrough, configuration review, one sample', 'Once, and after a material change'],
  ['Operating effectiveness', 'Did it work every time over the period?', 'Samples across the period, system logs, exceptions', 'Over the audit or review period'],
];

export const BAD_GOOD = [
  ['Ensure access is appropriately restricted.', 'Production database access is granted only through the access broker, with a ticket, and expires within 8 hours.'],
  ['Logs must be retained.', 'Authentication and admin events from the IdP and cloud control plane reach the SIEM within 15 minutes and are kept per the retention tier for that log type.'],
  ['Changes should be reviewed.', 'The main branch requires one approving review from someone other than the author, and administrators cannot bypass it.'],
];

/* 2. Access reviews and identity */
export const IDENTITY_COLUMNS = ['Identity', 'Type', 'System', 'Owner', 'Purpose', 'Privilege level', 'Credential type', 'Last used', 'Review frequency', 'Removal evidence'];

export const IDENTITY_ROWS = [
  ['[Employee account]', 'Human', 'IdP and SaaS apps', 'Line manager', 'Day-to-day work', 'Standard', 'SSO with phishing-resistant MFA', 'From IdP sign-in log', 'Per the access review table', 'Leaver ticket and IdP deactivation log'],
  ['[Admin role]', 'Human, privileged', 'Cloud console', 'System owner', 'Infrastructure administration', 'Privileged, granted just in time', 'SSO, MFA, time-bound role', 'From cloud audit log', 'Per the access review table (privileged)', 'Role assignment removal log'],
  ['[Deploy role]', 'Workload', 'CI/CD to cloud', 'Platform team lead', 'Deploy builds', 'Scoped to deploy actions', 'OIDC federated token, no stored key', 'From cloud audit log', 'Per the access review table, and on pipeline change', 'Trust policy change in version control'],
  ['[Service account]', 'Service', 'Application to database', 'Service owner', 'App reads and writes its own schema', 'Least privilege on one schema', 'Secret in a secrets manager, rotated', 'From database audit log', 'Per the access review table', 'Account drop and secret deletion record'],
  ['[API key]', 'Integration', 'Third-party SaaS', 'Integration owner', 'Sync tickets', 'Read-only scope', 'API key in a secrets manager', 'From vendor audit log', 'Per the access review table', 'Key revocation in vendor console'],
  ['[AI agent]', 'Agent', 'Code repository and sandbox', 'Engineering manager', 'Open PRs, run tests', 'Cannot merge or reach production', 'Short-lived token per session', 'From repository audit log', 'Per the access review table, and on permission change', 'Token revocation and app uninstall record'],
  ['[Break-glass]', 'Emergency', 'Cloud and IdP', 'Head of Security', 'Recover from IdP or SSO failure', 'Full administrator', 'Hardware key, sealed credentials', 'Should be never; alert on any use', 'After each use and per the access review table', 'Credential rotation after use'],
];

export const ACCESS_POINTS = [
  { h: 'Every identity has a named owner', b: 'Owners are roles that a person holds. When the owner of a service identity leaves, the leaver checklist reassigns ownership to the team lead before the account is closed. Identities with no owner after 30 days are disabled, not deleted, until someone claims them.' },
  { h: 'Least privilege, JIT and break-glass', b: 'Standing access is the exception. Privileged roles are granted just in time with a ticket and an expiry. Break-glass accounts are few, monitored, alert on use, and have their credentials rotated after every use.' },
  { h: 'Joiner, mover and leaver', b: 'Driven by HR events into the IdP. Movers lose old access when they gain new access, not at the next review. Leavers are disabled in the IdP on the last day, and access in systems outside SSO is removed by ticket.' },
  { h: 'Risk-based frequency', b: 'Review frequency follows the existing User Access Review table on the Persona & Access Governance tab, so this page does not set separate figures.' },
  { h: 'Prove removal', b: 'A review is complete only when the removals it found are done. Keep the ticket and the system log showing the account disabled or the role removed, with dates.' },
  { h: 'Population completeness', b: 'Reconcile three lists: HR (who works here), the IdP (who can sign in) and each system\'s own account list (who actually has access, including local and service accounts). Accounts in a system with no match in HR or the IdP are findings.' },
];

export const ACCESS_EXCEPTIONS = [
  ['Shared admin account still in use', 'Move to individual accounts; if not possible, vault the credential with check-out logging'],
  ['Local accounts outside SSO', 'Add to SSO or include in the review from the system\'s own export'],
  ['Service account with no owner', 'Assign to the team that runs the service; disable if unclaimed'],
  ['Reviewer approves everything', 'Pre-fill last-used dates and flag unused access for removal by default'],
  ['Leaver still active in a SaaS app', 'Enforce SCIM deprovisioning or add the app to the leaver checklist'],
];

/* 3. Logging and audit trails */
export const LOG_EVENT_COLUMNS = ['Event', 'Why it matters', 'Source', 'Required fields', 'Monitoring or alert', 'Investigation use', 'Retention', 'Privacy risk', 'Owner'];

export const LOG_EVENTS = [
  ['Sign-in success and failure', 'Detect account takeover', 'IdP', 'Who, when, source IP, result, MFA method', 'Alert on impossible travel and repeated failures', 'Who accessed what, from where', 'Cold / archive tier, or Regulated tier where a law applies', 'Medium: IP and location', 'IAM lead'],
  ['Privileged role granted or used', 'Misuse of admin power', 'IdP, cloud audit log', 'Who, role, approver, ticket, expiry', 'Alert on grant without a ticket', 'Who had admin rights at the time', 'Cold / archive tier, or Regulated tier where a law applies', 'Low', 'Platform lead'],
  ['Production deployment', 'Unreviewed change reaching customers', 'CI/CD', 'Commit, PR, approver, pipeline run, artifact digest, environment', 'Alert on deploy not from the pipeline', 'What changed before an incident', 'Cold / archive tier, or Regulated tier where a law applies', 'Low', 'Platform lead'],
  ['Customer data export', 'Bulk exfiltration', 'Application', 'Who, what dataset, row count, destination', 'Alert above a volume threshold', 'Scope of a data incident', 'Cold / archive tier, or Regulated tier where a law applies', 'High: never log the data itself', 'Service owner'],
  ['Security configuration change', 'Controls switched off', 'Cloud audit log, SaaS admin log', 'Who, setting, old value, new value', 'Alert on logging, MFA or encryption changes', 'When a control stopped working', 'Cold / archive tier, or Regulated tier where a law applies', 'Low', 'Security operations'],
  ['Agent tool call', 'Agent acting outside its task', 'Agent runtime', 'Agent identity, session, tool, arguments (redacted), result', 'Alert on denied or out-of-scope calls', 'What the agent did and why', 'Cold / archive tier, or Regulated tier where a law applies', 'Medium: prompts may hold personal data', 'AI risk owner'],
];

export const LOG_MIN_FIELDS = ['Timestamp in UTC (ISO 8601)', 'Actor: user or workload identity', 'Action', 'Target resource', 'Result: success or failure', 'Source: IP, device or service', 'Correlation or request ID'];

export const LOG_PROTECTION = [
  'All systems sync time to a trusted source so events line up across systems.',
  'Logs go to a separate account or project that engineers cannot alter.',
  'Write-once or object-lock storage for logs that may be needed as evidence.',
  'Access to logs is limited and itself logged.',
  'Alert when a log source stops sending.',
];

export const LOG_QUESTIONS = ['Who did it?', 'What did they do, to what?', 'When, in UTC?', 'From where?', 'Did it work?', 'What else happened in the same session or request?'];

export const LOG_REDACTION = [
  ['Log', 'User or workload ID, action, resource ID, result, request ID, timestamps'],
  ['Mask', 'Email addresses, IP addresses where not needed, partial account numbers, free-text fields'],
  ['Never log', 'Passwords, tokens, API keys, session cookies, full card numbers, health details, raw prompts with personal data unless the purpose and retention are defined'],
];

/* 4. Change management */
export const CHANGE_COLUMNS = ['Change type', 'Peer review', 'Approval', 'Segregation of duties', 'Tests', 'Traceability', 'Rollback', 'Evidence'];

export const CHANGE_MATRIX = [
  ['Standard (pre-approved)', 'Template reviewed once', 'Pre-approved by change approver', 'Template author is not the approver', 'Automated checks in the template', 'Ticket referencing the template', 'Documented in the template', 'Template approval, run log'],
  ['Normal application', 'One approving review, not the author', 'Merge approval is the approval', 'Author cannot approve or merge alone', 'Unit, integration and security checks pass', 'Ticket to PR to commit to deploy', 'Previous release redeploy', 'PR record, check results, deploy log'],
  ['Emergency', 'Review after the change, within 2 business days', 'On-call lead verbal or chat approval, recorded', 'Retrospective reviewer is not the author', 'Minimum smoke tests', 'Incident ticket linked to the change', 'Planned before applying', 'Incident ticket, retrospective review'],
  ['Infrastructure as code', 'Same as normal application', 'Merge approval', 'Author is not the approver', 'Plan output reviewed; policy checks', 'Ticket to PR to plan to apply', 'Revert commit and apply', 'PR, plan, apply log'],
  ['Configuration (feature flags, settings)', 'Reviewed for high-risk flags', 'Owner approval for high-risk flags', 'Changer is not the approver for high-risk flags', 'Staged rollout', 'Flag audit log with ticket', 'Toggle off', 'Flag platform audit log'],
  ['AI model or prompt', 'One approving review, not the author', 'Merge approval after evaluation', 'Author is not the approver', 'Evaluation suite run with results attached', 'Ticket to PR to evaluation to deploy', 'Pinned previous model and prompt version', 'PR, evaluation results, deploy log'],
];

export const CHANGE_POINTS = [
  { h: 'Author is not approver', b: 'Branch protection enforces it, including for administrators. In a team of one or two, use a compensating control: post-merge review of every production change by someone outside the team within a set time, with the review logged.' },
  { h: 'Emergency changes', b: 'Allowed, recorded and reviewed. The test is that every emergency change has a ticket and a retrospective review, and that emergencies are rare.' },
  { h: 'Detect direct production changes', b: 'Compare what is running with what the pipeline deployed. Alert on console or CLI changes in production made by humans, and on drift detected by IaC.' },
  { h: 'IaC follows the same path', b: 'Infrastructure changes go through PRs, review and the pipeline, just like application code. No manual console changes outside break-glass.' },
];

/* 5. CI/CD */
export const PIPELINE_STAGES = [
  { stage: 'Commit', control: 'Signed commits, secret scanning with push protection' },
  { stage: 'Pull request', control: 'Required review, author is not approver, status checks' },
  { stage: 'Build', control: 'Isolated runner, pinned dependencies, SCA and SAST' },
  { stage: 'Artifact', control: 'Signed artifact, SBOM, stored by digest' },
  { stage: 'Deploy', control: 'OIDC to cloud, environment approval for production, promote the same digest' },
  { stage: 'Run', control: 'Drift detection, runtime logs, alert on non-pipeline changes' },
];

export const CICD_POINTS = [
  { h: 'Branch protection', b: 'Required reviews, required status checks, no force push, and administrators included. Rule sets at organisation level so new repositories inherit them.' },
  { h: 'Pipeline permissions', b: 'Default tokens are read-only. Each job gets only the permissions it needs. Pipeline definitions are protected like code, so a PR cannot change the production deploy job without review.' },
  { h: 'Secrets through OIDC', b: 'The pipeline gets short-lived cloud credentials through OIDC federation, scoped to the repository, branch and environment. No long-lived cloud keys stored in the CI system.' },
  { h: 'Dependency checks', b: 'Software composition analysis on every PR, a lockfile, and a policy for new or unknown packages, including packages suggested by AI tools that may not exist.' },
  { h: 'Artifacts', b: 'Build once, sign it, generate an SBOM, and promote the same digest from test to production. Production admission checks the signature.' },
];

export const TRACE_COLUMNS = ['Link in chain', 'System of record', 'Identifier', 'Automated check', 'Failure handling', 'Evidence'];

export const TRACE_CHAIN = [
  ['Requirement or ticket', 'Issue tracker', 'Ticket ID', 'PR title or branch must reference a ticket', 'Check fails; PR cannot merge', 'Ticket export'],
  ['Pull request', 'Code host', 'PR number', 'Review by non-author; checks pass', 'Merge blocked', 'PR record with reviewers'],
  ['Commit', 'Code host', 'Commit SHA', 'Signed commit on protected branch', 'Push rejected', 'Commit log'],
  ['Build', 'CI system', 'Run ID', 'Built from the merged commit', 'Pipeline fails', 'Run log'],
  ['Artifact', 'Registry', 'Digest', 'Signature and SBOM present', 'Admission denied', 'Registry metadata'],
  ['Deployment', 'Deploy tool or cloud audit log', 'Deploy ID', 'Deployed digest equals signed digest', 'Alert and roll back', 'Deploy log'],
];

export const SAMPLING_STEPS = [
  'Export all production deployments in the period from the deploy tool or cloud audit log.',
  'Take a sample sized for the population and risk.',
  'For each, trace backward: deploy to artifact digest, to build run, to commit, to PR, to ticket.',
  'Check review by a non-author, passing checks and approval before deploy.',
  'Any deployment that does not trace back is a finding, even if the code was fine.',
];

/* 6. Cloud and agent execution */
export const ARCH_FIRST = [
  'Where does the code or agent run: laptop, CI runner, container, managed service?',
  'Which identity does it use, and who owns that identity?',
  'What can that identity reach: repositories, secrets, networks, production?',
  'How are development, test and production separated?',
  'What does it log, and where do the logs go?',
  'What happens when it fails or is given bad input?',
];

export const BOUNDARY_COLUMNS = ['Boundary', 'Risk', 'Questions for engineers', 'Control options', 'Evidence', 'Friction note'];

export const BOUNDARIES = [
  ['Identity', 'Agent uses a human\'s credentials or a long-lived key', 'Does the agent have its own identity? How long do its tokens live?', 'Dedicated workload identity, short-lived tokens, owner assigned', 'Identity export with owner and token lifetime', 'Low once set up in the platform'],
  ['Environment', 'Agent or job in a lower environment reaches production', 'Can anything in dev or test reach production data or credentials?', 'Separate accounts or projects, no shared secrets, network separation', 'Account structure and network rules', 'Medium: may need test data tooling'],
  ['Execution', 'Agent runs arbitrary commands with broad rights', 'Where do commands run? Is there a sandbox? Is egress limited?', 'Sandbox, command allow-list, egress limits, no production credentials in the sandbox', 'Sandbox configuration and denied-action logs', 'Medium: allow-lists need tuning'],
  ['Code path', 'Agent changes reach production without a human', 'Can the agent merge, approve or deploy?', 'Agent can open PRs only; human review required; agent cannot approve', 'Branch protection settings and PR history', 'Low: matches normal review'],
  ['Input', 'Prompt injection from repository content, issues, web pages or tool output', 'Which untrusted content does the agent read? What can it do after reading it?', 'Treat untrusted input as data; limit tools available after reading it; require confirmation for sensitive actions', 'Prompt-injection test results and tool-call logs', 'Medium: some confirmations add steps'],
  ['Evidence', 'No record of what the agent did', 'Are tool calls, commands and outputs logged with the agent identity?', 'Log every tool call with session and identity; keep per the retention tier', 'Sample of agent action logs', 'Low'],
];

/* 7. Scenarios */
export const SCENARIOS = [
  {
    id: 'scn-service-key',
    title: 'Long-lived production service account credential',
    questions: ['Which service uses the key, and from where?', 'When was it created and last rotated?', 'Who can read it?', 'Could the service use a workload identity instead?'],
    risk: 'A static key with production access that never expires could be leaked from a config file or laptop and used without detection.',
    control: 'Replace with a workload identity or short-lived credentials; where not possible, store in a secrets manager with rotation and access logging.',
    task: 'Migrate the service to workload identity federation and delete the static key.',
    criteria: ['No static key for this service remains active', 'Service authenticates with short-lived tokens', 'Old key deletion is visible in the cloud audit log'],
    evidence: 'Cloud identity export showing no active keys; audit log entry for key deletion',
    pushback: '"The service is legacy and can\'t do token federation without a rewrite."',
    outcome: 'Agreed interim control: key moved to the secrets manager with 90-day rotation, alert on use from any network other than the service\'s own, owner assigned. Migration added to the roadmap with a date. Exception expires on that date.',
  },
  {
    id: 'scn-hotfix',
    title: 'Hotfix applied outside the pipeline',
    questions: ['How was the change applied: console, SSH, CLI?', 'Who made it and under which identity?', 'Was there an incident ticket?', 'Has the change been put back into code?'],
    risk: 'An unreviewed change in production that is not in code can be overwritten, cannot be traced, and bypasses segregation of duties.',
    control: 'Emergency change path with a ticket and retrospective review; drift detection to catch changes outside the pipeline.',
    task: 'Back-port the hotfix into a PR, run it through the pipeline, and enable drift alerts for the affected resources.',
    criteria: ['PR with the change merged and deployed through the pipeline', 'Retrospective review by someone other than the person who made the change', 'Drift alert configured and tested'],
    evidence: 'Incident ticket, PR record, deploy log, drift alert configuration',
    pushback: '"Production was down. We didn\'t have time for a PR."',
    outcome: 'Agreed: emergency fixes are allowed, but must be raised as an emergency change within the incident and back-ported within 2 business days. Drift alerts go to the on-call channel.',
  },
  {
    id: 'scn-agent',
    title: 'AI coding agent that can open PRs and run commands',
    questions: ['Which identity does the agent use?', 'Where do its commands run, and what can that environment reach?', 'Can it merge, approve or deploy?', 'What untrusted content does it read?', 'What is logged?'],
    risk: 'An agent with broad rights could be steered by prompt injection to leak secrets, change code paths, or run harmful commands, with actions attributed to a human.',
    control: 'Dedicated agent identity; sandboxed execution with no production credentials and limited egress; agent can open PRs but not approve or merge; tool calls logged.',
    task: 'Register the agent as its own app identity, run it in the sandbox runner, and update branch protection so the agent cannot approve.',
    criteria: ['Agent actions appear under the agent identity, not a person', 'Sandbox has no production secrets and egress only to approved hosts', 'Agent cannot approve or merge PRs', 'Every tool call is logged with session ID'],
    evidence: 'App identity and permission export, sandbox configuration, branch protection settings, sample tool-call logs',
    pushback: '"Limiting egress breaks package installs and slows the agent down."',
    outcome: 'Agreed: egress allowed to the internal package mirror and code host only. Expanded access is granted per task by ticket with expiry. Reviewed again after one quarter of use.',
  },
];

/* Integration data: ITGC gap cards (same format as framework gaps) */
export const ENG_ITGC_GAPS = [
  {
    itgc: 'Access Management',
    gap: 'Service, pipeline and agent identities are missing from the access review',
    pushback: 'The access review covers people. Service accounts are an engineering concern.',
    reality: 'Workload identities often hold more privilege than people and never leave. Reviews that exclude them miss the accounts most likely to be abused.',
    policy: 'Access Control Policy, Privileged Access Management Policy',
    compensating: ['Identity inventory with owner, purpose and last-used date', 'Short-lived tokens through OIDC where the platform supports it', 'Unowned identities disabled after a set period'],
    leantip: 'Export non-human identities from the IdP and cloud before each access review and review them with the human accounts.',
    templates: ['identity-inventory', 'privileged-user-list', 'access-review-record'],
  },
  {
    itgc: 'Change Management',
    gap: 'Production deployments cannot be traced back to a reviewed change',
    pushback: 'Everything goes through PRs, so it is all reviewed.',
    reality: 'Hotfixes, console changes, admin bypass and pipeline edits can reach production without a reviewed PR. Auditors sample from deployments, not from PRs.',
    policy: 'Change Management Procedure, Secure Development Policy',
    compensating: ['Branch protection including administrators', 'Drift detection and alerts on non-pipeline production changes', 'Monthly backward trace from a sample of deployments'],
    leantip: 'Sample deployments each month and trace each back to its PR and ticket; fix the first break you find.',
    templates: ['change-traceability-sample', 'change-management-procedure', 'cicd-description'],
  },
  {
    itgc: 'IT Operations',
    gap: 'Security-relevant events are not defined, so logs exist but cannot answer investigation questions',
    pushback: 'We log everything to the cloud provider already.',
    reality: 'Default logs often miss application events such as data exports and privilege use, lack a user or request ID, or contain secrets and personal data that should not be there.',
    policy: 'Logging and Monitoring Standard, Operations Security Policy',
    compensating: ['Log event catalogue with required fields and owner', 'Alert when a log source stops sending', 'Redaction rules tested in the logging library'],
    leantip: 'Start with ten events that matter, define their fields, and test that an investigation question can be answered from them.',
    templates: ['log-event-catalogue', 'log-alerting'],
  },
  {
    itgc: 'Program / System Development',
    gap: 'Requirements reach engineering as policy text, not as tasks with acceptance criteria',
    pushback: 'Engineering ignores security requirements.',
    reality: 'A requirement with no owner, no acceptance criteria and no evidence source is hard to build and impossible to test. Engineers deliver what fits their workflow.',
    policy: 'Secure Development Policy',
    compensating: ['Control delivery card for each new control', 'Tickets in the team\'s own backlog', 'Agreed exception path with expiry'],
    leantip: 'Write one control delivery card with the engineering lead before raising any ticket.',
    templates: ['control-delivery-card', 'agent-execution-review'],
  },
];

/* Integration data: Control Reuse Map rows (assessments.js shape) */
export const ENG_REUSE_ITEMS = [
  { id: 'REUSE-13', itgc: 'Access Management', category: 'IT', control: 'Identity inventory covering human, service, pipeline and agent identities with owners and review', tool: 'IdP export, cloud identity export, identity inventory', scenario: 'Satisfies SOC 2 CC6.1, CC6.2, CC6.3 and ISO 27001 A.5.16, A.5.18, A.8.2.', hours: 6 },
  { id: 'REUSE-14', itgc: 'Change Management', category: 'IT', control: 'Traceability from production deployment back to reviewed PR and ticket, with branch protection for administrators', tool: 'Code host, CI system, deploy log', scenario: 'Satisfies SOC 2 CC8.1 and ISO 27001 A.8.32, A.8.4.', hours: 5 },
  { id: 'REUSE-15', itgc: 'IT Operations', category: 'IT', control: 'Log event catalogue with required fields, UTC timestamps, protection and alerting', tool: 'SIEM, log pipeline, event catalogue', scenario: 'Satisfies SOC 2 CC7.2 and ISO 27001 A.8.15, A.8.16, A.8.17.', hours: 6 },
  { id: 'REUSE-16', itgc: 'Program / System Development', category: 'IT', control: 'Separated environments and least-privilege execution for CI/CD jobs and AI agents', tool: 'Account structure, sandbox runner, OIDC federation', scenario: 'Satisfies ISO 27001 A.8.31 and A.8.25; supports SOC 2 CC8.1.', hours: 6 },
];

/* Integration data: read-only cloud control tests (cloudControlTests.js shape) */
export const ENG_CLOUD_TESTS = [
  { d: 'Identity and Access', fw: 'SOC 2', obj: 'Source control: organisation requires MFA or SSO; branch rules apply to administrators', map: 'SOC 2 CC6.1, CC8.1',
    sig: 'Members without MFA; rules with admin bypass', test: 'Inspect organisation authentication settings and branch rule sets for production repositories.',
    cli: 'Read-only API or settings page, for example gh api orgs/ORG and gh api repos/ORG/REPO/rulesets', ev: 'Settings export with date',
    pass: 'SSO or MFA enforced; no admin bypass on protected branches', exc: 'Admin bypass enabled: remove or log each use and review.' },
  { d: 'Identity and Access', fw: 'SOC 2', obj: 'CI/CD: cloud access through OIDC, no long-lived cloud keys in CI secrets', map: 'SOC 2 CC6.1',
    sig: 'Stored cloud keys in CI; access key age', test: 'List CI secrets by name only and cloud access keys for CI identities; confirm OIDC trust policies are scoped to repository and branch.',
    cli: 'aws iam list-access-keys --user-name CI_USER; aws iam get-role --role-name DEPLOY_ROLE (trust policy)', ev: 'Key list and trust policy export',
    pass: 'No active long-lived keys for CI; trust policy scoped', exc: 'Legacy key in use: rotate, restrict and set a migration date.' },
  { d: 'Logging and Monitoring', fw: 'SOC 2', obj: 'CI/CD: production deployments are logged and traceable to a reviewed PR', map: 'SOC 2 CC8.1',
    sig: 'Deployments with no linked PR', test: 'Export production deployments for the period, sample, and trace each to artifact, commit, PR and ticket.',
    cli: 'Deploy tool history export; gh pr view NUMBER --json reviews,mergedBy (read-only)', ev: 'Sample sheet with each link recorded',
    pass: 'Every sampled deployment traces to a PR reviewed by a non-author', exc: 'Untraceable deploy: treat as an emergency change and review.' },
  { d: 'Identity and Access', fw: 'SOC 2', obj: 'Agent execution: agents use their own identity and cannot approve or merge', map: 'SOC 2 CC6.1, CC8.1',
    sig: 'Agent app permissions; approvals by agent identities', test: 'Inspect installed apps and their permissions; search PR history for approvals or merges by agent identities.',
    cli: 'Code host installed apps list; PR history export filtered by author type', ev: 'App permission export and filtered PR history',
    pass: 'Agents have their own identity and no approvals or merges in the period', exc: 'Agent using a person\'s token: issue an app identity and revoke the token.' },
  { d: 'Containers and Kubernetes', fw: 'SOC 2', obj: 'Agent execution: sandbox has no production credentials and limited egress', map: 'SOC 2 CC6.6',
    sig: 'Secrets mounted in sandbox; egress rules', test: 'Inspect sandbox runner configuration, mounted secrets and network egress rules.',
    cli: 'kubectl get networkpolicy -n SANDBOX_NS; kubectl get pods -n SANDBOX_NS -o yaml (secret references only)', ev: 'Configuration export',
    pass: 'No production secrets; egress limited to approved hosts', exc: 'Open egress: add a default-deny policy with an allow-list.' },
];
