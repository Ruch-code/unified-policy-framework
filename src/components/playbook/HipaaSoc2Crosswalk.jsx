import { useMemo, useState } from 'react';
import { CROSSWALK, OVERLAP_LABELS, MANDATE_LABELS, CROSSWALK_INTRO, ENVIRONMENT_NOTE, TEST_TYPES, SAMPLING_NOTE, RESULT_WORDING } from '../../data/hipaaSoc2Crosswalk.js';

const FILTERS = [['all', 'All'], ['full', OVERLAP_LABELS.full], ['partial', OVERLAP_LABELS.partial], ['soc2', OVERLAP_LABELS.soc2], ['hipaa', OVERLAP_LABELS.hipaa], ['carveout', OVERLAP_LABELS.carveout]];
const COLS = [
  ['soc2', 'SOC 2 criteria', (r) => r.soc2.join(', ') || 'None'],
  ['control', 'Control', (r) => r.table.control],
  ['test', 'How the auditor tested it', (r) => r.table.auditorTest],
  ['cfr', 'HIPAA citation', (r) => (r.cfr.length ? r.cfr.map((c) => `45 CFR ${c}`).join(', ') : 'None')],
  ['mandate', 'Required or Addressable', (r) => MANDATE_LABELS[r.mandate]],
  ['overlap', 'Overlap level', (r) => OVERLAP_LABELS[r.group]],
  ['gap', 'HIPAA gap to close', (r) => r.table.gap],
];
const LINE = 'border-gray-200 dark:border-slate-700';
const TXT = 'text-gray-700 dark:text-slate-300';

