// TPRM operating model content. Example thresholds, weights and timings are
// configurable recommendations, not legal or framework requirements.
export const CHECKED = '2 November 2026';

export const PROGRAM = {
  purpose: 'Make sure every third party that touches our data, systems, customers or critical services is known, assessed in proportion to its risk, contracted with the right protections, monitored, and exited cleanly.',
  scope: [
    'In scope: any external legal entity that provides a service, product or component and (a) handles our data or customer data, (b) connects to or administers our systems, (c) supports a critical business service, or (d) creates regulatory, legal or reputational exposure.',
    'Includes SaaS and cloud providers, outsourced services, consultants and contractors engaged through a firm, resellers and marketplaces, affiliates providing shared services, and embedded or open-source components where a supplier stands behind them.',
    'Lightweight path for low-risk spend (Tier 4): inventory record and standard terms only.',
    'Out of scope (handled elsewhere): individual employees, customers, and open-source libraries with no supplier relationship (covered by software composition analysis in the secure development process).',
  ],
  appetite: [
    'No vendor receives restricted or regulated data, or privileged access, before due diligence is complete and residual risk is approved (except via the emergency path).',
    'Tier 1 and Tier 2 vendors may not operate with an open Critical finding beyond its remediation target without a current, approved risk acceptance.',
    'Residual risk rated High needs approval from the risk committee (or CISO and business executive in smaller organisations); Medium from the CISO or delegate; Low from the vendor manager.',
    'Every Tier 1 vendor supporting a critical service has a documented, and periodically tested, exit plan.',
  ],
  baseline: [
    'Signed contract with confidentiality, security and data protection terms proportionate to tier',
    'MFA on all vendor access to our systems; named accounts; least privilege',
    'Encryption of our data in transit and at rest where the vendor stores it',
    'Breach notification duty to us, with a defined contractual window',
    'Sub-processor disclosure and change notice where the vendor processes personal data',
    'Data return or deletion at exit, with written confirmation',
  ],
  exceptions: 'Any deviation from the baseline or appetite is recorded as an exception with: reason, compensating controls, residual risk, approver at the level above, expiry date (maximum 12 months, example), and review date. Expired exceptions become findings automatically.',
};

export const RACI = {
  roles: ['Business owner', 'Vendor manager / procurement', 'Security', 'Privacy / DPO', 'Legal', 'Compliance', 'IT / engineering', 'Finance', 'Resilience / BCP', 'Risk committee / executive'],
  rows: [
    ['Intake and business case', 'A', 'R', 'C', 'C', '', '', 'C', 'C', 'C', ''],
    ['Inherent risk tiering', 'C', 'A', 'R', 'R', '', 'C', 'C', '', 'C', ''],
    ['Due diligence and evidence review', 'I', 'A', 'R', 'R', 'C', 'C', 'C', 'I', 'R', ''],
    ['Residual risk decision', 'R', 'C', 'R', 'R', 'C', 'C', '', '', 'C', 'A (High)'],
    ['Contract and clause approval', 'C', 'R', 'C', 'C', 'A', 'C', '', 'C', 'C', ''],
    ['Onboarding and access', 'A', 'C', 'C', 'C', '', '', 'R', '', '', ''],
    ['Ongoing monitoring and reassessment', 'C', 'A', 'R', 'R', '', 'C', 'C', 'I', 'R', 'I'],
    ['Vendor incident response', 'C', 'C', 'A', 'R', 'R', 'C', 'R', '', 'R', 'I'],
    ['Issues, exceptions, risk acceptance', 'R', 'A', 'R', 'R', 'C', 'C', 'C', '', 'C', 'A (High)'],
    ['Offboarding and exit', 'A', 'R', 'C', 'C', 'C', '', 'R', 'C', 'C', ''],
    ['Programme reporting', 'I', 'R', 'C', 'C', '', 'C', '', '', 'C', 'A'],
  ],
  escalation: [
    'Level 1: vendor manager resolves with business owner and vendor (missing evidence, routine findings).',
    'Level 2: CISO / DPO / Legal for High findings, overdue Critical remediation, disputed clauses, or evidence gaps on Tier 1 and 2.',
    'Level 3: risk committee or executive for High residual risk acceptance, emergency procurement, Tier 1 exit decisions, or regulator-facing incidents.',
  ],
};

export const ENTITY_TERMS = [
  ['Vendor (third party)', 'The legal entity we contract with.', 'One record per legal entity; affiliates of the same group are separate records linked by a parent field.'],
  ['Service', 'A specific product or service we buy from that vendor.', 'Risk is assessed per service: the same vendor can have a Tier 1 service (payroll) and a Tier 4 service (training videos).'],
  ['Legal entity', 'The company named on the contract and invoices.', 'Determines the contracting party, jurisdiction and where assurance reports apply. Check that a SOC 2 report covers this entity and service.'],
  ['Sub-processor / fourth party', 'A third party used by our vendor to deliver the service.', 'Recorded against the service, not as our vendor. Sub-processor is the GDPR term for a processor engaged by a processor (Art. 28(2) and (4)).'],
  ['Reseller', 'Sells another company\'s product to us.', 'Assess the reseller (contract, billing, support access) and the underlying provider (where the data actually goes).'],
  ['Non-processor vendor', 'Provides a service without handling personal data (for example office supplies).', 'Still recorded and tiered; privacy steps are skipped, but access and continuity questions still apply.'],
];

export const INVENTORY_FIELDS = [
  ['Vendor ID / service ID', 'System generated', 'Unique per legal entity and per service'],
  ['Legal entity name, registration country, parent', 'Contract, company registry', 'Avoids duplicates; links affiliates'],
  ['Service name and description', 'Business owner', 'What we buy, in plain words'],
  ['Business owner and vendor manager', 'Intake', 'Named people; must be current employees'],
  ['Data types and classification', 'Intake data-flow questions', 'For example Public, Internal, Confidential, Restricted; personal, special category, payment, health data'],
  ['Data volume (records / subjects)', 'Business owner estimate', 'Order of magnitude is enough'],
  ['Processing and storage locations', 'Vendor disclosure, DPA', 'Countries and regions, including support access'],
  ['System access', 'IT', 'None / user / API / privileged / network'],
  ['Business criticality and recovery time', 'Business owner, BCP', 'Supports a critical service? Tolerable outage?'],
  ['Inherent tier and score', 'Tiering assessment', 'With date and assessor'],
  ['Residual risk and approver', 'Due diligence decision memo', 'With date'],
  ['Assurance status and expiry', 'Evidence review', 'For example SOC 2 period end, ISO certificate expiry'],
  ['Contract start, end, renewal and notice dates', 'Contract system', 'Drives renewal reassessment'],
  ['Sub-processors and key fourth parties', 'Vendor list, DPA annex', 'Link to dependency register'],
  ['Concentration dependencies', 'Assessment', 'For example hosted on the same cloud region as our core platform'],
  ['Open issues and exceptions', 'Issue register', 'Count and highest severity'],
  ['Exit plan status', 'Business owner, BCP', 'None / documented / tested (date)'],
  ['Next review date and trigger', 'Review policy', 'Calculated from tier'],
];

