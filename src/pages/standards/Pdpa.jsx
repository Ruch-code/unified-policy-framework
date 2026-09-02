import LearningFrameworkPage from "../../components/LearningFrameworkPage";

const FRAMEWORK = {
  id: "pdpa",
  name: "PDPA (Singapore)",
  region: "Singapore",
  color: "red",
  flag: "🇸🇬",
  flagAnimation: "bounce",
  basePath: "/pdpa",
  referenceUrl:
    "https://www.pdpc.gov.sg/Overview-of-PDPA/The-Legislation/Personal-Data-Protection-Act",
  weeks: 4,
  milestones: 3,
  hoursByLevel: [4, 8, 5, 3],
  startupGaps: [
    {
      itgc: "Data Governance",
      gap: "No Data Protection Officer (DPO) appointed as required by PDPA Sec. 11(3)",
      pushback: "We're too small to need a formal DPO — our CTO handles privacy.",
      reality: "PDPA Sec. 11(3) mandates every organization to appoint at least one DPO responsible for ensuring PDPA compliance. The DPO's name must be accessible publicly (or to PDPC on request). Not having one is a statutory violation even for startups.",
      policy: "Data Protection Officer Appointment Policy, Privacy Governance Charter",
      compensating: [
        "Appoint an internal DPO (even part-time) and publish their contact details",
        "If no internal resource, engage an external DPO service provider",
        "Document the DPO's responsibilities in a formal appointment letter"
      ],
      leantip: "Name your most privacy-aware person as DPO and publish their contact on your website. PDPC doesn't require a full-time role — a named individual with clear responsibilities satisfies the requirement."
    },
    {
      itgc: "Consent Management",
      gap: "No purpose-specific consent collection — blanket consent for all processing",
      pushback: "We ask users to agree to our terms; that covers everything.",
      reality: "PDPA Sec. 13-17 require consent to be specific to the purpose, not blanket. You must notify users of purposes before or at collection, and consent must be reasonably inferred or express. Blanket consent doesn't meet PDPA standards and exposes you to PDPC enforcement.",
      policy: "Consent Management Policy, Purpose-Specific Privacy Notice",
      compensating: [
        "Map each data collection point to its specific purpose in a consent registry",
        "Implement purpose-level consent capture (separate consents for marketing, analytics, etc.)",
        "Build a consent withdrawal mechanism that processes within 30 days"
      ],
      leantip: "Create a simple table: each column is a data collection point (signup form, analytics, support), each row is the specific purpose. This gives you purpose-specific consent mapping in 30 minutes."
    },
    {
      itgc: "Data Breach Response",
      gap: "No mandatory data breach notification process for notifiable breaches",
      pushback: "We'll notify people if something bad happens — we don't need a formal process.",
      reality: "PDPA Sec. 26D mandates notification to PDPC within 3 calendar days for notifiable breaches (significant harm + significant scale). Sec. 26E requires notifying affected individuals. Pre-building the process is essential — you won't have 3 days to figure it out during a crisis.",
      policy: "Data Breach Response Plan, PDPC Notification Procedure",
      compensating: [
        "Draft a one-page PDPC notification template with required fields pre-filled",
        "Assign an incident commander and backup for the 72-hour notification window",
        "Pre-stage a communication draft for affected individuals"
      ],
      leantip: "Fill in the PDPC notification form NOW — before you need it. Include: nature of breach, affected individuals count, data types compromised, remedial measures taken. Having it ready halves your response time."
    },
    {
      itgc: "DNC Registry Compliance",
      gap: "No Do Not Call (DNC) Registry screening for marketing messages",
      pushback: "We only email people who signed up — DNC is for phone calls.",
      reality: "PDPA Sec. 43-44 and the DNC provisions apply to marketing messages via telephone, fax, and email. The DNC Registry has three registers: voice, fax, and message (email). You must check the relevant register before sending marketing messages. Exemptions exist for existing customers (Section 42(1)(c)) but you must still honor opt-out requests.",
      policy: "DNC Registry Compliance Policy, Marketing Communications Policy",
      compensating: [
        "Register with the DNC Registry and implement automated checking before marketing sends",
        "Implement opt-out/unsubscribe mechanisms in all marketing emails",
        "Document the existing customer exemption criteria and apply it correctly"
      ],
      leantip: "Sign up for DNC Registry access at pdpc.gov.sg, implement automated checking in your email platform, and add unsubscribe links to every marketing email. This covers voice, fax, and message channels."
    },
    {
      itgc: "Cross-Border Transfer",
      gap: "No contractual or binding corporate rules for cross-border data transfers",
      pushback: "Our data is in Singapore cloud regions; we don't transfer internationally.",
      reality: "Even if primary storage is in Singapore, SaaS tools (analytics, CRM, email) often process data in US or other data centers. PDPA Sec. 26 requires that organizations ensure overseas recipients provide comparable protection. Without contractual protections, you're in breach of the transfer obligation.",
      policy: "Cross-Border Data Transfer Policy, International Transfer Register",
      compensating: [
        "Audit all SaaS tools and identify where personal data is processed geographically",
        "Execute contractual clauses requiring overseas recipients to provide PDPA-equivalent protection",
        "Prefer Singapore or ASEAN-region cloud regions for personal data storage"
      ],
      leantip: "Run a quick inventory: for every SaaS tool, check where its data centers are. If any are outside Singapore, ensure contractual clauses requiring PDPA-equivalent protection are in place with each vendor."
    }
  ],
  privacyStartupNotes:
    "PDPA note: Singapore's PDPA is one of Asia's most mature data protection regimes. The mandatory DPO appointment, 72-hour breach notification for notifiable breaches, and DNC Registry compliance are unique requirements that often catch startups off guard. Unlike GDPR, PDPA has a specific 'deemed consent' provision (Sec. 15) for business improvement and legitimate interests, which can simplify some processing. The PDPC actively enforces with financial penalties up to SGD 1 million or 10% of annual turnover.",
  weeksData: [
    {
      week: 1,
      title: "L1 Foundation — PDPA Principles, DPO & Data Mapping",
      description:
        "Map PDPA scope to your environment, understand the 11 Obligations under Part IV, appoint a DPO, and build the foundation for PDPC compliance.",
      days: [
        {
          day: 1,
          title: "PDPA Scope, the 11 Obligations & Purpose Limitation",
          tasks: [
            {
              title:
                "Determine PDPA applicability and map processing activities to the 11 Obligations under Part IV",
              control:
                "PDPA Sec. 4 (Exemptions), Sec. 13-26 (11 Obligations), Part IV",
              how: "Inventory all processing activities across AWS, Azure, GCP, and Alibaba environments. Map each activity to the relevant PDPA Obligations: Consent (Sec. 13), Purpose Limitation (Sec. 18), Notification (Sec. 20), Access & Correction (Sec. 21-22), Accuracy (Sec. 23), Protection (Sec. 24), Retention Limitation (Sec. 25), Transfer Limitation (Sec. 26), Data Breach Notification (Sec. 26D-E), Accountability (Sec. 11-12), and Data Intermediaries (Sec. 4). Use AWS Config, Azure Resource Graph, GCP Cloud Asset Inventory, and Alibaba Cloud Config to discover data stores containing personal data. Store the mapping in a central registry.",
              check:
                "Processing activity registry populated with all data flows mapped to PDPA Part IV Obligations, data stores discovered across all four clouds, and registry stored in central database",
            },
            {
              title:
                "Appoint a Data Protection Officer (DPO) per Sec. 11(3) and define responsibilities",
              control:
                "PDPA Sec. 11(3) (DPO Appointment), Sec. 11(4) (DPO Responsibilities), Sec. 12 (Accountability)",
              how: "Appoint a DPO as required by PDPA Sec. 11(3). The DPO must be a named individual responsible for: (I) ensuring PDPA compliance, (II) developing and implementing data protection policies and practices, (III) developing a communication program for PDPA compliance, and (IV) responding to data subject queries and PDPC inquiries. The DPO's business contact information must be accessible publicly or provided to PDPC on request. Document the appointment in a formal letter with: DPO name, contact details, scope of authority, reporting line (ideally CEO/board), and resources allocated. If appointing an external DPO service, execute a service agreement with PDPC-required response SLAs.",
              check:
                "DPO appointed with formal appointment letter, publicly accessible contact details, responsibilities defined per Sec. 11(4), and reporting line established to executive leadership",
            },
            {
              title:
                "Build a PDPA compliance register mapping data flows to Obligations",
              control:
                "PDPA Sec. 12 (Accountability), Sec. 11(2) (Compliance Responsibility)",
              how: "Create a PDPA compliance register as the central accountability document under Sec. 12. For each data flow: document the purpose, categories of personal data collected, data subject categories, consent mechanism (express, deemed, or exempted), retention period, third-party recipients, cross-border transfers, security measures, and applicable Obligations. Store in AWS DynamoDB, Azure SQL, or GCP Cloud SQL as a queryable database. Include fields: flow_id, purpose, data_categories, consent_type, retention_days, recipients, cross_border_destinations, security_measures, applicable_obligations. Automate register updates by linking to deployment processes.",
              check:
                "PDPA compliance register populated with all data flows, consent mechanisms documented per flow, cross-border transfers mapped, and register linked to deployment pipeline for automated updates",
            },
            {
              title:
                "Classify personal data using automated scanners across all cloud environments",
              control:
                "PDPA Sec. 24 (Protection), Sec. 2 (Definitions — Personal Data)",
              how: "Deploy automated data classification to discover and tag personal data across all environments. For AWS: enable Amazon Macie with custom data identifiers for Singapore NRIC patterns (S/N/F/G number format), FIN, and work permit numbers. For Azure: configure Microsoft Purview scanning with sensitive information types. For GCP: deploy Cloud DLP API inspection jobs for Singapore identification patterns. For Alibaba: configure Data Security Center for data classification. Build a classification taxonomy: ordinary personal data, sensitive personal data (PDPA doesn't have a formal 'special category' like GDPR but health, financial, and children's data warrant enhanced protection), and publicly available data. Tag all discovered data stores with classification labels.",
              check:
                "Automated classification running across all four clouds with Singapore PII patterns, classification taxonomy documented, and data catalog populated with PII locations and owners",
            },
            {
              title:
                "Define retention schedules and implement automated lifecycle controls",
              control:
                "PDPA Sec. 25 (Retention Limitation), Sec. 25(1) (No Longer Than Necessary)",
              how: "Define retention periods per data category aligned with PDPA Sec. 25's requirement that personal data is not retained longer than necessary for the legal or business purpose. For customer data: account lifetime plus 30 days. For analytics: 12 months maximum. For access logs: 6 months. For marketing data: until consent withdrawal. Implement automated enforcement: S3 lifecycle policies for object storage, Azure Blob lifecycle management, GCP Object Lifecycle Rules, and scheduled purge jobs for databases. Document the legal/business justification for each retention period to satisfy PDPC inquiry. Implement data disposal procedures with verification logging.",
              check:
                "Retention schedule defined per data category with business justification documented, automated lifecycle enforcement configured, and purge jobs scheduled and tested",
            },
          ],
        },
        {
          day: 2,
          title: "Consent, Purpose Limitation & Notification Obligations",
          tasks: [
            {
              title:
                "Implement purpose-specific consent collection meeting Sec. 13-14 requirements",
              control:
                "PDPA Sec. 13 (Consent Obligation), Sec. 14 (Notification of Purpose), Sec. 15 (Deemed Consent)",
              how: "Build consent management meeting PDPA Sec. 13-15 requirements. For express consent (Sec. 13): implement purpose-specific consent capture at each data collection point — separate consent for marketing, analytics, profiling, and third-party sharing. For deemed consent (Sec. 15): document where deemed consent applies (voluntary provision of data for a purpose reasonably apparent, or contractual necessity) and ensure notification requirements are met. For notification (Sec. 14): before or at the time of collection, notify data subjects of the purpose(s) using clear, plain language. Implement consent record storage (user_id, purpose, consent_state, timestamp, version, source) in DynamoDB or CosmosDB. Build consent withdrawal mechanism processing within 30 days.",
              check:
                "Purpose-specific consent collection implemented at all data collection points, deemed consent scenarios documented, Sec. 14 notifications published, and consent withdrawal mechanism processing within 30 days",
            },
            {
              title:
                "Draft and publish a PDPA-compliant Privacy Policy with purpose notifications",
              control:
                "PDPA Sec. 14 (Notification), Sec. 20 (Access), Sec. 22 (Correction)",
              how: "Create a Privacy Policy covering PDPA requirements: (I) purposes of collection, use, and disclosure of personal data, (II) how to access and correct personal data (Sec. 20-22), (III) how to withdraw consent, (IV) how to make complaints, (V) DPO contact details, (VI) data protection policies and practices, and (VII) third-party data recipients. Implement purpose notifications at each data collection point (web forms, APIs, mobile apps). Publish the Privacy Policy on your website with version control. For Singapore-specific requirements: address the DNC Registry provisions for marketing messages and the cross-border transfer disclosure under Sec. 26. Include a summary of the 11 Obligations in plain language.",
              check:
                "Privacy Policy published covering all PDPA requirements, purpose notifications at all collection points, DNC Registry provisions addressed, and version control maintained",
            },
            {
              title:
                "Implement access and correction request workflows under Sec. 20-22",
              control:
                "PDPA Sec. 20 (Access Obligation), Sec. 22 (Correction Obligation), Sec. 21 (Access Fee)",
              how: "Build data access and correction workflows meeting PDPA Sec. 20-22. For access requests (Sec. 20): implement a request intake process, identity verification, data discovery across all systems, data provision in a comprehensible format within 30 days, and disclosure of third-party recipients. For correction requests (Sec. 22): implement a correction process, verify correction across all systems storing the data, notify third-party recipients of the correction, and respond within 30 days. For access fees (Sec. 21): define a reasonable fee schedule for access requests if applicable. Implement SLA tracking for 30-day response window. Log all access/correction activity for accountability evidence.",
              check:
                "Access request workflow implemented with 30-day SLA, correction request workflow with third-party notification, fee schedule defined for access requests, and all activity logged for accountability",
            },
            {
              title:
                "Build notification processes for data collection purposes under Sec. 14",
              control:
                "PDPA Sec. 14 (Notification Obligation), Sec. 14(1) (Notification at Collection)",
              how: "Implement purpose notification mechanisms at every personal data collection point. For web forms: display purpose-specific privacy notices before form submission, with clear descriptions of how data will be used. For APIs: include privacy notice links in API documentation and consent capture flows. For mobile apps: display privacy notices during onboarding with purpose-specific consent toggles. For telephone/in-person collection: develop scripts and forms with purpose disclosure. Document the notification content requirements: purpose of collection, entity collecting the data, DPO contact, and how to withdraw consent. Implement version control for notices and track when versions are updated (to re-notify data subjects of material changes).",
              check:
                "Purpose notifications implemented at all collection points (web, API, mobile, phone/in-person), version control for notices, re-notification process for material changes documented",
            },
          ],
        },
        {
          day: 3,
          title: "Breach Notification, DNC Registry & Cross-Border Controls",
          tasks: [
            {
              title:
                "Build a notifiable data breach notification process under Sec. 26A-26E",
              control:
                "PDPA Sec. 26A (Mandatory Breach Notification), Sec. 26B (Significant Harm), Sec. 26C (Significant Scale), Sec. 26D (PDPC Notification), Sec. 26E (Individual Notification)",
              how: "Build a data breach notification process compliant with PDPA Sec. 26A-26E. A breach is notifiable if it: (I) results in, or is likely to result in, significant harm to affected individuals (Sec. 26B — e.g., NRIC, financial data, passwords), OR (II) is of a significant scale (Sec. 26C — 500+ individuals). Notification to PDPC must occur within 3 calendar days of assessment (Sec. 26D). Notification to affected individuals must occur as soon as practicable (Sec. 26E). Draft the PDPC notification form with required fields: nature of breach, types of data affected, number of individuals, remedial measures taken, and DPO contact. Implement the response process: detection, assessment (notifiability determination within 3 days), containment, PDPC notification, individual notification, and post-incident review.",
              check:
                "Breach notification process documented with notifiability assessment criteria (Sec. 26B-C), PDPC notification template with required fields, 3-calendar-day SLA, and test notification executed",
            },
            {
              title:
                "Implement Do Not Call (DNC) Registry screening for all marketing channels",
              control:
                "PDPA Sec. 43 (DNC Registry), Sec. 44 (Prohibition), Sec. 42 (Exemptions)",
              how: "Implement DNC Registry compliance for all marketing communications. Register with the PDPC DNC Registry and obtain access to check numbers/email addresses against the three registers: voice, fax, and message (email). For voice marketing: implement automated DNC check before calling numbers. For email marketing: implement automated DNC check before sending, and include unsubscribe mechanisms in every marketing email. Document the existing customer exemption under Sec. 42(1)(c): organizations may send messages to existing customers without DNC check if the message relates to similar products/services and an opt-out mechanism is provided. Implement opt-out tracking and honor opt-out requests within 30 days.",
              check:
                "DNC Registry screening implemented for voice, fax, and email marketing channels, existing customer exemption documented and applied correctly, unsubscribe mechanisms in all marketing emails, and opt-out requests honored within 30 days",
            },
            {
              title:
                "Assess and document cross-border data transfer obligations under Sec. 26",
              control:
                "PDPA Sec. 26 (Transfer Limitation Obligation), Sec. 26(1) (Comparable Protection)",
              how: "Audit all SaaS tools and cloud services to identify where personal data of Singapore residents is processed. For each cross-border transfer: document the destination country, verify the overseas recipient provides comparable protection to PDPA (Sec. 26(1)), execute contractual clauses requiring PDPA-equivalent protection, and document the assessment. For US-based SaaS tools: verify data residency options, execute data processing agreements referencing Sec. 26. Implement technical controls: AWS Organizations SCPs restricting regions, Azure Policy for resource location compliance, GCP Organization Policy constraints. Create a cross-border transfer register with quarterly review. Document any binding corporate rules or contractual arrangements for intra-group transfers.",
              check:
                "Cross-border transfer register documented with all international data flows, contractual clauses with PDPA-equivalent protection executed for each, technical controls enforcing data residency, and quarterly review scheduled",
            },
            {
              title:
                "Implement data protection impact assessment workflow for high-risk processing",
              control:
                "PDPA Sec. 12 (Accountability), PDPC Advisory Guidelines on DPIA",
              how: "Establish a Data Protection Impact Assessment (DPIA) workflow for new processing activities involving personal data. While PDPA doesn't mandate DPIA like GDPR Art. 35, the PDPC Advisory Guidelines recommend it for high-risk processing. Define high-risk triggers: processing sensitive financial or health data, large-scale profiling, automated decision-making with legal effects, and cross-border transfers. Build the DPIA template: description of processing, data categories, purposes, consent mechanism, third-party sharing, cross-border transfers, security measures, risk assessment, and mitigation measures. Integrate DPIA triggers into the SDLC: require DPIA completion before production deployment of features touching personal data. Maintain a DPIA register tracking all completed assessments.",
              check:
                "DPIA workflow established with template and high-risk triggers defined, SDLC integration for automatic triggering, and register tracking all completed assessments with status",
            },
          ],
        },
      ],
    },
    {
      week: 2,
      title: "L2 Implementer — Technical Controls & Cloud Security per PDPA",
      description:
        "Implement cloud-native technical controls for PDPA compliance: encryption, access management, breach detection, DNC automation, and data protection across AWS, Azure, GCP, and Alibaba.",
      days: [
        {
          day: 8,
          title: "Encryption, Access Control & Breach Detection Infrastructure",
          tasks: [
            {
              title:
                "Deploy AES-256 encryption at rest across all data stores with PDPA key management",
              control:
                "PDPA Sec. 24 (Protection Obligation), Sec. 24(1) (Reasonable Security)",
              how: "Enable AES-256 encryption at rest on every data store containing personal data of Singapore residents. For AWS: enable RDS encryption (KMS CMK), EBS encryption by default, S3 default encryption (SSE-KMS), and DynamoDB encryption at rest. For Azure: enable TDE on Azure SQL, Azure Disk Encryption, Azure Blob encryption with customer-managed keys. For GCP: enable Cloud SQL encryption, Persistent Disk encryption, and Cloud Storage default encryption with CMEK. For Alibaba: enable RDS encryption, ESSD encryption, and OSS server-side encryption. Configure KMS key rotation (annual minimum), key access policies, and key inventory documentation. Document the encryption architecture as evidence of Sec. 24 'reasonable security' compliance.",
              check:
                "AES-256 encryption enabled on all data stores across all four clouds, KMS keys with annual rotation, access policies documented, and encryption architecture documented for Sec. 24 compliance",
            },
            {
              title:
                "Implement RBAC with least-privilege policies and automated access reviews",
              control:
                "PDPA Sec. 24 (Protection Obligation), Sec. 11(1) (Accountability)",
              how: "Deploy role-based access control with least-privilege principles across all environments. For AWS: create IAM roles with permission boundaries, use IAM Identity Center for SSO, implement SCPs restricting cross-account access. For Azure: configure Entra ID RBAC with custom roles, enable PIM for privileged access, implement conditional access policies. For GCP: use IAM bindings with predefined and custom roles, apply Organization Policy constraints. For Alibaba: configure RAM roles with policy-based access. Configure automated quarterly access reviews using AWS IAM Access Analyzer, Azure AD Access Reviews, GCP IAM Recommender, and Alibaba RAM access review tools. Document the role inventory, permission grants, review process, and remediation for over-privileged accounts.",
              check:
                "RBAC deployed across all four clouds with least-privilege roles, automated quarterly access reviews configured, over-privileged accounts remediated, and role inventory documented",
            },
            {
              title:
                "Deploy SIEM with notifiable breach detection and 72-hour alerting",
              control:
                "PDPA Sec. 26A (Mandatory Breach Notification), Sec. 26D (PDPC Notification)",
              how: "Configure SIEM infrastructure with detection rules focused on notifiable data breach identification under PDPA Sec. 26A. For AWS: deploy Amazon Security Lake or integrate CloudTrail, GuardDuty, Macie, and VPC Flow Logs into a SIEM. For Azure: configure Microsoft Sentinel with data connectors for Defender for Cloud, Entra ID, and Purview. For GCP: ingest Cloud Audit Logs, VPC Flow Logs, and Cloud DLP findings into Chronicle. For Alibaba: stream ActionTrail, Security Center, and Data Security Center logs. Build correlation rules for: unauthorized access to personal data stores, mass data download from classified storage, and credential compromise affecting personal data access. Implement 72-hour (3 calendar day) notification SLA tracking from breach detection to PDPC notification readiness.",
              check:
                "SIEM configured with all cloud logs ingested, notifiable breach correlation rules deployed, 72-hour notification SLA tracking operational, and test alert for breach detection executed",
            },
            {
              title:
                "Configure WAF and network security for personal data protection",
              control:
                "PDPA Sec. 24 (Protection Obligation), Sec. 24(1) (Technical Measures)",
              how: "Deploy web application firewalls and network security controls for all public-facing endpoints. For AWS: configure AWS WAF with OWASP Top 10 rule groups, rate limiting, and geo-blocking. For Azure: configure Azure Front Door WAF with Microsoft Default Rule Set. For GCP: deploy Cloud Armor with pre-configured WAF rules. For Alibaba: configure Anti-DDoS Pro and Web Application Firewall. Implement network segmentation using security groups, NACLs, and VPC/VNet isolation. Enable VPC Flow Logs for monitoring. Configure DDoS protection. Document the network security architecture and WAF rule sets for PDPA Sec. 24 'reasonable security' evidence.",
              check:
                "WAF deployed for all public endpoints with OWASP rules, network segmentation documented, VPC Flow Logs enabled, and DDoS protection configured across all clouds",
            },
          ],
        },
        {
          day: 12,
          title: "DNC Automation, Data Discovery & Classification",
          tasks: [
            {
              title:
                "Implement automated DNC Registry checking for voice, fax, and email marketing",
              control:
                "PDPA Sec. 43 (DNC Registry), Sec. 44 (Prohibition), Sec. 42 (Exemptions)",
              how: "Build automated DNC Registry checking for all marketing channels. For email marketing: integrate DNC Registry API with your ESP (SendGrid, SES, Mailchimp) to check email addresses against the message register before sending. For voice marketing: integrate DNC API with your calling platform to check numbers against the voice register. For fax marketing: check against the fax register. Implement opt-out/unsubscribe mechanisms that honor requests within 30 days. Document the existing customer exemption logic: identify qualifying customers, verify the message relates to similar products/services, and confirm an opt-out mechanism is provided. Store DNC check logs (date, register checked, result, message sent or suppressed) for audit evidence.",
              check:
                "Automated DNC Registry checking implemented for voice, fax, and email channels, opt-out mechanisms processing within 30 days, existing customer exemption logic documented, and DNC check logs stored for audit",
            },
            {
              title:
                "Deploy automated PII discovery for Singapore personal data patterns",
              control:
                "PDPA Sec. 24 (Protection), Sec. 12 (Accountability)",
              how: "Implement automated PII discovery tuned for Singapore data patterns. For AWS: configure Amazon Macie with custom data identifiers for NRIC (S/T/F/G followed by 7 digits + checksum letter), FIN, work permit numbers, and Singapore phone numbers (+65). For Azure: configure Microsoft Purview with sensitive information types for Singapore identification numbers. For GCP: deploy Cloud DLP API inspection jobs with custom detectors for Singapore PII. For Alibaba: configure Data Security Center for Singapore PII patterns. Schedule recurring discovery jobs (weekly for all data stores, daily for high-risk stores). Build a data catalog mapping discovered PII to systems, owners, retention periods, and applicable PDPA Obligations.",
              check:
                "Automated PII discovery running for Singapore patterns across all four clouds, data catalog populated with PII locations and owners, and recurring scan schedule documented",
            },
            {
              title:
                "Configure DLP policies to prevent unauthorized personal data exposure",
              control:
                "PDPA Sec. 24 (Protection Obligation), Sec. 24(1) (Security Measures)",
              how: "Deploy Data Loss Prevention policies to prevent unauthorized exposure of personal data. For AWS: enable Amazon Macie automated remediation for public S3 buckets containing PII, configure S3 bucket policies blocking public access. For Azure: configure Microsoft Purview DLP policies for Exchange, SharePoint, OneDrive, and Teams. For GCP: deploy Cloud DLP API for real-time inspection of BigQuery data and Cloud Storage objects. For Alibaba: configure Data Security Center DLP policies. Define DLP response actions: block external sharing of classified data, alert on bulk data exports, quarantine sensitive files. Configure DLP findings export to compliance dashboards. Implement automated remediation for critical DLP violations (public bucket with NRIC data, for example).",
              check:
                "DLP policies deployed across all clouds with automated remediation for critical violations, external sharing blocked for classified data, and DLP findings exported to compliance dashboards",
            },
            {
              title:
                "Implement data masking and anonymization for non-production environments",
              control:
                "PDPA Sec. 24 (Protection), Sec. 25 (Retention Limitation)",
              how: "Implement data masking for non-production environments to prevent real personal data from appearing in staging or development. For staging: implement data masking using AWS DMS transformation rules, Azure Dynamic Data Masking, GCP Cloud DLP de-identification, or Alibaba Data Security Center masking. For development: use synthetic data generators (Faker libraries) for Singapore-specific data (NRIC, names, addresses). Enforce policy: no production PII in development; staging uses masked data only; all masking rules are documented. Configure data promotion controls: automate the process of masking production data for staging with approval gates. Verify no real production PII exists in non-production environments through regular Macie/Purview scans.",
              check:
                "Data masking configured for all non-production environments, synthetic data generators deployed for Singapore PII patterns, and policy enforced with regular verification scans",
            },
          ],
        },
        {
          day: 18,
          title: "Breach Response Automation, Consent Enforcement & Monitoring",
          tasks: [
            {
              title:
                "Implement automated breach assessment and notifiability determination",
              control:
                "PDPA Sec. 26A (Assessment), Sec. 26B (Significant Harm), Sec. 26C (Significant Scale)",
              how: "Build automated breach assessment tools to determine notifiability within 3 calendar days. Implement a breach assessment checklist: (1) Is personal data affected? (2) How many individuals affected? (3) What types of data? (4) Does it meet significant harm criteria (Sec. 26B — NRIC, financial, passwords, health data)? (5) Does it meet significant scale criteria (Sec. 26C — 500+ individuals)? (6) Can the breach be contained without notification? Automate the assessment: integrate SIEM alerts with a ticketing system (Jira, ServiceNow) that triggers the assessment workflow. Pre-populate the PDPC notification form template with fields from the incident. Configure escalation if assessment cannot be completed within 2 calendar days.",
              check:
                "Automated breach assessment workflow deployed with notifiability determination criteria, PDPC notification form pre-populated, 3-calendar-day assessment SLA enforced, and escalation configured",
            },
            {
              title:
                "Build DSAR automation for access and correction requests within 30-day SLA",
              control:
                "PDPA Sec. 20 (Access), Sec. 22 (Correction), Sec. 21 (Fee)",
              how: "Automate the access and correction request process for efficiency and PDPA compliance. For access requests (Sec. 20): implement automated identity verification, data discovery across all systems (databases, logs, SaaS tools, backups), data export in comprehensible format, third-party recipient disclosure, and response within 30 days. For correction requests (Sec. 22): implement correction propagation across all systems, third-party recipient notification, and response within 30 days. Build a request tracking system with SLA monitoring. For access fees (Sec. 21): implement automated fee calculation based on retrieval effort. Log all activity for accountability evidence under Sec. 12.",
              check:
                "DSAR automation deployed for access and correction requests, 30-day SLA tracking operational, fee calculation implemented, and all activity logged for Sec. 12 accountability",
            },
            {
              title:
                "Deploy continuous consent compliance monitoring and enforcement",
              control:
                "PDPA Sec. 13 (Consent), Sec. 16 (Withdrawal of Consent), Sec. 17 (Deemed Consent by Conduct)",
              how: "Implement continuous consent compliance monitoring. Verify: consent records exist for all active users, consent timestamps are accurate and tamper-proof, consent granularity matches documented purposes, and withdrawal requests propagate within 30 days. For consent withdrawal: verify marketing tools suppress the user, analytics tools exclude tracking, and third-party sharing ceases. Implement monitoring: automated checks for processing without valid consent, alerting on consent withdrawal SLA approaching deadline, and consent record completeness reporting. Configure consent state enforcement in application middleware — check consent before processing personal data for any purpose. Store consent records in append-only log for audit evidence.",
              check:
                "Consent compliance monitoring operational with automated checks, withdrawal propagation within 30 days verified, consent enforcement in application middleware, and audit trail maintained",
            },
            {
              title:
                "Implement security monitoring dashboards and accountability reporting",
              control:
                "PDPA Sec. 12 (Accountability), Sec. 24 (Protection Obligation)",
              how: "Build security monitoring dashboards tracking PDPA compliance posture. Key metrics: breach detection-to-notification time (vs. 3-calendar-day SLA), DSAR response time (vs. 30-day SLA), consent coverage percentage, encryption compliance rate, DNC check success rate, cross-border transfer mechanism coverage, and vulnerability remediation SLA compliance. Implement using AWS QuickSight, Azure Power BI, GCP Looker, or custom dashboard. Configure automated weekly compliance reports for the DPO and executive team. Include trend analysis showing compliance posture over time. Set up alerting for metric thresholds that approach SLA limits.",
              check:
                "PDPA compliance dashboard deployed with key metrics, weekly reports generated for DPO, trend analysis operational, and alerting configured for SLA threshold breaches",
            },
          ],
        },
        {
          day: 25,
          title: "Cloud Security Posture, Vulnerability Management & Hardening",
          tasks: [
            {
              title:
                "Deploy CSPM for PDPA-specific compliance baselines across all clouds",
              control:
                "PDPA Sec. 24 (Protection Obligation), Sec. 12 (Accountability)",
              how: "Implement cloud security posture management tools to continuously monitor configurations against PDPA security baselines. For AWS: enable Security Hub with FSBP and CIS AWS Foundations Benchmark, configure Config Rules for encryption, access control, and logging. For Azure: enable Microsoft Defender for Cloud with Standard tier, deploy Azure Policy for compliance. For GCP: enable Security Command Center Premium with Organization Policy constraints. For Alibaba: enable Security Center and Cloud Config. Map CSPM findings to PDPA Sec. 24 requirements. Configure automated remediation for critical findings. Build a compliance score tracking the percentage of resources meeting PDPA baselines.",
              check:
                "CSPM deployed across all four clouds with PDPA-mapped baselines, automated remediation for critical findings, compliance score tracked, and Sec. 24 requirements mapped to controls",
            },
            {
              title:
                "Implement vulnerability scanning and patch management with defined SLAs",
              control:
                "PDPA Sec. 24 (Protection Obligation), Sec. 24(1) (Technical Measures)",
              how: "Configure automated vulnerability scanning with defined remediation SLAs. For infrastructure: deploy AWS Inspector, Azure Defender for Servers, GCP SCC scanning, or Alibaba Security Center for weekly scans. For containers: integrate Trivy or Snyk Container into CI/CD pipelines. For dependencies: run Snyk or Dependabot daily. For cloud configurations: run CSPM tools continuously. Define SLAs: Critical = 24 hours, High = 7 days, Medium = 30 days, Low = 90 days. Configure patch management: AWS Systems Manager Patch Manager, Azure Update Management, GCP OS Patch Management, Alibaba Security Center patch management. Track vulnerability remediation progress and report monthly to DPO.",
              check:
                "Vulnerability scanning configured with defined SLAs, patch management operational, remediation tracking in place, and monthly reports generated for DPO",
            },
            {
              title:
                "Implement backup and disaster recovery controls for personal data availability",
              control:
                "PDPA Sec. 24 (Protection), Sec. 12 (Accountability)",
              how: "Implement backup and DR controls for personal data stores. For AWS: configure automated RDS backups with point-in-time recovery, enable S3 versioning and cross-region replication, use AWS Backup. For Azure: enable Azure Backup for SQL databases, configure GRS for backups, implement Azure Site Recovery. For GCP: configure Cloud SQL automated backups, enable Cloud Storage versioning. For Alibaba: enable RDS automated backups, configure OSS versioning. Define RTO/RPO targets per data category. Test backup restoration quarterly. Ensure backup encryption matches production standards. Document backup procedures and restoration test results for PDPA accountability evidence.",
              check:
                "Backup and DR configured for all personal data stores, RTO/RPO targets defined, quarterly restoration tests scheduled, and backup procedures documented for accountability evidence",
            },
            {
              title:
                "Implement infrastructure hardening aligned with CIS Benchmarks",
              control:
                "PDPA Sec. 24 (Protection Obligation), PDPC Advisory Guidelines",
              hardening:
                "Apply CIS Benchmark hardening to all infrastructure. For AWS: deploy CIS AWS Foundations Benchmark via Security Hub, harden EC2 instances using CIS Amazon Linux/Ubuntu benchmarks. For Azure: apply CIS Microsoft Azure Foundations Benchmark, harden VMs using CIS Windows Server/Linux benchmarks. For GCP: apply CIS Google Cloud Platform Foundation Benchmark, harden GCE instances. For Kubernetes: run kube-bench for CIS Kubernetes Benchmark compliance. Document the hardening standards applied, scan results, and exceptions. Configure automated drift detection to alert when configurations deviate from hardened baselines.",
              check:
                "CIS Benchmarks applied to all cloud environments and infrastructure, scan results documented, exceptions justified, and drift detection configured for automated alerting",
            },
          ],
        },
      ],
    },
    {
      week: 3,
      title: "L3 Verifier — Testing PDPA Controls & Evidence Collection",
      description:
        "Execute comprehensive testing of PDPA controls: breach notification drill, DSAR response validation, DNC compliance test, encryption audit, access review, and cross-border transfer verification.",
      days: [
        {
          day: 35,
          title: "Breach Response Drill & DSAR Validation",
          tasks: [
            {
              title:
                "Execute a full notifiable data breach notification drill with 72-hour SLA",
              control:
                "PDPA Sec. 26A-26E (Breach Notification), Sec. 26D (PDPC Notification)",
              how: "Execute a full breach notification drill simulating a notifiable breach involving 600+ individuals' NRIC numbers. Pre-drill: confirm all response team members are available, PDPC notification form is current, and communication channels are tested. During drill: detect the 'incident' via SIEM alert, execute notifiability assessment (significant harm + significant scale), complete assessment within 2 calendar days, draft PDPC notification within 3 calendar days (Sec. 26D), draft individual notification (Sec. 26E), and measure time from detection to notification readiness. Post-drill: document lessons learned, update response procedures, and schedule next drill. Verify the PDPC notification includes all required fields: nature of breach, data types, individuals affected, remedial measures, and DPO contact.",
              check:
                "Breach notification drill executed with 3-calendar-day PDPC notification completed, individual notification drafted, notifiability assessment documented, and lessons learned recorded",
            },
            {
              title:
                "Execute end-to-end DSAR response test for access and correction within SLA",
              control:
                "PDPA Sec. 20 (Access), Sec. 22 (Correction), Sec. 21 (Fee)",
              how: "Execute a complete DSAR response test using a test account. For access requests (Sec. 20): submit a request, verify identity verification process, measure data discovery time across all systems, validate data export in comprehensible format, verify third-party recipient disclosure, and confirm response within 30 days. For correction requests (Sec. 22): submit a correction, verify correction propagates across all systems, verify third-party notification, and confirm response within 30 days. Test edge cases: request for data you don't hold, request to delete data with legal retention requirements, and request involving data shared with third parties. Document the response time per stage and any gaps found.",
              check:
                "End-to-end DSAR test completed for access and correction within 30-day SLA, edge cases tested, third-party notification verified, and response time per stage documented",
            },
            {
              title:
                "Audit consent records and test consent withdrawal propagation",
              control:
                "PDPA Sec. 13 (Consent), Sec. 16 (Withdrawal), Sec. 17 (Deemed Consent)",
              how: "Audit the consent management system against PDPA requirements. Verify: consent records exist for all active users with express consent, consent timestamps are accurate, consent granularity matches documented purposes, and withdrawal requests process within 30 days. Test consent enforcement: process a user action requiring consent and verify the system checks consent state. For withdrawn consent: verify marketing tools suppress the user, analytics exclude tracking, and third-party sharing ceases within 30 days. Review deemed consent scenarios (Sec. 15, 17): verify that voluntary provision of data and contractual necessity are properly documented. Document audit findings and any gaps in consent capture or enforcement.",
              check:
                "Consent audit completed with records verified, withdrawal propagation tested within 30 days, deemed consent scenarios documented, and gaps identified with remediation actions",
            },
            {
              title:
                "Test DNC Registry screening effectiveness for all marketing channels",
              control:
                "PDPA Sec. 43-44 (DNC Registry), Sec. 42 (Exemptions)",
              how: "Test DNC Registry screening for all marketing channels. For email: submit test email addresses to the DNC Registry API and verify checking occurs before sending, verify suppression for registered addresses, and verify existing customer exemption logic works correctly. For voice: test calling platform DNC check before dialing, verify registered numbers are blocked, and verify opt-out requests are honored. Verify DNC check logs are retained for audit. Test opt-out/unsubscribe mechanisms: submit opt-out requests and verify processing within 30 days. Document test results including: check accuracy, suppression effectiveness, exemption logic validation, and opt-out processing time.",
              check:
                "DNC Registry screening tested for voice, fax, and email channels, suppression verified for registered addresses, existing customer exemption validated, and opt-out processing confirmed within 30 days",
            },
          ],
        },
        {
          day: 42,
          title: "Security Controls Audit & Access Review",
          tasks: [
            {
              title:
                "Execute encryption audit and key rotation verification across all data stores",
              control:
                "PDPA Sec. 24 (Protection Obligation), Sec. 24(1) (Reasonable Security)",
              how: "Conduct a comprehensive encryption audit verifying all data stores meet PDPA Sec. 24 requirements. For databases: verify RDS encryption (describe-db-instances), Azure SQL TDE, Cloud SQL encryption, Alibaba RDS encryption. For object storage: verify S3 default encryption, Azure Blob encryption, GCS encryption, Alibaba OSS encryption. For block storage: verify EBS encryption, Azure Disk encryption, GCP PD encryption. Verify TLS 1.3 enforcement across all endpoints. Verify key rotation has executed on schedule for all customer-managed keys. Document any unencrypted data stores and create immediate remediation plans. Evidence of 'reasonable security' under Sec. 24 requires encryption across all personal data stores.",
              check:
                "Encryption audit completed for all data stores across all clouds, key rotation verified, TLS 1.3 confirmed, and any unencrypted stores documented with remediation plans",
            },
            {
              title:
                "Conduct quarterly access reviews and certification for all in-scope systems",
              control:
                "PDPA Sec. 24 (Protection), Sec. 12 (Accountability)",
              how: "Execute access reviews covering all in-scope systems. For each system: export the complete user access list, identify dormant accounts (no login in 90+ days), verify role assignments against job functions, validate privilege levels, and confirm least privilege compliance. Use identity governance tools: AWS IAM Access Analyzer, Azure AD Access Reviews, GCP IAM Recommender, Alibaba RAM access review. Document the review process: who conducts the review, what systems are covered, how exceptions are handled, and remediation process for over-privileged access. Verify terminated employee access was revoked within 24 hours by cross-referencing with HR termination records.",
              check:
                "Quarterly access review executed for all in-scope systems with dormant accounts identified, least privilege confirmed, terminated employee access verified, and over-privileged access remediated",
            },
            {
              title:
                "Test WAF, IDS/IPS, and network segmentation effectiveness",
              control:
                "PDPA Sec. 24 (Protection Obligation), Sec. 24(1) (Technical Measures)",
              how: "Test perimeter and network security controls. For WAF: execute OWASP ZAP or Burp Suite scan against protected endpoints, verify attack payloads are blocked (SQL injection, XSS, CSRF, path traversal), test rate limiting, and verify geo-blocking rules. For IDS/IPS: execute Nmap service scans and verify detection/alerting, test evasion techniques and verify detection. For network segmentation: verify VPC/VNet segmentation blocks cross-tier unauthorized communication, confirm PrivateLink/Private Access is functioning, and test that personal data tier is isolated from public-facing tiers. Document test results, false positive/negative rates, and any control tuning performed.",
              check:
                "WAF tested with attack payloads blocked, IDS/IPS detection verified, network segmentation validated, and control tuning documented",
            },
            {
              title:
                "Verify backup restoration and data recoverability for personal data stores",
              control:
                "PDPA Sec. 24 (Protection), Sec. 12 (Accountability)",
              how: "Test backup restoration procedures for all personal data stores. For databases: restore a test database from backups, verify data integrity, measure restoration time vs. RTO. For object storage: restore deleted objects, verify integrity. For configuration: verify IaC can recreate infrastructure. Test point-in-time recovery. Verify backup encryption matches production. Document restoration test results, actual times, and issues. Ensure restoration procedures are documented and accessible to the incident response team for PDPA breach response.",
              check:
                "Backup restoration tested for all personal data stores, data integrity verified, restoration times measured vs. RTO, and procedures documented for incident response",
            },
          ],
        },
        {
          day: 48,
          title: "Cross-Border Transfer Audit, DPIA Review & Compliance Assessment",
          tasks: [
            {
              title:
                "Audit cross-border transfer register and verify contractual protections",
              control:
                "PDPA Sec. 26 (Transfer Limitation), Sec. 26(1) (Comparable Protection)",
              how: "Audit the cross-border transfer register for completeness. For each international data flow: verify destination country documented, overseas recipient provides comparable protection (Sec. 26(1)), contractual clauses are executed and current, and technical controls are implemented. Test technical controls: attempt resource creation in non-approved regions and verify blocking, review VPC Flow Logs for unexpected cross-border traffic. Verify DPA terms with overseas recipients require PDPA-equivalent protection. Document any transfer mechanism gaps and create remediation plans. Maintain register with quarterly review schedule.",
              check:
                "Cross-border transfer register audited with all transfers verified, contractual protections confirmed, technical controls tested, and gaps documented with remediation",
            },
            {
              title:
                "Review DPIA assessments and compliance register for completeness",
              control:
                "PDPA Sec. 12 (Accountability), PDPC Advisory Guidelines",
              how: "Review all completed DPIA assessments and the PDPA compliance register. For each DPIA: verify it covers description of processing, data categories, purposes, consent mechanism, third-party sharing, cross-border transfers, security measures, and risk assessment. Verify high-risk processing has received DPO sign-off. Review the compliance register for completeness: all processing activities mapped, consent mechanisms documented, Obligations identified, and security measures described. Identify any processing activities missing from the register. Update the register and DPIA tracker with current status. Document review findings and any quality improvements needed.",
              check:
                "DPIA assessments reviewed against requirements, compliance register verified for completeness, DPO sign-off confirmed for high-risk processing, and gaps documented with remediation",
            },
            {
              title:
                "Execute compliance gap analysis against PDPC guidance and enforcement trends",
              control:
                "PDPA Sec. 12 (Accountability), PDPC Advisory Guidelines",
              how: "Conduct a comprehensive compliance gap analysis comparing current PDPA compliance against PDPC published guidance, advisory guidelines, and enforcement trends. Review: PDPC advisory guidelines on consent, breach notification, DNC Registry, and cross-border transfers; PDPC enforcement decisions and financial penalties; PDPC Assessment Checklist for organizations. For each PDPA Obligation: map current controls, identify gaps, assess risk level, and prioritize remediation. Focus on areas where PDPC has imposed penalties: failure to protect personal data (Sec. 24), failure to comply with access/correction requests (Sec. 20/22), and failure to notify of data breaches (Sec. 26D). Document the gap analysis with prioritized remediation roadmap.",
              check:
                "Compliance gap analysis completed against PDPC guidance with gaps identified per Obligation, risk assessment for each, and prioritized remediation roadmap documented",
            },
            {
              title:
                "Build PDPC compliance evidence package for potential inquiry",
              control:
                "PDPA Sec. 12 (Accountability), Sec. 26(4) (Records)",
              how: "Assemble a comprehensive PDPA compliance evidence package. Include: (1) PDPA compliance register, (2) Privacy Policy and purpose notifications, (3) Consent records and withdrawal logs, (4) DSAR response records, (5) DPIA assessments, (6) Security measures documentation (encryption, access controls, audit logging), (7) Breach response records and PDPC notifications, (8) Cross-border transfer register with contractual clauses, (9) DNC Registry check logs, (10) DPO appointment documentation, (11) Training records, (12) Vulnerability management records, (13) Access review records. Store in a secure, version-controlled repository accessible to DPO and legal teams.",
              check:
                "PDPC compliance evidence package assembled with all 13 categories, stored in secure repository, and retrieval process documented for PDPC inquiry",
            },
          ],
        },
      ],
    },
    {
      week: 4,
      title: "L4 Certified — Multi-Cloud PDPA Compliance & Continuous Monitoring",
      description:
        "Master PDPA controls across AWS, Azure, GCP, and Alibaba Cloud, implement continuous compliance monitoring, address common PDPC findings, and establish ongoing PDPA compliance.",
      days: [
        {
          day: 55,
          title: "Multi-Cloud Environment Segregation & PDPA Isolation Controls",
          tasks: [
            {
              title:
                "Implement environment isolation with personal data segregation",
              control:
                "PDPA Sec. 24 (Protection Obligation), Sec. 12 (Accountability)",
              how: "Implement strict environment isolation preventing personal data leakage. For AWS: separate accounts per environment with SCPs, separate VPCs with no peering between dev and prod. For Azure: separate subscriptions with Azure Policy isolation. For GCP: separate projects with Organization Policy constraints. For Alibaba: separate resource groups with RAM policies. Enforce data segregation: production uses real personal data, staging uses masked data, development uses synthetic data only. Document the architecture and isolation controls for PDPA Sec. 24 evidence.",
              check:
                "Environment isolation implemented across all four clouds, personal data segregated by environment, cross-environment access blocked, and architecture documented",
            },
            {
              title:
                "Deploy automated PDPA compliance dashboards with continuous monitoring",
              control:
                "PDPA Sec. 12 (Accountability), PDPC Assessment Checklist",
              how: "Build continuous compliance monitoring dashboards. Key metrics: breach notification SLA compliance (3 days), DSAR SLA compliance (30 days), consent coverage percentage, encryption compliance rate, DNC check success rate, access review completion rate, and cross-border transfer register currency. Implement using cloud-native BI tools. Configure automated weekly compliance reports for DPO. Include trend analysis and PDPC Assessment Checklist scoring. Set up alerting for metric thresholds approaching SLA limits.",
              check:
                "PDPA compliance dashboard deployed with key metrics, weekly reports for DPO, trend analysis, and alerting for SLA threshold breaches",
            },
            {
              title:
                "Implement automated evidence collection for PDPC audit readiness",
              control:
                "PDPA Sec. 12 (Accountability), Sec. 26(4) (Records)",
              how: "Automate evidence collection for PDPC audit readiness. Collect: encrypted data store inventory, access review records, vulnerability scan history, DSAR response records, consent records, DPIA assessments, breach response records, cross-border transfer register, DNC check logs, DPO appointment documentation, and training records. Implement automated collection using scheduled scripts or cloud-native automation. Store evidence in immutable repository. Organize evidence by PDPA Obligation for easy retrieval during PDPC inquiry.",
              check:
                "Automated evidence collection implemented for all PDPA Obligations, evidence stored in immutable repository, organized by Obligation, and retrieval process documented",
            },
            {
              title:
                "Establish ongoing PDPA training and awareness program",
              control:
                "PDPA Sec. 12 (Accountability), PDPC Advisory Guidelines",
              how: "Establish PDPA training program with role-specific modules. (1) PDPA fundamentals for all employees — principles, data subject rights, breach reporting. (2) Developer training — secure coding, data minimization, encryption. (3) Operations training — access control, logging, incident response. (4) Business training — consent management, DNC compliance, cross-border transfers. Implement: onboarding training, quarterly refreshers, annual comprehensive review, and ad-hoc training for PDPC regulatory changes. Track completion rates and scores. Document the training program for PDPC accountability evidence.",
              check:
                "PDPA training program documented with role-specific modules, training delivery scheduled, completion tracking operational, and training records maintained for accountability evidence",
            },
          ],
        },
        {
          day: 60,
          title: "AWS PDPA Controls — Macie, Config, GuardDuty & Security Hub",
          tasks: [
            {
              title:
                "Configure Amazon Macie for Singapore PII pattern detection",
              control:
                "PDPA Sec. 24 (Protection), Sec. 12 (Accountability)",
              how: "Enable Amazon Macie for continuous sensitive data discovery in S3 with Singapore PII patterns. Enable Macie for all S3 buckets. Create custom data identifiers for NRIC (S/T/F/G followed by 7 digits + letter), FIN, work permit numbers, and Singapore phone numbers. Configure automated remediation: alert on public buckets containing Singapore PII, alert on buckets with overly permissive policies, and auto-enable Macie for new buckets. Export findings to SNS for SIEM integration. Document Macie coverage, custom data identifiers, and alert response procedures.",
              check:
                "Macie enabled across all S3 buckets with Singapore PII custom data identifiers, automated remediation for public buckets, findings exported to SIEM, and response procedures documented",
            },
            {
              title:
                "Deploy AWS Config Rules for PDPA compliance baselines",
              control:
                "PDPA Sec. 24 (Protection Obligation), Sec. 12 (Accountability)",
              how: "Deploy AWS Config rules tailored to PDPA compliance. Essential rules: s3-bucket-ssl-requests-only, rds-storage-encrypted, iam-password-policy, restricted-ssh, cloudtrail-enabled, access-keys-rotated, encrypted-volumes. Custom rules: verify encryption algorithms, validate security group rules, check S3 bucket policies for personal data stores, verify CloudTrail in all regions. Aggregate Config data across accounts. Configure automatic remediation for critical non-compliance using Systems Manager Automation. Map Config findings to PDPA Sec. 24 'reasonable security' requirements.",
              check:
                "AWS Config rules deployed for PDPA compliance with managed and custom rules, automatic remediation for critical findings, and compliance mapped to Sec. 24 requirements",
            },
            {
              title:
                "Enable GuardDuty with personal data threat detection rules",
              control:
                "PDPA Sec. 26A (Breach Notification), Sec. 24 (Protection)",
              how: "Enable GuardDuty across all accounts with detection rules for personal data threats. Configure: anomaly detection for API calls accessing personal data stores, VPC Flow Logs analysis for data exfiltration, DNS log analysis for C2 communication, S3 data event monitoring for personal data access patterns. Create custom threat intelligence for known-good IPs. Build reaction playbooks for personal data findings: unauthorized access to Macie-classified buckets, unusual download patterns, credential compromise on personal data accounts. Configure findings export to SIEM for breach assessment integration.",
              check:
                "GuardDuty enabled across all accounts with personal data threat detection, reaction playbooks for personal data findings, and findings exported to SIEM for breach assessment",
            },
            {
              title:
                "Enable Security Hub for centralized PDPA security posture",
              control:
                "PDPA Sec. 24 (Protection), Sec. 12 (Accountability)",
              how: "Enable Security Hub across all accounts with FSBP, CIS, and NIST standards. Review passing vs. failing controls, prioritize critical failures affecting personal data protection. Enable integrations: GuardDuty, Inspector, Macie, IAM Access Analyzer. Configure custom insights for PDPA compliance tracking. Generate compliance reports for DPO. Document the configuration, PDPA compliance targets, and reporting process.",
              check:
                "Security Hub enabled across all accounts with standards, PDPA-focused insights configured, and compliance reporting established for DPO",
            },
          ],
        },
        {
          day: 65,
          title: "Azure, GCP & Alibaba LGPD-PDPA Controls",
          tasks: [
            {
              title:
                "Enable Microsoft Defender for Cloud and Sentinel for PDPA monitoring",
              control:
                "PDPA Sec. 24 (Protection), Sec. 26A (Breach Notification)",
              how: "Enable Defender for Cloud across Azure subscriptions with Standard tier. Enable relevant Defender plans. Deploy Sentinel with data connectors and analytics rules for personal data threat detection. Configure automated playbooks for breach detection and notification. Document the architecture and PDPA compliance mapping.",
              check:
                "Defender for Cloud and Sentinel deployed with PDPA-focused rules and playbooks configured, and architecture documented",
            },
            {
              title:
                "Configure GCP Security Command Center and Cloud DLP for PDPA compliance",
              control:
                "PDPA Sec. 24 (Protection), Sec. 24(1) (Security Measures)",
              how: "Enable SCC Premium across all projects with threat detection and vulnerability management. Deploy Cloud DLP API for Singapore PII inspection. Configure Organization Policy constraints for data residency. Enable Chronicle SIEM for centralized log analysis. Document the GCP PDPA compliance configuration.",
              check:
                "SCC Premium and Cloud DLP configured for Singapore PII, Organization Policy constraints for data residency, and compliance documented",
            },
            {
              title:
                "Configure Alibaba Cloud controls for PDPA compliance",
              control:
                "PDPA Sec. 24 (Protection), Sec. 12 (Accountability)",
              how: "Enable Security Center, Cloud Config, and ActionTrail for LGPD compliance monitoring. Configure RAM with least-privilege policies and MFA. Configure KMS with customer master keys and rotation. Document the Alibaba PDPA compliance configuration.",
              check:
                "Alibaba controls enabled for PDPA compliance with RAM, KMS, and monitoring configured and documented",
            },
            {
              title:
                "Document common PDPC findings and create remediation playbook",
              control:
                "PDPA Sec. 12 (Accountability), PDPC Enforcement Guidelines",
              how: "Compile remediation playbook for common PDPC findings: missing DPO (remediate: appoint with public contact), inadequate consent management (remediate: implement purpose-specific consent), no breach notification process (remediate: build 72-hour process), missing DNC Registry checks (remediate: implement automated screening), no access/correction procedures (remediate: build Sec. 20-22 workflows), inadequate security measures (remediate: implement Sec. 24 encryption and access controls), and missing cross-border protections (remediate: execute contractual clauses). Document each with root cause, remediation, prevention, and detection.",
              check:
                "PDPC findings playbook documented with 7+ common findings, remediation steps, prevention controls, and playbook reviewed by DPO and legal team",
            },
          ],
        },
        {
          day: 70,
          title: "Continuous Compliance, PDPC Audit Prep & Governance",
          tasks: [
            {
              title:
                "Establish quarterly PDPA compliance review and reporting cadence",
              control:
                "PDPA Sec. 12 (Accountability), PDPC Advisory Guidelines",
              how: "Establish quarterly compliance review process. Define review scope: compliance register completeness, DSAR metrics, consent metrics, breach notification metrics, DNC compliance, encryption rate, cross-border register currency, and DPIA completion rate. Implement quarterly meetings with DPO, engineering leads, and management. Generate quarterly compliance reports. Schedule annual comprehensive PDPA audit.",
              check:
                "Quarterly compliance review process documented, compliance reports generated, annual audit scheduled, and review cadence operational",
            },
            {
              title:
                "Implement automated compliance drift detection and alerting",
              control:
                "PDPA Sec. 24 (Protection), Sec. 12 (Accountability)",
              how: "Implement automated detection of compliance drift. Configure alerts for: new unencrypted data stores, new public S3 buckets, IAM policy changes on personal data stores, new cross-border data flows, consent configuration changes, and DSAR SLA approaching deadline. Use cloud-native event services for event-driven alerting. Implement weekly drift reports. Configure escalation for critical drift affecting personal data protection.",
              check:
                "Compliance drift detection configured with automated alerting, weekly drift reports, escalation process, and tested with simulated changes",
            },
            {
              title:
                "Build PDPA compliance evidence package for PDPC inquiry readiness",
              control:
                "PDPA Sec. 12 (Accountability), Sec. 26(4) (Records)",
              how: "Assemble comprehensive PDPA compliance evidence package including all categories: compliance register, privacy policy, consent records, DSAR logs, DPIA assessments, security documentation, breach records, cross-border register, DNC logs, DPO documentation, training records, vulnerability records, and access review records. Store in secure, version-controlled repository. Document retrieval process for PDPC inquiry.",
              check:
                "PDPA compliance evidence package assembled with all categories, stored securely, and retrieval process documented",
            },
            {
              title:
                "Conduct PDPA compliance tabletop exercise with executive team",
              control:
                "PDPA Sec. 12 (Accountability), PDPC Enforcement Guidelines",
              how: "Conduct a tabletop exercise simulating a PDPC investigation. Scenario: PDPC contacts the organization regarding a data breach affecting Singapore residents. Walk through: initial PDPC inquiry response, evidence gathering from the compliance package, notification compliance verification, access/correction request handling review, consent management audit, and DNC compliance review. Identify any gaps in the compliance package or response process. Update procedures based on exercise findings. Document the tabletop exercise results and improvement actions.",
              check:
                "Tabletop exercise completed with executive team, gaps identified in compliance package, improvement actions documented, and procedures updated",
            },
          ],
        },
      ],
    },
  ],
};

export default function Pdpa() {
  return <LearningFrameworkPage framework={FRAMEWORK} />;
}

export { FRAMEWORK };
