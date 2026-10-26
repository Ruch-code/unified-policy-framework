import { Fragment, useMemo, useState } from 'react';
import { ClipboardCheck, ChevronDown, Search, ShieldCheck, ShieldAlert, FileCheck2, Scale, Download, Check, X, PenTool, Activity, FileSearch } from 'lucide-react';
import { AUDIT_OBSERVATIONS, VERDICTS, EXCEPTION_GUIDE, TEST_TYPES } from '../data/auditObservations.js';
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

function Mark({ yes, label }) {
  return yes ? (
    <span className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-rose-100 text-rose-700 dark:bg-rose-900/40 dark:text-rose-300" title={`${label}: yes`} aria-label={`${label}: yes`}>
      <Check className="w-4 h-4" strokeWidth={3} />
    </span>
  ) : (
    <span className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-slate-100 text-slate-500 dark:bg-slate-700 dark:text-slate-300" title={`${label}: no`} aria-label={`${label}: no`}>
      <X className="w-4 h-4" strokeWidth={3} />
    </span>
  );
}

function Detail({ o }) {
  const box = (cls, title, body) => (
    <div className={`rounded-lg p-3 border ${cls}`}>
      <p className="text-[11px] font-bold uppercase tracking-wide">{title}</p>
      <div className="text-sm text-gray-700 dark:text-slate-200 mt-1">{body}</div>
    </div>
  );
  return (
    <div className="grid md:grid-cols-2 gap-2 p-3">
      {box('bg-slate-50 border-slate-200 text-slate-600 dark:bg-slate-800/60 dark:border-slate-700 dark:text-slate-300', 'What the auditor typically asks', <p className="italic">"{o.request}"</p>)}
      {box('bg-amber-50 border-amber-200 text-amber-800 dark:bg-amber-900/30 dark:border-amber-800 dark:text-amber-300', 'Why they ask', <p>{o.why}</p>)}
      {box('bg-emerald-50 border-emerald-200 text-emerald-800 dark:bg-emerald-900/30 dark:border-emerald-800 dark:text-emerald-300', 'How to respond', <p>{o.response}</p>)}
      {box('bg-blue-50 border-blue-200 text-blue-800 dark:bg-blue-900/30 dark:border-blue-800 dark:text-blue-300', 'Evidence that closes it',
        <ul className="space-y-1">{o.evidence.map(e => <li key={e} className="flex gap-2"><span>-</span>{e}</li>)}</ul>)}
      <div className="md:col-span-2">
        {box('bg-violet-50 border-violet-200 text-violet-800 dark:bg-violet-900/30 dark:border-violet-800 dark:text-violet-300', 'Lesson for next time', <p>{o.lesson}</p>)}
      </div>
    </div>
  );
}

const SECTION_META = {
  design: { Icon: PenTool, ring: 'border-indigo-300 dark:border-indigo-700', head: 'bg-indigo-50 dark:bg-indigo-900/30', title: 'text-indigo-900 dark:text-indigo-200' },
  operating: { Icon: Activity, ring: 'border-rose-300 dark:border-rose-700', head: 'bg-rose-50 dark:bg-rose-900/30', title: 'text-rose-900 dark:text-rose-200' },
  neither: { Icon: FileSearch, ring: 'border-slate-300 dark:border-slate-600', head: 'bg-slate-50 dark:bg-slate-800/60', title: 'text-slate-900 dark:text-slate-100' },
};

function FindingsTable({ type, rows }) {
  const [open, setOpen] = useState(null);
  const m = SECTION_META[type];
  return (
    <section className={`rounded-2xl border-2 ${m.ring} overflow-hidden`} aria-labelledby={`obs-${type}`}>
      <div className={`px-4 py-3 ${m.head}`}>
        <h5 id={`obs-${type}`} className={`font-bold flex items-center gap-2 ${m.title}`}>
          <m.Icon className="w-4 h-4" /> {TEST_TYPES[type].label}
          <span className="text-xs font-semibold opacity-80">({rows.length})</span>
        </h5>
        <p className="text-xs text-gray-600 dark:text-slate-300 mt-0.5">{TEST_TYPES[type].desc}</p>
      </div>
      {rows.length === 0 ? (
        <p className="text-sm text-gray-500 dark:text-slate-400 p-4">No findings match the current filters.</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full text-sm min-w-[640px]">
            <thead>
              <tr className="text-left text-[11px] uppercase tracking-wide text-gray-500 dark:text-slate-400 border-b border-gray-200 dark:border-slate-700">
                <th className="px-3 py-2 w-8">#</th>
                <th className="px-3 py-2">Finding</th>
                <th className="px-3 py-2 w-28">Frameworks</th>
                <th className="px-3 py-2 w-24 text-center">Design failure</th>
                <th className="px-3 py-2 w-24 text-center">Operating failure</th>
                <th className="px-3 py-2 w-36">Outcome</th>
              </tr>
            </thead>
            <tbody>
              {rows.map((o, i) => {
                const v = VERDICT_STYLE[o.verdict];
                const isOpen = open === o.id;
                return (
                  <Fragment key={o.id}>
                    <tr className="border-b border-gray-100 dark:border-slate-800 align-top hover:bg-gray-50 dark:hover:bg-slate-800/50 cursor-pointer"
                      onClick={() => setOpen(isOpen ? null : o.id)}>
                      <td className="px-3 py-3 text-gray-500 dark:text-slate-400">{i + 1}</td>
                      <td className="px-3 py-3">
                        <button type="button" aria-expanded={isOpen} className="text-left flex items-start gap-1.5 font-semibold text-gray-900 dark:text-white">
                          <ChevronDown className={`w-4 h-4 mt-0.5 shrink-0 text-gray-400 transition-transform ${isOpen ? 'rotate-180' : '-rotate-90'}`} />
                          <span>{o.title}<span className="block text-[11px] font-medium text-indigo-700 dark:text-indigo-300 mt-0.5">{o.category}</span></span>
                        </button>
                      </td>
                      <td className="px-3 py-3 text-xs text-gray-600 dark:text-slate-300">{o.frameworks.join(', ')}</td>
                      <td className="px-3 py-3 text-center"><Mark yes={o.designFail} label="Design failure" /></td>
                      <td className="px-3 py-3 text-center"><Mark yes={o.operatingFail} label="Operating failure" /></td>
                      <td className="px-3 py-3">
                        <span className={`inline-flex items-center gap-1 text-[10px] font-bold uppercase tracking-wide px-2 py-1 rounded-full border ${v.cls}`}>
                          <v.Icon className="w-3 h-3" /> {VERDICTS[o.verdict].label}
                        </span>
                      </td>
                    </tr>
                    {isOpen && (
                      <tr className="border-b border-gray-100 dark:border-slate-800 bg-gray-50/60 dark:bg-slate-900">
                        <td colSpan={6}><Detail o={o} /></td>
                      </tr>
                    )}
                  </Fragment>
                );
              })}
            </tbody>
          </table>
        </div>
      )}
    </section>
  );
}

