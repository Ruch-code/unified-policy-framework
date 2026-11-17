// SOC 2 has no fixed list of required policies. This shows the policies auditors expect, and the criteria that drive them.
const ROWS = [
  ['Information security policy', 'CC5.3, CC2.2', 'Approved by management, reviewed yearly, acknowledged by staff'],
  ['Code of conduct', 'CC1.1', 'Signed by every employee and contractor at hire'],
  ['Acceptable use', 'CC1.1, CC6.8', 'Rules for company devices, accounts and data'],
  ['Access control', 'CC6.1 to CC6.3', 'Provisioning, least privilege, MFA and quarterly access reviews'],
  ['Change management', 'CC8.1', 'Approval, testing and segregation of duties for production changes'],
  ['Risk assessment', 'CC3.1 to CC3.4', 'Method, risk register and yearly review'],
  ['Vendor management', 'CC9.2', 'Due diligence and yearly review of critical vendors'],
  ['Incident response', 'CC7.3 to CC7.5', 'Roles, severity levels, communication and a yearly test'],
  ['Business continuity and disaster recovery', 'CC9.1, A1.2, A1.3', 'Backups, recovery targets and a restore test'],
  ['Data classification and retention', 'C1.1, C1.2, CC6.7', 'Labels, retention periods and disposal'],
  ['Encryption and key management', 'CC6.1, CC6.7', 'Encryption at rest and in transit; key rotation'],
  ['Logging and monitoring', 'CC7.2', 'What is logged, alerting and review'],
  ['Vulnerability management', 'CC7.1', 'Scanning cadence and remediation timelines'],
  ['Human resources security', 'CC1.4, CC1.5, CC2.2', 'Background checks, security training and offboarding'],
  ['Privacy policy (if Privacy is in scope)', 'P1.1 to P8.1', 'Notice, consent, access and deletion'],
];

export default function Soc2MandatoryPolicies() {
  return (
    <details id="soc2-policies" className="max-w-6xl mx-auto my-4 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 scroll-mt-24">
      <summary className="cursor-pointer p-4 text-lg font-bold text-gray-900 dark:text-white">Policies auditors expect for SOC 2</summary>
      <div className="px-4 pb-4">
        <p className="text-sm text-gray-700 dark:text-gray-300 mb-3">The Trust Services Criteria do not name required documents, but CC5.3 requires control activities to be deployed through policies and procedures. In practice, auditors ask for the policies below, each approved and with evidence that staff have read it.</p>
        <div className="overflow-x-auto" tabIndex={0} role="region" aria-label="SOC 2 policies">
          <table className="w-full min-w-[640px] text-sm">
            <thead><tr>{['Policy', 'Criteria', 'What it must cover'].map((h) => <th key={h} scope="col" className="p-2 text-left font-semibold text-gray-900 dark:text-white bg-gray-50 dark:bg-gray-900">{h}</th>)}</tr></thead>
            <tbody>{ROWS.map((r) => <tr key={r[0]}>{r.map((c, j) => <td key={j} className={`p-2 align-top border-t border-gray-100 dark:border-gray-700 text-gray-700 dark:text-gray-300 ${j === 0 ? 'font-medium' : ''}`}>{c}</td>)}</tr>)}</tbody>
          </table>
        </div>
      </div>
    </details>
  );
}
