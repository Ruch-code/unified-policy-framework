// Zero trust principles and shadow IT, with practical examples. Edit freely.

export const ZT_INTRO = 'Zero trust means no user, device or network is trusted by default, even inside the office. Every request is checked against identity, device health and context, and access is limited to the one resource needed. It replaces the idea that anything on the corporate network or VPN is safe.';

// [principle, what it means, practical example, evidence an auditor accepts]
export const ZT_PRINCIPLES = [
  ['Verify explicitly', 'Every access decision uses all available signals: who the user is, the device, location, time and the sensitivity of what is requested.', 'A login from a new country triggers phishing-resistant MFA, even for a user who signed in an hour ago from the office.', 'Conditional access policies and sign-in logs showing step-up prompts.'],
  ['Least privilege, just in time', 'Users get only the access needed, only for as long as it is needed.', 'An engineer requests production database access for a two-hour incident window; it expires automatically.', 'Elevation requests with approver, reason and expiry.'],
  ['Assume breach', 'Design as if an attacker is already inside, so one compromised account or laptop cannot reach everything.', 'A compromised marketing laptop cannot reach the finance network, because each app is reached separately and networks are segmented.', 'Network segmentation diagrams; access paths per application.'],
  ['Healthy devices only', 'Device posture (managed, encrypted, patched, protected) is part of the access decision.', 'A personal laptop can open web email but cannot download customer files; a managed, encrypted laptop can.', 'MDM compliance policy linked to conditional access rules.'],
  ['Access to applications, not networks', 'Users connect to specific applications through an identity-aware proxy (ZTNA) instead of joining the whole network through a VPN.', 'A contractor sees only the ticketing app, not the internal network or other servers.', 'ZTNA or application proxy configuration per app and user group.'],
  ['Encrypt and inspect everywhere', 'Traffic is encrypted end to end, including inside the data centre, and sensitive data movement is monitored.', 'Service-to-service calls use mutual TLS; an upload of a customer list to a personal drive is blocked by DLP.', 'TLS and mTLS settings; DLP policy and incident records.'],
  ['Continuous monitoring', 'Trust is re-evaluated during the session, not only at login.', 'A session is cut when the device falls out of compliance or impossible travel is detected.', 'Session revocation logs; SIEM alerts and responses.'],
];

// CISA Zero Trust Maturity Model pillars: [pillar, starting point, target state]
export const ZT_PILLARS = [
  ['Identity', 'Passwords plus SMS codes; accounts created by hand.', 'Phishing-resistant MFA, single identity provider, automated joiner-mover-leaver, risk-based access.'],
  ['Devices', 'Laptops not centrally managed; no inventory.', 'Every device managed and inventoried; compliance checked at each sign-in.'],
  ['Networks', 'Flat network; VPN gives full internal access.', 'Segmented networks; application-level access; encrypted internal traffic.'],
  ['Applications and workloads', 'Apps reachable from the internet with their own logins.', 'Apps behind SSO and an access proxy; workloads authenticate to each other.'],
  ['Data', 'No data classification; data copied freely.', 'Data classified and labelled; DLP enforces handling rules; access logged.'],
];

export const ZT_SCENARIO_TITLE = 'Worked example: a finance analyst opens payroll from a cafe';
export const ZT_SCENARIO = [
  ['Sign-in', 'The identity provider checks the password and asks for a phishing-resistant MFA prompt because the location is new.', 'Verify explicitly'],
  ['Device check', 'MDM reports the laptop as managed, encrypted and patched, so the request continues.', 'Healthy devices only'],
  ['Access path', 'The analyst reaches only the payroll application through the access proxy; the rest of the network stays invisible.', 'Access to applications, not networks'],
  ['Permissions', 'The payroll role allows viewing and approving, but exports above a size limit need a second approver.', 'Least privilege'],
  ['During the session', 'The analyst tries to save an export to a personal cloud drive; DLP blocks it and logs an alert.', 'Encrypt and inspect everywhere'],
  ['Change in risk', 'Thirty minutes later the laptop misses a security update deadline; the session is ended until it is patched.', 'Continuous monitoring'],
];
export const ZT_CONTRAST = 'In a traditional VPN model, the same analyst would join the whole corporate network after one password check, and a stolen password would expose every reachable system.';

