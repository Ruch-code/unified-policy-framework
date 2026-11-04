// SOC 2 criteria catalog, criteria to control mapping and task grouping for /soc2.
// Task entries follow the task order of each level, so task positions and saved progress do not change.
const C = (name, desc) => ({ name, desc });
export const CONTROLS = {
  1: C('Employee background checks performed', 'New employees go through a background check.'),
  2: C('Code of Conduct acknowledged by contractors', 'Contractor agreements contain or point to the code of conduct.'),
  3: C('Code of Conduct acknowledged by employees and enforced', 'Employees acknowledge the code when hired, and breaches go through a disciplinary policy.'),
  4: C('Confidentiality Agreement acknowledged by contractors', 'Contractors sign a confidentiality agreement when engaged.'),
  5: C('Confidentiality Agreement acknowledged by employees', 'Employees sign a confidentiality agreement during onboarding.'),
  6: C('Performance evaluations conducted', 'Managers evaluate their direct reports at least annually.'),
  7: C('Board oversight briefings conducted', 'The board or a subcommittee hears about cybersecurity and privacy risk at least annually.'),
  8: C('Board expertise developed', 'The board is able to oversee security controls, and brings in outside experts when needed.'),
  9: C('Board meetings conducted', 'The board meets at least annually, keeps minutes and has independent directors.'),
  10: C('Management roles and responsibilities defined', 'Management duties for overseeing security controls are set out.'),
  11: C('Organization structure documented', 'An org chart shows the structure and who reports to whom.'),
  12: C('Roles and responsibilities specified', 'Job descriptions or a roles policy assign security control duties.'),
  13: C('Security awareness training implemented', 'Staff complete training within thirty days of hire and at least annually.'),
  14: C('Control self-assessments conducted', 'Self-assessments run at least annually, and corrective actions and any committed SLA are met.'),
  15: C('Log management utilized', 'A logging tool picks out events that could affect security objectives.'),
  16: C('Vulnerabilities scanned and remediated', 'External-facing systems get host scans at least quarterly, and critical and high findings are tracked until fixed.'),
  17: C('Incident response policies established', 'Policies for security and privacy incidents are written down and shared.'),
  18: C('Security policies established and reviewed', 'Security policies are documented and reviewed at least annually.'),
  19: C('Service description communicated', 'Internal and external users receive a description of the products and services.'),
  20: C('System changes communicated', 'Authorized internal users are told about system changes.'),
  21: C('Company commitments externally communicated', 'The MSA or TOS states the company\'s security commitments.'),
  22: C('System changes externally communicated', 'Customers hear about critical changes that may affect their processing.'),
  23: C('External support resources available', 'Customers have access to guidelines and technical support resources.'),
  24: C('Support system available', 'An external channel exists for reporting failures, incidents, concerns and complaints.'),
  25: C('Third-party agreements established', 'Written vendor agreements carry confidentiality and privacy commitments.'),
  26: C('Risk assessment objectives specified', 'Objectives are clear enough for related risks to be identified and assessed.'),
  27: C('Risk management program established', 'A documented program guides identifying threats, rating risks and mitigating them.'),
  28: C('Continuity and Disaster Recovery plans tested', 'A documented BC/DR plan is tested at least annually.'),
  29: C('Risks assessments performed', 'Risk assessments run at least annually and consider threats, change and fraud.'),
  30: C('Vendor management program established', 'The program keeps a critical vendor inventory, sets requirements and reviews vendors at least annually.'),
  31: C('Configuration management system established', 'Configurations are rolled out consistently.'),
  32: C('Access control procedures established', 'A policy explains how user access is added, changed and removed.'),
  33: C('Development lifecycle established', 'A formal SDLC covers development, acquisition, implementation, changes including emergency changes, and maintenance.'),
  34: C('Change management procedures enforced', 'Changes are authorized, documented, tested, reviewed and approved before reaching production.'),
  35: C('Backup processes established', 'A backup policy covers backing up and recovering customer data.'),
  36: C('Data retention procedures established', 'Formal procedures govern how data is kept and disposed of.'),
  37: C('Production application access restricted', 'Only authorized access to the system is allowed.'),
  38: C('Production database access restricted', 'Privileged database access depends on business need.'),
  39: C('Unique production database authentication enforced', 'Database access uses secure authentication, such as unique SSH keys.'),
  40: C('Encryption key access restricted', 'Privileged access to keys depends on business need.'),
  41: C('Firewall access restricted', 'Privileged firewall access depends on business need.'),
  42: C('Production OS access restricted', 'Privileged OS access depends on business need.'),
  43: C('Production network access restricted', 'Privileged network access depends on business need.'),
  44: C('Access requests required', 'Access follows a role, or a documented request approved by a manager.'),
  45: C('Unique network system authentication enforced', 'Network systems need unique usernames and passwords, or authorized SSH keys.'),
  46: C('Production deployment access restricted', 'Only authorized people can move changes to production.'),
  47: C('Data classification policy established', 'Confidential data is properly protected and restricted.'),
  48: C('Data encryption utilized', 'Datastores holding sensitive customer data are encrypted at rest.'),
  49: C('Network segmentation implemented', 'The network is divided to stop unauthorized access to customer data.'),
  50: C('Password policy enforced', 'In-scope components are set up to follow the password policy.'),
  51: C('Production inventory maintained', 'A formal inventory of production assets is kept.'),
  52: C('Remote access MFA enforced', 'Remote production access needs valid MFA.'),
  53: C('Remote access encrypted enforced', 'Remote production access runs over an approved encrypted connection.'),
  54: C('Unique account authentication enforced', 'Systems and applications need unique credentials or authorized SSH keys.'),
  55: C('Access reviews conducted', 'Access is reviewed at least quarterly, and changes are tracked until complete.'),
  56: C('Access revoked upon termination', 'Termination checklists make sure access is revoked within SLAs.'),
  57: C('Data center access reviewed', 'Data center access is reviewed at least annually.'),
  58: C('Visitor procedures enforced', 'Visitors to secure areas sign in, wear a badge and are escorted.'),
  59: C('Asset disposal procedures utilized', 'Media is purged or destroyed, with certificates of destruction.'),
  60: C('Customer data deleted upon leaving', 'Confidential customer data is removed when customers leave.'),
  61: C('Data transmission encrypted', 'Secure protocols protect data sent over public networks.'),
  62: C('Intrusion detection system utilized', 'The network is monitored continuously for early detection.'),
  63: C('Network firewalls reviewed', 'Rulesets are reviewed at least annually, and changes are tracked.'),
  64: C('Network firewalls utilized', 'Firewalls are configured to block unauthorized access.'),
  65: C('Service infrastructure maintained', 'Infrastructure receives routine patches, and patches for identified vulnerabilities.'),
  66: C('Network and system hardening standards maintained', 'Documented standards follow best practice and are reviewed at least annually.'),
  67: C('MDM system utilized', 'Mobile devices supporting the service are managed centrally.'),
  68: C('Anti-malware technology utilized', 'Anti-malware is deployed where needed, kept up to date and logged.'),
  69: C('Vulnerability and system monitoring procedures established', 'Policies address vulnerability management and system monitoring.'),
  70: C('Infrastructure performance monitored', 'A monitoring tool raises alerts at predefined thresholds.'),
  71: C('Incident management procedures followed', 'Incidents are logged, tracked, resolved and communicated.'),
  72: C('Incident response plan tested', 'The plan is tested at least annually.'),
  73: C('Continuity and Disaster Recovery plans established', 'Plans include how to communicate and maintain security if key personnel are unavailable.'),
  74: C('Cybersecurity insurance maintained', 'Insurance lowers the financial impact of disruptions.'),
  75: C('SOC 2 System Description', 'The description is completed for Section III of the audit report.'),
  76: C('Production data segmented', 'Policy bars confidential or sensitive customer data from non-production environments.'),
  77: C('Personal information collection changes communicated', 'People get notice before collection or a new use, and timely notice of policy changes.'),
  78: C('Privacy policy maintained', 'A plain, dated policy covers practices, purposes, rights, categories, methods, sources and third parties.'),
  79: C('Privacy policy available', 'People who need the policy can see it before or at collection.'),
  80: C('Privacy policy reviewed', 'The policy is reviewed as needed and when changes happen.'),
  81: C('Explicit consent obtained', 'Consent is documented and kept before sensitive information is collected, used or disclosed.'),
  82: C('User data collection consent obtained', 'Consent and preferences are captured at or before collection, and acted on in a timely way.'),
  83: C('Privacy information purpose communicated', 'New purposes are documented, individuals are told and consent is recorded.'),
  84: C('Non-essential privacy information opt-out available', 'People can opt in or out of non-essential cookies.'),
  85: C('Personal information collection reviewed', 'Collection methods are reviewed and approved before they start.'),
  86: C('Personal information reliability verified', 'Third-party sources are checked for reliability and lawful collection.'),
  87: C('Personal information policies and procedures established', 'Information is marked essential or optional, consented to and limited to stated purposes.'),
  88: C('Privacy data retained', 'Retention requirements are written down and followed.'),
  89: C('Data deletion requests handled', 'Requests are validated, flagged and completed under applicable law.'),
  90: C('Privacy inquiries handled', 'Privacy requests, complaints and disputes are captured, logged and verified.'),
  91: C('Personal information securely disposed', 'Information is anonymized, erased or destroyed once no longer required.'),
  92: C('Identity verification conducted', 'Identity is authenticated before personal information is accessed, where the law does not prohibit access.'),
  93: C('Privacy policy established', 'The policy states what is collected, obligations, rights and a current contact.'),
  94: C('Personal information changes communicated', 'Corrections or erasures are passed to authorized users and relevant third parties.'),
  95: C('Legal personal information tracked', 'Legal disclosures are logged and kept in a tracking system.'),
  96: C('Third party privacy documentation reviewed', 'Records of how third parties handle personal data are reviewed at least annually.'),
  97: C('Private data shared upon request', 'After verification, requested information is provided in a timely, portable or mailed form.'),
  98: C('Personal data update mechanisms available', 'People can update their information through a portal or a stated contact method.'),
  99: C('Privacy compliant procedures established', 'Privacy complaints are addressed, documented and communicated to the individual.'),
};

