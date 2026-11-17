// Simple, theme-safe flow diagram: boxes joined by arrows.
// Horizontal on wide screens, vertical on phones, so nothing scrolls sideways.
// steps: [{ label, note?, tone? }] where tone is 'risk' (red border) | 'safe' (green border) | undefined.
// Tone is shown by border only so the boxes read the same in light and dark mode.
const TONE = {
  risk: 'border-2 border-red-500 bg-white dark:bg-gray-900',
  safe: 'border-2 border-emerald-600 bg-white dark:bg-gray-900',
  default: 'border border-gray-300 bg-gray-50 dark:border-gray-600 dark:bg-gray-900',
};

export default function FlowDiagram({ title, steps, caption }) {
  return (
    <figure className="my-4" aria-label={title}>
      {title && <figcaption className="mb-2 text-sm font-semibold text-gray-900 dark:text-white">{title}</figcaption>}
      <ol className="flex flex-col md:flex-row md:flex-wrap md:items-stretch gap-1 md:gap-0">
        {steps.map((s, i) => (
          <li key={s.label} className="flex flex-col md:flex-row items-center">
            <div className={`w-full md:w-36 rounded-lg px-3 py-2 text-center ${TONE[s.tone] || TONE.default}`}>
              <p className="text-sm font-semibold text-gray-900 dark:text-white">{s.label}</p>
              {s.note && <p className="mt-0.5 text-xs text-gray-600 dark:text-gray-300">{s.note}</p>}
            </div>
            {i < steps.length - 1 && <span aria-hidden="true" className="px-1 text-lg leading-6 text-gray-400"><span className="md:hidden">↓</span><span className="hidden md:inline">→</span></span>}
          </li>
        ))}
      </ol>
      {caption && <p className="mt-2 text-xs text-gray-600 dark:text-gray-400">{caption}</p>}
    </figure>
  );
}

const COLS = { 1: '', 2: 'sm:grid-cols-2', 3: 'sm:grid-cols-3' };

// Side-by-side boxes for "this vs that" comparisons. Stacks on phones.
export function CompareDiagram({ title, items, caption }) {
  return (
    <figure className="my-4" aria-label={title}>
      {title && <figcaption className="mb-2 text-sm font-semibold text-gray-900 dark:text-white">{title}</figcaption>}
      <div className={`grid gap-2 ${COLS[Math.min(items.length, 3)]}`}>
        {items.map((it) => (
          <div key={it.label} className={`rounded-lg p-3 ${TONE[it.tone] || TONE.default}`}>
            <p className="text-sm font-semibold text-gray-900 dark:text-white">{it.label}</p>
            <ul className="mt-1 list-disc pl-4 space-y-0.5 text-xs text-gray-700 dark:text-gray-300">{it.points.map((p) => <li key={p}>{p}</li>)}</ul>
          </div>
        ))}
      </div>
      {caption && <p className="mt-2 text-xs text-gray-600 dark:text-gray-400">{caption}</p>}
    </figure>
  );
}
