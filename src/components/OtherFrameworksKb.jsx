import { Link } from 'react-router-dom';
import { OF_INTRO, OTHER_FRAMEWORKS, TOOLS_INTRO, GRC_TOOLS } from '../data/otherFrameworksTools.js';

const LINE = 'border-gray-200 dark:border-slate-700';
const TXT = 'text-gray-700 dark:text-slate-300';
const H = 'text-gray-900 dark:text-white';

function Rows({ label, headers, rows, render, min = 1000 }) {
  return (
    <div className={`overflow-x-auto rounded border ${LINE}`} tabIndex={0} role="region" aria-label={label}>
      <table className="w-full text-sm" style={{ minWidth: min }}>
        <thead className="bg-gray-50 dark:bg-slate-800"><tr>{headers.map((h) => <th key={h} scope="col" className={`text-left p-2 font-semibold ${H}`}>{h}</th>)}</tr></thead>
        <tbody>{rows.map((r) => <tr key={r[0]} className={`border-t ${LINE} align-top`}>{r.map((c, j) => <td key={j} className={`p-2 ${j === 0 ? `font-semibold ${H}` : TXT}`}>{render ? render(c, j) : c}</td>)}</tr>)}</tbody>
      </table>
    </div>
  );
}

export function OtherFrameworksKb() {
  return (
    <div id="other-frameworks" className="bg-white border border-gray-200 rounded p-5 dark:bg-[#1e293b] dark:border-[#334155] space-y-4">
      <h2 className={`text-xl font-bold ${H}`}>Other Frameworks</h2>
      <p className={`text-sm max-w-3xl ${TXT}`}>{OF_INTRO}</p>
      <Rows label="Other frameworks" headers={['Framework', 'What it is', 'Who it applies to', 'Key requirements', 'How it relates to this site', 'Open']} rows={OTHER_FRAMEWORKS}
        render={(c, j) => (j === 5 ? <Link to={c} className="underline text-blue-700 dark:text-blue-300">{c}</Link> : c)} min={1200} />
      <p className="text-xs text-gray-500 dark:text-slate-400">Summaries are paraphrased for orientation. Check the official text and current application dates before relying on them.</p>
    </div>
  );
}

export function GrcToolingKb() {
  return (
    <div id="grc-tooling" className="bg-white border border-gray-200 rounded p-5 dark:bg-[#1e293b] dark:border-[#334155] space-y-4">
      <h2 className={`text-xl font-bold ${H}`}>GRC Tooling</h2>
      <p className={`text-sm max-w-3xl ${TXT}`}>{TOOLS_INTRO}</p>
      <Rows label="GRC tools" headers={['Tool', 'Category', 'Typical GRC use', 'Evidence it can produce', 'Watch-outs']} rows={GRC_TOOLS} />
    </div>
  );
}
