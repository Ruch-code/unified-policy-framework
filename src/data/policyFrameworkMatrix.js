// Unified policy framework matrix: per document, framework coverage, audit-phase action plans, testing and evidence.
// Generic; no company names or customer data.
export const MATRIX_HEAD = ["Policy or document", "Framework coverage", "Control area", "Pre-audit action plan", "Observation or surveillance action plan", "Post-audit action plan", "Testing plan", "Evidence package", "Typical timeline"];

export const MATRIX = [
 [
  "Governance and compliance charter",
  "All frameworks: SOC 1; SOC 2; SOC 2 Type 1; SOC 2 Type 2; SOC 2 Type 1 and 2; ISO 27001; ISO 27701; ISO 42001; HIPAA; HITRUST; HITRUST E1; HITRUST R2; CMMC; NIST; NIST 800-171; NIST 800-53; NIST CSF 2.0; PCI; PCI DSS; PCI DSS SAQ-D; GDPR; CCPA; EU AI Act; DORA; NIS 2; FedRAMP; GovRAMP; TX-RAMP; CJIS; Cyber Essentials; Cyber Essentials Plus; Internal Audit; Pen Test",
  "Governance",
  "Define scope, systems, legal entities, locations, products, control owners, auditor, audit criteria, audit period, exclusions, and dependency map. Approve responsibility matrix and evidence tracker.",
  "Hold weekly audit or surveillance standup. Track control owner responses, aging requests, scope changes, and evidence refresh needs.",
  "Archive final scope, management assertion, report, corrective action register, lessons learned, and next cycle calendar.",
  "Inspect approved scope against system inventory, org chart, contracts, data flows, and auditor request list. Verify no in-scope system is missing.",
  "Scope memo; responsibility matrix; evidence tracker; auditor request list; management assertion",
  "Pre-audit weeks 1 to 2; observation monthly; post-audit week 1"
 ],
 [
  "Risk management policy and risk register",
  "SOC 2; ISO 27001; ISO 27701; ISO 42001; HIPAA; HITRUST; CMMC; NIST; NIST 800-171; NIST 800-53; NIST CSF 2.0; PCI DSS; GDPR; DORA; NIS 2; FedRAMP; GovRAMP; TX-RAMP; CJIS",
  "Risk management",
  "Update methodology, inherent risk scoring, treatment criteria, acceptance rules, AI risk criteria where applicable, privacy impact triggers, third-party risks, and risk owners. Refresh risk register.",
  "Review new risks from incidents, vendors, system changes, audit exceptions, AI use cases, and privacy events. Track treatment progress.",
  "Close remediated risks, accept residual risk with approval, add audit findings, and feed open items into POA&M or corrective action plan.",
  "Sample high risks and accepted risks. Verify treatment evidence, owner approval, due dates, and status. Check risks tie to controls and assets.",
  "Risk policy; risk register; treatment plans; risk acceptance approvals; quarterly review minutes",
  "Pre-audit weeks 1 to 4; observation monthly or quarterly; post-audit weeks 1 to 3"
 ],
 [
  "Information security policy set",
  "All security and privacy frameworks",
  "Policy governance",
  "Create or refresh the core policy set: information security, acceptable use, access control, asset management, data classification, cryptography, operations, incident response, BCDR, vendor management, HR security, physical security, secure development, privacy, AI governance where needed.",
  "Confirm annual acknowledgement and policy exceptions. Track policy deviations and temporary exceptions.",
  "Update policies for audit findings, business changes, and new regulatory obligations. Obtain re-approval.",
  "Check version history, approver, review cadence, employee acknowledgements, and exception records. Sample policies for alignment with actual practice.",
  "Approved policies; acknowledgements; exception log; version history",
  "Pre-audit weeks 1 to 6; observation annually and on change; post-audit weeks 2 to 4"
 ],
 [
  "Asset management policy and asset inventory",
  "SOC 2; ISO 27001; ISO 27701; ISO 42001; HIPAA; HITRUST; CMMC; NIST; NIST 800-171; NIST 800-53; PCI DSS; Cyber Essentials; Cyber Essentials Plus; FedRAMP; GovRAMP; CJIS; DORA; NIS 2",
  "Asset management",
  "Build inventory for endpoints, servers, cloud accounts, SaaS, network devices, databases, AI systems, data stores, and owners. Tag in-scope assets and CUI, PHI, cardholder data, personal data, or AI systems.",
  "Refresh inventory during observation. Review new assets, retired assets, ownership changes, and unmanaged devices.",
  "Reconcile audit exceptions and inventory gaps. Update CMDB or inventory source of truth.",
  "Sample assets from inventory and source systems. Verify owner, classification, endpoint protection, encryption, patch status, and disposal record if retired.",
  "Asset inventory; CMDB export; MDM export; cloud asset export; ownership records",
  "Pre-audit weeks 1 to 4; observation monthly; post-audit weeks 1 to 3"
 ],
 [
  "Data classification and handling standard",
  "SOC 2; ISO 27001; ISO 27701; HIPAA; HITRUST; CMMC; NIST 800-171; NIST 800-53; PCI DSS; GDPR; CCPA; FedRAMP; CJIS",
  "Data protection",
  "Define data classes, handling rules, retention, encryption, transmission, access, storage, disposal, labeling, and restricted data locations.",
  "Monitor handling exceptions, data movement, DLP alerts, storage changes, and user training completion.",
  "Update data maps and handling rules after audit findings or new processing activities.",
  "Select samples of restricted data stores. Verify classification, encryption, access controls, backup, retention, and disposal rules.",
  "Data classification standard; data inventory; data flow diagrams; retention schedule; DLP reports",
  "Pre-audit weeks 2 to 5; observation monthly or quarterly; post-audit weeks 2 to 4"
 ],
 [
  "Privacy program documents",
  "GDPR; CCPA; ISO 27701; HIPAA; HITRUST; EU AI Act",
  "Privacy",
  "Update privacy notice, RoPA, DPA templates, DPIA process, consent rules, data subject request procedure, cross-border transfer records, breach notification workflow, and subprocessor list.",
  "Track data subject requests, DPIAs, new processing activities, consent changes, vendor privacy reviews, and breach events.",
  "Close privacy audit findings, refresh notices, update RoPA and subprocessors, and record management review.",
  "Sample processing activities. Verify lawful basis, data categories, retention, processors, transfer mechanism, DSR response timing, and DPIA trigger decision.",
  "Privacy notice; RoPA; DPIAs; DSR log; DPA templates; subprocessor list; transfer impact assessments",
  "Pre-audit weeks 2 to 8; observation monthly; post-audit weeks 1 to 4"
 ],
 [
  "Access control policy and user access reviews",
  "All security frameworks plus privacy frameworks where personal data access is in scope",
  "Access control",
  "Define joiner, mover, leaver process, role based access, privileged access, MFA, SSO, password standard, service account rules, emergency access, and quarterly access review scope.",
  "Operate access reviews during observation. Track new hires, terminations, role changes, privileged access changes, and exceptions.",
  "Remediate stale access, update role matrix, preserve completed reviews, and add failures to corrective action plan.",
  "Sample users across critical systems. Verify approval before access, MFA, least privilege, timely removal, and quarterly review certification.",
  "Access control policy; access request tickets; HR roster; IAM exports; quarterly access review evidence; termination checklist",
  "Pre-audit weeks 2 to 6; observation monthly or quarterly; post-audit weeks 1 to 3"
 ],
 [
  "Privileged access management procedure",
  "SOC 2; ISO 27001; CMMC; NIST 800-171; NIST 800-53; PCI DSS; HITRUST; FedRAMP; CJIS",
  "Privileged access",
  "Inventory admin accounts, break-glass accounts, root accounts, database admins, cloud admins, security admins, and service accounts. Define approval, monitoring, rotation, and review rules.",
  "Review admin changes, emergency access use, privileged sessions, failed logins, and break-glass account status.",
  "Remove orphaned admin accounts, document exceptions, rotate exposed credentials, and update PAM procedure.",
  "Sample privileged accounts. Verify named ownership, MFA, approval, quarterly review, logging, and no shared unmanaged use.",
  "Privileged account inventory; PAM exports; admin access tickets; break-glass logs; service account register",
  "Pre-audit weeks 2 to 6; observation monthly; post-audit weeks 1 to 3"
 ],
 [
  "HR security and training documents",
  "SOC 2; ISO 27001; HIPAA; HITRUST; CMMC; NIST; NIST 800-171; PCI DSS; FedRAMP; CJIS; Cyber Essentials",
  "People security",
  "Update hiring screening, confidentiality agreements, security training, privacy training, role training, acceptable use acknowledgement, disciplinary process, and termination checklist.",
  "Track training completion, new hire training timing, role changes, and termination evidence.",
  "Remediate overdue training, update training content, and retain audit samples.",
  "Sample employees and contractors. Verify background check where required, signed agreements, completed training, access provisioning, and termination removal evidence.",
  "Training reports; HR roster; background check evidence; confidentiality agreements; termination tickets",
  "Pre-audit weeks 2 to 5; observation monthly; post-audit weeks 1 to 3"
 ],
 [
  "Security awareness and phishing program",
  "SOC 2; ISO 27001; HIPAA; HITRUST; CMMC; NIST; PCI DSS; FedRAMP; Cyber Essentials Plus",
  "Training",
  "Define annual security training, phishing simulation cadence, remedial training, policy acknowledgement, and role-based secure handling training.",
  "Run scheduled training and phishing tests. Track failures and remediation.",
  "Export final training evidence and document exceptions.",
  "Inspect training completion population against HR roster. Sample users who failed phishing and verify remedial training.",
  "Training platform report; phishing report; remedial training records; policy acknowledgements",
  "Pre-audit weeks 3 to 6; observation quarterly or annually; post-audit week 1"
 ],
 [
  "Incident response plan and incident log",
  "SOC 2; ISO 27001; ISO 27701; HIPAA; HITRUST; CMMC; NIST; NIST 800-171; NIST 800-53; PCI DSS; GDPR; CCPA; FedRAMP; GovRAMP; CJIS; DORA; NIS 2",
  "Incident response",
  "Update IR plan, severity model, escalation tree, breach notification triggers, forensic preservation, customer notification rules, regulator notification rules, tabletop schedule, and incident log fields.",
  "Track incidents and near misses. Run tabletop exercise if due. Preserve triage notes and closure evidence.",
  "Perform post-incident review, update plan, close corrective actions, and report material issues to leadership.",
  "Sample incidents. Verify severity assignment, timeline, containment, investigation, notification decision, root cause, corrective action, and closure approval.",
  "IR plan; incident log; tabletop report; post-incident reviews; notification decisions",
  "Pre-audit weeks 2 to 6; observation continuous; post-audit weeks 1 to 4"
 ],
 [
  "Business continuity and disaster recovery plan",
  "SOC 2; ISO 27001; HITRUST; HIPAA; NIST; PCI DSS; FedRAMP; GovRAMP; DORA; NIS 2",
  "Resilience",
  "Update BIA, RTO, RPO, backup strategy, DR runbooks, communication plan, critical vendor dependencies, and annual test plan.",
  "Run backup monitoring and DR testing during observation. Track failed backups and recovery exceptions.",
  "Close DR findings, update RTO or RPO assumptions, and retain test results.",
  "Inspect backup jobs and restore tests. Verify critical systems have defined RTO, RPO, backups, restore evidence, and issue remediation.",
  "BCDR policy; BIA; DR runbook; backup logs; restore test report; communication plan",
  "Pre-audit weeks 3 to 8; observation monthly backup review and annual test; post-audit weeks 1 to 4"
 ],
 [
  "Vendor and third-party risk management",
  "SOC 2; ISO 27001; ISO 27701; HIPAA; HITRUST; CMMC; NIST; NIST 800-171; NIST 800-53; PCI DSS; GDPR; CCPA; FedRAMP; DORA; NIS 2",
  "Vendor risk",
  "Build vendor inventory, criticality ratings, data access, security review criteria, privacy review criteria, SOC report collection, contract terms, and annual review cadence.",
  "Review new vendors and renewals. Track expiring SOC reports, DPAs, BAAs, and unresolved findings.",
  "Close vendor findings, update criticality, document accepted risks, and archive annual reviews.",
  "Sample critical vendors. Verify risk rating, security review, DPA or BAA if needed, SOC report review, contract controls, and approval before use.",
  "Vendor inventory; risk reviews; SOC report reviews; DPAs; BAAs; contracts; vendor findings",
  "Pre-audit weeks 3 to 8; observation monthly for new vendors and annual for existing; post-audit weeks 1 to 4"
 ],
 [
  "Secure SDLC policy",
  "SOC 2; ISO 27001; ISO 42001; HITRUST; CMMC; NIST 800-53; PCI DSS; FedRAMP; Cyber Essentials; Cyber Essentials Plus",
  "Application security",
  "Define change approval, peer review, branch protection, CI checks, SAST, dependency scanning, secrets scanning, release approvals, rollback, and emergency changes.",
  "Track production changes, failed security scans, emergency changes, and release approvals during observation.",
  "Remediate change control failures, update SDLC workflow, and preserve release evidence.",
  "Sample code changes. Verify ticket, approval, peer review, security scan, test result, deployment record, and segregation of duties if required.",
  "SDLC policy; change tickets; pull requests; CI logs; scan reports; release notes; emergency change log",
  "Pre-audit weeks 3 to 8; observation every release; post-audit weeks 1 to 3"
 ],
 [
  "Change management procedure",
  "SOC 2; ISO 27001; HITRUST; CMMC; NIST; PCI DSS; FedRAMP; DORA",
  "Change management",
  "Define normal, emergency, infrastructure, application, configuration, and AI model change rules. Map approvals, testing, rollback, and deployment evidence.",
  "Review weekly change samples. Track emergency changes, failed changes, and unauthorized changes.",
  "Close unauthorized change findings and update change approval workflow.",
  "Sample production changes. Verify risk assessment, approval, test evidence, deployment evidence, rollback plan, and emergency review.",
  "Change policy; change tickets; deployment logs; test records; CAB minutes",
  "Pre-audit weeks 3 to 6; observation weekly or monthly; post-audit weeks 1 to 3"
 ],
 [
  "Vulnerability management policy",
  "SOC 2; ISO 27001; HIPAA; HITRUST; CMMC; NIST; NIST 800-171; NIST 800-53; PCI DSS; FedRAMP; GovRAMP; Cyber Essentials; Cyber Essentials Plus; CJIS",
  "Vulnerability management",
  "Define scan scope, authenticated scanning, severity SLAs, exception process, patch ownership, external scanning, container scanning, and remediation tracking.",
  "Run scheduled scans. Track critical and high remediation against SLA. Monitor accepted risk exceptions.",
  "Close overdue vulnerabilities, document compensating controls, and preserve audit reports.",
  "Inspect scan coverage and sample vulnerabilities. Verify detection date, severity, owner, due date, fix evidence, retest evidence, and exception approval.",
  "Vulnerability policy; scan reports; remediation tickets; exception approvals; patch reports",
  "Pre-audit weeks 3 to 8; observation monthly or continuous; post-audit weeks 1 to 4"
 ],
 [
  "Penetration testing package",
  "SOC 2; ISO 27001; HITRUST; PCI DSS; CMMC; FedRAMP; Cyber Essentials Plus; Pen Test",
  "Security testing",
  "Confirm test scope, rules of engagement, tester independence, test dates, production safety, application targets, network targets, and retest process.",
  "During test, triage findings, assign owners, approve risk ratings, and coordinate retest windows.",
  "Close findings, obtain retest letter, document risk acceptance, and update vulnerability register.",
  "Verify testing was performed by qualified party. Sample findings and confirm remediation or accepted risk. Confirm critical and high findings have retest evidence.",
  "Rules of engagement; pen test report; remediation tickets; retest report; risk acceptances",
  "Pre-audit weeks 4 to 10; active test 1 to 3 weeks; post-audit 2 to 6 weeks"
 ],
 [
  "Logging and monitoring standard",
  "SOC 2; ISO 27001; HIPAA; HITRUST; CMMC; NIST; NIST 800-171; NIST 800-53; PCI DSS; FedRAMP; CJIS; DORA",
  "Security operations",
  "Define log sources, retention, alert rules, monitoring ownership, review cadence, time sync, security event escalation, and SIEM coverage.",
  "Review alerts, failed login trends, privileged actions, critical system logs, and incident escalations.",
  "Update alert tuning and close monitoring gaps from audit findings.",
  "Sample critical systems. Verify logs are enabled, centralized where required, retained, reviewed, protected from alteration, and tied to incident process.",
  "Logging standard; SIEM exports; alert reviews; retention settings; incident tickets",
  "Pre-audit weeks 4 to 8; observation weekly or monthly; post-audit weeks 1 to 3"
 ],
 [
  "Endpoint and mobile device security",
  "SOC 2; ISO 27001; HIPAA; HITRUST; CMMC; NIST; PCI DSS; Cyber Essentials; Cyber Essentials Plus; CJIS",
  "Endpoint security",
  "Define MDM coverage, disk encryption, screen lock, EDR, anti-malware, patching, local admin restrictions, device inventory, and remote wipe.",
  "Monitor compliance drift, malware alerts, encryption failures, missing EDR, and stale devices.",
  "Remediate noncompliant endpoints and update baseline profiles.",
  "Sample endpoints from HR roster and MDM. Verify encryption, EDR, patch level, screen lock, owner, and compliance status.",
  "MDM export; EDR report; device inventory; patch report; exception log",
  "Pre-audit weeks 3 to 8; observation weekly or monthly; post-audit weeks 1 to 3"
 ],
 [
  "Cloud security and configuration management",
  "SOC 2; ISO 27001; HITRUST; CMMC; NIST 800-53; PCI DSS; FedRAMP; GovRAMP; DORA",
  "Cloud security",
  "Inventory cloud accounts, critical services, IAM, network boundaries, encryption, backup, logging, CSPM rules, and baseline configuration.",
  "Monitor cloud misconfigurations, public exposure, privileged changes, encryption drift, and failed backups.",
  "Close misconfigurations and update secure baseline.",
  "Sample cloud resources. Verify encryption, logging, access control, network exposure, backup, tagging, and configuration compliance.",
  "Cloud inventory; CSPM reports; IAM exports; encryption settings; network diagrams; backup evidence",
  "Pre-audit weeks 4 to 10; observation continuous; post-audit weeks 1 to 4"
 ],
 [
  "Cryptography and key management standard",
  "SOC 2; ISO 27001; HIPAA; HITRUST; CMMC; NIST 800-171; NIST 800-53; PCI DSS; FedRAMP; CJIS",
  "Cryptography",
  "Define encryption at rest, encryption in transit, TLS baseline, key ownership, rotation, key storage, certificate management, FIPS requirements where applicable, and prohibited algorithms.",
  "Review key rotation, certificate expiration, weak cipher findings, and encryption exceptions.",
  "Rotate exposed or noncompliant keys, update standards, and document exceptions.",
  "Sample systems and data stores. Verify encryption configuration, key ownership, rotation evidence, certificate validity, and FIPS mode where required.",
  "Cryptography standard; KMS exports; certificate inventory; encryption configuration screenshots; exception records",
  "Pre-audit weeks 4 to 8; observation monthly or quarterly; post-audit weeks 1 to 3"
 ],
 [
  "Network security standard",
  "SOC 2; ISO 27001; HIPAA; HITRUST; CMMC; NIST; PCI DSS; FedRAMP; CJIS; Cyber Essentials",
  "Network security",
  "Document network boundaries, firewall rules, VPN, segmentation, wireless security, IDS or IPS, remote access, and cardholder or CUI network scope where applicable.",
  "Review firewall changes, exposed services, remote access use, and network alerts.",
  "Close rule review findings and update network diagrams.",
  "Sample firewall rules and remote access accounts. Verify business justification, approval, least privilege, MFA, logging, and timely removal.",
  "Network diagrams; firewall rule reviews; VPN logs; segmentation evidence; remote access reports",
  "Pre-audit weeks 4 to 8; observation quarterly; post-audit weeks 1 to 3"
 ],
 [
  "Physical security policy",
  "SOC 2; ISO 27001; HIPAA; HITRUST; CMMC; NIST; PCI DSS; FedRAMP; CJIS",
  "Physical security",
  "Define office access, visitor management, badge reviews, clean desk, device storage, media handling, and data center reliance on third-party attestations.",
  "Track visitor logs, badge access changes, and physical incidents.",
  "Close physical access review findings and update procedures.",
  "Sample employee badge access, visitor entries, and facility access reviews. Verify approval, removal, review, and monitoring.",
  "Physical security policy; badge access export; visitor logs; access review; data center SOC reports",
  "Pre-audit weeks 3 to 6; observation monthly or quarterly; post-audit weeks 1 to 3"
 ],
 [
  "AI governance policy",
  "ISO 42001; EU AI Act; NIST AI RMF if used; SOC 2 where AI systems affect services; GDPR where automated decisions process personal data",
  "AI governance",
  "Inventory AI systems, classify risk, define intended use, prohibited use, human oversight, data governance, model evaluation, bias testing, monitoring, vendor AI review, and incident handling.",
  "Monitor AI system changes, model performance, drift, complaints, incidents, human review, and regulatory classification changes.",
  "Close AI audit findings, update risk assessments, and refresh system cards or model cards.",
  "Sample AI systems. Verify owner, purpose, risk class, training data source, evaluation results, human oversight, monitoring, and vendor terms.",
  "AI policy; AI inventory; risk assessments; model cards; evaluation reports; monitoring records; user notices",
  "Pre-audit weeks 4 to 12; observation monthly or quarterly; post-audit weeks 2 to 6"
 ],
 [
  "CMMC and NIST 800-171 SSP package",
  "CMMC; NIST 800-171; NIST; NIST 800-53 where mapped",
  "CUI protection",
  "Define CUI scope, enclave, data flows, SSP, control implementation narratives, POA&M, SPRS score support, incident reporting, FIPS requirements, and subcontractor flowdowns.",
  "Maintain evidence for each assessment objective. Track POA&M closure, CUI boundary changes, access changes, and configuration drift.",
  "Update SSP, close POA&M items, retain assessor findings, and refresh evidence library.",
  "Test each control objective through interview, examine, and test methods. Verify implementation evidence matches SSP statements and CUI scope.",
  "SSP; POA&M; CUI data flow; asset inventory; access reviews; configuration baselines; training records",
  "Pre-audit 12 to 24 weeks; observation not formal unless required by customer; post-assessment 2 to 8 weeks"
 ],
 [
  "FedRAMP and GovRAMP authorization package",
  "FedRAMP; GovRAMP; TX-RAMP where applicable",
  "Authorization",
  "Prepare system security plan, control implementation summary, boundary diagrams, inventories, policies, procedures, POA&M, continuous monitoring plan, incident plan, contingency plan, and 3PAO or assessor coordination.",
  "Operate continuous monitoring. Submit monthly vulnerability scans, POA&M updates, incident reporting, change reporting, and annual assessment preparation.",
  "Respond to assessor findings, update POA&M, produce updated security package, and track authorization conditions.",
  "Test control families against NIST 800-53 baseline. Verify scan cadence, POA&M aging, continuous monitoring submissions, change control, and incident reporting.",
  "SSP; SAP; SAR; POA&M; inventory; monthly scan reports; control evidence; diagrams",
  "Pre-audit 6 to 18 months; continuous monitoring monthly; post-assessment 4 to 12 weeks"
 ],
 [
  "PCI DSS package",
  "PCI; PCI DSS; PCI DSS SAQ-D",
  "Cardholder data security",
  "Define cardholder data environment, SAQ type, network segmentation, policies, vulnerability scans, ASV scans, access reviews, logging, secure development, and service provider management.",
  "Maintain quarterly ASV scans, access reviews, vulnerability remediation, logging, and change control evidence.",
  "Remediate ROC or SAQ gaps, update AOC support, and preserve quarterly evidence.",
  "Test PCI controls by sampling CDE systems, access, firewall rules, scans, encryption, logging, change control, and vendor attestations.",
  "SAQ or ROC package; AOC; ASV scans; CDE diagram; access reviews; firewall reviews; vulnerability reports",
  "Pre-audit 6 to 16 weeks; observation quarterly where applicable; post-audit 2 to 6 weeks"
 ],
 [
  "HIPAA and HITRUST package",
  "HIPAA; HITRUST; HITRUST E1; HITRUST R2",
  "Healthcare security and privacy",
  "Update security risk analysis, privacy procedures, BAA inventory, incident and breach process, access controls, audit logs, device controls, contingency planning, and HITRUST validated assessment package if applicable.",
  "Track ePHI access, BAAs, security incidents, risk treatment, access reviews, and HITRUST evidence requests.",
  "Close corrective actions, update risk analysis, and preserve validated assessment evidence.",
  "Sample ePHI systems, workforce access, BAAs, audit logs, risk analysis items, incident decisions, and training evidence.",
  "Risk analysis; HIPAA policies; BAAs; access reviews; training; incident log; HITRUST MyCSF evidence",
  "Pre-audit 6 to 24 weeks depending on HITRUST level; observation as defined by assessment; post-audit 2 to 8 weeks"
 ],
 [
  "ISO management system package",
  "ISO 27001; ISO 27701; ISO 42001",
  "Management system",
  "Define ISMS, PIMS, or AIMS scope, statement of applicability, risk assessment, objectives, internal audit, management review, corrective action, competence, documented information, and operational controls.",
  "Operate internal audit, management review, objectives tracking, risk treatment, corrective actions, and control monitoring.",
  "Close nonconformities, update SoA, risk register, and next surveillance plan.",
  "Test management system evidence for scope, risk treatment, SoA coverage, internal audit independence, management review inputs, corrective actions, and control operation.",
  "ISMS or PIMS or AIMS manual; SoA; risk register; internal audit; management review; corrective action register",
  "Pre-audit 3 to 6 months; surveillance annually; post-audit 2 to 6 weeks"
 ],
 [
  "SOC readiness and attestation package",
  "SOC 1; SOC 2; SOC 2 Type 1; SOC 2 Type 2; SOC 2 Type 1 and 2",
  "Trust services and controls",
  "Finalize system description, control matrix, control owners, complementary user entity controls, subservice organizations, bridge letters, readiness assessment, and evidence tracker.",
  "For Type 2, collect evidence across the audit period. Run monthly control checks and remediate failures before auditor testing.",
  "Respond to exceptions, update control language, issue bridge letter if needed, and prepare next audit period.",
  "Test each control for design and operating effectiveness. Sample user access, change management, incidents, vendors, risk, training, backups, vulnerabilities, and monitoring.",
  "System description; control matrix; readiness report; monthly evidence; bridge letters; auditor PBC list",
  "Type 1 6 to 10 weeks; Type 2 prep 6 to 10 weeks plus 3 to 12 month observation; post-audit 1 to 4 weeks"
 ],
 [
  "Cyber Essentials package",
  "Cyber Essentials; Cyber Essentials Plus",
  "Baseline technical controls",
  "Validate firewalls, secure configuration, user access control, malware protection, patch management, and self-assessment answers. For Plus, prepare external test targets and endpoint samples.",
  "For Plus, support technical testing, remediate failures, and provide retest evidence.",
  "Close failed items and preserve certificate evidence.",
  "Check sampled devices against five technical control themes. For Plus, validate assessor test results and remediation.",
  "Self-assessment; device inventory; firewall settings; patch reports; malware protection report; assessor test report",
  "Pre-audit 2 to 8 weeks; active test 1 to 2 weeks; post-audit 1 to 3 weeks"
 ],
 [
  "DORA and NIS 2 operational resilience package",
  "DORA; NIS 2",
  "Operational resilience",
  "Define ICT risk management, incident reporting, resilience testing, third-party ICT provider management, governance oversight, business continuity, and vulnerability handling.",
  "Track incidents, resilience exercises, third-party concentration risk, vulnerability remediation, and board reporting.",
  "Close regulator or audit findings, update resilience plan, and document lessons learned.",
  "Sample ICT incidents, third-party reviews, resilience tests, BCDR evidence, vulnerability SLAs, and governance minutes.",
  "ICT risk framework; incident reports; BCDR tests; third-party register; board reports; vulnerability reports",
  "Pre-audit 8 to 16 weeks; observation continuous; post-audit 2 to 6 weeks"
 ],
 [
  "CJIS package",
  "CJIS",
  "Criminal justice information security",
  "Map CJIS Security Policy requirements, define CJI scope, user agreements, personnel screening, encryption, access control, incident reporting, media protection, audit logging, and agency coordination.",
  "Track access, training, incident reporting, system changes, and agency-specific evidence requests.",
  "Close audit findings and update CJIS scope and procedures.",
  "Sample CJI access, MFA, encryption, logging, training, screening, and incident records against CJIS requirements.",
  "CJIS policy mapping; user agreements; screening evidence; access reviews; training; encryption and logging evidence",
  "Pre-audit 8 to 16 weeks; observation continuous; post-audit 2 to 6 weeks"
 ]
];

