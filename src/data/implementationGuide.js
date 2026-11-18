// SOC 2, ISO 27001 and HIPAA implementation guide. Control IDs match the Unified Control Framework (/unified-framework),
// which already holds the framework mappings, owners and frequencies. This file adds how to build, evidence and test each control.
// Placeholders in square brackets are filled from the intake.

export const PARTS = [
  ['intake', 'Intake and scope'],
  ['mapping', 'Framework mapping'],
  ['controls', 'Control build sheet'],
  ['evidence', 'Evidence plan'],
  ['testing', 'Testing plan'],
  ['roadmap', '12-week roadmap'],
  ['remediation', 'Gap tracker'],
  ['deliverables', 'Deliverables'],
];

export const INTAKE = [
  ['Company name', '[COMPANY NAME]', 'Legal entity on the report or certificate'],
  ['Product or service', '[PRODUCT OR SERVICE]', 'Drives the system description and scope boundary'],
  ['Infrastructure', '[AWS / AZURE / GCP / OTHER]', 'Accounts, subscriptions or projects in scope'],
  ['Identity provider', '[OKTA / GOOGLE WORKSPACE / ENTRA ID / OTHER]', 'System of record for access controls'],
  ['Device management', '[MDM TOOL]', 'Endpoint encryption, screen lock, EDR enrolment'],
  ['Code repository', '[GITHUB / GITLAB / OTHER]', 'Change and SDLC evidence'],
  ['Ticketing', '[JIRA / LINEAR / OTHER]', 'Change, access, remediation and incident records'],
  ['Compliance deadline', '[DATE]', 'Work back from this to set the plan'],
  ['Audit or assessment type', '[SOC 2 TYPE I / TYPE II, ISO 27001, HIPAA READINESS]', 'Sets the testing depth and timeline'],
  ['Data types', '[CUSTOMER DATA, PHI, CONFIDENTIAL, OTHER]', 'PHI brings HIPAA Security Rule safeguards and BAAs'],
  ['In-scope teams', '[TEAMS]', 'Control owners and interviewees'],
  ['In-scope systems', '[SYSTEMS]', 'Population sources for testing'],
];

export const SCOPE = [
  ['In scope', 'Production application and APIs, production databases holding customer data or PHI, [INFRASTRUCTURE] production accounts, [IDP], [MDM TOOL], [CODE REPOSITORY], [TICKETING], logging and monitoring, backup systems, and the people who build, run or support them.'],
  ['Typical exclusions', 'Marketing website with no customer data, dev and sandbox environments without production data and with separate access, internal tools that never touch customer data or PHI. Each exclusion needs a written reason.'],
  ['Subservice organisations', 'Cloud provider and other critical vendors are carved out, with their complementary controls listed in the system description and their reports reviewed yearly.'],
  ['Assumptions to confirm', 'Production data is not copied to non-production; all staff use [IDP] SSO; all company devices are enrolled in [MDM TOOL]; PHI is only stored in named systems; BAAs are signed with every vendor that handles PHI.'],
  ['Scope sign-off', 'Scope document approved by [EXECUTIVE SPONSOR] in week 1 and re-confirmed before the audit.'],
];

