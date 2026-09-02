import LearningFrameworkPage from "../../components/LearningFrameworkPage";

const FRAMEWORK = {
  id: "iso27001-li",
  name: "ISO/IEC 27001:2022 Lead Implementer",
  color: "purple",
  region: "Global",
  flag: "🌐",
  flagAnimation: "float",
  basePath: "/iso/27001/li",
  referenceUrl: "https://www.iso.org/standard/27001",
  weeks: [
    {
      week: 1,
      title: "L1 Foundation: ISMS Fundamentals",
      days: "Days 1-7",
      description:
        "Establish a solid understanding of the Information Security Management System (ISMS) framework, including scope definition, organizational context, and risk assessment foundations as defined in ISO/IEC 27001:2022.",
      tasks: [
        {
          title: "Define ISMS Scope Using Clauses 4.3 and 4.4",
          control: "Clause 4.3 - Determining the scope of the ISMS",
          how: "Identify the boundaries and applicability of the ISMS by documenting external and internal issues (Clause 4.1), requirements of interested parties (Clause 4.2), and interfaces between activities performed by the organization and those by external parties. Produce a formal scope statement including physical locations, network boundaries, organizational units, and technology assets in scope.",
          check: "The scope statement clearly defines what is included and excluded, references applicable interested party requirements, and is approved by top management."
        },
        {
          title: "Analyze Organizational Context and Interested Parties",
          control: "Clauses 4.1 and 4.2 - Context of the Organization",
          how: "Conduct a structured analysis of internal and external issues affecting information security (regulatory landscape, market conditions, organizational culture, contractual obligations). Map all interested parties—customers, regulators, employees, suppliers, shareholders—and document their information security requirements. Use PESTLE and SWOT analyses for systematic context assessment.",
          check: "A documented register of internal/external issues exists, an interested parties register with their requirements is complete, and both are reviewed quarterly."
        },
        {
          title: "Map ISMS Processes and Their Interactions",
          control: "Clause 4.4 - Information Security Management System",
          how: "Document all processes required for the ISMS including their sequence, interaction, inputs, outputs, criteria, and resources needed. Create process interaction diagrams showing how risk assessment, risk treatment, monitoring, and continual improvement link together. Define process owners, key performance indicators, and process-level objectives.",
          check: "Process maps are documented with clear inputs/outputs, process owners are assigned, and process interactions are validated against ISMS requirements."
        },
        {
          title: "Conduct Risk Assessment Methodology Selection",
          control: "Clauses 6.1.2 and 8.2 - Information Security Risk Assessment",
          how: "Select or develop a risk assessment methodology appropriate to the organization. Define risk criteria including acceptable risk levels, impact scales (confidentiality, integrity, availability), likelihood scales, and risk evaluation criteria. Document the methodology in a formal risk assessment procedure that covers asset identification, threat analysis, vulnerability assessment, and risk calculation.",
          check: "A documented risk assessment methodology exists, criteria are measurable and repeatable, methodology is approved by information security management, and has been validated on a pilot basis."
        },
        {
          title: "Create the Statement of Applicability Overview",
          control: "Clause 6.1.3d - Statement of Applicability",
          how: "Review all 93 controls from Annex A of ISO/IEC 27001:2022 organized across the four themes (Organizational, People, Physical, Technological). For each control, determine whether it is applicable, justify inclusion or exclusion, and note current implementation status. Begin the SoA document with version control and review scheduling.",
          check: "SoA covers all Annex A controls, each has a justification for applicability decision, implementation status is recorded, and document follows version control procedures."
        }
      ]
    },
    {
      week: 2,
      title: "L2 Implementer: Control Implementation",
      days: "Days 8-14",
      description:
        "Deep-dive into implementing security controls, developing risk treatment plans, creating policies, and building competency frameworks to operationalize the ISMS.",
      tasks: [
        {
          title: "Develop Risk Treatment Plans",
          control: "Clause 6.1.3 - Information Security Risk Treatment",
          how: "For each identified risk, select an appropriate treatment option: modify (mitigate through controls), retain (accept with justification), avoid (eliminate the activity), or share (transfer through insurance/outsourcing). Create detailed risk treatment plans specifying the control(s) to be implemented, responsible owners, implementation timelines, resources required, and success criteria. Map each risk treatment to specific Annex A controls.",
          check: "Each identified risk has a documented treatment option, risk treatment plans include timelines and ownership, residual risks are explicitly accepted by risk owners, and plans are traceable to the risk register."
        },
        {
          title: "Implement Annex A Security Controls",
          control: "Annex A - Reference Control Objectives and Controls",
          how: "Systematically implement controls from all four Annex A themes: Organizational (policies, roles, cloud security, threat intelligence), People (screening, awareness, terms of employment), Physical (perimeters, equipment security, secure disposal), Technological (access rights, malware protection, secure development). For each control, document the implementation details, configuration settings, operational procedures, and responsible personnel.",
          check: "Controls are implemented according to the risk treatment plan, each has documented implementation evidence, configuration baselines are established, and operational procedures are published."
        },
        {
          title: "Complete the Statement of Applicability",
          control: "Clause 6.1.3d - Statement of Applicability",
          how: "Finalize the SoA by confirming implementation status of all Annex A controls. For implemented controls, reference the implementation documentation and evidence. For excluded controls, provide formal justifications based on risk assessment results. Ensure the SoA includes: control reference, control title, justification for inclusion/exclusion, implementation status, and cross-references to supporting documents. Include formal approval from information security management.",
          check: "SoA is complete with all 93 controls addressed, justifications are risk-based, approval is documented, SoA version matches the current risk assessment version, and any exclusions are accepted by management."
        },
        {
          title: "Develop Security Policies and Framework",
          control: "Clauses 5.2 and 7.2 - Policy and Competence",
          how: "Create the Information Security Policy hierarchy: overarching policy approved by top management, topic-specific policies (access control, cryptography, incident management, acceptable use, data classification, physical security, cloud security, threat intelligence). Ensure policies address applicable legal and regulatory requirements, define roles and responsibilities, and set measurable security objectives.",
          check: "Top management has approved the policy, policies are communicated to all personnel, topic-specific policies cover all critical domains, and policy compliance is monitored."
        },
        {
          title: "Establish Competency and Training Programs",
          control: "Clause 7.2 - Competence",
          how: "Define competence requirements for all roles involved in ISMS implementation and operation. Create a training needs analysis, develop competency matrices, and implement training programs including: ISMS awareness for all staff, role-specific technical training, security awareness campaigns, and specialized training for risk assessors and internal auditors. Document training records and effectiveness evaluations.",
          check: "Competency requirements are defined per role, training programs are delivered with attendance records, effectiveness is evaluated through assessments, and competency gaps are identified and addressed."
        }
      ]
    },
    {
      week: 3,
      title: "L3 Verifier: Audit and Monitoring",
      days: "Days 15-21",
      description:
        "Build robust internal audit capabilities, monitoring mechanisms, management review processes, and evidence collection systems to verify control effectiveness.",
      tasks: [
        {
          title: "Set Up Internal Audit Program",
          control: "Clause 9.2 - Internal Audit",
          how: "Establish a comprehensive internal audit program covering all ISMS processes, controls, and requirements. Develop an annual audit schedule ensuring all elements are audited at planned intervals. Create audit procedures including: scope definition, audit criteria, auditor qualification requirements (independence, objectivity), audit methods (interviews, observation, sampling, technical testing), nonconformity classification, and corrective action tracking. Train internal auditors on ISO 19011 principles.",
          check: "Annual audit schedule covers all ISMS elements, audit procedures are documented, auditors demonstrate competence and independence, audit reports are produced with findings and recommendations, and corrective actions are tracked to closure."
        },
        {
          title: "Implement Monitoring and Measurement of Controls",
          control: "Clause 9.1 - Monitoring, Measurement, Analysis and Evaluation",
          how: "Define what needs to be monitored and measured for each control area: KPIs for access control (percentage of terminated accounts disabled within SLA), incident response (mean time to detect/respond), patch management (compliance rates), vulnerability management (remediation timelines). Implement automated monitoring tools, configure dashboards, establish baseline measurements, and define reporting cadences. Ensure measurement methods produce comparable and reproducible results.",
          check: "Measurable metrics are defined for all critical controls, monitoring tools are operational with automated alerts, baseline measurements are documented, and regular measurement reports are produced."
        },
        {
          title: "Establish Management Review Process",
          control: "Clause 9.3 - Management Review",
          how: "Define the management review process including: frequency (minimum annual, recommended quarterly), required inputs (audit results, nonconformity status, monitoring results, stakeholder feedback, improvement opportunities, risk assessment changes, objective achievement), required outputs (improvement decisions, resource allocation, ISMS changes). Prepare management review templates, agenda structures, and action tracking mechanisms.",
          check: "Management review process is documented, required inputs and outputs are defined, reviews are scheduled and conducted with top management participation, minutes and action items are recorded and tracked."
        },
        {
          title: "Conduct Control Effectiveness Testing",
          control: "Clause 9.1 - Monitoring, Measurement, Analysis and Evaluation",
          how: "Design and execute control effectiveness tests for critical security controls. Techniques include: penetration testing for technical controls, walkthrough procedures for process controls, sampling exercises for detective controls, scenario-based testing for incident response controls, social engineering tests for awareness controls. Document test methodology, results, identified weaknesses, and improvement recommendations.",
          check: "Test plans cover critical controls, tests are conducted by qualified personnel, results are documented with risk-rated findings, remediation plans are created for identified weaknesses, and effectiveness trends are analyzed."
        },
        {
          title: "Build Evidence Collection System",
          control: "Clauses 7.5 - Documented Information",
          how: "Establish a systematic approach to collecting and maintaining evidence of ISMS operation and control effectiveness. Create evidence repositories organized by control category, define retention periods, implement version control, and establish chain of custody procedures. Evidence types include: policy acknowledgments, training records, access logs, configuration screenshots, meeting minutes, audit reports, incident records, and supplier assessment results.",
          check: "Evidence repository structure is defined, evidence collection procedures are documented, retention periods are established, evidence is organized and retrievable, and collection completeness is periodically verified."
        }
      ]
    },
    {
      week: 4,
      title: "L4 Certified: Certification and Continual Improvement",
      days: "Days 22-28",
      description:
        "Prepare for and achieve ISO 27001 certification, address common implementation challenges, and establish mechanisms for continual improvement through the PDCA cycle.",
      tasks: [
        {
          title: "Prepare for Certification Audit (Stage 1 and Stage 2)",
          control: "ISO/IEC 17021-1 - Certification Body Requirements",
          how: "Prepare comprehensive documentation package for the certification body including: ISMS documentation, risk assessment and treatment records, SoA, evidence of operation (internal audit results, management review records, monitoring reports), and organizational structure. Conduct a pre-certification readiness assessment to identify and close gaps. Prepare staff for Stage 1 (documentation review) and Stage 2 (implementation audit) interviews. Coordinate logistics including site access, evidence availability, and personnel scheduling.",
          check: "Documentation package is complete and current, readiness assessment shows no critical gaps, staff are briefed on interview expectations, and Stage 1 findings are addressed before Stage 2."
        },
        {
          title: "Address Stage 1 and Stage 2 Readiness",
          control: "Certification Process Requirements",
          how: "For Stage 1 readiness, ensure all mandatory documented information exists and is accessible: ISMS scope, information security policy, risk assessment methodology, risk treatment plan, SoA, objectives, and evidence of process operation. For Stage 2 readiness, verify controls are consistently implemented across the scope, personnel understand their responsibilities, records demonstrate sustained operation (typically 3+ months), and management commitment is evident. Address any Stage 1 nonconformities or observations before Stage 2 commencement.",
          check: "All mandatory documented information is prepared, operational evidence demonstrates 3+ months of consistent operation, personnel can articulate their ISMS responsibilities, and Stage 1 findings are fully resolved."
        },
        {
          title: "Learn Common Implementation Pitfalls and Solutions",
          control: "Implementation Best Practices",
          how: "Study and address frequent ISO 27001 implementation failure modes: lack of genuine top management commitment, treating certification as a one-time project rather than ongoing process, poor risk assessment quality (generic risks, missing context), control-policy disconnect, inadequate internal resources and competence, insufficient documentation before implementation, skipping legal and regulatory requirements analysis, and ignoring organizational culture factors. Develop mitigation strategies for each pitfall applicable to your organization.",
          check: "Common pitfalls have been reviewed against organizational context, applicable pitfalls have documented mitigation strategies, lessons learned are captured, and implementation team has discussed each pitfall."
        },
        {
          title: "Prepare for Surveillance Audits",
          control: "Ongoing Certification Maintenance",
          how: "Establish procedures for annual surveillance audits including: maintaining evidence of continuous ISMS operation, keeping documentation current and reviewed, tracking and resolving nonconformities from previous audits, conducting regular internal audits, scheduling management reviews, monitoring ISMS objectives achievement, and demonstrating continual improvement. Create a surveillance audit preparation checklist with responsible parties and timelines.",
          check: "Surveillance audit preparation procedures exist, evidence of continuous operation is maintained, previous audit findings are resolved, documentation currency is ensured, and annual surveillance audit checklist is operational."
        },
        {
          title: "Implement Continual Improvement Through PDCA Cycle",
          control: "Clause 10 - Improvement",
          how: "Embed the Plan-Do-Check-Act cycle into all ISMS operations. Plan: set measurable security objectives, identify improvement opportunities from audits, incidents, and monitoring. Do: implement changes, deploy new controls, update procedures. Check: measure performance against objectives, evaluate control effectiveness, analyze audit findings. Act: address nonconformities, implement corrective actions, share lessons learned, update risk assessments. Document the continual improvement program with regular reporting to management.",
          check: "PDCA cycle is operational across all ISMS processes, improvement opportunities are systematically identified, corrective actions are tracked to completion, and continual improvement is reported at management reviews."
        }
      ]
    }
  ],
  milestones: [
    {
      week: 1,
      title: "ISMS Foundation Complete",
      description: "Scope defined, context analyzed, risk methodology selected, and Statement of Applicability draft initiated."
    },
    {
      week: 2,
      title: "Controls Operationalized",
      description: "Risk treatment plans finalized, Annex A controls implemented, policies published, and competency programs launched."
    },
    {
      week: 4,
      title: "Certification Ready",
      description: "Audit preparation complete, PDCA cycle embedded, and organization ready for ISO 27001 certification audit."
    }
  ]
};

export default function Iso27001LiPage() {
  return <LearningFrameworkPage framework={FRAMEWORK} />;
}

export { FRAMEWORK };
