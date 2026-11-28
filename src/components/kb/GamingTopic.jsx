import { Link } from 'react-router-dom';
import { GAMING_TOPICS, GAMING_VERIFIED } from '../../data/gamingGrc.js';
import { NewBadge } from '../updates/UpdateBits.jsx';

// Renders one Commercial Gaming GRC (UAE / GCGRA) topic. [VERIFY] markers are highlighted.
const P = 'text-sm leading-relaxed text-gray-700 dark:text-slate-300';
const TH = 'p-2.5 text-left font-semibold text-gray-900 dark:text-white bg-gray-50 dark:bg-slate-800 align-bottom';
const TD = 'p-2.5 align-top border-t border-gray-200 dark:border-slate-700 text-gray-700 dark:text-slate-300';

function Txt({ s }) {
  const parts = s.split(/(\[VERIFY[^\]]*\])/g);
  return <>{parts.map((p, i) => (p.startsWith('[VERIFY') ? <mark key={i} className="px-1 rounded bg-amber-100 dark:bg-amber-900/40 text-amber-900 dark:text-amber-200 text-xs font-semibold">{p}</mark> : p))}</>;
}

export default function GamingTopic({ id }) {
  const t = GAMING_TOPICS.find((x) => x.id === id);
  if (!t) return null;
  return (
    <article className="space-y-5">
      <header>
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white">{t.label}<NewBadge /></h2>
        <p className={`mt-1 ${P}`}>{t.desc}</p>
        <p className="mt-1 text-[11px] text-gray-500 dark:text-slate-400">Commercial Gaming GRC (UAE / GCGRA). Last verified: {GAMING_VERIFIED}.</p>
      </header>
      {t.sections.map((s) => (
        <section key={s.h}>
          <h3 className="mb-1 text-base font-bold text-gray-900 dark:text-white">{s.h}</h3>
          {s.p && <p className={P}><Txt s={s.p} /></p>}
          {s.list && <ul className={`list-disc pl-5 space-y-1 ${P}`}>{s.list.map((x) => <li key={x}><Txt s={x} /></li>)}</ul>}
          {s.table && (
            <div className="overflow-x-auto rounded border border-gray-200 dark:border-slate-700" tabIndex={0} role="region" aria-label={s.h}>
              <table className="w-full text-sm" style={{ minWidth: s.table.head.length > 2 ? 760 : 560 }}>
                <thead><tr>{s.table.head.map((h) => <th key={h} scope="col" className={TH}>{h}</th>)}</tr></thead>
                <tbody>{s.table.rows.map((r) => <tr key={r[0]}>{r.map((c, j) => <td key={j} className={`${TD} ${j === 0 ? 'font-semibold text-gray-900 dark:text-white' : ''}`}><Txt s={c} /></td>)}</tr>)}</tbody>
              </table>
            </div>
          )}
          {s.note && <p className="mt-1 text-xs text-gray-500 dark:text-slate-400"><Txt s={s.note} /></p>}
          {s.link && <p className={P}><Link className="ui-link" to={s.link[0]}>{s.link[1]}</Link></p>}
        </section>
      ))}
      <section>
        <h3 className="mb-1 text-base font-bold text-gray-900 dark:text-white">Related on OneLens</h3>
        <p className={P}>{GAMING_TOPICS.filter((x) => x.id !== t.id).map((x, i) => <span key={x.id}>{i ? ' · ' : ''}<Link className="ui-link" to={`/knowledge?topic=${x.id}`}>{x.label}</Link></span>)} · <Link className="ui-link" to="/gli-19">GLI-19 playbook</Link> · <Link className="ui-link" to="/#interview-prep">Regulated gaming interview questions</Link></p>
      </section>
    </article>
  );
}
