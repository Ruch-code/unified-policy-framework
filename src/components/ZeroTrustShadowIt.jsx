import * as D from '../data/zeroTrustShadowIt.js';

const LINE = 'border-gray-200 dark:border-slate-700';
const TXT = 'text-gray-700 dark:text-slate-300';
const H = 'text-gray-900 dark:text-white';

function Rows({ label, headers, rows, min = 900 }) {
  return (
    <div className={`overflow-x-auto rounded border ${LINE}`} tabIndex={0} role="region" aria-label={label}>
      <table className="w-full text-sm" style={{ minWidth: min }}>
        <thead className="bg-gray-50 dark:bg-slate-800"><tr>{headers.map((h) => <th key={h} scope="col" className={`text-left p-2 font-semibold ${H}`}>{h}</th>)}</tr></thead>
        <tbody>{rows.map((r) => <tr key={r[0]} className={`border-t ${LINE} align-top`}>{r.map((c, j) => <td key={j} className={`p-2 ${j === 0 ? `font-semibold ${H}` : TXT}`}>{c}</td>)}</tr>)}</tbody>
      </table>
    </div>
  );
}

const Sub = ({ children }) => <h3 className={`text-base font-semibold pt-2 ${H}`}>{children}</h3>;

export default function ZeroTrustShadowIt() {
  return (
    <div id="zero-trust-shadow-it" className="bg-white border border-gray-200 rounded p-5 dark:bg-[#1e293b] dark:border-[#334155] space-y-4">
      <h2 className={`text-xl font-bold ${H}`}>Zero Trust and Shadow IT</h2>
      <Sub>Zero trust principles</Sub>
      <p className={`text-sm max-w-3xl ${TXT}`}>{D.ZT_INTRO}</p>
      <Rows label="Zero trust principles" headers={['Principle', 'What it means', 'Practical example', 'Evidence an auditor accepts']} rows={D.ZT_PRINCIPLES} min={1100} />
      <Sub>{D.ZT_SCENARIO_TITLE}</Sub>
      <Rows label="Zero trust worked example" headers={['Step', 'What happens', 'Principle applied']} rows={D.ZT_SCENARIO} />
      <p className={`text-sm max-w-3xl ${TXT}`}>{D.ZT_CONTRAST}</p>
      <Sub>Maturity by pillar (CISA Zero Trust Maturity Model)</Sub>
      <Rows label="Zero trust pillars" headers={['Pillar', 'Typical starting point', 'Target state']} rows={D.ZT_PILLARS} />
      <Sub>Shadow IT</Sub>
      <p className={`text-sm max-w-3xl ${TXT}`}>{D.SIT_INTRO}</p>
      <Rows label="Shadow IT examples" headers={['Practical example', 'Risk', 'How it is found', 'Response']} rows={D.SIT_SCENARIOS} min={1100} />
      <Sub>How to discover shadow IT</Sub>
      <Rows label="Shadow IT discovery" headers={['Source', 'What it shows']} rows={D.SIT_DISCOVERY} min={600} />
      <Sub>How to reduce it</Sub>
      <Rows label="Reducing shadow IT" headers={['Practice', 'Why it works']} rows={D.SIT_PREVENT} min={600} />
      <Sub>Related framework requirements</Sub>
      <Rows label="Related requirements" headers={['Framework', 'Related requirement']} rows={D.ZT_SIT_CONTROLS} min={600} />
      <p className="text-xs text-gray-500 dark:text-slate-400">Control references are paraphrased for orientation. Check the official text before relying on them.</p>
    </div>
  );
}
