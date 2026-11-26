// Field Notes: engineering practices mapped to controls and the evidence an auditor asks for.
// Drawn from public engineering write-ups (company names removed) and engagement experience.
// Control references: SOC 2 (2017 TSC), ISO/IEC 27001:2022 Annex A, ISO/IEC 42001:2023 Annex A.

export const NOTES = [
  {
    id: 'fn-dr-minimal-path',
    title: 'Why disaster recovery should be a separate minimal path, not a copy of production',
    body: [
      'Most DR plans describe a second copy of production: same services, same identity provider, same DNS, same cloud account, just in another region. On paper that looks thorough. In practice it often shares the very dependencies most likely to fail together.',
      'A large brokerage platform took a different route. Instead of mirroring everything, it asked one question: what is the single thing a customer must be able to do during a severe outage? The answer was to log in and close open positions. It built a minimal path for exactly that. The path runs on a different cloud provider, uses its own DNS, has its own two-factor login, receives a daily encrypted copy of user data and writes orders into the same order system the main platform already reads. Nothing else is included, because every extra dependency is another way for the fallback to fail.',
    ],
    lessons: [
      'Start the business impact analysis from the customer action, not the system list. Name the minimum critical function and the acceptable outage for it.',
      'Map dependencies for independence, not just redundancy. A second region behind the same identity provider is redundant but not independent.',
      'Keep one system of record. A fallback that writes to its own database creates a reconciliation problem on the day you can least afford one.',
    ],
    mapping: 'SOC 2 A1.2, A1.3, CC9.1. ISO 27001:2022 5.29 (information security during disruption), 5.30 (ICT readiness for business continuity), 8.14 (redundancy).',
    evidence: 'A BIA that names critical functions and recovery objectives; a dependency diagram for the recovery path; DR test results with dates, scope and issues found; evidence that the fallback enforces the same authentication strength; reconciliation records for any data synchronised into the fallback.',
    takeaway: 'You do not need a full second stack to pass. You need a credible, tested answer for your most critical customer action.',
  },
  {
    id: 'fn-reconciliation',
    title: 'Reconciliation automation as a SOC 2 processing integrity control',
    body: [
      'Processing integrity is the trust services category founders most often skip, and the one fintech and payments buyers ask about first. The control at its heart is simple: prove that what went in matches what came out.',
      'A trading platform kept customer orders in one database and the resulting positions in another. During outages the two drifted. The old fix was manual: wait for complaints, export data from an analytics tool that lagged production by up to 15 minutes, and run correction scripts by hand. It took two engineers 20 to 30 minutes each time and still missed records. The team replaced this with a small read-only job that joins both databases directly every 15 minutes, lists mismatches, triggers corrections through internal APIs and publishes counts to monitoring. Reported accuracy moved from about 85 percent to 99.9 percent and the process became proactive.',
    ],
    lessons: [
      'It is detective and scheduled, so it runs whether or not anyone complains.',
      'It uses read-only credentials against production, limiting blast radius.',
      'It has limits and a replication buffer, so it does not create new errors.',
      'It produces metrics, which become your evidence.',
    ],
    lessonsTitle: 'Why this is a strong control, not just good engineering',
    mapping: 'SOC 2 PI1.4, PI1.5, CC7.2, CC4.1. ISO 27001:2022 8.15, 8.16, 8.28.',
    evidence: 'The reconciliation logic and proof that changes to it go through change management; run history for the period; a sample of exceptions with proof of resolution; review of recurring exception patterns; the access scope of the service account.',
    takeaway: 'If your product moves money, orders, inventory or records between systems, write down your reconciliations now. Many already exist as scripts. Schedule them, log them and you have a control.',
  },
  {
    id: 'fn-slos',
    title: 'SLOs as evidence for your availability commitments',
    body: [
      'If your contracts promise 99.9 percent uptime, an auditor testing SOC 2 Availability will ask how you know you met it. A wall of CPU and memory alerts does not answer that. Service level objectives do.',
      'A high-traffic investing platform separated output metrics (error rate, latency, throughput, the symptoms a customer feels) from input metrics (CPU, memory, dependency errors, the causes). Alerts fire only on symptoms, using objectives such as fewer than 1 percent server errors and 99th percentile latency under one second. A breach must persist for a few minutes before anyone is paged. Cause metrics live on dashboards for debugging. Each team defines its objectives in code next to the service, reviewed in the same pull request as the feature. Monthly SLO percentages feed release governance and a customer-facing status page.',
      'For GRC this gives three things at once: a defined commitment, continuous measurement against it, and an owner.',
    ],
    mapping: 'SOC 2 A1.1, A1.2, CC7.2, CC2.3. ISO 27001:2022 8.16 (monitoring), 8.6 (capacity).',
    evidence: 'SLO definitions under version control with approvals; breach history and monthly SLO percentage for the period; alert rules and on-call records for a sample of breaches; status page history; minutes showing someone reviewed misses and acted.',
    takeaway: 'Pick three to five SLOs for the journeys customers pay for. Put them in code. Review them monthly. That one habit produces better availability evidence than any policy document.',
  },
  {
    id: 'fn-alert-fatigue',
    title: 'Alert fatigue is a control failure',
    body: [
      'Auditors often accept "we monitor 200 use cases" as evidence of CC7.2. It describes effort, not outcome. If analysts skim past alerts because most are noise, the control is not operating, whatever the dashboard shows.',
      'A security team at a large fintech used a stricter test: when something genuinely bad happens, how fast does the person who can act find out, with enough context to act? A daily digest includes only signals that fire at a rate where each one deserves a human glance. Noisy rules are excluded on purpose and tracked as a tuning backlog. Vulnerability advisories from many feeds are deduplicated, enriched and checked against the real asset inventory, so only advisories affecting deployed technology reach an engineer. An AI assistant does first-level triage, closes confirmed false positives with a written rationale and escalates stale tickets to managers. They reported roughly 80 percent lower mean time to resolve in a month when alert volume rose by over 90 percent.',
    ],
    mapping: 'SOC 2 CC7.1 to CC7.4. ISO 27001:2022 5.7 (threat intelligence), 8.8 (technical vulnerabilities), 8.16, 5.25, 5.26. Where AI closes tickets, ISO 42001 A.6.2.6.',
    evidence: 'A detection register showing active, suppressed and tuning rules with reasons; triage and response SLAs and the trend against them; applicability decisions for advisories; for AI-driven closures, the decision logic, the audit trail and a periodic human sample review.',
    takeaway: 'Fewer, better alerts with a documented tuning process is a stronger control than more alerts. Write down why each suppressed rule is suppressed.',
  },
  {
    id: 'fn-iac',
    title: 'Infrastructure as code as your change management evidence',
    body: [
      'Manual console changes (ClickOps) are one of the most common reasons change management fails in a startup audit. There is no ticket, no reviewer and no record of what the setting was before.',
      'A platform team at a large fintech solved this for cloud load balancers, which are really a bundle of several linked resources. They built one reusable, reviewed template; product teams fill in a few fields and the platform generates the right resources. Two details matter for auditors. First, naming resources by list position caused silent overwrites when an item was removed, so every resource now needs a stable name and the build fails without one. Second, an observe-only mode brings legacy resources under management without changing them, and ownership flags stop one team from altering another team\'s backends.',
      'The Engineering and Infrastructure Partnership module covers change gates and CI/CD traceability. This note adds the configuration angle: IaC turns a configuration baseline into a reviewable file.',
    ],
    mapping: 'SOC 2 CC8.1, CC7.1. ISO 27001:2022 8.9 (configuration management), 8.32 (change management), 8.31.',
    evidence: 'Repository history with peer approval for a sample of changes; pipeline logs linking commits to deployments; drift detection output; proof that console write access is restricted and break-glass use is logged; the documented baseline.',
    takeaway: 'Lock console write access early and route changes through code. Your change evidence then generates itself.',
  },
  {
    id: 'fn-post-incident',
    title: 'Post-incident reviews that auditors actually trust',
    body: [
      'An incident report that says "root cause: human error, action: be more careful" rarely survives audit scrutiny. Good reviews read like an investigation.',
      'After redesigning a high-traffic portfolio page, one engineering team published three production issues with unusual candour. In one, a cache was refreshed a fraction of a second before a database transaction committed, so a few users saw stale holdings marked as fresh. The team rolled back within minutes, reproduced the race in a production-like integration test, and moved the refresh to after commit. In another, a latency metric blamed the message queue, but its clock started before the message was even published; the real delay was upstream. In the third, database CPU kept rising until query analysis found a missing covering index, cutting peak CPU from about 72 percent to 16 percent after extra hardware had only bought time.',
    ],
    lessonsTitle: 'What makes reviews like these credible',
    lessons: [
      'A clear timeline from detection to rollback to fix.',
      'A tested root cause, reproduced rather than guessed.',
      'A corrective action that changes a system, such as a new test, not only a reminder.',
      'An honest note on what monitoring missed.',
    ],
    mapping: 'SOC 2 CC7.3, CC7.4, CC7.5, CC8.1. ISO 27001:2022 5.24 to 5.27, 8.29, 8.32.',
    evidence: 'Incident tickets with timestamps; evidence of rollback; the RCA; linked change records for the fix; proof that corrective actions were completed and tracked.',
  },
  {
    id: 'fn-ai-data-agent',
    title: 'Governing internal AI data agents under ISO 42001',
    body: [
      'Internal AI agents that answer questions about company data are spreading fast. They are often deployed as productivity tools and never enter the AI inventory. Under ISO 42001 they should.',
      'One data team built an agent that answers questions such as daily active users or what happened to a specific customer. Its design is a useful governance pattern. The agent does not query raw tables freely; it walks a governed data catalogue with lineage, so each answer traces to a named source. Candidate sources are ranked, attempts are bounded, and the agent stops rather than guessing. Human corrections are welcome but pass a quality check before the catalogue changes.',
    ],
    lessonsTitle: 'Questions to ask before approving such an agent',
    lessons: [
      'What data can it reach, and does that match the requester\'s own access?',
      'Can it return customer-level personal data, and is that logged?',
      'How is accuracy measured, and who reviews wrong answers?',
      'Who approves changes to the catalogue it relies on?',
    ],
    mapping: 'ISO 42001 A.5 (impact assessment), A.6.2.6, A.7.4, A.7.5, A.9.2. ISO 27001:2022 5.12, 5.15, 8.3, 8.15. DPDPA purpose limitation where personal data is involved.',
    evidence: 'The AI inventory entry and impact assessment; access design; lineage and source records; the correction approval log; accuracy and refusal monitoring; logs of queries touching personal data.',
  },
  {
    id: 'fn-payment-vendors',
    title: 'When no vendor can tell you the truth: payment flows and third-party risk',
    body: [
      'Vendor reviews usually ask whether a supplier is secure. For payment flows the harder question is whether you can prove where every unit of money is when suppliers disagree or stay silent.',
      'A platform moving customer funds abroad found that pooled international wires carry many customers\' money, and the receiving broker cannot say whose. So the platform keeps its own append-only record of what each wire contained. It follows four rules: never call an external service inside a database transaction; record intent before calling a provider; accept an event only if it is a legal next state; and attach an idempotency key to every money-moving call. A timeout is treated as unknown, never as failure, because retrying an unknown can send money twice. Vendor status codes are stored beside the platform\'s own states, and every vendor sits behind an interface so it can be replaced.',
    ],
    mapping: 'SOC 2 CC9.2, PI1.3 to PI1.5. ISO 27001:2022 5.19 to 5.22, 5.23 for cloud services, 8.28.',
    evidence: 'Vendor inventory with criticality; contracts covering data, reporting and exit; end-to-end transaction traces for a sample; reconciliation reports and exception handling; evidence of how duplicate or out-of-order events are handled.',
  },
];

