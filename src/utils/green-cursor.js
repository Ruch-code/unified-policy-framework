const ENCODE = (s) => encodeURIComponent(s).replace(/'/g, '%27').replace(/"/g, '%22');

const svg =
  "<svg xmlns='http://www.w3.org/2000/svg' width='22' height='22' viewBox='0 0 24 24'>" +
  "<path d='M5 2l15 8-7.3 2.8L9 20z' fill='#22c55e' stroke='#065f46' stroke-width='1.6' stroke-linejoin='round'/>" +
  '</svg>';

const GREEN_CURSOR = `url("data:image/svg+xml;utf8,${ENCODE(svg)}") 4 2, auto`;

const TEXT_FIELDS = ['INPUT', 'TEXTAREA', 'SELECT'];

function isInteractive(e) {
  const target = e.target instanceof Element ? e.target : e.target?.target || e.target?.parentElement;
  if (!target || !target.closest) return true;
  const el = target.closest('a, button, [role="button"], label, input, textarea, select, [onclick], [onmousedown]');
  return !(el && TEXT_FIELDS.includes(el.tagName));
}

export function enableGreenClickCursor() {
  const root = document.documentElement;
  let cursorApplied = false;
  const onDown = (e) => {
    if (isInteractive(e) && !cursorApplied) {
      root.style.cursor = GREEN_CURSOR;
      cursorApplied = true;
    }
  };
  const onUp = () => {
    root.style.cursor = '';
    cursorApplied = false;
  };
  const onMove = () => {
    if (cursorApplied) {
      root.style.cursor = '';
      cursorApplied = false;
    }
  };
  document.addEventListener('mousedown', onDown);
  document.addEventListener('mouseup', onUp);
  document.addEventListener('mousemove', onMove, { passive: true });
  return () => {
    document.removeEventListener('mousedown', onDown);
    document.removeEventListener('mouseup', onUp);
    document.removeEventListener('mousemove', onMove);
    root.style.cursor = '';
  };
}