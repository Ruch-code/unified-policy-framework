import { sectionCls, h3Cls, leadCls } from './riskUtils.jsx';

// Ten common risk types with drivers, owners, typical controls and the ISO 27001:2022 / SOC 2 controls that usually answer them.
const TH = 'p-2 text-left font-semibold text-navy-900 dark:text-text-dark-primary bg-surface-50 dark:bg-slate-800 align-top';
const TD = 'p-2 align-top border-t border-surface-200 dark:border-surface-dark-200 text-navy-700 dark:text-text-dark-secondary';
const P = 'text-sm text-navy-700 dark:text-text-dark-secondary';

const TYPES = [
  ['Strategic', 'Threats to the strategy and business objectives', 'Market shifts, disruption, poor decisions', 'Board, CEO, Strategy', 'ERM, scenario planning, periodic review', 'Clauses 4.1 and 6.1 (context, risks and opportunities)', 'CC3.1 (objectives), CC3.4 (significant change)', 'A new product line in a regulated market is launched without updating the ISMS scope.'],
  ['Operational', 'Failures in people, processes, systems or external events', 'Errors, outages, control failures', 'COO, Operations, Risk', 'RCSA, key risk indicators, business continuity', 'A.5.30 ICT readiness for continuity, A.8.13 backup', 'A1.2 (recovery infrastructure), CC7.4 (incident response)', 'Nightly backups fail for two weeks and nobody is alerted.'],
  ['Financial', 'Exposure to market, credit, liquidity and cash flow effects', 'Rates, FX, defaults, funding', 'CFO, Treasury, Finance', 'Limits, hedging, stress tests', 'Mostly outside the ISMS; covered by SOX / ICFR controls', 'Not a SOC 2 focus; SOC 1 covers financial reporting', 'A payment run is released without a second approver.'],
  ['Legal and compliance', 'Exposure from laws, regulations, contracts or misconduct', 'Rule changes, breaches, control gaps', 'Legal, Compliance, Risk', 'Policies, training, monitoring', 'A.5.31 legal and contractual requirements, A.5.36 policy compliance', 'CC1.1 (integrity and ethics), CC2.3 (external communication)', 'A new privacy law applies but the obligations register is not updated.'],
  ['Cybersecurity', 'Threats to systems, data and digital services', 'Attacks, vulnerabilities, access failures', 'CISO, IT, Risk', 'Security framework, IAM, SOC monitoring', 'A.5.15 access control, A.8.8 technical vulnerabilities, A.8.16 monitoring', 'CC6.1 (logical access), CC7.1 (vulnerability detection)', 'A critical patch on an internet-facing server is 60 days overdue.'],
  ['AI and model', 'Exposure from unreliable, biased, insecure or misused models', 'Bad data, drift, misuse, lack of transparency', 'AI governance, Model risk, IT', 'AI risk framework, testing, monitoring', 'A.8.25 secure development, A.8.32 change management (ISO 42001 for full AI coverage)', 'CC8.1 (change management), PI1 if processing integrity is in scope', 'A model is retrained on new data and released without validation.'],
  ['Third party and supply chain', 'Exposure from vendors, suppliers and outsourced services', 'Concentration, disruption, vendor failure', 'Procurement, SCM, TPRM', 'Due diligence, SLAs, dependency mapping', 'A.5.19 to A.5.22 supplier security, A.5.23 cloud services', 'CC9.2 (vendor and partner risk)', 'A critical SaaS vendor\'s SOC 2 report expired and was not reviewed.'],
  ['Reputation', 'Damage to stakeholder trust and confidence', 'Incidents, misconduct, misinformation', 'Board, Communications, Risk', 'Media monitoring, response plans', 'A.5.24 to A.5.26 incident management', 'CC7.4 (incident response), CC2.3 (external communication)', 'A breach becomes public before customers are notified.'],
  ['Workforce and safety', 'Exposure from workforce capacity, conduct and safety', 'Skills gaps, turnover, unsafe work', 'HR, HSE, Leaders', 'Workforce plans, safety controls', 'A.6.1 screening, A.6.3 awareness training, A.6.5 leaving employment', 'CC1.4 (competence), CC1.5 (accountability)', 'A key engineer leaves and only they know how to restore production.'],
  ['Climate and sustainability', 'Exposure from physical, transition and sustainability factors', 'Extreme weather, policy, resource shifts', 'Board, Finance, Sustainability', 'Scenarios, adaptation, reporting', 'A.7.5 physical and environmental threats; Clause 4.1 climate amendment (2024)', 'A1.2 (environmental protections)', 'The primary data centre region floods and failover has never been tested.'],
];

