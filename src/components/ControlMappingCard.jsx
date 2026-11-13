import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { Download, X } from 'lucide-react';
import { readFirstSheet } from '../utils/readXlsx.js';

const FILE = '/OneLens_Control_Mapping.xlsx';
const H = 'text-gray-900 dark:text-white';
const TXT = 'text-gray-700 dark:text-slate-300';
const MUTED = 'text-gray-500 dark:text-slate-400';
const LINE = 'border-gray-200 dark:border-slate-700';
const PRIMARY = 'inline-flex items-center justify-center gap-1.5 px-3 py-1.5 rounded-lg text-sm font-semibold bg-indigo-700 text-white hover:bg-indigo-800 dark:bg-indigo-500 dark:hover:bg-indigo-400 dark:text-slate-950';
const SECONDARY = `inline-flex items-center justify-center px-3 py-1.5 rounded-lg text-sm font-semibold border ${LINE} bg-white text-gray-900 hover:bg-gray-50 dark:bg-slate-900 dark:text-white dark:hover:bg-slate-800`;
const FIELD = `px-2 py-1.5 border ${LINE} rounded text-sm bg-white dark:bg-slate-900 ${H} min-w-0`;
const BAR = ['border-l-sky-500', 'border-l-emerald-500', 'border-l-amber-500', 'border-l-rose-500', 'border-l-teal-500', 'border-l-orange-500', 'border-l-blue-500', 'border-l-lime-500'];

function DownloadLink({ className = PRIMARY }) {
  return <a href={FILE} download className={className}><Download className="w-4 h-4" />Download Excel</a>;
}

