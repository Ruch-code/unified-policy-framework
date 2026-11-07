import { DOMAIN_BY_CODE, domainTokenCss } from '../../data/controlDomains.js';

// Inject the domain colour tokens once per page load.
if (typeof document !== 'undefined' && !document.getElementById('domain-tokens')) {
  const el = document.createElement('style');
  el.id = 'domain-tokens';
  el.textContent = domainTokenCss();
  document.head.appendChild(el);
}

export const pillStyle = (code) => ({
  backgroundColor: `var(--dom-${code}-bg)`,
  color: `var(--dom-${code}-fg)`,
  borderColor: `var(--dom-${code}-bd)`,
});

/** Bold, coloured domain label. The text is always shown; colour is never the only signal. */
export default function DomainPill({ code, controls = [], guessed = false, size = 'sm' }) {
  const d = DOMAIN_BY_CODE[code];
  if (!d) return null;
  const detail = controls.length ? `: ${controls.map((c) => `${c.id} ${c.name}`).join('; ')}` : '';
  const title = `${d.name} (${d.code})${guessed ? ', assigned by topic' : ''}${detail}`;
  return (
    <span title={title} tabIndex={0} aria-label={title}
      className={`inline-flex items-center gap-1 rounded-full border font-bold leading-tight focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-1 focus-visible:ring-sky-500 ${size === 'xs' ? 'text-[10px] px-1.5 py-0.5' : 'text-[11px] px-2 py-0.5'}`}
      style={pillStyle(code)}>
      <span>{d.name}</span>
      <span className="font-mono font-semibold opacity-80 text-[9px]" aria-hidden="true">{d.code}</span>
      {guessed && <span aria-hidden="true" className="font-normal opacity-80">*</span>}
    </span>
  );
}

/** Up to `max` pills, then "+N". */
export function DomainPills({ domains = [], guessed = false, max = 2 }) {
  if (!domains.length) return null;
  const shown = domains.slice(0, max);
  const rest = domains.slice(max);
  return (
    <span className="inline-flex flex-wrap items-center gap-1">
      {shown.map((d) => <DomainPill key={d.code} code={d.code} controls={d.controls} guessed={guessed} />)}
      {rest.length > 0 && (
        <span className="text-[11px] font-semibold text-gray-600 dark:text-slate-300" title={rest.map((d) => DOMAIN_BY_CODE[d.code]?.name).join(', ')}>+{rest.length}</span>
      )}
    </span>
  );
}

export function SafeguardTag({ category }) {
  return <span className="inline-flex items-center rounded-full border border-gray-400 dark:border-slate-500 px-2 py-0.5 text-[10px] font-semibold text-gray-700 dark:text-slate-200">{category}</span>;
}
