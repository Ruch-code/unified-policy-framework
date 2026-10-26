import LearningFrameworkPage from "../../components/LearningFrameworkPage.jsx";
import { Info, ExternalLink } from "lucide-react";

const THREATS = [
  { name: "Data poisoning", desc: "Tampering with training or fine-tuning data so the model learns attacker-chosen behaviour." },
  { name: "Evasion", desc: "Crafted inputs at inference time that cause misclassification or wrong output." },
  { name: "Membership inference", desc: "Working out whether a specific record was part of the training data." },
  { name: "Model exfiltration", desc: "Stealing model weights or replicating a model through repeated queries." },
  { name: "Model inversion", desc: "Reconstructing sensitive training data from model outputs." },
  { name: "Direct model poisoning", desc: "Altering the model itself, for example its weights or a third-party model artefact." },
  { name: "Sensitive model output", desc: "The model revealing confidential, personal or restricted information." },
  { name: "Prompt injection", desc: "Instructions hidden in user input or retrieved content that override intended behaviour." },
  { name: "Output containing injection attacks", desc: "Model output that carries an attack into a downstream system, such as code, queries or markup." },
];

function Iso27090Overview() {
  return (
    <div className="bg-white rounded-2xl border border-violet-200 dark:border-violet-800 p-6 mb-8">
      <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-2 flex items-center gap-2">
        <span className="w-8 h-8 rounded-lg bg-violet-100 text-violet-700 dark:bg-violet-900/40 dark:text-violet-300 flex items-center justify-center"><Info className="w-4 h-4" /></span>
        About ISO/IEC 27090:2026
      </h2>
      <p className="text-gray-600 text-sm mb-4 max-w-3xl">
        Full title: <strong>Cybersecurity, Artificial intelligence (AI), Addressing security threats and compromises to AI systems.</strong> First edition, published October 2026 by ISO/IEC JTC 1/SC 27 (56 pages). It applies to any organization that develops or uses AI systems.
      </p>
      <div className="grid md:grid-cols-3 gap-3 mb-5">
        <div className="rounded-xl p-3 bg-amber-50 border border-amber-200 dark:bg-amber-900/30 dark:border-amber-800">
          <p className="text-xs font-bold uppercase tracking-wide text-amber-800 dark:text-amber-300">Guidance, not certifiable</p>
          <p className="text-sm text-gray-700 dark:text-slate-200 mt-1">There is no certificate against ISO 27090. Use it as a control source inside an ISO 27001 ISMS or an ISO 42001 AIMS.</p>
        </div>
        <div className="rounded-xl p-3 bg-blue-50 border border-blue-200 dark:bg-blue-900/30 dark:border-blue-800">
          <p className="text-xs font-bold uppercase tracking-wide text-blue-800 dark:text-blue-300">With ISO 27001</p>
          <p className="text-sm text-gray-700 dark:text-slate-200 mt-1">Clause 6.1.3 lets you take controls from any source, so 27090 mitigations can be cited in your Statement of Applicability.</p>
        </div>
        <div className="rounded-xl p-3 bg-emerald-50 border border-emerald-200 dark:bg-emerald-900/30 dark:border-emerald-800">
          <p className="text-xs font-bold uppercase tracking-wide text-emerald-800 dark:text-emerald-300">With ISO 42001</p>
          <p className="text-sm text-gray-700 dark:text-slate-200 mt-1">42001 governs how AI is managed. 27090 covers whether the AI system resists attack. A 42001 certificate alone does not show that.</p>
        </div>
      </div>
      <h3 className="font-bold text-gray-900 dark:text-white text-sm mb-2">Structure</h3>
      <ul className="text-sm text-gray-700 dark:text-slate-200 space-y-1 mb-5 list-disc pl-5">
        <li><strong>Clause 5:</strong> applying information security to AI (governance, zero trust, software engineering, supply chain, threat modelling, red teaming).</li>
        <li><strong>Clause 6:</strong> types of compromise to AI systems (the nine threats below).</li>
        <li><strong>Clause 7:</strong> mitigations and how they interact with threats and with each other (for example logging and monitoring, development environment protection, malicious input detection, throttling).</li>
        <li><strong>Annex A</strong> maps attacks to the AI life cycle and assets, <strong>Annex B</strong> covers AI-specific versions of conventional attacks, and <strong>Annex C</strong> covers federated machine learning. All annexes are informative.</li>
      </ul>
      <h3 className="font-bold text-gray-900 dark:text-white text-sm mb-2">The nine threat types in Clause 6</h3>
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-2">
        {THREATS.map((t, i) => (
          <div key={t.name} className="rounded-lg p-3 border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/60">
            <p className="text-sm font-semibold text-gray-900 dark:text-white">{i + 1}. {t.name}</p>
            <p className="text-xs text-gray-600 dark:text-slate-300 mt-1">{t.desc}</p>
          </div>
        ))}
      </div>
      <p className="text-xs text-gray-500 dark:text-slate-400 mt-4">
        The ISO 27001 Annex A references on this page are a suggested mapping for implementation, not text from either standard.{" "}
        <a href="https://www.iso.org/search.html?q=ISO%2FIEC%2027090" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 font-semibold text-violet-700 dark:text-violet-300 hover:underline">
          Find the standard on iso.org <ExternalLink className="w-3 h-3" />
        </a>
      </p>
    </div>
  );
}

