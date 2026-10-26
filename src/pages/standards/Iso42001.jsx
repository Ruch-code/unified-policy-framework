import LearningFrameworkPage from "../../components/LearningFrameworkPage.jsx";

const FRAMEWORK = {
  id: "iso-42001",
  name: "ISO/IEC 42001:2023 AI Management System",
  color: "indigo",
  region: "Global",
  flag: "🤖",
  flagAnimation: "pulse",
  basePath: "/iso/42001",
  referenceUrl: "https://www.iso.org/standard/81230",
  milestones: [
    { day: 7, label: "AI Governance Foundations" },
    { day: 14, label: "Risk Assessment & AI System Classification" },
    { day: 21, label: "Controls Implementation & Monitoring" },
    { day: 28, label: "Certification Readiness & Continuous Improvement" },
  ],
  weeks: [
    {
      week: 1,
      title: "L1 Foundation: AI Governance & Organizational Context",
      days: "Days 1-7",
      description:
        "Establish AI governance foundations, understand organizational context for AI, and define the scope of the AI Management System.",
      tasks: [
        {
          title: "Define AI Management System Scope",
          control: "ISO/IEC 42001 Clause 4.3 - Determining the scope of the AI management system",
          how: "Identify the boundaries and applicability of the AI management system by documenting external and internal issues related to AI (regulatory landscape, AI-specific risks, stakeholder expectations, contractual obligations). Document the AI system boundaries including: AI system types (ML models, GenAI, decision systems), deployment environments, data flows, and organizational units involved. Produce a formal scope statement approved by top management.",
          check: "The AI scope statement clearly defines what AI systems are included/excluded, references applicable AI regulations (EU AI Act, sector-specific rules), and is approved by top management."
        },
        {
          title: "Analyze Organizational Context for AI",
          control: "ISO/IEC 42001 Clauses 4.1 and 4.2 - Context of the Organization for AI",
          how: "Conduct structured analysis of internal/external issues affecting AI governance (regulatory landscape, AI technology evolution, ethical considerations, supply chain dependencies). Map all AI stakeholders-customers, regulators, employees, affected communities, AI suppliers-and document their AI-related requirements. Use PESTLE analysis extended for AI-specific factors (ethical AI, bias, transparency, explainability).",
          check: "A documented register of AI-specific internal/external issues exists, an AI stakeholders register with their AI-related requirements is complete, and both are reviewed quarterly."
        },
        {
          title: "Define AI System Roles & Responsibilities",
          control: "ISO/IEC 42001 Clause 5.3 - Organizational roles, responsibilities, and authorities",
          how: "Define AI-specific roles: AI System Owner, AI Ethics Officer, Data Steward, Model Validator, AI Risk Owner. Document RACI matrix for AI governance activities. Ensure top management assigns AI governance accountability. Define decision-making authorities for AI system deployment, model approval, incident escalation, and data governance.",
          check: "AI-specific RACI matrix is documented, all AI governance roles have assigned owners, decision rights are documented, and accountability for AI outcomes is clearly assigned."
        },
        {
          title: "Establish AI Policy Framework",
          control: "ISO/IEC 42001 Clause 5.2 - AI Policy",
          how: "Create AI Policy hierarchy: overarching AI Policy approved by top management, topic-specific policies (AI Ethics, Responsible AI Development, Data Governance for AI, Model Deployment & Monitoring, AI Incident Response, Human Oversight, Third-Party AI Services). Ensure policies address: AI principles (fairness, transparency, accountability, privacy, safety), regulatory compliance (EU AI Act, sector-specific rules), and organizational AI objectives.",
          check: "Top management has approved the AI Policy, AI policies are communicated to all personnel, policies cover all critical AI domains, and policy compliance is monitored with defined metrics."
        }
      ]
    },
    {
      week: 2,
      title: "L2 Implementer: AI Risk Assessment & System Classification",
      days: "Days 8-14",
      description:
        "Deep-dive into AI-specific risk assessment, AI system classification per EU AI Act, and risk treatment planning for AI systems.",
      tasks: [
        {
          title: "Conduct AI-Specific Risk Assessment",
          control: "ISO/IEC 42001 Clause 6.1.2 - AI Risk Assessment & ISO/IEC 23894",
          how: "Select or develop AI-specific risk assessment methodology (e.g., ISO/IEC 23894). Define AI-specific risk criteria: bias & fairness, transparency/explainability, robustness/robustness, data quality, model drift, adversarial attacks, privacy leakage, supply chain risks. Assess risks across AI lifecycle: data preparation, model training, validation, deployment, monitoring, decommissioning. Document risk register with AI-specific risk scenarios.",
          check: "AI risk register covers all AI systems in scope, risks are assessed using defined criteria, risk owners assigned, risk treatment options documented, and register is reviewed quarterly."
        },
        {
          title: "Classify AI Systems per EU AI Act & Risk Tiering",
          control: "EU AI Act (Regulation 2024/1689) - Classification of AI Systems",
          how: "Classify each AI system per EU AI Act risk tiers: Prohibited (unacceptable risk), High-Risk (Annex III), Limited Risk (transparency obligations), Minimal Risk. For High-Risk AI systems: identify applicable Annex III categories (biometrics, critical infrastructure, education, employment, essential services, law enforcement, migration, justice). Document classification rationale with evidence. Map to ISO 42001 Annex A controls.",
          check: "All AI systems classified with documented rationale, high-risk systems mapped to Annex III categories, classification reviewed by legal/compliance, and register maintained."
        },
        {
          title: "Develop AI Risk Treatment Plans",
          control: "ISO/IEC 42001 Clause 6.1.3 - AI Risk Treatment",
          how: "For each identified AI risk, select treatment option: mitigate (implement controls from Annex A), retain (accept with justification), avoid (redesign/stop), share (insurance/outsourcing). Create detailed treatment plans for high-risk AI systems: control selection from Annex A, implementation timeline, responsible owner, success criteria, residual risk acceptance. Map treatments to ISO 42001 Annex A controls (A.2 AI Policy, A.3 Internal Organization, A.4 Resources, A.5 AI System Lifecycle, A.6 Data for AI, A.7 Information for Interested Parties, A.8 Use of AI Systems).",
          check: "Each AI risk has documented treatment option, treatment plans have owners/timelines, residual risks are explicitly accepted, and treatments mapped to Annex A controls."
        },
        {
          title: "Create Statement of Applicability for AI Controls",
          control: "ISO/IEC 42001 Clause 6.1.3d - Statement of Applicability",
          how: "Review all controls from ISO 42001 Annex A (38 controls across 8 domains). For each control, determine applicability based on AI risk assessment. Justify inclusion/exclusion with risk-based rationale. Document implementation status for applicable controls. Link to EU AI Act conformity requirements for high-risk systems.",
          check: "SoA covers all Annex A controls, each has justification, implementation status tracked, and alignment with EU AI Act requirements for high-risk systems documented."
        }
      ]
    },
    {
      week: 3,
      title: "L3 Implementer: AI Controls Implementation & Data Governance",
      days: "Days 15-21",
      description:
        "Implement AI-specific controls across the AI lifecycle: data governance, model development, deployment, monitoring, and human oversight.",
      tasks: [
        {
          title: "Implement AI Data Governance & Quality Controls",
          control: "ISO/IEC 42001 Annex A.6 - Data for AI Systems",
          how: "Implement data governance for AI: data provenance tracking, data quality metrics (accuracy, completeness, consistency, representativeness), bias detection & mitigation in training data, data lineage documentation, data versioning, data minimization & purpose limitation, consent management for personal data. Implement data quality checks in pipelines: schema validation, distribution monitoring, anomaly detection, bias monitoring (demographic parity, equalized odds).",
          check: "Data quality metrics defined and monitored for all AI training/inference data, bias assessments conducted, data lineage documented, and data quality issues tracked to resolution."
        },
        {
          title: "Implement Model Development & Validation Controls",
          control: "ISO/IEC 42001 Annex A.5 - AI System Lifecycle & A.8 Use of AI Systems",
          how: "Implement model development controls: model documentation (model cards), reproducible training pipelines (MLflow, DVC), experiment tracking, hyperparameter tracking, model versioning, model registry (MLflow, SageMaker). Validation controls: train/validation/test splits, cross-validation, bias/fairness testing (disparate impact, equal opportunity), robustness testing (adversarial, out-of-distribution), performance thresholds with automated gates. Deployment controls: canary deployments, shadow mode, rollback capability, model monitoring (drift, performance, data quality).",
          check: "Model cards exist for all production models, reproducible pipelines with versioning, validation gates enforced in CI/CD, monitoring dashboards operational with alerting thresholds."
        },
        {
          title: "Implement Human Oversight & Transparency Controls",
          control: "ISO/IEC 42001 Annex A.8 - Use of AI Systems & EU AI Act Art. 14",
          how: "Implement human oversight mechanisms: human-in-the-loop for high-risk decisions, human-on-the-loop for monitoring, clear escalation paths for AI decisions. Transparency controls: model cards published, user-facing explanations (LIME/SHAP), AI disclosure notices for end-users, logging of AI decisions for audit trail. Implement AI incident response: detection, triage, containment, root cause analysis, user notification, regulatory reporting (EU AI Act Art. 73).",
          check: "Human oversight mechanisms implemented for all high-risk AI, transparency artifacts published, incident response tested via tabletop exercise, and logging/audit trail operational."
        },
        {
          title: "Implement AI Supply Chain & Third-Party Model Governance",
          control: "ISO/IEC 42001 Annex A.4 - Resources & A.7 Information for Interested Parties",
          how: "Govern third-party AI: model provenance verification (model cards, datasheets), supplier AI risk assessment, contractual clauses (IP rights, liability, audit rights, model updates), sub-model registry, open-source model scanning (ModelScan, Protect AI). Implement AI-BOM (AI Bill of Materials): base models, fine-tuning data, libraries, dependencies. Monitor for: model supply chain attacks (pickled models, dependency confusion), license compliance, vulnerability scanning.",
          check: "Third-party AI inventory complete, supplier risk assessments done, contractual protections in place, AI-BOM maintained, and vulnerability scanning integrated in CI/CD."
        }
      ]
    },
    {
      week: 4,
      title: "L4 Certification Readiness: AI Audits & Continuous Improvement",
      days: "Days 22-28",
      description:
        "Prepare for ISO 42001 certification audit, establish continuous monitoring, and embed AI governance into organizational culture.",
      tasks: [
        {
          title: "Prepare for ISO 42001 Certification Audit",
          control: "ISO/IEC 42001 Certification Process & ISO/IEC 17021-1",
          how: "Compile evidence package: AI policy, risk assessment, risk treatment, SoA, policies, procedures, records, monitoring data, incident logs, management review minutes. Conduct internal audit (ISO 19011) covering all Annex A controls. Address findings, close nonconformities. Select accredited certification body. Prepare for Stage 1 (document review) and Stage 2 (on-site assessment).",
          check: "Evidence package complete for all clauses, internal audit completed with findings addressed, CB selected, and organization ready for Stage 1 audit."
        },
        {
          title: "Establish Continuous AI Monitoring & Improvement",
          control: "ISO/IEC 42001 Clauses 9 & 10 - Performance Evaluation & Improvement",
          how: "Establish continuous monitoring: AI model performance dashboards (accuracy, drift, bias, latency), data quality dashboards, incident tracking, regulatory change monitoring. Implement management review: quarterly AI governance reviews, annual strategy review, KPI tracking (model accuracy, bias incidents, drift events, incident MTTR). Establish continual improvement: AI red teaming schedule, bias audits, model retraining triggers, feedback loops from users/affected parties.",
          check: "Monitoring dashboards live with alerting, management review cadence established, improvement actions tracked, and AI governance embedded in organizational processes."
        },
        {
          title: "Align with EU AI Act Conformity Assessment",
          control: "EU AI Act (Regulation 2024/1689) - Conformity Assessment for High-Risk AI",
          how: "For high-risk AI systems: complete conformity assessment per AI Act (internal control + notified body or full QMS). Prepare technical documentation (Art. 11): system description, design specs, risk management, data governance, testing results, deployment instructions. Implement post-market monitoring (Art. 72): incident reporting, periodic safety updates, performance tracking. Prepare for CE marking and EU declaration of conformity.",
          check: "Technical documentation complete for all high-risk AI, conformity assessment pathway defined, post-market monitoring plan operational, and CE marking readiness confirmed."
        },
        {
          title: "Finalize AI Governance Maturity Assessment",
          control: "Organizational AI Governance Maturity",
          how: "Assess AI governance maturity across 5 levels: Initial (ad hoc), Developing (documented), Defined (standardized), Managed (measured), Optimized (continuous improvement). Assess across: governance structure, risk management, data governance, model lifecycle, monitoring, incident response, supply chain, culture. Create improvement roadmap with 12-month targets.",
          check: "Maturity assessment completed with baseline scores, improvement roadmap with quarterly milestones, executive sponsorship confirmed, and progress tracking mechanism established."
        }
      ]
    },
  ],
};

export default function Iso42001Page() {
  return (
    <>
      <LearningFrameworkPage framework={FRAMEWORK} />
    </>
  );
}

export { FRAMEWORK };