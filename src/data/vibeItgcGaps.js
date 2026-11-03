// ITGC gap cards for organizations that build or run AI and vibe coding
// platforms. Same format as the framework startup gaps. Generic guidance.

export const VIBE_ITGC_GAPS = [
  {
    itgc: 'Access Management',
    gap: 'AI agents, service accounts and model provider keys have no owner or review',
    pushback: 'The agent just needs broad access to be useful, and the API key lives in the environment.',
    reality: 'Agent and service identities act with real permissions. Unowned provider keys, staff who can read customer prompts, support tools that impersonate customers, and one person who can both build and deploy are classic access findings.',
    policy: 'Access Control Policy, Privileged Access Management Policy, Secrets Management Standard',
    compensating: ['Agent and service accounts listed in the identity provider with named owners', 'Provider API keys in a secrets manager with rotation dates', 'Prompt and conversation access limited to a support role with logging', 'Customer impersonation only with a ticket, time limit and audit log', 'Deployment approval by someone other than the builder'],
    leantip: 'Inventory every non-human identity and provider key with an owner and rotation date, review them with the quarterly access review, and log any staff access to prompts.',
  },
  {
    itgc: 'Change Management',
    gap: 'Model, prompt and routing changes ship without change control',
    pushback: 'Swapping the model or tweaking the system prompt is configuration, not code.',
    reality: 'A new model version, system prompt, tool permission or routing rule can change outputs and data flows as much as a code release. AI-generated code also needs human review before production.',
    policy: 'Change Management Procedure, Secure Development Policy',
    compensating: ['Model version, system prompt, tool permissions and routing kept in version control', 'Regression evaluation suite run before each change, with results attached to the change', 'Approval and a tested rollback path for each change', 'Human review of AI-generated code before merge', 'Protected branches; agents cannot merge or commit to protected branches'],
    leantip: 'Treat prompts and model settings as code: store them in the repository, run the evaluation suite in the pipeline, and require one reviewer.',
  },
  {
    itgc: 'IT Operations',
    gap: 'Background jobs, queues and token usage are not monitored',
    pushback: 'The provider dashboard shows our usage.',
    reality: 'Scheduled jobs, batch processing, queues and metering drive both service quality and customer billing. Failed jobs, runaway token usage, provider outages and billing errors need monitoring and handling.',
    policy: 'Operations Security Policy, Capacity Management Procedure',
    compensating: ['Job scheduler with success and failure alerts', 'Failed-job retry and dead-letter handling with an owner', 'Queue depth and token usage dashboards with alert thresholds', 'Reconciliation of usage metering to invoices', 'Provider status monitoring and spend or rate limits'],
    leantip: 'Alert on failed jobs and queue backlogs, reconcile metering to billing monthly, and set hard spend limits per provider.',
  },
  {
    itgc: 'Program / System Development',
    gap: 'No SDLC or evaluation gate for AI features',
    pushback: 'We ship AI features fast and fix forward.',
    reality: 'AI features need requirements, evaluation gates, dependency checks (including packages that a model invented and that do not exist or are malicious), an SBOM and an AI bill of materials, licence checks and rules for test data.',
    policy: 'Secure Development Policy, AI Usage Policy',
    compensating: ['Evaluation criteria defined before build and checked before release', 'Dependency scanning that blocks unknown or newly created packages', 'SBOM and AIBOM (models, versions, datasets, providers) per release', 'Licence scanning of dependencies and generated code', 'Synthetic or masked test data only'],
    leantip: 'Add an evaluation step and a dependency allow-list to the pipeline, and generate an SBOM and AIBOM on every release.',
  },
  {
    itgc: 'Data Privacy / Governance',
    gap: 'Prompts and outputs are not classified, retained or erased deliberately',
    pushback: 'Users choose what to type; we just pass it on.',
    reality: 'Prompts and outputs often contain personal and confidential data. They need classification, a retention period, a training opt-out at the provider, and erasure that reaches providers and caches.',
    policy: 'Data Management and Retention Policy, Privacy Policy',
    compensating: ['Prompt and output classification with redaction before sending', 'Retention periods for prompts, outputs, logs and embeddings', 'Provider training opt-out confirmed in contract and settings', 'Erasure propagation test across platform, provider and caches'],
    leantip: 'Default to short retention for prompts, turn off provider training, and test that a deletion request reaches every copy.',
    templates: ['ai-data-flow-register', 'data-management-policy'],
  },
  {
    itgc: 'Business Continuity & Incident',
    gap: 'No tested fallback when the model provider fails or is breached',
    pushback: 'The provider has better uptime than we do.',
    reality: 'Provider outages and provider-origin breaches hit every customer at once. Customer apps hosted on the platform also need recovery targets.',
    policy: 'Business Continuity and Disaster Recovery Plan, Incident Response Plan',
    compensating: ['Failover to a reviewed second provider or degraded mode', 'Fallback tested at least annually', 'Playbook for a breach that starts at a provider, with GDPR and DPDPA timelines', 'RTO and RPO set and tested for hosted customer apps'],
    leantip: 'Write the provider-outage and provider-breach playbooks, set RTO and RPO for hosted apps, and test the fallback once a year.',
    templates: ['bcdr-plan', 'incident-response-plan'],
  },
  {
    itgc: 'General / Cross-Cutting',
    gap: 'Nobody owns AI risk or reassesses model providers',
    pushback: 'We reviewed the provider when we signed up.',
    reality: 'Providers change models, terms, regions and sub-processors often. AI risk needs an owner, staff training and periodic provider reassessment.',
    policy: 'AI Usage Policy, Third-Party / Vendor Management Policy',
    compensating: ['Named owner for AI risk reporting to leadership', 'AI-specific training for engineers and support staff', 'Provider reassessment at least annually and on material change'],
    leantip: 'Name an AI risk owner, add AI topics to training, and diarise provider reassessments.',
    templates: ['vendor-management-policy', 'vendor-security-review'],
  },
];

export const SOC1_ICFR_NOTE = 'ITGCs matter for financial reporting when a system supports a process that affects the financial statements, for example billing, revenue recognition, usage metering, payroll or the general ledger. Then a SOC 1 report or an ICFR (internal control over financial reporting) review will test access, change, operations and development controls over those systems, and the completeness and accuracy of information produced by the entity (IPE), such as reports and queries used in controls. Systems with no effect on financial reporting, such as a code-generation feature that does not touch billing data, are out of scope for SOC 1 and ICFR, though they may still be in scope for SOC 2.';
