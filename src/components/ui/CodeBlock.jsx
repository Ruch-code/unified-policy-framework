import React, { useState } from 'react';

export default function CodeBlock({ code, title = 'code', lang = '', className = '' }) {
  const [copied, setCopied] = useState(false);
  const copy = async () => {
    try {
      await navigator.clipboard.writeText(code);
      setCopied(true);
      setTimeout(() => setCopied(false), 1400);
    } catch {
      setCopied(false);
    }
  };

  return (
    <div className={`rounded-xl border border-slate-700/80 bg-slate-950 overflow-hidden ${className}`}>
      <div className="flex items-center justify-between gap-3 px-4 py-2 bg-slate-900 border-b border-slate-800">
        <div className="flex items-center gap-2 min-w-0">
          <span className="w-2.5 h-2.5 rounded-full bg-red-400/80 shrink-0" aria-hidden="true" />
          <span className="w-2.5 h-2.5 rounded-full bg-amber-300/80 shrink-0" aria-hidden="true" />
          <span className="w-2.5 h-2.5 rounded-full bg-emerald-400/80 shrink-0" aria-hidden="true" />
          <span className="ml-2 text-xs font-semibold text-slate-300 truncate">{title}</span>
          {lang && (
            <span className="shrink-0 text-[10px] font-bold uppercase tracking-wide px-1.5 py-0.5 rounded bg-slate-800 text-slate-400">
              {lang}
            </span>
          )}
        </div>
        <button
          type="button"
          onClick={copy}
          className="shrink-0 inline-flex items-center gap-1 text-xs font-semibold px-2.5 py-1 rounded-md bg-slate-800 hover:bg-slate-700 text-slate-200 transition-colors"
          aria-label={copied ? `Copied ${title}` : `Copy ${title}`}
        >
          {copied ? 'Copied' : 'Copy'}
        </button>
      </div>
      <pre className="grc-codeblock p-4 max-h-[420px]" tabIndex="0" aria-label={`${title} source code`}>
        <code className="font-mono">{code}</code>
      </pre>
    </div>
  );
}