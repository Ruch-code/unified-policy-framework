import LearningFrameworkPage from "../../components/LearningFrameworkPage.jsx";

// Detailed playbook. Linked from Knowledge Base > Other Frameworks.
const FRAMEWORK = {
  "id": "coso",
  "name": "COSO Internal Control: Integrated Framework (2013)",
  "color": "navy",
  "region": "United States",
  "flag": "",
  "flagAnimation": "float",
  "basePath": "/coso",
  "referenceUrl": "https://www.coso.org/internal-control",
  "weeks": [
    {
      "week": 1,
      "title": "L1 Foundation: Components, Principles and Scope",
      "days": "Days 1-7",
      "description": "Understand the 5 components and 17 principles, define the objective in scope (operations, reporting or compliance) and the entity units covered.",
      "tasks": [
        {
          "title": "Map the 5 components and 17 principles",
          "control": "COSO 2013 - Structure",
          "how": "List the components: Control Environment (Principles 1-5), Risk Assessment (6-9), Control Activities (10-12), Information and Communication (13-15), Monitoring Activities (16-17). Note the 87 points of focus as guidance, not mandatory checks.",
          "check": "Principle register exists with each principle, its component and an owner."
        },
        {
          "title": "Define objectives and scope",
          "control": "COSO 2013 - Objectives",
          "how": "Choose the objective category being assessed (most often external financial reporting for SOX 404). Identify significant accounts, disclosures, locations and business units using materiality.",
          "check": "Scoping memo approved with significant accounts, locations and rationale."
        },
        {
          "title": "Assess the control environment",
          "control": "Principles 1-5",
          "how": "Review code of conduct and annual attestations, board and audit committee oversight and independence, org structure and reporting lines, competence and training, and accountability (performance objectives, incentives).",
          "check": "Evidence of board oversight, signed conduct attestations, org charts and role descriptions on file."
        },
        {
          "title": "Define the deficiency evaluation approach",
          "control": "COSO 2013 - Effective internal control",
          "how": "Agree that effective control needs all 5 components present and functioning and operating together. Define how deficiencies are rated (deficiency, significant deficiency, material weakness) and escalated.",
          "check": "Deficiency evaluation methodology approved by management and audit committee."
        }
      ]
    },
    {
      "week": 2,
      "title": "L2 Risk Assessment and Control Design",
      "days": "Days 8-14",
      "description": "Run the entity risk assessment including fraud risk, then design control activities and technology general controls against the risks.",
      "tasks": [
        {
          "title": "Perform the risk assessment",
          "control": "Principles 6, 7 and 9",
          "how": "Set objectives with enough clarity to identify risks. Identify risks per process (what could go wrong), rate likelihood and impact, and assess significant changes (new systems, acquisitions, leadership changes).",
          "check": "Risk assessment with risk-to-assertion mapping and change assessment, reviewed in the last 12 months."
        },
        {
          "title": "Assess fraud risk",
          "control": "Principle 8",
          "how": "Consider incentives, opportunities and rationalisation. Cover fraudulent reporting, misappropriation of assets, corruption and management override (journal entries, estimates, unusual transactions).",
          "check": "Fraud risk assessment documented with mapped anti-fraud controls."
        },
        {
          "title": "Design control activities",
          "control": "Principles 10 and 12",
          "how": "Build a risk and control matrix: control description, owner, frequency, preventive or detective, manual or automated, key or non-key, and the evidence produced. Deploy controls through approved policies and procedures.",
          "check": "Risk and control matrix complete, every significant risk has at least one key control."
        },
        {
          "title": "Design technology general controls",
          "control": "Principle 11",
          "how": "Cover the technology infrastructure, security management (access provisioning, removal, reviews, privileged access) and technology acquisition, development and maintenance (change management) for in-scope systems.",
          "check": "ITGC inventory per in-scope application, database and OS layer, mapped to Principle 11."
        }
      ]
    },
    {
      "week": 3,
      "title": "L3 Information, Communication and Testing",
      "days": "Days 15-21",
      "description": "Confirm the information used in controls is reliable, set communication channels, then test design and operating effectiveness.",
      "tasks": [
        {
          "title": "Validate information used in controls",
          "control": "Principle 13",
          "how": "For each key report or spreadsheet used by a control (IPE), check completeness and accuracy: source, parameters, report logic and reconciliation to source.",
          "check": "IPE inventory with completeness and accuracy tests for each key report."
        },
        {
          "title": "Set internal and external communication",
          "control": "Principles 14 and 15",
          "how": "Communicate control responsibilities internally, run a whistleblower channel separate from management, and govern communication with regulators, auditors and customers.",
          "check": "Whistleblower channel live and reported to the audit committee; control responsibilities acknowledged."
        },
        {
          "title": "Test design and operating effectiveness",
          "control": "Principles 10-12 testing",
          "how": "Walk through each key control (design), then test operating effectiveness with sample sizes based on frequency (for example annual 1, quarterly 2, monthly 2-5, weekly 5-15, daily 20-40, many times a day 25-60). Re-perform where possible.",
          "check": "Workpapers per key control with sample, attributes tested, exceptions and conclusion."
        },
        {
          "title": "Evaluate and aggregate deficiencies",
          "control": "Principle 17",
          "how": "Assess each exception for severity, consider compensating controls, aggregate deficiencies affecting the same account or principle, and conclude by component.",
          "check": "Deficiency log with severity, root cause and owner; aggregation memo prepared."
        }
      ]
    },
    {
      "week": 4,
      "title": "L4 Monitoring, Reporting and Sustainment",
      "days": "Days 22-28",
      "description": "Run ongoing and separate evaluations, report to the audit committee and conclude on the system of internal control.",
      "tasks": [
        {
          "title": "Run ongoing and separate evaluations",
          "control": "Principle 16",
          "how": "Combine ongoing monitoring (KRIs, automated checks, management reviews) with separate evaluations (internal audit, self-assessments). Base frequency on risk and rate of change.",
          "check": "Monitoring plan with evidence of evaluations completed as scheduled."
        },
        {
          "title": "Communicate and remediate deficiencies",
          "control": "Principle 17",
          "how": "Report deficiencies to those responsible for corrective action, significant deficiencies and material weaknesses to senior management and the board. Track remediation and retest before closing.",
          "check": "Remediation tracker with retest evidence; audit committee minutes show reporting."
        },
        {
          "title": "Conclude on internal control",
          "control": "COSO 2013 - Overall assessment",
          "how": "Confirm each component and the 17 principles are present and functioning, and that components operate together. Document the management assessment and sub-certifications.",
          "check": "Signed management assessment supported by principle-level conclusions."
        },
        {
          "title": "Maintain the framework",
          "control": "Continuous improvement",
          "how": "Review the risk and control matrix annually and after significant changes. Map COSO principles to SOX 404, ISO 27001 and SOC 2 (SOC 2 Common Criteria CC1-CC5 follow COSO) to reuse evidence.",
          "check": "Annual refresh completed; cross-framework mapping maintained."
        }
      ]
    }
  ]
};

export default function Coso2013Page() {
  return <LearningFrameworkPage framework={FRAMEWORK} />;
}
