import { Link } from 'react-router-dom';
import FlowDiagram from '../crypto/FlowDiagram.jsx';
import { ModuleTable } from './ToolkitModule.jsx';

// Knowledge Base topic: how audit results are classified, by audit type.
const CARD = 'bg-white border border-gray-200 rounded-2xl p-5 mb-4 dark:bg-gray-800 dark:border-gray-700';
const P = 'text-sm text-gray-700 dark:text-gray-300';
const H3 = 'font-semibold text-gray-900 dark:text-white mb-2';

const ISO = [
  ['Major nonconformity', 'A requirement is not met at all, or the failure puts the management system\'s ability to achieve its intended results in doubt. Also several minor nonconformities on the same requirement that together show a system failure.', 'No internal audits done in the cycle; no management review; risk assessment never performed', 'Must be corrected and verified before a certificate is issued or kept. Usually needs evidence or a follow-up visit.'],
  ['Minor nonconformity', 'A requirement is not fully met, but it is an isolated lapse that does not undermine the system.', '2 of 25 leavers kept access a few days too long; one policy past its review date', 'Accepted corrective action plan, then checked at the next audit.'],
  ['Opportunity for improvement (OFI)', 'The requirement is met, but the auditor sees a way to do it better or a risk of future nonconformity.', 'Access reviews are done but tracked in email rather than a register', 'Optional. Record the decision either way.'],
  ['Observation or area of concern', 'Something to watch. In a Stage 1 audit, an area of concern can become a nonconformity at Stage 2 if not fixed.', 'Statement of Applicability excludes controls the scope seems to need', 'Fix before the next stage or audit.'],
  ['Positive finding (good practice)', 'Something done well, worth recognising.', 'Automated joiner, mover and leaver process with no exceptions', 'None. Share it as an example.'],
];

const SOC2 = [
  ['Exception (deviation)', 'A tested sample did not meet the control as described.', '1 of 25 changes deployed without approval', 'Listed in Section 4 of the report with management\'s response.'],
  ['Unqualified opinion', 'Controls were suitably designed (and, for Type II, operated effectively) in all material respects.', 'A few exceptions that do not stop the criteria being met', 'Clean report.'],
  ['Qualified opinion', 'One or more criteria were not met because of design or operating failures, but the rest of the report can be relied on.', 'Change management failed across the period', 'Report notes which criteria were not met.'],
  ['Adverse opinion', 'Failures are so widespread that the system as a whole cannot be relied on.', 'Many criteria failed', 'Rare. Usually needs major remediation before the next period.'],
  ['Disclaimer of opinion', 'The auditor could not get enough evidence to form an opinion.', 'Key evidence missing or scope restricted', 'No assurance given.'],
];

const SOX = [
  ['Control deficiency', 'A control does not allow staff to prevent or detect misstatements on time.', 'One missed monthly reconciliation review'],
  ['Significant deficiency', 'Less severe than a material weakness but important enough to bring to the audit committee.', 'Repeated gaps in IT access controls over a financial system'],
  ['Material weakness', 'A reasonable possibility that a material misstatement will not be prevented or detected on time.', 'No effective review of journal entries; pervasive ITGC failure'],
];

const IA = [
  ['High (critical)', 'Exposes the organisation to significant loss, regulatory breach or fraud. Fix urgently.', '30 days or less'],
  ['Medium', 'Weakens a key control; could lead to loss if not fixed.', '60 to 90 days'],
  ['Low', 'Minor weakness or efficiency gain; limited risk.', '90 to 180 days'],
  ['Advisory', 'Improvement suggestion with no current control gap.', 'At management\'s discretion'],
];

