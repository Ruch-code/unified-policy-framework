import { NOTES, PRACTICES, CONTROL_MAP, CHECKLISTS } from '../data/fieldNotes.js';

const TH = 'p-3 text-left font-semibold text-gray-900 dark:text-white bg-gray-50 dark:bg-slate-800 align-bottom';
const TD = 'p-3 align-top border-t border-gray-200 dark:border-slate-700 text-gray-700 dark:text-slate-300';
const P = 'text-sm leading-relaxed text-gray-700 dark:text-slate-300';
const BOX = 'rounded-xl border border-gray-200 dark:border-slate-700 bg-white dark:bg-slate-900 p-4';

function Table({ label, head, rows, min }) {
  return (
    <div className="overflow-x-auto rounded-xl border border-gray-200 dark:border-slate-700" tabIndex={0} role="region" aria-label={label}>
      <table className="w-full text-sm" style={{ minWidth: min }}>
        <thead><tr>{head.map((h) => <th key={h} scope="col" className={TH}>{h}</th>)}</tr></thead>
        <tbody>{rows.map((r) => <tr key={r[0]}>{r.map((c, j) => <td key={j} className={`${TD} ${j === 0 ? 'font-semibold text-gray-900 dark:text-white' : ''}`}>{c}</td>)}</tr>)}</tbody>
      </table>
    </div>
  );
}

export default function FieldNotes() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-10 space-y-8">
      <header>
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Field Notes: engineering practices to audit evidence</h1>
        <p className={`mt-2 max-w-3xl ${P}`}>Short notes connecting real engineering practices to the controls they satisfy and the evidence an auditor will ask for. Drawn from public engineering write-ups and engagement experience, with company names removed. Control references are to SOC 2 (2017 TSC), ISO/IEC 27001:2022 Annex A and ISO/IEC 42001:2023 Annex A; check them against your own control library.</p>
      </header>

      <section className="space-y-3">
        <h2 className="text-xl font-semibold text-gray-900 dark:text-white">Notes</h2>
        {NOTES.map((n, i) => (
          <details key={n.id} id={n.id} className={BOX}>
            <summary className="cursor-pointer font-semibold text-gray-900 dark:text-white">{i + 1}. {n.title}</summary>
            <div className="mt-3 space-y-3">
              {n.body.map((b) => <p key={b.slice(0, 40)} className={P}>{b}</p>)}
              {n.lessons && (
                <div>
                  {n.lessonsTitle && <p className={`${P} font-semibold`}>{n.lessonsTitle}</p>}
                  <ul className={`list-disc pl-5 space-y-1 ${P}`}>{n.lessons.map((l) => <li key={l}>{l}</li>)}</ul>
                </div>
              )}
              <p className={P}><strong>Control mapping.</strong> {n.mapping}</p>
              <p className={P}><strong>What an auditor will ask for.</strong> {n.evidence}</p>
              {n.takeaway && <p className={P}><strong>Founder takeaway.</strong> {n.takeaway}</p>}
            </div>
          </details>
        ))}
      </section>

      <details className={BOX} id="fn-practices">
        <summary className="cursor-pointer text-xl font-semibold text-gray-900 dark:text-white">Engineering practices at a glance</summary>
        <div className="mt-3"><Table label="Engineering practices" head={['Topic', 'Summary', 'Engineering principle', 'Control mapping', 'Evidence an auditor wants']} rows={PRACTICES} min={1200} /></div>
      </details>

      <details className={BOX} id="fn-control-map" open>
        <summary className="cursor-pointer text-xl font-semibold text-gray-900 dark:text-white">Control map</summary>
        <div className="mt-3"><Table label="Control map" head={['Practice', 'SOC 2 TSC', 'ISO 27001:2022 Annex A', 'Evidence examples']} rows={CONTROL_MAP} min={860} /></div>
      </details>

      <section className="space-y-3" id="fn-checklists">
        <h2 className="text-xl font-semibold text-gray-900 dark:text-white">Checklists</h2>
        {CHECKLISTS.map(([title, items]) => (
          <details key={title} className={BOX}>
            <summary className="cursor-pointer font-semibold text-gray-900 dark:text-white">Checklist {title}</summary>
            <ul className="mt-3 space-y-1">{items.map((it) => (
              <li key={it} className={P}><label className="flex gap-2 items-start"><input type="checkbox" className="mt-1" /> <span>{it}</span></label></li>
            ))}</ul>
          </details>
        ))}
      </section>
    </div>
  );
}