export const VENDOR_TYPES = [
  ['SaaS / cloud provider', 'Shared responsibility: map which controls are ours (configuration, identity, data classification) using CUECs and the provider\'s responsibility model.'],
  ['Outsourced service (BPO, managed service)', 'Assess the people and process as well as technology: staff vetting, access to our systems, location of work, and continuity.'],
  ['Consultants and contractors via a firm', 'Contract with the firm; individuals get named accounts, our policies, and access ending with the engagement.'],
  ['Affiliates and group companies', 'Intra-group agreement still needed; tier and monitor like any vendor, though evidence can rely on group audits.'],
  ['Resellers and marketplaces', 'Two relationships: the reseller and the underlying provider. Make sure data terms flow to the party that actually processes data.'],
  ['Embedded or open-source components with a supplier', 'Ask for SBOM (software bill of materials), vulnerability disclosure process and support commitments; pure open source with no supplier is outside TPRM.'],
  ['Non-processor vendors', 'Inventory, tier, contract terms; skip DPA and privacy review unless facts change.'],
];

// ---------------- Methodology ----------------
export const DIMENSIONS = [
  { id: 'data', name: 'Data sensitivity and volume', weight: 20, scale: ['No data or public only', 'Internal business data', 'Personal data, moderate volume', 'Large volume of personal or confidential data', 'Special category, payment, health or regulated data at scale'] },
  { id: 'access', name: 'System or network access', weight: 15, scale: ['None', 'User-level SaaS access to our data', 'API or integration access', 'Admin of a system holding our data', 'Privileged or network access into our environment'] },
  { id: 'crit', name: 'Business or service criticality', weight: 15, scale: ['Nice to have', 'Supports internal process', 'Supports a customer-facing process', 'Supports a critical service', 'Failure stops a critical service'] },
  { id: 'subst', name: 'Substitutability and recovery time', weight: 10, scale: ['Swap in days', 'Swap in weeks', 'Swap in months', 'Swap takes over 6 months', 'No realistic substitute'] },
  { id: 'reg', name: 'Regulated or sensitive processing', weight: 10, scale: ['None', 'General privacy law only', 'Sector rules apply (for example payments, health)', 'Supports a regulated function (for example DORA critical or important function)', 'Several regimes plus regulator notification duties'] },
  { id: 'exposure', name: 'External exposure', weight: 8, scale: ['Internal only', 'Limited partner exposure', 'Customer-visible', 'Public-facing at scale', 'Public-facing and acting on customers\' behalf'] },
  { id: 'geo', name: 'Geographic and legal complexity', weight: 8, scale: ['Same country, no transfers', 'Adequate or equivalent countries', 'Transfers with safeguards', 'Several jurisdictions, some high risk', 'Unclear locations or sanctioned / high-risk jurisdictions'] },
  { id: 'ai', name: 'AI use', weight: 7, scale: ['No AI', 'AI not touching our data', 'AI processes our data, no training', 'AI makes or supports decisions about people', 'Vendor may train on our data or acts autonomously'] },
  { id: 'conc', name: 'Concentration and fourth-party dependency', weight: 7, scale: ['Independent', 'Some shared providers', 'Key fourth party known and resilient', 'Shares a critical provider or region with other key services', 'Single point of failure across several critical services'] },
];
export const TIER_CUTOFFS = [
  { tier: 1, label: 'Tier 1: Critical', min: 3.6, desc: 'Deep due diligence, executive approval of residual risk, tested exit plan, continuous monitoring; full reassessment every year with quarterly reviews.' },
  { tier: 2, label: 'Tier 2: High', min: 2.8, desc: 'Full due diligence with independent assurance; annual reassessment.' },
  { tier: 3, label: 'Tier 3: Medium', min: 2.0, desc: 'Questionnaire plus targeted evidence; reassessment every two years or at renewal.' },
  { tier: 4, label: 'Tier 4: Low', min: 0, desc: 'Inventory and standard terms; intake check at onboarding, fact check at renewal, reassess on any trigger.' },
];
export const OVERRIDES = [
  'Floor at Tier 2: any special category, payment card or health data, or any privileged access to production.',
  'Floor at Tier 1: the vendor supports a critical service with no substitute, or supports a function a regulator treats as critical (for example DORA critical or important function).',
  'Floor at Tier 2: vendor may train AI models on our data.',
  'Tie-breaker: a score within 0.1 of a cutoff goes to the higher tier unless the business owner and security agree in writing.',
  'Manual override up or down by one tier only, with written reason and approval by the CISO or delegate.',
];
export const EXAMPLES = [
  { name: 'Brightpaper Supplies (fictional)', service: 'Office stationery delivery', scores: { data: 1, access: 1, crit: 1, subst: 1, reg: 1, exposure: 1, geo: 1, ai: 1, conc: 1 },
    evidence: 'Standard purchase terms; company registration check.', gaps: 'None material.', decision: 'Tier 4. Approved by vendor manager. No questionnaire.', owner: 'Facilities manager', next: 'Contract renewal or any change in data or access.',
    monitor: 'None beyond renewal.' },
  { name: 'Ledgerly CRM (fictional)', service: 'SaaS CRM holding customer contact and deal data', scores: { data: 4, access: 2, crit: 3, subst: 3, reg: 2, exposure: 3, geo: 3, ai: 3, conc: 2 },
    evidence: 'SOC 2 Type II (period ended 4 months ago, unqualified, 2 exceptions on access reviews); DPA with SCCs; sub-processor list; pen test summary.', gaps: 'Access review exceptions; AI features enabled by default; CUEC for SSO not yet in place on our side.', decision: 'Tier 2. Residual Medium after SSO and AI opt-out. Approved by CISO delegate with 2 findings (90-day targets).', owner: 'Head of Sales Ops', next: 'Annual, new SOC 2 report, new sub-processor, or new AI feature.',
    monitor: 'Sub-processor change notices; quarterly check of finding progress.' },
  { name: 'Northpay Gateway (fictional)', service: 'Card payment processing and hosted checkout', scores: { data: 5, access: 3, crit: 5, subst: 4, reg: 5, exposure: 5, geo: 3, ai: 2, conc: 4 },
    evidence: 'PCI DSS Attestation of Compliance (service provider); SOC 2 Type II; ISO 27001 certificate with scope covering the gateway; BCP test summary; insurance certificate; responsibility matrix.', gaps: 'Hosted on the same cloud region as our core platform (correlated failure); exit plan not tested.', decision: 'Tier 1. Residual High until a secondary region and a tested failover exist; accepted by the risk committee for 6 months with compensating monitoring.', owner: 'CFO', next: 'Quarterly review; AoC renewal; any incident; acceptance expiry in 6 months.',
    monitor: 'Service performance against SLA; incident notices; status page; concentration review each quarter.' },
];
export const CONFIDENCE = [
  ['Current and in scope', 'Report period ended within 12 months; covers this legal entity and service; opinion unqualified.', 'Accept; record CUECs.'],
  ['Current with exceptions', 'Qualified opinion or exceptions relevant to our use.', 'Accept with findings; ask for management response and remediation evidence.'],
  ['Stale', 'Period ended more than 12 months ago, or certificate expired.', 'Ask for bridge letter plus timeline for the next report; treat as reduced confidence; escalate for Tier 1.'],
  ['Out of scope', 'Report covers a different entity, service, region or carves out the relevant subservice provider.', 'Do not rely on it for that part; request specific evidence or the subservice provider\'s report.'],
  ['Self-attested only', 'Questionnaire answers without supporting evidence.', 'Acceptable for Tier 3 and 4; for Tier 1 and 2 request corroborating evidence or a walkthrough.'],
  ['Contradictory', 'Evidence conflicts (for example "MFA everywhere" but report shows exceptions).', 'Raise a finding; ask the vendor to reconcile; escalate if unresolved.'],
  ['Not applicable', 'The control genuinely does not apply to the service, with reason.', 'Record the reason; reviewer agrees.'],
  ['Not provided', 'Vendor did not answer or refused.', 'Never treat as N/A. Raise a finding; decide whether to proceed.'],
];
export const RECORD_FIELDS = ['Scope assessed (service, entity, data)', 'Assumptions', 'Dimension scores with one-line rationale', 'Calculated and final tier (with any override reason)', 'Evidence considered (name, version, period, date received)', 'Findings and severities', 'Residual risk and rationale', 'Approver, role and date', 'Conditions and next review trigger'];

