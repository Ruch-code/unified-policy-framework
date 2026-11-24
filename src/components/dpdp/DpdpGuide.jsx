import { useState } from 'react';

// Guided, conversational entry to the DPDP Act page. The full practitioner playbook stays below (#dpdp-playbook).
// Editorial: update AS_OF and STATUS when the commencement position changes.
export const AS_OF = '23 November 2026';
const OFFICIAL = 'https://www.meity.gov.in/data-protection-framework';

const STATUS = [
  ['In force since 13 November 2025', 'Rules 1, 2 and 17 to 21 (the Gazette commencement notification is dated 13 November 2025; some government listings show 14 November).'],
  ['From 13 November 2026', 'Rule 4 (Consent Managers) and the related one-year provisions, Section 6(9) and Section 27(1)(d).'],
  ['From 13 May 2027', 'Most substantive duties in Sections 3 to 17 and Rules 3, 5 to 16, 22 and 23.'],
];

const AUDIENCES = [
  ['individual', 'I want to understand my rights as an individual'],
  ['org', 'I run or work at an organisation'],
  ['practitioner', 'I\'m implementing or auditing a privacy programme'],
  ['learner', 'I\'m learning the basics'],
];

const TERMS = [
  ['Data Principal', 'The person the personal data is about. For a child or a person with a disability, it includes the parent or lawful guardian.'],
  ['Data Fiduciary', 'The organisation that decides why and how personal data is processed, alone or with others.'],
  ['Data Processor', 'An organisation that processes personal data on behalf of a Data Fiduciary.'],
  ['Personal data', 'Any data about an individual who can be identified by or in relation to it, such as a name, email address or phone number (Section 2(t)).'],
  ['Processing', 'A wholly or partly automated operation or set of operations on digital personal data, such as collection, storage, use, sharing or erasure (Section 2(x)).'],
  ['Consent', 'Permission that is free, specific, informed, unconditional and unambiguous, given by a clear affirmative action, for a specified purpose and limited to the data needed for it (Section 6(1)).'],
  ['Consent Manager', 'A registered entity that lets people give, manage, review and withdraw consent through one platform.'],
  ['Significant Data Fiduciary (SDF)', 'A Data Fiduciary or class of them that the Central Government notifies as significant. It is not automatic.'],
];

