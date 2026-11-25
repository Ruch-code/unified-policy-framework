// Infrastructure security review playbook: how to assess and report findings, plus two worked scenarios
// (overdue production key rotation, contractor access). Port tables and firewall basics live in the
// Infra & Network Audit topic and are linked, not repeated. Generic: no company names or personal data.

export const PARTS = [
  ['approach', 'Review approach'],
  ['lens', 'Infrastructure leadership lens'],
  ['domains', 'Domain review checklist'],
  ['firewall', 'Firewall rule review register'],
  ['key', 'Scenario: overdue key rotation'],
  ['contractor', 'Scenario: contractor access'],
];

export const APPROACH = [
  'Do not assume a control works unless evidence is provided. Where evidence is missing, mark the item "Not evidenced" and name the exact artifact needed (for example "firewall rule export with last-hit dates", not "firewall evidence").',
  'Report in this order: executive summary, critical risks, then network security, BC/DR, incident response, access management, firewall rule review, prioritised remediation roadmap, and evidence needed to close gaps.',
  'Ask for metadata, logs, screenshots, tickets and configuration exports only. Never ask for secret values, passwords, tokens or private keys.',
];

export const FINDING_FIELDS = [
  ['Finding title', 'Short, specific: "RDP open to the internet on two jump hosts"'],
  ['Affected asset or rule', 'Hostname, account, rule ID or system'],
  ['Risk level', 'Critical, High, Medium or Low'],
  ['Evidence observed', 'What was seen, or "Not evidenced" with the artifact needed'],
  ['Business impact', 'What happens to customers, revenue, compliance or operations if exploited or if it fails'],
  ['Recommended fix', 'The change, not just the goal'],
  ['Owner', 'Named role accountable for the fix'],
  ['Target remediation date', 'Based on risk level and effort'],
  ['Validation method', 'How closure will be proved, for example re-scan, config export or restore test'],
  ['Infra priority', 'P0 now, P1 this sprint or month, P2 this quarter, P3 backlog'],
  ['Estimated effort', 'Small (days), medium (weeks), large (months or a project)'],
  ['Implementation risk', 'Chance the fix itself causes an outage or regression'],
  ['Rollback plan', 'How to undo the change if it breaks something'],
  ['Dependency teams', 'Teams that must act or approve, for example network, platform, application owners, HR, procurement'],
];

// [question, why it matters]
export const LENS = [
  ['What is the outage risk?', 'Both of leaving it and of fixing it. Some fixes (key rotation, firewall tightening, MFA enforcement) can break production if rushed.'],
  ['What is the blast radius?', 'How many systems, customers or environments are affected if this is exploited or fails.'],
  ['What is the operational burden?', 'Ongoing effort the control adds: manual reviews, on-call load, approvals.'],
  ['What is the engineering effort to fix?', 'Size it honestly; a one-line config change and a network redesign are not the same ask.'],
  ['What dependencies could delay it?', 'Vendor support, change freezes, application owners, licences, other teams\' roadmaps.'],
  ['Configuration or architecture change?', 'Configuration fixes (enable MFA, close a port, turn on logging) are fast. Architecture fixes (segmentation, removing a single point of failure) need a project.'],
  ['Retire instead of harden?', 'Legacy hosts, unused VPNs, old admin interfaces and unowned rules are often cheaper and safer to remove than to secure.'],
  ['Accept temporarily with monitoring?', 'Where a fix needs time, a time-bound exception with compensating monitoring and an expiry date keeps risk visible.'],
  ['Needs budget, headcount or executive escalation?', 'New tooling, redundancy, a second region or extra staff need a decision above the infrastructure team.'],
];

