import { Newsletter, getSettings, escapeHtml, SITE, TZ } from './newsletter.js';
import { sendOne, uniqueSlug } from './mailer.js';

const decode = (s) => String(s || '').replace(/<!\[CDATA\[([\s\S]*?)\]\]>/g, '$1').replace(/<[^>]+>/g, '')
  .replace(/&amp;/g, '&').replace(/&lt;/g, '<').replace(/&gt;/g, '>').replace(/&quot;/g, '"').replace(/&#39;|&apos;/g, "'").trim();
const tag = (xml, name) => { const m = xml.match(new RegExp(`<${name}[^>]*>([\\s\\S]*?)</${name}>`, 'i')); return m ? decode(m[1]) : ''; };

// Reads RSS 2.0 or Atom. Keeps only title, link and date. No article text is copied.
export function parseFeed(xml) {
  const items = [...xml.matchAll(/<(item|entry)\b[\s\S]*?<\/\1>/gi)].map((m) => m[0]);
  return items.map((it) => {
    const atomLink = it.match(/<link[^>]*href="([^"]+)"/i)?.[1];
    const link = tag(it, 'link') || atomLink || '';
    const date = new Date(tag(it, 'pubDate') || tag(it, 'published') || tag(it, 'updated') || tag(it, 'dc:date') || 0);
    return { title: tag(it, 'title').slice(0, 200), link: /^https?:\/\//.test(link) ? link : '', date: Number.isNaN(date.getTime()) ? new Date(0) : date };
  }).filter((x) => x.title && x.link);
}

// Is a digest due now, given the admin's schedule (Asia/Kolkata)?
export function digestDue(s, now = new Date()) {
  if (!s.digestEnabled || !(s.sources || []).length) return false;
  const parts = Object.fromEntries(new Intl.DateTimeFormat('en-GB', { timeZone: TZ, weekday: 'short', day: 'numeric', hour: 'numeric', hourCycle: 'h23' })
    .formatToParts(now).map((p) => [p.type, p.value]));
  const dow = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].indexOf(parts.weekday);
  const hour = Number(parts.hour); const dom = Number(parts.day);
  const last = s.lastDigestAt ? now - s.lastDigestAt : Infinity;
  const day = 86400000;
  if (hour < (s.digestHour ?? 9)) return false;
  if (s.digestFrequency === 'monthly') return dom === (s.digestDay || 1) && last > 20 * day;
  if (dow !== (s.digestDay ?? 1)) return false;
  return s.digestFrequency === 'fortnightly' ? last > 13 * day : last > 6 * day;
}

export async function buildDigest({ force = false } = {}) {
  const s = await getSettings();
  if (!force && !digestDue(s)) return { created: false, reason: 'not due' };
  const since = s.lastDigestAt || new Date(Date.now() - 14 * 86400000);
  const sections = [];
  for (const src of s.sources || []) {
    try {
      const res = await fetch(src.url, { headers: { 'User-Agent': 'OneLens digest (+https://spectacular-genie-bda511.netlify.app)' }, signal: AbortSignal.timeout(8000) });
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const items = parseFeed(await res.text()).filter((i) => i.date > (src.lastSeenAt || since)).slice(0, 10);
      if (items.length) {
        sections.push({ name: src.name || new URL(src.url).hostname, items });
        src.lastSeenAt = items.reduce((a, b) => (b.date > a ? b.date : a), src.lastSeenAt || since);
      }
    } catch (e) {
      console.warn('Digest source failed', src.url, e.message);
    }
  }
  s.lastDigestAt = new Date();
  await s.save();
  if (!sections.length) return { created: false, reason: 'no new items' };

  const dateLabel = new Intl.DateTimeFormat('en-GB', { timeZone: TZ, day: 'numeric', month: 'short', year: 'numeric' }).format(new Date());
  const title = `GRC digest: ${dateLabel}`;
  const clean = (t) => t.replace(/[[\]]/g, '');
  const body = sections.map((sec) => [`## ${sec.name}`, ...sec.items.map((i) => `- [${clean(i.title)}](${i.link}) (${sec.name})\n  My note: `)].join('\n')).join('\n\n');
  const issue = await Newsletter.create({ title, body, status: 'draft', kind: 'digest', slug: await uniqueSlug(title) });

  const admin = process.env.ADMIN_EMAIL;
  if (admin && s.digestNotify) {
    try {
      await sendOne({ to: admin, subject: `New digest draft ready: ${title}`,
        html: `<p style="font-family:Arial,sans-serif">A new draft (${sections.reduce((n, x) => n + x.items.length, 0)} items) is waiting for your notes. It will not be sent until you publish or schedule it.</p><p style="font-family:Arial,sans-serif"><a href="${SITE}/admin/newsletter">Open the newsletter editor</a></p><p style="font-family:Arial,sans-serif;color:#64748b;font-size:12px">${escapeHtml(title)}</p>` });
    } catch (e) { console.warn('Digest notification failed', e.message); }
  }
  return { created: true, id: String(issue._id), title };
}
