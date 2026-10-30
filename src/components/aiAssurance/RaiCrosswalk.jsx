import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Layers } from 'lucide-react';
import RelatedTemplates from '../templates/RelatedTemplates.jsx';
import { AI_TYPES, AUTONOMY, AUDIENCE, PATTERNS, ASSESSMENT_BLOCK, ESCALATION_RULES, PRESALES_CHECKLIST, INDUSTRIES } from '../../data/raiUseCases.js';

// Responsible AI review process: how the EU AI Act, ISO/IEC 42001, ISO/IEC 27090, GDPR and NIST AI RMF map and apply.

const REGS = [
  {
    name: 'EU AI Act', kind: 'Risk-based regulation',
    applies: 'When an AI system is placed on the EU market or its output is used in the EU.',
    points: [
      'Prohibited (Art. 5): social scoring, manipulative techniques, untargeted facial-image scraping, emotion recognition in the workplace or education, certain predictive policing, real-time remote biometric identification in public (narrow exceptions).',
      'High-risk (Annex III and Annex I): biometrics, critical infrastructure, education, employment and HR (CV screening, candidate ranking, staffing decisions), access to essential services (credit scoring, life and health insurance pricing, public benefits, emergency call triage), law enforcement, migration, justice; plus AI as a safety component of regulated products (medical devices, vehicles, machinery).',
      'Transparency (Art. 50): chatbots must disclose they are AI; synthetic voice, avatars and deepfakes must be labelled; emotion recognition and biometric categorisation require notice.',
      'Minimal risk: most internal RAG, forecasting and analytics.',
      'General-purpose AI models: obligations sit with the model provider; teams building on top are downstream integrators.',
      'Roles: the provider places the system on the market under its name; the deployer uses it. In consulting builds the customer is usually provider and deployer, and the delivery team supports technical documentation.',
      'High-risk obligations: risk management, data governance and bias checks, technical documentation, logging, transparency to deployers, human oversight, accuracy, robustness and cybersecurity, conformity assessment, registration, post-market monitoring. Deployers that are public bodies, or use AI for credit or insurance, also run a Fundamental Rights Impact Assessment (FRIA).',
      'Timeline: dates have shifted under the Digital Omnibus. See the current dates on the EU AI Act page before quoting them.',
    ],
    link: { to: '/eu-ai-act', label: 'EU AI Act timeline and roles' },
  },
  {
    name: 'ISO/IEC 42001', kind: 'Certifiable AI management system',
    applies: 'Organisation level; the "ISO 27001 for AI", built on Plan-Do-Check-Act.',
    points: [
      'AI policy, roles and accountability.',
      'AI risk assessment and treatment, plus an AI system impact assessment covering effects on individuals and society.',
      'Annex A controls: data quality and provenance, lifecycle management, third-party and supplier management, transparency to stakeholders, human oversight, monitoring and incident handling.',
      'Internal audit, management review and continual improvement.',
      'Process mapping: intake and screening = risk identification; triage = impact assessment input; review board = governance body and treatment decision; reports and recommendations = control implementation; tracker and discrepancy log = records and evidence; re-assessment at phase change = monitoring and continual improvement; RAI champion and security point of contact = defined roles.',
    ],
    link: { to: '/iso/42001', label: 'ISO 42001 playbook' },
  },
  {
    name: 'ISO/IEC 27090', kind: 'Guidance on AI-specific security threats',
    applies: 'Security of AI systems across the lifecycle; pairs with ISO 27001, ISO 27701 and ISO/IEC 23894.',
    points: [
      'Threats: data poisoning, evasion and adversarial inputs, prompt injection (direct and indirect), model inversion and membership inference, model theft and extraction, supply-chain risk in models, datasets and plugins, insecure agent tool use.',
      'Controls: threat-model each solution; content safety and prompt-injection shields; ground only on trusted sources; least-privilege tools and identities for agents; human approval before agent actions; private endpoints, secrets vaults and encryption; no real personal data in training data; logging and red-teaming; vet third-party models, connectors and reused code.',
    ],
    link: { to: '/iso/27090', label: 'ISO 27090 playbook' },
  },
  {
    name: 'GDPR and privacy laws', kind: 'Apply whenever personal data is processed',
    applies: 'Any processing of personal data, regardless of AI risk tier.',
    points: [
      'Lawful basis and purpose limitation, data minimisation, transparency notices, retention limits and data subject rights.',
      'DPIA (Art. 35) for high-risk processing: biometrics, health, large-scale monitoring, profiling.',
      'Art. 22 limits on solely automated decisions with legal or similarly significant effects, which is why human-in-the-loop matters.',
      'Special category data (health, biometrics) needs an explicit Art. 9 condition.',
      'International transfers and residency; processor and sub-processor contracts.',
      'Equivalents: HIPAA, India DPDP Act, UK GDPR, Singapore PDPA, Australia Privacy Act, Brazil LGPD, Peru AI regulation, sector rules (banking regulators, PCI DSS).',
    ],
    link: { to: '/gdpr', label: 'GDPR playbook' },
  },
  {
    name: 'NIST AI RMF', kind: 'Voluntary, US-oriented framework',
    applies: 'Common language with US customers.',
    points: ['GOVERN: policies, roles, review board.', 'MAP: context, intake, triage.', 'MEASURE: evaluation metrics, bias and accuracy testing.', 'MANAGE: recommendations, monitoring, re-assessment.'],
    link: { to: '/nist', label: 'NIST playbook' },
  },
];