export default function FindingClassification() {
  return (
    <div>
      <div className={CARD}>
        <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-2">Classifying audit results: nonconformity, finding, exception and more</h2>
        <p className={P}>Every audit type has its own words for what went wrong. The labels differ, but the logic is the same: is there a requirement, is it met, and how serious is the gap? Use the decision path first, then the table for the audit you are in.</p>
        <FlowDiagram title="Decision path" steps={[
          { label: 'Is there a requirement?', note: 'Standard, policy, law or contract' },
          { label: 'Is it met?', note: 'Yes: no finding, or a positive finding' },
          { label: 'Not met: how widespread?', note: 'One lapse or a pattern' },
          { label: 'Does it break the system?', note: 'Yes: major. No: minor', tone: 'risk' },
          { label: 'Met, but could be better', note: 'OFI or observation', tone: 'safe' },
        ]} caption="If there is no requirement behind it, it cannot be a nonconformity. At most it is an observation or an improvement suggestion." />
      </div>

      <details className={CARD} open>
        <summary className="cursor-pointer font-semibold text-gray-900 dark:text-white">ISO management system audits (ISO 27001, 27701, 42001, 22301)</summary>
        <div className="mt-3"><ModuleTable head={['Category', 'What it means', 'Example', 'What happens next']} rows={ISO} min={760} /></div>
        <p className={P}>Exact wording and closure periods are set by each certification body, often around 90 days for majors. See the <Link className="ui-link" to="/iso/27001/li#audit-journey">audit journey</Link> for how findings play out in Stage 1 and Stage 2.</p>
      </details>

      <details className={CARD}>
        <summary className="cursor-pointer font-semibold text-gray-900 dark:text-white">SOC 2 examinations</summary>
        <div className="mt-3"><ModuleTable head={['Category', 'What it means', 'Example', 'Effect on the report']} rows={SOC2} min={760} /></div>
        <p className={P}>SOC 2 does not use "nonconformity". Individual failures are exceptions; the overall result is the auditor's opinion.</p>
      </details>

      <details className={CARD}>
        <summary className="cursor-pointer font-semibold text-gray-900 dark:text-white">SOX 404 (internal control over financial reporting)</summary>
        <div className="mt-3"><ModuleTable head={['Category', 'What it means', 'Example']} rows={SOX} /></div>
        <p className={P}>A material weakness must be disclosed and means management cannot conclude that internal control is effective. More detail is on the <Link className="ui-link" to="/sox">SOX 404 page</Link>.</p>
      </details>

      <details className={CARD}>
        <summary className="cursor-pointer font-semibold text-gray-900 dark:text-white">Internal audit risk ratings</summary>
        <div className="mt-3"><ModuleTable head={['Rating', 'Meaning', 'Typical fix timeline']} rows={IA} /></div>
        <p className={P}>Internal audit teams set their own scale in the audit charter or methodology. These timelines are common examples, not a standard.</p>
      </details>

      <div className={CARD}>
        <h3 className={H3}>How to decide the severity</h3>
        <ul className={`list-disc pl-5 space-y-1 ${P}`}>
          <li>How many: one sample out of 25 is usually minor; several, or the same failure in several places, points to major.</li>
          <li>How important: a failure in a key control (access to production, change approval, backups) weighs more than an admin gap.</li>
          <li>Is there a compensating control that reduced the risk?</li>
          <li>Is it repeated from the last audit? A repeat minor can become a major.</li>
          <li>Could it lead to real harm: data loss, financial misstatement, regulatory breach?</li>
        </ul>
        <h3 className={`${H3} mt-4`}>Common mistakes</h3>
        <ul className={`list-disc pl-5 space-y-1 ${P}`}>
          <li>Raising a nonconformity with no requirement behind it.</li>
          <li>Calling a pattern of failures "minor" to avoid conflict.</li>
          <li>Writing the finding before agreeing the facts with the control owner.</li>
        </ul>
        <p className={`mt-3 ${P}`}>How to write a finding (condition, criteria, cause, effect, recommendation) is in the <Link className="ui-link" to="/knowledge?topic=it-audit">IT Audit Toolkit</Link>.</p>
      </div>
      <p className="text-xs text-gray-500 dark:text-gray-400">Source: ISO/IEC 17021-1 and certification body practice; AICPA attestation standards (SOC 2); PCAOB AS 2201 (SOX). Last verified: 17 Nov 2026. Guidance only.</p>
    </div>
  );
}