// [finding type, typical risk, fix type, infra priority, effort, implementation risk, rollback, owner, dependency teams]
export const LENS_EXAMPLES = [
  ['RDP, SSH or database port open to the internet', 'Critical', 'Configuration', 'P0', 'Small', 'Low to medium: may cut off legitimate admin access', 'Restore the previous rule from the change record', 'Network or cloud lead', 'Application owners, IT support'],
  ['Flat network with no segmentation between production and corporate', 'High', 'Architecture', 'P1 to start, delivered over a quarter', 'Large', 'High: traffic flows break if dependencies are unmapped', 'Phase by segment; keep allow rules ready to re-enable', 'Network architect', 'Every application team, security'],
  ['Admin interface exposed and unused', 'High', 'Retire', 'P1', 'Small', 'Low', 'Re-enable from backup config', 'System owner', 'Network'],
  ['Backups never restore-tested', 'High', 'Process plus configuration', 'P1', 'Medium', 'Low if tested in isolation', 'Not applicable (test only)', 'Platform or SRE lead', 'Database owners'],
  ['Single region, no failover for a critical service', 'High', 'Architecture', 'P2 with executive decision', 'Large', 'Medium', 'Fail back to primary', 'Head of Infrastructure', 'Finance (budget), application teams'],
  ['Missing MFA on a SaaS admin console', 'Critical', 'Configuration', 'P0', 'Small', 'Low', 'Disable the enforcement policy for named users only', 'IT or identity lead', 'SaaS owner'],
  ['No incident playbook for cloud account compromise', 'Medium', 'Process', 'P2', 'Medium', 'None', 'Not applicable', 'Security lead', 'Cloud, legal, communications'],
  ['Legacy system cannot support SSO', 'High', 'Accept temporarily, then replace', 'P2 exception, P1 replacement plan', 'Medium to large', 'Medium', 'Not applicable', 'System owner', 'Procurement, vendor'],
];

// [domain, what to review, red flags]
export const DOMAINS = [
  ['Network security', 'Internal, external, cloud, VPN, wireless and third-party paths; segmentation between production, corporate, guest, development, management and sensitive data; ingress and egress; exposed public services; IDS/IPS, WAF, DDoS protection, DNS security, logging, scanning and patching.', 'Flat networks, unrestricted east-west traffic, exposed admin interfaces, weak encryption, missing monitoring, unmanaged assets.'],
  ['Business continuity and DR', 'BIA, critical systems and dependencies, RTO and RPO, backup frequency, encryption, immutability and offsite copies, runbooks, failover design, restore testing, who can delete backups.', 'Undefined or untested RTO and RPO, backups deletable by the same admins as production, single points of failure, no ransomware protection for backups.'],
  ['Incident response', 'Plan, roles, escalation, severity levels, evidence handling, communication, legal, customer and regulator notification, post-incident review; playbooks for phishing, ransomware, malware, account compromise, data breach, cloud compromise, insider threat, DDoS, lost device and third-party breach; central, tamper-protected, reviewed logs.', 'Missing playbooks, unclear ownership, never tested, no forensic readiness, logs that admins can delete.'],
  ['Access management', 'IdP, SSO, MFA, RBAC, privileged access, service, shared and break-glass accounts, joiner-mover-leaver, access reviews, password policy, conditional access, session timeout, admin logging.', 'Missing MFA, excessive admin rights, stale accounts, orphaned service accounts, local admin sprawl, unmanaged third-party access.'],
];

export const FIREWALL_COLUMNS = ['Rule ID', 'Source', 'Destination', 'Port', 'Protocol', 'Direction', 'Business justification', 'Owner', 'Expiration date', 'Logging', 'Last hit', 'Risk rating', 'Recommendation'];
export const FIREWALL_EXAMPLES = [
  ['FW-012', 'Any (0.0.0.0/0)', 'Jump host', '3389', 'TCP', 'Inbound', 'None recorded', 'Not assigned', 'None', 'Off', '3 days ago', 'Critical', 'Remove; move admin access to VPN, bastion or zero trust access with MFA'],
  ['FW-027', 'Office range', 'File server', '21', 'TCP', 'Inbound', 'Legacy partner upload', 'IT operations', 'None', 'On', '200 days ago', 'High', 'Retire (no traffic in 200 days); if still needed replace with SFTP'],
  ['FW-031', 'App subnet', 'Database subnet', '5432', 'TCP', 'Inbound', 'Application database access', 'Platform lead', 'Annual review', 'On', 'Today', 'Low', 'Keep; confirm source limited to app subnet only'],
  ['FW-044', 'Any', 'Any', 'Any', 'Any', 'Outbound', 'Not documented', 'Not assigned', 'None', 'Off', 'Today', 'High', 'Replace with egress allow-list to required destinations; enable logging'],
];
export const FIREWALL_NOTE = 'Classify each port as secure, conditionally acceptable or insecure using the port tables below. Any database, admin, storage or management port exposed to the internet is high risk. Rules with no owner, no justification or no hits for 90 days or more are candidates to retire rather than harden.';

