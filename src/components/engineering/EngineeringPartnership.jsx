import { useState } from 'react';
import { Link } from 'react-router-dom';
import RelatedTemplates from '../templates/RelatedTemplates.jsx';
import {
  ENG_PRINCIPLE, ENG_SECTIONS, SECTION_META, CARD_FIELDS, CARD_EXAMPLES, TICKET_TEXT, AUTOMATION_GUIDE, FRICTION_TIPS,
  DESIGN_VS_OPERATING, BAD_GOOD, IDENTITY_COLUMNS, IDENTITY_ROWS, ACCESS_POINTS, ACCESS_EXCEPTIONS, LOG_EVENT_COLUMNS,
  LOG_EVENTS, LOG_MIN_FIELDS, LOG_PROTECTION, LOG_QUESTIONS, LOG_REDACTION, CHANGE_COLUMNS, CHANGE_MATRIX, CHANGE_POINTS, CHANGE_TEST_DETAIL,
  PIPELINE_STAGES, CICD_POINTS, TRACE_COLUMNS, TRACE_CHAIN, SAMPLING_STEPS, ARCH_FIRST, BOUNDARY_COLUMNS, BOUNDARIES, SCENARIOS,
} from '../../data/engineeringPartnership.js';

const TH = 'text-left p-2 font-semibold text-gray-900 dark:text-white align-bottom';
const TD = 'p-2 text-gray-700 dark:text-slate-300 align-top';
const H3 = 'font-semibold text-gray-900 dark:text-white mt-6 mb-2';
const P = 'text-sm text-gray-700 dark:text-slate-300';
const A = 'underline text-teal-700 dark:text-teal-300';

function Table({ label, headers, rows, min = 900 }) {
  return (
    <div className="overflow-x-auto rounded-xl border border-gray-200 dark:border-slate-700" tabIndex={0} role="region" aria-label={label}>
      <table className="w-full text-sm" style={{ minWidth: min }}>
        <thead className="bg-gray-50 dark:bg-slate-800"><tr>{headers.map(h => <th key={h} scope="col" className={TH}>{h}</th>)}</tr></thead>
        <tbody>{rows.map((r, i) => (
          <tr key={i} className="border-t border-gray-200 dark:border-slate-700">
            {r.map((c, j) => j === 0
              ? <th key={j} scope="row" className={`${TD} font-semibold text-gray-900 dark:text-white`}>{c}</th>
              : <td key={j} className={TD}>{c}</td>)}
          </tr>))}</tbody>
      </table>
    </div>
  );
}

const Ul = ({ items }) => (
  <ul className={`${P} space-y-1`}>{items.map(x => <li key={x} className="flex gap-2"><span aria-hidden="true">-</span><span>{x}</span></li>)}</ul>
);

const Points = ({ items }) => (
  <div className="grid md:grid-cols-2 gap-3">
    {items.map(p => (
      <div key={p.h} className="rounded-xl border border-gray-200 dark:border-slate-700 p-3">
        <p className="font-semibold text-gray-900 dark:text-white text-sm">{p.h}</p>
        <p className={`${P} mt-1`}>{p.b}</p>
      </div>))}
  </div>
);

function Meta({ id }) {
  const m = SECTION_META[id];
  return (
    <dl className="grid sm:grid-cols-2 gap-2 mb-4 text-xs">
      {[['Owner', m.owner], ['Evidence source', m.evidence], ['Exception path', m.exception]].map(([k, v]) => (
        <div key={k} className="rounded-lg bg-teal-50 dark:bg-teal-900/20 border border-teal-200 dark:border-teal-800 p-2">
          <dt className="font-bold uppercase tracking-wide text-teal-800 dark:text-teal-200">{k}</dt>
          <dd className="text-gray-800 dark:text-slate-200 mt-0.5">{v}</dd>
        </div>))}
    </dl>
  );
}

