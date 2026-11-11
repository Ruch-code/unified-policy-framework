import LearningFrameworkPage from "../../components/LearningFrameworkPage.jsx";

// Detailed playbook. Linked from Knowledge Base > Other Frameworks.
const FRAMEWORK = {
  "id": "crbf",
  "name": "CRBF Regulation 97-02 and the Arrêté of 3 November 2014 (France)",
  "color": "blue",
  "region": "France",
  "flag": "",
  "flagAnimation": "float",
  "basePath": "/crbf-97-02",
  "referenceUrl": "https://www.legifrance.gouv.fr/loda/id/JORFTEXT000029700770",
  "weeks": [
    {
      "week": 1,
      "title": "L1 Foundation: History, Scope and the 2014 Arrêté",
      "days": "Days 1-7",
      "description": "Understand what 97-02 required, what replaced it, and who the ACPR supervises.",
      "tasks": [
        {
          "title": "Understand the regulatory history",
          "control": "CRBF 97-02 and Arrêté 3 Nov 2014",
          "how": "CRBF 97-02 set internal control rules for French credit institutions and investment firms. It was repealed and replaced by the Arrêté of 3 November 2014 on internal control, which carries the same structure and adds CRD IV requirements. Older policies still cite 97-02.",
          "check": "Policy references updated from 97-02 to the 2014 Arrêté, with a mapping note for legacy documents."
        },
        {
          "title": "Confirm scope",
          "control": "Entities in scope",
          "how": "Applies to banks, financing companies, investment firms and payment and e-money institutions (proportionately) supervised by the ACPR. Proportionality depends on size, complexity and risk.",
          "check": "Applicability memo with entity type and proportionality rationale."
        },
        {
          "title": "Map the internal control system",
          "control": "Structure",
          "how": "Internal control covers: a control system for operations and procedures, an organisation of accounting and information processing, risk measurement and monitoring systems, and documentation and information systems.",
          "check": "Internal control map showing each element and its owner."
        },
        {
          "title": "Set governance roles",
          "control": "Effective managers and supervisory body",
          "how": "Effective managers (dirigeants effectifs) run internal control; the supervisory body (board) approves risk appetite and oversees through risk and audit committees.",
          "check": "Board and committee charters reference internal control responsibilities."
        }
      ]
    },
    {
      "week": 2,
      "title": "L2 Permanent Control, Compliance and Risk Function",
      "days": "Days 8-14",
      "description": "Build the three control functions required beside periodic control.",
      "tasks": [
        {
          "title": "Set up permanent control",
          "control": "Level 1 and Level 2 controls",
          "how": "Level 1: operational staff and managers control their own work. Level 2: dedicated staff independent of operations verify that level 1 controls work.",
          "check": "Control plan for level 1 and 2 with evidence of execution."
        },
        {
          "title": "Establish the compliance function",
          "control": "Compliance risk",
          "how": "Appoint a compliance head, monitor regulatory change, approve new products, handle AML/CFT links and record compliance breaches.",
          "check": "Compliance charter, new product approval records and breach register."
        },
        {
          "title": "Establish the risk management function",
          "control": "Risk function",
          "how": "Independent risk head reporting to effective managers with access to the board. Measures and monitors credit, market, liquidity, interest rate, operational and other risks.",
          "check": "Risk function charter and regular risk reports to the board."
        },
        {
          "title": "Manage outsourcing",
          "control": "Essential outsourced services",
          "how": "For essential or important outsourced services: written contract, the right for the ACPR to audit, continuity plans and oversight of the provider.",
          "check": "Outsourcing register with contracts containing audit and exit clauses."
        }
      ]
    },
    {
      "week": 3,
      "title": "L3 Risk Measurement, Limits and Operational Risk",
      "days": "Days 15-21",
      "description": "Set limits, monitor exposures and manage operational and IT risk.",
      "tasks": [
        {
          "title": "Define risk limits",
          "control": "Limit framework",
          "how": "Set global and operational limits for credit, market, liquidity and concentration risk, reviewed at least yearly by the board. Escalate breaches to effective managers.",
          "check": "Limit framework approved; breach escalation records exist."
        },
        {
          "title": "Manage operational and IT risk",
          "control": "Operational risk and information systems",
          "how": "Map operational risks, record loss incidents, secure information systems (access, change, backup, logging) and test business continuity plans.",
          "check": "Loss database, IT security controls evidence and continuity test reports."
        },
        {
          "title": "Report significant incidents",
          "control": "Incident reporting",
          "how": "Define thresholds for significant incidents and report them to the board and, where required, to the ACPR.",
          "check": "Thresholds approved; incident reports filed."
        },
        {
          "title": "Cover AML/CFT",
          "control": "Anti-money laundering",
          "how": "Link internal control to AML/CFT duties under the French Monetary and Financial Code: customer due diligence, monitoring and suspicious activity reporting to Tracfin.",
          "check": "AML/CFT procedures tested by permanent control."
        }
      ]
    },
    {
      "week": 4,
      "title": "L4 Periodic Control, Reporting to the ACPR and Improvement",
      "days": "Days 22-28",
      "description": "Run internal audit, produce the annual internal control report and close findings.",
      "tasks": [
        {
          "title": "Run periodic control (internal audit)",
          "control": "Periodic control",
          "how": "Independent internal audit covers all activities over a defined cycle, reports to effective managers and the audit committee, and follows up recommendations.",
          "check": "Multi-year audit plan; follow-up register of recommendations."
        },
        {
          "title": "Produce the annual internal control report",
          "control": "Annual reporting",
          "how": "Prepare the yearly report on internal control and risk measurement for the board and send it to the ACPR in the required format.",
          "check": "Report approved by the board and submitted on time."
        },
        {
          "title": "Track remediation",
          "control": "Corrective actions",
          "how": "Track findings from audit, compliance and the ACPR to closure with evidence.",
          "check": "Findings closed with evidence; overdue items escalated."
        },
        {
          "title": "Map to other frameworks",
          "control": "Integration",
          "how": "Map to COSO, ISO 27001 for IT controls, DORA for ICT risk and EBA guidelines on internal governance.",
          "check": "Mapping maintained and reused across assessments."
        }
      ]
    }
  ]
};

export default function Crbf9702Page() {
  return <LearningFrameworkPage framework={FRAMEWORK} />;
}
