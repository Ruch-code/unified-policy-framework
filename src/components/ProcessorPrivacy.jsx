import { PP_INTRO, PP_ROWS } from '../data/processorPrivacy.js';

const LINE = 'border-gray-200 dark:border-slate-700';
const TXT = 'text-gray-700 dark:text-slate-300';
const H = 'text-gray-900 dark:text-white';

export default function ProcessorPrivacy() {
  return (
    <section id="processor-privacy" className="max-w-6xl mx-auto px-4 py-10 scroll-mt-24">
      <h2 className={`text-2xl font-bold mb-2 ${H}`}>Privacy Requirements for Processors on Customer Data and AI Projects</h2>
      <p className={`text-sm mb-4 max-w-3xl ${TXT}`}>{PP_INTRO}</p>
      <div className={`overflow-x-auto rounded-xl border ${LINE}`} tabIndex={0} role="region" aria-label="Processor privacy requirements">
        <table className="w-full text-sm min-w-[1000px]">
          <thead className="bg-gray-50 dark:bg-slate-800"><tr>
            {['Category', 'Requirement', 'GDPR', 'ISO/IEC 27701', 'Other references'].map((h) => <th key={h} scope="col" className={`text-left p-2 font-semibold ${H}`}>{h}</th>)}
          </tr></thead>
          <tbody>{PP_ROWS.map((r) => (
            <tr key={r[0]} className={`border-t ${LINE} align-top`}>
              <td className={`p-2 font-semibold ${H}`}>{r[0]}</td>
              <td className={`p-2 ${TXT}`}>{r[1]}</td>
              <td className={`p-2 font-mono text-xs ${TXT}`}>{r[2]}</td>
              <td className={`p-2 font-mono text-xs ${TXT}`}>{r[3]}</td>
              <td className={`p-2 font-mono text-xs ${TXT}`}>{r[4]}</td>
            </tr>
          ))}</tbody>
        </table>
      </div>
      <p className="mt-2 text-xs text-gray-500 dark:text-slate-400">ISO/IEC 27701 references use the 2019 numbering (A = controller, B = processor). Check the edition you certify against.</p>
    </section>
  );
}
