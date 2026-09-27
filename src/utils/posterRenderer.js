/**
 * Canvas poster renderer for vendor incident briefs.
 *
 * Deliberately DOM free apart from the canvas it is handed, so the layout maths
 * is reviewable on its own and the same code runs in a test harness.
 *
 * Design notes: 1080x1350 at 2x, which is the 4:5 ratio newsletters and social
 * schedulers both want. Text bands auto shrink to fit rather than clip, because
 * a truncated sentence in a published image is worse than slightly smaller type.
 */

const W = 1080;
const H = 1350;
const PAD = 72;

const FONT = '"Inter", "Helvetica Neue", system-ui, -apple-system, "Segoe UI", sans-serif';
const MONO = '"SF Mono", "JetBrains Mono", ui-monospace, Menlo, monospace';

const INK = '#F8FAFC';
const MUTED = '#94A3B8';
const FAINT = '#64748B';
const BASE = '#0B1120';

function hexToRgb(hex) {
  const h = hex.replace('#', '');
  const full = h.length === 3 ? h.split('').map((c) => c + c).join('') : h;
  return {
    r: parseInt(full.slice(0, 2), 16),
    g: parseInt(full.slice(2, 4), 16),
    b: parseInt(full.slice(4, 6), 16),
  };
}

function rgba(hex, alpha) {
  const { r, g, b } = hexToRgb(hex);
  return `rgba(${r}, ${g}, ${b}, ${alpha})`;
}

function mix(hex, target, amount) {
  const a = hexToRgb(hex);
  const b = hexToRgb(target);
  const c = (x, y) => Math.round(x + (y - x) * amount);
  return `rgb(${c(a.r, b.r)}, ${c(a.g, b.g)}, ${c(a.b, b.b)})`;
}

function roundRect(ctx, x, y, w, h, r) {
  if (typeof ctx.roundRect === 'function') {
    ctx.beginPath();
    ctx.roundRect(x, y, w, h, r);
    return;
  }
  const rad = Math.min(r, w / 2, h / 2);
  ctx.beginPath();
  ctx.moveTo(x + rad, y);
  ctx.arcTo(x + w, y, x + w, y + h, rad);
  ctx.arcTo(x + w, y + h, x, y + h, rad);
  ctx.arcTo(x, y + h, x, y, rad);
  ctx.arcTo(x, y, x + w, y, rad);
  ctx.closePath();
}

/** Greedy word wrap. Breaks a single word only if it cannot fit on its own line. */
function wrap(ctx, text, maxWidth) {
  const out = [];
  for (const para of String(text).split('\n')) {
    const words = para.split(/\s+/).filter(Boolean);
    if (!words.length) {
      out.push('');
      continue;
    }
    let line = '';
    for (const word of words) {
      const probe = line ? `${line} ${word}` : word;
      if (ctx.measureText(probe).width <= maxWidth) {
        line = probe;
        continue;
      }
      if (line) out.push(line);
      if (ctx.measureText(word).width <= maxWidth) {
        line = word;
      } else {
        let chunk = '';
        for (const ch of word) {
          if (ctx.measureText(chunk + ch).width > maxWidth && chunk) {
            out.push(chunk);
            chunk = ch;
          } else {
            chunk += ch;
          }
        }
        line = chunk;
      }
    }
    if (line) out.push(line);
  }
  return out;
}

function setFont(ctx, size, weight = 400, family = FONT) {
  ctx.font = `${weight} ${size}px ${family}`;
}

/**
 * Draw text into a fixed band, shrinking the size until the wrapped block fits.
 * Returns the font size actually used, or null when even the minimum overflows.
 */
function fitBlock(ctx, text, opts) {
  const {
    x, y, maxWidth, maxHeight, start, min = 20, weight = 400,
    family = FONT, lineRatio = 1.35, color = INK, align = 'left',
  } = opts;
  let size = start;
  let lines = [];
  while (size >= min) {
    setFont(ctx, size, weight, family);
    lines = wrap(ctx, text, maxWidth);
    if (lines.length * size * lineRatio <= maxHeight) break;
    size -= 1;
  }
  setFont(ctx, size, weight, family);
  lines = wrap(ctx, text, maxWidth);
  const lineHeight = size * lineRatio;
  ctx.fillStyle = color;
  ctx.textAlign = align;
  ctx.textBaseline = 'top';
  lines.forEach((line, i) => {
    const lx = align === 'center' ? x + maxWidth / 2 : align === 'right' ? x + maxWidth : x;
    ctx.fillText(line, lx, y + i * lineHeight);
  });
  return { size, height: lines.length * lineHeight, overflow: lines.length * lineHeight > maxHeight };
}

