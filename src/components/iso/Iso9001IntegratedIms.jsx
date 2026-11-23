// ISO 9001 + ISO 27001 integrated management system (IMS): what can be shared, what stays separate, how to implement and audit.
const P = 'text-sm text-gray-700 dark:text-gray-300';
const H = 'mt-5 mb-1 text-base font-semibold text-gray-900 dark:text-white';
const TH = 'p-2 text-left font-semibold text-gray-900 dark:text-white bg-gray-50 dark:bg-gray-900';
const TD = 'p-2 align-top border-t border-gray-100 dark:border-gray-700 text-gray-700 dark:text-gray-300';

function Table({ head, rows }) {
  return (
    <div className="overflow-x-auto my-2" tabIndex={0} role="region" aria-label={head.join(', ')}>
      <table className="w-full text-sm" style={{ minWidth: 720 }}>
        <thead><tr>{head.map((h) => <th key={h} scope="col" className={TH}>{h}</th>)}</tr></thead>
        <tbody>{rows.map((r) => <tr key={r[0]}>{r.map((c, j) => <td key={j} className={`${TD} ${j === 0 ? 'font-medium' : ''}`}>{c}</td>)}</tr>)}</tbody>
      </table>
    </div>
  );
}

export default function Iso9001IntegratedIms() {
  return (
    <details id="iso9001-27001-ims" className="max-w-6xl mx-auto my-6 rounded-2xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 p-5 scroll-mt-24">
      <summary className="cursor-pointer text-lg font-bold text-gray-900 dark:text-white">ISO 9001 and ISO 27001 as one integrated management system</summary>
      <div className="mt-3">
        <p className={P}>ISO 9001 (quality management) and ISO 27001 (information security management) share the same high-level structure, Clauses 4 to 10, so one management system can run both. Integration means one set of governance processes (context, leadership, risk process, document control, internal audit, management review, corrective action) with two sets of specific requirements on top. You still get two certificates, but usually from one combined audit.</p>
        <p className={`${P} mt-2`}>Editions: ISO 27001:2022 is current. Check whether a revised ISO 9001 edition has been published before you cite ISO 9001:2015, as a revision has been in progress.</p>

        <h3 className={H}>Clause by clause: what is shared and what is specific</h3>
        <Table head={['Clause', 'Shared in the IMS', 'ISO 9001 specific', 'ISO 27001 specific']} rows={[
          ['4 Context', 'One context analysis, interested parties register, one scope document covering both', 'Quality scope and any requirements that do not apply, with justification', 'ISMS scope with interfaces and dependencies'],
          ['5 Leadership', 'One integrated policy or a policy set, one roles and responsibilities matrix', 'Customer focus, quality policy', 'Information security policy and objectives'],
          ['6 Planning', 'One risk and opportunity process and register; one objectives plan', 'Risks to product and service conformity and customer satisfaction', 'Information security risk assessment and treatment, Statement of Applicability (6.1.2, 6.1.3)'],
          ['7 Support', 'Competence, awareness, communication and document control done once', 'Monitoring and measuring resources, organisational knowledge', 'Security awareness content, controlled ISMS documents'],
          ['8 Operation', 'One planning and control process for operations and outsourced processes', 'Design and development, supplier control, production and service, release, nonconforming outputs', 'Implementing risk treatment and Annex A controls; periodic risk assessment'],
          ['9 Performance', 'One internal audit programme and one management review', 'Customer satisfaction, analysis of quality data', 'Monitoring of security controls and ISMS effectiveness'],
          ['10 Improvement', 'One nonconformity and corrective action process', 'Product and service nonconformities', 'Security incidents feeding corrective action'],
        ]} />

        <h3 className={H}>Implementation plan</h3>
        <ol className={`list-decimal pl-5 space-y-1 ${P}`}>
          <li>Gap assessment against both standards, using a single clause map.</li>
          <li>Decide the integration model: fully integrated manual and processes, or shared core with separate specific procedures.</li>
          <li>Merge the governance documents first: scope, context, policy, roles, document control, internal audit, management review, corrective action.</li>
          <li>Build one risk register with categories for quality and information security; keep the ISO 27001 risk assessment method and SoA as specific outputs.</li>
          <li>Map operational processes once, then attach quality controls and Annex A controls to the same process steps (for example, supplier onboarding covers quality approval and security due diligence).</li>
          <li>Train internal auditors on both standards; run one integrated audit programme.</li>
          <li>Hold one management review covering the inputs required by both standards.</li>
          <li>Ask the certification body for a combined audit; confirm audit days and whether both certificates align to the same cycle.</li>
        </ol>

        <h3 className={H}>Benefits and common pitfalls</h3>
        <Table head={['Benefits', 'Pitfalls']} rows={[
          ['Less duplicated documentation and fewer audits', 'Merging so much that ISO 27001 specific outputs (risk treatment plan, SoA) get lost'],
          ['One risk and corrective action process the business actually uses', 'Quality team and security team still running separate registers in practice'],
          ['Combined audit can reduce total audit time and cost', 'Internal auditors trained in only one standard'],
          ['A single management review gives leadership one view', 'Management review minutes that miss inputs required by one of the standards'],
        ]} />

        <h3 className={H}>Interview angle</h3>
        <p className={P}>"Because both standards use the same Clause 4 to 10 structure, I integrate the governance layer once: context, leadership, risk process, document control, internal audit, management review and corrective action. On top I keep what is specific: product and customer requirements for 9001, and the security risk assessment, Statement of Applicability and Annex A controls for 27001. The test of a good IMS is that one internal audit and one management review cover both without gaps."</p>
        <p className="mt-2 text-xs text-gray-500 dark:text-gray-400">Clause references follow the harmonised structure used by both standards. Confirm exact requirements in the purchased standards and with your certification body.</p>
      </div>
    </details>
  );
}
