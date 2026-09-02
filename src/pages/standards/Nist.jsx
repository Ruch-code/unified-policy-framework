import LearningFrameworkPage from "../../components/LearningFrameworkPage";

const FRAMEWORK = {
  id: 'nist',
  name: 'NIST CSF 2.0',
  region: 'United States',
  color: 'navy',
  weeks: [
    {
      week: 1,
      title: 'Foundation: Functions, Categories & Framework Profiles',
      days: 'Days 1-7',
      description: 'Master the six NIST CSF 2.0 functions, core categories/subcategories, and framework profiles and tiers',
      tasks: [
        {
          title: 'Map all six CSF 2.0 functions to your organisation',
          control: 'Govern (GV), Identify (ID), Protect (PR), Detect (DE), Respond (RS), Recover (RC) — the six core functions and their 22 categories',
          how: 'Create a CSF 2.0 function matrix in a spreadsheet. List every category and subcategory (e.g. GV.OC-01 through RC.CO-04). Tag each row with the owning business unit. For a multi-cloud estate, annotate which cloud provider (AWS, Azure, GCP, Alibaba Cloud) each subcategory applies to — for example, GV.OC-01 maps to AWS Organizations SCPs, Azure Management Groups, and GCP org policies.',
          check: 'Export the completed matrix. Count: 22 categories covered, every subcategory assigned to an owner, and at least three cloud providers annotated where applicable.'
        },
        {
          title: 'Build your CSF 2.0 current-state profile',
          control: 'Framework profiles (Art. 45–46 of NIST IR 8374) capture current and target security outcomes. Tiers (1–4) rate risk management sophistication.',
          how: 'Use the NIST CSF 2.0 Profile Template (available at nist.gov). For each subcategory mark the current tier (1–4) and the desired target tier. Separate profiles for production, staging, and development environments — e.g. production tiers should target Tier 3 (Repeatable) minimum, development can target Tier 2 (Risk Informed).',
          check: 'Verify: current-state and target profiles completed, each environment tier assigned, gaps between current and target clearly quantified with at least 20 subcategories showing a tier delta.'
        },
        {
          title: 'Document governance structure aligned to GV function',
          control: 'GV.OC (Organizational Context), GV.RM (Risk Management Strategy), GV.RR (Roles, Responsibilities, Authorities), GV.PO (Policy) require board-level governance and cybersecurity oversight',
          how: 'Draft a cybersecurity governance charter. Define: (1) board/committee oversight cadence, (2) CISO reporting line, (3) risk appetite statement, (4) policy hierarchy. In a multi-cloud setup, define cloud-specific governance roles — e.g. AWS Control Tower landing zone owners, Azure Policy compliance officers, GCP组织policy admins.',
          check: 'Governance charter signed off, risk appetite quantified, all three cloud environments have named governance owners, board receives quarterly cyber risk briefing.'
        },
        {
          title: 'Establish risk assessment process per ID.RA',
          control: 'ID.RA-01 through ID.RA-06 cover vulnerability identification, threat intelligence, likelihood/impact analysis, and risk determination',
          how: 'Implement a recurring risk assessment process: (1) Asset inventory via AWS Config, Azure Resource Graph, GCP Cloud Asset Inventory, (2) Threat intel feeds integrated into SIEM, (3) Likelihood × Impact scoring matrix, (4) Risk register in GRC tool. Separate risk registers for production, staging, and dev environments — production assets require formal risk acceptance by CISO.',
          check: 'Risk register populated with ≥50 identified risks, each scored using likelihood × impact, production risks above threshold escalated to CISO, assessment repeats quarterly.'
        },
        {
          title: 'Manage supply chain risks per GV.SC and ID.SC',
          control: 'GV.SC-01 through GV.SC-11 and ID.SC-01 through ID.SC-04 address cybersecurity supply chain risk management including third-party assessments and SBOM requirements',
          how: 'Create a supply chain risk register: (1) Inventory all ICT service providers, managed service providers, cloud providers, (2) Tier vendors by criticality, (3) Require SOC 2 Type II or ISO 27001 attestation from Tier 1 vendors, (4) Collect SBOMs for all software dependencies. For cloud providers, review shared responsibility models — AWS artifact, Azure Service Trust Portal, GCP compliance reports.',
          check: 'All Tier 1 vendors assessed, SBOMs collected for top 20 software dependencies, cloud provider shared responsibility documented per environment, annual vendor re-assessment scheduled.'
        }
      ]
    },
    {
      week: 2,
      title: 'Implementer: Protective Controls & Subcategory Implementation',
      days: 'Days 8-14',
      description: 'Implement PR function controls, map to ISO/IEC 27001 and COBIT, and deploy NIST subcategory-level protections across environments',
      tasks: [
        {
          title: 'Implement identity & access management per PR.AA',
          control: 'PR.AA-01 (identity management), PR.AA-02 (authentication), PR.AA-03 (access control), PR.AA-04 (identity assertion) — equivalent to ISO 27001 A.5.15–A.5.18 and COBIT DSS05',
          how: 'Deploy identity controls: (1) AWS IAM with SCP boundaries per environment, (2) Azure AD Conditional Access with MFA enforced for all production access, (3) GCP Workforce Identity Federation, (4) Alibaba RAM policies. Implement least privilege — production requires MFA + device posture check, staging allows MFA-only, dev allows SSO. Privileged access via AWS SSM Session Manager or Azure PIM with just-in-time elevation.',
          check: 'MFA enforced for all production and staging accounts, least-privilege policies audited quarterly, PIM/just-in-time configured for admin access, no long-lived access keys in production.'
        },
        {
          title: 'Deploy data security controls per PR.DS',
          control: 'PR.DS-01 (data-at-rest protection), PR.DS-02 (data-in-transit), PR.DS-10 (data-in-use for confidential computing), PR.DS-11 (data disposal) — maps to ISO 27001 A.8.10, A.8.24',
          how: 'Encrypt everything: (1) AWS KMS with customer-managed keys for S3, EBS, RDS; enable S3 Object Lock for immutable backups, (2) Azure Disk Encryption + Key Vault HSM for databases, (3) GCP CMEK for Cloud Storage and BigQuery, (4) Alibaba KMS for OSS and RDS. Enforce TLS 1.3 for data-in-transit. Use AWS Nitro Enclaves or Azure Confidential Computing for data-in-use. Implement automated key rotation on 90-day cycles.',
          check: 'All storage encrypted with CMKs, TLS 1.3 enforced at load balancers, key rotation enabled, confidential computing tested for one production workload, data disposal procedures documented per environment.'
        },
        {
          title: 'Establish configuration management per PR.IP',
          control: 'PR.IP-01 (baseline configurations), PR.IP-02 (configuration change control), PR.IP-03 (configuration change review), PR.IP-12 (vulnerability management plan) — maps to COBIT BAI06 and ISO 27001 A.8.9',
          how: 'Build IaC-based configuration management: (1) AWS Control Tower with GuardDuty detective guardrails, (2) Azure Policy initiative definitions for compliance baselines, (3) GCP Organization Policies + Config Validator, (4) Alibaba Cloud Config. All infrastructure deployed via Terraform/OpenTofu with plan review. Configuration drift detected by AWS Config rules, Azure Monitor, GCP Security Command Center. Separate IaC stacks for production (requires 2 approvals), staging (1 approval), dev (auto-merge).',
          check: 'All environments defined in IaC, drift detection enabled on all three clouds, change control process documented, production requires two-person approval, no manual configuration changes in production.'
        },
        {
          title: 'Implement network segmentation per PR.PT',
          control: 'PR.PT-04 (network monitoring), PR.PT-05 (resource isolation), PR.PT-01 (audit logs) — maps to ISO 27001 A.8.22, A.8.20, A.8.15',
          how: 'Segment networks across environments: (1) AWS VPCs per environment with transit gateway, PrivateLink for service access, Security Groups + NACLs, (2) Azure VNet with NSGs and Azure Firewall, (3) GCP VPC with firewall rules and Cloud Armor, (4) Alibaba VPC with security groups. Implement zero-trust principles — no implicit trust between segments. Deploy VPC Flow Logs, Azure NSG Flow Logs, GCP VPC Flow Logs to SIEM. Use AWS Network Firewall or Azure Firewall Premium for east-west inspection.',
          check: 'Production, staging, and dev in separate network segments, no direct connectivity from dev to production, flow logs forwarded to SIEM, zero trust policies enforced, firewall rules reviewed quarterly.'
        },
        {
          title: 'Roll out security awareness training per PR.AT',
          control: 'PR.AT-01 (awareness and training), PR.AT-02 (privileged user training), PR.AT-03 (third-party training) — maps to ISO 27001 A.6.3 and COBIT DSS04',
          how: 'Implement role-based training: (1) All staff: quarterly phishing simulations with mandatory remedial training, (2) Developers: secure coding training (OWASP Top 10, cloud-native security), (3) DevOps: cloud security posture management training (AWS Security Specialty content, Azure Security Engineer), (4) Privileged users: tabletop exercise participation. Track completion in LMS. Production incident responders receive quarterly red team exercise participation.',
          check: '100% staff phishing training completion, developer secure coding certification, privileged user tabletop exercise participation logged, third-party contractor training tracked, training records retained 3 years.'
        }
      ]
    },
    {
      week: 3,
      title: 'Verifier: Detection, Response & Continuous Monitoring',
      days: 'Days 15-21',
      description: 'Assess control effectiveness, validate detection and response capabilities, develop CSF profiles, and ensure continuous monitoring',
      tasks: [
        {
          title: 'Validate detection controls per DE function',
          control: 'DE.AE-02 (anomaly analysis), DE.CM-01 (network monitoring), DE.CM-03 (personnel activity), DE.CM-09 (hardware/software) — maps to ISO 27001 A.8.16, A.8.16',
          how: 'Test detection coverage: (1) AWS GuardDuty finding validation — trigger test findings and measure detection-to-alert time, (2) Azure Sentinel analytics rule testing, (3) GCP Chronicle SIEM detection rules, (4) Alibaba Cloud Threat Detection Service alerts. Validate that SIEM ingests CloudTrail (AWS), Activity Log (Azure), Audit Log (GCP), ActionTrail (Alibaba). Measure MTTD across all four clouds. Run atomic red team tests against production-like staging environment.',
          check: 'All four cloud provider audit logs flowing to SIEM, ≥10 atomic red team detections validated, MTTD documented per cloud, detection rules tested monthly, no blind spots in production monitoring.'
        },
        {
          title: 'Conduct incident response tabletop exercise',
          control: 'RS.RP-01 (response plan executed), RS.AN-03 (forensics), RS.MI-01 (incidents triaged), RS.CO-02 (external stakeholders notified) — maps to ISO 27001 A.5.24–A.5.28',
          how: 'Run quarterly tabletop exercises: (1) Scenario: ransomware affecting production AWS workloads and Azure AD, (2) Include IT, OT, legal, communications, executive leadership, (3) Test communication flows — internal Slack/Teams, external notification to customers, regulators, (4) Practice forensic evidence preservation in AWS (snapshot EBS, preserve CloudTrail), Azure (preserve audit logs), GCP (export audit logs to BigQuery). Document lessons learned and update IR playbook.',
          check: 'Tabletop completed quarterly, all stakeholders participated, IR playbook updated with lessons learned, forensic evidence preservation tested in each cloud, external notification templates tested, RTO/RPO validated.'
        },
        {
          title: 'Perform self-assessment against CSF tiers',
          control: 'NIST CSF 2.0 Tiers (1: Partial, 2: Risk Informed, 3: Repeatable, 4: Adaptive) measure risk management sophistication across the organization',
          how: 'Complete tier assessment for each function: (1) Use NIST CSF Tier Assessment Tool, (2) Production environment should target Tier 3 (Repeatable) minimum, staging Tier 2+, dev Tier 2, (3) Interview system owners and document evidence for each tier characteristic, (4) Compare current vs target tiers. For multi-cloud, assess each provider independently — e.g. AWS may be Tier 3, Alibaba Tier 2, requiring targeted improvements.',
          check: 'Tier assessment completed for all six functions, current and target tiers documented per environment, multi-cloud gaps identified with remediation plan, assessment reviewed by CISO, formal reassessment scheduled annually.'
        },
        {
          title: 'Establish continuous monitoring programme per DE.CM',
          control: 'DE.CM-01 through DE.CM-10 require continuous monitoring of networks, personnel, and technology — maps to COBIT DSS05 and ISO 27001 A.8.16',
          how: 'Build continuous monitoring: (1) AWS Security Hub aggregated findings across accounts, (2) Azure Defender for Cloud regulatory compliance dashboards, (3) GCP Security Command Center Premium, (4) Alibaba Cloud Security Center. Integrate into a unified GRC dashboard. Automate compliance scoring — production weekly, staging monthly. Define risk thresholds that auto-escalate to CISO. Implement CSPM (Cloud Security Posture Management) across all four clouds.',
          check: 'Unified GRC dashboard operational, automated compliance scoring configured, risk thresholds defined and tested, CSPM deployed on all four cloud providers, weekly production compliance reports generated, findings tracked to remediation SLA.'
        },
        {
          title: 'Assess recovery capabilities per RC function',
          control: 'RC.RP-01 (recovery plan executed), RC.RP-03 (backup integrity validated), RC.CO-03 (recovery activities documented), RC.IM-01 (recovery plans updated) — maps to ISO 27001 A.5.29, A.5.30',
          how: 'Validate recovery: (1) AWS — test cross-region DR with Route 53 failover, restore RDS from automated backup, validate S3 cross-region replication, (2) Azure — test Azure Site Recovery, validate backup of Azure SQL, (3) GCP — test failover with Cloud DNS, restore Cloud SQL from backup, (4) Document RTO/RPO per environment — production RTO <4h, staging RTO <24h, dev RTO <48h. Conduct full DR drill annually, tabletop quarterly.',
          check: 'DR drill completed in last 12 months, RTO/RPO validated per environment, backup integrity verified for all three environments, recovery plan documented and last updated within 6 months, DR drill lessons learned captured.'
        }
      ]
    },
    {
      week: 4,
      title: 'Certified: Integration, Multi-Cloud & Remediation',
      days: 'Days 22-28',
      description: 'Integrate CSF 2.0 with SOC 2, ISO 27001, and HIPAA, deploy multi-cloud controls, automate compliance, and close common gaps',
      tasks: [
        {
          title: 'Map CSF 2.0 to SOC 2, ISO 27001, and HIPAA',
          control: 'Cross-framework mapping reduces duplicate controls. NIST provides official CSF 2.0 to ISO 27001 mapping. SOC 2 Trust Service Criteria map to CSF functions. HIPAA Security Rule maps to PR and DE functions.',
          how: 'Build a unified control framework: (1) Use NIST CSF 2.0 Informative References to map subcategories to ISO 27001 Annex A controls, SOC 2 TSC (CC6.1–CC8.1), and HIPAA §164.308–312, (2) Identify overlapping controls — e.g. PR.AA-01 maps to ISO A.5.15, SOC 2 CC6.1, HIPAA §164.312(a), (3) Implement shared control evidence collection for auditors. Deploy AWS Audit Manager, Azure Compliance Manager, GCP Compliance Reports Manager to automate evidence gathering.',
          check: 'Cross-framework mapping document completed, overlapping controls identified and deduplicated, automated evidence collection configured per cloud, SOC 2 Type II evidence package ready, ISO 27001 audit-ready documentation prepared, HIPAA BAA reviewed with cloud providers.'
        },
        {
          title: 'Deploy multi-cloud security automation',
          control: 'Security orchestration, automated remediation, and policy-as-code across AWS, Azure, GCP, and Alibaba Cloud',
          how: 'Implement automation: (1) AWS Lambda + EventBridge for auto-remediation (e.g. auto-revoke public S3 buckets), (2) Azure Logic Apps + Microsoft Sentinel SOAR for playbook automation, (3) GCP Cloud Functions + Security Command Center notifications, (4) Alibaba EventBridge for event-driven security responses. Deploy policy-as-code: AWS SCPs, Azure Policy definitions, GCP Organization Policy Constraints, Alibaba Cloud Config Rules. Test auto-remediation in staging before production deployment.',
          check: 'Auto-remediation tested for ≥5 common misconfigurations, policy-as-code deployed on all four clouds, SOAR playbooks documented, staging-first deployment pattern enforced, auto-remediation runs in dry-run mode for 2 weeks before production activation.'
        },
        {
          title: 'Address common NIST CSF 2.0 gaps and remediation',
          control: 'Common gaps: weak supply chain risk management (GV.SC), inadequate data governance (GV.OC), insufficient third-party risk assessment, missing incident reporting procedures',
          how: 'Remediate top gaps: (1) Supply chain — deploy vendor risk management platform, require SBOMs from all Tier 1 vendors, integrate threat intel from ISACs, (2) Data governance — classify all data using AWS Macie, Azure Purview, GCP DLP, (3) Third-party risk — automate vendor security questionnaires, require SOC 2 reports, (4) Incident reporting — build automated notification workflows for SEC cyber disclosure rules (4-day materiality determination). Test incident reporting procedures with legal and communications teams.',
          check: 'Top 5 CSF gaps documented with remediation plan, vendor risk platform operational, data classification completed for production data stores, SEC disclosure workflow tested, incident reporting SLA documented and tested.'
        },
        {
          title: 'Implement continuous improvement and metrics programme',
          control: 'GV.4 (Continuous Improvement), GV.OC-01 (mission alignment) — maturity metrics, executive reporting, and regular reassessment drive ongoing CSF alignment',
          how: 'Build metrics programme: (1) Track MTTD (mean time to detect), MTTR (mean time to respond), vulnerability remediation SLA, patch compliance rate across all cloud environments, (2) Produce monthly CSF compliance scorecard per environment, (3) Quarterly board reporting with risk heat map and trend analysis, (4) Annual maturity reassessment. Use AWS QuickSight, Azure Power BI, GCP Looker for dashboards. Benchmark against industry peers using NIST CSF tier progression over time.',
          check: 'Metrics programme defined with ≥10 KPIs, monthly scorecards produced, board receives quarterly briefing, annual maturity assessment completed, KPIs trending positively over 12-month period, benchmark comparison documented.'
        },
        {
          title: 'Conduct final validation and certification readiness',
          control: 'End-to-end validation of all CSF 2.0 functions, external assessment readiness, and organizational certification preparation',
          how: 'Final validation: (1) Run internal audit against all 22 CSF categories using NIST CSF 2.0 assessment tool, (2) Verify all evidence artefacts collected in GRC platform, (3) Conduct pre-audit readiness review with external assessor, (4) Prepare management presentation summarizing CSF posture. For multi-cloud, produce cloud-specific compliance attestations — AWS Compliance Reports, Azure Service Trust Portal, GCP Compliance Resource Center. Document all deviations and compensating controls.',
          check: 'Internal audit completed covering all 22 categories, ≥90% subcategory compliance score, all evidence artefacts collected and organized, external assessor engaged, management presentation prepared, certification readiness confirmed by CISO.'
        }
      ]
    }
  ],
  milestones: [
    { day: 7, label: 'Foundation Complete', color: 'navy' },
    { day: 14, label: 'Implementation Complete', color: 'blue' },
    { day: 21, label: 'Verification Complete', color: 'green' }
  ],
  referenceUrl: 'https://www.nist.gov/cyberframework'
};

export default function Nist() {
  return <LearningFrameworkPage framework={FRAMEWORK} />;
}