function Section({ id, title, intro, children }) {
  return (
    <section id={id} className="bg-white dark:bg-slate-900 rounded-2xl border border-gray-200 dark:border-slate-700 p-4 sm:p-6 mb-6 scroll-mt-24">
      <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-1">{title}</h2>
      {intro && <p className={`${P} mb-3 max-w-3xl`}>{intro}</p>}
      <Meta id={id} />
      {children}
    </section>
  );
}

function CopyTicket() {
  const [done, setDone] = useState(false);
  const copy = async () => {
    try { await navigator.clipboard.writeText(TICKET_TEXT); setDone(true); setTimeout(() => setDone(false), 2000); } catch { setDone(false); }
  };
  return (
    <div className="rounded-xl border border-gray-200 dark:border-slate-700 overflow-hidden">
      <div className="flex items-center justify-between gap-2 px-3 py-2 bg-gray-50 dark:bg-slate-800">
        <span className="text-xs font-semibold text-gray-700 dark:text-slate-200">Engineering ticket view</span>
        <button type="button" onClick={copy} className="text-xs font-semibold px-3 py-1 rounded-md bg-teal-600 text-white hover:bg-teal-700" aria-live="polite">{done ? 'Copied' : 'Copy ticket'}</button>
      </div>
      <pre className="p-3 text-xs whitespace-pre-wrap text-gray-800 dark:text-slate-200 bg-white dark:bg-slate-900">{TICKET_TEXT}</pre>
    </div>
  );
}

function Card({ c }) {
  const rows = [['Risk statement', c.risk], ['Control owner', c.controlOwner], ['Implementation owner', c.implOwner], ['Engineering task', c.task],
    ['Acceptance criteria', <ul key="ac" className="list-disc pl-4">{c.criteria.map(x => <li key={x}>{x}</li>)}</ul>],
    ['Evidence source', c.evidence], ['Evidence frequency', c.frequency], ['Exception path', c.exception], ['Friction assessment', c.friction], ['Automation decision', c.automation]];
  return (
    <div className="rounded-xl border border-gray-200 dark:border-slate-700 p-3">
      <p className="font-semibold text-gray-900 dark:text-white mb-2">{c.title}</p>
      <dl className="text-sm space-y-1.5">
        {rows.map(([k, v]) => <div key={k} className="grid grid-cols-[9rem_1fr] gap-2"><dt className="font-semibold text-gray-600 dark:text-slate-400">{k}</dt><dd className="text-gray-800 dark:text-slate-200">{v}</dd></div>)}
      </dl>
    </div>
  );
}

function Pipeline() {
  return (
    <ol className="flex flex-col md:flex-row md:items-stretch gap-2 md:gap-0" aria-label="Pipeline with control points">
      {PIPELINE_STAGES.map((s, i) => (
        <li key={s.stage} className="flex md:flex-1 items-stretch">
          <div className="flex-1 rounded-xl border border-teal-300 dark:border-teal-700 bg-teal-50 dark:bg-teal-900/20 p-3">
            <p className="text-xs font-bold uppercase tracking-wide text-teal-800 dark:text-teal-200">{i + 1}. {s.stage}</p>
            <p className="text-xs text-gray-800 dark:text-slate-200 mt-1">{s.control}</p>
          </div>
          {i < PIPELINE_STAGES.length - 1 && <span aria-hidden="true" className="hidden md:flex items-center px-1 text-teal-600 dark:text-teal-400">&rarr;</span>}
        </li>))}
    </ol>
  );
}

