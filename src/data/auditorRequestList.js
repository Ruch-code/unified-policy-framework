// SOC 2 Type 2 auditor request list: what auditors ask for, how to respond, and the follow-ups to expect.
// Generalised from a real evidence request list. No client, auditor, people, product names or dates.

export const ARL_INTRO = 'At the start of fieldwork the auditor sends a request list: one line per control, saying what evidence they need. This is a generalised version of a real SOC 2 Type 2 list, with how to respond to each request, an example of evidence that works, and the follow-up questions auditors actually came back with. Near-identical requests are merged into one row.';

export const ARL_TYPES = ['Policy', 'Configuration', 'Population and sample', 'Report or record'];

// [type, what it means, how to respond well]
export const ARL_TYPE_GUIDE = [
  ['Policy', 'A copy of an approved policy or procedure.', 'Send the approved version and name the section that covers the control. A requirement can live inside a broader policy; say which one.'],
  ['Configuration', 'A screenshot or export of a system setting.', 'Capture the setting from the live system with the system name, date and time visible. Old screenshots are rejected.'],
  ['Population and sample', 'The full list of events in the audit period (new hires, leavers, changes, incidents), from which the auditor picks samples.', 'Export the list from the source system and show how it was generated (the query or filter and the record count). Then give the requested evidence for each sampled item.'],
  ['Report or record', 'A dated record that an activity happened: a review, a test, a scan, a meeting.', 'Provide the record with its date, who did it and the outcome, plus tickets for any actions that followed.'],
];

