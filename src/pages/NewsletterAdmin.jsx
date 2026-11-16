import { useCallback, useEffect, useRef, useState } from 'react';
import { markdownToHtml } from '../utils/markdown.js';

const API = '/api/newsletter/admin';
const TZ = 'Asia/Kolkata';
const H = 'text-gray-900 dark:text-white';
const TXT = 'text-gray-700 dark:text-slate-300';
const MUTED = 'text-gray-500 dark:text-slate-400';
const LINE = 'border-gray-200 dark:border-slate-700';
const CARD = `border ${LINE} rounded-lg p-4 bg-white dark:bg-[#1e293b]`;
const FIELD = 'ui-input w-full px-3 py-2 border rounded-lg text-sm';
const BTN = 'btn btn-secondary px-3 py-2 rounded-lg text-sm';
const PRIMARY = 'btn btn-primary px-3 py-2 rounded-lg text-sm';
const DAYS = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

const ist = (d) => (d ? new Date(d).toLocaleString('en-GB', { timeZone: TZ, day: 'numeric', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit' }) + ' IST' : '');
const toIstInput = (d) => {
  if (!d) return '';
  const p = Object.fromEntries(new Intl.DateTimeFormat('en-GB', { timeZone: TZ, year: 'numeric', month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit', hourCycle: 'h23' }).formatToParts(new Date(d)).map((x) => [x.type, x.value]));
  return `${p.year}-${p.month}-${p.day}T${p.hour}:${p.minute}`;
};
const fromIstInput = (v) => (v ? new Date(`${v}:00+05:30`).toISOString() : null);

async function call(body) {
  const token = localStorage.getItem('token');
  const res = await fetch(API, {
    method: body ? 'POST' : 'GET',
    headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
    body: body ? JSON.stringify(body) : undefined,
  });
  const data = await res.json().catch(() => ({}));
  if (!res.ok) { const e = new Error(data.message || 'Request failed.'); e.data = data; throw e; }
  return data;
}

function Confirm({ text, confirmLabel, onConfirm, onCancel }) {
  const ok = useRef(null);
  useEffect(() => {
    ok.current?.focus();
    const k = (e) => { if (e.key === 'Escape') onCancel(); };
    document.addEventListener('keydown', k);
    return () => document.removeEventListener('keydown', k);
  }, [onCancel]);
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4" onMouseDown={(e) => { if (e.target === e.currentTarget) onCancel(); }}>
      <div role="alertdialog" aria-modal="true" aria-labelledby="nl-confirm" className={`${CARD} max-w-sm w-full`}>
        <p id="nl-confirm" className={`font-semibold ${H}`}>{text}</p>
        <div className="mt-4 flex justify-end gap-2">
          <button type="button" className={BTN} onClick={onCancel}>Cancel</button>
          <button ref={ok} type="button" className={PRIMARY} onClick={onConfirm}>{confirmLabel}</button>
        </div>
      </div>
    </div>
  );
}

function Settings({ settings, onSaved, notify }) {
  const [s, setS] = useState(settings);
  const [busy, setBusy] = useState(false);
  useEffect(() => setS(settings), [settings]);
  const set = (k, v) => setS((x) => ({ ...x, [k]: v }));
  const setSource = (i, k, v) => setS((x) => ({ ...x, sources: x.sources.map((src, j) => (j === i ? { ...src, [k]: v } : src)) }));
  const save = async () => {
    setBusy(true);
    try { notify((await call({ action: 'settings', settings: s })).message); onSaved(); } catch (e) { notify(e.message, true); } finally { setBusy(false); }
  };
  const digestNow = async () => {
    setBusy(true);
    try { notify((await call({ action: 'digest-now' })).message); onSaved(); } catch (e) { notify(e.message, true); } finally { setBusy(false); }
  };
  return (
    <section className={CARD} aria-labelledby="nl-settings">
      <h2 id="nl-settings" className={`font-bold ${H}`}>Sending and automation</h2>
      <div className="mt-3 space-y-2 text-sm">
        <label className={`flex items-start gap-2 ${TXT}`}><input type="checkbox" className="mt-1" checked={!!s.sendingPaused} onChange={(e) => set('sendingPaused', e.target.checked)} />
          <span><strong className={H}>Pause all sending.</strong> Nothing goes to the list, scheduled or manual, until this is off again. Drafts and schedules are kept.</span></label>
        <label className={`flex items-start gap-2 ${TXT}`}><input type="checkbox" className="mt-1" checked={!!s.scheduledSendingEnabled} onChange={(e) => set('scheduledSendingEnabled', e.target.checked)} />
          <span><strong className={H}>Send scheduled issues automatically.</strong> When off, scheduled issues wait and you publish them by hand.</span></label>
      </div>

      <h3 className={`mt-5 text-sm font-bold ${H}`}>Curated digest drafts</h3>
      <p className={`text-xs ${MUTED}`}>Builds a draft with the title, source and link of new items from your feeds. It is never sent automatically.</p>
      <div className="mt-2 space-y-2 text-sm">
        <label className={`flex items-center gap-2 ${TXT}`}><input type="checkbox" checked={!!s.digestEnabled} onChange={(e) => set('digestEnabled', e.target.checked)} />Create digest drafts on a schedule</label>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
          <label className={`text-xs ${TXT}`}>How often
            <select className={FIELD} value={s.digestFrequency} onChange={(e) => set('digestFrequency', e.target.value)} disabled={!s.digestEnabled}>
              <option value="weekly">Weekly</option><option value="fortnightly">Every two weeks</option><option value="monthly">Monthly</option>
            </select></label>
          <label className={`text-xs ${TXT}`}>{s.digestFrequency === 'monthly' ? 'Day of month' : 'Day'}
            <select className={FIELD} value={s.digestDay} onChange={(e) => set('digestDay', Number(e.target.value))} disabled={!s.digestEnabled}>
              {s.digestFrequency === 'monthly' ? Array.from({ length: 28 }, (_, i) => <option key={i + 1} value={i + 1}>{i + 1}</option>) : DAYS.map((d, i) => <option key={d} value={i}>{d}</option>)}
            </select></label>
          <label className={`text-xs ${TXT}`}>Time (IST)
            <select className={FIELD} value={s.digestHour} onChange={(e) => set('digestHour', Number(e.target.value))} disabled={!s.digestEnabled}>
              {Array.from({ length: 24 }, (_, h) => <option key={h} value={h}>{String(h).padStart(2, '0')}:00</option>)}
            </select></label>
        </div>
        <label className={`flex items-center gap-2 ${TXT}`}><input type="checkbox" checked={!!s.digestNotify} onChange={(e) => set('digestNotify', e.target.checked)} />Email me when a new digest draft is ready</label>
        {s.lastDigestAt && <p className={`text-xs ${MUTED}`}>Last checked: {ist(s.lastDigestAt)}</p>}
      </div>

      <h3 className={`mt-5 text-sm font-bold ${H}`}>Sources (RSS or Atom feeds)</h3>
      <div className="mt-2 space-y-2">
        {(s.sources || []).map((src, i) => (
          <div key={i} className="flex flex-col sm:flex-row gap-2">
            <input className={`${FIELD} sm:w-48`} placeholder="Name, e.g. NIST" value={src.name} onChange={(e) => setSource(i, 'name', e.target.value)} aria-label={`Source ${i + 1} name`} />
            <input className={FIELD} placeholder="https://…/feed.xml" value={src.url} onChange={(e) => setSource(i, 'url', e.target.value)} aria-label={`Source ${i + 1} feed URL`} />
            <button type="button" className={BTN} onClick={() => set('sources', s.sources.filter((_, j) => j !== i))} aria-label={`Remove source ${i + 1}`}>Remove</button>
          </div>
        ))}
        <button type="button" className={BTN} onClick={() => set('sources', [...(s.sources || []), { name: '', url: '' }])}>Add source</button>
      </div>
      <div className="mt-4 flex flex-wrap gap-2">
        <button type="button" className={PRIMARY} onClick={save} disabled={busy}>Save settings</button>
        <button type="button" className={BTN} onClick={digestNow} disabled={busy}>Create digest draft now</button>
      </div>
    </section>
  );
}

export default function NewsletterAdmin() {
  const [data, setData] = useState(null);
  const [loadError, setLoadError] = useState('');
  const [edit, setEdit] = useState({ id: null, title: '', body: '', scheduleAt: '' });
  const [busy, setBusy] = useState(false);
  const [note, setNote] = useState(null);
  const [confirm, setConfirm] = useState(null);

  const load = useCallback(async () => {
    try { setData(await call()); setLoadError(''); } catch (e) { setLoadError(e.message); }
  }, []);
  useEffect(() => { load(); }, [load]);
  const notify = (text, error = false) => setNote({ text, error });

  const current = data?.issues.find((i) => i.id === edit.id);
  const editable = !current || ['draft', 'scheduled'].includes(current.status);
  const ready = edit.title.trim() && edit.body.trim();
  const run = async (body, after) => {
    setBusy(true); setNote(null);
    try {
      const r = await call(body);
      notify(r.message);
      if (r.issue) setEdit((x) => ({ ...x, id: r.issue.id }));
      after?.(r);
      await load();
    } catch (e) {
      if (e.data?.needsResend) setConfirm({ text: 'This issue was already sent. Send it to every confirmed subscriber again?', label: 'Resend', go: () => run({ ...body, resend: true }) });
      else notify(e.message, true);
    } finally { setBusy(false); }
  };
  const payload = { id: edit.id, title: edit.title, body: edit.body };
  const openIssue = (i) => { setEdit({ id: i.id, title: i.title, body: i.body, scheduleAt: toIstInput(i.scheduledAt) }); setNote(null); window.scrollTo({ top: 0, behavior: 'smooth' }); };

  if (loadError) return <div className="max-w-3xl mx-auto px-4 py-8"><p className="text-red-600 dark:text-red-300">{loadError}</p></div>;
  if (!data) return <div className="max-w-3xl mx-auto px-4 py-8"><p className={MUTED}>Loading…</p></div>;

  return (
    <div className="max-w-6xl mx-auto px-4 py-8 space-y-6">
      <header>
        <h1 className={`text-2xl font-bold ${H}`}>Newsletter</h1>
        <p className={`mt-1 text-sm ${TXT}`}><strong className={H}>{data.confirmed}</strong> confirmed subscribers{data.pending ? ` · ${data.pending} waiting to confirm` : ''}{data.settings.sendingPaused ? ' · Sending is paused' : ''}</p>
      </header>

      <div className="grid lg:grid-cols-2 gap-4">
        <section className={CARD} aria-labelledby="nl-compose">
          <div className="flex flex-wrap items-center justify-between gap-2">
            <h2 id="nl-compose" className={`font-bold ${H}`}>{edit.id ? `Editing: ${current?.status || 'draft'}` : 'New issue'}</h2>
            {edit.id && <button type="button" className={BTN} onClick={() => { setEdit({ id: null, title: '', body: '', scheduleAt: '' }); setNote(null); }}>New issue</button>}
          </div>
          <label className={`block mt-3 text-sm font-semibold ${H}`} htmlFor="nl-title">Title</label>
          <input id="nl-title" className={FIELD} value={edit.title} onChange={(e) => setEdit((x) => ({ ...x, title: e.target.value }))} disabled={!editable} placeholder="e.g. What changed in DPDPA this month" />
          <label className={`block mt-3 text-sm font-semibold ${H}`} htmlFor="nl-body">Body (Markdown)</label>
          <textarea id="nl-body" rows={14} className={`${FIELD} font-mono resize-y`} value={edit.body} onChange={(e) => setEdit((x) => ({ ...x, body: e.target.value }))} disabled={!editable}
            placeholder={'## Heading\n\nA paragraph with a [link](https://example.com).\n\n- A bullet\n- Another bullet'} />
          <p className={`mt-1 text-xs ${MUTED}`}># heading, **bold**, *italic*, [text](https://link), - bullets, 1. numbered</p>

          {editable ? (
            <>
              <div className="mt-4 flex flex-wrap gap-2">
                <button type="button" className={BTN} disabled={busy || !ready} onClick={() => run({ action: 'save', ...payload })}>Save draft</button>
                <button type="button" className={BTN} disabled={busy || !ready} onClick={() => run({ action: 'test', ...payload })}>Send test to me</button>
                <button type="button" className={PRIMARY} disabled={busy || !ready || data.settings.sendingPaused}
                  onClick={() => setConfirm({ text: `Send to ${data.confirmed} confirmed subscribers?`, label: 'Send now', go: () => run({ action: 'publish', ...payload }) })}>Publish to list</button>
              </div>
              <div className={`mt-4 pt-4 border-t ${LINE}`}>
                <label className={`block text-sm font-semibold ${H}`} htmlFor="nl-when">Schedule <span className={`font-normal ${MUTED}`}>(Asia/Kolkata, IST)</span></label>
                <div className="mt-1 flex flex-col sm:flex-row gap-2">
                  <input id="nl-when" type="datetime-local" className={`${FIELD} sm:w-60`} value={edit.scheduleAt} onChange={(e) => setEdit((x) => ({ ...x, scheduleAt: e.target.value }))} />
                  <button type="button" className={BTN} disabled={busy || !ready || !edit.scheduleAt}
                    onClick={async () => {
                      let id = edit.id;
                      if (!id) { try { id = (await call({ action: 'save', ...payload })).issue.id; } catch (e) { notify(e.message, true); return; } }
                      run({ action: 'schedule', ...payload, id, scheduledAt: fromIstInput(edit.scheduleAt) });
                    }}>Schedule</button>
                  {current?.status === 'scheduled' && <button type="button" className={BTN} disabled={busy} onClick={() => run({ action: 'unschedule', id: edit.id })}>Unschedule</button>}
                </div>
                {current?.status === 'scheduled' && <p className={`mt-1 text-xs ${MUTED}`}>Goes out {ist(current.scheduledAt)}{!data.settings.scheduledSendingEnabled || data.settings.sendingPaused ? ' once automatic sending is switched back on' : ''}.</p>}
              </div>
            </>
          ) : (
            <p className={`mt-4 text-sm ${TXT}`}>This issue was sent {ist(current.sentAt)} to {current.sentTo} subscribers. Sent issues cannot be edited. Use Resend in the table to send it again.</p>
          )}
          {note && <p role="status" className={`mt-3 text-sm ${note.error ? 'text-red-600 dark:text-red-300' : 'text-emerald-700 dark:text-emerald-300'}`}>{note.text}</p>}
        </section>

        <section className={CARD} aria-labelledby="nl-preview">
          <h2 id="nl-preview" className={`font-bold ${H}`}>Email preview</h2>
          <div className="mt-3 rounded border border-gray-200 bg-white p-4 text-[#1f2937] overflow-x-hidden break-words" style={{ fontFamily: 'Arial, Helvetica, sans-serif' }}>
            <p style={{ margin: '0 0 16px', fontSize: 13, color: '#475569', fontWeight: 'bold' }}>OneLens by Ruchi</p>
            <h1 style={{ fontSize: 24, margin: '0 0 12px', color: '#0f172a', fontWeight: 700 }}>{edit.title || 'Your title'}</h1>
            {/* markdownToHtml escapes the input before formatting. */}
            <div className="nl-body" dangerouslySetInnerHTML={{ __html: markdownToHtml(edit.body || '*Your body appears here.*', { email: true }) }} />
            <hr style={{ border: 'none', borderTop: '1px solid #e2e8f0', margin: '24px 0' }} />
            <p style={{ color: '#64748b', fontSize: 12, margin: 0 }}>You are receiving this because you subscribed to the OneLens newsletter.</p>
            <p style={{ margin: '6px 0 0', fontSize: 12, color: '#64748b', textDecoration: 'underline' }}>Unsubscribe</p>
          </div>
        </section>
      </div>

      <section className={CARD} aria-labelledby="nl-issues">
        <h2 id="nl-issues" className={`font-bold ${H}`}>Issues</h2>
        {!data.issues.length && <p className={`mt-2 text-sm ${MUTED}`}>No issues yet.</p>}
        <ul className="mt-2 divide-y divide-gray-200 dark:divide-slate-700">
          {data.issues.map((i) => (
            <li key={i.id} className="py-3 flex flex-col sm:flex-row sm:items-center gap-2">
              <div className="flex-1 min-w-0">
                <p className={`font-semibold ${H} break-words`}>{i.title}</p>
                <p className={`text-xs ${MUTED}`}>
                  <span className="uppercase font-semibold">{i.status}</span>{i.kind === 'digest' ? ' · digest' : ''}
                  {i.status === 'scheduled' && ` · ${ist(i.scheduledAt)}`}
                  {(i.status === 'sent' || i.status === 'sending') && ` · ${ist(i.sentAt)} · ${i.sentTo} recipients${i.failedCount ? `, ${i.failedCount} failed` : ''}`}
                  {i.status === 'draft' && ` · edited ${ist(i.updatedAt)}`}
                </p>
              </div>
              <div className="flex flex-wrap gap-2">
                <button type="button" className={BTN} onClick={() => openIssue(i)}>{['draft', 'scheduled'].includes(i.status) ? 'Edit' : 'View'}</button>
                {i.status === 'draft' && <button type="button" className={BTN} disabled={busy} onClick={() => setConfirm({ text: `Delete the draft "${i.title}"?`, label: 'Delete', go: () => run({ action: 'delete-draft', id: i.id }, () => edit.id === i.id && setEdit({ id: null, title: '', body: '', scheduleAt: '' })) })}>Delete</button>}
                {i.status === 'sent' && <a className={BTN} href={i.url} target="_blank" rel="noopener noreferrer">Open</a>}
                {i.status === 'sent' && <button type="button" className={BTN} disabled={busy || data.settings.sendingPaused}
                  onClick={() => setConfirm({ text: `Resend "${i.title}" to ${data.confirmed} confirmed subscribers?`, label: 'Resend', go: () => run({ action: 'publish', id: i.id, resend: true }) })}>Resend</button>}
              </div>
            </li>
          ))}
        </ul>
      </section>

      <Settings settings={data.settings} onSaved={load} notify={notify} />

      {confirm && <Confirm text={confirm.text} confirmLabel={confirm.label} onCancel={() => setConfirm(null)} onConfirm={() => { const go = confirm.go; setConfirm(null); go(); }} />}
    </div>
  );
}