const STAGES = [
  { stage: 'Intake and screening', euai: 'Risk classification', iso42001: 'Risk identification', iso27090: 'Initial threat surface', privacy: 'Is personal data processed?', nist: 'MAP' },
  { stage: 'Triage call', euai: 'Role (provider or deployer) and tier', iso42001: 'Impact assessment input', iso27090: 'Agents, external inputs, RAG sources', privacy: 'DPIA screening', nist: 'MAP' },
  { stage: 'Review board decision', euai: 'High-risk or sensitive use: detailed review and FRIA where required', iso42001: 'Governance and risk treatment decision', iso27090: 'Security conditions for approval', privacy: 'DPIA required?', nist: 'GOVERN' },
  { stage: 'Assessment and report', euai: 'Transparency and human oversight requirements', iso42001: 'Control implementation', iso27090: 'Security controls (injection, data leakage, agent permissions)', privacy: 'GDPR and ISO 27701 controls', nist: 'MEASURE' },
  { stage: 'Monitor', euai: 'Post-market monitoring', iso42001: 'Continual improvement and internal audit', iso27090: 'Red-teaming and incident handling', privacy: 'Retention, rights and transfer reviews', nist: 'MANAGE' },
];

const EXAMPLES = [
  { useCase: 'CV screening bot', category: 'Decisions about people', euai: 'High-risk (employment)', privacy: 'GDPR Art. 22 and DPIA', security: 'Prompt injection and data leakage checks', outcome: 'Detailed responsible AI review; ISO 42001 impact assessment' },
  { useCase: 'Banking customer chatbot', category: 'Customer-facing conversational AI', euai: 'Transparency (AI disclosure)', privacy: 'GDPR; keep card data out of scope (PCI)', security: 'Direct and indirect prompt injection; authentication', outcome: 'Standard review with transparency and security conditions' },
  { useCase: 'Ambient clinical notes', category: 'Clinical', euai: 'Possibly high-risk if a medical device or triage', privacy: 'HIPAA or GDPR special category; consent; DPIA', security: 'Access control, data leakage', outcome: 'Detailed review; clinician reviews every note' },
  { useCase: 'Internal policy RAG assistant', category: 'Internal knowledge', euai: 'Minimal risk', privacy: 'Usually limited personal data', security: 'Access control and grounding on trusted sources', outcome: 'Light review; ISO 42001 lifecycle controls' },
  { useCase: 'Synthetic voice or avatar', category: 'Synthetic media', euai: 'Transparency labelling', privacy: 'Consent of the voice owner', security: 'Misuse and impersonation controls', outcome: 'Approve with labelling and consent conditions' },
  { useCase: 'Agentic IT service desk resolver', category: 'Agents and automation', euai: 'Minimal risk', privacy: 'Ticket data minimisation', security: 'Excessive agency and tool misuse (ISO 27090), human approval for actions', outcome: 'Approve with least-privilege tools and approval gates' },
];

