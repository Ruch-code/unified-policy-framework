import { useState } from 'react';
import { ISO_CLAUSES, ISO_SOURCES, CLIMATE_AMENDMENT, ANNEX_A_BY_CLAUSE } from '../data/iso27001.js';
import { ANNEX_A_CONTROLS } from '../data/iso27001AnnexA.js';

/**
 * Clause-by-clause guide for Clauses 4-10.
 *
 * Clauses 4-10 are the binding ISMS requirements of ISO/IEC 27001:2022.
 * Annex A is separate and is handled by AnnexACatalog.
 */
export default function ClauseGuide() {
  const [open, setOpen] = useState('6');
  // Open by default: the amendment is a requirement, and burying it behind a
  // toggle is how organisations miss it.
  const [showClimate, setShowClimate] = useState(true);

  return (
    <section aria-labelledby="clauses-heading" className="space-y-4">
      <div className="rounded-xl border border-rose-200 dark:border-rose-800 bg-rose-50/60 dark:bg-rose-900/20 p-4">
        <h3 id="clauses-heading" className="text-sm font-semibold text-rose-900 dark:text-rose-300">
          These are the requirements
        </h3>
        <p className="mt-1 text-sm text-rose-800 dark:text-rose-300">
          Clauses 4 to 10 of ISO/IEC 27001:2022 are normative. This is the part you must
          conform to. The{' '}
          <a href={ISO_SOURCES.standard.url} target="_blank" rel="noopener noreferrer" className="underline hover:text-rose-900 dark:hover:text-rose-300">
            Annex A reference controls
          </a>{' '}
          are guidance for selecting controls, not requirements in themselves.
        </p>
        <p className="mt-2 text-xs text-rose-700 dark:text-rose-300">
          Summaries are original plain-language paraphrases, not standard text. Verify against
          the licensed standard ({ISO_SOURCES.standard.version}).
        </p>
      </div>

      <div className="flex flex-wrap items-center justify-between gap-3 rounded-lg border border-emerald-200 dark:border-emerald-800 bg-emerald-50 dark:bg-emerald-900/20 p-3">
        <div className="min-w-0">
          <p className="text-sm font-medium text-emerald-900 dark:text-emerald-300">Climate amendment — Clauses 4.1 and 4.2</p>
          <p className="mt-0.5 text-xs text-emerald-800 dark:text-emerald-300">
            ISO/IEC 27001:2022/Amd 1:2024 requires a documented climate-change determination.
          </p>
        </div>
        <button
          type="button"
          onClick={() => setShowClimate(v => !v)}
          aria-expanded={showClimate}
          className="shrink-0 rounded-lg border border-emerald-300 dark:border-emerald-800 bg-white px-3 py-1.5 text-xs font-medium text-emerald-800 dark:text-emerald-300 hover:bg-emerald-100 dark:hover:bg-emerald-900/40"
        >
          {showClimate ? 'Hide' : 'Show'} what it requires
        </button>
      </div>

      {showClimate && <ClimatePanel />}

      <ul className="space-y-2">
        {ISO_CLAUSES.map(clause => {
          const expanded = open === clause.id;
          const annexRefs = Object.entries(ANNEX_A_BY_CLAUSE)
            .filter(([, ids]) => ids.length > 0)
            .map(([cid, ids]) => [cid, ids.length]);
          return (
            <li key={clause.id} className="rounded-lg border border-slate-200 dark:border-slate-700 bg-white">
              <h4>
                <button
                  type="button"
                  onClick={() => setOpen(expanded ? null : clause.id)}
                  aria-expanded={expanded}
                  className="flex w-full items-start gap-3 px-4 py-3 text-left hover:bg-slate-50"
                >
                  <span className="mt-0.5 shrink-0 rounded bg-rose-100 dark:bg-rose-900/40 px-2 py-0.5 font-mono text-xs font-semibold text-rose-800 dark:text-rose-300">
                    {clause.id}
                  </span>
                  <span className="min-w-0 flex-1">
                    <span className="block text-sm font-semibold text-slate-900 dark:text-white">{clause.title}</span>
                    <span className="mt-0.5 block text-xs text-slate-600">{clause.summary}</span>
                  </span>
                  <span className="shrink-0 text-xs text-slate-400">{expanded ? '−' : '+'}</span>
                </button>
              </h4>

              {expanded && (
                <div className="space-y-3 border-t border-slate-200 dark:border-slate-700 px-4 py-4">
                  {clause.subclauses.map(sub => (
                    <div key={sub.id} className="rounded-md border border-slate-100 dark:border-slate-700 bg-slate-50 p-3">
                      <p className="flex flex-wrap items-center gap-2">
                        <span className="font-mono text-xs font-semibold text-slate-700">{sub.id}</span>
                        <span className="text-sm font-medium text-slate-900 dark:text-white">{sub.title}</span>
                        {sub.verify && (
                          <span className="rounded bg-slate-200 dark:bg-slate-700 px-1.5 py-0.5 text-[0.65rem] font-medium text-slate-700">
                            verify against licensed standard
                          </span>
                        )}
                        {sub.supersededIn2022 && (
                          <span className="rounded bg-amber-100 dark:bg-amber-900/40 px-1.5 py-0.5 text-[0.65rem] font-medium text-amber-800 dark:text-amber-300">
                            moved to 10.2 in 2022
                          </span>
                        )}
                      </p>
                      <p className="mt-1 text-sm text-slate-700">{sub.summary}</p>
                      {sub.supersededIn2022 && sub.note && (
                        <p className="mt-1 text-xs text-amber-800 dark:text-amber-300">{sub.note}</p>
                      )}
                      {sub.climate && (
                        <p className="mt-2 rounded bg-emerald-100 dark:bg-emerald-900/40 px-2 py-1.5 text-xs text-emerald-900 dark:text-emerald-300">
                          <strong>Climate amendment applies here.</strong> {sub.climate}
                        </p>
                      )}
                      {sub.sub && (
                        <ul className="mt-2 space-y-2">
                          {sub.sub.map(s2 => (
                            <li key={s2.id} className="border-l-2 border-slate-200 dark:border-slate-700 pl-3">
                              <p className="font-mono text-[0.7rem] font-semibold text-slate-600">{s2.id} {s2.title}</p>
                              <p className="mt-0.5 text-xs text-slate-600">{s2.summary}</p>
                            </li>
                          ))}
                        </ul>
                      )}
                    </div>
                  ))}

                  <details className="rounded-md border border-slate-200 dark:border-slate-700 p-3">
                    <summary className="cursor-pointer text-xs font-medium text-slate-700">
                      Annex A controls referencing this clause ({annexRefs.length} clauses have references)
                    </summary>
                    <ul className="mt-2 flex flex-wrap gap-1.5">
                      {annexRefs.map(([cid, n]) => (
                        <li key={cid} className="rounded bg-indigo-50 dark:bg-indigo-900/20 px-1.5 py-0.5 font-mono text-[0.65rem] text-indigo-800 dark:text-indigo-300">
                          {cid} → {n}
                        </li>
                      ))}
                    </ul>
                    <p className="mt-2 text-[0.7rem] text-slate-500">
                      References indicate where an Annex A control supports the clause. They are not
                      mandatory linkages, and an organisation may select controls for any clause.
                    </p>
                  </details>
                </div>
              )}
            </li>
          );
        })}
      </ul>

      <p className="text-xs text-slate-500">
        {ANNEX_A_CONTROLS.length} Annex A reference controls in total. Annex A is presented
        separately, because a reference control is not a clause requirement.
      </p>
    </section>
  );
}

