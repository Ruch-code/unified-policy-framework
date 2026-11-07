import { Link, useParams } from 'react-router-dom';
import { CONTROLS, DOMAIN_BY_CODE, FRAMEWORK_ORDER, HELP_TEXT, VISIBLE_DOMAINS, hipaaSafeguard } from '../data/controlDomains.js';
import DomainPill, { SafeguardTag } from '../components/domains/DomainPill.jsx';

const FW_PATH = { 'SOC 2': '/soc2', HIPAA: '/hipaa', 'ISO 27001': '/iso/27001/li', 'ISO 42001': '/iso/42001' };

export default function DomainPage() {
  const { code = '' } = useParams();
  const d = DOMAIN_BY_CODE[code.toUpperCase()];
  if (!d) {
    return (
      <div className="container mx-auto px-4 py-10">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Control domains</h1>
        <ul className="flex flex-wrap gap-2">{VISIBLE_DOMAINS.map((x) => <li key={x.code}><Link to={`/domains/${x.code}`}><DomainPill code={x.code} /></Link></li>)}</ul>
      </div>
    );
  }
  const cs = CONTROLS.filter((c) => c.domain === d.code || (c.related || []).includes(d.code));
  return (
    <div className="container mx-auto px-4 py-10">
      <p className="text-sm mb-2"><Link to="/domains" className="underline text-sky-700 dark:text-sky-300">All domains</Link></p>
      <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white mb-2 flex flex-wrap items-center gap-3">{d.name} <DomainPill code={d.code} /></h1>
      <p className="text-sm text-gray-600 dark:text-slate-300 mb-6 max-w-3xl">{cs.length} controls across frameworks. {HELP_TEXT}</p>
      {FRAMEWORK_ORDER.map((f) => {
        const list = cs.filter((c) => c.framework === f);
        if (!list.length) return null;
        return (
          <section key={f} className="mb-8">
            <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
              {FW_PATH[f] ? <Link to={`${FW_PATH[f]}?domains=${d.code}`} className="hover:underline">{f}</Link> : f} <span className="text-sm font-normal text-gray-500 dark:text-slate-400">({list.length})</span>
            </h2>
            <div className="overflow-x-auto rounded-xl border border-gray-200 dark:border-slate-700">
              <table className="w-full text-sm min-w-[520px]">
                <thead className="bg-gray-50 dark:bg-slate-800"><tr>
                  <th scope="col" className="text-left p-2 text-gray-900 dark:text-white">Control</th>
                  <th scope="col" className="text-left p-2 text-gray-900 dark:text-white">Name</th>
                  <th scope="col" className="text-left p-2 text-gray-900 dark:text-white">Primary citation</th>
                  {f === 'HIPAA' && <th scope="col" className="text-left p-2 text-gray-900 dark:text-white">Safeguard</th>}
                </tr></thead>
                <tbody>{list.map((c) => (
                  <tr key={c.id} className="border-t border-gray-200 dark:border-slate-700 align-top">
                    <td className="p-2 font-mono text-xs text-gray-800 dark:text-slate-200">{c.id}{c.domain !== d.code ? ` (listed under ${DOMAIN_BY_CODE[c.domain].name})` : ''}</td>
                    <td className="p-2 text-gray-900 dark:text-white">{c.name}</td>
                    <td className="p-2 text-gray-700 dark:text-slate-300">{c.citation || 'No citation'}{c.moreMappings ? ` (+${c.moreMappings} more)` : ''}</td>
                    {f === 'HIPAA' && <td className="p-2">{hipaaSafeguard(c.citation) && <SafeguardTag category={hipaaSafeguard(c.citation)} />}</td>}
                  </tr>
                ))}</tbody>
              </table>
            </div>
          </section>
        );
      })}
    </div>
  );
}
