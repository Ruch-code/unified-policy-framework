import LearningFrameworkPage from "../../components/LearningFrameworkPage.jsx";

const FRAMEWORK = {
  id: "iso-22317",
  name: "ISO 22317:2021 Business Impact Analysis Playbook",
  color: "emerald",
  region: "Global",
  flag: "🌐",
  flagAnimation: "float",
  basePath: "/iso-22317",
  referenceUrl: "https://www.iso.org/standard/74883.html",
  milestones: [
    { day: 7, label: "BIA Foundations Mastered" },
    { day: 14, label: "Impact Analysis Complete" },
    { day: 28, label: "BIA Report Delivered" },
  ],
  weeks: [
    {
      week: 1,
      title: "ISO 22317:2021 Structure & BIA Fundamentals",
      days: "Days 1–7",
      description: "Master the BIA standard architecture, key terminology, and its relationship to ISO 22301 BCMS before planning any analysis.",
      tasks: [
        {
          title: "Map ISO 22317:2021 clause structure (Clauses 4–7)",
          control: "Understand the standard's scope: Clause 4 (BIA process), Clause 5 (BIA planning), Clause 6 (BIA execution), Clause 7 (BIA reporting). Link each to ISO 22301 Clause 8.2 (Business Impact Analysis).",
          how: "Create a one-page clause map showing how ISO 22317 feeds into ISO 22301 BCMS. Identify which organizational functions each clause touches.",
          check: "Verify you can explain how Clause 6 (BIA execution) feeds into Clause 7 (reporting) and how the BIA output drives business continuity strategies in ISO 22301.",
        },
        {
          title: "Distinguish BIA from risk assessment",
          control: "ISO 22317 focuses on impact of disruption over time (operational, financial, legal, reputational). Risk assessment (ISO 31000/ISO 22301) focuses on likelihood and consequence of threats.",
          how: "Create a comparison table: BIA = impact × time (what happens if process stops); Risk Assessment = likelihood × consequence (what could cause disruption). Map each to ISO 22301 clauses.",
          check: "Confirm you can explain why both are required for BCMS: BIA sets recovery objectives (RTO/RPO), risk assessment informs treatment selection.",
        },
        {
          title: "Identify critical business functions & dependencies",
          control: "ISO 22317 Clause 5.3 requires identification of products/services, supporting processes, resources (people, technology, facilities, suppliers), and interdependencies.",
          how: "Work with stakeholders to inventory all products/services. Map each to its supporting processes, required resources, and upstream/downstream dependencies. Use dependency mapping workshops.",
          check: "Verify every product/service has documented: maximum tolerable period of disruption (MTPD), recovery time objective (RTO), recovery point objective (RPO), and minimum service level.",
        },
        {
          title: "Define impact types and measurement scales",
          control: "ISO 22317 Clause 6.2 defines impact types: operational, financial, legal/regulatory, reputational, contractual. Each needs quantified scales (e.g., 1–5 or monetary).",
          how: "Develop impact rating scales with business stakeholders. Define quantitative thresholds for each impact type (e.g., financial: <$10K=Low, $10K–$100K=Medium, >$100K=High).",
          check: "Confirm scales are approved by leadership, documented in BIA methodology, and consistently applied across all analyzed functions.",
        },
        {
          title: "Understand ISO 22317:2021 updates from 2015 version",
          control: "Key 2021 changes: emphasis on supply chain dependencies, expanded impact types (including environmental/social), clearer MTPD/RTO/RPO definitions, alignment with ISO 22301:2019.",
          how: "Create a delta document comparing 2015 vs 2021 clauses. Highlight new requirements for supplier BIA, expanded stakeholder engagement, and integration with ISO 22301:2019 BCMS.",
          check: "Verify BIA methodology document references ISO 22317:2021 explicitly and addresses all new/expanded requirements.",
        },
      ],
    },
    {
      week: 2,
      title: "BIA Planning & Stakeholder Engagement",
      days: "Days 8–14",
      description: "Build the BIA project plan, engage stakeholders, and prepare data collection instruments per ISO 22317 Clause 5.",
      tasks: [
        {
          title: "Develop BIA project plan and governance",
          control: "ISO 22317 Clause 5.1 requires defining BIA scope, objectives, timeline, roles, resources, and approval process.",
          how: "Draft BIA project charter: scope (which entities/processes), objectives (RTO/RPO determination), timeline (typically 4–12 weeks), RACI matrix, steering committee, and escalation path.",
          check: "Verify plan signed off by senior management, budget allocated, and key stakeholder availability confirmed.",
        },
        {
          title: "Identify and engage BIA stakeholders",
          control: "ISO 22317 Clause 5.2 requires identifying process owners, subject matter experts, senior sponsors, and supplier representatives.",
          how: "Create stakeholder register: role, process(es) owned, availability, preferred communication, and engagement level (consult/inform/collaborate). Schedule kickoff workshops.",
          check: "Confirm all critical process owners committed to participation, senior sponsor assigned, and supplier representatives identified for critical dependencies.",
        },
        {
          title: "Design data collection questionnaires & workshops",
          control: "ISO 22317 Clause 6.1 requires structured data collection covering: process description, inputs/outputs, resources, dependencies, current recovery capabilities, and impact over time.",
          how: "Build standardized questionnaire template: process profile, resource inventory, dependency map, current controls, impact assessment tables (operational/financial/legal/reputational at 1hr/4hr/24hr/72hr/1week/1month).",
          check: "Pilot questionnaire with 2–3 process owners. Refine for clarity, reduce completion time to <2 hours per process.",
        },
        {
          title: "Identify regulatory & contractual requirements",
          control: "ISO 22317 Clause 5.4 requires capturing legal, regulatory, contractual, and stakeholder expectations for recovery.",
          how: "Review contracts, regulations, SLAs, and licenses. Extract RTO/RPO obligations (e.g., PCI-DSS 24hr, GDPR 72hr breach notification, banking 4hr). Document in requirements register.",
          check: "Verify requirements register mapped to each critical process with specific recovery obligations cited.",
        },
      ],
    },
    {
      week: 3,
      title: "BIA Execution: Data Collection & Impact Analysis",
      days: "Days 15–21",
      description: "Execute BIA per ISO 22317 Clause 6: conduct workshops, collect data, analyze impacts, and determine RTO/RPO/MTPD.",
      tasks: [
        {
          title: "Conduct BIA workshops with process owners",
          control: "ISO 22317 Clause 6.3: structured interviews/workshops to validate process profiles, dependencies, resource requirements, and current recovery arrangements.",
          how: "Facilitate 60–90 min workshops per critical process. Walk through questionnaire. Document: process flow, inputs/outputs, key resources, single points of failure, current workarounds, impact ratings at defined time intervals.",
          check: "Verify workshop minutes signed by process owner, all impact ratings justified with evidence, and action items tracked.",
        },
        {
          title: "Analyze impacts over time & determine MTPD/RTO/RPO",
          control: "ISO 22317 Clause 6.4: calculate impact escalation at defined time intervals. MTPD = point where impact becomes unacceptable. RTO < MTPD. RPO based on data criticality.",
          how: "For each process: plot impact curve (x=time, y=impact score). Identify MTPD where curve crosses 'unacceptable' threshold. Set RTO = 50–80% of MTPD. Set RPO based on data change rate and tolerance.",
          check: "Confirm RTO ≤ MTPD for all critical processes. Validate RPO achievable with current backup/replication technology.",
        },
        {
          title: "Assess resource requirements for recovery",
          control: "ISO 22317 Clause 6.5: determine minimum resources (people, technology, facilities, information, suppliers) needed to operate at minimum service level within RTO.",
          how: "Create resource requirement matrix per process: minimum staff (roles/skills), systems/applications, data sets, facility needs, supplier services, and specialized equipment. Identify shared resource conflicts.",
          check: "Verify resource requirements documented for each RTO tier. Resource conflicts resolved or escalated.",
        },
        {
          title: "Identify interdependencies & supply chain impacts",
          control: "ISO 22317:2021 Clause 6.6 (expanded): map upstream/downstream dependencies, supplier criticality, and cascading failure scenarios.",
          how: "Build dependency map: for each critical process, identify internal and external dependencies. Classify suppliers as Tier 1 (critical), Tier 2 (important), Tier 3 (standard). Assess supplier BIA maturity.",
          check: "Confirm critical supplier contracts include right-to-audit, notification SLAs, and recovery commitments. Single-source suppliers flagged for risk treatment.",
        },
      ],
    },
    {
      week: 4,
      title: "BIA Reporting, Validation & Integration with BCMS",
      days: "Days 22–28",
      description: "Complete BIA report per ISO 22317 Clause 7, validate with stakeholders, and integrate outputs into ISO 22301 BCMS.",
      tasks: [
        {
          title: "Prepare BIA report per ISO 22317 Clause 7",
          control: "Report must include: executive summary, scope/objectives, methodology, process profiles, impact analysis results, MTPD/RTO/RPO table, resource requirements, dependency map, assumptions/limitations, recommendations.",
          how: "Use standardized report template. Include: heat maps (impact × time), RTO/RPO summary table, resource requirement summary, dependency visualization, and prioritized action plan for gaps.",
          check: "Verify report reviewed by steering committee, all findings traceable to source data, and recommendations prioritized by risk reduction vs effort.",
        },
        {
          title: "Validate BIA results with stakeholders",
          control: "ISO 22317 Clause 7.2: present draft findings to process owners and senior management for validation and acceptance.",
          how: "Schedule validation sessions: walk through each process's RTO/RPO with owner. Capture disagreements and resolve. Obtain formal sign-off on final RTO/RPO values.",
          check: "All critical process owners signed off on RTO/RPO. Senior management approved BIA report and resource requirements.",
        },
        {
          title: "Integrate BIA outputs into ISO 22301 BCMS",
          control: "ISO 22317 Clause 7.3 / ISO 22301 Clause 8.2: BIA outputs drive BC strategy selection, BC plan development, and exercise scenarios.",
          how: "Map BIA outputs to BCMS: RTO/RPO → BC strategy selection (ISO 22301 8.3) → BC plans (8.4) → Exercise program (8.5). Update SoA equivalent for BCMS.",
          check: "Confirm BC strategies selected align with RTO/RPO. BC plans reference BIA process priorities. Exercise program tests highest-priority processes first.",
        },
        {
          title: "Establish BIA review & update cycle",
          control: "ISO 22317 Clause 7.4: BIA must be reviewed at planned intervals and when significant changes occur (organization, technology, suppliers, regulations).",
          how: "Define BIA review policy: full review annually, targeted review after major changes (M&A, new systems, key supplier change, regulatory change). Assign ownership and trigger criteria.",
          check: "Verify review schedule in BCMS calendar, change management process includes BIA impact assessment, and previous BIA versions archived with change log.",
        },
      ],
    },
  ],
};

