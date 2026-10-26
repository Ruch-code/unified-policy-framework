import { useState } from 'react';
import { BookOpen, FileSearch, Scale, Globe2, ChevronDown, CheckCircle2, AlertTriangle, ListChecks } from 'lucide-react';

/*
 * GDPR accountability documents explained simply: ROPA, DPIA, LIA, TIA and how they connect,
 * plus end-to-end scenarios. Article references are to Regulation (EU) 2016/679.
 */

const DOCS = [
  {
    id: 'ropa', name: 'ROPA', full: 'Record of Processing Activities', art: 'Art. 30', Icon: BookOpen,
    what: 'A living register of every way your organisation uses personal data.',
    when: [
      'Required for controllers and processors.',
      'The small-organisation exemption (under 250 staff) rarely helps: it does not apply if processing is not occasional, is likely to create risk, or includes special category or criminal data. Payroll and customer data are not occasional.',
    ],
    contains: [
      'Controller and DPO contact details',
      'Purpose of each processing activity',
      'Categories of data subjects and personal data',
      'Recipients, including processors',
      'International transfers and the safeguard used',
      'Retention period',
      'General description of security measures',
      'Good practice extras: lawful basis, source of data, systems used, link to DPIA or LIA',
    ],
    tips: ['One row per processing activity, not per system.', 'Processors keep a shorter ROPA: who you process for, categories of processing, transfers and security.', 'Review at least yearly and whenever a new feature, vendor or data flow is added.'],
  },
  {
    id: 'dpia', name: 'DPIA', full: 'Data Protection Impact Assessment', art: 'Art. 35 and 36', Icon: FileSearch,
    what: 'A structured risk assessment done before starting processing that is likely to be high risk to people.',
    when: [
      'Always for: systematic and extensive profiling with significant effects, large-scale special category or criminal data, and large-scale systematic monitoring of public areas (Art. 35(3)).',
      'Likely needed when two or more of these apply: evaluation or scoring, automated decisions with legal or similar effect, systematic monitoring, sensitive data, large scale, matching or combining datasets, vulnerable people (employees, children, patients), innovative technology such as AI, or processing that blocks people from a service.',
      'Also check your supervisory authority\'s published list of processing that requires a DPIA.',
    ],
    contains: [
      'Description of the processing and its purposes',
      'Necessity and proportionality: why this data, why this much, why this long',
      'Risks to people (not just to the company): likelihood and severity',
      'Measures to reduce each risk, and the residual risk',
      'DPO advice and, where appropriate, the views of data subjects',
      'Sign-off by an accountable owner',
    ],
    tips: ['If high residual risk remains after mitigation, you must consult the supervisory authority before starting (Art. 36).', 'Screen every new project with a short checklist; only full DPIAs where screening says so.', 'Revisit when the processing changes, such as a new model, new data source or new country.'],
  },
  {
    id: 'lia', name: 'LIA', full: 'Legitimate Interests Assessment', art: 'Art. 6(1)(f)', Icon: Scale,
    what: 'The written balancing test you need when relying on legitimate interests as your lawful basis.',
    when: ['Whenever legitimate interests is the lawful basis in your ROPA, for example fraud prevention, network security, B2B marketing or product analytics.'],
    contains: [
      'Purpose test: what is the legitimate interest?',
      'Necessity test: is the processing needed, or is there a less intrusive way?',
      'Balancing test: would people reasonably expect it, and do their rights override your interest?',
      'Safeguards: opt-out, minimisation, retention limits',
    ],
    tips: ['If people would be surprised, legitimate interests is probably the wrong basis.', 'Public authorities cannot use it for their public tasks.'],
  },
  {
    id: 'tia', name: 'TIA', full: 'Transfer Impact Assessment', art: 'Chapter V (Art. 44 to 49)', Icon: Globe2,
    what: 'An assessment of whether personal data sent outside the EEA stays adequately protected in the destination country.',
    when: [
      'When you transfer data outside the EEA using Standard Contractual Clauses or Binding Corporate Rules.',
      'Not needed for countries with an adequacy decision. For the US, transfers to companies certified under the EU-US Data Privacy Framework rely on adequacy; check the recipient\'s certification.',
      'The Data Privacy Framework is in force but under legal challenge (as of 2026). Keep SCCs in vendor contracts as a fallback so transfers continue if its status changes.',
    ],
    contains: [
      'Data, recipient, country and purpose of the transfer',
      'Transfer tool used (adequacy, SCCs, BCRs, derogation)',
      'Local law and practice, especially government access to data',
      'Supplementary measures: encryption with keys held in the EEA, pseudonymisation, minimisation',
      'Conclusion and review date',
    ],
    tips: ['Remote access from a third country is a transfer too, for example a support team viewing EU data.', 'Record each transfer and its safeguard in the ROPA.'],
  },
];

