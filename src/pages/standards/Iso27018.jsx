import LearningFrameworkPage from "../../components/LearningFrameworkPage.jsx";

const FRAMEWORK = {
  id: "iso-27018",
  name: "ISO/IEC 27018:2019 Cloud PII Protection",
  color: "teal",
  region: "Global",
  flag: "🔒",
  flagAnimation: "pulse",
  basePath: "/iso/27018",
  referenceUrl: "https://www.iso.org/standard/76559",
  weeks: [
    {
      week: 1,
      title: "L1 Foundation: PII Protection in Cloud Context",
      days: "Days 1-7",
      description:
        "Establish PII protection governance for cloud environments, understand ISO 27018 controls as extension of ISO 27001/27002, and define cloud PII scope.",
      tasks: [
        {
          title: "Define Cloud PII Processing Scope",
          control: "ISO/IEC 27018 Clause 4 - Context & Scope for PII in Cloud",
          how: "Identify all PII processed in cloud: data subjects (customers, employees, prospects), PII categories (identifiers, contact, financial, health, biometric), cloud services processing PII (SaaS CRM, HRIS, marketing, analytics, support), cross-border transfers. Map PII flows: collection, storage, use, disclosure, deletion. Produce PII inventory with cloud location mapping.",
          check: "Complete PII inventory for cloud services, data flow maps documented, cross-border transfers identified, and scope approved by DPO."
        },
        {
          title: "Establish PII Protection Roles & Accountability",
          control: "ISO/IEC 27018 Clause 5 - PII Protection Roles",
          how: "Define cloud PII roles: PII Controller (customer), PII Processor (CSP), Cloud DPO, Cloud Security Lead. Document RACI for PII protection activities: consent management, DSAR handling, breach notification, DPIA, CSP oversight. Ensure CSP contract includes ISO 27018 annex compliance.",
          check: "RACI matrix for cloud PII activities complete, CSP contracts include ISO 27018 compliance, and accountability assigned."
        },
        {
          title: "Conduct Cloud PII DPIA (Data Protection Impact Assessment)",
          control: "ISO/IEC 27018 Clause 6.1.2 & GDPR Art. 35 - DPIA for Cloud PII",
          how: "Perform DPIA for cloud PII processing: describe processing operations, assess necessity/proportionality, identify risks to data subjects (unauthorized access, loss, alteration, disclosure), evaluate CSP controls, document mitigations. Include: CSP sub-processor chain, international transfers, data subject rights enablement. Review with DPO and document sign-off.",
          check: "DPIA completed for all cloud PII processing, risks assessed with mitigations, DPO consulted, and review schedule established."
        },
        {
          title: "Map Legal Basis & Consent for Cloud PII Processing",
          control: "ISO/IEC 27018 Clause 7.2.1 & GDPR Art. 6-7 - Lawful Basis & Consent",
          how: "Document lawful basis for each cloud PII processing activity: consent, contract, legal obligation, vital interests, public task, legitimate interests. For consent: implement granular consent management in cloud platforms (OneTrust, TrustArc, custom), consent withdrawal mechanisms, consent records with timestamps. For legitimate interests: conduct LIA (Legitimate Interests Assessment).",
          check: "Lawful basis documented for all cloud PII processing, consent management operational in cloud platforms, withdrawal tested, and LIAs completed where applicable."
        }
      ]
    },
    {
      week: 2,
      title: "L2 Implementer: Cloud PII Controls Implementation",
      days: "Days 8-14",
      description:
        "Implement ISO 27018-specific controls for PII protection in cloud: data minimization, purpose limitation, security, and data subject rights.",
      tasks: [
        {
          title: "Implement Cloud Data Minimization & Purpose Limitation",
          control: "ISO/IEC 27018 Clause 9.1 - Data Minimization & Purpose Limitation",
          how: "Implement in cloud: PII field-level encryption/tokenization, pseudo-anonymization for analytics, data retention policies enforced via cloud lifecycle policies (S3 Object Lock, Azure Immutable Storage), automated PII discovery (Macie, Purview, DLP), purpose-based access controls (ABAC with purpose tags), synthetic data for non-prod environments.",
          check: "PII discovery automated across cloud stores, retention policies enforced with audit trails, purpose-based access controls implemented, and non-prod uses synthetic data."
        },
        {
          title: "Implement Cloud PII Security Controls",
          control: "ISO/IEC 27018 Clause 10-13 - Cloud PII Security",
          how: "Implement: encryption at rest with customer-managed keys (per PII category), encryption in transit (TLS 1.3), key hierarchy per PII sensitivity, cloud HSM for key protection, privileged access management for PII access (PIM/PAM), just-in-time access, session recording for PII access, database activity monitoring (DAM) for PII queries, DLP for PII exfiltration prevention.",
          check: "All PII encrypted with CMK, PIM/PAM for all PII access, DAM logging all PII queries, DLP policies blocking exfiltration, and session recording for privileged PII access."
        },
        {
          title: "Enable Cloud Data Subject Rights Automation",
          control: "ISO/IEC 27018 Clause 9.2-9.7 & GDPR Art. 12-22 - DSAR in Cloud",
          how: "Automate DSAR in cloud: centralized DSAR portal integrated with cloud identity, automated PII search across all cloud stores (using PII discovery tags), automated redaction for third-party PII, automated export in machine-readable format (JSON/CSV), deletion workflows with cascade across backups/snapshots, rectification workflows with audit trail, restriction of processing flags, data portability APIs.",
          check: "DSAR portal operational, automated search covers 100% of cloud PII stores, export/deletion/rectification workflows tested, and SLA < 30 days met."
        },
        {
          title: "Implement Cloud PII Breach Detection & Notification",
          control: "ISO/IEC 27018 Clause 14.1-14.3 & GDPR Art. 33-34 - Cloud PII Breach",
          how: "Implement: cloud-native breach detection (GuardDuty, Defender, Security Command Center for PII access anomalies), automated PII breach impact assessment (what PII, how many subjects, risk level), CSP breach notification clause enforcement (contractual 24-72hr notification), automated regulatory notification workflow (72hr GDPR, sector-specific), data subject notification templates, breach register with cloud-specific evidence.",
          check: "Breach detection rules for PII anomalies active, CSP notification clauses verified, automated notification workflows tested, and breach register maintained with cloud evidence."
        }
      ]
    },
    {
      week: 3,
      title: "L3 Operations: CSP Oversight, International Transfers & Audits",
      days: "Days 15-21",
      description:
        "Operationalize ongoing CSP oversight for PII protection, manage international transfers, and conduct cloud PII audits.",
      tasks: [
        {
          title: "Implement CSP PII Oversight & Audit Program",
          control: "ISO/IEC 27018 Clause 15 - CSP Relationship for PII",
          how: "Establish: quarterly CSP PII compliance reviews (SOC 2 + ISO 27018 attestation), CSP sub-processor monitoring (notify, assess, approve/reject), right to audit execution (annual on-site or third-party audit), CSP PII incident notification testing, CSP data return/destruction verification, CSP contract compliance tracking.",
          check: "Quarterly CSP reviews completed, sub-processor changes tracked with risk assessment, annual audit executed, incident notification tested, and destruction certificates collected."
        },
        {
          title: "Manage International PII Transfers in Cloud",
          control: "ISO/IEC 27018 Clause 11 & GDPR Ch. V - International Transfers",
          how: "Map all cloud PII transfers: CSP data center locations, sub-processor locations, backup regions, CDN edge locations. Implement transfer mechanisms: SCCs (2021 modules), BCRs, adequacy decisions, derogations. Deploy transfer impact assessments (TIAs) per Schrems II. Implement technical supplementary measures: encryption with customer-held keys, pseudonymization, split processing. Monitor regulatory changes (EU-US DPF, UK adequacy, etc.).",
          check: "All international PII transfers mapped with mechanism, TIAs completed for non-adequate countries, technical measures implemented, and regulatory change monitoring active."
        },
        {
          title: "Implement Cloud PII Retention, Archival & Destruction",
          control: "ISO/IEC 27018 Clause 9.8-9.9 - Retention & Destruction in Cloud",
          how: "Implement: automated retention policies per PII category (legal, tax, contract requirements), legal hold integration (freeze deletion), secure destruction in cloud (cryptographic erasure via key destruction, CSP secure delete APIs), destruction certificates from CSP, backup/snapshot retention alignment, archival to cold storage with encryption (Glacier, Archive Blob, Coldline).",
          check: "Retention policies automated per PII category, legal hold tested, destruction certificates collected for all deletions, backup retention aligned, and archival encrypted."
        },
        {
          title: "Conduct Cloud PII Internal Audit & Management Review",
          control: "ISO/IEC 27018 Clause 9 & ISO 27001 Clause 9.2 - Internal Audit",
          how: "Execute internal audit: audit program covering all ISO 27018 controls, audit criteria (ISO 27018, GDPR, contract, policy), audit evidence from cloud tools (CSPM, DLP, IAM logs, DAM logs), findings tracked to remediation, management review inputs (audit results, incidents, DSAR metrics, CSP performance, regulatory changes), management review outputs (decisions, resources, improvements).",
          check: "Internal audit completed per plan, findings remediated with evidence, management review conducted quarterly, and improvement actions tracked."
        }
      ]
    },
    {
      week: 4,
      title: "L4 Maturity: Continuous PII Protection Improvement",
      days: "Days 22-28",
      description:
        "Advance cloud PII protection maturity with privacy by design, advanced automation, and certification readiness.",
      tasks: [
        {
          title: "Embed Privacy by Design in Cloud Development",
          control: "ISO/IEC 27018 & GDPR Art. 25 - Privacy by Design/Default",
          how: "Implement: privacy requirements in cloud architecture reviews, PII threat modeling (LINDDUN) for new cloud services, privacy impact assessment for new cloud features, data minimization in IaC (Terraform modules with PII tags), privacy unit tests in CI/CD, privacy dashboards for developers, privacy champions in cloud teams.",
          check: "Privacy reviews in all cloud architecture decisions, LINDDUN modeling for new services, privacy tests in pipelines, and privacy champions active."
        },
        {
          title: "Advanced PII Protection Automation & AI",
          control: "ISO/IEC 27018 - Continuous Improvement",
          how: "Deploy: ML-based PII discovery/classification (Macie, Purview, custom models), automated DSAR fulfillment with AI redaction, predictive breach risk scoring for cloud PII stores, automated DPIA triggers for new cloud services, privacy-aware data catalog (DataHub, Amundsen with PII tags), synthetic data generation for ML training.",
          check: "ML PII discovery deployed, AI redaction for DSAR tested, predictive risk scoring operational, and synthetic data used for ML."
        },
        {
          title: "ISO 27018 Certification Readiness & Attestation",
          control: "ISO/IEC 27018 Certification Process",
          how: "Prepare for ISO 27018 certification: gap analysis against all controls, evidence compilation (policies, procedures, records, cloud configs, CSP contracts, audit reports), internal audit closure, Stage 1 readiness (document review), Stage 2 readiness (implementation evidence), select accredited CB, maintain certification surveillance.",
          check: "Gap analysis complete with remediation plan, evidence package compiled, internal audit passed, CB selected, and Stage 1/2 readiness confirmed."
        },
        {
          title: "Cloud PII Protection Maturity Assessment",
          control: "Organizational Cloud PII Maturity",
          how: "Assess maturity across: governance, data minimization, security, DSAR, breach, CSP oversight, transfers, retention, privacy by design, culture. Use 5-level model. Benchmark against peers. Create 3-year roadmap with investment priorities. Executive dashboard with KPIs: DSAR SLA, breach MTTR, CSP audit findings, PII coverage, training completion.",
          check: "Maturity baseline established, 3-year roadmap approved, executive dashboard live, and quarterly progress reviews scheduled."
        }
      ]
    }
  ],
};

export default function Iso27018Page() {
  return (
    <>
      <LearningFrameworkPage framework={FRAMEWORK} />
    </>
  );
}

export { FRAMEWORK };