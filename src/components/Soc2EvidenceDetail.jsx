import { useState } from 'react';
import PreviewGrid from './PreviewGrid.jsx';
import { SOC2_EVIDENCE, SOC2_EVIDENCE_COLUMNS } from '../data/soc2Evidence.js';
import { buildStyledXlsx, toCsv } from '../utils/styledXlsx.js';

const H = 'text-gray-900 dark:text-white';
const TXT = 'text-gray-700 dark:text-slate-300';
const LINE = 'border-gray-200 dark:border-slate-700';
const BTN = `px-3 py-1.5 border ${LINE} rounded text-sm ${H} bg-white dark:bg-slate-900`;
const WIDTHS = { Ref: 8, 'SOC 2 criteria': 16, 'UCF ID': 9, 'Control description': 44, 'Specific evidence to provide': 52, 'What the evidence must show': 34, 'Population or sample': 22, 'Control frequency': 12, 'Test method': 14, 'What the sample report showed': 34 };

const save = (blob, name) => { const a = document.createElement('a'); a.href = URL.createObjectURL(blob); a.download = name; a.click(); setTimeout(() => URL.revokeObjectURL(a.href), 1000); };

export default function Soc2EvidenceDetail() {
  const [busy, setBusy] = useState(false);
  const exportXlsx = async () => {
    setBusy(true);
    try {
      save(await buildStyledXlsx([{ name: 'SOC 2 evidence', columns: SOC2_EVIDENCE_COLUMNS, rows: SOC2_EVIDENCE, widths: SOC2_EVIDENCE_COLUMNS.map((c) => WIDTHS[c] || 14) }]), 'SOC2_Evidence_Detail.xlsx');
    } finally { setBusy(false); }
  };
  return (
    <section id="soc2-evidence-detail" className="max-w-[1400px] mx-auto px-4 my-10 scroll-mt-24">
      <div className="flex flex-wrap items-end justify-between gap-3 mb-3">
        <div className="max-w-4xl">
          <h2 className={`text-2xl font-serif font-bold ${H}`}>SOC 2 evidence, control by control</h2>
          <p className={`mt-1 text-sm ${TXT}`}>
            The {SOC2_EVIDENCE.length} Security (CC1 to CC9) controls as an auditor tests them, from an anonymised SOC 2 Type II report.
            Each row names the specific artefact to hand over (for example, quarterly host vulnerability scan exports with remediation tickets), what it must show, and whether the auditor samples it.
            The UCF ID links each row to the <a className="underline" href="/unified-framework">Unified Control Framework</a> so the same evidence can be reused for other frameworks.
          </p>
        </div>
        <div className="flex gap-2">
          <button type="button" className={BTN} onClick={exportXlsx} disabled={busy}>{busy ? 'Preparing...' : 'Export Excel (.xlsx)'}</button>
          <button type="button" className={BTN} onClick={() => save(new Blob([`﻿${toCsv(SOC2_EVIDENCE_COLUMNS, SOC2_EVIDENCE)}`], { type: 'text/csv;charset=utf-8' }), 'SOC2_Evidence_Detail.csv')}>Export CSV</button>
        </div>
      </div>
      <PreviewGrid id="soc2-evidence-grid" columns={SOC2_EVIDENCE_COLUMNS} rows={SOC2_EVIDENCE} widths={WIDTHS} />
    </section>
  );
}