// [UCF id, control, system of record, implementation steps, testing procedure, pass criteria, common failure modes]
export const CONTROLS = [
  ['GOV-01', 'Information security policy', 'Policy repository or GRC tool', 'Adopt the policy set, assign an owner per policy, approve by leadership, publish, collect acknowledgements', 'Inspect approval date and approver; sample 5 staff for acknowledgement', 'All policies approved within 12 months; acknowledgement for sampled staff', 'Approval missing or older than 12 months; new joiners never acknowledged'],
  ['GOV-02', 'Roles and responsibilities', 'RACI document, HR system', 'Name a security lead, control owners and a privacy or HIPAA security officer if PHI is in scope', 'Inspect RACI and appointment records', 'Every control has a named owner; HIPAA security official named when PHI is in scope', 'Owners listed as teams, not people; departed owners not replaced'],
  ['GOV-03', 'Management review', 'Meeting minutes', 'Schedule at least yearly; cover all ISO 9.3 inputs; record decisions and actions', 'Inspect minutes against the required inputs', 'All inputs covered; actions tracked', 'Held as a slide share with no decisions'],
  ['GOV-04', 'Internal audit', 'Audit programme and reports', 'Plan an independent audit of the ISMS before Stage 2; report findings; track corrective actions', 'Inspect programme, report and auditor independence', 'Full scope covered over the cycle; auditor independent', 'Auditor audits own work; no follow-up on findings'],
  ['RSK-01', 'Risk assessment', 'Risk register', 'Agree method and appetite; run workshop; score inherent and residual risk; include HIPAA risk analysis for PHI', 'Inspect register date, method and coverage of in-scope assets', 'Assessment within 12 months; PHI risks covered', 'Generic risks copied from a template; no ePHI risk analysis'],
  ['RSK-02', 'Risk treatment', 'Risk register, tickets', 'Assign treatment, owner and due date; get sign-off for accepted risks', 'Trace 3 risks to controls or tickets; check acceptance approvals', 'Every high risk has treatment or approved acceptance', 'Accepted risks with no approver'],
  ['HR-01', 'Background screening', 'HRIS, screening vendor', 'Screen before start within local law; record completion', 'Sample new hires from the HRIS joiner list', 'Completed before or within policy window of start date', 'Contractors skipped'],
  ['HR-02', 'Security and privacy awareness training', 'LMS', 'Assign training at onboarding and yearly; add HIPAA module for PHI handlers', 'Compare HRIS headcount to LMS completions; sample new hires', 'Completion within policy window for sampled staff', 'New joiners missed; HIPAA module missing'],
  ['HR-03', 'Confidentiality and acceptable use', 'HRIS, e-signature tool', 'NDA and acceptable use signed at onboarding', 'Sample new hires', 'Signed before access granted', 'Signed weeks after start'],
  ['IAM-01', 'Access provisioning', '[TICKETING], [IDP]', 'Access requested by ticket, approved by manager or system owner, granted by role', 'Sample new access grants; match ticket approval to grant date', 'Approval before grant for every sample', 'Access granted in chat with no ticket'],
  ['IAM-02', 'Timely deprovisioning', 'HRIS, [IDP]', 'HRIS termination triggers [IDP] deactivation; checklist for non-SSO apps', 'Sample leavers; compare termination date to deactivation timestamp', 'Removed within policy (for example same business day)', 'Non-SSO apps forgotten; contractors not in HRIS'],
  ['IAM-03', 'User access reviews', '[IDP], review tracker', 'Quarterly review of in-scope systems by system owners; removals ticketed', 'Inspect each quarter; reperform one; trace removals to tickets', 'Every quarter done; every flagged removal completed', 'Reviewer approves own access; removals not done'],
  ['IAM-04', 'Multi-factor authentication', '[IDP], cloud console', 'Enforce MFA in [IDP] and on cloud root or break-glass accounts', 'Export MFA status for all users; check enforcement policy', '100 percent of in-scope users enrolled; enforced, not optional', 'Service or legacy accounts exempt without record'],
  ['IAM-05', 'Password and authentication standard', '[IDP]', 'Set password, lockout and session timeout policy', 'Inspect configuration screenshots', 'Matches policy', 'Policy says one thing, configuration another'],
  ['AST-01', 'Asset inventory', 'Asset register, [MDM TOOL], cloud inventory', 'Build inventory of devices, cloud resources and SaaS; mark PHI systems', 'Compare MDM and cloud exports to the register', 'No unexplained differences', 'SaaS and cloud resources missing'],
  ['AST-02', 'Data classification and records of processing', 'Data map', 'Define classes; map where customer data and PHI live', 'Inspect data map; spot-check one system', 'All PHI systems identified', 'PHI in support tool not listed'],
  ['CRY-01', 'Encryption at rest and in transit', 'Cloud console, [MDM TOOL]', 'Enable storage and database encryption, TLS 1.2 or higher, disk encryption on devices', 'Inspect settings for each data store; MDM encryption report', 'All PHI and customer data stores encrypted; devices encrypted', 'One old bucket or backup unencrypted'],
  ['LOG-01', 'Security logging', 'Cloud audit logs, SIEM', 'Enable audit logs in every account; centralise; set retention', 'Inspect log settings per account and retention', 'All accounts logging; retention meets policy (note: HIPAA requires policies and documentation, not logs, to be kept 6 years)', 'Logging off in a new account'],
  ['LOG-02', 'Log review and alerting', 'SIEM, [TICKETING]', 'Define alerts; route to on-call; ticket investigations', 'Sample alerts and trace to tickets', 'Each sampled alert triaged within SLA', 'Alerts go to an unread mailbox'],
  ['VUL-01', 'Vulnerability scanning and patching', 'Scanner, [TICKETING]', 'Scan infrastructure, containers and dependencies; ticket by severity SLA', 'Sample findings; compare detection to closure dates', 'Closed within SLA or with approved exception', 'No SLA defined; findings not ticketed'],
  ['VUL-02', 'Penetration testing', 'Report, [TICKETING]', 'Independent test yearly; ticket findings; retest', 'Inspect report scope, date and retest', 'Within 12 months; criticals and highs retested', 'APIs out of scope; no retest'],
  ['CHG-01', 'Change control', '[CODE REPOSITORY], [TICKETING]', 'Branch protection, required approval, CI checks, ticket link, emergency procedure', 'Pull merged PRs for the period; sample for approval, CI and ticket', 'Every sample approved by someone other than the author', 'Admin bypass; self-approval'],
  ['DEV-01', 'Secure SDLC and code scanning', '[CODE REPOSITORY], CI', 'SAST, dependency and secret scanning in CI; secure coding training', 'Inspect CI config and sample results', 'Scans run on every merge; criticals blocked or ticketed', 'Scans run but results ignored'],
  ['NET-01', 'Network security and segmentation', 'Cloud console', 'Separate production; restrict inbound rules; no public admin ports', 'Inspect security groups and firewall rules', 'No open management ports; production separated', 'Old rule allowing 0.0.0.0/0 to SSH'],
  ['EPT-01', 'Endpoint protection', '[MDM TOOL], EDR', 'Enrol devices; deploy EDR; enforce screen lock and encryption', 'Compare HRIS and MDM to EDR coverage', 'All in-scope devices protected', 'Contractor laptops unmanaged'],
  ['IR-01', 'Incident response plan and testing', 'IR plan, tabletop report', 'Write plan with severities and roles; run a yearly tabletop', 'Inspect plan and tabletop report; review incident register', 'Tested within 12 months; actions tracked', 'Plan never tested'],
  ['IR-02', 'Breach notification', 'IR plan, decision log', 'Add HIPAA breach analysis (notify individuals without unreasonable delay, no later than 60 days) and customer contract terms', 'Inspect procedure and any decisions taken', 'Notification analysis documented for each incident', 'No four-factor risk assessment for PHI incidents'],
  ['BCP-01', 'Backup and restore testing', 'Backup tool, restore record', 'Automated backups of production data; quarterly restore test', 'Inspect backup config and restore test with timings', 'Restore succeeded within RTO and RPO', 'Backups never restored'],
  ['BCP-02', 'Business continuity and DR plan', 'BC/DR plan', 'BIA, RTO and RPO, contingency plan for PHI systems, yearly exercise', 'Inspect plan and exercise report', 'Tested within 12 months', 'Plan lists systems no longer used'],
  ['TPR-01', 'Vendor due diligence and contracts', 'Vendor register', 'Tier vendors; review SOC 2 or ISO evidence; sign DPA and BAA where PHI is shared', 'Sample new vendors; check review before use and contract terms', 'Every PHI vendor has a BAA; high-tier vendors reviewed before use', 'BAA missing for a vendor handling PHI'],
  ['TPR-02', 'Vendor monitoring', 'Vendor register', 'Yearly review of high-tier vendors; track report expiry', 'Sample high-tier vendors for current review', 'Reviewed within 12 months', 'Expired reports not chased'],
];

