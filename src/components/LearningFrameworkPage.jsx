import { useState, useEffect, Fragment } from 'react';
import { Link } from 'react-router-dom';
import { Clock, RefreshCw, ArrowRight, BookOpen, ExternalLink, Lock, CheckCircle, ChevronDown, ChevronRight, Zap, Shield, Award, Target, TrendingUp, AlertTriangle, Lightbulb, ClipboardList } from 'lucide-react';
import FindingsDatabase from './FindingsDatabase';
import PrivacyDocuments from './PrivacyDocuments';

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

;

const PRIVACY_GAP_NOTE = 'Privacy laws also add these specific startup pitfalls:';

const ITGC_DOMAINS = {
  Access: 'Access Management',
  Change: 'Change Management',
  Ops: 'IT Operations',
  ProgramDev: 'Program / System Development',
  Privacy: 'Data Privacy / Governance',
  Continuity: 'Business Continuity & Incident',
};

const ITGC_COLORS = {
  'Access Management': 'bg-blue-50 text-blue-700 border-blue-200',
  'Change Management': 'bg-purple-50 text-purple-700 border-purple-200',
  'IT Operations': 'bg-emerald-50 text-emerald-700 border-emerald-200',
  'Program / System Development': 'bg-amber-50 text-amber-700 border-amber-200',
  'Data Privacy / Governance': 'bg-rose-50 text-rose-700 border-rose-200',
  'Business Continuity & Incident': 'bg-cyan-50 text-cyan-700 border-cyan-200',
  'General / Cross-Cutting': 'bg-slate-100 text-slate-700 border-slate-200',
};

function itgcColor(domain) { return ITGC_COLORS[domain] || ITGC_COLORS['General / Cross-Cutting']; }

