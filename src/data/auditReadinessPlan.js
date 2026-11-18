// Lead GRC audit readiness and certification plan. Detail that already lives elsewhere on the site is linked by topic id, not repeated.
// Columns kept separate on purpose. Timelines are typical ranges that vary by auditor and company.

export const PARTS = [
  ['frameworks', 'Framework overview'],
  ['domains', 'Control domains'],
  ['startup', 'Weak controls: what a startup can do'],
  ['pentest', 'Penetration test types'],
  ['edr', 'EDR explained'],
  ['automation', 'Evidence automation sources'],
  ['gaps', 'Known gaps and fixes'],
  ['timeline', 'Timelines'],
  ['delegation', 'Delegation model'],
  ['messaging', 'Applied: AI messaging SaaS'],
  ['followups', 'Hard follow-up questions'],
  ['closing', 'Closing statement'],
];

// [framework, what is assessed, evidence expected, teams, causes of findings, Lead GRC owns]
export const FRAMEWORKS = [
  ['SOC 2 Type I', 'Design of controls at one point in time against the chosen trust services criteria', 'System description, policies, configuration screenshots, one example of each control', 'Engineering, IT, HR, Legal, Leadership', 'Control not in place on the report date, system description not matching reality', 'Scope, criteria choice, system description, control matrix, auditor coordination'],
  ['SOC 2 Type II', 'Design and operating effectiveness across an observation period', 'Complete populations and samples for every recurring control across the whole period', 'Same as Type I, plus every control owner over the period', 'Missed quarterly reviews, late offboarding, unapproved changes, incomplete populations', 'Period selection, population accuracy, evidence review before submission, exception responses'],
  ['ISO 27001 initial certification', 'Whether the ISMS (clauses 4 to 10) works and Annex A controls are applied as the Statement of Applicability says', 'Scope, risk assessment and treatment, SoA, objectives, internal audit, management review, corrective actions, Annex A evidence', 'Leadership (top management), all control owners', 'Missing internal audit or management review, SoA not matching risk treatment, objectives not measured', 'ISMS design, risk method, SoA, internal audit programme, Stage 1 and Stage 2 coordination'],
  ['ISO 27001 surveillance', 'That the ISMS kept running and improved since the last audit; usually a sample of clauses and controls', 'A year of operation: updated risk register, a new internal audit and management review, closed corrective actions, changes', 'Leadership and owners of sampled controls', 'Same nonconformity repeated, actions from last audit still open, ISMS paused after certification', 'Year-round calendar, corrective action tracking, change log, surveillance preparation'],
  ['ISO 42001 (AI management system)', 'Whether AI systems are governed across their lifecycle: AI policy, AI risk and impact assessment, data, transparency, human oversight, third-party AI', 'AI inventory, AI policy, AI risk and impact assessments, Annex A AI controls in an SoA, monitoring records, internal audit, management review', 'Product, ML or AI engineering, Legal, Privacy, Leadership', 'No AI inventory, no impact assessment for high-impact use, AI vendors not assessed', 'AIMS scope, AI risk method, integration with the ISO 27001 ISMS, audit coordination'],
  ['Privacy support (DPIA, ROPA, roles, DPA, subprocessors)', 'Not a certification on its own; tested through SOC 2 privacy or confidentiality criteria, ISO 27701 or customer due diligence', 'ROPA, DPIAs for high-risk processing, signed DPAs, public subprocessor list with change notices, retention schedule', 'Legal or DPO, Engineering, Customer Success', 'Subprocessor list out of date, no DPIA for new AI feature, retention not enforced', 'Linking privacy records to the control framework, keeping evidence current'],
  ['Vendor risk management', 'That vendors are tiered, assessed before use and monitored', 'Vendor inventory with tiers, assessments, SOC 2 report reviews, DPAs, annual review records', 'Procurement, Legal, Security, business owners', 'Critical vendor never reviewed, expired SOC 2 report, no DPA', 'Tiering method, review standard, approvals and risk acceptance'],
  ['Customer security questionnaires', 'Not an audit, but every answer becomes a contractual commitment', 'Approved answer library linked to controls and evidence', 'Sales, Security, Engineering, Legal', 'Answers that are untrue today, inconsistent answers across customers', 'Library ownership, final review of customer-facing answers'],
];

