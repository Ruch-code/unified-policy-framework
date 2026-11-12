import { useEffect, useRef, useState } from 'react';
import { parseCoachReply } from '../utils/coachReply.js';

const ROLES = ['GRC Analyst', 'Senior GRC Engineer', 'IT Auditor', 'Third-Party Risk Analyst', 'Information Security Manager', 'Privacy Analyst', 'AI Governance Specialist', 'Technology Risk Manager', 'SOX / ITGC Auditor'];
const LEVELS = ['Entry-level', 'Mid-level', 'Senior', 'Lead / Manager'];
const FOCUS = ['A balanced mix', 'Technical: frameworks and controls', 'Scenario: audits and findings', 'Behavioural and stakeholder management', 'Vendor risk', 'AI governance and privacy'];
const KEY = 'onelens_interview_coach';

const FIELD = 'w-full px-3 py-2 border border-slate-300 dark:border-[#334155] rounded text-sm bg-white dark:bg-[#0f172a] text-slate-900 dark:text-[#f8fafc]';
const BTN = 'px-3 py-2 rounded text-xs font-semibold border border-slate-300 dark:border-[#334155] text-slate-700 dark:text-[#cbd5e1] disabled:opacity-50';
const PRIMARY = 'px-3 py-2 rounded text-xs font-semibold bg-[#344c67] text-white disabled:opacity-50';

async function callCoach(query, history, interview) {
  const token = (() => { try { return localStorage.getItem('compliance_token'); } catch { return null; } })();
  const c = new AbortController();
  const t = setTimeout(() => c.abort(), 30000);
  try {
    const res = await fetch('/api/gemini', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', ...(token ? { Authorization: `Bearer ${token}` } : {}) },
      body: JSON.stringify({ query, history, mode: 'interview', interview }),
      signal: c.signal,
    });
    if (res.status === 401) return { error: 'Please sign in to use interview practice.' };
    if (res.status === 429) return { error: 'You have reached the usage limit for now. Please try again later.' };
    if (!res.ok) return { error: 'The interviewer is unavailable right now. Please try again in a moment.' };
    const data = await res.json();
    return data.answer ? { text: data.answer } : { error: 'No reply received. Please try again.' };
  } catch { return { error: 'The request timed out. Please try again.' }; } finally { clearTimeout(t); }
}

function CoachMessage({ text }) {
  return (
    <div className="space-y-2">
      {parseCoachReply(text).map((p, i) => {
        const model = p.label.startsWith('What to say');
        const next = p.label === 'Next question';
        return (
          <div key={i} className={`${model ? 'border border-slate-300 dark:border-[#334155] rounded p-2 bg-slate-50 dark:bg-[#0f172a]' : ''} ${next ? 'pt-2 border-t border-slate-200 dark:border-[#334155]' : ''}`}>
            {p.label && <p className="text-[11px] font-semibold uppercase tracking-wide text-slate-500 dark:text-[#94a3b8]">{p.label}</p>}
            <p className={`whitespace-pre-wrap leading-relaxed ${next ? 'font-semibold' : ''}`}>{p.body}</p>
          </div>
        );
      })}
    </div>
  );
}

