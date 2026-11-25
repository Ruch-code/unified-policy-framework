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
const tracker = async (file, id, title, headers, rows, status) => {
  const b = buildXlsx([{ name: 'Tracker', title: `${title}: [Company Name]`, notes: ['Example rows shown. Replace them with your own.'], headers, rows, validations: [{ col: headers.indexOf('Status'), values: status }] }, { name: 'Roles', title: 'Roles and responsibilities', headers: ['Role', 'Responsibility'], rows: id === 'nc-ca-tracker' ? [['AI Governance Lead', 'Owns the tracker and reports status.'], ['Action Owner', 'Completes corrective actions.'], ['Internal Auditor', 'Verifies closure on sampled items.']] : [['Legal and Compliance', 'Identifies and interprets obligations.'], ['Obligation Owner', 'Implements and evidences each obligation.'], ['AI Governance Lead', 'Reviews status.']] }, { name: 'Version history', title: 'Version history', headers: ['Version', 'Date', 'Description', 'Author', 'Approved by'], rows: [['1.0', '[Effective Date]', 'First issue', '[Policy Owner]', '[Approver]']] }]);
  fs.writeFileSync(new URL(file, dir), Buffer.from(await b.arrayBuffer()));
  previews[id] = [{ t: 'h', x: title }, { t: 'table', rows: [headers, ...rows] }];
};
await tracker('AI-Compliance-Obligation-Tracker-Template.xlsx', 'compliance-obligations', 'AI Compliance Obligation Tracker', ['Obligation ID', 'Source', 'Requirement in your words', 'System or process', 'How it is met', 'How it is checked', 'Evidence name', 'Evidence location', 'Owner', 'Status', 'Last reviewed'], [
  ['OB-001', 'EU AI Act Art. 14 (if high-risk)', 'Trained people can oversee and override outputs', '[AI System Name]', 'Review step in workflow', 'Sample of overrides', 'Oversight log', '[Location]', '[Role]', 'Open', '[Date]'],
  ['OB-002', 'EU AI Act Art. 12 (if high-risk)', 'System keeps event records', '[AI System Name]', 'Logging specification', 'Log sample test', 'Log sample', '[Location]', '[Role]', 'Open', '[Date]'],
  ['OB-003', 'GDPR Art. 35 (if applicable)', 'Assess high-risk personal data processing', '[AI System Name]', 'DPIA process', 'Privacy review', 'Completed DPIA', '[Location]', '[Role]', 'In progress', '[Date]'],
  ['OB-004', 'Customer contract', 'Give notice of significant model changes', '[AI System Name]', 'Release communication step', 'Check of release notices', 'Sent notices', '[Location]', '[Role]', 'Closed', '[Date]'],
  ['OB-005', 'ISO/IEC 42001 Clause 9.3', 'Leaders review the AIMS on schedule', 'AIMS', 'Annual management review', 'Internal audit', 'Signed minutes', '[Location]', '[Role]', 'Open', '[Date]'],
], ['Open', 'In progress', 'Closed']);
await tracker('AIMS-Nonconformity-Corrective-Action-Tracker-Template.xlsx', 'nc-ca-tracker', 'AIMS Nonconformity and Corrective Action Tracker', ['ID', 'Date raised', 'Description', 'Source', 'Category', 'Impact', 'Root cause', 'Corrective action', 'Owner', 'Due date', 'Effectiveness check', 'Status', 'Improvement opportunity'], [
  ['NC-001', '[Date]', 'Model released without validation sign-off', 'Internal audit', 'Implementation failure', 'High', 'Gate not enforced in pipeline', 'Add a required approval check', '[Role]', '[Date]', 'Sample next five releases', 'In progress', 'Automate gate evidence'],
  ['NC-002', '[Date]', 'Impact assessment not repeated after model change', 'Management review', 'Process gap', 'High', 'No trigger in change process', 'Add trigger to change template', '[Role]', '[Date]', 'Review next two model changes', 'Open', ''],
  ['NC-003', '[Date]', 'Supplier assessment out of date', 'Performance evaluation', 'Implementation failure', 'Medium', 'No reminder set', 'Add review dates to register', '[Role]', '[Date]', 'Check register next quarter', 'Closed', ''],
], ['Open', 'In progress', 'Closed']);
fs.writeFileSync(new URL('previews.json', dir), JSON.stringify(previews));
console.log('prefilled', Object.keys(PREFILLED).length + 3);
