import * as R from '../data/aiRiskRegister.js';

const H = 'text-gray-900 dark:text-white';
const TXT = 'text-gray-700 dark:text-slate-300';
const LINE = 'border-gray-200 dark:border-slate-700';
const TONE = {
  Critical: 'bg-rose-100 text-rose-900 dark:bg-rose-900/40 dark:text-rose-100',
  High: 'bg-orange-100 text-orange-900 dark:bg-orange-900/40 dark:text-orange-100',
  Medium: 'bg-amber-100 text-amber-900 dark:bg-amber-900/40 dark:text-amber-100',
  Low: 'bg-green-100 text-green-900 dark:bg-green-900/40 dark:text-green-100',
};
const Rating = ({ v }) => <span className={`inline-block px-2 py-0.5 rounded text-xs font-semibold ${TONE[v] || ''}`}>{v}</span>;

export default function AiRiskRegister() {
  return (
    <section id="ai-risk-register" className={`mt-12 border-t pt-8 ${LINE}`}>
      <h2 className={`text-2xl font-bold ${H}`}>AI Risk Register</h2>
      <p className={`mt-2 max-w-3xl text-sm ${TXT}`}>{R.ARR_INTRO}</p>
      <p className={`mt-2 text-xs font-semibold uppercase tracking-wide text-gray-500 dark:text-slate-400`}>{R.ARR_LIFECYCLE.join('  /  ')}</p>

      <div className={`mt-5 overflow-x-auto rounded border ${LINE}`} tabIndex={0} role="region" aria-label="AI risk register">
        <table className="w-full text-sm" style={{ minWidth: 1250 }}>
          <thead className="bg-gray-50 dark:bg-slate-800">
            <tr>{['Risk ID', 'AI risk', 'What can go wrong', 'Key controls', 'Owner', 'Inherent', 'Residual', 'Response'].map((h) => <th key={h} scope="col" className={`text-left p-2.5 font-semibold ${H}`}>{h}</th>)}</tr>
          </thead>
          <tbody>
            {R.ARR_RISKS.map((r) => (
              <tr key={r[0]} className={`border-t ${LINE} align-top`}>
                <td className={`p-2.5 font-mono text-xs ${H}`}>{r[0]}</td>
                <td className={`p-2.5 font-semibold ${H}`}>{r[1]}</td>
                <td className={`p-2.5 ${TXT}`}>{r[2]}</td>
                <td className={`p-2.5 ${TXT}`}>{r[3]}</td>
                <td className={`p-2.5 ${TXT}`}>{r[4]}</td>
                <td className="p-2.5"><Rating v={r[5]} /></td>
                <td className="p-2.5"><Rating v={r[6]} /></td>
                <td className={`p-2.5 ${TXT}`}>{r[7]}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <p className="mt-2 text-xs text-gray-500 dark:text-slate-400">{R.ARR_NOTE}</p>

      <h3 className={`mt-8 text-lg font-semibold ${H}`}>Risk rating matrix</h3>
      <div className={`mt-2 overflow-x-auto rounded border ${LINE}`} tabIndex={0} role="region" aria-label="Risk rating matrix">
        <table className="w-full text-sm text-center" style={{ minWidth: 640 }}>
          <thead className="bg-gray-50 dark:bg-slate-800">
            <tr><th scope="col" className={`p-2 text-left font-semibold ${H}`}>Impact \ Likelihood</th>{R.ARR_LIKELIHOOD.map((l) => <th key={l} scope="col" className={`p-2 font-semibold ${H}`}>{l}</th>)}</tr>
          </thead>
          <tbody>
            {R.ARR_MATRIX.map(([impact, cells]) => (
              <tr key={impact} className={`border-t ${LINE}`}>
                <th scope="row" className={`p-2 text-left font-semibold ${H}`}>{impact}</th>
                {cells.map((c, i) => <td key={i} className="p-2"><Rating v={c} /></td>)}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <h3 className={`mt-8 text-lg font-semibold ${H}`}>Register workflow</h3>
      <div className={`mt-2 overflow-x-auto rounded border ${LINE}`} tabIndex={0} role="region" aria-label="Register workflow">
        <table className="w-full text-sm" style={{ minWidth: 560 }}>
          <thead className="bg-gray-50 dark:bg-slate-800"><tr><th scope="col" className={`p-2.5 text-left font-semibold ${H}`}>Step</th><th scope="col" className={`p-2.5 text-left font-semibold ${H}`}>What happens</th></tr></thead>
          <tbody>{R.ARR_WORKFLOW.map(([s, d], i) => <tr key={s} className={`border-t ${LINE} align-top`}><td className={`p-2.5 font-semibold ${H}`}>{i + 1}. {s}</td><td className={`p-2.5 ${TXT}`}>{d}</td></tr>)}</tbody>
        </table>
      </div>

      <div className="mt-8 grid gap-8 md:grid-cols-2">
        <div>
          <h3 className={`text-lg font-semibold ${H}`}>Fields every entry should record</h3>
          <ul className={`mt-2 list-disc pl-5 space-y-1 text-sm ${TXT}`}>{R.ARR_FIELDS.map((f) => <li key={f}>{f}</li>)}</ul>
        </div>
        <div>
          <h3 className={`text-lg font-semibold ${H}`}>Assurance questions</h3>
          <ul className={`mt-2 list-disc pl-5 space-y-1 text-sm ${TXT}`}>{R.ARR_ASSURANCE.map((q) => <li key={q}>{q}</li>)}</ul>
        </div>
      </div>
    </section>
  );
}
