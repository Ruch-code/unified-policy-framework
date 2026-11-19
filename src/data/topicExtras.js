// Additional reference content placed in the matching sections of the site.
// Plain data, so tests and search can read it. Paraphrased guidance; check the official text before relying on it.

// ---------- Change management: hotfix and cosmetic worked examples ----------
export const CHANGE_EXAMPLES = {
  columns: ['Change type', 'SaaS example', 'How it should flow', 'Evidence the auditor asks for', 'Common finding'],
  rows: [
    ['Hotfix (emergency)', 'After Friday\'s release, the checkout API returns HTTP 500 for customers paying by card. An engineer adds a missing null check in the payment service.',
      'Incident ticket opened. Fix raised as a pull request; at least one reviewer approves if anyone is available, otherwise the on-call lead approves after deploy. Automated tests run in the pipeline. Deployed the same day. Retrospective approval and a short post-incident note within 1 to 2 business days.',
      'Population of emergency changes for the period; for each sample: incident or alert that triggered it, pull request and pipeline run, deployment timestamp, retrospective approval with date, post-incident review. Policy section defining what counts as an emergency.',
      'Hotfixes with no retrospective approval, or "emergency" used for routine work to skip review.'],
    ['Cosmetic (minor)', 'Marketing asks to change the "Start free trial" button colour and fix a typo in the pricing page footer.',
      'Ticket or request, pull request with one peer approval, automated checks and a visual check on staging, normal deploy. No CAB.',
      'Included in the full change population; for sampled items: ticket, approved pull request, passing checks, deploy record. The definition of "cosmetic" in the change policy.',
      'A "cosmetic" pull request that also changes logic (for example a form field that now skips validation). Reviewers should check the whole diff, not the title.'],
    ['Standard (pre-approved)', 'Scaling the API from 6 to 10 containers within the approved autoscaling range, or a scripted certificate rotation.',
      'Runs from the approved change model or automation; logged automatically.',
      'The approved change model, the automation config, and logs showing runs stayed inside the approved limits.',
      'Actions outside the model (for example scaling beyond limits) logged as standard instead of raised as normal changes.'],
    ['Normal', 'Adding SSO login with a new identity provider.',
      'Ticket with risk rating, design and security review where needed, pull request approval by someone other than the author, tests, staged rollout, release notes.',
      'Change population from the source of truth (repository or deployment tool, not the ticketing tool alone); for samples: ticket, approvals, segregation of author and approver, test evidence, deploy record, rollback plan for higher-risk items.',
      'Author approving their own change, or production deploys that do not trace back to an approved change.'],
  ],
  population: 'Auditors build the population from the system that deploys (Git history, CI/CD runs or cloud deploy logs), then match it to tickets. If a deploy has no ticket or approval, it is an exception even if the change was harmless.',
};

// ---------- Releasing with a known vulnerability ----------
export const VULN_RELEASE = {
  intro: 'Short answer: sometimes, but only as a recorded, time-bound risk decision by the right owner, never by default. Most programmes block a release when the issue is critical or actively exploited and reachable, and allow a release with an approved exception when the risk is low, unreachable or covered by a compensating control.',
  columns: ['Situation', 'Typical decision', 'What must exist'],
  rows: [
    ['Critical or high, on the CISA KEV list or with a public exploit, in an internet-facing path', 'Block the release (no-go)', 'Fix or remove the vulnerable component first. If the business insists, executive risk acceptance in writing, which most auditors will question.'],
    ['High, reachable, no known exploit, compensating control in place (for example WAF rule, feature flag off, input validation)', 'Conditional go', 'Risk acceptance by the system owner and security, compensating control evidence, fix date inside the remediation SLA, ticket tracked to closure.'],
    ['Medium or low, or the vulnerable function is not reachable (confirmed by reachability analysis)', 'Go, fix in normal SLA', 'Scan result, ticket with due date, exception register entry if it will exceed the SLA.'],
    ['Vulnerability in a dev or test dependency that never ships to production', 'Go', 'SBOM or build evidence showing it is not in the production artefact.'],
  ],
  factors: ['Severity (CVSS) and likelihood of exploitation (EPSS, CISA KEV)', 'Exposure: internet-facing, internal, or not reachable', 'Data at risk: customer data, PHI, card data', 'Compensating controls and how they are verified', 'Remediation SLA from policy (for example critical 7 to 15 days, high 30 days)', 'Who can accept the risk, for how long, and when it is reviewed again'],
  evidence: 'Scanner output for the release, the exception or risk acceptance with approver, reason, compensating control and expiry date, the remediation ticket, and the re-scan showing it closed.',
};

