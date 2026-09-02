import LearningFrameworkPage from "../../components/LearningFrameworkPage";

const FRAMEWORK = {
  id: 'sebi',
  name: 'SEBI (Securities and Exchange Board of India)',
  region: 'India',
  color: 'golden',
  weeks: [
    {
      week: 1,
      title: 'SEBI Cyber Security Foundation & Regulatory Scope',
      days: 'Days 1-7',
      description: 'SEBI Cyber Security and Cyber Resilience Framework (CSCRF) for market infrastructure institutions, SEBI regulatory scope, and key cyber security circulars',
      tasks: [
        {
          title: 'Map SEBI CSCRF Requirements to Asset Inventory',
          control: 'CSCRF: Identification and classification of critical systems across market intermediaries',
          how: 'Enumerate all trading platforms, settlement engines, risk management systems, and investor data repositories across production and staging. Tag each asset with SEBI criticality classification (Critical/Important/Standard). Use AWS Config, Azure Resource Graph, and GCP Cloud Asset Inventory to maintain a live CMDB aligned to SEBI\'s definition of critical systems.',
          check: 'Verify CMDB completeness by sampling 20% of assets across AWS, Azure, and GCP. Confirm each asset has a valid SEBI criticality tag. Validate that no untagged production resources exist in any cloud account.'
        },
        {
          title: 'Establish SEBI Regulatory Baseline & Circular Tracker',
          control: 'SEBI regulatory scope: understanding applicable circulars and compliance obligations for MIIs, brokers, and depositories',
          how: 'Build a regulatory tracker mapping all applicable SEBI circulars — Master Circular on Cyber Security (2023), CSCRF for MIIs, SEBI (IT) Regulations 2023, and technology-related circulars. Maintain in a living document with compliance owners, deadlines, and cloud control mapping. Ensure the tracker covers obligations for stock exchanges, clearing corporations, depositories, and intermediaries.',
          check: 'Audit the tracker for completeness against SEBI\'s consolidated circular repository. Verify each circular has assigned owners, implementation status, and evidence references. Cross-check with at least 3 recent SEBI enforcement actions for gaps.'
        },
        {
          title: 'Define Environment Segregation Policy Aligned to SEBI',
          control: 'CSCRF: Logical segregation of critical systems and data environments',
          how: 'Implement network segmentation across AWS VPCs, Azure VNets, and GCP VPCs to separate production, staging, and development environments handling market data. Enforce SEBI\'s requirement that critical systems in production are logically isolated. Use AWS Network Firewall, Azure Firewall, and GCP Cloud Firewall policies to restrict cross-environment traffic. Apply Alibaba Cloud security groups for any China-based intermediaries.',
          check: 'Validate network segmentation by attempting cross-environment access from dev to prod. Confirm firewall logs show blocked attempts. Verify no shared subnets exist between production and non-production environments across all cloud providers.'
        },
        {
          title: 'Implement IAM Baseline with SEBI Access Control Requirements',
          control: 'CSCRF: Access control and identity management for critical systems',
          how: 'Configure AWS IAM, Azure AD, and GCP Cloud Identity with SEBI-aligned role-based access controls. Enforce MFA for all privileged access to critical systems. Implement just-in-time access for production environments. Map access levels to SEBI\'s classification of Critical/Important/Standard systems. Maintain segregation of duties per SEBI IT governance requirements.',
          check: 'Review IAM policies across all cloud accounts. Verify MFA is enforced for 100% of privileged users. Confirm no standing admin access exists in production. Validate role assignments against SEBI system criticality classifications.'
        },
        {
          title: 'Establish Cyber Resilience & Business Continuity Baseline',
          control: 'CSCRF: Business continuity and disaster recovery for critical market infrastructure',
          how: 'Define RTOs and RPOs per SEBI\'s business continuity requirements: critical systems (RTO < 30 min, RPO < 15 min), important systems (RTO < 4 hours, RPO < 1 hour). Document DR architecture across primary AWS region and secondary Azure region. Implement GCP as tertiary cold standby. Configure AWS Backup, Azure Site Recovery, and GCP DR for cross-region replication of critical databases.',
          check: 'Verify RTOs and RPOs documented for all critical systems. Validate DR replication configuration by inspecting backup snapshots across AWS, Azure, and GCP. Confirm standby environments are in a separate geographic region from primary.'
        }
      ]
    },
    {
      week: 2,
      title: 'Implementing SEBI Audit Trails, Log Retention & Critical Systems Protection',
      days: 'Days 8-14',
      description: 'Implementing SEBI cyber security requirements including audit trails, log retention policies, critical systems protection, and disaster recovery',
      tasks: [
        {
          title: 'Deploy Centralized Audit Trail System per SEBI Requirements',
          control: 'SEBI (IT) Regulations: Audit trail of all transactions and access to critical systems with immutable retention',
          how: 'Deploy AWS CloudTrail with organization-wide aggregation, Azure Monitor with Log Analytics, and GCP Cloud Audit Logs with exported sinks to a central SIEM (e.g., Splunk or Elastic). Enable S3 Object Lock, Azure Immutable Blob Storage, and GCP CMEK-locked buckets for audit log immutability. Ensure SEBI\'s minimum 5-year retention for transaction logs and 2-year retention for system logs is enforced.',
          check: 'Verify audit logs are being ingested from all three cloud providers into the central SIEM. Confirm immutability by attempting to delete or modify logs in S3, Azure Blob, and GCP Storage. Validate retention policies are configured to prevent premature deletion.'
        },
        {
          title: 'Implement Log Management & Retention Across Cloud Environments',
          control: 'CSCRF: Centralized log management with tamper-proof storage and defined retention periods',
          how: 'Configure AWS CloudWatch Logs, Azure Log Analytics, and GCP Cloud Logging to capture all security-relevant events — authentication, authorization, data access, configuration changes. Forward logs to a centralized, SEBI-compliant retention store. Implement log integrity verification using AWS Macie, Azure Purview, and GCP DLP for sensitive data detection within logs. Set retention rules matching SEBI circular timelines.',
          check: 'Validate that all critical system logs are captured across AWS, Azure, and GCP. Confirm SIEM ingestion rates match expected log volumes. Verify retention periods meet SEBI requirements. Test log tampering detection by modifying a log entry and confirming alerts fire.'
        },
        {
          title: 'Protect Critical Systems with SEBI-Aligned Security Controls',
          control: 'CSCRF: Protection of critical systems including application security, network security, and endpoint protection',
          how: 'Deploy WAF rules (AWS WAF, Azure Front Door WAF, GCP Cloud Armor) on all public-facing trading and investor-facing applications. Implement runtime protection (AWS GuardDuty, Azure Defender for Cloud, GCP Security Command Center) on critical workloads. Enable AWS Shield Advanced, Azure DDoS Protection, and GCP Cloud Armor for DDoS mitigation. Run Alibaba Cloud Shield for any Asia-Pacific endpoints serving Indian market participants.',
          check: 'Verify WAF rules are active on all public endpoints. Confirm GuardDuty/Defender/SCC findings are being triaged within 24 hours. Validate DDoS protection is enabled with tested thresholds. Review no critical systems are exposed without endpoint protection.'
        },
        {
          title: 'Establish Business Continuity & DR Testing Schedule',
          control: 'CSCRF: Regular testing of business continuity and disaster recovery plans with documented results',
          how: 'Create a quarterly DR testing calendar aligned to SEBI\'s BCP requirements. Implement automated failover for critical systems using AWS Route 53 health checks, Azure Traffic Manager, and GCP Cloud DNS load balancing. Document and execute tabletop exercises for market-hour disruption scenarios. Record all test results in a SEBI-compliant format with remediation tracking.',
          check: 'Verify DR test calendar exists and covers all critical systems. Confirm automated failover is configured and tested for primary production environments. Validate test result documentation includes pass/fail criteria, recovery times achieved, and gaps identified.'
        },
        {
          title: 'Implement Cyber Crisis Management Plan (CCMP) Framework',
          control: 'SEBI CCMP: Establish a cyber crisis management plan with defined roles, communication, and escalation procedures',
          how: 'Draft CCMP document defining crisis severity levels (Critical/High/Medium/Low) mapped to SEBI notification requirements. Establish a 24/7 Cyber Crisis Response Team with defined RACI matrix. Configure automated incident escalation using AWS SNS, Azure Logic Apps, and GCP Pub/Sub for real-time alerting to CISO and SEBI reporting contacts. Define communication templates for SEBI, CERT-In, and market participants.',
          check: 'Review CCMP document for completeness against SEBI\'s CCMP requirements. Validate 24/7 on-call rotation exists and is maintained. Test escalation workflow by simulating a critical incident. Verify notification templates are ready for SEBI and CERT-In reporting.'
        }
      ]
    },
    {
      week: 3,
      title: 'Verifying CCMP, Audits & Incident Reporting to SEBI/CERT-In',
      days: 'Days 15-21',
      description: 'Testing the Cyber Crisis Management Plan, conducting internal audits, establishing incident reporting to SEBI/CERT-In, and executing data center DR drills',
      tasks: [
        {
          title: 'Execute Full-Scale CCMP Tabletop and Technical Drills',
          control: 'SEBI CCMP Validation: End-to-end testing of cyber crisis response including simulation, escalation, containment, and recovery',
          how: 'Conduct a full-scale cyber crisis simulation covering a ransomware attack on production trading infrastructure. Execute across AWS, Azure, and GCP simultaneously to test multi-cloud containment. Run the drill outside business hours to validate 24/7 readiness. Measure response times against SEBI CCMP targets: detection < 30 min, containment < 2 hours, recovery per RTO. Document all findings and remediation plans.',
          check: 'Verify the drill covered all CCMP phases: detection, escalation, containment, eradication, recovery, and post-incident review. Validate that SEBI notification was simulated within the required 6-hour window. Confirm documented gaps have assigned owners and remediation deadlines.'
        },
        {
          title: 'Conduct Internal Cyber Security Audit per SEBI CSCRF',
          control: 'CSCRF: Periodic internal cyber security audits with documented findings and remediation tracking',
          how: 'Execute a comprehensive internal audit covering SEBI\'s CSCRF control domains: governance, access control, network security, application security, data security, and incident management. Use automated scanning tools (AWS Inspector, Azure Policy, GCP Security Scanner) combined with manual review. Assess compliance across all three cloud environments. Map findings to SEBI\'s mandatory and recommendatory controls.',
          check: 'Verify audit scope covers all CSCRF domains. Confirm audit report includes risk ratings for each finding. Validate remediation tracking is in place with SLA-based timelines. Cross-check findings against previous audit to measure improvement.'
        },
        {
          title: 'Validate SEBI & CERT-In Incident Reporting Workflow',
          control: 'SEBI/CERT-In Reporting: Mandatory incident reporting within defined timelines to SEBI and CERT-In',
          how: 'Implement automated incident classification engine that routes detected incidents to the correct reporting workflow based on SEBI severity criteria. Configure AWS EventBridge, Azure Sentinel, and GCP Chronicle to auto-classify incidents. Build integration with CERT-In reporting portal and SEBI\'s incident reporting template. Test the full reporting pipeline with a simulated incident from detection through regulatory notification.',
          check: 'Verify incident classification correctly maps to SEBI severity levels. Confirm CERT-In reporting template is pre-populated with required fields. Validate end-to-end reporting timeline meets SEBI\'s 6-hour requirement for critical incidents. Test with at least 3 simulated scenarios of varying severity.'
        },
        {
          title: 'Execute Data Center and DR Site Failover Drills',
          control: 'CSCRF: Regular DR drills with documented failover and failback procedures for critical systems',
          how: 'Perform live failover of critical trading and settlement systems from primary AWS region to secondary Azure region. Execute GCP cold-to-warm standby activation. Measure actual RTO and RPO achieved against targets. Validate data consistency across failover using automated reconciliation scripts. Execute failback procedures to restore primary operations. Document everything per SEBI drill reporting requirements.',
          check: 'Validate actual RTO and RPO achieved meet SEBI targets (RTO < 30 min for critical). Confirm data reconciliation shows zero data loss for settlement-critical transactions. Verify failback to primary was clean with no residual issues. Confirm drill documentation is ready for SEBI inspection.'
        },
        {
          title: 'Establish Continuous Compliance Monitoring for SEBI Controls',
          control: 'CSCRF: Continuous monitoring and assessment of cyber security posture with automated compliance checks',
          how: 'Deploy automated compliance monitoring using AWS Config Rules, Azure Policy, and GCP Organization Policies mapped to SEBI CSCRF controls. Implement AWS Security Hub, Azure Security Center, and GCP Security Command Center for continuous posture assessment. Build custom dashboards showing real-time compliance status against SEBI requirements. Configure automated alerts for control drift in production, staging, and development environments.',
          check: 'Verify compliance rules are mapped to SEBI CSCRF controls. Confirm dashboards show real-time compliance status across all cloud environments. Validate that control drift alerts fire within 15 minutes of violation. Review 30-day trend data to confirm compliance posture is stable or improving.'
        }
      ]
    },
    {
      week: 4,
      title: 'Multi-Cloud Controls for Market Intermediaries & Ongoing Monitoring',
      days: 'Days 22-28',
      description: 'Multi-cloud controls for stock exchanges, clearing houses, and intermediaries, compliance audits, and establishing ongoing monitoring programs',
      tasks: [
        {
          title: 'Implement Multi-Cloud Data Protection for Market Intermediaries',
          control: 'CSCRF: Data protection controls for market intermediaries operating across multiple cloud environments',
          how: 'Implement encryption at rest and in transit for all investor data and market data across AWS KMS, Azure Key Vault, and GCP Cloud KMS. Deploy AWS Macie, Azure Purview, and GCP DLP for automated discovery and classification of sensitive financial data. Enforce data residency requirements — ensure Indian market participant data remains within India-region clouds. Implement tokenization for card and account data flowing through multi-cloud pipelines.',
          check: 'Verify encryption is active for all data stores containing investor or market data across AWS, Azure, and GCP. Confirm DLP policies are scanning and alerting on sensitive data exposure. Validate data residency by confirming no Indian market data is stored outside India regions. Test tokenization by inspecting data at rest and in transit.'
        },
        {
          title: 'Secure Stock Exchange & Clearing House Cloud Infrastructure',
          control: 'CSCRF: Specific security requirements for stock exchanges, clearing corporations, and depositories operating critical systems',
          how: 'Implement dedicated AWS Outposts or Azure Dedicated Hosts for ultra-low-latency trading workloads requiring deterministic performance. Deploy GCP Confidential VMs for settlement and clearing computations requiring enhanced data protection. Establish network isolation using AWS Transit Gateway, Azure Virtual WAN, and GCP Network Connectivity Center to segment exchange traffic from other intermediary traffic. Implement real-time anomaly detection on trading patterns across all cloud environments.',
          check: 'Verify dedicated compute is provisioned for trading-critical workloads. Confirm network segmentation isolates exchange traffic. Validate anomaly detection is monitoring trading patterns and alerting on deviations. Test that settlement data confidentiality is maintained using confidential computing.'
        },
        {
          title: 'Execute SEBI Compliance Audit with Evidence Collection',
          control: 'CSCRF: Annual compliance audit with independent assessment of cyber security controls and evidence preservation',
          how: 'Prepare a comprehensive audit evidence package organized by SEBI CSCRF control domains. Use AWS Audit Manager, Azure Compliance Manager, and GCP Compliance Reports Manager to automate evidence collection. Map each control to its evidence artifacts across cloud environments. Engage independent auditors (as required by SEBI) and provide read-only access to compliance dashboards. Ensure audit trail from evidence collection to findings to remediation is unbroken.',
          check: 'Verify audit evidence package covers all mandatory SEBI CSCRF controls. Confirm independent auditor access is provisioned and scoped appropriately. Validate that evidence artifacts are timestamped, immutable, and traceable to specific control assessments. Review prior audit findings are closed with documented remediation.'
        },
        {
          title: 'Implement Automated Regulatory Reporting for SEBI',
          control: 'SEBI Reporting: Automated generation and submission of cyber security incident and compliance reports to SEBI',
          how: 'Build automated reporting pipelines that generate SEBI-mandated reports — quarterly cyber security compliance reports, incident reports, and annual CSCRF audit summaries. Use AWS Lambda, Azure Functions, and GCP Cloud Functions to aggregate data from Security Hub, Defender, and SCC. Generate reports in SEBI-specified formats with digital signatures. Implement automated submission workflows to SEBI\'s regulatory portal where API access is available.',
          check: 'Verify automated reports are generated on schedule without manual intervention. Confirm report contents match SEBI\'s required format and data fields. Validate digital signatures are applied and verified. Test the submission workflow end-to-end with a sample report.'
        },
        {
          title: 'Establish Ongoing Monitoring & Continuous Improvement Program',
          control: 'CSCRF: Continuous improvement through threat intelligence, vulnerability management, and posture evolution',
          how: 'Implement a continuous monitoring program using AWS GuardDuty, Azure Sentinel, and GCP Chronicle for multi-cloud threat detection integrated with SEBI\'s threat intelligence sharing requirements. Deploy automated vulnerability scanning (AWS Inspector, Azure Defender, GCP Web Risk) with SLA-based remediation for critical findings. Establish a quarterly security architecture review cycle aligned to evolving SEBI circulars. Maintain a lessons-learned register from all incidents and drills.',
          check: 'Verify threat intelligence feeds are integrated from SEBI/CERT-In sources. Confirm vulnerability SLAs are being met — critical within 24 hours, high within 7 days. Validate quarterly architecture reviews are scheduled and documented. Review lessons-learned register for actionability and completion rates.'
        }
      ]
    }
  ],
  milestones: [
    { day: 7, label: 'SEBI Regulatory Baseline Established', color: 'golden' },
    { day: 14, label: 'Audit Trails & CCMP Implemented', color: 'golden' },
    { day: 28, label: 'Multi-Cloud Controls & Ongoing Compliance Active', color: 'golden' }
  ],
  referenceUrl: 'https://www.sebi.gov.in/'
};

export default function SecuritiesExchangeBoardIndia() {
  return <LearningFrameworkPage framework={FRAMEWORK} />;
}
