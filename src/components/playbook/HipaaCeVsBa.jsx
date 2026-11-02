// Covered entity vs business associate: definitions from 45 CFR 160.103, duties
// from Parts 164 Subparts C, D and E. Examples are generic and illustrative.
const ROWS = [
  ['Who it is', 'A health plan, a health care clearinghouse, or a health care provider that sends health information electronically in a standard transaction (for example claims or eligibility checks).', 'A person or company that creates, receives, maintains or transmits PHI on behalf of a covered entity (or another business associate), or provides certain services to it that involve PHI.'],
  ['Relationship with patients', 'Direct: treats, insures or bills the individual.', 'Usually indirect: works for the covered entity behind the scenes.'],
  ['Notice of Privacy Practices', 'Must issue one (§164.520).', 'Does not issue its own; follows the covered entity\'s.'],
  ['Patient rights requests (access, amendment, accounting)', 'Must respond (§164.524 to §164.528).', 'Helps the covered entity respond, as the BAA requires.'],
  ['Breach notification', 'Notifies affected individuals, HHS and, for large breaches, the media (§164.404 to §164.408).', 'Notifies the covered entity without unreasonable delay and within 60 days of discovery (§164.410); the covered entity notifies individuals unless it delegates this.'],
  ['Security Rule', 'Applies in full.', 'Applies in full (§164.302).'],
  ['Contract', 'Must have a BAA with each business associate before sharing PHI (§164.502(e), §164.504(e)).', 'Must sign the BAA, and must have its own BAA with any subcontractor that handles the PHI.'],
  ['Direct liability', 'Liable for its own compliance.', 'Directly liable to HHS for its own Security Rule compliance and certain Privacy Rule duties, not only under contract.'],
];

const EXAMPLES = [
  ['A family clinic that bills insurers electronically', 'Covered entity', 'It is a provider sending standard electronic transactions.'],
  ['The cloud company hosting that clinic\'s electronic health record', 'Business associate', 'It maintains PHI on the clinic\'s behalf, even if the data is encrypted and it holds no key.'],
  ['A medical billing company or claims processor working for the clinic', 'Business associate', 'It handles PHI to perform billing for the clinic.'],
  ['An IT support firm with remote access to the clinic\'s systems', 'Business associate', 'Its job gives it routine access to PHI.'],
  ['A transcription service turning doctors\' dictation into notes', 'Business associate', 'It creates PHI for the clinic.'],
  ['A shredding company destroying old patient files', 'Business associate', 'It handles PHI for disposal on the clinic\'s behalf.'],
  ['The data center or backup provider used by that cloud EHR company', 'Business associate (subcontractor)', 'It handles PHI for a business associate, so it needs a BAA with the EHR company, not with the clinic.'],
  ['A specialist who receives a referral to treat the patient', 'Covered entity in its own right, not a BA', 'Disclosures between providers for treatment do not need a BAA.'],
  ['A cleaning crew who might glimpse a chart', 'Neither', 'Exposure is incidental; their job does not involve PHI.'],
  ['A postal or internet service that only carries data', 'Neither (conduit)', 'It only transmits and does not access PHI beyond what transport needs.'],
  ['A fitness app a person downloads and uses on their own', 'Usually neither', 'It is not acting for a covered entity; other privacy and consumer laws may apply.'],
  ['An employer', 'Not a covered entity as employer', 'Its group health plan is the covered entity; employment records are not PHI.'],
];

export default function HipaaCeVsBa() {
  return (
    <section id="hipaa-ce-vs-ba" className="max-w-6xl mx-auto px-4 py-10 scroll-mt-24">
      <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">Covered entity vs business associate</h2>
      <p className="text-sm text-gray-600 dark:text-slate-300 mb-4 max-w-3xl">
        Think of a restaurant. The restaurant serves the diner directly: that is the covered entity. The card payment provider, the booking platform and the IT firm that runs the till all handle the diner's details for the restaurant: those are business associates. Definitions come from 45 CFR §160.103; check your own facts with counsel, because the role depends on what you actually do with PHI, not on your industry.
      </p>
      <div className="overflow-x-auto rounded-xl border border-gray-200 dark:border-slate-700 mb-6" tabIndex={0} role="region" aria-label="Comparison of covered entity and business associate">
        <table className="w-full text-sm min-w-[720px]">
          <thead className="bg-gray-50 dark:bg-slate-800"><tr>{['', 'Covered entity (CE)', 'Business associate (BA)'].map(h => <th key={h || 'topic'} scope="col" className="text-left p-2 font-semibold text-gray-900 dark:text-white">{h}</th>)}</tr></thead>
          <tbody>{ROWS.map(r => <tr key={r[0]} className="border-t border-gray-200 dark:border-slate-700 align-top"><th scope="row" className="p-2 text-left font-semibold text-gray-900 dark:text-white">{r[0]}</th><td className="p-2 text-gray-700 dark:text-slate-300">{r[1]}</td><td className="p-2 text-gray-700 dark:text-slate-300">{r[2]}</td></tr>)}</tbody>
        </table>
      </div>
      <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">Practical examples</h3>
      <div className="overflow-x-auto rounded-xl border border-gray-200 dark:border-slate-700" tabIndex={0} role="region" aria-label="Examples of covered entities and business associates">
        <table className="w-full text-sm min-w-[720px]">
          <thead className="bg-gray-50 dark:bg-slate-800"><tr>{['Situation', 'Role', 'Why'].map(h => <th key={h} scope="col" className="text-left p-2 font-semibold text-gray-900 dark:text-white">{h}</th>)}</tr></thead>
          <tbody>{EXAMPLES.map(r => <tr key={r[0]} className="border-t border-gray-200 dark:border-slate-700 align-top"><td className="p-2 text-gray-900 dark:text-white">{r[0]}</td><td className="p-2 font-semibold text-teal-700 dark:text-teal-300">{r[1]}</td><td className="p-2 text-gray-700 dark:text-slate-300">{r[2]}</td></tr>)}</tbody>
        </table>
      </div>
      <p className="mt-3 text-xs text-gray-500 dark:text-slate-400">A company can be both: for example a health system that runs its own clinics (covered entity) and also provides billing services to other practices (business associate). Use the scope selector at the top of this page to set your role.</p>
    </section>
  );
}
