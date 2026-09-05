import LearningFrameworkPage from "../../components/LearningFrameworkPage";

const fedrampFramework = {
  id: "fedramp",
  name: "FedRAMP (Federal Risk & Authorization Mgmt Program)",
  region: "United States (Federal)",
  flag: "\u{1F3DB}\uFE0F",
  flagAnimation: "pulse",
  basePath: "/fedramp",
  color: "navy",
  referenceUrl: "https://fal.gov/",
  startupGaps: [
    {
      gap: "Jumping straight to an assessment without readiness / scoping",
      pushback: "Let's just engage a 3PAO and get authorized.",
      reality: "FedRAMP is built on NIST SP 800-53 controls across Low / Moderate / High baselines. Without scoping the system, selecting the baseline, and completing the RMF steps first, the Security Assessment Plan (SAP) and Security Assessment Report (SAR) will have gaps the assessor rejects.",
      leantip: "Complete the FedRAMP Readiness Assessment (self-assessment or via a consultant), select the correct baseline using the NIST 800-53 control baselines table, and draft the System Security Plan (SSP) before engaging a Third-Party Assessment Organization (3PAO)."
    },
    {
      gap: "Confusing FedRAMP authorization with a one-time certification",
      pushback: "We got the ATO, we're done.",
      reality: "FedRAMP requires Continuous Monitoring (ConMon) — ongoing assessment, POA&M tracking, and annual reassessment. An Authorization to Operate (ATO) has a defined period and must be renewed.",
      leantip: "Build the ConMon program from day one: continuous control monitoring, recurring self-assessments, and a living POA&M. Treat the ATO as a milestone, not the finish line."
    },
    {
      gap: "Incomplete SSP / SAP artifacts",
      pushback: "The template is long — we'll fill it later.",
      reality: "The SSP is the foundational document (system description, control baselines, inherited controls, common controls) that the assessor uses to scope the SAP and SAR. Incomplete SSPs derail assessments.",
      leantip: "Draft the SSP early with the system boundary, data types, connections, and selected baseline. Use a FedRAMP-compliant SSP template; reuse it for every assessment cycle."
    },
    {
      gap: "Ignoring the shared-responsibility model with the cloud service provider",
      pushback: "AWS GovCloud is FedRAMP authorized, so we're covered.",
      reality: "FedRAMP authorizes the CSP at a baseline, but the customer remains responsible for configuring the services securely and for the portions of controls not inherited (e.g., data encryption, identity management, application-level controls).",
      leantip: "Map the shared-responsibility matrix explicitly: inherited controls (CSP) vs. customer-configured controls vs. common controls (shared). Document the residual responsibility for each."
    }
  ],
  privacyStartupNotes: "FedRAMP: Anyone worldwide can build controls and prepare the SSP/SAP/POA&M documentation — there is no citizenship requirement for the security work. The 3PAO assessor and the Authorizing Official (AO) must be US-citizen / US-government roles, and FedRAMP is a US-government program. CJIS note: CJI access is restricted to US citizens with current fingerprint-based background checks and agency affiliation; cleared personnel cannot be substituted by a FedRAMP ATO. Privacy note: if the system processes PII/PHI, FedRAMP's privacy controls complement — but do not replace — a ROPA, DPIA, or BAA.",
  weeks: 4,
  milestones: 3,
  weeksData: [
    {
      week: 1,
      title: "Foundation — FedRAMP Landscape & NIST 800-53 Baselines",
      description: "Understand FedRAMP's purpose, the Low/Moderate/High baselines, how NIST SP 800-53 maps to controls, and the RMF process.",
      tasks: [
        {
          title: "Determine the FedRAMP baseline and system categorization",
          control: "NIST SP 800-53 Rev 5 control baselines; FIPS 199 (category of information); FedRAMP baselines (Low, Moderate, High)",
          how: "Classify the information system using FIPS 199 (low/moderate/high impact). Map to the corresponding NIST SP 800-53 baseline and FedRAMP baseline. Review the FedRAMP baselines table (FIPS 200 minimum controls + SA-9, SI-4, etc.). Document the system boundary, data types at rest/in transit/processed, and all connections.",
          check: "Can you state the selected baseline, the FIPS 199 category, the list of inherited/common controls, and the system boundary?"
        },
        {
          title: 'Map NIST SP 800-53 controls to the baseline',
          control: "NIST SP 800-53 Rev 5 control families (AC, AU, CA, IA, SC, etc.)",
          how: "Walk through the 20 NIST 800-53 control families and map each baseline control to your system. Distinguish: inherited controls (provided by the CSP), common controls (shared), and your own assigned controls. Build the control-to-system mapping table.",
          check: "Produce a control mapping table showing inherited vs. common vs. assigned controls, with each control linked to its implementation."
        }
      ]
    },
    {
      week: 2,
      title: "Documentation — System Security Plan & RMF Package",
      description: "Draft the System Security Plan (SSP), Security Assessment Plan (SAP), and complete the Risk Management Framework package.",
      tasks: [
        {
          title: "Draft the System Security Plan (SSP)",
          control: "NIST SP 800-53 Appendix F (SSP template); FedRAMP SSP template",
          how: "Write the SSP with: system description, system boundary, data types, connections, control baselines, inherited controls list, common controls list, hybrid/multi-cloud considerations, and the control implementation summary. Use a FedRAMP-compliant SSP template. Iterate with security/architect stakeholders.",
          check: "SSP reviewed by security lead; system boundary, baselines, and inherited/common controls all documented and consistent."
        },
        {
          title: "Build the Risk Management Framework (RMF) package",
          control: "NIST SP 800-37 Rev 2 RMF steps (Categorize → Select → Implement → Assess → Authorize → Monitor)",
          how: "Complete the RMF package: (1) Security Categorization (FIPS 199), (2) Security Requirements Selection (800-53 baseline), (3) Security Assessment Plan (SAP), (4) Security Controls Assessment, (5) Information System Authorization (ISAW/ATO package). Maintain the Plan of Action & Milestones (POA&M) for any gaps.",
          check: "RMF package complete — SAP, SSP, POA&M drafted; control assessments identified."
        }
      ]
    },
    {
      week: 3,
      title: "Assessment & Continuous Monitoring",
      description: "Engage the 3PAO, produce the Security Assessment Report (SAR), and stand up Continuous Monitoring (ConMon).",
      tasks: [
        {
          title: "Engage a Third-Party Assessment Organization (3PAO)",
          control: "FedRAMP 3PAO requirements; NIST SP 800-53 assessment procedures",
          how: "Select a FedRAMP-approved 3PAO. Share the SSP, SAP, and control evidence. The 3PAO performs control-by-control testing against the SAR and issues the Security Assessment Report (SAR) with findings and POA&M entries. Prepare evidence packs per control (configs, logs, policies, procedures).",
          check: "3PAO engaged; evidence packs prepared for each assigned control; SAR review workflow defined."
        },
        {
          title: "Stand up Continuous Monitoring (ConMon) and the POA&M",
          control: "FedRAMP Continuous Monitoring Strategy; NIST SP 800-137 (ISCM)",
          how: "Define the ConMon strategy: continuous control monitoring tools (cloud security posture management, SIEM, configuration compliance), recurring self-assessments, and POA&M tracking with owners/dates. Automate evidence collection (cloud audit logs, compliance scans). Publish metrics to stakeholders.",
          check: "ConMon strategy documented; automated monitoring in place; POA&M tracked with owners and target dates."
        }
      ]
    },
    {
      week: 4,
      title: "Authorization & Ongoing Compliance",
      description: "Obtain the Authorization to Operate (ATO), present to the Authorizing Official (AO), and maintain ongoing compliance.",
      tasks: [
        {
          title: "Present the ATO package to the Authorizing Official (AO)",
          control: "FedRAMP ATO process; NIST SP 800-37 Rev 2 Authorize step",
          how: "Package the ATO package: SSP, SAR, POA&M, ConMon strategy, risk acceptance by AO, and the Authorization Package (AP). The AO reviews and either grants, denies, or grants with conditions. For JAB-authorized packages, present to the Joint Authorization Board.",
          check: "ATO package submitted; AO risk acceptance documented; ATO granted or conditions listed."
        },
        {
          title: "Maintain compliance and renew the ATO",
          control: "FedRAMP ConMon requirements; annual reassessment",
          how: "Maintain ongoing compliance: continuous control monitoring, annual reassessment, POA&M closure, control changes tracked, and the ATO renewed before expiry. Reassess when the system materially changes (new modules, data types, connections). Publish the FedRAMP status to the FedRAMP Marketplace.",
          check: "Annual reassessment schedule set; control-change tracking live; ATO renewal planned before expiry."
        }
      ]
    }
  ]
};

export { fedrampFramework as FRAMEWORK };
export default fedrampFramework;
