import { useMemo, useState } from 'react';
import { AEC_INTRO, AEC_FRAMEWORKS, AEC_ITEMS, AEC_PLAN_INTRO, AEC_PLAN, AEC_RACI_NOTE } from '../data/auditEvidenceChecklist.js';

const H = 'text-gray-900 dark:text-white';
const TXT = 'text-gray-700 dark:text-slate-300';
const LINE = 'border-gray-200 dark:border-slate-700';
const LABEL = { R: 'Required', O: 'Optional', '': '' };
const Mark = ({ v }) => (v ? <span className={`text-xs font-semibold ${v === 'R' ? H : 'text-gray-500 dark:text-slate-400'}`}>{LABEL[v]}</span> : <span className="text-gray-300 dark:text-slate-600" aria-label="Not usually tested">-</span>);

export default function AuditEvidenceChecklist() {
  const [fw, setFw] = useState('All');
  const [q, setQ] = useState('');
  const rows = useMemo(() => {
    const col = AEC_FRAMEWORKS.indexOf(fw);
    const term = q.trim().toLowerCase();
    return AEC_ITEMS.filter((r) => (col < 0 || r[3 + col]) && (!term || `${r[0]} ${r[1]} ${r[2]}`.toLowerCase().includes(term)));
  }, [fw, q]);

  return (
    <div className="space-y-8">
      <section>
        <h3 className={`text-lg font-semibold ${H}`}>Evidence checklist by framework</h3>
        <p className={`mt-1 text-sm max-w-3xl ${TXT}`}>{AEC_INTRO}</p>
        <div className="mt-3 flex flex-wrap items-center gap-2">
          {['All', ...AEC_FRAMEWORKS].map((f) => (
            <button key={f} type="button" onClick={() => setFw(f)} aria-pressed={fw === f}
              className={`px-3 py-1.5 rounded border text-xs font-semibold ${fw === f ? 'bg-[#1e293b] text-white border-[#1e293b]' : `${LINE} ${TXT}`}`}>{f}</button>
          ))}
          <input type="search" value={q} onChange={(e) => setQ(e.target.value)} placeholder="Search controls" aria-label="Search controls"
            className={`ml-auto w-full sm:w-56 px-3 py-1.5 border ${LINE} rounded text-sm bg-white dark:bg-slate-900`} />
        </div>
        <p className="mt-2 text-xs text-gray-500 dark:text-slate-400">{rows.length} of {AEC_ITEMS.length} items shown</p>
        <div className={`mt-2 overflow-x-auto rounded border ${LINE}`} tabIndex={0} role="region" aria-label="Audit evidence checklist">
          <table className="w-full text-sm" style={{ minWidth: 1100 }}>
            <thead className="bg-gray-50 dark:bg-slate-800">
              <tr>{['Area', 'Control', 'Evidence auditors usually accept', ...AEC_FRAMEWORKS].map((h) => <th key={h} scope="col" className={`text-left p-2.5 font-semibold ${H}`}>{h}</th>)}</tr>
            </thead>
            <tbody>
              {rows.map((r) => (
                <tr key={`${r[0]}-${r[1]}`} className={`border-t ${LINE} align-top`}>
                  <td className={`p-2.5 text-xs uppercase tracking-wide text-gray-500 dark:text-slate-400`}>{r[0]}</td>
                  <td className={`p-2.5 font-semibold ${H}`}>{r[1]}</td>
                  <td className={`p-2.5 ${TXT}`}>{r[2]}</td>
                  {r.slice(3).map((v, i) => <td key={i} className="p-2.5"><Mark v={v} /></td>)}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <section>
        <h3 className={`text-lg font-semibold ${H}`}>Readiness engagement plan and roles</h3>
        <p className={`mt-1 text-sm max-w-3xl ${TXT}`}>{AEC_PLAN_INTRO}</p>
        <div className={`mt-3 overflow-x-auto rounded border ${LINE}`} tabIndex={0} role="region" aria-label="Engagement plan">
          <table className="w-full text-sm" style={{ minWidth: 1000 }}>
            <thead className="bg-gray-50 dark:bg-slate-800"><tr>{['Phase', 'Workstream', 'Key tasks', 'Client role', 'Advisor role'].map((h) => <th key={h} scope="col" className={`text-left p-2.5 font-semibold ${H}`}>{h}</th>)}</tr></thead>
            <tbody>{AEC_PLAN.map((r) => <tr key={r[1]} className={`border-t ${LINE} align-top`}>{r.map((c, j) => <td key={j} className={`p-2.5 ${j === 1 ? `font-semibold ${H}` : TXT}`}>{c}</td>)}</tr>)}</tbody>
          </table>
        </div>
        <p className={`mt-2 text-xs max-w-3xl text-gray-500 dark:text-slate-400`}>{AEC_RACI_NOTE}</p>
      </section>
    </div>
  );
}
