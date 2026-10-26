import { useMemo, useState } from 'react';
import { ClipboardCheck, ChevronDown, Search, ShieldCheck, ShieldAlert, FileCheck2, Scale, Download } from 'lucide-react';
import { AUDIT_OBSERVATIONS, OBS_CATEGORIES, VERDICTS, EXCEPTION_GUIDE } from '../data/auditObservations.js';
import { exportToCSV } from '../utils/exportCSV.jsx';

const VERDICT_STYLE = {
  pushback: { cls: 'bg-emerald-50 text-emerald-800 border-emerald-200 dark:bg-emerald-900/30 dark:text-emerald-300 dark:border-emerald-800', Icon: ShieldCheck },
  evidence: { cls: 'bg-blue-50 text-blue-800 border-blue-200 dark:bg-blue-900/30 dark:text-blue-300 dark:border-blue-800', Icon: FileCheck2 },
  exception: { cls: 'bg-rose-50 text-rose-800 border-rose-200 dark:bg-rose-900/30 dark:text-rose-300 dark:border-rose-800', Icon: ShieldAlert },
  depends: { cls: 'bg-amber-50 text-amber-800 border-amber-200 dark:bg-amber-900/30 dark:text-amber-300 dark:border-amber-800', Icon: Scale },
};
const FRAMEWORKS = ['SOC 2', 'ISO 27001', 'HIPAA'];

function Chip({ active, onClick, children }) {
  return (
    <button type="button" onClick={onClick} aria-pressed={active}
      className={`px-3 py-1 rounded-full text-xs font-semibold border transition ${active ? 'bg-indigo-600 text-white border-indigo-600' : 'bg-white text-gray-700 border-gray-200 hover:border-indigo-300 dark:bg-slate-800 dark:text-slate-200 dark:border-slate-600 dark:hover:border-indigo-500'}`}>
      {children}
    </button>
  );
}

function ObservationCard({ o }) {
  const [open, setOpen] = useState(false);
  const v = VERDICT_STYLE[o.verdict];
  return (
    <div className="rounded-xl border border-gray-200 dark:border-slate-700 bg-white dark:bg-slate-900 overflow-hidden">
      <button type="button" onClick={() => setOpen(!open)} aria-expanded={open} className="w-full text-left p-4 flex items-start gap-3">
        <div className="flex-1 min-w-0">
          <div className="flex flex-wrap items-center gap-1.5 mb-1.5">
            <span className="text-[10px] font-bold uppercase tracking-wide text-indigo-700 dark:text-indigo-300">{o.category}</span>
            {o.frameworks.map(f => (
              <span key={f} className="text-[10px] font-semibold px-1.5 py-0.5 rounded bg-slate-100 text-slate-700 dark:bg-slate-700 dark:text-slate-200">{f}</span>
            ))}
          </div>
          <h5 className="font-bold text-sm text-gray-900 dark:text-white">{o.title}</h5>
        </div>
        <span className={`shrink-0 inline-flex items-center gap-1 text-[10px] font-bold uppercase tracking-wide px-2 py-1 rounded-full border ${v.cls}`}>
          <v.Icon className="w-3 h-3" /> {VERDICTS[o.verdict].label}
        </span>
        <ChevronDown className={`w-4 h-4 shrink-0 mt-1 text-gray-400 transition-transform ${open ? 'rotate-180' : ''}`} />
      </button>
      {open && (
        <div className="px-4 pb-4 space-y-3 text-sm">
          <div className="rounded-lg p-3 bg-slate-50 border border-slate-200 dark:bg-slate-800/60 dark:border-slate-700">
            <p className="text-[11px] font-bold uppercase tracking-wide text-slate-600 dark:text-slate-300">What the auditor typically asks</p>
            <p className="text-gray-700 dark:text-slate-200 mt-1 italic">"{o.request}"</p>
          </div>
          <div className="rounded-lg p-3 bg-amber-50 border border-amber-200 dark:bg-amber-900/30 dark:border-amber-800">
            <p className="text-[11px] font-bold uppercase tracking-wide text-amber-800 dark:text-amber-300">Why they ask</p>
            <p className="text-gray-700 dark:text-slate-200 mt-1">{o.why}</p>
          </div>
          <div className="rounded-lg p-3 bg-emerald-50 border border-emerald-200 dark:bg-emerald-900/30 dark:border-emerald-800">
            <p className="text-[11px] font-bold uppercase tracking-wide text-emerald-800 dark:text-emerald-300">How to respond</p>
            <p className="text-gray-700 dark:text-slate-200 mt-1">{o.response}</p>
          </div>
          <div className="rounded-lg p-3 bg-blue-50 border border-blue-200 dark:bg-blue-900/30 dark:border-blue-800">
            <p className="text-[11px] font-bold uppercase tracking-wide text-blue-800 dark:text-blue-300">Evidence that closes it</p>
            <ul className="mt-1 space-y-1 text-gray-700 dark:text-slate-200">
              {o.evidence.map(e => <li key={e} className="flex gap-2"><span className="text-blue-500 dark:text-blue-300">-</span>{e}</li>)}
            </ul>
          </div>
          <div className="rounded-lg p-3 bg-violet-50 border border-violet-200 dark:bg-violet-900/30 dark:border-violet-800">
            <p className="text-[11px] font-bold uppercase tracking-wide text-violet-800 dark:text-violet-300">Lesson for next time</p>
            <p className="text-gray-700 dark:text-slate-200 mt-1">{o.lesson}</p>
          </div>
        </div>
      )}
    </div>
  );
}

