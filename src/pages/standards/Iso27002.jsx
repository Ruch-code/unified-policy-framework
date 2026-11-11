import LearningFrameworkPage from "../../components/LearningFrameworkPage.jsx";

// Detailed playbook. Linked from Knowledge Base > Other Frameworks.
const FRAMEWORK = {
  "id": "iso27002",
  "name": "ISO/IEC 27002:2022 Information Security Controls",
  "color": "teal",
  "region": "Global",
  "flag": "",
  "flagAnimation": "float",
  "basePath": "/iso/27002",
  "referenceUrl": "https://www.iso.org/standard/75652.html",
  "weeks": [
    {
      "week": 1,
      "title": "L1 Foundation: Structure, Attributes and the 2013 Transition",
      "days": "Days 1-7",
      "description": "Learn the 93 controls in 4 themes, the 5 attribute types, and how 27002 supports ISO 27001 Annex A.",
      "tasks": [
        {
          "title": "Understand the control themes",
          "control": "ISO 27002 Clauses 5-8",
          "how": "Clause 5 Organisational (37 controls), Clause 6 People (8), Clause 7 Physical (14), Clause 8 Technological (34). Each control has a purpose, guidance and other information. 27002 is guidance and is not certifiable.",
          "check": "Team can locate any control by theme; control catalogue loaded into the GRC tool."
        },
        {
          "title": "Use the control attributes",
          "control": "ISO 27002 Annex A attributes",
          "how": "Tag controls with the 5 attributes: control type (preventive, detective, corrective), information security properties (C, I, A), cybersecurity concepts (identify, protect, detect, respond, recover), operational capabilities and security domains. Use them to build views for different audiences.",
          "check": "Control register filterable by attribute, with a NIST CSF style view built from the concepts attribute."
        },
        {
          "title": "Map from the 2013 edition",
          "control": "ISO 27002 Annex B",
          "how": "Use Annex B to map the old 114 controls to the 93 new ones: 11 new, 24 merged, 58 updated. Update policies and the Statement of Applicability references.",
          "check": "Mapping table complete; no orphaned 2013 references in policies."
        },
        {
          "title": "Link to ISO 27001 risk treatment",
          "control": "ISO 27001 Clause 6.1.3",
          "how": "Use 27002 guidance to choose and implement controls selected in risk treatment. Remember Annex A is the reference list; controls can come from other sources.",
          "check": "Each SoA entry cites the risk(s) it treats and the 27002 guidance used."
        }
      ]
    },
    {
      "week": 2,
      "title": "L2 Organisational and People Controls",
      "days": "Days 8-14",
      "description": "Implement policy, roles, asset, supplier, cloud and incident controls, plus people controls across the employment lifecycle.",
      "tasks": [
        {
          "title": "Policies, roles and segregation of duties",
          "control": "5.1-5.4",
          "how": "Approve a top-level policy and topic-specific policies, assign roles, segregate conflicting duties and confirm management enforces them.",
          "check": "Policies approved and reviewed on schedule; SoD matrix exists for key processes."
        },
        {
          "title": "Threat intelligence, assets and classification",
          "control": "5.7, 5.9-5.14",
          "how": "Collect and act on threat intelligence (new), keep an asset inventory with owners, define acceptable use, classify and label information, and control information transfer.",
          "check": "Asset inventory with owners; classification scheme applied; threat intel review records."
        },
        {
          "title": "Supplier and cloud controls",
          "control": "5.19-5.23",
          "how": "Assess supplier risk, include security clauses, manage ICT supply chain risk, monitor supplier services and define how cloud services are acquired, used, managed and exited (5.23 new).",
          "check": "Supplier register with risk tiers, contract clauses and cloud exit plans."
        },
        {
          "title": "Incident, continuity and people controls",
          "control": "5.24-5.30, 6.1-6.8",
          "how": "Plan incident management, collect evidence, plan ICT readiness for business continuity (5.30 new). For people: screening, terms of employment, awareness training, disciplinary process, post-termination duties, NDAs, remote working and event reporting.",
          "check": "Incident and ICT continuity tests run; training completion and screening records available."
        }
      ]
    },
    {
      "week": 3,
      "title": "L3 Physical and Technological Controls",
      "days": "Days 15-21",
      "description": "Implement physical security and the technical controls, including the new 2022 controls.",
      "tasks": [
        {
          "title": "Physical security",
          "control": "7.1-7.14",
          "how": "Secure perimeters, entry controls, offices, physical security monitoring (7.4 new), protection against environmental threats, clear desk and screen, equipment siting, storage media and secure disposal.",
          "check": "Physical access logs, CCTV or monitoring records, media disposal certificates."
        },
        {
          "title": "Endpoint, access and authentication",
          "control": "8.1-8.5",
          "how": "Protect user endpoint devices, control privileged access, restrict information access, protect source code and enforce secure authentication.",
          "check": "MDM coverage report, privileged access list reviewed, MFA enforcement evidence."
        },
        {
          "title": "New 2022 technical controls",
          "control": "8.9-8.12, 8.16, 8.23, 8.28",
          "how": "Implement configuration management (8.9), information deletion (8.10), data masking (8.11), data leakage prevention (8.12), monitoring activities (8.16), web filtering (8.23) and secure coding (8.28).",
          "check": "Each new control has an owner, an implemented mechanism and evidence."
        },
        {
          "title": "Operations and development security",
          "control": "8.7-8.8, 8.13-8.15, 8.25-8.32",
          "how": "Malware protection, vulnerability management, backups, logging, secure development lifecycle, security testing, separation of environments and change management.",
          "check": "Vulnerability SLAs met, backup restore tested, change tickets show approval before deployment."
        }
      ]
    },
    {
      "week": 4,
      "title": "L4 Measurement, Audit and Integration",
      "days": "Days 22-28",
      "description": "Measure control effectiveness, prepare for 27001 audit and reuse 27002 across frameworks.",
      "tasks": [
        {
          "title": "Define control metrics",
          "control": "ISO 27001 Clause 9.1",
          "how": "Pick metrics per control (for example patch SLA, MFA coverage, training completion) with targets, owners and frequency.",
          "check": "Metrics dashboard reviewed at management review."
        },
        {
          "title": "Test controls internally",
          "control": "ISO 27001 Clause 9.2",
          "how": "Use 27002 guidance as the test basis in internal audits: inquiry, inspection, observation and re-performance. Record nonconformities and corrective actions.",
          "check": "Internal audit report covering all applicable controls in the cycle."
        },
        {
          "title": "Use companion standards",
          "control": "ISO 27017, 27018, 27701",
          "how": "Add 27017 for cloud security, 27018 for PII in public cloud and 27701 for privacy, which extend 27002 controls.",
          "check": "Applicable extensions identified and included in the SoA."
        },
        {
          "title": "Map to other frameworks",
          "control": "Cross-framework mapping",
          "how": "Map 27002 controls to SOC 2, NIST CSF 2.0 and CIS Controls to test once and report many times.",
          "check": "Mapping maintained; shared evidence reused across audits."
        }
      ]
    }
  ]
};

export default function Iso27002Page() {
  return <LearningFrameworkPage framework={FRAMEWORK} />;
}
