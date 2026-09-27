import React, { useState } from 'react';
import {
  ScrollText, ShieldCheck, Activity, Database, Lock, EyeOff, CheckCircle, MinusCircle, Info,
} from 'lucide-react';

const TSC_MATRIX = [
  {
    category: 'Security — Common Criteria (CC1–CC9)',
    icon: ShieldCheck,
    intro:
      'The common criteria define whether controls exist and operate to achieve the entity\'s security objectives. CC1–CC5 are the 17 COSO (2013) internal-control principles; CC6–CC9 are the supplemental control-activity criteria AICPA added on top. Every SOC 2 report — whichever categories you pursue — must be built on these criteria, so every CC series is always in scope.',
    color: 'indigo',
    scope: 'core',
    series: [
      {
        ref: 'CC1', title: 'Control Environment', note: 'COSO Principles 1–5',
        criteria: [
          { ref: 'CC1.1', title: 'Commitment to integrity and ethical values' },
          { ref: 'CC1.2', title: 'Board independence and oversight of internal control' },
          { ref: 'CC1.3', title: 'Structures, reporting lines, authorities, and responsibilities' },
          { ref: 'CC1.4', title: 'Commitment to attract, develop, and retain competent people' },
          { ref: 'CC1.5', title: 'Accountability for internal-control responsibilities' },
        ],
        checks: [
          'Verify formal (even lightweight) security governance: a named owner, policy approval path, and an escalation line to the board / investors with oversight.',
          'Confirm the founding team models integrity — ethics expectations and a no-blame security-reporting culture in writing.',
          'Check that security duties and accountability are assigned to named people (RACI / role chart), not implied.',
        ],
        questions: [
          'Who is ultimately accountable for security, and where is that written down?',
          'If a compliance failure involved a founder, who adjudicates it?',
        ],
      },
      {
        ref: 'CC2', title: 'Communication & Information', note: 'COSO Principles 13–15',
        criteria: [
          { ref: 'CC2.1', title: 'Obtains and uses quality information to support internal control' },
          { ref: 'CC2.2', title: 'Communicates internal-control objectives and responsibilities internally' },
          { ref: 'CC2.3', title: 'Communicates with external parties on control-relevant matters' },
        ],
        checks: [
          'Confirm staff can actually find and understand the policies (policy library, onboarding training that references them).',
          'Check control-relevant information (access rights, incident reports, risk register) flows to the people who need it.',
          'Verify external communication expectations are documented (support SLAs, breach-notification contacts, customer audit rights).',
        ],
        questions: [
          'Ask a new hire to find the information-security policy — how long does it take?',
          'When the policy set changes, how is that communicated to the team?',
        ],
      },
      {
        ref: 'CC3', title: 'Risk Assessment', note: 'COSO Principles 6–9',
        criteria: [
          { ref: 'CC3.1', title: 'Specifies objectives with sufficient clarity' },
          { ref: 'CC3.2', title: 'Identifies and analyzes risks to the objectives' },
          { ref: 'CC3.3', title: 'Considers the potential for fraud in assessing risks' },
          { ref: 'CC3.4', title: 'Identifies and assesses significant changes that affect the system' },
        ],
        checks: [
          'Confirm a risk assessment exists (threat + vulnerability analysis) covering the systems and data in scope, with owners and scores.',
          'Check that security objectives map to concrete commitments (e.g., protect customer data → access control, encryption, monitoring).',
          'Verify the assessment is refreshed on significant change — new cloud region, new product line, new sub-processor, new regulation.',
          'Confirm fraud / insider-abuse risk was at least considered in the risk analysis.',
        ],
        questions: [
          'What are the top five risks in your register right now, and who owns them?',
          'When you onboarded your last sub-processor, did you re-run the risk assessment?',
        ],
      },
      {
        ref: 'CC4', title: 'Monitoring of Controls', note: 'COSO Principles 16–17',
        criteria: [
          { ref: 'CC4.1', title: 'Ongoing and separate evaluations of control operation' },
          { ref: 'CC4.2', title: 'Timely evaluation and communication of deficiencies' },
        ],
        checks: [
          'Confirm controls are monitored over time (recurring checks, automated alerts, quarterly control reviews) — not just designed once.',
          'Check for a defined process to log, escalate, and fix control failures (deficiency register with owners and deadlines).',
          'Verify monitoring results feed back into control design and the risk register.',
        ],
        questions: [
          'When an access review is missed, who gets notified and how soon?',
          'Show me the last deficiency you found and the evidence it was remediated.',
        ],
      },
      {
        ref: 'CC5', title: 'Control Activities', note: 'COSO Principles 10–12',
        criteria: [
          { ref: 'CC5.1', title: 'Selects and develops control activities that mitigate risk' },
          { ref: 'CC5.2', title: 'Develops general control activities over technology' },
          { ref: 'CC5.3', title: 'Deploys controls through policies and procedures' },
        ],
        checks: [
          'Confirm each significant risk has documented control activities — policy → procedure → tool.',
          'Check that technology controls (access, change, operations) are deliberately designed rather than accidental.',
          'Verify policies are enforced by procedures people actually follow, not documents on a shelf.',
        ],
        questions: [
          'For your highest-risk process (e.g., production access), walk me from policy to the actual control.',
          'Which controls rely on memory or a single person, and what happens when they are unavailable?',
        ],
      },
      {
        ref: 'CC6', title: 'Logical & Physical Access', note: 'Supplemental control-activity criteria',
        criteria: [
          { ref: 'CC6.1', title: 'Logical access security software, infrastructure, and architectures' },
          { ref: 'CC6.2', title: 'Users identified and authenticated before access' },
          { ref: 'CC6.3', title: 'User access authorized — least privilege, roles, segregation' },
          { ref: 'CC6.4', title: 'Physical access restricted to facilities and protected assets' },
          { ref: 'CC6.5', title: 'Access to offline backups restricted and cut off when assets retire' },
          { ref: 'CC6.6', title: 'Encryption and protective measures at rest, in transit, during processing' },
          { ref: 'CC6.7', title: 'Transmission, movement, and removal of information restricted and protected' },
          { ref: 'CC6.8', title: 'Prevents/detects and acts on unauthorized or malicious software' },
        ],
        checks: [
          'Confirm SSO + MFA org-wide, JIT / least-privilege for production, and offboarding that removes access everywhere within an SLA.',
          'Verify encryption at rest (KMS, encrypted volumes/DBs) and in transit (TLS 1.2+), with key rotation; backups encrypted and access-restricted.',
          'Check physical controls by model: cloud provider for infrastructure (cite their controls), MDM + lock/clear-screen for offices, landlord for co-working.',
          'Confirm malware protection (EDR) is deployed and detections are triaged, and that removable-media / bulk transfer of sensitive data is controlled.',
          'Sample a recent offboarding and the latest quarterly access review as evidence.',
        ],
        questions: [
          'Can any single person read the customer DB without leaving a trace?',
          'If an engineer moved 5GB of customer data out of the environment, would you detect it?',
          'Where can encryption keys be used, and who rotates them?',
        ],
      },
      {
        ref: 'CC7', title: 'System Operations', note: 'Supplemental control-activity criteria',
        criteria: [
          { ref: 'CC7.1', title: 'System components monitored for anomalies, vulnerabilities, and breaches' },
          { ref: 'CC7.2', title: 'Security incidents detected, investigated, and responded to' },
          { ref: 'CC7.3', title: 'Security events evaluated for impact on commitments' },
          { ref: 'CC7.4', title: 'Incident response — contain, remediate, communicate to stakeholders' },
          { ref: 'CC7.5', title: 'Recovery and continuity activities identified and implemented' },
        ],
        checks: [
          'Confirm central logging + alerting for key events (auth failures, admin actions, data access, anomalous traffic).',
          'Check an incident-response runbook exists: roles, on-call, contacts, SLAs, and preservable evidence steps.',
          'Verify a tabletop / drill or real incident occurred recently with lessons captured and actions tracked to closure.',
          'Confirm recovery / continuity activities exist and are rehearsed (restore test or failover drill).',
        ],
        questions: [
          'Walk me through a suspected breach tonight — who gets paged, what is preserved, who decides on notification?',
          'Which security-relevant event could happen today without setting off any alert?',
        ],
      },
      {
        ref: 'CC8', title: 'Change Management', note: 'Supplemental control-activity criteria',
        criteria: [
          { ref: 'CC8.1', title: 'Changes to infrastructure, data, software, and procedures are authorized, designed, tested, approved, and released' },
        ],
        checks: [
          'Confirm production changes flow through review (branch protection, approvals) and automated rollout with rollback.',
          'Check change records exist (PRs, deploy logs) and emergency changes still receive post-hoc approval within a defined window.',
          'Verify infrastructure and secrets are managed as code so configuration changes are versioned, tested, and auditable.',
        ],
        questions: [
          'Can a developer push to production with no approval and no record?',
          'Show me a recent emergency change — was it reviewed after the fact, and by whom?',
        ],
      },
      {
        ref: 'CC9', title: 'Risk Mitigation', note: 'Supplemental control-activity criteria',
        criteria: [
          { ref: 'CC9.1', title: 'Identifies, selects, and develops risk-mitigation activities' },
          { ref: 'CC9.2', title: 'Assesses and manages risks from vendors, business partners, and third parties' },
        ],
        checks: [
          'Confirm risks are mitigated with tangible activities (not just accepted) — controls mapped back to the register.',
          'Check vendor and third-party categories are identified (SaaS, cloud, sub-processors, contractors) with DPAs / BAA and risk-based assessment.',
          'Verify third-party risk views are refreshed when the vendor portfolio changes.',
        ],
        questions: [
          'Which vendors could take down production or leak customer data, and what would you do about it?',
          'How do you decide a vendor needs a full security review versus a questionnaire?',
        ],
      },
    ],
  },
  {
    category: 'Availability (A1)',
    icon: Activity,
    intro:
      'The availability category evaluates control design and operating effectiveness for uptime, continuity, and recovery. Requires the common criteria PLUS the A1 supplemental series in scope whenever the report covers Availability.',
    color: 'emerald',
    scope: 'optional',
    series: [
      {
        ref: 'A1', title: 'Availability', note: 'Supplemental criteria for the Availability category',
        criteria: [
          { ref: 'A1.1', title: 'Processing capacity and usage maintained, monitored, and evaluated' },
          { ref: 'A1.2', title: 'Components authorized, designed, developed, or acquired to meet availability commitments' },
          { ref: 'A1.3', title: 'Recovery, continuity, and capacity turnaround tested to meet commitments' },
        ],
        checks: [
          'Confirm availability commitments per system (uptime SLAs in contracts) are documented and match the architecture (multi-AZ / redundancy).',
          'Check capacity-monitoring alerts exist (CPU, quota, cost) with owners who act on them.',
          'Verify a DR / continuity plan with RTO and RPO, and a restore or failover exercised in the last year.',
          'Backups automated, encrypted, isolated from production, and restore-tested.',
        ],
        questions: [
          'If a cloud region died for 12 hours, which commitments do you break?',
          'When did you last fail over on purpose, and what surprised you?',
        ],
      },
    ],
  },
  {
    category: 'Processing Integrity (PI1–PI9)',
    icon: Database,
    intro:
      'Evaluates whether processing is complete, accurate, timely, and authorized end-to-end: input, processing, transmission, output, and storage. In scope only when the report includes Processing Integrity — typical for SaaS, payments, reconciliation, and data-transform products.',
    color: 'cyan',
    scope: 'optional',
    series: [
      {
        ref: 'PI1.1', title: 'Accurate, complete, timely processing', note: 'Over the provision of services',
        criteria: [
          { ref: 'PI1.1', title: 'Information about processing obtained, generated, used, and communicated accurately, completely, timely' },
        ],
        checks: [
          'Identify which processing is in scope (billing, reconciliations, transformations) and document expected vs actual output.',
          'Confirm processing integrity commitments are known to the people who run the processing.',
        ],
        questions: [
          'What does “complete and accurate” mean for your most important processing job?',
        ],
      },
      {
        ref: 'PI2', title: 'Input and Processing Controls', note: 'Over the provision of services',
        criteria: [
          { ref: 'PI2.1', title: 'Inputs complete, accurate, appropriate, and authorized' },
          { ref: 'PI2.2', title: 'Processing complete, accurate, appropriate, and authorized' },
        ],
        checks: [
          'Confirm input validation and authorization at system boundaries (schema / range checks, authenticated input paths).',
          'Check error handling: rejected or failed jobs are captured in an error queue with owners and SLAs.',
        ],
        questions: [
          'Can malformed or unauthorized data enter your pipeline without being caught?',
        ],
      },
      {
        ref: 'PI3.1', title: 'Transmission Integrity', note: 'Over the provision of services',
        criteria: [
          { ref: 'PI3.1', title: 'Data integrity maintained during transmission; deviations detected and corrected' },
        ],
        checks: [
          'Verify integrity controls during data movement (TLS, checksums / hashing, message validation).',
          'Check that transmission failures or corruption are detected and logged, not silently dropped.',
        ],
        questions: [
          'If a batch transfer silently corrupted 1% of records, how would you find out?',
        ],
      },
      {
        ref: 'PI4.1', title: 'Output Integrity', note: 'Over the provision of services',
        criteria: [
          { ref: 'PI4.1', title: 'Outputs complete, accurate, appropriate, and authorized' },
        ],
        checks: [
          'Confirm outputs (reports, statements, exports) are verified as complete and accurate before release.',
          'Check output distribution is authorized and logged.',
        ],
        questions: [
          'What happened the last time an output went out inaccurate — how was it caught?',
        ],
      },
      {
        ref: 'PI5.1', title: 'Storage & Retrieval Integrity', note: 'Over the provision of services',
        criteria: [
          { ref: 'PI5.1', title: 'Data integrity maintained during storage, retrieval, and maintenance' },
        ],
        checks: [
          'Verify data-at-rest integrity (encryption, checksums on durable stores, integrity monitoring).',
          'Check maintenance windows on stores do not quietly corrupt or alter retained data.',
        ],
        questions: [
          'What guarantees that data written today is still intact and unmodified next year?',
        ],
      },
      {
        ref: 'PI6.1', title: 'Commitments & Availability of Processing', note: 'Over the provision of services',
        criteria: [
          { ref: 'PI6.1', title: 'Processing-integrity commitments communicated and system available to users' },
        ],
        checks: [
          'Confirm customers/users are told what processing integrity they can rely on (SLA, commitments).',
          'Check the system is available to authorized users per those commitments.',
        ],
        questions: [
          'Where do you commit to processing integrity for customers — contract, status page, docs?',
        ],
      },
      {
        ref: 'PI7.1', title: 'Minimize Processing Deviations', note: 'Over the provision of services',
        criteria: [
          { ref: 'PI7.1', title: 'Design and configuration minimize processing deviations' },
        ],
        checks: [
          'Confirm systems are configured and built to reduce deviation (idempotency, schema constraints, validation by design).',
          'Check for monitoring that flags deviation-prone paths (unhandled edge cases, schema drift).',
        ],
        questions: [
          'What in your pipeline is most likely to deviate, and what stops it?',
        ],
      },
      {
        ref: 'PI8.1', title: 'Deviation Detection & Response', note: 'Over the provision of services',
        criteria: [
          { ref: 'PI8.1', title: 'Processing deviations detected, investigated, and communicated' },
        ],
        checks: [
          'Confirm processing-deviation monitoring (failed jobs, reconciliation breaks, data-quality alerts) is in place.',
          'Check deviations are investigated with root cause and communicated to affected parties.',
        ],
        questions: [
          'Who owns the error queue, and how fast do breaks get investigated?',
        ],
      },
      {
        ref: 'PI9.1', title: 'Corrective Action', note: 'Over the provision of services',
        criteria: [
          { ref: 'PI9.1', title: 'Corrective action addresses processing deviations and root causes' },
        ],
        checks: [
          'Verify a remediation process converts deviations into fixes with owners and deadlines.',
          'Check there is evidence deviations were actually corrected, not just acknowledged.',
        ],
        questions: [
          'Show me a processing deviation that was truly fixed — what was the root cause?',
        ],
      },
    ],
  },
  {
    category: 'Confidentiality (C1)',
    icon: Lock,
    intro:
      'Evaluates whether confidential information is identified, maintained, restricted, and securely disposed throughout its lifecycle. Requires CC + C1. In scope only when the report includes Confidentiality — common when the company processes non-public data under NDA (pricing, source code, roadmap, trade secrets).',
    color: 'amber',
    scope: 'optional',
    series: [
      {
        ref: 'C1', title: 'Confidentiality', note: 'Supplemental criteria for the Confidentiality category',
        criteria: [
          { ref: 'C1.1', title: 'Confidential information identified and maintained to meet commitments' },
          { ref: 'C1.2', title: 'Confidential information disposed of to meet commitments' },
        ],
        checks: [
          'Confirm confidential-information types are identified and classified (customer data under NDA, pricing, source code, trade secrets).',
          'Check access to confidential data is restricted and logged, with encryption where commitments require it.',
          'Verify disposal / destruction of confidential information (crypto-erase, deletion lifecycle) works end-to-end.',
        ],
        questions: [
          'Which information do you promise to keep confidential, and where is that committed?',
          'What happens to confidential data when a customer contract ends?',
        ],
      },
    ],
  },
  {
    category: 'Privacy (P1–P8)',
    icon: EyeOff,
    intro:
      'Evaluates how personal information is collected, used, retained, disclosed, and disposed — notice, choice and consent, access, and breach notification. Aligns with GDPR / DPDPA-style obligations. Requires CC + the P supplemental criteria; in scope only when the report includes Privacy (AICPA expects it whenever the entity processes personal information).',
    color: 'purple',
    scope: 'optional',
    series: [
      {
        ref: 'P1', title: 'Notice', note: 'Privacy concept',
        criteria: [{ ref: 'P1.1', title: 'Notice of privacy practices provided and kept up to date' }],
        checks: [
          'Confirm a privacy notice exists at every collection point and covers what is collected, why, third parties, data-subject rights, and retention.',
          'Check the notice is updated and communicated when practices change.',
        ],
        questions: [
          'Where does a user learn what you do with their data, and can they see the current version?',
        ],
      },
      {
        ref: 'P2', title: 'Choice & Consent', note: 'Privacy concept',
        criteria: [{ ref: 'P2.1', title: 'Choices communicated and explicit consent obtained where required' }],
        checks: [
          'Check consent / choice mechanisms where required (opt-in for marketing, cookie management) and that lawful basis is documented.',
          'Confirm the basis for implicit consent is documented and reproducible.',
        ],
        questions: [
          'Which of your processing relies on explicit consent, and how is that consent recorded?',
        ],
      },
      {
        ref: 'P3', title: 'Collection', note: 'Privacy concept',
        criteria: [
          { ref: 'P3.1', title: 'Collection consistent with privacy objectives and limited to the notice' },
          { ref: 'P3.2', title: 'Explicit consent obtained before collection when required' },
        ],
        checks: [
          'Confirm collection is limited to what the notice describes (data minimization in practice).',
          'Check collection points are inventoried and consistent with the notice, including cookies / trackers.',
        ],
        questions: [
          'What personal data is collected by tools you never mention in the notice?',
        ],
      },
      {
        ref: 'P4', title: 'Use, Retention & Disposal', note: 'Privacy concept',
        criteria: [
          { ref: 'P4.1', title: 'Use limited to the purposes identified in the notice' },
          { ref: 'P4.2', title: 'Retention consistent with the notice and objectives' },
          { ref: 'P4.3', title: 'Secure disposal of personal information' },
        ],
        checks: [
          'Verify purpose-limitation: personal data is used only as the notice states (processing-activity register).',
          'Check retention schedules per data type and automated deletion / anonymization on expiry.',
          'Confirm secure disposal (crypto-erase, sanitization) is exercised and logged.',
        ],
        questions: [
          'What happens to a user’s data 90 days after they delete their account?',
        ],
      },
      {
        ref: 'P5', title: 'Access & Correction', note: 'Privacy concept',
        criteria: [
          { ref: 'P5.1', title: 'Data subjects given access to stored personal information' },
          { ref: 'P5.2', title: 'Corrections, amendments, and appends processed and communicated' },
        ],
        checks: [
          'Confirm a DSAR intake path exists, with identity verification and response within statutory timelines (GDPR 30 days, DPDPA 45 days).',
          'Check correction requests update records and are communicated to third parties that received the data.',
          'Verify denials are documented with reasons and communicated.',
        ],
        questions: [
          'If a user asked today for every record you hold about them, how fast could you deliver?',
        ],
      },
      {
        ref: 'P6', title: 'Disclosure & Notification', note: 'Privacy concept',
        criteria: [
          { ref: 'P6.1', title: 'Disclosure to third parties with explicit consent' },
          { ref: 'P6.2', title: 'Complete, accurate, timely record of authorized disclosures' },
          { ref: 'P6.3', title: 'Record of detected or reported unauthorized disclosures and breaches' },
          { ref: 'P6.4', title: 'Privacy commitments obtained from vendors and third parties, compliance assessed' },
          { ref: 'P6.5', title: 'Vendors commit to notifying actual or suspected unauthorized disclosures' },
          { ref: 'P6.6', title: 'Notification of breaches to data subjects, regulators, and others' },
          { ref: 'P6.7', title: 'Accounting of personal information held and disclosed, on request' },
        ],
        checks: [
          'Confirm third-party data sharing is inventoried, consents obtained, and DPAs include privacy commitments + breach-notification clauses.',
          'Check a disclosure log captures authorized and unauthorized disclosures (including breaches).',
          'Verify breach-notification procedure covers data subjects and regulators with defined SLAs (e.g., GDPR 72h).',
        ],
        questions: [
          'Which sub-processors hold personal data, and do all of them commit to breach notification?',
          'Can you show the last disclosure you recorded — authorized or not?',
        ],
      },
      {
        ref: 'P7', title: 'Quality', note: 'Privacy concept',
        criteria: [{ ref: 'P7.1', title: 'Personal information maintained accurate, complete, and relevant' }],
        checks: [
          'Confirm data-quality controls validate personal information at collection and over time.',
          'Check users can request correction of inaccurate data (ties to P5.2).',
        ],
        questions: [
          'How do you keep personal information accurate as users change jobs, emails, or addresses?',
        ],
      },
      {
        ref: 'P8', title: 'Monitoring & Enforcement', note: 'Privacy concept',
        criteria: [{ ref: 'P8.1', title: 'Process for inquiries, complaints, and disputes; compliance monitored' }],
        checks: [
          'Confirm a complaint / inquiry intake process exists and is publicized, with resolution tracked.',
          'Check privacy compliance is monitored (recurring reviews, findings → corrective action) and deficiencies are fixed in a timely manner.',
        ],
        questions: [
          'Show me the last privacy complaint and how it was resolved — how long did it take?',
        ],
      },
    ],
  },
];