export default function HipaaSoc2Crosswalk() {
  const [filter, setFilter] = useState('all');
  const [q, setQ] = useState('');
  const [sort, setSort] = useState({ key: null, dir: 1 });
  const rows = useMemo(() => {
    const n = q.trim().toLowerCase();
    let list = CROSSWALK.filter((r) => filter === 'all' || r.group === filter)
      .filter((r) => !n || [r.title, ...r.soc2, ...r.cfr, ...r.cfr.map((c) => `164.${c.split('.')[1] || ''}`), r.table.control, r.table.gap].join(' ').toLowerCase().includes(n));
    if (sort.key) {
      const get = COLS.find(([k]) => k === sort.key)[2];
      list = [...list].sort((a, b) => get(a).localeCompare(get(b), undefined, { numeric: true }) * sort.dir);
    }
    return list;
  }, [filter, q, sort]);
  const hours = rows.reduce((s, r) => s + r.hours, 0);
  const count = (g) => (g === 'all' ? CROSSWALK.length : CROSSWALK.filter((r) => r.group === g).length);
  const toggleSort = (k) => setSort((s) => (s.key === k ? { key: k, dir: -s.dir } : { key: k, dir: 1 }));

  return (
    <section id="soc2-hipaa-crosswalk" className="max-w-6xl mx-auto px-4 py-10 scroll-mt-24">
      <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">SOC 2 to HIPAA Crosswalk</h2>
      <p className={`text-sm mb-2 max-w-3xl ${TXT}`}>{CROSSWALK_INTRO}</p>
      <p className={`text-xs mb-4 max-w-3xl text-gray-500 dark:text-slate-400`}>{ENVIRONMENT_NOTE} Each row has a full card, with progress tracking, in the final playbook level above: SOC 2 to HIPAA Crosswalk.</p>

      <details className={`rounded-xl border ${LINE} mb-4`}>
        <summary className="p-3 cursor-pointer text-sm font-semibold text-gray-900 dark:text-white">How the auditor tests, and how to read the results</summary>
        <div className="px-3 pb-3 space-y-3">
          <div className={`overflow-x-auto rounded-lg border ${LINE}`}><table className="w-full text-sm min-w-[480px]">
            <thead className="bg-gray-50 dark:bg-slate-800"><tr><th scope="col" className="text-left p-2 text-gray-900 dark:text-white">Test type</th><th scope="col" className="text-left p-2 text-gray-900 dark:text-white">What it means</th></tr></thead>
            <tbody>{TEST_TYPES.map(([t, d]) => <tr key={t} className={`border-t ${LINE}`}><td className="p-2 font-semibold text-gray-900 dark:text-white">{t}</td><td className={`p-2 ${TXT}`}>{d}</td></tr>)}</tbody>
          </table></div>
          <p className={`text-sm ${TXT}`}>{SAMPLING_NOTE}</p>
          <div className={`overflow-x-auto rounded-lg border ${LINE}`}><table className="w-full text-sm min-w-[480px]">
            <thead className="bg-gray-50 dark:bg-slate-800"><tr><th scope="col" className="text-left p-2 text-gray-900 dark:text-white">Result wording</th><th scope="col" className="text-left p-2 text-gray-900 dark:text-white">What it means for you</th></tr></thead>
            <tbody>{RESULT_WORDING.map(([t, d]) => <tr key={t} className={`border-t ${LINE} align-top`}><td className="p-2 font-semibold text-gray-900 dark:text-white">{t}</td><td className={`p-2 ${TXT}`}>{d}</td></tr>)}</tbody>
          </table></div>
        </div>
      </details>

      <div className="flex flex-wrap items-center gap-2 mb-3" role="group" aria-label="Filter by overlap">
        {FILTERS.map(([k, l]) => (
          <button key={k} type="button" aria-pressed={filter === k} onClick={() => setFilter(k)}
            className={`px-3 py-1.5 rounded-full text-xs font-semibold border focus:outline-none focus-visible:ring-2 focus-visible:ring-teal-400 ${filter === k ? 'bg-teal-600 text-white border-teal-600' : `${LINE} ${TXT}`}`}>
            {l} ({count(k)})
          </button>
        ))}
      </div>
      <div className="flex flex-wrap items-center gap-2 mb-3">
        <input aria-label="Search by SOC 2 criteria, CFR citation or control" placeholder="Search CC6.2, 164.312, encryption..." value={q} onChange={(e) => setQ(e.target.value)}
          className={`flex-1 min-w-[12rem] rounded-lg border ${LINE} bg-white dark:bg-slate-900 px-3 py-2 text-sm text-gray-900 dark:text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-teal-400`} />
        <span className={`text-xs font-semibold ${TXT}`} aria-live="polite">{rows.length} rows, ~{hours}h</span>
      </div>

      <div className={`overflow-x-auto rounded-xl border ${LINE}`} tabIndex={0} role="region" aria-label="SOC 2 to HIPAA crosswalk table">
        <table className="w-full text-sm min-w-[1100px]">
          <thead className="bg-gray-50 dark:bg-slate-800"><tr>
            {COLS.map(([k, h]) => (
              <th key={k} scope="col" aria-sort={sort.key === k ? (sort.dir === 1 ? 'ascending' : 'descending') : 'none'} className="text-left p-2 font-semibold text-gray-900 dark:text-white">
                <button type="button" onClick={() => toggleSort(k)} className="hover:underline focus:outline-none focus-visible:ring-2 focus-visible:ring-teal-400 rounded">
                  {h}{sort.key === k ? (sort.dir === 1 ? ' ▲' : ' ▼') : ''}
                </button>
              </th>
            ))}
          </tr></thead>
          <tbody>{rows.map((r) => (
            <tr key={r.id} className={`border-t ${LINE} align-top`}>
              {COLS.map(([k, , get]) => <td key={k} className={`p-2 ${k === 'soc2' || k === 'cfr' ? 'font-mono text-xs' : ''} ${k === 'control' ? 'text-gray-900 dark:text-white' : TXT}`}>{k === 'control' ? <><span className="font-semibold block">{r.title}</span>{get(r)}</> : get(r)}</td>)}
            </tr>
          ))}</tbody>
        </table>
      </div>
      <p className="mt-3 text-xs text-gray-500 dark:text-slate-400">This crosswalk is guidance, not legal advice. Consult current HHS regulations and qualified counsel.</p>
    </section>
  );
}