// ---------------- Lifecycle SOPs ----------------
export const STAGES = [
  { id: 'intake', name: 'Request and intake', gate: 'Before any commitment',
    objective: 'Capture the need early, avoid duplicates, and decide whether the request needs TPRM.',
    entry: 'A business owner wants to buy, renew or expand a service, or a free trial / click-through would handle our data.',
    owner: 'A: Business owner. R: Vendor manager. C: Finance.',
    inputs: ['Intake form (service, purpose, data, users, spend, start date)', 'Existing vendor inventory'],
    steps: ['Search the inventory for the legal entity and service; reuse an existing assessment if scope matches', 'Confirm the legal entity name from the quote or order form', 'Record business purpose and named business owner', 'Route Tier 4 obvious cases (no data, no access, low spend) to the lightweight path'],
    decision: 'Proceed to discovery, reuse an existing assessment, or close (duplicate or not needed).',
    outputs: ['Vendor and service record created', 'Request ID'],
    evidence: ['Intake form', 'Duplicate check result'],
    timing: '2 business days to triage (internal target).',
    escalation: 'Business owner cannot be named, or the service was already bought: raise as an exception and run the process retrospectively.',
    next: 'Scope and data-flow discovery.' },
  { id: 'discovery', name: 'Scope, data-flow, access and criticality discovery', gate: 'Before any commitment',
    objective: 'Understand exactly what data goes where, who can access what, and how much the business depends on the service.',
    entry: 'Request accepted at intake.',
    owner: 'A: Vendor manager. R: Business owner, IT. C: Privacy, BCP.',
    inputs: ['Data-flow questionnaire', 'Architecture or integration notes', 'Business impact analysis if one exists'],
    steps: ['List data types, classification and approximate volume', 'Draw the data flow: our systems, vendor systems, locations, sub-processors where known', 'Record access type (none, user, API, admin, network)', 'Ask whether it supports a critical service and its tolerable outage', 'Note AI features and whether they use our data'],
    decision: 'Enough information to tier? If not, return to the business owner.',
    outputs: ['Completed data-flow record', 'Criticality statement'],
    evidence: ['Data-flow diagram or table', 'Criticality statement signed by the business owner'],
    timing: '5 business days (internal target).',
    escalation: 'Data types unknown: treat as the highest plausible category until confirmed.',
    next: 'Inherent risk tiering.' },
  { id: 'tiering', name: 'Inherent risk tiering and due-diligence scope', gate: 'Before any commitment',
    objective: 'Score inherent risk and decide how much assurance to ask for.',
    entry: 'Discovery complete.',
    owner: 'A: Vendor manager. R: Security, Privacy.',
    inputs: ['Discovery outputs', 'Scoring model (Tiering tab)'],
    steps: ['Score each dimension with a one-line reason', 'Apply floors and overrides', 'Select the evidence set for the tier', 'Agree timeline with the business owner'],
    decision: 'Tier confirmed; due-diligence scope set.',
    outputs: ['Tier and score', 'Evidence request list'],
    evidence: ['Tiering record with rationale'],
    timing: '2 business days (internal target).',
    escalation: 'Disagreement on tier: CISO or delegate decides.',
    next: 'Due diligence.' },
  { id: 'dd', name: 'Due diligence and evidence validation', gate: 'Before contract signature',
    objective: 'Get and test evidence that the vendor\'s controls match the risk.',
    entry: 'Tier 1 to 3 vendor with evidence request sent.',
    owner: 'A: Vendor manager. R: Security, Privacy. C: Legal, BCP.',
    inputs: ['Evidence by tier (see SOC 2 Review tab)', 'Questionnaire responses'],
    steps: ['Check every document is current, in scope and for the right legal entity', 'Review SOC 2 or ISO using the worksheet', 'Validate questionnaire answers by sampling, follow-up or walkthrough', 'Map CUECs to our controls', 'Record findings with severity'],
    decision: 'Evidence sufficient? If not, request compensating evidence or escalate.',
    outputs: ['Evidence review record', 'Findings list'],
    evidence: ['Reports received (version, date)', 'Review worksheet', 'Follow-up emails'],
    timing: 'Tier 1: 20, Tier 2: 15, Tier 3: 10 business days after evidence is received (internal targets).',
    escalation: 'Vendor will not provide evidence for Tier 1 or 2: Level 2 escalation; consider alternative vendor.',
    next: 'Findings, residual risk and approval.' },
  { id: 'approval', name: 'Findings, remediation, residual risk and approval', gate: 'Before contract signature',
    objective: 'Decide whether residual risk is acceptable and on what conditions.',
    entry: 'Evidence review complete.',
    owner: 'A: Approver by residual rating. R: Security, Privacy. C: Business owner.',
    inputs: ['Findings', 'Proposed remediation and compensating controls'],
    steps: ['Agree remediation with the vendor (pre-contract or contractual commitment)', 'Rate residual risk', 'Write the due-diligence decision memo', 'Get approval at the right level'],
    decision: 'Approve, approve with conditions, or reject.',
    outputs: ['Signed decision memo', 'Findings in the issue register'],
    evidence: ['Decision memo with approver and date'],
    timing: '5 business days (internal target).',
    escalation: 'High residual: risk committee.',
    next: 'Contracting.' },
  { id: 'contract', name: 'Contract negotiation and clause approval', gate: 'Before contract signature',
    objective: 'Put the protections the risk needs into the contract.',
    entry: 'Approval or conditional approval.',
    owner: 'A: Legal. R: Vendor manager. C: Security, Privacy, Finance.',
    inputs: ['Clause checklist by tier', 'Decision memo conditions'],
    steps: ['Select clauses for the tier (Contract Clauses tab)', 'Add DPA / BAA and transfer terms where required', 'Write remediation commitments and dates into the contract', 'Record deviations as exceptions'],
    decision: 'All mandatory clauses present, or deviations approved.',
    outputs: ['Executed contract and data terms'],
    evidence: ['Signed contract, DPA / BAA, security schedule', 'Clause checklist'],
    timing: 'Varies; start in parallel with due diligence for Tier 1.',
    escalation: 'Vendor refuses a mandatory clause: Legal and CISO decide; may require risk acceptance.',
    next: 'Onboarding.' },
  { id: 'onboard', name: 'Onboarding, access, configuration and privacy set-up', gate: 'Before data or access is provided',
    objective: 'Give the vendor only the access it needs and configure the service securely.',
    entry: 'Contract signed.',
    owner: 'A: Business owner. R: IT. C: Security, Privacy.',
    inputs: ['Access request', 'CUEC list', 'Security configuration baseline'],
    steps: ['Create named accounts with MFA; least privilege; expiry for contractor accounts', 'Set up SSO, logging and alerts', 'Apply CUECs and configuration baseline (for example disable AI training, restrict regions)', 'Register sub-processors in the dependency register', 'Update records of processing (GDPR Art. 30) where applicable'],
    decision: 'Configuration checked before go-live.',
    outputs: ['Access and configuration record', 'Inventory updated'],
    evidence: ['Access approvals', 'Configuration screenshots', 'Sub-processor register entry'],
    timing: 'Before production data flows.',
    escalation: 'Go-live pressure before configuration is complete: exception with expiry.',
    next: 'Ongoing monitoring.' },
  { id: 'monitor', name: 'Ongoing monitoring, reassessment, change and renewal', gate: 'Before renewal',
    objective: 'Keep the risk picture current.',
    entry: 'Vendor live.',
    owner: 'A: Vendor manager. R: Security, Privacy. C: Business owner.',
    inputs: ['Review calendar by tier', 'Event triggers', 'Monitoring sources'],
    steps: ['Run reviews on the tier cadence (Review Frequency tab)', 'Re-tier on event triggers', 'Collect renewed assurance before expiry', 'Reassess before renewal notice date'],
    decision: 'Continue, continue with conditions, or start exit.',
    outputs: ['Updated assessment and tier'],
    evidence: ['Review checklist', 'Updated reports'],
    timing: 'Start renewal review at least 90 days before the notice date (internal target).',
    escalation: 'Missed review on Tier 1 or 2: KRI breach, reported to risk committee.',
    next: 'Incident, issue or offboarding as triggered.' },
  { id: 'incident', name: 'Vendor incident handling and notification coordination', gate: 'Any time',
    objective: 'Contain the impact of a vendor or sub-processor incident and meet any notification duties that apply to us.',
    entry: 'Vendor notice, our detection, public report, or regulator / customer enquiry.',
    owner: 'A: Security (incident lead). R: Privacy, Legal, IT, BCP. C: Vendor manager, business owner.',
    inputs: ['Vendor notice', 'Inventory record (data, access, criticality)', 'Contract notice terms'],
    steps: ['Open an incident; record time we became aware', 'Triage: which services, data and customers are affected', 'Contain: rotate credentials, disable integrations, switch to fallback', 'Preserve evidence: notices, logs, timeline', 'Privacy and Legal assess notification duties for us (not automatic)', 'Communicate to customers or regulators where required or decided', 'Track vendor remediation; lessons learned'],
    decision: 'See incident decision tree.',
    outputs: ['Incident record', 'Notification decision record'],
    evidence: ['Vendor notices', 'Timeline', 'Decision memo', 'Remediation evidence'],
    timing: 'Triage within hours; notification deadlines depend on the law and our role (see Regional Laws).',
    escalation: 'Personal data or critical service affected: Level 2 immediately; Level 3 if regulator-facing.',
    next: 'Issue management and reassessment.' },
  { id: 'issues', name: 'Issue remediation, exceptions and risk acceptance', gate: 'Any time',
    objective: 'Close findings or accept residual risk explicitly, with expiry.',
    entry: 'Finding from due diligence, monitoring, audit or incident.',
    owner: 'A: Vendor manager. R: Security, Privacy. C: Approver by severity.',
    inputs: ['Finding', 'Severity rules'],
    steps: ['Rate severity', 'Agree remediation and target date', 'Track; escalate overdue items', 'Verify closure with evidence', 'Or document risk acceptance with expiry'],
    decision: 'Closed, accepted, or escalated.',
    outputs: ['Issue register entries'],
    evidence: ['Closure evidence', 'Acceptance record'],
    timing: 'Severity-based targets (Issue Management tab).',
    escalation: 'Overdue Critical or High: next level.',
    next: 'Monitoring or offboarding.' },
  { id: 'offboard', name: 'Offboarding and exit', gate: 'At end of contract',
    objective: 'End the relationship without leaving access, data or continuity gaps.',
    entry: 'Termination, non-renewal or forced exit.',
    owner: 'A: Business owner. R: IT, Vendor manager. C: Legal, Privacy, BCP.',
    inputs: ['Exit plan', 'Inventory record', 'Contract exit terms'],
    steps: ['Revoke every account, token, API key, VPN and integration', 'Get data returned in the agreed format; check completeness', 'Request deletion, including backups per contract; record retention exceptions and legal holds', 'Get written deletion confirmation or certificate', 'Confirm sub-processors stop processing', 'Transfer to successor; close contract; update inventory and records of processing', 'Keep evidence per retention policy'],
    decision: 'Closure approved when all evidence is in.',
    outputs: ['Closure record'],
    evidence: ['Access removal records', 'Data return receipt', 'Deletion confirmation', 'Inventory update'],
    timing: 'Access removed on the last service day (internal target).',
    escalation: 'Vendor will not confirm deletion: Legal escalation; record residual risk.',
    next: 'Closed.' },
];
export const GATES = [
  ['Before contract signature', 'Intake, discovery, tiering, due diligence, residual risk approval, clause approval'],
  ['Before data or access is provided', 'Contract and data terms signed; access least-privilege; configuration and CUECs applied; sub-processors registered'],
  ['Before renewal', 'Reassessment on current evidence; open findings reviewed; exit plan current for Tier 1'],
];
export const EMERGENCY = ['Use only when delay would cause greater harm (for example incident response, regulatory deadline, safety).', 'Named approver: CISO plus business executive.', 'Minimum: contract with confidentiality and data terms, MFA on any access, limited data.', 'Compensating controls documented (for example extra monitoring, restricted scope).', 'Expiry: 30 days (example) by which full due diligence must be complete.', 'Retrospective review recorded and reported to the risk committee.'];

