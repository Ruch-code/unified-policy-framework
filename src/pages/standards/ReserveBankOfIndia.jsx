import { Link } from 'react-router-dom';

export default function ReserveBankOfIndia() {
  const FRAMEWORK = {
    id: 'rbi',
    name: 'RBI Compliance (India)',
    shortName: 'RBI',
    color: 'blue',
    weeks: [
      {
        week: 1,
        title: 'Licensing, Governance & KYC/AML',
        color: 'blue',
        days: 'Days 1-14',
        description: 'Licensing requirements, board governance, and KYC/AML framework',
        tasks: [
          'Complete Learning Module 1: RBI Regulatory Framework Overview',
          'Understand licensing: Bank, NBFC, Payment Bank, Small Finance Bank, PPI',
          'Board governance: fit & proper, committees (RMC, ACB, NRC, CSR, ITSC)',
          'KYC Master Direction: CDD, EDD, ongoing monitoring, CERSAI, CKYC',
          'AML/CFT: PMLA compliance, STR/CTR filing, FIU-IND reporting',
          'Customer onboarding: video KYC, V-CIP, e-KYC, Aadhaar authentication',
          'Risk-based approach: customer risk categorization, PEPs, NPOs'
        ]
      },
      {
        week: 2,
        title: 'Prudential Norms, Capital & Liquidity',
        color: 'blue',
        days: 'Days 15-30',
        description: 'Capital adequacy, asset classification, provisioning, liquidity',
        tasks: [
          'Complete Learning Module 2: Prudential Norms & Capital Management',
          'Basel III: CRAR (min 9%+CCB), Tier 1/2 capital, leverage ratio',
          'Asset classification: SMA, NPA (substandard, doubtful, loss)',
          'Provisioning: standard, substandard, doubtful, loss, floating',
          'Liquidity: LCR (min 100%), NSFR, ALM, contingency funding plan',
          'Large exposure framework: single/group borrower limits',
          'Sectoral exposure limits: real estate, capital market, NBFC'
        ]
      },
      {
        week: 3,
        title: 'IT Governance, Cyber Security & Digital Payments',
        color: 'green',
        days: 'Days 30-45',
        description: 'IT governance framework, cyber security, and digital payment regulations',
        tasks: [
          'Complete Learning Module 3: IT Governance & Cyber Security',
          'RBI IT Framework: IT governance, info security, IT ops, IS audit, BCM',
          'Cyber Security Framework: baseline, SOC, threat intel, red teaming',
          'Digital Payments: PSS Act, PPI, UPI, BBPS, NETC, card tokenisation',
          'Data localization: payment system data stored in India only',
          'Outsourcing: risk assessment, contract clauses, audit rights, exit mgmt',
          'Emerging tech: cloud, AI/ML, blockchain, API banking guidelines'
        ]
      },
      {
        week: 4,
        title: 'Supervision, Reporting & Consumer Protection',
        color: 'orange',
        days: 'Days 45-60+',
        description: 'Supervisory returns, inspection readiness, and consumer protection',
        tasks: [
          'Complete Learning Module 4: Supervision, Reporting & Consumer Protection',
          'Supervisory returns: OSMOS, off-site returns, thematic inspections',
          'RBI Inspection: CAMELS, RBS, IT examination, cyber security assessment',
          'Consumer Protection: Charter, grievance redressal, Ombudsman, BE(A)CS',
          'Interest rate transparency: base rate, MCLR, EBLR, penal interest',
          'Fraud classification, reporting, monitoring, and staff accountability',
          'Internal audit: risk-based, concurrent, concurrent audit of treasury/forex'
        ]
      }
    ],
    milestones: [
      { day: 30, label: 'Governance & KYC Operational', color: 'blue' },
      { day: 45, label: 'Capital & IT Framework Mature', color: 'green' },
      { day: 60, label: 'Supervision Ready & Consumer Protection', color: 'orange' }
    ],
    excelUrl: '/checklists/RBI_Compliance_Checklist.xlsx',
    referenceUrl: 'https://www.rbi.org.in'
  };

  return (
    <LearningFrameworkPage framework={FRAMEWORK} />
  );
}
