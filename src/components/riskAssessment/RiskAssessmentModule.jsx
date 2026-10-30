import { MethodologySection, RubricSection, TreatmentSection } from './RiskMethodology.jsx';
import RiskRegisterSection from './RiskRegisterSection.jsx';
import RiskTraceability from './RiskTraceability.jsx';
import RiskCrossCheck from './RiskCrossCheck.jsx';
import RiskDownloads from './RiskDownloads.jsx';
import PracticalScenarios from './PracticalScenarios.jsx';
import AiRiskFactors from '../aiAssurance/AiRiskFactors.jsx';
import { sectionCls, h3Cls, leadCls } from './riskUtils.jsx';

const NAV = [
  ['ra-methodology', 'Methodology'],
  ['ra-rubric', 'Scoring'],
  ['ra-ai', 'AI risk layer'],
  ['ra-treatment', 'Treatment'],
  ['ra-register', 'Register'],
  ['ra-library', 'Scenario library'],
  ['ra-scenarios', 'Practical scenarios'],
  ['ra-traceability', 'Traceability'],
  ['ra-crosscheck', 'Framework cross-check'],
  ['ra-downloads', 'Downloads'],
];

export default function RiskAssessmentModule({ isDark = false }) {
  const jump = (id) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };
  return (
    <div className="max-w-full overflow-x-hidden">
      <div className="mb-6">
        <h2 className="text-2xl md:text-3xl font-bold text-navy-900 dark:text-text-dark-primary">Risk Assessment &amp; Treatment</h2>
        <p className="text-sm text-navy-600 dark:text-text-dark-secondary mt-1 max-w-3xl">
          An end-to-end method to identify, score, treat, approve and monitor risk, with a sample register, a scenario library and traceability from each risk to the controls, tests and evidence an auditor will check.
        </p>
        <nav aria-label="Risk assessment sections" className="flex flex-wrap gap-2 mt-4">
          {NAV.map(([id, label]) => (
            <button key={id} type="button" onClick={() => jump(id)} className="px-2.5 py-1 rounded-full text-xs font-medium border border-surface-300 dark:border-surface-dark-300 text-navy-700 dark:text-text-dark-secondary hover:bg-surface-100 dark:hover:bg-slate-800">
              {label}
            </button>
          ))}
        </nav>
      </div>

      <MethodologySection />
      <RubricSection />
      <AiRiskFactors />
      <TreatmentSection />
      <RiskRegisterSection isDark={isDark} />
      <PracticalScenarios />
      <RiskTraceability />
      <section id="ra-crosscheck" className={sectionCls}>
        <h3 className={h3Cls}>8. Framework cross-check</h3>
        <p className={leadCls}>One risk assessment satisfies the risk requirements of many frameworks. Each framework playbook links back here.</p>
        <RiskCrossCheck />
      </section>
      <RiskDownloads />
    </div>
  );
}
