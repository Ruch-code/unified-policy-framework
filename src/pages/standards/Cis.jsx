import LearningFrameworkPage from "../../components/LearningFrameworkPage";

const FRAMEWORK = {
  id: "cis",
  name: "CIS Controls v8",
  region: "Global",
  color: "navy",
  flag: "🌐",
  flagAnimation: "float",
  basePath: "/cis",
  referenceUrl: "https://www.cisecurity.org/controls",
  weeks: 4,
  milestones: 3,
  hoursByLevel: [4, 8, 5, 3],
  startupGaps: [
    {
      itgc: "Asset Management",
      gap: "No enterprise asset inventory — unknown devices and cloud instances exist",
      pushback: "We know what servers we have; a spreadsheet is fine.",
      reality: "CIS Control 1 (Inventory & Control of Enterprise Assets) requires an accurate, up-to-date inventory of all assets with network access. Without it, you can't protect what you don't know exists. Shadow IT, untracked cloud instances, and forgotten dev environments are common blind spots for startups.",
      policy: "Asset Inventory Policy, Enterprise Asset Management Standard",
      compensating: [
        "Deploy cloud-native asset discovery (AWS Config, Azure Resource Graph, GCP Cloud Asset Inventory, Alibaba Cloud Config) for immediate visibility",
        "Create a minimal asset register covering production environments first",
        "Automate asset discovery to prevent drift from manual tracking"
      ],
      leantip: "Use cloud-native asset inventory tools (they're free with your cloud account) to get immediate visibility. Start with production — that's what matters most for CIS compliance."
    },
    {
      itgc: "Data Protection",
      gap: "No data discovery or classification — personal and sensitive data locations are unknown",
      pushback: "We know where our data is — it's in the database.",
      reality: "CIS Control 3 (Data Protection) requires establishing and maintaining data management processes. Data often sprawls across databases, object storage, logs, backups, SaaS tools, and developer machines. Without discovery and classification, you can't apply appropriate protections or meet any privacy regulation.",
      policy: "Data Classification Policy, Data Discovery Standard",
      compensating: [
        "Enable Amazon Macie, Azure Purview, GCP DLP API, or Alibaba Data Security Center for automated discovery",
        "Start by classifying your top 3 data stores by sensitivity",
        "Tag classified resources with sensitivity labels for automated policy enforcement"
      ],
      leantip: "Turn on your cloud provider's built-in data classification tool (Macie for AWS, Purview for Azure, DLP API for GCP, Data Security Center for Alibaba). It finds PII and sensitive data you may not know exists."
    },
    {
      itgc: "Access Control",
      gap: "No centralized access management — local accounts proliferate across cloud consoles and SaaS tools",
      pushback: "Everyone just uses their own cloud account login; it's simpler.",
      reality: "CIS Control 5 (Account Management) and Control 6 (Access Control Management) require centralized identity, MFA for all users, and access based on need. Local accounts without centralized management make access reviews impossible and create orphaned accounts when employees leave.",
      policy: "Identity & Access Management Policy, Account Management Standard",
      compensating: [
        "Deploy an identity provider (Okta, Entra ID, Google Workspace) for SSO across all systems",
        "Enable MFA for all cloud console access immediately",
        "Create a simple access request and revocation process tied to HR onboarding/offboarding"
      ],
      leantip: "Enable MFA on every cloud console today — it's the single highest-impact CIS control for startups. Then consolidate local accounts into an IdP over the next sprint."
    },
    {
      itgc: "Vulnerability Management",
      gap: "No vulnerability scanning or patch management process",
      pushback: "We update our dependencies when we remember; it hasn't been a problem.",
      reality: "CIS Control 7 (Continuous Vulnerability Management) requires establishing a vulnerability management program with regular scanning and remediation SLAs. Unpatched software is the most common attack vector. Startups with no scanning process are flying blind.",
      policy: "Vulnerability Management Policy, Patch Management Standard",
      compensating: [
        "Enable cloud-native scanning (AWS Inspector, Azure Defender, GCP SCC, Alibaba Security Center) for immediate visibility",
        "Run Dependabot or Snyk for open-source dependency scanning (free for open-source)",
        "Define remediation SLAs: Critical = 24h, High = 7d, Medium = 30d"
      ],
      leantip: "Enable your cloud provider's built-in vulnerability scanner today (it's free or low-cost). Then add Dependabot to your repos for dependency scanning. Two tools, 80% of CIS Control 7 covered."
    },
    {
      itgc: "Incident Response",
      gap: "No incident response plan or defined team roles",
      pushback: "If something happens, we'll all jump in and fix it.",
      reality: "CIS Control 17 (Incident Response & Management) requires a defined incident response plan with roles, communication procedures, and post-incident review. Without pre-planned roles and procedures, response is chaotic and evidence is lost.",
      policy: "Incident Response Plan, Incident Classification Standard",
      compensating: [
        "Draft a one-page incident response plan with roles, escalation paths, and communication templates",
        "Assign an incident commander and backup for each on-call rotation",
        "Conduct one tabletop exercise to test the plan"
      ],
      leantip: "Write a one-page incident response plan with 5 roles (commander, communications, technical lead, legal, scribe) and a phone tree. One tabletop exercise makes it real."
    }
  ],
  privacyStartupNotes:
    "CIS note: CIS Controls v8 is a technical-control framework — not a privacy regulation like GDPR or LGPD. However, implementing CIS Controls directly supports compliance with virtually every privacy and security regulation. CIS Control 18 (Penetration Testing) maps to SOC 2 CC6/CC7 testing, CIS Control 3 (Data Protection) supports GDPR Art. 5/25 and LGPD Art. 46, and CIS Control 5/6 (Account/Access Management) underpins access requirements across all frameworks. Use CIS as your technical foundation and map controls to specific regulatory requirements.",
  weeksData: [
    {
      week: 1,
      title: "L1 Foundation — CIS Controls 1-6 (Essential Cyber Hygiene)",
      description:
        "Implement the foundational CIS Controls: asset inventory, software inventory, data protection, secure configuration, account management, and access control. These are the essential cyber hygiene controls applicable to all organizations.",
      days: [
        {
          day: 1,
          title: "CIS Control 1 — Inventory & Control of Enterprise Assets",
          tasks: [
            {
              title:
                "Discover and inventory all enterprise assets across cloud environments",
              control:
                "CIS Control 1.1 — Enterprise Asset Inventory",
              how: "Deploy automated asset discovery across all cloud environments. For AWS: enable AWS Config for resource inventory, use AWS Systems Manager Inventory for EC2 instances, and Cloud Asset Inventory for all resource types. For Azure: enable Azure Resource Graph for full subscription inventory, use Azure Arc for hybrid resources. For GCP: deploy Cloud Asset Inventory across all projects, enable GKE inventory for Kubernetes clusters. For Alibaba: enable Cloud Config for resource discovery across all regions. Consolidate findings into a central asset register with: asset ID, type, owner, environment, IP address, cloud provider, region, and last-seen timestamp. Target: 100% of production assets inventoried within 48 hours.",
              check:
                "Automated asset discovery enabled across all four cloud providers, central asset register populated with all production assets, and 48-hour discovery cycle established",
            },
            {
              title:
                "Establish asset lifecycle management with automated onboarding and offboarding",
              control:
                "CIS Control 1.2 — Address Unauthorized Assets",
              how: "Implement asset lifecycle management: when a new asset is provisioned, it's automatically added to the inventory; when decommissioned, it's automatically removed. For AWS: configure Config Rules to detect untagged resources, use Lambda to auto-tag new assets. For Azure: deploy Azure Policy to require resource tagging and auto-inventory. For GCP: use Organization Policy constraints to require labels on all resources. For Alibaba: configure Cloud Config rules for resource compliance. Implement unauthorized asset detection: alert when assets appear that aren't in the register, investigate unknown assets within 24 hours. Define the asset ownership assignment process tied to team leads.",
              check:
                "Asset lifecycle management automated with onboarding/offboarding, unauthorized asset detection with 24-hour investigation SLA, and ownership assignment process documented",
            },
            {
              title:
                "Extend asset inventory to cover SaaS tools and cloud services",
              control:
                "CIS Control 1.3 — Asset Inventory Data Source",
              how: "Extend the asset inventory beyond compute resources to include SaaS tools and cloud services. Create a SaaS register: document every SaaS tool (CRM, email, analytics, project management, communication) with: vendor name, service type, data classification level, data stored, user count, subscription tier, and renewal date. Include cloud services: managed databases, serverless functions, CDN configurations, DNS records, and SSL certificates. Use cloud-native service catalogs: AWS Service Catalog, Azure Service Catalog. Maintain the SaaS register in a shared document reviewed quarterly. This register feeds into CIS Control 3 (Data Protection) and CIS Control 13 (Network Monitoring).",
              check:
                "SaaS register created with all cloud and SaaS tools documented, data classification levels assigned, quarterly review scheduled, and register integrated with asset inventory",
            },
            {
              title:
                "Document asset inventory data standards and classification",
              control:
                "CIS Control 1.4 — Asset Inventory Data Standards",
              how: "Define data standards for the asset inventory. Required fields per asset: unique identifier, asset type (compute, storage, database, SaaS, network), cloud provider, region, environment (production/staging/development), owner (team/individual), data classification (public/internal/confidential/restricted), business criticality (critical/high/medium/low), creation date, last-seen timestamp, and decommission date (if applicable). Implement data quality rules: no null values for required fields, owner must be a valid team, classification must be one of four levels. Configure automated data quality checks and monthly reporting on inventory completeness.",
              check:
                "Asset inventory data standards documented with required fields, data quality rules implemented, monthly completeness reporting configured, and classification taxonomy defined",
            },
          ],
        },
        {
          day: 2,
          title: "CIS Control 2 — Inventory & Control of Software Assets + CIS Control 3 — Data Protection",
          tasks: [
            {
              title:
                "Discover and inventory all software across development and production environments",
              control:
                "CIS Control 2.1 — Software Inventory",
              how: "Deploy automated software discovery across all environments. For containers: use Trivy, Snyk Container, or Prisma Cloud to inventory all container images and their software components. For VMs: use AWS Inspector, Azure Defender, GCP SCC, or Alibaba Security Center to inventory installed packages. For applications: inventory all application dependencies using Snyk, Dependabot, or OWASP Dependency-Check. For SaaS: extend the SaaS register from Control 1.3. Consolidate into a central software inventory with: software name, version, vendor, end-of-life date, license type, known vulnerabilities, and installed-on asset. Configure automated alerts for end-of-life software and critical vulnerabilities.",
              check:
                "Software inventory populated across containers, VMs, applications, and SaaS with versions, EOL dates, and vulnerabilities; automated EOL and vulnerability alerting configured",
            },
            {
              title:
                "Establish approved software lists and unauthorized software prevention",
              control:
                "CIS Control 2.2 — Authorized Software List",
              how: "Establish an approved software list for each environment tier. For production: only approved software from the list may be deployed, with approval required for additions. For staging: expanded list with additional testing tools. For development: broader list with security tooling required. Implement prevention controls: container image scanning in CI/CD (block unapproved base images), application allowlisting on servers (AppLocker, AWS Systems Manager), and cloud marketplace restrictions (AWS Service Control Policies, Azure Policy). Document the software approval process: who approves, SLA for review (3 business days), and criteria for approval (security review, license compliance, vendor support).",
              check:
                "Approved software lists established per environment tier, unauthorized software prevention implemented in CI/CD and production, and approval process documented with SLA",
            },
            {
              title:
                "Implement automated data discovery and classification across all data stores",
              control:
                "CIS Control 3.1 — Data Inventory, CIS Control 3.2 — Data Classification",
              how: "Deploy automated data discovery and classification. For AWS: enable Amazon Macie across all S3 buckets with managed and custom data identifiers, configure Macie to classify data by sensitivity (public, internal, confidential, restricted). For Azure: deploy Microsoft Purview scanning across all data sources with classification rules. For GCP: enable Cloud DLP API inspection jobs for BigQuery, Cloud Storage, and Datastore. For Alibaba: configure Data Security Center for data classification. Build the classification taxonomy aligned with business needs. Tag all discovered data stores with classification labels. Implement automated re-classification for new data stores. Document the classification taxonomy, data handling requirements per level, and the discovery scan schedule.",
              check:
                "Automated data discovery enabled across all four clouds with classification taxonomy, data stores tagged with sensitivity labels, and re-classification automated for new stores",
            },
            {
              title:
                "Configure data loss prevention policies to enforce classification handling",
              control:
                "CIS Control 3.3 — Data Protection Processes, CIS Control 3.4 — Data Protection Configuration",
              how: "Deploy DLP policies enforcing data handling requirements per classification level. For 'restricted' data: block external sharing, require encryption, restrict access to authorized roles only. For 'confidential' data: block anonymous sharing, require authentication, alert on bulk export. For 'internal' data: allow internal sharing, restrict external sharing. For 'public' data: no restrictions. Configure per cloud: AWS Macie automated remediation for public buckets, Azure Purview DLP for Exchange/SharePoint/OneDrive, GCP Cloud DLP for BigQuery/Cloud Storage, Alibaba Data Security Center for OSS/RDS. Configure DLP findings export to compliance dashboards.",
              check:
                "DLP policies deployed enforcing classification-based handling across all clouds, automated remediation for critical violations, and findings exported to compliance dashboards",
            },
          ],
        },
        {
          day: 3,
          title: "CIS Control 4 — Secure Configuration + Control 5 — Account Management",
          tasks: [
            {
              title:
                "Establish secure configuration baselines using CIS Benchmarks",
              control:
                "CIS Control 4.1 — Configuration Standards",
              how: "Establish secure configuration baselines aligned with CIS Benchmarks for all technology in your stack. For cloud platforms: apply CIS AWS Foundations Benchmark, CIS Azure Foundations Benchmark, CIS GCP Foundation Benchmark, and CIS Alibaba Cloud Foundation Benchmark. For operating systems: apply CIS Amazon Linux/Ubuntu, CIS Windows Server, or CIS CentOS Benchmarks. For containers: apply CIS Docker Benchmark and CIS Kubernetes Benchmark. For databases: apply CIS MySQL, PostgreSQL, or MongoDB Benchmarks. Document the baseline configurations, create golden images/templates, and automate deployment using Infrastructure-as-Code (Terraform, CloudFormation).",
              check:
                "CIS Benchmarks applied to all cloud platforms, operating systems, containers, and databases; baselines documented and automated via IaC",
            },
            {
              title:
                "Implement configuration drift detection and remediation",
              control:
                "CIS Control 4.2 — Secure Configuration of Infrastructure",
              how: "Deploy automated configuration monitoring and drift detection. For AWS: use AWS Config Rules to continuously evaluate resource configurations against baselines, configure automatic remediation using Systems Manager Automation. For Azure: use Azure Policy compliance evaluations with auto-remediation tasks. For GCP: use Organization Policy constraints and Security Command Center for configuration monitoring. For Alibaba: use Cloud Config rules with auto-remediation via Alibaba Automation. Configure alerts for critical configuration changes: security group modifications, IAM policy changes, encryption settings disabled, and logging disabled. Implement monthly compliance reports showing configuration posture.",
              check:
                "Configuration drift detection enabled across all clouds with auto-remediation for critical findings, alerts for security-relevant changes, and monthly compliance reports",
            },
            {
              title:
                "Deploy centralized account management with automated provisioning and deprovisioning",
              control:
                "CIS Control 5.1 — Centralized Account Management, CIS Control 5.2 — Account Lifecycle Management",
              how: "Deploy centralized account management using an Identity Provider (IdP). For AWS: configure IAM Identity Center (AWS SSO) with SCIM provisioning from IdP. For Azure: configure Entra ID with HR-driven provisioning. For GCP: configure Cloud Identity with federated SSO and group-based access. For Alibaba: configure RAM with SSO integration. Implement lifecycle management: automated account provisioning on employee hire (HR system integration), automated deprovisioning on termination (HR system trigger within 24 hours), automated role changes on job transfer. Implement dormant account detection: flag accounts with no login in 60+ days, review quarterly, disable after 90 days.",
              check:
                "Centralized IdP deployed with SSO across all clouds, automated provisioning/deprovisioning via HR integration, dormant account detection, and 24-hour offboarding SLA",
            },
            {
              title:
                "Implement account review and credential management controls",
              control:
                "CIS Control 5.3 — Account Review, CIS Control 5.4 — Account Access Authorization",
              how: "Implement quarterly account reviews and credential management. For account reviews: export all accounts from IdP and each cloud console, verify each account has a valid owner, identify orphaned accounts (departed employees, contractors with expired contracts), verify role assignments match current job functions, and verify MFA is enabled on all accounts. For credential management: enforce password policy (16+ characters, breached password detection), implement MFA for all users (TOTP, FIDO2, or hardware tokens), disable shared accounts, rotate service account keys every 90 days, and implement just-in-time access for privileged roles (PIM in Azure, assume-role in AWS). Document the review process and remediation actions.",
              check:
                "Quarterly account reviews scheduled with all accounts verified, credential management controls enforced (MFA, password policy, key rotation), and review results documented",
            },
          ],
        },
        {
          day: 4,
          title: "CIS Control 6 — Access Control Management",
          tasks: [
            {
              title:
                "Implement role-based access control with least-privilege across all environments",
              control:
                "CIS Control 6.1 — Role-Based Access, CIS Control 6.2 — Least Privilege",
              how: "Implement RBAC with least-privilege across all environments. For each cloud provider: create IAM roles aligned to job functions (developer, operations, security, read-only), apply permission boundaries to limit maximum privilege, and implement just-in-time elevation for administrative tasks. For AWS: IAM roles with permission boundaries, SCPs for organization-level restrictions. For Azure: Entra ID custom roles, PIM for privileged access. For GCP: IAM bindings with predefined and custom roles, Organization Policy constraints. For Alibaba: RAM roles with policy-based access, RAM groups for batch assignment. Document the role matrix: each role maps to specific permissions, each permission is justified by a business need, and no role grants standing administrative access to production.",
              check:
                "RBAC implemented across all clouds with least-privilege roles, permission boundaries configured, JIT elevation for admins, and role matrix documented with business justification per permission",
            },
            {
              title:
                "Implement network access controls with segmentation and firewall rules",
              control:
                "CIS Control 6.3 — Network Access Control, CIS Control 6.4 — Access to Scripts",
              how: "Implement network access controls enforcing least-privilege at the network level. For AWS: configure Security Groups with specific port/source rules (no 0.0.0.0/0 for management ports), implement NACLs for subnet-level controls, deploy VPC endpoints for AWS service access. For Azure: configure NSGs with specific rules, deploy Azure Firewall for centralized network security, use Private Link for PaaS services. For GCP: configure VPC firewall rules with specific source/destination, deploy Cloud NAT for outbound control, use VPC Service Controls for data perimeters. For Alibaba: configure security groups and VPC ACLs, use PrivateLink for service access. Implement network segmentation: separate tiers (web, application, database) with controlled inter-tier communication. Restrict administrative access to management networks only.",
              check:
                "Network access controls implemented with specific firewall rules (no open access to management ports), network segmentation across tiers, and administrative access restricted to management networks",
            },
            {
              title:
                "Implement privileged access management for administrative accounts",
              control:
                "CIS Control 6.5 — Privileged Access Management",
              how: "Implement privileged access management (PAM) for all administrative accounts. Define privileged accounts: cloud console administrators, database administrators, security team members, and CI/CD pipeline administrators. For each privileged account: require MFA (hardware tokens preferred), enforce just-in-time access (time-bound elevation), require approval for elevation, log all privileged sessions, and implement break-glass procedures for emergency access. Use PAM tools: AWS IAM Identity Center with permission sets, Azure PIM, GCP IAM Recommender for least-privilege recommendations. Implement credential management: no standing keys for administrators, short-lived credentials via role assumption, automatic key rotation every 90 days for service accounts. Document privileged account inventory, access procedures, and review schedule.",
              check:
                "PAM implemented for all administrative accounts with JIT access, MFA enforcement, session logging, break-glass procedures, and short-lived credentials replacing standing keys",
            },
          ],
        },
      ],
    },
    {
      week: 2,
      title: "L2 Implementer — CIS Controls 7-12 (Vulnerability, Logging, Email/Web, Malware, Recovery, Network)",
      description:
        "Implement vulnerability management, audit logging, email/web protections, malware defenses, data recovery, and network infrastructure management controls across cloud environments.",
      days: [
        {
          day: 8,
          title: "CIS Control 7 — Continuous Vulnerability Management",
          tasks: [
            {
              title:
                "Deploy automated vulnerability scanning across infrastructure, containers, and dependencies",
              control:
                "CIS Control 7.1 — Vulnerability Identification, CIS Control 7.2 — Vulnerability Remediation",
              how: "Deploy multi-layered vulnerability scanning. For infrastructure: enable AWS Inspector for EC2 and ECR, Azure Defender for Servers and Containers, GCP Security Command Center for VMs, and Alibaba Security Center for ECS. For containers: integrate Trivy, Snyk Container, or Prisma Cloud into CI/CD pipelines (scan on every build). For dependencies: enable Snyk, Dependabot, or OWASP Dependency-Check for open-source vulnerabilities (daily scanning). For cloud configurations: run Prowler (AWS), ScoutSuite (multi-cloud), or CSPM tools continuously. Define and enforce remediation SLAs: Critical = 24 hours, High = 7 days, Medium = 30 days, Low = 90 days. Implement risk acceptance process for vulnerabilities that cannot be remediated within SLA.",
              check:
                "Vulnerability scanning deployed across infrastructure, containers, dependencies, and cloud configs; remediation SLAs defined and tracked; risk acceptance process documented",
            },
            {
              title:
                "Implement patch management with automated deployment and verification",
              control:
                "CIS Control 7.3 — Remediation Verification",
              how: "Implement patch management automation. For AWS: deploy Systems Manager Patch Manager for EC2 patching with maintenance windows, use AWS Lambda for automated EBS snapshot before patching. For Azure: configure Azure Update Management for VM patching with change control. For GCP: deploy OS Patch Management for Compute Engine patching. For Alibaba: configure Security Center patch management. For containers: implement base image patching in CI/CD (rebuild images when base OS releases security patches). For Kubernetes: deploy node auto-upgrade policies and pod disruption budgets. Implement post-patch verification: run vulnerability scan after patching to confirm remediation. Document the patching schedule: critical patches within 24 hours, high within 7 days, routine patches monthly.",
              check:
                "Patch management automated for VMs across all clouds, container base image patching in CI/CD, post-patch verification scanning, and patching schedule documented",
            },
            {
              title:
                "Implement software inventory-based vulnerability tracking and EOL management",
              control:
                "CIS Control 7.4 — Centralized Patch Management",
              how: "Track software inventory for end-of-life (EOL) and end-of-support (EOS) management. For each software component in the inventory: track vendor EOL/EOS dates, map to remediation plans (upgrade, replace, or accept risk), and set alerts 90 days before EOL. Implement upgrade workflows: test new versions in staging, deploy to production with rollback capability. For cloud-managed services: track service version deprecation notices (AWS RDS engine versions, Azure SQL version support, GCP Cloud SQL version lifecycle). Configure automated alerts for software reaching EOL/EOS within 90 days. Document the EOL management process and exception handling for software that cannot be upgraded immediately.",
              check:
                "Software EOL/EOS tracking with 90-day advance alerts, upgrade workflows tested in staging, and EOL management process documented with exception handling",
            },
          ],
        },
        {
          day: 12,
          title: "CIS Control 8 — Audit Log Management",
          tasks: [
            {
              title:
                "Enable comprehensive audit logging across all cloud environments",
              control:
                "CIS Control 8.1 — Audit Log Settings, CIS Control 8.2 — Audit Log Storage",
              how: "Enable comprehensive audit logging across all cloud environments. For AWS: enable CloudTrail for all regions with management and S3 data events, enable VPC Flow Logs for all VPCs, enable RDS audit logging, enable S3 access logging. For Azure: enable Activity Logs for all subscriptions, enable Entra ID sign-in and audit logs, enable NSG flow logs, enable Azure SQL auditing. For GCP: enable Cloud Audit Logs (Admin Activity and Data Access), enable VPC Flow Logs, enable Cloud SQL logging. For Alibaba: enable ActionTrail for all regions, enable VPC flow logs, enable RDS audit logging. Centralize logs in a secure, immutable storage location (S3 with Object Lock, Azure Immutable Blob Storage, GCS with retention policies). Retain logs for minimum 12 months online, 3 years archived.",
              check:
                "Audit logging enabled across all four clouds for management, data access, and network events; logs centralized in immutable storage with 12-month online and 3-year archived retention",
            },
            {
              title:
                "Configure alerting for critical security events and audit log tampering",
              control:
                "CIS Control 8.3 — Audit Log Protection, CIS Control 8.5 — Audit Review",
              how: "Configure alerting for critical security events that require immediate response. Critical alerts: root/IAM user login, MFA changes, security group modifications, CloudTrail/ActionTrail/Sentinel configuration changes, data access to classified stores, and unauthorized API calls. Implement alert routing to security team via PagerDuty, Opsgenie, or email/SMS. Protect audit logs from tampering: enable CloudTrail log file integrity validation, use immutable storage (S3 Object Lock compliance mode), restrict IAM policies to prevent log deletion, and implement a separate audit log archive account. Configure weekly audit log review process for the security team, with monthly executive summary reporting.",
              check:
                "Critical security event alerting configured and routed to security team, log integrity validation enabled, immutable storage enforced, and weekly/monthly review schedule established",
            },
          ],
        },
        {
          day: 18,
          title: "CIS Control 9 — Email & Web Browser Protections + Control 10 — Malware Defenses",
          tasks: [
            {
              title:
                "Configure email security controls with phishing protection and DMARC/DKIM/SPF",
              control:
                "CIS Control 9.1 — Email Security, CIS Control 9.2 — DNS Filtering",
              how: "Configure email security controls for your domain. Implement SPF: publish DNS TXT record specifying authorized email senders. Implement DKIM: enable DKIM signing for all email sent from your domain (SendGrid, SES, or email provider DKIM configuration). Implement DMARC: publish DMARC policy starting with 'p=none' for monitoring, upgrade to 'p=quarantine' then 'p=reject' as confidence grows. Configure email security gateway: enable anti-phishing rules, sandbox attachments, and URL rewriting with time-of-click verification. For web browsing: deploy DNS filtering (Cloudflare Gateway, Zscaler, or AWS Route 53 Resolver DNS Firewall) to block known malicious domains. Configure browser security: enforce HTTPS-only browsing, disable Flash/Java plugins, and deploy browser isolation for high-risk browsing.",
              check:
                "SPF, DKIM, and DMARC configured for email domain, anti-phishing and sandboxing enabled, DNS filtering deployed for web browsing, and browser security enforced",
            },
            {
              title:
                "Implement enterprise anti-malware with endpoint detection and response",
              control:
                "CIS Control 10.1 — Deploy Anti-Malware, CIS Control 10.2 —centralize Malware Detection",
              how: "Deploy enterprise anti-malware with EDR across all compute resources. For AWS: deploy Amazon Inspector agents or CrowdStrike Falcon on EC2 instances, enable GuardDuty for malware detection (S3 and Lambda). For Azure: enable Microsoft Defender for Endpoint on all VMs, configure automated investigation and remediation. For GCP: deploy Chronicle Endpoint Detection on Compute Engine, enable Container Threat Detection for GKE. For Alibaba: enable Security Center agent on all ECS instances with real-time protection. For developer workstations: deploy EDR via MDM (Jamf for macOS, Intune for Windows, Google Endpoint Management). For containers: implement runtime security with Falco, kube-bench for Kubernetes compliance. Configure automated response: isolate compromised hosts, terminate malicious processes, and quarantine infected files.",
              check:
                "EDR deployed on all compute resources across all clouds, runtime security for containers, MDM-managed workstations, and automated containment configured",
            },
          ],
        },
        {
          day: 25,
          title: "CIS Control 11 — Data Recovery + Control 12 — Network Infrastructure Management",
          tasks: [
            {
              title:
                "Implement automated data backup with versioning and immutable storage",
              control:
                "CIS Control 11.1 — Automated Backups, CIS Control 11.2 — Automated OS Backup",
              how: "Implement automated data backup with versioning and immutable storage. For AWS: enable AWS Backup for centralized backup management, configure automated RDS backups with point-in-time recovery, enable S3 versioning with Object Lock for immutable backups. For Azure: enable Azure Backup for all data services, configure GRS backup storage, enable blob versioning with immutable policies. For GCP: configure Cloud SQL automated backups, enable Cloud Storage versioning with retention policies. For Alibaba: enable RDS automated backups, configure OSS versioning with retention. Implement the 3-2-1 rule: 3 copies of data, on 2 different media types, with 1 off-site. Test backup restoration quarterly and document results. Ensure backup encryption matches production encryption standards.",
              check:
                "Automated backups configured across all clouds with versioning and immutable storage, 3-2-1 rule implemented, quarterly restoration tests scheduled, and backup encryption verified",
            },
            {
              title:
                "Implement disaster recovery procedures with defined RTO/RPO targets",
              control:
                "CIS Control 11.3 — Data Recovery Procedures",
              how: "Define and document disaster recovery procedures with specific RTO/RPO targets per service tier. For critical services: RTO < 1 hour, RPO < 15 minutes. For important services: RTO < 4 hours, RPO < 1 hour. For standard services: RTO < 24 hours, RPO < 24 hours. Implement cross-region replication: AWS S3 Cross-Region Replication, Azure GRS/RA-GRS storage, GCS dual-region buckets, Alibaba OSS cross-region replication. Configure DNS failover: Route 53 health checks with failover routing, Azure Traffic Manager, GCP Cloud DNS health checks. Document the DR activation procedure, roles, communication templates, and post-DR verification steps. Conduct DR tabletop exercises semi-annually.",
              check:
                "RTO/RPO targets defined per service tier, cross-region replication configured, DNS failover operational, DR procedures documented, and semi-annual tabletop exercises scheduled",
            },
            {
              title:
                "Implement network infrastructure management with secure device configuration",
              control:
                "CIS Control 12.1 — Network Device Configuration, CIS Control 12.2 — Secure Network Configuration",
              how: "Implement secure network infrastructure management. For cloud networking: document all VPC/VNet configurations, security group rules, NACLs, firewall rules, and routing tables. Implement network segmentation: separate management, application, and data tiers with controlled inter-tier communication. For load balancers: configure TLS 1.3 termination, health checks, and DDoS protection. For DNS: centralize DNS management, implement DNSSEC for domain security, and configure DNS logging. For CDN: configure security headers (HSTS, CSP, X-Frame-Options), cache security settings, and edge security rules. Implement Infrastructure-as-Code for all network configurations (Terraform, CloudFormation, ARM templates). Document the network architecture with diagrams, security group matrices, and change control procedures.",
              check:
                "Network infrastructure documented with IaC, segmentation across tiers, TLS 1.3 on load balancers, DNSSEC configured, and change control procedures documented",
            },
            {
              title:
                "Implement network device management and secure access procedures",
              control:
                "CIS Control 12.3 — Secure Device Management",
              how: "Implement secure access to network infrastructure. For cloud console access: require SSO with MFA, implement just-in-time access for administrative tasks, log all console sessions. For CLI/API access: use short-lived credentials via role assumption (AWS STS, Azure token exchange, GCP service account impersonation), implement IP restrictions for administrative API access, and log all CLI/API activity. For SSH/RDP access: require bastion hosts or VPN, implement session recording, and restrict to management networks. Implement network monitoring: enable VPC Flow Logs for all VPCs, configure NetFlow/IPFIX export for on-premises network devices, and centralize network flow analysis. Document the secure access procedures and network monitoring architecture.",
              check:
                "Secure access implemented with SSO + MFA for console, short-lived credentials for CLI/API, bastion/VPN for SSH/RDP, session logging enabled, and network flow monitoring operational",
            },
          ],
        },
      ],
    },
    {
      week: 3,
      title: "L3 Verifier — CIS Controls 13-18 (Monitoring, Awareness, Providers, AppSec, Incident, Pentest)",
      description:
        "Implement network monitoring, security awareness training, service provider management, application security, incident response, and penetration testing controls.",
      days: [
        {
          day: 35,
          title: "CIS Control 13 — Network Monitoring & Control + Control 14 — Security Awareness",
          tasks: [
            {
              title:
                "Deploy network monitoring and intrusion detection across all environments",
              control:
                "CIS Control 13.1 — Centralized Network Monitoring, CIS Control 13.2 — Network Intrusion Detection",
              how: "Deploy centralized network monitoring and intrusion detection. For AWS: deploy VPC Flow Logs to a centralized SIEM, enable GuardDuty for network threat detection, deploy AWS Network Firewall for inline IPS. For Azure: deploy NSG flow logs to Sentinel, enable Azure Firewall Premium with IDPS, configure Azure DDoS Protection. For GCP: deploy VPC Flow Logs to Chronicle SIEM, enable Cloud IDS for network threat detection. For Alibaba: deploy VPC flow logs to SLS, configure Cloud Firewall with IPS. Build correlation rules for: unusual data transfer patterns, port scanning, lateral movement, command-and-control communication, and data exfiltration. Centralize all network monitoring in a single SIEM for unified visibility.",
              check:
                "Network monitoring deployed across all four clouds with IDS/IPS enabled, flow logs centralized in SIEM, correlation rules for top attack patterns, and unified visibility achieved",
            },
            {
              title:
                "Implement DNS monitoring and web content filtering",
              control:
                "CIS Control 13.3 — DNS Filtering, CIS Control 13.4 — Web Content Filtering",
              how: "Implement DNS monitoring and web content filtering. Deploy DNS filtering: AWS Route 53 Resolver DNS Firewall with managed rule domains, Azure DNS Proxy with threat intelligence feeds, GCP Cloud DNS with DNS policies, or Alibaba Cloud DNS with security features. Configure web content filtering: block known malicious domains, block uncategorized high-risk domains, enforce HTTPS-only for sensitive sites, and log all DNS queries for forensic purposes. Implement web proxy: deploy transparent or explicit web proxy for all outbound traffic, configure SSL inspection for enterprise-managed devices, and log all web access for monitoring. Configure alerting for: DNS tunneling attempts, connections to known C2 domains, and bulk data transfer to uncategorized destinations.",
              check:
                "DNS filtering deployed with managed threat intelligence, web content filtering operational, DNS query logging enabled, and web access logging configured",
            },
            {
              title:
                "Launch a security awareness and skills training program",
              control:
                "CIS Control 14.1 — Security Awareness Program, CIS Control 14.2 — Awareness Training",
              how: "Establish a security awareness and skills training program. For all employees: onboarding security training (password hygiene, phishing recognition, data handling, incident reporting), quarterly phishing simulations (with training for those who click), annual comprehensive security review. For technical staff: secure coding training (OWASP Top 10, cloud security), annual security skills development. For privileged users: advanced security training (social engineering resistance, privilege escalation awareness). Implement training delivery: LMS-based training modules, phishing simulation platform (KnowBe4, Proofpoint, or open-source), and training completion tracking. Configure mandatory re-training for users who fail phishing simulations. Document the training program, completion rates, and phishing simulation results.",
              check:
                "Security awareness program launched with onboarding, quarterly phishing simulations, annual training, technical staff secure coding training, and completion tracking operational",
            },
          ],
        },
        {
          day: 42,
          title: "CIS Control 15 — Service Provider Management + Control 16 — Application Security",
          tasks: [
            {
              title:
                "Implement service provider security assessment and monitoring",
              control:
                "CIS Control 15.1 — Service Provider Assessment, CIS Control 15.2 — Minimum Security Requirements",
              how: "Establish a service provider security assessment and monitoring program. Create a service provider register: list all third-party services processing, storing, or transmitting your data. For each provider: assess security posture (SOC 2 report, ISO 27001 certification, or security questionnaire), document data shared, and define minimum security requirements (encryption, access controls, incident notification). For cloud providers: review shared responsibility model, verify compliance certifications (SOC 2, ISO 27001, PCI DSS). For SaaS providers: request SOC 2 Type II reports, verify security controls, and assess incident notification procedures. Implement ongoing monitoring: quarterly review of provider compliance status, annual reassessment of critical providers, and immediate assessment when incidents occur. Execute Data Processing Agreements (DPAs) with all providers handling personal data.",
              check:
                "Service provider register created with all providers assessed, minimum security requirements defined, SOC 2/certification verified for each, and ongoing monitoring scheduled",
            },
            {
              title:
                "Implement application security controls in the SDLC",
              control:
                "CIS Control 16.1 — Application Security Program, CIS Control 16.2 — Security in Development",
              how: "Implement application security controls integrated into the Software Development Lifecycle (SDLC). Pre-commit: secret scanning (Gitleaks, TruffleHog), linting, and formatting. Code review: mandatory peer review for all changes, security-focused review for high-risk changes. Build: SAST scanning (SonarQube, Semgrep, CodeQL), dependency vulnerability scanning (Snyk, Dependabot), container image scanning (Trivy). Test: DAST scanning (OWASP ZAP, Burp Suite), API security testing (Postman security tests, OWASP API Security Top 10). Deploy: infrastructure-as-code scanning (Checkov, tfsec, cfn-nag), configuration validation, and deployment approval gates. Post-deploy: runtime application self-protection (RASP), continuous dependency monitoring, and security incident detection. Document the SDLC security gates and SLA for each check.",
              check:
                "Application security controls implemented across all SDLC phases with SAST, DAST, dependency scanning, container scanning, IaC scanning, and security gates at each stage",
            },
            {
              title:
                "Implement secure API development and API security testing",
              control:
                "CIS Control 16.3 — Secure API Development",
              how: "Implement API security controls aligned with OWASP API Security Top 10. For authentication: implement OAuth 2.0 with short-lived tokens, API key management with rotation, and MFA for administrative APIs. For authorization: implement RBAC at the API level, validate permissions for every request, and prevent horizontal/vertical privilege escalation. For input validation: validate all API inputs against schemas (OpenAPI specs), reject malformed requests, and implement rate limiting per client. For transport security: enforce TLS 1.3, implement mTLS for service-to-service APIs, and disable legacy TLS versions. For monitoring: log all API access, implement anomaly detection for unusual API patterns, and alert on abuse. Test APIs using automated API security testing tools (42Crunch, APIsec, Burp Suite API scanning).",
              check:
                "API security implemented with OAuth 2.0 authentication, RBAC authorization, schema validation, TLS 1.3, rate limiting, and automated API security testing in CI/CD",
            },
          ],
        },
        {
          day: 48,
          title: "CIS Control 17 — Incident Response & Management + Control 18 — Penetration Testing",
          tasks: [
            {
              title:
                "Build and test a comprehensive incident response plan",
              control:
                "CIS Control 17.1 — Incident Response Plan, CIS Control 17.2 — Incident Handling",
              how: "Build a comprehensive incident response plan. Define: incident classification (P0-P4 based on data impact, service impact, and scope), roles and responsibilities (commander, technical lead, communications, legal, scribe), communication procedures (internal escalation, customer notification, regulatory notification), evidence preservation requirements, and post-incident review process. Implement incident response procedures: detection and triage (SIEM alerts, user reports, threat intelligence), containment (isolate affected systems, revoke compromised credentials), eradication (remove threat actor access, patch vulnerabilities), recovery (restore systems, verify integrity), and post-incident (blameless postmortem, improvement actions). Deploy incident response tooling: ticketing system with incident classification, communication channel (war room), and evidence collection tools. Conduct tabletop exercises quarterly.",
              check:
                "Incident response plan documented with classification, roles, communication procedures, and evidence preservation; quarterly tabletop exercises scheduled; incident tooling deployed",
            },
            {
              title:
                "Implement incident response automation and playbooks",
              control:
                "CIS Control 17.3 — Incident Response Training, CIS Control 17.4 — Incident Response Testing",
              how: "Build automated incident response playbooks for common scenarios. For AWS: build Lambda functions for automated response to GuardDuty findings (isolate EC2, revoke IAM keys, snapshot EBS). For Azure: build Logic Apps playbooks for Sentinel automated response (block IPs, disable accounts, create tickets). For GCP: build Cloud Functions for Chronicle SOAR automated response. For Alibaba: build EventBridge rules for automated response to Security Center findings. Common playbooks: brute force detection and account lockout, malware detection and host isolation, data exfiltration detection and network isolation, unauthorized access and credential revocation, and DDoS detection and mitigation. Test playbooks quarterly with purple team exercises. Document playbook library with trigger conditions, response actions, and escalation procedures.",
              check:
                "Automated incident response playbooks deployed for top 5 scenarios across all clouds, playbook testing scheduled quarterly, and playbook library documented",
            },
            {
              title:
                "Plan and scope an annual penetration testing program",
              control:
                "CIS Control 18.1 — Penetration Testing Program, CIS Control 18.2 — Remediation of Security Findings",
              how: "Plan and scope an annual penetration testing program. Define scope: external network perimeter (all public-facing IPs and domains), web application layer (OWASP Top 10 + API security), cloud infrastructure (AWS/Azure/GCP/Alibaba misconfigurations), internal network (post-perimeter breach scenario), and social engineering (phishing simulations). Engage a qualified third-party pen testing firm or build internal red team capabilities. Tools: Burp Suite Pro, Nmap, Metasploit, cloud-specific scanners (ScoutSuite, Prowler, CloudSploit). Document testing methodology (OWASP Testing Guide, PTES, NIST SP 800-115). Track findings with severity ratings and remediation timelines: Critical = 24 hours, High = 7 days, Medium = 30 days, Low = 90 days. Ensure pen tests occur at least annually with ad-hoc tests after significant changes.",
              check:
                "Annual pen testing program scoped covering external, application, cloud infrastructure, and social engineering; third-party firm engaged or internal capability built; finding remediation SLAs defined",
            },
            {
              title:
                "Implement continuous pen testing and red team capabilities",
              control:
                "CIS Control 18.3 — Continuous Penetration Testing",
              how: "Implement continuous security testing beyond annual pen tests. Deploy automated security testing: DAST scanning in CI/CD (OWASP ZAP, Nikto), continuous attack surface monitoring (Shodan, Censys for external exposure), and cloud security scanning (Prowler for AWS, ScoutSuite for multi-cloud). Implement bug bounty program (optional but recommended for mature startups): use platforms like HackerOne or Bugcrowd with defined scope, rules of engagement, and reward structure. Conduct internal red team exercises quarterly: test detection and response capabilities, validate SIEM coverage, and measure mean-time-to-detect (MTTD) and mean-time-to-respond (MTTR). Document the continuous testing program, findings trends, and improvement metrics.",
              check:
                "Continuous security testing deployed with DAST in CI/CD, attack surface monitoring, quarterly internal red team exercises, and MTTD/MTTR metrics tracked",
            },
          ],
        },
      ],
    },
    {
      week: 4,
      title: "L4 Certified — CIS Implementation Groups, Multi-Cloud Hardening & Compliance Mapping",
      description:
        "Master CIS Implementation Groups (IG1/IG2/IG3) for startup-appropriate scoping, implement CIS Benchmarks across all cloud providers, map CIS Controls to other frameworks, and establish continuous compliance.",
      days: [
        {
          day: 55,
          title: "CIS Implementation Groups (IG1/IG2/IG3) for Startup Scoping",
          tasks: [
            {
              title:
                "Assess current CIS Implementation Group alignment and identify gaps",
              control:
                "CIS Controls v8 — Implementation Groups (IG1, IG2, IG3)",
              how: "Assess current CIS Controls implementation against the three Implementation Groups. IG1 (Essential Cyber Hygiene — 56 safeguards): the baseline for ALL organizations, designed for small/medium businesses with limited IT and security expertise. IG2 (Enterprise — 74 additional safeguards): for organizations with moderate resources and risk. IG3 (Sensitive — 74 additional safeguards): for mature organizations with dedicated security teams and high-risk data. Map your current controls to each IG. For each unimplemented safeguard: assess effort, risk, and priority. Focus startup effort on achieving full IG1 compliance first — this is the CIS recommendation for all organizations regardless of size. Document the IG assessment with pass/fail status per safeguard and a remediation roadmap prioritizing IG1 gaps.",
              check:
                "CIS IG assessment completed with pass/fail per safeguard, IG1 gaps identified and prioritized for remediation, and remediation roadmap documented",
            },
            {
              title:
                "Achieve CIS IG1 baseline for essential cyber hygiene",
              control:
                "CIS IG1 — Essential Cyber Hygiene (56 Safeguards)",
              how: "Execute remediation plan for all IG1 (Essential Cyber Hygiene) gaps. Key IG1 controls to verify: CIS 1.1 (asset inventory), CIS 2.1 (software inventory), CIS 3.4 (data classification), CIS 4.1 (secure configurations), CIS 5.1 (centralized account management), CIS 6.1 (access control), CIS 7.1 (vulnerability scanning), CIS 8.1 (audit logging), CIS 9.1 (email security), CIS 10.1 (anti-malware), CIS 11.1 (automated backups), CIS 12.1 (network configuration), CIS 13.1 (network monitoring), CIS 14.1 (security awareness), CIS 15.1 (service provider assessment), CIS 16.1 (application security), CIS 17.1 (incident response), CIS 18.1 (pen testing program). For each safeguard: verify implementation, document evidence, and record any exceptions with justification.",
              check:
                "All 56 IG1 safeguards verified as implemented, evidence documented for each, exceptions justified, and IG1 compliance confirmed",
            },
            {
              title:
                "Map IG2 and IG3 gaps to prioritized implementation roadmap",
              control:
                "CIS IG2 — Enterprise (74 Safeguards), CIS IG3 — Sensitive (74 Safeguards)",
              how: "Map IG2 and IG3 gaps to a prioritized implementation roadmap. For IG2 (Enterprise): focus on controls that provide the highest security ROI for your risk profile — typically data protection (CIS 3.3-3.4), network monitoring (CIS 13.2-13.4), and application security (CIS 16.2-16.4). For IG3 (Sensitive): defer to future roadmap unless you process highly sensitive data or face advanced threats — includes penetration testing automation (CIS 18.3), data loss prevention (CIS 3.5), and advanced monitoring. Create a 12-month roadmap with quarterly milestones for IG2 implementation. Estimate resource requirements (personnel, tools, budget) for each quarter. Align IG2/IG3 implementation with other compliance frameworks you're pursuing (SOC 2, GDPR, etc.) to maximize efficiency.",
              check:
                "IG2 and IG3 gaps mapped to prioritized roadmap with 12-month timeline, quarterly milestones, resource estimates, and alignment with other compliance frameworks documented",
            },
          ],
        },
        {
          day: 60,
          title: "CIS Benchmarks — Cloud-Specific Hardening for AWS, Azure, GCP, Alibaba",
          tasks: [
            {
              title:
                "Apply CIS AWS Foundations Benchmark and CIS Amazon Linux/Ubuntu Benchmarks",
              control:
                "CIS AWS Foundations Benchmark, CIS Amazon Linux/Ubuntu Benchmark",
              how: "Apply CIS AWS Foundations Benchmark across all AWS accounts. Key controls: IAM password policy (18+ characters, complexity, 90-day rotation), MFA for root and IAM users, CloudTrail enabled in all regions, S3 bucket public access blocked, Security Group rules restricted, VPC flow logs enabled, and encryption configured for EBS, RDS, and S3. For EC2 instances: apply CIS Amazon Linux 2 Benchmark or CIS Ubuntu Linux Benchmark — OS hardening including file permissions, audit logging, network configuration, and service restrictions. Automate deployment using Systems Manager State Manager or Ansible. Configure Config Rules to continuously evaluate CIS Benchmark compliance. Run Prowler or ScoutSuite for CIS Benchmark assessment.",
              check:
                "CIS AWS Foundations Benchmark applied to all accounts, CIS OS Benchmarks applied to all EC2 instances, Config Rules for continuous compliance, and assessment tool confirms compliance",
            },
            {
              title:
                "Apply CIS Azure Foundations Benchmark, CIS GCP Foundation Benchmark, and CIS Kubernetes Benchmark",
              control:
                "CIS Azure Foundations Benchmark, CIS GCP Foundation Benchmark, CIS Kubernetes Benchmark",
              how: "Apply CIS benchmarks across Azure, GCP, and Kubernetes. For Azure: deploy CIS Azure Foundations Benchmark controls — Entra ID security defaults, Azure Policy for compliance, Defender for Cloud Standard tier, NSG rules, storage encryption, and logging. For GCP: apply CIS GCP Foundation Benchmark — Organization Policy constraints, IAM bindings, VPC firewall rules, Cloud SQL configurations, and audit logging. For Kubernetes: run kube-bench to assess CIS Kubernetes Benchmark compliance — API server configuration, etcd encryption, RBAC, network policies, pod security, and secrets management. Automate remediation using IaC (Terraform modules for CIS compliance). Document the benchmark compliance status per cloud provider.",
              check:
                "CIS Azure, GCP, and Kubernetes Benchmarks applied with automated compliance via IaC, assessment tools confirming compliance, and documentation updated",
            },
            {
              title:
                "Apply CIS Benchmarks for Docker, databases, and other technology components",
              control:
                "CIS Docker Benchmark, CIS MySQL/PostgreSQL/MongoDB Benchmark",
              how: "Apply CIS Benchmarks to Docker, databases, and other components. For Docker: apply CIS Docker Benchmark — daemon configuration, container runtime, image build, container runtime security, and container runtime security. Use Docker Bench for Security to automate assessment. For databases: apply CIS MySQL Benchmark or CIS PostgreSQL Benchmark — authentication, authorization, encryption, auditing, and network configuration. For browsers: apply CIS Browser Benchmarks (Chrome, Firefox) for enterprise browser hardening. Automate benchmark deployment using configuration management (Ansible, Puppet, Chef) or IaC (Terraform). Document the benchmark compliance status per technology component.",
              check:
                "CIS Benchmarks applied to Docker, databases, and browsers; automated assessment tools configured; and compliance status documented per component",
            },
            {
              title:
                "Map CIS Benchmarks to other compliance frameworks for unified compliance",
              control:
                "CIS Benchmarks Cross-Framework Mapping",
              how: "Map CIS Benchmark controls to other compliance frameworks for unified compliance. Key mappings: CIS AWS Foundations Benchmark → SOC 2 CC6/CC7, CIS Azure Foundations Benchmark → SOC 2 CC6/CC7, CIS GCP Foundation Benchmark → SOC 2 CC6/CC7, CIS Kubernetes Benchmark → SOC 2 CC6.6. Create a cross-reference matrix: each CIS control maps to the equivalent control in SOC 2, GDPR, LGPD, PDPA, and PIPL. Use this mapping to demonstrate compliance across multiple frameworks with a single technical control implementation. Document the mapping and use it in audit evidence packages to reduce audit scope for other frameworks. This is especially valuable for startups pursuing SOC 2 alongside CIS compliance.",
              check:
                "CIS-to-framework cross-reference matrix completed for SOC 2, GDPR, LGPD, PDPA, and PIPL; mapping used in audit evidence packages; and compliance duplication eliminated",
            },
          ],
        },
        {
          day: 65,
          title: "CIS Compliance Monitoring, Reporting & Continuous Improvement",
          tasks: [
            {
              title:
                "Deploy continuous CIS compliance monitoring with automated scoring",
              control:
                "CIS Controls v8 — Continuous Compliance Monitoring",
              how: "Deploy automated CIS compliance monitoring across all environments. For AWS: use AWS Security Hub with CIS AWS Foundations Benchmark standard, Config Rules for CIS-specific checks. For Azure: use Microsoft Defender for Cloud with CIS Azure Foundations Benchmark standard, Azure Policy for CIS controls. For GCP: use Security Command Center with CIS GCP Foundation Benchmark scanning. For Alibaba: use Security Center and Cloud Config with CIS-aligned rules. Configure continuous compliance scoring: calculate the percentage of CIS safeguards implemented per Implementation Group. Generate monthly compliance reports showing CIS score trends. Configure alerting for compliance drift (score decrease or critical control failure).",
              check:
                "Continuous CIS compliance monitoring deployed across all clouds with automated scoring, monthly reports generated, and alerting for compliance drift configured",
            },
            {
              title:
                "Build CIS compliance dashboard and executive reporting",
              control:
                "CIS Controls v8 — Compliance Reporting",
              how: "Build a CIS compliance dashboard for technical and executive audiences. Technical dashboard: CIS score per Implementation Group, control-by-control compliance status, trend over time, and remediation status for open gaps. Executive dashboard: overall CIS compliance percentage, IG1 compliance status (critical for startup board/management), key risk indicators, and comparison to industry benchmarks. Implement using cloud-native BI tools (AWS QuickSight, Azure Power BI, GCP Looker) or a custom React dashboard. Configure automated weekly reports for the security team and monthly reports for management. Include drill-down capability from high-level score to individual safeguard details.",
              check:
                "CIS compliance dashboard deployed with technical and executive views, automated weekly and monthly reports configured, and drill-down capability implemented",
            },
          ],
        },
        {
          day: 70,
          title: "CIS Program Governance, Annual Review & Startup Optimization",
          tasks: [
            {
              title:
                "Establish annual CIS Controls review and update process",
              control:
                "CIS Controls v8 — Annual Program Review",
              how: "Establish an annual CIS Controls review process. Annually: re-assess CIS Implementation Group alignment (should you move from IG1 to IG2?), review all safeguard implementations for continued effectiveness, update the CIS compliance score, assess new CIS Controls additions or updates, and realign the roadmap with business changes. During review: identify controls that are now automated (reducing manual effort), controls that need updating due to technology changes, and new risks requiring additional controls. Update the CIS compliance dashboard, documentation, and training materials. Present annual review results to executive leadership with recommendations for the next year's CIS investment. Document the review process and results.",
              check:
                "Annual CIS review process established with re-assessment, effectiveness review, roadmap update, and executive presentation scheduled",
            },
            {
              title:
                "Optimize CIS implementation for startup resource constraints",
              control:
                "CIS Controls v8 — Startup-Optimized Implementation",
              how: "Optimize CIS implementation for startup resource constraints. Focus on highest-impact, lowest-effort controls first: MFA enforcement (1 hour, massive security improvement), CloudTrail/ActionTrail enabling (30 minutes, compliance evidence), automated backup (1 day, data protection), and vulnerability scanning (1 day, threat visibility). Use cloud-native tools: most CIS controls can be implemented using built-in cloud services at no additional cost (AWS Config, Azure Policy, GCP SCC, Alibaba Config). Leverage open-source tools: Trivy for container scanning, Prowler for AWS assessment, kube-bench for Kubernetes compliance. Automate evidence collection: use scripts to automatically gather CIS compliance evidence, reducing manual audit preparation effort. Document the startup-optimized CIS implementation strategy with resource estimates per control.",
              check:
                "CIS implementation optimized for startup constraints with highest-impact controls prioritized, cloud-native tools leveraged, open-source tools deployed, and evidence collection automated",
            },
            {
              title:
                "Conduct CIS compliance tabletop exercise and gap remediation sprint",
              control:
                "CIS Controls v8 — Compliance Validation",
              how: "Conduct a tabletop exercise simulating a CIS compliance audit or security incident. Scenario: external auditor requests evidence of CIS Controls implementation while a security incident occurs. Walk through: evidence gathering from automated dashboards, incident response execution using documented procedures, communication to management, and audit evidence compilation. Identify gaps in evidence, procedures, or controls. Follow up with a gap remediation sprint: assign remaining CIS gaps to engineering sprints, prioritize critical gaps, and track completion. Document the tabletop exercise results, remediation sprint outcomes, and updated compliance status.",
              check:
                "Tabletop exercise completed with evidence gaps identified, remediation sprint planned and executed, and updated compliance status documented",
            },
            {
              title:
                "Document CIS Controls mapping to customer security questionnaires",
              control:
                "CIS Controls v8 — Customer-Facing Compliance",
              how: "Document CIS Controls implementation as evidence for customer security questionnaires and due diligence requests. Create a CIS-to-questionnaire mapping: map CIS safeguards to common questionnaire frameworks (SIG Lite, CAIQ, HECVAT, custom questionnaires). Build a customer-facing CIS compliance summary: executive summary of CIS implementation status, key controls implemented per IG, and evidence of continuous monitoring. Prepare a CIS compliance artifact package: automated compliance reports, pen test results, vulnerability scan summaries, and security awareness training records. This package accelerates sales cycles by pre-answering common security questions.",
              check:
                "CIS-to-questionnaire mapping completed for common frameworks, customer-facing compliance summary prepared, and CIS compliance artifact package ready for sales use",
            },
          ],
        },
      ],
    },
  ],
};

export default function Cis() {
  return <LearningFrameworkPage framework={FRAMEWORK} />;
}

export { FRAMEWORK };
