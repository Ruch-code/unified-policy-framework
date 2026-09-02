import { useState, useEffect, Fragment } from 'react';
import { Clock, RefreshCw, ArrowRight, BookOpen, ExternalLink } from 'lucide-react';

const STORAGE_PREFIX = 'compliance-learning-';

const COLOR_MAP = {
  navy: {
    bg: 'bg-slate-800',
    bgLight: 'bg-slate-50',
    text: 'text-slate-800',
    border: 'border-slate-200',
    badge: 'bg-slate-800',
    ring: 'slate',
    hex: '#1e293b',
    gradient: 'from-slate-800 to-slate-900'
  },
  purple: {
    bg: 'bg-violet-600',
    bgLight: 'bg-violet-50',
    text: 'text-violet-700',
    border: 'border-violet-200',
    badge: 'bg-violet-600',
    ring: 'violet',
    hex: '#7c3aed',
    gradient: 'from-violet-600 to-purple-800'
  },
  green: {
    bg: 'bg-emerald-600',
    bgLight: 'bg-emerald-50',
    text: 'text-emerald-700',
    border: 'border-emerald-200',
    badge: 'bg-emerald-600',
    ring: 'emerald',
    hex: '#059669',
    gradient: 'from-emerald-600 to-emerald-800'
  },
  beige: {
    bg: 'bg-amber-700',
    bgLight: 'bg-amber-50',
    text: 'text-amber-800',
    border: 'border-amber-200',
    badge: 'bg-amber-700',
    ring: 'amber',
    hex: '#b45309',
    gradient: 'from-amber-700 to-amber-900'
  },
  golden: {
    bg: 'bg-yellow-600',
    bgLight: 'bg-yellow-50',
    text: 'text-yellow-700',
    border: 'border-yellow-200',
    badge: 'bg-yellow-600',
    ring: 'yellow',
    hex: '#ca8a04',
    gradient: 'from-yellow-600 to-amber-700'
  },
  blue: {
    bg: 'bg-slate-800',
    bgLight: 'bg-slate-50',
    text: 'text-slate-800',
    border: 'border-slate-200',
    badge: 'bg-slate-800',
    ring: 'slate',
    hex: '#1e293b',
    gradient: 'from-slate-800 to-slate-900'
  },
  orange: {
    bg: 'bg-amber-700',
    bgLight: 'bg-amber-50',
    text: 'text-amber-800',
    border: 'border-amber-200',
    badge: 'bg-amber-700',
    ring: 'amber',
    hex: '#b45309',
    gradient: 'from-amber-700 to-amber-900'
  }
};

function getColors(color) {
  return COLOR_MAP[color] || COLOR_MAP.navy;
}

