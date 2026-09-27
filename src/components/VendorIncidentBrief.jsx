import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import {
  Lock, RefreshCw, Copy, Check, Upload, Download, Trash2,
  AlertTriangle, ShieldCheck, CalendarClock, FileText, Image as ImageIcon,
  Info, ChevronDown, ExternalLink, Sparkles,
} from 'lucide-react';

import { useAuth } from '../context/AuthContext.jsx';
import {
  VENDOR_INCIDENT_STORIES, COMPOSITE, REAL,
  FIELD_LABELS, NEWSLETTER_CADENCE_DAYS, TEASER_MIN, TEASER_MAX,
  storiesOfKind, storyAt, storyToPlainText, storyToMarkdown,
} from '../data/vendorIncidentStories.js';
import { drawPoster } from '../utils/posterRenderer.js';

const STORE_KEY = 'vendor_incident_brief_v1';
const MAX_LOGO_EDGE = 480;
const MAX_LOGO_CHARS = 400 * 1024;

const DAY = 86400000;

function readStore() {
  try {
    const raw = localStorage.getItem(STORE_KEY);
    if (!raw) return {};
    const parsed = JSON.parse(raw);
    return parsed && typeof parsed === 'object' ? parsed : {};
  } catch (e) {
    return {};
  }
}

function writeStore(value) {
  try {
    localStorage.setItem(STORE_KEY, JSON.stringify(value));
  } catch (e) {
    // A full quota must not take the tab down. The logo is the only bulky part,
    // so drop it and keep the editorial state.
    try {
      localStorage.setItem(STORE_KEY, JSON.stringify({ ...value, logo: null }));
    } catch (e2) {
      console.error('Vendor brief state could not be saved:', e2);
    }
  }
}

function legacyCopy(text) {
  const ta = document.createElement('textarea');
  ta.value = text;
  ta.setAttribute('readonly', '');
  ta.style.position = 'fixed';
  ta.style.opacity = '0';
  document.body.appendChild(ta);
  ta.select();
  try {
    document.execCommand('copy');
  } finally {
    document.body.removeChild(ta);
  }
}

/** Downscale an uploaded image before it goes near localStorage. */
function prepareLogo(file) {
  return new Promise((resolve, reject) => {
    if (!file || !file.type.startsWith('image/')) {
      reject(new Error('Please choose an image file (PNG, JPG, SVG or WebP).'));
      return;
    }
    if (file.size > 12 * 1024 * 1024) {
      reject(new Error('That image is over 12 MB. Please use something under 2 MB.'));
      return;
    }
    const reader = new FileReader();
    reader.onerror = () => reject(new Error('That file could not be read.'));
    reader.onload = () => {
      const img = new Image();
      img.onerror = () => reject(new Error('That file is not a usable image.'));
      img.onload = () => {
        const scale = Math.min(1, MAX_LOGO_EDGE / Math.max(img.naturalWidth, img.naturalHeight));
        const w = Math.max(1, Math.round(img.naturalWidth * scale));
        const h = Math.max(1, Math.round(img.naturalHeight * scale));
        const c = document.createElement('canvas');
        c.width = w;
        c.height = h;
        const ctx = c.getContext('2d');
        ctx.drawImage(img, 0, 0, w, h);
        let out = c.toDataURL('image/png');
        if (out.length > MAX_LOGO_CHARS) out = c.toDataURL('image/jpeg', 0.85);
        resolve({ dataUrl: out, width: img.naturalWidth, height: img.naturalHeight });
      };
      img.src = reader.result;
    };
    reader.readAsDataURL(file);
  });
}

function loadImage(src) {
  return new Promise((resolve, reject) => {
    if (!src) return resolve(null);
    const img = new Image();
    img.onload = () => resolve(img);
    img.onerror = () => resolve(null);
    img.src = src;
    return undefined;
  });
}

