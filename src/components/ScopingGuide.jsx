import { useState, useEffect } from 'react';
import { ChevronDown, ChevronRight, Copy, FileText, Shield, Building2, Database, Globe, Network, Lock, Users, Briefcase, GraduationCap, ArrowRight, ChevronDown as ChevronDownIcon, ChevronRight as ChevronRightIcon, Zap, Cpu, Smartphone, Layers, Network as NetworkIcon, HardDrive, Cloud, ClipboardCheck, Menu, X, Clock, BookOpen, ExternalLink, Search, RefreshCw } from 'lucide-react';
import { checklistItems, phases, sizeProfiles, scenarios, sizeProfiles as sizeProfilesData } from '../data/iso27001Scoping';
import ScopingIntro from './ScopingIntro';
import ScopeDimensions from './ScopeDimensions';
import InterfacesAndDependencies from './InterfacesAndDependencies';
import ScopeDocStructure from './ScopeDocStructure';
import ScopeStatementTemplate from './ScopeStatementTemplate';
import SizeProfileTabs from './SizeProfileTabs';

const PHASES_ORDER = [
  'P1 Prepare',
  'P2 Context (4.1)',
  'P3 Interested Parties (4.2)',
  'P4 Boundaries & Interfaces (4.3)',
  'P5 Scenario Overrides',
  'P6 Scope Statement',
  'P7 Approve & Communicate',
  'P8 Maintain & Revalidate'
];

const PHASE_COLORS = {
  'P1 Prepare': 'bg-blue-600',
  'P2 Context (4.1)': 'bg-indigo-600',
  'P3 Interested Parties (4.2)': 'bg-purple-600',
  'P4 Boundaries & Interfaces (4.3)': 'bg-emerald-600',
  'P5 Scenario Overrides': 'bg-amber-600',
  'P6 Scope Statement': 'bg-rose-600',
  'P7 Approve & Communicate': 'bg-pink-600',
  'P8 Maintain & Revalidate': 'bg-teal-600'
};

const LINK_CLASS_NAME = 'inline-flex items-center gap-1.5 text-xs font-semibold px-3 py-1.5 rounded-lg border transition bg-indigo-50 dark:bg-indigo-900 text-indigo-700 dark:text-indigo-400 border-indigo-200 dark:border-indigo-800 hover:bg-indigo-100 dark:hover:bg-indigo-900';

