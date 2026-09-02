import LearningFrameworkPage from "../../components/LearningFrameworkPage";

const FRAMEWORK = {
  id: "coppa",
  name: "COPPA (Children Online Privacy)",
  region: "United States",
  flag: "🇺🇸",
  flagAnimation: "bounce",
  basePath: "/coppa",
  color: "green",
  weeks: 4,
  milestones: 3,
  referenceUrl:
    "https://www.ftc.gov/legal-library/browse/rules/childrens-online-privacy-protection-rule-coppa",
  weeksData: [
    {
      week: 1,
      title: "Foundation — COPPA Scope & Core Concepts",
      description:
        "Understand the foundational elements of COPPA including its scope, the definition of children under 13, operator responsibilities, and the types of personal information the rule protects.",
      days: [
        {
          day: 1,
          title: "COPPA Scope and Jurisdiction",
          tasks: [
            {
              title: "Identify COPPA scope — who it covers",
              control: "FTC applies COPPA to operators of websites, apps, and online services directed to children under 13 or with actual knowledge of child users.",
              how: "Review the FTC COPPA rule text at 16 CFR Part 312. Map your product portfolio and flag any service that targets or knowingly serves users under 13. Document operator vs non-operator roles.",
              check: "A written inventory of all online services with COPPA applicability assessment exists."
            },
            {
              title: "Understand verifiable parental consent (VPC) requirements",
              control: "COPPA requires operators to obtain VPC before collecting, using, or disclosing personal information from children under 13.",
              how: "Study the six FTC-approved VPC methods: signed consent forms, credit card verification, phone verification with trained personnel, video conference, government ID check, and knowledge-based authentication. Map each method to your operational capability.",
              check: "At least three feasible VPC methods are documented with cost and UX impact analysis."
            },
            {
              title: "Distinguish operator vs third-party roles",
              control: "Operators collect data directly from children; third parties receive data from operators. Each has distinct COPPA obligations.",
              how: "Create a data flow diagram showing where personal information enters your system, who processes it, and who receives it. Label each entity as operator, service provider, or third party. Define contractual obligations for third parties.",
              check: "A data flow diagram with role labels for all entities handling children's personal information is published internally."
            },
            {
              title: "Define personal information under COPPA",
              control: "COPPA's definition of personal information is broader than general privacy law — it includes names, photos, videos, audio recordings, geolocation, and persistent identifiers.",
              how: "Catalog all data fields collected by your service. Classify each field against COPPA's definition of personal information in 16 CFR 312.2. Pay special attention to persistent identifiers, device fingerprints, and behavioral tracking cookies.",
              check: "A complete data classification register mapping all collected fields to COPPA personal information categories exists."
            },
            {
              title: "Review safe harbor programs and FTC jurisdiction",
              control: "COPPA safe harbor programs allow FTC-approved self-regulatory programs to provide compliance guidance and enforcement. FTC has direct enforcement authority over non-members.",
              how: "Research the list of current FTC-approved safe harbor programs (e.g., kidSAFE, CARU, ESRB). Evaluate whether joining a safe harbor program is cost-effective. Understand FTC enforcement mechanisms including civil penalties.",
              check: "A decision document recommending whether to join a safe harbor program or pursue direct FTC compliance is completed."
            }
          ]
        },
        {
          day: 2,
          title: "COPPA Rule Deep Dive",
          tasks: [
            {
              title: "Study the COPPA rule structure and requirements",
              control: "The COPPA rule (16 CFR Part 312) covers privacy policies, parental notice, VPC, data minimization, data security, and data retention.",
              how: "Read the full text of 16 CFR Part 312 section by section. Create a compliance checklist mapping each rule section to your current operational state (compliant, partially compliant, non-compliant).",
              check: "A section-by-section compliance checklist with gap annotations is produced."
            },
            {
              title: "Understand the privacy policy requirement",
              control: "Operators must post a clear, prominent, and complete online privacy policy describing data practices for children.",
              how: "Review FTC guidance on COPPA-compliant privacy policies. Compare your current privacy policy against the required elements list: types of information collected, practices, parental rights, and operator contact information.",
              check: "Your privacy policy is assessed against all FTC-required COPPA elements with a gap list documented."
            },
            {
              title: "Learn data minimization principles for children",
              control: "Operators must not condition participation on providing more information than reasonably necessary for the activity.",
              how: "For each feature or service directed at children, list all data fields collected and evaluate whether each field is reasonably necessary. Document alternatives to collecting unnecessary fields.",
              check: "A data minimization review for each children's feature identifies fields that can be eliminated or made optional."
            },
            {
              title: "Understand retention and deletion obligations",
              control: "Operators must retain children's personal information only as long as reasonably necessary and must delete it using reasonable measures.",
              how: "Define retention periods for each category of children's data. Document deletion procedures including cryptographic erasure and database purging. Establish automated retention enforcement mechanisms.",
              check: "Written retention schedules and deletion procedures for all children's personal information categories are documented."
            },
            {
              title: "Study the role of FTC enforcement and penalties",
              control: "FTC can impose civil penalties for COPPA violations. Recent cases have resulted in millions of dollars in fines.",
              how: "Review FTC COPPA enforcement actions from the last 5 years (e.g., Epic Games/Fortnite, Google/YouTube, TikTok). Analyze the violation patterns and resulting penalties to understand enforcement priorities.",
              check: "A summary of at least 10 recent FTC COPPA enforcement actions with violation types and penalty amounts is compiled."
            }
          ]
        },
        {
          day: 3,
          title: "Personal Information and Data Inventory",
          tasks: [
            {
              title: "Conduct a personal information inventory",
              control: "You cannot protect what you do not know. A complete inventory of children's personal information is the foundation of COPPA compliance.",
              how: "Interview product teams, engineering, and analytics stakeholders. Use automated discovery tools to scan databases, logs, and APIs for data fields matching COPPA's definition. Document data sources, storage locations, and processing purposes.",
              check: "A comprehensive data inventory covering all children's personal information across all systems is completed."
            },
            {
              title: "Identify persistent identifiers and tracking mechanisms",
              control: "COPPA covers persistent identifiers that can recognize a user over time, including cookies, device IDs, and IP addresses used for tracking.",
              how: "Audit all cookies, local storage, session storage, device fingerprinting, and SDK integrations. Classify each identifier as functional or tracking. Flag any persistent identifiers used for behavioral profiling of children.",
              check: "A complete audit of persistent identifiers and tracking mechanisms with classification labels is documented."
            },
            {
              title: "Map geolocation data handling for children",
              control: "Geolocation information is explicitly listed as personal information under COPPA and requires VPC before collection.",
              how: "Review all features that collect or infer geolocation data (GPS, IP-based, WiFi-based). Determine if geolocation is necessary for the feature. Document alternative approaches that do not require precise location.",
              check: "A geolocation data handling policy with necessity assessments and alternatives is published."
            },
            {
              title: "Assess audio and video data collection",
              control: "Photos, videos, and audio recordings of children are personal information under COPPA, even if not linked to identifying information.",
              how: "Review all features that allow capturing or uploading of photos, videos, or audio. Assess whether this data is collected from or about children. Evaluate storage, access controls, and sharing settings.",
              check: "All media collection features touching children's data are documented with appropriate safeguards identified."
            },
            {
              title: "Understand operator-directed vs general audience services",
              control: "A service is 'directed to children' if its content, target audience, or advertising indicates it is intended for children under 13.",
              how: "Review FTC factors for determining if a service is directed to children: subject matter, visual content, age of models, advertising, empirical evidence of audience composition. Document your analysis for each service.",
              check: "A written COPPA applicability determination for each service exists with supporting evidence."
            }
          ]
        },
        {
          day: 4,
          title: "COPPA vs Other Privacy Frameworks",
          tasks: [
            {
              title: "Compare COPPA with GDPR provisions for children",
              control: "GDPR Article 8 sets digital consent age at 16 (member states may lower to 13), while COPPA sets it at 13. Both require parental consent but differ in enforcement and scope.",
              how: "Create a side-by-side comparison of COPPA and GDPR children's provisions: consent mechanisms, scope, penalties, enforcement, data subject rights, and cross-border data transfer implications.",
              check: "A detailed comparison table of COPPA and GDPR children's privacy provisions is produced."
            },
            {
              title: "Understand COPPA interaction with state laws",
              control: "Several US states have enacted or proposed children's privacy laws that supplement COPPA (e.g., California's CCPA/CPRA, California Age-Appropriate Design Code Act).",
              how: "Research state-level children's privacy laws and proposals. Identify any state laws that impose stricter requirements than COPPA. Map multi-state compliance obligations.",
              check: "A matrix of federal and state children's privacy obligations with applicability to your services is created."
            },
            {
              title: "Assess COPPA implications for AI and machine learning",
              control: "FTC has signaled that using children's data for AI training or profiling raises additional COPPA concerns around data minimization and purpose limitation.",
              how: "Review FTC guidance on AI and children's data. Assess whether any AI models or algorithms in your stack are trained on or process children's personal information. Document purpose limitation controls.",
              check: "An AI and children's data assessment covering training data, model inference, and profiling is completed."
            },
            {
              title: "Review international children's privacy standards",
              control: "If your service operates internationally, you must comply with multiple children's privacy regimes (COPPA, GDPR, UK Age Appropriate Design Code, etc.).",
              how: "Map your service's geographic reach. Identify all international children's privacy requirements applicable to your user base. Develop a harmonized compliance framework.",
              check: "An international children's privacy compliance map with harmonized requirements is documented."
            },
            {
              title: "Document foundation knowledge assessment",
              control: "Validate foundational knowledge before progressing to implementation activities.",
              how: "Prepare a knowledge assessment covering COPPA scope, VPC methods, operator definitions, personal information categories, and enforcement landscape. Conduct a self-assessment or team quiz.",
              check: "A completed knowledge assessment with a score of 80% or higher confirms readiness for the implementation phase."
            }
          ]
        },
        {
          day: 5,
          title: "Foundation Wrap-Up and Documentation",
          tasks: [
            {
              title: "Compile COPPA foundation documentation package",
              control: "Centralized documentation ensures all stakeholders have access to consistent COPPA foundational knowledge.",
              how: "Aggregate all week 1 deliverables into a COPPA foundation documentation package. Include the applicability assessment, data inventory summary, compliance checklist, comparison tables, and knowledge assessment results.",
              check: "A complete COPPA foundation documentation package is published to the internal knowledge base."
            },
            {
              title: "Identify foundational gaps and remediation priorities",
              control: "Gap analysis drives the implementation plan for subsequent weeks.",
              how: "Review all compliance checklist items marked as non-compliant or partially compliant. Prioritize gaps by risk severity (high, medium, low) and remediation effort (quick win, moderate, complex).",
              check: "A prioritized gap remediation roadmap is produced with owners and target dates."
            },
            {
              title: "Establish COPPA governance structure",
              control: "Effective COPPA compliance requires clear ownership, escalation paths, and decision-making authority.",
              how: "Define roles and responsibilities for COPPA compliance: Data Protection Officer, legal counsel, engineering leads, product managers. Establish an escalation framework for COPPA-related decisions and incidents.",
              check: "A COPPA governance structure document with RACI matrix is published."
            },
            {
              title: "Schedule stakeholder alignment meetings",
              control: "Cross-functional alignment ensures COPPA compliance efforts are integrated into product development and operations.",
              how: "Schedule kick-off meetings with engineering, product, legal, marketing, and customer support teams to socialize COPPA requirements and the implementation roadmap. Prepare team-specific briefing documents.",
              check: "Alignment meetings are scheduled and briefing documents are distributed to all relevant teams."
            },
            {
              title: "Prepare implementation plan for Week 2",
              control: "A detailed implementation plan ensures efficient execution of VPC and age-gating mechanisms.",
              how: "Based on gap analysis, create a detailed implementation plan for Week 2 covering VPC method selection, age-gating design, consent management architecture, and technical requirements.",
              check: "A detailed Week 2 implementation plan with technical specifications is approved by stakeholders."
            }
          ]
        }
      ]
    },
    {
      week: 2,
      title: "Implementer — VPC & Age-Gating Implementation",
      description:
        "Implement the technical mechanisms for verifiable parental consent, age-gating, consent management, and COPPA-compliant privacy policies in your product.",
      days: [
        {
          day: 1,
          title: "VPC Method Implementation",
          tasks: [
            {
              title: "Design VPC method selection matrix",
              control: "Different VPC methods offer different balances of security, UX friction, and cost. Method selection should align with risk level and user demographics.",
              how: "Evaluate each FTC-approved VPC method against criteria: verification strength, user experience impact, implementation cost, and false positive/negative rates. Create a decision matrix to select the primary and fallback VPC methods.",
              check: "A VPC method selection matrix with justification for chosen methods is documented and approved."
            },
            {
              title: "Implement signed consent form flow",
              control: "The signed consent form method requires a parent to print, sign, and submit a consent form confirming their identity and consent for their child.",
              how: "Design a digital consent form that captures required information: parent name, child name, consent scope, and digital signature. Implement PDF generation for printing option and secure upload portal for form submission. Validate and store completed forms.",
              check: "A functional signed consent form flow with PDF generation and secure upload is implemented and tested."
            },
            {
              title: "Implement credit card verification method",
              control: "Credit card verification uses a nominal charge and refund to verify parental identity through a payment instrument in the parent's name.",
              how: "Integrate a payment processor to handle small verification charges (e.g., $0.01-$0.50). Implement immediate refund automation. Ensure the charge description clearly communicates its verification purpose. Handle declined cards and verification failures gracefully.",
              check: "A credit card verification flow with automated charge and refund is implemented with error handling."
            },
            {
              title: "Implement phone verification method",
              control: "Phone verification requires trained personnel to call a parent to confirm consent, or use an automated callback system with identity verification questions.",
              how: "Design a phone verification flow: parent provides phone number, system initiates callback or schedules call with trained personnel, verification questions are asked, consent is recorded. Implement call recording consent and secure storage of verification records.",
              check: "A phone verification method with callback system and trained personnel protocol is implemented."
            },
            {
              title: "Implement email-plus verification method",
              control: "Email-plus requires sending a confirmation email to the parent with a PIN or token, followed by the parent returning to confirm via email or other reliable method.",
              how: "Implement email-plus flow: collect parent email during sign-up, generate and send a unique PIN/token, provide a confirmation interface where parent enters the PIN. Set expiration timers for tokens. Implement rate limiting to prevent abuse. Store verification records securely.",
              check: "An email-plus verification flow with PIN generation, delivery, and confirmation is implemented and tested."
            }
          ]
        },
        {
          day: 2,
          title: "Age-Gating Mechanisms",
          tasks: [
            {
              title: "Design age-gating entry flow",
              control: "Age-gating is the first line of defense — it must prevent children under 13 from accessing non-COPPA-compliant features without VPC.",
              how: "Design an age-gating screen presented at account creation or first login. Collect birthdate or age declaration. Route users under 13 to the COPPA-compliant experience. Route users 13+ to the standard experience. Consider neutral age prompts per FTC guidance.",
              check: "An age-gating entry flow with proper routing logic is designed and documented with user experience specifications."
            },
            {
              title: "Implement age verification技术 mechanisms",
              control: "Simple age declaration may be insufficient — FTC expects reasonable measures to verify age, though not necessarily government ID verification.",
              how: "Evaluate age verification technologies: knowledge-based questions, third-party age estimation services, device-level parental controls integration, and cross-referencing against account metadata. Implement the selected approach with appropriate accuracy thresholds.",
              check: "An age verification mechanism with documented accuracy assumptions and limitations is implemented."
            },
            {
              title: "Build COPPA-compliant child experience",
              control: "The child-facing experience must restrict data collection, disable behavioral advertising, and comply with all COPPA requirements.",
              how: "Design and build the child-specific experience: remove non-essential data collection forms, disable third-party tracking, replace behavioral ads with contextual ads, limit social features, restrict content upload capabilities. Implement feature flags to toggle between child and standard experiences.",
              check: "A functional COPPA-compliant child experience with restricted data collection is implemented and reviewed."
            },
            {
              title: "Implement parental notification system",
              control: "Operators must provide clear and complete notice to parents about data practices before obtaining VPC.",
              how: "Design parental notification screens that explain: what data is collected, how it will be used, operator contact information, parental rights (review, delete, refuse further collection). Implement multi-language support. Version-control notice text to track changes.",
              check: "A parental notification system with versioned notice text and multi-language support is implemented."
            },
            {
              title: "Implement session and age-state management",
              control: "Age-gating state must persist across sessions and be tamper-resistant to prevent children from bypassing restrictions.",
              how: "Implement secure storage of age verification status (server-side preferred over client-side). Design session management that re-validates age state periodically. Implement tamper detection for client-side age state. Handle edge cases: birthday transitions, account updates, and parent-initiated changes.",
              check: "Secure session and age-state management with tamper detection is implemented and tested."
            }
          ]
        },
        {
          day: 3,
          title: "Consent Management Architecture",
          tasks: [
            {
              title: "Design consent management data model",
              control: "Consent records must capture what was consented to, when, by whom, and the verification method used, to support audit and enforcement.",
              how: "Design a consent management data model capturing: consent ID, parent identifier, child identifier, consent scope (data types, purposes), consent method, verification records, timestamps, version of privacy policy presented, and revocation status. Use immutable audit log patterns.",
              check: "A consent management data model with full audit trail fields is designed and reviewed by legal."
            },
            {
              title: "Implement consent capture and storage",
              control: "Consent capture must be technically robust, storing cryptographically signed consent records with tamper-evident mechanisms.",
              how: "Implement consent capture API that records consent events to an immutable audit log. Sign consent records with cryptographic hashes. Store consent records in a dedicated, access-controlled database. Implement consent record retrieval for parental access requests.",
              check: "A consent capture and storage system with cryptographic integrity is implemented and tested."
            },
            {
              title: "Implement consent revocation flow",
              control: "Parents have the right to revoke consent at any time, after which the operator must cease collecting data and delete existing data.",
              how: "Design a consent revocation interface accessible to parents. Implement revocation processing that triggers data collection cessation and initiates deletion workflows. Send confirmation to parents. Handle partial revocations (revoking consent for specific data types).",
              check: "A consent revocation flow with data cessation and deletion triggers is implemented and tested."
            },
            {
              title: "Build consent status dashboard",
              control: "Operators need visibility into consent status across their child user base for compliance monitoring and reporting.",
              how: "Build an internal dashboard showing: total child accounts, consent status breakdown (consented, pending, revoked), VPC method distribution, consent age distribution, and revocation rates. Implement filtering and export capabilities for audit purposes.",
              check: "A consent status dashboard with filtering and export is deployed and accessible to compliance stakeholders."
            },
            {
              title: "Implement consent versioning for policy changes",
              control: "When privacy policies change, existing consent may need to be re-obtained depending on the nature of changes.",
              how: "Implement a consent versioning system tied to privacy policy versions. Define rules for when re-consent is required (material changes) vs. when notice suffices (minor changes). Build re-consent workflows for affected parents. Track consent versions alongside policy versions.",
              check: "A consent versioning system with re-consent workflow triggers is implemented and tested."
            }
          ]
        },
        {
          day: 4,
          title: "COPPA-Compliant Privacy Policies",
          tasks: [
            {
              title: "Draft COPPA-compliant privacy policy",
              control: "The COPPA privacy policy must include specific disclosures mandated by 16 CFR 312.4(d), including data collected, purposes, third-party disclosures, and parental rights.",
              how: "Draft a privacy policy using the FTC's required elements checklist: operator name/contact, data collected from children, practices for collected data, disclosure practices, parental rights, and data security measures. Ensure plain language appropriate for the target audience.",
              check: "A COPPA-compliant privacy policy covering all required elements is drafted and reviewed by legal counsel."
            },
            {
              title: "Implement privacy policy presentation mechanism",
              control: "The privacy policy must be clearly and prominently linked from the home page and every area where children's information is collected.",
              how: "Implement prominent privacy policy links on: home page, sign-up flow, data collection points, and in-app settings. Ensure the link is easily findable and not buried in footers. Implement version-stamped policy pages to track which version a parent consented to.",
              check: "Privacy policy links are prominently displayed at all required touchpoints with version stamping."
            },
            {
              title: "Create separate child and parent privacy notices",
              control: "Operators should provide age-appropriate privacy notices — a detailed notice for parents and a simplified notice for children.",
              how: "Draft a child-friendly privacy notice in simple language explaining data collection and rights. Draft a comprehensive parent privacy notice with full legal disclosures. Review both notices for clarity and completeness. Translate into required languages.",
              check: "Separate child and parent privacy notices are drafted, reviewed, and translated."
            },
            {
              title: "Implement privacy policy change management",
              control: "Privacy policy changes that materially affect children's data practices require new VPC or at minimum clear notice to parents.",
              how: "Establish a privacy policy change management process: legal review of proposed changes, classification of materiality (material vs. minor), determination of re-consent requirements, implementation of change notification workflow, and documentation of changes.",
              check: "A privacy policy change management process with materiality classification is documented and implemented."
            },
            {
              title: "Conduct privacy policy user testing",
              control: "Privacy policies must be clear and understandable to the intended audience — testing ensures the policy communicates effectively.",
              how: "Conduct user testing with parents to verify the privacy policy is understandable. Test key comprehension areas: data collected, purpose of collection, parental rights, and how to contact the operator. Revise policy based on feedback.",
              check: "User testing of the privacy policy is conducted with documented feedback and revisions."
            }
          ]
        },
        {
          day: 5,
          title: "Data Retention and Deletion Safeguards",
          tasks: [
            {
              title: "Implement data retention enforcement",
              control: "Operators must retain children's data only as long as reasonably necessary and must enforce retention limits programmatically.",
              how: "Implement automated data retention enforcement: configure database-level TTL for children's data, implement scheduled purge jobs, create retention monitoring dashboards, and establish escalation procedures for data approaching retention limits.",
              check: "Automated data retention enforcement with TTL and scheduled purge jobs is implemented and tested."
            },
            {
              title: "Build child account deletion workflow",
              control: "Parents can request deletion of their child's personal information at any time. Operators must delete data promptly and securely.",
              how: "Build a parent-accessible account deletion workflow: identity verification, confirmation prompt, data deletion across all systems (databases, backups, logs, third-party systems), deletion confirmation to parent, and deletion audit log. Implement soft-delete with hard-delete within defined timeframes.",
              check: "A child account deletion workflow with cross-system deletion and audit logging is implemented and tested."
            },
            {
              title: "Implement data minimization controls",
              control: "Operators must not collect more data than reasonably necessary and must limit data to what is needed for the specific activity.",
              how: "Implement data minimization controls: field-level collection restrictions for child accounts, form validation to reject unnecessary fields, API-level filters to prevent over-collection, and periodic minimization audits comparing collected vs. necessary data.",
              check: "Data minimization controls including field restrictions and collection validation are implemented."
            },
            {
              title: "Handle third-party data deletion",
              control: "When data is shared with third parties and consent is revoked or account is deleted, operators must ensure third parties also delete the data.",
              how: "Implement third-party data deletion procedures: maintain a registry of third parties receiving children's data, automate deletion notification to third parties, implement contractual requirements for deletion confirmation, and audit third-party deletion compliance.",
              check: "Third-party data deletion notification and confirmation procedures are implemented and tested."
            },
            {
              title: "Document implementation completions and prepare for Week 3",
              control: "Thorough documentation ensures implementation can be verified, maintained, and audited.",
              how: "Document all Week 2 implementation details: architecture diagrams, API specifications, database schemas, configuration guides, and test results. Prepare the Week 3 verification plan based on implemented controls.",
              check: "Complete Week 2 implementation documentation is published and the Week 3 verification plan is approved."
            }
          ]
        }
      ]
    },
    {
      week: 3,
      title: "Verifier — Audit, Testing & Third-Party Compliance",
      description:
        "Verify COPPA compliance through systematic auditing of age verification, consent records, data practices, third-party vendor compliance, and special data handling procedures.",
      days: [
        {
          day: 1,
          title: "Age Verification Audit",
          tasks: [
            {
              title: "Audit age-gating bypass resistance",
              control: "Age-gating must be resistant to circumvention by children providing false age information.",
              how: "Conduct penetration testing on the age-gating mechanism: attempt to bypass with fake birthdates, test edge cases (exactly 13 on birthday), test session manipulation, test client-side tampering, and test API-level age validation. Document all bypass vectors found.",
              check: "A penetration test report for age-gating mechanisms with risk-rated findings is produced."
            },
            {
              title: "Validate age verification accuracy",
              control: "Age verification accuracy directly impacts COPPA compliance — inaccurate verification exposes children to non-compliant experiences.",
              how: "Sample test the age verification flow across multiple user paths. Verify that users under 13 are correctly routed to the COPPA experience 100% of the time. Test with edge cases: minors using parent devices, shared accounts, and age transitions.",
              check: "Age verification accuracy testing shows 100% correct routing for users under 13 in all tested scenarios."
            },
            {
              title: "Review age-gating neutral design compliance",
              control: "FTC expects age prompts to be neutral, not designed to encourage children to provide false ages to access content.",
              how: "Review the age-gating UI design against FTC guidance on neutral prompts. Verify the design does not use bright colors, cartoons, or other child-appealing elements near age input. Verify the design does not provide hints or encouragement to enter older ages.",
              check: "The age-gating UI design is reviewed and certified as neutral per FTC guidance."
            },
            {
              title: "Audit age state persistence and security",
              control: "Age verification state must be securely persisted and protected against tampering across sessions.",
              how: "Audit the technical implementation of age state storage: verify server-side storage, test client-side storage for tampering, verify state cannot be modified via browser developer tools, API manipulation, or database access without authorization. Test state consistency across devices.",
              check: "Age state persistence is audited and confirmed tamper-resistant across all storage mechanisms."
            },
            {
              title: "Test age transition handling",
              control: "When a child turns 13, operators must handle the transition appropriately — offering to migrate to the standard experience while respecting existing consent.",
              how: "Test the age transition flow: verify the system detects when a child reaches 13, verify appropriate transition notification is sent, test the opt-in flow for standard features, and verify data migration processes. Confirm no data is lost during transition.",
              check: "Age transition handling is tested and confirmed to work correctly with proper notifications and data preservation."
            }
          ]
        },
        {
          day: 2,
          title: "Consent Record Auditing",
          tasks: [
            {
              title: "Audit consent record completeness",
              control: "Every child account must have a corresponding, complete consent record from a verified parent.",
              how: "Run a compliance query matching all child accounts to their consent records. Identify any child accounts without valid consent. Verify each consent record contains all required fields: parent identity, consent scope, verification method, timestamp, and policy version.",
              check: "A consent record completeness audit shows 100% of child accounts have valid, complete consent records."
            },
            {
              title: "Verify consent record integrity",
              control: "Consent records must be immutable and tamper-evident to withstand legal scrutiny.",
              how: "Audit the cryptographic integrity of consent records: verify hash chains are intact, test unauthorized modification detection, verify access controls on consent storage, and test backup/restore integrity. Verify no unauthorized personnel can modify consent records.",
              check: "Consent record integrity verification confirms immutability and tamper detection mechanisms function correctly."
            },
            {
              title: "Audit consent method compliance",
              control: "Consent obtained through non-FTC-approved methods does not satisfy COPPA requirements.",
              how: "Review each consent method in use against FTC-approved VPC methods. Verify no non-approved methods are being used. Audit the implementation of each approved method to ensure it meets the specific requirements (e.g., credit card method uses a real charge, not a zero-dollar authorization).",
              check: "All consent methods in use are confirmed as FTC-approved with compliant implementations."
            },
            {
              title: "Test consent revocation processing",
              control: "Revoked consent must trigger immediate cessation of data collection and timely deletion of existing data.",
              how: "Initiate test consent revocations and verify: data collection stops immediately for the child account, deletion workflows are triggered, confirmation is sent to the parent, the child account is disabled or restricted, and third-party notifications are sent. Measure time from revocation to completion.",
              check: "Consent revocation processing is tested and confirmed to stop data collection and trigger deletion within defined SLAs."
            },
            {
              title: "Audit consent renewal and re-consent workflows",
              control: "When privacy policies materially change, re-consent from parents is required. Consent renewal workflows must be reliable.",
              how: "Simulate privacy policy material changes and verify the re-consent workflow: notification delivery, re-consent capture, grace period enforcement, and handling of parents who do not re-consent (data collection must cease). Test edge cases and failure scenarios.",
              check: "Re-consent workflows are tested and confirmed to correctly handle policy changes and non-responsive parents."
            }
          ]
        },
        {
          day: 3,
          title: "Data Minimization Testing",
          tasks: [
            {
              title: "Conduct field-level data minimization audit",
              control: "Each data field collected from children must be reasonably necessary for the specific activity in which the child is engaged.",
              how: "For each feature collecting children's data, list all fields and evaluate necessity. Test data collection forms to verify unnecessary fields cannot be submitted. Review API payloads for over-collection. Flag fields where necessity is questionable or not documented.",
              check: "A field-level data minimization audit confirms all collected fields are documented as reasonably necessary."
            },
            {
              title: "Test data minimization enforcement mechanisms",
              control: "Technical controls must prevent over-collection of children's data even when developers accidentally include unnecessary fields.",
              how: "Test data minimization enforcement: submit forms with extra fields and verify they are stripped or rejected, test API endpoints for field validation, review database schemas for unnecessary fields in child data tables, and test automated data pipeline filtering.",
              check: "Data minimization enforcement mechanisms correctly prevent or strip unnecessary data fields."
            },
            {
              title: "Audit analytics and tracking for children",
              control: "Analytics and tracking tools must not collect more data than necessary and must comply with COPPA's restrictions on behavioral profiling of children.",
              how: "Audit all analytics SDKs, tracking pixels, and data collection libraries in the child experience. Verify no behavioral profiling is occurring. Confirm analytics tools are configured for data minimization. Remove or disable any analytics that violate COPPA requirements.",
              check: "Analytics and tracking tools in the child experience are audited and confirmed COPPA-compliant."
            },
            {
              title: "Test behavioral advertising restrictions",
              control: "COPPA prohibits behavioral advertising targeting children based on collected personal information.",
              how: "Verify that contextual advertising is used instead of behavioral targeting for child users. Audit ad SDK configurations to ensure no behavioral profiling occurs. Test that child user profiles are not shared with ad networks for targeting. Verify ad content filtering is in place.",
              check: "Advertising in the child experience is confirmed to use only contextual targeting with no behavioral profiling."
            },
            {
              title: "Conduct data flow minimization review",
              control: "Data flows must be minimized — data should not be duplicated, transferred unnecessarily, or retained in multiple systems.",
              how: "Map all data flows for children's personal information. Identify unnecessary data transfers between systems. Verify data is not duplicated across storage systems without justification. Review and optimize data pipeline architectures to eliminate redundant collection points.",
              check: "A data flow minimization review identifies and eliminates unnecessary data transfers and duplications."
            }
          ]
        },
        {
          day: 4,
          title: "Third-Party Vendor COPPA Compliance",
          tasks: [
            {
              title: "Audit third-party vendor COPPA obligations",
              control: "Operators must ensure third-party vendors handling children's data comply with COPPA through contractual requirements and verification.",
              how: "Compile a complete inventory of third-party vendors processing children's personal information. Review each vendor's COPPA compliance posture: privacy policies, data processing agreements, and technical security measures. Identify any vendors with known COPPA violations.",
              check: "A third-party vendor COPPA compliance audit with risk ratings for each vendor is produced."
            },
            {
              title: "Review vendor data processing agreements",
              control: "Contracts with third-party vendors must include COPPA-specific provisions for data handling, retention, and deletion.",
              how: "Review all vendor contracts for COPPA-specific clauses: data minimization, purpose limitation, retention limits, deletion obligations, breach notification, audit rights, and liability allocation. Identify contracts missing required provisions and initiate amendments.",
              check: "All vendor data processing agreements include COPPA-specific provisions with gap remediation initiated."
            },
            {
              title: "Verify vendor technical compliance",
              control: "Vendors must implement technical controls to protect children's data including encryption, access controls, and secure deletion.",
              how: "Request SOC 2 reports, security questionnaires, or independent audit reports from vendors handling children's data. Verify encryption at rest and in transit, access controls limiting vendor employee access, and secure deletion procedures. Conduct on-site or virtual assessments for high-risk vendors.",
              check: "Technical compliance verification is completed for all vendors handling children's personal information."
            },
            {
              title: "Test vendor data deletion capabilities",
              control: "When operators request deletion of children's data, vendors must be able to delete data promptly and completely.",
              how: "Initiate test deletion requests with vendors and verify: timely acknowledgment, complete data deletion across all vendor systems, deletion confirmation with evidence, and handling of backup data retention. Document any vendors unable to meet deletion SLAs.",
              check: "Vendor data deletion capabilities are tested and confirmed for all vendors handling children's data."
            },
            {
              title: "Establish ongoing vendor monitoring",
              control: "Vendor COPPA compliance must be monitored continuously, not just at onboarding.",
              how: "Implement a vendor monitoring program: quarterly COPPA compliance questionnaires, annual security assessments, continuous monitoring of vendor security incidents, automated alerts for vendor compliance status changes, and escalation procedures for vendor non-compliance.",
              check: "An ongoing vendor COPPA monitoring program with defined cadence and escalation procedures is established."
            }
          ]
        },
        {
          day: 5,
          title: "Special Data Handling & Verification Wrap-Up",
          tasks: [
            {
              title: "Audit photo/video geo-location handling",
              control: "Photos and videos containing geo-location data from children require special handling under COPPA due to the sensitivity of location information.",
              how: "Audit all photo and video upload features in the child experience. Verify geo-location metadata is stripped or not collected. Test image upload APIs for EXIF data handling. Review storage configurations for geo-location data. Implement automated geo-location stripping for child uploads.",
              check: "Photo and video uploads in the child experience are confirmed to strip or not collect geo-location metadata."
            },
            {
              title: "Audit audio recording data handling",
              control: "Audio recordings of children are personal information under COPPA and require VPC and appropriate handling.",
              how: "Review all features that record audio from children (voice input, recording features). Verify VPC covers audio recording. Implement audio data retention limits. Test audio data deletion procedures. Ensure audio data is not shared with third parties without explicit consent.",
              check: "Audio recording data handling is audited and confirmed compliant with COPPA requirements."
            },
            {
              title: "Conduct FTC safe harbor audit readiness assessment",
              control: "If a member of an FTC-approved safe harbor program, operators must comply with the program's guidelines and be prepared for audits.",
              how: "Review the requirements of your safe harbor program. Map current controls against program guidelines. Identify any gaps. Prepare audit-ready documentation: evidence of compliance, test results, and corrective actions for identified gaps.",
              check: "A safe harbor audit readiness assessment with gap identification and corrective actions is completed."
            },
            {
              title: "Compile verification report and findings",
              control: "A comprehensive verification report provides evidence of compliance testing and documents findings for management and regulatory review.",
              how: "Compile all Week 3 audit and testing results into a comprehensive verification report. Include: scope of testing, methodology, findings, risk ratings, remediation recommendations, and evidence of compliance for controls that passed testing.",
              check: "A comprehensive COPPA verification report with all findings and remediation recommendations is produced."
            },
            {
              title: "Prepare remediation plan for Week 4",
              control: "Identified gaps require structured remediation with clear priorities, owners, and timelines.",
              how: "Based on verification findings, create a remediation plan with: prioritized findings, assigned owners, target completion dates, success criteria, and verification methods for each remediation item. Prepare Week 4 activities focused on remediation and multi-cloud controls.",
              check: "A detailed remediation plan with owners and timelines is approved and Week 4 activities are planned."
            }
          ]
        }
      ]
    },
    {
      week: 4,
      title: "Certified — Multi-Cloud Controls, Enforcement & Ongoing Compliance",
      description:
        "Implement multi-cloud DLP controls for children's data, study FTC enforcement cases, execute remediation, and establish ongoing COPPA compliance monitoring programs.",
      days: [
        {
          day: 1,
          title: "Multi-Cloud Children's Data Controls",
          tasks: [
            {
              title: "Implement AWS child data segregation",
              control: "Children's personal information must be logically or physically segregated in cloud environments to enforce access controls and data lifecycle policies.",
              how: "Implement AWS child data segregation: dedicated S3 buckets with bucket policies for children's data, separate RDS instances or schemas for child databases, IAM policies restricting child data access to authorized personnel, AWS Config rules monitoring child data resources, and CloudTrail logging for all child data access.",
              check: "AWS child data segregation with dedicated storage, access controls, and audit logging is implemented and tested."
            },
            {
              title: "Implement Azure child data segregation",
              control: "Azure environments must segregate children's data using resource groups, storage accounts, and access policies dedicated to child data.",
              how: "Implement Azure child data segregation: dedicated storage accounts for children's data, separate resource groups, Azure AD access policies with PIM for child data access, Azure Information Protection labels for child data, and Azure Monitor alerts for child data access anomalies.",
              check: "Azure child data segregation with dedicated storage, access policies, and monitoring is implemented and tested."
            },
            {
              title: "Implement GCP child data segregation",
              control: "GCP environments must segregate children's data using separate projects, storage buckets, and IAM configurations.",
              how: "Implement GCP child data segregation: dedicated GCP projects for child data workloads, separate Cloud Storage buckets with bucket-level IAM, BigQuery dataset-level access controls for child data analytics, VPC Service Controls preventing child data exfiltration, and Cloud Audit Logs for child data access.",
              check: "GCP child data segregation with project isolation, storage controls, and audit logging is implemented and tested."
            },
            {
              title: "Implement Alibaba Cloud child data segregation",
              control: "Alibaba Cloud environments must implement equivalent data segregation controls for children's data processed in Chinese or Asian regions.",
              how: "Implement Alibaba Cloud child data segregation: dedicated OSS buckets for children's data, RAM policies restricting child data access, separate ApsaraDB RDS instances for child databases, ActionTrail logging for child data access, and DLP rules for child data in transit and at rest.",
              check: "Alibaba Cloud child data segregation with storage, access, and audit controls is implemented and tested."
            },
            {
              title: "Implement cross-cloud DLP for children's data",
              control: "DLP policies must detect and protect children's personal information across all cloud environments consistently.",
              how: "Implement cross-cloud DLP: configure DLP scanning rules for children's data patterns (names, ages, photos, locations), deploy DLP policies across all cloud storage services, implement real-time DLP alerts for child data exfiltration, create DLP dashboards for unified visibility, and test DLP response workflows.",
              check: "Cross-cloud DLP policies for children's data are implemented with scanning, alerting, and response workflows."
            }
          ]
        },
        {
          day: 2,
          title: "FTC Enforcement Cases & Penalty Analysis",
          tasks: [
            {
              title: "Study major FTC COPPA enforcement actions",
              control: "Understanding FTC enforcement patterns helps prioritize compliance investments and avoid common violation patterns.",
              how: "Deep-dive into major FTC COPPA enforcement cases: Epic Games ($275M settlement), Google/YouTube ($170M), TikTok ($5.7M), Musical.ly, Disney, Mattel, and others. Analyze the specific violations, investigation triggers, and settlement terms for each case.",
              check: "A detailed analysis of at least 10 major FTC COPPA enforcement cases with violation patterns is produced."
            },
            {
              title: "Understand FTC penalty calculation methodology",
              control: "FTC civil penalties for COPPA violations are calculated based on violation severity, number of affected children, and operator's compliance history.",
              how: "Review FTC penalty guidelines and penalty adjustment factors. Analyze penalty amounts in recent cases to identify patterns. Calculate approximate penalty exposure for your organization based on current violation scope and user base. Document the FTC's enforcement priorities.",
              check: "A penalty exposure analysis based on FTC enforcement patterns is produced with estimated risk scenarios."
            },
            {
              title: "Analyze common COPPA violation patterns",
              control: "Common violations include inadequate age verification, insufficient VPC, non-compliant privacy policies, and data retention beyond reasonable periods.",
              how: "Categorize violations from FTC enforcement actions: failure to obtain VPC, non-compliant privacy policies, deceptive practices, inadequate data security, failure to delete data, and unauthorized disclosure to third parties. Map each violation pattern to your current controls.",
              check: "A common violation pattern analysis mapped to your current control environment is produced."
            },
            {
              title: "Assess private right of action risks",
              control: "While COPPA primarily enforces through the FTC, state attorneys general can also bring actions, and recent proposals suggest expanded private rights.",
              how: "Review state AG enforcement actions under COPPA. Monitor legislative proposals for expanded private rights of action. Assess your organization's exposure to state-level enforcement. Consider the implications of proposed COPPA amendments.",
              check: "An assessment of state AG and potential private right of action risks is documented."
            },
            {
              title: "Develop enforcement response playbook",
              control: "Having a pre-planned response to FTC inquiries or investigations reduces response time and improves outcomes.",
              how: "Develop an FTC enforcement response playbook: initial response team identification, legal hold procedures, document preservation, privilege considerations, communication protocols, and external counsel engagement criteria. Conduct tabletop exercises to validate the playbook.",
              check: "An FTC enforcement response playbook is documented and validated through a tabletop exercise."
            }
          ]
        },
        {
          day: 3,
          title: "Remediation Execution",
          tasks: [
            {
              title: "Execute high-priority remediations",
              control: "Critical compliance gaps must be remediated immediately to minimize exposure to FTC enforcement.",
              how: "Execute the highest-priority remediations identified in Week 3 verification: fix any age-gating bypass vulnerabilities, resolve consent record gaps, address data minimization failures, and remediate third-party vendor compliance issues. Track progress against the remediation plan.",
              check: "All high-priority remediations are executed with evidence of completion documented."
            },
            {
              title: "Remediate privacy policy deficiencies",
              control: "Privacy policy gaps must be addressed promptly to ensure continuous compliance with COPPA disclosure requirements.",
              how: "Update the privacy policy to address all identified deficiencies from Week 3. Implement the privacy policy change management process. Notify parents of material changes and obtain re-consent where required. Update version stamps across all presentation points.",
              check: "Privacy policy deficiencies are remediated with updated policy published and parent notifications sent."
            },
            {
              title: "Implement data retention corrective actions",
              control: "Data retained beyond reasonable periods must be deleted, and retention enforcement must be corrected.",
              how: "Execute deletion of data retained beyond defined retention periods. Fix any retention enforcement gaps: correct TTL configurations, fix purge job failures, and address backup retention issues. Verify deletion across all storage systems including backups and logs.",
              check: "Data retention corrective actions are completed with evidence of deletion and corrected enforcement."
            },
            {
              title: "Address third-party vendor compliance gaps",
              control: "Vendor compliance gaps must be remediated through contract amendments, technical controls, or vendor replacement.",
              how: "Execute vendor compliance remediations: sign amended data processing agreements, implement additional technical controls, initiate vendor replacement for non-compliant vendors, and verify remediation completion through vendor attestations or independent verification.",
              check: "Third-party vendor compliance gaps are remediated with updated agreements and verified controls."
            },
            {
              title: "Conduct remediation verification testing",
              control: "Remediated controls must be independently verified to confirm the gap is fully closed.",
              how: "Re-test all remediated controls to verify gap closure. Conduct regression testing to ensure remediations did not introduce new issues. Document verification results and update the compliance posture assessment. Close verified remediations in the tracking system.",
              check: "Remediation verification testing confirms all identified gaps are closed without regression."
            }
          ]
        },
        {
          day: 4,
          title: "Ongoing Compliance Monitoring",
          tasks: [
            {
              title: "Implement continuous COPPA monitoring",
              control: "COPPA compliance requires ongoing monitoring, not just point-in-time assessments, to detect drift and new risks.",
              how: "Implement continuous monitoring: automated age-gating integrity checks, consent record completeness monitoring, data minimization compliance dashboards, retention enforcement monitoring, and third-party vendor compliance status tracking. Configure alerts for compliance threshold breaches.",
              check: "Continuous COPPA monitoring dashboards and automated alerts are deployed and operational."
            },
            {
              title: "Establish COPPA compliance metrics and KPIs",
              control: "Measurable metrics enable objective assessment of COPPA compliance posture over time.",
              how: "Define COPPA compliance KPIs: age verification accuracy rate, VPC completion rate, consent record completeness, data retention compliance rate, third-party vendor compliance score, time-to-deletion for revocation requests, and privacy policy update timeliness. Establish measurement cadence and reporting.",
              check: "COPPA compliance metrics and KPIs are defined, measured, and reported on a regular cadence."
            },
            {
              title: "Schedule periodic COPPA compliance assessments",
              control: "Regular comprehensive assessments ensure ongoing compliance and identify emerging risks.",
              how: "Establish a periodic assessment schedule: quarterly compliance reviews, semi-annual comprehensive assessments, annual penetration testing, and annual third-party audits. Define assessment scope, methodology, and reporting requirements for each assessment type.",
              check: "A periodic COPPA compliance assessment schedule with defined scope and methodology is established."
            },
            {
              title: "Implement COPPA change management integration",
              control: "Product and engineering changes must be assessed for COPPA impact before deployment to maintain compliance.",
              how: "Integrate COPPA impact assessment into the SDLC: add COPPA review gates in the development process, create COPPA impact assessment templates for new features, train product managers on COPPA requirements, and establish COPPA review boards for high-risk changes.",
              check: "COPPA change management integration with SDLC gates and impact assessment templates is implemented."
            },
            {
              title: "Develop COPPA training program",
              control: "Ongoing COPPA awareness and training ensures all stakeholders understand their compliance obligations.",
              how: "Develop COPPA training programs: general awareness training for all employees, role-specific training for engineering and product teams, executive briefing for leadership, and annual refresher training. Track training completion and comprehension through assessments.",
              check: "COPPA training programs with role-specific content and completion tracking are developed and deployed."
            }
          ]
        },
        {
          day: 5,
          title: "DPIA Assessment & Certification Wrap-Up",
          tasks: [
            {
              title: "Assess DPIA requirement for children's data",
              control: "Data Protection Impact Assessments (DPIAs) may be required under GDPR or recommended best practice under COPPA for processing children's data at scale.",
              how: "Evaluate whether a DPIA is required based on: processing scale, sensitivity of children's data, use of new technologies, and applicable legal requirements (GDPR Art. 35). If required, initiate the DPIA process identifying risks and mitigation measures for children's data processing.",
              check: "A DPIA requirement assessment is completed with determination and, if required, a DPIA initiated."
            },
            {
              title: "Conduct DPIA for children's data processing",
              control: "A DPIA systematically identifies and mitigates risks to children's rights and freedoms arising from data processing activities.",
              how: "Conduct the DPIA for children's data processing: describe processing operations, assess necessity and proportionality, identify and assess risks to children, identify mitigation measures, and consult with stakeholders. Document the DPIA in compliance with GDPR Article 35 requirements if applicable.",
              check: "A DPIA for children's data processing is completed with identified risks and mitigation measures documented."
            },
            {
              title: "Compile final COPPA compliance certification package",
              control: "A comprehensive compliance certification package provides evidence of COPPA compliance for management, regulators, and business partners.",
              how: "Compile the final COPPA compliance package: governance documentation, applicability assessment, VPC implementation evidence, consent management records, age-gating test results, data minimization audit, third-party vendor assessments, remediation evidence, monitoring dashboards, and training records.",
              check: "A complete COPPA compliance certification package is compiled and reviewed by legal and compliance leadership."
            },
            {
              title: "Conduct COPPA compliance maturity assessment",
              control: "A maturity assessment benchmarks your COPPA compliance program against industry standards and identifies areas for continuous improvement.",
              how: "Conduct a COPPA compliance maturity assessment across dimensions: governance, policy, technical controls, monitoring, incident response, and training. Rate maturity on a scale (e.g., 1-5). Identify the target maturity level and create an improvement roadmap for the next 12 months.",
              check: "A COPPA compliance maturity assessment with scores and improvement roadmap is completed."
            },
            {
              title: "Finalize ongoing compliance program handoff",
              control: "COPPA compliance must be maintained through an ongoing program, not treated as a one-time project.",
              how: "Finalize the handoff to the ongoing compliance program: assign permanent ownership, establish recurring tasks and calendars, document operational procedures, transfer monitoring responsibilities, set up regular governance meetings, and define success criteria for the ongoing program.",
              check: "Ongoing COPPA compliance program handoff is completed with assigned ownership, procedures, and governance structure."
            }
          ]
        }
      ]
    }
  ]
};

export default function Coppa() {
  return <LearningFrameworkPage framework={FRAMEWORK} />;
}

export { FRAMEWORK };
