import LearningFrameworkPage from "../../components/LearningFrameworkPage";

export default function Cscrf() {
  const FRAMEWORK = {
    id: 'cscrf',
    name: 'CSCRF (India Cyber Security)',
    shortName: 'CSCRF',
    region: 'India',
    color: 'golden',
    weeks: [
      {
        week: 1,
        title: 'CERT-In Directives & Legal Foundations',
        days: 'Days 1-7',
        description: 'Understand CERT-In mandatory directives, Indian IT Act provisions, and foundational CII requirements',
        tasks: [
          {
            title: 'CERT-In Directive 2022 Requirements',
            control: 'CERT-In Direction No. 20/08/2022 mandates specific cybersecurity practices for all Indian enterprises and service providers.',
            how: 'Review the full text of CERT-In Direction 20/08/2022 issued on August 28, 2022. Identify which entities are covered: data centres, virtual private server (VPS) providers, cloud service providers, organisations operating in the Indian Computer Emergency Response Team (CERT-In) reporting jurisdiction. Map your entity classification against the directive scope. Document compliance deadlines and reporting obligations in a compliance matrix.',
            check: 'Verify that your entity has formally acknowledged receipt of the CERT-In directive. Confirm classification of your organisation under the directive scope. Check that all required personnel have been briefed on directive requirements.'
          },
          {
            title: 'Mandatory Incident Reporting (6-Hour Timeline)',
            control: 'CERT-In requires reporting of specified cyber incidents within 6 hours of becoming aware of the incident — one of the shortest mandatory timelines globally.',
            how: 'Implement a 24x7 incident reporting hotline and email channel dedicated to CERT-In notification. Create pre-approved incident report templates covering all mandatory fields: nature of incident, systems affected, estimated impact, containment actions taken, and point of contact. Establish an escalation matrix that triggers CERT-In reporting within 6 hours. Conduct tabletop exercises to validate the 6-hour reporting window with realistic scenarios. Designate a CERT-In liaison officer and backup.',
            check: 'Time a mock incident from detection to CERT-In report submission and verify the 6-hour window is achievable. Confirm incident report templates cover all fields mandated by CERT-In. Verify the CERT-In liaison officer is reachable 24x7.'
          },
          {
            title: 'Cyber Incident Types Covered',
            control: 'CERT-In mandates reporting for specific incident types including targeted attacks, ransomware, phishing campaigns, website defacements, data breaches, and DDoS attacks.',
            how: 'Catalogue all 20 categories of reportable cyber incidents defined by CERT-In. Map each incident type to your detection capabilities: network intrusion detection, email gateway filtering, web application firewalls, endpoint protection. Create an incident classification matrix that categorises incidents by severity and maps them to response SLAs. Establish automated detection rules for high-volume incident types such as phishing, DDoS, and ransomware.',
            check: 'Confirm detection capabilities exist for each CERT-In reportable incident category. Verify incident classification matrix is documented and approved. Check that automated detection rules are generating alerts for at least 80% of incident types.'
          },
          {
            title: 'MeitY Data Protection Rules & Indian IT Act 2000',
            control: 'MeitY IT (Reasonable Security Practices and Procedures and Sensitive Personal Data or Information) Rules 2011 and IT Act 2000 (amended 2008) provide the statutory basis for data protection and cybercrime provisions in India.',
            how: 'Map all sensitive personal data or information (SPDI) processing activities to the MeitY Rules 2011. Document compliance with Schedule A security practices: ISO 27001, ISMS, or equivalent security practices. Review IT Act Section 43A (compensation for failure to protect data) and Section 72A (punishment for disclosure of information in breach of lawful contract). Ensure privacy policy meets IT Act Section 43B(h) requirements. Register with MeitY where required for data intermediaries.',
            check: 'Verify ISO 27001 or equivalent ISMS certification is current. Confirm privacy policy published and accessible meets IT Act requirements. Check that all SPDI processing has documented lawful basis under the MeitY Rules.'
          },
          {
            title: 'Critical Information Infrastructure (CII) Sectors',
            control: 'The IT Act 2000 Section 70 designates critical sectors — power, banking, telecom, transport, defence, government, healthcare, strategic — as Critical Information Infrastructure requiring enhanced protection.',
            how: 'Identify whether your organisation operates within or interfaces with any of the 8 designated CII sectors: power, banking and financial services, telecom, transport, defence, government services, healthcare, and strategic/equivalent sectors. If CII-designated, develop a CII protection plan including enhanced monitoring, redundant systems, and priority incident response. Establish sector-specific coordination with nodal agencies (e.g., CERT-Fin for banking, CERT-T for telecom). Implement NCIIPC (National Critical Information Infrastructure Protection Centre) guidelines for CII operators.',
            check: 'Confirm whether your organisation or critical assets fall under CII designation. If CII, verify a CII protection plan is approved by the nodal agency. Check that enhanced monitoring and redundancy measures are operational for CII assets.'
          }
        ]
      },
      {
        week: 2,
        title: 'SOC/SIEM, Log Retention & Endpoint Controls',
        days: 'Days 8-14',
        description: 'Deploy SOC/SIEM infrastructure for 6-hour reporting, implement log retention, and establish endpoint detection',
        tasks: [
          {
            title: 'SOC/SIEM for 6-Hour CERT-In Reporting',
            control: 'A Security Operations Centre with SIEM is essential to detect, triage, and report incidents within CERT-In\'s mandatory 6-hour window.',
            how: 'Deploy a SIEM platform (Splunk, QRadar, Sentinel, or open-source alternatives like Wazuh/ELK) with log ingestion from all critical assets. Configure correlation rules mapped to CERT-In reportable incident types. Establish 24x7 SOC staffing model (in-house, MSSP, or hybrid). Create automated incident triage workflows that escalate to CERT-In reporting within the 6-hour timeline. Integrate threat intelligence feeds relevant to the Indian threat landscape. Build dashboards for real-time incident visibility and CERT-In reporting status tracking.',
            check: 'Verify SIEM is ingesting logs from all critical assets (target 100% coverage of crown jewels). Test that a simulated incident is detected, triaged, and ready for CERT-In reporting within 6 hours. Confirm 24x7 SOC staffing coverage is documented and operational.'
          },
          {
            title: 'Log Retention (180 Days Rolling)',
            control: 'CERT-In mandates that organisations retain ICT logs for a rolling period of 180 days within Indian jurisdiction for all ICT infrastructure.',
            how: 'Implement a centralised log management solution with 180-day retention policy. Configure log sources: network devices (firewalls, routers, switches), servers, endpoints, applications, databases, cloud services. Ensure all logs are stored within Indian geographical boundaries as per CERT-In requirements. Implement tamper-proof log storage with integrity hashing. Set up automated log rotation with 180-day retention windows. Create log indexing and search capabilities for forensic analysis. Define log retention exceptions and archival policies beyond 180 days.',
            check: 'Verify log retention policy is set to 180 days minimum for all sources. Confirm logs are stored within Indian territory. Test log retrieval and confirm logs from 179 days ago are accessible and searchable. Validate log integrity through hash verification.'
          },
          {
            title: 'Encrypted Traffic Logging (VPNs, Proxies)',
            control: 'CERT-In requires organisations to retain encrypted traffic logs from VPNs and proxy servers for 180 days, including connection logs and metadata.',
            how: 'Configure VPN concentrators to log connection metadata: source IP, destination IP, timestamp, session duration, bytes transferred, user authentication records. Deploy SSL/TLS inspection where legally permitted and technically feasible for proxy servers. Implement proxy logging to capture URL访问, destination domains, content categories, and authentication data. Ensure logs capture sufficient detail to reconstruct user activity for forensic purposes. Implement secure log forwarding to SIEM with encrypted transport. Establish key escrow or decryption capabilities for encrypted traffic analysis during incident response.',
            check: 'Verify VPN logs capture source IP, destination, timestamp, and session metadata. Confirm proxy logs capture URL访问 and domain-level data. Test log integrity and confirm 180-day retention. Validate that encrypted traffic can be reconstructed for forensic investigation when required.'
          },
          {
            title: 'Endpoint Detection & Response (EDR) Deployment',
            control: 'Endpoint Detection and Response provides continuous monitoring of endpoints for threat detection aligned with CERT-In incident categories.',
            how: 'Deploy EDR solution across all managed endpoints: workstations, servers, and mobile devices. Configure detection rules for CERT-In reportable incidents: ransomware, malware, unauthorised access, data exfiltration. Integrate EDR telemetry with SIEM for centralised alerting. Implement automated response playbooks for high-confidence detections. Enable behavioural analysis for detecting novel threats and zero-day exploits. Deploy EDR agents with tamper protection and ensure coverage exceeds 95% of managed endpoints.',
            check: 'Confirm EDR deployment coverage exceeds 95% of managed endpoints. Verify EDR alerts are flowing to SIEM and generating CORRECT incident notifications. Test automated response playbooks with controlled scenarios. Validate tamper protection is active on all EDR agents.'
          },
          {
            title: 'Access Control & Authentication Measures',
            control: 'Implement robust access control and multi-factor authentication to protect ICT systems as part of CERT-In compliance and MeitY security requirements.',
            how: 'Implement role-based access control (RBAC) with least-privilege principle across all systems. Deploy multi-factor authentication (MFA) for all remote access, administrative access, and access to sensitive data. Implement privileged access management (PAM) with session recording for all administrative access. Establish access review and recertification processes (quarterly for privileged, semi-annual for standard). Deploy identity governance for joiner-mover-leaver automation. Implement conditional access policies based on device compliance, location, and risk level.',
            check: 'Verify MFA is enforced for 100% of remote and administrative access. Confirm PAM is deployed with session recording for all privileged accounts. Test access recertification process and confirm quarterly reviews are documented. Validate conditional access policies block non-compliant devices.'
          }
        ]
      },
      {
        week: 3,
        title: 'Incident Response, Audit & Vendor Assessment',
        days: 'Days 15-21',
        description: 'Conduct IR drills, verify log integrity, test breach notification, and assess third-party/vendor security',
        tasks: [
          {
            title: 'Incident Response Drill Procedures',
            control: 'Regular IR drills validate that incident response processes meet CERT-In timelines and MeitY compliance requirements.',
            how: 'Design and execute IR drills covering all CERT-In reportable incident types. Simulate the complete incident lifecycle: detection, triage, containment, eradication, recovery, and CERT-In reporting. Test the 6-hour reporting timeline under realistic conditions including escalation chains. Conduct red team/blue team exercises targeting CII assets if applicable. Run ransomware, data breach, DDoS, and phishing simulation scenarios. Document lessons learned and update IR playbooks after each drill. Conduct drills at least quarterly with participation from legal, communications, and business stakeholders.',
            check: 'Verify IR drills are conducted at least quarterly with documented outcomes. Confirm 6-hour CERT-In reporting is achievable in drill scenarios. Validate that IR playbooks have been updated based on drill findings. Check that non-IT stakeholders participate in drills.'
          },
          {
            title: 'Log Review & Audit Trail Verification',
            control: 'Systematic log review ensures audit trails are complete, tamper-proof, and sufficient for forensic investigation as required by CERT-In.',
            how: 'Implement daily automated log integrity checks using hash verification and SIEM correlation. Conduct weekly manual reviews of high-priority logs: authentication, access control, firewall, and intrusion detection. Verify audit trails are complete and unbroken for all critical system events. Test log tamper detection mechanisms by simulating log modification attempts. Validate log timestamp accuracy through NTP synchronisation. Create log review checklists mapped to CERT-In incident types. Establish log retention compliance reporting with automated alerts for any gaps.',
            check: 'Confirm daily automated log integrity checks are running without errors. Verify weekly manual log reviews are documented with findings and actions. Test that log tampering is detected within 24 hours. Validate NTP synchronisation accuracy across all log sources.'
          },
          {
            title: 'VPN/Proxy Log Compliance Testing',
            control: 'CERT-In specifically requires VPN and proxy log retention — compliance testing validates these logs meet legal admissibility and forensic standards.',
            how: 'Conduct comprehensive VPN log compliance audit: verify connection logs, user authentication, source/destination IP pairs, timestamps, and data volumes. Test proxy logs for URL访问 capture, domain filtering logs, and content inspection records. Validate log completeness by comparing VPN/proxy connection counts with network flow data. Test forensic reconstruction of user activity from VPN/proxy logs for a 30-day sample. Verify logs are stored within Indian jurisdiction and meet 180-day retention. Test log search and retrieval performance for incident response needs.',
            check: 'Verify VPN/proxy logs match network flow data within 5% variance. Confirm forensic reconstruction is possible from logs for sampled time periods. Validate 180-day retention and Indian storage for all VPN/proxy logs. Test log search performance for incident response queries.'
          },
          {
            title: 'Breach Notification Workflow Testing',
            control: 'CERT-In requires breach notification within 6 hours to CERT-In and MeitY notification to affected individuals. Testing validates notification workflows are functional.',
            how: 'Map the complete breach notification workflow: detection → internal escalation → CERT-In report (6 hours) → MeitY notification → individual notification. Test notification templates cover all mandatory fields: incident details, affected systems, data types compromised, containment measures, remediation steps. Simulate breach notification scenarios including after-hours and weekend events. Test communication channels: CERT-In portal, email, phone escalation. Verify legal review step is integrated without delaying 6-hour CERT-In deadline. Test coordination with sector-specific regulators (RBI for banking, TRAI for telecom).',
            check: 'Confirm breach notification can be completed within 6 hours from detection. Verify notification templates are approved and cover all CERT-In mandatory fields. Test after-hours notification workflow and confirm key contacts are reachable. Validate sector-specific regulator notification procedures are documented.'
          },
          {
            title: 'Third-Party/Vendor Security Assessment',
            control: 'CERT-In compliance extends to third-party vendors handling ICT systems or data — vendor risk assessment ensures supply chain security.',
            how: 'Develop vendor risk assessment framework aligned with CERT-In requirements. Classify vendors by criticality tier: Tier 1 (CII/system access), Tier 2 (data processing), Tier 3 (general services). Conduct security assessments for all Tier 1 and Tier 2 vendors including: security certifications, penetration test results, incident response capabilities, log retention practices. Verify vendor compliance with CERT-In 180-day log retention within Indian jurisdiction. Include CERT-In compliance clauses in vendor contracts: reporting obligations, audit rights, breach notification. Implement continuous vendor risk monitoring with quarterly reassessments for critical vendors.',
            check: 'Verify vendor risk assessment framework is documented and approved. Confirm all Tier 1 vendors have current security certifications (ISO 27001 or equivalent). Validate CERT-In compliance clauses are included in all Tier 1 and Tier 2 vendor contracts. Check that quarterly vendor reassessments are scheduled and documented.'
          }
        ]
      },
      {
        week: 4,
        title: 'Audit Readiness, Sector Compliance & Remediation',
        days: 'Days 22-28',
        description: 'Prepare for CERT-In compliance audits, address sector-specific requirements, and build remediation playbooks',
        tasks: [
          {
            title: 'CERT-In Compliance Audit Preparation',
            control: 'CERT-In and MeitY may conduct compliance audits — preparation ensures readiness and minimises penalty exposure.',
            how: 'Compile all compliance documentation: incident response plans, log retention policies, vendor assessments, access control records, IR drill reports. Conduct internal compliance audit using CERT-In checklist: incident reporting readiness, 180-day log retention, encrypted traffic logging, MFA deployment. Validate all mandatory controls against the CERT-In directive matrix. Prepare evidence packages for each compliance requirement: screenshots, configurations, audit logs, drill reports. Brief executive leadership on audit readiness and potential findings. Establish remediation timelines for any identified gaps.',
            check: 'Verify all CERT-In directive requirements are documented with evidence. Confirm internal audit has been completed with findings and remediation status. Validate evidence packages are current and accessible. Check that executive leadership has been briefed on compliance posture.'
          },
          {
            title: 'Penalty Frameworks & Enforcement',
            control: 'IT Act Sections 43A, 72A, and the proposed DPDPA penalty provisions create financial and legal exposure for non-compliance with Indian cybersecurity regulations.',
            how: 'Map penalty provisions: IT Act Section 43A (compensation for data protection failure), Section 72A (punishment for unlawful disclosure), DPDPA penalties (up to ₹250 crore for significant violations). Quantify potential financial exposure based on your data processing volume and criticality. Develop a compliance cost-benefit analysis comparing remediation costs to penalty exposure. Review recent CERT-In enforcement actions and compliance notices to understand regulatory priorities. Ensure cyber insurance coverage includes Indian regulatory penalty provisions. Document compliance posture for regulatory defence preparation.',
            check: 'Verify penalty exposure analysis is completed and reviewed by legal. Confirm cyber insurance covers Indian regulatory penalties. Validate compliance cost-benefit analysis supports investment in required controls. Check that compliance evidence is maintained for potential regulatory defence.'
          },
          {
            title: 'Sector-Specific Requirements (Banking, Telecom, Healthcare)',
            control: 'Sector regulators impose additional cybersecurity requirements: RBI for banking, TRAI/DOT for telecom, CDSCO for healthcare — these layer on top of CERT-In directives.',
            how: 'Banking: Implement RBI Cybersecurity Framework, RBI Direction on Cyber Security (April 2022), IT Governance guidelines, and CERT-Fin coordination. Telecom: Comply with DoT Telecom Security Directive, TRAI QoS requirements, and lawful interception capabilities. Healthcare: Implement CDSCO data protection requirements, ABDM (Ayushman Bharat Digital Mission) security standards, and MeitY health data guidelines. Map sector-specific requirements to a unified compliance matrix overlaying CERT-In base requirements. Conduct sector-specific tabletop exercises and compliance audits. Establish sector regulator liaison relationships and reporting channels.',
            check: 'Confirm sector-specific compliance matrix is documented for all applicable regulators. Verify sector-specific incident reporting channels are established and tested. Validate that sector tabletop exercises have been conducted. Check that regulatory liaison contacts are documented and current.'
          },
          {
            title: 'Multi-Cloud Controls (AWS Mumbai, GCP Delhi, Azure India)',
            control: 'Cloud workloads in Indian regions must comply with CERT-In log retention, data sovereignty, and incident reporting requirements across all cloud providers.',
            how: 'AWS Mumbai (ap-south-1): Enable CloudTrail with 180-day retention, GuardDuty for threat detection, Security Hub for compliance monitoring, Config for resource compliance. GCP Delhi: Enable Cloud Audit Logs with 180-day retention, Chronicle for SIEM integration, Security Command Center for posture management. Azure India (Pune/Central): Enable Azure Monitor with 180-day retention, Microsoft Sentinel for SIEM, Defender for Cloud for security posture. Implement cross-cloud log aggregation to central SIEM. Verify all data residency is within Indian regions. Deploy consistent IAM policies with MFA enforcement. Configure cross-cloud incident response workflows aligned with CERT-In reporting.',
            check: 'Verify CloudTrail/Audit Logs/Azure Monitor are enabled across all Indian region workloads. Confirm GuardDuty/Chronicle/Sentinel are detecting incidents and forwarding to central SIEM. Validate data residency is confined to Indian regions for all workloads. Test cross-cloud incident response and CERT-In reporting workflow end-to-end.'
          },
          {
            title: 'Common Compliance Gaps & Remediation Playbook',
            control: 'Understanding common CERT-In compliance gaps accelerates remediation and prevents repeated findings across organisations.',
            how: 'Document top 10 common CERT-In compliance gaps: incomplete 180-day log retention, missing VPN/proxy logs, delayed incident reporting beyond 6 hours, insufficient endpoint detection coverage, absent MFA on administrative access, missing vendor security assessments, lack of encrypted traffic logging, inadequate incident response drills, missing data residency enforcement, incomplete access review processes. Create a remediation playbook for each gap with: root cause, remediation steps, timeline, responsible owner, and verification method. Prioritise remediation by penalty exposure and audit likelihood. Establish monthly compliance metrics dashboard tracking remediation progress.',
            check: 'Verify top 10 compliance gaps are documented with remediation playbooks. Confirm each remediation playbook has assigned owners and timelines. Validate monthly compliance metrics dashboard is operational. Check that at least 80% of identified gaps have remediation plans in execution.'
          }
        ]
      }
    ],
    milestones: [
      { day: 7, label: 'CERT-In Foundations Complete', color: 'golden' },
      { day: 14, label: 'SOC/SIEM & Logs Operational', color: 'blue' },
      { day: 28, label: 'Full CSCRF Compliance Active', color: 'green' }
    ],
    referenceUrl: 'https://www.cert-in.org.in'
  };

  return (
    <LearningFrameworkPage framework={FRAMEWORK} />
  );
}
