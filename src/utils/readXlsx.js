// Reads the first sheet of an .xlsx into an array of row arrays (strings).
// Uses JSZip (already a dependency), loaded only when called, and the browser's DOMParser.
const colIndex = (ref) => {
  let n = 0;
  for (const ch of ref.replace(/\d+/g, '')) n = n * 26 + (ch.charCodeAt(0) - 64);
  return n - 1;
};

export async function readFirstSheet(url) {
  const res = await fetch(url);
  if (!res.ok) throw new Error(`Could not load ${url} (${res.status})`);
  const { default: JSZip } = await import('jszip');
  const zip = await JSZip.loadAsync(await res.arrayBuffer());
  const parse = (xml) => new DOMParser().parseFromString(xml, 'application/xml');
  const text = (el) => Array.from(el.getElementsByTagName('t')).map((t) => t.textContent).join('');

  const sstFile = zip.file('xl/sharedStrings.xml');
  const shared = sstFile ? Array.from(parse(await sstFile.async('string')).getElementsByTagName('si')).map(text) : [];

  const sheetFile = zip.file('xl/worksheets/sheet1.xml') || zip.file(/xl\/worksheets\/sheet\d+\.xml$/)[0];
  if (!sheetFile) throw new Error('No worksheet found');
  const doc = parse(await sheetFile.async('string'));
  if (doc.getElementsByTagName('parsererror').length) throw new Error('Worksheet could not be read');

  return Array.from(doc.getElementsByTagName('row')).map((row) => {
    const out = [];
    Array.from(row.getElementsByTagName('c')).forEach((c) => {
      const type = c.getAttribute('t');
      const v = c.getElementsByTagName('v')[0]?.textContent ?? '';
      const value = type === 'inlineStr' ? text(c) : type === 's' ? (shared[Number(v)] ?? '') : v;
      out[colIndex(c.getAttribute('r') || '')] = value;
    });
    return Array.from(out, (x) => x ?? '');
  }).filter((r) => r.some((x) => String(x).trim()));
}
