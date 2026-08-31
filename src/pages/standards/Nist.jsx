import { Link } from 'react-router-dom';

export default function Nist() {
  const FRAMEWORK = {
    id: 'nist',
    name: 'NIST Cybersecurity Framework (CSF 2.0)',
    shortName: 'NIST CSF',
    color: 'blue',
    weeks: [
      {
        week: 1,
        title: 'Govern & Identify (GV, ID)',
        color: 'blue',
        days: 'Days 1-14',
        description: 'Establish governance and understand cybersecurity risk',
        tasks: [
          'Complete Learning Module 1: NIST CSF 2.0 Overview & Governance',
          'GV.1: Establish cybersecurity strategy, policy, and oversight',
          'GV.2: Define roles, responsibilities, and authorities',
          'GV.3: Manage cybersecurity supply chain risks',
          'ID.AM: Asset management - inventory hardware, software, data, systems',
          'ID.BE: Business environment - mission, dependencies, critical infrastructure',
          'ID.GV: Governance - policies, risk management strategy, legal/regulatory',
          'ID.RA: Risk assessment - threats, vulnerabilities, likelihood, impact',
          'ID.RM: Risk management strategy - risk tolerance, prioritization'
        ]
      },
      {
        week: 2,
        title: 'Protect (PR) - Safeguards Implementation',
        color: 'blue',
        days: 'Days 15-30',
        description: 'Implement protective safeguards for critical assets',
        tasks: [
          'Complete Learning Module 2: Protect Function Deep Dive',
          'PR.AA: Identity management, authentication, and access control',
          'PR.AT: Awareness and training - role-based, privileged users, third parties',
          'PR.DS: Data security - classification, handling, encryption, disposal',
          'PR.IP: Information protection processes - baselines, config mgmt, backups',
          'PR.MA: Maintenance - scheduled, remote, approved tools, personnel',
          'PR.PT: Protective technology - audit logs, least functionality, segmentation',
          'Implement zero trust architecture principles where applicable'
        ]
      },
      {
        week: 2,
        title: 'Detect (DE) - Continuous Monitoring',
        color: 'green',
        days: 'Days 30-45',
        description: 'Implement continuous monitoring and detection capabilities',
        tasks: [
          'Complete Learning Module 3: Detect & Respond Functions',
          'DE.AE: Anomalies and events - baseline, detection, alerting, SIEM',
          'DE.CM: Security continuous monitoring - network, personnel, external',
          'DE.DP: Detection processes - roles, responsibilities, testing, improvement',
          'Implement threat intelligence integration and threat hunting',
          'Establish security operations center (SOC) or managed detection',
          'Conduct tabletop exercises and red team/blue team exercises'
        ]
      },
      {
        week: 4,
        title: 'Respond (RS) & Recover (RC)',
        color: 'orange',
        days: 'Days 45-60+',
        description: 'Response planning, recovery, and continuous improvement',
        tasks: [
          'Complete Learning Module 4: Respond, Recover & Governance',
          'RS.RP: Response planning - IR plan, roles, communication, playbooks',
          'RS.CO: Communications - internal, external, legal, regulatory, law enforcement',
          'RS.AN: Analysis - investigation, forensics, impact, categorization',
          'RS.MI: Mitigation - containment, eradication, evidence preservation',
          'RS.IM: Improvements - lessons learned, root cause, plan updates',
          'RC.RP: Recovery planning - RTO/RPO, backup, restoration, testing',
          'RC.CO: Communications - recovery status, stakeholders, reputation',
          'GV.4: Continuous improvement - metrics, maturity, board reporting'
        ]
      }
    ],
    milestones: [
      { day: 30, label: 'Govern & Identify Complete', color: 'blue' },
      { day: 60, label: 'Protect & Detect Operational', color: 'green' },
      { day: 90, label: 'Full CSF 2.0 Program Mature', color: 'orange' }
    ],
    excelUrl: '/checklists/NIST_CSF_2_Checklist.xlsx',
    referenceUrl: 'https://www.nist.gov/cyberframework'
  };

  return (
    <LearningFrameworkPage framework={FRAMEWORK} />
  );
}
