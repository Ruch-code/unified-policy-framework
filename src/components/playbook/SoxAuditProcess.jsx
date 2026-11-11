import { SOX_INTRO, SOX_PHASES, SOX_DEFICIENCIES, SOX_COMPARE, COSO_PRINCIPLES, ITGC_VS_ITAC } from '../../data/soxAuditProcess.js';

const LINE = 'border-gray-200 dark:border-slate-700';
const TXT = 'text-gray-700 dark:text-slate-300';
const H = 'text-gray-900 dark:text-white';

function Table({ label, headers, rows, min = 900 }) {
  return (
    <div className={`overflow-x-auto rounded-xl border ${LINE}`} tabIndex={0} role="region" aria-label={label}>
      <table className="w-full text-sm" style={{ minWidth: min }}>
        <thead className="bg-gray-50 dark:bg-slate-800"><tr>{headers.map((h) => <th key={h} scope="col" className={`text-left p-2 font-semibold ${H}`}>{h}</th>)}</tr></thead>
        <tbody>{rows.map((r, i) => (
          <tr key={`${r[0]}-${i}`} className={`border-t ${LINE} align-top`}>
            {r.map((c, j) => <td key={j} className={`p-2 ${j === 0 ? `font-semibold ${H}` : TXT}`}>{c}</td>)}
          </tr>
        ))}</tbody>
      </table>
    </div>
  );
}

export default function SoxAuditProcess() {
  return (
    <section id="sox-audit-process" className="max-w-6xl mx-auto px-4 py-10 scroll-mt-24 space-y-8">
      <div>
        <h2 className={`text-2xl font-bold mb-2 ${H}`}>The SOX 404 Audit Process</h2>
        <p className={`text-sm max-w-3xl ${TXT}`}>{SOX_INTRO}</p>
      </div>
      <Table label="SOX 404 audit phases" headers={['Phase', 'Typical timing', 'What happens', 'Who leads', 'Output']} rows={SOX_PHASES} />
      <div>
        <h3 className={`text-lg font-semibold mb-2 ${H}`}>How deficiencies are classified</h3>
        <Table label="Deficiency classification" headers={['Classification', 'Definition', 'Who must be told', 'Effect on the year-end conclusion']} rows={SOX_DEFICIENCIES} min={760} />
      </div>
      <div id="itgc-vs-itac" className="scroll-mt-24">
        <h3 className={`text-lg font-semibold mb-2 ${H}`}>IT general controls and IT application controls</h3>
        <Table label="IT general controls and IT application controls" headers={['Topic', 'IT general controls (ITGCs)', 'IT application controls (ITACs)']} rows={ITGC_VS_ITAC} min={820} />
      </div>
      <div id="coso" className="scroll-mt-24">
        <h3 className={`text-lg font-semibold mb-2 ${H}`}>COSO 2013: five components, 17 principles</h3>
        <Table label="COSO principles" headers={['Component', 'Principle', 'What it requires']} rows={COSO_PRINCIPLES} min={640} />
      </div>
      <div>
        <h3 className={`text-lg font-semibold mb-2 ${H}`}>SOX 404, SOC 1, ISAE 3402 and SOC 2 compared</h3>
        <Table label="SOX 404, SOC 1, ISAE 3402 and SOC 2 compared" headers={['Topic', 'SOX 404', 'SOC 1', 'ISAE 3402', 'SOC 2']} rows={SOX_COMPARE} min={960} />
      </div>
      <p className="text-xs text-gray-500 dark:text-slate-400">Filer status thresholds and deadlines come from SEC rules, which change from time to time. Check current SEC guidance and your auditor's methodology before relying on them.</p>
    </section>
  );
}
