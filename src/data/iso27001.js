/**
 * ISO/IEC 27001:2022 clause model (Clauses 4-10) plus the content
 * classification system used across the app.
 *
 * PROVENANCE
 * ----------
 * No standard text is reproduced. Every `summary` is an original plain-language
 * paraphrase. Clause numbers are factual references.
 *
 * `verify: true` marks entries whose identifier or structure should be checked
 * against the organisation's licensed copy of ISO/IEC 27001:2022 before
 * publication. The UI surfaces these as "needs review" rather than hiding them.
 */

import { ANNEX_A_CONTROLS } from './iso27001AnnexA.js';

export const ISO_SOURCES = {
  standard: {
    id: 'iso27001',
    title: 'ISO/IEC 27001:2022 — Information security, cybersecurity and privacy protection — Information security management systems — Requirements',
    url: 'https://www.iso.org/standard/27001',
    version: 'ISO/IEC 27001:2022 (3rd edition, 2022-10)',
    lastReviewed: '2026-09-26',
    note: 'Clause and Annex A identifiers only. No standard text reproduced.',
  },
  amendment: {
    id: 'amd1',
    title: 'ISO/IEC 27001:2022/Amd 1:2024 — Climate action changes',
    url: 'https://www.iso.org/standard/88435.html',
    version: 'ISO/IEC 27001:2022/Amd 1:2024',
    lastReviewed: '2026-09-26',
    note: 'Adds a climate-change consideration to Clauses 4.1 and 4.2.',
  },
  guidance: {
    id: 'iso27002',
    title: 'ISO/IEC 27002:2022 — Information security controls',
    url: 'https://www.iso.org/standard/75652.html',
    version: 'ISO/IEC 27002:2022 (3rd edition)',
    lastReviewed: '2026-09-26',
    note: 'Companion guidance. Not a substitute for 27001 ISMS requirements.',
  },
  certification: {
    id: 'iso-cert',
    title: 'ISO — Certification',
    url: 'https://www.iso.org/certification.html',
    version: 'ISO/IEC 17021-1 audit practice',
    lastReviewed: '2026-09-26',
    note: 'ISO does not certify organisations. External certification bodies do.',
  },
  climateCommunique: {
    id: 'iaf-iso',
    title: 'IAF and ISO joint communiqué on climate action',
    url: 'https://iaf.nu/en/news/iaf-and-iso-publish-joint-communique/',
    version: 'IAF/ISO joint communiqué',
    lastReviewed: '2026-09-26',
    note: 'Context on the amendment. Not a requirement itself.',
  },
  soaGuidance: {
    id: 'jtc1sc27-soa',
    title: 'ISO/IEC JTC 1/SC 27 WG1 — Auditing Practices Note: Statement of Applicability',
    url: 'https://committee.iso.org/files/live/sites/jtc1sc27/files/resources/ISO-IECJTC1-SC27-WG1_N3298_Auditing%20Practices%20Note%20-%20SoA.pdf',
    version: 'ISO/IEC JTC 1/SC 27 WG1 N3298',
    lastReviewed: '2026-09-26',
    note: 'Non-normative audit guidance on SoA. Advisory, not a requirement.',
  },
};

/** The seven ways a piece of content can relate to ISO. Drives badges and filters. */
export const ISO_CATEGORIES = {
  clause: {
    id: 'clause',
    label: 'ISO clause requirement',
    short: 'Clause',
    tone: 'rose',
    desc: 'A requirement of ISO/IEC 27001:2022 itself. Clauses 4-10 are the mandatory ISMS requirements.',
  },
  annexA: {
    id: 'annexA',
    label: 'Annex A reference control',
    short: 'Annex A',
    tone: 'indigo',
    desc: 'A reference control in Annex A. Not automatically required — necessity is determined by the organisation through risk assessment and recorded in the SoA.',
  },
  practice: {
    id: 'practice',
    label: 'Recommended practice',
    short: 'Practice',
    tone: 'emerald',
    desc: 'Sensible implementation guidance that is NOT itself an ISO requirement. Frequencies, tools and products here are organisation-defined.',
  },
  otherFramework: {
    id: 'otherFramework',
    label: 'Another framework or law',
    short: 'Other',
    tone: 'amber',
    desc: 'Belongs to a different law or framework. Its deadlines and duties are NOT ISO/IEC 27001 requirements.',
  },
  unverified: {
    id: 'unverified',
    label: 'Unverified — needs review',
    short: 'Review',
    tone: 'slate',
    desc: 'Could not be tied to a precise, authoritative basis. Requires review against the licensed standard before reliance.',
  },
};

