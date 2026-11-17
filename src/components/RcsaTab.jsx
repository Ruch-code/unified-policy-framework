import { Link } from 'react-router-dom';
import TemplateDownloadButton from './templates/TemplateDownloadButton.jsx';
import { useAuth } from '../context/AuthContext.jsx';

// Knowledge Base topic: Risk and Control Self-Assessment (Module L). CIS Implementation Groups already live on the CIS page.
const CARD = 'bg-white border border-gray-200 rounded-2xl p-5 mb-4 dark:bg-gray-800 dark:border-gray-700';
const P = 'text-sm text-gray-700 dark:text-gray-300';
const TH = 'p-2 text-left font-semibold text-gray-900 dark:text-white bg-gray-50 dark:bg-gray-900';
const TD = 'p-2 align-top border-t border-gray-100 dark:border-gray-700 text-gray-700 dark:text-gray-300';

const SCORES = [
  ['Effective', 'Designed well and working every time; evidence available', 'No action'],
  ['Partially effective', 'Works most of the time or covers part of the risk', 'Improvement action with an owner and date'],
  ['Ineffective', 'Missing, not working, or no evidence', 'Raise as an issue; update the residual risk'],
  ['Not tested', 'New control or not yet assessed', 'Schedule for the next cycle'],
];

export default function RcsaTab() {
  const { user } = useAuth();
  return (
    <div>
      <div className={CARD}>
        <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-2">Risk and Control Self-Assessment (RCSA)</h2>
        <p className={P}>In an RCSA, the business (first line) rates its own risks and controls, and the risk or GRC team (second line) runs the process and challenges the answers. It finds problems between audits and keeps the risk register honest.</p>
        <p className={`mt-2 ${P}`}><span className="font-semibold">When:</span> once or twice a year per business unit, and after a major change or incident.</p>
      </div>
      <div className={CARD}>
        <h3 className="font-semibold text-gray-900 dark:text-white mb-2">How to run it</h3>
        <ol className={`list-decimal pl-5 space-y-1 ${P}`}>
          {['Pick the business unit and pull its risks and controls from the risk register.', 'Send the workbook a week before the workshop so owners can gather evidence.', 'Run a 60 to 90 minute workshop: walk through each risk, agree likelihood and impact, and rate each control.', 'Challenge any "Effective" rating without evidence. Ask to see it.', 'Record actions for every partly effective or ineffective control.', 'Feed the results back into the risk register: update residual scores and add new risks.', 'Report the results and overdue actions to management.'].map((x) => <li key={x}>{x}</li>)}
        </ol>
      </div>
      <div className={CARD}>
        <h3 className="font-semibold text-gray-900 dark:text-white mb-2">Scoring control effectiveness</h3>
        <div className="overflow-x-auto" tabIndex={0} role="region" aria-label="Control effectiveness scale">
          <table className="w-full min-w-[520px] text-sm">
            <thead><tr>{['Rating', 'Meaning', 'What happens next'].map((h) => <th key={h} scope="col" className={TH}>{h}</th>)}</tr></thead>
            <tbody>{SCORES.map((r) => <tr key={r[0]}>{r.map((c, j) => <td key={j} className={`${TD} ${j === 0 ? 'font-medium' : ''}`}>{c}</td>)}</tr>)}</tbody>
          </table>
        </div>
        <ul className={`mt-3 list-disc pl-5 space-y-1 ${P}`}>
          <li>Pitfall: owners rate everything Effective. Ask for one piece of evidence per control.</li>
          <li>Pitfall: actions with no owner or date. Every action needs both.</li>
          <li>These ratings use the same scale as the Control effectiveness column in the <Link className="ui-link" to="/#risk-assessment">risk register template</Link>.</li>
          <li>CIS Controls Implementation Groups (IG1 to IG3) are explained on the <Link className="ui-link" to="/cis">CIS Controls page</Link>.</li>
        </ul>
      </div>
      <div className="rounded-xl border border-gray-200 dark:border-gray-700 p-3">
        <p className="text-sm font-semibold text-gray-900 dark:text-white mb-2">Template</p>
        {user
          ? <div className="flex flex-wrap items-center justify-between gap-2 text-sm"><span className="text-gray-800 dark:text-gray-200">Control Self-Assessment Record: risks, controls, ratings and actions</span><TemplateDownloadButton template={{ name: 'Control Self-Assessment Record', file: 'control-self-assessment.xlsx' }} compact /></div>
          : <p className="text-xs text-gray-600 dark:text-gray-400">Log in to download the template.</p>}
      </div>
      <p className="mt-3 text-xs text-gray-500 dark:text-gray-400">Source: IIA Three Lines Model (2020) and common risk management practice. Last verified: 17 Nov 2026.</p>
    </div>
  );
}
