// Anonymised case study: two incidents at a large Indian centralised exchange.
// Each point is labelled as a reported fact or an assessed control gap. No regulatory violation is claimed.
// The incident flows, laundering path and control lists earlier on the page are not repeated here.

export const TITLE = 'When a fixed control stays open: two hot wallet losses at an Indian centralised exchange';
export const ABSTRACT = 'A large Indian centralised cryptocurrency exchange lost about USD 44 million in mid-2025 after a software engineer\'s company laptop was compromised through a fake side-job offer, and about USD 16 million in late 2026 from deposit addresses that had been retired after the first incident but were still in use. Customer wallets were reported as unaffected both times and the Exchange absorbed the losses. This analysis separates reported facts from assessed control gaps, maps them to ISO 27001:2022, SOC 2 and CCSS, sets out the Indian regulatory obligations a VDA service provider must be able to evidence, and gives a phased remediation roadmap and a 30/60/90-day plan for a GRC lead joining after incidents like these.';

export const EXEC = [
  'Two losses of about USD 44 million and USD 16 million, about 15 months apart, both from company-controlled wallets rather than customer wallets (reported fact).',
  'The first entry point was social engineering: a fake recruiter, a side job, and work moved from a personal device to a company laptop (reported fact).',
  'The second loss came from addresses retired after the first incident that were still in use and still receiving deposits (reported fact). The corrective action was not closed or verified (assessed control gap).',
  'In both incidents the theft was first raised by outside investigators, and the first public statement in the second incident was later corrected (reported fact). Detection and crisis communication are the weakest areas (assessed).',
  'Absorbing losses from treasury protected customers, but it is a financial backstop, not a control (assessed).',
  'Priority actions: signing isolation and multi-party approval, hot wallet limits, a verified wallet lifecycle, monitored automation, and independent verification of every corrective action.',
  'The board should track hot wallet exposure, reconciliation breaks, time to detect, and overdue corrective actions monthly.',
];

export const PATH_A = [
  ['Reported fact', 'A software engineer accepted a part-time side job from people posing as recruiters.'],
  ['Reported fact', 'The tasks moved from a personal device to the company laptop, where malware was installed.'],
  ['Reported fact', 'The compromised access reached internal wallet systems and drained an operational account used only for liquidity on a partner exchange.'],
  ['Reported fact', 'A test transfer of about 1 USDT came first, in the early hours.'],
  ['Assessed control gap', 'The engineer\'s endpoint or session could reach wallet systems, so signing was not isolated from day-to-day developer access.'],
  ['Assessed control gap', 'The test transfer and the large drain did not trigger an alert or block in time, which points to missing anomaly rules or hot wallet limits.'],
];

export const PATH_B = [
  ['Reported fact', 'Deposit addresses were retired after the first incident.'],
  ['Reported fact', 'At least one was still used by a liquidity provider for about 10 months afterwards and swept user deposits into the current hot wallet within the previous several months.'],
  ['Reported fact', 'The automated deposit-sweeping service failed for a period, so deposits built up at the old addresses.'],
  ['Reported fact', 'Leadership first called the reports a false alarm; the loss was later confirmed and absorbed.'],
  ['Assessed control gap', '"Retired" was a label, not a verified state: keys stayed usable, partners were not cut over, and nothing alerted on activity.'],
  ['Assessed control gap', 'The sweeping service had no health monitoring, and on-chain balances were not reconciled against the ledger often enough to notice the build-up.'],
];

