import LearningFrameworkPage from "../../components/LearningFrameworkPage.jsx";

const FRAMEWORK = {
  id: "dora",
  name: "DORA (Digital Operational Resilience Act) - EU 2022/2554",
  color: "purple",
  region: "European Union",
  flag: "🇪🇺",
  flagAnimation: "pulse",
  basePath: "/dora",
  referenceUrl: "https://eur-lex.europa.eu/eli/reg/2022/2554/oj",
  weeks: [
    {
      week: 1,
      title: "L1 Foundation: DORA Scope, Governance & Register",
      days: "Days 1-7",
      description:
        "Determine DORA applicability for financial entities, establish ICT risk governance, and create the ICT third-party register.",
      tasks: [
        {
          title: "Determine DORA Applicability & Entity Classification",
          control: "DORA Articles 2-3 - Scope & Definitions",
          how: "Assess if organization is a financial entity: Credit institutions, Investment firms, Payment institutions, E-money institutions, Crypto-asset service providers (CASPs), Insurance/reinsurance undertakings, Insurance intermediaries, Reinsurance intermediaries, UCITS management companies, AIFMs, CSDs, Central counterparties, Trading venues, Trade repositories, Data reporting services, Credit rating agencies, Securitisation repositories, Crowdfunding service providers, IORPs. Include: ICT third-party service providers (critical/non-critical). Document classification.",
          check: "DORA applicability confirmed with legal, entity type classified, ICT third-party dependencies mapped, and board informed."
        },
        {
          title: "Establish ICT Risk Management Governance (Art. 5-6)",
          control: "DORA Articles 5-6 - ICT Risk Management Framework & Governance",
          how: "Implement: Management body accountability for ICT risk (Art. 5.1), dedicated ICT risk management function (Art. 5.2), ICT risk management framework integrated with enterprise risk (Art. 6). Framework elements: ICT risk identification, protection, detection, response, recovery (Art. 6.1). Define risk appetite, tolerance, methodology. Board approval of framework and annual review. ICT risk committee or equivalent.",
          check: "Management body accountability documented, ICT risk function established, framework approved by board, and integrated with ERM."
        },
        {
          title: "Create ICT Third-Party Register (Art. 28)",
          control: "DORA Article 28 - Register of Information",
          how: "Build register of all ICT third-party service providers: critical (support critical/important functions) vs. non-critical. For each: legal name, LEI, service description, criticality assessment, data processed, locations, subcontracting chain, contract reference, exit strategy status. Update continuously. Report to competent authority on request. Use standardized templates (EBA/EIOPA/ESMA guidelines).",
          check: "Register complete for all ICT third parties, criticality assessed, subcontracting chain mapped, and update process automated."
        },
        {
          title: "Conduct DORA Gap Analysis & Remediation Plan",
          control: "DORA Articles 5-16, 28-44 - Full Gap Analysis",
          how: "Map DORA requirements to current state: ICT Risk Management (Art. 5-11), Incident Reporting (Art. 12-17), Digital Operational Resilience Testing (Art. 18-27), ICT Third-Party Risk (Art. 28-44). Use EBA/EIOPA/ESMA RTS/ITS. Document gaps with remediation effort, timeline, owner. Prioritize: critical gaps (incident reporting, testing, critical provider contracts), high gaps (risk framework, register), medium gaps (policies, training). Executive sign-off.",
          check: "Gap analysis complete for all DORA articles, gaps prioritized with effort estimates, remediation plan approved, and budget allocated."
        }
      ]
    },
    {
      week: 2,
      title: "L2 Implementation: ICT Risk Management & Incident Reporting",
      days: "Days 8-14",
      description:
        "Implement ICT risk management framework (Art. 5-11) and incident reporting (Art. 12-17) with competent authority coordination.",
      tasks: [
        {
          title: "Implement ICT Risk Identification & Protection (Art. 7-8)",
          control: "DORA Articles 7-8 - ICT Risk Identification & Protection",
          how: "Asset inventory: hardware, software, network, data, ICT services (Art. 7.1). Identify critical/important functions (Art. 7.2). Risk assessment: threats (cyber, operational, third-party), vulnerabilities, impact on critical functions (Art. 7.3). Protection measures: network security (segmentation, firewalls), access control (MFA, PAM, least privilege), encryption (at rest/transit), change management, secure development (SDLC), physical security, backup/restore (Art. 8). Document in ICT risk register.",
          check: "Asset inventory >95% complete, critical functions identified, risk register current, protection measures implemented, and SDLC security integrated."
        },
        {
          title: "Implement ICT Detection, Response & Recovery (Art. 9-11)",
          control: "DORA Articles 9-11 - Detection, Response & Recovery",
          how: "Detection: continuous monitoring (SIEM, SOC, threat hunting), anomaly detection, vulnerability scanning, threat intelligence (Art. 9). Response: incident response plan (Art. 10), roles (CISO, IR lead, comms, legal), classification, containment, eradication, recovery, communication (internal, authority, customers), root cause analysis. Recovery: tested backup/restore, RTO/RPO per critical function, disaster recovery plan, crisis management (Art. 11).",
          check: "SOC/SIEM operational 24/7, IR plan tested quarterly, backup/restore tested monthly, RTO/RPO defined and met in tests, and crisis management ready."
        },
        {
          title: "Implement ICT Incident Reporting (Art. 12-17)",
          control: "DORA Articles 12-17 - Incident Reporting",
          how: "Classify incidents: major (Art. 12.2) - significant impact on critical functions, cross-border, reputational. Reporting: early warning (4h for major), intermediate (72h), final (1 month). Root cause, impact, lessons learned. Competent authority: national (e.g., CSSF Luxembourg, BaFin Germany, AMF France, DNB Netherlands, CNMV Spain, CONSOB Italy). Cross-border: lead authority coordination. Reporting template per RTS. Test reporting workflow.",
          check: "Incident classification defined, 4h/72h/1month reporting tested with authority, templates ready, cross-border process documented, and quarterly reporting drills completed."
        },
        {
          title: "Implement ICT Business Continuity & Crisis Communication",
          control: "DORA Articles 11, 16 - Business Continuity & Communication",
          how: "BCP for critical functions: alternate processing sites, data replication, recovery procedures, vendor dependencies. Crisis communication: internal (staff), external (customers, media, authorities), templates pre-approved. Coordinate with DORA incident reporting. Test: tabletop (quarterly), functional (semi-annual), full-scale (annual). Include third-party failure scenarios.",
          check: "BCP documented for all critical functions, crisis comms templates approved, testing calendar executed, and third-party scenarios included."
        }
      ]
    },
    {
      week: 3,
      title: "L3 Implementation: Digital Operational Resilience Testing & Third-Party Risk",
      days: "Days 15-21",
      description:
        "Implement advanced testing program (Art. 18-27) and comprehensive ICT third-party risk management (Art. 28-44).",
      tasks: [
        {
          title: "Implement Digital Operational Resilience Testing Program (Art. 18-27)",
          control: "DORA Articles 18-27 - Testing Program",
          how: "Testing framework: vulnerability assessments (quarterly), penetration testing (annual), advanced testing: TLPT (Threat-Led Penetration Testing) every 3 years for critical entities (Art. 26), gap analysis (annual). TLPT: TIBER-EU framework, threat intelligence-based, red team, blue team, purple team, scope: critical functions. Independent tester (external, certified). Report to management body and competent authority. Remediation tracking with deadlines.",
          check: "Testing program documented, quarterly vuln assessments, annual pen test, TLPT scheduled/completed per cycle, independent tester engaged, and remediation tracked."
        },
        {
          title: "Implement ICT Third-Party Risk Management (Art. 28-35)",
          control: "DORA Articles 28-35 - Third-Party Risk",
          how: "Strategy: due diligence before contracting (Art. 30), risk assessment (criticality, concentration, substitution), contractual requirements (Art. 31): security standards, audit rights, incident notification (4h/72h), subcontracting control, data portability, exit assistance, termination rights. Critical providers: enhanced due diligence, on-site audits, concentration limits, substitution analysis. Register maintenance (Art. 28).",
          check: "Due diligence process operational, contracts updated with DORA clauses, critical providers identified with enhanced oversight, register current, and concentration risk monitored."
        },
        {
          title: "Manage Critical ICT Third-Party Providers (Art. 36-44)",
          control: "DORA Articles 36-44 - Critical Providers & Oversight",
          how: "Critical provider oversight: ESA (EBA/EIOPA/ESMA) designation of critical providers. Oversight framework: lead overseer, joint examinations, information requests, on-site inspections, remedial measures, administrative penalties. Financial entity obligations: notify critical provider use, participate in oversight, contingency planning for provider failure. Concentration risk: monitor market concentration, develop exit strategies, test portability.",
          check: "Critical providers identified per ESA register, oversight participation ready, contingency plans for top 5 critical providers, exit strategies tested, and concentration risk reported to board."
        },
        {
          title: "Implement ICT Concentration Risk & Subcontracting Management",
          control: "DORA Articles 28, 31, 40 - Concentration & Subcontracting",
          how: "Concentration risk: map provider dependencies (single provider for critical function, geographic concentration, common infrastructure). Metrics: Herfindahl-Hirschman Index, provider market share. Mitigation: multi-vendor strategy, in-sourcing capability, data portability. Subcontracting: flow-down clauses (Art. 31.3), visibility into subcontractor chain (up to 4th party), risk assessment of subcontractors, contractual control.",
          check: "Concentration risk metrics calculated quarterly, multi-vendor strategy for critical functions, subcontractor chain mapped to 4th party, and flow-down clauses in all contracts."
        }
      ]
    },
    {
      week: 4,
      title: "L4 Maturity: Continuous Resilience, Supervision Readiness & Ecosystem",
      days: "Days 22-28",
      description:
        "Achieve continuous DORA compliance, prepare for supervisory oversight, and engage with financial sector cyber resilience ecosystem.",
      tasks: [
        {
          title: "Establish Continuous DORA Compliance Monitoring",
          control: "DORA Articles 5-16, 28-44 - Continuous Compliance",
          how: "Implement: automated control monitoring (ICT risk controls, incident detection, testing results, third-party metrics), compliance dashboard (all DORA articles mapped to controls/evidence), quarterly self-assessment, annual internal audit, management body reporting (quarterly), regulatory change tracking (RTS/ITS updates, ESA guidelines, Q&A). Evidence package automation for supervision.",
          check: "Automated monitoring >85% coverage, quarterly self-assessments, annual internal audit, board reporting quarterly, and evidence automation operational."
        },
        {
          title: "Prepare for Competent Authority & ESA Supervision",
          control: "DORA Articles 45-53 - Supervisory Framework",
          how: "Supervision readiness: competent authority (national) supervision, ESA (EBA/EIOPA/ESMA) oversight for critical providers. Prepare: supervisory college participation, information requests response (10 business days), on-site inspection readiness (document access, staff availability), remedial action tracking, administrative penalty processes. Coordinate with: GDPR supervisory authority, NIS2 competent authority, AML supervisor.",
          check: "Supervision readiness package complete, response processes tested, inspection readiness verified, cross-authority coordination established, and penalty process documented."
        },
        {
          title: "Engage with Financial Sector Cyber Resilience Ecosystem",
          control: "DORA Articles 13, 17, 44 - Information Sharing & Cooperation",
          how: "Participate in: EU financial sector ISACs (FS-ISAC EU, sector-specific), ECB/ESA threat intelligence sharing, TIBER-EU community, DORA incident reporting platform (when operational), cross-border crisis exercises (Cyber Europe, sector-specific), regulatory dialogue (EBA/EIOPA/ESMA consultations), standards development (ISO, ETSI). Designate DORA contact points.",
          check: "ISAC membership active, threat sharing operational, TIBER-EU participation, exercise participation documented, regulatory consultation responses submitted, and contact points designated."
        },
        {
          title: "DORA Maturity Assessment & Strategic Roadmap",
          control: "Organizational DORA Maturity",
          how: "Assess maturity per DORA pillar: ICT Risk Management, Incident Reporting, Testing, Third-Party Risk. Use 5-level model. Align with: NIS2, GDPR, Basel III, Solvency II, MiFID II. Create 3-year roadmap: Year 1 (compliance - Jan 2025 deadline), Year 2 (resilience - TLPT, advanced testing), Year 3 (optimization - predictive, automated). KPIs: incident reporting timeliness, testing coverage, third-party risk coverage, concentration risk index, board engagement.",
          check: "Maturity baseline across all pillars, 3-year roadmap approved, KPIs tracked monthly, regulatory alignment documented, and board engagement quarterly."
        }
      ]
    }
  ],
};

export default function DoraPage() {
  return (
    <>
      <LearningFrameworkPage framework={FRAMEWORK} />
    </>
  );
}

export { FRAMEWORK };