function fmtDate(ts) {
  if (!ts) return null;
  const d = new Date(ts);
  if (Number.isNaN(d.getTime())) return null;
  return d.toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' });
}

/* ------------------------------------------------------------------ gate */

function LockedPanel({ isDark }) {
  return (
    <div className={`rounded-3xl border p-10 text-center max-w-2xl mx-auto
      ${isDark ? 'bg-surface-dark-100 border-surface-dark-300' : 'bg-white border-surface-300'}`}
      data-testid="vendor-brief-locked">
      <div className={`w-14 h-14 rounded-2xl mx-auto mb-5 flex items-center justify-center
        ${isDark ? 'bg-indigo-900/40' : 'bg-indigo-50'}`}>
        <Lock className="w-7 h-7 text-indigo-500" />
      </div>
      <h3 className={`text-xl font-bold mb-2 ${isDark ? 'text-text-dark-primary' : 'text-navy-900'}`}>
        Sign in to generate incident briefs
      </h3>
      <p className={`text-sm mb-6 max-w-md mx-auto ${isDark ? 'text-text-dark-secondary' : 'text-navy-600'}`}>
        The brief generator pulls the vendor incident corpus, builds the newsletter teaser and
        renders the poster. It is kept behind sign in so the copy and artwork never end up
        embedded in a public page bundle.
      </p>
      <a
        href="/login"
        className="inline-flex items-center gap-2 px-6 py-3 rounded-xl font-medium text-white bg-indigo-600 hover:bg-indigo-700 transition-colors"
      >
        <ShieldCheck className="w-4 h-4" />
        Sign in
      </a>
    </div>
  );
}

/* ------------------------------------------------------------- primitives */