export default function Iso22317() {
  return <LearningFrameworkPage framework={FRAMEWORK} />;
}

,
    {
      week: 5,
      title: "BIA Walkthrough Scenarios & Incident Response Integration",
      days: "Days 29–35",
      description: "Validate BIA outputs through realistic scenario walkthroughs. Each scenario tests RTO/RPO assumptions, communication flows, decision authority, and recovery procedures against the BIA outputs. Includes questions to ask during tabletop exercises.",
      tasks: [
        {
          title: "Scenario 1: Ransomware Infection — Finance Laptop",
          control: "ISO 22317 Clause 6.4/6.5: Tests RTO/RPO for Finance processes, data integrity verification, and recovery from backup/cloud copies. Validates incident notification timeframes (4-hour delay here).",
          how: "Run tabletop: Finance laptop encrypted via phishing. Customer PII + bank routing data on laptop. Cloud copies exist. IT notified 4 hours post-infection via text. Walk through:
1. Detection & notification: Who received the text? Was escalation policy followed? 4-hour gap acceptable per RTO?
2. Containment: Network isolation, account disable, forensic image.
3. Impact assessment: PII exposure scope, bank data risk, cloud copy integrity verification.
4. Recovery: Restore from cloud share, integrity checks, device rebuild/replace.
5. Notification: Regulatory (GDPR 72hr, state breach laws), customer communication, law enforcement.
6. Post-incident: Root cause, phishing training, backup validation, notification SLA review.",
          check: "RTO for Finance process met? Cloud copy integrity validated within RPO? Notification SLAs met (GDPR 72hr, state laws)? Root cause documented and phishing controls improved?",
          questions: [
            "What is the Finance team's RTO per BIA? Was the 4-hour notification delay within acceptable limits?",
            "How do you verify cloud copy integrity before restore? What checks confirm no ransomware propagation to cloud?",
            "What is the RPO for Finance data? Does the cloud share meet this RPO (last sync timestamp)?",
            "Who has authority to trigger customer/regulatory notification? Was the 72-hour GDPR window at risk?",
            "What compensating controls exist for Finance during laptop recovery (loaner device, VDI access)?",
            "How is the 4-hour notification gap addressed in the Incident Response Plan? Is text-to-IT an approved channel?",
            "What evidence is preserved for forensic/legal purposes? Chain of custody for the laptop?",
            "Does the backup/cloud share have immutable snapshots to prevent ransomware encryption of backups?",
            "How are Finance team operations maintained during recovery (manual workarounds, alternative systems)?",
            "What contractual obligations exist for bank data exposure (PCI-DSS, banking partner agreements)?"
          ]
        },
        {
          title: "Scenario 2: DDoS Attack on Primary Infrastructure",
          control: "ISO 22317 Clause 6.4/6.5: Tests Availability RTO for internal business applications, WAF/rate-limiting effectiveness, and failover mechanisms. 12-hour outage tests MTPD.",
          how: "Run tabletop: Coordinated multi-region DDoS overwhelms WAF/rate limits. Core apps (client mgmt, order processing, reporting, comms) down 12 hours. Walk through:
1. Detection: Monitoring alerts trigger — automated vs manual detection time.
2. Mitigation: Cloud DDoS protection tools, manual filtering rules, failover activation.
3. Impact: 12-hour unavailability of client mgmt, order processing, reporting, comms. Manual workarounds implemented.
4. Communication: Internal teams, clients, partners. Status page updates.
4. Recovery: Traffic normalization, WAF tuning, DR team post-event review.
5. Post-incident: Long-term DDoS defense improvements, incident response automation.",
          check: "Application RTOs met? 12-hour outage within MTPD for each app? Failover mechanisms activated correctly? Communication SLAs met?",
          questions: [
            "What are the RTO/MTPD for each affected app (client mgmt, order processing, reporting, comms) per BIA?",
            "Did the 12-hour outage exceed any application's MTPD? What are the consequences?",
            "Why did WAF and rate-limiting fail? Were thresholds tuned to baseline traffic?",
            "How quickly did automated failover activate? Was manual intervention required?",
            "What manual workarounds were used? Were they documented in BC plans?",
            "How was client communication managed during the 12-hour outage? Status page? Direct outreach?",
            "What DDoS protection improvements are planned (layer 7, volumetric, application-layer)?",
            "Are there single points of failure in the architecture that the DDoS exposed?",
            "How is 'normal' traffic baseline established for anomaly detection?",
            "What is the escalation path when automated DDoS mitigation is insufficient?"
          ]
        },
        {
          title: "Scenario 3: Natural Disaster — Tampa Facility Power Outage (5 Days)",
          control: "ISO 22317 Clause 6.4/6.5: Tests facility-level RTO/MTPD, remote work capability, physical resource dependencies, and supply chain/logistics continuity. 5-day outage tests MTPD for on-prem operations.",
          how: "Run tabletop: Tampa hub (product delivery, logistics, customer support) loses power for 5 days. On-prem servers, inventory systems, comms down. Staff remote within 24hr. Walk through:
1. Facility impact: On-prem inventory/docs, internal servers, comms lines, physical resource handling down.
2. Transition: Staff remote within 24hr. Cloud comms/coordination dependency.
3. Operations: Logistics/delivery disrupted. Load redistribution to alt facilities. Virtual coordination.
4. Customer impact: Shipment delays, support delays. Contingency actions activated.
5. Recovery: Facility reoccupation after 5 days. Long-term resilience assessment.",
          check: "Facility RTO met? Remote work capability sufficient for critical processes? Alt facility load redistribution executed? Customer SLA breaches documented?",
          questions: [
            "What is the Tampa facility's RTO/MTPD per BIA? Was 5-day outage within MTPD?",
            "Which critical processes depend on on-prem infrastructure (inventory mgmt, physical docs)?",
            "How was the 24-hour remote transition executed? What gaps appeared?",
            "What logistics/delivery processes were disrupted? How was load redistributed to alt facilities?",
            "What cloud-based coordination tools were used? Were they sufficient for decentralized ops?",
            "What customer SLA breaches occurred (shipment confirmations, support response times)?",
            "Are there single points of failure in the Tampa facility (single power feed, no generator)?",
            "How were physical inventory records accessed remotely? Digitization status?",
            "What is the facility reoccupation validation process (power stability, system integrity)?",
            "What long-term resilience enhancements are planned (backup power, geo-redundancy)?"
          ]
        },
        {
          title: "Scenario 4: AWS Fail-Over — Primary Region Outage + Stale Snapshot",
          control: "ISO 22317 Clause 6.4/6.5: Tests cloud RTO/RPO, failover execution, backup/replication configuration, and data loss tolerance decision. 3-hour stale snapshot tests RPO.",
          how: "Run tabletop: Primary AWS region outage at 2:13 AM. Monolithic datastore offline. Failover to passive region — but last replicated snapshot is 3 hours old (misconfigured backup sync). Walk through:
1. Detection: Monitoring alerts, 30-min investigation before failover decision.
2. Failover execution: Active-passive failover initiated. Snapshot 3hrs old discovered.
2. Decision point: Restore from 3hr-old snapshot (data loss) vs wait for primary region recovery.
3. Impact: Appointments, payments, client mgmt down. Same-day transfers paused. Revenue loss.
3. Communication: Customer service overwhelmed, stakeholders demand timeline, partners escalate.
4. Recovery: Snapshot restore vs primary region recovery. Data integrity validation.
4. Post-incident: Backup sync fix, DR drill schedule, monolithic datastore architecture review.",
          check: "RTO for appointment/payment/client mgmt met? RPO (3hr data loss) acceptable per BIA? Decision authority clear? Communication SLAs met?",
          questions: [
            "What are the RTO/RPO for appointment scheduling, payment processing, and client management per BIA?",
            "Is 3-hour data loss (RPO) acceptable for payments/client records? What are regulatory/contractual obligations?",
            "Who has authority to make the restore-vs-wait decision at 2:43 AM? Is it documented in IR plan?",
            "Why was the backup sync misconfigured? Was it caught in any DR drill?",
            "How is the monolithic datastore a single point of failure? Sharding/replication strategy?",
            "What communication was sent to professionals during outage? Status page? Direct notification?",
            "How are same-day transfers handled during outage? Manual processing? Partner SLAs?",
            "What is the failover validation process (data integrity, application health checks)?",
            "How frequently are full DR drills executed (not just tabletop)? Last full failover test date?",
            "What architectural changes are planned (datastore sharding, multi-active regions, RPO reduction)?"
          ]
        },
        {
          title: "Integrate Scenario Findings into BIA & BCMS",
          control: "ISO 22317 Clause 7.3 / ISO 22301 Clause 8.2-8.5: Scenario walkthrough findings must update BIA assumptions, RTO/RPO values, BC strategies, BC plans, and exercise program.",
          how: "For each scenario: document gaps between BIA assumptions and actual walkthrough results. Update: RTO/RPO values if gaps found, resource requirements, dependency maps, BC strategies, BC plan procedures, exercise scenarios. Track in BCMS improvement register.",
          check: "All scenario gaps documented with severity. BIA updated where assumptions invalidated. BC plans updated with corrected procedures. Next exercise program includes scenario variations.",
          questions: [
            "Which BIA assumptions were invalidated by each scenario walkthrough?",
            "What RTO/RPO values need adjustment based on actual vs planned performance?",
            "What new resource requirements or dependencies were discovered?",
            "Which BC plan procedures failed or were missing during walkthroughs?",
            "What new exercise scenarios should be added to the program?",
            "What supplier/contractual gaps were exposed (backup vendors, cloud providers)?",
            "How are scenario findings communicated to senior management and the board?",
            "What is the timeline for implementing corrective actions from each scenario?",
            "How will the next BIA review cycle incorporate these scenario findings?",
            "What metrics will track improvement in scenario readiness over time?"
          ]
        }
      ],
    }
  ],
};

export default function Iso22317() {
  return <LearningFrameworkPage framework={FRAMEWORK} />;
}

export { FRAMEWORK };

export { FRAMEWORK };
