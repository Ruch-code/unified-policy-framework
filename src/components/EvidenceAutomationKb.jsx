import { useMemo, useState } from 'react';
import { EA_INTRO, EA_SOURCES, EA_MATURITY, EA_AUDIT_READY, EA_HUMAN, EA_STEPS, EA_UAR } from '../data/evidenceAutomation.js';

const LINE = 'border-gray-200 dark:border-slate-700';
const TXT = 'text-gray-700 dark:text-slate-300';
const H = 'text-gray-900 dark:text-white';

function Table({ headers, rows, min = 640 }) {
  return (
    <div className={`overflow-x-auto rounded-xl border ${LINE}`} tabIndex={0} role="region" aria-label={headers.join(', ')}>
      <table className="w-full text-sm" style={{ minWidth: min }}>
        <thead className="bg-gray-50 dark:bg-slate-800"><tr>{headers.map((h) => <th key={h} scope="col" className={`text-left p-2 font-semibold ${H}`}>{h}</th>)}</tr></thead>
        <tbody>{rows.map((r, i) => <tr key={i} className={`border-t ${LINE} align-top`}>{r.map((c, j) => <td key={j} className={`p-2 ${j === 0 ? `font-semibold ${H}` : TXT}`}>{c}</td>)}</tr>)}</tbody>
      </table>
    </div>
  );
}

export default function EvidenceAutomationKb() {
  const areas = [...new Set(EA_SOURCES.map((r) => r[0]))];
  const [area, setArea] = useState('All');
  const rows = useMemo(() => EA_SOURCES.filter((r) => area === 'All' || r[0] === area), [area]);
  return (
    <div id="evidence-automation" className="bg-white border border-gray-200 rounded-2xl p-5 dark:bg-[#1e293b] dark:border-[#334155] space-y-8">
      <div>
        <h2 className={`text-xl font-bold mb-2 ${H}`}>Automating Evidence Collection</h2>
        <p className={`text-sm max-w-3xl ${TXT}`}>{EA_INTRO}</p>
      </div>

      <section>
        <h3 className={`text-lg font-semibold mb-2 ${H}`}>What can be collected automatically</h3>
        <div className="flex flex-wrap gap-2 mb-3" role="group" aria-label="Filter by control area">
          {['All', ...areas].map((a) => (
            <button key={a} type="button" aria-pressed={area === a} onClick={() => setArea(a)}
              className={`px-3 py-1.5 rounded-full text-xs font-semibold border focus:outline-none focus-visible:ring-2 focus-visible:ring-sky-500 ${area === a ? 'bg-sky-700 text-white border-sky-700' : `bg-white dark:bg-slate-800 ${TXT} ${LINE}`}`}>{a}</button>
          ))}
        </div>
        <Table headers={['Control area', 'Evidence', 'Source system', 'Collection method', 'Frequency', 'What still needs a person']} rows={rows} min={900} />
      </section>

      <section>
        <h3 className={`text-lg font-semibold mb-2 ${H}`}>Maturity path</h3>
        <Table headers={['Stage', 'What it looks like', 'Typical problems']} rows={EA_MATURITY} />
      </section>

      <section>
        <h3 className={`text-lg font-semibold mb-2 ${H}`}>Making automated evidence audit-ready</h3>
        <Table headers={['Requirement', 'What to do']} rows={EA_AUDIT_READY} min={520} />
      </section>

      <section className="grid md:grid-cols-2 gap-6">
        <div>
          <h3 className={`text-lg font-semibold mb-2 ${H}`}>Getting started</h3>
          <ol className={`list-decimal ml-5 space-y-1.5 text-sm ${TXT}`}>{EA_STEPS.map(([t, d]) => <li key={t}><span className={`font-semibold ${H}`}>{t}.</span> {d}</li>)}</ol>
        </div>
        <div>
          <h3 className={`text-lg font-semibold mb-2 ${H}`}>What still needs a person</h3>
          <ul className={`list-disc ml-5 space-y-1.5 text-sm ${TXT}`}>{EA_HUMAN.map((x) => <li key={x}>{x}</li>)}</ul>
        </div>
      </section>

      <p className={`text-sm rounded-xl border ${LINE} p-3 ${TXT}`}>{EA_UAR} <a href="/#access-review-by-design" className="underline text-sky-700 dark:text-sky-300">Open Access Reviews by Design</a></p>
    </div>
  );
}