function Pill({ children, tone = 'neutral', isDark, testId }) {
  const tones = {
    neutral: isDark ? 'bg-surface-dark-200 text-text-dark-secondary border-surface-dark-300'
      : 'bg-surface-100 text-navy-600 border-surface-300',
    accent: 'bg-indigo-50 text-indigo-700 border-indigo-200',
    warn: 'bg-amber-50 text-amber-700 border-amber-200',
    danger: 'bg-red-50 text-red-700 border-red-200',
    good: 'bg-emerald-50 text-emerald-700 border-emerald-200',
  };
  return (
    <span data-testid={testId}
      className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium border ${tones[tone]}`}>
      {children}
    </span>
  );
}

function CopyButton({ label, onCopy, isCopied, isDark, testId, children }) {
  return (
    <button
      type="button"
      onClick={onCopy}
      data-testid={testId}
      className={`inline-flex items-center gap-2 px-3.5 py-2 rounded-lg text-sm font-medium border transition-colors
        ${isCopied
          ? 'bg-emerald-600 text-white border-emerald-600'
          : isDark
            ? 'bg-surface-dark-200 text-text-dark-primary border-surface-dark-300 hover:bg-surface-dark-300'
            : 'bg-white text-navy-700 border-surface-300 hover:bg-surface-100'}`}
    >
      {isCopied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
      {children || label}
    </button>
  );
}

/* ------------------------------------------------------------------- main */

export default function VendorIncidentBrief({ isDark = false }) {
  const { user, loading } = useAuth();
  const canvasRef = useRef(null);
  const fileRef = useRef(null);
  const [store, setStore] = useState(() => readStore());
  const [copied, setCopied] = useState(null);
  const [logoError, setLogoError] = useState(null);
  const [posterReady, setPosterReady] = useState(false);
  const [openField, setOpenField] = useState(null);

  const kind = store.kind === REAL ? REAL : COMPOSITE;
  const poolSize = storiesOfKind(kind).length;
  const cursor = Number.isFinite(store.cursor) ? store.cursor : 0;
  const story = useMemo(() => storyAt(kind, cursor), [kind, cursor]);
  const logo = store.logo || null;
  const generatedAt = store.generatedAt || null;

  // Cadence: 15 day publishing window counted from the last generation.
  const cadence = useMemo(() => {
    if (!generatedAt) {
      return { state: 'fresh-install', daysLeft: NEWSLETTER_CADENCE_DAYS, daysSince: null, due: null };
    }
    const due = generatedAt + NEWSLETTER_CADENCE_DAYS * DAY;
    const now = Date.now();
    const daysSince = Math.floor((now - generatedAt) / DAY);
    const daysLeft = Math.ceil((due - now) / DAY);
    return {
      state: now >= due ? 'overdue' : daysLeft <= 3 ? 'soon' : 'ok',
      daysLeft,
      daysSince,
      due,
    };
  }, [generatedAt]);

  const persist = useCallback((patch) => {
    setStore((prev) => {
      const next = { ...prev, ...patch };
      writeStore(next);
      return next;
    });
  }, []);

  const handleCopy = useCallback(async (text, label) => {
    try {
      if (navigator.clipboard && navigator.clipboard.writeText) {
        await navigator.clipboard.writeText(text);
      } else {
        legacyCopy(text);
      }
    } catch (e) {
      // Clipboard permission can be refused, so fall back rather than lose the copy.
      try { legacyCopy(text); } catch (e2) { void e2; }
    }
    setCopied(label);
  }, []);

  useEffect(() => {
    if (!copied) return undefined;
    const t = setTimeout(() => setCopied(null), 2200);
    return () => clearTimeout(t);
  }, [copied]);

  const handleRefresh = useCallback(() => {
    persist({ kind, cursor: cursor + 1, generatedAt: Date.now() });
  }, [persist, kind, cursor]);

  const handleKind = useCallback((next) => {
    persist({ kind: next, cursor: 0, generatedAt: Date.now() });
  }, [persist]);

  const handleLogoFile = useCallback(async (e) => {
    const file = e.target.files && e.target.files[0];
    e.target.value = '';
    if (!file) return;
    setLogoError(null);
    try {
      const { dataUrl, width, height } = await prepareLogo(file);
      if (dataUrl.length > MAX_LOGO_CHARS) {
        setLogoError('That logo is still too large after resizing. Try a simpler image with less detail.');
        return;
      }
      persist({ logo: dataUrl });
      setCopied(null);
      void width; void height;
    } catch (err) {
      setLogoError(err.message || 'That image could not be used.');
    }
  }, [persist]);

  const clearLogo = useCallback(() => persist({ logo: null }), [persist]);

  // Draw the poster whenever the story, logo or cadence label changes.
  useEffect(() => {
    if (!user || !story || !canvasRef.current) return;
    let cancelled = false;
    (async () => {
      if (document.fonts && document.fonts.ready) {
        try { await document.fonts.ready; } catch (e) { void e; }
      }
      if (cancelled || !canvasRef.current) return;
      const img = await loadImage(logo);
      if (cancelled || !canvasRef.current) return;
      try {
        drawPoster(canvasRef.current, story, {
          logo: img,
          issueLabel: generatedAt ? `ISSUE ${fmtDate(generatedAt)}` : '',
        });
        setPosterReady(true);
      } catch (e) {
        console.error('Poster render failed:', e);
        setPosterReady(false);
      }
    })();
    return () => { cancelled = true; };
  }, [user, story, logo, generatedAt]);

  const downloadPoster = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const a = document.createElement('a');
    a.href = canvas.toDataURL('image/png');
    a.download = `vendor-brief-${story.id}.png`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  }, [story]);

  if (loading) {
    return (
      <div className="py-16 text-center text-sm text-navy-500" data-testid="vendor-brief-loading">
        Loading your workspace...
      </div>
    );
  }

  if (!user) {
    return (
      <div id="panel-Incident Brief" role="tabpanel" aria-labelledby="vtab-Incident Brief" className="py-4">
        <LockedPanel isDark={isDark} />
      </div>
    );
  }

  if (!story) return null;

  const teaserLen = story.teaser.length;
  const teaserInBand = teaserLen >= TEASER_MIN && teaserLen <= TEASER_MAX;
  const isReal = story.kind === REAL;
  const card = isDark ? 'bg-surface-dark-100 border-surface-dark-300' : 'bg-white border-surface-300';
  const sub = isDark ? 'text-text-dark-secondary' : 'text-navy-600';
  const subMuted = isDark ? 'text-text-dark-muted' : 'text-navy-500';

  return (
    <div id="panel-Incident Brief" role="tabpanel" aria-labelledby="vtab-Incident Brief"
      className="space-y-6" data-testid="vendor-brief">
      <input ref={fileRef} type="file" accept="image/*" onChange={handleLogoFile} className="hidden" data-testid="vendor-brief-logo-input" />

      {/* Control bar */}
      <div className={`rounded-2xl border p-4 flex flex-wrap items-center gap-3 justify-between ${card}`}>
        <div className="flex flex-wrap items-center gap-2">
          <div className="inline-flex rounded-xl border border-surface-300 dark:border-surface-dark-300 overflow-hidden" role="group" aria-label="Story source">
            {[
              { id: COMPOSITE, label: 'Composite scenarios', count: storiesOfKind(COMPOSITE).length },
              { id: REAL, label: 'Curated incidents', count: storiesOfKind(REAL).length },
            ].map((opt) => (
              <button
                key={opt.id}
                type="button"
                onClick={() => handleKind(opt.id)}
                data-testid={`vendor-brief-kind-${opt.id}`}
                aria-pressed={kind === opt.id}
                className={`px-4 py-2 text-sm font-medium transition-colors
                  ${kind === opt.id
                    ? 'bg-indigo-600 text-white'
                    : isDark ? 'bg-surface-dark-100 text-text-dark-secondary hover:bg-surface-dark-200'
                      : 'bg-white text-navy-600 hover:bg-surface-100'}`}
              >
                {opt.label} ({opt.count})
              </button>
            ))}
          </div>
          <Pill isDark={isDark} tone="neutral" testId="vendor-brief-position">
            {((cursor % poolSize) + 1)} of {poolSize}
          </Pill>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          {cadence.state === 'overdue' && (
            <Pill tone="warn" isDark testId="vendor-brief-cadence-pill">
              <CalendarClock className="w-3.5 h-3.5" />
              {cadence.daysSince} days old, refresh due
            </Pill>
          )}
          {cadence.state === 'soon' && (
            <Pill tone="accent" isDark testId="vendor-brief-cadence-pill">
              <CalendarClock className="w-3.5 h-3.5" />
              Next slot in {cadence.daysLeft}d
            </Pill>
          )}
          {cadence.state === 'ok' && (
            <Pill tone="good" isDark testId="vendor-brief-cadence-pill">
              <CalendarClock className="w-3.5 h-3.5" />
              {cadence.daysLeft}d of {NEWSLETTER_CADENCE_DAYS}d window
            </Pill>
          )}
          {cadence.state === 'fresh-install' && (
            <Pill tone="accent" isDark testId="vendor-brief-cadence-pill">
              <Sparkles className="w-3.5 h-3.5" />
              Not yet generated
            </Pill>
          )}
          <button
            type="button"
            onClick={handleRefresh}
            data-testid="vendor-brief-refresh"
            className="inline-flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium bg-indigo-600 text-white hover:bg-indigo-700 transition-colors"
          >
            <RefreshCw className="w-4 h-4" />
            Refresh article
          </button>
        </div>
      </div>

      {cadence.due && (
        <p className={`text-xs ${subMuted}`} data-testid="vendor-brief-cadence-note">
          Publishing window is {NEWSLETTER_CADENCE_DAYS} days. Next one opens on {fmtDate(cadence.due)}.
        </p>
      )}

      {/* Article */}
      <article className={`rounded-3xl border overflow-hidden ${card}`} data-testid="vendor-brief-article">
        <div className="p-6 md:p-8">
          <div className="flex flex-wrap items-center gap-2 mb-4">
            <Pill tone={isReal ? 'danger' : 'accent'} isDark testId="vendor-brief-kind-badge">
              {isReal ? <AlertTriangle className="w-3.5 h-3.5" /> : <Info className="w-3.5 h-3.5" />}
              {isReal ? 'Curated public incident' : 'Composite scenario'}
            </Pill>
            <Pill isDark={isDark} tone="neutral">{story.sector}</Pill>
            <Pill isDark={isDark} tone="neutral">{story.tier}</Pill>
          </div>

          <h3 className={`text-2xl md:text-3xl font-bold mb-4 ${isDark ? 'text-text-dark-primary' : 'text-navy-900'}`}
            data-testid="vendor-brief-title">
            {story.title}
          </h3>

          {isReal && (
            <p className="text-sm mb-5 p-3 rounded-xl bg-amber-50 border border-amber-200 text-amber-800" data-testid="vendor-brief-factcheck">
              These are condensed public facts and every figure should be checked against the
              source before it goes out under your name. The analysis below is our own.
            </p>
          )}

          {/* Teaser: the 300 to 400 character slot for the newsletter itself. */}
          <div className={`rounded-2xl p-5 border ${isDark ? 'bg-surface-dark-200 border-surface-dark-300' : 'bg-surface-50 border-surface-300'}`}>
            <div className="flex items-center justify-between gap-3 mb-2">
              <span className={`text-xs font-semibold uppercase tracking-wide ${sub}`}>
                Newsletter teaser
              </span>
              <span
                data-testid="vendor-brief-teaser-count"
                className={`text-xs font-mono px-2 py-0.5 rounded ${teaserInBand
                  ? 'bg-emerald-50 text-emerald-700'
                  : 'bg-red-50 text-red-700'}`}
              >
                {teaserLen} / {TEASER_MIN}-{TEASER_MAX} chars
              </span>
            </div>
            <p className={`text-base leading-relaxed ${isDark ? 'text-text-dark-primary' : 'text-navy-800'}`}
              data-testid="vendor-brief-teaser">
              {story.teaser}
            </p>
            <div className="flex flex-wrap gap-2 mt-4">
              <CopyButton
                testId="vendor-brief-copy-teaser"
                isCopied={copied === 'teaser'}
                onCopy={() => handleCopy(story.teaser, 'teaser')}
                isDark={isDark}
              >
                {copied === 'teaser' ? 'Copied teaser' : 'Copy teaser'}
              </CopyButton>
              <CopyButton
                testId="vendor-brief-copy-plain"
                isCopied={copied === 'plain'}
                onCopy={() => handleCopy(storyToPlainText(story), 'plain')}
                isDark={isDark}
              >
                {copied === 'plain' ? 'Copied full brief' : 'Copy full brief'}
              </CopyButton>
              <CopyButton
                testId="vendor-brief-copy-markdown"
                isCopied={copied === 'markdown'}
                onCopy={() => handleCopy(storyToMarkdown(story), 'markdown')}
                isDark={isDark}
              >
                {copied === 'markdown' ? 'Copied markdown' : 'Copy markdown'}
              </CopyButton>
            </div>
          </div>

          {/* Stat strip, mirrors the poster */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mt-6" data-testid="vendor-brief-stats">
            {story.stats.map((st) => (
              <div key={st.k} className={`rounded-xl border p-4 ${isDark ? 'bg-surface-dark-200 border-surface-dark-300' : 'bg-surface-100 border-surface-300'}`}>
                <div className={`text-xs font-semibold uppercase tracking-wide ${subMuted}`}>{st.k}</div>
                <div className="text-lg font-bold mt-1 ${isDark ? 'text-text-dark-primary' : 'text-navy-900'}"
                  data-testid={`vendor-brief-stat-${st.k.toLowerCase()}`}>
                  {st.v}
                </div>
              </div>
            ))}
          </div>

          {/* Fields */}
          <div className="mt-6 divide-y ${isDark ? 'divide-surface-dark-300' : 'divide-surface-300'}"
            data-testid="vendor-brief-fields">
            {FIELD_LABELS.map((f) => {
              const open = openField === f.key;
              return (
                <div key={f.key}>
                  <button
                    type="button"
                    onClick={() => setOpenField(open ? null : f.key)}
                    aria-expanded={open}
                    data-testid={`vendor-brief-field-toggle-${f.key}`}
                    className="w-full flex items-center justify-between gap-3 py-4 text-left"
                  >
                    <span className="min-w-0">
                      <span className={`block font-semibold ${isDark ? 'text-text-dark-primary' : 'text-navy-900'}`}>
                        {f.label}
                      </span>
                      <span className={`block text-xs ${subMuted}`}>{f.hint}</span>
                    </span>
                    <ChevronDown className={`w-5 h-5 flex-shrink-0 transition-transform ${open ? 'rotate-180' : ''} ${sub}`} />
                  </button>
                  {open && (
                    <p className={`pb-4 leading-relaxed ${isDark ? 'text-text-dark-secondary' : 'text-navy-700'}`}
                      data-testid={`vendor-brief-field-${f.key}`}>
                      {story[f.key]}
                    </p>
                  )}
                </div>
              );
            })}
          </div>

          {story.sources?.length ? (
            <div className="mt-5 pt-5 border-t ${isDark ? 'border-surface-dark-300' : 'border-surface-300'}">
              <h4 className={`text-sm font-semibold mb-2 flex items-center gap-2 ${isDark ? 'text-text-dark-primary' : 'text-navy-900'}`}>
                <FileText className="w-4 h-4" />
                Sources
              </h4>
              <ul className="space-y-1">
                {story.sources.map((s) => (
                  <li key={s.url}>
                    <a href={s.url} target="_blank" rel="noreferrer"
                      className="inline-flex items-center gap-1.5 text-sm text-indigo-600 hover:text-indigo-700 dark:text-indigo-400">
                      {s.label}
                      <ExternalLink className="w-3.5 h-3.5" />
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ) : null}
        </div>
      </article>

      {/* Poster */}
      <div className={`rounded-3xl border p-6 md:p-8 ${card}`} data-testid="vendor-brief-poster">
        <div className="flex flex-wrap items-center justify-between gap-3 mb-5">
          <div>
            <h3 className={`text-lg font-bold ${isDark ? 'text-text-dark-primary' : 'text-navy-900'}`}>
              Newsletter poster
            </h3>
            <p className={`text-sm ${sub}`}>
              1080 by 1350 PNG at 2x. Drop a logo on and it is placed in the footer.
            </p>
          </div>
          <div className="flex flex-wrap gap-2">
            <button
              type="button"
              onClick={() => fileRef.current?.click()}
              data-testid="vendor-brief-upload-logo"
              className={`inline-flex items-center gap-2 px-3.5 py-2 rounded-lg text-sm font-medium border
                ${isDark ? 'bg-surface-dark-200 text-text-dark-primary border-surface-dark-300' : 'bg-white text-navy-700 border-surface-300'}`}
            >
              <Upload className="w-4 h-4" />
              {logo ? 'Replace logo' : 'Upload logo'}
            </button>
            {logo && (
              <button
                type="button"
                onClick={clearLogo}
                data-testid="vendor-brief-clear-logo"
                className="inline-flex items-center gap-2 px-3.5 py-2 rounded-lg text-sm font-medium border border-red-200 bg-red-50 text-red-700"
              >
                <Trash2 className="w-4 h-4" />
                Remove
              </button>
            )}
            <button
              type="button"
              onClick={downloadPoster}
              disabled={!posterReady}
              data-testid="vendor-brief-download-poster"
              className="inline-flex items-center gap-2 px-3.5 py-2 rounded-lg text-sm font-medium bg-indigo-600 text-white hover:bg-indigo-700 disabled:opacity-50"
            >
              <Download className="w-4 h-4" />
              Download PNG
            </button>
          </div>
        </div>

        {logoError && (
          <p className="mb-4 text-sm p-3 rounded-xl bg-red-50 border border-red-200 text-red-700" data-testid="vendor-brief-logo-error">
            {logoError}
          </p>
        )}

        <div className="grid md:grid-cols-2 gap-6 items-start">
          <div className={`rounded-2xl border p-3 flex items-center justify-center
            ${isDark ? 'bg-surface-dark-200 border-surface-dark-300' : 'bg-surface-100 border-surface-300'}`}>
            <canvas
              ref={canvasRef}
              data-testid="vendor-brief-poster-canvas"
              className="w-full max-w-[420px] h-auto rounded-lg shadow-lg"
              style={{ aspectRatio: '1080 / 1350' }}
            />
          </div>

          <div className="space-y-3">
            <div className={`rounded-2xl border p-4 ${isDark ? 'bg-surface-dark-200 border-surface-dark-300' : 'bg-surface-50 border-surface-300'}`}>
              <h4 className={`text-sm font-semibold mb-1 flex items-center gap-2 ${isDark ? 'text-text-dark-primary' : 'text-navy-900'}`}>
                <ImageIcon className="w-4 h-4" />
                Brand
              </h4>
              <p className={`text-xs ${sub}`}>
                {logo
                  ? 'Logo is stored in this browser only and is drawn into the footer of the poster.'
                  : 'No logo yet. Without one the footer shows the sector and review tier only.'}
              </p>
              {logo && (
                <img src={logo} alt="Uploaded logo preview" data-testid="vendor-brief-logo-preview"
                  className="mt-3 max-h-14 max-w-full object-contain rounded bg-white p-2" />
              )}
            </div>

            <div className={`rounded-2xl border p-4 ${isDark ? 'bg-surface-dark-200 border-surface-dark-300' : 'bg-surface-50 border-surface-300'}`}>
              <h4 className={`text-sm font-semibold mb-1 flex items-center gap-2 ${isDark ? 'text-text-dark-primary' : 'text-navy-900'}`}>
                <CalendarClock className="w-4 h-4" />
                Cadence
              </h4>
              <p className={`text-xs ${sub}`}>
                One article every {NEWSLETTER_CADENCE_DAYS} days. Refresh resets the window and
                pulls the next story, so nothing repeats for at least {NEWSLETTER_CADENCE_DAYS * poolSize} days.
              </p>
            </div>

            <div className={`rounded-2xl border p-4 ${isDark ? 'bg-surface-dark-200 border-surface-dark-300' : 'bg-surface-50 border-surface-300'}`}>
              <h4 className={`text-sm font-semibold mb-1 flex items-center gap-2 ${isDark ? 'text-text-dark-primary' : 'text-navy-900'}`}>
                <FileText className="w-4 h-4" />
                How to publish
              </h4>
              <p className={`text-xs ${sub}`}>
                Copy the teaser for the body of the email, or the full brief when a publisher wants
                the long version. Download the poster and embed it as the image block. On a
                composite scenario you can publish as is. On a curated incident, check the figures first.
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="text-xs text-center ${subMuted}">
        {VENDOR_INCIDENT_STORIES.length} stories on file, {storiesOfKind(COMPOSITE).length} composite and {storiesOfKind(REAL).length} curated.
        {' '}State is stored in this browser only.
      </div>

      {copied && (
        <div className="sr-only" data-testid="vendor-brief-copied-payload" data-copied-label={copied}>
          {copied === 'teaser' ? story.teaser : copied === 'plain' ? storyToPlainText(story) : storyToMarkdown(story)}
        </div>
      )}
    </div>
  );
}