// [control area, what failed, basis, ISO 27001:2022 Annex A, SOC 2 / CCSS, severity]
export const TABLE_A = [
  ['Endpoint security and acceptable use', 'Malware installed on a company laptop through non-work tasks', 'Reported fact', 'A.8.1, A.8.7, A.5.10', 'CC6.8; CCSS operator security', 'High'],
  ['Outside employment and conflict of interest', 'A side job was taken on and performed using company equipment', 'Reported fact; policy gap assessed', 'A.6.2, A.5.10, A.6.4', 'CC1.1, CC1.4', 'Medium'],
  ['Privileged access and signing isolation', 'A compromised developer endpoint could reach wallet systems', 'Assessed', 'A.8.2, A.8.3, A.8.22, A.5.15', 'CC6.1, CC6.3; CCSS key usage', 'High'],
  ['Multi-party transaction authorisation', 'A large outflow completed without an effective second approver', 'Assessed', 'A.5.3, A.8.2', 'CC6.1; CCSS key usage (multi-signature or MPC)', 'High'],
  ['Hot wallet limits', 'About USD 44 million was reachable from one operational account', 'Assessed', 'A.5.15, A.8.2', 'CC6.1; CCSS key storage', 'High'],
  ['Transaction monitoring and anomaly alerting', 'Test transfer and drain not stopped in time', 'Assessed', 'A.8.16, A.8.15', 'CC7.2', 'High'],
  ['Social engineering awareness', 'Fake recruiter approach succeeded', 'Reported fact', 'A.6.3', 'CC1.4, CC2.2', 'Medium'],
  ['Third-party and liquidity provider management', 'Large company balance held at a partner exchange', 'Reported fact; risk assessed', 'A.5.19, A.5.21, A.5.22', 'CC9.2', 'Medium'],
  ['Incident response', 'Theft identified externally; disclosure about 17 hours later', 'Reported fact', 'A.5.24 to A.5.26', 'CC7.3, CC7.4', 'High'],
  ['Crisis communications', 'Public statement followed outside reporting', 'Reported fact', 'A.5.24, A.5.26', 'CC2.3, CC7.4', 'Medium'],
];

export const TABLE_B = [
  ['Wallet and asset lifecycle and decommissioning', 'Retired addresses still held funds and were still in use', 'Reported fact', 'A.5.9, A.5.11, A.8.10', 'CC6.5; CCSS wallet creation, key compromise policy', 'High'],
  ['Corrective action (CAPA) closure and verification', 'Post-incident retirement of addresses was not verified', 'Assessed', 'Clause 10.2 (nonconformity and corrective action)', 'CC4.2, CC7.5', 'High'],
  ['Automation monitoring (deposit sweeping)', 'Sweep service failed without timely detection', 'Reported fact; monitoring gap assessed', 'A.8.16, A.8.6', 'CC7.2, A1.1', 'High'],
  ['On-chain to ledger reconciliation', 'Build-up at old addresses not caught', 'Assessed', 'A.8.16, A.5.9', 'CC7.2, PI1 if in scope; CCSS proof of reserve', 'High'],
  ['Third-party and liquidity provider management', 'A liquidity provider kept using a retired address for about 10 months', 'Reported fact', 'A.5.19 to A.5.22', 'CC9.2', 'High'],
  ['Hot wallet limits', 'Losses included the current hot wallet', 'Reported fact', 'A.5.15, A.8.2', 'CC6.1; CCSS key storage', 'Medium'],
  ['Incident response', 'Reports dismissed before investigation', 'Reported fact', 'A.5.25, A.5.26', 'CC7.3, CC7.4', 'High'],
  ['Crisis communications', 'Initial "false alarm" statement later corrected', 'Reported fact', 'A.5.24', 'CC2.3', 'High'],
];

export const THEMES = [
  ['Control lifecycle not closed', 'Fixes such as retiring addresses were treated as done when a decision was made, not when keys, balances, partners and alerts were all confirmed.'],
  ['Remediation not independently verified', 'Nobody outside the team that did the work tested that the corrective action held, so the gap survived for months.'],
  ['Automation without monitoring', 'Critical jobs like deposit sweeping ran with no health check, so failure was silent.'],
  ['Communication ahead of investigation', 'Public statements came before facts were established, and one had to be corrected.'],
  ['People controls behind technical controls', 'A social engineering lure and an outside job bypassed technical defences on a trusted laptop.'],
];

