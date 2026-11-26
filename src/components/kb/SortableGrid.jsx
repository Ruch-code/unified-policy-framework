import { useMemo, useState } from 'react';
import { downloadXlsx } from '../../utils/xlsxExport.js';

// Sortable, keyboard-accessible table with an Export (.xlsx) button. Cells must be plain strings.
export default function SortableGrid({ label, headers, rows, file, min = 760 }) {
  const [sort, setSort] = useState({ col: null, dir: 1 });
  const sorted = useMemo(() => {
    if (sort.col === null) return rows;
    return [...rows].sort((a, b) => String(a[sort.col]).localeCompare(String(b[sort.col]), undefined, { numeric: true }) * sort.dir);
  }, [rows, sort]);
  const toggle = (i) => setSort((p) => (p.col === i ? { col: i, dir: -p.dir } : { col: i, dir: 1 }));
  return (
    <div className="my-2">
      <div className="flex justify-end mb-1">
        <button type="button" className="btn btn-secondary px-3 py-1 rounded text-xs" onClick={() => downloadXlsx([{ name: label.slice(0, 31), title: label, headers, rows: sorted }], file || label)}>Export (.xlsx)</button>
      </div>
      <div className="overflow-x-auto rounded border border-gray-200 dark:border-slate-700" tabIndex={0} role="region" aria-label={label}>
        <table className="w-full text-sm" style={{ minWidth: min }}>
          <thead className="bg-gray-50 dark:bg-slate-800"><tr>{headers.map((h, i) => (
            <th key={h} scope="col" aria-sort={sort.col === i ? (sort.dir === 1 ? 'ascending' : 'descending') : 'none'} className="text-left p-2.5 font-semibold text-gray-900 dark:text-white align-bottom">
              <button type="button" onClick={() => toggle(i)} className="text-left">{h}{sort.col === i ? (sort.dir === 1 ? ' ▲' : ' ▼') : ''}</button>
            </th>
          ))}</tr></thead>
          <tbody>{sorted.map((r, k) => <tr key={`${r[0]}-${k}`} className="border-t border-gray-200 dark:border-slate-700 align-top">{r.map((c, j) => <td key={j} className={`p-2.5 ${j === 0 ? 'font-semibold text-gray-900 dark:text-white' : 'text-gray-700 dark:text-slate-300'}`}>{c}</td>)}</tr>)}</tbody>
        </table>
      </div>
    </div>
  );
}
