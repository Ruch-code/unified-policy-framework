import { useState } from 'react';
import { Users, UserRound, Building2, Server, Star, Handshake, Landmark, KeyRound, Package, Briefcase, Info } from 'lucide-react';

/*
 * India DPDP Act 2023 roles explained with one running example (a food delivery app),
 * and how roles differ for product-based and service-based companies. DPDP terms only.
 */

const ROLES = [
  {
    id: 'principal', Icon: UserRound, name: 'Data Principal', ref: 'Section 2(j)',
    def: 'The individual the personal data relates to. For a child (under 18), it includes the parent or lawful guardian; for a person with a disability, their lawful guardian.',
    example: 'Priya orders dinner on the app. Her name, phone number, address and order history relate to her, so she is the Data Principal.',
    note: 'Data Principals have rights to information, correction and erasure, grievance redressal and nominating someone to act for them. They also have duties, such as not filing false complaints.',
  },
  {
    id: 'fiduciary', Icon: Building2, name: 'Data Fiduciary', ref: 'Section 2(i), Section 8',
    def: 'The person or organisation that, alone or with others, decides the purpose and means of processing personal data. It carries the main obligations and liability.',
    example: 'The food delivery company decides to collect Priya\'s address to deliver food and her order history to suggest restaurants. It is the Data Fiduciary.',
    note: 'The Fiduciary stays responsible for processing carried out by its Data Processors, and must publish a contact person for Data Principals\' questions.',
  },
  {
    id: 'sdf', Icon: Star, name: 'Significant Data Fiduciary (SDF)', ref: 'Section 10',
    def: 'A Data Fiduciary notified by the government based on factors such as the volume and sensitivity of data, risk to Data Principals, and impact on sovereignty, elections or public order.',
    example: 'If the delivery app grows to tens of millions of users and is notified as an SDF, it must appoint a DPO based in India, an independent data auditor, and carry out periodic DPIAs and audits.',
    note: 'SDF status comes from notification, not self-assessment. Large consumer platforms, fintechs and health apps should plan for it.',
  },
  {
    id: 'processor', Icon: Server, name: 'Data Processor', ref: 'Section 2(k), Section 8(2)',
    def: 'Any person who processes personal data on behalf of a Data Fiduciary. A Fiduciary may engage a processor only under a valid contract.',
    example: 'The app sends order SMS through an SMS provider, which uses Priya\'s number only to send the app\'s messages. The SMS provider is a Data Processor.',
    note: 'The Act puts most duties on the Fiduciary, so the contract is how security, deletion and breach reporting duties reach the processor. Write them in clearly.',
  },
  {
    id: 'consent', Icon: Handshake, name: 'Consent Manager', ref: 'Section 2(g), Section 6(7) to (9)',
    def: 'A person registered with the Data Protection Board that gives Data Principals a single platform to give, manage, review and withdraw consent.',
    example: 'Priya uses a Consent Manager app to see every company she has allowed to use her data and withdraws the delivery app\'s marketing consent in one tap.',
    note: 'Consent Managers must be registered and act on behalf of the Data Principal, not the Fiduciary.',
  },
  {
    id: 'board', Icon: Landmark, name: 'Data Protection Board of India', ref: 'Section 18 to 28',
    def: 'The body that receives breach intimations, inquires into complaints and breaches, and imposes penalties.',
    example: 'If the delivery app suffers a breach, it must inform the Board and affected users; Priya can also complain to the Board after first using the app\'s grievance process.',
    note: 'Penalties can reach up to Rs 250 crore for failing to take reasonable security safeguards. Breach notification duties under the DPDP Rules apply from around May 2027.',
  },
  {
    id: 'owner', Icon: KeyRound, name: 'Data owner (internal role)', ref: 'Not a legal term',
    def: 'A manager inside the organisation who is accountable for a dataset or system: access, classification and retention.',
    example: 'At the delivery app, the Head of Customer Operations owns the customer database; the engineering team that runs it are the custodians.',
    note: 'Not to be confused with the Data Principal. The DPDP Act does not define a "data owner"; the term comes from security governance such as ISO 27001 asset owners.',
  },
];