export const ISO_CATEGORY_ORDER = ['clause', 'annexA', 'practice', 'otherFramework', 'unverified'];

/**
 * Clauses 4-10. These are the binding ISMS requirements.
 * `verify: true` = check identifier/structure against the licensed standard.
 */
export const ISO_CLAUSES = [
  {
    id: '4',
    title: 'Context of the organisation',
    requirement: 'Requirement',
    summary: 'Understand the organisation and its environment before designing the ISMS, so the system fits the actual business rather than a generic template.',
    subclauses: [
      { id: '4.1', title: 'Understanding the organization and its context', summary: 'Determine internal and external issues that affect the ISMS, and the interests of those parties. Amd 1:2024 adds a requirement to determine whether climate change is a relevant issue.', climate: true, climateRef: 'amd1.clause41' },
      { id: '4.2', title: 'Understanding the needs and expectations of interested parties', summary: 'Determine which interested parties have relevant requirements and how they apply, such as customers, regulators, suppliers and contractual commitments. Amd 1:2024 notes that relevant interested parties may have climate-related requirements.', climate: true, climateRef: 'amd1.clause42' },
      { id: '4.3', title: 'Determining the scope of the ISMS', summary: 'Define the boundaries and applicability of the ISMS by considering the context, interested party requirements, activities and services, and the information and assets involved.' },
      { id: '4.4', title: 'ISMS and its processes', summary: 'Establish the ISMS and its processes, including establishing the ISMS itself, defining its scope, and establishing and maintaining the processes needed to deliver intended results.' },
      { id: '4.5', title: 'Mapping the ISMS to 27001:2013', summary: 'Clause 4.5 provides a mapping of the 2013 edition\'s clause 4.1.2, to help organisations that have an existing ISMS align with the 2022 structure. Informative, not a requirement to produce a document.' },
    ],
  },
  {
    id: '5',
    title: 'Leadership',
    requirement: 'Requirement',
    summary: 'Top management must visibly own information security. This is the clause auditors examine first for genuine management commitment, because everything downstream depends on it.',
    subclauses: [
      { id: '5.1', title: 'Leadership and commitment', summary: 'Top management demonstrates accountability for information security by taking responsibility for the ISMS, ensuring its objectives are integrated into business processes, and ensuring the ISMS is adequately resourced.' },
      { id: '5.2', title: 'Information security policy', summary: 'Establish, approve, communicate and maintain an information security policy appropriate to the organisation’s context and its ISMS scope.' },
      { id: '5.3', title: 'Organizational roles, responsibilities and authorities', summary: 'Assign and communicate responsibilities and authorities for information security, including a named owner of the ISMS.' },
      { id: '5.4', title: 'Information security objectives', summary: 'Establish measurable information security objectives at relevant levels, consistent with the policy and taking into account requirements from Clause 4.' },
    ],
  },
  {
    id: '6',
    title: 'Planning',
    requirement: 'Requirement',
    summary: 'The core of the ISMS: work out the risks, decide how to treat them, and record the result in the Statement of Applicability.',
    subclauses: [
      { id: '6.1.1', title: 'Actions to address risks and opportunities — General', summary: 'Determine risks and opportunities, plan actions to address them, and integrate those actions into the ISMS and business processes.' },
      { id: '6.1.2', title: 'Information security risk assessment', summary: 'Define a repeatable risk assessment methodology, apply it consistently, identify information security risks, analyse them, and evaluate whether they need treatment.', verify: true },
      { id: '6.1.3', title: 'Information security risk treatment', summary: 'Plan risk treatment, determine controls, compare the planned controls against Annex A to verify none relevant are omitted, produce the SoA, and obtain risk owner approval of the treatment plan and residual risk.' },
      { id: '6.1.4', title: 'Information security risk acceptance', summary: 'Ensure risks are formally accepted by the risk owner, with documented justification for the decision to accept residual risk and any necessary further treatment.' },
      { id: '6.1.5', title: 'Information security objectives', summary: 'Establish information security objectives and the plans to achieve them.', verify: true },
      { id: '6.2', title: 'Information security objectives', summary: 'Establish objectives at relevant levels, make them consistent with the information security policy, take account of requirements from Clause 4, and consider the results of the risk assessment.' },
      { id: '6.3', title: 'Planning of information security changes', summary: 'Plan and implement changes to the ISMS in a controlled manner, maintaining the integrity of the ISMS and its processes when changes are made.' },
    ],
  },
  {
    id: '7',
    title: 'Support',
    requirement: 'Requirement',
    summary: 'Resourcing, competence, awareness, communication, and the documented information the ISMS runs on.',
    subclauses: [
      { id: '7.1', title: 'Resources', summary: 'Determine and provide the resources needed for the ISMS, including considering existing capabilities and obtaining external resources.' },
      { id: '7.2', title: 'Competence', summary: 'Determine necessary competencies, ensure people have them, and take actions to acquire the competencies needed, retaining appropriate evidence.' },
      { id: '7.3', title: 'Awareness', summary: 'Ensure personnel are aware of the information security policy, their contribution to ISMS objectives, consequences of deviating, and relevant security incident reporting routes.' },
      { id: '7.4', title: 'Communication', summary: 'Establish processes for internal and external information security communication, including who to communicate with, when, and about what.' },
      { id: '7.5', title: 'Documented information', summary: 'Establish what documented information the ISMS requires, and control its creation, updating, approval, identification, distribution, storage, protection and retention.', sub: [
        { id: '7.5.1', title: 'General', summary: 'The ISMS shall include the information required by the standard and the information the organisation determines necessary for the effectiveness of the ISMS.' },
        { id: '7.5.2', title: 'Creating and updating', summary: 'Documented information is created, updated and controlled with appropriate identification, format and review/approval.' },
        { id: '7.5.3', title: 'Control of documented information', summary: 'Documented information is available and suitable for use, protected against loss or compromise, and retained and disposed of appropriately.' },
      ] },
    ],
  },
  {
    id: '8',
    title: 'Operation',
    requirement: 'Requirement',
    summary: 'Run the ISMS day to day: operational planning and control, then the risk assessment and treatment that was planned under Clause 6.',
    subclauses: [
      { id: '8.1', title: 'Operational planning and control', summary: 'Plan, implement, control, maintain and keep documented information for the processes needed to meet ISMS requirements, and address the risks and opportunities determined in Clause 6.' },
      { id: '8.2', title: 'Information security risk assessment', summary: 'Perform the risk assessment at planned intervals and whenever significant changes are expected, to ensure the ISMS remains valid and proportionate. Note this repeats 6.1.2 as a cycle rather than a one-off.' },
      { id: '8.3', title: 'Information security risk treatment', summary: 'Implement the risk treatment plan, and re-assess when the risk assessment is repeated, when significant changes occur, or when incidents indicate the treatment plan is no longer adequate.' },
    ],
  },
  {
    id: '9',
    title: 'Performance evaluation',
    requirement: 'Requirement',
    summary: 'Prove the ISMS works: measure it, audit it internally, and have management review the results.',
    subclauses: [
      { id: '9.1', title: 'Monitoring, measurement, analysis and evaluation', summary: 'Determine what needs to be monitored and measured, how, when and against what criteria, and evaluate the results against the ISMS and policy at planned intervals.' },
      { id: '9.2', title: 'Internal audit', summary: 'Conduct internal audits at planned intervals to provide information on whether the ISMS conforms and is effectively implemented and maintained. The audit programme is a management responsibility and the auditor must be objective and impartial.' },
      { id: '9.3', title: 'Management review', summary: 'Top management reviews the ISMS at planned intervals, covering status of actions from previous reviews, changes in internal and external issues, ISMS performance including nonconformities and corrective actions, and opportunities for continual improvement.' },
      { id: '9.4', title: 'Nonconformity and corrective action', summary: 'Establish a process to report nonconformities, take corrective action and manage corrective actions, and maintain evidence of the nature of the nonconformity, actions taken and results.', supersededIn2022: true, note: 'Moved to Clause 10.2 in the 2022 edition; retained here because many 2013-era ISMS documents still reference 9.4.' },
    ],
  },
  {
    id: '10',
    title: 'Improvement',
    requirement: 'Requirement',
    summary: 'Drive the ISMS forward. Clause 10 was restructured in the 2022 edition to bring nonconformity and corrective action in alongside continual improvement.',
    subclauses: [
      { id: '10.1', title: 'Continual improvement', summary: 'Continually improve the suitability, adequacy and effectiveness of the ISMS, supported by the results of the analysis and evaluation in Clause 9.' },
      { id: '10.2', title: 'Nonconformity and corrective action', summary: 'Establish a process to report nonconformities, take corrective action and manage corrective actions, and maintain evidence of the nature of the nonconformity, actions taken and corrective action results.' },
      { id: '10.3', title: 'Continual improvement', summary: 'Continually improve the suitability, adequacy and effectiveness of the ISMS.' },
    ],
  },
];

