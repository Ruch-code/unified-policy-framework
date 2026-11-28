import SortableGrid from '../kb/SortableGrid.jsx';

// Illustrative RACI for risk ownership by risk type. OneLens example; adapt to your structure and delegated authority.
const P = 'text-sm leading-relaxed text-gray-700 dark:text-slate-300';
const H = 'mt-4 mb-1 text-base font-semibold text-gray-900 dark:text-white';

const ROLES = ['CEO', 'CFO', 'COO', 'CIO/CTO', 'CISO', 'CRO', 'GC', 'CCO/DPO', 'CHRO', 'BU lead'];
// R = responsible, A = accountable, C = consulted, I = informed, - = no set role
const RACI = [
  ['Strategic', 'A', 'C', 'C', 'C', 'I', 'C', 'C', '-', 'C', 'R'],
  ['Financial', 'I', 'A', 'C', '-', '-', 'C', 'C', '-', '-', 'R'],
  ['Operational', 'I', 'C', 'A', 'C', 'C', 'C', '-', 'C', 'C', 'R'],
  ['Legal', 'I', 'C', 'C', '-', '-', 'C', 'A', 'C', 'C', 'R'],
  ['Regulatory compliance', 'I', 'C', 'C', 'C', 'C', 'C', 'C', 'A', '-', 'R'],
  ['Fraud', 'I', 'A', 'C', 'C', 'C', 'C', 'C', 'C', 'C', 'R'],
  ['Technology and IT service', 'I', 'C', 'C', 'A', 'C', 'C', '-', '-', '-', 'R'],
  ['Cybersecurity', 'I', 'C', 'C', 'C', 'A', 'C', 'C', 'C', 'C', 'R'],
  ['Data privacy', 'I', '-', 'C', 'C', 'C', 'C', 'C', 'A', 'C', 'R'],
  ['AI and model', 'I', 'C', 'C', 'C', 'C', 'C', 'C', 'C', '-', 'A'],
  ['Third-party and vendor', 'I', 'C', 'A', 'C', 'C', 'C', 'C', 'C', '-', 'R'],
  ['Business continuity', 'I', 'C', 'A', 'R', 'C', 'C', '-', '-', 'C', 'R'],
  ['People and workforce', 'I', 'C', 'C', '-', '-', 'C', 'C', 'C', 'A', 'R'],
  ['Health and safety', 'I', '-', 'A', '-', '-', 'C', 'C', 'C', 'C', 'R'],
  ['Climate and ESG', 'A', 'C', 'R', '-', '-', 'C', 'C', 'C', '-', 'C'],
  ['Geopolitical', 'A', 'C', 'R', 'C', 'C', 'C', 'C', 'C', 'C', 'C'],
  ['Project delivery', 'I', 'C', 'A', 'C', 'C', 'C', '-', '-', '-', 'R'],
  ['Reputational', 'A', 'C', 'C', '-', 'C', 'C', 'C', 'C', 'C', 'R'],
];

export default function RiskRaci() {
  return (
    <details className="my-6 rounded-xl border border-gray-200 dark:border-slate-700 p-5" id="risk-raci">
      <summary className="cursor-pointer text-lg font-bold text-gray-900 dark:text-white">Risk ownership RACI by risk type</summary>
      <div className="mt-3">
        <p className={P}><strong>R</strong> Responsible: manages the risk day to day. <strong>A</strong> Accountable: owns the decision and outcome; one per risk. <strong>C</strong> Consulted: gives expertise. <strong>I</strong> Informed: kept up to date. A dash means no set role.</p>
        <SortableGrid label="Risk ownership RACI" headers={['Risk type', ...ROLES]} rows={RACI} file="risk-ownership-raci" min={1000} />
        <p className="text-xs text-gray-500 dark:text-slate-400">Illustrative OneLens example. Adapt to your structure, delegated authority and regulators. Here the CIO or CTO owns technology operations, the CISO owns cybersecurity risk, and business unit leads represent their teams.</p>

        <h3 className={H}>How to read it</h3>
        <ul className={`list-disc pl-5 space-y-1 ${P}`}>
          <li>Each risk type has exactly one Accountable role, so decisions and risk acceptance have a clear owner.</li>
          <li>Business units are usually Responsible: risk is managed where the work happens.</li>
          <li>The CRO and compliance functions are Consulted almost everywhere: they advise, monitor and challenge rather than own.</li>
          <li>The board oversees risk overall but sits outside operational ownership.</li>
        </ul>

        <h3 className={H}>Three lines model</h3>
        <ul className={`list-disc pl-5 space-y-1 ${P}`}>
          <li><strong>First line, management:</strong> owns risks and runs controls.</li>
          <li><strong>Second line, risk and compliance:</strong> sets frameworks, advises, monitors and challenges.</li>
          <li><strong>Third line, internal audit:</strong> gives independent assurance to the board.</li>
        </ul>
      </div>
    </details>
  );
}