const ANSWERS = [
  { q: 'Walk me through how you assess an AI use case.',
    a: ['In my role, every AI use case starts with a short intake that tells us what the system is for, who uses it, what data it touches and whether it makes or supports decisions about people. That is enough to screen it and decide how deep the review needs to go.',
      'If it is something like an internal policy assistant, we apply standard controls and move on. If it touches hiring, credit, health or biometrics, it goes to a triage call and then to the review board, which decides whether a detailed responsible AI review is needed and what conditions apply. The report gives concrete recommendations, and we re-assess whenever the project changes phase.',
      'The takeaway: the depth of review follows the use, not the fact that it is AI.'] },
  { q: 'How does the EU AI Act affect the systems you review?',
    a: ['I start with two questions: what is the intended purpose, and what is our role. The purpose tells me the tier: prohibited, high-risk, transparency or minimal. The role tells me who carries the obligations, the provider who puts it on the market or the deployer who uses it.',
      'For example, a CV screening tool is high-risk because employment is an Annex III area, so it needs risk management, logging, human oversight and documentation. A banking chatbot is usually a transparency case: people must be told they are talking to AI. An internal RAG assistant is usually minimal risk.',
      'The takeaway: classification comes from purpose and role, never from the technology alone.'] },
  { q: 'How does ISO 42001 relate to your review process?',
    a: ['I describe our process as an operating ISO 42001 control set. Intake and screening are risk identification, the triage call feeds the impact assessment, the review board is the governance body that decides on treatment, and the reports are control implementation.',
      'The tracker and discrepancy log are our records and evidence, and re-assessment at each phase is continual improvement. When an auditor asks for evidence, we point to those artefacts rather than create new ones.',
      'The takeaway: the board is the governance body, the tracker is the evidence and phase-gate re-assessment is continual improvement.'] },
  { q: 'What security risks are specific to AI, and how do you handle them?',
    a: ['I use ISO 27090 as the reference. Beyond normal security, AI adds data poisoning, prompt injection, both direct and through documents or tool output, training data leakage, model theft and supply-chain risk in models and plugins. With agents, the big one is excessive agency.',
      'For an agentic IT service desk resolver, for example, the AI Act risk is minimal, but we still require least-privilege tool identities, human approval before actions, grounding on trusted sources, logging and red-teaming before go-live.',
      'The takeaway: low regulatory risk does not mean low security risk.'] },
  { q: 'Tell me about a high-risk use case you handled.',
    a: ['A good example is a CV screening assistant. Intake flagged it straight away because it ranks candidates, which is an employment use and high-risk under the EU AI Act. GDPR Article 22 also applies, so a DPIA was required and a human had to make every final decision.',
      'The board approved it with conditions: bias testing on the scoring, a documented human review step, logging of recommendations, clear notices to candidates and prompt-injection testing on uploaded CVs. We re-assessed it before it moved from pilot to production.',
      'The takeaway: high-risk does not mean no; it means approved with evidence and human oversight.'] },
];

const TABS = ['Regulations', 'Stage crosswalk', 'Use-case examples', 'Use-case catalogue', 'Assessment method', 'Pre-sales checklist', 'Interview answers'];
const RISK_CLS = { High: 'bg-rose-100 text-rose-800 dark:bg-rose-900/40 dark:text-rose-200', Med: 'bg-amber-100 text-amber-800 dark:bg-amber-900/40 dark:text-amber-200', Low: 'bg-emerald-100 text-emerald-800 dark:bg-emerald-900/40 dark:text-emerald-200' };
const TH = 'text-left p-2 font-semibold text-gray-900 dark:text-white bg-gray-100 dark:bg-gray-800 align-bottom';
const TD = 'p-2 text-gray-700 dark:text-gray-300 align-top';

