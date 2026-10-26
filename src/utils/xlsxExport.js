/**
 * Dependency-free .xlsx writer.
 * Every sheet gets: bold header row, wrapped text, frozen header row,
 * sensible column widths and an autofilter. All text is reduced to plain
 * ASCII so nothing turns into broken characters in Excel, Numbers or Sheets.
 */

// Built from numeric code points so no tool or text clean-up can alter the keys.
const CHAR_MAP = Object.fromEntries([
  [0x2014, "-"],
  [0x2013, "-"],
  [0x2012, "-"],
  [0x2010, "-"],
  [0x2011, "-"],
  [0x2212, "-"],
  [0x2018, "'"],
  [0x2019, "'"],
  [0x201A, "'"],
  [0x2032, "'"],
  [0x201C, "\""],
  [0x201D, "\""],
  [0x201E, "\""],
  [0x2033, "\""],
  [0x2026, "..."],
  [0x2022, "-"],
  [0x00B7, "-"],
  [0x25CF, "-"],
  [0x25AA, "-"],
  [0x2610, "[ ]"],
  [0x2611, "[x]"],
  [0x2264, "<="],
  [0x2265, ">="],
  [0x2260, "!="],
  [0x2248, "~"],
  [0x00B1, "+/-"],
  [0x2192, "->"],
  [0x2190, "<-"],
  [0x2194, "<->"],
  [0x21D2, "=>"],
  [0x2191, "up"],
  [0x2193, "down"],
  [0x00D7, "x"],
  [0x00F7, "/"],
  [0x00B0, " deg"],
  [0x00A7, "Sec. "],
  [0x2713, "Yes"],
  [0x2714, "Yes"],
  [0x2705, "Yes"],
  [0x2717, "No"],
  [0x2718, "No"],
  [0x274C, "No"],
  [0x20AC, "EUR "],
  [0x00A3, "GBP "],
  [0x20B9, "INR "],
  [0x00A5, "JPY "],
  [0x00A9, "(c)"],
  [0x00AE, "(R)"],
  [0x2122, "(TM)"],
  [0x00A0, " "],
  [0x2009, " "],
  [0x202F, " "],
  [0x2007, " "],
  [0x200B, ""],
].map(([cp, rep]) => [String.fromCodePoint(cp), rep]));

/** Convert any text to plain ASCII without losing meaning. */
export function toPlainText(value) {
  if (value === null || value === undefined) return '';
  let s = String(value);
  s = Array.from(s, ch => (ch in CHAR_MAP ? CHAR_MAP[ch] : ch)).join('');
  // Accented letters to their base letter (e.g. e-acute to e), then drop anything else non-ASCII (emoji etc.)
  s = s.normalize('NFKD').replace(/[\u0300-\u036f]/g, '');
  s = s.replace(/[^\x09\x0A\x0D\x20-\x7E]/g, '');
  return s.replace(/[ \t]{2,}/g, ' ').trim();
}

/** Recursively clean every string in an object (for JSON downloads). */
export function toPlainDeep(v) {
  if (typeof v === 'string') return toPlainText(v);
  if (Array.isArray(v)) return v.map(toPlainDeep);
  if (v && typeof v === 'object') return Object.fromEntries(Object.entries(v).map(([k, x]) => [k, toPlainDeep(x)]));
  return v;
}

const xmlEsc = s => s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');

function colName(i) {
  let n = '';
  i += 1;
  while (i > 0) { const m = (i - 1) % 26; n = String.fromCharCode(65 + m) + n; i = Math.floor((i - 1) / 26); }
  return n;
}

/* Style ids: 0 default, 1 header (bold, wrap, fill, border), 2 body (wrap, top, border), 3 title (bold, larger), 4 note (wrap, italic) */
const STYLES_XML = `<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<styleSheet xmlns="http://schemas.openxmlformats.org/spreadsheetml/2006/main">
<fonts count="4"><font><sz val="11"/><name val="Calibri"/></font><font><b/><sz val="11"/><name val="Calibri"/></font><font><b/><sz val="14"/><name val="Calibri"/></font><font><i/><sz val="10"/><color rgb="FF555555"/><name val="Calibri"/></font></fonts>
<fills count="3"><fill><patternFill patternType="none"/></fill><fill><patternFill patternType="gray125"/></fill><fill><patternFill patternType="solid"><fgColor rgb="FFE8EAF6"/><bgColor indexed="64"/></patternFill></fill></fills>
<borders count="2"><border><left/><right/><top/><bottom/><diagonal/></border><border><left style="thin"><color rgb="FFD0D4E0"/></left><right style="thin"><color rgb="FFD0D4E0"/></right><top style="thin"><color rgb="FFD0D4E0"/></top><bottom style="thin"><color rgb="FFD0D4E0"/></bottom><diagonal/></border></borders>
<cellStyleXfs count="1"><xf numFmtId="0" fontId="0" fillId="0" borderId="0"/></cellStyleXfs>
<cellXfs count="5">
<xf numFmtId="0" fontId="0" fillId="0" borderId="0" xfId="0"/>
<xf numFmtId="0" fontId="1" fillId="2" borderId="1" xfId="0" applyFont="1" applyFill="1" applyBorder="1" applyAlignment="1"><alignment wrapText="1" vertical="center"/></xf>
<xf numFmtId="0" fontId="0" fillId="0" borderId="1" xfId="0" applyBorder="1" applyAlignment="1"><alignment wrapText="1" vertical="top"/></xf>
<xf numFmtId="0" fontId="2" fillId="0" borderId="0" xfId="0" applyFont="1"/>
<xf numFmtId="0" fontId="3" fillId="0" borderId="0" xfId="0" applyFont="1" applyAlignment="1"><alignment wrapText="1" vertical="top"/></xf>
</cellXfs>
<cellStyles count="1"><cellStyle name="Normal" xfId="0" builtinId="0"/></cellStyles>
</styleSheet>`;

