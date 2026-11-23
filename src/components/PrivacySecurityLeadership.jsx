// DPO vs CISO vs CPO vs CTO: who owns what, and why the DPO stays independent.
const TH = 'p-2 text-left font-semibold text-gray-900 dark:text-white bg-gray-50 dark:bg-gray-900';
const TD = 'p-2 align-top border-t border-gray-100 dark:border-gray-700 text-gray-700 dark:text-gray-300';

function Table({ head, rows }) {
  return (
    <div className="overflow-x-auto my-2" tabIndex={0} role="region" aria-label={head.join(', ')}>
      <table className="w-full text-sm" style={{ minWidth: 560 }}>
        <thead><tr>{head.map((h) => <th key={h} scope="col" className={TH}>{h}</th>)}</tr></thead>
        <tbody>{rows.map((r) => <tr key={r[0]}>{r.map((c, j) => <td key={j} className={`${TD} ${j === 0 ? 'font-medium' : ''}`}>{c}</td>)}</tr>)}</tbody>
      </table>
    </div>
  );
}

export default function PrivacySecurityLeadership() {
  return (
    <details className="bg-white border border-blue-200 rounded-2xl p-6 mb-8 dark:bg-gray-800 dark:border-blue-800" id="dpo-ciso-cpo-cto">
      <summary className="cursor-pointer text-xl font-bold text-gray-900 dark:text-white">DPO, CISO, CPO and CTO: who owns what</summary>
      <div className="mt-3 text-sm text-gray-700 dark:text-gray-300">
        <p>The DPO is the independent privacy compliance monitor. The CISO owns security. The CPO usually owns privacy strategy. The CTO owns technology and engineering.</p>
        <Table head={['Role', 'Main job', 'Typical reporting line']} rows={[
          ['DPO (Data Protection Officer)', 'Informs and advises on data protection duties, monitors compliance, advises on DPIAs, and is the contact point for the regulator and data subjects', 'Highest management level, such as the CEO or board (GDPR Art. 38(3))'],
          ['CISO (Chief Information Security Officer)', 'Runs the security programme: risk, controls, security operations and incident response', 'CEO, CIO, CTO or COO, varies by company'],
          ['CPO (Chief Privacy Officer)', 'Sets privacy strategy, builds the privacy programme and embeds privacy into products', 'General Counsel, CEO or Chief Compliance Officer, varies by company'],
          ['CTO (Chief Technology Officer)', 'Owns technology direction, architecture and engineering delivery', 'CEO'],
        ]} />

        <h3 className="mt-5 mb-1 text-base font-semibold text-gray-900 dark:text-white">Why the DPO usually cannot report to the CISO, CPO or CTO</h3>
        <Table head={['If the DPO reports to', 'Why it is a problem']} rows={[
          ['CISO', 'The DPO may need to challenge security decisions about personal data. Reporting to the person being challenged weakens independence.'],
          ['CPO', 'The CPO designs the privacy programme the DPO monitors, so the DPO would be checking their own manager\'s work.'],
          ['CTO', 'The CTO decides how systems process personal data, which is exactly what the DPO must assess. This is a classic conflict of interest.'],
        ]} />
        <p className="mt-2"><strong>Simple rule:</strong> the DPO should not report to, or be, the person who decides why and how personal data is processed. GDPR Art. 38(3) says the DPO reports directly to the highest management level and must not be dismissed or penalised for doing the job. Art. 38(6) allows other duties only if they do not create a conflict of interest.</p>
        <p className="mt-2">In smaller companies one person may hold the CPO and DPO titles. That can work if they do not also decide the purposes and means of processing, and the arrangement is documented.</p>
        <p className="mt-2 text-xs text-gray-500 dark:text-gray-400">Under India's DPDP Act, a DPO is required only for a Significant Data Fiduciary, must be based in India and is responsible to the Board of Directors or similar governing body (Section 10(2)(a)).</p>
      </div>
    </details>
  );
}