export const KEY = {
  advisory: '"Thanks for flagging this. I\'d treat it as a high-risk production key management issue. The key is 180 days old against a 90-day rotation requirement, so it has missed two rotation windows. The immediate goal is to rotate safely, validate production, revoke the old key, and keep enough evidence to show what happened and how we stop it recurring. The other concern is that only two people can rotate it, which is both a single point of failure and the likely reason it slipped."',
  rating: 'High. Two missed rotation cycles on a production secret, with only two people able to act. Raise to Critical if logs show unexplained use, the key was found in code, chat or tickets, or it protects cardholder data, PHI, CUI or production admin access with no compensating monitoring.',
  mapping: [
    ['Organisation key management policy, contract or customer commitment', 'The strongest source for the 90-day period itself. Neither ISO 27001 nor SOC 2 sets a universal 90-day rotation period; cite the policy or contract that does.'],
    ['ISO 27001:2022 Annex A 8.24', 'Use of cryptography, including key management across the key lifecycle.'],
    ['SOC 2 CC6.1 and CC6.6', 'Logical access security and protection against threats from outside system boundaries, including credentials.'],
    ['PCI DSS v4.0 Requirement 3.7', 'Only if the key protects stored account data or the cardholder data environment: key management processes, including cryptoperiods.'],
    ['NIST SP 800-53 SC-12 and SC-13', 'Cryptographic key establishment and management; cryptographic protection.'],
    ['NIST SP 800-171 Rev. 2 3.13.10 and 3.13.11', 'Only if CUI is in scope: establish and manage cryptographic keys; use FIPS-validated cryptography for CUI.'],
  ],
  // [recommendation, infra priority, effort, business impact, implementation risk, rollback, owner, dependency teams]
  actions: [
    ['Rotate through a controlled emergency change, in the earliest approved window, with monitoring until done', 'P0', 'Small to medium', 'Closes the compliance gap and limits exposure from a possibly copied key', 'Medium: dependent services may fail if a consumer is missed', 'Keep the old key active until cutover is validated, then switch back if errors appear', 'Technical key owner', 'Application owners, SRE, change advisory'],
    ['Revoke or disable the old key after validation', 'P0', 'Small', 'Ensures any copy of the old key stops working', 'Low once consumers are confirmed', 'Re-enable the old key for a short, approved window', 'Technical key owner', 'Security'],
    ['Review 180 days of access and usage logs; search code, CI/CD variables, logs, tickets, chat, docs and shared files for the key', 'P0', 'Medium', 'Decides whether this is an incident with notification duties', 'None', 'Not applicable', 'Security lead', 'Engineering, legal if exposure is found'],
    ['Record the missed rotation as a control failure or exception, with root cause', 'P1', 'Small', 'Honest audit trail; avoids a worse finding later', 'None', 'Not applicable', 'GRC lead', 'Key owner'],
    ['Assign control owner, technical owner and backup owner; add a managed privileged or break-glass path so rotation does not depend on two people', 'P1', 'Medium', 'Removes the single point of failure', 'Low', 'Not applicable', 'Head of Infrastructure', 'Identity, security'],
    ['Move the key into a secrets manager, KMS or vault with automated rotation where supported', 'P1', 'Medium to large', 'Prevents recurrence and removes manual handling', 'Medium: application changes may be needed to read from the vault', 'Keep the previous secret source until all consumers are migrated', 'Platform lead', 'Application teams'],
    ['Alert on key age at 60, 75 and 85 days; maintain a rotation runbook with validation and rollback steps', 'P2', 'Small', 'Early warning before the next deadline', 'None', 'Not applicable', 'Platform lead', 'SRE'],
    ['Review all production keys and secrets for the same gap', 'P1', 'Medium', 'Shows whether this is isolated or systemic', 'None', 'Not applicable', 'Security lead', 'Platform, application owners'],
  ],
  evidenceAsk: '"Before I finalise the finding and remediation plan, could you share the evidence below? Please don\'t send the secret value itself. I only need metadata, logs, screenshots, tickets and configuration."',
  evidence: [
    ['Requirement and policy', 'Key management policy showing the 90-day requirement; any contract, customer or regulatory requirement referencing it; cryptography standard; secrets management procedure; production access policy; exception process.'],
    ['Key metadata', 'Key name or ID (no value), type, environment, what it protects, data or access protected, creation date, last rotation, expiry, current rotation frequency, key owner, backup owner, business owner, technical owner.'],
    ['Access', 'Users, groups, roles, services or machines that can view, use, rotate or administer it; proof only two people can rotate; RBAC and PAM configuration; break-glass process; MFA for those users; access approvals; latest access review; removal of leavers.'],
    ['Storage and protection', 'Secrets manager or KMS metadata export; encryption at rest; access logging enabled; least-privilege policy; secret scanning results; CI/CD variable configuration with values redacted; confirmation it is not in tickets, chat, docs, local files or plaintext config.'],
    ['Rotation', 'Prior rotation tickets; current emergency change; runbook; non-production test results; production plan and approval; implementation logs; validation checklist; dependent service tests; revocation proof; activation and deactivation timestamps; rollback plan; communication to affected teams.'],
    ['Logging and monitoring', '180 days of access and usage logs (CloudTrail, Azure Activity Log, GCP Audit Logs, vault audit log or SIEM); related alerts; key-age monitoring; alert configuration; log retention; SIEM rules or dashboards.'],
    ['Risk and impact', 'Impact assessment; list of dependent applications, pipelines and jobs; blast radius if compromised; customer impact if rotation fails; downtime estimate; data classification; business owner sign-off on timing; compensating controls until rotation.'],
    ['Investigation', 'Root cause; ownership gaps; missing or failed alerts; failed handoff; evidence of the two-person bottleneck; prior findings, incidents or near misses with secrets.'],
    ['Remediation', 'Updated policy and procedure; owner and backup assignment; automated rotation configuration; alert rules; recurring ticket workflow; secrets inventory; review of all production keys; exception closure; post-change review and corrective action plan.'],
  ],
};

