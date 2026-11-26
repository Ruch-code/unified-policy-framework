// Shadow AI: using AI tools or features for work without the organisation's knowledge, approval or oversight.
const P = 'text-sm leading-relaxed text-gray-700 dark:text-gray-300';
const H = 'mt-5 mb-1 text-base font-semibold text-gray-900 dark:text-white';
const TH = 'p-2 text-left font-semibold text-gray-900 dark:text-white bg-gray-50 dark:bg-gray-900 align-bottom';
const TD = 'p-2 align-top border-t border-gray-100 dark:border-gray-700 text-gray-700 dark:text-gray-300';

const FORMS = [
  ['AI chatbots and assistants', 'Pasting client documents, code or data into a personal or free AI account'],
  ['AI meeting assistants', 'A note-taker bot joins calls and records or transcribes confidential discussions'],
  ['Browser extensions', 'Writing or summary extensions that can read every page and form you open'],
  ['AI writing or summarisation tools', 'Uploading contracts, reports or emails for quick rewrites or summaries'],
  ['AI features inside approved apps', 'New AI features switched on in tools you already use, before anyone reviewed them'],
];

const CONTROLS = [
  ['Policy', 'An acceptable use of AI policy that says which tools are approved, for which data classes, and what is never allowed'],
  ['Approved tool list', 'A published list of approved AI tools and features, with the data classification each is cleared for, and a fast route to request a new one'],
  ['Discovery', 'Use CASB, secure web gateway, SaaS discovery, OAuth app reviews and browser extension inventories to find AI tools in use'],
  ['Technical controls', 'Block or warn on unapproved AI sites, use DLP to stop confidential data being pasted or uploaded, restrict browser extensions and meeting bots'],
  ['Vendor review', 'Check data retention, use of inputs for training, hosting location, security and contract terms before approving an AI tool'],
  ['Feature governance', 'Review new AI features in existing apps before enabling them; check admin settings for data sharing and training opt-outs'],
  ['Awareness', 'Short training with real examples, and a simple question everyone asks before using AI for work'],
  ['Incident handling', 'Treat accidental sharing of confidential data with an unapproved AI tool as a reportable data incident, without blame for reporting'],
];

export default function ShadowAi() {
  return (
    <details className="my-6 rounded-2xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 p-5" id="shadow-ai">
      <summary className="cursor-pointer text-lg font-bold text-gray-900 dark:text-white">Shadow AI: using AI at work without approval</summary>
      <div className="mt-3">
        <h3 className={H}>A common scenario</h3>
        <p className={P}>Your manager asks you to summarise a long client document. You are short on time, so you upload it to an AI tool and get a summary in seconds. The catch: the document contains confidential client information and the tool has not been approved by your organisation. You were only trying to work faster, but you may have shared company or client information with an external provider, outside the organisation&apos;s approved security, privacy and governance safeguards. That is Shadow AI.</p>

        <h3 className={H}>What Shadow AI is</h3>
        <p className={P}>Shadow AI is the use of AI tools or features for work without the organisation&apos;s knowledge, approval or oversight. It is a form of shadow IT, and it is not limited to chatbots.</p>
        <div className="overflow-x-auto my-2" tabIndex={0} role="region" aria-label="Where Shadow AI shows up">
          <table className="w-full text-sm" style={{ minWidth: 620 }}>
            <thead><tr>{['Where it shows up', 'Example'].map((h) => <th key={h} scope="col" className={TH}>{h}</th>)}</tr></thead>
            <tbody>{FORMS.map((r) => <tr key={r[0]}>{r.map((c, j) => <td key={j} className={`${TD} ${j === 0 ? 'font-semibold text-gray-900 dark:text-white' : ''}`}>{c}</td>)}</tr>)}</tbody>
          </table>
        </div>

        <h3 className={H}>The real concern</h3>
        <p className={P}>The concern is not that people use AI. It is whether we know where our information is going, how it is handled, and whether the tool is approved for that information. Risks include confidential or personal data kept or used for training by the provider, breach of client contracts and NDAs, privacy law breaches, and no audit trail if something goes wrong.</p>

        <h3 className={H}>Before sharing work information with an AI tool, ask</h3>
        <p className={`${P} font-semibold`}>Is this tool approved, and am I allowed to share this information with it?</p>

        <h3 className={H}>Controls for the organisation</h3>
        <div className="overflow-x-auto my-2" tabIndex={0} role="region" aria-label="Shadow AI controls">
          <table className="w-full text-sm" style={{ minWidth: 700 }}>
            <thead><tr>{['Control', 'What it looks like'].map((h) => <th key={h} scope="col" className={TH}>{h}</th>)}</tr></thead>
            <tbody>{CONTROLS.map((r) => <tr key={r[0]}>{r.map((c, j) => <td key={j} className={`${TD} ${j === 0 ? 'font-semibold text-gray-900 dark:text-white' : ''}`}>{c}</td>)}</tr>)}</tbody>
          </table>
        </div>
        <p className={`${P} mt-2`}>Blocking alone pushes use further underground. The most effective approach pairs clear rules and monitoring with approved, easy-to-use AI tools so people have a safe option.</p>
      </div>
    </details>
  );
}
