import LearningFrameworkPage from "../../components/LearningFrameworkPage.jsx";

// Detailed playbook. Linked from Knowledge Base > Other Frameworks.
const FRAMEWORK = {
  "id": "isae3402",
  "name": "ISAE 3402 Assurance Reports on Controls at a Service Organisation",
  "color": "purple",
  "region": "Global",
  "flag": "",
  "flagAnimation": "float",
  "basePath": "/isae-3402",
  "referenceUrl": "https://www.iaasb.org/publications/international-standard-assurance-engagements-isae-3402-assurance-reports-controls-service-organization",
  "weeks": [
    {
      "week": 1,
      "title": "L1 Foundation: Report Types, Scope and Readiness",
      "days": "Days 1-7",
      "description": "Understand Type 1 and Type 2 reports, how ISAE 3402 relates to SSAE 18 and SOC 1, and scope the system.",
      "tasks": [
        {
          "title": "Understand the report types",
          "control": "ISAE 3402 - Type 1 and Type 2",
          "how": "Type 1: fairness of the description and suitability of control design at a date. Type 2: adds operating effectiveness over a period (usually 6-12 months). Reports cover controls relevant to user entities' financial reporting.",
          "check": "Decision on report type recorded with customer demand and timeline."
        },
        {
          "title": "Compare with SSAE 18 / SOC 1 and SOC 2",
          "control": "Standards alignment",
          "how": "ISAE 3402 (IAASB, international) and SSAE 18 AT-C 320 (AICPA, US SOC 1) are closely aligned and can be issued as a combined report. SOC 2 / ISAE 3000 covers security and other trust criteria rather than financial reporting.",
          "check": "Customer requirement confirmed (ISAE 3402, SOC 1 or both); auditor engaged."
        },
        {
          "title": "Define the system and control objectives",
          "control": "Scope",
          "how": "Define the services, locations, systems and boundaries. Write control objectives covering business processes (for example transaction processing) and IT general controls (access, change, operations).",
          "check": "Control objectives agreed with the service auditor."
        },
        {
          "title": "Identify subservice organisations",
          "control": "Carve-out vs inclusive",
          "how": "List subservice organisations (for example cloud hosting). Choose carve-out (excluded, with expected complementary subservice controls) or inclusive (included in scope).",
          "check": "Subservice list with method chosen and their own assurance reports obtained."
        }
      ]
    },
    {
      "week": 2,
      "title": "L2 Description, Controls and Management Assertion",
      "days": "Days 8-14",
      "description": "Write the system description, map controls to objectives and draft management's written assertion.",
      "tasks": [
        {
          "title": "Write the system description",
          "control": "ISAE 3402 paragraph on the description",
          "how": "Describe the services, classes of transactions, procedures, records, reports, how significant events are handled, the reporting process, control objectives and controls, and relevant changes in the period.",
          "check": "Description reviewed for accuracy against how the system actually operates."
        },
        {
          "title": "Map controls to control objectives",
          "control": "Control matrix",
          "how": "For each objective list controls with owner, frequency and evidence. Cover ITGCs: logical access, privileged access, change management, job scheduling, backup and incident handling.",
          "check": "Every control objective is covered by at least one control with evidence."
        },
        {
          "title": "Define complementary user entity controls",
          "control": "CUECs",
          "how": "List controls the customer must operate for the objectives to be met (for example reviewing user access to the portal, approving payment files).",
          "check": "CUECs listed in the description and communicated to customers."
        },
        {
          "title": "Draft management's assertion",
          "control": "Written statement",
          "how": "Management asserts the description is fairly presented, controls were suitably designed and (Type 2) operated effectively over the period. Base it on monitoring evidence.",
          "check": "Signed assertion supported by internal monitoring results."
        }
      ]
    },
    {
      "week": 3,
      "title": "L3 Readiness Testing and Fieldwork",
      "days": "Days 15-21",
      "description": "Run a readiness assessment, fix gaps, then support the service auditor's testing.",
      "tasks": [
        {
          "title": "Run a readiness assessment",
          "control": "Pre-audit",
          "how": "Walk through each control, inspect a few samples and record gaps in design or evidence before the period starts.",
          "check": "Gap list with owners and dates; gaps closed before period start."
        },
        {
          "title": "Set up evidence collection",
          "control": "Evidence management",
          "how": "Store evidence by control and date, with system-generated reports, parameters and screenshots showing source. Keep population lists complete for sampling.",
          "check": "Evidence repository organised by control ID and period."
        },
        {
          "title": "Support auditor testing",
          "control": "Fieldwork",
          "how": "Provide populations, respond to sample requests, arrange walkthroughs. Auditor tests by inquiry, observation, inspection and re-performance, and validates information produced by the entity.",
          "check": "Request tracker shows all items delivered on time."
        },
        {
          "title": "Handle exceptions",
          "control": "Deviations",
          "how": "For each deviation, explain cause, impact, compensating controls and remediation. Management responses can be included in the report.",
          "check": "Management responses drafted and reviewed before report issue."
        }
      ]
    },
    {
      "week": 4,
      "title": "L4 Report, Bridge Letters and Continuous Cycle",
      "days": "Days 22-28",
      "description": "Review the final report, support customers using it and run the next period.",
      "tasks": [
        {
          "title": "Review the draft report",
          "control": "Report sections",
          "how": "Check the auditor's opinion, management's assertion, system description and Section 4 test results. Confirm any qualified opinion is understood and addressed.",
          "check": "Report reviewed and approved for release."
        },
        {
          "title": "Distribute and restrict use",
          "control": "Use of the report",
          "how": "ISAE 3402 reports are for user entities and their auditors. Share under NDA and track who received it.",
          "check": "Distribution log maintained."
        },
        {
          "title": "Issue bridge letters",
          "control": "Gap period",
          "how": "Provide bridge (gap) letters covering the period between the report end date and the customer's year end, stating no material changes.",
          "check": "Bridge letter template approved and issued on request."
        },
        {
          "title": "Plan the next period",
          "control": "Continuous compliance",
          "how": "Keep periods back to back, update the description for changes and reuse controls for SOC 2 / ISAE 3000 and ISO 27001.",
          "check": "Next period dates set; control changes reflected in description."
        }
      ]
    }
  ]
};

export default function Isae3402Page() {
  return <LearningFrameworkPage framework={FRAMEWORK} />;
}
