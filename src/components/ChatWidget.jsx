import { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { X, MessageSquare } from 'lucide-react';
import GrcAssistant from './GrcAssistant.jsx';

export default function ChatWidget() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const key = 'compliance_chat_widget_open';
    try {
      const v = localStorage.getItem(key);
      if (v === 'closed') setOpen(false); else setOpen(true);
    } catch { setOpen(true); }
  }, []);

  const toggle = () => {
    setOpen(o => {
      try { localStorage.setItem('compliance_chat_widget_open', o ? 'closed' : 'open'); } catch {}
      return !o;
    });
  };

  return (
    <>
      <button
        onClick={toggle}
        className="fixed bottom-5 right-5 z-50 px-4 h-11 rounded bg-[#344c67] text-white text-sm font-semibold hover:bg-[#2a3d53] transition-colors flex items-center justify-center"
        aria-label="Open GRC assistant"
      >
        Ask the GRC assistant
      </button>

      {open && createPortal(
        <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center">
          <div className="absolute inset-0 bg-black/40" onClick={toggle} />
          <div className="relative w-full max-w-lg sm:max-w-md bg-white rounded-2xl shadow-2xl border border-gray-200 flex flex-col overflow-hidden"
               style={{ height: 'min(70vh, 560px)' }}>
            <div className="flex items-center justify-between px-4 py-3 border-b border-gray-100 bg-[#415d7d] text-white shrink-0">
              <div className="flex items-center gap-2">
                <MessageSquare className="w-4 h-4" />
                <span className="text-sm font-bold">GRC Advisor</span>
                <span className="text-[10px] opacity-80">ask anything about policies, audits, contracts &amp; conflicts</span>
              </div>
              <button onClick={toggle} className="p-1 rounded-lg hover:bg-white/20 transition" aria-label="Close">
                <X className="w-4 h-4" />
              </button>
            </div>
            <div className="flex-1 min-h-0">
              <GrcAssistant compact />
            </div>
          </div>
        </div>,
        document.body
      )}
    </>
  );
}
