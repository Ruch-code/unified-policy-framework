// End-to-end change management (SDLC) content for the Knowledge > Change Management tab.

export const SDLC_STAGES = [
  {
    id: 'request', name: 'Business requirement and intake',
    what: 'A business need is written down as a ticket: problem, expected outcome, owner, priority. Every change starts here so it can be traced later.',
    who: 'Product owner or business requester; triaged by product or engineering lead',
    controls: ['Single intake channel (ticketing tool), no changes from chat or email alone', 'Acceptance criteria written before work starts', 'Requester and business owner recorded'],
    evidence: 'Ticket with description, owner, priority and acceptance criteria',
  },
  {
    id: 'assess', name: 'Impact, risk and classification',
    what: 'Decide what type of change it is (standard, normal, emergency and so on), what it touches, and whether security, privacy or compliance review is needed.',
    who: 'Engineering lead with security and privacy as needed',
    controls: ['Change type and risk rating set on the ticket', 'Triggers for security review: auth, payments, encryption, new data types, new vendors, public endpoints', 'Triggers for privacy review: new personal data, new purpose, new processor, AI use (DPIA screening)'],
    evidence: 'Risk rating and classification on the ticket; security or privacy review notes where triggered',
  },
  {
    id: 'design', name: 'Design and approval to build',
    what: 'For non-trivial changes, agree the approach before coding: architecture, data flows, threat model for risky changes.',
    who: 'Tech lead, architect, security for high-risk changes',
    controls: ['Design note or RFC for significant changes', 'Threat model for changes to trust boundaries', 'Approval recorded before build for major changes'],
    evidence: 'Design document or RFC with approver and date',
  },
  {
    id: 'build', name: 'Build in a branch',
    what: 'Developers work on a branch linked to the ticket. Nothing goes straight to main or production.',
    who: 'Developers (including AI-assisted)',
    controls: ['Branch protection on main', 'Commits or pull requests reference the ticket ID', 'Secrets never in code; secret scanning with push protection'],
    evidence: 'Repository settings; pull request linked to ticket',
  },
  {
    id: 'review', name: 'Peer review',
    what: 'Someone other than the author reviews the change before merge. This is the core segregation-of-duties control auditors test.',
    who: 'A developer who is not the author; code owners for sensitive areas',
    controls: ['At least one non-author approval required by the platform', 'Code owners required for high-risk paths', 'Approval dismissed when new commits are pushed', 'Admins cannot bypass without an audit trail'],
    evidence: 'Pull request approvals with reviewer and timestamp',
  },
  {
    id: 'test', name: 'Automated testing and security checks',
    what: 'The pipeline runs tests and security scans; failures block merge.',
    who: 'CI/CD pipeline; owners triage findings',
    controls: ['Required status checks: unit and integration tests, SAST, SCA, secret scan, IaC scan', 'Coverage or test policy for critical code', 'Scan findings triaged against SLA'],
    evidence: 'Passing check runs on the pull request; scan reports',
  },
  {
    id: 'uat', name: 'User acceptance testing',
    what: 'The business owner confirms the change does what was asked, in a non-production environment.',
    who: 'Business owner, QA',
    controls: ['UAT in staging with masked or test data', 'Sign-off recorded for normal and major changes', 'Test evidence attached to the ticket'],
    evidence: 'UAT sign-off on the ticket, test results or screenshots',
  },
  {
    id: 'approve', name: 'Release approval (CAB where needed)',
    what: 'Final go decision for production. Low-risk standard changes are pre-approved; major and risky changes go to a change advisory board (CAB) or release manager.',
    who: 'Release manager, CAB, or approver defined for the change type',
    controls: ['Approval rules by change type', 'Deployment window and rollback plan for major changes', 'Approver independent from the developer for normal changes'],
    evidence: 'Release approval record or protected-environment approval',
  },
  {
    id: 'deploy', name: 'Deploy to production',
    what: 'Only the pipeline deploys to production, using the same artifact that was tested.',
    who: 'CI/CD pipeline; no manual production changes',
    controls: ['Production deploy through pipeline only', 'Developers have no standing write access to production', 'Feature flags and progressive rollout for risky changes'],
    evidence: 'Deployment log tying the release to the approved commit',
  },
  {
    id: 'verify', name: 'Post-implementation verification',
    what: 'Confirm the change works in production and has not broken anything. Roll back if it has.',
    who: 'Developer, on-call, business owner for key changes',
    controls: ['Smoke tests and monitoring after deploy', 'Tested rollback procedure', 'Failed changes recorded and reviewed'],
    evidence: 'Monitoring checks, rollback records, incident links',
  },
  {
    id: 'close', name: 'Close and document',
    what: 'Ticket closed with links to the pull request, release and any documentation updates. Customers informed where needed.',
    who: 'Ticket owner',
    controls: ['Ticket links requirement to PR, release and approvals', 'Release notes for customer-facing changes', 'Documentation and runbooks updated'],
    evidence: 'Closed ticket with full trail; release notes',
  },
];

