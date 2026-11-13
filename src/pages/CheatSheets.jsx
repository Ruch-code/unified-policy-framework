import { useMemo, useState } from 'react';
import { CHEAT_SHEETS, CS_VERIFIED } from '../data/cheatSheets.js';

const H = 'text-gray-900 dark:text-white';
const TXT = 'text-gray-700 dark:text-slate-300';
const LINE = 'border-gray-200 dark:border-slate-700';

function Sheet({ s }) {
  const [q, setQ] = useState('');
  const [sort, setSort] = useState({ col: null, dir: 1 });
  const rows = useMemo(() => {
    const t = q.trim().toLowerCase();
    let r = s.rows.filter((row) => !t || row.join(' ').toLowerCase().includes(t));
    if (sort.col !== null) r = [...r].sort((a, b) => a[sort.col].localeCompare(b[sort.col], undefined, { numeric: true }) * sort.dir);
    return r;
  }, [q, sort, s.rows]);
  const toggle = (i) => setSort((p) => (p.col === i ? { col: i, dir: -p.dir } : { col: i, dir: 1 }));

  return (
    <section id={s.id} className={`cheat-sheet bg-white dark:bg-[#1e293b] border ${LINE} rounded p-5 scroll-mt-24`}>
      <div className="flex flex-wrap items-start justify-between gap-2">
        <div>
          <h2 className={`text-xl font-bold ${H}`}>{s.title}</h2>
          <p className={`mt-1 text-sm ${TXT}`}>{s.intro}</p>
          <p className="mt-1 text-[11px] text-gray-500 dark:text-slate-400">Last verified: {CS_VERIFIED}</p>
        </div>
        <div className="no-print flex gap-2 items-center">
          <input type="search" value={q} onChange={(e) => setQ(e.target.value)} placeholder="Filter rows" aria-label={`Filter ${s.title}`} className={`px-2 py-1 border ${LINE} rounded text-sm bg-white dark:bg-slate-900 w-40`} />
          <button type="button" onClick={() => { document.body.dataset.printSheet = s.id; window.print(); setTimeout(() => { delete document.body.dataset.printSheet; }, 500); }} className={`px-3 py-1 border ${LINE} rounded text-sm ${H}`}>Print / PDF</button>
        </div>
      </div>
      <div className={`mt-3 overflow-x-auto rounded border ${LINE}`} tabIndex={0} role="region" aria-label={s.title}>
        <table className="w-full text-sm" style={{ minWidth: 700 }}>
          <thead className="bg-gray-50 dark:bg-slate-800">
            <tr>{s.columns.map((c, i) => (
              <th key={c} scope="col" aria-sort={sort.col === i ? (sort.dir === 1 ? 'ascending' : 'descending') : 'none'} className={`text-left p-2.5 font-semibold ${H}`}>
                <button type="button" onClick={() => toggle(i)} className="text-left">{c}{sort.col === i ? (sort.dir === 1 ? ' ▲' : ' ▼') : ''}</button>
              </th>
            ))}</tr>
          </thead>
          <tbody>{rows.map((r) => <tr key={r.join('|')} className={`border-t ${LINE} align-top`}>{r.map((c, j) => <td key={j} className={`p-2.5 ${j === 0 ? `font-semibold ${H}` : TXT}`}>{c}</td>)}</tr>)}</tbody>
        </table>
      </div>
      <p className="mt-2 text-[11px] text-gray-500 dark:text-slate-400">
        Source: {s.sources.map(([label, url], i) => <span key={url}>{i > 0 && ', '}<a className="underline" href={url} target="_blank" rel="noopener noreferrer">{label}</a></span>)}. Paraphrased; check the official text.
      </p>
    </section>
  );
}

export default function CheatSheets() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-8 space-y-6">
      <header className="no-print">
        <h1 className={`text-3xl font-serif font-bold ${H}`}>Cheat Sheets</h1>
        <p className={`mt-1 text-sm ${TXT}`}>One-page tables for quick reference. Sort by clicking a column, filter rows, or print any sheet on its own.</p>
        <nav aria-label="Cheat sheets" className="mt-3 flex flex-wrap gap-x-4 gap-y-1 text-sm">
          {CHEAT_SHEETS.map((s) => <a key={s.id} href={`#${s.id}`} className="underline">{s.title}</a>)}
        </nav>
      </header>
      {CHEAT_SHEETS.map((s) => <Sheet key={s.id} s={s} />)}
    </div>
  );
}
