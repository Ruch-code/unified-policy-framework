// Typical engagement timelines from kickoff to report or certificate issuance, by framework type.
// Timing is relative and indicative only. Real dates depend on scope, readiness and the assessor's calendar.
// Each phase: [phase, typical timing, what happens, output]. Edit freely.

const P = (phase, when, what, output) => ({ phase, when, what, output });

export const TIMELINE_TYPES = {
  soc2: {
    title: 'SOC 2 Type II: kickoff to report issuance',
    note: 'Timing is shown relative to the end of the observation period ("period end"). A first Type II period is often 3 to 6 months; later periods are usually 12 months.',
    phases: [
      P('Kickoff and scoping', 'Before the period starts', 'Agree the in-scope system, Trust Services Criteria, period dates and auditor fieldwork calendar.', 'Engagement letter, scoping memo'),
      P('Readiness and evidence setup', 'Start of the period', 'Confirm every control is operating and evidence is being captured from day one of the period.', 'Control matrix, evidence request list'),
      P('Walkthroughs', 'About 3 weeks before period end', 'Auditor walks through each process with control owners to confirm design and gather walkthrough evidence.', 'Walkthrough notes, initial samples'),
      P('Observation period', 'Full period (3 to 12 months)', 'Controls operate as designed; the company retains evidence for every occurrence.', 'Populations and evidence for the whole period'),
      P('Evidence collection closes', 'About 1 week before period end', 'Final evidence and population lists are uploaded; partial populations stay in draft until complete.', 'Complete evidence set'),
      P('Control testing', 'Period end to about 2 weeks after', 'Auditor selects samples from system-generated populations and tests operating effectiveness.', 'Test results and any exceptions'),
      P('Quality assurance', 'About 2 to 4 weeks after period end', 'Firm QA review of workpapers; follow-up questions and exception responses from management.', 'QA comments, management responses'),
      P('Draft report', 'About 6 weeks after period end', 'Auditor issues the draft report, including the system description and testing matrices, for management review.', 'Draft SOC 2 report'),
      P('Management review and assertion', 'About 6 to 8 weeks after period end', 'Management checks the system description, signs the assertion and responds to any exceptions.', 'Signed management assertion'),
      P('Final report issuance', 'About 8 to 9 weeks after period end', 'Auditor signs and issues the final report.', 'Final SOC 2 Type II report'),
    ],
  },
  iso: {
    title: 'ISO management system certification: readiness to certificate issuance',
    note: 'Applies to accredited certification audits (for example ISO 27001, ISO 42001, ISO 22301, or ISO 27701 as an extension). Timing is relative to the Stage 2 audit.',
    phases: [
      P('Implementation and readiness', '3 to 6 months before Stage 1', 'Build the management system: scope, risk assessment, Statement of Applicability, policies and operating controls.', 'Documented management system, SoA'),
      P('Internal audit', 'At least 4 to 6 weeks before Stage 1', 'Audit the full management system and raise corrective actions.', 'Internal audit report, corrective action log'),
      P('Management review', 'After the internal audit, before Stage 1', 'Top management reviews performance, audit results and improvement actions.', 'Management review minutes'),
      P('Stage 1 audit', 'About 2 to 8 weeks before Stage 2', 'Certification body checks documentation and readiness for Stage 2.', 'Stage 1 report with areas of concern'),
      P('Stage 2 audit', 'Stage 2 week', 'On-site or remote audit of implementation and effectiveness, including sampling of records.', 'Stage 2 findings: major and minor nonconformities'),
      P('Nonconformity closure', 'Within the period the certification body sets (often up to 90 days)', 'Root cause analysis and corrective action plans; majors must be closed and verified before certification.', 'Accepted corrective action plans and evidence'),
      P('Technical review and decision', 'About 2 to 6 weeks after closure', 'Independent reviewer at the certification body makes the certification decision.', 'Certification decision'),
      P('Certificate issuance', 'After the decision', 'Certificate issued, valid for three years.', 'Certificate and audit report'),
      P('Surveillance and recertification', 'Years 1 and 2, then year 3', 'Annual surveillance audits, then a full recertification audit before expiry.', 'Surveillance reports, renewed certificate'),
    ],
  },
  sox: {
    title: 'SOX 404: fiscal year to auditor opinion',
    note: 'Timing is shown against the company\'s fiscal year. The auditor\'s opinion on ICFR applies to accelerated and large accelerated filers; other registrants still file management\'s assessment.',
    phases: [
      P('Planning and scoping', 'First quarter', 'Confirm filer status, set materiality, scope significant accounts, processes, systems and service organisations.', 'Scoping memo, test plan'),
      P('Documentation and walkthroughs', 'First to second quarter', 'Update narratives and the risk and control matrix; walk through each process.', 'RCM, walkthrough evidence'),
      P('Interim testing', 'Second to third quarter', 'Test key controls and ITGCs on year-to-date samples; review SOC 1 reports.', 'Test workpapers'),
      P('Remediation', 'Third to fourth quarter', 'Fix deficiencies early enough for the new controls to be retested before year end.', 'Remediation and retest evidence'),
      P('Rollforward and year-end testing', 'Fourth quarter and after year end', 'Cover the remaining period and test year-end controls.', 'Year-end workpapers'),
      P('Deficiency evaluation and management assessment', 'After year-end testing', 'Classify deficiencies and conclude on ICFR effectiveness; brief the audit committee.', 'Management report on ICFR'),
      P('Auditor opinion and 10-K filing', '60, 75 or 90 days after year end, by filer status', 'Auditor issues its ICFR opinion where required; the company files the 10-K.', '10-K with ICFR reports'),
    ],
  },
  meddevice: {
    title: 'Medical device software: design to 510(k) clearance',
    note: 'Shown for a US 510(k). ISO 13485 certification for other markets follows the ISO certification route (Stage 1, Stage 2, certificate). FDA timings are review goals, not guarantees.',
    phases: [
      P('Classification and route', 'Weeks 1 to 4', 'Confirm the software is a device, find the product code and predicate, choose 510(k), De Novo or PMA.', 'Regulatory assessment'),
      P('Pre-Submission (optional)', 'About 70 to 75 days to a meeting', 'Get FDA feedback on predicate and testing plans.', 'Pre-Submission feedback'),
      P('Quality system and design controls', 'Throughout development', 'ISO 13485 QMS, design history file, risk management and software lifecycle.', 'QMS, design history file'),
      P('Verification, validation and cybersecurity', 'Before submission', 'Software testing to the safety class, validation, threat model, SBOM and penetration test.', 'Test reports, cybersecurity file'),
      P('eSTAR submission and technical screening', 'About 15 days after submission', 'FDA checks the eSTAR is complete.', 'Accepted for review'),
      P('Substantive review', 'FDA goal of 90 review days, excluding holds', 'Review of substantial equivalence; any additional information request pauses the clock.', 'Questions or decision'),
      P('Clearance and post-market', 'After the decision', 'Clearance letter, registration and listing, UDI, complaint handling and vulnerability management.', 'Clearance letter, post-market records'),
    ],
  },
  hitrust: {
    title: 'HITRUST validated assessment: readiness to certification',
    note: 'Applies to e1, i1 and r2 validated assessments. Timing is relative to the start of fieldwork.',
    phases: [
      P('Scoping and assessment selection', '2 to 4 months before fieldwork', 'Select the assessment type, define scope and generate requirement statements.', 'Scoped assessment object'),
      P('Readiness assessment', '1 to 3 months before fieldwork', 'Self-assess, remediate gaps and build evidence for each requirement.', 'Readiness scores, remediation plan'),
      P('Validated fieldwork', 'Fieldwork window (several weeks)', 'External assessor tests requirements and scores maturity.', 'Scored requirement statements'),
      P('Submission and HITRUST quality assurance', 'After fieldwork (often 6 to 12 weeks)', 'Assessor submits; HITRUST QA raises questions that must be answered.', 'QA responses'),
      P('Report and certification issuance', 'After QA is cleared', 'HITRUST issues the validated report and certification letter.', 'Validated assessment report, certification'),
      P('Interim or renewal', 'Within the certification cycle', 'Interim assessment where required, then renewal.', 'Interim report, renewed certification'),
    ],
  },
  pci: {
    title: 'PCI DSS assessment: scoping to Report on Compliance',
    note: 'For Level 1 merchants and service providers assessed by a QSA. Timing is relative to onsite testing.',
    phases: [
      P('Scoping and segmentation validation', '2 to 3 months before testing', 'Confirm the cardholder data environment, data flows and segmentation.', 'Scope document, network and data flow diagrams'),
      P('Gap assessment and remediation', '1 to 3 months before testing', 'Assess each requirement and fix gaps.', 'Remediation plan'),
      P('Quarterly ASV scans and testing evidence', 'Throughout the year', 'External scans by an Approved Scanning Vendor, internal scans and penetration tests.', 'Passing ASV scans, test reports'),
      P('Onsite or remote testing', 'Testing window', 'QSA interviews staff, observes and samples evidence for each requirement.', 'Testing workpapers'),
      P('Draft Report on Compliance', 'About 2 to 4 weeks after testing', 'QSA drafts the ROC; open items are remediated.', 'Draft ROC'),
      P('QA and final ROC with AOC', 'About 4 to 8 weeks after testing', 'QSA firm QA, then final ROC and Attestation of Compliance are signed.', 'Final ROC, AOC'),
      P('Submission', 'After signature', 'AOC submitted to the acquiring bank or card brands, as required.', 'Acknowledged AOC'),
    ],
  },
  fedramp: {
    title: 'FedRAMP authorization: preparation to ATO',
    note: 'Timing varies widely by agency and impact level. Shown relative to the 3PAO assessment.',
    phases: [
      P('Readiness and System Security Plan', '3 to 9 months before assessment', 'Implement baseline controls and write the SSP and attachments.', 'SSP package'),
      P('Security Assessment Plan', 'Before assessment', '3PAO prepares the assessment plan, agreed with the sponsor.', 'SAP'),
      P('3PAO assessment', 'Assessment window', 'Control testing, vulnerability scanning and penetration testing.', 'Test results'),
      P('Security Assessment Report', 'Several weeks after testing', '3PAO documents findings; the provider prepares the POA&M.', 'SAR, POA&M'),
      P('Agency review', 'After SAR submission', 'Sponsor reviews the package and risk.', 'Review comments'),
      P('Authorization to Operate', 'After review', 'Agency issues the ATO; package listed in the marketplace.', 'ATO letter'),
      P('Continuous monitoring', 'Monthly and annually', 'Monthly scans and POA&M updates; annual assessment.', 'ConMon deliverables'),
    ],
  },
  cmmc: {
    title: 'CMMC Level 2 certification: readiness to certificate',
    note: 'For third-party assessments by a C3PAO. Timing is relative to the assessment.',
    phases: [
      P('Scoping and SSP', '3 to 6 months before', 'Define the CUI environment and document all 110 practices.', 'SSP, network diagram'),
      P('Self-assessment and SPRS score', '1 to 3 months before', 'Score the environment and close gaps.', 'SPRS score, POA&M'),
      P('Pre-assessment with C3PAO', 'About 1 month before', 'Readiness review and evidence check.', 'Pre-assessment notes'),
      P('Certification assessment', 'Assessment window', 'C3PAO tests each practice.', 'Assessment results'),
      P('POA&M closeout', 'Within the allowed window', 'Close permitted open items.', 'Closed POA&M'),
      P('Certificate issuance', 'After review', 'Results posted and certificate issued.', 'CMMC Level 2 certificate'),
    ],
  },
  hipaa: {
    title: 'HIPAA third-party assessment: scoping to report issuance',
    note: 'HIPAA has no certification. Many organisations commission an independent assessment against the Security, Privacy and Breach Notification Rules to support customers and BAAs.',
    phases: [
      P('Scoping', 'Weeks 1 to 2', 'Confirm covered entity or business associate role, ePHI systems and rules in scope.', 'Scope statement'),
      P('Risk analysis review', 'Weeks 2 to 4', 'Assess the enterprise-wide risk analysis and risk management plan.', 'Risk analysis findings'),
      P('Walkthroughs and evidence collection', 'Weeks 3 to 6', 'Interviews with control owners; policies, BAAs and system evidence collected.', 'Evidence set'),
      P('Testing', 'Weeks 6 to 8', 'Assessor tests safeguards and samples records.', 'Test results'),
      P('Draft report and remediation plan', 'Weeks 8 to 10', 'Assessor drafts findings; management agrees remediation dates.', 'Draft assessment report'),
      P('Final report issuance', 'Weeks 10 to 12', 'Final report or attestation letter issued.', 'HIPAA assessment report'),
    ],
  },
  privacy: {
    title: 'Privacy law compliance assessment: scoping to report',
    note: 'Most privacy laws have no certification. A typical route is an independent compliance assessment or audit, plus any filing or audit the law itself requires.',
    phases: [
      P('Applicability and scoping', 'Weeks 1 to 2', 'Confirm the law applies, the role (controller, processor or equivalent) and the data in scope.', 'Applicability memo'),
      P('Data mapping', 'Weeks 2 to 4', 'Record of processing, data flows and cross-border transfers.', 'Data inventory, transfer register'),
      P('Gap assessment', 'Weeks 4 to 6', 'Compare notices, consent, rights handling, security and vendor terms with the law.', 'Gap register'),
      P('Remediation', 'Weeks 6 to 12 (varies)', 'Fix gaps, update notices and contracts, train staff.', 'Updated artefacts'),
      P('Independent review', 'After remediation', 'Assessor or counsel tests the programme and samples requests and records.', 'Testing results'),
      P('Report issuance and filings', 'At the end of the review', 'Final assessment report; submit any audit, assessment or registration the law requires.', 'Assessment report, regulator filings'),
    ],
  },
  regulatory: {
    title: 'Regulatory compliance cycle: assessment to submission',
    note: 'For sector regulations that require periodic audits or returns to a regulator. Follow the regulator\'s published calendar for exact deadlines.',
    phases: [
      P('Applicability and scoping', 'Start of the cycle', 'Confirm the entity category and requirements that apply.', 'Applicability assessment'),
      P('Gap assessment', 'Months 1 to 2', 'Assess controls against the regulation.', 'Gap register'),
      P('Remediation', 'Months 2 to 6 (varies)', 'Close gaps and approve policies at board level where required.', 'Board-approved policies, remediation evidence'),
      P('Independent or internal audit', 'Before the regulator\'s deadline', 'Auditor tests compliance as the regulation requires.', 'Audit report'),
      P('Board or management sign-off', 'After the audit', 'Findings and action plans approved.', 'Signed compliance report'),
      P('Submission to regulator', 'By the regulator\'s deadline', 'File the audit report, return or certification.', 'Regulator acknowledgement'),
    ],
  },
  assessment: {
    title: 'Framework assessment: baseline to assessment report',
    note: 'This framework has no certification. A typical route is an independent or internal assessment that ends in a maturity or conformance report.',
    phases: [
      P('Scoping', 'Weeks 1 to 2', 'Agree scope, profile or implementation group, and target state.', 'Scope and target profile'),
      P('Current state assessment', 'Weeks 2 to 5', 'Interviews and evidence review against each requirement.', 'Current state scores'),
      P('Gap analysis and roadmap', 'Weeks 5 to 7', 'Prioritise gaps by risk and effort.', 'Gap register, roadmap'),
      P('Validation', 'Weeks 7 to 8', 'Review findings with control owners and confirm evidence.', 'Validated findings'),
      P('Report issuance', 'Weeks 8 to 10', 'Final assessment report presented to leadership.', 'Assessment report'),
      P('Reassessment', 'Annually', 'Repeat to measure progress.', 'Updated report'),
    ],
  },
  exam: {
    title: 'Certification exam: preparation to credential',
    note: 'This is a personal professional certification, not an organisational audit.',
    phases: [
      P('Study plan', 'Weeks 1 to 2', 'Review the body of knowledge and book a target exam date.', 'Study schedule'),
      P('Study and practice', 'Weeks 2 to 10', 'Work through the domains and practice questions.', 'Practice scores'),
      P('Exam booking', 'About 4 weeks before', 'Schedule the exam at a test centre or online.', 'Booking confirmation'),
      P('Exam', 'Exam day', 'Sit the exam.', 'Provisional result'),
      P('Credential issuance', 'Usually within a few weeks', 'Certification body confirms the result and issues the credential.', 'Certificate and digital badge'),
      P('Maintenance', 'Ongoing', 'Earn continuing education credits and pay maintenance fees.', 'Maintained credential'),
    ],
  },
};