// Each topic: q, answer (2 to 4 sentences), layers, law, applies, from, audiences, followups.
const TOPICS = [
  { id: 'apply', q: 'Does this law apply to us?', aud: ['org', 'practitioner', 'learner'],
    a: 'The Digital Personal Data Protection Act, 2023 (DPDP Act) applies to processing of digital personal data in India, including data collected offline and later digitised. It also applies outside India if the processing is connected to offering goods or services to people in India. Some processing is excluded, such as personal or domestic use, and data the person or a legal duty has made publicly available.',
    example: 'A small SaaS company in Bengaluru keeps customer account emails in its app. That is digital personal data, so the Act is likely to apply. (Illustrative example.)',
    todo: 'List your processing activities and the personal data in each. Mark anything that may be excluded and record why.',
    check: 'A data inventory showing each activity, data type and whether it is in scope. (Practical guidance, not statutory wording.)',
    law: 'Section 3', from: 'Most duties from 13 May 2027', applies: 'Digital personal data', next: ['role', 'notice'] },
  { id: 'role', q: 'Are we a Data Fiduciary or a Data Processor?', aud: ['org', 'practitioner', 'learner'],
    a: 'It depends on the activity, not the company. If you decide why and how the data is used, you are the Data Fiduciary for that activity. If a customer decides and you only process its records on its instructions, you are its Data Processor for that activity. The same company can be both, and the Data Fiduciary stays responsible for processing done on its behalf.',
    example: 'Your SaaS uses account emails to send your own product updates: you decide the purpose, so you are the Data Fiduciary. You host your customer\'s employee records under its instructions: you are its Data Processor. (Illustrative.)',
    todo: 'Record the role per activity in your inventory. Put processing instructions and security terms in contracts with processors.',
    check: 'Role recorded for each activity; signed contracts with every Data Processor.',
    law: 'Sections 2(i), 2(k), 8(1), 8(2)', from: '13 May 2027', applies: 'Every processing activity', next: ['basis', 'apply'] },
  { id: 'basis', q: 'Why may we use the data?', aud: ['org', 'practitioner', 'learner'],
    a: 'Under Section 4 you may process personal data only with consent, or for certain legitimate uses listed in Section 7. There is no broad GDPR-style "legitimate interests" ground, and Section 7(a) is not a general contract basis. Assess the basis for each actual purpose.',
    example: 'A person voluntarily gives their phone number to get a delivery update and does not object: that may fit Section 7(a). Using it later for marketing needs consent. (Illustrative.)',
    todo: 'For each purpose, record consent or the specific Section 7 use relied on, and why it fits.',
    check: 'A purpose register with the basis and justification per purpose.',
    law: 'Sections 4, 6, 7', from: '13 May 2027', applies: 'All processing', next: ['notice', 'withdraw'] },
  { id: 'notice', q: 'What should our privacy notice say?', aud: ['org', 'practitioner'],
    a: 'When you ask for consent, give a standalone, clear notice. Rule 3 requires an itemised description of the personal data and the specific purposes, and how to withdraw consent, exercise rights and complain to the Data Protection Board. A long general privacy policy does not automatically meet this.',
    example: 'A sign-up screen shows a short notice listing "email: account login and service messages; phone: delivery updates", with links to withdraw and to raise a grievance. (Illustrative.)',
    todo: 'Write purpose-specific notices for each consent request, in English or a listed Indian language where the person chooses.',
    check: 'Notice text per consent point, with each Rule 3 element present.',
    law: 'Section 5; Rule 3', from: '13 May 2027', applies: 'Where processing is based on consent', next: ['withdraw', 'rights'] },
  { id: 'withdraw', q: 'What if someone withdraws consent or asks us to delete data?', aud: ['org', 'practitioner', 'individual'],
    a: 'Withdrawal must be as easy as giving consent. You then stop processing for that purpose within a reasonable time, have your processors stop too, and erase the data unless the law requires you to keep it. Some logs and data must still be kept for a minimum period under the Rules, but only for those purposes.',
    example: 'Priya withdraws marketing consent in the app. Marketing emails stop and her marketing data is erased, while transaction logs kept under Rule 8(3) are restricted to that purpose. (Illustrative.)',
    todo: 'Build a withdrawal and erasure workflow that reaches processors and caches.',
    check: 'A test withdrawal showing processing stopped and data erased or restricted.',
    law: 'Sections 6(4) to 6(6), 8(7), 12; Rules 6(1)(e), 8(3)', from: '13 May 2027', applies: 'Consent-based processing; erasure requests', next: ['retention', 'rights'] },
  { id: 'rights', q: 'I\'m an individual: what can I ask an organisation to do?', aud: ['individual', 'learner'],
    a: 'You can ask for a summary of your personal data and how it is processed, and who it has been shared with. You can ask for correction, completion, updating and erasure, subject to legal retention. You can raise a grievance with the organisation and must use that route before complaining to the Board. You can also nominate someone to act for you on death or incapacity.',
    example: 'You ask a shopping app what data it holds about you and to delete your old address. (Illustrative.) There is no general right to export all your data in a portable format under the Act.',
    todo: 'Use the contact or grievance channel the organisation publishes. Keep a record of your request.',
    check: 'For organisations: a published rights process and grievance response period not exceeding 90 days (Rule 14).',
    law: 'Sections 11 to 14; Rule 14', from: '13 May 2027', applies: 'Data Principals', next: ['withdraw'] },
  { id: 'breach', q: 'What do we do if there is a personal data breach?', aud: ['org', 'practitioner'],
    a: 'Every personal data breach must be intimated to each affected Data Principal and to the Data Protection Board without delay. A detailed report goes to the Board within 72 hours of becoming aware, unless the Board allows longer on a written request. There is no risk threshold like GDPR\'s.',
    example: 'A misconfigured bucket exposes customer addresses. You notify affected customers and the Board without delay, then send the detailed report within 72 hours. (Illustrative.)',
    todo: 'Prepare templates for both intimations and the 72-hour report; make processors notify you fast.',
    check: 'A breach drill with timestamps for awareness, each intimation and the report.',
    law: 'Section 8(6); Rule 7', from: '13 May 2027', applies: 'All Data Fiduciaries', next: ['retention'] },
  { id: 'retention', q: 'How long must we keep or delete data?', aud: ['org', 'practitioner'],
    a: 'Three separate ideas. Rule 6(1)(e) requires keeping specified logs and personal data for one year for security purposes. Rule 8(3) requires keeping personal data, traffic data and processing logs for at least one year for Seventh Schedule purposes. Rule 8\'s inactivity-based erasure and 48-hour advance notice apply only to the classes in the Third Schedule.',
    example: 'A large e-commerce entity listed in the Third Schedule erases inactive accounts after the stated period, warning users 48 hours before. A small SaaS company is not in that class. (Illustrative.)',
    todo: 'Write a retention schedule that separates these layers and any other legal retention.',
    check: 'Retention schedule and evidence of deletion runs.',
    law: 'Section 8(7); Rules 6(1)(e), 8; Third and Seventh Schedules', from: '13 May 2027', applies: 'Depends on the layer', next: ['withdraw'] },
  { id: 'children', q: 'Do we process children\'s data?', aud: ['org', 'practitioner'],
    a: 'Under the Act a child is anyone under 18. You need verifiable consent of a parent or lawful guardian, and you must not track, behaviourally monitor or target advertising at children, subject to exemptions in the Rules and any government notification. The Act does not mandate one specific age-gate design.',
    example: 'An ed-tech app checks that the adult giving consent is an identifiable adult before a student account goes live. (Illustrative.)',
    todo: 'Decide how you identify children and verify parental consent; switch off tracking and targeted ads for them.',
    check: 'Consent records and configuration showing ads and tracking disabled for children.',
    law: 'Sections 2(f), 9; Rules 10 and 12; Fourth Schedule', from: '13 May 2027', applies: 'Children\'s personal data', next: ['basis'] },
  { id: 'sdf', q: 'What changes if we are notified as a Significant Data Fiduciary?', aud: ['org', 'practitioner'],
    a: 'SDF duties apply only if the Central Government notifies you or your class. Under Section 10(1) it weighs the volume and sensitivity of data processed, risk to the rights of Data Principals, possible impact on the sovereignty and integrity of India, risk to electoral democracy, security of the State and public order. If notified, you need a Data Protection Officer based in India who is responsible to the Board, an independent data auditor, and a Data Protection Impact Assessment and audit every 12 months, plus other duties in Rule 13. Being large or handling sensitive data does not make you an SDF automatically. Organisations that are not SDFs still have all the general duties: a lawful basis, accuracy, reasonable security safeguards, breach intimation, erasure and a grievance mechanism.',
    example: 'A company not yet notified may still run DPIAs as good practice, but they are not a DPDP statutory duty for it. (Illustrative.)',
    todo: 'Track notifications; if notified, plan the DPO, auditor and 12-month DPIA and audit cycle.',
    check: 'Notification tracking record; for SDFs, DPIA and audit reports.',
    law: 'Section 10; Rule 13', from: '13 May 2027', applies: 'Notified SDFs only', next: ['transfer'] },
  { id: 'transfer', q: 'Must data stay in India?', aud: ['org', 'practitioner', 'learner'],
    a: 'No general localisation rule. Section 16 allows transfers outside India except to countries the Central Government restricts by notification. Sector rules can still require local storage, and SDFs may have to keep specified data in India.',
    example: 'A SaaS company uses a US-hosted email provider. That is allowed unless the US is restricted by notification or a sector rule applies. (Illustrative.)',
    todo: 'Keep a transfer register and check notifications before new transfers.',
    check: 'Transfer register with the check date.',
    law: 'Section 16; Rules 13(4), 15', from: '13 May 2027', applies: 'Transfers outside India', next: ['sdf'] },
  { id: 'prepare', q: 'What do we need to prepare before May 2027?', aud: ['org', 'practitioner'],
    a: 'Work out your roles and data, your basis for each purpose, notices and consent, rights and grievance handling, security and breach response, retention, processor contracts, and children\'s data if relevant. The practitioner checklist below turns this into tasks with evidence.',
    example: 'A 50-person company could cover the basics in a few months; larger organisations take longer. These are planning estimates, not legal deadlines.',
    todo: 'Open the practitioner checklist and start with roles and the data map.',
    check: 'Self-reported task progress plus the evidence listed in each task. Completing tasks is not legal certification.',
    law: 'Sections 3 to 17; Rules 3 to 16', from: '13 May 2027', applies: 'All Data Fiduciaries', next: ['apply', 'role'] },
];

