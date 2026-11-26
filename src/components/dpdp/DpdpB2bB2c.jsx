// DPDP Act 2023 and DPDP Rules 2025: how obligations apply in B2B versus B2C relationships.
const P = 'text-sm leading-relaxed text-slate-700 dark:text-slate-300';
const H = 'mt-5 mb-1 text-base font-semibold text-slate-900 dark:text-white';
const TH = 'p-2 text-left font-semibold text-slate-900 dark:text-white bg-slate-50 dark:bg-slate-900 align-bottom';
const TD = 'p-2 align-top border-t border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300';

function Table({ head, rows, min = 820 }) {
  return (
    <div className="overflow-x-auto my-2 rounded-lg border border-slate-200 dark:border-slate-700" tabIndex={0} role="region" aria-label={head.join(', ')}>
      <table className="w-full text-sm" style={{ minWidth: min }}>
        <thead><tr>{head.map((h) => <th key={h} scope="col" className={TH}>{h}</th>)}</tr></thead>
        <tbody>{rows.map((r) => <tr key={r[0]}>{r.map((c, j) => <td key={j} className={`${TD} ${j === 0 ? 'font-semibold text-slate-900 dark:text-white' : ''}`}>{c}</td>)}</tr>)}</tbody>
      </table>
    </div>
  );
}

const SUBJECTS = [
  ['Who the Data Principals are', 'Individuals linked to business relationships: your own employees and contractors, and named contacts at clients, vendors, partners and distributors', 'Individual customers, app or website users, prospects, leads, and members of the public'],
  ['Your usual role', 'Often a Data Fiduciary for your own staff and contacts, and a Data Processor when you process a business client\'s customer data on their instructions', 'Usually the Data Fiduciary, deciding why and how customer data is processed'],
  ['Volume and sensitivity', 'Smaller number of people; work contact details, KYC of partner individuals, bank details for payouts', 'Large volumes; profiles, behaviour, location, payment data, and possibly children\'s data'],
  ['What is not in scope', 'Pure company data such as a company\'s name, GST number or turnover is not personal data. It becomes personal data when it identifies an individual, for example a sole proprietor or a named contact.', 'Fully anonymised, aggregated data that cannot identify a person'],
];

const USE_CASES = [
  ['Employees and contractors', 'Users and customers of an app, website or store'],
  ['Channel partners, distributors, sub-brokers and agents (KYC, onboarding, commissions)', 'Prospects and leads from ads, forms and events'],
  ['Vendor and supplier contacts (onboarding, invoices, payments)', 'Loyalty, rewards and referral programmes'],
  ['Client contacts in CRM and account management', 'Marketing, personalisation and analytics'],
  ['Processing a business client\'s end-customer data as their Data Processor (SaaS, BPO, payroll, cloud)', 'Customer support, complaints and service requests'],
  ['Visitor logs and access cards at offices', 'Children\'s accounts in edtech, gaming or social platforms'],
];

const B2B = [
  ['Lawful basis and purpose', 'Identify the basis for each purpose. Employment purposes can use legitimate use (Section 7(i)), and legal obligations such as tax or KYC can use Section 7(d) or other legal-duty grounds. Partner and vendor contact data used beyond the contract, for example for marketing, needs consent.', 'Record of purposes and lawful basis per data category'],
  ['Due diligence on partners and processors', 'Engage Data Processors only under a valid contract (Section 8(2)). Check their security, breach notice and erasure capability before onboarding, and review periodically.', 'Vendor assessment, DPDP clauses or addendum, review records'],
  ['Contractual allocation of roles', 'State in contracts who is the Data Fiduciary and who is the Processor, the permitted purposes, security safeguards, breach notification timelines to you, sub-processor approval, and return or deletion at exit.', 'Signed contracts with role, purpose and deletion clauses'],
  ['Partner and sub-broker data flows', 'Map what personal data channel partners collect for you and pass on, and make sure they give the right notice and get consent where needed on your behalf.', 'Data flow map; partner agreements; sample notices used by partners'],
  ['Employee data', 'Limit monitoring and HR data to what is necessary, restrict access, and set retention linked to employment and legal requirements.', 'HR data inventory, access list, retention schedule'],
];