// [domain, objective, how to test, evidence, common gaps, remediation, owner, frequency, automatable, deep-dive topic]
export const DOMAINS = [
  ['A. Governance and security programme', 'Approved policies, mapped controls with owners, leadership oversight', 'Check policy approval dates, control owner list, last management review minutes and internal audit report', 'Signed policies, control matrix with owners, management review minutes, internal audit report', 'Stale policies, no named owners, no management review', 'Annual policy review cycle, owner per control, quarterly risk committee', 'GRC with Leadership', 'Policies yearly; review quarterly', 'Partly: policy acknowledgements and dates', 'policies'],
  ['B. Risk management', 'Risks identified, scored, treated and accepted at the right level', 'Trace three risks from register to controls and treatment; check acceptance sign-off', 'Risk register with inherent and residual scores, treatment plans, acceptance approvals, leadership reports', 'Register untouched for a year, no residual scores, accepted risks without sign-off', 'Quarterly review, new findings feed the register, acceptance by risk level', 'GRC with risk owners', 'High risks monthly; full review quarterly', 'Partly: ticket status for treatment', '/#risk-assessment'],
  ['C. Asset management', 'Complete inventory of cloud, SaaS, endpoints, data and AI systems, with prod vs non-prod marked', 'Compare inventory against cloud accounts, SSO app list, MDM and HRIS', 'Asset register, cloud resource export, SaaS list from SSO, MDM device list, data and AI inventories', 'Shadow SaaS, untagged cloud resources, no AI inventory', 'Tagging standard, SSO as the SaaS source of truth, AI inventory owner', 'IT and Engineering', 'Quarterly', 'Mostly: cloud, MDM and SSO exports', 'it-audit'],
  ['D. Access control and IAM', 'Least privilege, SSO and MFA, timely joiner, mover and leaver handling, reviewed privileged access', 'Sample leavers against access removal dates; reperform an access review; check MFA coverage and service accounts', 'IdP MFA report, HRIS leaver list against deprovisioning logs, quarterly reviews with removals, break-glass log', 'Leavers still active, reviews without removals, shared admin accounts', 'SCIM deprovisioning, quarterly reviews with tracked removals, named admin accounts', 'IT and Security', 'Reviews quarterly; leavers same day or within policy', 'Mostly: IdP and HRIS; review decisions need people', '/#access-governance'],
  ['E. GitHub and change management', 'Every production change is reviewed, tested, approved and traceable', 'Pull merged PRs for the period; check approvals, CI status and ticket links; review branch protection and audit log', 'Branch protection settings, PR list with approvers, CI results, deployment logs, emergency change records', 'Admins bypassing protection, self-approved PRs, no ticket link', 'Enforce protection for admins, CODEOWNERS, required checks, emergency change procedure', 'Engineering', 'Continuous; sample per audit', 'Mostly: GitHub API', 'change'],
  ['F. Secure SDLC and QA', 'Security and quality built into each release, with release approval', 'Trace a feature from ticket with acceptance criteria to PR, tests, staging validation and release', 'Tickets with acceptance criteria, test results, SAST and dependency scan results, release approvals, smoke test records', 'No acceptance criteria, testing only in production, untracked defects', 'Definition of done with security checks, staging gate, smoke test checklist', 'Engineering and QA', 'Every release', 'Mostly: CI and ticketing', 'cicd'],
  ['G. Vulnerability management', 'Vulnerabilities found and fixed within SLAs by severity', 'Compare scanner findings to tickets and closure dates; check exceptions', 'Scan reports, SLA policy, tickets with dates, exception register', 'No SLA, findings with no tickets, expired exceptions', 'Severity SLA in policy, auto-ticketing, monthly ageing report', 'Security and Engineering', 'Continuous scans; monthly review', 'Mostly: scanner and ticket APIs', 'infranet'],
  ['H. Penetration testing', 'Independent testing at least yearly and after major change, with findings closed', 'Check scope against the in-scope system, tester independence, findings tickets and retest', 'Engagement letter with scope, report, remediation tickets, retest letter', 'Scope missing APIs, no retest, critical findings open', 'Scope from the system boundary, retest booked with the test', 'Security', 'Yearly and on major change', 'No: report review is manual', null],
  ['I. Incident management', 'Incidents detected, handled and reviewed, with notification decisions recorded', 'Walk through an incident or tabletop; check severity, timeline and notification analysis', 'IR plan, incident register, post-incident reviews, tabletop report, or a no-incident attestation', 'Plan never tested, no register, notification deadlines unknown', 'Yearly tabletop, register, decision log for notifications', 'Security with Legal', 'Tabletop yearly; register ongoing', 'Partly: ticketing and SIEM', 'tabletop'],
  ['J. BC and DR', 'Critical services recoverable within agreed RTO and RPO', 'Check BIA, backup config, a restore test and a DR exercise', 'BIA, backup settings, restore test record with timings, DR or tabletop report, vendor dependency map', 'Backups never restored, RTO not agreed, single region', 'Quarterly restore test, yearly DR exercise, documented manual workarounds', 'Engineering and Operations', 'Restore quarterly; DR yearly', 'Partly: backup job status', 'tabletop'],
  ['K. Cloud security', 'Secure configuration of identity, logging, encryption and network in AWS, Azure and GCP', 'Test settings in console or CLI and compare with CSPM output', 'CSPM report, audit log settings, KMS config, storage policy, firewall rules', 'Logs off in some accounts, public buckets, open admin ports', 'Organisation-level guardrails, CSPM with alert routing', 'Cloud and Security', 'Continuous; quarterly review', 'Mostly: cloud APIs and CSPM', 'cloud-testing'],
  ['L. Endpoint security and EDR', 'Every endpoint and server protected, encrypted and managed', 'Compare HRIS and asset list to EDR and MDM consoles', 'EDR coverage report, MDM compliance report, encryption status, alert tickets', 'Devices without agent, contractors unmanaged', 'Enrol through MDM, block access from non-compliant devices', 'IT', 'Monthly coverage check', 'Mostly: EDR and MDM APIs', 'edp'],
  ['M. DLP (remote, office, hybrid)', 'Sensitive data cannot leave through email, endpoints, SaaS sharing or removable media without control', 'Test a blocked action (external share, USB copy) and check the alert', 'DLP policies, test results, conditional access rules, sharing settings, alert log', 'Policies in monitor mode only, open external sharing', 'Classify data, start in monitor then enforce for top risks', 'IT and Security', 'Quarterly policy review', 'Partly', 'edp'],
  ['N. Logging, monitoring and SIEM', 'Security events collected, retained and triaged', 'Pick sample alerts and trace to investigation tickets; check sources and retention', 'Log source list, retention settings, alert rules, triage tickets', 'Sources missing, alerts never reviewed, short retention', 'Source inventory, triage SLA, retention set by policy', 'Security', 'Daily triage; quarterly source review', 'Mostly', 'infranet'],
  ['O. Vendor risk', 'Vendors tiered, assessed, contracted and monitored', 'Sample new vendors and check assessment before use', 'Vendor inventory, assessments, report reviews, DPAs, annual reviews', 'No tiering, expired reports', 'Tiering, intake gate in procurement, expiry tracking', 'GRC and Procurement', 'At onboarding; yearly for high tier', 'Partly', '/#vendor-risk'],
  ['P. Privacy', 'Personal data processed lawfully, minimised, retained and deleted as stated', 'Compare ROPA and privacy notice to actual systems; test a deletion request', 'ROPA, DPIAs, DPAs, retention schedule, DSR log, transfer mechanism', 'ROPA out of date, retention not enforced', 'Data map refresh, automated deletion, DSR tracker', 'Legal or DPO with Engineering', 'Yearly and on change', 'Partly', 'data-governance'],
  ['Q. Security awareness', 'Staff trained at onboarding, yearly and by role, including AI acceptable use', 'Compare HRIS headcount to LMS completions', 'Completion report, phishing results, role-based training records', 'New joiners missed, contractors excluded', 'LMS linked to HRIS, reminders and escalation', 'GRC and HR', 'Onboarding and yearly', 'Mostly: LMS and HRIS', 'awareness'],
  ['R. Customer questionnaires', 'Consistent, true and source-backed answers', 'Sample answers and trace to controls and evidence', 'Answer library with owners and review dates, trust center', 'Answers copied from old versions, overcommitment', 'Quarterly library review, owner sign-off', 'GRC with Sales', 'Quarterly', 'Partly', 'customer-trust'],
  ['S. AI in audits and GRC', 'AI tools speed up GRC work without hallucinations, leakage or untraceable output', 'Check tool approval, source list and human review records', 'Vendor review of the tool, source list, review log', 'Unapproved tools, answers without sources', 'Approved tools only, version-controlled knowledge base, human sign-off', 'GRC', 'Quarterly', 'Not applicable', null],
];