const S = (key, label, subs, addIfInScope = false) => ({ key, label, subs: subs.map(([id, title, ids]) => ({ id, title, ids })), addIfInScope });
export const MATRIX_SECTIONS = [
  S('CC1', 'CC 1.0 Control Environment', [['CC1.1', 'CC 1.1 COSO Principle 1: Integrity and ethical values', [1, 2, 3, 4, 5, 6]], ['CC1.2', 'CC 1.2 COSO Principle 2: Board independence and oversight', [7, 8, 9]], ['CC1.3', 'CC 1.3 COSO Principle 3: Structures, reporting lines, and authorities', [10, 11, 12]], ['CC1.4', 'CC 1.4 COSO Principle 4: Attracting and retaining competent individuals', [1, 6, 12, 13]], ['CC1.5', 'CC 1.5 COSO Principle 5: Accountability for internal control', [3, 6, 12]]]),
  S('CC2', 'CC 2.0 Communication and Information', [['CC2.1', 'CC 2.1 COSO Principle 13: Quality information for internal control', [14, 15, 16]], ['CC2.2', 'CC 2.2 COSO Principle 14: Internal communication of control information', [17, 10, 12, 13, 18, 19, 20]], ['CC2.3', 'CC 2.3 COSO Principle 15: External communication on control matters', [21, 22, 23, 19, 24, 25]]]),
  S('CC3', 'CC 3.0 Risk Assessment', [['CC3.1', 'CC 3.1 COSO Principle 6: Clarity in objectives for risk identification', [26, 27]], ['CC3.2', 'CC 3.2 COSO Principle 7: Risk identification and management', [28, 29, 27, 30]], ['CC3.3', 'CC 3.3 COSO Principle 8: Fraud risk assessment', [29, 27]], ['CC3.4', 'CC 3.4 COSO Principle 9: Assessment of impactful changes', [31, 29, 27]]]),
  S('CC4', 'CC 4.0 Monitoring Activities', [['CC4.1', 'CC 4.1 COSO Principle 16: Evaluation of internal control', [14, 30, 16]], ['CC4.2', 'CC 4.2 COSO Principle 17: Communication of control deficiencies', [14, 30]]]),
  S('CC5', 'CC 5.0 Control Activities', [['CC5.1', 'CC 5.1 COSO Principle 10: Development of control activities', [27, 18]], ['CC5.2', 'CC 5.2 COSO Principle 11: Technology control activities', [32, 33, 18]], ['CC5.3', 'CC 5.3 COSO Principle 12: Deployment of control activities', [34, 35, 36, 33, 17, 26, 27, 12, 18, 30]]]),
  S('CC6', 'CC 6.0 Logical and Physical Access Controls', [['CC6.1', 'CC 6.1 Logical access security implementation', [37, 32, 38, 39, 40, 41, 42, 43, 44, 45, 46, 47, 48, 49, 50, 51, 52, 53, 54]], ['CC6.2', 'CC 6.2 User registration and access control', [32, 55, 56, 44, 45]], ['CC6.3', 'CC 6.3 Role-based access management', [32, 55, 56, 44, 45]], ['CC6.4', 'CC 6.4 Physical access restrictions', [57, 58, 55]], ['CC6.5', 'CC 6.5 Decommissioning of logical and physical assets', [56, 59, 60, 36]], ['CC6.6', 'CC 6.6 External threat protection', [45, 61, 62, 63, 64, 52, 53, 65, 66]], ['CC6.7', 'CC 6.7 Information transmission security', [67, 61]], ['CC6.8', 'CC 6.8 Malware prevention and detection', [68, 33, 65]]]),
  S('CC7', 'CC 7.0 System Operations', [['CC7.1', 'CC 7.1 Vulnerability detection and monitoring', [34, 31, 69, 29, 16]], ['CC7.2', 'CC 7.2 System anomaly monitoring', [62, 15, 69, 65, 70, 16]], ['CC7.3', 'CC 7.3 Security event evaluation', [17, 71]], ['CC7.4', 'CC 7.4 Incident response program', [72, 17, 71, 65, 16]], ['CC7.5', 'CC 7.5 Security incident recovery', [28, 72, 17, 71]]]),
  S('CC8', 'CC 8.0 Change Management', [['CC8.1', 'CC 8.1 Change management process', [34, 46, 33, 65, 66, 16]]]),
  S('CC9', 'CC 9.0 Risk Mitigation', [['CC9.1', 'CC 9.1 Business disruption risk mitigation', [73, 74, 29, 27]], ['CC9.2', 'CC 9.2 Vendor and partner risk management', [25, 30]]]),
  S('SD', 'SD SOC 2 Supporting Compliance Documentation', [['SD', 'SD SOC 2 system and commitments description for audit', [75]]]),
  S('A1', 'A1 Availability', [], true),
  S('C1', 'C1 Confidentiality', [['C1.1', 'C 1.1 Confidential information identification', [47, 36, 76, 25, 54]], ['C1.2', 'C 1.2 Confidential information disposal', [59, 60]]]),
  S('PI', 'PI Processing Integrity', [], true),
  S('P1', 'P1 Notice', [['P1.1', 'P 1.1 Privacy notice to data subjects', [77, 78, 79, 80]]]),
  S('P2', 'P2 Choice and Consent', [['P2.1', 'P 2.1 Privacy choices and consent', [78, 81, 82, 83, 84]]]),
  S('P3', 'P3 Collection', [['P3.1', 'P 3.1 Personal information collection', [77, 85, 86, 87]], ['P3.2', 'P 3.2 Consent communication and collection', [81]]]),
  S('P4', 'P4 Use, Retention and Disposal', [['P4.1', 'P 4.1 Limited use of personal information', [87]], ['P4.2', 'P 4.2 Personal information retention', [36, 88]], ['P4.3', 'P 4.3 Secure disposal of personal information', [89, 90, 91]]]),
  S('P5', 'P5 Access', [['P5.1', 'P 5.1 Data subject access to personal information', [78, 92, 93]], ['P5.2', 'P 5.2 Personal information correction and amendment', [94, 93]]]),
  S('P6', 'P6 Disclosure and Notification', [['P6.1', 'P 6.1 Personal information disclosure', [95, 78, 82, 83, 25, 96, 30]], ['P6.2', 'P 6.2 Record of authorized disclosures', [96]], ['P6.3', 'P 6.3 Record of unauthorized disclosures', [17, 71]], ['P6.4', 'P 6.4 Privacy commitments from vendors and third parties', [17, 71, 25, 30]], ['P6.5', 'P 6.5 Third-party breach notification commitment', [17, 71, 25]], ['P6.6', 'P 6.6 Breach and incident notification', [17, 71]], ['P6.7', 'P 6.7 Personal information accounting', [97, 92, 90, 96]]]),
  S('P7', 'P7 Quality', [['P7.1', 'P 7.1 Accurate and complete personal information', [98, 93, 96]]]),
  S('P8', 'P8 Monitoring and Enforcement', [['P8.1', 'P 8.1 Privacy inquiry and dispute resolution', [7, 14, 71, 99, 93, 27, 96]]]),
];