function drawBackdrop(ctx, accent) {
  ctx.fillStyle = BASE;
  ctx.fillRect(0, 0, W, H);

  const glow = ctx.createRadialGradient(W * 0.92, H * 0.02, 0, W * 0.92, H * 0.02, W * 0.85);
  glow.addColorStop(0, rgba(accent, 0.34));
  glow.addColorStop(0.45, rgba(accent, 0.09));
  glow.addColorStop(1, rgba(accent, 0));
  ctx.fillStyle = glow;
  ctx.fillRect(0, 0, W, H);

  const bar = ctx.createLinearGradient(0, 0, W, 0);
  bar.addColorStop(0, accent);
  bar.addColorStop(1, mix(accent, '#F8FAFC', 0.45));
  ctx.fillStyle = bar;
  ctx.fillRect(0, 0, W, 10);

  // A quiet grid so the large empty areas do not read as a flat placeholder.
  ctx.strokeStyle = 'rgba(148, 163, 184, 0.06)';
  ctx.lineWidth = 1;
  for (let x = PAD; x < W; x += 60) {
    ctx.beginPath();
    ctx.moveTo(x, 0);
    ctx.lineTo(x, H);
    ctx.stroke();
  }
}

function drawLogo(ctx, logo, x, y, maxW, maxH) {
  if (!logo) return null;
  const iw = logo.naturalWidth || logo.width;
  const ih = logo.naturalHeight || logo.height;
  if (!iw || !ih) return null;
  const scale = Math.min(maxW / iw, maxH / ih, 1);
  const w = iw * scale;
  const h = ih * scale;
  ctx.save();
  ctx.globalAlpha = 0.96;
  ctx.drawImage(logo, x, y, w, h);
  ctx.restore();
  return { w, h };
}

function dateStamp(iso) {
  const d = iso ? new Date(iso) : new Date();
  if (Number.isNaN(d.getTime())) return '';
  return d.toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' });
}

/**
 * Renders the poster for one story.
 *
 * @param {HTMLCanvasElement} canvas target, sized by this function
 * @param {object} story story from the corpus
 * @param {object} [opts]
 * @param {HTMLImageElement} [opts.logo] already decoded logo
 * @param {string} [opts.issueLabel] small print for the cadence
 * @returns {{ dataUrl: string, width: number, height: number, text: string }}
 */
