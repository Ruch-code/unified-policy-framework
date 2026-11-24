// DPDP Act: regulatory context not covered elsewhere on the page.
// Board process and appeals, Consent Manager framework, interplay with the IT Act and CERT-In, and a UK GDPR comparison.
const P = 'text-sm leading-relaxed text-slate-700 dark:text-slate-300';
const H = 'mt-5 mb-1 text-base font-semibold text-slate-900 dark:text-white';
const TH = 'p-2 text-left font-semibold text-slate-900 dark:text-white bg-slate-50 dark:bg-slate-900';
const TD = 'p-2 align-top border-t border-slate-100 dark:border-slate-700 text-slate-700 dark:text-slate-300';

function Table({ head, rows }) {
  return (
    <div className="overflow-x-auto my-2" tabIndex={0} role="region" aria-label={head.join(', ')}>
      <table className="w-full text-sm" style={{ minWidth: 620 }}>
        <thead><tr>{head.map((h) => <th key={h} scope="col" className={TH}>{h}</th>)}</tr></thead>
        <tbody>{rows.map((r) => <tr key={r[0]}>{r.map((c, j) => <td key={j} className={`${TD} ${j === 0 ? 'font-medium' : ''}`}>{c}</td>)}</tr>)}</tbody>
      </table>
    </div>
  );
}

function Part({ id, title, children }) {
  return (
    <details id={id} className="rounded-xl border border-slate-200 dark:border-slate-700 p-4">
      <summary className="cursor-pointer font-semibold text-slate-900 dark:text-white">{title}</summary>
      <div className="mt-2">{children}</div>
    </details>
  );
}