export const sectionIds = (s) => [...new Set(s.subs.flatMap((x) => x.ids))];
const inGroup = (pred) => new Set(MATRIX_SECTIONS.filter(pred).flatMap(sectionIds));
const CONF = inGroup((s) => s.key === 'C1');
const PRIV = inGroup((s) => /^P\d/.test(s.key));
export const scopeBadges = (id) => [...(id <= 75 ? ['Security'] : []), ...(CONF.has(id) ? ['Confidentiality'] : []), ...(PRIV.has(id) ? ['Privacy'] : [])];
export const sectionInScope = (key, filter) => {
  if (filter === 'all') return true;
  if (/^CC/.test(key) || key === 'SD') return true;
  return filter === 'type2' && (key === 'C1' || /^P\d/.test(key));
};
export const controlInScope = (id, filter) => filter === 'all' || id <= (filter === 'type1' ? 75 : 99);

export const SCOPE_NOTE = 'Type I tests whether controls are suitably designed and in place on a specific date. Type II also tests whether they operated effectively over a period. In this example, the Type II has 24 more controls because its scope adds Confidentiality and Privacy, not because Type II adds controls by itself. Your scope depends on the Trust Services Criteria selected for your report.';
export const CATALOG_NOTE = 'These controls are an example catalog and are not mandatory for every organization. Your auditor and selected criteria determine the final scope.';
export const SCOPE_SUMMARY = [
  ['Type I', 'As-of date', 'Security', 'CC 1.0 to 9.0, SD', '75 controls'],
  ['Type II', 'Audit period', 'Security, Confidentiality, Privacy', 'CC 1.0 to 9.0, SD, C1, P1 to P8', '99 controls'],
];