// [area, control tested, what the auditor asked for, evidence type, how to respond with an example, follow-up to expect]
export const ARL_ITEMS = [
  // Assets and data
  ['Assets and data', 'Media holding confidential data is destroyed securely', 'Media destruction policy; the population of media destroyed in the period and how the list was generated; a destruction record for each sample.', 'Population and sample', 'Export the disposal log from the asset register and screenshot the filter used. Example: a certificate of destruction from the recycler for each sampled laptop. If nothing was destroyed, say so in writing and show the empty filtered list.', 'None if the list and certificates match.'],
  ['Assets and data', 'Data retention and disposal procedures exist', 'Copy of the retention and disposal policy.', 'Policy', 'Point to the approved policy. Example: "Covered in the Data Management Policy, retention and disposal section."', 'Rare.'],
  ['Assets and data', 'Inventory of production assets is maintained', 'Copy of the production asset inventory.', 'Report or record', 'Export the inventory from the cloud account or compliance platform with the export date, showing owners.', 'Assets without an owner or description.'],
  ['Assets and data', 'Customer data is removed when customers leave', 'Population of customers who left in the period; proof of data removal for each sample.', 'Population and sample', 'Export churned customers from the CRM or billing system. Example: the deletion ticket plus a query result showing no remaining records for that customer. If no customers left, give a written "no occurrences" statement with the empty list.', 'How the list was generated.'],
  ['Assets and data', 'Data classification policy exists', 'Copy of the data classification policy.', 'Policy', 'Cite the section if classification sits inside a wider data policy.', 'Rare.'],
  ['Assets and data', 'Data stores are encrypted at rest', 'Screenshots of production data store encryption settings.', 'Configuration', 'Example: the database and storage configuration pages showing encryption enabled and the key used, with system date and time.', 'Any data store left out of the screenshots.'],

  // Continuity
  ['Continuity', 'Business continuity and disaster recovery plans exist', 'Copies of the plans, including communication plans.', 'Policy', 'Send the approved plan. If backup requirements are part of it, say so, because auditors often ask for a backup policy separately.', 'Rare.'],
  ['Continuity', 'The plan is tested at least annually', 'The plan and the most recent test.', 'Report or record', 'Example: a tabletop exercise report with date, attendees, scenario, findings and actions. See the Tabletop Exercise topic for a template.', 'A test older than twelve months.'],
  ['Continuity', 'Cyber insurance is maintained', 'The policy covering the whole audit period.', 'Report or record', 'Example: the declarations page showing the coverage dates. If the policy renewed mid-period, send both.', 'Coverage dates that do not span the period.'],

  // Change management
  ['Change management', 'Configuration management procedure exists', 'Copy of the procedure.', 'Policy', 'Cite the section of the operations or change policy that covers it.', 'Rare.'],
  ['Change management', 'Changes are authorised, tested, reviewed and approved before release', 'Population of code changes in the period and how it was generated; change details for each sample.', 'Population and sample', 'Export merged pull requests from the code repository for the period and screenshot the query and count. Example per sample: the pull request showing a different reviewer approved it, checks passed and the linked ticket.', 'Changes merged without review, or approved by the author.'],
  ['Change management', 'Only authorised people can deploy to production', 'System-generated list of users who can migrate changes to production.', 'Configuration', 'Example: repository permission list plus branch protection settings for the main branch.', 'Seen in practice: branch protection settings were missing from the first submission.'],
  ['Change management', 'A development lifecycle methodology exists', 'Copy of the SDLC policy.', 'Policy', 'Point to the secure development policy.', 'Rare.'],
  ['Change management', 'System changes are communicated internally', 'Population of changes communicated in the period; the communication for each sample.', 'Population and sample', 'Example: release notes posted in the team channel or sent by email, one per sampled release.', 'No record of the communication.'],
  ['Change management', 'Customers are told about critical changes', 'Population of critical changes; the customer notification for each sample.', 'Population and sample', 'Example: the customer email or changelog entry. If there were none, give a written "no occurrences" statement.', 'What counts as critical; define it in policy.'],

  // Access and authentication
  ['Access', 'Production systems require unique, secure authentication', 'Screenshots of authentication settings for production data stores, the production network and in-scope applications.', 'Configuration', 'Example: the cloud user list showing named individual accounts, database authentication settings and SSH key listings, each with system date and time.', 'Seen in practice: SSH key settings were missing and had to be added.'],
  ['Access', 'Privileged access to encryption keys and databases is restricted', 'System-generated lists of users with privileged access.', 'Configuration', 'Example: the key management policy and the list of cloud administrators, exported from the system rather than typed up.', 'Seen in practice: the administrator list was missing.'],
  ['Access', 'Passwords follow company policy', 'Password policy and screenshots of password settings on in-scope systems.', 'Configuration', 'The policy can sit inside the access control policy. Example: the cloud account password settings page showing length, complexity and rotation.', 'Seen in practice: the policy was accepted, but the settings screenshot was missing.'],
  ['Access', 'Remote access to production requires MFA', 'Screenshots of MFA settings for remote production access.', 'Configuration', 'Example: the identity provider policy enforcing MFA for all users. Be ready to show a live login.', 'Seen in practice: the auditor asked for the settings and to observe a user being prompted for MFA.'],
  ['Access', 'Remote access uses an encrypted connection', 'VPN or other encrypted connection settings.', 'Configuration', 'Example: VPN configuration. If there is no VPN, show that access is over TLS, SSH or SSO to the cloud console and agree wording that matches how you actually connect.', 'Seen in practice: VPN settings were requested as missing.'],
  ['Access', 'Access control policy covers adding, changing and removing users', 'Copy of the access control policy.', 'Policy', 'Send the approved policy.', 'Rare.'],
  ['Access', 'Access reviews are done at least quarterly', 'The access review for the quarter and proof that changes were completed.', 'Report or record', 'Example: the signed review showing date, reviewer, source of the user list and decisions, with the removal tickets.', 'Removals without tickets; lists not pulled from the system.'],
  ['Access', 'Leavers lose access within the agreed time', 'Populations of employees and contractors who left; a completed termination checklist for each sample.', 'Population and sample', 'Export leavers from the HR system. Example: a checklist showing each system, who removed access and when, within the SLA.', 'Removal dates after the SLA.'],
  ['Access', 'New access is approved by a manager', 'For each sampled new hire or contractor, the access request and approval.', 'Population and sample', 'Example: the onboarding ticket with manager approval dated before access was granted.', 'Approval after the grant date.'],
  ['Access', 'Mobile devices are centrally managed', 'MDM dashboard, settings and list of enrolled devices.', 'Configuration', 'Example: the device list export and the compliance policy screen.', 'Devices not enrolled.'],
  ['Access', 'Anti-malware is deployed and kept up to date', 'Tool dashboard, update and logging settings, list of devices; a sample of endpoints.', 'Configuration', 'Example: the console showing all devices protected and definitions current.', 'Devices missing the agent.'],

  // Governance and people
  ['Governance', 'The board oversees security and privacy', 'Board charter, annual meeting minutes with a security briefing, members\' expertise and independence.', 'Report or record', 'If you have a board: charter, minutes and member profiles. If you do not, say so plainly and agree with the auditor to reword the control to senior management or owner oversight, then provide management meeting minutes that cover security. Never create a board on paper.', 'Seen in practice: "Does the company have a board of directors?" and a request for missing minutes.'],
  ['Governance', 'Security roles and responsibilities are assigned', 'Roles and responsibilities policy and sample job descriptions.', 'Policy', 'Send the policy and two or three job descriptions for security-relevant roles.', 'Rare.'],
  ['Governance', 'Policies are reviewed at least annually', 'All security policies and evidence of the annual review.', 'Report or record', 'Example: approval records showing reviewer and date for each policy. If the review is scheduled later in the period, tell the auditor the date and send it when done.', 'Seen in practice: the review was scheduled for later, so the item stayed open.'],
  ['Governance', 'Customers can report failures, incidents and complaints', 'Screenshots of the external support channel.', 'Configuration', 'Example: the support page or help desk form, captured during the audit period.', 'Seen in practice: screenshots from the previous year were rejected and had to be refreshed.'],
  ['Governance', 'An organisation chart shows reporting lines', 'Copy of the organisation chart.', 'Report or record', 'Send a current chart with names and titles.', 'Seen in practice: a chart without names was sent back.'],
  ['Governance', 'Controls are self-assessed at least annually', 'The annual control self-assessment and any corrective actions.', 'Report or record', 'Example: export the control list, review each control, then sign and date the review. Add tickets for anything found.', 'Seen in practice: this was missing and had to be performed and signed.'],
  ['People', 'Code of conduct is acknowledged; breaches lead to discipline', 'Code of conduct, disciplinary policy, and the acknowledgement for each sampled new hire.', 'Population and sample', 'Example: the signed acknowledgement or the platform record with date.', 'Acknowledgement dated long after the start date.'],
  ['People', 'Background checks are done on new joiners', 'Populations of new employees and contractors; the completed check for each sample.', 'Population and sample', 'Export new joiners from the HR system. Example: the completion report from the screening provider, with sensitive details redacted.', 'Checks completed after the start date.'],
  ['People', 'Employees and contractors sign confidentiality terms', 'For each sample, the signed confidentiality agreement; for contractors, an agreement that references the code of conduct.', 'Population and sample', 'Example: the signed employment or contractor agreement with the confidentiality clause highlighted.', 'Unsigned or undated agreements.'],
  ['People', 'Performance evaluations are done annually', 'Population of current employees; the evaluation for each sample.', 'Population and sample', 'Example: a completed review form showing date and manager. Redact ratings and pay.', 'New hires not yet due; explain them.'],
  ['People', 'Security awareness training is completed', 'For sampled new hires, training within 30 days; for sampled current staff, annual training.', 'Population and sample', 'Example: the training platform completion record with dates.', 'Training completed late.'],

  // Incidents
  ['Incidents', 'The incident response plan is tested annually', 'The most recent test.', 'Report or record', 'Example: the tabletop exercise report.', 'A test outside the last twelve months.'],
  ['Incidents', 'Incident response procedures are documented and communicated', 'The policy and proof it was communicated to staff.', 'Policy', 'Example: the plan plus policy acknowledgement records.', 'No proof of communication.'],
  ['Incidents', 'Incidents are logged, resolved and communicated', 'Population of security and privacy incidents; the ticket for each sample.', 'Population and sample', 'Example: an incident ticket with timeline, root cause, resolution and who was told. If there were no incidents, state it in writing and show the empty incident log.', 'How "incident" is defined.'],

  // Monitoring and network
  ['Monitoring', 'Intrusion detection monitors the network', 'IDS dashboard and settings.', 'Configuration', 'Example: the cloud threat detection service enabled in every region, with the findings dashboard.', 'Seen in practice: the dashboard screenshot was missing.'],
  ['Monitoring', 'Logs are collected and alerts raised', 'Log tool dashboard, alert settings and an example alert.', 'Configuration', 'Example: the alert rule and a notification it produced.', 'Seen in practice: the dashboard was missing.'],
  ['Monitoring', 'Infrastructure is monitored against thresholds', 'Monitoring dashboard, threshold settings and an example alert.', 'Configuration', 'Example: a CPU or error-rate alarm definition and the alert it sent.', 'Seen in practice: the dashboard was missing.'],
  ['Network', 'Data is encrypted in transit', 'TLS certificate and secure transmission settings.', 'Configuration', 'Example: the certificate details and the load balancer listener showing HTTPS only.', 'Rare.'],
  ['Network', 'The network is segmented', 'Segmentation settings and the network diagram.', 'Configuration', 'Example: a current diagram plus the subnet and security group rules that separate environments.', 'Seen in practice: both the diagram and the settings were missing.'],
  ['Network', 'Firewalls are configured and reviewed annually', 'Firewall rules; the annual ruleset review and changes made.', 'Report or record', 'Example: the dated review record and the rule export it was based on.', 'Overly open rules with no justification.'],
  ['Network', 'Hardening standards are documented and reviewed', 'The standards and the latest annual review.', 'Policy', 'Cite the section of the operations security policy.', 'Rare.'],
  ['Vulnerabilities', 'Vulnerability and monitoring policies exist', 'Copies of the policies.', 'Policy', 'Both can sit in one operations security policy; name the sections.', 'Rare.'],
  ['Vulnerabilities', 'Infrastructure is patched', 'Population of patches in the period; the ticket for each sample.', 'Population and sample', 'Example: the patch ticket or automated update log for each sampled patch.', 'How the population was generated when patching is automatic.'],
  ['Vulnerabilities', 'Vulnerability scans run at least quarterly', 'The scan report for the quarter and tickets for high and critical findings.', 'Report or record', 'Example: the scanner report plus the remediation ticket for each high or critical item.', 'Findings open past the agreed time.'],

  // Customers and vendors
  ['Customers', 'Security commitments are communicated to customers', 'Master services agreement template, the most recent signed agreement and the terms of service.', 'Report or record', 'Send the template, one recent executed agreement with commercial terms redacted, and the public terms.', 'Seen in practice: only the terms of service were sent, and a recent signed agreement was requested.'],
  ['Customers', 'Customers and staff get product and support documentation', 'The product description and support guidance, and where they are published.', 'Report or record', 'Example: the technical overview document plus a screenshot of the help centre or portal where it is published.', 'Seen in practice: the document and the screenshot of its location were both missing.'],
  ['Vendors', 'Vendor agreements include confidentiality and privacy terms', 'Population of current vendors; the agreement for each sample.', 'Population and sample', 'Export the vendor list. Example: the signed agreement or online terms with the relevant clauses.', 'Vendors with no agreement on file.'],
  ['Vendors', 'A vendor management programme is in place', 'Vendor policy, critical vendor inventory, the SOC 2 Type 2 report for each subservice organisation and management\'s review of it.', 'Report or record', 'Example: a short review memo per report noting the period, opinion, exceptions and the user controls you are responsible for. The auditor decides which vendors are subservice organisations.', 'Reports that do not cover the audit period; ask for a bridge letter.'],

  // Risk
  ['Risk', 'A risk management programme exists', 'Risk management policy covering identification, rating and treatment.', 'Policy', 'Send the approved policy.', 'Rare.'],
  ['Risk', 'Risk assessment is performed at least annually, including fraud', 'The annual risk assessment.', 'Report or record', 'Example: the risk register snapshot showing every risk scored, with an owner and a completed treatment decision.', 'Seen in practice: risks without a completed treatment status were sent back.'],

  // Removed or not applicable
  ['Not applicable', 'Data centre access is reviewed; visitors are logged and escorted', 'Annual data centre access review and visitor log.', 'Report or record', 'If you are fully cloud-hosted with no servers of your own, tell the auditor. These controls are removed and covered by the cloud provider\'s own report.', 'The auditor will confirm you have no on-premises servers.'],
  ['Not applicable', 'Privileged access to firewall, operating system and network is restricted', 'Privileged user lists for each layer.', 'Configuration', 'Where the cloud provider manages these layers, the controls are usually removed and covered by the cloud administrator list.', 'Be ready to explain who can change security groups.'],
  ['Not applicable', 'System description', 'The system narrative for the report.', 'Report or record', 'Requested alongside the list but not tested as a control. Provide it early, because the auditor uses it to confirm scope.', 'Scope questions.'],
];