export const CHANGE_TYPES = [
  {
    id: 'standard', name: 'Standard (pre-approved)', risk: 'Low',
    examples: 'Adding a user to an approved group through a template, rotating a certificate with a scripted procedure, scaling instances within set limits',
    approval: 'Pre-approved once as a change model; no per-change CAB',
    testing: 'Procedure tested when the model was approved',
    review: 'Not required per change; model reviewed yearly',
    docs: 'Ticket or log entry referencing the approved model',
    watch: 'Keep the catalogue short. Anything outside the exact procedure is a normal change.',
  },
  {
    id: 'cosmetic', name: 'Minor or cosmetic', risk: 'Low',
    examples: 'Text and copy edits, colours, spacing, icons, help content, non-functional UI tweaks',
    approval: 'Peer review approval on the pull request',
    testing: 'Automated checks pass; visual check',
    review: 'Required (lightweight)',
    docs: 'Pull request linked to ticket',
    watch: 'A "cosmetic" change that touches forms, validation, consent text or JavaScript logic is not cosmetic. Classify by what changed, not by how small it looks.',
  },
  {
    id: 'normal', name: 'Normal', risk: 'Medium',
    examples: 'New feature, bug fix, API change, dependency upgrade',
    approval: 'Peer review plus release approval per policy',
    testing: 'Automated tests and security scans; UAT for user-facing changes',
    review: 'Required, non-author',
    docs: 'Ticket, PR, test evidence, release record',
    watch: 'This is the population auditors usually sample most heavily.',
  },
  {
    id: 'major', name: 'Major or significant', risk: 'High',
    examples: 'Authentication or payment changes, new data store, architecture change, data migration, new region',
    approval: 'Design approval before build, CAB or senior approval before release',
    testing: 'Full regression, security testing, performance testing, rehearsed rollback',
    review: 'Required, including code owners and security',
    docs: 'Design or RFC, risk assessment, rollback plan, CAB record, communication plan',
    watch: 'Trigger privacy (DPIA) and vendor reviews where data flows change.',
  },
  {
    id: 'emergency', name: 'Emergency or hotfix', risk: 'High (time pressure)',
    examples: 'Fix for a production outage, critical vulnerability patch, active security incident',
    approval: 'Named emergency approver before deploy (can be verbal, recorded immediately); full approval retrospectively',
    testing: 'Minimum agreed test set; full tests after the fact',
    review: 'Second person present or review within the retrospective window (for example 1 to 2 business days)',
    docs: 'Emergency change record, reason, approver, retrospective review and root cause link',
    watch: 'If emergency changes become routine, it is a process problem. Track the percentage and investigate when it rises.',
  },
  {
    id: 'config', name: 'Configuration and feature flags', risk: 'Varies',
    examples: 'Turning a feature on for customers, changing limits, toggling security settings, cloud console settings',
    approval: 'Same as the change it represents; security settings need security approval',
    testing: 'Tested in staging where possible',
    review: 'Flag and config changes logged and reviewable; config as code where possible',
    docs: 'Audit log of flag or setting changes with who and when',
    watch: 'Console and flag changes often bypass the pipeline entirely. Auditors increasingly ask for these logs.',
  },
  {
    id: 'infra', name: 'Infrastructure as Code', risk: 'Medium to high',
    examples: 'Terraform changes to networks, IAM, databases, Kubernetes manifests',
    approval: 'Peer review of the plan output, not just the code',
    testing: 'Plan review, policy checks (IaC scanning), apply in staging first',
    review: 'Required; IAM and network changes need security review',
    docs: 'PR with plan output, apply logs',
    watch: 'Manual console changes cause drift. Detect drift and treat it as an unauthorised change.',
  },
  {
    id: 'data', name: 'Database and data fixes', risk: 'High',
    examples: 'Schema migrations, scripts that correct customer data in production, bulk updates',
    approval: 'Peer review of the script plus business owner approval for data corrections',
    testing: 'Run on a copy of production data first; backup before running',
    review: 'Required; a second person checks the exact script run',
    docs: 'Script, approval, before and after counts, backup reference',
    watch: 'Direct database access for data fixes is a common audit exception. Use controlled, logged access.',
  },
  {
    id: 'vendor', name: 'Third-party and SaaS changes', risk: 'Varies',
    examples: 'Vendor releases a new version, SaaS adds AI features, a new sub-processor',
    approval: 'Owner reviews release notes; significant changes go through vendor risk review',
    testing: 'Test critical integrations after vendor changes',
    review: 'Vendor management review for material changes',
    docs: 'Release note review record, updated vendor assessment',
    watch: 'You cannot review the vendor\'s code, so the control is monitoring their changes and your integrations.',
  },
  {
    id: 'ai', name: 'AI model, prompt and data changes', risk: 'Medium to high',
    examples: 'New model version, changed system prompt, new retrieval source, fine-tuning run',
    approval: 'Same rigour as code; high-risk AI uses need AI governance sign-off',
    testing: 'Evaluation suite (accuracy, safety, bias, prompt injection) as a release gate',
    review: 'Prompts and configs versioned and reviewed in the repository',
    docs: 'Model or prompt version, evaluation results, approval',
    watch: 'Behaviour can change without any code change. Version prompts and model IDs.',
  },
];

