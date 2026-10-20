import LearningFrameworkPage from "../../components/LearningFrameworkPage.jsx";

const FRAMEWORK = {
  id: 'cippe-eu',
  name: 'CIPP/E - Certified Information Privacy Professional/Europe (IAPP)',
  region: 'European Union',
  flag: "🇪🇺",
  flagAnimation: "pulse",
  basePath: "/cippe/eu",
  color: 'purple',
  weeks: [
    {
      week: 1,
      title: 'CIPP/E Foundations — European Data Protection Landscape',
      days: 'Days 1-7',
      description: 'Understand the CIPP/E certification scope, European data protection law framework, and the GDPR as the cornerstone of EU privacy regulation.',
      tasks: [
        {
          title: 'Understand CIPP/E certification scope and exam structure',
          control: 'IAPP CIPP/E Body of Knowledge (v6.0+)',
          how: 'Review the CIPP/E exam blueprint: (1) Introduction to European Data Protection (15%), (2) GDPR (50%), (3) ePrivacy Directive and Other Frameworks (15%), (4) Enforcement and Supervisory Authorities (10%), (4) Cross-Border Data Transfers (10%). Understand the exam format: 90 multiple-choice questions, 2.5 hours, passing score ~300/500. Register at iapp.org.',
          check: 'Exam blueprint reviewed, study plan created, exam scheduled, IAPP membership active, study materials (textbook, practice exams) acquired.',
        },
        {
          title: 'Master the GDPR structure and key principles',
          control: 'GDPR Articles 5-11, Recitals 1-173',
          how: 'Study GDPR core: (1) 7 principles in Art. 5: lawfulness, fairness, transparency; purpose limitation; data minimisation; accuracy; storage limitation; integrity & confidentiality; accountability. (2) Lawful bases in Art. 6: consent, contract, legal obligation, vital interests, public task, legitimate interests. (3) Special category data in Art. 9. (4) Data subject rights in Arts. 12-23: access, rectification, erasure, restriction, portability, objection, automated decision-making. (5) Controller/processor obligations in Arts. 24-43. Create a GDPR article map with key obligations per article.',
          check: 'GDPR principles memorised, lawful bases distinguished, data subject rights mapped to articles, controller/processor obligations summarised, article map created and reviewed weekly.',
        },
        {
          title: 'Understand the ePrivacy Directive and national implementations',
          control: 'ePrivacy Directive 2002/58/EC (as amended by 2009/136/EC)',
          how: 'Study: (1) Scope: electronic communications services, public networks, cookies and similar technologies. (2) Confidentiality of communications (Art. 5). (3) Traffic and location data (Arts. 6-9). (4) Unsolicited communications/spam (Art. 13). (5) Security of services (Art. 4). (6) National implementations: Germany (TTDSG), France (CPCE), Netherlands (Telecommunicatiewet), etc. Note: ePrivacy Regulation (proposed) would replace Directive but not yet adopted.',
          check: 'ePrivacy Directive scope understood, cookie consent requirements memorised, national implementation differences identified, interplay with GDPR Art. 95 understood.',
        },
        {
          title: 'Map EU supervisory authorities and EDPB role',
          control: 'GDPR Arts. 51-76, EDPB Guidelines',
          how: 'Study: (1) Supervisory authority independence (Art. 52). (2) Tasks and powers: investigative, corrective, authorisation/advisory (Arts. 57-58). (3) Cooperation and consistency mechanism (Arts. 60-63). (4) European Data Protection Board (EDPB) composition, tasks, binding decisions (Art. 65). (5) One-stop-shop mechanism (Art. 56) for cross-border processing. (6) Lead supervisory authority concept. Review key EDPB guidelines: consent, data breach notification, DPIAs, legitimate interest, legitimate interest assessment.',
          check: 'SA structure understood, EDPB role explained, one-stop-shop mechanism described, key EDPB guidelines reviewed, lead SA concept applied to case studies.',
        }
      ]
    },
    {
      week: 2,
      title: 'GDPR Deep Dive — Controllers, Processors & Data Subject Rights',
      days: 'Days 8-14',
      description: 'Master controller/processor obligations, DPIAs, data subject rights procedures, and international data transfers.',
      tasks: [
        {
          title: 'Master controller and processor obligations',
          control: 'GDPR Arts. 24-43',
          how: 'Study: (1) Controller obligations (Arts. 24-34): accountability, data protection by design/default (Art. 25), records of processing activities/ROPA (Art. 30), security of processing (Art. 32), breach notification (Arts. 33-34), DPIA (Art. 35), prior consultation (Art. 36), DPO appointment (Arts. 37-39), codes of conduct (Art. 40), certification (Art. 42). (2) Processor obligations (Art. 28): processing on behalf of controller, sub-processing, contractual requirements, security measures, breach notification to controller, assistance to controller. (3) Joint controllership (Art. 26): joint responsibility, essence of arrangement available to data subjects.',
          check: 'Controller vs processor obligations distinguished, Art. 28 contract clauses memorised, joint controllership criteria understood, ROPA template created, breach notification procedures documented, DPIA threshold criteria memorised.',
        },
        {
          title: 'Master data subject rights procedures',
          control: 'GDPR Arts. 12-23, Recitals 58-73',
          how: 'Study each right with practical procedures: (1) Transparent information (Arts. 12-14): privacy notice content, timing, layered approach. (2) Right of access (Art. 15): scope, format, response time (1 month + 2 months extension), fee (free unless excessive). (3) Rectification (Art. 16). (4) Erasure/right to be forgotten (Art. 17): grounds, exceptions, notification to controllers. (5) Restriction (Art. 18). (6) Data portability (Art. 20): structured, commonly used, machine-readable format. (7) Objection (Art. 21): direct marketing absolute, profiling/legitimate interest qualified. (8) Automated decision-making (Art. 22): right to human intervention, explanation, contest. Build a DSAR response playbook with templates.',
          check: 'All 8 data subject rights procedures documented, DSAR playbook with templates created, response timeframes memorised, exception criteria for each right understood, controller notification procedures for erasure documented.',
        },
        {
          title: 'Master international data transfers',
          control: 'GDPR Ch. V (Arts. 44-50), EDPB Guidelines 05/2021, 07/2020',
          how: 'Study transfer mechanisms: (1) Adequacy decisions (Art. 45): Andorra, Argentina, Canada (commercial), Faroe Islands, Guernsey, Israel, Isle of Man, Japan, Jersey, New Zealand, South Korea, Switzerland, Uruguay, UK. (2) Appropriate safeguards (Art. 46): SCCs (2021 modules), BCRs, codes of conduct, certification. (3) Derogations (Art. 49): explicit consent, contract performance, public interest, legal claims, vital interests, public register. (4) Transfer Impact Assessments (TIA) per Schrems II. (5) Supplementary measures. (6) UK adequacy decision (2021). Build a transfer mechanism decision tree.',
          check: 'All adequacy countries listed, SCC modules (controller-controller, controller-processor, processor-processor, processor-controller) understood, BCR criteria known, TIA template created, supplementary measures catalogued, UK data flow mapping completed.',
        },
        {
          title: 'Understand DPIAs and prior consultation',
          control: 'GDPR Arts. 35-36, EDPB Guidelines on DPIA (WP248)',
          how: 'Study: (1) When DPIA required: systematic profiling, large-scale special category data, large-scale public monitoring, new technologies (Art. 35(1), (3)). (2) DPIA content: description, necessity/proportionality, risks, mitigations (Art. 35(7)). (3) Prior consultation with SA when high residual risk (Art. 36). (4) List of processing operations requiring DPIA (Art. 35(4)). Build a DPIA screening questionnaire and template.',
          check: 'DPIA triggers memorised, DPIA template with all Art. 35(7) elements created, screening questionnaire built, prior consultation triggers understood, DPIA register template created.',
        }
      ]
    },
    {
      week: 3,
      title: 'ePrivacy, Enforcement & Emerging EU Frameworks',
      days: 'Days 15-21',
      description: 'Cover ePrivacy Directive, supervisory authority powers, fines, and emerging regulations (AI Act, NIS2, DORA).',
      tasks: [
        {
          title: 'Master ePrivacy Directive requirements',
          control: 'ePrivacy Directive 2002/58/EC, national implementations (TTDSG, CPCE, etc.)',
          how: 'Study: (1) Confidentiality of communications (Art. 5): no interception/surveillance without consent/legal basis. (2) Traffic data (Art. 6): erase/anonymise after billing, location data consent. (3) Itemised billing (Art. 7). (4) Caller ID (Art. 8). (4) Unsolicited communications (Art. 13): opt-in for email/SMS marketing, soft opt-in exception for existing customers (similar products/services, opt-out offered). (5) Cookie consent: strict opt-in for non-essential cookies (Planet49 ruling). (6) Security of services (Art. 4): breach notification to competent authority. (7) National laws: Germany TTDSG, France CPCE, Netherlands Telecommunicatiewet. Build a cookie consent compliance checklist.',
          check: 'Cookie consent requirements applied to website audit, ePrivacy vs GDPR interplay explained, soft opt-in criteria documented, national law differences identified, breach notification procedures for CSPs documented.',
        },
        {
          title: 'Understand supervisory authority enforcement powers and fines',
          control: 'GDPR Arts. 57-59, 83-84, Art. 83(4-6) fine tiers',
          how: 'Study: (1) Investigative powers (Art. 58(1)): access to data/premises, audit, information requests. (2) Corrective powers (Art. 58(2)): warnings, reprimands, orders, processing bans, suspension of data flows. (3) Fine tiers (Art. 83): lower tier up to €10M/2% turnover (Art. 83(4) - processor obligations, DPO, records, DPIA, certification); higher tier up to €20M/4% turnover (Art. 83(5-6) - principles, lawful basis, consent, data subject rights, transfers, SA orders). (4) Fine calculation: nature/gravity, intentional/negligent, mitigation, categories of data, cooperation, previous infringements, certification. (5) Right to judicial remedy (Art. 78). Review landmark fines: Meta, Amazon, Google, TikTok, WhatsApp, Clearview AI.',
          check: 'Fine tiers distinguished with examples, corrective/investigative powers listed, fine calculation criteria applied to case studies, landmark fines analysed for patterns, appeal procedures understood.',
        },
        {
          title: 'Understand the EU AI Act and interplay with GDPR',
          control: 'EU AI Act (Regulation 2024/1689), GDPR Art. 22, 35',
          how: 'Study: (1) AI Act scope: AI systems placed on EU market/used in EU, risk tiers (prohibited, high-risk, limited-risk, minimal-risk). (2) High-risk AI: Annex III use cases (biometrics, critical infrastructure, education, employment, essential services, law enforcement, migration, justice). (3) Requirements: risk management (Art. 9), data governance (Art. 10), transparency (Art. 13), human oversight (Art. 14), accuracy/robustness/cybersecurity (Art. 15), quality management (Art. 17), conformity assessment (Art. 43), CE marking, post-market monitoring (Art. 72). (4) GDPR interplay: AI Act Art. 10(5) requires DPIA for high-risk AI training data; Art. 22 automated decision-making applies to AI; training data must comply with lawful basis, special category data rules. (5) Conformity assessment: internal control (Annex VI) or notified body (Annex VII). Build an AI Act/GDPR overlap matrix.',
          check: 'AI Act risk tiers understood, high-risk use cases identified, GDPR/AI Act overlap matrix created, conformity assessment pathway determined, DPIA for AI training data documented.',
        },
        {
          title: 'Overview of NIS2, DORA, and other emerging EU regulations',
          control: 'NIS2 Directive (EU) 2022/2555, DORA Regulation (EU) 2022/2554',
          how: 'Study emerging frameworks: (1) NIS2: essential/important entities, 10 security measures (Art. 21), incident reporting 24h early warning/72h full report (Art. 23), supply chain security, management liability (Art. 20). (2) DORA: financial entities, ICT risk management, incident reporting (major incidents 4h), digital operational resilience testing, ICT third-party risk (register, oversight), effective Jan 2025. (3) CER Directive: critical entity resilience. (4) Data Act: data sharing obligations, cloud switching. (5) Data Governance Act: data intermediation, data altruism. Build a regulatory calendar with effective dates and scope criteria.',
          check: 'Regulatory calendar created with effective dates, scope criteria for each regulation documented, organisational applicability assessed, gap analysis initiated for DORA/NIS2, compliance roadmap drafted.',
        }
      ]
    },
    {
      week: 4,
      title: 'CIPP/E Exam Readiness & Practical Application',
      days: 'Days 22-28',
      description: 'Consolidate knowledge, practice exam questions, and build practical compliance artefacts.',
      tasks: [
        {
          title: 'Complete full-length CIPP/E practice exams',
          control: 'IAPP CIPP/E practice exam, official textbook',
          how: 'Complete 3-5 timed practice exams under exam conditions (90 questions, 2.5 hours). Review every incorrect answer: identify knowledge gap, re-read textbook section, create flashcard. Track scores by domain: (1) European Data Protection Intro, (2) GDPR, (3) ePrivacy, (4) Enforcement, (5) Transfers. Target 85%+ on each domain. Use IAPP official practice exam for final readiness check.',
          check: '3+ practice exams completed timed, incorrect answers categorised by domain, weak domains identified and re-studied, final IAPP practice exam scored 85%+ overall with no domain below 80%.',
        },
        {
          title: 'Build a GDPR compliance artefact portfolio',
          control: 'GDPR Arts. 12-34, 44-50',
          how: 'Create practical artefacts for portfolio: (1) Layered privacy notice (Art. 13/14) with plain-language summary. (2) ROPA template (Art. 30) with all required fields. (2) DPIA screening questionnaire and template (Art. 35). (3) DSAR response templates for all 8 rights with timelines. (4) Data processing agreement template (Art. 28) with SCC modules. (5) Transfer Impact Assessment template (Schrems II). (6) Breach notification template (Arts. 33-34) with 72h timeline. (7) DPO appointment letter (Art. 37). (8) DPIA screening register. Publish on GitHub/Portfolio.',
          check: 'All 8 artefacts created and reviewed, privacy notice tested with non-privacy audience, ROPA template validated against Art. 30, DPA template reviewed against SCC modules, TIA template includes Schrems II supplementary measures, breach template includes 72h/individual notification split.',
        },
        {
          title: 'Create CIPP/E exam day strategy and post-certification plan',
          control: 'IAPP CIPP/E exam policies, continuing privacy education (CPE)',
          how: 'Prepare: (1) Exam day logistics: ID requirements, testing centre/online proctoring rules, permitted items, breaks. (2) Time management: 90 questions / 150 minutes = 1.67 min/q; flag difficult questions, return later; no penalty for guessing. (3) Post-exam: CIPP/E requires 20 CPE credits/year (10 privacy-specific). Plan CPE sources: IAPP conferences, webinars, privacy courses, teaching, writing. (4) Career: add CIPP/E to LinkedIn, update CV, join IAPP community, consider CIPM/CIPT for specialisation. (5) Maintain IAPP membership for resource access.',
          check: 'Exam day checklist prepared, time management strategy documented, CPE plan with 4 quarterly activities, LinkedIn updated, IAPP community joined, next certification (CIPM/CIPT) evaluated.',
        },
        {
          title: 'Final readiness review and mock exam',
          control: 'All CIPP/E domains',
          how: 'Final 3-day review: Day 1 - GDPR deep dive (Arts. 5-34), create one-page summaries per article group. Day 2 - ePrivacy, enforcement, transfers, create mind maps. Day 3 - timed mock exam (90 min for 60 questions), review errors, re-read weak areas. Night before: light review only, sleep 8 hours, prepare ID/documents, test proctoring setup if online. Exam day: arrive early, bring water/snacks, use elimination strategy, trust first instinct, flag and return, no blank answers.',
          check: '3-day review plan executed, mock exam completed with 85%+ score, weak areas re-reviewed, exam day logistics confirmed, mindset prepared.',
        }
      ]
    }
  ],
  milestones: [
    { day: 7, label: 'European Data Protection Foundations' },
    { day: 14, label: 'GDPR & Data Subject Rights Mastery' },
    { day: 21, label: 'ePrivacy, Enforcement & Emerging Regulations' },
    { day: 28, label: 'CIPP/E Exam Ready' },
  ],
};

export default function CippeEuPage() {
  return (
    <>
      <LearningFrameworkPage framework={FRAMEWORK} />
    </>
  );
}

export { FRAMEWORK };