export default function EngineeringPartnership() {
  return (
    <div className="mb-8">
      <div className="rounded-2xl border border-teal-200 dark:border-teal-800 bg-teal-50/60 dark:bg-teal-900/10 p-4 sm:p-5 mb-6">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Engineering &amp; Infrastructure Partnership</h2>
        <p className={`${P} mt-1 max-w-3xl`}>How GRC and security teams turn risk into controls that engineers can build, operate and prove. Tools named on this page are examples only.</p>
        <ol className="grid sm:grid-cols-5 gap-2 mt-3">
          {ENG_PRINCIPLE.map(([k, v], i) => (
            <li key={k} className="rounded-lg bg-white dark:bg-slate-900 border border-teal-200 dark:border-teal-800 p-2">
              <p className="text-xs font-bold text-teal-800 dark:text-teal-200">{i + 1}. {k}</p>
              <p className="text-xs text-gray-700 dark:text-slate-300 mt-0.5">{v}</p>
            </li>))}
        </ol>
        <nav aria-label="Sections" className="flex flex-wrap gap-2 mt-4">
          {ENG_SECTIONS.map(s => <a key={s.id} href={`#${s.id}`} onClick={e => { e.preventDefault(); document.getElementById(s.id)?.scrollIntoView({ behavior: 'smooth' }); }} className="text-xs font-semibold px-3 py-1 rounded-full border border-teal-300 dark:border-teal-700 text-teal-800 dark:text-teal-200 hover:bg-teal-100 dark:hover:bg-teal-900/40">{s.label}</a>)}
        </nav>
      </div>

      <Section id="eng-control-delivery" title="1. Control delivery" intro="A control is delivered when an engineering team has built it into normal work and it produces evidence on its own. Use a control delivery card to agree each one.">
        <Table label="Control delivery card fields" headers={['Field', 'What to write']} rows={CARD_FIELDS} min={560} />
        <h3 className={H3}>Worked examples</h3>
        <div className="grid lg:grid-cols-2 gap-3">{CARD_EXAMPLES.map(c => <Card key={c.title} c={c} />)}</div>
        <h3 className={H3}>The same control as an engineering ticket</h3>
        <CopyTicket />
        <div className="grid md:grid-cols-2 gap-4">
          <div><h3 className={H3}>When to automate</h3><Table label="Automation decision" headers={['Decision', 'Use when']} rows={AUTOMATION_GUIDE} min={360} /></div>
          <div><h3 className={H3}>Reducing friction</h3><Ul items={FRICTION_TIPS} /></div>
        </div>
        <h3 className={H3}>Design versus operating effectiveness</h3>
        <Table label="Design versus operating effectiveness" headers={['Test', 'Question', 'How it is tested', 'When']} rows={DESIGN_VS_OPERATING} min={640} />
        <h3 className={H3}>Bad versus good requirements</h3>
        <Table label="Bad versus good requirements" headers={['Vague requirement', 'Buildable and testable requirement']} rows={BAD_GOOD} min={560} />
        <RelatedTemplates className="mt-4" slugs={['control-delivery-card']} exclusive limit={2} />
      </Section>

      <Section id="eng-access" title="2. Access reviews and identity" intro="Start from a complete inventory of every identity, human and non-human, then review it by risk.">
        <Table label="Identity inventory" headers={IDENTITY_COLUMNS} rows={IDENTITY_ROWS} min={1300} />
        <div className="mt-4"><Points items={ACCESS_POINTS} /></div>
        <h3 className={H3}>Common exceptions</h3>
        <Table label="Access exceptions" headers={['Exception', 'Response']} rows={ACCESS_EXCEPTIONS} min={520} />
        <p className={`${P} mt-3`}>Review frequencies by framework and persona: <a className={A} href="#access-governance">Persona &amp; Access Governance</a>.</p>
        <RelatedTemplates className="mt-3" slugs={['identity-inventory', 'access-review-record', 'privileged-user-list']} exclusive limit={3} />
      </Section>

      <Section id="eng-logging" title="3. Logging and audit trails" intro="Logs are evidence only if they answer investigation questions. Define the events first, then the fields, then the protection.">
        <Table label="Log event catalogue" headers={LOG_EVENT_COLUMNS} rows={LOG_EVENTS} min={1300} />
        <p className="text-xs text-gray-500 dark:text-slate-400 mt-2">Retention uses the tiers in the existing <a className={A} href="#regional" onClick={() => setTimeout(() => document.getElementById('secops-logging')?.scrollIntoView({ behavior: 'smooth' }), 300)}>Logging, Monitoring &amp; SIEM Retention</a> table (Security Operations). This page sets no separate figures.</p>
        <div className="grid md:grid-cols-2 gap-4">
          <div><h3 className={H3}>Minimum fields</h3><Ul items={LOG_MIN_FIELDS} /></div>
          <div><h3 className={H3}>Access and integrity</h3><Ul items={LOG_PROTECTION} /></div>
          <div><h3 className={H3}>Investigation questions</h3><Ul items={LOG_QUESTIONS} /></div>
        </div>
        <h3 className={H3}>Redaction</h3>
        <Table label="What to log, mask and never log" headers={['Rule', 'Examples']} rows={LOG_REDACTION} min={520} />
        <RelatedTemplates className="mt-4" slugs={['log-event-catalogue', 'log-alerting']} exclusive limit={2} />
      </Section>

      <Section id="eng-change" title="4. Change management" intro="One path to production for every kind of change, with controls scaled to the change type. Builds on the existing CHG controls in the risk assessment control library.">
        <Table label="Change controls by change type" headers={CHANGE_COLUMNS} rows={CHANGE_MATRIX} min={1200} />
        <h3 className="mt-5 mb-2 text-sm font-bold text-navy-900 dark:text-text-dark-primary">Tests by change type</h3>
        <div className="grid gap-3 md:grid-cols-2">
          {CHANGE_TEST_DETAIL.map((c) => (
            <div key={c.type} className="rounded-lg border border-surface-200 dark:border-surface-dark-200 p-3 text-sm text-navy-700 dark:text-text-dark-secondary">
              <p className="font-semibold text-navy-900 dark:text-text-dark-primary mb-1">{c.type}</p>
              <ul className="list-disc pl-5 space-y-1">{c.tests.map((t) => <li key={t}>{t}</li>)}</ul>
              <p className="mt-2"><strong>Example:</strong> {c.example}</p>
            </div>
          ))}
        </div>
        <div className="mt-4"><Points items={CHANGE_POINTS} /></div>
        <RelatedTemplates className="mt-4" slugs={['change-management-procedure', 'change-traceability-sample']} exclusive limit={2} />
      </Section>

      <Section id="eng-cicd" title="5. CI/CD controls" intro="The pipeline is where most change controls run. Protect it like production.">
        <Pipeline />
        <div className="mt-4"><Points items={CICD_POINTS} /></div>
        <h3 className={H3}>Traceability chain</h3>
        <Table label="Traceability chain" headers={TRACE_COLUMNS} rows={TRACE_CHAIN} min={1000} />
        <h3 className={H3}>Sample backward from production</h3>
        <ol className={`${P} list-decimal pl-5 space-y-1`}>{SAMPLING_STEPS.map(s => <li key={s}>{s}</li>)}</ol>
        <p className={`${P} mt-3`}>Read-only test procedures: <a className={A} href="#regional">Cloud Control Testing Guide</a>, Cross-cloud tab.</p>
        <RelatedTemplates className="mt-3" slugs={['cicd-description', 'change-traceability-sample']} exclusive limit={2} />
      </Section>

      <Section id="eng-agent-exec" title="6. Cloud and agent execution" intro="Treat CI jobs and AI agents as workloads with identities and boundaries. Prompt injection is a boundary problem: limit what an agent can do after reading untrusted content.">
        <h3 className="font-semibold text-gray-900 dark:text-white mb-2">Ask about the architecture first</h3>
        <Ul items={ARCH_FIRST} />
        <h3 className={H3}>Boundaries</h3>
        <Table label="Execution boundaries" headers={BOUNDARY_COLUMNS} rows={BOUNDARIES} min={1200} />
        <p className={`${P} mt-3`}>Related: <Link className={A} to="/gdpr#vibe-platform-operator">vibe coding platform operator scenario</Link> and <Link className={A} to="/iso/42001">ISO/IEC 42001</Link>.</p>
        <RelatedTemplates className="mt-3" slugs={['agent-execution-review']} exclusive limit={1} />
      </Section>

      <Section id="eng-scenarios" title="7. Walkthrough scenarios" intro="How each conversation runs from architecture questions to an agreed outcome.">
        <div className="space-y-3">
          {SCENARIOS.map(s => (
            <details key={s.id} id={s.id} className="rounded-xl border border-gray-200 dark:border-slate-700">
              <summary className="cursor-pointer p-3 font-semibold text-gray-900 dark:text-white">{s.title}</summary>
              <div className="p-3 pt-0 grid md:grid-cols-2 gap-3 text-sm">
                <div><p className="font-semibold text-gray-900 dark:text-white">Architecture questions</p><Ul items={s.questions} /></div>
                <div><p className="font-semibold text-gray-900 dark:text-white">Risk</p><p className={P}>{s.risk}</p>
                  <p className="font-semibold text-gray-900 dark:text-white mt-2">Control</p><p className={P}>{s.control}</p></div>
                <div><p className="font-semibold text-gray-900 dark:text-white">Task</p><p className={P}>{s.task}</p>
                  <p className="font-semibold text-gray-900 dark:text-white mt-2">Acceptance criteria</p><Ul items={s.criteria} /></div>
                <div><p className="font-semibold text-gray-900 dark:text-white">Evidence</p><p className={P}>{s.evidence}</p>
                  <p className="font-semibold text-gray-900 dark:text-white mt-2">Pushback</p><p className={`${P} italic`}>{s.pushback}</p>
                  <p className="font-semibold text-gray-900 dark:text-white mt-2">Agreed outcome</p><p className={P}>{s.outcome}</p></div>
              </div>
            </details>))}
        </div>
      </Section>
    </div>
  );
}

