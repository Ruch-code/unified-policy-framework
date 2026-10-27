import { useState } from 'react';
import { ChevronDown, ChevronRight } from 'lucide-react';
import { SEED_REGISTER } from '../../data/riskAssessment/register';
import { CONTROL_BY_ID } from '../../data/riskAssessment/controls';
import { score, BandBadge, sectionCls, h3Cls, leadCls } from './riskUtils.jsx';

function ControlDetail({ id }) {
  const c = CONTROL_BY_ID[id];
  if (!c) return <p className="text-xs text-red-700 dark:text-red-300">Control {id} is not in the catalogue.</p>;
  return (
    <div className="grid gap-3 md:grid-cols-3 text-xs text-navy-700 dark:text-text-dark-secondary">
      <div>
        <p className="mb-1">{c.description}</p>
        <p><strong>SOC 2:</strong> {c.soc2.join(', ')}</p>
        {c.otherMappings && c.otherMappings.length > 0 && <p><strong>Also maps to:</strong> {c.otherMappings.join('; ')}</p>}
      </div>
      <div>
        <p className="font-semibold text-navy-900 dark:text-text-dark-primary mb-1">Automated tests</p>
        <ul className="list-disc pl-4 space-y-0.5">{c.tests.map((t) => <li key={t}>{t}</li>)}</ul>
      </div>
      <div>
        <p className="font-semibold text-navy-900 dark:text-text-dark-primary mb-1">Required evidence</p>
        <ul className="list-disc pl-4 space-y-0.5">{c.evidence.map((e) => <li key={e}>{e}</li>)}</ul>
      </div>
    </div>
  );
}

export default function RiskTraceability() {
  const [openRisk, setOpenRisk] = useState('R-1');
  const [openControl, setOpenControl] = useState(null);

  return (
    <section id="ra-traceability" className={sectionCls}>
      <h3 className={h3Cls}>6. Risk to control to test to evidence</h3>
      <p className={leadCls}>Click a risk to see the controls that mitigate it, then click a control to see its description, framework mappings, automated tests and the evidence an auditor will ask for. A treatment is only complete when every linked control has current evidence.</p>

      <ul className="space-y-2">
        {SEED_REGISTER.map((r) => {
          const isOpen = openRisk === r.id;
          return (
            <li key={r.id} className="rounded-xl border border-surface-200 dark:border-surface-dark-200 overflow-hidden">
              <button
                type="button"
                onClick={() => { setOpenRisk(isOpen ? null : r.id); setOpenControl(null); }}
                aria-expanded={isOpen}
                className="w-full flex items-start gap-3 p-3 text-left hover:bg-surface-50 dark:hover:bg-slate-800/60"
              >
                {isOpen ? <ChevronDown className="w-4 h-4 mt-0.5 shrink-0 text-gray-500" /> : <ChevronRight className="w-4 h-4 mt-0.5 shrink-0 text-gray-500" />}
                <span className="font-mono text-xs shrink-0 mt-0.5 text-navy-700 dark:text-text-dark-secondary w-10">{r.id}</span>
                <span className="flex-1 text-sm text-navy-900 dark:text-text-dark-primary">
                  {r.scenario}
                  {r.recommended && <span className="ml-2 text-[10px] font-bold uppercase text-amber-700 dark:text-amber-300">Recommended addition</span>}
                </span>
                <span className="hidden sm:flex items-center gap-2 shrink-0">
                  <BandBadge value={score(r.likelihood, r.impact)} />
                  <span className="text-[11px] text-navy-600 dark:text-text-dark-secondary">{r.controls.length} controls</span>
                </span>
              </button>
              {isOpen && (
                <div className="border-t border-surface-200 dark:border-surface-dark-200 p-3 bg-surface-50 dark:bg-slate-900/40">
                  {r.note && <p className="mb-2 text-xs rounded-md p-2 bg-amber-50 dark:bg-amber-950/30 text-amber-900 dark:text-amber-200">{r.note}</p>}
                  <ul className="space-y-1.5">
                    {r.controls.map((id) => {
                      const c = CONTROL_BY_ID[id];
                      const key = `${r.id}:${id}`;
                      const cOpen = openControl === key;
                      return (
                        <li key={id} className="rounded-lg border border-surface-200 dark:border-surface-dark-200 bg-white dark:bg-surface-dark-100">
                          <button
                            type="button"
                            onClick={() => setOpenControl(cOpen ? null : key)}
                            aria-expanded={cOpen}
                            className="w-full flex items-center gap-2 px-3 py-2 text-left"
                          >
                            {cOpen ? <ChevronDown className="w-3.5 h-3.5 shrink-0 text-gray-500" /> : <ChevronRight className="w-3.5 h-3.5 shrink-0 text-gray-500" />}
                            <span className="font-mono text-[11px] text-indigo-700 dark:text-indigo-300 shrink-0 w-14">{id}</span>
                            <span className="text-xs font-medium text-navy-900 dark:text-text-dark-primary">{c ? c.name : 'Unknown control'}</span>
                          </button>
                          {cOpen && <div className="px-3 pb-3"><ControlDetail id={id} /></div>}
                        </li>
                      );
                    })}
                  </ul>
                </div>
              )}
            </li>
          );
        })}
      </ul>
    </section>
  );
}
