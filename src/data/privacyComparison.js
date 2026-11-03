// GDPR (Regulation (EU) 2016/679) compared with India's DPDP Act, 2023 and
// DPDP Rules, 2025 (G.S.R. 846(E), 13 November 2025). Guidance, not legal advice.

export const DPDP_COMMENCEMENT = [
  { date: '13 Nov 2025', rules: 'Rules 1, 2 and 17 to 21', what: 'Definitions and the Data Protection Board provisions in force.' },
  { date: '13 Nov 2026', rules: 'Rule 4', what: 'Registration and obligations of Consent Managers.' },
  { date: '13 May 2027', rules: 'Rules 3, 5 to 16, 22 and 23', what: 'Notice, security safeguards, breach intimation, erasure and retention, children, Significant Data Fiduciaries, rights, transfers and the remaining duties.' },
];

export const SIMILARITIES = [
  ['Lawfulness', 'Processing needs a legal ground and must be fair and transparent.', 'GDPR Arts. 5, 6; DPDPA Sections 4, 5'],
  ['Purpose and minimisation', 'Collect for a stated purpose and only what that purpose needs.', 'GDPR Art. 5(1)(b)-(c); DPDPA Sections 5, 6(1)'],
  ['Accuracy', 'Keep data complete, accurate and consistent where it is used for decisions or shared.', 'GDPR Art. 5(1)(d); DPDPA Section 8(3)'],
  ['Security', 'Appropriate or reasonable security safeguards against breach.', 'GDPR Art. 32; DPDPA Section 8(5), Rule 6'],
  ['Retention', 'Erase when the purpose is served, unless the law requires retention.', 'GDPR Art. 5(1)(e); DPDPA Section 8(7), Rule 8'],
  ['Processors', 'Processors act under a contract and on instructions.', 'GDPR Art. 28; DPDPA Section 8(2)'],
  ['Breach notice', 'Regulator and affected people are told about breaches.', 'GDPR Arts. 33, 34; DPDPA Section 8(6), Rule 7'],
  ['Transfers', 'Cross-border transfers are regulated.', 'GDPR Chapter V; DPDPA Section 16, Rule 15'],
  ['Governance', 'An accountable contact for data protection questions.', 'GDPR Arts. 37 to 39; DPDPA Sections 8(9), 10(2)(a)'],
  ['Children', 'Extra protection and parental consent for children.', 'GDPR Art. 8; DPDPA Section 9, Rule 10'],
  ['Rights', 'Access, correction and erasure rights with a response duty.', 'GDPR Arts. 15 to 17; DPDPA Sections 11, 12, Rule 14'],
];

