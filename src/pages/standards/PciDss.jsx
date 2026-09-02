import LearningFrameworkPage from "../../components/LearningFrameworkPage";

const FRAMEWORK = {
  id: "pci-dss-v4",
  name: "PCI-DSS v4.0",
  color: "beige",
  region: "Global",
  startupGaps: [
    {
      gap: "Cardholder data stored where it shouldn't be",
      pushback: "We only store card numbers for a few seconds, it's fine.",
      reality: "Any stored cardholder data (even in logs, databases, or third-party tools) massively expands PCI scope and risk. Unnecessary storage is the top scope killer.",
      leantip: "Tokenize via a 3rd party provider, strip PANs from logs/databases, and enable masking. If you don't need the PAN, don't store it — reduce scope to near-zero."
    },
    {
      gap: "Shared hosting / flat network without segmentation",
      pushback: "One network, one server, it's cheaper.",
      reality: "The cardholder data environment (CDE) must be isolated. Without segmentation the WHOLE network is in scope, which is unaffordable for a startup.",
      leantip: "Create a segmented CDE (separate VLAN/VPC/account) containing only card-processing components. Document the segmentation with a scope diagram."
    },
    {
      gap: "No quarterly scans / annual pen test evidence",
      pushback: "We scanned once last year, that's enough.",
      reality: "PCI-DSS requires quarterly external ASV scans and annual penetration tests with evidence. Missed scans = immediate non-compliance.",
      leantip: "Automate scans on a schedule, keep the reports, and run an annual pen test. Store all scan reports in one folder dated correctly."
    },
    {
      gap: "Default credentials and weak service accounts",
      pushback: "It's an internal tool, nobody outside will find it.",
      reality: "Default/weak credentials on any system touching the CDE are a critical finding and a real breach vector target.",
      leantip: "Change all defaults, enforce strong/unique creds, enable MFA, and use the cloud provider's managed secrets where possible."
    },
    {
      gap: "Third-party processors misunderstand scope",
      pushback: "Our payment provider handles everything, so we're compliant.",
      reality: "Using a validated processor removes some responsibility but NOT your duty to validate your own CDE, controls, and SAQ/ROC status.",
      leantip: "Confirm your provider is PCI-DSS validated (list on PCI SSC), and complete your own SAQ/ROC correctly. Don't assume the provider covers you."
    }
  ],
  weeks: 4,
  milestones: 3,
  referenceUrl: "https://www.pcisecuritystandards.org/document_library/",
  weeksData: [
    {
      week: 1,
      title: "L1 Foundation",
      description: "Build a solid understanding of PCI-DSS fundamentals, cardholder data concepts, and the 12 core requirements.",
      days: [
        {
          day: 1,
          title: "Cardholder Data Flow Mapping",
          tasks: [
            {
              title: "Map cardholder data flow from point of entry to storage",
              control: "Requirement 1 & 2",
              how: "Document every touchpoint where cardholder data enters, moves through, and exits your environment. Use a diagramming tool to create a visual flow from the merchant's point-of-sale through all processing systems to final storage or deletion points.",
              check: "Complete a data flow diagram that identifies at least 5 touchpoints and all systems that process or store cardholder data"
            },
            {
              title: "Identify all cardholder data storage locations",
              control: "Requirement 3",
              how: "Conduct a comprehensive inventory of all databases, file systems, backups, and logs that may contain cardholder data including PAN, cardholder name, expiration date, and service code.",
              check: "Produce a storage inventory spreadsheet listing each storage location, data elements stored, retention period, and disposal method"
            },
            {
              title: "Document data retention and disposal procedures",
              control: "Requirement 3.1",
              how: "Review and document current data retention policies for cardholder data. Ensure procedures exist for secure deletion of data that is no longer needed for business or legal purposes.",
              check: "Written retention policy exists with defined timeframes and a documented disposal procedure for each storage medium"
            },
            {
              title: "Classify data sensitivity levels across the environment",
              control: "Requirement 3",
              how: "Assign sensitivity labels to all data assets based on the type of cardholder data they contain. Primary Account Number (PAN) should be classified as the highest sensitivity level.",
              check: "Data classification matrix created and applied to all identified cardholder data repositories"
            },
            {
              title: "Review third-party data sharing arrangements",
              control: "Requirement 12.8",
              how: "Catalog all third-party service providers that receive, process, or store cardholder data on your behalf. Document the nature of data shared and contractual obligations.",
              check: "Third-party provider inventory with data sharing details and confirmation of PCI-DSS compliance obligations in contracts"
            }
          ]
        },
        {
          day: 2,
          title: "PCI-DSS Scope Determination",
          tasks: [
            {
              title: "Perform initial PCI-DSS scope assessment",
              control: "Requirement 12.5",
              how: "Identify all systems, networks, and personnel that are within the PCI-DSS scope. Include systems that directly connect to, store, process, or transmit cardholder data, as well as systems with security implications for the CDE.",
              check: "Scope assessment document listing all in-scope systems with justification for inclusion"
            },
            {
              title: "Apply network segmentation principles",
              control: "Requirement 1",
              how: "Evaluate current network architecture and propose segmentation strategies to isolate the CDE from other network segments. Document the boundaries between CDE and non-CDE segments.",
              check: "Network diagram showing CDE boundaries with clearly defined segmentation points and access controls between segments"
            },
            {
              title: "Identify connected systems that impact CDE security",
              control: "Requirement 12.5.2",
              how: "Map all systems that do not directly process cardholder data but can impact the security of the CDE, such as jump boxes, security information and event management (SIEM) systems, and Active Directory servers.",
              check: "Connected systems list with risk assessment showing how each system could impact CDE security"
            },
            {
              title: "Evaluate wireless network scope and segmentation",
              control: "Requirement 12.5.2.1",
              how: "Scan for and document all wireless access points within the environment. Verify that wireless networks carrying cardholder data are segmented and included in the PCI-DSS scope.",
              check: "Wireless network inventory with scope determination and evidence of segmentation controls"
            },
            {
              title: "Document out-of-scope system compensating controls",
              control: "Requirement 12.5.2.2",
              how: "For systems removed from scope through segmentation or other controls, document the compensating controls that maintain their out-of-scope status and the validation approach.",
              check: "Compensating control documentation for each out-of-scope system with monitoring and validation procedures"
            }
          ]
        },
        {
          day: 3,
          title: "12 PCI-DSS Requirements Overview",
          tasks: [
            {
              title: "Study Requirements 1-3: Network controls, secure configs, data protection",
              control: "Requirements 1, 2, 3",
              how: "Review the full text of PCI-DSS Requirements 1 (Install and maintain network security controls), 2 (Apply secure configurations), and 3 (Protect stored account data). Take notes on key controls and applicability to your environment.",
              check: "Annotated notes covering key sub-requirements of 1, 2, and 3 with relevance ratings for your organization"
            },
            {
              title: "Study Requirements 4-6: Encryption, secure systems, secure development",
              control: "Requirements 4, 5, 6",
              how: "Review Requirements 4 (Protect cardholder data with strong cryptography during transmission), 5 (Protect all systems from malicious software), and 6 (Develop and maintain secure systems). Document applicable controls.",
              check: "Study notes for Requirements 4, 5, and 6 with current implementation status for each sub-requirement"
            },
            {
              title: "Study Requirements 7-9: Access, identification, physical access",
              control: "Requirements 7, 8, 9",
              how: "Review Requirements 7 (Restrict access by business need-to-know), 8 (Identify users and authenticate access), and 9 (Restrict physical access). Map each requirement to existing organizational controls.",
              check: "Control mapping document linking Requirements 7, 8, and 9 to current organizational security controls"
            },
            {
              title: "Study Requirements 10-12: Monitoring, testing, security policies",
              control: "Requirements 10, 11, 12",
              how: "Review Requirements 10 (Log and monitor all access), 11 (Test security regularly), and 12 (Support information security with organizational policies). Note testing frequencies and policy requirements.",
              check: "Requirement coverage matrix for 10, 11, and 12 showing current capabilities and gaps"
            },
            {
              title: "Create a requirements applicability matrix",
              control: "All 12 Requirements",
              how: "Consolidate all 12 requirements into a single applicability matrix that maps each requirement to your environment, notes current compliance status, and identifies gaps requiring remediation.",
              check: "Completed applicability matrix with status indicators (compliant, partially compliant, not compliant) for all 12 requirements"
            }
          ]
        },
        {
          day: 4,
          title: "Cardholder Data Environment (CDE) Identification",
          tasks: [
            {
              title: "Define CDE boundaries using network and data analysis",
              control: "Requirement 12.5",
              how: "Combine network diagrams with data flow maps to precisely define the boundaries of the CDE. Include all systems that store, process, or transmit cardholder data and the network segments they reside on.",
              check: "CDE boundary document with supporting network diagrams and data flow evidence"
            },
            {
              title: "Scan all network segments for cardholder data presence",
              control: "Requirement 3",
              how: "Deploy data discovery tools to scan databases, file servers, and application logs across all network segments to identify any unexpected storage of cardholder data outside the defined CDE.",
              check: "Scan results showing all locations where cardholder data was found with remediation plan for any out-of-scope storage"
            },
            {
              title: "Identify and document all CDE entry and exit points",
              control: "Requirement 1",
              how: "Map all points where data enters or leaves the CDE, including API endpoints, file transfer mechanisms, database connections, and user access points. Document the security controls at each point.",
              check: "Entry/exit point inventory with documented security controls and data protection mechanisms at each boundary"
            },
            {
              title: "Review virtualization and cloud scope implications",
              control: "Requirement 12.5",
              how: "Evaluate how virtualization and cloud infrastructure affects CDE scope. Consider shared responsibility models and ensure hypervisor and cloud management plane security is addressed.",
              check: "Cloud/virtualization scope assessment documenting shared responsibilities and CDE containment strategies"
            },
            {
              title: "Validate CDE scope with system administrators",
              control: "Requirement 12.5.1",
              how: "Present the CDE scope documentation to system and network administrators for validation. Verify accuracy of network diagrams and ensure no systems have been missed in the scoping process.",
              check: "Signed validation from system administrators confirming CDE scope accuracy with any corrections documented"
            }
          ]
        },
        {
          day: 5,
          title: "PCI-DSS v4.0 Key Changes",
          tasks: [
            {
              title: "Review customized approach vs. defined approach",
              control: "v4.0 Introduction",
              how: "Study the two compliance approaches in v4.0: the defined approach (traditional specific requirements) and the customized approach (flexible controls targeting security objectives). Understand when each applies and the documentation requirements.",
              check: "Comparison document outlining when to use each approach with pros, cons, and documentation requirements"
            },
            {
              title: "Understand targeted risk analysis requirements",
              control: "v4.0 Requirement 12.3",
              how: "Study the targeted risk analysis framework that allows organizations to define frequency of certain activities based on their risk assessment. Document how this applies to log reviews, vulnerability scans, and other periodic activities.",
              check: "Targeted risk analysis template prepared with methodology for determining frequencies of periodic security activities"
            },
            {
              title: "Review authentication and encryption enhancements",
              control: "v4.0 Requirements 4, 8",
              how: "Compare v3.2.1 and v4.0 requirements for multi-factor authentication and cryptographic standards. Note changes such as expanded MFA requirements and updated encryption algorithm standards.",
              check: "Change matrix documenting all authentication and encryption requirement differences between v3.2.1 and v4.0"
            },
            {
              title: "Study enhanced validation and scoping guidance",
              control: "v4.0 Appendix",
              how: "Review the updated scoping guidance and enhanced validation methods introduced in v4.0, including additional testing procedures and the scope confirmation process.",
              check: "Summary of enhanced validation procedures with implementation plan for new scoping requirements"
            },
            {
              title: "Create v4.0 transition timeline and gap assessment",
              control: "v4.0 Transition",
              how: "Map the v4.0 transition timeline milestones and create a gap assessment comparing your current PCI-DSS program against v4.0 requirements. Identify early-adopt actions needed.",
              check: "Transition timeline with milestones and gap assessment showing top 10 areas requiring attention for v4.0 compliance"
            }
          ]
        }
      ]
    },
    {
      week: 2,
      title: "L2 Implementer",
      description: "Implement the core technical controls required by PCI-DSS including network segmentation, encryption, access control, and vulnerability management.",
      days: [
        {
          day: 1,
          title: "Network Segmentation Implementation",
          tasks: [
            {
              title: "Design network segmentation architecture",
              control: "Requirement 1.4",
              how: "Design a segmentation architecture that isolates the CDE from other network zones. Define VLANs, subnet boundaries, firewall rules, and routing policies that enforce segmentation between trust zones.",
              check: "Network segmentation design document with VLAN assignments, IP schemas, and firewall rule logic for all zone boundaries"
            },
            {
              title: "Implement firewall rules for CDE boundary protection",
              control: "Requirement 1.3",
              how: "Configure firewall rules that restrict inbound and outbound traffic to the CDE based on business need-to-know. Implement deny-all default rules and explicitly allow only required protocols and ports.",
              check: "Firewall rule sets documented with business justification for each allowed rule and evidence of deny-all default configuration"
            },
            {
              title: "Deploy network monitoring at segmentation boundaries",
              control: "Requirement 10.2",
              how: "Implement monitoring and alerting at all segmentation boundaries to detect any unauthorized attempts to bypass network controls. Configure alerts for rule violations and anomalous traffic patterns.",
              check: "Monitoring configuration at each segmentation point with tested alerting and documented response procedures"
            },
            {
              title: "Test segmentation effectiveness",
              control: "Requirement 11.3.5",
              how: "Perform segmentation testing to verify that controls are operating as designed. Test from each network segment to confirm that traffic is properly blocked or allowed according to the security policy.",
              check: "Segmentation test results showing successful blocking of unauthorized inter-segment traffic with documented exceptions"
            },
            {
              title: "Document network architecture and control matrix",
              control: "Requirement 1.3",
              how: "Create comprehensive network architecture documentation including diagrams, IP address management records, and a control matrix that maps each network boundary to its security controls.",
              check: "Updated network architecture documentation set with version control and change management procedures"
            }
          ]
        },
        {
          day: 2,
          title: "Firewall and Router Configuration Standards",
          tasks: [
            {
              title: "Develop firewall and router configuration standards",
              control: "Requirement 1.2",
              how: "Create formal configuration standards for all firewalls and routers that define approved configurations, hardening procedures, and change management requirements. Include vendor-specific guidelines where applicable.",
              check: "Written configuration standards document approved by management covering all firewall and router types in the environment"
            },
            {
              title: "Implement rule review and change management process",
              control: "Requirement 1.2.1",
              how: "Establish a formal process for reviewing firewall and router rules at least every six months. Define criteria for rule justification, owner attestation, and removal of unused or unnecessary rules.",
              check: "Documented rule review process with defined schedule, roles, and evidence of most recent review completion"
            },
            {
              title: "Apply security hardening baselines to all network devices",
              control: "Requirement 2.2",
              how: "Apply vendor-recommended and industry-standard hardening configurations to all firewalls, routers, and switches. Disable unnecessary services, change default credentials, and remove unnecessary accounts.",
              check: "Hardening baseline checklists completed for each network device type with evidence of implementation"
            },
            {
              title: "Configure logging on all network devices",
              control: "Requirement 10.2",
              how: "Enable logging on all firewalls and routers for configuration changes, administrative access, system events, and denied traffic. Forward logs to a centralized logging infrastructure.",
              check: "Logging configuration documented for each device type with verification that logs are being received by the SIEM"
            },
            {
              title: "Create inventory of all permitted network services and protocols",
              control: "Requirement 1.3",
              how: "Document all network services and protocols that traverse the CDE and network boundaries, including HTTP, HTTPS, SSH, DNS, NTP, and any proprietary protocols. Ensure each is justified and authorized.",
              check: "Authorized services inventory with protocol, port, direction, and business justification for each permitted communication path"
            }
          ]
        },
        {
          day: 3,
          title: "Encryption of Cardholder Data",
          tasks: [
            {
              title: "Implement encryption for cardholder data at rest",
              control: "Requirement 3.5",
              how: "Deploy strong cryptographic protection for all stored PAN using industry-accepted algorithms and protocols. Implement key management procedures that protect encryption keys from disclosure and misuse.",
              check: "At-rest encryption implemented on all PAN storage with documented key management lifecycle procedures"
            },
            {
              title: "Deploy TLS 1.2+ for cardholder data in transit",
              control: "Requirement 4.2",
              how: "Ensure all cardholder data transmitted over open or public networks is encrypted using strong TLS protocols. Disable older protocols (SSL, TLS 1.0, TLS 1.1) and weak cipher suites.",
              check: "TLS configuration evidence showing minimum TLS 1.2 for all data transmission paths with weak protocol and cipher disabling"
            },
            {
              title: "Implement cryptographic key management procedures",
              control: "Requirement 3.6",
              how: "Develop and implement complete key lifecycle management including key generation, distribution, storage, rotation, retirement, and destruction. Separate key management duties from data custodians.",
              check: "Key management procedure documentation with lifecycle stages and separation of duties controls validated"
            },
            {
              title: "Deploy tokenization or data masking where applicable",
              control: "Requirement 3.5",
              how: "Implement tokenization or masking for PAN in non-production environments, reporting systems, and anywhere full cardholder data is not required for business processing.",
              check: "Tokenization or masking implementation documented with validation that original PAN is not recoverable without authorization"
            },
            {
              title: "Validate encryption implementation across all storage media",
              control: "Requirement 3.5.1",
              how: "Test and verify that encryption controls are correctly implemented on all storage media including databases, file systems, backup media, and removable storage. Verify that encryption keys are not stored with encrypted data.",
              check: "Encryption validation report covering all storage media with key storage verification confirming separation of keys and data"
            }
          ]
        },
        {
          day: 4,
          title: "Access Control Implementation",
          tasks: [
            {
              title: "Implement role-based access control for CDE",
              control: "Requirement 7.2",
              how: "Define roles and access levels for all personnel who need access to the CDE. Implement least-privilege access ensuring users have only the minimum permissions required to perform their job functions.",
              check: "RBAC matrix with defined roles, permissions, and evidence that each user's access matches their assigned role"
            },
            {
              title: "Deploy multi-factor authentication for CDE access",
              control: "Requirement 8.4",
              how: "Implement MFA for all access to the CDE, including remote access, administrative access, and console access. Ensure MFA meets v4.0 requirements for phishing-resistant authentication where applicable.",
              check: "MFA enabled for all CDE access methods with evidence of phishing-resistant controls for administrative access"
            },
            {
              title: "Implement unique user identification and access tracking",
              control: "Requirement 8.1",
              how: "Ensure every user has a unique identification before accessing system components. Eliminate shared accounts and configure systems to track individual user actions through their unique ID.",
              check: "User account inventory with unique IDs assigned and evidence of shared account elimination"
            },
            {
              title: "Configure automatic account lockout and session management",
              control: "Requirement 8.2.4",
              how: "Implement automatic account lockout after a defined number of failed login attempts. Configure session timeouts to automatically terminate inactive sessions on all CDE systems.",
              check: "Account lockout and session timeout configurations verified on all CDE systems with documented timeout values"
            },
            {
              title: "Establish access provisioning and deprovisioning procedures",
              control: "Requirement 7.3",
              how: "Create formal procedures for granting, modifying, and revoking access to the CDE. Implement timely access removal for terminated employees and role changes. Conduct periodic access reviews.",
              check: "Access lifecycle procedures documented with evidence of last access review and deprovisioning SLA compliance"
            }
          ]
        },
        {
          day: 5,
          title: "Vulnerability Management Program",
          tasks: [
            {
              title: "Establish vulnerability management policy and procedures",
              control: "Requirement 6.3",
              how: "Develop a formal vulnerability management policy that defines scanning frequencies, patching SLAs, risk rating methodologies, and escalation procedures. Align with industry frameworks like CVSS for severity scoring.",
              check: "Approved vulnerability management policy with defined SLAs: critical patches within 15 days, high within 30 days"
            },
            {
              title: "Deploy automated vulnerability scanning across all CDE systems",
              control: "Requirement 11.3",
              how: "Configure automated vulnerability scanning tools to scan all systems in the CDE on a regular schedule. Ensure scans cover both internal and external network segments and authenticated scanning is enabled.",
              check: "Vulnerability scanning configuration documented with authenticated scanning enabled and results covering all CDE systems"
            },
            {
              title: "Implement patch management workflow",
              control: "Requirement 6.3.3",
              how: "Establish a structured patch management workflow that includes assessment, testing, deployment, and verification of patches. Maintain a current list of all third-party software and components.",
              check: "Patch management workflow documented with evidence of recent patch cycle completion and third-party software inventory"
            },
            {
              title: "Configure change detection and file integrity monitoring",
              control: "Requirement 11.5",
              how: "Deploy file integrity monitoring (FIM) on critical system files, configuration files, and payment processing software. Configure alerts for unauthorized changes and integrate with incident response.",
              check: "FIM deployed on all critical system components with alerting verified and baseline hashes documented"
            },
            {
              title: "Perform initial risk-based vulnerability prioritization",
              control: "Requirement 6.3.1",
              how: "Review current vulnerability scan results and prioritize remediation based on risk. Consider CVSS score, exploitability, network exposure, and data sensitivity to rank vulnerabilities for remediation.",
              check: "Prioritized vulnerability remediation plan with top 10 critical vulnerabilities identified and assigned to owners"
            }
          ]
        }
      ]
    },
    {
      week: 3,
      title: "L3 Verifier",
      description: "Master the verification and testing activities required to validate PCI-DSS compliance including vulnerability scanning, penetration testing, and audit procedures.",
      days: [
        {
          day: 1,
          title: "Internal Vulnerability Scans",
          tasks: [
            {
              title: "Configure and execute authenticated internal vulnerability scans",
              control: "Requirement 11.3.1",
              how: "Set up authenticated scanning with administrative credentials for comprehensive vulnerability assessment of all internal CDE systems. Run scans and analyze results for false positives and true vulnerabilities.",
              check: "Authenticated internal scan completed covering all CDE systems with results reviewed and false positives eliminated"
            },
            {
              title: "Analyze scan results and prioritize remediation",
              control: "Requirement 11.3.1.2",
              how: "Review scan results using CVSS scoring to classify vulnerabilities by severity. Map findings to specific systems and create remediation tickets with owners and due dates aligned to policy SLAs.",
              check: "Scan analysis report with vulnerabilities classified by severity and remediation tickets created for all actionable findings"
            },
            {
              title: "Verify remediation effectiveness with rescan",
              control: "Requirement 11.3.1.1",
              how: "After vulnerabilities are remediated, perform follow-up scanning to verify that patches and fixes have been applied correctly and that the vulnerabilities have been resolved without introducing new issues.",
              check: "Rescan results showing previously identified vulnerabilities resolved with no new critical findings introduced"
            },
            {
              title: "Document scan schedules and exception management process",
              control: "Requirement 11.3.1.2",
              how: "Formalize the internal scanning schedule based on targeted risk analysis. Create an exception management process for vulnerabilities that cannot be immediately remediated due to technical constraints.",
              check: "Documented scan schedule with targeted risk analysis justification and exception request templates with approval workflow"
            },
            {
              title: "Evaluate scan tool coverage and accuracy",
              control: "Requirement 11.3.1",
              how: "Assess whether current vulnerability scanning tools provide adequate coverage of all technologies in the environment. Compare results across tools if multiple scanners are used and validate accuracy.",
              check: "Tool coverage assessment with inventory of all CDE system types mapped to scanning capabilities and accuracy metrics"
            }
          ]
        },
        {
          day: 2,
          title: "Penetration Testing Procedures",
          tasks: [
            {
              title: "Define penetration testing scope and rules of engagement",
              control: "Requirement 11.4",
              how: "Create a detailed penetration testing scope document that defines in-scope systems, testing windows, prohibited actions, escalation contacts, and emergency procedures. Include both network and application layer testing.",
              check: "Rules of engagement document signed by authorized personnel defining complete scope, timing, and contact procedures"
            },
            {
              title: "Conduct external penetration testing",
              control: "Requirement 11.4.1",
              how: "Execute external network penetration testing from the perspective of an external attacker. Test all internet-facing systems, VPN concentrators, and web applications for vulnerabilities and misconfigurations.",
              check: "External penetration test completed with findings documented including exploitation evidence and risk ratings"
            },
            {
              title: "Conduct internal penetration testing",
              control: "Requirement 11.4.2",
              how: "Perform internal penetration testing to simulate threats from within the network, including compromised workstations, malicious insiders, and lateral movement from non-CDE segments into the CDE.",
              check: "Internal penetration test completed with lateral movement paths documented and privilege escalation findings rated"
            },
            {
              title: "Perform segmentation testing during penetration test",
              control: "Requirement 11.4.5",
              how: "During penetration testing, specifically attempt to bypass network segmentation controls to verify their effectiveness. Test from out-of-scope segments attempting to reach CDE systems.",
              check: "Segmentation testing results showing success or failure of boundary controls with specific bypass attempts documented"
            },
            {
              title: "Develop penetration test report and remediation plan",
              control: "Requirement 11.4.6",
              how: "Compile penetration test findings into an actionable report with executive summary, detailed findings, evidence of exploitation, and prioritized remediation recommendations with timelines.",
              check: "Completed penetration test report with executive summary, all findings documented, and remediation plan with assigned owners"
            }
          ]
        },
        {
          day: 3,
          title: "Log Monitoring and Audit Trail Review",
          tasks: [
            {
              title: "Configure centralized logging for all CDE components",
              control: "Requirement 10.1",
              how: "Ensure all CDE systems, firewalls, routers, switches, databases, and applications are configured to generate audit logs. Forward all logs to a centralized, tamper-resistant logging infrastructure.",
              check: "Centralized logging configured for all CDE components with evidence of log receipt and retention configuration"
            },
            {
              title: "Define log review procedures and frequency",
              control: "Requirement 10.4.1",
              how: "Establish log review procedures that define what events to monitor, how to identify anomalies, review frequency, and escalation procedures. Implement automated alerts for critical security events.",
              check: "Log review procedures documented with automated alert rules configured for high-priority events and daily review cadence"
            },
            {
              title: "Implement log integrity protection mechanisms",
              control: "Requirement 10.5",
              how: "Deploy controls to protect audit logs from modification or deletion. Implement cryptographic hashing, write-once storage, or centralized SIEM with role-based access controls for log management.",
              check: "Log integrity controls verified with evidence that unauthorized modification attempts are detected and logged"
            },
            {
              title: "Conduct sample log review and anomaly detection",
              control: "Requirement 10.4.2",
              how: "Perform a sample log review exercise analyzing firewall logs, access logs, and database logs. Demonstrate the ability to detect suspicious activity such as unauthorized access attempts or data exfiltration indicators.",
              check: "Completed log review exercise with documented findings, anomaly detection results, and any incident escalations"
            },
            {
              title: "Validate log retention meets PCI-DSS requirements",
              control: "Requirement 10.7",
              how: "Verify that audit logs are retained for at least 12 months with at least 3 months immediately available for analysis. Review storage capacity and archival processes for log retention compliance.",
              check: "Log retention validation showing 12-month retention with 3 months online availability and documented archival procedures"
            }
          ]
        },
        {
          day: 4,
          title: "PCI-DSS Assessment Documentation",
          tasks: [
            {
              title: "Prepare network and data flow diagrams for assessment",
              control: "Requirement 12.5",
              how: "Compile current network architecture diagrams, data flow diagrams, and CDE scope documentation. Ensure diagrams are accurate, up-to-date, and clearly show all system components and their relationships.",
              check: "Assessment-ready documentation set with network diagrams, data flow diagrams, and CDE scope confirmed by administrators"
            },
            {
              title: "Gather evidence of all PCI-DSS control implementations",
              control: "All Requirements",
              how: "Systematically collect evidence for each PCI-DSS requirement including policy documents, configuration screenshots, scan reports, penetration test results, access control lists, and training records.",
              check: "Evidence collection organized by PCI-DSS requirement with gaps identified and remediation in progress"
            },
            {
              title: "Create system inventory with component identification",
              control: "Requirement 2.2.1",
              how: "Build a comprehensive inventory of all system components in the CDE including hardware, software, firmware versions, and patch levels. Include any custom and third-party software.",
              check: "Complete system component inventory with version information and identification of all custom and third-party software"
            },
            {
              title: "Compile change management records and security policies",
              control: "Requirement 6.5, 12.1",
              how: "Gather all current security policies, procedures, and standards. Compile change management records demonstrating that security controls are maintained through a formal change control process.",
              check: "Change management records and current security policy set compiled with version dates and management approval evidence"
            },
            {
              title: "Prepare personnel security documentation",
              control: "Requirement 12.6",
              how: "Compile evidence of security awareness training, background checks for personnel with CDE access, and acceptable use policies. Ensure training content covers PCI-DSS awareness and is current.",
              check: "Personnel security documentation including training completion records, background check evidence, and signed acceptable use policies"
            }
          ]
        },
        {
          day: 5,
          title: "QSA and ISA Assessment Process",
          tasks: [
            {
              title: "Understand the role of a Qualified Security Assessor (QSA)",
              control: "PCI-DSS v4.0",
              how: "Study the QSA program including certification requirements, assessment methodology, reporting obligations, and the responsibilities of both the QSA and the assessed entity during an engagement.",
              check: "Documented understanding of QSA role, responsibilities, and engagement process with key checkpoints identified"
            },
            {
              title: "Learn Internal Security Assessor (ISA) program requirements",
              control: "PCI-DSS v4.0",
              how: "Research the ISA certification program, continuing education requirements, and how ISAs can assist with PCI-DSS compliance activities and preparation for external assessments.",
              check: "ISA program summary with certification requirements, maintenance obligations, and value proposition for the organization"
            },
            {
              title: "Review ROC and SAQ completion procedures",
              control: "PCI-DSS v4.0",
              how: "Study how a Report on Compliance (ROC) is completed by a QSA during a full assessment. Understand the testing procedures, evidence requirements, and documentation standards for a complete ROC.",
              check: "ROC completion guide reviewed with understanding of each section, testing methodology, and evidence requirements"
            },
            {
              title: "Practice assessment walkthrough with mock interviews",
              control: "All Requirements",
              how: "Conduct mock assessment interviews with system owners, database administrators, and network engineers to practice answering assessor questions and presenting evidence for each requirement area.",
              check: "Mock assessment completed with documented interview responses and evidence presentation for at least 5 requirement areas"
            },
            {
              title: "Develop assessment readiness scorecard",
              control: "All Requirements",
              how: "Create a self-assessment scorecard that rates compliance readiness for each PCI-DSS requirement. Use this to identify final gaps that need to be addressed before a formal assessment.",
              check: "Assessment readiness scorecard completed with overall readiness rating and prioritized list of final remediation items"
            }
          ]
        }
      ]
    },
    {
      week: 4,
      title: "L4 Certified",
      description: "Complete PCI-DSS mastery through compliance validation, assessment processes, and ongoing compliance maintenance strategies.",
      days: [
        {
          day: 1,
          title: "SAQ vs ROC Determination",
          tasks: [
            {
              title: "Evaluate SAQ eligibility criteria and applicable types",
              control: "PCI-DSS v4.0",
              how: "Determine which Self-Assessment Questionnaire (SAQ) type applies to your organization based on payment processing methods. Review SAQ A, B, C, and D eligibility criteria and the questions each addresses.",
              check: "SAQ type determination documented with justification based on payment processing methods and channel analysis"
            },
            {
              title: "Compare SAQ and ROC assessment requirements",
              control: "PCI-DSS v4.0",
              how: "Understand when a full ROC assessment by a QSA is required versus an SAQ. Consider transaction volumes, payment channel types, and acquirer or payment brand requirements for assessment type.",
              check: "Comparison matrix of SAQ vs ROC requirements with decision criteria based on organizational payment processing profile"
            },
            {
              title: "Review SAQ completion best practices",
              control: "PCI-DSS v4.0",
              how: "Study the SAQ completion process including understanding each question, documenting compensating controls, and preparing attestation of compliance. Review common mistakes and how to avoid them.",
              check: "SAQ preparation checklist with common pitfalls documented and mitigation strategies defined"
            },
            {
              title: "Identify payment brand and acquirer assessment requirements",
              control: "PCI-DSS v4.0",
              how: "Determine the specific requirements from your payment brands (Visa, Mastercard, Amex) and acquiring banks regarding assessment type, frequency, and submission deadlines.",
              check: "Payment brand requirement matrix with assessment deadlines and submission procedures for each applicable payment brand"
            },
            {
              title: "Plan assessment timeline and resource allocation",
              control: "PCI-DSS v4.0",
              how: "Develop a comprehensive timeline for the assessment process including preparation activities, evidence gathering, QSA engagement, testing phases, and report submission deadlines.",
              check: "Assessment project plan with milestones, resource assignments, and critical path identified for on-time completion"
            }
          ]
        },
        {
          day: 2,
          title: "Compliance Validation Testing",
          tasks: [
            {
              title: "Execute pre-assessment control validation testing",
              control: "All Requirements",
              how: "Systematically test each PCI-DSS control to verify it is operating as designed before the formal assessment. Use the ROC testing procedures as a guide for internal validation testing.",
              check: "Pre-assessment testing completed for all 12 requirements with results documented and issues addressed"
            },
            {
              title: "Validate all technical testing procedures",
              control: "Requirement 11",
              how: "Execute all technical testing requirements including internal and external vulnerability scans, wireless access point detection, segmentation testing, and penetration testing.",
              check: "All technical testing procedures completed with current results and evidence of any remediation for identified issues"
            },
            {
              title: "Verify administrative controls and documentation completeness",
              control: "Requirement 12",
              how: "Review all administrative controls including policies, procedures, risk assessments, and organizational structures to ensure they meet PCI-DSS requirements and are current.",
              check: "Administrative control validation showing all required policies exist, are current, and have management approval"
            },
            {
              title: "Test incident response and business continuity procedures",
              control: "Requirement 12.10",
              how: "Conduct an incident response tabletop exercise and review business continuity plans to ensure they address cardholder data breach scenarios and meet PCI-DSS requirements.",
              check: "Incident response exercise completed with documented lessons learned and gaps identified in response procedures"
            },
            {
              title: "Perform final compliance gap closure",
              control: "All Requirements",
              how: "Address any remaining compliance gaps identified during validation testing. Prioritize critical and high-risk items and document compensating controls where direct compliance is not achievable.",
              check: "Final gap closure report showing all critical items resolved and compensating controls documented for remaining exceptions"
            }
          ]
        },
        {
          day: 3,
          title: "Annual Assessment Requirements",
          tasks: [
            {
              title: "Understand annual assessment cycle and deadlines",
              control: "PCI-DSS v4.0",
              how: "Map the annual assessment cycle including assessment window, report submission deadlines, and ongoing compliance maintenance activities. Ensure alignment with payment brand and acquirer requirements.",
              check: "Annual assessment calendar with all key dates, deadlines, and recurring activities documented and communicated to stakeholders"
            },
            {
              title: "Plan quarterly internal scan and annual external scan schedules",
              control: "Requirement 11.3",
              how: "Establish a recurring schedule for quarterly internal vulnerability scans and ensure external scans through an Approved Scanning Vendor (ASV) are scheduled and completed on time each quarter.",
              check: "Quarterly scan schedule documented with ASV engagement and internal scan calendar for the full year"
            },
            {
              title: "Designate compliance monitoring roles and responsibilities",
              control: "Requirement 12.6",
              how: "Assign ongoing compliance monitoring responsibilities to designated personnel. Ensure there is a PCI-DSS compliance owner who tracks compliance status, manages exceptions, and coordinates assessment activities.",
              check: "Compliance organizational chart with named individuals responsible for each requirement area and monitoring cadence"
            },
            {
              title: "Implement continuous compliance monitoring processes",
              control: "Requirement 10",
              how: "Deploy automated compliance monitoring tools and processes that continuously assess security control effectiveness. Implement dashboards for tracking compliance posture across all requirement areas.",
              check: "Continuous monitoring implementation with dashboards tracking compliance status for key indicators across all 12 requirements"
            },
            {
              title: "Create annual compliance program review process",
              control: "Requirement 12.11",
              how: "Establish an annual review process that evaluates the effectiveness of the PCI-DSS compliance program, identifies improvements, and updates policies and procedures to address changes in the environment.",
              check: "Annual compliance review process documented with last review findings and improvement actions tracked to completion"
            }
          ]
        },
        {
          day: 4,
          title: "Common Compliance Gaps",
          tasks: [
            {
              title: "Review top PCI-DSS compliance failures and root causes",
              control: "All Requirements",
              how: "Research and analyze common PCI-DSS compliance failures reported by QSAs and industry studies. Identify root causes such as inadequate segmentation, weak access controls, and insufficient logging.",
              check: "Top 10 compliance gap analysis with root causes identified and mapped to your organization's risk profile"
            },
            {
              title: "Evaluate wireless security compliance gaps",
              control: "Requirement 11.2",
              how: "Review common wireless security failures including rogue access point detection, unauthorized wireless devices, and weak wireless encryption. Assess current wireless security controls against PCI-DSS requirements.",
              check: "Wireless security assessment identifying current gaps in rogue AP detection and wireless network monitoring"
            },
            {
              title: "Assess third-party service provider compliance gaps",
              control: "Requirement 12.8",
              how: "Evaluate common gaps in third-party service provider management including incomplete service provider inventories, missing compliance validation, and inadequate contractual requirements.",
              check: "Third-party provider compliance assessment with gap analysis and remediation plan for identified deficiencies"
            },
            {
              title: "Review access control and authentication common failures",
              control: "Requirements 7, 8",
              how: "Analyze common access control failures such as shared accounts, excessive privileges, weak passwords, and MFA implementation gaps. Compare against your organization's current access control posture.",
              check: "Access control gap assessment with specific findings and remediation priorities for authentication and authorization weaknesses"
            },
            {
              title: "Analyze logging and monitoring gap patterns",
              control: "Requirement 10",
              how: "Review common logging and monitoring failures including incomplete log coverage, insufficient log retention, lack of log review, and inadequate alerting for security events.",
              check: "Logging gap assessment documenting missing log sources, retention shortfalls, and monitoring blind spots with remediation plan"
            }
          ]
        },
        {
          day: 5,
          title: "Remediation Planning",
          tasks: [
            {
              title: "Develop a prioritized PCI-DSS remediation roadmap",
              control: "All Requirements",
              how: "Create a comprehensive remediation roadmap that prioritizes gaps by risk severity and compliance impact. Include quick wins, medium-term improvements, and long-term strategic initiatives with defined timelines.",
              check: "Remediation roadmap with prioritized milestones, assigned owners, and target completion dates for all identified gaps"
            },
            {
              title: "Create compensating control documentation for unachievable requirements",
              control: "PCI-DSS v4.0",
              how: "For requirements that cannot be met through direct controls, develop compensating control documentation that demonstrates equivalent security through alternative measures with proper risk justification.",
              check: "Compensating control worksheets completed with risk analysis, control description, and monitoring plan for each exception"
            },
            {
              title: "Build a compliance maintenance and sustainability plan",
              control: "All Requirements",
              how: "Design a sustainable compliance maintenance plan that integrates PCI-DSS requirements into ongoing IT operations, change management, and security programs to prevent compliance drift.",
              check: "Sustainability plan with integration points into IT operations and documented procedures for maintaining continuous compliance"
            },
            {
              title: "Develop compliance training and awareness program",
              control: "Requirement 12.6",
              how: "Create a PCI-DSS-specific training program for technical staff, developers, and management. Include role-based training modules, assessment quizzes, and annual refresher requirements.",
              check: "Training program curriculum developed with role-based modules and plan for annual delivery and completion tracking"
            },
            {
              title: "Finalize PCI-DSS compliance program maturity assessment",
              control: "Requirement 12.5",
              how: "Conduct a maturity assessment of the overall PCI-DSS compliance program. Evaluate process maturity, documentation completeness, tool effectiveness, and organizational readiness for sustained compliance.",
              check: "Compliance maturity assessment completed with maturity levels assigned for each process area and improvement targets defined"
            }
          ]
        }
      ]
    }
  ]
};

export default function PciDss() {
  return <LearningFrameworkPage framework={FRAMEWORK} />;
}