export const STARTUP = {
  intro: 'Evidence cannot be faked or backdated. A Type II tests what actually happened in the period, and creating records afterwards is a serious integrity problem that can end the audit. The honest route is to start the controls now and choose audit dates from when they began operating.',
  mvc: [
    ['SSO and MFA for every in-scope system', 'Day 1'],
    ['Branch protection on the production branch, 1 approver, no self-merge, admins included', 'Day 1'],
    ['Required CI checks before merge', 'Week 1'],
    ['Ticket link in every PR title or description', 'Week 1'],
    ['Written emergency change procedure with after-the-fact review', 'Week 1'],
    ['Leaver checklist triggered from HRIS, access removed within policy', 'Week 1'],
    ['First quarterly access review with removals recorded', 'Week 2'],
    ['Production access limited to named engineers, logged', 'Week 2'],
  ],
  align: [
    ['Type I', 'As soon as the controls exist and one instance of each can be shown, often 4 to 8 weeks after they start'],
    ['Type II', 'The period starts the day the controls began operating. A 3-month first period after that date is common'],
    ['ISO 27001', 'Stage 2 needs the controls operating with records, plus an internal audit and management review, so usually 2 to 3 months after start'],
  ],
  say: '"If access and change controls are weak today, I don\'t try to make the past look better. I switch on the minimum control set this week, record the start date, and pick a Type I now and a Type II period starting from that date. Customers get a Type I and a bridge letter in the meantime."',
};

