import LearningFrameworkPage from "../../components/LearningFrameworkPage.jsx";

const FRAMEWORK = {
  id: "iso-22301",
  name: "ISO 22301:2019 Business Continuity Management",
  color: "orange",
  region: "Global",
  flag: "🔄",
  flagAnimation: "float",
  basePath: "/iso/22301",
  referenceUrl: "https://www.iso.org/standard/75106",
  weeks: [
    {
      week: 1,
      title: "L1 Foundation: BCMS Context & Policy",
      days: "Days 1-7",
      description:
        "Establish Business Continuity Management System (BCMS) foundations, understand organizational context, and define BCMS scope and policy.",
      tasks: [
        {
          title: "Define BCMS Scope & Boundaries",
          control: "ISO 22301 Clause 4.3 - Scope of the BCMS",
          how: "Identify organizational units, locations, products/services, processes, and technologies in scope. Document exclusions with justification. Map dependencies: internal (departments, systems), external (suppliers, utilities, regulators, customers). Produce scope statement approved by top management.",
          check: "BCMS scope statement defines all in-scope entities, exclusions justified, dependencies mapped, and approved by top management."
        },
        {
          title: "Analyze Organizational Context & Interested Parties",
          control: "ISO 22301 Clauses 4.1 & 4.2 - Context & Interested Parties",
          how: "Conduct PESTLE analysis for continuity threats: political (regulation), economic (market), social (pandemic, unrest), technological (cyber, cloud outage), legal (contractual SLAs), environmental (climate). Map interested parties: customers (SLAs), regulators (licenses), suppliers (dependencies), employees (safety), shareholders (value), insurers (coverage). Document requirements per party.",
          check: "Context analysis documented with PESTLE, interested parties register with requirements complete, and both reviewed annually."
        },
        {
          title: "Establish Business Continuity Policy",
          control: "ISO 22301 Clause 5.2 - Business Continuity Policy",
          how: "Create BC Policy approved by top management: commitment to continuity, alignment with strategic objectives, compliance obligations, BCMS scope, roles (Crisis Management Team, Business Continuity Manager, Recovery Teams), communication policy, review cycle. Communicate to all personnel and interested parties.",
          check: "BC Policy approved, communicated, covers all requirements, and review cycle defined (annual minimum)."
        },
        {
          title: "Define BCMS Roles, Responsibilities & Authorities",
          control: "ISO 22301 Clause 5.3 - Organizational Roles",
          how: "Define RACI: Top Management (accountable), BC Manager (owner), Crisis Management Team (decision), Recovery Teams (execute), Department BC Coordinators (local), IT Disaster Recovery Lead (technology). Document authorities: crisis declaration, resource mobilization, external communication, supply chain activation. Ensure competence requirements defined.",
          check: "RACI matrix complete, authorities documented, competence requirements defined, and all roles assigned with backups."
        }
      ]
    },
    {
      week: 2,
      title: "L2 Planning: Business Impact Analysis & Risk Assessment",
      days: "Days 8-14",
      description:
        "Conduct Business Impact Analysis (BIA) and risk assessment to determine continuity requirements and strategies.",
      tasks: [
        {
          title: "Conduct Business Impact Analysis (BIA)",
          control: "ISO 22301 Clause 8.2.2 - Business Impact Analysis",
          how: "For each in-scope product/service: identify critical activities, determine Maximum Tolerable Period of Disruption (MTPD), Recovery Time Objective (RTO), Recovery Point Objective (RPO), Minimum Business Continuity Objective (MBCO). Map resource requirements: people, technology, facilities, information, suppliers. Quantify impacts: financial, reputational, legal, regulatory, operational. Document BIA report with priorities.",
          check: "BIA complete for all in-scope services, RTO/RPO/MBCO defined per activity, resource requirements mapped, impact quantification documented, and report approved."
        },
        {
          title: "Conduct Business Continuity Risk Assessment",
          control: "ISO 22301 Clause 8.2.1 - Risk Assessment",
          how: "Identify threats: natural (flood, earthquake, pandemic), technological (cyberattack, power, cloud outage, hardware failure), human (strike, sabotage, error, terrorism), supply chain (supplier failure, logistics). Assess likelihood and impact on critical activities. Use risk matrix. Determine risk treatment: tolerate, treat, transfer, terminate. Document risk register linked to BIA priorities.",
          check: "Risk register covers all threat categories, likelihood/impact assessed, treatment options selected, residual risks accepted, and linked to BIA critical activities."
        },
        {
          title: "Determine Business Continuity Strategies",
          control: "ISO 22301 Clause 8.3 - Business Continuity Strategies",
          how: "Select strategies per critical activity: People (remote work, alternate staff, cross-training, key person insurance), Technology (cloud failover, DR site, backup/restore, replication, SaaS redundancy), Facilities (alternate site, work-from-home, mobile recovery), Information (backup, offsite storage, cloud sync), Suppliers (dual-source, stockpiling, contractual SLAs), Reputation (crisis comms, media monitoring). Document strategy options with cost/benefit.",
          check: "Strategies documented for all critical activities, cost/benefit analyzed, selected strategies approved, and resource requirements identified."
        },
        {
          title: "Develop Business Continuity Objectives & Plans",
          control: "ISO 22301 Clause 6.2 - Objectives & Planning",
          how: "Set SMART BC objectives: reduce RTO by X%, achieve Y% plan test pass rate, complete Z exercises annually. Develop plans: Incident Response Plan (detection, classification, escalation), Crisis Management Plan (team, comms, decision-making), Business Continuity Plans per department (procedures, resources, contacts), IT Disaster Recovery Plan (runbooks, failover procedures), Communication Plans (internal, external, media, regulators, customers).",
          check: "BC objectives SMART and approved, all plans documented with procedures, contacts current, and plan versions controlled."
        }
      ]
    },
    {
      week: 3,
      title: "L3 Implementation: Capabilities, Exercises & Awareness",
      days: "Days 15-21",
      description:
        "Build continuity capabilities, conduct exercises, and embed awareness across the organization.",
      tasks: [
        {
          title: "Implement Continuity Capabilities & Resources",
          control: "ISO 22301 Clause 7 & 8.4 - Resources & Capabilities",
          how: "Procure/configure: alternate work locations (physical/virtual), technology recovery (DRaaS, cloud failover, backup systems), communication systems (mass notification, satellite phones, backup comms), emergency supplies, vital records storage (digital/physical offsite), supplier agreements (priority recovery, alternate supply). Document capability register with testing status.",
          check: "All capabilities procured/configured, capability register complete, testing status tracked, and contracts with suppliers executed."
        },
        {
          title: "Develop & Deliver BC Awareness & Training",
          control: "ISO 22301 Clause 7.2-7.3 - Competence & Awareness",
          how: "Create training program: BC awareness for all staff (e-learning, 30 min), role-specific training (Crisis Team: 2 days, Recovery Teams: 1 day, Coordinators: 4 hours), exercise participation, specialized skills (crisis comms, media training, IT DR). Track completion in LMS. Evaluate effectiveness via assessments and exercise performance.",
          check: "Training program delivered, completion >95%, effectiveness evaluated, and records maintained."
        },
        {
          title: "Conduct Business Continuity Exercises & Tests",
          control: "ISO 22301 Clause 8.5 - Exercises & Testing",
          how: "Execute exercise program: Tabletop (quarterly, scenario-based: cyber, pandemic, facility loss, supplier failure), Functional (semi-annual: department plan activation, resource mobilization), Full-scale (annual: end-to-end with IT DR, crisis comms, supplier activation), IT DR tests (quarterly: failover, failback, data integrity), Communication tests (monthly: notification system, contact lists). Document lessons learned and corrective actions.",
          check: "Exercise calendar executed per schedule, all exercise types completed, lessons learned documented, corrective actions tracked to closure."
        },
        {
          title: "Establish Documentation & Document Control",
          control: "ISO 22301 Clause 7.5 - Documented Information",
          how: "Implement document control: BCMS document hierarchy (Policy, Manual, Procedures, Plans, Records), version control (SharePoint, Confluence, Git), approval workflows, distribution lists, retention schedules, confidentiality classification. Ensure plans accessible during disruption (offline copies, mobile app, printed crisis cards).",
          check: "Document control implemented, all documents version-controlled, offline access verified, and retention schedules applied."
        }
      ]
    },
    {
      week: 4,
      title: "L4 Evaluation: Performance, Audit & Improvement",
      days: "Days 22-28",
      description:
        "Evaluate BCMS performance through monitoring, audit, management review, and drive continual improvement.",
      tasks: [
        {
          title: "Monitor, Measure & Evaluate BCMS Performance",
          control: "ISO 22301 Clause 9.1 - Monitoring & Measurement",
          how: "Define KPIs: Plan currency (%), Exercise completion rate, Test pass rate, Training completion (%), RTO/RPO achievement in tests, Incident response time, Supplier BC compliance (%), Document review currency. Implement dashboards (PowerBI, Tableau). Automate data collection from: exercise records, test results, LMS, incident management, supplier portal. Report monthly to BC Manager, quarterly to leadership.",
          check: "KPIs defined with targets, dashboards operational, data collection automated, and reporting cadence met."
        },
        {
          title: "Conduct Internal Audit of BCMS",
          control: "ISO 22301 Clause 9.2 - Internal Audit",
          how: "Plan audit program: annual full scope, risk-based frequency. Audit criteria: ISO 22301, BC Policy, Plans, Legal/Regulatory, Contractual. Audit methods: document review, interviews, observation, exercise/test record review, facility inspection. Audit team: independent, competent. Report: findings (nonconformities, opportunities), root cause, corrective actions, timeline. Track closure.",
          check: "Audit program executed, findings documented with root cause, corrective actions assigned with deadlines, and closure verified."
        },
        {
          title: "Execute Management Review",
          control: "ISO 22301 Clause 9.3 - Management Review",
          how: "Conduct quarterly management review with Top Management. Inputs: BCMS performance (KPIs), audit results, exercise/test results, incidents & lessons learned, interested party feedback, risk/opportunity changes, resource adequacy, improvement actions status. Outputs: decisions on improvement, resource allocation, policy/strategy changes, objectives update. Record minutes and action items.",
          check: "Management review conducted quarterly, all inputs reviewed, decisions documented, action items assigned and tracked."
        },
        {
          title: "Drive Continual Improvement & Certification Readiness",
          control: "ISO 22301 Clause 10 - Improvement",
          how: "Implement improvement: corrective actions (from nonconformities, incidents, exercises), preventive actions (risk-based), innovation (new technologies, methods). Prepare for ISO 22301 certification: gap analysis, evidence compilation, CB selection, Stage 1/2 readiness. Embed BC culture: BC champions network, executive sponsorship visibility, BC in procurement, BC in project management, BC in M&A due diligence.",
          check: "Improvement actions tracked, certification readiness confirmed, BC culture indicators improving (training, exercise participation, awareness surveys), and executive sponsorship active."
        }
      ]
    }
  ],
};

export default function Iso22301Page() {
  return (
    <>
      <LearningFrameworkPage framework={FRAMEWORK} />
    </>
  );
}

export { FRAMEWORK };