const FLOW = [
  'New idea, feature or vendor',
  'Add or update the ROPA entry',
  'Choose lawful basis (LIA if legitimate interests)',
  'DPIA screening; full DPIA if high risk',
  'Vendor DPA (Art. 28) and TIA if data leaves the EEA',
  'Privacy notice updated (Art. 13 and 14)',
  'Go live, then review on change',
];

const SCENARIOS = [
  {
    title: 'HR tech startup adds employee productivity analytics',
    tag: 'DPIA required',
    tagCls: 'bg-rose-50 text-rose-800 border-rose-200 dark:bg-rose-900/30 dark:text-rose-300 dark:border-rose-800',
    steps: [
      { k: 'ROPA', v: 'New entry: purpose "productivity insights for managers"; subjects: customer employees; data: activity logs, app usage; recipients: customer managers, cloud host; retention: 12 months.' },
      { k: 'Role', v: 'The startup is a processor for its customers (the employers), who are controllers. The startup keeps a processor ROPA and helps customers with their DPIA.' },
      { k: 'Lawful basis', v: 'Customer relies on legitimate interests, so an LIA is needed. Consent is weak for employees because of the power imbalance.' },
      { k: 'DPIA screening', v: 'Systematic monitoring + vulnerable people (employees) + evaluation or scoring = three criteria. Full DPIA required.' },
      { k: 'DPIA risks', v: 'Chilling effect and stress, decisions about individuals based on crude metrics, function creep into disciplinary use.' },
      { k: 'Mitigations', v: 'Team-level aggregates by default, no keystroke or screen capture, no individual ranking, clear employee notice, works council consultation where required, short retention.' },
      { k: 'Outcome', v: 'Residual risk acceptable with mitigations; signed off. Product ships with privacy-protective defaults, DPIA template provided to customers.' },
    ],
  },
  {
    title: 'B2B SaaS sends marketing emails and runs product analytics',
    tag: 'No DPIA, LIA needed',
    tagCls: 'bg-emerald-50 text-emerald-800 border-emerald-200 dark:bg-emerald-900/30 dark:text-emerald-300 dark:border-emerald-800',
    steps: [
      { k: 'ROPA', v: 'Two entries: "B2B email marketing" and "in-product usage analytics", each with data, recipients (email platform, analytics vendor), retention.' },
      { k: 'Lawful basis', v: 'Legitimate interests for both, documented in one LIA each. Email marketing must also follow national ePrivacy rules: often allowed for existing customers about similar products with an easy opt-out, consent needed for cold outreach in some countries.' },
      { k: 'Cookies', v: 'Non-essential analytics cookies need consent under ePrivacy, regardless of the GDPR basis. Use a consent banner with a real "reject" option.' },
      { k: 'DPIA screening', v: 'No profiling with significant effects, no sensitive data, not large-scale monitoring. Screening recorded; no full DPIA.' },
      { k: 'Vendors', v: 'DPAs signed with the email and analytics vendors. If a vendor is in the US, check for Data Privacy Framework certification or use SCCs with a TIA.' },
      { k: 'Outcome', v: 'Notice updated, opt-out in every email, analytics configured to drop IP addresses and avoid collecting form inputs.' },
    ],
  },
  {
    title: 'Adding an AI assistant that reads customer support tickets',
    tag: 'DPIA likely, TIA check',
    tagCls: 'bg-amber-50 text-amber-800 border-amber-200 dark:bg-amber-900/30 dark:text-amber-300 dark:border-amber-800',
    steps: [
      { k: 'ROPA', v: 'Update the "customer support" entry: new purpose (AI drafting of replies), new recipient (AI model provider), possible transfer outside the EEA.' },
      { k: 'Lawful basis', v: 'Contract for handling the support request itself; legitimate interests (with LIA) for using AI to draft replies. Not for training the provider\'s models.' },
      { k: 'DPIA screening', v: 'Innovative technology + potentially large scale + tickets can contain sensitive data people volunteer (health, finances). Two or more criteria: run a DPIA.' },
      { k: 'Vendor', v: 'Art. 28 DPA with the AI provider: no training on your data, retention limits, sub-processor list, deletion on request, EEA processing if offered.' },
      { k: 'Transfers', v: 'If processed in the US: confirm Data Privacy Framework certification, or SCCs plus a TIA with supplementary measures.' },
      { k: 'Mitigations', v: 'Redact identifiers before sending, human review before any reply is sent, block sensitive categories, log prompts with short retention, update privacy notice.' },
      { k: 'Outcome', v: 'Launched for low-risk ticket types first; DPIA reviewed when the model or provider changes. Consider the EU AI Act and ISO 42001 alongside.' },
    ],
  },
  {
    title: 'Health app processing symptoms and wellbeing data',
    tag: 'DPIA mandatory, Art. 9',
    tagCls: 'bg-rose-50 text-rose-800 border-rose-200 dark:bg-rose-900/30 dark:text-rose-300 dark:border-rose-800',
    steps: [
      { k: 'ROPA', v: 'Entries for account management, symptom tracking, reminders and support, each flagged as special category data where relevant.' },
      { k: 'Lawful basis', v: 'Art. 6 basis (usually contract) plus an Art. 9 condition for health data, typically explicit consent, captured separately and withdrawable.' },
      { k: 'DPIA', v: 'Large-scale special category data: mandatory. Risks include disclosure, insurer or employer misuse, and inaccurate insights.' },
      { k: 'DPO', v: 'Core activity is large-scale processing of health data, so a DPO is required (Art. 37).' },
      { k: 'Security', v: 'Encryption at rest and in transit, strict access with logging, pseudonymised analytics, no health data in ad or analytics SDKs.' },
      { k: 'Breach readiness', v: 'Notify the supervisory authority within 72 hours of awareness unless unlikely to cause risk (Art. 33); tell users without undue delay if high risk (Art. 34).' },
      { k: 'Outcome', v: 'DPIA signed by DPO and leadership, explicit consent flow tested, annual review scheduled.' },
    ],
  },
];