// [regulation or standard, key obligation, relevance to these incidents, evidence a GRC team should hold]
export const REG = [
  ['PMLA 2002 and FIU-IND AML & CFT Guidelines for VDA service providers (updated January 2026)', 'Registration with FIU-IND, KYC (the 2026 update adds measures such as live selfie checks and geo-tagging), a qualified principal officer, suspicious transaction reporting, record retention', 'Potential exposure if stolen funds or related accounts touch the Exchange\'s platform without review; obligation to evidence STR decisions', 'Registration record, principal officer appointment, STR decision log for both incidents, wallet screening records, retention schedule'],
  ['CERT-In Directions (April 2022)', 'Report specified cyber incidents within 6 hours of noticing; keep ICT logs for 180 days in India; VDA providers keep KYC and transaction records for five years', 'Both incidents are likely reportable categories. The timing of any notification is not known from the reported facts', 'Incident tickets with time noticed and time reported, CERT-In acknowledgements, log retention configuration, record retention evidence'],
  ['DPDP Act 2023 and Rules', 'Breach notification to the Data Protection Board and affected people when personal data is breached', 'Applies only if personal data was affected; no personal data breach was reported', 'Personal data impact assessment for each incident, recorded decision on notification'],
  ['ISO 27001:2022', 'ISMS with risk treatment, Annex A controls and corrective action under clause 10.2', 'Gaps in endpoint, privileged access, monitoring, supplier and corrective action controls', 'Risk register entries, SoA, CAPA records with verification, internal audit and management review'],
  ['SOC 2 Type II', 'Controls operating effectively over a period against the trust services criteria', 'Exceptions likely in access, monitoring, change and vendor criteria for affected periods', 'Control test results, exception responses, system description updates'],
  ['CryptoCurrency Security Standard (CCSS)', 'Key generation, storage, usage, compromise policy, keyholder access, proof of reserve, audit logs', 'Direct relevance to signing isolation, multi-party approval and wallet lifecycle', 'Key ceremony records, keyholder list, multi-party approval configuration, retired key destruction records'],
  ['Independently attested proof of reserves', 'Reserves cover customer liabilities, attested by an independent party', 'Published figures carry a caveat that balances on other exchanges are not fully reflected (reported fact)', 'Attestation report with scope, liabilities method, treatment of off-exchange balances'],
  ['FATF Travel Rule', 'Originator and beneficiary information travels with VDA transfers between providers', 'Relevant to tracing and freezing flows through partner exchanges', 'Travel Rule solution records, counterparty due diligence'],
];

// [phase, action, owner function, evidence of completion, KRI or KPI]
export const ROADMAP = [
  ['0 to 30 days', 'Inventory every wallet and address, including "retired" ones; sweep and revoke keys for any not in active use', 'Wallet operations with security', 'Wallet register signed off; key revocation records', 'Retired addresses with non-zero balance (target 0)'],
  ['0 to 30 days', 'Set per-wallet hot wallet limits and auto-pause thresholds', 'Treasury with engineering', 'Configured limits and a tested auto-pause', 'Hot wallet exposure as % of total assets'],
  ['0 to 30 days', 'Alert on test transfers, new destinations, unusual hours and large outflows', 'Security operations', 'Alert rules and a triaged test alert', 'Mean time to detect'],
  ['0 to 30 days', 'Health monitoring on the sweeping service and other wallet automation', 'Platform engineering', 'Heartbeat alerts and runbook', 'Minutes since last successful sweep'],
  ['0 to 30 days', 'Interim communications rule: no public statement before facts are confirmed by the incident lead', 'Communications with legal', 'Approved crisis communication procedure', 'Statements later corrected (target 0)'],
  ['30 to 90 days', 'Move signing to isolated systems with multi-party approval (multi-signature or MPC); remove wallet access from developer endpoints', 'Engineering with security', 'Architecture review; approval logs', 'Outflows above threshold with two approvals (target 100%)'],
  ['30 to 90 days', 'Continuous on-chain to ledger reconciliation with break alerts', 'Finance with engineering', 'Daily reconciliation report', 'Open reconciliation breaks over 24 hours'],
  ['30 to 90 days', 'Liquidity provider and partner exchange review: approved addresses, balance caps, contract terms', 'Treasury with procurement and GRC', 'Reviewed agreements and address allow-lists', 'Third-party review coverage'],
  ['30 to 90 days', 'Outside employment, conflict of interest and acceptable use update; managed devices only for any work task', 'HR with security', 'Updated policies and acknowledgements', 'Policy acknowledgement rate'],
  ['30 to 90 days', 'Independent verification of every corrective action before closure', 'GRC with internal audit', 'CAPA tracker with verifier and evidence', 'Open and overdue CAPAs'],
  ['6 to 12 months', 'Certify ISO 27001:2022 and obtain SOC 2 Type II; assess against CCSS', 'GRC', 'Certificate and report', 'Audit exceptions and nonconformities'],
  ['6 to 12 months', 'Unified control framework mapping ISO 27001, SOC 2, CCSS, CERT-In and PMLA obligations', 'GRC', 'Control register with owners and evidence sources', 'Controls with automated evidence (%)'],
  ['6 to 12 months', 'Board-level risk report with appetite for hot wallet exposure and third-party balances', 'CISO with CFO', 'Board minutes', 'KRIs outside appetite'],
  ['6 to 12 months', 'Independently attested proof of reserves covering off-exchange balances', 'Finance', 'Attestation report', 'Reserve coverage ratio'],
];

