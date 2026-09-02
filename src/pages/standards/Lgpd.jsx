import LearningFrameworkPage from "../../components/LearningFrameworkPage";

const FRAMEWORK = {
  id: "lgpd",
  name: "LGPD (Lei Geral de Proteção de Dados)",
  region: "Brazil",
  color: "green",
  flag: "🇧🇷",
  flagAnimation: "bounce",
  basePath: "/lgpd",
  referenceUrl:
    "https://www.planalto.gov.br/ccivil_03/_ato2015-2018/2018/lei/l13709.htm",
  weeks: 4,
  milestones: 3,
  hoursByLevel: [4, 8, 5, 3],
  startupGaps: [
    {
      itgc: "Data Governance",
      gap: "No distinction between controller (controlador) and operator (operador) roles in vendor contracts",
      pushback: "Our cloud providers handle everything; we don't need to separate roles.",
      reality: "LGPD Art. 5 defines controller and operator as distinct roles with different obligations. Misclassifying your processor relationships means your DPAs lack required clauses and the ANPD can hold you liable for processor breaches.",
      policy: "Data Processing Roles Policy, Vendor Data Processing Agreement (DPA) Template",
      compensating: [
        "Use standard DPA templates that explicitly assign controller/operator responsibilities",
        "Tag each vendor in a register with their role (controller, operator, joint controller)",
        "Start with a one-page role matrix covering your top 5 data processors"
      ],
      leantip: "Create a vendor register with two columns — 'Controller' and 'Operator' — and tag each vendor. Ensure every DPA includes LGPD Art. 39 operator obligations (processing only on controller instructions, confidentiality, security measures)."
    },
    {
      itgc: "Data Subject Rights",
      gap: "No DSAR (Data Subject Access Request) workflow for the six LGPD rights",
      pushback: "We barely have users; nobody will submit a rights request.",
      reality: "LGPD Art. 18 grants data subjects six rights (confirmation, access, correction, anonymization/deletion, portability, information on sharing). You must be able to respond to any of these within the ANPD's timeline. Not having a process is itself a violation.",
      policy: "Data Subject Rights Procedure, Privacy Notice Policy",
      compensating: [
        "Set up a dedicated privacy@ inbox as intake with a 15-day internal SLA",
        "Use a simple spreadsheet to log each request, status, and response date",
        "Pre-build data export scripts for your primary database so you can respond quickly"
      ],
      leantip: "Start with a privacy@ inbox, a Google Sheet tracker, and a runbook that lists where PII lives in your stack. When a request arrives, you'll know exactly where to look and how to export or delete."
    },
    {
      itgc: "Lawful Basis",
      gap: "Processing personal data without mapping to one of the ten Art. 7 lawful bases",
      pushback: "We have consent from our users, so we're covered.",
      reality: "Consent under LGPD must be free, informed, unambiguous, and for a specific purpose — and it can be withdrawn at any time. Many startups rely solely on consent when another basis (legitimate interest, contract performance) is more appropriate and durable.",
      policy: "Lawful Basis Assessment Policy, Consent Management Policy",
      compensating: [
        "Map each processing activity to its lawful basis in a simple registry",
        "Use legitimate interest for internal analytics where consent would be impractical",
        "Implement a consent withdrawal mechanism that propagates within 24 hours"
      ],
      leantip: "Don't default to consent for everything. Map your top 10 processing activities to lawful bases — you'll find that contract performance and legitimate interest cover most operational needs, leaving consent for marketing only."
    },
    {
      itgc: "Incident Response",
      gap: "No security incident notification process to the ANPD (Art. 48)",
      pushback: "We'll figure out who to notify if something happens.",
      reality: "LGPD Art. 48 requires notification to the ANPD and data subjects within a 'reasonable time' (ANPD guidance suggests 2 business days for serious incidents). Without a pre-built process, you'll miss the window and face administrative sanctions.",
      policy: "Security Incident Response Plan, ANPD Notification Procedure",
      compensating: [
        "Draft a one-page ANPD notification template with required fields (Art. 48 §1)",
        "Assign an incident commander and backup for the notification process",
        "Pre-stage a communication draft for data subjects in case of serious harm"
      ],
      leantip: "Fill in the ANPD notification template NOW — before you need it. Include: nature of data, data subjects affected, security measures taken, risks, and mitigation measures. Having it ready halves your response time."
    },
    {
      itgc: "Cross-Border Transfer",
      gap: "No assessment of cross-border data transfer adequacy (Art. 33)",
      pushback: "Our data stays in Brazil since we use local cloud regions.",
      reality: "Even if primary storage is in Brazil, SaaS tools (analytics, email, CRM) often process data in US or EU data centers. LGPD Art. 33 restricts international transfers unless the destination country has adequate protection or you use Standard Contractual Clauses (SCCs).",
      policy: "Cross-Border Data Transfer Policy, International Data Transfer Register",
      compensating: [
        "Audit all SaaS tools and identify where personal data is processed geographically",
        "Sign SCCs with any vendor processing data outside Brazil",
        "Prefer Brazilian or LGPD-adequate-region cloud regions for personal data storage"
      ],
      leantip: "Run a quick inventory: for every SaaS tool, check where its data centers are. If any are outside Brazil, ensure SCCs are in place or the vendor has signed a DPA referencing LGPD Art. 33 transfer mechanisms."
    }
  ],
  privacyStartupNotes:
    "LGPD note: Brazil's ANPD is still maturing its enforcement posture, but the law is fully in force. Startups processing Brazilian residents' data must appoint an Encarregado (DPO), maintain a RIPD (Record of Processing Activities — LGPD's ROPA equivalent), and notify the ANPD of serious incidents within approximately 2 business days. Unlike GDPR, LGPD includes provisions for anonymized data and has a specific children's data regime (Art. 14) requiring parental consent for children under 12.",
  weeksData: [
    {
      week: 1,
      title: "L1 Foundation — LGPD Principles, Roles & Data Mapping",
      description:
        "Map LGPD scope to your environment, understand controller vs. operator roles, identify the ten lawful bases under Art. 7, and build the foundation for ANPD compliance.",
      days: [
        {
          day: 1,
          title: "LGPD Scope, Applicability & the Ten Lawful Bases (Art. 7)",
          tasks: [
            {
              title:
                "Determine LGPD applicability and map data processing activities to lawful bases",
              control:
                "LGPD Art. 3 (Territorial Scope), Art. 7 (Lawful Bases), Art. 11 (Sensitive Data)",
              how: "Inventory all processing activities across AWS, Azure, GCP, and Alibaba environments. Use AWS Config, Azure Resource Graph, GCP Cloud Asset Inventory, and Alibaba Cloud Config to discover data stores containing personal data of Brazilian residents. For each processing activity, assign one of the ten lawful bases under Art. 7: (1) consent, (2) compliance with legal obligation, (3) public administration, (4) research bodies, (5) contract execution, (6) judicial/arbitral proceedings, (7) protection of life, (8) health protection, (9) legitimate interest, (10) credit protection. For sensitive data (Art. 11), document the specific basis required. Store the mapping in a central registry (AWS DynamoDB or Azure SQL).",
              check:
                "Processing activity registry populated with every data flow mapped to a lawful basis under Art. 7, sensitive data flows flagged with Art. 11 basis, and registry stored in central database",
            },
            {
              title:
                "Define controller (controlador) vs. operator (operador) roles for all vendor relationships",
              control:
                "LGPD Art. 5 (Definitions — Controller, Operator, Processor), Art. 39 (Operator Obligations)",
              how: "Create a vendor register classifying each third-party data processor as controller, operator, or joint controller under LGPD. For cloud providers (AWS, Azure, GCP, Alibaba): typically operators processing on your behalf. For SaaS tools (CRM, analytics, email): may be joint controllers if they determine purposes. Draft DPAs that explicitly reference LGPD Art. 39 obligations for operators: process only on documented instructions, confidentiality obligations, security measures, sub-processor management, and assistance with data subject rights. Store DPAs in a centralized repository.",
              check:
                "Vendor register classifying all processors as controller/operator/joint controller, DPAs referencing Art. 39 obligations executed for all operators, and register stored in centralized repository",
            },
            {
              title:
                "Build the RIPD (Registro de Informações de Proteção de Dados) — LGPD's ROPA equivalent",
              control:
                "LGPD Art. 37 (Records of Processing Activities), Art. 26 (ANPD Powers)",
              how: "Create the RIPD as LGPD's equivalent to GDPR's ROPA. For each processing activity, document: purpose of processing, data categories, data subject categories, retention period, legal basis (Art. 7), cross-border transfers, technical and organizational security measures, and the identity of the controller/operator. Use AWS DynamoDB, Azure SQL, or GCP Cloud SQL to store the RIPD as a queryable database. Include fields for: activity_id, purpose, data_categories, legal_basis, retention_days, cross_border_destinations, security_measures, controller_id, operator_id. Automate RIPD updates by linking to CI/CD deployment processes.",
              check:
                "RIPD database populated with all processing activities including purpose, legal basis, retention, transfers, and security measures; RIPD update process linked to deployment pipeline",
            },
            {
              title:
                "Classify personal data using automated scanners across all cloud environments",
              control:
                "LGPD Art. 5 (Personal Data Definition), Art. 6 (Principles — Necessity), Art. 46 (Security)",
              how: "Deploy automated data classification to discover and tag personal data across all environments. For AWS: enable Amazon Macie with custom data identifiers for Brazilian CPF, CNPJ, and RG patterns. For Azure: configure Microsoft Purview scanning with sensitive information types for Brazilian identification numbers. For GCP: deploy Cloud DLP API inspection jobs for Brazilian PII patterns. For Alibaba: configure Data Security Center for data classification. Build a classification taxonomy: ordinary personal data, sensitive personal data (Art. 11 — racial/ethnic data, health data, genetic data, biometric data, sexual orientation, religious/political beliefs), and children's data (Art. 14 — under 12 requires parental consent).",
              check:
                "Automated classification scans running across all four clouds with Brazilian PII patterns (CPF, CNPJ, RG), classification taxonomy documented with Art. 11 sensitive data categories, and data catalog populated with locations and owners",
            },
            {
              title:
                "Define retention schedules and implement automated data lifecycle controls",
              control:
                "LGPD Art. 15 (End of Processing), Art. 16 (Data Elimination), Art. 16 §2 (Anonymization)",
              how: "Define retention periods per data category aligned with LGPD's storage limitation principle. For customer data: account lifetime plus 30 days. For analytics: 12 months maximum. For access logs: 6 months. For marketing data: until consent withdrawal. Implement automated enforcement: S3 lifecycle policies for object storage, Azure Blob lifecycle management, GCP Object Lifecycle Rules, and scheduled purge jobs for databases (AWS Lambda + RDS, Azure Logic Apps + SQL, GCP Cloud Functions + Cloud SQL). Document LGPD Art. 16 requirements for data elimination at end of processing purpose.",
              check:
                "Retention schedule defined per data category, automated lifecycle enforcement configured for all storage types, and purge jobs scheduled and tested for databases",
            },
          ],
        },
        {
          day: 2,
          title: "Encarregado (DPO), Data Subject Rights & Privacy Notice",
          tasks: [
            {
              title:
                "Appoint an Encarregado (DPO) and define their responsibilities under Art. 41",
              control:
                "LGPD Art. 41 (Data Protection Officer / Encarregado), Art. 23 (ANPD Supervision)",
              how: "Appoint an Encarregado as required by LGPD Art. 41. The Encarregado must be a natural person (or entity) designated by the controller, with publicly disclosed identity and contact information. Responsibilities: receive complaints and communications from data subjects, receive communications from the ANPD, advise the organization on data protection obligations, and carry out data protection impact assessments (DIPAs). Document the Encarregado's name, contact information (email, phone), reporting line (ideally direct to board/executive), and scope of authority. If appointing an external service, execute a service agreement defining SLAs for ANPD communications (24-hour response) and data subject inquiries (48-hour response).",
              check:
                "Encarregado appointed with publicly disclosed contact information, responsibilities documented in a formal appointment letter, and reporting line established to executive leadership",
            },
            {
              title:
                "Implement data subject rights workflows for all six LGPD Art. 18 rights",
              control:
                "LGPD Art. 18 (Data Subject Rights), Art. 19 (Confirmation and Access), Art. 20 (Correction)",
              how: "Build workflows for each of the six LGPD data subject rights under Art. 18: (I) confirmation of processing existence, (II) access to personal data, (III) correction of incomplete/inaccurate data, (IV) anonymization/blocking/deletion of unnecessary/excessive data, (V) portability to another service provider, (VI) information on data sharing and consequences of denial. Implement: a privacy@ intake inbox with auto-acknowledgment, identity verification process (two-factor for sensitive requests), data discovery across all systems (databases, logs, SaaS tools, backups), data export in machine-readable format (JSON/CSV), and correction/deletion workflows. For portability (Art. 18 V), implement data export in a structured, commonly used format. SLA: respond within 15 days (ANPD guidance).",
              check:
                "DSAR workflows implemented for all six Art. 18 rights with intake portal, identity verification, data discovery procedures, and 15-day SLA tracking in place",
            },
            {
              title:
                "Draft and publish a comprehensive Privacy Notice (Política de Privacidade) under Art. 9",
              control:
                "LGPD Art. 9 (Right to Information), Art. 6 (Transparency Principle), Art. 8 (Consent Requirements)",
              how: "Create a Privacy Notice covering all LGPD Art. 9 requirements: purpose of processing, form and duration of processing, controller identification and contact details, shared entities (public and private), data subject rights and how to exercise them, consequences of data denial (impact on service), and whether processing is based on consent or another legal basis. Implement the notice in Portuguese (Brazilian) with a clear, plain-language summary. Publish on your website and within your application. For consent-based processing, implement Art. 8 consent capture: free, informed, unambiguous, for specific purposes, with prominent presentation of terms, and easy withdrawal mechanism.",
              check:
                "Privacy Notice published covering all Art. 9 requirements in Portuguese, consent capture mechanism implemented with Art. 8 compliance, and notice version-controlled with update history",
            },
            {
              title:
                "Implement consent management with LGPD Art. 8 compliance controls",
              control:
                "LGPD Art. 8 (Consent Requirements), Art. 8 §4 (Consent Burden of Proof), Art. 11 (Sensitive Data Consent)",
              how: "Deploy consent management that meets LGPD Art. 8 requirements: consent must be provided in writing or by other means demonstrating the data subject's intention (Art. 8 §1), for sensitive data consent must be specifically highlighted (Art. 11 §2), burden of proof for consent lies with the controller (Art. 8 §2), and consent can be withdrawn at any time (Art. 8 §5). Implement: purpose-level consent capture (separate consents for marketing, analytics, profiling), consent versioning with timestamps, consent record storage (user_id, purpose, consent_state, timestamp, version, source), withdrawal mechanism that propagates within 24 hours, and proof-of-consent records for audit. Use AWS DynamoDB or Azure Cosmos DB for consent record storage.",
              check:
                "Consent management platform deployed with purpose-level granularity, Art. 8 compliance (free, informed, specific), withdrawal propagation within 24 hours, and proof-of-consent records stored for audit",
            },
          ],
        },
        {
          day: 3,
          title: "Security Measures, Incident Response & Cross-Border Transfers",
          tasks: [
            {
              title:
                "Implement technical and organizational security measures per Art. 46",
              control:
                "LGPD Art. 46 (Security Measures), Art. 47 (Security Standards), Art. 48 §2 (Security Measures)",
              how: "Implement security measures aligned with LGPD Art. 46-47. For encryption: enable AES-256 encryption at rest on all data stores (AWS RDS encryption, Azure TDE, GCP Cloud SQL encryption, Alibaba RDS encryption) and TLS 1.3 in transit. For access control: deploy RBAC across all environments using AWS IAM, Azure Entra ID, GCP IAM, and Alibaba RAM with least-privilege policies. For logging: enable CloudTrail, Azure Activity Logs, GCP Audit Logs, and Alibaba ActionTrail for all API activity. For network security: configure security groups, NACLs, and WAF rules. For vulnerability management: deploy automated scanning (AWS Inspector, Azure Defender, GCP Security Command Center, Alibaba Security Center). Document all measures in the RIPD security section.",
              check:
                "Encryption (AES-256 at rest, TLS 1.3 in transit) enabled on all data stores, RBAC deployed across all clouds, audit logging enabled, and security measures documented in the RIPD",
            },
            {
              title:
                "Build an ANPD security incident notification process under Art. 48",
              control:
                "LGPD Art. 48 (Incident Notification), Art. 48 §1 (Notification Contents), Art. 48 §3 (ANPD Communication to Data Subjects)",
              how: "Build a security incident response process compliant with LGPD Art. 48. The notification to ANPD must include: (I) description of the nature of affected personal data, (II) information on data subjects involved, (III) technical and security measures adopted for data protection, (IV) risks related to the incident, (V) reasons for delay if applicable, and (VI) measures adopted to reverse or mitigate effects. Draft the ANPD notification template with these fields pre-populated. Implement the response process: incident detection (SIEM alerts from CloudTrail, Azure Sentinel, GCP Chronicle), triage and classification (severity levels P0-P3), containment, notification drafting, ANPD submission (via ANPD portal or email), and data subject communication for serious incidents. Target: notification within 2 business days for serious incidents.",
              check:
                "ANPD notification template pre-drafted with all Art. 48 §1 fields, incident response process documented with severity classification and 2-day notification SLA, and test notification executed",
            },
            {
              title:
                "Assess and document cross-border data transfer mechanisms under Art. 33",
              control:
                "LGPD Art. 33 (International Data Transfer), Art. 33 §1 (Adequacy), Art. 35 (Transfer Impact Assessment)",
              how: "Audit all SaaS tools and cloud services to identify where personal data of Brazilian residents is processed geographically. For each cross-border transfer: document the destination country, adequacy status (ANPD maintains a list of adequate countries per Art. 33 §1), applicable transfer mechanism (adequacy decision, SCCs, BCRs, or specific contractual clauses), and supplementary measures. For US-based SaaS tools (CRM, email, analytics): verify the vendor's data residency options, sign SCCs referencing LGPD Art. 33, and document a Transfer Impact Assessment. Implement technical controls: AWS Organizations SCPs restricting regions, Azure Policy for resource location compliance, GCP Organization Policy constraints on resource locations. Create a cross-border transfer register.",
              check:
                "Cross-border transfer register documenting all international data flows, transfer mechanisms (SCCs, adequacy) in place for each, technical controls enforcing data residency, and Transfer Impact Assessments completed",
            },
            {
              title:
                "Implement DPIA/RIPD (Relatório de Impacto à Proteção de Dados Pessoais) workflow",
              control:
                "LGPD Art. 38 (Data Protection Impact Assessment / RIPD), Art. 26 (ANPD Regulatory Powers)",
              how: "Establish a Data Protection Impact Assessment (DPIA/RIPD) workflow triggered before launching new products, features, or data processing activities involving personal data. The RIPD under Art. 38 must describe: data processing activities, data categories, collection methodology, third-party sharing, data retention, security measures, and risk analysis with mitigation measures. Define the assessment template, review process (5-business-day SLA), risk identification methodology, and sign-off requirements. Integrate DPIA triggers into the SDLC: require DPIA completion before production deployment of features touching personal data. Maintain a DPIA register tracking all completed assessments.",
              check:
                "DPIA/RIPD workflow established with Art. 38 template, review SLA, SDLC integration, and register tracking all completed assessments with status and risk mitigation actions",
            },
            {
              title:
                "Address LGPD Art. 14 children's data protections and Art. 17 information sharing obligations",
              control:
                "LGPD Art. 14 (Children's Data), Art. 17 (Right to Information on Sharing)",
              how: "Implement children's data protections under LGPD Art. 14: processing of children's personal data must be carried out with specific and prominent consent given by a parent or legal guardian (Art. 14 §1), and controllers must make best efforts to verify consent based on the child's age (Art. 14 §2). Implement age-gating mechanisms, parental consent capture flows, and restricted data processing for minors under 12. For Art. 17 (Right to Information on Sharing): within the Privacy Notice, document all entities (public and private) with whom personal data is shared, and the consequences of data denial. Maintain an up-to-date sharing register mapping each vendor/partner to the data shared and purpose.",
              check:
                "Children's data protections implemented with age-gating and parental consent flows for under-12 users, and Art. 17 sharing register documenting all data sharing entities and consequences of denial in the Privacy Notice",
            },
          ],
        },
      ],
    },
    {
      week: 2,
      title: "L2 Implementer — Technical Controls & Cloud Security per LGPD",
      description:
        "Implement cloud-native technical controls for LGPD compliance: encryption, access management, monitoring, data discovery, consent enforcement, and breach response across AWS, Azure, GCP, and Alibaba.",
      days: [
        {
          day: 8,
          title: "Encryption, Access Control & RBAC Implementation",
          tasks: [
            {
              title:
                "Configure AES-256 encryption at rest across all data stores holding personal data",
              control:
                "LGPD Art. 46 (Security Measures), Art. 47 (Security Standards)",
              how: "Enable AES-256 encryption at rest on every data store containing personal data. For AWS: enable RDS encryption (KMS CMK), EBS encryption by default, S3 default encryption (SSE-KMS), and DynamoDB encryption at rest. For Azure: enable TDE on Azure SQL, Azure Disk Encryption on VMs, Azure Blob encryption with customer-managed keys in Key Vault. For GCP: enable Cloud SQL encryption, Persistent Disk encryption, and Cloud Storage default encryption with CMEK. For Alibaba: enable RDS encryption, ESSD encryption, and OSS server-side encryption. Document KMS key ARNs/IDs, rotation schedules (annual minimum), and key access policies for each service.",
              check:
                "AES-256 encryption enabled on every data store across all four clouds, KMS keys configured with annual rotation, and key access policies documented per service",
            },
            {
              title:
                "Deploy RBAC with least-privilege IAM policies across all cloud providers",
              control:
                "LGPD Art. 46 (Security Measures), Art. 6 (Principle of Necessity)",
              how: "Implement role-based access control with least-privilege principles across all environments. For AWS: create IAM roles with permission boundaries for developer roles, use IAM Identity Center for SSO, implement SCPs restricting cross-account access. For Azure: configure Entra ID RBAC with custom role definitions, enable PIM for privileged role activation, implement conditional access policies. For GCP: use IAM bindings with predefined and custom roles, apply Organization Policy constraints. For Alibaba: configure RAM roles with policy-based access, implement RAM role chaining for cross-account access. Document the role inventory, permission grants, approval process for role assignment, and quarterly access review schedule.",
              check:
                "RBAC implemented across all four clouds with least-privilege roles, SSO integrated, PIM/just-in-time access configured, and quarterly access review schedule documented",
            },
            {
              title:
                "Configure WAF and network security controls for perimeter defense",
              control:
                "LGPD Art. 46 (Security Measures), Art. 48 (Incident Prevention)",
              how: "Deploy web application firewalls for all public-facing endpoints. For AWS: configure AWS WAF with OWASP Top 10 managed rule groups, rate limiting, geo-blocking, and custom rules. For Azure: configure Azure Front Door WAF with Microsoft Default Rule Set and custom rule collections. For GCP: deploy Cloud Armor with pre-configured WAF rules and adaptive protection. For Alibaba: configure Anti-DDoS Pro and Web Application Firewall. Implement network segmentation using security groups, NACLs, and VPC/VNet isolation. Enable VPC Flow Logs for network monitoring. Document WAF rule sets, rate limiting thresholds, and network segmentation architecture.",
              check:
                "WAF deployed for all public endpoints with OWASP rules, rate limiting configured, network segmentation documented, and VPC Flow Logs enabled across all clouds",
            },
            {
              title:
                "Enable comprehensive audit logging with immutable storage for LGPD evidence",
              control:
                "LGPD Art. 46 (Security Measures), Art. 37 (Records of Processing)",
              how: "Configure comprehensive audit logging across all cloud environments with immutable storage. For AWS: enable CloudTrail for all regions, deliver to a centralized S3 bucket with Object Lock (compliance mode), enable S3 data events for personal data buckets. For Azure: enable Activity Logs, Entra ID sign-in/audit logs, and Defender for Cloud alerts, archive to immutable Blob Storage. For GCP: enable Cloud Audit Logs (Admin Activity, Data Access), export to Cloud Storage with retention policies. For Alibaba: enable ActionTrail for all regions, deliver to OSS with versioning and retention. Configure alerting for critical events: root login, IAM policy changes, security group modifications, data access anomalies.",
              check:
                "Audit logging enabled across all four clouds with immutable storage, critical event alerting configured, and logs retained for minimum 12 months",
            },
          ],
        },
        {
          day: 12,
          title: "Data Discovery, DLP & Classification Automation",
          tasks: [
            {
              title:
                "Deploy automated PII discovery for Brazilian personal data patterns (CPF, CNPJ, RG)",
              control:
                "LGPD Art. 46 (Security Measures), Art. 6 (Data Minimization Principle)",
              how: "Implement automated PII discovery tuned for Brazilian data patterns. For AWS: configure Amazon Macie with custom data identifiers for CPF (###.###.###-##), CNPJ (##.###.###/####-##), RG patterns, and Brazilian phone numbers. For Azure: configure Microsoft Purview with sensitive information types for Brazilian identification numbers. For GCP: deploy Cloud DLP API inspection jobs with custom detectors for Brazilian PII. For Alibaba: configure Data Security Center for Brazilian PII patterns. Schedule recurring discovery jobs (weekly for all data stores, daily for high-risk stores). Build a data catalog mapping discovered PII to systems, owners, retention periods, and legal basis.",
              check:
                "Automated PII discovery running for Brazilian patterns across all four clouds, data catalog populated with PII locations and owners, and recurring scan schedule documented",
            },
            {
              title:
                "Configure DLP policies to prevent unauthorized personal data exposure",
              control:
                "LGPD Art. 46 (Security Measures), Art. 47 (Security Standards)",
              how: "Deploy Data Loss Prevention policies to detect and prevent unauthorized exposure of personal data. For AWS: enable Amazon Macie automated remediation for public S3 buckets containing PII, configure S3 bucket policies blocking public access. For Azure: configure Microsoft Purview DLP policies for Exchange, SharePoint, OneDrive, and Teams blocking external sharing of classified data. For GCP: deploy Cloud DLP API for real-time inspection of BigQuery data and Cloud Storage objects, configure DLP findings export to BigQuery for compliance reporting. For Alibaba: configure Data Security Center DLP policies for OSS and RDS data. Define DLP response actions: block external sharing, alert on bulk exports, quarantine sensitive files.",
              check:
                "DLP policies deployed across all clouds with automated remediation for public exposures, external sharing blocked for classified data, and DLP findings exported for compliance reporting",
            },
            {
              title:
                "Implement data masking and anonymization for non-production environments",
              control:
                "LGPD Art. 12 (Anonymized Data), Art. 16 §2 (Anonymization Standards), Art. 46 (Security)",
              how: "Implement data masking and anonymization controls for non-production environments to prevent real personal data from appearing in development or staging. For AWS: use AWS Glue data masking transforms, configure DMS data transformation rules for staging database refreshes. For Azure: implement Dynamic Data Masking on Azure SQL, use Azure Data Factory masking transforms. For GCP: deploy Cloud DLP de-identification templates for tokenization and masking. For Alibaba: configure Data Security Center masking rules. Build synthetic data generators using Faker libraries for Brazilian-specific data (CPF, names, addresses). Enforce policy: no production PII in development; staging uses masked data only; all synthetic data generators are documented and version-controlled.",
              check:
                "Data masking configured for all non-production environments, synthetic data generators deployed for Brazilian PII patterns, and policy enforced blocking production PII in development",
            },
            {
              title:
                "Build a personal data inventory dashboard with owner accountability",
              control:
                "LGPD Art. 37 (Records of Processing Activities), Art. 26 (ANPD Powers)",
              how: "Build a centralized personal data inventory dashboard that aggregates discovery results from Macie, Purview, Cloud DLP, and Alibaba Data Security Center. The dashboard should show: data store name, cloud provider, region, data categories present (CPF, email, health, etc.), data owner, legal basis, retention period, last scan date, and compliance status. Implement using AWS QuickSight, Azure Power BI, GCP Looker, or a custom React dashboard backed by the RIPD database. Add filtering by data category, cloud, region, and compliance status. Set up weekly automated refresh from discovery scans. Include an alert panel for new PII discoveries and retention violations.",
              check:
                "Personal data inventory dashboard deployed with all data stores listed, owner accountability assigned, weekly automated refresh configured, and alert panel operational for new discoveries",
            },
          ],
        },
        {
          day: 18,
          title: "Consent Enforcement, DSAR Automation & Breach Response",
          tasks: [
            {
              title:
                "Implement automated consent enforcement across marketing and analytics pipelines",
              control:
                "LGPD Art. 8 (Consent), Art. 11 (Sensitive Data Consent), Art. 6 (Transparency)",
              how: "Build automated consent enforcement that checks consent state before any processing. For email marketing: integrate with your ESP (SendGrid, SES, Mailchimp) to suppress users without marketing consent. For analytics: configure client-side consent checks before firing tracking events (Google Analytics, Mixpanel, Amplitude). For API processing: implement middleware that validates consent state before processing personal data. For third-party sharing: enforce consent checks before sending data to CRM, advertising, or analytics platforms. Store consent records in DynamoDB/CosmosDB with fields: user_id, purpose, consent_state, timestamp, version, source. Implement withdrawal propagation within 24 hours across all downstream systems.",
              check:
                "Consent enforcement implemented across marketing, analytics, API, and third-party sharing pipelines; withdrawal propagation within 24 hours tested and confirmed",
            },
            {
              title:
                "Build DSAR automation for data discovery and export across all systems",
              control:
                "LGPD Art. 18 (Data Subject Rights), Art. 19 (Access Right), Art. 20 (Correction)",
              how: "Automate the DSAR response process for efficiency and compliance with the 15-day ANPD response window. Implement: automated identity verification (email confirmation + account login), data discovery scripts querying all databases (RDS, Cloud SQL, DynamoDB, CosmosDB), log aggregation systems (CloudWatch, Azure Log Analytics, GCP Cloud Logging), SaaS tools (CRM, email, support), and backup systems. Build an export pipeline that aggregates discovered data into a structured JSON/CSV package, redacts third-party data, and generates the response document. For deletion requests: implement cascading deletion across primary systems, with documented exceptions for legal holds and backup retention. Log all DSAR activity for audit trail.",
              check:
                "DSAR automation pipeline deployed with identity verification, data discovery across all systems, export in JSON/CSV format, deletion capability with exceptions documented, and 15-day SLA tracking",
            },
            {
              title:
                "Deploy SIEM with ANPD-specific alert rules for personal data incidents",
              control:
                "LGPD Art. 48 (Incident Response), Art. 46 (Security Measures)",
              how: "Configure SIEM infrastructure with alert rules specific to personal data incidents under LGPD Art. 48. For AWS: deploy Amazon Security Lake (OCSF format) or integrate CloudTrail, GuardDuty, Macie, and VPC Flow Logs into a SIEM. For Azure: configure Microsoft Sentinel with data connectors for Defender for Cloud, Entra ID, and Purview DLP. For GCP: ingest Cloud Audit Logs, VPC Flow Logs, and Cloud DLP findings into Chronicle. For Alibaba: stream ActionTrail, Security Center, and Data Security Center logs. Build correlation rules for: mass data download from personal data stores, unauthorized access to PII databases, DLP policy violations, and unusual data transfer patterns. Implement escalation matrix with severity levels mapped to ANPD notification timelines.",
              check:
                "SIEM configured with all cloud logs ingested, ANPD-specific correlation rules deployed, escalation matrix with notification timelines documented, and test alert executed",
            },
            {
              title:
                "Implement cross-border transfer technical controls and monitoring",
              control:
                "LGPD Art. 33 (International Transfer), Art. 35 (Transfer Impact Assessment)",
              how: "Implement technical controls to enforce and monitor cross-border data transfer restrictions. For AWS: use Organizations SCPs to restrict resource creation to approved regions (sa-east-1 São Paulo for Brazilian data). For Azure: deploy Azure Policy to deny resource creation outside approved regions, configure Azure Front Door to route traffic through São Paulo. For GCP: use Organization Policy constraints to restrict resource locations to Brazil. For Alibaba: configure RAM policies restricting region usage. Implement monitoring: alert on data transfer attempts to non-approved regions, log all cross-border API calls, and maintain a transfer register with quarterly review. For approved transfers (SCCs in place), document the supplementary technical measures (encryption in transit, pseudonymization before transfer).",
              check:
                "Technical controls enforcing data residency configured across all clouds, transfer monitoring with alerting operational, transfer register maintained with quarterly review, and supplementary measures documented for approved transfers",
            },
          ],
        },
        {
          day: 25,
          title: "Cloud Configuration, Vulnerability Management & Hardening",
          tasks: [
            {
              title:
                "Deploy cloud security posture management (CSPM) for LGPD compliance baselines",
              control:
                "LGPD Art. 46 (Security Measures), Art. 47 (Security Standards)",
              how: "Implement CSPM tools to continuously monitor cloud configurations against LGPD security baselines. For AWS: enable Security Hub with AWS Foundational Security Best Practices (FSBP) and CIS AWS Foundations Benchmark, configure Config Rules for encryption, access control, and logging requirements. For Azure: enable Microsoft Defender for Cloud with Standard tier, deploy Azure Policy for compliance baselines. For GCP: enable Security Command Center Premium with threat detection and vulnerability management, deploy Organization Policy constraints. For Alibaba: enable Security Center and Cloud Config for compliance monitoring. Map CSPM findings to LGPD Art. 46-47 requirements. Configure automated remediation for critical non-compliance findings.",
              check:
                "CSPM deployed across all four clouds with LGPD-mapped compliance baselines, automated remediation for critical findings, and compliance dashboards operational",
            },
            {
              title:
                "Implement automated vulnerability scanning and remediation SLAs",
              control:
                "LGPD Art. 46 (Security Measures), Art. 48 (Incident Prevention)",
              how: "Configure automated vulnerability scanning across all environments with defined remediation SLAs. For infrastructure: deploy AWS Inspector, Azure Defender for Servers, GCP Security Command Center scanning, or Alibaba Security Center for weekly scans. For containers: integrate Trivy or Snyk Container into CI/CD pipelines. For dependencies: run Snyk, Dependabot, or OWASP Dependency-Check daily. For cloud configurations: run Prowler (AWS), ScoutSuite (multi-cloud), or CSPM tools continuously. Define remediation SLAs: Critical = 24 hours, High = 7 days, Medium = 30 days, Low = 90 days. Configure alerting for critical vulnerabilities and track remediation progress. Document the vulnerability management policy and exception process.",
              check:
                "Vulnerability scanning configured across infrastructure, containers, dependencies, and cloud configs with defined SLAs, alerting for critical findings, and remediation tracking in place",
            },
            {
              title:
                "Implement backup and disaster recovery controls for personal data availability",
              control:
                "LGPD Art. 46 (Security Measures), Art. 16 (Data Integrity)",
              how: "Implement backup and DR controls for personal data stores to ensure availability and integrity. For AWS: configure automated RDS backups with point-in-time recovery, enable S3 versioning and cross-region replication, use AWS Backup for centralized backup management. For Azure: enable Azure Backup for SQL databases, configure geo-redundant storage for backups, implement Azure Site Recovery for VMs. For GCP: configure Cloud SQL automated backups, enable Cloud Storage versioning, implement GCP Backup and DR. For Alibaba: enable RDS automated backups, configure OSS versioning. Define RTO/RPO targets per data category. Test backup restoration quarterly and document results. Ensure backup encryption matches production encryption standards.",
              check:
                "Backup and DR configured for all personal data stores across all clouds, RTO/RPO targets defined, quarterly restoration tests scheduled, and backup encryption verified",
            },
            {
              title:
                "Implement network security segmentation for personal data environments",
              control:
                "LGPD Art. 46 (Security Measures), Art. 47 (Security Standards)",
              how: "Implement network segmentation isolating personal data environments. For AWS: deploy separate VPCs for production personal data processing, configure VPC peering with restricted routing, use PrivateLink for service-to-service communication, enable VPC Flow Logs for monitoring. For Azure: deploy VNets with network security groups (NSGs) restricting traffic between tiers, configure Private Link for PaaS services, use Azure Firewall for centralized network security. For GCP: deploy VPC with firewall rules restricting inter-tier communication, enable Private Google Access, use VPC Service Controls for data perimeters. For Alibaba: configure VPCs with security groups, use PrivateLink for service access. Document the network architecture, security group rules, and traffic flow between segments.",
              check:
                "Network segmentation implemented across all clouds with personal data environments isolated, PrivateLink/Private Access configured, VPC Flow Logs enabled, and architecture documented",
            },
          ],
        },
      ],
    },
    {
      week: 3,
      title: "L3 Verifier — Testing LGPD Controls & Evidence Collection",
      description:
        "Execute comprehensive testing of LGPD controls: DSAR response validation, consent audit, encryption verification, incident response drills, cross-border transfer testing, and DPIA review across all environments.",
      days: [
        {
          day: 35,
          title: "Data Subject Rights Testing & Consent Audit",
          tasks: [
            {
              title:
                "Execute end-to-end DSAR response test for all six Art. 18 rights within SLA",
              control:
                "LGPD Art. 18 (Data Subject Rights), Art. 19 (Access), Art. 20 (Correction)",
              how: "Execute a complete DSAR response test using a test account to verify all six Art. 18 rights work correctly. For confirmation (Art. 18 I): verify the system confirms processing existence and provides a summary. For access (Art. 18 II): verify data export includes all personal data across databases, logs, SaaS tools, and backups in machine-readable format. For correction (Art. 18 III): submit a correction request and verify the update propagates across all systems. For deletion (Art. 18 IV): verify data is anonymized or deleted from primary systems, with documented exceptions for legal holds. For portability (Art. 18 V): verify data export in structured, commonly used format. For sharing information (Art. 18 VI): verify the response includes all entities with access to the data. Measure total processing time and confirm within 15-day SLA.",
              check:
                "End-to-end DSAR test completed for all six Art. 18 rights within 15-day SLA, data discovery completeness verified across all systems, and export format validated",
            },
            {
              title:
                "Audit consent records for completeness, accuracy, and withdrawal propagation",
              control:
                "LGPD Art. 8 (Consent), Art. 8 §2 (Burden of Proof), Art. 8 §5 (Withdrawal)",
              how: "Audit the consent management system against LGPD Art. 8 requirements. Verify: consent records exist for all active users who provided consent, timestamps are accurate and tamper-proof (stored in append-only log), consent granularity matches documented purposes, burden of proof documentation is maintained (Art. 8 §2), and withdrawal requests propagate to all downstream systems within 24 hours. Test consent enforcement: process a user action that requires consent and verify the system checks consent state before proceeding. For withdrawn consent: verify marketing tools suppress the user, analytics tools exclude tracking, and third-party sharing ceases. Document audit findings and any gaps in consent capture, storage, or enforcement.",
              check:
                "Consent audit completed with record completeness verified, withdrawal propagation tested and confirmed within 24 hours, consent enforcement validated, and any gaps documented with remediation",
            },
            {
              title:
                "Verify privacy notice (Política de Privacidade) compliance with Art. 9",
              control:
                "LGPD Art. 9 (Right to Information), Art. 6 (Transparency Principle)",
              how: "Review the Privacy Notice against every LGPD Art. 9 requirement. Verify it includes: (I) clear identification of the controller and Encarregado contact details, (II) purposes of processing with specific descriptions, (III) form and duration of processing, (IV) shared entities (public and private) with descriptions of each, (V) data subject rights and how to exercise them, (VI) consequences of data denial, (VII) whether processing is based on consent or another legal basis, and (VIII) information on cross-border transfers. Verify the notice is published in Portuguese (Brazilian), is accessible from all data collection points, and version control is maintained. Test that the consent mechanism meets Art. 8 requirements: free, informed, unambiguous, specific purposes, prominent presentation, and easy withdrawal.",
              check:
                "Privacy Notice reviewed against all Art. 9 requirements with no gaps, published in Portuguese with version control, consent mechanism tested for Art. 8 compliance",
            },
            {
              title:
                "Test data classification and labeling effectiveness across all environments",
              control:
                "LGPD Art. 46 (Security Measures), Art. 6 (Principle of Necessity)",
              how: "Verify that data classification and labeling controls are working correctly. Run classification scans using Macie, Purview, Cloud DLP, and Alibaba Data Security Center against known test data sets containing Brazilian PII patterns (CPF, CNPJ, RG). Verify that: classification tools correctly identify Brazilian PII patterns, classified data is tagged with appropriate labels (public, internal, confidential, restricted), DLP policies enforce handling requirements per classification level, and no unclassified personal data exists in production storage. Test false positive and false negative rates. Verify that classification labels are propagated to data catalogs and the RIPD is updated. Spot-check 10 random data stores to confirm classification accuracy.",
              check:
                "Data classification tested with known Brazilian PII patterns, false positive/negative rates documented, classification labels propagated to data catalogs, and RIPD updated with classification results",
            },
          ],
        },
        {
          day: 42,
          title: "Security Controls Testing & Incident Response Drills",
          tasks: [
            {
              title:
                "Execute encryption audit and key rotation verification across all data stores",
              control:
                "LGPD Art. 46 (Security Measures), Art. 47 (Security Standards)",
              how: "Conduct a comprehensive encryption audit verifying all data stores meet documented security requirements. For databases: verify encryption enabled for every RDS instance (describe-db-instances), Azure SQL TDE status, Cloud SQL encryption, Alibaba RDS encryption. For object storage: verify S3 default encryption, Azure Blob encryption, GCS encryption, Alibaba OSS encryption. For block storage: verify EBS encryption by default, Azure Disk encryption, GCP PD encryption. For message queues: verify SQS/SNS encryption, Azure Service Bus encryption, GCP Pub/Sub encryption. Verify TLS 1.3 enforcement across all endpoints. Verify key rotation has executed on schedule for all customer-managed keys. Document any unencrypted data stores and create remediation plans.",
              check:
                "Encryption audit completed for all data stores across all clouds, key rotation verified for all KMS keys, TLS 1.3 confirmed on all endpoints, and exceptions documented with remediation plans",
            },
            {
              title:
                "Conduct ANPD incident notification drill with full response simulation",
              control:
                "LGPD Art. 48 (Incident Notification), Art. 48 §1 (Notification Contents)",
              how: "Execute a full incident response drill simulating a personal data breach requiring ANPD notification. Scenario: unauthorized access to a database containing CPF numbers and email addresses. Pre-drill: confirm all response team members are available, ANPD notification template is current, and communication channels are tested. During drill: detect the 'incident' via SIEM alert, triage and classify severity, execute containment procedures (isolate affected system, revoke compromised credentials), draft ANPD notification with all Art. 48 §1 fields (data nature, data subjects affected, security measures, risks, mitigation), draft data subject notification for serious incidents, and measure time from detection to notification readiness. Post-drill: document lessons learned, update response procedures, and schedule next drill.",
              check:
                "ANPD incident notification drill executed with full simulation, notification template populated with all Art. 48 §1 fields, time from detection to notification readiness measured, and lessons learned documented",
            },
            {
              title:
                "Test WAF, IDS/IPS, and access control effectiveness against common attack patterns",
              control:
                "LGPD Art. 46 (Security Measures), Art. 48 (Incident Prevention)",
              how: "Test perimeter and access control security measures. For WAF testing: execute OWASP ZAP or Burp Suite active scan against protected endpoints, verify SQL injection, XSS, CSRF, and path traversal payloads are blocked. For IDS/IPS testing: execute Nmap service scans and verify detection, run Metasploit modules against test targets and verify alerting. For access control testing: attempt unauthorized access to personal data stores from non-privileged accounts, verify RBAC blocks access, test privilege escalation attempts, and verify MFA enforcement. For network testing: verify VPC segmentation blocks cross-tier unauthorized communication, confirm PrivateLink/Private Access is functioning. Document test results, false positive/negative rates, and any control tuning performed.",
              check:
                "WAF tested with OWASP attack payloads and blocking confirmed, IDS/IPS detection verified, access control tested with unauthorized access attempts blocked, and network segmentation validated",
            },
            {
              title:
                "Verify backup restoration and test data recoverability for personal data",
              control:
                "LGPD Art. 46 (Security Measures), Art. 16 (Data Integrity)",
              how: "Test backup restoration procedures for all personal data stores to verify data recoverability. For databases: restore a test database from automated backups to a separate environment, verify data integrity post-restoration, and measure actual restoration time vs. RTO target. For object storage: restore deleted objects from versioning or soft delete, verify restored object integrity. For configuration backups: verify Terraform state and CloudFormation templates can recreate infrastructure. Verify backup encryption matches production standards. Test point-in-time recovery for databases. Document restoration test results, actual restoration times, and any issues encountered. Ensure backup restoration procedures are documented and accessible to the incident response team.",
              check:
                "Backup restoration tested for all personal data stores with data integrity verified, restoration times measured vs. RTO, backup encryption confirmed, and procedures documented",
            },
          ],
        },
        {
          day: 48,
          title: "Cross-Border Transfer Testing, DPIA Review & Compliance Gap Analysis",
          tasks: [
            {
              title:
                "Audit cross-border transfer register and verify transfer mechanisms",
              control:
                "LGPD Art. 33 (International Transfer), Art. 35 (Transfer Impact Assessment)",
              how: "Audit the cross-border transfer register for completeness and accuracy. For each international data flow: verify the destination country is documented, verify the applicable transfer mechanism (adequacy decision, SCCs, BCRs) is in place and current, verify the Transfer Impact Assessment is completed and documented, and verify supplementary technical measures are implemented (encryption, pseudonymization). Test technical controls: attempt to create resources in non-approved regions and verify blocking, verify SCPs/Policy constraints are functioning, and review VPC Flow Logs for unexpected cross-border traffic. Verify that SCCs are signed with all vendors processing data outside Brazil and that DPAs reference LGPD Art. 33. Document any transfer mechanism gaps and create remediation plans.",
              check:
                "Cross-border transfer register audited with all transfers verified, transfer mechanisms (SCCs, adequacy) confirmed for each, technical controls tested and blocking unauthorized transfers, and gaps documented with remediation",
            },
            {
              title:
                "Review completed DPIA/RIPD assessments for quality and completeness",
              control:
                "LGPD Art. 38 (Data Protection Impact Assessment), Art. 26 (ANPD Powers)",
              how: "Review all completed DPIA/RIPD assessments against LGPD Art. 38 requirements. For each assessment: verify it describes the processing activities, data categories, collection methodology, third-party sharing, retention periods, security measures, and risk analysis. Verify that identified risks have mitigation measures with owners and timelines. Verify that high-risk processing has received Encarregado sign-off. Identify any new processing activities that require a DPIA but haven't been assessed. Update the DPIA register with current status. Review the DPIA template to ensure it covers all Art. 38 requirements. Document review findings and any quality improvements needed.",
              check:
                "All DPIA/RIPD assessments reviewed against Art. 38 requirements, risk mitigations tracked with owners and timelines, high-risk processing signed off by Encarregado, and gaps documented",
            },
            {
              title:
                "Execute compliance gap analysis against ANPD guidance and regulatory expectations",
              control:
                "LGPD Art. 26 (ANPD Regulatory Powers), Art. 50 (Codes of Good Practice)",
              how: "Conduct a comprehensive compliance gap analysis comparing current LGPD compliance posture against ANPD published guidance, regulatory expectations, and industry best practices. Review: ANPD published resolutions and guidelines, ANPD enforcement actions (reference other Brazilian agencies' practices), LGPD Codes of Good Practice (Art. 50), and sector-specific ANPD guidance. For each LGPD article: map current controls, identify gaps, assess risk level, and prioritize remediation. Focus on areas where ANPD has published specific guidance: DPO appointment, security incident notification, data subject rights, and cross-border transfers. Document the gap analysis with a prioritized remediation roadmap.",
              check:
                "Compliance gap analysis completed against ANPD guidance with gaps identified per LGPD article, risk assessment for each gap, and prioritized remediation roadmap documented",
            },
            {
              title:
                "Validate children's data protections (Art. 14) and sensitive data controls (Art. 11)",
              control:
                "LGPD Art. 14 (Children's Data), Art. 11 (Sensitive Data), Art. 14 §1 (Parental Consent)",
              how: "Verify that children's data protections and sensitive data controls are implemented correctly. For children's data (Art. 14): verify age-gating mechanism is functional, parental consent capture flow works for users under 12, data processing for minors is restricted to what is necessary, and best efforts to verify parental consent are documented. For sensitive data (Art. 11): verify that special consent is obtained for processing racial/ethnic data, health data, genetic data, biometric data, sexual orientation, or religious/political beliefs, verify that sensitive data is processed only for specific purposes with explicit consent, and verify that sensitive data has enhanced security controls (encryption, access restrictions, audit logging). Document test results and any gaps in either area.",
              check:
                "Children's data protections tested with age-gating and parental consent flows verified, sensitive data controls validated with Art. 11 consent and security measures confirmed, and gaps documented",
            },
          ],
        },
      ],
    },
    {
      week: 4,
      title: "L4 Certified — Multi-Cloud LGPD Compliance & Continuous Monitoring",
      description:
        "Master LGPD controls across AWS, Azure, GCP, and Alibaba Cloud, implement continuous compliance monitoring, address common ANPD findings, and establish ongoing LGPD compliance for multi-cloud startup environments.",
      days: [
        {
          day: 55,
          title: "Multi-Cloud Environment Segregation & Personal Data Isolation",
          tasks: [
            {
              title:
                "Implement environment isolation with personal data segregation controls",
              control:
                "LGPD Art. 46 (Security Measures), Art. 6 (Principle of Necessity)",
              how: "Implement strict environment isolation preventing personal data leakage across environments. For AWS: use separate AWS accounts per environment within Organizations, apply SCPs preventing cross-account personal data access, use separate VPCs per environment with no peering between dev and prod. For Azure: use separate subscriptions per environment, apply Azure Policy for isolation, use separate VNets. For GCP: use separate projects per environment, apply Organization Policy constraints. For Alibaba: use separate resource groups and regions, apply RAM policies. Implement data segregation: production uses real personal data, staging uses masked data, development uses synthetic data only. Document the environment architecture and personal data isolation controls.",
              check:
                "Environment isolation implemented across all four clouds, personal data segregated by environment (real/masked/synthetic), cross-environment access blocked, and architecture documented",
            },
            {
              title:
                "Deploy automated LGPD compliance dashboards with continuous monitoring",
              control:
                "LGPD Art. 26 (ANPD Powers), Art. 50 (Codes of Good Practice)",
              how: "Build continuous compliance monitoring dashboards tracking LGPD compliance posture. Key metrics: percentage of processing activities with documented lawful basis, DSAR response time vs. 15-day SLA, consent coverage percentage, encryption compliance rate (percentage of data stores encrypted), incident notification compliance rate, cross-border transfer mechanism coverage, and RIPD completeness score. Implement using AWS QuickSight, Azure Power BI, GCP Looker, or a custom dashboard. Configure automated data feeds from CSPM tools, DSAR tracking system, consent management platform, and encryption audit results. Set up weekly compliance report distribution to the Encarregado and executive team.",
              check:
                "LGPD compliance dashboard deployed with key metrics tracked, automated data feeds from compliance tools, weekly reports distributed, and compliance trends visible over time",
            },
            {
              title:
                "Implement automated evidence collection for ANPD audit readiness",
              control:
                "LGPD Art. 26 (ANPD Supervision), Art. 37 (Records of Processing)",
              how: "Automate evidence collection to maintain ANPD audit readiness. Collect: encrypted data store inventory (from CSPM tools), access review records (from IAM tools), vulnerability scan history (from scanner dashboards), DSAR response records (from tracking system), consent records (from CMP), DPIA/RIPD assessments (from document repository), incident response records (from SIEM), cross-border transfer register (from governance tool), and security measure documentation (from policy repository). Implement automated collection using AWS Lambda, Azure Logic Apps, GCP Cloud Functions, or scheduled scripts. Store evidence in an immutable repository (S3 with Object Lock, Azure Immutable Blob Storage). Organize evidence by LGPD article and compliance domain for easy retrieval during ANPD inquiries.",
              check:
                "Automated evidence collection implemented for all LGPD compliance domains, evidence stored in immutable repository, organized by LGPD article, and retrieval process documented",
            },
            {
              title:
                "Establish ongoing training and awareness program for LGPD compliance",
              control:
                "LGPD Art. 50 (Codes of Good Practice), Art. 46 (Security Measures)",
              how: "Establish an ongoing LGPD training and awareness program. Create training modules: (1) LGPD fundamentals for all employees — principles, data subject rights, incident reporting; (2) role-specific training for developers — secure coding, data minimization, encryption; (3) role-specific training for ops — access control, logging, incident response; (4) role-specific training for business — lawful basis selection, consent management, DPIA triggers. Implement training delivery: onboarding training for new hires, quarterly refresher courses, annual comprehensive review, and ad-hoc training for regulatory changes. Track completion rates and quiz scores. Document the training program in the LGPD compliance evidence package for ANPD review.",
              check:
                "LGPD training program documented with role-specific modules, training delivery scheduled (onboarding, quarterly, annual), completion tracking operational, and quiz scores recorded for compliance evidence",
            },
          ],
        },
        {
          day: 60,
          title: "AWS LGPD Controls — Macie, Config, GuardDuty & Security Hub",
          tasks: [
            {
              title:
                "Configure Amazon Macie for Brazilian PII pattern detection in S3",
              control:
                "LGPD Art. 46 (Security Measures), Art. 6 (Data Minimization)",
              how: "Enable Amazon Macie for continuous sensitive data discovery in S3 with Brazilian PII patterns. Enable Macie for all S3 buckets in the organization. Configure managed data identifiers for common patterns (credit card numbers, email addresses, phone numbers). Create custom data identifiers for Brazilian-specific patterns: CPF (###.###.###-##), CNPJ (##.###.###/####-##), RG patterns, and Brazilian phone numbers (+55). Configure automated remediation: alert on S3 buckets that become public, alert on buckets containing Brazilian PII with overly permissive bucket policies, and auto-enable Macie for newly created buckets. Configure Macie findings export to SNS for SIEM integration. Document Macie coverage, custom data identifiers, and alert response procedures.",
              check:
                "Macie enabled across all S3 buckets with Brazilian PII custom data identifiers, automated remediation for public buckets enabled, findings exported to SIEM, and response procedures documented",
            },
            {
              title:
                "Deploy AWS Config Rules for LGPD-specific compliance baselines",
              control:
                "LGPD Art. 46 (Security Measures), Art. 47 (Security Standards)",
              how: "Deploy AWS Config rules tailored to LGPD compliance requirements. Essential rules: s3-bucket-ssl-requests-only (encrypted transit), rds-storage-encrypted (encryption at rest), iam-password-policy (access control), restricted-ssh (network security), cloudtrail-enabled (audit logging), access-keys-rotated (credential management), and encrypted-volumes (storage encryption). Custom rules using Config Rules Development Kit: verify encryption algorithms meet AES-256, validate security group rules against approved list, check that S3 buckets containing PII have appropriate bucket policies, verify CloudTrail is enabled in all regions, and validate that personal data stores have correct retention tags. Aggregate Config data across all accounts into a central security account. Configure automatic remediation for critical non-compliance findings using Systems Manager Automation.",
              check:
                "AWS Config rules deployed for LGPD compliance baselines with managed and custom rules, automatic remediation for critical non-compliance, and compliance reporting aggregated to central account",
            },
            {
              title:
                "Configure GuardDuty for personal data threat detection",
              control:
                "LGPD Art. 48 (Incident Response), Art. 46 (Security Measures)",
              how: "Enable Amazon GuardDuty across all accounts and regions with detection rules focused on personal data threats. Configure: anomaly detection for API calls accessing personal data stores, VPC Flow Logs analysis for data exfiltration attempts, DNS log analysis for command-and-control communication, S3 data event monitoring for personal data access patterns, and EKS audit log monitoring. Create custom threat intelligence lists for known-good IPs. Build GuardDuty reaction playbooks for findings related to personal data: unauthorized access to Macie-classified buckets, unusual data download patterns from personal data stores, and credential compromise affecting personal data access. Configure finding export to SIEM for correlation with ANPD notification requirements.",
              check:
                "GuardDuty enabled across all accounts with personal data threat detection rules, custom threat intelligence configured, reaction playbooks for personal data findings, and findings exported to SIEM",
            },
            {
              title:
                "Enable Security Hub for centralized LGPD security posture",
              control:
                "LGPD Art. 46 (Security Measures), Art. 26 (ANPD Powers)",
              how: "Enable AWS Security Hub in all accounts with LGPD-relevant security standards. Enable: AWS Foundational Security Best Practices (FSBP), CIS AWS Foundations Benchmark, and NIST SP 800-53. For each standard: review passing vs. failing controls, prioritize remediation of critical and high-severity failures that impact personal data protection, and track compliance trends. Enable Security Hub integrations: GuardDuty findings, Inspector findings, Macie findings, IAM Access Analyzer findings. Configure custom insights to track LGPD compliance by account, resource type, and data classification. Document the Security Hub configuration, LGPD compliance targets, and reporting process for the Encarregado.",
              check:
                "Security Hub enabled across all accounts with FSBP, CIS, and NIST standards, personal-data-focused insights configured, and LGPD compliance reporting established for Encarregado",
            },
          ],
        },
        {
          day: 65,
          title: "Azure & GCP LGPD Controls — Defender, Sentinel, SCC & DLP",
          tasks: [
            {
              title:
                "Enable Microsoft Defender for Cloud and Sentinel for LGPD monitoring on Azure",
              control:
                "LGPD Art. 46 (Security Measures), Art. 48 (Incident Response)",
              how: "Enable Microsoft Defender for Cloud across all Azure subscriptions with Standard tier. Enable Defender plans for: Servers (P2 for EDR), App Service, Storage, Containers, SQL, Key Vault, Resource Manager, and DNS. Configure auto-provisioning of Log Analytics agent. Deploy Microsoft Sentinel in a dedicated Log Analytics workspace with data connectors: Azure Activity Logs, Entra ID sign-in/audit logs, Defender for Cloud alerts, Azure WAF logs, and NSG flow logs. Create analytics rules for personal data threat detection: impossible travel on accounts with PII access, mass file download from classified storage, privilege escalation on personal data resources. Configure automated playbooks for incident response. Document the architecture and LGPD compliance mapping.",
              check:
                "Defender for Cloud enabled with Standard tier, Sentinel deployed with personal-data-focused analytics rules, automated playbooks configured, and LGPD compliance mapping documented",
            },
            {
              title:
                "Configure GCP Security Command Center and Cloud DLP for LGPD compliance",
              control:
                "LGPD Art. 46 (Security Measures), Art. 47 (Security Standards)",
              how: "Enable Google Cloud Security Command Center Premium across all projects. Enable threat detection: Event Threat Detection for real-time log analysis, Web Security Scanner for application vulnerabilities, Container Threat Detection for runtime security. Deploy Cloud DLP API for Brazilian PII inspection: configure inspection templates for CPF, CNPJ, RG patterns, scan BigQuery datasets and Cloud Storage buckets, schedule recurring inspection jobs. Configure Organization Policy constraints: restrict resource locations to Brazil, disable service account key creation, require OS Login for VMs, enforce uniform bucket-level access. Enable Chronicle SIEM for centralized log analysis with detection rules for personal data threats. Document the GCP LGPD compliance configuration.",
              check:
                "SCC Premium enabled across all projects, Cloud DLP configured for Brazilian PII patterns, Organization Policy constraints for data residency, and Chronicle SIEM with personal data threat detection",
            },
            {
              title:
                "Deploy Azure Purview and GCP Cloud DLP for automated data classification",
              control:
                "LGPD Art. 46 (Security Measures), Art. 37 (Records of Processing)",
              how: "Deploy comprehensive data classification across Azure and GCP. For Azure: configure Microsoft Purview scanning across all data sources (Azure SQL, Synapse, Cosmos DB, Blob Storage, Data Lake), enable classification using built-in sensitive information types for Brazilian identification numbers, configure DLP policies for Exchange, SharePoint, OneDrive, and Teams blocking external sharing of classified data. For GCP: configure Cloud DLP inspection jobs for BigQuery datasets and Cloud Storage, enable DLP findings export to BigQuery for compliance reporting, configure de-identification templates for data masking. Document the classification taxonomy, DLP policy inventory, and data catalog integration. Verify classification results feed into the RIPD and compliance dashboards.",
              check:
                "Purview deployed across Azure data sources with Brazilian PII classification, GCP Cloud DLP scanning BigQuery and Cloud Storage, DLP policies blocking external sharing, and classification feeding into RIPD",
            },
            {
              title:
                "Implement Alibaba Cloud LGPD controls — Security Center, Config & RAM",
              control:
                "LGPD Art. 46 (Security Measures), Art. 47 (Security Standards)",
              how: "Configure Alibaba Cloud controls for LGPD compliance. Enable Security Center across all ECS instances for vulnerability scanning, baseline checks, and threat detection. Enable Cloud Config for resource compliance monitoring with rules for: storage encryption (OSS, RDS), network security (security groups, VPCs), access control (RAM policies), and logging (ActionTrail). Configure RAM: least-privilege policies for each role, MFA for all RAM users, password policies (16+ characters, 90-day rotation), and quarterly access reviews. Enable ActionTrail for all regions with log delivery to OSS with versioning. Configure KMS with customer master keys for personal data stores, automatic rotation, and access policies restricting usage to specific RAM roles. Document the Alibaba LGPD compliance configuration.",
              check:
                "Alibaba Security Center, Cloud Config, and ActionTrail enabled for LGPD compliance, RAM least-privilege policies with MFA enforced, KMS keys configured with rotation, and compliance documented",
            },
          ],
        },
        {
          day: 70,
          title: "Continuous Compliance, ANPD Audit Prep & Common Findings Remediation",
          tasks: [
            {
              title:
                "Document common ANPD findings and create a remediation playbook",
              control:
                "LGPD Art. 26 (ANPD Powers), Art. 52 (Administrative Sanctions)",
              how: "Compile a remediation playbook for the most common LGPD compliance findings. Typical findings: missing Encarregado appointment (remediate: appoint with public contact details), incomplete RIPD (remediate: populate with all processing activities), missing consent management (remediate: deploy CMP with Art. 8 compliance), inadequate data subject rights procedures (remediate: build DSAR workflows for all six Art. 18 rights), no incident notification process (remediate: build ANPD notification process under Art. 48), missing cross-border transfer mechanisms (remediate: sign SCCs and document Transfer Impact Assessments), inadequate security measures (remediate: implement Art. 46 encryption and access controls), and no DPIA/RIPD for high-risk processing (remediate: establish DPIA workflow under Art. 38). Document each finding with root cause, remediation steps, prevention controls, and detection mechanism.",
              check:
                "LGPD findings playbook documented with 8+ common findings, remediation steps for each, prevention controls, detection mechanisms, and playbook reviewed by Encarregado and legal team",
            },
            {
              title:
                "Establish quarterly LGPD compliance review and reporting cadence",
              control:
                "LGPD Art. 26 (ANPD Supervision), Art. 50 (Codes of Good Practice)",
              how: "Establish a quarterly compliance review process that maintains continuous LGPD compliance. Define the review scope: RIPD completeness and accuracy, DSAR response metrics (volume, SLA compliance, resolution rate), consent management metrics (coverage, withdrawal rate, propagation time), security incident metrics (count, severity, notification compliance), vulnerability management metrics (critical/high count, remediation SLA compliance), encryption compliance rate, cross-border transfer register currency, and DPIA/RIPD completion rate. Implement quarterly review meetings with the Encarregado, engineering leads, and executive team. Generate quarterly compliance reports for board/management review. Schedule annual comprehensive LGPD compliance audit (internal or external). Document the review process, meeting cadence, and reporting templates.",
              check:
                "Quarterly compliance review process documented with defined scope and metrics, compliance reports generated for management, annual audit scheduled, and review cadence operational",
            },
            {
              title:
                "Implement automated compliance drift detection and alerting",
              control:
                "LGPD Art. 46 (Security Measures), Art. 26 (ANPD Powers)",
              how: "Implement automated detection of compliance drift from established LGPD baselines. Configure alerts for: new unencrypted data stores detected (via CSPM tools), new public S3 buckets or blob containers, IAM policy changes increasing privileges on personal data stores, new cross-border data flows detected in VPC Flow Logs, consent management configuration changes, and DSAR SLA approaching deadline. Use AWS EventBridge, Azure Event Grid, GCP Cloud Functions, or Alibaba EventBridge for event-driven alerting. Implement weekly compliance drift reports comparing current state against baseline. Configure escalation for critical drift (security posture change affecting personal data). Document the drift detection rules, alert routing, and remediation process.",
              check:
                "Compliance drift detection configured with automated alerting for critical changes, weekly drift reports generated, escalation process documented, and drift detection tested with simulated changes",
            },
            {
              title:
                "Build LGPD compliance evidence package for potential ANPD inquiry",
              control:
                "LGPD Art. 26 (ANPD Supervision), Art. 37 (Records of Processing)",
              how: "Assemble a comprehensive LGPD compliance evidence package ready for ANPD inquiry. Include: (1) RIPD — complete registry of all processing activities, (2) Privacy Notice — current version with version history, (3) Consent records — sample showing compliance with Art. 8, (4) DSAR log — showing response times and completeness, (5) DPIA/RIPD assessments — for all high-risk processing, (6) Security measures documentation — encryption, access controls, audit logging, (7) Incident response records — including any ANPD notifications, (8) Cross-border transfer register — with SCCs and Transfer Impact Assessments, (9) Vendor DPAs — with Art. 39 operator obligations, (10) Encarregado appointment — with contact details and responsibilities, (11) Training records — completion rates and quiz scores, (12) Vulnerability management — scan results and remediation records. Store in a secure, version-controlled repository accessible to legal and compliance teams.",
              check:
                "LGPD compliance evidence package assembled with all 12 categories documented, stored in secure version-controlled repository, and retrieval process documented for ANPD inquiry",
            },
          ],
        },
      ],
    },
  ],
};

export default function Lgpd() {
  return <LearningFrameworkPage framework={FRAMEWORK} />;
}

export { FRAMEWORK };