// Audit lifecycle reference tables (generic; company names and customer counts removed).
export const PHASE_STEPS_HEAD = ['Phase', 'Step', 'What to do', 'Output'];
export const PHASE_STEPS = [
  ['Pre-audit', '1', 'Confirm framework, audit type, scope, systems, legal entity, locations, products, data types and exclusions.', 'Scope memo'],
  ['Pre-audit', '2', 'Build the control matrix. Map framework requirements to your unified controls and the evidence for each.', 'Control matrix'],
  ['Pre-audit', '3', 'Confirm required documents: policies, procedures, registers, inventories, diagrams, management review, risk register, vendor list, access reviews, training, IR, BCDR, SDLC, vulnerability management.', 'Document tracker'],
  ['Pre-audit', '4', 'Assign owners and deadlines. Every control needs one owner, evidence source, frequency and testing method.', 'RACI and evidence tracker'],
  ['Pre-audit', '5', 'Run readiness testing. Test design first, then operating evidence.', 'Readiness report'],
  ['Pre-audit', '6', 'Remediate gaps. Update policies, fix control failures, collect missing evidence and document accepted risks.', 'Remediation tracker'],
  ['Pre-audit', '7', 'Package evidence for the auditor. Avoid raw dumps. Provide named files, date ranges, owners and control references.', 'Auditor PBC package'],
  ['During observation or surveillance', '1', 'Operate controls on schedule: monthly access checks, vulnerability scans, change reviews, backup reviews, vendor reviews, incident tracking.', 'Monthly control evidence'],
  ['During observation or surveillance', '2', 'Monitor exceptions: missed controls, late evidence, failed tests, overdue vulnerabilities, stale access and policy exceptions.', 'Exception log'],
  ['During observation or surveillance', '3', 'Refresh evidence continuously. Do not wait until audit week.', 'Rolling evidence library'],
  ['During observation or surveillance', '4', 'Respond to auditor requests. Route each request to an owner and keep response history.', 'Auditor request log'],
  ['During observation or surveillance', '5', 'Retest failed controls quickly. Preserve both failure and remediation evidence.', 'Retest evidence'],
  ['Post-audit', '1', 'Review findings, exceptions, nonconformities or observations.', 'Audit findings register'],
  ['Post-audit', '2', 'Create corrective action plans with owner, root cause, remediation, due date and verification method.', 'CAPA or POA&M'],
  ['Post-audit', '3', 'Update policies and control descriptions. Fix gaps between written policy and actual operation.', 'Updated policy set'],
  ['Post-audit', '4', 'Archive final evidence and report. Preserve the audit package by period.', 'Final audit archive'],
  ['Post-audit', '5', 'Plan the next cycle: surveillance dates, recurring control tests, internal audit, management review and renewal prep.', 'Next-cycle calendar'],
];