// ---------------- Assurance ----------------
export const EVIDENCE_BY_TIER = [
  ['Tier 1', 'SOC 2 Type II or ISO 27001 certificate with Statement of Applicability, scope matching the service; pen test summary (12 months); BCP / DR test summary; sub-processor list; DPA or BAA; insurance certificate where contract requires; sector evidence (for example PCI AoC); walkthrough for key controls', 'Accept when current, in scope, unqualified or exceptions remediated', 'Escalate if stale, out of scope, carve-out of a critical subservice provider with no report, or refusal'],
  ['Tier 2', 'SOC 2 Type II or ISO 27001 with scope; questionnaire; pen test summary; DPA; sub-processor list', 'Accept when current and relevant exceptions have a plan', 'Escalate on qualified opinion relevant to us, or no independent assurance'],
  ['Tier 3', 'Questionnaire with targeted evidence (for example MFA screenshot, policy extract); DPA if personal data', 'Accept when answers are corroborated for key controls', 'Escalate on "yes" without evidence for MFA, encryption or breach notice'],
  ['Tier 4', 'Standard terms; company check', 'Accept', 'Re-tier if data or access appears'],
];
export const SOC2_STEPS = [
  ['1. Report type and period', 'Type II covers operating effectiveness over a period (usually 6 to 12 months); Type I is design at a point in time.', 'Type I only for Tier 1 or 2: request Type II timeline and compensating evidence.'],
  ['2. Opinion', 'Unqualified, qualified, adverse or disclaimer.', 'Qualified: read the basis; decide if it affects our service.'],
  ['3. System and service scope', 'System description names the services, locations and entities covered.', 'Our service or entity not covered: report does not support reliance for it.'],
  ['4. Trust services criteria', 'Security is always included; Availability, Confidentiality, Processing Integrity, Privacy are optional.', 'Availability missing for a critical service: request BCP / DR evidence.'],
  ['5. Subservice organisations', 'Carve-out (excluded) or inclusive (tested).', 'Carved-out hosting or key provider: get its report or other assurance.'],
  ['6. CSOCs', 'Controls the vendor expects its subservice providers to operate.', 'Check the vendor monitors them (for example reviews their reports).'],
  ['7. CUECs', 'Controls the vendor expects us to operate.', 'Map each to our control owner; unmet CUECs are our findings.'],
  ['8. Exceptions and management responses', 'Testing exceptions with the auditor\'s detail.', 'Exceptions relevant to our use become findings; ask for remediation evidence.'],
  ['9. Bridge letter', 'Vendor\'s statement covering the gap between period end and now. It is not audited.', 'Accept for short gaps (example: up to 3 months); longer gaps reduce confidence.'],
  ['10. Report age', 'Period end date drives freshness.', 'Older than 12 months: stale (see evidence confidence).'],
  ['11. Map to what we buy', 'Link findings and scope to the actual service, data and integration.', 'Record the decision in the due-diligence memo.'],
];
export const SOC2_INSUFFICIENT = ['Report does not cover the service or legal entity we use', 'Critical subservice provider carved out with no assurance', 'Period ended more than 12 months ago with no bridge letter', 'Qualified opinion on controls relevant to our data', 'Type I only for a Tier 1 vendor'];
export const COMPENSATING = ['ISO 27001 certificate with Statement of Applicability covering the service', 'Recent independent pen test summary and remediation status', 'Subservice provider\'s own SOC 2 report', 'Walkthrough or screen-share of key controls (MFA, logging, backups)', 'Contractual commitment to deliver a Type II report by a date', 'Additional contract protections (audit right, notice, termination)'];
export const QUESTIONNAIRE_VALIDATION = ['Ask who answered and their role; answers need an accountable owner at the vendor', 'Corroborate key answers with evidence: MFA, encryption, logging, backup, breach process', 'Treat "yes" without evidence as unverified for Tier 1 and 2', 'Sample: ask for two recent access review records or one recent restore test', 'Use follow-up questions where answers conflict with reports', 'Walkthroughs for Tier 1 key controls', 'Record unverified answers as findings, not as passes'];

