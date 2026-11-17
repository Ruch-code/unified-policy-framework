import LearningFrameworkPage from "../../components/LearningFrameworkPage.jsx";

// PMLA and FIU-IND AML/CFT obligations for Virtual Digital Asset (VDA) service providers in India.
// TODO (Ruchi to verify): exact STR timeline wording and rule numbers against the PML (Maintenance of Records) Rules, 2005 and the current FIU-IND VDA guidelines.
const FRAMEWORK = {
  id: 'pmla-vda',
  name: 'PMLA and FIU-IND AML/CFT for VDA service providers',
  shortName: 'PMLA (VDA)',
  region: 'India',
  flag: 'in',
  basePath: '/pmla-vda',
  color: 'beige',
  weeks: [
    {
      week: 1,
      title: 'L1 Foundation: Applicability and registration',
      days: 'Days 1-10',
      description: 'Confirm the business is a reporting entity and set up the people and registration FIU-IND expects.',
      tasks: [
        {
          title: 'Confirm you are a reporting entity',
          control: 'A Ministry of Finance notification of March 2023 brought VDA service providers under the Prevention of Money Laundering Act, 2002 (PMLA). Covered activities include exchange between VDAs and fiat currency, exchange between VDAs, transfer of VDAs, safekeeping or administration of VDAs, and related financial services.',
          how: 'Map each product (spot trading, crypto to crypto swaps, transfers, custody, staking or lending) to the notified activities. Record the result and get Legal sign-off.',
          check: 'Signed applicability memo listing each product and the notified activity it falls under.'
        },
        {
          title: 'Register with FIU-IND',
          control: 'FIU-IND (Financial Intelligence Unit of India) requires reporting entities to register before reporting. Offshore VDA providers serving Indian users are also expected to register.',
          how: 'Complete registration on the FIU-IND reporting portal (FINnet). Keep the registration details current when directors or officers change.',
          check: 'FIU-IND registration confirmation and a change log of updates.'
        },
        {
          title: 'Appoint a Designated Director and Principal Officer',
          control: 'PMLA requires a Designated Director (accountable at board level) and a Principal Officer (who files reports and liaises with FIU-IND).',
          how: 'Appoint both by board resolution and notify FIU-IND. Give the Principal Officer independence and access to all customer and transaction data.',
          check: 'Board resolution, appointment letters and FIU-IND acknowledgement.'
        },
        {
          title: 'Approve an AML/CFT policy',
          control: 'Reporting entities must have a board-approved policy on anti-money laundering (AML) and countering the financing of terrorism (CFT).',
          how: 'Cover customer due diligence, risk assessment, monitoring, reporting, record keeping, training and sanctions screening. Review it at least yearly.',
          check: 'Board-approved AML/CFT policy with version history.'
        }
      ]
    },
    {
      week: 2,
      title: 'L2 Operations: KYC, monitoring and screening',
      days: 'Days 11-20',
      description: 'Know your customers, watch their transactions and screen wallet addresses.',
      tasks: [
        {
          title: 'Customer due diligence (KYC)',
          control: 'Identify and verify every customer and beneficial owner before providing services, and apply enhanced due diligence to higher-risk customers.',
          how: 'Collect and verify identity documents, check them against official databases where allowed, record the purpose of the relationship and risk-rate each customer. Refresh KYC periodically, sooner for high risk.',
          check: 'Sample customer files showing verified identity, risk rating and last review date.'
        },
        {
          title: 'Transaction monitoring',
          control: 'Monitor transactions to spot unusual or suspicious activity, including activity linked to mixers, sanctioned addresses or stolen funds.',
          how: 'Use rules and blockchain analytics (KYT: know your transaction) to flag risky deposits and withdrawals. Define who reviews alerts and how quickly.',
          check: 'Monitoring rule list, alert review records and closure decisions with reasons.'
        },
        {
          title: 'Sanctions and address screening',
          control: 'Screen customers and wallet addresses against sanctions and designated lists under the CFT obligations.',
          how: 'Screen at onboarding and on every transfer. Block and report matches. Keep lists updated automatically.',
          check: 'Screening configuration, list update logs and sample match handling.'
        },
        {
          title: 'Information on transfers (travel rule)',
          control: 'The FIU-IND guidelines expect originator and beneficiary information to travel with VDA transfers, in line with the FATF travel rule.',
          how: 'Collect and pass sender and receiver details for transfers to other VDA providers. Apply extra checks for transfers to unhosted wallets (wallets not held at a provider).',
          check: 'Travel rule configuration and a sample of outgoing and incoming transfers with required data.'
        }
      ]
    },
    {
      week: 3,
      title: 'L3 Reporting and records',
      days: 'Days 21-30',
      description: 'File reports on time, keep records for the required period and train staff.',
      tasks: [
        {
          title: 'Suspicious transaction reports (STR)',
          control: 'Report suspicious transactions to FIU-IND within the timeline in the PML Rules, commonly cited as 7 working days from concluding that a transaction is suspicious. Confirm against the current rules.',
          how: 'Escalate alerts to the Principal Officer, document the decision either way, file the STR on FINnet and never tip off the customer.',
          check: 'STR register with alert date, decision date, filing date and FIU-IND acknowledgement.'
        },
        {
          title: 'Record keeping for 5 years',
          control: 'Keep KYC records and transaction records for at least 5 years, as PMLA requires. CERT-In Directions also require VDA providers to keep KYC and transaction records for 5 years.',
          how: 'Store records so they can be retrieved quickly for FIU-IND or law enforcement requests. Protect them from changes and deletion.',
          check: 'Retention settings, a sample retrieval test and a record of any regulator requests met.'
        },
        {
          title: 'AML training',
          control: 'Staff must understand AML/CFT duties and how to escalate concerns.',
          how: 'Train all staff at joining and yearly, with deeper training for support, compliance and operations teams that see customer activity.',
          check: 'Training completion records and the training content.'
        },
        {
          title: 'Independent review',
          control: 'The AML/CFT programme should be reviewed independently to confirm it works.',
          how: 'Run a yearly internal audit or external review of KYC, monitoring, screening and reporting. Track findings to closure.',
          check: 'Latest review report and remediation tracker.'
        }
      ]
    }
  ],
  milestones: [
    { day: 10, label: 'Registered and policy approved', color: 'blue' },
    { day: 20, label: 'KYC and monitoring live', color: 'purple' },
    { day: 30, label: 'Reporting and records ready', color: 'green' }
  ],
  referenceUrl: 'https://fiuindia.gov.in'
};

export default function Pmla() {
  return <LearningFrameworkPage framework={FRAMEWORK} />;
}

export { FRAMEWORK };
