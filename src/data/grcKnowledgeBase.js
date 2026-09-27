// GRC Knowledge Base — policies, controls, audit observations, GRC rebuttals,
// contract clauses, cross-framework discrepancies, and a vendor clause builder.
// Authored to be practically accurate for GRC / security teams.

export const FRAMEWORK_KB = {
  soc2: {
    id: 'soc2',
    name: 'SOC 2',
    color: '#6366f1',
    desc: 'Trust Services Criteria (TSC) — an attestation report clients and buyers rely on for service organisations.',
    policies: [
      { area: 'Access Management', controls: [
        { text: 'CC6.1–6.3 — user provisioning, least privilege, periodic access reviews', freq: 'Quarterly', policy: 'Access & Identity Policy (CC6.1)', sla: 'Provision within 24h of hire/role change; deprovision within 24h of termination; reviews signed-off each quarter' },
        { text: 'CC6.6 — authentication (incl. MFA)', freq: 'Every login', policy: 'Authentication & MFA Policy (CC6.6)', sla: 'MFA enforced at login; Conditional Access policies reviewed quarterly' },
        { text: 'CC6.7 — timely deprovisioning', freq: 'Event-driven (termination / role change)', policy: 'Access & Identity Policy (CC6.7)', sla: 'Revoke within 24h of termination or role change' },
      ], note: 'Type II needs evidence of reviews across the entire period, not a single snapshot.' },
      { area: 'Change Management', controls: [
        { text: 'CC8.1 — change types, approval, testing, back-out', freq: 'Every production change', policy: 'Change Management Policy (CC8.1)', sla: 'Approval before deployment; testing and back-out documented per change' },
        { text: 'CC8.1 — emergency changes & segregation of duties', freq: 'Event-driven + annual SoD review', policy: 'Change Management Policy — Emergency & SoD (CC8.1)', sla: 'Emergency change back-approved within 24h; SoD conflicts remediated within 30 days' },
      ], note: 'Emergency changes bypassing approval are a top finding unless documented.' },
      { area: 'Incident Response & Monitoring', controls: [
        { text: 'CC7.2–7.4 — monitoring, incident response, resolution & communication', freq: 'Continuous monitoring; IR plan tested at least annually', policy: 'Incident Response Policy (CC7.2–7.4)', sla: 'Critical incidents acknowledged within 15 min; resolution and customer notification per the §3 commitment' },
        { text: 'CC7.3 — evaluation of anomalous activity', freq: 'Continuous', policy: 'Monitoring & Anomaly Policy (CC7.3)', sla: 'Anomalies triaged by severity; confirmed incidents escalated within 24h' },
      ], note: 'Customer notification obligations must be described in the system description.' },
      { area: 'Vendor / Third-Party', controls: [
        { text: 'CC9.1–9.2 — risk identification & supplier monitoring', freq: 'Annual risk assessment; critical suppliers reviewed at least annually', policy: 'Vendor & Third-Party Risk Policy (CC9.1–9.2)', sla: 'Re-assessment within 30 days of a material vendor change' },
        { text: 'CC9.2 — subservice organisation criteria (exclusions if "carve-out")', freq: 'Annual (more often for high-risk)', policy: 'Vendor Risk Policy — Subservice Monitoring (CC9.2)', sla: 'SOC 2 / equivalent refreshed at least annually; exceptions addendum reviewed on publication' },
      ], note: 'Subservice monitors need SOC 2 (or equivalent) evidence, else address as complementary.' },
      { area: 'Risk Assessment & Governance', controls: [
        { text: 'CC3.1–3.4 — risk identification, assessment, response', freq: 'Annual + on significant change', policy: 'Risk Management Policy (CC3.1–3.4)', sla: 'Risk register updated within 14 days of a material change' },
        { text: 'CC2.x — governance structure & policies', freq: 'Annual', policy: 'Governance Policy (CC2.x)', sla: 'Policies and roles approved/reviewed at least annually' },
      ], note: 'Auditors want to see risks tied to the system, not a generic register.' },
      { area: 'Availability / Continuity (if claimed)', controls: [
        { text: 'A1.1, A1.2 — capacity, backup, restore', freq: 'Daily backups; restore tests at least quarterly', policy: 'Availability & Backup Policy (A1.1–A1.2)', sla: 'Restore within stated RTO (e.g. 4h); backups verified after each test' },
        { text: 'A1.3 — recovery time objectives', freq: 'Annual RTO/RPO review', policy: 'Business Continuity Policy (A1.3)', sla: 'RTO/RPO documented and validated in an annual test' },
      ], note: 'Only applicable if you assert availability in the system description — do not assert what you do not meet.' },
      { area: 'HR Security & Background Verification', controls: [
        { text: 'CC6.1 — logical access linked to HR provisioning', freq: 'Event-driven (per hire)', policy: 'Access & Identity Policy + HR Security Policy (CC6.1)', sla: 'Access granted only after background check clears; provisioning within 24h of clearance' },
        { text: 'CC6.2 — timely revocation on role change/termination', freq: 'Event-driven', policy: 'HR Security Policy + Access & Identity Policy (CC6.2)', sla: 'Revoke within 24h of termination or role change' },
      ], note: 'Background checks should be complete before access grant; CC6.1 requires access tied to verified identity.' },
      { area: 'System Description (§3) — End-to-End Drafting', controls: [
        { text: 'DC2019 §3 structure: System Overview, System Boundaries, Criteria Relevant to Services, Complementary User Entity Controls (CUEC), Subservice Organisations, Significant Changes', freq: 'Updated on every significant system change', policy: 'System Description Ownership (SOC 2 §3)', sla: 'Revision drafted within 14 days of change; finalised before period end' },
        { text: 'System Overview: Company background, services offered, commitments to customers, system purpose', freq: 'Annual refresh', policy: 'SOC 2 System Description §3.1', sla: 'Reviewed every attestation period' },
        { text: 'System Boundaries: In-scope applications, infrastructure, data flows, personnel, processes, physical locations', freq: 'Quarterly review + on change', policy: 'SOC 2 System Description §3.2', sla: 'Boundaries updated within 14 days of a change' },
        { text: 'Criteria Mapping: Each TSC criterion (CC1–CC9, A1, PI, C, P) → control description + evidence reference', freq: 'Annual + on control change', policy: 'SOC 2 §3.3 / Control Mapping Matrix', sla: 'Criteria mapped and current before fieldwork' },
        { text: 'CUEC: Controls customer must implement for your controls to work (e.g., customer manages their user access reviews)', freq: 'Annual + when customer controls change', policy: 'SOC 2 §3.4 — CUEC Register', sla: 'Register maintained; communicated to customers at least annually' },
        { text: 'Subservice Organisations: Carve-out vs. Inclusive method — list each, services used, SOC 2 status, monitoring', freq: 'Annual + on new subservice', policy: 'SOC 2 §3.4 — Subservice Register', sla: 'Carve-out/inclusive declared within 30 days of a new subservice' },
        { text: 'Significant Changes: M&A, new services, platform migrations, org restructure during period', freq: 'Event-driven', policy: 'SOC 2 §3.5 — Significant Changes', sla: '§3.5 republished within 14 days of a significant change' },
      ], note: 'The system description is the anchor — everything in Sections 4/5 maps back to it. Inaccuracy here cascades to every finding.' },
    ],
    observations: [
      { finding: 'Access reviews not evidenced or incomplete', why: 'Reviews exist but lack sign-off, date, or evidence across the full period; reviewers include data owners rather than all roles.' },
      { finding: 'Stale system description (§3)', why: 'Description does not match the actual system — components, subservices, customers, or periods differ from what was asserted.' },
      { finding: 'System description omits key subservice organisations', why: 'Subservices (AWS, Cloudflare, Datadog, Stripe, SendGrid) used but not listed; carve-out/inclusive method not declared per sub-service.' },
      { finding: 'System description lacks CUEC completeness', why: 'Customer-responsible controls not documented — auditor cannot determine where your control ends and customer control begins.' },
      { finding: 'System boundaries vague or overstated', why: 'Marketing language used instead of technical boundaries; "we use AWS" instead of "EC2, RDS, S3, Lambda in us-east-1 with IAM roles X, Y, Z".',
        frameworks: ['SOC 2 CC6.1', 'DC2019 §3.2'],
      },
      { finding: 'Criteria mapping missing or generic', why: 'Control descriptions say "we have MFA" instead of "CC6.6 — MFA enforced via Entra ID Conditional Access policy CA001 for all human users; FIDO2 required for admins; evidence: CA policy export, sign-in logs".',
        frameworks: ['SOC 2 CC1–CC9', 'DC2019 §3.3'],
      },
      { finding: 'Significant changes not disclosed', why: 'Platform migration (Heroku→K8s), acquisition, new product line, or org restructure occurred during period but not in §3.5.',
        frameworks: ['SOC 2 DC2019 §3.5'],
      },
      { finding: 'Subservice organisation monitoring absent', why: 'Carve-out service (e.g. AWS) selected but no review of their SOC 2 / exceptions, or inclusive method without control mapping.' },
      { finding: 'Emergency changes bypass review', why: 'No pre-approval, back-out, or post-change review for emergency changes.' },
      { finding: 'Backups not tested / restore failures', why: 'Backups configured but no successful restore within the attestation period, or restore tests exclude the stated RTO.' },
      { finding: 'Background verification completed weeks/months after hire', why: 'HR onboards employee, grants system access, then runs background check (Checkr, HireRight, etc.) 30-90 days later — access existed before verification.' },
      { finding: 'Access review policy states quarterly but performed annually/semi-annually; no sign-off or frequency documented', why: 'Policy document states quarterly reviews (CC6.1), but actual cadence is annual; no reviewer sign-off, no exception tracking, no evidence of frequency compliance.' },
      { finding: 'HR policy mandates background verification via Checkr/equivalent but startup does not perform it', why: 'Employee handbook or HR policy states "all employees undergo background check via Checkr" but no checks are run — policy-to-practice gap.' },
    ],
    rebuttals: [
      { finding: 'Access reviews not evidenced', pushback: 'Prove completeness: show the full review queue (not a sample), reviewer sign-off, and an automated exception report showing "nothing slipped through" — completeness often beats volume.', evidence: 'IAM review tickets, quarterly reports, exception logs, system-generated owner lists.',
        replyToAuditor: 'We run quarterly access reviews in Okta Access Reviews — the full entitlement list is exported on the first business day of each quarter, reviewer sign-off is captured in ticket ITAR-2xx, and the IAM exception report shows zero unsigned-off reviews for the attestation period.' },
      { finding: 'Scope / assertion mismatch', pushback: 'Challenge the control environment boundary. CAS 805-type limitation: controls are evaluated only within the described scope — ask the auditor to isolate exclusions (carve-out) and complementary user entity controls.', evidence: 'Signed system description, control mapping matrix.',
        replyToAuditor: 'Our signed system description §3.2 excludes AWS, Cloudflare and Stripe under the carve-out method, so per AT-C 205 we ask you to test only the in-scope components of our control environment and evaluate complementary subservice controls at the customer entity.' },
      { finding: 'Subservice not monitored', pushback: 'If using a carve-out, the auditor evaluates complementary subservice controls (CUEC) at the user entity; ask them to accept the subservice SOC 2 report and restrict findings to your controls.', evidence: 'Subservice SOC 2 Type II, exceptions addendum.',
        replyToAuditor: 'We monitor AWS via its SOC 2 Type II report with exceptions addendum, reviewed by our Risk team each April and October; Cloudflare and Stripe are re-reviewed on the same six-month cadence and any new exceptions are logged in our vendor risk register with owners.' },
      { finding: 'Compensating concern raised', pushback: 'When a criterion cannot be fully met, request acknowledgement of compensating controls — documented, monitored, and equally effective (TSC CC6/CSP guidance).', evidence: 'Compensating control declaration signed by control owners.',
        replyToAuditor: 'For the vaulted service accounts where interactive MFA is not technically feasible, we rely on compensating controls: credentials held in HashiCorp Vault, session recording in Teleport, and quarterly account attestation by the owning engineering lead — the declaration is signed by all control owners in the CC6.6 evidence pack.' },
      { finding: 'Background verification delayed', pushback: 'GRC Pushback: Implement pre-hire check gate — HR cannot provision access until background check clears (or conditional access with monitoring + auto-revoke on failure). Risk Acceptance: If startup constraint, document risk, implement Day-1 monitoring (EDR, DLP, privileged session recording), run check within 14 days, auto-revoke on adverse result. SOC 2 CC6.1 ties access to verified identity — document the compensating control.', evidence: 'HR-IT onboarding workflow, conditional access policy, background check SLA, monitoring logs, risk acceptance memo signed by CISO/CEO.',
        replyToAuditor: 'Our BambooHR→Okta workflow now blocks account provisioning until the Checkr report clears; where a risk-accepted 14-day window applies, the employee is limited to non-production systems by Conditional Access, watched by EDR/DLP for this period, and an automation auto-revokes access the moment an adverse result lands.' },
      { finding: 'Access review frequency mismatch', pushback: 'GRC Pushback: Align policy to reality — if quarterly is not feasible, formally amend policy to semi-annual with risk-based triggers (role change, termination, privilege escalation), automate review workflow (Okta/Entra access reviews), enforce sign-off via ticketing. Risk Acceptance: Document annual cadence as risk-based decision with compensating monthly automated privilege reports + quarterly manager attestation for high-risk roles only. SOC 2 CC6.1 requires periodic review — define "periodic" and evidence it.', evidence: 'Updated access review policy, automated review workflow config, sign-off tickets, privilege reports, risk acceptance memo.',
        replyToAuditor: 'We amended the access policy to semi-annual reviews with risk-based triggers (role change, termination, privilege escalation); reviews run automated in Okta with sign-off tickets, plus monthly automated privilege reports and quarterly manager attestation for high-risk roles — this is our documented definition of "periodic".' },
      { finding: 'HR policy mandates background check but not performed', pushback: 'GRC Pushback: Either implement the check (Checkr/First Advantage/Sterling) or amend HR policy to reflect actual practice — policy-to-practice gap is a finding. Risk Acceptance: If budget constraint, document risk, implement alternative: reference checks, employment verification, education verification, and conditional access monitoring for 90 days. Map to SOC 2 CC6.1, ISO A.7.1.1, NIST PR.AA-5.', evidence: 'Updated HR policy or implemented Checkr integration, risk acceptance memo, alternative verification records, conditional access logs.',
        replyToAuditor: 'We integrated Checkr with our HRIS onboarding, so checks now run before access for every hire; where budget constrained us on two hires, we documented alternative verification (reference, employment, education) and enforced 90-day conditional-access monitoring instead — the memo and logs are in the evidence pack.' },
      { finding: 'Stale system description (§3)', pushback: 'GRC Pushback: Implement quarterly system description review cycle — Engineering, Security, Legal, Product each validate their section. Risk Acceptance: If drift occurred, document delta, update description, and request auditor test against updated version (permitted under AT-C 205).', evidence: 'Version-controlled system description (Git/Confluence), quarterly review minutes, change log, updated §3.',
        replyToAuditor: 'We operate a quarterly §3 review where Engineering, Security, Legal and Product validate their sections in Confluence; the version under test is v4.2 published within the period, and we request you re-test against the updated description per AT-C 205 rather than the superseded draft.' },
      { finding: 'System description omits key subservice organisations', pushback: 'GRC Pushback: Run automated cloud asset inventory (AWS Config, Cloud Asset Inventory, Azure Resource Graph) → map to vendor list → declare each as carve-out or inclusive. Risk Acceptance: If subservice lacks SOC 2, implement inclusive method with control mapping + CUEC documentation.', evidence: 'Subservice inventory, carve-out/inclusive declaration per vendor, SOC 2 reports, control mapping matrix.',
        replyToAuditor: 'AWS Config, Cloud Asset Inventory and Azure Resource Graph generated our subservice list; each vendor is declared carve-out or inclusive in §3.4 with its SOC 2 status and the exceptions we reviewed against it.' },
      { finding: 'System description lacks CUEC completeness', pushback: 'GRC Pushback: Workshop with Product/CS to identify every customer action required (e.g., "customer must review access quarterly", "customer must configure SSO"). Document as CUEC with criterion reference. Risk Acceptance: If customer refuses CUEC, document as limitation in §3 and management representation letter.', evidence: 'CUEC register with criterion mapping, customer comms, limitation disclosure.',
        replyToAuditor: 'Our CUEC register lists every customer action — such as quarterly customer-side access reviews in Okta and SSO configuration — each mapped to a criterion, acknowledged by customers during implementation, and reflected in §3.4.' },
      { finding: 'System boundaries vague or overstated', pushback: 'GRC Pushback: Rewrite §3.2 using technical inventory — Infrastructure (IaC state), Applications (repo + deploy env), Data (classification + flow diagram), Personnel (roles + access), Physical (DC/office). Remove marketing language. Risk Acceptance: If boundary disputed, request auditor accept "as-described" scope and test only in-scope components.', evidence: 'Technical system boundary doc, architecture diagrams, data flow diagrams, IaC state exports.',
        replyToAuditor: 'We rewrote §3.2 from our Terraform state and architecture diagrams — infrastructure, applications, data classes, personnel roles and physical locations are named assets, not marketing language; the boundary document and diagrams are attached.' },
      { finding: 'Criteria mapping missing or generic', pushback: 'GRC Pushback: Build control mapping matrix — Row per criterion (CC6.1, CC6.6, etc.), Columns: Control Description, Implementation Detail, Evidence Reference, Owner, Frequency, Automation Status. Risk Acceptance: If mapping incomplete, document gap in risk register with remediation timeline.', evidence: 'Control mapping matrix (Excel/Confluence/Drata/Vanta), evidence cross-reference, owner attestations.',
        replyToAuditor: 'Every TSC criterion maps to a control with implementation detail and evidence — for example CC6.6 maps to our Entra ID Conditional Access policy CA001 with the policy export and sign-in logs as the evidence reference.' },
      { finding: 'Significant changes not disclosed', pushback: 'GRC Pushback: Integrate change management with system description — any RFC/CR tagged "significant" auto-triggers §3.5 update. Risk Acceptance: If missed, document in management representation letter and request auditor assess impact on period coverage.', evidence: 'Change log with significance tags, §3.5 updates, management representation letter.',
        replyToAuditor: 'Our change-management workflow tags any RFC that touches §3.5 as significant and auto-triggers a description update; the Heroku→Kubernetes migration was logged as RFC-1184 and §3.5 was republished as v4.1 before period end.' },
    ],
    policyTimeline: {
      drafting: 'Map every policy sentence to a TSC criterion and an evidence owner while writing it — a policy that asserts something you cannot evidence later (e.g. availability) is the most common §3 mistake. Version policies in Confluence with an approval trail so "what was in force on date X" is answerable.',
      beforeAudit: 'Freeze policy versions four to six weeks before fieldwork, publish the release set, and run a mock walkthrough where each control owner cites the current control, its frequency, and its live evidence — auditors test what the policy says on the audit date, not what was true mid-draft.',
      afterFindings: 'Update the policy with the corrective action and an "effective date + supersedes" header, re-issue it, and re-test the control next quarter so you can show sustained effectiveness — auditors interpret a post-finding policy change backed by a re-test as remediation, not paper-filling.',
    },
    timeline: {
      kind: 'attestation',
      total: 'Type II ~13–37 weeks from readiness start · Type I ~6–12 weeks (point-in-time)',
      phases: [
        { name: 'Preparation', weeks: '4–8', detail: 'Gap assessment, implement CC6/CC7 controls, readiness or gap review, build the evidence pack and control-owner map.' },
        { name: 'Observation', weeks: '0 (Type I) / 13–26 (Type II)', detail: 'Type II needs a 3–6 month window of planted, continuously-evidenced controls; Type I is a point-in-time design review.' },
        { name: 'Fieldwork', weeks: '2–4', detail: 'Practitioner tests controls and metrics, interviews owners, samples the observation window.' },
        { name: 'Report issuance', weeks: '1–3', detail: 'QA review, drafting, issuer sign-off and format review → SOC 2 Type II report + management assertion.' },
        { name: 'Maintenance', weeks: 'ongoing', detail: 'Quarterly evidence sweeps, §3 system-description review, exception tracking so the next period starts clean.' },
        { name: 'Re-issuance', weeks: 'annual', detail: 'Start the next Type II 8–12 weeks before period end; re-validate effectiveness rather than rebuild.' },
      ],
    },
    clauses: [
      { title: 'Provide SOC 2 report', text: 'Vendor shall provide its most recent SOC 2 Type II report (and any exceptions) annually, within 15 days of issuance, and promptly upon Client request.', required: true },
      { title: 'Subservice evidence', text: 'Vendor shall maintain and share SOC 2 (or equivalent) reports for all subservice organisations used to deliver the services, and notify Client of material subservice changes.', required: true },
      { title: 'Audit & assessment rights', text: 'Client may perform, or engage an auditor for, a security assessment of the services with 30 days notice, subject to confidentiality and impartiality.', required: true },
      { title: 'Availability commitment', text: 'If availability is claimed, Vendor shall meet the stated uptime and recovery objectives and report availability metrics monthly.', required: false },
    ],
    discrepancies: [
      'SOC 2 has no mandated retention period for logs — fits beside PCI 12-month and HIPAA 6-year rules.',
      'SOC 2 does not require role-based user rotation like PCI 8.x; access-review evidence is the focus.',
    ],
  },
  iso27001: {
    id: 'iso27001',
    name: 'ISO 27001',
    color: '#10b981',
    desc: 'The international ISMS certification — 93 Annex A controls in the 2022 edition, risk-based and auditable.',
    policies: [
      { area: 'ISMS Policy & Leadership', controls: [
        { text: 'A.5.1 – A.5.3 — policies, roles, responsibilities', freq: 'Annual policy review + on change', policy: 'ISMS Policy (A.5.1) / Information Security Policy (A.5.2)', sla: 'Top-management approval evidenced (signature/minutes) at least annually' },
        { text: 'A.5.2 — information security direction', freq: 'Annual + on material change', policy: 'Information Security Policy (A.5.2)', sla: 'Direction reaffirmed at management review' },
      ], note: 'Policy must be approved by top management with evidence (signature/minutes).' },
      { area: 'Risk Management', controls: [
        { text: 'A.5.4 – A.5.7 — risk assessment, treatment, statements of applicability (SoA)', freq: 'Annual full risk assessment + on significant change', policy: 'Risk Management Policy / SoA (A.5.4–A.5.7)', sla: 'Risk treatment updates within 30 days of a material change; SoA reviewed at least annually' },
      ], note: 'SoA must reflect actual decisions — an "all included" SoA is a common weakness.' },
      { area: 'Access Control', controls: [
        { text: 'A.8.1 – A.8.5 — access rules, privileged access, authentication, secrets', freq: 'Quarterly access reviews; privileged reviewed monthly', policy: 'Access Control Policy (A.8.1–A.8.5)', sla: 'Revoke within 24h of termination; privileged/secret rotation per risk (quarterly floor)' },
      ] },
      { area: 'Supplier Security', controls: [
        { text: 'A.5.19 – A.5.21 — agreements, assessments, monitoring', freq: 'Annual + on new supplier', policy: 'Supplier Security Policy (A.5.19–A.5.21)', sla: 'Assessment completed before onboarding; re-assessment at least annually' },
      ] },
      { area: 'Incident Management', controls: [
        { text: 'A.5.24 – A.5.28 — responsibilities, reporting, response (also A.8.23 web filtering)', freq: 'Continuous; IR tested at least annually', policy: 'Incident Management Policy (A.5.24–A.5.28)', sla: 'Incidents logged with severity SLAs; lessons-learned review within 30 days' },
      ] },
      { area: 'Business Continuity', controls: [
        { text: 'A.5.29 – A.5.30 — ICT readiness for continuity, and documentation', freq: 'Annual ICT-readiness / BCP test', policy: 'Business Continuity Policy (A.5.29–A.5.30)', sla: 'RTO/RPO met in the annual test' },
      ] },
      { area: 'Monitoring & Logging', controls: [
        { text: 'A.8.15 – A.8.16 — logging, monitoring', freq: 'Continuous; daily review for critical, weekly otherwise', policy: 'Logging & Monitoring Policy (A.8.15–A.8.16)', sla: 'Logs retained per the retention matrix; reviewed per cadence' },
        { text: 'A.8.17 – A.8.18 — clock sync, protection', freq: 'Continuous', policy: 'Logging & Monitoring Policy (A.8.17–A.8.18)', sla: 'NTP clock sync enforced; logs integrity-protected' },
      ] },
      { area: 'HR & Training', controls: [
        { text: 'A.6.3 — awareness, education, training; confidentiality (A.5.11)', freq: 'Annual awareness + on hire', policy: 'Training & Awareness Policy (A.6.3)', sla: 'New hires trained within 30 days; annual refresher for all' },
      ] },
      { area: 'HR Security & Background Verification', controls: [
        { text: 'A.7.1.1 — screening', freq: 'Pre-hire (event-driven)', policy: 'HR Security Policy (A.7.1.1)', sla: 'Completed before access grant' },
        { text: 'A.7.1.2 — terms and conditions', freq: 'On hire / on change', policy: 'HR Security Policy (A.7.1.2)', sla: 'Acknowledged before access' },
        { text: 'A.7.2.1 — management responsibilities', freq: 'Ongoing', policy: 'HR Security Policy (A.7.2.1)', sla: 'Roles enforced throughout employment' },
        { text: 'A.7.2.2 — information security awareness', freq: 'Annual', policy: 'Training & Awareness Policy (A.7.2.2)', sla: 'Annual awareness completed by all staff' },
        { text: 'A.7.3.1 — termination or change of employment', freq: 'Event-driven', policy: 'HR Security Policy (A.7.3.1)', sla: 'Access revoked within 24h of termination/change' },
      ], note: 'A.7.1.1 requires background verification proportional to business requirements and access level; must be completed before access grant.' },
    ],
    observations: [
      { finding: 'SoA not accurate', why: 'Statement of Applicability lists controls not implemented, or omits exclusions without justification.' },
      { finding: 'Risk assessment not asset/process complete', why: 'Risk register omits key assets, data flows, or outsourced processes; likelihood/impact unsupported.' },
      { finding: 'Management review not evidenced', why: 'No minutes, attendance, or action follow-ups from periodic management review.' },
      { finding: 'Internal audit not independent', why: 'Auditors audited their own area, or no audit programme/TOR with full coverage.' },
      { finding: 'Supplier assessments absent or stale', why: 'A.5.19/A.8 supplier review missing, not refreshed, or evidence undiscoverable.' },
      { finding: 'Background verification completed weeks/months after hire', why: 'HR onboards employee, grants system access, then runs background check 30-90 days later — A.7.1.1 requires screening before access based on role risk.' },
      { finding: 'Access review policy states quarterly but performed annually/semi-annually; no sign-off or frequency documented', why: 'A.8.2 requires periodic review of access rights; policy states quarterly but actual cadence is annual with no reviewer sign-off or exception tracking.' },
      { finding: 'HR policy mandates background verification via Checkr/equivalent but startup does not perform it', why: 'Employee handbook or HR policy states "all employees undergo background check via Checkr" but no checks are run — A.7.1.1 policy-to-practice gap.' },
    ],
    rebuttals: [
      { finding: 'Control claimed but not in SoA', pushback: 'The SoA is the documented, risk-based basis. A control not in scope can be justified via exclusion criteria (A.5.7); request the auditor challenge the risk decision, not apply a blanket expectation.', evidence: 'SoA + risk treatment plan with justifications.',
        replyToAuditor: 'The SoA at A.5.7 lists this control as explicitly excluded with our full risk-decision rationale — the control is risk-treated, not omitted; we ask that you evaluate the exclusion criteria and residual-risk acceptance rather than apply a blanket expectation.' },
      { finding: 'Risk assessment scope', pushback: 'Ask for the specific asset/criteria the auditor believes is missing, then demonstrate it is covered by an inherited/out-of-scope decision (e.g. cloud in provider scope), documented in the risk register.', evidence: 'Risk register, scope statement.',
        replyToAuditor: 'Our risk register covers every asset and process in the ISMS scope statement; the cloud workloads are documented as inherited from the provider ISO 27001 certificate under the shared-responsibility model, so they carry an inherited note in the register rather than a gap.' },
      { finding: 'Management review', pushback: 'Present the review schedule, minutes, attendance, and the closed-loop actions from prior reviews; use this to show top-management commitment aligns with clause 9.3.', evidence: 'Minutes, attendance list, action tracker.',
        replyToAuditor: 'Clause 9.3 is evidenced by our quarterly management-review files — each with attendance, the KPI/incident dashboard, the action tracker, and sign-off; the last review closed seven actions and escalated two residual risks to the board.' },
      { finding: 'Internal audit independence', pushback: 'Surface the internal audit programme, TOR, and independence attestations; request the auditor focus on the programme rather than individual sampling.', evidence: 'Audit programme, TOR, independence declarations.',
        replyToAuditor: 'Our internal audit programme is governed by a board-approved TOR, auditors come from outside the audited area, and every engagement opens with a signed independence declaration — we ask that the programme coverage map be reviewed rather than a single sample.' },
      { finding: 'Background verification delayed', pushback: 'GRC Pushback: Implement pre-hire screening gate per A.7.1.1 — access provisioned only after check clears or conditional access with monitoring + auto-revoke. Risk Acceptance: If startup constraint, document risk in risk treatment plan, implement Day-1 monitoring (SIEM alerts, DLP, session recording), run check within 14 days, auto-revoke on adverse result. Reference A.7.1.1 "proportional to business requirements".', evidence: 'HR-IT onboarding workflow, conditional access policy, background check SLA, monitoring logs, risk treatment plan entry, risk acceptance memo signed by CISO/ISO owner.',
        replyToAuditor: 'Per A.7.1.1, provisioning is blocked until screening clears; where a risk-accepted 14-day window applies, the individual is limited to non-sensitive systems with SIEM alerts, DLP and session recording, and an automation auto-revokes access on any adverse result.' },
      { finding: 'Access review frequency mismatch', pushback: 'GRC Pushback: Align policy to reality — amend to semi-annual with risk-based triggers (role change, termination, privilege escalation), automate via IAM (Okta/Entra access reviews), enforce sign-off via ticketing. Risk Acceptance: Document annual cadence as risk-based decision with compensating monthly automated privilege reports + quarterly manager attestation for high-risk roles. A.8.2 requires "periodic" — define and evidence it.', evidence: 'Updated access control policy, automated review workflow config, sign-off tickets, privilege reports, risk acceptance memo.',
        replyToAuditor: 'We formalised A.8.2 with a semi-annual cadence and role-change triggers; reviews run automatically in Entra ID access reviews with sign-off tickets, plus a monthly privilege report for elevated accounts — our documented risk-based definition of "periodic".' },
      { finding: 'HR policy mandates background check but not performed', pushback: 'GRC Pushback: Either implement the check (Checkr/First Advantage/Sterling) or amend HR policy — policy-to-practice gap is an A.7.1.1 finding. Risk Acceptance: If budget constraint, document risk, implement alternative: reference checks, employment verification, education verification, conditional access monitoring for 90 days. Map to A.7.1.1, A.8.2.', evidence: 'Updated HR policy or implemented Checkr integration, risk acceptance memo, alternative verification records, conditional access logs.',
        replyToAuditor: 'Checkr is now wired into onboarding so checks actually run before access; for constrained hires we documented alternative verification (reference, employment, education) plus 90-day conditional-access monitoring, with the risk decision signed under A.5.7.' },
    ],
    policyTimeline: {
      drafting: 'Draft the SoA as a live risk decision, not a checklist — every excluded control gets a one-line justification and a residual-risk owner, which is exactly what an ISO auditor wants to read. Reference clause numbers inside policy text (A.7.1.1, A.8.2) so mapping is self-service.',
      beforeAudit: 'Confirm the SoA and policy versions on record match the ISMS scope statement, publish versioned copies, and rehearse a clause-9-style interview so executives answer with minutes and action-tracker evidence instead of memory.',
      afterFindings: 'Route every nonconformity to a policy revision with an "effective date + supersedes" header and re-audit the clause within the corrective-action window — converting an isolated lapse into documented, re-tested improvement.',
    },
    timeline: {
      kind: 'certification',
      total: 'Certificate in ~16–36 weeks fresh; surveillance ~4–8 weeks; recert on a 3-year cycle',
      phases: [
        { name: 'Preparation', weeks: '12–26', detail: 'ISMS build: scope, SoA, risk treatment, policy set, awareness, internal audit — the most common slippage point.' },
        { name: 'Observation', weeks: '4–8', detail: 'Evidence accumulation before Stage 1: records, logs, risk register updates, 9.3 management review.' },
        { name: 'Fieldwork', weeks: '4–8', detail: 'Stage 1 (doc review, ~1–2 wks) → Stage 2 (implementation audit, ~2–4 wks); minor NCs get a follow-up window.' },
        { name: 'Report issuance', weeks: '1–2', detail: 'Audit report + certificate issued within ~90 days of Stage 2 under certification-body rules.' },
        { name: 'Maintenance', weeks: 'ongoing', detail: 'Annual surveillance audits (~12 months after cert) per the certification plan.' },
        { name: 'Re-issuance', weeks: '3-year cycle', detail: 'Full recertification on year 3 — faster than initial if the ISMS was actually maintained.' },
      ],
    },
    clauses: [
      { title: 'Certificate & surveillance', text: 'Vendor shall maintain its ISO 27001 certificate and complete annual surveillance audits, providing the certificate and scope statement on request.', required: true },
      { title: 'Scope change notice', text: 'Vendor shall notify Client within 30 days of any material change to its ISMS scope or certificate status (including withdrawal or suspension).', required: true },
      { title: 'Information security requirements', text: 'Vendor shall implement information security per its ISMS and flow down these obligations to sub-suppliers used to provide the services.', required: false },
    ],
    discrepancies: [
      'ISO 27001 wants evidence of training and audit results; like HIPAA, no fixed log-retention clock (so a retained archive aligns both).',
      'Enforcing 90-day password rotation is now discouraged by A.8.5 / NIST guidance — an ISO auditor should not require rotation.',
    ],
  },
  pci: {
    id: 'pci',
    name: 'PCI-DSS',
    color: '#ef4444',
    desc: 'Payment card industry data security standard (v4.0) — mandatory if you store, process, or transmit cardholder data.',
    policies: [
      { area: 'Access Control', controls: [
        { text: 'Req 7 — least privilege', freq: 'Quarterly access reviews', policy: 'Access Control Policy (Req 7)', sla: 'Deprovision within 24h of termination; reviews signed-off quarterly' },
        { text: 'Req 8 — user ID, MFA for remote/non-console admin, no shared ID without accountability', freq: 'Per login (MFA)', policy: 'Authentication Policy (Req 8)', sla: 'MFA on all remote and non-console admin access; every action traceable to a unique ID' },
      ] },
      { area: 'Encryption & Data', controls: [
        { text: 'Req 3 — protect stored account data, PAN masking, no crypto weaknesses', freq: 'Continuous; storage validation quarterly', policy: 'Data Protection Policy (Req 3)', sla: 'PAN never stored after authorization insecurely; masking applied everywhere rendered' },
        { text: 'Req 4 — strong cryptography in transit (TLS 1.2+)', freq: 'Continuous', policy: 'Transmission Security Policy (Req 4)', sla: 'TLS 1.2+ enforced; cipher suite review at least annually' },
      ] },
      { area: 'Networking & Config', controls: [
        { text: 'Req 1 — firewall & segmentation', freq: 'On-change + annual validation', policy: 'Firewall & Segmentation Policy (Req 1)', sla: 'Segmentation test (Req 11.4.7) at least annually; firewall rules reviewed on change' },
        { text: 'Req 2 — no vendor defaults', freq: 'Before deployment', policy: 'Configuration Management Policy (Req 2)', sla: 'Vendor defaults disabled before go-live' },
      ] },
      { area: 'Logging & Monitoring', controls: [
        { text: 'Req 10 — audit logs (12 months with 90 days immediately accessible)', freq: 'Continuous collection; daily monitoring / weekly review', policy: 'Logging & Monitoring Policy (Req 10)', sla: 'Retained at least 12 months, 90 days immediately accessible; monitored daily' },
      ] },
      { area: 'Vulnerability Mgmt', controls: [
        { text: 'Req 5 — malware protection', freq: 'Continuous', policy: 'Endpoint Protection Policy (Req 5)', sla: 'Signature updates deployed; scans scheduled; detections remediated per severity' },
        { text: 'Req 6 — secure development & patch mgmt', freq: 'Per release; patch monthly (critical sooner)', policy: 'Secure Development & Patch Policy (Req 6)', sla: 'Critical patches within 7 days, high within 30; no insecure code promoted' },
        { text: 'Req 11 — ASV quarterly scans, pen tests, segmentation tests', freq: 'Quarterly ASV + annual pen test + after significant change', policy: 'Vulnerability Management Policy (Req 11)', sla: 'Scan must pass each quarter; failing scan retested within 30 days' },
      ] },
      { area: 'Security Program', controls: [
        { text: 'Req 12 — governance, policy, risk, service-provider monitoring (12.8), incident response (12.10)', freq: 'Annual program review; IR plan tested at least annually', policy: 'Security Program & Governance Policy (Req 12)', sla: 'Program policies current; service-provider monitoring per 12.8; 12.10 runbook tested' },
      ] },
      { area: 'HR & Background Verification', controls: [
        { text: 'Req 12.7 — background checks for personnel with access to cardholder data or systems', freq: 'Pre-hire / pre-access (event-driven)', policy: 'HR Security Policy (Req 12.7)', sla: 'Completed before access to cardholder data or systems' },
        { text: 'Req 8.3.2 — no periodic password rotation required (v4.0), change only on compromise', freq: 'On compromise/risk only', policy: 'Authentication Policy (Req 8.3.2)', sla: 'No forced periodic rotation; reset on compromise or suspected exposure' },
      ], note: 'Req 12.7 mandates background checks for personnel with access to cardholder data / systems — proportional to role risk.' },
    ],
    observations: [
      { finding: 'Logs not retained 12 months / 90 days retrievable', why: 'Req 10.5.1 — audit trails must be retained at least 12 months with 90 days immediately available for forensic need.' },
      { finding: 'MFA gaps', why: 'Req 8.4.x — MFA missing for remote access, non-console admin, or service accounts (v4 tightened these).' },
      { finding: 'Failed quarterly ASV scans / no retest', why: 'Req 11.3.2 — scans must pass every quarter with no failing scan after changes.' },
      { finding: 'PAN stored beyond need / not masked', why: 'Req 3.3/3.4 — storage minimisation and masking not documented or enforced.' },
      { finding: 'Network diagrams / segmentation not validated', why: 'Req 1.1.6/1.3 — diagrams stale, scope reduction asserted without a segmentation test (Req 11.4.7).' },
      { finding: 'Service provider (you) monitoring absent', why: 'Req 12.8 — no documented process to monitor your own service-provider relationships, or failing to provide/obtain reports.' },
      { finding: 'Background verification completed weeks/months after hire', why: 'Req 12.7 — personnel with access to cardholder data/systems must have background checks before access; post-hire checks violate requirement.' },
      { finding: 'Access review policy states quarterly but performed annually/semi-annually; no sign-off or frequency documented', why: 'Req 7.2 / 8.2.x — periodic review of access required; policy-reality gap with no evidence of frequency or sign-off.' },
      { finding: 'HR policy mandates background verification via Checkr/equivalent but startup does not perform it', why: 'Req 12.7 — policy states checks but none performed; policy-to-practice gap for personnel with cardholder data access.' },
    ],
    rebuttals: [
      { finding: 'Failed ASV scan', pushback: '− ask the ASV to revalidate; challenge "false positives" formally via the scan vendor and retest. Accept only after the ASV signs off — an unvalidated failure stays a finding.', evidence: 'Retest report, ASV exception/validation correspondence.',
        replyToAuditor: 'We asked the ASV vendor to revalidate the Q3 scan and supplied the device context behind each flagged finding; the ASV signed off the false-positive exception on the retest report attached here, so the requirement is met for that quarter.' },
      { finding: 'Log retention gap', pushback: 'Demonstrate equivalent capability: if online 90 days is disruptive, implement an alternative retrieval SLA documented in policy — then argue the intent (forensic availability) is met.', evidence: 'Retention matrix, retrieval SLA, archived log restore test.',
        replyToAuditor: 'Our retention matrix keeps 12 months of CDE logs archived with 90 days online in Splunk; a restore drill last month pulled a month-old archive within our four-hour SLA, so the forensic-availability intent of Req 10.5 is met.' },
      { finding: 'Segmentation assertion', pushback: 'Run & document the segmentation test (Req 11.4.7) and show in-scope traffic only — this usually clears the scope-reduction challenge.', evidence: 'Segmentation test, network diagrams.',
        replyToAuditor: 'We ran the Req 11.4.7 segmentation test in February and the traffic analysis shows only in-scope traffic crossing into the CDE; the test report with diagrams is attached.' },
      { finding: 'MFA for service accounts', pushback: 'Where impossible, present compensating controls via the PCI-DSS CSF (compensating control template) — documented, reviewed annually, independently assessed.', evidence: 'CSF compensating controls declaration.',
        replyToAuditor: 'MFA is enforced in Duo for all interactive administrative access; for the service accounts where a non-interactive credential is unavoidable, we filed the PCI-DSS CSF compensating-control template with vaulted credentials in HashiCorp Vault and quarterly owner attestation — reviewed annually as the CSF requires.' },
      { finding: 'Background verification delayed', pushback: 'GRC Pushback: Implement pre-hire check gate per Req 12.7 — access provisioned only after check clears. Risk Acceptance: Document in risk register, implement Day-1 monitoring (EDR, DLP, session recording), run check within 14 days, auto-revoke on adverse result. Req 12.7 is proportional to role — limit initial access to non-cardholder systems.', evidence: 'HR-IT onboarding workflow, conditional access policy, background check SLA, monitoring logs, risk acceptance memo signed by CISO/QSA.',
        replyToAuditor: 'Req 12.7 is enforced by blocking CDE access until the background check clears; where a risk-accepted 14-day window applies, the individual is limited to non-CDE systems under EDR and DLP monitoring with automatic revocation on any adverse result.' },
      { finding: 'Access review frequency mismatch', pushback: 'GRC Pushback: Align policy — automate quarterly reviews via IAM (Entra ID/Okta), enforce sign-off. Risk Acceptance: Document semi-annual cadence with compensating monthly automated privilege reports + quarterly attestation for CDE-access roles. Req 7.2 requires periodic review — define periodicity and evidence it.', evidence: 'Updated access review policy, automated review config, sign-off tickets, privilege reports, risk acceptance memo.',
        replyToAuditor: 'We automated quarterly access reviews in Okta with sign-off tickets for CDE roles, plus monthly automated privilege reports and quarterly attestation; the policy now defines this documented periodicity for Req 7.2, and the evidence set covers every quarter in scope.' },
      { finding: 'HR policy mandates background check but not performed', pushback: 'GRC Pushback: Implement Checkr/Sterling or amend policy — Req 12.7 policy-to-practice gap is a finding. Risk Acceptance: Document risk, implement alternative verification (reference, employment, education) + 90-day conditional monitoring for CDE-access roles.', evidence: 'Updated HR policy or Checkr integration, risk acceptance memo, alternative verification records, conditional access logs.',
        replyToAuditor: 'Checkr now runs at onboarding for every CDE-access role; for the two constrained hires we documented alternative verification (reference, employment, education) with 90-day conditional monitoring, and the risk acceptance is on file under Req 12.7.' },
    ],
    policyTimeline: {
      drafting: 'Write policy to the v4.0 requirements, not inherited habit — keep the 90-day-rotation line out of the policy (8.3.2 removed it) and make log-retention 12 months explicit so retention evidence maps one-to-one.',
      beforeAudit: 'Confirm every "policy" claim (segmentation, MFA coverage, review frequency) has a runnable evidence artifact from the ASV run, the CDE access list and the IAM sign-off queue before submitting the SAQ or ROC.',
      afterFindings: 'Document corrective action in policy with an effective-date header, re-run the ASV/segmentation test to prove the fix, and retain the retest alongside the original finding so the next assessor sees closed-loop remediation.',
    },
    timeline: {
      kind: 'compliance',
      total: '~12–26 weeks to a defensible SAQ/ROC, then continuous',
      phases: [
        { name: 'Preparation', weeks: '8–16', detail: 'Scope reduction (segmentation test), CDE inventory, requirements gap, remediation of failing controls.' },
        { name: 'Observation', weeks: '4–12', detail: 'Rolling evidence: quarterly ASV scans, log retention running, access reviews, vulnerability scans.' },
        { name: 'Fieldwork', weeks: '2–4', detail: 'QSA assessment (ROC) or self-assessment (SAQ): controls, interviews, sampling; ASV must pass before submit.' },
        { name: 'Report issuance', weeks: '1–4', detail: 'SAQ completion or ROC report + AOC issued by the QSA/acquirer.' },
        { name: 'Maintenance', weeks: 'ongoing', detail: 'Quarterly ASV scans, annual pen test, continuous CDE monitoring — a scan must never fail at quarter end.' },
        { name: 'Re-issuance', weeks: 'annual', detail: 'New SAQ/ROC every year; v4.0 already requires ongoing validation of several controls.' },
      ],
    },
    clauses: [
      { title: 'Maintain compliance & AOC', text: 'Vendor shall maintain PCI-DSS compliance at its level, provide its Attestation of Compliance (AOC) and ROC summary annually and upon request, and notify Client of any loss or revocation of compliance status.', required: true },
      { title: 'Req 12.8 support', text: 'Vendor shall, upon Client request, provide evidence of its annual assessment and the report availability required under PCI-DSS Req 12.8.', required: true },
      { title: 'Cardholder data scope', text: 'Vendor shall only process cardholder data as needed, and shall not store PAN except as contractually required, in accordance with Req 3.', required: false },
    ],
    discrepancies: [
      'PCI wants 12-month log retention — 365 days — which outlives GDPR minimization logic; archive and mask rather than delete.',
      'PCI v4 removed mandatory periodic user password rotation (8.3.2) — aligns with NIST 800-63B; challenge auditors who still demand 90-day rotation.',
    ],
  },
  hipaa: {
    id: 'hipaa',
    name: 'HIPAA',
    color: '#0ea5e9',
    desc: 'US federal law for PHI — Security Rule (administrative, physical, technical safeguards) and Privacy Rule.',
    policies: [
      { area: 'Security Management Process', controls: [
        { text: '45 CFR 164.308(a)(1) — risk analysis, risk management, policies & sanctions', freq: 'At least annually + on significant change', policy: 'Security Management Process Policy (164.308(a)(1))', sla: 'Risk analysis kept current; refreshed within 30 days of material change' },
      ], note: 'Risk analysis has no magic interval but must be kept current; many chose annual.' },
      { area: 'Workforce & Training', controls: [
        { text: '164.308(a)(2) – (5) — workforce security, training, awareness', freq: 'Training annually; workforce security ongoing', policy: 'Workforce Security & Training Policy (164.308(a)(2)–(5))', sla: 'Training within 30 days of hire; annual refresher for all' },
      ] },
      { area: 'Contingency Plan', controls: [
        { text: '164.308(a)(7) — backup, disaster recovery, emergency mode operation, testing', freq: 'Contingency plan tested at least annually', policy: 'Contingency Plan & DR Policy (164.308(a)(7))', sla: 'Restoration drill meets RTO; emergency-mode operation exercised' },
      ] },
      { area: 'Access & Audit', controls: [
        { text: '164.312(a) – (b) — access controls, audit controls', freq: 'Quarterly access reviews', policy: 'Access Control & Audit Logging Policy (164.312(a)–(b))', sla: 'Revoke within 24h of termination; audit logs reviewed per cadence' },
      ] },
      { area: 'Physical & Transmission', controls: [
        { text: '164.310(a)–(d) — facility access, workstation/device media', freq: 'On-change + annual facility review', policy: 'Facility, Workstation & Device/Media Policy (164.310(a)–(d))', sla: 'Device/media logs maintained; media sanitised on disposal' },
        { text: '164.312(e) — transmission safeguards', freq: 'Continuous', policy: 'Transmission Security Policy (164.312(e))', sla: 'ePHI encrypted in transit; no plaintext transmission' },
      ] },
      { area: 'Breach & BAAs', controls: [
        { text: '164.410 — breach notification', freq: 'Event-driven', policy: 'Breach Notification Policy (164.410)', sla: 'Notify without unreasonable delay, ≤60 days; four-factor risk-of-harm assessment documented' },
        { text: '164.504 — Business Associate agreements with every BA', freq: 'Annual BAA inventory + on new BA', policy: 'Business Associate & Vendor Policy (164.504)', sla: 'BAA (and downstream BAAs) signed before PHI access' },
      ], note: 'BAAs are required even where the BA "only passes through" data.' },
      { area: 'HR & Background Verification', controls: [
        { text: '164.308(a)(2) — workforce security (authorization/supervision)', freq: 'Ongoing / on hire', policy: 'Workforce Security Policy (164.308(a)(2))', sla: 'Authorization and supervision documented before PHI access' },
        { text: '164.308(a)(3) — workforce clearance procedures', freq: 'Pre-hire', policy: 'Workforce Clearance Procedures (164.308(a)(3))', sla: 'Clearance completed before PHI access' },
        { text: '164.308(a)(4) — termination procedures', freq: 'Event-driven', policy: 'Workforce Termination Policy (164.308(a)(4))', sla: 'Access revoked within 24h of termination' },
      ], note: 'Workforce security requires authorization/supervision and clearance procedures — background checks expected for PHI-access roles.' },
    ],
    observations: [
      { finding: 'Risk analysis not current', why: 'Performed once years ago; not refreshed when systems, vendors, or processes changed (implementation specification: keep risk analysis current).' },
      { finding: 'BAA missing with subcontractor', why: 'BA engaged an IT vendor but no BAA of flow-down — 164.504 requires BAAs and downstream BAAs.' },
      { finding: 'Encryption "addressable" unaddressed', why: 'Encryption of data at rest/in transit is addressable — an unanswered "not implemented + rationale" fails the requirement.' },
      { finding: 'Training not documented / not credentialed', why: 'Security awareness conducted but no attendance records or role-based content tracked.' },
      { finding: 'Breach notification timeliness', why: 'No practice of determining "risk of harm" and notifying without unreasonable delay (max 60 days).' },
      { finding: 'Background verification completed weeks/months after hire', why: '164.308(a)(2)-(3) — workforce authorization and clearance procedures require screening before PHI access; post-hire checks violate implementation spec.' },
      { finding: 'Access review policy states quarterly but performed annually/semi-annually; no sign-off or frequency documented', why: '164.308(a)(4) / 164.312(a) — access authorization and review required; policy-reality gap with no evidence of periodic review or sign-off.' },
      { finding: 'HR policy mandates background verification via Checkr/equivalent but startup does not perform it', why: '164.308(a)(2)-(3) — policy states checks but none performed; workforce clearance procedures not implemented for PHI-access roles.' },
    ],
    rebuttals: [
      { finding: 'Addressable control not implemented', pushback: 'Addressable ≠ mandatory. Document the decision: equivalent alternative measures, infeasibility analysis, and residual risk acceptance (164.306(d)). Auditors accept a well-reasoned rationale.', evidence: 'Safeguard decision register, risk analysis.',
        replyToAuditor: 'For the addressable safeguards we did not implement wholesale, the 164.306(d) decision register documents the equivalent measures, the infeasibility analysis and signed residual-risk acceptance — the rationale is on the record rather than a silent gap.' },
      { finding: 'Risk analysis methodology', pushback: 'Ground it in NIST SP 800-30 methodology; if the auditor wants a specific quantitative threshold, ask them to reference the standard — HIPAA has no mandated RPO/RT or scoring model.', evidence: 'Risk analysis report using 800-30, risk register.',
        replyToAuditor: 'Our risk analysis follows NIST SP 800-30 with asset/vulnerability/threat triples scored on likelihood and impact; the register is refreshed quarterly and on any material system or vendor change — an HIPAA-mandated scoring model does not exist for us to have missed.' },
      { finding: 'Breach notification', pushback: 'Demonstrate the four-factor risk-of-harm assessment documented per notification; that is what determines "notification without unreasonable delay", not an arbitrary calendar.', evidence: 'Breach logs, risk-of-harm determinations.',
        replyToAuditor: 'For the December incident we documented the four-factor risk-of-harm assessment (nature of data, parties, acquisition likelihood, mitigating controls); notification went out within eight business hours, well inside the 60-day ceiling, with all Article-5 elements in the notice.' },
      { finding: 'Background verification delayed', pushback: 'GRC Pushback: Implement pre-hire clearance per 164.308(a)(3) — no PHI access until check clears. Risk Acceptance: Document in risk analysis, implement Day-1 monitoring (audit logs, DLP, session recording), run check within 14 days, auto-revoke on adverse result. Limit initial access to non-PHI systems.', evidence: 'HR-IT onboarding workflow, conditional access policy, background check SLA, monitoring logs, risk analysis entry, risk acceptance memo.',
        replyToAuditor: 'Workforce clearance per 164.308(a)(3) now blocks PHI access until screening clears; risk-accepted hires are limited to non-PHI systems for the 14-day window with audit log, DLP and session-recording monitoring, and an automation revokes access on any adverse result.' },
      { finding: 'Access review frequency mismatch', pushback: 'GRC Pushback: Automate quarterly reviews via IAM, enforce sign-off per 164.308(a)(4). Risk Acceptance: Document semi-annual cadence with compensating monthly automated reports + quarterly attestation for PHI-access roles. "Periodic" must be defined and evidenced.', evidence: 'Updated access policy, automated review config, sign-off tickets, privilege reports, risk acceptance memo.',
        replyToAuditor: 'Access reviews run quarterly in our IAM with sign-off for PHI-access roles; the policy now defines semi-annual for low-risk roles, backed by monthly automated reports and quarterly attestation for PHI roles — "periodic" is defined and evidenced per 164.308(a)(4).' },
      { finding: 'HR policy mandates background check but not performed', pushback: 'GRC Pushback: Implement check or amend policy — 164.308(a)(2)-(3) policy-to-practice gap is a finding. Risk Acceptance: Document risk, implement alternative verification + 90-day conditional monitoring for PHI-access roles.', evidence: 'Updated HR policy or check integration, risk acceptance memo, alternative verification records, conditional access logs.',
        replyToAuditor: 'Checks now actually run at onboarding for PHI-access roles via our HRIS integration; where budget-constrained we documented alternative verification plus 90-day conditional monitoring and recorded the decision in the risk analysis.' },
    ],
    policyTimeline: {
      drafting: 'Draft each safeguard with an explicit 164.306(d) posture line (required / addressable + equivalent measure / rationale), so an auditor can read the decision without an interview; keep retention at the 6-year HIPAA clock.',
      beforeAudit: 'Re-run the risk analysis against the current system inventory, re-sign the safeguard decisions, and keep breach-notification runbooks tested so the four-factor assessment is habit, not a scramble.',
      afterFindings: 'Turn each finding into a revised safeguard decision with effective date and re-evaluate it in the next annual risk analysis — HIPAA findings are cheap to remediate when the decision register already exists.',
    },
    timeline: {
      kind: 'compliance',
      total: '~8–16 weeks to a defensible posture (no certification exists)',
      phases: [
        { name: 'Preparation', weeks: '4–8', detail: 'Risk analysis (NIST 800-30), safeguard + addressable decisions, BAAs, policy set.' },
        { name: 'Observation', weeks: '4–8', detail: 'Evidence build: training records, access audits, log retention, contingency testing; keep risk analysis current.' },
        { name: 'Fieldwork', weeks: '1–2', detail: 'HHS/OCR or state audit, or external gap assessment of the security-rule safeguards — triggered rather than scheduled.' },
        { name: 'Report issuance', weeks: '1–4', detail: 'Exit memo / gap report — the deliverable is a documented, signed posture, not a certificate.' },
        { name: 'Maintenance', weeks: 'ongoing', detail: 'Annual risk analysis refresh, BAA inventory, training cycles, 6-year record retention.' },
        { name: 'Re-issuance', weeks: 'annual', detail: 'Refresh risk analysis and safeguard decisions yearly or on material change; respond if OCR selects you.' },
      ],
    },
    clauses: [
      { title: 'BAA', text: 'Parties shall execute a Business Associate Agreement under 45 CFR 164.504 covering use/disclosure of PHI, safeguards, breach handling, and termination.', required: true },
      { title: 'Flow-down to subcontractors', text: 'Vendor shall ensure each subcontractor that receives PHI signs a downstream BAA before access, and Vendor remains responsible for their compliance.', required: true },
      { title: 'Breach notification', text: 'Vendor shall notify Client without unreasonable delay (and not more than 60 days) of any breach of unsecured PHI, with the HHS breach notice elements.', required: true },
      { title: 'Return / destruction', text: 'Upon termination, Vendor shall return or destroy all PHI, and certify destruction in writing.', required: false },
    ],
    discrepancies: [
      'HIPAA retains records 6 years (164.316(b)(2)); PCI wants 12 months of logs — an archive policy that keeps 6 years satisfies both.',
      'HIPAA "addressable" encryption sits beside PCI "required" encryption — apply PCI-required crypto to cardholder flows and document HIPAA rationale for the rest.',
    ],
  },
  nist: {
    id: 'nist',
    name: 'NIST CSF 2.0',
    color: '#06b6d4',
    desc: 'Outcome-focused cybersecurity framework (Govern, Identify, Protect, Detect, Respond, Recover) — voluntary but widely used.',
    policies: [
      { area: 'Governance', controls: [
        { text: 'GV.RM — risk management strategy & appetite', freq: 'Annual + on significant change', policy: 'Risk Management & Appetite Policy (GV.RM)', sla: 'Risk appetite reaffirmed at least annually' },
        { text: 'GV.RR — policies, roles, responsibilities', freq: 'Annual policy review', policy: 'Governance & Policy (GV.RR)', sla: 'Roles and responsibilities current and documented' },
      ] },
      { area: 'Risk & Asset Mgmt', controls: [
        { text: 'ID.AM — asset inventory', freq: 'Continuous maintenance', policy: 'Asset Management Policy (ID.AM)', sla: 'New assets inventoried within 7 days of deployment' },
        { text: 'ID.RA — risk assessment', freq: 'At least annually + on change', policy: 'Risk Assessment Procedure (ID.RA)', sla: 'Risk register updated within 30 days of material change' },
        { text: 'ID.SC — supply chain', freq: 'Annual + on new supplier', policy: 'Supply Chain Risk Policy (ID.SC)', sla: 'Supplier assessed before onboarding; re-assessment at least annually' },
      ] },
      { area: 'Protection', controls: [
        { text: 'PR.AA — identity & access (MFA)', freq: 'Quarterly reviews; MFA every login', policy: 'Access Control & Identity Policy (PR.AA)', sla: 'Revoke within 24h of termination; MFA enforced on-account' },
        { text: 'PR.DS — data security & encryption', freq: 'Continuous; crypto review annually', policy: 'Data Protection & Encryption Policy (PR.DS)', sla: 'At-rest and in-transit encryption enforced' },
        { text: 'PR.PT — protective technology', freq: 'Continuous', policy: 'Protective Technology Policy (PR.PT)', sla: 'Endpoint/network protections current across the estate' },
      ] },
      { area: 'Detection & Response', controls: [
        { text: 'DE.CM — continuous monitoring', freq: 'Continuous', policy: 'Continuous Monitoring (DE.CM)', sla: 'Alerts reviewed by severity; coverage validated periodically' },
        { text: 'DE.AE — anomalies', freq: 'Continuous', policy: 'Anomaly Detection (DE.AE)', sla: 'Confirmed anomalies triaged within 24h' },
        { text: 'RS — incident response, comms', freq: 'Continuous; TTX at least annually', policy: 'Incident Response & Comms (RS)', sla: 'IR plan tested annually; comms plan exercised in TTX' },
      ] },
      { area: 'Recovery', controls: [
        { text: 'RC.RP — recovery plans, testing', freq: 'Recovery tested at least annually', policy: 'Recovery Plan & Testing (RC.RP)', sla: 'Restoration meets RTO/RPO in drills' },
        { text: 'RC.CO — communications', freq: 'Annual', policy: 'Recovery Communications (RC.CO)', sla: 'Comms plan verified during recovery exercises' },
      ] },
      { area: 'HR & Identity Lifecycle', controls: [
        { text: 'PR.AA-1 — identity management', freq: 'Event-driven + periodic', policy: 'Identity Management (PR.AA-1)', sla: 'Provisioning/deprovisioning within 24h of HR event' },
        { text: 'PR.AA-5 — workforce identity proofing', freq: 'Pre-hire', policy: 'Identity Proofing (PR.AA-5)', sla: 'Proofing completed before access grant' },
        { text: 'PR.AA-6 — access permissions management', freq: 'Quarterly reviews', policy: 'Access Permissions Management (PR.AA-6)', sla: 'Reviews signed-off; revoke within 24h' },
        { text: 'PR.IP-11 — personnel termination', freq: 'Event-driven', policy: 'Personnel Termination (PR.IP-11)', sla: 'Access revoked within 24h of termination' },
      ], note: 'NIST 800-53 Rev 5 (mapped to CSF) PS-3 (personnel screening), PS-4 (termination), AC-2 (account management) require identity proofing and access reviews.' },
    ],
    observations: [
      { finding: 'No current/target profile', why: 'Organisation has not defined a Current Profile vs Target Profile, so maturity can\u2019t be measured.' },
      { finding: 'Implementation tier unjustified', why: 'Tier 1 chosen but business impact analysis and risk appetite don\u2019t support it — or no rationale at all.' },
      { finding: 'No supply chain risk (ID.SC)', why: 'No assessment of suppliers\u2019 cybersecurity, despite ID.SC — a common gap.' },
      { finding: 'Recovery plans not tested', why: 'RC.RP documentation exists but no TTX/tabletop or restoration drill coupled to RTOs.' },
      { finding: 'Asset inventory incomplete', why: 'ID.AM lists only servers; endpoints, cloud assets, SaaS, and accounts missing.' },
      { finding: 'Background verification completed weeks/months after hire', why: 'PR.AA-5 / PS-3 — identity proofing and personnel screening required before access grant; post-hire checks violate the control.' },
      { finding: 'Access review policy states quarterly but performed annually/semi-annually; no sign-off or frequency documented', why: 'PR.AA-6 / AC-2 — periodic review of access permissions required; policy-reality gap with no evidence of frequency or sign-off.' },
      { finding: 'HR policy mandates background verification via Checkr/equivalent but startup does not perform it', why: 'PR.AA-5 / PS-3 — policy states screening but none performed; identity proofing not implemented for workforce.' },
    ],
    rebuttals: [
      { finding: 'Tier challenged', pushback: 'CSF Tiers are qualitative and self-selected for the target state; show the risk-appetite statement and prioritisation that justifies the tier. There is no prescribed tier nor mandated artefacts.', evidence: 'Risk appetite, prioritised action plan.',
        replyToAuditor: 'Our Tier selection is a documented target profile, not an assertion — the risk-appetite statement and the prioritised action plan justify Tier 2, and CSF prescribes no tier, so we ask you to evaluate against the profile we published.' },
      { finding: 'Supply chain shortfall', pushback: 'Demonstrate that ID.SC is addressed via contractual flow-down (SOC/ISO evidence from suppliers) rather than a standalone program.', evidence: 'Supplier assessments, contract clauses.',
        replyToAuditor: 'ID.SC is met through contractual flow-down: every supplier in the third-party register is required to share SOC 2 or ISO 27001 evidence, which our risk team reviews on the bi-annual assessment cycle — a standalone programme is not required by the CSF outcomes.' },
      { finding: 'No testing of recovery', pushback: 'If no formal test yet, show the planned TTX calendar and the RTO/RPO baseline you will validate — commit to the schedule rather than a one-time backfill.', evidence: 'Recovery plan, TTX schedule, RTO/RPO metrics.',
        replyToAuditor: 'We have a committed TTX calendar — quarterly tabletop exercises — and validated the RTO/RPO baseline for our two critical systems during the March drill; the schedule and measured metrics are in the recovery plan.' },
      { finding: 'Background verification delayed', pushback: 'GRC Pushback: Implement pre-hire identity proofing per PR.AA-5/PS-3 — access only after check clears. Risk Acceptance: Document in risk register, implement Day-1 monitoring (SIEM, DLP, session recording), run check within 14 days, auto-revoke on adverse result.', evidence: 'Onboarding workflow, conditional access, check SLA, monitoring logs, risk register entry, risk acceptance memo.',
        replyToAuditor: 'Identity proofing under PR.AA-5/PS-3 now gates account creation; risk-accepted hires get 14-day conditional access with SIEM monitoring and session recording, and an automation auto-revokes access on any adverse screening result.' },
      { finding: 'Access review frequency mismatch', pushback: 'GRC Pushback: Align policy — automate quarterly via IAM (Entra/Okta), enforce sign-off per PR.AA-6/AC-2. Risk Acceptance: Document semi-annual with compensating monthly automated reports + quarterly attestation for privileged roles. Define "periodic" and evidence it.', evidence: 'Updated policy, automated review config, sign-off tickets, privilege reports, risk acceptance memo.',
        replyToAuditor: 'Permissions reviews run quarterly and automated in Okta per PR.AA-6/AC-2, with sign-off tickets and a monthly dormant and privileged-account report; the policy defines "periodic" as this semi-annual basis for low-risk roles with quarterly attestation for privileged ones.' },
      { finding: 'HR policy mandates background check but not performed', pushback: 'GRC Pushback: Implement screening (PS-3) or amend policy — identity proofing gap is a PR.AA-5 finding. Risk Acceptance: Document risk, implement alternative verification + conditional monitoring.', evidence: 'Updated policy or screening integration, risk acceptance memo, alternative verification, conditional access logs.',
        replyToAuditor: 'Screening now runs for every hire through our HRIS integration; for constrained hires we documented alternative verification with conditional monitoring and recorded the decision as a managed risk in the register.' },
    ],
    policyTimeline: {
      drafting: 'Draft against CSF outcomes (Govern, Identify, Protect, Detect, Respond, Recover) with a target-tier statement and a maturity bar, so an auditor can read the intended state rather than infer it; set the bar at the stricter control where SOC 2 is the baseline.',
      beforeAudit: 'Refresh the target profile, re-run the risk assessment against the current asset inventory, and validate the TTX calendar so recovery claims have a live schedule behind them.',
      afterFindings: 'Update the relevant outcome with the corrective action and re-test the control in the next quarterly cycle so the fix is evidenced as sustained, not isolated.',
    },
    timeline: {
      kind: 'self-assessment',
      total: '~4–12 weeks to a first current/target profile',
      phases: [
        { name: 'Preparation', weeks: '2–4', detail: 'Current vs target profile, risk-appetite statement, prioritised action plan.' },
        { name: 'Observation', weeks: '2–4', detail: 'Implement Protect/Detect outcomes and collect evidence; no mandated observation window.' },
        { name: 'Fieldwork', weeks: '1–2', detail: 'Optional external gap assessment against the profiles, or an internal scorecard.' },
        { name: 'Report issuance', weeks: '1–2', detail: 'Profile + gap report — the output is the documented improvement plan.' },
        { name: 'Maintenance', weeks: 'ongoing', detail: 'Annual scope refresh; adopt stricter outcomes (e.g. phishing-resistant MFA) as the bar moves.' },
        { name: 'Re-issuance', weeks: 'annual', detail: 'Re-measure against target profile; nothing to renew since CSF issues no certificate.' },
      ],
    },
    clauses: [
      { title: 'Baseline alignment', text: 'Vendor shall maintain a cybersecurity program aligned to NIST CSF 2.0 with a modest maturity target (e.g. Tier 2) and report posture metrics annually.', required: false },
      { title: 'Supply chain flow-down', text: 'Vendor shall require its sub-providers to maintain equivalent safeguards and provide evidence on request (e.g. ISO 27001 / SOC 2 / CSF profiles).', required: false },
    ],
    discrepancies: [
      'CSF is outcome-based with no explicit log-retention or rotation clocks — map to PCI/HIPAA specifics and document the mapping.',
      'CSF PR.AA recommends phishing-resistant MFA for privileged users (higher than SOC 2 "MFA" baseline) — set the bar at the stricter one.',
    ],
  },
  gdpr: {
    id: 'gdpr',
    name: 'GDPR',
    color: '#8b5cf6',
    desc: 'EU regulation for personal data — lawful basis, rights, DPAs, transfer rules, breach notification.',
    policies: [
      { area: 'Records of Processing (ROPA)', controls: [
        { text: 'Art 30 — maintain and update records of processing activities', freq: 'Quarterly updates + on change', policy: 'Data Protection Policy — ROPA (Art 30)', sla: 'ROPA updated within 14 days of a change in processing' },
      ] },
      { area: 'DPIA', controls: [
        { text: 'Art 35 — prior DPIA for high-risk processing', freq: 'Before high-risk processing; refresh on material change', policy: 'DPIA Procedure (Art 35)', sla: 'DPIA completed prior to go-live; negative screening documented' },
      ] },
      { area: 'Breach Management', controls: [
        { text: 'Art 33/34 — notify DPA ≤72h, data subjects when high risk', freq: 'Event-driven', policy: 'Breach Response Policy (Art 33/34)', sla: 'DPA notified ≤72 hours; data subjects without undue delay' },
      ] },
      { area: 'Data Subject Rights', controls: [
        { text: 'Art 15–22 — access, rectification, erasure, portability, objection', freq: 'Event-driven', policy: 'Data Subject Rights Policy (Art 15–22)', sla: 'Respond within 30 days (extendable by 2 months for complex requests)' },
      ] },
      { area: 'Processor Contracts', controls: [
        { text: 'Art 28 — mandatory DPA content, processor instructions, sub- processor control', freq: 'Annual review + on new processor', policy: 'Processor Management & DPA Policy (Art 28)', sla: 'DPA in place before any processing; sub-processor approvals on the record' },
      ] },
      { area: 'Transfers', controls: [
        { text: 'Art 44–49 + SCCs — lawful transfer mechanisms, TIA for third countries', freq: 'Annual transfer review + on change', policy: 'International Transfer Policy (Art 44–49)', sla: 'SCCs + transfer impact assessment before transfer; supplementary measures documented' },
      ] },
      { area: 'Consent & Notices', controls: [
        { text: 'Art 7 — demonstrable consent', freq: 'Continuous logging', policy: 'Consent Management Policy (Art 7)', sla: 'Consent timestamped and granular; withdrawal honoured immediately' },
        { text: 'Art 13/14 — granular notices', freq: 'On processing change', policy: 'Privacy Notice & Transparency (Art 13/14)', sla: 'Notices updated for new purposes/vendors before processing' },
      ] },
      { area: 'HR & Employee Data', controls: [
        { text: 'Art 88 — processing in employment context (member state law)', freq: 'On change / periodic', policy: 'HR Data Processing Policy (Art 88)', sla: 'Employee privacy notice current; lawful basis documented' },
        { text: 'Art 5(1)(b) — purpose limitation', freq: 'Continuous', policy: 'Purpose Limitation & Retention Policy (Art 5)', sla: 'Retention schedule enforced; no processing beyond purpose' },
        { text: 'Art 32 — security of processing', freq: 'Continuous; annual review', policy: 'Security of Processing Policy (Art 32)', sla: 'Controls monitored; effectiveness reviewed at least annually' },
        { text: 'Art 25 — data protection by design', freq: 'At design time', policy: 'Privacy by Design (Art 25)', sla: 'Applied at architecture/feature design' },
      ], note: 'Employee data processing requires lawful basis (often legal obligation or legitimate interest); background checks must be necessary, proportionate, and transparent.' },
    ],
    observations: [
      { finding: 'ROPA incomplete or missing', why: 'No Art 30 records, or they omit purposes, recipients, retention, and cross-border transfers.' },
      { finding: 'Consent not demonstrable', why: 'Pre-ticked boxes, no auditable timestamp, or bundled consent for multiple purposes.' },
      { finding: 'No DPIA for high-risk', why: 'High-risk processing (tracking, large-scale special categories, systematic monitoring) without a documented Art 35 assessment or exemption rationale.' },
      { finding: 'Transfers without safeguards', why: 'Data flows to third countries without SCCs / adequacy or a documented transfer impact assessment.' },
      { finding: 'DPO / roles not addressed', why: 'No DPO where required (Art 37) or DPO has no documented independence/contact point.' },
      { finding: 'Background verification completed weeks/months after hire', why: 'Art 5(1)(b), Art 32 — employee data processed for background checks must have lawful basis and security; post-hire checks without prior notice/transparency violate Art 13/14.' },
      { finding: 'Access review policy states quarterly but performed annually/semi-annually; no sign-off or frequency documented', why: 'Art 32 — security of processing requires appropriate technical/organizational measures including access control reviews; policy-reality gap undermines accountability.' },
      { finding: 'HR policy mandates background verification via Checkr/equivalent but startup does not perform it', why: 'Art 5(1)(b), Art 13/14 — policy states checks creating expectation of processing; no processing occurs but privacy notice promises it — transparency violation.' },
    ],
    rebuttals: [
      { finding: 'Consent challenged', pushback: 'If consent is not the right basis, present the lawful basis analysis (Art 6(1)(f) legitimate interest with a documented balancing test) — GDPR does not mandate consent for everything.', evidence: 'Balancing test, lawful-basis register.',
        replyToAuditor: 'We rely on Art 6(1)(f) legitimate interest here, not consent — the balancing test in our lawful-basis register weighs the data subjects\u2019 interests against our compelling need, and GDPR requires a lawful basis, not consent, for every processing.' },
      { finding: 'No DPIA', pushback: 'Show the Art 35(1) screening that concluded processing is not "high risk"; a documented negative DPIA decision with rationale is defensible.', evidence: 'DPIA screening/decision record.',
        replyToAuditor: 'Our Art 35(1) screening concluded this processing is not high risk — the negative DPIA decision with its rationale and sign-off is recorded, which is the documented outcome the Article requires when a full DPIA is not warranted.' },
      { finding: 'Transfer gap', pushback: 'If SCCs are in place, pair them with a transfer impact assessment and supplementary measures; the "Schrems II" expectation is a demonstrated TIA, not a prohibition.', evidence: 'SCCs, TIA, supplementary measures.',
        replyToAuditor: 'We transfer via EU SCCs (2021/914) with a completed transfer impact assessment and supplementary measures for the US sub-processor — the TIA covers destination-country law and the SCC annexes document the measures, which is the Schrems II bar.' },
      { finding: 'Background verification delayed', pushback: 'GRC Pushback: Provide Art 13/14 privacy notice pre-hire, obtain lawful basis (legal obligation/legitimate interest), run check pre-access. Risk Acceptance: Document Art 6(1) basis, implement transparency notice, conditional access with Art 32 security, check within 14 days.', evidence: 'Privacy notice, lawful basis register, conditional access, check SLA, DPIA if high-risk.',
        replyToAuditor: 'Article 13/14 notices go out pre-hire explaining the screening, we rely on an Art 6(1)(c or f) lawful basis documented in the register, and the check gates access; risk-accepted hires sit in a 14-day conditional-access window under Art 32 security while the check completes.' },
      { finding: 'Access review frequency mismatch', pushback: 'GRC Pushback: Align policy to Art 32 — implement automated quarterly reviews. Risk Acceptance: Document risk-based semi-annual with compensating controls per Art 32(1)(d) — regular testing/evaluation.', evidence: 'Updated policy, automated reviews, risk assessment, compensating controls doc.',
        replyToAuditor: 'Access reviews are automated quarterly per Art 32; for low-risk roles we document a semi-annual cadence with compensating measures under Art 32(1)(d) — regular testing and evaluation of the controls is evidenced by the review tickets and suppression reports.' },
      { finding: 'HR policy mandates background check but not performed', pushback: 'GRC Pushback: Either process the check (Art 6 basis + Art 13 notice) or amend privacy notice/policy — transparency gap. Risk Acceptance: Amend notice, document no-processing decision.', evidence: 'Updated privacy notice, policy amendment, DPIA if needed.',
        replyToAuditor: 'We amended the privacy notice to reflect actual practice and documented the no-processing decision under Article 5(1)(b); the transparency gap is closed and the current notice no longer promises processing we do not perform.' },
    ],
    policyTimeline: {
      drafting: 'Draft notice and policy together with the lawful-basis register so every "we will process" promise is backed by an Article 6 basis — a privacy notice that promises more than practice is the most common Art 13/14 finding.',
      beforeAudit: 'Refresh the ROPA against actual processing, re-confirm the lawful-basis labels with Legal, and re-run any DPIA screening that changed processing (new vendor, new country, new data class).',
      afterFindings: 'Correct the notice or policy with an effective-date header, re-publish, and log the correction — GDPR accountability is satisfied by documentation of the change, not only the change itself.',
    },
    timeline: {
      kind: 'compliance',
      total: '~8–16 weeks to an accountability baseline (no certification)',
      phases: [
        { name: 'Preparation', weeks: '4–8', detail: 'ROPA, lawful-basis register, DPIA screening, notices, processor DPAs.' },
        { name: 'Observation', weeks: '4–8', detail: 'Operate consent logs, breach runbook, rights-request handling, transfer assessments.' },
        { name: 'Fieldwork', weeks: '1–2', detail: 'DPA supervisory or client privacy audit; the internal DPO review is the standing check.' },
        { name: 'Report issuance', weeks: '1–2', detail: 'No certificate — the deliverable is the documented accountability file.' },
        { name: 'Maintenance', weeks: 'ongoing', detail: 'Keep ROPA and notices current, Art 32 measures SIEM-backed, run 72h breach drills.' },
        { name: 'Re-issuance', weeks: 'annual', detail: 'Annual accountability refresh; re-run DPIA screening before new processing.' },
      ],
    },
    clauses: [
      { title: 'DPA (Art 28)', text: 'Parties shall enter a data processing agreement containing all Article 28 mandatory elements, including processor instructions, confidentiality, assistance, and audit rights.', required: true },
      { title: 'Sub-processors', text: 'Vendor shall provide a current list of sub-processors, obtain required authorisation before changes, and flow down equivalent obligations.', required: true },
      { title: 'Breach assistance', text: 'Vendor shall assist Client with breach notification (DPA ≤72h, data subjects) and provide the Article 33(3) information without undue delay.', required: true },
      { title: 'Transfers', text: 'Where transfers occur, Vendor shall deploy applicable SCCs and perform/maintain a transfer impact assessment on request.', required: false },
    ],
    discrepancies: [
      'GDPR Art 5(e) minimization conflicts with PCI 12-month logs — retain what is needed, minimise the rest, and document the retention matrix.',
      'GDPR has no password-rotation rule; NIST/ISO guidance (no forced rotation) applies — auditors asking for rotation need a standards citation.',
    ],
  },
  cis: {
    id: 'cis',
    name: 'CIS Controls',
    color: '#0d9488',
    desc: '18 prioritized technical controls with Implementation Groups (IG1/IG2/IG3) — the fastest high-impact baseline.',
    policies: [
      { area: 'Inventory', controls: [
        { text: 'Safeguard 1 – Invent HR-approved devices', freq: 'Continuous', policy: 'Asset Inventory Policy (Safeguard 1)', sla: 'Devices inventoried at acquisition/disposal' },
        { text: 'Safeguard 2 – Invent authorized software', freq: 'Continuous', policy: 'Software Asset Inventory (Safeguard 2)', sla: 'Software approved before install; runtime inventory current' },
      ] },
      { area: 'Data Protection', controls: [
        { text: 'Safeguard 3 – Data management (encryption, classification, retention)', freq: 'Continuous; quarterly refresh', policy: 'Data Management & Classification (Safeguard 3)', sla: 'Only approved storage systems; classification tags enforced' },
      ] },
      { area: 'Access Control', controls: [
        { text: 'Safeguard 6 – MFA, least privilege, access reviews', freq: 'Quarterly reviews; MFA every login', policy: 'Access Control & MFA Policy (Safeguard 6)', sla: 'Revoke within 24h; dormant accounts disabled quarterly' },
      ] },
      { area: 'Vulnerability & Patch', controls: [
        { text: 'Safeguard 7 – Continuous vuln management, remediate known-exploited', freq: 'Continuous scanning; patch per SLA', policy: 'Vulnerability Management (Safeguard 7)', sla: 'Known-exploited (KEV) within 15 days; high-risk within 30' },
      ] },
      { area: 'Audit Logs', controls: [
        { text: 'Safeguard 8 – Collect, protect, and review audit logs', freq: 'Daily review; continuous collection', policy: 'Audit Logging Policy (Safeguard 8)', sla: '12-month retention, 90 days online; reviewed daily' },
      ] },
      { area: 'Network & Endpoint', controls: [
        { text: 'Safeguards 9–13, 16 – email/web/network/endpoint protections, app software security', freq: 'Continuous', policy: 'Network & Endpoint Protection Policy (Safeguards 9–13, 16)', sla: 'Protections updated on change; no exceptions without risk sign-off' },
      ] },
      { area: 'Incident & Recovery', controls: [
        { text: 'Safeguard 17 – Incident response and recovery plans, tested', freq: 'Annual TTX + recovery test', policy: 'Incident Response & Recovery Policy (Safeguard 17)', sla: 'RTO/RPO validated in the annual drill' },
      ] },
      { area: 'Config & Change', controls: [
        { text: 'Safeguard 4 – Secure configuration', freq: 'On deployment; baselines reviewed annually', policy: 'Secure Configuration Policy (Safeguard 4)', sla: 'Config drift remediated within 30 days' },
        { text: 'Safeguard 5 – Account mgmt, disable unnecessary', freq: 'Event-driven; accounts reviewed quarterly', policy: 'Account Lifecycle Policy (Safeguard 5)', sla: 'Unnecessary accounts disabled within 24h' },
      ] },
      { area: 'HR & Personnel Security', controls: [
        { text: 'Safeguard 5.1 – Establish and maintain inventory of accounts', freq: 'Quarterly', policy: 'Account Inventory (Safeguard 5.1)', sla: 'Inventory reconciled with HR each quarter' },
        { text: 'Safeguard 5.2 – Use unique passwords', freq: 'Continuous', policy: 'Authentication Policy (Safeguard 5.2)', sla: 'Unique passwords / no shared credentials' },
        { text: 'Safeguard 5.3 – Disable dormant accounts', freq: 'At least quarterly', policy: 'Dormant Account Disablement (Safeguard 5.3)', sla: 'Dormant (e.g. 45-day) accounts disabled promptly' },
        { text: 'Safeguard 5.4 – Restrict admin privileges', freq: 'Quarterly privileged review', policy: 'Administrative Privileges (Safeguard 5.4)', sla: 'Privileged reviews signed-off quarterly' },
        { text: 'Safeguard 14 – Security awareness training', freq: 'Annual', policy: 'Security Awareness & Training Policy (Safeguard 14)', sla: 'Annual training + phishing simulation' },
      ], note: 'Safeguard 5 covers account lifecycle; IG2/IG3 expect background checks for privileged/sensitive roles per v8 guidance.' },
    ],
    observations: [
      { finding: 'Asset inventory incomplete', why: 'Safeguards 1–2 — unmanaged endpoints, cloud, and BYOD missing from inventory.' },
      { finding: 'Known-exploited vulnerabilities unpatched', why: 'Safeguard 7 — CVEs in CISA KEV catalog not remediated on schedule (IG2: prioritize).' },
      { finding: 'No centralized log collection', why: 'Safeguard 8 — logs scattered, no correlation, retention unspecified.' },
      { finding: 'MFA not enforced', why: 'Safeguard 6 — MFA missing for privileged or externally exposed accounts.' },
      { finding: 'Response plans untested', why: 'Safeguard 17 — plans written, never tabletop-tested, recovery objectives absent.' },
      { finding: 'Background verification completed weeks/months after hire', why: 'Safeguard 5 / IG2 guidance — account provisioning tied to verified identity; post-hire checks create window of unverified access.' },
      { finding: 'Access review policy states quarterly but performed annually/semi-annually; no sign-off or frequency documented', why: 'Safeguard 5.3 / 6.4 — periodic access review and dormant account disablement required; policy-reality gap with no evidence.' },
      { finding: 'HR policy mandates background verification via Checkr/equivalent but startup does not perform it', why: 'IG2/IG3 guidance for sensitive/privileged roles — policy states checks but none performed; account inventory lacks verified identity linkage.' },
    ],
    rebuttals: [
      { finding: 'Control beyond your IG', pushback: 'CIS scopes via Implementation Groups — ask the assessor to confirm your IG (typically IG1/IG2 for SMBs) and only assess in-scope safeguards.', evidence: 'IG selection documented.',
        replyToAuditor: 'Our IG selection is documented as IG2 for an SMB environment, so Safeguards above the IG2 set are marked out-of-scope in our assessment answers — we ask that only in-scope safeguards for the declared IG be evaluated.' },
      { finding: 'Patch latency on KEV', pushback: 'Show the KEV-relevant patch SLA and any compensating protection (WAF, EDR, segmentation) for hosts with scheduled remediation.', evidence: 'Patch SLA, vuln dashboard, compensating controls.',
        replyToAuditor: 'We remediate KEV-referenced CVEs on a 15-day SLA; the four hosts on the schedule carry compensating WAF and EDR coverage, and the vulnerability dashboard shows their patch dates plus the compensating controls flagged per asset.' },
      { finding: 'Background verification delayed', pushback: 'GRC Pushback: Gate account creation on background check clearance per Safeguard 5 / IG2. Risk Acceptance: Document risk, conditional access with monitoring, check within 14 days, auto-revoke on failure.', evidence: 'Onboarding workflow, conditional access, check SLA, monitoring logs, risk acceptance memo.',
        replyToAuditor: 'Account creation is gated on background clearance per Safeguard 5; risk-accepted hires sit in a 14-day conditional-access window with monitoring and auto-revoke on an adverse result — the workflow and SLA are in the evidence pack.' },
      { finding: 'Access review frequency mismatch', pushback: 'GRC Pushback: Automate quarterly reviews per Safeguard 5.3/6.4 via IAM, enforce sign-off. Risk Acceptance: Semi-annual with monthly automated dormant account reports + quarterly privileged attestation. Define periodicity.', evidence: 'Updated policy, automated review config, sign-off tickets, dormant reports, risk acceptance memo.',
        replyToAuditor: 'Account reviews run quarterly and automated in IAM per Safeguards 5.3/6.4 with sign-off tickets, plus a monthly dormant-account report that drives disabling; the policy defines the semi-annual floor for low-risk roles.' },
      { finding: 'HR policy mandates background check but not performed', pushback: 'GRC Pushback: Implement screening or amend policy — IG2/IG3 identity verification gap. Risk Acceptance: Alternative verification + conditional monitoring.', evidence: 'Updated policy or screening integration, risk acceptance memo, alternative verification, conditional access logs.',
        replyToAuditor: 'Screening now runs at onboarding for sensitive and privileged roles; for constrained hires we documented alternative verification with conditional monitoring and a signed risk acceptance rather than leaving the policy promise on paper.' },
    ],
    policyTimeline: {
      drafting: 'Declare your Implementation Group in policy and scope Safeguards to it explicitly, so an assessor can only evaluate what you committed to — and keep the 15-day KEV SLA written into the patch policy.',
      beforeAudit: 'Confirm account inventory matches HR data and run the dormant-account sweep before fieldwork; a clean account baseline makes the review-frequency conversation about process, not surprises.',
      afterFindings: 'Update the relevant Safeguard answer and policy with the corrective action, re-run the vulnerable/dormant reports to prove the fix, and retain both for the next assessment cycle.',
    },
    timeline: {
      kind: 'implementation',
      total: '~4–12 weeks to an IG1/IG2 baseline',
      phases: [
        { name: 'Preparation', weeks: '2–4', detail: 'Inventory (Safeguards 1–2), pick IGs, gap against asset and software lists.' },
        { name: 'Observation', weeks: '2–4', detail: 'Implement MFA, patching, logging, hardening; watch via dashboards.' },
        { name: 'Fieldwork', weeks: '1–2', detail: 'Validate with tooling (CIS-CAT, Intune baselines) rather than an on-site audit.' },
        { name: 'Report issuance', weeks: '1', detail: 'CIS benchmark assessment report; no certificate unless you self-attest.' },
        { name: 'Maintenance', weeks: 'ongoing', detail: 'Continuous vuln scanning, KEV 15-day SLA, quarterly safeguard-status review.' },
        { name: 'Re-issuance', weeks: 'annual', detail: 'Re-run the baseline assessment yearly or aligned to client/SOC cycles.' },
      ],
    },
    clauses: [
      { title: 'CIS baseline', text: 'Vendor shall implement CIS Controls aligned to at least IG2 for the services, enforce MFA on all externally exposed accounts, and remediate known-exploited vulnerabilities per a 15-day SLA.', required: false },
      { title: 'Log access', text: 'Vendor shall retain audit logs for 12 months (90 days immediately accessible) and provide them to Client on request for investigation.', required: false },
    ],
    discrepancies: [
      'CIS Safeguard 8 (12-month logs) aligns with PCI; for non-PCI data reduce to 6–12 months and document the decision.',
      'CIS IG1 demands MFA for externally exposed + privileged users — the practical floor under SOC 2 / ISO.',
    ],
  },
  hitrust: {
    id: 'hitrust',
    name: 'HITRUST CSF',
    color: '#b45309',
    desc: 'Certifiable, harmonized framework (HIPAA + NIST + ISO + PCI + state laws) with maturity scoring (e1/i1/r2).',
    policies: [
      { area: 'Maturity & Scoring', controls: [
        { text: 'e1 (essentials) → i1 (implemented) → r2 (risk) — 4-level maturity per control', freq: 'Continuous measurement; management review per cadence', policy: 'Maturity & Measurement Policy (CSF scoring)', sla: 'Policy/procedure/implemented/measured/managed evidenced per control at the claimed level' },
      ], note: 'Assessors score policy/procedure/implemented/measured/managed per control.' },
      { area: 'Certification Scheme', controls: [
        { text: 'Two-factor assessment, independent assessor, quality assurance review', freq: 'Per certification cycle (e1 6 months, i1 12, r2 annual)', policy: 'Certification Scheme & QA Policy', sla: 'Re-certification per scheme; QA rebuttals submitted formally within the challenge window' },
      ] },
    ],
    observations: [
      { finding: 'Maturity level inflated', why: 'Control scores claimed higher than evidence supports (e.g. "managed" without management review evidence).' },
      { finding: 'Policy → procedure gaps', why: 'Policy exists but no procedure/implementation evidence (maturity 1 vs 2).' },
      { finding: 'Third-party & PHI controls not mapped', why: 'HIPAA/PCI requirements folded in but mapping to CSF control references incomplete.' },
    ],
    rebuttals: [
      { finding: 'Maturity score disputed', pushback: 'Request the specific evidence the assessor believes is missing; HITRUST scoring is evidence-based and the QA process allows challenge of control scores with documentation.', evidence: 'Control evidence pack, QA rebuttal.',
        replyToAuditor: 'We revised the scored control with the missing evidence — the management-review minutes and the measured metrics dashboard — and submitted it for QA challenge; the assessor re-scored the control at the documented level with the acceptance note.' },
    ],
    policyTimeline: {
      drafting: 'Draft policy and procedure together is the HITRUST minimum — a policy with no procedure keeps you at maturity level 1; define the measured metrics (e.g. review completion rate, ticket closure SLA) the "managed" level will need.',
      beforeAudit: 'Pre-score yourself against the four maturity levels with an assessor walkthrough, so surprises land in rehearsal rather than fieldwork, and every policy has a matching procedure and evidence artifact.',
      afterFindings: 'Submit a written QA rebuttal with evidence for any disputed score and re-issue the supporting policy/procedure — the challenge pathway is built into HITRUST, so use it formally.',
    },
    timeline: {
      kind: 'certification',
      total: 'e1 ~6–30 weeks; i1/r2 ~12–40 weeks (r2 often 12–18 months end-to-end)',
      phases: [
        { name: 'Preparation', weeks: '4–16', detail: 'CSF mapping, maturity pre-score, policy/procedure/evidence build per the level you claim.' },
        { name: 'Observation', weeks: '8–16', detail: 'Evidence window matching claimed maturity — "measured/managed" needs real metrics history.' },
        { name: 'Fieldwork', weeks: '4–12', detail: 'Two-factor assessment with an independent assessor; QA challenge rounds add time.' },
        { name: 'Report issuance', weeks: '2–4', detail: 'Quality assurance review then certification (r2 annual; e1/i1 per cycle).' },
        { name: 'Maintenance', weeks: 'ongoing', detail: 'Continuous evidence collection for scored controls between assessment cycles.' },
        { name: 'Re-issuance', weeks: '6–12 month cycle', detail: 'Re-certify per scheme — e1 at 6 months, i1 at 12, r2 annual — re-scoring maturity each time.' },
      ],
    },
    clauses: [
      { title: 'HITRUST certification', text: 'If Vendor claims HITRUST, Vendor shall maintain its certification (e1/i1/r2 as applicable) and provide its certification report annually.', required: false },
    ],
    discrepancies: [
      'HITRUST r2 embeds PCI log retention and HIPAA 6-year retention simultaneously — the archive must satisfy both.',
      'Maturity scoring adds a "measured/managed" bar that plain SOC 2 does not — set internal metrics before engaging r2 assessment.',
    ],
  },
dpdpa: {
    id: 'dpdpa',
    name: 'DPDPA (India)',
    color: '#f59e0b',
    desc: 'India\u2019s Digital Personal Data Protection Act, 2023 — consent-first, obligations for Data Fiduciaries and Processors.',
    policies: [
      { area: 'Legal Basis & Consent', controls: [
        { text: 'Consent (with notice), or specified "legitimate use" grounds (employment, legal, public function, health emergencies)', freq: 'Continuous logging', policy: 'Consent & Notice Policy (Sec 6/7)', sla: 'Notice before collection; consent granular, timestamped and withdrawable' },
      ] },
      { area: 'Breach & Cert-In', controls: [
        { text: 'Notify DPDPA Board "without delay"; note CERT-In directions require reporting serious incidents to cert-in.org.in (often 6 hours)', freq: 'Event-driven', policy: 'Breach Response Policy (Sec 23 / CERT-In)', sla: 'DPDPA Board notified without delay; CERT-In serious incidents within 6 hours (current direction)' },
      ] },
      { area: 'Rights', controls: [
        { text: 'Access, correction, erasure, grievance redressal; children\u2019s data consent & verifiable parental consent', freq: 'Event-driven', policy: 'Data Principal Rights Policy (Sec 11–16)', sla: 'Requests addressed promptly; grievance redress within statutory timeframes' },
      ] },
      { area: 'Cross-Border', controls: [
        { text: 'Notify specified countries/territories (currently only ones the central government notifies)', freq: 'On transfer + annual review', policy: 'Cross-Border Transfer Policy (Sec 17)', sla: 'Transfers only to notified countries/territories (currently none notified)' },
      ] },
      { area: 'Processors', controls: [
        { text: 'DPA between Data Fiduciary and Data Processor with obligations (lawful background, no retention beyond purpose)', freq: 'Annual review + on new processor', policy: 'Processor DPA Policy (Sec 8/9)', sla: 'DPA executed before any processing' },
      ] },
      { area: 'HR & Employee Data', controls: [
        { text: 'Section 7 — legitimate use for employment', freq: 'At collection', policy: 'HR Data Notice (Sec 7)', sla: 'Notice with purpose provided pre-hire' },
        { text: 'Section 8 — consent requirements', freq: 'At collection (where consent applies)', policy: 'Consent Policy (Sec 8)', sla: 'Consent obtained before processing' },
        { text: 'Section 10 — data fiduciary obligations (security, breach notice)', freq: 'Continuous; annual review', policy: 'Data Fiduciary Security Policy (Sec 10)', sla: 'Reasonable safeguards in place; reviewed annually' },
      ], note: 'Employee background checks fall under "legitimate use" for employment (Section 7) but require notice and purpose limitation; must be necessary and proportionate.' },
    ],
    observations: [
      { finding: 'No notice / consent records', why: 'Notice with purpose and withdrawal right not provided; no auditable consent logs.' },
      { finding: 'Breach notification not planned', why: 'No incident process mapped to DPDPA "without delay" and CERT-In reporting requirements.' },
      { finding: 'Processor obligations not contracted', why: 'No updated DPA covering DPDPA obligations; legacy ISO/GDPR templates partially cover this.' },
      { finding: 'Children\u2019s data processed without parental consent', why: 'Interactive services for children or high-traffic platforms without verifiable parental consent mechanisms.' },
      { finding: 'Background verification completed weeks/months after hire', why: 'Section 7/8 — legitimate use for employment requires notice at collection; post-hire checks without prior notice violate transparency.' },
      { finding: 'Access review policy states quarterly but performed annually/semi-annually; no sign-off or frequency documented', why: 'Section 10 — data fiduciary must implement reasonable security safeguards; access review gap undermines security posture.' },
      { finding: 'HR policy mandates background verification via Checkr/equivalent but startup does not perform it', why: 'Section 8 — policy states processing creating notice expectation; no processing but notice promises it — transparency gap.' },
    ],
    rebuttals: [
      { finding: 'Consent deployment timing', pushback: 'The Act allows a transition window; present the phased consent-migration plan and existing lawful use analysis.', evidence: 'Migration plan, lawful use analysis.',
        replyToAuditor: 'We are executing a phased consent-migration plan and rely on the existing lawful-use analysis under Section 7 for processing already underway; our consent dashboard logs timestamped, purpose-specific consent with the withdrawal flow live for new collections.' },
      { finding: 'Background verification delayed', pushback: 'GRC Pushback: Provide Section 8 notice pre-hire, rely on Section 7 legitimate use for employment, run check pre-access. Risk Acceptance: Document lawful use, conditional access with security safeguards, check within 14 days.', evidence: 'Privacy notice, lawful use analysis, conditional access, check SLA.',
        replyToAuditor: 'The Section 8 notice is provided pre-hire, we rely on Section 7 legitimate use for employment, and the check gates access; risk-accepted hires sit in a 14-day conditional-access window under Section 10 safeguards while the check completes.' },
      { finding: 'Access review frequency mismatch', pushback: 'GRC Pushback: Implement automated quarterly reviews per Section 10 security. Risk Acceptance: Document risk-based semi-annual with compensating controls per Section 10.', evidence: 'Updated policy, automated reviews, risk assessment, compensating controls doc.',
        replyToAuditor: 'Automated quarterly access reviews are configured per Section 10 security obligations; for low-risk roles we document a semi-annual cadence with compensating controls and the risk assessment supporting it.' },
      { finding: 'HR policy mandates background check but not performed', pushback: 'GRC Pushback: Either process check (Section 7/8) or amend notice — transparency gap. Risk Acceptance: Amend notice, document no-processing decision.', evidence: 'Updated notice, policy amendment.',
        replyToAuditor: 'We amended the notice to reflect actual practice, documented the Section 7 legitimate-use and no-processing decision, and logged the amendment — the transparency gap is closed.' },
    ],
    policyTimeline: {
      drafting: 'Draft notice text and processing records together with a lawful-use mapping so every "we process" promise has a Section 7 basis and provenance — the DPDPA auditor reads consent logs and notices, not aspirations.',
      beforeAudit: 'Stand up the consent log and notice-withdrawal flow before onboarding new users, align breach notification to the most stringent clock (CERT-In 6-hour vs DPDPA without-delay), and confirm processor DPAs carry the new obligations.',
      afterFindings: 'Correct the notice or policy with a dated revision and log the change; then evidence the corrected control (new consent record or notice version) in the next filing so remediation is documented, not assumed.',
    },
    timeline: {
      kind: 'compliance',
      total: '~8–16 weeks to a consent + security baseline (transitional window applies)',
      phases: [
        { name: 'Preparation', weeks: '4–8', detail: 'Notice + consent flow, Section 7/8 lawful-use mapping, DPA updates, breach + CERT-In runbook.' },
        { name: 'Observation', weeks: '4–8', detail: 'Consent logging live, grievance redressal operating, processor obligations contracted.' },
        { name: 'Fieldwork', weeks: '1–2', detail: 'Client or DPDPA review of the consent chain and Section 10 safeguards.' },
        { name: 'Report issuance', weeks: '1–2', detail: 'Compliance memo / gap-closure report.' },
        { name: 'Maintenance', weeks: 'ongoing', detail: 'Consent-record hygiene, breach drills (CERT-In 6h), retention minimization.' },
        { name: 'Re-issuance', weeks: 'annual', detail: 'Refresh lawful-use analysis and consent flows as DPDPA rules finalise.' },
      ],
    },
    clauses: [
      { title: 'DPDPA obligations', text: 'Vendor shall process personal data only per documented instructions of Client as Data Fiduciary, maintain consent notices and withdrawal mechanisms, and assist in breach notifications to the DPDPA Board.', required: true },
      { title: 'CERT-In incident reporting', text: 'Vendor shall report security incidents to Client within 6 hours (per CERT-In directions) so Client can meet its statutory reporting timelines.', required: true },
    ],
     discrepancies: [
        'DPDPA "without delay" vs GDPR 72h vs HIPAA 60 days vs CERT-In 6-hour — the contract should define the most stringent and cascade it.',
      ],
  },
fedramp: {
      id: 'fedramp',
      name: 'FedRAMP',
      color: '#1e40af',
      desc: 'US federal cloud security authorization program — NIST SP 800-53 baselines (Low/Moderate/High), continuous monitoring, and Authorizations to Operate (ATO).',
      whoCanWork: 'Anyone worldwide can build controls and prepare the SSP/SAP/POA&M documentation — there is no citizenship requirement for the security work. The 3PAO assessor and the Authorizing Official (AO) must be US-citizen / US-government roles, and FedRAMP is a US-government program. Non-US citizens can own the security posture but the authorization chain is US-specific.',
      policies: [
        { area: 'Control Baselines (Low/Moderate/High)', controls: [
          { text: 'NIST SP 800-53 Rev 5 control baselines per impact level', freq: 'Annual self-assessment + on change', policy: 'System Security Plan — Control Baselines (SP 800-53 Rev 5)', sla: 'Baseline re-confirmed at least annually' },
          { text: 'FedRAMP baselines (Low, Moderate, High)', freq: 'On authorization cycle', policy: 'FedRAMP Baseline Policy (Low/Moderate/High)', sla: 'Selected baseline documented in the SSP' },
          { text: 'FIPS 199 system categorization (low/moderate/high impact)', freq: 'Annual + on architecture change', policy: 'SSP — System Categorization (FIPS 199)', sla: 'Categorization re-confirmed within 30 days of change' },
          { text: 'FIPS 200 minimum security controls', freq: 'On baseline selection', policy: 'SSP — Minimum Security Controls (FIPS 200)', sla: 'Control set mapped to the selected baseline' },
        ], check: 'State the selected baseline, the FIPS 199 category, and the list of inherited vs. common vs. assigned controls.' },
        { area: 'Documentation (SSP, SAP, POA&M)', controls: [
          { text: 'System Security Plan (SSP) — system boundary, data types, connections', freq: 'Updated on change + annual', policy: 'System Security Plan Ownership', sla: 'SSP updates within 30 days of a change' },
          { text: 'Security Assessment Plan (SAP)', freq: 'Per assessment cycle', policy: 'Security Assessment Plan (SAP)', sla: 'SAP scoped to the signed SSP boundary' },
          { text: 'Plan of Action & Milestones (POA&M)', freq: 'Reviewed monthly', policy: 'POA&M Management', sla: 'Items tracked with owners and target dates; closed items evidenced' },
          { text: 'Security Assessment Report (SAR)', freq: 'Per assessment cycle', policy: 'Security Assessment Report (SAR)', sla: 'SAR reflected in the POA&M within 30 days' },
        ], check: 'SSP reviewed by security lead; system boundary, baselines, and inherited/common controls all documented and consistent.' },
        { area: 'Continuous Monitoring & ConMon', controls: [
          { text: 'FedRAMP Continuous Monitoring Strategy', freq: 'Continuous; monthly review', policy: 'Continuous Monitoring Strategy (ConMon)', sla: 'Strategy executed month-to-month, IPO in the POA&M' },
          { text: 'NIST SP 800-137 ISCM', freq: 'Continuous', policy: 'ISCM Program (SP 800-137)', sla: 'Automated monitoring live for in-scope controls' },
          { text: 'Recurring self-assessments', freq: 'Monthly', policy: 'ConMon — Self-Assessment Schedule', sla: 'Recurring self-assessment completed monthly' },
          { text: 'Automated control monitoring (CM-8 asset inventory, CM-11 media acceptance, SI/SC controls)', freq: 'Continuous', policy: 'Automated Control Monitoring (CM-8 / CM-11 / SI / SC)', sla: 'Monitoring tooling current; inventory/media controls evidenced' },
        ], check: 'ConMon strategy documented; automated monitoring in place; POA&M tracked with owners and target dates.' },
        { area: 'Authorization & 3PAO', controls: [
          { text: 'Third-Party Assessment Organization (3PAO)', freq: 'Per authorization cycle', policy: '3PAO Engagement Policy', sla: '3PAO engaged per FedRAMP requirements' },
          { text: 'Joint Authorization Board (JAB)', freq: 'As applicable', policy: 'Authorization Approach (JAB)', sla: 'JAB path applied where required' },
          { text: 'Authorizing Official (AO)', freq: 'Per authorization cycle', policy: 'Authorization & AO Policy', sla: 'AO risk acceptance documented' },
          { text: 'Authorization to Operate (ATO)', freq: '3-year cycle; annual reviews in between', policy: 'ATO Maintenance Policy', sla: 'ATO maintained; conditions tracked to closure' },
          { text: 'Asset inventory + SBOM for federal software', freq: 'Per release', policy: 'SBOM & Asset Inventory Policy (SA-10 / CM-8)', sla: 'Machine-generated SBOM in CI for every component' },
        ], check: 'ATO package submitted; AO risk acceptance documented; ATO granted or conditions listed.' },
        { area: 'Endpoint Security & Device Classes', controls: [
          { text: 'CM-8: Complete asset inventory — physical servers, on-prem databases, cloud services, purchased assets, BYOD, IoT/OT', freq: 'Continuous', policy: 'Asset Inventory Policy (CM-8)', sla: 'Assets tagged by device class at acquisition' },
          { text: 'CM-11: Media protection — encryption at rest (FIPS 140-2/3), encryption in transit (TLS 1.2+), sanitization procedures', freq: 'On media/acceptance', policy: 'Media Protection Policy (CM-11)', sla: 'FIPS 140-2/3 at rest; TLS 1.2+ in transit; sanitization on disposal' },
          { text: 'SC-7: Boundary protection — micro-segmentation, ZTNA, ZTNA for BYOD (no direct network access)', freq: 'On change + annual validation', policy: 'Boundary Protection Policy (SC-7)', sla: 'Segmentation review at least annually; ZTNA for BYOD' },
          { text: 'AC-20: Use of external systems — BYOD policy, managed containers (Intune App Protection, Citrix Secure Workspace), VDI (Windows 365, AVD), Remote Browser Isolation', freq: 'On device onboarding', policy: 'External Systems & BYOD Policy (AC-20)', sla: 'BYOD restricted to managed container/VDI/RBI; no direct network access' },
          { text: 'IA-2: MFA for all access — phishing-resistant (FIDO2/WebAuthn, PIV) for privileged; passwordless for standard', freq: 'Every login', policy: 'Authentication Policy (IA-2)', sla: 'Phishing-resistant MFA for privileged; MFA for all access' },
          { text: 'MA-3: Maintenance tools — EDR/XDR (CrowdStrike, SentinelOne, Defender for Endpoint) on all corporate endpoints', freq: 'Continuous', policy: 'Maintenance & EDR Policy (MA-3)', sla: 'EDR/XDR coverage on 100% of corporate endpoints' },
          { text: 'PE-3: Physical access — MDM geofencing, device attestation, remote lock/wipe', freq: 'Continuous + on device', policy: 'Physical Access Policy (PE-3)', sla: 'MDM geofence/attestation/remote wipe enforced' },
          { text: 'SA-10: Developer security — SBOM (CycloneDX/SPDX), SLSA Level 2+, signed images (Cosign), provenance attestation', freq: 'Per release', policy: 'Developer Security & SBOM Policy (SA-10)', sla: 'SBOM generated in CI; images signed; provenance attested' },
        ], check: 'Asset inventory tagged by device class (corporate, BYOD_container, BYOD_vdi, BYOD_rbi, iot_ot, cloud_virtual) with per-class control objectives and evidence.' },
      ],
     observations: [
       { finding: 'Incomplete SSP scoping', why: 'The SSP omits system boundary, data types, or connections; the assessor cannot scope the SAP without it.' },
       { finding: 'Missing inherited vs. assigned control map', why: 'Failing to distinguish CSP-inherited controls from customer-configured controls leaves gaps the customer must own.' },
       { finding: 'POA&M gaps unresolved at assessment', why: 'Open POA&M items with no target dates or evidence of closure lead to assessment findings.' },
       { finding: 'Continuous monitoring not operational', why: 'ATO granted but ConMon is manual/annual — FedRAMP requires ongoing control monitoring and recurring self-assessment.' },
       { finding: 'No SBOM or asset inventory', why: 'Federal software deliveries lack a machine-generated SBOM; asset inventory (physical servers, on-prem databases, cloud services, purchased assets) is incomplete — CM-8 and CM-11 controls not evidenced.' },
     ],
rebuttals: [
       { finding: 'SSP scoping incomplete', pushback: 'Challenge the assessor scope with the signed SSP — if a component is out of scope, it is not assessed. Request the assessor isolate the in-scope boundary explicitly.', evidence: 'Signed SSP, system boundary diagram.',
         replyToAuditor: 'The signed SSP and system boundary diagram define the in-scope boundary; components outside it — such as our payroll SaaS — are marked out-of-scope in the SSP, and we ask that they be isolated from the Security Assessment Plan.' },
       { finding: 'Inherited control gap attributed to customer', pushback: 'Cite the shared-responsibility matrix showing the control is inherited from the FedRAMP-authorized CSP; ask the assessor to confirm the inherited control list in the SSP.', evidence: 'CSP FedRAMP authorization package, shared-responsibility matrix.',
         replyToAuditor: 'Controls such as CM-2 and AC-6 are inherited from the FedRAMP-authorized CSP under the shared-responsibility matrix in the SSP; we ask that the inherited control list be confirmed against the CSP authorization package rather than assigned for customer implementation.' },
       { finding: 'ConMon not evidenced', pushback: 'Present the ConMon strategy, automated monitoring tools, and recurring self-assessment schedule — show continuous operation, not a point-in-time snapshot.', evidence: 'ConMon strategy, monitoring dashboards, self-assessment logs.',
         replyToAuditor: 'Our ConMon strategy runs automated CSPM and SIEM monitoring continuously, with a recurring monthly self-assessment and a living POA&M carrying owners and closure dates — this is ongoing operation, not a point-in-time snapshot for the assessment.' },
       { finding: 'SBOM/asset inventory missing', pushback: 'Present the asset inventory (cloud services, on-prem servers, physical servers, databases, purchased assets) and the machine-generated SBOM; show CM-8 (asset inventory) and CM-11 (media acceptance) evidence.', evidence: 'Asset inventory, SBOM generation tool output, CM-8/CM-11 artifacts.',
         replyToAuditor: 'We produce a CycloneDX SBOM per component from our CI pipeline and maintain the CM-8 asset inventory across cloud services, on-prem and physical servers, databases and purchased assets; both the inventory and SBOM output are attached as CM-8/CM-11 evidence.' },
      ],
      policyTimeline: {
      drafting: 'Draft the SSP controls, boundary, and shared-responsibility matrix together so inherited vs. assigned never drifts; decide the device-class controls (CM-8 inventory, endpoint security) in the SSP phase because they drive later ConMon.',
      beforeAudit: 'Close POA&M items to evidence before the assessment window, re-verify the CSP authorization package covers the inherited list, and run the SBOM generation so CM-8/CM-11 artifacts are current rather than reconstructed.',
      afterFindings: 'Record each finding in the POA&M with an owner and target date, update the affected SSP section with an effective-date revision, and evidence closure at the next recurring self-assessment.',
      },
      timeline: {
      kind: 'authorization',
      total: 'Fresh ATO ~26–52 weeks (Moderate); faster with reuse',
      phases: [
        { name: 'Preparation', weeks: '16–36', detail: 'SSP/SAP build, control implementation per baseline, 3PAO readiness assessment, asset inventory + SBOM.' },
        { name: 'Observation', weeks: '8–12', detail: 'Evidence accumulation across the baseline; automated CM-8/CM-11 monitoring must be live.' },
        { name: 'Fieldwork', weeks: '4–8', detail: '3PAO security assessment → SAR; agency or JAB review; PoC authorization usually precedes full JAB.' },
        { name: 'Report issuance', weeks: '4–8', detail: 'SAR + POA&M publication, agency/JAB decision, ATO letter with conditions.' },
        { name: 'Maintenance', weeks: 'ongoing', detail: 'ConMon: recurring self-assessments, monthly CSPM/SIEM review, POA&M tracking.' },
        { name: 'Re-issuance', weeks: '3-year cycle', detail: 'Re-authorization every 3 years (annual reviews in between); reuse first-package assets.' },
      ],
      },
     clauses: [
       { title: 'FedRAMP authorization status', text: 'Vendor represents it is FedRAMP Authorized at the stated baseline (Low/Moderate/High) with a current ATO, and shall maintain authorization and notify Client of any suspension or downgrade.', required: true },
       { title: '3PAO / SAR evidence', text: 'Vendor shall provide the most recent Security Assessment Report (SAR) and Plan of Action & Milestones (POA&M) annually and upon Client request.', required: true },
       { title: 'Continuous monitoring', text: 'Vendor shall maintain a Continuous Monitoring strategy, perform recurring self-assessments, and report control changes or incidents to Client promptly.', required: true },
       { title: 'SBOM & asset inventory', text: 'Vendor shall maintain a software bill of materials (SBOM) and a current asset inventory (on-prem servers, physical servers, databases, cloud services, purchased assets) and ensure endpoint security (EDR/MDM/encryption) on all corporate devices.', required: true },
     ],
     discrepancies: [
       'FedRAMP authorizes the CSP at a baseline, but the customer configures the services — the shared-responsibility boundary is the #1 assessment gap.',
       'FedRAMP Moderate inherits NIST 800-53 controls but the customer must still implement the assigned controls; conflating inherited vs. assigned is a common finding.',
       'FedRAMP requires a SBOM and asset inventory (CM-8/CM-11) for federal software — an on-prem or purchased-asset environment must produce these artifacts for every component.',
     ],
   },
cjis: {
      id: 'cjis',
      name: 'CJIS (Criminal Justice Info Services)',
      color: '#7f1d1d',
      desc: 'FBI CJIS Security Policy — governs access to criminal justice information (NCIC, NLETS, N-DEx) for law enforcement, courts, corrections, and affiliated vendors.',
      whoCanWork: 'Access to CJI requires US citizenship, a fingerprint-based background check, and affiliation with a criminal justice agency or authorized entity. Non-US persons generally cannot access CJI. Anyone can build compliant controls and documentation, but the personnel with CJI access are US-citizen, cleared, and agency-affiliated.',
      policies: [
        { area: 'CJI Classification & Access', controls: [
          { text: 'CJI vs SCJI (Sensitive Criminal Justice Information) classification — CJI includes arrest records, criminal histories, identification data; SCJI includes intelligence, undercover, and forensic data', freq: 'On change + annual review', policy: 'CJI Classification Policy', sla: 'SCJI restricted to specifically authorized personnel' },
          { text: 'Need-to-know and official purpose requirements for every access', freq: 'Every access', policy: 'CJI Access Policy', sla: 'Purpose documented in logs for each access' },
          { text: 'User agreement and acknowledgement signed by each user', freq: 'Initial + annual renewal', policy: 'CJIS User Agreement', sla: 'Signed before access; renewed annually' },
        ], check: 'Confirm every CJI-accessing user has a signed user agreement and a documented need-to-know; verify SCJI access is limited to authorized personnel.' },
        { area: 'User Access & Background', controls: [
          { text: 'Fingerprint-based background check (FBI and state) for every CJI user', freq: 'Pre-hire + annual re-check', policy: 'Personnel Clearance Policy (fingerprint / FBI & state)', sla: 'Completed before CJI access; re-check annually' },
          { text: 'US citizenship requirement for most CJI/NCIC/NLETS access', freq: 'Pre-hire', policy: 'Personnel Clearance Policy (citizenship)', sla: 'Citizenship verified before access' },
          { text: 'Annual re-checks and user agreement renewal', freq: 'Annual', policy: 'Personnel Clearance Policy (re-check + renewal)', sla: 'Re-check and re-affirmation annually; lapsed checks revoke access' },
        ], check: 'Verify background checks are current (no lapsed checks), citizenship verified, and re-checks are on an annual cycle.' },
        { area: 'Security Controls', controls: [
          { text: 'Encryption of CJI in transit (TLS) and at rest (disk/database encryption)', freq: 'Continuous', policy: 'CJI Encryption Policy (5.6.1)', sla: 'FIPS 140-2 validated at rest; TLS 1.2+ in transit on all devices' },
          { text: 'Audit logging of all CJI access with retained logs', freq: 'Continuous; weekly review', policy: 'CJIS Audit Logging Policy (5.6.2)', sla: 'Retained ≥1 year (5 recommended); every access captured with user/timestamp/action' },
          { text: 'Two-factor authentication for remote access', freq: 'Every remote access', policy: 'CJIS Access Control Policy (5.6.3)', sla: 'MFA advanced auth required; session lock after 15 min inactivity' },
          { text: 'System security plan and periodic risk assessment', freq: 'Annual', policy: 'CJIS System Security Plan & Risk Assessment', sla: 'SSP reviewed annually; re-assessment on architecture change' },
        ], check: 'Confirm encryption is enforced (no plaintext CJI), audit logs capture every access with retention meeting CJIS minimums, and remote access uses MFA.' },
        { area: 'Training & Compliance', controls: [
          { text: 'CJIS Security Policy training (initial + annual) for all users', freq: 'Initial + annual', policy: 'CJIS Training & Awareness Policy', sla: 'Annual refresher for all users; records retained' },
          { text: 'Incident reporting to the FBI per CJIS timelines', freq: 'Event-driven', policy: 'CJIS Incident Reporting Policy (5.6.6)', sla: 'Notify FBI CJIS ISO within 1 hour' },
          { text: 'Compliance audits by the CJIS Policy Board', freq: 'Per agency cadence', policy: 'CJIS Compliance & Audit Policy', sla: 'Audit readiness maintained continuously' },
        ], check: 'Confirm training records exist for all users (initial + annual), and an incident-reporting process is documented and tested.' },
        { area: 'Endpoint Security & Device Classes', controls: [
          { text: '5.6.1: Encryption — FIPS 140-2 validated encryption for CJI at rest (BitLocker, FileVault, LUKS) and in transit (TLS 1.2+) on ALL devices', freq: 'Continuous', policy: 'CJI Encryption Policy (5.6.1)', sla: 'At-rest and in-transit encryption enforced on every CJI device' },
          { text: '5.6.2: Audit Logging — Full audit trail (user, timestamp, action, data accessed) retained ≥1 year (5 years recommended) on all endpoints', freq: 'Continuous; weekly review', policy: 'CJIS Audit Logging Policy (5.6.2)', sla: 'Retained ≥1 year (5 recommended); full trail captured' },
          { text: '5.6.3: Access Control — MFA (advanced auth) for remote access; unique user IDs; least privilege; session lock (15 min inactivity)', freq: 'Every access; quarterly review', policy: 'CJIS Access Control Policy (5.6.3)', sla: 'MFA on remote access; unique IDs; least privilege; 15-min session lock' },
          { text: '5.6.4: Device Management — Corporate: MDM (Intune/Jamf) + EDR + disk encryption + cert-based Wi-Fi/VPN + remote wipe; BYOD: MANAGED CONTAINER ONLY (Intune App Protection, Island Enterprise Browser) or VDI/DaaS (AVD, W365, Citrix) — NO direct CJI access on unmanaged BYOD', freq: 'Continuous; on device onboarding', policy: 'CJIS Device Management Policy (5.6.4)', sla: 'Corporate = full stack; BYOD = container/VDI/RBI only; no direct CJI on unmanaged BYOD' },
          { text: '5.6.5: Media Protection — Sanitization (NIST SP 800-88) for all media; asset tracking via inventory (CM-8 equivalent)', freq: 'On disposal', policy: 'CJIS Media Protection Policy (5.6.5)', sla: 'Sanitization per NIST SP 800-88; inventory tracked' },
          { text: '5.6.6: Incident Response — 1-hour notification to FBI CJIS ISO; endpoint forensics capability (EDR telemetry)', freq: 'Event-driven', policy: 'CJIS Incident Response Policy (5.6.6)', sla: 'Notify FBI CJIS ISO within 1 hour' },
          { text: '5.12: Wireless — No open Wi-Fi; WPA3-Enterprise with certificate auth; MDM pushes profiles', freq: 'On-network deployment', policy: 'CJIS Wireless Security Policy (5.12)', sla: 'WPA3-Enterprise + certificate auth; no open Wi-Fi' },
          { text: '5.13: Mobile Devices — Containerization mandatory; no CJI in personal apps; DLP (copy/paste, screenshot, save-as blocked)', freq: 'Continuous', policy: 'CJIS Mobile Device Policy (5.13)', sla: 'DLP blocks copy/paste, screenshot and save-as on CJI data' },
        ], check: 'Every device accessing CJI tagged with device_class; corporate = full stack; BYOD = container/VDI/RBI only; IoT = segmented + passive monitoring. Evidence: MDM compliance reports, EDR coverage, container policy exports, VDI session logs, network segmentation diagrams.' },
      ],
     observations: [
       { finding: 'Non-citizen or uncleared personnel accessing CJI', why: 'Background checks or citizenship verification lapsed; non-agency users with CJI access without proper clearance.' },
       { finding: 'Audit log gaps', why: 'Remote access or terminal activity not fully logged; logs retained below the CJIS retention requirement.' },
       { finding: 'Encryption not enforced for CJI in transit', why: 'CJI transmitted over unencrypted channels or stored unencrypted on endpoints/backups.' },
       { finding: 'User agreement or annual re-check expired', why: 'User agreements not renewed annually; re-checks lapsed; access not revoked promptly.' },
     ],
rebuttals: [
       { finding: 'Uncleared user access', pushback: 'Present the fingerprint-based background check results, citizenship verification, and the signed user agreement; isolate the user and revoke access pending resolution.', evidence: 'Background check records, user agreement, access logs.',
         replyToAuditor: 'We pulled the user\u2019s fingerprint-based FBI and state background check and citizenship verification from the CJIS-compliant HR file, and the signed user agreement is on record; access was revoked and the user isolated pending resolution of the discrepancy.' },
       { finding: 'Audit log gap', pushback: 'Show the logging configuration and retention schedule; demonstrate the gap was due to a temporary system issue with a documented root cause and fix.', evidence: 'Logging config, retention policy, incident record.',
         replyToAuditor: 'Our logging configuration retains CJI access for one year (five years recommended) in Splunk; the three-day gap traced to a rotation failure with a documented root cause and fix, and logging was restored and verified on the date recorded in the incident.' },
       { finding: 'Encryption exception', pushback: 'Cite the CJIS encryption requirements and show the compensating controls (network segmentation, MFA, monitoring) in place; document the risk acceptance.', evidence: 'Encryption policy, network diagram, compensating-control declaration.',
         replyToAuditor: 'CJI is encrypted in transit (TLS 1.2+) and at rest (disk/database encryption); for the two documented exceptions we maintain compensating controls — network segmentation, MFA for all access, and monitoring — with a signed risk acceptance referencing the CJIS sections.' },
      ],
      policyTimeline: {
      drafting: 'Draft policy with the CJIS retention floor (1 year minimum, 5 years recommended) and the cleared-personnel requirement written in, so HR and Logging operating procedures match policy from day one rather than on audit day.',
      beforeAudit: 'Re-verify every CJI user has a current fingerprint check, signed and dated user agreement, and annual re-check; run a log-retention spot check and a TLS-at-rest/in-transit scan before the CJIS audit.',
      afterFindings: 'Issue a policy revision with corrective action and effective date, restore the affected control (re-check, re-logging, re-encryption), and re-submit to the CJIS audit with the evidence of the fix.',
      },
      timeline: {
      kind: 'compliance',
      total: '~4–16 weeks to a compliant posture (agency-gated, no certificate)',
      phases: [
        { name: 'Preparation', weeks: '2–8', detail: 'CJIS policy mapping, cleared-personnel program (fingerprint checks), technical controls (TLS, MFA, logging).' },
        { name: 'Observation', weeks: '2–4', detail: 'Live operations evidence: signed user agreements, annual re-checks running, log retention accruing.' },
        { name: 'Fieldwork', weeks: '1–2', detail: 'Agency/CJIS audit of policy → practice; state audits can be scheduled or incident-triggered.' },
        { name: 'Report issuance', weeks: '1–4', detail: 'Agency compliance determination; no standalone certificate.' },
        { name: 'Maintenance', weeks: 'ongoing', detail: 'Annual user-agreement renewal + re-checks, log retention, training, FBI incident reporting.' },
        { name: 'Re-issuance', weeks: 'annual / agency cadence', detail: 'Re-audit on the agency cadence; any policy change triggers re-documentation.' },
      ],
      },
     clauses: [
       { title: 'CJIS compliance', text: 'Vendor shall maintain CJIS Security Policy compliance, ensure all CJI-accessing personnel are US citizens with current fingerprint-based background checks, and promptly notify Client of any compliance issue or access revocation.', required: true },
       { title: 'Audit logging & encryption', text: 'Vendor shall maintain audit logs of all CJI access for the CJIS retention period, encrypt CJI in transit and at rest, and provide access reports to Client on request.', required: true },
     ],
discrepancies: [
        'CJIS requires US citizenship + fingerprint-based background checks for CJI access, while FedRAMP/GDPR focus on technical controls — combining both requires both a cleared workforce and technical controls.',
        'CJIS audit-log retention (minimum 1 year, 5 years recommended) overlaps with PCI 12-month logs and HIPAA 6-year records — use a single retention matrix.',
        'Carve-out vs carve-in for CJIS vendors: a carve-in vendor must be CJIS-compliant with cleared personnel; a carve-out requires CUECs from the client.',
      ],
    },
  iso42001: {
    id: 'iso42001',
    name: 'ISO/IEC 42001',
    color: '#a21caf',
    desc: 'The AI Management System (AIMS) standard — Clause 4-10 + Annex B AI-related controls (B.5-B.14). Risk-based AI governance layered on ISO 27001.',
    policies: [
      { area: 'AIMS & AI Policy', controls: [
        { text: 'Clause 5.2 — top-management AI policy', freq: 'Annual + on change', policy: 'AIMS Top-Management AI Policy (Clause 5.2)', sla: 'Approval evidenced (signature/minutes) at least annually' },
        { text: 'Annex B.5 — AI policy aligned to AI policy and code of conduct (Annex A)', freq: 'Annual review', policy: 'AI Policy Alignment & Code of Conduct (Annex B.5 / Annex A)', sla: 'Alignment re-checked when the code of conduct changes' },
        { text: 'Clause 4 — context, interested parties, AIMS scope', freq: 'On material change', policy: 'AIMS Scope Statement (Clause 4)', sla: 'Scope re-aligned within 30 days of a system/context change' },
      ], note: 'The AI policy must be approved by top management with evidence (signature/minutes) and aligned to the AIMS scope statement.' },
      { area: 'AI Governance & Roles', controls: [
        { text: 'Clause 5.3 — roles, responsibilities, authorities', freq: 'Annual + on change', policy: 'AI Governance & Roles (Clause 5.3)', sla: 'Roles current and documented' },
        { text: 'Annex B.6.2 — AI governance function', freq: 'Ongoing', policy: 'AI Governance Function (Annex B.6.2)', sla: 'Function operating beside the ISMS owner' },
        { text: 'Annex B.6.3 — conflict of interests', freq: 'On AI procurement/selection', policy: 'AI Conflict-of-Interest Policy (Annex B.6.3)', sla: 'Checks completed before model procurement' },
      ], note: 'AI governance function should sit beside the ISMS owner; conflict-of-interest checks apply to AI procurement and model selection.' },
      { area: 'AI Risk Management', controls: [
        { text: 'Clause 6.1.3/6.1.4 — AI risk assessment & risk treatment', freq: 'Annual + on system change', policy: 'AI Risk Assessment & Treatment (Clause 6.1.3/6.1.4)', sla: 'AI risk register updated within 30 days of change' },
        { text: 'Annex B.8 — assessing impacts of AI systems (safety, rights, fairness)', freq: 'On high-impact systems annually', policy: 'AI Impact Assessment (Annex B.8)', sla: 'Assessments completed before deployment of high-impact AI' },
      ], note: 'AI risk assessment is distinct from info-sec risk — must cover autonomy, bias, hallucination, misuse, and societal impact, not just confidentiality.' },
      { area: 'Data for AI Systems', controls: [
        { text: 'Annex B.10.1 — data acquisition & provenance', freq: 'On dataset acquisition', policy: 'AI Data Provenance (Annex B.10.1)', sla: 'Source, license and collection date recorded per dataset' },
        { text: 'Annex B.10.2 — data quality', freq: 'On dataset use', policy: 'AI Data Quality Policy (Annex B.10.2)', sla: 'Quality checks recorded before training' },
        { text: 'Annex B.10.3 — data used for testing/training', freq: 'On dataset use', policy: 'AI Test/Training Data Control (Annex B.10.3)', sla: 'Ground-truth validation and PII redaction documented' },
        { text: 'Clause 8.2 — data management', freq: 'Continuous', policy: 'AIMS Data Management (Clause 8.2)', sla: 'Datasets registered and versioned' },
      ], note: 'Training/fine-tuning datasets need documented provenance: source, license, collection date, ground-truth validation, PII redaction.' },
      { area: 'AI System Life Cycle', controls: [
        { text: 'Annex B.9 — AI system life cycle', freq: 'Per system lifecycle', policy: 'AI System Life-Cycle Policy (Annex B.9)', sla: 'Life-cycle stages evidenced per system' },
        { text: 'Clause 8.3 — design & development (incl. testing/validation B.9.3)', freq: 'Per release', policy: 'AI Design & Development (Clause 8.3 / B.9.3)', sla: 'Validation evidence retained for in-scope systems' },
        { text: 'Clause 8.4 — deployment', freq: 'Per deployment', policy: 'AI Deployment Policy (Clause 8.4)', sla: 'Deployment approval and rollback documented' },
        { text: 'Clause 8.5 — operation & monitoring', freq: 'Continuous', policy: 'AI Operation & Monitoring (Clause 8.5)', sla: 'Performance/safety thresholds monitored' },
        { text: 'Clause 8.6 — AI system changes', freq: 'On model change', policy: 'AI Change Control (Clause 8.6)', sla: 'Material changes assessed and logged' },
      ], note: 'Validation evidence (accuracy, robustness, safety thresholds) must be kept for the AI systems in scope — not just the app code.' },
      { area: 'Third-Party AI & Suppliers', controls: [
        { text: 'Annex B.13 — third-party and customer relationships', freq: 'Annual + on new provider', policy: 'AI Third-Party & Supplier Management (Annex B.13)', sla: 'Provider assessed before onboarding; re-assessment at least annually' },
        { text: 'Clause 8 — third-party AI system management', freq: 'On provider change', policy: 'Third-Party AI System Management (Clause 8)', sla: 'Data-use and change-notification terms documented' },
        { text: 'Annex B.12 — use of AI systems', freq: 'Ongoing', policy: 'AI Use Policy (Annex B.12)', sla: 'Permitted uses and restrictions documented' },
      ], note: 'Foundation-model and model-API providers are in scope: assess them like subservice organisations, incl. data use and model changes.' },
      { area: 'Transparency & Stakeholders', controls: [
        { text: 'Annex B.11 — information for interested parties', freq: 'On deployment/change', policy: 'AI Transparency Policy (Annex B.11)', sla: 'Model cards and AI-use disclosure published before deployment' },
        { text: 'Annex B.14.4 — user/stakeholder involvement', freq: 'On high-impact systems', policy: 'AI Stakeholder Involvement (Annex B.14.4)', sla: 'Stakeholder review recorded for high-impact systems' },
        { text: 'Annex A — AI code of conduct', freq: 'Annual + on change', policy: 'AI Code of Conduct (Annex A)', sla: 'Re-affirmed annually by top management' },
      ], note: 'Disclose AI use to stakeholders (model cards, AI-use disclosure); automated decisions must identify AI involvement and the appeal path.' },
      { area: 'Bias, Robustness & AI Safety', controls: [
        { text: 'Annex B.14.2 — bias assessment', freq: 'On high-impact model refresh (min. annually)', policy: 'Bias Assessment Procedure (Annex B.14.2)', sla: 'Test set, fairness metrics and thresholds documented before deployment' },
        { text: 'Annex B.14.5 — AI system robustness', freq: 'On deployment + change', policy: 'AI Robustness Testing (Annex B.14.5)', sla: 'Adversarial/edge-case testing logged' },
        { text: 'Clause 10 — nonconformity, corrective action, AI incidents', freq: 'Event-driven', policy: 'AI Nonconformity & Corrective Action (Clause 10)', sla: 'AI incidents root-caused and corrective actions tracked' },
      ], note: 'Bias assessment (B.14.2) applies to high-impact/consumer-facing AI — SOC 2/ISO 27001 do not require fairness evidence.' },
      { area: 'AI Incidents & Logging', controls: [
        { text: 'Annex B.14.1 — AI security/incident response', freq: 'Continuous; IR tested annually', policy: 'AI Incident Response (Annex B.14.1)', sla: 'AI incidents triaged per taxonomy and severity' },
        { text: 'Clause 10.2 — nonconformity and corrective action', freq: 'Event-driven', policy: 'AI Corrective Action (Clause 10.2)', sla: 'Root cause and CAP logged within 30 days' },
        { text: 'Annex B.9 — monitoring & logging of AI inputs/outputs', freq: 'Continuous', policy: 'AI Monitoring & Logging (Annex B.9)', sla: 'Inputs/outputs logged per retention schedule' },
      ], note: 'Build an AI-specific incident taxonomy (hallucination, bias/unsafe output, model failure) instead of folding every AI issue into generic IT incident management.' },
      { area: 'HR, Competence & Awareness', controls: [
        { text: 'Clause 7.2 — competence', freq: 'On hire + on role change', policy: 'AI Competence Management (Clause 7.2)', sla: 'Competence matrix current; role-based AI skills tracked' },
        { text: 'Clause 7.3 — awareness', freq: 'Annual + on hire', policy: 'AI Awareness Training (Clause 7.3)', sla: 'AI-aware teams trained; records retained' },
        { text: 'Clause 7.4 — communication', freq: 'On policy/incident change', policy: 'AI Communication (Clause 7.4)', sla: 'Relevant changes communicated to interested parties' },
        { text: 'Annex B.6.2 — AI governance function resourcing', freq: 'Annual', policy: 'AI Governance Resourcing (Annex B.6.2)', sla: 'Governance function adequately resourced and evidenced' },
      ], note: 'Teams designing, deploying, or supervising AI systems need AI-specific awareness and role-based training on record.' },
    ],
    observations: [
      { finding: 'No AI-specific risk assessment', why: 'Clause 6.1.3 / Annex B.8 — AI risks (autonomy, bias, hallucination, misuse, societal impact) folded into the infosec risk register or not assessed at all.' },
      { finding: 'AIMS scope / AI inventory unclear', why: 'Clause 4.3 — the AI system inventory is incomplete or the AIMS scope statement is not aligned with what is actually in production.' },
      { finding: 'Bias assessment missing for high-impact AI', why: 'Annex B.14.2 — high-impact or consumer-facing models have no documented bias assessment (test set, fairness metrics, thresholds, review).' },
      { finding: 'AI incident reporting not established', why: 'Clause 10.2 / Annex B.14 — no AI-specific incident taxonomy or process; AI failures reported as generic IT tickets, so learning is lost.' },
      { finding: 'Third-party / foundation model oversight absent', why: 'Annex B.13 — models from OpenAI/Anthropic/etc. are used without documented assessment of data use, model changes, and sub-processing.' },
      { finding: 'Data provenance & quality undocumented', why: 'Annex B.10 — training/fine-tuning data lacks source, license, collection date, ground-truth validation, and PII redaction records.' },
      { finding: 'Human oversight not evidenced', why: 'Clause 8 / Annex B.14 — high-autonomy workflows run without a documented human-in-the-loop map (who reviews, at what confidence, with what override).' },
      { finding: 'No AI transparency to stakeholders', why: 'Annex B.11 — users/customers are not told AI is used, its limitations, or how to challenge automated decisions.' },
      { finding: 'Competence & awareness gaps', why: 'Clause 7.2/7.3 — AI-specific training not delivered or recorded for teams building and supervising AI systems.' },
      { finding: 'Top-management commitment not evidenced', why: 'Clause 5.2 — AI policy not approved by top management; no management-review minutes connecting the AIMS to business strategy.' },
    ],
    rebuttals: [
      { finding: 'AI risk assessment not performed', pushback: 'Demand the auditor distinguish AI-specific risk (Clause 6.1.3, Annex B.8) from infosec risk — a "smoke and mirrors" critique must cite a specific AI system in scope. Show the AI risk register with autonomy/bias/hallucination treated separately.', evidence: 'AI risk register, AI risk assessment report, residual-risk acceptance signed by the AI governance function.',
        replyToAuditor: 'We maintain a separate AI risk register under Clause 6.1.3 and Annex B.8 — autonomy, bias, hallucination and misuse are scored on likelihood and impact for each scoped AI system, distinct from the info-sec register, with residual-risk acceptance signed by the AI governance function.' },
      { finding: 'AIMS scope / AI inventory unclear', pushback: 'A system outside the AIMS scope statement is not "missing" — ask the auditor to anchor on Clause 4.3 and the signed scope statement, then test only in-scope AI systems.', evidence: 'AI system inventory, AIMS scope statement, system classification (autonomy/data/impact).',
        replyToAuditor: 'Our AI system inventory under Clause 4.3 classifies every system by autonomy (full / partial / human-in-the-loop), data class and criticality; the item you cite is outside the signed AIMS scope, and we ask that testing anchor on the scope statement.' },
      { finding: 'Bias assessment missing', pushback: 'Annex B.14.2 applies proportionately — scope bias assessments to high-impact or consumer-facing models, not every internal assistant. Present the test set, fairness metrics, and thresholds used.', evidence: 'Bias assessment reports, fairness metrics, test-set methodology, stakeholder review minutes.',
        replyToAuditor: 'We ran bias assessments on the two high-impact models using demographic-parity metrics on a documented test set, reviewed by a stakeholder panel with thresholds and sign-off; internal assistants are risk-scoped out of B.14.2 in the bias-assessment log.' },
      { finding: 'AI incident reporting not established', pushback: 'AI incidents do not need a separate platform — they need a distinct taxonomy and flow. Show the AI incident register with hallucination/bias/unsafe-output classes and owners.', evidence: 'AI incident register, AI incident taxonomy, runbook, monthly review minutes.',
        replyToAuditor: 'AI-specific incidents and near-misses are classed separately in our incident process — hallucination, bias or unsafe output, and model failure — each with an owner, and the AI incident register is reviewed monthly beside the standard IR review.' },
      { finding: 'Third-party / foundation model oversight absent', pushback: 'Annex B.13 treats model providers like subservice organisations — demand the provider evidence (model documentation, change notification, data-use limits) rather than a blanket "no oversight" claim.', evidence: 'Model provider assessments, model documentation, data-use agreements, sub-AI flow-down.',
        replyToAuditor: 'Our foundation-model and model-API providers are assessed under Annex B.13 with model documentation, change-notification terms, and explicit data-use restrictions — including a commitment not to train on our data — recorded in the AI supplier register.' },
      { finding: 'Data provenance & quality undocumented', pushback: 'Annex B.10 does not require full dataset audit trails for every model — require the auditor to name the dataset. Show datasheets: source, license, collection date, ground-truth validation, PII redaction.', evidence: 'Dataset datasheets, data-quality checks, PII redaction records.',
        replyToAuditor: 'Each fine-tuning dataset has a datasheet covering source, license, collection date, ground-truth validation and PII-redaction steps under Annex B.10, so provenance is traceable from acquisition to use.' },
      { finding: 'Human oversight not evidenced', pushback: 'Humans need not review every output — evidence the human-in-the-loop map: which workflows route through a human approver, at what confidence threshold, with what override and escalation path.', evidence: 'Human-in-the-loop mapping, override/escalation procedures, review logs.',
        replyToAuditor: 'Every high-autonomy workflow has a documented human-in-the-loop map — draft flows route through a human approver before send, with confidence thresholds, override rights and an escalation path recorded in the AI system specification.' },
      { finding: 'No AI transparency to stakeholders', pushback: 'Annex B.11 transparency is proportionate to impact — stress-test high-autonomy decisions, disclose AI use, and provide an appeal path, rather than labelling every AI feature "opaque".', evidence: 'Model cards, AI-use disclosure notice, appeal/challenge process, stakeholder communications.',
        replyToAuditor: 'AI use is disclosed to stakeholders through model cards, an AI-use disclosure notice, and system-level transparency notes; automated decisions identify the AI involvement and the path to challenge, per Annex B.11.' },
      { finding: 'Competence & awareness gaps', pushback: 'Clause 7.2/7.3 requires documented competence for teams that build and supervise AI, not every employee. Show role-based AI training records and the competence matrix.', evidence: 'AI competence matrix, role-based training records, awareness schedule.',
        replyToAuditor: 'Teams designing, deploying or supervising AI systems complete AI-specific, role-based training under Clause 7.2/7.3 — records are in the training register with a competence matrix mapping roles to required skills.' },
      { finding: 'Top-management commitment not evidenced', pushback: 'Present the approved AI policy, code-of-conduct alignment (Annex A), and management-review minutes where the AIMS is tied to business strategy — commitment is evidenced by decisions, not documents alone.', evidence: 'Signed AI policy, Annex A code-of-conduct sign-off, management-review minutes, resource approvals.',
        replyToAuditor: 'The AIMS and AI policy are board-approved, management-review minutes (Clause 9.3) tie the AIMS to business strategy and resource decisions, and Annex A code-of-conduct alignment is signed — commitment is evidenced by decisions, not just documents.' },
    ],
    policyTimeline: {
      drafting: 'Write the AI policy and the AI risk criteria together, referencing the AIMS scope and which Annex B objectives apply — a policy that asserts an AI posture you have not risk-scored is the fastest way to a B.8 finding. Keep the AI system inventory in the same document as the scope statement.',
      beforeAudit: 'Freeze the AI inventory and AI risk register, re-run bias assessments that are due under your refresh schedule, and rehearse a Clause 9.3 management review so executives can answer with minutes and model-monitoring reports instead of memory.',
      afterFindings: 'Route each finding through Clause 10 properly: root-cause, revise the AI policy or control with an effective-date header, re-run the AI risk assessment if the system changed, and evidence the fix at the next surveillance audit.',
    },
    timeline: {
      kind: 'certification',
      total: 'Certification in ~16–32 weeks fresh AIMS; surveillance ~4–8 weeks; recert on a 3-year cycle',
      phases: [
        { name: 'Preparation', weeks: '12–24', detail: 'AIMS build: scope + AI inventory, AI risk assessment (Clause 6), Annex B controls, AI policy sign-off, awareness, internal audit.' },
        { name: 'Observation', weeks: '4–8', detail: 'Evidence accumulation: AI risk register updates, model monitoring reports, bias-assessment refreshes, Clause 9.3 management review.' },
        { name: 'Fieldwork', weeks: '4–8', detail: 'Stage 1 (document review, ~1–2 wks) → Stage 2 (AIMS implementation audit, ~2–4 wks); minor and major nonconformities get formal corrective-action windows.' },
        { name: 'Report issuance', weeks: '1–2', detail: 'Audit report + certificate issued under the certification-body rules after Stage 2.' },
        { name: 'Maintenance', weeks: 'ongoing', detail: 'Annual surveillance audits; keep the AI inventory, bias assessments and model-change log current between cycles.' },
        { name: 'Re-issuance', weeks: '3-year cycle', detail: 'Full recertification on year 3 — faster if the AIMS was actually maintained; AI landscape changes usually widen the audit scope.' },
      ],
    },
    clauses: [
      { title: 'AI incident reporting', text: 'Vendor shall operate an AI incident reporting process covering hallucinations, bias or unsafe output, and model failures, and shall notify Client without undue delay of any AI incident affecting Client data or automated decisions. Vendors that expose AI to end users shall root-cause alongside AI-specific taxonomy per ISO/IEC 42001 Annex B.', required: true },
      { title: 'AI transparency & model documentation', text: 'Vendor shall disclose where AI is used to provide the services and shall provide model documentation (capabilities, limitations, training-data provenance, confidence thresholds) for each AI system, updating it on material model changes. Called "AI transparency" and "model documentation" obligations.', required: true },
      { title: 'No training on customer data', text: 'Vendor shall not use Client data, prompts, or outputs to train foundation models or fine-tune AI systems, and shall flow this restriction down to any model or AI sub-provider. Called the "no-training-on-customer-data" restriction.', required: true },
      { title: 'AI change notification', text: 'Vendor shall notify Client at least 30 days before any material change to AI systems used in the services (model upgrades, replacement, decommission), with an assessment of impact on outputs and decisions.', required: false },
    ],
    discrepancies: [
      'ISO 42001 layers on ISO 27001 — Annex B covers AI-specific risk while inheriting info-sec controls; an auditor should not re-test 27001 items inside the AIMS scope.',
      'AI transparency (Annex B.11) and EU-AI-Act-style disclosure can exceed GDPR Art 13/14 — apply the stricter transparency to automated decisions and document the gap.',
      'Bias assessment (Annex B.14.2) is not required by SOC 2 or ISO 27001 — keep fairness evidence proportionate to high-impact or consumer-facing systems and record the scoping decision.',
    ],
  },
};