// Flat index includes nested subclauses (e.g. 7.5.1, 7.5.2, 7.5.3) so that
// Annex A entries can reference them by full identifier.
export const ISO_CLAUSES_FLAT = ISO_CLAUSES.flatMap(c => {
  const own = c.subclauses.map(s => ({ ...s, parent: c.id, parentTitle: c.title }));
  const nested = c.subclauses.flatMap(s =>
    (s.sub || []).map(n => ({ ...n, parent: s.id, parentTitle: s.title }))
  );
  return [...own, ...nested];
});
export const ISO_CLAUSE_BY_ID = ISO_CLAUSES_FLAT.reduce((a, c) => { a[c.id] = c; return a; }, {});

/** Climate amendment content. Applies to Clauses 4.1 and 4.2 only. */
export const CLIMATE_AMENDMENT = {
  id: 'amd1',
  source: ISO_SOURCES.amendment,
  appliesTo: ['4.1', '4.2'],
  clause41: {
    cite: 'ISO/IEC 27001:2022/Amd 1:2024 — Clause 4.1',
    requirement: 'The organisation shall determine whether climate change is a relevant issue.',
    guidance: [
      'Record a reasoned determination. The amendment requires a decision; it does not pre-ordain an answer.',
      'Relevant is contextual. A company whose operations, supply chain, data centres or legal exposure are materially affected by climate change will often find it relevant. A company with very few dependencies may not.',
      'Capture the reasoning, the date, the assessor, and the evidence used — an auditor will want the reasoning, not just the answer.',
      'The determination is not a one-off. Revisit it when organisational context changes or when management review considers external issues.',
      'Being explicit that you considered it and found it not relevant is a legitimate, defensible outcome. Silence is not.',
    ],
    for: 'Recommended approach to recording the determination, not standard text.',
  },
  clause42: {
    cite: 'ISO/IEC 27001:2022/Amd 1:2024 — Clause 4.2',
    requirement: 'The amendment notes that relevant interested parties may have requirements related to climate change.',
    guidance: [
      'When identifying interested parties and their requirements, consider whether any of them have climate-related requirements.',
      'Examples of parties that may have such requirements: customers with supply-chain disclosure obligations, investors with climate reporting expectations, insurers, and certain regulators or contracting authorities.',
      'Record the interested parties you assessed, whether they have climate-related requirements, and the evidence relied upon.',
      'This is a consideration within 4.2, not a separate climate reporting duty. It does not by itself create emissions reporting obligations.',
    ],
    for: 'Recommended approach to identifying relevant parties, not standard text.',
  },
};

/** Index: clause id -> Annex A controls that reference it. */
export const ANNEX_A_BY_CLAUSE = ISO_CLAUSES_FLAT.reduce((acc, c) => {
  acc[c.id] = ANNEX_A_CONTROLS.filter(a => a.clauses.includes(c.id)).map(a => a.id);
  return acc;
}, {});

export function searchAnnexA(query, { theme = 'all' } = {}) {
  const q = (query || '').trim().toLowerCase();
  return ANNEX_A_CONTROLS.filter(c => {
    if (theme !== 'all' && c.theme !== theme) return false;
    if (!q) return true;
    return (
      c.id.toLowerCase().includes(q) ||
      c.title.toLowerCase().includes(q) ||
      c.purpose.toLowerCase().includes(q) ||
      c.risks.some(r => r.includes(q.replace(/\s+/g, '-')))
    );
  });
}