const CHAPTERS = [
  ['Does the law apply to this data and activity?', ['apply']],
  ['Who decides what happens to the data?', ['role']],
  ['Why may the data be used?', ['basis']],
  ['What should people be told and be able to do?', ['notice', 'withdraw', 'rights']],
  ['How do we protect and manage the data?', ['breach', 'retention', 'children', 'transfer']],
  ['What changes if we are notified as significant?', ['sdf']],
  ['What should we do next?', ['prepare']],
];

const CARD = 'rounded-2xl border border-slate-200 bg-white p-5 dark:border-slate-700 dark:bg-slate-900';
const TXT = 'text-[15px] leading-relaxed text-slate-800 dark:text-slate-200';

function Layer({ label, children, tone }) {
  return (
    <details className={`rounded-lg border px-3 py-2 ${tone === 'amber' ? 'border-amber-300 bg-amber-50 dark:border-amber-700 dark:bg-amber-900/20' : 'border-slate-200 dark:border-slate-700'}`}>
      <summary className="cursor-pointer text-sm font-semibold text-slate-900 dark:text-white">{label}</summary>
      <div className="mt-1 text-sm text-slate-700 dark:text-slate-300">{children}</div>
    </details>
  );
}

function Answer({ t, onAsk }) {
  return (
    <div className="space-y-3">
      <div className="flex justify-end"><p className="max-w-xl rounded-2xl rounded-br-sm bg-teal-700 px-4 py-2 text-[15px] text-white">{t.q}</p></div>
      <div className="max-w-2xl rounded-2xl rounded-bl-sm border border-slate-200 bg-slate-50 px-4 py-3 dark:border-slate-700 dark:bg-slate-800">
        <p className="mb-1 text-xs font-bold uppercase tracking-wide text-teal-800 dark:text-teal-300">OneLens</p>
        <p className={TXT}>{t.a}</p>
        <div className="mt-2 flex flex-wrap gap-2 text-xs">
          <span className="rounded-full border border-slate-300 px-2 py-0.5 text-slate-700 dark:border-slate-600 dark:text-slate-300">Applies to: {t.applies}</span>
          <span className="rounded-full border border-slate-300 px-2 py-0.5 text-slate-700 dark:border-slate-600 dark:text-slate-300">Effective: {t.from}</span>
        </div>
        <div className="mt-3 space-y-2">
          <Layer label="A quick example">{t.example}</Layer>
          <Layer label="What to do next">{t.todo}</Layer>
          <Layer label="How to check (practical guidance)">{t.check}</Layer>
          <Layer label="Show the law" tone="amber"><p>{t.law}, Digital Personal Data Protection Act, 2023 and DPDP Rules, 2025. <a className="ui-link" href={OFFICIAL} target="_blank" rel="noreferrer">Official sources (MeitY)</a>. Interpretation on this page is general guidance, not legal advice.</p></Layer>
        </div>
      </div>
      {t.next?.length > 0 && (
        <div className="flex flex-wrap gap-2" role="group" aria-label="Follow-up questions">
          {t.next.map((id) => { const n = TOPICS.find((x) => x.id === id); return <button key={id} type="button" onClick={() => onAsk(id)} className="rounded-full border border-teal-600 px-3 py-1 text-sm text-teal-800 hover:bg-teal-50 focus:outline-none focus-visible:ring-2 focus-visible:ring-teal-600 dark:text-teal-300 dark:hover:bg-teal-900/30">{n.q}</button>; })}
        </div>
      )}
    </div>
  );
}