const FRAMEWORK = {
  id: "iso-27090",
  name: "ISO/IEC 27090:2026 AI Security Threats & Compromises",
  color: "purple",
  region: "Global",
  flag: "🛡️",
  flagAnimation: "float",
  basePath: "/iso/27090",
  referenceUrl: "https://www.iso.org/search.html?q=ISO%2FIEC%2027090",
  extraSections: [<Iso27090Overview key="iso27090-overview" />],
  milestones: [
    { day: 7, label: "AI Asset Inventory & Threat Model" },
    { day: 14, label: "Secure AI Development & Supply Chain" },
    { day: 21, label: "Runtime Defences & Monitoring" },
    { day: 28, label: "Red Teaming, SoA & Continuous Assurance" },
  ],
  startupGaps: [
    {
      itgc: "Program / System Development",
      gap: "LLM features shipped with no prompt injection testing",
      pushback: "The model provider handles safety, so we don't need to test it ourselves.",
      reality: "Provider safety filters do not know your system prompt, tools or data. Prompt injection and output carrying injection attacks are threat types ISO 27090 names directly, and they target your integration, not the base model.",
      policy: "Secure Development Policy, AI System Lifecycle Policy, Security Testing Standard",
      compensating: [
        "Model provider content filters and abuse monitoring",
        "Least-privilege API keys limit what a hijacked prompt can reach",
        "Existing web application security testing covers the surrounding app",
      ],
      leantip: "Add a small prompt injection test set (direct and indirect, through retrieved documents) to CI and run it before each release. Treat model output as untrusted input everywhere downstream.",
    },
    {
      itgc: "Access Management",
      gap: "AI agents and tools run with broad service credentials",
      pushback: "The agent needs access to everything to be useful.",
      reality: "If an agent can be steered by injected instructions, its permissions become the attacker's permissions. Least privilege and human approval for high-impact actions are the main limits on damage.",
      policy: "Access Control Policy, AI Acceptable Use Policy",
      compensating: [
        "Read-only scopes already used for most integrations",
        "Audit logs exist for the underlying SaaS and cloud APIs",
      ],
      leantip: "Give each agent its own identity with the narrowest scope, and require a human confirmation step for sends, deletes, payments and permission changes.",
    },
    {
      itgc: "Program / System Development",
      gap: "Open-source models and datasets pulled without provenance checks",
      pushback: "It's on a popular model hub with thousands of downloads, so it must be safe.",
      reality: "Third-party model artefacts and datasets are a route for direct model poisoning and data poisoning. Popularity is not provenance.",
      policy: "Supplier Security Policy, AI Supply Chain Standard, Information Asset Management Policy",
      compensating: [
        "Dependency scanning already runs on application code",
        "Models are pinned to specific versions in deployment config",
      ],
      leantip: "Keep an AI bill of materials (base model, version, source, hash, training or fine-tuning data source). Prefer safe serialisation formats and scan model files before use.",
    },
    {
      itgc: "IT Operations",
      gap: "No logging or rate limiting on model endpoints",
      pushback: "Logging prompts is a privacy risk, and rate limits hurt the user experience.",
      reality: "Without logs you cannot detect or investigate extraction, evasion or injection attempts. Throttling is one of the mitigations ISO 27090 Clause 7 discusses for query-based attacks such as model exfiltration.",
      policy: "Logging & Monitoring Policy, Privacy Policy, Incident Response Plan",
      compensating: [
        "API gateway already records request metadata",
        "Cloud provider abuse detection is enabled",
      ],
      leantip: "Log metadata by default and full prompts only where justified, with redaction and short retention. Set per-user and per-key rate limits and alert on unusual query volumes.",
    },
    {
      itgc: "Data Privacy / Governance",
      gap: "Training and RAG data may expose personal or confidential information",
      pushback: "The model doesn't store data, it just learns patterns.",
      reality: "Membership inference, model inversion and sensitive model output are recognised ways that training or retrieval data leaks back out. Retrieval systems can also return documents a user should not see.",
      policy: "Data Classification Policy, Privacy Policy, AI Data Governance Standard",
      compensating: [
        "Data classification labels already exist for source systems",
        "Production data access is restricted to named roles",
      ],
      leantip: "Minimise and de-identify data before training, enforce the user's own access rights in retrieval, and add output filtering for personal and secret data.",
    },
  ],
  weeks: [
    {
      week: 1,
      title: "L1 Foundation: AI Assets, Scope & Threat Modelling",
      days: "Days 1-7",
      description:
        "Understand what ISO 27090 covers, inventory AI systems and assets, and build a threat model for each AI system using the Clause 6 threat types.",
      tasks: [
        {
          title: "Inventory AI Systems & AI-Specific Assets",
          control: "ISO/IEC 27090 Clause 5 (governance) | suggested ISO 27001 A.5.9 Inventory of information and other associated assets",
          how: "List every AI system you build or use: in-house models, fine-tuned models, third-party APIs, agents and RAG pipelines. For each, record the assets ISO 27090 cares about: training and fine-tuning data, model weights and artefacts, prompts and system prompts, retrieval indexes, inference endpoints, tools the AI can call, and output consumers. Name an owner for each system.",
          check: "AI inventory covers all AI systems in scope with owner, data sources, model source, deployment location and downstream consumers recorded."
        },
        {
          title: "Map Threats to the AI Life Cycle",
          control: "ISO/IEC 27090 Clause 6 and Annex A (attacks mapped to life cycle and assets)",
          how: "For each AI system, walk through the life cycle (data collection, training, evaluation, deployment, operation, retirement) and record which of the nine Clause 6 threat types apply and where: data poisoning, evasion, membership inference, model exfiltration, model inversion, direct model poisoning, sensitive model output, prompt injection, and output containing injection attacks.",
          check: "Each AI system has a threat map showing applicable threat types by life cycle stage and asset, with non-applicable threats justified."
        },
        {
          title: "Build an AI Threat Model",
          control: "ISO/IEC 27090 Clause 5 (threat modelling) | suggested ISO 27001 A.5.7 Threat intelligence",
          how: "Run a threat modelling session per high-impact AI system. Draw the data flow including trust boundaries around user input, retrieved content, tools and downstream systems. Use AI-focused references such as MITRE ATLAS and the OWASP Top 10 for LLM Applications alongside ISO 27090 to identify attack paths. Rate likelihood and impact using your existing risk method.",
          check: "Threat models exist for all high-impact AI systems, reviewed by security and the system owner, with risks entered in the risk register."
        },
        {
          title: "Decide How ISO 27090 Fits Your Management System",
          control: "ISO/IEC 27001 Clause 6.1.3 | ISO/IEC 42001 Clause 6.1",
          how: "ISO 27090 is guidance and is not certifiable. Decide whether its mitigations will sit in your ISO 27001 ISMS (as an additional control source in risk treatment and the SoA), your ISO 42001 AIMS, or both. Record the decision, the scope of AI systems covered, and who owns AI security risk.",
          check: "A documented decision exists on where ISO 27090 controls are managed, with scope and risk ownership approved by management."
        }
      ]
    },
    {
      week: 2,
      title: "L2 Implementer: Secure AI Development & Supply Chain",
      days: "Days 8-14",
      description:
        "Apply secure engineering, zero trust and supply chain controls to AI data, models and pipelines, following the Clause 5 themes.",
      tasks: [
        {
          title: "Protect Training Data Against Poisoning",
          control: "ISO/IEC 27090 Clause 6 (data poisoning) and Clause 7 | suggested ISO 27001 A.8.25 Secure development life cycle",
          how: "Record data provenance for every training and fine-tuning dataset. Restrict who can write to training data stores. Validate incoming data for schema, distribution shifts and outliers before training. Version datasets and keep hashes so a poisoned dataset can be traced and rolled back.",
          check: "Training data sources are documented, write access is restricted, validation runs before each training job, and datasets are versioned with integrity hashes."
        },
        {
          title: "Secure the Model Supply Chain",
          control: "ISO/IEC 27090 Clause 5 (supply chain) and Clause 6 (direct model poisoning) | suggested ISO 27001 A.5.21 Managing information security in the ICT supply chain",
          how: "Maintain an AI bill of materials: base models, versions, sources, hashes, libraries and datasets. Only pull models from approved sources, verify hashes or signatures, prefer safe serialisation formats, and scan model files before use. Add AI-specific clauses to vendor contracts covering model updates, data use and incident notification.",
          check: "AI BOM is current for all production models, model sources are approved, artefacts are verified before deployment, and AI vendors have security terms in contract."
        },
        {
          title: "Protect the Development Environment",
          control: "ISO/IEC 27090 Clause 7 (development environment protection) | suggested ISO 27001 A.8.31 Separation of development, test and production environments",
          how: "Separate experimentation, training and production environments. Restrict access to model weights, notebooks and training infrastructure. Store secrets in a vault, not in notebooks. Log access to model registries and training data so tampering can be detected.",
          check: "Environments are separated, access to weights and training data is role-based and logged, and no secrets are present in notebooks or repositories."
        },
        {
          title: "Apply Zero Trust to AI Components",
          control: "ISO/IEC 27090 Clause 5 (zero trust) | suggested ISO 27001 A.8.2 Privileged access rights, A.8.3 Information access restriction",
          how: "Treat user input, retrieved documents and model output as untrusted. Give each AI agent or service its own identity with least-privilege access to tools and data. Enforce the requesting user's permissions in retrieval so the AI cannot return documents the user could not open directly. Require human approval for high-impact actions.",
          check: "Each AI component has a dedicated identity with minimal scopes, retrieval enforces user permissions, and high-impact agent actions need human confirmation."
        }
      ]
    },
    {
      week: 3,
      title: "L3 Implementer: Runtime Defences & Monitoring",
      days: "Days 15-21",
      description:
        "Implement Clause 7 mitigations at inference time: input and output controls, throttling, logging and monitoring.",
      tasks: [
        {
          title: "Detect and Handle Malicious Input",
          control: "ISO/IEC 27090 Clause 6 (prompt injection, evasion) and Clause 7 (malicious input detection)",
          how: "Separate system instructions from user and retrieved content. Add input screening for known injection patterns and out-of-distribution inputs. Keep the system prompt free of secrets, since you should assume it can be extracted. Test indirect injection through documents, emails and web pages your AI reads.",
          check: "Input screening is in place for all user-facing AI, indirect injection test cases pass, and no secrets are held in system prompts."
        },
        {
          title: "Control Model Output",
          control: "ISO/IEC 27090 Clause 6 (sensitive model output, output containing injection attacks) | suggested ISO 27001 A.8.12 Data leakage prevention",
          how: "Filter output for personal data, secrets and restricted content before it reaches users. Never pass model output directly into code execution, database queries, shell commands or HTML without validation and encoding. Treat output as untrusted input to the next system.",
          check: "Output filtering is active, all downstream uses of model output are validated or encoded, and leakage tests for sensitive data pass."
        },
        {
          title: "Throttle and Limit Queries",
          control: "ISO/IEC 27090 Clause 6 (model exfiltration, membership inference, model inversion) and Clause 7 (throttling)",
          how: "Set per-user and per-key rate limits on inference endpoints. Limit the detail returned, for example avoid exposing raw confidence scores unless needed. Alert on query patterns typical of extraction, such as high volume, systematic input sweeps or many near-duplicate queries.",
          check: "Rate limits are enforced on all model endpoints, output detail is minimised, and alerts exist for extraction-style query patterns."
        },
        {
          title: "Log and Monitor AI Systems",
          control: "ISO/IEC 27090 Clause 7 (logging and monitoring) | suggested ISO 27001 A.8.15 Logging, A.8.16 Monitoring activities",
          how: "Log AI requests, tool calls, model versions and security filter decisions, with redaction and retention set by your privacy policy. Feed AI security events into your SIEM. Monitor for drift and sudden behaviour changes that may indicate poisoning. Add AI scenarios to your incident response plan.",
          check: "AI logs reach the SIEM, detection rules exist for injection, extraction and abuse, and the incident response plan includes AI-specific playbooks."
        }
      ]
    },
    {
      week: 4,
      title: "L4 Assurance: Red Teaming, SoA & Continuous Improvement",
      days: "Days 22-28",
      description:
        "Test defences through adversarial testing, record ISO 27090 controls in your management system, and set up ongoing assurance.",
      tasks: [
        {
          title: "Run AI Red Teaming",
          control: "ISO/IEC 27090 Clause 5 (red teaming) | suggested ISO 27001 A.8.29 Security testing in development and acceptance",
          how: "Plan adversarial testing against each high-impact AI system covering the applicable Clause 6 threats: prompt injection (direct and indirect), jailbreaks, data leakage, extraction attempts and unsafe tool use. Use internal testers or a specialist firm, and keep a regression test set so fixed issues stay fixed.",
          check: "Red team exercises completed for high-impact AI systems, findings tracked to closure, and a regression suite runs before each model or prompt change."
        },
        {
          title: "Record Controls in the Statement of Applicability",
          control: "ISO/IEC 27001 Clause 6.1.3 d) | ISO/IEC 42001 Clause 6.1.3",
          how: "Add the ISO 27090 mitigations you selected to your SoA as additional controls, with justification linked to the AI threat model and risk register. Reference ISO 27090 as the source. Where an existing Annex A control already covers a mitigation, link to it rather than duplicating.",
          check: "SoA lists selected ISO 27090 mitigations with justification and implementation status, traceable to AI risks."
        },
        {
          title: "Assess AI Vendors Against ISO 27090 Threats",
          control: "ISO/IEC 27090 Clause 5 (supply chain) | suggested ISO 27001 A.5.19 Information security in supplier relationships",
          how: "Extend AI vendor due diligence with questions based on the nine threat types: how the vendor tests for prompt injection, protects against data and model poisoning, prevents training data leakage, and limits extraction. Ask whether customer data is used for training and how model changes are communicated.",
          check: "AI vendor questionnaire covers ISO 27090 threat types, and all critical AI vendors have been assessed with results recorded."
        },
        {
          title: "Set Up Continuous AI Security Assurance",
          control: "ISO/IEC 27001 Clauses 9 and 10 | ISO/IEC 42001 Clauses 9 and 10",
          how: "Re-run the threat model when a model, prompt, tool or data source changes. Track metrics such as injection test pass rate, time to fix AI findings, and number of AI systems with a current threat model. Include AI security in internal audits and management review, and monitor new attack techniques for updates to your controls.",
          check: "Change triggers for threat model review are defined, AI security metrics are reported to management, and AI security is in the internal audit programme."
        }
      ]
    },
  ],
};

export default function Iso27090Page() {
  return <LearningFrameworkPage framework={FRAMEWORK} />;
}

export { FRAMEWORK };
