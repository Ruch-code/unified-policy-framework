// HIPAA enforcement case studies: what went wrong, corrective controls, and who enforces (HHS OCR).
const P = 'text-sm leading-relaxed text-gray-700 dark:text-gray-300';
const H = 'mt-4 mb-1 text-base font-semibold text-gray-900 dark:text-white';
const TH = 'p-2 text-left font-semibold text-gray-900 dark:text-white bg-gray-50 dark:bg-gray-900';
const TD = 'p-2 align-top border-t border-gray-100 dark:border-gray-700 text-gray-700 dark:text-gray-300';

export default function HipaaEnforcementCases() {
  return (
    <details id="hipaa-enforcement-cases" className="max-w-6xl mx-auto my-6 rounded-2xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 p-5 scroll-mt-24">
      <summary className="cursor-pointer text-lg font-bold text-gray-900 dark:text-white">HIPAA enforcement case: Lehigh Valley Health Network ransomware settlement</summary>
      <div className="mt-3">
        <h3 className={H}>Who is HHS, and who enforces HIPAA?</h3>
        <p className={P}>The U.S. Department of Health and Human Services (HHS) is the federal department responsible for health. Within it, the <strong>Office for Civil Rights (OCR)</strong> enforces the HIPAA Privacy, Security and Breach Notification Rules. OCR investigates complaints and breach reports, and can resolve cases through a settlement (a payment plus a corrective action plan it monitors) or impose civil money penalties. State attorneys general can also bring HIPAA actions.</p>

        <h3 className={H}>What happened</h3>
        <ul className={`list-disc pl-5 space-y-1 ${P}`}>
          <li>On 4 February 2023, Lehigh Valley Health Network (LVHN), a Pennsylvania health system, found suspicious activity that turned out to be ransomware.</li>
          <li>Protected health information of <strong>248,359</strong> people was taken and posted on the dark web. Widely reported details include images of cancer patients.</li>
          <li>LVHN filed its breach report with HHS on 15 May 2023.</li>
          <li>On 29 October 2026, HHS OCR announced that LVHN agreed to pay <strong>$800,000</strong> and to a corrective action plan monitored by OCR for <strong>three years</strong>.</li>
          <li>Separately, LVHN agreed in 2024 to a reported $65 million class action settlement with affected patients.</li>
        </ul>

        <h3 className={H}>What went wrong (OCR's findings of potential violations)</h3>
        <div className="overflow-x-auto my-2" tabIndex={0} role="region" aria-label="LVHN findings">
          <table className="w-full text-sm" style={{ minWidth: 640 }}>
            <thead><tr><th scope="col" className={TH}>Finding</th><th scope="col" className={TH}>HIPAA rule</th><th scope="col" className={TH}>Why it matters</th></tr></thead>
            <tbody>
              {[
                ['Risk analysis of ePHI was not accurate or thorough', 'Security Rule, 45 CFR 164.308(a)(1)(ii)(A)', 'Without knowing where ePHI is and what threatens it, controls are aimed at the wrong things.'],
                ['No procedures to regularly review information system activity', 'Security Rule, 45 CFR 164.308(a)(1)(ii)(D)', 'Attackers can move and take data without anyone noticing in the logs.'],
                ['Impermissible disclosure of PHI of 248,359 people', 'Privacy Rule', 'The outcome of the control failures: data reached people with no right to it.'],
                ['Individuals not notified on time', 'Breach Notification Rule, 45 CFR 164.404', 'Notice is due without unreasonable delay and no later than 60 days after discovery.'],
                ['HHS Secretary not notified on time', 'Breach Notification Rule, 45 CFR 164.408', 'Breaches of 500 or more people must be reported to HHS within the same 60-day limit.'],
              ].map((r) => <tr key={r[0]}>{r.map((c, j) => <td key={j} className={`${TD} ${j === 0 ? 'font-medium' : ''}`}>{c}</td>)}</tr>)}
            </tbody>
          </table>
        </div>

        <h3 className={H}>Corrective action plan required by OCR (3 years)</h3>
        <ul className={`list-disc pl-5 space-y-1 ${P}`}>
          <li>Carry out an accurate and thorough risk analysis of risks to ePHI.</li>
          <li>Develop and implement a risk management plan for the risks found.</li>
          <li>Review and revise Privacy, Security and Breach Notification policies and procedures.</li>
          <li>Review and update HIPAA training for the workforce.</li>
        </ul>

        <h3 className={H}>Controls that would have reduced the risk (our analysis)</h3>
        <ul className={`list-disc pl-5 space-y-1 ${P}`}>
          <li><strong>Enterprise-wide risk analysis</strong> covering every system holding ePHI, including imaging and clinical photo stores, refreshed at least yearly and after major changes.</li>
          <li><strong>Log review and detection:</strong> central logging, SIEM alerts for unusual access and large data transfers, and documented review of system activity.</li>
          <li><strong>Ransomware resilience:</strong> MFA on remote and privileged access, network segmentation, EDR on endpoints and servers, and offline or immutable backups with tested restores.</li>
          <li><strong>Data minimisation and encryption</strong> for especially sensitive records such as clinical images.</li>
          <li><strong>Breach notification runbook</strong> with the 60-day clock, decision owners and templates, rehearsed in a tabletop exercise.</li>
          <li><strong>Training</strong> on phishing and incident reporting, tracked to completion.</li>
        </ul>

        <h3 className={H}>Audit and interview takeaway</h3>
        <p className={P}>Most OCR ransomware settlements cite the same root failure: no accurate, enterprise-wide risk analysis. If asked what you would check first in a HIPAA programme, start there, then system activity review and breach notification timing.</p>
        <p className="mt-3 text-xs text-gray-500 dark:text-gray-400">Sources: <a className="ui-link" href="https://www.hhs.gov/press-room/hhs-ocr-settles-ransomware-investigation-lehigh-valley-health-network.html" target="_blank" rel="noreferrer">HHS OCR press release</a>; <a className="ui-link" href="https://www.hhs.gov/sites/default/files/ocr-ra-cap-lvhn.pdf" target="_blank" rel="noreferrer">Resolution agreement and corrective action plan</a>. CFR citations are standard references for each rule; check the resolution agreement for the exact provisions cited.</p>
      </div>
    </details>
  );
}
