import LearningFrameworkPage from "../../components/LearningFrameworkPage";

const FRAMEWORK = {
  id: "iso-27001-la",
  name: "ISO/IEC 27001:2022 Lead Auditor Playbook",
  color: "navy",
  region: "Global",
  referenceUrl: "https://www.iso.org/standard/27001",
  milestones: [
    { day: 7, label: "Foundation Complete" },
    { day: 14, label: "Audit Planning Mastered" },
    { day: 28, label: "Certified Auditor" },
  ],
  weeks: [
    {
      week: 1,
      title: "ISO 27001 Structure & Audit Fundamentals",
      days: "Days 1–7",
      description: "Master the standard's architecture, control families, and core audit concepts before planning any engagement.",
      tasks: [
        {
          title: "Map ISO 27001:2022 clause structure (Clauses 4–10)",
          control: "Understand the Plan-Do-Check-Act cycle across clauses: Context (4), Leadership (5), Planning (6), Support (7), Operation (8), Performance Evaluation (9), Improvement (10).",
          how: "Create a one-page clause map that links each clause to the organization's ISMS scope. Identify which departments or processes each clause touches.",
          check: "Verify you can explain how Clause 6 (risk assessment) feeds into Clause 8 (controls) and how Clause 9 (monitoring) closes the loop back to Clause 10 (improvement).",
        },
        {
          title: "Identify and categorize Annex A control families",
          control: "Annex A in ISO 27001:2022 contains 93 controls across 4 themes: Organizational (37), People (8), Physical (14), Technological (34). Know where A.5 through A.8 fall.",
          how: "Build a reference card mapping each Annex A control family to the Statement of Applicability (SoA). Mark which controls are selected and justify any exclusions.",
          check: "Confirm every control listed in the SoA has a documented implementation status, responsible owner, and evidence location recorded.",
        },
        {
          title: "Distinguish audit types: internal, external, and surveillance",
          control: "Internal audits validate ongoing compliance within the organization. External (certification) audits are conducted by accredited bodies. Surveillance audits occur annually between recertification cycles.",
          how: "Review an organization's audit schedule for the last three years. Note the rotation of auditors, scope changes between internal and external cycles, and surveillance visit frequency.",
          check: "Verify that the audit program covers all clauses and relevant Annex A controls at planned intervals, and that no process or department has been omitted for more than two consecutive audit cycles.",
        },
        {
          title: "Apply risk-based thinking to audit planning",
            control: "ISO 27001:2022 Clause 6.1 requires the organization to address risks and opportunities. The auditor must evaluate whether the risk assessment methodology is appropriate, consistent, and produces repeatable results.",
          how: "Observe how the organization identifies, analyses, evaluates, and treats information security risks. Cross-reference the risk register against implemented controls to ensure traceability.",
          check: "Confirm that the risk register is maintained, that treatment plans have owners and deadlines, and that residual risk is accepted by management with documented authority.",
        },
        {
          title: "Learn audit terminology: NC, OFI, major/minor findings",
          control: "A non-conformity (NC) is a failure to meet a requirement. A major NC causes or risks total ISMS breakdown. A minor NC is an isolated lapse. An opportunity for improvement (OFI) is a finding that does not breach the standard but could strengthen the ISMS.",
          how: "Study at least ten real-world audit finding examples. Classify each as major NC, minor NC, or OFI and write a one-sentence justification for each classification.",
          check: "Test your classification by comparing your assessments against a senior auditor's evaluation. Ensure you can articulate why a finding is major rather than minor based on scope and impact.",
        },
      ],
    },
    {
      week: 2,
      title: "Audit Planning & Document Review",
      days: "Days 8–14",
      description: "Build the skills to scope an audit, define criteria, review documentation, and construct effective checklists and sampling strategies.",
      tasks: [
        {
          title: "Create a comprehensive audit plan",
          control: "An audit plan defines the scope, criteria, schedule, team roles, logistics, and resource requirements for a specific audit engagement.",
          how: "Draft a complete audit plan template that includes: audit objective, scope boundaries, criteria reference (ISO 27001 clauses), team assignments, daily schedule, and reporting requirements.",
          check: "Verify the plan references specific clauses and Annex A controls, identifies auditees by department, allocates realistic time per area, and specifies the audit methodology.",
        },
        {
          title: "Define and document audit scope and criteria",
          control: "Audit scope must explicitly state what locations, processes, ISMS boundaries, and time periods are under review. Criteria reference the applicable clauses and controls.",
          how: "Review the organization's ISMS scope statement and compare it to the physical and logical boundaries you will audit. Document any exclusions and their justifications.",
          check: "Confirm scope covers all claimed locations, business units, and technology platforms. Check that excluded processes are documented and justified in the SoA.",
        },
        {
          title: "Perform document review before fieldwork",
          control: "Document review examines policies, procedures, records, and the SoA to identify potential non-conformities before on-site audit activities begin.",
          how: "Systematically review the ISMS policy, risk assessment reports, treatment plans, SoA, internal audit records, and management review minutes. Flag gaps, outdated documents, and missing approvals.",
          check: "Ensure all reviewed documents are within their validity period, carry appropriate approval signatures, and align with the scope stated in the audit plan.",
        },
        {
          title: "Build targeted audit checklists",
            control: "A well-constructed checklist maps specific audit questions to ISO 27001 clauses and Annex A controls, ensuring complete coverage during fieldwork.",
          how: "Develop a checklist organized by clause that includes open-ended questions for each control objective, space for evidence references, and a severity rating column.",
          check: "Confirm every clause (4–10) and every selected Annex A control is addressed. Validate that questions are specific enough to elicit actionable evidence rather than generic responses.",
        },
        {
          title: "Apply appropriate sampling methods",
          control: "Sampling allows auditors to draw conclusions about a population from a representative subset. Both judgmental and statistical sampling have specific use cases.",
          how: "Define the population for each sample (e.g., 120 access reviews), choose a sampling technique (random, stratified, or judgmental), and document the sample size and rationale.",
          check: "Verify that the sample size is statistically defensible, that sample selection is unbiased, and that findings from the sample are extrapolated with appropriate caveats.",
        },
      ],
    },
    {
      week: 3,
      title: "Fieldwork: Interviews, Evidence & Findings",
      days: "Days 15–21",
      description: "Execute the audit on-site with strong opening and closing meetings, precise questioning, rigorous evidence handling, and disciplined daily debriefs.",
      tasks: [
        {
          title: "Conduct a professional opening meeting",
          control: "The opening meeting establishes audit scope, introduces the team, confirms the schedule, and sets expectations with auditees. It is the auditor's first impression and sets the tone.",
          how: "Prepare and deliver an opening meeting covering: audit objective, scope, criteria, schedule, team member roles, confidentiality commitments, reporting process, and how to raise concerns.",
          check: "Verify the opening meeting was attended by relevant management, that scope was confirmed without ambiguity, and that the audit schedule was agreed upon and documented.",
        },
        {
          title: "Use effective interview techniques for evidence gathering",
          control: "Audit interviews must elicit factual, verifiable information. Open-ended questions, active listening, and neutrality are essential to avoid biased or incomplete findings.",
          how: "Practice a structured interview sequence: start with process understanding, move to specific implementation details, then ask for evidence of compliance. Record responses using the Arete method.",
          check: "Confirm each interview produces at least one piece of verifiable evidence (document, record, screenshot, or observation). Validate interviewee claims with corroboration from a second source.",
        },
        {
          title: "Collect and evaluate audit evidence",
          control: "Audit evidence must be relevant, reliable, sufficient, and traceable. Physical observation, document inspection, and record verification are primary collection methods.",
          how: "Apply the evidence hierarchy: objective records (logs, configurations) rank higher than testimony. Photograph or screenshot critical configurations. Maintain an evidence log with file references.",
          check: "Verify every finding is supported by at least one piece of documented evidence. Ensure evidence is date-stamped, attributable to a specific source, and stored securely.",
        },
        {
          title: "Evaluate findings and assign severity ratings",
          control: "Findings must be evaluated against the audit criteria to determine conformity or non-conformity. Severity ratings (major, minor, OFI) guide the corrective action response.",
          how: "After each audit day, classify findings by severity. A major NC arises from systemic failure or absence of a required control. A minor NC is a localised deviation. An OFI suggests enhancement.",
          check: "Confirm every finding includes the clause or control reference, objective evidence, the non-conformity statement, and the assigned severity. Cross-check ratings with a peer.",
        },
        {
          title: "Maintain the audit log and conduct daily team debriefs",
          control: "An audit log tracks all activities, evidence references, findings, and schedule deviations. Daily debriefs allow the team to share observations and recalibrate priorities.",
          how: "End each audit day with a 30-minute debrief. Each auditor shares findings, evidence status, and concerns. Update the master audit log and adjust the next day's plan as needed.",
          check: "Verify the audit log is complete, chronological, and cross-referenced to evidence. Confirm debriefs were conducted daily and that adjustments to the audit plan were documented.",
        },
      ],
    },
    {
      week: 4,
      title: "Reporting, Corrective Actions & Exam Readiness",
      days: "Days 22–28",
      description: "Write authoritative audit reports, evaluate root causes and corrective actions, and prepare for IRCA or PECB Lead Auditor certification exams.",
      tasks: [
        {
          title: "Write a complete audit report",
          control: "The audit report communicates findings, conclusions, and recommendations to the auditee and management. It must be clear, objective, factual, and traceable to evidence.",
          how: "Structure the report with: executive summary, scope, criteria, methodology, detailed findings (with clause references and evidence), conclusions, and recommendations. Use neutral, professional language.",
          check: "Verify the report includes every identified finding, that each finding references the correct ISO 27001 clause or Annex A control, and that evidence links are functional and accessible.",
        },
        {
          title: "Draft non-conformity reports with root cause analysis",
          control: "A non-conformity report (NCR) describes the deviation, cites the requirement, presents the evidence, and requires a root cause analysis before corrective action can be accepted.",
          how: "Use the 5 Whys or Ishikawa method to identify root causes. Draft each NCR with: non-conformity statement, clause reference, objective evidence, and root cause analysis section.",
          check: "Confirm every NCR clearly distinguishes the symptom from the root cause. Verify the root cause is specific enough to drive an effective corrective action, not just a surface-level fix.",
        },
        {
          title: "Evaluate corrective action effectiveness",
          control: "After the auditee responds with corrective actions, the auditor must verify that root causes are addressed, actions are implemented, and effectiveness is demonstrated before closure.",
          how: "Review corrective action submissions for completeness: Does it address the root cause? Is it implemented? Is there evidence of effectiveness? Does it prevent recurrence across similar areas?",
          check: "Verify that closed corrective actions include implementation evidence, effectiveness verification results, and a rationale for closure signed by an authorized auditor.",
        },
        {
          title: "Prepare for IRCA or PECB Lead Auditor certification exams",
          control: "IRCA and PECB exams test clause interpretation, audit process knowledge, finding classification, and practical judgment. Both require 40 hours of accredited training.",
          how: "Complete at least three full-length practice exams under timed conditions. Review ISO 19011:2018 for audit methodology and ISO 17021 for certification body requirements.",
          check: "Confirm you can answer scenario-based questions on non-conformity grading, audit evidence evaluation, and auditor ethics with at least 75% accuracy on practice exams.",
        },
        {
          title: "Identify and avoid common audit pitfalls",
          control: "Frequent audit failures include: confirmation bias, leading questions, scope creep, poor time management, failing to verify evidence, and loss of auditor independence.",
          how: "Review post-audit lessons learned from at least two completed audits. Document three personal improvement areas and create a checklist of pitfalls to avoid during future engagements.",
          check: "Verify your pitfall avoidance checklist is referenced before each audit day. Confirm you can describe a specific instance where recognizing a bias improved your audit outcome.",
        },
      ],
    },
  ],
};

export default function Iso27001La() {
  return <LearningFrameworkPage framework={FRAMEWORK} />;
}
