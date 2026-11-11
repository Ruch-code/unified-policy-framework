import { SIMILARITIES, DIFFERENCES, READINESS, EFFORT, PHASES, DPDP_COMMENCEMENT } from '../../data/privacyComparison.js';

const TH = 'text-left p-2 font-semibold text-gray-900 dark:text-white';
const TD = 'p-2 text-gray-700 dark:text-slate-300 align-top';

function Table({ label, headers, rows, min = 720 }) {
  return (
    <div className="overflow-x-auto rounded-xl border border-gray-200 dark:border-slate-700" tabIndex={0} role="region" aria-label={label}>
      <table className="w-full text-sm" style={{ minWidth: min }}>
        <thead className="bg-gray-50 dark:bg-slate-800"><tr>{headers.map(h => <th key={h} scope="col" className={TH}>{h}</th>)}</tr></thead>
        <tbody>{rows.map((r, i) => (
          <tr key={i} className="border-t border-gray-200 dark:border-slate-700">
            {r.map((c, j) => j === 0 ? <th key={j} scope="row" className={`${TD} font-semibold text-gray-900 dark:text-white`}>{c}</th> : <td key={j} className={`${TD} ${j === r.length - 1 ? 'text-xs text-gray-500 dark:text-slate-400' : ''}`}>{c}</td>)}
          </tr>))}</tbody>
      </table>
    </div>
  );
}

/** Shared GDPR and DPDPA comparison, rendered on /gdpr and /dpdpa. */
export default function GdprDpdpaComparison() {
  const list = (title, items, cls) => (
    <div className={`rounded-xl p-4 border ${cls}`}>
      <p className="text-xs font-bold uppercase tracking-wide mb-2">{title}</p>
      <ul className="text-sm space-y-1 text-gray-800 dark:text-slate-200">{items.map(x => <li key={x} className="flex gap-2"><span aria-hidden="true">-</span><span>{x}</span></li>)}</ul>
    </div>
  );
  return (
    <section id="gdpr-dpdpa-comparison" className="bg-white dark:bg-slate-900 rounded-2xl border border-gray-200 dark:border-slate-700 p-5 sm:p-6 my-8 scroll-mt-24">
      <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-1">GDPR and DPDPA compared</h2>
      <p className="text-sm text-gray-600 dark:text-slate-300 mb-4 max-w-3xl">How the EU GDPR and India's Digital Personal Data Protection Act, 2023 with the DPDP Rules, 2025 line up, where they differ, and what a GDPR-ready organization still has to do for India. Guidance, not legal advice.</p>

      <h3 className="font-semibold text-gray-900 dark:text-white mb-2">Where they agree</h3>
      <Table label="GDPR and DPDPA similarities" headers={['Area', 'Shared expectation', 'Citation']} rows={SIMILARITIES} />

      <h3 className="font-semibold text-gray-900 dark:text-white mt-6 mb-2">Where they differ</h3>
      <Table label="GDPR and DPDPA differences" headers={['Topic', 'GDPR', 'DPDPA', 'Action needed', 'Citation']} rows={DIFFERENCES} min={980} />

      <h3 className="font-semibold text-gray-900 dark:text-white mt-6 mb-2">Already GDPR compliant? Getting to DPDPA</h3>
      <div className="grid md:grid-cols-2 gap-3">
        {list('Reusable as is', READINESS.reuse, 'bg-emerald-50 border-emerald-200 dark:bg-emerald-900/20 dark:border-emerald-800')}
        {list('Reusable with changes', READINESS.adapt, 'bg-amber-50 border-amber-200 dark:bg-amber-900/20 dark:border-amber-800')}
        {list('New work', READINESS.build, 'bg-rose-50 border-rose-200 dark:bg-rose-900/20 dark:border-rose-800')}
      </div>

      <h3 className="font-semibold text-gray-900 dark:text-white mt-6 mb-1">Effort to get from GDPR to DPDPA</h3>
      <p className="text-xs text-gray-500 dark:text-slate-400 mb-2">Planning estimates, not legal deadlines. The legal deadline for most duties is 13 May 2027.</p>
      <div className="grid md:grid-cols-2 gap-4">
        <Table label="Effort estimates" headers={['Starting point', 'Planning estimate']} rows={EFFORT} min={360} />
        <Table label="Phases" headers={['When', 'Work']} rows={PHASES} min={360} />
      </div>

      <h3 className="font-semibold text-gray-900 dark:text-white mt-6 mb-2">DPDP Rules commencement</h3>
      <ol className="grid sm:grid-cols-2 gap-3">
        {DPDP_COMMENCEMENT.map(c => (
          <li key={c.date} className="rounded-xl border border-gray-200 dark:border-slate-700 p-3 text-sm">
            <p className="font-bold text-gray-900 dark:text-white">{c.date}</p>
            <p className="text-xs font-semibold text-teal-700 dark:text-teal-300">{c.rules}</p>
            <p className="text-gray-700 dark:text-slate-300 mt-1">{c.what}</p>
          </li>))}
      </ol>
      <p className="text-xs text-gray-500 dark:text-slate-400 mt-4">Sources: Regulation (EU) 2016/679; Digital Personal Data Protection Act, 2023; Digital Personal Data Protection Rules, 2025 (G.S.R. 846(E)). Not legal advice; confirm with counsel.</p>
    </section>
  );
}