export const VELOCITY = {
  intro: 'Fast-moving teams ship many changes a day. Peer review on every change can become a bottleneck, or be skipped quietly. The answer is not to drop the control, but to make review cheaper and add compensating controls where review genuinely cannot happen.',
  preventive: [
    { t: 'Small pull requests', d: 'Set a soft size limit. Small changes get reviewed in minutes instead of waiting days.' },
    { t: 'Risk-based review depth', d: 'Every change gets a non-author approval, but sensitive paths (auth, payments, IAM, encryption, data access) require code owners or security. Low-risk paths get a lighter review.' },
    { t: 'Pair or mob programming counts as review', d: 'If two people wrote it together, record the pair as reviewer (for example as a co-author plus approval). Document this in the policy.' },
    { t: 'AI-assisted review as an aid', d: 'AI review tools can catch issues and speed reviewers up, but a named human approval is still the control.' },
    { t: 'Trunk-based development with feature flags', d: 'Merge small changes behind flags, release by turning flags on with approval. Separates deploy from release.' },
    { t: 'Review rotation and SLAs', d: 'A daily reviewer rotation and a target such as review within four working hours stops queues forming.' },
  ],
  compensating: [
    { t: 'Post-merge review within a set window', d: 'Where an urgent change merges without review, a second person reviews it within an agreed period (for example 2 business days). Track open post-merge reviews to zero.' },
    { t: 'Detective report of unreviewed changes', d: 'A weekly automated report lists every merge to main without a non-author approval. An engineering manager reviews and signs it. This is the most common compensating control auditors accept.' },
    { t: 'Mandatory automated gates that cannot be bypassed', d: 'Tests, SAST, SCA and secret scanning are required checks even when review is skipped. Gates reduce the risk that review would have caught.' },
    { t: 'Segregation at deployment', d: 'If the author merges their own change, a different person or an automated policy gate approves the production deployment.' },
    { t: 'Production monitoring and fast rollback', d: 'Error rate and latency alerts tied to deployments, with automatic or one-click rollback, limit the impact of a bad change.' },
    { t: 'Restricted production access', d: 'Developers have no standing write access to production, so unreviewed code can only arrive through the logged pipeline.' },
    { t: 'Documented risk acceptance', d: 'Leadership formally accepts the residual risk for a defined scope and period, with a plan to restore review.' },
  ],
  smallTeam: [
    'With one or two engineers, full segregation of duties may be impossible. Say so in the policy rather than pretending.',
    'Use the detective control: a founder or manager reviews a log of all production changes weekly and signs it.',
    'Rely more on automated gates, restricted production access and monitoring.',
    'Ask the auditor early how they will test it; agree the compensating controls before the observation period starts.',
  ],
  auditor: [
    'A compensating control must address the same risk (unauthorised or faulty code reaching production), not just exist.',
    'It must be designed and documented before the period starts, and operate every time, with evidence.',
    'Expect the auditor to sample unreviewed changes and check the compensating review happened on time.',
    'If neither review nor the compensating control happened for a sampled change, it is an exception. Explain impact and remediation.',
  ],
};