// One entry per task, in level order: "primary|tag,tag".
export const SOC2_TASK_CRITERIA = [
  ['SD', 'SD', 'SD', 'CC6.1', 'CC6.6', 'CC7.1|CC7.2', 'CC7.3|CC7.4,CC7.5', 'CC8.1', 'CC6.1|C1.1', 'CC6.7|C1.1', 'CC6.1|C1.1', 'C1.1', 'C1.2', 'P1.1|P2.1', 'P3.1|P4.1', 'P5.1|P6.1', 'P7.1', 'P8.1', 'PI|PI1,PI2', 'PI|PI3,PI4', 'PI|PI5', 'A1|A1.1', 'A1|A1.2', 'A1|A1.1', 'A1|A1.2', 'A1|A1.2',
    'CC1.2|CC1.3', 'CC1.2', 'CC1.2', 'CC1.2', 'CC1.1|CC1.5', 'CC1.1', 'CC1.1', 'CC1.1|CC1.4,CC1.5', 'CC1.3|CC1.4,CC1.5,CC2.2,CC5.3', 'CC1.3', 'CC1.1|CC1.4', 'CC2.2', 'CC1.4|CC2.2', 'CC3.1|CC5.3', 'CC3.3', 'CC2.1|CC4.1,CC4.2', 'CC2.2|CC2.3', 'CC2.3', 'CC2.2|CC2.3', 'CC2.3|CC9.2', 'CC9.2|CC3.2,CC4.1,CC4.2,CC5.3', 'CC6.4', 'CC6.5', 'CC6.5', 'CC6.7', 'CC6.7|CC6.8', 'CC6.8', 'CC9.1'],
  ['CC6.1|CC6.2,CC6.3', 'CC6.1', 'CC6.6', 'CC7.1|CC7.2', 'CC6.8', 'CC6.1|C1.1,AWS,Azure,GCP,Alibaba', 'CC7.1', 'C1.1', 'CC6.7|C1.1', 'C1.1', 'P2.1|P1.1', 'P3.1|C1.1', 'P4.2', 'P3.1', 'P6.1', 'PI|PI3', 'PI', 'PI|PI2,PI5', 'PI', 'PI|PI4', 'A1|A1.1', 'A1', 'A1', 'A1', 'A1'],
  ['CC4.1|CC7.1', 'CC7.1|CC4.1', 'CC6.2|CC6.3', 'CC6.6', 'CC7.2', 'CC6.1|C1.1', 'CC6.1', 'C1.1', 'C1.2', 'CC6.6|C1.1', 'P5.1', 'P2.1', 'P4.2', 'P7.1', 'P8.1', 'PI|PI3', 'PI', 'PI|PI5', 'PI|PI2', 'PI', 'A1|A1.2', 'A1', 'A1', 'A1', 'A1', 'CC7.4|CC7.5', 'CC1.2', 'CC1.1|CC1.4,CC2.2', 'CC1.1|CC1.5', 'CC4.1|CC4.2,CC9.2', 'CC6.4|CC6.5', 'CC6.6', 'CC6.7|CC6.8', 'CC9.1'],
  ['CC6.1', 'CC7.1', 'C1.1', 'CC8.1', 'CC5.2', 'CC7.2|AWS', 'CC7.2|AWS', 'CC7.1|AWS', 'CC7.1|AWS', 'C1.1|AWS', 'CC7.2|Azure', 'CC7.2|Azure', 'CC7.1|Azure', 'C1.1|Azure', 'CC6.1|Azure', 'CC7.2|GCP', 'CC7.2|GCP', 'CC7.1|GCP', 'C1.1|GCP', 'CC7.1|GCP', 'CC7.2|Alibaba', 'CC7.2|Alibaba', 'CC7.1|Alibaba', 'CC6.1|Alibaba', 'CC4.2'],
];