function DocCard({ d, open, onToggle }) {
  return (
    <div className="rounded-xl border border-gray-200 dark:border-slate-700 bg-white dark:bg-slate-900 overflow-hidden">
      <button type="button" onClick={onToggle} aria-expanded={open} className="w-full flex items-center gap-3 p-4 text-left">
        <span className="w-9 h-9 rounded-lg bg-blue-100 text-blue-700 dark:bg-blue-900/40 dark:text-blue-300 flex items-center justify-center shrink-0"><d.Icon className="w-4 h-4" /></span>
        <span className="flex-1">
          <span className="block font-bold text-sm text-gray-900 dark:text-white">{d.name}: {d.full} <span className="text-xs font-semibold text-blue-700 dark:text-blue-300">({d.art})</span></span>
          <span className="block text-xs text-gray-600 dark:text-slate-300">{d.what}</span>
        </span>
        <ChevronDown className={`w-4 h-4 text-gray-400 transition-transform ${open ? 'rotate-180' : ''}`} />
      </button>
      {open && (
        <div className="px-4 pb-4 grid md:grid-cols-3 gap-3 text-sm">
          <div className="rounded-lg p-3 bg-amber-50 border border-amber-200 dark:bg-amber-900/30 dark:border-amber-800">
            <p className="text-[11px] font-bold uppercase tracking-wide text-amber-800 dark:text-amber-300 mb-1">When you need it</p>
            <ul className="space-y-1 text-gray-700 dark:text-slate-200">{d.when.map(x => <li key={x} className="flex gap-2"><span>-</span>{x}</li>)}</ul>
          </div>
          <div className="rounded-lg p-3 bg-blue-50 border border-blue-200 dark:bg-blue-900/30 dark:border-blue-800">
            <p className="text-[11px] font-bold uppercase tracking-wide text-blue-800 dark:text-blue-300 mb-1">What goes in it</p>
            <ul className="space-y-1 text-gray-700 dark:text-slate-200">{d.contains.map(x => <li key={x} className="flex gap-2"><span>-</span>{x}</li>)}</ul>
          </div>
          <div className="rounded-lg p-3 bg-emerald-50 border border-emerald-200 dark:bg-emerald-900/30 dark:border-emerald-800">
            <p className="text-[11px] font-bold uppercase tracking-wide text-emerald-800 dark:text-emerald-300 mb-1">Practical tips</p>
            <ul className="space-y-1 text-gray-700 dark:text-slate-200">{d.tips.map(x => <li key={x} className="flex gap-2"><span>-</span>{x}</li>)}</ul>
          </div>
        </div>
      )}
    </div>
  );
}

