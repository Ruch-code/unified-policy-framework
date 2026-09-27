import LearningFrameworkPage from "../../components/LearningFrameworkPage.jsx";
import AigpUseCases from "../../components/AigpUseCases.jsx";

const FRAMEWORK = {
  id: 'aigp',
  name: 'IAPP AIGP — AI Governance Professional',
  region: 'Global',
  flag: "🌐",
  flagAnimation: "float",
  basePath: '/aigp',
  color: 'purple',
  tagline: 'IAPP Certified Artificial Intelligence Governance Professional',
  referenceUrl: 'https://iapp.org/certify/aigp/',
  startupGaps: [
    {
      itgc: 'Program / System Development',
      gap: 'AI systems shipped with no inventory, model card, or data lineage',
      pushback: "We just call an API — it's a tool, not a \"system\", and nobody has time to document it.",
      reality: 'Every AI system that touches decisions, customers, or data is now governed by laws that are in force (EU AI Act phases, Colorado AI Act, GDPR Art. 22). Shadow-AI vendors and undocumented models are exactly the gap a regulator or customer audit finds first.',
      policy: 'AI Governance & Inventory Policy, AI Development Lifecycle Policy, Data Governance / Lineage Policy, Information Asset Management Policy',
      compensating: [
        'Central model registry and API-inventory tooling capture usage automatically',
        'CI/deploy logs show model versions and releases as an evidence trail',
        'Vendor dashboards expose which AI APIs are called and by whom',
      ],
      leantip: 'Start a lightweight AI system register today: name, owner, vendor/version, data in/out, human-oversight status. Extend the existing asset register and add an approval gate whenever a new model API is introduced.',
    },
    {
      itgc: 'General / Cross-Cutting',
      gap: 'No accountable owner or budget for responsible AI',
      pushback: "Compliance is the security team's job, and AI is the AI team's job — we don't have an AI governance person.",
      reality: 'Regulators (EU AI Act, Colorado) put duties on deployers regardless of headcount. For a startup, a part-time accountable AI lead plus a named system owner per model is enough to demonstrate the governance function exists.',
      policy: 'AI Governance Policy, AI Roles, Responsibilities & Escalation Policy, Board / Management Oversight Policy',
      compensating: [
        'A "security champion"-style AI lead inside engineering',
        'Model-level owners already exist in the ML team — formalize them',
        'Steering happens in existing product and risk meetings, no new ceremony',
      ],
      leantip: 'Formally assign an accountable AI lead and one owner per high-consequence model. Fold AI oversight into the existing security-review or product-gating meeting rather than standing up new process.',
    },
    {
      itgc: 'Privacy',
      gap: 'PII flows into models (training, prompts, fine-tuning) with no lineage, purpose, or minimization',
      pushback: "The prompts we send to the LLM are just product data — everyone does this.",
      reality: 'Prompt data is personal-data processing: GDPR Art. 28 requires a DPA and sub-processor list, CCPA needs service-provider terms, and a breach-notification clock starts if it leaks. Purpose limitation is checked before lawyers even look at the AI.',
      policy: 'Data Protection & DPIA Policy, Vendor / Third-Party Data Processing Policy (DPA/BAA), Records & Retention Policy',
      compensating: [
        'API gateways can redact or pseudo-anonymize PII before it reaches the model',
        'Local or EU-region inference options reduce transfer risk',
        'Log-based sampling reveals what is actually sent upstream',
      ],
      leantip: 'Inventory what your tools actually send to LLM vendors with a prompt-sampling campaign. Default to PII redaction at the gateway, region-stickiness, and a DPA for every AI vendor before anyone sends a prompt.',
    },
    {
      itgc: 'Access Management',
      gap: 'Automated decisions run with no human oversight or override path',
      pushback: "It's better than humans — the model is the decision. Reviewing every case defeats the point.",
      reality: 'Solely-automated decisions with legal or similarly significant effect face GDPR Art. 22 restrictions and EU AI Act Art. 14 human-oversight duties, plus contest rights in every case. "The model decides" is not a defensible answer to a regulator or a rejected customer.',
      policy: 'Automated Decision-Making & Human Oversight Policy, Contestability & Explanation Policy, Model Risk Management Policy',
      compensating: [
        'Threshold-based review: high-impact cases always human-reviewed, low-impact cases auto',
        'Identity and decision logs that make any decision reconstructable',
        'A one-click override + explanation flow for the product team',
      ],
      leantip: 'Define meaningful human review: inputs, output, explanation, override authority, and a log. Apply it to high-impact decisions first and expand as volume allows. Grant contest/explanation via the existing support/DSAR workflow.',
    },
    {
      itgc: 'IT Operations',
      gap: 'No post-deployment monitoring for drift, bias, or hallucinations',
      pushback: "It passed testing — we'll notice if it breaks.",
      reality: 'Models decay silently (data drift, concept drift, bias decay) and generative systems hallucinate in production regardless of test accuracy. EU AI Act Art. 72 requires post-market monitoring and Art. 73 requires reporting serious AI incidents — no monitoring means no evidence you noticed anything.',
      policy: 'AI Monitoring & Post-Market Surveillance Policy, Incident Response & AI Incident Policy, Change & Release Management Policy',
      compensating: [
        'Feature/log telemetry already exists in most stacks — expose drift and refusal signals from it',
        'User-reported issues and support-ticket labels act as a weak detector',
        'Scheduled re-runs of the evaluation suite flag regression',
      ],
      leantip: 'Define three cheap signals now: drift on key inputs, refusal/hallucination rate if generative, and a monthly re-run of your bias/accuracy tests. Wire them into the existing incident/on-call path and write the "pull the model" criteria in advance.',
    },
  ],
  weeks: [
    {
      week: 1,
      title: 'Foundation: AI Fundamentals & the Global Regulatory Landscape',
      days: 'Days 1-7',
      description: 'Understand how modern AI actually works, classify AI systems, and build a working map of the EU AI Act and the global regulatory patchwork — the base every AIGP candidate operates from.',
      tasks: [
        {
          title: 'Build an inventory of AI systems and their data flows',
          control: 'AIGP BoK Domain I (AI Fundamentals) + Domain III (AI Governance Program). An AI inventory is the asset register of responsible AI — you cannot govern what you cannot see.',
          how: 'Walk every product and internal tool. For each, record: name/owner, purpose, type (ML model, LLM/RAG, rules-assisted, third-party API), model family and version, data inputs and outputs, deployment environment(s), the decision it informs (and whether any human reviews it), and the systems that depend on it. Include shadow-AI: employee-use base models, code assistants, support bots, and vendor AI added under the procurement radar. Tag each with a criticality signal (customer PII, money movement, hiring, EU exposure). Store it in the AI system register appended to the existing asset register with version and review date.',
          check: 'An AI inventory exists in the register covering every product and internal AI system, each with owner, type, data flows, human-oversight status, and criticality tags; shadow-AI discovered via a scanning campaign and added; the register has a review cadence.',
        },
        {
          title: 'Classify the EU AI Act risk tiers and map obligations',
          control: 'EU AI Act (Reg. (EU) 2024/1689) — prohibited uses (Art. 5), high-risk (Art. 6 + Annex III), limited-risk transparency (Art. 50), minimal risk; GPAI provisions (Arts. 51-56); conformity assessment (Art. 43); registration (Art. 49).',
          how: 'For each system in the register, do the four-tier walk: (1) Prohibited — social scoring, subliminal exploitation, exploitation of vulnerable people; check against the Art. 5 list only. (2) High-risk — match Annex III categories (biometrics, critical infrastructure, education, employment, creditworthiness and essential services, law enforcement, migration, democratic processes); apply the containment rule in Art. 6(3) (a system is high-risk only if it is a safety component of, or the system itself is, a product covered by EU harmonization legislation). (3) Limited-risk — chatbots and deepfakes/synthetic content carry Art. 50 transparency duties. (4) Minimal risk. For each high-risk system, note: risk-management system (Art. 9), data governance (Art. 10), technical documentation (Art. 11), logging (Art. 12), transparency to deployers (Art. 13), human oversight (Art. 14), accuracy/robustness/cybersecurity (Art. 15), conformity assessment and CE mark (Arts. 43-49), EU database registration (Art. 49), post-market monitoring (Art. 72) and serious-incident reporting (Art. 73). Record the classification and the phased applicability timeline through 2026-2027.',
          check: 'Every inventory system is classified into a risk tier using the Art. 6/Annex III walk; an obligations map lists each high-risk system with its EU AI Act articles and status; prohibited uses checked; phased compliance timeline recorded per system.',
        },
        {
          title: 'Model the GDPR / AI interaction (Art. 22, DPIA, data-subject rights)',
          control: 'GDPR Art. 22 (automated individual decision-making, including profiling), Art. 35 (DPIA), Arts. 13-14 (transparency), and the special-category limits in Art. 9. The AIGP privacy bridge: most AI processing is personal-data processing first, AI regulation second.',
          how: 'For each high-consequence system, answer three questions. (1) Does it produce a decision about a person with legal or similarly significant effect? If solely automated, Art. 22 applies: prohibited unless necessary for a contract, authorized by Member-State law, or based on explicit consent — and always with suitable safeguards (meaningful human review, contestability, the right to obtain human intervention and express a view). (2) Does it involve high-risk processing requiring a DPIA (Art. 35) — systematic and extensive automated profiling, large-scale special-category data, or large-scale monitoring of a publicly accessible area? Produce the DPIA before processing. (3) Can you support rights? Information about how the system works, an explanation of the logic involved and the significance and envisaged consequences, erasure/rectification paths covering the training- and prompt-data trail, and the right to object to profiling. Document lawful basis and the safeguards for any solely-automated decision, then feed the output into the register.',
          check: 'Art. 22 analysis done for every solely- or partly-automated decision system with the human-review and contest path defined; DPIAs exist for high-risk processing with sign-off; all three rights questions answered per system with evidence (notice text, DSAR workflow, explanation mechanism); lawful basis documented.',
        },
        {
          title: 'Orient the US AI law patchwork (state + federal) and common-law risk',
          control: 'US: Colorado AI Act (SB 205, in force 2026 — consequential decisions), California SB 53 (frontier/sensitive model safety framework, effective 2026), Texas Responsible AI Governance Act (2025), NYC Local Law 144 (AEDT bias audits), Illinois AIVI; federal expectations via FTC Section 5 (unfair/deceptive practices), EEOC workplace guidance, and ECOA / Regulation B for credit.',
          how: 'Map your US surface by exposing who uses your tools. California — CCPA rights over personal information processed by your models, plus SB 53 duty-of-care and safety-framework obligations if you operate frontier or sensitive models. Colorado — consumer AI law covering consequential decisions (employment, credit, housing, education, insurance, healthcare): deployer duties include impact assessments, notice to consumers, and human-oversight evidence for riskier consequential decisions. New York City — automated employment decision tools must be independently bias-audited and the audit made public (the "AEDT" requirement). Texas — annual impact assessments for high-impact consequential decisions. For each: record which state law applies, the trigger (decision type vs model capability), the artifact owed (audit report, impact assessment, privacy notice), and the owner. Federal expectation: the FTC treats "AI washing" and unvalidated fairness claims as deceptive, so apply advertising-law rigor to AI marketing claims.',
          check: 'US state-by-state applicability matrix built with trigger, artifact owed, and owner per state; NYC AEDT bias-audit path confirmed for hiring tools; Colorado consequential-decision assessment scheduled with human-oversight evidence planned; FTC/EEOC claims checklist in place for AI marketing and hiring.',
        },
        {
          title: 'Orient the global landscape: China, India, Brazil, Canada, OECD & UNESCO',
          control: 'China: Interim Measures on Generative AI (2023), PIEL, the draft AI Law and algorithm recommendation/filing rules; India: DPDP Act 2023, NITI Aayog Responsible AI framework, MeitY AI advisories; Brazil: LGPD plus AI Bill (PL 2338); Canada: AIDA (proposed); OECD AI Principles; UNESCO Recommendation on the Ethics of AI.',
          how: 'Build a one-page global map. (1) China — the Generative AI Measures are the operative layer (registration and security assessment, content rules, algorithm filing for recommendation and synthesis), while PIEL governs training data as personal information. (2) India — DPDPA gives the data-processing baseline (consent architecture), while the MeitY advisory and NITI Aayog framework set AI expectations (labels on synthetic content, bias avoidance, consent-overload guardrails). (3) Brazil — LGPD is the current operative layer; the pending AI law adds risk-tiered duties. (4) International norms — OECD AI Principles (human-centred values, transparency, robustness, accountability) are the reference almost every regulator cites; UNESCO adds human-rights and environmental framing. Mark which of your markets each instrument covers, which are genuinely in force versus bills, and keep the map dated and versioned — this area changes monthly.',
          check: 'A dated one-page global AI map exists covering China (generative-AI filing), India (DPDPA + advisory), Brazil (LGPD + bill), Canada (AIDA status), and OECD/UNESCO alignment; each market flagged in-force vs in-flight with an owner; the map is versioned and reviewed quarterly.',
        },
      ],
    },
    {
      week: 2,
      title: 'Implementer: AI Risk Management & Governance Program',
      days: 'Days 8-14',
      description: 'Stand up the governance machinery — accountable roles, NIST AI RMF and ISO/IEC 42001 alignment, a risk-assessment practice covering bias, privacy, security, IP and autonomy, and third-party AI oversight.',
      tasks: [
        {
          title: 'Stand up the AI governance program and accountable roles',
          control: 'AIGP BoK Domains III/VI plus ISO/IEC 42001 Clause 5 — governance is a named function with authority, not a waiver form.',
          how: 'Create the governance spine. (1) AI governance policy — scope, principles drawn from your ethics statement, roles, escalation path. (2) RACI/ownership matrix — an accountable AI lead, product managers as system owners, an engineering lead for model operations, legal/DPO for regulatory and privacy, HR for people risk, compliance/risk for third parties and audit. (3) An AI steering/oversight body that meets monthly and can gate deployments. (4) An intake and gating process — every new AI system (including vendor APIs) enters through the register and gets a risk-triage release gate; high-consequence work cannot ship without sign-off. (5) An AI incident path for failures (hallucination, bias, manipulation) that maps into your existing incident-response and breach-notification processes. Document authority, cadence, and how the gate overrides a team that wants to ship.',
          check: 'AI governance policy approved by management; RACI matrix assigns an accountable lead plus system owners, DPO, engineering, and HR roles; steering body meets monthly with minutes; an intake gate blocks high-consequence AI without evidence; AI incidents route through the incident process; the spine is documented in the GRC system.',
        },
        {
          title: 'Apply the NIST AI RMF (Govern – Map – Measure – Manage) as the operating system',
          control: 'NIST AI RMF 1.0 (January 2023) — the four functions Govern, Map, Measure, Manage, the RMF playbook, and RMF Profiles for tailoring.',
          how: 'Run the four functions for a flagship high-consequence system. Govern — document values, risk appetite, roles, and that the policy exists. Map — capture the AI lifecycle context (data, model, deployment), who and what is impacted (users, society, environment), applicable law, and third-party dependencies. Measure — define metrics for bias, robustness, drift, and accuracy, plus the seriousness of any harm. Manage — prioritize, respond, recover, and communicate, then iterate. Define risk appetite explicitly: publish what counts as high-consequence (irreversible, large-scale, protected-group effect, or legal effect) and the stop-deploy criteria. Write a short RMF Profile (goals, risks, minimum controls per tier) and cross-map it to your existing security controls (access, logging, change) instead of duplicating them.',
          check: 'An RMF walkthrough is documented for the flagship system covering all four functions; risk appetite and stop-deploy criteria published; an RMF Profile (goals/risks/controls) exists cross-mapped to existing security controls; the Measure step includes at least one bias and one robustness metric.',
        },
        {
          title: 'Align governance with ISO/IEC 42001 (AI management system)',
          control: 'ISO/IEC 42001:2023 — the certifiable AI management system (AIMS) standard. Annex A adds AI-specific controls: A.11 transparency, A.12/A.13 human oversight and decision-making, A.14 bias assessment, A.15-16 AI-system lifecycle data, A.18-19 AI-specific information security, and continual improvement.',
          how: 'Treat ISO 42001 as the "ISO 27001 of AI". Define the AIMS context (interested parties, scope of AI services), leadership responsibility, planning for AI-specific risks and opportunities (not just IT), support (competence of AI roles, awareness training), and operation (controls for data, model development, deployment, and incident response). Build an Annex A mapping: for each control, write your artifact (transparency note, human-oversight procedure, bias assessment, AI impact assessment, AI-system lifecycle data policy, continual-improvement procedure). Reuse ISO 27001/ISMS artifacts wherever a control overlaps (incident response, supplier management) and add only the AI-specific delta. If you plan to certify, run a clause-by-clause gap assessment first.',
          check: 'AIMS framework scoped with context and leadership documented; Annex A control list mapped to artifacts or "deliberately not applicable" with rationale; AI-specific deltas identified against the existing ISMS; a gap assessment against ISO 42001 clauses produced a remediation backlog.',
        },
        {
          title: 'Run AI risk assessments covering bias, privacy, security, IP, and autonomy',
          control: 'AIGP risk taxonomy beyond IT risk: bias/fairness, privacy (training and prompt data), security (model theft, prompt injection, data poisoning), IP/copyright (training data, generated code), autonomy/self-execution, safety and misuse, and societal/environmental impact — documented via an AI impact assessment and the risk register.',
          how: 'Run one end-to-end AI impact assessment on a flagship system. (1) Bias and fairness — data-level (under-representation, label bias), model-level (disparate impact), deployment-level (context changes fairness). (2) Privacy — is training data PII, is inference data PII, and does this link to the DPIA? (3) Security — model inversion/extraction, prompt injection, data poisoning, jailbreaks. (4) IP — training-data provenance risk (can a copyright or GDPR claim stick to the model?), verbatim-recall risk, and license contamination from code assistants. (5) Autonomy — what the model can do on its own (tool calls, writes, outbound messages) and the blast radius of a wrong autonomous action. (6) Societal/environmental — compute footprint, labor impact, accessibility. For each risk: likelihood, severity using a controlled/influences/informs-vs-directs scale, treatment (avoid/mitigate/transfer/accept), and owner. Feed results into the RMF Manage step and the risk register.',
          check: 'One full AI impact assessment completed covering the risk families with scores, treatment, and owners; the assessment links to the DPIA and RMF Manage; high/very-high risks carry explicit owner sign-off and a scheduled re-assessment date.',
        },
        {
          title: 'Manage third-party AI and foundation models (vendor TPRM extension)',
          control: 'ISO 42001 Annex A supplier controls; EU AI Act GPAI flow-down and deployer duties; GDPR Art. 28 DPA for prompt data; vendor-risk extension built on SOC 2 / ISO as the security baseline plus AI-specific due diligence.',
          how: 'Extend the vendor-risk framework with an AI tier. For each AI vendor: (1) inventory the product, model(s), and what data flows to them (prompts, fine-tuning data, outputs). (2) Classify by EU AI Act role — if you are the deployer you owe deployer duties even when the vendor is the provider; check the vendor GPAI transparency documentation and register status. (3) Contract — DPA with sub-processor list and purpose limits for prompt data, data-retention and deletion, output-use license rights, model-version notice duties, audit rights, and an incident-notification SLA. (4) Security — reuse the questionnaire plus AI-specific questions (red-teaming cadence, MFA on accounts, tenant-data isolation, prompt-injection protections, model-card attestation). (5) Monitor — vendor model changes, security incidents, and compliance attestations on a cadence; foundation-model vendor SOC 2/ISO reports support your own conformity reasoning.',
          check: 'AI vendor tiering matrix inventoried and classified provider/deployer; executed DPAs with purpose limits and sub-processor lists for every vendor receiving prompt data; AI-specific due-diligence questionnaires archived; a monitoring cadence set for model-version and attestation changes; the procurement gate updated so new AI vendors cannot bypass the process.',
        },
      ],
    },
    {
      week: 3,
      title: 'Verifier: Model Validation, Bias Testing & Conformity',
      days: 'Days 15-21',
      description: 'Prove it — measure bias with the right metrics, produce transparency artifacts an auditor can read, run conformity assessments and technical documentation, red-team the model, and watch for drift in production.',
      tasks: [
        {
          title: 'Design and run bias & fairness testing on the flagship model',
          control: 'Fairness metrics and tests: statistical/demographic parity, equalized odds, calibration, the 4/5ths (80%) rule, disaggregated performance, differential testing across protected cohorts. AIGP BoK Domain III (bias and fairness).',
          how: 'Choose the fairness definition that matches the product promise (equal outcomes vs equal quality), then measure it on the deployed model scoring. Run: (1) the 4/5ths rule on selection rates if the model screens people (hiring, credit-like), (2) equalized-odds analysis (false-positive/negative parity) for classification/risk systems, (3) calibration-per-cohort checks when scores feed thresholds, (4) disaggregated performance (accuracy by cohort) to surface silent under-serves, (5) differential attribution (SHAP/LIME summaries) to find proxy features. Define pass/fail bands per metric tied to the impact assessment; document the test plan, dataset versions, and results. If a test fails, treat it as a finding with an owner and a mitigation (thresholds, feature removal, re-balancing, human-override band).',
          check: 'Bias test plan with chosen fairness definitions and pass/fail bands is documented; tests run across protected cohorts with results; any failing metric became a tracked finding with a mitigation owner; the artifacts are versioned and reproducible.',
        },
        {
          title: 'Produce transparency artifacts: model cards, data sheets, and system documentation',
          control: 'AIGP explainability and transparency practice; EU AI Act Art. 13 transparency plus GPAI model cards under Art. 53; community practice (Google model cards, datasheets for datasets, HuggingFace model cards as the de-facto format).',
          how: 'Create a model card per production model: intended use, out-of-scope uses, model and version, training-data summary, evaluation results per cohort, known limitations and edge cases, bias-mitigation status, human-oversight guidance, and a vulnerability/contact process. Create a data sheet per dataset: collection method, consent/authorization basis, population and gaps, privacy and provenance notes, retention/deletion, labeling QA. Write one technical/system documentation block per high-consequence model in the AIGP white-box style: architecture, training recipe, data lineage, evaluation, monitoring plan, and residual risks — this doubles as the skeleton for the EU AI Act Annex IV technical documentation. Store everything beside the model registry so a regulator or customer audit finds coherent, current artifacts, and version them with every retrain.',
          check: 'A model card exists per production model with limitations; a data sheet exists for each core training/evaluation dataset with provenance and consent; one Annex IV-style technical documentation skeleton is drafted for a high-consequence system; artifacts are stored with the model registry and versioned on retrain.',
        },
        {
          title: 'Run a conformity assessment and build the technical documentation dossier',
          control: 'EU AI Act Arts. 43-49 — internal conformity assessment for most high-risk systems backed by Annex VI requirements and Annex IV technical documentation; the third-party route applies to biometric-identification exceptions (Annex V); CE marking and EU database registration (Art. 49); keep the artifacts for 10 years from placing into service.',
          how: 'Do the conformity walk on your chosen high-risk system. (1) Determine the route: internal self-assessment (standard high-risk) vs third-party conformity (biometric exceptions). (2) Assemble the dossier: risk-management evidence (Art. 9), data-governance documentation (Art. 10), technical documentation (Art. 11/Annex IV: general description, development design data, the monitoring and post-market plan, residual-risks information, intended purpose), log-keeping design (Art. 12), transparency instructions (Art. 13), human-oversight measures (Art. 14), and accuracy/robustness/cybersecurity evidence (Art. 15). (3) Have the operator/legal team issue the EU declaration of conformity and affix the CE mark, then complete EU database registration before placing into service (Art. 49). (4) Put monitoring in the operations plan: post-market monitoring (Art. 72) and serious-incident reporting (Art. 73). Preserve the artifacts for 10 years. Note: deployers do not self-assess, but they must demonstrate deployment-side controls — human oversight, logging, instructions — that the AIGP playbook is built to provide.',
          check: 'Conformity route determined (internal vs third-party); the Annex IV-style technical documentation dossier is assembled with evidence covering Arts. 9-15; declaration of conformity drafted and the CE-mark process mapped for market placement; EU database registration planned; 10-year retention scheduled; post-market monitoring and incident reporting assigned.',
        },
        {
          title: 'Independent validation, red-teaming, and auditor-ready evidence',
          control: 'Model-validation discipline (development, independent validation, deployment, monitoring — banking-inspired), adversarial red-teaming for LLMs (prompt injection, jailbreaks, data poisoning, deepfake/impersonation), and audit-readiness of evidence.',
          how: 'Run a validation cycle: have an independent party (a different engineer or a copy of the pipeline) reproduce the evaluation results — a champion-challenger check against the baseline the product is replacing. Then red-team the deployed assistant/system: (1) prompt injection via user content and retrieved documents, (2) jailbreak attempts and refusal bypass, (3) attempts to extract the system prompt, PII, or training data, (4) tool-action abuse (can it send the email, transfer the file, delete the record?), (5) impersonation and social-engineering defenses if it contacts users. Log all red-team findings with severity into the incident process — not a side file. Finally curate the auditor package: model card, data sheets, validation report, red-team log, bias-test results, human-oversight configuration, and monitoring evidence — customers, insurers, and regulators now ask for exactly this.',
          check: 'Independent validation reproduced the evaluation results with a champion-challenger comparison; a red-team run produced a severity-ranked finding log routed into the incident process; the auditor evidence package is assembled and versioned with an owner per unit of evidence.',
        },
        {
          title: 'Post-deployment monitoring: drift, hallucination, bias decay, and incident logging',
          control: 'AIGP operational-monitoring practice; EU AI Act Art. 72 post-market monitoring and Art. 73 serious-incident reporting; drift-detection and alerting discipline.',
          how: 'Instrument every high-consequence model in production. (1) Data drift — distribution shift in inputs (PSI/KS against a baseline). (2) Concept drift — degradation of target behavior over time. (3) Performance — live accuracy where ground truth exists. (4) Bias decay — re-run disaggregated metrics on a cadence and alert on threshold crossing. (5) Hallucination/refusal rates for generative systems (answer-quality signals: refusal rate, retrieval confidence, generation-length anomalies). (6) Safety telemetry — jailbreak/prompt-injection encounters, toxicity flag rate, abuse reports. Log the model version, inputs, and decision for every consequential output so an incident is reconstructable (ties back to Art. 12 log-keeping). Route drift/bias/safety alarms into incident response, and define the "pull the model" criteria in advance so an operator can kill a bad release without waiting for a meeting.',
          check: 'Monitoring metrics defined for data/concept drift, performance, bias decay, and hallucination/refusal signals; alarms wired to the incident process with an on-call owner; "pull the model" criteria documented; consequential decisions logged with the model version for reconstruction; a drift (or simulated drift) event was exercised end to end.',
        },
      ],
    },
    {
      week: 4,
      title: 'Certified: Exam Strategy, Embedding Governance & Cross-Border Rollout',
      days: 'Days 22-28',
      description: 'Turn the practice into a credential — an AIGP exam plan matched to the official domains, governance embedded in the SDLC, robust human oversight for automated decisions, a cross-border rollout playbook, and a recertification plan.',
      tasks: [
        {
          title: 'Build an AIGP exam plan that mirrors the official domains',
          control: 'IAPP AIGP Body of Knowledge — Domain I AI Fundamentals (10%), Domain II Legal/Regulatory & Compliance Landscape (30%), Domain III AI Risk Management & Governance (25%), Domain IV AI and Wider Societal Implications (15%), Domain V Communication & Collaboration (10%), Domain VI AI Governance Activities: Embedding (10%). Exam: 100 scored questions in 3 hours.',
          how: 'Book the exam and build a two-week study plan mapped to the six official domains and their weights. (1) AI Fundamentals (10%) — ML types (supervised, unsupervised, reinforcement), neural networks and deep learning, LLM mechanics (tokens, attention, fine-tuning, RAG, agents), the model lifecycle. (2) Legal/Regulatory (30%) — the Reg-II playbook you built: EU AI Act, GDPR/Art. 22, US laws (Colorado, California, NYC, federal), China/India/Brazil/Canada, OECD/UNESCO. (3) AI Risk Management & Governance (25%) — NIST AI RMF, ISO 42001, risk taxonomy, model risk, bias/fairness, assurance. (4) Societal implications (15%) — principles, ethics by design, human rights, labor, the environment, disinformation. (5) Communication & Collaboration (10%) — stakeholder communication, cross-functional program management, vendor communication. (6) Embedding (10%) — the operationalization checklists you built (intake, monitoring, audit trail). Take a timed practice test at 3 hours and target weak domains. Match study hours to the exam weights so Domain II does not get starved by the interesting domains.',
          check: 'Exam booked; a timed study plan allocated by domain weight exists; a practice test taken with a score and a re-study loop on weak domains; a one-page own-language summary of each of the six domains written from memory.',
        },
        {
          title: 'Embed governance into the AI/ML development lifecycle (SDLC gates)',
          control: 'AIGP Domain VI (embedding) and ISO 42001 operation control over the model lifecycle — governance must live in the pipeline, not beside it.',
          how: 'Add AI gates to the existing SDLC/MLOps pipeline. (1) Intake and triage — every new or updated model and vendor API goes through the register and risk tier. (2) Design and data — a data sheet sign-off before training. (3) Build — CI with reproducible training, versioned artifacts, and a model manifest (an SBOM-style inventory of the model). (4) Validation — bias tests, red-team pass, and a drafted model card as pull-request gates. (5) Release — human-oversight and monitoring configuration reviewed at the deploy PR, evidence bundle attached. (6) Run — drift/bias alarms wired to on-call and the model kills-switch exercised. Automate what you can — block a high-risk deploy without the evidence bundle in CI — and make the model manifest part of the release notes. This is the difference between "a policy" and governance someone can see in the pull request.',
          check: 'AI gates added to the pipeline with the evidence bundle (data sheet, bias test, model card, oversight config) required at the release gate; an automated block fires when high-risk evidence is missing; the model manifest is part of release notes; the kills-switch was exercised in a drill.',
        },
        {
          title: 'Design human oversight and contestability for automated decisions',
          control: 'GDPR Art. 22 safeguards; EU AI Act Art. 14 human oversight; Colorado AI Act human-oversight duties; AIGP Domains III/VI — meaningful human review that is genuinely effective, not a rubber stamp.',
          how: 'For every automated-decision system, design oversight that is real. (1) Define meaningful review: the reviewer can see the inputs, the model output, the explanations (feature attributions), and the decision context, and has authority to override; document review depth so it is not a two-second click. (2) Set review thresholds — high-impact decisions (declines, denied benefits, investigation flags) are always reviewed before action leaves the building unless automated speed is the only practical path and risk is calibrated. (3) Build the contest path — individuals can get an explanation (how the decision was made and the logic involved), request human intervention, and express their view; wire this into the existing DSAR/explanation workflow with a target SLA. (4) Log overrides and rationale both as fairness evidence and as model feedback. (5) Train the reviewers and rotate/review them so oversight does not ossify. Validate the design with a tabletop of a contested decision.',
          check: 'Human-oversight specification defines meaningful review with authority and depth; review thresholds set per decision type; the contest path (explanation + human intervention + express view) is wired to the DSAR workflow with an SLA; overrides logged as feedback; a contested-decision tabletop was run and oversight ergonomics updated.',
        },
        {
          title: 'Write the cross-border AI rollout playbook',
          control: 'Multi-jurisdiction deployment: GDPR transfer rules, EU AI Act territorial scope (Art. 2 also reaches third-country providers/deployers who place systems into the EU market), US state triggers, China generative-AI rules, India DPDPA, data residency. AIGP comparative-law skill.',
          how: 'Produce a rollout checklist that answers, per target market: (1) Scope — does the EU AI Act reach you (placing into service or marketing in the EU, or EU-user impact)? Which US state triggers apply (decision-based vs model-capability-based)? Does China generative-AI registration apply to anything you deploy there? (2) Data — GDPR transfer mechanism for inputs/prompts (adequacy or SCCs), PII minimization, data-residency requirements. (3) Transparency and notice — Art. 50/13 text in local languages. (4) Human oversight and contestability — positioned and trained locally. (5) Registration and conformity — EU AI Act database, local registrations. (6) Incident and breach — who to notify within 72h (EU) or within the timeline your other obligations set (India), and what AI incidents trigger Art. 73 vs GDPR Art. 33. (7) Support — local contacts and complaint channels. Keep a status column per market (in force / phased / advisory) and a named market lead. Validate with two ordering scenarios: a US launch and an EU launch.',
          check: 'A cross-border rollout checklist exists covering scope, data/transfers, transparency, oversight, registration, incident notification, and support per market; EU AI Act territorial reach assessed for your product; a GDPR transfer mechanism chosen for prompt data; two market launch scenarios validated with a named lead each.',
        },
        {
          title: 'Build the continuous-improvement and recertification loop (20 CPE / 2 years)',
          control: 'AIGP credential maintenance — 20 CPEs every two years (at least 8 in privacy, mirroring IAPP privacy-CPE practice) — plus the governance practice of closing the loop on incidents, audits, and regulatory change.',
          how: 'Close the loop on everything you built. (1) Incidents and audit findings flow into the risk register and then into control changes (ISO 42001 Clause 10 corrective action). (2) Run a regulatory-change watch — EU AI Act implementing acts and guidance, US state laws, enforcement actions, OECD updates — summarized quarterly into the global map. (3) Review the red-team findings and "pull the model" criteria after every incident. (4) Continuous training — run the bias and transparency awareness deck for product and engineering annually. (5) CPE plan — log 20 CPEs per two-year cycle with at least 8 in privacy; track conferences (IAPP AI Governance Conference, Global Privacy Summit), publications, and your own internal programs; enter them into the IAPP certification portal and mark the renewal date. Present a "year in AI governance" summary to the steering body showing what changed and what improved.',
          check: 'A closed loop from findings/incidents into control changes is demonstrated with at least one issue fully cycled; the regulatory-change watch produced a quarterly update; the awareness training ran; a CPE plan with at least 8 privacy credits is logged with the renewal date in the IAPP portal; a year-in-review deck exists for the steering body.',
        },
      ],
    },
  ],
  milestones: [
    { day: 7, label: 'Landscape & Risk Mapping', color: 'purple' },
    { day: 14, label: 'Governance Program Live', color: 'blue' },
    { day: 21, label: 'Validation & Conformity', color: 'green' },
  ],
};

export default function Aigp() {
  return (
    <>
      <LearningFrameworkPage framework={FRAMEWORK} />
      <AigpUseCases />
    </>
  );
}

export { FRAMEWORK };