const B2C = [
  ['Notice and transparency', 'Give a clear, standalone notice in plain language, available in English or any Eighth Schedule language, listing the data, purposes, how to withdraw consent, how to exercise rights and how to complain to the Data Protection Board (Section 5; Rule 3).', 'Published notice; screenshots of the notice at collection points'],
  ['Consent management', 'Consent must be free, specific, informed, unconditional and unambiguous, given by clear affirmative action, and as easy to withdraw as to give (Section 6). Keep consent records; consider registered Consent Managers.', 'Consent records with time, version and purpose; withdrawal flow test'],
  ['Children and persons with disabilities', 'Get verifiable consent of a parent or lawful guardian before processing a child\'s data; no tracking, behavioural monitoring or targeted advertising aimed at children (Section 9; Rules 10 to 12, with listed exemptions).', 'Age-gating and parental consent design; exemption analysis'],
  ['Data Principal rights at scale', 'Handle access, correction, completion, erasure, grievance and nomination requests, and publish how to make them (Sections 11 to 14). Respond to grievances within the period set in the Rules (up to 90 days).', 'Rights request log, SLA tracking, published contact details'],
  ['Marketing and profiling', 'Use separate consent for marketing and personalisation, honour withdrawal across all channels and processors, and avoid dark patterns.', 'Consent purpose separation; suppression lists; UX review'],
  ['Retention for consumer platforms', 'Erase data when the purpose is served or consent is withdrawn; large e-commerce, online gaming and social media intermediaries in the Third Schedule must erase after the stated inactivity period with 48 hours\' notice (Rule 8).', 'Retention schedule; erasure job logs; advance notices'],
];

const COMMON = [
  ['Data protection by design', 'Build minimisation, purpose limits, access control and retention into systems and processes from the start.', 'Design reviews, privacy checklists in change management'],
  ['Security safeguards', 'Reasonable safeguards including encryption, masking or tokenisation, access control, logging, monitoring and backups, with logs kept at least one year (Section 8(5); Rule 6).', 'Security controls evidence, log retention configuration'],
  ['Breach response', 'Inform affected Data Principals without delay and the Data Protection Board, with a detailed report within 72 hours of becoming aware (Section 8(6); Rule 7).', 'Breach procedure, templates, test or incident records'],
  ['Accuracy and erasure', 'Keep data complete and accurate where it is used for decisions or shared, and erase it when no longer needed, including at processors (Section 8(3) and 8(7)).', 'Data quality checks, deletion confirmations from processors'],
  ['Grievance contact', 'Publish the business contact details of a DPO or a person who can answer questions about processing (Section 8(9)).', 'Contact details on website and in notices'],
  ['Accountability', 'Keep records that show compliance; a Significant Data Fiduciary must also appoint a DPO based in India, run DPIAs and periodic audits (Section 10; Rule 13).', 'Policies, registers, audit and DPIA reports'],
];

export default function DpdpB2bB2c() {
  return (
    <section id="dpdp-b2b-b2c" className="mx-auto max-w-6xl px-4 my-8 scroll-mt-24">
      <details className="rounded-2xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 p-5">
        <summary className="cursor-pointer text-lg font-bold text-slate-900 dark:text-white">B2B vs B2C under the DPDP Act: who the data subjects are and what you must do</summary>
        <div className="mt-3">
          <p className={P}>The DPDP Act applies whenever a business processes digital personal data of an individual. It does not have separate rules for B2B and B2C, but the people whose data you hold, and so the way each obligation is applied, are very different.</p>

          <h3 className={H}>1. Data subjects (Data Principals)</h3>
          <Table head={['Aspect', 'B2B', 'B2C']} rows={SUBJECTS} />

          <h3 className={H}>2. Common use cases</h3>
          <Table head={['B2B', 'B2C']} rows={USE_CASES} min={700} />

          <h3 className={H}>3. Key obligations for B2B</h3>
          <Table head={['Obligation', 'What it means in practice', 'Evidence']} rows={B2B} />

          <h3 className={H}>4. Key obligations for B2C</h3>
          <Table head={['Obligation', 'What it means in practice', 'Evidence']} rows={B2C} />

          <h3 className={H}>5. Common obligations for both</h3>
          <Table head={['Obligation', 'What it means in practice', 'Evidence']} rows={COMMON} />

          <h3 className={H}>Key takeaway</h3>
          <p className={P}>The core principles are the same in both models: a lawful basis, a clear purpose, minimal data, security, breach response and accountability. What changes is how they are applied. B2B compliance is mostly about contracts, roles, partner and vendor due diligence, and employee data. B2C compliance is mostly about notices, consent, children, rights requests and retention at scale. Start from who the data subjects are and the context of processing, then apply the same principles to that context.</p>
          <p className="mt-2 text-xs text-slate-500 dark:text-slate-400">Based on the Digital Personal Data Protection Act 2023 and the DPDP Rules 2025, which apply in phases. Confirm commencement dates and get legal advice for specific situations.</p>
        </div>
      </details>
    </section>
  );
}
