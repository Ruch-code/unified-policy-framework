"""Build the ISO 27001 management review minutes template (clause 9.3). Run: python3 scripts/build-management-review-template.py"""
import pathlib
from docx import Document

OUT = pathlib.Path(__file__).resolve().parent.parent / 'public' / 'templates' / 'ISO27001_Management_Review_Minutes.docx'
d = Document()
d.add_heading('ISMS Management Review: Minutes', 0)
d.add_paragraph('ISO/IEC 27001:2022, clause 9.3. Replace the text in square brackets. Keep the signed copy as documented information (9.3.3).')

def table(headers, rows):
    t = d.add_table(rows=1, cols=len(headers)); t.style = 'Table Grid'
    for i, h in enumerate(headers):
        c = t.rows[0].cells[i]; c.text = h
        for r in c.paragraphs[0].runs: r.bold = True
    for row in rows:
        cells = t.add_row().cells
        for i, v in enumerate(row): cells[i].text = v
    d.add_paragraph()

d.add_heading('1. Meeting details', 1)
table(['Item', 'Detail'], [['Date and time', '[DD Month YYYY, HH:MM]'], ['Review period covered', '[For example 1 Jan to 30 Jun]'],
      ['Chair (top management)', '[Name, title]'], ['Attendees', '[Names and roles]'], ['Apologies', '[Names]'], ['Minutes taken by', '[Name]']])

d.add_heading('2. Review inputs (clause 9.3.2)', 1)
inputs = [
 ['a) Status of actions from previous management reviews', 'Example: 5 actions raised last review, 4 closed, 1 overdue (supplier review for the payroll vendor).'],
 ['b) Changes in external and internal issues relevant to the ISMS', 'Example: new customer contract requires data residency in the EU; engineering team grew from 12 to 20.'],
 ['c) Changes in needs and expectations of interested parties', 'Example: two enterprise customers now ask for annual penetration test reports.'],
 ['d1) Nonconformities and corrective actions (trends)', 'Example: 3 minor nonconformities from internal audit, all on access reviews; 2 closed, 1 in progress.'],
 ['d2) Monitoring and measurement results (trends)', 'Example: security training completion 96% against a 95% target; critical patches within 14 days at 88% against 95%.'],
 ['d3) Audit results', 'Example: internal audit completed in May covering clauses 4 to 10 and 30 Annex A controls.'],
 ['d4) Fulfilment of information security objectives', 'Example: objective "MFA on all production access" met; objective "quarterly restore test" missed for Q2.'],
 ['e) Feedback from interested parties', 'Example: customer security questionnaire feedback; no complaints from regulators.'],
 ['f) Results of risk assessment and status of the risk treatment plan', 'Example: 42 risks, 3 high; 2 treatment actions overdue; residual risk accepted for legacy VPN until migration.'],
 ['g) Opportunities for continual improvement', 'Example: automate quarterly access reviews; move onboarding checklist into the HR system.'],
]
table(['Input', 'Summary presented (examples shown, replace with your own)', 'Discussion and conclusion'], [[a, b, '[Notes]'] for a, b in inputs])

d.add_heading('3. Review outputs (clause 9.3.3)', 1)
table(['Output', 'Decision'], [['Decisions on continual improvement opportunities', '[Decision]'], ['Changes needed to the ISMS (scope, policy, objectives, resources)', '[Decision]'],
      ['Conclusion on suitability, adequacy and effectiveness of the ISMS', '[For example: the ISMS remains suitable, adequate and effective, subject to the actions below]']])

d.add_heading('4. Action log', 1)
table(['No.', 'Action', 'Owner', 'Due date', 'Status'], [['1', '[Action]', '[Name]', '[Date]', 'Open'], ['2', '', '', '', ''], ['3', '', '', '', '']])

d.add_heading('5. Approval', 1)
table(['Role', 'Name', 'Signature', 'Date'], [['Chair (top management)', '', '', ''], ['ISMS manager', '', '', '']])
d.add_paragraph('Next management review planned for: [Date]')
d.add_paragraph('Guidance only. Refer to ISO/IEC 27001:2022 for authoritative requirements.')
OUT.parent.mkdir(parents=True, exist_ok=True)
d.save(OUT); print(OUT)
