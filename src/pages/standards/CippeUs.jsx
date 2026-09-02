import LearningFrameworkPage from "../../components/LearningFrameworkPage";

const FRAMEWORK = {
  id: 'cippe-us',
  name: 'CIPPE/US - Critical Infrastructure Protection (US)',
  region: 'United States',
  color: 'blue',
  weeks: [
    {
      week: 1,
      title: 'Foundation: Sectors, CISA Guidance & Risk Assessment',
      days: 'Days 1-7',
      description: 'Understand US critical infrastructure sectors, CISA frameworks, NIST 800-53/82, and identify critical assets',
      tasks: [
        {
          title: 'Identify your critical infrastructure sector and dependencies',
          control: 'US has 16 critical infrastructure sectors designated by Presidential Policy Directive 21 (PPD-21): Energy, Water, Transportation, Healthcare, Financial Services, Communications, Chemical, Commercial Facilities, Dams, Defence Industrial Base, Emergency Services, Food/Agriculture, Government Facilities, Information Technology, Nuclear Reactors/Materials, Transportation Systems',
          how: 'Map your organisation to the applicable sector(s): (1) Identify primary sector — e.g. Energy (electricity, oil/gas), (2) Identify dependent sectors — e.g. Energy depends on IT, Communications, Water, (3) Map interdependencies using CISA Critical Infrastructure Mapping tool, (4) Document in a critical infrastructure dependency register. For cloud environments, identify which cloud services support sector-critical workloads — e.g. AWS GovCloud for DoD, Azure Government for healthcare (HIPAA), GCP for financial services.',
          check: 'Primary and dependent sectors identified, interdependency map documented, cloud services mapped to sector-critical workloads, dependency register reviewed by sector SME, annual sector dependency review scheduled.'
        },
        {
          title: 'Conduct risk assessment per NIST 800-53 Rev 5 and NIST SP 800-82',
          control: 'NIST 800-53 Rev 5 provides security and privacy controls. NIST SP 800-82 Rev 3 covers ICS/OT security. Combined they form the baseline for critical infrastructure cybersecurity risk assessment.',
          how: 'Perform risk assessment: (1) Identify all critical assets — IT and OT/ICS systems, (2) Use NIST SP 800-82 for OT-specific risk assessment methodology, (3) Apply NIST 800-53 control families (AC, AT, AU, CA, CM, CP, IA, IR, MA, MP, PE, PL, PM, PS, PT, RA, SA, SC, SI, SR), (4) Score risks using likelihood × impact, (5) For multi-cloud, assess cloud-specific risks — e.g. AWS shared responsibility model for OT workloads, Azure IoT Hub for industrial IoT, GCP Anthos for hybrid OT/IT environments. Separate risk registers for production (OT-critical), staging (non-production OT), and development (IT-only).',
          check: 'Risk assessment completed using NIST 800-82 methodology, all 16 applicable control families evaluated, OT and IT risks assessed separately, cloud-specific risks documented, risk register with ≥30 risks scored, production risks reviewed by CISO.'
        },
        {
          title: 'Map critical assets and interdependencies',
          control: 'Asset management is foundational — CISA CRR (Cyber Resilience Review) requires comprehensive asset inventory including hardware, software, OT/ICS components, and network connections.',
          how: 'Build comprehensive asset inventory: (1) IT assets via AWS Systems Manager, Azure Arc, GCP VM Inventory, (2) OT/ICS assets via network scanning (e.g. Claroty, Nozomi Networks, Dragos) — PLCs, SCADA, historians, (3) Network topology mapping including IT/OT boundaries, (4) Cloud asset inventory via AWS Config, Azure Resource Graph, GCP Cloud Asset Inventory. Classify assets by criticality: Mission-critical (production), Business-critical (staging), Non-critical (development). Document all cross-environment connections.',
          check: 'IT and OT asset inventory complete, network topology documented, IT/OT boundary identified, cloud assets inventoried across all three environments, asset criticality classification completed, asset inventory updated monthly.'
        },
        {
          title: 'Establish sector-specific regulatory mapping',
          control: 'Sector-specific regulations: NERC CIP (Energy), TSA Security Directives (Pipelines), EPA (Water), HIPAA (Healthcare), FISMA (Federal), DFARS/CMMC (Defence). Each maps to NIST 800-53 controls.',
          how: 'Build regulatory compliance matrix: (1) Identify all applicable sector regulations, (2) Map each regulation to NIST 800-53 controls, (3) Identify gaps between current posture and regulatory requirements, (4) For cloud environments, verify cloud provider compliance — AWS FedRAMP authorization, Azure Government HIPAA BAAs, GCP FedRAMP Moderate. Document compliance status per environment: production must meet all regulatory requirements, staging for testing, development for policy evaluation.',
          check: 'All applicable sector regulations identified, NIST 800-53 control mapping complete, cloud provider compliance verified (FedRAMP/HIPAA BAA), compliance gaps documented with remediation plan, regulatory compliance matrix reviewed by legal team.'
        },
        {
          title: 'Define cybersecurity governance for critical infrastructure',
          control: 'NIST CSF 2.0 GV function + CISA Cross-Sector Cyber Performance Goals (CPGs) + CISA CRR Level 1 governance requirements',
          how: 'Establish governance: (1) Define cybersecurity governance structure — board oversight, CISO role, risk committee, (2) Implement CISA Cross-Sector CPGs as minimum security baseline, (3) Align governance to CISA CRR assessment framework, (4) For cloud environments, define cloud governance: AWS Organizations SCPs for policy enforcement, Azure Management Groups for hierarchical control, GCP Organization Policies. Separate governance tiers: production (strict controls, change approval), staging (moderate controls, team lead approval), development (flexible controls, developer self-service with guardrails).',
          check: 'Governance charter established, CISA CPGs adopted as baseline, cloud governance implemented via policy-as-code, governance tiers defined per environment, board receives quarterly cybersecurity briefing, CRR assessment baseline established.'
        }
      ]
    },
    {
      week: 2,
      title: 'Implementer: Protective Measures, OT/IT Segmentation & Cyber Hygiene',
      days: 'Days 8-14',
      description: 'Deploy protective controls, implement OT/IT network segmentation, and establish cyber hygiene practices per CISA guidance',
      tasks: [
        {
          title: 'Implement OT/IT network segmentation',
          control: 'CISA recommends Purdue Model segmentation for ICS environments. NIST SP 800-82 Rev 3 requires network architecture separation between enterprise and control networks.',
          how: 'Deploy segmentation: (1) Implement Purdue Model — Level 0 (process), Level 1 (PLC/RTU), Level 2 (HMI/SCADA), Level 3 (operations), Level 3.5 (DMZ), Level 4/5 (enterprise/cloud), (2) Use AWS Transit Gateway with route tables for IT/OT separation, (3) Azure Network Virtual Appliances with forced tunneling, (4) GCP Cloud Interconnect with dedicated connections, (5) Unidirectional gateways for OT-to-IT data flow. Implement micro-segmentation for cloud-hosted OT monitoring — e.g. AWS PrivateLink for historian data, Azure IoT Hub for OT telemetry, GCP Pub/Sub for SCADA alerts. Production OT network: strict segmentation, no internet access. Staging OT: limited internet for updates. Development: controlled internet access.',
          check: 'Purdue Model implemented, OT network has no direct internet access, DMZ operational, cloud OT monitoring via PrivateLink/IoT Hub, segmentation tested with port scanning, no unauthorised connections between OT and IT networks, segmentation rules reviewed quarterly.'
        },
        {
          title: 'Deploy access control with MFA and privileged access management',
          control: 'CISA CPG PR.AC (Access Control) requires MFA for all privileged and remote access. NIST 800-53 AC-2, AC-6, IA-2 require identity management and least privilege.',
          how: 'Implement access controls: (1) MFA enforced for all production and OT access — AWS IAM MFA, Azure AD Conditional Access, GCP IAP, (2) Privileged Access Management — AWS SSM Session Manager for no-SSH access, Azure PIM for just-in-time elevation, GCP IAP TCP forwarding, (3) OT-specific — enforce MFA for all HMI/SCADA access, use bastion hosts for OT management, (4) Separate access tiers: production (MFA + PAM + device check), staging (MFA + PAM), development (MFA only). Regular access reviews — production monthly, staging quarterly, development semi-annually.',
          check: 'MFA enforced for all privileged accounts, PAM configured for production access, OT access controlled via bastion hosts, access reviews completed on schedule, no shared accounts in production, least privilege enforced via policy-as-code.'
        },
        {
          title: 'Implement vulnerability management for IT and OT systems',
          control: 'CISA CPG RA.VP (Vulnerability Management) + NIST 800-53 RA-5 (Vulnerability Monitoring and Scanning) + ICS-CERT advisories for OT-specific vulnerabilities',
          how: 'Deploy vulnerability management: (1) IT — AWS Inspector, Azure Defender, GCP Vulnerability Assessment for automated scanning, (2) OT — passive vulnerability scanning (Nozomi, Dragos) to avoid disrupting OT systems, (3) Subscribe to ICS-CERT advisories for OT-specific CVEs, (4) Implement risk-based patching: production critical (72h), production high (7 days), staging (14 days), development (30 days). OT patching requires maintenance window coordination with operations team. Maintain compensating controls register for unpatched OT systems — e.g. network segmentation, application whitelisting.',
          check: 'IT vulnerability scanning weekly, OT passive scanning continuous, ICS-CERT advisory subscription active, patch SLAs met for ≥95% of critical vulnerabilities, compensating controls documented for unpatched OT, vulnerability age tracked and reported monthly.'
        },
        {
          title: 'Secure remote access for OT/IT environments',
          control: 'CISA CPG PR.AC-5 (Network Restrictions) + NIST 800-53 AC-17 (Remote Access) + TSA Security Directive requirements for pipeline remote access',
          how: 'Implement secure remote access: (1) VPN with MFA for all remote IT access — AWS Client VPN, Azure VPN Gateway, GCP Cloud VPN, (2) OT remote access via dedicated jump hosts with session recording, (3) Zero-trust network access (ZTNA) — AWS Verified Access, Azure AD Application Proxy, GCP BeyondCorp Enterprise, (4) Disable all direct remote access to OT systems. Implement privileged access workstations (PAWs) for OT management. For cloud-hosted OT monitoring, use AWS SSM with session logging, Azure Bastion with JIT access, GCP Identity-Aware Proxy.',
          check: 'No direct remote access to OT systems, jump hosts operational for OT management, ZTNA implemented for cloud access, session recording enabled, all remote access logged and monitored, PAWs deployed for OT administration.'
        },
        {
          title: 'Establish supply chain risk management per CISA guidance',
          control: 'CISA CPG ID.SC (Supply Chain) + NIST 800-53 SR family (System and Communications Protection) + EO 14028 (Improving Cybersecurity) SBOM requirements',
          how: 'Implement supply chain security: (1) Require SBOMs from all software vendors, (2) Tier vendors by criticality — Tier 1 (cloud providers, OT vendors), Tier 2 (IT service providers), Tier 3 (non-critical), (3) Assess Tier 1 vendors annually — review AWS Artifact, Azure Service Trust Portal, GCP Compliance Reports, (4) Include cybersecurity requirements in procurement contracts — CISA CPGs, NIST 800-53 controls, SBOM delivery. For OT supply chain, verify ICS vendor patch availability and support lifecycle. Maintain approved vendor list for production vs staging vs development.',
          check: 'SBOMs collected for top 10 software dependencies, Tier 1 vendors assessed, cloud provider compliance verified, OT vendor patch lifecycle documented, supply chain security requirements in procurement contracts, vendor risk register updated quarterly.'
        }
      ]
    },
    {
      week: 3,
      title: 'Verifier: Detection, OT Monitoring & Incident Response',
      days: 'Days 15-21',
      description: 'Validate detection capabilities, OT monitoring, vulnerability management, and test incident response procedures',
      tasks: [
        {
          title: 'Validate OT monitoring and detection capabilities',
          control: 'CISA CPG DE.CM (Continuous Monitoring) + NIST 800-82 Rev 3 monitoring requirements + ICS-CERT detection recommendations',
          how: 'Test OT monitoring: (1) Deploy OT network monitoring — Claroty, Nozomi Networks, or Dragos for passive traffic analysis, (2) Verify OT alerts flow to SOC — AWS CloudWatch + Lambda for alert forwarding, Azure Sentinel for OT connector, GCP Chronicle for OT logs, (3) Test detection scenarios: unauthorised PLC change, OT network scan, anomalous Modbus/DNP3 traffic, (4) Measure OT MTTD (mean time to detect) and validate SOC can triage OT alerts. Separate monitoring: production OT (real-time alerting), staging OT (periodic review), development OT (log collection only).',
          check: 'OT monitoring deployed and operational, OT alerts flowing to SOC, ≥5 OT detection scenarios tested, OT MTTD documented, SOC staff trained on OT alert triage, OT monitoring coverage validated quarterly.'
        },
        {
          title: 'Test incident response with OT-specific scenarios',
          control: 'CISA CPG RS.RP (Response Planning) + NIST 800-82 Rev 3 incident response for ICS + CISA Ransomware Guidance for critical infrastructure',
          how: 'Conduct OT-focused IR testing: (1) Tabletop exercise: ransomware affecting production OT systems, (2) Include IT, OT operations, safety team, legal, communications, leadership, (3) Test OT-specific playbooks: PLC compromise, SCADA breach, historian data manipulation, (4) Validate communication flows to CISA (1-888-282-0870), sector ISAC (e.g. E-ISAC for energy), law enforcement (FBI Cyber Division). Test backup and recovery for OT: offline backups of PLC programs, SCADA configurations, historian databases. Production incident: immediate safety assessment, staging: coordinated response, development: IT-led response.',
          check: 'OT tabletop completed quarterly, OT-specific IR playbook documented, CISA and ISAC notification procedures tested, OT backup recovery tested, safety-first protocol documented, incident response plan updated with lessons learned.'
        },
        {
          title: 'Assess vulnerability management effectiveness',
          control: 'CISA CPG RA.VP (Vulnerability Management) + NIST 800-53 RA-5 assessment requirements + CISA CRR vulnerability management process',
          how: 'Validate vulnerability management: (1) Audit patch compliance — measure % of critical vulnerabilities patched within SLA across IT and OT, (2) Review compensating controls for unpatched OT systems, (3) Verify ICS-CERT advisory review process is operational, (4) Test patching in staging before production — deploy patches in staging OT environment, monitor for impact, then schedule production maintenance window. For cloud environments, validate automated patching — AWS Systems Manager Patch Manager, Azure Update Management, GCP OS Patch Management. Track vulnerability age from discovery to remediation.',
          check: 'Patch compliance ≥95% for critical IT, ≥85% for critical OT, compensating controls documented for all unpatched OT, staging-first patching verified, automated patching configured on cloud environments, vulnerability age trending downward.'
        },
        {
          title: 'Evaluate supply chain security for critical components',
          control: 'CISA CPG ID.SC (Supply Chain) + NIST 800-53 SR-3 (Supply Chain Controls) + EO 14028 SBOM requirements',
          how: 'Audit supply chain: (1) Verify SBOMs are current and complete for all Tier 1 vendors, (2) Assess OT vendor security posture — verify ICS vendor cybersecurity practices, (3) Test supplier notification process — can vendor notify you within 24 hours of a critical vulnerability, (4) Review cloud provider supply chain — AWS Nitro System security, Azure Cerberus, Google Titan chips. For multi-cloud, verify each provider\'s incident notification SLA. Production: all Tier 1 vendors must have current SBOM and security attestation. Staging: Tier 1 and 2. Development: Tier 1 only.',
          check: 'SBOMs verified current, OT vendor security assessed, supplier notification process tested, cloud provider security verified, supply chain risk register updated, annual supply chain audit completed.'
        },
        {
          title: 'Conduct detection and response readiness assessment',
          control: 'CISA CRR (Cyber Resilience Review) assessment + NIST 800-53 controls assessment procedures + CISA assessment tools',
          how: 'Perform readiness assessment: (1) Use CISA CRR self-assessment tool for overall capability measurement, (2) Conduct internal audit of detection controls — verify all CISA CPG DE controls are operational, (3) Test SOC response times — measure time from alert to triage to resolution, (4) Validate detection coverage across all environments: production (full detection), staging (key detection), development (log collection). Use CISA tabletop exercise materials. Benchmark against industry CRR scores.',
          check: 'CISA CRR self-assessment completed, detection controls audited, SOC response times documented, detection coverage mapped per environment, CRR score benchmarked against industry, improvement plan documented.'
        }
      ]
    },
    {
      week: 4,
      title: 'Certified: Multi-Cloud Controls, Compliance Integration & Maturity',
      days: 'Days 22-28',
      description: 'Deploy multi-cloud security controls, integrate with sector compliance requirements, and achieve maturity',
      tasks: [
        {
          title: 'Implement multi-cloud security controls for critical infrastructure',
          control: 'CISA Cross-Sector CPGs applied across AWS, Azure, GCP, and Alibaba Cloud + NIST 800-53 controls for cloud environments (part 3)',
          how: 'Deploy unified multi-cloud security: (1) AWS — Security Hub + GuardDuty + Config Rules + SSM for automated remediation, (2) Azure — Defender for Cloud + Sentinel + Policy + Arc for hybrid OT, (3) GCP — Security Command Center + Chronicle + Config Validator + Anthos for hybrid, (4) Alibaba — Security Center + Threat Detection + Cloud Config for APAC workloads. Implement cloud-specific controls for critical infrastructure: production (full security stack, continuous monitoring), staging (moderate security, daily review), development (baseline security, weekly review). Use CSPM across all clouds for unified compliance scoring.',
          check: 'CSPM deployed on all four clouds, unified security dashboard operational, automated remediation configured and tested, cloud compliance scoring ≥90% across all environments, cross-cloud visibility into critical infrastructure workloads.'
        },
        {
          title: 'Integrate compliance across sector regulations',
          control: 'NERC CIP (Energy), TSA SD (Pipelines), HIPAA (Healthcare), FISMA (Federal), DFARS/CMMC (Defence) — unified compliance framework using NIST 800-53 as common baseline',
          how: 'Build unified compliance: (1) Map all sector regulations to common NIST 800-53 controls, (2) Implement shared evidence collection — AWS Audit Manager, Azure Compliance Manager, GCP Compliance Reports, (3) Automate compliance reporting per environment — production meets all regulatory requirements, staging for compliance testing, development for policy evaluation, (4) Prepare for sector-specific audits: NERC CIP audit for energy, TSA assessment for pipelines, HIPAA OCR audit for healthcare. Use CISA assessment tools for baseline measurement.',
          check: 'Unified compliance mapping complete, automated evidence collection operational, compliance dashboards produced monthly, regulatory audit preparation documented, compliance scores tracked per environment and trending positively.'
        },
        {
          title: 'Address renewables and energy-sector specific requirements',
          control: 'Energy sector requirements: NERC CIP-002 through CIP-014, DOE OE-417 reporting, FERC cybersecurity requirements, TSA Security Directives for pipelines, renewable energy ICS security',
          how: 'Implement energy-sector specific controls: (1) NERC CIP compliance — BES Cyber System categorization (High/Medium/Low), CIP-003 security management controls, CIP-005 electronic security perimeters, CIP-006 physical security, CIP-007 system security management, CIP-010 configuration change management, (2) For renewables (solar, wind) — secure SCADA systems, protect grid-connected inverters, implement remote monitoring security, (3) Cloud controls for energy sector: use FedRAMP-authorized cloud services for BES data (AWS GovCloud, Azure Government), implement network-level isolation. Production: full NERC CIP compliance, staging: CIP control testing, development: CIP policy evaluation.',
          check: 'NERC CIP categorization completed, CIP controls implemented per BES classification, renewable energy ICS security assessed, cloud services FedRAMP-authorized for BES data, DOE reporting procedures documented, TSA compliance verified for applicable assets.'
        },
        {
          title: 'Implement security automation and orchestration',
          control: 'CISA CPG DE.CM + DE.AE (Detection) + NIST 800-53 SI-4 (System Monitoring) automated response + CISA information sharing integration',
          how: 'Deploy security automation: (1) AWS — Lambda + EventBridge for auto-remediation (revoke public S3, disable unused IAM keys), (2) Azure — Sentinel SOAR playbooks for automated incident response, (3) GCP — Cloud Functions + Security Command Center for automated remediation, (4) Integrate with CISA — Automated Indicator Sharing (AIS) for threat intel, ISAC threat feeds. Implement auto-remediation for production (conservative, requires approval), staging (moderate auto-remediation), development (aggressive auto-remediation). Test all automation in staging before production deployment.',
          check: 'Auto-remediation configured for ≥5 common misconfigurations, SOAR playbooks operational, CISA AIS integration tested, staging-first deployment enforced, automation tested quarterly, production auto-remediation dry-run for 2 weeks before activation.'
        },
        {
          title: 'Achieve certification readiness and continuous improvement',
          control: 'CISA CRR final assessment + NIST 800-53 controls assessment + sector-specific certification preparation (NESA, NERC CIP, CMMC)',
          how: 'Final certification readiness: (1) Complete CISA CRR assessment and benchmark against industry, (2) Perform internal audit against all applicable NIST 800-53 controls, (3) Prepare for sector-specific certification — NERC CIP certification for energy, CMMC Level 2/3 for defence, (4) Document all evidence in GRC platform, (5) Build continuous improvement programme — quarterly metrics review, annual maturity assessment, threat intel integration. For multi-cloud, produce cloud-specific compliance attestations and shared responsibility documentation per environment.',
          check: 'CISA CRR score ≥ industry benchmark, internal audit completed, sector certification preparation documented, all evidence organized in GRC platform, continuous improvement programme established, management presentation prepared, CISO sign-off obtained.'
        }
      ]
    }
  ],
  milestones: [
    { day: 7, label: 'Foundation & Sector ID', color: 'blue' },
    { day: 14, label: 'Protective Controls Live', color: 'green' },
    { day: 21, label: 'Detection & Response Validated', color: 'orange' }
  ],
  referenceUrl: 'https://www.cisa.gov/'
};

export default function CippeUs() {
  return <LearningFrameworkPage framework={FRAMEWORK} />;
}
