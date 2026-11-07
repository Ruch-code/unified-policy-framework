import { timelineFor } from '../data/reportTimelines.js';

/** Collapsible "timeline to report issuance" for a framework page. Columns kept separate. */
export default function ReportTimeline({ framework }) {
  const t = timelineFor(framework.id, framework.name);
  if (!t) return null;
  return (
    <details id="report-timeline" className="mb-6 rounded-2xl border border-gray-200 dark:border-slate-700 bg-white dark:bg-slate-900">
      <summary className="cursor-pointer p-4 font-semibold text-gray-900 dark:text-white">Timeline to report issuance: {t.title}</summary>
      <div className="px-4 pb-4">
        <p className="text-sm text-gray-600 dark:text-slate-300 mb-3">{t.note} Timings are typical ranges, not fixed dates.</p>
        <ol className="sm:hidden space-y-3">
          {t.phases.map((p, i) => (
            <li key={p.phase} className="rounded-lg border border-gray-200 dark:border-slate-700 p-3 text-sm">
              <p className="font-semibold text-gray-900 dark:text-white">{i + 1}. {p.phase}</p>
              <p className="text-xs font-semibold text-sky-700 dark:text-sky-300 mt-0.5">{p.when}</p>
              <p className="text-gray-700 dark:text-slate-300 mt-1">{p.what}</p>
              <p className="text-xs text-gray-600 dark:text-slate-400 mt-1"><span className="font-semibold">Output:</span> {p.output}</p>
            </li>
          ))}
        </ol>
        <div className="hidden sm:block overflow-x-auto rounded-xl border border-gray-200 dark:border-slate-700">
          <table className="w-full text-sm">
            <thead className="bg-gray-50 dark:bg-slate-800"><tr>
              {['#', 'Phase', 'Typical timing', 'What happens', 'Output'].map((h) => <th key={h} scope="col" className="text-left p-2 text-gray-900 dark:text-white">{h}</th>)}
            </tr></thead>
            <tbody>{t.phases.map((p, i) => (
              <tr key={p.phase} className="border-t border-gray-200 dark:border-slate-700 align-top">
                <td className="p-2 text-gray-500 dark:text-slate-400">{i + 1}</td>
                <td className="p-2 font-semibold text-gray-900 dark:text-white">{p.phase}</td>
                <td className="p-2 text-sky-800 dark:text-sky-300 whitespace-nowrap">{p.when}</td>
                <td className="p-2 text-gray-700 dark:text-slate-300">{p.what}</td>
                <td className="p-2 text-gray-700 dark:text-slate-300">{p.output}</td>
              </tr>
            ))}</tbody>
          </table>
        </div>
      </div>
    </details>
  );
}
