import { useState } from 'react';
import { Users, UserRound, Building2, Server, Layers, KeyRound, ShieldCheck, Package, Briefcase, Info } from 'lucide-react';

/*
 * GDPR roles explained with one running example (a food delivery app), and how roles
 * differ for product-based and service-based companies. GDPR terms only.
 */

const ROLES = [
  {
    id: 'subject', Icon: UserRound, name: 'Data subject', gdpr: 'Art. 4(1)',
    def: 'The living person the data is about. They have rights over their data: access, correction, deletion, objection, portability.',
    example: 'Priya orders dinner on the app. Her name, phone number, address and order history are about her, so she is the data subject.',
    note: 'GDPR protects people in the EU regardless of nationality. Data about companies, or about people who have died, is not personal data under GDPR.',
  },
  {
    id: 'controller', Icon: Building2, name: 'Data controller', gdpr: 'Art. 4(7), Art. 24',
    def: 'The organisation that decides why personal data is processed and the essential means of how. It carries primary legal responsibility.',
    example: 'The food delivery company decides to collect Priya\'s address to deliver food and her order history to recommend restaurants. It is the controller.',
    note: 'The controller must be able to demonstrate compliance (accountability, Art. 5(2)): lawful basis, ROPA, DPIAs, contracts with processors and responses to rights requests.',
  },
  {
    id: 'joint', Icon: Users, name: 'Joint controllers', gdpr: 'Art. 26',
    def: 'Two or more organisations that decide the purposes and means together. They need an arrangement setting out who does what.',
    example: 'The delivery app and a bank run a co-branded credit card offer and jointly decide which customers to target. Both are joint controllers for that campaign.',
    note: 'Joint control is often missed in partnerships, co-marketing and data-sharing deals.',
  },
  {
    id: 'processor', Icon: Server, name: 'Data processor', gdpr: 'Art. 4(8), Art. 28',
    def: 'An organisation that processes personal data on behalf of a controller and only on its documented instructions.',
    example: 'The app sends order confirmation SMS through an SMS provider. The SMS provider uses Priya\'s phone number only to send messages the app tells it to. It is a processor.',
    note: 'A processor that starts using the data for its own purposes (for example its own marketing) becomes a controller for that use and takes on the liability.',
  },
  {
    id: 'subprocessor', Icon: Layers, name: 'Sub-processor', gdpr: 'Art. 28(2) and (4)',
    def: 'A processor engaged by another processor. It needs the controller\'s prior authorisation, and the same data protection terms flow down.',
    example: 'The SMS provider runs on a cloud hosting provider. That cloud provider is a sub-processor of the delivery app.',
    note: 'Controllers usually authorise a published sub-processor list with notice of changes and a right to object.',
  },
  {
    id: 'owner', Icon: KeyRound, name: 'Data owner (internal role)', gdpr: 'Not a legal term',
    def: 'A person inside the organisation who is accountable for a dataset or system: who can access it, how it is classified, how long it is kept.',
    example: 'At the delivery app, the Head of Customer Operations is the data owner for the customer database; the engineering team that runs the database are the data custodians.',
    note: 'Often confused with the data subject. Priya has rights over her data, but inside the company the "data owner" is the accountable manager. ISO 27001 uses asset owners in the same way.',
  },
  {
    id: 'dpo', Icon: ShieldCheck, name: 'Data Protection Officer (DPO)', gdpr: 'Art. 37 to 39',
    def: 'An independent adviser who monitors compliance and is the contact point for regulators and individuals. Mandatory for public bodies and where core activities involve large-scale monitoring or large-scale special category data.',
    example: 'Because the app tracks rider and customer locations at large scale, it appoints a DPO who reviews its DPIAs and handles regulator queries.',
    note: 'Non-EU companies serving EU residents may also need an EU representative (Art. 27). The DPO must not have conflicting duties, so the CTO or head of marketing is usually a poor choice.',
  },
];

