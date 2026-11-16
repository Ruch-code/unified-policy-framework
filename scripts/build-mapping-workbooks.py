"""Build the framework mapping workbooks from src/data/mappings/*.json.

The page preview reads the same JSON, so the workbook and the preview cannot drift.
Run: python3 scripts/build-mapping-workbooks.py
"""
import json, pathlib
from openpyxl import Workbook
from openpyxl.styles import Font, Alignment, PatternFill
from openpyxl.worksheet.datavalidation import DataValidation
from openpyxl.utils import get_column_letter

ROOT = pathlib.Path(__file__).resolve().parent.parent
SRC = ROOT / 'src' / 'data' / 'mappings'
OUT = ROOT / 'public' / 'templates' / 'mappings'
HEAD = Font(bold=True, color='FFFFFF')
FILL = PatternFill('solid', fgColor='1F3A5F')
WRAP = Alignment(wrap_text=True, vertical='top')
COLS = ['Control ID', 'Control area', 'Control statement', 'Framework', 'Framework version', 'Reference ID',
        'Reference title', 'Mapping strength', 'Evidence example', 'Notes']
WIDTHS = [11, 18, 48, 16, 22, 22, 46, 16, 42, 42]


def sheet(ws, header, rows, widths, freeze_col='A'):
    ws.append(header)
    for r in rows:
        ws.append(r)
    for i, w in enumerate(widths, 1):
        ws.column_dimensions[get_column_letter(i)].width = w
    for c in ws[1]:
        c.font, c.fill, c.alignment = HEAD, FILL, WRAP
    for row in ws.iter_rows(min_row=2):
        for c in row:
            c.alignment = WRAP
    ws.freeze_panes = f'{freeze_col}2'
    ws.auto_filter.ref = ws.dimensions


def build(path):
    d = json.loads(path.read_text())
    fw = {f[0]: f for f in d['frameworks']}
    wb = Workbook()
    ws = wb.active
    ws.title = 'Mapping'
    rows = []
    for cid, name, ref, title, strength, note in d['rows']:
        area, stmt, ev = d['controls'][cid]
        rows.append([cid, area, stmt, name, fw[name][1], ref, title, strength, ev, note])
    sheet(ws, COLS, rows, WIDTHS)
    n = len(rows) + 1
    names = ','.join(f[0] for f in d['frameworks'])
    for col, opts in (('D', names), ('H', 'Direct,Partial,Supporting')):
        dv = DataValidation(type='list', formula1=f'"{opts}"', allow_blank=False)
        dv.add(f'{col}2:{col}{max(n, 500)}')
        ws.add_data_validation(dv)

    mx = wb.create_sheet('Matrix')
    names_l = [f[0] for f in d['frameworks']]
    mrows = []
    for cid, (area, stmt, _) in d['controls'].items():
        cells = []
        for nm in names_l:
            refs = [r[2] for r in d['rows'] if r[0] == cid and r[1] == nm]
            cells.append('\n'.join(refs))
        mrows.append([cid, area, stmt] + cells)
    sheet(mx, ['Control ID', 'Control area', 'Control statement'] + names_l, mrows, [11, 18, 48] + [18] * len(names_l), 'D')

    fs = wb.create_sheet('Frameworks')
    sheet(fs, ['Framework', 'Version', 'Official source', 'Mapping last reviewed'],
          [[f[0], f[1], f[2], d['reviewed']] for f in d['frameworks']], [18, 30, 56, 22])

    rm = wb.create_sheet('Read me')
    for line in [
        ['OneLens by Ruchi: ' + d['title']],
        [],
        ['Purpose', 'Shows which framework requirements each control supports, one reference per row, so you can filter by framework and reuse the mapping in your own control set.'],
        ['How to use', 'Use the Mapping sheet to filter by framework, reference or mapping strength. Use the Matrix sheet for a one-glance view. The Frameworks sheet lists the versions used.'],
        ['Mapping strength', 'Direct: the control meets the requirement on its own. Partial: it covers part of the requirement. Supporting: it contributes evidence but is not the main control.'],
        ['Disclaimer', 'Guidance only. Verify against the official standard text before relying on this mapping.'],
        ['Version', d['version']],
        ['Date', d['reviewed']],
    ]:
        rm.append(line)
    rm.column_dimensions['A'].width = 20
    rm.column_dimensions['B'].width = 100
    rm['A1'].font = Font(bold=True, size=13)
    for row in rm.iter_rows(min_row=3):
        row[0].font = Font(bold=True)
        for c in row:
            c.alignment = WRAP
    OUT.mkdir(parents=True, exist_ok=True)
    out = OUT / d['fileName']
    wb.save(out)
    return out, len(rows)


if __name__ == '__main__':
    for p in sorted(SRC.glob('*.json')):
        print(*build(p))
