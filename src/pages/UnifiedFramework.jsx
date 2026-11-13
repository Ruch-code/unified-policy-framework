import { useMemo, useState } from 'react';
import { UCF_COLUMNS, UCF_CONTROLS, UCF_FRAMEWORKS, UCF_SLA_COLUMNS, UCF_SLAS, UCF_VERIFIED } from '../data/unifiedControls.js';
import { SOC2_EVIDENCE, SOC2_EVIDENCE_COLUMNS } from '../data/soc2Evidence.js';
import { buildStyledXlsx, toCsv } from '../utils/styledXlsx.js';

const H = 'text-gray-900 dark:text-white';
const TXT = 'text-gray-700 dark:text-slate-300';
const LINE = 'border-gray-200 dark:border-slate-700';
const BTN = `px-3 py-1.5 border ${LINE} rounded text-sm ${H} bg-white dark:bg-slate-900`;

const covered = (r) => UCF_FRAMEWORKS.filter((f) => r[f] !== 'Not mapped').length;
const MAP_COLUMNS = [...UCF_COLUMNS.slice(0, 8), 'Frameworks covered', ...UCF_COLUMNS.slice(8)];
const MAP_ROWS = UCF_CONTROLS.map((r) => MAP_COLUMNS.map((k) => (k === 'Frameworks covered' ? `${covered(r)} of ${UCF_FRAMEWORKS.length}` : r[k])));
const SLA_ROWS = UCF_SLAS;
const WIDTH = { 'SOC 2 criteria': 16, 'Control description': 48, 'Evidence the auditor inspects': 44, 'Population or sample': 24, 'What the sample report showed': 36,  'UCF ID': 10, Domain: 18, Control: 28, 'Control activity': 44, 'Reusable evidence': 40, 'Strictest SLA or timeline': 40, 'Frameworks covered': 12 };

