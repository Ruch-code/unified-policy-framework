import LearningFrameworkPage from "../../components/LearningFrameworkPage";

const FRAMEWORK = {
  id: "hipaa",
  name: "HIPAA",
  color: "golden",
  region: "United States",
  weeks: 4,
  milestones: 3,
  referenceUrl: "https://www.hhs.gov/hipaa/index.html",
  modules: [
    {
      week: 1,
      title: "HIPAA Foundations — Rules, PHI, and Entities",
      days: [
        {
          day: "Monday",
          label: "Privacy Rule",
          description: "Understand the HIPAA Privacy Rule, its scope, and how it governs the use and disclosure of protected health information across the healthcare ecosystem.",
          tasks: [
            {
              title: "Study the Privacy Rule overview and its 18 identifiers",
              control: "45 CFR §164.500–534",
              how: "Read the full Privacy Rule text on hhs.gov. Focus on §164.502 (Uses and Disclosures), §164.506 (Treatment, Payment, Healthcare Operations), and §164.508 (Authorization). Create a reference card listing all 18 PHI identifiers including names, geographic data, dates, phone numbers, fax numbers, email addresses, SSNs, MRNs, health plan numbers, account numbers, certificate/license numbers, vehicle identifiers, device identifiers, URLs, IP addresses, biometric IDs, face photos, and any unique identifiers.",
              check: "Write a memo explaining three scenarios where PHI can be disclosed without patient authorization, citing the specific Privacy Rule subsection for each."
            },
            {
              title: "Define PHI and map its lifecycle in your organization",
              control: "§164.514(b)(2) De-identification",
              how: "Audit your organization's data flows to identify every point where PHI is created, received, maintained, or transmitted. Document each data store, API endpoint, and integration that touches PHI. Distinguish between PHI and de-identified data using the Safe Harbor (18 identifiers removed) and Expert Determination methods.",
              check: "Produce a PHI data flow diagram showing at least five touchpoints where PHI is handled and label each with the applicable Privacy Rule provision."
            },
            {
              title: "Learn patient rights under the Privacy Rule",
              control: "§164.524–528",
              how: "Study the individual rights provisions: access to records (§164.524), amendment requests (§164.526), accounting of disclosures (§164.528), and request for restrictions (§164.522). Document the process your organization follows for each right, including response timelines and fee structures.",
              check: "Draft a patient rights response procedure document that covers all four rights with specific timelines (30-day access, 60-day amendment) and escalation paths."
            },
            {
              title: "Review your organization's Notice of Privacy Practices",
              control: "§164.520",
              how: "Obtain and review your organization's current Notice of Privacy Practices (NPP). Verify it covers all required elements: uses and disclosures, patient rights, duties of the covered entity, complaints process, and effective date. Compare against the §164.520(c) checklist of required content.",
              check: "Create a gap analysis checklist comparing your current NPP against every required element in §164.520(c) and note any missing or outdated sections."
            },
            {
              title: "Complete a Privacy Rule knowledge assessment",
              control: "§164.530(i) Documentation",
              how: "Write a self-assessment covering: the six permitted uses, the fourteen purposes for which authorization is required, the minimum necessary standard application, and the differences between workforce member and business associate obligations. Use real-world scenarios from your organization.",
              check: "Score at least 85% on your self-assessment and document any knowledge gaps with a remediation plan for Week 2 review."
            }
          ]
        },
        {
          day: "Tuesday",
          label: "Security Rule",
          description: "Explore the HIPAA Security Rule and its requirement to protect electronic PHI (ePHI) through administrative, physical, and technical safeguards.",
          tasks: [
            {
              title: "Study the Security Rule framework and safeguard categories",
              control: "45 CFR §164.302–318",
              how: "Read the full Security Rule with emphasis on §164.306 (Security Standards), §164.308 (Administrative Safeguards), §164.310 (Physical Safeguards), and §164.312 (Technical Safeguards). Understand the distinction between required and addressable specifications and how addressable implementations are documented when not adopted.",
              check: "Create a Security Rule implementation matrix listing every required specification across all three safeguard categories with your organization's current compliance status."
            },
            {
              title: "Identify all ePHI assets and classify by risk",
              control: "§164.308(a)(1)(ii)(A) Risk Analysis",
              how: "Conduct an ePHI asset inventory covering databases, file servers, email systems, backup media, mobile devices, cloud storage, and application servers. Classify each asset by data sensitivity level, exposure risk, and current protection measures.",
              check: "Produce an ePHI asset register with at least 15 items, each tagged with classification level, owner, location, and current safeguard status."
            },
            {
              title: "Understand required vs addressable specifications",
              control: "§164.306(d)",
              how: "Study how the Security Rule distinguishes between required and addressable implementation specifications. Document your organization's approach to each addressable spec — whether it is implemented, if not why, and what alternative measures are in place. Build a decision framework for addressable specification adoption.",
              check: "Write a decision memorandum for five addressable specifications explaining the implementation rationale or documented justification for alternative measures."
            },
            {
              title: "Review existing Security Rule policies and procedures",
              control: "§164.316(b)",
              how: "Gather all current security policies, procedures, and standards. Map each document to its corresponding Security Rule requirement. Identify policies that are outdated, incomplete, or missing entirely. Note any discrepancies between written policy and actual practice.",
              check: "Document a policy inventory with mapped Security Rule references, version dates, last review dates, and a prioritized list of policy gaps."
            },
            {
              title: "Map Security Rule requirements to your technology stack",
              control: "§164.312(a)(1) Access Control",
              how: "Review your organization's technology infrastructure — operating systems, databases, network devices, cloud platforms, and security tools. For each, identify which Security Rule technical safeguards are currently implemented, which are partially implemented, and which are missing.",
              check: "Produce a technology-to-Security-Rule mapping document showing at least ten technology components and their compliance status with relevant technical safeguards."
            }
          ]
        },
        {
          day: "Wednesday",
          label: "Breach Notification Rule",
          description: "Master the Breach Notification Rule requirements for detecting, assessing, and reporting breaches of unsecured PHI.",
          tasks: [
            {
              title: "Study the Breach Notification Rule structure",
              control: "45 CFR §164.400–414",
              how: "Read the complete Breach Notification Rule. Understand the definition of breach (§164.402), the presumption of breach, the four-factor risk assessment (§164.402(2)), notification requirements for individuals (§164.404), HHS/OCR (§164.408), and media (§164.406). Study the 500-individual threshold for media notification.",
              check: "Create a breach notification flowchart that maps the decision process from incident discovery through notification delivery, including all deadlines and thresholds."
            },
            {
              title: "Learn the four-factor breach risk assessment",
              control: "§164.402(2)(i)–(iv)",
              how: "Deep dive into the four factors: (i) nature and extent of PHI involved, (ii) unauthorized person who used or received PHI, (iii) whether PHI was actually acquired or viewed, (iv) extent to which risk has been mitigated. Study the HHS breach portal guidance and OCR enforcement examples for context.",
              check: "Practice the four-factor assessment on three hypothetical breach scenarios and document your risk determination and rationale for each."
            },
            {
              title: "Understand notification timing and content requirements",
              control: "§164.404(b), §164.406",
              how: "Document all notification deadlines: 60 calendar days from discovery for individual notification, 60 days for HHS notification (via the OCR breach portal), and for breaches affecting 500+ individuals in a state/jurisdiction, notification within 60 days to prominent media outlets. Study the required content elements of each notification type.",
              check: "Draft template notification letters for individual notification and HHS reporting, ensuring all required content elements from the regulation are included."
            },
            {
              title: "Review the Breach Notification exception categories",
              control: "§164.402(1)(i)–(iv)",
              how: "Study the four exceptions to the definition of breach: (i) unintentional acquisition/access by workforce member in good faith, (ii) inadvertent disclosure to authorized person, (iii) good faith belief unauthorized person would not retain information, (iv) encryption/rendering unusable per NIST standards. Understand the documentation required for each exception.",
              check: "Write a decision tree for applying breach exceptions, with documentation requirements for each exception type and examples of when each applies."
            },
            {
              title: "Conduct a tabletop breach notification exercise",
              control: "§164.308(a)(6) Security Incident Procedures",
              how: "Design and walk through a tabletop exercise simulating a breach discovery. Include scenarios for: a lost unencrypted laptop, an insider data access incident, and a ransomware attack affecting ePHI. Walk through each step: initial assessment, four-factor analysis, notification decisions, and communication execution.",
              check: "Document the tabletop exercise results including decisions made, timeline adherence, team coordination issues identified, and process improvements recommended."
            }
          ]
        },
        {
          day: "Thursday",
          label: "PHI Definition, Covered Entities, and Business Associates",
          description: "Clarify the regulatory definitions and relationships between covered entities, business associates, and their obligations under HIPAA.",
          tasks: [
            {
              title: "Define covered entity types and their HIPAA obligations",
              control: "§160.103 Covered Entity",
              how: "Study the three types of covered entities: health plans, healthcare clearinghouses, and healthcare providers who transmit health information electronically. Understand how each type is regulated and any unique obligations. Research hybrid entities and how they designate covered components.",
              check: "Create a classification guide for your organization identifying which entity type(s) apply and the specific HIPAA obligations triggered for each."
            },
            {
              title: "Understand business associate definition and scope",
              control: "§160.103 Business Associate",
              how: "Study the definition of business associate including examples from HHS guidance: clearinghouses, PHI processors, cloud service providers, consultants, billing companies, IT vendors, shredding companies, and data backup providers. Understand when a subcontractor is also a business associate.",
              check: "Build a list of at least ten common business associate types and for each explain what PHI access triggers the BA designation."
            },
            {
              title: "Map your organization's business associate ecosystem",
              control: "§164.308(b)(1) Business Associate Contracts",
              how: "Survey all vendors, contractors, and partners that create, receive, maintain, or transmit PHI on behalf of your organization. For each, document the nature of PHI access, data flows, current contractual protections, and risk level. Identify any gaps where a BAA is required but not in place.",
              check: "Produce a business associate register with at least fifteen entries including vendor name, PHI type, access method, BAA status, and risk rating."
            },
            {
              title: "Study BAA required provisions and the 2013 Omnibus Rule changes",
              control: "§164.504(e)",
              how: "Read the required BAA provisions from §164.504(e)(2): permitted uses and disclosures, safeguards, breach reporting obligations, subcontractor flow-down requirements, access to records, and termination provisions. Study how the 2013 Omnibus Rule expanded business associate liability directly to the HITECH Act.",
              check: "Create a BAA compliance checklist with all required provisions from §164.504(e)(2) and use it to audit three existing BAAs in your organization."
            },
            {
              title: "Review the minimum necessary standard and its exceptions",
              control: "§164.502(b), §164.514(d)",
              how: "Understand the minimum necessary standard: covered entities must make reasonable efforts to limit PHI use, disclosure, and requests to the minimum necessary to accomplish the intended purpose. Study the exceptions (treatment disclosures, patient access, disclosures to HHS, and disclosures required by law) and the role of role-based access in implementing minimum necessary.",
              check: "Document five scenarios demonstrating minimum necessary application and create a role-based access policy template that enforces minimum necessary for at least four job roles."
            }
          ]
        },
        {
          day: "Friday",
          label: "Governance and Compliance Foundations",
          description: "Establish the governance framework for HIPAA compliance including policies, training, documentation, and the compliance officer role.",
          tasks: [
            {
              title: "Define the compliance officer and security officer roles",
              control: "§164.308(a)(2), §164.530(a)",
              how: "Study the distinction between the Privacy Officer and Security Officer required by the Security Rule. Document each role's responsibilities, authority, reporting structure, and required qualifications. Understand how organizations with both roles coordinate compliance activities.",
              check: "Draft job descriptions for Privacy Officer and Security Officer roles with defined responsibilities mapped to specific HIPAA regulatory sections."
            },
            {
              title: "Develop a HIPAA compliance program charter",
              control: "§164.308(a)(1)(i) Security Management Process",
              how: "Create a compliance program charter that establishes the program's purpose, scope, governance structure, reporting cadence, risk tolerance, and resource allocation. Include mechanisms for anonymous reporting, annual program review, and integration with enterprise risk management.",
              check: "Write a compliance program charter document covering governance, scope, risk appetite, reporting lines, and annual review mechanisms."
            },
            {
              title: "Establish a HIPAA training program framework",
              control: "§164.308(a)(5), §164.530(b)",
              how: "Design a workforce training program that covers initial training for new hires, annual refresher training, role-based training for high-risk positions, and security awareness training. Define training content requirements, completion tracking, documentation retention, and consequences for non-completion.",
              check: "Create a training program outline with curriculum topics for general workforce, IT staff, and management tiers, including assessment methods and completion deadlines."
            },
            {
              title: "Define documentation and record retention requirements",
              control: "§164.316(b)(2), §164.530(j)",
              how: "Study the 6-year documentation retention requirement for policies, procedures, and compliance activities. Understand what constitutes documentation under HIPAA, where it should be stored, who should have access, and how version control should be maintained.",
              check: "Establish a documentation management framework specifying retention periods, storage locations, access controls, and a documentation inventory template."
            },
            {
              title: "Create a compliance monitoring calendar and reporting cadence",
              control: "§164.308(a)(1)(ii)(A) Risk Analysis",
              how: "Design a recurring compliance monitoring schedule including: weekly security metric reviews, monthly compliance status reports, quarterly risk assessment updates, annual comprehensive audits, and ad-hoc reviews triggered by incidents or regulatory changes. Define metrics, report formats, and distribution lists.",
              check: "Build a 12-month compliance monitoring calendar with specific activities, responsible parties, deliverables, and distribution lists for each recurring task."
            }
          ]
        }
      ]
    },
    {
      week: 2,
      title: "HIPAA Implementer — Safeguards and Technical Controls",
      days: [
        {
          day: "Monday",
          label: "Administrative Safeguards",
          description: "Implement administrative safeguards including security management processes, workforce training, and contingency planning as required by the HIPAA Security Rule.",
          tasks: [
            {
              title: "Develop a security management process",
              control: "§164.308(a)(1)(ii)(A)–(D)",
              how: "Implement the four core elements of the Security Management Process: (A) risk analysis, (B) risk management, (C) sanction policy, and (D) information system activity review. For each element, establish procedures, assign ownership, define review frequency, and document outcomes. Align with NIST SP 800-66 guidance for ePHI risk management.",
              check: "Document procedures for all four security management process elements with assigned owners, review frequencies, and evidence of at least one completed cycle."
            },
            {
              title: "Implement a comprehensive workforce security program",
              control: "§164.308(a)(3)",
              how: "Address all workforce security subsections: authorization and supervision (a)(3)(ii)(A), workforce clearance procedures (a)(3)(ii)(B), termination procedures (a)(3)(ii)(C), and sanctions policy (a)(3)(ii)(D). Create standardized processes for onboarding, role changes, and offboarding that include access provisioning and deprovisioning.",
              check: "Build workforce security procedures including a termination checklist, access revocation SLA, and a sanctions policy matrix with escalating consequences."
            },
            {
              title: "Establish information access management procedures",
              control: "§164.308(a)(4)",
              how: "Implement access authorization (a)(4)(ii)(B) and access establishment (a)(4)(ii)(C) procedures. Define the process for requesting, approving, implementing, and reviewing access to ePHI systems. Ensure role-based access aligns with the minimum necessary standard.",
              check: "Create an access request and approval workflow with defined approval authorities, access provisioning SLAs, and quarterly access review procedures."
            },
            {
              title: "Develop a security awareness and training program",
              control: "§164.308(a)(5)",
              how: "Build training covering security reminders, protection from malicious software, log-in monitoring, password management, and incident reporting. Include phishing simulation exercises, security newsletters, and just-in-time training for emerging threats. Track completion and effectiveness metrics.",
              check: "Deploy a training curriculum with at least four content modules, a phishing simulation schedule, and a tracking system measuring completion rates and effectiveness."
            },
            {
              title: "Evaluate and update security incident procedures",
              control: "§164.308(a)(6)",
              how: "Review and enhance incident response procedures covering identification, response, mitigation, reporting, and lessons learned. Define incident severity levels, escalation paths, communication plans, and evidence preservation requirements. Include specific procedures for suspected security incidents.",
              check: "Write an incident response playbook with severity classification matrix, escalation procedures, communication templates, and a post-incident review template."
            }
          ]
        },
        {
          day: "Tuesday",
          label: "Physical Safeguards",
          description: "Implement physical safeguard controls for facility access, workstation use, device security, and media management.",
          tasks: [
            {
              title: "Implement facility access controls",
              control: "§164.310(a)(1)",
              how: "Establish procedures for controlling physical access to facilities containing ePHI. Implement contingency operations (a)(1)(ii)(B) for facility access during emergencies, maintenance records (a)(1)(ii)(C), and validate procedures to determine a person's right to access the facility. Consider badges, biometrics, visitor logs, escort policies, and after-hours access procedures.",
              check: "Document facility access control procedures covering normal operations, emergencies, visitor management, and after-hours access with evidence of implementation."
            },
            {
              title: "Define workstation use and security policies",
              control: "§164.310(b), §164.310(c)",
              how: "Create policies for workstation use (b) specifying proper use of workstations accessing ePHI, and workstation security (c) addressing physical safeguards for workstations. Address screen positioning, auto-lock timeouts, clean desk policies, portable device restrictions, and public space work rules.",
              check: "Write a workstation use and security policy covering desktop, laptop, and mobile device scenarios with specific configuration requirements for each."
            },
            {
              title: "Establish device and media control procedures",
              control: "§164.310(d)(1)",
              how: "Implement procedures for all four device and media control areas: (i) disposition of hardware/electronic media containing ePHI, (ii) media re-use procedures including data sanitization, (iii) accountability tracking of hardware and media, and (iv) data backup and storage procedures. Reference NIST 800-88 for media sanitization standards.",
              check: "Create device and media lifecycle management procedures including procurement, deployment, re-use, disposal, and data backup with sanitization standards."
            },
            {
              title: "Develop a media sanitization and disposal program",
              control: "§164.310(d)(2)(i)–(iv)",
              how: "Build a comprehensive media sanitization program based on NIST SP 800-88 guidelines. Define sanitization methods (clear, purge, destroy) based on media type. Establish chain of custody documentation, certificate of destruction requirements, and periodic audits of disposal processes.",
              check: "Develop a media sanitization matrix covering HDD, SSD, tape, USB, and optical media with appropriate NIST 800-88 methods and documentation requirements."
            },
            {
              title: "Design a physical security audit program",
              control: "§164.310(a)(2)(ii) Facility Security Plan",
              how: "Create an audit program for physical security controls including periodic facility walkthroughs, access log reviews, security system testing, environmental monitoring (HVAC, fire suppression), and visitor management compliance checks. Define audit frequency, checklists, and remediation tracking.",
              check: "Build a physical security audit checklist with at least twenty inspection items, defined frequencies, and a remediation tracking template."
            }
          ]
        },
        {
          day: "Wednesday",
          label: "Technical Safeguards — Access Control and Audit",
          description: "Implement technical safeguards including access controls, audit controls, integrity, and transmission security for ePHI systems.",
          tasks: [
            {
              title: "Implement comprehensive access controls",
              control: "§164.312(a)(1)",
              how: "Deploy all four access control specifications: unique user identification (a)(1)(i)(A), emergency access procedures (a)(1)(i)(B), automatic logoff (a)(1)(i)(C), and encryption/decryption (a)(1)(ii)(A). Implement role-based access control with segregation of duties. Configure system-level and application-level access with least privilege principles.",
              check: "Document access control configurations for at least five ePHI systems including unique ID assignment, emergency access procedures, auto-logoff settings, and encryption status."
            },
            {
              title: "Deploy audit control mechanisms across ePHI systems",
              control: "§164.312(b)",
              how: "Implement audit controls that record and examine access to ePHI including system-level logs, application-level audit trails, database activity monitoring, network traffic analysis, and privileged user monitoring. Define log retention periods, review frequencies, and alert thresholds for suspicious activity.",
              check: "Configure and document audit controls for at least five systems with defined log retention policies, review schedules, and alerting rules for anomalous access patterns."
            },
            {
              title: "Implement integrity controls for ePHI",
              control: "§164.312(c)(1)",
              how: "Deploy mechanisms to protect ePHI from improper alteration or destruction including checksums, file integrity monitoring (FIM), database constraints, backup verification, and version control. Implement person or entity authentication (c)(2) using multi-factor authentication for systems accessing ePHI.",
              check: "Document integrity controls for ePHI at rest and in transit, including checksums, FIM deployment status, backup verification procedures, and MFA implementation across systems."
            },
            {
              title: "Secure ePHI transmission channels",
              control: "§164.312(e)(1) Transmission Security",
              how: "Implement transmission security including encryption (e)(2)(ii)(A) and integrity controls (e)(2)(ii)(B) for all ePHI transmitted over electronic communications networks. Ensure TLS 1.2+ for web traffic, IPsec for VPN connections, encrypted email for ePHI, and secure file transfer protocols. Document all transmission channels and their security controls.",
              check: "Create a transmission security inventory listing all ePHI communication channels, their encryption methods, certificate management processes, and compliance status."
            },
            {
              title: "Conduct a technical controls effectiveness assessment",
              control: "§164.308(a)(8) Evaluation",
              how: "Perform a comprehensive assessment of all implemented technical controls against Security Rule requirements. Test controls for effectiveness using vulnerability scanning, penetration testing, configuration audits, and access review. Document findings, risk ratings, and prioritized remediation recommendations.",
              check: "Produce a technical controls assessment report with findings for each safeguard category, risk ratings, and a prioritized remediation plan for identified gaps."
            }
          ]
        },
        {
          day: "Thursday",
          label: "Encryption, Backup, and Contingency Planning",
          description: "Implement encryption standards, backup procedures, and contingency planning to ensure ePHI availability and recoverability.",
          tasks: [
            {
              title: "Establish encryption standards for ePHI",
              control: "§164.312(a)(2)(iv) Encryption",
              how: "Define encryption standards covering data at rest (AES-256 for databases, full-disk encryption for endpoints, encrypted backups) and data in transit (TLS 1.2+, encrypted email, VPN encryption). Align with NIST SP 800-111 for storage encryption and NIST SP 800-52 for TLS requirements. Document exception procedures for addressable encryption specifications.",
              check: "Create an encryption policy document specifying algorithms, key management procedures, implementation requirements, and exception documentation for all ePHI data states."
            },
            {
              title: "Design and test a backup and recovery program",
              control: "§164.310(a)(2)(ii) Data Backup Plan",
              how: "Implement a comprehensive backup program with the 3-2-1 rule (3 copies, 2 media types, 1 offsite). Define RPO (Recovery Point Objective) and RTO (Recovery Time Objective) for critical ePHI systems. Establish backup schedules, encryption, rotation, and testing procedures. Document offsite storage locations and access procedures.",
              check: "Document a backup and recovery plan with RPO/RTO targets for at least three ePHI systems and evidence of at least one successful restore test."
            },
            {
              title: "Develop a disaster recovery plan for ePHI systems",
              control: "§164.308(a)(7)(ii)(B) Disaster Recovery Plan",
              how: "Create a disaster recovery plan covering system identification, recovery procedures, communication protocols, alternate processing sites, data restoration sequences, and testing schedules. Define disaster scenarios, system priorities, recovery team roles, and vendor coordination procedures. Ensure the plan addresses natural disasters, cyber attacks, and infrastructure failures.",
              check: "Write a disaster recovery plan with specific recovery procedures for at least five critical ePHI systems and a testing schedule with at least one planned annual DR exercise."
            },
            {
              title: "Build an emergency mode operations plan",
              control: "§164.308(a)(7)(ii)(C) Emergency Mode Operation Plan",
              how: "Develop procedures for maintaining critical ePHI protection during emergency operations including system prioritization, minimal essential operations, emergency access credentials, and transition-to-normal procedures. Consider scenarios such as power outages, system failures, and active security incidents.",
              check: "Create an emergency mode operations plan identifying critical functions, minimal system configurations, emergency access procedures, and reconstitution procedures."
            },
            {
              title: "Implement an application and data contingency plan",
              control: "§164.308(a)(7)(ii)(D) Criticality Analysis",
              how: "Conduct a criticality analysis of all applications and data systems to determine priority for recovery. Create contingency plans for each system category. Implement redundancy for critical systems, establish data replication procedures, and document manual workarounds for system outages.",
              check: "Complete a criticality analysis for all ePHI systems and develop contingency procedures for the top five critical applications with defined failover mechanisms."
            }
          ]
        },
        {
          day: "Friday",
          label: "Vendor Management and Subcontractor Controls",
          description: "Implement controls for managing business associates, subcontractors, and third-party vendors with ePHI access.",
          tasks: [
            {
              title: "Establish a vendor risk assessment framework",
              control: "§164.308(b)(1) Business Associate Contracts",
              how: "Build a vendor risk assessment methodology that evaluates potential business associates before engagement. Assess PHI volume, access type, security posture, compliance history, financial stability, and geographic risk. Define risk tiers, assessment frequencies, and approval requirements for each tier.",
              check: "Create a vendor risk assessment template with scoring criteria, risk tiers, and approval workflows for at least three risk levels."
            },
            {
              title: "Standardize BAA templates and review processes",
              control: "§164.504(e)(2)",
              how: "Develop standardized BAA templates incorporating all required provisions from §164.504(e)(2). Include provisions for breach notification, subcontractor obligations, termination for cause, and indemnification. Establish a legal review process for non-standard BA terms and a tracking system for BAA renewals.",
              check: "Create a standardized BAA template with annotations for each required provision and a review checklist for non-standard terms."
            },
            {
              title: "Implement ongoing vendor monitoring procedures",
              control: "§164.308(b)(2) Contracts and Other Arrangements",
              how: "Design ongoing monitoring procedures for business associates including periodic security assessments, compliance attestation collection, breach notification verification, subcontractor oversight, and access review. Define monitoring triggers, escalation procedures, and contract enforcement mechanisms.",
              check: "Build a vendor monitoring schedule with assessment criteria, evidence collection procedures, and escalation triggers for identified risks."
            },
            {
              title: "Manage vendor access lifecycle",
              control: "§164.308(a)(3) Workforce Security",
              how: "Implement access lifecycle management for vendor personnel including access provisioning procedures, time-limited access tokens, periodic access reviews, incident reporting requirements, and access revocation upon contract termination. Ensure vendor access is subject to the same controls as internal workforce.",
              check: "Document vendor access lifecycle procedures including provisioning workflows, review schedules, and termination/revocation checklists."
            },
            {
              title: "Create a vendor incident response coordination plan",
              control: "§164.404(a)(1) Notification by a Business Associate",
              how: "Develop procedures for coordinating incident response with business associates. Define notification requirements, escalation contacts, joint investigation procedures, evidence sharing, and remediation coordination. Ensure your BAA requires specific incident notification timelines and information sharing.",
              check: "Write a vendor incident coordination plan with contact matrices, notification templates, joint response procedures, and documented communication channels for at least five key vendors."
            }
          ]
        }
      ]
    },
    {
      week: 3,
      title: "HIPAA Verifier — Risk Analysis, BAAs, and Compliance Assessment",
      days: [
        {
          day: "Monday",
          label: "Risk Analysis Methodology",
          description: "Conduct comprehensive risk analyses following NIST methodology adapted for HIPAA Security Rule compliance.",
          tasks: [
            {
              title: "Study NIST SP 800-30 risk assessment methodology",
              control: "§164.308(a)(1)(ii)(A) Risk Analysis",
              how: "Deep dive into NIST SP 800-30 Rev.1 covering the four-step risk assessment process: (1) prepare for assessment, (2) conduct assessment, (3) communicate results, (4) maintain assessment. Understand threat identification, vulnerability identification, likelihood determination, impact analysis, and risk determination. Review HHS guidance on risk analysis for HIPAA compliance.",
              check: "Document the four-step NIST risk assessment process with HIPAA-specific adaptations and create a risk assessment planning template."
            },
            {
              title: "Conduct a risk analysis for a critical ePHI system",
              control: "§164.308(a)(1)(ii)(A)",
              how: "Perform an end-to-end risk analysis for one critical ePHI system. Follow the complete NIST 800-30 process: identify assets, threats, and vulnerabilities; determine likelihood and impact; calculate risk ratings; and develop treatment plans. Use quantitative and qualitative methods where appropriate.",
              check: "Complete a full risk analysis for one ePHI system producing an asset-threat-vulnerability matrix, risk register, and prioritized treatment plan."
            },
            {
              title: "Build a risk register and risk treatment framework",
              control: "§164.308(a)(1)(ii)(B) Risk Management",
              how: "Design a risk register template capturing risk ID, description, affected assets, threat sources, vulnerabilities, likelihood, impact, risk rating, treatment option (mitigate, transfer, accept, avoid), and implementation timeline. Create a risk treatment framework with cost-benefit analysis templates and residual risk documentation.",
              check: "Populate a risk register with at least fifteen risks from your organization, each with full risk rating and treatment plan details."
            },
            {
              title: "Define risk scoring methodology and thresholds",
              control: "§164.308(a)(1)(ii)(B)",
              how: "Establish a consistent risk scoring methodology using a defined likelihood and impact matrix. Create risk appetite and risk threshold definitions that trigger specific actions. Define risk tolerance levels for different asset categories and establish acceptance authority for residual risks.",
              check: "Create a risk scoring matrix with defined likelihood levels, impact categories, risk rating thresholds, and corresponding action requirements for each risk level."
            },
            {
              title: "Validate risk analysis with peer review and management sign-off",
              control: "§164.308(a)(1)(ii)(D) Information System Activity Review",
              how: "Submit your risk analysis for peer review by a security professional. Address review findings, adjust risk ratings as needed, and obtain management sign-off on the risk treatment plan. Document the review process, approval decisions, and any changes made based on feedback.",
              check: "Document the peer review process, incorporate feedback, and obtain management approval with signed acknowledgment of risk acceptance decisions."
            }
          ]
        },
        {
          day: "Tuesday",
          label: "BAA Management and Contract Verification",
          description: "Verify business associate agreements, manage the BA lifecycle, and ensure subcontractor compliance.",
          tasks: [
            {
              title: "Audit existing BAAs for required provisions",
              control: "§164.504(e)(2)(i)–(viii)",
              how: "Conduct a comprehensive audit of all existing BAAs against the eight required provision categories: permitted uses/disclosures, required safeguards, breach reporting, subcontractor obligations, access to records, return/destruction of PHI, authorized disclosures, and termination provisions. Document compliance gaps and non-standard terms.",
              check: "Complete a BAA audit for at least five agreements producing a compliance scorecard with specific gap findings and recommended remediations."
            },
            {
              title: "Verify subcontractor BAA chain of compliance",
              control: "§164.502(e)(1)(ii)",
              how: "Trace the BAA chain for each business associate to ensure subcontractors also have appropriate BAAs in place. Verify that flow-down provisions require the same privacy and security obligations as the primary BAA. Identify breaks in the chain and establish remediation actions.",
              check: "Map the subcontractor BAA chain for at least three business associates, identifying compliance gaps and documenting remediation steps for each gap."
            },
            {
              title: "Evaluate BAA performance against contractual obligations",
              control: "§164.308(b)(2)",
              how: "Develop KPIs for business associate compliance including breach notification timeliness, security assessment completion rates, training completion, access review compliance, and incident reporting responsiveness. Collect evidence of BA compliance and document any performance issues.",
              check: "Create a BA performance scorecard with at least five KPIs and complete an evaluation for at least three business associates."
            },
            {
              title: "Manage BAA renewals, amendments, and terminations",
              control: "§164.504(e)(2)(ii)(J)–(K)",
              how: "Establish processes for BAA lifecycle management including renewal triggers and timelines, amendment procedures for scope changes, termination processes including PHI return/destruction, and transition planning when changing business associates. Ensure no gap coverage during transitions.",
              check: "Build a BAA lifecycle management process with renewal calendar, amendment templates, termination checklists, and PHI return/destruction verification procedures."
            },
            {
              title: "Develop a BA incident response and breach coordination plan",
              control: "§164.404(a)(1)(ii)",
              how: "Create procedures for coordinating breach response with business associates including notification timelines (business associates must notify covered entities without unreasonable delay, no later than 60 days), required information elements, joint investigation protocols, and notification responsibility assignment.",
              check: "Write a BA incident coordination playbook with notification templates, investigation procedures, and responsibility matrices for at least three breach scenarios."
            }
          ]
        },
        {
          day: "Wednesday",
          label: "Breach Assessment and Response",
          description: "Master breach assessment techniques, notification processes, and incident documentation for HIPAA compliance.",
          tasks: [
            {
              title: "Perform a detailed four-factor breach risk assessment",
              control: "§164.402(2)",
              how: "Conduct a thorough four-factor risk assessment for a complex breach scenario. Evaluate: (i) nature and extent of PHI including types of identifiers and likelihood of re-identification, (ii) unauthorized person identity and whether they are obligated to protect PHI, (iii) whether PHI was actually acquired or viewed versus simply exposed, (iv) mitigation effectiveness including containment actions taken. Document the complete analysis with supporting evidence.",
              check: "Complete a documented four-factor risk assessment for a complex scenario with evidence supporting each factor determination and a clear final breach determination."
            },
            {
              title: "Execute the breach notification process end-to-end",
              control: "§164.404, §164.406, §164.408",
              how: "Walk through the complete notification process: draft individual notification letters with required content, prepare HHS OCR portal submission with all required fields, determine media notification requirements for large breaches, create notification tracking logs, and document the notification timeline from discovery to completion.",
              check: "Complete a mock breach notification exercise producing individual notification letters, HHS portal submission draft, tracking log, and timeline documentation."
            },
            {
              title: "Conduct a post-breach root cause analysis",
              control: "§164.308(a)(1)(ii)(D) Information System Activity Review",
              how: "Perform a root cause analysis for a breach incident. Identify the direct cause, contributing factors, and systemic issues that allowed the breach to occur. Map root causes to specific Security Rule requirements and develop corrective actions that address both the immediate issue and underlying systemic problems.",
              check: "Produce a root cause analysis report with causal chain documentation, systemic issue identification, and corrective action plans with assigned owners and deadlines."
            },
            {
              title: "Review and validate breach documentation completeness",
              control: "§164.316(b) Policies and Procedures",
              how: "Audit a completed breach response for documentation completeness. Verify all required elements are documented: discovery date, incident description, PHI types affected, individuals affected, four-factor analysis, notification decisions and rationale, notification timeline, and corrective actions. Ensure documentation meets the 6-year retention requirement.",
              check: "Create a breach documentation checklist and audit a completed incident against it, producing a completeness report with identified gaps and remediation steps."
            },
            {
              title: "Analyze OCR enforcement actions for breach-related violations",
              control: "HHS Enforcement Actions",
              how: "Study at least five recent OCR enforcement actions involving breach-related violations. Analyze the facts, violations cited, penalty amounts, corrective action requirements, and lessons learned. Identify patterns in enforcement that inform your organization's compliance priorities.",
              check: "Produce a lessons-learned report analyzing at least five OCR enforcement actions with actionable recommendations mapped to your organization's risk profile."
            }
          ]
        },
        {
          day: "Thursday",
          label: "Access Log Review and Monitoring",
          description: "Implement systematic access log review procedures and monitoring for detecting unauthorized ePHI access.",
          tasks: [
            {
              title: "Design an access log review program",
              control: "§164.308(a)(1)(ii)(D) Information System Activity Review",
              how: "Create a structured access log review program covering which systems to monitor, review frequency, responsible personnel, review procedures, alert thresholds, and escalation criteria. Define normal vs abnormal access patterns for different user roles and system types.",
              check: "Build an access review program document with system prioritization, review schedules, procedure checklists, and alerting criteria for at least five ePHI systems."
            },
            {
              title: "Implement automated alerting for suspicious ePHI access",
              control: "§164.312(b) Audit Controls",
              how: "Configure automated monitoring alerts for suspicious access patterns including: access outside normal business hours, bulk data downloads, access to records without treatment relationship, multiple failed authentication attempts, privileged account abuse, and geographic anomalies. Define alert severity levels and response procedures.",
              check: "Configure and document automated alerts for at least eight suspicious access patterns with severity classifications and response procedures for each."
            },
            {
              title: "Conduct a manual access review of a high-risk ePHI system",
              control: "§164.312(b)",
              how: "Perform a hands-on manual review of access logs for a high-risk ePHI system. Examine user access patterns, identify inappropriate access, verify role appropriateness, and document findings. Compare actual access against the minimum necessary standard for each user role.",
              check: "Complete a manual access review for one ePHI system producing a findings report with specific access violations, recommended corrections, and role access adjustments."
            },
            {
              title: "Review privileged account access to ePHI systems",
              control: "§164.312(a)(1)",
              how: "Audit privileged account (administrator, root, DBA) access to ePHI systems. Verify that privileged access is justified, monitored, logged, and periodically reviewed. Ensure privileged access follows separation of duties and that privileged credentials are managed securely.",
              check: "Document a privileged access audit report for at least three ePHI systems with justification verification, monitoring status, and credential management review."
            },
            {
              title: "Test access revocation procedures",
              control: "§164.308(a)(3)(ii)(C) Termination Procedures",
              how: "Test your access revocation procedures by simulating a workforce member departure. Verify that all ePHI system access is revoked within the defined SLA, that deprovisioning covers all systems, and that shared accounts are changed. Document the process from termination notification through access confirmation.",
              check: "Conduct an access revocation test for a simulated termination and document the process, timing, completeness, and any gaps identified."
            }
          ]
        },
        {
          day: "Friday",
          label: "Policy Compliance Verification",
          description: "Verify policy compliance through internal audits, control testing, and evidence collection for regulatory readiness.",
          tasks: [
            {
              title: "Develop a HIPAA compliance audit framework",
              control: "§164.308(a)(8) Evaluation",
              how: "Create a comprehensive audit framework covering scope definition, audit planning, execution procedures, evidence collection, finding documentation, and remediation tracking. Define audit types (policy compliance, technical controls, procedural effectiveness) and their respective frequencies.",
              check: "Write an audit framework document with audit type definitions, planning templates, evidence collection procedures, and remediation tracking mechanisms."
            },
            {
              title: "Execute a policy compliance audit against the Privacy Rule",
              control: "§164.530(b) Training, §164.530(j) Documentation",
              how: "Perform a structured audit of Privacy Rule compliance including: NPP adequacy, authorization procedures, minimum necessary implementation, patient rights procedures, workforce training documentation, and complaint handling. Collect evidence of compliance and document findings.",
              check: "Complete a Privacy Rule compliance audit for at least six requirement areas with evidence records, findings summaries, and risk-rated recommendations."
            },
            {
              title: "Execute a technical controls compliance audit",
              control: "§164.312 Technical Safeguards",
              how: "Audit technical safeguard implementation including access controls, audit controls, integrity controls, and transmission security. Test controls through configuration reviews, vulnerability scans, and control validation. Document compliance status and identify technical gaps requiring remediation.",
              check: "Complete a technical controls audit covering all four safeguard areas with test results, compliance ratings, and prioritized findings."
            },
            {
              title: "Test internal incident response procedures",
              control: "§164.308(a)(6) Security Incident Procedures",
              how: "Conduct a tabletop exercise or live drill testing your incident response procedures. Evaluate detection capabilities, escalation effectiveness, containment actions, notification procedures, evidence preservation, and post-incident review. Document lessons learned and process improvements.",
              check: "Document an incident response exercise with scenario description, team actions, timeline adherence, effectiveness ratings, and identified improvements."
            },
            {
              title: "Compile compliance evidence and prepare for external audit",
              control: "§164.316(b)(2)(i) Documentation Requirements",
              how: "Organize all compliance evidence into an audit-ready evidence repository. Include policies, procedures, training records, risk assessments, audit reports, incident logs, BAA inventory, and corrective action records. Create an evidence index and ensure all documentation meets the 6-year retention requirement.",
              check: "Build a compliance evidence repository with at least twenty organized evidence categories and a complete index documenting retention compliance."
            }
          ]
        }
      ]
    },
    {
      week: 4,
      title: "HIPAA Certified — Audit Readiness, Enforcement, and Certification",
      days: [
        {
          day: "Monday",
          label: "OCR Audit Readiness",
          description: "Prepare for potential OCR audits by understanding the audit process, building an audit response capability, and identifying common audit triggers.",
          tasks: [
            {
              title: "Study the OCR audit methodology and selection criteria",
              control: "OCR Audit Protocol",
              how: "Research the OCR audit process including selection criteria, audit scope definition, document request procedures, site visit protocols, and audit duration. Understand the phases: audit selection, document submission, desk audit, corrective action, and closure. Review published audit protocols and compliance guidance.",
              check: "Create an OCR audit preparation checklist covering all audit phases with specific documentation requirements and responsible parties for each phase."
            },
            {
              title: "Build an audit response team and playbook",
              control: "§164.308(a)(1) Security Management Process",
              how: "Establish a dedicated audit response team with defined roles: audit coordinator, legal counsel, technical SMEs, privacy officer, documentation specialists, and executive sponsor. Create an audit response playbook with communication protocols, document gathering procedures, and interview preparation guidelines.",
              check: "Define an audit response team roster with roles, responsibilities, contact information, and a playbook covering document requests, interviews, and on-site visits."
            },
            {
              title: "Prepare a comprehensive documentation package",
              control: "§164.316(b)",
              how: "Compile a complete documentation package including: organizational charts, risk analyses, risk management plans, policies and procedures, training records, BAA inventory, incident logs, access reviews, business continuity plans, and previous audit reports. Organize by audit domain for efficient retrieval.",
              check: "Assemble a documentation package organized by audit domain with a master index, document status tracking, and retrieval procedures for at least fifteen document categories."
            },
            {
              title: "Conduct a mock OCR audit of your organization",
              control: "§164.308(a)(8) Evaluation",
              how: "Simulate an OCR audit by having internal team members act as auditors. Follow the OCR audit protocol, request documentation, conduct interviews with key personnel, review technical controls, and assess policy compliance. Document findings as the OCR would and compare against your self-assessment.",
              check: "Complete a mock OCR audit producing an audit report with findings organized by audit domain, severity ratings, and a corrective action plan for identified deficiencies."
            },
            {
              title: "Develop corrective action plans for identified gaps",
              control: "§164.308(a)(1)(ii)(B) Risk Management",
              how: "Based on your mock audit findings, develop formal corrective action plans with root cause analysis, specific remediation steps, responsible owners, implementation timelines, and verification procedures. Prioritize by risk severity and ensure alignment with organizational capacity.",
              check: "Create corrective action plans for at least five identified gaps with SMART goals, milestones, resource requirements, and success criteria."
            }
          ]
        },
        {
          day: "Tuesday",
          label: "Penalty Structures and Enforcement",
          description: "Understand HIPAA penalty structures, enforcement mechanisms, and the factors that determine penalty severity.",
          tasks: [
            {
              title: "Study the HIPAA penalty tier structure in detail",
              control: "42 U.S.C. §1320d-5(b)",
              how: "Analyze all four penalty tiers: (1) Tier 1 — Did Not Know ($100–$50K per violation, $1.5M annual cap), (2) Tier 2 — Reasonable Cause ($1K–$50K per violation, $1.5M annual cap), (3) Tier 3 — Willful Neglect — Corrected ($10K–$50K per violation, $1.5M annual cap), (4) Tier 4 — Willful Neglect — Not Corrected ($50K per violation, $1.5M annual cap). Understand how violations are counted per calendar year and per provision.",
              check: "Create a penalty reference matrix with all four tiers, per-violation ranges, annual caps, and examples of conduct that falls into each tier."
            },
            {
              title: "Analyze willful neglect determinations and factors",
              control: "42 U.S.C. §1320d-5(b)(1)–(4)",
              how: "Study how OCR determines willful neglect — conscious and intentional failure to comply or reckless disregard of HIPAA obligations. Review case law and OCR guidance on what constitutes reasonable cause vs willful neglect. Analyze factors including: implementation of compliance program, response to known issues, risk assessment history, and prior violation history.",
              check: "Write an analysis of at least three real enforcement cases examining the factors that determined willful neglect vs reasonable cause classification."
            },
            {
              title: "Study recent OCR enforcement actions and settlement agreements",
              control: "HHS OCR Enforcement Action Database",
              how: "Review the OCR enforcement action database focusing on settlements and corrective action plans from the past two years. Analyze the violation types, organization sizes, penalty amounts, and corrective action requirements. Identify trends in enforcement focus areas and penalty calculation.",
              check: "Summarize at least five recent enforcement actions with violation types, penalty details, corrective action requirements, and identified enforcement trends."
            },
            {
              title: "Understand state attorney general enforcement authority",
              control: "42 U.S.C. §1320d-5(c)",
              how: "Study how state attorneys general can bring HIPAA enforcement actions with penalties up to $25,000 per violation category per year. Understand the interaction between state AG enforcement, OCR enforcement, and private right of action limitations. Review notable state AG enforcement actions.",
              check: "Document the state AG enforcement landscape including authority, penalty structures, and at least three examples of state-level HIPAA enforcement."
            },
            {
              title: "Evaluate your organization's exposure to HIPAA penalties",
              control: "§164.308(a)(1)(ii)(B) Risk Management",
              how: "Assess your organization's penalty exposure based on current compliance posture, risk assessment findings, audit results, and enforcement trends. Calculate potential penalty exposure for your most significant compliance gaps. Develop a penalty risk mitigation plan prioritizing gaps with highest exposure.",
              check: "Create a penalty exposure assessment for your organization quantifying risk across violation categories with a prioritized mitigation plan."
            }
          ]
        },
        {
          day: "Wednesday",
          label: "Common HIPAA Violations and Lessons Learned",
          description: "Identify the most common HIPAA violations and develop strategies to prevent them in your organization.",
          tasks: [
            {
              title: "Analyze the top 10 most common HIPAA violations",
              control: "OCR Enforcement Trends",
              how: "Research and analyze the most frequent HIPAA violations: (1) inadequate access controls, (2) lack of risk analysis, (3) insufficient audit controls, (4) failure to encrypt ePHI, (5) inadequate workforce training, (6) missing BAAs, (7) improper PHI disposal, (8) excessive PHI access, (9) failure to breach notify, (10) unsecured PHI transmissions. For each, study root causes and prevention strategies.",
              check: "Create a top violations reference document with descriptions, root causes, prevention strategies, and your organization's current risk level for each violation type."
            },
            {
              title: "Map your organization's vulnerabilities to common violation patterns",
              control: "§164.308(a)(1)(ii)(A) Risk Analysis",
              how: "Cross-reference your organization's risk assessment findings, audit results, and compliance gaps against common violation patterns. Identify which common violations your organization is most susceptible to based on your industry, size, technology stack, and organizational maturity. Prioritize remediation efforts based on both likelihood and penalty severity.",
              check: "Produce a vulnerability-to-violation mapping report identifying your top five exposure areas aligned with common violation patterns and recommended prevention measures."
            },
            {
              title: "Study a breach case study and extract lessons learned",
              control: "OCR Case Studies",
              how: "Select a significant OCR enforcement case and conduct a thorough analysis: background, compliance failures, investigation process, findings, penalty determination, corrective action requirements, and long-term organizational impact. Extract specific lessons that apply to your organization.",
              check: "Write a detailed case study analysis of one OCR enforcement action with at least five actionable lessons for your organization."
            },
            {
              title: "Develop prevention strategies for your highest-risk areas",
              control: "§164.308(a)(1)(ii)(B) Risk Management",
              how: "For your top five vulnerability areas, develop comprehensive prevention strategies including technical controls, process improvements, training enhancements, and monitoring mechanisms. For each strategy, define success metrics, implementation timeline, resource requirements, and verification procedures.",
              check: "Create prevention strategy plans for your five highest-risk areas with specific control implementations, metrics, and verification approaches."
            },
            {
              title: "Build a continuous compliance improvement program",
              control: "§164.308(a)(8) Evaluation",
              how: "Design a continuous improvement program incorporating lessons learned from violations, enforcement actions, and industry trends. Include mechanisms for capturing emerging risks, updating controls, measuring improvement effectiveness, and reporting progress to leadership. Ensure the program is sustainable and resourced.",
              check: "Draft a continuous compliance improvement program charter with process definitions, metrics framework, reporting cadence, and governance structure."
            }
          ]
        },
        {
          day: "Thursday",
          label: "HITRUST CSF Mapping and Frameworks",
          description: "Understand how HIPAA maps to the HITRUST Common Security Framework and other complementary compliance frameworks.",
          tasks: [
            {
              title: "Study the HITRUST CSF and its relationship to HIPAA",
              control: "HITRUST CSF v11",
              how: "Study the HITRUST Common Security Framework and how it integrates HIPAA Security Rule requirements with NIST, ISO, PCI DSS, and state-specific regulations. Understand HITRUST's control categories, maturity levels (policy, procedure, implemented, measured, managed), certification types (e1, i1, r2), and how HITRUST assessments work.",
              check: "Create a HITRUST CSF overview document covering control categories, maturity levels, certification types, and the relationship between HITRUST and direct HIPAA compliance."
            },
            {
              title: "Map HIPAA Security Rule requirements to HITRUST CSF controls",
              control: "HITRUST-HIPAA Crosswalk",
              how: "Use the HITRUST CSF reference guide to map each HIPAA Security Rule requirement to corresponding HITRUST control references. Document the control objective, control description, implementation guidance, and maturity indicators for at least twenty HIPAA requirements. Identify any gaps where HIPAA has requirements not directly addressed by HITRUST or vice versa.",
              check: "Produce a HIPAA-to-HITRUST crosswalk mapping at least twenty HIPAA requirements with corresponding HITRUST control references and gap analysis notes."
            },
            {
              title: "Understand NIST Cybersecurity Framework alignment with HIPAA",
              control: "NIST CSF 2.0",
              how: "Study how the NIST Cybersecurity Framework (CSF) 2.0 functions (Govern, Identify, Protect, Detect, Respond, Recover) align with HIPAA Security Rule requirements. Map HIPAA safeguards to NIST CSF categories and subcategories. Understand how using NIST CSF can support HIPAA compliance demonstration.",
              check: "Create a NIST CSF to HIPAA Security Rule mapping document showing at least fifteen control alignments across all six CSF functions."
            },
            {
              title: "Evaluate framework adoption benefits and costs",
              control: "Strategic Compliance Planning",
              how: "Analyze the business case for adopting a structured framework like HITRUST CSF for HIPAA compliance. Evaluate costs (assessment fees, consulting, internal resources, remediation), benefits (regulatory confidence, market differentiation, reduced breach risk, streamlined audits), and alternatives (direct HIPAA compliance, NIST-only approach).",
              check: "Write a framework adoption recommendation memo with cost-benefit analysis, implementation roadmap, and risk assessment for your organization."
            },
            {
              title: "Design a comprehensive compliance metrics dashboard",
              control: "§164.308(a)(1) Security Management Process",
              how: "Design a compliance metrics dashboard that tracks HIPAA compliance posture using Key Performance Indicators (KPIs) and Key Risk Indicators (KRIs). Include metrics for policy compliance rates, training completion, risk assessment currency, audit findings status, incident trends, BAA compliance, and corrective action completion.",
              check: "Build a compliance dashboard design with at least fifteen metrics, defined calculation methods, target thresholds, and reporting frequencies."
            }
          ]
        },
        {
          day: "Friday",
          label: "Remediation, Corrective Action, and Program Maturation",
          description: "Finalize your HIPAA compliance program with structured remediation plans, corrective action procedures, and a roadmap for continuous maturation.",
          tasks: [
            {
              title: "Develop a formal corrective action plan (CAP) template",
              control: "OCR Corrective Action Plan Requirements",
              how: "Study OCR corrective action plan requirements from settlement agreements and develop a comprehensive CAP template. Include: violation identification, root cause analysis, corrective measures, implementation timeline, responsible parties, evidence of implementation, monitoring procedures, and reporting requirements. Model after actual OCR CAP requirements.",
              check: "Create a CAP template that mirrors OCR requirements with all necessary sections, and complete one CAP using a real gap identified in your compliance program."
            },
            {
              title: "Prioritize and sequence remediation activities",
              control: "§164.308(a)(1)(ii)(B) Risk Management",
              how: "Build a comprehensive remediation roadmap that sequences all identified compliance gaps based on risk severity, implementation complexity, resource requirements, and regulatory importance. Create workstreams for quick wins (0–90 days), medium-term projects (90–180 days), and strategic initiatives (180–365 days).",
              check: "Develop a 12-month remediation roadmap with prioritized workstreams, resource allocations, milestone dates, and progress tracking mechanisms."
            },
            {
              title: "Implement a corrective action tracking and verification system",
              control: "§164.308(a)(8) Evaluation",
              how: "Build a system for tracking corrective actions from identification through verification. Include: action item logging, owner assignment, progress tracking, evidence collection, verification testing, and closure approval. Ensure the system supports both internal tracking and potential OCR reporting requirements.",
              check: "Deploy a corrective action tracking system with at least ten active items, each with defined evidence requirements and verification procedures."
            },
            {
              title: "Design a HIPAA compliance program maturity model",
              control: "Strategic Compliance Governance",
              how: "Create a maturity model for your HIPAA compliance program with defined levels: Initial (reactive), Developing (documented), Defined (proactive), Managed (measured), Optimized (continuous improvement). For each level, define criteria for policies, risk management, technical controls, training, monitoring, and incident response.",
              check: "Define a five-level HIPAA compliance maturity model with specific criteria for each level across at least six program domains."
            },
            {
              title: "Create a 12-month HIPAA program improvement roadmap",
              control: "§164.308(a)(1) Security Management Process",
              how: "Develop a comprehensive 12-month roadmap for advancing your HIPAA compliance program from current state to target maturity. Include quarterly milestones, resource requirements, budget estimates, governance checkpoints, and success metrics. Ensure alignment with organizational strategic objectives and regulatory developments.",
              check: "Write a 12-month HIPAA program roadmap with quarterly milestones, resource plans, budget estimates, and executive summary suitable for leadership presentation."
            }
          ]
        }
      ]
    }
  ]
};

export default function Hipaa() {
  return <LearningFrameworkPage framework={FRAMEWORK} />;
}
