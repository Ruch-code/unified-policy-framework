import { useState, useEffect, Fragment } from 'react';
import { Link } from 'react-router-dom';
import { Clock, RefreshCw, ArrowRight, BookOpen, ExternalLink, Lock, CheckCircle, ChevronDown, ChevronRight, Zap, Shield, Award, Target } from 'lucide-react';

const STORAGE_PREFIX = 'compliance-learning-';

const COLOR_MAP = {
  navy: { bg: 'bg-slate-800', bgLight: 'bg-slate-50', text: 'text-slate-800', border: 'border-slate-200', badge: 'bg-slate-800', ring: 'slate', hex: '#1e293b' },
  purple: { bg: 'bg-violet-600', bgLight: 'bg-violet-50', text: 'text-violet-700', border: 'border-violet-200', badge: 'bg-violet-600', ring: 'violet', hex: '#7c3aed' },
  green: { bg: 'bg-emerald-600', bgLight: 'bg-emerald-50', text: 'text-emerald-700', border: 'border-emerald-200', badge: 'bg-emerald-600', ring: 'emerald', hex: '#059669' },
  beige: { bg: 'bg-amber-700', bgLight: 'bg-amber-50', text: 'text-amber-800', border: 'border-amber-200', badge: 'bg-amber-700', ring: 'amber', hex: '#b45309' },
  golden: { bg: 'bg-yellow-600', bgLight: 'bg-yellow-50', text: 'text-yellow-700', border: 'border-yellow-200', badge: 'bg-yellow-600', ring: 'yellow', hex: '#ca8a04' },
  blue: { bg: 'bg-slate-800', bgLight: 'bg-slate-50', text: 'text-slate-800', border: 'border-slate-200', badge: 'bg-slate-800', ring: 'slate', hex: '#1e293b' },
  orange: { bg: 'bg-amber-700', bgLight: 'bg-amber-50', text: 'text-amber-800', border: 'border-amber-200', badge: 'bg-amber-700', ring: 'amber', hex: '#b45309' }
};

const LEVEL_META = [
  { icon: Shield, label: 'Foundation', desc: 'Learn what controls to look for' },
  { icon: Zap, label: 'Implementer', desc: 'Hands-on implementation guide' },
  { icon: Target, label: 'Verifier', desc: 'How to check and validate' },
  { icon: Award, label: 'Certified', desc: 'Master exam scenarios and edge cases' },
];

function getColors(color) { return COLOR_MAP[color] || COLOR_MAP.navy; }

function normalizeFramework(framework) {
  let raw = framework.weeks;
  if (Array.isArray(raw) && raw.length === 0) raw = framework.weeksData || framework.modules;
  if (!Array.isArray(raw)) raw = framework.weeksData || framework.modules || [];
  const weeks = raw.map((w, idx) => {
    let tasks = Array.isArray(w.tasks) ? w.tasks : [];
    if (Array.isArray(w.days) && w.days.length > 0) {
      tasks = w.days.flatMap(d => (Array.isArray(d.tasks) ? d.tasks : []));
    }
    return {
      ...w,
      week: w.week || idx + 1,
      title: w.title || `Level ${idx + 1}`,
      days: typeof w.days === 'string' ? w.days : w.daysLabel || `Level ${idx + 1}`,
      description: w.description || '',
      tasks
    };
  });
  return { ...framework, weeks };
}