function ClimatePanel() {
  const { clause41, clause42, source } = CLIMATE_AMENDMENT;
  return (
    <div className="space-y-4 rounded-xl border border-emerald-200 dark:border-emerald-800 bg-emerald-50/60 dark:bg-emerald-900/20 p-4">
      <div>
        <h4 className="text-sm font-semibold text-emerald-900 dark:text-emerald-300">{clause41.cite}</h4>
        <p className="mt-1 rounded bg-white px-3 py-2 text-sm font-medium text-emerald-900 dark:text-emerald-300">
          {clause41.requirement}
        </p>
        <ul className="mt-2 space-y-1.5">
          {clause41.guidance.map((g, i) => (
            <li key={i} className="flex gap-2 text-xs text-emerald-900 dark:text-emerald-300">
              <span aria-hidden="true" className="text-emerald-500 dark:text-emerald-400">•</span>
              <span>{g}</span>
            </li>
          ))}
        </ul>
        <p className="mt-2 text-[0.7rem] text-emerald-700 dark:text-emerald-300">{clause41.for}</p>
      </div>

      <div className="border-t border-emerald-200 dark:border-emerald-800 pt-3">
        <h4 className="text-sm font-semibold text-emerald-900 dark:text-emerald-300">{clause42.cite}</h4>
        <p className="mt-1 rounded bg-white px-3 py-2 text-sm font-medium text-emerald-900 dark:text-emerald-300">
          {clause42.requirement}
        </p>
        <ul className="mt-2 space-y-1.5">
          {clause42.guidance.map((g, i) => (
            <li key={i} className="flex gap-2 text-xs text-emerald-900 dark:text-emerald-300">
              <span aria-hidden="true" className="text-emerald-500 dark:text-emerald-400">•</span>
              <span>{g}</span>
            </li>
          ))}
        </ul>
        <p className="mt-2 text-[0.7rem] text-emerald-700 dark:text-emerald-300">{clause42.for}</p>
      </div>

      <p className="text-[0.7rem] text-emerald-800 dark:text-emerald-300">
        Applies to Clauses 4.1 and 4.2 only.{' '}
        <a href={source.url} target="_blank" rel="noopener noreferrer" className="underline hover:text-emerald-900 dark:hover:text-emerald-300">
          {source.title}
        </a>{' '}
        ({source.version}).
      </p>
    </div>
  );
}
