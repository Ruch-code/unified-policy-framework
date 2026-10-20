import LearningFrameworkPage from "../../components/LearningFrameworkPage.jsx";

const FRAMEWORK = {
  id: "uk-gdpr",
  name: "UK GDPR & Data Protection Act 2018 Compliance",
  color: "red",
  region: "United Kingdom",
  flag: "🇬🇧",
  flagAnimation: "float",
  basePath: "/uk-gdpr",
  referenceUrl: "https://www.legislation.gov.uk/euri/2016/679/contents",
  weeks: [
    {
      week: 1,
      title: "L1 Foundation: UK GDPR Scope, Governance & DPO",
      days: "Days 1-7",
      description:
        "Establish UK GDPR applicability post-Brexit, appoint DPO, and build data protection governance framework aligned with ICO expectations.",
      tasks: [
        {
          title: "Determine UK GDPR Applicability & Controller/Processor Roles",
          control: "UK GDPR Articles 2-3, 24-28 - Scope & Roles",
          how: "Assess applicability: establishment in UK, offering goods/services to UK data subjects, monitoring UK data subjects' behavior. Classify role per processing activity: Controller (determines purposes/means), Joint Controller (shared determination), Processor (processes on behalf). Document Article 28 contracts for all processors. Map international transfers: EU (adequacy), US (UK Extension to EU-US DPF), other (SCCs, IDTA, BCRs).",
          check: "Applicability confirmed, role classification complete per activity, Article 28 contracts in place, transfer mechanisms documented."
        },
        {
          title: "Appoint Data Protection Officer (DPO) & Reporting Line",
          control: "UK GDPR Articles 37-39 / DPA 2018 - DPO Requirements",
          how: "Determine mandatory DPO requirement: public authority, core activities = large scale systematic monitoring, or large scale special category/criminal data. Appoint DPO with expert knowledge, independence, direct reporting to highest management level, no conflict of interest. Document DPO tasks: advise, monitor compliance, DPIA advice, cooperate with ICO, point of contact. Resource DPO appropriately (team, budget, tools).",
          check: "DPO appointed with required expertise, independence confirmed, reporting line to board, resources allocated, tasks documented."
        },
        {
          title: "Build Data Protection Governance Framework",
          control: "UK GDPR Articles 5, 24, 32 - Accountability & Security",
          how: "Implement accountability framework: Data Protection Policy (board-approved), Records of Processing Activities (ROPA - Art. 30), Data Protection Impact Assessment (DPIA) process (Art. 35), Data Breach process (Art. 33-34), Data Subject Rights process (Art. 12-22), Privacy by Design/Default (Art. 25), Security of processing (Art. 32), Processor management (Art. 28), International transfers (Art. 44-50). Assign owners per Article 24.",
          check: "All governance documents approved, ROPA current, DPIA process operational, breach process tested, rights process <30 days, security measures implemented."
        },
        {
          title: "Conduct UK GDPR Gap Analysis vs. EU GDPR & ICO Guidance",
          control: "UK GDPR / DPA 2018 / ICO Guidance - Gap Analysis",
          how: "Map differences: UK GDPR (retained EU GDPR + DPA 2018 modifications), ICO guidance (Accountability Framework, DPIA guidance, Breach reporting, Children's code, AI guidance, Direct marketing, Employment practices). Gap analysis: current state vs. UK GDPR + ICO expectations. Prioritize: ICO enforcement priorities (children's data, AI, direct marketing, international transfers, breach reporting). Remediation plan with ICO-aligned evidence.",
          check: "Gap analysis complete with ICO-specific priorities, remediation plan aligned with ICO Accountability Framework, evidence requirements defined."
        }
      ]
    },
    {
      week: 2,
      title: "L2 Implementation: ROPA, DPIA, Lawful Basis & Rights Automation",
      days: "Days 8-14",
      description:
        "Implement Records of Processing Activities, DPIA process, lawful basis mapping, and automated data subject rights fulfillment.",
      tasks: [
        {
          title: "Implement Comprehensive ROPA (Article 30)",
          control: "UK GDPR Article 30 / ICO ROPA Guidance",
          how: "Build ROPA for Controller and Processor roles. Controller ROPA: purposes, categories (data subjects, personal data, special category), recipients (including international), transfers (mechanism: adequacy, IDTA, BCRs), retention schedules, security measures. Processor ROPA: controller details, processing categories, transfers, security measures. Automate: data discovery (OneTrust, BigID, custom), flow mapping, retention calculation. Review quarterly. Evidence: ROPA register, data maps, discovery scan results.",
          check: "Controller & Processor ROPA complete, automated discovery covering >90% systems, quarterly review calendar, retention schedules enforced."
        },
        {
          title: "Implement DPIA Process & Screening (Article 35)",
          control: "UK GDPR Article 35 / ICO DPIA Guidance",
          how: "DPIA screening: high-risk triggers (systematic monitoring, large scale special category, large scale public area monitoring, innovative tech/AI, profiling/automated decisions, genetic/biometric, data matching, invisible processing, tracking, targeting children/vulnerable). DPIA template: description, necessity/proportionality, risk assessment (likelihood x severity), mitigations, DPO sign-off, prior consultation (Art. 36) if high risk remains. Integrate with project lifecycle (privacy by design). Evidence: screening logs, completed DPIAs, DPO advice records, ICO consultation records.",
          check: "DPIA screening integrated in project intake, template approved, all high-risk processing has DPIA, DPO sign-off documented, prior consultations completed where required."
        },
        {
          title: "Map Lawful Basis & Special Category Conditions (Articles 6, 9, 10)",
          control: "UK GDPR Articles 6, 9, 10 / DPA 2018 Schedules 1-2",
          how: "Map lawful basis per processing activity: Art. 6 (consent, contract, legal obligation, vital interests, public task, legitimate interests). For special category (Art. 9): explicit consent, employment/social security law, vital interests, not-for-profit, manifestly public, legal claims, substantial public interest (DPA 2018 Schedule 1), health/social care, public health, archiving/research. Criminal data (Art. 10): official authority or Schedule 1 condition. Document LIA (Legitimate Interests Assessment) for LI. Consent management: granular, withdrawable, recorded. Evidence: basis register, LIAs, consent records, Schedule 1 policy documents.",
          check: "Lawful basis documented for all processing, LIAs completed, consent management operational, Schedule 1 conditions documented for special category/criminal data."
        },
        {
          title: "Automate Data Subject Rights Fulfillment (Articles 12-22)",
          control: "UK GDPR Articles 12-22 / ICO Rights Guidance",
          how: "Automate DSAR portal: identity verification (GOV.UK Verify, document check), automated data discovery across systems (ROPA-linked), automated redaction for third-party data, export in machine-readable format (JSON, CSV, XML), deletion workflow (cascade to backups, archives, processors), rectification workflow (with audit trail), restriction flag (suppress processing), portability API (structured, commonly used format), objection handling (direct marketing auto-suppress, profiling assessment). SLA tracking: 1 month (extendable 2 months). Evidence: DSAR logs, fulfillment metrics, redaction samples, deletion certificates, portability exports.",
          check: "DSAR portal live, automated discovery >90% coverage, redaction tested, deletion cascade verified, SLA <30 days achieved, metrics dashboard operational."
        }
      ]
    },
    {
      week: 3,
      title: "L3 Implementation: Breach Management, International Transfers & Children/AI",
      days: "Days 15-21",
      description:
        "Implement breach management per ICO expectations, manage international transfers post-Brexit, and address Children's Code and AI governance.",
      tasks: [
        {
          title: "Implement Personal Data Breach Management (Articles 33-34)",
          control: "UK GDPR Articles 33-34 / ICO Breach Reporting Guidance",
          how: "Breach process: detection (SIEM, DLP, staff reporting, processor notification), triage (72-hour clock starts on awareness), risk assessment (severity x likelihood for data subjects), notification decision (ICO if risk to rights/freedoms, data subjects if high risk). ICO notification: nature, categories, numbers, DPO contact, likely consequences, measures taken. Data subject notification: clear language, mitigation advice. Processor notification clause (Art. 28): without undue delay. Evidence: breach register, risk assessments, ICO notifications, data subject communications, processor notifications, lessons learned.",
          check: "Breach process documented and tested, 72-hour reporting achieved in simulations, ICO notification template approved, processor contracts updated, breach register maintained."
        },
        {
          title: "Manage International Transfers Post-Brexit (Articles 44-50)",
          control: "UK GDPR Articles 44-50 / IDTA / UK-US Data Bridge",
          how: "Transfer mechanisms: UK Adequacy Regulations (EEA, Gibraltar, etc.), International Data Transfer Agreement (IDTA) - UK version of SCCs, UK Addendum to EU SCCs, Binding Corporate Rules (BCRs), UK Extension to EU-US Data Privacy Framework (UK-US Data Bridge), specific adequacy decisions (Japan, Canada commercial, etc.), derogations (Art. 49). TIA (Transfer Impact Assessment) per ICO guidance for non-adequate countries. Supplementary measures: technical (encryption, pseudonymization), contractual, organizational. Monitor: EU SCC updates, US DPF reviews, ICO guidance changes. Evidence: transfer register, TIAs, IDTA/BCR docs, supplementary measures documentation.",
          check: "All transfers mapped with mechanism, TIAs for non-adequate countries, IDTA/UK Addendum executed, UK-US Data Bridge leveraged where applicable, monitoring active."
        },
        {
          title: "Implement Age Appropriate Design Code (Children's Code)",
          control: "DPA 2018 Section 123 / ICO Children's Code (15 Standards)",
          how: "If processing children's data (under 18): apply 15 standards: Best interests, Data protection impact assessments, Age-appropriate application, Transparency, Detrimental use of data, Policies & community standards, Default settings, Data minimisation, Data sharing, Geolocation, Parental controls, Profiling, Nudge techniques, Connected toys/devices, Online tools. Age assurance: self-declaration, hard identifiers, age estimation, third-party verification (proportional to risk). Evidence: DPIA for children's processing, age assurance implementation, default settings (high privacy), geolocation off by default, profiling off by default, parental controls, nudge technique review.",
          check: "Children's Code assessment complete, age assurance implemented proportionally, defaults high privacy, geolocation/profiling off by default, parental controls available, nudge review done."
        },
        {
          title: "Implement AI & Automated Decision-Making Governance",
          control: "UK GDPR Article 22 / ICO AI Guidance / DPA 2018",
          how: "Automated decision-making (Art. 22): right to human intervention, express views, contest, explanation. Identify all automated decisions: profiling, credit scoring, recruitment, fraud detection, content moderation. Safeguards: meaningful human review, logic explanation, regular testing for bias/fairness. ICO AI guidance: lawful basis, transparency, DPIA, fairness, accuracy, data minimization, purpose limitation, security, accountability. AI governance: model inventory, risk classification, bias testing, documentation (model cards), human oversight, incident response. Evidence: ADM register, human review processes, bias test results, model cards, DPIAs for AI, transparency notices.",
          check: "ADM inventory complete, human review implemented for all Art. 22 decisions, bias testing conducted, model cards documented, AI DPIAs complete, transparency notices published."
        }
      ]
    },
    {
      week: 4,
      title: "L4 Maturity: ICO Accountability, Certification & Continuous Compliance",
      days: "Days 22-28",
      description:
        "Achieve ICO Accountability Framework maturity, pursue certification, and embed continuous UK GDPR compliance.",
      tasks: [
        {
          title: "Achieve ICO Accountability Framework Maturity",
          control: "ICO Accountability Framework (10 Categories)",
          how: "Assess maturity across ICO's 10 categories: Leadership & Oversight, Policies & Procedures, Training & Awareness, Individuals' Rights, Transparency, Records of Processing & Lawful Basis, Contracts & Data Sharing, Risks & DPIAs, Breach Reporting, Monitoring & Enforcement. Use ICO self-assessment tool. Target: 'Managed' or 'Optimized' in all categories. Evidence: board minutes, policy library, training records, rights metrics, privacy notices, ROPA, contracts, DPIA register, breach register, audit reports, KPI dashboard.",
          check: "ICO self-assessment complete, all categories at Managed/Optimized, evidence package compiled, improvement plan for any gaps."
        },
        {
          title: "Pursue UK GDPR Certification & Seals",
          control: "UK GDPR Articles 42-43 / ICO Certification Schemes",
          how: "Evaluate certification schemes: ICO-approved (e.g., ADISA, BSI, ISO 27701 + UK GDPR extension). Benefits: demonstrate accountability, competitive advantage, mitigation in enforcement. Process: select scheme, gap analysis, implement controls, internal audit, certification audit, surveillance. Align with: ISO 27701 (PIMS), ISO 27001, Cyber Essentials Plus. Evidence: certification scope, gap analysis, audit reports, certificate.",
          check: "Certification scheme selected, gap analysis complete, controls implemented, certification audit scheduled, alignment with ISO 27701/27001 documented."
        },
        {
          title: "Establish Continuous UK GDPR Compliance Monitoring",
          control: "UK GDPR Article 24 / ICO Monitoring Expectations",
          how: "Continuous monitoring: automated ROPA updates (data discovery), DPIA triggers (new projects, vendors, tech), consent dashboard (withdrawal rates, granularity), breach metrics (detection time, reporting time, root causes), rights metrics (volume, SLA, exemptions), transfer register currency, training completion, vendor DPA currency. Dashboard for DPO and board. Quarterly compliance report. Annual accountability review per ICO framework.",
          check: "Automated monitoring >85% coverage, DPO dashboard live, quarterly board reports, annual accountability review scheduled, metrics thresholds alerting."
        },
        {
          title: "UK GDPR Strategic Roadmap & Regulatory Horizon Scanning",
          control: "UK Data Protection Reform / ICO Strategy",
          how: "Monitor: Data Protection and Digital Information Bill (DPDI) - legislative changes (legitimate interests flexibility, DPIA threshold, international transfers, AI provisions, ICO powers), ICO strategic plan (enforcement priorities: AI, children, direct marketing, public sector), EU adequacy review (2024/2027), sector-specific guidance (health, finance, education, law enforcement). Roadmap: Year 1 (DPDI readiness), Year 2 (AI governance maturity), Year 3 (certification & automation). KPIs: ICO framework scores, breach trends, rights SLA, training %, certification status.",
          check: "DPDI bill tracked with impact analysis, ICO priorities mapped to roadmap, 3-year plan approved, KPIs tracked monthly, regulatory horizon scanning monthly."
        }
      ]
    }
  ],
};

export default function UkGdprPage() {
  return (
    <>
      <LearningFrameworkPage framework={FRAMEWORK} />
    </>
  );
}

export { FRAMEWORK };