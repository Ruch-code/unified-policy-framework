import { useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';

const FRAMEWORK_RE = /^\/(gdpr|dpdpa|ccpa-cpra|coppa|lgpd|pdpa|pipl|iso27701|hipaa|hitrust|cippe-eu|cippe-us|sebi|rbi|cscrf|cert-in|iso-31000|iso-27001|pci-dss|soc2|cis|nist)\/?$/;
const ACCENT = '#7c3aed';

function lerp(a, b, t) { return a + (b - a) * t; }

export default function InspectorCursor() {
  const targetRef = useRef({ x: -999, y: -999 });
  const visRef = useRef({ x: -999, y: -999 });
  const stateRef = useRef('default');
  const followerRef = useRef(null);
  const badgeRef = useRef(null);
  const rafRef = useRef(null);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    const root = document.documentElement;
    root.classList.add('inspector-mode');

    const style = document.createElement('style');
    style.id = 'inspector-cursor-css';
    style.textContent = `
.inspector-mode { cursor: none !important; }
.inspector-mode * { cursor: none !important; }
.ic { transform:translate(-50%,-50%); transition:width .18s,height .18s; }
.ic-ring { width:24px; height:24px; border-radius:50%; border:2px solid #7c3aed; transition:all .18s; position:relative; }
.ic-dot { width:6px; height:6px; border-radius:50%; background:#7c3aed; transition:all .18s; }
.ic-glow { position:absolute; inset:-5px; border-radius:50%; border:1px solid #7c3aed; opacity:.3; animation:ic-pulse 2s ease-in-out infinite; }
.ic.state-pointer .ic-ring { width:16px; height:18px; border-radius:4px; transform:rotate(45deg); border-color:#1e293b; }
.ic.state-pointer .ic-dot { display:none; }
.ic.state-task .ic-ring { width:18px; height:18px; border-radius:4px; border-color:#059669; background:rgba(5,150,105,.1); }
.ic.state-task .ic-dot { display:none; }
.ic.state-task .ic-state-icon::after { content:''; position:absolute; left:5px; top:2px; width:5px; height:9px; border:2px solid #059669; border-top:none; border-left:none; transform:rotate(45deg); }
.ic.state-text .ic-ring { width:20px; height:2px; border-radius:1px; border:0 0 2px 0 #7c3aed; background:none; }
.ic.state-text .ic-dot { display:none; }
.ic.state-inspect .ic-ring { width:28px; height:28px; border-color:#0ea5e9; box-shadow:0 0 12px rgba(14,165,233,.5); }
.ic.state-inspect .ic-dot { width:8px; height:8px; background:#0ea5e9; }
.ic.state-inspect .ic-glow { border-color:#0ea5e9; opacity:.55; }
.ic-ripple { position:fixed; width:24px; height:24px; border-radius:50%; border:2px solid #7c3aed; pointer-events:none; transform:translate(-50%,-50%) scale(0); opacity:.7; animation:ic-ripple .45s ease-out forwards; z-index:99998; }
.ic-badge { position:fixed; pointer-events:none; z-index:99998; transform:translate(-50%,-100%) translateY(-14px); background:#1e293b; color:#fff; font-size:12px; font-weight:600; padding:4px 10px; border-radius:8px; white-space:nowrap; box-shadow:0 4px 14px rgba(0,0,0,.25); border:1px solid rgba(255,255,255,.1); display:flex; align-items:center; gap:5px; }
.ic-badge::after { content:''; position:absolute; bottom:-6px; left:50%; transform:translateX(-50%) rotate(45deg); width:8px; height:8px; background:#1e293b; border-right:1px solid rgba(255,255,255,.1); border-bottom:1px solid rgba(255,255,255,.1); }
@keyframes ic-pulse { 0%,100%{opacity:.3} 50%{opacity:.65} }
@keyframes ic-ripple { to{transform:translate(-50%,-50%) scale(2.4); opacity:0} }
@media (prefers-reduced-motion: reduce) { .ic-glow { animation:none; } }
    `;
    document.head.appendChild(style);

    // follower
    const fl = document.createElement('div');
    fl.className = 'ic';
    fl.innerHTML = '<div class="ic-ring"></div><div class="ic-dot"></div><div class="ic-glow"></div><div class="ic-state-icon"></div>';
    fl.style.cssText = 'position:fixed;top:-999px;left:-999px;pointer-events:none;z-index:99999;transform:translate(-50%,-50%);will-change:transform;';
    document.body.appendChild(fl);
    followerRef.current = fl;

    // badge
    const bd = document.createElement('div');
    bd.className = 'ic-badge';
    bd.style.display = 'none';
    bd.style.left = '-999px';
    bd.style.top = '-999px';
    bd.innerHTML = '<svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#0ea5e9" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg><span></span>';
    document.body.appendChild(bd);
    badgeRef.current = bd;

    const onMove = (e) => {
      targetRef.current = { x: e.clientX, y: e.clientY };
      const a = e.target.closest('a');
      if (a && FRAMEWORK_RE.test(new URL(a.href, location.origin).pathname)) {
        stateRef.current = 'inspect';
        bd.querySelector('span').textContent = (a.textContent || '').trim() || a.pathname;
        bd.style.display = '';
      } else if (e.target.closest('input[type="checkbox"]')) {
        stateRef.current = 'task';
        bd.style.display = 'none';
      } else if (e.target.closest('textarea, input, [contenteditable]')) {
        stateRef.current = 'text';
        bd.style.display = 'none';
      } else if (e.target.closest('a, button, [role="button"], [data-cursor-pointer]')) {
        stateRef.current = 'pointer';
        bd.style.display = 'none';
      } else {
        stateRef.current = 'default';
        bd.style.display = 'none';
      }
      fl.setAttribute('data-state', stateRef.current);
    };

    const onDown = () => {
      const s = stateRef.current;
      if (s === 'default' || s === 'pointer') {
        const r = document.createElement('div');
        r.className = 'ic-ripple';
        r.style.left = targetRef.current.x + 'px';
        r.style.top = targetRef.current.y + 'px';
        document.body.appendChild(r);
        setTimeout(() => r.remove(), 470);
      }
    };

    document.addEventListener('mousemove', onMove, { passive: true });
    document.addEventListener('mousedown', onDown, { passive: true });

    const loop = () => {
      const t = 0.15;
      visRef.current.x = lerp(visRef.current.x, targetRef.current.x, t);
      visRef.current.y = lerp(visRef.current.y, targetRef.current.y, t);
      const v = visRef.current;
      fl.style.left = v.x + 'px';
      fl.style.top = v.y + 'px';
      bd.style.left = v.x + 'px';
      bd.style.top = v.y + 'px';
      rafRef.current = requestAnimationFrame(loop);
    };
    rafRef.current = requestAnimationFrame(loop);

    return () => {
      document.removeEventListener('mousemove', onMove);
      document.removeEventListener('mousedown', onDown);
      cancelAnimationFrame(rafRef.current);
      fl.remove();
      bd.remove();
      root.classList.remove('inspector-mode');
    };
  }, []);

  return createPortal(null, document.body);
}
