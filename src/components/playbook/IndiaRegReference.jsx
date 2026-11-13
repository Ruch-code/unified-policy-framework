import { INDIA_REG, INDIA_REG_NOTE } from '../../data/indiaFinReg.js';

const H = 'text-gray-900 dark:text-white';
const TXT = 'text-gray-700 dark:text-slate-300';
const LINE = 'border-gray-200 dark:border-slate-700';

export default function IndiaRegReference({ which }) {
  const r = INDIA_REG[which];
  if (!r) return null;
  return (
    <section className="py-8">
      <div className="container mx-auto px-4">
        <div className={`bg-white dark:bg-[#1e293b] border ${LINE} rounded p-5`}>
          <h2 className={`text-2xl font-bold ${H}`}>{r.title}</h2>
          <p className={`mt-2 max-w-3xl text-sm ${TXT}`}>{r.intro}</p>
          <dl className="mt-5 grid gap-x-6 gap-y-3 md:grid-cols-[180px_minmax(0,1fr)] text-sm">
            {r.facts.map(([k, v]) => [
              <dt key={`${k}-k`} className={`font-semibold ${H}`}>{k}</dt>,
              <dd key={`${k}-v`} className={TXT}>{v}</dd>,
            ])}
          </dl>
          <h3 className={`mt-6 mb-2 text-lg font-semibold ${H}`}>Key requirements</h3>
          <div className={`overflow-x-auto rounded border ${LINE}`} tabIndex={0} role="region" aria-label={`${r.title} requirements`}>
            <table className="w-full text-sm" style={{ minWidth: 900 }}>
              <thead className="bg-gray-50 dark:bg-slate-800"><tr>{['Area', 'Requirement', 'Evidence expected'].map((h) => <th key={h} scope="col" className={`text-left p-2.5 font-semibold ${H}`}>{h}</th>)}</tr></thead>
              <tbody>{r.requirements.map((row) => <tr key={row[0]} className={`border-t ${LINE} align-top`}>{row.map((c, j) => <td key={j} className={`p-2.5 ${j === 0 ? `font-semibold ${H}` : TXT}`}>{c}</td>)}</tr>)}</tbody>
            </table>
          </div>
          <p className="mt-3 text-xs text-gray-500 dark:text-slate-400">{INDIA_REG_NOTE} <a className="underline" href={r.source} target="_blank" rel="noopener noreferrer">Official source</a></p>
        </div>
      </div>
    </section>
  );
}
