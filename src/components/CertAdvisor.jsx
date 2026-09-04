import { useState } from 'react';
import { ChevronRight, ChevronDown, CheckCircle, Shield, Star, Clock, DollarSign } from 'lucide-react';
import { PROFILE_QUESTIONS, CERT_CATALOG, PRIORITY_META, recommendCertifications } from '../data/certRecommendations';

export default function CertAdvisor() {
  const [step, setStep] = useState(0); // 0-3 = questions, 4 = results
  const [answers, setAnswers] = useState({});
  const [website, setWebsite] = useState('');
  const [result, setResult] = useState(null);
  const [bizInsight, setBizInsight] = useState(null);
  const [currency, setCurrency] = useState('INR');

  const q = PROFILE_QUESTIONS[step];

  const setAnswer = (val) => {
    const next = { ...answers, [q.id]: q.multiple ? [val] : val };
    setAnswers(next);
  };

  const toggleMulti = (val) => {
    if (val === 'none') {
      setAnswers({ ...answers, [q.id]: ['none'] });
      return;
    }
    const current = answers[q.id] || [];
    const withoutNone = current.filter(v => v !== 'none');
    const next = withoutNone.includes(val)
      ? withoutNone.filter(v => v !== val)
      : [...withoutNone, val];
    setAnswers({ ...answers, [q.id]: next.length ? next : [] });
  };

  const qValue = q ? (q.multiple ? (answers[q.id] || []) : answers[q.id]) : undefined;

  const canProceed = q ? (q.multiple ? (qValue.length > 0) : !!qValue) : false;

  const goNext = () => {
    if (step < 3) return setStep(step + 1);
    // Build profile
    const profile = { industry: answers.industry, data: answers.data || [], geo: answers.geo, stage: answers.stage, website: website.trim() };
    const { tiers, businessInsight } = recommendCertifications(profile);
    setResult(tiers);
    setBizInsight(businessInsight);
    setStep(4);
  };

  const goBack = () => { if (step > 0) setStep(step - 1); };

  const restart = () => { setStep(0); setAnswers({}); setResult(null); setBizInsight(null); setWebsite(''); };

  const priorityForLevel = (level) => PRIORITY_META.find(p => p.level === level) || PRIORITY_META[0];

  return (
    <div className="bg-white rounded-2xl border border-gray-200 p-6 mb-8">
      <div className="flex items-center gap-3 mb-2">
        <span className="w-8 h-8 rounded-lg bg-indigo-100 text-indigo-700 flex items-center justify-center"><Star className="w-4 h-4" /></span>
        <div>
          <h2 className="text-xl font-bold text-gray-900">Which certifications should you pursue — and in what order?</h2>
          <p className="text-gray-500 text-sm max-w-2xl">Answer 4 quick questions about your company profile to get a prioritised roadmap of the certifications that matter most.</p>
        </div>
      </div>

      {/* Progress */}
      {step < 4 && (
        <div className="mt-5 flex items-center gap-2">
          {PROFILE_QUESTIONS.map((pq, i) => (
            <div key={pq.id} className="flex-1 flex items-center gap-2">
              <span className={`w-7 h-7 rounded-full text-xs font-bold flex items-center justify-center border ${i < step ? 'bg-emerald-600 text-white border-transparent' : i === step ? 'bg-indigo-600 text-white border-transparent' : 'bg-gray-100 text-gray-500 border-gray-200'}`}>
                {i < step ? <CheckCircle className="w-4 h-4" /> : i + 1}
              </span>
              {i < PROFILE_QUESTIONS.length - 1 && <div className={`flex-1 h-0.5 rounded-full ${i < step ? 'bg-emerald-400' : 'bg-gray-200'}`} />}
            </div>
          ))}
        </div>
      )}

      {/* Questions */}
      {step < 4 && q && (
        <div className="mt-6">
          <h3 className="font-bold text-gray-900 text-sm mb-3">{q.label}</h3>
          {q.multiple ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {q.options.map(o => {
                const selected = (qValue || []).includes(o.value);
                return (
                  <button key={o.value} onClick={() => toggleMulti(o.value)}
                    className={`flex items-center gap-3 p-3 rounded-xl border text-sm text-left transition ${selected ? 'border-indigo-500 bg-indigo-50 text-indigo-900' : 'border-gray-200 bg-white hover:border-gray-300 text-gray-700'}`}>
                    <span className={`w-5 h-5 rounded border-2 flex items-center justify-center shrink-0 transition ${selected ? 'bg-indigo-600 border-indigo-600' : 'border-gray-300'}`}>
                      {selected && <CheckCircle className="w-3.5 h-3.5 text-white" />}
                    </span>
                    {o.label}
                  </button>
                );
              })}
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {q.options.map(o => {
                const selected = qValue === o.value;
                return (
                  <button key={o.value} onClick={() => setAnswer(o.value)}
                    className={`flex items-center gap-3 p-3 rounded-xl border text-sm text-left transition ${selected ? 'border-indigo-500 bg-indigo-50 text-indigo-900 font-semibold' : 'border-gray-200 bg-white hover:border-gray-300 text-gray-700'}`}>
                    <span className={`w-5 h-5 rounded-full border-2 flex items-center justify-center shrink-0 transition ${selected ? 'border-indigo-600 bg-indigo-600' : 'border-gray-300'}`}>
                      {selected && <span className="w-2 h-2 rounded-full bg-white" />}
                    </span>
                    {o.label}
                  </button>
                );
              })}
            </div>
          )}
          {step === 3 && (
            <div className="mt-5 pt-4 border-t border-dashed border-gray-200">
              <label className="block text-sm font-semibold text-gray-800 mb-1.5">
                Your website URL <span className="font-normal text-gray-400">(optional)</span>
              </label>
              <p className="text-xs text-gray-500 mb-2.5">
                Add it and we'll factor in your business model, operations and data flow for even smarter advice.
              </p>
              <input type="url"
                value={website}
                onChange={e => setWebsite(e.target.value)}
                placeholder="https://yourcompany.com"
                className="w-full px-4 py-2.5 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-indigo-500 focus:border-transparent" />
            </div>
          )}
          <div className="mt-5 flex items-center gap-3">
            {step > 0 && <button onClick={goBack} className="px-4 py-2 rounded-lg bg-gray-100 text-gray-600 text-sm font-semibold hover:bg-gray-200">← Back</button>}
            <button onClick={goNext} disabled={!canProceed}
              className={`ml-auto flex items-center gap-2 px-5 py-2 rounded-lg text-sm font-bold transition ${canProceed ? 'bg-indigo-600 text-white hover:bg-indigo-700' : 'bg-gray-200 text-gray-500 cursor-not-allowed'}`}>
              {step === 3 ? 'Show my roadmap' : 'Continue'}
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      {/* Results */}
      {step === 4 && result && (
        <div className="mt-6">
          <p className="text-sm text-gray-600 mb-4">
            Based on your profile, here is your full upskill roadmap — ordered by impact. All relevant frameworks are shown (some are legally required, others are foundational hygiene):
          </p>

          {/* Website-based business insights */}
          {bizInsight && (
            <div className="mb-6 rounded-xl border border-indigo-200 bg-indigo-50 p-4">
              <h5 className="flex items-center gap-2 font-bold text-indigo-900 text-sm mb-2">
                <Shield className="w-4 h-4" /> Read from <span className="font-mono text-xs bg-white px-1.5 py-0.5 rounded">{bizInsight.missUrl}</span>
              </h5>
              <p className="text-sm text-indigo-800 mb-2">
                Based on your business model, operations and data flow, we've adjusted priorities below:
              </p>
              <ul className="space-y-1.5">
                {bizInsight.found.map((f, i) => (
                  <li key={i} className="flex items-start gap-2 text-sm text-indigo-900">
                    <Star className="w-3.5 h-3.5 text-indigo-500 mt-0.5 shrink-0" />
                    <span><strong>{f.cap}</strong> — {f.note}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Priority legend */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mb-6">
            {PRIORITY_META.map(pm => (
              <div key={pm.level} className={`rounded-xl border p-3 ${pm.level === 1 ? 'bg-red-50 border-red-200' : pm.level === 2 ? 'bg-amber-50 border-amber-200' : 'bg-blue-50 border-blue-200'}`}>
                <span className={`text-xs font-bold uppercase tracking-wide ${pm.level === 1 ? 'text-red-700' : pm.level === 2 ? 'text-amber-700' : 'text-blue-700'}`}>{pm.label}</span>
                <p className="text-xs text-gray-600 mt-1">{pm.desc}</p>
              </div>
            ))}
          </div>

          {/* Currency toggle */}
          <div className="flex items-center justify-end mb-4">
            <div className="inline-flex items-center rounded-lg bg-gray-100 p-1">
              {['INR', 'USD'].map(cur => (
                <button key={cur} onClick={() => setCurrency(cur)}
                  className={`px-3 py-1.5 rounded-md text-xs font-bold transition ${currency === cur ? 'bg-indigo-600 text-white shadow' : 'text-gray-600 hover:text-gray-900'}`}>
                  {cur === 'INR' ? '₹ INR' : '$ USD'}
                </button>
              ))}
            </div>
          </div>

          <div className="space-y-4">
            {result.map(({ name, c, priority, score }, idx) => {
              const pm = priorityForLevel(priority);
              const relevance = Math.round((score / 10) * 100);
              return (
                <div key={name} className="rounded-xl border overflow-hidden" style={{ borderColor: c.color + '55' }}>
                  <div className="flex items-center gap-3 p-4" style={{ background: c.color + '0a' }}>
                    <span className="shrink-0 w-9 h-9 rounded-lg text-white text-sm font-bold flex items-center justify-center" style={{ background: c.color }}>
                      {idx + 1}
                    </span>
                    <div className="flex-1 min-w-0">
                      <div className="flex flex-wrap items-center gap-2">
                        <h4 className="font-bold text-gray-900">{name}</h4>
                        <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-white border border-gray-200 text-gray-600">{c.type}</span>
                        {priority === 1 && <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-red-100 text-red-700 border border-red-200 uppercase tracking-wide">Priority · upskill first</span>}
                      </div>
                      <p className="text-sm text-gray-700 mt-1">{c.why}</p>
                      <div className="mt-2 flex items-center gap-2">
                        <div className="w-40 h-1.5 rounded-full bg-gray-200 overflow-hidden">
                          <div className="h-full rounded-full" style={{ width: relevance + '%', background: c.color }} />
                        </div>
                        <span className="text-[11px] text-gray-500 font-medium">Relevance {relevance}%</span>
                      </div>
                    </div>
                  </div>
                  <div className="px-4 py-3 bg-white flex flex-wrap gap-4 text-xs text-gray-600">
                    <span className="inline-flex items-center gap-1.5 font-semibold"><Clock className="w-3.5 h-3.5 text-gray-400" /> {c.timeline}</span>
                    <span className="inline-flex items-center gap-1.5 font-semibold"><DollarSign className="w-3.5 h-3.5 text-gray-400" /> {currency === 'INR' ? c.costINR : c.cost}</span>
                    {c.note && <span className="text-gray-500 italic">💡 {c.note}</span>}
                  </div>
                </div>
              );
            })}
          </div>

          <div className="mt-6 p-4 rounded-xl bg-gray-50 border border-gray-100">
            <h4 className="text-sm font-bold text-gray-800 mb-1">💡 Multi-framework insight</h4>
            <p className="text-xs text-gray-600">Most frameworks share <strong>60–80% of the same underlying controls</strong>. Build one strong baseline (SOC 2 or ISO 27001) first — adding a second framework is mostly a gap-fill exercise, not a ground-up build. That overlap is why pursuing frameworks in priority order is dramatically more efficient.</p>
          </div>

          <button onClick={restart} className="mt-4 px-4 py-2 rounded-lg bg-indigo-100 text-indigo-700 text-sm font-semibold hover:bg-indigo-200 transition">
            ← Re-run with different profile
          </button>
        </div>
      )}
    </div>
  );
}
