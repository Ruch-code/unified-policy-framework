import LearningFrameworkPage from "../../components/LearningFrameworkPage.jsx";

const FRAMEWORK = {
  id: "hitrust",
  name: "HITRUST CSF v11.x Certification",
  color: "red",
  region: "United States",
  flag: "🇺🇸",
  flagAnimation: "pulse",
  basePath: "/hitrust",
  referenceUrl: "https://hitrustalliance.net/hitrust-csf/",
  weeks: [
    {
      week: 1,
      title: "L1 Foundation: HITRUST Scope, Readiness & Governance",
      days: "Days 1-7",
      description:
        "Establish HITRUST governance, define assessment scope (r2, i1, e1), and conduct initial readiness assessment.",
      tasks: [
        {
          title: "Select HITRUST Assessment Type & Define Scope",
          control: "HITRUST CSF v11 - Assessment Types (r2, i1, e1)",
          how: "Choose assessment: r2 (comprehensive, 276 controls, 2-year validated + 1-year interim), i1 (implementation, 182 controls, 1-year), e1 (essentials, 44 controls, 1-year). Define scope: in-scope systems, applications, facilities, business units, data flows (ePHI, PII, PCI). Document scope statement with boundaries, exclusions, and justification. Register in MyCSF portal.",
          check: "Assessment type selected per risk appetite/budget, scope statement approved, MyCSF registration complete, and boundaries documented."
        },
        {
          title: "Establish HITRUST Governance & Project Structure",
          control: "HITRUST CSF - Governance & Program Management",
          how: "Create HITRUST Steering Committee (CISO, CIO, CPO, Legal, Compliance, Business Leaders). Appoint HITRUST Program Manager. Define RACI: Control Owners (implement), Evidence Collectors (gather), QA Reviewers (validate), Assessor Liaison (manage assessor). Set up MyCSF workspace with control assignments, due dates, and workflow. Establish communication cadence (weekly standups, monthly steering).",
          check: "Steering committee chartered, Program Manager assigned, RACI complete, MyCSF workspace configured, and cadence established."
        },
        {
          title: "Conduct HITRUST Readiness Assessment (Gap Analysis)",
          control: "HITRUST CSF - Readiness Assessment",
          how: "Perform control-by-control gap analysis in MyCSF: for each in-scope control, assess current state (policy, procedure, implementation, evidence). Score: Fully Compliant, Partially Compliant, Non-Compliant, Not Applicable. Document gaps with remediation effort estimates (hours, cost, timeline). Prioritize by: risk, effort, dependency, assessor feedback. Produce Readiness Report with heat map.",
          check: "Gap analysis complete for all in-scope controls, gaps documented with estimates, heat map produced, and remediation priorities set."
        },
        {
          title: "Develop HITRUST Remediation Plan & Budget",
          control: "HITRUST CSF - Remediation Planning",
          how: "Create remediation plan: control mapping to projects, resource allocation (internal, consultants, tools), timeline with milestones (30/60/90/120/180 days), budget (tools, consulting, assessor fees, staff time), risk acceptance process for residual gaps. Define evidence requirements per control (policy, procedure, config screenshot, log extract, report, attestation). Get executive sign-off on plan and budget.",
          check: "Remediation plan with milestones approved, budget signed off, evidence requirements defined per control, and risk acceptance process established."
        }
      ]
    },
    {
      week: 2,
      title: "L2 Implementation: Policy, Controls & Evidence - Domains 1-6",
      days: "Days 8-14",
      description:
        "Implement controls and collect evidence for HITRUST CSF Domains 1-6: Information Protection, Endpoint Protection, Portable Media, Mobile Device, Wireless, Network Protection.",
      tasks: [
        {
          title: "Domain 1: Information Protection Program (10 controls)",
          control: "HITRUST CSF v11 - Domain 1: Information Protection Program",
          how: "Implement: Information Protection Policy (1.a), Data Classification (1.b), Data Handling (1.c), Data Retention (1.d), Data Disposal (1.e), Encryption Management (1.f), Key Management (1.g), DLP Program (1.h), Information Labeling (1.i), Cloud Data Protection (1.j). Evidence: approved policies, classification schema, handling procedures, retention schedule, disposal certificates, encryption inventory, key ceremony logs, DLP incident reports, labeling examples, cloud encryption configs.",
          check: "All 10 controls implemented, policies approved, evidence collected in MyCSF, and QA reviewed."
        },
        {
          title: "Domain 2: Endpoint Protection (12 controls)",
          control: "HITRUST CSF v11 - Domain 2: Endpoint Protection",
          how: "Implement: Malware Protection (2.a), Patch Management (2.b), Vulnerability Scanning (2.c), Configuration Management (2.d), Endpoint Encryption (2.e), Endpoint DLP (2.f), Application Whitelisting (2.g), Host Firewall (2.h), Endpoint Monitoring (2.i), Remote Access Security (2.j), BYOD Security (2.k), IoT/OT Device Security (2.l). Evidence: AV/EDR console reports, patch compliance reports, vulnerability scan results, baseline configs, BitLocker/FileVault reports, DLP alerts, whitelist policies, firewall logs, EDR telemetry, VPN/MFA logs, MDM compliance, IoT inventory.",
          check: "All 12 controls implemented, automated evidence collection where possible, compliance >95%, and exceptions documented."
        },
        {
          title: "Domain 3: Portable Media Security (5 controls)",
          control: "HITRUST CSF v11 - Domain 3: Portable Media Security",
          how: "Implement: Media Policy (3.a), Media Encryption (3.b), Media Tracking (3.c), Media Sanitization (3.d), Media Disposal (3.e). Evidence: policy, encryption verification (BitLocker To Go, encrypted USB), asset tracking logs, sanitization certificates (NIST 800-88), disposal records.",
          check: "All 5 controls implemented, media inventory tracked, encryption enforced, and sanitization/disposal certified."
        },
        {
          title: "Domain 4: Mobile Device Security (8 controls)",
          control: "HITRUST CSF v11 - Domain 4: Mobile Device Security",
          how: "Implement: Mobile Policy (4.a), MDM/MAM Enrollment (4.b), Containerization (4.c), Mobile Encryption (4.d), App Vetting (4.e), Remote Wipe (4.f), Jailbreak/Root Detection (4.g), Mobile DLP (4.h). Evidence: policy, MDM console compliance, container configs, encryption status, app store approvals, wipe test results, detection logs, DLP policies.",
          check: "All 8 controls implemented, MDM compliance >95%, containerization for all corporate data, and remote wipe tested."
        }
      ]
    },
    {
      week: 3,
      title: "L3 Implementation: Domains 7-19 & Evidence Finalization",
      days: "Days 15-21",
      description:
        "Complete remaining HITRUST domains (Wireless, Network, Transmission, Password, Access, Audit, BCDR, etc.) and finalize evidence package.",
      tasks: [
        {
          title: "Domain 5: Wireless Security (4 controls) & Domain 6: Network Protection (15 controls)",
          control: "HITRUST CSF v11 - Domains 5 & 6",
          how: "Wireless: Policy (5.a), Encryption (5.b), Authentication (5.c), Rogue AP Detection (5.d). Network: Policy (6.a), Segmentation (6.b), Firewall Management (6.c), IDS/IPS (6.d), VPN (6.e), Remote Access (6.f), Wireless Integration (6.g), Network Monitoring (6.h), DDoS Protection (6.i), Web Filtering (6.j), Email Security (6.k), DNS Security (6.l), Network Access Control (6.m), SDN Security (6.n), Zero Trust (6.o). Evidence: wireless configs, segmentation diagrams, firewall rule reviews, IDS/IPS logs, VPN/MFA logs, monitoring dashboards, DDoS configs, email gateway logs, DNSSEC, NAC policies.",
          check: "All 19 controls implemented, network segmentation validated, IDS/IPS tuned, zero trust architecture progressing, and evidence uploaded."
        },
        {
          title: "Domain 7: Transmission Protection (8 controls) & Domain 8: Password Management (6 controls)",
          control: "HITRUST CSF v11 - Domains 7 & 8",
          how: "Transmission: Encryption in Transit (7.a), TLS Configuration (7.b), Certificate Management (7.c), Secure File Transfer (7.d), API Security (7.e), Email Encryption (7.f), Fax Security (7.g), Legacy Protocol Remediation (7.h). Password: Policy (8.a), Complexity (8.b), MFA (8.c), Privileged Password Vault (8.d), Password Rotation (8.e), Breached Password Check (8.f). Evidence: TLS scans, cert inventory, SFTP/FTPS configs, API gateway policies, email encryption reports, fax server configs, password policy GPO, MFA enrollment >95%, vault audit logs, HaveIBeenPwned integration.",
          check: "All 14 controls implemented, TLS 1.2+ enforced everywhere, MFA >95%, vault for all privileged accounts, and breached password detection active."
        },
        {
          title: "Domain 9: Access Control (20 controls) & Domain 10: Audit Logging (12 controls)",
          control: "HITRUST CSF v11 - Domains 9 & 10",
          how: "Access: Policy (9.a), Provisioning (9.b), Deprovisioning (9.c), Review/Recertification (9.d), Least Privilege (9.e), Segregation of Duties (9.f), Privileged Access (9.g), Emergency Access (9.h), Session Management (9.i), Remote Access (9.j), Third-Party Access (9.k), Application Access (9.l), Database Access (9.m), Cloud Access (9.n), Physical Access (9.o), Visitor Access (9.p), Biometric Access (9.q), Access Logging (9.r), Access Review Automation (9.s), Identity Federation (9.t). Audit: Policy (10.a), Log Generation (10.b), Log Collection (10.c), Log Retention (10.d), Log Integrity (10.e), Log Review (10.f), SIEM (10.g), Alerting (10.h), Clock Sync (10.i), Log Archive (10.j), Audit Log Protection (10.k), Audit Reporting (10.l). Evidence: IAM reports, recertification campaigns, SoD matrices, PIM/PAM logs, break-glass procedures, session logs, SIEM dashboards, alert tuning, NTP configs, log immutability.",
          check: "All 32 controls implemented, quarterly access reviews completed, SIEM coverage >90% of critical logs, alert fatigue managed, and log integrity verified."
        },
        {
          title: "Domain 11-19: Remaining Domains & Evidence QA",
          control: "HITRUST CSF v11 - Domains 11-19",
          how: "Complete remaining domains: 11-Education (5), 12-BCDR (15), 13-Incident Response (12), 14-Business Associates (8), 15-Physical (10), 16-Third Party (12), 17-Software Dev (10), 18-Encryption (8), 19-Risk Mgmt (8). Total remaining: ~88 controls. Prioritize: BCDR (test results), Incident Response (tabletop evidence), Third Party (vendor assessments), Software Dev (SDLC, SAST/DAST), Encryption (key management), Risk Mgmt (register, treatment). Conduct evidence QA: completeness, currency, relevance, format. Mock assessor review.",
          check: "All remaining controls implemented, evidence QA passed, mock assessor review completed, and remediation items closed."
        }
      ]
    },
    {
      week: 4,
      title: "L4 Assessment: Validated Assessment & Continuous Compliance",
      days: "Days 22-28",
      description:
        "Execute HITRUST validated assessment, achieve certification, and establish continuous compliance program.",
      tasks: [
        {
          title: "Engage HITRUST Authorized External Assessor",
          control: "HITRUST CSF - Assessor Engagement",
          how: "Select HITRUST Authorized Assessor from approved list. Execute engagement letter: scope, timeline, fees, team, communication protocol. Prepare assessor package: scope document, network diagrams, data flows, control evidence index, MyCSF access. Schedule: kickoff, evidence review (remote), on-site/remote testing (1-2 weeks for r2), draft report review, final report. Coordinate assessor requests promptly.",
          check: "Assessor engaged, engagement letter signed, assessor package delivered, schedule agreed, and communication protocol established."
        },
        {
          title: "Execute Validated Assessment (r2/i1/e1)",
          control: "HITRUST CSF - Validated Assessment Process",
          how: "Support assessor: evidence walkthrough, control testing (inquiry, observation, inspection, re-performance), sample testing (transactions, configs, logs), interview control owners, facility tour (physical), penetration test coordination (if required), vulnerability scan review. Address assessor questions within 24 hours. Track findings in real-time. Participate in draft report review: challenge inaccuracies, provide additional evidence.",
          check: "Assessment fieldwork completed, all assessor requests addressed, draft report reviewed, and final report issued with certification."
        },
        {
          title: "Achieve HITRUST Certification & Communicate",
          control: "HITRUST CSF - Certification & Reporting",
          how: "Receive HITRUST Certification: r2 (2-year validated + 1-year interim), i1 (1-year), e1 (1-year). Download certificate and seal. Communicate: press release, customer notifications, partner portal update, marketing materials, sales enablement. Update: vendor risk questionnaires, security questionnaires, RFP responses. Plan: interim assessment (r2 Year 2), recertification timeline.",
          check: "Certification received, communications executed, customer notifications sent, and interim/recertification calendar established."
        },
        {
          title: "Establish Continuous HITRUST Compliance Program",
          control: "HITRUST CSF - Continuous Compliance",
          how: "Implement continuous compliance: MyCSF continuous monitoring (monthly control self-assessments), automated evidence collection (API integrations: CSPM, SIEM, IAM, Vuln Mgmt), quarterly internal assessments, annual interim assessment (r2), change management integration (new systems, controls), regulatory change monitoring (HIPAA, state privacy, CMS), assessor relationship maintenance, MyCSF health score >90%.",
          check: "Continuous monitoring operational, automated evidence feeds connected, quarterly assessments scheduled, MyCSF health score >90%, and interim assessment planned."
        }
      ]
    }
  ],
};

export default function HitrustPage() {
  return (
    <>
      <LearningFrameworkPage framework={FRAMEWORK} />
    </>
  );
}

export { FRAMEWORK };