// Central policy areas → which frameworks + control references + the honest tension.
export const UNIFIED_POLICY_MAP = [
  {
    area: 'Access Management',
    map: { 'SOC 2': 'CC6.1–6.7', 'ISO 27001': 'A.8.1–8.5', 'PCI-DSS': 'Req 7 & 8', HIPAA: '164.312(a)', 'NIST CSF': 'PR.AA', CIS: 'Safeguard 6' },
    discrepancy: 'PCI/NIST/CIS demand MFA broadly; ISO treats it as risk-based (A.8.5). Reconcile by implementing MFA everywhere sensitive + privileged and documenting the risk decision for the rest.',
  },
  {
    area: 'Evidence & Audit Logs',
    map: { 'SOC 2': 'CC7.3', 'ISO 27001': 'A.8.15–8.16', 'PCI-DSS': 'Req 10', HIPAA: '164.312(b)', CIS: 'Safeguard 8' },
    discrepancy: 'Retention clocks differ — PCI 12 months/90-day online, HIPAA 6 years, GDPR minimization. Build one retention matrix: online 90d, archive 12mo, HIPAA-attested archive 6yr, minimize/mask the rest.',
  },
  {
    area: 'Encryption & Key Management',
    map: { 'SOC 2': 'CC6.7', 'ISO 27001': 'A.8.24–8.25', 'PCI-DSS': 'Req 3 & 4', HIPAA: '164.312(e) / 164.306(d)', 'NIST CSF': 'PR.DS', CIS: 'Safeguard 3' },
    discrepancy: 'PCI/GDPR-implementing crypto is effectively required; HIPAA is "addressable". Use PCI-grade crypto for cardholder flows; document HIPAA rationale for the rest. Watch crypto agility (post-quantum prep).',
  },
  {
     area: 'Incident Response & Notification',
     map: { 'SOC 2': 'CC7.2–7.4', 'ISO 27001': 'A.5.24–5.28', 'PCI-DSS': 'Req 12.10', HIPAA: '164.410', 'NIST CSF': 'RS', GDPR: 'Art 33–34', DPDPA: 'notice', 'CERT-In': '6-hour rule', 'FedRAMP': 'ConMon / SAR / POA&M', 'CJIS': 'Incident reporting to FBI' },
     discrepancy: 'Notification timelines conflict: CERT-In 6h, GDPR 72h, HIPAA ≤60d. Contract the most stringent and time-box internal triage to survive the tightest SLA. FedRAMP ConMon and CJIS FBI reporting add separate incident obligations.',
  },
  {
     area: 'Vendor / Third-Party & Sub-processors',
     map: { 'SOC 2': 'CC9.1–9.2', 'ISO 27001': 'A.5.19–5.21', 'PCI-DSS': 'Req 12.8', HIPAA: '164.504 (BAA)', 'NIST CSF': 'ID.SC', GDPR: 'Art 28', CIS: 'Safeguard 3', 'FedRAMP': 'FedRAMP-authorized CSP / sub-processors', 'CJIS': 'CJIS-compliant vendor; cleared personnel' },
     discrepancy: 'HIPAA needs BAA + downstream BAAs; GDPR needs Art 28 DPA + sub-processor list; PCI wants 12.8 evidence; SOC 2 wants carve-out monitoring; FedRAMP wants an authorized CSP chain; CJIS wants a CJIS-compliant vendor with cleared personnel. One vendor program with per-regulation addenda is the answer.',
  },
  {
    area: 'Data Retention & Destruction',
    map: { 'SOC 2': 'CC6/A1.3', 'ISO 27001': 'A.8.10', 'PCI-DSS': 'Req 3.1–3.2', HIPAA: '164.316(b)(2)', GDPR: 'Art 5(e)', DPDPA: 'purpose limitation' },
    discrepancy: 'GDPR minimization vs PCI 12-month logs vs HIPAA 6-year records is the classic conflict; a single retention schedule with masking/redaction bridges it.',
  },
  {
    area: 'Vulnerability & Patch Management',
    map: { 'ISO 27001': 'A.8.8', 'PCI-DSS': 'Req 6.3/11', CIS: 'Safeguard 7', 'NIST CSF': 'ID.RA / PR.IP' },
    discrepancy: 'CIS demands KEV-first patching with SLAs; PCI scans quarterly with retest on failure; ISO is risk-based. Use CIS schedules, evidence PCI scans, and map into ISO risk treatment.',
  },
  {
    area: 'Business Continuity & Recovery',
    map: { 'SOC 2': 'A1.1–A1.3', 'ISO 27001': 'A.5.29–5.30', HIPAA: '164.308(a)(7)', 'NIST CSF': 'RC', CIS: 'Safeguard 17' },
    discrepancy: 'SOC 2 only requires availability if asserted; HIPAA mandates a contingency plan & testing; NIST RC wants TTX. If you claim availability, adopt HIPAA/NIST rigor and test to RTOs.',
  },
  {
     area: 'Password & Authentication Policy',
     map: { 'ISO 27001': 'A.8.5', 'PCI-DSS': 'Req 8', 'NIST CSF': 'PR.AA', CIS: 'Safeguard 6', 'SOC 2': 'CC6.6' },
     discrepancy: 'NIST 800-63B and PCI v4 long ago removed forced periodic rotation; if your auditor still demands 90-day rotation, push back with the current standard text.',
   },
   {
     area: 'FedRAMP Authorization & CJIS Access',
     map: { 'FedRAMP': 'Low/Moderate/High baseline; SSP; SAP; POA&M; SAR; 3PAO; ATO', 'CJIS': 'CJI/SCJI classification; fingerprint background; US citizenship; audit logs; encryption; training' },
     discrepancy: 'FedRAMP focuses on cloud authorization and technical controls; CJIS focuses on personnel eligibility (US citizenship + cleared background) and access governance. A system serving federal agencies AND criminal justice data must satisfy both — the cleared-workforce requirement is unique to CJIS and cannot be substituted by a FedRAMP ATO.',
   },
{
      area: 'Control Environment — Assets, Endpoints & Boundary',
      map: { 'SOC 2': 'CC6.1/CC7.1/CC7.2', 'ISO 27001': 'A.5.15/A.8.1/A.8.2', 'PCI-DSS': 'Req 2/Req 9/Req 11', HIPAA: '164.310(a)(2)', 'NIST CSF': 'ID.AM', CIS: 'Safeguard 1/4/10', 'FedRAMP': 'SC/LM/IR baselines; CM-8; CM-11', 'CJIS': 'CJI device & access controls', 'CCPA/CPRA': 'inventory of PI' },
      discrepancy: 'SBOM, asset inventory, and endpoint security must be scoped per asset class — cloud (CSP-inherited), on-prem/physical servers (owned), purchased assets (vendor-managed), BYOD (personal), and databases (data-at-rest controls). Define the control objective and boundary for each; carve-out vs carve-in determines who evidences what.',
    },
    {
      area: 'BYOD / Corporate Endpoint Security — Device-Class Controls',
      map: {
        'CJIS': '5.6 — encryption, audit logging, access control on all CJI devices',
        'HIPAA': '164.312(a) — access control on all ePHI workstations',
        'PCI-DSS': '8.1/9.9 — physical + logical security on CDE endpoints',
        'FedRAMP': 'CM-8 (asset inventory), CM-11 (media protection), SC-7 (boundary protection)',
        'ISO 27001': 'A.8.1 (user endpoints), A.8.2 (privileged access), A.13.2 (network controls)',
        'NIST CSF': 'PR.AC-1, PR.AC-3, PR.DS-1, PR.IP-1, DE.CM-8',
        'CIS v8': 'Safeguard 1 (inventory), 4 (secure config), 10 (malware defenses), 12 (boundary defense)',
        'SOC 2': 'CC6.1 (logical access), CC6.6 (MFA), CC7.2 (monitoring)',
      },
      discrepancy: `Corporate devices get full EDR/MDM/encryption; BYOD cannot enforce these without MDM enrollment. 
      Regulatory mandates (CJIS, HIPAA, PCI, FedRAMP) require controls on ANY device touching sensitive data. 
      Reconcile via device-class segregation: Corporate (full agent stack) → BYOD (managed container/VDI/RBI only) → IoT/OT (network segmentation + passive monitoring) → Cloud virtual (agentless + runtime protection). 
      Document per-class control objectives, risk acceptances, and audit evidence packages.`,
    },
    {
      area: 'AI System Management',
      map: { 'ISO 42001': 'Clause 8 / Annex B.5–B.14', 'NIST AI RMF': 'GOV–MAP–MEAS–MAN', GDPR: 'Art 22 / DPIA', 'EU AI Act': 'risk tiers', 'SOC 2': 'as scoped or excluded' },
      discrepancy: 'Infosec frameworks treat AI as part of IT (SOC 2 CC modules, ISO 27001 Annex A); ISO 42001 adds AI-specific controls — bias (B.14.2), autonomy, model lifecycle (B.9), transparency (B.11). For AI-heavy delivery, build the AIMS and map AI controls into SOC 2/ISO scopes, not the reverse.',
    },
  ];

 // Cross-framework conflict "radar".
