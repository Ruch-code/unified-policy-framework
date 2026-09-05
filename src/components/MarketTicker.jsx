import { useState, useEffect, useCallback } from 'react';
import { TrendingUp, TrendingDown, RefreshCw } from 'lucide-react';

const ORDER = ['SENSEX', 'NIFTY 50', 'NIFTY BANK', 'INDIA VIX'];
const ACCENT = {
  'SENSEX': { color: '#3b82f6' },
  'NIFTY 50': { color: '#22c55e' },
  'NIFTY BANK': { color: '#f59e0b' },
  'INDIA VIX': { color: '#ef4444' },
};

function fmt(v) {
  if (v == null) return '—';
  return v.toLocaleString('en-IN', { maximumFractionDigits: 2 });
}

export default function MarketTicker({ refreshMs = 60000, compact = false }) {
  const [data, setData] = useState(null);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(true);
  const [lastTick, setLastTick] = useState(0);
  const [since, setSince] = useState(null);

  const load = useCallback(async () => {
    try {
      const res = await fetch('/api/market');
      if (!res.ok) throw new Error('bad');
      const j = await res.json();
      setData(j);
      setError(false);
      if (!since) setSince(Date.now());
    } catch {
      setError(true);
    } finally {
      setLoading(false);
    }
  }, [since]);

  useEffect(() => {
    load();
    const id = setInterval(() => {
      setLastTick((t) => t + 1);
      load();
    }, refreshMs);
    return () => clearInterval(id);
  }, [load, refreshMs]);

  const indices = Array.isArray(data?.indices) ? data.indices : data?.indices || {};
  const rows = ORDER.map((name) => indices[name]).filter(Boolean);

  const updElems = (
    <span className="inline-flex items-center gap-1 text-[10px] font-medium text-gray-400 dark:text-slate-400">
      <RefreshCw className={`w-3 h-3 ${loading ? 'animate-spin' : ''}`} />
      auto · {(refreshMs / 1000).toFixed(0)}s
    </span>
  );

  if (compact) {
    return (
      <div className="w-full overflow-hidden">
        <div className="flex items-center gap-2 overflow-x-auto py-1 scrollbar-none">
          {loading && rows.length === 0 && <span className="text-xs text-gray-400">Loading market…</span>}
          {error && rows.length === 0 && <span className="text-xs text-amber-600">Market feed unavailable</span>}
          {rows.length === 0 && !loading && !error && <span className="text-xs text-gray-400">No live data</span>}
          {rows.map((r) => {
            const ac = ACCENT[r.name] || {};
            const up = (r.changePercent ?? 0) >= 0;
            const C = ac.color || (up ? '#22c55e' : '#ef4444');
            return (
              <div
                key={r.name}
                className="flex items-center gap-2 shrink-0 px-3 py-1.5 rounded-lg bg-white dark:bg-slate-800 border border-gray-200 dark:border-slate-700 shadow-sm"
              >
                <span className="text-xs font-semibold text-gray-700 dark:text-slate-200" style={{ color: C }}>
                  {r.name}
                </span>
                <span className="text-xs font-bold text-gray-900 dark:text-white tabular-nums">{fmt(r.last)}</span>
                <span
                  className={`inline-flex items-center gap-0.5 text-[11px] font-semibold tabular-nums ${up ? 'text-emerald-600 dark:text-emerald-400' : 'text-red-600 dark:text-red-400'}`}
                >
                  {up ? <TrendingUp className="w-3 h-3" /> : <TrendingDown className="w-3 h-3" />}
                  {r.changePercent == null ? '—' : `${r.changePercent >= 0 ? '+' : ''}${r.changePercent.toFixed(2)}%`}
                </span>
              </div>
            );
          })}
        </div>
      </div>
    );
  }

  return (
    <div className="w-full rounded-2xl border border-gray-200 dark:border-slate-700 bg-white dark:bg-slate-800/70 shadow-sm overflow-hidden">
      <div className="flex items-center justify-between px-4 py-2 border-b border-gray-100 dark:border-slate-700">
        <div className="flex items-center gap-2">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
            <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
          </span>
          <span className="text-xs font-bold tracking-wide text-gray-700 dark:text-slate-200 uppercase">
            Indian Market Live
          </span>
        </div>
        {updElems}
      </div>
      <div className="grid grid-cols-2 md:grid-cols-4 divide-x divide-y md:divide-y-0 divide-gray-100 dark:divide-slate-700">
        {loading && rows.length === 0 && (
          <div className="col-span-full py-8 text-center text-sm text-gray-400 dark:text-slate-400">Loading live indices…</div>
        )}
        {error && rows.length === 0 && (
          <div className="col-span-full py-8 text-center text-sm text-amber-600 dark:text-amber-400">
            Market feed temporarily unavailable.
          </div>
        )}
        {rows.map((r) => {
          const ac = ACCENT[r.name] || {};
          const up = (r.changePercent ?? 0) >= 0;
          const C = ac.color || (up ? '#22c55e' : '#ef4444');
          return (
            <div key={r.name} className="px-4 py-3">
              <div className="text-[11px] font-semibold uppercase tracking-wide text-gray-400 dark:text-slate-400">
                {r.name}
              </div>
              <div className="mt-0.5 text-lg font-bold text-gray-900 dark:text-white tabular-nums">
                {fmt(r.last)}
              </div>
              <div
                className={`mt-0.5 inline-flex items-center gap-1 text-xs font-semibold tabular-nums ${up ? 'text-emerald-600 dark:text-emerald-400' : 'text-red-600 dark:text-red-400'}`}
              >
                {up ? <TrendingUp className="w-3.5 h-3.5" /> : <TrendingDown className="w-3.5 h-3.5" />}
                {r.change != null ? `${r.change >= 0 ? '+' : ''}${r.change.toFixed(2)}` : '—'}
                <span className="opacity-80">({r.changePercent == null ? '—' : `${r.changePercent >= 0 ? '+' : ''}${r.changePercent.toFixed(2)}%`})</span>
              </div>
              <div className="mt-0.5 h-1 w-full rounded-full bg-gray-100 dark:bg-slate-700 overflow-hidden">
                <div className="h-full rounded-full" style={{ width: '35%', background: C, opacity: 0.8 }} />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
