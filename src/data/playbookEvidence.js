// Evidence requirements for playbook tasks.
//
// New tasks carry a hand-written `evidence` object in their own data. Existing
// tasks get an `evidence` field assigned here from the task's subject, so every
// task shows a distinct "Evidence required" section without rewriting the
// original Control / How / Check text. Topic-based entries say so in `basis`.
//
import { NEW_TASK_TEMPLATES } from './playbookAdditions/templateLinks.js';

// Conventions that apply to every entry:
// - Screenshots show the system, the relevant setting and a timestamp.
// - Uploaded but unreviewed evidence is "file uploaded, to review", never "done".
// - A partly evidenced population stays in draft and is not submitted.
// - Superseded evidence is archived and labelled, not deleted.

const T = (artifacts, owner, frequency, sampling, pass, rejection) => ({ artifacts, owner, frequency, sampling, pass, rejection });

// Ordered: the first matching topic wins, so specific topics come first.
const TOPICS = [
  { id: 'learning', test: /^(study|learn|understand|review the|review your|define (phi|covered)|complete a .*knowledge|analy[sz]e (ocr|willful|the top|recent)|evaluate framework|map hipaa|map your organization's vulnerabilities|distinguish)/i,
    ev: T(['Completed study notes or knowledge check result', 'Summary of how the topic applies to the organization, reviewed by the compliance lead'], 'Person completing the playbook; reviewed by compliance lead', 'Once, and when the rule or guidance changes', 'Not a population control', 'Summary is specific to the organization and reviewed', 'Generic notes copied from the regulation with no link to the organization') },
  { id: 'isms', test: /clause[s]? \d|\bisms\b|statement of applicability|annex a/i,
    ev: T(['Documented information required by the clause (for example scope, policy, risk methodology, SoA, objectives, audit and review results)', 'Approval record with date', 'Version history'], 'ISMS manager', 'Reviewed at planned intervals, at least annually', 'Not a population control unless the clause produces repeated records', 'Required documented information exists, is approved and is current', 'Document exists but does not meet the clause, for example an SoA without justification for exclusions') },
  { id: 'physical', test: /^(?!.*logical)(?=.*(facility|physical|workstation|visitor|badge|premises))/is,
    ev: T(['Physical security procedure', 'Visitor and access logs', 'Access list reviews, or provider assurance report review for hosted facilities'], 'Facilities or office manager', 'Access lists reviewed at least quarterly; provider reports annually', 'Visitor entries and access changes in the period', 'Access limited to authorised people and reviewed', 'Cloud-only organization gives no evidence of reviewing provider physical controls') },
  { id: 'audit-practice', test: /\baudit (plan|report|checklist|scope|interview|evidence|sampling|program|findings)|opening meeting|non-?conformit|\bncr\b|irca|pecb|auditor|audit fundamentals|closing meeting|annex a control families|clause structure|corrective action verification|common soc 2 findings/i,
    ev: T(['Audit plan or checklist used', 'Working papers with evidence references', 'Finding or NCR records with requirement cited'], 'Lead auditor or internal audit lead', 'Per audit', 'Per audit: every finding traced to at least one evidence item', 'Each conclusion is traceable to dated, attributable evidence and a clause or control reference', 'Findings stated without objective evidence or without the requirement they breach') },
  { id: 'system-description', test: /system description/i,
    ev: T(['Approved system description (versioned)', 'Data flow and network diagrams', 'List of subservice organizations and CUECs'], 'Security lead with service owner', 'Annually and on material system change', 'Not a population control', 'Description matches the in-scope system and was approved before the audit period starts', 'Description is generic, out of date, or omits subservice organizations') },
  { id: 'access-review', test: /access review|recertif|user access/i,
    ev: T(['Exported user list per in-scope system with export timestamp', 'Reviewer sign-off with date', 'Tickets for removals or changes found in the review'], 'System owner; reviewed by security', 'Quarterly (or as policy states)', 'All in-scope systems each quarter; auditor samples quarters and checks removals', 'Every listed user was reviewed, decisions recorded, and changes completed within the policy deadline', 'User list pulled after the review date, or removals not evidenced') },
  { id: 'identity', test: /\bmfa\b|\bsso\b|identity|authenticat|rbac|privileged|least privilege|\biam\b|password|logical access|conditional access|access control/i,
    ev: T(['Screenshot of identity provider MFA or SSO policy with timestamp', 'Role or permission matrix', 'Export of privileged accounts'], 'IT or identity administrator', 'Continuous; evidenced at least quarterly', 'All human accounts; sample of new joiners and privileged users', 'MFA enforced for all users in scope; privileged access limited to named, approved people', 'Policy shown but exceptions or excluded groups not explained') },
  { id: 'provisioning', test: /onboard|offboard|deprovision|user provisioning|termination|joiner|leaver|revocation/i,
    ev: T(['Access request and approval tickets', 'Termination list from HR', 'Account disable timestamps'], 'IT with HR', 'Per event', 'Population of joiners and leavers in the period; auditor samples (often 25 or a percentage)', 'Access granted only after approval; removed within the policy deadline (for example 24 hours)', 'Leaver accounts disabled late or approval dated after access was granted') },
  { id: 'change', test: /change management|cc8|pull request|ci\/cd|code review|release management/i,
    ev: T(['Change tickets with approvals', 'Pull request reviews and merge records', 'Deployment logs'], 'Engineering lead', 'Per change', 'Population of production changes in the period; auditor samples', 'Each sampled change was reviewed and approved by someone other than the author before deployment, and tested', 'Self-approved changes, or emergency changes with no after-the-fact review') },
  { id: 'vuln', test: /vulnerab|pen ?test|penetration|vulnerability scan|patch|security command center|waf and ids/i,
    ev: T(['Scan reports with dates', 'Penetration test report and retest', 'Remediation tickets with closure dates'], 'Security or infrastructure lead', 'Scans at least monthly or as policy states; pen test annually', 'All critical and high findings in the period', 'Findings remediated within policy timelines or formally risk-accepted', 'Scan scope does not cover all in-scope assets, or overdue findings have no exception') },
  { id: 'logging', test: /\blog(s|ging)?\b|siem|monitoring and detection|alert|threat detection|cc7\.[12]|audit trail|audit control|cloudtrail|actiontrail|guardduty|sentinel|chronicle/i,
    ev: T(['Logging configuration screenshots with timestamp', 'Sample alerts and their tickets', 'Log retention settings'], 'Security operations', 'Continuous; evidenced quarterly', 'Sample of alerts in the period traced to response', 'Required sources are logged, retained for the policy period, and alerts are triaged', 'Alerts generated but no evidence anyone reviewed them') },
  { id: 'incident', test: /incident|breach|cc7\.[3-5]|security incident|tabletop/i,
    ev: T(['Incident response plan (approved, versioned)', 'Incident tickets with timeline', 'Post-incident reviews', 'Tabletop or test record'], 'Incident response lead', 'Plan reviewed and tested at least annually; records per incident', 'All incidents in the period; auditor samples', 'Incidents classified, handled per plan, and lessons learned recorded', 'No test of the plan in the period, or incidents closed without root cause') },
  { id: 'dlp', test: /\bdlp\b|data loss prevention|macie|purview|sensitive data (discovery|inspection)|data discovery/i,
    ev: T(['DLP or discovery policy configuration with timestamp', 'Scan results for in-scope stores', 'Alert and remediation tickets'], 'Security or data protection engineer', 'Continuous; scans at least monthly', 'All in-scope data stores; sample of alerts', 'Sensitive data located, policies enforced and alerts resolved', 'Policies in audit-only mode with no review of matches') },
  { id: 'secrets', test: /secret scanning|secrets? (management|in code)|leaked credential/i,
    ev: T(['Secret scanning configuration on all repositories', 'Findings and rotation tickets'], 'Engineering or security lead', 'Continuous', 'All repositories; sample of findings', 'Scanning enabled everywhere and exposed secrets rotated', 'Secret removed from code but never rotated') },
  { id: 'encryption', test: /encrypt|kms|key (management|rotation)|\btls\b|crypto|hsm|key vault|transmission/i,
    ev: T(['Screenshots of encryption settings for in-scope stores with timestamp', 'Key management configuration and rotation settings', 'TLS configuration scan result'], 'Infrastructure or security engineer', 'Continuous; evidenced at least annually and on change', 'All in-scope data stores and endpoints', 'Encryption at rest and in transit is enabled everywhere in scope with managed keys', 'Evidence covers one resource only, not the population') },
  { id: 'backup-dr', test: /backup|restore|disaster|recovery|business continuity|bcp|failover|a1\.[23]|contingency/i,
    ev: T(['Backup job configuration and success logs', 'Restore test record', 'DR or BCP plan and test report'], 'Infrastructure lead', 'Backups daily or as policy states; restore and DR tests at least annually', 'Sample of backup runs; all DR tests in period', 'Backups succeed, a restore was tested, and recovery objectives were met in testing', 'Backups configured but never restored, or DR test not documented') },
  { id: 'availability', test: /availability|capacity|auto-?scal|health check|uptime|\bslas?\b|load test|benchmark/i,
    ev: T(['Capacity and monitoring dashboards with timestamp', 'Auto-scaling or health check configuration', 'Availability reports against commitments'], 'Site reliability or infrastructure lead', 'Monthly review', 'Monthly reports in the period', 'Availability commitments monitored and capacity issues acted on', 'Dashboards exist but no evidence of review or action') },
  { id: 'vendor', test: /vendor|third[- ]party|supplier|subservice|business associate|baa|sub-?processor|processor agreement|art\. 28/i,
    ev: T(['Vendor inventory with risk tier', 'Due diligence records (SOC 2 or questionnaire review)', 'Signed agreements (DPA or BAA where applicable)'], 'Vendor manager', 'Before onboarding and at least annually for higher-risk vendors', 'All vendors with data or system access; auditor samples', 'Each sampled vendor was assessed and has a current agreement with required terms', 'Vendor reports collected but never reviewed, or contracts missing required clauses') },
  { id: 'risk', test: /risk (analysis|assessment|management|treatment|register)|6\.1\.2|8\.2|threat model/i,
    ev: T(['Risk assessment report with date and approver', 'Risk register with owners and treatment', 'Management approval of residual risk'], 'Risk or security lead', 'At least annually and on significant change', 'Not a population control', 'Assessment covers in-scope assets and threats, including fraud where relevant, and is approved', 'Register not updated during the period or approval missing') },
  { id: 'training', test: /training|awareness|competence|phishing/i,
    ev: T(['Training completion report with dates', 'Training content version', 'New-hire training records'], 'HR or security awareness owner', 'Within 30 days of hire (or policy timeline) and annually', 'All workforce members; auditor samples new hires and existing staff', 'Every sampled person completed training on time', 'Completion report missing new hires or contractors') },
  { id: 'policy', test: /polic(y|ies)|procedure|documented information|7\.5|governance|charter|accountab|roles and responsib/i,
    ev: T(['Approved policy with version, owner and approval date', 'Evidence of publication to staff', 'Review history'], 'Policy owner', 'Reviewed at least annually', 'Not a population control; acknowledgements sampled where required', 'Policy approved by the right authority, reviewed on schedule, and available to staff', 'Policy unsigned, overdue for review, or not communicated') },
  { id: 'data-class', test: /classif|data map|inventory|ropa|record(s)? of processing|asset/i,
    ev: T(['Data or asset inventory export with date', 'Classification scheme', 'Records of processing (where applicable)'], 'Data owner or privacy lead', 'Reviewed at least annually and on change', 'Sample of systems traced to the inventory', 'Inventory is complete for in-scope systems and each entry has an owner and classification', 'Inventory missing systems found during testing') },
  { id: 'retention', test: /retention|deletion|disposal|erasure|destroy|ttl|storage limitation/i,
    ev: T(['Retention schedule', 'Deletion job configuration or logs', 'Disposal or deletion certificates'], 'Data owner', 'Per schedule; reviewed annually', 'Sample of records past retention and of disposal events', 'Data past retention deleted or justified; disposal evidenced', 'Retention schedule exists but data is kept indefinitely') },
  { id: 'privacy-rights', test: /dsar|data subject|rights request|access request|rectif|portab|objection|consent|right of access|164\.52[4-8]/i,
    ev: T(['Request log with received and closed dates', 'Sample responses', 'Identity verification records'], 'Privacy lead', 'Per request', 'All requests in the period; auditor samples', 'Requests answered within the legal deadline with identity verified', 'No request log, or deadlines missed without documented extension') },
  { id: 'privacy-impact', test: /dpia|impact assessment|privacy by design|art\. 25|art\. 35/i,
    ev: T(['DPIA or privacy review records', 'Screening decisions for new processing', 'Sign-off by DPO or privacy lead'], 'Privacy lead or DPO', 'Before high-risk processing starts and on change', 'All new or changed processing in the period', 'High-risk processing has a completed assessment before launch', 'Assessment completed after launch or without mitigations tracked') },
  { id: 'transfer', test: /cross-border|international transfer|transfer mechanism|\bsccs?\b|adequacy|residency|art\. 4[4-9]/i,
    ev: T(['Transfer inventory', 'Signed transfer mechanism (SCCs or other)', 'Transfer impact assessments'], 'Privacy lead with legal', 'Before transfer starts; reviewed on change', 'All transfers outside the EEA', 'Each transfer has a valid mechanism and documented assessment', 'Transfers found that are not in the inventory') },
  { id: 'endpoint', test: /endpoint|edr|malware|antivirus|mdm|device|workstation/i,
    ev: T(['Device management console export with compliance status and timestamp', 'Anti-malware coverage report'], 'IT administrator', 'Continuous; evidenced at least quarterly', 'All company devices; sample of new devices', 'All in-scope devices enrolled, encrypted and protected', 'Devices missing from the export or out of compliance with no follow-up') },
  { id: 'network', test: /network|firewall|segment|waf|ids|ips|vpc|perimeter/i,
    ev: T(['Firewall or security group rule export with timestamp', 'Network diagram', 'Rule review record'], 'Network or infrastructure lead', 'Rules reviewed at least annually (or as policy states)', 'All in-scope rule sets', 'Rules are justified, reviewed and restrict traffic to what is needed', 'Overly broad rules (for example open to the internet) with no justification') },
  { id: 'environments', test: /environment|staging|non-?production|dev\b|segregat/i,
    ev: T(['Account or project structure showing separation', 'Access lists per environment', 'Attestation that production data is not used in non-production'], 'Engineering lead', 'Reviewed at least annually', 'All environments', 'Production is separated and production data is not in lower environments without masking', 'Shared credentials or production data copied to test') },
  { id: 'processing-integrity', test: /^(?!.*siem)(?=.*(processing integrity|\bpi[0-9]|validation|reconcil|checksum|integrity|error handling|data accuracy|completeness))/is,
    ev: T(['Validation rules and test results', 'Reconciliation reports', 'Error logs and resolution tickets'], 'Product or data engineering lead', 'Per processing cycle; reviewed monthly', 'Sample of processing runs and errors', 'Inputs, processing and outputs are validated and errors resolved', 'Reconciliations performed but not reviewed or signed off') },
  { id: 'cloud-config', test: /aws|azure|gcp|alibaba|cloudtrail|guardduty|defender|security hub|config rule|cloud/i,
    ev: T(['Cloud security posture report with timestamp', 'Configuration screenshots for key services', 'Findings and remediation tickets'], 'Cloud or infrastructure lead', 'Continuous; evidenced at least quarterly', 'All in-scope accounts or subscriptions', 'Security services enabled in all in-scope accounts and findings tracked', 'Evidence from one account only') },
  { id: 'certification', test: /certification|surveillance|17021|stage [12]|management review|9\.3|internal audit|9\.2|improvement|10\.[12]|corrective/i,
    ev: T(['Internal audit programme and reports', 'Management review minutes', 'Corrective action log'], 'ISMS manager', 'Internal audit and management review at planned intervals (at least annually)', 'All nonconformities raised in the period', 'Audits and reviews held as planned, with actions tracked to closure', 'Management review missing required inputs, or corrective actions without root cause') },
];

const ORDER = ['system-description', 'audit-practice', 'learning', 'isms', 'incident', 'vendor', 'privacy-rights', 'privacy-impact', 'transfer', 'encryption', 'physical', 'availability', 'retention', 'processing-integrity', 'dlp', 'secrets', 'backup-dr', 'vuln', 'environments', 'network', 'endpoint', 'access-review', 'provisioning', 'identity', 'change', 'logging', 'risk', 'training', 'data-class', 'certification', 'policy', 'cloud-config'];
TOPICS.sort((a, b) => ORDER.indexOf(a.id) - ORDER.indexOf(b.id));

const GENERIC = T(['Document or configuration evidence for the control with date', 'Approval or review record'], 'Control owner', 'As defined in the policy, at least annually', 'Where the control repeats, the full population for the period with an auditor sample', 'Evidence shows the control operated as described during the period', 'Evidence undated or not attributable to a person or system');

export function evidenceForTask(task, frameworkId = '') {
  const usable = TOPICS.filter(t => t.id !== 'audit-practice' || /-la$|^iso-27001-la$/.test(frameworkId));
  // Title and control decide first; the longer How text is only a fallback,
  // because it mentions many incidental tools and terms.
  const head = [task.title, task.control].filter(Boolean).join(' ');
  const topic = usable.find(t => t.test.test(head)) || usable.find(t => t.test.test(task.how || ''));
  const ev = topic ? topic.ev : GENERIC;
  return { ...ev, basis: `Topic-based entry (${topic ? topic.id : 'general'}). Tailor artifacts and owners to your systems.` };
}

/** Return the framework with an `evidence` field on every task that lacks one. Order and count are unchanged. */
export function withEvidence(framework) {
  const mapTasks = (tasks) => (tasks || []).map(t => {
    if (typeof t === 'string') return t;
    const withEv = t.evidence ? t : { ...t, evidence: evidenceForTask(t, framework.id) };
    const pinned = NEW_TASK_TEMPLATES[t.title];
    return pinned && pinned.length && !t.templates ? { ...withEv, templates: pinned } : withEv;
  });
  const mapLevel = (w) => (Array.isArray(w.days) ? { ...w, days: w.days.map(d => ({ ...d, tasks: mapTasks(d.tasks) })) } : { ...w, tasks: mapTasks(w.tasks) });
  const out = { ...framework };
  for (const key of ['weeks', 'weeksData', 'modules']) if (Array.isArray(framework[key])) out[key] = framework[key].map(mapLevel);
  return out;
}

/** Append new tasks at the end of a level so saved progress keys (w{week}-{index}) for existing tasks do not move. */
export function appendToLevel(framework, levelIndex, { dayTitle, tasks }) {
  const key = ['weeksData', 'modules', 'weeks'].find(k => Array.isArray(framework[k]) && framework[k].length);
  const level = framework[key][levelIndex];
  if (Array.isArray(level.days)) level.days.push({ day: (level.days[level.days.length - 1]?.day || 0) + 1, title: dayTitle, tasks });
  else level.tasks.push(...tasks);
}

/** Add evidence (and optional extra criteria references) to existing tasks matched by exact title. Text fields are not changed. */
export function extendTasks(framework, map) {
  const key = ['weeksData', 'modules', 'weeks'].find(k => Array.isArray(framework[k]) && framework[k].length);
  for (const level of framework[key]) {
    const lists = Array.isArray(level.days) ? level.days.map(d => d.tasks) : [level.tasks];
    for (const list of lists) for (const t of list || []) {
      const ext = t && map[t.title];
      if (!ext) continue;
      if (ext.evidence) t.evidence = ext.evidence;
      if (ext.extraCriteria) t.alsoMapsTo = ext.extraCriteria;
    }
  }
}