// ---------- Microservices ----------
export const MICROSERVICES = {
  intro: 'A microservices architecture splits one application into small services that each own one job (for example accounts, billing, notifications), deploy independently and talk over APIs or message queues. It speeds up teams, but it multiplies the things an auditor has to see: many repositories, pipelines, secrets, network paths and logs instead of one.',
  columns: ['Area', 'What changes with microservices', 'Control to expect', 'Evidence'],
  rows: [
    ['Inventory', 'Dozens of services, often owned by different teams', 'Service catalogue with owner, data handled and criticality', 'Service catalogue export; SBOM per service'],
    ['Change management', 'Each service has its own repo and pipeline; many deploys a day', 'Same branch protection and pipeline gates on every repo', 'Branch protection settings across repos; deploy logs per service'],
    ['Service-to-service access', 'Services call each other over the network', 'Mutual TLS or signed tokens between services; least-privilege service identities', 'Service mesh or gateway config; IAM roles per service'],
    ['Secrets', 'Each service needs its own credentials', 'Central secrets manager, no secrets in code, rotation', 'Secrets manager policies; secrets scanning results'],
    ['Logging and tracing', 'One user request crosses several services', 'Central logging with a correlation ID passed between services', 'SIEM sources list; sample trace across services'],
    ['Network', 'Many internal endpoints', 'Network policies so services only reach what they need; API gateway at the edge', 'Network policy or security group exports'],
    ['Data', 'Each service may own its own database', 'Data map per service; encryption at rest on every datastore', 'Data inventory; encryption settings per database'],
    ['Resilience', 'A failing service can cascade', 'Timeouts, retries, circuit breakers, health checks', 'Architecture review; DR test covering critical services'],
  ],
  vsMonolith: 'In a monolith there is one codebase, one deploy and one database, so evidence is simpler but a bad change affects everything. In microservices a bad change is contained to one service, but evidence must be shown to be consistent across every service.',
};

// ---------- IaaS, PaaS, SaaS ----------
export const CLOUD_MODELS = {
  columns: ['Model', 'You get', 'You manage', 'Provider manages', 'Examples', 'What to ask the provider for'],
  rows: [
    ['IaaS (Infrastructure as a Service)', 'Virtual machines, storage and networks', 'Operating system, patching, middleware, application, data, identities, network rules', 'Physical data centre, hardware, hypervisor', 'AWS EC2, Azure Virtual Machines, Google Compute Engine', 'SOC 2 report for the infrastructure; your own evidence for OS hardening, patching and network rules'],
    ['PaaS (Platform as a Service)', 'A managed runtime or database you deploy code or data into', 'Application code, data, configuration, user access', 'OS, runtime, scaling, patching of the platform', 'Heroku, Google App Engine, Azure App Service, AWS Elastic Beanstalk, Amazon RDS', 'SOC 2 report; which settings are yours (for example encryption, backups, network access)'],
    ['SaaS (Software as a Service)', 'A finished application used through a browser or API', 'Users, access, configuration, the data you put in', 'Everything else', 'Salesforce, Slack, Google Workspace, Microsoft 365, Zoom', 'SOC 2 or ISO 27001 certificate, DPA, sub-processor list; your own evidence for SSO, MFA and user access reviews'],
  ],
  note: 'The further you go from IaaS to SaaS, the less you manage, but you are always responsible for your data, who has access to it, and how you configure the service. In a SOC 2 report the provider usually appears as a carved-out subservice organisation, and its complementary user entity controls (CUECs) list what you must do yourself.',
};

