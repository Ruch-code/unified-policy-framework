// TODO (Ruchi to verify): Section 7(i) wording on employment purposes against the official DPDP Act text.
// DPDPA page sub-card: scoping employee personal data under DPDPA and GDPR (Module E).
const ROWS = [
  ['Recruitment and onboarding', 'CVs, ID documents, contact details', 'DPDPA: consent or legitimate use for employment (Section 7(i)). GDPR: contract and legal obligation (Art. 6(1)(b), (c))'],
  ['Payroll and benefits', 'Bank details, PAN, salary, tax records', 'Legal obligation and employment purposes; restrict access to payroll staff'],
  ['Background verification', 'Education, employment history, address checks', 'Tell candidates in advance what is checked and by which vendor; vendor is a processor and needs a contract'],
  ['Employee monitoring', 'Device, email, access and location logs', 'State it in the policy and notice, keep it proportionate, and limit who can view it'],
  ['Health and leave', 'Medical certificates, insurance', 'Sensitive under GDPR (Art. 9); keep separate with tighter access'],
  ['Exit', 'Final settlement, references', 'Set retention periods; delete or anonymise when they end'],
];

export default function EmployeeDataScoping() {
  return (
    <details id="employee-data" className="my-6 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 scroll-mt-24">
      <summary className="cursor-pointer p-4 text-lg font-bold text-gray-900 dark:text-white">Scoping employee personal data under DPDPA and GDPR</summary>
      <div className="px-4 pb-4">
        <p className="text-sm text-gray-700 dark:text-gray-300 mb-3">Employee data is personal data under both laws, and it is often left out of the inventory. Include every HR process in your data map and record of processing.</p>
        <div className="overflow-x-auto" tabIndex={0} role="region" aria-label="Employee data scoping">
          <table className="w-full min-w-[600px] text-sm">
            <thead><tr>{['HR process', 'Typical data', 'What to check'].map((h) => <th key={h} scope="col" className="p-2 text-left font-semibold text-gray-900 dark:text-white bg-gray-50 dark:bg-gray-900">{h}</th>)}</tr></thead>
            <tbody>{ROWS.map((r) => <tr key={r[0]}>{r.map((c, j) => <td key={j} className={`p-2 align-top border-t border-gray-100 dark:border-gray-700 text-gray-700 dark:text-gray-300 ${j === 0 ? 'font-medium' : ''}`}>{c}</td>)}</tr>)}</tbody>
          </table>
        </div>
        <p className="mt-3 text-xs text-gray-500 dark:text-gray-400">Source: DPDP Act 2023 Section 7; GDPR Art. 6 and 9. Last verified: 17 Nov 2026.</p>
      </div>
    </details>
  );
}