function cellXml(ref, value, style) {
  if (value === '' || value === null || value === undefined) return `<c r="${ref}" s="${style}"/>`;
  if (typeof value === 'number' && Number.isFinite(value)) return `<c r="${ref}" s="${style}"><v>${value}</v></c>`;
  return `<c r="${ref}" s="${style}" t="inlineStr"><is><t xml:space="preserve">${xmlEsc(toPlainText(value))}</t></is></c>`;
}

/**
 * sheet = { name, title?, notes?: string[], headers: string[], rows: any[][] }
 * Title and notes sit above the table; the header row is frozen and bold.
 */
function sheetXml({ title, notes = [], headers, rows }) {
  const ncol = Math.max(1, headers.length);
  const lastCol = colName(ncol - 1);
  const out = [];
  const merges = [];
  let r = 0;
  if (title) {
    r += 1;
    out.push(`<row r="${r}" ht="22" customHeight="1">${cellXml(`A${r}`, title, 3)}</row>`);
    if (ncol > 1) merges.push(`A${r}:${lastCol}${r}`);
  }
  for (const n of notes) {
    r += 1;
    const lines = Math.max(1, Math.ceil(toPlainText(n).length / 140));
    out.push(`<row r="${r}" ht="${Math.min(15 * lines, 120)}" customHeight="1">${cellXml(`A${r}`, n, 4)}</row>`);
    if (ncol > 1) merges.push(`A${r}:${lastCol}${r}`);
  }
  if (title || notes.length) r += 1; // spacer row
  const headerRow = r + 1;

  // Column widths from content, capped so long text wraps instead of stretching.
  const widths = headers.map((h, i) => {
    let w = toPlainText(h).length;
    for (const row of rows) w = Math.max(w, toPlainText(row[i]).length);
    return Math.max(12, Math.min(w + 2, 60));
  });

  r += 1;
  out.push(`<row r="${r}">${headers.map((h, i) => cellXml(`${colName(i)}${r}`, h, 1)).join('')}</row>`);
  for (const row of rows) {
    r += 1;
    out.push(`<row r="${r}">${headers.map((_, i) => cellXml(`${colName(i)}${r}`, row[i], 2)).join('')}</row>`);
  }

  const cols = widths.map((w, i) => `<col min="${i + 1}" max="${i + 1}" width="${w}" customWidth="1"/>`).join('');
  const pane = `<pane ySplit="${headerRow}" topLeftCell="A${headerRow + 1}" activePane="bottomLeft" state="frozen"/><selection pane="bottomLeft" activeCell="A${headerRow + 1}" sqref="A${headerRow + 1}"/>`;
  const filter = rows.length ? `<autoFilter ref="A${headerRow}:${lastCol}${headerRow + rows.length}"/>` : '';
  const mergeXml = merges.length ? `<mergeCells count="${merges.length}">${merges.map(m => `<mergeCell ref="${m}"/>`).join('')}</mergeCells>` : '';
  return `<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<worksheet xmlns="http://schemas.openxmlformats.org/spreadsheetml/2006/main" xmlns:r="http://schemas.openxmlformats.org/officeDocument/2006/relationships">
<sheetViews><sheetView workbookViewId="0">${pane}</sheetView></sheetViews>
<sheetFormatPr defaultRowHeight="15"/>
<cols>${cols}</cols>
<sheetData>${out.join('')}</sheetData>${filter}${mergeXml}
<pageSetup orientation="landscape" fitToWidth="1" fitToHeight="0"/>
</worksheet>`;
}

function safeSheetName(n, i) {
  const s = toPlainText(n || `Sheet${i + 1}`).replace(/[\\/?*[\]:]/g, ' ').trim().slice(0, 31);
  return s || `Sheet${i + 1}`;
}

/* ---- minimal ZIP (stored, no compression) ---- */
const CRC_TABLE = (() => {
  const t = new Uint32Array(256);
  for (let n = 0; n < 256; n++) { let c = n; for (let k = 0; k < 8; k++) c = c & 1 ? 0xEDB88320 ^ (c >>> 1) : c >>> 1; t[n] = c >>> 0; }
  return t;
})();
function crc32(buf) { let c = 0xFFFFFFFF; for (let i = 0; i < buf.length; i++) c = CRC_TABLE[(c ^ buf[i]) & 0xFF] ^ (c >>> 8); return (c ^ 0xFFFFFFFF) >>> 0; }