const LINK_SETS = {
  soc2: [['eng-access', 'Access and identity', 'CC6.1, CC6.2, CC6.3'], ['eng-logging', 'Logging and audit trails', 'CC7.2'], ['eng-change', 'Change management', 'CC8.1'], ['eng-cicd', 'CI/CD controls', 'CC8.1']],
  iso27001: [['eng-access', 'Access and identity', 'A.5.16, A.5.18, A.8.2'], ['eng-logging', 'Logging and audit trails', 'A.8.15, A.8.16, A.8.17'], ['eng-change', 'Change management', 'A.8.32'], ['eng-cicd', 'CI/CD controls', 'A.8.4, A.8.25'], ['eng-agent-exec', 'Cloud and agent execution', 'A.8.31']],
};

/** Compact link card for SOC 2, ISO 27001, Security Operations and access governance. */
export function EngPartnershipLink({ set, only, className = '' }) {
  const all = Object.fromEntries([...LINK_SETS.soc2, ...LINK_SETS.iso27001].map(r => [r[0], [r[0], r[1], '']]));
  const rows = set ? LINK_SETS[set] : (only || []).map(id => all[id]);
  const go = id => { window.location.hash = 'engineering-partnership'; setTimeout(() => document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' }), 400); };
  return (
    <div className={`rounded-xl border border-teal-200 dark:border-teal-800 bg-teal-50/60 dark:bg-teal-900/20 p-4 ${className}`}>
      <span className="text-[10px] font-bold uppercase tracking-wide text-teal-800 dark:text-teal-200">Engineering partnership</span>
      <p className="text-sm text-gray-700 dark:text-slate-300 mt-1">How to agree, build and evidence these controls with engineering teams.</p>
      <ul className="flex flex-wrap gap-x-4 gap-y-1 mt-2 text-sm">
        {rows.map(([id, label, refs]) => (
          <li key={id}>
            {typeof window !== 'undefined' && window.location.pathname === '/'
              ? <a href={`#${id}`} onClick={e => { e.preventDefault(); go(id); }} className="underline text-teal-700 dark:text-teal-300">{label}</a>
              : <Link to={`/#engineering-partnership`} onClick={() => setTimeout(() => document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' }), 600)} className="underline text-teal-700 dark:text-teal-300">{label}</Link>}
            {refs && <span className="text-xs text-gray-500 dark:text-slate-400"> ({refs})</span>}
          </li>))}
      </ul>
    </div>
  );
}
