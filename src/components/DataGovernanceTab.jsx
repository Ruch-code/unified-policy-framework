import { Link } from 'react-router-dom';
import TemplateDownloadButton from './templates/TemplateDownloadButton.jsx';
import { useAuth } from '../context/AuthContext.jsx';

// Knowledge Base topic: data discovery, classification and mapping (Module E).
// Uses the existing Data Inventory Map and ROPA templates rather than adding new ones.
const CARD = 'bg-white border border-gray-200 rounded-2xl p-5 mb-4 dark:bg-gray-800 dark:border-gray-700';
const P = 'text-sm text-gray-700 dark:text-gray-300';
const TH = 'p-2 text-left font-semibold text-gray-900 dark:text-white bg-gray-50 dark:bg-gray-900';
const TD = 'p-2 align-top border-t border-gray-100 dark:border-gray-700 text-gray-700 dark:text-gray-300';

const CLASSES = [
  ['Public', 'Approved for anyone', 'Marketing site, published policies', 'No restriction'],
  ['Internal', 'Staff only; low harm if leaked', 'Org chart, internal wiki', 'Company accounts only'],
  ['Confidential', 'Harm to customers or the business if leaked', 'Customer contracts, source code, most personal data', 'Need to know, encryption, DLP'],
  ['Restricted', 'Serious harm, legal or regulatory impact', 'Identity documents, payment data, health data, keys and secrets', 'Named access, strong encryption, logging, no export'],
];

const STEPS = [
  ['Discover', 'List every system, file store and vendor that holds data. Ask system owners, check the SSO app list and expense reports for tools, and run discovery scans on file shares and cloud storage for personal and sensitive data.'],
  ['Classify', 'Apply one of four levels to each data set, based on the harm if it leaked. When in doubt, choose the higher level.'],
  ['Label', 'Make the level visible: document headers, file labels, database or bucket tags. DLP rules can then act on the label.'],
  ['Map flows', 'For each personal data set, draw where it is collected, where it is stored, who it is shared with and where it goes across borders.'],
  ['Record processing', 'Turn the map into a record of processing activities: purpose, lawful basis, categories of data and people, recipients, transfers, retention and security measures.'],
  ['Keep it current', 'Review the inventory at least yearly and whenever a new system, vendor or product feature handles personal data.'],
];

const MAPS = [
  ['ISO 27001:2022', 'A.5.9 Inventory, A.5.12 Classification, A.5.13 Labelling, A.5.34 Privacy and protection of PII'],
  ['GDPR', 'Art. 30 Records of processing activities'],
  ['DPDPA', 'Section 8 duties of the Data Fiduciary; Significant Data Fiduciaries have extra duties under Section 10'],
  ['ISO 27701', 'Records of processing and PII inventory controls (check numbering against the edition you certify to)'],
];

export default function DataGovernanceTab() {
  const { user } = useAuth();
  return (
    <div>
      <div className={CARD}>
        <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-2">Data governance: discovery, classification and mapping</h2>
        <p className={P}>You cannot protect or report on data you have not found. Data governance means knowing what data you hold, where it is, how sensitive it is, who it goes to and how long you keep it.</p>
        <p className={`mt-2 ${P}`}><span className="font-semibold">When:</span> build it once, review yearly, and update when systems or vendors change.</p>
      </div>
      <div className={CARD}>
        <h3 className="font-semibold text-gray-900 dark:text-white mb-2">Step by step</h3>
        <ol className={`list-decimal pl-5 space-y-2 ${P}`}>{STEPS.map(([t, d]) => <li key={t}><span className="font-semibold">{t}:</span> {d}</li>)}</ol>
      </div>
      <div className={CARD}>
        <h3 className="font-semibold text-gray-900 dark:text-white mb-2">A simple four-level classification scheme</h3>
        <div className="overflow-x-auto" tabIndex={0} role="region" aria-label="Classification scheme">
          <table className="w-full min-w-[560px] text-sm">
            <thead><tr>{['Level', 'Meaning', 'Examples', 'Minimum handling'].map((h) => <th key={h} scope="col" className={TH}>{h}</th>)}</tr></thead>
            <tbody>{CLASSES.map((r) => <tr key={r[0]}>{r.map((c, j) => <td key={j} className={`${TD} ${j === 0 ? 'font-medium' : ''}`}>{c}</td>)}</tr>)}</tbody>
          </table>
        </div>
      </div>
      <div className={CARD}>
        <h3 className="font-semibold text-gray-900 dark:text-white mb-2">How to test it and what auditors ask for</h3>
        <ul className={`list-disc pl-5 space-y-1 ${P}`}>
          <li>Pick five systems from the SSO app list or network scan and check each appears in the inventory with an owner and classification.</li>
          <li>Pick three records of processing and trace each to the real system, the vendor contract and the retention setting.</li>
          <li>Evidence: data inventory, classification policy, label settings, record of processing, last review date and approver.</li>
        </ul>
        <h3 className="font-semibold text-gray-900 dark:text-white mt-4 mb-2">Common pitfalls</h3>
        <ul className={`list-disc pl-5 space-y-1 ${P}`}>
          <li>Inventory built once and never updated.</li>
          <li>Shadow tools and spreadsheets left out.</li>
          <li>Retention written in the record but not set in the system.</li>
        </ul>
      </div>
      <div className={CARD}>
        <h3 className="font-semibold text-gray-900 dark:text-white mb-2">Maps to</h3>
        <ul className={`list-disc pl-5 space-y-1 ${P}`}>{MAPS.map(([f, r]) => <li key={f}><span className="font-medium">{f}:</span> {r}</li>)}</ul>
        <p className={`mt-2 ${P}`}>Scoping employee personal data under DPDPA and GDPR is covered on the <Link className="ui-link" to="/dpdpa#employee-data">DPDPA page</Link>. Classification labels drive the DLP rules in <Link className="ui-link" to="/knowledge?topic=edp">Endpoint and Data Protection</Link>.</p>
      </div>
      <div className="rounded-xl border border-gray-200 dark:border-gray-700 p-3 text-sm">
        <p className="font-semibold text-gray-900 dark:text-white mb-2">Templates</p>
        {user ? (
          <ul className="space-y-2">
            {[{ name: 'Data Inventory Map', file: 'data-inventory-map.xlsx', d: 'systems, data categories, classification, owner, location and retention' }, { name: 'Records of Processing (ROPA) and DPIA', file: 'ropa-dpia.xlsx', d: 'record of processing activities with a DPIA screen' }].map((t) => (
              <li key={t.file} className="flex flex-wrap items-center justify-between gap-2"><span className="text-gray-800 dark:text-gray-200"><span className="font-medium">{t.name}</span>: {t.d}</span><TemplateDownloadButton template={t} compact /></li>
            ))}
          </ul>
        ) : <p className="text-xs text-gray-600 dark:text-gray-400">Log in to download templates.</p>}
      </div>
      <p className="mt-3 text-xs text-gray-500 dark:text-gray-400">Source: ISO/IEC 27001:2022 Annex A, GDPR Art. 30, DPDP Act 2023. Last verified: 17 Nov 2026.</p>
    </div>
  );
}
