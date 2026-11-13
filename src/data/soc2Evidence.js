// SOC 2 (Security) evidence detail. Built from the control set and test procedures of an anonymised SOC 2 Type II report.
// Client name, system details and subservice organisation removed. Evidence written as the specific artefact an auditor asks for.
export const SOC2_EVIDENCE_COLUMNS = ['Ref', 'SOC 2 criteria', 'UCF ID', 'Control description', 'Specific evidence to provide', 'What the evidence must show', 'Population or sample', 'Control frequency'];

export const SOC2_EVIDENCE = [
 [
  "S2-001",
  "CC1.1, CC1.4",
  "HR-01",
  "The company performs background checks on new hires.",
  "Background check completion report from the screening provider for sampled new hires; HR security policy",
  "Check completed on or before start date for each sampled hire",
  "Point in time or full population",
  "Ongoing"
 ],
 [
  "S2-002",
  "CC1.1, CC1.5",
  "HR-03",
  "The company requires employees to acknowledge a code of conduct at the time of hire. Employees who violate the code of conduct are subject to disciplinary actions in accordance with a disciplinary policy.",
  "Signed code of conduct acknowledgement (HRIS or e-sign record) per sampled new hire; Code of Conduct; disciplinary policy",
  "Signature date within onboarding window; inquiry on violations in the period",
  "Sample: new hires in the period",
  "Per hire"
 ],
 [
  "S2-003",
  "CC1.1",
  "HR-03",
  "The company requires employees to sign a confidentiality agreement during onboarding.",
  "Signed NDA or confidentiality agreement (e-sign certificate) per sampled new hire",
  "Signed before or at start date",
  "Sample: new hires in the period",
  "Per hire"
 ],
 [
  "S2-004",
  "CC1.1, CC1.4, CC1.5",
  "HR-03",
  "The company managers are required to complete performance evaluations for direct reports periodically.",
  "Performance review export from HRIS (employee, reviewer, completion date); HR policy",
  "Reviews completed in the cycle defined by policy",
  "Point in time or full population",
  "Ongoing"
 ],
 [
  "S2-005",
  "CC1.1",
  "HR-03",
  "The company requires contractors to sign a confidentiality agreement at the time of engagement.",
  "Executed contractor agreement with confidentiality clause per sampled contractor",
  "Signed at engagement, before access",
  "Sample: contractors engaged in the period",
  "Ongoing"
 ],
 [
  "S2-006",
  "CC1.1",
  "HR-03",
  "The company requires contractor agreements to include a code of conduct or reference to the company code of conduct.",
  "Executed contractor agreement showing code of conduct clause or reference",
  "Clause present in each sampled agreement",
  "Sample: contractors engaged in the period",
  "Ongoing"
 ],
 [
  "S2-007",
  "CC1.2",
  "GOV-03",
  "The company's board of directors meets at least annually and maintains formal meeting minutes. The board includes directors that are independent of the company.",
  "Signed board meeting minutes with date and attendees; director list marking independent members",
  "At least one meeting in the year; independent director named",
  "Point in time or full population",
  "Annual"
 ],
 [
  "S2-008",
  "CC1.2, CC1.3",
  "GOV-02",
  "The company's board of directors has a documented charter/policy that outlines its oversight responsibilities for internal control.",
  "Board charter or governance policy section on oversight of internal control",
  "Approved and current",
  "Point in time or full population",
  "Ongoing"
 ],
 [
  "S2-009",
  "CC1.2",
  "GOV-03",
  "The company's board of directors or a relevant subcommittee is briefed by senior management at least annually on the state of the company's cybersecurity risk. The board provides feedback and direction to management as needed.",
  "Board or committee minutes and the security briefing deck presented by management",
  "Briefing at least annually covering security posture and risks",
  "Point in time or full population",
  "Annual"
 ],
 [
  "S2-010",
  "CC1.2",
  "GOV-03",
  "The company's board members have sufficient expertise to oversee management's ability to design, implement and operate information security controls. The board engages third-party information security experts and consultants as needed.",
  "Director bios or LinkedIn profiles showing security or risk expertise; external pen test report or consultant engagement letter",
  "Relevant expertise; use of third-party experts",
  "Point in time or full population",
  "Ongoing"
 ],
 [
  "S2-011",
  "CC1.3, CC1.4, CC1.5, CC2.2, CC5.3",
  "GOV-02",
  "Roles and responsibilities for the design, development, implementation, operation, maintenance, and monitoring of information security controls are formally assigned in job descriptions and/or the Roles and Responsibilities policy.",
  "Job descriptions for security roles; Roles and Responsibilities policy",
  "Security duties assigned to named roles",
  "Point in time or full population",
  "Ongoing"
 ],
 [
  "S2-012",
  "CC1.3",
  "GOV-02",
  "The company maintains an organizational chart that describes the organizational structure and reporting lines.",
  "Org chart export from HRIS with reporting lines, dated in the period",
  "Current and covers in-scope teams",
  "Point in time or full population",
  "Ongoing"
 ],
 [
  "S2-013",
  "CC1.3, CC2.2",
  "GOV-02",
  "The company management has established defined roles and responsibilities to oversee the design and implementation of information security controls.",
  "Roles and Responsibilities policy with named security owner",
  "Approved and current",
  "Point in time or full population",
  "Ongoing"
 ],
 [
  "S2-014",
  "CC1.4, CC2.2",
  "HR-02",
  "The company requires employees to complete security awareness training within thirty days of hire and annually thereafter.",
  "Security awareness training completion report (user, course, completion date) for new hires and all staff",
  "New hires within 30 days; all staff annually",
  "Point in time or full population",
  "Annual"
 ],
 [
  "S2-015",
  "CC2.1, CC4.1, CC7.1, CC7.2, CC7.4, CC8.1",
  "VUL-01",
  "Host-based vulnerability scans are performed at least quarterly on all external-facing systems. Critical and high vulnerabilities are tracked to remediation.",
  "Host vulnerability scan reports (scanner export: scan date, targets, findings by severity) for each quarter; remediation tickets for critical and high findings",
  "Quarterly scans of all external-facing hosts; critical and high closed within policy SLA",
  "Point in time or full population",
  "Quarterly"
 ],
 [
  "S2-016",
  "CC2.1, CC4.1, CC4.2",
  "GOV-04",
  "The company performs control self-assessments at least annually to gain assurance that controls are in place and operating effectively. Corrective actions are taken based on relevant findings. If the company has committed to an SLA for a finding, the corrective action is completed within that SLA.",
  "Control self-assessment results with dates, failing tests and corrective action tickets",
  "Run at least annually; actions closed within committed SLA",
  "Point in time or full population",
  "Annual"
 ],
 [
  "S2-017",
  "CC2.1, CC7.2, CC7.3",
  "LOG-01",
  "The company utilizes a log management tool to identify events that may have a potential impact on the company's ability to achieve its security objectives.",
  "Log management tool configuration: log sources, retention setting, sample alert rules; Operations Security Policy",
  "In-scope systems forward logs; alerts configured",
  "Point in time or full population",
  "Ongoing"
 ],
 [
  "S2-018",
  "CC2.2, CC5.3, CC7.3, CC7.4, CC7.5",
  "IR-01",
  "The company has security and privacy incident response policies and procedures that are documented and communicated to authorized users.",
  "Incident response plan with version and approval; evidence it was published to staff (wiki link, acknowledgement)",
  "Documented and communicated",
  "Point in time or full population",
  "Ongoing"
 ],
 [
  "S2-019",
  "CC2.2",
  "GOV-01",
  "The company communicates system changes to authorized internal users.",
  "Internal change announcements (Slack or email posts, release notes) for sampled changes",
  "Changes communicated to internal users",
  "Point in time or full population",
  "Ongoing"
 ],
 [
  "S2-020",
  "CC2.2, CC5.1, CC5.2, CC5.3",
  "GOV-01",
  "The company's information security policies and procedures are documented and reviewed at least annually.",
  "Policy set with version history and approval record (approver, date)",
  "Each policy reviewed and approved within 12 months",
  "Point in time or full population",
  "Annual"
 ],
 [
  "S2-021",
  "CC2.2",
  "GOV-01",
  "The company has established a formalized whistleblower policy, and an anonymous communication channel is in place for users to report potential issues or fraud concerns.",
  "Whistleblower policy and screenshot of the anonymous reporting channel or form",
  "Channel available and anonymous",
  "Point in time or full population",
  "Ongoing"
 ],
 [
  "S2-022",
  "CC2.2, CC2.3",
  "GOV-01",
  "The company provides a description of its products and services to internal and external users.",
  "Screenshot of public product or service description page",
  "Describes the service in scope",
  "Point in time or full population",
  "Ongoing"
 ],
 [
  "S2-023",
  "CC2.3",
  "CHG-01",
  "The company notifies customers of critical system changes that may affect their processing.",
  "Customer-facing release notes or change notification emails for critical changes",
  "Customers notified of changes affecting them",
  "Point in time or full population",
  "Ongoing"
 ],
 [
  "S2-024",
  "CC2.3",
  "PRV-01",
  "The company's security commitments are communicated to customers in Master Service Agreements (MSA) or Terms of Service (TOS).",
  "Executed MSA or published Terms of Service and Privacy Policy with security commitments",
  "Security commitments stated",
  "Point in time or full population",
  "Ongoing"
 ],
 [
  "S2-025",
  "CC2.3",
  "GOV-01",
  "The company provides guidelines and technical support resources relating to system operations to customers.",
  "Screenshots of help centre, documentation and support pages",
  "Technical guidance available to customers",
  "Point in time or full population",
  "Ongoing"
 ],
 [
  "S2-026",
  "CC2.3, CC9.2",
  "TPR-01",
  "The company has written agreements in place with vendors and related third-parties. These agreements include confidentiality and privacy commitments applicable to that entity.",
  "Executed vendor agreements or DPAs with confidentiality clauses for sampled vendors; Third-Party Management Policy",
  "Confidentiality and privacy terms present",
  "Point in time or full population",
  "Ongoing"
 ],
 [
  "S2-027",
  "CC2.3",
  "GOV-01",
  "The company has an external-facing support system in place that allows users to report system information on failures, incidents, concerns, and other complaints to appropriate personnel.",
  "Screenshot of customer support or status page and the ticket intake form",
  "External users can report failures and incidents",
  "Point in time or full population",
  "Ongoing"
 ],
 [
  "S2-028",
  "CC3.1, CC5.3",
  "RSK-01",
  "The company specifies its objectives to enable the identification and assessment of risk related to the objectives.",
  "Risk management policy section stating objectives",
  "Objectives defined before risk assessment",
  "Point in time or full population",
  "Ongoing"
 ],
 [
  "S2-029",
  "CC3.1, CC3.2, CC3.3, CC3.4, CC5.1, CC5.3, CC9.1",
  "RSK-01",
  "The company has a documented risk management program in place that includes guidance on the identification of potential threats, rating the significance of the risks associated with the identified threats, and mitigation strategies for those risks.",
  "Risk management policy covering threat identification, rating and treatment",
  "Methodology documented",
  "Point in time or full population",
  "Ongoing"
 ],
 [
  "S2-030",
  "CC3.2, CC7.5",
  "BCP-02",
  "The company has a documented Business Continuity/Disaster Recovery (BC/DR) plan and tests it at least annually.",
  "BC/DR plan with approval date; tabletop or failover test report with participants, scenario and lessons learned",
  "Tested at least annually",
  "Point in time or full population",
  "Annual"
 ],
 [
  "S2-031",
  "CC3.2, CC4.1, CC4.2, CC5.3, CC9.2",
  "TPR-01",
  "The company has a vendor management program in place. Components of this program include: - critical third-party vendor inventory; - vendor's security and privacy requirements; and - review of critical third-party vendors at least annually.",
  "Vendor inventory with criticality ratings; vendor security reviews (SOC 2 reports, questionnaires) for critical vendors; Third-Party Management Policy",
  "Critical vendors reviewed at least annually",
  "Point in time or full population",
  "Annual"
 ],
 [
  "S2-032",
  "CC3.2, CC3.3, CC3.4, CC7.1, CC9.1",
  "RSK-01",
  "The company's risk assessments are performed at least annually. As part of this process, threats and changes (environmental, regulatory, and technological) to service commitments are identified and the risks are formally assessed. The risk assessment includes a consideration of the potential for fraud and how fraud may impact the achievement of objectives.",
  "Risk register export (risk, likelihood, impact, owner, treatment, date) and the annual risk assessment report including fraud risk",
  "Performed within the last 12 months; fraud considered",
  "Point in time or full population",
  "Annual"
 ],
 [
  "S2-033",
  "CC3.4, CC4.1, CC7.2, CC8.1",
  "VUL-02",
  "The company's penetration testing is performed periodically. A remediation plan is developed, and changes are implemented to remediate vulnerabilities in accordance with SLAs.",
  "Third-party penetration test report (scope, dates, findings by severity) and remediation or retest evidence",
  "Performed in the period; findings tracked to closure",
  "Point in time or full population",
  "Ongoing"
 ],
 [
  "S2-034",
  "CC3.4, CC7.1",
  "CHG-01",
  "The company has a configuration management procedure in place to ensure that system configurations are deployed consistently throughout the environment.",
  "Configuration management or infrastructure-as-code tool showing baseline configs applied to in-scope hosts",
  "Consistent configuration across the environment",
  "Point in time or full population",
  "Ongoing"
 ],
 [
  "S2-035",
  "CC5.2, CC6.1, CC6.2, CC6.3",
  "IAM-01",
  "The company's access control policy documents the requirements for the following access control functions: - adding new users; -modifying users; and/or - removing an existing user's access.",
  "Access Control Policy covering add, modify and remove user procedures",
  "Approved and current",
  "Point in time or full population",
  "Ongoing"
 ],
 [
  "S2-036",
  "CC5.2, CC5.3, CC6.8, CC8.1",
  "DEV-01",
  "The company has a formal systems development life cycle (SDLC) methodology in place that governs the development, acquisition, implementation, changes (including emergency changes), and maintenance of information systems and related technology requirements.",
  "Secure Development Policy describing SDLC, including emergency changes",
  "Approved and current",
  "Point in time or full population",
  "Ongoing"
 ],
 [
  "S2-037",
  "CC5.3",
  "BCP-01",
  "The company's data backup policy documents requirements for backup and recovery of customer data.",
  "Backup policy section with frequency, retention and restore requirements",
  "Approved and current",
  "Point in time or full population",
  "Ongoing"
 ],
 [
  "S2-038",
  "CC5.3, CC6.5",
  "PRV-03",
  "The company has formal retention and disposal procedures in place to guide the secure retention and disposal of company and customer data.",
  "Data retention and deletion policy with retention periods per data type",
  "Approved and current",
  "Point in time or full population",
  "Ongoing"
 ],
 [
  "S2-039",
  "CC5.3, CC7.1, CC8.1",
  "CHG-01",
  "The company requires changes to software and infrastructure components of the service to be authorized, formally documented, tested, reviewed, and approved prior to being implemented in the production environment.",
  "Population of production changes from the repository or CI/CD tool; for sampled changes the pull request with reviewer approval, passing tests and deployment record",
  "Each sampled change approved by someone other than the author and tested before release",
  "Sample: changes deployed in the period",
  "Ongoing"
 ],
 [
  "S2-040",
  "CC6.1, CC6.2, CC6.3, CC6.6",
  "IAM-01",
  "The company requires authentication to the \"production network\" to use unique usernames and passwords or MFA.",
  "User listing exported from the production network or cloud console IAM showing unique accounts",
  "No shared or generic accounts",
  "Point in time or full population",
  "Ongoing"
 ],
 [
  "S2-041",
  "CC6.1",
  "IAM-01",
  "The company restricts privileged access to databases to authorized users with a business need.",
  "Database privileged user listing with roles; HR roster to confirm business need",
  "Only authorised staff hold admin roles",
  "Point in time or full population",
  "Ongoing"
 ],
 [
  "S2-042",
  "CC6.1",
  "AST-01",
  "The company maintains a formal inventory of production system assets.",
  "Asset inventory export (hostname, owner, environment, date)",
  "Covers production systems",
  "Point in time or full population",
  "Ongoing"
 ],
 [
  "S2-043",
  "CC6.1, CC8.1",
  "CHG-01",
  "The company restricts access to migrate changes to production to authorized personnel.",
  "List of users with deploy or merge-to-main rights from the CI/CD or repo settings",
  "Restricted to authorised engineers",
  "Point in time or full population",
  "Ongoing"
 ],
 [
  "S2-044",
  "CC6.1",
  "IAM-01",
  "System access is restricted to authorized users only",
  "User listings from each in-scope system matched to the active HR roster",
  "No accounts for non-employees or leavers",
  "Point in time or full population",
  "Ongoing"
 ],
 [
  "S2-045",
  "CC6.1",
  "IAM-04",
  "The company requires authentication to production datastores to use authorized secure authentication mechanisms, such as MFA.",
  "Database authentication settings screenshot (SSO, IAM auth or MFA enabled)",
  "Secure authentication enforced",
  "Point in time or full population",
  "Ongoing"
 ],
 [
  "S2-046",
  "CC6.1",
  "CRY-01",
  "The company restricts privileged access to encryption keys to authorized users with a business need.",
  "Key management service IAM policy or key access listing",
  "Only authorised admins can manage keys",
  "Point in time or full population",
  "Ongoing"
 ],
 [
  "S2-047",
  "CC6.1",
  "IAM-01",
  "The company restricts privileged access to the firewall to authorized users with a business need.",
  "Firewall or security group admin access listing",
  "Restricted to network admins",
  "Point in time or full population",
  "Ongoing"
 ],
 [
  "S2-048",
  "CC6.1",
  "IAM-04",
  "The company requires authentication to systems and applications to use a unique username and password or authorized MFA.",
  "IdP MFA policy screenshot and per-user MFA enrolment report for in-scope apps",
  "MFA enforced for all users",
  "Point in time or full population",
  "Ongoing"
 ],
 [
  "S2-049",
  "CC6.1",
  "CRY-01",
  "The company's datastores housing sensitive customer data are encrypted at rest.",
  "Database or storage encryption-at-rest setting screenshots for each production datastore",
  "Encryption enabled on every datastore with customer data",
  "Point in time or full population",
  "Ongoing"
 ],
 [
  "S2-050",
  "CC6.1",
  "NET-01",
  "The company's network is segmented to prevent unauthorized access to customer data.",
  "Network diagram showing segments; VPC, subnet and security group configuration exports",
  "Customer data in restricted segments",
  "Point in time or full population",
  "Ongoing"
 ],
 [
  "S2-051",
  "CC6.1, CC6.6",
  "NET-01",
  "The company's production systems can only be remotely accessed by authorized employees via an approved encrypted connection.",
  "VPN or bastion configuration showing encryption and allowed users",
  "Remote access only over encrypted connection",
  "Point in time or full population",
  "Ongoing"
 ],
 [
  "S2-052",
  "CC6.1",
  "IAM-01",
  "The company restricts privileged access to the operating system to authorized users with a business need.",
  "OS-level privileged user listing (sudoers or admin group) from in-scope hosts",
  "Restricted to authorised admins",
  "Point in time or full population",
  "Ongoing"
 ],
 [
  "S2-053",
  "CC6.1",
  "IAM-01",
  "The company restricts privileged access to the production network to authorized users with a business need.",
  "Production network privileged access listing (cloud IAM admins)",
  "Restricted to authorised admins",
  "Point in time or full population",
  "Ongoing"
 ],
 [
  "S2-054",
  "CC6.1, CC6.6",
  "IAM-04",
  "The company's production systems can only be remotely accessed by authorized employees possessing a valid multi-factor authentication (MFA) method.",
  "Remote access user listing with MFA status from the VPN or IdP",
  "Every remote user has MFA",
  "Point in time or full population",
  "Ongoing"
 ],
 [
  "S2-055",
  "CC6.1",
  "IAM-05",
  "The company requires passwords for in-scope system components to be configured according to the company's policy.",
  "Password policy settings screenshot from the IdP and each in-scope system",
  "Meets the policy (length, complexity, lockout)",
  "Point in time or full population",
  "Ongoing"
 ],
 [
  "S2-056",
  "CC6.1, CC6.2, CC6.3",
  "IAM-01",
  "The company ensures that user access to in-scope system components is based on job role and function or requires a documented access request form and manager approval prior to access being provisioned.",
  "Population of new access grants; for sampled users the approved access request ticket or role mapping",
  "Approval before access granted",
  "Point in time or full population",
  "Ongoing"
 ],
 [
  "S2-057",
  "CC6.1",
  "AST-02",
  "The company has a data classification policy in place to help ensure that confidential data is properly secured and restricted to authorized personnel.",
  "Data classification policy with handling rules per level",
  "Approved and current",
  "Point in time or full population",
  "Ongoing"
 ],
 [
  "S2-058",
  "CC6.2, CC6.3, CC6.4",
  "IAM-03",
  "The company conducts access reviews at least quarterly for the in-scope system components to help ensure that access is restricted appropriately. Required changes are tracked to completion.",
  "Quarterly access review evidence: system user export, reviewer sign-off with date, tickets for removals",
  "Every quarter covered; removals completed",
  "Point in time or full population",
  "Quarterly"
 ],
 [
  "S2-059",
  "CC6.2, CC6.3, CC6.5",
  "IAM-02",
  "The company completes termination checklists to ensure that access is revoked for terminated employees within SLAs.",
  "Population of terminated employees from HRIS; for sampled leavers the termination checklist and access removal timestamps from IdP or system logs",
  "Access revoked within the policy SLA",
  "Sample: terminated users in the period",
  "Per leaver"
 ],
 [
  "S2-060",
  "CC6.5",
  "PRV-03",
  "The company has electronic media containing confidential information purged or destroyed in accordance with best practices, and certificates of destruction are issued for each device destroyed.",
  "Media disposal or certificate of destruction from the disposal vendor; Asset Management Policy",
  "If no disposal occurred, inquiry or attestation for the period",
  "Point in time or full population",
  "Ongoing"
 ],
 [
  "S2-061",
  "CC6.5",
  "PRV-03",
  "The company purges or removes customer data containing confidential information from the application environment, in accordance with best practices, when customers leave the service.",
  "Customer data deletion request log and deletion confirmation records",
  "If no deletion occurred, inquiry or attestation for the period",
  "Point in time or full population",
  "Ongoing"
 ],
 [
  "S2-062",
  "CC6.6, CC7.2",
  "LOG-02",
  "The company uses an intrusion detection system to provide continuous monitoring of the company's network and early detection of potential security breaches.",
  "IDS or threat detection console showing it is enabled on production, with sample alerts",
  "Continuous monitoring in place",
  "Point in time or full population",
  "Continuous"
 ],
 [
  "S2-063",
  "CC6.6, CC6.7",
  "CRY-01",
  "The company uses secure data transmission protocols to encrypt confidential and sensitive data when transmitted over public networks.",
  "SSL/TLS scan result (e.g. SSL Labs) for public endpoints; Cryptography Policy",
  "TLS 1.2 or higher; no weak ciphers",
  "Point in time or full population",
  "Ongoing"
 ],
 [
  "S2-064",
  "CC6.6",
  "NET-01",
  "The company uses firewalls and configures them to prevent unauthorized access.",
  "Security group or firewall rule exports for production",
  "Default deny; only required ports open",
  "Point in time or full population",
  "Ongoing"
 ],
 [
  "S2-065",
  "CC6.6",
  "NET-01",
  "The company reviews its firewall rulesets at least annually. Required changes are tracked to completion.",
  "Annual firewall rule review record with reviewer, date and change tickets",
  "Reviewed within 12 months; changes completed",
  "Point in time or full population",
  "Annual"
 ],
 [
  "S2-066",
  "CC6.6, CC6.8, CC7.2, CC7.4, CC8.1",
  "VUL-01",
  "The company has infrastructure supporting the service patched as part of routine maintenance and as a result of identified vulnerabilities to help ensure that servers supporting the service are hardened against security threats.",
  "Host vulnerability scan reports for in-scope servers; patch management reports or OS update logs; remediation tickets",
  "Patches applied within severity SLAs",
  "Point in time or full population",
  "Ongoing"
 ],
 [
  "S2-067",
  "CC6.6, CC8.1",
  "NET-01",
  "The company's network and system hardening standards are documented, based on industry best practices, and reviewed at least annually.",
  "Hardening standard (CIS benchmark based) with review date",
  "Reviewed at least annually",
  "Point in time or full population",
  "Annual"
 ],
 [
  "S2-068",
  "CC6.7",
  "EPT-01",
  "The company has a mobile device management (MDM) system in place to centrally manage mobile devices supporting the service.",
  "MDM device listing (device, owner, encryption, OS version, last check-in)",
  "All staff devices enrolled",
  "Point in time or full population",
  "Ongoing"
 ],
 [
  "S2-069",
  "CC6.8",
  "EPT-01",
  "The company deploys anti-malware technology to environments commonly susceptible to malicious attacks and configures this to be updated routinely, logged, and installed on all relevant systems.",
  "Endpoint protection console export of devices with agent status and definition update date",
  "Agent installed and current on all relevant devices",
  "Point in time or full population",
  "Ongoing"
 ],
 [
  "S2-070",
  "CC7.1, CC7.2",
  "LOG-02",
  "The company's formal policies outline the requirements for the following functions related to IT / Engineering: - vulnerability management; - system monitoring.",
  "Operations Security Policy sections for vulnerability management and monitoring",
  "Approved and current",
  "Point in time or full population",
  "Ongoing"
 ],
 [
  "S2-071",
  "CC7.2",
  "LOG-02",
  "An infrastructure monitoring tool is utilized to monitor systems, infrastructure, and performance and generates alerts when specific predefined thresholds are met.",
  "Infrastructure monitoring alert rules (CPU, availability, errors) and notification routing",
  "Alerts configured for in-scope systems",
  "Point in time or full population",
  "Ongoing"
 ],
 [
  "S2-072",
  "CC7.3, CC7.4, CC7.5",
  "IR-01",
  "The company's security incidents are logged, tracked, resolved, and communicated to affected or relevant parties by management according to the company's security incident response policy and procedures.",
  "Incident tracker export (ID, severity, opened, closed, communication) and post-incident reports",
  "If no incidents occurred, inquiry or attestation for the period",
  "Point in time or full population",
  "Ongoing"
 ],
 [
  "S2-073",
  "CC7.4, CC7.5",
  "IR-01",
  "The company tests its incident response plan at least annually.",
  "Incident response tabletop report (date, scenario, participants, gaps, actions)",
  "Tested within the last 12 months",
  "Point in time or full population",
  "Annual"
 ],
 [
  "S2-074",
  "CC9.1",
  "BCP-02",
  "The company has Business Continuity and Disaster Recovery Plans in place that outline communication plans in order to maintain information security continuity in the event of the unavailability of key personnel.",
  "BC/DR plan section on communication during disruption",
  "Approved and current",
  "Point in time or full population",
  "Ongoing"
 ],
 [
  "S2-075",
  "CC9.1",
  "BCP-02",
  "The company maintains cybersecurity insurance to mitigate the financial impact of business disruptions.",
  "Cybersecurity insurance certificate or policy declarations page",
  "Policy active in the period",
  "Point in time or full population",
  "Ongoing"
 ]
];
