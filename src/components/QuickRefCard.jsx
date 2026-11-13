import { useState } from 'react';
import { Link } from 'react-router-dom';

const H = 'text-gray-900 dark:text-white';
const TXT = 'text-gray-700 dark:text-slate-300';
const LINE = 'border-gray-200 dark:border-slate-700';

// Where each mapping chip leads.
const chipHref = (fw) => (fw === 'GDPR' ? '/gdpr' : '/cheat-sheets#soc2-iso');

async function copyText(text) {
  try { await navigator.clipboard.writeText(text); return true; } catch { return false; }
}

// Fixed quick-reference layout: title, what it is, key facts, evidence, maps-to chips, source, verified, copy, more detail.
export default function QuickRefCard({ id, breadcrumb = [], title, what, facts = [], evidence, maps = {}, source, verified, isNew, children }) {
  const [copied, setCopied] = useState('');
  const flash = (k) => { setCopied(k); setTimeout(() => setCopied(''), 1500); };
  const plain = `${title}\n${what}\n${facts.map((f) => `- ${f}`).join('\n')}${evidence ? `\nEvidence: ${evidence}` : ''}${source ? `\nSource: ${source.label} ${source.url}` : ''}`;

  return (
    <article id={id} className={`bg-white dark:bg-[#1e293b] border ${LINE} rounded p-4 scroll-mt-24`} aria-labelledby={`${id}-title`}>
      {breadcrumb.length > 0 && <p className="text-[11px] text-gray-500 dark:text-slate-400">{breadcrumb.join(' > ')}</p>}
      <div className="mt-1 flex items-start justify-between gap-2">
        <h4 id={`${id}-title`} className={`font-bold ${H}`}>
          {title}
          {isNew && <span className="inline-block align-middle ml-2 px-1.5 py-0.5 rounded text-[10px] font-semibold uppercase bg-[#344c67] text-white">New</span>}
        </h4>
        <div className="flex gap-1 shrink-0">
          <button type="button" onClick={async () => { if (await copyText(`${window.location.origin}${window.location.pathname}${window.location.search}#${id}`)) flash('link'); }} className={`px-2 py-0.5 border ${LINE} rounded text-[11px] ${H}`} aria-label={`Copy link to ${title}`}>{copied === 'link' ? 'Copied' : 'Copy link'}</button>
          <button type="button" onClick={async () => { if (await copyText(plain)) flash('facts'); }} className={`px-2 py-0.5 border ${LINE} rounded text-[11px] ${H}`} aria-label={`Copy key facts for ${title}`}>{copied === 'facts' ? 'Copied' : 'Copy'}</button>
        </div>
      </div>
      <p className={`mt-1 text-sm ${TXT}`}>{what}</p>

      <div className={`mt-3 border ${LINE} rounded p-3 bg-gray-50 dark:bg-slate-800`}>
        <p className={`text-xs font-semibold uppercase tracking-wide ${H}`}>Key facts</p>
        <ul className={`mt-1 list-disc pl-5 space-y-0.5 text-sm ${TXT}`}>{facts.map((f) => <li key={f}>{f}</li>)}</ul>
      </div>

      {evidence && <p className={`mt-3 text-sm ${TXT}`}><span className={`font-semibold ${H}`}>What auditors ask for: </span>{evidence}</p>}

      {Object.keys(maps).length > 0 && (
        <div className="mt-3">
          <p className={`text-xs font-semibold ${H}`}>Maps to</p>
          <ul className="mt-1 flex flex-wrap gap-1.5" aria-label={`${title} mappings`}>
            {Object.entries(maps).flatMap(([fw, ids]) => ids.map((c) => (
              <li key={`${fw}-${c}`}>
                <Link to={chipHref(fw)} aria-label={`${fw} ${c}`} className={`inline-block px-2 py-0.5 border ${LINE} rounded text-xs ${TXT}`}>{fw} {c}</Link>
              </li>
            )))}
          </ul>
        </div>
      )}

      <p className="mt-3 text-[11px] text-gray-500 dark:text-slate-400">
        {source && <>Source: <a className="underline" href={source.url} target="_blank" rel="noopener noreferrer">{source.label}</a> · </>}
        Last verified: {verified}
      </p>

      {children && (
        <details className="mt-2">
          <summary className={`cursor-pointer text-sm font-semibold ${H}`}>More detail</summary>
          <div className={`mt-2 text-sm ${TXT}`}>{children}</div>
        </details>
      )}
    </article>
  );
}