// ---------------- Sub-processors and concentration ----------------
export const DEP_REGISTER = ['Vendor and service', 'Sub-processor / fourth party legal name', 'What it does (hosting, support, payments, AI model)', 'Data shared and location', 'Critical to the service? (Y/N)', 'Assurance held (report, period)', 'Source of information (vendor list, DPA, contract, questionnaire)', 'Date added; date last confirmed', 'Unknowns recorded (for example "hosting provider not disclosed")'];
export const DEP_TRIGGERS = ['New sub-processor notice', 'Material change of service, location or ownership', 'Acquisition, merger or insolvency of the vendor or a key fourth party', 'Security incident at the vendor or a fourth party', 'Deteriorating assurance (qualified opinion, lapsed certificate)', 'Regulatory change affecting the service'];
export const DEP_CONTRACT = ['Notice of new or replaced sub-processors with time to object (GDPR Art. 28(2) requires prior specific or general written authorisation; with general authorisation the processor must inform the controller of changes so the controller can object)', 'Same data protection obligations flowed down to sub-processors (GDPR Art. 28(4))', 'Processor remains fully liable to the controller for the sub-processor\'s performance (GDPR Art. 28(4))', 'Security, incident notice, audit or assurance, deletion and cooperation obligations flowed down', 'Where terms are unavailable (for example click-through SaaS): record the gap, rely on published terms, escalate for Tier 1 and 2'];
export const CONCENTRATION = ['Map which critical services depend on the same cloud provider, region, payment network or software supplier', 'Ask: would one provider outage stop several critical services at once (correlated failure)?', 'Rate substitutability and time to switch for each', 'Check vendor resilience tests (failover, region loss)', 'Hold exit options: data export tested, alternative provider identified, contract exit assistance', 'Report concentration to the risk committee at least annually (example)'];
export const NTH_LIMITS = 'Full visibility of every nth party is not realistic. Focus on fourth parties that host or process our data, or that a critical service cannot run without. Record what you could not discover as an explicit unknown with its risk, rather than assuming coverage.';