// [topic, summary, engineering principle, control mapping, evidence]
export const PRACTICES = [
  ['Real-time feature store: architecture', 'Events flow through a message bus into a stream processor that computes per-customer features, validates them at a separate serving layer and writes them to a low-latency store behind one read API.', 'Separate computation from serving, and validate output before it reaches the online store.', 'SOC 2 PI1.2, PI1.3; ISO 27001 8.25, 8.28; ISO 42001 A.7.4', 'Data flow diagram; validation rules; rejected-record logs; retention (TTL) setting for stored features'],
  ['Real-time feature store: reliability', 'Overlapping time windows absorb late jobs, checkpoints let streaming jobs resume, intake is capped per cycle, and each pipeline is monitored on its own.', 'Design for late data and failure up front; monitor at the unit that can fail independently.', 'SOC 2 A1.1, A1.2, CC7.2; ISO 27001 8.6, 8.13, 8.16', 'Recovery design and test results; checkpoint storage configuration; per-pipeline lag metrics; alert rules'],
  ['Internal AI data navigation agent', 'An agent answers data questions by walking a governed catalogue with lineage, ranks sources, stops after bounded attempts and accepts corrections only through a quality gate.', 'Ground AI answers in governed metadata; prefer no answer over a confident wrong one.', 'ISO 42001 A.6.2.6, A.7.5, A.9.2; ISO 27001 5.12, 5.15, 8.3; SOC 2 CC6.1', 'AI inventory entry; agent access scope; lineage records; correction approval log; accuracy and refusal monitoring'],
  ['Cross-border payment tracking', 'Pooled wires carry many customers\' money, so the platform keeps its own append-only record, writes intent before calling providers, uses idempotency keys and treats timeouts as unknown.', 'Be your own source of truth when no third party can be; make double payment impossible by design.', 'SOC 2 PI1.3 to PI1.5, CC9.2; ISO 27001 5.19 to 5.22, 8.28', 'State machine documentation; idempotency design; reconciliation reports and exception queues; vendor status mapping; sample traces'],
  ['Message-bus storage cost optimisation', 'Streaming clusters moved from fixed disks to pooled, thin-provisioned storage sized from measured peaks, with written thresholds to grow and shrink.', 'Size capacity from measurement, and keep recovery headroom explicit when cutting cost.', 'SOC 2 A1.1; ISO 27001 8.6, 8.14', 'Capacity plan; utilisation trends; documented thresholds; change records for each resize'],
  ['Boot disks and reclaiming deleted blocks', 'Deleted temporary data kept counting as used in pooled storage until a scheduled trim job told the storage layer the blocks were free.', 'Deletion is not reclamation until verified at the layer that stores and bills the data.', 'ISO 27001 8.10, 8.6, 7.14; SOC 2 C1.2, A1.1', 'Trim job configuration and run logs; usage reconciliation; policy that durable data never lives on scratch volumes'],
  ['Disaster-resilient minimal path', 'A stripped-down second path on a different cloud lets customers log in with two factors and close positions if the main platform, DNS or cloud is down.', 'Recovery should be a separate minimal path with independent dependencies.', 'SOC 2 A1.2, A1.3, CC9.1; ISO 27001 5.29, 5.30, 8.14; ISO 22301', 'BIA naming the critical function; dependency map; DR test reports; encrypted sync and reconciliation logs; MFA on the fallback'],
  ['Change-aware holdings service', 'Most users do not trade on a given day, so the service returns not-modified unless a change event invalidated a stored fingerprint.', 'Avoid unnecessary work before optimising it; measure real behaviour first.', 'SOC 2 A1.1; ISO 27001 8.6, 8.27', 'Architecture decision record; load test results; capacity metrics before and after'],
  ['Production incidents after a revamp', 'A cache refreshed before commit, a latency metric measured from the wrong point, and CPU growth from a missing index; rollback within minutes and root causes fixed.', 'Fast rollback, production-like testing, and know what a metric measures.', 'SOC 2 CC7.3 to CC7.5, CC8.1; ISO 27001 5.24 to 5.27, 8.29, 8.32', 'Incident tickets; rollback record; RCA; new integration test; change record for the fix'],
  ['Cyber defence without alert fatigue', 'Daily digest of useful signals only, advisories checked against the real asset inventory, AI first-level triage, noisy root causes fixed as missing guardrails.', 'Measure detection by time to useful action, not volume of sources.', 'SOC 2 CC7.1 to CC7.4; ISO 27001 5.7, 8.8, 8.16, 5.25, 5.26; ISO 42001 A.6.2.6', 'Detection register with suppressed rules and reasons; tuning backlog; triage SLAs and MTTR trend; AI closure audit trail'],
  ['Infrastructure as code replacing ClickOps', 'Load balancers built from one reviewed template, with stable resource names, an observe-only import mode and early validation.', 'Make the safe path the easy path; fail loudly rather than drift silently.', 'SOC 2 CC8.1, CC7.1; ISO 27001 8.9, 8.32, 8.31', 'Template history and PR approvals; pipeline logs; drift reports; restricted console write access'],
  ['SLO-driven observability', 'Alerts fire on customer-facing symptoms against objectives defined in code beside each service; breaches feed monthly governance and status pages.', 'Alert on symptoms, debug with causes; reliability targets belong to the owning team.', 'SOC 2 A1.1, A1.2, CC7.2, CC2.3; ISO 27001 8.16, 8.6', 'SLO definitions in version control; breach history; alert rules; status page history; governance minutes'],
  ['Automated database reconciliation', 'A read-only engine joins orders and positions every 15 minutes, finds mismatches and triggers corrections, replacing a manual fix.', 'Automate detective controls and run them on a schedule.', 'SOC 2 PI1.4, PI1.5, CC7.2, CC4.1; ISO 27001 8.15, 8.16', 'Reconciliation logic under change control; run logs and exception counts; read-only credentials; exception review'],
];

