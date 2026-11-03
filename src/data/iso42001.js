// ISO/IEC 42001:2023 control library. Single source of truth for the /iso/42001
// page, its exports, the template generator and the GRC assistant.
// All wording is original guidance. Only control numbers and short titles come
// from the standard. Crosswalks are indicative and left blank when not defensible.

export const CONTENT_VERSION = { version: '1.0', lastReviewed: '3 November 2026', standard: 'ISO/IEC 42001:2023' };
export const OFFICIAL_URL = 'https://www.iso.org/standard/81230.html';

export const NOTICE = 'This is practical guidance. It does not replace the standard or an accredited auditor\'s judgement, and using this site or its templates does not lead to certification by itself.';
export const TYPE_EXPLAINER = {
  Clause: 'Clause requirements (4 to 10) are mandatory for conformity. They cannot be excluded.',
  'Annex A': 'Annex A controls are selected through risk treatment. Each one is included or excluded with a justification in the Statement of Applicability.',
};

export const ROLES = ['Provider', 'Developer', 'Deployer'];
export const PDCA = ['Plan', 'Do', 'Check', 'Act'];
export const MATURITY = ['Must have', 'Should have', 'Nice to have'];
export const STATUSES = ['Not started', 'In progress', 'Evidence uploaded', 'Reviewed', 'Not applicable'];

export const THEMES = {
  4: 'Context of the organization', 5: 'Leadership', 6: 'Planning', 7: 'Support', 8: 'Operation', 9: 'Performance evaluation', 10: 'Improvement',
  'A.2': 'Policies related to AI', 'A.3': 'Internal organization', 'A.4': 'Resources for AI systems', 'A.5': 'Assessing impacts of AI systems',
  'A.6': 'AI system life cycle', 'A.7': 'Data for AI systems', 'A.8': 'Information for interested parties', 'A.9': 'Use of AI systems', 'A.10': 'Third-party and customer relationships',
};
const PHASE = { 4: 'Plan', 5: 'Plan', 6: 'Plan', 7: 'Do', 8: 'Do', 9: 'Check', 10: 'Act', 'A.2': 'Plan', 'A.3': 'Plan', 'A.4': 'Plan', 'A.5': 'Plan', 'A.6': 'Do', 'A.7': 'Do', 'A.8': 'Do', 'A.9': 'Do', 'A.10': 'Do' };

const ANNUAL = 'Annual and on significant change';
const QUARTERLY = 'Quarterly';
const EVENT = 'Per event, reviewed annually';
const RELEASE = 'Every release, reviewed annually';
const ALL = ['All'];
const PD = ['Provider', 'Developer'];
const LEAD = 'AI Governance Lead', TOP = 'Top Management', RISK = 'Risk Owner', SEC = 'Security Lead', AUD = 'Internal Auditor', DATA = 'Data Steward', ML = 'ML Engineering Lead', PROD = 'Product Owner', LEGAL = 'Legal and Compliance', HR = 'HR Lead', PROC = 'Procurement Lead';

const c = (id, title, ownerRole, reviewFrequency, appliesTo, maturity, plainEnglishSummary, implementationGuidance, evidence, r) => {
  const key = id.startsWith('A.') ? id.split('.').slice(0, 2).join('.') : id.split('.')[0];
  return {
    id, title, type: id.startsWith('A.') ? 'Annex A' : 'Clause', theme: THEMES[key], pdcaPhase: r.phase || PHASE[key],
    plainEnglishSummary, implementationGuidance, evidence, ownerRole, reviewFrequency,
    relatedPolicies: r.p, relatedTemplates: r.t,
    relatedDocumentTests: evidence.map((e) => `Inspect ${e.charAt(0).toLowerCase()}${e.slice(1)}: it exists, is current, and has an owner and approval.`),
    appliesTo, commonGaps: r.g, auditorQuestions: r.q,
    crosswalk: { iso27001: r.i || '', nistAiRmf: r.n || '', euAiAct: r.e || '', soc2: r.s || '' },
    maturity,
  };
};

