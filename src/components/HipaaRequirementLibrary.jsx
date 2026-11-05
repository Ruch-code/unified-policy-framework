import { useEffect, useState } from 'react';
import { ChevronRight, Library } from 'lucide-react';
import { CATEGORIES, HIPAA_REQUIREMENTS as R, RULE_AREAS, OVERVIEW, ADDRESSABLE_NOTE, LEGAL_NOTE, CURRENCY_NOTES } from '../data/hipaaRequirements.js';
import RelatedTemplates from './templates/RelatedTemplates.jsx';
import { useAuth } from '../context/AuthContext.jsx';

const TEXT = 'text-gray-700 dark:text-text-dark-secondary', HEAD = 'text-gray-900 dark:text-text-dark-primary', LINE = 'border-surface-200 dark:border-surface-dark-200', FOCUS = 'focus:outline-none focus-visible:ring-2 focus-visible:ring-violet-400';
const INPUT = `rounded-lg border ${LINE} bg-white dark:bg-slate-900 ${HEAD} text-xs px-2 py-2 max-w-full ${FOCUS}`;
const Block = ({ t, children }) => <div><p className={`font-semibold mb-0.5 ${HEAD}`}>{t}</p><div className={TEXT}>{children}</div></div>;
const Bul = ({ a }) => <ul className="list-disc pl-4 space-y-0.5">{a.map((x) => <li key={x}>{x}</li>)}</ul>;
const slugOf = (name, r) => R.find((x) => x.name === name && x.category === r.category)?.slug;

function Row({ r, open, toggle, user }) {
  return (
    <li id={r.slug} className={`scroll-mt-24 rounded-xl border ${LINE}`}>
      <button type="button" aria-expanded={open} onClick={toggle} className={`w-full flex items-start gap-2 p-3 text-left rounded-xl ${FOCUS}`}>
        <ChevronRight className={`w-4 h-4 mt-0.5 shrink-0 transition-transform ${open ? 'rotate-90' : ''}`} aria-hidden="true" />
        <span className={`flex-1 min-w-0 text-sm font-semibold break-words ${HEAD}`}>{r.name}</span>
        {r.status && <span className="text-[11px] font-semibold text-amber-800 dark:text-amber-200 shrink-0">{r.status}</span>}
        {r.ruleArea === 'Security Rule' && r.specification !== 'Not applicable' && <span className={`text-[11px] shrink-0 ${TEXT}`}>{r.specification}</span>}
      </button>
      {open && <div className="px-3 pb-3 grid gap-3 md:grid-cols-2 text-xs">
        <Block t="Applies to">{r.appliesTo}</Block><Block t="Summary">{r.summary}</Block><Block t="What good looks like">{r.whatGoodLooksLike}</Block>
        <Block t="Evidence"><Bul a={r.evidence} /></Block><Block t="Test steps"><Bul a={r.testSteps} /></Block><Block t="Common gaps"><Bul a={r.commonGaps} /></Block>
        <Block t="Related requirements">{r.relatedRequirements.length ? r.relatedRequirements.map((n, i) => <span key={n}>{i > 0 && ', '}<a className="underline" href={`#${slugOf(n, r)}`}>{n}</a></span>) : 'None'}</Block>
        <Block t="Templates">{!r.templates.length ? 'Template coming soon' : user ? <RelatedTemplates slugs={r.templates} exclusive /> : 'Sign in to view templates.'}</Block>
      </div>}
    </li>
  );
}