export const CONTRACTOR = {
  scenario: 'An outsourced information security consultant performs vendor risk assessments in the corporate environment on a company laptop, and may need access to internal systems, security tools, vendor risk platforms, document repositories, ticketing and possibly production information or systems.',
  levels: [
    ['Critical', 'Standing privileged access to production; can change production, access secrets or regulated data, disable controls, or act without approval.'],
    ['High', 'Production read access, or access to sensitive vendor, customer or security data, security tooling, vulnerability data, architecture diagrams, audit evidence or third-party risk data. Likely default for this scenario.'],
    ['Medium', 'Limited access to vendor risk systems and internal documents; no production access, no secrets, no customer data exports; strong monitoring.'],
    ['Low', 'Only sanitised training data or public or vendor-provided documents; no internal sensitive access.'],
  ],
  mapping: [
    ['SOC 2', 'CC6.1, CC6.2, CC6.3 (access, authorisation, least privilege and removal), CC6.6 and CC6.7 (credentials and data movement), CC7.1 and CC7.2 (monitoring).'],
    ['ISO 27001:2022 organisational', 'A.5.9 asset inventory; A.5.15 access control; A.5.16 identity management; A.5.18 access rights; A.5.20 and A.5.21 supplier agreements and supply chain security.'],
    ['ISO 27001:2022 people', 'A.6.1 screening; A.6.2 terms and conditions; A.6.3 awareness and training; A.6.4 disciplinary process; A.6.5 responsibilities after termination; A.6.6 confidentiality agreements; A.6.7 remote working.'],
    ['ISO 27001:2022 technological', 'A.8.1 user endpoint devices; A.8.2 privileged access; A.8.3 information access restriction; A.8.5 secure authentication; A.8.15 logging; A.8.16 monitoring.'],
    ['NIST SP 800-53', 'AC-2, AC-3, AC-5, AC-6, AC-17, IA-2, IA-4, IA-5, AU-2, AU-6, CM-5, PS-6, PS-7, SA-9, where applicable.'],
    ['NIST SP 800-171 Rev. 2', 'Only if CUI is in scope: 3.1.1, 3.1.2, 3.1.5, 3.1.6, 3.1.12, 3.1.14, 3.5.3, 3.5.7, 3.5.8, 3.7.5, 3.9.2.'],
  ],
  security: [
    'Named contractor identity in the corporate IdP with SSO; no shared accounts.',
    'Phishing-resistant MFA (FIDO2 keys or passkeys) where available; conditional access by device compliance, location and risk.',
    'Managed company device only: MDM, disk encryption, EDR, firewall, screen lock, patching, no local admin unless approved; block personal devices.',
    'RBAC per system with separate roles for the vendor risk platform, documents, tickets, security tools and production; no Global Admin, Owner, root or similar.',
    'Production and privileged access only just-in-time through PAM, a bastion or zero trust access, with approval, time limit, ticket and session logging; read-only by default; no direct access to secrets.',
    'Mask or redact customer data, secrets and regulated data; separate accounts for normal and privileged work if privileged access is needed.',
    'Automatic expiry on contract end date; access reviews at onboarding, every 30 days and at offboarding.',
    'DLP on email, browser, endpoint, cloud storage and collaboration; restrict external sharing and USB; disable forwarding rules and personal email sync; block unapproved third-party app consent.',
    'Monitor downloads, mass exports, risky OAuth grants, unusual logins and privilege escalation; retain and review logs.',
    'Change approval for any production change; security approval before adding to privileged groups.',
    'Offboarding removes IdP, SaaS, VPN or ZTNA, device, repository, cloud, secrets and security tool access.',
  ],
  hr: [
    'Signed contractor agreement, NDA, acceptable use, information security acknowledgement and data handling agreement.',
    'Screening appropriate to the role and jurisdiction; confirmation of engagement through the consulting firm.',
    'Supplier due diligence on the consulting firm; contract terms for confidentiality, data protection, breach notification, subcontracting, return of assets and audit rights.',
    'Statement of work with defined access scope, start and end dates.',
    'Named company sponsor, business owner, technical owner and HR or vendor management owner.',
    'Training before access: security awareness, phishing, data handling, incident reporting, acceptable use and privacy.',
    'Laptop asset assignment and return process; work product kept only in approved company systems; no data retained after the engagement.',
    'Incident reporting obligation; conflict of interest disclosure where relevant; periodic sponsor attestation that access is still needed; clear offboarding triggers.',
  ],
  // [aspect, contractor, full-time employee, intern]
  workers: [
    ['Account', 'Named, contractor type, end date required', 'Named, standard', 'Named, trainee type, end date'],
    ['Baseline access', 'Limited to the statement of work', 'Job-role baseline', 'Minimum only'],
    ['Production access', 'JIT only, read-only by default', 'JIT for admin and sensitive operations', 'None by default; documented need, supervision, read-only, explicit approval'],
    ['Privileged access', 'JIT with approval and session logging', 'JIT for admin, break-glass and high-risk tooling', 'None by default'],
    ['RBAC', 'Contractor-specific roles, tighter scope and expiry', 'Department and function roles; privileged separated', 'Restricted trainee roles'],
    ['Access reviews', 'Every 30 days and at offboarding', 'Periodic and on role change', 'Sponsor review, short expiry'],
    ['Monitoring', 'Strong DLP and activity monitoring', 'Standard monitoring', 'Standard monitoring with sponsor oversight'],
  ],
  model: 'Recommended model for this scenario: contractor identity with SSO and phishing-resistant MFA on a managed laptop; roles for vendor risk reviewer, security evidence viewer and ticket commenter; production as a just-in-time, read-only observer role only when a ticket justifies it; no secrets; DLP and download monitoring on; access expiring on the contract end date with 30-day reviews. Example roles: vendor risk reviewer, security evidence viewer, ticket commenter, production read-only observer, production operator, production admin.',
  // [recommendation, priority, effort, business impact, implementation risk, rollback, owner, dependency teams]
  actions: [
    ['Create named contractor identity with SSO, MFA and expiry', 'P0', 'Small', 'Access is traceable and ends on time', 'Low', 'Disable account', 'Identity lead', 'HR, sponsor'],
    ['Enforce managed-device conditional access and DLP', 'P0', 'Small to medium', 'Data stays on controlled devices', 'Low to medium: may block legitimate work until device is compliant', 'Relax policy for the named user while fixing compliance', 'IT endpoint lead', 'Security'],
    ['Define contractor RBAC roles per system', 'P1', 'Medium', 'Least privilege that can be reused for future contractors', 'Low', 'Assign previous role set', 'System owners', 'GRC, identity'],
    ['Set up JIT production read-only access through PAM or bastion', 'P1', 'Medium', 'No standing production access', 'Medium if PAM is new', 'Grant a time-limited direct role with logging', 'Platform lead', 'Security, change advisory'],
    ['Complete HR and vendor paperwork before access', 'P0', 'Small', 'Legal cover and accountability', 'None', 'Not applicable', 'HR or vendor management', 'Legal, procurement'],
    ['30-day access reviews and offboarding checklist', 'P1', 'Small', 'Prevents stale access', 'None', 'Not applicable', 'Sponsor', 'Identity, IT'],
  ],
  evidenceAsk: '"Before I finalise whether this is Critical, High, Medium or Low, please share the evidence below. Please don\'t share passwords, tokens, secrets or private keys."',
  evidence: [
    ['Engagement and HR', 'Contractor agreement, NDA, statement of work, start and end dates, consulting firm, named consultant, screening confirmation, training completion, acceptable use, data handling and confidentiality acknowledgements, laptop asset record, offboarding plan, sponsor approval.'],
    ['Access scope', 'Systems needed with business justification, duration and owners; whether production is needed and whether read-only or write; whether customer, regulated, vendor risk, security, vulnerability, architecture or secret data is reachable.'],
    ['Identity and tenant', 'IdP account record, contractor user type, groups, roles, conditional access policies, MFA status, device compliance, session controls, account expiry, login restrictions, PIM or PAM configuration.'],
    ['Endpoint', 'Asset record, MDM enrolment, encryption, EDR, patching, local admin status, firewall, screen lock, USB controls, browser and extension controls, DLP, compliance report.'],
    ['Production access', 'Request ticket, approval, role, standing or JIT, time limit, access path, logging and session recording, change tickets if changes are allowed, break-glass procedure, proof secrets are not exposed.'],
    ['Monitoring and audit', 'Login, privileged, production, security tool and vendor risk platform logs; download and export logs; DLP and SIEM alerts; access reviews; sponsor attestations; automated expiry; offboarding logs.'],
    ['Data protection', 'Data classification of systems accessed, DLP policy, sharing restrictions, redaction and screenshot rules, report storage location, confirmation no data on personal devices or accounts.'],
  ],
};