// ---------------- Monitoring, issues, KRIs ----------------
export const CADENCE = [
  ['Tier 1: Critical', 'Annual full reassessment; quarterly check of findings, incidents and service performance', 'Continuous where available (notices, status, news)'],
  ['Tier 2: High', 'Annual reassessment', 'Event-driven triggers'],
  ['Tier 3: Medium', 'Every two years, or at renewal if sooner', 'Event-driven triggers'],
  ['Tier 4: Low', 'No periodic assessment; intake check at onboarding and fact check at renewal', 'Re-tier if data, access or dependency changes'],
];
export const MON_SOURCES = [
  ['Assurance reports and certificates', 'Independent, but point-in-time and scope-limited'],
  ['Vendor notices (breach, sub-processor, change)', 'Depend on vendor honesty and contract terms'],
  ['Security ratings services', 'Outside-in view of internet-facing assets; can misattribute assets and miss internal controls; use as a signal, not ground truth'],
  ['Threat intelligence and breach news', 'Early warning; needs verification'],
  ['Service performance and SLA reports', 'Shows availability trends'],
  ['Resilience and exit tests', 'Strongest evidence for continuity'],
  ['Government and CERT advisories', 'Authoritative on vulnerabilities; not vendor-specific'],
];
export const SEVERITY = [
  ['Critical', 'Exposed restricted data or privileged access with a known exploit; no breach notice duty; critical service with no continuity', '30 days', 'CISO + business executive; max 3 months'],
  ['High', 'Weak control on sensitive data (for example no MFA for admin); stale assurance on Tier 1', '60 days', 'CISO; max 6 months'],
  ['Medium', 'Control gap with compensating control; minor contract gap', '90 days', 'Vendor manager + Security; max 12 months'],
  ['Low', 'Documentation or hygiene', '180 days', 'Vendor manager'],
];
export const KRIS = [
  ['Overdue Tier 1 and 2 assessments', '% of Tier 1 and 2 vendors past review date', 'Vendor manager', 'Inventory', 'Monthly', 'Green 0%, Amber up to 5%, Red over 5%'],
  ['Expired assurance', 'Tier 1 and 2 vendors with report or certificate older than 12 months', 'Security', 'Evidence tracker', 'Monthly', 'Red if any Tier 1'],
  ['Open Critical or High findings past target', 'Count', 'Vendor manager', 'Issue register', 'Monthly', 'Red if any Critical overdue'],
  ['Expired risk acceptances', 'Count', 'Risk', 'Issue register', 'Monthly', 'Red if any'],
  ['Tier 1 vendors without a tested exit plan', '% of Tier 1', 'BCP', 'Inventory', 'Quarterly', 'Amber over 0%, Red over 25%'],
  ['Concentration exposure', 'Critical services depending on one provider or region', 'Risk', 'Dependency register', 'Quarterly', 'Report trend; Red on new single point of failure'],
  ['Vendors in use without assessment', 'Count found via spend or SSO logs', 'Vendor manager', 'Finance and IT data', 'Quarterly', 'Red if any with Restricted data'],
  ['Average due-diligence cycle time', 'Days from intake to decision', 'Vendor manager', 'Workflow', 'Quarterly', 'Trend only'],
];
export const AUDIT_TRAIL = ['Every assessment version kept with date, assessor and approver', 'Evidence stored with version, period and date received', 'Changes to tier or residual risk logged with reason', 'Risk acceptances with expiry and reapproval history', 'Quarterly management report: KRIs, top risks, overdue items, concentration'];

// ---------------- Incident and exit ----------------
export const INCIDENT_TREE = [
  ['Is our data, our customers\' data, or a service we rely on affected (or possibly affected)?', 'No: log, monitor vendor updates. Yes: next.'],
  ['Is personal data involved?', 'Yes: Privacy assesses whether a personal data breach occurred for us and our role (controller or processor). No: continue with operational impact.'],
  ['What is our role?', 'Controller: GDPR Art. 33 notice to the supervisory authority without undue delay and where feasible within 72 hours of becoming aware, unless unlikely to result in risk. Processor: notify our controller customers without undue delay (Art. 33(2)), plus any contractual window.'],
  ['Is high risk to individuals likely?', 'Yes: assess notice to individuals (GDPR Art. 34) and other laws.'],
  ['Does sector or entity regulation apply?', 'For example NIS2 significant incident (Art. 23), DORA major ICT incident, HIPAA, state laws: Legal confirms duty holder and timelines.'],
  ['Do contracts require notice to our customers?', 'Check customer contracts and DPAs.'],
  ['Record the decision', 'Who decided, when, on what facts; revisit as facts change.'],
];
export const INCIDENT_EVIDENCE = ['Vendor notice and all updates (with receipt times)', 'Our awareness time and how it was established', 'Affected services, data types, records and customers', 'Containment actions with times', 'Notification decision record and copies of notices sent', 'Vendor root cause and remediation evidence', 'Lessons learned and actions'];
export const TTX = { title: 'Tabletop: payroll SaaS breach at a fourth party', injects: ['T+0: Vendor emails that its file-storage sub-processor had unauthorised access; investigation ongoing.', 'T+4h: Vendor confirms employee bank details for some customers were accessed; cannot yet say which.', 'T+24h: A journalist asks whether our staff are affected.', 'T+48h: Vendor confirms our records were included.'], questions: ['When did we become aware, for GDPR purposes?', 'Who decides on regulator and employee notice?', 'What do we do with the vendor integration now?', 'What does the contract say about notice and cooperation?'] };
export const EXIT = ['Revoke all identities, tokens, API keys, service accounts, VPN and SSO apps', 'Remove integrations and webhooks; rotate shared secrets', 'Retrieve data in the agreed format; test completeness', 'Request deletion including backups per contract; record backup expiry dates', 'Record retention exceptions and legal holds', 'Obtain deletion certificate or written confirmation', 'Confirm sub-processors have stopped processing', 'Transition assistance and successor cut-over; continuity risk during switch', 'Terminate contract; stop payments', 'Update inventory, records of processing and dependency register', 'Retain closure evidence'];