export const SCENARIOS = [
  {
    t: 'Startup shipping 40 pull requests a day with 6 engineers',
    s: 'Reviews pile up; engineers start self-merging. The auditor will sample merges for the full period.',
    a: ['Enforce one non-author approval on main; admins included', 'Move to small PRs and a daily reviewer rotation with a four-hour review target', 'Code owners on auth, billing and infrastructure paths', 'Weekly unreviewed-merge report signed by the engineering manager as a backstop', 'Track percentage of changes reviewed before merge as a KPI'],
  },
  {
    t: 'Two-person engineering team',
    s: 'Both engineers deploy, and sometimes only one is available.',
    a: ['Each reviews the other where possible; pairing recorded as review', 'Changes made alone are reviewed by the other engineer within two business days', 'Founder signs a weekly report of production deployments', 'No direct production access; pipeline only', 'Policy states the compensating controls explicitly'],
  },
  {
    t: 'Hotfix at 2 a.m. during an outage',
    s: 'On-call engineer has a fix but nobody else is awake.',
    a: ['Follow the emergency change path: call the named emergency approver, record the decision', 'Run the minimum test set before deploy', 'Retrospective review and full approval by the next business day', 'Link the hotfix to the incident ticket and root cause', 'Review whether the follow-up permanent fix needs a normal change'],
  },
];

export const KPIS = [
  { k: 'Changes reviewed before merge', v: 'Target close to 100%; investigate any drop' },
  { k: 'Post-merge reviews completed on time', v: 'Target 100% within the agreed window' },
  { k: 'Emergency changes as % of total', v: 'Rising trend means planning or quality problems' },
  { k: 'Change failure rate', v: 'Percentage of deployments causing incidents or rollback (a DORA metric)' },
  { k: 'Lead time for changes', v: 'Commit to production; shows whether controls slow delivery (a DORA metric)' },
  { k: 'Unauthorised changes detected', v: 'Console changes, drift, direct database edits; target zero' },
];

export const MAPPING = [
  { f: 'SOC 2', c: 'CC8.1 (changes authorised, designed, developed, tested, approved and implemented); also CC3.4, CC7.1, CC6.8' },
  { f: 'ISO 27001:2022', c: 'A.8.32 Change management; A.8.25 Secure development life cycle; A.8.26 Application security requirements; A.8.29 Security testing; A.8.31 Separation of environments; A.8.33 Test information; A.5.8 Information security in project management' },
  { f: 'PCI DSS v4.0', c: 'Requirement 6.5 (6.5.1 to 6.5.6) change management for system components' },
  { f: 'ITGC / SOX', c: 'Program change management: authorisation, testing, approval, migration to production, segregation of duties' },
  { f: 'NIST CSF 2.0 / 800-53', c: 'PR.PS (platform security); CM-3 Configuration change control; CM-4 Impact analysis; CM-5 Access restrictions for change' },
];

export const EVIDENCE = [
  'Change management policy and procedure covering all change types, including emergency and standard changes',
  'Population of production changes for the period (merged pull requests and deployments), complete and reconciled',
  'For sampled changes: ticket, risk classification, non-author approval, passing checks, UAT where required, release approval, deployment record',
  'Emergency changes: record, approver, retrospective review within the window',
  'Repository and environment protection settings, dated',
  'Compensating control evidence: signed unreviewed-merge reports, post-merge review records, risk acceptance',
  'List of people with production access and how it is reviewed',
];
