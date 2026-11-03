// Builds the ISO 42001 AIMS templates from src/data/iso42001.js: real .docx and .xlsx
// files, previews.json entries, templates.json category and templateIndex.json entries.
// Run with: node scripts/build-iso42001-templates.mjs
import fs from 'node:fs';
import { Document, Packer, Paragraph, TextRun, HeadingLevel } from 'docx';
import { buildXlsx } from '../src/utils/xlsxExport.js';
import { TEMPLATES, POLICIES, CONTENT_VERSION, NOTICE, controlsForPolicy, controlsForTemplate } from '../src/data/iso42001.js';

const dir = new URL('../netlify/template-files/', import.meta.url);
const CAT = 'iso-42001-aims';
const INSTRUCTIONS = ['Replace every bracketed placeholder, such as [Company Name], with your own details.', 'Sample content is illustrative. Delete it once you have added real content.', 'Have the owner review and approve the document before use.'];
const P = (text, o = {}) => new Paragraph({ spacing: { after: 120 }, children: [new TextRun({ text, ...o })] });
const H = (text, heading = HeadingLevel.HEADING_2) => new Paragraph({ heading, spacing: { before: 240, after: 120 }, children: [new TextRun({ text })] });

async function writeDocx(file, name, meta, body) {
  const footer = `Template v${CONTENT_VERSION.version}, reviewed ${CONTENT_VERSION.lastReviewed}. ${NOTICE}`;
  const kids = [H(name, HeadingLevel.TITLE), P('[Company Name]'), P('Owner: [Role] | Approver: [Role] | Version: 1.0 | Next review: [Date]'), P(meta), H('How to use this template'), ...INSTRUCTIONS.map((t) => P(t)), ...body, P(footer, { italics: true, size: 16 })];
  fs.writeFileSync(new URL(file, dir), await Packer.toBuffer(new Document({ sections: [{ children: kids }] })));
}
const previews = JSON.parse(fs.readFileSync(new URL('previews.json', dir), 'utf8'));
const entries = [];
let num = 200;

for (const p of POLICIES) {
  const mapped = controlsForPolicy(p.slug);
  const meta = `Mapped controls: ${mapped.join(', ')}`;
  const sections = [['Purpose', [p.purpose]], ['Scope', [p.scope]], ['Owner', [p.owner]], ['Review cycle', [p.reviewCycle]], ['Policy statements', p.statements], ['Exceptions', ['Exceptions need written approval from [Role], a reason and an expiry date.']]];
  await writeDocx(`${p.slug}.docx`, p.name, meta, sections.flatMap(([h, ls]) => [H(h), ...ls.map((l) => P(l))]));
  previews[p.slug] = [{ t: 'h', x: p.name }, { t: 'p', x: meta }, ...sections.flatMap(([h, ls]) => [{ t: 'h', x: h }, ...ls.map((x) => ({ t: 'li', x }))])];
  entries.push({ num: num++, slug: p.slug, name: p.name, purpose: p.purpose, fields: sections.map((s) => s[0]), frameworks: ['ISO42001'], type: 'document', file: `${p.slug}.docx`, refs: mapped });
}
for (const t of TEMPLATES) {
  const mapped = controlsForTemplate(t.slug);
  const meta = `Mapped controls: ${mapped.join(', ') || 'see the Statement of Applicability'}`;
  const file = `${t.slug}.${t.format}`;
  if (t.format === 'docx') {
    await writeDocx(file, t.name, meta, [P(t.purpose), ...t.sections.flatMap(([h, s]) => [H(h), P(`Sample: ${s}`)])]);
    previews[t.slug] = [{ t: 'h', x: t.name }, { t: 'p', x: t.purpose }, { t: 'p', x: meta }, ...t.sections.flatMap(([h, s]) => [{ t: 'h', x: h }, { t: 'p', x: `Sample: ${s}` }])];
  } else {
    const blob = buildXlsx([{ name: 'Register', title: `${t.name}: [Company Name]`, notes: [t.purpose, meta, ...INSTRUCTIONS, NOTICE], headers: t.columns, rows: [t.sample] }]);
    fs.writeFileSync(new URL(file, dir), Buffer.from(await blob.arrayBuffer()));
    previews[t.slug] = [{ t: 'h', x: t.name }, { t: 'p', x: t.purpose }, { t: 'p', x: meta }, { t: 'table', rows: [t.columns, t.sample] }];
  }
  entries.push({ num: num++, slug: t.slug, name: t.name, purpose: t.purpose, fields: t.columns || t.sections.map((s) => s[0]), frameworks: ['ISO42001'], type: t.format === 'xlsx' ? 'record' : 'document', file, refs: mapped });
}
fs.writeFileSync(new URL('previews.json', dir), JSON.stringify(previews));

const jsonUrl = new URL('../src/data/templates.json', import.meta.url);
const data = JSON.parse(fs.readFileSync(jsonUrl, 'utf8'));
data.categories = data.categories.filter((k) => k.id !== CAT);
data.categories.push({ id: CAT, name: 'ISO 42001 AIMS', templates: entries.map(({ refs, ...e }) => e) });
fs.writeFileSync(jsonUrl, JSON.stringify(data, null, 2) + '\n');

const idxUrl = new URL('../src/data/templateIndex.json', import.meta.url);
const slugs = new Set(entries.map((e) => e.slug));
const idx = JSON.parse(fs.readFileSync(idxUrl, 'utf8')).filter((k) => !slugs.has(k.slug));
for (const e of entries) idx.push({ slug: e.slug, name: e.name, file: e.file, fw: ['ISO42001'], refs: e.refs.map((r) => (r.startsWith('A.') ? r : `Clause ${r}`)), kw: [e.name.toLowerCase()] });
fs.writeFileSync(idxUrl, JSON.stringify(idx));
console.log(`Built ${entries.length} templates`);
