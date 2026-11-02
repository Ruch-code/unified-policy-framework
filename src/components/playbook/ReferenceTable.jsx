/** Simple accessible reference table section used under playbook pages. */
export default function ReferenceTable({ id, title, intro, headers, rows, notes = [], children }) {
  return (
    <section id={id} className="max-w-6xl mx-auto px-4 py-10 scroll-mt-24">
      <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">{title}</h2>
      {intro && <p className="text-sm text-gray-600 dark:text-slate-300 mb-4 max-w-3xl">{intro}</p>}
      {notes.map(n => (
        <p key={n.cite || n} className="mb-3 text-sm rounded-lg p-3 bg-amber-50 dark:bg-amber-900/20 text-amber-900 dark:text-amber-100 border border-amber-200 dark:border-amber-800">
          {n.cite && <strong>{n.cite}: </strong>}{n.note || n}
        </p>
      ))}
      {rows && (
        <div className="overflow-x-auto rounded-xl border border-gray-200 dark:border-slate-700" tabIndex={0} role="region" aria-label={title}>
          <table className="w-full text-sm min-w-[640px]">
            <thead className="bg-gray-50 dark:bg-slate-800"><tr>{headers.map(h => <th key={h} scope="col" className="text-left p-2 font-semibold text-gray-900 dark:text-white">{h}</th>)}</tr></thead>
            <tbody>{rows.map((r, i) => <tr key={i} className="border-t border-gray-200 dark:border-slate-700 align-top">{r.map((c, j) => <td key={j} className={`p-2 text-gray-700 dark:text-slate-300 ${j === 0 ? 'font-mono text-xs whitespace-nowrap' : ''}`}>{c}</td>)}</tr>)}</tbody>
          </table>
        </div>
      )}
      {children}
    </section>
  );
}
