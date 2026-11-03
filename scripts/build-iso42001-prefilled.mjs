// Writes the fully pre-filled templates over their outline versions.
import fs from 'node:fs';
import { Document, Packer, Paragraph, TextRun, HeadingLevel, Table, TableRow, TableCell, WidthType } from 'docx';
import { buildXlsx } from '../src/utils/xlsxExport.js';
import { CONTROLS } from '../src/data/iso42001.js';
import { PREFILLED } from './iso42001-prefilled.mjs';

const dir = new URL('../netlify/template-files/', import.meta.url);
const previews = JSON.parse(fs.readFileSync(new URL('previews.json', dir), 'utf8'));
const run = (x, o) => new Paragraph({ spacing: { after: 100 }, children: [new TextRun({ text: x, ...o })] });
const H = (x, heading) => new Paragraph({ heading, spacing: { before: 200, after: 100 }, children: [new TextRun(x)] });
const render = (b) => {
  if (b.k === 'h') return H(b.x, HeadingLevel.HEADING_1);
  if (b.k === 's') return H(b.x, HeadingLevel.HEADING_2);
  if (b.k === 'p') return run(b.x);
  return new Table({ width: { size: 100, type: WidthType.PERCENTAGE }, rows: b.rows.map((r, i) => new TableRow({ children: r.map((c) => new TableCell({ children: [run(c, { bold: i === 0 })] })) })) });
};
for (const [id, d] of Object.entries(PREFILLED)) {
  const kids = [H(d.title, HeadingLevel.TITLE), run('[Company Name]')];
  d.blocks.forEach((b) => { kids.push(render(b)); if (b.k === 'tb') kids.push(run('')); });
  fs.writeFileSync(new URL(d.file, dir), await Packer.toBuffer(new Document({ creator: '', lastModifiedBy: '', title: '', description: '', sections: [{ children: kids }] })));
  previews[id] = [{ t: 'h', x: d.title }, ...d.blocks.map((b) => (b.k === 'tb' ? { t: 'table', rows: b.rows } : { t: b.k === 'p' ? 'p' : 'h', x: b.x }))];
}
// Statement of Applicability: all 38 controls with example answers.
const annex = CONTROLS.filter((k) => k.type === 'Annex A');
const rows = annex.map((k, i) => {
  const out = k.id === 'A.10.4';
  return [`${k.id.split('.').slice(0, 2).join('.')} ${k.theme}`, k.id, k.title, out ? 'Not applicable' : 'Implemented', out ? '' : `Example: reduces risk because ${k.plainEnglishSummary.charAt(0).toLowerCase()}${k.plainEnglishSummary.slice(1)}`, out ? 'Example: [Company Name] has no external customers for [AI System Name].' : '', out ? 'Not required' : `R-${String(i + 1).padStart(3, '0')}`];
});
const headers = ['Domain', 'Reference', 'Short title', 'Implementation status', 'Reason included', 'Reason excluded', 'Risk reference'];
const blob = buildXlsx([
  { name: 'Statement of Applicability', title: 'AIMS Statement of Applicability: [Company Name]', notes: ['Example answers shown. Replace them with decisions from your own risk treatment.'], headers, rows, validations: [{ col: 3, values: ['Implemented', 'In progress', 'Planned', 'Not applicable'] }] },
  { name: 'Version history', title: 'Version history', headers: ['Version', 'Date', 'Description', 'Author', 'Approved by'], rows: [['1.0', '[Effective Date]', 'First issue', '[Policy Owner]', '[Approver]']] },
]);
fs.writeFileSync(new URL('AIMS-Statement-of-Applicability-Template.xlsx', dir), Buffer.from(await blob.arrayBuffer()));
previews['soa-workbook'] = [{ t: 'h', x: 'AIMS Statement of Applicability' }, { t: 'table', rows: [headers, ...rows] }];
fs.writeFileSync(new URL('previews.json', dir), JSON.stringify(previews));
console.log('prefilled', Object.keys(PREFILLED).length + 1);