export const DIFFERENCES = [
  ['Scope', 'All personal data processed by automated means or in a filing system.', 'Digital personal data, and non-digital data that is later digitised. Excludes data made publicly available by the Data Principal or under a legal duty.', 'Re-check scope of paper records and public data; do not assume GDPR scope carries over.', 'GDPR Art. 2; DPDPA Section 3'],
  ['Roles', 'Controller, joint controller, processor, representative.', 'Data Fiduciary, Data Processor, Consent Manager, Significant Data Fiduciary.', 'Map each processing activity to DPDPA roles; register Consent Managers if used.', 'GDPR Art. 4; DPDPA Section 2'],
  ['Legal grounds', 'Six lawful bases.', 'Consent, or a listed legitimate use.', 'Re-map every activity to consent or a Section 7 legitimate use.', 'GDPR Art. 6; DPDPA Sections 4, 7'],
  ['Legitimate interests', 'Available with a balancing test.', 'Not available.', 'Activities on legitimate interests need consent or a specific Section 7 use.', 'GDPR Art. 6(1)(f); DPDPA Section 7'],
  ['Contract basis', 'Available for performance of a contract.', 'No separate contract basis; Section 7(a) covers data the person voluntarily provides for a specified purpose where they have not objected.', 'Check whether Section 7(a) fits; otherwise collect consent.', 'GDPR Art. 6(1)(b); DPDPA Section 7(a)'],
  ['Sensitive data', 'Special categories with extra conditions.', 'No statutory sensitive category; sensitivity is a factor in Significant Data Fiduciary notification.', 'Keep internal high-risk labels, but do not cite them as DPDPA categories.', 'GDPR Art. 9; DPDPA Section 10(1)'],
  ['Children', 'Parental consent for information society services below 13 to 16 depending on Member State.', 'Under 18 for all processing; verifiable parental consent; no tracking, behavioural monitoring or targeted ads, subject to Rule 12 exemptions.', 'Raise the age gate to 18 for India and add verifiable parental consent.', 'GDPR Art. 8; DPDPA Sections 2(f), 9; Rules 10 to 12'],
  ['Portability', 'Right to data portability.', 'No equivalent right.', 'Keep for GDPR; not required for DPDPA.', 'GDPR Art. 20'],
  ['Automated decisions', 'Right not to be subject to solely automated decisions with significant effects.', 'No general equivalent; Significant Data Fiduciaries must check algorithmic software for risk to rights.', 'Keep Art. 22 safeguards; add Rule 13(3) checks if notified as SDF.', 'GDPR Art. 22; DPDPA Rule 13(3)'],
  ['Nomination', 'No equivalent.', 'Right to nominate someone to exercise rights on death or incapacity.', 'Add a nomination process.', 'DPDPA Section 14; Rule 14(2)'],
  ['Grievance before complaint', 'Can complain to a supervisory authority at any time.', 'Must exhaust the Data Fiduciary\'s grievance process before complaining to the Board.', 'Stand up a grievance process with a published response period (maximum 90 days).', 'GDPR Art. 77; DPDPA Section 13(3); Rule 14(3)'],
  ['Notice', 'Detailed content lists in Arts. 13 and 14.', 'Notice with an itemised description of data and purposes, understandable on its own, in English or an Eighth Schedule language.', 'Create India notices; translate where your users need it.', 'GDPR Arts. 13, 14; DPDPA Section 5; Rule 3'],
  ['Consent managers', 'No equivalent.', 'Registered Consent Managers can give, manage and withdraw consent (from 13 Nov 2026).', 'Decide whether to integrate with Consent Managers.', 'DPDPA Section 6(7)-(9); Rule 4'],
  ['Processor liability', 'Processors have direct duties and liability.', 'Obligations sit with the Data Fiduciary irrespective of any agreement; processors are bound by contract.', 'Flow DPDPA duties into processor contracts.', 'GDPR Arts. 28, 82, 83; DPDPA Section 8(1)'],
  ['Record of processing', 'ROPA required (with limited exemptions).', 'No statutory ROPA.', 'Keep the ROPA as an internal tool.', 'GDPR Art. 30'],
  ['DPIA', 'Required for likely high-risk processing.', 'Required for Significant Data Fiduciaries every twelve months.', 'Keep the DPIA method; add the SDF cycle if notified.', 'GDPR Art. 35; DPDPA Section 10; Rule 13'],
  ['DPO', 'Required in listed cases.', 'Required for Significant Data Fiduciaries (based in India); others publish a contact who can answer questions.', 'Publish an India contact; appoint a DPO if notified as SDF.', 'GDPR Art. 37; DPDPA Sections 8(9), 10(2)(a)'],
  ['Breach threshold and timing', 'Notify the authority within 72 hours unless unlikely to result in risk; individuals only if high risk.', 'Every breach: Data Principals and Board without delay, detailed Board report within 72 hours.', 'Remove the risk-threshold step for India; add the two-step Rule 7 flow.', 'GDPR Arts. 33, 34; DPDPA Section 8(6); Rule 7'],
  ['Minimum log retention', 'No minimum; storage limitation applies.', 'Keep personal data, traffic data and processing logs for at least one year from processing.', 'Set a one-year minimum for logs and associated data, then erase.', 'DPDPA Rules 6(1)(e), 8(3)'],
  ['Transfer model', 'Allowed only with adequacy, safeguards or a derogation.', 'Allowed except to countries the Central Government restricts; Rule 15 orders and sector laws can add conditions.', 'Monitor restriction notifications; keep SCCs for EU data.', 'GDPR Arts. 44 to 49; DPDPA Section 16; Rule 15'],
  ['Regulator', 'National supervisory authorities with the EDPB and one-stop-shop.', 'Data Protection Board of India; appeals to the Appellate Tribunal.', 'Name the Board in notices; plan for India-specific enforcement.', 'GDPR Arts. 51, 56, 68; DPDPA Sections 18, 29'],
  ['Penalties', 'Up to EUR 20 million or 4% of worldwide annual turnover.', 'Fixed maximums per breach type, up to Rs 250 crore (security safeguards) and Rs 200 crore (breach intimation, children).', 'Prioritise safeguards, breach intimation and children\'s data.', 'GDPR Art. 83; DPDPA Section 33 and Schedule'],
];

export const READINESS = {
  reuse: ['Record of processing (ROPA)', 'Data maps and flow diagrams', 'Vendor register', 'Security baseline', 'Incident response process'],
  adapt: ['Privacy notices (itemised, language, Board route)', 'Data processing agreements (DPDPA addendum)', 'Retention schedule (one-year log minimum)', 'Rights workflow (nomination, 90-day limit, no portability)', 'DPIA method (SDF cycle if notified)'],
  build: ['Re-map legitimate-interest activities to consent or Section 7 uses', 'Notices in English or Eighth Schedule languages', 'Consent withdrawal that propagates to processors', 'Under-18 age gate and verifiable parental consent', 'Grievance process with published period', 'Nomination process', 'Rule 6 and Rule 8 logging and retention', 'Rule 7 Board report format', 'Significant Data Fiduciary assessment', 'Monitoring of Section 16 transfer restrictions'],
};

export const EFFORT = [
  ['GDPR-mature B2B SaaS, mainly a processor', '8 to 12 weeks'],
  ['GDPR-mature B2C service or vibe coding platform', '12 to 20 weeks'],
  ['Processes children\'s data or likely Significant Data Fiduciary', '20 to 28 weeks'],
];

export const PHASES = [
  ['Weeks 1 to 2', 'Gap analysis and role mapping'],
  ['Weeks 3 to 8', 'Consent, notice and legal-ground re-mapping'],
  ['Weeks 6 to 12', 'Rights, grievance, nomination, retention and logging'],
  ['Weeks 8 to 14', 'Processor addenda and breach drills'],
  ['Final phase', 'Testing and evidence pack'],
];