// [type, what it covers, when, findings to closure]
export const PENTEST = [
  ['External network', 'Internet-facing IPs, open ports, exposed services', 'Yearly and after network changes', 'Ticket per finding with severity SLA; retest letter'],
  ['Internal network', 'What an attacker can reach after getting inside, lateral movement', 'Yearly if there is a corporate or office network', 'Same; segmentation fixes tracked'],
  ['Web application', 'Authentication, authorisation, injection, session, business logic', 'Yearly and after major releases', 'Retest of criticals and highs before sharing summary with customers'],
  ['API', 'Auth on every endpoint, object-level access, rate limits, data exposure', 'Yearly; for API-first products this is the main test', 'Same'],
  ['Cloud configuration', 'IAM paths, storage exposure, network rules, logging', 'Yearly; CSPM covers the rest of the year', 'CSPM rule added for each finding'],
  ['Mobile', 'Local storage, certificate handling, API calls from the app', 'Yearly if a mobile app is in scope', 'Same'],
  ['Social engineering', 'Phishing, pretext calls to support or IT', 'Optional; often done through phishing simulations', 'Training follow-up, process changes'],
];

export const EDR = {
  what: 'Endpoint detection and response is an agent on laptops and servers that records process, file, network and user activity, detects suspicious behaviour, and lets the security team respond remotely.',
  vsAv: 'Traditional antivirus mainly blocks known malware by signature. EDR watches behaviour, so it can catch new attacks, misuse of legitimate tools and hands-on-keyboard attackers, and it keeps a timeline for investigation.',
  monitors: 'Process launches and parent-child chains, file changes, registry or config changes, network connections, logins, script and command-line activity.',
  response: 'Isolate the device from the network, kill a process, quarantine a file, collect forensic data, run a remote shell, roll back some changes depending on the product.',
  evidence: 'Coverage report compared to the asset list, policy settings showing prevention mode, tamper protection on, sample alerts with investigation tickets, version and health status.',
  gaps: 'Servers or Linux hosts missing, contractor laptops unmanaged, agent in detect-only mode, alerts going to an unwatched mailbox, stale agents.',
  test: 'Export the device list from MDM and HRIS, match it to the EDR console, investigate every unmatched device, and check one recent alert end to end.',
  examples: 'CrowdStrike Falcon, SentinelOne, Microsoft Defender for Endpoint, VMware Carbon Black.',
};

