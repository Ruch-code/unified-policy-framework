import { useEffect, useMemo, useState } from 'react';
import { ANNEX_A_CONTROLS } from '../data/iso27001AnnexA.js';
import { NewBadge, Verified } from './updates/UpdateBits.jsx';

const CLAUSES = [
  ['4', 'Context of the organisation'], ['5', 'Leadership'], ['6', 'Planning'], ['7', 'Support'],
  ['8', 'Operation'], ['9', 'Performance evaluation'], ['10', 'Improvement'],
];
const STATUSES = ['Not started', 'In progress', 'Implemented', 'Not applicable'];
const KEY = 'onelens_iso27001_tracker';
const LINE = 'border-gray-200 dark:border-slate-700';
const FIELD = `w-full px-2 py-1 border ${LINE} rounded text-xs bg-white dark:bg-slate-900`;

const load = () => { try { return JSON.parse(localStorage.getItem(KEY)) || {}; } catch { return {}; } };

export default function IsoImplementationTracker() {
  const items = useMemo(() => [
    ...CLAUSES.map(([id, t]) => ({ id: `Clause ${id}`, title: t, group: 'Clauses 4 to 10' })),
    ...ANNEX_A_CONTROLS.map((c) => ({ id: c.id, title: c.title, group: `Annex A: ${c.theme}` })),
  ], []);
  const [data, setData] = useState(load);
  const [filter, setFilter] = useState('All');
  const [q, setQ] = useState('');
  useEffect(() => { try { localStorage.setItem(KEY, JSON.stringify(data)); } catch { /* storage unavailable */ } }, [data]);

  const set = (id, k, v) => setData((d) => ({ ...d, [id]: { ...d[id], [k]: v } }));
  const applicable = items.filter((i) => (data[i.id]?.status || 'Not started') !== 'Not applicable');
  const done = applicable.filter((i) => data[i.id]?.status === 'Implemented').length;
  const pct = applicable.length ? Math.round((done / applicable.length) * 100) : 0;
  const shown = items.filter((i) => (filter === 'All' || (data[i.id]?.status || 'Not started') === filter) && (!q || `${i.id} ${i.title}`.toLowerCase().includes(q.toLowerCase())));

  return (
    <div>
      <h3 className="text-lg font-bold text-gray-900 dark:text-white">ISO 27001:2022 Implementation Tracker<NewBadge /></h3>
      <Verified />
      <p className="mt-2 text-sm text-gray-700 dark:text-slate-300 max-w-3xl">Track clauses 4 to 10 and the 93 Annex A controls. Your entries are saved only in this browser. Mark controls excluded in your Statement of Applicability as Not applicable; they are left out of the progress figure.</p>
      <div className="mt-3">
        <div className="flex justify-between text-xs text-gray-600 dark:text-slate-300"><span>{done} of {applicable.length} applicable items implemented</span><span>{pct}%</span></div>
        <div className="mt-1 h-2 rounded bg-gray-200 dark:bg-slate-700" role="progressbar" aria-valuenow={pct} aria-valuemin={0} aria-valuemax={100}><div className="h-2 rounded bg-[#344c67]" style={{ width: `${pct}%` }} /></div>
      </div>
      <div className="mt-3 flex flex-wrap gap-2 items-center">
        <select value={filter} onChange={(e) => setFilter(e.target.value)} aria-label="Filter by status" className={`${FIELD} w-auto`}>{['All', ...STATUSES].map((s) => <option key={s}>{s}</option>)}</select>
        <input type="search" value={q} onChange={(e) => setQ(e.target.value)} placeholder="Search controls" aria-label="Search controls" className={`${FIELD} w-56`} />
        <button type="button" onClick={() => { if (window.confirm('Clear all tracker entries in this browser?')) setData({}); }} className={`ml-auto px-2 py-1 border ${LINE} rounded text-xs`}>Reset</button>
      </div>
      <div className={`mt-3 overflow-x-auto rounded border ${LINE}`} tabIndex={0} role="region" aria-label="ISO 27001 tracker">
        <table className="w-full text-sm" style={{ minWidth: 1100 }}>
          <thead className="bg-gray-50 dark:bg-slate-800"><tr>{['ID', 'Control', 'Owner', 'Status', 'Gap', 'Corrective action', 'Due date'].map((h) => <th key={h} scope="col" className="text-left p-2 font-semibold text-gray-900 dark:text-white">{h}</th>)}</tr></thead>
          <tbody>
            {shown.map((i) => {
              const d = data[i.id] || {};
              return (
                <tr key={i.id} className={`border-t ${LINE} align-top`}>
                  <td className="p-2 font-mono text-xs text-gray-900 dark:text-white whitespace-nowrap">{i.id}</td>
                  <td className="p-2 text-gray-700 dark:text-slate-300">{i.title}<div className="text-[11px] text-gray-500 dark:text-slate-400">{i.group}</div></td>
                  <td className="p-2"><input value={d.owner || ''} onChange={(e) => set(i.id, 'owner', e.target.value)} aria-label={`${i.id} owner`} className={FIELD} /></td>
                  <td className="p-2"><select value={d.status || 'Not started'} onChange={(e) => set(i.id, 'status', e.target.value)} aria-label={`${i.id} status`} className={FIELD}>{STATUSES.map((s) => <option key={s}>{s}</option>)}</select></td>
                  <td className="p-2"><input value={d.gap || ''} onChange={(e) => set(i.id, 'gap', e.target.value)} aria-label={`${i.id} gap`} className={FIELD} /></td>
                  <td className="p-2"><input value={d.action || ''} onChange={(e) => set(i.id, 'action', e.target.value)} aria-label={`${i.id} corrective action`} className={FIELD} /></td>
                  <td className="p-2"><input type="date" value={d.due || ''} onChange={(e) => set(i.id, 'due', e.target.value)} aria-label={`${i.id} due date`} className={FIELD} /></td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