// ---------- DPA, teams, BAA ----------
export const DPA_CHECKS = {
  columns: ['Clause', 'What to check', 'Source'],
  rows: [
    ['Scope of processing', 'Subject matter, duration, nature and purpose, types of personal data and categories of data subjects are described', 'GDPR Art. 28(3)'],
    ['Documented instructions', 'Processor acts only on the controller\'s documented instructions, including on transfers', 'GDPR Art. 28(3)(a)'],
    ['Confidentiality', 'Staff with access are bound by confidentiality', 'GDPR Art. 28(3)(b)'],
    ['Security measures', 'Technical and organisational measures listed (an annex, not just "industry standard")', 'GDPR Art. 28(3)(c), Art. 32'],
    ['Sub-processors', 'Prior authorisation (specific or general with notice and right to object); same obligations flowed down; current list available', 'GDPR Art. 28(2), (4)'],
    ['Data subject rights', 'Processor helps the controller answer access, deletion and other requests', 'GDPR Art. 28(3)(e)'],
    ['Breach notification', 'Processor notifies the controller without undue delay, ideally with a fixed window such as 24 to 72 hours, with the details needed', 'GDPR Art. 33(2)'],
    ['DPIA and consultation support', 'Processor helps with security, breach, DPIA and prior consultation duties', 'GDPR Art. 28(3)(f)'],
    ['End of contract', 'Data returned or deleted at the controller\'s choice, with certification', 'GDPR Art. 28(3)(g)'],
    ['Audits and information', 'Processor provides information and allows audits (often satisfied by a SOC 2 report or ISO certificate plus questionnaires)', 'GDPR Art. 28(3)(h)'],
    ['International transfers', 'Transfer mechanism named (EU SCCs, UK IDTA or Addendum, adequacy) and transfer risk assessment', 'GDPR Chapter V'],
    ['India (DPDPA)', 'Processor engaged only under a valid contract; Data Fiduciary stays responsible; security safeguards and breach intimation support for Rule 6 and 7; erasure on instruction', 'DPDP Act s.8(2); DPDP Rules 2025'],
    ['AI and analytics use', 'No use of customer data to train models or for the processor\'s own purposes unless agreed', 'Contract term (good practice)'],
  ],
};

export const DPA_TEAMS = {
  columns: ['Team', 'Responsible for', 'Typical output'],
  rows: [
    ['Business owner', 'Why the vendor is needed and what data it will get', 'Request with purpose and data categories'],
    ['Procurement or TPRM', 'Running the workflow, tiering the vendor, collecting documents', 'Vendor record, risk tier, renewal dates'],
    ['Privacy or DPO', 'Data mapping, lawful basis, transfer mechanism, DPIA when needed, DPA terms', 'Approved DPA, ROPA update, transfer assessment'],
    ['Security', 'Reviewing security controls, SOC 2 or ISO reports, pen test summaries', 'Security assessment with findings and conditions'],
    ['Legal', 'Negotiating the DPA, BAA and liability clauses', 'Executed agreements'],
    ['IT or Engineering', 'SSO, least-privilege integration, logging, offboarding the vendor', 'Integration approved; access configured'],
    ['Finance', 'Commercial approval', 'Purchase order'],
  ],
};

export const BAA_COVERAGE = {
  intro: 'A Business Associate Agreement (BAA) is required before a Covered Entity shares PHI with a vendor, and before a Business Associate shares PHI with its own subcontractor. 45 CFR 164.504(e) and 164.314(a) set what it must contain.',
  columns: ['Required term', 'What it means in practice', 'Citation'],
  rows: [
    ['Permitted uses and disclosures', 'The BA may use PHI only for the services listed, and not in a way the CE itself could not', '164.504(e)(2)(i)'],
    ['No other use or disclosure', 'Nothing beyond the contract or what the law requires', '164.504(e)(2)(ii)(A)'],
    ['Safeguards', 'Appropriate safeguards and compliance with the Security Rule for ePHI', '164.504(e)(2)(ii)(B), 164.314(a)'],
    ['Reporting', 'Report any use or disclosure not allowed by the BAA, security incidents, and breaches of unsecured PHI (within 60 days of discovery or a shorter agreed window)', '164.504(e)(2)(ii)(C), 164.410'],
    ['Subcontractors', 'Flow the same restrictions down to subcontractors through their own BAA', '164.504(e)(2)(ii)(D)'],
    ['Individual rights', 'Make PHI available for access, amendment and an accounting of disclosures', '164.504(e)(2)(ii)(E) to (G)'],
    ['Privacy Rule duties', 'If the BA carries out a CE obligation, comply with the Privacy Rule for that obligation', '164.504(e)(2)(ii)(H)'],
    ['HHS access', 'Make internal practices, books and records available to HHS', '164.504(e)(2)(ii)(I)'],
    ['Return or destroy', 'Return or destroy PHI at the end, or extend protections if that is not feasible', '164.504(e)(2)(ii)(J)'],
    ['Termination', 'The CE may end the contract if the BA materially breaches it', '164.504(e)(2)(iii)'],
  ],
  extras: 'Common additions negotiated on top: a shorter breach notice window (for example 5 to 10 days), cyber insurance, indemnity, data location, de-identification rules, and a ban on using PHI to train AI models.',
};