const GENERIC_GAPS = [
  {
    itgc: 'Access Management',
    gap: 'No documented controls or evidence yet',
    pushback: '"We\'re too early to have formal evidence — we just ship features."',
    reality: 'Auditors/frameworks need proof of at least the core controls (access, encryption, logging, change management). Without it, a certification or customer security review stalls.',
    policy: 'Information Security Policy, Access Control Policy, Evidence & Records Retention Policy',
    compensating: [
      'Central identity source (IDP) shows who has access',
      'CI/CD pipeline logs show code changes',
      'Cloud configuration gives an evidence trail',
    ],
    leantip: 'Start a lightweight evidence/asset register. Document what you DO have (IDP source of truth, CI/CD, cloud config) and map it to the framework — you likely have more than you think.',
  },
  {
    itgc: 'Access Management',
    gap: 'No dedicated security/compliance person',
    pushback: '"We can\'t afford a compliance hire yet."',
    reality: 'Startups are expected to be lean, but a single accountable owner (even part-time engineering lead) prevents orphaned controls and drift.',
    policy: 'Security Roles & Responsibilities Policy, Acceptable Use Policy',
    compensating: [
      'Designated "security champion" inside engineering',
      'Cloud-native dashboards give visibility without a dedicated IR team',
      'Managed services reduce the surface the team must own',
    ],
    leantip: 'Assign a "security champion" within engineering. Use cloud-native dashboards and automated scans so compliance is a byproduct, not extra headcount.',
  },
  {
    itgc: 'Access Management',
    gap: 'Shadow IT and unmanaged cloud accounts',
    pushback: '"Devs spin up their own AWS/Azure/GCP accounts for speed."',
    reality: 'Unknown assets are the #1 startup audit gap — you can\'t protect what you haven\'t inventoried, and scope creep explodes later.',
    policy: 'Asset Management Policy, Cloud Usage / Procurement Policy, Access Control Policy',
    compensating: [
      'Organization-level landing zone with guardrails',
      'Unmanaged-asset discovery scans',
      'Single sign-on limits which accounts can exist',
    ],
    leantip: 'Enforce an organization/landing-zone with guardrails (SCPs on AWS, policy on Azure/GCP). Add an unmanaged-asset discovery scan to find attackers\' favorite footholds.',
  },
  {
    itgc: 'Change Management',
    gap: 'Production, staging, development not segregated',
    pushback: '"We test in production sometimes — it\'s just faster."',
    reality: 'Shared dev/prod environments mean a dev change can silently touch real customer data or PCI/PHI scope. Frameworks expect separation.',
    policy: 'Environment / SDLC Policy, Change Management Policy, Data Classification Policy',
    compensating: [
      'IAM boundaries isolating prod from non-prod',
      'Realistic anonymized test data instead of real PII/PHI/PCI',
      'CI/CD approvals as a change-record trail',
    ],
    leantip: 'At minimum split prod from non-prod (separate accounts/VPCs/namespaces with IAM boundaries). Use realistic anonymized test data, never real cardholder/PHI/PII in dev.',
  },
  {
    itgc: 'IT Operations',
    gap: 'No formal risk assessment or scanning cadence',
    pushback: '"We\'ll do it closer to the audit."',
    reality: 'Frameworks require evidence that risks were identified, prioritized, and tracked over time — retroactive assessments look like window-dressing.',
    policy: 'Risk Assessment Policy, Vulnerability Management Policy, Monitoring & Logging Policy',
    compensating: [
      'Automated external scanning on a schedule',
      'Lightweight risk register tracked quarterly',
      'Dashboard history left as evidence of cadence',
    ],
    leantip: 'Run an automated external scan + a lightweight risk register (10-15 risks max). Revisit quarterly. Screenshot the dashboard history as evidence.',
  },
  {
    itgc: 'Program / System Development',
    gap: 'Vendor / tool sprawl without oversight',
    pushback: '"Everyone picks their own SaaS tools."',
    reality: 'Each vendor that touches data is a risk + potentially a BAA/DPA requirement. Startup pushback ignores the compounding exposure.',
    policy: 'Vendor / Third-Party Risk Management Policy, Procurement Policy, Data Protection (DPA/BAA) Policy',
    compensating: [
      'One-page vendor inventory with data-types touched',
      'Approval gating in procurement for new tools',
      'Standard vendor security questionnaire',
    ],
    leantip: 'Keep a one-page vendor inventory with data-types touched and whether a DPA/BAA is needed. Use an approval gating in procurement for new tools.',
  },
  {
    itgc: 'Access Management',
    gap: 'Weak passwords / no MFA on everything',
    pushback: '"MFA is annoying for devs."',
    reality: 'Credential compromise is the leading breach vector. Most frameworks require MFA for privileged access at minimum.',
    policy: 'Access Control Policy, Password / Authentication Policy, Remote Access Policy',
    compensating: [
      'IDP-enforced MFA organization-wide',
      'Short-lived credentials instead of static cloud keys',
      'Privileged access management for admins',
    ],
    leantip: 'Enforce MFA organization-wide via the IDP (Okta/Entra ID). Kill static cloud keys (use short-lived credentials) — it\'s free and reduces breach surface massively.',
  },
  {
    itgc: 'Business Continuity & Incident',
    gap: 'No documented incident response process',
    pushback: '"We\'ll figure it out if something happens."',
    reality: 'When a real incident hits, ad-hoc response burns time, breaches regulatory reporting windows (e.g., 72h GDPR, 6h CERT-In), and damages trust.',
    policy: 'Incident Response Policy, Breach Notification Policy, Business Continuity & Disaster Recovery (BCDR) Policy',
    compensating: [
      'One-page incident runbook with contacts & preserve steps',
      'Quarterly 30-minute tabletop exercises',
      'Centralized log aggregation to investigate faster',
    ],
    leantip: 'Write a one-page runbook: who to call, how to contain, logs to preserve, who notifies whom. Run a 30-minute tabletop once a quarter.',
  },
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
    const DEFAULT_LEVEL_HOURS = [3, 6, 4, 2];
    const perTaskHours = (framework.hoursByLevel && framework.hoursByLevel[idx]) || DEFAULT_LEVEL_HOURS[idx] || 3;
    tasks = tasks.map(t => {
      if (typeof t === 'string') return { title: t, hours: perTaskHours || 3 };
      if (typeof t.hours === 'number') return t;
      return { ...t, hours: perTaskHours || 3 };
    });
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

  const totalHours = data.weeks.reduce((sum, w) => sum + w.tasks.reduce((s, t) => s + (t.hours || 0), 0), 0);
  const levelHours = {};
  data.weeks.forEach(w => {
    levelHours[w.week] = w.tasks.reduce((s, t) => s + (t.hours || 0), 0);
  });

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
              {framework.flag && (
                <span className={`text-3xl inline-block ${framework.flagAnimation === 'bounce' ? 'flag-bounce' : framework.flagAnimation === 'pulse' ? 'flag-pulse' : 'flag-float'}`} aria-label={framework.name}>
                  {framework.flag}
                </span>
              )}
              {framework.name}
              {framework.region && (
                <span className={`text-xs font-semibold px-3 py-1 rounded-full inline-flex items-center ${
                  framework.region === 'Global' ? 'bg-gray-200 text-gray-700' :
                  framework.region === 'United States' ? 'bg-blue-100 text-blue-700' :
                  framework.region === 'European Union' ? 'bg-gradient-to-r from-blue-100 to-yellow-100 text-blue-700' :
                  framework.region === 'India' ? 'bg-gradient-to-r from-orange-100 to-green-100 text-orange-700' :
                  framework.region === 'Brazil' ? 'bg-gradient-to-r from-green-100 to-yellow-100 text-green-700' :
                  framework.region === 'Singapore' ? 'bg-red-100 text-red-700' :
                  framework.region === 'China' ? 'bg-red-100 text-red-700' :
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
            {framework.basePath && (
              <Link to={`${framework.basePath}/assess`} className="inline-flex items-center gap-2 bg-[#1e293b] text-white px-5 py-2.5 rounded-lg hover:bg-[#0f172a] transition font-medium">
                <ClipboardList className="w-4 h-4" />
                Environment Assessment
              </Link>
            )}
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
                <span className="text-xs text-gray-400 mt-1 flex items-center gap-1"><Clock className="w-3 h-3" /> ~{totalHours}h total</span>
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
                  {levelHours[week.week] > 0 && (
                    <div className="text-right px-3 py-1 rounded-full text-xs font-medium bg-white/10 text-white/80">
                      <Clock className="w-3.5 h-3.5 inline mr-1 -mt-0.5" /> ~{levelHours[week.week]}h
                    </div>
                  )}
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
                            <div className="flex items-center gap-2 flex-wrap">
                              <p className={`font-medium ${done ? 'text-gray-400 line-through' : 'text-gray-900'}`}>
                                {typeof task === 'string' ? task : task.title}
                              </p>
                              {typeof task === 'object' && typeof task.hours === 'number' && (
                                <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-gray-600 bg-gray-100 px-2 py-0.5 rounded-full">
                                  <Clock className="w-3 h-3" /> {task.hours}h
                                </span>
                              )}
                            </div>
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

        {/* Startup Gaps & Pushback */}
        {(() => {
          const isPrivacy = /privacy|gdpr|dpdpa|ccpa|coppa|27701|lgpd|pdpa|pipl/i.test(framework.name);
          const gaps = framework.startupGaps && framework.startupGaps.length
            ? framework.startupGaps
            : GENERIC_GAPS;
          return (
            <div className={`bg-white rounded-2xl border ${colors.border} p-6 mb-8`}>
              <h2 className="text-xl font-bold text-gray-900 mb-2 flex items-center gap-2">
                <span className="w-8 h-8 rounded-lg bg-amber-100 text-amber-700 flex items-center justify-center"><TrendingUp className="w-4 h-4" /></span>
                Common Gaps & Startup Pushback (ITGC)
              </h2>
              <p className="text-gray-500 text-sm mb-4 max-w-2xl">
                Common startup gaps mapped to <strong>IT General Control</strong> domains — what's typically missing, the pushback, the <strong>compensating controls</strong> already in place, and the <strong>policy</strong> that ties each control to this framework.
              </p>
              <div className="flex flex-wrap gap-2 mb-6">
                {Object.keys(ITGC_COLORS).map(d => (
                  <span key={d} className={`text-[11px] font-semibold px-2.5 py-1 rounded-full border ${itgcColor(d)}`}>{d}</span>
                ))}
              </div>
              <div className="grid md:grid-cols-2 gap-5">
                {gaps.map((item, i) => (
                  <GapCard key={i} item={item} colors={colors} />
                ))}
              </div>
              {isPrivacy && framework.privacyStartupNotes && (
                <div className={`mt-6 p-4 rounded-xl ${colors.bgLight} text-sm ${colors.text}`}>
                  {framework.privacyStartupNotes}
                </div>
              )}
            </div>
          );
        })()}

        {framework.commonFindings && framework.commonFindings.length > 0 && (
          <FindingsDatabase color={colors} />
        )}

        <PrivacyDocuments framework={framework} colors={colors} />

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

function GapCard({ item, colors }) {
  const [open, setOpen] = useState(false);
  const hasPushback = !!item.pushback;
  const dom = item.itgc || 'General / Cross-Cutting';
  const compensating = Array.isArray(item.compensating) ? item.compensating : [];
  const policy = item.policy || '';
  return (
    <div className={`border rounded-xl ${colors.border} overflow-hidden transition-shadow hover:shadow-md`}>
      <button
        onClick={() => setOpen(!open)}
        className={`w-full flex items-start gap-3 p-4 text-left ${colors.bgLight}`}
      >
        <AlertTriangle className={`w-5 h-5 mt-0.5 shrink-0 ${colors.text}`} />
        <div className="flex-1">
          <span className={`inline-block text-[10px] font-semibold px-2 py-0.5 rounded-full border uppercase tracking-wide mb-1.5 ${itgcColor(dom)}`}>
            ITGC · {dom}
          </span>
          <h4 className="font-bold text-gray-900 flex items-center justify-between gap-2">
            {item.gap}
            <ChevronRight className={`w-4 h-4 shrink-0 text-gray-400 transition-transform ${open ? 'rotate-90' : ''}`} />
          </h4>
          {!open && (
            <p className="text-sm text-gray-500 mt-1 italic">"{item.pushback || 'Read common pushback & how to respond'}"</p>
          )}
        </div>
      </button>
      {open && (
        <div className="p-4 space-y-3 bg-white">
          {hasPushback && (
            <div className="rounded-lg bg-amber-50 border border-amber-100 p-3">
              <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-amber-700 uppercase tracking-wide"><AlertTriangle className="w-3.5 h-3.5" /> What founders/staff say</span>
              <p className="text-sm text-gray-700 italic mt-1">"{item.pushback}"</p>
            </div>
          )}
          <div className="rounded-lg bg-blue-50 border border-blue-100 p-3">
            <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-blue-700 uppercase tracking-wide"><TrendingUp className="w-3.5 h-3.5" /> Why it matters</span>
            <p className="text-sm text-gray-700 mt-1">{item.reality}</p>
          </div>
          {compensating.length > 0 && (
            <div className="rounded-lg bg-indigo-50 border border-indigo-100 p-3">
              <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-indigo-700 uppercase tracking-wide"><CheckCircle className="w-3.5 h-3.5" /> Compensating controls already in place</span>
              <ul className="mt-1 space-y-1 text-sm text-gray-700">
                {compensating.map((c, i) => (
                  <li key={i} className="flex items-start gap-2"><span className="text-indigo-400 mt-0.5">•</span>{c}</li>
                ))}
              </ul>
            </div>
          )}
          <div className="rounded-lg bg-violet-50 border border-violet-100 p-3">
            <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-violet-700 uppercase tracking-wide"><BookOpen className="w-3.5 h-3.5" /> Policy that ties to this framework</span>
            <p className="text-sm text-gray-700 mt-1">{policy || 'Align controls to your Information Security Policy set.'}</p>
          </div>
          <div className="rounded-lg bg-green-50 border border-green-100 p-3">
            <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-green-700 uppercase tracking-wide"><Lightbulb className="w-3.5 h-3.5" /> The lean way</span>
            <p className="text-sm text-gray-700 mt-1">{item.leantip}</p>
          </div>
        </div>
      )}
    </div>
  );
}