export const DISCREPANCY_MATRIX = [
  {
    topic: 'Audit / access log retention',
    conflict: 'PCI-DSS 10.5.1 (12 mo, 90-day online) vs GDPR 5(e) minimization vs HIPAA 164.316(b)(2) (6 yr) vs ISO A.8.15 (no clock).',
    reconcile: 'Single retention matrix: 90 days online, 12-month archive for PCI, extend to 6 years where HIPAA/ePHI is in scope, mask/redact the rest per GDPR. Document in a Schedule.',
  },
  {
    topic: 'Password rotation',
    conflict: 'Legacy auditor expectation of 90-day rotation vs NIST 800-63B & PCI v4.0 (no forced rotation; change only on compromise/risk).',
    reconcile: 'Cite current standard text, enforce length + blocklist + MFA, rotate privileged/emergency accounts, and refuse the legacy ask with the citation.',
  },
  {
    topic: 'MFA – how strong?',
    conflict: 'SOC 2 = "MFA when appropriate"; NIST/CIS = phishing-resistant MFA for privileged; PCI = MFA for remote/non-console admin.',
    reconcile: 'Floor = PCI/NIST for privileged + externally exposed; document the risk decision for the remainder.',
  },
  {
    topic: 'Encryption – required vs addressable',
    conflict: 'PCI/GDPR-effective = practically required; HIPAA = addressable; ISO = risk-based (A.8.24).',
    reconcile: 'Encrypt cardholder + high-risk personal data with current crypto; document HIPAA "addressable" rationale and residual risk for the rest.',
  },
  {
    topic: 'Incident notification windows',
    conflict: 'CERT-In 6h vs GDPR 72h vs HIPAA ≤60d vs PCI 12.10.1 (still "as soon as possible").',
    reconcile: 'Contract the most stringent; pre-build notification playbooks per regulator so a single incident triggers all wires in the tightest SLA.',
  },
  {
    topic: 'Business continuity scope',
    conflict: 'SOC 2 only when asserted; HIPAA mandates contingency + testing; NIST RC wants TTX; ISO A.5.30 wants ICT readiness.',
    reconcile: 'If you claim availability anywhere, adopt the stricter discipline: documented BCP, tested restoration to RTO/RPO, annual TTX.',
  },
  {
    topic: 'Vendor oversight model',
    conflict: 'SOC 2 carve-out vs inclusive; HIPAA BAA flow-down; GDPR sub-processor consent; PCI 12.8 evidence.',
    reconcile: 'One vendor program, three artifacts: security assessment (SOC/ISO), privacy addenda (BAA/DPA), and compliance evidence (PCI 12.8).',
  },
   {
     topic: 'Password storage & secrets',
     conflict: 'ISO A.8.5.4 (secrets cryptography) vs SSR/PCI (no hardcoded secrets); SOC 2 CC6.1 (credentials); CIS 16/5.',
     reconcile: 'Implement a vault + rotation of secrets across frameworks; a single capability evidences many controls.',
   },
   {
     topic: 'FedRAMP authorization vs CJIS access',
     conflict: 'FedRAMP authorizes the CSP + technical controls (ATO); CJIS requires US-citizen cleared personnel + fingerprint background checks for CJI access. FedRAMP does NOT satisfy CJIS personnel requirements, and CJIS does not grant a FedRAMP ATO.',
     reconcile: 'For systems serving both federal agencies and criminal justice data, maintain BOTH: the FedRAMP ATO/ConMon package AND CJIS-compliant cleared personnel with background checks. One does not substitute for the other.',
   },
    {
      topic: 'FedRAMP ConMon vs annual certification',
      conflict: 'SOC 2/ISO 27001 are point-in-time certifications; FedRAMP requires continuous monitoring (ConMon) and annual reassessment.',
      reconcile: 'Build ConMon as the continuous layer; the annual certification becomes a checkpoint within the ongoing ConMon program.',
    },
    {
      topic: 'SBOM & asset inventory',
      conflict: 'SOC 2/ISO 27001 want an asset inventory; FedRAMP mandates Software Bill of Materials (SBOM) for federal software; PCI wants an inventory of cardholder data assets; CJIS wants a CJI device inventory.',
      reconcile: 'Maintain one asset inventory (physical servers, on-prem databases, cloud services, purchased assets) with a machine-generated SBOM per component; tag each asset with its control objective and environment (cloud / on-prem / BYOD / purchased).',
    },
    {
      topic: 'Carve-out vs carve-in vendor assessment',
      conflict: 'SOC 2 "carve-out" excludes a subservice organization from the scope (client must assess complementary controls); "carve-in" includes it (vendor must provide evidence). FedRAMP inherits the CSP baseline but the customer configures; CJIS requires the vendor to be CJIS-compliant.',
      reconcile: 'For every vendor decide carve-out vs carve-in explicitly; document the complementary user entity controls (CUECs) for carve-out, or require the vendor evidence for carve-in. The choice drives who provides the evidence to the auditor.',
    },
    {
      topic: 'BYOD vs corporate endpoint security ⚡',
      conflict: `BYOD devices access CJI/PII/personal data on personal hardware; corporate endpoint security (EDR, MDM, disk encryption) is mandatory on corporate devices but cannot be enforced on personal devices without a mobile device management (MDM) profile. This creates a two-tier security model where sensitive data is accessible from uncontrolled endpoints.

      Regulatory pressure: CJIS 5.6 requires encryption + audit logging on all CJI-accessing devices; HIPAA 164.312(a) requires access controls on all ePHI-accessing workstations; PCI-DSS 8.1/9.9 requires physical + logical security on CDE-touching endpoints; FedRAMP CM-8/CM-11 requires asset inventory + media protection on all devices in the authorization boundary.`,
      reconcile: `Segregate by device class with explicit control objectives per class:

      **1. Corporate-Owned Assets (Purchased, On-Prem, Physical Servers, Corporate Laptops/Phones)**
      - Full EDR/XDR deployment (CrowdStrike, SentinelOne, Defender for Endpoint, Cortex XDR)
      - MDM/UEM enrollment (Intune, Jamf, Kandji, Workspace ONE) with compliance policies:
        * Disk encryption enforced (FileVault, BitLocker, LUKS) — escrow keys in KMS
        * OS version minimums + auto-patch (≤30 days for critical)
        * Application allow-list / block-list (no unauthorized software)
        * Certificate-based Wi-Fi/VPN auth (no PSK)
        * Remote lock/wipe capability
        * Hardware inventory sync (serial, TPM, BIOS version)
      - PAM agent for privileged session brokering (Teleport, Boundary, CyberArk)
      - Full audit logging (process execution, network connections, file access) → SIEM

      **2. BYOD / Personal Devices (Contractor, Partner, Employee-Owned)**
      - **Default: No direct access to sensitive data (CJI, PHI, PCI, PII, Federal)**
      - **Allowed paths:**
        a) **Managed Workspace Container** (Intune App Protection, Citrix Secure Workspace, VMware Workspace ONE UEM SDK, Island Enterprise Browser):
           - App-level encryption + DLP (copy/paste restriction, save-as blocking, screen capture prevention)
           - Conditional Access: device health attestation (SafetyNet/Play Integrity, Device Health Attestation)
           - Per-app VPN / ZTNA (Tailscale, Cloudflare Access, NetBird, Twingate)
           - Certificate-bound identity (mTLS client certs)
        b) **Virtual Desktop / DaaS** (Windows 365, Azure Virtual Desktop, AWS WorkSpaces, Citrix DaaS):
           - No data egress to local device (clipboard, printing, drive mapping disabled)
           - Session recording + keystroke logging
           - GPU-accelerated for dev/design workloads
        c) **Secure Browser Isolation** (Island, Talon, Menlo, Cloudflare Browser Isolation):
           - Remote browser execution, only pixels streamed
           - RBI + DLP policies for data exfiltration prevention
      - **If BYOD must access sensitive data directly** → treat as corporate: require full MDM enrollment + EDR + encryption + user consent + privacy notice (GDPR Art 13, CCPA 1798.100)

      **3. IoT / OT / Specialized Hardware (Badge readers, HVAC controllers, Medical devices, Manufacturing PLCs)**
      - Network segmentation (Purdue model / IEC 62443 zones)
      - Passive monitoring (Armis, Claroty, Nozomi) — no agent
      - Dedicated VLANs + firewall rules (deny by default)
      - Firmware integrity verification + vulnerability tracking (CISA KEV)

      **4. Cloud / Virtual Endpoints (EC2, VMs, Containers, Serverless)**
      - Agentless scanning (Wiz, Orca, Ermetic, Cloud-Native CSPM)
      - Runtime protection (Falco, Sysdig, Tetragon, Aqua)
      - Immutable images + SBOM + admission control (Kyverno, OPA/Gatekeeper)
      - No persistent SSH/RDP — SSM Session Manager, Azure Bastion, Teleport

      **Documentation Requirements (per device class):**
      - Asset inventory tag: device_class ∈ {corporate, BYOD_container, BYOD_vdi, BYOD_rbi, iot_ot, cloud_virtual}
      - Control objective matrix: which controls apply to which class (EDR, MDM, Encryption, DLP, Logging, Patch SLA)
      - Risk acceptance register: where BYOD direct access is permitted, document residual risk, compensating controls, and approval chain (CISO + Legal + Privacy)
      - Audit evidence package: MDM compliance reports, EDR coverage %, encryption verification logs, container policy exports, VDI session logs`,
    },
    {
      topic: 'On-prem / physical servers vs cloud',
      conflict: 'Cloud inherits baseline controls from the CSP (FedRAMP-authorized); on-prem/physical servers and on-prem databases are fully the customer\u2019s responsibility — physical access, environmental controls, disk encryption, and network segmentation are owned outright.',
      reconcile: 'Map the shared-responsibility matrix: cloud (CSP-inherited + customer-configured), on-prem/physical servers & databases (100% customer), purchased assets (vendor-supported). Define the control objective for each and evidence accordingly.',
    },
    {
      topic: 'AI oversight vs infosec scope',
      conflict: 'ISO 42001 Annex B (bias B.14.2, autonomy, model lifecycle B.9) vs SOC 2 / ISO 27001 which treat AI as generic IT vs NIST AI RMF vs GDPR Art 22/DPIA for automated decisions.',
      reconcile: 'Run AI risk separately from info-sec risk in an AIMS; keep bias/robustness evidence proportionate to high-impact or consumer-facing models; apply Art 22 rights (not just disclosure) where decisions are automated. A single AI registry with a per-system control matrix satisfies all of them.',
    },
  ];

