import { EM_SECTIONS, EM_SIMULATION } from '../data/emGrillingGuide.js';

const P = 'text-sm text-gray-700 dark:text-gray-300';
const ROWS = [['a', 'Strong answer'], ['do', 'What to do in practice'], ['ev', 'Evidence to reference'], ['weak', 'Weak answer'], ['fq', 'Follow-up grilling'], ['fa', 'Strong follow-up answer']];

export default function EmGrillingGuide() {
  return (
    <div className="space-y-3">
      <p className={P}>Hard questions an Engineering or Technical Manager faces from engineers, infrastructure, HR, security, product and executives. Each answer shows what to say, what to actually do, the evidence to point to, the weak answer to avoid, and the follow-up you will get next.</p>
      {EM_SECTIONS.map((s) => (
        <details key={s.id} className="rounded-xl border border-gray-200 dark:border-gray-700 p-3">
          <summary className="cursor-pointer font-semibold text-gray-900 dark:text-white">{s.title} ({s.items.length})</summary>
          <div className="mt-2 space-y-2">
            {s.items.map((it) => (
              <details key={it.q} className="rounded-lg border border-gray-100 dark:border-gray-700 p-3">
                <summary className="cursor-pointer text-sm font-medium text-gray-900 dark:text-white">{it.q}</summary>
                <dl className="mt-2 space-y-2">
                  {ROWS.map(([k, label]) => (
                    <div key={k}>
                      <dt className={`text-[11px] font-bold uppercase tracking-wide ${k === 'weak' ? 'text-red-700 dark:text-red-300' : 'text-gray-500 dark:text-gray-400'}`}>{label}</dt>
                      <dd className={P}>{it[k]}</dd>
                    </div>
                  ))}
                </dl>
              </details>
            ))}
          </div>
        </details>
      ))}
      <details className="rounded-xl border border-rose-200 dark:border-rose-800 p-3">
        <summary className="cursor-pointer font-semibold text-gray-900 dark:text-white">12. Final mega grilling simulation</summary>
        <p className={`${P} mt-2`}><strong>Scenario:</strong> {EM_SIMULATION.scenario}</p>
        <div className="mt-2 space-y-2">
          {EM_SIMULATION.turns.map(([who, line], i) => (
            <p key={i} className={`${P} ${who === 'Engineering Manager' ? 'pl-4 border-l-2 border-blue-400' : ''}`}><strong>{who}:</strong> {line}</p>
          ))}
        </div>
        <p className={`${P} mt-3 font-semibold`}>Why this works</p>
        <ul className={`list-disc pl-5 ${P}`}>{EM_SIMULATION.lessons.map((l) => <li key={l}>{l}</li>)}</ul>
      </details>
    </div>
  );
}
