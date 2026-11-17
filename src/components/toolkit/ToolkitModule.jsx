import TemplateDownloadButton from '../templates/TemplateDownloadButton.jsx';
import { useAuth } from '../../context/AuthContext.jsx';

// Renders one GRC toolkit module in the standard OneLens structure:
// what it is, when, steps, how to test, evidence, pitfalls, maps to, templates (login only), source and last verified.
const CARD = 'bg-white border border-gray-200 rounded-2xl p-5 mb-4 dark:bg-gray-800 dark:border-gray-700';
const P = 'text-sm text-gray-700 dark:text-gray-300';
const TH = 'p-2 text-left font-semibold text-gray-900 dark:text-white bg-gray-50 dark:bg-gray-900';
const TD = 'p-2 align-top border-t border-gray-100 dark:border-gray-700 text-gray-700 dark:text-gray-300';

export function ModuleTable({ head, rows, min = 560 }) {
  return (
    <div className="overflow-x-auto my-2" tabIndex={0} role="region" aria-label={head.join(', ')}>
      <table className="w-full text-sm" style={{ minWidth: min }}>
        <thead><tr>{head.map((h) => <th key={h} scope="col" className={TH}>{h}</th>)}</tr></thead>
        <tbody>{rows.map((r, i) => <tr key={i}>{r.map((c, j) => <td key={j} className={`${TD} ${j === 0 ? 'font-medium' : ''}`}>{c}</td>)}</tr>)}</tbody>
      </table>
    </div>
  );
}

const List = ({ items, ordered }) => {
  const Tag = ordered ? 'ol' : 'ul';
  return <Tag className={`${ordered ? 'list-decimal' : 'list-disc'} pl-5 space-y-1 ${P}`}>{items.map((x) => <li key={x}>{x}</li>)}</Tag>;
};

function Block({ title, children }) {
  return <div className="mt-4"><h3 className="font-semibold text-gray-900 dark:text-white mb-1">{title}</h3>{children}</div>;
}

export function ModuleTemplates({ items }) {
  const { user } = useAuth();
  if (!items?.length) return null;
  return (
    <div className="mt-4 rounded-xl border border-gray-200 dark:border-gray-700 p-3">
      <p className="text-sm font-semibold text-gray-900 dark:text-white mb-2">Templates</p>
      {!user ? <p className="text-xs text-gray-600 dark:text-gray-400">Log in to download templates.</p> : (
        <ul className="space-y-2">{items.map((t) => (
          <li key={t.file} className="flex flex-wrap items-center justify-between gap-2 text-sm"><span className="text-gray-800 dark:text-gray-200"><span className="font-medium">{t.name}</span>: {t.desc}</span><TemplateDownloadButton template={t} compact /></li>
        ))}</ul>
      )}
    </div>
  );
}

export default function ToolkitModule({ m, extra }) {
  return (
    <div>
      <div className={CARD}>
        <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-2">{m.title}</h2>
        <p className={P}>{m.what}</p>
        <p className={`mt-2 ${P}`}><span className="font-semibold">When: </span>{m.when}</p>
        {m.tags && <p className="mt-2 flex flex-wrap gap-1">{m.tags.map((t) => <span key={t} className="badge text-xs rounded border border-gray-300 dark:border-gray-600 px-1.5 py-0.5 text-gray-700 dark:text-gray-300">{t}</span>)}</p>}
      </div>
      <div className={CARD}>
        {m.intro}
        <Block title="Step by step"><List items={m.steps} ordered /></Block>
        {extra}
        <Block title="How to test it"><List items={m.test} /></Block>
        <Block title="What auditors ask for"><List items={m.evidence} /></Block>
        <Block title="Common pitfalls"><List items={m.pitfalls} /></Block>
        <Block title="Maps to"><List items={m.maps} /></Block>
        {m.related}
        <ModuleTemplates items={m.templates} />
        <p className="mt-3 text-xs text-gray-500 dark:text-gray-400">Source: {m.source}. Last verified: {m.verified || '17 Nov 2026'}.</p>
      </div>
    </div>
  );
}
