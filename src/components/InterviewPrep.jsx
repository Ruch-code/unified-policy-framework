import React, { useState, useEffect } from 'react';

export default function InterviewPrep({ isDark = false }) {
  const [roles, setRoles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeRole, setActiveRole] = useState('grc-analyst');
  const [expandedQ, setExpandedQ] = useState(null);
  const [expandedTip, setExpandedTip] = useState(null);

  useEffect(() => {
    const API_URL = ['interview-roles', 'json'].join('.');
    fetch(API_URL)
      .then(res => res.json())
      .then(data => {
        setRoles(data.roles);
        setLoading(false);
      })
      .catch(err => {
        console.error('Failed to load interview data:', err);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <div className="py-16 bg-surface-50 dark:bg-dark-bg">
        <div className="max-w-5xl mx-auto px-4 text-center">
          <p className="text-text-dark-muted dark:text-text-dark-muted">Loading interview data...</p>
        </div>
      </div>
    );
  }

  const role = roles.find(r => r.id === activeRole);

  if (!role) {
    return (
      <div className="py-16 bg-surface-50 dark:bg-dark-bg">
        <div className="max-w-5xl mx-auto px-4 text-center">
          <p className="text-text-dark-muted dark:text-text-dark-muted">Loading interview data...</p>
        </div>
      </div>
    );
  }

  const roleColors = {
    'grc-analyst': { primary: '#4f46e5', light: '#eef0fa', dark: '#312e81', text: '#4f46e5', textDark: '#c7d2fe' },
    'privacy-engineer': { primary: '#7c3aed', light: '#f5f3ff', dark: '#5b21b6', text: '#7c3aed', textDark: '#d8b4fe' },
    'security-engineer': { primary: '#ef4444', light: '#fef2f2', dark: '#991b1b', text: '#ef4444', textDark: '#fca5a5' },
    'ciso': { primary: '#f59e0b', light: '#fffbeb', dark: '#78350f', text: '#f59e0b', textDark: '#fcd34d' },
    'compliance-manager': { primary: '#10b981', light: '#ecfdf5', dark: '#064e3b', text: '#10b981', textDark: '#6ee7b7' },
    'dpo': { primary: '#3b82f6', light: '#eff6ff', dark: '#1e3a8a', text: '#3b82f6', textDark: '#bfdbfe' },
    'vendor-risk': { primary: '#0ea5e9', light: '#f0f9ff', dark: '#0c4a6e', text: '#0ea5e9', textDark: '#7dd3fc' },
    'ai-governance': { primary: '#8b5cf6', light: '#f5f3ff', dark: '#5b21b6', text: '#8b5cf6', textDark: '#d8b4fe' },
    'soc-lead': { primary: '#f43f5e', light: '#fff1f2', dark: '#881337', text: '#f43f5e', textDark: '#fda4af' },
    'sox-audit': { primary: '#14b8a6', light: '#f0fdfa', dark: '#134e4a', text: '#14b8a6', textDark: '#5eead4' },
    'bc-dr': { primary: '#f97316', light: '#fff7ed', dark: '#7c2d12', text: '#f97316', textDark: '#fdba74' },
    'cloud-architect': { primary: '#06b6d4', light: '#ecfeff', dark: '#164e63', text: '#06b6d4', textDark: '#67e8f9' },
    'appsec': { primary: '#d946ef', light: '#fdf4ff', dark: '#701a75', text: '#d946ef', textDark: '#f0abfc' },
    'red-team': { primary: '#64748b', light: '#f8fafc', dark: '#0f172a', text: '#64748b', textDark: '#cbd5e1' },
    'principal-architect': { primary: '#db2777', light: '#fdf2f8', dark: '#831843', text: '#db2777', textDark: '#f9a8d4' },
  };

  const ACTIVE_BADGE = {
    'grc-analyst': 'bg-indigo-600',
    'privacy-engineer': 'bg-violet-600',
    'security-engineer': 'bg-red-600',
    'ciso': 'bg-amber-600',
    'compliance-manager': 'bg-emerald-600',
    'dpo': 'bg-blue-600',
    'vendor-risk': 'bg-sky-600',
    'ai-governance': 'bg-purple-600',
    'soc-lead': 'bg-rose-600',
    'sox-audit': 'bg-teal-600',
    'bc-dr': 'bg-orange-600',
    'cloud-architect': 'bg-cyan-600',
    'appsec': 'bg-fuchsia-600',
    'red-team': 'bg-slate-700',
    'principal-architect': 'bg-pink-600',
  };

  return (
    <div className="py-16 bg-surface-50 dark:bg-dark-bg">
      <div className="max-w-5xl mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold text-navy-900 dark:text-text-dark-primary mb-4">
            Interview Preparation Hub
          </h2>
          <p className="text-lg text-navy-600 dark:text-text-dark-secondary max-w-2xl mx-auto">
            Role-specific interview questions with conversational answers for GRC, Privacy, Security, Risk, Audit, AI, Cloud, and Leadership roles. 
            Practice real scenarios with expert-level responses.
          </p>
        </div>

        {/* Role Tabs */}
        <div className="flex flex-wrap justify-center gap-2 mb-10" role="tablist" aria-label="Interview roles">
          {roles.map((r) => {
            const colors = roleColors[r.id] || roleColors['grc-analyst'];
            const isActive = activeRole === r.id;
            return (
              <button
                key={r.id}
                onClick={() => { setActiveRole(r.id); setExpandedQ(null); setExpandedTip(null); }}
                role="tab"
                aria-selected={isActive}
                aria-controls={`panel-${r.id}`}
                id={`tab-${r.id}`}
                className={`px-5 py-2.5 rounded-xl font-medium transition-all duration-200 border-2
                  ${isActive
                    ? `${ACTIVE_BADGE[r.id] || 'bg-indigo-600'} text-white shadow-lg border-transparent`
                    : `bg-surface-100 dark:bg-surface-dark-100 text-navy-700 dark:text-text-dark-secondary hover:bg-surface-200 dark:hover:bg-surface-dark-200 border-surface-300 dark:border-surface-dark-300`}
                `}
                style={{ borderColor: isActive ? 'transparent' : colors.primary }}
              >
                {r.title}
              </button>
            );
          })}
        </div>

        {/* Questions */}
        <div className="space-y-6 max-w-3xl mx-auto" role="tabpanel" aria-labelledby={`tab-${activeRole}`}>
          {role?.questions?.map((q, i) => (
            <div
              key={q.id || i}
              className="grc-card"
            >
              <button
                onClick={() => setExpandedQ(expandedQ === i ? null : i)}
                className="w-full p-6 flex items-start gap-4 text-left group"
              >
                <div className="flex-shrink-0 w-10 h-10 rounded-xl flex items-center justify-center
                  bg-indigo-50 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-400">
                  <span className="w-5 h-5">💬</span>
                </div>
                <div className="flex-1">
                  <h3 className="grc-card-title font-semibold text-lg mb-1">{q.q}</h3>
                  <div className="flex flex-wrap gap-1.5 mt-2">
                    {q.tags.map((tag, ti) => (
                      <span
                        key={ti}
                        className="px-2 py-0.5 text-xs font-medium rounded-full
                          bg-indigo-50 dark:bg-indigo-900/30
                          text-indigo-600 dark:text-indigo-400
                          border border-indigo-100 dark:border-indigo-800"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
                <div className="flex items-center gap-2 text-text-dark-muted dark:text-text-dark-muted">
                  {expandedQ === i ? '▲' : '▼'}
                </div>
              </button>

              {expandedQ === i && (
                <div className="border-t border-surface-300 dark:border-surface-dark-300 p-6 animate-in slide-in-from-top-2 duration-200 bg-surface-50 dark:bg-dark-bg">
                  <div className="prose prose-gray max-w-none text-navy-700 dark:text-text-dark-secondary">
                    <p className="whitespace-pre-wrap">{q.a}</p>
                  </div>
                  <div className="mt-4 p-4 rounded-xl
                    bg-emerald-50 dark:bg-alert-success
                    border border-emerald-200 dark:border-alert-success
                    text-emerald-800 dark:text-alert-success">
                    <div className="flex items-start gap-3">
                      <span className="w-5 h-5 text-emerald-600 dark:text-emerald-400 flex-shrink-0 mt-0.5">✓</span>
                      <div className="flex-1 min-w-0">
                        <h5 className="font-bold mb-1">Interviewer Follow-up Tip</h5>
                        <div>
                            <p className="text-sm">{q.example || 'Anchor your answer with a concrete, metric-driven example instead of a generic walkthrough.'}</p>
                            {q.examples?.length > 0 && (
                              <>
                                <button
                                  onClick={() => setExpandedTip(expandedTip === i ? null : i)}
                                  aria-expanded={expandedTip === i}
                                  className="mt-2 inline-flex items-center gap-1.5 text-sm font-semibold underline-offset-2 hover:underline"
                                >
                                  View Example Scenarios
                                  <span className="text-xs">{expandedTip === i ? '▲' : '▼'}</span>
                                </button>
                                {expandedTip === i && (
                                  <ul className="mt-3 space-y-3 list-disc pl-5 text-sm">
                                    {q.examples.map((ex, xi) => (
                                      <li key={xi}>
                                        <span className="font-semibold">{ex.label}:</span> {ex.text}
                                      </li>
                                    ))}
                                  </ul>
                                )}
                              </>
                            )}
                          </div>
                      </div>
                    </div>
                  </div>
                  {q.pitfalls?.length > 0 && (
                    <div className="mt-4 p-4 rounded-xl bg-red-50 dark:bg-alert-danger border border-red-200 dark:border-alert-danger text-red-800 dark:text-alert-danger">
                      <div className="flex items-start gap-3">
                        <span className="w-5 h-5 text-red-500 dark:text-red-400 flex-shrink-0 mt-0.5">!</span>
                        <div className="flex-1 min-w-0">
                          <h5 className="font-bold mb-2">Common Pitfalls</h5>
                          <ul className="space-y-3">
                            {q.pitfalls.map((p, pi) => (
                              <li key={pi} className="text-sm">
                                <p>
                                  <span className="font-semibold">Pitfall: </span>
                                  {p.pitfall}
                                </p>
                                <p className="mt-2">
                                  <span className="font-semibold">For a conversation-style answer: </span>
                                  <span className="italic">{p.reply}</span>
                                </p>
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}