// Framework id -> timeline type.
export const FRAMEWORK_TIMELINE = {
  soc2: 'soc2',
  'sox-404': 'sox',
  'medical-device-software': 'meddevice',
  hipaa: 'hipaa',
  'iso-27001-la': 'iso', 'iso27001-li': 'iso', 'iso-42001': 'iso', 'iso-22301': 'iso', iso27701: 'iso', 'iso-27017': 'iso', 'iso-27018': 'iso',
  hitrust: 'hitrust',
  'pci-dss-v4': 'pci',
  fedramp: 'fedramp',
  'nist-800-171-cmmc': 'cmmc',
  gdpr: 'privacy', 'uk-gdpr': 'privacy', 'ccpa-cpra': 'privacy', lgpd: 'privacy', pdpa: 'privacy', pipl: 'privacy', dpdpa: 'privacy', coppa: 'privacy',
  dora: 'regulatory', nis2: 'regulatory', rbi: 'regulatory', sebi: 'regulatory', cscrf: 'regulatory', 'cert-in': 'regulatory', 'eu-ai-act': 'regulatory',
  nist: 'assessment', cis: 'assessment', iso31000: 'assessment', 'iso-31000': 'assessment', 'iso-22317': 'assessment', 'iso-27090': 'assessment',
  aigp: 'exam', 'cippe-eu': 'exam', 'cippe-us': 'exam',
};

export function timelineFor(id, name = '') {
  const t = FRAMEWORK_TIMELINE[id];
  if (t) return TIMELINE_TYPES[t];
  if (/cert-?in/i.test(id + name)) return TIMELINE_TYPES.regulatory;
  if (/31000|cscrf/i.test(id + name)) return /cscrf/i.test(id + name) ? TIMELINE_TYPES.regulatory : TIMELINE_TYPES.assessment;
  return TIMELINE_TYPES.assessment;
}