// ---------- SOC 1, SOC 2, SOC 3 ----------
export const SOC_COMPARE = {
  columns: ['', 'SOC 1', 'SOC 2', 'SOC 3'],
  rows: [
    ['Purpose', 'Controls relevant to customers\' financial reporting (ICFR)', 'Controls relevant to security, availability, processing integrity, confidentiality and privacy', 'A short, public summary of a SOC 2 examination'],
    ['Criteria', 'Control objectives defined by the service organisation (AT-C 320 / SSAE 18)', 'AICPA Trust Services Criteria (Security required; others chosen)', 'Same Trust Services Criteria as the SOC 2'],
    ['Audience', 'Customers\' management and their financial statement auditors', 'Customers, prospects and partners under NDA (restricted use)', 'Anyone (general use, often on the website)'],
    ['Type 1 or Type 2', 'Type 1 or Type 2', 'Type 1 or Type 2', 'Based on a Type 2 examination in practice'],
    ['Detail', 'System description, controls, tests and results', 'System description, controls, tests and results', 'Auditor opinion and management assertion, no test detail'],
    ['Typical user', 'Payroll, billing, claims processing, fund administration', 'SaaS, cloud hosting, data processors, healthcare and fintech platforms', 'Companies that want a public trust signal'],
    ['Example', 'A payroll provider whose processing feeds clients\' financial statements', 'A cloud platform showing customers its security controls', 'A SaaS company posting a seal and summary on its trust page'],
  ],
  notes: [
    'SOC 1 is not based on the Trust Services Criteria. It tests control objectives the service organisation writes, such as "payroll is processed completely and accurately".',
    'Accuracy, completeness, valuation and similar terms are financial statement assertions, not SOC 1 criteria.',
    'A company can have both: a payroll SaaS often needs a SOC 1 for its customers\' auditors and a SOC 2 for security reviews.',
  ],
};

// ---------- India to US scenarios ----------
export const INDIA_US_SCENARIOS = {
  columns: ['Scenario', 'HIPAA', 'DPDPA', 'Also consider'],
  rows: [
    ['Indian company runs medical billing (RCM) for US hospitals, staff in India access patient records', 'Applies. The company is a Business Associate (or subcontractor) of the US Covered Entity and must sign a BAA and meet the Security Rule. HIPAA follows the PHI, not the company\'s location.', 'Largely exempt. Section 17(1)(d) exempts processing of personal data of people not in India under a contract with a foreign entity, except security safeguards (s.8(5)) and a few other duties.', 'CERT-In 6-hour incident reporting for incidents on Indian systems; US state breach laws via the client; client audit rights in the BAA.'],
    ['Indian SaaS company sells a scheduling app to US clinics and stores appointment data', 'Applies as a Business Associate once it creates, receives, maintains or transmits PHI for the clinics. BAA required.', 'Same s.17(1)(d) outsourcing exemption for the US patients\' data. DPDPA fully applies to its Indian employees\' and Indian customers\' data.', 'SOC 2 is what US clinics will ask for; HITRUST for larger health systems.'],
    ['Indian health-tech app serves patients in India only, hosted in AWS Mumbai', 'Does not apply. No US Covered Entity and no US PHI.', 'Applies fully. Health data is personal data; consent, notice, security safeguards, breach intimation to the Board and affected people.', 'ABDM guidelines if integrating with the Ayushman Bharat Digital Mission; Telemedicine Practice Guidelines.'],
    ['Indian company offers a wellness app directly to US consumers (not on behalf of providers or insurers)', 'Usually does not apply, because it is not a Covered Entity or Business Associate.', 'Applies to processing in India, but the s.17(1)(d) exemption does not fit because there is no contract with a foreign entity for these users. Treat DPDPA as applying.', 'FTC Health Breach Notification Rule and state laws such as Washington\'s My Health My Data Act may apply instead of HIPAA.'],
    ['US hospital uses an Indian AI vendor to summarise clinical notes', 'Applies. The AI vendor is a Business Associate; its model provider and hosting are subcontractors needing BAAs too.', 'Outsourcing exemption for the US patients\' data, with s.8(5) security still applying.', 'BAA clause banning training on PHI; AI vendor risk assessment for the use case.'],
  ],
  rule: 'Rule of thumb: HIPAA depends on whose data it is and on whose behalf you handle it (US Covered Entities). DPDPA depends on where the processing happens and whose data it is. An Indian company serving US healthcare usually needs HIPAA through BAAs and only a narrow part of DPDPA for that data.',
};

