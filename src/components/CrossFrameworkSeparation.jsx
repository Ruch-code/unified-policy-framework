import { GEN_ISO_CLASSIFICATION, GEN_CROSS_FRAMEWORK_IDS, isCrossFrameworkItem } from '../data/iso27001Classification.js';
import { ISO_CATEGORIES, ISO_SOURCES } from '../data/iso27001.js';

/**
 * Separates the non-ISO material that was previously mixed into the same list
 * as ISO content. This exists so a GDPR deadline or a HIPAA BBA tracker can
 * never be read as an ISO/IEC 27001 requirement.
 */
export default function CrossFrameworkSeparation({ items = [], onSelect }) {
  const rows = items
    .filter(it => isCrossFrameworkItem(it.id))
    .map(it => ({ item: it, cls: GEN_ISO_CLASSIFICATION[it.id] }));

  return (
    <section aria-labelledby="cross-framework-heading" className="space-y-4">
      <div className="rounded-xl border border-amber-300 bg-amber-50 p-4">
        <h3 id="cross-framework-heading" className="text-sm font-semibold text-amber-900">
          Not ISO/IEC 27001 requirements
        </h3>
        <p className="mt-1 text-sm text-amber-900">
          The work below is worth doing, and it appears here because it is genuinely useful — but it
          comes from other laws and frameworks. ISO/IEC 27001:2022 does not impose these deadlines,
          notices or artefacts. Treating them as ISO requirements misrepresents the standard.
        </p>
      </div>

      {rows.length === 0 ? (
        <p className="rounded-lg border border-dashed border-slate-300 p-6 text-center text-sm text-slate-600">
          None of the current assessment items contain non-ISO legal obligations.
        </p>
      ) : (
        <ul className="space-y-3">
          {rows.map(({ item, cls }) => (
            <li key={item.id} className="rounded-lg border border-amber-200 bg-white p-4">
              <div className="flex flex-wrap items-start justify-between gap-2">
                <div className="min-w-0">
                  <p className="text-sm font-medium text-slate-900">{item.title}</p>
                  <p className="mt-0.5 font-mono text-xs text-slate-500">{item.id}</p>
                </div>
                <span className="shrink-0 rounded bg-amber-100 px-2 py-0.5 text-xs font-medium text-amber-900">
                  {ISO_CATEGORIES[cls.primary].short}
                </span>
              </div>

              {cls.contaminants.length > 0 && (
                <ul className="mt-3 space-y-1">
                  {cls.contaminants.map((c, i) => (
                    <li key={i} className="flex gap-2 rounded bg-amber-50 px-2.5 py-1.5 text-xs text-amber-900">
                      <span aria-hidden="true" className="text-amber-500">•</span>
                      <span>{c}</span>
                    </li>
                  ))}
                </ul>
              )}

              <p className="mt-3 text-xs text-slate-600">{cls.basis}</p>

              {cls.annexA.length > 0 && (
                <p className="mt-2 text-xs text-indigo-700">
                  ISO connection: {cls.annexA.join(', ')} — reference controls, decided through the SoA.
                </p>
              )}

              {onSelect && (
                <button
                  type="button"
                  onClick={() => onSelect(item.id)}
                  className="mt-3 rounded-lg border border-slate-300 bg-white px-3 py-1.5 text-xs font-medium text-slate-700 hover:bg-slate-50"
                >
                  Open assessment item
                </button>
              )}
            </li>
          ))}
        </ul>
      )}

      <p className="text-xs text-slate-500">
        {GEN_CROSS_FRAMEWORK_IDS.length} of 22 items carry non-ISO material.{' '}
        <a href={ISO_SOURCES.standard.url} target="_blank" rel="noopener noreferrer" className="underline hover:text-slate-700">
          ISO/IEC 27001:2022
        </a>{' '}
        ({ISO_SOURCES.standard.version}) does not define notification deadlines, consent
        mechanics, or regulator-specific forms.
      </p>
    </section>
  );
}

export { GEN_ISO_CLASSIFICATION, ISO_CATEGORIES };
