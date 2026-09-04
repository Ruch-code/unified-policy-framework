// Pug + Wise Owl mascots that greet visitors when they hover the About section.
// Pure SVG — no image files needed.
function Pug() {
  return (
    <svg viewBox="0 0 120 120" className="w-24 h-24" aria-label="Pug mascot">
      {/* body */}
      <ellipse cx="60" cy="95" rx="40" ry="20" fill="#d9a066" />
      {/* head */}
      <ellipse cx="60" cy="52" rx="30" ry="26" fill="#e6b980" />
      {/* ears */}
      <path d="M34 42 Q26 24 46 30 Q42 36 44 44 Z" fill="#b4773b" />
      <path d="M86 42 Q94 24 74 30 Q78 36 76 44 Z" fill="#b4773b" />
      {/* muzzle */}
      <ellipse cx="60" cy="60" rx="20" ry="16" fill="#f2e6d0" />
      {/* eyes */}
      <circle cx="50" cy="48" r="4.5" fill="#2b2b2b" />
      <circle cx="70" cy="48" r="4.5" fill="#2b2b2b" />
      <circle cx="51.5" cy="46.5" r="1.5" fill="#fff" />
      <circle cx="71.5" cy="46.5" r="1.5" fill="#fff" />
      {/* wrinkle */}
      <path d="M52 42 Q60 38 68 42" stroke="#b4773b" strokeWidth="2" fill="none" strokeLinecap="round" />
      {/* nose */}
      <path d="M54 55 Q60 52 66 55 L63 58 L57 58 Z" fill="#2b2b2b" />
      {/* tongue */}
      <ellipse cx="63" cy="70" rx="5" ry="8" fill="#e88" />
      {/* tail */}
      <path d="M98 84 q12 -8 6 -16" stroke="#c8935a" strokeWidth="7" fill="none" strokeLinecap="round" />
    </svg>
  );
}

function WiseOwl() {
  return (
    <svg viewBox="0 0 120 120" className="w-24 h-24" aria-label="Wise owl mascot">
      {/* body */}
      <ellipse cx="60" cy="82" rx="34" ry="30" fill="#8b6bb0" />
      {/* chest */}
      <ellipse cx="60" cy="90" rx="18" ry="16" fill="#e9dcf5" />
      {/* ear tufts */}
      <path d="M34 44 L30 26 L46 38 Z" fill="#6d4d96" />
      <path d="M74 38 L90 26 L86 44 Z" fill="#6d4d96" />
      {/* head */}
      <circle cx="60" cy="48" r="26" fill="#8b6bb0" />
      {/* eye patches */}
      <circle cx="48" cy="46" r="11" fill="#e9dcf5" />
      <circle cx="72" cy="46" r="11" fill="#e9dcf5" />
      {/* eyes */}
      <circle cx="48" cy="46" r="5.5" fill="#2b2b2b" />
      <circle cx="72" cy="46" r="5.5" fill="#2b2b2b" />
      <circle cx="49.5" cy="44.5" r="1.5" fill="#fff" />
      <circle cx="73.5" cy="44.5" r="1.5" fill="#fff" />
      {/* beak */}
      <path d="M55 56 L65 56 L60 64 Z" fill="#f2a54a" />
      {/* wings */}
      <path d="M28 76 L14 100 L40 96 Z" fill="#6d4d96" />
      <path d="M92 76 L106 100 L80 96 Z" fill="#6d4d96" />
      {/* little book */}
      <rect x="52" y="98" width="16" height="12" rx="2" fill="#4a2f6b" />
      <rect x="59.5" y="98" width="1.5" height="12" fill="#e9dcf5" />
    </svg>
  );
}

export default function PetMascots({ show }) {
  if (!show) return null;
  return (
    <div className="absolute right-0 top-full mt-2 z-50 w-72 bg-white rounded-2xl shadow-2xl border border-purple-100 p-4 flex items-end justify-around gap-2 animate-[pop_.25s_ease]">
      <div className="flex flex-col items-center -rotate-3 hover:rotate-0 transition-transform">
        <Pug />
        <span className="text-[11px] font-bold text-amber-700 bg-amber-50 px-2 py-0.5 rounded-full border border-amber-200">Pug · loyal &amp; dependable</span>
        <span className="mt-1.5 text-xs text-slate-600 bg-slate-50 border border-slate-200 rounded-xl px-2.5 py-1.5 italic max-w-[11rem] text-center">
          "I keep things simple and stick with you — trust is everything."
        </span>
      </div>
      <div className="flex flex-col items-center rotate-3 hover:rotate-0 transition-transform">
        <WiseOwl />
        <span className="text-[11px] font-bold text-purple-700 bg-purple-50 px-2 py-0.5 rounded-full border border-purple-200">Wise Owl · foresight</span>
        <span className="mt-1.5 text-xs text-slate-600 bg-slate-50 border border-slate-200 rounded-xl px-2.5 py-1.5 italic max-w-[11rem] text-center">
          "A little preparation today keeps trouble away tomorrow."
        </span>
      </div>
    </div>
  );
}
