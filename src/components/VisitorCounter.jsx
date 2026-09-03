import { useEffect, useState } from 'react';
import { Eye } from 'lucide-react';

export default function VisitorCounter() {
  const [total, setTotal] = useState(null);

  useEffect(() => {
    let cancelled = false;
    fetch('/api/visit')
      .then(r => r.json())
      .then(d => {
        if (!cancelled) setTotal(d.total);
      })
      .catch(() => {});
    return () => { cancelled = true; };
  }, []);

  return (
    <div className="inline-flex items-center gap-2 text-sm text-gray-400 mt-4">
      <Eye className="w-4 h-4 text-indigo-400" />
      <span>
        {total === null ? (
          'Counting visitors…'
        ) : (
          <>
            <span className="font-bold text-white tabular-nums">{total.toLocaleString()}</span> visits
          </>
        )}
      </span>
    </div>
  );
}