function PhaseSection({ phase, items, isDark, progress, handleToggle, expandedTask, setExpandedTask, handleCheckbox, storageKey }) {
  const phaseItems = items.filter(item => item.phase === phase);
  const completed = phaseItems.filter(item => progress[`${phase}-${item.id}`]).length;
  const total = phaseItems.length;
  const pct = total > 0 ? Math.round((completed / total) * 100) : 0;

  const phaseColor = PHASE_COLORS[phase] || 'bg-indigo-600';
  const phaseIndex = PHASES_ORDER.indexOf(phase);
  const isUnlocked = true; // all levels open; old rule: phaseIndex === 0 || progress[`${PHASES_ORDER[phaseIndex - 1]}-complete`] >= 80

  const lockedContainerClass = 'mb-8 rounded-2xl border overflow-hidden bg-gray-50 border-gray-200 opacity-60 dark:bg-slate-800/50 dark:border-slate-700 dark:opacity-90';
  const lockedHeaderClass = 'px-5 sm:px-6 py-5 flex flex-wrap items-center justify-between gap-x-4 gap-y-3 bg-gray-400 dark:bg-gray-700';
  const lockedPhaseBadgeClass = 'text-[11px] sm:text-xs font-medium text-white bg-white/25 ring-1 ring-white/30 px-2.5 py-0.5 rounded-full max-w-full whitespace-normal';
  const lockedLockIconClass = 'w-6 h-6 text-white/70 dark:text-slate-300 shrink-0 mt-0.5';
  const lockedTextClass = 'text-sm text-white/90 mt-0.5';
  const unlockedContainerClass = 'mb-8 rounded-2xl border overflow-hidden transition-all ' + (isUnlocked ? 'bg-white border-gray-200 shadow-sm' : 'bg-gray-50 border-gray-200 opacity-60 dark:bg-slate-800/50 dark:border-slate-700 dark:opacity-90');
  const unlockedHeaderClass = 'px-5 sm:px-6 py-5 flex flex-wrap items-center justify-between gap-x-4 gap-y-3 ' + phaseColor + ' ' + phaseColor.replace('600', '700') + ' text-white';
  const unlockedPhaseTextClass = 'text-sm text-white/90 mt-0.5';
  const progressBadgeClass = 'text-right px-3 py-1 rounded-full text-sm font-medium ' + (pct >= 80 ? 'bg-white/30 text-white' : 'bg-white/10 text-white/70');
  const hoursBadgeClass = 'text-right px-3 py-1 rounded-full text-xs font-medium bg-white/10 text-white/80';

  const lockedContent = (
    <div key={phase} className={lockedContainerClass}>
      <div className={lockedHeaderClass}>
        <div className="flex items-start gap-3 min-w-0 flex-1 basis-[240px]">
          <Lock className={lockedLockIconClass} />
          <div className="min-w-0">
            <h2 className="text-lg sm:text-xl font-bold leading-snug text-white flex flex-wrap items-center gap-x-2 gap-y-1.5">
              {phase}
              <span className={lockedPhaseBadgeClass}>{phase}</span>
            </h2>
            <p className={lockedTextClass}>Complete previous level to unlock</p>
          </div>
        </div>
        <div className="px-6 py-8 text-center">
          <Lock className="w-10 h-10 text-gray-500 mx-auto mb-3 dark:text-slate-300" />
          <p className="text-gray-600 dark:text-slate-300 text-sm">Complete <strong>{PHASES_ORDER[PHASES_ORDER.indexOf(phase) - 1] || 'previous level'}</strong> ({Math.round(progress[`${PHASES_ORDER[phaseIndex - 1]}-complete`] || 0)}% / 80%) to unlock this level</p>
        </div>
      </div>
    </div>
  );

  const unlockedContent = (
    <div key={phase} className={unlockedContainerClass}>
      <div className={unlockedHeaderClass}>
        <div className="flex items-start gap-3 min-w-0 flex-1 basis-[240px]">
          <div className="w-6 h-6 text-white shrink-0 mt-0.5">
            <Shield className="w-6 h-6" />
          </div>
          <div className="min-w-0">
            <h2 className="text-lg sm:text-xl font-bold leading-snug text-white flex flex-wrap items-center gap-x-2 gap-y-1.5">
              Level {PHASES_ORDER.indexOf(phase) + 1}: {phase}
            </h2>
            <p className="text-sm text-white/90 mt-0.5">{phase}</p>
          </div>
          <div className="flex items-center gap-3 pr-16 shrink-0 ml-auto">
            <div className={progressBadgeClass}>
              {completed}/{total} {pct >= 80 ? '✓' : ''}
            </div>
            {phaseItems.length > 0 && (
              <div className={hoursBadgeClass}>
                <Clock className="w-3.5 h-3.5 inline mr-1 -mt-0.5" /> ~{phaseItems.reduce((s, t) => s + (t.hours || 0), 0)}h
              </div>
            )}
          </div>
        </div>

        <div className="divide-y divide-gray-100 dark:divide-slate-700">
          {items.filter(item => item.phase === phase).map((task, i) => {
            const key = `${phase}-${task.id}`;
            const done = !!progress[key];
            const isExpanded = expandedTask === key;
            
            return (
              <div>
                <div key={`${phase}-${task.id}`} className={`transition ${done ? 'bg-gray-50 opacity-50' : ''}`}>
                  <div className="flex items-start gap-4 px-6 py-4 cursor-pointer hover:bg-gray-50 dark:hover:bg-slate-800/60 transition" onClick={() => !done && setExpandedTask(isExpanded ? null : key)}>
                    <input
                      type="checkbox"
                      className={`w-5 h-5 mt-0.5 rounded border-gray-300 dark:border-slate-700 focus:ring-2 focus:ring-indigo-500 text-indigo-600 shrink-0`}
                      checked={done}
                      onChange={(e) => { e.stopPropagation(); handleCheckbox(phase, task.id); }}
                      onClick={(e) => e.stopPropagation()}
                    />
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 flex-wrap">
                        <p className={`font-medium ${done ? 'text-gray-400 line-through' : 'text-gray-900'}`}>
                          {typeof task === 'string' ? task : task.title}
                        </p>
                        {typeof task === 'object' && typeof task.hours === 'number' ? (
                          <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-gray-600 bg-gray-100 px-2 py-0.5 rounded-full">
                            <Clock className="w-3 h-3" /> {task.hours}h
                          </span>
                        ) : null}
                      </div>
                      {typeof task === 'object' && !done ? (
                        <div className="mt-2 space-y-1.5">
                          <div className="flex items-center gap-2">
                            <span className="text-[11px] font-bold text-gray-500 uppercase tracking-wider">Control</span>
                            <span className="text-sm text-gray-700">{task.control}</span>
                          </div>
                          <div className="flex items-start gap-2">
                            <span className="text-[11px] font-bold text-gray-500 uppercase tracking-wide shrink-0">How</span>
                            <p className="text-xs text-gray-600 leading-relaxed">{task.how}</p>
                          </div>
                          <div className="flex items-start gap-2">
                            <span className="text-[11px] font-bold text-gray-500 uppercase tracking-wide shrink-0">Check</span>
                            <p className="text-xs text-gray-600 leading-relaxed">{task.check}</p>
                          </div>
                          {task.citation ? (
                            <div className="flex items-start gap-2 ml-5">
                              <span className="text-[11px] font-bold text-gray-500 uppercase tracking-wider shrink-0">Ref</span>
                              <span className="text-xs text-gray-600">{task.citation}</span>
                            </div>
                          ) : null}
                          {task.links && task.links.length > 0 ? (
                            <div className="flex flex-wrap gap-2 mt-1 ml-5">
                              {task.links.map((link, li) => (
                                <a
                                  key={li}
                                  href={link.href}
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    if (link.href && link.href.startsWith('#')) {
                                      e.preventDefault();
                                      const el = document.getElementById(link.href.slice(1));
                                      if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
                                    }
                                  }}
                                  target={link.href && link.href.startsWith('http') ? '_blank' : undefined}
                                  rel={link.href && link.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                                  className={LINK_CLASS_NAME}
                                >
                                  <BookOpen className="w-3.5 h-3.5" />
                                  {link.label}
                                  {link.href && link.href.startsWith('http') ? <ExternalLink className="w-3 h-3" /> : null}
                                </a>
                              ))}
                            </div>
                          ) : null}
                        </div>
                      ) : null}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );

  return isUnlocked ? unlockedContent : lockedContent;
}

function ScopingGuide({ isDark = false }) {
  const storageKey = 'onelens-iso27001-scoping-v1';
  const [progress, setProgress] = useState({});
  const [expandedTask, setExpandedTask] = useState(null);
  const [activeSize, setActiveSize] = useState('small');
  const [activeScenario, setActiveScenario] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    try {
      const saved = localStorage.getItem(storageKey);
      if (saved) setProgress(JSON.parse(saved));
    } catch (e) { console.error('Failed to parse progress:', e); }
  }, [storageKey]);

  const handleToggle = (phase, index) => {
    const key = `${phase}-${index}`;
    setProgress(prev => {
      const next = { ...prev };
      if (next[key]) { delete next[key]; } else { next[key] = true; }
      try { localStorage.setItem(storageKey, JSON.stringify(next)); } catch (e) { console.error('Failed to save progress:', e); }
      return next;
    });
  };

  const handleCheckbox = (phase, id) => {
    const key = `${phase}-${id}`;
    setProgress(prev => {
      const next = { ...prev };
      if (next[key]) { delete next[key]; } else { next[key] = true; }
      try { localStorage.setItem(storageKey, JSON.stringify(next)); } catch (e) { console.error('Failed to save progress:', e); }
      return next;
    });
  };

  const resetProgress = () => {
    if (window.confirm('Reset all progress? This cannot be undone.')) {
      localStorage.removeItem(storageKey);
      setProgress({});
    }
  };

  const filteredItems = checklistItems.filter(item => {
    const matchesSize = activeSize === 'all' || item.appliesTo.includes(activeSize);
    const matchesScenario = activeScenario === 'all' || item.scenarios?.includes(activeScenario);
    const matchesSearch = !searchQuery || 
      item.task.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.clause.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.id.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesSize && matchesScenario && matchesSearch;
  });

  const phaseStats = {};
  PHASES_ORDER.forEach(phase => {
    const phaseItems = checklistItems.filter(item => item.phase === phase);
    let completed = 0;
    phaseItems.forEach((_, i) => {
      if (progress[`${phase}-${i}`]) completed++;
    });
    phaseStats[phase] = { completed, total: phaseItems.length, pct: phaseItems.length ? Math.round((completed / phaseItems.length) * 100) : 0 };
  });

  const totalTasks = checklistItems.length;
  const completedTasks = Object.values(progress).filter(Boolean).length;
  const progressPercent = totalTasks > 0 ? Math.round((completedTasks / totalTasks) * 100) : 0;

  const searchInputClass = 'w-full pl-10 pr-4 py-2.5 rounded-xl text-sm transition-colors ' + (isDark
    ? 'bg-slate-800 border-slate-700 text-white placeholder-slate-500 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500-[20%]'
    : 'bg-white border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white placeholder-slate-400 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500-[20%]');

  const selectClass = 'px-3 py-2 rounded-lg text-sm font-medium border transition ' + (isDark
    ? 'bg-slate-800 text-slate-200 border-slate-700 focus:border-indigo-500'
    : 'bg-white text-slate-700 border-slate-200 dark:border-slate-700 hover:border-slate-300 dark:hover:border-slate-700 focus:border-indigo-500');

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <div className="flex items-center gap-3 mb-2">
          <a href="/" className="text-sm text-gray-500 hover:text-gray-700 dark:hover:text-slate-200 mb-2 inline-block transition-colors">
            ← Back to Home
          </a>
          <h1 className="text-3xl md:text-4xl font-extrabold text-navy-900 dark:text-text-dark-primary mb-2">
            ISO 27001:2022 ISMS Scoping, Step by Step
          </h1>
          <span className="inline-flex items-center gap-2 px-2.5 py-1 rounded-full text-xs font-semibold uppercase tracking-wider bg-indigo-100 text-indigo-700 dark:bg-indigo-900/30 dark:text-indigo-400">
            <span className="w-[6px] h-6 bg-indigo-600 rounded-full inline-block" />
            Scoping Guide
          </span>
        </div>
        <p className="text-gray-600 dark:text-text-dark-secondary max-w-3xl">
          The Scoping walkthrough is where the SoA is actually shaped. Learn how scoping works under Clause 4.3, 
          then walk the decision tree, then build the SoA.
        </p>
      </div>

      <ScopingIntro isDark={isDark} />
      <ScopeDimensions isDark={isDark} />
      <InterfacesAndDependencies isDark={isDark} />
      <ScopeDocStructure isDark={isDark} />
      <ScopeStatementTemplate isDark={isDark} />
      <SizeProfileTabs isDark={isDark} activeSize={activeSize} onSizeChange={setActiveSize} />

    </div>
  );
}

export default ScopingGuide;
