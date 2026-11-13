import { Fragment, useEffect, useMemo, useRef, useState } from 'react';
import { FunnelOutline, FunnelFilled } from 'lucide-react';

// Table for the Unified Control Framework page: header filter popovers, active filter chips,
// a compact "Mapped controls" chip view (default) or the detailed one-column-per-framework view,
// expandable rows, and a card layout on phones. PreviewGrid stays as it was for other pages.

const H = 'text-gray-900 dark:text-white';
const TXT = 'text-gray-700 dark:text-slate-300';
const MUTED = 'text-gray-500 dark:text-slate-400';
const LINE = 'border-gray-200 dark:border-slate-700';
const BTN = `px-3 py-1.5 border ${LINE} rounded text-sm ${H} bg-white dark:bg-slate-900`;
const LINK = 'text-xs underline text-sky-700 dark:text-sky-300';
const MAPPED = 'Mapped controls';
const NOT_MAPPED = 'Not mapped';
const VIEW_KEY = 'onelens_ucf_view';

const FW_STYLE = {
  'SOC 2': ['SOC2', 'bg-sky-100 text-sky-900 border-sky-300 dark:bg-sky-900/40 dark:text-sky-100 dark:border-sky-700'],
  'ISO 27001:2022': ['27001', 'bg-emerald-100 text-emerald-900 border-emerald-300 dark:bg-emerald-900/40 dark:text-emerald-100 dark:border-emerald-700'],
  'ISO 42001': ['42001', 'bg-amber-100 text-amber-900 border-amber-300 dark:bg-amber-900/40 dark:text-amber-100 dark:border-amber-700'],
  HIPAA: ['HIPAA', 'bg-rose-100 text-rose-900 border-rose-300 dark:bg-rose-900/40 dark:text-rose-100 dark:border-rose-700'],
  GDPR: ['GDPR', 'bg-blue-100 text-blue-900 border-blue-300 dark:bg-blue-900/40 dark:text-blue-100 dark:border-blue-700'],
  DPDPA: ['DPDPA', 'bg-teal-100 text-teal-900 border-teal-300 dark:bg-teal-900/40 dark:text-teal-100 dark:border-teal-700'],
  'PCI DSS v4.0': ['PCI', 'bg-orange-100 text-orange-900 border-orange-300 dark:bg-orange-900/40 dark:text-orange-100 dark:border-orange-700'],
  'NIST CSF 2.0': ['CSF', 'bg-lime-100 text-lime-900 border-lime-300 dark:bg-lime-900/40 dark:text-lime-100 dark:border-lime-700'],
};
const fwShort = (f) => FW_STYLE[f]?.[0] || f;
const fwTone = (f) => FW_STYLE[f]?.[1] || 'bg-gray-100 text-gray-900 border-gray-300 dark:bg-slate-800 dark:text-slate-100 dark:border-slate-600';
// "164.308(a)(7)(ii)(A), (D)" stays one ID; "Cl. 5.2, A.5.1" is two.
const idCount = (v) => (v && v !== NOT_MAPPED ? v.split(/,\s*(?=[A-Za-z0-9])/).length : 0);

const readView = () => { try { return localStorage.getItem(VIEW_KEY) || 'compact'; } catch { return 'compact'; } };
const writeView = (v) => { try { localStorage.setItem(VIEW_KEY, v); } catch { /* storage unavailable */ } };

