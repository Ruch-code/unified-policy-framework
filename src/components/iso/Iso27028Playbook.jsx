// ISO/IEC 27028:2026 playbook: using control attributes in practice.
const P = 'text-sm text-gray-700 dark:text-gray-300';
const H = 'mt-5 mb-1 text-base font-semibold text-gray-900 dark:text-white';
const TH = 'p-2 text-left font-semibold text-gray-900 dark:text-white bg-gray-50 dark:bg-gray-900';
const TD = 'p-2 align-top border-t border-gray-100 dark:border-gray-700 text-gray-700 dark:text-gray-300';

function Table({ head, rows }) {
  return (
    <div className="overflow-x-auto my-2" tabIndex={0} role="region" aria-label={head.join(', ')}>
      <table className="w-full text-sm" style={{ minWidth: 640 }}>
        <thead><tr>{head.map((h) => <th key={h} scope="col" className={TH}>{h}</th>)}</tr></thead>
        <tbody>{rows.map((r) => <tr key={r[0]}>{r.map((c, j) => <td key={j} className={`${TD} ${j === 0 ? 'font-medium' : ''}`}>{c}</td>)}</tr>)}</tbody>
      </table>
    </div>
  );
}

export default function Iso27028Playbook() {
  return (
    <details className="max-w-6xl mx-auto my-6 rounded-2xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 p-5" id="iso-27028-playbook">
      <summary className="cursor-pointer text-lg font-bold text-gray-900 dark:text-white">ISO/IEC 27028:2026 playbook: using control attributes</summary>
      <div className="mt-3">
        <p className={P}><strong>What it is:</strong> ISO/IEC 27028:2026 (Information security, cybersecurity and privacy protection: Guidance on using information security control attributes) is a guidance standard published in November 2026, first edition. ISO/IEC 27002:2022 introduced five attributes for its 93 controls and said organisations could create their own, but did not explain how. ISO/IEC 27028 fills that gap: how to use the five attributes, and how to design additional attributes and values. It is guidance, not a certifiable requirement.</p>

        <h3 className={H}>The five ISO/IEC 27002 attributes (the starting point)</h3>
        <Table head={['Attribute', 'Values', 'Useful for']} rows={[
          ['Control type', 'Preventive, Detective, Corrective', 'Checking you do not rely only on prevention'],
          ['Information security properties', 'Confidentiality, Integrity, Availability', 'Linking controls to risk impact'],
          ['Cybersecurity concepts', 'Identify, Protect, Detect, Respond, Recover', 'A NIST CSF style view for leadership'],
          ['Operational capabilities', 'Governance, Asset management, Information protection, Human resource security, Physical security, System and network security, Application security, Secure configuration, Identity and access management, Threat and vulnerability management, Continuity, Supplier relationships security, Legal and compliance, Information security event management, Information security assurance', 'Assigning control owners by capability'],
          ['Security domains', 'Governance and Ecosystem, Protection, Defence, Resilience', 'Board level grouping'],
        ]} />

        <h3 className={H}>Playbook: putting attributes to work</h3>
        <ol className={`list-decimal pl-5 space-y-1 ${P}`}>
          <li><strong>Build the control register.</strong> One row per control (Annex A plus your own), with a column per attribute. Start from the 27002 attribute tables.</li>
          <li><strong>Decide the questions you need answered.</strong> Attributes are only useful if they support a view someone needs, for example "which controls are detective for our crown-jewel systems?"</li>
          <li><strong>Add organisation-defined attributes</strong> where the five do not answer your questions. Give each a clear name, definition, allowed values and an owner, as the standard advises.</li>
          <li><strong>Tag consistently.</strong> Agree tagging rules and have a second person review. Inconsistent tags make views misleading.</li>
          <li><strong>Build views.</strong> Filter or pivot the register: by owner, by framework, by automation level, by control type.</li>
          <li><strong>Use the views in risk treatment and audits.</strong> For example, show that each high risk has preventive and detective coverage.</li>
          <li><strong>Maintain.</strong> Review attributes when controls change and at least yearly with the Statement of Applicability.</li>
        </ol>

        <h3 className={H}>Examples of organisation-defined attributes</h3>
        <p className={P}>These are common practical examples, not a list copied from the standard.</p>
        <Table head={['Attribute', 'Example values', 'Why it helps']} rows={[
          ['Control owner team', 'IT, Engineering, HR, Legal, Security', 'Accountability and evidence requests'],
          ['Implementation', 'Manual, Semi-automated, Automated', 'Audit sample sizes and automation roadmap'],
          ['Frequency', 'Continuous, Daily, Monthly, Quarterly, Annual', 'Testing plan and evidence calendar'],
          ['Framework mapping', 'SOC 2 CCx, ISO 27701, NIST CSF, DPDP', 'Test once, report many'],
          ['Asset or environment', 'Cloud, On-premises, Endpoint, SaaS', 'Scoping and coverage gaps'],
          ['Evidence type', 'Configuration, Log, Ticket, Report, Attestation', 'Faster evidence collection'],
        ]} />

        <h3 className={H}>Audit and interview angle</h3>
        <ul className={`list-disc pl-5 space-y-1 ${P}`}>
          <li>Auditors will not certify against ISO/IEC 27028, but a well-tagged register shows mature control design and makes the SoA easier to defend.</li>
          <li>Common gap: attributes tagged once during implementation and never updated.</li>
          <li>Interview line: "I use attributes to turn a flat Annex A list into views each stakeholder needs: control type coverage for risk, CSF functions for the board, and owner and frequency for the audit calendar."</li>
        </ul>
        <p className="mt-2 text-xs text-gray-500 dark:text-gray-400">Source: ISO/IEC 27028:2026 summary at iso27001security.com; ISO/IEC 27002:2022 attribute tables. Check the purchased standard for its full list of suggested additional attributes.</p>
      </div>
    </details>
  );
}
