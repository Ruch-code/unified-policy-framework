// Worked scenario: a vibe coding platform that outsources its LLMs and model
// providers. Platform operator view (not the employee-use view). Generic; no
// real company or product names. Guidance, not legal advice.

export const VIBE_TITLE = 'Vibe coding platform that outsources its LLMs and model providers';

export const VIBE_ROLES = [
  ['Platform accounts, billing, marketing and fraud prevention', 'Controller', 'Data Fiduciary', 'The platform decides why and how this data is used.'],
  ['Individual builders using the platform for their own projects', 'Controller for builder account data; the builder is usually the controller of end-user data in apps they publish', 'Data Fiduciary for account data', 'Builders are customers; the platform runs the service they signed up for.'],
  ['Enterprise customers whose staff build internal apps', 'Customer is controller; platform is processor for customer content (prompts, code, connected data)', 'Customer is Data Fiduciary; platform is Data Processor', 'Covered by the platform DPA or DPDPA addendum.'],
  ['End users of apps generated and hosted on the platform', 'App owner (builder or enterprise) is controller; platform is processor when it hosts the app and its database', 'App owner is Data Fiduciary; platform is Data Processor', 'The platform should give app owners tools to meet their own duties (notices, deletion, logs).'],
  ['LLM and model provider receiving prompts and context', 'Processor (for platform data) or sub-processor (for customer content)', 'Data Processor engaged by the platform', 'Needs a DPA, flow-down terms and sub-processor disclosure.'],
  ['Provider uses data to train its own models or keeps it for its own abuse monitoring', 'Provider may act as an independent controller for that use', 'Provider may act as a Data Fiduciary for that use', 'Exclude training by contract; limit, disclose and assess abuse-monitoring retention.'],
];

export const VIBE_FLOWS = [
  ['Prompts and chat history', 'May contain personal data, credentials and customer data pasted by users.'],
  ['Uploaded files and images', 'Specifications, spreadsheets and screenshots that often hold personal data.'],
  ['Repository context', 'Source code, configuration and commit history sent as model context.'],
  ['Secrets', 'API keys, database URLs and tokens that leak into prompts or generated code.'],
  ['Generated code', 'Output that may embed data, insecure defaults or hard-coded secrets.'],
  ['Connected databases', 'Live end-user data in apps the platform hosts or connects to.'],
  ['Logs', 'Request and response logs, tool calls and error traces.'],
  ['Embeddings and indexes', 'Vector representations of code and documents used for retrieval.'],
  ['Caches', 'Prompt and response caches at the platform and the provider.'],
  ['Telemetry', 'Usage, performance and product analytics.'],
];

export const VIBE_VENDOR = [
  'DPA with the provider, with the same obligations flowed down to its sub-processors',
  'Published sub-processor list with advance change notice and a right to object',
  'Contract terms that prohibit training on platform or customer data',
  'Zero or limited data retention, with the retention period stated in writing',
  'Abuse-monitoring exceptions identified: what is kept, for how long, who can see it',
  'Inference region stated, and checked against transfer rules',
  'Fallback model routing only to providers that have passed the same review',
  'Exit and deletion terms, with written confirmation of deletion',
  'Provider SOC 2 (or equivalent) report reviewed: scope, exceptions, CUECs mapped to platform controls, bridge letter for any gap since the period end',
];

export const VIBE_PRIVACY = {
  gdpr: ['Lawful basis per activity (contract for the service, legitimate interests with an assessment for security and abuse prevention, consent where required)', 'DPIA for large-scale processing of user content with AI', 'Transfer impact assessment and SCCs, or provider DPF certification, for transfers outside the EEA', 'Art. 33 timing: the platform\'s 72-hour clock starts when it becomes aware, so provider contracts must give notice fast enough'],
  dpdpa: ['Consent with a Rule 3 notice, or a Section 7 legitimate use, for each activity', 'Rule 15 and Section 16 check for each provider country', 'Consent withdrawal and erasure propagated to providers and caches', 'Rule 8(3) one-year minimum for logs and traffic data, reconciled with erasure requests and zero-retention provider settings', 'Under-18 sign-ups: age gate and verifiable parental consent, or block', 'Rule 7: intimate Data Principals and the Board without delay and send the detailed report within 72 hours of becoming aware, including when the incident starts at a provider'],
};

export const VIBE_PLATFORM = [
  'Redact personal data and secrets from prompts before they reach the provider',
  'Prompt-injection defences for repository content, files and tool outputs',
  'Tenant isolation for generated apps, previews and their databases',
  'Sandboxed code execution with limited egress',
  'Safe defaults: authentication on by default, row-level security or equivalent database rules, no public storage buckets',
  'Scanning of generated code for secrets, vulnerable or hallucinated dependencies and insecure patterns',
  'Takedown and abuse handling for phishing, malware or illegal content built on the platform',
];

export const VIBE_EVIDENCE = [
  'Data flow diagram and role map for each activity',
  'Records of processing and DPIA',
  'Provider DPAs, sub-processor list and change notices',
  'Provider no-training and retention settings with screenshots and timestamps',
  'Provider SOC 2 review record with CUEC mapping and bridge letter',
  'Transfer assessments and the DPDPA cross-border register',
  'Redaction and secret-scanning configuration and test results',
  'Tenant isolation and sandbox test results',
  'Prompt-injection test results',
  'Erasure propagation test across platform, provider and caches',
  'Breach drill showing GDPR and DPDPA timelines met from a provider-origin incident',
  'Abuse and takedown log',
];

// Short form for the GDPR scenario selector (k / v steps).
export const VIBE_GDPR_STEPS = [
  { k: 'Roles', v: 'Controller for platform accounts and billing; processor for enterprise customer content and hosted app data; LLM provider is a processor or sub-processor, and becomes an independent controller if it trains on the data.' },
  { k: 'Data', v: 'Prompts, files, repository context, secrets, generated code, connected databases, logs, embeddings, caches and telemetry.' },
  { k: 'Lawful basis', v: 'Contract for the service; legitimate interests with an LIA for security and abuse prevention; customer instructions for processor activities.' },
  { k: 'DPIA', v: 'Required: large-scale processing of user content with new technology, possible special category data in prompts.' },
  { k: 'Transfers', v: 'TIA and SCCs, or provider DPF certification, for each provider region outside the EEA.' },
  { k: 'Vendor controls', v: 'DPA with flow-down, sub-processor notice, no-training terms, zero or limited retention, stated inference region, reviewed fallback models.' },
  { k: 'Breach', v: 'Provider must notify fast enough for the platform to meet Art. 33 within 72 hours of awareness.' },
  { k: 'Outcome', v: 'Ship with redaction, tenant isolation, safe defaults and a tested erasure path to the provider. Full operator view below.' },
];
