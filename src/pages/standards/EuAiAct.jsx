import LearningFrameworkPage from "../../components/LearningFrameworkPage.jsx";
import EuAiActOverview from "../../components/EuAiActOverview.jsx";

const FRAMEWORK = {
  id: "eu-ai-act",
  name: "EU AI Act (Regulation (EU) 2024/1689)",
  color: "purple",
  region: "European Union",
  flag: "🇪🇺",
  flagAnimation: "pulse",
  basePath: "/eu-ai-act",
  referenceUrl: "https://eur-lex.europa.eu/eli/reg/2024/1689/oj",
  extraSections: [<EuAiActOverview key="eu-ai-act-overview" />],
  milestones: [
    { day: 7, label: "AI Inventory, Roles & Prohibited Use Check" },
    { day: 14, label: "Risk Classification & Transparency" },
    { day: 21, label: "High-Risk Controls Design" },
    { day: 28, label: "Conformity, Monitoring & Governance" },
  ],
  startupGaps: [
    {
      itgc: "General / Cross-Cutting",
      gap: "No inventory of AI systems or of the company's role for each",
      pushback: "We just call an AI API, the EU AI Act is for the big model labs.",
      reality: "Obligations follow your role and the use case, not the size of your model. Building on an API usually makes you a deployer or downstream provider, and using AI for hiring, credit or education can make the system high risk.",
      policy: "AI Governance Policy, AI System Inventory Standard",
      compensating: ["Vendor and SaaS inventory already lists AI tools", "Product specs describe where AI is used"],
      leantip: "List every AI system with owner, purpose, users affected, your role (provider or deployer) and a first risk level. One sheet is enough to start.",
    },
    {
      itgc: "Program / System Development",
      gap: "Chatbot or generated content shipped without AI disclosure",
      pushback: "Users obviously know it's a bot.",
      reality: "Article 50 transparency duties have applied since 2 August 2026. Unless it is obvious from context, people must be told they are interacting with AI, and generated content must be marked as such.",
      policy: "AI Transparency Standard, Product Release Checklist",
      compensating: ["Terms of service mention AI features", "Support team can explain AI use on request"],
      leantip: "Add a one-line disclosure at the start of every AI conversation and enable the model provider's watermarking or metadata options.",
    },
    {
      itgc: "Data Privacy / Governance",
      gap: "High-risk use case planned with no bias testing or human oversight design",
      pushback: "The high-risk deadline moved to December 2027, so there is time.",
      reality: "The omnibus delayed Annex III obligations to 2 December 2027, but risk management, data governance and documentation take many months to build, and enterprise customers already ask for them in due diligence.",
      policy: "AI Risk Management Procedure, Data Governance for AI Standard",
      compensating: ["GDPR DPIA already covers some risks", "Manual review of a sample of AI outputs"],
      leantip: "Start the technical documentation and bias testing now on the current model, and reuse your GDPR DPIA as the starting point for the AI risk assessment.",
    },
  ],
  weeks: [
    {
      week: 1,
      title: "L1 Foundation: Inventory, Roles and Prohibited Practices",
      days: "Days 1-7",
      description: "Find every AI system, decide your role for each, and confirm nothing falls into a prohibited practice.",
      tasks: [
        {
          title: "Build the AI system inventory",
          control: "EU AI Act Art. 3 (definitions), Art. 4 (AI literacy)",
          how: "List in-house models, AI features in your product, AI tools used internally, and third-party AI services. For each record the owner, purpose, people affected, data used, model provider and where its output is used. Include AI used in HR, finance and customer decisions, not just product features.",
          check: "Inventory covers product, internal and third-party AI, each with a named owner and purpose, reviewed by legal or compliance."
        },
        {
          title: "Decide your role for each system",
          control: "EU AI Act Art. 3(3) to 3(8), Art. 25",
          how: "Mark each system as provider, deployer, importer or distributor. Check whether rebranding, substantial modification or a change of purpose would make you a provider of a high-risk system under Art. 25. Note whether a non-EU provider needs an EU authorised representative.",
          check: "Every inventory entry has a role, with reasoning recorded for any provider determination."
        },
        {
          title: "Screen for prohibited practices",
          control: "EU AI Act Art. 5",
          how: "Check each system against the prohibited list: manipulation, exploiting vulnerabilities, social scoring, crime prediction from profiling, facial image scraping, emotion recognition at work or school, sensitive biometric categorisation, real-time remote biometric identification, and the omnibus ban on generating non-consensual intimate imagery or CSAM. Stop any match immediately.",
          check: "Signed prohibited-practice screening for every system, with no open matches."
        },
        {
          title: "Launch AI literacy",
          control: "EU AI Act Art. 4 (as amended by the omnibus)",
          how: "Give staff who build, buy, configure or supervise AI role-appropriate training: what the system does, its limits, known risks, when to escalate. Keep attendance records.",
          check: "Training material by role, completion records, and a refresh schedule."
        }
      ]
    },
    {
      week: 2,
      title: "L2 Implementer: Risk Classification and Transparency",
      days: "Days 8-14",
      description: "Classify every system by risk level and put transparency duties in place.",
      tasks: [
        {
          title: "Classify high-risk systems",
          control: "EU AI Act Art. 6, Annex I, Annex III",
          how: "Check each system against Annex I (safety components of regulated products) and the Annex III areas: biometrics, critical infrastructure, education, employment, essential services, law enforcement, migration and justice. Where you rely on the Art. 6(3) exemption, document why there is no significant risk; remember profiling of people is always high risk.",
          check: "Classification with rationale for every system; Art. 6(3) assessments documented."
        },
        {
          title: "Meet Article 50 transparency duties",
          control: "EU AI Act Art. 50",
          how: "Disclose AI interaction in chatbots and voice agents, mark generated content in a machine-readable way, label deepfakes, and inform people exposed to emotion recognition or biometric categorisation. Systems placed on the market before 2 Aug 2026 had until 2 Dec 2026 for watermarking.",
          check: "Disclosure text live in each interface, watermarking or metadata enabled, evidence screenshots retained."
        },
        {
          title: "Assess GPAI dependencies",
          control: "EU AI Act Art. 53 to 55",
          how: "For each general-purpose model you use, collect the provider's documentation for downstream providers, its copyright policy and training content summary, and whether it signed the GPAI Code of Practice. If you train or substantially modify a GPAI model, check whether you become a GPAI provider.",
          check: "GPAI supplier file per model with documentation and contract terms on data use and incidents."
        }
      ]
    },
    {
      week: 3,
      title: "L3 Implementer: High-Risk Controls",
      days: "Days 15-21",
      description: "Design the controls high-risk systems need before 2 December 2027 (Annex III) or 2 August 2028 (Annex I).",
      tasks: [
        {
          title: "Risk management and data governance",
          control: "EU AI Act Art. 9 and 10",
          how: "Set up a lifecycle risk management process covering foreseeable misuse. For training, validation and test data, document provenance, relevance, representativeness and bias examination. Record mitigations and residual risks.",
          check: "Risk register per high-risk system, data sheets for each dataset, bias test results."
        },
        {
          title: "Documentation, logging and human oversight",
          control: "EU AI Act Art. 11 to 14",
          how: "Prepare Annex IV technical documentation, enable automatic event logging, write instructions for use for deployers, and design human oversight so operators can understand, override or stop the system.",
          check: "Technical file complete, logs retained, oversight procedures tested with operators."
        },
        {
          title: "Accuracy, robustness and cybersecurity",
          control: "EU AI Act Art. 15",
          how: "Define accuracy metrics and declare them, test robustness against errors and adversarial inputs (data poisoning, evasion, prompt injection), and apply security controls to models, data and pipelines. ISO/IEC 27090 and ISO 27001 controls help here.",
          check: "Declared metrics, robustness and security test reports, fixes tracked."
        },
        {
          title: "Deployer duties and fundamental rights impact assessment",
          control: "EU AI Act Art. 26 and 27",
          how: "If you deploy high-risk AI: use it per instructions, assign trained oversight staff, check input data, keep logs for at least six months, inform workers before workplace use, and complete a fundamental rights impact assessment where required (public bodies, credit scoring, life and health insurance pricing).",
          check: "Deployer procedures in place, FRIA completed where required, worker notices issued."
        }
      ]
    },
    {
      week: 4,
      title: "L4 Readiness: Conformity, Monitoring and Governance",
      days: "Days 22-28",
      description: "Prepare conformity assessment, post-market monitoring and an AI governance structure that keeps it all current.",
      tasks: [
        {
          title: "Quality management and conformity assessment",
          control: "EU AI Act Art. 17, 43, 47 to 49",
          how: "Set up a quality management system for high-risk systems, choose the conformity assessment route (internal control or notified body), prepare the EU declaration of conformity and CE marking, and plan registration in the EU database.",
          check: "QMS documented, conformity route decided, registration plan with dates."
        },
        {
          title: "Post-market monitoring and serious incidents",
          control: "EU AI Act Art. 72 and 73",
          how: "Collect performance data after release, define what counts as a serious incident, and set reporting timelines: generally within 15 days of becoming aware, and much faster for widespread incidents, critical infrastructure or deaths.",
          check: "Monitoring plan, incident definitions and an escalation runbook tested in a tabletop exercise."
        },
        {
          title: "AI governance and integration with other frameworks",
          control: "EU AI Act overall | ISO/IEC 42001 | GDPR",
          how: "Name an accountable AI lead and committee, link AI risk to the enterprise risk register, align with GDPR DPIAs and Art. 22, and use ISO/IEC 42001 as the management system to keep inventory, risk, controls and reviews current.",
          check: "Governance charter approved, joint AI and privacy assessment process, annual review scheduled."
        }
      ]
    }
  ]
};

export default function EuAiActPage() {
  return <LearningFrameworkPage framework={FRAMEWORK} />;
}

export { FRAMEWORK };
