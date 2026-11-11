import LearningFrameworkPage from "../../components/LearningFrameworkPage.jsx";

// Detailed playbook. Linked from Knowledge Base > Other Frameworks.
const FRAMEWORK = {
  "id": "solvency2",
  "name": "Solvency II (Directive 2009/138/EC)",
  "color": "blue",
  "region": "European Union",
  "flag": "",
  "flagAnimation": "float",
  "basePath": "/solvency-ii",
  "referenceUrl": "https://eur-lex.europa.eu/eli/dir/2009/138/oj",
  "weeks": [
    {
      "week": 1,
      "title": "L1 Foundation: Three Pillars and Scope",
      "days": "Days 1-7",
      "description": "Understand the three pillars, who is in scope and the governance system.",
      "tasks": [
        {
          "title": "Understand the three pillars",
          "control": "Solvency II structure",
          "how": "Pillar 1: quantitative requirements (technical provisions, own funds, SCR, MCR). Pillar 2: governance and supervision, including ORSA. Pillar 3: reporting and disclosure (SFCR, RSR, QRTs).",
          "check": "Pillar overview with owners for each area."
        },
        {
          "title": "Confirm scope",
          "control": "Articles 4 and 13",
          "how": "Applies to EU insurers and reinsurers above thresholds (raised by the 2025 review amending directive). Groups are supervised at group level as well.",
          "check": "Applicability and size assessment documented."
        },
        {
          "title": "Set the system of governance",
          "control": "Articles 41-49",
          "how": "Establish an effective governance system: clear structure, fit and proper requirements, written policies reviewed at least yearly, and contingency plans.",
          "check": "Governance map and approved written policies."
        },
        {
          "title": "Appoint the four key functions",
          "control": "Articles 44, 46, 47, 48",
          "how": "Risk management, compliance, internal audit and actuarial functions with clear independence and direct access to the board.",
          "check": "Key function holders appointed and notified to the supervisor."
        }
      ]
    },
    {
      "week": 2,
      "title": "L2 Pillar 1: Valuation and Capital",
      "days": "Days 8-14",
      "description": "Calculate technical provisions and capital requirements and classify own funds.",
      "tasks": [
        {
          "title": "Calculate technical provisions",
          "control": "Articles 76-86",
          "how": "Best estimate plus risk margin, using market-consistent assumptions. Actuarial function validates data quality, methods and results.",
          "check": "Technical provisions report with actuarial function opinion."
        },
        {
          "title": "Calculate the SCR",
          "control": "Articles 100-127",
          "how": "Calibrated at 99.5% value at risk over one year. Use the standard formula (market, underwriting, counterparty, operational risk modules) or an approved internal model.",
          "check": "SCR calculation with validation and reconciliation."
        },
        {
          "title": "Calculate the MCR",
          "control": "Articles 128-131",
          "how": "Compute the minimum capital floor; breach triggers the strongest supervisory action.",
          "check": "MCR monitored with early warning thresholds."
        },
        {
          "title": "Classify own funds",
          "control": "Articles 87-99",
          "how": "Classify own funds into tiers 1-3 with eligibility limits for covering SCR and MCR.",
          "check": "Own funds tiering approved and reconciled to the balance sheet."
        }
      ]
    },
    {
      "week": 3,
      "title": "L3 Pillar 2: Risk Management, ORSA and IT Controls",
      "days": "Days 15-21",
      "description": "Run risk management, the ORSA and the operational and IT controls supporting it.",
      "tasks": [
        {
          "title": "Run the risk management system",
          "control": "Article 44",
          "how": "Cover underwriting and reserving, ALM, investments (prudent person principle, Article 132), liquidity, concentration, operational risk and reinsurance.",
          "check": "Risk policies, appetite and limits approved and monitored."
        },
        {
          "title": "Perform the ORSA",
          "control": "Article 45",
          "how": "Assess overall solvency needs against the risk profile and business plan, including stress tests. Run at least yearly and after significant change; report to the supervisor.",
          "check": "ORSA report approved by the board and filed."
        },
        {
          "title": "Manage outsourcing",
          "control": "Article 49",
          "how": "Critical outsourcing must not impair governance or supervision; notify the supervisor beforehand and keep contracts with audit rights.",
          "check": "Outsourcing policy and notifications on file."
        },
        {
          "title": "Control data and IT",
          "control": "Data quality and ICT",
          "how": "Ensure data used in calculations is complete, accurate and appropriate; apply IT general controls. From January 2025 DORA governs ICT risk for insurers.",
          "check": "Data quality framework and DORA mapping in place."
        }
      ]
    },
    {
      "week": 4,
      "title": "L4 Pillar 3: Reporting, Disclosure and Assurance",
      "days": "Days 22-28",
      "description": "Produce supervisory reports and public disclosures and get them assured.",
      "tasks": [
        {
          "title": "Produce quantitative reporting templates",
          "control": "QRTs",
          "how": "Submit quarterly and annual QRTs in the required taxonomy (XBRL) to the national supervisor.",
          "check": "QRTs submitted on time with validation checks passed."
        },
        {
          "title": "Publish the SFCR",
          "control": "Solvency and Financial Condition Report",
          "how": "Annual public report on business, governance, risk profile, valuation and capital management.",
          "check": "SFCR published and consistent with QRTs."
        },
        {
          "title": "Submit the RSR",
          "control": "Regular Supervisory Report",
          "how": "Private report to the supervisor with more detail than the SFCR, on the required cycle.",
          "check": "RSR submitted and approved by the board."
        },
        {
          "title": "Get assurance and audit",
          "control": "Internal audit and external assurance",
          "how": "Internal audit reviews the governance system; some member states require external audit of the Solvency II balance sheet.",
          "check": "Audit findings tracked to closure."
        }
      ]
    }
  ]
};

export default function SolvencyIIPage() {
  return <LearningFrameworkPage framework={FRAMEWORK} />;
}
