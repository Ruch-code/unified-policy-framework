import { useMemo, useState } from 'react';
import * as A from '../data/auditorRequestList.js';
import * as T from '../data/tabletopExercise.js';

const H = 'text-gray-900 dark:text-white';
const TXT = 'text-gray-700 dark:text-slate-300';
const LINE = 'border-gray-200 dark:border-slate-700';

function Rows({ label, headers, rows, min = 700 }) {
  return (
    <div className={`overflow-x-auto rounded border ${LINE}`} tabIndex={0} role="region" aria-label={label}>
      <table className="w-full text-sm" style={{ minWidth: min }}>
        <thead className="bg-gray-50 dark:bg-slate-800"><tr>{headers.map((h) => <th key={h} scope="col" className={`text-left p-2.5 font-semibold ${H}`}>{h}</th>)}</tr></thead>
        <tbody>{rows.map((r, i) => <tr key={`${r[0]}-${i}`} className={`border-t ${LINE} align-top`}>{r.map((c, j) => <td key={j} className={`p-2.5 ${j === 0 ? `font-semibold ${H}` : TXT}`}>{c}</td>)}</tr>)}</tbody>
      </table>
    </div>
  );
}
const Sub = ({ children }) => <h3 className={`text-lg font-semibold mt-8 mb-2 ${H}`}>{children}</h3>;

export function AuditorRequestList() {
  const areas = useMemo(() => ['All', ...new Set(A.ARL_ITEMS.map((r) => r[0]))], []);
  const [area, setArea] = useState('All');
  const [type, setType] = useState('All');
  const [q, setQ] = useState('');
  const rows = useMemo(() => {
    const term = q.trim().toLowerCase();
    return A.ARL_ITEMS.map((r, i) => [...r, A.ARL_SCOPING[i]]).filter((r) => (area === 'All' || r[0] === area) && (type === 'All' || r[3] === type) && (!term || r.join(' ').toLowerCase().includes(term)));
  }, [area, type, q]);
  const SEL = `px-3 py-1.5 border ${LINE} rounded text-sm bg-white dark:bg-slate-900`;

  return (
    <div>
      <p className={`text-sm max-w-3xl ${TXT}`}>{A.ARL_INTRO}</p>
      <Sub>The four kinds of request</Sub>
      <Rows label="Kinds of request" headers={['Evidence type', 'What it means', 'How to respond well']} rows={A.ARL_TYPE_GUIDE} />

      <Sub>When a request does not apply</Sub>
      <p className={`text-sm max-w-3xl mb-3 ${TXT}`}>{A.ARL_SCOPING_INTRO}</p>
      <Rows label="Scoping reasons" headers={['Reason', 'What it means', 'What to provide']} rows={A.ARL_SCOPING_REASONS} />

      <Sub>Requests, responses and follow-ups</Sub>
      <div className="flex flex-wrap items-center gap-2">
        <label className="text-xs font-semibold text-gray-600 dark:text-slate-300">Area <select value={area} onChange={(e) => setArea(e.target.value)} className={`ml-1 ${SEL}`}>{areas.map((a) => <option key={a}>{a}</option>)}</select></label>
        <label className="text-xs font-semibold text-gray-600 dark:text-slate-300">Type <select value={type} onChange={(e) => setType(e.target.value)} className={`ml-1 ${SEL}`}>{['All', ...A.ARL_TYPES].map((t) => <option key={t}>{t}</option>)}</select></label>
        <input type="search" value={q} onChange={(e) => setQ(e.target.value)} placeholder="Search requests" aria-label="Search requests" className={`ml-auto w-full sm:w-56 ${SEL}`} />
      </div>
      <p className="mt-2 mb-2 text-xs text-gray-500 dark:text-slate-400">{rows.length} of {A.ARL_ITEMS.length} requests shown</p>
      <Rows label="Auditor requests" min={1800}
        headers={['Area', 'Control tested', 'What the auditor asked for', 'Evidence type', 'How to respond, with an example', 'Follow-up to expect', 'When it may not apply (scoping)']} rows={rows} />

      <Sub>Lessons from the first pass</Sub>
      <Rows label="Lessons" headers={['Lesson', 'Why it matters']} rows={A.ARL_LESSONS} min={600} />
    </div>
  );
}

export function TabletopExercise() {
  return (
    <div>
      <p className={`text-sm max-w-3xl ${TXT}`}>{T.TTX_INTRO}</p>
      <Sub>Exercise setup</Sub>
      <Rows label="Exercise setup" headers={['Item', 'What to record']} rows={T.TTX_SETUP} min={600} />

      <Sub>Scenario</Sub>
      <p className={`text-sm max-w-3xl mb-3 ${TXT}`}>{T.TTX_SCENARIO_INTRO}</p>
      <Rows label="Scenario timeline" headers={['Time', 'What happens']} rows={T.TTX_TIMELINE} min={600} />
      <div className="mt-3"><Rows label="Immediate impact" headers={['Impact', 'Description']} rows={T.TTX_IMPACT} min={600} /></div>

      <Sub>Incident response: questions and model responses</Sub>
      <Rows label="Incident response questions" headers={['Question', 'Model response']} rows={T.TTX_IR_QA} min={700} />

      <Sub>Disaster recovery: questions and model responses</Sub>
      <Rows label="Disaster recovery questions" headers={['Question', 'Model response']} rows={T.TTX_DR_QA} min={700} />

      <Sub>Recovery approach</Sub>
      <Rows label="Recovery approach" headers={['Step', 'Action']} rows={T.TTX_RECOVERY} min={560} />
      <div className="mt-3"><Rows label="Recovery targets" headers={['Target', 'Time']} rows={T.TTX_TARGETS} min={560} /></div>

      <Sub>Findings and recommendations</Sub>
      <Rows label="Findings" headers={['Observation', 'Recommendation']} rows={T.TTX_FINDINGS} min={700} />

      <Sub>What to keep as audit evidence</Sub>
      <ul className={`list-disc pl-5 space-y-1 text-sm ${TXT}`}>{T.TTX_EVIDENCE.map((e) => <li key={e}>{e}</li>)}</ul>
    </div>
  );
}