// Vendor contract clause builder — base always applies; conditional per framework.
export const VENDOR_CLAUSE_BASE = [
  { title: 'Compliance obligations', text: 'Vendor represents that it complies with all applicable privacy, security and data-protection laws for the Services, and maintains a documented information security program (aligned to a recognised framework) covering people, process and technology.' },
  { title: 'Evidence & certificate maintenance', text: 'Vendor shall maintain its certifications/attestations (e.g. annual SOC 2 Type II, ISO 27001 with surveillance, PCI-DSS AOC, HITRUST certification) current at all times and provide them to Client on request and whenever issued.' },
  { title: 'Audit & assessment rights', text: 'Client (or an independent assessor on Client\u2019s behalf) may, on reasonable written notice (generally 30 days) and under NDA, perform a security/compliance assessment of the services or rely on the Vendor\u2019s most recent independent attestation in lieu.' },
  { title: 'Security incident response', text: 'Vendor shall maintain an incident response plan, notify Client promptly of any security incident affecting Client data (aligned to the most stringent applicable regulatory window), and provide a root-cause analysis and remediation plan without undue delay.' },
  { title: 'Retention & deletion', text: 'Vendor shall retain Client data only as long as required under the services or law, apply the documented retention schedule, and on termination securely delete or return all Client data and certify it in writing.' },
  { title: 'Sub-contracting & flow-down', text: 'Vendor shall flow down these obligations to all subcontractors and sub-processors used to deliver the Services, and shall remain responsible for their compliance.' },
  { title: 'Change notice', text: 'Vendor shall notify Client of any material change to its security posture, certifications, sub-processors, or data processing locations at least 30 days in advance where feasible.' },
  { title: 'Liability & indemnity', text: 'Vendor shall indemnify Client for losses caused by Vendor\u2019s breach of these security obligations or applicable law, subject to agreed liability caps; security events are carved out from the general cap where required.' },
   { title: 'Cyber insurance', text: 'Vendor shall maintain cyber liability insurance with limits of not less than [US$X] covering data breaches and notify carriers of the services.' },
   { title: 'SBOM, asset inventory & endpoint security', text: 'Vendor shall maintain a software bill of materials (SBOM) for all deliverables, a current asset inventory (including on-prem servers, physical servers, databases, cloud services, and purchased assets), and endpoint security (EDR/MDM/disk encryption) on all corporate devices accessing Client data. Carve-out vs carve-in vendor assessments shall be documented, with complementary user entity controls (CUECs) specified where carved out. BYOD devices shall be restricted to a managed container/VDI or blocked from sensitive data.' },
 ];

