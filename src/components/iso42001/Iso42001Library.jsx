import { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { ChevronDown, ChevronRight, Download, ExternalLink, Library, Search } from 'lucide-react';
import {
  CONTROLS, POLICIES, TEMPLATES, ROLES, PDCA, MATURITY, STATUSES, COUNTS, NOTICE, TYPE_EXPLAINER, OFFICIAL_URL, CONTENT_VERSION,
  AUDITOR_VIEW, STARTUP_PATH, CROSSWALK_FIELDS, CROSSWALK_NOTE, controlsForPolicy, controlsForTemplate,
} from '../../data/iso42001.js';
import { downloadXlsx } from '../../utils/xlsxExport.js';
import RelatedTemplates from '../templates/RelatedTemplates.jsx';

// Same per-user progress store as the learning page: browser localStorage under the shared prefix.
const STORE = 'compliance-learning-iso-42001-library';
const load = () => { try { return JSON.parse(localStorage.getItem(STORE)) || {}; } catch { return {}; } };
const save = (v) => { try { localStorage.setItem(STORE, JSON.stringify(v)); } catch { /* storage unavailable */ } };

const TABS = ['Control library', 'Coverage', 'SoA builder', 'Policies', 'Templates', 'Evidence checklist', 'Auditor view', 'Startup path', 'Crosswalk'];
const CARD = 'rounded-xl border border-surface-200 dark:border-surface-dark-200 bg-white dark:bg-slate-900/40';
const INPUT = 'rounded-lg border border-surface-300 dark:border-surface-dark-300 bg-white dark:bg-slate-900 text-gray-900 dark:text-text-dark-primary text-xs px-2 py-2 max-w-full';
const BTN = 'inline-flex items-center gap-2 px-3 py-2 rounded-lg bg-violet-600 text-white text-xs font-bold hover:bg-violet-700';
const TEXT = 'text-gray-700 dark:text-text-dark-secondary';
const uniq = (a) => [...new Set(a)];
const applies = (k, role) => !role || k.appliesTo.includes('All') || k.appliesTo.includes(role);

function Bullets({ title, items }) {
  if (!items?.length) return null;
  return (
    <div>
      <p className="font-semibold text-gray-900 dark:text-text-dark-primary mb-1">{title}</p>
      <ul className={`list-disc pl-4 space-y-0.5 ${TEXT}`}>{items.map((t) => <li key={t}>{t}</li>)}</ul>
    </div>
  );
}

function Chip({ children }) {
  return <span className="inline-block px-2 py-0.5 rounded-md bg-violet-100 dark:bg-violet-900/40 text-violet-800 dark:text-violet-200 text-[11px] font-semibold">{children}</span>;
}

function ControlRow({ k, role, status, onStatus }) {
  const [open, setOpen] = useState(false);
  const dim = !applies(k, role);
  return (
    <li className={`${CARD} ${dim ? 'opacity-50' : ''}`}>
      <button type="button" aria-expanded={open} onClick={() => setOpen(!open)} className="w-full flex items-start gap-2 p-3 text-left">
        {open ? <ChevronDown className="w-4 h-4 mt-0.5 shrink-0 text-gray-500" /> : <ChevronRight className="w-4 h-4 mt-0.5 shrink-0 text-gray-500" />}
        <span className="font-mono text-xs font-bold text-violet-700 dark:text-violet-300 shrink-0 w-16">{k.id}</span>
        <span className="flex-1 min-w-0">
          <span className="block text-sm font-semibold text-gray-900 dark:text-text-dark-primary">{k.title}</span>
          <span className={`block text-xs ${TEXT}`}>{k.plainEnglishSummary}</span>
          <span className="mt-1 flex flex-wrap gap-1"><Chip>{k.type}</Chip><Chip>{k.pdcaPhase}</Chip><Chip>{k.maturity}</Chip><Chip>{k.ownerRole}</Chip></span>
        </span>
      </button>
      {open && (
        <div className="px-3 pb-3 text-xs space-y-3">
          <div className="grid gap-3 md:grid-cols-2">
            <Bullets title="Implementation guidance" items={k.implementationGuidance} />
            <Bullets title="Evidence" items={k.evidence} />
            <Bullets title="Common gaps" items={k.commonGaps} />
            <Bullets title="Auditor questions" items={k.auditorQuestions} />
            <Bullets title="Document tests" items={k.relatedDocumentTests} />
            <Bullets title="Crosswalk" items={CROSSWALK_FIELDS.filter(([f]) => k.crosswalk[f]).map(([f, l]) => `${l}: ${k.crosswalk[f]}`)} />
            <Bullets title="Related policies" items={k.relatedPolicies.map((s) => POLICIES.find((p) => p.slug === s)?.name)} />
          </div>
          <p className={TEXT}><strong>Theme:</strong> {k.theme}. <strong>Applies to:</strong> {k.appliesTo.join(', ')}. <strong>Suggested review:</strong> {k.reviewFrequency}.</p>
          <label className={`flex items-center gap-2 ${TEXT}`}>Status
            <select className={INPUT} value={status} onChange={(e) => onStatus(k.id, e.target.value)}>{STATUSES.map((s) => <option key={s}>{s}</option>)}</select>
          </label>
          <RelatedTemplates slugs={[...k.relatedPolicies, ...k.relatedTemplates]} exclusive />
        </div>
      )}
    </li>
  );
}

function ControlTab({ role, state, setStatus }) {
  const [f, setF] = useState({ q: '', type: '', theme: '', phase: '', owner: '', maturity: '' });
  const rows = CONTROLS.filter((k) => (!f.type || k.type === f.type) && (!f.theme || k.theme === f.theme) && (!f.phase || k.pdcaPhase === f.phase)
    && (!f.owner || k.ownerRole === f.owner) && (!f.maturity || k.maturity === f.maturity)
    && (!f.q || JSON.stringify(k).toLowerCase().includes(f.q.toLowerCase())));
  const sel = (key, label, opts) => (
    <select aria-label={label} className={INPUT} value={f[key]} onChange={(e) => setF({ ...f, [key]: e.target.value })}>
      <option value="">{label}: all</option>{opts.map((o) => <option key={o}>{o}</option>)}
    </select>
  );
  return (
    <>
      <div className="flex flex-wrap gap-2 mb-3">
        <span className="relative flex-1 min-w-[12rem]"><Search className="w-3.5 h-3.5 absolute left-2 top-2.5 text-gray-400" />
          <input aria-label="Search controls" placeholder="Search controls" className={`${INPUT} w-full pl-7`} value={f.q} onChange={(e) => setF({ ...f, q: e.target.value })} /></span>
        {sel('type', 'Type', ['Clause', 'Annex A'])}{sel('theme', 'Theme', uniq(CONTROLS.map((k) => k.theme)))}{sel('phase', 'PDCA', PDCA)}
        {sel('owner', 'Owner', uniq(CONTROLS.map((k) => k.ownerRole)).sort())}{sel('maturity', 'Maturity', MATURITY)}
      </div>
      <p className={`text-xs mb-2 ${TEXT}`}>Showing {rows.length} of {COUNTS.total}</p>
      <ul className="space-y-2">{rows.map((k) => <ControlRow key={k.id} k={k} role={role} status={state.status[k.id] || STATUSES[0]} onStatus={setStatus} />)}</ul>
    </>
  );
}

function CoverageTab({ state }) {
  const groups = uniq(CONTROLS.map((k) => k.theme)).map((theme) => {
    const items = CONTROLS.filter((k) => k.theme === theme);
    const na = items.filter((k) => state.status[k.id] === 'Not applicable').length;
    const done = items.filter((k) => state.status[k.id] === 'Reviewed').length;
    const started = items.filter((k) => ['In progress', 'Evidence uploaded'].includes(state.status[k.id])).length;
    const base = items.length - na;
    return { theme, type: items[0].type, total: items.length, na, done, started, pct: base ? Math.round((done / base) * 100) : 100 };
  });
  return (
    <>
      <p className={`text-xs mb-3 ${TEXT}`}>Set a status on any control in the Control library. Completion counts Reviewed items and leaves out Not applicable items. Status is saved with your progress in this browser. Evidence uploaded is a status only: files are not stored here.</p>
      <div className="overflow-x-auto"><table className="w-full text-xs min-w-[32rem]">
        <thead><tr className="text-left text-gray-900 dark:text-text-dark-primary"><th className="p-2">Clause or domain</th><th className="p-2">Type</th><th className="p-2">Controls</th><th className="p-2">Active</th><th className="p-2">Reviewed</th><th className="p-2">N/A</th><th className="p-2">Complete</th></tr></thead>
        <tbody className={TEXT}>{groups.map((g) => (
          <tr key={g.theme} className="border-t border-surface-200 dark:border-surface-dark-200"><td className="p-2">{g.theme}</td><td className="p-2">{g.type}</td><td className="p-2">{g.total}</td><td className="p-2">{g.started}</td><td className="p-2">{g.done}</td><td className="p-2">{g.na}</td><td className="p-2 font-semibold">{g.pct}%</td></tr>
        ))}</tbody>
      </table></div>
    </>
  );
}

const ANNEX = CONTROLS.filter((k) => k.type === 'Annex A');
function SoaTab({ state, setSoa }) {
  const exportSoa = () => downloadXlsx([{
    name: 'Statement of Applicability', title: 'Statement of Applicability: [Company Name]',
    notes: [`Based on OneLens content v${CONTENT_VERSION.version}. ${NOTICE}`],
    headers: ['Control', 'Title', 'Applicable', 'Justification', 'Implementation status', 'Owner'],
    rows: ANNEX.map((k) => { const s = state.soa[k.id] || {}; return [k.id, k.title, s.applicable || '', s.justification || '', s.impl || '', k.ownerRole]; }),
  }], 'iso42001-statement-of-applicability');
  return (
    <>
      <div className="flex flex-wrap items-center justify-between gap-2 mb-3"><p className={`text-xs ${TEXT}`}>{TYPE_EXPLAINER['Annex A']}</p><button type="button" className={BTN} onClick={exportSoa}><Download className="w-4 h-4" /> SoA (.xlsx)</button></div>
      <ul className="space-y-2">{ANNEX.map((k) => { const s = state.soa[k.id] || {}; return (
        <li key={k.id} className={`${CARD} p-3 grid gap-2 md:grid-cols-[1fr_7rem_2fr_9rem] items-start text-xs`}>
          <p className="text-gray-900 dark:text-text-dark-primary"><span className="font-mono font-bold">{k.id}</span> {k.title}</p>
          <select aria-label={`${k.id} applicable`} className={INPUT} value={s.applicable || ''} onChange={(e) => setSoa(k.id, { applicable: e.target.value })}><option value="">Applicable?</option><option>Yes</option><option>No</option></select>
          <input aria-label={`${k.id} justification`} placeholder="Justification" className={INPUT} value={s.justification || ''} onChange={(e) => setSoa(k.id, { justification: e.target.value })} />
          <select aria-label={`${k.id} implementation`} className={INPUT} value={s.impl || ''} onChange={(e) => setSoa(k.id, { impl: e.target.value })}><option value="">Status</option>{['Not started', 'In progress', 'Implemented'].map((o) => <option key={o}>{o}</option>)}</select>
        </li>); })}</ul>
    </>
  );
}

const PoliciesTab = () => (
  <ul className="grid gap-3 md:grid-cols-2">{POLICIES.map((p) => (
    <li key={p.slug} className={`${CARD} p-3 text-xs space-y-1 ${TEXT}`}>
      <p className="text-sm font-semibold text-gray-900 dark:text-text-dark-primary">{p.name}</p>
      <p><strong>Purpose:</strong> {p.purpose}</p><p><strong>Scope:</strong> {p.scope}</p><p><strong>Owner:</strong> {p.owner}</p><p><strong>Review cycle:</strong> {p.reviewCycle}</p>
      <p><strong>Mapped controls:</strong> {controlsForPolicy(p.slug).join(', ')}</p>
      <RelatedTemplates slugs={[p.slug]} exclusive />
    </li>))}</ul>
);

const TemplatesTab = () => (
  <>
    <p className={`text-xs mb-3 ${TEXT}`}>Original generic templates with instructions, sample content and bracketed placeholders. Also listed under <Link className="underline" to="/templates">Templates</Link>.</p>
    <ul className="grid gap-3 md:grid-cols-2">{TEMPLATES.map((t) => (
      <li key={t.slug} className={`${CARD} p-3 text-xs space-y-1 ${TEXT}`}>
        <p className="text-sm font-semibold text-gray-900 dark:text-text-dark-primary">{t.name}</p><p>{t.purpose}</p>
        <p><strong>Mapped controls:</strong> {controlsForTemplate(t.slug).join(', ') || 'Annex A through the SoA'}</p>
        <RelatedTemplates slugs={[t.slug]} exclusive />
      </li>))}</ul>
  </>
);

function EvidenceTab({ role }) {
  const items = CONTROLS.filter((k) => applies(k, role));
  const exportIt = () => downloadXlsx([{
    name: 'Evidence checklist', title: 'ISO/IEC 42001 evidence checklist', notes: [NOTICE],
    headers: ['Owner', 'Control', 'Title', 'Type', 'Evidence', 'Collected', 'Location'],
    rows: [...items].sort((a, b) => a.ownerRole.localeCompare(b.ownerRole)).flatMap((k) => k.evidence.map((e) => [k.ownerRole, k.id, k.title, k.type, e, '', ''])),
  }], 'iso42001-evidence-checklist');
  return (
    <>
      <div className="flex justify-end mb-3"><button type="button" className={BTN} onClick={exportIt}><Download className="w-4 h-4" /> Checklist (.xlsx)</button></div>
      {uniq(items.map((k) => k.ownerRole)).sort().map((o) => (
        <details key={o} className={`${CARD} p-3 mb-2 text-xs`}><summary className="cursor-pointer font-semibold text-gray-900 dark:text-text-dark-primary">{o}</summary>
          <ul className={`mt-2 space-y-1 ${TEXT}`}>{items.filter((k) => k.ownerRole === o).map((k) => <li key={k.id}><span className="font-mono font-bold">{k.id}</span> {k.evidence.join('; ')}</li>)}</ul>
        </details>))}
    </>
  );
}

const AuditorTab = () => (
  <div className="grid gap-4 md:grid-cols-2 text-xs">
    <Bullets title="Stage 1 expectations" items={AUDITOR_VIEW.stage1} /><Bullets title="Stage 2 expectations" items={AUDITOR_VIEW.stage2} /><Bullets title="Common nonconformities" items={AUDITOR_VIEW.nonconformities} />
    <div className="md:col-span-3"><Bullets title="Sample questions (from the control library)" items={['4.3', '6.1.3', '8.2', '9.2.2', 'A.6.2.8', 'A.10.3'].map((id) => `${id}: ${CONTROLS.find((k) => k.id === id).auditorQuestions[0]}`)} /></div>
  </div>
);

const StartupTab = () => (
  <div className="text-xs space-y-3">
    <p className={TEXT}>{STARTUP_PATH.intro}</p>
    <div className="overflow-x-auto"><table className="w-full"><thead><tr className="text-left text-gray-900 dark:text-text-dark-primary"><th className="p-2">Area</th><th className="p-2">Safe simplification</th></tr></thead>
      <tbody className={TEXT}>{STARTUP_PATH.merge.map(([a, b]) => <tr key={a} className="border-t border-surface-200 dark:border-surface-dark-200"><td className="p-2 font-semibold">{a}</td><td className="p-2">{b}</td></tr>)}</tbody></table></div>
    <Bullets title="Do not simplify away" items={STARTUP_PATH.cannotSimplify} />
    <Bullets title={`Must-have items (${CONTROLS.filter((k) => k.maturity === 'Must have').length})`} items={[CONTROLS.filter((k) => k.maturity === 'Must have').map((k) => k.id).join(', ')]} />
  </div>
);

const CrosswalkTab = () => (
  <>
    <p className={`text-xs mb-3 ${TEXT}`}>{CROSSWALK_NOTE} If you already run an ISMS, the rows with an ISO 27001 entry are your first reuse candidates.</p>
    <div className="overflow-x-auto"><table className="w-full text-xs min-w-[44rem]">
      <thead><tr className="text-left text-gray-900 dark:text-text-dark-primary"><th className="p-2">Control</th><th className="p-2">Title</th>{CROSSWALK_FIELDS.map(([f, l]) => <th key={f} className="p-2">{l}</th>)}</tr></thead>
      <tbody className={TEXT}>{CONTROLS.map((k) => (
        <tr key={k.id} className={`border-t border-surface-200 dark:border-surface-dark-200 ${k.crosswalk.iso27001 ? 'bg-violet-50/60 dark:bg-violet-900/10' : ''}`}><td className="p-2 font-mono font-bold">{k.id}</td><td className="p-2">{k.title}</td>{CROSSWALK_FIELDS.map(([f]) => <td key={f} className="p-2">{k.crosswalk[f]}</td>)}</tr>
      ))}</tbody>
    </table></div>
  </>
);

export default function Iso42001Library({ className = '' }) {
  const [tab, setTab] = useState(TABS[0]);
  const [state, setState] = useState(() => ({ status: {}, soa: {}, role: '', ...load() }));
  const update = (next) => { setState(next); save(next); };
  const setStatus = (id, v) => update({ ...state, status: { ...state.status, [id]: v } });
  const setSoa = (id, v) => update({ ...state, soa: { ...state.soa, [id]: { ...state.soa[id], ...v } } });
  const roleCount = useMemo(() => CONTROLS.filter((k) => applies(k, state.role)).length, [state.role]);
  return (
    <section id="control-library" className={`scroll-mt-24 rounded-2xl border border-surface-300 dark:border-surface-dark-300 bg-white dark:bg-slate-900/60 p-4 md:p-8 mb-10 ${className}`}>
      <h2 className="grc-section-title mb-2"><Library className="w-6 h-6 text-violet-600" /> ISO/IEC 42001 control library</h2>
      <p className={`text-sm ${TEXT}`}>{COUNTS.clauses} clause requirements and {COUNTS.annex} Annex A controls, {COUNTS.total} in total. Control numbers and short titles only. <a className="inline-flex items-center gap-1 underline" href={OFFICIAL_URL} target="_blank" rel="noopener noreferrer">Official standard <ExternalLink className="w-3 h-3" /></a></p>
      <div className="grid gap-2 md:grid-cols-2 my-3 text-xs">
        {Object.entries(TYPE_EXPLAINER).map(([k, v]) => <p key={k} className={`${CARD} p-2 ${TEXT}`}><strong>{k}:</strong> {v}</p>)}
      </div>
      <p className={`text-xs ${TEXT}`}>{NOTICE}</p>
      <p className="text-[11px] text-gray-500 dark:text-text-dark-muted mt-1">Version {CONTENT_VERSION.version}. Last reviewed {CONTENT_VERSION.lastReviewed}.</p>
      <label className={`flex flex-wrap items-center gap-2 text-xs my-3 ${TEXT}`}>My role
        <select className={INPUT} value={state.role} onChange={(e) => update({ ...state, role: e.target.value })}><option value="">All roles</option>{ROLES.map((r) => <option key={r}>{r}</option>)}</select>
        <span>{roleCount} items highlighted for this role</span>
      </label>
      <div role="tablist" aria-label="Control library sections" className="flex gap-2 overflow-x-auto pb-2 mb-3">
        {TABS.map((t) => <button key={t} type="button" role="tab" aria-selected={tab === t} onClick={() => setTab(t)} className={`shrink-0 px-3 py-1.5 rounded-lg text-xs font-semibold border ${tab === t ? 'bg-violet-600 text-white border-violet-600' : 'border-surface-300 dark:border-surface-dark-300 text-gray-700 dark:text-text-dark-secondary'}`}>{t}</button>)}
      </div>
      {tab === 'Control library' && <ControlTab role={state.role} state={state} setStatus={setStatus} />}
      {tab === 'Coverage' && <CoverageTab state={state} />}
      {tab === 'SoA builder' && <SoaTab state={state} setSoa={setSoa} />}
      {tab === 'Policies' && <PoliciesTab />}
      {tab === 'Templates' && <TemplatesTab />}
      {tab === 'Evidence checklist' && <EvidenceTab role={state.role} />}
      {tab === 'Auditor view' && <AuditorTab />}
      {tab === 'Startup path' && <StartupTab />}
      {tab === 'Crosswalk' && <CrosswalkTab />}
    </section>
  );
}