export default function GdprAccountability() {
  const [openDoc, setOpenDoc] = useState('ropa');
  const [openSc, setOpenSc] = useState(0);
  return (
    <div className="bg-white rounded-2xl border border-blue-200 dark:border-blue-800 p-6 mb-8" id="gdpr-ropa-dpia">
      <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-2 flex items-center gap-2">
        <span className="w-8 h-8 rounded-lg bg-blue-100 text-blue-700 dark:bg-blue-900/40 dark:text-blue-300 flex items-center justify-center"><ListChecks className="w-4 h-4" /></span>
        ROPA, DPIA, LIA and TIA: How They Fit Together
      </h2>
      <p className="text-sm text-gray-600 dark:text-slate-300 max-w-3xl mb-5">
        GDPR's accountability principle (Art. 5(2)) means you must be able to show compliance, not just achieve it. These four documents are the core of that proof. The ROPA lists what you do; the others justify the riskier parts.
      </p>

      <div className="rounded-xl p-4 mb-5 bg-slate-50 border border-slate-200 dark:bg-slate-800/60 dark:border-slate-700">
        <p className="text-[11px] font-bold uppercase tracking-wide text-slate-600 dark:text-slate-300 mb-2">The end-to-end flow for anything new</p>
        <ol className="flex flex-wrap gap-2">
          {FLOW.map((f, i) => (
            <li key={f} className="flex items-center gap-2 text-xs font-semibold text-gray-800 dark:text-slate-100">
              <span className="w-5 h-5 rounded-full bg-blue-600 text-white flex items-center justify-center text-[10px]">{i + 1}</span>{f}
              {i < FLOW.length - 1 && <span className="text-gray-400 dark:text-slate-500">-&gt;</span>}
            </li>
          ))}
        </ol>
      </div>

      <div className="space-y-2 mb-8">
        {DOCS.map(d => <DocCard key={d.id} d={d} open={openDoc === d.id} onToggle={() => setOpenDoc(openDoc === d.id ? null : d.id)} />)}
      </div>

      <h3 className="font-bold text-gray-900 dark:text-white mb-3">Scenarios, end to end</h3>
      <div className="flex flex-wrap gap-2 mb-4" role="tablist" aria-label="GDPR scenarios">
        {SCENARIOS.map((sc, i) => (
          <button key={sc.title} type="button" role="tab" aria-selected={openSc === i} onClick={() => setOpenSc(i)}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold border transition text-left ${openSc === i ? 'bg-blue-600 text-white border-blue-600' : 'bg-white text-gray-700 border-gray-200 hover:border-blue-300 dark:bg-slate-800 dark:text-slate-200 dark:border-slate-600'}`}>
            {sc.title}
          </button>
        ))}
      </div>
      {(() => {
        const sc = SCENARIOS[openSc];
        return (
          <div className="rounded-xl border border-gray-200 dark:border-slate-700 p-4" role="tabpanel">
            <div className="flex flex-wrap items-center gap-2 mb-3">
              <p className="font-bold text-gray-900 dark:text-white">{sc.title}</p>
              <span className={`text-[10px] font-bold uppercase tracking-wide px-2 py-0.5 rounded-full border ${sc.tagCls}`}>{sc.tag}</span>
            </div>
            <ol className="space-y-2">
              {sc.steps.map((st, i) => (
                <li key={st.k} className="flex gap-3 text-sm">
                  <span className="w-6 h-6 shrink-0 rounded-full bg-slate-100 text-slate-700 dark:bg-slate-700 dark:text-slate-200 flex items-center justify-center text-xs font-bold">{i + 1}</span>
                  <span className="text-gray-700 dark:text-slate-200"><span className="font-semibold text-gray-900 dark:text-white">{st.k}: </span>{st.v}</span>
                </li>
              ))}
            </ol>
          </div>
        );
      })()}

      <div className="grid md:grid-cols-2 gap-3 mt-6">
        <div className="rounded-xl p-4 bg-emerald-50 border border-emerald-200 dark:bg-emerald-900/30 dark:border-emerald-800">
          <p className="text-xs font-bold uppercase tracking-wide text-emerald-800 dark:text-emerald-300 mb-2 flex items-center gap-1.5"><CheckCircle2 className="w-3.5 h-3.5" /> What good looks like</p>
          <ul className="text-sm text-gray-700 dark:text-slate-200 space-y-1">
            <li className="flex gap-2"><span>-</span>Every ROPA row links to its lawful basis, LIA or DPIA, vendors and retention rule</li>
            <li className="flex gap-2"><span>-</span>DPIA screening is part of product and vendor intake, not an afterthought</li>
            <li className="flex gap-2"><span>-</span>Documents have owners, dates and a review trigger</li>
            <li className="flex gap-2"><span>-</span>Privacy notice matches what the ROPA says</li>
          </ul>
        </div>
        <div className="rounded-xl p-4 bg-rose-50 border border-rose-200 dark:bg-rose-900/30 dark:border-rose-800">
          <p className="text-xs font-bold uppercase tracking-wide text-rose-800 dark:text-rose-300 mb-2 flex items-center gap-1.5"><AlertTriangle className="w-3.5 h-3.5" /> Common mistakes</p>
          <ul className="text-sm text-gray-700 dark:text-slate-200 space-y-1">
            <li className="flex gap-2"><span>-</span>ROPA built once for an audit and never updated</li>
            <li className="flex gap-2"><span>-</span>DPIA written after launch to justify a decision already made</li>
            <li className="flex gap-2"><span>-</span>Consent used where people have no real choice, such as employees</li>
            <li className="flex gap-2"><span>-</span>Forgetting that support access from another country is a transfer</li>
          </ul>
        </div>
      </div>
      <p className="text-xs text-gray-500 dark:text-slate-400 mt-4">Guidance, not legal advice. Check your supervisory authority's DPIA list and national rules on marketing and employee monitoring.</p>
    </div>
  );
}