export const TEST_PLAN_HEAD = ['Test area', 'What to test', 'Sample evidence'];
export const TEST_PLAN = [
  ['Governance', 'Scope, roles, approvals, management review, audit ownership', 'Scope memo, org chart, management review minutes'],
  ['Risk management', 'Risk methodology, register, treatment plans, accepted risks', 'Risk register, risk acceptance approvals'],
  ['Policies', 'Approval, version history, annual review, employee acknowledgement', 'Approved policy PDFs, acknowledgement report'],
  ['Asset management', 'Complete inventory, ownership, classification, in-scope tagging', 'CMDB, MDM, cloud inventory'],
  ['Access control', 'Provisioning, approval, MFA, least privilege, terminations, reviews', 'IAM exports, tickets, access review sign-offs'],
  ['Privileged access', 'Admin inventory, approval, monitoring, emergency access', 'PAM exports, admin access tickets'],
  ['HR security', 'Background checks, confidentiality, training, offboarding', 'HR roster, training report, termination checklist'],
  ['Vendor risk', 'Critical vendor reviews, DPAs, BAAs, SOC reports, renewals', 'Vendor register, SOC reviews, contracts'],
  ['Change management', 'Approval, testing, deployment, emergency changes, rollback', 'Change tickets, PRs, CI logs'],
  ['Secure SDLC', 'Code review, SAST, dependency scanning, secrets scanning', 'Pull requests, scan reports'],
  ['Vulnerability management', 'Scan cadence, coverage, SLA remediation, exceptions', 'Scanner exports, remediation tickets'],
  ['Incident response', 'Severity, escalation, containment, notification, closure', 'Incident log, tabletop report'],
  ['BCDR', 'Backup success, restore testing, RTO, RPO, DR runbook', 'Backup logs, restore test report'],
  ['Logging and monitoring', 'Log coverage, retention, alert review, escalation', 'SIEM exports, alert reviews'],
  ['Privacy', 'RoPA, DPIAs, DSRs, lawful basis, processors, transfers', 'RoPA, DPIA records, DSR log'],
  ['AI governance', 'AI inventory, risk classification, oversight, monitoring', 'AI register, model cards, evaluation reports'],
  ['Framework-specific packages', 'SSP, SoA, SAQ, AOC, SAR, POA&M, system description', 'Framework-specific audit package'],
];

