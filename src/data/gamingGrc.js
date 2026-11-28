// Commercial Gaming GRC (UAE / GCGRA) knowledge area.
// Researched 27 Nov 2026 from GCGRA, UAE legislation and FIU sources, GLI, WLA and UAE law firm briefings.
// Only facts confirmed from GCGRA publications or other primary sources are stated.

export const GAMING_VERIFIED = '27 Nov 2026';

const GCGRA = ['GCGRA official site', 'https://www.gcgra.gov.ae/'];
const LEG = ['UAE Legislation portal', 'https://uaelegislation.gov.ae/'];
const GOAML = ['UAE Financial Intelligence Unit (goAML)', 'https://www.uaefiu.gov.ae/'];
const TAMIMI_AML = ['Al Tamimi: The UAE AML framework in 2026', 'https://www.tamimi.com/our-knowledge/publications/eyes-on-2026/articles/the-uaes-aml-framework-navigating-a-new-era-of-financial-crime-compliance-in-2026/'];
const CMS_AML = ['CMS: The new 2025 AML Executive Regulations', 'https://cms.law/en/are/legal-updates/operationalising-the-new-uae-aml-law-a-deep-dive-into-the-new-2025-executive-regulations'];
const WYNN = ['Wynn Resorts: gaming operator licence for Wynn Al Marjan Island (Oct 2024)', 'https://www.newsroom.wynnresorts.com/en/wynnresorts/wynn-resorts-announces-receipt-of-gaming-operator-license-for-wynn-al-marjan-island/s/65aba4d8-7fdd-478c-ba02-d65ed827a991'];
const FANATICS = ['Fanatics: Momentum and Fanatics joint venture (Jun 2026)', 'https://www.fanaticsinc.com/press-releases/momentum-and-fanatics-join-forces-to-build-a-new-powerhouse-in-regional-regulated-commercial-gaming'];
const MURREN = ['iGaming Business: GCGRA CEO steps down, interim replacement (Nov 2025)', 'https://igamingbusiness.com/legal-compliance/regulation/gcgra-ceo-kevin-mullally-steps-down-jim-murren-interim-replacement/'];
const GLI = ['Gaming Laboratories International: standards', 'https://gaminglabs.com/'];
const GLI33 = ['GLI-33 v2.0 draft and change document (Jun 2026)', 'https://gaminglabs.com/wp-content/uploads/2026/06/EN-GLI-33-Change-Doc-2.0-from-1.1-2026-06-30.pdf'];
const WLA = ['World Lottery Association: Security Control Standard 2024', 'https://world-lotteries.org/services/industry-standards/security-and-risk-management-2/security-standard-2024'];
const PCI = ['PCI Security Standards Council', 'https://www.pcisecuritystandards.org/'];
const PDPL = ['DLA Piper: Data protection in the UAE', 'https://www.dlapiperdataprotection.com/?t=law&c=AE'];
const CSC = ['UAE Cybersecurity Council', 'https://csc.gov.ae/'];
const UN = ['UN Security Council Consolidated List', 'https://www.un.org/securitycouncil/content/un-sc-consolidated-list'];
const EOCN = ['UAE Executive Office for Control and Non-Proliferation (local terrorist list)', 'https://www.uaeiec.gov.ae/'];