const COMPANY_TYPES = [
  {
    id: 'product', Icon: Package, name: 'Product-based company', sub: 'For example a B2B SaaS platform or a consumer app',
    roles: [
      { as: 'Controller', for: 'Its own employees, job applicants, website visitors, marketing leads, billing contacts, and product analytics where it decides the purpose.' },
      { as: 'Processor', for: 'B2B: the personal data its customers put into the product (their employees, their end customers), processed only to provide the service.' },
      { as: 'Controller (B2C)', for: 'Consumer apps are controllers for their users\' data because they decide what to collect and why.' },
    ],
    example: 'An HR software company is a processor for the employee records its customers upload, and a controller for the people who sign up for its newsletter.',
    docs: ['Controller ROPA for its own processing, and a processor ROPA for customer data', 'A standard DPA (Art. 28) offered to every customer', 'Public sub-processor list with change notifications', 'Privacy notice for its own users and visitors', 'Features that help customers meet their duties: export, deletion, access logs, data residency options', 'Breach process that tells customers without undue delay so they can meet their 72-hour deadline'],
    watch: 'Using customer data to train AI models or build benchmarks is a new purpose. Either get it in the contract and customer agreement, or the company becomes a controller for that use.',
  },
  {
    id: 'service', Icon: Briefcase, name: 'Service-based company', sub: 'For example IT services, BPO, payroll, consulting or a managed SOC',
    roles: [
      { as: 'Processor', for: 'Client data handled while delivering the service: support tickets, payroll records, systems it administers.' },
      { as: 'Controller', for: 'Its own employees and contractors, recruitment, and business contacts at clients.' },
      { as: 'Sometimes controller', for: 'Where it decides purposes itself, for example a recruitment agency choosing candidates to put forward, or an auditor forming its own opinion.' },
    ],
    example: 'A payroll provider processes salary and bank details for a client\'s staff on the client\'s instructions, so it is a processor; for its own staff\'s payroll it is the controller.',
    docs: ['Processor ROPA listing each client, categories of processing and transfers', 'DPA signed with each client, often on the client\'s template', 'Staff confidentiality agreements and access limited to the client engagement', 'Approved sub-contractors and offshore delivery centres disclosed as sub-processors', 'Transfer safeguards (SCCs) when delivery teams access EU data from outside the EEA', 'Process to return or delete client data at contract end'],
    watch: 'Offshore support teams viewing EU client data count as an international transfer, even if the data never leaves the client\'s systems.',
  },
];

export default function GdprRoles() {
  const [active, setActive] = useState('controller');
  const role = ROLES.find(r => r.id === active);
  const li = x => <li key={x} className="flex gap-2"><span>-</span><span>{x}</span></li>;

  return (
    <div className="bg-white rounded-2xl border border-blue-200 dark:border-blue-800 p-6 mb-8" id="gdpr-roles">
      <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-2 flex items-center gap-2">
        <span className="w-8 h-8 rounded-lg bg-blue-100 text-blue-700 dark:bg-blue-900/40 dark:text-blue-300 flex items-center justify-center"><Users className="w-4 h-4" /></span>
        Who's Who: Data Subject, Controller, Processor and More
      </h2>
      <p className="text-sm text-gray-600 dark:text-slate-300 max-w-3xl mb-4">
        Your obligations depend on your role for each processing activity, not on who you are as a company. One running example ties them together: a food delivery app and its customer, Priya.
      </p>

      <div className="flex flex-wrap gap-2 mb-4" role="tablist" aria-label="Data protection roles">
        {ROLES.map(r => (
          <button key={r.id} type="button" role="tab" aria-selected={active === r.id} onClick={() => setActive(r.id)}
            className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold border transition ${active === r.id ? 'bg-blue-600 text-white border-blue-600' : 'bg-white text-gray-700 border-gray-200 hover:border-blue-300 dark:bg-slate-800 dark:text-slate-200 dark:border-slate-600'}`}>
            <r.Icon className="w-3.5 h-3.5" /> {r.name}
          </button>
        ))}
      </div>

      <div className="rounded-xl border border-gray-200 dark:border-slate-700 p-4 mb-6" role="tabpanel">
        <div className="flex flex-wrap items-center gap-2 mb-2">
          <p className="font-bold text-gray-900 dark:text-white">{role.name}</p>
          <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-blue-50 text-blue-800 border border-blue-200 dark:bg-blue-900/30 dark:text-blue-300 dark:border-blue-800">GDPR: {role.gdpr}</span>
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
          <div className="rounded-lg p-3 bg-blue-50 border border-blue-200 dark:bg-blue-900/30 dark:border-blue-800">
            <p className="text-[11px] font-bold uppercase tracking-wide text-blue-800 dark:text-blue-300 mb-1">Worth knowing</p>
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
              ['Data subject', 'No, holds rights', 'Priya, the customer'],
              ['Controller', 'Yes', 'The food delivery company'],
              ['Joint controllers', 'Yes, together', 'Delivery company and bank on a co-branded offer'],
              ['Processor', 'No, follows instructions', 'SMS provider, payment gateway for processing payments'],
              ['Sub-processor', 'No', 'Cloud host used by the SMS provider'],
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
            <p className="font-bold text-gray-900 dark:text-white flex items-center gap-2"><c.Icon className="w-4 h-4 text-blue-600 dark:text-blue-300" /> {c.name}</p>
            <p className="text-xs text-gray-500 dark:text-slate-400 mb-3">{c.sub}</p>
            <div className="space-y-2 mb-3">
              {c.roles.map(r => (
                <div key={r.as} className="text-sm">
                  <span className="inline-block text-[10px] font-bold uppercase tracking-wide px-2 py-0.5 rounded-full bg-blue-50 text-blue-800 border border-blue-200 dark:bg-blue-900/30 dark:text-blue-300 dark:border-blue-800 mr-1.5">{r.as}</span>
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
      <p className="text-xs text-gray-500 dark:text-slate-400 mt-4">Roles are decided per processing activity. The same company is usually a controller for some data and a processor for other data. Not legal advice.</p>
    </div>
  );
}
