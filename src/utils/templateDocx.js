// Builds the download for any template (Word for documents, Excel for records and logs) in src/data/templates.json.
// Runs fully in the browser; the "docx" library is loaded on first use so it
// stays out of the main bundle.

export const FRAMEWORK_LABELS = { SOC2: 'SOC 2', ISO27001: 'ISO 27001:2022', HIPAA: 'HIPAA', GDPR: 'GDPR' };
export const FOOTER_TEXT = 'Template provided by OneLens by Ruchi';
const ACCENT = '7C3AED';
const EMPTY_ROWS = 5;

/** Placeholder suggested for a field, based on what the field holds. */
export function placeholderFor(field) {
  const f = field.toLowerCase();
  if (/date|due|period|time in|time out|expiry|last review|next review|frequency|cycle|cadence/.test(f)) return '[Date]';
  if (/owner|approver|reviewer|requester|analyst|verifier|evaluator|auditor|witness|received by|host|participants|attendees|responsible|role|audience|recipients|named role|contact|party|who /.test(f)) return '[Role]';
  if (/system|application|repo|data store|component|service|environment|endpoint|resource|segment|asset|device|tool|location|region|site|url/.test(f)) return '[System]';
  if (/organisation|company|vendor|supplier|provider|recipient|body/.test(f)) return '[Organisation Name]';
  return '[Enter detail]';
}

export function frameworkMapping(t) {
  return t.frameworks.map(f => FRAMEWORK_LABELS[f] || f).join(', ');
}

/** Plain description of the document structure, shared by the preview page and the generator. */
export function templateStructure(t) {
  return {
    control: [
      ['Version', '1.0'],
      ['Owner (role)', '[Role]'],
      ['Approver', '[Role]'],
      ['Effective date', '[Date]'],
      ['Next review date', '[Date]'],
      ['Framework mapping', frameworkMapping(t)],
    ],
    purpose: 'This template is used by [Organisation Name] for the ' + t.name + '. ' + t.purpose,
    isRecord: t.type === 'record',
    fields: t.fields.map(f => ({ field: f, placeholder: placeholderFor(f) })),
  };
}

let docxLib = null;
async function loadDocx() {
  if (!docxLib) docxLib = await import('docx');
  return docxLib;
}

/** Returns a docx Document for the template. Pass a preloaded docx module in Node tests. */
export async function buildTemplateDocument(t, lib) {
  const d = lib || (await loadDocx());
  const { Document, Paragraph, TextRun, Table, TableRow, TableCell, WidthType, HeadingLevel, Footer, AlignmentType, ShadingType, BorderStyle } = d;
  const s = templateStructure(t);
  const border = { style: BorderStyle.SINGLE, size: 4, color: 'BFBFBF' };
  const borders = { top: border, bottom: border, left: border, right: border, insideHorizontal: border, insideVertical: border };

  const cell = (text, opts = {}) => new TableCell({
    width: opts.width ? { size: opts.width, type: WidthType.PERCENTAGE } : undefined,
    shading: opts.header ? { type: ShadingType.CLEAR, color: 'auto', fill: opts.fill || 'EDE9FE' } : undefined,
    margins: { top: 60, bottom: 60, left: 100, right: 100 },
    children: [new Paragraph({ children: [new TextRun({ text, bold: !!opts.header, color: opts.muted ? '7F7F7F' : undefined, size: 20 })] })],
  });
  const table = rows => new Table({ width: { size: 100, type: WidthType.PERCENTAGE }, borders, rows });
  const heading = text => new Paragraph({ heading: HeadingLevel.HEADING_2, spacing: { before: 280, after: 120 }, children: [new TextRun({ text, color: ACCENT, bold: true })] });
  const note = text => new Paragraph({ spacing: { after: 120 }, children: [new TextRun({ text, italics: true, color: '595959', size: 18 })] });

  const children = [
    new Paragraph({ heading: HeadingLevel.TITLE, spacing: { after: 200 }, children: [new TextRun({ text: t.name, bold: true, color: ACCENT })] }),
    new Paragraph({ spacing: { after: 200 }, children: [new TextRun({ text: '[Organisation Name]', color: '595959' })] }),
    heading('Document control'),
    table(s.control.map(([k, v]) => new TableRow({ children: [cell(k, { header: true, width: 32 }), cell(v, { width: 68 })] }))),
    heading('Purpose'),
    new Paragraph({ spacing: { after: 120 }, children: [new TextRun(s.purpose)] }),
  ];

  if (s.isRecord) {
    const w = Math.floor(100 / s.fields.length);
    children.push(
      heading('Record entries'),
      note('Add one row per entry. Replace the placeholders in the first row and add rows as needed.'),
      table([
        new TableRow({ tableHeader: true, children: s.fields.map(f => cell(f.field, { header: true, width: w })) }),
        new TableRow({ children: s.fields.map(f => cell(f.placeholder, { muted: true, width: w })) }),
        ...Array.from({ length: EMPTY_ROWS - 1 }, () => new TableRow({ children: s.fields.map(() => cell('', { width: w })) })),
      ]),
      heading('Screenshot / attachment'),
      note('Paste a screenshot or reference the attached evidence file. Include the system name, the date captured and where the original is stored.'),
      table([
        new TableRow({ children: [cell('Evidence reference', { header: true, width: 32 }), cell('[System] export or screenshot, captured [Date]', { muted: true, width: 68 })] }),
        new TableRow({ height: { value: 2400, rule: 'atLeast' }, children: [cell('Screenshot', { header: true, width: 32 }), cell('', { width: 68 })] }),
      ]),
      heading('Reviewed by / Date'),
      table([
        new TableRow({ tableHeader: true, children: ['Reviewed by (role)', 'Date', 'Outcome', 'Signature'].map(h => cell(h, { header: true, width: 25 })) }),
        new TableRow({ children: ['[Role]', '[Date]', '[Enter detail]', ''].map(v => cell(v, { muted: true, width: 25 })) }),
      ]),
    );
  } else {
    children.push(
      heading('Content'),
      note('Complete each section for [Organisation Name]. Remove guidance text before approval.'),
      table([
        new TableRow({ tableHeader: true, children: [cell('Section / field', { header: true, width: 35 }), cell('Entry', { header: true, width: 65 })] }),
        ...s.fields.map(f => new TableRow({ children: [cell(f.field, { width: 35 }), cell(f.placeholder, { muted: true, width: 65 })] })),
      ]),
      heading('Approval'),
      table([
        new TableRow({ tableHeader: true, children: ['Approved by (role)', 'Date', 'Signature'].map(h => cell(h, { header: true, width: 33 })) }),
        new TableRow({ children: ['[Role]', '[Date]', ''].map(v => cell(v, { muted: true, width: 33 })) }),
      ]),
    );
  }

  return new Document({
    creator: 'OneLens by Ruchi',
    title: t.name,
    styles: { default: { document: { run: { font: 'Calibri', size: 22 } } } },
    sections: [{
      properties: { page: { margin: { top: 1000, bottom: 1000, left: 1000, right: 1000 } } },
      footers: { default: new Footer({ children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: FOOTER_TEXT, size: 16, color: '7F7F7F' })] })] }) },
      children,
    }],
  });
}

