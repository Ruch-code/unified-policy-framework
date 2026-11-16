import { useEffect, useMemo, useRef, useState } from 'react';
import { FileSpreadsheet, Eye, X } from 'lucide-react';

// Base path for the static mapping workbooks built by scripts/build-mapping-workbooks.py.
const BASE = '/templates/mappings/';
const COLS = ['Control ID', 'Control area', 'Control statement', 'Framework', 'Framework version', 'Reference ID', 'Reference title', 'Mapping strength', 'Evidence example', 'Notes'];

// Rows built exactly as the workbook's Mapping sheet builds them, from the same JSON.
export function mappingRows(data) {
  const ver = Object.fromEntries(data.frameworks.map((f) => [f[0], f[1]]));
  return data.rows.map(([cid, fw, ref, title, strength, note]) => {
    const [area, stmt, ev] = data.controls[cid];
    return [cid, area, stmt, fw, ver[fw], ref, title, strength, ev, note];
  });
}

function PreviewModal({ data, onClose }) {
  const rows = useMemo(() => mappingRows(data), [data]);
  const [fw, setFw] = useState('All');
  const [q, setQ] = useState('');
  const closeRef = useRef(null);
  useEffect(() => {
    closeRef.current?.focus();
    const onKey = (e) => { if (e.key === 'Escape') onClose(); };
    document.addEventListener('keydown', onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => { document.removeEventListener('keydown', onKey); document.body.style.overflow = prev; };
  }, [onClose]);
  const shown = rows.filter((r) => (fw === 'All' || r[3] === fw) && (!q || r.join(' ').toLowerCase().includes(q.toLowerCase())));
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-2 sm:p-6" role="dialog" aria-modal="true" aria-label={`${data.title} preview`} onClick={onClose}>
      <div className="flex max-h-full w-full max-w-7xl flex-col rounded-2xl border border-gray-200 bg-white dark:border-gray-700 dark:bg-gray-900" onClick={(e) => e.stopPropagation()}>
        <div className="flex flex-wrap items-center gap-2 border-b border-gray-200 p-3 dark:border-gray-700">
          <h4 className="mr-auto text-base font-bold text-gray-900 dark:text-white">Preview: Mapping sheet</h4>
          <label className="sr-only" htmlFor="map-fw">Framework</label>
          <select id="map-fw" value={fw} onChange={(e) => setFw(e.target.value)} className="ui-input rounded-lg border px-2 py-1.5 text-sm">
            <option>All</option>
            {data.frameworks.map((f) => <option key={f[0]}>{f[0]}</option>)}
          </select>
          <label className="sr-only" htmlFor="map-q">Search</label>
          <input id="map-q" type="search" value={q} onChange={(e) => setQ(e.target.value)} placeholder="Search controls or references" className="ui-input w-56 rounded-lg border px-2 py-1.5 text-sm" />
          <span className="text-xs text-gray-600 dark:text-gray-300">{shown.length} of {rows.length} rows</span>
          <button ref={closeRef} type="button" onClick={onClose} className="btn btn-ghost inline-flex items-center gap-1 px-2 py-1.5 text-sm" aria-label="Close preview"><X className="h-4 w-4" aria-hidden="true" /> Close</button>
        </div>
        <div className="overflow-auto" tabIndex={0} role="region" aria-label="Mapping rows">
          <table className="min-w-[1400px] text-left text-xs">
            <thead className="sticky top-0 bg-gray-100 dark:bg-gray-800">
              <tr>{COLS.map((c) => <th key={c} scope="col" className="whitespace-nowrap p-2 font-semibold text-gray-900 dark:text-white">{c}</th>)}</tr>
            </thead>
            <tbody>
              {shown.map((r, i) => (
                <tr key={i} className="border-t border-gray-100 align-top dark:border-gray-800">
                  {r.map((v, j) => <td key={j} className={`p-2 text-gray-700 dark:text-gray-300 ${j === 0 || j === 5 ? 'whitespace-nowrap font-medium' : ''}`}>{v}</td>)}
                </tr>
              ))}
              {!shown.length && <tr><td colSpan={COLS.length} className="p-4 text-gray-600 dark:text-gray-300">No rows match.</td></tr>}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

/** Compact card: one line of context, a static .xlsx download and an in-page preview built from the same data. */
export default function MappingWorkbookCard({ data, intro, title = 'Framework mapping', className = '' }) {
  const [open, setOpen] = useState(false);
  return (
    <div className={`bg-white border border-gray-200 rounded-2xl p-6 mb-8 dark:bg-gray-800 dark:border-gray-700 ${className}`}>
      <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">{title}</h3>
      <p className="text-gray-600 dark:text-gray-300 mb-4 text-sm">{intro}</p>
      <div className="flex flex-wrap items-center gap-2">
        <a href={BASE + data.fileName} download={data.fileName}
          className="inline-flex items-center gap-1.5 rounded-lg bg-emerald-700 px-3.5 py-2 text-sm font-semibold text-white hover:bg-emerald-800 focus:outline-none focus-visible:ring-2 focus-visible:ring-violet-400 focus-visible:ring-offset-2 dark:focus-visible:ring-offset-slate-900"
          aria-label={`Download ${data.fileName}`}>
          <FileSpreadsheet className="h-4 w-4" aria-hidden="true" /> Download .xlsx
        </a>
        <button type="button" onClick={() => setOpen(true)} className="btn btn-secondary inline-flex items-center gap-1.5 px-3.5 py-2 text-sm">
          <Eye className="h-4 w-4" aria-hidden="true" /> Preview
        </button>
        <span className="text-xs text-gray-500 dark:text-gray-400">{data.rows.length} mappings, {Object.keys(data.controls).length} controls, {data.frameworks.length} frameworks. Reviewed {data.reviewed}.</span>
      </div>
      {open && <PreviewModal data={data} onClose={() => setOpen(false)} />}
    </div>
  );
}
