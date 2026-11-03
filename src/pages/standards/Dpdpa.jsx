import { RiskCrossCheckBlock } from "../../components/riskAssessment/RiskCrossCheck.jsx";
import LearningFrameworkPage from "../../components/LearningFrameworkPage.jsx";
import DpdpRoles from "../../components/DpdpRoles.jsx";
import GdprDpdpaComparison from "../../components/playbook/GdprDpdpaComparison.jsx";
import VibePlatformScenario from "../../components/playbook/VibePlatformScenario.jsx";
import { appendToLevel } from "../../data/playbookEvidence.js";

const FRAMEWORK = {
  id: 'dpdpa',
  name: 'DPDP Act 2023 (India)',
  region: 'India',
  flag: "🇮🇳",
  flagAnimation: "pulse",
  basePath: "/dpdpa",
  color: 'green',
  startupGaps: [
    {
      itgc: 'Data Privacy / Governance',
      templates: ['dpdpa-consent-notice'],
      gap: "Relying on implicit/vague consent instead of a valid notice + consent request",
      pushback: "People sign up and tick a box; that's consent.",
      reality: "DPDPA (Sec 5, 6) requires a clear notice BEFORE processing and consent that's separate, informed, and freely given. Pre-ticked boxes or bundled consent fail.",
      leantip: "Implement a plain-language notice, a granular consent checkbox, and a way to withdraw. Log consent (who, what, when) as evidence - use a consent-management tool."
    },
    {
      itgc: 'Data Privacy / Governance',
      templates: ['ropa-dpia', 'data-management-policy'],
      gap: "Collecting more data than needed with no purpose limitation",
      pushback: "We may need this data later, so we collect it now.",
      reality: "DPDPA enforces purpose limitation and data minimization (Sec 4). Over-collecting is a compliance failure and a breach liability.",
      leantip: "Review each field you collect - if you can't state its purpose, don't collect it. Add a data inventory and prune unused fields."
    },
    {
      itgc: 'Data Privacy / Governance',
      templates: ['dpdpa-crossborder-register', 'transfers-register'],
      gap: "Storing data abroad / no clarity on cross-border transfers",
      pushback: "Our cloud is fine wherever it is.",
      reality: "DPDPA Section 16 allows transfers outside India except to countries the Central Government restricts by notification. Rule 15 can add requirements on making data available to foreign States, sector laws (for example payment data rules) can require local storage, and a Significant Data Fiduciary must keep data specified under Rule 13(4) in India. There is no general rule that all data must stay in India.",
      leantip: "Map where personal data physically resides and keep a transfer register. Check Section 16 notifications before new transfers. Pin to India regions only where a sector rule, a customer contract or Rule 13(4) requires it, or where you choose to."
    },
    {
      itgc: 'Business Continuity & Incident',
      templates: ['dpdpa-breach-intimation', 'incident-response-plan'],
      gap: "No breach notification runbook to the DPDP Board",
      pushback: "Breach? We'll figure that out if ever.",
      reality: "DPDPA Section 8(6) and Rule 7 require intimation of every personal data breach to affected Data Principals and to the Board without delay, followed by a detailed report to the Board within 72 hours. There is no risk threshold, and failure can attract a penalty of up to Rs 200 crore.",
      leantip: "Write a one-page breach runbook: detect, intimate Data Principals and the Board without delay, send the detailed Board report within 72 hours, document. Assign a 24/7 on-call owner."
    },
    {
      itgc: 'Data Privacy / Governance',
      templates: ['dpdpa-grievance-log', 'dpdpa-nomination-form'],
      gap: "No grievance redressal mechanism for data principals",
      pushback: "It's just a feedback email address.",
      reality: "DPDPA Sections 11 to 14 give rights of access, correction and erasure, grievance redressal and nomination. Rule 14 requires you to publish how to exercise them and to respond within a period not exceeding 90 days, and Section 13(3) makes people use your grievance process before going to the Board.",
      leantip: "Stand up a support workflow for data-principal requests with ownership and SLAs. Keep request logs as evidence of the mechanism existing."
    }
  ],
  privacyStartupNotes: "DPDPA-specific note: India's DPDP Act expects notice + consent, purpose limitation, and breach notification to the DPDP Board. It does NOT statutorily mandate a GDPR-style ROPA, but keep an internal record of processing activities as best practice. DPIA is appropriate for high-risk processing even where not literally prescribed - run one to show diligence.",
  weeks: [
    {
      week: 1,
      title: 'Scope, Data Mapping & Consent Architecture',
      days: 'Days 1-7',
      description: 'Establish applicability, map data flows, and design consent infrastructure across multi-cloud environments',
      tasks: [
        {
          title: 'Determine applicability and classify roles under DPDPA',
          control: 'Identify whether the organization is a Data Fiduciary (determines purpose and means of processing) or a Data Processor (processes on behalf of a Fiduciary), and confirm scope. The Act applies to digital personal data processed in India, and to processing outside India connected with offering goods or services to Data Principals in India. It does not apply to personal data made publicly available by the Data Principal or under a legal duty, or to purely personal or domestic use. Citation: Sections 2(i), 2(k), 3 and 8(1); Rule 2.',
          how: 'Review all systems that collect or process digital personal data. Use a RACI matrix to map which team controls purpose (Fiduciary) vs. which executes processing (Processor). For multi-cloud setups, tag resources in AWS Resource Groups, Azure Resource Graph, and GCP Resource Manager by role classification.',
          check: 'A documented role classification register exists covering all data-handling systems. Each cloud account is tagged with fiduciary/processor designation.',
          templates: ['roles-raci'],
          templatesExclusive: true
        },
        {
          title: 'Map all digital personal data flows end-to-end',
          control: 'Create a data flow map covering collection, storage, processing, sharing, transfer and erasure of digital personal data across all environments. Citation: Sections 4, 5, 8(1); Rule 3 (itemised description of personal data in notices depends on this map).',
          how: 'Use AWS Glue Data Catalog and Azure Purview to auto-discover data stores. Build flow diagrams showing: collection point, transit, storage, processing, sharing, transfer outside India, and erasure. Tag each flow with data category: personal data, children\'s data (under 18), data of persons with disability under lawful guardianship, and publicly available data. Note: the DPDP Act has no statutory "sensitive personal data" category; you may keep an internal high-risk label, but do not treat it as a legal class. Use GCP Data Catalog for GCP-hosted assets and record every processor and sub-processor that receives data.',
          check: 'A visual data flow map exists covering all production, staging, and development environments. Each data store is classified by data category. Flows to/from third parties are explicitly documented.',
          templates: ['ropa-dpia', 'transfers-register'],
          templatesExclusive: true
        },
        {
          title: 'Implement consent collection and management platform',
          control: 'Deploy a consent management system that captures consent that is free, specific, informed, unconditional and unambiguous, given by clear affirmative action, limited to the specified purpose, and as easy to withdraw as to give. Citation: Section 6(1), 6(4); Rule 3. Registered Consent Managers under Section 6(7) to 6(9) and Rule 4 become available from 13 November 2026.',
          how: 'Deploy an open-source CMP (e.g., Open Consent Platform) or use AWS SES + DynamoDB to build a consent ledger. Store consent records with: timestamp, version of notice shown, specific purpose(s) consented, method of collection, and withdrawal capability. Use Azure Cosmos DB or GCP Firestore as a secondary consent store for geo-redundancy. Ensure consent UI presents purposes as granular toggles, not bundled.',
          check: 'Consent records stored in an immutable ledger with fields: data_principal_id, purpose, notice_version, timestamp, method, status (active/withdrawn). Consent withdrawal is accessible within two clicks from any user-facing interface.',
          templates: ['dpdpa-consent-notice'],
          templatesExclusive: true
        },
        {
          title: 'Decide data location: map transfers and apply India-region pinning only where required or chosen',
          control: 'The DPDP Act does not require all personal data to stay in India. Section 16 allows transfers outside India except to countries or territories the Central Government restricts by notification, and other Indian laws that give a higher degree of protection or restriction continue to apply (Section 16(2)). Rule 15 lets the Central Government set requirements, by general or special order, for making personal data available to foreign States or their agencies. Sector rules (for example payment system data directions) may require local storage, and a Significant Data Fiduciary must keep data specified under Rule 13(4) in India. Citation: Section 16; Rules 13(4), 15.',
          how: 'Record where each data store and processor sits. Keep India-region pinning as an optional control, used when a customer contract, a sector regulator or Rule 13(4) requires it, or when you choose it for latency or trust: AWS Asia Pacific (Mumbai) ap-south-1 or (Hyderabad) ap-south-2, Azure Central India or South India, GCP asia-south1 (Mumbai) or asia-south2 (Delhi). Where pinning is required, enforce it with AWS Service Control Policies, Azure Policy and GCP Organization Policy resource location constraints, and alert on drift with AWS Config or Azure Policy compliance. Do not route Indian personal data to a fallback region unless the transfer has been checked against Section 16, Rule 15 and any sector rule.',
          check: 'A location register exists for every data store and processor. Where pinning is required, the policy is active and tested (for example a deployment to a non-approved region is blocked). Every transfer outside India has a recorded restriction check.',
          templates: ['dpdpa-crossborder-register', 'transfers-register'],
          templatesExclusive: true
        },
        {
          title: 'Classify and label all data assets by category',
          control: 'Apply classification labels to stored and in-transit data that map to DPDP obligations: personal data, children\'s data (under 18), data of persons with disability, publicly available data (outside scope where Section 3(c)(ii) applies), and any internal high-risk label you choose. The Act does not define "sensitive personal data"; avoid presenting it as a statutory category. Citation: Sections 3, 9; Rules 10 to 12.',
          how: 'Use AWS Macie for S3 classification, Azure Information Protection (AIP) labels for files and databases, GCP Cloud Data Loss Prevention API for auto-classification, and Alibaba Data Security Center. Create an internal data catalog with fields: asset_id, data_category, DPDPA_obligations, retention_period, storage_location, encryption_status.',
          check: 'Every database, S3 bucket, and storage account has a classification label. Macie/AIP/DLP reports show zero unclassified data stores in production. Classification drives downstream controls (encryption, access, retention).',
          templates: ['ropa-dpia'],
          templatesExclusive: true
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
          control: 'Give a notice before or when consent is requested (Section 5) that is understandable on its own and contains, at minimum, an itemised description of the personal data and the specified purpose for each item, the goods or services enabled, how to withdraw consent, how to exercise rights and raise grievances, and how to complain to the Data Protection Board (Rule 3). Offer the notice in English or any language in the Eighth Schedule to the Constitution (Section 5(3)). Citation: Section 5; Rule 3.',
          how: 'Create notice templates stored in a version-controlled CMS (e.g., headless CMS like Strapi on ECS/EKS or Azure App Service). Each notice version is immutable and versioned. At every collection point (web forms, mobile SDKs, APIs), serve the current notice version and log which version was presented. Use AWS Lambda@Edge or Azure Front Door to inject notices dynamically. Store notice acceptance records in DynamoDB/Cosmos DB.',
          check: 'Every collection point serves a DPDPA-compliant notice. Notice version history is maintained. Sample audit: 10 random collection points all display correct, current notice with all required disclosures.',
          templates: ['dpdpa-consent-notice', 'privacy-notice'],
          templatesExclusive: true
        },
        {
          title: 'Implement Data Principal rights: access, correction, and erasure',
          control: 'Build workflows for the rights to access information about processing (Section 11), to correction, completion, updating and erasure (Section 12), to grievance redressal (Section 13) and to nominate another person to exercise rights on death or incapacity (Section 14). Publish how to exercise rights and the identifiers needed (Rule 14(1)) and respond within the published period, which must not exceed ninety days (Rule 14(3)). Citation: Sections 11 to 14; Rule 14.',
          how: 'Create a self-service portal (React app hosted on S3/CloudFront or Azure Static Web Apps) where data principals can: request a data export (access), submit correction requests, and request erasure. Backend: API Gateway → Lambda/Functions → database queries. For correction, implement versioned update records. For erasure, cascade delete across all systems using a deletion orchestrator (Step Functions, Azure Durable Functions, or GCP Workflows). Maintain an erasure audit log.',
          check: 'A self-service portal exists. Test: submit an access request and verify the response arrives within the published period (not more than 90 days; set a shorter internal target). Test: submit an erasure request and verify removal from production stores and Data Processors, except data and logs that Rule 8(3) or another law requires you to keep. Test: register and act on a nomination.',
          templates: ['dpdpa-grievance-log', 'dpdpa-nomination-form'],
          templatesExclusive: true
        },
        {
          title: 'Deploy grievance redressal mechanism with SLA tracking',
          control: 'Establish a grievance redressal mechanism with a published contact (Section 8(10)) and response period not exceeding ninety days (Rule 14(3)). A Data Principal must exhaust this mechanism before complaining to the Board (Section 13(3)), so log every grievance and tell the person about the Board route when you close it. Citation: Sections 8(10), 13; Rule 14.',
          how: 'Integrate a ticketing system (Jira Service Management or Zendesk) to receive and track grievances. Set SLAs: acknowledge within 48 hours, resolve within 30 days. Use AWS CloudWatch Alarms or Azure Monitor Alerts for SLA breach notifications. Publish grievance officer contact on the website and in all privacy notices. Build a monthly grievance report dashboard in QuickSight or Power BI.',
          check: 'Grievance officer name and contact are published. Ticketing system tracks all grievances with SLA metrics. Monthly report shows average resolution time and SLA breach rate. Random sample: 5 resolved grievances show proper escalation and resolution.',
          templates: ['dpdpa-grievance-log'],
          templatesExclusive: true
        },
        {
          title: 'Implement consent withdrawal mechanism with downstream propagation',
          control: 'Make withdrawal as easy as giving consent (Section 6(4)). On withdrawal, stop processing for that purpose within a reasonable time and have Data Processors stop too (Section 6(6)), and erase the data unless retention is needed for a legitimate use under Section 7 or required by law (Section 8(7)). Rule 8(3) still requires personal data, traffic data and processing logs to be kept for at least one year from processing for the Seventh Schedule purposes, so restrict those records to that purpose instead of deleting them early. Citation: Sections 6(4) to 6(6), 7, 8(7); Rule 8(3).',
          how: 'In the consent management platform, add a one-click withdrawal option. Trigger a workflow (Step Functions/Durable Functions) that: (1) updates consent status, (2) stops all active processing pipelines referencing that data principal, (3) initiates erasure across all data stores within the defined timeline, (4) notifies downstream processors/partners to cease processing. Use SQS/SNS or Azure Service Bus to fan out erasure commands. Log all withdrawal actions with timestamps.',
          check: 'Test: withdraw consent for a test data principal. Verify processing stops within 24 hours. Verify downstream systems receive erasure commands. Verify consent ledger shows withdrawn status with timestamp. Confirm data is erased from all stores within the committed retention window.',
          templates: ['dpdpa-vendor-addendum'],
          templatesExclusive: true
        },
        {
          title: 'Build children\'s data protection controls',
          control: 'A child is anyone under 18 (Section 2(f)). Obtain verifiable consent of the parent before processing (Section 9(1); Rule 10), checking the parent is an identifiable adult using details already held, details provided, or a virtual token from an authorised entity such as a Digital Locker provider. For a person with disability who has a lawful guardian, verify the guardianship (Rule 11). Do not track, behaviourally monitor or target advertising at children (Section 9(3)). Rule 12 and the Fourth Schedule exempt specified classes (for example clinical establishments, educational institutions, creches) and purposes (for example email-only accounts, real-time location for safety, confirming a user is not a child) from some of these duties, subject to conditions. Citation: Sections 2(f), 9; Rules 10 to 12.',
          how: 'Deploy an age-verification gate at registration (date-of-birth input with plausibility checks). If age < 18, trigger a parental consent flow: send verification email/SMS to parent, capture consent with parental identity verification (OTP, government ID verification via a third-party API). Tag children\'s data records with a `is_minor: true` flag. Implement DLP rules in AWS Macie, Azure Purview, and GCP DLP to block profiling or behavioral tracking on flagged records. Disable analytics SDKs for minor-flagged sessions.',
          check: 'Test: register as a minor and verify parental consent flow is triggered and cannot be bypassed. Verify children\'s data records are tagged. Verify DLP rules block profiling exports. Verify analytics SDKs are disabled for minor-flagged sessions.',
          templates: ['parental-consent'],
          templatesExclusive: true
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
          control: 'Take reasonable security safeguards to prevent personal data breach (Section 8(5)), including at least the Rule 6 minimums: (a) encryption, obfuscation, masking or virtual tokens; (b) access control; (c) logs, monitoring and review to detect unauthorised access; (d) measures for continued processing after a compromise, such as backups; (e) retention of logs and personal data for one year for detection and remediation, unless another law requires otherwise; (f) safeguard terms in Data Processor contracts; (g) technical and organisational measures to make sure safeguards are observed. Citation: Section 8(5); Rule 6.',
          how: 'Encryption at rest: AWS KMS with customer-managed keys (CMK) for S3/RDS, Azure Key Vault for storage accounts and SQL Database, GCP Cloud KMS for Cloud Storage/BigQuery, Alibaba KMS for OSS. Encryption in transit: enforce TLS 1.2+ via ALB/NLB security policies and API Gateway settings. Access control: implement least-privilege IAM policies using AWS IAM, Azure AD PIM (just-in-time), GCP IAM Conditions. Logging: enable AWS CloudTrail + VPC Flow Logs, Azure Monitor + NSG Flow Logs, GCP Cloud Audit Logs. Centralize logs in a SIEM (e.g., Sentinel, Splunk, or ELK).',
          check: 'All production data stores have encryption at rest with CMKs. TLS 1.2+ enforced on all endpoints. IAM policies reviewed quarterly - no standing admin access. SIEM dashboards show access logs from all three clouds. Penetration test confirms no unencrypted data exposure.',
          templates: ['access-control-policy', 'cryptography-policy'],
          templatesExclusive: true
        },
        {
          title: 'Design and test data breach detection and assessment process',
          control: 'Detect and assess unauthorised processing, accidental disclosure, loss of access or other compromise of personal data, so the Rule 7 intimations can start without delay. Citation: Sections 2(u), 8(5), 8(6); Rules 6(1)(c), 7.',
          how: 'Deploy intrusion detection: AWS GuardDuty, Azure Defender for Cloud, GCP Cloud IDS. Configure anomaly detection on authentication (AWS CloudTrail Insights, Azure AD Identity Protection, GCP Chronicle). Build a breach assessment playbook: upon alert, a cross-functional team (Security, Legal, DPO) evaluates: (a) nature of data, (b) volume affected, (c) ease of identification, (d) severity of harm. Classify severity as Critical/High/Medium/Low. Use a runbook stored in Confluence/Notion with decision trees.',
          check: 'Alerts flow from GuardDuty/Defender/Chronicle to a centralized SIEM. Breach assessment playbook is documented and has been tabletop-tested at least once. Last tabletop test date is recorded with participants and findings.',
          templates: ['incident-response-plan', 'incident-register'],
          templatesExclusive: true
        },
        {
          title: 'Implement Rule 7 breach intimation: Data Principals and Board without delay, detailed Board report within 72 hours',
          control: 'On becoming aware of any personal data breach, intimate (1) each affected Data Principal without delay, through their account or registered contact, and (2) the Data Protection Board without delay with a description of the breach. Then send the Board a detailed report within 72 hours of becoming aware, or a longer period the Board allows on a written request. Unlike GDPR Art. 33, there is no risk threshold: every personal data breach must be intimated. Failure to intimate can attract a penalty of up to Rs 200 crore (Schedule, item 2). Citation: Section 8(6); Rule 7; Section 33 and Schedule.',
          how: 'Build a two-step workflow. Step 1 (without delay): send Data Principals a concise, plain notice covering the nature, extent, timing and location of the breach, likely consequences for them, mitigation taken or planned, steps they can take, and a business contact; send the Board an initial intimation with nature, extent, timing, location and likely impact. Step 2 (within 72 hours): send the Board updated details, broad facts and causes, mitigation measures, any findings about the person responsible, remedial measures, and a report on the intimations sent to Data Principals. If more time is needed, request an extension in writing and record the Board\'s response. Data Processors must notify you fast enough for this to work.',
          check: 'A breach drill shows both steps completed: Data Principal and Board intimations sent without delay, and the detailed Board report within 72 hours of awareness. Templates contain every Rule 7 field. The awareness time and each send time are recorded.',
          templates: ['dpdpa-breach-intimation', 'incident-register'],
          templatesExclusive: true
        },
        {
          title: 'Conduct Data Protection Impact Assessment (DPIA) for high-risk processing',
          control: 'A DPIA is mandatory for Significant Data Fiduciaries, once every twelve months, with significant observations reported to the Board (Section 10(2)(c); Rule 13(1) and (2)). For other Data Fiduciaries it is good practice for high-risk processing such as children\'s data, large-scale profiling or new technology. Citation: Section 10; Rule 13.',
          how: 'DPIA is NOT a ROPA (see note below). Build a DPIA template covering: (1) description of processing and purposes, (2) necessity and proportionality assessment, (3) risk assessment to data principals (likelihood × severity matrix), (4) mitigation measures (technical + organizational), (5) DPO consultation outcome, (6) residual risk acceptance. Run DPIAs before deploying new features involving profiling, large-scale processing, or children\'s data. Store DPIA records in a versioned SharePoint/Confluence space. Use a scoring matrix: Likelihood (Rare/Possible/Likely/Almost Certain) × Severity (Negligible/Moderate/Major/Critical) = Risk Level.',
          check: 'DPIA template exists and follows the structure above. At least one completed DPIA for an existing high-risk processing activity. DPIA records show DPO sign-off and residual risk acceptance. New feature deployments involving profiling cannot proceed without a completed DPIA.',
          note: 'IMPORTANT: DPDPA does NOT mandate ROPA (Record of Processing Activities) like GDPR Article 30. However, maintaining an internal processing activities register is strongly recommended as a best practice - it supports DPIA completion, audit readiness, and data mapping. Treat ROPA as an internal governance tool, not a statutory obligation under DPDPA.',
          templates: ['ropa-dpia', 'dpdpa-sdf-assessment'],
          templatesExclusive: true
        },
        {
          title: 'Implement data protection by design and by default',
          control: 'Build purpose limitation, minimisation and erasure into systems: process only for the purpose consented to or a legitimate use, and erase when the purpose is no longer served (Sections 4, 6(1), 7, 8(7)). Defaults should be the most privacy-protective. Citation: Sections 4, 6, 7, 8(7); Rules 6, 8.',
          how: 'Implement privacy engineering patterns: (1) pseudonymization using AWS Nitro Enclaves or Azure Confidential Computing for sensitive processing, (2) data minimization - audit forms and APIs to remove unnecessary fields, (3) purpose limitation - tag every API endpoint and data store with its permitted purpose; enforce via middleware, (4) default privacy settings - new accounts default to maximum privacy, (5) retention automation - AWS Lambda + S3 Lifecycle Policies, Azure Blob Lifecycle Management, GCP Cloud Storage Lifecycle to auto-delete expired data. Environment segregation: production data never used in staging/development; use synthetic data generators (Faker, Synthea) for non-prod.',
          check: 'Privacy-by-design checklist is part of the engineering PR review process. Default settings for new accounts are privacy-maximizing. Production PII is absent from staging/development environments (verified via Macie/Purview scan). Retention automation is active and deleting expired data as scheduled.',
          templates: ['data-management-policy'],
          templatesExclusive: true
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
          control: 'The Central Government notifies a Data Fiduciary or class as Significant based on factors including volume and sensitivity of personal data, risk to Data Principal rights, impact on the sovereignty and integrity of India, risk to electoral democracy, security of the State and public order (Section 10(1)). If notified: appoint a Data Protection Officer based in India who is responsible to the Board of Directors or similar governing body; appoint an independent data auditor; carry out a DPIA and an audit once every twelve months and report significant observations to the Data Protection Board; verify that algorithmic software is not likely to pose a risk to Data Principal rights; and keep data specified under Rule 13(4) in India. Citation: Section 10; Rule 13.',
          how: 'Track notifications under Section 10(1). Record your assessment of the Section 10(1) factors and your likely position. Prepare in advance: DPO role description, auditor shortlist, DPIA method, algorithmic risk review for any models that make or shape decisions about people, and a list of data that could be specified under Rule 13(4). There is no published numeric threshold; do not assume one.',
          check: 'SDF assessment exists with reasoning and is reviewed at least annually. If notified: DPO appointed and published, auditor engaged, DPIA and audit calendar set to twelve-month cycles, Board report process defined, and algorithmic due diligence recorded.',
          templates: ['dpdpa-sdf-assessment'],
          templatesExclusive: true
        },
        {
          title: 'Establish cross-border data transfer governance',
          control: 'Transfers outside India are allowed except to countries or territories the Central Government restricts by notification (Section 16(1)). Also check: requirements set by general or special order under Rule 15 for making data available to foreign States or their agencies; sector laws that require local storage or impose stricter conditions (Section 16(2)); and, for Significant Data Fiduciaries, data specified under Rule 13(4) that must not leave India. Citation: Section 16; Rules 13(4), 15.',
          how: 'Keep a transfer register listing each flow outside India: data, purpose, recipient, country and contract. Before each new transfer and at least quarterly, check the latest Section 16 notifications and any Rule 15 order, and record the result. Use egress controls (AWS VPC endpoints and SCPs, Azure Private Link and Policy, GCP VPC Service Controls) to stop data reaching countries that become restricted or flows that a sector rule forbids. Put transfer terms in processor contracts so you can move or stop processing if a restriction is notified.',
          check: 'Transfer register is current. Each transfer shows a dated restriction check. A test shows that a blocked destination cannot receive data. Contracts allow relocation or termination if a restriction is notified.',
          templates: ['dpdpa-crossborder-register', 'transfers-register'],
          templatesExclusive: true
        },
        {
          title: 'Implement vendor and Data Processor contract management',
          control: 'A Data Fiduciary may engage a Data Processor only under a valid contract (Section 8(2)) and remains responsible for compliance irrespective of any agreement (Section 8(1)). Contracts must carry security provisions (Rule 6(1)(f)), breach notice fast enough for Rule 7, erasure on instruction (Section 8(7)), Rule 8(3) log retention support and sub-processor controls. Citation: Section 8(1), 8(2); Rules 6, 7, 8.',
          how: 'Build a vendor register in a GRC tool (ServiceNow, OneTrust, or a custom SharePoint list) with fields: vendor_name, data_processed, contract_expiry, DPD clauses_status, last_audit_date, sub-processor_list. Require all new vendor contracts to include a DPDPA data processing addendum covering: purpose limitation, security standards, breach notification to Fiduciary within 24 hours, sub-processor approval, audit rights, and data deletion on termination. For cloud providers: leverage built-in DPAs (AWS DPA, Microsoft DPA, GCP DPA) and supplement with custom addenda where needed. Review annually.',
          check: 'Vendor register is complete with all data processors. 100% of active vendor contracts include DPDPA-compliant DPA. Last annual review date is recorded. High-risk vendors (processing sensitive personal data) have been audited within the last 12 months.',
          templates: ['dpdpa-vendor-addendum', 'vendor-management-policy'],
          templatesExclusive: true
        },
        {
          title: 'Set up environment segregation (production/staging/development)',
          control: 'Separate production, staging and development so live personal data is not exposed in lower environments. This supports the Rule 6 safeguards (access control, masking, monitoring); it is good practice rather than a named statutory requirement. Citation: Section 8(5); Rule 6.',
          how: 'Implement separate cloud accounts/subscriptions per environment: AWS Organizations with separate accounts (Prod, Stage, Dev) per business unit, Azure Management Groups with separate subscriptions, GCP Folders with separate projects per environment. Network isolation: separate VPCs/VNets with no peering between prod and non-prod. Access control: production access requires MFA + just-in-time elevation (Azure PIM, AWS IAM Identity Center). Data: production data never copied to non-prod - use synthetic data tools (AWS Glue DataBrew, Faker libraries, Synthea for healthcare). CI/CD pipelines: deploy only from staging to prod via approved release windows.',
          check: 'Separate cloud accounts/subscriptions exist per environment. Network isolation confirmed - no VPC peering between prod and non-prod. No production PII in staging/development (Macie/Purview scan confirms). JIT access for production is enforced and audited. Synthetic data is used in all non-prod environments.',
          templates: ['access-control-policy'],
          templatesExclusive: true
        },
        {
          title: 'Establish ongoing compliance monitoring, audit, and training program',
          control: 'Run a continuous programme: track Central Government notifications and Board directions, review policies, train staff, and audit controls. An independent audit every twelve months is mandatory only for Significant Data Fiduciaries (Rule 13(1)). Plan around the commencement dates: Rules 1, 2 and 17 to 21 from 13 November 2025; Rule 4 (Consent Managers) from 13 November 2026; Rules 3, 5 to 16, 22 and 23 from 13 May 2027. Citation: Section 10; Rules 1, 13.',
          how: 'Build a compliance calendar: (1) Monthly: review DPB guidelines and Central Government notifications, update internal policies, (2) Quarterly: access review and privilege audit across all cloud environments, (3) Semi-annually: penetration test and vulnerability assessment, (4) Annually: full DPDPA compliance audit (mandatory for SDF), DPIA reviews, employee training refresh, policy updates. Training: deploy DPDPA awareness training via LMS (e.g., Workday Learning, Docebo) with completion tracking. Gamify with department-level compliance scores. Publish a compliance dashboard in QuickSight/Power BI showing: audit findings, training completion %, grievance resolution metrics, breach drill results.',
          check: 'Compliance calendar exists with all cadences defined. Training completion rate > 95%. Last penetration test report shows no critical findings unresolved. Compliance dashboard is live and reviewed by leadership monthly. All audit findings have owners and remediation timelines.',
          templates: ['internal-audit-programme'],
          templatesExclusive: true
        }
      ]
    }
  ],
  // Planning estimate in days from start. These are not legal deadlines; the legal
  // deadline for most obligations is 13 May 2027 (see the DPDP Rules timeline section).
  milestones: [
    { day: 14, label: 'Roles, data map and gap analysis done', color: 'green' },
    { day: 56, label: 'Notice, consent and rights workflows live', color: 'green' },
    { day: 98, label: 'Security, retention, breach and vendor controls tested', color: 'orange' },
    { day: 140, label: 'Evidence pack ready for review', color: 'red' }
  ],
  hoursByLevel: [8, 10, 10, 8],
  referenceUrl: 'https://www.meity.gov.in/data-protection-framework',
  extraSections: [<DpdpRoles key="dpdp-roles" />, <GdprDpdpaComparison key="gdpr-dpdpa-comparison" />, <VibePlatformScenario key="vibe-platform" jurisdiction="dpdpa" />]
};

