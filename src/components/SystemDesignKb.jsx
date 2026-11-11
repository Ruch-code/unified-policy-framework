import { useMemo, useState } from 'react';
import { SD_INTRO, SD_CATEGORIES, SD_ROWS, SD_QUESTIONS } from '../data/systemDesignGrc.js';

const LINE = 'border-gray-200 dark:border-slate-700';
const TXT = 'text-gray-700 dark:text-slate-300';
const H = 'text-gray-900 dark:text-white';

export default function SystemDesignKb() {
  const [cat, setCat] = useState('All');
  const [q, setQ] = useState('');
  const rows = useMemo(() => {
    const n = q.trim().toLowerCase();
    return SD_ROWS.filter((r) => (cat === 'All' || r[0] === cat) && (!n || r.join(' ').toLowerCase().includes(n)));
  }, [cat, q]);
  const questions = SD_QUESTIONS.filter(([c]) => cat === 'All' || c === cat);

  return (
    <div id="system-design" className="bg-white border border-gray-200 rounded-2xl p-5 dark:bg-[#1e293b] dark:border-[#334155] space-y-6">
      <div>
        <h2 className={`text-xl font-bold mb-2 ${H}`}>System Design for GRC</h2>
        <p className={`text-sm max-w-3xl ${TXT}`}>{SD_INTRO}</p>
      </div>

      <div className="flex flex-wrap gap-2" role="group" aria-label="Filter by category">
        {['All', ...SD_CATEGORIES].map((c) => (
          <button key={c} type="button" aria-pressed={cat === c} onClick={() => setCat(c)}
            className={`px-3 py-1.5 rounded-full text-xs font-semibold border focus:outline-none focus-visible:ring-2 focus-visible:ring-sky-500 ${cat === c ? 'bg-sky-700 text-white border-sky-700' : `bg-white dark:bg-slate-800 ${TXT} ${LINE}`}`}>
            {c} ({c === 'All' ? SD_ROWS.length : SD_ROWS.filter((r) => r[0] === c).length})
          </button>
        ))}
      </div>
      <div className="flex flex-wrap items-center gap-3">
        <input aria-label="Search system design concepts" placeholder="Search: caching, idempotency, canary..." value={q} onChange={(e) => setQ(e.target.value)}
          className={`flex-1 min-w-[12rem] rounded-lg border ${LINE} bg-white dark:bg-slate-900 px-3 py-2 text-sm ${H} focus:outline-none focus-visible:ring-2 focus-visible:ring-sky-500`} />
        <span className={`text-xs font-semibold ${TXT}`} aria-live="polite">{rows.length} concepts</span>
      </div>

      <div className={`overflow-x-auto rounded-xl border ${LINE}`} tabIndex={0} role="region" aria-label="System design concepts">
        <table className="w-full text-sm min-w-[1100px]">
          <thead className="bg-gray-50 dark:bg-slate-800"><tr>
            {['Concept', 'What it is', 'Relatable example', 'Why it matters for GRC', 'Related controls'].map((h) => <th key={h} scope="col" className={`text-left p-2 font-semibold ${H}`}>{h}</th>)}
          </tr></thead>
          <tbody>{rows.map((r) => (
            <tr key={r[1]} className={`border-t ${LINE} align-top`}>
              <td className={`p-2 font-semibold ${H}`}>{r[1]}<span className="block text-[11px] font-normal text-gray-500 dark:text-slate-400">{r[0]}</span></td>
              <td className={`p-2 ${TXT}`}>{r[2]}</td>
              <td className={`p-2 italic ${TXT}`}>{r[3]}</td>
              <td className={`p-2 ${TXT}`}>{r[4]}</td>
              <td className={`p-2 font-mono text-xs ${TXT}`}>{r[5]}</td>
            </tr>
          ))}</tbody>
        </table>
      </div>

      <section>
        <h3 className={`text-lg font-semibold mb-2 ${H}`}>Questions to ask in a walkthrough</h3>
        <div className={`overflow-x-auto rounded-xl border ${LINE}`}>
          <table className="w-full text-sm min-w-[560px]">
            <thead className="bg-gray-50 dark:bg-slate-800"><tr>
              {['Area', 'Question'].map((h) => <th key={h} scope="col" className={`text-left p-2 font-semibold ${H}`}>{h}</th>)}
            </tr></thead>
            <tbody>{questions.map(([c, qq]) => (
              <tr key={c} className={`border-t ${LINE} align-top`}>
                <td className={`p-2 font-semibold ${H}`}>{c}</td>
                <td className={`p-2 ${TXT}`}>{qq}</td>
              </tr>
            ))}</tbody>
          </table>
        </div>
      </section>
      <p className="text-xs text-gray-500 dark:text-slate-400">Control references show where each concept usually comes up in an audit. They are a guide, not a formal mapping.</p>
    </div>
  );
}
