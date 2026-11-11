import { MD_STANDARDS, MD_TIMELINE, MD_LINKS } from '../../data/medicalDevices.js';

const LINE = 'border-gray-200 dark:border-slate-700';
const TXT = 'text-gray-700 dark:text-slate-300';
const H = 'text-gray-900 dark:text-white';

function Table({ label, headers, rows, min = 900 }) {
  return (
    <div className={`overflow-x-auto rounded border ${LINE}`} tabIndex={0} role="region" aria-label={label}>
      <table className="w-full text-sm" style={{ minWidth: min }}>
        <thead className="bg-gray-50 dark:bg-slate-800"><tr>{headers.map((h) => <th key={h} scope="col" className={`text-left p-2 font-semibold ${H}`}>{h}</th>)}</tr></thead>
        <tbody>{rows.map((r, i) => <tr key={`${r[0]}-${i}`} className={`border-t ${LINE} align-top`}>{r.map((c, j) => <td key={j} className={`p-2 ${j === 0 ? `font-semibold ${H}` : TXT}`}>{c}</td>)}</tr>)}</tbody>
      </table>
    </div>
  );
}

export default function MedicalDeviceReference() {
  return (
    <section id="medical-device-reference" className="max-w-6xl mx-auto px-4 py-10 scroll-mt-24 space-y-8">
      <div>
        <h2 className={`text-2xl font-bold mb-2 ${H}`}>Medical Device Standards at a Glance</h2>
        <Table label="Medical device standards" headers={['Standard or rule', 'What it covers', 'Who needs it', 'How it is demonstrated', 'Current status']} rows={MD_STANDARDS} min={1000} />
      </div>
      <div>
        <h3 className={`text-lg font-semibold mb-2 ${H}`}>510(k) timeline</h3>
        <Table label="510(k) timeline" headers={['Phase', 'Typical timing', 'What happens', 'Output']} rows={MD_TIMELINE} />
      </div>
      <div>
        <h3 className={`text-lg font-semibold mb-2 ${H}`}>How this connects to other frameworks on the site</h3>
        <Table label="Connections to other frameworks" headers={['This framework', 'Connects to', 'How']} rows={MD_LINKS} min={720} />
      </div>
      <p className="text-xs text-gray-500 dark:text-slate-400">Regulatory details were checked in November 2026. FDA guidance, recognised standards and review timelines change; confirm against current FDA and IEC sources before relying on them.</p>
    </section>
  );
}