// [UCF id, evidence name, source, collection method, date range, reviewer or approver, quality standard, storage, frequency]
export const EVIDENCE = [
  ['GOV-01', 'Approved policy set and acknowledgements', 'Policy repository, HRIS', 'Export', 'Current version', 'Security lead', 'Shows approver, date and version', '[EVIDENCE REPOSITORY]/GOV-01', 'Yearly'],
  ['GOV-03', 'Management review minutes', 'Meeting minutes', 'Upload', 'Audit period', 'Executive sponsor', 'All inputs and decisions recorded', '[EVIDENCE REPOSITORY]/GOV-03', 'Yearly'],
  ['GOV-04', 'Internal audit report', 'Auditor', 'Upload', 'Current cycle', 'Security lead', 'Scope, findings, independence stated', '[EVIDENCE REPOSITORY]/GOV-04', 'Yearly'],
  ['RSK-01', 'Risk register and HIPAA risk analysis', 'Risk register', 'Export', 'Within 12 months', 'Risk owners, Security lead', 'Inherent and residual scores, owners, dates', '[EVIDENCE REPOSITORY]/RSK-01', 'Yearly and quarterly review'],
  ['HR-02', 'Training completion report', 'LMS', 'Automated export', 'Audit period', 'GRC', 'Name, module, completion date, matched to HRIS', '[EVIDENCE REPOSITORY]/HR-02', 'Monthly'],
  ['IAM-01', 'Access request tickets', '[TICKETING]', 'Query export', 'Audit period', 'GRC', 'Approval timestamp before grant', '[EVIDENCE REPOSITORY]/IAM-01', 'Per sample'],
  ['IAM-02', 'Leaver list matched to deactivation', 'HRIS, [IDP]', 'Automated export and match', 'Audit period', 'GRC', 'Termination and removal timestamps side by side', '[EVIDENCE REPOSITORY]/IAM-02', 'Monthly'],
  ['IAM-03', 'Quarterly access review records', '[IDP], review tracker', 'Export plus signed review', 'Each quarter', 'System owners', 'Reviewer, date, decisions, removal tickets', '[EVIDENCE REPOSITORY]/IAM-03', 'Quarterly'],
  ['IAM-04', 'MFA enrolment and enforcement', '[IDP]', 'Automated export', 'Point in time and periodic', 'GRC', 'All users listed with factor; policy screenshot with date', '[EVIDENCE REPOSITORY]/IAM-04', 'Monthly'],
  ['CRY-01', 'Encryption settings', 'Cloud console, [MDM TOOL]', 'Screenshot or API export', 'Point in time', 'Engineering lead', 'Resource name, setting, date visible', '[EVIDENCE REPOSITORY]/CRY-01', 'Quarterly'],
  ['LOG-01', 'Audit log configuration', 'Cloud console', 'API export', 'Point in time', 'Engineering lead', 'Every account listed', '[EVIDENCE REPOSITORY]/LOG-01', 'Quarterly'],
  ['LOG-02', 'Alert investigation tickets', 'SIEM, [TICKETING]', 'Query export', 'Audit period', 'Security lead', 'Alert, triage notes, closure date', '[EVIDENCE REPOSITORY]/LOG-02', 'Per sample'],
  ['VUL-01', 'Scan reports and remediation tickets', 'Scanner, [TICKETING]', 'Automated export', 'Audit period', 'Security lead', 'Detection and closure dates with severity', '[EVIDENCE REPOSITORY]/VUL-01', 'Monthly'],
  ['VUL-02', 'Pen test report and retest letter', 'Testing firm', 'Upload', 'Within 12 months', 'Security lead', 'Scope, dates, findings, retest results', '[EVIDENCE REPOSITORY]/VUL-02', 'Yearly'],
  ['CHG-01', 'Merged PR list with approvals and CI', '[CODE REPOSITORY]', 'API export', 'Audit period', 'GRC', 'Author, approver, CI status, ticket link per PR', '[EVIDENCE REPOSITORY]/CHG-01', 'Monthly'],
  ['EPT-01', 'MDM and EDR coverage report', '[MDM TOOL], EDR', 'Automated export', 'Point in time and periodic', 'IT', 'Matched to HRIS headcount', '[EVIDENCE REPOSITORY]/EPT-01', 'Monthly'],
  ['IR-01', 'Tabletop report and incident register', 'IR records', 'Upload', 'Within 12 months', 'Security lead', 'Scenario, attendees, gaps, actions', '[EVIDENCE REPOSITORY]/IR-01', 'Yearly'],
  ['BCP-01', 'Restore test record', 'Backup tool', 'Upload with logs', 'Each quarter', 'Engineering lead', 'Start and end time compared to RTO and RPO', '[EVIDENCE REPOSITORY]/BCP-01', 'Quarterly'],
  ['TPR-01', 'Vendor register with reviews, DPAs and BAAs', 'Vendor register', 'Export', 'Audit period', 'GRC, Legal', 'Tier, review date, contract status', '[EVIDENCE REPOSITORY]/TPR-01', 'Quarterly'],
];

