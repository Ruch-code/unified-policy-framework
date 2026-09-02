import { useState, useEffect } from 'react';
import { 
  CheckCircle2, 
  Download, 
  Clock, 
  Target, 
  BookOpen, 
  Link2, 
  ArrowRight,
  CheckSquare,
  Calendar,
  TrendingUp,
  Award,
  ExternalLink,
  RefreshCw,
  BarChart3,
  FileText,
  Check
} from 'lucide-react';
import { Link } from 'react-router-dom';

const STORAGE_PREFIX = 'compliance-learning-';

export default function LearningFrameworkPage({ framework }) {
  const [progress, setProgress] = useState({});
  const [showProgressModal, setShowProgressModal] = useState(false);
  const [activeWeek, setActiveWeek] = useState(null);

  // Initialize progress from localStorage
  useEffect(() => {
    const saved = localStorage.getItem(`${STORAGE_PREFIX}${framework.id}`);
    if (saved) {
      try {
        setProgress(JSON.parse(saved));
      } catch (e) {
        console.error('Failed to parse progress:', e);
      }
    }
  }, [framework.id]);

  // Calculate progress statistics
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
  };

  const handleToggle = (week, index) => {
    const key = `w${week}-${index}`;
    setProgress(prev => {
      const newProgress = { ...prev };
      if (newProgress[`w${week}-${index}`]) {
        delete newProgress[`w${week}-${index}`];
      } else {
        newProgress[`w${week}-${index}`] = true;
      }
      localStorage.setItem(`${STORAGE_PREFIX}${framework.id}`, JSON.stringify(newProgress));
      return newProgress;
    });
  };

  const resetProgress = () => {
    if (window.confirm('Reset all progress? This cannot be undone.')) {
      localStorage.removeItem(`${STORAGE_PREFIX}${framework.id}`);
      setProgress({});
    }
  };

  const getColorClasses = (color) => {
    const colors = {
      navy: { 
        bg: 'bg-navy-600', 
        bgLight: 'bg-navy-50', 
        text: 'text-navy-600', 
        border: 'border-navy-200', 
        badge: 'bg-navy-600', 
        ring: 'navy',
        gradient: 'from-navy-600 to-navy-800'
      },
      purple: { 
        bg: 'bg-purple-600', 
        bgLight: 'bg-purple-50', 
        text: 'text-purple-600', 
        border: 'border-purple-200', 
        badge: 'bg-purple-600', 
        ring: 'purple',
        gradient: 'from-purple-600 to-purple-800'
      },
      green: { 
        bg: 'bg-emerald-600', 
        bgLight: 'bg-emerald-50', 
        text: 'text-emerald-600', 
        border: 'border-emerald-200', 
        badge: 'bg-emerald-600', 
        ring: 'emerald',
        gradient: 'from-emerald-600 to-emerald-800'
      },
      beige: { 
        bg: 'bg-amber-700', 
        bgLight: 'bg-amber-50', 
        text: 'text-amber-700', 
        border: 'border-amber-200', 
        badge: 'bg-amber-700', 
        ring: 'amber',
        gradient: 'from-amber-700 to-amber-900'
      },
      golden: { 
        bg: 'bg-yellow-600', 
        bgLight: 'bg-yellow-50', 
        text: 'text-yellow-600', 
        border: 'border-yellow-200', 
        badge: 'bg-yellow-600', 
        ring: 'yellow',
        gradient: 'from-yellow-600 to-amber-700'
      },
      navy: { 
        bg: 'bg-slate-800', 
        bgLight: 'bg-slate-50', 
        text: 'text-slate-700', 
        border: 'border-slate-200', 
        badge: 'bg-slate-800', 
        ring: 'slate',
        gradient: 'from-slate-800 to-slate-900'
      },
      purple: { 
        bg: 'bg-violet-600', 
        bgLight: 'bg-violet-50', 
        text: 'text-violet-600', 
        border: 'border-violet-200', 
        badge: 'bg-violet-600', 
        ring: 'violet',
        gradient: 'from-violet-600 to-purple-800'
      },
      green: { 
        bg: 'bg-teal-600', 
        bgLight: 'bg-teal-50', 
        text: 'text-teal-600', 
        border: 'border-teal-200', 
        badge: 'bg-teal-600', 
        ring: 'teal',
        gradient: 'from-teal-600 to-emerald-800'
      },
      beige: { 
        bg: 'bg-stone-700', 
        bgLight: 'bg-stone-50', 
        text: 'text-stone-700', 
        border: 'border-stone-200', 
        badge: 'bg-stone-700', 
        ring: 'stone',
        gradient: 'from-stone-700 to-stone-900'
      },
      golden: { 
        bg: 'bg-amber-600', 
        bgLight: 'bg-amber-50', 
        text: 'text-amber-600', 
        border: 'border-amber-200', 
        badge: 'bg-amber-600', 
        ring: 'amber',
        gradient: 'from-amber-600 to-yellow-700'
      },
    };
    return colors[color] || colors.navy;
  };

  const colors = getColorClasses(framework.color);

  // Calculate week stats
  const weekStats = {};
  framework.weeks.forEach(week => {
    let completed = 0;
    week.tasks.forEach((_, i) => {
      if (progress[`w${week.week}-${i}`]) completed++;
    });
    weekStats[week.week] = { completed, total: week.tasks.length };
  }

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
  };

  const handleToggle = (week, index) => {
    const key = `w${week}-${index}`;
    setProgress(prev => {
      const newProgress = { ...prev };
      if (newProgress[`w${week}-${index}`]) {
        delete newProgress[`w${week}-${index}`];
      } else {
        newProgress[`w${week}-${index}`] = true;
      }
      localStorage.setItem(`compliance-learning-${framework.id}`, JSON.stringify(newProgress));
      return newProgress;
    });
  };

  const resetProgress = () => {
    if (window.confirm('Reset all progress? This cannot be undone.')) {
      localStorage.removeItem(`compliance-learning-${framework.id}`);
      setProgress({});
    }
  };

  const colors = {
    navy: { 
      bg: 'bg-slate-800', 
      bgLight: 'bg-slate-50', 
      text: 'text-slate-700', 
      border: 'border-slate-200', 
      badge: 'bg-slate-800', 
      ring: 'slate',
      gradient: 'from-slate-800 to-slate-900'
    },
    purple: { 
      bg: 'bg-violet-600', 
      bgLight: 'bg-violet-50', 
      text: 'text-violet-600', 
      border: 'border-violet-200', 
      badge: 'bg-violet-600', 
      ring: 'violet',
      gradient: 'from-violet-600 to-purple-800'
    },
    green: { 
      bg: 'bg-teal-600', 
      bgLight: 'bg-teal-50', 
      text: 'text-teal-600', 
      border: 'border-teal-200', 
      badge: 'bg-teal-600', 
      ring: 'teal',
      gradient: 'from-teal-600 to-emerald-800'
    },
    beige: { 
      bg: 'bg-stone-700', 
      bgLight: 'bg-stone-50', 
      text: 'text-stone-700', 
      border: 'border-stone-200', 
      badge: 'bg-stone-700', 
      ring: 'stone',
      gradient: 'from-stone-700 to-stone-900'
    },
    golden: { 
      bg: 'bg-amber-600', 
      bgLight: 'bg-amber-50', 
      text: 'text-amber-600', 
      border: 'border-amber-200', 
      badge: 'bg-amber-600', 
      ring: 'amber',
      gradient: 'from-amber-600 to-yellow-700'
    },
    navy: { 
      bg: 'bg-slate-800', 
      bgLight: 'bg-slate-50', 
      text: 'text-slate-700', 
      border: 'border-slate-200', 
      badge: 'bg-slate-800', 
      ring: 'slate',
      gradient: 'from-slate-800 to-slate-900'
    },
    purple: { 
      bg: 'bg-violet-600', 
      bgLight: 'bg-violet-50', 
      text: 'text-violet-600', 
      border: 'border-violet-200', 
      badge: 'bg-violet-600', 
      ring: 'violet',
      gradient: 'from-violet-600 to-purple-800'
    },
    green: { 
      bg: 'bg-teal-600', 
      bgLight: 'bg-teal-50', 
      text: 'text-teal-600', 
      border: 'border-teal-200', 
      badge: 'bg-teal-600', 
      ring: 'teal',
      gradient: 'from-teal-600 to-emerald-800'
    },
    beige: { 
      bg: 'bg-stone-700', 
      bgLight: 'bg-stone-50', 
      text: 'text-stone-700', 
      border: 'border-stone-200', 
      badge: 'bg-stone-700', 
      ring: 'stone',
      gradient: 'from-stone-700 to-stone-900'
    },
    golden: { 
      bg: 'bg-amber-600', 
      bgLight: 'bg-amber-50', 
      text: 'text-amber-600', 
      border: 'border-amber-200', 
      badge: 'bg-amber-600', 
      ring: 'amber',
      gradient: 'from-amber-600 to-yellow-700'
    },
  };

  const colors = getColorClasses(framework.color);

  return (
    <section className="py-8">
      <div className="container mx-auto px-4">
        {/* Header with ISO42001 Link */}
        <div className="mb-8 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <Link to="/iso42001" className="inline-flex items-center gap-2 text-sm text-primary-600 hover:text-primary-800 mb-2 transition-colors">
              <ArrowRight className="w-4 h-4" />
              ISO 42001 AI Governance Roadmap
            </Link>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">{framework.name}</h1>
            <p className="text-gray-600 text-lg max-w-2xl">Interactive learning roadmap with progress tracking, milestones, and hands-on checklists for new compliance professionals</p>
          </div>
          <div className="flex flex-wrap gap-3">
            <a 
              href={framework.referenceUrl} 
              target="_blank" 
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-gray-100 text-gray-700 px-5 py-2.5 rounded-lg hover:bg-gray-200 transition font-medium"
            >
              <ExternalLink className="w-4 h-4" />
              Official Reference
            </a>
          </div>
        </div>

        {/* Progress Overview */}
        <div className={`bg-white rounded-2xl border ${colors.border} p-6 mb-8`}>
          <div className="flex flex-col md:flex-row items-center gap-8">
            {/* Progress Ring */}
            <div className="relative">
              <svg width="160" height="160" viewBox="0 0 160 160">
                <circle cx="80" cy="80" r="70" stroke="#e5e7eb" stroke-width="12" fill="none"/>
                <circle 
                  id="progressRing" 
                  cx="80" cy="80" r="70" 
                  stroke={`#${colors.ring}-600`} 
                  strokeWidth="12" 
                  fill="none"
                  strokeDasharray="440" 
                  strokeDashoffset="440" 
                  strokeLinecap="round"
                  transform="rotate(-90 80 80)" 
                  style={{ transition: 'stroke-dashoffset 1s ease' }}
                />
              </svg>
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <span id="progressPercent" className="text-4xl font-bold text-gray-900">{progressPercent}%</span>
                <span className="text-sm text-gray-500">Complete</span>
                <span className="text-xs text-gray-400 mt-1">{completedTasks} / {totalTasks} tasks</span>
              </div>
            </div>
            <div className="flex-1 grid grid-cols-2 sm:grid-cols-4 gap-4">
              {framework.weeks.map(week => (
                <div key={week.week} className="text-center p-3 rounded-xl" style={{ backgroundColor: `${colors.bgLight}` }}>
                  <div className="text-2xl font-bold" style={{ color: `${colors.text}` }}>{weekStats[week.week]?.completed || 0}/{week.tasks.length}</div>
                  <div className="text-xs font-medium" style={{ color: `${colors.text}` }}>Week {week.week}</div>
                </div>
              ))}
            </div>
            <button 
              onClick={resetProgress}
              className="text-sm text-gray-400 hover:text-red-500 transition underline self-start"
            >
              <RefreshCw className="w-4 h-4 inline mr-1" />
              Reset All Progress
            </button>
          </div>
        </div>

        {/* Visual Timeline */}
        <div className={`bg-white rounded-2xl border ${colors.border} p-6 mb-8`}>
          <h2 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-2">
            <Clock className="w-5 h-5" style={{ color: `${colors.text}` }} />
            Implementation Timeline
          </h2>
          <div className="relative">
            <div className="flex items-center justify-between mb-2">
              <div className="flex flex-col items-center">
                <div className={`w-10 h-10 rounded-full ${colors.bg} text-white flex items-center justify-center text-sm font-bold shadow-lg ring-4 ring-white`}>D1</div>
                <span className="text-xs text-gray-500 mt-1 font-medium">Start</span>
              </div>
              {framework.milestones.map((milestone, idx) => (
                <React.Fragment key={milestone.day}>
                  <div className="flex-1 h-1 bg-gray-200 mx-2 relative">
                    <div 
                      id={`timelineFill${idx + 1}`} 
                      className="absolute inset-y-0 left-0 rounded transition-all duration-700" 
                      style={{ 
                        width: '0%', 
                        backgroundColor: milestone.color === 'blue' ? '#3b82f6' : 
                                       milestone.color === 'purple' ? '#a855f7' : 
                                       milestone.color === 'green' ? '#22c55e' : '#f97316' 
                      }}
                    ></div>
                  </div>
                  <div className="flex flex-col items-center">
                    <div 
                      id={`milestone${milestone.day}`} 
                      className={`w-12 h-12 rounded-full bg-white border-4 border-gray-300 text-gray-400 flex items-center justify-center text-xs font-bold shadow transition-all duration-500`}
                    >
                      {milestone.day}d
                    </div>
                    <span className="text-xs text-gray-500 mt-1 font-medium">{milestone.label}</span>
                  </div>
                </React.Fragment>
              ))}
            </div>
          </div>
        </div>

        {/* Weeks with Checklists */}
        {framework.weeks.map(week => (
          <div key={week.week} className="mb-6 bg-white rounded-2xl border border-gray-200 overflow-hidden">
            <div className={`px-6 py-4 flex items-center justify-between ${colors.bg}`}>
              <div>
                <h2 className="text-xl font-bold text-white">Week {week.week} — {week.title}</h2>
                <p className={`${colors.bg} text-sm opacity-90`}>{week.days}: {week.description}</p>
              </div>
              <span className={`px-3 py-1 rounded-full text-sm font-medium ${colors.badge} text-white`}>
                {weekStats[week.week]?.completed || 0}/{week.tasks.length}
              </span>
            </div>
            <div className="divide-y divide-gray-100" id={`week${week.week}`}>
              {week.tasks.map((task, index) => (
                <label 
                  key={`${week.week}-${index}`}
                  className="checklist-item flex items-start gap-4 p-4 cursor-pointer hover:bg-gray-50 transition"
                >
                  <input
                    type="checkbox"
                    className={`w-5 h-5 mt-0.5 rounded border-gray-300 focus:ring-2 focus:ring-${colors.ring}-500 text-${colors.ring}-600`}
                    data-week={week.week}
                    data-index={index}
                    checked={!!progress[`w${week.week}-${index}`]}
                    onChange={() => handleToggle(week.week, index)}
                  />
                  <div className="flex-1">
                    <p className="font-medium text-gray-900">{task}</p>
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
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 p-4 bg-gradient-to-r from-primary-50 to-primary-100 rounded-xl">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-primary-100 flex items-center justify-center">
                <BookOpen className="w-6 h-6 text-primary-600" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-gray-900">ISO/IEC 42001:2023 - AI Governance</h3>
                <p className="text-gray-600 text-sm">Extend your compliance expertise to AI governance with the world's first AI management system standard</p>
              </div>
            </div>
            <Link 
              to="/iso42001" 
              className="inline-flex items-center gap-2 bg-primary-600 text-white px-5 py-2.5 rounded-lg hover:bg-primary-700 transition font-medium whitespace-nowrap"
            >
              <ArrowRight className="w-4 h-4" />
              View ISO 42001 Roadmap
            </Link>
          </div>
        </div>

        <footer className="mt-12 pt-8 border-t border-gray-800 text-center">
          <p className="text-gray-400 text-sm">Made by Ruchi Kandpal</p>
        </footer>
      </div>
    </section>
  );
}