// [source, evidence pulled, control supported, still needs human review]
export const AUTOMATION = [
  ['Okta or Entra ID', 'User list, MFA status, app assignments, deprovisioning events', 'MFA, access reviews, leavers', 'Whether each access is appropriate'],
  ['AWS, Azure, GCP', 'Audit log status, encryption, public storage, IAM users and keys', 'Cloud security, logging, encryption', 'Exceptions and whether findings are real'],
  ['GitHub', 'Branch protection, PR approvals, CI status, audit log, secret and dependency alerts', 'Change management, secure SDLC', 'Emergency changes and bypass justifications'],
  ['Jira, Linear or similar', 'Ticket links, approvals, remediation status and dates', 'Change, vulnerability and risk remediation', 'Quality of approvals and closure'],
  ['HRIS', 'Joiners, movers, leavers with dates', 'Onboarding, offboarding, training population', 'Contractors held outside HRIS'],
  ['LMS or training tool', 'Completion dates per person', 'Awareness training', 'Role-based training content'],
  ['EDR and MDM', 'Device coverage, encryption, agent health', 'Endpoint security', 'Unmatched devices'],
  ['SIEM', 'Log sources, alert volumes, triage status', 'Monitoring', 'Whether investigations were adequate'],
  ['Vulnerability scanner and CSPM', 'Findings, severity, age, closure', 'Vulnerability management, cloud config', 'Exceptions and false positives'],
  ['Vanta, Drata, Secureframe, Thoropass or similar', 'Pulls the sources above into tests and dashboards', 'Continuous control monitoring', 'That each test checks the right thing; failing tests'],
  ['SiftHub or similar questionnaire tool', 'Draft answers from the approved library', 'Customer questionnaires', 'Every customer-facing answer before it goes out'],
];

// [gap, why it matters, audit impact, remediation, evidence after, time to fix]
export const GAPS = [
  ['No formal scope', 'Nobody knows what is being audited', 'Wrong systems tested, scope creep', 'Scope document with systems, data, locations, criteria', 'Approved scope and system description', '1 to 2 weeks'],
  ['No access reviews', 'Excess access stays unnoticed', 'Exception (SOC 2) or nonconformity (ISO)', 'Quarterly review with tracked removals', 'Signed reviews and removal tickets', '2 weeks for the first review'],
  ['Weak offboarding evidence', 'Leavers may keep access', 'Exception on every late sample', 'HRIS-triggered deprovisioning with timestamps', 'Leaver list matched to removal dates', '2 to 4 weeks'],
  ['Missing branch protection', 'Unreviewed code reaches production', 'Change management exception', 'Enable protection, include admins', 'Settings export and PR history', '1 day, then evidence builds'],
  ['No PR approval evidence', 'Cannot show review happened', 'Exception for the period', 'Required approvals and CODEOWNERS', 'PR list with approvers', '1 day, then evidence builds'],
  ['No vulnerability SLA', 'Fixes have no deadline to test against', 'Finding on vulnerability management', 'Severity SLA in policy, auto-ticketing', 'Policy and ageing report', '1 to 2 weeks'],
  ['No restore test', 'Backups may not work', 'Exception on availability or BC', 'Restore test with timings', 'Restore record against RTO and RPO', '1 to 2 weeks'],
  ['No tabletop exercise', 'IR plan untested', 'Finding on incident readiness', 'Run a tabletop with leadership', 'Tabletop report with actions', '2 to 3 weeks'],
  ['No vendor tiering', 'Effort spent on the wrong vendors', 'Finding on vendor management', 'Tier by data and criticality', 'Tiered inventory', '2 to 4 weeks'],
  ['Risk register not updated', 'Risk view is stale', 'ISO nonconformity on clause 6 or 8', 'Quarterly review, feed findings in', 'Dated register versions', '2 weeks'],
  ['No management review', 'Leadership not overseeing the ISMS', 'ISO major or minor nonconformity', 'Hold review covering all clause 9.3 inputs', 'Minutes with decisions', '1 to 2 weeks'],
  ['Stale policies', 'Policies do not match practice', 'Finding on governance', 'Review, approve, re-acknowledge', 'Approval records', '2 to 4 weeks'],
  ['Missing training evidence', 'Cannot prove awareness', 'Exception', 'LMS linked to HRIS', 'Completion report', '2 to 4 weeks'],
  ['EDR not on every device', 'Unprotected endpoints', 'Exception on endpoint controls', 'Enrol through MDM, block non-compliant devices', 'Coverage report at 100 percent or explained', '2 to 4 weeks'],
  ['Cloud logs not enabled', 'No investigation trail', 'Exception on monitoring', 'Organisation-wide logging to a protected account', 'Log configuration export', '1 week'],
  ['Public cloud storage', 'Data exposure', 'Possible exception and incident', 'Block public access by default', 'CSPM clean report', '1 day to 1 week'],
  ['No DPA for a high-risk vendor', 'No contractual data protection', 'Privacy and vendor finding', 'Sign DPA or replace vendor', 'Signed DPA', '2 to 6 weeks'],
  ['AI vendor trains on customer data', 'Customer data used beyond purpose', 'Privacy, contract and ISO 42001 issue', 'Opt out, zero-retention terms or switch vendor', 'Contract clause or setting screenshot', '1 to 4 weeks'],
  ['No ROPA', 'Cannot show what personal data is processed', 'Privacy finding', 'Build data map and ROPA', 'ROPA with owners', '3 to 6 weeks'],
  ['No DPIA for high-risk processing', 'Risks to people not assessed', 'Privacy finding, regulatory exposure', 'DPIA before launch or now', 'Signed DPIA', '2 to 4 weeks'],
  ['Weak DLP coverage', 'Data can leave unseen', 'Finding on data protection', 'Classify, monitor, then enforce top rules', 'Policy set and test results', '4 to 8 weeks'],
  ['Questionnaire answers not source-backed', 'Untrue commitments to customers', 'Contract and trust risk', 'Answer library linked to evidence', 'Library with owners and dates', '3 to 6 weeks'],
];