export default function RaiCrosswalk() {
  const [tab, setTab] = useState(TABS[0]);
  const [openQ, setOpenQ] = useState(0);
  const [ind, setInd] = useState('All');
  const [openP, setOpenP] = useState(null);
  const [checks, setChecks] = useState({});
  const pats = PATTERNS.filter(p => ind === 'All' || p.industry === ind);
  return (
    <section id="rai-crosswalk" className="grc-section scroll-mt-24">
      <h2 className="grc-section-title mb-2"><Layers className="w-6 h-6 text-violet-600 dark:text-violet-300" /> Responsible AI review: how the regulations and standards map</h2>
      <p className="text-sm text-gray-600 dark:text-gray-300 mb-4 max-w-3xl">How the EU AI Act, ISO/IEC 42001, ISO/IEC 27090, GDPR and the NIST AI RMF apply at each stage of a responsible AI review, with worked use cases and interview-ready answers.</p>
      <div role="tablist" aria-label="Crosswalk views" className="flex flex-wrap gap-2 mb-4">
        {TABS.map(t => (
          <button key={t} role="tab" aria-selected={tab === t} type="button" onClick={() => setTab(t)}
            className={`px-3 py-1.5 rounded-full text-xs font-semibold border transition-colors ${tab === t ? 'bg-violet-600 border-violet-600 text-white' : 'border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-200 hover:border-violet-400'}`}>{t}</button>
        ))}
      </div>

      {tab === 'Regulations' && (
        <div className="grid md:grid-cols-2 gap-3">
          {REGS.map(r => (
            <div key={r.name} className="rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 p-4">
              <p className="text-[10px] font-bold uppercase tracking-wide text-violet-700 dark:text-violet-300">{r.kind}</p>
              <h3 className="font-bold text-gray-900 dark:text-white">{r.name}</h3>
              <p className="text-xs text-gray-600 dark:text-gray-400 mt-0.5 mb-2">{r.applies}</p>
              <ul className="list-disc pl-5 space-y-1 text-sm text-gray-700 dark:text-gray-300">{r.points.map(p => <li key={p}>{p}</li>)}</ul>
              <Link to={r.link.to} className="inline-block mt-2 text-xs font-semibold text-violet-700 dark:text-violet-300 hover:underline">{r.link.label} →</Link>
            </div>
          ))}
        </div>
      )}

      {tab === 'Stage crosswalk' && (
        <div className="overflow-x-auto rounded-xl border border-gray-200 dark:border-gray-700">
          <table className="w-full text-sm min-w-[860px]">
            <thead><tr>{['Review stage', 'EU AI Act', 'ISO/IEC 42001', 'ISO/IEC 27090', 'GDPR and privacy', 'NIST AI RMF'].map(h => <th key={h} scope="col" className={TH}>{h}</th>)}</tr></thead>
            <tbody className="divide-y divide-gray-100 dark:divide-gray-700">
              {STAGES.map(s => <tr key={s.stage}><td className={TD + ' font-semibold text-gray-900 dark:text-white'}>{s.stage}</td><td className={TD}>{s.euai}</td><td className={TD}>{s.iso42001}</td><td className={TD}>{s.iso27090}</td><td className={TD}>{s.privacy}</td><td className={TD}>{s.nist}</td></tr>)}
            </tbody>
          </table>
        </div>
      )}

      {tab === 'Use-case examples' && (
        <div className="overflow-x-auto rounded-xl border border-gray-200 dark:border-gray-700">
          <table className="w-full text-sm min-w-[900px]">
            <thead><tr>{['Use case', 'Category', 'EU AI Act', 'Privacy', 'Security (ISO 27090)', 'Review outcome'].map(h => <th key={h} scope="col" className={TH}>{h}</th>)}</tr></thead>
            <tbody className="divide-y divide-gray-100 dark:divide-gray-700">
              {EXAMPLES.map(e => <tr key={e.useCase}><td className={TD + ' font-semibold text-gray-900 dark:text-white'}>{e.useCase}</td><td className={TD}>{e.category}</td><td className={TD}>{e.euai}</td><td className={TD}>{e.privacy}</td><td className={TD}>{e.security}</td><td className={TD}>{e.outcome}</td></tr>)}
            </tbody>
          </table>
        </div>
      )}

      {tab === 'Use-case catalogue' && (
        <div>
          <p className="text-xs text-gray-600 dark:text-gray-400 mb-2">Generalised patterns common in enterprise AI reviews, with no customer, region or frequency details. EU AI Act tiers are indicative; confirm with Legal. Click a row for prioritised actions.</p>
          <div className="flex flex-wrap gap-2 mb-3" role="group" aria-label="Filter by industry">
            {['All', ...INDUSTRIES].map(i => <button key={i} type="button" aria-pressed={ind === i} onClick={() => setInd(i)} className={`px-2.5 py-1 rounded-full text-[11px] font-semibold border ${ind === i ? 'bg-violet-600 border-violet-600 text-white' : 'border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-200'}`}>{i}</button>)}
          </div>
          <div className="overflow-x-auto rounded-xl border border-gray-200 dark:border-gray-700">
            <table className="w-full text-sm min-w-[1000px]">
              <thead><tr>{['Industry', 'Use-case pattern', 'AI type', 'Autonomy', 'Audience', 'Data processed', 'EU AI Act tier (indicative)', 'Overall risk', 'Escalate'].map(h => <th key={h} scope="col" className={TH}>{h}</th>)}</tr></thead>
              <tbody className="divide-y divide-gray-100 dark:divide-gray-700">
                {pats.map(p => {
                  const k = p.industry + p.pattern; const open = openP === k;
                  return [
                    <tr key={k} className="cursor-pointer hover:bg-violet-50/60 dark:hover:bg-violet-900/20" onClick={() => setOpenP(open ? null : k)} aria-expanded={open}>
                      <td className={TD}>{p.industry}</td><td className={TD + ' font-semibold text-gray-900 dark:text-white'}>{p.pattern}</td><td className={TD}>{p.type}</td><td className={TD}>{p.autonomy}</td><td className={TD}>{p.audience}</td><td className={TD}>{p.data}</td><td className={TD}>{p.tier}</td>
                      <td className={TD}><span className={`px-2 py-0.5 rounded-full text-xs font-bold ${RISK_CLS[p.risk]}`}>{p.risk}</span></td><td className={TD}>{p.escalate ? 'Yes' : 'No'}</td>
                    </tr>,
                    open && <tr key={k + '-d'}><td colSpan={9} className="p-3 bg-violet-50/50 dark:bg-violet-900/10"><ul className="space-y-1 text-sm text-gray-700 dark:text-gray-300">{p.actions.map(x => <li key={x}><span className={`font-bold ${x.startsWith('Must') ? 'text-rose-700 dark:text-rose-300' : 'text-sky-700 dark:text-sky-300'}`}>{x.split(':')[0]}:</span>{x.slice(x.indexOf(':') + 1)}</li>)}</ul></td></tr>,
                  ];
                })}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {tab === 'Assessment method' && (
        <div className="space-y-4">
          <div className="grid md:grid-cols-3 gap-3">
            <div className="md:col-span-2 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 p-4">
              <h3 className="font-bold text-gray-900 dark:text-white mb-2 text-sm">AI type (one primary, any secondary)</h3>
              <ul className="space-y-1 text-sm text-gray-700 dark:text-gray-300">{AI_TYPES.map(([c, n, d]) => <li key={c}><span className="font-bold">{c}. {n}:</span> {d}</li>)}</ul>
            </div>
            <div className="rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 p-4 text-sm text-gray-700 dark:text-gray-300">
              <h3 className="font-bold text-gray-900 dark:text-white mb-2 text-sm">Autonomy level</h3><ul className="list-disc pl-5 mb-3">{AUTONOMY.map(a => <li key={a}>{a}</li>)}</ul>
              <h3 className="font-bold text-gray-900 dark:text-white mb-2 text-sm">Audience</h3><ul className="list-disc pl-5">{AUDIENCE.map(a => <li key={a}>{a}</li>)}</ul>
            </div>
          </div>
          <div className="overflow-x-auto rounded-xl border border-gray-200 dark:border-gray-700">
            <table className="w-full text-sm min-w-[720px]">
              <thead><tr><th className={TH}>Assessment block</th><th className={TH}>What to cover</th></tr></thead>
              <tbody className="divide-y divide-gray-100 dark:divide-gray-700">{ASSESSMENT_BLOCK.map(([h, d]) => <tr key={h}><td className={TD + ' font-semibold text-gray-900 dark:text-white whitespace-nowrap'}>{h}</td><td className={TD}>{d}</td></tr>)}</tbody>
            </table>
          </div>
          <div className="rounded-xl border border-rose-200 bg-rose-50 dark:bg-rose-900/20 dark:border-rose-800 p-4">
            <h3 className="font-bold text-rose-900 dark:text-rose-200 mb-2 text-sm">Escalate to a responsible AI office or legal review when</h3>
            <ul className="list-disc pl-5 space-y-1 text-sm text-gray-800 dark:text-gray-200">{ESCALATION_RULES.map(r => <li key={r}>{r}</li>)}</ul>
          </div>
        </div>
      )}

      {tab === 'Pre-sales checklist' && (
        <div>
          <p className="text-xs text-gray-600 dark:text-gray-400 mb-2">Complete before the responsible AI intake call. Any "Yes" on questions 3 to 8, or any "No" on the others, is a topic to raise at intake. Ticks are not saved.</p>
          <ol className="space-y-1.5">
            {PRESALES_CHECKLIST.map((q, i) => (
              <li key={q} className="flex flex-wrap items-center gap-2 rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 px-3 py-2 text-sm">
                <span className="font-bold text-gray-500 w-6">{i + 1}.</span>
                <span className="flex-1 min-w-[200px] text-gray-800 dark:text-gray-200">{q}</span>
                {['Yes', 'No', 'Unknown'].map(v => <button key={v} type="button" aria-pressed={checks[i] === v} onClick={() => setChecks(c => ({ ...c, [i]: v }))} className={`px-2 py-0.5 rounded text-xs font-semibold border ${checks[i] === v ? 'bg-violet-600 border-violet-600 text-white' : 'border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-200'}`}>{v}</button>)}
              </li>
            ))}
          </ol>
        </div>
      )}

      {tab === 'Interview answers' && (
        <div className="space-y-2">
          <p className="text-xs text-gray-600 dark:text-gray-400">First-person answers of 60 to 120 seconds: direct answer, a short example, then one takeaway line.</p>
          {ANSWERS.map((x, i) => (
            <div key={x.q} className="rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900">
              <button type="button" aria-expanded={openQ === i} onClick={() => setOpenQ(openQ === i ? null : i)} className="w-full text-left p-3 font-semibold text-gray-900 dark:text-white">{x.q}</button>
              {openQ === i && <div className="px-3 pb-3 space-y-2 text-sm text-gray-700 dark:text-gray-300">{x.a.map(p => <p key={p}>{p}</p>)}</div>}
            </div>
          ))}
        </div>
      )}

      <RelatedTemplates className="mt-4" limit={4} text="ai use-case assessment ai regulatory applicability assessment ai assurance checklist dpia" />
    </section>
  );
}
