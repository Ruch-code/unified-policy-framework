// ISO 27001 reference blocks shared by the Lead Implementer and Lead Auditor pages:
// 2013 vs 2022 differences, and mandatory documented information.
const CARD = 'rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800';
const P = 'text-sm text-gray-700 dark:text-gray-300';
const TH = 'p-2 text-left font-semibold text-gray-900 dark:text-white bg-gray-50 dark:bg-gray-900';
const TD = 'p-2 align-top text-gray-700 dark:text-gray-300 border-t border-gray-100 dark:border-gray-700';

function Table({ head, rows, min = 640 }) {
  return (
    <div className="overflow-x-auto" tabIndex={0} role="region" aria-label={head.join(', ')}>
      <table className="w-full text-sm" style={{ minWidth: min }}>
        <thead><tr>{head.map((h) => <th key={h} scope="col" className={TH}>{h}</th>)}</tr></thead>
        <tbody>{rows.map((r, i) => <tr key={i}>{r.map((c, j) => <td key={j} className={`${TD} ${j === 0 ? 'font-medium whitespace-nowrap' : ''}`}>{c}</td>)}</tr>)}</tbody>
      </table>
    </div>
  );
}

const STRUCTURE = [
  ['Annex A size', '114 controls in 14 domains (A.5 to A.18)', '93 controls in 4 themes'],
  ['Grouping', 'Domains such as A.9 Access control and A.12 Operations security', 'Organisational (A.5, 37), People (A.6, 8), Physical (A.7, 14), Technological (A.8, 34)'],
  ['How the change happened', '', '11 new controls, 24 formed by merging older controls, 58 updated'],
  ['Control attributes', 'None', 'ISO/IEC 27002:2022 adds attributes: control type, security properties, cybersecurity concepts, operational capabilities, security domains'],
  ['Numbering example', 'A.7.1.1 Screening', 'A.6.1 Screening'],
  ['Transition', '', 'Certificates against the 2013 edition expired on 31 October 2025'],
  ['Amendment', '', 'Amendment 1 (2024) adds climate change to clauses 4.1 and 4.2'],
];

const CLAUSES = [
  ['4.2', 'New item c): decide which interested party requirements the ISMS will address'],
  ['4.4', 'The ISMS must include the needed processes and their interactions'],
  ['6.2', 'Objectives must be monitored and kept as documented information'],
  ['6.3', 'New clause: changes to the ISMS must be planned'],
  ['8.1', 'Set criteria for processes and control externally provided processes, products and services'],
  ['9.2 and 9.3', 'Split into sub-clauses (9.2.1, 9.2.2 and 9.3.1 to 9.3.3); management review inputs add changes in interested party needs'],
  ['10', 'Order swapped: 10.1 Continual improvement, 10.2 Nonconformity and corrective action'],
];

const NEW_CONTROLS = [
  ['A.5.7', 'Threat intelligence', 'Subscribe to a threat feed and record what you acted on'],
  ['A.5.23', 'Information security for use of cloud services', 'Cloud provider review and shared-responsibility record'],
  ['A.5.30', 'ICT readiness for business continuity', 'Restore tests against RTO and RPO'],
  ['A.7.4', 'Physical security monitoring', 'CCTV or alarm monitoring at offices that hold assets'],
  ['A.8.9', 'Configuration management', 'Hardened baselines and drift reports'],
  ['A.8.10', 'Information deletion', 'Deletion on request and at end of retention, with records'],
  ['A.8.11', 'Data masking', 'Masked or synthetic data in test and analytics'],
  ['A.8.12', 'Data leakage prevention', 'DLP rules on email, endpoints and cloud storage'],
  ['A.8.16', 'Monitoring activities', 'Alerting on unusual behaviour, reviewed by a named team'],
  ['A.8.23', 'Web filtering', 'DNS or proxy filtering of malicious sites'],
  ['A.8.28', 'Secure coding', 'Secure coding standard, code review and scanning in CI'],
];