export default function HipaaRequirementLibrary() {
  const { user } = useAuth() || {};
  const [area, setArea] = useState(RULE_AREAS[0]);
  const [f, setF] = useState({ q: '', category: '', applies: '', spec: '' });
  const [open, setOpen] = useState(null);
  useEffect(() => {
    const go = () => { const r = R.find((x) => x.slug === window.location.hash.slice(1)); if (!r) return; setArea(r.ruleArea); setF({ q: '', category: '', applies: '', spec: '' }); setOpen(r.slug); setTimeout(() => document.getElementById(r.slug)?.scrollIntoView(), 50); };
    go(); window.addEventListener('hashchange', go); return () => window.removeEventListener('hashchange', go);
  }, []);
  const q = f.q.toLowerCase();
  const rows = R.filter((r) => (q || r.ruleArea === area) && (!f.category || r.category === f.category) && (!f.applies || r.appliesTo === f.applies) && (!f.spec || r.specification === f.spec) && (!q || `${r.name} ${r.category} ${r.summary}`.toLowerCase().includes(q)));
  const cats = [...new Set(rows.map((r) => `${r.ruleArea}|${r.category}`))];
  const sel = (k, label, opts) => <select aria-label={label} className={INPUT} value={f[k]} onChange={(e) => setF({ ...f, [k]: e.target.value })}><option value="">{label}: all</option>{opts.map((o) => <option key={o}>{o}</option>)}</select>;
  return (
    <section id="hipaa-requirements" className="scroll-mt-24 max-w-6xl mx-auto px-4 my-10">
      <div className={`rounded-2xl border ${LINE} bg-white dark:bg-slate-900/60 p-4 md:p-6`}>
        <h2 className="grc-section-title mb-2"><Library className="w-6 h-6 text-violet-600" aria-hidden="true" /> HIPAA requirement library</h2>
        <div className={`text-sm space-y-1 ${TEXT}`}>{OVERVIEW.map((x) => <p key={x}>{x}</p>)}<p>{ADDRESSABLE_NOTE}</p><p>{LEGAL_NOTE}</p></div>
        <div className="my-3 rounded-lg border border-amber-200 dark:border-amber-800 bg-amber-50/60 dark:bg-amber-900/20 p-3 text-xs"><div className={TEXT}><Bul a={CURRENCY_NOTES} /></div></div>
        <div role="group" aria-label="Rule areas" className="flex gap-2 overflow-x-auto pb-2 mb-3">{RULE_AREAS.map((a) => <button key={a} type="button" aria-pressed={area === a} onClick={() => { setArea(a); setF({ ...f, category: '' }); }} className={`shrink-0 px-3 py-1.5 rounded-lg text-xs font-semibold border ${FOCUS} ${area === a ? 'bg-violet-600 text-white border-violet-600' : `${LINE} ${TEXT}`}`}>{a}</button>)}</div>
        <div className="flex flex-wrap gap-2 mb-3">
          <input aria-label="Search requirements" placeholder="Search requirements" className={`${INPUT} flex-1 min-w-[12rem]`} value={f.q} onChange={(e) => setF({ ...f, q: e.target.value })} />
          {sel('category', 'Category', [...new Set(CATEGORIES.filter((c) => c.ruleArea === area).map((c) => c.category))])}{sel('applies', 'Applies to', ['Covered entity', 'Business associate', 'Both'])}{area === 'Security Rule' && sel('spec', 'Specification', ['Required', 'Addressable', 'Not applicable'])}
        </div>
        <div className="space-y-2">{cats.map((key) => { const [ra, c] = key.split('|'); const items = rows.filter((r) => r.ruleArea === ra && r.category === c); return (
          <details key={key} open={!!q || items.some((r) => r.slug === open)} className={`group rounded-xl border ${LINE}`}>
            <summary className={`flex items-center gap-2 p-3 cursor-pointer text-sm font-semibold rounded-xl ${HEAD} ${FOCUS}`}><ChevronRight className="w-4 h-4 shrink-0 transition-transform group-open:rotate-90" aria-hidden="true" /><span className="flex-1 min-w-0">{c}</span><span className="text-xs">{items.length}</span></summary>
            <ul className="px-3 pb-3 space-y-2">{items.map((r) => <Row key={r.slug} r={r} user={user} open={open === r.slug} toggle={() => setOpen(open === r.slug ? null : r.slug)} />)}</ul>
          </details>); })}
          {rows.length === 0 && <p className={`text-sm ${TEXT}`}>No requirements match.</p>}</div>
      </div>
    </section>
  );
}
