import React, { useState } from 'react';
import { ChevronDown, Download } from 'lucide-react';
import { getColorStyles } from '../utils/colorStyles.js';

export function ExpandableCard({ title, subtitle, impact, children, icon: Icon, color }) {
  const [open, setOpen] = useState(false);
  const c = getColorStyles(color);
  return (
    <div className={`group rounded-2xl border ${c.box} overflow-hidden`}>
      <button
        onClick={() => setOpen(!open)}
        className="w-full p-4 flex items-center justify-between gap-4 cursor-pointer list-none hover:bg-surface-2 dark:hover:bg-surface-3"
        aria-expanded={open}
      >
        <div className="flex items-center gap-3 min-w-0">
          <span className={`shrink-0 w-2.5 h-2.5 rounded-full ${c.dot}`} />
          <span className="font-semibold text-primary leading-snug">{title}</span>
        </div>
        <div className="flex items-center gap-2">
          <span className={`shrink-0 inline-flex items-center gap-1 text-[10px] font-bold uppercase tracking-wide px-2 py-0.5 rounded-full border ${
            impact === 'Critical' 
              ? 'bg-red-50 border-red-200 text-red-700 dark:bg-red-900/30 dark:text-red-400 dark:border-red-800/30' 
              : 'bg-amber-50 border-amber-200 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400 dark:border-amber-800/30'
          }`}>
            {impact}
          </span>
          <ChevronDown className={`w-5 h-5 text-muted transition-transform ${open ? 'rotate-180' : ''}`} />
        </div>
      </button>
      {open && (
        <div className="px-4 pb-4 space-y-3 animate-in slide-in-from-top-2 duration-200">
          {children}
        </div>
      )}
    </div>
  );
}