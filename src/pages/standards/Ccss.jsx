import LearningFrameworkPage from "../../components/LearningFrameworkPage.jsx";

// CryptoCurrency Security Standard (CCSS), published by the CryptoCurrency Certification Consortium (C4).
// Aspect numbering below follows the published standard; confirm against the current version on the C4 site.
const FRAMEWORK = {
  id: 'ccss',
  name: 'CCSS (CryptoCurrency Security Standard)',
  shortName: 'CCSS',
  region: 'Global',
  flag: '',
  basePath: '/ccss',
  color: 'beige',
  weeks: [
    {
      week: 1,
      title: 'L1 Foundation: Scope, levels and key creation',
      days: 'Days 1-10',
      description: 'Understand what CCSS covers, pick a target level and secure how keys and wallets are created.',
      tasks: [
        {
          title: 'Understand CCSS and choose a target level',
          control: 'CCSS is a security standard for any system that stores, transacts or holds cryptocurrency keys, published by the CryptoCurrency Certification Consortium (C4). It has three levels: Level I, Level II and Level III, each stricter than the last.',
          how: 'List every system that creates, stores or uses keys: hot wallets, cold storage, signing services, custody providers. Pick a target level per system based on the value it holds. Exchanges usually aim for Level II or III on cold storage.',
          check: 'Scoped list of key-handling systems with a target CCSS level for each, approved by the CISO.'
        },
        {
          title: '1.01 Key and seed generation',
          control: 'Keys and seeds (the master secret a wallet is built from) must be created with strong randomness, by approved people, in a controlled setting.',
          how: 'Generate keys on certified hardware (HSM or hardware wallet) in a key ceremony: scripted, witnessed, recorded. Higher levels need more participants and stronger randomness checks.',
          check: 'Signed key ceremony record listing participants, device, randomness source and witnesses.'
        },
        {
          title: '1.02 Wallet creation',
          control: 'Wallets must be created so that no single person controls the funds, and so that keys can be recovered if one is lost.',
          how: 'Use multisig (several keys must sign) or MPC (the key is split into shares). Define how many signers are needed, for example 2-of-3, and document recovery.',
          check: 'Wallet design document showing signing quorum and recovery path; wallet inventory entry for each address.'
        }
      ]
    },
    {
      week: 2,
      title: 'L2 Operations: Storing and using keys',
      days: 'Days 11-20',
      description: 'Protect keys at rest and control how they are used to sign transactions.',
      tasks: [
        {
          title: '1.03 Key storage',
          control: 'Keys and their backups must be stored encrypted or offline, in separate locations, so one event cannot destroy or expose them all.',
          how: 'Keep cold keys offline in HSMs or hardware wallets. Store backups in at least two geographically separate secure locations. Encrypt any key material at rest.',
          check: 'Storage register showing each key, its backup locations and protection method.'
        },
        {
          title: '1.04 Key usage',
          control: 'Keys must only be used in a controlled way: authenticated users, approved transactions and, at higher levels, more than one person to sign.',
          how: 'Route every withdrawal through a policy engine (rules on limits, approved addresses and approvers). Require two or more approvers for large transfers. Sign on dedicated devices.',
          check: 'Policy engine rules export and a sample of signed transactions with approver records.'
        },
        {
          title: '1.05 Key compromise policy',
          control: 'There must be a written, tested plan for what to do if a key is suspected to be compromised.',
          how: 'Write the playbook: freeze use of the key, move funds to new keys, notify stakeholders, investigate. Test it in a tabletop exercise at least yearly.',
          check: 'Key compromise policy and the latest tabletop or test report.'
        },
        {
          title: '1.06 Keyholder grant and revoke',
          control: 'Access for keyholders (people who hold a key or key share) must be formally granted and promptly revoked when roles change.',
          how: 'Keep a keyholder register. Add background checks for keyholders. When someone leaves, revoke access and rotate any key they held.',
          check: 'Keyholder register with grant and revoke dates; sample leaver with key rotation evidence.'
        }
      ]
    },
    {
      week: 3,
      title: 'L3 Assurance: Audits, sanitisation, reserves and logs',
      days: 'Days 21-30',
      description: 'Prove the controls work and that customer assets are fully backed.',
      tasks: [
        {
          title: '1.07 Third-party security audits and penetration tests',
          control: 'Systems that handle keys must be reviewed by independent security professionals.',
          how: 'Commission a penetration test of wallet and signing systems and a CCSS audit by a CCSS-certified auditor. Track findings to closure.',
          check: 'Latest audit and penetration test reports with a remediation tracker.'
        },
        {
          title: '1.08 Data sanitisation',
          control: 'Devices and media that held key material must be wiped or destroyed so keys cannot be recovered.',
          how: 'Follow a documented process when retiring a device or wallet: sweep funds to zero, revoke keys, then destroy or securely wipe the media with a witness.',
          check: 'Sanitisation records with device ID, method, date and witness.'
        },
        {
          title: '1.09 Proof of reserve',
          control: 'The organisation should be able to prove it holds the assets it owes to customers.',
          how: 'Run regular proof of reserve: compare on-chain balances of company wallets against total customer balances in the ledger, ideally checked by an independent party.',
          check: 'Latest proof of reserve report and the reconciliation behind it.'
        },
        {
          title: '2.01 Security audit logs',
          control: 'Actions on key-handling systems must be logged, protected from tampering and reviewed.',
          how: 'Send logs from wallet, signing and custody systems to a SIEM. Store them in tamper-proof storage and alert on unusual actions such as new whitelist addresses or large withdrawals.',
          check: 'Log source list, retention and immutability settings, and a sample alert review.'
        }
      ]
    }
  ],
  milestones: [
    { day: 10, label: 'Scope and key creation', color: 'blue' },
    { day: 20, label: 'Key storage and usage', color: 'purple' },
    { day: 30, label: 'Audit ready', color: 'green' }
  ],
  referenceUrl: 'https://cryptoconsortium.org/standards/CCSS'
};

export default function Ccss() {
  return <LearningFrameworkPage framework={FRAMEWORK} />;
}

export { FRAMEWORK };