export const EVAL_MODEL_HEAD = ['Phase', 'Evaluation objective', 'Evidence to ask for', 'Controls to test'];
export const EVAL_MODEL = [
  ['Gap assessment', 'Identify missing controls, weak design, missing documents and evidence gaps before audit work starts.', 'Scope, org chart, asset inventory, system diagram, policy set, risk register, vendor register, IAM exports, MDM exports, vulnerability scans, incident log, training report, employee roster, audit history.', 'Control design, applicability, ownership, frequency, evidence source, operating maturity.'],
  ['Pre-audit readiness', 'Build or clean up the programme so audit evidence is complete and defensible.', 'Approved policies, procedures, control matrix, access reviews, change tickets, backup logs, security training, background checks, vendor reviews, risk treatment plans, BCDR tests, tabletop exercises.', 'Access control, HR security, vendor risk, risk management, change management, vulnerability management, logging, incident response, BCDR, policy governance.'],
  ['Observation or audit period', 'Prove controls operate over the required period. For Type 2 and surveillance, this is recurring evidence; for point-in-time frameworks, audit-window evidence.', 'Monthly access reviews, vulnerability scans, change approvals, onboarding and offboarding samples, backup reviews, alert reviews, incident records, vendor monitoring, remediation evidence.', 'Operating effectiveness, sample testing, control consistency, exception handling, SLA adherence.'],
  ['Report or certification issuance', 'Support auditor or assessor testing, respond to requests, resolve findings and finalise the report.', 'PBC package, auditor request log, final evidence exports, exception explanations, management representation letter, corrective action plan, signed policies, final scope.', 'Completeness, traceability, sample support, final remediation, management approval.'],
  ['Surveillance or next cycle', 'Maintain compliance after issuance and prepare for surveillance or renewal.', 'Internal audit report, management review, CAPA or POA&M, refreshed risk register, updated vendor reviews, continuous monitoring logs, annual policy review.', 'Recurring controls, corrective actions, scope changes, surveillance readiness, audit calendar discipline.'],
];

