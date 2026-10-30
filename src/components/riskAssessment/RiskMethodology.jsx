import TreatmentVisual from './TreatmentVisual.jsx';
import { useState } from 'react';
import {
  METHOD_ALIGNMENT, METHOD_STEPS, CADENCE, CALLOUTS, LIKELIHOOD, IMPACT, IMPACT_DIMENSIONS,
  BANDS, bandFor, INHERENT_VS_RESIDUAL, APPETITE, TREATMENTS, WORKFLOW, REQUIRED_FIELDS,
} from '../../data/riskAssessment/methodology';
import { score, BandBadge, sectionCls, h3Cls, leadCls, inputCls } from './riskUtils.jsx';

export function MethodologySection() {
  return (
    <section id="ra-methodology" className={sectionCls}>
      <h3 className={h3Cls}>1. Methodology</h3>
      <p className={leadCls}>Aligned to: {METHOD_ALIGNMENT.join('; ')}.</p>

      <ol className="grid gap-3 md:grid-cols-3">
        {METHOD_STEPS.map((s) => (
          <li key={s.step} className="rounded-xl border border-surface-200 dark:border-surface-dark-200 p-4 bg-surface-50 dark:bg-slate-900/40">
            <div className="flex items-center gap-2 mb-1">
              <span className="inline-flex w-6 h-6 rounded-full bg-indigo-600 text-white text-xs font-bold items-center justify-center shrink-0">{s.step}</span>
              <h4 className="font-semibold text-sm text-navy-900 dark:text-text-dark-primary">{s.title}</h4>
            </div>
            <p className="text-xs text-navy-600 dark:text-text-dark-secondary">{s.detail}</p>
            <p className="text-[11px] mt-2 text-emerald-700 dark:text-emerald-300"><strong>Output:</strong> {s.output}</p>
          </li>
        ))}
      </ol>

      <div className="grid gap-4 md:grid-cols-2 mt-6">
        <div className="rounded-xl border border-indigo-200 dark:border-indigo-900/50 bg-indigo-50 dark:bg-indigo-950/30 p-4">
          <h4 className="font-semibold text-sm text-indigo-900 dark:text-indigo-200 mb-2">Cadence</h4>
          <p className="text-sm text-indigo-900 dark:text-indigo-200">{CADENCE.periodic} Re-assess on significant change:</p>
          <ul className="list-disc pl-5 mt-1 text-xs text-indigo-900 dark:text-indigo-200 space-y-0.5">
            {CADENCE.triggers.map((t) => <li key={t}>{t}</li>)}
          </ul>
          <p className="text-xs mt-2 font-semibold text-indigo-900 dark:text-indigo-200">{CADENCE.sla}</p>
        </div>
        <div className="space-y-3">
          {CALLOUTS.map((c) => (
            <div key={c.ref} className="rounded-xl border border-amber-300 dark:border-amber-800 bg-amber-50 dark:bg-amber-950/30 p-4">
              <h4 className="font-semibold text-sm text-amber-900 dark:text-amber-200">{c.ref}: {c.title}</h4>
              <p className="text-xs mt-1 text-amber-900 dark:text-amber-200">{c.text}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export function RubricSection() {
  const [l, setL] = useState(3);
  const [i, setI] = useState(4);
  const [rl, setRl] = useState(1);
  const [ri, setRi] = useState(2);
  const inherent = score(l, i);
  const residual = score(rl, ri);
  const aboveAppetite = residual >= 10;

  return (
    <section id="ra-rubric" className={sectionCls}>
      <h3 className={h3Cls}>2. Scoring rubric</h3>
      <p className={leadCls}>Score = Likelihood x Impact on 1 to 5 scales. Click a cell in the heatmap to set the inherent score, then set the residual score you expect once treatment is fully in place.</p>

      <div className="grid gap-6 lg:grid-cols-2">
        <div>
          <div className="overflow-x-auto">
            <table className="w-full text-xs border-separate" style={{ borderSpacing: 3 }} aria-label="Likelihood by impact heatmap">
              <thead>
                <tr>
                  <th className="text-left text-navy-600 dark:text-text-dark-secondary font-medium p-1">L \ I</th>
                  {IMPACT.map((im) => <th key={im.value} className="text-navy-600 dark:text-text-dark-secondary font-medium p-1" title={im.label}>{im.value}</th>)}
                </tr>
              </thead>
              <tbody>
                {[...LIKELIHOOD].reverse().map((lk) => (
                  <tr key={lk.value}>
                    <th className="text-left text-navy-600 dark:text-text-dark-secondary font-medium p-1 whitespace-nowrap" title={lk.label}>{lk.value}</th>
                    {IMPACT.map((im) => {
                      const s = lk.value * im.value;
                      const b = bandFor(s);
                      const active = lk.value === l && im.value === i;
                      return (
                        <td key={im.value} className="p-0">
                          <button
                            type="button"
                            onClick={() => { setL(lk.value); setI(im.value); }}
                            className={`w-full h-9 rounded-md font-bold transition-transform ${active ? 'ring-2 ring-offset-1 ring-indigo-600 scale-105' : ''}`}
                            style={{ background: b.color, color: b.text }}
                            aria-label={`Likelihood ${lk.value}, impact ${im.value}, score ${s} ${b.label}`}
                          >
                            {s}
                          </button>
                        </td>
                      );
                    })}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="flex flex-wrap gap-2 mt-3">
            {BANDS.map((b) => (
              <span key={b.label} className="text-[11px] px-2 py-1 rounded-md font-semibold" style={{ background: b.color, color: b.text }}>
                {b.label} {b.min} to {b.max}
              </span>
            ))}
          </div>
          <ul className="mt-3 space-y-1 text-xs text-navy-600 dark:text-text-dark-secondary">
            {BANDS.map((b) => <li key={b.label}><strong>{b.label}:</strong> {b.action}</li>)}
          </ul>
        </div>

        <div className="space-y-4">
          <div className="grid sm:grid-cols-2 gap-3">
            <fieldset className="rounded-xl border border-surface-200 dark:border-surface-dark-200 p-3">
              <legend className="text-xs font-semibold px-1 text-navy-700 dark:text-text-dark-secondary">Inherent (current state)</legend>
              <label className="block text-xs mb-1 text-navy-600 dark:text-text-dark-secondary">Likelihood
                <select className={`${inputCls} w-full mt-1`} value={l} onChange={(e) => setL(Number(e.target.value))}>
                  {LIKELIHOOD.map((x) => <option key={x.value} value={x.value}>{x.value} {x.label}</option>)}
                </select>
              </label>
              <label className="block text-xs mb-2 text-navy-600 dark:text-text-dark-secondary">Impact
                <select className={`${inputCls} w-full mt-1`} value={i} onChange={(e) => setI(Number(e.target.value))}>
                  {IMPACT.map((x) => <option key={x.value} value={x.value}>{x.value} {x.label}</option>)}
                </select>
              </label>
              <BandBadge value={inherent} />
            </fieldset>
            <fieldset className="rounded-xl border border-surface-200 dark:border-surface-dark-200 p-3">
              <legend className="text-xs font-semibold px-1 text-navy-700 dark:text-text-dark-secondary">Residual (after treatment)</legend>
              <label className="block text-xs mb-1 text-navy-600 dark:text-text-dark-secondary">Likelihood
                <select className={`${inputCls} w-full mt-1`} value={rl} onChange={(e) => setRl(Number(e.target.value))}>
                  {LIKELIHOOD.map((x) => <option key={x.value} value={x.value}>{x.value} {x.label}</option>)}
                </select>
              </label>
              <label className="block text-xs mb-2 text-navy-600 dark:text-text-dark-secondary">Impact
                <select className={`${inputCls} w-full mt-1`} value={ri} onChange={(e) => setRi(Number(e.target.value))}>
                  {IMPACT.map((x) => <option key={x.value} value={x.value}>{x.value} {x.label}</option>)}
                </select>
              </label>
              <BandBadge value={residual} />
            </fieldset>
          </div>
          <p className={`text-xs rounded-lg p-3 ${aboveAppetite ? 'bg-red-50 dark:bg-red-950/30 text-red-800 dark:text-red-200' : 'bg-emerald-50 dark:bg-emerald-950/30 text-emerald-800 dark:text-emerald-200'}`}>
            {aboveAppetite
              ? 'Residual score is above appetite. A documented risk acceptance signed by the Approver is required.'
              : 'Residual score is within appetite. The Risk Owner can accept it and monitor on the normal cycle.'}
          </p>
          <div className="text-xs text-navy-600 dark:text-text-dark-secondary space-y-1">
            <p><strong>Inherent:</strong> {INHERENT_VS_RESIDUAL.inherent}</p>
            <p><strong>Residual:</strong> {INHERENT_VS_RESIDUAL.residual}</p>
            <p>{INHERENT_VS_RESIDUAL.difference}</p>
          </div>
          <div className="rounded-xl border border-indigo-200 dark:border-indigo-900/50 bg-indigo-50 dark:bg-indigo-950/30 p-3 text-xs text-indigo-900 dark:text-indigo-200">
            <p><strong>Example risk appetite:</strong> {APPETITE.statement}</p>
            <p className="mt-1 font-semibold">{APPETITE.rule}</p>
          </div>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2 mt-6">
        <ScaleTable title="Likelihood" rows={LIKELIHOOD} />
        <ScaleTable title={`Impact (consider: ${IMPACT_DIMENSIONS.join(', ').toLowerCase()})`} rows={IMPACT} />
      </div>
    </section>
  );
}

function ScaleTable({ title, rows }) {
  return (
    <div>
      <h4 className="text-sm font-semibold text-navy-900 dark:text-text-dark-primary mb-2">{title}</h4>
      <ul className="space-y-1.5">
        {rows.map((r) => (
          <li key={r.value} className="flex gap-2 text-xs text-navy-600 dark:text-text-dark-secondary">
            <span className="shrink-0 w-24 font-semibold text-navy-800 dark:text-text-dark-primary">{r.value} {r.label}</span>
            <span>{r.definition}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

export function TreatmentSection() {
  return (
    <section id="ra-treatment" className={sectionCls}>
      <h3 className={h3Cls}>3. Treatment options and approval workflow</h3>
      <TreatmentVisual />
      <p className="text-xs mt-4 text-navy-600 dark:text-text-dark-secondary"><strong>Every risk needs:</strong> {REQUIRED_FIELDS.join(', ')}.</p>
    </section>
  );
}