/** Record and log templates download as Excel; policies and documents as Word. */
export function templateFormat(t) {
  if (t.file) return t.file.split('.').pop();
  // Reports, forms, requests and certificates read better as Word even when they record evidence.
  if (/\b(Matrix|Statement of Applicability|Records of Processing|Objectives Plan|Communication Plan|Review Plan)\b/.test(t.name)) return 'xlsx';
  return t.type === 'record' && !/\b(Report|Form|Certificate|Outline)\b/.test(t.name) ? 'xlsx' : 'docx';
}
export const FORMAT_LABEL = { xlsx: 'Excel', docx: 'Word' };
export function templateFilename(t) {
  if (t.file) return t.file;
  return t.slug + '.' + templateFormat(t);
}

const XLSX_ENTRY_ROWS = 25;
/** Excel workbook for a record or log template: one entry sheet plus document control. */
export async function templateXlsxBlob(t) {
  const { buildXlsx } = await import('./xlsxExport.js');
  const s = templateStructure(t);
  const headers = [...s.fields.map(f => f.field), 'Screenshot / attachment reference', 'Reviewed by (role)', 'Review date'];
  const first = [...s.fields.map(f => f.placeholder), '[System] export or screenshot, captured [Date]', '[Role]', '[Date]'];
  const rows = [first, ...Array.from({ length: XLSX_ENTRY_ROWS - 1 }, () => headers.map(() => ''))];
  const validations = [];
  headers.forEach((h, i) => {
    if (/keep\/modify\/remove/i.test(h)) validations.push({ col: i, values: ['Keep', 'Modify', 'Remove'] });
    else if (/keep\/remove/i.test(h)) validations.push({ col: i, values: ['Keep', 'Remove'] });
  });
  return buildXlsx([
    {
      name: 'Record',
      title: t.name,
      notes: [s.purpose, 'Framework mapping: ' + frameworkMapping(t), 'Add one row per entry. Attach screenshots in the evidence folder and reference them in the attachment column.', FOOTER_TEXT],
      headers,
      rows,
      validations,
    },
    {
      name: 'Document control',
      title: 'Document control',
      notes: [FOOTER_TEXT],
      headers: ['Field', 'Value'],
      rows: s.control,
    },
  ]);
}

export async function templateFileBlob(t) {
  // Ready-made templates are static files in public/templates/.
  if (t.file) {
    const res = await fetch('/templates/' + t.file);
    if (!res.ok) throw new Error('Template file not found: ' + t.file);
    return res.blob();
  }
  return templateFormat(t) === 'xlsx' ? templateXlsxBlob(t) : templateDocxBlob(t);
}

export async function templateDocxBlob(t) {
  const d = await loadDocx();
  return d.Packer.toBlob(await buildTemplateDocument(t, d));
}

function saveBlob(blob, filename) {
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  a.remove();
  setTimeout(() => URL.revokeObjectURL(url), 1500);
}

export async function downloadTemplate(t) {
  saveBlob(await templateFileBlob(t), templateFilename(t));
}
export const downloadTemplateDocx = downloadTemplate;

export async function downloadCategoryZip(category) {
  const { default: JSZip } = await import('jszip');
  const zip = new JSZip();
  for (const t of category.templates) zip.file(templateFilename(t), await templateFileBlob(t));
  saveBlob(await zip.generateAsync({ type: 'blob' }), category.id + '-templates.zip');
}
