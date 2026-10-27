import { useState } from 'react';
import { AI_RISK_FACTORS, AI_RISK_TIERS } from '../../data/aiAssurance';

const TIER_STYLE = {
  Low: 'bg-emerald-50 dark:bg-emerald-950/30 text-emerald-900 dark:text-emerald-200 border-emerald-300 dark:border-emerald-800',
  Medium: 'bg-amber-50 dark:bg-amber-950/30 text-amber-900 dark:text-amber-200 border-amber-300 dark:border-amber-800',
  High: 'bg-red-50 dark:bg-red-950/30 text-red-900 dark:text-red-200 border-red-300 dark:border-red-800',
};

export default function AiRiskFactors() {
  const [vals, setVals] = useState(() => Object.fromEntries(AI_RISK_FACTORS.map((f) => [f.id, 1])));
  const total = Object.values(vals).reduce((a, b) => a + b, 0);
  const forcedHigh = vals.tier === 3 || vals.affected === 3;
  const tier = forcedHigh ? AI_RISK_TIERS[2] : (AI_RISK_TIERS.find((t) => total >= t.min && total <= t.max) || AI_RISK_TIERS[0]);

  return (
    <section id="ra-ai" className="mb-10 rounded-2xl border border-surface-200 dark:border-surface-dark-200 bg-white dark:bg-surface-dark-100 p-5 md:p-8">
      <h3 className="text-xl md:text-2xl font-bold text-navy-900 dark:text-text-dark-primary mb-2">AI risk assessment layer</h3>
      <p className="text-sm text-navy-600 dark:text-text-dark-secondary mb-5 max-w-3xl">
        For AI systems, score these six factors first to set the AI risk tier, then score each AI scenario on the 5 x 5 rubric. The tier decides which assessments and tests are mandatory (ISO 42001 6.1.2 and 6.1.4, EU AI Act Art. 9, NIST AI RMF MAP).
      </p>
      <div className="grid gap-3 md:grid-cols-2">
        {AI_RISK_FACTORS.map((f) => (
          <fieldset key={f.id} className="rounded-xl border border-surface-200 dark:border-surface-dark-200 p-3">
            <legend className="text-xs font-semibold px-1 text-navy-800 dark:text-text-dark-primary">{f.factor}</legend>
            {f.levels.map((lvl, n) => (
              <label key={lvl} className="flex items-start gap-2 text-xs text-navy-700 dark:text-text-dark-secondary py-0.5 cursor-pointer">
                <input type="radio" name={`ai-${f.id}`} checked={vals[f.id] === n + 1} onChange={() => setVals((v) => ({ ...v, [f.id]: n + 1 }))} className="mt-0.5" />
                <span><strong>{n + 1}</strong> {lvl}</span>
              </label>
            ))}
          </fieldset>
        ))}
      </div>
      <div className={`mt-4 rounded-xl border p-4 ${TIER_STYLE[tier.tier]}`}>
        <p className="font-bold text-sm">AI risk tier: {tier.tier} (score {total} of 18)</p>
        <ul className="list-disc pl-5 mt-1 text-xs space-y-0.5">{tier.actions.map((a) => <li key={a}>{a}</li>)}</ul>
        <p className="text-[11px] mt-2 opacity-80">Any factor at level 3 for regulatory tier or affected people is treated as High regardless of the total.</p>
      </div>
    </section>
  );
}