// Control number to linked tasks, as "level.position" (level from 1). Blank means no linked task yet.
export const CONTROL_TASKS = { 1: ['1.36', '3.27'], 2: ['1.31'], 3: ['1.30', '3.27'], 4: ['1.32'], 5: ['1.32', '3.27'], 6: ['1.33', '3.28'], 7: ['1.27', '3.26'], 8: ['1.28'], 9: ['1.29'], 10: ['1.26'], 11: ['1.35'], 12: ['1.34'], 13: ['1.38', '3.27'], 14: ['1.41', '3.29'], 15: ['2.3', '3.4'], 16: ['3.1'], 17: ['1.6'], 19: ['1.42'], 20: ['1.44'], 22: ['1.44'], 23: ['1.43'], 24: ['1.43'], 25: ['1.45'], 26: ['1.39'], 27: ['1.40'], 28: ['1.22', '3.20'], 29: ['1.40'], 30: ['1.46', '3.29'], 31: ['4.7'], 32: ['1.3'], 33: ['1.7', '4.3'], 34: ['1.7'], 35: ['3.23'], 36: ['2.12'], 37: ['2.0'], 38: ['2.0'], 39: ['2.1'], 40: ['1.10'], 41: ['2.2'], 42: ['2.0'], 43: ['2.8'], 44: ['2.0'], 45: ['2.1'], 46: ['4.3'], 47: ['1.11'], 48: ['1.8'], 49: ['1.4'], 52: ['2.1'], 53: ['2.8'], 54: ['2.1'], 55: ['3.2'], 57: ['1.47', '3.30'], 58: ['1.47'], 59: ['1.48', '3.30'], 60: ['1.49', '3.30'], 61: ['1.9'], 62: ['2.2', '3.3'], 63: ['3.31'], 64: ['2.2'], 66: ['4.1'], 67: ['1.51', '3.32'], 68: ['1.52', '3.32'], 69: ['1.5'], 70: ['2.21'], 71: ['1.6'], 72: ['3.25'], 73: ['1.22'], 74: ['1.53', '3.33'], 75: ['1.0'], 76: ['2.9', '4.2'], 77: ['1.13'], 78: ['1.13'], 79: ['1.13'], 81: ['1.13', '2.10'], 82: ['2.10', '3.11'], 83: ['2.10'], 84: ['2.10'], 85: ['1.14'], 87: ['1.14'], 88: ['2.12', '3.12'], 89: ['1.15'], 90: ['1.15'], 91: ['1.12'], 92: ['1.15', '3.10'], 93: ['1.13'], 94: ['1.16'], 97: ['1.15', '3.10'], 98: ['1.16', '3.13'], 99: ['1.17'] };

