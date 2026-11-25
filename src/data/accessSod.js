// Least privilege, application access scoping and segregation of duties (SoD). Edit freely.

export const AS_INTRO = 'Access reviews only work if access was granted sensibly in the first place. This section covers the principle of least privilege, how to decide which applications are in scope and what each must have, and how to stop segregation of duties conflicts before they appear in a review.';

// [principle, what it means, how to implement, evidence an auditor accepts]
export const LEAST_PRIVILEGE = [
  ['Need to know and need to do', 'People get only the access their current job requires, for the data and actions they actually use.', 'Define roles from job functions, not from copying a colleague\'s access. Start new joiners on the role baseline only.', 'Role definitions approved by the application owner; provisioning tickets showing role-based grants.'],
  ['Deny by default', 'Access is closed unless explicitly granted.', 'New applications go live with no default access groups; firewall and cloud policies start from deny.', 'Configuration screenshots showing default-deny settings, with system name and timestamp.'],
  ['No standing privileged access', 'Administrator rights are granted for a task and expire, rather than held permanently.', 'Use just-in-time elevation with approval and a time limit; keep break-glass accounts sealed and alerted.', 'Elevation logs with approver, reason and expiry; break-glass usage reviews.'],
  ['Separate privileged and everyday accounts', 'Admins use a separate account for administration, not their email and browsing account.', 'Create named admin accounts with stronger MFA; block email and web on them.', 'Privileged user list showing separate admin identities.'],
  ['Remove what is not used', 'Access that has not been used for a set period is removed.', 'Report last-login per user per application; remove or suspend after 90 days unused unless justified.', 'Dormant account reports and the resulting removal tickets.'],
  ['Time-bound access for non-employees', 'Contractor, vendor and intern access ends on a known date.', 'Set an expiry date at provisioning from the contract end date; require renewal approval.', 'User list with expiry dates; renewal approvals.'],
];

// [requirement, why it matters, evidence]
export const APP_SCOPING_RULES = [
  ['Financially significant applications', 'Systems that create, change or report financial data are in scope for SOX and SOC 1 testing.', 'ERP, billing, payroll, revenue, consolidation and reporting tools.'],
  ['Applications holding personal or health data', 'Privacy laws and HIPAA require access limited to those who need it.', 'CRM, support desk, EHR or patient portals, HR systems.'],
  ['Production infrastructure and data stores', 'Direct access bypasses application controls.', 'Cloud consoles, databases, Kubernetes clusters, servers.'],
  ['Identity and security tools', 'Admins of these tools can grant themselves any access.', 'IdP, MDM, EDR, SIEM, password vault, CI/CD.'],
  ['Customer-facing admin consoles', 'Support and operations staff can change customer accounts or see their data.', 'Internal admin panels, impersonation tools.'],
];

// [requirement for every in-scope application, why, evidence]
export const APP_REQUIREMENTS = [
  ['Named owner', 'Someone accountable for who has access and for running reviews.', 'Application inventory with owner per system.'],
  ['SSO and MFA', 'One place to grant and remove access; strong authentication.', 'IdP application list; MFA policy.'],
  ['Defined roles and permissions', 'Reviewers can only judge access they understand.', 'Role catalogue with a plain description of each role.'],
  ['Approved provisioning workflow', 'Every grant is requested and approved before it happens.', 'Access request tickets with approval before the grant date.'],
  ['Timely removal', 'Leavers and movers lose access quickly.', 'HR leaver list matched to deactivation timestamps.'],
  ['Periodic review', 'Access is confirmed as still appropriate.', 'Signed review records and the removal tickets that followed.'],
  ['Privileged and service accounts listed', 'Powerful and non-human accounts are the highest risk.', 'Privileged user list; service account register with owners.'],
  ['Access and admin activity logged', 'Misuse can be detected and investigated.', 'Log source list in the SIEM; retention settings.'],
];

