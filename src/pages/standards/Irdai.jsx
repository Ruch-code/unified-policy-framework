import LearningFrameworkPage from "../../components/LearningFrameworkPage.jsx";
import IndiaRegReference from "../../components/playbook/IndiaRegReference.jsx";

// IRDAI Information and Cyber Security Guidelines, 2023. Checked November 2026; confirm against the current IRDAI text.
const FRAMEWORK = {
  id: "irdai",
  name: "IRDAI Information and Cyber Security Guidelines",
  shortName: "IRDAI",
  color: "orange",
  region: "India",
  flag: "in",
  flagAnimation: "float",
  basePath: "/irdai",
  referenceUrl: "https://irdai.gov.in/",
  milestones: [
    { day: 7, label: "Scope, governance and policy in place" },
    { day: 14, label: "Risk assessment and core controls running" },
    { day: 21, label: "Incident response and vendor oversight ready" },
    { day: 28, label: "Annual assurance audit prepared" },
  ],
  weeks: [
    {
      week: 1,
      title: "Scope and Governance",
      days: "Days 1 to 7",
      description: "Confirm the guidelines apply, set up the committee structure and approve the policy.",
      tasks: [
        {
          title: "Confirm applicability and scope",
          hours: 2,
          control: "The guidelines apply to insurers, including foreign reinsurance branches, and to most IRDAI-authorised intermediaries such as brokers, corporate agents, web aggregators and TPAs. Individual agents, micro-insurance agents, point-of-sale persons and individual surveyors are excluded. Scope covers all information assets and data, in any form or location.",
          how: "Record the entity type and the IRDAI registration it holds. List in-scope business units, systems, data stores, offices and outsourced services, including cloud.",
          check: "A signed scope document names the entity type and every in-scope system, location and service provider.",
        },
        {
          title: "Set up the ISRMC and appoint the CISO",
          hours: 3,
          control: "An Information Security Risk Management Committee (ISRMC) oversees the policy. It includes the CRO, CISO, CTO and heads of key functions such as operations, finance, legal, compliance and HR, and meets at least twice a year. A designated CISO leads implementation.",
          how: "Write the ISRMC charter with members, quorum and meeting frequency. Appoint the CISO in writing with clear authority and reporting lines, kept independent of IT delivery where possible.",
          check: "Charter approved, CISO appointment letter on file, and the first ISRMC meeting minuted.",
        },
        {
          title: "Approve the information and cyber security policy",
          hours: 4,
          control: "A Board-approved information and cyber security policy, reviewed annually, with the CISO proposing changes and the ISRMC approving them.",
          how: "Draft or update the policy and supporting standards (access, acceptable use, asset management, cryptography, logging, incident response, business continuity, vendor security). Map each section to the guideline requirements.",
          check: "Board approval minuted; mapping table shows every guideline area covered by a policy or standard.",
        },
        {
          title: "Build the asset and data inventory",
          hours: 3,
          control: "Information assets must be identified, owned and classified so controls can be applied by sensitivity.",
          how: "Create an inventory of applications, infrastructure, endpoints and data sets, each with an owner and classification. Flag systems holding policyholder personal and health data.",
          check: "Inventory is complete for in-scope systems and reconciles to cloud and endpoint management tools.",
        },
      ],
    },
    {
      week: 2,
      title: "Risk Assessment and Core Controls",
      days: "Days 8 to 14",
      description: "Assess information and cyber risk, then put the baseline technical controls in place.",
      tasks: [
        {
          title: "Run the annual risk assessment",
          hours: 4,
          control: "Information and cyber risk is assessed at least annually and before introducing any major new technology or initiative.",
          how: "Use a documented method with likelihood and impact criteria. Assess threats to key systems such as policy administration, claims, payments and customer portals. Record treatments and owners in a risk register.",
          check: "Risk assessment report approved by the ISRMC; register shows owners and target dates.",
        },
        {
          title: "Control access",
          hours: 3,
          control: "Access is granted on a need basis, privileged access is restricted and monitored, and access is reviewed periodically.",
          how: "Enforce SSO and multi-factor authentication, role-based access, joiner-mover-leaver workflows and periodic access reviews. Restrict and log privileged and vendor access.",
          check: "Access review records, MFA coverage report and privileged activity logs are available.",
        },
        {
          title: "Retain and monitor logs",
          hours: 3,
          control: "Logs of ICT systems are kept securely and monitored. CERT-In directions require logs to be kept for a rolling 180 days within India.",
          how: "Centralise logs in a SIEM or managed SOC, set retention to at least 180 days with storage in India, synchronise clocks to an approved time source, and define alert use cases.",
          check: "Retention settings, log source list and storage location confirm the requirement is met.",
        },
        {
          title: "Manage vulnerabilities and changes",
          hours: 3,
          control: "Systems are tested for vulnerabilities, patched promptly and changed under control.",
          how: "Run vulnerability scans and penetration tests on internet-facing and critical systems, track findings to closure, and route production changes through an approved change process.",
          check: "VAPT reports with closure evidence and change records with approvals before deployment.",
        },
      ],
    },
    {
      week: 3,
      title: "Incidents, Continuity and Third Parties",
      days: "Days 15 to 21",
      description: "Be ready to detect, report and recover from incidents, and extend controls to intermediaries and vendors.",
      tasks: [
        {
          title: "Prepare incident response and reporting",
          hours: 4,
          control: "Cyber incidents are reported to CERT-In within six hours of being noticed and to IRDAI as the guidelines require. A cyber crisis management plan is maintained.",
          how: "Write the incident response plan and crisis management plan, name the CERT-In point of contact, prepare reporting templates, and run a tabletop exercise that tests the six-hour window.",
          check: "Exercise report shows detection-to-notification time within six hours; contact details and templates are current.",
        },
        {
          title: "Plan for continuity and recovery",
          hours: 3,
          control: "Critical services can continue or recover after disruption, with backups protected and tested.",
          how: "Set recovery objectives for critical systems, keep immutable or offline backups, and test restoration and disaster recovery.",
          check: "Restoration and DR test reports show recovery within the agreed objectives.",
        },
        {
          title: "Oversee intermediaries and vendors",
          hours: 3,
          control: "Insurers ensure the intermediaries and vendors they engage comply with the guidelines under a Board-approved policy, and obtain annual self-certification from intermediaries that hold only physical insurer data.",
          how: "Tier vendors and intermediaries by data access and criticality, add security clauses (audit rights, incident notification, data location, exit), assess before onboarding and periodically, and collect self-certifications.",
          check: "Vendor register with tiers, completed assessments, contract clauses and self-certifications on file.",
        },
        {
          title: "Train staff and set acceptable use",
          hours: 2,
          control: "Staff follow acceptable use and social media rules and receive regular security training.",
          how: "Publish acceptable use and social media rules, run onboarding and annual training, and add phishing simulations.",
          check: "Training completion records and policy acknowledgements for all staff.",
        },
      ],
    },
    {
      week: 4,
      title: "Assurance Audit and Ongoing Compliance",
      days: "Days 22 to 28",
      description: "Prepare for the annual independent assurance audit and keep the programme running.",
      tasks: [
        {
          title: "Prepare for the annual assurance audit",
          hours: 4,
          control: "An independent information and cyber security assurance audit is carried out every year.",
          how: "Appoint a qualified independent auditor, agree scope against the guidelines, and assemble evidence for each requirement in advance.",
          check: "Evidence index maps every requirement to current evidence; auditor engaged with agreed dates.",
        },
        {
          title: "Submit the audit report to IRDAI on time",
          hours: 2,
          control: "The audit report, with Board or Audit Committee comments, is submitted to IRDAI within 90 days of the financial year end or 30 days of audit completion, whichever is earlier.",
          how: "Schedule the audit so Board review fits the deadline, track findings to closure, and record the submission.",
          check: "Submission acknowledgement on file within the deadline; findings tracked with owners and dates.",
        },
        {
          title: "Report to the ISRMC and Board",
          hours: 2,
          control: "Leadership oversees security through regular reporting.",
          how: "Report risk posture, incidents, audit findings and remediation status to the ISRMC at each meeting and to the Board at least annually.",
          check: "Minutes show security reporting and decisions taken.",
        },
        {
          title: "Align with related Indian requirements",
          hours: 2,
          control: "CERT-In directions, the DPDP Act 2023 and IRDAI outsourcing rules apply alongside the guidelines.",
          how: "Map overlapping requirements (incident reporting, logs, personal data handling, outsourcing) so one set of controls and evidence serves all of them.",
          check: "A crosswalk shows shared controls and any requirement unique to each rule.",
        },
      ],
    },
  ],
};

export default function Irdai() {
  return (
    <>
      <LearningFrameworkPage framework={FRAMEWORK} />
      <IndiaRegReference which="irdai" />
    </>
  );
}

export { FRAMEWORK };
