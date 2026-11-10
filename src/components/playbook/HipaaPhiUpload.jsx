import { UPLOAD_INTRO, UPLOAD_FLOW, EMAIL_INTRO, EMAIL_STEPS, EMAIL_REPLY } from '../../data/hipaaPhiUpload.js';
import { ROLE_ACCESS, ROLE_NOTE } from '../../data/hipaaBreachScenarios.js';

const LINE = 'border-gray-200 dark:border-slate-700';
const TXT = 'text-gray-700 dark:text-slate-300';
const H = 'text-gray-900 dark:text-white';
// Highlight for the protecting control: amber, AA contrast in both themes.
const HL = 'bg-amber-100 text-amber-900 border-amber-300 dark:bg-amber-900/60 dark:text-amber-100 dark:border-amber-700';

export default function HipaaPhiUpload() {
  return (
    <section id="phi-upload" className="max-w-6xl mx-auto px-4 py-10 scroll-mt-24">
      <h2 className={`text-2xl font-bold mb-2 ${H}`}>When Doctors Upload PHI: What Protects It</h2>
      <p className={`text-sm mb-4 max-w-3xl ${TXT}`}>{UPLOAD_INTRO}</p>
      <div className={`overflow-x-auto rounded-xl border ${LINE}`} tabIndex={0} role="region" aria-label="PHI upload flow and protecting controls">
        <table className="w-full text-sm min-w-[1000px]">
          <thead className="bg-gray-50 dark:bg-slate-800"><tr>
            {['Step', 'What happens', 'HIPAA control that protects it', 'Citation', 'How a breach could happen here'].map((h) => <th key={h} scope="col" className={`text-left p-2 font-semibold ${H}`}>{h}</th>)}
          </tr></thead>
          <tbody>{UPLOAD_FLOW.map((r) => (
            <tr key={r[0]} className={`border-t ${LINE} align-top`}>
              <td className={`p-2 font-semibold ${H}`}>{r[0]}</td>
              <td className={`p-2 ${TXT}`}>{r[1]}</td>
              <td className="p-2"><span className={`inline-block rounded-md border px-2 py-1 font-semibold ${HL}`}>{r[2]}</span></td>
              <td className={`p-2 font-mono text-xs ${TXT}`}>{r[3]}</td>
              <td className={`p-2 ${TXT}`}>{r[4]}</td>
            </tr>
          ))}</tbody>
        </table>
      </div>

      <p className={`mt-3 text-sm ${TXT}`}>Step 4 in detail: <a href="#who-can-see-ephi" className="underline text-sky-700 dark:text-sky-300">who can see ePHI, team by team</a>.</p>

      <h3 id="who-can-see-ephi" className={`text-xl font-bold mt-10 mb-2 scroll-mt-24 ${H}`}>Who Can See ePHI: Same Data, Different Access</h3>
      <p className={`text-sm mb-4 max-w-3xl ${TXT}`}>The PHI doctors upload must not be open to every team. Customer support and infrastructure work without seeing ePHI by default, under the minimum necessary standard.</p>
      <div className={`overflow-x-auto rounded-xl border ${LINE}`} tabIndex={0} role="region" aria-label="Who can see ePHI">
        <table className="w-full text-sm min-w-[1000px]">
          <thead className="bg-gray-50 dark:bg-slate-800"><tr>
            {['Team', 'Can they see ePHI?', 'What they see instead', 'How it is enforced', 'HIPAA citation'].map((h) => <th key={h} scope="col" className={`text-left p-2 font-semibold ${H}`}>{h}</th>)}
          </tr></thead>
          <tbody>{ROLE_ACCESS.map((r) => (
            <tr key={r[0]} className={`border-t ${LINE} align-top`}>
              {r.map((c, j) => <td key={j} className={`p-2 ${j === 0 ? `font-semibold ${H}` : j === 4 ? `font-mono text-xs ${TXT}` : TXT}`}>{c}</td>)}
            </tr>
          ))}</tbody>
        </table>
      </div>
      <p className="mt-2 text-xs text-gray-500 dark:text-slate-400">{ROLE_NOTE}</p>

      <h3 className={`text-xl font-bold mt-10 mb-2 ${H}`}>A Breach Report Arrives by Email: How to Handle It</h3>
      <p className={`text-sm mb-4 max-w-3xl ${TXT}`}>{EMAIL_INTRO}</p>
      <div className={`overflow-x-auto rounded-xl border ${LINE}`} tabIndex={0} role="region" aria-label="Email breach report handling steps">
        <table className="w-full text-sm min-w-[860px]">
          <thead className="bg-gray-50 dark:bg-slate-800"><tr>
            {['#', 'Step', 'Timing', 'What to do', 'Who'].map((h) => <th key={h} scope="col" className={`text-left p-2 font-semibold ${H}`}>{h}</th>)}
          </tr></thead>
          <tbody>{EMAIL_STEPS.map((r, i) => (
            <tr key={r[0]} className={`border-t ${LINE} align-top`}>
              <td className={`p-2 ${TXT}`}>{i + 1}</td>
              <td className={`p-2 font-semibold ${H}`}>{r[0]}</td>
              <td className={`p-2 ${TXT}`}>{r[1]}</td>
              <td className={`p-2 ${TXT}`}>{r[2]}</td>
              <td className={`p-2 ${TXT}`}>{r[3]}</td>
            </tr>
          ))}</tbody>
        </table>
      </div>
      <div className={`mt-4 rounded-xl border ${LINE} p-4`}>
        <p className={`text-sm font-semibold mb-1 ${H}`}>First reply to the sender</p>
        <p className={`text-sm ${TXT}`}>{EMAIL_REPLY}</p>
      </div>
    </section>
  );
}