export default function RiskTypes() {
  return (
    <section id="ra-types" className={sectionCls}>
      <h3 className={h3Cls}>Types of risk</h3>
      <p className={leadCls}>Ten common risk categories, who usually owns them, the typical controls, and where they show up in ISO 27001:2022 and SOC 2. Use them as headings when you build the risk register so nothing important is missed.</p>
      <div className="overflow-x-auto" tabIndex={0} role="region" aria-label="Types of risk">
        <table className="w-full text-sm min-w-[1300px]">
          <thead><tr>{['#', 'Risk type', 'Definition', 'Typical drivers', 'Primary owners', 'Typical controls', 'ISO 27001:2022', 'SOC 2', 'Example'].map((h) => <th key={h} scope="col" className={TH}>{h}</th>)}</tr></thead>
          <tbody>{TYPES.map((r, i) => (
            <tr key={r[0]}>
              <td className={TD}>{i + 1}</td>
              {r.map((c, j) => <td key={j} className={`${TD} ${j === 0 ? 'font-medium whitespace-nowrap' : ''}`}>{c}</td>)}
            </tr>
          ))}</tbody>
        </table>
      </div>

      <h4 className="mt-6 mb-2 font-semibold text-navy-900 dark:text-text-dark-primary">Worked example: third party risk mapped to ISO 27001 A.5.22 and SOC 2 CC9.2</h4>
      <div className="overflow-x-auto" tabIndex={0} role="region" aria-label="Worked risk example">
        <table className="w-full text-sm min-w-[700px]">
          <tbody>{[
            ['Risk', 'Our payment processor\'s SOC 2 Type II report expired 5 months ago and has not been reviewed. A control failure at the vendor could expose customer card data.'],
            ['Risk type', 'Third party and supply chain (also cybersecurity and reputation)'],
            ['Owner', 'Head of Vendor Management, with the CISO as approver'],
            ['Inherent score', 'Likelihood 3 x Impact 5 = 15 (High)'],
            ['Existing controls', 'Vendor inventory, signed DPA, annual review policy'],
            ['Gap', 'The annual review did not run, so the expired report was missed'],
            ['Treatment', 'Mitigate: request the current report and bridge letter, review complementary user entity controls (CUECs), add an expiry alert to the vendor tracker'],
            ['Residual score', 'Likelihood 1 x Impact 5 = 5 (Medium), within appetite with owner sign-off'],
            ['ISO 27001 controls', 'A.5.19 supplier relationships, A.5.20 security in supplier agreements, A.5.22 monitoring and review of supplier services'],
            ['SOC 2 criteria', 'CC9.2 vendor and partner risk management, CC3.2 risk identification'],
            ['Evidence an auditor will ask for', 'Vendor register entry, the reviewed SOC 2 report with reviewer sign-off, CUEC mapping, and the tracker showing the expiry alert'],
          ].map(([k, v]) => (
            <tr key={k}><th scope="row" className={`${TH} w-48`}>{k}</th><td className={TD}>{v}</td></tr>
          ))}</tbody>
        </table>
      </div>
      <p className={`mt-3 ${P}`}>Scores use the 5 x 5 likelihood and impact scale in the scoring section below. Adjust the owners to your organisation chart.</p>
    </section>
  );
}