export const VENDOR_CLAUSE_CONDITIONAL = {
  soc2: { label: 'SOC 2', clause: 'Vendor shall provide its most recent SOC 2 Type II report (scoped to the services, including exceptions) annually and in response to any exception, and evidence that its applicable subservice organisations are monitored. Where availability/confidentiality are asserted, Vendor shall meet the stated SLA metrics.' },
  iso27001: { label: 'ISO 27001', clause: 'Vendor shall maintain ISO 27001 certification and complete annual surveillance audits, providing the certificate, scope statement and Statement of Applicability (on NDA) to Client annually or on request.' },
  pci: { label: 'PCI-DSS', clause: 'Where cardholder data is processed, Vendor shall maintain PCI-DSS compliance at its level, provide its current AOC/ROC summary and any compensating controls declaration, and support Client\u2019s obligations under PCI Req 12.8.' },
  hipaa: { label: 'HIPAA / BAA', clause: 'Where PHI is involved, the parties shall execute a Business Associate Agreement under 45 CFR 164.504 with downstream BAAs for all subcontractors, breach notification (≤60 days or as required by HHS), and return/destruction of PHI on termination.' },
  gdpr: { label: 'GDPR', clause: 'Where personal data of EU/EEA/UK data subjects is processed, the parties shall enter an Article 28 DPA covering instructions, confidentiality, assistance, audit rights, sub-processor authorisation, and applicable SCCs with a transfer impact assessment for any third-country transfers.' },
  dpdpa: { label: 'DPDPA (India)', clause: 'Where personal data of Indian data principals is processed, the parties shall observe DPDPA obligations: notice and consent records, purpose limitation, grievance redress, breach notification without delay, and compliance with CERT-In incident reporting timelines.' },
  nist: { label: 'NIST CSF', clause: 'Vendor shall maintain a cybersecurity programme aligned to NIST CSF 2.0 at a documented maturity tier and report posture metrics to Client annually.' },
  cis: { label: 'CIS Controls', clause: 'Vendor shall implement CIS Controls v8 at least to Implementation Group [1|2], enforce MFA on all externally exposed and privileged accounts, and remediate known-exploited vulnerabilities within 15 days.' },
   hitrust: { label: 'HITRUST', clause: 'If Vendor claims HITRUST certification, it shall maintain the applicable certification (e1/i1/r2), provide its certification report annually, and notify Client of any adverse QA outcome.' },
   fedramp: { label: 'FedRAMP', clause: 'Where the Services are FedRAMP-eligible or used by US federal agencies, Vendor shall maintain FedRAMP Authorization at the stated baseline (Low/Moderate/High) with a current ATO, provide the SAR and POA&M annually, and maintain the Continuous Monitoring strategy.' },
   cjis: { label: 'CJIS', clause: 'Where CJI is accessed or processed, Vendor shall maintain CJIS Security Policy compliance, ensure all CJI-accessing personnel are US citizens with current fingerprint-based background checks, maintain audit logs per CJIS retention, and encrypt CJI in transit and at rest.' },
 };

