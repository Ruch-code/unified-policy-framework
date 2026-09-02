import LearningFrameworkPage from "../../components/LearningFrameworkPage";

const FRAMEWORK = {
    id: 'iso31000',
    name: 'ISO 31000:2018 Risk Management',
    shortName: 'ISO 31000',
    region: 'Global',
  flag: "🌐",
  flagAnimation: "float",
  basePath: "/iso-31000",
    color: 'navy',
    weeks: [
      {
        week: 1,
        title: 'Risk Management Principles & Foundations',
        days: 'Days 1-7',
        description: 'Understand ISO 31000:2018 risk management principles, the risk assessment process, and foundational identification/analysis techniques',
        tasks: [
          {
            title: 'ISO 31000:2018 Principles (Clause 4-5)',
            control: 'ISO 31000:2018 outlines eight core principles that must be present for effective risk management: integrated, structured and comprehensive, customised, inclusive, dynamic, best available information, human and cultural factors, and continual improvement.',
            how: 'Study the eight principles of ISO 31000:2018 and map each to your organisation ("risk management is integrated into all organisational activities", "structured and comprehensive", "customised to context", "inclusive", "dynamic and responsive to change", "considers human and cultural factors", "makes use of best available information", "and continually improved"). Assess organisational alignment against each principle. Document which principles are fully embedded, partially embedded, and absent. Identify gaps and define an action plan to strengthen principle alignment. Engage executive leadership in principle review to secure top-down endorsement of the risk management approach.',
            check: 'Verify a self-assessment against all eight ISO 31000:2018 principles is documented. Confirm each principle is rated fully/partially embedded. Check that a leadership-endorsed action plan closes the identified principle gaps. Validate that risk management roles and responsibilities are clearly defined across the organisation.'
          },
          {
            title: 'Risk Management Framework (Clause 5)',
            control: 'Clause 5 defines the risk management framework: leadership and commitment, integration, design, implementation, evaluation, and improvement of the framework across the organisation.',
            how: 'Review the framework components: leadership and commitment (top management owns risk), integration (risk is embedded in governance, strategy, and operations), design (context, risk policy, accountability, resources, communication), implementation (framework operationalisation, stakeholder support), evaluation (framework effectiveness measurement), and improvement (adaptation and continual enhancement). Develop or refine the organisational risk policy aligned with ISO 31000:2018. Define risk accountabilities including the board, executive, risk owner, and risk function. Ensure the framework is documented, approved by top management, and communicated. Build a framework evaluation and improvement cycle with defined review cadence.',
            check: 'Confirm an approved risk policy aligned with ISO 31000:2018 exists and is current. Verify framework roles/accountabilities are documented from board to operational risk owners. Check that a framework evaluation and improvement cycle is scheduled. Validate that the framework is integrated with strategic and operational planning processes.'
          },
          {
            title: 'Risk Assessment Process (Clause 6)',
            control: 'Clause 6 defines the risk assessment process as an iterative cycle of risk identification, risk analysis, and risk evaluation, followed by risk treatment and monitoring/review.',
            how: 'Map the full risk assessment process: scope definition, context and risk criteria establishment (clause 6.3), risk identification (multiple sources, events, causes, consequences), risk analysis (determine likelihood and consequence, qualitative or quantitative), risk evaluation (compare risk levels to criteria, prioritise), risk treatment (selection of options), and recording/reporting. Define risk criteria aligned to organisational objectives: likelihood scales, consequence scales, risk appetite, and risk tolerance levels. Establish formal documentation and reporting of each assessment stage. Ensure the process is iterative and reviewed regularly. Assign accountability for each process stage to defined roles.',
            check: 'Verify the full clause 6 risk assessment process is documented as a procedure. Confirm risk criteria (likelihood/consequence scales, appetite, tolerance) are defined and approved. Check that a sample assessment follows all five stages correctly. Validate that assessment outputs are formally recorded and reported to management.'
          },
          {
            title: 'Risk Identification Techniques',
            control: 'Risk identification uses a range of techniques to discover risks from multiple sources — process analysis, brainstorming, checklists, SWOT, scenario analysis, and structured techniques — none of which are mandated by ISO 31000 but all are compatible with its process.',
            how: 'Learn the common risk identification techniques: brainstorming and workshops, structured interviews, checklists and questionnaires, process mapping and flowcharts, SWOT/PESTLE analysis, scenario analysis and what-if, bow-tie analysis, fault tree and event tree, Delphi technique, and organisational learning/incident review. Select techniques suited to the organisation\'s context, complexity, and available data. Combine techniques for comprehensiveness (e.g., process mapping plus workshops). Establish a structured risk identification schedule covering strategic, operational, financial, compliance, and project risks. Document identified risks in a consistent format including source, cause, event, and consequence.',
            check: 'Confirm a documented risk identification procedure selects and justifies appropriate techniques. Verify SWOT/PESTLE, process mapping, and scenario techniques are applied in recent assessments. Check that risk identification covers strategic, operational, financial, compliance, and project domains. Validate that identified risks are recorded in a consistent structured format.'
          },
          {
            title: 'Risk Analysis Methods (Qualitative/Quantitative)',
            control: 'Risk analysis methods range from qualitative (scales and subjective judgement) to quantitative (Monte Carlo simulation, sensitivity analysis, scenario probabilities) to determine likelihood and consequence of risks.',
            how: 'Learn the spectrum of risk analysis methods: qualitative (risk matrices, descriptive scales), semi-quantitative (weighted scores, ordinal scales), and quantitative (Monte Carlo simulation, value-at-risk, decision trees, sensitivity analysis, expected monetary value, fault/event tree analysis). Determine which method fits the risk type and data availability: qualitative for emerging or judgement-based risks, quantitative where historical data and modelling are feasible. Develop likelihood and consequence scales with clear definitions. Apply analysis consistently and document assumptions. Select tools (spreadsheets, risk software, simulation packages) appropriate to the method chosen.',
            check: 'Verify the organisation has defined qualitative and quantitative analysis approaches. Confirm likelihood and consequence scales are documented with clear definitions. Check that a quantitative method (e.g., Monte Carlo, EMV) is used where data supports it. Validate that analysis assumptions are documented and reviewed.'
          }
        ]
      },
      {
        week: 2,
        title: 'Risk Evaluation & Treatment Implementation',
        days: 'Days 8-14',
        description: 'Establish risk evaluation criteria, apply treatment options, build the risk register, and assign accountability',
        tasks: [
          {
            title: 'Risk Evaluation Criteria',
            control: 'Risk evaluation compares analysed risk levels against established risk criteria (appetite and tolerance) to determine which risks require treatment and their treatment priority.',
            how: 'Define risk evaluation criteria: risk appetite (level of risk the organisation is willing to accept), risk tolerance (acceptable deviation), risk acceptance thresholds, and prioritisation rules. Establish a risk matrix that combines likelihood and consequence into priority zones (e.g., acceptable, tolerable, undesirable, unacceptable). Define evaluation decision rules: which priority zones require treatment, which are acceptable, and escalation triggers. Document the evaluation criteria with board or executive approval. Apply evaluation consistently across all risk assessments. Establish review cadence for criteria to ensure they remain aligned with strategic objectives.',
            check: 'Verify approved risk appetite and tolerance statements exist and are current. Confirm a risk matrix with priority zones is documented and used. Check that evaluation decision rules determine which risks require treatment. Validate that criteria are approved by executive leadership and reviewed regularly.'
          },
          {
            title: 'Risk Treatment Options (Avoid/Mitigate/Transfer/Accept)',
            control: 'ISO 31000:2018 identifies risk treatment options: avoiding the risk, taking/increasing risk to pursue an opportunity, removing the risk source, changing likelihood or consequence, sharing the risk (transfer), and retaining the risk (accept).',
            how: 'Learn the primary treatment categories: avoid (discontinue the activity), reduce/mitigate (implement controls to lower likelihood or consequence), transfer/share (insurance, outsourcing, contractual allocation), and accept/retain (accept within tolerance with monitoring). Evaluate each risk against all treatment options and select the most effective and efficient. Document treatment decisions with justification. For each selected treatment, design and implement controls. Consider opportunity-seeking treatments where risk-taking may yield benefit. Record residual risk (risk remaining after treatment) and evaluate its acceptability.',
            check: 'Verify treatment options (avoid/mitigate/transfer/accept) are explicitly considered for each significant risk. Confirm treatment decisions are documented with justification and rationale. Check that residual risk is assessed after treatment implementation. Validate that insurance/outsourcing transfers are tracked and current.'
          },
          {
            title: 'Risk Register Creation',
            control: 'The risk register is the central repository recording all identified, analysed, evaluated, and treated risks with their owners, scores, and treatment status.',
            how: 'Design a risk register structure with fields: risk ID, title, risk category, risk description (source, cause, event, consequence), likelihood score, consequence score, inherent risk rating, existing controls, residual risk rating, treatment option, treatment plan, risk owner, treatment owner, target date, and review status. Populate the register with all identified risks from the assessment process. Assign a risk rating methodology consistent with the evaluation criteria. Link each risk to relevant organisational objectives and (where applicable) risk criteria and controls. Establish register governance: single owner, version control, and regular update cadence. Integrate the register with existing management systems (GRC platform, spreadsheet, or tool).',
            check: 'Verify a current risk register exists with all required fields. Confirm each significant risk has an assigned owner and residual risk rating. Check that the register links risks to objectives and treatment plans. Validate register governance (owner, versioning, update cadence) is defined.'
          },
          {
            title: 'Risk Owner Assignment',
            control: 'ISO 31000:2018 requires clear accountability — each risk must have a designated risk owner accountable for managing that risk and its treatment.',
            how: 'Assign a risk owner for every registered risk: an individual accountable for ensuring the risk is managed, treatment implemented, and risk level monitored. Match owner authority with accountability (the owner must have the authority to act on the risk). Define owner responsibilities: maintaining the risk entry, implementing/championing treatment actions, reporting on risk status, and escalating when residual risk exceeds tolerance. Document ownership formally and communicate it. Ensure no risk is left without an owner. Review ownership assignments when personnel or risk profiles change.',
            check: 'Verify every risk in the register has a designated named owner. Confirm owners have authority matching their accountability. Check that owner responsibilities are documented and accepted. Validate that ownership is reviewed when roles or risks change.'
          },
          {
            title: 'Controls Selection Mapping (to ISO 27005)',
            control: 'ISO 27005 (Information Security Risk Management) operationalises ISO 31000 for information security and provides structured information security risk assessment guidance with control mapping to ISO 27001.',
            how: 'Map the relationship between ISO 31000 and ISO 27005: ISO 31000 provides the generic risk management framework, while ISO 27005 provides specific guidance for information security risk management aligned with ISO 27001 Annex A controls. For information security risks, apply ISO 27005 guidance for context establishment, risk assessment, treatment, and acceptance. Map identified information security risks to ISO 27001 Annex A controls (organisational, people, physical, technological). Build a control matrix linking each risk to its mitigating control(s). Use ISO 31000 principles to govern the overall process while applying ISO 27005/27001 for the information security domain. Reconcile risk registers across enterprise (ISO 31000) and information security (ISO 27005) levels.',
            check: 'Verify a mapping exists between ISO 31000 enterprise risk and ISO 27005 information security risk. Confirm information security risks are mapped to ISO 27001 Annex A controls. Check that control ownership and effectiveness are documented. Validate that enterprise and infosec risk registers are reconciled and consistent.'
          }
        ]
      },
      {
        week: 3,
        title: 'Monitoring, Review & Verification',
        days: 'Days 15-21',
        description: 'Establish monitoring and review procedures, develop KRIs/KPIs, build risk dashboards, and verify the risk process',
        tasks: [
          {
            title: 'Risk Monitoring & Review Procedures',
            control: 'ISO 31000:2018 requires ongoing monitoring and periodic review of the risk management framework and the risk assessment, control, and treatment processes to ensure continuing effectiveness.',
            how: 'Define monitoring activities: continuous tracking of existing risks, detection of new risks, identification of emerging risk sources, and verification of treatment plan progress. Establish review triggers: significant incidents, control changes, organisational change, new projects, regulatory changes, and scheduled periodic reviews. Set review cadence (e.g., monthly operational, quarterly management, annual board). Define who performs monitoring and review at each level. Ensure monitoring feeds learning back into the framework for improvement. Document monitoring results and review outcomes with actions arising.',
            check: 'Verify a documented monitoring and review procedure covers continuous tracking and scheduled reviews. Confirm review triggers are defined (incidents, changes, regulation). Check that monitoring results and review actions are recorded. Validate that monitoring findings feed back into framework improvement.'
          },
          {
            title: 'KRI/KPI Development',
            control: 'Key Risk Indicators (KRIs) are leading indicators that signal increasing or decreasing risk exposure, while Key Performance Indicators (KPIs) measure the effectiveness and performance of risk and control processes.',
            how: 'Define KRIs for each significant risk: metrics that change as risk exposure changes (e.g., number of failed access control reviews, unresolved patching backlog, staff turnover in critical roles, supplier incidents, unplanned downtime). Define KPIs for the risk process: risk register completeness, treatment completion rate, audit findings closed, control effectiveness scores, assessment timeliness. Set thresholds for each indicator (green/amber/red) with escalation triggers. Establish data sources and owners for each indicator. Integrate KRI/KPI reporting into regular management reporting cycles. Review and recalibrate indicators periodically to ensure they remain relevant.',
            check: 'Verify KRIs are defined for significant risks with thresholds and escalation triggers. Confirm KPIs measure risk process performance (treatment rate, findings closure). Check that data sources and owners are assigned to each indicator. Validate that indicators are reported in regular management cycles.'
          },
          {
            title: 'Risk Reporting Dashboards',
            control: 'Risk dashboards provide concise, visual, real-time visibility of risk exposure, treatment progress, and compliance status to support risk-informed decision-making.',
            how: 'Design a risk dashboard suite covering: heat map of current risk exposure (likelihood vs consequence), residual risk trends over time, treatment plan progress (on track/behind), overdue actions, top risks by score, KRI/KPI status at a glance, and risk ownership coverage. Select a delivery tool (GRC platform, BI tool, or spreadsheet-based) consistent with available infrastructure. Define dashboard audiences and frequencies (executive summary, operational detail). Automate data feeds where possible to reduce manual effort. Ensure dashboards enable drill-down from summary to individual risk detail. Establish an owner to maintain dashboards and validate data accuracy.',
            check: 'Verify a risk heat map dashboard is operational showing current exposure. Confirm treatment progress and overdue action reporting is included. Check that dashboards support the defined audiences at appropriate frequencies. Validate that dashboard data is sourced from the live risk register and accurate.'
          },
          {
            title: 'Internal Audit of Risk Process',
            control: 'Internal audit verifies the risk management process operates as designed, is effective, and conforms to ISO 31000:2018 expectations — independent assurance over the risk framework.',
            how: 'Define the audit scope: framework design conformance (principles, policy, integration), process execution (identification, analysis, evaluation, treatment), governance (ownership, reporting, escalation), and control effectiveness. Develop audit criteria mapped to ISO 31000:2018 clauses 4-6. Execute audit activities: document review, interviews with risk owners and management, sampling of risk assessments, and testing of controls. Assess whether the framework is actually used in decision-making, not merely documented. Report findings with severity ratings and remediation recommendations. Track audit findings to closure through management action plans. Coordinate with external auditors to avoid duplication.',
            check: 'Verify an internal audit of the risk process has been conducted with criteria mapped to ISO 31000. Confirm audit tested framework design, process execution, governance, and controls. Check that findings are rated and remediation is tracked to closure. Validate that audit confirms risk is used in actual decision-making.'
          },
          {
            title: 'Management Review of Risk Outcomes',
            control: 'Management review evaluates the effectiveness of the risk management framework and processes, using risk outcomes to drive decisions and continual improvement of the risk system.',
            how: 'Prepare management review inputs: risk assessment summaries, treatment outcomes, incident/event analysis, audit findings, KRI/KPI trends, framework evaluation results, and emerging risk outlook. Conduct periodic management review meetings (e.g., quarterly/annually) attended by accountable executives. Evaluate whether the risk strategy remains aligned with organisational objectives and appetite. Make decisions on: risk acceptance, resource allocation for treatment, framework changes, and improvement opportunities. Document management review minutes, decisions, and actions with owners and deadlines. Ensure action follow-up is tracked and reported at subsequent reviews.',
            check: 'Verify management review meetings are held with documented minutes and decisions. Confirm review inputs include assessments, outcomes, incidents, and KRI/KPI trends. Check that decisions on risk acceptance and treatment resourcing are recorded. Validate that review actions have owners and deadlines and are tracked to completion.'
          }
        ]
      },
      {
        week: 4,
        title: 'Advanced Scenarios & Certification Readiness',
        days: 'Days 22-28',
        description: 'Address common risk management failures, multi-cloud scenarios, sector frameworks, and risk culture to prepare for certification',
        tasks: [
          {
            title: 'Common Risk Management Failures',
            control: 'Recognising the most common risk management failures — checklist-only compliance, disconnected risk registers, ownership gaps, and framework formalism without decision impact — enables corrective action.',
            how: 'Study the common failure modes: treating risk management as a compliance checklist rather than a decision tool; risk registers disconnected from actual operations and decisions; undocumented or unrealistic likelihood/consequence scoring; risks without effective owners; treatment plans that are never executed; risk reviews that are superficial; silos between enterprise, operational, and project risk; ignoring human and cultural factors; lack of top management engagement; and failure to reassess after change. Diagnose which failure modes exist in your organisation. Design corrective actions for each identified failure: embed risk in governance, link risk to objectives, operationalise reviews, enforce ownership. Continuously assess against these failure modes as part of framework evaluation.',
            check: 'Verify a diagnosis of common failure modes against your risk process is documented. Confirm corrective actions are defined for each identified failure. Check that top management engagement with risk is evidenced. Validate that risk management demonstrably influences decisions, not just documents.'
          },
          {
            title: 'Multi-Cloud Risk Scenarios (AWS/Azure/GCP/Alibaba)',
            control: 'Multi-cloud environments introduce shared responsibility, vendor concentration, data residency, and control fragmentation risks that must be assessed and treated using ISO 31000 methods.',
            how: 'Assess cloud-specific risks: shared responsibility confusion (each provider\u2019s model differs), vendor lock-in and concentration, cross-cloud data governance and residency, fragmented access control and IAM, inconsistent monitoring across providers, provider outage dependency, supply chain risk, and misconfiguration exposure. Map risks to treatment options: mitigate (enforce consistent IaC/config scanning across all clouds), transfer (cloud insurance, contractual SLAs and indemnities), avoid (exclude certain workloads), accept (documented residual). Apply identification/analysis/evaluation for each cloud provider (AWS, Azure, GCP, Alibaba) using cross-cloud consistency frameworks. Verify controls apply uniformly across providers rather than provider-specific gaps.',
            check: 'Verify multi-cloud risks (shared responsibility, residency, lock-in, misconfiguration) are identified and analysed. Confirm treatment options are applied per risk with residual risk documented. Check that control consistency across AWS/Azure/GCP/Alibaba is validated. Validate cloud-specific scenarios are tested in the risk register and reviews.'
          },
          {
            title: 'Sector-Specific Risk Frameworks',
            control: 'Sector frameworks — financial (Basel/ISO 27001), healthcare (NIST/HIPAA), and technology (ISO 27005/NIST CSF) — layer specific risk requirements on top of the generic ISO 31000 process.',
            how: 'Financial sector: map to Basel III operational risk (AMA/standardised approach), COSO ERM integration, regulatory capital for operational risk, and financial crime/AML risk. Healthcare sector: map to HIPAA Security Rule risk analysis, NIST SP 800-30 for health data, clinical risk management (ISO 14971 for medical devices), and patient safety risk. Technology sector: map to ISO 27005 for infosec, NIST CSF for cyber risk, and software/system risk (ISO/IEC 27001, secure development). Compare the sector requirement matrix against your ISO 31000 process and identify additional criteria and controls needed. Reconcile generic ISO 31000 outputs with sector-specific reporting and regulatory requirements. Build a single integrated process that satisfies both the generic standard and sector obligations.',
            check: 'Verify sector-specific requirements (financial, healthcare, or tech as applicable) are mapped to the ISO 31000 process. Confirm sector-reporting and regulatory obligations are integrated into the risk process. Check that additional sector criteria and controls are documented. Validate reconciliation between generic and sector-specific risk outputs.'
          },
          {
            title: 'Risk Culture Development',
            control: 'ISO 31000:2018 recognises human and cultural factors as a core principle — building a positive risk culture embeds risk awareness and ownership across all levels of the organisation.',
            how: 'Define the desired risk culture: openness to discussing risk, willing escalation without blame, ownership at all levels, balanced risk-taking, and alignment of individual decisions with organisational risk appetite. Develop culture-building activities: training and awareness programs, leadership modelling of risk behaviour, risk communication and dialogue at all levels, recognition of good risk practices, and psychological safety for escalation. Assess current culture through surveys, interviews, and observation of decision behaviours. Design interventions to close cultural gaps. Promote "risk is everyone\u2019s responsibility" while maintaining structured ownership. Measure culture improvement over time through repeat assessments and behavioural indicators.',
            check: 'Verify a risk culture assessment (survey/interview) has been conducted. Confirm training and awareness programs embed risk principles across levels. Check that leadership visibly models risk-aware decision-making. Validate that culture improvement is measured through repeat assessment indicators.'
          },
          {
            title: 'Certification Readiness',
            control: 'Certification readiness ensures the risk management framework fully conforms to ISO 31000:2018 and can withstand an independent conformity assessment or certification audit.',
            how: 'Perform a gap assessment of the organisation against ISO 31000:2018 clauses 4-6: principles (clause 4), framework (clause 5), and process (clause 6). Compile evidence artefacts: risk policy, framework documentation, risk criteria, risk register, assessment records, treatment plans, monitoring/review records, management review minutes, and audit reports. Validate that documentation reflects actual practice, not just intended practice. Conduct a mock audit or conformity self-assessment following the certification audit approach. Prepare management and staff for auditor interviews by clarifying roles and responsibilities. Address all gaps with a remediation plan before the certification audit. Confirm scope and certification body requirements for ISO 31000 certification or integrated management system audit.',
            check: 'Verify a gap assessment against ISO 31000 clauses 4-6 is completed with remediation plan. Confirm evidence artefacts are compiled and reflect actual practice. Check that a mock audit or self-assessment identified and addressed gaps. Validate that management and staff are prepared for the certification audit.'
          }
        ]
      }
    ],
    milestones: [
      { day: 7, label: 'Risk Foundations Established', color: 'navy' },
      { day: 14, label: 'Register & Treatment Active', color: 'blue' },
      { day: 28, label: 'Certification Ready', color: 'green' }
    ],
    referenceUrl: 'https://www.iso.org/standard/65034.html'
};

export default function Iso31000() {
  return <LearningFrameworkPage framework={FRAMEWORK} />;
}

export { FRAMEWORK };