// [practice, SOC 2, ISO 27001, evidence]
export const CONTROL_MAP = [
  ['Minimal independent DR path', 'A1.2, A1.3, CC9.1', '5.29, 5.30, 8.14', 'BIA, dependency map, DR test report'],
  ['Scheduled reconciliation jobs', 'PI1.4, PI1.5, CC7.2', '8.15, 8.16', 'Run logs, exception samples, change history of logic'],
  ['SLOs defined in code', 'A1.1, A1.2, CC7.2, CC2.3', '8.16, 8.6', 'SLO files, breach history, status page'],
  ['Curated alerting and tuning backlog', 'CC7.2, CC7.3', '8.16, 5.25', 'Detection register, suppressed rules with reasons, MTTR trend'],
  ['Advisory triage against asset inventory', 'CC7.1', '5.7, 8.8, 5.9', 'Applicability decisions, tickets, asset inventory'],
  ['Infrastructure as code', 'CC8.1, CC7.1', '8.9, 8.32', 'PR approvals, pipeline logs, drift reports'],
  ['Post-incident review with tested root cause', 'CC7.4, CC7.5', '5.26, 5.27', 'Incident timeline, RCA, corrective action tracker'],
  ['Capacity planning from measured peaks', 'A1.1', '8.6', 'Capacity plan, utilisation trends, resize change records'],
  ['Verified deletion and reclamation', 'C1.2', '8.10, 7.14', 'Wipe or trim job logs, storage reconciliation'],
  ['Idempotent money movement', 'PI1.3, CC9.2', '5.19 to 5.22, 8.28', 'Design docs, transaction traces, reconciliation'],
  ['Streaming checkpoints and backpressure', 'A1.2, PI1.3', '8.13, 8.6', 'Recovery test, per-pipeline lag metrics'],
  ['Governed AI data agent', 'CC6.1', '5.15, 8.3 (plus ISO 42001 A.6.2.6, A.7.5)', 'AI inventory, access scope, correction log'],
];

