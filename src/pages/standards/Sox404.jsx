import LearningFrameworkPage from "../../components/LearningFrameworkPage.jsx";
import SoxAuditProcess from "../../components/playbook/SoxAuditProcess.jsx";

// SOX 404 playbook: internal control over financial reporting (ICFR), from scoping to the auditor's opinion.
const FRAMEWORK = {
  id: "sox-404",
  name: "SOX 404: Internal Control over Financial Reporting",
  color: "blue",
  region: "United States",
  flag: "us",
  flagAnimation: "float",
  basePath: "/sox",
  referenceUrl: "https://pcaobus.org/oversight/standards/auditing-standards/details/AS2201",
  milestones: [
    { day: 7, label: "Scope and materiality agreed" },
    { day: 14, label: "Risk and control matrix complete" },
    { day: 21, label: "Testing and deficiency evaluation done" },
    { day: 28, label: "Management assessment signed" },
  ],
  weeks: [
    {
      week: 1,
      title: "Foundations and Scoping",
      days: "Days 1 to 7",
      description: "Understand what SOX requires of whom, adopt a control framework, and decide which accounts, processes and systems are in scope.",
      tasks: [
        {
          title: "Know which SOX sections apply to the company",
          hours: 2,
          control: "Section 302 requires the CEO and CFO to certify each quarterly and annual report, including their responsibility for internal controls. Section 404(a) requires management to assess and report on the effectiveness of internal control over financial reporting (ICFR) every year. Section 404(b) adds an attestation by the external auditor for accelerated and large accelerated filers. Non-accelerated filers and emerging growth companies are exempt from 404(b) but not from 404(a).",
          how: "Confirm the filer status from the most recent 10-K cover page (large accelerated, accelerated, non-accelerated, smaller reporting company, emerging growth company). Since the SEC's 2020 amendments, a smaller reporting company with annual revenue under $100 million is not an accelerated filer. Record whether 404(b) applies this year and when that may change.",
          check: "Can you state the filer status, whether an auditor opinion on ICFR is required, and the 10-K deadline that follows from it (60, 75 or 90 days after year end)?",
        },
        {
          title: "Adopt the COSO 2013 framework",
          hours: 2,
          control: "Management must assess ICFR against a recognised framework; almost all US registrants use COSO Internal Control: Integrated Framework (2013). It has five components (control environment, risk assessment, control activities, information and communication, monitoring) and 17 principles, all of which must be present and functioning.",
          how: "Build a mapping of each of the 17 principles to the controls and evidence that show it is present and functioning. Entity-level controls usually cover the control environment, risk assessment, information and communication, and monitoring principles.",
          check: "Every principle has at least one mapped control with an owner. Gaps against a principle are tracked as deficiencies.",
        },
        {
          title: "Set materiality and pick significant accounts",
          hours: 3,
          control: "Scoping is top-down and risk-based (PCAOB AS 2201). Overall materiality is usually a percentage of a benchmark such as pre-tax income or revenue. Accounts and disclosures above a lower scoping threshold, or with qualitative risk, are significant, together with their relevant assertions (existence, completeness, valuation, rights and obligations, presentation and disclosure).",
          how: "Agree the benchmark and percentage with the CFO and the external auditor. List every financial statement line item and disclosure, mark which are significant and why, and record the relevant assertions for each.",
          check: "The scoping memo shows materiality, the threshold used, each significant account with its assertions, and is approved by the CFO and shared with the auditor.",
        },
        {
          title: "Map accounts to processes, systems and locations",
          hours: 3,
          control: "Each significant account flows through business processes (order to cash, procure to pay, record to report, payroll, inventory, treasury, tax) and IT systems. Locations and business units are scoped by size and risk. Outsourced processes run by service organisations are also in scope.",
          how: "For each significant account, name the process, the in-scope applications, databases and operating systems, the locations, and any service organisation involved (payroll provider, cloud ERP, payment processor).",
          check: "The scoping matrix links every significant account to its processes, systems, locations and service organisations, with nothing left unmapped.",
        },
        {
          title: "Assess fraud risk",
          hours: 2,
          control: "COSO principle 8 requires management to consider the potential for fraud, including fraudulent reporting, misappropriation of assets and management override of controls.",
          how: "Run a fraud risk workshop with finance, operations and internal audit. Cover revenue recognition, manual journal entries, estimates and reserves, related parties and access to cash. Link each fraud risk to a control.",
          check: "A dated fraud risk assessment exists, journal entry and management override risks are addressed, and the audit committee has seen it.",
        },
      ],
    },
    {
      week: 2,
      title: "Control Design and Documentation",
      days: "Days 8 to 14",
      description: "Document how each process works, the risks of misstatement, and the controls that address them, including IT general controls.",
      tasks: [
        {
          title: "Document processes and build the risk and control matrix",
          hours: 4,
          control: "Each in-scope process needs a narrative or flowchart and a risk and control matrix (RCM) linking risks of material misstatement to key controls, assertions, control owners, frequency and type (preventive or detective, manual or automated).",
          how: "Interview process owners, draft narratives, and identify key controls that directly address each risk. Avoid listing every activity as a control; focus on the ones that would catch a material error.",
          check: "Every significant account and assertion is covered by at least one key control in the RCM, and each control has an owner, frequency and evidence description.",
        },
        {
          title: "Define entity-level controls",
          hours: 3,
          control: "Entity-level controls set the tone and catch issues across processes: code of conduct, audit committee oversight, whistleblower hotline, risk assessment, period-end financial reporting process, and monitoring by internal audit. Precise ones, such as a detailed monthly flux review, can reduce testing elsewhere.",
          how: "List entity-level controls by COSO component, document what each one reviews and at what precision, and decide which are direct (address a specific risk) and which are indirect.",
          check: "The period-end financial close and reporting process is documented and has controls over journal entries, consolidation and disclosure.",
        },
        {
          title: "Scope and document IT general controls",
          hours: 4,
          control: "ITGCs support the automated controls and reports that financial controls rely on. They cover four areas: access to programs and data, program changes, program development, and computer operations (jobs, backups, interfaces). They apply to each in-scope application, database and operating system layer.",
          how: "List the in-scope systems from the scoping matrix. For each, document user provisioning and removal, periodic access reviews, privileged access, change approval and testing, segregation of developers from production, and batch job monitoring.",
          check: "Every in-scope system has ITGCs mapped in all four areas, and each automated control or key report is linked to the system whose ITGCs support it.",
        },
        {
          title: "Control information used in controls (IPE) and review controls",
          hours: 3,
          control: "Information produced by the entity (IPE), such as system reports and spreadsheets used in a control, must be shown to be complete and accurate. Management review controls must define what is reviewed, the threshold that triggers follow-up, and how follow-up is evidenced.",
          how: "List every report used by a key control and record how its completeness and accuracy is established (system report logic tested, parameters checked, tie-out to the ledger). For review controls, write down precision thresholds and expected evidence.",
          check: "No key control relies on a report without a completeness and accuracy procedure, and review control evidence shows what was questioned and resolved, not only a signature.",
        },
        {
          title: "Cover service organisations",
          hours: 2,
          control: "When a service organisation processes transactions or hosts systems that affect financial reporting, management relies on its SOC 1 Type II report, must perform the complementary user entity controls (CUECs) it lists, and needs to cover any gap between the report period and year end.",
          how: "Collect SOC 1 Type II reports for each relevant provider, review the opinion and exceptions, map CUECs to your own controls, and obtain a bridge letter for the uncovered period.",
          check: "Each service organisation has a reviewed SOC 1 report on file, CUECs are mapped to controls, and exceptions have been assessed for impact.",
        },
      ],
    },
    {
      week: 3,
      title: "Testing and Deficiency Evaluation",
      days: "Days 15 to 21",
      description: "Confirm controls are designed well, test that they operated throughout the year, and evaluate anything that failed.",
      tasks: [
        {
          title: "Perform walkthroughs",
          hours: 3,
          control: "A walkthrough follows one transaction from start to finish through the process and its controls to confirm the documentation is accurate and the controls are designed to address the risk.",
          how: "For each key process, trace one transaction with the control owner, inspect the evidence at each control point, and update narratives where reality differs.",
          check: "Each process has a dated walkthrough, design is concluded as effective or not, and design gaps are logged as deficiencies.",
        },
        {
          title: "Test operating effectiveness",
          hours: 4,
          control: "Operating effectiveness testing shows a control worked as designed over the period. Sample sizes depend on frequency and risk; firms set their own tables, but a common guide is 1 for annual, 2 for quarterly, 2 to 5 for monthly, 5 to 15 for weekly and 20 to 40 for daily controls. An automated control can often be tested once if ITGCs are effective.",
          how: "Obtain a complete population, select samples, and test using inquiry plus inspection, observation or re-performance. Re-perform calculations and check approvals happened before the transaction was processed.",
          check: "Each key control has a test with population, sample, attributes, results and conclusion, and every exception is documented.",
        },
        {
          title: "Plan interim testing and rollforward",
          hours: 2,
          control: "Most testing is done at an interim date. Controls must then be shown to operate through year end, either by rollforward testing of the remaining period or by inquiry and observation for low-risk controls.",
          how: "Test key controls through the third quarter, then plan rollforward samples for the fourth quarter and year-end controls (year-end close, impairment, tax provision) that can only be tested after year end.",
          check: "The test plan shows interim and rollforward coverage for every key control, including those that only operate at year end.",
        },
        {
          title: "Evaluate and classify deficiencies",
          hours: 3,
          control: "A deficiency is a control that is missing, poorly designed or not operating. A significant deficiency is serious enough to merit the attention of those overseeing financial reporting. A material weakness is a deficiency, or combination, where there is a reasonable possibility that a material misstatement will not be prevented or detected on time.",
          how: "For each deficiency, assess the likelihood and magnitude of potential misstatement, consider compensating controls, and aggregate deficiencies affecting the same account, assertion or COSO component.",
          check: "Every deficiency is classified with a documented rationale, aggregation is considered, and significant deficiencies and material weaknesses are reported to the audit committee.",
        },
        {
          title: "Remediate and retest before year end",
          hours: 2,
          control: "A deficiency is remediated only when the fixed control has operated for long enough to be tested successfully. A material weakness that exists at year end means management cannot conclude ICFR is effective.",
          how: "Agree a remediation plan, owner and date for each deficiency. Leave enough time before year end for the new control to run the required number of times and be retested.",
          check: "Remediated controls have new test evidence covering a sufficient period, and open items are tracked to closure.",
        },
      ],
    },
    {
      week: 4,
      title: "Management Assessment and the Audit",
      days: "Days 22 to 28",
      description: "Conclude on ICFR, support the external auditor's work, and keep the programme running for next year.",
      tasks: [
        {
          title: "Prepare management's assessment and sub-certifications",
          hours: 3,
          control: "Management's annual report on ICFR states its responsibility, the framework used, and its conclusion on effectiveness at year end, including any material weaknesses. Sub-certifications from process and control owners support the CEO and CFO certifications.",
          how: "Summarise testing results and deficiency evaluations, collect signed sub-certifications, and draft the management report for the 10-K with legal and the audit committee.",
          check: "The management report is consistent with testing results and deficiency evaluations, and sub-certifications are on file.",
        },
        {
          title: "Support the integrated audit",
          hours: 3,
          control: "Under PCAOB AS 2201, the external auditor performs an integrated audit of the financial statements and ICFR. The auditor may use the work of internal audit or others when they are competent and objective, which reduces duplicate testing.",
          how: "Agree a reliance strategy with the auditor early, share the RCM, test plan and workpapers on an agreed schedule, and keep a single request tracker.",
          check: "Reliance areas are agreed in writing, and auditor requests are answered within the agreed turnaround.",
        },
        {
          title: "Communicate with the audit committee",
          hours: 2,
          control: "The audit committee oversees ICFR. It must hear about significant deficiencies and material weaknesses, the remediation status and the auditor's findings.",
          how: "Report SOX status each quarter: scope, testing progress, deficiencies by severity and remediation plans.",
          check: "Minutes show quarterly SOX updates and discussion of any significant deficiency or material weakness.",
        },
        {
          title: "Handle quarterly certifications and control changes",
          hours: 2,
          control: "Each quarter, the CEO and CFO certify under Section 302, and the company must disclose material changes in ICFR during the quarter.",
          how: "Run a quarterly disclosure committee and sub-certification cycle, and capture changes to systems, processes or people that affect key controls.",
          check: "Quarterly certifications are supported by sub-certifications, and control changes are evaluated and disclosed where material.",
        },
        {
          title: "Rationalise and improve the programme",
          hours: 2,
          control: "Mature SOX programmes reduce cost by removing redundant controls, automating manual ones, and relying more on precise entity-level and automated controls.",
          how: "After the audit, review controls with repeated exceptions or heavy effort, look for automation in the ERP, and update scoping for changes in the business.",
          check: "A rationalisation plan exists for next year, with expected changes to control count and testing effort.",
        },
      ],
    },
  ],
};

export default function Sox404() {
  return (
    <>
      <LearningFrameworkPage framework={FRAMEWORK} />
      <SoxAuditProcess />
    </>
  );
}

export { FRAMEWORK };
