// Small, safe Markdown to HTML for newsletters: headings, bold, italic, links, bullet and numbered lists, paragraphs.
// Input is escaped first, so raw HTML in the body is shown as text. Shared by the editor preview and the email sender.
const esc = (s) => String(s ?? '').replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));

const inline = (s, linkStyle) => s
  .replace(/\[([^\]]+)\]\((https?:\/\/[^\s)]+|mailto:[^\s)]+|\/[^\s)]*)\)/g, (_, t, u) => `<a href="${u}"${linkStyle ? ` style="${linkStyle}"` : ''}>${t}</a>`)
  .replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>')
  .replace(/(^|[^*])\*([^*\s][^*]*)\*/g, '$1<em>$2</em>')
  .replace(/`([^`]+)`/g, '<code>$1</code>');

export function markdownToHtml(md, { email = false } = {}) {
  const S = email ? {
    h1: 'font-size:22px;margin:20px 0 8px;color:#0f172a', h2: 'font-size:18px;margin:18px 0 6px;color:#0f172a', h3: 'font-size:16px;margin:16px 0 4px;color:#0f172a',
    p: 'margin:0 0 12px;line-height:1.6;color:#1f2937', li: 'margin:0 0 4px;line-height:1.6;color:#1f2937', list: 'margin:0 0 12px;padding-left:20px', a: 'color:#1d4ed8',
  } : {};
  const at = (k) => (S[k] ? ` style="${S[k]}"` : '');
  const lines = esc(md).replace(/\r\n/g, '\n').split('\n');
  const out = [];
  let list = null; let para = [];
  const flushPara = () => { if (para.length) { out.push(`<p${at('p')}>${inline(para.join(' '), S.a)}</p>`); para = []; } };
  const closeList = () => { if (list) { out.push(`</${list}>`); list = null; } };
  for (const raw of lines) {
    const line = raw.trimEnd();
    let m;
    if (!line.trim()) { flushPara(); closeList(); continue; }
    if ((m = line.match(/^(#{1,3})\s+(.*)$/))) { flushPara(); closeList(); const n = m[1].length; out.push(`<h${n}${at(`h${n}`)}>${inline(m[2], S.a)}</h${n}>`); continue; }
    if ((m = line.match(/^\s*[-*]\s+(.*)$/)) || (m = line.match(/^\s*\d+[.)]\s+(.*)$/))) {
      flushPara();
      const type = /^\s*\d/.test(line) ? 'ol' : 'ul';
      if (list !== type) { closeList(); out.push(`<${type}${at('list')}>`); list = type; }
      out.push(`<li${at('li')}>${inline(m[1], S.a)}</li>`);
      continue;
    }
    closeList();
    para.push(line.trim());
  }
  flushPara(); closeList();
  return out.join('\n');
}

export function plainExcerpt(md, n = 220) {
  const t = String(md ?? '').replace(/\[([^\]]+)\]\([^)]+\)/g, '$1').replace(/[#*`>-]/g, ' ').replace(/\s+/g, ' ').trim();
  return t.length > n ? `${t.slice(0, n).replace(/\s+\S*$/, '')}…` : t;
}