// [strategy, how it works, example conflict it prevents]
export const SOD_STRATEGIES = [
  ['Design roles with a conflict matrix', 'List the duties that must not sit with one person and check every role against it before it is approved.', 'Creating a vendor and approving payments to that vendor.'],
  ['Block conflicts at provisioning', 'The access request workflow checks the matrix and stops or escalates a request that would create a conflict.', 'A developer requesting production deploy rights on top of merge rights.'],
  ['Requester is never the approver', 'Workflows require a second person for approvals, enforced by the system rather than by policy alone.', 'An engineer approving their own pull request or change ticket.'],
  ['Separate build from release', 'Pipelines enforce peer review and deploy only through automation, so no individual can write and ship code alone.', 'One person writing, merging and deploying an unreviewed change.'],
  ['Split administration from use', 'People who administer a system do not also process transactions in it.', 'An ERP administrator who also posts journal entries.'],
  ['Detect what you cannot prevent', 'Run regular reports of users holding conflicting roles and review the activity they performed.', 'A finance user temporarily given two conflicting roles during a month-end close.'],
  ['Compensating controls for small teams', 'Where one person must hold conflicting access, add an independent review of their activity and document the risk acceptance.', 'A startup CFO who both approves and releases payments, with monthly bank statement review by the CEO.'],
  ['Watch for toxic combinations across systems', 'Conflicts can arise across two applications, not only inside one. Review combined access.', 'Admin in the HR system plus admin in payroll, allowing a fake employee to be created and paid.'],
];

export const AS_RELATED = 'Related on this page: Mandatory Access Requirements by Persona, User Access Review coverage and frequency, and Access Reviews by Design.';

// How auditors test segregation of duties: [test step, what the auditor does, evidence requested]
export const SOD_AUDIT_TESTS = [
  ['1. Understand the SoD design', 'Reads the SoD policy and the conflict matrix (ruleset) listing which roles or permissions must not be combined, for example create vendor and approve payment, or develop and deploy code.', 'SoD policy; SoD conflict matrix or ruleset with risk rating per conflict; role catalogue with permissions per role'],
  ['2. Confirm the population', 'Gets a complete list of users with their roles and permissions from each in-scope system and checks it is complete and accurate (where it came from, when it was pulled, filters used).', 'System-generated user and role export with date, query or report name and who ran it; HR active employee list to reconcile against'],
  ['3. Run or reperform the conflict analysis', 'Checks users against the conflict matrix, by reperforming the analysis or by reviewing the output of an SoD tool such as SAP GRC Access Control, Pathlock, SailPoint or Saviynt.', 'SoD conflict report for the period; tool configuration showing the ruleset in use'],
  ['4. Test that conflicts are prevented at provisioning', 'Samples new access requests and role changes to see whether conflicts were checked before access was granted.', 'Sample access request tickets showing SoD check, approver and approval date before provisioning'],
  ['5. Test approved exceptions and mitigating controls', 'Where a conflict is allowed, for example in a small team, checks it was approved by the right level, time-bound, and covered by a mitigating control that actually operated.', 'Exception register with approver, reason and expiry; mitigating control evidence such as a signed monthly review of transactions posted by that user'],
  ['6. Check privileged and emergency access', 'Reviews firefighter or break-glass use and admin accounts, which bypass normal SoD.', 'Emergency access logs, usage justification and the reviewer sign-off for each session'],
  ['7. Check periodic review', 'Confirms SoD conflicts are part of the user access review and that removals were completed.', 'Signed access review including SoD results; tickets proving removals'],
  ['8. Look at actual transactions', 'For high-risk conflicts, checks whether anyone actually did both steps, for example created and paid the same vendor.', 'Transaction log extract or audit trail for the conflicting activities'],
];
export const SOD_AUDIT_FINDINGS = 'Common findings: no documented conflict matrix; developers with production deploy rights and no compensating review; finance users who can both create vendors and release payments; exceptions with no expiry; mitigating reviews that were signed but never looked at the transactions; user lists that cannot be shown to be complete.';
