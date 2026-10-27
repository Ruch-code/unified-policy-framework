// Hover cursor effect: a small dot that follows the mouse with a trailing ring.
// The dot is indigo normally, grows over clickable elements, and turns green
// while the mouse button is pressed. Pure DOM, pointer-events: none, so it
// never blocks clicks. Skipped on touch devices and for reduced-motion users.

const CSS = `
.cd-dot, .cd-ring {
  position: fixed; top: 0; left: 0; pointer-events: none; z-index: 2147483647;
  border-radius: 9999px; transform: translate3d(-100px, -100px, 0);
  opacity: 0; transition: opacity .2s ease;
}
.cd-dot {
  width: 8px; height: 8px; margin: -4px 0 0 -4px;
  background: #6366f1; box-shadow: 0 0 10px rgba(99,102,241,.7);
  transition: opacity .2s ease, background-color .15s ease, box-shadow .15s ease, width .15s ease, height .15s ease, margin .15s ease;
}
.cd-ring {
  width: 34px; height: 34px; margin: -17px 0 0 -17px;
  border: 1.5px solid rgba(99,102,241,.55);
  transition: opacity .2s ease, border-color .15s ease, width .2s ease, height .2s ease, margin .2s ease;
}
.cd-visible .cd-dot, .cd-visible .cd-ring { opacity: 1; }
.cd-hover .cd-ring { width: 48px; height: 48px; margin: -24px 0 0 -24px; border-color: rgba(99,102,241,.8); }
.cd-down .cd-dot { transition-duration: 0s; background: #22c55e; box-shadow: 0 0 14px rgba(34,197,94,.9); width: 12px; height: 12px; margin: -6px 0 0 -6px; }
.cd-down .cd-ring { transition-duration: 0s; border-color: rgba(34,197,94,.85); width: 26px; height: 26px; margin: -13px 0 0 -13px; }
html.dark .cd-dot { background: #818cf8; }
html.dark .cd-ring { border-color: rgba(129,140,248,.6); }
html.dark .cd-down .cd-dot { background: #4ade80; }
html.dark .cd-down .cd-ring { border-color: rgba(74,222,128,.85); }
`;

const CLICKABLE = 'a, button, [role="button"], summary, label, select, input[type="checkbox"], input[type="radio"], [onclick]';

export function enableCursorDot() {
  if (typeof window === 'undefined' || window.__cursorDot) return () => {};
  const fine = window.matchMedia && window.matchMedia('(pointer: fine)').matches;
  const reduced = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (!fine || reduced) return () => {};
  window.__cursorDot = true;

  const style = document.createElement('style');
  style.textContent = CSS;
  document.head.appendChild(style);

  const wrap = document.createElement('div');
  wrap.setAttribute('aria-hidden', 'true');
  const dot = document.createElement('div'); dot.className = 'cd-dot';
  const ring = document.createElement('div'); ring.className = 'cd-ring';
  wrap.append(ring, dot);
  document.body.appendChild(wrap);

  let x = -100, y = -100, rx = -100, ry = -100, raf = 0;
  const loop = () => {
    rx += (x - rx) * 0.18; ry += (y - ry) * 0.18;
    dot.style.transform = `translate3d(${x}px, ${y}px, 0)`;
    ring.style.transform = `translate3d(${rx}px, ${ry}px, 0)`;
    raf = (Math.abs(x - rx) > 0.1 || Math.abs(y - ry) > 0.1) ? requestAnimationFrame(loop) : 0;
  };
  const kick = () => { if (!raf) raf = requestAnimationFrame(loop); };

  const onMove = (e) => {
    x = e.clientX; y = e.clientY;
    wrap.classList.add('cd-visible');
    const t = e.target instanceof Element ? e.target : null;
    wrap.classList.toggle('cd-hover', !!(t && t.closest(CLICKABLE)));
    kick();
  };
  // Hold the green state briefly so even a light, quick click or trackpad tap is visible.
  const HOLD_MS = 400;
  let downAt = 0, upTimer = 0;
  const onDown = () => {
    clearTimeout(upTimer);
    downAt = performance.now();
    wrap.classList.add('cd-down');
  };
  const onUp = () => {
    const left = Math.max(0, HOLD_MS - (performance.now() - downAt));
    clearTimeout(upTimer);
    upTimer = setTimeout(() => wrap.classList.remove('cd-down'), left);
  };
  const onLeave = () => wrap.classList.remove('cd-visible', 'cd-down');

  document.addEventListener('mousemove', onMove, { passive: true });
  document.addEventListener('pointerdown', onDown, { passive: true });
  document.addEventListener('pointerup', onUp, { passive: true });
  document.addEventListener('pointercancel', onUp, { passive: true });
  document.documentElement.addEventListener('mouseleave', onLeave);
  window.addEventListener('blur', onLeave);

  return () => {
    document.removeEventListener('mousemove', onMove);
    document.removeEventListener('pointerdown', onDown);
    document.removeEventListener('pointerup', onUp);
    document.removeEventListener('pointercancel', onUp);
    clearTimeout(upTimer);
    document.documentElement.removeEventListener('mouseleave', onLeave);
    window.removeEventListener('blur', onLeave);
    cancelAnimationFrame(raf);
    wrap.remove(); style.remove();
    window.__cursorDot = false;
  };
}
