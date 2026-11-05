import { useEffect, useMemo, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { ChevronRight, Layers } from 'lucide-react';
import { LEVELS, LEVEL_CONTROLS, ANNEX_DOMAINS, OVERVIEW, PARAPHRASE_NOTE } from '../../data/iso42001Levels.js';
import RelatedTemplates from '../templates/RelatedTemplates.jsx';
import { useAuth } from '../../context/AuthContext.jsx';

const TEXT = 'text-gray-700 dark:text-text-dark-secondary';
const HEAD = 'text-gray-900 dark:text-text-dark-primary';
const LINE = 'border-surface-200 dark:border-surface-dark-200';
const FOCUS = 'focus:outline-none focus-visible:ring-2 focus-visible:ring-violet-400';
const INPUT = `rounded-lg border ${LINE} bg-white dark:bg-slate-900 text-gray-900 dark:text-text-dark-primary text-xs px-2 py-2 max-w-full ${FOCUS}`;
const LIST = (t, items) => <div><p className={`font-semibold mb-0.5 ${HEAD}`}>{t}</p><ul className={`list-disc pl-4 space-y-0.5 ${TEXT}`}>{items.map((x) => <li key={x}>{x}</li>)}</ul></div>;

function Card({ k, open, onToggle, user }) {
  return (
    <li id={k.id} className={`scroll-mt-24 rounded-xl border ${LINE}`}>
      <button type="button" aria-expanded={open} onClick={onToggle} className={`w-full flex items-start gap-2 p-3 text-left rounded-xl ${FOCUS}`}>
        <ChevronRight className={`w-4 h-4 mt-0.5 shrink-0 transition-transform ${open ? 'rotate-90' : ''}`} aria-hidden="true" />
        <span className="font-mono text-xs font-bold text-violet-700 dark:text-violet-300 w-16 shrink-0">{k.id}</span>
        <span className={`flex-1 min-w-0 text-sm font-semibold break-words ${HEAD}`}>{k.title}</span>
        <span className={`text-[11px] shrink-0 ${TEXT}`}>{k.type} | {k.level}</span>
      </button>
      {open && (
        <div className="px-3 pb-3 grid gap-3 md:grid-cols-2 text-xs">
          <div><p className={`font-semibold mb-0.5 ${HEAD}`}>Domain</p><p className={TEXT}>{k.domain}</p></div>
          <div><p className={`font-semibold mb-0.5 ${HEAD}`}>Requirement</p><p className={TEXT}>{k.requirement}</p></div>
          <div><p className={`font-semibold mb-0.5 ${HEAD}`}>What good looks like</p><p className={TEXT}>{k.whatGoodLooksLike}</p></div>
          {LIST('Evidence', k.evidence)}{LIST('Test steps', k.testSteps)}{LIST('Common gaps', k.commonGaps)}
          <div><p className={`font-semibold mb-0.5 ${HEAD}`}>Related controls</p><p className={TEXT}>{k.relatedControls.map((r, i) => <span key={r}>{i > 0 && ', '}<a className="underline" href={`#${r}`}>{r}</a></span>)}</p></div>
          <div><p className={`font-semibold mb-0.5 ${HEAD}`}>Templates</p>{k.templates.length === 0 ? <p className={TEXT}>Template coming soon</p> : user ? <RelatedTemplates slugs={k.templates.map((t) => t.slug)} exclusive /> : <p className={TEXT}>Sign in to view templates.</p>}</div>
        </div>
      )}
    </li>
  );
}

export default function Iso42001Levels() {
  const { user } = useAuth() || {};
  const [params, setParams] = useSearchParams();
  const [open, setOpen] = useState(null);
  const level = params.get('level') || 'C4', q = params.get('q') || '', type = params.get('type') || '', domain = params.get('domain') || '';
  const set = (k, v) => { const n = new URLSearchParams(params); if (v) n.set(k, v); else n.delete(k); setParams(n, { replace: true }); };
  useEffect(() => {
    const go = () => {
      const id = decodeURIComponent(window.location.hash.slice(1));
      const c = LEVEL_CONTROLS.find((k) => k.id === id);
      if (!c) return;
      setOpen(id);
      if (c.type === 'Annex A') set('domain', c.domain); else set('level', c.level);
      setTimeout(() => document.getElementById(id)?.scrollIntoView({ block: 'start' }), 50);
    };
    go();
    window.addEventListener('hashchange', go);
    return () => window.removeEventListener('hashchange', go);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const needle = q.toLowerCase();
  const rows = useMemo(() => LEVEL_CONTROLS.filter((k) => (!type || k.type === type) && (!domain || k.domain === domain) && (domain || q || k.level === level) && (!q || `${k.id} ${k.title} ${k.requirement} ${k.evidence.join(' ')} ${k.templates.map((t) => t.name).join(' ')}`.toLowerCase().includes(needle))), [type, domain, level, q, needle]);
  const lv = LEVELS.find((l) => l.id === level) || LEVELS[3];
  const clauses = rows.filter((k) => k.type === 'Clause'), annex = rows.filter((k) => k.type === 'Annex A');
  const count = (id) => LEVEL_CONTROLS.filter((k) => k.level === id).length;
  const list = (items) => <ul className="space-y-2">{items.map((k) => <Card key={k.id} k={k} user={user} open={open === k.id} onToggle={() => setOpen(open === k.id ? null : k.id)} />)}</ul>;
  const orientation = lv.type === 'Orientation' && !q && !domain;
  return (
    <section id="control-levels" className={`scroll-mt-24 rounded-2xl border ${LINE} bg-white dark:bg-slate-900/60 p-4 md:p-8 mb-10`}>
      <h2 className="grc-section-title mb-2"><Layers className="w-6 h-6 text-violet-600" aria-hidden="true" /> ISO/IEC 42001:2023 controls by level</h2>
      <p className={`text-sm ${TEXT}`}>{OVERVIEW}</p>
      <p className={`text-sm font-semibold mt-1 ${HEAD}`}>70 total: 32 clause requirements and 38 Annex A controls.</p>
      <p className={`text-xs mt-1 mb-3 ${TEXT}`}>{PARAPHRASE_NOTE}</p>
      <div role="group" aria-label="Levels" className="flex gap-2 overflow-x-auto pb-2 mb-3">
        {LEVELS.map((l) => <button key={l.id} type="button" aria-pressed={level === l.id && !domain} onClick={() => { const n = new URLSearchParams(params); n.set('level', l.id); n.delete('domain'); setParams(n, { replace: true }); }} className={`shrink-0 px-3 py-1.5 rounded-lg text-xs font-semibold border ${FOCUS} ${level === l.id && !domain ? 'bg-violet-600 text-white border-violet-600' : `${LINE} ${TEXT}`}`}>{l.id}{l.type === 'Auditable' ? ` (${count(l.id)})` : ''}</button>)}
      </div>
      <div className="flex flex-wrap gap-2 mb-3">
        <input aria-label="Search controls" placeholder="Search ID, title, requirement, evidence or template" className={`${INPUT} flex-1 min-w-[12rem]`} value={q} onChange={(e) => set('q', e.target.value)} />
        <select aria-label="Type" className={INPUT} value={type} onChange={(e) => set('type', e.target.value)}><option value="">Type: all</option><option>Clause</option><option>Annex A</option></select>
        <select aria-label="Annex A domain" className={INPUT} value={domain} onChange={(e) => set('domain', e.target.value)}><option value="">Annex A controls: by level</option>{ANNEX_DOMAINS.map((d) => <option key={d}>{d}</option>)}</select>
      </div>
      {orientation ? (
        <div className={`text-sm ${TEXT}`}><h3 className={`font-bold mb-1 ${HEAD}`}>{lv.id} {lv.name}</h3>
          {lv.about && <ul className="list-disc pl-5 space-y-1">{lv.about.map((x) => <li key={x}>{x}</li>)}</ul>}
          {lv.glossary && <dl className="space-y-1">{lv.glossary.map(([t, d]) => <div key={t}><dt className="inline font-semibold">{t}: </dt><dd className="inline">{d}</dd></div>)}</dl>}
          <p className="text-xs mt-2">This level has no auditable controls.</p></div>
      ) : (
        <>
          {!q && !domain && <h3 className={`font-bold text-sm mb-2 ${HEAD}`}>{lv.id} {lv.name}</h3>}
          {list(clauses)}
          {annex.length > 0 && <><h3 className={`font-bold text-sm mt-4 mb-2 ${HEAD}`}>{q || domain ? 'Annex A controls' : 'Related Annex A controls'}</h3>{list(annex)}</>}
          {rows.length === 0 && <p className={`text-sm ${TEXT}`}>No controls match. Try a different search or filter.</p>}
        </>
      )}
    </section>
  );
}
