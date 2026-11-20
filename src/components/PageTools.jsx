import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';

// Site-wide helpers for long pages: collapse or expand every collapsible section at once, jump back to the top,
// and open any collapsed section that contains the target of a #link so anchor links always land on visible content.
export default function PageTools() {
  const { pathname, search, hash } = useLocation();
  const [count, setCount] = useState(0);
  const [long, setLong] = useState(false);

  useEffect(() => {
    const main = document.querySelector('main');
    if (!main) return undefined;
    const measure = () => {
      setCount(main.querySelectorAll('details').length);
      setLong(main.scrollHeight > window.innerHeight * 2.5);
    };
    measure();
    const mo = new MutationObserver(() => measure());
    mo.observe(main, { childList: true, subtree: true });
    return () => mo.disconnect();
  }, [pathname, search]);

  useEffect(() => {
    const openTarget = () => {
      const id = decodeURIComponent((window.location.hash || '').slice(1));
      if (!id) return;
      const el = document.getElementById(id);
      if (!el) return;
      let node = el;
      while (node) { if (node.tagName === 'DETAILS') node.open = true; node = node.parentElement; }
      setTimeout(() => el.scrollIntoView({ block: 'start' }), 50);
    };
    const t = setTimeout(openTarget, 150);
    window.addEventListener('hashchange', openTarget);
    return () => { clearTimeout(t); window.removeEventListener('hashchange', openTarget); };
  }, [pathname, hash]);

  const setAll = (open) => document.querySelectorAll('main details').forEach((d) => { d.open = open; });

  if (count < 2 && !long) return null;
  const btn = 'px-2.5 py-1.5 text-xs font-semibold text-gray-800 dark:text-slate-100 hover:bg-gray-100 dark:hover:bg-slate-700';
  return (
    <div className="fixed bottom-5 left-4 z-40 flex rounded border border-gray-300 dark:border-slate-600 bg-white dark:bg-slate-800 shadow-sm divide-x divide-gray-300 dark:divide-slate-600 print:hidden" role="toolbar" aria-label="Page sections">
      {count >= 2 && <button type="button" className={btn} onClick={() => setAll(false)}>Collapse all</button>}
      {count >= 2 && <button type="button" className={btn} onClick={() => setAll(true)}>Expand all</button>}
      {long && <button type="button" className={btn} onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} aria-label="Back to top">Top</button>}
    </div>
  );
}
