// Audit evidence checklist across SOC 2, ISO/IEC 27001, HIPAA and GDPR, plus a typical readiness
// engagement plan and RACI. Generalised from real readiness engagements; no client details.
// Applicability: 'R' = usually required, 'O' = optional or depends on scope, '' = not usually tested.

export const AEC_INTRO = 'What auditors usually ask for, grouped by control area, and which frameworks expect it. Use it as a gap analysis starting point: mark each item as in place, in progress or not applicable, and collect the evidence before fieldwork. Applicability is typical, not absolute; your scope, Trust Services Criteria and Statement of Applicability decide the final list.';

export const AEC_FRAMEWORKS = ['SOC 2', 'ISO 27001', 'HIPAA', 'GDPR'];

// [area, control, evidence auditors usually accept, SOC 2, ISO 27001, HIPAA, GDPR]
export const AEC_ITEMS = [
  // Governance
  ['Governance', 'Board or leadership oversight of security', 'Board or leadership charter, member CVs, recent minutes and agenda showing security topics.', 'R', 'R', 'O', ''],
  ['Governance', 'Organisation chart and security roles', 'Current org chart; job descriptions for key security roles; named security and privacy officers.', 'R', 'R', 'R', 'R'],
  ['Governance', 'Approved security policy set', 'Approved policies (information security, access, asset, cryptography, operations, secure development, third party, incident response, business continuity, HR security, physical, risk management) with version history.', 'R', 'R', 'R', 'R'],
  ['Governance', 'Policies available to and accepted by staff', 'Policy portal or acknowledgement records for all in-scope staff.', 'R', 'R', 'R', 'O'],
  ['Governance', 'Code of conduct and whistleblower channel', 'Approved code of conduct with acknowledgements; an anonymous reporting channel.', 'R', 'O', 'O', ''],
  ['Governance', 'ISMS core documents', 'ISMS scope, Statement of Applicability, legal and contractual requirements register, objectives, roles, document control, communication plan.', '', 'R', '', ''],
  ['Governance', 'Internal audit, management review and corrective action', 'Internal audit report, management review minutes and inputs, nonconformity and corrective action log.', 'O', 'R', 'O', ''],
  ['Governance', 'System description', 'Description of the system covering services, boundaries, infrastructure, people, data and complementary user entity controls.', 'R', '', '', ''],
  ['Governance', 'Audit cycle defined', 'Calendar of internal and external assessments with past and planned dates.', 'O', 'R', 'O', ''],

  // Risk
  ['Risk', 'Annual risk assessment', 'Approved risk assessment with scenarios, scoring, owners and treatment, repeated at least annually and for major changes.', 'R', 'R', 'R', 'O'],
  ['Risk', 'Project and change risk assessment', 'Risk assessment for significant new projects or technologies.', '', 'R', 'O', 'O'],
  ['Risk', 'Cyber insurance', 'Current cyber insurance policy, where the business holds one.', 'O', 'O', '', ''],

  // People
  ['People', 'Background checks', 'Completed checks for staff hired in the period, as allowed by local law.', 'R', 'R', 'R', ''],
  ['People', 'Competence and performance', 'Hiring evaluation records and completed periodic performance reviews.', 'R', 'R', 'O', ''],
  ['People', 'Employment and contractor agreements', 'Signed employee and contractor agreements with confidentiality and security clauses; NDA templates.', 'R', 'R', 'R', 'O'],
  ['People', 'Security and privacy awareness training', 'Training content and completion records for all in-scope staff, including role-specific training (secure coding, HIPAA, GDPR).', 'R', 'R', 'R', 'R'],
  ['People', 'Offboarding', 'Termination checklist, asset return records and account removal within the agreed time.', 'R', 'R', 'R', 'R'],

  // Access
  ['Access', 'Access requests and approvals', 'Tickets or approvals for a sample of new and changed access, approved before the grant.', 'R', 'R', 'R', 'R'],
  ['Access', 'Periodic access reviews', 'Completed reviews for in-scope systems, with the removals that followed.', 'R', 'R', 'R', 'R'],
  ['Access', 'Privileged access', 'Privileged user lists; unique admin accounts tied to individuals; admin actions logged.', 'R', 'R', 'R', 'O'],
  ['Access', 'Strong authentication', 'MFA enforced on identity provider, cloud, code repository and key SaaS; password policy settings.', 'R', 'R', 'R', 'R'],
  ['Access', 'Application security settings', 'Session timeout and failed-login or access-denied logging in the product.', 'R', 'R', 'R', ''],
  ['Access', 'Accounts linked to people', 'Every account in each system maps to a current employee or approved service account.', 'R', 'R', 'R', 'O'],

  // Engineering and change
  ['Engineering', 'Change management procedure', 'Documented procedure; sample of changes showing request, test, peer review and approval before deployment.', 'R', 'R', 'R', 'O'],
  ['Engineering', 'Author is not the reviewer', 'Branch protection requiring review by someone other than the author, also enforced for administrators.', 'R', 'R', 'R', 'O'],
  ['Engineering', 'CI/CD and automated checks', 'CI/CD dashboard showing builds, tests and deployments; private repositories.', 'R', 'R', 'R', 'O'],
  ['Engineering', 'QA and acceptance testing', 'QA process documentation and test or acceptance records for releases.', 'O', 'R', '', ''],
  ['Engineering', 'Secure development', 'Secure engineering principles, secure configuration baselines, security testing in the pipeline.', 'O', 'R', 'O', 'O'],
  ['Engineering', 'Separate environments and test data', 'Separate development, test and production; no production data in test, or masked data where needed.', 'O', 'R', 'O', 'R'],
  ['Engineering', 'Outsourced development', 'Contract with security requirements and oversight of outsourced developers.', '', 'R', 'O', ''],

  // Vulnerabilities
  ['Vulnerabilities', 'Vulnerability scanning and fix times', 'Scanner reports and a sample of vulnerabilities fixed within severity-based timelines.', 'R', 'R', 'R', 'R'],
  ['Vulnerabilities', 'Penetration testing', 'Annual penetration test report and evidence that findings were fixed.', 'R', 'R', 'R', 'O'],
  ['Vulnerabilities', 'Threat intelligence', 'Sources used to track new threats and how they feed into prioritisation.', 'O', 'R', 'O', ''],
  ['Vulnerabilities', 'Malware protection', 'Anti-malware or EDR deployed and configured on endpoints and servers.', 'R', 'R', 'R', 'O'],

  // Operations
  ['Operations', 'Logging, monitoring and alerting', 'Logging enabled on in-scope systems, alert rules, and examples of alerts handled; log retention settings.', 'R', 'R', 'R', 'O'],
  ['Operations', 'Intrusion detection', 'IDS or cloud threat detection enabled, with alerts reviewed.', 'R', 'R', 'R', 'R'],
  ['Operations', 'Capacity and availability', 'Capacity dashboards, scale-up tickets, autoscaling or redundancy where needed.', 'O', 'R', 'O', ''],
  ['Operations', 'Backups and restore testing', 'Backup configuration for every in-scope data store and a recent restore test.', 'R', 'R', 'R', 'O'],
  ['Operations', 'Network security', 'Network diagram, segregation between environments, annual firewall rule review.', 'R', 'R', 'R', 'R'],
  ['Operations', 'Encryption', 'Encryption at rest for databases and storage; TLS in transit with valid certificates and strong ciphers; removable media encrypted or blocked.', 'R', 'R', 'R', 'R'],
  ['Operations', 'Asset inventory and disposal', 'Inventory with owners and descriptions, flagging assets holding user data; records of secure media and device disposal.', 'R', 'R', 'R', 'R'],
  ['Operations', 'Endpoint and web controls', 'Installed software monitored; web filtering where required.', 'O', 'R', 'O', ''],
  ['Operations', 'Physical security', 'Office access controls and visitor logs, or reliance on the cloud provider\'s certifications.', 'O', 'R', 'R', ''],

  // Incidents and continuity
  ['Incidents', 'Incident response plan and test', 'Approved plan (with HIPAA and GDPR breach addenda where relevant) and a tabletop exercise record.', 'R', 'R', 'R', 'R'],
  ['Incidents', 'Incident and breach records', 'Incident log, root cause analyses and breach notifications for the period, if any.', 'R', 'R', 'R', 'R'],
  ['Incidents', 'Business continuity and disaster recovery', 'Approved BC/DR plan and a DR tabletop or recovery test.', 'R', 'R', 'R', 'R'],

  // Third parties
  ['Third parties', 'Vendor inventory and risk tiers', 'Vendor list with owners, data access and assigned risk levels.', 'R', 'R', 'R', 'R'],
  ['Third parties', 'Vendor security reviews', 'Assessments or SOC 2 and ISO reports reviewed for higher-risk vendors, including the cloud provider.', 'R', 'R', 'R', 'O'],
  ['Third parties', 'Vendor contracts', 'Signed agreements with security terms; cloud provider agreement; DPAs with processors; BAAs with business associates.', 'R', 'R', 'R', 'R'],

  // Customers and communication
  ['Customers', 'Customer-facing commitments', 'MSA template, public terms of service, security page, status page, release notes and a support channel.', 'R', 'O', 'O', 'O'],
  ['Customers', 'Internal communication of changes', 'How system updates are communicated to internal teams.', 'R', 'O', 'O', ''],

  // Privacy
  ['Privacy', 'Privacy notices and cookies', 'Public privacy policy, internal privacy policy, cookie policy and a consent manager where required.', 'O', 'O', '', 'R'],
  ['Privacy', 'Data inventory and records of processing', 'Data map of personal data, purposes, systems and recipients.', 'O', 'R', 'O', 'R'],
  ['Privacy', 'DPIA', 'Approved data protection impact assessments for high-risk processing.', '', 'O', '', 'R'],
  ['Privacy', 'Retention, deletion and pseudonymisation', 'Retention schedule with automatic deletion, customer deletion records, pseudonymisation where used.', 'O', 'R', 'O', 'R'],
  ['Privacy', 'Customer DPAs and sub-processors', 'DPAs with customers and a plan for notifying them of sub-processor changes.', '', '', '', 'R'],
  ['Privacy', 'EU representative, DPO and supervisory authority', 'Appointed EU representative and DPO where required; lead supervisory authority identified.', '', '', '', 'R'],
  ['Privacy', 'International transfers', 'Transfer mechanism in place, for example EU-US Data Privacy Framework certification with annual reverification, a named contact and an independent dispute resolution body, or standard contractual clauses.', '', '', '', 'R'],
  ['Privacy', 'HIPAA-specific', 'HIPAA compliance and workstation security policies, an active security officer, annual HIPAA risk review and signed BAAs.', '', '', 'R', ''],
];

