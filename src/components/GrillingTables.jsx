import { GRILL_SECTIONS, GRILL_EXCHANGE } from '../data/grillingTables.js';

const TH = 'p-2 text-left font-semibold text-gray-900 dark:text-white bg-gray-50 dark:bg-gray-900';
const TD = 'p-2 align-top border-t border-gray-100 dark:border-gray-700 text-gray-700 dark:text-gray-300';

export default function GrillingTables() {
  return (
    <div className="space-y-3">
      <p className="text-sm text-gray-700 dark:text-gray-300">Rapid-fire grilling questions by domain, each with a strong conversation-style answer and an example. Use them to rehearse out loud.</p>
      {GRILL_SECTIONS.map((s) => (
        <details key={s.id} className="rounded-xl border border-gray-200 dark:border-gray-700 p-3">
          <summary className="cursor-pointer font-semibold text-gray-900 dark:text-white">{s.title} ({s.rows.length})</summary>
          <div className="overflow-x-auto mt-2" tabIndex={0} role="region" aria-label={s.title}>
            <table className="w-full text-sm" style={{ minWidth: 640 }}>
              <thead><tr><th scope="col" className={TH}>Domain</th><th scope="col" className={TH}>Grilling question</th><th scope="col" className={TH}>Strong answer</th></tr></thead>
              <tbody>{s.rows.map((r) => <tr key={r[0]}><td className={`${TD} font-medium`}>{r[0]}</td><td className={TD}>{r[1]}</td><td className={TD}>{r[2]}</td></tr>)}</tbody>
            </table>
          </div>
        </details>
      ))}
      <details className="rounded-xl border border-rose-200 dark:border-rose-800 p-3">
        <summary className="cursor-pointer font-semibold text-gray-900 dark:text-white">Example grilling exchange: terminated user with VPN access</summary>
        <div className="mt-2 space-y-2 text-sm">
          {GRILL_EXCHANGE.map(([q, a]) => (
            <div key={q}><p className="text-gray-900 dark:text-white"><strong>Interviewer:</strong> {q}</p><p className="pl-4 border-l-2 border-blue-400 text-gray-700 dark:text-gray-300"><strong>Candidate:</strong> {a}</p></div>
          ))}
        </div>
      </details>
    </div>
  );
}