export const TESTING = [
  ['Design test', 'Does the control, as written and configured, address the risk? Walk through with the owner and inspect one instance.', 'Type I, ISO Stage 1 and the first readiness pass'],
  ['Operating effectiveness test', 'Did the control work every time over the period? Test samples from the full population.', 'Type II, ISO Stage 2, HIPAA evidence of ongoing compliance'],
  ['Population requirements', 'Complete list from the system of record for the exact period, with the query or export used. Check completeness by comparing counts to a second source.', 'All recurring controls'],
  ['Sampling', 'Use the sample size reference: for example 1 for annual, 2 for quarterly, 2 to 5 for monthly, and around 25 for daily or many-per-day controls. Pick randomly and record the method.', 'Operating effectiveness'],
  ['Exception handling', 'Record what failed, the cause, the impact and whether it is a one-off or systemic. Agree with the owner, add to the gap tracker.', 'Any failed sample'],
  ['Retesting', 'After the fix, test new samples from after the fix date. Past exceptions stay in the period.', 'All remediated gaps'],
  ['Readiness scoring', 'Per control: 2 = designed and evidenced, 1 = designed, evidence partial, 0 = not in place. Readiness % = total score divided by (2 x number of controls). Target 90 percent or more with no zero on a key control before booking the audit.', 'Weekly in weeks 9 to 12'],
];