// ---------- Encryption ----------
export const CRYPTO_COMPARE = {
  columns: ['', 'Symmetric', 'Asymmetric'],
  rows: [
    ['Keys', 'One shared secret key encrypts and decrypts', 'A key pair: public key (shared) and private key (kept secret)'],
    ['Speed', 'Fast; used for bulk data', 'Slow; used for small data such as keys and signatures'],
    ['Common algorithms', 'AES-128, AES-256 (GCM mode), ChaCha20-Poly1305', 'RSA, elliptic curve (ECDHE for key exchange, ECDSA or Ed25519 for signatures)'],
    ['Main problem', 'Getting the shared key to the other side safely', 'Too slow for large data'],
    ['Where you see it', 'Disk and database encryption at rest, the data part of a TLS session, backups', 'TLS certificates and key exchange, SSH keys, code signing, email signing'],
  ],
  aes: 'AES-256 is a symmetric block cipher with a 256-bit key. In GCM mode it also checks integrity, so tampering is detected. Its strength depends on the key: keep keys in a KMS or HSM, restrict who can use them, rotate them, and log their use.',
  tls: 'TLS 1.3 protects data in transit. It uses asymmetric cryptography only to agree on keys and prove the server\'s identity, then switches to fast symmetric encryption (AES-GCM or ChaCha20-Poly1305) for the actual data. Compared with TLS 1.2 it removes weak ciphers, needs one round trip to connect, and always uses forward secrecy (a stolen server key cannot decrypt old sessions).',
  tlsFlow: [
    ['Client hello', 'Browser sends supported ciphers and a temporary (ephemeral) key share.'],
    ['Server hello', 'Server picks a cipher and sends its own key share.'],
    ['Shared secret', 'Both sides combine key shares with ECDHE and derive the same session keys. The secret never travels on the wire.'],
    ['Certificate check', 'Server sends its certificate and a signature; the browser checks it against a trusted certificate authority.'],
    ['Encrypted data', 'Everything after this is encrypted with the symmetric session key (for example AES-256-GCM).'],
  ],
  envelopeFlow: [
    ['Data key', 'The application asks the KMS for a new data key.'],
    ['Encrypt data', 'Data is encrypted with the data key using AES-256-GCM.'],
    ['Wrap key', 'The KMS encrypts (wraps) the data key with a master key that never leaves the KMS or HSM.'],
    ['Store together', 'The encrypted data and the wrapped data key are stored together; the plain data key is discarded.'],
    ['Decrypt', 'To read, the app sends the wrapped key to the KMS, which checks permissions, logs the request and returns the data key.'],
  ],
  evidence: ['TLS scan result for public endpoints showing TLS 1.2 minimum and TLS 1.3 enabled', 'Encryption-at-rest settings for each database, bucket and backup', 'KMS key policy showing who can use and manage keys, plus rotation settings', 'Disk encryption report from MDM for laptops', 'Cryptography policy naming approved algorithms and key lengths'],
};

