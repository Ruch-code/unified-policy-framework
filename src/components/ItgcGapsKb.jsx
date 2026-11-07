import { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { GENERIC_GAPS, GapCard, ITGC_COLORS, itgcColor } from './LearningFrameworkPage.jsx';
import { VIBE_ITGC_GAPS, SOC1_ICFR_NOTE } from '../data/vibeItgcGaps.js';
import { ENG_ITGC_GAPS } from '../data/engineeringPartnership.js';
import { ITGC_MAPPING } from '../data/iso42001.js';
import { FRAMEWORK_GAPS, SHARED_THEMES, COMMON_ONLY_FRAMEWORKS } from '../data/itgcStartupGaps.js';

const COLORS = { bgLight: 'bg-amber-50 dark:bg-amber-900/30', text: 'text-amber-700 dark:text-amber-300', border: 'border-amber-200 dark:border-amber-800' };
const BY_ID = Object.fromEntries(FRAMEWORK_GAPS.map((f) => [f.id, f]));

function FwTag({ id }) {
  const f = BY_ID[id];
  if (!f) return null;
  return (
    <Link to={`/${f.id}`} title={`Open the ${f.label} playbook`}
      className="inline-block text-[11px] font-semibold px-2 py-0.5 rounded-full border border-slate-300 text-slate-700 bg-white hover:bg-slate-100 dark:border-slate-600 dark:text-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700">
      {f.label}
    </Link>
  );
}

function Tagged({ ids, children }) {
  return (
    <div>
      <div className="flex flex-wrap gap-1 mb-1.5">{ids.map((id) => <FwTag key={id} id={id} />)}</div>
      {children}
    </div>
  );
}

export default function ItgcGapsKb({ initialFramework = 'all' }) {
  const start = BY_ID[initialFramework] ? initialFramework : 'all';
  const [fw, setFw] = useState(start);
  const commonOnlyVisitor = initialFramework !== 'all' && !BY_ID[initialFramework];

  const { themes, specific } = useMemo(() => {
    const used = new Set();
    const themes = SHARED_THEMES.map((t) => {
      const items = t.members.map(([id, i]) => { used.add(`${id}:${i}`); return { id, item: BY_ID[id].gaps[i] }; });
      return { theme: t.theme, items: items.filter((x) => fw === 'all' || x.id === fw) };
    }).filter((t) => t.items.length);
    const specific = FRAMEWORK_GAPS.flatMap((f) => f.gaps.map((item, i) => ({ id: f.id, item, key: `${f.id}:${i}` })))
      .filter((x) => !used.has(x.key) && (fw === 'all' || x.id === fw));
    return { themes, specific };
  }, [fw]);

  const chip = (k, label) => (
    <button key={k} type="button" aria-pressed={fw === k} onClick={() => setFw(k)}
      className={`px-3 py-1.5 rounded-full text-xs font-semibold border focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-400 ${fw === k ? 'bg-amber-600 text-white border-amber-600' : 'bg-white text-gray-600 border-gray-200 dark:bg-slate-800 dark:text-slate-200 dark:border-slate-600'}`}>
      {label}
    </button>
  );

  return (
    <div id="itgc-gaps" className="bg-white border border-gray-200 rounded-2xl p-5 dark:bg-[#1e293b] dark:border-[#334155]">
      <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-2">Common Gaps & Startup Pushback (ITGC)</h2>
      <p className="text-sm text-gray-600 dark:text-slate-300 mb-3 max-w-3xl">
        Common startup gaps mapped to IT General Control domains: what is typically missing, the pushback, the compensating controls already in place, and the policy that ties it together. Gaps every framework shares appear once. Framework-specific gaps keep their original wording and carry a tag showing which framework they come from.
      </p>
      {commonOnlyVisitor && (
        <p className="text-xs text-gray-500 dark:text-slate-400 mb-3">The framework you came from uses the common gaps below and has no framework-specific list.</p>
      )}
      <div className="flex flex-wrap gap-2 mb-3">{Object.keys(ITGC_COLORS).map((d) => <span key={d} className={`text-[11px] font-semibold px-2.5 py-1 rounded-full border ${itgcColor(d)}`}>{d}</span>)}</div>
      <div className="flex flex-wrap gap-2 mb-6" role="group" aria-label="Filter by framework">
        {chip('all', 'All frameworks')}
        {FRAMEWORK_GAPS.map((f) => chip(f.id, f.label))}
      </div>

      <section className="mb-8">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-1">Common to all frameworks</h3>
        <p className="text-xs text-gray-500 dark:text-slate-400 mb-3">Applies everywhere. Frameworks without a specific list ({COMMON_ONLY_FRAMEWORKS.length}) rely on these alone: {COMMON_ONLY_FRAMEWORKS.join(', ')}.</p>
        <div className="grid md:grid-cols-2 gap-5">
          {GENERIC_GAPS.map((item, i) => <GapCard key={`gen-${i}`} item={item} colors={COLORS} controlMap={ITGC_MAPPING} />)}
        </div>
        <details className="mt-5 rounded-xl border border-violet-200 dark:border-violet-800">
          <summary className="cursor-pointer p-4 font-semibold text-gray-900 dark:text-white">AI and vibe coding platforms: gaps across the ITGC domains</summary>
          <div className="p-4 pt-0 grid md:grid-cols-2 gap-5">{VIBE_ITGC_GAPS.map((item, i) => <GapCard key={`vibe-${i}`} item={item} colors={COLORS} />)}</div>
        </details>
        <details className="mt-4 rounded-xl border border-teal-200 dark:border-teal-800">
          <summary className="cursor-pointer p-4 font-semibold text-gray-900 dark:text-white">Engineering partnership: gaps between GRC and engineering</summary>
          <div className="p-4 pt-0 grid md:grid-cols-2 gap-5">{ENG_ITGC_GAPS.map((item, i) => <GapCard key={`eng-${i}`} item={item} colors={COLORS} />)}</div>
          <p className="px-4 pb-4 text-sm"><a className="underline text-teal-700 dark:text-teal-300" href="/#engineering-partnership">Open the Engineering &amp; Infrastructure Partnership module</a></p>
        </details>
        <div className="mt-4 rounded-xl border border-gray-200 dark:border-slate-700 p-4 text-sm text-gray-700 dark:text-slate-300">
          <p className="font-semibold text-gray-900 dark:text-white mb-1">SOC 1 and ICFR: when ITGCs matter for financial reporting</p>
          <p>{SOC1_ICFR_NOTE}</p>
        </div>
      </section>

      {themes.length > 0 && (
        <section className="mb-8">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-1">Shared across several frameworks</h3>
          <p className="text-xs text-gray-500 dark:text-slate-400 mb-3">The same underlying gap, raised by more than one framework. Each card keeps its framework's wording and requirements.</p>
          {themes.map((t) => (
            <div key={t.theme} className="mb-5">
              <h4 className="text-sm font-bold text-gray-800 dark:text-slate-100 mb-2">{t.theme}</h4>
              <div className="grid md:grid-cols-2 gap-5">
                {t.items.map(({ id, item }) => <Tagged key={`${id}-${item.gap}`} ids={[id]}><GapCard item={item} colors={COLORS} /></Tagged>)}
              </div>
            </div>
          ))}
        </section>
      )}

      {specific.length > 0 && (
        <section>
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">Framework-specific</h3>
          <div className="grid md:grid-cols-2 gap-5">
            {specific.map(({ id, item, key }) => <Tagged key={key} ids={[id]}><GapCard item={item} colors={COLORS} /></Tagged>)}
          </div>
        </section>
      )}
    </div>
  );
}
