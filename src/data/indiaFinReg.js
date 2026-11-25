// Indian financial sector cyber and IT regulations: RBI IT Governance Master Direction, SEBI CSCRF, IRDAI guidelines.
// Facts checked November 2026 against regulator circulars and published summaries. Thresholds, dates and
// numbers change: always confirm against the current official text before relying on them.

export const INDIA_REG = {
  rbi: {
    title: 'RBI Master Direction on IT Governance, Risk, Controls and Assurance Practices',
    intro: 'The Reserve Bank of India issued this Master Direction on 7 November 2023, effective 1 April 2024. It brought earlier circulars on IT governance, IT risk, business continuity and IS audit into one direction. In November 2025 the RBI consolidated its regulations into entity-wise Master Directions; the IT governance requirements continue within them, so check the current direction for your type of entity.',
    source: 'https://www.rbi.org.in/Scripts/NotificationUser.aspx?Id=12562',
    facts: [
      ['Issued', '7 November 2023'],
      ['Effective', '1 April 2024'],
      ['Applies to', 'Commercial banks (including foreign banks, small finance banks and payments banks), NBFCs in the Top, Upper and Middle layers, credit information companies, and all-India financial institutions (EXIM Bank, NABARD, NaBFID, NHB, SIDBI). Not local area banks or core investment companies. Foreign bank branches follow comply or explain.'],
      ['Related directions', 'Master Direction on Outsourcing of IT Services (2023), the Cyber Security Framework for banks (2016) and CERT-In directions (2022) still apply alongside it.'],
    ],
    // [area, requirement, evidence an inspector expects]
    requirements: [
      ['Board oversight', 'The Board approves IT, information security, cyber security and business continuity strategies and policies, and reviews them at least annually.', 'Board minutes approving and reviewing each policy.'],
      ['IT Strategy Committee', 'Board-level committee of at least three directors, chaired by an independent director with substantial IT expertise (at least seven years). Meets at least quarterly.', 'Committee charter, membership, quarterly minutes.'],
      ['IT Steering Committee', 'Senior management from IT and business. Meets at least quarterly and oversees IT projects and risks.', 'Steering committee minutes and project status reports.'],
      ['Head of IT and CISO', 'A suitably senior Head of IT. A CISO, preferably of General Manager rank, who does not report to the Head of IT, has no business targets, and reports cyber risk to the Board or its committees at least quarterly.', 'Organisation chart, CISO appointment letter, quarterly cyber risk reports.'],
      ['Information Security Committee', 'Chaired by a senior official from risk management, overseeing information security across the entity.', 'Committee charter and minutes.'],
      ['IT operations and capacity', 'Capacity assessed at least annually and reviewed by the IT Strategy Committee. Unsupported hardware and software avoided, with end-of-support dates tracked.', 'Capacity plan, asset register with end-of-support dates.'],
      ['Change and patch management', 'Documented policies covering impact assessment, approval, timely and secure deployment, and rollback for failed changes.', 'Change records with approvals; patch compliance reports.'],
      ['Access control', 'Access granted on a need basis under approved procedures. Privileged activity logged and reviewed periodically. Multi-factor authentication for privileged users of critical systems.', 'Access reviews, privileged activity logs and reviews, MFA configuration.'],
      ['Audit trails', 'Audit logging enabled on critical applications and logs monitored for unauthorised activity.', 'Log configuration and monitoring evidence.'],
      ['Vulnerability assessment and penetration testing', 'Vulnerability assessment at least every six months and penetration testing at least every twelve months for critical and customer-facing (DMZ) systems.', 'VA and PT reports with remediation tracking.'],
      ['Cyber incidents', 'Notify CERT-In and the RBI proactively, as required by their reporting directions, and report to the Board and senior management.', 'Incident register, regulator notifications, Board reporting.'],
      ['Business continuity and DR', 'RTO and RPO defined for critical systems. DR drills at least half-yearly, running from the DR site as primary for at least one full working day. DC and DR kept in the same configuration and patch level. Backups tested by restoration.', 'DR drill reports, RTO and RPO register, restoration test records.'],
      ['IS audit', 'IS audit overseen by the Audit Committee of the Board under a policy it approves and reviews at least annually. Risk-based audit planning, with continuous auditing encouraged for critical systems.', 'IS audit policy, audit plan, reports and follow-up.'],
    ],
  },

  cscrf: {
    title: 'SEBI Cybersecurity and Cyber Resilience Framework (CSCRF)',
    intro: 'SEBI issued the CSCRF on 20 August 2024. It replaced the separate cybersecurity circulars for market infrastructure institutions, brokers, depository participants, mutual funds, portfolio managers and other intermediaries with one framework for all SEBI-regulated entities (REs). Requirements scale with the size and criticality of the entity. Note: the playbook above on this page covers CERT-In directions, which apply alongside the CSCRF.',
    source: 'https://www.sebi.gov.in/',
    facts: [
      ['Issued', '20 August 2024'],
      ['Compliance deadline', 'Extended twice. The final date for most REs was 31 August 2025 (SEBI circular of 30 June 2025). Market infrastructure institutions, KYC registration agencies and qualified registrars and share transfer agents kept the original, earlier timeline.'],
      ['Structure', 'Organised by the cybersecurity functions Govern, Identify, Protect, Detect, Respond and Recover, aligned with NIST CSF 2.0, and by cyber resilience goals (anticipate, withstand, contain, recover and evolve).'],
      ['Categories', 'Five tiers: market infrastructure institutions (MIIs), Qualified REs, Mid-size REs, Small-size REs and Self-certification REs. Category is set from thresholds such as client numbers and assets, re-assessed each financial year.'],
    ],
    requirements: [
      ['Governance', 'Board-approved cybersecurity and cyber resilience policy, a designated CISO, and an IT committee for oversight. Requirements scale by category.', 'Approved policy, CISO appointment, committee minutes.'],
      ['Cyber Capability Index', 'MIIs and Qualified REs measure their cyber maturity using the Cyber Capability Index (CCI) and report it to SEBI on the set cycle.', 'CCI self-assessment and submission.'],
      ['Security operations centre', 'Continuous monitoring through a security operations centre: own or third-party for larger REs, with smaller REs able to use the market SOC offered by the exchanges.', 'SOC contract or setup, monitoring reports.'],
      ['Incident reporting', 'Report cyber incidents to SEBI within six hours of noticing them, in line with CERT-In timelines, and follow with detailed reports.', 'Incident register, reports to SEBI and CERT-In with timestamps.'],
      ['Cyber audit', 'Periodic cybersecurity audit by an auditor empanelled by CERT-In. Frequency depends on category, with MIIs and Qualified REs audited more often than smaller entities.', 'Audit reports and compliance submissions to SEBI or the stock exchange.'],
      ['VAPT', 'Vulnerability assessment and penetration testing by a CERT-In empanelled organisation, covering critical systems and internet-facing applications, also after major changes. Findings closed within the set period (commonly three months).', 'VAPT reports, closure evidence, escalations for overdue items.'],
      ['Software bill of materials', 'SBOM maintained for core and critical systems, so vulnerable components can be found quickly.', 'SBOMs for in-scope systems.'],
      ['Logs and data', 'Logs collected and retained for the period CSCRF and CERT-In require, and data localisation requirements for regulatory data followed.', 'Log retention settings; data location records.'],
      ['Third parties', 'Cybersecurity of technology vendors and cloud providers assessed and governed by contract.', 'Vendor risk assessments and contract clauses.'],
      ['Business continuity', 'Resilience testing, cyber crisis management plan and recovery capability appropriate to the category.', 'Crisis management plan, drill reports.'],
    ],
  },

  irdai: {
    title: 'IRDAI Information and Cyber Security Guidelines, 2023',
    intro: 'The Insurance Regulatory and Development Authority of India issued revised Information and Cyber Security Guidelines on 24 April 2023, replacing the 2017 guidelines. They apply to insurers and to most IRDAI-authorised intermediaries.',
    source: 'https://irdai.gov.in/',
    facts: [
      ['Issued', '24 April 2023, superseding the 2017 guidelines'],
      ['Applies to', 'Insurers (including foreign reinsurance branches) and authorised intermediaries such as brokers, corporate agents, web aggregators, TPAs, insurance marketing firms, repositories, corporate surveyors and others. Individual agents, micro-insurance agents, point-of-sale persons and individual surveyors are excluded.'],
      ['Scope', 'All information assets and data handled by the entity, wherever and however they are held.'],
      ['Related rules', 'CERT-In directions (2022), the DPDP Act 2023 and IRDAI outsourcing regulations apply alongside them.'],
    ],
    requirements: [
      ['Governance', 'Board-approved information and cyber security policy. An Information Security Risk Management Committee (ISRMC) including the CRO, CISO, CTO and other function heads, meeting at least twice a year. Policy reviewed annually.', 'Policy approval, ISRMC charter and minutes.'],
      ['CISO', 'A designated CISO who leads implementation and enforcement of the policy.', 'Appointment and role description.'],
      ['Risk assessment', 'Information and cyber risk assessment at least annually and before introducing any major new technology or initiative.', 'Risk assessment reports.'],
      ['Incident reporting', 'Report cyber incidents to CERT-In within six hours of noticing them, and to IRDAI as the guidelines require. Maintain a cyber crisis management plan.', 'Incident register with timestamps, regulator notifications, crisis plan.'],
      ['Logs', 'Logs of ICT systems retained securely for the period set by CERT-In directions (180 days, in India) or longer where the guidelines require.', 'Log retention settings and storage location.'],
      ['Annual assurance audit', 'Independent information and cyber security assurance audit every year. The report goes to the Board or Audit Committee and is submitted to IRDAI within 90 days of the financial year end or 30 days of audit completion, whichever is earlier.', 'Audit report, Board comments, submission acknowledgement.'],
      ['Intermediaries and vendors', 'Insurers ensure the intermediaries and vendors they use comply, under a Board-approved policy, and obtain annual self-certification from intermediaries that hold only physical insurer data.', 'Vendor and intermediary assessments, self-certifications.'],
      ['Acceptable use and social media', 'Rules for acceptable use of information assets, licensed software, and staff use of social media.', 'Acceptable use policy, training records.'],
      ['Training and awareness', 'Regular security training and awareness for staff.', 'Training plan and completion records.'],
    ],
  },
};

export const INDIA_REG_NOTE = 'Summaries are paraphrased for orientation and may not reflect later amendments. Confirm thresholds, timelines and applicability against the regulator\'s current official text.';
