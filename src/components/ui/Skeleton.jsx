// Placeholder blocks shown while content loads, so the layout does not jump.
export function SkeletonLine({ className = '' }) {
  return <span aria-hidden="true" className={`block h-3 rounded-sm bg-stone-200 dark:bg-slate-700 animate-pulse ${className}`} />;
}

export default function Skeleton({ lines = 3, label = 'Loading', className = '' }) {
  const widths = ['w-3/4', 'w-full', 'w-5/6', 'w-2/3', 'w-1/2'];
  return (
    <div role="status" aria-live="polite" className={`space-y-2.5 py-2 ${className}`}>
      <span className="sr-only">{label}</span>
      <SkeletonLine className="h-4 w-1/3" />
      {Array.from({ length: lines }, (_, i) => <SkeletonLine key={i} className={widths[i % widths.length]} />)}
    </div>
  );
}
