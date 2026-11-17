"""Build GRC toolkit templates (gated, served from netlify/template-files). Run: python3 scripts/build-toolkit-templates.py"""
import pathlib
from docx import Document
from openpyxl import Workbook
from openpyxl.styles import Font, PatternFill, Alignment
from openpyxl.worksheet.datavalidation import DataValidation

OUT = pathlib.Path(__file__).resolve().parent.parent / 'netlify' / 'template-files'
HEAD, FILL, WRAP = Font(bold=True, color='FFFFFF'), PatternFill('solid', fgColor='1F3A5F'), Alignment(wrap_text=True, vertical='top')


def doc_control(d):
    d.add_heading('Document control', 1)
    t = d.add_table(rows=2, cols=4); t.style = 'Table Grid'
    for i, h in enumerate(['Version', 'Author', 'Approver', 'Date']):
        t.rows[0].cells[i].text = h


def risk_acceptance():
    d = Document()
    d.add_heading('Risk Acceptance Form', 0)
    d.add_paragraph('Purpose: record a decision to accept a risk that remains above the risk appetite after treatment, and who is accountable for it.')
    d.add_paragraph('Scope: any risk in the risk register with a residual score above appetite, or any exception to a security policy.')
    d.add_heading('Roles', 1)
    for r in ['Risk owner: describes the risk and why treatment is not practical now.', 'Security or GRC lead: checks the analysis and proposes compensating controls.', 'Approver (executive with authority for the risk level): accepts or rejects.']:
        d.add_paragraph(r, style='List Bullet')
    d.add_heading('Risk details', 1)
    t = d.add_table(rows=0, cols=2); t.style = 'Table Grid'
    for k in ['Risk ID (from register)', 'Risk description', 'Asset or process affected', 'Inherent score (likelihood x impact)', 'Residual score', 'Risk appetite threshold', 'Reason treatment is not possible or not proportionate', 'Compensating controls in place', 'Conditions of acceptance', 'Acceptance start date', 'Expiry date (maximum 12 months)', 'Review trigger events']:
        row = t.add_row().cells; row[0].text = k; row[1].text = '[ ]'
    d.add_heading('Procedure', 1)
    for s in ['Risk owner completes the risk details.', 'Security or GRC lead reviews and records a recommendation.', 'Approver signs or rejects. Rejected risks return to treatment.', 'Record the decision and expiry date in the risk register.', 'Review before expiry. Renew, treat or close.']:
        d.add_paragraph(s, style='List Number')
    d.add_heading('Decision', 1)
    t = d.add_table(rows=0, cols=4); t.style = 'Table Grid'
    h = t.add_row().cells
    for i, x in enumerate(['Role', 'Name', 'Decision (accept / reject)', 'Signature and date']): h[i].text = x
    for r in ['Risk owner', 'Security or GRC lead', 'Approver']:
        c = t.add_row().cells; c[0].text = r
    doc_control(d)
    d.add_paragraph('Guidance only. Adapt approval levels to your risk management policy.')
    d.save(OUT / 'risk-acceptance-form.docx')


CSF = [
    ('Govern', 'GV.OC', 'Do you have a documented information security programme approved by senior management?'),
    ('Govern', 'GV.RR', 'Who is accountable for information security, and how is it staffed?'),
    ('Govern', 'GV.PO', 'Are security policies reviewed at least annually and acknowledged by staff?'),
    ('Govern', 'GV.SC', 'How do you assess and monitor your own suppliers and sub-processors?'),
    ('Identify', 'ID.AM', 'Do you keep an inventory of systems and data that will process our data?'),
    ('Identify', 'ID.RA', 'How often do you run risk assessments and vulnerability scans?'),
    ('Protect', 'PR.AA', 'Is MFA enforced for all access to systems holding our data, including admin access?'),
    ('Protect', 'PR.AA', 'How quickly is access removed when staff leave? How often are access reviews done?'),
    ('Protect', 'PR.AT', 'Do all staff complete security awareness training at hire and yearly?'),
    ('Protect', 'PR.DS', 'Is our data encrypted at rest and in transit? Who manages the keys?'),
    ('Protect', 'PR.PS', 'How are changes to production approved, tested and deployed?'),
    ('Protect', 'PR.IR', 'How are networks segmented and protected?'),
    ('Detect', 'DE.CM', 'What security logging and monitoring is in place, and who reviews alerts?'),
    ('Detect', 'DE.AE', 'How are suspicious events analysed and escalated?'),
    ('Respond', 'RS.MA', 'Do you have a tested incident response plan?'),
    ('Respond', 'RS.CO', 'How quickly will you notify us of a security incident affecting our data?'),
    ('Recover', 'RC.RP', 'Do you have backups and a disaster recovery plan? When were they last tested?'),
    ('Recover', 'RC.CO', 'How will you communicate with us during recovery?'),
]


def sheet(ws, headers, rows, widths):
    ws.append(headers)
    for r in rows: ws.append(r)
    for i, w in enumerate(widths): ws.column_dimensions[chr(65 + i)].width = w
    for c in ws[1]: c.font, c.fill, c.alignment = HEAD, FILL, WRAP
    for row in ws.iter_rows(min_row=2):
        for c in row: c.alignment = WRAP
    ws.freeze_panes = 'A2'; ws.auto_filter.ref = ws.dimensions


def csf_questionnaire():
    wb = Workbook(); how = wb.active; how.title = 'How to use'
    for line in ['TPRM questionnaire built on NIST CSF 2.0 functions', '', 'Send the Questionnaire sheet to [Vendor]. Ask for evidence for each answer.',
                 'Score each answer 0 to 3 in the Reviewer score column: 0 = not in place, 1 = planned, 2 = partly in place, 3 = in place with evidence.',
                 'The Summary sheet averages scores by CSF function. Any function below 2 needs a finding in your TPRM issue register.', 'Guidance only. Tailor the questions to the vendor tier.']:
        how.append([line])
    how.column_dimensions['A'].width = 110; how['A1'].font = Font(bold=True, size=13)
    q = wb.create_sheet('Questionnaire')
    sheet(q, ['No.', 'CSF 2.0 function', 'Category', 'Question', 'Vendor answer', 'Evidence provided', 'Reviewer score (0-3)', 'Reviewer notes'],
          [[i + 1, f, c, t, '', '', '', ''] for i, (f, c, t) in enumerate(CSF)], [6, 14, 10, 60, 40, 30, 14, 36])
    dv = DataValidation(type='list', formula1='"0,1,2,3"', allow_blank=True); dv.add(f'G2:G{len(CSF) + 1}'); q.add_data_validation(dv)
    s = wb.create_sheet('Summary')
    sheet(s, ['CSF 2.0 function', 'Average score', 'Status'], [], [20, 16, 22])
    n = len(CSF) + 1
    for i, f in enumerate(['Govern', 'Identify', 'Protect', 'Detect', 'Respond', 'Recover'], start=2):
        s.append([f, f'=IFERROR(AVERAGEIF(Questionnaire!B2:B{n},A{i},Questionnaire!G2:G{n}),"")', f'=IF(B{i}="","",IF(B{i}<2,"Raise a finding","Acceptable"))'])
    wb.save(OUT / 'tprm-csf-questionnaire.xlsx')


if __name__ == '__main__':
    risk_acceptance(); csf_questionnaire(); print('ok')