export const CONTROLS = [
  // Clause 4
  c('4.1', 'Understanding the organization and its context', LEAD, ANNUAL, ALL, 'Must have', 'Work out what inside and outside the organization affects your AI goals.',
    ['Identify internal and external issues affecting AI goals, including laws, climate considerations and your AI role.', 'Determine whether you act as provider, developer, deployer or more than one.', 'Record the purpose of each AI system you build or use.'],
    ['Approved context analysis'], { p: ['ai-policy'], t: ['aims-context-analysis'], g: ['AI role not stated, so obligations cannot be mapped.', 'Copied ISMS context with no AI issues.'], q: ['What is your role for each AI system, and how did you decide?', 'When was the context analysis last updated?'], i: 'Clause 4.1', n: 'MAP 1.1', s: 'CC3.1' }),
  c('4.2', 'Needs and expectations of interested parties', LEAD, ANNUAL, ALL, 'Must have', 'List who cares about your AI systems and what they require.',
    ['List interested parties and their requirements, including customers, regulators and affected individuals.', 'Decide which requirements the AIMS will address.', 'Link each requirement to an owner.'],
    ['Stakeholder and obligations register'], { p: ['ai-policy'], t: ['aims-obligations-register'], g: ['Affected individuals are missing because they are not customers.'], q: ['Which requirements did you decide not to address, and why?'], i: 'Clause 4.2', n: 'GOVERN 1.1, GOVERN 5.1', e: 'Indicative input to Art. 17 for high-risk systems', s: 'CC2.3' }),
  c('4.3', 'Determining the scope of the AIMS', LEAD, ANNUAL, ALL, 'Must have', 'Draw a clear boundary around what the AIMS covers.',
    ['Define in-scope AI systems, teams, locations, interfaces and exclusions.', 'Base the scope on 4.1 and 4.2.', 'Have top management sign it.'],
    ['Signed scope statement', 'AI system inventory'], { p: ['ai-policy'], t: ['aims-scope-statement', 'ai-system-inventory'], g: ['Scope names no specific AI systems.', 'Embedded third-party AI features left out with no reason.'], q: ['Does the inventory reconcile with what is running in production?', 'Why is each exclusion justified?'], i: 'Clause 4.3', n: 'GOVERN 1.6', s: 'CC2.3' }),
  c('4.4', 'AI management system', LEAD, ANNUAL, ALL, 'Must have', 'Run AI governance as a connected set of processes rather than a set of documents.',
    ['Establish the AIMS processes and how they interact.', 'Maintain and improve them over time.'],
    ['AIMS manual or process map'], { p: ['ai-policy'], t: ['aims-manual'], g: ['Process map exists but nobody follows it.'], q: ['Walk me through how a new AI system enters the AIMS.'], i: 'Clause 4.4', n: 'GOVERN 1.4', e: 'Indicative link to Art. 17', s: 'CC2.1' }),
  // Clause 5
  c('5.1', 'Leadership and commitment', TOP, QUARTERLY, ALL, 'Must have', 'Senior leaders must visibly own and fund AI governance.',
    ['Name an accountable executive, fund the program and integrate AI governance into business processes.', 'Set up a governance committee with a regular cadence.'],
    ['Committee charter', 'Agendas and minutes', 'Budget approval'], { p: ['ai-policy'], t: ['ai-governance-charter'], g: ['Committee is chartered but has never met.'], q: ['Show a decision leadership made in the last review period.'], i: 'Clause 5.1', n: 'GOVERN 2.3', s: 'CC1.1, CC1.2' }),
  c('5.2', 'AI policy', TOP, ANNUAL, ALL, 'Must have', 'Publish a top-level statement of how the organization approaches AI.',
    ['Publish a policy suited to the organization\'s purpose, with objectives and commitments to meet requirements and improve.', 'Communicate it to staff and make it available to interested parties as appropriate.'],
    ['Approved, communicated policy'], { p: ['ai-policy'], t: [], g: ['Policy lacks a commitment to continual improvement.'], q: ['How do staff access the policy, and how do you know they read it?'], i: 'Clause 5.2', n: 'GOVERN 1.2', s: 'CC5.3' }),
  c('5.3', 'Roles, responsibilities and authorities', TOP, ANNUAL, ALL, 'Must have', 'Everyone with an AIMS duty knows it, and someone reports to leadership.',
    ['Assign AIMS responsibilities and reporting lines to leadership.', 'Include authority to stop a release or a system.'],
    ['RACI', 'Job descriptions'], { p: ['ai-policy'], t: ['aims-raci'], g: ['Named roles have left and were not reassigned.'], q: ['Who can stop a model release?'], i: 'Clause 5.3', n: 'GOVERN 2.1', s: 'CC1.3' }),
  // Clause 6
  c('6.1.1', 'Actions to address risks and opportunities: general', RISK, ANNUAL, ALL, 'Must have', 'Plan for what could stop or help the AIMS from achieving its results.',
    ['Determine the risks and opportunities the AIMS must address, using context, stakeholders and AI objectives.', 'Plan actions and how you will check they worked.'],
    ['Risk and opportunity log', 'Planned actions'], { p: ['ai-risk-policy'], t: ['ai-risk-register'], g: ['Opportunities ignored; only risks recorded.', 'AIMS-level risks mixed up with system-level risks.'], q: ['Which opportunities did you record, and what did you do about them?'], i: 'Clause 6.1.1', n: 'GOVERN 1.3', s: 'CC3.1' }),
  c('6.1.2', 'AI risk assessment', RISK, ANNUAL, ALL, 'Must have', 'Use one repeatable method to find, analyse and rank AI risks.',
    ['Define criteria and a repeatable method.', 'Identify, analyse and evaluate risks, including consequences for organizations, individuals and society.', 'Assign an owner to every risk.'],
    ['Methodology', 'AI risk register'], { p: ['ai-risk-policy'], t: ['ai-risk-methodology', 'ai-risk-register'], g: ['Security risks only, with no fairness, safety or misuse risks.', 'No acceptance criteria.'], q: ['Would two assessors reach comparable results using your method?'], i: 'Clause 6.1.2', n: 'MAP 1.5, MAP 5.1, MEASURE 1.1', e: 'Art. 9 for high-risk systems', s: 'CC3.2' }),
  c('6.1.3', 'AI risk treatment', RISK, ANNUAL, ALL, 'Must have', 'Decide what to do about each risk and justify your control choices.',
    ['Select treatment options and controls, compare them to Annex A, and prepare the Statement of Applicability.', 'Obtain risk owner approval of the plan and residual risk.'],
    ['Treatment plan', 'Signed SoA with justifications'], { p: ['ai-risk-policy'], t: ['ai-risk-treatment-plan', 'aims-soa'], g: ['SoA exclusions have no justification.', 'Residual risk never accepted by an owner.'], q: ['Take one excluded control. Why is it excluded?', 'Who approved residual risk?'], i: 'Clause 6.1.3', n: 'MANAGE 1.2, MANAGE 1.3, MANAGE 1.4', e: 'Art. 9 for high-risk systems', s: 'CC3.2, CC5.1' }),
  c('6.1.4', 'AI system impact assessment', RISK, ANNUAL, ALL, 'Must have', 'Plan how you will assess effects on people and society, separately from business risk.',
    ['Define when and how to assess consequences for individuals, groups and society.', 'Feed results into risk assessment.'],
    ['Impact assessment process', 'Completed assessments'], { p: ['ai-impact-policy'], t: ['ai-impact-process', 'ai-impact-assessment'], g: ['Impact results never reach the risk register.'], q: ['Show one impact finding that changed a risk rating or a design.'], n: 'MAP 5.1', e: 'Indicative link to Art. 27 for deployers in scope' }),
  c('6.2', 'AI objectives and planning to achieve them', LEAD, QUARTERLY, ALL, 'Must have', 'Set measurable AI goals and a plan to reach them.',
    ['Set measurable objectives with owners, resources, timelines and evaluation methods.', 'Review status with leadership.'],
    ['Objectives register with status'], { p: ['ai-policy'], t: ['ai-objectives-register'], g: ['Objectives cannot be measured.'], q: ['How do you measure this objective, and what is the latest result?'], i: 'Clause 6.2', s: 'CC3.1' }),
  c('6.3', 'Planning of changes', LEAD, EVENT, ALL, 'Should have', 'Change the AIMS on purpose, not by accident.',
    ['Plan AIMS changes in a controlled way.', 'Assess the effect of each change on scope, risk and resources.'],
    ['Change log', 'Impact review'], { p: ['ai-policy'], t: ['aims-change-log'], g: ['AIMS changes are made with no record.'], q: ['Show the last significant AIMS change and how it was assessed.'], i: 'Clause 6.3', s: 'CC3.4' }),
  // Clause 7
  c('7.1', 'Resources', TOP, ANNUAL, ALL, 'Must have', 'Provide what the AIMS needs to work.',
    ['Identify and provide the people, tools, budget and infrastructure needed.', 'Revisit the plan when scope grows.'],
    ['Resource plan', 'Budget'], { p: ['ai-policy'], t: ['aims-resource-plan'], g: ['Governance tasks are unfunded side work.'], q: ['How do you know current resources are enough?'], i: 'Clause 7.1', n: 'GOVERN 2.3', s: 'CC1.4' }),
  c('7.2', 'Competence', HR, ANNUAL, ALL, 'Must have', 'People doing AIMS work must have the skills, and you must be able to prove it.',
    ['Define required skills, close gaps and retain proof.', 'Include non-technical skills such as ethics, law and domain knowledge.'],
    ['Skills matrix', 'Certificates', 'Training records'], { p: ['ai-policy'], t: ['ai-skills-matrix', 'ai-awareness-record'], g: ['Competence assumed from job title.'], q: ['How did you assess the competence of the model validator?'], i: 'Clause 7.2', n: 'GOVERN 2.2', e: 'Indicative link to Art. 4', s: 'CC1.4' }),
  c('7.3', 'Awareness', HR, ANNUAL, ALL, 'Must have', 'Staff should know the AI policy and why their part matters.',
    ['Ensure staff know the AI policy, their contribution and consequences of nonconformity.', 'Cover contractors who work with in-scope AI systems.'],
    ['Training completion', 'Attestations'], { p: ['ai-use-policy'], t: ['ai-awareness-record'], g: ['Training is generic security content with no AI topics.'], q: ['Ask a staff member what the AI policy means for their work.'], i: 'Clause 7.3', n: 'GOVERN 2.2', e: 'Indicative link to Art. 4', s: 'CC1.4, CC2.2' }),
  c('7.4', 'Communication', LEAD, ANNUAL, ALL, 'Should have', 'Decide who hears what about the AIMS, and when.',
    ['Define what, when, with whom and how to communicate about the AIMS.', 'Cover internal and external audiences.'],
    ['Communication plan', 'Samples'], { p: ['ai-transparency-policy'], t: ['aims-communication-plan'], g: ['Plan exists with no sample communications.'], q: ['Show a recent communication sent under this plan.'], i: 'Clause 7.4', s: 'CC2.2, CC2.3' }),
  c('7.5.1', 'Documented information: general', LEAD, ANNUAL, ALL, 'Must have', 'Know which documents the AIMS needs.',
    ['Identify all documents required by the standard and the organization.', 'Assign an owner to each.'],
    ['Master document list'], { p: ['aims-document-policy'], t: ['aims-document-register'], g: ['Required documents are missing from the list.'], q: ['Which documents did you decide you need beyond those the standard requires?'], i: 'Clause 7.5.1', s: 'CC2.1' }),
  c('7.5.2', 'Creating and updating', LEAD, EVENT, ALL, 'Should have', 'Keep documents identifiable, reviewed and approved.',
    ['Apply identification, format, review and approval rules.', 'Keep a version history.'],
    ['Template standard', 'Version history'], { p: ['aims-document-policy'], t: ['aims-document-register'], g: ['Documents show no version or approver.'], q: ['Who approved this version, and when?'], i: 'Clause 7.5.2', s: 'CC2.1' }),
  c('7.5.3', 'Control of documented information', LEAD, ANNUAL, ALL, 'Must have', 'Protect documents and make sure the right version is available.',
    ['Control access, distribution, storage, retention, changes and disposal.', 'Set retention using your legal and contract requirements.'],
    ['Document control procedure', 'Access records', 'Retention schedule'], { p: ['aims-document-policy'], t: ['aims-document-register'], g: ['Outdated versions remain in use.'], q: ['How do you stop people from using superseded documents?'], i: 'Clause 7.5.3', s: 'CC2.1' }),
  // Clause 8
  c('8.1', 'Operational planning and control', LEAD, ANNUAL, ALL, 'Must have', 'Run the AIMS day to day with defined criteria, including outsourced work.',
    ['Define criteria for AIMS processes and control outsourced work.', 'Control planned changes and review unintended ones.'],
    ['Procedures', 'Supplier controls', 'Change records'], { p: ['ai-development-policy', 'ai-third-party-policy'], t: ['ai-development-procedure'], g: ['Outsourced model work sits outside the process.'], q: ['How do you control work done by external providers?'], i: 'Clause 8.1', n: 'GOVERN 6.1', s: 'CC8.1, CC9.2' }),
  c('8.2', 'AI risk assessment', RISK, ANNUAL, ALL, 'Must have', 'Actually perform the risk assessment on schedule and when things change.',
    ['Run assessments at planned intervals and on significant change.', 'Define what counts as a significant change, such as a new model or data source.'],
    ['Dated assessments', 'Change triggers'], { p: ['ai-risk-policy'], t: ['ai-risk-register'], g: ['Model swapped with no reassessment.'], q: ['Which change most recently triggered a reassessment?'], i: 'Clause 8.2', n: 'MEASURE 1.1, MANAGE 4.1', e: 'Art. 9 for high-risk systems', s: 'CC3.2, CC3.4' }),
  c('8.3', 'AI risk treatment', RISK, QUARTERLY, ALL, 'Must have', 'Carry out the treatment plan and check it worked.',
    ['Implement the plan and verify effectiveness.', 'Update the plan when a treatment fails.'],
    ['Treatment status', 'Verification results'], { p: ['ai-risk-policy'], t: ['ai-risk-treatment-plan'], g: ['Treatments marked complete with no effectiveness check.'], q: ['How did you verify this treatment reduced the risk?'], i: 'Clause 8.3', n: 'MANAGE 2.1', s: 'CC3.2, CC4.1' }),
  c('8.4', 'AI system impact assessment', RISK, ANNUAL, ALL, 'Must have', 'Repeat impact assessments on schedule and when things change.',
    ['Repeat assessments at planned intervals and on significant change.', 'Retain results as documented information.'],
    ['Updated assessments'], { p: ['ai-impact-policy'], t: ['ai-impact-assessment'], g: ['Assessment done once at launch and never repeated.'], q: ['When was this assessment last repeated, and what triggered it?'], n: 'MANAGE 4.1' }),
  // Clause 9
  c('9.1', 'Monitoring, measurement, analysis and evaluation', LEAD, QUARTERLY, ALL, 'Must have', 'Measure whether the AIMS is working.',
    ['Define what to measure, how, when and who reviews results.', 'Evaluate performance as well as collecting numbers.'],
    ['KPI definitions', 'Reports', 'Dashboards'], { p: ['ai-policy'], t: ['ai-kpi-report'], g: ['Metrics collected but nobody acts on them.'], q: ['What did you change as a result of these measurements?'], i: 'Clause 9.1', n: 'MEASURE 1.1, MEASURE 4.1', s: 'CC4.1' }),
  c('9.2.1', 'Internal audit: general', AUD, ANNUAL, ALL, 'Must have', 'Check independently that the AIMS conforms and works.',
    ['Audit the AIMS at planned intervals against requirements.', 'Cover your own requirements and the standard.'],
    ['Audit reports'], { p: ['ai-policy'], t: ['aims-internal-audit-report'], g: ['Audit covers only documents, not operation.'], q: ['Show how a finding from the last audit was closed.'], i: 'Clause 9.2.1', s: 'CC4.1' }),
  c('9.2.2', 'Internal audit programme', AUD, ANNUAL, ALL, 'Must have', 'Plan audits so that they are objective and cover everything over time.',
    ['Plan frequency, methods and responsibilities, and keep auditors objective and independent.', 'Weigh importance and earlier results when planning.'],
    ['Audit programme', 'Audit plan', 'Auditor independence record'], { p: ['ai-policy'], t: ['aims-internal-audit-programme'], g: ['Auditor reviewed their own work.'], q: ['How is the auditor independent of what was audited?'], i: 'Clause 9.2.2', s: 'CC4.1' }),
  c('9.3.1', 'Management review: general', TOP, ANNUAL, ALL, 'Must have', 'Leaders regularly review whether the AIMS is still fit for purpose.',
    ['Hold reviews at planned intervals.', 'Require attendance by accountable leaders.'],
    ['Review schedule', 'Attendance'], { p: ['ai-policy'], t: ['aims-management-review'], g: ['Review held below top management level.'], q: ['Who attended, and did they have authority to decide?'], i: 'Clause 9.3.1', s: 'CC4.2' }),
  c('9.3.2', 'Management review inputs', LEAD, ANNUAL, ALL, 'Must have', 'Give leaders the facts they need for the review.',
    ['Cover prior actions, changes, performance, audits, nonconformities and improvement opportunities.', 'Use a fixed agenda so no input is missed.'],
    ['Review pack'], { p: ['ai-policy'], t: ['aims-management-review'], g: ['Required inputs are missing from the pack.'], q: ['Where in the pack are interested party changes covered?'], i: 'Clause 9.3.2', s: 'CC4.2' }),
  c('9.3.3', 'Management review results', TOP, ANNUAL, ALL, 'Must have', 'Record what leaders decided.',
    ['Record decisions on improvements and changes.', 'Assign owners and dates to actions.'],
    ['Minutes', 'Action log'], { p: ['ai-policy'], t: ['aims-management-review'], g: ['Minutes record discussion but no decisions.'], q: ['Show that last review\'s actions were completed.'], i: 'Clause 9.3.3', s: 'CC4.2' }),
  // Clause 10
  c('10.1', 'Continual improvement', LEAD, QUARTERLY, ALL, 'Must have', 'Keep making the AIMS better.',
    ['Improve suitability, adequacy and effectiveness on a defined cycle.', 'Use audit, incident and monitoring results as inputs.'],
    ['Improvement log'], { p: ['ai-policy'], t: ['aims-improvement-log'], g: ['No improvement record outside audit findings.'], q: ['What improved in the AIMS this year?'], i: 'Clause 10.1', n: 'GOVERN 1.5', s: 'CC4.2' }),
  c('10.2', 'Nonconformity and corrective action', LEAD, EVENT, ALL, 'Must have', 'When something goes wrong, fix the cause as well as the symptom.',
    ['Contain the issue, find the root cause, fix it and verify effectiveness.', 'Check whether similar issues exist elsewhere.'],
    ['CAPA log', 'Root cause analysis', 'Closure proof'], { p: ['ai-policy'], t: ['ai-capa-log'], g: ['Actions closed with no effectiveness check.'], q: ['Take one closed action. How do you know it worked?'], i: 'Clause 10.2', s: 'CC4.2, CC7.5' }),

  // A.2
  c('A.2.2', 'AI policy', TOP, ANNUAL, ALL, 'Must have', 'Document the policy that governs AI development or use.',
    ['Document the policy for AI development or use.', 'Align it to business strategy and legal needs.'],
    ['Approved policy'], { p: ['ai-policy'], t: [], g: ['Policy covers use but not development, or the reverse.'], q: ['Does the policy match how AI is actually used here?'], i: 'A.5.1', n: 'GOVERN 1.2', s: 'CC5.3' }),
  c('A.2.3', 'Alignment with other organizational policies', LEAD, ANNUAL, ALL, 'Should have', 'Make sure AI rules do not clash with other policies.',
    ['Map how security, privacy, quality and HR policies interact with AI objectives.', 'Resolve conflicts and record who decided.'],
    ['Policy alignment matrix'], { p: ['ai-policy'], t: ['ai-policy-alignment'], g: ['Privacy and AI policies give conflicting rules.'], q: ['Which policies were changed because of AI?'], i: 'A.5.1', n: 'GOVERN 1.2', s: 'CC5.3' }),
  c('A.2.4', 'Review of the AI policy', LEAD, ANNUAL, ALL, 'Must have', 'Keep the AI policy current.',
    ['Review on a schedule and on major change.', 'Record the outcome even when nothing changes.'],
    ['Review records', 'Version history'], { phase: 'Check', p: ['ai-policy'], t: ['aims-document-register'], g: ['Policy date has passed its review cycle.'], q: ['What triggered the last policy review?'], i: 'A.5.1', n: 'GOVERN 1.5', s: 'CC5.3' }),
  // A.3
  c('A.3.2', 'AI roles and responsibilities', LEAD, ANNUAL, ALL, 'Must have', 'Allocate who does what across the AI life cycle.',
    ['Allocate AI responsibilities across the life cycle.', 'Cover risk, security, privacy, safety, data quality and human oversight.'],
    ['RACI'], { p: ['ai-policy'], t: ['aims-raci'], g: ['Responsibilities stop at deployment.'], q: ['Who owns this system once it is in production?'], i: 'A.5.2', n: 'GOVERN 2.1', s: 'CC1.3' }),
  c('A.3.3', 'Reporting of concerns', LEGAL, ANNUAL, ALL, 'Must have', 'Give people a safe way to raise AI concerns.',
    ['Provide a confidential channel, with non-retaliation and tracked follow-up.', 'Tell staff the channel exists.'],
    ['Reporting procedure', 'Case log'], { p: ['ai-incident-policy'], t: ['ai-concern-log'], g: ['Only a general HR channel exists, and staff do not know AI concerns belong there.'], q: ['How is a reporter protected?'], i: 'A.6.8', n: 'GOVERN 4.3', s: 'CC2.2' }),
  // A.4
  c('A.4.2', 'Resource documentation', ML, ANNUAL, ALL, 'Should have', 'Record what each AI system needs to run.',
    ['Record the resources each AI system needs across its life cycle.', 'Keep the record per system, linked to the inventory.'],
    ['Resource inventory per system'], { p: ['ai-development-policy'], t: ['aims-resource-plan'], g: ['Only models are listed; other components are missing.'], q: ['Is this record current for the system in production?'], i: 'A.5.9', n: 'GOVERN 1.6', s: 'CC6.1' }),
  c('A.4.3', 'Data resources', DATA, ANNUAL, ALL, 'Must have', 'Record what data each AI system uses.',
    ['Record data sources, type, provenance, categories and retention.', 'Include production inputs as well as training data.'],
    ['Data inventory'], { p: ['ai-data-policy'], t: ['ai-data-inventory'], g: ['Prompts and outputs are missing from the data inventory.'], q: ['Where does this training set come from?'], i: 'A.5.9, A.5.12', n: 'MAP 2.3', e: 'Art. 10 for high-risk systems', s: 'C1.1' }),
  c('A.4.4', 'Tooling resources', ML, RELEASE, PD, 'Should have', 'Record the models, frameworks and tools you depend on.',
    ['Record models, frameworks, libraries, pipelines and versions.', 'Update the record through the build where possible.'],
    ['AI bill of materials'], { p: ['ai-development-policy'], t: ['ai-bom'], g: ['Versions are not recorded, so a build cannot be reproduced.'], q: ['Which model version is in production today?'], i: 'A.5.9, A.8.28', n: 'MAP 4.1', s: 'CC6.1' }),
  c('A.4.5', 'System and computing resources', ML, ANNUAL, PD, 'Nice to have', 'Record the compute and hosting each system needs.',
    ['Record compute, storage, hosting and capacity needs.', 'Note resilience and environmental considerations where relevant.'],
    ['Architecture and capacity records'], { p: ['ai-development-policy'], t: ['aims-resource-plan'], g: ['Capacity limits are unknown until an outage.'], q: ['How do you plan capacity for inference?'], i: 'A.8.6', n: 'MEASURE 2.12', s: 'A1.1' }),
  c('A.4.6', 'Human resources', HR, ANNUAL, ALL, 'Should have', 'Record the people and skills each AI system needs.',
    ['Record required roles and competencies, including diverse expertise.', 'Identify single points of failure.'],
    ['Skills matrix'], { p: ['ai-policy'], t: ['ai-skills-matrix'], g: ['One person holds all model knowledge.'], q: ['What happens if this person leaves?'], i: 'A.6.3', n: 'GOVERN 3.1', s: 'CC1.4' }),
  // A.5
  c('A.5.2', 'AI system impact assessment process', RISK, ANNUAL, ALL, 'Must have', 'Define how impact assessments run.',
    ['Define triggers, method, approvers and frequency.', 'Include people who understand the affected groups.'],
    ['Approved process'], { p: ['ai-impact-policy'], t: ['ai-impact-process'], g: ['No trigger defined, so assessments depend on memory.'], q: ['What triggers an assessment?'], n: 'MAP 5.1', e: 'Indicative link to Art. 27 for deployers in scope' }),
  c('A.5.3', 'Documentation of AI system impact assessments', RISK, ANNUAL, ALL, 'Must have', 'Keep assessment results and decide how long to hold them.',
    ['Keep results and retention rules.', 'Make results available to those who need them.'],
    ['Assessment repository'], { p: ['ai-impact-policy'], t: ['ai-impact-assessment'], g: ['Assessments sit in personal folders.'], q: ['How long are assessments kept, and why?'], n: 'MAP 5.1' }),
  c('A.5.4', 'Assessing impact on individuals or groups', RISK, EVENT, ALL, 'Must have', 'Assess how a system could affect specific people.',
    ['Assess fairness, privacy, safety, autonomy and accessibility, including vulnerable groups.', 'Record mitigations and who accepted any remaining impact.'],
    ['Completed assessments', 'Mitigations'], { p: ['ai-impact-policy'], t: ['ai-impact-assessment'], g: ['Vulnerable groups are not considered.'], q: ['Which groups did you consider, and which did you consult?'], n: 'MAP 5.1, MEASURE 2.11', e: 'Indicative link to Art. 27 for deployers in scope' }),
  c('A.5.5', 'Assessing societal impacts', RISK, EVENT, ALL, 'Should have', 'Consider the wider effects of a system.',
    ['Assess wider effects such as environment, economy, misinformation and democratic processes where relevant.', 'Record why an effect is not applicable.'],
    ['Completed assessments', 'Rationale for anything not applicable'], { p: ['ai-impact-policy'], t: ['ai-impact-assessment'], g: ['Section left blank instead of stating why it is not relevant.'], q: ['Why did you decide this societal impact is not relevant?'], n: 'MAP 5.1, MEASURE 2.12' }),
  // A.6
  c('A.6.1.2', 'Objectives for responsible development', ML, ANNUAL, PD, 'Must have', 'Set goals for responsible development and build them into delivery.',
    ['Define objectives and embed them into requirements and gates.', 'Measure them at each gate.'],
    ['Objectives', 'Stage gate criteria'], { p: ['ai-development-policy'], t: ['ai-development-procedure'], g: ['Objectives exist but no gate checks them.'], q: ['Show a release that a gate stopped or changed.'], n: 'MAP 1.3', s: 'CC8.1' }),
  c('A.6.1.3', 'Processes for responsible design and development', ML, ANNUAL, PD, 'Must have', 'Define the steps for building AI responsibly.',
    ['Define stages, reviews, testing, approvals, training data expectations and human oversight needs.', 'Connect them to the existing SDLC.'],
    ['AI SDLC procedure'], { p: ['ai-development-policy'], t: ['ai-development-procedure'], g: ['AI experiments reach production outside the SDLC.'], q: ['How does a prototype become a production system?'], i: 'A.8.25', n: 'GOVERN 1.4', e: 'Art. 17 for high-risk systems', s: 'CC8.1' }),
  c('A.6.2.2', 'Requirements and specification', PROD, EVENT, PD, 'Must have', 'Write down what the system must do.',
    ['Document functional, performance, fairness, security and data requirements.', 'Make each requirement testable.'],
    ['Requirements document'], { p: ['ai-development-policy'], t: ['ai-requirements-spec'], g: ['No fairness or misuse requirements.'], q: ['How does this requirement trace to a test?'], i: 'A.8.26', n: 'MAP 1.6', s: 'CC8.1' }),
  c('A.6.2.3', 'Documentation of design and development', ML, RELEASE, PD, 'Must have', 'Record how the system was designed and why.',
    ['Record architecture, model choices, training approach and trade-offs.', 'Update it when the design changes.'],
    ['Design document', 'Model card'], { p: ['ai-development-policy'], t: ['ai-model-card'], g: ['Model card is out of date.'], q: ['Why did you choose this model over alternatives?'], i: 'A.8.27', n: 'MAP 2.2', e: 'Art. 11 for high-risk systems', s: 'CC8.1' }),
  c('A.6.2.4', 'Verification and validation', ML, RELEASE, PD, 'Must have', 'Prove the system meets its requirements before release.',
    ['Define test data, metrics, thresholds and release criteria.', 'Test with independent data, including affected subgroups.'],
    ['Test results', 'Sign-off'], { p: ['ai-development-policy'], t: ['ai-validation-report'], g: ['Thresholds set after seeing the results.'], q: ['Who set the release threshold, and when?'], i: 'A.8.29', n: 'MEASURE 2.3, MEASURE 2.5, MEASURE 2.11', e: 'Art. 15 for high-risk systems', s: 'CC8.1' }),
  c('A.6.2.5', 'Deployment', ML, RELEASE, PD, 'Must have', 'Release in a planned, reversible way.',
    ['Define a release plan, approvals, rollback and environment requirements.', 'Confirm requirements are met before go-live.'],
    ['Deployment checklist', 'Change tickets'], { p: ['ai-development-policy'], t: ['ai-deployment-checklist'], g: ['No rollback path for a model change.'], q: ['Show how you would roll back this model.'], i: 'A.8.32', n: 'MANAGE 2.4', s: 'CC8.1' }),
  c('A.6.2.6', 'Operation and monitoring', ML, QUARTERLY, ['Provider', 'Developer', 'Deployer'], 'Must have', 'Watch the system in production and act on what you find.',
    ['Monitor performance, drift, errors, misuse and incidents, and plan repairs and updates.', 'Set alert thresholds and owners.'],
    ['Dashboards', 'Alerts', 'Runbooks'], { phase: 'Check', p: ['ai-development-policy'], t: ['ai-monitoring-runbook'], g: ['Dashboards exist, but no alert reaches a person.'], q: ['Show the last drift alert and what happened next.'], i: 'A.8.16', n: 'MEASURE 2.4, MANAGE 4.1', e: 'Art. 72 for high-risk systems', s: 'CC7.1, CC7.2' }),
  c('A.6.2.7', 'Technical documentation', ML, RELEASE, ['Provider', 'Developer'], 'Should have', 'Give each audience the technical information it needs.',
    ['Prepare documentation for each audience: users, partners and regulators.', 'Keep it versioned with the system.'],
    ['Technical documentation pack'], { p: ['ai-transparency-policy'], t: ['ai-technical-file'], g: ['One document written only for engineers.'], q: ['Which version of the documents matches this release?'], i: 'A.5.37', n: 'MAP 2.2', e: 'Art. 11 for high-risk systems', s: 'CC2.3' }),
  c('A.6.2.8', 'Event logs', ML, ANNUAL, ['Provider', 'Developer', 'Deployer'], 'Must have', 'Decide what to log, keep it, and protect it.',
    ['Decide what to log, retain it and protect it from tampering.', 'Redact personal data and secrets from prompts and outputs where possible.'],
    ['Logging configuration', 'Retention settings', 'Samples'], { p: ['ai-development-policy'], t: ['ai-logging-spec'], g: ['Logs lack model version, so a decision cannot be reconstructed.'], q: ['Can you reconstruct this output from your logs?'], i: 'A.8.15', e: 'Art. 12 for high-risk systems', s: 'CC7.2' }),
  // A.7
  c('A.7.2', 'Data for development and enhancement', DATA, ANNUAL, PD, 'Must have', 'Manage data used to build and improve AI systems.',
    ['Define and apply data management processes.', 'Cover privacy, security, transparency and data use limits.'],
    ['Data management procedure'], { p: ['ai-data-policy'], t: ['ai-data-inventory'], g: ['Production data copied into training with no approval.'], q: ['Who approves using a new dataset for training?'], i: 'A.5.12', n: 'MAP 2.3', e: 'Art. 10 for high-risk systems', s: 'C1.1' }),
  c('A.7.3', 'Acquisition of data', DATA, EVENT, PD, 'Must have', 'Check you are allowed to use data before you get it.',
    ['Check source, rights, consent and quality.', 'Keep the licence or legal basis with the record.'],
    ['Acquisition records', 'Licences'], { p: ['ai-data-policy'], t: ['ai-data-inventory'], g: ['Scraped data used with no rights review.'], q: ['What gives you the right to use this dataset?'], n: 'GOVERN 6.1, MAP 4.1', e: 'Art. 10 for high-risk systems' }),
  c('A.7.4', 'Quality of data', DATA, EVENT, PD, 'Must have', 'Set and check data quality requirements.',
    ['Define quality requirements, including representativeness and bias.', 'Test against them before use.'],
    ['Data quality reports'], { p: ['ai-data-policy'], t: ['ai-data-quality-report'], g: ['Representativeness never checked.'], q: ['How do you know the data represents the people affected?'], n: 'MEASURE 2.11', e: 'Art. 10 for high-risk systems', s: 'PI1.2' }),
  c('A.7.5', 'Data provenance', DATA, EVENT, PD, 'Should have', 'Be able to trace where data came from and how it changed.',
    ['Track origin, transformations and versions.', 'Automate lineage where practical.'],
    ['Lineage records'], { p: ['ai-data-policy'], t: ['ai-data-inventory'], g: ['Training set version unknown for a production model.'], q: ['Which data version trained this model?'], n: 'MAP 2.3', e: 'Art. 10 for high-risk systems' }),
  c('A.7.6', 'Data preparation', DATA, EVENT, PD, 'Should have', 'Document how data is prepared.',
    ['Define and document cleaning, labelling, normalization and splitting.', 'Check label quality and leakage between splits.'],
    ['Preparation records', 'Labelling guidance'], { p: ['ai-data-policy'], t: ['ai-data-preparation-record'], g: ['Labelling rules are in one person\'s head.'], q: ['How was inter-labeller agreement checked?'], e: 'Art. 10 for high-risk systems' }),
  // A.8
  c('A.8.2', 'System documentation and information for users', PROD, RELEASE, ['Provider', 'Developer', 'Deployer'], 'Must have', 'Tell users what the system does and where it falls short.',
    ['Provide purpose, limitations, proper use and human oversight information.', 'Tell people when they are interacting with AI where required.'],
    ['User documentation', 'AI notices'], { p: ['ai-transparency-policy'], t: ['ai-user-notice'], g: ['Limitations left out of user documents.'], q: ['Where would a user learn this system\'s limits?'], n: 'MEASURE 2.8', e: 'Art. 13 for high-risk systems; Art. 50 where it applies', s: 'CC2.3' }),
  c('A.8.3', 'External reporting', LEGAL, ANNUAL, ALL, 'Must have', 'Let people outside the organization report harm.',
    ['Let external parties report adverse impacts.', 'Track each report to closure.'],
    ['Reporting channel', 'Handling log'], { p: ['ai-transparency-policy'], t: ['ai-concern-log'], g: ['Channel is hard to find or unmonitored.'], q: ['Test the channel. Who receives the report?'], n: 'GOVERN 5.1, MEASURE 3.3', s: 'CC2.3' }),
  c('A.8.4', 'Communication of incidents', LEGAL, ANNUAL, ALL, 'Must have', 'Plan how to tell people about AI incidents.',
    ['Define who to notify, when and how.', 'Check legal and contract notification duties and record them in the plan.'],
    ['AI incident plan', 'Notification records'], { p: ['ai-incident-policy'], t: ['ai-incident-plan'], g: ['Security incident plan has no AI harm scenarios.'], q: ['Does your plan cover a harmful output that is not a security breach?'], i: 'A.5.24, A.5.26', n: 'MANAGE 4.3', e: 'Art. 73 for high-risk systems', s: 'CC7.3, CC7.4' }),
  c('A.8.5', 'Information for interested parties', LEGAL, ANNUAL, ALL, 'Should have', 'Meet duties to report to regulators, customers and others.',
    ['Identify and meet obligations to report to regulators, customers and others.', 'Assign an owner and calendar to each duty.'],
    ['Obligations register', 'Sent reports'], { p: ['ai-transparency-policy'], t: ['aims-obligations-register'], g: ['Contract reporting duties are not tracked.'], q: ['What reports were owed this year, and were they sent?'], i: 'A.5.31', n: 'GOVERN 1.1', s: 'CC2.3' }),
  // A.9
  c('A.9.2', 'Processes for responsible use', LEAD, ANNUAL, ['Deployer'], 'Must have', 'Set rules for approving and using AI.',
    ['Define approval, usage and review rules.', 'Include staff use of external AI tools.'],
    ['Acceptable use procedure', 'Approvals'], { p: ['ai-use-policy'], t: ['ai-use-approval'], g: ['Staff use unapproved AI tools.'], q: ['How do you find AI tools in use without approval?'], i: 'A.5.10', n: 'GOVERN 1.2', e: 'Art. 26 for high-risk deployers', s: 'CC5.3' }),
  c('A.9.3', 'Objectives for responsible use', LEAD, ANNUAL, ['Deployer'], 'Should have', 'Set goals for how AI should be used.',
    ['Set objectives such as fairness, accountability and transparency.', 'Give each a measure.'],
    ['Objectives with measures'], { p: ['ai-use-policy'], t: ['ai-objectives-register'], g: ['Objectives repeat principles but have no measure.'], q: ['How do you measure this objective?'], n: 'GOVERN 1.2' }),
  c('A.9.4', 'Intended use', PROD, QUARTERLY, ['Deployer'], 'Must have', 'Use systems as documented, and notice when you do not.',
    ['Use systems as documented, and monitor for deviation.', 'Follow provider instructions, and keep human oversight in place.'],
    ['Intended use statements', 'Usage monitoring'], { p: ['ai-use-policy'], t: ['ai-intended-use'], g: ['Scope creep into uses that were never assessed.'], q: ['How would you detect use beyond the intended purpose?'], n: 'MAP 1.1, MAP 3.3', e: 'Art. 26 for high-risk deployers; Art. 14 for human oversight' }),
  // A.10
  c('A.10.2', 'Allocating responsibilities', LEGAL, ANNUAL, ALL, 'Must have', 'Be clear who does what across the AI supply chain.',
    ['Define responsibilities with partners, suppliers, customers and third parties.', 'Reflect them in contracts.'],
    ['Shared responsibility matrix', 'Contracts'], { p: ['ai-third-party-policy'], t: ['ai-responsibility-matrix'], g: ['Contracts are silent on model updates and data use.'], q: ['Who is responsible for monitoring this third-party model?'], i: 'A.5.19, A.5.20', n: 'GOVERN 6.1', e: 'Art. 25 for high-risk value chains', s: 'CC9.2' }),
  c('A.10.3', 'Suppliers', PROC, ANNUAL, ALL, 'Must have', 'Check AI suppliers and model providers fit your approach.',
    ['Assess AI suppliers and model providers for data use, retention, changes and alignment with your approach.', 'Reassess when a supplier changes a model or terms.'],
    ['Vendor assessments', 'Contract terms'], { p: ['ai-third-party-policy'], t: ['ai-vendor-assessment'], g: ['Standard security questionnaire with no AI questions.'], q: ['Does this provider train on your data? Where is that confirmed?'], i: 'A.5.19, A.5.21, A.5.22', n: 'GOVERN 6.1, MANAGE 3.1', s: 'CC9.2' }),
  c('A.10.4', 'Customers', PROD, ANNUAL, ['Provider', 'Developer'], 'Should have', 'Take customer needs into account when providing AI.',
    ['Consider customer expectations and needs when providing AI products or services.', 'Share what customers need for their own obligations.'],
    ['Customer terms', 'Documentation', 'Feedback'], { p: ['ai-third-party-policy'], t: ['ai-customer-checklist'], g: ['Customer AI questions answered case by case with no record.'], q: ['How does customer feedback reach the product team?'], n: 'GOVERN 5.1', s: 'CC2.3' }),
];