export const PLAYBOOK = [
  ['First 30 days: understand', 'Request the root cause analysis reports for both incidents, the CAPA tracker, the wallet and asset register, the risk register, regulatory filings and acknowledgements (CERT-In, FIU-IND), the latest audit reports and the third-party register. Interview wallet operations, treasury, security operations and communications. Verify three closed corrective actions yourself.'],
  ['Days 31 to 60: fix the system', 'Write or update the wallet lifecycle and decommissioning standard, key management and signing policy, hot wallet limit policy, outside employment and conflict of interest policy, crisis communication procedure, and CAPA closure and verification standard. Put every open corrective action under one tracker with an independent verifier.'],
  ['Days 61 to 90: automate and report', 'Automate evidence for wallet inventory, hot wallet balances, reconciliation breaks, sweep job health, privileged access and endpoint coverage. Start the monthly KRI report to leadership and agree risk appetite for hot wallet exposure.'],
];

export const KRIS = ['Hot wallet exposure as a share of total assets', 'Reconciliation breaks open more than 24 hours', 'Mean time to detect anomalous outflows', 'Open and overdue corrective actions', 'Third-party and liquidity provider review coverage', 'Decommissioned assets verified (keys revoked, balance zero, partners notified)', 'Wallet automation jobs with health monitoring', 'Privileged users able to reach signing systems'];

export const LESSONS = [
  'A corrective action is not closed until someone independent has verified it in production.',
  'Retire a wallet by proving it is empty, unusable and unknown to partners, not by labelling it.',
  'Every automated money-moving job needs a heartbeat alert.',
  'Signing must be isolated from the laptops engineers use every day, and large outflows need more than one approver.',
  'People risk travels: side jobs, recruiters and personal devices are part of the attack surface.',
  'Say what you know, when you know it. A corrected statement costs more trust than a short delay.',
  'A treasury that absorbs losses protects customers once; controls protect them every time.',
];

export const CONTEXT = [
  ['Reported fact', 'The Exchange reported more than 1,200 impersonation websites over about 21 months. A fraud complaint linked to a copycat site led to legal proceedings against company leadership; a court later found no prima facie case.'],
  ['Assessed control gap', 'Brand protection, domain monitoring and takedown, and customer warnings are part of the control set, because impersonation creates legal and reputational exposure even without a breach.'],
  ['Reported fact', 'Published proof-of-reserves figures carry a caveat that balances held on other exchanges are not fully reflected.'],
  ['Assessed control gap', 'Given that a large company balance was held at a partner exchange, reserve reporting should state how off-exchange balances are covered.'],
];

export const DISCLAIMER = 'This case study is an anonymised, independent analysis based on publicly reported information, intended for educational purposes, and does not represent the views of any organisation.';