export const FAMILY_TESTS_HEAD = ['Control family', 'Gap assessment test', 'Pre-audit test', 'Observation or audit test', 'Report issuance test', 'Surveillance test'];
export const FAMILY_TESTS = [
  ['Governance', 'Confirm scope, owners, audit objective, legal entity.', 'Verify approvals, responsibilities, audit calendar.', 'Check recurring governance meetings and escalations.', 'Confirm management approval and representation.', 'Test annual review and ownership changes.'],
  ['Risk management', 'Review risk methodology and register completeness.', 'Test risk scoring, treatment decisions, accepted risks.', 'Confirm risks are updated when issues occur.', 'Verify open risks and treatment plans are disclosed.', 'Review quarterly risk updates and overdue treatments.'],
  ['Policies', 'Identify missing or stale policies.', 'Test approval, version history, owner, employee acknowledgement.', 'Confirm policy exceptions are tracked.', 'Verify final approved policy package.', 'Annual policy review and acknowledgement.'],
  ['Asset management', 'Check inventory coverage and ownership.', 'Test endpoint, cloud, SaaS, code, data and AI inventories.', 'Sample assets against MDM, cloud, IAM and scanner data.', 'Confirm scoped assets match audit package.', 'Quarterly inventory reconciliation.'],
  ['Access control', 'Identify missing MFA, stale users, weak joiner-mover-leaver process.', 'Test provisioning, approval, least privilege, termination.', 'Sample access grants, removals, privileged access, reviews.', 'Confirm access exceptions and remediation.', 'Monthly or quarterly access reviews.'],
  ['Vendor risk', 'Check vendor register and criticality ratings.', 'Test due diligence, contracts, DPAs, BAAs, SOC report reviews.', 'Sample vendor reviews and renewal monitoring.', 'Confirm high-risk vendor issues are tracked.', 'Annual vendor reassessment.'],
  ['Change management', 'Review SDLC and production change process.', 'Test approval, peer review, testing, deployment evidence.', 'Sample changes across the audit period.', 'Confirm emergency changes and exceptions.', 'Quarterly change sample review.'],
  ['Vulnerability management', 'Review scan coverage and SLA definitions.', 'Test scanner setup, remediation workflow, exception approvals.', 'Sample vulnerabilities against SLA and closure evidence.', 'Confirm open findings and risk acceptance.', 'Monthly scan review and SLA tracking.'],
  ['Incident response', 'Review incident policy and severity model.', 'Test tabletop, escalation paths, breach notification workflow.', 'Sample incidents or confirm no-incident attestation.', 'Confirm incident disclosures.', 'Annual tabletop and incident log review.'],
  ['BCDR', 'Review backup, restore, DR and continuity scope.', 'Test backup monitoring, restore test, RTO and RPO evidence.', 'Sample backup success and DR evidence.', 'Confirm failed tests and corrective actions.', 'Annual DR test and recurring backup review.'],
  ['Logging and monitoring', 'Review log sources, retention and alerting.', 'Test SIEM coverage, alert workflow, escalation.', 'Sample alerts and investigations.', 'Confirm monitoring exceptions.', 'Quarterly log source review.'],
  ['Privacy', 'Review data inventory, notices, DSRs, processors.', 'Test RoPA, DPIAs, DPAs, DSR workflow.', 'Sample DSRs, DPIAs, breach workflow, transfer controls.', 'Confirm privacy remediation.', 'Quarterly RoPA and DSR review.'],
  ['AI governance', 'Review AI inventory and use cases.', 'Test AI risk classification, approval, oversight, monitoring.', 'Sample AI system approvals and monitoring evidence.', 'Confirm AI risks and controls.', 'Quarterly AI inventory and risk review.'],
];