export const SIT_INTRO = 'Shadow IT is any software, cloud service or device used for work without the knowledge or approval of IT and security. It usually starts with good intentions, a team trying to work faster, but it creates data the company cannot see, contracts it has not reviewed and accounts that never get removed.';

// [scenario, risk, how it is found, response]
export const SIT_SCENARIOS = [
  ['A sales team signs up for a free AI note-taker that records customer calls', 'Customer personal data, and possibly health or financial details, sent to a vendor with no data processing agreement; recordings may train the vendor\'s model.', 'Calendar integrations and OAuth grants in the identity provider; expense reports.', 'Pause use, review the vendor\'s terms and security, and either approve it with a DPA and settings that disable training, or move the team to an approved tool.'],
  ['An engineer pushes company code to a personal code repository', 'Source code and secrets outside company control; access remains after the engineer leaves.', 'Secret-scanning alerts, Git host audit logs, data loss prevention on uploads.', 'Remove the code, rotate any exposed secrets, and require all work in company organisations with SSO.'],
  ['A manager exports the CRM to a personal spreadsheet to share with an agency', 'Bulk personal data in an unmanaged account; no record of who has it.', 'DLP alerts on large exports; CRM export logs.', 'Delete the copy, set up a governed sharing route, and limit export rights in the CRM.'],
  ['A team uses a free file-transfer site to send signed contracts', 'Confidential documents stored on a third party with unknown retention.', 'Web proxy or DNS logs; employee survey.', 'Block the site and point to the approved file-sharing tool.'],
  ['An employee grants a browser extension full access to their mailbox', 'The extension can read and send email as the employee.', 'OAuth app inventory in Google Workspace or Microsoft 365.', 'Revoke the grant, block high-risk OAuth scopes, and allow only reviewed apps.'],
  ['A department buys a project tool on a corporate card', 'No SSO, no offboarding, no security review; data spread across another vendor.', 'Card and expense reports matched against the approved vendor list.', 'Bring it under vendor management: security review, contract, SSO, and add it to the access review list.'],
];

// [discovery method, what it shows]
export const SIT_DISCOVERY = [
  ['Identity provider and OAuth grants', 'Which apps employees have connected to their work accounts, and with what permissions.'],
  ['Expense and corporate card reports', 'Paid software that never went through procurement.'],
  ['Web proxy, DNS or CASB logs', 'Which cloud services are used, how often, and how much data is uploaded.'],
  ['Endpoint and MDM software inventory', 'Installed applications and browser extensions on managed devices.'],
  ['Finance and procurement', 'New vendors appearing in accounts payable.'],
  ['Asking people', 'A short annual survey and an amnesty period often find tools no log shows.'],
];

// [practice, why it works]
export const SIT_PREVENT = [
  ['Make the approved path fast', 'A tool request answered within a few days removes the reason to work around IT.'],
  ['Publish an approved app catalogue', 'People can see what is already allowed for each common need.'],
  ['Triage by data, not by app', 'A tool that never touches company data needs little review; one that holds customer data needs the full vendor process.'],
  ['Block the highest-risk categories', 'Personal file sharing, unreviewed AI tools and high-risk OAuth scopes are blocked by default.'],
  ['Bring found tools into governance', 'Approve, replace or retire each discovered tool rather than only blocking it, and record the decision.'],
];

// [framework, related requirement]
export const ZT_SIT_CONTROLS = [
  ['ISO/IEC 27001:2022', 'A.5.9 inventory of assets, A.5.15 access control, A.5.23 cloud services, A.8.1 user endpoint devices, A.8.22 network segregation'],
  ['SOC 2', 'CC6.1 logical access, CC6.6 boundary protection, CC6.8 unauthorised software, CC9.2 vendor management'],
  ['NIST', 'SP 800-207 Zero Trust Architecture; CSF 2.0 Identify and Protect functions'],
  ['HIPAA', '164.308(b) business associate agreements, 164.312(a)(1) access control, 164.310(b) and (c) workstation use and security'],
];