const COLORS = {
  indigo: { box: 'border-indigo-100 dark:border-indigo-800', header: 'bg-indigo-50 dark:bg-indigo-900/30', title: 'text-indigo-700 dark:text-indigo-300' },
  emerald: { box: 'border-emerald-100 dark:border-emerald-800', header: 'bg-emerald-50 dark:bg-emerald-900/30', title: 'text-emerald-700 dark:text-emerald-300' },
  cyan: { box: 'border-cyan-100 dark:border-cyan-800', header: 'bg-cyan-50 dark:bg-cyan-900/30', title: 'text-cyan-700 dark:text-cyan-300' },
  amber: { box: 'border-amber-100 dark:border-amber-800', header: 'bg-amber-50 dark:bg-amber-900/30', title: 'text-amber-700 dark:text-amber-300' },
  purple: { box: 'border-purple-100 dark:border-purple-800', header: 'bg-purple-50 dark:bg-purple-900/30', title: 'text-purple-700 dark:text-purple-300' },
};

const SCOPE_META = {
  core: { label: 'Always in scope', Icon: CheckCircle, cls: 'bg-emerald-50 text-emerald-700 border-emerald-200 dark:bg-emerald-900/20 dark:text-emerald-300 dark:border-emerald-800' },
  optional: { label: 'Category-specific', Icon: MinusCircle, cls: 'bg-amber-50 text-amber-700 border-amber-200 dark:bg-amber-900/20 dark:text-amber-300 dark:border-amber-800' },
};