export default function LearningFrameworkPage({ framework }) {
  const [progress, setProgress] = useState({});
  const storageKey = `${STORAGE_PREFIX}${framework.id}`;

  useEffect(() => {
    try {
      const saved = localStorage.getItem(storageKey);
      if (saved) setProgress(JSON.parse(saved));
    } catch (e) {
      console.error('Failed to parse progress:', e);
    }
  }, [storageKey]);

  const colors = getColors(framework.color);
  const totalTasks = framework.weeks.reduce((sum, w) => sum + w.tasks.length, 0);
  const completedTasks = Object.values(progress).filter(Boolean).length;
  const progressPercent = totalTasks > 0 ? Math.round((completedTasks / totalTasks) * 100) : 0;

  const weekStats = {};
  framework.weeks.forEach(week => {
    let completed = 0;
    week.tasks.forEach((_, i) => {
      if (progress[`w${week.week}-${i}`]) completed++;
    });
    weekStats[week.week] = { completed, total: week.tasks.length };
  });

  const handleToggle = (week, index) => {
    const key = `w${week}-${index}`;
    setProgress(prev => {
      const next = { ...prev };
      if (next[key]) {
        delete next[key];
      } else {
        next[key] = true;
      }
      try {
        localStorage.setItem(storageKey, JSON.stringify(next));
      } catch (e) {
        console.error('Failed to save progress:', e);
      }
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
            <h1 className="text-3xl font-bold text-gray-900 mb-2">{framework.name}</h1>
            <p className="text-gray-600 text-lg max-w-2xl">
              Interactive learning roadmap with progress tracking, milestones, and hands-on checklists for new compliance professionals
            </p>
          </div>
          <div className="flex flex-wrap gap-3">
            {framework.referenceUrl && (
              <a
                href={framework.referenceUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-gray-100 text-gray-700 px-5 py-2.5 rounded-lg hover:bg-gray-200 transition font-medium"
              >
                <ExternalLink className="w-4 h-4" />
                Official Reference
              </a>
            )}
          </div>
        </div>

        {/* Progress Overview */}
        <div className={`bg-white rounded-2xl border ${colors.border} p-6 mb-8`}>
          <div className="flex flex-col md:flex-row items-center gap-8">
            {/* Progress Ring */}
            <div className="relative shrink-0">
              <svg width="160" height="160" viewBox="0 0 160 160">
                <circle cx="80" cy="80" r="70" stroke="#e5e7eb" strokeWidth="12" fill="none" />
                <circle
                  cx="80"
                  cy="80"
                  r="70"
                  stroke={colors.hex}
                  strokeWidth="12"
                  fill="none"
                  strokeDasharray={circumference}
                  strokeDashoffset={circumference * (1 - progressPercent / 100)}
                  strokeLinecap="round"
                  transform="rotate(-90 80 80)"
                  style={{ transition: 'stroke-dashoffset 1s ease' }}
                />
              </svg>
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <span className="text-4xl font-bold text-gray-900">{progressPercent}%</span>
                <span className="text-sm text-gray-500">Complete</span>
                <span className="text-xs text-gray-400 mt-1">
                  {completedTasks} / {totalTasks} tasks
                </span>
              </div>
            </div>
            <div className="flex-1 grid grid-cols-2 sm:grid-cols-4 gap-4">
              {framework.weeks.map(week => (
                <div key={week.week} className={`text-center p-3 rounded-xl ${colors.bgLight}`}>
                  <div className={`text-2xl font-bold ${colors.text}`}>
                    {weekStats[week.week]?.completed || 0}/{week.tasks.length}
                  </div>
                  <div className={`text-xs font-medium ${colors.text}`}>Week {week.week}</div>
                </div>
              ))}
            </div>
            <button
              onClick={resetProgress}
              className="text-sm text-gray-400 hover:text-red-500 transition underline self-start shrink-0"
            >
              <RefreshCw className="w-4 h-4 inline mr-1" />
              Reset All Progress
            </button>
          </div>
        </div>

        {/* Visual Timeline */}
        {framework.milestones && framework.milestones.length > 0 && (
          <div className={`bg-white rounded-2xl border ${colors.border} p-6 mb-8`}>
            <h2 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-2">
              <Clock className="w-5 h-5" style={{ color: colors.hex }} />
              Implementation Timeline
            </h2>
            <div className="flex items-center justify-between mb-2">
              <div className="flex flex-col items-center">
                <div className={`w-10 h-10 rounded-full ${colors.bg} text-white flex items-center justify-center text-sm font-bold shadow-lg ring-4 ring-white`}>
                  D1
                </div>
                <span className="text-xs text-gray-500 mt-1 font-medium">Start</span>
              </div>
              {framework.milestones.map(milestone => (
                <Fragment key={milestone.day}>
                  <div className="flex-1 h-1 bg-gray-200 mx-2 relative">
                    <div
                      className="absolute inset-y-0 left-0 rounded transition-all duration-700"
                      style={{ width: '0%', backgroundColor: '#9ca3af' }}
                    />
                  </div>
                  <div className="flex flex-col items-center">
                    <div className="w-12 h-12 rounded-full bg-white border-4 border-gray-300 text-gray-400 flex items-center justify-center text-xs font-bold shadow">
                      {milestone.day}d
                    </div>
                    <span className="text-xs text-gray-500 mt-1 font-medium">{milestone.label}</span>
                  </div>
                </Fragment>
              ))}
            </div>
          </div>
        )}

        {/* Weeks with Checklists */}
        {framework.weeks.map(week => (
          <div key={week.week} className="mb-6 bg-white rounded-2xl border border-gray-200 overflow-hidden">
            <div className={`px-6 py-4 flex items-center justify-between ${colors.bg}`}>
              <div>
                <h2 className="text-xl font-bold text-white">
                  Week {week.week} — {week.title}
                </h2>
                <p className="text-sm text-white/90">
                  {week.days}: {week.description}
                </p>
              </div>
              <span className="px-3 py-1 rounded-full bg-white/20 text-white text-sm font-medium whitespace-nowrap ml-4">
                {weekStats[week.week]?.completed || 0}/{week.tasks.length}
              </span>
            </div>
            <div className="divide-y divide-gray-100">
              {week.tasks.map((task, index) => (
                <label
                  key={`${week.week}-${index}`}
                  className="flex items-start gap-4 p-4 cursor-pointer hover:bg-gray-50 transition"
                >
                  <input
                    type="checkbox"
                    className={`w-5 h-5 mt-0.5 rounded border-gray-300 focus:ring-2 focus:ring-${colors.ring}-500 text-${colors.ring}-600`}
                    checked={!!progress[`w${week.week}-${index}`]}
                    onChange={() => handleToggle(week.week, index)}
                  />
                  <div className="flex-1">
                    <p className={`font-medium ${progress[`w${week.week}-${index}`] ? 'text-gray-400 line-through' : 'text-gray-900'}`}>
                      {task}
                    </p>
                    {week.task_descriptions && week.task_descriptions[index] && (
                      <p className="text-sm text-gray-500 mt-1">{week.task_descriptions[index]}</p>
                    )}
                  </div>
                </label>
              ))}
            </div>
          </div>
        ))}

        {/* ISO 42001 Link Section */}
        <div className={`bg-white rounded-2xl border ${colors.border} p-6 mb-8`}>
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 p-4 bg-gradient-to-r from-[#ede9fe] to-[#fef3c7] rounded-xl">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-[#7c3aed] flex items-center justify-center">
                <BookOpen className="w-6 h-6 text-white" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-gray-900">ISO/IEC 42001:2023 - AI Governance</h3>
                <p className="text-gray-600 text-sm">
                  Extend your compliance expertise to AI governance with the world's first AI management system standard
                </p>
              </div>
            </div>
            <a
              href="https://inspiring-ganache-fdd3be.netlify.app/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-[#7c3aed] text-white px-5 py-2.5 rounded-lg hover:bg-[#6d28d9] transition font-medium whitespace-nowrap"
            >
              <ArrowRight className="w-4 h-4" />
              View ISO 42001 Roadmap
            </a>
          </div>
        </div>

        <footer className="mt-12 pt-8 border-t border-gray-700 text-center">
          <p className="text-gray-400 text-sm">Made by Ruchi Kandpal</p>
        </footer>
      </div>
    </section>
  );
}