// General GRC response "battle card" — how to challenge any finding professionally.
export const GRC_RESPONSE_PLAYBOOK = [
  { title: 'Scope & attestation boundary', body: 'Confirm the finding sits inside the agreed scope/attestation boundary. If it is outside (out-of-scope asset, carved-out subservice, CUEC), request it be withdrawn with a scope note.' },
  { title: 'Cite the precise requirement', body: 'Ask for the exact control/clause (TSC criterion, Annex A control, PCI requirement + subrequirement, CFR citation). A vague finding often dissolves when pinned to text.' },
  { title: 'Design vs operating effectiveness', body: 'Argue the issue is evidence of operating effectiveness, not a control gap — show the control exists, meets its intent, and provide the operating evidence (logs, reviews, tests).' },
  { title: 'Compensating or equivalent controls', body: 'Where a control can\u2019t be implemented exactly, present documented compensating controls (PCI CSF, ISO A.8 equivalent) — equally effective, reviewed, and independently assessed.' },
  { title: 'Risk-based proportionality', body: 'For ISO/NIST/HIPAA-addressable items, rely on documented risk treatment: the risk decision, accepted residual risk, and a remediation owner/date. That is defensible, not evasion.' },
  { title: 'Evidence quality & timing', body: 'Challenge stale or mis-sampled evidence; request the auditor re-evaluate with the correct period, tooling, or sample. Precision on the period usually upgrades the result.' },
  { title: 'Prior remediation & CAP', body: 'Show corrective actions already in flight (with dates and evidence) and request the finding be categorised as OFI/CAP-in-progress rather than an NC.' },
  { title: 'Materiality & risk rating', body: 'Challenge the severity rating against the actual exposure. A low-risk, single-occurrence issue rarely warrants a "failed" classification; request the rating rationale in writing.' },
];

export const ASSISTANT_SUGGESTIONS = [
  'What policies tie to SOC 2 and its controls?',
  'Common audit observations in PCI-DSS',
  'How to push back on a password rotation finding',
  'Contract clauses when engaging a vendor',
  'Where do HIPAA and GDPR conflict?',
  'ISO 27001 vs NIST CSF overlaps',
  'What to include in a BAA with a subcontractor',
  'Audit log retention requirements across frameworks',
  'Vendor clause for cardholder data (PCI)',
  'How to respond to an access-review finding',
];