export default function TscControlMatrix() {
  const [scopeFilter, setScopeFilter] = useState('all');

  const totalSeries = TSC_MATRIX.reduce((s, c) => s + c.series.length, 0);
  const counts = {
    core: TSC_MATRIX.reduce((s, c) => s + (c.scope === 'core' ? c.series.length : 0), 0),
    optional: TSC_MATRIX.reduce((s, c) => s + (c.scope === 'optional' ? c.series.length : 0), 0),
  };

  const filterTabs = [
    { key: 'all', label: 'All series', n: totalSeries },
    { key: 'core', label: 'Always in scope (Security)', n: counts.core },
    { key: 'optional', label: 'Category-specific', n: counts.optional },
  ];

  return (
    <section id="soc2-tsc" className="py-8">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-text-dark-primary flex items-center gap-3">
            <span className="w-10 h-10 rounded-xl bg-emerald-600 text-white flex items-center justify-center"><ScrollText className="w-6 h-6" /></span>
            AICPA Trust Services Criteria (TSC) — Control Matrix, by Category
          </h2>
          <p className="text-gray-600 dark:text-text-dark-secondary mt-3 max-w-3xl leading-relaxed">
            The Trust Services Criteria are how AICPA defines the control set for a SOC 2 report. Five categories exist —
            <strong> Security</strong>, <strong>Availability</strong>, <strong>Processing Integrity</strong>, <strong>Confidentiality</strong>, and <strong>Privacy</strong> —
            and every control in the report maps to a criterion number (<span className="text-indigo-600 dark:text-indigo-300 font-semibold">CC6.1</span>,{' '}
            <span className="text-emerald-600 dark:text-emerald-300 font-semibold">A1.2</span>, <span className="text-purple-600 dark:text-purple-300 font-semibold">P5.1</span>, …).
            This matrix groups every criterion series under its category, with the controls to verify and the questions to ask.
          </p>
        </div>

        <div className="flex flex-wrap gap-2 mb-6">
          {filterTabs.map(t => (
            <button
              key={t.key}
              onClick={() => setScopeFilter(t.key)}
              className={`px-4 py-1.5 rounded-full text-sm font-semibold border transition ${
                scopeFilter === t.key
                  ? 'bg-emerald-600 border-emerald-600 text-white'
                  : 'bg-surface-100 dark:bg-surface-dark-100 border-surface-300 dark:border-surface-dark-300 text-gray-600 dark:text-text-dark-secondary hover:bg-surface-200 dark:hover:bg-surface-dark-200'
              }`}
            >
              {t.label} {t.n}
            </button>
          ))}
        </div>

        {/* How scoping works strip */}
        <div className="grc-card p-5 mb-8 flex items-start gap-3">
          <Info className="w-5 h-5 text-emerald-600 dark:text-emerald-400 grc-card-icon shrink-0 mt-0.5" />
          <p className="text-sm text-gray-600 dark:text-text-dark-secondary leading-relaxed">
            <strong className="text-gray-800 dark:text-text-dark-primary">How the categories stack:</strong> the Security category is the
            Common Criteria (CC1–CC9) and is <strong>always in scope</strong> — there is no SOC 2 report without it. Each additional category you
            report on adds its own supplemental series on top of the Common Criteria: Availability adds <strong>A1</strong>, Processing Integrity adds{' '}
            <strong>PI1–PI9</strong>, Confidentiality adds <strong>C1</strong>, and Privacy adds <strong>P1–P8</strong>. An auditor tests the common criteria
            against the principal system objectives, then each supplemental series against its own category commitments.
          </p>
        </div>

        {/* Category matrix */}
        <div className="space-y-6">
          {TSC_MATRIX.map(cat => {
            if (scopeFilter !== 'all' && cat.scope !== scopeFilter) return null;
            const c = COLORS[cat.color] || COLORS.indigo;
            const CatIcon = cat.icon;
            const m = SCOPE_META[cat.scope] || SCOPE_META.core;
            const MIcon = m.Icon;
            return (
              <div key={cat.category}>
                <div className="flex flex-wrap items-center gap-2 mb-3">
                  <CatIcon className={`w-4 h-4 ${c.title}`} />
                  <h4 className={`text-sm font-bold uppercase tracking-wide ${c.title}`}>{cat.category}</h4>
                  <span className={`inline-flex items-center gap-1 text-[10px] font-bold uppercase tracking-wide px-2 py-0.5 rounded-full border ${m.cls}`}>
                    <MIcon className="w-3 h-3" /> {m.label}
                  </span>
                </div>
                <p className={`text-sm ${c.title} mb-3 max-w-3xl`}>{cat.intro}</p>
                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-2">
                  {cat.series.map(s => (
                    <details key={`${cat.category}-${s.ref}`} className={`group rounded-lg border ${c.box} overflow-hidden`}>
                      <summary className="p-3 flex items-center justify-between gap-2 cursor-pointer list-none hover:bg-slate-50 dark:hover:bg-slate-800/50">
                        <div className="flex items-center gap-2 min-w-0">
                          <span className={`shrink-0 text-[11px] font-bold px-2 py-0.5 rounded-md border ${c.box} ${c.title}`}>{s.ref}</span>
                          <span className="text-sm font-semibold text-gray-800 dark:text-text-dark-primary leading-snug">{s.title}</span>
                        </div>
                        <span className="shrink-0 text-[10px] font-bold uppercase tracking-wide text-gray-500 dark:text-text-dark-muted">{s.criteria.length}</span>
                      </summary>
                      <div className="px-3 pb-3 space-y-3 text-xs">
                        {s.note && (
                          <p className={`font-bold uppercase tracking-wide text-[10px] ${c.title}`}>{s.note}</p>
                        )}
                        <div>
                          <p className={`text-[10px] font-bold uppercase tracking-wide mb-1 ${c.title}`}>Criteria in this series</p>
                          <ul className="space-y-1">
                            {s.criteria.map((cr, i) => (
                              <li key={i} className="flex items-start gap-2 text-gray-600 dark:text-text-dark-secondary">
                                <span className={`shrink-0 text-[10px] font-bold px-1.5 py-0.5 rounded border ${c.box} ${c.title} mt-px`}>{cr.ref}</span>
                                <span>{cr.title}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                        <div>
                          <p className={`font-bold uppercase tracking-wide text-[10px] mb-1 ${c.title}`}>Step-by-step — what we need to check</p>
                          <ol className="space-y-1">
                            {s.checks.map((chk, i) => (
                              <li key={i} className="flex items-start gap-1.5 text-gray-600 dark:text-text-dark-secondary">
                                <span className={`shrink-0 w-4 h-4 rounded-full ${c.header} ${c.title} text-[9px] font-bold flex items-center justify-center mt-0.5`}>{i + 1}</span>
                                <span>{chk}</span>
                              </li>
                            ))}
                          </ol>
                        </div>
                        <div>
                          <p className={`font-bold uppercase tracking-wide text-[10px] mb-1 ${c.title}`}>Questions to ask the startup</p>
                          <ul className="space-y-1">
                            {s.questions.map((q, i) => (
                              <li key={i} className="flex items-start gap-1.5 text-gray-600 dark:text-text-dark-secondary">
                                <span className={`${c.title} mt-0.5`}>›</span>
                                <span>{q}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    </details>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}