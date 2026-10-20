import LearningFrameworkPage from "../../components/LearningFrameworkPage.jsx";

const FRAMEWORK = {
  id: "nist-800-171-cmmc",
  name: "NIST SP 800-171 Rev. 2 / CMMC 2.0 Level 2",
  color: "blue",
  region: "United States",
  flag: "🇺🇸",
  flagAnimation: "float",
  basePath: "/cmmc",
  referenceUrl: "https://csrc.nist.gov/pubs/sp/800/171/r2/final",
  weeks: [
    {
      week: 1,
      title: "L1 Foundation: CUI Scope, Governance & Gap Analysis",
      days: "Days 1-7",
      description:
        "Determine CUI scope, establish CMMC governance, and conduct NIST 800-171 Rev. 2 gap analysis for CMMC Level 2 readiness.",
      tasks: [
        {
          title: "Determine CUI Scope & CMMC Level Requirement",
          control: "NIST SP 800-171 Rev. 2 §3.1 / CMMC 2.0 Level 2 Scoping",
          how: "Identify all Controlled Unclassified Information (CUI): categories (Defense, Privacy, Proprietary, etc.), markings, locations (on-prem, cloud, SaaS, email, backups, prints). Map CUI flow: ingestion, processing, storage, transmission, destruction. Determine CMMC level: Level 1 (17 practices, FCI only), Level 2 (110 practices, CUI), Level 3 (110+ practices, CUI + advanced threats). Document scope with network diagrams, data flow diagrams, asset inventory.",
          check: "CUI inventory complete with markings, data flows mapped, CMMC level confirmed with contracting officer, scope diagram approved."
        },
        {
          title: "Establish CMMC Governance & Program Structure",
          control: "NIST SP 800-171 Rev. 2 §3.12 / CMMC 2.0 Governance",
          how: "Create CMMC Steering Committee (CISO, CIO, CTO, Legal, Contracts, Business). Appoint CMMC Program Manager (CPM). Define RACI: Practice Owners (implement), Evidence Collectors, QA/Internal Assessors, C3PAO Liaison. Set up CMMC tracking tool (Excel, GRC platform, MyCSF). Establish communication cadence (weekly working, monthly steering). Define System Security Plan (SSP) structure per NIST 800-171 templates.",
          check: "Steering committee chartered, CPM assigned, RACI complete, tracking tool configured, SSP template selected."
        },
        {
          title: "Conduct NIST 800-171 Rev. 2 Gap Analysis (110 Practices)",
          control: "NIST SP 800-171 Rev. 2 - All 14 Families, 110 Practices",
          how: "Assess each practice across 14 families: AC (22), AT (3), AU (9), CM (9), IA (11), IR (3), MA (6), MP (8), PE (6), PL (3), PS (2), RA (3), SC (16), SI (7). Score: MET, PARTIAL, NOT MET, N/A. Document evidence gaps: policy missing, procedure missing, implementation missing, evidence missing. Estimate remediation effort (hours, cost, tools). Prioritize by: CMMC assessment scoring (MET=1, PARTIAL=0, NOT MET=0), risk, dependency.",
          check: "Gap analysis complete for all 110 practices, scores documented, evidence gaps catalogued, remediation estimates done, heat map produced."
        },
        {
          title: "Develop CMMC Remediation Plan & POA&M",
          control: "NIST SP 800-171 Rev. 2 / CMMC 2.0 - Plan of Action & Milestones",
          how: "Create POA&M: practice mapping to tasks, resource allocation (staff, consultants, tools: SIEM, EDR, PAM, DLP, MFA, encryption), timeline with milestones (30/60/90/120/180/365 days), budget. Define evidence requirements per practice: policy doc, procedure doc, config screenshot, log extract, scan report, training record, test result. Risk acceptance process for residual gaps (senior official approval). Executive sign-off on plan and budget.",
          check: "POA&M complete with all practices, milestones defined, budget approved, evidence requirements specified, risk acceptance process established."
        }
      ]
    },
    {
      week: 2,
      title: "L2 Implementation: Access Control, Awareness, Audit & Configuration (Families AC, AT, AU, CM)",
      days: "Days 8-14",
      description:
        "Implement practices for Access Control (22), Awareness & Training (3), Audit & Accountability (9), Configuration Management (9).",
      tasks: [
        {
          title: "Family AC: Access Control (22 practices - AC.L1-3.1.1 to AC.L2-3.1.22)",
          control: "NIST SP 800-171 Rev. 2 §3.1 - Access Control",
          how: "Implement: Account management (AC.L2-3.1.1), Access enforcement (AC.L2-3.1.2), Information flow enforcement (AC.L2-3.1.3), Separation of duties (AC.L2-3.1.4), Least privilege (AC.L2-3.1.5), Privileged account management (AC.L2-3.1.6), Privileged function (AC.L2-3.1.7), Unsuccessful logon (AC.L2-3.1.8), System use notification (AC.L2-3.1.9), Previous logon (AC.L2-3.1.10), Concurrent session (AC.L2-3.1.11), Session lock (AC.L2-3.1.12), Session termination (AC.L2-3.1.13), Remote access (AC.L2-3.1.14), Wireless access (AC.L2-3.1.15), Access control for mobile (AC.L2-3.1.16), External system connections (AC.L2-3.1.17), Public access (AC.L2-3.1.18), CUI access control (AC.L2-3.1.19), CUI flow control (AC.L2-3.1.20), Encryption for CUI (AC.L2-3.1.21), Public access control (AC.L2-3.1.22). Evidence: IAM reports, PAM logs, MFA enrollment, session configs, wireless policies, mobile configs, encryption verification.",
          check: "All 22 AC practices implemented, MFA 100% for CUI access, PAM for all privileged, session controls enforced, encryption verified."
        },
        {
          title: "Family AT: Awareness & Training (3 practices - AT.L2-3.2.1 to AT.L2-3.2.3)",
          control: "NIST SP 800-171 Rev. 2 §3.2 - Awareness & Training",
          how: "Implement: Role-based training (AT.L2-3.2.1): CUI handling, insider threat, phishing, secure coding, admin hardening. Training records (AT.L2-3.2.2): LMS tracking, completion >95%, annual refresh. Insider threat training (AT.L2-3.2.3): indicators, reporting. Evidence: training materials, LMS reports, completion certificates, phishing simulation results.",
          check: "Role-based training delivered, completion >95%, insider threat training completed, phishing simulations quarterly, records audit-ready."
        },
        {
          title: "Family AU: Audit & Accountability (9 practices - AU.L2-3.3.1 to AU.L2-3.3.9)",
          control: "NIST SP 800-171 Rev. 2 §3.3 - Audit & Accountability",
          how: "Implement: Audit events (AU.L2-3.3.1): define event types (logon, access, config change, privilege use). Audit content (AU.L2-3.3.2): what, when, who, where, outcome. Audit review (AU.L2-3.3.3): weekly automated, monthly manual. Audit alerts (AU.L2-3.3.4): real-time for critical events. Audit retention (AU.L2-3.3.5): 1 year online, 6 years offline. Audit protection (AU.L2-3.3.6): immutable storage, access control. Audit reduction (AU.L2-3.3.7): correlation, SIEM. Time sync (AU.L2-3.3.8): NTP, stratum. Audit tools (AU.L2-3.3.9): SIEM, log management. Evidence: SIEM configs, log samples, review reports, alert rules, retention policies, NTP config.",
          check: "SIEM ingesting all required sources, alert rules for critical events, weekly automated reviews, 1yr/6yr retention, immutable logs, NTP synchronized."
        },
        {
          title: "Family CM: Configuration Management (9 practices - CM.L2-3.4.1 to CM.L2-3.4.9)",
          control: "NIST SP 800-171 Rev. 2 §3.4 - Configuration Management",
          how: "Implement: Baseline config (CM.L2-3.4.1): hardened images (CIS Benchmarks, STIGs). Config change control (CM.L2-3.4.2): change advisory board, testing, approval, rollback. Config settings (CM.L2-3.4.3): enforce baselines via IaC, DSC, Ansible, Group Policy. Config monitoring (CM.L2-3.4.4): drift detection (CSPM, Tripwire), alerting. Access restrictions for change (CM.L2-3.4.5): signed code, approved repos. Least functionality (CM.L2-3.4.6): disable unused ports/services/protocols. Inventory (CM.L2-3.4.7): authorized software list. Software install restrictions (CM.L2-3.4.8): allowlist, admin approval. User-installed software (CM.L2-3.4.9): policy, monitoring. Evidence: baseline docs, change tickets, drift reports, allowlists, software inventory.",
          check: "Baselines defined per CIS/STIG, change control enforced, drift detection active, allowlists enforced, software inventory current."
        }
      ]
    },
    {
      week: 3,
      title: "L3 Implementation: Remaining Families (IA, IR, MA, MP, PE, PL, PS, RA, SC, SI)",
      days: "Days 15-21",
      description:
        "Implement remaining 71 practices across Identification & Authentication, Incident Response, Maintenance, Media Protection, Physical, Planning, Personnel, Risk Assessment, System & Communications Protection, System & Information Integrity.",
      tasks: [
        {
          title: "Family IA: Identification & Authentication (11 practices - IA.L2-3.5.1 to IA.L2-3.5.11)",
          control: "NIST SP 800-171 Rev. 2 §3.5 - Identification & Authentication",
          how: "Implement: Identifier management (IA.L2-3.5.1), Authenticator management (IA.L2-3.5.2), Device identification (IA.L2-3.5.3), Identifier reuse (IA.L2-3.5.4), Authenticator feedback (IA.L2-3.5.5), Cryptographic module (IA.L2-3.5.6), Password complexity (IA.L2-3.5.7), Password reuse (IA.L2-3.5.8), MFA for privileged (IA.L2-3.5.9), MFA for non-privileged (IA.L2-3.5.10), Replay resistance (IA.L2-3.5.11). Evidence: IAM policies, MFA enrollment reports, password policies, FIPS 140-2 validated modules, device certificates.",
          check: "MFA 100% (privileged + non-privileged), FIPS 140-2 modules used, password policies enforced, device identity managed, replay resistance implemented."
        },
        {
          title: "Family IR: Incident Response (3 practices) & MA: Maintenance (6 practices)",
          control: "NIST SP 800-171 Rev. 2 §3.6-3.7 - IR & Maintenance",
          how: "IR: Plan (IR.L2-3.6.1): NIST 800-61 aligned, roles, comms, evidence preservation. Training (IR.L2-3.6.2): annual, tabletop. Testing (IR.L2-3.6.3): annual functional exercise. MA: Controlled maintenance (MA.L2-3.7.1): authorized, logged. Tools (MA.L2-3.7.2): approved, inspected. Personnel (MA.L2-3.7.3): authorized, escorted. Media (MA.L2-3.7.4): sanitized. Remote (MA.L2-3.7.5): MFA, monitored. Timely (MA.L2-3.7.6): scheduled, emergency process. Evidence: IR plan, exercise AARs, maintenance logs, tool inventory, escort logs, sanitization records.",
          check: "IR plan tested annually, tabletop quarterly, maintenance logged and authorized, tools controlled, remote maintenance secured, sanitization verified."
        },
        {
          title: "Family MP: Media Protection (8) & PE: Physical & Environmental (6)",
          control: "NIST SP 800-171 Rev. 2 §3.8-3.10 - Media & Physical Protection",
          how: "MP: Access (MP.L2-3.8.1): authorized only. Marking (MP.L2-3.8.2): CUI labels. Sanitization (MP.L2-3.8.3): NIST 800-88. Media disposal (MP.L2-3.8.4): destruction certs. Transport (MP.L2-3.8.5): encrypted, tracked. Encryption (MP.L2-3.8.6): at rest. Media use (MP.L2-3.8.7): restricted. Backup (MP.L2-3.8.8): protected. PE: Physical access (PE.L2-3.10.1): badges, logs. Visitor (PE.L2-3.10.2): escorted, logged. Monitoring (PE.L2-3.10.3): cameras, alarms. Power (PE.L2-3.10.4): UPS, generator. Emergency (PE.L2-3.10.5): shutdown procedures. Fire (PE.L2-3.10.6): suppression. Evidence: media logs, sanitization certs, transport logs, encryption verification, badge logs, visitor logs, camera footage, UPS tests, fire inspections.",
          check: "All media sanitized per NIST 800-88, disposal certified, transport encrypted/tracked, physical access controlled, visitors escorted, environmental controls tested."
        },
        {
          title: "Families PL, PS, RA, SC, SI: Planning, Personnel, Risk, System Protection, Integrity (31 practices)",
          control: "NIST SP 800-171 Rev. 2 §3.9, 3.11-3.14 - Remaining Families",
          how: "PL: Security plans (PL.L2-3.9.1): SSP current. Rules of behavior (PL.L2-3.9.2): signed. Privacy (PL.L2-3.9.3): CUI privacy. PS: Screening (PS.L2-3.11.1): background checks. Termination (PS.L2-3.11.2): immediate revocation. RA: Vulnerability scanning (RA.L2-3.11.1): monthly auth, quarterly unauth. Vuln remediation (RA.L2-3.11.2): SLAs. Threat monitoring (RA.L2-3.11.3): threat intel. SC: Boundary protection (SC.L2-3.13.1): firewalls, segmentation. CUI isolation (SC.L2-3.13.2): separate VLAN/DMZ. Public access (SC.L2-3.13.3): proxy, WAF. Comm protection (SC.L2-3.13.4): TLS, IPsec. CUI encryption (SC.L2-3.13.5): FIPS. Key management (SC.L2-3.13.6): HSM. Network decompose (SC.L2-3.13.7): architectural. Integrity (SC.L2-3.13.8): FIM. Mobile code (SC.L2-3.13.9): policy. VoIP (SC.L2-3.13.10): secure. FIPS (SC.L2-3.13.11): validated. CUI at rest (SC.L2-3.13.12): encrypted. Collab (SC.L2-3.13.13): controlled. Mobile (SC.L2-3.13.14): container. Remote (SC.L2-3.13.15): VPN, MFA. Wireless (SC.L2-3.13.16): WPA3, certs. SI: Flaw remediation (SI.L2-3.14.1): patch SLAs. Malware (SI.L2-3.14.2): EDR. Alerts (SI.L2-3.14.3): SIEM. Monitoring (SI.L2-3.14.4): continuous. Unauthorized software (SI.L2-3.14.5): allowlist. Spam (SI.L2-3.14.6): filtering. Email auth (SI.L2-3.14.7): DMARC/DKIM/SPF.",
          check: "All 31 practices implemented, SSP current, background checks done, vuln scanning monthly with SLA compliance, network segmented with CUI isolation, FIPS validated crypto, EDR 100%, SIEM monitoring, allowlists enforced, DMARC/DKIM/SPF configured."
        }
      ]
    },
    {
      week: 4,
      title: "L4 Assessment: C3PAO Assessment, SPRS Score & Continuous Monitoring",
      days: "Days 22-28",
      description:
        "Prepare for and execute CMMC Level 2 assessment with C3PAO, submit SPRS score, and establish continuous monitoring.",
      tasks: [
        {
          title: "Prepare for C3PAO Assessment",
          control: "CMMC 2.0 - C3PAO Assessment Preparation",
          how: "Select CMMC Third-Party Assessment Organization (C3PAO) from Cyber AB marketplace. Execute assessment agreement. Prepare assessment package: SSP (current), POA&M (current), evidence organized per practice (policy, procedure, implementation, artifact), network diagrams, data flow diagrams, asset inventory, CUI inventory, user lists, vendor list. Conduct mock assessment (internal or consultant): practice-by-practice walkthrough, evidence review, interview prep. Address findings before C3PAO arrival.",
          check: "C3PAO selected and contracted, assessment package complete, mock assessment passed, all evidence organized and accessible."
        },
        {
          title: "Execute CMMC Level 2 Assessment",
          control: "CMMC 2.0 - Assessment Execution",
          how: "Support C3PAO: evidence presentation, system demonstrations, staff interviews (practice owners, IT, security, HR, facilities), facility tour, artifact review. Assessment method: examine (documents), interview (personnel), test (systems). Track assessment findings in real-time. Address requests for additional evidence within 24 hours. Participate in draft assessment report review: challenge inaccuracies, provide clarifying evidence.",
          check: "Assessment fieldwork completed, all C3PAO requests addressed, draft report reviewed, final assessment result: MET for all 110 practices."
        },
        {
          title: "Submit SPRS Score & Achieve CMMC Certification",
          control: "CMMC 2.0 - SPRS Submission & Certification",
          how: "Calculate SPRS score: 110 max (1 point per MET practice). Submit to Supplier Performance Risk System (SPRS) via PIEE. Score 110 = Level 2 certified. Receive CMMC certificate from Cyber AB (valid 3 years). Affirmation: annual self-affirmation for Years 2-3. Plan: reassessment at Year 3. Communicate: prime contractor, DCMA, contracting officer. Update: SAM.gov registration, vendor questionnaires.",
          check: "SPRS score 110 submitted, CMMC certificate received, annual affirmation calendar set, prime/DCMA notified, SAM.gov updated."
        },
        {
          title: "Establish Continuous CMMC Monitoring & Recertification Program",
          control: "CMMC 2.0 - Continuous Monitoring & Recertification",
          how: "Continuous monitoring: automated control checks (SIEM, CSPM, IAM, Vuln Mgmt, EDR), monthly practice self-assessment, quarterly internal audit, annual affirmation preparation. Change management: new systems assessed for CUI impact, new practices evaluated. Recertification: Year 3 reassessment planning starts Month 24. Maintain: evidence currency, POA&M closure, C3PAO relationship, Cyber AB updates. NIST 800-171 Rev. 3 readiness (when released).",
          check: "Automated monitoring >90% practices, monthly self-assessments, quarterly internal audits, evidence current, recertification planning started Month 24, NIST 800-171 Rev. 3 watch active."
        }
      ]
    }
  ],
};

export default function Nist800171CmmcPage() {
  return (
    <>
      <LearningFrameworkPage framework={FRAMEWORK} />
    </>
  );
}

export { FRAMEWORK };