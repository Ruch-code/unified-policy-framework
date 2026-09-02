import LearningFrameworkPage from "../../components/LearningFrameworkPage";

export default function CertIn() {
  const FRAMEWORK = {
    id: 'cert-in',
    name: 'CERT-In (Indian Computer Emergency Response Team)',
    shortName: 'CERT-In',
    region: 'India',
    color: 'beige',
    weeks: [
      {
        week: 1,
        title: 'CERT-In Directives & Reporting Obligations',
        days: 'Days 1-7',
        description: 'Understand CERT-In statutory role and mandatory incident reporting',
        tasks: [
          {
            title: 'Map CERT-In directive applicability',
            control: 'CERT-In Directions under IT Act 2000 (Sec 70B) issued April 2022, June 2025 — applies to all service providers, intermediaries, data centres, body corporates, government entities',
            how: 'Identify if your entity is a service provider/intermediary/data centre. List all services in scope and assign an owner for CERT-In compliance.',
            check: 'Documented list of in-scope services with a named CERT-In compliance owner and board-level acknowledgment.'
          },
          {
            title: 'Understand mandatory incident categories',
            control: 'CERT-In defines 20+ incident categories including ransomware, phishing, DDoS, data breach, targeted scanning, malicious code — all must be reported',
            how: 'Create an incident categorization matrix mapping each CERT-In incident type to your internal incident classification and existing ITSM ticket categories.',
            check: 'Incident categorization matrix published; confirmed each reported class maps to a real escalation path.'
          },
          {
            title: 'Implement 6-hour symmetric-key disclosure',
            control: 'CERT-In requires notification of details of any cyber incident within 6 hours of detecting/being notified',
            how: 'Configure your SIEM and enterprise SIM of domestic/foreign SIM service logs; implement a 6-hour SLA alert and an on-call 24/7 reporting roster.',
            check: 'SIEM alert gates for 6-hour window tested with a simulated incident; hour-6 escalation demonstrated.'
          },
          {
            title: 'Maintain encrypted traffic logging for VPN/proxy',
            control: 'Vendors/service providers must enable logging of encrypted traffic (TLS/SSH/VPN) for reason of cyber security',
            how: 'Enable traffic logs on perimeter devices; store destination address, time, source, volume info, retaining 6 months. Add cloud (AWS VPC Flow Logs, Azure NSG, GCP VPC) equivalents.',
            check: 'Encrypted traffic logs enabled and retained 6 months; sample log exported and verified.'
          },
          {
            title: 'Enable 180-day rolling log retention',
            control: 'CERT-In mandates retention of logs for a rolling period of 180 days for all ICT systems',
            how: 'Tune log retention globally (S3 lifecycle, blob retention, GCS retention policies, Alibaba OSS rule) to 180 days across on-prem and cloud.',
            check: 'Audit confirms 180-day retention enforced on all log sources and hot/cold tier strategy documented.'
          }
        ]
      },
      {
        week: 2,
        title: 'Implementing CERT-In Technical Controls',
        days: 'Days 8-14',
        description: 'Deploy the technical controls CERT-In expects across environments',
        tasks: [
          {
            title: 'Deploy SOC/SIEM for real-time detection',
            control: 'CERT-In expects entities to have capabilities to detect and respond to incidents in real-time',
            how: 'Stand up a SIEM (e.g., cloud-native — AWS Security Hub, Azure Sentinel, GCP Chronicle, or self-hosted). Onboard all 180-day log sources and build dashboards per incident category.',
            check: 'SIEM ingesting production logs; detection rules aligned to CERT-In incident categories demonstrated with test alerts.'
          },
          {
            title: 'Implement domestic SIM-based fraud monitoring',
            control: 'Telecom-related directives target KYC, SIM misuse, and rogue SIM detection for fraud prevention',
            how: 'If in telecom/fintech, connect to the Central Equipment Identity Register (CEIR) and monitor IMEI-SIM binding; log network events for fraud patterns.',
            check: 'CEIR integration complete; SIM fraud detection runbook in place.'
          },
          {
            title: 'Secure network time synchronization',
            control: 'Ensure accurate, tamper-resistant timestamps for incident correlation and log forensics',
            how: 'Deploy NTP servers in prod/staging/dev; enable Network Time Security where possible; verify clock skew across all cloud regions and on-prem.',
            check: 'NTP configuration verified; device clocks within defined tolerance.'
          },
          {
            title: 'Patch and vulnerability management alignment',
            control: 'Timely patching reduces CERT-In reportable incidents; directive emphasizes proactive cyber security measures',
            how: 'Adopt a vulnerability management program (CVE feeds, cloud scanning — AWS Inspector, Azure Defender, GCP SCC, Alibaba Security Center). Define patch SLAs per criticality/environment.',
            check: 'Vulnerability scan cadence, patch SLAs, and exception process documented; latest scan report reviewed.'
          },
          {
            title: 'Implement MFA and access control',
            control: 'Harden authentication to reduce identity-related incidents reportable to CERT-In',
            how: 'Enforce MFA for all privileged/administrative access across AWS (IAM), Azure (Entra ID), GCP (IAM), Alibaba (RAM) and on-prem; apply in dev/staging/prod.',
            check: 'MFA enforced on privileged accounts; privileged access audit trail exists.'
          }
        ]
      },
      {
        week: 3,
        title: 'Verifying Incident Response & Vendor Compliance',
        days: 'Days 15-21',
        description: 'Test your incident response and third-party compliance posture',
        tasks: [
          {
            title: 'Conduct tabletop incident response drills',
            control: 'Verify you can actually report to CERT-In within 6 hours and contain incidents per policy',
            how: 'Run a tabletop with a ransomware and a phishing scenario; time the internal detection → confirmation → CERT-In notification and trace evidence capture.',
            check: 'Drill report showing 6-hour internal-to-notification timeline met; gaps logged and actioned.'
          },
          {
            title: 'Verify encrypted traffic log completeness',
            control: 'Logs must capture the actual encrypted sessions for forensic value',
            how: 'Test that TLS/SSH/VPN logs record source, destination, time, volume for both internal and cloud-hosted traffic across all environments.',
            check: 'Sample encrypted-session logs verified complete and searchable.'
          },
          {
            title: 'Audit third-party/vendor security',
            control: 'Vendors and processors handling your systems must meet CERT-In expectations',
            how: 'Review vendor contracts and DPAs for incident-notification and 180-day retention clauses; perform vendor risk reviews on cloud providers.',
            check: 'Vendor compliance matrix updated; SLA/notification clauses included in top vendor contracts.'
          },
          {
            title: 'Assess DPIA/ROPA for data protection interplay',
            control: 'Align CERT-In obligations with India DPDP Act and emerging data security rules to avoid duplicate effort',
            how: 'Cross-map CERT-In logging/incident controls with DPDP records of processing and any DPIA triggers; create one unified evidence set.',
            check: 'CERT-In + DPDP mapping matrix produced; single evidence repository agreed.'
          },
          {
            title: 'Test breach notification workflow',
            control: 'Data incidents may be reportable to CERT-In AND DPDP Board (72-hour) — ensure workflows coexist',
            how: 'Build a single incident workflow that fans out to CERT-In (6-hr), DPDP Board (if applicable), and customers/regulators; test the combined flow.',
            check: 'Unified breach notification runbook tested end-to-end.'
          }
        ]
      },
      {
        week: 4,
        title: 'CERT-In Audit Readiness & Multi-Cloud',
        days: 'Days 22-30+',
        description: 'Prepare for audit and align across cloud providers',
        tasks: [
          {
            title: 'Prepare for CERT-In/regulator audits',
            control: 'Demonstrate continuous compliance with directive logging, retention, and reporting obligations',
            how: 'Build a compliance evidence pack: log retention proof, 6-hour process, incident logs, access reviews; run an internal pre-audit.',
            check: 'Evidence pack assembled and internal pre-audit passed with no critical gaps.'
          },
          {
            title: 'Leverage cloud-native controls across providers',
            control: 'Use provider-native logging/security to satisfy CERT-In without duplicating tooling',
            how: 'AWS: CloudTrail+GuardDuty+Config-VPC Flow Logs; Azure: Defender for Cloud+Sentinel+NSG flow logs; GCP: Cloud Audit Logs+SCC+Chronicle; Alibaba: ActionTrail+Security Center+SLS.',
            check: 'Cloud-native logging/security mapped to each CERT-In requirement; duplication removed.'
          },
          {
            title: 'Document common CERT-In gaps and remediation',
            control: 'Recurring failures often include missing 180-day retention and 6-hour reporting flakiness',
            how: 'Inventory typical findings (log gaps, retention misconfig, untested 6-hour flow, missing VPN logs) and assign owners/target dates.',
            check: 'Remediation register tracks each common gap to closure.'
          },
          {
            title: 'Integrate CERT-In into unified policy framework',
            control: 'Align logging, incident response, and access policies with other frameworks (ISO 27001, DPDPA, CSCRF) for one policy set',
            how: 'Create a cross-framework control matrix linking CERT-In requirements to ISO 27001 Annex A, NIST CSF, DPDP rules to avoid duplicate controls.',
            check: 'Unified control-to-framework mapping published and versioned.'
          },
          {
            title: 'Continuous monitoring and policy updates',
            control: 'CERT-In directives evolve; stay current with new directions and sector mandates',
            how: 'Subscribe to CERT-In advisories; schedule quarterly review and re-baseline of controls; update policy library.',
            check: 'Advisory monitoring process and quarterly re-baseline scheduled.'
          }
        ]
      }
    ],
    milestones: [
      { day: 30, label: 'Reporting & Logs Operational', color: 'blue' },
      { day: 45, label: 'IR Drills & Verification Done', color: 'purple' },
      { day: 60, label: 'Audit & Multi-Cloud Ready', color: 'green' }
    ],
    referenceUrl: 'https://www.cert-in.org.in/'
  };

  return <LearningFrameworkPage framework={FRAMEWORK} />;
}