export default function AuditObservations() {
  const [cat, setCat] = useState('all');
  const [fw, setFw] = useState('all');
  const [verdict, setVerdict] = useState('all');
  const [q, setQ] = useState('');
  const [showGuide, setShowGuide] = useState(false);

  const list = useMemo(() => {
    const term = q.trim().toLowerCase();
    return AUDIT_OBSERVATIONS.filter(o =>
      (cat === 'all' || o.category === cat) &&
      (fw === 'all' || o.frameworks.includes(fw)) &&
      (verdict === 'all' || o.verdict === verdict) &&
      (!term || [o.title, o.request, o.why, o.response, o.lesson, ...o.evidence].join(' ').toLowerCase().includes(term))
    );
  }, [cat, fw, verdict, q]);

  const exportRows = () => exportToCSV(
    list.map(o => ({ ...o, frameworks: o.frameworks.join(', '), verdict: VERDICTS[o.verdict].label, evidence: o.evidence.join('; ') })),
    [
      { key: 'category', header: 'Category' },
      { key: 'title', header: 'Observation' },
      { key: 'frameworks', header: 'Frameworks' },
      { key: 'request', header: 'Typical auditor request' },
      { key: 'why', header: 'Why they ask' },
      { key: 'response', header: 'How to respond' },
      { key: 'evidence', header: 'Evidence that closes it' },
      { key: 'verdict', header: 'Pushback or exception' },
      { key: 'lesson', header: 'Lesson for next time' },
    ],
    'common-audit-observations'
  );

  return (
    <div className="bg-white border border-indigo-200 dark:border-indigo-800 rounded-2xl p-5" id="audit-observations">
      <div className="flex flex-wrap items-start justify-between gap-3 mb-2">
        <h4 className="flex items-center gap-2 font-bold text-gray-900 dark:text-white">
          <span className="w-8 h-8 rounded-lg bg-indigo-100 text-indigo-700 dark:bg-indigo-900/40 dark:text-indigo-300 flex items-center justify-center"><ClipboardCheck className="w-4 h-4" /></span>
          Common Audit Observations: Push Back or Accept?
        </h4>
        <button type="button" onClick={exportRows}
          className="inline-flex items-center gap-1.5 text-xs font-semibold px-3 py-1.5 rounded-lg border bg-white text-slate-700 border-slate-300 hover:bg-slate-50 dark:bg-slate-800 dark:text-slate-200 dark:border-slate-600 dark:hover:bg-slate-700">
          <Download className="w-3.5 h-3.5" /> Export Excel
        </button>
      </div>
      <p className="text-sm text-gray-600 dark:text-slate-300 mb-4 max-w-3xl">
        Requests that come up again and again in SOC 2, ISO 27001 and HIPAA audits, drawn from real engagements and anonymised. Each card shows why the auditor asks, how to respond, the evidence that closes it, and whether it is usually a valid pushback or a genuine exception.
      </p>

      <button type="button" onClick={() => setShowGuide(!showGuide)} aria-expanded={showGuide}
        className="w-full flex items-center justify-between gap-2 rounded-xl p-3 mb-4 bg-slate-50 border border-slate-200 dark:bg-slate-800/60 dark:border-slate-700 text-left">
        <span className="font-semibold text-sm text-gray-900 dark:text-white flex items-center gap-2"><Scale className="w-4 h-4 text-indigo-600 dark:text-indigo-300" /> Is it really an exception? Decision guide</span>
        <ChevronDown className={`w-4 h-4 text-gray-400 transition-transform ${showGuide ? 'rotate-180' : ''}`} />
      </button>
      {showGuide && (
        <div className="grid md:grid-cols-3 gap-3 mb-5">
          {[
            { k: 'pushback', t: 'Push back when', items: EXCEPTION_GUIDE.pushback },
            { k: 'exception', t: 'It is an exception when', items: EXCEPTION_GUIDE.exception },
            { k: 'evidence', t: 'Handling a real exception', items: EXCEPTION_GUIDE.handling },
          ].map(col => (
            <div key={col.t} className={`rounded-xl p-3 border ${VERDICT_STYLE[col.k].cls}`}>
              <p className="text-xs font-bold uppercase tracking-wide mb-2">{col.t}</p>
              <ul className="space-y-1.5 text-sm text-gray-700 dark:text-slate-200">
                {col.items.map(i => <li key={i} className="flex gap-2"><span>-</span><span>{i}</span></li>)}
              </ul>
            </div>
          ))}
        </div>
      )}

      <div className="space-y-2 mb-4">
        <div className="relative">
          <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
          <input value={q} onChange={e => setQ(e.target.value)} placeholder="Search observations, e.g. background check, MFA, empty log"
            aria-label="Search audit observations"
            className="w-full pl-9 pr-3 py-2 rounded-lg border border-gray-200 bg-white text-sm text-gray-900 dark:bg-slate-800 dark:border-slate-600 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500/40" />
        </div>
        <div className="flex flex-wrap gap-1.5">
          <Chip active={cat === 'all'} onClick={() => setCat('all')}>All areas</Chip>
          {OBS_CATEGORIES.map(c => <Chip key={c} active={cat === c} onClick={() => setCat(c)}>{c}</Chip>)}
        </div>
        <div className="flex flex-wrap gap-1.5">
          <Chip active={fw === 'all'} onClick={() => setFw('all')}>All frameworks</Chip>
          {FRAMEWORKS.map(f => <Chip key={f} active={fw === f} onClick={() => setFw(f)}>{f}</Chip>)}
          <span className="w-px bg-gray-200 dark:bg-slate-600 mx-1" />
          <Chip active={verdict === 'all'} onClick={() => setVerdict('all')}>Any outcome</Chip>
          {Object.entries(VERDICTS).map(([k, v]) => <Chip key={k} active={verdict === k} onClick={() => setVerdict(k)}>{v.label}</Chip>)}
        </div>
      </div>

      <p className="text-xs text-gray-500 dark:text-slate-400 mb-2">{list.length} of {AUDIT_OBSERVATIONS.length} observations</p>
      <div className="space-y-2">
        {list.map(o => <ObservationCard key={o.id} o={o} />)}
        {!list.length && <p className="text-sm text-gray-500 dark:text-slate-400 py-6 text-center">No observations match these filters.</p>}
      </div>
    </div>
  );
}