export default function DpdpGuide() {
  const [aud, setAud] = useState('org');
  const [thread, setThread] = useState([]);
  const [started, setStarted] = useState(false);
  const ask = (id) => setThread((th) => (th[th.length - 1] === id ? th : [...th, id]));
  const starters = TOPICS.filter((t) => t.aud.includes(aud));
  const toPlaybook = () => document.getElementById('dpdp-playbook')?.scrollIntoView({ behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth' });

  return (
    <section aria-labelledby="dpdp-guide-title" className="mx-auto max-w-6xl px-4 py-8">
      <div className={CARD}>
        <h1 id="dpdp-guide-title" className="text-3xl font-bold text-slate-900 dark:text-white">DPDP, without the legal fog</h1>
        <p className={`${TXT} mt-2 max-w-3xl`}>A plain-English guide to India's Digital Personal Data Protection Act, 2023 (the DPDP Act) and the DPDP Rules, 2025. Find out whether it applies to you, what role you play, what the law expects and what to do next, with the legal source one click away.</p>
        <div className="mt-4 flex flex-wrap gap-3">
          <button type="button" onClick={() => { setStarted(true); setTimeout(() => document.getElementById('dpdp-chat')?.focus(), 0); }} className="rounded-lg bg-teal-700 px-4 py-2 font-semibold text-white hover:bg-teal-800 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-teal-700">Start a guided walkthrough</button>
          <button type="button" onClick={toPlaybook} className="rounded-lg border border-slate-300 px-4 py-2 font-semibold text-slate-800 hover:bg-slate-50 focus:outline-none focus-visible:ring-2 focus-visible:ring-teal-700 dark:border-slate-600 dark:text-slate-200 dark:hover:bg-slate-800">Browse the full playbook</button>
        </div>
        <div className="mt-5 rounded-xl border border-amber-300 bg-amber-50 p-4 dark:border-amber-700 dark:bg-amber-900/20">
          <p className="text-sm font-semibold text-slate-900 dark:text-white">Phased commencement (as of {AS_OF})</p>
          <ul className="mt-1 space-y-1 text-sm text-slate-800 dark:text-slate-200">{STATUS.map(([k, v]) => <li key={k}><strong>{k}:</strong> {v}</li>)}</ul>
          <p className="mt-1 text-xs text-slate-700 dark:text-slate-300">Neither "the whole Act is in force" nor "nothing applies until 2027" is accurate. <a className="ui-link" href={OFFICIAL} target="_blank" rel="noreferrer">Check the official notification</a>.</p>
        </div>
      </div>

      <div className={`${CARD} mt-4`}>
        <fieldset>
          <legend className="text-base font-semibold text-slate-900 dark:text-white">What brings you here? <span className="font-normal text-slate-600 dark:text-slate-400">(optional, change any time)</span></legend>
          <div className="mt-2 flex flex-wrap gap-2">
            {AUDIENCES.map(([id, label]) => (
              <label key={id} className={`cursor-pointer rounded-full border px-3 py-1.5 text-sm focus-within:ring-2 focus-within:ring-teal-600 ${aud === id ? 'border-teal-700 bg-teal-700 text-white' : 'border-slate-300 text-slate-800 dark:border-slate-600 dark:text-slate-200'}`}>
                <input type="radio" name="dpdp-audience" value={id} checked={aud === id} onChange={() => setAud(id)} className="sr-only" />{label}
              </label>
            ))}
          </div>
        </fieldset>
      </div>

      <div className="mt-4 grid gap-4 lg:grid-cols-[16rem_1fr]">
        <nav aria-label="DPDP chapters" className={`${CARD} h-fit lg:sticky lg:top-20`}>
          <p className="text-sm font-semibold text-slate-900 dark:text-white">Chapters</p>
          <ol className="mt-2 list-decimal space-y-1 pl-5 text-sm">
            {CHAPTERS.map(([title, ids]) => <li key={title}><button type="button" className="text-left text-teal-800 underline-offset-2 hover:underline dark:text-teal-300" onClick={() => { setStarted(true); ask(ids[0]); }}>{title}</button></li>)}
          </ol>
          <button type="button" onClick={toPlaybook} className="mt-3 text-sm font-semibold text-slate-800 underline dark:text-slate-200">Practitioner view: 21-task checklist</button>
        </nav>

        <div id="dpdp-chat" tabIndex={-1} className={`${CARD} focus:outline-none`} aria-live="polite">
          <p className="text-base font-semibold text-slate-900 dark:text-white">What are you trying to figure out?</p>
          <div className="mt-2 flex flex-wrap gap-2">
            {starters.map((t) => <button key={t.id} type="button" onClick={() => { setStarted(true); ask(t.id); }} className="rounded-full border border-slate-300 px-3 py-1.5 text-sm text-slate-800 hover:border-teal-600 focus:outline-none focus-visible:ring-2 focus-visible:ring-teal-600 dark:border-slate-600 dark:text-slate-200">{t.q}</button>)}
          </div>
          {started && thread.length > 0 && (
            <div className="mt-5 space-y-6">
              {thread.map((id, i) => <Answer key={`${id}-${i}`} t={TOPICS.find((x) => x.id === id)} onAsk={ask} />)}
              <button type="button" onClick={() => setThread([])} className="text-sm text-slate-600 underline dark:text-slate-400">Clear conversation</button>
            </div>
          )}
          <details className="mt-5 rounded-lg border border-slate-200 px-3 py-2 dark:border-slate-700">
            <summary className="cursor-pointer text-sm font-semibold text-slate-900 dark:text-white">Key terms</summary>
            <dl className="mt-2 space-y-1 text-sm">{TERMS.map(([k, v]) => <div key={k}><dt className="inline font-semibold text-slate-900 dark:text-white">{k}: </dt><dd className="inline text-slate-700 dark:text-slate-300">{v}</dd></div>)}</dl>
          </details>
          <p className="mt-4 text-xs text-slate-600 dark:text-slate-400">How to read this page: "the law says" comes from the Act or Rules with the section shown; "what to do" and "how to check" are practical guidance; GDPR, cookie-banner, HIPAA, ISO and SOC 2 material further down is related guidance from other laws or frameworks, not DPDP requirements. Not legal advice.</p>
        </div>
      </div>
    </section>
  );
}
