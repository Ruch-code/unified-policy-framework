import { TITLE, ABSTRACT, EXEC, PATH_A, PATH_B, TABLE_A, TABLE_B, THEMES, REG, ROADMAP, PLAYBOOK, KRIS, LESSONS, CONTEXT, DISCLAIMER, controlRegister } from '../../data/cryptoCaseStudy.js';
import { downloadXlsx } from '../../utils/xlsxExport.js';

// Anonymised case study analysis for the two exchange incidents: control failures, framework mapping, roadmap and playbook.
const CARD = 'bg-white border border-gray-200 rounded-2xl p-6 mb-8 dark:bg-gray-800 dark:border-gray-700';
const SUMMARY = 'cursor-pointer text-xl font-bold text-gray-900 dark:text-white';
const P = 'text-sm text-gray-700 dark:text-gray-300';
const H = 'mt-5 mb-2 text-base font-semibold text-gray-900 dark:text-white';
const TH = 'p-2 text-left font-semibold text-gray-900 dark:text-white bg-gray-50 dark:bg-gray-900 align-top';
const TD = 'p-2 align-top border-t border-gray-100 dark:border-gray-700 text-gray-700 dark:text-gray-300';

function Table({ head, rows, min = 760 }) {
  return (
    <div className="overflow-x-auto" tabIndex={0} role="region" aria-label={head.join(', ')}>
      <table className="w-full text-sm" style={{ minWidth: min }}>
        <thead><tr>{head.map((h) => <th key={h} scope="col" className={TH}>{h}</th>)}</tr></thead>
        <tbody>{rows.map((r, i) => <tr key={i}>{r.map((c, j) => <td key={j} className={`${TD} ${j === 0 ? 'font-medium' : ''}`}>{c}</td>)}</tr>)}</tbody>
      </table>
    </div>
  );
}
const CTRL_HEAD = ['Control area', 'What failed', 'Basis', 'ISO 27001:2022 Annex A', 'SOC 2 TSC / CCSS', 'Severity'];
const PATH_HEAD = ['Basis', 'Point', 'Control that would have prevented or detected it', 'Control references'];
const NOTE = 'Anonymised, independent analysis based on publicly reported information. Educational use only.';

function downloadWorkbook() {
  downloadXlsx([
    { name: 'Control register', title: 'Control register: both incidents, with overlaps', notes: [NOTE, 'Overlap = Yes means the control area failed in both incidents.'], headers: ['Control area', 'Incidents', 'Overlap', 'ISO 27001:2022 Annex A', 'SOC 2 TSC / CCSS', 'What failed', 'Severity'], rows: controlRegister() },
    { name: 'Incident A path', title: 'Incident A (mid-2025): attack path and preventive controls', notes: [NOTE], headers: PATH_HEAD, rows: PATH_A },
    { name: 'Incident B path', title: 'Incident B (late 2026): attack path and preventive controls', notes: [NOTE], headers: PATH_HEAD, rows: PATH_B },
    { name: 'Incident A failures', title: 'Incident A: control failures', notes: [NOTE], headers: CTRL_HEAD, rows: TABLE_A },
    { name: 'Incident B failures', title: 'Incident B: control failures', notes: [NOTE], headers: CTRL_HEAD, rows: TABLE_B },
    { name: 'Regulatory mapping', title: 'Regulatory and framework mapping for an Indian VDA service provider', notes: [NOTE], headers: ['Regulation or standard', 'Key obligation', 'Relevance to these incidents', 'Evidence a GRC team should hold'], rows: REG },
    { name: 'Roadmap', title: 'Remediation roadmap', notes: [NOTE], headers: ['Phase', 'Action', 'Owner function', 'Evidence of completion', 'KRI or KPI to track'], rows: ROADMAP },
    { name: 'KRIs', title: 'Monthly KRI set', notes: [NOTE], headers: ['KRI'], rows: KRIS.map((k) => [k]) },
  ], 'crypto-exchange-incident-control-mapping');
}

export default function CryptoCaseStudy() {
  return (
    <details className={CARD} id="crypto-case-study">
      <summary className={SUMMARY}>Case study analysis: control failures, framework mapping and remediation</summary>
      <div className="mt-3">
        <h3 className="text-lg font-bold text-gray-900 dark:text-white">{TITLE}</h3>
        <p className={`mt-2 ${P}`}>{ABSTRACT}</p>
        <button type="button" onClick={downloadWorkbook} className="mt-3 inline-flex items-center rounded-lg border border-gray-300 dark:border-gray-600 px-3 py-1.5 text-sm font-semibold text-gray-900 dark:text-white hover:bg-gray-50 dark:hover:bg-gray-700">Download control mapping (Excel)</button>
        <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">Control register with overlaps across both incidents, attack paths with preventive controls, control failures, regulatory mapping, roadmap and KRIs, each on its own sheet.</p>

        <h3 className={H}>Executive summary</h3>
        <ul className={`list-disc pl-5 space-y-1 ${P}`}>{EXEC.map((x) => <li key={x}>{x}</li>)}</ul>

        <h3 className={H}>Incident A (mid-2025): attack path and control failures</h3>
        <Table head={PATH_HEAD} rows={PATH_A} min={1000} />
        <div className="mt-3"><Table head={CTRL_HEAD} rows={TABLE_A} min={1100} /></div>

        <h3 className={H}>Incident B (late 2026): attack path and control failures</h3>
        <Table head={PATH_HEAD} rows={PATH_B} min={1000} />
        <div className="mt-3"><Table head={CTRL_HEAD} rows={TABLE_B} min={1100} /></div>

        <h3 className={H}>Contextual risks (no incident loss attributed)</h3>
        <Table head={['Basis', 'Point']} rows={CONTEXT} min={560} />

        <h3 className={H}>Cross-incident themes</h3>
        <Table head={['Root cause', 'What it looked like']} rows={THEMES} min={560} />

        <h3 className={H}>Regulatory and framework mapping for an Indian VDA service provider</h3>
        <Table head={['Regulation or standard', 'Key obligation', 'Relevance to these incidents', 'Evidence a GRC team should hold']} rows={REG} min={1100} />

        <h3 className={H}>Remediation roadmap (VP Engineering and GRC view)</h3>
        <Table head={['Phase', 'Action', 'Owner function', 'Evidence of completion', 'KRI or KPI to track']} rows={ROADMAP} min={1100} />

        <h3 className={H}>GRC leadership playbook: first 90 days after incidents like these</h3>
        <Table head={['Period', 'Focus']} rows={PLAYBOOK} min={560} />
        <p className={`mt-3 text-sm font-semibold text-gray-900 dark:text-white`}>Monthly KRI set</p>
        <ul className={`list-disc pl-5 space-y-1 ${P}`}>{KRIS.map((x) => <li key={x}>{x}</li>)}</ul>

        <h3 className={H}>Key lessons for any custodial digital asset platform</h3>
        <ol className={`list-decimal pl-5 space-y-1 ${P}`}>{LESSONS.map((x) => <li key={x}>{x}</li>)}</ol>

        <p className="mt-4 text-xs text-gray-500 dark:text-gray-400">{DISCLAIMER}</p>
      </div>
    </details>
  );
}