// Generic policy set. Mapped controls are derived from CONTROLS.relatedPolicies.
const pol = (slug, name, purpose, scope, owner, statements) => ({ slug, name, purpose, scope, owner, reviewCycle: 'Annual and on significant change', statements });
export const POLICIES = [
  pol('ai-policy', 'AI Policy', 'Sets the organization\'s direction and commitments for developing and using AI.', 'All AI systems in the AIMS scope and everyone who works on them.', TOP, ['AI is developed and used in line with our objectives, legal duties and stated principles.', 'We commit to meeting applicable requirements and to continually improving the AIMS.', 'Every AI system has a named owner and appears in the AI system inventory.', 'Exceptions need written approval from [Role] and an expiry date.']),
  pol('ai-risk-policy', 'AI Risk Management Policy', 'Defines how AI risks are assessed, treated and accepted.', 'All AI systems in scope across their life cycle.', RISK, ['Risks are assessed using the approved method before release and on significant change.', 'Each risk has an owner, a treatment decision and a review date.', 'Residual risk is accepted only by the role named in the risk criteria.']),
  pol('ai-impact-policy', 'AI System Impact Assessment Policy', 'Defines when and how effects on people and society are assessed.', 'All AI systems that could affect individuals, groups or society.', RISK, ['An impact assessment is completed before release of a new or significantly changed system.', 'Assessments consider fairness, privacy, safety, autonomy, accessibility and wider societal effects.', 'Results feed into AI risk assessment and are retained under the document control rules.']),
  pol('ai-development-policy', 'Responsible AI Development Policy', 'Sets requirements for designing, building, testing, releasing and operating AI systems.', 'AI systems developed or significantly modified by [Company Name].', ML, ['Every system passes defined stage gates before release.', 'Release thresholds are set before testing begins.', 'Production systems are monitored, logged and able to be rolled back.', 'Design decisions and model versions are documented.']),
  pol('ai-data-policy', 'AI Data Governance Policy', 'Sets rules for acquiring, preparing and using data for AI.', 'Data used to train, test, tune or operate AI systems.', DATA, ['Rights to use data are confirmed before acquisition.', 'Data quality and representativeness requirements are defined and tested.', 'Provenance and transformations are recorded.', 'Use of personal data follows the privacy policy.']),
  pol('ai-use-policy', 'AI Acceptable Use Policy', 'Sets rules for how staff may use AI systems and tools.', 'All staff and contractors using AI tools for work.', LEAD, ['Only approved AI tools may be used with company or customer data.', 'Users stay accountable for output and review it before relying on it.', 'Systems are used only for their documented intended purpose.', 'Suspected misuse or harm is reported through the concern channel.']),
  pol('ai-third-party-policy', 'AI Third-Party and Customer Policy', 'Sets how responsibilities are allocated with suppliers, partners and customers.', 'AI suppliers, model providers, partners and customers of AI services.', PROC, ['AI suppliers are assessed before onboarding and on material change.', 'Contracts state data use, retention, change notice and incident duties.', 'Customers receive the information they need to use the system appropriately.']),
  pol('ai-incident-policy', 'AI Incident and Concern Reporting Policy', 'Defines how AI incidents and concerns are reported, handled and communicated.', 'Harmful outputs, failures, misuse and concerns involving in-scope AI systems.', LEGAL, ['Anyone can report a concern confidentially and without retaliation.', 'Incidents are triaged, contained, investigated and tracked to closure.', 'Notification duties are checked for every incident.']),
  pol('ai-transparency-policy', 'AI Transparency and Communication Policy', 'Sets what is communicated about AI systems, and to whom.', 'Users, customers, regulators and other interested parties.', PROD, ['People are told when they interact with AI where this is required or expected.', 'Purpose, limitations and oversight information are documented for users.', 'External parties have a route to report adverse impacts.']),
  pol('aims-document-policy', 'AIMS Document Control Policy', 'Sets how AIMS documents are created, approved, protected and retired.', 'All documented information required by the AIMS.', LEAD, ['Each document has an owner, version and approver.', 'Superseded versions are archived and clearly marked.', 'Retention periods are set from legal and contract requirements.']),
];

