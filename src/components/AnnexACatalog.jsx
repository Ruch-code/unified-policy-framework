import { useMemo, useState } from 'react';
import { ANNEX_A_CONTROLS, ANNEX_A_THEMES } from '../data/iso27001AnnexA.js';
import { ISO_SOURCES } from '../data/iso27001.js';

/**
 * Reference catalog of all 93 Annex A controls.
 *
 * Critical framing, stated in the UI rather than implied:
 *   Annex A controls are REFERENCE controls. ISO does not require an
 *   organisation to implement every one of them. Necessity is determined
 *   through risk assessment and recorded in the Statement of Applicability.
 */
export default function AnnexACatalog({ soaState, onDecide, compact = false }) {
  const [query, setQuery] = useState('');
  const [theme, setTheme] = useState('all');
  const [open, setOpen] = useState(null);
  const [showNecessaryOnly, setShowNecessaryOnly] = useState(false);

  const results = useMemo(() => {
    const q = query.trim().toLowerCase();
    return ANNEX_A_CONTROLS.filter(c => {
      if (theme !== 'all' && c.theme !== theme) return false;
      if (showNecessaryOnly) {
        const d = soaState?.controls?.[c.id]?.decision;
        if (d !== 'necessary') return false;
      }
      if (!q) return true;
      return (
        c.id.toLowerCase().includes(q) ||
        c.title.toLowerCase().includes(q) ||
        c.purpose.toLowerCase().includes(q)
      );
    });
  }, [query, theme, showNecessaryOnly, soaState]);

  const decided = useMemo(() => {
    const t = { necessary: 0, notNecessary: 0, undecided: 0 };
    ANNEX_A_CONTROLS.forEach(c => {
      const d = soaState?.controls?.[c.id]?.decision;
      if (d === 'necessary' || d === 'notNecessary') t[d] += 1;
      else t.undecided += 1;
    });
    return t;
  }, [soaState]);

  return (
    <section aria-labelledby="annexa-catalog-heading" className="space-y-4">
      <div className="rounded-xl border border-indigo-200 bg-indigo-50/60 p-4">
        <h3 id="annexa-catalog-heading" className="text-sm font-semibold text-indigo-900">
          Reference controls, not a compliance checklist
        </h3>
        <p className="mt-1 text-sm text-indigo-800">
          Annex A lists {ANNEX_A_CONTROLS.length} reference controls. ISO/IEC 27001:2022 does{' '}
          <strong>not</strong> require an organisation to implement every one. You determine which are
          necessary from your own risk assessment (Clause 6.1.2), then record each decision with a
          written justification in the Statement of Applicability (Clause 6.1.3 d).
        </p>
        <p className="mt-2 text-xs text-indigo-700">
          Summaries below are original plain-language paraphrases, not standard text.{' '}
          <a href={ISO_SOURCES.standard.url} target="_blank" rel="noopener noreferrer" className="underline hover:text-indigo-900">
            Verify against the licensed standard
          </a>{' '}
          ({ISO_SOURCES.standard.version}).
        </p>
      </div>

      <dl className="grid grid-cols-3 gap-3">
        {[
          { label: 'Necessary (your decision)', value: decided.necessary, tone: 'text-emerald-700' },
          { label: 'Excluded with justification', value: decided.notNecessary, tone: 'text-slate-600' },
          { label: 'Not yet decided', value: decided.undecided, tone: 'text-amber-700' },
        ].map(s => (
          <div key={s.label} className="rounded-lg border border-slate-200 bg-white p-3">
            <dt className="text-xs text-slate-600">{s.label}</dt>
            <dd className={`mt-1 text-2xl font-semibold tabular-nums ${s.tone}`}>{s.value}</dd>
          </div>
        ))}
      </dl>

      <div className="flex flex-wrap items-end gap-3">
        <div className="min-w-[14rem] flex-1">
          <label htmlFor="annexa-search" className="block text-xs font-medium text-slate-700">
            Search all {ANNEX_A_CONTROLS.length} controls
          </label>
          <input
            id="annexa-search"
            type="search"
            value={query}
            onChange={e => setQuery(e.target.value)}
            placeholder="e.g. encryption, access, logging, A.8.5"
            className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2 text-sm"
          />
        </div>
        <div>
          <label htmlFor="annexa-theme" className="block text-xs font-medium text-slate-700">
            Theme
          </label>
          <select
            id="annexa-theme"
            value={theme}
            onChange={e => setTheme(e.target.value)}
            className="mt-1 rounded-lg border border-slate-300 px-3 py-2 text-sm"
          >
            <option value="all">All themes ({ANNEX_A_CONTROLS.length})</option>
            {ANNEX_A_THEMES.map(t => (
              <option key={t.id} value={t.id}>{t.id} {t.name} ({t.count})</option>
            ))}
          </select>
        </div>
        <label className="flex items-center gap-2 pb-2 text-sm text-slate-700">
          <input
            type="checkbox"
            checked={showNecessaryOnly}
            onChange={e => setShowNecessaryOnly(e.target.checked)}
            className="h-4 w-4 rounded border-slate-300"
          />
          Only necessary
        </label>
      </div>

      <p aria-live="polite" className="text-sm text-slate-600">
        Showing {results.length} of {ANNEX_A_CONTROLS.length} reference controls
      </p>

      <ul className="space-y-2">
        {results.map(c => {
          const rec = soaState?.controls?.[c.id];
          const decision = rec?.decision;
          const expanded = open === c.id;
          return (
            <li key={c.id} className="rounded-lg border border-slate-200 bg-white">
              <button
                type="button"
                onClick={() => setOpen(expanded ? null : c.id)}
                aria-expanded={expanded}
                className="flex w-full items-start gap-3 px-4 py-3 text-left hover:bg-slate-50"
              >
                <span className="mt-0.5 shrink-0 rounded bg-indigo-100 px-1.5 py-0.5 font-mono text-xs font-semibold text-indigo-800">
                  {c.id}
                </span>
                <span className="min-w-0 flex-1">
                  <span className="block text-sm font-medium text-slate-900">{c.title}</span>
                  {!compact && (
                    <span className="mt-0.5 block text-xs text-slate-500">
                      {c.purpose.split('.')[0]}.
                    </span>
                  )}
                </span>
                <DecisionBadge decision={decision} />
              </button>

              {expanded && (
                <div className="space-y-4 border-t border-slate-200 px-4 py-4">
                  <p className="text-sm text-slate-700">{c.purpose}</p>
                  <p className="text-xs text-slate-500">
                    Original paraphrase, not standard text. See{' '}
                    <a href={ISO_SOURCES.guidance.url} target="_blank" rel="noopener noreferrer" className="underline hover:text-slate-700">
                      ISO/IEC 27002:2022
                    </a>{' '}
                    for the guidance behind this control.
                  </p>
                  <div className="flex flex-wrap gap-2 text-xs">
                    <span className="rounded bg-slate-100 px-2 py-1 text-slate-700">
                      Supports clause {c.clauses.join(', ')}
                    </span>
                    {c.risks.slice(0, 4).map(r => (
                      <span key={r} className="rounded bg-slate-50 px-2 py-1 text-slate-500">risk: {r}</span>
                    ))}
                  </div>
                  {onDecide && (
                    <QuickDecide controlId={c.id} record={rec} onDecide={onDecide} />
                  )}
                </div>
              )}
            </li>
          );
        })}
      </ul>

      {results.length === 0 && (
        <p className="rounded-lg border border-dashed border-slate-300 p-6 text-center text-sm text-slate-600">
          No control matches “{query}”. Annex A has {ANNEX_A_CONTROLS.length} controls across{' '}
          {ANNEX_A_THEMES.length} themes — try a broader term or clear the theme filter.
        </p>
      )}
    </section>
  );
}

