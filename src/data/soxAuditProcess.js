// SOX 404 audit process content. Rows keep each kind of information in its own column. Edit freely.

export const SOX_INTRO = 'A SOX 404 cycle runs across the whole fiscal year. Management builds and tests its controls, and for accelerated and large accelerated filers the external auditor issues an opinion on internal control over financial reporting in the same integrated audit as the financial statements.';

// [phase, typical timing, what happens, who leads, output]
export const SOX_PHASES = [
  ['Planning and scoping', 'First quarter', 'Confirm filer status, set materiality, choose significant accounts and assertions, scope processes, systems, locations and service organisations; agree reliance with the auditor.', 'SOX lead or internal audit, CFO', 'Scoping memo, test plan'],
  ['Documentation and walkthroughs', 'First to second quarter', 'Update narratives and the risk and control matrix; walk through each process to confirm design.', 'Process owners, SOX team', 'Narratives, RCM, walkthrough evidence'],
  ['Interim testing', 'Second to third quarter', 'Test operating effectiveness of key controls and ITGCs on samples from the year to date; review SOC 1 reports.', 'SOX team or internal audit; auditor tests in parallel', 'Test workpapers, exceptions'],
  ['Deficiency remediation', 'Third to fourth quarter', 'Fix deficiencies and let the new controls run long enough to be retested before year end.', 'Control owners', 'Remediation evidence, retest results'],
  ['Rollforward and year-end testing', 'Fourth quarter and the weeks after year end', 'Cover the remaining period and test year-end controls such as the close, consolidation, tax provision and impairment.', 'SOX team, auditor', 'Rollforward and year-end workpapers'],
  ['Deficiency evaluation', 'After year-end testing', 'Classify every deficiency, aggregate them, consider compensating controls and conclude on severity.', 'CFO, controller, SOX lead', 'Deficiency evaluation summary'],
  ['Management assessment', 'Before the 10-K is filed', 'Conclude on ICFR effectiveness at year end; collect sub-certifications; brief the audit committee.', 'CEO, CFO, audit committee', 'Management report on ICFR, certifications'],
  ['Auditor opinion and filing', '10-K deadline: 60, 75 or 90 days after year end by filer status', 'The auditor issues its opinion on ICFR (404(b) filers) and the company files the 10-K with management\'s report.', 'External auditor, company', '10-K with ICFR reports'],
];

// [classification, definition, who must be told, effect on the year-end conclusion]
export const SOX_DEFICIENCIES = [
  ['Control deficiency', 'A control is missing, badly designed, or did not operate as designed, so a misstatement could go unnoticed.', 'Management; tracked for remediation.', 'ICFR can still be effective.'],
  ['Significant deficiency', 'A deficiency, or combination, less severe than a material weakness but important enough to merit the attention of those overseeing financial reporting.', 'Audit committee.', 'ICFR can still be effective; no public disclosure required.'],
  ['Material weakness', 'A deficiency, or combination, where there is a reasonable possibility that a material misstatement of the annual or interim financial statements will not be prevented or detected on time.', 'Audit committee and the public, in the 10-K.', 'ICFR is not effective if it exists at year end; the auditor issues an adverse ICFR opinion.'],
];

// [topic, SOX 404, SOC 1, ISAE 3402, SOC 2]
export const SOX_COMPARE = [
  ['Who it is for', 'US public companies (SEC registrants)', 'Service organisations whose services affect their customers\' financial reporting', 'The same as SOC 1, used outside the US or for non-US customers', 'Service organisations proving security and related controls to customers'],
  ['Subject', 'Internal control over financial reporting', 'Controls at a service organisation relevant to user entities\' financial reporting', 'The same subject as SOC 1', 'Controls relevant to security, availability, processing integrity, confidentiality or privacy'],
  ['Criteria or framework', 'COSO 2013', 'Control objectives defined by the service organisation', 'Control objectives defined by the service organisation', 'AICPA Trust Services Criteria'],
  ['Auditor standard', 'PCAOB AS 2201', 'AICPA SSAE 18 (AT-C 320)', 'IAASB ISAE 3402', 'AICPA SSAE 18 (AT-C 205)'],
  ['How they connect', 'Uses SOC 1 or ISAE 3402 Type II reports to cover outsourced processes', 'Feeds customers\' SOX 404 work, together with CUECs', 'Accepted by most auditors in place of a SOC 1, and the reverse', 'Shares ITGC evidence such as access, change and operations controls'],
];

// COSO 2013: [component, principle number, principle]
export const COSO_PRINCIPLES = [
  ['Control environment', '1', 'Demonstrates commitment to integrity and ethical values'],
  ['Control environment', '2', 'The board exercises oversight independent of management'],
  ['Control environment', '3', 'Management establishes structures, reporting lines, authorities and responsibilities'],
  ['Control environment', '4', 'Demonstrates commitment to attract, develop and retain competent people'],
  ['Control environment', '5', 'Holds people accountable for their internal control responsibilities'],
  ['Risk assessment', '6', 'Specifies objectives clearly enough to identify and assess risks'],
  ['Risk assessment', '7', 'Identifies and analyses risks to achieving objectives'],
  ['Risk assessment', '8', 'Considers the potential for fraud'],
  ['Risk assessment', '9', 'Identifies and assesses changes that could significantly affect internal control'],
  ['Control activities', '10', 'Selects and develops control activities that reduce risks to acceptable levels'],
  ['Control activities', '11', 'Selects and develops general control activities over technology'],
  ['Control activities', '12', 'Deploys control activities through policies and procedures'],
  ['Information and communication', '13', 'Obtains or generates and uses relevant, quality information'],
  ['Information and communication', '14', 'Communicates internal control information internally'],
  ['Information and communication', '15', 'Communicates with external parties about matters affecting internal control'],
  ['Monitoring activities', '16', 'Performs ongoing and separate evaluations of internal control'],
  ['Monitoring activities', '17', 'Evaluates and communicates deficiencies in a timely way'],
];

// IT general controls vs IT application controls: [topic, IT general controls (ITGCs), IT application controls (ITACs)]
export const ITGC_VS_ITAC = [
  ['What they are', 'Controls over the IT environment that keep systems and data reliable.', 'Controls built into a business application that process transactions correctly.'],
  ['Scope', 'Each in-scope application, its database and operating system, and the supporting infrastructure.', 'Specific transactions and calculations inside one application.'],
  ['Main areas', 'Access to programs and data; program changes; program development; computer operations (jobs, backups, interfaces).', 'Input controls (validation, edit checks, required fields); processing (calculations, three-way match, approval limits); output (reports, reconciliations); interface controls; application access and SoD settings.'],
  ['Examples', 'User provisioning and removal, quarterly access reviews, change approval and testing, developers kept out of production, batch job monitoring.', 'Invoice blocked unless the purchase order, goods receipt and invoice match; payment above a limit routed to a second approver; system-calculated revenue schedules.'],
  ['How they are tested', 'Sampled over the period: tickets, reviews, change records and job logs.', 'Often a test of one per variation (benchmarking), relying on effective ITGCs to show the logic did not change during the period.'],
  ['How they depend on each other', 'If ITGCs fail, the auditor cannot rely on application controls or system reports without extra testing.', 'Application controls reduce manual testing only when ITGCs over the same system are effective.'],
  ['Related items', 'Key reports used in controls need ITGCs plus a completeness and accuracy check.', 'IT-dependent manual controls combine a system report with a human review.'],
];
