import { useState } from 'react';
import { MATRIX, MATRIX_HEAD, PHASE_STEPS_HEAD, PHASE_STEPS, TEST_PLAN_HEAD, TEST_PLAN, EVAL_MODEL_HEAD, EVAL_MODEL, FAMILY_TESTS_HEAD, FAMILY_TESTS, FW_LIFECYCLE_HEAD, FW_LIFECYCLE, TIMELINE_NOTE } from '../data/policyFrameworkMatrix.js';

const REF = [
  ['Audit phase steps', PHASE_STEPS_HEAD, PHASE_STEPS],
  ['Core evaluation model', EVAL_MODEL_HEAD, EVAL_MODEL],
  ['Testing plan', TEST_PLAN_HEAD, TEST_PLAN],
  ['Control family tests by phase', FAMILY_TESTS_HEAD, FAMILY_TESTS],
  ['Framework lifecycle', FW_LIFECYCLE_HEAD, FW_LIFECYCLE],
];

function RefTable({ title, head, rows }) {
  return (
    <details className="rounded-lg border border-gray-200 dark:border-gray-700 p-3">
      <summary className="cursor-pointer font-semibold text-gray-900 dark:text-white">{title} ({rows.length})</summary>
      <div className="overflow-x-auto mt-2" tabIndex={0} role="region" aria-label={title}>
        <table className="w-full text-sm" style={{ minWidth: head.length > 4 ? 900 : 640 }}>
          <thead><tr>{head.map((h) => <th key={h} scope="col" className="p-2 text-left font-semibold text-gray-900 dark:text-white bg-gray-50 dark:bg-gray-900">{h}</th>)}</tr></thead>
          <tbody>{rows.map((r, i) => <tr key={i}>{r.map((c, j) => <td key={j} className={`p-2 align-top border-t border-gray-100 dark:border-gray-700 text-gray-700 dark:text-gray-300 ${j === 0 ? 'font-medium' : ''}`}>{c}</td>)}</tr>)}</tbody>
        </table>
      </div>
    </details>
  );
}
import { downloadXlsx } from '../utils/xlsxExport.js';

// Policy-by-policy audit lifecycle matrix: which frameworks each document supports, and what to do before, during and after the audit.
export default function PolicyFrameworkMatrix() {
  const [q, setQ] = useState('');
  const [open, setOpen] = useState(null);
  const rows = MATRIX.filter((r) => !q || r.join(' ').toLowerCase().includes(q.toLowerCase()));
  const dl = () => downloadXlsx([{ name: 'Policy matrix', title: 'Unified policy framework matrix', notes: ['Generic template. Adapt scope, owners and timelines to your organisation.'], headers: MATRIX_HEAD, rows: MATRIX }, ...REF.map(([t, h, r]) => ({ name: t.slice(0, 31), title: t, notes: [TIMELINE_NOTE], headers: h, rows: r }))], 'unified-policy-framework-matrix');
  return (
    <details className="rounded-2xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 p-5 my-6" id="policy-framework-matrix">
      <summary className="cursor-pointer text-lg font-bold text-gray-900 dark:text-white">Policy framework matrix: audit action plans per document</summary>
      <p className="mt-2 text-sm text-gray-700 dark:text-gray-300">For each core policy or document package: the frameworks it supports, the control area, what to do before the audit, during the observation or surveillance period, and after the audit, how to test it, the evidence package and a typical timeline. {MATRIX.length} documents.</p>
      <div className="flex flex-wrap gap-2 items-center mt-3">
        <input type="search" value={q} onChange={(e) => setQ(e.target.value)} placeholder="Search policy, framework or control area" aria-label="Search policy matrix" className="ui-input rounded border px-2 py-1.5 text-sm w-72" />
        <button type="button" onClick={dl} className="px-3 py-1.5 rounded bg-blue-600 text-white text-sm font-semibold">Download matrix (Excel)</button>
      </div>
      <h3 className="mt-4 font-semibold text-gray-900 dark:text-white">Audit lifecycle reference tables</h3>
      <p className="mt-1 text-sm text-gray-700 dark:text-gray-300">{TIMELINE_NOTE}</p>
      <div className="mt-2 space-y-2">{REF.map(([t, h, r]) => <RefTable key={t} title={t} head={h} rows={r} />)}</div>
      <h3 className="mt-4 font-semibold text-gray-900 dark:text-white">Policy and document matrix</h3>
      <div className="mt-3 space-y-2">
        {rows.map((r) => (
          <div key={r[0]} className="rounded-lg border border-gray-200 dark:border-gray-700">
            <button type="button" aria-expanded={open === r[0]} onClick={() => setOpen(open === r[0] ? null : r[0])} className="w-full text-left p-3 flex flex-wrap gap-2 items-center">
              <span className="font-semibold text-gray-900 dark:text-white">{r[0]}</span>
              <span className="text-[11px] px-2 py-0.5 rounded bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-200">{r[2]}</span>
            </button>
            {open === r[0] && (
              <div className="overflow-x-auto px-3 pb-3">
                <table className="w-full text-sm min-w-[560px]"><tbody>
                  {MATRIX_HEAD.slice(1).map((h, i) => (
                    <tr key={h} className="border-t border-gray-100 dark:border-gray-700">
                      <th scope="row" className="p-2 text-left align-top font-semibold text-gray-900 dark:text-white w-48">{h}</th>
                      <td className="p-2 align-top text-gray-700 dark:text-gray-300">{r[i + 1]}</td>
                    </tr>
                  ))}
                </tbody></table>
              </div>
            )}
          </div>
        ))}
      </div>
    </details>
  );
}