// ---------- Change management: mandatory evidence by change type, and the CAB ----------
// Values: Mandatory, If applicable, Not needed. "Retrospective" means captured after deploy within the agreed window.
export const CHANGE_EVIDENCE_MATRIX = {
  intro: 'What an auditor expects to see for each change type. Mandatory means a sampled change without it is an exception. Set these in the change policy so engineers know the rule before the audit, not during it.',
  columns: ['Evidence', 'Standard (pre-approved)', 'Cosmetic or minor', 'Normal', 'Major', 'Hotfix or emergency'],
  rows: [
    ['Change record (ticket or log entry) linked to the deploy', 'Mandatory (automatic log referencing the approved model)', 'Mandatory', 'Mandatory', 'Mandatory', 'Mandatory (incident ticket, can be raised during the fix)'],
    ['Classification and risk rating', 'Mandatory once, in the approved change model', 'Mandatory (why it counts as cosmetic)', 'Mandatory', 'Mandatory', 'Mandatory (why it was an emergency)'],
    ['Pull request with approval by someone other than the author', 'Not needed per change (model approved once)', 'Mandatory', 'Mandatory', 'Mandatory, including code owners and security', 'Mandatory, before deploy if anyone is available, otherwise retrospective'],
    ['Automated tests and security scans passed', 'Mandatory for the automation itself', 'Mandatory', 'Mandatory', 'Mandatory, plus regression and performance tests', 'Minimum agreed test set before deploy; full set afterwards'],
    ['UAT or business sign-off', 'Not needed', 'Not needed (visual check on staging)', 'If user-facing', 'Mandatory', 'Not needed before deploy'],
    ['Design, RFC or security review', 'Not needed', 'Not needed', 'If it touches auth, payments or personal data', 'Mandatory', 'Not needed before deploy'],
    ['Release approval', 'Not needed per change', 'Not needed beyond PR approval', 'As set in policy (release manager or lead)', 'Mandatory: CAB or senior approver', 'Named emergency approver before deploy (verbal is fine, recorded immediately)'],
    ['Rollback plan', 'In the change model', 'Not needed', 'If higher risk', 'Mandatory, rehearsed', 'Mandatory (often redeploying the previous version)'],
    ['Deployment record (pipeline run, timestamp, who deployed)', 'Mandatory (automation logs)', 'Mandatory', 'Mandatory', 'Mandatory', 'Mandatory'],
    ['Post-deploy check or smoke test', 'Logged by automation', 'Visual check', 'Mandatory', 'Mandatory', 'Mandatory'],
    ['Retrospective approval and post-incident review', 'Not needed', 'Not needed', 'Not needed', 'Not needed', 'Mandatory, within the window in policy (for example 1 to 2 business days)'],
    ['Communication to customers or support', 'Not needed', 'Not needed', 'If behaviour changes (release notes)', 'Mandatory', 'If customers were affected (status page)'],
  ],
  note: 'Whatever the type, the population comes from the system that deploys (Git history, CI/CD runs or cloud deploy logs). A deploy that has no matching record is an exception even if the change was harmless.',
};

export const CAB = {
  intro: 'A change advisory board (CAB) is a short, regular meeting where the people who understand the systems, the business and the risk review significant changes before they go live. It is not needed for every change. Pre-approved standard changes and peer-reviewed minor changes skip it; major changes and anything that touches shared infrastructure, customer data or a busy period go through it.',
  why: [
    ['Risk and impact discussion', 'Engineers see their own change; the CAB sees how it interacts with other changes, customers and dependencies. It asks what could break, who would be affected and how fast it can be rolled back.'],
    ['Scheduling and conflicts', 'Avoids two risky changes on the same night, releases during peak trading or a customer event, and changes while key people are away. It agrees maintenance windows and freeze periods.'],
    ['Readiness check', 'Confirms testing is done, the rollback plan is real, monitoring is in place and support knows what is coming.'],
    ['Communication', 'Makes sure support, customer success and, if needed, customers get notice through release notes or the status page.'],
    ['Accountability and evidence', 'Records who approved what and why. Auditors use CAB minutes as evidence of release approval and segregation of duties for major changes (SOC 2 CC8.1; ISO 27001 A.8.32).'],
    ['Learning', 'Reviews failed changes and emergency changes since the last meeting, so patterns are fixed instead of repeated.'],
  ],
  agenda: [
    'Failed changes and emergency changes since the last meeting, with root cause and follow-up',
    'Upcoming major and high-risk changes: purpose, risk rating, impact, test results, rollback plan, owner',
    'Schedule: conflicts, maintenance windows, freeze periods',
    'Decision per change: approve, approve with conditions, defer or reject, with the reason',
    'Communication actions and owners',
  ],
  attendees: 'Chair (release or change manager), engineering leads for affected services, infrastructure or SRE, security, QA, support or customer success, and a business owner for customer-facing changes. Keep it small; invite change owners only for their item.',
  evidence: 'Calendar invite or schedule, agenda, minutes with each decision and approver, the change records linked to the minutes, and attendance. For each sampled major change the auditor matches the change ticket to a CAB decision dated before the deploy.',
  startup: 'For a small company, a weekly 15-minute slot or an asynchronous approval in the ticket by a named senior approver is enough, as long as the policy says which changes need it and the approval is recorded before deploy. What matters to an auditor is that significant changes get a second, informed look with a record, not that a formal board exists.',
  pitfalls: [
    'Every change sent to CAB, so it becomes a rubber stamp and teams work around it',
    'CAB approval dated after the deploy',
    'Minutes that say "approved" without the risk discussion or conditions',
    'Major changes classified as normal to avoid CAB',
  ],
};