function PreviewModal({ onClose }) {
  const [state, setState] = useState({ status: 'loading', head: [], rows: [] });
  const [q, setQ] = useState('');
  const [area, setArea] = useState('');
  const [fw, setFw] = useState('');
  const dialog = useRef(null);

  useEffect(() => {
    let live = true;
    readFirstSheet(FILE)
      .then(([head = [], ...rows]) => { if (live) setState({ status: 'ready', head, rows }); })
      .catch(() => { if (live) setState({ status: 'error', head: [], rows: [] }); });
    return () => { live = false; };
  }, []);

  useEffect(() => {
    const el = dialog.current;
    el?.querySelector('[data-autofocus]')?.focus();
    const onKey = (e) => {
      if (e.key === 'Escape') { e.preventDefault(); onClose(); return; }
      if (e.key !== 'Tab' || !el) return;
      const f = Array.from(el.querySelectorAll('a[href], button, input, select, [tabindex]:not([tabindex="-1"])')).filter((n) => !n.disabled && n.offsetParent !== null);
      if (!f.length) return;
      const [first, last] = [f[0], f[f.length - 1]];
      if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
      else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
    };
    document.addEventListener('keydown', onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => { document.removeEventListener('keydown', onKey); document.body.style.overflow = prev; };
  }, [onClose]);

  const { head, rows, status } = state;
  const areas = useMemo(() => [...new Set(rows.map((r) => r[0]))], [rows]);
  const fws = useMemo(() => [...new Set(rows.map((r) => r[1]))].sort(), [rows]);
  const tone = (a) => BAR[areas.indexOf(a) % BAR.length];
  const shown = useMemo(() => {
    const t = q.trim().toLowerCase();
    return rows.filter((r) => (!area || r[0] === area) && (!fw || r[1] === fw) && (!t || r.join(' ').toLowerCase().includes(t)));
  }, [rows, q, area, fw]);
  const groups = useMemo(() => {
    const g = [];
    shown.forEach((r) => { if (!g.length || g[g.length - 1].area !== r[0]) g.push({ area: r[0], rows: [] }); g[g.length - 1].rows.push(r); });
    return g;
  }, [shown]);

  return (
    <div className="fixed inset-0 z-50 flex items-stretch sm:items-center justify-end sm:justify-center bg-black/60 sm:p-4"
      onMouseDown={(e) => { if (e.target === e.currentTarget) onClose(); }}>
      <div ref={dialog} role="dialog" aria-modal="true" aria-labelledby="cm-preview-title"
        className={`flex flex-col w-[92%] sm:w-full sm:max-w-5xl h-full sm:h-auto sm:max-h-[85vh] bg-white dark:bg-[#0f172a] border ${LINE} sm:rounded-lg overflow-hidden`}>
        <div className={`flex flex-wrap items-center justify-between gap-2 p-3 border-b ${LINE}`}>
          <h2 id="cm-preview-title" className={`text-base font-bold ${H}`}>Cross-framework control mapping</h2>
          <div className="flex items-center gap-2">
            <DownloadLink />
            <button type="button" onClick={onClose} aria-label="Close preview" className={`${SECONDARY} px-2`}><X className="w-4 h-4" /></button>
          </div>
        </div>

        <div className={`flex flex-col sm:flex-row sm:flex-wrap sm:items-center gap-2 p-3 border-b ${LINE}`}>
          <input data-autofocus type="search" value={q} onChange={(e) => setQ(e.target.value)} placeholder="Search all columns" aria-label="Search all columns" className={`${FIELD} sm:w-64`} />
          <select value={area} onChange={(e) => setArea(e.target.value)} aria-label="Filter by Policy Area" className={`${FIELD} sm:max-w-[16rem]`}>
            <option value="">All policy areas</option>
            {areas.map((a) => <option key={a} value={a}>{a}</option>)}
          </select>
          <select value={fw} onChange={(e) => setFw(e.target.value)} aria-label="Filter by Framework" className={`${FIELD} sm:max-w-[12rem]`}>
            <option value="">All frameworks</option>
            {fws.map((f) => <option key={f} value={f}>{f}</option>)}
          </select>
          <span className={`text-xs ${MUTED}`} aria-live="polite">{status === 'ready' ? `${shown.length} of ${rows.length}` : ''}</span>
        </div>

        <div className="flex-1 overflow-y-auto overflow-x-hidden min-h-0">
          {status === 'loading' && <p className={`p-6 text-sm ${MUTED}`} role="status">Loading the mapping…</p>}
          {status === 'error' && (
            <div className="p-6 text-sm space-y-3">
              <p className={TXT}>The preview could not be loaded. The spreadsheet itself is fine to download.</p>
              <DownloadLink />
            </div>
          )}
          {status === 'ready' && shown.length === 0 && <p className={`p-6 text-sm ${MUTED}`}>No controls match these filters.</p>}
          {status === 'ready' && shown.length > 0 && (
            <>
              <table className="hidden sm:table w-full table-fixed text-sm border-collapse">
                <colgroup><col className="w-[22%]" /><col className="w-[14%]" /><col className="w-[18%]" /><col /></colgroup>
                <thead className="sticky top-0 z-10 bg-gray-100 dark:bg-slate-800">
                  <tr>{head.map((h) => <th key={h} scope="col" className={`text-left p-2 font-bold ${H} border-b ${LINE}`}>{h}</th>)}</tr>
                </thead>
                {groups.map((g) => (
                  <tbody key={g.area}>
                    <tr><th scope="rowgroup" colSpan={4} className={`text-left px-2 py-1.5 text-xs font-semibold ${H} bg-gray-50 dark:bg-slate-800/60 border-l-4 ${tone(g.area)}`}>{g.area} <span className={`font-normal ${MUTED}`}>({g.rows.length})</span></th></tr>
                    {g.rows.map((r) => (
                      <tr key={r.join('|')} className={`border-t ${LINE} align-top`}>
                        <td className={`p-2 break-words border-l-4 ${tone(g.area)} ${TXT}`}>{r[0]}</td>
                        <td className={`p-2 break-words ${TXT}`}>{r[1]}</td>
                        <td className={`p-2 break-words font-medium ${H}`}>{r[2]}</td>
                        <td className={`p-2 break-words ${TXT}`}>{r[3]}</td>
                      </tr>
                    ))}
                  </tbody>
                ))}
              </table>
              <div className="sm:hidden p-3 space-y-3">
                {groups.map((g) => (
                  <section key={g.area} className="space-y-2">
                    <h3 className={`text-xs font-semibold ${H} border-l-4 ${tone(g.area)} pl-2`}>{g.area} <span className={`font-normal ${MUTED}`}>({g.rows.length})</span></h3>
                    {g.rows.map((r) => (
                      <div key={r.join('|')} className={`border ${LINE} border-l-4 ${tone(g.area)} rounded p-2.5 bg-white dark:bg-[#1e293b]`}>
                        <div className="flex flex-wrap items-center gap-1.5">
                          <span className={`font-semibold text-sm ${H} break-words`}>{r[2]}</span>
                          <span className={`text-[11px] px-1.5 py-0.5 rounded border ${LINE} ${TXT}`}>{r[1]}</span>
                        </div>
                        <p className={`mt-1 text-sm ${TXT} break-words`}>{r[3]}</p>
                      </div>
                    ))}
                  </section>
                ))}
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default function ControlMappingCard() {
  const [open, setOpen] = useState(false);
  const previewBtn = useRef(null);
  const wasOpen = useRef(false);
  useEffect(() => {
    if (wasOpen.current && !open) previewBtn.current?.focus();
    wasOpen.current = open;
  }, [open]);
  const close = useCallback(() => setOpen(false), []);
  return (
    <div className="mt-3">
      <p className={`text-sm font-semibold ${H}`}>Cross-framework control mapping</p>
      <p className={`mt-0.5 text-sm ${TXT} break-words`}>113 controls across SOC 2, ISO 27001, PCI DSS, HIPAA, NIST CSF, CIS, GDPR, DPDPA, CERT-In, FedRAMP, CJIS, CCPA/CPRA, ISO 42001, NIST AI RMF and EU AI Act</p>
      <div className="mt-3 flex flex-col sm:flex-row gap-2">
        <button ref={previewBtn} type="button" onClick={() => setOpen(true)} className={SECONDARY}>Preview</button>
        <DownloadLink />
      </div>
      {open && <PreviewModal onClose={close} />}
    </div>
  );
}