// When each request may not apply after scoping, aligned with ARL_ITEMS by position.
export const ARL_SCOPING = [
  "Fully cloud-hosted with no company-owned storage media; or staff laptops are reissued, not destroyed, in the period. Media held by the cloud provider is covered by its own report (carve-out). A zero population is not the same as not applicable: the control can still be in scope with no occurrences.",
  "Rarely out of scope. Retention is required wherever the system stores customer data; only a pure pass-through service that stores nothing may scope it out.",
  "Rarely out of scope. Every in-scope system has assets, even if they are all cloud resources.",
  "No customers left in the period (no occurrences, not out of scope); or the service never stores customer data after processing. Can also be excluded when the Confidentiality criteria are out of scope and the control is mapped only there.",
  "Rarely out of scope. Can sit inside a broader data management policy.",
  "Data stores are a managed service encrypted by default and the auditor relies on the cloud provider's report (carve-out); you still show the setting is on.",
  "Rarely out of scope. Business continuity applies under Common Criteria CC9.1 even when Availability is not in scope.",
  "Rarely out of scope. If the Availability criteria are excluded, testing is still expected under the common criteria, though the auditor may accept a lighter test.",
  "The company holds no cyber insurance and the control was never in its control set; agree removal with the auditor. If the control is listed, it is tested.",
  "Rarely out of scope.",
  "No changes in the period (rare; zero changes is still in scope with no occurrences). Off-the-shelf SaaS with no custom code may remove code change controls but keep infrastructure changes.",
  "Rarely out of scope. With a single-person engineering team, the control is usually reworded with compensating review rather than removed.",
  "No in-house development: the product is bought, not built. Configuration changes are then covered by change management instead.",
  "Tiny teams where every user works on every release; still usually tested, with chat or release notes as evidence.",
  "No customer-facing system, or no critical changes in the period (no occurrences). Define 'critical' in policy so the population is clear.",
  "Production data stores are fully managed (serverless) with no SSH or direct logins: reword to the access method actually used, for example identity provider and IAM roles.",
  "Encryption keys are fully managed by the cloud provider with no customer-managed keys; the control may be reworded to cover IAM access to the key service.",
  "All systems use single sign-on with no local passwords: test the identity provider's password and MFA policy instead of each system.",
  "No remote access to production at all, for example no consoles, SSH or database clients (rare). Otherwise always in scope.",
  "No VPN in use: reword to the actual encrypted path (SSO to the cloud console over TLS, SSH, bastion with session manager). Not usually removed.",
  "Rarely out of scope.",
  "Rarely out of scope. Frequency can be changed (quarterly to semi-annual) if policy and risk support it.",
  "No leavers in the period (no occurrences, not out of scope).",
  "No new joiners in the period (no occurrences). Access granted automatically by role-based provisioning can replace individual approvals if the role design is approved.",
  "No company-managed mobile devices and staff do not access company data on phones; or only laptops are in scope and covered by endpoint controls. Remove with the auditor's agreement.",
  "Endpoints are all operating systems where the company relies on built-in protection; still in scope, evidence is the built-in tool's settings.",
  "No board of directors (common for small private companies): reword to oversight by the owner or senior management and provide management meeting minutes. Do not remove without a replacement.",
  "Rarely out of scope.",
  "Rarely out of scope.",
  "No external users or customers (internal tool only); otherwise in scope.",
  "Rarely out of scope; very small companies still show names, titles and reporting lines.",
  "Rarely out of scope. A first-year audit may accept the readiness assessment if it falls inside the period.",
  "No new joiners in the period (no occurrences); the acknowledgement for current staff can still be sampled.",
  "No new joiners in the period (no occurrences); or local law prohibits checks, in which case document the legal constraint and any alternative screening.",
  "No contractors engaged: the contractor part is out of scope; employee agreements are still tested.",
  "Fewer than twelve months since the company started, or no staff past their first review date; explain eligibility in policy.",
  "Rarely out of scope.",
  "Rarely out of scope.",
  "Rarely out of scope.",
  "No incidents in the period (no occurrences). Give a written statement and the empty incident log.",
  "Rarely out of scope. A cloud provider's threat detection service counts as an intrusion detection system.",
  "Rarely out of scope.",
  "Availability criteria excluded and no capacity commitments; usually still tested under CC7.2.",
  "Rarely out of scope.",
  "Serverless or fully managed architecture with no networks you configure: reword to the provider's isolation and your access controls.",
  "No firewalls you manage (fully serverless); otherwise security groups and web application firewalls count as firewalls.",
  "Rarely out of scope. With fully managed services, hardening covers the configuration you control.",
  "Rarely out of scope.",
  "Fully managed or serverless services where the provider patches the infrastructure; carve-out the provider and test only what you patch (containers, dependencies, endpoints).",
  "No external-facing systems you manage (rare); otherwise in scope.",
  "No customers yet, or customers accept only online terms; test the terms of service instead of signed agreements.",
  "Rarely out of scope.",
  "No vendors handling confidential data (rare).",
  "Rarely out of scope. The auditor decides which vendors are subservice organisations; inclusive versus carve-out method changes what you provide.",
  "Rarely out of scope.",
  "Rarely out of scope.",
  "Fully cloud-hosted with no on-premises servers, data centres or secure rooms: removed, and covered by the cloud provider's report (carve-out).",
  "The cloud provider manages these layers (serverless or managed services): removed or replaced by the cloud administrator and security group change controls.",
  "Not a tested control; always required as part of the report."
];

