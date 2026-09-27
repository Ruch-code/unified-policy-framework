import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ChevronDown, Globe2, MapPin } from 'lucide-react';
import WorldMap from './WorldMap.jsx';
import { REGION_GROUPS, REGULATIONS } from '../data/regions.js';
import { useAuth } from '../context/AuthContext.jsx';

function useMediaQuery(minWidth) {
  const [matches, setMatches] = useState(() =>
    typeof window !== 'undefined' ? window.matchMedia(`(min-width: ${minWidth}px)`).matches : true,
  );
  useEffect(() => {
    const mq = window.matchMedia(`(min-width: ${minWidth}px)`);
    const onChange = () => setMatches(mq.matches);
    mq.addEventListener('change', onChange);
    return () => mq.removeEventListener('change', onChange);
  }, [minWidth]);
  return matches;
}

export default function GlobeExplorer({ isDark = false }) {
  const isDesktop = useMediaQuery(768);
  const [collapsed, setCollapsed] = useState(false);
  const { user } = useAuth();
  const navigate = useNavigate();

  const openPlaybook = path => {
    if (!user) {
      navigate('/login', { state: { from: '/' } });
      return;
    }
    navigate(path);
  };

  return (
    <section className="grc-card">
      <header className="flex flex-wrap items-center justify-between gap-3 p-6 pb-0 md:p-8 md:pb-0">
        <h2 className="grc-card-title text-2xl font-bold flex items-center gap-2">
          <span className="w-1.5 h-6 bg-indigo-600 rounded-full inline-block" />
          Explore the Globe
        </h2>
        <button
          type="button"
          onClick={() => setCollapsed(c => !c)}
          aria-expanded={!collapsed}
          aria-controls="globe-explorer-content"
          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold text-gray-600 dark:text-text-dark-secondary bg-slate-100 dark:bg-surface-dark-200 hover:bg-slate-200 dark:hover:bg-surface-dark-300 transition-colors"
        >
          <ChevronDown className={`w-4 h-4 transition-transform ${collapsed ? '' : 'rotate-180'}`} />
          {collapsed ? 'Show map' : 'Collapse'}
        </button>
      </header>

      <p className="grc-card-desc text-sm px-6 md:px-8 mt-2 max-w-2xl">
        {isDesktop
          ? 'Drag to rotate the world, scroll to zoom. Latitudes, longitudes and time zones update live. Hover a country or tap a waving flag to see the privacy & security laws that apply there — then open its playbook.'
          : 'Pick a region to see the privacy & security laws that apply there, then open its playbook.'}
      </p>

      <div id="globe-explorer-content" className="p-6 md:p-8">
        {collapsed ? (
          <div className="flex items-center gap-3 rounded-xl border border-dashed border-surface-300 dark:border-surface-dark-300 px-4 py-6 text-sm text-gray-500 dark:text-text-dark-muted">
            <Globe2 className="w-5 h-5 text-indigo-500 shrink-0" />
            {REGULATIONS.length} regional playbooks available across {REGION_GROUPS.length} regions — collapse restored.
          </div>
        ) : isDesktop ? (
          <WorldMap height={500} dark={isDark} />
        ) : (
          <div className="space-y-6">
            {REGION_GROUPS.map(group => {
              const regs = REGULATIONS.filter(r => r.region === group.region);
              if (!regs.length) return null;
              return (
                <div key={group.region}>
                  <div className="flex items-center gap-2 mb-2.5">
                    <span className="w-3 h-3 rounded-full shrink-0" style={{ background: group.color }} aria-hidden="true" />
                    <h3 className="text-sm font-bold text-navy-900 dark:text-text-dark-primary uppercase tracking-wide">
                      {group.region}
                    </h3>
                    <span className="text-xs text-gray-500 dark:text-text-dark-muted">{regs.length} playbooks</span>
                  </div>
                  <div className="flex flex-wrap gap-2" role="list" aria-label={`${group.region} regulations`}>
                    {regs.map(r => (
                      <button
                        key={r.id}
                        type="button"
                        role="listitem"
                        onClick={() => openPlaybook(r.path)}
                        className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl text-sm font-medium bg-surface-100 dark:bg-surface-dark-100 text-navy-800 dark:text-text-dark-primary border border-surface-300 dark:border-surface-dark-300 hover:border-indigo-500/60 hover:shadow-sm transition-colors text-left"
                      >
                        <MapPin className="w-3.5 h-3.5 shrink-0" style={{ color: r.color }} aria-hidden="true" />
                        {r.name}
                      </button>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </section>
  );
}