// [phase, SOC 2 Type I, SOC 2 Type II, ISO 27001, ISO 42001]
export const TIMELINE = [
  ['Readiness and gap assessment', '2 to 4 weeks', '2 to 4 weeks', '2 to 4 weeks', '2 to 4 weeks, starting from the AI inventory'],
  ['Control or ISMS implementation', '1 to 3 months', '1 to 3 months', '3 to 6 months including risk assessment, SoA, internal audit and management review', '3 to 6 months: AI policy, AI risk and impact assessments, SoA, internal audit, management review'],
  ['Observation or operation', 'None (point in time)', '3, 6 or 12 months; 3 to 6 common for a first report', 'Enough operation to show records before Stage 2', 'Same as ISO 27001'],
  ['Audit', 'Fieldwork 1 to 3 weeks', 'Fieldwork 2 to 6 weeks after the period', 'Stage 1 (1 to 2 days), fix gaps for a few weeks, then Stage 2', 'Stage 1 and Stage 2, often combined with ISO 27001'],
  ['Report or certificate', 'About 2 to 6 weeks after fieldwork', 'About 4 to 8 weeks after the period ends', 'After majors are closed and minor action plans accepted', 'Same as ISO 27001'],
  ['Typical total from a standing start', '3 to 5 months', '6 to 12 months', '6 to 9 months', '6 to 9 months, less if an ISO 27001 ISMS exists'],
];

export const SURVEILLANCE = [
  'Happens in year 1 and year 2 of the 3-year certificate, then recertification in year 3.',
  'Auditors check: changes since last audit, last year\'s corrective actions, a new internal audit and management review, risk register updates, and a sample of Annex A controls.',
  'Preparation: start 8 weeks before. Run the internal audit and management review first, close open actions, refresh the SoA and risk register.',
  'Common findings: repeat nonconformity, corrective actions open, internal audit not covering the full ISMS over the cycle, objectives not measured.',
  'Stay ready all year: compliance calendar, quarterly risk reviews, rolling internal audit, monthly corrective action check.',
];

export const DELEGATE = [
  ['Evidence tracker updates', 'Scope decisions'],
  ['Initial evidence collection and screenshots', 'Control interpretation'],
  ['Training completion reports', 'Risk rating'],
  ['Low-risk vendor intake', 'Auditor negotiation'],
  ['Questionnaire first drafts', 'Technical validation of evidence'],
  ['Meeting notes', 'Management responses to exceptions'],
  ['Policy checklist review', 'Facilitating risk acceptance'],
  ['Access review coordination', 'Final customer-facing answers'],
  ['Remediation tracker updates', 'Audit strategy and leadership reporting'],
];