// Evidence for a firewall rule review: [evidence, what it proves, what the auditor checks]
export const FIREWALL_EVIDENCE = [
  ['Firewall and network security policy or standard', 'The rules for what is allowed, default deny, and how often rules are reviewed', 'Approved, current, states the review frequency (often every 6 months; PCI DSS Requirement 1.2.7 requires at least every six months)'],
  ['Inventory of in-scope firewalls and security groups', 'Which devices and cloud controls are covered (perimeter, internal, WAF, AWS security groups, Azure NSGs, GCP firewall rules)', 'Complete; matches network diagram and cloud accounts'],
  ['Current network diagram and data flow diagram', 'Where firewalls sit and what traffic should cross them', 'Dated and matches the rule base'],
  ['Full rule base export with hit counts', 'The actual rules in force, with source, destination, port, action and last-hit date', 'System-generated, dated, from the device or cloud console; rules with any-any, wide open ports or no hits for 90+ days flagged'],
  ['Rule review record', 'That someone actually reviewed every rule in the period', 'Reviewer name, date, decision per rule (keep, change, remove) and sign-off by the network or security owner'],
  ['Business justification per rule', 'Each rule has a reason and an owner', 'Justification and owner recorded, temporary rules have expiry dates'],
  ['Change tickets for rule additions and changes', 'Rules are changed through change management', 'Sample of changes with request, risk review, approval before implementation and testing'],
  ['Remediation tickets from the review', 'Findings were actually fixed', 'Tickets closed and a later export proves the rule was removed or tightened'],
  ['Admin access list and logs for firewalls', 'Only authorised people can change rules', 'MFA on admin access, access review of admins, logs sent to the SIEM'],
  ['Configuration backup and baseline', 'Firewall config is backed up and hardened', 'Backup records, firmware patching and hardening checks'],
];
export const FIREWALL_EVIDENCE_NOTE = 'Screenshots alone are weak evidence; auditors prefer a dated system export plus the review sign-off and closed remediation tickets. Framework links: ISO/IEC 27001:2022 A.8.20 network security and A.8.22 segregation of networks, SOC 2 CC6.6, PCI DSS v4.0 Requirement 1.';
