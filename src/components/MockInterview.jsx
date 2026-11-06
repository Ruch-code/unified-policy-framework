import { useMemo, useState } from 'react';
import { Mic, Square, Volume2, Loader2 } from 'lucide-react';
import { useSpeechInput, speak, stopSpeaking, canListen, VOICE_NOTICE } from '../utils/voice.js';

const BTN = 'inline-flex items-center gap-2 px-3 py-2 rounded-lg text-xs font-bold border focus:outline-none focus-visible:ring-2 focus-visible:ring-violet-400';
const PRIMARY = `${BTN} bg-violet-600 text-white border-violet-600`;
const PLAIN = `${BTN} border-slate-300 dark:border-slate-600 text-slate-700 dark:text-slate-200`;

async function getFeedback(q, answer) {
  const query = `Act as a senior GRC interviewer. Give feedback on this spoken mock interview answer in under 120 words of plain text, for reading aloud: what was strong, what was missing, and one improvement. Do not invent facts about the candidate.\nQuestion: ${q.q}\nModel answer for reference: ${q.a}\nCandidate answer: ${answer}`;
  const c = new AbortController();
  const t = setTimeout(() => c.abort(), 15000);
  try {
    const res = await fetch('/api/gemini', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ query }), signal: c.signal });
    if (!res.ok) return '';
    return (await res.json()).answer || '';
  } catch { return ''; } finally { clearTimeout(t); }
}

export default function MockInterview({ roles }) {
  const [roleId, setRoleId] = useState(roles[0]?.id);
  const [step, setStep] = useState(0);
  const [typed, setTyped] = useState('');
  const [fb, setFb] = useState(null);
  const [busy, setBusy] = useState(false);
  const pool = useMemo(() => roles.find((r) => r.id === roleId)?.questions || [], [roles, roleId]);
  const q = pool[step % (pool.length || 1)];
  const voice = useSpeechInput({ continuous: true, onFinal: (t) => setTyped(t) });
  const shown = voice.listening ? voice.transcript : typed;
  const review = async () => {
    setBusy(true);
    const text = await getFeedback(q, typed);
    setFb(text || 'AI feedback is unavailable right now. Compare your answer with the model answer below.');
    setBusy(false);
    if (text) speak(text);
  };
  const next = () => { stopSpeaking(); setStep((s) => s + 1); setTyped(''); setFb(null); };
  if (!q) return null;
  return (
    <section id="mock-interview" className="rounded-2xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900/60 p-4 md:p-6 mb-6 scroll-mt-24">
      <h2 className="text-lg font-bold text-slate-900 dark:text-white">Voice mock interview</h2>
      <p className="text-xs text-slate-600 dark:text-slate-300 mb-3">Hear a question, answer aloud or by typing, and get feedback. {VOICE_NOTICE}</p>
      <label className="text-xs text-slate-700 dark:text-slate-200">Role{' '}
        <select value={roleId} onChange={(e) => { setRoleId(e.target.value); setStep(0); setTyped(''); setFb(null); }} className="rounded-lg border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-900 px-2 py-1.5 max-w-full">
          {roles.map((r) => <option key={r.id} value={r.id}>{r.title}</option>)}
        </select></label>
      <p className="mt-3 text-sm font-semibold text-slate-900 dark:text-white">Question {(step % pool.length) + 1} of {pool.length}: {q.q}</p>
      <div className="flex flex-wrap gap-2 mt-2">
        <button type="button" className={PLAIN} onClick={() => speak(q.q)}><Volume2 className="w-4 h-4" aria-hidden="true" /> Read question</button>
        {canListen() && (voice.listening
          ? <button type="button" className={PRIMARY} onClick={voice.stop}><Square className="w-4 h-4" aria-hidden="true" /> Stop answering</button>
          : <button type="button" className={PRIMARY} onClick={voice.start}><Mic className="w-4 h-4" aria-hidden="true" /> Answer by voice</button>)}
      </div>
      {voice.error && <p role="alert" className="text-xs text-red-700 dark:text-red-300 mt-2">{voice.error}</p>}
      <textarea aria-label="Your answer" rows={4} value={shown} readOnly={voice.listening} onChange={(e) => setTyped(e.target.value)} placeholder="Your answer appears here. You can also type or edit it." className="w-full mt-2 rounded-lg border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-900 text-sm text-slate-900 dark:text-white p-2" />
      <div className="flex flex-wrap gap-2 mt-2">
        <button type="button" className={PRIMARY} disabled={busy || voice.listening || typed.trim().length < 3} onClick={review}>{busy && <Loader2 className="w-4 h-4 animate-spin" aria-hidden="true" />} Get feedback</button>
        <button type="button" className={PLAIN} onClick={next}>Next question</button>
      </div>
      {fb && <div aria-live="polite" className="mt-3 text-sm text-slate-800 dark:text-slate-200 space-y-2"><p className="whitespace-pre-wrap">{fb}</p>
        <details><summary className="cursor-pointer font-semibold">Model answer</summary><p className="whitespace-pre-wrap mt-1 text-xs">{q.a}</p></details></div>}
    </section>
  );
}
