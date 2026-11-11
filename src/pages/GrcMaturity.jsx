import { MATURITY_HERO, LEVEL_SUMMARY, LEVELS, COMPARISON, JUMP } from '../data/grcMaturity.js';

const H = 'text-gray-900 dark:text-white';
const TXT = 'text-gray-700 dark:text-slate-300';
const LINE = 'border-gray-200 dark:border-slate-700';

function Rows({ label, headers, rows, min = 700 }) {
  return (
    <div className={`overflow-x-auto rounded border ${LINE}`} tabIndex={0} role="region" aria-label={label}>
      <table className="w-full text-sm" style={{ minWidth: min }}>
        <thead className="bg-gray-50 dark:bg-slate-800"><tr>{headers.map((h) => <th key={h} scope="col" className={`text-left p-2.5 font-semibold ${H}`}>{h}</th>)}</tr></thead>
        <tbody>{rows.map((r) => <tr key={r[0]} className={`border-t ${LINE} align-top`}>{r.map((c, j) => <td key={j} className={`p-2.5 ${j === 0 ? `font-semibold ${H}` : TXT}`}>{c}</td>)}</tr>)}</tbody>
      </table>
    </div>
  );
}

export default function GrcMaturity() {
  return (
    <div className="max-w-5xl mx-auto px-4 py-10 space-y-12">
      <header className="max-w-3xl">
        <p className="text-xs font-semibold uppercase tracking-wider text-gray-500 dark:text-slate-400">{MATURITY_HERO.eyebrow}</p>
        <h1 className={`text-3xl md:text-4xl font-serif font-bold mt-2 ${H}`}>{MATURITY_HERO.title}</h1>
        <p className={`mt-4 text-base leading-relaxed ${TXT}`}>{MATURITY_HERO.intro}</p>
      </header>

      <section>
        <h2 className={`text-xl font-semibold mb-3 ${H}`}>The three levels at a glance</h2>
        <Rows label="Maturity levels" headers={['Level', 'Name', 'Stage', 'Focus', 'Market reality']} rows={LEVEL_SUMMARY} min={800} />
        <nav className="mt-3 flex flex-wrap gap-x-5 gap-y-1 text-sm" aria-label="Jump to level">
          {LEVELS.map((l) => <a key={l.id} href={`#${l.id}`} className="underline text-blue-700 dark:text-blue-300">{l.level}: {l.name}</a>)}
          <a href="#cognitive-jump" className="underline text-blue-700 dark:text-blue-300">The cognitive jump</a>
        </nav>
      </section>

      {LEVELS.map((l) => (
        <section key={l.id} id={l.id} className={`border-t pt-8 ${LINE} scroll-mt-20`}>
          <p className="text-xs font-semibold uppercase tracking-wider text-gray-500 dark:text-slate-400">{l.level}: {l.name}</p>
          <h2 className={`text-2xl font-serif font-bold mt-1 ${H}`}>{l.headline}</h2>
          <p className={`mt-3 max-w-3xl leading-relaxed ${TXT}`}>{l.overview}</p>
          <h3 className={`text-base font-semibold mt-6 mb-2 ${H}`}>Common pain points</h3>
          <Rows label={`${l.name} pain points`} headers={['Pain point', 'What it looks like']} rows={l.pains} />
          <h3 className={`text-base font-semibold mt-6 mb-2 ${H}`}>How we help you advance</h3>
          <Rows label={`${l.name} services`} headers={['Service', 'What it delivers']} rows={l.services} />
          <p className={`mt-4 max-w-3xl text-sm italic ${TXT}`}>{l.next}</p>
        </section>
      ))}

      <section className={`border-t pt-8 ${LINE}`}>
        <h2 className={`text-xl font-semibold mb-3 ${H}`}>How the levels compare</h2>
        <Rows label="Level comparison" headers={['Dimension', 'Level 1: Documentation', 'Level 2: Integration', 'Level 3: Influence']} rows={COMPARISON} min={900} />
      </section>

      <section id="cognitive-jump" className={`border-t pt-8 ${LINE} scroll-mt-20`}>
        <h2 className={`text-2xl font-serif font-bold ${H}`}>{JUMP.title}</h2>
        <p className={`mt-3 max-w-3xl leading-relaxed ${TXT}`}>{JUMP.intro}</p>
        <div className="mt-5"><Rows label="Mindset shifts" headers={['Shift', 'What changes']} rows={JUMP.shifts} /></div>
        <p className={`mt-5 max-w-3xl leading-relaxed ${TXT}`}>{JUMP.close}</p>
        <p className={`mt-3 max-w-3xl font-semibold ${H}`}>{JUMP.cta}</p>
      </section>
    </div>
  );
}
