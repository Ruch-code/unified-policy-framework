import LearningFrameworkPage from "../../components/LearningFrameworkPage";

const FRAMEWORK = {
  id: 'rbi',
  name: 'RBI Cyber Security Framework',
  region: 'India',
  flag: "🇮🇳",
  flagAnimation: "pulse",
  basePath: "/rbi",
  color: 'navy',
  weeks: [
    {
      week: 1,
      title: 'RBI Cyber Security Framework Foundations & IT Governance',
      days: 'Days 1-7',
      description: 'RBI cyber security framework goals, IT governance and risk management under IT Act 2000 and RBI circulars, and SWIFT/real-time payment security fundamentals',
      tasks: [
        {
          title: 'Map RBI Master Direction on Cyber Security to Bank Systems',
          control: 'RBI Master Direction: Identification of all information assets and classification per RBI cyber security baseline',
          how: 'Inventory all banking applications, core banking systems, payment gateways, and customer data repositories across AWS, Azure, and GCP cloud environments. Classify each asset per RBI\'s criticality tiers: Critical (CBS, RTGS, NEFT, UPI), Important (internet banking, mobile banking, ATMs), and Standard. Maintain a live asset register using AWS Config, Azure Resource Graph, and GCP Cloud Asset Inventory with RBI criticality tagging.',
          check: 'Verify asset inventory covers all critical banking systems across cloud environments. Confirm RBI criticality classifications are assigned to 100% of assets. Cross-check against RBI\'s list of critical systems from the Master Direction. Validate no untagged production resources exist.'
        },
        {
          title: 'Establish IT Governance Framework per RBI Requirements',
          control: 'RBI IT Governance: Board-approved IT strategy, IT steering committee, IT risk management aligned to IT Act 2000 and RBI 2018 circulars',
          how: 'Draft and obtain board approval for an IT governance policy aligned to RBI\'s requirements: IT steering committee with board representation, defined IT risk appetite, IT budget allocation tied to risk priorities, and technology architecture review. Map governance to RBI circular on IT Governance (2011), Technology Risk Management Guidelines (2003), and RBI 2018 cyber security circular. Document cloud-specific governance for AWS, Azure, and GCP operations.',
          check: 'Verify board-approved IT governance policy exists and is current. Confirm IT steering committee meets quarterly with documented minutes. Validate IT risk register covers cloud-specific risks. Cross-check compliance with RBI 2018 circular requirements and IT Act 2000 provisions.'
        },
        {
          title: 'Implement SWIFT Customer Security Programme Controls Baseline',
          control: 'RBI SWIFT Security: Implementation of SWIFT CSP mandatory controls for banks processing SWIFT transactions',
          how: 'Implement SWIFT CSP mandatory and recommended security controls for SWIFT infrastructure across production environments. Segment SWIFT-related systems in dedicated AWS VPCs, Azure VNets, and GCP VPCs with strict network access controls. Enforce SWIFT\'s mandatory controls: restrict internet access to SWIFT environment, segregate SWIFT from general bank network, enforce MFA for all SWIFT access, and implement transaction business controls.',
          check: 'Verify SWIFT CSP mandatory controls are implemented and documented. Confirm SWIFT network segment is isolated from general banking network. Validate MFA is enforced for all SWIFT users. Run SWIFT CSP self-assessment and confirm all mandatory controls score as compliant.'
        },
        {
          title: 'Secure Real-Time Payment Systems (UPI, IMPS, NEFT, RTGS)',
          control: 'RBI Payment Security: Security controls for real-time payment systems and digital payment infrastructure',
          how: 'Implement payment-specific security controls for UPI, IMPS, NEFT, and RTGS processing across cloud environments. Deploy dedicated AWS Nitro Enclaves or Azure Confidential Computing for PIN/credential processing. Implement real-time fraud detection using AWS Fraud Detector and Azure Cognitive Services. Enforce PCI-DSS controls on card payment data flows. Apply payment-specific network segmentation using AWS Transit Gateway and Azure Virtual WAN to isolate payment processing networks.',
          check: 'Verify payment processing systems are isolated in dedicated network segments. Confirm confidential computing is used for credential processing. Validate real-time fraud detection is active and processing transactions. Test PCI-DSS scope is minimized through proper network segmentation.'
        },
        {
          title: 'Define Risk-Based Security Assessment (RBSA) Methodology',
          control: 'RBI RBSA: Risk-based approach to cyber security assessment covering all critical banking assets',
          how: 'Develop a Risk-Based Security Assessment (RBSA) methodology per RBI\'s risk-based supervision framework. Define risk scoring criteria: likelihood (threat intelligence, vulnerability data) and impact (financial, regulatory, reputational). Map all critical banking assets to risk scores using automated scanning (AWS Inspector, Azure Defender, GCP Security Scanner). Establish risk assessment cadence: critical systems monthly, important quarterly, standard annually.',
          check: 'Verify RBSA methodology is documented and approved by risk committee. Confirm all critical banking assets have current risk scores. Validate automated scanning feeds into risk scoring. Confirm risk assessment cadence meets RBI expectations for frequency and depth.'
        }
      ]
    },
    {
      week: 2,
      title: 'Implementing Preventive, Containment & Detection Controls',
      days: 'Days 8-14',
      description: 'Implementing RBI framework pillars — preventive controls, containment mechanisms, detection capabilities, automated monitoring, log management, privileged access, and encryption',
      tasks: [
        {
          title: 'Deploy Preventive Controls Across Multi-Cloud Banking Infrastructure',
          control: 'RBI Preventive Controls: Access control, network security, endpoint protection, and application security for banking systems',
          how: 'Implement preventive controls across AWS, Azure, and GCP: AWS WAF + Shield for web application protection, Azure Firewall for network segmentation, GCP Cloud Armor for DDoS mitigation. Deploy endpoint protection (CrowdStrike/SentinelOne) on all banking servers and workstations. Implement micro-segmentation using AWS Security Groups, Azure NSGs, and GCP VPC Firewall Rules to enforce least-privilege network access between banking microservices.',
          check: 'Verify WAF, DDoS protection, and firewall rules are active on all public-facing banking applications. Confirm endpoint protection is deployed to 100% of banking servers. Validate micro-segmentation rules restrict inter-service communication to only required paths. Test that unauthorized access attempts are blocked and logged.'
        },
        {
          title: 'Implement Automated Monitoring & Real-Time Threat Detection',
          control: 'RBI Detection Controls: Continuous monitoring of critical systems with automated alerting on suspicious activities',
          how: 'Deploy SIEM (Splunk/Sentinel) with multi-cloud ingestion from AWS CloudTrail + GuardDuty, Azure Sentinel + Defender for Cloud, and GCP Chronicle + Security Command Center. Configure correlation rules for banking-specific threats: unauthorized access to CBS, anomalous SWIFT transactions, privilege escalation, and data exfiltration. Implement UEBA for privileged user monitoring. Set up automated playbooks for common incident types using AWS Step Functions, Azure Logic Apps, and GCP Workflows.',
          check: 'Verify SIEM is ingesting logs from all three cloud providers. Confirm correlation rules are firing for banking-specific threat scenarios. Validate UEBA is monitoring privileged user behavior. Test automated playbooks with simulated incidents and confirm response within defined SLAs.'
        },
        {
          title: 'Implement Centralized Log Management with RBI-Compliant Retention',
          control: 'RBI Log Management: Centralized, tamper-proof log storage with minimum 180-day retention for critical systems',
          how: 'Configure centralized log management aggregating logs from AWS CloudWatch + S3, Azure Log Analytics + Blob Storage, and GCP Cloud Logging + GCS. Implement tamper-proof storage using S3 Object Lock (compliance mode), Azure Immutable Storage, and GCP CMEK-locked buckets. Enforce minimum 180-day online retention and 5-year archival per RBI requirements. Deploy log integrity monitoring using hash verification and cross-region log replication.',
          check: 'Verify centralized log storage is receiving logs from all cloud environments. Confirm tamper-proof mechanisms are active — attempt log modification and verify it is rejected. Validate retention policies enforce 180-day minimum for critical banking systems. Test log integrity by verifying hash chains are intact.'
        },
        {
          title: 'Enforce Privileged Access Management for Critical Banking Systems',
          control: 'RBI Privileged Access: Strict controls on privileged access to critical systems including just-in-time elevation and session recording',
          how: 'Implement PAM (CyberArk/Broadcom) integrated with AWS IAM Identity Center, Azure PIM, and GCP IAM for privileged access to banking systems. Enforce just-in-time access with time-bound elevation and automatic de-provisioning. Record all privileged sessions to critical systems (CBS, SWIFT, payment gateways). Implement break-glass procedures for emergency access with mandatory two-person authorization and post-incident review.',
          check: 'Verify PAM solution is deployed and covers all critical banking system access. Confirm just-in-time elevation is enforced — no standing admin access exists. Validate privileged session recordings are captured and retained. Test break-glass procedure with a simulated emergency and verify dual-authorization is enforced.'
        },
        {
          title: 'Implement Data Encryption at Rest and in Transit for Banking Data',
          control: 'RBI Encryption: End-to-end encryption for sensitive banking data using RBI-approved algorithms and key management',
          how: 'Implement encryption for all banking data at rest using AWS KMS with AES-256, Azure Key Vault with HSM-backed keys, and GCP Cloud KMS with customer-managed encryption keys (CMEK). Enforce TLS 1.2+ for all data in transit between banking services across cloud environments. Implement encryption for SWIFT messaging channels. Deploy AWS CloudHSM or Azure Dedicated HSM for cryptographic key management of payment encryption keys. Ensure no weak cipher suites are permitted in any banking API endpoint.',
          check: 'Verify encryption at rest is enabled for all databases and storage containing banking data. Confirm TLS 1.2+ is enforced on all endpoints — scan with SSL labs or equivalent. Validate HSM-backed key management is operational for payment encryption. Test that no unencrypted banking data flows between cloud environments.'
        }
      ]
    },
    {
      week: 3,
      title: 'Testing Controls, Internal/External Audits & RBI Reporting',
      days: 'Days 15-21',
      description: 'Testing cyber security controls, conducting internal and external audits, RBI regulatory reporting, and risk-based security assessment execution',
      tasks: [
        {
          title: 'Execute Penetration Testing on Critical Banking Infrastructure',
          control: 'RBI Testing: Regular penetration testing of critical applications and infrastructure with documented remediation',
          how: 'Conduct comprehensive penetration testing covering web applications, APIs, mobile banking backends, and network infrastructure across AWS, Azure, and GCP. Use automated tools (Nessus, Burp Suite) combined with manual testing by qualified assessors. Test cloud-specific attack paths: IAM privilege escalation, cross-account access, container escape, serverless injection, and storage bucket misconfigurations. Execute red team exercises simulating advanced persistent threats targeting SWIFT and payment infrastructure.',
          check: 'Verify penetration test scope covers all RBI-critical systems. Confirm findings are classified by severity with remediation SLAs. Validate critical findings are remediated within 24 hours. Cross-check cloud-specific attack vectors were tested. Review red team exercise results and response effectiveness.'
        },
        {
          title: 'Conduct RBI-Compliant Internal Cyber Security Audit',
          control: 'RBI Audit: Internal cyber security audit covering all RBI Master Direction requirements with independent audit function',
          how: 'Execute internal audit covering RBI\'s cyber security framework domains: IT governance, access control, network security, data protection, incident management, and business continuity. Ensure audit function is independent from IT operations per RBI requirements. Use AWS Audit Manager, Azure Compliance Manager, and GCP Compliance Reports for automated evidence collection. Assess compliance against RBI Master Direction on Cyber Security, RBI IT Guidelines, and applicable circulars.',
          check: 'Verify internal audit covers all RBI cyber security framework domains. Confirm audit function independence from IT operations. Validate automated evidence collection from all cloud environments. Confirm audit report maps findings to specific RBI regulatory requirements.'
        },
        {
          title: 'Execute External Audit by RBI-Approved Auditor',
          control: 'RBI External Audit: Mandatory external cyber security audit by RBI-approved Category-I CISA auditors',
          how: 'Engage RBI-approved Category-I CISA auditor for annual cyber security assessment. Provide auditor with controlled read-only access to AWS, Azure, and GCP compliance dashboards and audit evidence. Facilitate on-site and remote assessment of banking IT infrastructure. Ensure auditor covers RBI-specific requirements: SWIFT CSP compliance, payment system security, data localization verification, and cloud security assessment. Track all audit observations through closure.',
          check: 'Verify external auditor is RBI-approved Category-I CISA certified. Confirm auditor scope covers all RBI-mandated assessment areas. Validate all audit observations are tracked with remediation owners and deadlines. Review closure rate for previous audit findings.'
        },
        {
          title: 'Prepare and Submit RBI Cyber Security Incident Reports',
          control: 'RBI Reporting: Timely reporting of cyber security incidents to RBI per Master Direction requirements',
          how: 'Implement automated incident classification and RBI reporting workflow. Build integration with RBI\'s reporting portal for cyber security incident submission. Create pre-approved reporting templates for different incident types: phishing, malware, unauthorized access, DDoS, data breach. Configure automated escalation for incidents meeting RBI reporting thresholds. Ensure reports include all RBI-required fields: incident description, affected systems, customer impact, containment actions, and root cause.',
          check: 'Verify incident reporting workflow covers all RBI-reportable incident types. Confirm reporting templates contain all RBI-required fields. Test end-to-end reporting with a simulated incident. Validate reports can be generated and submitted within RBI timelines. Review previous incident reports for completeness.'
        },
        {
          title: 'Execute Risk-Based Security Assessment (RBSA) for Cloud Banking',
          control: 'RBI RBSA: Comprehensive risk-based assessment of cyber security posture for cloud-hosted banking systems',
          how: 'Execute full RBSA assessment covering cloud-hosted banking systems across AWS, Azure, and GCP. Assess threat landscape specific to Indian banking: state-sponsored actors, financial fraud groups, insider threats. Evaluate vulnerability exposure using automated scanning and manual assessment. Quantify residual risk per RBI\'s risk-based supervision framework. Produce RBSA report with risk heat map, prioritized remediation roadmap, and board-level risk summary.',
          check: 'Verify RBSA covers all critical and important banking systems across cloud environments. Confirm threat landscape assessment includes India-specific banking threats. Validate risk quantification methodology aligns with RBI\'s risk-based supervision expectations. Confirm board-level summary is actionable with clear risk ownership.'
        }
      ]
    },
    {
      week: 4,
      title: 'Multi-Cloud Banking Controls, SWIFT CSP & Ongoing Compliance',
      days: 'Days 22-28',
      description: 'Multi-cloud controls for banks including data residency, resilience, SWIFT CSP full compliance, incident response integration, and establishing ongoing compliance programs',
      tasks: [
        {
          title: 'Implement Multi-Cloud Data Residency Controls for Indian Banks',
          control: 'RBI Data Localization: Payment system data and critical banking data stored exclusively within India',
          how: 'Enforce data residency using AWS Organizations Service Control Policies (SCPs), Azure Policy initiatives, and GCP Organization Constraints to prevent creation of resources outside India regions. Implement AWS Config rules, Azure Policy, and GCP Audit Logs to continuously monitor for data localization violations. Deploy Alibaba Cloud for any cross-border data flows requiring China-based processing with India data segregation. Create data flow diagrams documenting all customer data paths across cloud environments.',
          check: 'Verify SCPs/Policy constraints prevent resource creation outside India regions. Confirm continuous monitoring detects and alerts on any localization attempt. Validate data flow diagrams are current and accurate. Test enforcement by attempting to provision resources outside India and confirming block.'
        },
        {
          title: 'Achieve Full SWIFT CSP Compliance Across Banking Infrastructure',
          control: 'SWIFT CSP: Complete implementation and ongoing compliance with all SWIFT Customer Security Programme mandatory and recommended controls',
          how: 'Complete SWIFT CSP self-attestation covering all mandatory controls and recommended controls. Implement SWIFT-specific security architecture: dedicated secure zone in AWS/Azure/GCP for SWIFT infrastructure, SWIFT Alliance Lite2 security hardening, transaction business controls with dual authorization, and SWIFT Certificate Management. Deploy real-time monitoring of SWIFT transaction flows using AWS Kinesis, Azure Event Hubs, and GCP Pub/Sub with fraud detection analytics.',
          check: 'Verify SWIFT CSP self-attestation is complete and all mandatory controls are compliant. Confirm SWIFT infrastructure is in a dedicated, isolated network segment. Validate transaction business controls enforce dual authorization. Review SWIFT transaction monitoring for suspicious pattern detection.'
        },
        {
          title: 'Implement Integrated Incident Response Across Cloud Environments',
          control: 'RBI Incident Response: Coordinated incident response capabilities spanning all cloud-hosted banking systems with defined playbooks',
          how: 'Build integrated incident response playbooks using AWS Security Hub automation rules, Azure Sentinel automation, and GCP Chronicle SOAR. Implement cross-cloud forensic capability using AWS S3 forensic buckets, Azure immutable storage, and GCP evidence buckets. Establish a virtual Cyber Security Operations Centre (CSOC) with 24/7 monitoring across all cloud environments. Integrate RBI/CERT-In reporting into incident response workflows for automated regulatory notification.',
          check: 'Verify incident response playbooks cover critical banking scenarios across all clouds. Confirm forensic storage is configured with immutability. Validate CSOC has 24/7 coverage with defined escalation paths. Test end-to-end incident response from detection through RBI reporting with a full simulation.'
        },
        {
          title: 'Build Cloud Resilience for Critical Banking Systems',
          control: 'RBI Business Continuity: Multi-cloud resilience architecture ensuring banking service availability meets RBI BCP requirements',
          how: 'Design multi-cloud resilience architecture for critical banking systems: primary in AWS (Mumbai region), secondary in Azure (Pune region), and disaster recovery in GCP (Delhi region). Implement automated failover for CBS, UPI, NEFT, and RTGS processing. Deploy AWS Route 53, Azure Traffic Manager, and GCP Cloud DNS for DNS-based failover. Implement chaos engineering (AWS Fault Injection Simulator, Azure Chaos Studio, GCP Chaos Engineering) to continuously test resilience.',
          check: 'Verify multi-cloud resilience architecture is documented with clear failover sequences. Confirm automated failover is tested monthly with measured RTOs meeting RBI requirements. Validate chaos engineering experiments are running regularly. Confirm banking services remained available during last failover test.'
        },
        {
          title: 'Establish Ongoing RBI Compliance Monitoring & Reporting Program',
          control: 'RBI Compliance: Continuous compliance monitoring, periodic reporting, and proactive engagement with RBI cyber security requirements',
          how: 'Deploy a continuous compliance monitoring platform aggregating posture data from AWS Security Hub, Azure Defender, and GCP Security Command Center into a unified RBI compliance dashboard. Implement automated compliance scoring against RBI Master Direction requirements. Schedule monthly compliance reviews, quarterly board reporting, and annual RBSA updates. Establish a regulatory change management process to track new RBI circulars and implement required controls within defined SLAs.',
          check: 'Verify unified compliance dashboard is operational and current. Confirm automated scoring covers all RBI Master Direction requirements. Validate board receives quarterly cyber security compliance reports. Confirm regulatory change management process is active and new circulars are tracked to implementation.'
        }
      ]
    }
  ],
  milestones: [
    { day: 7, label: 'RBI Framework Baseline & IT Governance Established', color: 'navy' },
    { day: 14, label: 'Preventive, Detection & PAM Controls Deployed', color: 'navy' },
    { day: 28, label: 'Multi-Cloud Banking Controls & Ongoing Compliance Active', color: 'navy' }
  ],
  referenceUrl: 'https://www.rbi.org.in/'
};

export default function ReserveBankOfIndia() {
  return <LearningFrameworkPage framework={FRAMEWORK} />;
}

export { FRAMEWORK };