function Grid({ id, columns, rows, hidden }) {
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
              <th key={c} scope="col" aria-sort={sort.col === i ? (sort.dir === 1 ? 'ascending' : 'descending') : 'none'} className={`text-left align-bottom p-2 font-bold border-b ${LINE} ${H}`} style={{ minWidth: (WIDTH[c] || 18) * 7 }}>
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

export default function UnifiedFramework() {
  const [tab, setTab] = useState('map');
  const [hidden, setHidden] = useState(new Set());
  const [busy, setBusy] = useState(false);

  const toggleFw = (f) => setHidden((s) => { const n = new Set(s); n.has(f) ? n.delete(f) : n.add(f); return n; });
  const mapCols = MAP_COLUMNS.filter((c) => !hidden.has(c));
  const mapRows = MAP_ROWS.map((r) => MAP_COLUMNS.map((c, i) => [c, r[i]]).filter(([c]) => !hidden.has(c)).map(([, v]) => v));

  const save = (blob, name) => { const a = document.createElement('a'); a.href = URL.createObjectURL(blob); a.download = name; a.click(); setTimeout(() => URL.revokeObjectURL(a.href), 1000); };
  const exportXlsx = async () => {
    setBusy(true);
    try {
      const blob = await buildStyledXlsx([
        { name: 'Control mapping', columns: mapCols, rows: mapRows, widths: mapCols.map((c) => WIDTH[c] || 18) },
        { name: 'SOC 2 evidence', columns: SOC2_EVIDENCE_COLUMNS, rows: SOC2_EVIDENCE, widths: SOC2_EVIDENCE_COLUMNS.map((c) => WIDTH[c] || 14) },
        { name: 'Framework SLAs', columns: UCF_SLA_COLUMNS, rows: SLA_ROWS, widths: [16, 34, 46, 22, 46] },
        { name: 'About', columns: ['Item', 'Detail'], rows: [['Last verified', UCF_VERIFIED], ['Source', 'OneLens by Ruchi, Unified Control Framework'], ['Note', 'Mappings are indicative. Confirm against the official text and your audit scope before reusing evidence.']], widths: [18, 90] },
      ]);
      save(blob, 'Unified_Control_Framework.xlsx');
    } finally { setBusy(false); }
  };
  const exportCsv = () => {
    const [cols, rows, name] = { map: [mapCols, mapRows, 'Unified_Control_Framework.csv'], soc2: [SOC2_EVIDENCE_COLUMNS, SOC2_EVIDENCE, 'SOC2_Evidence.csv'], sla: [UCF_SLA_COLUMNS, SLA_ROWS, 'Framework_SLAs.csv'] }[tab];
    save(new Blob([`﻿${toCsv(cols, rows)}`], { type: 'text/csv;charset=utf-8' }), name);
  };

  return (
    <div className="max-w-[1400px] mx-auto px-4 py-8 space-y-5">
      <header>
        <h1 className={`text-3xl font-serif font-bold ${H}`}>Unified Control Framework</h1>
        <p className={`mt-1 text-sm ${TXT} max-w-3xl`}>
          One control, one set of evidence, mapped across {UCF_FRAMEWORKS.join(', ')}. Collect the evidence once and reuse it for every framework in the row.
          The table below is a live preview of the export: the header is frozen and bold, every column can be filtered and sorted.
        </p>
        <p className="mt-1 text-[11px] text-gray-500 dark:text-slate-400">Last verified: {UCF_VERIFIED}. Mappings are indicative; check the official text and your audit scope before reusing evidence.</p>
      </header>

      <div className="flex flex-wrap items-center justify-between gap-3">
        <div role="tablist" className="flex gap-2">
          {[['map', `Control mapping (${MAP_ROWS.length})`], ['soc2', `SOC 2 evidence (${SOC2_EVIDENCE.length})`], ['sla', `Framework SLAs and timelines (${SLA_ROWS.length})`]].map(([k, l]) => (
            <button key={k} role="tab" aria-selected={tab === k} type="button" onClick={() => setTab(k)} className={`${BTN} ${tab === k ? 'font-bold border-gray-900 dark:border-white' : ''}`}>{l}</button>
          ))}
        </div>
        <div className="flex gap-2">
          <button type="button" className={BTN} onClick={exportXlsx} disabled={busy}>{busy ? 'Preparing...' : 'Export Excel (.xlsx)'}</button>
          <button type="button" className={BTN} onClick={exportCsv}>Export CSV</button>
        </div>
      </div>

      {tab === 'map' && (
        <fieldset className={`border ${LINE} rounded p-3`}>
          <legend className={`px-1 text-xs font-semibold ${H}`}>Frameworks shown (applies to preview and export)</legend>
          <div className="flex flex-wrap gap-x-4 gap-y-1 text-sm">
            {UCF_FRAMEWORKS.map((f) => (
              <label key={f} className={`flex items-center gap-1.5 ${TXT}`}><input type="checkbox" checked={!hidden.has(f)} onChange={() => toggleFw(f)} />{f}</label>
            ))}
          </div>
        </fieldset>
      )}

      {tab === 'soc2' && (
        <p className={`text-sm ${TXT} max-w-4xl`}>
          SOC 2 Security (Common Criteria CC1 to CC9) at the level an auditor tests it: each control, the exact evidence inspected, whether it is sampled, and how often it runs.
          Built from an anonymised SOC 2 Type II report (3-month window, cloud-hosted SaaS, hosting provider carved out). Where one control covers several criteria, one piece of evidence answers all of them.
          The UCF ID links each row back to the Control mapping tab.
        </p>
      )}
      {tab === 'map' && <Grid key="map" id="ucf-map" columns={MAP_COLUMNS} rows={MAP_ROWS} hidden={hidden} />}
      {tab === 'soc2' && <Grid key="soc2" id="ucf-soc2" columns={SOC2_EVIDENCE_COLUMNS} rows={SOC2_EVIDENCE} />}
      {tab === 'sla' && <Grid key="sla" id="ucf-sla" columns={UCF_SLA_COLUMNS} rows={SLA_ROWS} />}

      <p className="text-xs text-gray-500 dark:text-slate-400">
        Excel export has four sheets (Control mapping, SOC 2 evidence, Framework SLAs, About), each with a bold frozen header row and filters switched on.
        Framework columns you untick are left out of the export.
      </p>
    </div>
  );
}