const COMPANY_TYPES = [
  {
    id: 'product', Icon: Package, name: 'Product-based company', sub: 'For example an Indian SaaS platform or a consumer app',
    roles: [
      { as: 'Data Fiduciary', for: 'Its own employees, applicants, website visitors, marketing leads and app users where it decides the purpose.' },
      { as: 'Data Processor', for: 'B2B: personal data its business customers load into the product, processed only to provide the service.' },
      { as: 'Possible SDF', for: 'Large consumer apps handling sensitive data at scale may be notified as Significant Data Fiduciaries.' },
    ],
    example: 'An Indian HR software company is a Data Processor for the employee records its customers upload, and a Data Fiduciary for people who sign up on its website.',
    docs: ['Notice in clear language (and in English or Eighth Schedule languages on request) explaining data, purpose and rights', 'Consent flow that is free, specific, informed and as easy to withdraw as to give', 'Processor contracts with every vendor handling personal data', 'Verifiable parental consent for users under 18', 'Grievance redressal contact published', 'Reasonable security safeguards and a breach response plan'],
    watch: 'Using customer data to train AI models is a new purpose. If you are a processor, you need the Fiduciary\'s authority in the contract; if you are the Fiduciary, you need a valid basis such as fresh consent.',
  },
  {
    id: 'service', Icon: Briefcase, name: 'Service-based company', sub: 'For example IT services, BPO, KPO or payroll processing',
    roles: [
      { as: 'Data Processor', for: 'Client data handled while delivering services for Indian clients: tickets, payroll, systems administered.' },
      { as: 'Data Fiduciary', for: 'Its own employees, contractors and recruitment.' },
      { as: 'Limited scope', for: 'Processing data of people outside India under a contract with a foreign client: most DPDP duties do not apply (Section 17(1)(d)), but security safeguards still do.' },
    ],
    example: 'An Indian BPO handling customer calls for a US bank processes data of US residents under a contract with that bank, so most DPDP obligations do not apply; the bank\'s own laws and contract govern instead. For an Indian client, the BPO is a Data Processor bound by its contract.',
    docs: ['Contract with each client setting processing instructions, security and breach reporting', 'Staff confidentiality agreements and access limited per client', 'Security safeguards, which apply even under the Section 17(1)(d) exemption', 'Return or deletion of data at contract end', 'Clear map of which client engagements involve Indian Data Principals'],
    watch: 'Do not assume the offshore exemption covers everything: data of Indian residents, or data processed for an Indian client, brings full DPDP obligations through the client.',
  },
];

