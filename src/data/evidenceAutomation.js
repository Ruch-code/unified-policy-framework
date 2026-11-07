// Automating evidence collection for GRC. Generic guidance; tools named by category only. Edit freely.
// Evidence rows: [control area, evidence, source system, collection method, frequency, what still needs a person]

export const EA_INTRO = 'Most audit evidence already exists as data in the systems you run. Automating collection means pulling it on a schedule, with a timestamp and a complete population, instead of taking screenshots the week before fieldwork. It does not remove human judgement: someone still has to review exceptions, approve risk decisions and sign off.';

export const EA_SOURCES = [
  ['Access control', 'User list with roles, MFA status and last login', 'Cloud IdP', 'API export', 'Daily snapshot; quarterly for review', 'Confirm each privileged user is appropriate'],
  ['Access control', 'Joiner, mover and leaver dates', 'HR system', 'API or scheduled report', 'Daily', 'Investigate any account active after a termination date'],
  ['Access control', 'Deprovisioning timestamps', 'IdP audit log', 'API pull matched to HR leavers', 'Daily', 'Chase accounts outside SSO'],
  ['Access control', 'Access review decisions and sign-off', 'Access review tool or ticketing', 'Export with reviewer, decision and timestamp', 'Per campaign', 'Spot-check reviewers who approve everything'],
  ['Change management', 'Merged changes with reviewer and approval', 'Git host', 'API export of pull requests', 'Continuous; population per period', 'Review emergency changes and any self-approvals'],
  ['Change management', 'Branch protection and required reviews', 'Git host settings', 'API configuration check', 'Daily', 'Approve any exception'],
  ['Change management', 'Deployments to production', 'CI/CD pipeline', 'Pipeline run log', 'Continuous', 'Match deployments to approved changes'],
  ['Infrastructure', 'Encryption at rest, public exposure, logging enabled', 'IaaS configuration', 'Cloud configuration rules', 'Continuous', 'Accept or fix flagged resources'],
  ['Infrastructure', 'Asset inventory', 'IaaS resource tags plus MDM', 'API export', 'Daily', 'Assign owners and ePHI or PII flags'],
  ['Infrastructure', 'Backup jobs and restore tests', 'Backup service', 'Job history export; restore test record', 'Daily jobs; quarterly restores', 'Perform and sign off the restore test'],
  ['Endpoints', 'Disk encryption, screen lock, OS version, anti-malware', 'MDM and endpoint protection', 'API export', 'Daily', 'Follow up devices out of compliance'],
  ['Vulnerability management', 'Scan results and remediation dates', 'Vulnerability scanner and ticketing', 'API export joined to tickets', 'Weekly', 'Approve risk acceptances past SLA'],
  ['Logging and monitoring', 'Log sources, retention and alert reviews', 'SIEM', 'Configuration export and alert history', 'Weekly', 'Triage alerts and record the outcome'],
  ['People', 'Training completion', 'Learning platform', 'API export', 'Weekly', 'Chase overdue staff'],
  ['People', 'Background checks and policy acceptance', 'Screening vendor and HR system', 'Report export', 'Per hire', 'Review adverse results'],
  ['Vendors', 'Vendor inventory, risk tier, review dates, contracts', 'Procurement or GRC tool', 'Export plus document links', 'Monthly', 'Perform the risk review itself'],
  ['Governance', 'Policy approval and annual review', 'Document system', 'Version history export', 'On change', 'Management approves the policy'],
  ['Governance', 'Risk register and treatment status', 'GRC tool or spreadsheet', 'Export', 'Monthly', 'Score risks and decide treatment'],
  ['Incidents', 'Incident register, including a nil return', 'Ticketing', 'Filtered export for the whole period', 'Monthly', 'Decide whether an incident is reportable'],
];

export const EA_MATURITY = [
  ['1. Manual', 'Screenshots and exports taken by hand before the audit.', 'Missing timestamps, partial populations, last-minute rush.'],
  ['2. Scheduled', 'Recurring exports saved to a dated evidence folder by a calendar task.', 'Still depends on people remembering; files drift from what the auditor needs.'],
  ['3. Integrated', 'Systems connected by API to a GRC tool or evidence store; evidence pulled on a schedule and mapped to controls.', 'Integrations break silently; mapping needs maintenance.'],
  ['4. Continuous control monitoring', 'Automated tests run against live data and raise an alert or ticket when a control fails.', 'Alert fatigue; tests must be reviewed so they prove what the control says.'],
];

export const EA_AUDIT_READY = [
  ['Completeness and accuracy', 'Auditors test that a system-generated report includes every record. Keep the query or API call, the run time and a record count, and show how the population ties to the source.'],
  ['Timestamps', 'Every artefact shows the system, the setting or record and the date and time it was captured.'],
  ['Population first, samples second', 'Provide the full population for the period. The auditor selects samples; do not pre-select them.'],
  ['Period coverage', 'Evidence must cover the whole audit period. A configuration check today does not prove it held six months ago, so keep the history.'],
  ['Chain of custody', 'Store raw outputs unchanged in a write-protected location. If you transform data, keep the raw file and the transformation.'],
  ['Superseded evidence', 'Archive and label replaced files rather than deleting them, in case the auditor asks for the original.'],
  ['Review status', 'Evidence that is uploaded but not yet checked is "file uploaded, to review", never "done".'],
  ['Partial populations', 'If part of a population is missing, keep it in draft and complete it before submission.'],
];

export const EA_HUMAN = [
  'Risk assessment scoring and treatment decisions.',
  'Access review judgements on exceptions, privileged roles and segregation of duties conflicts.',
  'Deciding whether an incident is a breach or reportable event.',
  'Approving policies, risk acceptances and exceptions.',
  'Walkthroughs and interviews with the auditor.',
  'Checking that an automated test actually proves the control as written.',
];

export const EA_STEPS = [
  ['Inventory evidence requests', 'List every item in last year\'s request list or the control matrix, with its source system and frequency.'],
  ['Rank by effort and repeat', 'Automate the evidence that recurs most and takes longest by hand first: user lists, change populations, training, scans.'],
  ['Connect the systems of record', 'Use read-only API access with a dedicated service account, least privilege and credential rotation.'],
  ['Define the evidence format', 'Name, timestamp, source, query used and record count for every pull.'],
  ['Map evidence to controls', 'One evidence item can support several frameworks; map it once.'],
  ['Add failure alerts', 'Alert when an integration stops returning data, not only when a control fails.'],
  ['Review with the auditor early', 'Agree before fieldwork that the automated outputs meet their reliability tests.'],
];

export const EA_UAR = 'For user access reviews specifically, automation removes most of the effort: pull user lists and last-login data, auto-recommend Keep or Remove using role baselines, send reviewers short exception lists, and confirm each removal actually happened. See Access Reviews by Design on the home page.';
