import { useEffect, useRef, useState } from 'react';

// Hover (or tap) to play a short story card, click to open the profile.
// The profile address is never shown as text; it is assembled only on click.
const H = ['linkedin', 'com'].join('.');
const P = ['in', 'ruchi-k'].join('/');
const openProfile = () => window.open(`https://www.${H}/${P}/`, '_blank', 'noopener,noreferrer');

const SLIDES = [
  { k: 'hi', title: 'Ruchi Kandpal', sub: 'GRC and Responsible AI' },
  { k: 'fw', title: 'SOC 2 · ISO 27001 · ISO 42001 · HIPAA', sub: 'Audit-ready programs for fast-moving teams' },
  { k: 'xp', title: '4.5+ years', sub: 'IT audit, risk and compliance across the Americas and India' },
  { k: 'go', title: "Let's connect", sub: 'Click to open my LinkedIn profile' },
];
const SLIDE_MS = 1800;

function Logo({ className = 'w-4 h-4' }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M20.45 20.45h-3.56v-5.57c0-1.33-.02-3.04-1.85-3.04-1.85 0-2.14 1.45-2.14 2.94v5.67H9.35V9h3.41v1.56h.05c.48-.9 1.64-1.85 3.37-1.85 3.6 0 4.27 2.37 4.27 5.46v6.28zM5.34 7.43a2.06 2.06 0 1 1 0-4.13 2.06 2.06 0 0 1 0 4.13zM7.12 20.45H3.56V9h3.56v11.45zM22.22 0H1.77C.79 0 0 .77 0 1.73v20.54C0 23.23.79 24 1.77 24h20.45c.98 0 1.78-.77 1.78-1.73V1.73C24 .77 23.2 0 22.22 0z" />
    </svg>
  );
}

export default function LinkedInStory({ label = "Let's connect" }) {
  const [open, setOpen] = useState(false);
  const [i, setI] = useState(0);
  const timer = useRef(0);
  const closeT = useRef(0);

  useEffect(() => {
    if (!open) { setI(0); return; }
    timer.current = window.setInterval(() => setI((n) => (n < SLIDES.length - 1 ? n + 1 : n)), SLIDE_MS);
    return () => window.clearInterval(timer.current);
  }, [open]);

  const show = () => { window.clearTimeout(closeT.current); setOpen(true); };
  const hide = () => { closeT.current = window.setTimeout(() => setOpen(false), 150); };
  const s = SLIDES[i];

  return (
    <span className="relative inline-flex" onMouseEnter={show} onMouseLeave={hide} onFocus={show} onBlur={hide}>
      <button
        type="button"
        onClick={openProfile}
        onTouchStart={show}
        aria-label="Open Ruchi Kandpal's LinkedIn profile in a new tab"
        className="inline-flex items-center gap-1.5 font-medium text-[#0A66C2] dark:text-[#4C9BE8] hover:underline"
      >
        <Logo />
        {label}
      </button>

      {open && (
        <span
          role="dialog"
          aria-label="About Ruchi Kandpal"
          onClick={openProfile}
          className="absolute bottom-full left-1/2 -translate-x-1/2 mb-3 z-50 w-64 cursor-pointer rounded-2xl overflow-hidden shadow-2xl ring-1 ring-black/10 text-left"
          style={{ background: 'linear-gradient(160deg,#0A66C2 0%,#004182 60%,#0b1f3a 100%)' }}
        >
          <span className="flex gap-1 px-3 pt-3">
            {SLIDES.map((sl, n) => (
              <span key={sl.k} className="h-0.5 flex-1 rounded-full bg-white/30 overflow-hidden">
                <span
                  className="block h-full bg-white"
                  style={n === i
                    ? { width: '100%', animation: `lis-fill ${SLIDE_MS}ms linear` }
                    : { width: n < i ? '100%' : '0%' }}
                />
              </span>
            ))}
          </span>
          <span className="flex items-center gap-2 px-3 pt-3 text-white/90 text-[11px] font-semibold">
            <span className="inline-flex w-6 h-6 rounded-full bg-white text-[#0A66C2] items-center justify-center text-[10px] font-extrabold">RK</span>
            Ruchi Kandpal
          </span>
          <span key={s.k} className="block px-4 pt-5 pb-5 min-h-[7.5rem]" style={{ animation: 'lis-in .35s ease-out' }}>
            <span className="block text-white text-lg font-extrabold leading-snug">{s.title}</span>
            <span className="block text-white/80 text-xs mt-2 leading-relaxed">{s.sub}</span>
          </span>
          <span className="flex items-center justify-center gap-1.5 bg-white/10 py-2 text-white text-xs font-bold">
            <Logo className="w-3.5 h-3.5" /> View profile
          </span>
          <style>{`@keyframes lis-fill{from{width:0}to{width:100%}}@keyframes lis-in{from{opacity:0;transform:translateY(6px)}to{opacity:1;transform:none}}`}</style>
        </span>
      )}
    </span>
  );
}