// [weeks, focus, key tasks, owner, output]
export const ROADMAP = [
  ['Week 1', 'Discovery and scope', 'Complete intake, interview owners, list systems and data flows, confirm PHI locations, draft scope and exclusions, pick the auditor', 'GRC lead', 'Signed scope, system list, stakeholder list'],
  ['Weeks 2 to 3', 'Policy and control design', 'Adopt the policy set, select controls from the Unified Control Framework, assign owners, write procedures, run the risk assessment and HIPAA risk analysis', 'GRC lead with owners', 'Approved policies, control matrix, risk register'],
  ['Weeks 4 to 6', 'Technical implementation', 'SSO and MFA, branch protection and CI checks, logging, encryption, MDM and EDR rollout, backup and restore test, vendor BAAs and DPAs', 'Engineering, IT', 'Configured controls with first evidence'],
  ['Weeks 7 to 8', 'Evidence collection', 'Set up automated pulls, collect first-cycle evidence, run first access review, tabletop and training campaign', 'GRC analyst', 'Evidence library mapped to control IDs'],
  ['Weeks 9 to 10', 'Control testing', 'Design and operating tests, populations and samples, log exceptions, readiness scoring', 'GRC analyst, reviewed by lead', 'Testing workbook and readiness score'],
  ['Weeks 11 to 12', 'Remediation and readiness review', 'Close gaps, retest, final readiness review with sponsor, prepare auditor request list responses, confirm audit dates', 'GRC lead', 'Gap tracker closed or accepted, go or no-go decision'],
];

export const GAP_COLUMNS = ['Gap ID', 'UCF ID', 'Description', 'Severity', 'Owner', 'Due date', 'Remediation plan', 'Closure evidence', 'Retest procedure', 'Status'];
export const GAP_EXAMPLES = [
  ['GAP-001', 'IAM-02', '3 of 10 leavers kept [IDP] access for more than 2 days', 'High', '[IT LEAD]', '[DATE]', 'Connect HRIS to [IDP] for automatic deactivation; add non-SSO checklist', 'Integration screenshot, next month\'s leaver report', 'Sample all leavers after go-live date', 'Open'],
  ['GAP-002', 'TPR-01', 'No BAA with the support platform that stores PHI', 'Critical', '[LEGAL]', '[DATE]', 'Sign BAA or stop sending PHI to the tool', 'Signed BAA', 'Inspect signed BAA and vendor register entry', 'Open'],
  ['GAP-003', 'BCP-01', 'Backups never restored', 'Medium', '[ENGINEERING LEAD]', '[DATE]', 'Run restore test, record timings, schedule quarterly', 'Restore record', 'Inspect next quarterly restore', 'Open'],
];
export const SEVERITY = [
  ['Critical', 'PHI or customer data exposed, or a key control missing entirely', 'Fix before audit; leadership updated weekly'],
  ['High', 'Key control fails often or for a whole system', 'Within 30 days'],
  ['Medium', 'Control works but evidence or timing is weak', 'Within 60 days'],
  ['Low', 'Documentation or minor process gap', 'Within 90 days'],
];

// [deliverable, where it lives on OneLens]
export const DELIVERABLES = [
  ['Control matrix', 'Unified Control Framework page (export to Excel) plus the control build sheet above', '/unified-framework'],
  ['Evidence request list', 'Auditor Request List topic and the Audit Evidence Checklist', '/knowledge?topic=auditor-requests'],
  ['Testing workbook', 'Templates: Risk and Control Matrix, ITGC Test Workpaper, Sample Size Reference', '/templates'],
  ['Policy list', 'Policy Register template and the policy set in Templates', '/templates'],
  ['Risk register structure', 'Risk Assessment section with the sample register and downloads', '/#risk-assessment'],
  ['Vendor review tracker', 'Vendor Security Review template and the Vendor Risk section', '/#vendor-risk'],
  ['Access review tracker', 'User Access Review Plan and Record templates, Access Governance section', '/#access-governance'],
  ['Audit readiness checklist', 'Audit Readiness Plan topic and the readiness scoring above', '/knowledge?topic=audit-readiness'],
];
