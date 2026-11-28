// Which security frameworks and laws usually apply to which industries.
const ROWS = [
  ['ISO/IEC 27001', 'Certifiable standard', 'Any industry; common in technology, finance, healthcare and manufacturing, and when selling internationally'],
  ['SOC 2', 'Attestation report (AICPA)', 'Technology, SaaS and cloud service providers serving US customers'],
  ['NIST Cybersecurity Framework', 'Voluntary framework', 'Any industry; widely used in US critical infrastructure such as energy, finance, healthcare and government'],
  ['CIS Controls', 'Prioritised control set', 'Any industry wanting a practical starting baseline'],
  ['PCI DSS', 'Contractual standard (card brands)', 'Anyone who stores, processes or transmits payment card data: retail, e-commerce, payments'],
  ['HIPAA', 'US law', 'US healthcare providers, health plans, clearing houses and their business associates'],
  ['GDPR', 'EU and UK law', 'Any organisation processing personal data of people in the EU or UK, wherever it is based'],
  ['DPDP Act', 'Indian law', 'Any organisation processing digital personal data in India, or of people in India for offering goods or services'],
  ['CMMC', 'US Department of Defense programme', 'Defence contractors and their supply chain handling federal contract or controlled unclassified information'],
  ['FISMA and FedRAMP', 'US federal law and programme', 'US federal agencies, and cloud providers selling to them'],
  ['COBIT', 'IT governance framework (ISACA)', 'Enterprise IT governance and audit in any industry'],
  ['ITIL', 'IT service management practice', 'IT operations teams and managed service providers'],
  ['OWASP (ASVS, Top 10)', 'Application security guidance', 'Organisations that build software or web applications'],
];

export default function FrameworksByIndustry() {
  return (
    <details id="frameworks-by-industry" className="my-6 rounded-2xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 p-5 scroll-mt-24">
      <summary className="cursor-pointer text-lg font-bold text-gray-900 dark:text-white">Which framework applies to which industry</summary>
      <div className="overflow-x-auto mt-3" tabIndex={0} role="region" aria-label="Frameworks by industry">
        <table className="w-full text-sm min-w-[760px]">
          <thead><tr>{['Framework', 'Type', 'Who it applies to'].map((h) => <th key={h} scope="col" className="p-2 text-left font-semibold text-gray-900 dark:text-white bg-gray-50 dark:bg-gray-900">{h}</th>)}</tr></thead>
          <tbody>{ROWS.map((r) => <tr key={r[0]}>{r.map((c, j) => <td key={j} className={`p-2 align-top border-t border-gray-100 dark:border-gray-700 text-gray-700 dark:text-gray-300 ${j === 0 ? 'font-medium' : ''}`}>{c}</td>)}</tr>)}</tbody>
        </table>
      </div>
      <p className="mt-2 text-sm text-gray-700 dark:text-gray-300">Laws apply by obligation; standards and frameworks are usually chosen because customers, contracts or regulators ask for them. Most organisations combine several.</p>
    </details>
  );
}