// Generic AIMS templates. d = Word document with [section, sample text];
// x = Excel workbook with columns and one sample row. Placeholders only.
const d = (slug, name, purpose, sections) => ({ slug, name, purpose, format: 'docx', sections });
const x = (slug, name, purpose, columns, sample) => ({ slug, name, purpose, format: 'xlsx', columns, sample });
export const TEMPLATES = [
  d('aims-context-analysis', 'AIMS Context Analysis', 'Records internal and external issues and your AI role for each system.', [['AI role', '[Company Name] acts as deployer for [System] and developer for [System].'], ['External issues', 'Example: new AI regulation in [Region] affects [System].'], ['Internal issues', 'Example: limited ML staff for monitoring.'], ['Climate considerations', 'State whether climate change is relevant to the AIMS and why.'], ['Approval', 'Approved by [Role] on [Date].']]),
  x('aims-obligations-register', 'AIMS Stakeholder and Obligations Register', 'Lists interested parties, requirements, and reporting duties.', ['Interested party', 'Requirement', 'Source', 'Addressed in AIMS (Yes/No)', 'Rationale', 'Owner', 'Report due', 'Status'], ['Customers', 'Notice of material model change', 'Contract with [Customer Type]', 'Yes', 'Contractual duty', '[Role]', '[Date]', 'Open']),
  d('aims-scope-statement', 'AIMS Scope Statement', 'Defines in-scope AI systems, teams, locations, interfaces and exclusions.', [['In-scope AI systems', '[System] and [System], as listed in the AI system inventory.'], ['Teams and locations', '[Team] at [Location].'], ['Interfaces', '[Third-party model provider] supplies the model through an API.'], ['Exclusions', '[System] is excluded because [reason].'], ['Sign-off', 'Signed by [Role] on [Date].']]),
  x('ai-system-inventory', 'AI System Inventory', 'One record per AI system, with role, owner and risk tier.', ['System', 'Purpose', 'Your role', 'Owner', 'Model or provider', 'Data categories', 'Affected people', 'Risk tier', 'In scope', 'Last reviewed'], ['[System]', 'Summarises support tickets', 'Deployer', '[Role]', '[Provider]', 'Customer text', 'Customers', 'Medium', 'Yes', '[Date]']),
  d('aims-manual', 'AIMS Manual', 'Describes the AIMS processes and how they connect.', [['Purpose', 'Explains how [Company Name] runs its AIMS.'], ['Process map', 'Context, planning, operation, evaluation, improvement. Add your diagram.'], ['Process owners', '[Process]: [Role].'], ['Document links', 'Link to the master document list.']]),
  d('ai-governance-charter', 'AI Governance Committee Charter', 'Sets committee membership, authority, cadence and an agenda and minutes format.', [['Purpose and authority', 'The committee may approve, pause or stop AI systems.'], ['Members', '[Role], [Role], [Role].'], ['Cadence', 'Meets every [frequency].'], ['Standing agenda', 'Risks, incidents, objectives, changes, decisions needed.'], ['Minutes format', 'Date, attendees, decisions, actions, owners, due dates.']]),
  x('aims-raci', 'AIMS RACI', 'Assigns AIMS and life cycle responsibilities.', ['Activity', 'Life cycle stage', 'Responsible', 'Accountable', 'Consulted', 'Informed'], ['Approve model release', 'Deployment', '[Role]', '[Role]', '[Role]', '[Role]']),
  d('ai-risk-methodology', 'AI Risk Assessment Methodology', 'Defines criteria, scales and acceptance rules.', [['Risk criteria', 'Consequence scale for organization, individuals and society.'], ['Likelihood scale', 'Rare, possible, likely, with your own definitions.'], ['Risk sources', 'Bias, misuse, drift, security, data quality, third parties.'], ['Acceptance rules', 'Risks rated [level] need approval by [Role].'], ['When to repeat', 'At planned intervals and on significant change.']]),
  x('ai-risk-register', 'AI Risk and Opportunity Register', 'Records AIMS and system risks and opportunities.', ['ID', 'Type (risk or opportunity)', 'System', 'Description', 'Source', 'Consequence', 'Likelihood', 'Rating', 'Owner', 'Treatment decision', 'Review date'], ['R-001', 'Risk', '[System]', 'Lower accuracy for a language group', 'Data quality', 'High', 'Possible', 'High', '[Role]', 'Mitigate', '[Date]']),
  x('ai-risk-treatment-plan', 'AI Risk Treatment Plan', 'Tracks treatments, verification and residual risk approval.', ['Risk ID', 'Treatment option', 'Controls selected', 'Action', 'Owner', 'Due date', 'Status', 'Verification method', 'Verification result', 'Residual risk', 'Approved by'], ['R-001', 'Mitigate', 'A.7.4, A.6.2.4', 'Add subgroup testing', '[Role]', '[Date]', 'In progress', 'Review of test report', '', 'Medium', '[Role]']),
  x('aims-soa', 'AIMS Statement of Applicability', 'Blank SoA. The page\'s SoA builder exports the same format with your answers.', ['Control', 'Title', 'Applicable', 'Justification', 'Implementation status', 'Owner'], ['A.2.2', 'AI policy', 'Yes', 'Required by risk treatment R-001', 'In progress', '[Role]']),
  d('ai-impact-process', 'AI System Impact Assessment Process', 'Defines triggers, method, approvers and frequency.', [['Triggers', 'New system, new use, new data type, or a significant model change.'], ['Method', 'Screen, assess, mitigate, approve, record.'], ['Participants', 'Include people who understand the affected groups.'], ['Approval', '[Role] approves results.'], ['Frequency', 'Repeat every [period] and on significant change.']]),
  d('ai-impact-assessment', 'AI System Impact Assessment', 'Assesses effects on individuals, groups and society for one system.', [['System and purpose', '[System] does [purpose].'], ['Affected individuals and groups', 'Applicants, including [vulnerable group].'], ['Fairness, privacy, safety, autonomy, accessibility', 'Example: possible lower accuracy for [group].'], ['Societal impacts', 'State the effect, or why it is not applicable.'], ['Mitigations and remaining impact', 'Human review of [decision]. Accepted by [Role].'], ['Link to risk register', 'Feeds risk R-001.']]),
  x('ai-objectives-register', 'AI Objectives Register', 'Tracks AIMS and responsible use objectives.', ['Objective', 'Measure', 'Target', 'Owner', 'Resources', 'Due date', 'Evaluation method', 'Latest result', 'Status'], ['All production systems have current model cards', 'Percentage current', '[Target]', '[Role]', '[Team]', '[Date]', 'Quarterly sample', '', 'On track']),
  x('aims-change-log', 'AIMS Change Log', 'Records planned AIMS changes and their review.', ['Change', 'Reason', 'Impact on scope, risk and resources', 'Approved by', 'Date', 'Follow-up'], ['Add [System] to scope', 'New product', 'New risk assessment needed', '[Role]', '[Date]', 'Update inventory']),
  x('aims-resource-plan', 'AI Resource Plan', 'Records resources for the AIMS and each system.', ['System or AIMS', 'Resource type', 'Description', 'Capacity or quantity', 'Hosting', 'Owner', 'Budget', 'Last reviewed'], ['[System]', 'Computing', 'GPU inference', '[Quantity]', '[Provider]', '[Role]', '[Amount]', '[Date]']),
  x('ai-skills-matrix', 'AI Skills Matrix', 'Maps required competence to people and gaps.', ['Role', 'Required competence', 'Current level', 'Gap', 'Action', 'Proof', 'Single point of failure (Yes/No)', 'Review date'], ['[Role]', 'Fairness testing', 'Basic', 'Yes', 'Course by [Date]', 'Certificate', 'No', '[Date]']),
  x('ai-awareness-record', 'AI Awareness and Training Record', 'Records training completion and attestations.', ['Role or team', 'Course', 'Version', 'Completion date', 'Attestation (Yes/No)', 'Next due'], ['[Team]', 'AI policy essentials', '1.0', '[Date]', 'Yes', '[Date]']),
  x('aims-communication-plan', 'AIMS Communication Plan', 'Defines what, when, with whom and how.', ['Topic', 'Audience', 'Timing', 'Channel', 'Owner', 'Sample link'], ['AI policy update', 'All staff', 'On approval', 'Email', '[Role]', '[Link]']),
  x('aims-document-register', 'AIMS Master Document Register', 'Lists documents, versions, access and retention.', ['Document', 'Required by', 'Owner', 'Version', 'Approved by', 'Approved date', 'Next review', 'Location', 'Access', 'Retention', 'Disposal'], ['AI Policy', '5.2, A.2.2', '[Role]', '1.0', '[Role]', '[Date]', '[Date]', '[Location]', 'All staff', '[Set from your legal review]', '[Method]']),
  d('ai-development-procedure', 'AI Development Procedure', 'Defines stages, gates and approvals.', [['Stages', 'Idea, data, build, validate, deploy, operate, retire.'], ['Stage gates', 'Each gate lists exit criteria and approver.'], ['Responsible development objectives', 'Example: subgroup testing before release.'], ['Human oversight', 'Define oversight for each risk tier.'], ['Outsourced work', 'Suppliers follow the same gates.']]),
  x('ai-kpi-report', 'AIMS KPI Report', 'Defines measures and records results.', ['KPI', 'Definition', 'Method', 'Frequency', 'Owner', 'Target', 'Result', 'Reviewer', 'Action taken'], ['Overdue risk reviews', 'Count past review date', 'Register export', 'Quarterly', '[Role]', '[Target]', '', '[Role]', '']),
  x('aims-internal-audit-programme', 'AIMS Internal Audit Programme', 'Plans audits and records independence.', ['Audit area', 'Clauses and controls', 'Planned date', 'Method', 'Auditor', 'Independence confirmed', 'Status', 'Report link'], ['Risk process', '6.1, 8.2', '[Date]', 'Interview and sampling', '[Role]', 'Yes', 'Planned', '[Link]']),
  d('aims-internal-audit-report', 'AIMS Internal Audit Report', 'Records audit scope, findings and conclusions.', [['Scope and criteria', 'Audited [area] against ISO/IEC 42001 and internal rules.'], ['Sample and method', 'Sampled [number] records.'], ['Findings', 'Finding, requirement, evidence, grade.'], ['Conclusion', 'Conforms, or does not conform, because [reason].'], ['Distribution', 'Reported to [Role].']]),
  d('aims-management-review', 'AIMS Management Review Pack and Minutes', 'Fixed agenda covering inputs, decisions and actions.', [['Attendance', '[Role], [Role].'], ['Prior actions', 'Status of earlier actions.'], ['Changes', 'Changes in issues, requirements and interested parties.'], ['Performance', 'Objectives, KPIs, audits, nonconformities.'], ['Improvement opportunities', 'List opportunities.'], ['Decisions and actions', 'Decision, owner, due date.']]),
  x('aims-improvement-log', 'AIMS Improvement Log', 'Tracks improvements.', ['Improvement', 'Source', 'Owner', 'Due date', 'Status', 'Benefit seen'], ['Automate model card checks', 'Internal audit', '[Role]', '[Date]', 'Open', '']),
  x('ai-capa-log', 'AI Nonconformity and CAPA Log', 'Tracks containment, root cause and effectiveness.', ['ID', 'Nonconformity', 'Source', 'Containment', 'Root cause', 'Corrective action', 'Owner', 'Due date', 'Effectiveness check', 'Closure proof', 'Status'], ['NC-001', 'Model released without validation sign-off', 'Internal audit', 'Release paused', 'Gate not enforced', 'Add a required check', '[Role]', '[Date]', 'Sample next releases', '[Link]', 'Open']),
  x('ai-policy-alignment', 'AI Policy Alignment Matrix', 'Maps other policies to AI objectives.', ['Policy', 'Owner', 'AI topic affected', 'Conflict or gap', 'Resolution', 'Decided by', 'Date'], ['Privacy Policy', '[Role]', 'Use of prompts', 'Retention not defined', 'Add a prompt retention rule', '[Role]', '[Date]']),
  x('ai-concern-log', 'AI Concern and External Report Log', 'Tracks internal concerns and external reports. Keep reporter identity restricted.', ['Case ID', 'Internal or external', 'Date received', 'System', 'Summary', 'Handler', 'Action', 'Outcome', 'Closed date'], ['C-001', 'External', '[Date]', '[System]', 'Reported unfair output', '[Role]', 'Investigated', '', '']),
  x('ai-data-inventory', 'AI Data Inventory and Lineage Record', 'Records sources, rights, provenance and versions.', ['Dataset', 'System', 'Source', 'Type and categories', 'Rights or licence', 'Acquired date', 'Transformations', 'Version', 'Retention', 'Owner'], ['[Dataset]', '[System]', '[Source]', 'Text, no personal data', '[Licence]', '[Date]', 'De-duplicated', '1.0', '[Period]', '[Role]']),
  x('ai-bom', 'AI Bill of Materials', 'Records models, frameworks, libraries and pipelines.', ['System', 'Component', 'Type', 'Version', 'Source', 'Licence', 'Owner', 'Last checked'], ['[System]', '[Model]', 'Model', '[Version]', '[Provider]', '[Licence]', '[Role]', '[Date]']),
  d('ai-requirements-spec', 'AI System Requirements Specification', 'Documents testable requirements.', [['Purpose and intended use', '[System] is intended for [use].'], ['Functional and performance requirements', 'Example: accuracy at or above [threshold].'], ['Fairness and safety', 'Example: gap between groups at or below [threshold].'], ['Security and data', 'Example: no customer data used for training.'], ['Traceability', 'Each requirement links to a test.']]),
  d('ai-model-card', 'Model Card and Design Record', 'Records design choices, training and limitations.', [['Model details', '[Model], version [Version].'], ['Architecture and alternatives', 'Chosen because [reason].'], ['Training approach', 'Data version, method, parameters.'], ['Evaluation', 'Summary and link to the validation report.'], ['Limitations and trade-offs', 'Not suitable for [use].']]),
  x('ai-validation-report', 'AI Verification and Validation Report', 'Records metrics, thresholds and sign-off.', ['System version', 'Test', 'Data set', 'Metric', 'Threshold set before testing', 'Result', 'Subgroup', 'Pass or fail', 'Signed off by', 'Date'], ['[Version]', 'Accuracy', '[Test set]', 'F1', '[Threshold]', '', 'All', '', '[Role]', '[Date]']),
  x('ai-deployment-checklist', 'AI Deployment Checklist', 'Confirms release readiness.', ['Check', 'Required', 'Result', 'Evidence link', 'Checked by', 'Date'], ['Rollback tested', 'Yes', '', '[Link]', '[Role]', '[Date]']),
  d('ai-monitoring-runbook', 'AI Monitoring Runbook', 'Defines monitoring, alerts and response.', [['What is monitored', 'Performance, drift, errors, misuse.'], ['Thresholds and alerts', 'Alert [Role] when [metric] passes [threshold].'], ['Response steps', 'Triage, pause, roll back, escalate.'], ['Repairs and updates', 'How fixes are planned.']]),
  d('ai-technical-file', 'AI Technical Documentation Pack', 'Collects documents by audience.', [['For users', 'Link to the user guide.'], ['For partners', 'Integration and data handling details.'], ['For regulators', 'System description, testing and risk management records where required.'], ['Version map', 'Documents matched to release [Version].']]),
  x('ai-logging-spec', 'AI Event Logging Specification', 'Defines events, fields, retention and protection.', ['Event', 'Why logged', 'Fields', 'Model version captured', 'Masked or excluded data', 'Retention', 'Tamper protection', 'Owner'], ['Inference request', 'Reconstruct an output', 'Actor, time, request ID', 'Yes', 'Secrets, direct identifiers', '[Align with your logging standard]', 'Write-once storage', '[Role]']),
  x('ai-data-quality-report', 'AI Data Quality Report', 'Records quality checks, including representativeness.', ['Dataset version', 'Requirement', 'Method', 'Threshold', 'Result', 'Bias or representativeness note', 'Action', 'Reviewed by'], ['[Version]', 'Completeness', 'Profiling', '[Threshold]', '', '', '', '[Role]']),
  x('ai-data-preparation-record', 'AI Data Preparation Record', 'Records cleaning, labelling and splitting.', ['Dataset version', 'Step', 'Method', 'Tool', 'Labelling guidance link', 'Quality check', 'Performed by', 'Date'], ['[Version]', 'Labelling', 'Dual review', '[Tool]', '[Link]', 'Agreement rate', '[Role]', '[Date]']),
  d('ai-user-notice', 'AI User Information and Notice', 'Tells users purpose, limitations and oversight.', [['What this system does', '[System] helps with [purpose].'], ['AI notice', 'You are interacting with an AI system.'], ['Limitations', 'It may make mistakes, so check important results.'], ['Human oversight', 'Ask for a human review through [channel].'], ['How to report a problem', 'Contact [channel].']]),
  d('ai-incident-plan', 'AI Incident Plan', 'Defines AI incident response and notification.', [['What counts as an AI incident', 'Harmful output, failure, misuse, or a security event.'], ['Roles', 'Incident lead: [Role].'], ['Response', 'Triage, contain, investigate, fix, review.'], ['Notification', 'For each incident, check legal and contract duties and record the decision. Audience, trigger, deadline and channel come from your obligations register.'], ['Records', 'Keep notification records.']]),
  x('ai-use-approval', 'AI Use Approval Record', 'Records approvals of AI tools and use cases.', ['Tool or use case', 'Requester', 'Purpose', 'Data used', 'Risk tier', 'Conditions', 'Approved by', 'Date', 'Review date'], ['[Tool]', '[Role]', 'Draft summaries', 'No personal data', 'Low', 'Human review', '[Role]', '[Date]', '[Date]']),
  d('ai-intended-use', 'AI Intended Use Statement', 'Records documented use and monitoring for deviation.', [['Intended use', '[System] is used for [purpose] by [users].'], ['Prohibited or unassessed uses', 'Not for [use].'], ['Provider instructions', 'Link to instructions.'], ['Human oversight', 'Who reviews which outputs.'], ['Usage monitoring', 'How deviation is detected and handled.']]),
  x('ai-responsibility-matrix', 'AI Shared Responsibility Matrix', 'Allocates duties across the supply chain.', ['Activity', 'Your organization', 'Supplier', 'Customer', 'Contract clause', 'Notes'], ['Model update notice', 'Review', 'Notify', 'Informed', '[Clause]', '']),
  x('ai-vendor-assessment', 'AI Vendor Assessment', 'Assesses AI suppliers and model providers.', ['Vendor', 'Service', 'Trains on your data (Yes/No)', 'Retention', 'Model change notice', 'Sub-processors', 'Evidence reviewed', 'Risk rating', 'Decision', 'Next review'], ['[Vendor]', '[Service]', 'No', '[Period]', '[Notice period]', '[List]', '[Document]', 'Medium', 'Approved', '[Date]']),
  x('ai-customer-checklist', 'AI Customer Requirements Checklist', 'Tracks customer expectations, terms and feedback.', ['Customer segment', 'Expectation', 'Where addressed', 'Documentation provided', 'Feedback', 'Owner', 'Status'], ['[Customer Type]', 'Explanation of outputs', 'User guide', '[Link]', '', '[Role]', 'Open']),
];

