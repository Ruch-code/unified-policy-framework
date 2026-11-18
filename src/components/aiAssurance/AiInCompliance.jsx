// How AI tools are used inside security compliance work, the risks, and the controls to put around them.
const CARD = 'rounded-2xl border border-surface-300 dark:border-surface-dark-300 bg-white dark:bg-slate-900/60 p-6 md:p-8';
const P = 'text-sm text-gray-700 dark:text-text-dark-secondary';
const TH = 'p-2 text-left font-semibold text-gray-900 dark:text-text-dark-primary bg-surface-50 dark:bg-slate-800 align-top';
const TD = 'p-2 align-top border-t border-surface-200 dark:border-surface-dark-200 text-gray-700 dark:text-text-dark-secondary';

const USES = [
  ['Security questionnaires and RFPs', 'Drafts answers from an approved knowledge base (for example SiftHub and similar tools)', 'Outdated or wrong answers become contract commitments', 'Approved, current sources only; a named reviewer signs off every answer'],
  ['Control mapping', 'Maps one control to SOC 2, ISO 27001 and other frameworks', 'Wrong mapping hides a gap', 'Spot-check mappings against the framework text'],
  ['Vendor reviews', 'Summarises SOC 2 reports, exceptions and CUECs', 'Missed exceptions or misread scope', 'Reviewer reads the exceptions section in full'],
  ['Evidence collection', 'Flags missing or stale evidence and drafts requests', 'False confidence that evidence is complete', 'Compare against the full population, not the tool count'],
  ['Policy drafting', 'Drafts or updates policies and procedures', 'Generic text that does not match how you work', 'Owner edits and approves; version control'],
];

export default function AiInCompliance() {
  return (
    <details className={CARD} id="ai-in-compliance">
      <summary className="cursor-pointer grc-section-title">AI tools in security compliance work</summary>
      <div className="mt-3">
        <p className={P}>AI helps most with repetitive text work, which frees time for risk judgment. Treat each tool as a vendor and keep a person accountable for anything that leaves the company.</p>
        <div className="overflow-x-auto mt-3" tabIndex={0} role="region" aria-label="AI uses in compliance">
          <table className="w-full text-sm min-w-[760px]">
            <thead><tr>{['Use', 'What the AI does', 'Risk', 'Control'].map((h) => <th key={h} scope="col" className={TH}>{h}</th>)}</tr></thead>
            <tbody>{USES.map((r) => <tr key={r[0]}>{r.map((c, j) => <td key={j} className={`${TD} ${j === 0 ? 'font-medium' : ''}`}>{c}</td>)}</tr>)}</tbody>
          </table>
        </div>
        <h4 className="mt-4 mb-1 font-semibold text-gray-900 dark:text-text-dark-primary">Before adopting a tool</h4>
        <ul className={`list-disc pl-5 space-y-1 ${P}`}>
          <li>Run it through vendor review: SOC 2 or ISO 27001, data retention, and whether your data trains their models.</li>
          <li>Connect it only to approved, current sources, and remove superseded policies from its knowledge base.</li>
          <li>Keep a human reviewer on every customer-facing or audit-facing output, and log what the tool produced.</li>
          <li>Measure it: turnaround time saved and the error rate found in review.</li>
        </ul>
      </div>
    </details>
  );
}
