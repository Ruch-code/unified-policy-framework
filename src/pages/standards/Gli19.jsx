import LearningFrameworkPage from "../../components/LearningFrameworkPage.jsx";

// GLI-19 Standards for Interactive Gaming Systems, Gaming Laboratories International (GLI). v3.0 released 17 July 2020.
// Section numbers follow v3.0. A v4.0 draft was published for public comment in July 2026; check which version your regulator adopts.
const FRAMEWORK = {
  id: 'gli19',
  name: 'GLI-19 (Standards for Interactive Gaming Systems)',
  shortName: 'GLI-19',
  region: 'Global',
  flag: '',
  basePath: '/gli-19',
  color: 'beige',
  weeks: [
    {
      week: 1,
      title: 'Foundation: Scope, platform and player accounts',
      days: 'Days 1-10',
      description: 'Understand how GLI-19 is used, scope the interactive gaming system and secure the platform and player account controls.',
      tasks: [
        {
          title: 'Ch 1 Understand GLI-19 and how it is used',
          control: 'GLI-19 is a technical standard from Gaming Laboratories International for online (interactive) gaming systems: casino, poker, sports-adjacent games and related platforms. Regulators adopt it in full or in part, and an accredited test lab tests the system against it before and after launch.',
          how: 'Confirm which jurisdictions you operate in, which version of GLI-19 each regulator requires, and any local rules that add to or override it. List every in-scope component: gaming platform, player account system, RNG, games, payment, geolocation and third-party providers.',
          check: 'Jurisdiction and version matrix plus a system component inventory approved by compliance and engineering.'
        },
        {
          title: '2.2 to 2.4 System clock, control programs and gaming management',
          control: 'The platform keeps an accurate synchronised clock, can verify that its critical software has not been altered, and gives authorised staff controls to manage games and players.',
          how: 'Sync all servers to a trusted time source. Use hashing or signatures to verify critical control programs, and run the check on demand and on a schedule. Restrict gaming management functions to approved roles.',
          check: 'NTP configuration, software verification report, and role list for gaming management functions.'
        },
        {
          title: '2.5 Player account management',
          control: 'Player registration, identity and age verification, account security, deposits, withdrawals, limits and self-exclusion are controlled and recorded.',
          how: 'Verify identity and age before play, enforce strong authentication, lock accounts after failed logins, support responsible gaming limits and self-exclusion, and keep a full transaction history per player.',
          check: 'KYC and age verification procedure, sample player account audit trail, and evidence that self-exclusion blocks play.'
        },
        {
          title: '2.6 and 2.7 Player software and location requirements',
          control: 'Software installed or used by players is controlled, and play is only allowed from permitted locations.',
          how: 'Sign and version player apps. Use geolocation checks at login and during play where required, and block disallowed locations and VPN or proxy attempts.',
          check: 'Geolocation configuration and test results showing blocked locations.'
        },
        {
          title: '2.8 and 2.9 Information to be maintained and reporting',
          control: 'Required records about games, players and transactions are kept and the system can produce the reports regulators ask for.',
          how: 'Define retention for game play, financial and account records per jurisdiction. Build and test the required reports.',
          check: 'Retention schedule and sample regulatory reports.'
        }
      ]
    },
    {
      week: 2,
      title: 'Games: RNG, fairness and game behaviour',
      days: 'Days 11-20',
      description: 'Make sure outcomes are random and fair and games behave as advertised.',
      tasks: [
        {
          title: 'Ch 3 Random number generator',
          control: 'The RNG produces unpredictable, statistically independent results and is monitored for failure.',
          how: 'Use a lab-certified RNG, protect its seeding, scale outcomes without bias, and monitor it in production so a failure stops play.',
          check: 'Lab RNG certificate, RNG design document and monitoring alerts.'
        },
        {
          title: '4.2 to 4.7 Player interface, sessions, rules, fairness and payout',
          control: 'Players see accurate rules, balances and results; outcomes come from the RNG; and payout percentages and odds meet the regulator\'s minimums.',
          how: 'Show game rules and pay tables in the game. Keep session balance and history accurate. Document theoretical return to player (RTP) per game and compare actual results.',
          check: 'Game rules screens, RTP calculations and lab certificate for each game.'
        },
        {
          title: '4.8 to 4.18 Special game types and events',
          control: 'Bonuses, skill games, peer-to-peer games, jackpots, game recall, disabling, interrupted games, virtual events and live games each follow specific rules.',
          how: 'For each game type you offer, check the relevant section: for example, collusion controls for peer-to-peer poker, contribution and reset rules for jackpots, and how an interrupted game is resolved.',
          check: 'Game type to section mapping with evidence for each game type offered.'
        }
      ]
    },
    {
      week: 3,
      title: 'Operational and security audit (Appendices A to C)',
      days: 'Days 21-30',
      description: 'Prepare for the operational and technical security audit and cover service providers.',
      tasks: [
        {
          title: 'Appendix A Operational procedures and monitoring',
          control: 'Internal control procedures cover player accounts, general operations, game rules and content, gaming procedures, peer-to-peer sessions and monitoring.',
          how: 'Write procedures for each area, assign owners, and set up monitoring for fraud, collusion, money laundering and responsible gaming triggers.',
          check: 'Approved internal control procedures and sample monitoring alerts with outcomes.'
        },
        {
          title: 'Appendix B System operation, data integrity and communications',
          control: 'The system runs securely, data cannot be altered without detection, and communications are encrypted and authenticated.',
          how: 'Harden servers, protect databases with integrity checks and backups, and encrypt traffic between players, platform and providers.',
          check: 'Hardening standard, backup and restore test, and encryption configuration.'
        },
        {
          title: 'Appendix B Technical controls, remote access, firewalls and change management',
          control: 'Logical access, remote access and network boundaries are controlled, and changes to certified components follow an approved process.',
          how: 'Use MFA and least privilege, log administrator activity, restrict remote access, review firewall rules, and send changes to certified software through change control and, where required, lab and regulator approval.',
          check: 'Access review, firewall rule review, and change tickets showing approval before release.'
        },
        {
          title: 'Appendix B Technical security testing',
          control: 'The system is regularly tested by qualified independent testers, including vulnerability scanning and penetration testing.',
          how: 'Schedule external and internal penetration tests and vulnerability scans at the frequency your regulator requires. Track findings to closure.',
          check: 'Latest test reports and remediation tracker.'
        },
        {
          title: 'Appendix B and C Third-party service providers',
          control: 'Providers of information security, cloud, payment, location and live game services are assessed and controlled.',
          how: 'Inventory providers, check their certifications and contracts, and include them in your audit scope or obtain their own audit evidence.',
          check: 'Provider register with due diligence and contract evidence.'
        }
      ]
    }
  ],
  milestones: [
    { day: 10, label: 'Platform and player accounts', color: 'blue' },
    { day: 20, label: 'Games and RNG', color: 'purple' },
    { day: 30, label: 'Operational and security audit ready', color: 'green' }
  ],
  referenceUrl: 'https://gaminglabs.com/wp-content/uploads/2024/06/GLI-19-Interactive-Gaming-Systems-v3.0.pdf'
};

export default function Gli19() {
  return <LearningFrameworkPage framework={FRAMEWORK} />;
}

export { FRAMEWORK };
