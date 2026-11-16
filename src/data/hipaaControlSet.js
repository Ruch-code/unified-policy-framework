// HIPAA control set: Business Associate vs Covered Entity. One source array; the views filter it.
// Structure based on the HIPAA Security, Privacy and Breach Notification Rules (45 CFR Parts 160 and 164).
// Required/Addressable for BA- and CE-specific items reflects the obligation, not a Security Rule implementation specification label.
export const HIPAA_CATEGORIES = ['Administrative Safeguards (164.308)', 'Physical Safeguards (164.310)', 'Technical Safeguards (164.312)', 'Organizational Requirements (164.314)', 'Policies, Procedures and Documentation (164.316)', 'Breach Notification (164.400 to 164.414)', 'Privacy Rule (164.500 to 164.534)'];

export const hipaaControls = [
 {
  "id": "HIPAA-AS-01",
  "name": "Security Risk Analysis",
  "category": "Administrative Safeguards (164.308)",
  "citation": "164.308(a)(1)(ii)(A)",
  "requirement": "Required",
  "appliesTo": [
   "BA",
   "CE"
  ],
  "description": "Perform an accurate and thorough assessment of risks to the confidentiality, integrity and availability of ePHI, at least annually and on major change.",
  "evidence": [
   "Risk assessment report",
   "ePHI asset and data flow inventory",
   "risk register with likelihood/impact scores",
   "management sign-off"
  ],
  "mapped": "SOC 2 CC3.2; ISO 6.1.2"
 },
 {
  "id": "HIPAA-AS-02",
  "name": "Risk Management Plan",
  "category": "Administrative Safeguards (164.308)",
  "citation": "164.308(a)(1)(ii)(B)",
  "requirement": "Required",
  "appliesTo": [
   "BA",
   "CE"
  ],
  "description": "Implement measures to reduce identified risks to a reasonable and appropriate level.",
  "evidence": [
   "Risk treatment plan",
   "remediation tickets with owners and dates",
   "risk acceptance approvals"
  ],
  "mapped": "SOC 2 CC3.4; ISO 6.1.3"
 },
 {
  "id": "HIPAA-AS-03",
  "name": "Sanction Policy",
  "category": "Administrative Safeguards (164.308)",
  "citation": "164.308(a)(1)(ii)(C)",
  "requirement": "Required",
  "appliesTo": [
   "BA",
   "CE"
  ],
  "description": "Apply sanctions to workforce members who fail to comply with security policies.",
  "evidence": [
   "Sanctions/disciplinary policy",
   "HR records of applied sanctions (redacted)"
  ],
  "mapped": "SOC 2 CC1.5; ISO A.6.4"
 },
 {
  "id": "HIPAA-AS-04",
  "name": "Information System Activity Review",
  "category": "Administrative Safeguards (164.308)",
  "citation": "164.308(a)(1)(ii)(D)",
  "requirement": "Required",
  "appliesTo": [
   "BA",
   "CE"
  ],
  "description": "Regularly review audit logs, access reports and security incident tracking.",
  "evidence": [
   "Log review procedure",
   "SIEM/alert screenshots",
   "signed periodic review records"
  ],
  "mapped": "SOC 2 CC7.2; ISO A.8.15, A.8.16"
 },
 {
  "id": "HIPAA-AS-05",
  "name": "Assigned Security Responsibility",
  "category": "Administrative Safeguards (164.308)",
  "citation": "164.308(a)(2)",
  "requirement": "Required",
  "appliesTo": [
   "BA",
   "CE"
  ],
  "description": "Designate a Security Official responsible for the security program.",
  "evidence": [
   "Appointment letter or org chart naming the Security Official",
   "job description"
  ],
  "mapped": "SOC 2 CC1.3; ISO 5.3"
 },
 {
  "id": "HIPAA-AS-06",
  "name": "Workforce Security and Authorization",
  "category": "Administrative Safeguards (164.308)",
  "citation": "164.308(a)(3)",
  "requirement": "Addressable",
  "appliesTo": [
   "BA",
   "CE"
  ],
  "description": "Ensure only authorised workforce members access ePHI; supervision and clearance procedures.",
  "evidence": [
   "Access provisioning procedure",
   "background check policy and sample results",
   "approval tickets"
  ],
  "mapped": "SOC 2 CC6.2; ISO A.5.18, A.6.1"
 },
 {
  "id": "HIPAA-AS-07",
  "name": "Termination Procedures",
  "category": "Administrative Safeguards (164.308)",
  "citation": "164.308(a)(3)(ii)(C)",
  "requirement": "Addressable",
  "appliesTo": [
   "BA",
   "CE"
  ],
  "description": "Revoke access promptly when employment or engagement ends.",
  "evidence": [
   "Offboarding checklist",
   "sample of terminated users with deprovisioning timestamps",
   "HRIS vs IdP reconciliation"
  ],
  "mapped": "SOC 2 CC6.2; ISO A.5.18"
 },
 {
  "id": "HIPAA-AS-08",
  "name": "Information Access Management",
  "category": "Administrative Safeguards (164.308)",
  "citation": "164.308(a)(4)",
  "requirement": "Required/Addressable",
  "appliesTo": [
   "BA",
   "CE"
  ],
  "description": "Role-based access, access establishment and modification procedures, minimum necessary access.",
  "evidence": [
   "Access control policy",
   "RBAC matrix",
   "quarterly user access reviews with sign-off"
  ],
  "mapped": "SOC 2 CC6.1, CC6.3; ISO A.5.15"
 },
 {
  "id": "HIPAA-AS-09",
  "name": "Security Awareness and Training",
  "category": "Administrative Safeguards (164.308)",
  "citation": "164.308(a)(5)",
  "requirement": "Addressable",
  "appliesTo": [
   "BA",
   "CE"
  ],
  "description": "Security reminders, malware protection, log-in monitoring and password management training for all workforce.",
  "evidence": [
   "Training content",
   "completion reports for onboarding and annual training",
   "phishing simulation results"
  ],
  "mapped": "SOC 2 CC2.2; ISO A.6.3"
 },
 {
  "id": "HIPAA-AS-10",
  "name": "Security Incident Procedures",
  "category": "Administrative Safeguards (164.308)",
  "citation": "164.308(a)(6)",
  "requirement": "Required",
  "appliesTo": [
   "BA",
   "CE"
  ],
  "description": "Identify, respond to, mitigate and document security incidents.",
  "evidence": [
   "Incident response plan",
   "incident log/tickets",
   "post-incident reports",
   "annual tabletop exercise record"
  ],
  "mapped": "SOC 2 CC7.3 to CC7.5; ISO A.5.24 to A.5.27"
 },
 {
  "id": "HIPAA-AS-11",
  "name": "Contingency Plan",
  "category": "Administrative Safeguards (164.308)",
  "citation": "164.308(a)(7)",
  "requirement": "Required/Addressable",
  "appliesTo": [
   "BA",
   "CE"
  ],
  "description": "Data backup plan, disaster recovery plan, emergency mode operations, testing and criticality analysis.",
  "evidence": [
   "BCP/DR plan",
   "backup configuration and restore test results",
   "DR test report",
   "application criticality analysis"
  ],
  "mapped": "SOC 2 A1.2, A1.3; ISO A.5.30, A.8.13"
 },
 {
  "id": "HIPAA-AS-12",
  "name": "Periodic Evaluation",
  "category": "Administrative Safeguards (164.308)",
  "citation": "164.308(a)(8)",
  "requirement": "Required",
  "appliesTo": [
   "BA",
   "CE"
  ],
  "description": "Perform periodic technical and non-technical evaluation of security controls.",
  "evidence": [
   "Annual internal audit or gap assessment",
   "penetration test report",
   "remediation tracker"
  ],
  "mapped": "SOC 2 CC4.1; ISO 9.2"
 },
 {
  "id": "HIPAA-PS-01",
  "name": "Facility Access Controls",
  "category": "Physical Safeguards (164.310)",
  "citation": "164.310(a)",
  "requirement": "Addressable",
  "appliesTo": [
   "BA",
   "CE"
  ],
  "description": "Limit physical access to systems and facilities housing ePHI.",
  "evidence": [
   "Physical security policy",
   "badge access logs",
   "visitor log",
   "cloud provider SOC 2 report for data centre controls"
  ],
  "mapped": "SOC 2 CC6.4; ISO A.7.1, A.7.2"
 },
 {
  "id": "HIPAA-PS-02",
  "name": "Workstation Use and Security",
  "category": "Physical Safeguards (164.310)",
  "citation": "164.310(b), (c)",
  "requirement": "Required",
  "appliesTo": [
   "BA",
   "CE"
  ],
  "description": "Define proper workstation use and physical safeguards for workstations accessing ePHI.",
  "evidence": [
   "Acceptable use policy",
   "MDM screenshots showing screen lock, encryption, OS updates"
  ],
  "mapped": "SOC 2 CC6.8; ISO A.8.1"
 },
 {
  "id": "HIPAA-PS-03",
  "name": "Device and Media Controls",
  "category": "Physical Safeguards (164.310)",
  "citation": "164.310(d)",
  "requirement": "Required/Addressable",
  "appliesTo": [
   "BA",
   "CE"
  ],
  "description": "Disposal, media re-use, accountability and backup of devices and media containing ePHI.",
  "evidence": [
   "Asset inventory",
   "media disposal policy",
   "certificates of destruction",
   "device wipe records"
  ],
  "mapped": "SOC 2 CC6.5; ISO A.7.10, A.7.14"
 },
 {
  "id": "HIPAA-TS-01",
  "name": "Unique User Identification",
  "category": "Technical Safeguards (164.312)",
  "citation": "164.312(a)(2)(i)",
  "requirement": "Required",
  "appliesTo": [
   "BA",
   "CE"
  ],
  "description": "Assign a unique ID to every user; no shared accounts.",
  "evidence": [
   "IdP user list",
   "shared account exception register"
  ],
  "mapped": "SOC 2 CC6.1; ISO A.5.16"
 },
 {
  "id": "HIPAA-TS-02",
  "name": "Emergency Access Procedure",
  "category": "Technical Safeguards (164.312)",
  "citation": "164.312(a)(2)(ii)",
  "requirement": "Required",
  "appliesTo": [
   "BA",
   "CE"
  ],
  "description": "Procedure to obtain ePHI during an emergency (break-glass).",
  "evidence": [
   "Break-glass procedure",
   "break-glass account usage log and review"
  ],
  "mapped": "SOC 2 CC6.1; ISO A.8.2"
 },
 {
  "id": "HIPAA-TS-03",
  "name": "Automatic Logoff",
  "category": "Technical Safeguards (164.312)",
  "citation": "164.312(a)(2)(iii)",
  "requirement": "Addressable",
  "appliesTo": [
   "BA",
   "CE"
  ],
  "description": "Terminate sessions after inactivity.",
  "evidence": [
   "Session timeout configuration screenshots (app, IdP, MDM)"
  ],
  "mapped": "SOC 2 CC6.1; ISO A.8.5"
 },
 {
  "id": "HIPAA-TS-04",
  "name": "Encryption at Rest",
  "category": "Technical Safeguards (164.312)",
  "citation": "164.312(a)(2)(iv)",
  "requirement": "Addressable",
  "appliesTo": [
   "BA",
   "CE"
  ],
  "description": "Encrypt ePHI stored in databases, storage, backups and endpoints.",
  "evidence": [
   "Cloud console screenshots for DB/storage encryption",
   "KMS key policy",
   "MDM disk encryption report"
  ],
  "mapped": "SOC 2 CC6.1; ISO A.8.24"
 },
 {
  "id": "HIPAA-TS-05",
  "name": "Audit Controls",
  "category": "Technical Safeguards (164.312)",
  "citation": "164.312(b)",
  "requirement": "Required",
  "appliesTo": [
   "BA",
   "CE"
  ],
  "description": "Record and examine activity in systems containing ePHI.",
  "evidence": [
   "Logging configuration (CloudTrail, app audit logs)",
   "log retention settings",
   "sample log extract"
  ],
  "mapped": "SOC 2 CC7.2; ISO A.8.15"
 },
 {
  "id": "HIPAA-TS-06",
  "name": "Integrity Controls",
  "category": "Technical Safeguards (164.312)",
  "citation": "164.312(c)",
  "requirement": "Addressable",
  "appliesTo": [
   "BA",
   "CE"
  ],
  "description": "Protect ePHI from improper alteration or destruction.",
  "evidence": [
   "Checksums/DB integrity controls",
   "change management records",
   "file integrity monitoring"
  ],
  "mapped": "SOC 2 CC8.1, PI1; ISO A.8.32"
 },
 {
  "id": "HIPAA-TS-07",
  "name": "Person or Entity Authentication",
  "category": "Technical Safeguards (164.312)",
  "citation": "164.312(d)",
  "requirement": "Required",
  "appliesTo": [
   "BA",
   "CE"
  ],
  "description": "Verify identity of anyone accessing ePHI; MFA for remote and privileged access.",
  "evidence": [
   "SSO/MFA enforcement screenshots",
   "password policy configuration"
  ],
  "mapped": "SOC 2 CC6.1; ISO A.8.5"
 },
 {
  "id": "HIPAA-TS-08",
  "name": "Transmission Security",
  "category": "Technical Safeguards (164.312)",
  "citation": "164.312(e)",
  "requirement": "Addressable",
  "appliesTo": [
   "BA",
   "CE"
  ],
  "description": "Protect ePHI in transit with integrity controls and encryption.",
  "evidence": [
   "TLS configuration and SSL scan results",
   "VPN config",
   "secure email/SFTP settings"
  ],
  "mapped": "SOC 2 CC6.7; ISO A.8.24"
 },
 {
  "id": "HIPAA-PD-01",
  "name": "Policies and Procedures",
  "category": "Policies, Procedures and Documentation (164.316)",
  "citation": "164.316(a)",
  "requirement": "Required",
  "appliesTo": [
   "BA",
   "CE"
  ],
  "description": "Implement reasonable and appropriate security policies and procedures.",
  "evidence": [
   "Approved policy set with version history and approver"
  ],
  "mapped": "SOC 2 CC5.3; ISO 5.2, A.5.1"
 },
 {
  "id": "HIPAA-PD-02",
  "name": "Documentation Retention and Review",
  "category": "Policies, Procedures and Documentation (164.316)",
  "citation": "164.316(b)",
  "requirement": "Required",
  "appliesTo": [
   "BA",
   "CE"
  ],
  "description": "Retain documentation for 6 years from creation or last effective date; make available to responsible staff; review periodically.",
  "evidence": [
   "Document retention schedule",
   "annual policy review evidence",
   "intranet/policy portal screenshot"
  ],
  "mapped": "SOC 2 CC2.2; ISO 7.5"
 },
 {
  "id": "HIPAA-BN-01",
  "name": "Breach Risk Assessment",
  "category": "Breach Notification (164.400 to 164.414)",
  "citation": "164.402",
  "requirement": "Required",
  "appliesTo": [
   "BA",
   "CE"
  ],
  "description": "Assess each impermissible use or disclosure using the four-factor test to determine if it is a reportable breach; document the outcome.",
  "evidence": [
   "Breach assessment template",
   "completed assessments",
   "breach log"
  ],
  "mapped": "SOC 2 CC7.4; ISO A.5.26"
 },
 {
  "id": "HIPAA-BA-01",
  "name": "Business Associate Agreement with Customers (upstream)",
  "category": "Organizational Requirements (164.314)",
  "citation": "164.314(a), 164.504(e)",
  "requirement": "Required",
  "appliesTo": [
   "BA"
  ],
  "description": "Sign a BAA with every Covered Entity customer before receiving PHI; track BAA terms.",
  "evidence": [
   "Executed customer BAAs",
   "BAA template",
   "customer BAA register"
  ],
  "mapped": ""
 },
 {
  "id": "HIPAA-BA-02",
  "name": "Subcontractor BAAs (downstream)",
  "category": "Organizational Requirements (164.314)",
  "citation": "164.308(b), 164.314(a)(2)(iii)",
  "requirement": "Required",
  "appliesTo": [
   "BA"
  ],
  "description": "Obtain BAAs from subcontractors and vendors that handle PHI (cloud, email, support tools, AI/LLM providers).",
  "evidence": [
   "Vendor inventory flagged for PHI",
   "executed subcontractor BAAs",
   "vendor risk assessments"
  ],
  "mapped": ""
 },
 {
  "id": "HIPAA-BA-03",
  "name": "Breach Notification to Covered Entity",
  "category": "Breach Notification (164.400 to 164.414)",
  "citation": "164.410",
  "requirement": "Required",
  "appliesTo": [
   "BA"
  ],
  "description": "Notify the Covered Entity without unreasonable delay and within 60 days of discovery (or the shorter contractual window in the BAA), including identities of affected individuals.",
  "evidence": [
   "IR plan section on CE notification",
   "notification templates",
   "contact list of CE customers",
   "past notifications"
  ],
  "mapped": ""
 },
 {
  "id": "HIPAA-BA-04",
  "name": "Permitted Uses and Disclosures per BAA",
  "category": "Privacy Rule (164.500 to 164.534)",
  "citation": "164.502(a)(3), 164.504(e)",
  "requirement": "Required",
  "appliesTo": [
   "BA"
  ],
  "description": "Use and disclose PHI only as the BAA permits; apply minimum necessary.",
  "evidence": [
   "Data use policy referencing BAAs",
   "data flow diagrams",
   "access restrictions to customer PHI"
  ],
  "mapped": ""
 },
 {
  "id": "HIPAA-BA-05",
  "name": "Support CE Individual Rights Requests",
  "category": "Privacy Rule (164.500 to 164.534)",
  "citation": "164.504(e)(2)(ii)(E) to (G)",
  "requirement": "Required",
  "appliesTo": [
   "BA"
  ],
  "description": "Make PHI available to the CE for access, amendment and accounting of disclosures requests within BAA timelines.",
  "evidence": [
   "Procedure for handling CE requests",
   "ticket samples",
   "disclosure log"
  ],
  "mapped": ""
 },
 {
  "id": "HIPAA-BA-06",
  "name": "Return or Destroy PHI at Termination",
  "category": "Organizational Requirements (164.314)",
  "citation": "164.504(e)(2)(ii)(J)",
  "requirement": "Required",
  "appliesTo": [
   "BA"
  ],
  "description": "On contract end, return or destroy PHI, or extend protections if infeasible.",
  "evidence": [
   "Offboarding/data deletion procedure",
   "deletion certificates",
   "customer termination records"
  ],
  "mapped": ""
 },
 {
  "id": "HIPAA-BA-07",
  "name": "Make Records Available to HHS",
  "category": "Organizational Requirements (164.314)",
  "citation": "164.504(e)(2)(ii)(I)",
  "requirement": "Required",
  "appliesTo": [
   "BA"
  ],
  "description": "Make internal practices, books and records available to HHS for compliance determination.",
  "evidence": [
   "BAA clause",
   "designated contact for regulator requests"
  ],
  "mapped": ""
 },
 {
  "id": "HIPAA-CE-01",
  "name": "Privacy Official and Contact Person",
  "category": "Privacy Rule (164.500 to 164.534)",
  "citation": "164.530(a)",
  "requirement": "Required",
  "appliesTo": [
   "CE"
  ],
  "description": "Designate a Privacy Official and a contact for complaints and information.",
  "evidence": [
   "Appointment record",
   "contact details published in NPP"
  ],
  "mapped": ""
 },
 {
  "id": "HIPAA-CE-02",
  "name": "Notice of Privacy Practices (NPP)",
  "category": "Privacy Rule (164.500 to 164.534)",
  "citation": "164.520",
  "requirement": "Required",
  "appliesTo": [
   "CE"
  ],
  "description": "Publish an NPP, post it on the website and premises, provide at first service delivery and obtain good-faith acknowledgement.",
  "evidence": [
   "Current NPP",
   "website screenshot",
   "signed acknowledgement samples"
  ],
  "mapped": ""
 },
 {
  "id": "HIPAA-CE-03",
  "name": "Right of Access",
  "category": "Privacy Rule (164.500 to 164.534)",
  "citation": "164.524",
  "requirement": "Required",
  "appliesTo": [
   "CE"
  ],
  "description": "Provide individuals access to and copies of their PHI within 30 days (one 30-day extension), at a reasonable cost-based fee.",
  "evidence": [
   "Access request procedure",
   "request log with response dates",
   "fee schedule"
  ],
  "mapped": ""
 },
 {
  "id": "HIPAA-CE-04",
  "name": "Right to Amend",
  "category": "Privacy Rule (164.500 to 164.534)",
  "citation": "164.526",
  "requirement": "Required",
  "appliesTo": [
   "CE"
  ],
  "description": "Act on amendment requests within 60 days; handle denials and statements of disagreement.",
  "evidence": [
   "Amendment procedure",
   "request log",
   "denial letters"
  ],
  "mapped": ""
 },
 {
  "id": "HIPAA-CE-05",
  "name": "Accounting of Disclosures",
  "category": "Privacy Rule (164.500 to 164.534)",
  "citation": "164.528",
  "requirement": "Required",
  "appliesTo": [
   "CE"
  ],
  "description": "Provide an accounting of disclosures for the previous 6 years within 60 days.",
  "evidence": [
   "Disclosure tracking log",
   "sample accounting provided"
  ],
  "mapped": ""
 },
 {
  "id": "HIPAA-CE-06",
  "name": "Requests for Restrictions and Confidential Communications",
  "category": "Privacy Rule (164.500 to 164.534)",
  "citation": "164.522",
  "requirement": "Required",
  "appliesTo": [
   "CE"
  ],
  "description": "Process restriction requests (must honour self-pay restriction to health plans) and alternative communication requests.",
  "evidence": [
   "Procedure",
   "request records",
   "system flags"
  ],
  "mapped": ""
 },
 {
  "id": "HIPAA-CE-07",
  "name": "Uses and Disclosures and Authorizations",
  "category": "Privacy Rule (164.500 to 164.534)",
  "citation": "164.502, 164.506, 164.508",
  "requirement": "Required",
  "appliesTo": [
   "CE"
  ],
  "description": "Use PHI for treatment, payment and operations; obtain valid authorization for other uses including marketing and sale of PHI.",
  "evidence": [
   "Uses and disclosures policy",
   "authorization form",
   "signed authorizations"
  ],
  "mapped": ""
 },
 {
  "id": "HIPAA-CE-08",
  "name": "Minimum Necessary Standard",
  "category": "Privacy Rule (164.500 to 164.534)",
  "citation": "164.502(b), 164.514(d)",
  "requirement": "Required",
  "appliesTo": [
   "CE"
  ],
  "description": "Limit uses, disclosures and requests to the minimum necessary.",
  "evidence": [
   "Minimum necessary policy",
   "role-based PHI access matrix"
  ],
  "mapped": ""
 },
 {
  "id": "HIPAA-CE-09",
  "name": "De-identification and Limited Data Sets",
  "category": "Privacy Rule (164.500 to 164.534)",
  "citation": "164.514",
  "requirement": "Required",
  "appliesTo": [
   "CE"
  ],
  "description": "Apply Safe Harbor or Expert Determination; use data use agreements for limited data sets.",
  "evidence": [
   "De-identification procedure",
   "expert determination report",
   "DUAs"
  ],
  "mapped": ""
 },
 {
  "id": "HIPAA-CE-10",
  "name": "Privacy Training",
  "category": "Privacy Rule (164.500 to 164.534)",
  "citation": "164.530(b)",
  "requirement": "Required",
  "appliesTo": [
   "CE"
  ],
  "description": "Train all workforce on privacy policies at onboarding and on material change.",
  "evidence": [
   "Privacy training material",
   "completion records"
  ],
  "mapped": ""
 },
 {
  "id": "HIPAA-CE-11",
  "name": "Complaints Process",
  "category": "Privacy Rule (164.500 to 164.534)",
  "citation": "164.530(d)",
  "requirement": "Required",
  "appliesTo": [
   "CE"
  ],
  "description": "Provide a process for individuals to file privacy complaints; document complaints and outcomes.",
  "evidence": [
   "Complaint procedure",
   "complaint log"
  ],
  "mapped": ""
 },
 {
  "id": "HIPAA-CE-12",
  "name": "Mitigation, Non-retaliation and No Waiver",
  "category": "Privacy Rule (164.500 to 164.534)",
  "citation": "164.530(f) to (h)",
  "requirement": "Required",
  "appliesTo": [
   "CE"
  ],
  "description": "Mitigate harmful effects of violations; no intimidation or retaliation; do not require waiver of rights.",
  "evidence": [
   "Policy statements",
   "incident mitigation records"
  ],
  "mapped": ""
 },
 {
  "id": "HIPAA-CE-13",
  "name": "Business Associate Management",
  "category": "Organizational Requirements (164.314)",
  "citation": "164.308(b), 164.502(e)",
  "requirement": "Required",
  "appliesTo": [
   "CE"
  ],
  "description": "Identify all BAs, execute BAAs before sharing PHI, and act on known BA violations.",
  "evidence": [
   "BA inventory",
   "executed BAAs",
   "vendor due diligence"
  ],
  "mapped": ""
 },
 {
  "id": "HIPAA-CE-14",
  "name": "Breach Notification to Individuals",
  "category": "Breach Notification (164.400 to 164.414)",
  "citation": "164.404",
  "requirement": "Required",
  "appliesTo": [
   "CE"
  ],
  "description": "Notify affected individuals within 60 days of discovery by first-class mail or email; substitute notice if contact info is insufficient.",
  "evidence": [
   "Notification letter template",
   "mailing records",
   "substitute notice records"
  ],
  "mapped": ""
 },
 {
  "id": "HIPAA-CE-15",
  "name": "Breach Notification to Media",
  "category": "Breach Notification (164.400 to 164.414)",
  "citation": "164.406",
  "requirement": "Required",
  "appliesTo": [
   "CE"
  ],
  "description": "For breaches affecting more than 500 residents of a state or jurisdiction, notify prominent media outlets within 60 days.",
  "evidence": [
   "Media notice template",
   "press release records"
  ],
  "mapped": ""
 },
 {
  "id": "HIPAA-CE-16",
  "name": "Breach Notification to HHS",
  "category": "Breach Notification (164.400 to 164.414)",
  "citation": "164.408",
  "requirement": "Required",
  "appliesTo": [
   "CE"
  ],
  "description": "500 or more individuals: notify HHS within 60 days. Fewer than 500: log and report to HHS within 60 days of calendar year end.",
  "evidence": [
   "HHS portal submission confirmations",
   "annual small-breach log"
  ],
  "mapped": ""
 },
 {
  "id": "HIPAA-CE-17",
  "name": "Group Health Plan Requirements (if applicable)",
  "category": "Organizational Requirements (164.314)",
  "citation": "164.314(b), 164.504(f)",
  "requirement": "Required",
  "appliesTo": [
   "CE"
  ],
  "description": "Plan documents must require the sponsor to safeguard ePHI.",
  "evidence": [
   "Plan documents with required provisions"
  ],
  "mapped": ""
 }
];

export const HIPAA_BA_CE_COMPARE = [
 [
  "Security Rule safeguards",
  "Fully applies",
  "Fully applies"
 ],
 [
  "Risk analysis",
  "Required",
  "Required"
 ],
 [
  "BAAs",
  "Sign with CE customers and subcontractors",
  "Sign with all BAs"
 ],
 [
  "Breach notice goes to",
  "The Covered Entity (within 60 days or BAA terms)",
  "Individuals, HHS, and media (if over 500 in a state)"
 ],
 [
  "Notice of Privacy Practices",
  "Not required",
  "Required"
 ],
 [
  "Individual rights (access, amend, accounting)",
  "Support the CE as BAA requires",
  "Directly responsible, with fixed timelines"
 ],
 [
  "Privacy Official",
  "Recommended, not mandated",
  "Required"
 ],
 [
  "Minimum necessary",
  "Applies to its own uses",
  "Applies"
 ],
 [
  "Documentation retention",
  "6 years",
  "6 years"
 ]
];