export default function InterviewCoach() {
  const saved = (() => { try { return JSON.parse(sessionStorage.getItem(KEY)) || {}; } catch { return {}; } })();
  const [setup, setSetup] = useState(saved.setup || { role: ROLES[0], level: LEVELS[1], focus: FOCUS[0] });
  const [msgs, setMsgs] = useState(saved.msgs || []);
  const [done, setDone] = useState(!!saved.done);
  const [text, setText] = useState('');
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState('');
  const scrollRef = useRef(null);

  useEffect(() => { try { sessionStorage.setItem(KEY, JSON.stringify({ setup, msgs: msgs.slice(-40), done })); } catch { /* storage unavailable */ } }, [setup, msgs, done]);
  useEffect(() => { scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight }); }, [msgs, busy]);

  const send = async (content, shown) => {
    if (busy) return;
    setError('');
    setBusy(true);
    const history = msgs.map((m) => ({ role: m.role, content: m.content }));
    if (shown) setMsgs((m) => [...m, { role: 'user', content, shown }]);
    const r = await callCoach(content, history, setup);
    setBusy(false);
    if (r.error) { setError(r.error); if (shown) setMsgs((m) => m.slice(0, -1)); return false; }
    setMsgs((m) => [...(shown ? m : [...m, { role: 'user', content, hidden: true }]), { role: 'assistant', content: r.text }]);
    return true;
  };

  const start = () => { setMsgs([]); setDone(false); send('START'); };
  const answer = async () => { const v = text.trim(); if (v.length < 3) return; setText(''); const ok = await send(v, v); if (!ok) setText(v); };
  const skip = () => send('SKIP. I do not know this one. Please show me what to say.', 'I am not sure. Show me what to say.');
  const finish = async () => { if (await send('FINISH', 'End the interview and give me my debrief.')) setDone(true); };
  const reset = () => { setMsgs([]); setDone(false); setError(''); };

  if (!msgs.length && !busy) {
    return (
      <div className="h-full overflow-y-auto p-4 space-y-3 text-sm text-slate-900 dark:text-[#f8fafc]">
        <p className="font-semibold">Interview practice</p>
        <p className="text-slate-600 dark:text-[#94a3b8]">The interviewer asks one question at a time. After each answer you get a score, what worked, what to improve, and a model answer showing what to say. Questions follow up on your earlier answers.</p>
        <label className="block"><span className="text-xs font-semibold">Role</span>
          <input list="coach-roles" value={setup.role} onChange={(e) => setSetup({ ...setup, role: e.target.value })} className={FIELD} aria-label="Role you are interviewing for" />
          <datalist id="coach-roles">{ROLES.map((r) => <option key={r} value={r} />)}</datalist>
        </label>
        <label className="block"><span className="text-xs font-semibold">Level</span>
          <select value={setup.level} onChange={(e) => setSetup({ ...setup, level: e.target.value })} className={FIELD}>{LEVELS.map((l) => <option key={l}>{l}</option>)}</select>
        </label>
        <label className="block"><span className="text-xs font-semibold">Focus</span>
          <select value={setup.focus} onChange={(e) => setSetup({ ...setup, focus: e.target.value })} className={FIELD}>{FOCUS.map((f) => <option key={f}>{f}</option>)}</select>
        </label>
        {error && <p role="alert" className="text-xs text-red-700 dark:text-red-300">{error}</p>}
        <button type="button" onClick={start} disabled={!setup.role.trim()} className={PRIMARY}>Start interview</button>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-full min-h-0 p-3">
      <div ref={scrollRef} role="log" aria-live="polite" className="flex-1 min-h-0 overflow-y-auto space-y-3 pr-1 text-sm text-slate-900 dark:text-[#f8fafc]">
        {msgs.filter((m) => !m.hidden).map((m, i) => (
          m.role === 'user'
            ? <div key={i} className="ml-8 p-2 rounded bg-[#e8edf3] dark:bg-[#1f2e40] whitespace-pre-wrap">{m.shown || m.content}</div>
            : <div key={i} className="mr-4 p-2 rounded border border-slate-200 dark:border-[#334155]"><CoachMessage text={m.content} /></div>
        ))}
        {busy && <p className="text-xs text-slate-500 dark:text-[#94a3b8]">The interviewer is thinking...</p>}
      </div>
      {error && <p role="alert" className="mt-2 text-xs text-red-700 dark:text-red-300">{error}</p>}
      {done ? (
        <div className="mt-3 shrink-0"><button type="button" onClick={reset} className={PRIMARY}>Start a new interview</button></div>
      ) : (
        <form onSubmit={(e) => { e.preventDefault(); answer(); }} className="mt-3 shrink-0 space-y-2">
          <textarea value={text} onChange={(e) => setText(e.target.value)} rows={3} placeholder="Type your answer as you would say it in the interview" aria-label="Your answer" className={FIELD}
            onKeyDown={(e) => { if (e.key === 'Enter' && (e.metaKey || e.ctrlKey)) { e.preventDefault(); answer(); } }} />
          <div className="flex flex-wrap gap-2">
            <button type="submit" disabled={busy || text.trim().length < 3} className={PRIMARY}>Submit answer</button>
            <button type="button" onClick={skip} disabled={busy} className={BTN}>Show me what to say</button>
            <button type="button" onClick={finish} disabled={busy} className={BTN}>End and get debrief</button>
            <button type="button" onClick={reset} disabled={busy} className={BTN}>Restart</button>
          </div>
        </form>
      )}
    </div>
  );
}
