import { AS_INTRO, LEAST_PRIVILEGE, APP_SCOPING_RULES, APP_REQUIREMENTS, SOD_STRATEGIES, AS_RELATED, SOD_AUDIT_TESTS, SOD_AUDIT_FINDINGS } from '../data/accessSod.js';

const LINE = 'border-gray-200 dark:border-slate-700';
const TXT = 'text-gray-700 dark:text-slate-300';
const H = 'text-gray-900 dark:text-white';

function Table({ label, headers, rows, min = 760 }) {
  return (
    <div className={`overflow-x-auto rounded border ${LINE}`} tabIndex={0} role="region" aria-label={label}>
      <table className="w-full text-sm" style={{ minWidth: min }}>
        <thead className="bg-gray-50 dark:bg-slate-800"><tr>{headers.map((h) => <th key={h} scope="col" className={`text-left p-2 font-semibold ${H}`}>{h}</th>)}</tr></thead>
        <tbody>{rows.map((r) => (
          <tr key={r[0]} className={`border-t ${LINE} align-top`}>
            {r.map((c, j) => <td key={j} className={`p-2 ${j === 0 ? `font-semibold ${H}` : TXT}`}>{c}</td>)}
          </tr>
        ))}</tbody>
      </table>
    </div>
  );
}

export default function AccessSod() {
  return (
    <section id="access-sod" className="mt-8 scroll-mt-24 space-y-6">
      <div>
        <h2 className={`text-xl font-bold mb-2 ${H}`}>Least Privilege, Application Access and Segregation of Duties</h2>
        <p className={`text-sm max-w-3xl ${TXT}`}>{AS_INTRO}</p>
      </div>
      <div>
        <h3 className={`text-lg font-semibold mb-2 ${H}`}>The principle of least privilege</h3>
        <Table label="Least privilege" headers={['Principle', 'What it means', 'How to implement', 'Evidence an auditor accepts']} rows={LEAST_PRIVILEGE} min={900} />
      </div>
      <div>
        <h3 className={`text-lg font-semibold mb-2 ${H}`}>Which applications are in scope</h3>
        <Table label="Application scoping" headers={['Bring into scope', 'Why', 'Typical examples']} rows={APP_SCOPING_RULES} />
      </div>
      <div>
        <h3 className={`text-lg font-semibold mb-2 ${H}`}>What every in-scope application needs</h3>
        <Table label="Application access requirements" headers={['Requirement', 'Why', 'Evidence']} rows={APP_REQUIREMENTS} />
      </div>
      <div>
        <h3 className={`text-lg font-semibold mb-2 ${H}`}>Preventing segregation of duties conflicts</h3>
        <Table label="Segregation of duties strategies" headers={['Strategy', 'How it works', 'Example conflict it prevents']} rows={SOD_STRATEGIES} />
      </div>
      <details id="sod-audit" className={`rounded-xl border ${LINE} p-4`}>
        <summary className={`cursor-pointer text-lg font-semibold ${H}`}>How auditors test segregation of duties and what evidence they ask for</summary>
        <div className="mt-3 space-y-2">
          <Table label="SoD audit tests" headers={['Test step', 'What the auditor does', 'Evidence requested']} rows={SOD_AUDIT_TESTS} min={900} />
          <p className={`text-sm ${TXT}`}>{SOD_AUDIT_FINDINGS}</p>
          <p className={`text-sm ${TXT}`}>Framework links: ISO/IEC 27001:2022 A.5.3 (segregation of duties), SOC 2 CC5.1 and CC6.1 to CC6.3, SOX ITGC access controls. Tool names are examples, not endorsements.</p>
        </div>
      </details>
      <p className="text-xs text-gray-500 dark:text-slate-400">{AS_RELATED}</p>
    </section>
  );
}
