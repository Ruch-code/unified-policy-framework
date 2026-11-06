import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { LinkedText } from '../utils/controlLinks.jsx';
import { Send, Sparkles, Loader2, AlertTriangle, Mic, Square, Volume2, VolumeX } from 'lucide-react';
import { useSpeechInput, speak, stopSpeaking, canListen, canSpeak, VOICE_NOTICE } from '../utils/voice.js';
import { replyStructured } from '../data/grcAssistant.js';
import { retrieve } from '../data/retrieval.js';
import { FRAMEWORK_KB } from '../data/grcKnowledgeBase.js';

const STARTERS = [
  'Common audit observations in PCI DSS',
  'How to push back on a finding',
  'Contract clauses for a vendor',
  'Where do HIPAA and GDPR conflict?',
  'Access management across frameworks',
];

function AnswerView({ answer }) {
  const steps = answer.steps || [];
  const discrepancies = answer.discrepancies || [];
  const quickActions = answer.quick_actions || [];
  const hasLegacyDetail = answer.sections?.length > 0;
  const source = answer.built_from || 'kb';

  return (
    <div className="text-sm text-slate-900 dark:text-[#f8fafc] space-y-3">
      {answer.summary && (
        <p className={`${source === 'gemini-rag' ? 'whitespace-pre-wrap' : 'font-semibold'} text-slate-900 dark:text-white leading-relaxed`}><LinkedText text={answer.summary} /></p>
      )}

      {source === 'local-rag-fallback' && (
        <p className="text-xs text-amber-700 dark:text-amber-300">The AI service was unavailable, so this answer comes from OneLens content only.</p>
      )}

      {answer.related?.length > 0 && (
        <p className="text-xs text-slate-600 dark:text-[#94a3b8]">On OneLens: {answer.related.map((x, i) => <span key={x.href + i}>{i > 0 && ', '}<Link className="underline" to={x.href}>{x.label}</Link></span>)}</p>
      )}

      {answer.sources?.length > 0 && (
        <p className="text-xs text-slate-600 dark:text-[#94a3b8]">From the web: {answer.sources.map((x, i) => <span key={x.uri}>{i > 0 && ', '}<a className="underline" href={x.uri} target="_blank" rel="noopener noreferrer">{x.title}</a></span>)}</p>
      )}

      {/* Structured steps - Wise Advisor */}
      {steps.length > 0 && (
        <div className="rounded-xl bg-indigo-50 border border-indigo-200 p-4 dark:bg-[#1e1b4b] dark:border-[#3730a3] dark:hover:bg-[#312e81]">
          <h5 className="text-xs font-bold uppercase tracking-wide text-indigo-800 dark:text-[#c4b5fd] mb-2 flex items-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5" /> Wise Advisor - what to do next
          </h5>
          <ol className="space-y-2.5">
            {steps.map(s => (
              <li key={s.number} className="flex items-start gap-2.5">
                <span className="w-5 h-5 rounded-full bg-indigo-600 text-white text-xs flex items-center justify-center font-bold shrink-0 mt-0.5">
                  {s.number}
                </span>
                <div>
<p className="font-bold text-slate-900 dark:text-[#f8fafc] leading-snug">{s.title}</p>
                    {s.description && <p className="text-xs text-slate-700 dark:text-[#cbd5e1] mt-0.5 leading-relaxed">{s.description}</p>}
                </div>
              </li>
            ))}
          </ol>
        </div>
      )}

      {/* Structured discrepancies */}
      {discrepancies.length > 0 && (
        <div className="rounded-xl bg-amber-50 border border-amber-300 p-3.5 dark:bg-[#451a03]/40 dark:border-[#78350f]">
          <h5 className="text-xs font-bold uppercase tracking-wide text-amber-900 dark:text-[#fcd34d] mb-1.5 flex items-center gap-1.5">
            <AlertTriangle className="w-3.5 h-3.5" /> Cross-framework discrepancies
          </h5>
          <ul className="space-y-2">
            {discrepancies.map((d, i) =>
              typeof d === 'string' ? (
                <li key={i} className="text-xs text-slate-800 dark:text-[#cbd5e1] whitespace-pre-wrap leading-relaxed">{d}</li>
              ) : (
                <li key={i} className="text-xs text-slate-800 dark:text-[#cbd5e1] leading-relaxed">
                  {d.key && <span className="inline-flex items-center gap-1 px-1.5 py-0.5 rounded bg-amber-200 text-amber-950 font-bold uppercase text-[10px] mb-1 dark:bg-[#78350f] dark:text-[#fef3c7]">{d.key}</span>}
                  {d.requirement && (
                    <p className="mt-0.5"><span className="font-bold text-slate-900 dark:text-[#f8fafc]">Requirement:</span> {d.requirement}</p>
                  )}
                  {d.found && (
                    <p><span className="font-bold text-slate-900 dark:text-[#f8fafc]">Found:</span> {d.found}</p>
                  )}
                  {d.action && (
                    <p><span className="font-bold text-slate-900 dark:text-[#f8fafc]">Action:</span> {d.action}</p>
                  )}
                  {(d.key || d.requirement || d.found || d.action) ? null : <span className="whitespace-pre-wrap">{JSON.stringify(d)}</span>}
                </li>
              )
            )}
          </ul>
        </div>
      )}

      {/* Structured quick actions */}
      {quickActions.length > 0 && (
        <div>
          <p className="text-[11px] font-bold text-slate-600 dark:text-[#94a3b8] uppercase tracking-wide mb-1.5">Quick actions</p>
          <div className="flex flex-wrap gap-1.5">
            {quickActions.map((a, i) => (
              <span key={i} className="text-[11px] font-semibold px-2.5 py-1 rounded-full bg-white border border-slate-300 text-slate-800 dark:bg-[#1e293b] dark:border-[#334155] dark:text-[#cbd5e1]">
                {a}
              </span>
            ))}
          </div>
        </div>
      )}

      {answer.frameworks && answer.frameworks.length > 0 && (
        <div className="flex flex-wrap gap-1.5">
          {answer.frameworks.map(f => {
            const fw = FRAMEWORK_KB[f];
            return (
              <span key={f} className="text-[11px] font-bold px-2 py-0.5 rounded-full text-white" style={{ background: fw.color }}>
                {fw.name}
              </span>
            );
          })}
        </div>
      )}

      {hasLegacyDetail && (
        <details className="rounded-xl bg-slate-50 border border-slate-200 p-3 group dark:bg-[#1e293b] dark:border-[#334155]">
          <summary className="text-xs font-bold uppercase tracking-wide text-slate-700 dark:text-[#94a3b8] cursor-pointer select-none">Knowledge-base detail</summary>
          <div className="mt-2 space-y-3">
            {answer.sections.map((s, i) => (
              <div key={i}>
                <h5 className="text-xs font-bold uppercase tracking-wide text-slate-700 dark:text-[#94a3b8] mb-1">{s.heading}</h5>
                {s.why && <p className="text-[11px] text-indigo-700 dark:text-[#a5b4fc] mb-1.5">{s.why}</p>}
                <div className="space-y-1">
                  {s.bullets.map((b, j) => (
                    <p key={j} className="whitespace-pre-wrap leading-relaxed text-xs text-slate-800 dark:text-[#cbd5e1]">{b}</p>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </details>
      )}

      <p className="text-[10px] text-slate-400 dark:text-[#64748b] uppercase tracking-wide">
        {source === 'gemini-rag' ? 'Answered via retrieval-augmented advisor' : source === 'local-rag' || source === 'local-rag-fallback' ? 'Answered from locally indexed playbooks' : 'Knowledge-base'}
      </p>
    </div>
  );
}

const CHAT_KEY = 'onelens-grc-assistant-chat';

export default function GrcAssistant({ compact = false }) {
  const [query, setQuery] = useState('');
  const [history, setHistory] = useState(() => { try { return JSON.parse(sessionStorage.getItem(CHAT_KEY)) || []; } catch { return []; } });
  useEffect(() => { try { sessionStorage.setItem(CHAT_KEY, JSON.stringify(history.slice(-30))); } catch { /* storage unavailable */ } }, [history]);
  const [thinking, setThinking] = useState(false);
  const scrollRef = useRef(null);
  const [voiceReplies, setVoiceReplies] = useState(false);
  const voice = useSpeechInput({ onFinal: (t) => ask(t) });

  const ask = async (text) => {
    const value = (text ?? query).trim();
    if (!value) return;
    setHistory(h => [...h, { role: 'user', text: value }]);
    setQuery('');
    setThinking(true);
    try {
      // Local RAG retrieval - top control mappings from the playbook index.
      const context = retrieve(value, 5);
      // Last 5 turns, for conversational continuity (kept out of the answer body).
      const turns = history.slice(-5).map(m =>
        m.role === 'user'
          ? { role: 'user', content: m.text }
          : { role: 'assistant', content: m.answer?.summary || 'I answered earlier in this chat.' },
      );
      const reply = await replyStructured(value, { context, history: turns, useRemote: true });
      const seen = new Set();
      const related = context.filter(c => c.href && !seen.has(c.href) && seen.add(c.href)).slice(0, 3).map(c => ({ href: c.href, label: c.label }));
      const answer = { ...reply, related };
      setHistory(h => [...h, { role: 'assistant', answer }]);
      if (voiceReplies) speak([answer.summary, ...(answer.steps || []).slice(0, 3).map(s => s.title)].filter(Boolean).join('. '));
    } catch {
      setHistory(h => [...h, { role: 'assistant', answer: { summary: 'Something went wrong - please try again.', steps: [], discrepancies: [], quick_actions: [] } }]);
    }
    setThinking(false);
    setTimeout(() => scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: 'smooth' }), 50);
  };

  const suggestions = (history.length ? history[history.length - 1]?.answer?.suggestions : null) || [];

  return (
    <div className="flex flex-col h-full min-h-0">
      {/* Scrolling chat area - single scroll context, header/input pinned outside */}
      <div ref={scrollRef} role="log" aria-live="polite" className="flex-1 min-h-0 overflow-y-auto pr-1 space-y-3" style={{ minHeight: compact ? 0 : 420 }}>
        <div className="text-center py-6">
          <span className="inline-flex items-center gap-2 text-[#7c3aed] bg-indigo-50 px-3 py-1.5 rounded-full font-semibold text-sm dark:bg-[#1e1b4b] dark:border-[#3730a3] dark:hover:bg-[#312e81] dark:text-[#c4b5fd] border dark:border-[#3730a3]">
            <Sparkles className="w-4 h-4" /> GRC Knowledge Assistant
          </span>
          <p className="text-xs text-slate-600 dark:text-[#94a3b8] mt-2 max-w-md mx-auto">
            Ask about policies, controls, audit findings, GRC pushback, vendor contract clauses, or framework conflicts.
          </p>
        </div>

        {history.map((m, i) =>
          m.role === 'user' ? (
            <div key={i} className="flex justify-end">
              <div className="max-w-[85%] bg-indigo-600 text-white rounded-2xl rounded-br-md px-4 py-2.5 text-sm whitespace-pre-wrap">{m.text}</div>
            </div>
          ) : (
            <div key={i} className="flex justify-start">
              <div className="max-w-[92%] bg-white border border-slate-200 rounded-2xl rounded-bl-md px-4 py-3 w-full dark:bg-[#1e293b] dark:border-[#334155]">
                <AnswerView answer={m.answer} />
              </div>
            </div>
          ),
        )}

        {thinking && (
          <div role="status" className="flex items-center gap-2 text-sm text-slate-600 dark:text-[#94a3b8]">
            <Loader2 className="w-4 h-4 animate-spin" aria-hidden="true" /> Retrieving control mappings and advising…
          </div>
        )}

        {/* Follow-up suggestions - single source, only after an answer */}
        {suggestions.length > 0 && !thinking && (
          <div className="pt-2">
            <p className="text-[11px] font-bold text-slate-600 dark:text-[#94a3b8] uppercase tracking-wide mb-1.5">Try asking</p>
            <div className="flex flex-wrap gap-1.5">
              {suggestions.slice(0, 4).map((s, j) => (
                <button key={j} onClick={() => ask(s)}
                  className="text-xs font-semibold text-[#6d28d9] bg-indigo-50 hover:bg-indigo-100 px-2.5 py-1.5 rounded-full border border-indigo-200 transition text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 dark:bg-[#1e1b4b] dark:border-[#3730a3] dark:hover:bg-[#312e81] dark:text-[#c4b5fd]">
                  {s}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>

      {history.length > 0 && !thinking && (
        <button type="button" onClick={() => { stopSpeaking(); setHistory([]); }} className="mt-2 self-start text-xs text-slate-600 dark:text-[#94a3b8] underline">New chat</button>
      )}

      {/* Starter chips - shown only before the first exchange (no duplication with suggestions) */}
      {history.length === 0 && (
        <div className="mt-3 pt-3 border-t border-slate-200 dark:border-[#334155] shrink-0">
          <div className="flex gap-2 overflow-x-auto pb-1 -mx-1 px-1">
            {STARTERS.map((s, i) => (
              <button key={i} onClick={() => ask(s)}
                className={`shrink-0 text-xs px-2.5 py-1.5 rounded-full border transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 ${
                  history.length ? 'text-slate-600 dark:text-[#94a3b8] border-slate-300 dark:border-[#334155] hover:bg-slate-100 dark:hover:bg-[#1e293b]' : 'text-[#6d28d9] bg-indigo-50 border-indigo-200 hover:bg-indigo-100 dark:bg-[#1e1b4b] dark:border-[#3730a3] dark:hover:bg-[#312e81] dark:text-[#c4b5fd]'
                }`}>
                {s}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Input - pinned, never participates in the scroll area */}
      {voice.error && <p role="alert" className="mt-2 text-xs text-red-700 dark:text-red-300">{voice.error}</p>}
      {canListen() && <p className="mt-2 text-[10px] text-slate-500 dark:text-[#94a3b8]">{VOICE_NOTICE}</p>}
      <form onSubmit={e => { e.preventDefault(); ask(); }} className="mt-3 flex items-center gap-2 shrink-0">
        <input
          value={voice.listening ? voice.transcript : query}
          onChange={e => setQuery(e.target.value)}
          placeholder="e.g. Common audit observations in SOC 2…"
          aria-label="Ask the GRC advisor"
          className="flex-1 px-4 py-2.5 border border-slate-300 dark:border-[#334155] rounded-xl text-sm text-slate-900 dark:text-[#f8fafc] placeholder:text-slate-400 dark:placeholder:text-[#64748b] focus:ring-2 focus:ring-indigo-500 focus:border-transparent focus-visible:outline-none"
        />
        {canSpeak() && (
          <button type="button" aria-pressed={voiceReplies} aria-label="Read answers aloud" onClick={() => { if (voiceReplies) stopSpeaking(); setVoiceReplies(!voiceReplies); }}
            className="w-11 h-11 flex items-center justify-center rounded-xl border border-slate-300 dark:border-[#334155] text-slate-700 dark:text-[#cbd5e1] shrink-0">
            {voiceReplies ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4" />}
          </button>
        )}
        {canListen() && (
          <button type="button" aria-label={voice.listening ? 'Stop listening' : 'Ask by voice'} onClick={voice.listening ? voice.stop : voice.start}
            className="w-11 h-11 flex items-center justify-center rounded-xl border border-slate-300 dark:border-[#334155] text-slate-700 dark:text-[#cbd5e1] shrink-0">
            {voice.listening ? <Square className="w-4 h-4" /> : <Mic className="w-4 h-4" />}
          </button>
        )}
        <button type="submit" disabled={thinking || !query.trim()}
          className="w-11 h-11 flex items-center justify-center rounded-xl bg-indigo-600 text-white hover:bg-indigo-700 disabled:opacity-50 transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 focus-visible:ring-offset-2"
          aria-label="Send message">
          <Send className="w-4 h-4" />
        </button>
      </form>
    </div>
  );
}