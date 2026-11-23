import { useState } from 'react';
import { MATRIX, MATRIX_HEAD } from '../data/policyFrameworkMatrix.js';
import { downloadXlsx } from '../utils/xlsxExport.js';

// Policy-by-policy audit lifecycle matrix: which frameworks each document supports, and what to do before, during and after the audit.
export default function PolicyFrameworkMatrix() {
  const [q, setQ] = useState('');
  const [open, setOpen] = useState(null);
  const rows = MATRIX.filter((r) => !q || r.join(' ').toLowerCase().includes(q.toLowerCase()));
  const dl = () => downloadXlsx([{ name: 'Policy matrix', title: 'Unified policy framework matrix', notes: ['Generic template. Adapt scope, owners and timelines to your organisation.'], headers: MATRIX_HEAD, rows: MATRIX }], 'unified-policy-framework-matrix');
  return (
    <details className="rounded-2xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 p-5 my-6" id="policy-framework-matrix">
      <summary className="cursor-pointer text-lg font-bold text-gray-900 dark:text-white">Policy framework matrix: audit action plans per document</summary>
      <p className="mt-2 text-sm text-gray-700 dark:text-gray-300">For each core policy or document package: the frameworks it supports, the control area, what to do before the audit, during the observation or surveillance period, and after the audit, how to test it, the evidence package and a typical timeline. {MATRIX.length} documents.</p>
      <div className="flex flex-wrap gap-2 items-center mt-3">
        <input type="search" value={q} onChange={(e) => setQ(e.target.value)} placeholder="Search policy, framework or control area" aria-label="Search policy matrix" className="ui-input rounded border px-2 py-1.5 text-sm w-72" />
        <button type="button" onClick={dl} className="px-3 py-1.5 rounded bg-blue-600 text-white text-sm font-semibold">Download matrix (Excel)</button>
      </div>
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
