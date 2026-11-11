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

// [topic, SOX 404, SOC 1, SOC 2]
export const SOX_COMPARE = [
  ['Who it is for', 'US public companies (SEC registrants)', 'Service organisations whose services affect their customers\' financial reporting', 'Service organisations proving security and related controls to customers'],
  ['Subject', 'Internal control over financial reporting', 'Controls at a service organisation relevant to user entities\' financial reporting', 'Controls relevant to security, availability, processing integrity, confidentiality or privacy'],
  ['Criteria or framework', 'COSO 2013', 'Control objectives defined by the service organisation', 'AICPA Trust Services Criteria'],
  ['Auditor standard', 'PCAOB AS 2201', 'AICPA SSAE 18 (AT-C 320)', 'AICPA SSAE 18 (AT-C 205)'],
  ['How they connect', 'Uses SOC 1 Type II reports to cover outsourced processes', 'Feeds customers\' SOX 404 work, together with CUECs', 'Shares ITGC evidence such as access, change and operations controls'],
];
