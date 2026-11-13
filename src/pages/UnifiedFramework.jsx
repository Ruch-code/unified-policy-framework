import { useState } from 'react';
import { UCF_COLUMNS, UCF_CONTROLS, UCF_FRAMEWORKS, UCF_SLA_COLUMNS, UCF_SLAS, UCF_VERIFIED } from '../data/unifiedControls.js';
import UcfGrid from '../components/UcfGrid.jsx';
import { buildStyledXlsx, toCsv } from '../utils/styledXlsx.js';

const H = 'text-gray-900 dark:text-white';
const TXT = 'text-gray-700 dark:text-slate-300';
const LINE = 'border-gray-200 dark:border-slate-700';
const BTN = `px-3 py-1.5 border ${LINE} rounded text-sm ${H} bg-white dark:bg-slate-900`;

const covered = (r) => UCF_FRAMEWORKS.filter((f) => r[f] !== 'Not mapped').length;
const MAP_COLUMNS = [...UCF_COLUMNS.slice(0, 8), 'Frameworks covered', ...UCF_COLUMNS.slice(8)];
const MAP_ROWS = UCF_CONTROLS.map((r) => MAP_COLUMNS.map((k) => (k === 'Frameworks covered' ? `${covered(r)} of ${UCF_FRAMEWORKS.length}` : r[k])));
const SLA_ROWS = UCF_SLAS;
// The framework picker strip is switched off; all frameworks are shown and exported. Set to true to restore it.
const SHOW_FRAMEWORK_PICKER = false;
const WIDTH = {  'UCF ID': 10, Domain: 18, Control: 28, 'Control activity': 44, 'Reusable evidence': 40, 'Strictest SLA or timeline': 40, 'Frameworks covered': 12 };

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
        { name: 'Framework SLAs', columns: UCF_SLA_COLUMNS, rows: SLA_ROWS, widths: [16, 34, 46, 22, 46] },
        { name: 'About', columns: ['Item', 'Detail'], rows: [['Last verified', UCF_VERIFIED], ['Source', 'OneLens by Ruchi, Unified Control Framework'], ['Note', 'Mappings are indicative. Confirm against the official text and your audit scope before reusing evidence.']], widths: [18, 90] },
      ]);
      save(blob, 'Unified_Control_Framework.xlsx');
    } finally { setBusy(false); }
  };
  const exportCsv = () => {
    const [cols, rows, name] = { map: [mapCols, mapRows, 'Unified_Control_Framework.csv'], sla: [UCF_SLA_COLUMNS, SLA_ROWS, 'Framework_SLAs.csv'] }[tab];
    save(new Blob([`﻿${toCsv(cols, rows)}`], { type: 'text/csv;charset=utf-8' }), name);
  };

  return (
    <div className="max-w-[1400px] mx-auto px-4 py-8 space-y-5">
      <header>
        <h1 className={`text-3xl font-serif font-bold ${H}`}>Unified Control Framework</h1>
        <p className={`mt-1 text-sm ${TXT} max-w-3xl`}>
          One control, one set of evidence, mapped across {UCF_FRAMEWORKS.join(', ')}. Collect the evidence once and reuse it for every framework in the row. SOC 2 evidence detail lives on the SOC 2 page.
          Use the funnel in a column header to filter, click a header to sort, and switch between the compact and detailed views. Exports always contain every framework column.
        </p>
        <p className="mt-1 text-[11px] text-gray-500 dark:text-slate-400">Last verified: {UCF_VERIFIED}. Mappings are indicative; check the official text and your audit scope before reusing evidence.</p>
      </header>

      <div className="flex flex-wrap items-center justify-between gap-3">
        <div role="tablist" className="flex gap-2">
          {[['map', `Control mapping (${MAP_ROWS.length})`], ['sla', `Framework SLAs and timelines (${SLA_ROWS.length})`]].map(([k, l]) => (
            <button key={k} role="tab" aria-selected={tab === k} type="button" onClick={() => setTab(k)} className={`${BTN} ${tab === k ? 'font-bold border-gray-900 dark:border-white' : ''}`}>{l}</button>
          ))}
        </div>
        <div className="flex gap-2">
          <button type="button" className={BTN} onClick={exportXlsx} disabled={busy}>{busy ? 'Preparing...' : 'Export Excel (.xlsx)'}</button>
          <button type="button" className={BTN} onClick={exportCsv}>Export CSV</button>
        </div>
      </div>

      {SHOW_FRAMEWORK_PICKER && tab === 'map' && (
        <fieldset className={`border ${LINE} rounded p-3`}>
          <legend className={`px-1 text-xs font-semibold ${H}`}>Frameworks shown (applies to preview and export)</legend>
          <div className="flex flex-wrap gap-x-4 gap-y-1 text-sm">
            {UCF_FRAMEWORKS.map((f) => (
              <label key={f} className={`flex items-center gap-1.5 ${TXT}`}><input type="checkbox" checked={!hidden.has(f)} onChange={() => toggleFw(f)} />{f}</label>
            ))}
          </div>
        </fieldset>
      )}

      {tab === 'map' && <UcfGrid key="map" id="ucf-map" columns={MAP_COLUMNS} rows={MAP_ROWS} widths={WIDTH} frameworks={UCF_FRAMEWORKS} />}
      {tab === 'sla' && <UcfGrid key="sla" id="ucf-sla" columns={UCF_SLA_COLUMNS} rows={SLA_ROWS} widths={WIDTH} />}

      <p className="text-xs text-gray-500 dark:text-slate-400">
        Excel export has three sheets (Control mapping, Framework SLAs, About), each with a bold frozen header row and filters switched on.
        Exports always include every framework column and every row.
      </p>
    </div>
  );
}
