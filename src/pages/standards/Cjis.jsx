import LearningFrameworkPage from "../../components/LearningFrameworkPage.jsx";

const cjisFramework = {
  id: "cjis",
  name: "CJIS Security Policy v6.x",
  region: "United States (Federal)",
  flag: "🏛️",
  flagAnimation: "float",
  basePath: "/cjis",
  color: "navy",
  referenceUrl: "https://le.fbi.gov/cjis-division/cjis-security-policy-resource-center",
  startupGaps: [
    {
      gap: "Treating CJIS as optional or 'just for law enforcement'",
      pushback: "We don't handle criminal records directly.",
      reality: "Any system that processes, stores, or transmits Criminal Justice Information (CJI) — even indirectly through a law enforcement partner — falls under CJIS Security Policy. Cloud providers, SaaS vendors, and contractors must comply if they touch CJI.",
      leantip: "Map your data flows to identify any CJI touchpoints. If you process CJI, you need a CJIS-compliant environment, a signed CJIS Security Addendum, and agency-originated fingerprint-based background checks for all personnel with access."
    },
    {
      gap: "Assuming FedRAMP authorization covers CJIS requirements",
      pushback: "Our cloud provider is FedRAMP Moderate, so we're covered.",
      reality: "FedRAMP and CJIS are separate. FedRAMP authorizes the cloud service provider; CJIS requires a separate Security Addendum signed by the agency, US-citizen personnel with fingerprint-based background checks, and specific controls (e.g., 5.1.2 for encryption of CJI at rest/in transit). A FedRAMP ATO does not substitute for CJIS compliance.",
      leantip: "Maintain a separate CJIS compliance track: Security Addendum, background checks, encryption validation, and incident reporting to the FBI CJIS Division. Document the shared-responsibility matrix for CJI specifically."
    },
    {
      gap: "Missing or incomplete background checks for personnel",
      pushback: "We run standard employment checks.",
      reality: "CJIS Security Policy Section 5.1 requires agency-originated, fingerprint-based background checks for all personnel with access to CJI. Standard commercial background checks do not satisfy this. Access must be revoked immediately when personnel no longer require it.",
      leantip: "Work with your law enforcement partner agency to initiate fingerprint-based checks for all staff (including contractors) who will access CJI. Maintain a current access list and revoke within 24 hours of role change or termination."
    },
    {
      gap: "No incident reporting to the FBI CJIS Division",
      pushback: "We report to our customer / regulator.",
      reality: "CJIS Security Policy Section 4.3 requires reporting security incidents involving CJI to the FBI CJIS Division within one hour of discovery, in addition to any other reporting obligations. The agency CSA (CJIS Systems Agency) must be notified immediately.",
      leantip: "Add CJIS-specific incident reporting to your IR runbook: one-hour notification to the agency CSA and FBI CJIS Division, evidence preservation, and a defined escalation path."
    }
  ],
  privacyStartupNotes: "CJIS applies to Criminal Justice Information (CHRI, biometrics, case/incident history, etc.). Personnel with CJI access must be US citizens with current fingerprint-based background checks. Encryption of CJI at rest and in transit is required (FIPS 140-2/3 validated modules). CJIS Security Addendum must be signed by the agency. No dual-national or foreign-national access to unencrypted CJI. If your system also processes PII/PHI, CJIS controls complement but do not replace GDPR/CCPA/HIPAA requirements.",
  weeks: 4,
  milestones: 4,
  weeksData: [
    {
      week: 1,
      title: "Foundation — CJIS Scope, Roles & Security Addendum",
      description: "Understand CJIS Security Policy scope, the CJIS Systems Agency (CSA) structure, Information Exchange Agreements, and the Security Addendum.",
      tasks: [
        {
          title: "Identify all CJI touchpoints and data flows",
          control: "CJIS Security Policy Section 3.1 (CJI Definition), Section 4.1 (CSA Responsibilities)",
          how: "Map every system, integration, and data flow that processes Criminal Justice Information (CHRI, biometric data, case/incident history, fingerprint images, etc.). Identify which components store, process, or transmit CJI. Document the CJIS Systems Agency (CSA) or local agency (LA) that originates the data.",
          check: "Complete data flow diagram showing all CJI touchpoints, the originating CSA/LA, and whether each system is in scope for CJIS compliance."
        },
        {
          title: "Execute the CJIS Security Addendum and Information Exchange Agreement",
          control: "CJIS Security Policy Section 4.2 (Information Exchange Agreements), Appendix A (Security Addendum)",
          how: "Obtain the CJIS Security Addendum from the originating agency. Complete and sign the addendum with the agency's CSO (CJIS Systems Officer). Execute an Information Exchange Agreement (IEA) defining the purpose, data types, security requirements, and audit rights. Ensure the addendum covers all subcontractors and cloud providers.",
          check: "Signed Security Addendum and IEA on file; subcontractor flow-down documented; cloud provider CJIS compliance validated."
        },
        {
          title: "Initiate fingerprint-based background checks for all personnel",
          control: "CJIS Security Policy Section 5.1 (Personnel Security)",
          how: "Coordinate with the originating agency to submit fingerprint cards (FD-258) for all employees, contractors, and third-party personnel who will access CJI. Track clearance status in a personnel access register. US citizenship is required for unescorted access to unencrypted CJI.",
          check: "Personnel access register current with clearance status, citizenship verification, and access level for every individual with CJI access."
        }
      ]
    },
    {
      week: 2,
      title: "Controls Implementation — Encryption, Access, Audit & Incident Response",
      description: "Implement CJIS-mandated controls for encryption, access control, audit logging, and incident response.",
      tasks: [
        {
          title: "Implement FIPS 140-2/3 validated encryption for CJI at rest and in transit",
          control: "CJIS Security Policy Section 5.10 (Encryption), Section 5.13 (Mobile Devices)",
          how: "Deploy AES-256 encryption using FIPS 140-2/3 validated modules for all CJI at rest (databases, backups, file storage) and in transit (TLS 1.2+ with FIPS-validated cipher suites). Validate encryption on mobile devices and removable media. Document key management procedures.",
          check: "Encryption validated for all CJI data stores and transmission paths; FIPS certificates on file; key rotation procedure documented."
        },
        {
          title: "Enforce advanced authentication and access controls",
          control: "CJIS Security Policy Section 5.6 (Identification & Authentication), Section 5.7 (Access Control)",
          how: "Implement MFA for all CJI access (not just privileged). Use advanced authentication (certificate-based, hardware tokens, or biometrics) per Section 5.6.2. Enforce least privilege, role-based access, and automatic session termination after 30 minutes of inactivity. Unique user IDs required — no shared accounts.",
          check: "MFA enforced for all CJI access; advanced authentication configured; session timeout 30 minutes; access review quarterly."
        },
        {
          title: "Implement audit logging and monitoring per CJIS requirements",
          control: "CJIS Security Policy Section 5.4 (Audit & Accountability)",
          how: "Log all access to CJI: successful/failed logins, privilege changes, data access, administrative actions. Retain logs for minimum 1 year online, 7 years offline. Forward logs to a SIEM with alerting on anomalous access patterns. Ensure log integrity (tamper-evident).",
          check: "Audit logs capture all required events; retention met; SIEM alerts configured; log integrity verified."
        },
        {
          title: "Establish CJIS incident response with one-hour FBI notification",
          control: "CJIS Security Policy Section 4.3 (Incident Response), Section 5.3 (Incident Response)",
          how: "Update IR runbook with CJIS-specific requirements: one-hour notification to the agency CSA and FBI CJIS Division upon discovery of a CJI incident. Define evidence preservation procedures for CJI. Conduct tabletop exercises with the partner agency.",
          check: "IR runbook includes one-hour FBI/CSA notification; evidence preservation for CJI defined; tabletop exercise conducted with partner agency."
        }
      ]
    },
    {
      week: 3,
      title: "Physical Security, Media Protection & Training",
      description: "Implement physical security controls, media handling procedures, and security awareness training specific to CJI.",
      tasks: [
        {
          title: "Secure physical access to CJI processing facilities",
          control: "CJIS Security Policy Section 5.2 (Physical & Environmental Protection)",
          how: "Implement controlled access to facilities where CJI is processed/stored: badge readers, visitor logs, escort requirements, and intrusion detection. Document the facility security plan. Ensure cloud provider data centers meet CJIS physical security requirements (or use CJIS-compliant regions).",
          check: "Facility security plan documented; physical access controls operational; cloud provider CJIS attestation on file."
        },
        {
          title: "Implement media protection and sanitization procedures",
          control: "CJIS Security Policy Section 5.8 (Media Protection)",
          how: "Label all media containing CJI. Implement secure media transport, storage, and disposal. Use NIST SP 800-88 sanitization (clear, purge, destroy) for media containing CJI. Maintain media access logs and chain of custody.",
          check: "Media labeling, sanitization, and disposal procedures documented and tested; chain of custody logs maintained."
        },
        {
          title: "Deliver CJIS security awareness training",
          control: "CJIS Security Policy Section 5.5 (Awareness & Training)",
          how: "Provide initial and annual security awareness training for all personnel with CJI access. Cover: CJIS policy requirements, incident reporting, media handling, and insider threat awareness. Maintain training records with completion dates.",
          check: "Training program delivered; completion records current for all CJI-access personnel; annual refresh scheduled."
        }
      ]
    },
    {
      week: 4,
      title: "Validation, Audit & Ongoing Compliance",
      description: "Validate control effectiveness, prepare for CJIS audits, and establish continuous compliance monitoring.",
      tasks: [
        {
          title: "Conduct internal CJIS compliance assessment",
          control: "CJIS Security Policy Section 5.1 (Policy & Procedures), Section 4.4 (Auditing)",
          how: "Perform a self-assessment against all CJIS Security Policy sections. Use the CJIS Audit Checklist (available from the CSA). Document findings, remediation plans, and evidence. Prepare for the triennial CJIS audit by the FBI or state CSA.",
          check: "Self-assessment complete with findings tracked; evidence packages prepared for each policy section; audit readiness confirmed."
        },
        {
          title: "Establish continuous monitoring for CJI controls",
          control: "CJIS Security Policy Section 5.4 (Audit & Accountability), NIST SP 800-137",
          how: "Deploy continuous monitoring: configuration drift detection, access review automation, encryption validation, and log integrity checks. Automate evidence collection for audit. Track POA&M for any open findings.",
          check: "Continuous monitoring operational; POA&M tracked with owners/dates; evidence collection automated."
        },
        {
          title: "Maintain subcontractor and cloud provider CJIS compliance",
          control: "CJIS Security Policy Section 5.12 (Third-Party Access), Security Addendum flow-down",
          how: "Ensure all subcontractors and cloud providers with CJI access have signed the Security Addendum flow-down. Validate their CJIS compliance annually. Maintain a subcontractor register with access levels, clearance status, and compliance attestations.",
          check: "Subcontractor register current; Security Addendum flow-down executed; annual compliance validation completed."
        }
      ]
    }
  ]
};

export { cjisFramework as FRAMEWORK };
export default cjisFramework;