import LearningFrameworkPage from "../../components/LearningFrameworkPage";

const FRAMEWORK = {
  id: "ccpa-cpra",
  name: "CCPA / CPRA (California)",
  region: "United States",
  color: "golden",
  weeks: 4,
  milestones: 3,
  referenceUrl: "https://cppa.ca.gov/regulations/",
  weeksData: [
    {
      week: 1,
      title: "Foundation — CCPA/CPRA Landscape & Consumer Rights",
      description:
        "Build a solid understanding of CCPA and CPRA distinctions, scope thresholds, personal information definitions, and the full spectrum of consumer rights under California privacy law.",
      days: [
        {
          day: 1,
          title: "CCPA vs CPRA: Evolution of California Privacy Law",
          tasks: [
            {
              title: "CCPA vs CPRA Key Differences",
              control:
                "CPRA (effective Jan 1, 2023) amended and expanded CCPA significantly.",
              how: "Review the CPPA official comparison materials at cppa.ca.gov. Study how CPRA replaced the Attorney General enforcement with the California Privacy Protection Agency (CPPA). Note the expanded definitions, new rights, and stricter obligations introduced by CPRA amendments.",
              check: "Can you list at least five substantive differences between CCPA and CPRA (e.g., CPPA creation, private right of action expansion, risk assessments, correction right, sensitive data restrictions)?",
            },
            {
              title: "Business Scope & Applicability Thresholds",
              control:
                "CCPA/CPRA applies to for-profit entities doing business in California meeting any one of three thresholds.",
              how: "Identify each threshold: (1) annual gross revenue exceeding $25 million, (2) annually buying/selling/sharing personal information of 100,000 or more California consumers or households, or (3) deriving 50% or more of annual revenue from selling or sharing consumers' personal information. Verify which threshold your organization meets.",
              check: "Can you articulate which threshold(s) apply to your organization and demonstrate evidence of that determination?",
            },
            {
              title: "Personal Information (PI) and Sensitive Personal Information (SPI) Definitions",
              control:
                "CCPA defines personal information broadly; CPRA added the sensitive personal information subcategory.",
              how: "Study the statutory definition of personal information under Civ. Code §1798.140(v) — any information that identifies, relates to, describes, is reasonably capable of being associated with, or could reasonably be linked to a particular consumer or household. Review the 11 categories of SPI under Civ. Code §1798.140(ae) including SSN, financial data, precise geolocation, racial/ethnic origin, biometric data, health data, sex life/sexual orientation, and contents of communications.",
              check: "Can you classify a set of data elements into PI vs non-PI, and identify which PI elements qualify as SPI?",
            },
            {
              title: "Consumer Rights Overview",
              control:
                "CPRA grants California consumers six primary rights over their personal information.",
              how: "Map each right: (1) Right to Know — what PI is collected and how it is used, (2) Right to Delete — request deletion of PI, (3) Right to Correct — request correction of inaccurate PI, (4) Right to Opt-Out of Sale/Sharing — stop sale or sharing of PI, (5) Right to Limit Use of SPI — restrict use and disclosure of SPI, and (6) Right to Non-Discrimination — no retaliation for exercising rights. Document the request timelines (45 days, extendable by 45 days).",
              check: "Can you describe each consumer right, its scope, the applicable response timeline, and any exceptions that apply?",
            },
            {
              title: "CPPA Enforcement & Regulatory Landscape",
              control:
                "The CPPA is the dedicated enforcement body for CCPA/CPRA with rulemaking and audit authority.",
              how: "Study the CPPA's organizational structure, its rulemaking process (final regulations adopted July 2023, additional regulations ongoing), enforcement priorities, and published guidance. Note the administrative fines structure: up to $2,500 per unintentional violation and $7,500 per intentional violation. Review the CPPA's audit authority and technology assessment provisions.",
              check: "Can you explain the CPPA's enforcement mechanisms, penalty structure, and how its rulemaking process differs from the prior AG enforcement model?",
            },
          ],
        },
        {
          day: 2,
          title: "Consumer Rights Requests (CRR) Deep Dive",
          tasks: [
            {
              title: "Right to Know — Categories and Specific Pieces",
              control:
                "Consumers may request disclosure of categories of PI collected and specific pieces of PI held.",
              how: "Document the two sub-types of Right to Know requests: (1) categories of PI collected, sources, business purposes, and third parties with whom PI is shared, and (2) specific pieces of PI collected about the consumer. Map your data collection to these disclosure requirements. Establish verification procedures for each request type (generally, reasonable security requirement for category requests; higher verification for specific PI).",
              check: "Can you produce a complete categories-of-PI disclosure and demonstrate the verification process for a specific-PI request?",
            },
            {
              title: "Right to Delete — Scope and Exceptions",
              control:
                "Deletion requests must be honored unless a statutory exception applies.",
              how: "Identify all deletion exceptions under Civ. Code §1798.105(d): completing the transaction, security purposes, debugging, exercising free speech, public interest research, internal uses reasonably aligned with expectations, and internal uses compatible with the context of collection. Document how your organization applies each exception and notifies the consumer when an exception is invoked.",
              check: "Can you demonstrate your deletion workflow including exception evaluation, downstream service provider notification, and consumer communication?",
            },
            {
              title: "Right to Correct — Process and Accuracy",
              control:
                "CPRA introduces the right to request correction of inaccurate personal information.",
              how: "Develop a correction request workflow. Determine how corrections propagate to service providers and contractors who received the inaccurate data. Establish whether your organization uses a post-correction attestation process. Note that the organization may consider the totality of circumstances when determining whether an inaccuracy exists.",
              check: "Can you walk through a correction request from receipt to completion, including downstream propagation and consumer notification?",
            },
            {
              title: "Right to Opt-Out of Sale/Sharing",
              control:
                "Consumers have the right to direct a business to stop selling or sharing their PI.",
              how: "Understand the definitions of 'sale' (exchange of PI for monetary or other valuable consideration) and 'sharing' (cross-context behavioral advertising). Configure your opt-out mechanisms including the required 'Do Not Sell or Share My Personal Information' link, Global Privacy Control (GPC) signal recognition, and opt-out preference signal handling. Document how opt-out applies to current and future PI.",
              check: "Can you demonstrate that your opt-out mechanism satisfies both the link requirement and GPC signal recognition obligations?",
            },
            {
              title: "Right to Limit Use of SPI and Non-Discrimination",
              control:
                "Consumers may limit the use and disclosure of their SPI to purposes essential to the service.",
              how: "Map your SPI processing activities and identify which uses are 'essential' to providing the requested service (e.g., processing payment, providing shipping). Develop the mechanism to honor limit-use requests. Ensure non-discrimination: consumers who exercise rights cannot be denied goods/services, charged different prices, or given different quality of service (except as permitted by law for financial incentives).",
              check: "Can you identify which SPI processing activities are 'essential' and demonstrate the limit-use mechanism and its impact on service delivery?",
            },
          ],
        },
        {
          day: 3,
          title: "Privacy Notices, Contracts & Data Inventory",
          tasks: [
            {
              title: "Privacy Notice Requirements",
              control:
                "CCPA/CPRA requires specific disclosures in a business's privacy notice at or before the point of collection.",
              how: "Review the mandatory privacy notice elements: categories of PI collected, purposes for collection, retention periods (CPRA addition), categories of sources, third parties to whom PI is disclosed, consumer rights and how to exercise them, financial incentive program details, and contact information. Ensure the notice is accessible and written in plain language.",
              check: "Does your privacy notice contain every required element under CCPA/CPRA and is it presented in a clear, accessible format?",
            },
            {
              title: "Notice at Collection (Point-of-Collection Notice)",
              control:
                "A separate notice must be provided at or before the point of PI collection.",
              how: "Verify that each collection point (website forms, mobile apps, in-store, phone calls, employment applications) includes a notice at collection specifying: the categories of PI to be collected, the purposes of collection, whether PI is sold/shared, the retention period, and a link to the full privacy notice. CPRA requires the retention period to be stated at the point of collection.",
              check: "Can you verify that every PI collection point has an accurate, up-to-date notice at collection with the required elements?",
            },
            {
              title: "Service Provider vs Contractor Agreements",
              control:
                "CPRA distinguishes service providers and contractors, each with specific contractual requirements.",
              how: "Understand the definitions: a service provider processes PI on behalf of the business; a contractor may use PI for its own purposes as specified in the agreement. Both require written contracts with specific CCPA/CPRA provisions: permitted uses, assistance with consumer rights, data security obligations, sub-contracting restrictions, and audit rights. Determine which third parties are service providers vs contractors and ensure appropriate agreements are in place.",
              check: "Can you classify your third-party relationships as service provider or contractor and demonstrate that the corresponding contracts contain all required CCPA/CPRA provisions?",
            },
            {
              title: "Records of Processing Activities (ROPA) — CCPA/CPRA",
              control:
                "CPRA requires businesses to maintain Records of Processing Activities.",
              how: "Document what must be recorded: categories of PI collected and disclosed, purposes of processing, categories of consumers, categories of third parties, retention periods, and (for businesses with $25M+ revenue) data practices of the previous 12 months. Map your processing activities from data intake through storage, sharing, and deletion. Integrate with your existing data inventory.",
              check: "Can you produce a ROPA document that captures all required categories and reflects your actual data processing practices?",
            },
            {
              title: "Data Retention and Minimization",
              control:
                "CPRA mandates retention periods and data minimization obligations.",
              how: "Establish retention schedules for each category of PI based on: the purpose for which it was collected, applicable legal requirements, industry standards, and business necessity. Implement automated or semi-automated mechanisms to enforce retention periods and delete PI upon expiration. Ensure that PI collection is reasonably necessary and proportionate to the disclosed purposes.",
              check: "Do you have documented retention schedules for every PI category and a mechanism to enforce deletion when retention periods expire?",
            },
          ],
        },
        {
          day: 4,
          title: "Sensitive Data, Minors, & Sale/Sharing Obligations",
          tasks: [
            {
              title: "Sensitive Personal Information (SPI) Handling Requirements",
              control:
                "CPRA imposes specific obligations for processing SPI beyond the standard PI requirements.",
              how: "Catalog all SPI types collected by your organization: SSNs, driver's license numbers, financial account information, precise geolocation, racial/ethnic origin, biometric data, health data, sex life/sexual orientation, and email/communications content. Document the lawful basis for each SPI processing activity, ensure SPI is not used for purposes other than those permitted without opt-in consent, and implement enhanced security measures.",
              check: "Can you produce a complete SPI inventory with processing justifications, security measures, and evidence that SPI is not used beyond permitted purposes?",
            },
            {
              title: "Minors — Opt-In Consent Requirements",
              control:
                "CCPA/CPRA requires opt-in consent for consumers aged 16-17 and parental consent for children under 16.",
              how: "Review the age-based consent tiers: (1) children under 13 — affirmative opt-in from parent/guardian required before sale/sharing, (2) consumers aged 13-15 — affirmative opt-in from the consumer required before sale/sharing. Implement age verification mechanisms where sale/sharing occurs. Ensure consent mechanisms are clear, conspicuous, and not bundled with other terms. Document consent collection and management processes.",
              check: "Can you demonstrate that your organization has appropriate age-gating and consent mechanisms for all sale/sharing of PI of minors?",
            },
            {
              title: "Financial Incentive Programs",
              control:
                "CCPA/CPRA requires specific disclosures and opt-in consent for financial incentive programs.",
              how: "Identify all programs that offer different prices, services, or discounts in exchange for PI (loyalty programs, discounts, premium access). Ensure each program: (1) is described in the privacy notice, (2) explains the material terms, (3) uses clear and conspicuous notice before opt-in, (4) obtains affirmative opt-in consent, and (5) allows withdrawal at any time. Document the financial incentive value and demonstrate it is reasonably related to the PI value provided.",
              check: "Can you identify all financial incentive programs and demonstrate they meet CCPA/CPRA's notice, consent, and value-relation requirements?",
            },
            {
              title: "Do Not Sell or Share — Global Privacy Control (GPC)",
              control:
                "CPRA requires businesses to honor opt-out preference signals including GPC.",
              how: "Implement technical mechanisms to detect and honor GPC signals and similar browser-level privacy preferences. Document how your systems treat GPC as a valid opt-out request without requiring additional consumer action. Ensure GPC recognition works across all platforms (web, mobile, third-party integrations). Test GPC signal propagation through your advertising and analytics technology stack.",
              check: "Can you demonstrate that GPC signals are recognized, honored, and propagated correctly across all your digital properties and third-party integrations?",
            },
            {
              title: "Cross-Border and Interstate PI Transfers",
              control:
                "CCPA/CPRA applies to PI of California consumers regardless of where the data is processed.",
              how: "Map data flows involving California consumers' PI that cross state or national borders. Identify transfers to service providers, contractors, and third parties in other jurisdictions. Ensure contractual protections and technical measures (encryption, access controls) are in place for cross-border transfers. Consider implications when combined with other privacy frameworks (GDPR adequacy, data localization requirements).",
              check: "Can you map all cross-border data transfers involving California consumers' PI and demonstrate appropriate contractual and technical safeguards?",
            },
          ],
        },
        {
          day: 5,
          title: "Assessment & Milestone Preparation",
          tasks: [
            {
              title: "Comprehensive Rights Workflow Review",
              control:
                "All six consumer rights must have documented, tested workflows with proper verification and response procedures.",
              how: "Walk through each of the six rights (know, delete, correct, opt-out, limit SPI use, non-discrimination) end-to-end. Verify that the request intake channel(s) (web form, email, phone, toll-free number) are operational. Confirm the 45-day response timeline and 45-day extension process are documented. Validate verification procedures for each right.",
              check: "Can you execute a complete consumer rights request for each right type and demonstrate compliance with timelines, verification, and notification requirements?",
            },
            {
              title: "Data Inventory Baselining",
              control:
                "A complete data inventory is the foundation of CCPA/CPRA compliance.",
              how: "Conduct a baseline data inventory capturing: all PI categories collected, sources, purposes, third-party recipients, retention periods, and security measures. Cross-reference against your privacy notice and ROPA. Identify any gaps between documented practices and actual data flows.",
              check: "Does your data inventory accurately reflect all data collection, processing, sharing, and retention practices as actually conducted?",
            },
            {
              title: "Privacy Notice Completeness Audit",
              control:
                "Privacy notices must contain every element required by CCPA/CPRA regulations.",
              how: "Perform a line-by-line review of your privacy notice against the CCPA/CPRA regulatory requirements. Verify each mandatory element: PI categories, purposes, retention periods, sources, recipients, consumer rights, financial incentives, and contact information. Check for accuracy of all examples and the presence of a 'last updated' date.",
              check: "Does your privacy notice pass a comprehensive element-by-element compliance review against CCPA/CPRA requirements?",
            },
            {
              title: "Third-Party Contract Audit",
              control:
                "All third-party relationships involving PI must be governed by compliant agreements.",
              how: "Audit all contracts involving California consumers' PI. Categorize each as service provider or contractor. Verify that each contract contains the required CCPA/CPRA provisions: permitted purposes, consumer rights assistance, data security, sub-processing restrictions, and audit rights. Flag any contracts that lack required provisions.",
              check: "Can you demonstrate that 100% of your third-party PI-handling contracts contain all required CCPA/CPRA provisions?",
            },
            {
              title: "Week 1 Self-Assessment",
              control:
                "Validate foundational understanding before progressing to implementation.",
              how: "Test your knowledge of CCPA/CPRA scope thresholds, PI/SI definitions, all six consumer rights, privacy notice requirements, and CPPA enforcement. Identify knowledge gaps and review reference materials. Document any organizational gaps in compliance.",
              check: "Can you pass a comprehensive self-assessment covering all Week 1 topics without referring to reference materials?",
            },
          ],
        },
      ],
    },
    {
      week: 2,
      title: "Implementer — Operationalizing CCPA/CPRA Compliance",
      description:
        "Build the operational processes, technical mechanisms, and organizational workflows needed to implement CCPA/CPRA compliance in practice.",
      days: [
        {
          day: 1,
          title: "Consumer Rights Request (CRR) System Implementation",
          tasks: [
            {
              title: "CRR Intake Channel Design",
              control:
                "CCPA/CPRA requires at least two methods for submitting consumer requests, including a toll-free telephone number.",
              how: "Design and implement multiple CRR intake channels: (1) a dedicated web form with required fields (name, email, request type, California residency attestation), (2) a toll-free telephone number staffed during business hours, and optionally (3) email intake. Ensure each channel captures sufficient information to process the request and verify identity. Implement request tracking with unique case IDs.",
              check: "Can a consumer submit a rights request through at least two distinct channels, and does your system capture all necessary information for processing and verification?",
            },
            {
              title: "CRR Identity Verification Procedures",
              control:
                "Businesses must verify the identity of the consumer making the request before processing it.",
              how: "Implement a tiered verification approach: (1) for requests to know categories — reasonably verify using two factors, (2) for requests to know specific PI — reasonably verify using at least three factors, (3) for deletion and correction requests — reasonably verify using two factors matching the PI on record. Select verification factors: matching PI already collected, confirming identity through a pre-established authenticated account, or using signed declarations for high-risk requests.",
              check: "Can you demonstrate the verification procedures for each request type and provide evidence that they meet the 'reasonable security' standard?",
            },
            {
              title: "CRR Response Workflow and Timelines",
              control:
                "CCPA/CPRA requires a response within 45 days, with one permitted 45-day extension.",
              how: "Build an automated workflow: (1) request received → acknowledge within 10 business days, (2) verification process initiated, (3) once verified, process the request within 45 days, (4) if unable to respond within 45 days, send a written extension notice explaining the reason and expected completion date, (5) complete processing and send final response. Implement SLA tracking, escalation for approaching deadlines, and response templates.",
              check: "Can you trace a test request through your entire workflow and confirm it meets the 45-day response requirement with proper acknowledgments?",
            },
            {
              title: "Authorized Agent and Household Request Handling",
              control:
                "CCPA/CPRA permits authorized agents to submit requests on behalf of consumers, and allows household-level requests.",
              how: "Implement processes for: (1) authorized agent requests — require either a signed written authorization from the consumer or evidence of power of attorney, verify the agent's authority before processing, (2) household requests — determine the scope of household-level requests, handle situations where multiple household members may have conflicting preferences. Document the additional verification steps for agent and household requests.",
              check: "Can you process both authorized agent and household requests with appropriate verification and authorization checks?",
            },
            {
              title: "Downstream PI Notification and Propagation",
              control:
                "Upon receiving a deletion or correction request, the business must notify service providers and contractors to honor the request.",
              how: "Build a downstream notification system: (1) identify all service providers and contractors that received the consumer's PI, (2) send deletion/correction notices to each downstream entity, (3) track their compliance with the notice, (4) confirm completion. Implement a mapping of PI flows to identify which downstream entities need notification for each request type. Set up automated notifications where possible.",
              check: "Can you demonstrate that a deletion or correction request is properly propagated to all downstream service providers and contractors, with confirmation of completion?",
            },
          ],
        },
        {
          day: 2,
          title: "Opt-Out Mechanisms and GPC Integration",
          tasks: [
            {
              title: "'Do Not Sell or Share My Personal Information' Link Implementation",
              control:
                "CCPA/CPRA requires a conspicuous link titled 'Do Not Sell or Share My Personal Information' on the business's homepage.",
              how: "Implement the required link on your website's homepage. Ensure the link: (1) is easily discoverable, (2) is not obscured or buried in footer text, (3) uses the exact statutory title or substantially similar wording, (4) links to a clear opt-out mechanism. Also consider implementing the 'Limit the Use of My Sensitive Personal Information' link if you collect SPI. Document the implementation and test across devices.",
              check: "Is the 'Do Not Sell or Share My Personal Information' link conspicuously displayed on your homepage and does it lead to a functional opt-out mechanism?",
            },
            {
              title: "Global Privacy Control (GPC) Signal Technical Implementation",
              control:
                "CPRA regulations require businesses to treat GPC as a valid opt-out request.",
              how: "Implement GPC signal detection in your web server, tag management system, and JavaScript layer. Ensure that when the Sec-GPC header or JavaScript signal is detected: (1) PI is not sold or shared, (2) the user is treated as having opted out, (3) the opt-out status persists for the session. Test across major browsers (Brave, Firefox, DuckDuckGo) that support GPC natively.",
              check: "Can you demonstrate GPC detection and proper opt-out behavior across your web properties, tag management, and analytics stack?",
            },
            {
              title: "Opt-Out Preference Signal (OPS) and Additional Opt-Out Mechanisms",
              control:
                "CPRA regulations extend opt-out obligations beyond GPC to other recognized browser-level signals.",
              how: "Implement recognition of additional opt-out preference signals beyond GPC. Ensure your consent management platform (CMP) or tag management system can receive and honor these signals. Configure your advertising technology stack (DSPs, SSPs, ad networks) to respect opt-out signals. Document signal handling across your marketing and analytics vendor ecosystem.",
              check: "Can you demonstrate that opt-out preference signals are properly received, honored, and propagated across your advertising and analytics technology stack?",
            },
            {
              title: "Opt-Out Workflow for Service Providers and Contractors",
              control:
                "When a consumer opts out, the business must instruct all service providers and contractors to stop selling/sharing PI.",
              how: "Build an automated opt-out propagation system: (1) consumer opts out, (2) system identifies all service providers/contractors that receive PI from this consumer, (3) notifications are sent to each downstream entity instructing them to stop selling/sharing, (4) confirmation is tracked. Implement a 'suppression list' or 'opt-out registry' shared with downstream partners. Test propagation across all downstream systems.",
              check: "Can you demonstrate that a consumer's opt-out request propagates to all downstream service providers and contractors within a reasonable timeframe?",
            },
            {
              title: "Opt-Out Reporting and Audit Trail",
              control:
                "Organizations must maintain records of opt-out requests to demonstrate compliance.",
              how: "Implement logging and reporting for all opt-out requests: (1) date/time received, (2) verification method, (3) downstream notifications sent, (4) downstream confirmations received, (5) any exceptions or issues. Create a dashboard showing opt-out request volume, processing status, and compliance metrics. Retain records for the applicable statute of limitations period.",
              check: "Can you produce a complete audit trail for any opt-out request showing all processing steps and downstream propagation?",
            },
          ],
        },
        {
          day: 3,
          title: "Sensitive Data Handling & Privacy Notice Engineering",
          tasks: [
            {
              title: "SPI Processing Controls and Limitations",
              control:
                "CPRA restricts the use of SPI to purposes necessary to perform the requested service.",
              how: "Implement technical and organizational controls to ensure SPI is only used for purposes necessary to perform the service requested by the consumer. Tag and classify all SPI in your data stores. Configure access controls so SPI is only accessible to systems and personnel with a legitimate need. Implement logging for all SPI access and use. Build mechanisms for consumers to limit SPI use.",
              check: "Can you demonstrate that SPI is technically segregated, access-controlled, and only used for purposes necessary to the service requested?",
            },
            {
              title: "SPI Consent and Opt-In Mechanisms",
              control:
                "Use of SPI beyond service necessity requires opt-in consent from the consumer.",
              how: "Build a consent mechanism for SPI uses beyond the essential service: (1) present a clear notice explaining the additional SPI use, (2) obtain affirmative opt-in consent (not bundled with other terms), (3) record consent with timestamp and scope, (4) allow withdrawal of consent at any time. Ensure consent is presented after the consumer initiates the service request, not before.",
              check: "Can you demonstrate the SPI opt-in consent flow, including notice, consent capture, recording, and withdrawal mechanisms?",
            },
            {
              title: "Privacy Notice Technical Implementation",
              control:
                "Privacy notices must be dynamically updated as data practices change.",
              how: "Implement a versioned privacy notice system with: (1) automated alerts when data practices change, (2) a review and approval workflow before publishing updates, (3) a mechanism to display the notice at every collection point, (4) archival of previous versions. Ensure the notice includes CPRA-required elements: retention periods, SPI disclosures, and opt-out rights. Test rendering across devices and assistive technologies.",
              check: "Can you demonstrate that your privacy notice system handles updates, versioning, multi-device rendering, and accessibility requirements?",
            },
            {
              title: "Contract Management for CCPA/CPRA Compliance",
              control:
                "All service provider and contractor agreements must contain CCPA/CPRA-required provisions.",
              how: "Build or configure a contract management system that: (1) tracks all agreements involving California consumers' PI, (2) verifies each agreement contains required CCPA/CPRA provisions, (3) flags contracts missing required clauses, (4) manages renewal and amendment workflows, (5) provides audit-ready reporting. Create templates for service provider and contractor agreements with all required provisions pre-populated.",
              check: "Can you produce a report showing all third-party PI-handling contracts and their CCPA/CPRA compliance status?",
            },
            {
              title: "Sensitive Data Discovery and Classification",
              control:
                "You must know where SPI resides to properly protect and limit its use.",
              how: "Conduct a sensitive data discovery scan across all data stores: databases, data lakes, cloud storage, file shares, email systems, and third-party platforms. Use automated classification tools to identify SPI. Map SPI locations to data owners and processing purposes. Implement data labeling and tagging for ongoing classification. Build a SPI register documenting each location, type, and access controls.",
              check: "Can you produce a comprehensive SPI inventory showing all locations, types, and the access controls in place for each?",
            },
          ],
        },
        {
          day: 4,
          title: "ROPA, Data Mapping, and Technical Controls",
          tasks: [
            {
              title: "ROPA Implementation and Maintenance",
              control:
                "CPRA requires documented Records of Processing Activities for all California consumer PI.",
              how: "Implement a ROPA that captures: (1) categories of PI collected and disclosed, (2) purposes for each processing activity, (3) categories of consumers, (4) categories of third-party recipients, (5) retention periods, (6) technical and organizational security measures. Automate ROPA updates when processing activities change. Integrate with your data inventory and change management processes.",
              check: "Can you produce a ROPA that is current, comprehensive, and accurately reflects your actual data processing activities?",
            },
            {
              title: "Data Mapping — End-to-End PI Flow Documentation",
              control:
                "Accurate data mapping is essential for fulfilling consumer rights and demonstrating compliance.",
              how: "Create data maps for each PI category showing: (1) point of collection, (2) storage location(s), (3) internal systems that process the data, (4) service providers and contractors who receive the data, (5) cross-border transfers, (6) retention and deletion pathways. Use automated data flow discovery tools where available. Validate data maps against actual system configurations.",
              check: "Can you produce end-to-end data maps for your major PI categories and demonstrate they accurately reflect actual data flows?",
            },
            {
              title: "Automated Deletion and Retention Enforcement",
              control:
                "Retention periods must be enforced, and PI must be deleted when no longer necessary.",
              how: "Implement automated retention enforcement: (1) configure retention schedules in databases and storage systems, (2) build automated deletion jobs for PI that exceeds retention periods, (3) implement deletion verification (confirm data is actually removed), (4) handle cascading deletes across related data stores. Ensure deletion meets the 'deletion' standard: removing PI so it cannot be reconstructed.",
              check: "Can you demonstrate automated deletion of PI upon retention period expiration and verify that deletion is complete and irreversible?",
            },
            {
              title: "Access Control and Encryption for PI/SPI",
              control:
                "CCPA/CPRA requires reasonable security measures for PI; CPRA adds specific obligations for SPI.",
              how: "Implement defense-in-depth security: (1) role-based access control (RBAC) for all PI/SPI systems, (2) encryption at rest and in transit (AES-256 and TLS 1.2+), (3) key management for encryption keys, (4) network segmentation for SPI processing systems, (5) audit logging for all access to PI/SPI, (6) intrusion detection for sensitive data environments. Align with NIST Cybersecurity Framework and CPRA security requirements.",
              check: "Can you demonstrate that PI/SPI is protected by appropriate access controls, encryption, and monitoring, and that these controls are actively enforced?",
            },
            {
              title: "Tag Management and Third-Party Script Audit",
              control:
                "Third-party scripts on your digital properties may be collecting or sharing PI.",
              how: "Audit all third-party tags and scripts running on your web and mobile properties. Use tag auditing tools to identify unauthorized or unexpected data collection. Configure your tag management system to honor opt-out signals and consent preferences. Remove or restrict tags that collect PI without proper disclosure or consent. Document all approved tags and their data handling practices.",
              check: "Can you produce a complete inventory of third-party tags on your digital properties and demonstrate that each is authorized and compliant with your privacy practices?",
            },
          ],
        },
        {
          day: 5,
          title: "Testing, Validation & Milestone 2 Preparation",
          tasks: [
            {
              title: "End-to-End CRR Testing",
              control:
                "Consumer rights workflows must be tested to confirm they function as designed.",
              how: "Execute end-to-end tests for each consumer right: submit a test request through each intake channel, verify acknowledgment, complete identity verification, process the request, send the response, propagate to downstream entities, and confirm completion. Document test results, issues found, and remediations applied. Test edge cases: incomplete requests, multiple rights in one request, and conflicting requests.",
              check: "Can you produce test results demonstrating that all six consumer rights workflows function correctly end-to-end?",
            },
            {
              title: "Opt-Out Mechanism Validation",
              control:
                "Opt-out mechanisms must be tested across all channels and configurations.",
              how: "Test the complete opt-out stack: (1) 'Do Not Sell or Share' link functionality, (2) GPC signal recognition and processing, (3) opt-out propagation to all downstream entities, (4) suppression list management, (5) opt-out reversal (if consumer opts back in). Test across browsers, devices, and network conditions. Verify opt-out status persists across sessions.",
              check: "Can you demonstrate that opt-out mechanisms work correctly across all tested configurations and that opt-out status is properly maintained?",
            },
            {
              title: "Privacy Notice and ROPA Accuracy Verification",
              control:
                "Privacy notices and ROPA must accurately reflect actual data practices.",
              how: "Perform a gap analysis between your privacy notice, ROPA, and actual data practices. Use data discovery tools to compare documented data flows with actual data stores. Verify retention periods stated in the privacy notice match actual retention enforcement. Confirm all third-party recipients listed in the privacy notice are current and accurate.",
              check: "Does a comparison of your privacy notice, ROPA, and actual data practices reveal zero material discrepancies?",
            },
            {
              title: "Security Controls Testing for PI/SPI",
              control:
                "Security controls must be validated through testing, not just documented.",
              how: "Test all PI/SPI security controls: (1) access control testing — verify users can only access PI/SPI authorized for their role, (2) encryption verification — confirm data at rest and in transit is encrypted, (3) logging verification — confirm all PI/SPI access is logged, (4) network segmentation testing — verify SPI processing environments are isolated, (5) incident response testing — simulate a data breach and test notification procedures.",
              check: "Can you produce test results for each security control category demonstrating that controls function as designed?",
            },
            {
              title: "Week 2 Self-Assessment",
              control:
                "Validate implementation readiness before progressing to verification.",
              how: "Review all implemented processes and controls. Test your ability to explain and demonstrate each component: CRR workflows, opt-out mechanisms, SPI handling, privacy notices, ROPA, data mapping, and security controls. Identify any remaining implementation gaps.",
              check: "Can you demonstrate all implemented controls and workflows from Week 2 without referring to reference materials?",
            },
          ],
        },
      ],
    },
    {
      week: 3,
      title: "Verifier — Testing & Validation of CCPA/CPRA Controls",
      description:
        "Verify the effectiveness of implemented controls through testing, auditing, and assessment methodologies specific to CCPA/CPRA compliance.",
      days: [
        {
          day: 1,
          title: "CRR Verification and Quality Assurance",
          tasks: [
            {
              title: "Consumer Rights Request Verification Testing",
              control:
                "Each CRR type must be tested for completeness, accuracy, and regulatory compliance.",
              how: "Design a test plan covering: (1) request intake — verify all required channels work, capture correct data, and generate tracking IDs, (2) verification — test each verification method against the appropriate PI tier, (3) processing — confirm requests are routed correctly, (4) response — validate response content includes all required elements, (5) timelines — verify responses are sent within 45 days. Run tests with realistic scenarios including edge cases.",
              check: "Can you produce test results for each CRR type demonstrating compliance with all CCPA/CPRA requirements?",
            },
            {
              title: "Response Content Accuracy Review",
              control:
                "CRR responses must contain specific information as required by CCPA/CPRA.",
              how: "Review sample responses for each right type: (1) Right to Know — verify categories disclosure matches actual data practices, (2) Right to Delete — confirm deletion scope is correct and exceptions are properly invoked, (3) Right to Correct — verify correction is applied and propagated, (4) Opt-out — confirm opt-out status is set and downstream propagated. Compare response content against the data inventory for accuracy.",
              check: "Can you verify that CRR responses accurately reflect the organization's actual data practices and comply with content requirements?",
            },
            {
              title: "Downstream Deletion and Correction Verification",
              control:
                "Service providers and contractors must honor deletion and correction notices.",
              how: "For a sample of deletion and correction requests: (1) identify all downstream entities notified, (2) confirm each entity received the notification, (3) verify each entity honored the request, (4) confirm the business received confirmation of completion. Use contractual audit rights where necessary. Document any failures and remediation steps.",
              check: "Can you produce evidence that downstream deletion and correction requests were properly communicated and honored?",
            },
            {
              title: "CRR Process Audit Trail Review",
              control:
                "A complete audit trail must exist for every consumer rights request.",
              how: "Select a sample of CRR cases and review the complete audit trail: (1) request receipt timestamp, (2) acknowledgment sent, (3) verification method and result, (4) processing steps and timestamps, (5) response sent, (6) downstream notifications and confirmations, (7) any extensions invoked, (8) final resolution. Verify the audit trail is complete and consistent with regulatory requirements.",
              check: "Can you produce a complete audit trail for sampled CRR cases that demonstrates compliance with all CCPA/CPRA process requirements?",
            },
            {
              title: "Authorized Agent and Household Request Verification",
              control:
                "Agent and household requests require additional verification and authorization checks.",
              how: "Test authorized agent request workflows: verify that signed authorization or power of attorney is required and properly validated. Test household request workflows: verify household-level scope is appropriately determined and applied. Review a sample of agent and household requests for compliance with additional verification requirements.",
              check: "Can you demonstrate that agent and household requests undergo appropriate additional verification and authorization checks?",
            },
          ],
        },
        {
          day: 2,
          title: "Data Inventory and ROPA Accuracy Assessment",
          tasks: [
            {
              title: "Data Inventory Accuracy Audit",
              control:
                "The data inventory must accurately reflect all PI collection, processing, sharing, and retention practices.",
              how: "Conduct an independent audit of the data inventory: (1) compare inventory entries against actual data collection points, (2) verify storage locations match the inventory, (3) confirm third-party recipients are complete and current, (4) validate retention periods against actual enforcement, (5) cross-reference processing purposes with actual use. Use data discovery tools to identify inventory gaps.",
              check: "Can you produce an audit report showing the data inventory has been independently verified against actual data practices with documented findings?",
            },
            {
              title: "ROPA Completeness and Currency Review",
              control:
                "ROPA must be complete, current, and accurately reflect all processing activities.",
              how: "Perform a ROPA completeness review: (1) verify all processing activities are documented, (2) confirm categories of PI are accurately classified, (3) validate processing purposes are documented for each activity, (4) verify third-party recipients are listed for each sharing activity, (5) confirm retention periods are specified, (6) verify security measures are documented. Compare ROPA against recent changes in data practices.",
              check: "Can you produce a ROPA completeness report demonstrating all required elements are present and current?",
            },
            {
              title: "Data Flow Mapping Verification",
              control:
                "Data maps must accurately represent actual PI flows through the organization.",
              how: "Verify data flow maps by: (1) tracing PI from collection through processing, storage, sharing, and deletion, (2) confirming all transfer points are documented, (3) validating cross-border transfer pathways, (4) verifying automated processing pipelines are accurately mapped, (5) confirming data aggregation and de-identification processes are documented. Use network monitoring tools to validate documented flows.",
              check: "Can you produce evidence that data flow maps have been verified against actual network traffic and system configurations?",
            },
            {
              title: "Data Minimization and Purpose Limitation Assessment",
              control:
                "PI collection must be reasonably necessary and proportionate to disclosed purposes.",
              how: "Assess data minimization compliance: (1) review each PI collection point to confirm only necessary data is collected, (2) evaluate whether collected PI is used only for disclosed purposes, (3) identify any excessive collection or use beyond stated purposes, (4) verify that PI not necessary for the disclosed purpose is not collected. Document findings and recommend minimization actions.",
              check: "Can you demonstrate that PI collection at each point is reasonably necessary for a disclosed purpose and that data is not used beyond those purposes?",
            },
            {
              title: "Retention Schedule Compliance Testing",
              control:
                "Retention periods must be enforced and PI deleted upon expiration.",
              how: "Test retention enforcement: (1) select PI categories nearing retention expiration, (2) verify deletion jobs are scheduled and will execute, (3) confirm that PI past its retention period has been or will be deleted, (4) verify deletion is complete (data not reconstructable), (5) test that retention enforcement handles edge cases (PI in backups, archived systems, third-party storage).",
              check: "Can you demonstrate that retention schedules are actively enforced and that PI is deleted upon retention period expiration?",
            },
          ],
        },
        {
          day: 3,
          title: "Opt-Out Compliance Testing",
          tasks: [
            {
              title: "Full Opt-Out Stack Testing",
              control:
                "All opt-out mechanisms must be tested for functionality and completeness.",
              how: "Execute a comprehensive opt-out test suite: (1) 'Do Not Sell or Share' link — verify presence, visibility, and link destination, (2) opt-out form — test submission and acknowledgment, (3) GPC signal — test detection and processing across browsers, (4) opt-out propagation — verify downstream entities are notified, (5) suppression list — verify consumer is added and not re-contacted, (6) reversal — test opt-in process for consumers who want to opt back in.",
              check: "Can you produce test results demonstrating that all opt-out mechanisms function correctly and completely?",
            },
            {
              title: "GPC Signal Compliance Verification",
              control:
                "GPC signals must be detected and honored across all digital properties.",
              how: "Conduct GPC compliance testing: (1) send GPC signals from supported browsers and verify detection, (2) confirm that PI is not sold/shared when GPC is active, (3) verify tag management respects GPC, (4) test third-party scripts for GPC compliance, (5) verify GPC status persists across page views and sessions, (6) test that GPC is treated as a valid opt-out request (not requiring additional consumer action).",
              check: "Can you demonstrate that GPC signals are properly detected, honored, and maintained across all digital properties and third-party integrations?",
            },
            {
              title: "Third-Party Opt-Out Propagation Testing",
              control:
                "Opt-out must propagate to all service providers and contractors who sell/share PI.",
              how: "For a sample opt-out request: (1) identify all downstream entities that would sell/share the consumer's PI, (2) verify notifications were sent, (3) confirm each entity honored the opt-out, (4) verify that PI was removed from sale/sharing pools, (5) confirm the consumer's PI is no longer being sold/shared by any downstream entity. Use contractual audit rights where necessary.",
              check: "Can you produce evidence that an opt-out request was properly propagated and honored by all downstream service providers and contractors?",
            },
            {
              title: "Opt-Out User Experience Assessment",
              control:
                "Opt-out mechanisms must be as easy as opting in.",
              how: "Assess the consumer experience of opting out: (1) compare the number of steps to opt out vs. opt in, (2) verify opt-out does not require creating an account or logging in, (3) confirm opt-out is not presented with confusing or misleading language, (4) test that opt-out confirmation is provided, (5) verify the opt-out mechanism is accessible (WCAG 2.1 AA compliance). Document any friction or dark patterns that could violate CCPA/CPRA.",
              check: "Can you demonstrate that the opt-out process is at least as easy as the opt-in process and free of dark patterns?",
            },
            {
              title: "Opt-Out Record and Reporting Verification",
              control:
                "Complete opt-out records must be maintained for audit and compliance purposes.",
              how: "Verify opt-out record-keeping: (1) review sample opt-out records for completeness, (2) verify records include timestamps, verification method, and downstream propagation status, (3) confirm records are retained for the appropriate period, (4) verify reporting dashboards accurately reflect opt-out status, (5) test that reports can be generated for regulatory inquiries.",
              check: "Can you produce complete opt-out records for sampled requests and demonstrate that reporting accurately reflects compliance status?",
            },
          ],
        },
        {
          day: 4,
          title: "Risk Assessment & Cybersecurity Audit Requirements",
          tasks: [
            {
              title: "CPRA Risk Assessment Requirements",
              control:
                "CPRA requires businesses to conduct risk assessments for processing activities that present significant risk to consumers' privacy.",
              how: "Identify processing activities that require a risk assessment under CPRA: (1) processing that presents significant risk to consumers' privacy or security, (2) automated decision-making, (3) profiling consumers that produces legal or similarly significant effects, (4) processing SPI beyond what is necessary for the service. Understand the CPPA's risk assessment methodology and required elements: data flows, necessity assessment, proportionality analysis, and risk mitigation measures.",
              check: "Can you identify all processing activities requiring a risk assessment and demonstrate that the assessment methodology meets CPRA requirements?",
            },
            {
              title: "Cybersecurity Audit Obligations Under CPRA",
              control:
                "CPRA mandates cybersecurity audits for businesses whose processing presents significant cybersecurity risk.",
              how: "Determine if your organization is subject to the CPRA cybersecurity audit requirement: processing PI of 100,000+ consumers/households creates a presumption of significant cybersecurity risk. Understand the audit scope: cybersecurity policies, practices, and procedures. Review the CPPA's cybersecurity audit regulations and guidance. Identify qualified auditors and establish the audit process. Plan for recurring audits as required.",
              check: "Can you determine whether your organization is subject to the cybersecurity audit requirement and demonstrate readiness for the audit process?",
            },
            {
              title: "Automated Decision-Making (ADM) Assessment",
              control:
                "CPRA provides consumers with the right to opt out of ADM that produces legal or similarly significant effects.",
              how: "Identify all automated decision-making systems in your organization: algorithmic pricing, credit scoring, ad targeting, content recommendation, fraud detection. For each, assess whether it produces legal or similarly significant effects. Implement opt-out mechanisms for ADM. Document the logic involved, the PI used, and the outcomes produced. Ensure ADM systems are fair, transparent, and accountable.",
              check: "Can you inventory all ADM systems, assess which require opt-out mechanisms, and demonstrate that opt-out and transparency requirements are met?",
            },
            {
              title: "Risk Assessment Documentation and Review Process",
              control:
                "Risk assessments must be documented, kept current, and submitted to the CPPA upon request.",
              how: "Build a risk assessment documentation framework: (1) assessment methodology and criteria, (2) individual assessment records for each in-scope activity, (3) risk ratings and mitigation measures, (4) review and approval workflows, (5) periodic review schedule, (6) submission capability for CPPA requests. Establish a risk register and governance process for managing identified risks.",
              check: "Can you produce risk assessment documentation that meets CPRA requirements and demonstrate a governance process for ongoing risk management?",
            },
            {
              title: "Combined Assessment Approach — Privacy and Security Risk Integration",
              control:
                "CPRA risk assessments should integrate privacy and cybersecurity risks holistically.",
              how: "Develop an integrated assessment framework that combines: (1) privacy risk assessment (data protection impact assessment equivalent), (2) cybersecurity risk assessment, (3) business impact analysis, (4) threat modeling for PI/SPI processing systems. Map risks to controls and mitigations. Establish a combined risk register with clear ownership and remediation timelines.",
              check: "Can you demonstrate an integrated risk assessment framework that addresses both privacy and cybersecurity risks in a unified approach?",
            },
          ],
        },
        {
          day: 5,
          title: "Comprehensive Verification & Milestone 3 Preparation",
          tasks: [
            {
              title: "Full Compliance Verification Walkthrough",
              control:
                "A comprehensive verification should confirm all CCPA/CPRA controls are operating effectively.",
              how: "Conduct a full compliance walkthrough: (1) scope and thresholds, (2) privacy notices and collection notices, (3) consumer rights workflows (all six rights), (4) opt-out mechanisms and GPC, (5) SPI handling and limits, (6) data inventory and ROPA, (7) third-party contracts, (8) security controls, (9) risk assessments, (10) cybersecurity audit readiness. Document findings and any deficiencies.",
              check: "Can you produce a comprehensive verification report demonstrating that all CCPA/CPRA controls are operating effectively?",
            },
            {
              title: "Deficiency Identification and Prioritization",
              control:
                "Any compliance gaps must be identified, prioritized, and remediated.",
              how: "Compile all findings from Week 3 testing activities. Categorize deficiencies by severity: (1) critical — consumer rights not functioning, no opt-out mechanism, (2) high — inaccurate notices, incomplete ROPA, missing contracts, (3) medium — process gaps, documentation deficiencies, (4) low — minor inaccuracies, process improvements. Prioritize remediation based on risk and regulatory exposure. Create a remediation plan with timelines and owners.",
              check: "Can you produce a prioritized deficiency report and a remediation plan with clear ownership and timelines?",
            },
            {
              title: "Evidence Collection for Regulatory Readiness",
              control:
                "Organizations must be prepared to produce evidence of compliance upon CPPA request.",
              how: "Compile an evidence package including: (1) privacy notice versions and publication dates, (2) CRR sample responses and audit trails, (3) opt-out mechanism screenshots and test results, (4) data inventory and ROPA documents, (5) third-party contract compliance report, (6) security control test results, (7) risk assessment documentation, (8) training records. Organize evidence for efficient retrieval in a regulatory inquiry.",
              check: "Can you produce a comprehensive evidence package demonstrating CCPA/CPRA compliance that could be provided to the CPPA upon request?",
            },
            {
              title: "Continuous Monitoring Framework Design",
              control:
                "CCPA/CPRA compliance is ongoing and requires continuous monitoring capabilities.",
              how: "Design a continuous monitoring framework: (1) automated CRR workflow monitoring and alerting, (2) opt-out mechanism health checks, (3) data inventory change detection, (4) privacy notice update triggers, (5) third-party contract expiration alerts, (6) security control monitoring, (7) retention schedule enforcement monitoring. Define monitoring metrics, dashboards, and escalation procedures.",
              check: "Can you demonstrate a continuous monitoring framework that provides ongoing visibility into CCPA/CPRA compliance status?",
            },
            {
              title: "Week 3 Self-Assessment",
              control:
                "Validate verification competency before progressing to advanced topics.",
              how: "Test your ability to: design and execute a CRR test plan, verify data inventory and ROPA accuracy, test opt-out mechanisms comprehensively, assess risk assessment and cybersecurity audit readiness, and compile a regulatory evidence package. Identify any gaps in your verification capabilities.",
              check: "Can you design and execute a verification plan for each CCPA/CPRA control area without referring to reference materials?",
            },
          ],
        },
      ],
    },
    {
      week: 4,
      title: "Certified — Advanced Compliance & Multi-Jurisdictional Mastery",
      description:
        "Master advanced CCPA/CPRA topics including multi-cloud data residency, enforcement case analysis, integrated compliance frameworks, and ongoing program management.",
      days: [
        {
          day: 1,
          title: "Multi-Cloud Data Residency and Controls",
          tasks: [
            {
              title: "AWS Data Residency and CCPA/CPRA Controls",
              control:
                "PI processed on AWS must comply with CCPA/CPRA regardless of the AWS region used.",
              how: "Configure AWS for CCPA/CPRA compliance: (1) enable data residency controls — restrict PI processing to designated AWS regions, (2) configure IAM policies for PI/SPI access control, (3) enable CloudTrail for audit logging, (4) use AWS Config for compliance monitoring, (5) implement encryption with customer-managed KMS keys for PI/SPI, (6) configure S3 bucket policies to prevent unauthorized access, (7) enable Macie for sensitive data discovery. Document data residency configurations and verify they match your privacy notice disclosures.",
              check: "Can you demonstrate AWS configurations that enforce data residency, access control, encryption, and logging for California consumers' PI?",
            },
            {
              title: "Azure Data Residency and CCPA/CPRA Controls",
              control:
                "Azure configurations must support CCPA/CPRA data residency, access control, and audit requirements.",
              how: "Configure Azure for CCPA/CPRA compliance: (1) use Azure Policy to enforce data residency in US regions for California consumer PI, (2) configure Azure RBAC for PI/SPI access control, (3) enable Azure Monitor and Log Analytics for audit trails, (4) use Azure Key Vault for encryption key management, (5) configure Azure Purview for data discovery and classification, (6) implement Azure Private Link for data access isolation. Verify configurations against your data residency obligations.",
              check: "Can you demonstrate Azure configurations that enforce data residency, access control, encryption, and monitoring for California consumers' PI?",
            },
            {
              title: "GCP Data Residency and CCPA/CPRA Controls",
              control:
                "GCP configurations must support CCPA/CPRA data residency and compliance requirements.",
              how: "Configure GCP for CCPA/CPRA compliance: (1) use Organization Policy to restrict resource locations, (2) configure IAM conditions for PI/SPI access, (3) enable Cloud Audit Logs for comprehensive logging, (4) use Cloud KMS for customer-managed encryption keys, (5) configure Data Loss Prevention API for PI discovery and classification, (6) implement VPC Service Controls for data perimeter security. Document GCP data residency controls.",
              check: "Can you demonstrate GCP configurations that enforce data residency, access control, encryption, and monitoring for California consumers' PI?",
            },
            {
              title: "Alibaba Cloud Data Residency and CCPA/CPRA Controls",
              control:
                "Alibaba Cloud must be configured to meet CCPA/CPRA requirements for California consumers' PI.",
              how: "Configure Alibaba Cloud for CCPA/CPRA compliance: (1) select US regions for California consumer PI processing, (2) configure RAM policies for PI/SPI access control, (3) enable ActionTrail for audit logging, (4) use KMS for encryption key management, (5) implement Data Security Governance for PI classification and protection, (6) configure security groups and network ACLs for PI environment isolation. Verify that Alibaba Cloud configurations meet your CCPA/CPRA obligations.",
              check: "Can you demonstrate Alibaba Cloud configurations that enforce data residency, access control, encryption, and audit logging for California consumers' PI?",
            },
            {
              title: "Multi-Cloud Unified Governance for CCPA/CPRA",
              control:
                "A unified governance framework must provide consistent CCPA/CPRA compliance across all cloud platforms.",
              how: "Design a multi-cloud governance framework: (1) establish unified data classification standards for PI/SPI across clouds, (2) implement consistent access control policies, (3) centralize audit log collection and analysis, (4) unify encryption standards and key management, (5) create cross-cloud data flow monitoring, (6) implement centralized compliance dashboards. Document the governance framework and demonstrate it provides consistent protection across all cloud environments.",
              check: "Can you demonstrate a unified multi-cloud governance framework that provides consistent CCPA/CPRA compliance across AWS, Azure, GCP, and Alibaba Cloud?",
            },
          ],
        },
        {
          day: 2,
          title: "Enforcement Cases and Remediation",
          tasks: [
            {
              title: "CPPA Enforcement Action Analysis",
              control:
                "Understanding past enforcement actions informs compliance program design and risk prioritization.",
              how: "Study key CPPA enforcement actions and settlements: (1) review the CPPA's published enforcement actions and settlement terms, (2) identify common violation patterns (missing opt-out mechanisms, inadequate privacy notices, failure to honor consumer rights, improper data collection), (3) analyze penalty amounts and how they correlate with violation severity, (4) review remediation requirements imposed by settlements, (5) identify lessons learned applicable to your organization.",
              check: "Can you analyze at least three CPPA enforcement actions and identify the specific compliance failures, penalties, and remediation requirements?",
            },
            {
              title: "FTC Enforcement Actions Relevant to CCPA/CPRA",
              control:
                "FTC enforcement actions provide important context for CCPA/CPRA compliance, particularly around deceptive practices.",
              how: "Study FTC enforcement actions related to privacy and data security that intersect with CCPA/CPRA themes: (1) review recent FTC consent orders involving data collection, sharing, and security failures, (2) analyze how FTC actions relate to CCPA/CPRA obligations, (3) study the FTC's Health Breach Notification Rule and its intersection with CCPA/CPRA, (4) identify how FTC enforcement priorities align with or complement CPPA enforcement. Consider implications for organizations subject to both frameworks.",
              check: "Can you identify at least two FTC enforcement actions relevant to CCPA/CPRA and explain how they inform your compliance program?",
            },
            {
              title: "Remediation Planning and Execution",
              control:
                "Compliance deficiencies must be systematically remediated with documented plans and evidence.",
              how: "Develop a structured remediation process: (1) categorize findings from compliance assessments by severity, (2) create remediation plans with specific actions, owners, deadlines, and success criteria, (3) prioritize based on regulatory risk and consumer impact, (4) implement remediation with change management controls, (5) verify remediation effectiveness through testing, (6) document and retain evidence of remediation. Focus on high-risk areas: consumer rights workflows, opt-out mechanisms, and data inventory accuracy.",
              check: "Can you demonstrate a structured remediation process from finding to resolution with documented evidence of effectiveness?",
            },
            {
              title: "Incident Response for CCPA/CPRA Violations",
              control:
                "Organizations must be prepared to respond to CCPA/CPRA compliance incidents.",
              how: "Develop an incident response playbook for CCPA/CPRA violations: (1) detection and classification of compliance incidents (e.g., missed CRR deadline, unauthorized PI disclosure, security breach), (2) containment and investigation procedures, (3) root cause analysis, (4) notification requirements (consumers, CPPA, other regulators), (5) remediation and recovery, (6) post-incident review and process improvement. Integrate with existing incident response plans. Test the playbook through tabletop exercises.",
              check: "Can you execute an incident response for a CCPA/CPRA compliance incident using your documented playbook, including proper notifications and remediation?",
            },
            {
              title: "Regulatory Response Readiness",
              control:
                "Organizations must be prepared to respond to CPPA inquiries, audits, and investigations.",
              how: "Establish regulatory response readiness: (1) designate a CCPA/CPRA response team, (2) maintain an up-to-date evidence package, (3) establish communication protocols with the CPPA, (4) prepare response templates for common inquiry types, (5) train key personnel on response procedures, (6) establish legal counsel coordination processes. Conduct a mock CPPA inquiry to test readiness.",
              check: "Can you demonstrate organizational readiness to respond to a CPPA inquiry, audit, or investigation within required timeframes?",
            },
          ],
        },
        {
          day: 3,
          title: "Integration with GDPR and Other State Privacy Laws",
          tasks: [
            {
              title: "CCPA/CPRA and GDPR Overlap Analysis",
              control:
                "Organizations subject to both CCPA/CPRA and GDPR must harmonize overlapping requirements.",
              how: "Conduct a detailed overlap analysis: (1) identify shared requirements (consumer rights, data inventory, privacy notices, data minimization, security), (2) identify CCPA/CPRA-specific requirements (sale/sharing opt-out, SPI-specific handling, financial incentive programs), (3) identify GDPR-specific requirements (lawful basis, data protection officers, data protection impact assessments), (4) map where processes can be shared vs. must be separated, (5) identify opportunities for efficiency (unified data inventory, combined privacy notices).",
              check: "Can you produce a harmonized compliance framework that efficiently addresses both CCPA/CPRA and GDPR requirements without gaps?",
            },
            {
              title: "Multi-State Privacy Law Coordination",
              control:
                "An increasing number of US states have enacted privacy laws that may interact with CCPA/CPRA.",
              how: "Map the landscape of US state privacy laws: Virginia VCDPA, Colorado CPA, Connecticut CTDPA, Utah UCPA, Texas TDPSA, Oregon OCPA, Montana MCPA, and others. Identify: (1) which laws apply to your organization, (2) similarities and differences with CCPA/CPRA, (3) unique requirements by state (e.g., Colorado's universal opt-out mechanism requirement, Connecticut's assessment requirement), (4) opportunities to build a unified compliance program that satisfies all applicable state laws. Create a comparison matrix.",
              check: "Can you produce a multi-state compliance matrix identifying applicable laws, overlapping requirements, and unique obligations by jurisdiction?",
            },
            {
              title: "International Frameworks and Cross-Border Considerations",
              control:
                "CCPA/CPRA interacts with international frameworks for organizations with global operations.",
              how: "Analyze CCPA/CPRA interaction with international frameworks: (1) GDPR cross-border transfer mechanisms (SCCs, adequacy decisions, BCRs), (2) UK UK-GDPR, (3) Canadian PIPEDA, (4) Brazilian LGPD, (5) Chinese PIPL, (6) other APAC privacy laws. Identify where international frameworks impose stricter requirements that may govern your CCPA/CPRA practices. Establish a global privacy program architecture that addresses overlapping requirements.",
              check: "Can you demonstrate a global privacy program architecture that addresses CCPA/CPRA alongside applicable international frameworks?",
            },
            {
              title: "Vendor and Third-Party Multi-Framework Compliance",
              control:
                "Third-party vendors may be subject to multiple privacy frameworks simultaneously.",
              how: "Establish vendor compliance requirements across frameworks: (1) update contract templates to address CCPA/CPRA, GDPR, and applicable state law requirements, (2) create vendor assessment questionnaires covering multiple frameworks, (3) establish vendor monitoring for ongoing compliance across all applicable laws, (4) implement vendor data processing agreements that satisfy all relevant frameworks. Prioritize vendors that process PI across multiple jurisdictions.",
              check: "Can you demonstrate that your vendor compliance program addresses CCPA/CPRA, GDPR, and other applicable state law requirements in a unified approach?",
            },
            {
              title: "Unified Privacy Program Design",
              control:
                "An efficient privacy program addresses all applicable frameworks through shared processes and controls.",
              how: "Design a unified privacy program: (1) establish a core privacy framework (data inventory, rights management, notices) that satisfies all applicable laws, (2) layer jurisdiction-specific requirements on top of the core, (3) implement a unified governance structure with jurisdiction-specific policies, (4) create shared technology platforms for rights management, consent, and monitoring, (5) train staff on both the core framework and jurisdiction-specific nuances. Document the program architecture.",
              check: "Can you present a unified privacy program architecture that efficiently addresses CCPA/CPRA, GDPR, and other applicable frameworks?",
            },
          ],
        },
        {
          day: 4,
          title: "Common Audit Findings and Program Management",
          tasks: [
            {
              title: "Top 10 CCPA/CPRA Audit Findings",
              control:
                "Understanding common audit findings helps prioritize compliance efforts and avoid known pitfalls.",
              how: "Research and document the most common CCPA/CPRA audit findings: (1) missing or non-compliant privacy notices, (2) inadequate opt-out mechanisms, (3) failure to honor GPC signals, (4) incomplete or inaccurate data inventories, (5) missing service provider/contractor agreements, (6) inadequate consumer rights verification, (7) missed response deadlines, (8) insufficient SPI protections, (9) lack of retention period enforcement, (10) incomplete ROPA documentation. For each finding, document root causes, prevention strategies, and detection methods.",
              check: "Can you identify and explain the root cause, prevention strategy, and detection method for each of the top 10 CCPA/CPRA audit findings?",
            },
            {
              title: "Compliance Metrics and KPIs",
              control:
                "Ongoing compliance requires measurable metrics and key performance indicators.",
              how: "Design a compliance metrics dashboard: (1) CRR metrics — volume, average response time, on-time completion rate, verification pass rate, (2) opt-out metrics — opt-out volume, GPC signal volume, downstream propagation success rate, (3) data inventory metrics — completeness percentage, freshness, change detection rate, (4) privacy notice metrics — version currency, collection point coverage, (5) security metrics — access control compliance, encryption coverage, incident response time. Establish targets and escalation thresholds.",
              check: "Can you produce a compliance dashboard with metrics across CRR, opt-out, data inventory, privacy notices, and security, with clear targets?",
            },
            {
              title: "Compliance Program Governance Structure",
              control:
                "A mature compliance program requires clear governance, roles, and accountability.",
              how: "Design or refine the governance structure: (1) executive sponsor and accountability, (2) CCPA/CPRA compliance officer or team, (3) cross-functional working group (legal, IT, security, marketing, customer service), (4) regular compliance review cadence (monthly operational, quarterly executive), (5) escalation procedures for compliance issues, (6) change management process for data practices. Document roles, responsibilities, and decision-making authority.",
              check: "Can you present a governance structure with clear roles, responsibilities, reporting lines, and decision-making authority for CCPA/CPRA compliance?",
            },
            {
              title: "Training and Awareness Program",
              control:
                "Effective CCPA/CPRA compliance requires organization-wide awareness and competency.",
              how: "Design a comprehensive training program: (1) role-based training — different modules for different teams (customer service for CRR handling, marketing for opt-out and sharing, IT for technical controls, executives for governance), (2) general awareness training for all employees, (3) new hire onboarding training, (4) annual refresher training, (5) specialized training for high-risk areas (SPI handling, children's data), (6) training effectiveness assessment through testing.",
              check: "Can you produce a training program with role-based modules, awareness components, and effectiveness assessments that covers all CCPA/CPRA topics?",
            },
            {
              title: "Continuous Improvement and Maturity Assessment",
              control:
                "A CCPA/CPRA compliance program must continuously evolve with regulatory changes and organizational growth.",
              how: "Establish continuous improvement processes: (1) monitor CPPA rulemaking and guidance for changes, (2) conduct annual maturity assessments against a recognized framework, (3) perform periodic independent audits, (4) benchmark against industry peers, (5) implement lessons learned from enforcement actions and audit findings, (6) update controls as technology and business practices evolve. Document a maturity roadmap with target state and improvement priorities.",
              check: "Can you demonstrate a continuous improvement process and a maturity roadmap for your CCPA/CPRA compliance program?",
            },
          ],
        },
        {
          day: 5,
          title: "Capstone Assessment & Certification Readiness",
          tasks: [
            {
              title: "Comprehensive CCPA/CPRA Knowledge Assessment",
              control:
                "Final certification requires demonstrated mastery across all CCPA/CPRA compliance domains.",
              how: "Complete a comprehensive knowledge assessment covering: (1) CCPA/CPRA scope, definitions, and thresholds, (2) all six consumer rights and their requirements, (3) opt-out mechanisms and GPC, (4) SPI handling obligations, (5) privacy notices and collection notices, (6) data inventory and ROPA, (7) third-party contracts, (8) security controls, (9) risk assessments and cybersecurity audits, (10) enforcement landscape, (11) multi-jurisdictional considerations, (12) program governance and metrics.",
              check: "Can you pass a comprehensive assessment covering all CCPA/CPRA compliance domains at an advanced level?",
            },
            {
              title: "Live Compliance Scenario Exercises",
              control:
                "Practical application demonstrates true competency beyond theoretical knowledge.",
              how: "Complete at least three practical scenarios: (1) a consumer submits a complex multi-rights request with an authorized agent — process it end-to-end, (2) the CPPA initiates an inquiry requesting your data inventory, ROPA, and opt-out mechanism documentation — assemble and provide the response, (3) a security breach involving California consumers' PI — execute the incident response playbook including notifications. Document your approach and outcomes.",
              check: "Can you successfully complete practical scenarios demonstrating end-to-end CCPA/CPRA compliance competency?",
            },
            {
              title: "Compliance Program Documentation Review",
              control:
                "All compliance program documentation must be current, complete, and audit-ready.",
              how: "Conduct a final documentation review: (1) privacy notices — current and accurate, (2) data inventory and ROPA — complete and current, (3) consumer rights policies and procedures — documented and current, (4) opt-out policies and procedures — documented and tested, (5) third-party contracts — compliant and current, (6) security policies — documented and enforced, (7) risk assessments — completed and current, (8) training records — documented, (9) incident response plan — documented and tested, (10) governance structure — documented with clear roles.",
              check: "Can you produce an audit-ready compliance program documentation package with all required elements current and complete?",
            },
            {
              title: "Strategic Compliance Roadmap",
              control:
                "A strategic roadmap ensures ongoing compliance maturity and preparedness for regulatory evolution.",
              how: "Develop a 12-month strategic compliance roadmap: (1) prioritize remediation of any remaining gaps, (2) plan for CPPA regulatory updates and new rulemaking, (3) schedule periodic audits and assessments, (4) plan for technology and business changes that may impact compliance, (5) prepare for potential federal privacy legislation, (6) budget for compliance program investments (tools, training, personnel). Present the roadmap to leadership for approval.",
              check: "Can you present a prioritized 12-month strategic compliance roadmap with clear milestones, owners, and resource requirements?",
            },
            {
              title: "Final Certification Readiness Review",
              control:
                "Certification readiness requires confidence in all compliance domains and practical capabilities.",
              how: "Perform a final readiness self-assessment: (1) review all Week 1-4 learning objectives and confirm mastery, (2) verify all practical exercises are completed successfully, (3) confirm all documentation is audit-ready, (4) validate that the compliance program is operational and effective, (5) ensure continuous monitoring and improvement processes are in place. Address any remaining gaps before seeking certification.",
              check: "Are you confident that your CCPA/CPRA compliance program is effective, your documentation is audit-ready, and you can demonstrate compliance to the CPPA upon request?",
            },
          ],
        },
      ],
    },
  ],
  milestonesData: [
    {
      id: 1,
      title: "CCPA/CPRA Foundation & Consumer Rights Mastery",
      description:
        "Demonstrate comprehensive understanding of CCPA/CPRA scope, definitions, consumer rights, and organizational applicability.",
      week: 1,
    },
    {
      id: 2,
      title: "Operational CCPA/CPRA Compliance Implementation",
      description:
        "Demonstrate ability to implement CRR workflows, opt-out mechanisms, SPI handling, privacy notices, and data inventory.",
      week: 2,
    },
    {
      id: 3,
      title: "Advanced CCPA/CPRA Verification & Multi-Jurisdictional Mastery",
      description:
        "Demonstrate verification competency, multi-cloud governance, enforcement awareness, and unified privacy program design.",
      week: 4,
    },
  ],
};

export default function CcpaCpra() {
  return <LearningFrameworkPage framework={FRAMEWORK} />;
}