function Popover({ anchor, onClose, children, label }) {
  const ref = useRef(null);
  const [pos, setPos] = useState(null);
  useEffect(() => {
    if (!anchor) return undefined;
    const r = anchor.getBoundingClientRect();
    const w = Math.min(288, window.innerWidth - 16);
    setPos({ top: r.bottom + 6, left: Math.max(8, Math.min(r.right - w, window.innerWidth - w - 8)), width: w });
    const onKey = (e) => { if (e.key === 'Escape') { onClose(); anchor.focus?.(); } };
    const onDown = (e) => { if (ref.current && !ref.current.contains(e.target) && !anchor.contains(e.target)) onClose(); };
    document.addEventListener('keydown', onKey);
    document.addEventListener('mousedown', onDown);
    document.addEventListener('touchstart', onDown);
    return () => { document.removeEventListener('keydown', onKey); document.removeEventListener('mousedown', onDown); document.removeEventListener('touchstart', onDown); };
  }, [anchor, onClose]);
  if (!pos) return null;
  return (
    <div ref={ref} role="dialog" aria-label={label} className={`fixed z-50 p-3 rounded border ${LINE} bg-white dark:bg-slate-900 shadow-none text-sm font-normal text-left`}
      style={{ top: pos.top, left: pos.left, width: pos.width, maxHeight: '60vh', overflowY: 'auto' }}>
      {children}
    </div>
  );
}

