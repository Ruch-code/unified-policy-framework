import { Link } from 'react-router-dom';

// "Start here": one thread through the GRC programme, linking the existing OneLens sections in order,
// plus one shared record so risk, control, test and remediation use the same fields everywhere.
const STEPS = [
  ['Business and regulatory context', 'What the business does, which laws, contracts and frameworks apply.', 'Unified Control Framework', '/unified-framework'],
  ['Governance, roles and risk appetite', 'Who owns what, who can accept risk, and how much risk is acceptable.', 'Risk Assessment & Treatment', '/#risk-assessment'],
  ['Risk assessment', 'Identify, score and rank risks against appetite.', 'Risk Assessment & Treatment', '/#risk-assessment'],
  ['Control selection and ownership', 'Pick controls that treat each risk; one named owner per control.', 'Policies → Controls', '/knowledge?topic=policies'],
  ['Policy and procedure', 'Write what must happen (policy) and how (procedure/SOP).', 'Policy Lifecycle', '/knowledge?topic=policy-lifecycle'],
  ['Evidence and testing', 'Test design and operating effectiveness; keep dated evidence.', 'Audit Evidence Checklist', '/knowledge?topic=evidence-checklist'],
  ['Residual risk decision', 'After controls, is the remaining risk within appetite? If not, treat or formally accept.', 'Risk register: who accepts risk', '/#risk-assessment'],
  ['Metrics and management reporting', 'KPIs show the programme runs; KRIs warn when risk rises.', 'KPI and KRI Library', '/knowledge?topic=kpi-kri'],
  ['Issue remediation and improvement', 'Findings get owners, dates and retests; lessons update risks and controls.', 'Classifying Findings', '/knowledge?topic=finding-classification'],
];

const FIELDS = [
  ['Risk ID and statement', 'Cause, event and impact in one sentence.'],
  ['Inherent rating', 'Likelihood x impact before controls.'],
  ['Mapped controls', 'Control IDs from your unified control set.'],
  ['Control owner', 'One accountable person per control.'],
  ['Policy or procedure', 'The document that requires and describes the control.'],
  ['Test performed', 'Design and/or operating effectiveness test, with sample and date.'],
  ['Evidence', 'Where the dated evidence lives.'],
  ['Test result', 'Effective, partially effective, or not effective.'],
  ['Residual rating', 'Likelihood x impact after controls.'],
  ['Treatment decision and approver', 'Mitigate, transfer, avoid or accept, approved at the right authority level.'],
  ['Due date', 'For remediation or the next review.'],
  ['Retest date and result', 'Confirms the fix worked before closing.'],
];

export default function GrcOperatingModel() {
  return (
    <details open className="mb-6 rounded-2xl border border-indigo-200 dark:border-indigo-800 bg-white dark:bg-[#1e293b] p-5" id="grc-operating-model">
      <summary className="cursor-pointer text-lg font-bold text-gray-900 dark:text-white">Start here: how the OneLens sections fit together as one GRC programme</summary>
      <p className="mt-2 text-sm text-gray-700 dark:text-slate-300">Each step links to the existing guide that covers it. Work through them in order; the output of one step is the input to the next.</p>
      <ol className="mt-3 space-y-2">
        {STEPS.map(([step, what, guide, href], i) => (
          <li key={step} className="flex gap-3 text-sm">
            <span className="shrink-0 w-6 h-6 rounded-full bg-indigo-600 text-white text-xs font-bold flex items-center justify-center" aria-hidden="true">{i + 1}</span>
            <span className="text-gray-700 dark:text-slate-300"><strong className="text-gray-900 dark:text-white">{step}.</strong> {what} <Link className="ui-link" to={href}>{guide}</Link></span>
          </li>
        ))}
      </ol>
      <h3 className="mt-5 font-semibold text-gray-900 dark:text-white">One shared record from risk to retest</h3>
      <p className="mt-1 text-sm text-gray-700 dark:text-slate-300">Use the same fields in the risk register, RCSA, Implementation Guide, Unified Control Framework and KPI/KRI reporting so one record follows a risk all the way through.</p>
      <div className="overflow-x-auto mt-2" tabIndex={0} role="region" aria-label="Shared GRC record fields">
        <table className="w-full text-sm min-w-[520px]">
          <thead><tr><th scope="col" className="p-2 text-left font-semibold text-gray-900 dark:text-white bg-gray-50 dark:bg-slate-900">Field</th><th scope="col" className="p-2 text-left font-semibold text-gray-900 dark:text-white bg-gray-50 dark:bg-slate-900">Meaning</th></tr></thead>
          <tbody>{FIELDS.map(([f, m]) => <tr key={f}><td className="p-2 border-t border-gray-100 dark:border-slate-700 font-medium text-gray-900 dark:text-white">{f}</td><td className="p-2 border-t border-gray-100 dark:border-slate-700 text-gray-700 dark:text-slate-300">{m}</td></tr>)}</tbody>
        </table>
      </div>
      <h3 className="mt-5 font-semibold text-gray-900 dark:text-white">How to read guidance on this site</h3>
      <ul className="mt-1 list-disc pl-5 text-sm text-gray-700 dark:text-slate-300 space-y-1">
        <li><strong>Requirement:</strong> what a law or standard actually requires, cited to the source.</li>
        <li><strong>Recommendation:</strong> non-mandatory guidance from a standard or regulator.</li>
        <li><strong>OneLens example or baseline:</strong> a suggested organisational choice, such as a review cadence, threshold, scoring weight, timeline or tool. Adjust it to your risk and policy.</li>
      </ul>
      <p className="mt-2 text-xs text-gray-500 dark:text-slate-400">Templates, sample registers and example approvals on OneLens are starting points. They are not evidence that a control is implemented or operating; only your own dated records are.</p>
    </details>
  );
}
