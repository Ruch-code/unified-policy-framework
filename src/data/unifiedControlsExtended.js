// Extra framework columns for the Unified Control Framework (Module A).
// Added only where the mapping could be stated with confidence. Anything left as "Not mapped" is either
// genuinely out of scope for that framework or waiting for verification (see TODO notes).
//
// TODO (Ruchi to verify before adding): ISO 27701 (2025 edition renumbered its controls), ISO 27017 (CLD controls),
// SIG Core (licensed content, IDs not public), HITRUST CSF (licensed; i1 and r2 noted at high level only).
// TODO: CSA CCM v4 IDs below are indicative. Confirm each against the published CCM v4.0.x spreadsheet.

export const UCF_EXTRA_FRAMEWORKS = [
  'NIST SP 800-53 Rev 5',
  'CIS Controls v8.1',
  'CSA CCM v4 (verify)',
  'COSO 2013 principle',
  'ISO 22301:2019',
  'NIST CSF 1.1 (crosswalk)',
];

// [800-53, CIS v8.1, CCM v4, COSO, ISO 22301, CSF 1.1]
const M = {
  'GOV-01': ['PL-1, PM-1', '', 'GRC-01', 'P12', '', 'ID.GV-1'],
  'GOV-02': ['PM-2', '', 'GRC-06', 'P3', '', 'ID.GV-2, ID.AM-6'],
  'GOV-03': ['', '', '', 'P16', '', 'ID.GV-4'],
  'GOV-04': ['CA-2, CA-7', '', 'A&A-02', 'P16, P17', '', ''],
  'RSK-01': ['RA-3', '', 'GRC-02', 'P7, P8', '', 'ID.RA-1 to ID.RA-6'],
  'RSK-02': ['PM-9, RA-7', '', '', 'P7, P10', '', 'ID.RM-1'],
  'RSK-03': ['RA-8', '', '', 'P7', '', ''],
  'HR-01': ['PS-3', '', 'HRS-01', 'P4', '', 'PR.IP-11'],
  'HR-02': ['AT-2, AT-3', '14.1', 'HRS-11', 'P4', '', 'PR.AT-1'],
  'HR-03': ['PL-4, PS-6', '', 'HRS-10', 'P1', '', ''],
  'IAM-01': ['AC-2', '6.1', 'IAM-06', 'P11', '', 'PR.AC-1, PR.AC-4'],
  'IAM-02': ['AC-2, PS-4', '6.2', 'IAM-07', 'P11', '', 'PR.AC-1'],
  'IAM-03': ['AC-2', '5.1', 'IAM-08', 'P11', '', 'PR.AC-4'],
  'IAM-04': ['IA-2(1), IA-2(2)', '6.3, 6.4, 6.5', 'IAM-14', 'P11', '', 'PR.AC-7'],
  'IAM-05': ['IA-5', '5.2', 'IAM-15', 'P11', '', 'PR.AC-1'],
  'AST-01': ['CM-8', '1.1, 2.1', 'DCS-06', 'P11', '', 'ID.AM-1, ID.AM-2'],
  'AST-02': ['RA-2, PM-5(1)', '3.2, 3.7', 'DSP-04', 'P13', '', 'ID.AM-5'],
  'CRY-01': ['SC-8, SC-13, SC-28', '3.10, 3.11', 'CEK-03', 'P11', '', 'PR.DS-1, PR.DS-2'],
  'LOG-01': ['AU-2, AU-12', '8.2', '', 'P11', '', 'PR.PT-1'],
  'LOG-02': ['AU-6, SI-4', '8.11', 'LOG-03', 'P16', '', 'DE.AE-2, DE.CM-1'],
  'VUL-01': ['RA-5, SI-2', '7.1, 7.3, 7.5', 'TVM-07', 'P11', '', 'DE.CM-8, ID.RA-1'],
  'VUL-02': ['CA-8', '18.1, 18.2', 'TVM-06', 'P16', '', 'ID.RA-1'],
  'CHG-01': ['CM-3', '', '', 'P11', '', 'PR.IP-3'],
  'DEV-01': ['SA-8, SA-11, SA-15', '16.1, 16.12', 'AIS-05', 'P11', '', 'PR.IP-2'],
  'NET-01': ['SC-7', '12.2, 13.4', '', 'P11', '', 'PR.AC-5'],
  'EPT-01': ['SI-3', '10.1', 'UEM-09', 'P11', '', 'DE.CM-4'],
  'IR-01': ['IR-3, IR-4, IR-8', '17.4, 17.7', 'SEF-03, SEF-04', 'P11', '', 'RS.RP-1, PR.IP-10'],
  'IR-02': ['IR-6', '', 'SEF-07', 'P14, P15', '', 'RS.CO-2'],
  'BCP-01': ['CP-9, CP-9(1)', '11.2, 11.5', 'BCR-08', 'P11', '', 'PR.IP-4'],
  'BCP-02': ['CP-2, CP-4, CP-10', '11.1', 'BCR-04, BCR-06', 'P9', 'Cl. 8.2.2, 8.4, 8.5', 'RC.RP-1, PR.IP-9'],
  'TPR-01': ['SA-4, SA-9, SR-6', '15.1, 15.4', '', '', '', 'ID.SC-2, ID.SC-3'],
  'TPR-02': ['SA-9, SR-6', '15.6', '', '', '', 'ID.SC-4'],
  'PRV-01': ['PT-4, PT-5', '', '', 'P14, P15', '', ''],
  'PRV-02': ['PM-26', '', '', '', '', ''],
  'PRV-03': ['SI-12, MP-6', '3.1, 3.5', '', '', '', 'PR.IP-6'],
  'AI-01': ['', '', '', '', '', ''],
};

export const UCF_EXTRA = Object.fromEntries(Object.entries(M).map(([id, vals]) => [
  id, Object.fromEntries(UCF_EXTRA_FRAMEWORKS.map((f, i) => [f, vals[i] || 'Not mapped'])),
]));