function DecisionBadge({ decision }) {
  if (decision === 'necessary') {
    return <span className="shrink-0 rounded bg-emerald-100 px-2 py-0.5 text-xs font-medium text-emerald-800">Necessary</span>;
  }
  if (decision === 'notNecessary') {
    return <span className="shrink-0 rounded bg-slate-200 px-2 py-0.5 text-xs font-medium text-slate-700">Excluded</span>;
  }
  return <span className="shrink-0 rounded bg-amber-100 px-2 py-0.5 text-xs font-medium text-amber-800">Undecided</span>;
}

function QuickDecide({ controlId, record, onDecide }) {
  const [open, setOpen] = useState(false);
  const [rationale, setRationale] = useState(record?.rationale || '');
  const [touched, setTouched] = useState(false);

  const rationaleMissing = record?.decision === 'notNecessary' && rationale.trim().length < 12;

  return (
    <div className="rounded-lg border border-slate-300 bg-slate-50 p-3">
      {record?.decision && !open ? (
        <div className="flex flex-wrap items-center justify-between gap-2">
          <p className="text-xs text-slate-700">
            {record.decision === 'necessary' ? 'Marked necessary' : 'Marked excluded'} —{' '}
            {record.rationale ? `“${record.rationale}”` : 'no justification recorded'}
          </p>
          <button type="button" onClick={() => setOpen(true)} className="text-xs font-medium text-indigo-700 underline hover:text-indigo-900">
            Edit decision
          </button>
        </div>
      ) : (
        <div className="space-y-3">
          <p className="text-xs font-medium text-slate-700">Record your decision for this control</p>
          <div className="flex flex-wrap gap-2">
            <button
              type="button"
              onClick={() => { onDecide(controlId, { decision: 'necessary' }); setOpen(true); }}
              className="rounded-lg border border-emerald-300 bg-emerald-50 px-3 py-1.5 text-xs font-medium text-emerald-800 hover:bg-emerald-100"
            >
              Necessary
            </button>
            <button
              type="button"
              onClick={() => { onDecide(controlId, { decision: 'notNecessary' }); setOpen(true); }}
              className="rounded-lg border border-slate-300 bg-white px-3 py-1.5 text-xs font-medium text-slate-700 hover:bg-slate-100"
            >
              Not necessary
            </button>
          </div>
          <div>
            <label htmlFor={`rationale-${controlId}`} className="block text-xs font-medium text-slate-700">
              {record?.decision === 'notNecessary' ? 'Justification for exclusion (required)' : 'Rationale'}
            </label>
            <textarea
              id={`rationale-${controlId}`}
              rows={2}
              value={rationale}
              onChange={e => { setRationale(e.target.value); setTouched(true); }}
              onBlur={() => onDecide(controlId, { rationale })}
              className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2 text-sm"
              placeholder={record?.decision === 'notNecessary'
                ? 'Explain why this reference control does not apply to your ISMS scope.'
                : 'Explain how this control addresses a risk from your assessment.'}
              aria-invalid={touched && rationaleMissing}
            />
            {touched && rationaleMissing && (
              <p role="alert" className="mt-1 text-xs font-medium text-red-700">
                An exclusion cannot be saved without a written justification.
              </p>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
