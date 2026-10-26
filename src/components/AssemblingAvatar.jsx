import { useEffect, useMemo, useState } from 'react';

/*
 * Portrait that builds itself from small 3D tiles. Each tile shows its slice of the
 * photo, starts scattered (pushed out, rotated in 3D, transparent) and flies into place
 * with a staggered delay, so the face appears during the transition.
 * Respects prefers-reduced-motion. Faint seams stay visible after assembly.
 */

const GRID = 10;

function seeded(i) {
  const x = Math.sin(i * 9301 + 49297) * 233280;
  return x - Math.floor(x);
}

export default function AssemblingAvatar({ src, alt, size = 128, replayKey = 0 }) {
  const [run, setRun] = useState(0);
  const reduce = typeof window !== 'undefined' && window.matchMedia?.('(prefers-reduced-motion: reduce)').matches;

  useEffect(() => { setRun(r => r + 1); }, [replayKey]);

  const tiles = useMemo(() => {
    const t = [];
    const tile = size / GRID;
    for (let r = 0; r < GRID; r++) {
      for (let c = 0; c < GRID; c++) {
        const i = r * GRID + c;
        const a = seeded(i) * Math.PI * 2;
        const dist = 60 + seeded(i + 500) * 140;
        // distance from the centre decides timing: the middle of the face forms first
        const centre = Math.hypot(r - (GRID - 1) / 2, c - (GRID - 1) / 2) / (GRID * 0.71);
        t.push({
          key: i, r, c, tile,
          tx: Math.cos(a) * dist, ty: Math.sin(a) * dist, tz: 80 + seeded(i + 900) * 220,
          rx: (seeded(i + 1) - 0.5) * 360, ry: (seeded(i + 2) - 0.5) * 360, rz: (seeded(i + 3) - 0.5) * 180,
          delay: centre * 900 + seeded(i + 7) * 450,
        });
      }
    }
    return t;
  }, [size]);

  return (
    <div className="relative" style={{ width: size, height: size, perspective: 700 }} role="img" aria-label={alt}>
      <style>{`
        @keyframes avatar-assemble {
          0%   { opacity: 0; transform: translate3d(var(--tx), var(--ty), var(--tz)) rotateX(var(--rx)) rotateY(var(--ry)) rotateZ(var(--rz)) scale(0.6); }
          60%  { opacity: 1; }
          100% { opacity: 1; transform: translate3d(0, 0, 0) rotateX(0) rotateY(0) rotateZ(0) scale(1); }
        }
        @keyframes avatar-glint {
          0% { transform: translateX(-120%) skewX(-20deg); }
          100% { transform: translateX(220%) skewX(-20deg); }
        }
      `}</style>
      <div key={run} className="absolute inset-0" style={{ transformStyle: 'preserve-3d' }}>
        {tiles.map(t => (
          <span
            key={t.key}
            aria-hidden="true"
            className="absolute block"
            style={{
              left: t.c * t.tile,
              top: t.r * t.tile,
              width: t.tile + 0.4,
              height: t.tile + 0.4,
              backgroundImage: `url(${src})`,
              backgroundSize: `${size}px ${size}px`,
              backgroundPosition: `-${t.c * t.tile}px -${t.r * t.tile}px`,
              boxShadow: 'inset 0 0 0 0.5px rgba(255,255,255,0.18)',
              '--tx': `${t.tx}px`, '--ty': `${t.ty}px`, '--tz': `${t.tz}px`,
              '--rx': `${t.rx}deg`, '--ry': `${t.ry}deg`, '--rz': `${t.rz}deg`,
              animation: reduce ? 'none' : `avatar-assemble 1100ms cubic-bezier(0.2, 0.9, 0.25, 1.05) ${t.delay}ms both`,
              backfaceVisibility: 'hidden',
            }}
          />
        ))}
        {!reduce && (
          <span aria-hidden="true" className="pointer-events-none absolute inset-0 overflow-hidden rounded-[inherit]">
            <span className="absolute inset-y-0 w-1/3 bg-gradient-to-r from-transparent via-white/40 to-transparent"
              style={{ animation: 'avatar-glint 900ms ease-out 2300ms both' }} />
          </span>
        )}
      </div>
    </div>
  );
}