// ---------------- Sector guidance ----------------
export const SECTOR_GUIDE = {
  'Financial Services': [['EU financial entities in DORA scope (Art. 2)', 'Manage ICT third-party risk: register of information (DORA Art. 28(3)), pre-contract assessment, exit strategies (Art. 28(8)), key contract provisions (Art. 30)', 'Register and contract templates aligned to DORA; extra terms for critical or important functions', 'Register of information; contracts; exit plans', 'Applies to financial entities, not directly to their vendors (except designated critical ICT providers). Proportionality applies.'], ['US banks', 'Interagency Guidance on Third-Party Relationships (2023)', 'Lifecycle risk management', 'Policy, assessments', 'Guidance, not statute; supervisory expectation.']],
  Healthcare: [['US covered entities and business associates', 'Business associate agreements (45 CFR 164.504(e)); BA notifies covered entity of breach without unreasonable delay and no later than 60 days after discovery (45 CFR 164.410)', 'BAA before PHI is shared; subcontractor BAAs', 'Signed BAAs; subcontractor list', 'Contracts often set shorter windows than the 60-day outer limit.']],
  'Technology & SaaS': [['Processors of personal data (any sector)', 'GDPR Art. 28 processor terms; sub-processor authorisation and flow-down', 'DPA, sub-processor notice and objection, transfer terms', 'DPA; sub-processor list', 'Role depends on facts; a SaaS vendor can be controller for some data.']],
  'Critical Infrastructure': [['NIS2 essential and important entities (EU)', 'Supply chain security as part of cybersecurity risk-management measures (NIS2 Art. 21(2)(d))', 'Supplier security requirements in contracts; supplier assessment', 'Supplier assessments; contract terms', 'Duty is on the entity; national transposition varies.']],
  'Retail & E-Commerce': [['Entities storing, processing or transmitting card data', 'PCI DSS Requirement 12.8 (manage third-party service providers) and 12.9 (TPSPs acknowledge responsibility)', 'List of TPSPs; written agreements; monitor PCI status annually', 'TPSP list; AoCs; responsibility matrix', 'PCI DSS is a contractual standard via card brands and acquirers, not law. PA-DSS was retired (replaced by the PCI Software Security Framework).']],
  Manufacturing: [['US defence contractors handling CUI', 'DFARS 252.204-7012 and NIST SP 800-171; CMMC requirements as phased in', 'Flow down to subcontractors handling CUI', 'Subcontractor assessments; SSP', 'Applies via contract clauses; confirm current CMMC phase.']],
  Government: [['US federal agencies and cloud providers', 'FedRAMP authorisation for cloud services used by agencies; NIST SP 800-53 SR family (supply chain)', 'Use authorised services; SCRM plans', 'Authorisation package; ConMon reports', 'State and local rules differ.']],
};

// ---------------- Verified legal obligations ----------------
export const LEGAL = [
  { law: 'GDPR (EU) 2016/679', type: 'Regulation (law)', art: 'Art. 28(1)-(4)', duty: 'Controller', claim: 'Use only processors providing sufficient guarantees; contract with required terms; processor needs prior written authorisation for sub-processors and must flow down the same obligations; processor remains fully liable for the sub-processor.', src: 'https://eur-lex.europa.eu/eli/reg/2016/679/oj', status: 'Verified' },
  { law: 'GDPR', type: 'Regulation (law)', art: 'Art. 33(1)', duty: 'Controller', claim: 'Notify the supervisory authority without undue delay and, where feasible, not later than 72 hours after becoming aware, unless unlikely to result in a risk; late notices must give reasons.', src: 'https://eur-lex.europa.eu/eli/reg/2016/679/oj', status: 'Verified' },
  { law: 'GDPR', type: 'Regulation (law)', art: 'Art. 33(2)', duty: 'Processor (vendor)', claim: 'Notify the controller without undue delay after becoming aware of a personal data breach. GDPR sets no fixed hour count for processors; any fixed window comes from the contract.', src: 'https://eur-lex.europa.eu/eli/reg/2016/679/oj', status: 'Verified' },
  { law: 'GDPR', type: 'Regulation (law)', art: 'Art. 83(4)(a)', duty: 'Controller or processor', claim: 'Infringements of Arts. 25 to 39 (including Art. 28 and 33) can attract fines up to EUR 10 million or 2% of worldwide annual turnover, whichever is higher. Higher tier (Art. 83(5)) applies to other articles.', src: 'https://eur-lex.europa.eu/eli/reg/2016/679/oj', status: 'Verified' },
  { law: 'DORA (EU) 2022/2554', type: 'Regulation (law)', art: 'Arts. 28 to 30', duty: 'Financial entities in scope', claim: 'ICT third-party risk strategy; register of information on all ICT third-party arrangements (Art. 28(3)); assessment before contracting; exit strategies for services supporting critical or important functions (Art. 28(8)); concentration risk (Art. 29); minimum contract terms (Art. 30), with more for critical or important functions.', src: 'https://eur-lex.europa.eu/eli/reg/2022/2554/oj/eng', status: 'Checked via a national regulator summary (FMA Austria); confirm article text' },
  { law: 'NIS2 (EU) 2022/2555', type: 'Directive (transposed into national law)', art: 'Art. 21(2)(d); Art. 23(4)', duty: 'Essential and important entities', claim: 'Supply chain security is a required cybersecurity risk-management measure. For significant incidents: early warning within 24 hours, incident notification within 72 hours, final report within one month (to the CSIRT or competent authority). The duty is the entity\'s, even if the incident starts at a supplier.', src: 'https://eur-lex.europa.eu/eli/dir/2022/2555/oj/eng', status: 'Checked via secondary sources; confirm article text and national law' },
  { law: 'HIPAA (US)', type: 'Regulation (law)', art: '45 CFR 164.410(a)-(b)', duty: 'Business associate', claim: 'Notify the covered entity of a breach of unsecured PHI without unreasonable delay and no later than 60 calendar days after discovery.', src: 'https://www.ecfr.gov/current/title-45/subtitle-A/subchapter-C/part-164/subpart-D/section-164.410', status: 'Verified' },
  { law: 'PCI DSS v4.0.1', type: 'Industry standard (contractual)', art: 'Req. 12.8, 12.9', duty: 'Entities handling card data; service providers', claim: 'Maintain a list of third-party service providers, written agreements, due diligence before engagement, annual monitoring of their PCI DSS status, and a responsibility matrix. Service providers acknowledge responsibility in writing (12.9).', src: 'https://www.pcisecuritystandards.org/document_library/', status: 'From the standard; confirm wording in your version' },
];
export const LAW_CORRECTIONS = [
  'Texas: Texas Data Privacy and Security Act (TDPSA), effective 1 July 2024 (replaces "Texas Privacy Protection Act").',
  'New York: removed "NYPA" (a proposed New York Privacy Act has not been enacted as far as checked).',
  'Canada: CPPA (Bill C-27) labelled as a bill, not law; it did not complete passage before Parliament was prorogued in January 2025. Re-check status.',
  'South Korea: PIPA (amended 2023). Removed "PIPL", which is China\'s law.',
  'Japan: replaced unclear "CSL" with the Basic Act on Cybersecurity.',
  'PCI: PA-DSS retired; replaced by the PCI Software Security Framework.',
];