export const FW_LIFECYCLE_HEAD = ['Framework', 'Gap assessment focus', 'Pre-audit evaluation and evidence', 'Observation or audit evidence', 'Report, certification or issuance', 'Surveillance or next cycle plan'];
export const FW_LIFECYCLE = [
  ['CCPA', 'Privacy notices, consumer rights workflow, data inventory, third-party sharing, retention.', 'Privacy policy, data map, consumer request process, retention schedule, vendor list, opt-out mechanism.', 'Test DSR intake, identity verification, response timelines, deletion and access request samples.', 'Privacy compliance memo and remediation tracker. No formal certification.', 'Quarterly DSR review, annual notice review, vendor sharing review.'],
  ['CJIS', 'CJIS Security Policy alignment, access, encryption, personnel screening, incident response.', 'CJIS scope, user list, MFA, encryption evidence, background checks, media protection, agency agreements.', 'Test access approvals, audit logs, encryption, incident procedures, account removal.', 'Agency or assessor review package.', 'Annual CJIS review, access recertification, policy updates.'],
  ['CMMC', 'CUI scope, NIST 800-171 practices, SSP, POA&M, evidence maturity, SPRS readiness.', 'SSP, CUI boundary, asset inventory, network diagram, policies, procedures, POA&M, evidence by practice.', 'Test the NIST 800-171 requirements for adequacy, implementation and evidence.', 'C3PAO assessment package, findings closure, certification decision.', 'Continuous monitoring, POA&M closure, annual affirmation, triennial certification prep.'],
  ['Cyber Essentials', 'Boundary, firewalls, secure configuration, access, malware protection, patching.', 'Self-assessment answers, asset list, firewall rules, MFA, patch policy, malware controls.', 'Validate sample devices, patch status, admin access, firewall exposure.', 'Cyber Essentials submission support.', 'Annual renewal, quarterly patch and exposure checks.'],
  ['Cyber Essentials Plus', 'Same as Cyber Essentials, plus technical verification readiness.', 'Cyber Essentials evidence, external scan prep, endpoint inventory, patch evidence.', 'External vulnerability testing, endpoint checks, malware protection validation.', 'Certification after passing technical test.', 'Annual retest, monthly vulnerability remediation.'],
  ['DORA', 'ICT risk management, incident reporting, resilience testing, third-party risk, governance.', 'ICT risk register, incident process, resilience test plan, vendor register, exit plans, board reporting.', 'Test incident classification, resilience evidence, vendor oversight, backup and recovery.', 'DORA readiness report. Regulatory compliance outcome, not certification.', 'Annual resilience testing, vendor monitoring, incident reporting drills.'],
  ['EU AI Act', 'AI system inventory, risk classification, governance, transparency, human oversight.', 'AI register, model risk assessment, data governance, user disclosures, vendor AI reviews.', 'Test model approval, risk classification, monitoring, incident logging, human oversight.', 'AI governance readiness report. Conformity assessment depends on system type.', 'AI inventory refresh, risk review, monitoring, incident review.'],
  ['FedRAMP', 'System boundary, NIST 800-53 controls, SSP, SAP, SAR, POA&M, continuous monitoring.', 'SSP, inventory, architecture, FIPS evidence, policies, procedures, control implementation statements.', '3PAO testing, vulnerability scans, interviews, evidence sampling, POA&M validation.', 'SAR package, authorization decision, ATO support.', 'Monthly ConMon, annual assessment, POA&M updates.'],
  ['GDPR', 'RoPA, lawful basis, DSRs, DPIAs, processors, transfers, breach response.', 'RoPA, DPIAs, privacy notices, DPA templates, SCCs, DSR procedure, breach procedure.', 'Test DSRs, DPIA process, vendor DPAs, transfer assessments, breach notification workflow.', 'GDPR readiness report. No universal certification.', 'Quarterly privacy review, annual RoPA and notice refresh.'],
  ['GovRAMP', 'GovRAMP controls, SSP, 3PAO testing, vulnerability management, POA&M.', 'SSP, policies, system boundary, architecture, inventory, vulnerability scans, control evidence.', '3PAO assessment, scans, interviews, implementation testing.', 'Authorization package and decision support.', 'Monthly ConMon, annual review, POA&M management.'],
  ['HIPAA', 'Security Rule, Privacy Rule, Breach Rule, ePHI scope, BAAs, risk analysis.', 'HIPAA risk analysis, policies, BAAs, asset inventory, access controls, training, incident plan.', 'Test access, audit logging, workforce training, vendor BAAs, risk remediation.', 'HIPAA assessment report. No HHS certification.', 'Annual risk analysis, BAA refresh, training, access reviews.'],
  ['HITRUST', 'HITRUST requirement statements, scope, inheritance, policy maturity, validated evidence.', 'MyCSF scope, policy set, procedure set, risk register, evidence mapped to HITRUST requirements.', 'Test implementation and maturity levels using HITRUST methodology.', 'Validated assessment and certification decision.', 'Interim assessment, corrective actions, continuous evidence.'],
  ['HITRUST e1', 'Essentials 1-year HITRUST control set and evidence sufficiency.', 'e1 scope, policies, access, risk, vendor, incident, BCDR and vulnerability evidence.', 'HITRUST e1 evidence testing and assessor validation.', 'e1 certification package.', 'Annual renewal and continuous evidence collection.'],
  ['HITRUST r2', 'Full risk-based HITRUST control set, maturity, scope factors.', 'r2 scoped control matrix, policy, procedure, system and maturity evidence.', 'Validated assessor testing across sampled requirements.', 'r2 validated report and certification decision.', 'Interim assessment, CAP remediation, continuous monitoring.'],
  ['Internal audit', 'Audit objective, control universe, sample population, issue history.', 'Audit plan, control list, evidence request list, population exports, prior findings.', 'Sample testing, walkthroughs, re-performance, issue validation.', 'Internal audit report and management action plan.', 'Follow-up testing and issue closure validation.'],
  ['ISO 27001', 'ISMS scope, risk assessment, SoA, Annex A controls, internal audit, management review.', 'ISMS scope, risk register, risk treatment plan, SoA, policy set, internal audit, management review.', 'Stage 1 document review, Stage 2 implementation testing, control samples.', 'ISO 27001 certificate after successful certification audit.', 'Annual surveillance audits, recertification every 3 years.'],
  ['ISO 27701', 'PIMS scope, privacy roles, PII controller and processor obligations, ISO 27001 dependency.', 'PIMS scope, privacy policies, RoPA, DPIAs, DSR process, processor controls, SoA updates.', 'Test privacy governance, DSRs, DPIAs, vendor privacy controls.', 'ISO 27701 certificate or extension.', 'Annual surveillance aligned to the ISO cycle.'],
  ['ISO 42001', 'AI management system scope, AI risk, lifecycle governance, impact assessment.', 'AI policy, AI inventory, AI risk register, impact assessments, monitoring process, supplier AI reviews.', 'Test AI lifecycle approvals, risk treatment, monitoring, incident handling.', 'ISO 42001 certification decision.', 'Annual surveillance, AI risk refresh, lifecycle evidence.'],
  ['NIS 2', 'Governance, risk management, incident reporting, supply chain, resilience.', 'Risk register, incident process, supplier controls, BCDR plan, security policies, board oversight.', 'Test incident escalation, supplier review, backup recovery, access, vulnerability remediation.', 'NIS 2 readiness report. Regulatory compliance outcome.', 'Annual governance review, incident drills, supplier monitoring.'],
  ['Penetration test', 'Scope, rules of engagement, target readiness, previous findings.', 'ROE, asset list, credentials, architecture, testing window, prior report.', 'Exploitation testing, validation, screenshots, severity ratings, retesting.', 'Pen test report and remediation tracker.', 'Retest critical and high findings; annual or release-based testing.'],
  ['SOC 1', 'Control objectives, user entity controls, process scope, system description.', 'System description, control matrix, population exports, policies, procedures, evidence samples.', 'Type 1 tests design at a point in time. Type 2 tests operating effectiveness over the period.', 'SOC 1 report issued by a CPA firm.', 'Next Type 2 period planning, exception remediation.'],
  ['SOC 2', 'Trust Services Criteria scope, service commitments, system description, controls.', 'System description, TSC mapping, policies, risk register, vendor reviews, access, change, incident evidence.', 'Type 1 point-in-time or Type 2 operating evidence across the observation period.', 'SOC 2 report issued by a CPA firm.', 'Continuous evidence, annual Type 2 renewal, exception closure.'],
  ['SOC 2 Type 1', 'Design of controls at a point in time.', 'System description, control matrix, policies, access lists, risk register, vendor register.', 'Auditor tests control design and implementation as of the report date.', 'Type 1 report issued.', 'Convert to Type 2 readiness and start the observation period.'],
  ['SOC 2 Type 1 then Type 2', 'Initial design readiness, then operating effectiveness period.', 'Type 1 package first, then a recurring evidence calendar for Type 2.', 'Type 1 point-in-time testing, then Type 2 sample testing across observation.', 'Type 1 report, followed by Type 2 report after observation.', 'Annual Type 2 cycle and control monitoring.'],
  ['SOC 2 Type 2', 'Operating effectiveness over 3 to 12 months.', 'Final system description, control matrix, audit period evidence plan, monthly control schedule.', 'Samples for access, change, vulnerability, vendor, incident, BCDR, training, risk and policy controls.', 'Type 2 report issued by a CPA firm.', 'Annual renewal, exception remediation, evidence automation.'],
  ['TX-RAMP', 'Texas cloud authorization requirements, baseline controls, vulnerability management.', 'Scope, SSP-style package, policies, inventory, diagrams, scans, access evidence.', 'Control testing, vulnerability evidence, remediation evidence.', 'TX-RAMP authorization support package.', 'Continuous monitoring and annual renewal support.'],
];
export const TIMELINE_NOTE = 'Timelines should be set by audit type. Point-in-time certifications usually need 6 to 10 weeks of readiness. Type 2, surveillance, FedRAMP, GovRAMP, HITRUST, CMMC and ISO programmes need a longer operating window because evidence has to prove controls ran consistently.';
