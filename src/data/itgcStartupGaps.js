// Framework-specific Common Gaps & Startup Pushback (ITGC), collected for the GRC Knowledge Base.
// Copied from each framework page (startupGaps). tests/itgcStartupGaps.test.mjs fails if a page and this file drift apart.

export const FRAMEWORK_GAPS = [
  {
    "id": "aigp",
    "label": "AIGP",
    "source": "src/pages/standards/Aigp.jsx",
    "gaps": [
      {
        "itgc": "Program / System Development",
        "gap": "AI systems shipped with no inventory, model card, or data lineage",
        "pushback": "We just call an API - it's a tool, not a \"system\", and nobody has time to document it.",
        "reality": "Every AI system that touches decisions, customers, or data is now governed by laws that are in force (EU AI Act phases, Colorado AI Act, GDPR Art. 22). Shadow-AI vendors and undocumented models are exactly the gap a regulator or customer audit finds first.",
        "policy": "AI Governance & Inventory Policy, AI Development Lifecycle Policy, Data Governance / Lineage Policy, Information Asset Management Policy",
        "compensating": [
          "Central model registry and API-inventory tooling capture usage automatically",
          "CI/deploy logs show model versions and releases as an evidence trail",
          "Vendor dashboards expose which AI APIs are called and by whom"
        ],
        "leantip": "Start a lightweight AI system register today: name, owner, vendor/version, data in/out, human-oversight status. Extend the existing asset register and add an approval gate whenever a new model API is introduced."
      },
      {
        "itgc": "General / Cross-Cutting",
        "gap": "No accountable owner or budget for responsible AI",
        "pushback": "Compliance is the security team's job, and AI is the AI team's job - we don't have an AI governance person.",
        "reality": "Regulators (EU AI Act, Colorado) put duties on deployers regardless of headcount. For a startup, a part-time accountable AI lead plus a named system owner per model is enough to demonstrate the governance function exists.",
        "policy": "AI Governance Policy, AI Roles, Responsibilities & Escalation Policy, Board / Management Oversight Policy",
        "compensating": [
          "A \"security champion\"-style AI lead inside engineering",
          "Model-level owners already exist in the ML team - formalize them",
          "Steering happens in existing product and risk meetings, no new ceremony"
        ],
        "leantip": "Formally assign an accountable AI lead and one owner per high-consequence model. Fold AI oversight into the existing security-review or product-gating meeting rather than standing up new process."
      },
      {
        "itgc": "Privacy",
        "gap": "PII flows into models (training, prompts, fine-tuning) with no lineage, purpose, or minimization",
        "pushback": "The prompts we send to the LLM are just product data - everyone does this.",
        "reality": "Prompt data is personal-data processing: GDPR Art. 28 requires a DPA and sub-processor list, CCPA needs service-provider terms, and a breach-notification clock starts if it leaks. Purpose limitation is checked before lawyers even look at the AI.",
        "policy": "Data Protection & DPIA Policy, Vendor / Third-Party Data Processing Policy (DPA/BAA), Records & Retention Policy",
        "compensating": [
          "API gateways can redact or pseudo-anonymize PII before it reaches the model",
          "Local or EU-region inference options reduce transfer risk",
          "Log-based sampling reveals what is actually sent upstream"
        ],
        "leantip": "Inventory what your tools actually send to LLM vendors with a prompt-sampling campaign. Default to PII redaction at the gateway, region-stickiness, and a DPA for every AI vendor before anyone sends a prompt."
      },
      {
        "itgc": "Access Management",
        "gap": "Automated decisions run with no human oversight or override path",
        "pushback": "It's better than humans - the model is the decision. Reviewing every case defeats the point.",
        "reality": "Solely-automated decisions with legal or similarly significant effect face GDPR Art. 22 restrictions and EU AI Act Art. 14 human-oversight duties, plus contest rights in every case. \"The model decides\" is not a defensible answer to a regulator or a rejected customer.",
        "policy": "Automated Decision-Making & Human Oversight Policy, Contestability & Explanation Policy, Model Risk Management Policy",
        "compensating": [
          "Threshold-based review: high-impact cases always human-reviewed, low-impact cases auto",
          "Identity and decision logs that make any decision reconstructable",
          "A one-click override + explanation flow for the product team"
        ],
        "leantip": "Define meaningful human review: inputs, output, explanation, override authority, and a log. Apply it to high-impact decisions first and expand as volume allows. Grant contest/explanation via the existing support/DSAR workflow."
      },
      {
        "itgc": "IT Operations",
        "gap": "No post-deployment monitoring for drift, bias, or hallucinations",
        "pushback": "It passed testing - we'll notice if it breaks.",
        "reality": "Models decay silently (data drift, concept drift, bias decay) and generative systems hallucinate in production regardless of test accuracy. EU AI Act Art. 72 requires post-market monitoring and Art. 73 requires reporting serious AI incidents - no monitoring means no evidence you noticed anything.",
        "policy": "AI Monitoring & Post-Market Surveillance Policy, Incident Response & AI Incident Policy, Change & Release Management Policy",
        "compensating": [
          "Feature/log telemetry already exists in most stacks - expose drift and refusal signals from it",
          "User-reported issues and support-ticket labels act as a weak detector",
          "Scheduled re-runs of the evaluation suite flag regression"
        ],
        "leantip": "Define three cheap signals now: drift on key inputs, refusal/hallucination rate if generative, and a monthly re-run of your bias/accuracy tests. Wire them into the existing incident/on-call path and write the \"pull the model\" criteria in advance."
      }
    ]
  },
  {
    "id": "cis",
    "label": "CIS v8",
    "source": "src/pages/standards/Cis.jsx",
    "gaps": [
      {
        "itgc": "Asset Management",
        "gap": "No enterprise asset inventory - unknown devices and cloud instances exist",
        "pushback": "We know what servers we have; a spreadsheet is fine.",
        "reality": "CIS Control 1 (Inventory & Control of Enterprise Assets) requires an accurate, up-to-date inventory of all assets with network access. Without it, you can't protect what you don't know exists. Shadow IT, untracked cloud instances, and forgotten dev environments are common blind spots for startups.",
        "policy": "Asset Inventory Policy, Enterprise Asset Management Standard",
        "compensating": [
          "Deploy cloud-native asset discovery (AWS Config, Azure Resource Graph, GCP Cloud Asset Inventory, Alibaba Cloud Config) for immediate visibility",
          "Create a minimal asset register covering production environments first",
          "Automate asset discovery to prevent drift from manual tracking"
        ],
        "leantip": "Use cloud-native asset inventory tools (they're free with your cloud account) to get immediate visibility. Start with production - that's what matters most for CIS compliance."
      },
      {
        "itgc": "Data Protection",
        "gap": "No data discovery or classification - personal and sensitive data locations are unknown",
        "pushback": "We know where our data is - it's in the database.",
        "reality": "CIS Control 3 (Data Protection) requires establishing and maintaining data management processes. Data often sprawls across databases, object storage, logs, backups, SaaS tools, and developer machines. Without discovery and classification, you can't apply appropriate protections or meet any privacy regulation.",
        "policy": "Data Classification Policy, Data Discovery Standard",
        "compensating": [
          "Enable Amazon Macie, Azure Purview, GCP DLP API, or Alibaba Data Security Center for automated discovery",
          "Start by classifying your top 3 data stores by sensitivity",
          "Tag classified resources with sensitivity labels for automated policy enforcement"
        ],
        "leantip": "Turn on your cloud provider's built-in data classification tool (Macie for AWS, Purview for Azure, DLP API for GCP, Data Security Center for Alibaba). It finds PII and sensitive data you may not know exists."
      },
      {
        "itgc": "Access Control",
        "gap": "No centralized access management - local accounts proliferate across cloud consoles and SaaS tools",
        "pushback": "Everyone just uses their own cloud account login; it's simpler.",
        "reality": "CIS Control 5 (Account Management) and Control 6 (Access Control Management) require centralized identity, MFA for all users, and access based on need. Local accounts without centralized management make access reviews impossible and create orphaned accounts when employees leave.",
        "policy": "Identity & Access Management Policy, Account Management Standard",
        "compensating": [
          "Deploy an identity provider (Okta, Entra ID, Google Workspace) for SSO across all systems",
          "Enable MFA for all cloud console access immediately",
          "Create a simple access request and revocation process tied to HR onboarding/offboarding"
        ],
        "leantip": "Enable MFA on every cloud console today - it's the single highest-impact CIS control for startups. Then consolidate local accounts into an IdP over the next sprint."
      },
      {
        "itgc": "Vulnerability Management",
        "gap": "No vulnerability scanning or patch management process",
        "pushback": "We update our dependencies when we remember; it hasn't been a problem.",
        "reality": "CIS Control 7 (Continuous Vulnerability Management) requires establishing a vulnerability management program with regular scanning and remediation SLAs. Unpatched software is the most common attack vector. Startups with no scanning process are flying blind.",
        "policy": "Vulnerability Management Policy, Patch Management Standard",
        "compensating": [
          "Enable cloud-native scanning (AWS Inspector, Azure Defender, GCP SCC, Alibaba Security Center) for immediate visibility",
          "Run Dependabot or Snyk for open-source dependency scanning (free for open-source)",
          "Define remediation SLAs: Critical = 24h, High = 7d, Medium = 30d"
        ],
        "leantip": "Enable your cloud provider's built-in vulnerability scanner today (it's free or low-cost). Then add Dependabot to your repos for dependency scanning. Two tools, 80% of CIS Control 7 covered."
      },
      {
        "itgc": "Incident Response",
        "gap": "No incident response plan or defined team roles",
        "pushback": "If something happens, we'll all jump in and fix it.",
        "reality": "CIS Control 17 (Incident Response & Management) requires a defined incident response plan with roles, communication procedures, and post-incident review. Without pre-planned roles and procedures, response is chaotic and evidence is lost.",
        "policy": "Incident Response Plan, Incident Classification Standard",
        "compensating": [
          "Draft a one-page incident response plan with roles, escalation paths, and communication templates",
          "Assign an incident commander and backup for each on-call rotation",
          "Conduct one tabletop exercise to test the plan"
        ],
        "leantip": "Write a one-page incident response plan with 5 roles (commander, communications, technical lead, legal, scribe) and a phone tree. One tabletop exercise makes it real."
      }
    ]
  },
  {
    "id": "dpdpa",
    "label": "DPDPA",
    "source": "src/pages/standards/Dpdpa.jsx",
    "gaps": [
      {
        "itgc": "Data Privacy / Governance",
        "templates": [
          "dpdpa-consent-notice"
        ],
        "gap": "Relying on implicit/vague consent instead of a valid notice + consent request",
        "pushback": "People sign up and tick a box; that's consent.",
        "reality": "DPDPA (Sec 5, 6) requires a clear notice BEFORE processing and consent that's separate, informed, and freely given. Pre-ticked boxes or bundled consent fail.",
        "leantip": "Implement a plain-language notice, a granular consent checkbox, and a way to withdraw. Log consent (who, what, when) as evidence - use a consent-management tool."
      },
      {
        "itgc": "Data Privacy / Governance",
        "templates": [
          "ropa-dpia",
          "data-management-policy"
        ],
        "gap": "Collecting more data than needed with no purpose limitation",
        "pushback": "We may need this data later, so we collect it now.",
        "reality": "DPDPA enforces purpose limitation and data minimization (Sec 4). Over-collecting is a compliance failure and a breach liability.",
        "leantip": "Review each field you collect - if you can't state its purpose, don't collect it. Add a data inventory and prune unused fields."
      },
      {
        "itgc": "Data Privacy / Governance",
        "templates": [
          "dpdpa-crossborder-register",
          "transfers-register"
        ],
        "gap": "Storing data abroad / no clarity on cross-border transfers",
        "pushback": "Our cloud is fine wherever it is.",
        "reality": "DPDPA Section 16 allows transfers outside India except to countries the Central Government restricts by notification. Rule 15 can add requirements on making data available to foreign States, sector laws (for example payment data rules) can require local storage, and a Significant Data Fiduciary must keep data specified under Rule 13(4) in India. There is no general rule that all data must stay in India.",
        "leantip": "Map where personal data physically resides and keep a transfer register. Check Section 16 notifications before new transfers. Pin to India regions only where a sector rule, a customer contract or Rule 13(4) requires it, or where you choose to."
      },
      {
        "itgc": "Business Continuity & Incident",
        "templates": [
          "dpdpa-breach-intimation",
          "incident-response-plan"
        ],
        "gap": "No breach notification runbook to the DPDP Board",
        "pushback": "Breach? We'll figure that out if ever.",
        "reality": "DPDPA Section 8(6) and Rule 7 require intimation of every personal data breach to affected Data Principals and to the Board without delay, followed by a detailed report to the Board within 72 hours. There is no risk threshold, and failure can attract a penalty of up to Rs 200 crore.",
        "leantip": "Write a one-page breach runbook: detect, intimate Data Principals and the Board without delay, send the detailed Board report within 72 hours, document. Assign a 24/7 on-call owner."
      },
      {
        "itgc": "Data Privacy / Governance",
        "templates": [
          "dpdpa-grievance-log",
          "dpdpa-nomination-form"
        ],
        "gap": "No grievance redressal mechanism for data principals",
        "pushback": "It's just a feedback email address.",
        "reality": "DPDPA Sections 11 to 14 give rights of access, correction and erasure, grievance redressal and nomination. Rule 14 requires you to publish how to exercise them and to respond within a period not exceeding 90 days, and Section 13(3) makes people use your grievance process before going to the Board.",
        "leantip": "Stand up a support workflow for data-principal requests with ownership and SLAs. Keep request logs as evidence of the mechanism existing."
      }
    ]
  },
  {
    "id": "eu-ai-act",
    "label": "EU AI Act",
    "source": "src/pages/standards/EuAiAct.jsx",
    "gaps": [
      {
        "itgc": "General / Cross-Cutting",
        "gap": "No inventory of AI systems or of the company's role for each",
        "pushback": "We just call an AI API, the EU AI Act is for the big model labs.",
        "reality": "Obligations follow your role and the use case, not the size of your model. Building on an API usually makes you a deployer or downstream provider, and using AI for hiring, credit or education can make the system high risk.",
        "policy": "AI Governance Policy, AI System Inventory Standard",
        "compensating": [
          "Vendor and SaaS inventory already lists AI tools",
          "Product specs describe where AI is used"
        ],
        "leantip": "List every AI system with owner, purpose, users affected, your role (provider or deployer) and a first risk level. One sheet is enough to start."
      },
      {
        "itgc": "Program / System Development",
        "gap": "Chatbot or generated content shipped without AI disclosure",
        "pushback": "Users obviously know it's a bot.",
        "reality": "Article 50 transparency duties have applied since 2 August 2026. Unless it is obvious from context, people must be told they are interacting with AI, and generated content must be marked as such.",
        "policy": "AI Transparency Standard, Product Release Checklist",
        "compensating": [
          "Terms of service mention AI features",
          "Support team can explain AI use on request"
        ],
        "leantip": "Add a one-line disclosure at the start of every AI conversation and enable the model provider's watermarking or metadata options."
      },
      {
        "itgc": "Data Privacy / Governance",
        "gap": "High-risk use case planned with no bias testing or human oversight design",
        "pushback": "The high-risk deadline moved to December 2027, so there is time.",
        "reality": "The omnibus delayed Annex III obligations to 2 December 2027, but risk management, data governance and documentation take many months to build, and enterprise customers already ask for them in due diligence.",
        "policy": "AI Risk Management Procedure, Data Governance for AI Standard",
        "compensating": [
          "GDPR DPIA already covers some risks",
          "Manual review of a sample of AI outputs"
        ],
        "leantip": "Start the technical documentation and bias testing now on the current model, and reuse your GDPR DPIA as the starting point for the AI risk assessment."
      }
    ]
  },
  {
    "id": "fedramp",
    "label": "FedRAMP",
    "source": "src/pages/standards/FedRamp.jsx",
    "gaps": [
      {
        "gap": "Jumping straight to an assessment without readiness / scoping",
        "pushback": "Let's just engage a 3PAO and get authorized.",
        "reality": "FedRAMP is built on NIST SP 800-53 controls across Low / Moderate / High baselines. Without scoping the system, selecting the baseline, and completing the RMF steps first, the Security Assessment Plan (SAP) and Security Assessment Report (SAR) will have gaps the assessor rejects.",
        "leantip": "Complete the FedRAMP Readiness Assessment (self-assessment or via a consultant), select the correct baseline using the NIST 800-53 control baselines table, and draft the System Security Plan (SSP) before engaging a Third-Party Assessment Organization (3PAO)."
      },
      {
        "gap": "Confusing FedRAMP authorization with a one-time certification",
        "pushback": "We got the ATO, we're done.",
        "reality": "FedRAMP requires Continuous Monitoring (ConMon) - ongoing assessment, POA&M tracking, and annual reassessment. An Authorization to Operate (ATO) has a defined period and must be renewed.",
        "leantip": "Build the ConMon program from day one: continuous control monitoring, recurring self-assessments, and a living POA&M. Treat the ATO as a milestone, not the finish line."
      },
      {
        "gap": "Incomplete SSP / SAP artifacts",
        "pushback": "The template is long - we'll fill it later.",
        "reality": "The SSP is the foundational document (system description, control baselines, inherited controls, common controls) that the assessor uses to scope the SAP and SAR. Incomplete SSPs derail assessments.",
        "leantip": "Draft the SSP early with the system boundary, data types, connections, and selected baseline. Use a FedRAMP-compliant SSP template; reuse it for every assessment cycle."
      },
      {
        "gap": "Ignoring the shared-responsibility model with the cloud service provider",
        "pushback": "AWS GovCloud is FedRAMP authorized, so we're covered.",
        "reality": "FedRAMP authorizes the CSP at a baseline, but the customer remains responsible for configuring the services securely and for the portions of controls not inherited (e.g., data encryption, identity management, application-level controls).",
        "leantip": "Map the shared-responsibility matrix explicitly: inherited controls (CSP) vs. customer-configured controls vs. common controls (shared). Document the residual responsibility for each."
      }
    ]
  },
  {
    "id": "gdpr",
    "label": "GDPR",
    "source": "src/pages/standards/Gdpr.jsx",
    "gaps": [
      {
        "itgc": "Data Privacy / Governance",
        "templates": [
          "ropa-dpia"
        ],
        "gap": "Processing personal data with no ROPA or lawful-basis map",
        "pushback": "We use a few email/CRM tools, a spreadsheet is overkill.",
        "reality": "ROPA (Art. 30) is a legal requirement and you must map a lawful basis (Art. 6) per processing activity. Regulators and B2B customers ask for this.",
        "leantip": "Build a minimal ROPA: each data flow's purpose, categories, lawful basis, recipients, retention. One shared sheet with ~15 rows is a compliant start that grows later."
      },
      {
        "itgc": "Data Privacy / Governance",
        "templates": [
          "transfers-register",
          "customer-dpa"
        ],
        "gap": "Storing EU data without a data-residency / transfer mechanism",
        "pushback": "Everything's in US cloud regions, that's fine right?",
        "reality": "Sending EU personal data outside the EEA needs a valid transfer mechanism (SCCs, adequacy, BCRs) and your processors need DPAs in place.",
        "leantip": "Sign SCCs with processors, prefer EU-hosted regions for personal data, and map each third party's country. Document the transfer basis per processor."
      },
      {
        "itgc": "Data Privacy / Governance",
        "templates": [
          "ropa-dpia"
        ],
        "gap": "Ignoring DPIA for high-risk processing",
        "pushback": "A DPIA sounds like a bureaucratic template.",
        "reality": "DPIA (Art. 35) is REQUIRED for profiling, large-scale processing, special categories, or public monitoring. Skipping it when required is a direct violation.",
        "leantip": "Use SaaS DPIA templates (e.g., CNIL/ICO). Run one for you highest-risk processing recognizing triggers - 80% of the drafting is a structured commentary you already know."
      },
      {
        "itgc": "Data Privacy / Governance",
        "templates": [
          "dsar"
        ],
        "gap": "No DSAR workflow, so rights requests go unanswered",
        "pushback": "We've only had one request all year.",
        "reality": "Data subject access requests (Art. 15-22) must be answered in 1 month (extendable 2). Missed/wrong DSARs are an easy, common enforcement trigger.",
        "leantip": "Set up a DSAR@ inbox + a simple triage checklist, and locate data programmatically (search across DBs/tools). Mark the 1-month deadline in your ticketing system."
      },
      {
        "itgc": "Data Privacy / Governance",
        "templates": [
          "data-management-policy"
        ],
        "gap": "Unlimited log/analytics retention and no deletion",
        "pushback": "More data = more insights, and deleting is scary.",
        "reality": "Storage limitation (Art. 5(1)(e)) and data minimization require defined retention and deletion. Hoarding data raises breach impact and risk.",
        "leantip": "Set a retention policy per data type and a technical job to delete/prune old data. Turn off unnecessary tracking for EU traffic (cookie banners won't fix backend logging)."
      }
    ]
  },
  {
    "id": "hipaa",
    "label": "HIPAA",
    "source": "src/pages/standards/Hipaa.jsx",
    "gaps": [
      {
        "gap": "Sharing PHI with a vendor before you know whether a BAA is required",
        "pushback": "It's just an analytics tool / email tool, do we really need a BAA?",
        "reality": "A BAA is required when the vendor is a business associate - meaning it creates, receives, maintains or transmits PHI on your behalf (45 CFR §160.103, §164.504(e)). A tool that never handles PHI is not a business associate just because it handles personal data, and a BAA is not a general data-processing contract. The test is factual: what does the vendor actually do with the data?",
        "leantip": "For each vendor, write down whether it handles PHI on your behalf. If yes, no BAA means no PHI. If no, the ordinary privacy and security terms apply instead. Note that a BAA only helps if it binds the vendor's own subprocessors - ask for the subprocessor list."
      },
      {
        "gap": "Mistaking BAA for 'the vendor handles compliance for me'",
        "pushback": "Our cloud provider has a BAA, so we're covered.",
        "reality": "A BAA allocates responsibilities; it does NOT transfer your compliance. You remain the covered entity or business associate responsible for the safeguards you choose and for breach reporting.",
        "leantip": "Treat the BAA as a risk-shifting document, not a waiver. You still own the Security Rule risk analysis and the controls you are required to implement yourself."
      },
      {
        "gap": "No HIPAA Security Rule risk analysis on the books",
        "pushback": "We did a pen test; that's basically the same.",
        "reality": "§164.308(a)(1)(ii)(A) requires an accurate and thorough assessment of potential risks and vulnerabilities to ePHI. A penetration test is one input to that, not a substitute for it. HHS expects the risk analysis to cover all ePHI, not just the system that was tested.",
        "leantip": "Run a structured risk analysis across all ePHI - assets, threats, likelihood, impact - and document the result. The rule requires periodic re-evaluation as circumstances change; it does not prescribe a fixed interval, so set and justify your own cadence."
      },
      {
        "gap": "Sending ePHI unencrypted (email, spreadsheets)",
        "pushback": "It's internal, and encryption is a pain.",
        "reality": "Encryption of ePHI at rest (§164.312(a)(2)(iv)) and in transit (§164.312(e)(2)(ii)) are addressable, which means you must assess and document the decision either way. Unencrypted ePHI that is later lost or exposed is what turns a gap into a reportable breach.",
        "leantip": "Enable encryption by default (TLS, encrypted storage, encrypted email) and document your assessment. If you decide not to implement it, §164.306(d) requires you to record why, and what alternative you used."
      },
      {
        "gap": "No workforce training or access-control documentation",
        "pushback": "Everyone here is trustworthy, training is overkill.",
        "reality": "§164.308(a)(5) requires workforce training, and §164.308(a)(4) requires policies for authorising access. HIPAA training is judged on whether you can produce records of it, not on whether people already knew the rules.",
        "leantip": "Run HIPAA training and keep the records. The rule requires reminders at least annually and retraining when responsibilities change or material happens; new workforce members need it within a reasonable time after joining. Restrict access to least privilege through your identity provider and enable the audit logging you will need as evidence."
      }
    ]
  },
  {
    "id": "iso/27090",
    "label": "ISO 27090",
    "source": "src/pages/standards/Iso27090.jsx",
    "gaps": [
      {
        "itgc": "Program / System Development",
        "gap": "LLM features shipped with no prompt injection testing",
        "pushback": "The model provider handles safety, so we don't need to test it ourselves.",
        "reality": "Provider safety filters do not know your system prompt, tools or data. Prompt injection and output carrying injection attacks are threat types ISO 27090 names directly, and they target your integration, not the base model.",
        "policy": "Secure Development Policy, AI System Lifecycle Policy, Security Testing Standard",
        "compensating": [
          "Model provider content filters and abuse monitoring",
          "Least-privilege API keys limit what a hijacked prompt can reach",
          "Existing web application security testing covers the surrounding app"
        ],
        "leantip": "Add a small prompt injection test set (direct and indirect, through retrieved documents) to CI and run it before each release. Treat model output as untrusted input everywhere downstream."
      },
      {
        "itgc": "Access Management",
        "gap": "AI agents and tools run with broad service credentials",
        "pushback": "The agent needs access to everything to be useful.",
        "reality": "If an agent can be steered by injected instructions, its permissions become the attacker's permissions. Least privilege and human approval for high-impact actions are the main limits on damage.",
        "policy": "Access Control Policy, AI Acceptable Use Policy",
        "compensating": [
          "Read-only scopes already used for most integrations",
          "Audit logs exist for the underlying SaaS and cloud APIs"
        ],
        "leantip": "Give each agent its own identity with the narrowest scope, and require a human confirmation step for sends, deletes, payments and permission changes."
      },
      {
        "itgc": "Program / System Development",
        "gap": "Open-source models and datasets pulled without provenance checks",
        "pushback": "It's on a popular model hub with thousands of downloads, so it must be safe.",
        "reality": "Third-party model artefacts and datasets are a route for direct model poisoning and data poisoning. Popularity is not provenance.",
        "policy": "Supplier Security Policy, AI Supply Chain Standard, Information Asset Management Policy",
        "compensating": [
          "Dependency scanning already runs on application code",
          "Models are pinned to specific versions in deployment config"
        ],
        "leantip": "Keep an AI bill of materials (base model, version, source, hash, training or fine-tuning data source). Prefer safe serialisation formats and scan model files before use."
      },
      {
        "itgc": "IT Operations",
        "gap": "No logging or rate limiting on model endpoints",
        "pushback": "Logging prompts is a privacy risk, and rate limits hurt the user experience.",
        "reality": "Without logs you cannot detect or investigate extraction, evasion or injection attempts. Throttling is one of the mitigations ISO 27090 Clause 7 discusses for query-based attacks such as model exfiltration.",
        "policy": "Logging & Monitoring Policy, Privacy Policy, Incident Response Plan",
        "compensating": [
          "API gateway already records request metadata",
          "Cloud provider abuse detection is enabled"
        ],
        "leantip": "Log metadata by default and full prompts only where justified, with redaction and short retention. Set per-user and per-key rate limits and alert on unusual query volumes."
      },
      {
        "itgc": "Data Privacy / Governance",
        "gap": "Training and RAG data may expose personal or confidential information",
        "pushback": "The model doesn't store data, it just learns patterns.",
        "reality": "Membership inference, model inversion and sensitive model output are recognised ways that training or retrieval data leaks back out. Retrieval systems can also return documents a user should not see.",
        "policy": "Data Classification Policy, Privacy Policy, AI Data Governance Standard",
        "compensating": [
          "Data classification labels already exist for source systems",
          "Production data access is restricted to named roles"
        ],
        "leantip": "Minimise and de-identify data before training, enforce the user's own access rights in retrieval, and add output filtering for personal and secret data."
      }
    ]
  },
  {
    "id": "lgpd",
    "label": "LGPD",
    "source": "src/pages/standards/Lgpd.jsx",
    "gaps": [
      {
        "itgc": "Data Governance",
        "gap": "No distinction between controller (controlador) and operator (operador) roles in vendor contracts",
        "pushback": "Our cloud providers handle everything; we don't need to separate roles.",
        "reality": "LGPD Art. 5 defines controller and operator as distinct roles with different obligations. Misclassifying your processor relationships means your DPAs lack required clauses and the ANPD can hold you liable for processor breaches.",
        "policy": "Data Processing Roles Policy, Vendor Data Processing Agreement (DPA) Template",
        "compensating": [
          "Use standard DPA templates that explicitly assign controller/operator responsibilities",
          "Tag each vendor in a register with their role (controller, operator, joint controller)",
          "Start with a one-page role matrix covering your top 5 data processors"
        ],
        "leantip": "Create a vendor register with two columns - 'Controller' and 'Operator' - and tag each vendor. Ensure every DPA includes LGPD Art. 39 operator obligations (processing only on controller instructions, confidentiality, security measures)."
      },
      {
        "itgc": "Data Subject Rights",
        "gap": "No DSAR (Data Subject Access Request) workflow for the six LGPD rights",
        "pushback": "We barely have users; nobody will submit a rights request.",
        "reality": "LGPD Art. 18 grants data subjects six rights (confirmation, access, correction, anonymization/deletion, portability, information on sharing). You must be able to respond to any of these within the ANPD's timeline. Not having a process is itself a violation.",
        "policy": "Data Subject Rights Procedure, Privacy Notice Policy",
        "compensating": [
          "Set up a dedicated privacy@ inbox as intake with a 15-day internal SLA",
          "Use a simple spreadsheet to log each request, status, and response date",
          "Pre-build data export scripts for your primary database so you can respond quickly"
        ],
        "leantip": "Start with a privacy@ inbox, a Google Sheet tracker, and a runbook that lists where PII lives in your stack. When a request arrives, you'll know exactly where to look and how to export or delete."
      },
      {
        "itgc": "Lawful Basis",
        "gap": "Processing personal data without mapping to one of the ten Art. 7 lawful bases",
        "pushback": "We have consent from our users, so we're covered.",
        "reality": "Consent under LGPD must be free, informed, unambiguous, and for a specific purpose - and it can be withdrawn at any time. Many startups rely solely on consent when another basis (legitimate interest, contract performance) is more appropriate and durable.",
        "policy": "Lawful Basis Assessment Policy, Consent Management Policy",
        "compensating": [
          "Map each processing activity to its lawful basis in a simple registry",
          "Use legitimate interest for internal analytics where consent would be impractical",
          "Implement a consent withdrawal mechanism that propagates within 24 hours"
        ],
        "leantip": "Don't default to consent for everything. Map your top 10 processing activities to lawful bases - you'll find that contract performance and legitimate interest cover most operational needs, leaving consent for marketing only."
      },
      {
        "itgc": "Incident Response",
        "gap": "No security incident notification process to the ANPD (Art. 48)",
        "pushback": "We'll figure out who to notify if something happens.",
        "reality": "LGPD Art. 48 requires notification to the ANPD and data subjects within a 'reasonable time' (ANPD guidance suggests 2 business days for serious incidents). Without a pre-built process, you'll miss the window and face administrative sanctions.",
        "policy": "Security Incident Response Plan, ANPD Notification Procedure",
        "compensating": [
          "Draft a one-page ANPD notification template with required fields (Art. 48 §1)",
          "Assign an incident commander and backup for the notification process",
          "Pre-stage a communication draft for data subjects in case of serious harm"
        ],
        "leantip": "Fill in the ANPD notification template NOW - before you need it. Include: nature of data, data subjects affected, security measures taken, risks, and mitigation measures. Having it ready halves your response time."
      },
      {
        "itgc": "Cross-Border Transfer",
        "gap": "No assessment of cross-border data transfer adequacy (Art. 33)",
        "pushback": "Our data stays in Brazil since we use local cloud regions.",
        "reality": "Even if primary storage is in Brazil, SaaS tools (analytics, email, CRM) often process data in US or EU data centers. LGPD Art. 33 restricts international transfers unless the destination country has adequate protection or you use Standard Contractual Clauses (SCCs).",
        "policy": "Cross-Border Data Transfer Policy, International Data Transfer Register",
        "compensating": [
          "Audit all SaaS tools and identify where personal data is processed geographically",
          "Sign SCCs with any vendor processing data outside Brazil",
          "Prefer Brazilian or LGPD-adequate-region cloud regions for personal data storage"
        ],
        "leantip": "Run a quick inventory: for every SaaS tool, check where its data centers are. If any are outside Brazil, ensure SCCs are in place or the vendor has signed a DPA referencing LGPD Art. 33 transfer mechanisms."
      }
    ]
  },
  {
    "id": "pci-dss",
    "label": "PCI DSS",
    "source": "src/pages/standards/PciDss.jsx",
    "gaps": [
      {
        "itgc": "Access Management",
        "gap": "Cardholder data stored where it shouldn't be",
        "pushback": "We only store card numbers for a few seconds, it's fine.",
        "reality": "Any stored cardholder data (even in logs, databases, or third-party tools) massively expands PCI scope and risk. Unnecessary storage is the top scope killer.",
        "policy": "Data Retention & Disposal Policy, Data Classification Policy, CDE Scope Policy",
        "compensating": [
          "Tokenization lets you operate without storing real PANs",
          "Log masking hides PANs even where they'd appear",
          "Short retention windows minimize exposed data"
        ],
        "leantip": "Tokenize via a 3rd party provider, strip PANs from logs/databases, and enable masking. If you don't need the PAN, don't store it - reduce scope to near-zero."
      },
      {
        "itgc": "Access Management",
        "gap": "Shared hosting / flat network without segmentation",
        "pushback": "One network, one server, it's cheaper.",
        "reality": "The cardholder data environment (CDE) must be isolated. Without segmentation the WHOLE network is in scope, which is unaffordable for a startup.",
        "policy": "Network Segmentation Policy, Access Control Policy, CDE Scope Policy",
        "compensating": [
          "Cloud-native VPC/account isolation reduces scope to the CDE",
          "Firewall rules can enforce logical segmentation where physical is impractical",
          "A documented scope diagram shows the boundary"
        ],
        "leantip": "Create a segmented CDE (separate VLAN/VPC/account) containing only card-processing components. Document the segmentation with a scope diagram."
      },
      {
        "itgc": "IT Operations",
        "gap": "No quarterly scans / annual pen test evidence",
        "pushback": "We scanned once last year, that's enough.",
        "reality": "PCI-DSS requires quarterly external ASV scans and annual penetration tests with evidence. Missed scans = immediate non-compliance.",
        "policy": "Vulnerability Management Policy, Penetration Testing & Scan Policy, Evidence & Records Retention Policy",
        "compensating": [
          "Automated scan tooling (ASV) can run quarterly with little effort",
          "Cloud-native scans (Amazon Inspector, Azure Defender, Security Command Center) are additive",
          "Report archive provides the dated evidence trail"
        ],
        "leantip": "Automate scans on a schedule, keep the reports, and run an annual pen test. Store all scan reports in one folder dated correctly."
      },
      {
        "itgc": "Access Management",
        "gap": "Default credentials and weak service accounts",
        "pushback": "It's an internal tool, nobody outside will find it.",
        "reality": "Default/weak credentials on any system touching the CDE are a critical finding and a real breach vector target.",
        "policy": "Access Control Policy, Password / Authentication Policy, Privileged Access Management Policy",
        "compensating": [
          "Cloud managed secrets (AWS Secrets Manager, Azure Key Vault, GCP/OSS secrets) avoid static creds",
          "MFA on admin accounts substantially reduces risk",
          "Using managed DB/services removes default console accounts"
        ],
        "leantip": "Change all defaults, enforce strong/unique creds, enable MFA, and use the cloud provider's managed secrets where possible."
      },
      {
        "itgc": "Program / System Development",
        "gap": "Third-party processors misunderstand scope",
        "pushback": "Our payment provider handles everything, so we're compliant.",
        "reality": "Using a validated processor removes some responsibility but NOT your duty to validate your own CDE, controls, and SAQ/ROC status.",
        "policy": "Vendor / Third-Party Risk Management Policy, Processor Compliance Policy",
        "compensating": [
          "Using a PCI-listed processor shifts responsibility for that processing",
          "A validated provider's certificate can be cited",
          "Reducing on-site PAN handling shrinks your SAQ burden"
        ],
        "leantip": "Confirm your provider is PCI-DSS validated (list on PCI SSC), and complete your own SAQ/ROC correctly. Don't assume the provider covers you."
      }
    ]
  },
  {
    "id": "pdpa",
    "label": "PDPA",
    "source": "src/pages/standards/Pdpa.jsx",
    "gaps": [
      {
        "itgc": "Data Governance",
        "gap": "No Data Protection Officer (DPO) appointed as required by PDPA Sec. 11(3)",
        "pushback": "We're too small to need a formal DPO - our CTO handles privacy.",
        "reality": "PDPA Sec. 11(3) mandates every organization to appoint at least one DPO responsible for ensuring PDPA compliance. The DPO's name must be accessible publicly (or to PDPC on request). Not having one is a statutory violation even for startups.",
        "policy": "Data Protection Officer Appointment Policy, Privacy Governance Charter",
        "compensating": [
          "Appoint an internal DPO (even part-time) and publish their contact details",
          "If no internal resource, engage an external DPO service provider",
          "Document the DPO's responsibilities in a formal appointment letter"
        ],
        "leantip": "Name your most privacy-aware person as DPO and publish their contact on your website. PDPC doesn't require a full-time role - a named individual with clear responsibilities satisfies the requirement."
      },
      {
        "itgc": "Consent Management",
        "gap": "No purpose-specific consent collection - blanket consent for all processing",
        "pushback": "We ask users to agree to our terms; that covers everything.",
        "reality": "PDPA Sec. 13-17 require consent to be specific to the purpose, not blanket. You must notify users of purposes before or at collection, and consent must be reasonably inferred or express. Blanket consent doesn't meet PDPA standards and exposes you to PDPC enforcement.",
        "policy": "Consent Management Policy, Purpose-Specific Privacy Notice",
        "compensating": [
          "Map each data collection point to its specific purpose in a consent registry",
          "Implement purpose-level consent capture (separate consents for marketing, analytics, etc.)",
          "Build a consent withdrawal mechanism that processes within 30 days"
        ],
        "leantip": "Create a simple table: each column is a data collection point (signup form, analytics, support), each row is the specific purpose. This gives you purpose-specific consent mapping in 30 minutes."
      },
      {
        "itgc": "Data Breach Response",
        "gap": "No mandatory data breach notification process for notifiable breaches",
        "pushback": "We'll notify people if something bad happens - we don't need a formal process.",
        "reality": "PDPA Sec. 26D mandates notification to PDPC within 3 calendar days for notifiable breaches (significant harm + significant scale). Sec. 26E requires notifying affected individuals. Pre-building the process is essential - you won't have 3 days to figure it out during a crisis.",
        "policy": "Data Breach Response Plan, PDPC Notification Procedure",
        "compensating": [
          "Draft a one-page PDPC notification template with required fields pre-filled",
          "Assign an incident commander and backup for the 72-hour notification window",
          "Pre-stage a communication draft for affected individuals"
        ],
        "leantip": "Fill in the PDPC notification form NOW - before you need it. Include: nature of breach, affected individuals count, data types compromised, remedial measures taken. Having it ready halves your response time."
      },
      {
        "itgc": "DNC Registry Compliance",
        "gap": "No Do Not Call (DNC) Registry screening for marketing messages",
        "pushback": "We only email people who signed up - DNC is for phone calls.",
        "reality": "PDPA Sec. 43-44 and the DNC provisions apply to marketing messages via telephone, fax, and email. The DNC Registry has three registers: voice, fax, and message (email). You must check the relevant register before sending marketing messages. Exemptions exist for existing customers (Section 42(1)(c)) but you must still honor opt-out requests.",
        "policy": "DNC Registry Compliance Policy, Marketing Communications Policy",
        "compensating": [
          "Register with the DNC Registry and implement automated checking before marketing sends",
          "Implement opt-out/unsubscribe mechanisms in all marketing emails",
          "Document the existing customer exemption criteria and apply it correctly"
        ],
        "leantip": "Sign up for DNC Registry access at pdpc.gov.sg, implement automated checking in your email platform, and add unsubscribe links to every marketing email. This covers voice, fax, and message channels."
      },
      {
        "itgc": "Cross-Border Transfer",
        "gap": "No contractual or binding corporate rules for cross-border data transfers",
        "pushback": "Our data is in Singapore cloud regions; we don't transfer internationally.",
        "reality": "Even if primary storage is in Singapore, SaaS tools (analytics, CRM, email) often process data in US or other data centers. PDPA Sec. 26 requires that organizations ensure overseas recipients provide comparable protection. Without contractual protections, you're in breach of the transfer obligation.",
        "policy": "Cross-Border Data Transfer Policy, International Transfer Register",
        "compensating": [
          "Audit all SaaS tools and identify where personal data is processed geographically",
          "Execute contractual clauses requiring overseas recipients to provide PDPA-equivalent protection",
          "Prefer Singapore or ASEAN-region cloud regions for personal data storage"
        ],
        "leantip": "Run a quick inventory: for every SaaS tool, check where its data centers are. If any are outside Singapore, ensure contractual clauses requiring PDPA-equivalent protection are in place with each vendor."
      }
    ]
  },
  {
    "id": "pipl",
    "label": "PIPL",
    "source": "src/pages/standards/Pipl.jsx",
    "gaps": [
      {
        "itgc": "Data Governance",
        "gap": "No Personal Information Protection Officer (PIPO) or DPO appointed as required by Art. 52",
        "pushback": "We don't have operations in China; PIPL doesn't apply to us.",
        "reality": "PIPL Art. 3(2) applies extraterritorially to organizations outside China that process personal information of individuals within China for goods/services provision or behavioral analysis. If you have Chinese users, you must appoint a PIPO (Art. 52) and may need to establish a dedicated entity or representative in China (Art. 53).",
        "policy": "PIPO Appointment Policy, China Representative Designation Policy",
        "compensating": [
          "Appoint an internal PIPO with Chinese-language capabilities and publish contact details",
          "If processing data of 1M+ individuals, establish a dedicated entity in China (Art. 53)",
          "Engage a local legal counsel for PIPO advisory support"
        ],
        "leantip": "Even if you're outside China, if you process Chinese residents' data for goods/services provision, appoint a PIPO and publish their contact. For organizations processing 1M+ individuals' data, a China-based entity or representative is mandatory under Art. 53."
      },
      {
        "itgc": "Consent Management",
        "gap": "No separate consent mechanism for sensitive personal information and cross-border transfers",
        "pushback": "We already have user consent through our terms of service.",
        "reality": "PIPL Art. 23 requires SEPARATE consent for cross-border transfers. Art. 29 requires separate consent for sensitive personal information processing. Art. 14 requires consent to be given voluntarily, with full knowledge, and for specific purposes. Bundled consent in terms of service doesn't meet PIPL standards - each requires distinct, granular consent.",
        "policy": "Separate Consent Policy, Sensitive Data Processing Consent Framework",
        "compensating": [
          "Implement purpose-specific consent capture at each data collection point",
          "Build separate consent flows for sensitive data processing and cross-border transfers",
          "Implement consent withdrawal mechanism that propagates within 15 days"
        ],
        "leantip": "PIPL's 'separate consent' (单独同意) requirement is stricter than GDPR's consent. Build distinct consent flows: one for general processing, one for sensitive data, one for cross-border transfers. Each must be separately presented and separately accepted."
      },
      {
        "itgc": "Cross-Border Transfer",
        "gap": "No Security Assessment, Certification, or Standard Contract for cross-border data transfers",
        "pushback": "Our cloud provider handles the data; we don't need to worry about transfers.",
        "reality": "PIPL Art. 38-40 require ONE of three mechanisms for cross-border transfers: (1) CAC Security Assessment (mandatory for critical information infrastructure operators or 1M+ individuals), (2) Personal Information Protection Certification, or (3) Standard Contract with the overseas recipient filed with the CAC. Simply using a cloud provider doesn't exempt you - the transfer mechanism must be in place before data leaves China.",
        "policy": "Cross-Border Transfer Mechanism Policy, CAC Security Assessment Procedure",
        "compensating": [
          "Conduct an initial cross-border transfer audit to identify all data flows leaving China",
          "Determine which of the three mechanisms applies based on data volume and type",
          "File Standard Contracts with CAC for transfers not requiring Security Assessment"
        ],
        "leantip": "Start with a transfer inventory: for every SaaS tool processing Chinese residents' data, determine if data leaves China. If it does, you need one of the three Art. 38 mechanisms. For most startups, the Standard Contract is the most practical path."
      },
      {
        "itgc": "Incident Response",
        "gap": "No security incident notification process to the CAC and affected individuals",
        "pushback": "We'll deal with incidents if they happen.",
        "reality": "PIPL Art. 57 requires personal information handlers to take immediate remedial measures and notify affected individuals and the CAC (or relevant department) when a security incident occurs. The notification must include: cause of the incident, types of data affected, harm caused, remedial measures taken, and how individuals can protect themselves. Without a pre-built process, you'll miss the notification window and face administrative sanctions.",
        "policy": "Security Incident Response Plan, CAC Notification Procedure",
        "compensating": [
          "Draft a CAC notification template with all Art. 57 required fields pre-populated",
          "Assign an incident commander and backup for the notification process",
          "Pre-stage individual notification templates for affected users"
        ],
        "leantip": "Fill in the CAC notification template NOW - include: incident cause, data types affected, harm assessment, remedial measures, and individual protection steps. Having it ready halves your response time during a real incident."
      },
      {
        "itgc": "Data Localization",
        "gap": "No data localization assessment for critical information infrastructure or large-scale processing",
        "pushback": "We store data in global cloud regions; localization isn't an issue.",
        "reality": "PIPL Art. 40 mandates that Critical Information Infrastructure Operators (CIIOs) and organizations processing personal information exceeding CAC-set thresholds must store personal information collected and generated in China within China. Security Assessment by the CAC is required for any outbound transfer. Even if you're not a CIIO, the CAC can designate organizations as subject to localization requirements. Assess your exposure and plan data residency accordingly.",
        "policy": "Data Localization Assessment Policy, China Data Residency Plan",
        "compensating": [
          "Assess whether you qualify as a CIIO or exceed processing thresholds",
          "Configure Chinese cloud regions (Alibaba Cloud China, AWS China, Azure China) for primary data storage",
          "Document a data residency architecture showing where Chinese residents' data is stored"
        ],
        "leantip": "If you process data of Chinese residents, default to Chinese cloud regions (Alibaba Cloud China regions, AWS China (Ningxia/Beijing), Azure China (21Vianet)) for primary storage. This satisfies localization and simplifies cross-border transfer requirements."
      }
    ]
  },
  {
    "id": "soc2",
    "label": "SOC 2",
    "source": "src/pages/standards/Soc2.jsx",
    "gaps": [
      {
        "itgc": "IT Operations",
        "gap": "Startups fail to distinguish Trust Services Criteria until the report",
        "pushback": "We'll worry about which TSC categories apply once we get closer to the audit.",
        "reality": "SOC 2 requires you to select the TSC in-scope (Security always; Confidentiality/Privacy/Integrity/Availability optional). Picking late means controls designed for the wrong scope.",
        "policy": "SOC 2 TSC Scope & Control Activity Policy, Information Security Policy",
        "compensating": [
          "Security is always in-scope by default, so core controls (CC6, CC7, CC8) are already required",
          "Most SaaS scope Security + Availability, giving a pragmatic starting point",
          "Mapping tooling can back-fill controls once scope is locked"
        ],
        "leantip": "Decide TSC scope WHEN choosing the auditor - Security + Availability covers most SaaS. Add Confidentiality if you hold customers' secrets. Confirm each control maps to a chosen TSC."
      },
      {
        "itgc": "IT Operations",
        "gap": "Type II evidence gap - controls exist but weren't operated over time",
        "pushback": "We did everything at the end, so just back-date it.",
        "reality": "Type II needs controls operating over the audit period (typically 6-12 months) with evidence dated throughout. Backdated evidence is a red flag and can sink the report.",
        "policy": "Evidence & Records Retention Policy, Monitoring & Logging Policy",
        "compensating": [
          "Cloud audit logs (CloudTrail, Activity Log, Cloud Audit Logging) preserve timestamps automatically",
          "Vulnerability-scan history and CI/CD logs form a credible chain",
          "Monthly dashboard snapshots create dated evidence"
        ],
        "leantip": "Turn on continuous evidence capture early: cloud audit logs, access-review records, vulnerability-scan history, ticket timestamps. Screenshot dashboards monthly - cheap and legit."
      },
      {
        "itgc": "Change Management",
        "gap": "No evidence of access reviews, change management, or vendor risk",
        "pushback": "We review access informally in Slack; changes go straight to prod.",
        "reality": "These are the most common SOC 2 findings. Without periodic access reviews, documented change control, and vendor risk assessments, you'll get exceptions.",
        "policy": "Access Control Policy, Change Management Policy, Vendor Risk Management Policy",
        "compensating": [
          "IDP (Okta/Entra ID) signals access events even if reviews are informal",
          "CI/CD approvals leave a change trail that can be retro-fitted to a process",
          "Cloud IAM policies show current permissions to kick off reviews"
        ],
        "leantip": "Automate access reviews via your IDP quarterly, gate changes through CI/CD approvals with audit trails, and maintain a one-page vendor risk register reviewed every 6 months."
      },
      {
        "itgc": "Access Management",
        "gap": "Single point of control - one person holds all the cloud keys & knowledge",
        "pushback": "It's just faster if one engineer does everything.",
        "reality": "SOC 2 expects separation of duties. One person with all keys + no peer review = high risk finding and a real operational liability.",
        "policy": "Access Control Policy, Segregation of Duties Policy, Privileged Access Management Policy",
        "compensating": [
          "Short-lived credentials via IDP/role assumption reduce standing keys",
          "Cloud provider's fine-grained IAM lets you split admin duties",
          "A second approver enforced in CI/CD for production changes"
        ],
        "leantip": "Use short-lived credentials via an IDP/role assumption, require a second approver for production changes, and document control owners (even if the same 3 people wear many hats)."
      },
      {
        "itgc": "Business Continuity & Incident",
        "gap": "No defined uptime/availability commitments or DR testing",
        "pushback": "We're a startup; 'good enough' availability is fine.",
        "reality": "If Availability is in-scope, SOC 2 expects defined availability objectives and evidence of DR/BCP readiness, not just best-effort uptime.",
        "policy": "Business Continuity & Disaster Recovery (BCDR) Policy, Availability Objective Policy",
        "compensating": [
          "Cloud-managed services (multi-AZ) give built-in availability",
          "Health checks and alerts provide monitoring evidence",
          "A single DR tabletop test yields baseline evidence"
        ],
        "leantip": "Document a target availability %, add monitoring/health checks, and do a lightweight DR tabletop or failover test once - keep the report as evidence."
      }
    ]
  }
];

