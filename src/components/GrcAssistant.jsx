import { useRef, useState } from 'react';
import { Send, Sparkles, Loader2 } from 'lucide-react';
import { askGrcAssistant } from '../data/grcAssistant';
import { FRAMEWORK_KB } from '../data/grcKnowledgeBase';

function AnswerView({ answer }) {
  const rec = answer?.recommendation;
  return (
    <div className="text-sm text-gray-700 space-y-3">
      {answer.summary && <p className="font-semibold text-gray-900">{answer.summary}</p>}
      {rec && (
        <div className="rounded-xl bg-indigo-50 border border-indigo-200 p-4">
          <h5 className="text-xs font-bold uppercase tracking-wide text-indigo-700 mb-2 flex items-center gap-1.5"><Sparkles className="w-3.5 h-3.5" /> Wise Advisor — what to do next</h5>
          <ol className="space-y-2">
            {rec.steps.map((s, i) => (
              <li key={i} className="flex items-start gap-2 text-sm">
                <span className="w-5 h-5 rounded-full bg-indigo-600 text-white text-xs flex items-center justify-center font-bold shrink-0 mt-0.5">{i + 1}</span>
                <div>
                  <p className="font-semibold text-gray-900">{s.title}</p>
                  <p className="text-xs text-gray-500 mt-0.5">{s.why}</p>
                </div>
              </li>
            ))}
          </ol>
          {rec.nextSteps && rec.nextSteps.length > 0 && (
            <div className="mt-3 pt-3 border-t border-indigo-100">
              <p className="text-[11px] font-semibold text-indigo-600 uppercase tracking-wide mb-1.5">Quick steps</p>
              <div className="flex flex-wrap gap-1.5">
                {rec.nextSteps.slice(0, 4).map((s, i) => (
                  <span key={i} className="text-[11px] font-medium px-2 py-1 rounded-full bg-white border border-indigo-200 text-indigo-800">{s}</span>
                ))}
              </div>
            </div>
          )}
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
      {answer.sections.map((s, i) => (
        <div key={i} className="rounded-xl bg-slate-50 border border-slate-200 p-3">
          <h5 className="text-xs font-bold uppercase tracking-wide text-slate-500 mb-1">{s.heading}</h5>
          {s.why && <p className="text-[11px] text-indigo-600 mb-1.5">{s.why}</p>}
          <div className="space-y-1">
            {s.bullets.map((b, j) => (
              <p key={j} className="whitespace-pre-wrap leading-relaxed text-xs">{b}</p>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}

export default function GrcAssistant({ compact = false }) {
  const [query, setQuery] = useState('');
  const [history, setHistory] = useState([]);
  const [thinking, setThinking] = useState(false);
  const scrollRef = useRef(null);

  const ask = (text) => {
    const value = (text ?? query).trim();
    if (!value) return;
    setHistory(h => [...h, { role: 'user', text: value }]);
    setQuery('');
    setThinking(true);
    setTimeout(() => {
      const answer = askGrcAssistant(value);
      setHistory(h => [...h, { role: 'assistant', answer }]);
      setThinking(false);
      setTimeout(() => scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: 'smooth' }), 50);
    }, 250);
  };

  const suggestions = (history.length ? history[history.length - 1]?.answer?.suggestions : null) || [];

  return (
    <div className="flex flex-col h-full">
      {/* Scrolling chat area */}
      <div ref={scrollRef} className={`flex-1 overflow-y-auto pr-1 space-y-3 ${compact ? 'max-h-[420px]' : 'max-h-[560px]'}`}>
        <div className="text-center py-6">
          <span className="inline-flex items-center gap-2 text-[#7c3aed] bg-indigo-50 px-3 py-1.5 rounded-full font-semibold text-sm">
            <Sparkles className="w-4 h-4" /> GRC Knowledge Assistant
          </span>
          <p className="text-xs text-gray-500 mt-2 max-w-md mx-auto">
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
              <div className="max-w-[92%] bg-white border border-gray-200 rounded-2xl rounded-bl-md px-4 py-3 w-full">
                <AnswerView answer={m.answer} />
              </div>
            </div>
          )
        )}

        {thinking && (
          <div className="flex items-center gap-2 text-sm text-gray-500">
            <Loader2 className="w-4 h-4 animate-spin" /> Advising from the knowledge base…
          </div>
        )}

        {/* Suggested questions */}
        {suggestions.length > 0 && !thinking && (
          <div className="pt-2">
            <p className="text-[11px] font-semibold text-gray-400 uppercase tracking-wide mb-1.5">Try asking</p>
            <div className="flex flex-wrap gap-1.5">
              {suggestions.filter((_, idx) => idx < 4).map((s, j) => (
                <button key={j} onClick={() => ask(s)}
                  className="text-xs text-[#7c3aed] bg-indigo-50 hover:bg-indigo-100 px-2.5 py-1.5 rounded-full border border-indigo-100 transition text-left">
                  {s}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Compact starter chips */}
      <div className="mt-3 flex flex-wrap gap-1.5 pt-3 border-t border-gray-100">
        {histStarter(history, ask)}
      </div>

      {/* Input */}
      <form onSubmit={e => { e.preventDefault(); ask(); }} className="mt-3 flex items-center gap-2">
        <input
          value={query}
          onChange={e => setQuery(e.target.value)}
          placeholder="e.g. Common audit observations in SOC 2…"
          className="flex-1 px-4 py-2.5 border border-gray-300 rounded-xl text-sm focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
        />
        <button type="submit" disabled={thinking || !query.trim()}
          className="w-11 h-11 flex items-center justify-center rounded-xl bg-indigo-600 text-white hover:bg-indigo-700 disabled:opacity-50 transition">
          <Send className="w-4 h-4" />
        </button>
      </form>
    </div>
  );
}

function histStarter(history, ask) {
  const starters = [
    'Common audit observations in PCI DSS',
    'How to push back on a finding',
    'Contract clauses for a vendor',
    'Where do HIPAA and GDPR conflict?',
    'Access management across frameworks',
  ];
  return starters.map((s, i) => (
    <button key={i} onClick={() => ask(s)}
      className={`text-xs px-2.5 py-1.5 rounded-full border transition ${history.length ? 'text-gray-500 border-gray-200 hover:bg-gray-100' : 'text-[#7c3aed] bg-indigo-50 border-indigo-100 hover:bg-indigo-100'}`}>
      {s}
    </button>
  ));
}