export function drawPoster(canvas, story, opts = {}) {
  const { logo = null, issueLabel = '', scale = 2 } = opts;
  const accent = story.accent || '#6366f1';

  canvas.width = W * scale;
  canvas.height = H * scale;
  const ctx = canvas.getContext('2d');
  ctx.scale(scale, scale);
  ctx.textBaseline = 'top';
  ctx.textAlign = 'left';

  drawBackdrop(ctx, accent);

  const inner = W - PAD * 2;
  let y = 62;

  // Kicker row: series name, cadence label, and the provenance badge.
  setFont(ctx, 22, 700, MONO);
  ctx.fillStyle = mix(accent, '#F8FAFC', 0.55);
  ctx.letterSpacing = '2px';
  ctx.fillText('VENDOR RISK FIELD NOTE', PAD, y);
  const kickerW = ctx.measureText('VENDOR RISK FIELD NOTE').width;
  ctx.letterSpacing = '0px';

  if (issueLabel) {
    setFont(ctx, 20, 500, MONO);
    ctx.fillStyle = FAINT;
    ctx.fillText(issueLabel, PAD + kickerW + 26, y + 1);
  }

  y += 46;

  // Provenance badge. Real incidents get an explicit verification marker.
  const isReal = story.kind === 'real';
  const badge = isReal ? 'CURATED INCIDENT  |  VERIFY BEFORE PUBLISHING' : 'COMPOSITE SCENARIO  |  ILLUSTRATIVE';
  setFont(ctx, 19, 700, MONO);
  const badgeW = ctx.measureText(badge).width + 34;
  ctx.fillStyle = isReal ? 'rgba(239, 68, 68, 0.16)' : rgba(accent, 0.18);
  roundRect(ctx, PAD, y, badgeW, 40, 20);
  ctx.fill();
  ctx.strokeStyle = isReal ? 'rgba(239, 68, 68, 0.55)' : rgba(accent, 0.5);
  ctx.lineWidth = 1.5;
  ctx.stroke();
  ctx.fillStyle = isReal ? '#FCA5A5' : mix(accent, '#F8FAFC', 0.6);
  ctx.fillText(badge, PAD + 17, y + 10);

  y += 74;

  // Headline
  const title = fitBlock(ctx, story.title, {
    x: PAD, y, maxWidth: inner, maxHeight: 190,
    start: 68, min: 42, weight: 800, lineRatio: 1.14, color: INK,
  });
  y += title.height + 30;

  // Accent rule
  ctx.fillStyle = accent;
  roundRect(ctx, PAD, y, 116, 6, 3);
  ctx.fill();
  y += 44;

  // Teaser inside a soft card
  const teaserTop = y;
  const teaserFit = fitBlock(ctx, story.teaser, {
    x: PAD + 32, y: teaserTop + 32, maxWidth: inner - 64, maxHeight: 300,
    start: 32, min: 24, weight: 400, lineRatio: 1.5, color: '#E2E8F0',
  });
  const teaserHeight = teaserFit.height + 64;
  ctx.fillStyle = 'rgba(148, 163, 184, 0.07)';
  roundRect(ctx, PAD, teaserTop, inner, teaserHeight, 28);
  ctx.fill();
  ctx.strokeStyle = 'rgba(148, 163, 184, 0.14)';
  ctx.lineWidth = 1.5;
  ctx.stroke();
  // Redraw the text now that the card sits behind it.
  fitBlock(ctx, story.teaser, {
    x: PAD + 32, y: teaserTop + 32, maxWidth: inner - 64, maxHeight: 300,
    start: teaserFit.size, min: 24, weight: 400, lineRatio: 1.5, color: '#E2E8F0',
  });
  y = teaserTop + teaserHeight + 30;

  // Root cause strip: label plus the opening clause of the cause.
  const firstClause = String(story.rootCause).split(/(?<=\.)\s/)[0];
  setFont(ctx, 18, 700, MONO);
  ctx.fillStyle = mix(accent, '#F8FAFC', 0.4);
  ctx.letterSpacing = '1.5px';
  ctx.fillText('ROOT CAUSE', PAD, y);
  ctx.letterSpacing = '0px';
  y += 32;
  const cause = fitBlock(ctx, firstClause, {
    x: PAD, y, maxWidth: inner, maxHeight: 120,
    start: 28, min: 21, weight: 500, lineRatio: 1.42, color: MUTED,
  });
  y += cause.height + 34;

  // Stat strip
  const stats = story.stats.slice(0, 4);
  const gap = 18;
  const boxW = (inner - gap * (stats.length - 1)) / stats.length;
  const boxH = 132;
  stats.forEach((st, i) => {
    const x = PAD + i * (boxW + gap);
    ctx.fillStyle = 'rgba(15, 23, 42, 0.72)';
    roundRect(ctx, x, y, boxW, boxH, 22);
    ctx.fill();
    ctx.strokeStyle = rgba(accent, 0.34);
    ctx.lineWidth = 1.5;
    ctx.stroke();

    setFont(ctx, 15, 700, MONO);
    ctx.fillStyle = FAINT;
    ctx.letterSpacing = '1.2px';
    ctx.fillText(String(st.k).toUpperCase(), x + 18, y + 18);
    ctx.letterSpacing = '0px';

    let vs = 44;
    setFont(ctx, vs, 800);
    while (vs > 22 && ctx.measureText(String(st.v)).width > boxW - 36) {
      vs -= 2;
      setFont(ctx, vs, 800);
    }
    ctx.fillStyle = mix(accent, '#F8FAFC', 0.72);
    ctx.fillText(String(st.v), x + 18, y + 48);
  });
  y += boxH + 34;

  // Footer: sector, tier, date, and the logo if one was uploaded.
  const footerY = H - PAD - 6;
  ctx.strokeStyle = 'rgba(148, 163, 184, 0.18)';
  ctx.lineWidth = 1;
  ctx.beginPath();
  ctx.moveTo(PAD, footerY - 30);
  ctx.lineTo(W - PAD, footerY - 30);
  ctx.stroke();

  setFont(ctx, 20, 600, MONO);
  ctx.fillStyle = MUTED;
  ctx.fillText(`${story.sector}  |  ${story.tier}`, PAD, footerY);

  setFont(ctx, 18, 500, MONO);
  ctx.fillStyle = FAINT;
  const stamp = dateStamp();
  ctx.fillText(stamp, PAD, footerY + 30);

  const logoBox = { w: 190, h: 72 };
  if (logo) {
    const drawn = drawLogo(ctx, logo, W - PAD - logoBox.w, footerY - 8, logoBox.w, logoBox.h);
    if (drawn) {
      setFont(ctx, 14, 600, MONO);
      ctx.fillStyle = FAINT;
      ctx.textAlign = 'right';
      ctx.fillText('LOGO', W - PAD, footerY + 30);
      ctx.textAlign = 'left';
    }
  }

  return {
    dataUrl: canvas.toDataURL('image/png'),
    width: canvas.width,
    height: canvas.height,
    text: [
      story.title,
      story.teaser,
      `Root cause: ${firstClause}`,
      `${story.sector} | ${story.tier}`,
      dateStamp(),
    ].join('\n'),
  };
}
