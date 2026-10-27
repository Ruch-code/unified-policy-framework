import { RiskCrossCheckBlock } from "../../components/riskAssessment/RiskCrossCheck.jsx";
import LearningFrameworkPage from "../../components/LearningFrameworkPage.jsx";

const FRAMEWORK = {
  id: "nis2",
  name: "NIS2 Directive (EU 2022/2555) Compliance",
  color: "blue",
  region: "European Union",
  flag: "🇪🇺",
  flagAnimation: "float",
  basePath: "/nis2",
  referenceUrl: "https://eur-lex.europa.eu/eli/dir/2022/2555/oj",
  weeks: [
    {
      week: 1,
      title: "L1 Foundation: NIS2 Scope, Governance & Registration",
      days: "Days 1-7",
      description:
        "Determine NIS2 applicability, register as essential/important entity, and establish cybersecurity governance per Articles 20-21.",
      tasks: [
        {
          title: "Determine NIS2 Applicability & Entity Classification",
          control: "NIS2 Articles 2-3 - Scope & Definitions",
          how: "Assess if organization falls within NIS2 scope: Essential Entities (Energy, Transport, Banking, Financial Market Infrastructure, Health, Drinking Water, Waste Water, Digital Infrastructure, ICT Service Management, Public Administration, Space) or Important Entities (Postal, Courier, Waste, Chemicals, Food, Manufacturing, Digital Providers, Research). Check size thresholds: Essential (>250 employees OR €50M turnover), Important (>50 employees OR €10M turnover). Document classification with evidence.",
          check: "NIS2 classification determined with legal review, size thresholds verified, classification documented, and board informed."
        },
        {
          title: "Register with Competent Authority",
          control: "NIS2 Article 24 - Registration",
          how: "Register with national competent authority (e.g., ANSSI France, BSI Germany, ACN Italy, CCB Belgium, NCSC Netherlands, CNCS Portugal, INCIBE Spain, ENISA coordination). Provide: entity details, sector, services, contact points, IP ranges, DNS domains. Deadline: 17 October 2024 (existing entities), immediate for new. Maintain registration updates.",
          check: "Registration completed with competent authority, confirmation received, contact points designated, and update process established."
        },
        {
          title: "Establish Cybersecurity Governance & Management Body Accountability",
          control: "NIS2 Articles 20-21 - Governance & Risk Management",
          how: "Implement: Management body (Board/Executive) accountability for cybersecurity (Art. 20). Mandatory training for management body on cyber risks (Art. 21.1). Approve cybersecurity risk management measures (Art. 21.2). Define risk management framework: risk appetite, methodology (ISO 27005, NIST 800-30), risk register, treatment, reporting. Integrate with enterprise risk management (ERM).",
          check: "Management body accountability documented, training completed, risk framework approved, and integrated with ERM."
        },
        {
          title: "Map NIS2 Requirements to Existing Controls (Gap Analysis)",
          control: "NIS2 Article 21 - Cybersecurity Risk Management Measures",
          how: "Map Article 21 measures to current controls: (a) risk analysis & ISMS, (b) incident handling, (c) business continuity, (d) supply chain security, (e) access control & authentication, (f) encryption, (g) vulnerability management, (h) cybersecurity training, (i) policies & procedures. Use ENISA NIS2 mapping to ISO 27001, NIST CSF. Document gaps with remediation plan.",
          check: "Gap analysis complete for all Art. 21 measures, mapped to existing frameworks, gaps prioritized, and remediation plan approved."
        }
      ]
    },
    {
      week: 2,
      title: "L2 Implementation: Core Cybersecurity Measures (Art. 21)",
      days: "Days 8-14",
      description:
        "Implement NIS2 Article 21 cybersecurity risk management measures: risk management, incident handling, business continuity, supply chain.",
      tasks: [
        {
          title: "Implement Risk Analysis & Information Security Management System",
          control: "NIS2 Article 21(a) - Risk Analysis & ISMS",
          how: "Establish ISMS aligned with ISO 27001 or NIST CSF. Conduct asset inventory (hardware, software, data, services). Perform risk assessment: identify threats (ransomware, supply chain, insider, APT, DDoS), vulnerabilities, likelihood, impact. Define risk treatment: accept, mitigate, transfer, avoid. Document Statement of Applicability. Implement continuous risk monitoring (threat intel, vuln scanning, asset changes).",
          check: "ISMS operational, asset inventory >95% complete, risk register current, treatment plans tracked, and continuous monitoring active."
        },
        {
          title: "Implement Incident Handling & Reporting (Art. 23)",
          control: "NIS2 Article 23 - Incident Reporting",
          how: "Establish incident response: detection (SIEM, SOC, threat hunting), classification (significant vs. non-significant per Art. 23.2), containment, eradication, recovery, lessons learned. Reporting timelines: Early warning (24h), Incident notification (72h), Final report (1 month). Significant incident criteria: severe operational disruption, financial impact, cross-border impact. Coordinate with CSIRT/Competent Authority. Test via exercises.",
          check: "IR plan documented with NIS2 classification, 24h/72h/1month reporting tested, CSIRT contact established, and quarterly exercises completed."
        },
        {
          title: "Implement Business Continuity & Crisis Management",
          control: "NIS2 Article 21(c) - Business Continuity",
          how: "Align with ISO 22301: BIA for essential/important services, define RTO/RPO for critical services, implement redundancy (geographic, cloud, alternate sites), crisis management team with authority, communication plans (internal, authority, public, customers), regular testing (tabletop, functional, full-scale). Ensure continuity of essential services during incidents.",
          check: "BCIA complete for essential services, RTO/RPO defined, crisis team designated, communication templates ready, and annual full-scale test completed."
        },
        {
          title: "Implement Supply Chain Security (Art. 21(d))",
          control: "NIS2 Article 21(d) - Supply Chain Security",
          how: "Map critical suppliers (ICT, cloud, managed services, OT vendors). Assess supplier cyber risk: questionnaires, certifications (ISO 27001, SOC 2), security ratings. Contractual requirements: security standards, incident notification (24h), right to audit, sub-processor control, exit clauses. Ongoing monitoring: security ratings, breach monitoring, annual reassessment. Concentration risk analysis.",
          check: "Critical supplier map complete, risk assessments done for top 20, contractual clauses in new contracts, monitoring active, and concentration risk documented."
        }
      ]
    },
    {
      week: 3,
      title: "L3 Implementation: Technical Measures & Compliance Operations",
      days: "Days 15-21",
      description:
        "Implement technical measures: access control, encryption, vulnerability management, training. Establish compliance operations and audit readiness.",
      tasks: [
        {
          title: "Implement Access Control, Authentication & Encryption",
          control: "NIS2 Article 21(e)-(f) - Access Control & Encryption",
          how: "Implement: Zero Trust architecture (verify explicitly, least privilege, assume breach), MFA for all remote/admin/cloud access, PAM for privileged accounts, IAM lifecycle (joiners/movers/leavers), quarterly access reviews. Encryption: data at rest (AES-256), in transit (TLS 1.3), key management (HSM, rotation), certificate management. Document in cryptographic policy.",
          check: "Zero trust architecture deployed, MFA 100% for privileged/remote, PAM for all admin access, quarterly reviews completed, encryption policy enforced, and key management audited."
        },
        {
          title: "Implement Vulnerability Management & Patch Management",
          control: "NIS2 Article 21(g) - Vulnerability Handling",
          how: "Establish: continuous vulnerability scanning (internal/external, authenticated), asset-based prioritization (CVSS + exploitability + asset criticality), SLAs: Critical 24h, High 7d, Medium 30d, Low 90d. Patch management: testing, deployment, verification, rollback. Threat intelligence integration (CISA KEV, vendor advisories). Exception process with risk acceptance. Report metrics to management.",
          check: "Vuln scanning continuous, SLA compliance >95%, patch management automated, threat intel integrated, and exceptions tracked with risk acceptance."
        },
        {
          title: "Implement Cybersecurity Training & Awareness Program",
          control: "NIS2 Article 21(h) - Cybersecurity Training",
          how: "Mandatory training: all staff (annual, phishing simulation), specialized roles (developers: secure coding, admins: hardening, IR team: advanced), management body (cyber risk oversight). Content: NIS2 obligations, incident reporting, social engineering, secure remote work, supply chain risks. Track completion >95%. Measure effectiveness: phishing click rates, incident reporting rates.",
          check: "Training program delivered, completion >95%, phishing simulation quarterly, specialized training for roles, and effectiveness metrics tracked."
        },
        {
          title: "Document Policies, Procedures & Prepare for Supervision",
          control: "NIS2 Article 21(i) - Policies & Supervision Readiness",
          how: "Document policy framework: Cybersecurity Policy, Incident Response, Business Continuity, Supply Chain, Access Control, Encryption, Vulnerability Management, Training, Acceptable Use. Procedure library with work instructions. Prepare for supervision: competent authority audits (Art. 30), self-assessments, evidence packages, designated contact points, cooperation procedures. Implement metrics dashboard for supervisory reporting.",
          check: "All policies documented and approved, procedure library complete, supervision readiness package prepared, contact points tested, and metrics dashboard live."
        }
      ]
    },
    {
      week: 4,
      title: "L4 Maturity: Continuous Compliance, Resilience & Ecosystem",
      days: "Days 22-28",
      description:
        "Achieve continuous NIS2 compliance, enhance cyber resilience, and engage with national/EU cyber ecosystem.",
      tasks: [
        {
          title: "Establish Continuous NIS2 Compliance Monitoring",
          control: "NIS2 Articles 21, 30 - Continuous Compliance & Supervision",
          how: "Implement: automated control monitoring (CSPM, SIEM, IAM, Vuln Mgmt), compliance dashboard (Art. 21 measures mapped to controls), quarterly self-assessment against Art. 21, annual internal audit, management review (quarterly), regulatory change tracking (NIS2 implementing acts, sector-specific rules, ENISA guidelines). Prepare for competent authority audits: evidence packages, walkthrough readiness.",
          check: "Automated monitoring >90% coverage, quarterly self-assessments completed, internal audit annual, management review quarterly, and audit readiness confirmed."
        },
        {
          title: "Enhance Cyber Resilience: Testing, Red Teaming & Threat Intel",
          control: "NIS2 Article 21 - Resilience Enhancement",
          how: "Advance resilience: annual red team exercise (simulated APT/ransomware), purple teaming (quarterly), breach & attack simulation (BAS) continuous, threat hunting program (monthly), cyber ranges for OT/IT convergence, supply chain stress testing, crisis simulation with management body. Integrate ENISA threat landscape reports.",
          check: "Red team annual, purple team quarterly, BAS continuous, threat hunting monthly, crisis simulation with board annual, and OT/IT exercises conducted."
        },
        {
          title: "Engage with National & EU Cyber Ecosystem",
          control: "NIS2 Articles 7, 8, 10 - Cooperation & Information Sharing",
          how: "Participate in: national CSIRT community, sector-specific ISACs, ENISA Cyber Crisis Cooperation (CyCLONe), EU vulnerability database (EUVD), coordinated vulnerability disclosure (CVD), threat intelligence sharing (MISP, TAXII), joint exercises (Cyber Europe), regulatory dialogue. Designate Single Point of Contact (SPOC) for cross-border incidents.",
          check: "CSIRT/ISAC membership active, threat sharing operational, CVD process established, SPOC designated, and participation in EU exercises documented."
        },
        {
          title: "NIS2 Maturity Assessment & Multi-Year Roadmap",
          control: "Organizational NIS2 Maturity",
          how: "Assess maturity across 5 levels per Art. 21 measure: Initial, Developing, Defined, Managed, Optimized. Use ENISA maturity model or custom. Benchmark against sector peers. Create 3-year roadmap: Year 1 (compliance), Year 2 (resilience), Year 3 (optimization). Executive sponsorship, budget allocation, KPI tracking (incident MTTR, vuln SLA, training %, supplier coverage, exercise frequency).",
          check: "Maturity baseline established, 3-year roadmap approved with budget, KPIs tracked monthly, and executive sponsorship visible."
        }
      ]
    }
  ],
};

export default function Nis2Page() {
  return (
    <>
      <LearningFrameworkPage framework={FRAMEWORK} />
      <RiskCrossCheckBlock frameworkId="nis2" />
    </>
  );
}

export { FRAMEWORK };