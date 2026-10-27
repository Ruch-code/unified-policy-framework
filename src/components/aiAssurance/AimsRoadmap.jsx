import { useState } from 'react';
import { Download, Route } from 'lucide-react';
import { AIMS_ROADMAP } from '../../data/aiAssurance';
import { downloadXlsx } from '../../utils/xlsxExport.js';

const PHASES = ['Plan', 'Do', 'Check', 'Act'];

export function downloadRoadmap() {
  downloadXlsx([{
    name: 'AIMS Roadmap', title: 'ISO/IEC 42001 AIMS Implementation Roadmap: Example Co.',
    notes: ['Indicative 24-week plan for a small to mid-size organisation. Adjust weeks to your scope. Status values: Not started, In progress, Done.'],
    headers: ['Phase', 'Weeks', 'Clause', 'Activity', 'Owner (role)', 'Output', 'Evidence', 'Status', 'Due date', 'Notes'],
    rows: AIMS_ROADMAP.map((r) => [r.phase, r.weeks, r.clause, r.activity, r.owner, r.output, r.evidence, '', '', '']),
    validations: [{ col: 7, values: ['Not started', 'In progress', 'Done'] }],
  }], 'iso42001-aims-roadmap');
}

export default function AimsRoadmap({ className = '' }) {
  const [phase, setPhase] = useState('all');
  const rows = AIMS_ROADMAP.filter((r) => phase === 'all' || r.phase === phase);
  return (
    <section id="aims-roadmap" className={`scroll-mt-24 rounded-2xl border border-surface-300 dark:border-surface-dark-300 bg-white dark:bg-slate-900/60 p-5 md:p-8 mb-10 ${className}`}>
      <div className="flex flex-col md:flex-row md:items-start gap-4 mb-5">
        <div className="flex-1">
          <h2 className="grc-section-title mb-2"><Route className="w-6 h-6 text-violet-600" /> Implementing AIMS governance: ISO 42001 roadmap</h2>
          <p className="text-sm text-gray-600 dark:text-text-dark-secondary max-w-3xl">Clause-by-clause rollout from context to certification, with an owner role, output and audit evidence for each step. Indicative 24 weeks.</p>
        </div>
        <button type="button" onClick={downloadRoadmap} className="inline-flex items-center gap-2 shrink-0 px-4 py-2.5 rounded-lg bg-violet-600 text-white text-sm font-bold hover:bg-violet-700">
          <Download className="w-4 h-4" /> Roadmap (.xlsx)
        </button>
      </div>
      <div className="flex flex-wrap gap-2 mb-3">
        {['all', ...PHASES].map((p) => (
          <button key={p} type="button" onClick={() => setPhase(p)} className={`px-3 py-1.5 rounded-lg text-xs font-semibold border ${phase === p ? 'bg-violet-600 text-white border-violet-600' : 'border-surface-300 dark:border-surface-dark-300 text-gray-700 dark:text-text-dark-secondary'}`}>
            {p === 'all' ? 'All phases' : p}
          </button>
        ))}
      </div>
      <ol className="space-y-2">
        {rows.map((r) => (
          <li key={`${r.clause}-${r.activity}`} className="rounded-xl border border-surface-200 dark:border-surface-dark-200 p-3 grid gap-2 md:grid-cols-[7rem_1fr_14rem] text-xs">
            <div>
              <span className="inline-block px-2 py-0.5 rounded-md bg-violet-100 dark:bg-violet-900/40 text-violet-800 dark:text-violet-200 font-bold">{r.phase}</span>
              <p className="mt-1 text-gray-500 dark:text-text-dark-muted">Weeks {r.weeks}</p>
              <p className="font-mono text-gray-700 dark:text-text-dark-secondary">{r.clause}</p>
            </div>
            <div>
              <p className="text-sm text-gray-900 dark:text-text-dark-primary">{r.activity}</p>
              <p className="mt-1 text-gray-600 dark:text-text-dark-secondary"><strong>Output:</strong> {r.output}</p>
            </div>
            <div className="text-gray-600 dark:text-text-dark-secondary">
              <p><strong>Owner:</strong> {r.owner}</p>
              <p><strong>Evidence:</strong> {r.evidence}</p>
            </div>
          </li>
        ))}
      </ol>
    </section>
  );
}
