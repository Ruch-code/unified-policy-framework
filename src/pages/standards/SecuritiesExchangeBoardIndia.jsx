import { Link } from 'react-router-dom';

export default function SecuritiesExchangeBoardIndia() {
  const FRAMEWORK = {
    id: 'sebi',
    name: 'SEBI Compliance (India)',
    shortName: 'SEBI',
    color: 'red',
    weeks: [
      {
        week: 1,
        title: 'Registration, Intermediaries & Governance',
        color: 'red',
        days: 'Days 1-14',
        description: 'Registration requirements, intermediary regulations, and governance',
        tasks: [
          'Complete Learning Module 1: SEBI Regulatory Framework Overview',
          'Registration: Broker, DP, Merchant Banker, Portfolio Manager, AIF, REIT, InvIT',
          'Intermediary regulations: net worth, certification, infrastructure, compliance officer',
          'LODR: Board composition (independent, women), committees (AC, NRC, SRC, RMC, CSR)',
          'Governance: independent directors, board eval, vigil mechanism, related party',
          'Code of conduct: insider trading (PIT), fair disclosure, structured digital database',
          'Compliance officer: appointment, certification, reporting lines, escalation'
        ]
      },
      {
        week: 2,
        title: 'Listing Obligations, Disclosure & Investor Protection',
        color: 'red',
        days: 'Days 15-30',
        description: 'LODR compliance, continuous disclosure, and investor grievance redressal',
        tasks: [
          'Complete Learning Module 2: LODR, Disclosure & Investor Protection',
          'Continuous disclosure: Material events (Schedule III), financial results, AGM',
          'Shareholding pattern, corporate governance report, business responsibility report',
          'Investor grievance: SCORES platform, timelines, escalation, RTA coordination',
          'Takeover Code: open offer, creeping acquisition, disclosure thresholds',
          'Insider Trading: PIT Regulations, SDD, trading window, pre-clearance, reporting',
          'PAS: preferential allotment, rights issue, QIP, valuation, lock-in'
        ]
      },
      {
        week: 3,
        title: 'Market Intermediaries, Mutual Funds & AIFs',
        color: 'green',
        days: 'Days 30-45',
        description: 'Mutual fund, AIF, portfolio manager, and other intermediary regulations',
        tasks: [
          'Complete Learning Module 3: Intermediaries, MF & AIF Regulations',
          'Mutual Funds: scheme classification, investment restrictions, expense ratio, NAV',
          'AIF Regulations: Cat I/II/III, leverage, diversification, reporting, custodian',
          'Portfolio Manager: discretionary/non-discretionary, AUM, reporting, audit',
          'Alternative Investment: REIT/InvIT regulations, distribution, valuation',
          'Stock Broker: segregation, margin, reporting, cyber security, audit',
          'Research Analyst: certification, disclosure, conflict of interest, records'
        ]
      },
      {
        week: 4,
        title: 'Enforcement, Adjudication & Emerging Areas',
        color: 'orange',
        days: 'Days 45-60+',
        description: 'Enforcement proceedings, adjudication, and emerging regulatory areas',
        tasks: [
          'Complete Learning Module 4: Enforcement, Adjudication & Emerging Areas',
          'Adjudication: show cause, inquiry, penalty, appeal (SAT, Supreme Court)',
          'Settlement: consent orders, compounding, settlement terms, undertakings',
          'Search & seizure: powers, procedures, rights, judicial oversight',
          'Emerging: ESG/BRSR, green bonds, social stock exchange, algorithmic trading',
          'Finfluencers: registration, disclosure, code of conduct, investor awareness',
          'Technology: algorithmic trading, co-location, blockchain, DLT, AI in markets'
        ]
      }
    ],
    milestones: [
      { day: 30, label: 'Governance & LODR Baseline', color: 'red' },
      { day: 45, label: 'Intermediary Compliance Mature', color: 'green' },
      { day: 60, label: 'Enforcement Ready & ESG Ready', color: 'orange' }
    ],
    excelUrl: '/checklists/SEBI_Compliance_Checklist.xlsx',
    referenceUrl: 'https://www.sebi.gov.in'
  };

  return (
    <LearningFrameworkPage framework={FRAMEWORK} />
  );
}