// Level grouping. The privacy criteria share one section in the level view.
const LEVEL_SECTIONS = [...MATRIX_SECTIONS.filter((s) => !/^P\d/.test(s.key)), { key: 'P', label: 'P1 to P8 Privacy', subs: MATRIX_SECTIONS.filter((s) => /^P\d/.test(s.key)).flatMap((s) => s.subs) }];
const sectionFor = (primary) => LEVEL_SECTIONS.find((s) => s.key === primary || s.subs.some((x) => x.id === primary));

/** Groups task positions for one level. Tasks keep their own position, so progress keys are unchanged. */
export function groupLevel(levelIndex, count) {
  const list = SOC2_TASK_CRITERIA[levelIndex] || [];
  const groups = new Map();
  for (let i = 0; i < count; i++) {
    const [primary, tags = ''] = (list[i] || 'Unmapped').split('|');
    const sec = sectionFor(primary);
    const key = sec ? sec.key : 'Unmapped';
    if (!groups.has(key)) groups.set(key, { key, label: sec ? sec.label : 'Unmapped', addIfInScope: !!sec?.addIfInScope, order: sec ? LEVEL_SECTIONS.indexOf(sec) : 999, subs: new Map() });
    const subTitle = sec?.subs.find((x) => x.id === primary)?.title || '';
    const g = groups.get(key);
    if (!g.subs.has(subTitle)) g.subs.set(subTitle, []);
    g.subs.get(subTitle).push({ i, tags: tags ? tags.split(',') : [] });
  }
  return [...groups.values()].sort((a, b) => a.order - b.order).map((g) => {
    const titles = LEVEL_SECTIONS.find((s) => s.key === g.key)?.subs.map((x) => x.title) || [];
    return { ...g, subs: [...g.subs.entries()].sort((a, b) => titles.indexOf(a[0]) - titles.indexOf(b[0])) };
  });
}