const MANDATORY_DOCS = [
  ['4.3', 'ISMS scope'],
  ['5.2', 'Information security policy'],
  ['6.1.2', 'Risk assessment process'],
  ['6.1.3', 'Risk treatment process'],
  ['6.1.3 d)', 'Statement of Applicability'],
  ['6.1.3 e) and 6.1.3 f)', 'Risk treatment plan, with risk owner approval'],
  ['6.2', 'Information security objectives'],
  ['7.2', 'Evidence of competence'],
  ['7.5.1 b)', 'Other documented information the organisation decides it needs'],
  ['8.1', 'Evidence that processes ran as planned'],
  ['8.2', 'Risk assessment results'],
  ['8.3', 'Risk treatment results'],
  ['9.1', 'Monitoring and measurement results'],
  ['9.2.2', 'Internal audit programme and results'],
  ['9.3.3', 'Management review results'],
  ['10.2', 'Nonconformities, actions taken and results of corrective action'],
];

const ANNEX_POLICIES = [
  ['A.5.1', 'Topic-specific policies approved by management (for example access control, acceptable use, cryptography, backup, supplier security)'],
  ['A.5.10', 'Acceptable use of information and assets'],
  ['A.5.15', 'Access control'],
  ['A.5.24 to A.5.26', 'Incident management planning and response procedures'],
  ['A.5.31', 'Legal, statutory, regulatory and contractual requirements register'],
  ['A.5.37', 'Documented operating procedures'],
  ['A.6.2', 'Terms and conditions of employment that cover security responsibilities'],
  ['A.6.6', 'Confidentiality or non-disclosure agreements'],
  ['A.8.24', 'Rules for the use of cryptography, including key management'],
];

export function Iso2013vs2022() {
  return (
    <details id="iso-2013-vs-2022" className={`${CARD} max-w-6xl mx-auto my-4 scroll-mt-24`}>
      <summary className="cursor-pointer p-4 text-lg font-bold text-gray-900 dark:text-white">ISO 27001:2013 vs ISO 27001:2022: what changed</summary>
      <div className="px-4 pb-4 space-y-4">
        <p className={P}>The management system clauses changed only slightly. Most of the change is in Annex A, which was regrouped and refreshed to match ISO/IEC 27002:2022.</p>
        <Table head={['Area', '2013 edition', '2022 edition']} rows={STRUCTURE} />
        <h3 className="font-semibold text-gray-900 dark:text-white">Clause changes (4 to 10)</h3>
        <Table head={['Clause', 'Change in 2022']} rows={CLAUSES} min={520} />
        <h3 className="font-semibold text-gray-900 dark:text-white">The 11 new Annex A controls</h3>
        <Table head={['Control', 'Title', 'What auditors expect to see']} rows={NEW_CONTROLS} />
        <div className="rounded-lg border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-900 p-3">
          <p className="text-xs font-semibold uppercase tracking-wide text-gray-500 dark:text-gray-400">Example</p>
          <p className={`mt-1 ${P}`}>A 40-person fintech certified in 2021 moves its Statement of Applicability to 2022 numbering. A.9 (access control, 14 controls) becomes A.5.15 to A.5.18 and A.8.2 to A.8.5. It then adds the 11 new controls, finds it already does secure coding reviews (A.8.28) and DLP on email (A.8.12), and writes treatment plans for threat intelligence (A.5.7) and data masking (A.8.11), which it did not have.</p>
        </div>
      </div>
    </details>
  );
}

export function Iso27001MandatoryDocs() {
  return (
    <details id="iso-mandatory-docs" className={`${CARD} max-w-6xl mx-auto my-4 scroll-mt-24`}>
      <summary className="cursor-pointer p-4 text-lg font-bold text-gray-900 dark:text-white">Mandatory documents and policies for ISO 27001:2022</summary>
      <div className="px-4 pb-4 space-y-4">
        <p className={P}>Clauses 4 to 10 require the documented information below. An auditor raises a nonconformity if any is missing.</p>
        <Table head={['Clause', 'Documented information required']} rows={MANDATORY_DOCS} min={480} />
        <h3 className="font-semibold text-gray-900 dark:text-white">Policies expected through Annex A</h3>
        <p className={P}>These become mandatory when the control is applicable in your Statement of Applicability.</p>
        <Table head={['Control', 'Policy or procedure']} rows={ANNEX_POLICIES} min={480} />
      </div>
    </details>
  );
}