export default function DpdpRoles() {
  const [active, setActive] = useState('fiduciary');
  const role = ROLES.find(r => r.id === active);
  const li = x => <li key={x} className="flex gap-2"><span>-</span><span>{x}</span></li>;

  return (
    <div className="bg-white rounded-2xl border border-orange-200 dark:border-orange-800 p-6 mb-8" id="dpdp-roles">
      <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-2 flex items-center gap-2">
        <span className="w-8 h-8 rounded-lg bg-orange-100 text-orange-700 dark:bg-orange-900/40 dark:text-orange-300 flex items-center justify-center"><Users className="w-4 h-4" /></span>
        Who's Who under the DPDP Act: Data Principal, Fiduciary, Processor and More
      </h2>
      <p className="text-sm text-gray-600 dark:text-slate-300 max-w-3xl mb-4">
        The Digital Personal Data Protection Act, 2023 uses its own terms. Your duties depend on your role for each processing activity. One running example ties them together: a food delivery app and its customer, Priya.
      </p>

      <div className="flex flex-wrap gap-2 mb-4" role="tablist" aria-label="DPDP roles">
        {ROLES.map(r => (
          <button key={r.id} type="button" role="tab" aria-selected={active === r.id} onClick={() => setActive(r.id)}
            className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold border transition ${active === r.id ? 'bg-orange-600 text-white border-orange-600' : 'bg-white text-gray-700 border-gray-200 hover:border-orange-300 dark:bg-slate-800 dark:text-slate-200 dark:border-slate-600'}`}>
            <r.Icon className="w-3.5 h-3.5" /> {r.name}
          </button>
        ))}
      </div>

      <div className="rounded-xl border border-gray-200 dark:border-slate-700 p-4 mb-6" role="tabpanel">
        <div className="flex flex-wrap items-center gap-2 mb-2">
          <p className="font-bold text-gray-900 dark:text-white">{role.name}</p>
          <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-orange-50 text-orange-800 border border-orange-200 dark:bg-orange-900/30 dark:text-orange-300 dark:border-orange-800">DPDP Act: {role.ref}</span>
        </div>
        <div className="grid md:grid-cols-3 gap-3 text-sm">
          <div className="rounded-lg p-3 bg-slate-50 border border-slate-200 dark:bg-slate-800/60 dark:border-slate-700">
            <p className="text-[11px] font-bold uppercase tracking-wide text-slate-600 dark:text-slate-300 mb-1">What it means</p>
            <p className="text-gray-700 dark:text-slate-200">{role.def}</p>
          </div>
          <div className="rounded-lg p-3 bg-amber-50 border border-amber-200 dark:bg-amber-900/30 dark:border-amber-800">
            <p className="text-[11px] font-bold uppercase tracking-wide text-amber-800 dark:text-amber-300 mb-1">Example</p>
            <p className="text-gray-700 dark:text-slate-200">{role.example}</p>
          </div>
          <div className="rounded-lg p-3 bg-orange-50 border border-orange-200 dark:bg-orange-900/30 dark:border-orange-800">
            <p className="text-[11px] font-bold uppercase tracking-wide text-orange-800 dark:text-orange-300 mb-1">Worth knowing</p>
            <p className="text-gray-700 dark:text-slate-200">{role.note}</p>
          </div>
        </div>
      </div>

      <div className="overflow-x-auto mb-6">
        <table className="w-full min-w-[520px] text-sm">
          <caption className="text-left text-xs font-bold uppercase tracking-wide text-gray-500 dark:text-slate-400 pb-2">At a glance</caption>
          <thead><tr className="text-left text-[11px] uppercase tracking-wide text-gray-500 dark:text-slate-400 border-b border-gray-200 dark:border-slate-700">
            <th className="p-2">Role</th><th className="p-2">Decides why?</th><th className="p-2">In the food delivery app</th>
          </tr></thead>
          <tbody>
            {[
              ['Data Principal', 'No, holds rights', 'Priya, the customer'],
              ['Data Fiduciary', 'Yes', 'The food delivery company'],
              ['Significant Data Fiduciary', 'Yes, with extra duties', 'The same company, if notified by government'],
              ['Data Processor', 'No, follows the contract', 'SMS provider, cloud host'],
              ['Consent Manager', 'No, acts for the Principal', 'Consent app Priya uses'],
              ['Data owner', 'Accountable internally', 'Head of Customer Operations'],
            ].map(r => (
              <tr key={r[0]} className="border-b border-gray-100 dark:border-slate-800">
                {r.map((c, i) => <td key={i} className={`p-2 ${i === 0 ? 'font-semibold text-gray-900 dark:text-white' : 'text-gray-700 dark:text-slate-200'}`}>{c}</td>)}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <h3 className="font-bold text-gray-900 dark:text-white mb-3">Product-based vs service-based companies</h3>
      <div className="grid lg:grid-cols-2 gap-4">
        {COMPANY_TYPES.map(c => (
          <div key={c.id} className="rounded-xl border border-gray-200 dark:border-slate-700 p-4">
            <p className="font-bold text-gray-900 dark:text-white flex items-center gap-2"><c.Icon className="w-4 h-4 text-orange-600 dark:text-orange-300" /> {c.name}</p>
            <p className="text-xs text-gray-500 dark:text-slate-400 mb-3">{c.sub}</p>
            <div className="space-y-2 mb-3">
              {c.roles.map(r => (
                <div key={r.as} className="text-sm">
                  <span className="inline-block text-[10px] font-bold uppercase tracking-wide px-2 py-0.5 rounded-full bg-orange-50 text-orange-800 border border-orange-200 dark:bg-orange-900/30 dark:text-orange-300 dark:border-orange-800 mr-1.5">{r.as}</span>
                  <span className="text-gray-700 dark:text-slate-200">{r.for}</span>
                </div>
              ))}
            </div>
            <div className="rounded-lg p-3 mb-3 bg-amber-50 border border-amber-200 dark:bg-amber-900/30 dark:border-amber-800 text-sm text-gray-700 dark:text-slate-200">
              <span className="font-semibold text-amber-800 dark:text-amber-300">Example: </span>{c.example}
            </div>
            <p className="text-[11px] font-bold uppercase tracking-wide text-gray-500 dark:text-slate-400 mb-1">What it needs in place</p>
            <ul className="text-sm text-gray-700 dark:text-slate-200 space-y-1 mb-3">{c.docs.map(li)}</ul>
            <div className="rounded-lg p-3 bg-rose-50 border border-rose-200 dark:bg-rose-900/30 dark:border-rose-800 text-sm text-gray-700 dark:text-slate-200 flex gap-2">
              <Info className="w-4 h-4 mt-0.5 shrink-0 text-rose-700 dark:text-rose-300" /><span><span className="font-semibold text-rose-800 dark:text-rose-300">Watch out: </span>{c.watch}</span>
            </div>
          </div>
        ))}
      </div>
      <p className="text-xs text-gray-500 dark:text-slate-400 mt-4">The DPDP Rules 2025 were notified in November 2025 and come into force in phases; check which provisions apply on your date. Not legal advice.</p>
    </div>
  );
}