function zip(files) {
  const enc = new TextEncoder();
  const parts = []; const central = []; let offset = 0;
  for (const f of files) {
    const name = enc.encode(f.name); const data = enc.encode(f.data); const crc = crc32(data);
    const local = new DataView(new ArrayBuffer(30));
    local.setUint32(0, 0x04034b50, true); local.setUint16(4, 20, true); local.setUint16(6, 0x0800, true);
    local.setUint16(8, 0, true); local.setUint16(10, 0, true); local.setUint16(12, 0x21, true);
    local.setUint32(14, crc, true); local.setUint32(18, data.length, true); local.setUint32(22, data.length, true);
    local.setUint16(26, name.length, true); local.setUint16(28, 0, true);
    parts.push(new Uint8Array(local.buffer), name, data);
    const cen = new DataView(new ArrayBuffer(46));
    cen.setUint32(0, 0x02014b50, true); cen.setUint16(4, 20, true); cen.setUint16(6, 20, true); cen.setUint16(8, 0x0800, true);
    cen.setUint16(10, 0, true); cen.setUint16(12, 0, true); cen.setUint16(14, 0x21, true);
    cen.setUint32(16, crc, true); cen.setUint32(20, data.length, true); cen.setUint32(24, data.length, true);
    cen.setUint16(28, name.length, true); cen.setUint32(42, offset, true);
    central.push(new Uint8Array(cen.buffer), name);
    offset += 30 + name.length + data.length;
  }
  const cenSize = central.reduce((s, p) => s + p.length, 0);
  const end = new DataView(new ArrayBuffer(22));
  end.setUint32(0, 0x06054b50, true); end.setUint16(8, files.length, true); end.setUint16(10, files.length, true);
  end.setUint32(12, cenSize, true); end.setUint32(16, offset, true);
  return new Blob([...parts, ...central, new Uint8Array(end.buffer)], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
}

export function buildXlsx(sheets) {
  const names = sheets.map((s, i) => safeSheetName(s.name, i));
  const files = [
    { name: '[Content_Types].xml', data: `<?xml version="1.0" encoding="UTF-8" standalone="yes"?><Types xmlns="http://schemas.openxmlformats.org/package/2006/content-types"><Default Extension="rels" ContentType="application/vnd.openxmlformats-package.relationships+xml"/><Default Extension="xml" ContentType="application/xml"/><Override PartName="/xl/workbook.xml" ContentType="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet.main+xml"/><Override PartName="/xl/styles.xml" ContentType="application/vnd.openxmlformats-officedocument.spreadsheetml.styles+xml"/>${sheets.map((_, i) => `<Override PartName="/xl/worksheets/sheet${i + 1}.xml" ContentType="application/vnd.openxmlformats-officedocument.spreadsheetml.worksheet+xml"/>`).join('')}</Types>` },
    { name: '_rels/.rels', data: `<?xml version="1.0" encoding="UTF-8" standalone="yes"?><Relationships xmlns="http://schemas.openxmlformats.org/package/2006/relationships"><Relationship Id="rId1" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/officeDocument" Target="xl/workbook.xml"/></Relationships>` },
    { name: 'xl/workbook.xml', data: `<?xml version="1.0" encoding="UTF-8" standalone="yes"?><workbook xmlns="http://schemas.openxmlformats.org/spreadsheetml/2006/main" xmlns:r="http://schemas.openxmlformats.org/officeDocument/2006/relationships"><sheets>${names.map((n, i) => `<sheet name="${xmlEsc(n)}" sheetId="${i + 1}" r:id="rId${i + 1}"/>`).join('')}</sheets></workbook>` },
    { name: 'xl/_rels/workbook.xml.rels', data: `<?xml version="1.0" encoding="UTF-8" standalone="yes"?><Relationships xmlns="http://schemas.openxmlformats.org/package/2006/relationships">${sheets.map((_, i) => `<Relationship Id="rId${i + 1}" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/worksheet" Target="worksheets/sheet${i + 1}.xml"/>`).join('')}<Relationship Id="rId${sheets.length + 1}" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/styles" Target="styles.xml"/></Relationships>` },
    { name: 'xl/styles.xml', data: STYLES_XML },
    ...sheets.map((s, i) => ({ name: `xl/worksheets/sheet${i + 1}.xml`, data: sheetXml(s) })),
  ];
  return zip(files);
}

export function downloadBlob(blob, filename) {
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = filename;
  a.style.display = 'none';
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  setTimeout(() => URL.revokeObjectURL(url), 1000);
}

export function downloadXlsx(sheets, filename) {
  const name = String(filename || 'export').replace(/\.(csv|xlsx|txt)$/i, '') + '.xlsx';
  downloadBlob(buildXlsx(sheets), name);
}
