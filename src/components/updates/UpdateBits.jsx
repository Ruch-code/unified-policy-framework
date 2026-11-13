import { LAST_VERIFIED, SRC } from '../../data/nov2026Updates.js';

export const H = 'text-gray-900 dark:text-white';
export const TXT = 'text-gray-700 dark:text-slate-300';
export const LINE = 'border-gray-200 dark:border-slate-700';
export const CARD = `bg-white dark:bg-[#1e293b] border ${LINE} rounded p-5`;

export const NewBadge = () => <span className="inline-block align-middle ml-2 px-1.5 py-0.5 rounded text-[10px] font-semibold uppercase tracking-wide bg-[#344c67] text-white">New</span>;
export const Pending = () => <span className="inline-block align-middle ml-1 px-1.5 py-0.5 rounded text-[10px] font-semibold bg-amber-100 text-amber-900 dark:bg-amber-900/40 dark:text-amber-100" title="Not yet confirmed by the site owner">Pending verification</span>;
export const Verified = () => <p className="mt-1 text-[11px] text-gray-500 dark:text-slate-400">Last verified: {LAST_VERIFIED}</p>;

export function Sources({ keys }) {
  if (!keys?.length) return null;
  return (
    <span className="ml-1 text-[11px] text-gray-500 dark:text-slate-400">
      Source:{' '}
      {keys.map((k, i) => (
        <span key={k}>{i > 0 && ', '}<a className="underline" href={SRC[k].url} target="_blank" rel="noopener noreferrer">{SRC[k].label}</a></span>
      ))}
    </span>
  );
}

export function BlockTitle({ as: Tag = 'h3', children, id }) {
  return (
    <div>
      <Tag id={id} className={`${Tag === 'h2' ? 'text-2xl' : 'text-lg'} font-bold ${H} scroll-mt-24`}>{children}<NewBadge /></Tag>
      <Verified />
    </div>
  );
}

export function Rows({ label, headers, rows, min = 700 }) {
  return (
    <div className={`overflow-x-auto rounded border ${LINE}`} tabIndex={0} role="region" aria-label={label}>
      <table className="w-full text-sm" style={{ minWidth: min }}>
        <thead className="bg-gray-50 dark:bg-slate-800"><tr>{headers.map((h) => <th key={h} scope="col" className={`text-left p-2.5 font-semibold ${H}`}>{h}</th>)}</tr></thead>
        <tbody>{rows.map((r, i) => <tr key={`${r[0]}-${i}`} className={`border-t ${LINE} align-top`}>{r.map((c, j) => <td key={j} className={`p-2.5 ${j === 0 ? `font-semibold ${H}` : TXT}`}>{c}</td>)}</tr>)}</tbody>
      </table>
    </div>
  );
}
