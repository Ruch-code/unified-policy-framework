// Nine types of API testing and where each fits.
const ROWS = [
  ['Smoke', 'Quick check that the API is up and core calls respond', 'After every deployment'],
  ['Functional', 'Each endpoint returns the expected result for given inputs, against the specification', 'Every build'],
  ['Integration', 'Several API calls and services work together end to end', 'Before release'],
  ['Regression', 'Changes have not broken existing behaviour; compare old and new versions', 'Every change'],
  ['Load', 'Performance at expected traffic levels (for example with JMeter or k6)', 'Before major releases and capacity changes'],
  ['Stress', 'Behaviour beyond expected load, to find the breaking point and how it fails', 'Periodically and before peak events'],
  ['Security', 'Authentication, authorisation, input validation, rate limits and data exposure (OWASP API Security Top 10)', 'Before release and on a schedule'],
  ['UI', 'The user interface and the APIs behind it work together correctly', 'Before release'],
  ['Fuzz', 'Sends random or malformed data to find crashes and vulnerabilities', 'In CI for critical APIs and before release'],
];

export default function ApiTestingTypes() {
  return (
    <details id="api-testing-types" className="my-6 rounded-2xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 p-5 scroll-mt-24">
      <summary className="cursor-pointer text-lg font-bold text-gray-900 dark:text-white">Nine types of API testing</summary>
      <div className="overflow-x-auto mt-3" tabIndex={0} role="region" aria-label="API testing types">
        <table className="w-full text-sm min-w-[700px]">
          <thead><tr>{['Type', 'What it checks', 'When to run'].map((h) => <th key={h} scope="col" className="p-2 text-left font-semibold text-gray-900 dark:text-white bg-gray-50 dark:bg-gray-900">{h}</th>)}</tr></thead>
          <tbody>{ROWS.map((r) => <tr key={r[0]}>{r.map((c, j) => <td key={j} className={`p-2 align-top border-t border-gray-100 dark:border-gray-700 text-gray-700 dark:text-gray-300 ${j === 0 ? 'font-medium' : ''}`}>{c}</td>)}</tr>)}</tbody>
        </table>
      </div>
      <p className="mt-2 text-sm text-gray-700 dark:text-gray-300">Audit view: automated smoke, functional, regression and security tests should run in the pipeline, with results kept as release evidence. SAST and DAST are compared above.</p>
    </details>
  );
}