// Typical readiness engagement plan. [phase, workstream, key tasks, client role, advisor role]
export const AEC_PLAN_INTRO = 'A typical readiness engagement from kickoff to the first audit report and beyond. Durations depend on company size and how much already exists; a focused startup usually takes 8 to 16 weeks to reach audit readiness.';
export const AEC_PLAN = [
  ['Pre-audit', 'Kickoff and access', 'Kickoff meeting, shared channel, admin access to the compliance platform, project plan agreed.', 'Grant access, name a point of contact.', 'Run kickoff, draft plan and timeline.'],
  ['Pre-audit', 'Auditor selection', 'Confirm whether an auditor is needed and introduce suitable firms.', 'Choose and contract the auditor.', 'Shortlist and introduce auditors.'],
  ['Pre-audit', 'Platform setup', 'Platform training, connect cloud, identity, code and HR tools, define in-scope people and assign training.', 'Connect tools, confirm in-scope staff.', 'Train, check integrations, set up groups.'],
  ['Pre-audit', 'Policies', 'Draft, review, approve and publish policies; assign for staff acceptance.', 'Review and approve, drive acceptance.', 'Draft and upload policies.'],
  ['Pre-audit', 'Risk assessment', 'Draft risk scenarios, approve them, run the assessment and record treatment.', 'Approve scenarios and risk decisions.', 'Draft scenarios and run the assessment.'],
  ['Pre-audit', 'Vendor risk', 'Vendor list with inherent risk, assessments, authentication improvements for key vendors.', 'Provide vendor list and fix vendor gaps.', 'Assess vendors and finalise ratings.'],
  ['Pre-audit', 'Documentation', 'System description (SOC 2) or Statement of Applicability (ISO 27001), scope inclusions and exclusions.', 'Review and approve scope and documents.', 'Draft the documents.'],
  ['Pre-audit', 'Penetration test and trust centre', 'Schedule and run the penetration test, fix findings, configure the public trust centre.', 'Provide test window, fix findings.', 'Schedule test, configure trust centre.'],
  ['Pre-audit', 'Gap analysis and remediation', 'Gap analysis against the evidence checklist, review call, remediate open items, templates for evidence.', 'Remediate engineering and HR gaps, upload evidence.', 'Build gap analysis, provide templates, track closure.'],
  ['Pre-audit', 'Tabletop exercises', 'Incident response and disaster recovery tabletop with engineering present, recorded as evidence.', 'Attend and act on lessons.', 'Design and facilitate the exercise.'],
  ['Pre-audit', 'Internal audit (ISO 27001)', 'Independent internal audit and management review before certification.', 'Provide evidence, hold management review.', 'Schedule or perform the internal audit.'],
  ['Audit', 'Kickoff and fieldwork', 'Auditor kickoff, evidence request list, evidence delivery, walkthroughs and follow-up queries.', 'Answer auditor questions, supply evidence.', 'Lead audit management and defence.'],
  ['Post-audit', 'Close and continue', 'Post-audit review, next observation period, regular compliance reviews, continuous monitoring of failing controls.', 'Keep controls operating, fix alerts.', 'Monitor, plan the next cycle.'],
];

export const AEC_RACI_NOTE = 'Roles follow RACI: Responsible does the work, Accountable signs it off, Consulted gives input, Informed is kept updated. In most engagements the client is accountable for approving policies, risk decisions and scope, and responsible for engineering and HR fixes; the advisor is responsible for drafting, templates, tracking and audit coordination.';
