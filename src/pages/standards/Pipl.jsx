import LearningFrameworkPage from "../../components/LearningFrameworkPage";

const FRAMEWORK = {
  id: "pipl",
  name: "PIPL (China)",
  region: "China",
  color: "red",
  flag: "🇨🇳",
  flagAnimation: "bounce",
  basePath: "/pipl",
  referenceUrl:
    "https://www.gov.cn/xinwen/2021-08/20/content_5632486.htm",
  weeks: 4,
  milestones: 3,
  hoursByLevel: [4, 8, 5, 3],
  startupGaps: [
    {
      itgc: "Data Governance",
      gap: "No Personal Information Protection Officer (PIPO) or DPO appointed as required by Art. 52",
      pushback: "We don't have operations in China; PIPL doesn't apply to us.",
      reality: "PIPL Art. 3(2) applies extraterritorially to organizations outside China that process personal information of individuals within China for goods/services provision or behavioral analysis. If you have Chinese users, you must appoint a PIPO (Art. 52) and may need to establish a dedicated entity or representative in China (Art. 53).",
      policy: "PIPO Appointment Policy, China Representative Designation Policy",
      compensating: [
        "Appoint an internal PIPO with Chinese-language capabilities and publish contact details",
        "If processing data of 1M+ individuals, establish a dedicated entity in China (Art. 53)",
        "Engage a local legal counsel for PIPO advisory support"
      ],
      leantip: "Even if you're outside China, if you process Chinese residents' data for goods/services provision, appoint a PIPO and publish their contact. For organizations processing 1M+ individuals' data, a China-based entity or representative is mandatory under Art. 53."
    },
    {
      itgc: "Consent Management",
      gap: "No separate consent mechanism for sensitive personal information and cross-border transfers",
      pushback: "We already have user consent through our terms of service.",
      reality: "PIPL Art. 23 requires SEPARATE consent for cross-border transfers. Art. 29 requires separate consent for sensitive personal information processing. Art. 14 requires consent to be given voluntarily, with full knowledge, and for specific purposes. Bundled consent in terms of service doesn't meet PIPL standards — each requires distinct, granular consent.",
      policy: "Separate Consent Policy, Sensitive Data Processing Consent Framework",
      compensating: [
        "Implement purpose-specific consent capture at each data collection point",
        "Build separate consent flows for sensitive data processing and cross-border transfers",
        "Implement consent withdrawal mechanism that propagates within 15 days"
      ],
      leantip: "PIPL's 'separate consent' (单独同意) requirement is stricter than GDPR's consent. Build distinct consent flows: one for general processing, one for sensitive data, one for cross-border transfers. Each must be separately presented and separately accepted."
    },
    {
      itgc: "Cross-Border Transfer",
      gap: "No Security Assessment, Certification, or Standard Contract for cross-border data transfers",
      pushback: "Our cloud provider handles the data; we don't need to worry about transfers.",
      reality: "PIPL Art. 38-40 require ONE of three mechanisms for cross-border transfers: (1) CAC Security Assessment (mandatory for critical information infrastructure operators or 1M+ individuals), (2) Personal Information Protection Certification, or (3) Standard Contract with the overseas recipient filed with the CAC. Simply using a cloud provider doesn't exempt you — the transfer mechanism must be in place before data leaves China.",
      policy: "Cross-Border Transfer Mechanism Policy, CAC Security Assessment Procedure",
      compensating: [
        "Conduct an initial cross-border transfer audit to identify all data flows leaving China",
        "Determine which of the three mechanisms applies based on data volume and type",
        "File Standard Contracts with CAC for transfers not requiring Security Assessment"
      ],
      leantip: "Start with a transfer inventory: for every SaaS tool processing Chinese residents' data, determine if data leaves China. If it does, you need one of the three Art. 38 mechanisms. For most startups, the Standard Contract is the most practical path."
    },
    {
      itgc: "Incident Response",
      gap: "No security incident notification process to the CAC and affected individuals",
      pushback: "We'll deal with incidents if they happen.",
      reality: "PIPL Art. 57 requires personal information handlers to take immediate remedial measures and notify affected individuals and the CAC (or relevant department) when a security incident occurs. The notification must include: cause of the incident, types of data affected, harm caused, remedial measures taken, and how individuals can protect themselves. Without a pre-built process, you'll miss the notification window and face administrative sanctions.",
      policy: "Security Incident Response Plan, CAC Notification Procedure",
      compensating: [
        "Draft a CAC notification template with all Art. 57 required fields pre-populated",
        "Assign an incident commander and backup for the notification process",
        "Pre-stage individual notification templates for affected users"
      ],
      leantip: "Fill in the CAC notification template NOW — include: incident cause, data types affected, harm assessment, remedial measures, and individual protection steps. Having it ready halves your response time during a real incident."
    },
    {
      itgc: "Data Localization",
      gap: "No data localization assessment for critical information infrastructure or large-scale processing",
      pushback: "We store data in global cloud regions; localization isn't an issue.",
      reality: "PIPL Art. 40 mandates that Critical Information Infrastructure Operators (CIIOs) and organizations processing personal information exceeding CAC-set thresholds must store personal information collected and generated in China within China. Security Assessment by the CAC is required for any outbound transfer. Even if you're not a CIIO, the CAC can designate organizations as subject to localization requirements. Assess your exposure and plan data residency accordingly.",
      policy: "Data Localization Assessment Policy, China Data Residency Plan",
      compensating: [
        "Assess whether you qualify as a CIIO or exceed processing thresholds",
        "Configure Chinese cloud regions (Alibaba Cloud China, AWS China, Azure China) for primary data storage",
        "Document a data residency architecture showing where Chinese residents' data is stored"
      ],
      leantip: "If you process data of Chinese residents, default to Chinese cloud regions (Alibaba Cloud China regions, AWS China (Ningxia/Beijing), Azure China (21Vianet)) for primary storage. This satisfies localization and simplifies cross-border transfer requirements."
    }
  ],
  privacyStartupNotes:
    "PIPL note: China's PIPL is one of the world's strictest data protection laws with extraterritorial reach. The 'separate consent' (单独同意) requirement for sensitive data and cross-border transfers is stricter than GDPR consent. The CAC Security Assessment or Standard Contract filing is mandatory for cross-border transfers — you cannot simply sign SCCs as with GDPR. PIPL also includes algorithmic recommendation regulations (Art. 24) and automated decision-making provisions that may apply to AI/ML products. Enforcement has been aggressive, with significant fines imposed on major tech companies.",
  weeksData: [
    {
      week: 1,
      title: "L1 Foundation — PIPL Principles, Roles & Data Mapping",
      description:
        "Map PIPL scope to your environment, understand personal information handlers and PIPO roles, identify lawful bases under Art. 13, and build the foundation for CAC compliance.",
      days: [
        {
          day: 1,
          title: "PIPL Scope, Extraterritorial Application & Lawful Bases (Art. 13)",
          tasks: [
            {
              title:
                "Determine PIPL applicability and map data processing activities to lawful bases under Art. 13",
              control:
                "PIPL Art. 3 (Extraterritorial Scope), Art. 13 (Lawful Bases), Art. 6 (Lawfulness)",
              how: "Inventory all processing activities across AWS, Azure, GCP, and Alibaba environments. Assess PIPL extraterritorial application: does your organization process personal information of individuals within China for goods/services provision (Art. 3(1)) or behavioral analysis (Art. 3(2))? If yes, PIPL applies. Map each processing activity to one of the seven lawful bases under Art. 13: (1) consent, (2) contract necessity, (3) statutory duty, (4) public health emergency, (5) public interest (news reporting), (6) publicly available information, and (7) other circumstances provided by law. For sensitive personal information, also assess Art. 29 separate consent requirements. Store the mapping in a central registry (DynamoDB or Azure SQL).",
              check:
                "PIPL applicability assessed with extraterritorial analysis, processing activities mapped to Art. 13 lawful bases, and registry stored in central database",
            },
            {
              title:
                "Appoint a Personal Information Protection Officer (PIPO) per Art. 52-53",
              control:
                "PIPL Art. 52 (PIPO Appointment), Art. 53 (China Representative), Art. 54 (Annual Compliance Report)",
              how: "Assess PIPO and China representative requirements. PIPL Art. 52 requires PIPO appointment by personal information handlers. Art. 53 requires organizations outside China processing Chinese residents' data to: (I) set up a dedicated entity in China, or (II) designate a representative in China, and report the entity/representative's name and contact to the CAC. PIPO responsibilities: supervise processing activities, develop protection measures, conduct compliance audits, and handle complaints. For organizations processing 1M+ individuals' data, the dedicated entity requirement under Art. 53 is mandatory. Document the appointment, contact details, and responsibilities.",
              check:
                "PIPO appointed with formal documentation, China representative or entity established if required by Art. 53, contact details published, and responsibilities defined per Art. 52",
            },
            {
              title:
                "Build a PIPL compliance register mapping data flows to Articles",
              control:
                "PIPL Art. 51 (Security Measures), Art. 54 (Compliance Audit)",
              how: "Create a PIPL compliance register as the central accountability document. For each data flow: document the purpose, categories of personal information, individuals affected, lawful basis (Art. 13), consent mechanism (including separate consent requirements), retention period, cross-border transfers, security measures, and applicable PIPL Articles. Store in DynamoDB, Azure SQL, or GCP Cloud SQL. Include fields: flow_id, purpose, data_categories, lawful_basis, consent_type, retention_days, cross_border_mechanism, security_measures, applicable_articles. Automate register updates linked to deployment processes.",
              check:
                "PIPL compliance register populated with all data flows, consent mechanisms documented, cross-border transfers mapped, and register linked to deployment pipeline",
            },
            {
              title:
                "Classify personal information including sensitive personal information (Art. 28)",
              control:
                "PIPL Art. 28 (Sensitive Personal Information), Art. 6 (Data Minimization), Art. 29 (Special Consent)",
              how: "Deploy automated data classification across all environments. For AWS: enable Amazon Macie with custom data identifiers for Chinese Resident Identity Card patterns (18-digit numbers with area code + DOB + sequence + checksum). For Azure: configure Microsoft Purview with sensitive information types for Chinese identification numbers. For GCP: deploy Cloud DLP API with custom detectors for Chinese PII. For Alibaba: configure Data Security Center. Build a classification taxonomy: ordinary personal information, sensitive personal information (Art. 28 — biometrics, religious beliefs, specific identity, medical health, financial accounts, location tracking, and personal information of minors under 14). Tag all data stores with classification labels.",
              check:
                "Automated classification running for Chinese PII patterns across all four clouds, Art. 28 sensitive personal information categories documented, and data catalog populated with locations and owners",
            },
            {
              title:
                "Define retention periods and implement automated data lifecycle controls",
              control:
                "PIPL Art. 19 (Retention Limitation), Art. 47 (Automated Deletion)",
              how: "Define retention periods per data category aligned with PIPL Art. 19's requirement that processing period is the minimum necessary. For customer data: account lifetime plus 30 days. For analytics: 12 months maximum. For access logs: 6 months. Implement automated enforcement: S3 lifecycle policies, Azure Blob lifecycle management, GCP Object Lifecycle Rules, and scheduled database purge jobs. Implement Art. 47 automated deletion when processing purpose is achieved or retention period expires. Document business justification for each retention period. For minors' personal information (under 14): implement stricter retention controls with parental consent verification.",
              check:
                "Retention schedule defined per data category, automated lifecycle enforcement configured, Art. 47 automated deletion implemented, and minors' data retention controls documented",
            },
          ],
        },
        {
          day: 2,
          title: "Separate Consent, Sensitive Data & Algorithmic Transparency",
          tasks: [
            {
              title:
                "Implement separate consent (单独同意) mechanisms for sensitive data and cross-border transfers",
              control:
                "PIPL Art. 14 (Consent Requirements), Art. 29 (Sensitive Data Separate Consent), Art. 39 (Cross-Border Separate Consent)",
              how: "Build separate consent mechanisms meeting PIPL Art. 14, 29, and 39 requirements. PIPL requires 'separate consent' (单独同意) — distinct from bundled consent — for: sensitive personal information processing (Art. 29), cross-border transfers (Art. 39), public disclosure of personal information (Art. 25), and processing of publicly available information beyond original scope (Art. 13). Implement: purpose-level consent capture with separate consent flows for each trigger, consent versioning with timestamps, proof-of-consent records (user_id, purpose, consent_state, timestamp, version, source), and withdrawal mechanism that propagates within 15 days (Art. 15). Store consent records in DynamoDB or CosmosDB with append-only logging.",
              check:
                "Separate consent mechanisms implemented for sensitive data (Art. 29) and cross-border transfers (Art. 39), consent withdrawal within 15 days, and proof-of-consent records stored",
            },
            {
              title:
                "Draft and publish a PIPL-compliant Privacy Policy with Art. 17 disclosures",
              control:
                "PIPL Art. 17 (Notification at Collection), Art. 44 (Right to Know), Art. 48 (Third-Party Disclosure)",
              how: "Create a Privacy Policy covering PIPL Art. 17 requirements: (I) name and contact of the personal information handler, (II) purposes and methods of processing, (III) types and retention periods of personal information, (IV) procedures for individuals to exercise rights (Art. 44-49), (V) how individuals can complain, and (VI) any cross-border transfers and their mechanisms. Implement purpose notifications at each data collection point. For sensitive personal information processing: provide specific notification explaining the necessity and impact on individuals' rights (Art. 30). Publish the Privacy Policy in Simplified Chinese with clear, plain-language summaries. Maintain version control with update history.",
              check:
                "Privacy Policy published in Simplified Chinese covering all Art. 17 requirements, sensitive data specific notifications under Art. 30, purpose notifications at all collection points, and version control maintained",
            },
            {
              title:
                "Implement data subject rights workflows for all PIPL Art. 44-49 rights",
              control:
                "PIPL Art. 44 (Right to Know), Art. 45 (Right to Copy/Port), Art. 46 (Right to Rectify), Art. 47 (Right to Delete)",
              how: "Build workflows for PIPL data subject rights under Art. 44-49: (I) right to know and decide (Art. 44), (II) right to restrict or refuse processing (Art. 44), (III) right to consult and copy (Art. 45), (IV) right to portability (Art. 45), (V) right to rectify and complete (Art. 46), (VI) right to delete (Art. 47), and (VII) right to request explanation of automated decision rules (Art. 24). Implement: a rights request intake system, identity verification process, data discovery across all systems, export in readable format, and response within 15 days (reasonable extension to 30 days with notification). For deletion (Art. 47): handle exceptions for legal obligations, statutory retention periods, and technical necessity. Log all activity for compliance evidence.",
              check:
                "Rights workflows implemented for all Art. 44-49 rights with 15-day SLA, automated decision explanation capability for Art. 24, and deletion exceptions documented per Art. 47",
            },
            {
              title:
                "Address PIPL Art. 24 algorithmic transparency and automated decision-making",
              control:
                "PIPL Art. 24 (Automated Decisions), Art. 24(2) (Refusal Right), Art. 24(3) (Explanation Right)",
              how: "Implement PIPL Art. 24 requirements for automated decision-making. Art. 24 requires: (I) ensure fairness and transparency of automated decision-making, (II) do not set unreasonable differential treatment in pricing/conditions, (III) individuals have the right to refuse decisions made solely by automated means, and (IV) individuals can request explanation of the decision logic. For AI/ML products: document training data sources, model logic summary, and decision criteria. Implement opt-out mechanisms for automated decisions. Build explanation capability showing how the automated decision was reached. For profiling: conduct DPIA under Art. 55 for activities significantly affecting individuals.",
              check:
                "Art. 24 automated decision-making controls implemented with fairness/transparency measures, opt-out mechanism for automated decisions, explanation capability for decision logic, and DPIA conducted for significant profiling",
            },
          ],
        },
        {
          day: 3,
          title: "Cross-Border Transfers, Localization & Incident Response",
          tasks: [
            {
              title:
                "Assess cross-border transfer mechanisms under Art. 38-40 and file Standard Contracts",
              control:
                "PIPL Art. 38 (Transfer Mechanisms), Art. 39 (Separate Consent), Art. 40 (Localization)",
              how: "Conduct a comprehensive cross-border transfer assessment. Determine which Art. 38 mechanism applies: (1) CAC Security Assessment — mandatory for CIIOs and organizations processing 1M+ individuals' data or cumulative 100K+ individuals' data or 10K+ individuals' sensitive data; (2) Personal Information Protection Certification; or (3) Standard Contract filed with the CAC. For most startups, the Standard Contract (Art. 38(3)) is the practical path. Draft and execute Standard Contracts with each overseas recipient, including: processing purpose, data categories, retention period, security measures, and Art. 39 rights enforcement. File the Standard Contract with the CAC within 10 working days of signing. Conduct the Transfer Impact Assessment required by Art. 38(1).",
              check:
                "Cross-border transfer mechanism determined (Security Assessment, Certification, or Standard Contract), Standard Contracts executed and filed with CAC, and Transfer Impact Assessment completed",
            },
            {
              title:
                "Implement data localization controls for Chinese cloud regions",
              control:
                "PIPL Art. 40 (Data Localization), CAC Security Assessment Regulations",
              how: "Implement data localization architecture for Chinese residents' personal information. For primary storage: use Chinese cloud regions (Alibaba Cloud China — Hangzhou, Shanghai, Beijing, Shenzhen; AWS China — Ningxia/Beijing via Sinnet/NWCD; Azure China — Beijing/Shanghai via 21Vianet). Configure network architecture to ensure primary data processing occurs within China. For cross-border transfers: implement controls at the China-region boundary (VPC peering restrictions, API gateway controls, data export workflows). Document the data residency architecture showing where Chinese residents' data is stored, processed, and any cross-border flows. Implement monitoring for data transfer attempts outside approved boundaries.",
              check:
                "Data localization architecture implemented with primary storage in Chinese cloud regions, cross-border transfer controls at China-region boundary, and architecture documented showing all data flows",
            },
            {
              title:
                "Build a CAC security incident notification process under Art. 57",
              control:
                "PIPL Art. 57 (Incident Notification), Art. 51 (Security Measures)",
              how: "Build an incident response process compliant with PIPL Art. 57. When a security incident occurs: (I) take immediate remedial measures to stop the incident, (II) notify affected individuals with: cause of incident, types of personal information affected, harm caused, remedial measures taken, and how individuals can protect themselves, (III) report to the CAC or relevant department. Draft notification templates for both individuals and CAC with all required Art. 57 fields pre-populated. Implement the response process: detection (SIEM alerts), triage, containment, individual notification, CAC notification, and post-incident review. Target: immediate remedial measures, individual notification as soon as practicable, CAC notification without delay.",
              check:
                "CAC notification template pre-drafted with Art. 57 fields, individual notification template prepared, incident response process documented, and test notification executed",
            },
            {
              title:
                "Implement DPIA/RIPD workflow for high-risk processing under Art. 55-56",
              control:
                "PIPL Art. 55 (DPIA Triggers), Art. 56 (DPIA Requirements), Art. 54 (Annual Report)",
              how: "Establish a DPIA workflow triggered for Art. 55 scenarios: (I) processing sensitive personal information, (II) using personal information for automated decision-making, (III) entrusting processing to third parties, (IV) cross-border transfers, (V) processing activities significantly affecting individuals, and (VI) other situations specified by the CAC. The DPIA (Art. 56) must describe: purpose and method of processing, impact on individuals' rights, security measures, and risk mitigation. For organizations processing 1M+ individuals' data: submit an annual personal information protection impact assessment report to the CAC (Art. 54). Maintain a DPIA register and update it with each new assessment. Integrate DPIA triggers into the SDLC.",
              check:
                "DPIA workflow established for all Art. 55 triggers, DPIA register maintained, annual Art. 54 report process established for 1M+ individuals threshold, and SDLC integration for automatic triggering",
            },
          ],
        },
      ],
    },
    {
      week: 2,
      title: "L2 Implementer — Technical Controls & Cloud Security per PIPL",
      description:
        "Implement cloud-native technical controls for PIPL compliance: encryption, access management, separate consent enforcement, cross-border transfer controls, and breach detection across AWS, Azure, GCP, and Alibaba.",
      days: [
        {
          day: 8,
          title: "Encryption, Access Control & Audit Logging for PIPL Compliance",
          tasks: [
            {
              title:
                "Deploy AES-256 encryption at rest across all data stores with CAC-aligned key management",
              control:
                "PIPL Art. 51 (Security Measures), Art. 8 (Security Principle)",
              how: "Enable AES-256 encryption at rest on every data store containing Chinese residents' personal information. For AWS China: enable RDS encryption (KMS CMK via Sinnet/NWCD), EBS encryption, S3 default encryption. For Alibaba Cloud China: enable RDS encryption, ESSD encryption, OSS server-side encryption with customer-managed keys (CMK). For Azure China (21Vianet): enable TDE on Azure SQL, Azure Disk Encryption, Azure Blob encryption. For GCP (if applicable): enable Cloud SQL encryption, Persistent Disk encryption. Configure KMS key rotation, access policies, and key inventory. For Chinese cloud regions: ensure KMS keys are managed within China boundaries per localization requirements.",
              check:
                "AES-256 encryption enabled on all data stores in Chinese cloud regions, KMS keys managed within China, rotation configured, and access policies documented",
            },
            {
              title:
                "Implement RBAC with PIPL-aligned least-privilege access controls",
              control:
                "PIPL Art. 51 (Security Measures), Art. 6 (Minimum Necessary Principle)",
              how: "Deploy role-based access control with PIPL-aligned least-privilege across all environments. For Alibaba Cloud China: configure RAM roles with policy-based access, implement RAM groups for batch assignment, enforce MFA for all RAM users. For AWS China: create IAM roles with permission boundaries, use IAM Identity Center for SSO. For Azure China: configure Entra ID RBAC with PIM for privileged access. Implement automated quarterly access reviews. Document role inventory, permission grants, approval process, and review schedule. For PIPL compliance: ensure access is limited to the minimum necessary for each role's functions (Art. 6).",
              check:
                "RBAC deployed across all Chinese cloud environments with least-privilege roles, automated quarterly access reviews, and role inventory documented per Art. 6 minimum necessary principle",
            },
            {
              title:
                "Configure comprehensive audit logging with immutable storage in China regions",
              control:
                "PIPL Art. 51 (Security Measures), Art. 54 (Compliance Audit)",
              how: "Configure audit logging across all Chinese cloud environments. For Alibaba Cloud China: enable ActionTrail for all regions, deliver to OSS with versioning and retention, configure alerting for critical API events. For AWS China: enable CloudTrail in Ningxia/Beijing regions, deliver to centralized S3 bucket with Object Lock. For Azure China: enable Activity Logs and Entra ID audit logs, archive to immutable Blob Storage. For GCP: enable Cloud Audit Logs. Configure alerting for: root login, RAM/IAM policy changes, security group modifications, data access anomalies. Retain logs for minimum 12 months for Art. 54 compliance audit readiness. Implement immutable log storage to prevent tampering.",
              check:
                "Audit logging enabled across all Chinese cloud regions with immutable storage, critical event alerting configured, and logs retained for minimum 12 months",
            },
            {
              title:
                "Deploy WAF and network security controls for Chinese cloud environments",
              control:
                "PIPL Art. 51 (Security Measures), Art. 8 (Security Principle)",
              how: "Deploy web application firewalls for all public-facing endpoints in Chinese cloud environments. For Alibaba Cloud: configure Anti-DDoS Pro and Web Application Firewall with OWASP rule sets. For AWS China: configure AWS WAF with managed rule groups. For Azure China: configure Azure Front Door WAF. Implement network security groups (NSGs), VPC isolation, and PrivateLink for service-to-service communication. Enable VPC Flow Logs for monitoring. Configure DDoS protection. Document the network security architecture and WAF rule sets for PIPL Art. 51 security evidence.",
              check:
                "WAF deployed for all public endpoints in Chinese cloud regions, network segmentation documented, VPC Flow Logs enabled, and DDoS protection configured",
            },
          ],
        },
        {
          day: 12,
          title: "Separate Consent Enforcement, Data Discovery & Classification",
          tasks: [
            {
              title:
                "Implement automated separate consent enforcement across all processing pipelines",
              control:
                "PIPL Art. 14 (Consent), Art. 29 (Sensitive Data), Art. 39 (Cross-Border)",
              how: "Build automated consent enforcement that checks consent state before processing. For general processing: verify Art. 14 consent exists before processing personal information. For sensitive data: verify Art. 29 separate consent exists before processing biometrics, health, financial, or location data. For cross-border transfers: verify Art. 39 separate consent exists before any outbound data transfer. Implement middleware that validates consent state at API boundaries. For marketing: integrate with email platforms to suppress users without marketing consent. Store consent records in append-only logs. Implement withdrawal propagation within 15 days across all downstream systems.",
              check:
                "Consent enforcement implemented for general processing (Art. 14), sensitive data (Art. 29), and cross-border transfers (Art. 39); withdrawal propagation within 15 days verified",
            },
            {
              title:
                "Deploy automated PII discovery for Chinese personal information patterns",
              control:
                "PIPL Art. 51 (Security Measures), Art. 6 (Data Minimization)",
              how: "Implement automated PII discovery tuned for Chinese data patterns. For AWS: configure Amazon Macie with custom data identifiers for Chinese Resident Identity Card (18-digit: 6 area + 8 DOB + 3 sequence + 1 checksum), Chinese passport numbers, and Chinese phone numbers (+86). For Alibaba Cloud: configure Data Security Center for Chinese PII patterns. For Azure: configure Microsoft Purview with sensitive information types for Chinese identification. For GCP: deploy Cloud DLP API with custom detectors. Schedule recurring discovery jobs. Build a data catalog mapping Chinese PII to systems, owners, retention periods, and applicable PIPL Articles.",
              check:
                "Automated PII discovery running for Chinese patterns across all four clouds, data catalog populated with PII locations and owners, and recurring scan schedule documented",
            },
            {
              title:
                "Configure DLP policies to prevent unauthorized Chinese personal information exposure",
              control:
                "PIPL Art. 51 (Security Measures), Art. 10 (No Illegal Processing)",
              how: "Deploy DLP policies to prevent unauthorized exposure of Chinese residents' personal information. For AWS: enable Macie automated remediation for public S3 buckets containing Chinese PII. For Alibaba Cloud: configure Data Security Center DLP policies for OSS and RDS. For Azure: configure Purview DLP policies for Exchange, SharePoint, OneDrive. For GCP: deploy Cloud DLP API for real-time inspection. Define response actions: block external sharing, alert on bulk exports, quarantine sensitive files. Implement automated remediation for critical DLP violations (public bucket with identity card numbers). Configure DLP findings export to compliance dashboards.",
              check:
                "DLP policies deployed across all clouds with automated remediation for critical violations, external sharing blocked, and DLP findings exported for compliance reporting",
            },
            {
              title:
                "Implement data masking for non-production environments with Chinese PII protection",
              control:
                "PIPL Art. 51 (Security Measures), Art. 6 (Minimum Necessary)",
              how: "Implement data masking for non-production environments. For staging: use data masking via AWS DMS transformation, Azure Dynamic Data Masking, GCP Cloud DLP de-identification, or Alibaba Data Security Center masking. For development: deploy synthetic data generators for Chinese-specific data (identity cards, names, addresses, phone numbers). Enforce policy: no production Chinese PII in development; staging uses masked data only. Configure automated verification scans to ensure no unmasked Chinese PII exists in non-production environments.",
              check:
                "Data masking configured for all non-production environments, synthetic data generators deployed for Chinese PII, and policy enforced with verification scans",
            },
          ],
        },
        {
          day: 18,
          title: "Cross-Border Transfer Controls, Localization Enforcement & Breach Response",
          tasks: [
            {
              title:
                "Implement technical controls to enforce data localization and cross-border transfer boundaries",
              control:
                "PIPL Art. 40 (Localization), Art. 38 (Transfer Mechanisms)",
              how: "Implement technical controls enforcing data localization and cross-border transfer boundaries. For Alibaba Cloud China: configure RAM policies restricting data export to approved cross-border transfer workflows only. For AWS China: use Organizations SCPs to restrict data movement. Configure API gateway controls to intercept and log all data leaving Chinese regions. Implement data export workflows with approval gates for authorized cross-border transfers. Monitor VPC Flow Logs for unexpected outbound data flows. Configure alerts for: data transfer attempts to non-Chinese regions without Standard Contract filing, bulk data export from Chinese regions, and new cross-border data flows.",
              check:
                "Data localization controls enforced across Chinese cloud regions, cross-border transfer workflows with approval gates, monitoring for unauthorized transfers, and alerting configured",
            },
            {
              title:
                "Build DSAR automation for PIPL rights within 15-day SLA",
              control:
                "PIPL Art. 44-49 (Individual Rights), Art. 45 (Portability)",
              how: "Automate the PIPL rights request process. For consultation/copy (Art. 45): implement data discovery across all systems, export in readable format, and respond within 15 days. For portability (Art. 45): implement data export in commonly used format for transfer to another handler. For rectification (Art. 46): implement correction propagation across all systems with third-party notification. For deletion (Art. 47): implement cascading deletion with documented exceptions. For automated decision explanation (Art. 24): implement explanation capability for algorithmic decisions. Build a tracking system with SLA monitoring. Log all activity for Art. 54 compliance audit evidence.",
              check:
                "DSAR automation deployed for all Art. 44-49 rights, 15-day SLA tracking operational, automated decision explanation capability implemented, and activity logged for compliance audit",
            },
            {
              title:
                "Implement breach detection and Art. 57 notification automation",
              control:
                "PIPL Art. 57 (Incident Notification), Art. 51 (Security Measures)",
              how: "Deploy breach detection and notification automation. Configure SIEM with detection rules for Chinese personal information threats: unauthorized access to identity card databases, mass data download from personal information stores, and credential compromise affecting personal information access. Implement automated breach assessment: determine severity, affected individuals count, data types impacted, and harm potential. Configure automated CAC notification form population with Art. 57 required fields. Implement individual notification system with Chinese-language templates. Track notification SLAs from detection to completion.",
              check:
                "Breach detection configured for Chinese PII threats, automated breach assessment deployed, CAC notification form auto-populated, and individual notification system operational",
            },
            {
              title:
                "Configure CSPM for PIPL compliance baselines across Chinese cloud regions",
              control:
                "PIPL Art. 51 (Security Measures), Art. 54 (Compliance Audit)",
              how: "Deploy cloud security posture management for Chinese cloud regions. For Alibaba Cloud: enable Security Center and Cloud Config with compliance rules for encryption, access control, and logging. For AWS China: enable Security Hub with FSBP and Config Rules. For Azure China: enable Defender for Cloud. Map CSPM findings to PIPL Art. 51 security requirements. Configure automated remediation for critical findings. Build compliance dashboards tracking PIPL security posture. Generate compliance reports for PIPO and management.",
              check:
                "CSPM deployed across Chinese cloud regions with PIPL-mapped baselines, automated remediation, compliance dashboards, and reporting for PIPO",
            },
          ],
        },
        {
          day: 25,
          title: "Algorithmic Transparency, Children's Data & Vendor Management",
          tasks: [
            {
              title:
                "Implement Art. 24 algorithmic transparency and automated decision-making controls",
              control:
                "PIPL Art. 24 (Automated Decisions), Art. 24(2-3) (Refusal and Explanation)",
              how: "Build comprehensive automated decision-making controls for PIPL Art. 24 compliance. Document all automated decision systems: algorithmic recommendation engines, credit scoring, content filtering, pricing algorithms, and behavioral profiling. For each system: document the decision logic, training data sources, fairness measures, and potential impact on individuals. Implement opt-out mechanisms allowing individuals to refuse purely automated decisions. Build explanation capability: for each automated decision, generate a human-readable explanation of the factors that contributed to the decision. Implement regular fairness audits using automated tools. For AI/ML products: conduct model bias testing and document results.",
              check:
                "All automated decision systems documented with logic and fairness measures, opt-out mechanism operational, explanation capability implemented, and regular fairness audits scheduled",
            },
            {
              title:
                "Implement enhanced protections for minors' personal information (Art. 31)",
              control:
                "PIPL Art. 31 (Minors' Data — Under 14), Art. 28 (Sensitive Data — Minors)",
              how: "Implement enhanced protections for personal information of minors under 14 as required by PIPL Art. 31. Implement: age-verification mechanisms at registration, parental consent capture flow for users identified as under 14, restricted data processing limited to what is necessary for the minor's benefit, enhanced security controls (encryption, access restrictions, audit logging), and dedicated retention policies with shorter periods. Store minors' personal information separately from adult data where practicable. Implement parental rights to access, correct, and delete their children's personal information. Document the Art. 31 compliance architecture and parental consent workflow.",
              check:
                "Age verification implemented, parental consent flow for under-14 users operational, enhanced security controls for minors' data, and Art. 31 compliance architecture documented",
            },
            {
              title:
                "Implement vendor management and third-party processing controls under Art. 21-22",
              control:
                "PIPL Art. 21 (Entrusted Processing), Art. 22 (Joint Processing), Art. 23 (Third-Party Sharing)",
              how: "Build vendor management controls for PIPL Art. 21-23. For entrusted processing (Art. 21): execute processing agreements specifying purpose, duration, method, data types, security measures, and rights/obligations. Verify the entrustee processes only on documented instructions. For joint processing (Art. 22): define respective responsibilities in the agreement and inform individuals. For third-party sharing (Art. 23): obtain separate consent before sharing personal information with third parties, inform individuals of the sharing recipient's name, contact, processing purpose, and data types. Maintain a vendor register with processing agreements, data flow mappings, and Art. 23 consent records for each third-party sharing arrangement.",
              check:
                "Vendor register maintained with Art. 21 processing agreements, Art. 22 joint processing agreements, Art. 23 third-party sharing consent records, and individual notification for all sharing",
            },
            {
              title:
                "Implement Art. 58 certification and compliance audit mechanisms",
              control:
                "PIPL Art. 58 (Certification), Art. 54 (Compliance Audit), Art. 56 (DPIA)",
              how: "Establish compliance audit and certification mechanisms. For Art. 54 annual compliance report: if processing 1M+ individuals' data, submit annual personal information protection impact assessment report to the CAC. For Art. 58 certification: consider obtaining Personal Information Protection Certification from a recognized institution (optional but strengthens compliance posture). Build internal compliance audit processes: quarterly self-assessments against PIPL Articles, annual comprehensive audit, and continuous monitoring via CSPM tools. Document the audit methodology, findings, and remediation actions. Maintain audit evidence for a minimum of 3 years.",
              check:
                "Annual compliance report process established for Art. 54 threshold, certification considered, quarterly self-assessments scheduled, and audit evidence maintained for 3+ years",
            },
          ],
        },
      ],
    },
    {
      week: 3,
      title: "L3 Verifier — Testing PIPL Controls & Evidence Collection",
      description:
        "Execute comprehensive testing of PIPL controls: separate consent validation, DSAR response testing, cross-border transfer audit, breach notification drill, encryption verification, and compliance assessment.",
      days: [
        {
          day: 35,
          title: "Separate Consent Testing & DSAR Validation",
          tasks: [
            {
              title:
                "Audit separate consent records for completeness, accuracy, and withdrawal propagation",
              control:
                "PIPL Art. 14 (Consent), Art. 29 (Sensitive Data), Art. 39 (Cross-Border)",
              how: "Audit the separate consent system against PIPL requirements. Verify: separate consent records exist for sensitive personal information processing (Art. 29), cross-border transfers (Art. 39), and other Art. 14 triggers. Verify consent is voluntary, with full knowledge, and for specific purposes. Verify consent withdrawal propagates within 15 days. Test consent enforcement: attempt sensitive data processing without separate consent and verify blocking. Test cross-border transfer without Art. 39 consent and verify blocking. Document audit findings and any gaps in consent capture, storage, or enforcement.",
              check:
                "Separate consent audit completed for Art. 29 and Art. 39 triggers, withdrawal propagation tested within 15 days, consent enforcement validated, and gaps documented with remediation",
            },
            {
              title:
                "Execute end-to-end DSAR response test for all PIPL Art. 44-49 rights",
              control:
                "PIPL Art. 44-49 (Individual Rights), Art. 45 (Portability)",
              how: "Execute complete DSAR response tests for all PIPL rights. For right to know (Art. 44): verify processing information is disclosed. For consultation/copy (Art. 45): verify data export in readable format within 15 days. For portability (Art. 45): verify data export in commonly used format. For rectification (Art. 46): verify correction propagates across all systems with third-party notification. For deletion (Art. 47): verify cascading deletion with exceptions documented. For automated decision explanation (Art. 24): verify explanation of decision logic. Measure response time per right and confirm within 15-day SLA. Document edge cases: deletion of data with legal retention, rectification of data shared with third parties.",
              check:
                "End-to-end DSAR tests completed for all Art. 44-49 rights within 15-day SLA, portability export tested, automated decision explanation verified, and edge cases documented",
            },
            {
              title:
                "Test cross-border transfer controls and Standard Contract compliance",
              control:
                "PIPL Art. 38-40 (Cross-Border Transfers), Art. 39 (Separate Consent)",
              how: "Test cross-border transfer controls and Standard Contract compliance. Verify: Standard Contracts are executed with all overseas recipients, contracts are filed with CAC within 10 working days, Art. 39 separate consent is obtained before each transfer, and Transfer Impact Assessments are completed. Test technical controls: attempt unauthorized data export from Chinese regions and verify blocking, verify monitoring detects cross-border transfers, and verify approved transfers are logged. Test monitoring: review VPC Flow Logs for cross-border traffic, verify transfer register matches actual data flows. Document test results and any control gaps.",
              check:
                "Cross-border transfer controls tested with unauthorized exports blocked, Standard Contract compliance verified, Art. 39 consent validated, and monitoring confirmed operational",
            },
            {
              title:
                "Test algorithmic transparency controls and Art. 24 automated decision explanations",
              control:
                "PIPL Art. 24 (Automated Decisions), Art. 24(3) (Explanation Right)",
              how: "Test automated decision-making controls for PIPL Art. 24 compliance. For each automated decision system: verify opt-out mechanism works (individual can refuse purely automated decisions), verify explanation capability generates human-readable explanations of decision logic, verify fairness measures are documented, and verify regular bias audits have been conducted. Test the opt-out: submit an opt-out request and verify the system switches to human review. Test the explanation: submit an explanation request and verify the response describes the factors contributing to the decision. Document test results and any gaps in transparency controls.",
              check:
                "Automated decision opt-out mechanism tested and confirmed working, explanation capability verified for all automated systems, and fairness audit results documented",
            },
          ],
        },
        {
          day: 42,
          title: "Security Controls Audit & Breach Response Drill",
          tasks: [
            {
              title:
                "Execute encryption audit and key rotation verification across Chinese cloud regions",
              control:
                "PIPL Art. 51 (Security Measures), Art. 8 (Security Principle)",
              how: "Conduct comprehensive encryption audit across Chinese cloud regions. Verify encryption at rest on all data stores: Alibaba RDS, AWS China RDS, Azure China SQL, GCP Cloud SQL, and all object/block storage. Verify TLS 1.3 enforcement on all endpoints. Verify key rotation has executed on schedule for all customer-managed keys. Verify KMS keys are managed within Chinese boundaries per localization requirements. Document any unencrypted data stores and create remediation plans. Evidence of Art. 51 'necessary security measures' requires encryption across all personal information stores.",
              check:
                "Encryption audit completed for all data stores in Chinese cloud regions, key rotation verified, KMS key locality confirmed, and exceptions documented with remediation plans",
            },
            {
              title:
                "Conduct access reviews and test RBAC enforcement across Chinese cloud environments",
              control:
                "PIPL Art. 51 (Security Measures), Art. 6 (Minimum Necessary)",
              how: "Execute access reviews across all Chinese cloud environments. For each system: export user access list, identify dormant accounts (no login in 90+ days), verify role assignments against job functions, validate privilege levels, and confirm least privilege compliance. Use Alibaba RAM access review tools, AWS IAM Access Analyzer, Azure AD Access Reviews, and GCP IAM Recommender. Test RBAC enforcement: attempt unauthorized access to personal information stores from non-privileged accounts and verify blocking. Document review findings and remediation for over-privileged access.",
              check:
                "Access reviews executed across Chinese cloud environments, RBAC enforcement tested with unauthorized access attempts blocked, and over-privileged access remediated",
            },
            {
              title:
                "Execute a full CAC incident notification drill under Art. 57",
              control:
                "PIPL Art. 57 (Incident Notification), Art. 51 (Security Measures)",
              how: "Execute a full incident response drill simulating a security incident requiring CAC notification. Scenario: unauthorized access to a database containing Chinese Resident Identity Card numbers. Pre-drill: confirm response team availability, CAC notification template is current, and communication channels tested. During drill: detect incident via SIEM, take immediate remedial measures, draft individual notification with Art. 57 required fields, draft CAC notification, and measure time from detection to notification readiness. Post-drill: document lessons learned, update procedures, schedule next drill. Verify notifications include: cause, data types, harm, remedial measures, and individual protection steps.",
              check:
                "CAC notification drill executed with Art. 57 fields populated, immediate remedial measures demonstrated, individual notification drafted, and lessons learned documented",
            },
            {
              title:
                "Test WAF, IDS/IPS, and network security controls in Chinese cloud regions",
              control:
                "PIPL Art. 51 (Security Measures), Art. 8 (Security Principle)",
              how: "Test perimeter and network security in Chinese cloud environments. For WAF: execute attack simulations against protected endpoints, verify OWASP payloads blocked. For IDS/IPS: execute port scans and verify detection. For network segmentation: verify VPC isolation prevents cross-tier unauthorized communication, confirm PrivateLink is functioning. Document test results, false positive/negative rates, and control tuning. For Chinese cloud regions: verify Alibaba Anti-DDoS and WAF configurations meet PIPL Art. 51 requirements.",
              check:
                "WAF tested with attack payloads blocked, IDS/IPS detection verified, network segmentation validated, and Chinese cloud security configurations documented",
            },
          ],
        },
        {
          day: 48,
          title: "DPIA Review, Localization Audit & Compliance Assessment",
          tasks: [
            {
              title:
                "Review DPIA assessments for quality and completeness against Art. 55-56",
              control:
                "PIPL Art. 55 (DPIA Triggers), Art. 56 (DPIA Requirements), Art. 54 (Annual Report)",
              how: "Review all completed DPIA assessments against Art. 55-56 requirements. Verify each DPIA covers: purpose and method of processing, impact on individuals' rights, security measures, and risk mitigation. Verify high-risk processing (Art. 55 triggers) has received PIPO sign-off. Identify any processing activities requiring DPIA but not yet assessed. For organizations above 1M individuals threshold: verify the annual Art. 54 compliance report is being prepared. Update DPIA register with current status. Document review findings and quality improvements needed.",
              check:
                "All DPIA assessments reviewed against Art. 55-56 requirements, PIPO sign-off confirmed, Art. 54 report preparation underway if applicable, and gaps documented",
            },
            {
              title:
                "Audit data localization architecture and cross-border transfer register",
              control:
                "PIPL Art. 40 (Localization), Art. 38 (Transfer Mechanisms)",
              how: "Audit data localization architecture verifying Chinese residents' personal information is stored and processed within China as required by Art. 40 (for CIIOs and large-scale processors). Verify: primary data stores are in Chinese cloud regions, cross-border transfers use approved mechanisms (Security Assessment, Certification, or Standard Contract), Standard Contracts are filed with CAC, and monitoring detects unauthorized outbound transfers. Verify the cross-border transfer register is complete and current. Document any transfers that need additional mechanisms or remediation.",
              check:
                "Data localization verified with primary storage in Chinese regions, cross-border transfers use approved mechanisms, Standard Contracts filed with CAC, and transfer register current",
            },
            {
              title:
                "Execute compliance gap analysis against PIPL and CAC regulations",
              control:
                "PIPL Articles 1-74, CAC Regulations on Data Security Assessment",
              how: "Conduct comprehensive PIPL compliance gap analysis against all PIPL Articles and relevant CAC regulations. For each Article: map current controls, identify gaps, assess risk level, and prioritize remediation. Focus on areas with enforcement precedent: data localization (Art. 40), cross-border transfers (Art. 38-39), algorithmic recommendations (Art. 24), separate consent (Art. 14, 29, 39), and incident notification (Art. 57). Reference CAC enforcement actions and published guidance. Document the gap analysis with prioritized remediation roadmap and compliance scoring.",
              check:
                "PIPL compliance gap analysis completed against all Articles with gaps identified, risk assessment for each, and prioritized remediation roadmap documented",
            },
            {
              title:
                "Build PIPL compliance evidence package for CAC inquiry readiness",
              control:
                "PIPL Art. 54 (Compliance Audit), Art. 51 (Security Measures)",
              how: "Assemble comprehensive PIPL compliance evidence package. Include: (1) PIPL compliance register, (2) Privacy Policy in Simplified Chinese, (3) Separate consent records for Art. 29 and Art. 39, (4) DSAR response records, (5) DPIA assessments, (6) Security measures documentation, (7) Cross-border transfer register with Standard Contracts, (8) Incident response records, (9) Vendor processing agreements (Art. 21-23), (10) PIPO appointment documentation, (11) Annual Art. 54 report (if applicable), (12) Algorithmic transparency documentation (Art. 24), (13) Training records. Store in secure, version-controlled repository.",
              check:
                "PIPL compliance evidence package assembled with all 13 categories, stored securely, and retrieval process documented for CAC inquiry",
            },
          ],
        },
      ],
    },
    {
      week: 4,
      title: "L4 Certified — Multi-Cloud PIPL Compliance & Continuous Monitoring",
      description:
        "Master PIPL controls across AWS, Azure, GCP, and Alibaba Cloud, implement continuous compliance monitoring, address common CAC findings, and establish ongoing PIPL compliance.",
      days: [
        {
          day: 55,
          title: "Multi-Cloud Environment Segregation & PIPL Data Isolation",
          tasks: [
            {
              title:
                "Implement environment isolation with Chinese personal information segregation",
              control:
                "PIPL Art. 51 (Security Measures), Art. 6 (Minimum Necessary)",
              how: "Implement strict environment isolation for Chinese residents' personal information. For Alibaba Cloud China: separate resource groups per environment, RAM policies preventing cross-environment access. For AWS China: separate accounts per environment with SCPs. For Azure China: separate subscriptions with Azure Policy isolation. For GCP: separate projects with Organization Policy constraints. Enforce data segregation: production uses real personal information, staging uses masked data, development uses synthetic data only. Document architecture and isolation controls.",
              check:
                "Environment isolation implemented across all Chinese cloud environments, personal information segregated by environment, and architecture documented",
            },
            {
              title:
                "Deploy automated PIPL compliance dashboards with continuous monitoring",
              control:
                "PIPL Art. 54 (Compliance Audit), Art. 51 (Security Measures)",
              how: "Build continuous compliance monitoring dashboards. Key metrics: breach notification SLA (immediate remedial + timely notification), DSAR SLA (15 days), separate consent coverage, encryption compliance rate, cross-border transfer register currency, DPIA completion rate, and algorithmic transparency coverage. Implement using cloud-native BI tools. Configure automated weekly compliance reports for PIPO. Include trend analysis. Set up alerting for metric thresholds approaching limits.",
              check:
                "PIPL compliance dashboard deployed with key metrics, weekly reports for PIPO, trend analysis, and alerting for threshold breaches",
            },
            {
              title:
                "Implement automated evidence collection for CAC audit readiness",
              control:
                "PIPL Art. 54 (Compliance Audit), Art. 51 (Security Measures)",
              how: "Automate evidence collection for CAC audit readiness. Collect: encrypted data store inventory, access review records, consent records, DSAR logs, DPIA assessments, breach records, cross-border transfer register, vendor agreements, algorithmic transparency documentation, training records, and annual compliance report. Implement automated collection using scheduled scripts. Store in immutable repository. Organize evidence by PIPL Article for easy retrieval.",
              check:
                "Automated evidence collection implemented for all PIPL compliance domains, evidence stored in immutable repository, and retrieval process documented",
            },
            {
              title:
                "Establish ongoing PIPL training and awareness program",
              control:
                "PIPL Art. 51 (Security Measures), Art. 52 (PIPO Responsibilities)",
              how: "Establish PIPL training program with role-specific modules. (1) PIPL fundamentals for all employees — principles, individual rights, breach reporting. (2) Developer training — secure coding, data minimization, algorithmic fairness. (3) Operations training — access control, localization, incident response. (4) Business training — consent management, cross-border transfers, vendor management. Implement: onboarding, quarterly refreshers, annual comprehensive review. Track completion and scores. Document for Art. 54 compliance audit evidence.",
              check:
                "PIPL training program documented with role-specific modules, delivery scheduled, completion tracking operational, and records maintained for compliance audit",
            },
          ],
        },
        {
          day: 60,
          title: "Alibaba Cloud China PIPL Controls & Common CAC Findings",
          tasks: [
            {
              title:
                "Configure Alibaba Cloud China ActionTrail, Security Center & Config for PIPL",
              control:
                "PIPL Art. 51 (Security Measures), Art. 54 (Compliance Audit)",
              how: "Configure Alibaba Cloud China security controls for PIPL compliance. Enable ActionTrail for all China regions with OSS delivery and integrity validation. Enable Security Center for vulnerability scanning, baseline checks, and threat detection. Enable Cloud Config for resource compliance monitoring with rules for: storage encryption, network security, access control, and logging. Configure RAM: least-privilege policies, MFA, password policies, quarterly access reviews. Configure KMS: customer master keys, automatic rotation, access policies. Document the Alibaba Cloud China PIPL compliance configuration.",
              check:
                "Alibaba Cloud China ActionTrail, Security Center, and Config enabled for PIPL compliance, RAM and KMS configured, and compliance documented",
            },
            {
              title:
                "Configure AWS China (Ningxia/Beijing) PIPL-aligned security controls",
              control:
                "PIPL Art. 51 (Security Measures), Art. 8 (Security Principle)",
              how: "Configure AWS China security controls. Enable CloudTrail in Ningxia/Beijing regions with centralized delivery. Enable Config Rules for encryption, access control, and logging requirements. Enable GuardDuty for threat detection. Enable Security Hub for centralized posture management. Configure IAM with least-privilege roles and SSO. Document the AWS China PIPL compliance configuration and cross-cloud integration with Alibaba Cloud China.",
              check:
                "AWS China security controls configured with CloudTrail, Config, GuardDuty, and Security Hub; IAM with least-privilege; and compliance documented",
            },
            {
              title:
                "Configure Azure China (21Vianet) PIPL-aligned security controls",
              control:
                "PIPL Art. 51 (Security Measures), Art. 54 (Compliance Audit)",
              how: "Configure Azure China (21Vianet) security controls. Enable Defender for Cloud with Standard tier. Enable Sentinel with data connectors and PIPL-focused analytics rules. Enable Azure Policy for compliance baselines. Configure Entra ID with RBAC and PIM. Document the Azure China PIPL compliance configuration.",
              check:
                "Azure China security controls configured with Defender, Sentinel, Azure Policy, and Entra ID; PIPL compliance documented",
            },
            {
              title:
                "Document common CAC findings and create remediation playbook",
              control:
                "PIPL Art. 51-74, CAC Enforcement Regulations",
              how: "Compile remediation playbook for common CAC findings: missing PIPO appointment (remediate: appoint per Art. 52), no China representative (remediate: establish per Art. 53), inadequate separate consent (remediate: implement Art. 14/29/39 flows), no cross-border transfer mechanism (remediate: file Standard Contract per Art. 38), inadequate security measures (remediate: implement Art. 51 encryption and access controls), no DPIA for high-risk processing (remediate: establish Art. 55 workflow), no incident notification process (remediate: build Art. 57 process), missing algorithmic transparency (remediate: implement Art. 24 controls). Document each with root cause, remediation, prevention, and detection.",
              check:
                "CAC findings playbook documented with 8+ common findings, remediation steps, prevention controls, and playbook reviewed by PIPO and legal team",
            },
          ],
        },
        {
          day: 65,
          title: "Multi-Cloud PIPL Controls Integration & Hardening",
          tasks: [
            {
              title:
                "Implement cross-cloud PIPL compliance orchestration across all four providers",
              control:
                "PIPL Art. 51 (Security Measures), Art. 54 (Compliance Audit)",
              how: "Implement cross-cloud PIPL compliance orchestration. Centralize compliance monitoring across Alibaba Cloud China, AWS China, Azure China, and GCP. Configure: centralized SIEM aggregating logs from all clouds, unified CSPM dashboard with PIPL-specific baselines, cross-cloud access review automation, and unified evidence collection pipeline. Implement compliance scoring per cloud provider and aggregate into overall PIPL compliance score. Configure cross-cloud alerting for: encryption failures, access anomalies, cross-border transfer violations, and consent enforcement gaps.",
              check:
                "Cross-cloud PIPL compliance orchestration implemented with centralized SIEM, unified CSPM, cross-cloud access reviews, and aggregated compliance scoring",
            },
            {
              title:
                "Apply CIS Benchmark hardening to all Chinese cloud infrastructure",
              control:
                "PIPL Art. 51 (Security Measures), Art. 8 (Security Principle)",
              how: "Apply CIS Benchmark hardening to all infrastructure in Chinese cloud regions. For Alibaba Cloud: apply CIS Alibaba Cloud Foundation Benchmark. For AWS China: apply CIS AWS Foundations Benchmark. For Azure China: apply CIS Azure Foundations Benchmark. For GCP: apply CIS GCP Foundation Benchmark. For Kubernetes: run kube-bench for CIS Kubernetes Benchmark. Document hardening standards, scan results, and exceptions. Configure automated drift detection for deviation from hardened baselines.",
              check:
                "CIS Benchmarks applied to all Chinese cloud environments, scan results documented, exceptions justified, and drift detection configured",
            },
            {
              title:
                "Conduct PIPL compliance tabletop exercise with executive team",
              control:
                "PIPL Art. 54 (Compliance Audit), Art. 57 (Incident Notification)",
              how: "Conduct tabletop exercise simulating a CAC investigation. Scenario: CAC contacts regarding a data breach affecting Chinese residents. Walk through: initial CAC inquiry response, evidence gathering, notification compliance verification, DSAR handling review, consent management audit, and cross-border transfer compliance review. Identify gaps in compliance package. Update procedures. Document exercise results and improvement actions.",
              check:
                "Tabletop exercise completed with executive team, gaps identified, improvement actions documented, and procedures updated",
            },
            {
              title:
                "Build final PIPL compliance scorecard and continuous improvement plan",
              control:
                "PIPL Art. 54 (Compliance Audit), Art. 51 (Security Measures)",
              how: "Build a comprehensive PIPL compliance scorecard assessing compliance across all 74 Articles. For each applicable Article: rate compliance status (compliant, partially compliant, non-compliant), document evidence, and assign improvement actions with owners and timelines. Calculate overall PIPL compliance percentage. Identify top 10 improvement priorities. Create a 12-month continuous improvement plan with quarterly milestones. Document the scorecard, improvement plan, and governance process for ongoing PIPL compliance maintenance.",
              check:
                "PIPL compliance scorecard completed with all applicable Articles assessed, 12-month improvement plan documented, and governance process established for ongoing compliance",
            },
          ],
        },
      ],
    },
  ],
};

export default function Pipl() {
  return <LearningFrameworkPage framework={FRAMEWORK} />;
}

export { FRAMEWORK };