export default function DpdpRegulatoryContext() {
  return (
    <section id="dpdp-regulatory-context" className="mx-auto max-w-6xl px-4 my-8 scroll-mt-24">
      <h2 className="text-2xl font-bold text-slate-900 dark:text-white">Regulators, Consent Managers and related Indian laws</h2>
      <p className={`${P} mt-1 max-w-3xl`}>How enforcement works, how Consent Managers fit in, and how the DPDP Act sits alongside the IT Act, CERT-In directions and UK GDPR. Section and Rule numbers are given so you can check the source. Not legal advice.</p>
      <div className="mt-4 space-y-3">

        <Part id="dpdp-starter-pack" title="DPDP starter pack: the 10 documents most organisations need, and why DPDP is behavioural">
          <p className={P}>DPDP compliance is more <strong>behavioural</strong> than purely technical. It is mostly about how an organisation acts, communicates and makes decisions about personal data: telling people what happens (notices), giving them choice (consent), and running internal processes (SOPs and training). Technical safeguards such as encryption and firewalls are one part (Section 8(5), Rule 6), not the whole.</p>
          <Table head={['Document', 'What it is', 'DPDP link']} rows={[
            ['Data inventory', 'A record of the personal data you collect and store: what, where, why, whose and who can access it.', 'Foundation for Sections 4 to 8'],
            ['Privacy notice', 'Information for people about how their data is used, in plain language.', 'Section 5, Rule 3'],
            ['Consent text', 'The exact wording used to ask for permission, one purpose at a time, with how to withdraw.', 'Section 6'],
            ['Lawful basis map', 'For each purpose, whether you rely on consent or a listed legitimate use, and why.', 'Sections 4, 6, 7'],
            ['Retention table', 'How long each type of data is kept and when it is erased, including legal retention.', 'Section 8(7), Rules 6(1)(e), 8'],
            ['Security baseline', 'The minimum security measures in place, such as access control, encryption, logging and backups.', 'Section 8(5), Rule 6'],
            ['Grievance SOP', 'How complaints and rights requests are received, tracked and answered within the published time (maximum 90 days).', 'Sections 11 to 13, Rule 14'],
            ['Breach SOP template', 'Steps, owners and templates for intimating affected people and the Board, and the 72-hour report.', 'Section 8(6), Rule 7'],
            ['Vendor list with DPDP clause', 'Every processor, the data it handles, and the data protection clauses in its contract.', 'Section 8(2)'],
            ['Mini training', 'Short, regular training so staff know how to handle personal data and spot requests and breaches.', 'Supports Section 8(4) and (5) (practice, not a named duty)'],
          ]} />
          <p className={`${P} mt-2`}>Templates for several of these are in the practitioner playbook below. Having the document is not enough: keep evidence that it is used, such as consent logs, completed grievance tickets and training records.</p>
        </Part>

        <Part id="dpdp-board-process" title="Data Protection Board of India: from complaint to appeal">
          <ol className={`list-decimal pl-5 space-y-1 ${P}`}>
            <li><strong>Grievance first:</strong> a Data Principal must use the Data Fiduciary's own grievance process before complaining to the Board (Section 13(3)).</li>
            <li><strong>Complaint or reference:</strong> the Board acts on a complaint, a reference from the government or a court direction, or a breach intimation (Section 27).</li>
            <li><strong>Inquiry:</strong> the Board decides whether there are grounds, then inquires. It works as a digital office, with complaints and hearings online (Section 28; Rules on the Board).</li>
            <li><strong>Alternatives:</strong> the Board can suggest mediation (Section 31), and a Data Fiduciary can offer a voluntary undertaking, which, once accepted, bars proceedings on that matter unless it is breached (Section 32).</li>
            <li><strong>Penalty:</strong> if a significant breach is found, the Board may impose a monetary penalty up to the Schedule limits, considering factors such as nature, gravity, duration, gain or loss and mitigation (Section 33).</li>
            <li><strong>Appeal:</strong> to the Appellate Tribunal (TDSAT) within 60 days of the Board's order (Section 29).</li>
          </ol>
          <h3 className={H}>Maximum penalties (Schedule)</h3>
          <Table head={['Breach', 'Up to']} rows={[
            ['Failure to take reasonable security safeguards to prevent a personal data breach', 'Rs 250 crore'],
            ['Failure to intimate the Board or affected Data Principals of a breach', 'Rs 200 crore'],
            ['Breach of additional obligations for children', 'Rs 200 crore'],
            ['Breach of additional obligations of a Significant Data Fiduciary', 'Rs 150 crore'],
            ['Breach of duties of a Data Principal (Section 15)', 'Rs 10,000'],
            ['Breach of a voluntary undertaking accepted by the Board', 'Up to the penalty for the original breach'],
            ['Any other breach of the Act or Rules', 'Rs 50 crore'],
          ]} />
        </Part>

        <Part id="dpdp-consent-managers" title="Consent Manager framework">
          <p className={P}>A Consent Manager is a person registered with the Board who acts as a single point of contact so a Data Principal can give, manage, review and withdraw consent through an accessible, transparent and interoperable platform (Sections 2(g), 6(7) to 6(9)). Registration and obligations are under Rule 4 and the First Schedule, in force from 13 November 2026.</p>
          <Table head={['Topic', 'What it means in practice']} rows={[
            ['Who can register', 'A company in India meeting the First Schedule conditions on capacity, financial standing, technical and organisational measures and independence.'],
            ['Accountability', 'The Consent Manager is accountable to the Data Principal and acts on their behalf.'],
            ['Independence', 'Must avoid conflicts of interest with Data Fiduciaries, including in its ownership and management.'],
            ['Records', 'Must keep records of consents given, denied or withdrawn and related notices, and share them with the Data Principal.'],
            ['No onward use', 'Must not read or use the personal data it carries for its own purposes.'],
            ['For Data Fiduciaries', 'Accept consent given through a registered Consent Manager and honour withdrawals made there.'],
          ]} />
          <p className={`${P} mt-2`}>Check the First Schedule for the exact registration conditions and retention periods before relying on them.</p>
        </Part>

        <Part id="dpdp-it-act-certin" title="DPDP Act, IT Act and CERT-In: how they fit together">
          <Table head={['Topic', 'DPDP Act and Rules', 'IT Act and CERT-In']} rows={[
            ['Personal data protection', 'Main law for digital personal data.', 'Section 43A (compensation for failing to protect sensitive personal data) and the SPDI Rules are omitted by Section 44(2) of the DPDP Act once that provision commences.'],
            ['Incident reporting', 'Every personal data breach: intimate affected Data Principals and the Board without delay; detailed Board report within 72 hours (Rule 7).', 'CERT-In directions of 28 April 2022 (Section 70B): report specified cyber incidents to CERT-In within 6 hours of noticing them.'],
            ['Logs', 'One-year retention of specified logs and data (Rules 6(1)(e) and 8(3)).', 'CERT-In: maintain ICT system logs for 180 days within India.'],
            ['Who receives the report', 'Data Protection Board and affected individuals.', 'CERT-In (and sector regulators where their rules apply).'],
          ]} />
          <p className={`${P} mt-2`}><strong>In practice:</strong> one incident can trigger both. Build one runbook with two clocks: CERT-In within 6 hours of noticing a reportable incident, and DPDP intimations without delay plus the Board report within 72 hours. Keep logs for the longer applicable period. Sector rules (for example RBI or SEBI) may add their own timelines.</p>
        </Part>


        <Part id="dpdp-dpo-ai-risk" title="DPO guide: managing AI risk under the DPDP Act">
          <p className={P}><strong>Why a DPO should care about AI governance.</strong> Data protection is becoming one integrated function. Senior privacy roles, including the DPO, are increasingly expected to lead privacy, AI governance and information security together, because AI systems collect, infer and act on personal data at scale. Even a role focused only on privacy now sits where those three meet. (This is a practitioner view of the trend, not a legal requirement.)</p>
          <h3 className={H}>Where AI touches DPDP duties</h3>
          <Table head={['DPDP duty', 'AI-specific question for the DPO']} rows={[
            ['Lawful basis (Sections 4, 6, 7)', 'Is personal data used to train, fine-tune or prompt a model covered by consent or a listed legitimate use for that exact purpose?'],
            ['Notice (Section 5, Rule 3)', 'Does the notice tell people their data is used by an AI feature, and for what purpose?'],
            ['Purpose and data minimisation (Section 6(1))', 'Is the model given only the fields it needs, or whole records?'],
            ['Accuracy (Section 8(3))', 'Where AI output is used to make a decision about a person or is shared with another Fiduciary, how is accuracy checked?'],
            ['Security safeguards (Section 8(5), Rule 6)', 'Are prompts, retrieved documents and outputs protected, logged and access-controlled? Is prompt injection and data leakage tested?'],
            ['Processors (Section 8(2))', 'Do contracts with AI vendors cover use of your data for their own training, retention, sub-processors and breach notice?'],
            ['Erasure and withdrawal (Sections 6(4), 8(7), 12)', 'If someone withdraws consent, can their data be removed from training sets, embeddings, caches and logs?'],
            ['Children (Section 9)', 'Does any AI feature track, profile or target advertising at under-18s?'],
            ['Breach (Section 8(6), Rule 7)', 'Is leakage of personal data through an AI output treated as a personal data breach in the incident runbook?'],
            ['SDF duties (Section 10, Rule 13)', 'If notified as an SDF, include AI systems in the yearly DPIA and audit, and check any algorithmic software for risks to Data Principals\' rights.'],
          ]} />
          <h3 className={H}>Practical steps</h3>
          <ol className={`list-decimal pl-5 space-y-1 ${P}`}>
            <li>Keep an inventory of AI systems and the personal data each one uses, with the purpose and basis.</li>
            <li>Run a privacy and AI risk review before launch (a DPIA is good practice even if you are not an SDF).</li>
            <li>Agree ownership: privacy, security and AI governance share one risk register and one review forum.</li>
            <li>Add AI clauses to vendor contracts and review vendors before personal data is sent.</li>
            <li>Monitor outputs and handle complaints about AI decisions through the grievance process.</li>
          </ol>
          <p className={`${P} mt-2`}>For AI-specific frameworks, see ISO/IEC 42001 and the AI Governance page.</p>
        </Part>
        <Part id="dpdp-vs-uk-gdpr" title="DPDP Act compared with UK GDPR">
          <Table head={['Topic', 'UK GDPR', 'DPDP Act']} rows={[
            ['Regulator', 'Information Commissioner\'s Office (ICO).', 'Data Protection Board of India.'],
            ['Scope', 'Personal data in any form.', 'Digital personal data, including offline data later digitised.'],
            ['Lawful grounds', 'Six lawful bases, including legitimate interests.', 'Consent or specific legitimate uses (Section 7); no general legitimate interests ground.'],
            ['Breach notice', 'To the ICO within 72 hours unless unlikely to result in risk; to individuals if high risk.', 'Every breach to affected Data Principals and the Board without delay; detailed Board report within 72 hours.'],
            ['Children', 'Under 13 for consent to online services (UK).', 'Under 18; verifiable parental consent.'],
            ['DPO', 'Required for public authorities and certain large-scale processing.', 'Required only for notified Significant Data Fiduciaries.'],
            ['Transfers', 'Adequacy regulations, IDTA or UK Addendum, or other safeguards.', 'Allowed except to countries restricted by notification (Section 16).'],
            ['Portability', 'Right to data portability.', 'No general portability right.'],
          ]} />
          <p className={`${P} mt-2`}>UK GDPR has been amended by the Data (Use and Access) Act 2025; check commencement of specific changes. The full GDPR comparison is in Related guidance below.</p>
        </Part>
      </div>
    </section>
  );
}
