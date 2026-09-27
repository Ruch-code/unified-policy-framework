import { useMemo, useState } from 'react';
import { ANNEX_A_CONTROLS, ANNEX_A_THEMES } from '../data/iso27001AnnexA.js';
import {
  DECISION, IMPLEMENTATION_STATUS, STATUS_LABELS,
  validateControl, weakJustifications, incompleteNecessary, computeStats,
} from '../data/iso27001Soa.js';
import { ISO_SOURCES } from '../data/iso27001.js';

/**
 * Interactive Statement of Applicability workspace.
 *
 * Replaces the previous static card, whose `sel: selected/optional/excluded`
 * values are now treated as advisory suggestions rather than decisions.
 *
 * Audit defensibility rules enforced here:
 *  - every control starts undecided
 *  - exclusion requires a written justification
 *  - custom controls are allowed with rationale
 *  - each save creates a new version
 */
export default function Iso27001SoaWorkspace({ soaState, onPatchControl, onAddCustom, onRemoveCustom, onCommit }) {
  const [filter, setFilter] = useState('undecided');
  const [theme, setTheme] = useState('all');
  const [openId, setOpenId] = useState(null);
  const [note, setNote] = useState('');
  const [approver, setApprover] = useState('');
  const [customOpen, setCustomOpen] = useState(false);
  const [draft, setDraft] = useState({ title: '', purpose: '', rationale: '', owner: '' });
  const [customErr, setCustomErr] = useState(null);

  const stats = useMemo(() => computeStats(soaState), [soaState]);
  const weak = useMemo(() => weakJustifications(soaState), [soaState]);
  const incomplete = useMemo(() => incompleteNecessary(soaState), [soaState]);

  const rows = useMemo(() => {
    return ANNEX_A_CONTROLS.filter(c => {
      if (theme !== 'all' && c.theme !== theme) return false;
      if (filter === 'all') return true;
      const d = soaState.controls[c.id]?.decision || DECISION.undecided;
      if (filter === 'undecided') return d === DECISION.undecided;
      if (filter === 'necessary') return d === DECISION.necessary;
      if (filter === 'notNecessary') return d === DECISION.notNecessary;
      if (filter === 'incomplete') return d === DECISION.necessary && (!soaState.controls[c.id]?.owner || !soaState.controls[c.id]?.evidence);
      return true;
    });
  }, [filter, theme, soaState]);

  const countFor = (f) => {
    const t = { undecided: 0, necessary: 0, notNecessary: 0, incomplete: 0 };
    ANNEX_A_CONTROLS.forEach(c => {
      const r = soaState.controls[c.id];
      const d = r?.decision || DECISION.undecided;
      if (d === DECISION.undecided) t.undecided += 1;
      else if (d === DECISION.necessary) { t.necessary += 1; if (!r.owner || !r.evidence) t.incomplete += 1; }
      else t.notNecessary += 1;
    });
    return t[f];
  };

  const submitCustom = (e) => {
    e.preventDefault();
    const res = onAddCustom(draft);
    if (res?.error) { setCustomErr(res.error); return; }
    setCustomErr(null);
    setDraft({ title: '', purpose: '', rationale: '', owner: '' });
    setCustomOpen(false);
  };

  return (
    <div className="space-y-6">
      <header className="rounded-xl border border-slate-200 bg-white p-4">
        <h3 className="text-sm font-semibold text-slate-900">
          Statement of Applicability — ISO/IEC 27001:2022 Clause 6.1.3 d
        </h3>
        <p className="mt-1 text-sm text-slate-700">
          After choosing risk-treatment controls, compare the selection against Annex A to verify
          nothing relevant has been omitted, then record the result here. Every row needs a decision
          and, when excluded, a written justification.
        </p>
        <p className="mt-2 text-xs text-slate-500">
          Progress reflects the controls{' '}
          <em>you</em> have determined necessary — there is no 93-control completion score, because
          excluding a control with justification is a correct outcome, not a gap.
        </p>
      </header>

      <ScopePanel soaState={soaState} onPatchScope={(p) => onPatchControl('__scope__', { scope: p })} />

      <dl className="grid grid-cols-2 gap-3 sm:grid-cols-4">
        <Stat label="Decisions made" value={`${stats.necessary + stats.notNecessary}/${stats.annexTotal}`} sub={`${stats.decisionCoverage}% of reference controls`} />
        <Stat label="Necessary" value={stats.necessary} sub={`${stats.customControls} custom control${stats.customControls === 1 ? '' : 's'}`} tone="emerald" />
        <Stat label="Excluded with justification" value={stats.notNecessary} sub="Each needs a written reason" tone="slate" />
        <Stat label="Implementation rate" value={`${stats.implementationRate}%`} sub={`of ${stats.applicableTotal} applicable controls`} tone="indigo" />
      </dl>

      {(weak.length > 0 || incomplete.length > 0) && (
        <div role="alert" className="space-y-2 rounded-xl border border-amber-300 bg-amber-50 p-4">
          <p className="text-sm font-semibold text-amber-900">Defensibility gaps</p>
          {weak.length > 0 && (
            <p className="text-xs text-amber-900">
              {weak.length} exclusion{weak.length === 1 ? '' : 's'} lack a meaningful justification:{' '}
              {weak.slice(0, 6).join(', ')}{weak.length > 6 ? '…' : ''}. An auditor will challenge these.
            </p>
          )}
          {incomplete.length > 0 && (
            <p className="text-xs text-amber-900">
              {incomplete.length} necessary control{incomplete.length === 1 ? '' : 's'} missing an owner or
              evidence reference: {incomplete.slice(0, 6).map(i => i.id).join(', ')}
              {incomplete.length > 6 ? '…' : ''}.
            </p>
          )}
        </div>
      )}

      <div className="flex flex-wrap items-end gap-2">
        <div role="group" aria-label="Filter decisions" className="flex flex-wrap gap-1.5">
          {[
            { k: 'undecided', l: `Undecided (${countFor('undecided')})` },
            { k: 'necessary', l: `Necessary (${countFor('necessary')})` },
            { k: 'notNecessary', l: `Excluded (${countFor('notNecessary')})` },
            { k: 'incomplete', l: `Needs owner/evidence (${countFor('incomplete')})` },
            { k: 'all', l: `All (${ANNEX_A_CONTROLS.length})` },
          ].map(f => (
            <button
              key={f.k}
              type="button"
              onClick={() => setFilter(f.k)}
              aria-pressed={filter === f.k}
              className={`rounded-lg px-3 py-1.5 text-xs font-medium ${
                filter === f.k ? 'bg-slate-900 text-white' : 'border border-slate-300 bg-white text-slate-700 hover:bg-slate-50'
              }`}
            >
              {f.l}
            </button>
          ))}
        </div>
        <div className="ml-auto">
          <label htmlFor="soa-theme" className="sr-only">Filter by theme</label>
          <select
            id="soa-theme"
            value={theme}
            onChange={e => setTheme(e.target.value)}
            className="rounded-lg border border-slate-300 px-3 py-1.5 text-xs"
          >
            <option value="all">All themes</option>
            {ANNEX_A_THEMES.map(t => <option key={t.id} value={t.id}>{t.id} {t.name}</option>)}
          </select>
        </div>
      </div>

      <ul className="space-y-2">
        {rows.map(c => (
          <SoaRow
            key={c.id}
            control={c}
            record={soaState.controls[c.id]}
            open={openId === c.id}
            onToggle={() => setOpenId(openId === c.id ? null : c.id)}
            onPatch={(p) => onPatchControl(c.id, p)}
          />
        ))}
      </ul>

      {rows.length === 0 && (
        <p className="rounded-lg border border-dashed border-slate-300 p-6 text-center text-sm text-slate-600">
          No controls match this filter. {filter === 'incomplete'
            ? 'Every necessary control has an owner and an evidence reference.'
            : 'Try a different decision filter or theme.'}
        </p>
      )}

      <section className="rounded-xl border border-slate-200 bg-white p-4">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <div>
            <h4 className="text-sm font-semibold text-slate-900">Custom controls</h4>
            <p className="mt-0.5 text-xs text-slate-600">
              Controls you determined necessary that are not in Annex A. Clause 6.1.3 expects
              omissions from Annex A to be recorded.
            </p>
          </div>
          <button
            type="button"
            onClick={() => setCustomOpen(v => !v)}
            aria-expanded={customOpen}
            className="rounded-lg border border-slate-300 bg-white px-3 py-1.5 text-xs font-medium text-slate-700 hover:bg-slate-50"
          >
            {customOpen ? 'Cancel' : 'Add custom control'}
          </button>
        </div>

        {soaState.customControls.length > 0 && (
          <ul className="mt-3 space-y-2">
            {soaState.customControls.map(cc => (
              <li key={cc.id} className="rounded-lg border border-slate-200 bg-slate-50 p-3">
                <div className="flex flex-wrap items-start justify-between gap-2">
                  <div className="min-w-0">
                    <p className="text-sm font-medium text-slate-900">
                      <span className="font-mono text-xs text-slate-500">{cc.id}</span> {cc.title}
                    </p>
                    <p className="mt-0.5 text-xs text-slate-600">{cc.purpose}</p>
                    <p className="mt-1 text-xs text-slate-500">Rationale: {cc.rationale}</p>
                  </div>
                  <div className="flex shrink-0 items-center gap-2">
                    <label htmlFor={`cc-status-${cc.id}`} className="sr-only">Implementation status for {cc.title}</label>
                    <select
                      id={`cc-status-${cc.id}`}
                      value={cc.status}
                      onChange={e => onPatchControl(`__custom__:${cc.id}`, { status: e.target.value })}
                      className="rounded border border-slate-300 px-2 py-1 text-xs"
                    >
                      {Object.entries(STATUS_LABELS)
                        .filter(([k]) => k !== IMPLEMENTATION_STATUS.notApplicable)
                        .map(([k, v]) => <option key={k} value={k}>{v}</option>)}
                    </select>
                    <button
                      type="button"
                      onClick={() => onRemoveCustom(cc.id)}
                      className="rounded border border-red-200 px-2 py-1 text-xs text-red-700 hover:bg-red-50"
                    >
                      Remove
                    </button>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        )}

        {customOpen && (
          <form onSubmit={submitCustom} className="mt-3 space-y-3 rounded-lg border border-slate-300 bg-slate-50 p-3">
            <div>
              <label htmlFor="cc-title" className="block text-xs font-medium text-slate-700">Title</label>
              <input id="cc-title" value={draft.title} onChange={e => setDraft(d => ({ ...d, title: e.target.value }))} className="mt-1 w-full rounded border border-slate-300 px-3 py-1.5 text-sm" required />
            </div>
            <div>
              <label htmlFor="cc-purpose" className="block text-xs font-medium text-slate-700">What it does</label>
              <textarea id="cc-purpose" rows={2} value={draft.purpose} onChange={e => setDraft(d => ({ ...d, purpose: e.target.value }))} className="mt-1 w-full rounded border border-slate-300 px-3 py-1.5 text-sm" required />
            </div>
            <div>
              <label htmlFor="cc-rationale" className="block text-xs font-medium text-slate-700">Why it is necessary (required)</label>
              <textarea id="cc-rationale" rows={2} value={draft.rationale} onChange={e => setDraft(d => ({ ...d, rationale: e.target.value }))} className="mt-1 w-full rounded border border-slate-300 px-3 py-1.5 text-sm" required />
            </div>
            <div>
              <label htmlFor="cc-owner" className="block text-xs font-medium text-slate-700">Owner</label>
              <input id="cc-owner" value={draft.owner} onChange={e => setDraft(d => ({ ...d, owner: e.target.value }))} className="mt-1 w-full rounded border border-slate-300 px-3 py-1.5 text-sm" />
            </div>
            {customErr && <p role="alert" className="text-xs font-medium text-red-700">{customErr}</p>}
            <button type="submit" className="rounded-lg bg-slate-900 px-3 py-1.5 text-xs font-medium text-white hover:bg-slate-800">
              Save custom control
            </button>
          </form>
        )}
      </section>

      <section className="rounded-xl border border-slate-200 bg-white p-4">
        <h4 className="text-sm font-semibold text-slate-900">Version history</h4>
        <p className="mt-0.5 text-xs text-slate-600">
          Commit a version when the SoA is reviewed and approved. Clause 9.3 expects this evidence
          to show the SoA is kept current.
        </p>

        {soaState.history.length === 0 ? (
          <p className="mt-3 rounded-lg border border-dashed border-slate-300 p-4 text-center text-sm text-slate-600">
            No versions committed yet. Your decisions are saved as you work; commit a version to
            record a reviewed snapshot.
          </p>
        ) : (
          <ol className="mt-3 space-y-2">
            {[...soaState.history].reverse().map(h => (
              <li key={h.version} className="rounded-lg border border-slate-200 bg-slate-50 p-3 text-xs">
                <p className="font-medium text-slate-900">
                  Version {h.version} · {h.stats.necessary} necessary · {h.stats.notNecessary} excluded
                  {h.approvedBy ? ` · approved by ${h.approvedBy}` : ''}
                </p>
                <p className="mt-0.5 text-slate-600">{h.note || 'No note'} — {new Date(h.at).toLocaleString()}</p>
              </li>
            ))}
          </ol>
        )}

        <div className="mt-3 flex flex-wrap items-end gap-2">
          <div className="min-w-[12rem] flex-1">
            <label htmlFor="soa-note" className="block text-xs font-medium text-slate-700">Review note</label>
            <input id="soa-note" value={note} onChange={e => setNote(e.target.value)} placeholder="e.g. Annual ISMS review, approved by board" className="mt-1 w-full rounded border border-slate-300 px-3 py-1.5 text-sm" />
          </div>
          <div>
            <label htmlFor="soa-approver" className="block text-xs font-medium text-slate-700">Approved by</label>
            <input id="soa-approver" value={approver} onChange={e => setApprover(e.target.value)} className="mt-1 rounded border border-slate-300 px-3 py-1.5 text-sm" />
          </div>
          <button
            type="button"
            onClick={() => { onCommit({ note, approvedBy: approver }); setNote(''); setApprover(''); }}
            disabled={soaState.history.length === 0 && (stats.necessary + stats.notNecessary === 0)}
            className="rounded-lg bg-slate-900 px-3 py-1.5 text-xs font-medium text-white hover:bg-slate-800 disabled:cursor-not-allowed disabled:opacity-40"
          >
            Commit version
          </button>
        </div>
      </section>

      <p className="text-xs text-slate-500">
        Reference controls paraphrased for this app; verify against{' '}
        <a href={ISO_SOURCES.guidance.url} target="_blank" rel="noopener noreferrer" className="underline hover:text-slate-700">ISO/IEC 27002:2022</a>{' '}
        and the licensed standard ({ISO_SOURCES.standard.version}).
      </p>
    </div>
  );
}

function ScopePanel({ soaState, onPatchScope }) {
  const scope = soaState.scope || {};
  return (
    <section className="rounded-xl border border-slate-200 bg-white p-4">
      <h4 className="text-sm font-semibold text-slate-900">ISMS scope — Clause 4.3</h4>
      <p className="mt-0.5 text-xs text-slate-600">
        The scope statement bounds the whole ISMS, including the SoA below. Define it first.
      </p>
      <div className="mt-3 space-y-3">
        <div>
          <label htmlFor="scope-statement" className="block text-xs font-medium text-slate-700">Scope statement</label>
          <textarea
            id="scope-statement"
            rows={3}
            value={scope.statement || ''}
            onChange={e => onPatchScope({ statement: e.target.value })}
            placeholder="Organisational units, locations, systems, information and processes in scope…"
            className="mt-1 w-full rounded border border-slate-300 px-3 py-1.5 text-sm"
          />
        </div>
        <div className="grid gap-3 sm:grid-cols-2">
          <div>
            <label htmlFor="scope-owner" className="block text-xs font-medium text-slate-700">Scope owner</label>
            <input id="scope-owner" value={scope.owner || ''} onChange={e => onPatchScope({ owner: e.target.value })} className="mt-1 w-full rounded border border-slate-300 px-3 py-1.5 text-sm" />
          </div>
          <div>
            <label htmlFor="scope-review" className="block text-xs font-medium text-slate-700">Next scope review</label>
            <input id="scope-review" type="date" value={scope.reviewDate || ''} onChange={e => onPatchScope({ reviewDate: e.target.value })} className="mt-1 w-full rounded border border-slate-300 px-3 py-1.5 text-sm" />
          </div>
        </div>
      </div>
    </section>
  );
}

function Stat({ label, value, sub, tone = 'slate' }) {
  const tones = { slate: 'text-slate-900', emerald: 'text-emerald-700', indigo: 'text-indigo-700' };
  return (
    <div className="rounded-lg border border-slate-200 bg-white p-3">
      <dt className="text-xs text-slate-600">{label}</dt>
      <dd className={`mt-1 text-2xl font-semibold tabular-nums ${tones[tone]}`}>{value}</dd>
      <dd className="text-[0.7rem] text-slate-500">{sub}</dd>
    </div>
  );
}

function SoaRow({ control, record, open, onToggle, onPatch }) {
  const [rationale, setRationale] = useState(record?.rationale || '');
  const decision = record?.decision || DECISION.undecided;
  const errors = validateControl(record);
  const isExcluded = decision === DECISION.notNecessary;

  return (
    <li className="rounded-lg border border-slate-200 bg-white">
      <button type="button" onClick={onToggle} aria-expanded={open} className="flex w-full items-start gap-3 px-4 py-3 text-left hover:bg-slate-50">
        <span className="mt-0.5 shrink-0 rounded bg-indigo-100 px-1.5 py-0.5 font-mono text-xs font-semibold text-indigo-800">{control.id}</span>
        <span className="min-w-0 flex-1">
          <span className="block text-sm font-medium text-slate-900">{control.title}</span>
          {record?.rationale && <span className="mt-0.5 block truncate text-xs text-slate-500">{record.rationale}</span>}
        </span>
        <DecisionPill decision={decision} status={record?.status} />
      </button>

      {open && (
        <div className="space-y-4 border-t border-slate-200 px-4 py-4">
          <p className="text-sm text-slate-700">{control.purpose}</p>
          <p className="text-xs text-slate-500">Supports clause {control.clauses.join(', ')}. Reference control — inclusion is a risk-based decision.</p>

          <fieldset>
            <legend className="text-xs font-medium text-slate-700">Decision (Clause 6.1.3 d)</legend>
            <div className="mt-1.5 flex flex-wrap gap-2">
              <button type="button" onClick={() => onPatch({ decision: DECISION.necessary })} aria-pressed={decision === DECISION.necessary} className={`rounded-lg border px-3 py-1.5 text-xs font-medium ${decision === DECISION.necessary ? 'border-emerald-500 bg-emerald-100 text-emerald-900' : 'border-slate-300 bg-white text-slate-700 hover:bg-slate-50'}`}>
                Necessary
              </button>
              <button type="button" onClick={() => onPatch({ decision: DECISION.notNecessary })} aria-pressed={isExcluded} className={`rounded-lg border px-3 py-1.5 text-xs font-medium ${isExcluded ? 'border-slate-500 bg-slate-200 text-slate-900' : 'border-slate-300 bg-white text-slate-700 hover:bg-slate-50'}`}>
                Not necessary
              </button>
            </div>
          </fieldset>

          <div>
            <label htmlFor={`soa-rat-${control.id}`} className="block text-xs font-medium text-slate-700">
              {isExcluded ? 'Justification for exclusion (required)' : 'Rationale'}
            </label>
            <textarea
              id={`soa-rat-${control.id}`}
              rows={2}
              value={rationale}
              onChange={e => setRationale(e.target.value)}
              onBlur={() => onPatch({ rationale })}
              placeholder={isExcluded ? 'Why does this reference control not apply to your ISMS scope?' : 'Which identified risk does this control treat?'}
              className="mt-1 w-full rounded border border-slate-300 px-3 py-2 text-sm"
              aria-describedby={`soa-rat-err-${control.id}`}
            />
            {errors.length > 0 && (
              <p id={`soa-rat-err-${control.id}`} className="mt-1 text-xs font-medium text-red-700">
                {errors[0]}
              </p>
            )}
          </div>

          {decision === DECISION.necessary && (
            <div className="grid gap-3 sm:grid-cols-2">
              <div>
                <label htmlFor={`soa-status-${control.id}`} className="block text-xs font-medium text-slate-700">Implementation status</label>
                <select id={`soa-status-${control.id}`} value={record?.status || IMPLEMENTATION_STATUS.notStarted} onChange={e => onPatch({ status: e.target.value })} className="mt-1 w-full rounded border border-slate-300 px-3 py-1.5 text-sm">
                  {Object.entries(STATUS_LABELS).map(([k, v]) => <option key={k} value={k}>{v}</option>)}
                </select>
              </div>
              <div>
                <label htmlFor={`soa-owner-${control.id}`} className="block text-xs font-medium text-slate-700">Control owner</label>
                <input id={`soa-owner-${control.id}`} value={record?.owner || ''} onChange={e => onPatch({ owner: e.target.value })} className="mt-1 w-full rounded border border-slate-300 px-3 py-1.5 text-sm" />
              </div>
              <div className="sm:col-span-2">
                <label htmlFor={`soa-ev-${control.id}`} className="block text-xs font-medium text-slate-700">Evidence reference</label>
                <input id={`soa-ev-${control.id}`} value={record?.evidence || ''} onChange={e => onPatch({ evidence: e.target.value })} placeholder="Document, ticket, or system where proof lives" className="mt-1 w-full rounded border border-slate-300 px-3 py-1.5 text-sm" />
              </div>
              <div>
                <label htmlFor={`soa-risk-${control.id}`} className="block text-xs font-medium text-slate-700">Related risk(s)</label>
                <input id={`soa-risk-${control.id}`} value={record?.relatedRisks || ''} onChange={e => onPatch({ relatedRisks: e.target.value })} className="mt-1 w-full rounded border border-slate-300 px-3 py-1.5 text-sm" />
              </div>
              <div>
                <label htmlFor={`soa-rev-${control.id}`} className="block text-xs font-medium text-slate-700">Reviewer / review date</label>
                <input id={`soa-rev-${control.id}`} type="date" value={record?.reviewDate || ''} onChange={e => onPatch({ reviewer: record?.reviewer || '', reviewDate: e.target.value })} className="mt-1 w-full rounded border border-slate-300 px-3 py-1.5 text-sm" />
              </div>
            </div>
          )}
        </div>
      )}
    </li>
  );
}

function DecisionPill({ decision, status }) {
  if (decision === DECISION.undecided) {
    return <span className="shrink-0 rounded bg-amber-100 px-2 py-0.5 text-xs font-medium text-amber-800">Undecided</span>;
  }
  if (decision === DECISION.notNecessary) {
    return <span className="shrink-0 rounded bg-slate-200 px-2 py-0.5 text-xs font-medium text-slate-700">Excluded</span>;
  }
  return (
    <span className="flex shrink-0 flex-col items-end gap-0.5">
      <span className="rounded bg-emerald-100 px-2 py-0.5 text-xs font-medium text-emerald-800">Necessary</span>
      {status && status !== IMPLEMENTATION_STATUS.notStarted && (
        <span className="text-[0.65rem] text-slate-500">{STATUS_LABELS[status]}</span>
      )}
    </span>
  );
}