// Additive: appended at the end of Level 3 so saved progress keys do not move.
appendToLevel(FRAMEWORK, 2, { tasks: [{
  title: 'Apply Rule 8 retention and erasure: one-year minimum for logs, Third Schedule periods and 48-hour notice',
  control: 'Keep personal data, associated traffic data and processing logs for at least one year from processing, including processing by Data Processors, for the Seventh Schedule purposes, then erase unless another law requires longer (Rule 8(3)); Rule 6(1)(e) also requires one year of logs and personal data for detecting and remediating unauthorised access. If you are in a Third Schedule class (large e-commerce entities, online gaming intermediaries and social media intermediaries with the user thresholds stated there), erase personal data after the stated period of inactivity and tell the Data Principal at least 48 hours before (Rule 8(1) and (2)). Citation: Section 8(7); Rules 6(1)(e), 8; Third and Seventh Schedules.',
  how: 'Split retention into three layers: (1) logs and traffic data kept at least one year in restricted, access-logged storage and used only for Rule 8(3) and Rule 6 purposes; (2) customer personal data erased when the purpose ends, consent is withdrawn or a Third Schedule period expires; (3) data kept longer because another law requires it, with the law recorded. When consent is withdrawn or erasure is requested, erase layer 2 everywhere (including Data Processors and caches) and restrict layer 1 to its retention purpose until the one-year period ends. For Third Schedule classes, schedule the 48-hour advance notice before automated erasure.',
  check: 'Retention schedule shows the three layers. Log stores keep at least one year and then delete. A withdrawal test shows customer data erased and logs restricted, not used for other purposes. Third Schedule notices (if applicable) are sent 48 hours before erasure.',
  templates: ['data-management-policy', 'dpdpa-vendor-addendum'],
  templatesExclusive: true,
}] });

export default function Dpdpa() {
  return (
    <>
      <LearningFrameworkPage framework={FRAMEWORK} />
      <RiskCrossCheckBlock frameworkId="dpdpa" />
    </>
  );
}

export { FRAMEWORK };