export const ARL_SCOPING_INTRO = 'Scoping decides which controls are tested. A control can be out of scope because of the Trust Services Criteria chosen, the system boundary, or because a subservice organisation (such as the cloud provider) performs it and is carved out. A control that is in scope but had nothing to test in the period, such as no leavers, is not out of scope: it is a no-occurrence result, and you still give a written statement and the empty list. Agree every removal or rewording with the auditor before fieldwork.';

// [reason a control may not apply, what it means, what to provide]
export const ARL_SCOPING_REASONS = [
  ['Trust Services Criteria not selected', 'Availability, Confidentiality, Processing Integrity or Privacy criteria are optional. Controls mapped only to an excluded category drop out.', 'The scoping decision in the engagement letter and system description.'],
  ['Carve-out of a subservice organisation', 'The cloud or hosting provider performs the control (physical security, hardware disposal, infrastructure patching) and its own SOC report is relied on.', 'The provider\'s SOC 2 report, your review of it, and the complementary user entity controls you perform.'],
  ['Not in the system boundary', 'The activity does not exist for the system in scope, such as no on-premises servers, no mobile devices or no in-house development.', 'A short written statement, confirmed in the system description.'],
  ['No occurrences in the period', 'The control is in scope but had nothing to test (no leavers, incidents or destroyed media).', 'A written no-occurrence statement and the system-generated empty list.'],
  ['Control reworded to fit', 'The control is in scope but described differently from how the company works, such as a board that does not exist or a VPN that is not used.', 'Updated control wording agreed with the auditor, and evidence for the actual mechanism.'],
];
// [lesson, why it matters]
export const ARL_LESSONS = [
  ['Expect follow-ups on the first pass', 'In this example about 40% of requests came back with a follow-up, mostly for missing screenshots rather than missing controls.'],
  ['Every screenshot needs the system date and time', 'Auditors state this at the top of the list. Evidence from before the audit period is rejected.'],
  ['Populations must come from the system', 'Show the query or filter and the count. A typed list cannot be relied on.'],
  ['"No occurrences" is a valid answer', 'If nothing happened in the period (no leavers, no incidents, no destroyed media), say so in writing and show the empty list.'],
  ['Say where a requirement lives', 'A password or backup requirement inside a broader policy is fine if you name the policy and section.'],
  ['Challenge controls that do not fit', 'Controls for data centres or a board you do not have should be removed or reworded with the auditor, not papered over.'],
  ['Collect configuration evidence in one sitting', 'Most follow-ups were cloud settings: admin lists, MFA, password policy, SSH keys, network diagram, monitoring dashboards. Capture them together.'],
];
