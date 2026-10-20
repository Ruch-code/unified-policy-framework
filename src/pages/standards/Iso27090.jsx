import LearningFrameworkPage from "../../components/LearningFrameworkPage.jsx";

const AI_SECURITY_ASSESSMENT = [
  // Baseline controls from generic assessment
  { id: 'GEN-01', itgc: 'Access Management', category: 'IT', control: 'MFA enforced on all admin & privileged access', tool: 'Okta, Microsoft Entra ID, AWS IAM Identity Center, Google Workspace SSO', scenario: 'Any team — enforce at the IDP level so all apps inherit it.', hours: 4 },
  { id: 'GEN-09', itgc: 'IT Operations', category: 'IT', control: 'Centralized logging & monitoring enabled', tool: 'AWS CloudWatch/Security Hub, Azure Monitor/Sentinel, GCP Logging, Datadog', scenario: 'Aggregate app + infra logs into one SIEM/SIEM-like store.', hours: 10 },
  { id: 'GEN-11', itgc: 'IT Operations', category: 'IT', control: 'Encryption at rest & in transit enforced', tool: 'KMS (AWS/Azure/GCP), TLS/HTTPS everywhere, encrypted volumes/DBs', scenario: 'Enable by default; disable plaintext channels.', hours: 5 },
  { id: 'GEN-14', itgc: 'Program / System Development', category: 'Non-IT', control: 'Vendor/third-party risk register with DPA/BAA status', tool: 'Notion/OneVault spreadsheet, Whistic, Vanta', scenario: 'One-row-per-vendor incl. data types + agreement status.', hours: 4 },

  // AI Data Security
  { id: 'AIS-01', itgc: 'AI Data Security', category: 'Hybrid', control: 'Training data provenance and lineage recorded', tool: 'DVC, MLflow, Datasheets for Datasets template', scenario: 'Record source, licence and collection date for every dataset used to train or fine-tune.', hours: 6 },
  { id: 'AIS-02', itgc: 'AI Data Security', category: 'IT', control: 'Data poisoning controls on training and RAG pipelines', tool: 'Great Expectations, cleanlab, IAM on S3/Blob, vector DB access controls', scenario: 'Validate, deduplicate and anomaly-check data before ingestion; restrict write access to datasets and vector stores.', hours: 10 },
  { id: 'AIS-03', itgc: 'AI Data Security', category: 'IT', control: 'Access control and integrity protection for datasets and embeddings', tool: 'AWS IAM, Azure RBAC, Pinecone/Weaviate RBAC, checksums', scenario: 'Least privilege on training data, feature stores and vector DBs; hash or sign datasets.', hours: 6 },

  // Model Security
  { id: 'AIS-04', itgc: 'Model Security', category: 'IT', control: 'Model artifact integrity and signed model registry', tool: 'MLflow Model Registry, SageMaker Model Registry, Sigstore/cosign', scenario: 'Sign and version models; deploy only from an approved registry.', hours: 6 },
  { id: 'AIS-05', itgc: 'Model Security', category: 'IT', control: 'Adversarial robustness and evasion testing before release', tool: 'IBM ART, Microsoft Counterfit, TextAttack', scenario: 'Test models against adversarial and perturbed inputs as part of release gating.', hours: 12 },
  { id: 'AIS-06', itgc: 'Model Security', category: 'IT', control: 'Model extraction and inversion protections', tool: 'API Gateway throttling, WAF, Cloudflare, custom monitors', scenario: 'Rate limit and authenticate inference APIs, limit confidence-score exposure, watch for query patterns that look like extraction.', hours: 8 },
  { id: 'AIS-07', itgc: 'Model Security', category: 'IT', control: 'Membership inference and privacy leakage testing', tool: 'ML Privacy Meter, differential privacy (Opacus, TF Privacy)', scenario: 'Check whether the model leaks training records or PII.', hours: 8 },

  // Input/Output Security
  { id: 'AIS-08', itgc: 'Input/Output Security', category: 'IT', control: 'Prompt injection and jailbreak defences for LLM applications', tool: 'Azure AI Content Safety Prompt Shields, Lakera Guard, NeMo Guardrails, Llama Guard', scenario: 'Separate system and user content, filter inputs, and constrain tool and agent permissions.', hours: 10 },
  { id: 'AIS-09', itgc: 'Input/Output Security', category: 'IT', control: 'Output validation and sensitive data filtering', tool: 'Microsoft Presidio, Guardrails AI, DLP tools', scenario: 'Scan outputs for PII, secrets and unsafe content before returning or acting on them.', hours: 6 },
  { id: 'AIS-10', itgc: 'Input/Output Security', category: 'Hybrid', control: 'AI red teaming before release and after major changes', tool: 'PyRIT, garak, promptfoo, MITRE ATLAS', scenario: 'Run structured red team exercises covering injection, data leakage and misuse.', hours: 16 },

  // AI Supply Chain
  { id: 'AIS-11', itgc: 'AI Supply Chain', category: 'Hybrid', control: 'Third-party and pretrained model risk assessment', tool: 'Vendor questionnaire, Hugging Face model cards, Whistic/Vanta', scenario: 'Assess foundation model providers and open-source models before use (licence, provenance, known issues).', hours: 6 },
  { id: 'AIS-12', itgc: 'AI Supply Chain', category: 'IT', control: 'AI bill of materials and dependency scanning', tool: 'CycloneDX ML-BOM, ModelScan, Protect AI, Snyk', scenario: 'Keep an AI-BOM (models, datasets, libraries) and scan for vulnerable or malicious packages and pickled models.', hours: 6 },

  // AI Operations & Monitoring
  { id: 'AIS-13', itgc: 'AI Operations & Monitoring', category: 'IT', control: 'Inference logging and abuse monitoring', tool: 'Datadog LLM Observability, Langfuse, Azure Monitor, CloudWatch', scenario: 'Log prompts, outputs and tool calls with retention rules; alert on abuse patterns.', hours: 8 },
  { id: 'AIS-14', itgc: 'AI Operations & Monitoring', category: 'IT', control: 'Model drift and performance degradation monitoring', tool: 'Evidently AI, Arize, WhyLabs, SageMaker Model Monitor', scenario: 'Detect drift that may indicate poisoning or compromise.', hours: 6 },

  // AI Governance
  { id: 'AIS-15', itgc: 'AI Governance', category: 'Non-IT', control: 'AI system inventory with risk classification', tool: 'Notion/Sheets register, OneTrust AI Governance, Credo AI', scenario: 'List every AI system, its owner, purpose, data used and risk tier.', hours: 5 },
  { id: 'AIS-16', itgc: 'AI Governance', category: 'Non-IT', control: 'AI threat modelling for each AI system', tool: 'MITRE ATLAS, OWASP LLM Top 10, OWASP Threat Dragon', scenario: 'Map threats with MITRE ATLAS and OWASP Top 10 for LLM Applications at design time.', hours: 8 },
  { id: 'AIS-17', itgc: 'AI Governance', category: 'Non-IT', control: 'AI security policy and secure AI development standard', tool: 'Confluence/Notion policy library, ISO/IEC 42001 control mapping', scenario: 'Document approved models, data handling, testing gates and human oversight.', hours: 5 },
  { id: 'AIS-18', itgc: 'AI Governance', category: 'Non-IT', control: 'AI security awareness training for engineers and users', tool: 'Internal sessions, OWASP resources, KnowBe4', scenario: 'Train staff on prompt injection, data leakage and safe use of AI tools.', hours: 3 },

  // AI Incident Response
  { id: 'AIS-19', itgc: 'AI Incident Response', category: 'Non-IT', control: 'AI incident response playbook', tool: 'Confluence runbook, PagerDuty, StatusPage', scenario: 'Cover poisoning, model theft, jailbreak abuse and data leakage, including rollback to the last known good model.', hours: 5 },
  { id: 'AIS-20', itgc: 'AI Incident Response', category: 'IT', control: 'Model rollback and kill switch capability', tool: 'Feature flags (LaunchDarkly), model registry versioning', scenario: 'Be able to disable or revert a model or AI feature quickly.', hours: 4 },
];

