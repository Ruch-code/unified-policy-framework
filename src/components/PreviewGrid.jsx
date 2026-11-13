import { useMemo, useState } from 'react';

const H = 'text-gray-900 dark:text-white';
const TXT = 'text-gray-700 dark:text-slate-300';
const LINE = 'border-gray-200 dark:border-slate-700';
const BTN = `px-3 py-1.5 border ${LINE} rounded text-sm ${H} bg-white dark:bg-slate-900`;

// Spreadsheet-style preview: bold sticky header, per-column filters, search and sort.
export default function PreviewGrid({ id, columns, rows, hidden, widths = {} }) {
  const [filters, setFilters] = useState({});
  const [q, setQ] = useState('');
  const [sort, setSort] = useState({ col: null, dir: 1 });
  const visible = columns.map((c, i) => [c, i]).filter(([c]) => !hidden?.has(c));
  const shown = useMemo(() => {
    const t = q.trim().toLowerCase();
    let r = rows.filter((row) => (!t || row.join(' ').toLowerCase().includes(t))
      && Object.entries(filters).every(([i, v]) => !v || String(row[i]).toLowerCase().includes(v.toLowerCase())));
    if (sort.col !== null) r = [...r].sort((a, b) => String(a[sort.col]).localeCompare(String(b[sort.col]), undefined, { numeric: true }) * sort.dir);
    return r;
  }, [rows, q, filters, sort]);
  const active = q || Object.values(filters).some(Boolean);

  return (
    <div>
      <div className="flex flex-wrap items-center gap-2 mb-2">
        <input type="search" value={q} onChange={(e) => setQ(e.target.value)} placeholder="Search all columns" aria-label="Search all columns" className={`px-2 py-1.5 border ${LINE} rounded text-sm bg-white dark:bg-slate-900 w-64`} />
        {active && <button type="button" className={BTN} onClick={() => { setQ(''); setFilters({}); }}>Clear filters</button>}
        <span className="text-xs text-gray-500 dark:text-slate-400">{shown.length} of {rows.length} rows</span>
      </div>
      <div id={id} className={`overflow-auto border ${LINE} rounded`} style={{ maxHeight: '70vh' }} tabIndex={0} role="region" aria-label="Preview">
        <table className="text-sm border-collapse" style={{ minWidth: visible.length * 150 }}>
          <thead className="sticky top-0 z-10 bg-gray-100 dark:bg-slate-800">
            <tr>{visible.map(([c, i]) => (
              <th key={c} scope="col" aria-sort={sort.col === i ? (sort.dir === 1 ? 'ascending' : 'descending') : 'none'} className={`text-left align-bottom p-2 font-bold border-b ${LINE} ${H}`} style={{ minWidth: (widths[c] || 18) * 7 }}>
                <button type="button" className="text-left font-bold" onClick={() => setSort((p) => (p.col === i ? { col: i, dir: -p.dir } : { col: i, dir: 1 }))}>
                  {c}{sort.col === i ? (sort.dir === 1 ? ' ▲' : ' ▼') : ''}
                </button>
              </th>
            ))}</tr>
            <tr>{visible.map(([c, i]) => (
              <th key={c} className={`p-1 border-b ${LINE}`}>
                <input value={filters[i] || ''} onChange={(e) => setFilters((f) => ({ ...f, [i]: e.target.value }))} placeholder="Filter" aria-label={`Filter ${c}`} className={`w-full px-1.5 py-1 border ${LINE} rounded text-xs font-normal bg-white dark:bg-slate-900`} />
              </th>
            ))}</tr>
          </thead>
          <tbody>{shown.map((r) => (
            <tr key={r.join('|')} className={`border-t ${LINE} align-top`}>
              {visible.map(([c, i]) => <td key={c} className={`p-2 ${i === 0 ? `font-semibold ${H}` : r[i] === 'Not mapped' ? 'text-gray-400 dark:text-slate-500' : TXT}`}>{r[i]}</td>)}
            </tr>
          ))}</tbody>
        </table>
      </div>
    </div>
  );
}