// Gaps that several frameworks raise in their own words. Each card stays as written; the theme groups them.
// Members are [framework id, index in that framework's gaps].
export const SHARED_THEMES = [
  { theme: 'Cross-border data transfers', members: [['gdpr', 1], ['dpdpa', 2], ['lgpd', 4], ['pdpa', 4], ['pipl', 2]] },
  { theme: 'Incident response and regulator notification', members: [['cis', 4], ['dpdpa', 3], ['lgpd', 3], ['pdpa', 2], ['pipl', 3]] },
  { theme: 'Data subject rights and grievance handling', members: [['gdpr', 3], ['lgpd', 1], ['dpdpa', 4]] },
  { theme: 'Consent and purpose', members: [['dpdpa', 0], ['pdpa', 1], ['pipl', 1]] },
  { theme: 'Data minimisation and retention', members: [['dpdpa', 1], ['gdpr', 4]] },
  { theme: 'Privacy officer appointment', members: [['pdpa', 0], ['pipl', 0]] },
  { theme: 'AI system inventory and accountability', members: [['aigp', 0], ['eu-ai-act', 0], ['aigp', 1]] },
  { theme: 'Human oversight of AI decisions', members: [['aigp', 3], ['eu-ai-act', 2]] },
  { theme: 'Personal data in AI training and retrieval', members: [['aigp', 2], ['iso/27090', 4]] },
  { theme: 'Access, credentials and key person risk', members: [['cis', 2], ['pci-dss', 3], ['iso/27090', 1], ['soc2', 3]] },
  { theme: 'Vulnerability scanning and testing', members: [['cis', 3], ['pci-dss', 2]] },
  { theme: 'Vendors, scope and shared responsibility', members: [['hipaa', 0], ['hipaa', 1], ['pci-dss', 4], ['fedramp', 3]] },
];

// Frameworks whose pages show only the common gaps (no framework-specific list).
export const COMMON_ONLY_FRAMEWORKS = ['CCPA/CPRA', 'CERT-In', 'CIPP/E', 'CIPP/US', 'COPPA', 'SEBI CSCRF', 'DORA', 'HITRUST', 'ISO 22301', 'ISO 22317', 'ISO 27001 LA', 'ISO 27001 LI', 'ISO 27017', 'ISO 27018', 'ISO 27701', 'ISO 31000', 'ISO 42001', 'NIS2', 'NIST CSF', 'NIST 800-171 / CMMC', 'RBI', 'SEBI', 'UK GDPR'];
