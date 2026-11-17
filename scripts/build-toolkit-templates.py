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


# ---------- Phase 3: KPI and KRI register ----------
def phase3():
    def dash(wb):
        ws = wb['Register']
        for col, opts in (('A', 'KPI,KRI'), ('M', 'Green,Amber,Red')):
            dv = DataValidation(type='list', formula1=f'"{opts}"', allow_blank=True); dv.add(f'{col}2:{col}200'); ws.add_data_validation(dv)
        d = wb.create_sheet('Monthly dashboard')
        sheet(d, ['Status', 'Count of metrics'], [], [16, 18])
        for i, s in enumerate(['Green', 'Amber', 'Red'], start=2):
            d.append([s, f'=COUNTIF(Register!M:M,A{i})'])
    simple_book('kpi-kri-register.xlsx', 'KPI and KRI register', ['One row per metric. Name the owner who publishes it and the date it is due each month.', 'Set Green, Amber and Red thresholds from your risk appetite. Record this month\'s value and status.', 'The Monthly dashboard sheet counts metrics by status for the management report.'],
        ['Type', 'Metric', 'Definition', 'Formula', 'Data source', 'Frequency', 'Owner role', 'Green threshold', 'Amber threshold', 'Red threshold', 'Publish due date', 'This period value', 'Status', 'Trend vs last period', 'Commentary'],
        [8, 30, 40, 26, 20, 12, 18, 14, 14, 14, 14, 14, 10, 16, 40], extra=dash)


if __name__ == '__main__':
    phase3(); print('phase3 ok')