export const CHECKLISTS = [
  ['A. Disaster recovery readiness', [
    'Critical customer functions named in a BIA, each with RTO and RPO',
    'Recovery path dependencies listed: DNS, identity, cloud, payment and messaging providers',
    'At least one critical function can run without the primary identity provider or primary cloud',
    'Recovery path enforces the same authentication strength as production',
    'Single system of record, or documented reconciliation for synchronised data',
    'Backups encrypted; restore tested in the last 12 months with results recorded',
    'DR test plan with scope, date, participants, issues found and remediation owners',
    'Contact tree and customer communication templates tested',
    'Plan reviewed after every major architecture change',
  ]],
  ['B. Change management', [
    'Production infrastructure defined as code; console write access restricted and logged',
    'Every change linked to a ticket or pull request with peer approval',
    'Author cannot approve and deploy their own change alone',
    'Automated tests and validation fail the build before deployment',
    'Stable resource identifiers so edits cannot silently overwrite other resources',
    'Rollback path documented and exercised',
    'Emergency change process with retrospective approval within a set window',
    'Drift detection runs on a schedule and differences are investigated',
    'Fixes after incidents link back to the incident record',
  ]],
  ['C. Monitoring and alerting', [
    'SLOs defined for customer-facing journeys and stored in version control',
    'Paging alerts based on symptoms, with a minimum breach duration',
    'Cause metrics on dashboards for debugging',
    'Detection register lists active, suppressed and tuning rules with reasons',
    'Every alert has an owner and a runbook',
    'Alert volume and false positive rate reviewed monthly',
    'Repeat alerts trigger a root-cause fix or guardrail, not only tuning',
    'Monitoring at the level that fails independently (per pipeline, queue or tenant)',
    'MTTR and SLO percentage reported to leadership',
  ]],
  ['D. Vendor and payment-flow risk', [
    'Vendor inventory with criticality and data shared',
    'Contracts cover security, incident notice, audit rights, data return and exit',
    'SOC 2 or ISO reports reviewed annually, with bridge letters and complementary user entity controls mapped',
    'Every money-moving call carries an idempotency key',
    'Intent recorded before external calls; timeouts treated as unknown',
    'Vendor statuses mapped to internal states at one boundary',
    'Daily reconciliation against vendor and bank records, with an exception queue and owner',
    'Vendor replaceable without rewriting core logic (exit plan)',
    'Concentration risk recorded where one vendor is a single point of failure',
  ]],
  ['E. AI agent governance (ISO 42001 aligned)', [
    'Agent recorded in the AI system inventory with an owner and purpose',
    'Impact assessment completed, including personal data and customer impact',
    'Agent access no broader than the requesting user\'s access',
    'Answers trace to governed sources with lineage',
    'Bounded retries and a defined "no answer" behaviour',
    'Human corrections pass an approval gate before changing source metadata',
    'Prompts, queries and outputs logged, with retention defined',
    'Accuracy, refusal rate and incidents monitored and reviewed',
    'Where the agent closes tickets or takes actions, a periodic human sample review',
    'Change control for model, prompt and tool changes',
  ]],
];
