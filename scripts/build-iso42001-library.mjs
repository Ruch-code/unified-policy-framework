// Generates library files from src/data/iso42001Library.js and registers them in
// templates.json, templateIndex.json and previews.json. Also rebuilds the policies.
import fs from 'node:fs';
import { Document, Packer, Paragraph, TextRun, HeadingLevel, Table, TableRow, TableCell, WidthType } from 'docx';
import { buildXlsx } from '../src/utils/xlsxExport.js';
import { POLICIES, CONTROLS } from '../src/data/iso42001.js';
import { LIBRARY_TEMPLATES, LIBRARY, ADAPT_NOTE } from '../src/data/iso42001Library.js';

const dir = new URL('../netlify/template-files/', import.meta.url);
const HOW = ['Replace every bracketed placeholder with your own details.', 'Delete sections that do not apply, and add your own detail where needed.', ADAPT_NOTE];
const CTRL = [['Title', '[Document Title]'], ['Document owner', '[Policy Owner]'], ['Version', '1.0'], ['Effective date', '[Effective Date]'], ['Review date', '[Review Date]'], ['Approver', '[Approver]']];
const VH = [['Version', 'Date', 'Author', 'Change', 'Approver'], ['1.0', '[Effective Date]', '[Policy Owner]', 'First issue', '[Approver]']];
const P = (t) => new Paragraph({ spacing: { after: 100 }, children: [new TextRun(t)] });
const B = (t) => new Paragraph({ bullet: { level: 0 }, children: [new TextRun(t)] });
const H = (t, h = HeadingLevel.HEADING_1) => new Paragraph({ heading: h, spacing: { before: 240, after: 100 }, children: [new TextRun(t)] });
const T = (rows) => new Table({ width: { size: 100, type: WidthType.PERCENTAGE }, rows: rows.map((r) => new TableRow({ children: r.map((c) => new TableCell({ children: [P(c)] })) })) });

function shape(d) { // shared outline for docx and previews
  return [
    ['How to use this template', HOW], ['Purpose', [d.purpose]], ['Scope', [d.scope]], ['Roles and responsibilities', d.roles.map(([a, b]) => `${a}: ${b}`)],
    ...d.sections, ['Records and evidence to retain', d.records], ['Review cadence', [`${d.reviewFrequency}. Owner: ${d.ownerRole}.`]], ['Mapped ISO/IEC 42001 controls', [d.mappedControls.join(', ')]],
  ];
}
async function docx(file, title, d) {
  const ctrl = CTRL.map(([a, b]) => [a, a === 'Title' ? title : b]);
  const kids = [H(title, HeadingLevel.TITLE), P('[Company Name]'), T(ctrl), ...shape(d).flatMap(([h, ls]) => [H(h), ...ls.map(B)]), H('Version history'), T(VH)];
  const out = new Document({ creator: '', lastModifiedBy: '', title: '', description: '', sections: [{ children: kids }] });
  fs.writeFileSync(new URL(file, dir), await Packer.toBuffer(out));
}
const previews = JSON.parse(fs.readFileSync(new URL('previews.json', dir), 'utf8'));
const preview = (title, d) => [{ t: 'h', x: title }, { t: 'table', rows: CTRL.map(([a, b]) => [a, a === 'Title' ? title : b]) }, ...shape(d).flatMap(([h, ls]) => [{ t: 'h', x: h }, ...ls.map((x) => ({ t: 'li', x }))]), { t: 'h', x: 'Version history' }, { t: 'table', rows: VH }];

for (const p of POLICIES) {
  const d = { ...p, roles: [[p.owner, 'Owns this policy and keeps it current.'], ['[Approver]', 'Approves this policy.'], ['All in-scope staff', 'Follow this policy.']], sections: [['Policy requirements', p.statements], ['Exceptions', ['Exceptions need written approval from [Approver], a reason and an expiry date.']]], records: ['Approved policy', 'Exception records', 'Communication records'], reviewFrequency: p.reviewCycle, ownerRole: p.owner, mappedControls: LIBRARY.find((l) => l.id === p.slug).mappedControls };
  await docx(`${p.slug}.docx`, p.name, d);
  previews[p.slug] = preview(p.name, d);
}
for (const d of LIBRARY_TEMPLATES) {
  if (d.format === 'docx') { await docx(d.filePath, d.title, d); previews[d.id] = preview(d.title, d); continue; }
  const rows = d.annexRows ? CONTROLS.filter((k) => k.type === 'Annex A').map((k) => [`${k.id.split('.').slice(0, 2).join('.')} ${k.theme}`, k.id, k.title, '', '', '', '']) : [d.sample];
  const sheets = [
    { name: 'How to use', title: `${d.title}: [Company Name]`, notes: [d.purpose, d.scope], headers: ['Item', 'Detail'], rows: [...CTRL.map(([a, b]) => [a, a === 'Title' ? d.title : b]), ...HOW.map((h, i) => [`Instruction ${i + 1}`, h]), ['Records to retain', d.records.join('; ')], ['Review cadence', d.reviewFrequency], ['Mapped controls', d.mappedControls.join(', ')]] },
    { name: 'Roles', title: 'Roles and responsibilities', headers: ['Role', 'Responsibility'], rows: d.roles },
    { name: 'Register', title: d.title, headers: d.columns, rows },
    { name: 'Version history', title: 'Version history', headers: VH[0], rows: [VH[1]] },
  ];
  fs.writeFileSync(new URL(d.filePath, dir), Buffer.from(await buildXlsx(sheets).arrayBuffer()));
  previews[d.id] = [{ t: 'h', x: d.title }, { t: 'p', x: d.purpose }, { t: 'table', rows: [d.columns, ...rows.slice(0, 5)] }];
}
fs.writeFileSync(new URL('previews.json', dir), JSON.stringify(previews));

const jsonUrl = new URL('../src/data/templates.json', import.meta.url);
const data = JSON.parse(fs.readFileSync(jsonUrl, 'utf8'));
const CAT = 'iso-42001-library';
data.categories = data.categories.filter((c) => c.id !== CAT);
let num = 300;
data.categories.push({ id: CAT, name: 'ISO 42001 Policy and Template Library', templates: LIBRARY_TEMPLATES.map((d) => ({ num: num++, slug: d.id, name: d.title, purpose: d.description, fields: (d.columns || d.sections.map((s) => s[0])), frameworks: ['ISO42001'], type: d.format === 'xlsx' ? 'record' : 'document', file: d.filePath })) });
fs.writeFileSync(jsonUrl, JSON.stringify(data, null, 2) + '\n');
const idxUrl = new URL('../src/data/templateIndex.json', import.meta.url);
const ids = new Set(LIBRARY_TEMPLATES.map((d) => d.id));
const idx = JSON.parse(fs.readFileSync(idxUrl, 'utf8')).filter((k) => !ids.has(k.slug));
for (const d of LIBRARY_TEMPLATES) idx.push({ slug: d.id, name: d.title, file: d.filePath, fw: ['ISO42001'], refs: d.mappedControls.map((r) => (r.startsWith('A.') ? r : `Clause ${r}`)), kw: [d.title.toLowerCase()] });
fs.writeFileSync(idxUrl, JSON.stringify(idx));
console.log('built', LIBRARY_TEMPLATES.length, '+', POLICIES.length);