export const AUDITOR_VIEW = {
  stage1: ['Scope, context and interested party records are complete.', 'AI policy, risk method, treatment plan and SoA exist and are approved.', 'Impact assessment process is defined.', 'Internal audit and management review are planned or done.', 'The auditor uses this stage to judge readiness for Stage 2.'],
  stage2: ['Controls operate as documented, shown through samples.', 'Staff can explain their roles and the AI policy.', 'Risk and impact assessments match real systems.', 'Monitoring, incidents and corrective actions show the AIMS running over time.', 'Internal audit and management review are complete.'],
  nonconformities: ['SoA exclusions with no justification.', 'AI system inventory does not match production.', 'Impact assessments missing or never repeated.', 'No evidence of top management review.', 'Corrective actions closed with no effectiveness check.', 'Supplier AI risk not assessed.'],
};

export const STARTUP_PATH = {
  intro: 'A minimum viable AIMS for a small team. Every clause still applies, so simplify how you do the work and do not skip it.',
  merge: [
    ['Governance committee', 'Use an existing leadership meeting with a standing AI agenda item and recorded minutes.'],
    ['Risk and opportunity log', 'Keep one register with a type column.'],
    ['Policy set', 'Combine topic policies into one AI policy, if every required topic stays covered.'],
    ['Skills and resources', 'Keep them in one sheet per system.'],
    ['ISMS overlap', 'Reuse document control, internal audit, management review and CAPA, and add AI inputs.'],
    ['Evidence', 'Use exports from existing tools rather than creating new records.'],
  ],
  cannotSimplify: ['Top management approval and review.', 'AI risk assessment and impact assessment.', 'The Statement of Applicability.', 'Internal audit independence. Use an external reviewer if nobody is independent.'],
};

