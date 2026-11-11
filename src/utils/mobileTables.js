// On small screens, every data table is shown as stacked cards so nothing needs sideways scrolling.
// Each cell gets a data-label from its column header; CSS in index.css does the layout.
function labelTable(table) {
  const heads = [...table.querySelectorAll('thead th')].map((th) => th.textContent.trim());
  if (heads.length < 2) return;
  table.classList.add('stack-table');
  table.querySelectorAll('tbody tr').forEach((tr) => {
    [...tr.children].forEach((cell, i) => {
      const label = heads[i] || '';
      if (cell.getAttribute('data-label') !== label) cell.setAttribute('data-label', label);
    });
  });
}

export function initMobileTables() {
  if (typeof document === 'undefined') return;
  let queued = false;
  const run = () => { queued = false; document.querySelectorAll('table').forEach(labelTable); };
  run();
  new MutationObserver(() => { if (!queued) { queued = true; requestAnimationFrame(run); } })
    .observe(document.body, { childList: true, subtree: true });
}