// [component, in scope?, reason]
export const MSG_SCOPE = [
  ['Production application', 'In', 'Processes customer messages and phone numbers'],
  ['APIs', 'In', 'Main entry point for customer traffic'],
  ['Admin console', 'In', 'Privileged access to customer data'],
  ['Customer databases', 'In', 'Store messages, contacts and conversation history'],
  ['Cloud infrastructure', 'In', 'Hosts everything above'],
  ['CI/CD and GitHub', 'In', 'Path for every production change'],
  ['Identity provider', 'In', 'Controls access to all in-scope systems'],
  ['Monitoring and logging', 'In', 'Detection and investigation evidence'],
  ['EDR and MDM', 'In', 'Protect devices that access production'],
  ['Support tools', 'In', 'Hold customer data and screenshots of conversations'],
  ['Data warehouse', 'In if it holds customer data; otherwise exclude', 'Analytics copies often contain message content'],
  ['AI model providers', 'Carved out as subprocessors, assessed through vendor risk', 'Receive prompts and outputs'],
  ['Messaging providers (WhatsApp, SMS, email gateways)', 'Carved out as subprocessors', 'Deliver messages; their controls are described as complementary'],
  ['HRIS', 'In for joiner and leaver evidence', 'Source for onboarding and offboarding'],
  ['Marketing website', 'Out', 'No customer data, separate hosting'],
  ['Dev and sandbox', 'Out if no production data and separate access', 'If production data is copied there, it comes back into scope'],
];

export const MSG_RISKS = [
  ['Key risks', 'Account takeover of customer admin users, API abuse and spam, message content exposure, phone number misuse, cross-tenant data access'],
  ['Required controls', 'Tenant isolation tests, API authentication and rate limits, encryption of message stores, admin console MFA and logging, retention limits on message content'],
  ['Vendor dependencies', 'Messaging channel providers, SMS aggregators, LLM providers, cloud host, support platform'],
  ['AI-specific risks', 'Prompts containing personal data sent to model providers, provider retention or training on data, prompt injection through inbound messages, wrong or harmful bot replies'],
  ['Privacy concerns', 'Usually a processor for customer end-user data; DPAs with every customer and subprocessor, cross-border transfers, deletion of message history on request'],
  ['BC/DR needs', 'Message queue durability, failover across regions, fallback channel if a provider is down, defined RTO for API'],
  ['Incident scenarios', 'Leaked API key sending spam, cross-tenant bug exposing messages, LLM provider outage, admin account takeover'],
  ['Questionnaire expectations', 'Data residency, encryption, AI data use and retention, subprocessor list, pen test summary, SOC 2 and ISO certificates'],
];

export const FOLLOWUPS = [
  ['What if the auditor finds an exception in week 5?', '"I check it against our evidence first. If it is valid, I agree the facts, find the cause, and write a management response with what is fixed and by when. I would rather have an honest exception with a clear fix than argue a weak point."'],
  ['Engineering says branch protection slows them down. What do you do?', '"I show them it is one approval and automated checks, not a meeting. I agree an emergency path for real incidents, reviewed afterwards. Speed and control are both met."'],
  ['Can we just generate the access review for last quarter now?', '"No. A review created now for a past quarter is not evidence of that quarter. We do the review now, date it correctly, and the auditor sees when controls started."'],
  ['How do you reduce audit fatigue for control owners?', '"One control set mapped to all frameworks, automated pulls wherever possible, and one request per owner per cycle instead of the same question from three auditors."'],
  ['How do you know an automated test is right?', '"I validate each automated test once against a manual check, and re-check when the source system changes. A green dashboard is only as good as the test behind it."'],
  ['When would you push back on an auditor?', '"When a request is outside the agreed scope or period, or a finding is based on the wrong population. I respond in writing with evidence, and stay respectful."'],
];

export const CLOSING = '"I own audits end to end, from scope and readiness through fieldwork to the final report or certificate. I build one control framework mapped to every standard, automate evidence wherever the source allows it, and keep human review where judgment matters. That reduces audit fatigue for engineers, improves the quality of the controls themselves, and means surveillance audits are a check of work we already do every month, not a scramble."';
