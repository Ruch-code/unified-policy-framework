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
  BarChart3
} from 'lucide-react';
import { Link } from 'react-router-dom';

const STORAGE_PREFIX = 'compliance-learning-';

export default function LearningFrameworkPage({ framework }) {
  const [progress, setProgress] = useState({});
  const [showExcelModal, setShowExcelModal] = useState(false);
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
  }

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
      blue: { bg: 'bg-blue-600', bgLight: 'bg-blue-50', text: 'text-blue-600', border: 'border-blue-200', badge: 'bg-blue-600', ring: 'blue' },
      indigo: { bg: 'bg-indigo-600', bgLight: 'bg-indigo-50', text: 'text-indigo-600', border: 'border-indigo-200', badge: 'bg-indigo-600', ring: 'indigo' },
      purple: { bg: 'bg-purple-600', bgLight: 'bg-purple-50', text: 'text-purple-600', border: 'border-purple-200', badge: 'bg-purple-600', ring: 'purple' },
      teal: { bg: 'bg-teal-600', bgLight: 'bg-teal-50', text: 'text-teal-600', border: 'border-teal-200', badge: 'bg-teal-600', ring: 'teal' },
      green: { bg: 'bg-green-600', bgLight: 'bg-green-50', text: 'text-green-600', border: 'bg-green-200', badge: 'bg-green-600', ring: 'green' },
      orange: { bg: 'bg-orange-600', bgLight: 'bg-orange-50', text: 'text-orange-600', border: 'border-orange-200', badge: 'bg-orange-600', ring: 'orange' },
      red: { bg: 'bg-red-600', bgLight: 'bg-red-50', text: 'text-red-600', border: 'border-red-200', badge: 'bg-red-600', ring: 'red' },
      blue: { bg: 'bg-blue-600', bgLight: 'bg-blue-50', text: 'text-blue-600', border: 'border-blue-200', badge: 'bg-blue-600', ring: 'blue' },
    };
    return colors[color] || colors.blue;
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
            <p className="text-gray-600 text-lg max-w-2xl">Interactive learning roadmap with progress tracking, milestones, and downloadable checklists</p>
          </div>
          <div className="flex flex-wrap gap-3">
            <button 
              onClick={() => setShowExcelModal(true)}
              className="inline-flex items-center gap-2 bg-green-600 text-white px-5 py-2.5 rounded-lg hover:bg-green-700 transition font-medium shadow-sm"
            >
              <Download className="w-4 h-4" />
              Download Excel Checklist
            </button>
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
                    className={`w-5 h-5 mt-0.5 rounded border-gray-300 focus:ring-2 ${colors.ring === 'blue' ? 'focus:ring-blue-500' : 
                                colors.ring === 'indigo' ? 'focus:ring-indigo-500' : 
                                colors.ring === 'purple' ? 'focus:ring-purple-500' : 
                                colors.ring === 'teal' ? 'focus:ring-teal-500' : 
                                colors.ring === 'green' ? 'focus:ring-green-500' : 
                                colors.ring === 'orange' ? 'focus:ring-orange-500' : 
                                'focus:ring-red-500'} text-${colors.ring}-600`}
                    data-week={week.week}
                    data-index={index}
                    checked={!!progress[`w${week.week}-${index}`]}
                    onChange={() => handleToggle(week.week, index)}
                  />
                  <div className="flex-1">
                    <p className="font-medium text-gray-900">{task}</p>
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

        {/* Excel Download Modal */}
        {showExcelModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-2xl max-w-md w-full p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-xl font-bold text-gray-900">Download Excel Checklist</h3>
                <button onClick={() => setShowExcelModal(false)} className="text-gray-400 hover:text-gray-600 text-2xl leading-none">&times;</button>
              </div>
              <div className="space-y-3">
                <p className="text-gray-600">Download the comprehensive Excel checklist for <strong>{framework.name}</strong> with all tasks, evidence columns, status tracking, and due dates.</p>
                <a 
                  href={framework.excelUrl} 
                  download
                  className="block w-full text-center bg-green-600 text-white px-5 py-3 rounded-lg hover:bg-green-700 transition font-medium"
                >
                  <Download className="w-5 h-5 inline mr-2" />
                  Download Excel Checklist (.xlsx)
                </a>
                <p className="text-xs text-gray-500 text-center mt-3">File will be generated with all {framework.weeks.reduce((sum, w) => sum + w.tasks.length, 0)} tasks across {framework.weeks.length} weeks</p>
              </div>
              <button 
                onClick={() => setShowExcelModal(false)}
                className="mt-4 w-full text-center text-gray-500 hover:text-gray-700 font-medium"
              >
                Cancel
              </button>
            </div>
          </div>
        )}

        <footer className="mt-12 pt-8 border-t border-gray-800 text-center">
          <p className="text-gray-400 text-sm">Made by Ruchi Kandpal</p>
        </footer>
      </div>
    </section>
  );
}
