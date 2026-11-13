import { useEffect, useState } from 'react';

// Builds a "Jump to section" list from the h2/h3 headings inside a container, so long pages are easy to scan.
const slug = (t) => t.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '').slice(0, 60);

export default function OnThisPage({ containerRef, watch, scope }) {
  const [items, setItems] = useState([]);

  useEffect(() => {
    const root = scope ? document.querySelector(scope) : containerRef?.current;
    if (!root) return undefined;
    let timer;
    const scan = () => {
      const seen = new Set();
      const found = [...root.querySelectorAll('h2, h3')]
        .filter((h) => h.offsetParent !== null && h.textContent.trim())
        .slice(0, 40)
        .map((h) => {
          if (!h.id) {
            let id = `sec-${slug(h.textContent)}`;
            while (seen.has(id) || (document.getElementById(id) && document.getElementById(id) !== h)) id += '-x';
            h.id = id;
          }
          seen.add(h.id);
          h.style.scrollMarginTop = '5rem';
          return { id: h.id, text: h.textContent.trim(), level: h.tagName === 'H3' ? 3 : 2 };
        });
      setItems((prev) => (JSON.stringify(prev) === JSON.stringify(found) ? prev : found));
    };
    scan();
    const obs = new MutationObserver(() => { clearTimeout(timer); timer = setTimeout(scan, 150); });
    obs.observe(root, { childList: true, subtree: true });
    return () => { obs.disconnect(); clearTimeout(timer); };
  }, [containerRef, watch, scope]);

  if (items.length < 3) return null;
  return (
    <details className="mb-5 rounded border border-gray-200 dark:border-slate-700 bg-white dark:bg-slate-900">
      <summary className="cursor-pointer px-3 py-2 text-sm font-semibold text-gray-900 dark:text-white">Jump to a section ({items.length})</summary>
      <ol className="px-3 pb-3 columns-1 md:columns-2 gap-6 text-sm">
        {items.map((it) => (
          <li key={it.id} className={`break-inside-avoid py-0.5 ${it.level === 3 ? 'pl-4' : ''}`}>
            <a href={`#${it.id}`} onClick={(e) => { e.preventDefault(); document.getElementById(it.id)?.scrollIntoView({ behavior: 'smooth', block: 'start' }); }}
              className="text-gray-700 hover:underline dark:text-slate-300">{it.text}</a>
          </li>
        ))}
      </ol>
    </details>
  );
}