export default function LearningFrameworkPage({ framework }) {
  const data = normalizeFramework(framework);
  const [progress, setProgress] = useState({});
  const [expandedTask, setExpandedTask] = useState(null);
  const storageKey = `${STORAGE_PREFIX}${framework.id}`;

  useEffect(() => {
    try {
      const saved = localStorage.getItem(storageKey);
      if (saved) setProgress(JSON.parse(saved));
    } catch (e) { console.error('Failed to parse progress:', e); }
  }, [storageKey]);

  const colors = getColors(framework.color);
  const totalTasks = data.weeks.reduce((sum, w) => sum + w.tasks.length, 0);
  const completedTasks = Object.values(progress).filter(Boolean).length;
  const progressPercent = totalTasks > 0 ? Math.round((completedTasks / totalTasks) * 100) : 0;

  const weekStats = {};
  data.weeks.forEach(week => {
    let completed = 0;
    week.tasks.forEach((_, i) => {
      if (progress[`w${week.week}-${i}`]) completed++;
    });
    weekStats[week.week] = { completed, total: week.tasks.length, pct: week.tasks.length ? Math.round((completed / week.tasks.length) * 100) : 0 };
  });

  const isWeekUnlocked = (weekIndex) => {
    if (weekIndex === 0) return true;
    const prev = data.weeks[weekIndex - 1];
    return weekStats[prev.week]?.pct >= 80;
  };

  const unlockedLevels = data.weeks.filter((_, i) => isWeekUnlocked(i)).length;

  const handleToggle = (week, index) => {
    const key = `w${week}-${index}`;
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

  const circumference = 2 * Math.PI * 70;

  const currentLevel = Math.min(unlockedLevels - 1, 3);
  const levelName = LEVEL_META[currentLevel]?.label || 'Foundation';
  const LevelIcon = LEVEL_META[currentLevel]?.icon || Shield;

  return (
    <section className="py-8">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="mb-8 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <a href="https://inspiring-ganache-fdd3be.netlify.app/" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 text-sm text-[#7c3aed] hover:text-[#5b21b6] mb-2 transition-colors">
              <ArrowRight className="w-4 h-4" />
              ISO 42001 AI Governance Roadmap
            </a>
            <Link to="/" className="text-sm text-gray-500 hover:text-gray-700 mb-2 inline-block transition-colors">
              ← Back to Home
            </Link>
            <h1 className="text-3xl font-bold text-gray-900 mb-2 flex items-center gap-3 flex-wrap">
              {framework.name}
              {framework.region && (
                <span className={`text-xs font-semibold px-3 py-1 rounded-full inline-flex items-center ${
                  framework.region === 'Global' ? 'bg-gray-200 text-gray-700' :
                  framework.region === 'United States' ? 'bg-blue-100 text-blue-700' :
                  framework.region === 'European Union' ? 'bg-gradient-to-r from-blue-100 to-yellow-100 text-blue-700' :
                  framework.region === 'India' ? 'bg-gradient-to-r from-orange-100 to-green-100 text-orange-700' :
                  framework.region === 'Asia-Pacific' ? 'bg-red-100 text-red-700' :
                  'bg-gray-200 text-gray-700'
                }`}>
                  {framework.region}
                </span>
              )}
            </h1>
            <p className="text-gray-600 text-lg max-w-2xl">
              Compliance playbook — complete each level to unlock the next. Learn the controls, how to implement them, and how to verify.
            </p>
          </div>
          <div className="flex flex-wrap gap-3">
            {framework.referenceUrl && (
              <a href={framework.referenceUrl} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 bg-gray-100 text-gray-700 px-5 py-2.5 rounded-lg hover:bg-gray-200 transition font-medium">
                <ExternalLink className="w-4 h-4" />
                Official Reference
              </a>
            )}
          </div>
        </div>

        {/* Progress Dashboard */}
        <div className={`bg-white rounded-2xl border ${colors.border} p-6 mb-8`}>
          <div className="flex flex-col md:flex-row items-center gap-8">
            {/* Progress Ring */}
            <div className="relative shrink-0">
              <svg width="160" height="160" viewBox="0 0 160 160">
                <circle cx="80" cy="80" r="70" stroke="#e5e7eb" strokeWidth="12" fill="none" />
                <circle cx="80" cy="80" r="70" stroke={colors.hex} strokeWidth="12" fill="none" strokeDasharray={circumference} strokeDashoffset={circumference * (1 - progressPercent / 100)} strokeLinecap="round" transform="rotate(-90 80 80)" style={{ transition: 'stroke-dashoffset 1s ease' }} />
              </svg>
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <span className="text-4xl font-bold text-gray-900">{progressPercent}%</span>
                <span className="text-sm text-gray-500">{completedTasks}/{totalTasks} complete</span>
              </div>
            </div>

            {/* Level Badges */}
            <div className="flex-1 grid grid-cols-2 sm:grid-cols-4 gap-3">
              {data.weeks.map((week, idx) => {
                const unlocked = isWeekUnlocked(idx);
                const Meta = LEVEL_META[idx] || LEVEL_META[0];
                const Icon = Meta.icon;
                return (
                  <div key={week.week} className={`text-center p-3 rounded-xl border transition-all ${unlocked ? colors.bgLight + ' border-current ' + colors.border : 'bg-gray-50 border-gray-200 opacity-50'}`}>
                    <Icon className={`w-6 h-6 mx-auto mb-1 ${unlocked ? colors.text : 'text-gray-400'}`} />
                    <div className={`text-lg font-bold ${unlocked ? colors.text : 'text-gray-400'}`}>
                      {unlocked ? `${weekStats[week.week]?.pct || 0}%` : <Lock className="w-4 h-4 inline" />}
                    </div>
                    <div className={`text-xs font-medium ${unlocked ? colors.text : 'text-gray-400'}`}>Lvl {idx + 1}: {Meta.label}</div>
                  </div>
                );
              })}
            </div>

            <button onClick={resetProgress} className="text-sm text-gray-400 hover:text-red-500 transition underline self-start shrink-0">
              <RefreshCw className="w-4 h-4 inline mr-1" />
              Reset
            </button>
          </div>
        </div>

        {/* Timeline */}
        {data.milestones && data.milestones.length > 0 && (
          <div className={`bg-white rounded-2xl border ${colors.border} p-6 mb-8`}>
            <h2 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-2">
              <Clock className="w-5 h-5" style={{ color: colors.hex }} />
              Implementation Timeline
            </h2>
            <div className="flex items-center justify-between">
              <div className="flex flex-col items-center">
                <div className={`w-10 h-10 rounded-full ${colors.bg} text-white flex items-center justify-center text-sm font-bold shadow-lg ring-4 ring-white`}>D1</div>
                <span className="text-xs text-gray-500 mt-1 font-medium">Start</span>
              </div>
              {data.milestones.map(milestone => (
                <Fragment key={milestone.day}>
                  <div className="flex-1 h-1 bg-gray-200 mx-2"><div className="h-full rounded bg-gray-300" style={{ width: `${Math.min(100, (completedTasks / totalTasks) * 100)}%`, transition: 'width 1s ease' }} /></div>
                  <div className="flex flex-col items-center">
                    <div className="w-12 h-12 rounded-full bg-white border-4 border-gray-300 text-gray-400 flex items-center justify-center text-xs font-bold shadow">{milestone.day}d</div>
                    <span className="text-xs text-gray-500 mt-1 font-medium text-center max-w-[80px]">{milestone.label}</span>
                  </div>
                </Fragment>
              ))}
            </div>
          </div>
        )}

        {/* Level Sections */}
        {data.weeks.map((week, idx) => {
          const unlocked = isWeekUnlocked(idx);
          const Meta = LEVEL_META[idx] || LEVEL_META[0];
          const Icon = Meta.icon;
          const prevComplete = idx > 0 && weekStats[data.weeks[idx - 1].week]?.pct >= 80;
          const justUnlocked = unlocked && idx > 0 && !progress[`seen-level-${week.week}`];

          return (
            <div key={week.week} className={`mb-8 rounded-2xl border overflow-hidden transition-all ${unlocked ? 'bg-white border-gray-200 shadow-sm' : 'bg-gray-50 border-gray-200 opacity-60'}`}>
              {/* Level Header */}
              <div className={`px-6 py-5 flex items-center justify-between ${unlocked ? colors.bg : 'bg-gray-400'}`}>
                <div className="flex items-center gap-3">
                  {unlocked ? (
                    <Icon className="w-6 h-6 text-white" />
                  ) : (
                    <Lock className="w-6 h-6 text-white/60" />
                  )}
                  <div>
                    <h2 className="text-xl font-bold text-white flex items-center gap-2">
                      Level {idx + 1}: {Meta.label}
                      <span className="text-xs font-normal opacity-80 bg-white/20 px-2 py-0.5 rounded-full">{week.title}</span>
                    </h2>
                    <p className="text-sm text-white/80 mt-0.5">{Meta.desc} — {week.description}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className={`text-right px-3 py-1 rounded-full text-sm font-medium ${weekStats[week.week]?.pct >= 80 ? 'bg-white/30 text-white' : 'bg-white/10 text-white/70'}`}>
                    {weekStats[week.week]?.completed || 0}/{week.tasks.length} {weekStats[week.week]?.pct >= 80 ? '✓' : ''}
                  </div>
                </div>
              </div>

              {/* Level Content */}
              {!unlocked && (
                <div className="px-6 py-8 text-center">
                  <Lock className="w-10 h-10 text-gray-300 mx-auto mb-3" />
                  <p className="text-gray-500 text-sm">Complete <strong>{LEVEL_META[idx - 1]?.label || 'previous level'}</strong> ({weekStats[data.weeks[idx - 1]?.week]?.pct || 0}% / 80%) to unlock this level</p>
                </div>
              )}

              {unlocked && justUnlocked && (
                <div className={`px-6 py-3 text-center text-sm font-medium ${colors.bgLight} ${colors.text}`}>
                  🎉 Level {idx + 1} unlocked! Start working through the controls below.
                </div>
              )}

              {unlocked && (
                <div className="divide-y divide-gray-100">
                  {week.tasks.map((task, i) => {
                    const key = `w${week.week}-${i}`;
                    const done = !!progress[key];
                    const isExpanded = expandedTask === key;
                    return (
                      <div key={`${week.week}-${i}`} className={`transition ${done ? 'bg-gray-50/50' : ''}`}>
                        <div className="flex items-start gap-4 px-6 py-4 cursor-pointer hover:bg-gray-50 transition" onClick={() => !done && setExpandedTask(isExpanded ? null : key)}>
                          <input
                            type="checkbox"
                            className={`w-5 h-5 mt-0.5 rounded border-gray-300 focus:ring-2 focus:ring-${colors.ring}-500 text-${colors.ring}-600 shrink-0`}
                            checked={done}
                            onChange={(e) => { e.stopPropagation(); handleToggle(week.week, i); }}
                            onClick={(e) => e.stopPropagation()}
                          />
                          <div className="flex-1 min-w-0">
                            <p className={`font-medium ${done ? 'text-gray-400 line-through' : 'text-gray-900'}`}>
                              {typeof task === 'string' ? task : task.title}
                            </p>
                            {typeof task === 'object' && !done && (
                              <div className="mt-2 space-y-1.5">
                                <TaskDetail label="Control" value={task.control} color={colors.text} />
                                <TaskDetail label="How" value={task.how} color={colors.text} />
                                <TaskDetail label="Check" value={task.check} color={colors.text} />
                              </div>
                            )}
                          </div>
                          {typeof task === 'object' && !done && (
                            <ChevronRight className={`w-4 h-4 shrink-0 text-gray-400 transition-transform mt-1 ${isExpanded ? 'rotate-90' : ''}`} />
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}

              {/* Level Complete Banner */}
              {unlocked && weekStats[week.week]?.pct >= 100 && (
                <div className={`px-6 py-4 text-center text-sm font-medium bg-green-50 text-green-700 border-t border-green-200`}>
                  ✓ Level {idx + 1} complete! {idx < data.weeks.length - 1 ? `Level ${idx + 2} is now unlocked.` : 'All levels complete! You\'re certified!'}
                </div>
              )}
            </div>
          );
        })}

        {/* ISO 42001 Link */}
        <div className={`bg-white rounded-2xl border ${colors.border} p-6 mb-8`}>
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 p-4 bg-gradient-to-r from-[#ede9fe] to-[#fef3c7] rounded-xl">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-[#7c3aed] flex items-center justify-center">
                <BookOpen className="w-6 h-6 text-white" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-gray-900">ISO/IEC 42001:2023 — AI Governance</h3>
                <p className="text-gray-600 text-sm">Extend your compliance expertise to AI governance with the world's first AI management system standard</p>
              </div>
            </div>
            <a href="https://inspiring-ganache-fdd3be.netlify.app/" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 bg-[#7c3aed] text-white px-5 py-2.5 rounded-lg hover:bg-[#6d28d9] transition font-medium whitespace-nowrap">
              <ArrowRight className="w-4 h-4" />
              View ISO 42001 Roadmap
            </a>
          </div>
        </div>

      </div>
    </section>
  );
}

function TaskDetail({ label, value, color }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="text-sm">
      <button onClick={(e) => { e.stopPropagation(); setOpen(!open); }} className={`flex items-center gap-2 font-medium ${color} hover:underline`}>
        <span className={`w-5 h-5 rounded-full text-white text-[10px] flex items-center justify-center font-bold ${label === 'Control' ? 'bg-blue-500' : label === 'How' ? 'bg-purple-500' : 'bg-green-500'}`}>
          {label[0]}
        </span>
        {label}
        <ChevronRight className={`w-3 h-3 transition-transform ${open ? 'rotate-90' : ''}`} />
      </button>
      {open && <p className="text-gray-600 mt-1 ml-7 leading-relaxed">{value}</p>}
    </div>
  );
}