// ---------------- Assessment frequency and example vendors by tier (single source) ----------------
// Typical practice; calibrate to your own policy and regulator expectations.
// [tier, full reassessment, ongoing monitoring between assessments, evidence expected]
export const TIER_FREQUENCY = [
  ['Critical (Tier 1)', 'Full reassessment every year, plus a quarterly review of open findings, incidents and service performance.', 'Continuous where available: breach and sub-processor notices, status pages, security news; exit plan tested yearly.', 'SOC 2 Type II or ISO 27001 with SoA, penetration test summary, BCP and DR test results, financial health check.'],
  ['High (Tier 2)', 'Full reassessment every year.', 'Event triggers; assurance report expiry tracked.', 'SOC 2 Type II or ISO 27001, security questionnaire, data processing terms.'],
  ['Medium (Tier 3)', 'Reassessment every two years, or at contract renewal if that comes first.', 'Event triggers; yearly check that certificates have not expired.', 'Short questionnaire plus targeted evidence such as a certificate or policy.'],
  ['Low (Tier 4)', 'No periodic assessment. A short intake check at onboarding and a fact check at each renewal.', 'Re-tier immediately when a trigger below occurs.', 'Inventory record, standard contract terms, confirmation of no data or system access.'],
];

// When does a Low vendor need an assessment? [trigger, what to do]
export const LOW_TIER_TRIGGERS = [
  ['Onboarding', 'Complete the intake questions to confirm the vendor really has no data, no system access and is easy to replace. If any answer changes, it is not Low.'],
  ['Contract renewal', 'Reconfirm the facts behind the Low rating: still no data, no access, spend below threshold, alternatives available.'],
  ['Starts handling your data', 'Any personal, confidential or customer data, including attachments in emails or uploads. Re-tier, usually to Medium or higher.'],
  ['Gets access to your systems', 'SSO accounts, API keys, integrations, VPN or on-site network access. Re-tier and assess.'],
  ['Becomes hard to replace', 'Single source for a business process, or spend crosses your threshold.'],
  ['Adds AI features on your content', 'The service starts sending your data to AI models or uses it for training. Re-tier and review terms.'],
  ['Security incident or ownership change', 'A breach, acquisition, insolvency or move of processing offshore. Check whether the facts behind the tier still hold.'],
];

// [tier, example vendor and service, why it sits in this tier]
export const VENDOR_EXAMPLES = [
  ['Critical', 'Cloud infrastructure provider hosting production, for example AWS, Microsoft Azure or Google Cloud', 'Hosts the application and all customer data; an outage stops the service; no quick substitute; holds privileged infrastructure.'],
  ['Critical', 'Payment processor, for example Stripe or Adyen', 'Revenue stops if it fails; handles cardholder data (PCI DSS scope); switching takes months.'],
  ['Critical', 'Identity provider, for example Okta or Microsoft Entra ID', 'Controls access to every other system; a compromise exposes everything; difficult to replace quickly.'],
  ['High', 'Customer support platform, for example Zendesk or Freshdesk', 'Holds customer personal data and ticket attachments that may include sensitive information; replaceable within weeks.'],
  ['High', 'Payroll and HR system, for example Workday or Gusto', 'Employee personal data, bank details and salaries; regulated data; disruption delays pay but has manual fallbacks.'],
  ['High', 'Managed security or IT provider with admin access', 'Privileged access to production or the corporate network, even though it holds little data itself.'],
  ['Medium', 'Project and work tracking tool, for example Jira or Asana', 'Internal confidential information and limited personal data; accessed through SSO; an outage slows work but does not stop the service.'],
  ['Medium', 'Marketing email platform, for example Mailchimp or HubSpot', 'Customer names and email addresses (low-sensitivity personal data); no access to internal systems; several alternatives.'],
  ['Medium', 'E-signature service, for example DocuSign', 'Contracts with confidential terms; limited personal data; easy to switch.'],
  ['Low', 'Office supplies or furniture vendor', 'No data, no system access, many alternatives, low spend.'],
  ['Low', 'Event venue or catering company', 'Only a contact name and booking details; no system access; easily replaced.'],
  ['Low', 'Stock image or font library', 'Downloads only; no company data shared; no integration.'],
];

export const TIER_EXAMPLE_NOTE = 'The tier depends on what the vendor does for you, not on the brand. The same product can be Critical for one company and Medium for another, depending on the data shared, the access granted and how hard it is to replace. Vendors are named only to make the examples concrete.';
