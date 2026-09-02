import LearningFrameworkPage from "../../components/LearningFrameworkPage";

const FRAMEWORK = {
  id: "soc2",
  name: "SOC 2 Type II",
  region: "Global",
  color: "green",
  startupGaps: [
    {
      gap: "Startups fail to distinguish Trust Services Criteria until the report",
      pushback: "We'll worry about which TSC categories apply once we get closer to the audit.",
      reality: "SOC 2 requires you to select the TSC in-scope (Security always; Confidentiality/Privacy/Integrity/Availability optional). Picking late means controls designed for the wrong scope.",
      leantip: "Decide TSC scope WHEN choosing the auditor — Security + Availability covers most SaaS. Add Confidentiality if you hold customers' secrets. Confirm each control maps to a chosen TSC."
    },
    {
      gap: "Type II evidence gap — controls exist but weren't operated over time",
      pushback: "We did everything at the end, so just back-date it.",
      reality: "Type II needs controls operating over the audit period (typically 6-12 months) with evidence dated throughout. Backdated evidence is a red flag and can sink the report.",
      leantip: "Turn on continuous evidence capture early: cloud audit logs, access-review records, vulnerability-scan history, ticket timestamps. Screenshot dashboards monthly — cheap and legit."
    },
    {
      gap: "No evidence of access reviews, change management, or vendor risk",
      pushback: "We review access informally in Slack; changes go straight to prod.",
      reality: "These are the most common SOC 2 findings. Without periodic access reviews, documented change control, and vendor risk assessments, you'll get exceptions.",
      leantip: "Automate access reviews via your IDP quarterly, gate changes through CI/CD approvals with audit trails, and maintain a one-page vendor risk register reviewed every 6 months."
    },
    {
      gap: "Single point of control — one person holds all the cloud keys & knowledge",
      pushback: "It's just faster if one engineer does everything.",
      reality: "SOC 2 expects separation of duties. One person with all keys + no peer review = high risk finding and a real operational liability.",
      leantip: "Use short-lived credentials via an IDP/role assumption, require a second approver for production changes, and document control owners (even if the same 3 people wear many hats)."
    },
    {
      gap: "No defined uptime/availability commitments or DR testing",
      pushback: "We're a startup; 'good enough' availability is fine.",
      reality: "If Availability is in-scope, SOC 2 expects defined availability objectives and evidence of DR/BCP readiness, not just best-effort uptime.",
      leantip: "Document a target availability %, add monitoring/health checks, and do a lightweight DR tabletop or failover test once — keep the report as evidence."
    }
  ],
  weeks: 4,
  milestones: 3,
  referenceUrl:
    "https://www.aicpa.org/interestareas/frc/assuranceadvisoryservices/aicpasoc2report",
  weeksData: [
    {
      week: 1,
      title: "L1 Foundation \u2014 Trust Services Criteria Mapping",
      description:
        "Map each of the five Trust Services Criteria to your environment, understand their technical control requirements, and build the foundation for your SOC 2 Type II evidence program.",
      days: [
        {
          day: 1,
          title: "Security \u2014 Common Criteria CC6\u2013CC8 Deep Dive",
          tasks: [
            {
              title:
                "Map logical access controls to Common Criteria CC6.1\u2013CC6.8",
              control:
                "TSC Security \u2014 CC6 Logical and Physical Access Controls",
              how: "Document every logical access boundary in your environment. For CC6.1, inventory all authentication mechanisms (password policies, certificate-based auth, biometric). For CC6.2, map the user registration and authorization workflow from onboarding ticket to provisioning. For CC6.3, define role-based access control (RBAC) matrices for every in-scope system listing roles, permissions, and approval chains. For CC6.5, document the access revocation process tied to HR offboarding. Use IAM policy exports from your cloud provider (AWS IAM, Azure AD/Entra ID, GCP IAM, Alibaba RAM) as primary evidence sources.",
              check:
                "RBAC matrix covering every in-scope system with roles, permissions, approval workflows, and revocation procedures tied to HR offboarding triggers",
            },
            {
              title:
                "Document system boundary definitions and network segmentation for CC6.6",
              control: "TSC Security \u2014 CC6.6 System Boundaries",
              how: "Draw a detailed network architecture diagram showing all system boundaries. Include VPC/VNet/subnet perimeters, security group rules, NACLs, firewall rules, and load balancer configurations. For each cloud provider, export and document: AWS Security Groups and NACLs, Azure Network Security Groups and Azure Firewall rules, GCP VPC firewall rules, Alibaba security groups. Document how DMZ, application, and data tiers are segmented and what traffic is permitted between segments.",
              check:
                "Architecture diagram with network segmentation across all tiers, cloud-specific firewall rules exported, and ingress/egress matrix documented",
            },
            {
              title:
                "Define monitoring and detection controls for CC7.1\u2013CC7.2",
              control: "TSC Security \u2014 CC7 System Operations",
              how: "Map your monitoring stack to CC7.1 (anomaly detection) and CC7.2 (incident monitoring). Document SIEM configuration: log sources ingested (CloudTrail, Azure Activity Logs, GCP Audit Logs, ActionTrail), correlation rules, alert thresholds, and on-call rotation. For CC7.2, document how security events are detected using IDS/IPS signatures, WAF rule sets, and endpoint detection tools. Define the escalation matrix with severity levels (P0\u2013P4) and SLA for response at each level.",
              check:
                "Monitoring matrix with SIEM log sources, correlation rules, alert thresholds, severity classification, and escalation SLAs documented for P0\u2013P4",
            },
            {
              title:
                "Document incident response procedures mapped to CC7.3\u2013CC7.5",
              control:
                "TSC Security \u2014 CC7.3\u2013CC7.5 Incident Response and Recovery",
              how: "Write incident response procedures covering CC7.3 (security event evaluation), CC7.4 (incident response), and CC7.5 (incident recovery). Include: detection and triage workflows, containment procedures (network isolation, account suspension, service shutdown), eradication steps, recovery procedures, and post-incident review requirements. Document the incident response team roster, communication templates, and evidence preservation protocols. Include cloud-specific playbooks for AWS GuardDuty findings, Azure Sentinel incidents, and GCP Security Command Center alerts.",
              check:
                "Incident response runbook with detection-to-recovery workflows, cloud-specific playbooks, team roster, communication templates, and evidence preservation procedures",
            },
            {
              title: "Establish change management controls for CC8.1",
              control: "TSC Security \u2014 CC8.1 Change Management",
              how: "Document the change management process covering CC8.1. Define change classification (standard, normal, emergency), approval workflows per classification, testing requirements, deployment procedures, and rollback plans. Map the CI/CD pipeline stages to change management gates: code review (PR approval), security scanning (SAST/DAST), staging deployment, UAT sign-off, production deployment, and post-deployment verification. Document infrastructure-as-code change controls (Terraform plan/apply, CloudFormation change sets).",
              check:
                "Change management procedure with classification tiers, approval workflows, CI/CD gate mappings, IaC change controls, and rollback procedures documented",
            },
          ],
        },
        {
          day: 2,
          title: "Confidentiality \u2014 C1 Encryption & Data Protection Controls",
          tasks: [
            {
              title:
                "Document encryption at rest controls using AES-256 across all environments",
              control:
                "TSC Confidentiality \u2014 C1.1 Identification and Protection",
              how: "Inventory every data store containing confidential data and document the encryption-at-rest configuration. For databases: document RDS encryption (AWS), Azure SQL TDE, Cloud SQL encryption (GCP), Alibaba RDS encryption. For object storage: S3 SSE-S3/SSE-KMS, Azure Blob encryption, GCS default encryption. For block storage: EBS encryption, Azure Disk encryption, Persistent Disk encryption. Verify all encryption uses AES-256 or equivalent. Document KMS key ARNs/IDs used for each service.",
              check:
                "Encryption inventory with every data store listed, AES-256 encryption confirmed, and KMS key identifiers documented for databases, object storage, and block storage",
            },
            {
              title:
                "Document encryption in transit controls using TLS 1.3",
              control:
                "TSC Confidentiality \u2014 C1.1 Data Protection in Transit",
              how: "Verify and document TLS configuration across all endpoints. For load balancers: document TLS policy (AWS ELB TLS 1.3 policy, Azure Application Gateway TLS policy, GCP SSL policy). For APIs: document certificate configurations and minimum TLS versions. For internal service-to-service communication: document mTLS configurations (Istio, Linkerd, or native). Document certificate management using AWS ACM, Azure Key Vault certificates, GCP managed certificates, or Alibaba SSL Certificate Service. Verify no services accept TLS 1.0 or 1.1 connections.",
              check:
                "TLS configuration matrix with minimum version (1.3) enforced across all endpoints, certificate management documented, and legacy protocol disabling confirmed",
            },
            {
              title:
                "Document key management lifecycle and rotation procedures",
              control: "TSC Confidentiality \u2014 Key Management Controls",
              how: "Document the full key management lifecycle for each cloud provider. For AWS KMS: document customer-managed key (CMK) policy, automatic rotation schedule (annual), key deletion protection, and alias mapping. For Azure Key Vault: document key hierarchy, rotation policy, soft delete, purge protection, and access policies. For GCP Cloud KMS: document key ring structure, key rotation schedule, key destruction waiting period, and IAM bindings. For Alibaba KMS: document key version management, automatic rotation, and key alias mapping. Define the key ceremony process for initial key creation.",
              check:
                "Key management procedure covering KMS configuration for all cloud providers with rotation schedules, destruction policies, and key ceremony process documented",
            },
            {
              title:
                "Implement and document data classification and handling procedures",
              control:
                "TSC Confidentiality \u2014 C1.1 Data Classification",
              how: "Define a data classification scheme (e.g., Public, Internal, Confidential, Restricted) with handling requirements for each level. Document how classification labels are applied: S3 bucket tags, Azure storage account labels, GCP resource labels, database column-level tags. Document data handling procedures per classification level: who can access, where data can be stored, encryption requirements, sharing restrictions, and disposal requirements. Map sensitive data types (PII, PHI, financial, credentials) to classification levels.",
              check:
                "Data classification scheme with four levels, handling requirements per level, cloud resource tagging standards, and sensitive data type mappings documented",
            },
            {
              title:
                "Document data disposal and cryptographic erasure procedures",
              control:
                "TSC Confidentiality \u2014 C1.2 Disposal of Confidential Information",
              how: "Define and document data disposal procedures for every storage type. For databases: document logical deletion with retention period, followed by cryptographic erasure (destroying the KMS key renders data unrecoverable). For object storage: document bucket lifecycle policies for automatic deletion. For block storage: document EBS snapshot deletion and volume destruction. For hardware: document crypto-shredding procedures. For SaaS data: document tenant data purge verification. Include disposal verification steps (confirming deletion in cloud provider audit logs).",
              check:
                "Data disposal procedure for each storage type with cryptographic erasure steps, lifecycle policies, and verification methods documented",
            },
          ],
        },
        {
          day: 3,
          title: "Privacy \u2014 P1\u2013P8 Data Subject Rights & Processing Controls",
          tasks: [
            {
              title:
                "Implement data collection notice and consent management for P1\u2013P2",
              control:
                "TSC Privacy \u2014 P1 Notice and P2 Choice and Consent",
              how: "Document the privacy notice (P1) covering: what personal data is collected, purposes of collection, legal basis, retention periods, third-party sharing, and data subject rights. For P2, implement consent management: document consent capture mechanisms (cookie banners, in-app consent forms, API consent endpoints), consent granularity (purpose-level), consent withdrawal mechanisms, and consent record storage. Map consent records to data processing activities. Document compliance with applicable privacy laws (GDPR Art. 7, CCPA \u00a71798.120).",
              check:
                "Privacy notice published and accessible, consent management platform configured with purpose-level granularity, withdrawal mechanisms tested, and consent records stored with timestamps",
            },
            {
              title:
                "Document data minimization and purpose specification for P3\u2013P4",
              control:
                "TSC Privacy \u2014 P3 Collection and P4 Use, Retention, and Disposition",
              how: "For P3, document data minimization controls: only collect personal data that is necessary for specified purposes. Review each data collection point (forms, APIs, telemetry) and validate necessity. For P4, document purpose limitation controls: personal data collected for one purpose is not repurposed without new consent. Define retention schedules per data category (customer data: account lifetime + 30 days, analytics: 13 months, logs: 90 days, marketing: until unsubscribe). Implement automated retention enforcement using S3 lifecycle policies, Azure Blob lifecycle management, GCP Object Lifecycle Rules.",
              check:
                "Data minimization review completed for every collection point, retention schedule defined per data category, and automated retention enforcement configured for each cloud storage service",
            },
            {
              title:
                "Implement data subject access request (DSAR) workflows for P5\u2013P6",
              control: "TSC Privacy \u2014 P5 Access and P6 Disclosure",
              how: "Build DSAR response workflows covering P5 (data subject access rights) and P6 (disclosure to third parties). Implement: request intake portal, identity verification process, data discovery across all systems (databases, logs, backups, SaaS tools), data export in machine-readable format (JSON/CSV), redaction of third-party data, and response within 30-day SLA (GDPR) or 45-day SLA (CCPA). For P6, document when and how personal data is disclosed to third parties and how data subjects are notified. Use AWS Glue/Athena, Azure Purview, or GCP Data Catalog for data discovery.",
              check:
                "DSAR workflow documented with intake portal, identity verification, data discovery procedures across all systems, export format specifications, and SLA tracking",
            },
            {
              title:
                "Document data quality and accuracy controls for P7",
              control: "TSC Privacy \u2014 P7 Quality",
              how: "Implement and document data quality controls for P7. Define data quality metrics: completeness (required fields populated), accuracy (data matches real-world values), timeliness (data is current), and consistency (data is uniform across systems). Implement validation rules at data entry points. Document how data subjects can correct inaccurate data (profile editing, support requests). Implement data profiling jobs to detect quality anomalies. Use Great Expectations, AWS Deequ, or Azure Data Factory data flows for automated quality checks.",
              check:
                "Data quality framework with metrics defined, validation rules implemented at entry points, correction mechanisms available to data subjects, and automated profiling configured",
            },
            {
              title:
                "Implement monitoring and enforcement controls for P8",
              control: "TSC Privacy \u2014 P8 Monitoring and Enforcement",
              how: "Document privacy monitoring controls for P8. Implement: automated PII detection in new data uploads (AWS Macie, Azure Purview DLP, GCP DLP API), consent compliance monitoring (alerting when processing occurs without valid consent), retention compliance scanning (alerting when data exceeds retention period), and access audit logs for personal data access. Document the complaint handling process and regulatory notification procedures (72-hour breach notification under GDPR). Establish a privacy review process for new products and features.",
              check:
                "Privacy monitoring controls operational with PII detection, consent compliance alerts, retention scanning, access audit logs, and complaint handling procedure documented",
            },
          ],
        },
        {
          day: 4,
          title: "Integrity \u2014 PI1\u2013PI5 Processing Accuracy & Validation Controls",
          tasks: [
            {
              title:
                "Define processing integrity objectives and data validation for PI1\u2013PI2",
              control:
                "TSC Processing Integrity \u2014 PI1 Processing Objectives and PI2 Input Processing",
              how: "For PI1, document data processing integrity objectives: all authorized transactions are processed completely, completely authorized transactions are processed accurately, and processing occurs in a timely manner. For PI2, implement input validation controls: schema validation at API boundaries (JSON Schema, OpenAPI specs), field-level validation (type checking, range validation, format validation), and rejection of invalid input with error logging. Document input validation rules for every data ingestion pipeline and API endpoint.",
              check:
                "Processing integrity objectives documented per data flow, input validation rules defined for every API and ingestion pipeline, and invalid input rejection with logging confirmed",
            },
            {
              title:
                "Implement processing accuracy and reconciliation for PI3\u2013PI4",
              control:
                "TSC Processing Integrity \u2014 PI3 Processing Accuracy and PI4 Output Processing",
              how: "For PI3, implement processing accuracy controls: checksums for data in transit (SHA-256 for file transfers, CRC32 for message validation), record count validation between systems, automated reconciliation jobs comparing source and destination data, and processing log audits. For PI4, implement output validation: checksum verification on outputs, output-to-input reconciliation, and accuracy sampling. Document reconciliation procedures for critical data flows (payment processing, order fulfillment, billing). Implement automated reconciliation using database queries, scheduled jobs, or ETL tooling.",
              check:
                "Checksum algorithms documented for data transfers, reconciliation procedures defined for critical data flows, and automated reconciliation jobs scheduled and tested",
            },
            {
              title:
                "Build error handling and exception management for PI5",
              control:
                "TSC Processing Integrity \u2014 PI5 Error Handling",
              how: "Document error handling procedures for PI5. Define error categories (data validation errors, processing failures, integration errors, resource exhaustion), severity levels, and resolution procedures per category. Implement: idempotent retry logic with exponential backoff, dead-letter queues for failed messages, circuit breaker patterns for external integrations, and transaction rollback procedures for database operations. Document the error notification workflow, escalation paths, and error rate monitoring dashboards.",
              check:
                "Error handling framework with categories, severity levels, retry/dead-letter patterns, rollback procedures, and error rate monitoring dashboards documented",
            },
          ],
        },
        {
          day: 5,
          title: "Availability \u2014 A1 Uptime, DR/BCP & Capacity Controls",
          tasks: [
            {
              title:
                "Define uptime SLAs and availability targets for A1.1",
              control: "TSC Availability \u2014 A1.1 Availability Commitments",
              how: "Document availability commitments per service tier. Define SLA targets (e.g., 99.95% for production services, 99.9% for staging, 99.5% for internal tools). Map each service to its availability tier and calculate the maximum allowable downtime per month (99.95% = ~22 minutes/month). Document the SLA calculation methodology (excluding planned maintenance windows) and the monitoring tools used to measure actual availability (CloudWatch Synthetics, Azure Monitor Availability Tests, GCP Uptime Checks, Alibaba CloudMonitor).",
              check:
                "Availability SLA matrix with targets per service tier, maximum downtime calculations, monitoring tool configurations, and measurement methodology documented",
            },
            {
              title:
                "Implement disaster recovery and business continuity planning for A1.2",
              control: "TSC Availability \u2014 A1.2 DR/BCP",
              how: "Develop a disaster recovery plan covering: RTO (Recovery Time Objective) and RPO (Recovery Point Objective) targets per service, recovery procedures per failure scenario (single AZ, full region, cloud provider outage), data backup frequency and retention (AWS Backup, Azure Backup, GCP Cloud Backup, Alibaba Hybrid Backup Recovery), and DR site activation procedures. Document cross-region replication for databases (Aurora Global Database, Azure SQL geo-replication, Cloud SQL cross-region replicas, Alibaba RDS cross-region replication), object storage (S3 Cross-Region Replication, GCS dual-region, Azure RA-GRS), and DNS failover (Route 53 health checks, Azure Traffic Manager, GCP Cloud DNS health checks).",
              check:
                "DR/BCP plan with RTO/RPO targets per service, cross-region replication configured, backup schedules documented, and failover procedures for each cloud provider",
            },
            {
              title:
                "Document capacity planning and auto-scaling controls",
              control: "TSC Availability \u2014 Capacity Planning",
              how: "Document capacity planning processes: baseline performance metrics, growth projections, and scaling triggers. Implement auto-scaling for compute: AWS Auto Scaling Groups, Azure Virtual Machine Scale Sets, GCP Managed Instance Groups, Alibaba Elastic Scaling. Configure scaling policies based on: CPU utilization (target 60\u201370%), memory usage, request count per target, custom CloudWatch/Azure Monitor/GCP Cloud Monitoring metrics. Document database capacity management (read replicas, connection pooling, query optimization). Define capacity review cadence (monthly) and escalation procedures when approaching capacity limits.",
              check:
                "Capacity planning document with baseline metrics, growth projections, auto-scaling configurations for compute and database, and monthly review cadence established",
            },
            {
              title:
                "Implement health check and failover configurations",
              control:
                "TSC Availability \u2014 Health Checks and Failover",
              how: "Configure health checks for every production service: ALB/NLB target group health checks (AWS), Azure Load Balancer health probes, GCP health checks for instance groups, Alibaba SLB health checks. Define health check parameters: interval, timeout, healthy/unhealthy threshold, and success criteria (HTTP 200 on /healthz endpoint). Implement automated failover: ALB multi-AZ routing, Azure Availability Zones, GCP failover groups, Alibaba multi-zone deployment. Document the failover testing procedure and results from the most recent test.",
              check:
                "Health check configurations for all production services with parameters defined, automated failover verified, and most recent failover test results documented",
            },
            {
              title:
                "Establish incident response for availability events",
              control:
                "TSC Availability \u2014 Availability Incident Response",
              how: "Define availability-specific incident response procedures distinct from security incidents. Include: severity classification based on user impact (degraded service vs. full outage), communication templates for status page updates, customer notification procedures, war room protocols for major incidents, and post-incident review (blameless postmortem) requirements. Document the on-call rotation and escalation path for availability events. Integrate with status page tools (Statuspage.io, Atlassian Statuspage, Cachet) for real-time customer communication.",
              check:
                "Availability incident response runbook with severity levels, communication templates, war room protocols, post-incident review process, and status page integration documented",
            },
          ],
        },
      ],
    },
    {
      week: 2,
      title: "L2 Implementer \u2014 Technical Controls per TSC",
      description:
        "Implement cloud-native technical controls for each Trust Services Criteria, build RBAC/SSO/MFA systems, configure WAF/IDS/SIEM, deploy encryption infrastructure, and automate compliance evidence collection.",
      days: [
        {
          day: 8,
          title: "Security \u2014 RBAC, SSO/MFA & Identity Controls",
          tasks: [
            {
              title:
                "Implement RBAC across all cloud providers and SaaS tools",
              control:
                "TSC Security \u2014 CC6.1\u2013CC6.3 Logical Access Controls",
              how: "Deploy role-based access control across all environments. For AWS: create IAM roles with least-privilege policies, use AWS SSO (IAM Identity Center) for cross-account access, implement permission boundaries for developer roles. For Azure: configure Entra ID (Azure AD) conditional access policies, implement Privileged Identity Management (PIM) for just-in-time admin access, define RBAC roles in Azure Portal with custom role definitions. For GCP: use IAM bindings with predefined and custom roles, implement Organization Policy constraints. For Alibaba: configure RAM roles with policy-based access, implement RAM role chaining for cross-account access. Document the role inventory, permission grants, and approval process for role assignment.",
              check:
                "RBAC implementation across all cloud providers with least-privilege roles defined, approval workflows for role assignment, and quarterly access review process documented",
            },
            {
              title:
                "Deploy SSO and MFA for all personnel accessing in-scope systems",
              control:
                "TSC Security \u2014 CC6.1 Authentication Controls",
              how: "Implement enterprise SSO using SAML 2.0 or OIDC for all in-scope applications. Configure the identity provider (AWS IAM Identity Center, Entra ID, Okta, Google Workspace) with: MFA enforcement (TOTP, FIDO2/WebAuthn, hardware tokens), session timeout policies (30 minutes idle, 12 hours absolute), password complexity requirements (16+ characters, breached password detection), and account lockout policies (5 failed attempts = 15-minute lockout). Integrate SSO with all cloud consoles, CI/CD platforms, databases, and SaaS tools. Verify SSO propagation eliminates local account proliferation.",
              check:
                "SSO integrated with all in-scope systems, MFA enforced for all users, session policies configured, password policies set, and local accounts eliminated or documented as exceptions",
            },
            {
              title:
                "Configure WAF rules and IDS/IPS for perimeter defense",
              control:
                "TSC Security \u2014 CC6.6 System Boundaries Protection",
              how: "Deploy and configure web application firewalls (WAF) for all public-facing endpoints. For AWS: configure AWS WAF with OWASP Top 10 managed rule groups, rate limiting (2000 requests/5 minutes per IP), geo-blocking rules, and custom rules for application-specific patterns. For Azure: configure Azure Front Door WAF with Microsoft Default Rule Set and custom rule collections. For GCP: deploy Cloud Armor with pre-configured WAF rules and adaptive protection. For Alibaba: configure Anti-DDoS Pro and Web Application Firewall. Implement IDS/IPS using AWS Network Firewall, Azure Firewall Premium (IDPS), GCP Cloud IDS, or Alibaba Cloud Firewall with IPS enabled.",
              check:
                "WAF rules deployed for all public endpoints with OWASP rule groups, rate limiting, geo-blocking, and IDS/IPS configured with signature updates enabled",
            },
            {
              title:
                "Deploy SIEM with comprehensive log ingestion and correlation",
              control:
                "TSC Security \u2014 CC7.1\u2013CC7.2 Monitoring and Detection",
              how: "Configure SIEM infrastructure for centralized security monitoring. For AWS: deploy Amazon Security Lake (OCSF format) or integrate CloudTrail, VPC Flow Logs, GuardDuty, Config, and WAF logs into a SIEM (Splunk, Elastic SIEM, or Azure Sentinel). For Azure: configure Microsoft Sentinel with data connectors for Defender for Cloud, Entra ID sign-in logs, Azure Activity Logs, and NSG flow logs. For GCP: ingest Cloud Audit Logs, VPC Flow Logs, Cloud Armor logs into Chronicle SIEM. For Alibaba: stream ActionTrail, Security Center, and Cloud Firewall logs. Build correlation rules for: brute force attacks, privilege escalation, data exfiltration attempts, and unauthorized access patterns.",
              check:
                "SIEM configured with all cloud provider logs ingested, correlation rules deployed for top 10 attack patterns, and alert routing to on-call team confirmed",
            },
            {
              title:
                "Implement endpoint detection and response (EDR) across all systems",
              control: "TSC Security \u2014 Endpoint Protection Controls",
              how: "Deploy endpoint detection and response on all compute resources. For EC2 instances: install Amazon Inspector agent or CrowdStrike Falcon. For Azure VMs: enable Microsoft Defender for Endpoint. For GCP instances: deploy Chronicle Endpoint Detection. For Kubernetes: implement Falco for runtime security and kube-bench for CIS benchmark compliance. For developer workstations: deploy EDR with MDM (Jamf, Microsoft Intune, or Google Endpoint Management). Configure: real-time threat detection, automated containment (isolate compromised hosts), vulnerability scanning, and compliance posture reporting.",
              check:
                "EDR deployed on all compute resources, runtime security for containers, MDM for workstations, and automated containment procedures documented and tested",
            },
          ],
        },
        {
          day: 12,
          title: "Confidentiality \u2014 KMS, Secret Scanning & DLP",
          tasks: [
            {
              title:
                "Configure AWS KMS, Azure Key Vault, GCP Cloud KMS, and Alibaba KMS with rotation",
              control:
                "TSC Confidentiality \u2014 Key Management Infrastructure",
              how: "Set up customer-managed keys across all cloud providers with automatic rotation. For AWS KMS: create CMKs for each service category, enable automatic annual rotation, configure key policies restricting usage to specific IAM roles and services, enable key deletion protection (7\u201330 day waiting period). For Azure Key Vault: create key vaults per environment (dev/staging/prod), enable soft delete and purge protection, configure key rotation policies (annual), restrict access via RBAC or access policies. For GCP Cloud KMS: create key rings per region, configure automatic key rotation (365 days), set IAM bindings restricting key usage, set 24-hour key destruction waiting period. For Alibaba KMS: create customer master keys per service, enable automatic rotation, configure key version management. Document the key inventory, alias naming convention, and cross-cloud key management strategy.",
              check:
                "KMS keys created across all four cloud providers with automatic rotation enabled, access policies restricting usage, deletion protection configured, and key inventory documented",
            },
            {
              title:
                "Implement secret scanning in code repositories and CI/CD pipelines",
              control:
                "TSC Confidentiality \u2014 Secret Detection Controls",
              how: "Deploy automated secret scanning across all code repositories and CI/CD pipelines. For GitHub: enable GitHub Advanced Security secret scanning with push protection, configure custom patterns for internal secrets (API keys, database connection strings). For GitLab: enable Secret Detection in SAST templates. For Bitbucket: deploy git-secrets or detect-secrets as pre-commit hooks. Integrate scanning into CI/CD: run TruffleHog, Gitleaks, or GitLeaks in pipeline stages to block commits containing secrets. Configure alerting for detected secrets and document the secret rotation procedure when a leak is detected. Store all runtime secrets in cloud secret managers (AWS Secrets Manager, Azure Key Vault secrets, GCP Secret Manager, Alibaba KMS secrets).",
              check:
                "Secret scanning enabled in all repositories with push protection, CI/CD pipeline integration, runtime secrets stored in cloud secret managers, and secret rotation procedure documented",
            },
            {
              title:
                "Deploy Data Loss Prevention (DLP) policies across data stores",
              control:
                "TSC Confidentiality \u2014 Data Loss Prevention Controls",
              how: "Implement DLP policies to detect and prevent unauthorized data exposure. For AWS: enable Amazon Macie for S3 buckets to discover and classify sensitive data (PII, financial data), configure Macie automated remediation for public buckets. For Azure: configure Microsoft Purview DLP policies for Exchange, SharePoint, OneDrive, and Teams, define sensitive information types (credit card numbers, SSNs, health records). For GCP: deploy Cloud DLP API for real-time content inspection of BigQuery data, Cloud Storage objects, and Dataflow pipelines. For Alibaba: configure Data Security center for data classification and auditing. Define DLP policies: block external sharing of classified data, alert on bulk data exports, quarantine sensitive files in shared locations.",
              check:
                "DLP policies deployed across all cloud storage and SaaS platforms with sensitive data detection, automated remediation for public exposures, and policy violation alerting confirmed",
            },
            {
              title:
                "Implement network-level confidentiality controls and private connectivity",
              control:
                "TSC Confidentiality \u2014 Network Encryption Controls",
              how: "Configure network-level confidentiality beyond TLS. For AWS: deploy VPC PrivateLink for service-to-service communication, configure S3 gateway endpoints, use AWS PrivateLink for AWS service access, enable VPC Flow Logs for network monitoring. For Azure: configure Private Link for PaaS services, deploy VNet service endpoints, use Azure ExpressRoute for private connectivity to on-premises. For GCP: configure Private Google Access, deploy VPC Service Controls to create security perimeters around sensitive data, use Cloud Interconnect for hybrid connectivity. For Alibaba: configure PrivateLink and VPC connections. Document the network encryption architecture ensuring all data paths are encrypted at the network level.",
              check:
                "Private connectivity configured across all cloud providers, VPC/VNet flow logs enabled, and network encryption architecture documented with all data paths encrypted",
            },
            {
              title:
                "Establish confidential data handling procedures for development and staging",
              control:
                "TSC Confidentiality \u2014 Non-Production Environment Controls",
              how: "Define and implement confidential data handling for non-production environments. Create policies: no production PII in development/staging without masking, synthetic data generation for testing (using tools like Synthea for health data, Faker libraries for PII), data subsetting for realistic test datasets. Implement data masking: AWS Database Migration Service data transformation, Azure Data Factory masking, GCP Cloud Data Loss Prevention de-identification. Configure environment isolation: separate AWS accounts/VPCs per environment, separate Azure subscriptions, separate GCP projects, separate Alibaba resource groups. Document the data promotion process between environments.",
              check:
                "Non-production data handling policy with masking requirements, synthetic data tools deployed, environment isolation verified across all cloud providers, and data promotion process documented",
            },
          ],
        },
        {
          day: 18,
          title: "Privacy \u2014 Consent Management & Data Discovery",
          tasks: [
            {
              title:
                "Deploy consent management platform with purpose-level granularity",
              control:
                "TSC Privacy \u2014 P1\u2013P2 Consent Infrastructure",
              how: "Implement a consent management platform (CMP) that captures, stores, and enforces user consent preferences. Options: OneTrust, TrustArc, Cookiebot, or custom-built using AWS DynamoDB + API Gateway. Configure: purpose-level consent categories (essential, analytics, marketing, personalization), consent versioning (track consent history), granular opt-in/opt-out per purpose, consent synchronization across properties (web, mobile, API), and integration with marketing/analytics tools to enforce consent state. Document the consent record schema (user_id, purpose, consent_state, timestamp, version, source) and storage location. Implement consent withdrawal that propagates within 24 hours to all downstream systems.",
              check:
                "CMP deployed with purpose-level consent categories, versioning, cross-property synchronization, withdrawal propagation within 24 hours, and consent record schema documented",
            },
            {
              title:
                "Implement automated data discovery and classification for privacy",
              control:
                "TSC Privacy \u2014 Data Discovery and Classification",
              how: "Deploy automated data discovery to locate and classify personal data across all systems. For AWS: configure Amazon Macie with custom data identifiers for organization-specific PII patterns, enable Macie for all S3 buckets, schedule recurring discovery jobs. For Azure: deploy Microsoft Purview scanning across all data sources (SQL databases, file shares, SharePoint, data lakes), configure classification rules for PII, PHI, financial data. For GCP: use Cloud DLP inspection jobs on BigQuery datasets, Cloud Storage objects, and Datastore. For Alibaba: configure Data Security Center for data discovery. Build a data catalog mapping personal data to systems, owners, retention periods, and legal basis for processing.",
              check:
                "Automated data discovery configured across all cloud providers, data catalog populated with personal data locations, owners, retention periods, and legal basis for each data store",
            },
            {
              title:
                "Implement automated retention policy enforcement",
              control: "TSC Privacy \u2014 P4 Retention Enforcement",
              how: "Configure automated data retention enforcement for every data store containing personal data. For S3: create lifecycle rules transitioning objects to Glacier after retention period, then deleting. For Azure Blob Storage: configure lifecycle management policies with deletion after retention period. For GCP Cloud Storage: set object lifecycle rules with age-based deletion. For databases: implement scheduled jobs that purge records exceeding retention (AWS Lambda + RDS, Azure Logic Apps + SQL, GCP Cloud Functions + Cloud SQL). For logs: configure CloudWatch log group retention, Azure Log Analytics retention policies, GCP Cloud Logging bucket lifecycle rules. Document the retention schedule per data category and verify automated enforcement with monthly compliance scans.",
              check:
                "Automated retention enforcement configured for all storage types, retention schedule documented per data category, and monthly compliance scan procedure established",
            },
            {
              title:
                "Build privacy impact assessment (PIA) workflow for new projects",
              control:
                "TSC Privacy \u2014 Privacy by Design Controls",
              how: "Establish a Privacy Impact Assessment (PIA) workflow triggered before launching new products, features, or data processing activities. Define the PIA template covering: data types collected, purposes, legal basis, third-party sharing, cross-border transfers, retention period, security measures, and risk assessment. Implement the workflow: PIA submission form, privacy team review (5-day SLA), risk identification, mitigation requirements, sign-off process. Integrate PIA triggers into the SDLC: require PIA completion before production deployment of features touching personal data. Document the PIA register tracking all completed assessments.",
              check:
                "PIA workflow established with template, review SLA, SDLC integration, and PIA register tracking all completed assessments with status and risk mitigation actions",
            },
            {
              title:
                "Configure cross-border data transfer controls and documentation",
              control:
                "TSC Privacy \u2014 Cross-Border Transfer Controls",
              how: "Document and implement controls for cross-border personal data transfers. For EU-to-US transfers: implement Standard Contractual Clauses (SCCs), document Transfer Impact Assessments (TIAs), configure data residency controls (AWS region restrictions, Azure data residency, GCP organization policy constraints on resource locations). For other jurisdictions: document adequacy decisions, binding corporate rules, or other legal transfer mechanisms. Implement technical controls: AWS Organizations SCPs restricting region usage, Azure Policy requiring resource compliance with data residency, GCP Organization Policy constraints on resource locations, Alibaba resource group region restrictions.",
              check:
                "Cross-border transfer documentation with SCCs in place, TIAs completed, technical controls enforcing data residency, and transfer register maintained for all jurisdictions",
            },
          ],
        },
        {
          day: 25,
          title: "Integrity \u2014 Checksums, Audit Trails & Validation Pipelines",
          tasks: [
            {
              title:
                "Implement checksums and hash validation for data transfers",
              control:
                "TSC Processing Integrity \u2014 PI3 Data Integrity Controls",
              how: "Implement checksum validation for all critical data transfers. For file transfers: generate SHA-256 checksums before upload, verify on receipt (AWS S3 multipart upload checksums, Azure Blob Storage content MD5, GCP object generation checksums). For database replication: enable binary log checksums (MySQL), WAL checksums (PostgreSQL), and compare checksums between primary and replica. For message queues: enable message-level integrity checking (SQS message checksums, Azure Service Bus message integrity). For ETL pipelines: implement row count validation, checksum validation on source-to-target transfers, and record-level hash comparison. Document the checksum algorithms used and verification procedures.",
              check:
                "Checksum validation implemented for all data transfers with algorithms documented, verification procedures tested, and mismatch alerting configured",
            },
            {
              title:
                "Build comprehensive audit trail logging for all data operations",
              control:
                "TSC Processing Integrity \u2014 Audit Trail Controls",
              how: "Implement audit trail logging for all data operations. For databases: enable query-level audit logging (RDS Audit Logs, Azure SQL Auditing, Cloud SQL audit logging), log all DDL and DML operations, configure log retention (minimum 12 months). For object storage: enable access logging (S3 access logs, Azure Storage analytics logging, GCS access logs), configure CloudTrail/Data Events for S3 object-level operations. For applications: implement structured audit logging with correlation IDs, log data access events (read/write/delete), log metadata changes, and log user authentication events. Centralize audit logs in immutable storage (S3 with Object Lock, Azure Immutable Blob Storage, GCP retention policies).",
              check:
                "Audit trail logging enabled for all data operations with minimum 12-month retention, immutable log storage configured, and structured logging with correlation IDs implemented",
            },
            {
              title:
                "Implement ETL error handling and data validation pipelines",
              control:
                "TSC Processing Integrity \u2014 PI2 and PI5 Error Handling",
              how: "Build data validation pipelines for all ETL/ELT processes. For ingestion: validate schema compatibility, check for null/missing values in required fields, validate data types and ranges, reject invalid records to a dead-letter queue. For transformation: validate output schema, check referential integrity, verify row counts match between source and transformed data. For loading: validate target schema compatibility, check for duplicate key violations, verify record counts after load. Implement error handling: dead-letter queues (SQS DLQ, Azure Service Bus DLQ, GCP Pub/Sub dead-letter topics), error rate monitoring (CloudWatch metrics, Azure Monitor metrics), alerting on error rate thresholds (>1% = warning, >5% = critical).",
              check:
                "ETL validation pipeline with schema checking, dead-letter queues for invalid records, error rate monitoring dashboards, and alerting thresholds configured for all data pipelines",
            },
            {
              title:
                "Deploy automated reconciliation for critical financial data flows",
              control:
                "TSC Processing Integrity \u2014 Reconciliation Controls",
              how: "Implement automated reconciliation for critical data flows, especially financial transactions. Define reconciliation points: source system to staging, staging to data warehouse, data warehouse to reporting. For each point, implement: record count comparison, sum/hash validation of monetary amounts, timestamp-based gap detection (no missing records in sequence), and duplicate detection. Schedule reconciliation jobs to run after each data load. Configure alerting for mismatches with escalation to data engineering team. Document reconciliation procedures for: payment processing (gateway to internal ledger), billing (usage to invoice), and revenue recognition (booking to recognition).",
              check:
                "Automated reconciliation configured for all critical financial data flows with count, sum, and hash validation, mismatch alerting, and documented procedures per data flow",
            },
            {
              title:
                "Implement data pipeline monitoring and accuracy dashboards",
              control:
                "TSC Processing Integrity \u2014 PI4 Output Accuracy Monitoring",
              how: "Build data pipeline monitoring dashboards tracking processing integrity metrics. Key metrics: input record count vs. output record count, error rate per pipeline, processing latency (time from ingestion to availability), data freshness (time since last successful load), reconciliation success rate. Implement monitoring using CloudWatch dashboards (AWS), Azure Monitor workbooks (Azure), GCP Cloud Monitoring dashboards, or Grafana. Configure alerts for: processing delays exceeding SLA, error rates exceeding thresholds, reconciliation failures, and data staleness beyond acceptable limits. Document the monitoring hierarchy: real-time dashboards, daily summary reports, weekly trend analysis.",
              check:
                "Data pipeline monitoring dashboards with key integrity metrics, alerting configured for threshold breaches, and monitoring hierarchy documented with escalation procedures",
            },
          ],
        },
        {
          day: 30,
          title: "Availability \u2014 Auto-scaling, Health Checks & Failover",
          tasks: [
            {
              title:
                "Configure auto-scaling groups with predictive and reactive policies",
              control:
                "TSC Availability \u2014 A1.1 Auto-scaling Controls",
              how: "Configure auto-scaling for all production compute resources. For AWS: set up Auto Scaling Groups with target tracking (CPU 60%), step scaling for traffic spikes, and predictive scaling based on historical patterns. Configure instance refresh for rolling deployments. For Azure: deploy Virtual Machine Scale Sets with autoscale rules (metric-based: CPU, memory, request count; schedule-based for predictable traffic). For GCP: configure Managed Instance Groups with autoscaler (CPU-based, load balancing capacity, custom metrics). For Alibaba: set up Elastic Scaling with scaling rules based on CloudMonitor metrics. Configure minimum/desired/maximum instance counts per environment. Implement graceful shutdown handling (drain connections before termination).",
              check:
                "Auto-scaling configured for all production compute across all cloud providers with reactive and predictive policies, graceful shutdown handling, and minimum/maximum instance counts documented",
            },
            {
              title:
                "Implement comprehensive health checks with deep verification",
              control:
                "TSC Availability \u2014 Health Check Infrastructure",
              how: "Implement health check systems at multiple levels. For load balancers: configure ALB/Azure LB/GCP LB health checks with application-specific endpoints (/healthz for liveness, /readyz for readiness, /startup for startup probes in Kubernetes). For Kubernetes: define liveness probes (restart if unhealthy), readiness probes (remove from service if not ready), startup probes (slow-starting container protection). For databases: implement connection pool health checks, replication lag monitoring, and failover readiness verification. For external dependencies: implement circuit breakers (Hystrix, Resilience4j, or AWS App Mesh) with fallback behaviors. Configure health check logging for debugging failed health checks.",
              check:
                "Health checks implemented at load balancer, application, database, and dependency levels with liveness/readiness/startup probes and circuit breakers documented",
            },
            {
              title:
                "Deploy multi-AZ and multi-region failover configurations",
              control:
                "TSC Availability \u2014 Failover Infrastructure",
              how: "Configure failover across availability zones and regions. For AWS: deploy across 3 AZs, configure RDS Multi-AZ failover, use Route 53 health checks with failover routing, implement S3 cross-region replication with versioning. For Azure: deploy across 3 Availability Zones, configure Azure SQL failover groups, use Traffic Manager for DNS-based failover, enable Geo-Redundant Storage (GRS). For GCP: deploy across 3 zones, configure Cloud SQL with regional HA, use Cloud Load Balancing with health-check-based failover, enable dual-region storage buckets. For Alibaba: deploy across multiple zones within a region, configure RDS high-availability edition, use DNS-based failover with Alibaba Cloud DNS. Document RTO/RPO targets per service and verify with DR drills.",
              check:
                "Multi-AZ and multi-region failover configured across all cloud providers with RTO/RPO targets documented and most recent DR drill results recorded",
            },
            {
              title:
                "Implement database high availability and replication",
              control:
                "TSC Availability \u2014 Database Availability Controls",
              how: "Configure database high availability for all production databases. For AWS RDS: enable Multi-AZ deployment (synchronous standby), configure read replicas for read-heavy workloads, enable automated backups with point-in-time recovery. For Azure SQL: configure active geo-replication with up to 4 readable secondary replicas, enable long-term retention policies. For GCP Cloud SQL: configure regional HA with automatic failover, set up cross-region read replicas. For Alibaba RDS: configure high-availability edition with synchronous replication. For Dynamo CosmosDB: enable multi-region writes with conflict resolution. Document connection pooling configurations (PgBouncer, ProxySQL, RDS Proxy), connection retry logic, and failover behavior from the application perspective.",
              check:
                "Database HA configured for all production databases with replication, connection pooling, backup policies, and failover behavior documented from application perspective",
            },
            {
              title:
                "Conduct load testing and performance benchmarking",
              control:
                "TSC Availability \u2014 Performance Testing Controls",
              how: "Establish load testing and performance benchmarking procedures. Define performance baselines: response time targets (p50 < 200ms, p95 < 500ms, p99 < 1s), throughput targets (requests per second), error rate targets (< 0.1%), and resource utilization targets (CPU < 70%, memory < 80%). Implement load testing tools: k6, Locust, Apache JMeter, or cloud-native tools (AWS Distributed Load Testing, Azure Load Testing, GCP Cloud Load Testing Service). Run load tests before major releases and on a quarterly schedule. Document capacity thresholds and auto-scaling trigger points based on load test results. Establish performance regression detection in CI/CD pipelines.",
              check:
                "Performance baselines documented, load testing tools configured and run quarterly, capacity thresholds validated, and performance regression detection integrated into CI/CD",
            },
          ],
        },
      ],
    },
    {
      week: 3,
      title: "L3 Verifier \u2014 Testing per TSC",
      description:
        "Execute comprehensive control testing across all five Trust Services Criteria, validate evidence completeness, test encryption and key management, verify privacy and integrity controls, and conduct availability drills.",
      days: [
        {
          day: 35,
          title: "Security Testing \u2014 Pen Testing, Vulnerability Scans & Access Reviews",
          tasks: [
            {
              title:
                "Define and execute penetration testing scope and methodology",
              control:
                "TSC Security \u2014 Security Testing Controls",
              how: "Define penetration testing scope covering: external network perimeter, web application layer (OWASP Top 10 + API security testing), cloud infrastructure (AWS/Azure/GCP misconfigurations), internal network (post-perimeter breach scenario), social engineering (phishing simulations). Engage a qualified third-party pen testing firm or use internal red team capabilities. Tools: Burp Suite Pro, Nmap, Metasploit, cloud-specific scanners (ScoutSuite, Prowler, CloudSploit). Document testing methodology (OWASP Testing Guide, PTES, NIST SP 800-115). Track all findings with severity ratings (Critical/High/Medium/Low/Informational) and remediation timelines. Ensure pen tests occur at least annually with ad-hoc tests after significant changes.",
              check:
                "Penetration test scope documented covering external, application, cloud infrastructure, and social engineering; third-party firm engaged or internal red team scheduled; annual cadence established",
            },
            {
              title:
                "Execute automated vulnerability scanning across all environments",
              control:
                "TSC Security \u2014 Vulnerability Management Controls",
              how: "Configure and run automated vulnerability scans on a defined frequency. For infrastructure: deploy Qualys, Tenable, or Rapid7 agents on all servers (weekly scans). For containers: integrate Trivy, Snyk Container, or Prisma Cloud into CI/CD pipelines (every build). For dependencies: run Snyk, Dependabot, or OWASP Dependency-Check for open-source vulnerabilities (daily). For cloud configurations: run Prowler (AWS), ScoutSuite (multi-cloud), or Cloud Security Posture Management tools continuously. Define SLAs for remediation: Critical = 24 hours, High = 7 days, Medium = 30 days, Low = 90 days. Document scan results, exception process, and risk acceptance for vulnerabilities that cannot be remediated within SLA.",
              check:
                "Vulnerability scanning configured across infrastructure, containers, dependencies, and cloud configurations with defined frequencies, remediation SLAs, and exception process documented",
            },
            {
              title:
                "Conduct quarterly access reviews and certification for all in-scope systems",
              control:
                "TSC Security \u2014 CC6.2\u2013CC6.3 Access Review Controls",
              how: "Execute quarterly access reviews covering all in-scope systems. For each system: export the complete user access list, identify dormant accounts (no login in 90+ days), verify role assignments against job functions, validate privilege levels (admin vs. standard vs. read-only), and confirm segregation of duties compliance. Use identity governance tools: AWS IAM Access Analyzer, Azure AD Access Reviews (Entra ID), GCP IAM Recommender, SailPoint, or Saviynt. Document the review process: who conducts the review, what systems are covered, how exceptions are handled, and the remediation process for access that violates least privilege. Verify that terminated employee access was revoked within 24 hours by cross-referencing with HR termination records.",
              check:
                "Quarterly access review executed for all in-scope systems with dormant accounts identified, role assignments verified, least privilege confirmed, and terminated employee access revocation validated",
            },
            {
              title:
                "Test WAF and IDS/IPS rule effectiveness",
              control:
                "TSC Security \u2014 Perimeter Defense Testing Controls",
              how: "Test the effectiveness of WAF rules and IDS/IPS configurations. For WAF testing: execute OWASP ZAP or Burp Suite active scan against protected endpoints, verify that attack payloads are blocked (SQL injection, XSS, CSRF, path traversal), test rate limiting by simulating traffic spikes, verify geo-blocking rules block traffic from restricted regions. For IDS/IPS testing: execute Nmap service scans and verify detection/alerting, run Metasploit modules against test targets and verify detection, test evasion techniques (fragmentation, slow scans) and verify detection capabilities. Document test results, rule tuning performed, and false positive/negative analysis. Review and update WAF/IDS/IPS rules quarterly.",
              check:
                "WAF and IDS/IPS rule effectiveness tested with attack simulation, detection rates documented, rule tuning performed, and quarterly review schedule established",
            },
            {
              title:
                "Validate SIEM correlation rules and detection coverage",
              control:
                "TSC Security \u2014 SIEM Detection Validation",
              how: "Validate SIEM detection capabilities by executing a detection gap analysis. For each MITRE ATT&CK technique relevant to your threat model: verify that log sources generate the required telemetry, confirm that correlation rules exist and fire correctly, and test detection latency (time from event to alert). Execute purple team exercises where the red team performs known attack techniques and the blue team validates detection. Key scenarios to test: brute force authentication, privilege escalation (IAM policy changes), lateral movement (unusual SSH/RDP), data exfiltration (large S3 downloads), and crypto mining. Document coverage gaps and create development tickets for missing detections. Review SIEM rule inventory quarterly and update based on new threat intelligence.",
              check:
                "SIEM detection validation completed with MITRE ATT&CK coverage mapping, purple team exercises executed, detection gaps identified and remediation tracked, and quarterly rule review scheduled",
            },
          ],
        },
        {
          day: 42,
          title: "Confidentiality Testing \u2014 Encryption Audits, Key Rotation & DLP Validation",
          tasks: [
            {
              title:
                "Execute encryption configuration audit across all data stores",
              control:
                "TSC Confidentiality \u2014 Encryption Verification Controls",
              how: "Conduct a comprehensive encryption audit verifying that all data stores meet the documented encryption requirements. For databases: verify encryption is enabled for every RDS instance (describe-db-instances), Azure SQL database (TDE status), Cloud SQL (encryption config), Alibaba RDS. For object storage: verify S3 default encryption (BucketEncryption configuration), Azure Blob encryption settings, GCS encryption status. For block storage: verify EBS encryption by default is enabled at the account level, Azure Disk encryption, GCP PD encryption. For message queues: verify SQS/SNS server-side encryption, Azure Service Bus encryption, GCP Pub/Sub encryption at rest. Document any unencrypted data stores and create remediation plans. Verify TLS enforcement across all endpoints using SSL/TLS scanning tools.",
              check:
                "Encryption audit completed for all data stores with every store verified as encrypted, any exceptions documented with remediation plans, and TLS enforcement confirmed across endpoints",
            },
            {
              title:
                "Verify key rotation has executed on schedule for all KMS keys",
              control:
                "TSC Confidentiality \u2014 Key Rotation Verification",
              how: "Verify that automatic key rotation has executed for all customer-managed keys. For AWS KMS: list all CMKs and verify rotation status (kms:DescribeKey showing next rotation date), confirm annual rotation has occurred, verify old key versions are disabled after rotation. For Azure Key Vault: verify key rotation policies are active, confirm rotation has executed by checking key version history, verify rotation alerts are configured. For GCP Cloud KMS: verify key ring rotation schedule, check key version history for rotation events, confirm destroyed key versions have been scheduled. For Alibaba KMS: verify automatic rotation is enabled, check key version management. Document the key inventory with rotation status for each key and any keys that failed to rotate on schedule.",
              check:
                "Key rotation verification completed for all KMS keys across all cloud providers with rotation status documented, any missed rotations identified, and remediation actions taken",
            },
            {
              title:
                "Test DLP policies by attempting policy violations",
              control:
                "TSC Confidentiality \u2014 DLP Policy Testing",
              how: "Test DLP policies by executing controlled policy violation scenarios. For AWS Macie: upload test files containing synthetic PII (SSNs, credit card numbers) to monitored S3 buckets and verify detection and alerting. For Azure Purview DLP: attempt to share files containing classified data externally via SharePoint/OneDrive and verify policy enforcement. For GCP Cloud DLP: upload test data to BigQuery and Cloud Storage containing sensitive patterns and verify inspection results. Test data masking: verify that DLP correctly masks redacts sensitive data in scan results. Document test results including: detection accuracy (true positive rate), false positive rate, time from upload to alert, and remediation action taken. Update DLP policies based on test results.",
              check:
                "DLP policy testing executed across all cloud providers with synthetic test data, detection accuracy measured, false positive rate documented, and policy updates applied based on results",
            },
            {
              title:
                "Validate data disposal procedures by executing test disposals",
              control:
                "TSC Confidentiality \u2014 Disposal Verification Controls",
              how: "Execute test data disposals and verify the process works as documented. Test each disposal type: for S3, create a test bucket with lifecycle rules and verify deletion after retention period. For databases, execute a test record deletion and verify it is not recoverable from backups within the retention window. For cryptographic erasure, create a test encryption key, encrypt data, destroy the key, and verify data is irrecoverable. For block storage, terminate an EBS volume and verify it is not recoverable. Verify disposal audit trails: confirm S3 Object deletion events appear in CloudTrail, Azure Activity Log records blob deletion, GCP audit log captures object deletion. Document test results and any discrepancies from the documented procedures.",
              check:
                "Test disposals executed for each storage type with verification that data is unrecoverable, audit trail confirmation for disposal events, and discrepancies documented",
            },
            {
              title:
                "Review and test network confidentiality controls",
              control:
                "TSC Confidentiality \u2014 Network Security Testing",
              how: "Test network confidentiality controls to verify data is protected in transit within the network. Verify private connectivity: confirm VPC endpoints are being used for AWS service access (check VPC Flow Logs for direct internet access to AWS services), verify Private Link/Service Endpoints are configured for Azure PaaS services, confirm Private Google Access is enabled for GCP. Test network segmentation: attempt to access data tier from application tier and verify firewall rules block unauthorized cross-tier communication. Verify mTLS: test service-to-service communication and confirm mutual TLS is enforced. Check for data exposure: scan for publicly accessible databases (RDS snapshots, Azure SQL public endpoints, GCP Cloud SQL public IPs) and remediate any findings.",
              check:
                "Network confidentiality tested with private connectivity verified, segmentation tested, mTLS enforced, and public exposure scan completed with no critical findings",
            },
          ],
        },
        {
          day: 48,
          title: "Privacy Testing \u2014 DSAR Response, Consent Audit & Retention Enforcement",
          tasks: [
            {
              title:
                "Execute end-to-end DSAR response testing within SLA",
              control:
                "TSC Privacy \u2014 P5 Data Subject Access Response Testing",
              how: "Execute a complete DSAR response test using a test account. Trigger the DSAR process: submit a request through the intake portal, verify identity verification process works, measure time for data discovery across all systems, validate completeness of data export (database records, log entries, SaaS data, analytics data), verify data is provided in machine-readable format (JSON/CSV), confirm third-party data is properly redacted, and validate the response is sent within 30-day GDPR SLA or 45-day CCPA SLA. Document the total processing time per stage. For deletion requests (Right to Erasure): test that data is deleted from primary systems, backups, and third-party systems within the required timeframe. Document any data that cannot be deleted (legal hold, backup retention) and the justification.",
              check:
                "End-to-end DSAR test completed within SLA with data discovery completeness verified, export format validated, third-party redaction confirmed, and deletion test documented",
            },
            {
              title:
                "Audit consent management records for completeness and accuracy",
              control:
                "TSC Privacy \u2014 P2 Consent Audit Controls",
              how: "Audit the consent management system for completeness and accuracy. Verify: consent records exist for all active users, consent timestamps are accurate and cannot be retroactively modified, consent granularity matches documented purposes, consent withdrawal requests propagate to all downstream systems within 24 hours, and consent records are retained for the documented period. Test consent enforcement: process a user action that requires consent (marketing email, analytics tracking) and verify the system checks consent state before proceeding. For withdrawn consent: verify that marketing tools suppress the user, analytics tools exclude tracking, and third-party sharing ceases. Document audit findings and any gaps in consent capture or enforcement.",
              check:
                "Consent audit completed with record completeness verified, withdrawal propagation tested, consent enforcement validated, and any gaps documented with remediation actions",
            },
            {
              title:
                "Verify automated data retention enforcement is working correctly",
              control:
                "TSC Privacy \u2014 P4 Retention Enforcement Testing",
              how: "Verify that automated retention enforcement is operating correctly. For each data store: create test records with timestamps exceeding the documented retention period, verify that automated cleanup processes delete them within the expected timeframe, confirm deletion appears in audit logs. For S3 lifecycle policies: create test objects and verify transition to Glacier and eventual deletion. For database retention: create test records and verify scheduled purge jobs remove them. For log retention: verify CloudWatch/Azure Log Analytics/GCP Cloud Logging retention policies are enforcing deletion. Verify compliance: run a retention compliance scan across all data stores to identify any data exceeding retention. Document test results and any data found beyond retention that requires manual cleanup.",
              check:
                "Retention enforcement verified across all data stores with test records created and deleted on schedule, compliance scan completed, and any overdue data identified and remediated",
            },
            {
              title:
                "Test data quality controls and correction mechanisms",
              control: "TSC Privacy \u2014 P7 Data Quality Testing",
              how: "Test data quality controls by introducing controlled data quality issues and verifying detection. Insert test records with: missing required fields (completeness check), invalid data formats (accuracy check), duplicate records (consistency check), and outdated timestamps (timeliness check). Verify that validation rules at data entry points reject invalid data. Verify that data profiling jobs detect anomalies. Test the correction mechanism: submit a correction request as a data subject and verify the update propagates to all systems storing that data. Verify that data quality dashboards reflect the quality metrics accurately. Document the data quality framework effectiveness based on test results.",
              check:
                "Data quality controls tested with controlled data issues introduced and detected, validation rules confirmed effective, correction mechanism tested, and quality dashboards validated",
            },
            {
              title:
                "Conduct privacy monitoring alert testing",
              control:
                "TSC Privacy \u2014 P8 Privacy Monitoring Testing",
              how: "Test privacy monitoring controls by executing simulated privacy events. Test PII detection: upload test files containing synthetic PII to monitored storage locations and verify Macie/Purview/GCP DLP generates alerts. Test consent compliance: process data for a user who has withdrawn consent and verify alerting. Test retention compliance: create data exceeding retention period and verify alerting. Test access monitoring: access personal data from an unusual location or at an unusual time and verify the anomaly is flagged. Test regulatory notification: simulate a data breach scenario and verify the 72-hour notification process can be executed (GDPR Art. 33/34). Document the alerting test results and any monitoring gaps identified.",
              check:
                "Privacy monitoring tested with simulated events for PII detection, consent compliance, retention, access anomalies, and breach notification with all alerts verified and gaps remediated",
            },
          ],
        },
        {
          day: 53,
          title: "Integrity Testing \u2014 Data Accuracy, Reconciliation & Error Log Review",
          tasks: [
            {
              title:
                "Execute data accuracy testing across processing pipelines",
              control:
                "TSC Processing Integrity \u2014 PI3 Accuracy Testing",
              how: "Test data accuracy by introducing known test data and verifying it flows through processing pipelines correctly. For each critical data pipeline: inject test records with known expected outputs, verify the processing logic produces correct results, validate checksums match between input and output, and verify no data transformation errors occur. For financial processing: create test transactions with known amounts and verify the processed output matches exactly (to the cent). For data imports: verify that imported data matches source data after transformation. Document accuracy test results per pipeline, noting any discrepancies found and their root causes. Calculate accuracy rates and compare against processing integrity objectives.",
              check:
                "Data accuracy tests executed for all critical pipelines with known test data, accuracy rates calculated, discrepancies documented with root causes, and accuracy objectives validated",
            },
            {
              title:
                "Verify automated reconciliation processes produce correct results",
              control:
                "TSC Processing Integrity \u2014 Reconciliation Verification",
              how: "Verify that automated reconciliation processes are operating correctly and producing accurate results. For each reconciliation job: examine the reconciliation logic, verify it compares the correct fields and counts, review historical reconciliation results (all should show zero mismatches or documented exceptions), and test with deliberately mismatched data to confirm the reconciliation detects it. For financial reconciliation: verify that sum totals match between source and target, verify that record counts match, and verify that no records are missing (sequence gap detection). Document reconciliation coverage: which data flows have reconciliation, reconciliation frequency, alert recipients, and exception handling procedures.",
              check:
                "Reconciliation processes verified with logic review, historical results examined, deliberate mismatch testing completed, and reconciliation coverage documented across all critical data flows",
            },
            {
              title:
                "Review error logs and verify error handling procedures work",
              control:
                "TSC Processing Integrity \u2014 PI5 Error Handling Review",
              how: "Review error logs from the audit period and verify that error handling procedures were followed correctly. For each error category: review sample error logs, verify that errors were categorized correctly, verify that escalation procedures were followed for critical errors, and verify that dead-letter queues were processed (not left indefinitely). Test error handling by injecting controlled failures: cause a database connection timeout and verify retry logic, trigger a circuit breaker and verify fallback behavior, cause a message queue overflow and verify dead-letter queue capture. Verify error rate monitoring: confirm that alerts fire when error rates exceed documented thresholds. Document the review findings and any error handling gaps identified.",
              check:
                "Error logs reviewed with procedures verified, controlled failure tests executed, error rate monitoring confirmed, and error handling gaps documented with remediation",
            },
            {
              title:
                "Validate input validation controls block invalid data",
              control:
                "TSC Processing Integrity \u2014 PI2 Input Validation Testing",
              how: "Test input validation controls by submitting deliberately invalid data to every API endpoint and data ingestion pipeline. Test cases: missing required fields, invalid data types (string where integer expected), values exceeding maximum length, values outside acceptable ranges, special characters and injection attempts (SQL injection, XSS), oversized payloads, and malformed JSON/XML. For each test case: verify the invalid input is rejected with an appropriate error response, verify the rejection is logged, verify valid input continues to be accepted, and verify error responses do not leak sensitive information (stack traces, internal paths). Document test results per endpoint/pipeline and any validation gaps.",
              check:
                "Input validation tested across all endpoints and pipelines with invalid data rejected, errors logged, valid input unaffected, and no information leakage in error responses",
            },
            {
              title:
                "Execute processing completeness checks across all data flows",
              control:
                "TSC Processing Integrity \u2014 Completeness Verification",
              how: "Verify processing completeness by confirming all authorized transactions are processed fully. For batch processing: compare source record counts to processed record counts, verify no records are dropped silently, and verify processing logs show 100% completion for successful runs. For streaming processing: verify no message loss (compare producer count to consumer count), verify consumer lag is within acceptable bounds, and verify failed messages are captured in dead-letter queues (not lost). For end-to-end flows: trace sample transactions from input to final output and verify the complete journey without data loss. Document completeness metrics per pipeline and any gaps found where records were lost without detection.",
              check:
                "Processing completeness verified for all pipelines with record count matching, message loss testing, end-to-end tracing completed, and completeness metrics documented",
            },
          ],
        },
        {
          day: 58,
          title: "Availability Testing \u2014 DR Drills, Failover Testing & Performance Benchmarking",
          tasks: [
            {
              title:
                "Execute a full disaster recovery drill across critical systems",
              control:
                "TSC Availability \u2014 A1.2 DR Drill Execution",
              how: "Execute a disaster recovery drill simulating a full region failure for critical systems. Pre-drill: confirm backup recency (last backup within RPO), verify replication status (no lag), and notify stakeholders. During drill: fail over databases to DR region (trigger RDS Multi-AZ failover, Azure SQL failover, Cloud SQL failover), redirect traffic via DNS failover (Route 53, Traffic Manager, Cloud DNS), verify application functionality in DR region, measure actual RTO vs. target RTO, and verify data integrity post-failover. Post-drill: fail back to primary region, verify no data loss (compare RPO), document the drill results, and identify improvement areas. Execute DR drills at least annually, preferably semi-annually for critical systems.",
              check:
                "Full DR drill executed with RTO/RPO measurements documented, data integrity verified post-failover, improvement areas identified, and annual/semi-annual drill cadence established",
            },
            {
              title:
                "Test failover mechanisms for high-availability configurations",
              control:
                "TSC Availability \u2014 Failover Testing Controls",
              how: "Test failover mechanisms for each high-availability configuration. For load balancers: terminate a backend instance and verify traffic is rerouted without user-visible errors. For databases: simulate primary database failure and verify automatic failover occurs within the documented RTO. For caches: fail a Redis/ElastiCache primary and verify failover to replica. For message queues: fail a SQS/SNS/SNS endpoint and verify message delivery is not impacted. For Kubernetes: kill a pod and verify orchestration replaces it, cordon a node and verify workloads migrate. Measure failover time for each component and compare against documented RTO targets. Document any failover gaps where automatic failover did not work as expected.",
              check:
                "Failover testing completed for all HA configurations with failover times measured, no user-visible impact confirmed, and any failover gaps documented with remediation",
            },
            {
              title:
                "Execute performance benchmarking and identify bottlenecks",
              control:
                "TSC Availability \u2014 Performance Benchmarking",
              how: "Execute performance benchmarks to verify systems meet availability targets. For web applications: run load tests (k6, JMeter) at expected peak traffic and measure response times (p50, p95, p99), throughput (requests/second), and error rates. For databases: execute benchmark queries at expected peak load and measure query latency, connection pool utilization, and replication lag. For APIs: test throughput of critical API endpoints under load. Compare results against documented performance baselines and identify any degradation since the last benchmark. Identify bottlenecks: CPU saturation, memory pressure, disk I/O limits, network bandwidth constraints, or database connection limits. Document benchmark results and optimization recommendations.",
              check:
                "Performance benchmarks executed for all critical systems with results compared to baselines, bottlenecks identified, optimization recommendations documented, and improvement actions tracked",
            },
            {
              title:
                "Test backup restoration and verify data recoverability",
              control:
                "TSC Availability \u2014 Backup Recovery Testing",
              how: "Test backup restoration procedures for all critical data stores. For databases: restore a test database from automated backups to a separate environment, verify data integrity post-restoration, and measure the actual restoration time vs. RTO target. For object storage: restore deleted objects from S3 versioning or Azure blob soft delete, verify restored object integrity. For configuration backups: verify Terraform state, CloudFormation templates, and Kubernetes manifests can be used to recreate infrastructure. For application backups: verify application-level backups (database dumps, file snapshots) can be restored successfully. Document restoration test results, actual restoration times, and any issues encountered during restoration.",
              check:
                "Backup restoration tested for all critical data stores with data integrity verified, restoration times measured vs. RTO, and any restoration issues documented with remediation",
            },
            {
              title:
                "Review capacity utilization and plan for growth",
              control:
                "TSC Availability \u2014 Capacity Planning Review",
              how: "Review current capacity utilization across all production systems and plan for projected growth. Analyze: compute utilization trends (CPU, memory over 30/60/90 days), database capacity (storage, connections, query performance), network bandwidth utilization, and storage consumption. Project capacity needs based on: business growth projections, seasonal traffic patterns, and planned feature launches. Identify systems approaching capacity limits (defined as >70% sustained utilization) and create scaling plans. Verify auto-scaling configurations are adequate for projected peak loads. Document capacity review findings, scaling recommendations, and budget requirements for capacity expansion. Schedule the next capacity review.",
              check:
                "Capacity review completed with utilization trends analyzed, growth projections documented, systems approaching limits identified with scaling plans, and budget requirements estimated",
            },
          ],
        },
      ],
    },
    {
      week: 4,
      title: "L4 Certified \u2014 Multi-Cloud & Environments",
      description:
        "Master SOC 2 controls across AWS, Azure, GCP, and Alibaba Cloud, implement dev/staging/prod segregation, address common audit findings, and establish continuous compliance for multi-cloud environments.",
      days: [
        {
          day: 65,
          title: "Dev/Staging/Prod Environment Segregation Controls",
          tasks: [
            {
              title:
                "Implement environment isolation across all cloud providers",
              control:
                "SOC 2 \u2014 Environment Segregation Controls",
              how: "Implement strict environment isolation to prevent cross-environment contamination. For AWS: use separate AWS accounts per environment within an AWS Organizations structure, apply Service Control Policies (SCPs) to prevent cross-account resource access, use separate VPCs per environment with no peering between dev and prod. For Azure: use separate subscriptions per environment, apply Management Group hierarchies with Azure Policy enforcing isolation, use separate VNets with no peering between non-prod and prod. For GCP: use separate projects per environment, apply Organization Policy constraints, use separate VPCs with Shared VPC limited to same-tier environments. For Alibaba: use separate resource groups and regions per environment, apply RAM policies preventing cross-environment access. Document the environment architecture and isolation controls.",
              check:
                "Environment isolation implemented across all cloud providers with separate accounts/subscriptions/projects, cross-environment access blocked, and architecture documented",
            },
            {
              title:
                "Enforce different control configurations per environment tier",
              control:
                "SOC 2 \u2014 Tiered Control Configuration",
              how: "Implement different security control configurations per environment tier while maintaining traceability. For production: enable all security controls (WAF, IDS/IPS, encryption, logging, MFA), enforce change management with approvals, enable immutable audit logging, and require two-person approval for infrastructure changes. For staging: enable security controls for parity with production, allow relaxed access for QA teams with time-bound elevated access, enable logging but with shorter retention. For development: enable baseline security controls (encryption, access control), allow developer-level flexibility (faster deployment, broader access), enable logging with minimal retention. Use Infrastructure-as-Code (Terraform workspaces, CloudFormation stacks, GCP deployment manager) to manage environment-specific configurations from a single codebase with per-environment variable files.",
              check:
                "Tiered control configurations documented for dev/staging/prod with security controls mapped per tier, IaC configurations per environment documented, and exception process defined",
            },
            {
              title:
                "Implement data segregation and masking for non-production environments",
              control:
                "SOC 2 \u2014 Non-Production Data Controls",
              how: "Implement strict data segregation for non-production environments. For staging: create synthetic data sets that replicate production data patterns without containing real PII (use Faker, Synthea, or AWS Glue data masking). For development: use entirely synthetic data with no connection to production data sources. Implement data promotion controls: automate the process of masking/subsetting production data for staging with approval gates. For databases: configure read-only replicas from production for staging with column-level masking (Dynamic Data Masking in Azure SQL, data masking in RDS). Verify no real production PII exists in development environments through Macie/Purview scans. Document the data promotion process, masking procedures, and approval requirements.",
              check:
                "Non-production environments use synthetic or masked data only, data promotion process documented with approval gates, PII scans confirm no production data in dev, and staging data masking procedures verified",
            },
            {
              title:
                "Document CI/CD pipeline controls with environment-appropriate gates",
              control:
                "SOC 2 \u2014 CI/CD Environment Controls",
              how: "Document CI/CD pipeline controls that enforce environment-appropriate deployment gates. For development: automated unit tests, peer code review required, automated SAST scan, deployment on merge to develop branch. For staging: automated integration tests, automated DAST scan, security review for high-risk changes, manual QA sign-off, deployment after staging branch approval. For production: all pre-production gates passed, change management ticket required, automated canary/blue-green deployment, automated smoke tests post-deploy, rollback capability within 15 minutes, and deployment freeze during audit fieldwork. Implement pipeline controls using GitHub Actions, GitLab CI/CD, Jenkins, or Azure DevOps with environment-specific stages and approval gates. Document the pipeline architecture and approval workflows.",
              check:
                "CI/CD pipeline documented with environment-specific gates, approval workflows per tier, security scanning at each stage, and rollback procedures defined for production deployments",
            },
            {
              title:
                "Implement shared service controls and their governance",
              control:
                "SOC 2 \u2014 Shared Services Governance",
              how: "Document governance for shared services that span multiple environments. For identity (SSO/MFA): centralize identity in one IdP (Entra ID, Okta) with environment-specific access groups. For logging (SIEM): centralize logs from all environments into a single SIEM with environment tags for filtering. For secrets management: use separate vault instances or namespaces per environment (AWS Secrets Manager per account, Azure Key Vault per subscription, separate GCP Secret Manager). For networking: centralize DNS management, document shared DNS zones, and implement environment-specific routing. Document the shared service inventory, governance model, and access controls for each shared service. Define the process for requesting access to shared services for new environments.",
              check:
                "Shared services inventory documented with governance model, environment-specific access controls, centralized logging confirmed, and shared service access request process defined",
            },
          ],
        },
        {
          day: 72,
          title: "AWS Controls \u2014 CloudTrail, GuardDuty, Config, Security Hub, Macie",
          tasks: [
            {
              title:
                "Configure CloudTrail for comprehensive API logging across all regions",
              control:
                "AWS \u2014 CloudTrail Logging Controls",
              how: "Configure AWS CloudTrail for comprehensive API activity logging. Enable organization-wide trails covering all regions. Configure: management events (read/write) for all IAM, STS, EC2, S3, RDS, Lambda API calls; S3 data events for all buckets containing sensitive data; Lambda function invocation events. Deliver logs to a centralized, immutable S3 bucket in a dedicated security account with Object Lock (compliance mode). Enable CloudTrail log file integrity validation. Configure CloudWatch Logs integration for real-time alerting on suspicious API calls (root user login, MFA disabled, CloudTrail modified, IAM policy changes, security group changes). Document the CloudTrail configuration, log delivery architecture, and retention policy.",
              check:
                "CloudTrail enabled for all regions with management and data events, log integrity validation enabled, logs delivered to immutable centralized bucket, and alerting configured for critical API events",
            },
            {
              title:
                "Deploy and configure GuardDuty for threat detection",
              control:
                "AWS \u2014 GuardDuty Threat Detection Controls",
              how: "Enable Amazon GuardDuty across all accounts and regions in your AWS Organization. Configure: anomaly detection for API calls, VPC Flow Logs analysis, DNS log analysis, EKS audit log monitoring, S3 data event monitoring, and Lambda network event monitoring. Tune GuardDuty by creating custom threat intelligence lists for known-good IPs (internal infrastructure, trusted partners). Configure finding export to SNS topic for integration with SIEM. Create GuardDuty reaction playbooks for each finding type: UnauthorizedAccess, Reconnaissance, CryptoCurrency, Trojan, Backdoor, and PenTest findings. Document the GuardDuty coverage (all accounts/regions), finding response SLAs, and escalation procedures per finding severity.",
              check:
                "GuardDuty enabled across all accounts and regions, custom threat intelligence configured, finding export to SIEM operational, and response playbooks documented for top 10 finding types",
            },
            {
              title:
                "Implement AWS Config Rules for continuous configuration compliance",
              control:
                "AWS \u2014 Config Rules Compliance Controls",
              how: "Deploy AWS Config managed and custom rules across all accounts. Essential managed rules: s3-bucket-ssl-requests-only, rds-storage-encrypted, encrypted-volumes, iam-password-policy, restricted-ssh, vpc-sg-open-only-to-authorized-ports, cloudtrail-enabled, access-keys-rotated. Custom rules using AWS Config Rules Development Kit: verify encryption algorithms meet AES-256, validate security group rules against approved list, check RDS instance configurations against baseline, verify Lambda function configurations. Aggregate Config data across all accounts into a central Security account using Config Conformance Packs. Configure automatic remediation for non-compliant resources using Systems Manager Automation. Document the Config rule inventory, remediation actions, and compliance reporting cadence.",
              check:
                "AWS Config rules deployed across all accounts with managed and custom rules, conformance packs for compliance reporting, automatic remediation configured for top 5 non-compliance patterns",
            },
            {
              title:
                "Configure Security Hub for centralized security posture management",
              control:
                "AWS \u2014 Security Hub Central Controls",
              how: "Enable AWS Security Hub in all accounts and regions with automatic aggregation to a security account. Enable security standards: AWS Foundational Security Best Practices (FSBP), CIS AWS Foundations Benchmark, and NIST SP 800-53. For each standard: review passing vs. failing controls, prioritize remediation of critical and high-severity failures, and track compliance trends over time. Enable Security Hub integrations: GuardDuty findings, Inspector findings, Macie findings, IAM Access Analyzer findings, Firewall Manager findings. Configure custom insights to track compliance by account, resource type, or severity. Document the Security Hub configuration, compliance targets, and reporting process for stakeholders.",
              check:
                "Security Hub enabled across all accounts with FSBP, CIS, and NIST standards, finding integrations configured, compliance dashboards operational, and reporting cadence established",
            },
            {
              title:
                "Deploy Amazon Macie for sensitive data discovery in S3",
              control:
                "AWS \u2014 Macie Data Discovery Controls",
              how: "Enable Amazon Macie for continuous sensitive data discovery in S3. Configure Macie to scan all S3 buckets in the organization (or selectively exclude buckets confirmed to contain no sensitive data). Enable managed data identifiers for common sensitive data types: credit card numbers, AWS access keys, database credentials, email addresses, international phone numbers, and social security numbers. Create custom data identifiers for organization-specific sensitive patterns (internal employee IDs, proprietary account numbers). Configure automated remediation: alert on S3 buckets that become public, alert on buckets with sensitive data and overly permissive bucket policies, and automatically enable Macie for newly created buckets using a Macie auto-enable configuration. Document Macie coverage, custom data identifiers, and alert response procedures.",
              check:
                "Macie enabled across all S3 buckets, managed and custom data identifiers configured, automated remediation for public buckets enabled, and alert response procedures documented",
            },
          ],
        },
        {
          day: 78,
          title: "Azure Controls \u2014 Defender, Sentinel, Policy, Purview & Entra ID",
          tasks: [
            {
              title:
                "Enable Microsoft Defender for Cloud across all Azure subscriptions",
              control:
                "Azure \u2014 Defender for Cloud Security Controls",
              how: "Enable Microsoft Defender for Cloud (formerly Azure Security Center) across all subscriptions with Standard tier for enhanced protections. Enable Defender plans for each resource type: Defender for Servers (P2 for EDR integration), Defender for App Service, Defender for Storage, Defender for Containers, Defender for SQL, Defender for Key Vault, Defender for Resource Manager, and Defender for DNS. Configure auto-provisioning of Log Analytics agent for server protection. Review and remediate Secure Score recommendations, prioritizing critical recommendations. Configure Defender for Cloud alerts to flow to Microsoft Sentinel or a third-party SIEM. Document Defender plan coverage, Secure Score targets, and recommendation remediation SLAs.",
              check:
                "Defender for Cloud enabled across all subscriptions with Standard tier, all relevant Defender plans activated, Secure Score tracking operational, and alerts routed to SIEM",
            },
            {
              title:
                "Deploy Microsoft Sentinel as Azure-native SIEM/SOAR",
              control:
                "Azure \u2014 Sentinel SIEM/SOAR Controls",
              how: "Deploy Microsoft Sentinel in a dedicated Log Analytics workspace for centralized security monitoring. Configure data connectors: Azure Activity Logs, Azure AD/Entra ID sign-in and audit logs, Defender for Cloud alerts, Azure Firewall logs, Azure WAF logs, Azure NSG flow logs, Microsoft 365 audit logs, and third-party connectors. Deploy Microsoft security content hub solutions (MITRE ATT&CK mapping, Fusion advanced attack detection). Create analytics rules for: impossible travel detection, mass file download, privilege escalation, lateral movement, and data exfiltration. Configure automated playbooks using Logic Apps: automated IP blocking on brute force detection, automated ticket creation for high-severity alerts, and automated containment for crypto-mining detection. Document the Sentinel architecture, data connector inventory, and playbook library.",
              check:
                "Sentinel deployed with all relevant data connectors, analytics rules mapped to MITRE ATT&CK, automated playbooks for top 5 response scenarios, and architecture documented",
            },
            {
              title:
                "Configure Azure Policy for continuous compliance enforcement",
              control:
                "Azure \u2014 Azure Policy Compliance Controls",
              how: "Deploy Azure Policy at scale for continuous compliance enforcement. Create policy assignments at Management Group level: require encryption for storage accounts (allowed storage account SKUs, require blob encryption), require encryption for disks (require encryption on VM disks), restrict locations (only approved regions), require tags on resources (environment, owner, cost-center), and enforce networking standards (require NSG on subnets). Create custom policies for organization-specific requirements: required encryption algorithms, approved VM images, mandatory diagnostic settings. Enable remediation tasks for existing non-compliant resources. Configure compliance dashboards showing compliance percentage per policy initiative. Document the policy inventory, initiative groupings, and remediation procedures.",
              check:
                "Azure Policy deployed at Management Group level with encryption, region, tagging, and networking policies, compliance dashboards operational, and remediation procedures documented",
            },
            {
              title:
                "Implement Microsoft Purview for data governance and DLP",
              control:
                "Azure \u2014 Purview Data Governance Controls",
              how: "Deploy Microsoft Purview for data governance, classification, and DLP. Configure data map: register and scan all Azure data sources (Azure SQL, Synapse, Cosmos DB, Blob Storage, Data Lake, Power BI). Enable automated classification using built-in sensitive information types and custom classifiers. Configure DLP policies: create policies for Exchange (block emails with sensitive data to external recipients), SharePoint/OneDrive (prevent sharing of classified documents), Teams (block sensitive data in chat), and Endpoint (prevent copying classified data to USB). Configure information protection labels for document classification (Public, Internal, Confidential, Highly Confidential). Document the Purview data map, classification rules, DLP policies, and information protection labels.",
              check:
                "Purview deployed with data map covering all Azure sources, automated classification enabled, DLP policies for Exchange/SharePoint/Teams/Endpoint configured, and information protection labels published",
            },
            {
              title:
                "Configure Entra ID with conditional access and identity protection",
              control:
                "Azure \u2014 Entra ID Identity Controls",
              how: "Configure Microsoft Entra ID (Azure AD) with advanced identity protection controls. Enable Conditional Access policies: require MFA for all users (excluding emergency break-glass accounts), require compliant devices for sensitive apps, block legacy authentication protocols, require trusted locations for admin access, and implement risk-based step-up authentication. Enable Entra ID Identity Protection: configure user risk policies (force password reset on high risk), sign-in risk policies (require MFA on medium/high risk), and configure investigation and remediation workflows. Enable PIM for privileged role activation (time-bound, approval-required). Configure Entra ID Governance: access reviews for privileged roles (quarterly), entitlement management for group-based access, and lifecycle workflows for user onboarding/offboarding. Document the Conditional Access policy inventory and Identity Protection configuration.",
              check:
                "Entra ID Conditional Access policies configured for MFA, device compliance, legacy blocking, and risk-based auth; Identity Protection enabled; PIM for privileged roles; access reviews scheduled",
            },
          ],
        },
        {
          day: 84,
          title: "GCP Controls \u2014 Security Command Center, Chronicle & DLP API",
          tasks: [
            {
              title:
                "Enable Security Command Center Premium across all GCP projects",
              control:
                "GCP \u2014 Security Command Center Controls",
              how: "Enable Google Cloud Security Command Center (SCC) Premium across all projects in the organization. Enable threat detection: Event Threat Detection for real-time log analysis, Web Security Scanner for application vulnerability detection, and Container Threat Detection for runtime container security. Enable vulnerability management: EVM (Enterprise Vulnerability Management) for continuous asset and vulnerability scanning, web scanner for web application vulnerabilities. Configure SCC notifications: send high-priority findings to Pub/Sub for SIEM integration, send critical findings to PagerDuty/Opsgenie for immediate response. Configure SCC integrations: Cloud Armor findings, IAP findings, and Data Loss Prevention findings. Document the SCC configuration, finding categories, and response procedures per finding type.",
              check:
                "SCC Premium enabled across all projects with threat detection, vulnerability management, notification channels configured, and response procedures documented for each finding category",
            },
            {
              title:
                "Deploy Chronicle SIEM for centralized GCP log analysis",
              control:
                "GCP \u2014 Chronicle SIEM Controls",
              how: "Deploy Google Chronicle (or Chronicle SIEM) for centralized security log analysis. Configure log ingestion: Cloud Audit Logs (Admin Activity, Data Access, System Event), VPC Flow Logs, Cloud Armor logs, Cloud DNS logs, GKE audit logs, Cloud SQL logs, and BigQuery audit logs. Build detection rules mapped to MITRE ATT&CK: brute force detection (failed login threshold), privilege escalation (IAM policy changes), lateral movement (unusual SSH patterns), data exfiltration (large Cloud Storage downloads), and cryptomining (unusual compute usage). Configure SOAR playbooks using Chronicle Backstory API: automated IP blocking, account suspension, and alert triage. Document the Chronicle deployment, detection rule inventory, and playbook library.",
              check:
                "Chronicle deployed with all GCP log sources ingested, detection rules mapped to MITRE ATT&CK, SOAR playbooks operational, and documentation updated with detection rule inventory",
            },
            {
              title:
                "Configure Organization Policy constraints for GCP security baselines",
              control:
                "GCP \u2014 Policy Intelligence Controls",
              how: "Deploy Organization Policy constraints at the GCP Organization level to enforce security baselines. Key constraints: constraints/iam.disableServiceAccountKeyCreation (prevent SA key creation), constraints/compute.vmExternalIpAccess (restrict external IPs), constraints/compute.requireOsLogin (require OS Login for VMs), constraints/compute.restrictVpcPeering (restrict VPC peering), constraints/storage.uniformBucketLevelAccess (enforce uniform bucket-level access), constraints/sql.restrictPublicIp (prevent public IP on Cloud SQL). Use Policy Intelligence to analyze IAM policies for over-privileged accounts and recommend least-privilege bindings. Configure Policy Analyzer to audit who has access to what resources. Document the Organization Policy constraint inventory, exception process, and policy analysis cadence.",
              check:
                "Organization Policy constraints deployed at Org level for all critical security baselines, Policy Intelligence analyzing IAM over-privilege, Policy Analyzer auditing access, and exception process documented",
            },
            {
              title:
                "Implement Cloud DLP API for sensitive data inspection across GCP",
              control:
                "GCP \u2014 Cloud DLP API Controls",
              how: "Deploy Google Cloud DLP API for sensitive data inspection and de-identification across GCP services. Configure inspection templates: scan BigQuery datasets for PII (credit card numbers, SSN, email, phone numbers), scan Cloud Storage buckets for sensitive files, scan Datastore/Firestore for sensitive fields. Create inspection jobs for recurring scans (daily for critical data stores, weekly for all data stores). Configure de-identification templates for masking, redaction, tokenization, and date shifting. Integrate DLP with Dataflow pipelines for real-time inspection of streaming data. Configure DLP findings export to BigQuery for compliance reporting and to Pub/Sub for alerting. Document the DLP configuration, inspection templates, de-identification templates, and findings review process.",
              check:
                "Cloud DLP API configured with inspection and de-identification templates, recurring scan jobs scheduled, Dataflow integration for streaming data, and findings exported for compliance reporting",
            },
            {
              title:
                "Configure GKE security controls for container workloads",
              control:
                "GCP \u2014 GKE Security Controls",
              how: "Configure Google Kubernetes Engine (GKE) security controls for container workloads. Enable: Binary Authorization (require signed images from trusted registries), Workload Identity (map K8s service accounts to GCP IAM), Shielded GKE Nodes (secure boot, integrity monitoring), Network Policies (Calico) for pod-to-pod network segmentation, and Pod Security Standards (restricted profile). Configure GKE logging: enable system and workload logging to Cloud Logging, export audit logs for all namespace operations. Deploy security scanning: enable GKE安全办 (Security Posture Management) in SCC, deploy kube-hunter for vulnerability scanning, and use Trivy in CI/CD for image scanning. Document the GKE security architecture, pod security standards, network policies, and image trust chain.",
              check:
                "GKE security controls configured with Binary Authorization, Workload Identity, Shielded Nodes, Network Policies, Pod Security Standards, logging, and image scanning in CI/CD",
            },
          ],
        },
        {
          day: 90,
          title: "Alibaba Controls & Common SOC 2 Findings Remediation",
          tasks: [
            {
              title:
                "Configure ActionTrail for comprehensive API audit logging",
              control:
                "Alibaba \u2014 ActionTrail Audit Controls",
              how: "Configure Alibaba ActionTrail for comprehensive API activity logging across all regions and accounts. Enable management event logging for all Alibaba Cloud services. Configure event delivery to OSS (Object Storage Service) for long-term retention in a dedicated auditing bucket. Enable log file integrity validation. Configure alerting for critical API events: root account login, RAM policy changes, security group modifications, ECS instance creation/deletion, RDS configuration changes. Integrate ActionTrail logs with Alibaba Cloud Log Service (SLS) for real-time analysis. Document the ActionTrail configuration, log delivery architecture, event categories, and retention policy.",
              check:
                "ActionTrail enabled for all regions with management events logged, integrity validation enabled, logs delivered to OSS, alerting for critical events configured, and Log Service integration operational",
            },
            {
              title:
                "Deploy Alibaba Security Center for threat detection and compliance",
              control:
                "Alibaba \u2014 Security Center Controls",
              how: "Enable Alibaba Security Center (Anti-Bot Service / Security Center) across all ECS instances and containers. Enable: vulnerability scanning for all ECS instances (weekly), baseline checks (CIS Alibaba Cloud Foundation Benchmark), threat detection for containers (if using ACK), and configuration auditing. Configure automatic remediation for common vulnerabilities: patch management via Security Center, emergency vulnerability patching for critical CVEs. Enable Security Center alerting to SLS for integration with centralized SIEM. Configure compliance scanning against Alibaba Cloud Config rules. Document the Security Center configuration, scanning schedules, vulnerability remediation SLAs, and compliance reporting.",
              check:
                "Security Center enabled across all ECS instances with vulnerability scanning, baseline checks, container threat detection, automatic remediation configured, and compliance scanning operational",
            },
            {
              title:
                "Implement Alibaba Cloud Config for resource compliance monitoring",
              control:
                "Alibaba \u2014 Config Compliance Controls",
              how: "Enable Alibaba Cloud Config for resource compliance monitoring across all regions. Configure managed rules: access控制 (access control) rules for RAM policies, storage encryption rules for OSS and RDS, network security rules for security groups and VPCs, and logging rules for ActionTrail and SLO configuration. Create custom rules for organization-specific compliance requirements. Aggregate Config data into a central compliance dashboard. Configure automatic remediation for non-compliant resources using Alibaba Cloud Automation. Document the Config rule inventory, compliance dashboards, remediation procedures, and reporting cadence.",
              check:
                "Alibaba Config enabled across all regions with managed and custom rules, compliance dashboards operational, automatic remediation configured, and reporting cadence established",
            },
            {
              title:
                "Configure Alibaba KMS and RAM for key and access management",
              control:
                "Alibaba \u2014 KMS and RAM Controls",
              how: "Configure Alibaba Cloud KMS for key management and RAM for access control. For KMS: create customer master keys for each service category, enable automatic key rotation, configure key policies restricting usage to specific RAM roles, enable key deletion protection. For RAM: create least-privilege RAM policies for each role (developer, operator, administrator), implement RAM groups for batch role assignment, configure RAM role chaining for cross-account access, enable MFA for all RAM users, enforce password policies (16+ characters, rotation every 90 days). Configure RAM access reviews: quarterly review of RAM user/group memberships and policy attachments. Document the KMS key inventory, RAM policy inventory, and access review procedures.",
              check:
                "Alibaba KMS keys configured with rotation and access policies, RAM least-privilege policies implemented, MFA enforced, quarterly access reviews scheduled, and key/policy inventories documented",
            },
            {
              title:
                "Document common SOC 2 findings and remediation playbook",
              control:
                "SOC 2 \u2014 Common Findings Remediation",
              how: "Compile a remediation playbook for the most common SOC 2 Type II findings across all Trust Services Criteria. Security: missing MFA on privileged accounts (remediate: enforce MFA via IdP), inadequate access reviews (remediate: implement quarterly automated reviews), missing audit logging (remediate: enable CloudTrail/ActionTrail/Sentinel), incomplete change management (remediate: enforce CI/CD gates). Confidentiality: unencrypted data stores (remediate: enable encryption with CMKs), missing key rotation (remediate: enable automatic annual rotation), excessive data exposure (remediate: implement DLP). Privacy: no consent management (remediate: deploy CMP), missing DSAR procedures (remediate: build DSAR workflow). Integrity: no reconciliation controls (remediate: implement automated reconciliation), missing input validation (remediate: add schema validation at API boundaries). Availability: no DR testing (remediate: schedule annual DR drills), missing health checks (remediate: implement health checks on all services). Document each finding with root cause, remediation steps, prevention controls, and detection mechanism.",
              check:
                "Common SOC 2 findings playbook documented with 20+ findings, remediation steps for each, prevention controls, detection mechanisms, and playbook reviewed by security and compliance teams",
            },
          ],
        },
      ],
    },
  ],
};

export default function Soc2() {
  return <LearningFrameworkPage framework={FRAMEWORK} />;
}
