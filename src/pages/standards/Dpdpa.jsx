import LearningFrameworkPage from "../../components/LearningFrameworkPage";

const FRAMEWORK = {
  id: 'dpdpa',
  name: 'DPDP Act 2023 (India)',
  region: 'India',
  color: 'green',
  startupGaps: [
    {
      gap: "Relying on implicit/vague consent instead of a valid notice + consent request",
      pushback: "People sign up and tick a box; that's consent.",
      reality: "DPDPA (Sec 5, 6) requires a clear notice BEFORE processing and consent that's separate, informed, and freely given. Pre-ticked boxes or bundled consent fail.",
      leantip: "Implement a plain-language notice, a granular consent checkbox, and a way to withdraw. Log consent (who, what, when) as evidence — use a consent-management tool."
    },
    {
      gap: "Collecting more data than needed with no purpose limitation",
      pushback: "We may need this data later, so we collect it now.",
      reality: "DPDPA enforces purpose limitation and data minimization (Sec 4). Over-collecting is a compliance failure and a breach liability.",
      leantip: "Review each field you collect — if you can't state its purpose, don't collect it. Add a data inventory and prune unused fields."
    },
    {
      gap: "Storing data abroad / no clarity on cross-border transfers",
      pushback: "Our cloud is fine wherever it is.",
      reality: "DPDPA (Sec 16) restricts cross-border transfers (draft rules exempt certain 'whitelisted' countries; notifications pending). Transfers need notice and consent.",
      leantip: "Map where personal data physically resides. For India, prefer India regions (AWS ap-south-1 Mumbai, Azure Central India, GCP asia-south1, Alibaba Mumbai) and track transfer intent."
    },
    {
      gap: "No breach notification runbook to the DPDP Board",
      pushback: "Breach? We'll figure that out if ever.",
      reality: "DPDPA (Sec 8(6)) requires notifying the Board and affected data principals of a data breach with details per rules. There's no 'wait and see' option.",
      leantip: "Write a one-page breach runbook: detect → assess → notify Board + data principal within the prescribed window → document. Assign a 24/7 on-call owner."
    },
    {
      gap: "No grievance redressal mechanism for data principals",
      pushback: "It's just a feedback email address.",
      reality: "DPDPA (Sec 11) requires a mechanism for data principals to exercise rights (access, correction, erasure) and redress grievances.",
      leantip: "Stand up a support workflow for data-principal requests with ownership and SLAs. Keep request logs as evidence of the mechanism existing."
    }
  ],
  privacyStartupNotes: "DPDPA-specific note: India's DPDP Act expects notice + consent, purpose limitation, and breach notification to the DPDP Board. It does NOT statutorily mandate a GDPR-style ROPA, but keep an internal record of processing activities as best practice. DPIA is appropriate for high-risk processing even where not literally prescribed — run one to show diligence.",
  weeks: [
    {
      week: 1,
      title: 'Scope, Data Mapping & Consent Architecture',
      days: 'Days 1-7',
      description: 'Establish applicability, map data flows, and design consent infrastructure across multi-cloud environments',
      tasks: [
        {
          title: 'Determine applicability and classify roles under DPDPA',
          control: 'Identify whether the organization is a Data Fiduciary (determines purpose and means of processing) or a Data Processor (processes on behalf of Fiduciary). Document which entities in the group qualify.',
          how: 'Review all systems that collect or process digital personal data. Use a RACI matrix to map which team controls purpose (Fiduciary) vs. which executes processing (Processor). For multi-cloud setups, tag resources in AWS Resource Groups, Azure Resource Graph, and GCP Resource Manager by role classification.',
          check: 'A documented role classification register exists covering all data-handling systems. Each cloud account is tagged with fiduciary/processor designation.'
        },
        {
          title: 'Map all digital personal data flows end-to-end',
          control: 'Create a comprehensive data flow map covering collection, storage, processing, sharing, transfer, and disposal of digital personal data across all environments.',
          how: 'Use AWS Glue Data Catalog and Azure Purview to auto-discover data stores. Build flow diagrams showing: collection point → transit → storage → processing → sharing → disposal. Tag each flow with data category (personal, sensitive personal, children\'s). Use GCP Data Catalog for GCP-hosted assets and Alibaba Data Lake for China-region data.',
          check: 'A visual data flow map exists covering all production, staging, and development environments. Each data store is classified by data category. Flows to/from third parties are explicitly documented.'
        },
        {
          title: 'Implement consent collection and management platform',
          control: 'Deploy a centralized consent management system that captures free, specific, informed, unconditional, and unambiguous consent as required by DPDPA Section 6.',
          how: 'Deploy an open-source CMP (e.g., Open Consent Platform) or use AWS SES + DynamoDB to build a consent ledger. Store consent records with: timestamp, version of notice shown, specific purpose(s) consented, method of collection, and withdrawal capability. Use Azure Cosmos DB or GCP Firestore as a secondary consent store for geo-redundancy. Ensure consent UI presents purposes as granular toggles, not bundled.',
          check: 'Consent records stored in an immutable ledger with fields: data_principal_id, purpose, notice_version, timestamp, method, status (active/withdrawn). Consent withdrawal is accessible within two clicks from any user-facing interface.'
        },
        {
          title: 'Implement data residency controls for India',
          control: 'Ensure all digital personal data of Indian data principals is stored and processed within India, per DPDPA Section 16 cross-border restrictions (only government-notified jurisdictions permitted).',
          how: 'Pin all primary data stores to India regions: AWS Asia Pacific (Mumbai) ap-south-1, Azure Central India, GCP asia-south1 (Mumbai), Alibaba China (Mumbai/Beijing) as fallback. Use AWS Service Control Policies (SCPs) and Azure Policy to block resource creation outside India regions. GCP Organization Policies restrict resource locations. Enable AWS Config rules and Azure Monitor to alert on out-of-region resources.',
          check: 'SCPs/Azure Policies/GCP Org Policies are active and tested (attempt to deploy to eu-west-1 should fail). AWS Config compliance dashboard shows 100% India-region adherence for production data stores.'
        },
        {
          title: 'Classify and label all data assets by category',
          control: 'Apply data classification labels to all stored and in-transit data: personal data, sensitive personal data, children\'s data, and publicly available data. Map each label to its applicable DPDPA obligations.',
          how: 'Use AWS Macie for S3 classification, Azure Information Protection (AIP) labels for files and databases, GCP Cloud Data Loss Prevention API for auto-classification, and Alibaba Data Security Center. Create an internal data catalog with fields: asset_id, data_category, DPDPA_obligations, retention_period, storage_location, encryption_status.',
          check: 'Every database, S3 bucket, and storage account has a classification label. Macie/AIP/DLP reports show zero unclassified data stores in production. Classification drives downstream controls (encryption, access, retention).'
        }
      ]
    },
    {
      week: 2,
      title: 'Notice, Rights & Grievance Redressal',
      days: 'Days 8-14',
      description: 'Implement privacy notices, data principal rights workflows, and grievance mechanisms with SLA tracking',
      tasks: [
        {
          title: 'Publish compliant privacy notices for all data collection points',
          control: 'Provide a clear, plain-language privacy notice at the time of data collection (Section 5), specifying: purpose of collection, rights of data principal, withdrawal mechanism, grievance officer details, and data retention period.',
          how: 'Create notice templates stored in a version-controlled CMS (e.g., headless CMS like Strapi on ECS/EKS or Azure App Service). Each notice version is immutable and versioned. At every collection point (web forms, mobile SDKs, APIs), serve the current notice version and log which version was presented. Use AWS Lambda@Edge or Azure Front Door to inject notices dynamically. Store notice acceptance records in DynamoDB/Cosmos DB.',
          check: 'Every collection point serves a DPDPA-compliant notice. Notice version history is maintained. Sample audit: 10 random collection points all display correct, current notice with all required disclosures.'
        },
        {
          title: 'Implement Data Principal rights: access, correction, and erasure',
          control: 'Build workflows enabling data principals to exercise rights to access their data (Section 11), correct inaccurate data, and request erasure when purpose is fulfilled or consent is withdrawn.',
          how: 'Create a self-service portal (React app hosted on S3/CloudFront or Azure Static Web Apps) where data principals can: request a data export (access), submit correction requests, and request erasure. Backend: API Gateway → Lambda/Functions → database queries. For correction, implement versioned update records. For erasure, cascade delete across all systems using a deletion orchestrator (Step Functions, Azure Durable Functions, or GCP Workflows). Maintain an erasure audit log.',
          check: 'A self-service portal exists and is accessible. Test: submit an access request and verify data export is returned within 30 days. Test: submit erasure request and verify data is removed from all production stores within the stated retention period.'
        },
        {
          title: 'Deploy grievance redressal mechanism with SLA tracking',
          control: 'Establish a grievance redressal mechanism (Section 8) with a designated Grievance Officer, clear response timelines, and escalation paths.',
          how: 'Integrate a ticketing system (Jira Service Management or Zendesk) to receive and track grievances. Set SLAs: acknowledge within 48 hours, resolve within 30 days. Use AWS CloudWatch Alarms or Azure Monitor Alerts for SLA breach notifications. Publish grievance officer contact on the website and in all privacy notices. Build a monthly grievance report dashboard in QuickSight or Power BI.',
          check: 'Grievance officer name and contact are published. Ticketing system tracks all grievances with SLA metrics. Monthly report shows average resolution time and SLA breach rate. Random sample: 5 resolved grievances show proper escalation and resolution.'
        },
        {
          title: 'Implement consent withdrawal mechanism with downstream propagation',
          control: 'Ensure withdrawal of consent is as easy as giving consent (Section 7). Upon withdrawal, processing must cease and data must be erased or anonymized unless another lawful basis applies.',
          how: 'In the consent management platform, add a one-click withdrawal option. Trigger a workflow (Step Functions/Durable Functions) that: (1) updates consent status, (2) stops all active processing pipelines referencing that data principal, (3) initiates erasure across all data stores within the defined timeline, (4) notifies downstream processors/partners to cease processing. Use SQS/SNS or Azure Service Bus to fan out erasure commands. Log all withdrawal actions with timestamps.',
          check: 'Test: withdraw consent for a test data principal. Verify processing stops within 24 hours. Verify downstream systems receive erasure commands. Verify consent ledger shows withdrawn status with timestamp. Confirm data is erased from all stores within the committed retention window.'
        },
        {
          title: 'Build children\'s data protection controls',
          control: 'Implement verifiable parental consent for processing children\'s data (Section 9). Prohibit tracking, profiling, or behavioral monitoring of children. Apply age-gating mechanisms.',
          how: 'Deploy an age-verification gate at registration (date-of-birth input with plausibility checks). If age < 18, trigger a parental consent flow: send verification email/SMS to parent, capture consent with parental identity verification (OTP, government ID verification via a third-party API). Tag children\'s data records with a `is_minor: true` flag. Implement DLP rules in AWS Macie, Azure Purview, and GCP DLP to block profiling or behavioral tracking on flagged records. Disable analytics SDKs for minor-flagged sessions.',
          check: 'Test: register as a minor and verify parental consent flow is triggered and cannot be bypassed. Verify children\'s data records are tagged. Verify DLP rules block profiling exports. Verify analytics SDKs are disabled for minor-flagged sessions.'
        }
      ]
    },
    {
      week: 3,
      title: 'Security Safeguards, Breach Response & DPIA',
      days: 'Days 15-21',
      description: 'Implement technical and organizational security measures, breach notification workflows, and Data Protection Impact Assessments',
      tasks: [
        {
          title: 'Implement reasonable security safeguards (encryption, access control, logging)',
          control: 'Deploy technical and organizational security measures commensurate with the nature of data and risk (Section 8(1)). Include encryption at rest and in transit, role-based access control, and comprehensive audit logging.',
          how: 'Encryption at rest: AWS KMS with customer-managed keys (CMK) for S3/RDS, Azure Key Vault for storage accounts and SQL Database, GCP Cloud KMS for Cloud Storage/BigQuery, Alibaba KMS for OSS. Encryption in transit: enforce TLS 1.2+ via ALB/NLB security policies and API Gateway settings. Access control: implement least-privilege IAM policies using AWS IAM, Azure AD PIM (just-in-time), GCP IAM Conditions. Logging: enable AWS CloudTrail + VPC Flow Logs, Azure Monitor + NSG Flow Logs, GCP Cloud Audit Logs. Centralize logs in a SIEM (e.g., Sentinel, Splunk, or ELK).',
          check: 'All production data stores have encryption at rest with CMKs. TLS 1.2+ enforced on all endpoints. IAM policies reviewed quarterly — no standing admin access. SIEM dashboards show access logs from all three clouds. Penetration test confirms no unencrypted data exposure.'
        },
        {
          title: 'Design and test data breach detection and assessment process',
          control: 'Establish continuous monitoring and a breach assessment process to detect unauthorized access, accidental disclosure, or loss of digital personal data (Section 8(2)-(3)).',
          how: 'Deploy intrusion detection: AWS GuardDuty, Azure Defender for Cloud, GCP Cloud IDS. Configure anomaly detection on authentication (AWS CloudTrail Insights, Azure AD Identity Protection, GCP Chronicle). Build a breach assessment playbook: upon alert, a cross-functional team (Security, Legal, DPO) evaluates: (a) nature of data, (b) volume affected, (c) ease of identification, (d) severity of harm. Classify severity as Critical/High/Medium/Low. Use a runbook stored in Confluence/Notion with decision trees.',
          check: 'Alerts flow from GuardDuty/Defender/Chronicle to a centralized SIEM. Breach assessment playbook is documented and has been tabletop-tested at least once. Last tabletop test date is recorded with participants and findings.'
        },
        {
          title: 'Implement 72-hour breach notification to DPB and data principals',
          control: 'Notify the Data Protection Board of India (DPB) and affected data principals within 72 hours of becoming aware of a personal data breach (Section 8(6)). Notification must include nature of breach, data involved, remediation steps, and DPO contact.',
          how: 'Build an automated notification workflow: upon breach confirmation, a Step Functions/Durable Functions workflow triggers: (1) generates notification template with pre-filled fields (breach ID, nature, data categories, count, remediation plan, DPO contact), (2) sends to DPB via their designated portal/email, (3) sends individual notices to affected data principals via email/SMS (using SNS/SendGrid/Twilio), (4) creates an incident ticket with full audit trail. Store notification records in a dedicated, append-only DynamoDB/Cosmos DB table.',
          check: 'Breach notification workflow has been tested end-to-end with a simulated breach. Notification template contains all DPDPA-required fields. Test notification was sent and delivery confirmed within 72 hours of simulated detection. Audit log of the test exists.'
        },
        {
          title: 'Conduct Data Protection Impact Assessment (DPIA) for high-risk processing',
          control: 'Perform DPIAs for processing that is likely to result in a high risk to data principals\' rights (mandatory for Significant Data Fiduciaries under Section 10; best practice for all). Document risk assessment, mitigation measures, and DPO sign-off.',
          how: 'DPIA is NOT a ROPA (see note below). Build a DPIA template covering: (1) description of processing and purposes, (2) necessity and proportionality assessment, (3) risk assessment to data principals (likelihood × severity matrix), (4) mitigation measures (technical + organizational), (5) DPO consultation outcome, (6) residual risk acceptance. Run DPIAs before deploying new features involving profiling, large-scale processing, or children\'s data. Store DPIA records in a versioned SharePoint/Confluence space. Use a scoring matrix: Likelihood (Rare/Possible/Likely/Almost Certain) × Severity (Negligible/Moderate/Major/Critical) = Risk Level.',
          check: 'DPIA template exists and follows the structure above. At least one completed DPIA for an existing high-risk processing activity. DPIA records show DPO sign-off and residual risk acceptance. New feature deployments involving profiling cannot proceed without a completed DPIA.',
          note: 'IMPORTANT: DPDPA does NOT mandate ROPA (Record of Processing Activities) like GDPR Article 30. However, maintaining an internal processing activities register is strongly recommended as a best practice — it supports DPIA completion, audit readiness, and data mapping. Treat ROPA as an internal governance tool, not a statutory obligation under DPDPA.'
        },
        {
          title: 'Implement data protection by design and by default',
          control: 'Embed data protection principles into system design from the outset (Section 8(1)). Default settings must be the most privacy-protective. Minimize data collection to what is necessary for the stated purpose.',
          how: 'Implement privacy engineering patterns: (1) pseudonymization using AWS Nitro Enclaves or Azure Confidential Computing for sensitive processing, (2) data minimization — audit forms and APIs to remove unnecessary fields, (3) purpose limitation — tag every API endpoint and data store with its permitted purpose; enforce via middleware, (4) default privacy settings — new accounts default to maximum privacy, (5) retention automation — AWS Lambda + S3 Lifecycle Policies, Azure Blob Lifecycle Management, GCP Cloud Storage Lifecycle to auto-delete expired data. Environment segregation: production data never used in staging/development; use synthetic data generators (Faker, Synthea) for non-prod.',
          check: 'Privacy-by-design checklist is part of the engineering PR review process. Default settings for new accounts are privacy-maximizing. Production PII is absent from staging/development environments (verified via Macie/Purview scan). Retention automation is active and deleting expired data as scheduled.'
        }
      ]
    },
    {
      week: 4,
      title: 'Significant Data Fiduciary, Cross-Border & Ongoing Compliance',
      days: 'Days 22-30',
      description: 'Address SDF obligations, cross-border transfer governance, vendor management, and establish ongoing compliance monitoring',
      tasks: [
        {
          title: 'Evaluate Significant Data Fiduciary (SDF) status and obligations',
          control: 'Determine whether the organization qualifies as a Significant Data Fiduciary (Section 10) based on volume and sensitivity of data processed, risk to rights, and impact on sovereignty. If SDF: appoint a DPO resident in India, conduct annual DPIA, and undergo independent audit.',
          how: 'Assess SDF criteria: (1) volume of data principals > threshold (to be notified by government), (2) processing involves sensitive personal data at scale, (3) risk to data principal rights is high, (4) impact on sovereignty or integrity. If SDF: (a) appoint a DPO — create a formal appointment letter, publish DPO contact on website, DPO must be resident in India, (b) schedule annual DPIA reviews, (c) engage an independent auditor (EM panel from ICAI or equivalent) for annual data protection audit. Maintain an SDF compliance register.',
          check: 'SDF assessment document exists with reasoning. If SDF: DPO appointment letter and website publication confirmed. Annual DPIA calendar is set. Independent auditor is engaged or identified. If not SDF, assessment shows why and is reviewed annually.'
        },
        {
          title: 'Establish cross-border data transfer governance',
          control: 'Restrict cross-border transfers of personal data to jurisdictions notified by the Central Government (Section 16). Implement transfer mechanisms for any permitted jurisdictions and block transfers to non-notified jurisdictions.',
          how: 'Create a cross-border transfer register listing all outbound data flows: source, destination, data categories, legal basis. Use AWS DataExchange and VPC Peering controls to restrict data egress. Azure Blue/Green deployment patterns to isolate India-region processing. GCP VPC Service Controls to prevent data exfiltration. For permitted jurisdictions: implement contractual safeguards (Standard Contractual Clauses equivalent). For non-permitted jurisdictions: block via firewall rules, DLP policies, and cloud-native egress controls. Automate monitoring: AWS Config Rules, Azure Policy, GCP Organization Policy to detect and alert on unauthorized cross-border transfers.',
          check: 'Cross-border transfer register is current and complete. Firewall/DLP rules block transfers to non-notified jurisdictions (tested with simulated outbound transfer). Config/Policy compliance dashboards show 100% adherence to transfer restrictions for production environments.'
        },
        {
          title: 'Implement vendor and Data Processor contract management',
          control: 'Ensure all third-party Data Processors operate under contracts specifying DPDPA-compliant obligations: processing only on documented instructions, security measures, sub-processor controls, audit rights, and data return/deletion on termination.',
          how: 'Build a vendor register in a GRC tool (ServiceNow, OneTrust, or a custom SharePoint list) with fields: vendor_name, data_processed, contract_expiry, DPD clauses_status, last_audit_date, sub-processor_list. Require all new vendor contracts to include a DPDPA data processing addendum covering: purpose limitation, security standards, breach notification to Fiduciary within 24 hours, sub-processor approval, audit rights, and data deletion on termination. For cloud providers: leverage built-in DPAs (AWS DPA, Microsoft DPA, GCP DPA) and supplement with custom addenda where needed. Review annually.',
          check: 'Vendor register is complete with all data processors. 100% of active vendor contracts include DPDPA-compliant DPA. Last annual review date is recorded. High-risk vendors (processing sensitive personal data) have been audited within the last 12 months.'
        },
        {
          title: 'Set up environment segregation (production/staging/development)',
          control: 'Enforce strict segregation between production, staging, and development environments to prevent unauthorized access to live personal data and reduce breach surface area.',
          how: 'Implement separate cloud accounts/subscriptions per environment: AWS Organizations with separate accounts (Prod, Stage, Dev) per business unit, Azure Management Groups with separate subscriptions, GCP Folders with separate projects per environment. Network isolation: separate VPCs/VNets with no peering between prod and non-prod. Access control: production access requires MFA + just-in-time elevation (Azure PIM, AWS IAM Identity Center). Data: production data never copied to non-prod — use synthetic data tools (AWS Glue DataBrew, Faker libraries, Synthea for healthcare). CI/CD pipelines: deploy only from staging to prod via approved release windows.',
          check: 'Separate cloud accounts/subscriptions exist per environment. Network isolation confirmed — no VPC peering between prod and non-prod. No production PII in staging/development (Macie/Purview scan confirms). JIT access for production is enforced and audited. Synthetic data is used in all non-prod environments.'
        },
        {
          title: 'Establish ongoing compliance monitoring, audit, and training program',
          control: 'Implement a continuous compliance monitoring program including periodic audits, employee training, policy reviews, and alignment with evolving DPB guidelines and Central Government notifications.',
          how: 'Build a compliance calendar: (1) Monthly: review DPB guidelines and Central Government notifications, update internal policies, (2) Quarterly: access review and privilege audit across all cloud environments, (3) Semi-annually: penetration test and vulnerability assessment, (4) Annually: full DPDPA compliance audit (mandatory for SDF), DPIA reviews, employee training refresh, policy updates. Training: deploy DPDPA awareness training via LMS (e.g., Workday Learning, Docebo) with completion tracking. Gamify with department-level compliance scores. Publish a compliance dashboard in QuickSight/Power BI showing: audit findings, training completion %, grievance resolution metrics, breach drill results.',
          check: 'Compliance calendar exists with all cadences defined. Training completion rate > 95%. Last penetration test report shows no critical findings unresolved. Compliance dashboard is live and reviewed by leadership monthly. All audit findings have owners and remediation timelines.'
        }
      ]
    }
  ],
  milestones: [
    { day: 10, label: 'Consent & Data Mapping Operational', color: 'green' },
    { day: 20, label: 'Breach Response & DPIA Ready', color: 'orange' },
    { day: 30, label: 'Full DPDP Compliance Program Active', color: 'red' }
  ],
  referenceUrl: 'https://www.meity.gov.in/data-protection-framework'
};

export default function Dpdpa() {
  return <LearningFrameworkPage framework={FRAMEWORK} />;
}