export default function AuditObservations() {
  const [fw, setFw] = useState('all');
  const [verdict, setVerdict] = useState('all');
  const [q, setQ] = useState('');
  const [showGuide, setShowGuide] = useState(false);

  const list = useMemo(() => {
    const term = q.trim().toLowerCase();
    return AUDIT_OBSERVATIONS.filter(o =>
      (fw === 'all' || o.frameworks.includes(fw)) &&
      (verdict === 'all' || o.verdict === verdict) &&
      (!term || [o.title, o.request, o.why, o.response, o.lesson, ...o.evidence].join(' ').toLowerCase().includes(term))
    );
  }, [fw, verdict, q]);

  const exportRows = () => exportToCSV(
    ['design', 'operating', 'neither'].flatMap(t => list.filter(o => o.test === t)).map(o => ({ ...o, test: TEST_TYPES[o.test].label, designFail: o.designFail ? 'Yes' : 'No', operatingFail: o.operatingFail ? 'Yes' : 'No', frameworks: o.frameworks.join(', '), verdict: VERDICTS[o.verdict].label, evidence: o.evidence.join('; ') })),
    [
      { key: 'test', header: 'Test type' },
      { key: 'title', header: 'Finding' },
      { key: 'category', header: 'Area' },
      { key: 'designFail', header: 'Design failure' },
      { key: 'operatingFail', header: 'Operating failure' },
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
          Common Audit Findings: Test of Design vs Operating Effectiveness
        </h4>
        <button type="button" onClick={exportRows}
          className="inline-flex items-center gap-1.5 text-xs font-semibold px-3 py-1.5 rounded-lg border bg-white text-slate-700 border-slate-300 hover:bg-slate-50 dark:bg-slate-800 dark:text-slate-200 dark:border-slate-600 dark:hover:bg-slate-700">
          <Download className="w-3.5 h-3.5" /> Export Excel
        </button>
      </div>
      <p className="text-sm text-gray-600 dark:text-slate-300 mb-4 max-w-3xl">
        Requests that come up again and again in SOC 2, ISO 27001 and HIPAA audits, drawn from real engagements and anonymised. Unique findings, split by the audit test they fail. Click any row for why the auditor asks, how to respond, the evidence that closes it, and whether it is usually a valid pushback or a genuine exception.
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
          <input value={q} onChange={e => setQ(e.target.value)} placeholder="Search findings, e.g. background check, MFA, empty log"
            aria-label="Search audit observations"
            className="w-full pl-9 pr-3 py-2 rounded-lg border border-gray-200 bg-white text-sm text-gray-900 dark:bg-slate-800 dark:border-slate-600 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500/40" />
        </div>
        <div className="flex flex-wrap gap-1.5">
          <Chip active={fw === 'all'} onClick={() => setFw('all')}>All frameworks</Chip>
          {FRAMEWORKS.map(f => <Chip key={f} active={fw === f} onClick={() => setFw(f)}>{f}</Chip>)}
          <span className="w-px bg-gray-200 dark:bg-slate-600 mx-1" />
          <Chip active={verdict === 'all'} onClick={() => setVerdict('all')}>Any outcome</Chip>
          {Object.entries(VERDICTS).map(([k, v]) => <Chip key={k} active={verdict === k} onClick={() => setVerdict(k)}>{v.label}</Chip>)}
        </div>
      </div>

      <div className="flex flex-wrap items-center gap-4 text-xs text-gray-600 dark:text-slate-300 mb-3">
        <span>{list.length} of {AUDIT_OBSERVATIONS.length} unique findings</span>
        <span className="inline-flex items-center gap-1.5"><Mark yes label="Legend" /> = yes, this type of failure</span>
        <span className="inline-flex items-center gap-1.5"><Mark yes={false} label="Legend" /> = no</span>
      </div>
      <div className="space-y-5">
        {['design', 'operating', 'neither'].map(t => (
          <FindingsTable key={t} type={t} rows={list.filter(o => o.test === t)} />
        ))}
      </div>
    </div>
  );
}
