// Control functions: what each type of control does, with examples.
const ROWS = [
  ['Preventive', 'Stops an incident from happening', 'Firewall rules, MFA, segregation of duties, input validation'],
  ['Detective', 'Identifies an incident and records what happened', 'Log monitoring and SIEM alerts, CCTV, access reviews, reconciliations'],
  ['Corrective', 'Fixes the problem after an incident', 'Patching a vulnerability after a breach, removing malware, revoking compromised credentials'],
  ['Deterrent', 'Discourages someone from attempting an attack', 'Visible security guards, warning banners, published disciplinary policy'],
  ['Recovery', 'Restores normal operations after an incident', 'Restoring from backups after ransomware, failover to a DR site'],
  ['Compensating', 'An alternative control when the primary one is not possible', 'Two-person approval for large payments while an automated limit is unavailable; extra monitoring where SoD cannot be achieved'],
];

export default function ControlFunctions() {
  return (
    <details id="control-functions" className="mb-6 rounded-2xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 p-5 scroll-mt-24">
      <summary className="cursor-pointer text-lg font-bold text-gray-900 dark:text-white">Control functions: preventive, detective, corrective, deterrent, recovery and compensating</summary>
      <div className="overflow-x-auto mt-3" tabIndex={0} role="region" aria-label="Control functions">
        <table className="w-full text-sm min-w-[700px]">
          <thead><tr>{['Function', 'Purpose', 'Examples'].map((h) => <th key={h} scope="col" className="p-2 text-left font-semibold text-gray-900 dark:text-white bg-gray-50 dark:bg-gray-900">{h}</th>)}</tr></thead>
          <tbody>{ROWS.map((r) => <tr key={r[0]}>{r.map((c, j) => <td key={j} className={`p-2 align-top border-t border-gray-100 dark:border-gray-700 text-gray-700 dark:text-gray-300 ${j === 0 ? 'font-medium' : ''}`}>{c}</td>)}</tr>)}</tbody>
        </table>
      </div>
      <p className="mt-2 text-sm text-gray-700 dark:text-gray-300">A good control set mixes functions: prevent what you can, detect what gets through, and be able to correct and recover. Auditors often ask for the function of each key control; ISO 27002 tags every control as preventive, detective or corrective.</p>
    </details>
  );
}
