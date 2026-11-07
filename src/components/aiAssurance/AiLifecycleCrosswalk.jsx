import { useState } from 'react';
import { LC_INTRO, LC_STAGES, LC_SHARED } from '../../data/aiLifecycleCrosswalk.js';

const LINE = 'border-gray-200 dark:border-slate-700';
const TXT = 'text-gray-700 dark:text-slate-300';
const H = 'text-gray-900 dark:text-white';

export default function AiLifecycleCrosswalk() {
  const [stage, setStage] = useState(0);
  const s = LC_STAGES[stage];
  return (
    <section id="ai-lifecycle-crosswalk" className={`my-8 rounded-2xl border ${LINE} bg-white dark:bg-slate-900 p-5 scroll-mt-24`}>
      <h2 className={`text-xl font-bold mb-2 ${H}`}>AI Governance Across the Lifecycle</h2>
      <p className={`text-sm mb-4 max-w-3xl ${TXT}`}>{LC_INTRO}</p>
      <div className="flex flex-wrap gap-2 mb-3" role="tablist" aria-label="Lifecycle stage">
        {LC_STAGES.map((x, i) => (
          <button key={x.stage} type="button" role="tab" aria-selected={stage === i} onClick={() => setStage(i)}
            className={`px-3 py-1.5 rounded-full text-xs font-semibold border focus:outline-none focus-visible:ring-2 focus-visible:ring-violet-500 ${stage === i ? 'bg-violet-700 text-white border-violet-700' : `bg-white dark:bg-slate-800 ${TXT} ${LINE}`}`}>
            {i + 1}. {x.stage}
          </button>
        ))}
      </div>
      <div className={`overflow-x-auto rounded-xl border ${LINE}`} role="tabpanel" tabIndex={0}>
        <table className="w-full text-sm min-w-[900px]">
          <thead className="bg-gray-50 dark:bg-slate-800"><tr>
            {['Area', 'What good looks like', 'ISO/IEC 42001', 'NIST AI RMF', 'EU AI Act'].map((h) => <th key={h} scope="col" className={`text-left p-2 font-semibold ${H}`}>{h}</th>)}
          </tr></thead>
          <tbody>{s.rows.map((r) => (
            <tr key={r[0]} className={`border-t ${LINE} align-top`}>
              <td className={`p-2 font-semibold ${H}`}>{r[0]}</td>
              <td className={`p-2 ${TXT}`}>{r[1]}</td>
              <td className={`p-2 font-mono text-xs ${TXT}`}>{r[2]}</td>
              <td className={`p-2 font-mono text-xs ${TXT}`}>{r[3]}</td>
              <td className={`p-2 font-mono text-xs ${TXT}`}>{r[4]}</td>
            </tr>
          ))}</tbody>
        </table>
      </div>

      <h3 className={`text-lg font-semibold mt-6 mb-2 ${H}`}>Do it once, use it everywhere</h3>
      <div className={`overflow-x-auto rounded-xl border ${LINE}`}>
        <table className="w-full text-sm min-w-[640px]">
          <thead className="bg-gray-50 dark:bg-slate-800"><tr>
            {['Activity', 'Where it comes up', 'Single approach'].map((h) => <th key={h} scope="col" className={`text-left p-2 font-semibold ${H}`}>{h}</th>)}
          </tr></thead>
          <tbody>{LC_SHARED.map((r) => (
            <tr key={r[0]} className={`border-t ${LINE} align-top`}>
              <td className={`p-2 font-semibold ${H}`}>{r[0]}</td>
              <td className={`p-2 ${TXT}`}>{r[1]}</td>
              <td className={`p-2 ${TXT}`}>{r[2]}</td>
            </tr>
          ))}</tbody>
        </table>
      </div>
      <p className="mt-3 text-xs text-gray-500 dark:text-slate-400">Article and function references are a guide to where each activity sits. Check the current text of each source before relying on a reference.</p>
    </section>
  );
}
