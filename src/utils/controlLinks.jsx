import { Link } from 'react-router-dom';

// Turns control references in assistant text into links to the matching OneLens page.
const PATTERN = /\b(CC\s?\d\.\d|A\.\d{1,2}\.\d{1,2}(?:\.\d{1,2})?)\b/g;

export function controlHref(ref) {
  const id = ref.replace(/\s/g, '');
  if (id.startsWith('CC')) return '/soc2#soc2-controls-by-criteria';
  const parts = id.split('.');
  const domain = Number(parts[1]);
  // ISO 42001 Annex A uses A.2 to A.10 and some four-part IDs. ISO 27001 uses A.5 to A.8.
  if (parts.length === 4 || domain < 5 || domain > 8) return `/iso/42001#${id}`;
  return '/iso/27001';
}

export function LinkedText({ text }) {
  const out = [];
  let last = 0;
  for (const m of String(text || '').matchAll(PATTERN)) {
    out.push(text.slice(last, m.index));
    out.push(<Link key={m.index} to={controlHref(m[0])} className="underline decoration-dotted">{m[0]}</Link>);
    last = m.index + m[0].length;
  }
  out.push(text.slice(last));
  return out;
}