export const ITGC_MAPPING = {
  'Access Management': ['A.3.2', 'A.4.2', 'A.6.2.8'],
  'Change Management': ['A.6.2.5', 'A.6.2.4', '6.3'],
  'IT Operations': ['A.6.2.6', 'A.6.2.8'],
  'Program / System Development': ['A.6.1.3', 'A.6.2.2', 'A.6.2.4'],
  'Data Privacy / Governance': ['A.7.2', 'A.7.3', 'A.4.3'],
  'Business Continuity & Incident': ['A.8.4', 'A.4.5', '10.2'],
  'General / Cross-Cutting': ['5.1', '7.5.3', '9.1'],
};

export const CROSSWALK_FIELDS = [['iso27001', 'ISO 27001:2022'], ['nistAiRmf', 'NIST AI RMF'], ['euAiAct', 'EU AI Act'], ['soc2', 'SOC 2']];
export const CROSSWALK_NOTE = 'Mappings are indicative, based on subject overlap, and blank where no mapping is defensible. Meeting one framework does not prove another. EU AI Act articles shown apply only where the Act and that risk category apply. SOC 2 has no AI-specific criteria.';

export const controlsForPolicy = (slug) => CONTROLS.filter((k) => k.relatedPolicies.includes(slug)).map((k) => k.id);
export const controlsForTemplate = (slug) => CONTROLS.filter((k) => k.relatedTemplates.includes(slug)).map((k) => k.id);
export const COUNTS = { clauses: CONTROLS.filter((k) => k.type === 'Clause').length, annex: CONTROLS.filter((k) => k.type === 'Annex A').length, total: CONTROLS.length };
