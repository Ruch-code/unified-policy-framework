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


# ---------- Phase 2: IT audit toolkit and access ----------
def simple_book(fname, title, how, headers, widths, validations=None, rows=0, extra=None):
    wb = Workbook(); h = wb.active; h.title = 'How to use'
    for line in [title, ''] + how: h.append([line])
    h.column_dimensions['A'].width = 110; h['A1'].font = Font(bold=True, size=13)
    ws = wb.create_sheet('Register')
    sheet(ws, headers, [[''] * len(headers) for _ in range(rows)], widths)
    n = max(rows + 1, 200)
    for col, opts in (validations or {}).items():
        dv = DataValidation(type='list', formula1=f'"{opts}"', allow_blank=True); dv.add(f'{col}2:{col}{n}'); ws.add_data_validation(dv)
    if extra: extra(wb)
    wb.save(OUT / fname)


def phase2():
    simple_book('rcm-template.xlsx', 'Risk and Control Matrix', ['One row per control. Link each control to the risk it addresses and record how it will be tested.', 'Agree the matrix with control owners before testing starts.'],
        ['Process', 'Risk ID', 'Risk description', 'Control ID', 'Control description', 'Control owner', 'Frequency', 'Manual or automated', 'Preventive or detective', 'Key control', 'Framework references', 'Test approach', 'Population source', 'Sample size'],
        [16, 9, 40, 10, 44, 16, 14, 16, 16, 10, 24, 40, 24, 10],
        {'G': 'Annual,Quarterly,Monthly,Weekly,Daily,Multiple times a day,Event driven', 'H': 'Manual,Automated,IT dependent manual', 'I': 'Preventive,Detective', 'J': 'Yes,No'})

    def wp(wb):
        wb.remove(wb['Register'])
        tod = wb.create_sheet('Test of design')
        sheet(tod, ['Control ID', 'Control description', 'Walkthrough performed with', 'Date', 'Steps observed', 'Evidence inspected', 'Design adequate', 'Notes'], [], [10, 40, 22, 12, 44, 36, 14, 30])
        dv = DataValidation(type='list', formula1='"Yes,No"', allow_blank=True); dv.add('G2:G200'); tod.add_data_validation(dv)
        toe = wb.create_sheet('Test of operating effectiveness')
        sheet(toe, ['Control ID', 'Sample no.', 'Sample item', 'Date of occurrence', 'Attribute 1 met', 'Attribute 2 met', 'Attribute 3 met', 'Exception', 'Evidence reference', 'Notes'], [], [10, 10, 30, 14, 14, 14, 14, 12, 24, 30])
        for col in 'EFGH':
            dv = DataValidation(type='list', formula1='"Yes,No,N/A"', allow_blank=True); dv.add(f'{col}2:{col}500'); toe.add_data_validation(dv)
        sm = wb.create_sheet('Conclusion')
        sheet(sm, ['Control ID', 'Samples tested', 'Exceptions', 'Conclusion'], [], [12, 16, 12, 40])
        for i in range(2, 22):
            sm.append(['', f"=IF(A{i}=\"\",\"\",COUNTIF('Test of operating effectiveness'!A:A,A{i}))", f"=IF(A{i}=\"\",\"\",COUNTIFS('Test of operating effectiveness'!A:A,A{i},'Test of operating effectiveness'!H:H,\"Yes\"))", f'=IF(A{i}="","",IF(C{i}=0,"Operating effectively","Exceptions noted: evaluate"))'])
    simple_book('itgc-workpaper.xlsx', 'ITGC test workpaper', ['Test of design: one walkthrough per control. Test of operating effectiveness: one row per sample.', 'Define the attributes for each control before testing (for example: approved, approved before release, approver is not the developer).', 'The Conclusion sheet counts samples and exceptions per control.'], ['x'], [10], extra=wp)

    simple_book('sample-size-reference.xlsx', 'Sample size reference', ['Common starting points. Your firm methodology takes priority.'],
        ['Control frequency', 'Typical sample', 'Lower risk minimum', 'Notes'], [26, 18, 18, 50], rows=0,
        extra=lambda wb: [wb['Register'].append(r) for r in [['Annual', '1', '1', ''], ['Quarterly', '2', '2', ''], ['Monthly', '2 to 5', '2', ''], ['Weekly', '5 to 15', '5', ''], ['Daily', '20 to 40', '15', ''], ['Multiple times a day', '25 to 60', '25', ''], ['Automated (ITGCs effective)', '1 per variation', '1', 'Rely on change management to show the control did not change']]])

    simple_book('jml-tracker.xlsx', 'Joiner, mover and leaver tracker', ['Start from the HR list of events. One row per person per system.', 'Days to action and SLA met calculate automatically.'],
        ['Event type', 'Employee ID', 'Role (from)', 'Role (to)', 'HR effective date', 'System', 'Request ID', 'Approver', 'Approval date', 'Access granted or removed date', 'Days to action', 'SLA (days)', 'SLA met'],
        [12, 12, 18, 18, 14, 18, 12, 18, 14, 18, 12, 10, 10], {'A': 'Joiner,Mover,Leaver'}, rows=0,
        extra=lambda wb: [wb['Register'].append(['', '', '', '', '', '', '', '', '', '', f'=IF(OR(E{i}="",J{i}=""),"",J{i}-E{i})', 1, f'=IF(K{i}="","",IF(K{i}<=L{i},"Yes","No"))']) for i in range(2, 102)])

    simple_book('sod-conflict-matrix.xlsx', 'Segregation of duties conflict matrix', ['List pairs of roles or tasks that one person should not hold together, the risk, and how it is controlled.', 'Test it by comparing user role assignments against each conflicting pair.'],
        ['Conflict ID', 'Task or role A', 'Task or role B', 'Risk if one person holds both', 'Systems', 'Users with conflict', 'Mitigating control', 'Owner', 'Status'],
        [10, 26, 26, 40, 18, 18, 36, 16, 14], {'I': 'Open,Mitigated,Resolved'}, rows=0,
        extra=lambda wb: [wb['Register'].append(r + ['', '', '', '', '']) for r in [['SOD-01', 'Create vendor', 'Approve payment', 'Fictitious vendor paid'], ['SOD-02', 'Develop code', 'Deploy to production', 'Unauthorised or untested change in production'], ['SOD-03', 'Grant access', 'Review access', 'Inappropriate access never detected'], ['SOD-04', 'Raise journal entry', 'Approve journal entry', 'Misstated financial records']]])

    d = Document()
    d.add_heading('Audit Finding', 0)
    d.add_paragraph('Purpose: record one audit finding in a consistent format so it can be agreed with management and tracked to closure.')
    t = d.add_table(rows=0, cols=2); t.style = 'Table Grid'
    for k in ['Finding ID', 'Audit or engagement', 'Control or area', 'Rating (High / Medium / Low)', 'Condition: what was found, with numbers', 'Criteria: what should have happened (policy, standard, requirement)', 'Cause: why it happened', 'Effect: risk or impact', 'Recommendation', 'Management response', 'Action owner', 'Due date', 'Status', 'Evidence of closure']:
        r = t.add_row().cells; r[0].text = k; r[1].text = '[ ]'
    doc_control(d)
    d.save(OUT / 'audit-finding.docx')


if __name__ == '__main__':
    phase2(); print('phase2 ok')