export default function UcfGrid({ id, columns, rows, widths = {}, frameworks = [] }) {
  const hasFw = frameworks.length > 0;
  const [view, setView] = useState(() => (hasFw ? readView() : 'detailed'));
  const [showUnmapped, setShowUnmapped] = useState(false);
  const [q, setQ] = useState('');
  const [filters, setFilters] = useState({}); // { [column]: { text, values: [] } }
  const [fwFilter, setFwFilter] = useState({ fw: '', text: '' });
  const [sort, setSort] = useState({ col: null, dir: 1 });
  const [pop, setPop] = useState(null); // { col, anchor }
  const [chipPop, setChipPop] = useState(null); // { key, fw, ids, anchor, pinned }
  const [expanded, setExpanded] = useState(null);
  const [copied, setCopied] = useState(false);

  const colIdx = useMemo(() => Object.fromEntries(columns.map((c, i) => [c, i])), [columns]);
  const compact = hasFw && view === 'compact';
  const shownCols = useMemo(() => {
    if (!compact) return columns;
    const first = columns.findIndex((c) => frameworks.includes(c));
    const rest = columns.filter((c) => !frameworks.includes(c));
    const out = [...rest.slice(0, first), MAPPED, ...rest.slice(first)];
    // The ID is shown above the control name in compact view to save a column.
    return columns.includes('Control') ? out.filter((c) => c !== columns[0]) : out;
  }, [compact, columns, frameworks]);
  const rowKey = (r) => r[0];
  const val = (r, c) => (c === MAPPED ? frameworks.map((f) => r[colIdx[f]]).join(' ') : String(r[colIdx[c]] ?? ''));
  const mappedCount = (r) => frameworks.filter((f) => r[colIdx[f]] !== NOT_MAPPED).length;

  const distinct = useMemo(() => Object.fromEntries(columns.map((c) => {
    const s = [...new Set(rows.map((r) => String(r[colIdx[c]])))];
    return [c, s.length < 15 ? s.sort((a, b) => a.localeCompare(b, undefined, { numeric: true })) : null];
  })), [columns, rows, colIdx]);

  const shown = useMemo(() => {
    const t = q.trim().toLowerCase();
    let r = rows.filter((row) => {
      if (t && !row.join(' ').toLowerCase().includes(t)) return false;
      for (const [c, f] of Object.entries(filters)) {
        const v = String(row[colIdx[c]] ?? '');
        if (f.text && !v.toLowerCase().includes(f.text.toLowerCase())) return false;
        if (f.values?.length && !f.values.includes(v)) return false;
      }
      if (fwFilter.fw || fwFilter.text) {
        const fws = fwFilter.fw ? [fwFilter.fw] : frameworks;
        const tt = fwFilter.text.toLowerCase();
        if (!fws.some((f) => row[colIdx[f]] !== NOT_MAPPED && row[colIdx[f]].toLowerCase().includes(tt))) return false;
      }
      return true;
    });
    if (sort.col) {
      r = [...r].sort((a, b) => (sort.col === MAPPED ? mappedCount(a) - mappedCount(b)
        : String(a[colIdx[sort.col]]).localeCompare(String(b[colIdx[sort.col]]), undefined, { numeric: true })) * sort.dir);
    }
    return r;
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [rows, q, filters, fwFilter, sort, colIdx, frameworks]);

  useEffect(() => {
    const onKey = (e) => { if (e.key === 'Escape') { setExpanded(null); setChipPop(null); } };
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, []);

  const isActive = (c) => (c === MAPPED ? !!(fwFilter.fw || fwFilter.text) : !!(filters[c]?.text || filters[c]?.values?.length));
  const setText = (c, text) => setFilters((f) => ({ ...f, [c]: { ...f[c], text } }));
  const toggleValue = (c, v) => setFilters((f) => {
    const cur = f[c]?.values || [];
    return { ...f, [c]: { ...f[c], values: cur.includes(v) ? cur.filter((x) => x !== v) : [...cur, v] } };
  });
  const clearCol = (c) => (c === MAPPED ? setFwFilter({ fw: '', text: '' }) : setFilters((f) => { const n = { ...f }; delete n[c]; return n; }));
  const clearAll = () => { setFilters({}); setFwFilter({ fw: '', text: '' }); setQ(''); };
  const changeView = (v) => { setView(v); writeView(v); setPop(null); setExpanded(null); };
  const toggleSort = (c) => setSort((p) => (p.col === c ? { col: c, dir: -p.dir } : { col: c, dir: 1 }));
  const toggleRow = (k) => setExpanded((e) => (e === k ? null : k));
  const copyIds = async (ids) => { try { await navigator.clipboard.writeText(ids); setCopied(true); setTimeout(() => setCopied(false), 1200); } catch { /* clipboard blocked */ } };

  const chips = [];
  Object.entries(filters).forEach(([c, f]) => {
    if (f.text) chips.push({ key: `${c}-t`, label: `${c}: ${f.text}`, clear: () => setText(c, '') });
    if (f.values?.length) chips.push({ key: `${c}-v`, label: `${c}: ${f.values.join(', ')}`, clear: () => setFilters((x) => ({ ...x, [c]: { ...x[c], values: [] } })) });
  });
  if (fwFilter.fw || fwFilter.text) chips.push({ key: 'fw', label: `${fwFilter.fw || 'Any framework'}: ${fwFilter.text || 'mapped'}`, clear: () => setFwFilter({ fw: '', text: '' }) });

  const filterButton = (c) => {
    const on = isActive(c);
    return (
      <button key={`f-${c}`} type="button" aria-label={`Filter by ${c}`} aria-expanded={pop?.col === c} aria-pressed={on}
        onClick={(e) => { const a = e.currentTarget; setPop((p) => (p?.col === c ? null : { col: c, anchor: a })); }}
        className={`relative inline-flex items-center justify-center w-6 h-6 rounded ${on ? 'text-sky-700 dark:text-sky-300' : MUTED} hover:bg-gray-200 dark:hover:bg-slate-700`}>
        {on ? <FunnelFilled className="w-3.5 h-3.5" /> : <FunnelOutline className="w-3.5 h-3.5" />}
        {on && <span aria-hidden="true" className="absolute -top-0.5 -right-0.5 w-1.5 h-1.5 rounded-full bg-sky-600 dark:bg-sky-300" />}
      </button>
    );
  };

  const chip = (r, f) => {
    const v = r[colIdx[f]];
    const unmapped = v === NOT_MAPPED;
    if (unmapped && !showUnmapped) return null;
    const n = idCount(v);
    const k = `${rowKey(r)}|${f}`;
    return (
      <button key={f} type="button" aria-label={`${f}: ${v}`}
        onMouseEnter={(e) => { const a = e.currentTarget; setChipPop((p) => (p?.pinned ? p : { key: k, fw: f, ids: v, anchor: a, pinned: false })); }}
        onMouseLeave={() => setChipPop((p) => (p && !p.pinned && p.key === k ? null : p))}
        onClick={(e) => { e.stopPropagation(); const a = e.currentTarget; setChipPop((p) => (p?.key === k && p.pinned ? null : { key: k, fw: f, ids: v, anchor: a, pinned: true })); }}
        className={`inline-flex items-center px-1.5 py-0.5 rounded border text-[11px] font-semibold leading-tight ${unmapped ? 'bg-transparent border-dashed border-gray-300 text-gray-500 dark:border-slate-600 dark:text-slate-400' : fwTone(f)}`}>
        {fwShort(f)}{n > 1 ? ` ·${n}` : ''}
      </button>
    );
  };

  const miniGrid = (r) => (
    <div style={{ gridTemplateColumns: 'minmax(6rem, max-content) 1fr' }} className={`grid gap-x-4 gap-y-1 text-xs border ${LINE} rounded p-2 bg-gray-50 dark:bg-slate-800/60`}>
      <span className={`font-semibold ${H}`}>Framework</span><span className={`font-semibold ${H}`}>Control IDs</span>
      {frameworks.map((f) => (
        <Fragment key={f}><span className={TXT}>{f}</span><span className={`break-words ${r[colIdx[f]] === NOT_MAPPED ? MUTED : TXT}`}>{r[colIdx[f]]}</span></Fragment>
      ))}
    </div>
  );

  const renderCell = (r, c, i) => {
    if (c === MAPPED) return <div className="flex flex-wrap gap-1">{frameworks.map((f) => chip(r, f))}</div>;
    const v = r[colIdx[c]];
    if (compact && c === 'Control') return <><span className={`block text-[11px] ${MUTED}`}>{r[0]}</span><span className={`font-semibold ${H}`}>{v}</span></>;
    return <span className={i === 0 ? `font-semibold ${H}` : v === NOT_MAPPED ? MUTED : TXT}>{v}</span>;
  };

  const popCol = pop?.col;
  const titleCol = columns.includes('Control') ? 'Control' : columns[1] || columns[0];

  return (
    <div className="min-w-0">
      <div className="flex flex-wrap items-center gap-2 mb-2">
        <input type="search" value={q} onChange={(e) => setQ(e.target.value)} placeholder="Search all columns" aria-label="Search all columns" className={`px-2 py-1.5 border ${LINE} rounded text-sm bg-white dark:bg-slate-900 w-full sm:w-64`} />
        <span className={`text-xs ${MUTED}`}>{shown.length} of {rows.length} rows</span>
        {chips.map((ch) => (
          <span key={ch.key} className={`inline-flex items-center gap-1 max-w-full px-2 py-0.5 rounded border ${LINE} text-xs ${TXT} bg-gray-50 dark:bg-slate-800`}>
            <span className="truncate">{ch.label}</span>
            <button type="button" aria-label={`Remove filter ${ch.label}`} onClick={ch.clear} className="px-0.5">✕</button>
          </span>
        ))}
        {(chips.length > 0 || q) && <button type="button" className={LINK} onClick={clearAll}>Clear all filters</button>}
        {hasFw && (
          <div className="flex flex-wrap items-center gap-3 sm:ml-auto">
            <label className={`flex items-center gap-1.5 text-xs ${TXT}`}><input type="checkbox" checked={showUnmapped} onChange={(e) => setShowUnmapped(e.target.checked)} />Show unmapped</label>
            <div role="group" aria-label="Table view" className={`inline-flex border ${LINE} rounded overflow-hidden text-xs`}>
              {['compact', 'detailed'].map((v) => (
                <button key={v} type="button" aria-pressed={view === v} onClick={() => changeView(v)}
                  className={`px-2.5 py-1 capitalize ${view === v ? 'bg-gray-900 text-white dark:bg-white dark:text-slate-900 font-semibold' : `${TXT} bg-white dark:bg-slate-900`}`}>{v}</button>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Phones: one card per row, with filter buttons in place of column headers */}
      <div className="sm:hidden space-y-2">
        <details className={`border ${LINE} rounded p-2`}>
          <summary className={`cursor-pointer text-xs font-semibold ${H}`}>Filter by column</summary>
          <div className="mt-2 flex flex-wrap gap-1.5">
          {shownCols.map((c) => (
            <span key={c} className={`inline-flex items-center gap-1 pl-2 pr-0.5 py-0.5 border ${LINE} rounded text-[11px] ${TXT}`}>{c}{filterButton(c)}</span>
          ))}
          </div>
        </details>
        {shown.map((r) => {
          const k = rowKey(r);
          const open = expanded === k;
          return (
            <div key={k} className={`border ${LINE} rounded p-3 bg-white dark:bg-[#1e293b]`}>
              <p className={`text-xs ${MUTED}`}>{r[0]}</p>
              <p className={`font-semibold ${H} break-words`}>{r[colIdx[titleCol]]}</p>
              {hasFw && <div className="mt-2 flex flex-wrap gap-1">{frameworks.map((f) => chip(r, f))}</div>}
              <div className="mt-2 space-y-0.5 text-xs">
                {(hasFw ? ['Strictest SLA or timeline', 'Evidence retention'] : columns.slice(1).filter((c) => c !== titleCol)).filter((c) => c in colIdx).map((c) => (
                  <p key={c} className="break-words"><span className={`font-semibold ${H}`}>{c}: </span><span className={TXT}>{r[colIdx[c]]}</span></p>
                ))}
              </div>
              {hasFw && (
                <>
                  <button type="button" aria-expanded={open} onClick={() => toggleRow(k)} className={`mt-2 ${LINK}`}>{open ? 'Hide full details' : 'Show full details'}</button>
                  {open && (
                    <div className="mt-2 space-y-2 text-xs">
                      {columns.filter((c) => !frameworks.includes(c) && ![titleCol, 'UCF ID', 'Strictest SLA or timeline', 'Evidence retention'].includes(c)).map((c) => (
                        <p key={c} className="break-words"><span className={`font-semibold ${H}`}>{c}: </span><span className={TXT}>{r[colIdx[c]]}</span></p>
                      ))}
                      {miniGrid(r)}
                    </div>
                  )}
                </>
              )}
            </div>
          );
        })}
      </div>

      {/* Tablet and desktop: table */}
      <div id={id} className={`hidden sm:block overflow-auto border ${LINE} rounded`} style={{ maxHeight: '70vh' }} tabIndex={0} role="region" aria-label="Preview">
        <table className="w-full text-sm border-collapse" style={{ minWidth: compact ? undefined : shownCols.length * 150 }}>
          <thead className="sticky top-0 z-10 bg-gray-100 dark:bg-slate-800">
            <tr>
              {compact && <th scope="col" className={`w-6 border-b ${LINE}`}><span className="sr-only">Expand</span></th>}
              {shownCols.map((c) => (
                <th key={c} scope="col" aria-sort={sort.col === c ? (sort.dir === 1 ? 'ascending' : 'descending') : 'none'}
                  className={`text-left align-bottom ${compact ? 'px-1.5 py-2 text-xs' : 'p-2'} font-bold border-b ${LINE} ${H}`}
                  style={{ minWidth: compact ? (c === MAPPED ? 140 : Math.min(Math.max((widths[c] || 12) * 3.5, 56), 140)) : (widths[c] || 18) * 7 }}>
                  <div className="flex items-end justify-between gap-1">
                    <button type="button" className="text-left font-bold" onClick={() => toggleSort(c)}>
                      {c}{sort.col === c ? (sort.dir === 1 ? ' ▲' : ' ▼') : ''}
                    </button>
                    {filterButton(c)}
                  </div>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>{shown.map((r) => {
            const k = rowKey(r);
            const open = compact && expanded === k;
            return (
              <Fragment key={k}>
                <tr className={`border-t ${LINE} align-top ${compact ? 'cursor-pointer hover:bg-gray-50 dark:hover:bg-slate-800/50' : ''}`}
                  onClick={compact ? (e) => { if (!e.target.closest('button, a, input')) toggleRow(k); } : undefined}>
                  {compact && (
                    <td className="py-2 pl-1">
                      <button type="button" aria-expanded={open} aria-label={`${open ? 'Collapse' : 'Expand'} ${k}`} onClick={() => toggleRow(k)}
                        className={`w-5 h-5 inline-flex items-center justify-center ${MUTED}`}>{open ? '▾' : '▸'}</button>
                    </td>
                  )}
                  {shownCols.map((c, i) => <td key={c} className={`${compact ? 'px-1.5 py-2 text-[13px]' : 'p-2'} break-words`}>{renderCell(r, c, i)}</td>)}
                </tr>
                {open && (
                  <tr className="align-top"><td /><td colSpan={shownCols.length} className="p-2 pt-0">{miniGrid(r)}</td></tr>
                )}
              </Fragment>
            );
          })}</tbody>
        </table>
      </div>

      {pop && (
        <Popover anchor={pop.anchor} onClose={() => setPop(null)} label={`Filter ${popCol}`}>
          {popCol === MAPPED ? (
            <div className="space-y-2">
              <label className={`block text-xs font-semibold ${H}`}>Framework
                <select value={fwFilter.fw} onChange={(e) => setFwFilter((f) => ({ ...f, fw: e.target.value }))} className={`mt-1 w-full px-2 py-1 border ${LINE} rounded text-sm font-normal bg-white dark:bg-slate-900`}>
                  <option value="">Any framework</option>
                  {frameworks.map((f) => <option key={f} value={f}>{f}</option>)}
                </select>
              </label>
              <label className={`block text-xs font-semibold ${H}`}>Control ID contains
                <input autoFocus value={fwFilter.text} onChange={(e) => setFwFilter((f) => ({ ...f, text: e.target.value }))} placeholder="Filter Mapped controls" className={`mt-1 w-full px-2 py-1 border ${LINE} rounded text-sm font-normal bg-white dark:bg-slate-900`} />
              </label>
            </div>
          ) : (
            <div className="space-y-2">
              <input autoFocus value={filters[popCol]?.text || ''} onChange={(e) => setText(popCol, e.target.value)} placeholder={`Filter ${popCol}`} aria-label={`Filter ${popCol}`} className={`w-full px-2 py-1 border ${LINE} rounded text-sm bg-white dark:bg-slate-900`} />
              {distinct[popCol] && (
                <fieldset className="space-y-1">
                  <legend className="sr-only">{`Values in ${popCol}`}</legend>
                  {distinct[popCol].map((v) => (
                    <label key={v} className={`flex items-start gap-1.5 text-xs ${TXT}`}>
                      <input type="checkbox" className="mt-0.5" checked={!!filters[popCol]?.values?.includes(v)} onChange={() => toggleValue(popCol, v)} />
                      <span className="break-words">{v}</span>
                    </label>
                  ))}
                </fieldset>
              )}
            </div>
          )}
          <button type="button" className={`mt-2 ${LINK}`} onClick={() => clearCol(popCol)}>Clear</button>
        </Popover>
      )}

      {chipPop && (
        <Popover anchor={chipPop.anchor} onClose={() => setChipPop(null)} label={`${chipPop.fw} control IDs`}>
          <p className={`text-xs font-semibold ${H}`}>{chipPop.fw}</p>
          <p className={`mt-1 text-sm break-words ${TXT}`}>{chipPop.ids}</p>
          {chipPop.ids !== NOT_MAPPED && (
            <button type="button" className={`mt-2 ${BTN} text-xs py-1`} onClick={() => copyIds(chipPop.ids)}>{copied ? 'Copied' : 'Copy IDs'}</button>
          )}
        </Popover>
      )}
    </div>
  );
}
