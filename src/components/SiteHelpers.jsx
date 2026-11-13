import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';

// Scrolls to a URL hash target (card or section), opens any collapsed parent and highlights it briefly.
export function revealTarget(id) {
  if (!id) return false;
  const el = document.getElementById(decodeURIComponent(id));
  if (!el) return false;
  let p = el.parentElement;
  while (p) { if (p.tagName === 'DETAILS') p.open = true; p = p.parentElement; }
  if (el.tagName === 'DETAILS') el.open = true;
  const reduce = window.matchMedia?.('(prefers-reduced-motion: reduce)').matches;
  el.scrollIntoView({ behavior: reduce ? 'auto' : 'smooth', block: 'start' });
  el.classList.add('target-flash');
  setTimeout(() => el.classList.remove('target-flash'), 1800);
  return true;
}

export default function SiteHelpers() {
  const { hash, pathname, search } = useLocation();
  const [showTop, setShowTop] = useState(false);

  useEffect(() => {
    if (!hash || hash.length < 2) return undefined;
    const id = hash.slice(1);
    let tries = 0;
    const t = setInterval(() => { if (revealTarget(id) || ++tries > 25) clearInterval(t); }, 120);
    return () => clearInterval(t);
  }, [hash, pathname, search]);

  useEffect(() => {
    const onScroll = () => setShowTop(window.scrollY > 800);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  if (!showTop) return null;
  return (
    <button type="button" onClick={() => window.scrollTo({ top: 0, behavior: window.matchMedia?.('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth' })}
      className="no-print fixed bottom-20 right-4 z-40 px-3 py-2 rounded border border-gray-300 dark:border-slate-600 bg-white dark:bg-slate-900 text-xs font-semibold text-gray-900 dark:text-white"
      aria-label="Back to top">
      Back to top
    </button>
  );
}