const FRAMEWORK = {
  id: "iso-27090",
  name: "ISO/IEC 27090:2026 - Cybersecurity - Artificial intelligence (AI) - Guidance for addressing security threats and compromises to AI systems",
  color: "indigo",
  region: "Global",
  flag: "🤖",
  flagAnimation: "float",
  basePath: "/iso/27090",
  referenceUrl: "https://www.iso.org/standard/27090",
  assessment: AI_SECURITY_ASSESSMENT,
  milestones: [
    { day: 7, label: "AI Security Foundations" },
    { day: 14, label: "Architecture & Risk Assessment" },
    { day: 21, label: "Controls Implementation" },
    { day: 28, label: "Validation & Audit Readiness" },
  ],
  weeks: [
    {
      week: 1,
      title: "ISO 27090 Foundations & AI Security Landscape",
      days: "Days 1–7",
      description:
        "Understand the scope of ISO/IEC 27090:2026 for AI security, its relationship to ISO 42001 and ISO 27001, and the unique security threats targeting AI systems including data poisoning, evasion, model extraction, model inversion, and prompt injection.",
      tasks: [
        {
          title: "Map ISO 27090 clause structure and scope",
          control: "ISO/IEC 27090 Clauses 4–10 — Context, Leadership, Planning, Support, Operation, Performance Evaluation, Improvement",
          how: "Create a clause map showing how ISO 27090 extends ISO 27001 Annex A controls and ISO 42001 AIMS for AI-specific security. Identify the AI system categories in scope: ML models, foundation models, LLM applications, RAG systems, AI agents, and AI-enabled services.",
          check: "Verify you can explain how Clauses 6–10 (Planning through Improvement) address AI-specific security threats beyond traditional IT systems.",
        },
        {
          title: "Understand AI security threats and attack surfaces",
          control: "ISO/IEC 27090 Clause 6.1.2 — AI security risk assessment; MITRE ATLAS framework",
          how: "Document typical AI system attack surfaces: training data, model artifacts, inference APIs, prompts/outputs, supply chain dependencies. Identify threat categories: data poisoning, evasion/adversarial examples, model extraction/inversion, membership inference, prompt injection, supply chain compromise. Map to MITRE ATLAS techniques.",
          check: "Confirm threat catalog covers data, model, inference, and supply chain layers with likelihood/impact ratings for each AI-specific threat.",
        },
        {
          title: "Define AI security roles and responsibilities",
          control: "ISO/IEC 27090 Clause 5.3 — Organizational roles, responsibilities, and authorities",
          how: "Define RACI for AI security: Model Owner (security by design), Data Engineer (data integrity), ML Engineer (robustness testing), Platform Team (inference security), Security Team (monitoring/response), End User (safe usage), Regulator (compliance). Document accountability for AI system lifecycle security.",
          check: "Confirm RACI matrix covers all AI lifecycle roles with specific security obligations assigned to each.",
        },
        {
          title: "Establish AI system inventory and risk classification",
          control: "ISO/IEC 27090 Clause 6.1.1 — AI system identification; ISO 42001 Annex A",
          how: "Inventory all AI systems: model type (classification, generation, embedding), deployment mode (internal, customer-facing, embedded), data sensitivity, regulatory scope, and business criticality. Assign risk tiers (Critical/High/Medium/Low) based on impact of compromise.",
          check: "Verify AI system register includes model type, owner, data categories, deployment context, risk tier, and applicable regulations for each system.",
        },
      ],
    },
    {
      week: 2,
      title: "AI Security Architecture & Risk Assessment",
      days: "Days 8–14",
      description:
        "Design security-preserving AI architecture per ISO 27090 Clause 6, conduct AI security risk assessments, and establish risk treatment criteria for AI-specific threats.",
      tasks: [
        {
          title: "Apply Security by Design to AI system lifecycle",
          control: "ISO/IEC 27090 Clause 6.2 — Security by design and default for AI systems",
          how: "Embed security into AI lifecycle: data validation at ingestion, provenance tracking for training data, secure model registry with signing, adversarial testing in CI/CD, prompt/output guards at inference, drift monitoring in production. Define security requirements for each phase: data preparation, training, validation, deployment, operation, decommissioning.",
          check: "Verify security requirements documented for each AI lifecycle phase with measurable criteria (e.g., all training datasets have provenance records; all models signed before deployment).",
        },
        {
          title: "Conduct AI Security Risk Assessment",
          control: "ISO/IEC 27090 Clause 6.1.2 — AI security risk assessment; MITRE ATLAS, OWASP LLM Top 10",
          how: "Execute risk assessment for each AI system: identify assets (data, models, prompts), threat actors, attack vectors (poisoning, evasion, extraction, injection), existing controls, likelihood/impact. Evaluate residual risk and select treatment: mitigate (implement controls), transfer (insurance/contracts), accept (documented), avoid (decommission).",
          check: "Confirm risk assessment covers all AI-specific threat categories, includes MITRE ATLAS technique mapping, documents residual risk with treatment decisions, and is signed off by risk owner.",
        },
        {
          title: "Establish AI data governance and poisoning controls",
          control: "ISO/IEC 27090 Clause 6.1.3 — Training data integrity; Annex A — AI data controls",
          how: "Implement: dataset versioning with DVC/MLflow, provenance records (Datasheets for Datasets), anomaly detection on ingestion (Great Expectations, cleanlab), write-access controls on feature stores/vector DBs, deduplication and quality gates. Define data retention and lineage requirements per model.",
          check: "Verify data governance controls enforced at pipeline level with telemetry showing provenance coverage, anomaly detection operational, and write-access restricted to authorized pipelines.",
        },
        {
          title: "Secure AI model artifacts and supply chain",
          control: "ISO/IEC 27090 Annex A — Model integrity; AI Supply Chain security",
          how: "Implement: signed model artifacts (Sigstore/cosign), approved model registry (MLflow, SageMaker), AI-BOM generation (CycloneDX ML-BOM), dependency scanning for vulnerable packages/pickled models (ModelScan, Protect AI), third-party model assessment (Hugging Face model cards, vendor questionnaires).",
          check: "Confirm 100% production models signed and registered, AI-BOM generated for each system, dependency scanning in CI/CD, and third-party model risk assessments completed before use.",
        },
      ],
    },
    {
      week: 3,
      title: "AI Security Controls Implementation",
      days: "Days 15–21",
      description:
        "Implement ISO 27090 controls for model security, input/output security, operations monitoring, governance, and incident response.",
      tasks: [
        {
          title: "Implement model security controls (robustness, extraction, privacy)",
          control: "ISO/IEC 27090 Annex A — Model security controls",
          how: "Deploy: adversarial robustness testing in release pipeline (IBM ART, Counterfit, TextAttack), rate limiting and authentication on inference APIs, confidence-score minimization, query-pattern monitoring for extraction attempts, membership inference testing (ML Privacy Meter), differential privacy for sensitive training data (Opacus, TF Privacy).",
          check: "Verify adversarial testing gates releases, inference APIs rate-limited/authenticated, extraction monitoring alerts on suspicious patterns, and privacy leakage testing completed for models handling sensitive data.",
        },
        {
          title: "Implement input/output security for LLM applications",
          control: "ISO/IEC 27090 Annex A — Prompt injection, output filtering, red teaming",
          how: "Deploy: system/user content separation, input filtering (Azure AI Content Safety, Lakera Guard, NeMo Guardrails, Llama Guard), output scanning for PII/secrets/unsafe content (Presidio, Guardrails AI, DLP), structured red teaming before release and after major changes (PyRIT, garak, promptfoo, MITRE ATLAS).",
          check: "Verify prompt injection defenses block known attack patterns, output filters catch PII/secrets, red team exercises completed with findings tracked, and tool/agent permissions constrained to minimum necessary.",
        },
        {
          title: "Implement AI operations monitoring and drift detection",
          control: "ISO/IEC 27090 Clause 9.1 — Monitoring, measurement, analysis, and evaluation for AI",
          how: "Deploy: inference logging with retention (Datadog LLM Observability, Langfuse, Azure Monitor, CloudWatch), abuse pattern alerting (unusual prompt patterns, volume spikes), model drift detection (Evidently AI, Arize, WhyLabs, SageMaker Model Monitor), performance degradation alerts. Define KPIs: inference latency, error rates, drift scores, abuse alerts.",
          check: "Confirm monitoring covers 100% production AI systems with <1hr detection for drift, abuse patterns, and performance degradation. Dashboards operational with alerts routed to on-call.",
        },
        {
          title: "Establish AI governance framework",
          control: "ISO/IEC 27090 Clause 5.2 — AI security policy; ISO 42001 Annex A",
          how: "Create: AI system inventory with risk tiers, threat models per system (MITRE ATLAS + OWASP LLM Top 10), AI security policy (approved models, data handling, testing gates, human oversight), security awareness training for engineers/users (prompt injection, data leakage, safe AI tool use). Map controls to ISO 42001 Annex A for AIMS alignment.",
          check: "Verify AI inventory complete, threat models documented for all Critical/High systems, policy published and acknowledged, training delivered with completion tracking, and ISO 42001 control mapping maintained.",
        },
        {
          title: "Implement AI incident response and model rollback",
          control: "ISO/IEC 27090 Clause 8.2 — AI security incident management; ISO 27001 Annex A.5.24–5.28",
          how: "Define AI-specific incident types: data poisoning, model theft, jailbreak abuse, data leakage, supply chain compromise. Build playbooks: model isolation via feature flags/registry versioning, kill switch for inference APIs, rollback to last known good model, user/regulator notification. Conduct tabletop exercises for poisoning and extraction scenarios.",
          check: "Verify incident response plan includes AI-specific scenarios, model rollback tested <1hr, kill switch operational, notification templates ready, and quarterly exercises conducted.",
        },
      ],
    },
    {
      week: 4,
      title: "Validation, Monitoring & Audit Readiness",
      days: "Days 22–28",
      description:
        "Validate control effectiveness, establish continuous monitoring for AI security, and prepare for internal/external audits per ISO 27090 and ISO 42001.",
      tasks: [
        {
          title: "Validate AI security control effectiveness",
          control: "ISO/IEC 27090 Clause 9.1 — Monitoring, measurement, analysis, and evaluation",
          how: "Define AI security KPIs: % models with signed artifacts, provenance coverage for training data, adversarial test pass rate, red team finding closure rate, drift detection accuracy, inference logging completeness, abuse alert precision/recall, AI inventory completeness, threat model currency, incident response exercise frequency. Build automated dashboards.",
          check: "Confirm KPI dashboard operational with real-time AI system telemetry, thresholds defined with alerts, and monthly management reporting.",
        },
        {
          title: "Implement continuous AI security monitoring",
          control: "ISO/IEC 27090 Clause 9.2 — Internal audit; Clause 9.3 — Management review",
          how: "Deploy: automated model registry compliance scanning, certificate/artifact signature verification, drift monitoring, consent/usage drift detection, data flow anomaly detection, model version compliance, supplier risk monitoring for AI vendors. Integrate with SIEM/SOAR for AI security events.",
          check: "Verify continuous monitoring covers 100% AI system fleet with <1hr detection for signature failures, drift alerts, and anomalous inference patterns.",
        },
        {
          title: "Conduct ISO 27090 / ISO 42001 internal audit",
          control: "ISO/IEC 27090 Clause 9.2 — Internal audit; ISO 19011 guidelines",
          how: "Audit scope: AI data controls, model integrity, input/output security, monitoring, governance, incident response. Checklist: control implementation per Annex A, risk assessment currency, treatment effectiveness, documentation completeness. Report findings with remediation tracking.",
          check: "Confirm internal audit completed covering all AI security domains, findings classified (Major/Minor/OFI), corrective actions assigned with deadlines, and audit report presented to management.",
        },
        {
          title: "Prepare for ISO 27090 / ISO 42001 certification audit",
          control: "ISO/IEC 27090 Clause 9.3 — Management review; ISO/IEC 17021-1 certification process",
          how: "Compile evidence package: risk assessments, risk treatment plans, control implementation evidence, monitoring data, audit reports, management review minutes, incident records, supplier assessments, AI-BOMs, red team reports, training records. Conduct pre-assessment (Stage 1 readiness). Address gaps before Stage 2.",
          check: "Verify evidence package complete for all clauses, Stage 1 readiness confirmed by certification body, no major nonconformities, and organization ready for Stage 2 audit.",
        },
      ],
    },
  ],
};

export default function Iso27090Page() {
  return (
    <>
      <LearningFrameworkPage framework={FRAMEWORK} />
    </>
  );
}

export { FRAMEWORK };