# ---------- Phase 4 ----------
def phase4():
    S = 'Open,In progress,Done'
    simple_book('questionnaire-tracker.xlsx', 'Questionnaire response tracker', ['One row per questionnaire. Use [Customer] placeholders, not real names, in shared copies.', 'Answers reused shows how much came from the approved answer bank.'],
        ['Customer', 'Questionnaire type', 'Received date', 'Due date', 'Owner', 'Status', 'Total questions', 'Answers reused', 'Reuse rate', 'SME reviewer', 'SME sign-off date', 'Approved by', 'Sent date'],
        [18, 18, 13, 13, 16, 12, 12, 12, 10, 16, 14, 16, 12], {'B': 'SIG Lite,SIG Core,CAIQ,Custom RFI,Security addendum', 'F': 'Not started,In progress,SME review,Approved,Sent'},
        extra=lambda wb: [wb['Register'].append(['[Customer]'] + [''] * 7 + [f'=IF(G{i}="","",H{i}/G{i})'] + [''] * 4) for i in range(2, 102)])
    simple_book('policy-register.xlsx', 'Policy register', ['One row per policy, standard, procedure or guideline.', 'Next review date defaults to 12 months after approval.'],
        ['Document name', 'Type', 'Owner', 'Version', 'Approval date', 'Approved by', 'Next review date', 'Status', 'Mapped controls', 'Location'],
        [32, 14, 18, 9, 14, 18, 16, 12, 28, 30], {'B': 'Policy,Standard,Procedure,Guideline', 'H': 'Draft,Approved,Under review,Retired'},
        extra=lambda wb: [wb['Register'].append(['', '', '', '', '', '', f'=IF(E{i}="","",EDATE(E{i},12))', '', '', '']) for i in range(2, 102)])
    d = Document(); d.add_heading('Standard Operating Procedure: [Title]', 0)
    for h, t in [('Purpose', '[Why this procedure exists]'), ('Scope', '[Systems, teams and locations covered]'), ('Roles', '[Who performs, approves and is informed]'), ('Prerequisites', '[Access, tools or inputs needed]')]:
        d.add_heading(h, 1); d.add_paragraph(t)
    d.add_heading('Procedure steps', 1)
    for i in range(1, 6): d.add_paragraph(f'[Step {i}]', style='List Number')
    d.add_heading('Records and evidence', 1); d.add_paragraph('[What record is kept, where, and for how long]')
    d.add_heading('Related documents', 1); d.add_paragraph('[Policy and standard this procedure supports]')
    doc_control(d); d.save(OUT / 'sop-skeleton.docx')
    simple_book('due-diligence-checklist.xlsx', 'Pre-IPO and M&A security due diligence checklist', ['One row per question. Rate risk and record follow-ups. Use [Target] placeholders in shared copies.'],
        ['Area', 'Question', 'Evidence requested', 'Response', 'Evidence received', 'Risk rating', 'Follow-up', 'Owner'], [18, 50, 30, 36, 14, 12, 30, 16], {'E': 'Yes,No,Partial', 'F': 'High,Medium,Low'},
        extra=lambda wb: [wb['Register'].append(r + ['', '', '', '', '']) for r in [
            ['Governance', 'Who owns information security and how does the board oversee it?', 'Org chart, board minutes'],
            ['Policies', 'Are policies approved and reviewed in the last 12 months?', 'Policy register'],
            ['Certifications', 'Which certifications or reports exist, and what is their scope?', 'Certificates, SOC 2 reports'],
            ['Incidents', 'List security incidents and data breaches in the last 3 years and how they were closed.', 'Incident register'],
            ['Regulatory', 'Any regulator notices, fines or investigations?', 'Correspondence'],
            ['Data protection', 'Is there a data inventory and record of processing?', 'Data inventory, RoPA'],
            ['Cross-border', 'Where is personal data stored and transferred?', 'Data flow map'],
            ['ITGC', 'Are access, change and operations controls documented and tested?', 'RCM, test results'],
            ['Third parties', 'Who are the critical vendors and when were they last reviewed?', 'Vendor register'],
            ['Findings', 'List open audit findings and risk acceptances.', 'Findings register'],
            ['Technical', 'When was the last penetration test and are critical findings closed?', 'Pen test report'],
            ['Integration', 'What is needed to connect the target to our network safely?', 'Integration plan']]])
    simple_book('awareness-annual-plan.xlsx', 'Security awareness annual plan', ['One row per month. Track completion against the HR headcount.'],
        ['Month', 'Theme', 'Audience', 'Channel', 'Owner', 'Planned date', 'Status', 'Completion %'], [12, 30, 20, 26, 16, 14, 12, 12], {'G': S},
        extra=lambda wb: [wb['Register'].append([m, t, 'All staff', '', '', '', '', '']) for m, t in [('January', 'Phishing'), ('February', 'Passwords and MFA'), ('March', 'Data classification'), ('April', 'Social engineering'), ('May', 'Secure remote work'), ('June', 'Incident reporting'), ('July', 'Privacy and personal data'), ('August', 'Physical security'), ('September', 'Travel security'), ('October', 'Cybersecurity Awareness Month'), ('November', 'Fraud and payment scams'), ('December', 'Year review and quiz')]])
    simple_book('phishing-tracker.xlsx', 'Phishing simulation tracker', ['One row per campaign. Rates calculate automatically.', 'Assign remedial training to everyone who clicked and record completion.'],
        ['Campaign', 'Date', 'Audience', 'Scenario', 'Delivered', 'Clicked', 'Reported', 'Click rate', 'Report rate', 'Remedial assigned', 'Remedial completed'], [20, 12, 20, 30, 10, 10, 10, 10, 10, 14, 14],
        extra=lambda wb: [wb['Register'].append([''] * 7 + [f'=IF(E{i}="","",F{i}/E{i})', f'=IF(E{i}="","",G{i}/E{i})', '', '']) for i in range(2, 52)])
    simple_book('physical-spot-check.xlsx', 'Physical security spot check', ['Walk the site and record each check. Raise an action for every fail.'],
        ['Location', 'Date', 'Check', 'Result', 'Finding', 'Action', 'Owner', 'Due date'], [16, 12, 40, 10, 36, 30, 16, 12], {'D': 'Pass,Fail,N/A'},
        extra=lambda wb: [wb['Register'].append(['[Site]', '', c, '', '', '', '', '']) for c in ['Desks clear of confidential papers', 'Screens locked when unattended', 'Visitor log complete and visitors escorted', 'Badge access working; no propped doors', 'No tailgating observed', 'Secure disposal bins available and locked', 'Printers clear of documents', 'Server or network room locked', 'Whiteboards wiped of sensitive information']])
    simple_book('employee-security-self-assessment.xlsx', 'Employee security self-assessment', ['Short questionnaire for staff. Use the results to target training.'],
        ['Question', 'Answer', 'Notes'], [60, 12, 40], {'B': 'Yes,No,Not sure'},
        extra=lambda wb: [wb['Register'].append([q, '', '']) for q in ['I use MFA on all work accounts.', 'I lock my screen when I leave my desk.', 'I know how to report a suspicious email.', 'I store work files only in approved locations.', 'I know which data is confidential or restricted.', 'I do not share passwords with anyone.', 'My devices have the latest updates.', 'I know who to contact if I lose a device.']])
    simple_book('erp-security-checklist.xlsx', 'ERP security review checklist', ['One row per check. Product names in the guide are examples of ERP types only.'],
        ['Area', 'Check', 'How to test', 'Result', 'Finding', 'Owner', 'Due date'], [20, 44, 40, 10, 36, 16, 12], {'D': 'Pass,Fail,N/A'},
        extra=lambda wb: [wb['Register'].append(r + ['', '', '', '']) for r in [
            ['Privileged accounts', 'Superuser and emergency accounts have owners and approvals', 'Extract privileged users; trace approvals'],
            ['Generic accounts', 'Shared or generic accounts are disabled or controlled', 'Extract accounts without a named owner'],
            ['Critical transactions', 'Only authorised roles can create vendors, change bank details or post journals', 'Run access report for critical transactions'],
            ['Segregation of duties', 'Conflicts are removed or mitigated', 'Run SoD report; sample mitigating controls'],
            ['Change control', 'Changes move through approved transports only', 'Sample production changes; trace to approvals'],
            ['Direct changes', 'Production is locked against direct changes', 'Inspect system change settings'],
            ['Parameters', 'Password, session and tolerance settings meet standard', 'Inspect configuration'],
            ['Audit logging', 'Logs on for critical tables and transactions, reviewed', 'Inspect log settings and review evidence']]])
    simple_book('bia-workbook.xlsx', 'Business Impact Analysis workbook', ['One row per process. Rate impact over time as Low, Medium, High or Severe.', 'MTPD is the first time point rated Severe. RTO must be shorter than MTPD.'],
        ['Product or service', 'Process', 'Process owner', 'People', 'Systems', 'Data', 'Vendors', 'Site', 'Impact 1 hour', 'Impact 4 hours', 'Impact 1 day', 'Impact 1 week', 'MTPD', 'RTO', 'RPO', 'MBCO'],
        [20, 24, 16, 14, 20, 16, 16, 12, 12, 12, 12, 12, 10, 10, 10, 20], {c: 'Low,Medium,High,Severe' for c in 'IJKL'})
    simple_book('call-tree.xlsx', 'Call tree', ['Order of escalation for an incident or DR event. Test it in every drill and record response times.'],
        ['Order', 'Role', 'Primary contact', 'Primary phone', 'Backup contact', 'Backup phone', 'Contacts next', 'Target response (minutes)', 'Last tested', 'Actual response (minutes)'],
        [8, 22, 20, 16, 20, 16, 20, 14, 12, 14])
    d = Document(); d.add_heading('IT Disaster Recovery Drill: Plan and Report', 0)
    d.add_paragraph('Purpose: plan, run and record a DR drill, and compare actual recovery against RTO and RPO.')
    d.add_heading('Part A: Plan', 1)
    t = d.add_table(rows=0, cols=2); t.style = 'Table Grid'
    for k in ['Service in scope', 'Objectives', 'Scenario', 'RTO target', 'RPO target', 'Date and time', 'Participants and roles', 'Observers', 'Call tree version', 'Runbook reference', 'Success criteria', 'Rollback plan']:
        r = t.add_row().cells; r[0].text = k; r[1].text = '[ ]'
    d.add_heading('Part B: Execution log', 1)
    t = d.add_table(rows=1, cols=4); t.style = 'Table Grid'
    for i, h in enumerate(['Time', 'Step', 'Who', 'Result']): t.rows[0].cells[i].text = h
    for _ in range(6): t.add_row()
    d.add_heading('Part C: Results', 1)
    t = d.add_table(rows=0, cols=2); t.style = 'Table Grid'
    for k in ['Actual recovery time', 'Actual data loss', 'RTO met (Yes / No)', 'RPO met (Yes / No)', 'Observations', 'Lessons learnt']:
        r = t.add_row().cells; r[0].text = k; r[1].text = '[ ]'
    d.add_heading('Part D: Corrective actions', 1)
    t = d.add_table(rows=1, cols=4); t.style = 'Table Grid'
    for i, h in enumerate(['Action', 'Owner', 'Due date', 'Status']): t.rows[0].cells[i].text = h
    for _ in range(3): t.add_row()
    d.add_paragraph('Retest date: [ ]')
    doc_control(d); d.save(OUT / 'dr-drill-plan-report.docx')


if __name__ == '__main__':
    phase4(); print('phase4 ok')