export const GAMING_TOPICS = [
  {
    id: 'gaming-industry',
    label: 'Commercial gaming: industry overview',
    desc: 'Verticals, how operators make money, key risks, and the UAE market history and status.',
    sections: [
      { h: 'Verticals', table: { head: ['Vertical', 'What it is', 'Main risks'], rows: [
        ['Lottery', 'Draw-based games and instant games, sold online or through retail', 'Draw integrity, insider fraud, ticket and prize fraud'],
        ['iGaming', 'Online casino games such as slots and table games', 'Game fairness, account takeover, money laundering, harm to players'],
        ['Sports wagering', 'Betting on sports and other events, pre-match and in-play', 'Match-fixing, odds errors, trader fraud, bonus abuse'],
        ['Land-based gaming', 'Casinos and gaming venues with tables and gaming machines', 'Cash-based money laundering, cheating, physical security'],
      ] } },
      { h: 'How an operator makes money', list: [
        'Gross gaming revenue (GGR) is stakes minus winnings paid. Regulators usually set fees or taxes on GGR or on licences.',
        'Lottery margin comes from the share of ticket sales not returned as prizes.',
        'iGaming margin comes from each game\'s built-in house edge, so return to player (RTP) is the key fairness measure.',
        'Sportsbooks earn a margin priced into the odds and manage risk through trading and limits.',
        'Costs that matter to GRC: payments, bonuses and promotions, platform and content suppliers, marketing, compliance and taxes.',
      ] },
      { h: 'Key risk areas for GRC', list: [
        'Licensing and regulatory compliance', 'Financial crime (AML, CFT and sanctions)', 'Responsible gaming and player harm', 'Sports integrity',
        'Game and platform fairness', 'Information security and player data protection', 'Payments and fraud', 'Third-party suppliers and vendor licensing',
      ] },
      { h: 'UAE market: history and status', list: [
        'Gambling has long been prohibited under UAE criminal law. Commercial gaming is now lawful only when licensed by the GCGRA.',
        'The General Commercial Gaming Regulatory Authority (GCGRA) was created as a federal regulator with exclusive jurisdiction over commercial gaming: lottery, internet gaming, sports wagering and land-based gaming.',
        'The GCGRA awarded the first lottery licence to The Game LLC (operating as UAE Lottery) on 28 July 2024, and Wynn Resorts announced in October 2024 that it had received a gaming operator licence for Wynn Al Marjan Island in Ras Al Khaimah. The GCGRA publishes its current licensees, including gaming-related vendors, on its Our Licensees page.',
        'In June 2026 Momentum Group and Fanatics announced a joint venture to run Momentum\'s licensed UAE lottery, iGaming and sportsbook activities; the announcement states that GCGRA approved a change in control of Momentum\'s licensed entities.',
      ] },
    ],
    sources: [GCGRA, LEG, WYNN, FANATICS],
  },
  {
    id: 'gaming-gcgra',
    label: 'GCGRA: the UAE gaming regulator',
    desc: 'Mandate, legal basis, leadership, licence types, licensing, change of control, supervision, investigations and penalties.',
    sections: [
      { h: 'Mandate', p: 'GCGRA is the UAE federal authority that regulates, licenses and supervises all commercial gaming activities and facilities, with exclusive jurisdiction. Its stated aims include sustainable growth with integrity, responsible gaming and financial crime prevention.' },
      { h: 'Legal basis and structure', list: [
        'GCGRA is a federal authority set up to regulate all lottery and commercial gaming activities in the UAE.',
      ] },
      { h: 'Licence types', table: { head: ['Licence', 'Who needs it'], rows: [
        ['Gaming operator', 'Entities offering lottery, internet gaming, sports wagering or land-based gaming to players'],
        ['Gaming-related vendor', 'Suppliers of gaming technology, equipment, content and services'],
        ['Key person (corporate and individual)', 'Owners, directors and senior managers with significant influence'],
        ['Gaming employee (occupational)', 'Level 1 supervisory staff and Level 2 staff directly or indirectly involved in gaming'],
      ] }, note: 'Operator licences cover gaming facility operators, lottery operators, lottery retailers, internet gaming operators and sports wagering operators. Key persons include corporate key persons (controllers, affiliates, management services providers) and individual key persons (directors, executive officers and their equivalents at controllers and affiliates). Gaming employees hold occupational licences at Level 1 (supervisory) or Level 2 (non-supervisory staff involved in gaming).' },
      { h: 'Licensing process', list: [
        'Process: intake form and initial screening, invitation to the licensing portal, application fee, documentation (business, corporate, financial, ownership, key persons, third parties), review and principle-in-approval, pre-opening steps, certificate of operation, then licence fee and issue.',
        'Suitability (probity) review of the company, its owners and key persons.',
        'Fees: a non-refundable application fee, a principle-in-approval (PIA) fee of about 10 percent of the licence fee, the remaining licence fee before issue, and a yearly maintenance fee. Amounts follow the GCGRA fee schedule.',
        'Licence conditions set ongoing duties: reporting, notifications, technical standards, AML-CFT and responsible gaming.',
      ] },
      { h: 'Ongoing supervision', list: [
        'Change of control: GCGRA defines control as holding 15 percent or more of economic or voting rights, or the power to appoint or remove a majority of the board. The 2026 Momentum and Fanatics announcement states GCGRA approved a change in control of the licensed entities.',
        'Periodic reporting, notifications of material events, audits and inspections, and testing of systems by approved labs.',
        'Investigations and enforcement of licence conditions by the GCGRA.',
        'Unlicensed gaming remains prohibited: offering or promoting gaming without a GCGRA licence is unlawful.',
      ] },
    ],
    sources: [GCGRA, LEG, MURREN, FANATICS],
  },
  {
    id: 'gaming-licensing',
    label: 'Licensing and suitability',
    desc: 'Probity and fit-and-proper checks, beneficial ownership, key person and vendor licensing, and ongoing notifications.',
    sections: [
      { h: 'What suitability means', p: 'Regulators license people as well as companies. They check that owners, directors, key managers and suppliers are honest, financially sound and competent, because control of a gaming business gives access to large cash flows and player data.' },
      { h: 'Checks', table: { head: ['Area', 'What is checked', 'Evidence'], rows: [
        ['Integrity', 'Criminal records, regulatory actions, litigation, adverse media', 'Police certificates, declarations, background check reports'],
        ['Financial standing', 'Source of funds and wealth, solvency, financing of the operation', 'Audited accounts, bank letters, funding agreements'],
        ['Beneficial ownership', 'Every person who ultimately owns or controls the business (UAE AML rules use a 25 percent threshold)', 'Group chart to individuals, UBO register'],
        ['Competence', 'Experience to run a regulated gaming business', 'CVs, references, organisation chart'],
        ['Vendors', 'Suppliers of games, platforms and critical services are licensed or approved', 'Vendor licence numbers, contracts, due diligence files'],
      ] } },
      { h: 'Ongoing duties for the GRC team', list: [
        'Keep a licence register: entities, licence numbers, conditions, renewal dates and responsible owners.',
        'Notify GCGRA of material changes to the information it holds, including changes in ownership, standing or suitability, and track any further triggers in your licence conditions.',
        'Run periodic re-checks of key persons and vendors, and screen them against sanctions and adverse media.',
        'Make sure only licensed or approved vendors are onboarded, and the vendor management process records the licence check.',
      ] },
      { h: 'What auditors and regulators ask for', list: ['Licence register and conditions tracker', 'UBO and key person files with dates of last re-check', 'Notification log with submission evidence', 'Vendor approval records'] },
    ],
    sources: [GCGRA, TAMIMI_AML],
  },
  {
    id: 'gaming-aml',
    label: 'Financial crime prevention (AML-CFT) for gaming',
    desc: 'UAE AML law and 2025 regulations, risk-based approach, KYC, PEPs, sanctions, gaming red flags, goAML STRs, MLRO and records.',
    sections: [
      { h: 'Legal framework', list: [
        'Federal Decree-Law No. 10 of 2025 on Anti-Money Laundering, Combating the Financing of Terrorism and Countering Proliferation Financing replaced Federal Law No. 20 of 2018.',
        'Its Executive Regulations, Cabinet Resolution No. 134 of 2025, replaced Cabinet Resolution No. 10 of 2019 and are reported in force from 14 December 2025.',
        'Commercial gaming operators are now treated as designated non-financial businesses and professions (DNFBPs) under the new AML framework.',
        'GCGRA describes itself as the competent authority for financial crime prevention in the gaming sector and follows FATF recommendations. It expects internal controls and governance, periodic business risk assessments, policies and procedures, player due diligence, transaction monitoring and internal and external suspicious transaction reporting.',
      ] },
      { h: 'Programme elements', table: { head: ['Element', 'What good looks like'], rows: [
        ['Enterprise-wide risk assessment', 'Risks by product, channel, payment method, geography and customer type, refreshed at least yearly'],
        ['KYC and CDD', 'Identity verified before play or before thresholds are reached; source of funds checks as risk rises'],
        ['Enhanced due diligence', 'High-value players, PEPs, high-risk countries and unusual activity get senior approval and source of wealth checks'],
        ['PEPs', 'Screening at onboarding and on a schedule; approval by senior management'],
        ['Sanctions', 'Screen players, vendors and payments against the UAE local terrorist list and the UN Security Council consolidated list; apply freezing duties without delay'],
        ['Transaction monitoring', 'Rules and models tuned to gaming typologies, with alerts reviewed and documented'],
        ['Reporting', 'Suspicious transaction reports filed through goAML promptly; no tipping off'],
        ['MLRO', 'A named compliance officer with authority, independence and resources, reporting to senior management'],
        ['Records', 'Customer, transaction and investigation records kept for the retention period set in the AML law and regulations'],
        ['Training', 'Role-based AML training for customer support, payments, VIP and risk teams'],
      ] } },
      { h: 'Gaming-specific red flags', table: { head: ['Typology', 'What it looks like'], rows: [
        ['Chip dumping', 'Players deliberately lose to a partner in peer-to-peer games such as poker to move money'],
        ['Structuring', 'Deposits or withdrawals split to stay under thresholds'],
        ['Minimal play', 'Deposit, little or no play, then withdrawal, possibly to a different method'],
        ['Mule accounts', 'Many accounts sharing devices, IPs, payment cards or addresses, or accounts opened for others'],
        ['Bonus abuse', 'Multiple accounts to claim promotions, or matched betting to extract bonus value'],
        ['Match-fixing proceeds', 'Unusual bets on low-profile events, or wins linked to suspicious betting alerts'],
        ['Third-party funding', 'Payments from cards or wallets not in the player\'s name'],
        ['Rapid in-out', 'High turnover with stakes on near-certain outcomes to clean funds'],
      ] } },
      { h: 'What auditors and regulators ask for', list: ['Risk assessment and AML policy approved by the board', 'KYC files for a sample of players, including EDD cases', 'Screening configuration and hit handling', 'Monitoring rules, alert reviews and closure reasons', 'goAML STR log and MLRO reports', 'Training records'] },
    ],
    sources: [GOAML, TAMIMI_AML, CMS_AML, EOCN, UN, LEG],
  },
  {
    id: 'gaming-rg',
    label: 'Responsible gaming',
    desc: 'GCGRA responsible gaming requirements, age checks, limits, reality checks, self-exclusion, affordability, marketing rules and KPIs.',
    sections: [
      { h: 'Regulatory basis', p: 'GCGRA aims to minimise gaming harm to individuals, families and communities, and promotes education, ethical behaviour and good practice in responsible gaming. Licence applicants must give an overview of their responsible gaming plan. Detailed duties come from GCGRA rules and licence conditions.' },
      { h: 'Player protection tools', table: { head: ['Tool', 'What good looks like'], rows: [
        ['Age verification', 'Identity and age checked before play; no play by anyone below the legal age set by the GCGRA'],
        ['Deposit, loss and wager limits', 'Set at registration or prompted early; decreases apply at once, increases only after a cooling period'],
        ['Reality checks', 'Pop-ups showing time played and net position at set intervals'],
        ['Time-outs', 'Short breaks a player can choose, during which they cannot play'],
        ['Self-exclusion', 'Exclusion for set periods, honoured across products, with marketing stopped and accounts closed'],
        ['Affordability and markers of harm', 'Monitoring for rising spend, chasing losses, late-night play, repeated deposit attempts and failed payments, with interactions logged'],
        ['Marketing controls', 'No marketing to excluded or at-risk players, minors or those who opted out; clear terms on promotions'],
      ] } },
      { h: 'KPIs', list: ['Share of players using limits', 'Number and speed of interactions after harm markers', 'Self-exclusion requests honoured within SLA', 'Marketing breaches to excluded players (target zero)', 'Complaints related to harm and their outcomes'] },
      { h: 'What auditors and regulators ask for', list: ['Responsible gaming policy and plan', 'Tool configuration and testing', 'Sample of player interactions with records', 'Self-exclusion list and marketing suppression evidence', 'Staff training records'] },
    ],
    sources: [GCGRA],
  },
  {
    id: 'gaming-integrity',
    label: 'Sports betting integrity',
    desc: 'Match-fixing risk, suspicious betting alerts, integrity monitoring partners and data rights.',
    sections: [
      { h: 'Why it matters', p: 'Sportsbooks can be used to profit from manipulated events. Operators are expected to detect and report suspicious betting, cooperate with sports bodies and regulators, and stop staff and insiders from betting.' },
      { h: 'Controls', table: { head: ['Control', 'What good looks like'], rows: [
        ['Suspicious betting monitoring', 'Alerts for unusual volumes, odds moves, late bets and linked accounts on the same outcome'],
        ['Integrity partners', 'Membership of an integrity monitoring body or service that shares alerts across operators and with sports bodies'],
        ['Reporting', 'Suspicious betting reported to the regulator and relevant integrity bodies as licence conditions require'],
        ['Prohibited bettors', 'Athletes, officials, staff and other insiders blocked from betting where required'],
        ['Market approval', 'Only approved event types and markets offered, avoiding easily manipulated markets'],
        ['Official data', 'Use of licensed and reliable data feeds for settlement, with data rights agreements in place'],
        ['Voiding and suspension', 'Clear rules to suspend markets and void bets when integrity is in doubt'],
      ] } },
      { h: 'Evidence', list: ['Alert log and investigation notes', 'Reports to regulator and integrity partners', 'Prohibited bettor list and screening results', 'Data supply contracts'] },
    ],
    sources: [GCGRA, GLI33],
  },
  {
    id: 'gaming-technical',
    label: 'Game and platform technical standards',
    desc: 'GLI-19, GLI-33, GLI-11 and GLI-16, RNG certification, RTP, change control and independent test labs.',
    sections: [
      { h: 'GLI standards', table: { head: ['Standard', 'Covers', 'Status (Nov 2026)'], rows: [
        ['GLI-19', 'Interactive gaming systems: platform, player accounts, games, RNG, security', 'v3.0 (2020); v4.0 draft released for comment in July 2026. See the GLI-19 playbook on OneLens'],
        ['GLI-33', 'Event wagering (sports betting) systems', 'v1.1 in use; v2.0 draft released for comment in June 2026'],
        ['GLI-11', 'Gaming devices such as slot machines in land-based venues', 'Check the current version on gaminglabs.com'],
        ['GLI-16', 'Cashless systems in casinos', 'Check the current version on gaminglabs.com'],
      ] }, note: 'Which GLI standards GCGRA has adopted, and how they map to ISO 27001 and SOC 2, is on the control mapping page.' },
      { h: 'Key control areas', list: [
        'RNG certification by an accredited independent test lab, with production monitoring.',
        'Return to player (RTP) documented per game and checked against actual results.',
        'Every game and platform change follows change control; certified components are re-tested and approved before release.',
        'Software integrity checks (hashing or signatures) to show the deployed version matches the certified version.',
        'Geolocation, player account and responsible gaming functions tested as part of certification.',
      ] },
      { h: 'Evidence', list: ['Lab certificates and test reports', 'Approved software version list with hashes', 'Change tickets showing approval before release', 'RTP monitoring reports'] },
      { h: 'Related on OneLens', link: ['/gli-19', 'GLI-19 interactive gaming systems playbook'] },
    ],
    sources: [GLI, GLI33],
  },
  {
    id: 'gaming-lottery',
    label: 'Lottery security',
    desc: 'WLA Security Control Standard, draw integrity and ISO 27001 alignment.',
    sections: [
      { h: 'WLA Security Control Standard', list: [
        'The World Lottery Association Security Control Standard (WLA-SCS) sets security and integrity controls for lotteries and is certified by approved auditors.',
        'The current edition is WLA-SCS:2024, with a guide to certification and a published change document.',
        'It builds on ISO/IEC 27001: certification normally needs an ISO 27001 certified ISMS plus the lottery-specific controls.',
      ] },
      { h: 'Draw integrity controls', table: { head: ['Control', 'What good looks like'], rows: [
        ['Draw equipment', 'Certified RNG or physical draw machines, stored securely, tested before draws'],
        ['Independent witness', 'Draws observed by independent auditors and recorded'],
        ['Segregation', 'No single person can influence a draw or see results early'],
        ['Sales cut-off', 'Ticket sales closed before the draw, with the closed data secured'],
        ['Winning ticket validation', 'Prize claims checked against secured sales data'],
        ['Insider controls', 'Staff and suppliers barred from playing; access to draw systems logged and reviewed'],
      ] } },
      { h: 'Evidence', list: ['WLA-SCS certificate and scope', 'ISO 27001 certificate', 'Draw procedures, witness reports and recordings', 'Access logs for draw systems'] },
    ],
    sources: [WLA],
  },
  {
    id: 'gaming-infosec',
    label: 'Information security and data protection for gaming',
    desc: 'ISO 27001 and PCI DSS for operators, UAE PDPL, UAE Information Assurance standards, data residency and player data.',
    sections: [
      { h: 'Security frameworks', list: [
        'ISO/IEC 27001 gives the management system; gaming operators usually scope in the platform, player account management, payments, trading and support.',
        'PCI DSS v4.0.1 applies wherever card data is stored, processed or transmitted; reduce scope with tokenisation and hosted payment pages.',
        'Gaming technical standards such as GLI-19 Appendix B add security testing and controls specific to gaming systems.',
        'The UAE Cybersecurity Council sets national cybersecurity policy and standards.',
      ] },
      { h: 'UAE PDPL', list: [
        'Federal Decree-Law No. 45 of 2021 on the Protection of Personal Data covers personal data processed in the UAE, outside the free zones that have their own data laws.',
        'At the time of writing, the Executive Regulations had not been published; check the current position before relying on detailed rules.',
        'Key duties: lawful basis, purpose limits, security, breach notification to the regulator, a DPO for high-risk or large-scale sensitive processing, and restrictions on cross-border transfers.',
      ] },
      { h: 'Player data protection', table: { head: ['Area', 'What good looks like'], rows: [
        ['Data inventory', 'Map KYC documents, payment data, gameplay, harm markers and marketing data'],
        ['Data residency', 'Know where each dataset is hosted and whether licence conditions require UAE hosting'],
        ['Access', 'Least privilege for VIP, support and risk teams; access to harm and KYC data logged'],
        ['Retention', 'Retention aligned with AML record-keeping and data protection minimisation'],
        ['Account security', 'MFA, account takeover detection and alerts on payment detail changes'],
        ['Breach response', 'Plan covering the gaming regulator, data protection authority and players'],
      ] } },
    ],
    sources: [PCI, PDPL, CSC, LEG, GLI],
  },
  {
    id: 'gaming-payments',
    label: 'Payments for gaming operators',
    desc: 'Deposits and withdrawals, wallets, chargebacks, fraud and payment-provider due diligence.',
    sections: [
      { h: 'Payment flows', list: [
        'Deposits: card, bank transfer and local payment methods, credited to a player wallet.',
        'Withdrawals: paid back to a verified method in the player\'s name, after KYC and AML checks.',
        'Player funds: follow any GCGRA rules on protecting player balances.',
      ] },
      { h: 'Controls', table: { head: ['Control', 'What good looks like'], rows: [
        ['Closed loop', 'Withdrawals go back to the method used to deposit, where possible'],
        ['Name match', 'Payment methods must belong to the account holder'],
        ['Fraud screening', 'Device, velocity and card checks on deposits; account takeover detection'],
        ['Chargebacks', 'Monitored by player and method; repeated chargebacks investigated'],
        ['Reconciliation', 'Daily reconciliation of wallets, payment provider reports and bank statements, with exceptions owned'],
        ['Provider due diligence', 'Payment providers licensed by the right authority, PCI compliant and contracted for incident notice'],
        ['Refunds and adjustments', 'Manual balance changes need dual approval and are logged'],
      ] } },
      { h: 'Evidence', list: ['Payment policy and procedures', 'Reconciliation reports and exception logs', 'Provider contracts, licences and PCI attestations', 'Sample of withdrawals with KYC and AML checks'] },
    ],
    sources: [PCI, TAMIMI_AML],
  },
  {
    id: 'gaming-control-mapping',
    label: 'Control mapping: GCGRA and GLI to ISO 27001 and SOC 2',
    desc: 'How the GCGRA technical standards (GLI series) connect to ISO 27001 and SOC 2: common, partial, missing and gaming-specific controls, gaps, strategy and evidence.',
    sections: [
      { h: 'How to read this page', list: [
        'GLI column: based on GLI-19 v3.0 section structure (platform, player accounts, RNG, games, Appendix A operational procedures, Appendix B technical security). GLI-33 (event wagering) follows a similar pattern; check exact clauses in the current version.',
        'Commonality: Common = GLI, ISO 27001 and SOC 2 all address it; Partial = covered but at different depth; Missing = not evidenced in GCGRA/GLI; Gaming-specific = mainly GCGRA/GLI.',
      ] },
      { h: '1. Executive summary', list: [
        'GCGRA has adopted a technical standard series produced by GLI: 17 GLI standards, including GLI-11 (gaming devices), GLI-16 (cashless), GLI-19 (interactive gaming) and GLI-33 (event wagering). Operators are expected to know and comply with them.',
        'GCGRA and GLI focus on the gaming system itself: fair and certified games and RNGs, accurate wagers and payouts, player accounts, responsible gaming functions, location checks, reporting to the regulator and independent lab testing.',
        'ISO 27001 and SOC 2 focus on the organisation: a managed, risk-based security programme with governance, people, suppliers, operations and evidence that controls work over time.',
        'They overlap strongly on technical security (access, change, logging, encryption, backup, incident response, security testing). ISO 27001 and SOC 2 add the management system around those controls; GCGRA and GLI add gaming-specific depth that neither security framework tests.',
      ] },
      { h: '2. Scope', table: { head: ['Framework', 'What it is', 'Relevant parts'], rows: [
        ['GCGRA technical standards', 'The GCGRA technical standard series, produced by GLI and adopted by the UAE regulator', 'All 17 adopted GLI standards; which apply depends on the licence type (for example GLI-19 for internet gaming, GLI-33 for sports wagering, GLI-11 and GLI-16 for gaming facilities)'],
        ['GLI standards', 'Technical standards from Gaming Laboratories International used by regulators and test labs', 'GLI-19 (interactive gaming systems), GLI-33 (event wagering), GLI-11, GLI-16, GLI-13 (monitoring and control systems), GLI-21 (client-server)'],
        ['ISO/IEC 27001:2022', 'Certifiable information security management system standard', 'Clauses 4 to 10 and Annex A: 93 controls in four themes (organisational, people, physical, technological)'],
        ['SOC 2', 'AICPA attestation report against the Trust Services Criteria', 'Security (common criteria CC1 to CC9, always in scope), Availability (A1), Processing Integrity (PI1), Confidentiality (C1), Privacy (P1 to P8)'],
      ] } },
      { h: '3. Control mapping', table: { head: ['Requirement area', 'GLI (GLI-19 basis)', 'ISO 27001:2022', 'SOC 2', 'Commonality', 'Notes'], rows: [
        ['Governance and accountability', 'Appendix A operational procedures and internal controls', 'Clauses 5, 6; A.5.1 to A.5.4', 'CC1.1 to CC1.5', 'Partial', 'ISO and SOC 2 require a formal security governance structure; GLI focuses on gaming procedures'],
        ['Risk management', 'Appendix B expects a risk-based security approach', 'Clauses 6.1, 8.2, 8.3', 'CC3.1 to CC3.4', 'Partial', 'Enterprise risk methodology comes from ISO and SOC 2'],
        ['Information security policies', 'Appendix B expects documented security procedures', 'A.5.1, A.5.37', 'CC5.3', 'Partial', ''],
        ['Asset management', 'Inventory of critical components for certification', 'A.5.9 to A.5.11', 'CC6.1', 'Partial', 'GLI tracks certified components; ISO covers all information assets'],
        ['Access control', 'Appendix B logical access and user roles', 'A.5.15, A.5.18, A.8.3', 'CC6.1 to CC6.3', 'Common', ''],
        ['Identity and authentication', 'Player authentication (2.5) and staff authentication (Appendix B)', 'A.5.16, A.5.17, A.8.5', 'CC6.1, CC6.2', 'Common', 'GLI also covers player login security'],
        ['Privileged access', 'Administrative access restricted and logged', 'A.8.2, A.8.18', 'CC6.1, CC6.3', 'Common', ''],
        ['Segregation of duties', 'Separation of duties in operational procedures', 'A.5.3', 'CC5.1, CC6.3', 'Partial', ''],
        ['Change management', 'Appendix B change management; re-testing of certified components', 'A.8.32', 'CC8.1', 'Common', 'Gaming adds lab certification and regulator approval for certified software'],
        ['Software development lifecycle', 'Certified software versions and integrity verification (2.3)', 'A.8.25, A.8.27, A.8.29, A.8.31', 'CC8.1', 'Partial', 'ISO covers secure SDLC; GLI controls what is released'],
        ['Secure coding', 'Not explicit', 'A.8.28', 'CC8.1', 'Missing', 'Needs internal secure coding standard and testing'],
        ['Vulnerability management', 'Appendix B technical security testing', 'A.8.8', 'CC7.1', 'Partial', ''],
        ['Patch management', 'Patches to certified components follow change control', 'A.8.8, A.8.19', 'CC7.1, CC8.1', 'Partial', 'Patches can trigger re-certification'],
        ['Penetration testing', 'Appendix B periodic external and internal testing', 'A.8.8, A.8.29', 'CC4.1, CC7.1', 'Common', ''],
        ['Network security', 'Appendix B firewalls, remote access, communications', 'A.8.20 to A.8.22', 'CC6.6', 'Common', ''],
        ['Encryption', 'Appendix B secure communications and data protection', 'A.8.24', 'CC6.1, CC6.7', 'Common', ''],
        ['Key management', 'Not explicit', 'A.8.24', 'CC6.1', 'Partial', 'Needs key management procedure'],
        ['Logging and monitoring', 'Significant event logs, system clock (2.2), monitoring', 'A.8.15, A.8.16, A.8.17', 'CC7.2', 'Common', 'GLI defines gaming events that must be logged'],
        ['Audit trails', 'Information to be maintained (2.8)', 'A.8.15', 'CC7.2, PI1.4', 'Common', ''],
        ['Incident response', 'Operational procedures for incidents and interruptions', 'A.5.24 to A.5.28', 'CC7.3 to CC7.5', 'Partial', 'Regulator notification duties come from licence conditions'],
        ['Backup and recovery', 'Appendix B backup and data integrity', 'A.8.13', 'A1.2, A1.3', 'Common', ''],
        ['Business continuity', 'Recovery of gaming data after failure', 'A.5.29, A.5.30', 'A1.2, A1.3', 'Partial', 'ISO and SOC 2 require tested continuity plans'],
        ['Disaster recovery', 'Recovery and data integrity requirements', 'A.5.30, A.8.14', 'A1.2, A1.3', 'Partial', ''],
        ['Data retention', 'Retention of gaming records (2.8)', 'A.5.33, A.8.10', 'C1.2, P4.2', 'Partial', ''],
        ['Data privacy', 'Player data protection only at a technical level', 'A.5.34', 'P1 to P8', 'Missing', 'Needs a privacy programme (PDPL, ISO 27701)'],
        ['Confidentiality', 'Protection of player and system data', 'A.5.12, A.5.13, A.8.11, A.8.12', 'C1.1, C1.2', 'Partial', ''],
        ['System availability', 'Interruption handling and recovery', 'A.8.6, A.8.14', 'A1.1 to A1.3', 'Partial', ''],
        ['Processing integrity', 'Wager, game outcome and payout accuracy', 'A.8.25 (partial)', 'PI1.1 to PI1.5', 'Gaming-specific', 'SOC 2 PI is the closest match; ISO has no direct equivalent'],
        ['RNG controls', 'Chapter 3 RNG requirements and certification', 'No clear mapping', 'PI1.2 (partial)', 'Gaming-specific', ''],
        ['Game fairness', 'Chapter 4 game rules, fairness, payout percentages', 'No clear mapping', 'PI1.2 (partial)', 'Gaming-specific', ''],
        ['Game integrity', 'Software verification (2.3), interrupted games (Chapter 4)', 'A.8.32 (partial)', 'PI1.3', 'Gaming-specific', ''],
        ['Player account controls', 'Player account management (2.5)', 'A.5.16 (partial)', 'CC6.1, PI1.3', 'Gaming-specific', ''],
        ['Responsible gaming', 'Limits, exclusion and player protection functions (2.5)', 'No clear mapping', 'No clear mapping', 'Gaming-specific', ''],
        ['AML technical controls', 'Player identity and transaction records', 'No clear mapping', 'No clear mapping', 'Gaming-specific', 'Needs transaction monitoring and STR process'],
        ['Financial transaction integrity', 'Financial transactions and wallet records (2.5)', 'A.8.25 (partial)', 'PI1.3, PI1.4', 'Gaming-specific', ''],
        ['Geolocation', 'Location requirements (2.7)', 'No clear mapping', 'No clear mapping', 'Gaming-specific', ''],
        ['Third-party and vendor management', 'Third-party service providers in scope of testing', 'A.5.19 to A.5.23', 'CC9.2', 'Common', 'GCGRA adds vendor licensing'],
        ['Independent testing and certification', 'Lab certification of games, RNG and platform', 'Clause 9.2 internal audit (different purpose)', 'Independent auditor attestation (different purpose)', 'Gaming-specific', 'Lab certification tests the product; ISO and SOC 2 test the organisation'],
        ['Evidence retention', 'Information to be maintained (2.8)', 'Clause 7.5, A.5.33', 'Evidence for the report period', 'Partial', ''],
        ['Regulatory reporting', 'Reporting requirements (2.9)', 'No clear mapping', 'No clear mapping', 'Gaming-specific', ''],
      ] } },
      { h: '4. Common controls', table: { head: ['Control area', 'Why it is common', 'ISO 27001', 'SOC 2', 'More specific in'], rows: [
        ['Access and privileged access', 'Every framework needs only authorised people in systems', 'A.5.15 to A.5.18, A.8.2, A.8.5', 'CC6.1 to CC6.3', 'ISO and SOC 2 (reviews, joiner-mover-leaver); GLI for player accounts'],
        ['Change management', 'Uncontrolled change breaks security and game integrity', 'A.8.32', 'CC8.1', 'GLI (certified software and re-testing)'],
        ['Logging and audit trails', 'Needed to detect issues and prove what happened', 'A.8.15, A.8.16', 'CC7.2', 'GLI (gaming events and clock)'],
        ['Network security and encryption', 'Protects data and systems in transit and at rest', 'A.8.20 to A.8.24', 'CC6.6, CC6.7', 'Similar depth'],
        ['Backup and recovery', 'Gaming and financial data must be restorable', 'A.8.13, A.8.14', 'A1.2, A1.3', 'ISO and SOC 2 (testing and continuity)'],
        ['Security testing', 'Find weaknesses before attackers do', 'A.8.8, A.8.29', 'CC4.1, CC7.1', 'GLI (Appendix B testing as part of certification)'],
        ['Third-party management', 'Suppliers run critical parts of the platform', 'A.5.19 to A.5.23', 'CC9.2', 'GCGRA (vendor licensing)'],
      ] } },
      { h: '5. Where GCGRA and GLI go beyond ISO 27001 and SOC 2', list: [
        'RNG testing and certification by an approved lab.',
        'Game fairness: rules shown to players, outcomes from the RNG, return to player and payout accuracy.',
        'Game logic validation and verification that the deployed software matches the certified version.',
        'Wagering transaction integrity: bets accepted, settled and paid correctly, including interrupted or voided events.',
        'Player protection and responsible gaming functions in the platform.',
        'Location (geolocation) checks.',
        'Regulatory reporting and access for the regulator.',
        'Product certification of the gaming system itself.',
      ] },
      { h: '6. Where ISO 27001 and SOC 2 go further', list: [
        'A formal ISMS: scope, policy, objectives, documented risk methodology and Statement of Applicability.',
        'Enterprise risk management beyond the gaming platform.',
        'Internal audit and management review (ISO Clauses 9.2 and 9.3; SOC 2 CC4).',
        'Full supplier risk management lifecycle.',
        'HR security and security awareness training (A.6.1 to A.6.8; CC1.4, CC2.2).',
        'Privacy programme governance (SOC 2 Privacy criteria; ISO 27701).',
        'Evidence that controls operated over a period (SOC 2 Type II), and continuous monitoring.',
      ] },
      { h: '7. SOC 2 Trust Services Criteria', table: { head: ['Category', 'GCGRA and GLI controls that support it', 'Extra coverage needed'], rows: [
        ['Security', 'Access, authentication, privileged access, change management, network security, encryption, logging and security testing (GLI-19 Appendix B)', 'Governance, risk assessment, HR security and awareness, monitoring of controls (CC1 to CC5)'],
        ['Availability', 'Backup, data integrity, interruption handling and recovery', 'Capacity planning, tested BCP and DR, availability commitments'],
        ['Processing Integrity', 'RNG and game outcome integrity, wager and payout accuracy, player account and financial transaction records, interrupted games', 'Documented processing objectives and reconciliations for the SOC 2 period'],
        ['Confidentiality', 'Protection of player, financial and system data; secure communications', 'Data classification, confidentiality agreements, disposal (C1.2)'],
        ['Privacy', 'Player account data controls only at a technical level', 'Notice, consent, use, retention, disclosure and disposal; UAE PDPL; ISO 27701 or GDPR where applicable'],
      ] } },
      { h: '8. ISO 27001 theme mapping', table: { head: ['Theme', 'Direct', 'Partial', 'No clear mapping'], rows: [
        ['Organisational (A.5)', 'Third-party management, incident procedures', 'Governance, policies, asset inventory, retention, continuity', 'Responsible gaming, regulatory reporting, AML'],
        ['People (A.6)', 'Not evidenced in GLI', 'Gaming employee licensing (GCGRA)', 'Awareness training, disciplinary process'],
        ['Physical (A.7)', 'Gaming facility standards (GLI-11 and related, land-based)', 'Data centre security for interactive gaming', 'Not applicable for some online-only scopes'],
        ['Technological (A.8)', 'Access, logging, network, encryption, backup, change, testing', 'SDLC, vulnerability and patching, capacity', 'RNG, game fairness, geolocation'],
      ] }, note: 'Areas needing extra policies or evidence: ISMS governance, risk methodology, secure coding, key management, privacy programme, awareness training, internal audit and management review.' },
      { h: '9. Gap analysis', table: { head: ['Gap', 'Why it matters', 'Impacted framework', 'Remediation', 'Evidence needed', 'Priority'], rows: [
        ['No formal ISMS around gaming controls', 'Certification and SOC 2 need governance, not just technical controls', 'ISO 27001, SOC 2', 'Define ISMS scope, policy, objectives and SoA covering the gaming platform', 'ISMS scope, SoA, management review minutes', 'High'],
        ['Privacy programme', 'Player data is personal and often financial', 'SOC 2 Privacy, PDPL', 'Privacy policy, notices, rights handling, DPIAs, retention', 'Privacy notice, RoPA, DPIAs, rights log', 'High'],
        ['Operating effectiveness over time', 'Lab certification is point-in-time', 'SOC 2 Type II, ISO surveillance', 'Run controls on a schedule and keep dated evidence', 'Control calendar, dated evidence per period', 'High'],
        ['Secure coding and SDLC', 'Game and platform changes are frequent', 'ISO A.8.25 to A.8.29, SOC 2 CC8.1', 'Secure coding standard, SAST and code review in CI/CD', 'Pipeline logs, review records', 'Medium'],
        ['Key management', 'Encryption is only as strong as key handling', 'ISO A.8.24, SOC 2 CC6.1', 'Key management procedure using a managed KMS or HSM', 'Key inventory, rotation logs', 'Medium'],
        ['Awareness and HR security', 'Insider and phishing risk', 'ISO A.6, SOC 2 CC1.4, CC2.2', 'Role-based training including gaming fraud and AML', 'Training records, acknowledgements', 'Medium'],
        ['Regulatory reporting not linked to the control set', 'Missed GCGRA notifications risk enforcement', 'GCGRA', 'Add regulatory reporting controls to the matrix with owners', 'Notification log, submission evidence', 'High'],
      ] } },
      { h: '10. Practical compliance strategy', list: [
        'Use ISO 27001 as the management system and SOC 2 as the evidence model, then add GCGRA and GLI as a gaming overlay.',
        'Build one control matrix with columns for control ID, description, owner, frequency, ISO 27001 control, SOC 2 criterion, GLI reference, GCGRA reference and evidence.',
        'Reusable across all four: access reviews, change records, logs, vulnerability and pen test reports, backup tests, incident records, vendor assessments.',
        'Evidence that must stay gaming-specific: lab certificates, RNG and game test reports, certified software version and hash lists, RTP monitoring, responsible gaming and geolocation tests, regulatory reports.',
        'Plan audits together: schedule lab re-certification after major changes, align SOC 2 period and ISO surveillance, and keep one evidence repository tagged by framework.',
      ] },
      { h: '11. Remediation roadmap', table: { head: ['When', 'Actions'], rows: [
        ['First 30 days', 'Confirm which GLI standards apply to each licence; build the unified control matrix; name control owners'],
        ['30 to 90 days', 'Close high-priority gaps: ISMS scope and SoA, privacy programme, regulatory reporting controls'],
        ['90 to 180 days', 'Close medium gaps: secure SDLC, key management, awareness; start collecting period evidence'],
        ['180 days onward', 'ISO 27001 certification or surveillance, SOC 2 Type II period, lab re-certification as changes require'],
      ] } },
      { h: 'Evidence checklist', list: [
        'GLI or approved lab certificates for each game, RNG and platform version',
        'Approved software version list with hashes and change approvals',
        'Access reviews, privileged access logs and joiner-mover-leaver records',
        'Change tickets, release approvals and re-certification records',
        'Logs and monitoring configuration, clock synchronisation evidence',
        'Vulnerability scans, penetration tests and remediation tracker',
        'Backup and restore tests, BCP and DR test reports',
        'Incident register and post-incident reviews, including regulator notifications',
        'Vendor inventory, vendor licences and assessments',
        'Responsible gaming function tests, geolocation tests, RTP and game monitoring reports',
        'ISMS documents: scope, policy, risk assessment, SoA, internal audit, management review',
        'Privacy notice, records of processing, DPIAs and rights request log',
      ] },
    ],
    sources: [],
  },
];
