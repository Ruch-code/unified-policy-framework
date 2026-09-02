import LearningFrameworkPage from "../../components/LearningFrameworkPage";

const FRAMEWORK = {
  id: 'gdpr',
  name: 'GDPR (EU 2016/679)',
  region: 'European Union',
  color: 'navy',
  weeks: [
    {
      week: 1,
      title: 'Foundation — Scope, Principles & Data Mapping',
      days: 'Days 1-7',
      description: 'Understand GDPR scope, map all personal data, and establish lawful basis for processing',
      tasks: [
        {
          title: 'Determine applicability and data mapping across all cloud environments',
          control: 'Art. 2 (Territorial Scope), Art. 4 (Definitions), Art. 30 (ROPA)',
          how: 'Inventory all processing activities across AWS, Azure, GCP, and Alibaba. Use AWS Config, Azure Resource Graph, GCP Cloud Asset Inventory, and Alibaba Cloud Config to discover data stores containing personal data. For production: map RDS/Cloud SQL instances with PII columns. For staging: identify synthetic vs real test data. For dev: locate developer sandboxes with cloned datasets. Document each flow: collection point, storage location, processor, retention period.',
          check: 'Verify ROPA registry exists with entries for every data store discovered. Confirm no production PII exists in staging/dev unless pseudonymized. Spot-check that asset inventory tools cover all four clouds.'
        },
        {
          title: 'Identify lawful basis for each processing activity',
          control: 'Art. 6 (Lawfulness), Art. 6(1)(a-f) (Six Bases), Art. 9 (Special Categories)',
          how: 'For each processing activity in your ROPA, assign one of the six lawful bases: consent, contract, legal obligation, vital interests, public task, or legitimate interests. Use AWS DynamoDB or Azure Cosmos DB to store a processing-activities table with fields: activity_id, purpose, lawful_basis, data_categories, retention. For special category data (health, biometric, racial/ethnic), document explicit consent or Art. 9(2) exception. Tag each resource in AWS via Resource Groups, Azure via Policy, GCP via Labels, Alibaba via Tags with the lawful basis.',
          check: 'Query the processing-activities table to confirm every activity has a lawful basis assigned. Verify resource tags match the documented basis. Confirm no special category data is processed without an Art. 9(2) exception documented.'
        },
        {
          title: 'Classify personal data: ordinary, special category (Art. 9), and children\'s data (Art. 8)',
          control: 'Art. 9 (Special Categories), Art. 8 (Children\'s Services), Art. 5(1)(c) (Data Minimisation)',
          how: 'Apply automated classification using AWS Macie, Azure Purview/Microsoft Purview, GCP DLP API, and Alibaba Data Security Center to scan S3, Blob Storage, GCS, and OSS buckets for PII patterns (names, emails, SSNs, health records). For each data element, classify as: ordinary personal data, special category (Art. 9), or children\'s data (Art. 8 — under 16 in most EU states). In staging environments, run the same scanners to detect accidental production data. In dev, enforce that synthetic data generators (e.g., Faker libraries) are the only permitted source of PII.',
          check: 'Run classification scans across all four clouds and confirm every bucket/table with PII has a data-classification tag. Verify staging contains no unmasked special-category data. Verify dev environments use only synthetic data with documented generators.'
        },
        {
          title: 'Document retention schedules and automated decision-making (Art. 22)',
          control: 'Art. 5(1)(e) (Storage Limitation), Art. 22 (Automated Decisions), Art. 17 (Erasure)',
          how: 'Create a retention-policy table in a central registry (e.g., AWS DynamoDB, Azure SQL) mapping each data category to a retention period and deletion method. Implement TTL on DynamoDB tables, Azure Blob lease policies, GCP BigQuery table expiration, and Alibaba OSS lifecycle rules. For automated decision-making (credit scoring, profiling, access control), document the logic, significance, and envisaged consequences. Implement opt-out mechanisms. For each environment: production enforces real TTLs, staging uses shortened TTLs (7-30 days), dev auto-purges on session end.',
          check: 'Verify TTL/lifecycle rules are active on all storage resources. Spot-check that deleted records are actually removed after retention period. Confirm automated decision systems have documented logic and human-override capability.'
        },
        {
          title: 'Establish data residency controls and cross-border transfer assessment',
          control: 'Art. 44-49 (International Transfers), Art. 45 (Adequacy), Art. 46 (SCCs)',
          how: 'Configure AWS S3 bucket policies to restrict storage to eu-west-1/eu-central-1 regions. Use Azure Policy to deny resource creation outside EU regions (e.g., northeurope, westeurope). Enable GCP Organization Policy constraints to restrict resource locations to EU zones. Configure Alibaba to use Frankfurt (eu-central-1) or UK (eu-west-1) regions. Document any transfers outside EU (e.g., support teams in US), assess adequacy decisions, and prepare Standard Contractual Clauses (SCCs). For staging/dev, enforce same-region constraints but allow separate non-production regions if needed.',
          check: 'Attempt to create a resource in a non-EU region from each cloud console — confirm it is blocked by policy. Verify SCCs or adequacy decisions are documented for any identified transfers. Confirm data residency tags exist on all storage resources.'
        }
      ]
    },
    {
      week: 2,
      title: 'Implementer — Data Subject Rights & ROPA',
      days: 'Days 8-14',
      description: 'Implement DSAR workflows, ROPA with all required Art. 30 fields, and consent management',
      tasks: [
        {
          title: 'Build DSAR portal covering access (Art. 15), rectification (Art. 16), erasure (Art. 17), restriction (Art. 18), and objection (Art. 21)',
          control: 'Art. 15-22 (Data Subject Rights), Art. 12 (Transparent Communication)',
          how: 'Deploy a centralized DSAR service (e.g., AWS Lambda + API Gateway or Azure Functions) that queries across all data stores. For AWS: use Athena federated queries across RDS, DynamoDB, S3, and Redshift. For Azure: use Synapse Link across Cosmos DB and SQL. For GCP: use BigQuery federated queries across Cloud SQL and Firestore. For Alibaba: use MaxCompute across AnalyticDB and TableStore. Implement SLAs: acknowledge within 72 hours, respond within 30 days (extendable to 90 for complex requests). For production: real data deletion. For staging: verify deletion logic works. For dev: use synthetic test data for DSAR testing.',
          check: 'Submit a test DSAR for a synthetic identity across all systems. Verify the response includes all data found. Confirm erasure removes data from production within 30 days. Verify staging/dev test suites pass for all DSAR scenarios.'
        },
        {
          title: 'Implement data portability (Art. 20) and automated decision-making safeguards (Art. 22)',
          control: 'Art. 20 (Portability), Art. 22 (Automated Decisions), Art. 13(2)(f) (Logic Disclosure)',
          how: 'Build a data-export endpoint that outputs personal data in structured, commonly used, machine-readable format (JSON or CSV). Use AWS Step Functions to orchestrate data collection from DynamoDB, RDS, S3, and Cognito. For Azure, use Logic Apps to aggregate from Cosmos DB, SQL, and Blob. For GCP, use Workflows to pull from Firestore, BigQuery, and Cloud Storage. For Alibaba, use Function Compute to collect from TableStore, RDS, and OSS. For Art. 22 automated decisions (e.g., fraud scoring, recommendation engines), implement a human-review dashboard and explainability layer showing the logic involved and significance of the decision.',
          check: 'Export a test user\'s data in JSON/CSV format and verify completeness. Confirm the automated-decision dashboard displays decision logic, outcome, and human-override option. Verify the export includes data from all four clouds if applicable.'
        },
        {
          title: 'Create and maintain Records of Processing Activities (ROPA) per Art. 30 with all required fields',
          control: 'Art. 30 (Records of Processing Activities)',
          how: 'Maintain a structured ROPA database (e.g., AWS DynamoDB or Azure SQL) with ALL required Art. 30 fields: (1) Name and contact details of controller/processor, (2) DPO contact details, (3) Purposes of processing, (4) Categories of data subjects, (5) Categories of personal data, (6) Categories of recipients, (7) International transfers and identification of third country, (8) Retention periods per data category, (9) Description of technical/organizational security measures (Art. 32). For processors, also record: name/contact, categories of processing, transfers, and security measures. Use Infrastructure-as-Code (Terraform/CloudFormation) to auto-populate technical measures from actual resource configurations. Integrate with CI/CD so ROPA updates automatically when infrastructure changes.',
          check: 'Audit the ROPA for completeness: confirm all nine Art. 30(1) fields are populated for controllers and all four Art. 30(2) fields for processors. Verify the ROPA updates automatically when Terraform/CloudFormation deploys new resources. Spot-check three processing activities end-to-end.'
        },
        {
          title: 'Implement consent management: granular, informed, freely given, and withdrawable',
          control: 'Art. 6(1)(a) (Consent), Art. 7 (Conditions for Consent), Art. 4(11) (Definition)',
          how: 'Build a consent-management service using AWS Cognito custom attributes or Azure AD B2C custom policies to record per-purpose consent. Store consent records in a tamper-evident audit log (e.g., AWS QLDB or Azure Immutable Blob Storage). Each consent record must capture: subject_id, purpose, granted_at, method (opt-in/opt-out), version of privacy notice, and withdrawal timestamp. Implement double opt-in for email marketing. Provide one-click withdrawal in user interfaces. For staging: test consent grant and withdrawal flows. For dev: use synthetic users to test edge cases (withdrawal after data processing, retroactive consent).',
          check: 'Grant consent for three purposes, verify audit log entries. Withdraw one consent and confirm processing stops within 24 hours. Verify the consent service handles the double opt-in flow. Check that no processing occurs after withdrawal for that purpose.'
        },
        {
          title: 'Implement environment segregation for staging and development with data protection controls',
          control: 'Art. 25 (Data Protection by Design), Art. 32 (Security of Processing)',
          how: 'Enforce network-level segregation using AWS VPC per environment (separate CIDR ranges, no peering unless necessary), Azure VNet isolation with NSG rules, GCP VPC Service Controls per project, and Alibaba VPC with separate route tables. For data: production uses real (encrypted) data, staging uses pseudonymized production data (use AWS Glue or Azure Data Factory for pseudonymization pipelines), dev uses only synthetic data generated via libraries like Faker. Implement separate IAM roles per environment: prod requires MFA + break-glass, staging requires MFA, dev uses basic auth with session expiration. Use AWS SCPs, Azure Policy, and GCP Org Policies to prevent cross-environment data access.',
          check: 'Attempt to access production data from a staging/dev IAM role — confirm it is denied. Verify no production PII is accessible from dev accounts. Confirm staging data is pseudonymized (not masked/shuffled). Verify network ACLs prevent cross-environment traffic.'
        }
      ]
    },
    {
      week: 3,
      title: 'Verifier — DPIA, Security Measures & Breach Response',
      days: 'Days 15-28',
      description: 'Conduct DPIAs, implement Art. 32 technical measures, and establish breach notification workflows',
      tasks: [
        {
          title: 'Conduct DPIAs for high-risk processing (Art. 35) with documented methodology',
          control: 'Art. 35 (DPIA), Art. 36 (Prior Consultation), Art. 35(7) (DPIA Content)',
          how: 'A DPIA is REQUIRED when processing: (a) systematic and extensive profiling with significant effects, (b) large-scale special category data processing, (c) systematic monitoring of public areas. Implement a DPIA template with Art. 35(7) required content: (1) systematic description of processing operations and purposes, (2) assessment of necessity and proportionality, (3) assessment of risks to data subjects, (4) measures to address risks including safeguards and security. Deploy DPIAs using a workflow tool (e.g., AWS Step Functions or Jira). For each cloud workload: document the data flow diagram, identify risk score (likelihood × severity matrix), list mitigations (encryption, access controls, pseudonymization), and get DPO sign-off. If residual risk remains high, consult the supervisory authority per Art. 36. For staging/dev: DPIAs cover test data processing and mock profiling scenarios.',
          check: 'Verify a DPIA exists for each high-risk processing activity identified in the ROPA. Confirm all four Art. 35(7) elements are present. Verify DPO sign-off on each DPIA. Confirm residual risk scores are below the threshold or prior consultation has been initiated.'
        },
        {
          title: 'Implement Art. 32 technical and organizational security measures across all clouds',
          control: 'Art. 32 (Security of Processing), Art. 32(1)(a-d) (Encryption, Confidentiality, Integrity, Availability)',
          how: 'Encryption at rest: AWS KMS with CMKs on S3/RDS/EBS, Azure Key Vault with CMKs on Blob/SQL/Managed Disks, GCP Cloud KMS on GCS/Cloud SQL/Persistent Disk, Alibaba KMS on OSS/RDS/ECS. Encryption in transit: enforce TLS 1.2+ via AWS ALB policies, Azure Front Door TLS, GCP Load Balancer SSL policies, Alibaba SLB HTTPS listeners. Pseudonymization: tokenize PII columns using AWS Glue or Azure Data Factory before storage. Access logging: enable AWS CloudTrail + S3 access logs, Azure Monitor + Activity Log, GCP Cloud Audit Logs, Alibaba ActionTrail. For production: all measures mandatory. For staging: encryption mandatory, access logging recommended. For dev: encryption mandatory, access logging optional but encouraged.',
          check: 'Verify KMS/Key Vault keys exist for all storage resources. Confirm TLS 1.2+ is enforced on all endpoints. Run an access-logs audit showing who accessed PII in the last 30 days. Confirm pseudonymization is applied to non-production copies of PII.'
        },
        {
          title: 'Implement DLP controls and data masking for non-production environments',
          control: 'Art. 32 (Security), Art. 25 (By Design and Default), Art. 5(1)(c) (Minimisation)',
          how: 'Deploy DLP policies: AWS Macie for S3 (auto-classify and alert on PII), Azure Purview DLP policies for SharePoint/Exchange/OneDrive, GCP DLP API for BigQuery and Cloud Storage, Alibaba Data Security Center for OSS and RDS. Create DLP scanning rules that flag: credit card numbers, national IDs, health records, biometric templates. Implement automated masking for staging: use AWS Glue jobs to replace real names with "User_XXXX", emails with "test@masked.example", SSNs with "000-00-XXXX". For GCP, use Cloud DLP API de-identification transforms. For dev, block uploads of files containing PII patterns via S3 bucket policies or Alibaba OSS ACLs. Set up alerts for DLP violations in all environments.',
          check: 'Trigger a DLP scan on each cloud storage service and confirm PII is flagged. Verify staging data is masked (no real names/SSNs visible). Attempt to upload a file with real PII to a dev bucket — confirm it is blocked. Verify DLP alerts are received by the security team.'
        },
        {
          title: 'Establish breach detection, assessment, and 72-hour notification workflow (Art. 33/34)',
          control: 'Art. 33 (Notification to SA), Art. 34 (Communication to Data Subjects), Art. 33(1) (72-Hour Rule)',
          how: 'Deploy centralized breach detection: AWS GuardDuty + Security Hub, Azure Sentinel, GCP Chronicle, Alibaba Security Center. Create a SIEM correlation rule set that detects: unauthorized data access, unusual data egress, DLP policy violations, anomalous API calls. Build an incident-response workflow (AWS Step Functions or PagerDuty integration): (1) T+0h: detection and initial triage, (2) T+4h: scope assessment — which data subjects, categories, volume, (3) T+24h: risk evaluation — likelihood of harm, (4) T+48h: prepare notification, (5) T+72h: submit notification to lead supervisory authority with required content per Art. 33(3)(a-d). If high risk to individuals, notify data subjects per Art. 34. Maintain a breach register documenting all incidents regardless of notification threshold.',
          check: 'Simulate a breach scenario (e.g., unauthorized S3 bucket access) and verify detection within 15 minutes. Walk through the 72-hour workflow and confirm all Art. 33(3) fields can be populated. Verify the breach register captures all simulated incidents. Confirm notification templates exist for both SA and data subjects.'
        },
        {
          title: 'Implement processor agreements (Art. 28) and sub-processor management',
          control: 'Art. 28 (Processor), Art. 28(2) (Binding Contract), Art. 28(3) (Required Clauses)',
          how: 'Audit all third-party processors (cloud providers, SaaS tools, analytics services) and execute Data Processing Agreements (DPAs) with Art. 28(3) required clauses: (a) process only on documented instructions, (b) confidentiality obligations on personnel, (c) implement Art. 32 security measures, (d) assist with DSARs, (e) assist with breach notification, (f) delete/return data on termination, (g) allow audits. For cloud providers: AWS DPA covers S3/RDS/Lambda, Azure DPA covers all services, GCP DPA covers GCP/AWS, Alibaba DPA covers their infrastructure. Maintain a sub-processor register and implement change-notification processes. For staging/dev: use separate processor accounts to isolate testing data. For each processor, maintain a risk assessment score card.',
          check: 'Verify signed DPAs exist for all processors listed in the ROPA. Confirm all eight Art. 28(3) clauses are present in each DPA. Verify sub-processor register is current. Confirm change-notification mechanism is in place and tested.'
        }
      ]
    },
    {
      week: 4,
      title: 'Certified — Accountability, Transfers & Ongoing Compliance',
      days: 'Days 29-42',
      description: 'Demonstrate accountability, manage international transfers, and establish continuous compliance',
      tasks: [
        {
          title: 'Implement international transfer mechanisms: adequacy, SCCs, BCRs, and derogations (Art. 44-49)',
          control: 'Art. 44 (General Principle), Art. 46 (SCCs/BCRs), Art. 49 (Derogations)',
          how: 'Map all data flows crossing EU borders. For each transfer: (1) Check adequacy decision list (currently: Andorra, Argentina, Canada commercial, Faroe Islands, Guernsey, Israel, Isle of Man, Japan, Jersey, New Zealand, Republic of Korea, Switzerland, UK, Uruguay, US under DPF). (2) If no adequacy, implement Standard Contractual Clauses (SCCs) — use the June 2021 European Commission version. (3) For intra-group transfers, consider Binding Corporate Rules (BCRs). (4) For occasional transfers, assess derogations (Art. 49): explicit consent, contract performance, public interest, vital interests, or legitimate interests with safeguards. Configure AWS Transit Gateway or Azure ExpressRoute for encrypted cross-region traffic. Implement VPN/IPSec tunnels between regions. For staging/dev: document mock transfer scenarios for testing.',
          check: 'Verify every cross-border transfer has an identified legal mechanism (adequacy, SCCs, BCRs, or documented derogation). Confirm SCCs are the June 2021 version. Verify network traffic between EU and non-EU regions is encrypted. Confirm the Transfer Impact Assessment (TIA) document exists for US-bound transfers.'
        },
        {
          title: 'Establish accountability framework: documentation, policies, training, and audit program',
          control: 'Art. 5(2) (Accountability), Art. 24 (Controller Responsibility), Art. 39(1)(b) (DPO Monitoring)',
          how: 'Create and maintain a GDPR policy framework: (1) Data Protection Policy, (2) Privacy Notice(s), (3) DSAR Procedure, (4) Breach Response Plan, (5) DPIA Procedure, (6) Records Retention Policy, (7) Acceptable Use Policy. Store all policies in a central repository (e.g., AWS S3 with versioning, or Confluence). Implement annual GDPR training for all staff with tracking via AWS SES email campaigns or LMS integration. For development teams: mandatory training on privacy by design (Art. 25) before accessing production. Conduct internal audits quarterly: check ROPA accuracy, DSAR response times, breach register completeness, DPO activity log. Use AWS Config Rules or Azure Policy for automated compliance checks.',
          check: 'Verify all seven policies exist, are current (reviewed within 12 months), and are accessible to staff. Confirm training completion rate is above 95%. Verify the last internal audit report exists with findings and remediation tracking. Confirm automated compliance rules are active in all clouds.'
        },
        {
          title: 'Implement data protection by design and by default (Art. 25) across all environments',
          control: 'Art. 25(1) (By Design), Art. 25(2) (By Default), Art. 5(1)(c) (Minimisation)',
          how: 'Integrate privacy requirements into SDLC: add a "Privacy Impact" stage in CI/CD pipelines using pre-commit hooks and IaC scanning. For new features: require a privacy review checklist (data collected, lawful basis, retention, encryption, access controls). Enforce data minimization by default: configure AWS Cognito to collect only required attributes, Azure AD B2C custom policies to minimize claims, GCP Identity Platform to limit profile fields. Implement anonymization for analytics: use k-anonymity or differential privacy techniques. For production: full privacy review gate. For staging: automated PII detection in deploy pipeline. For dev: privacy-aware coding guidelines enforced via linting rules.',
          check: 'Verify the CI/CD pipeline includes a privacy-review stage that can block deploys. Confirm no new feature has been deployed without a privacy checklist in the last quarter. Verify default data collection is minimized (only required fields). Confirm analytics pipelines use anonymization techniques.'
        },
        {
          title: 'Prepare for supervisory authority cooperation and demonstrate ongoing DPO engagement',
          control: 'Art. 37-39 (DPO), Art. 56 (One-Stop-Shop), Art. 60 (Cooperation Between SAs)',
          how: 'If a DPO is required (Art. 37: public authority, large-scale monitoring, or large-scale special category processing): formally appoint the DPO, publish contact details, ensure DPO reports directly to highest management level. Maintain DPO activity log: advisory activities, DPIA reviews, DSAR escalations, training delivered, audit findings. Prepare for supervisory authority engagement: maintain a "compliance readiness pack" including ROPA, DPIA register, breach register, training records, processor agreements, policy framework. For multi-EU-state operations: identify the lead supervisory authority based on main establishment (Art. 56) and document the one-stop-shop mechanism. Use AWS Config conformance packs or Azure Compliance Manager to generate authority-ready reports.',
          check: 'Verify DPO appointment documentation exists (if required). Confirm DPO contact details are published on the website. Verify DPO activity log covers the last 12 months. Confirm a compliance readiness pack is assembled and can be produced within 48 hours of an authority request.'
        },
        {
          title: 'Establish continuous monitoring, periodic DPIAs, and GDPR compliance reporting',
          control: 'Art. 5(2) (Accountability), Art. 35(11) (Review), Art. 24(1) (Ongoing Obligation)',
          how: 'Deploy continuous compliance monitoring: AWS Security Hub with GDPR-specific controls, Azure Compliance Manager with GDPR assessment, GCP Security Command Center with GDPR compliance packs, Alibaba Cloud Security baseline checks. Schedule periodic DPIA reviews: (1) annually for all high-risk processing, (2) triggered by any significant change in processing operations, technology, or organizational measures. Build a GDPR compliance dashboard aggregating: ROPA completeness score, DSAR response times, breach metrics, training completion, DLP violation counts, encryption coverage percentage, retention compliance rate. Generate monthly compliance reports for management review. Conduct tabletop breach-response exercises semi-annually. Update policies and procedures based on EDPB guidelines and case law.',
          check: 'Verify the compliance dashboard is live and displays metrics from all four clouds. Confirm the last DPIA review was conducted within 12 months for all high-risk activities. Verify monthly compliance reports have been generated for the last quarter. Confirm a tabletop breach exercise was conducted within the last 6 months. Verify EDPB guidelines have been reviewed and incorporated into policies within 30 days of publication.'
        }
      ]
    }
  ],
  milestones: [
    { day: 30, label: 'ROPA & Data Mapping Complete', color: 'blue' },
    { day: 45, label: 'DSAR Portal & Consent Operational', color: 'purple' },
    { day: 60, label: 'DPIA Program & Breach Response Ready', color: 'green' }
  ],
  referenceUrl: 'https://eur-lex.europa.eu/legal-content/EN/TXT/?uri=CELEX:32016R0679'
};

export default function Gdpr() {
  return <LearningFrameworkPage framework={FRAMEWORK} />;
}
