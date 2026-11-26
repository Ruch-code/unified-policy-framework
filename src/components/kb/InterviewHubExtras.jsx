// Interview-focused additions to existing KB topics: SAP Access Control, awareness cycle and metrics,
// NIST CSF 2.0 vs AI RMF, and Change and Incident Management policy blueprints.
import { Link } from 'react-router-dom';
import SortableGrid from './SortableGrid.jsx';
import { NewBadge } from '../updates/UpdateBits.jsx';

const P = 'text-sm text-gray-700 dark:text-gray-300';
const H = 'mt-4 mb-1 text-base font-semibold text-gray-900 dark:text-white';
const BOX = 'rounded-2xl border border-gray-200 dark:border-gray-700 p-5 my-4';
const SUM = 'cursor-pointer text-lg font-bold text-gray-900 dark:text-white';
const TH = 'p-2 text-left font-semibold text-gray-900 dark:text-white bg-gray-50 dark:bg-gray-900';
const TD = 'p-2 align-top border-t border-gray-100 dark:border-gray-700 text-gray-700 dark:text-gray-300';
const Ul = ({ items }) => <ul className={`list-disc pl-5 space-y-1 ${P}`}>{items.map((x) => <li key={x}>{x}</li>)}</ul>;
const Ol = ({ items }) => <ol className={`list-decimal pl-5 space-y-1 ${P}`}>{items.map((x) => <li key={x}>{x}</li>)}</ol>;
const Src = ({ links }) => <p className="mt-3 text-xs text-gray-500 dark:text-gray-400">Sources: {links.map(([l, u], i) => <span key={u}>{i ? ', ' : ''}<a className="ui-link" href={u} target="_blank" rel="noreferrer">{l}</a></span>)}</p>;

function Table({ head, rows }) {
  return (
    <div className="overflow-x-auto my-2" tabIndex={0} role="region" aria-label={head.join(', ')}>
      <table className="w-full text-sm" style={{ minWidth: 600 }}>
        <thead><tr>{head.map((h) => <th key={h} scope="col" className={TH}>{h}</th>)}</tr></thead>
        <tbody>{rows.map((r) => <tr key={r[0]}>{r.map((c, j) => <td key={j} className={`${TD} ${j === 0 ? 'font-medium' : ''}`}>{c}</td>)}</tr>)}</tbody>
      </table>
    </div>
  );
}

export function SapAccessControlGuide() {
  return (
    <details className={BOX} id="sap-access-control">
      <summary className={SUM}>SAP GRC Access Control: how it works, with an end-to-end example</summary>
      <div className="mt-3">
        <p className={P}><strong>SAP GRC</strong> (governance, risk and compliance) is SAP's solution area. It includes separate products: <strong>SAP Access Control</strong> (who can do what in SAP and other connected systems, and segregation of duties, or SoD), <strong>SAP Process Control</strong> (documenting and testing internal controls) and <strong>SAP Risk Management</strong> (enterprise risk). They work together but are not interchangeable. In interviews, "SAP GRC" usually means Access Control.</p>
        <h3 className={H}>Main Access Control capabilities</h3>
        <Table head={['Capability', 'What it does', 'What you would explain']} rows={[
          ['Access Risk Analysis (ARA)', 'Checks users and roles against a rule set of sensitive actions and SoD conflicts', 'Conflicts are found before or after access is granted; each is remediated or mitigated'],
          ['Access Request Management (ARM)', 'Workflow to request, analyse, approve and provision access', 'Risk analysis runs in the request, so approvers see the conflict before approving'],
          ['Business Role Management (BRM)', 'Designs and maintains business roles that bundle technical roles', 'Cleaner roles mean fewer conflicts and easier reviews'],
          ['User Access Review (UAR)', 'Periodic certification of users\' access by managers or role owners', 'Reviewer decisions, removals and evidence of completion'],
          ['Emergency Access Management (EAM)', 'Time-bound "firefighter" access for urgent fixes, fully logged', 'Owner approval, reason, log of actions and controller review after use'],
        ]} />
        <h3 className={H}>Worked example: vendor creation and payment release</h3>
        <Ol items={[
          'A finance user requests a role that lets them create vendors. They already release payments.',
          'The request goes through ARM. Risk analysis flags an SoD conflict: one person could create a fake vendor and pay it.',
          'The approver sees the conflict. Policy decides the treatment, not the tool: remove one function, or keep it with a mitigating control if the business genuinely needs it.',
          'If kept: a named mitigation owner runs a monthly review of new vendors against payments, and the mitigation is linked to the user in the system.',
          'Security and the business owner approve. The role is provisioned and the request record closes.',
          'At the next user access review, the role and mitigation are re-certified or removed.',
        ]} />
        <h3 className={H}>Evidence an auditor would ask for</h3>
        <Ul items={['Request and approval trail', 'Risk analysis result at the time of approval', 'Mitigation assignment, owner and evidence the mitigating review was performed', 'Provisioning record', 'Firefighter usage logs with controller sign-off', 'User access review decisions and removals']} />
        <h3 className={H}>Honest answer variants for interviews</h3>
        <Ul items={[
          'Direct hands-on: "On [SAP version], I used [Access Control capabilities] to [what I personally did] for about [scale]. For example, [specific case], and the result was [verified result]."',
          'Adjacent exposure: "I have not administered Access Control myself, but I tested SAP access as an auditor: I reviewed SoD conflict reports, firefighter logs and access reviews produced from it, and followed up mitigations. The concepts transfer directly."',
          'Knowledge only: "I have not used the product, but I understand how it works: risk analysis against a rule set, request workflow with the conflict shown to approvers, mitigation for accepted conflicts, firefighter access and periodic reviews. I would ramp up on [the client\'s version] quickly."',
          'Never claim configuration, a module or a result you did not personally do.',
        ]} />
        <Src links={[['SAP Help Portal: SAP Access Control', 'https://help.sap.com/docs/SAP_ACCESS_CONTROL'], ['SAP Access Control product page', 'https://www.sap.com/products/financial-management/access-control.html']]} />
      </div>
    </details>
  );
}

export function AwarenessCycleMetrics() {
  return (
    <details className={BOX} id="awareness-cycle-metrics">
      <summary className={SUM}>Awareness programme as a cycle, metrics that mean something, and a campaign walkthrough</summary>
      <div className="mt-3">
        <h3 className={H}>The cycle</h3>
        <Ol items={['Assess risks and audiences', 'Set objectives and owners', 'Plan the year and quarters', 'Deliver onboarding and role-based training', 'Run realistic phishing simulations', 'Give immediate, supportive learning to people who clicked', 'Measure behaviour and report', 'Update the plan from trends and real incidents']} />
        <h3 className={H}>Campaign design choices</h3>
        <Ul items={[
          'Segment audiences: finance (payment fraud), executives (impersonation), support (social engineering), developers (secrets and packages), privileged users.',
          'Accessible formats: short videos, captions, screen-reader friendly pages, local languages where needed.',
          'A clear one-click reporting path, and praise for reporting even after a click.',
          'Cadence based on risk and capacity, not a fixed rule.',
          'Realistic but safe lures, approved by HR and Legal; avoid cruel lures such as fake bonuses or medical news.',
          'Privacy safeguards: report trends, not names, to wider management. Never collect real passwords.',
        ]} />
        <h3 className={H}>Metrics and what they tell management</h3>
        <SortableGrid label="Awareness and phishing metrics" headers={['Metric', 'How to calculate', 'What it tells you']} file="awareness-phishing-metrics" rows={[

          ['Coverage', 'People trained or sent simulations divided by people eligible', 'Whether the programme reaches everyone in scope'],
          ['Completion', 'Completed training divided by assigned', 'Delivery, not behaviour'],
          ['Click rate', 'Unique recipients who clicked divided by messages delivered', 'Susceptibility to that lure; compare to baseline, not to other companies'],
          ['Report rate', 'Unique recipients who reported divided by messages delivered', 'The most useful behaviour signal'],
          ['Time to report', 'Time from delivery to first report', 'How fast the security team would hear about a real attack'],
          ['Data submission rate', 'Only if safely simulated, with nothing stored', 'Severity of risky behaviour'],
          ['Repeat clickers', 'People who clicked in two or more recent campaigns', 'Where targeted coaching is needed'],
          ['Remedial completion', 'Remedial learning completed divided by assigned', 'Follow-through'],
          ['Real phish reported', 'Count of genuine malicious emails reported by staff in the period', 'Whether simulation habits carry over to real attacks'],
        ]} />
        <p className={P}><strong>Lead with report rate and time to report.</strong> A 2025 study of about 19,500 UC San Diego Health employees, presented at the IEEE Symposium on Security and Privacy, found no significant link between recently completing annual training and falling for phishing, and embedded training reduced clicks by only about 2 percent. Completion shows delivery, not behaviour. <NewBadge /></p>
        <p className={P}>No single number proves security. A falling click rate with a falling report rate may just mean people ignore email.</p>
        <h3 className={H}>Campaign walkthrough (fill in your real details)</h3>
        <Ol items={[
          'Plan: target [audience, size], theme [for example invoice fraud], dates [dates], approvals from [HR, Legal].',
          'Baseline: last campaign click rate [x] and report rate [y], labelled as example values until you have real ones.',
          'Run: send through [tool], with a landing page that teaches in 60 seconds.',
          'Follow up: remedial module for clickers within a week; thank reporters.',
          'Review: compare to baseline, share trends with leadership, adjust next quarter\'s theme.',
        ]} />
        <p className={P}>Templates: see the awareness plan and phishing tracker in this topic's template list.</p>
        <Src links={[['CISA: Teach employees to avoid phishing', 'https://www.cisa.gov/audiences/small-and-medium-businesses/secure-your-business/teach-employees-avoid-phishing'], ['UC San Diego: phishing training study (2025)', 'https://today.ucsd.edu/story/cybersecurity-training-programs-dont-prevent-employees-from-falling-for-phishing-scams']]} />
      </div>
    </details>
  );
}

export function CsfVsAiRmf() {
  return (
    <details className={BOX} id="csf-vs-ai-rmf">
      <summary className={SUM}>NIST CSF 2.0 and NIST AI RMF: explain, apply, distinguish</summary>
      <div className="mt-3">
        <h3 className={H}>The six CSF 2.0 Functions</h3>
        <Table head={['Function', 'What it is for', 'Example']} rows={[
          ['Govern', 'Sets strategy, roles, policy, risk appetite and supply chain oversight. New in 2.0.', 'Board approves risk appetite; CISO reports quarterly'],
          ['Identify', 'Understand assets, risks and improvement needs', 'Asset inventory and risk register'],
          ['Protect', 'Safeguards to manage risk', 'MFA, encryption, training'],
          ['Detect', 'Find and analyse possible attacks', 'SIEM alerts reviewed 24/7'],
          ['Respond', 'Act on a detected incident', 'Incident response plan and runbooks'],
          ['Recover', 'Restore assets and operations', 'Tested backups and DR plan'],
        ]} />
        <p className={P}>The Functions are related outcomes that run together, not a strict sequence.</p>
        <h3 className={H}>Using CSF 2.0 in a risk programme</h3>
        <Ol items={[
          'Set scope, business context, critical services, obligations and risk appetite.',
          'Write a current and target Organizational Profile using CSF outcomes. It is a gap tool, not a certification.',
          'Prioritise gaps by business impact, likelihood, tolerance, dependencies and resources.',
          'Assign owners, actions, evidence, milestones and measures. Map to ISO 27001 or SOC 2 controls you already have so work is not duplicated.',
          'Report progress and residual risk; update the profile after incidents, audits and major changes.',
        ]} />
        <h3 className={H}>CSF 2.0 vs AI RMF</h3>
        <Table head={['', 'NIST CSF 2.0', 'NIST AI RMF 1.0']} rows={[
          ['Focus', 'Organisation-wide cybersecurity risk outcomes', 'Risks and trustworthiness of AI systems across their lifecycle'],
          ['Functions', 'Govern, Identify, Protect, Detect, Respond, Recover', 'Govern, Map, Measure, Manage'],
          ['Typical risks', 'Breaches, outages, ransomware', 'Bias, unreliable outputs, lack of transparency, privacy and security of AI'],
          ['Relationship', 'Covers the systems and data around AI', 'Adds AI-specific context, impact, testing and treatment'],
        ]} />
        <p className={P}>The AI RMF is not only a cybersecurity framework and does not replace the CSF. Use both: CSF to identify and protect the systems and data behind an AI feature, AI RMF to map its intended use and affected people, measure performance and trustworthiness, and manage mitigations and monitoring.</p>
        <p className={P}><strong>Spoken summary:</strong> "CSF keeps the house secure; AI RMF checks the AI living in it behaves as intended and fairly."</p>
        <p className={P}><strong>Common confusion to avoid:</strong> describing CSF with five functions (that was 1.1; Govern was added in 2.0) or calling the AI RMF a security framework.</p>
        <Src links={[['NIST CSF 2.0 (CSWP 29)', 'https://nvlpubs.nist.gov/nistpubs/CSWP/NIST.CSWP.29.pdf'], ['NIST Cybersecurity Framework', 'https://www.nist.gov/cyberframework'], ['NIST AI RMF', 'https://www.nist.gov/itl/ai-risk-management-framework'], ['NIST AI 100-1', 'https://doi.org/10.6028/NIST.AI.100-1']]} />
      </div>
    </details>
  );
}

export function ChangeIncidentPolicyBlueprints() {
  return (
    <>
      <details className={BOX} id="change-policy-blueprint">
        <summary className={SUM}>Change Management policy: blueprint, lifecycle and spoken answer</summary>
        <div className="mt-3">
          <p className={P}>The operating detail (change types, CAB, evidence) is in <Link className="ui-link" to="/knowledge?topic=change">Change Management</Link>. This shows the policy document and how it is governed.</p>
          <h3 className={H}>Policy blueprint</h3>
          <Ul items={['Purpose, scope and definitions', 'Policy owner and approver', 'Roles and segregation of duties (author, reviewer, approver, deployer)', 'Change categories: standard, normal, major, emergency, with risk criteria', 'Intake and impact assessment', 'Approvals by category, including the Change Advisory Board (CAB) for normal and major changes and an Emergency CAB (ECAB) for emergencies', 'Testing and security review', 'Release and rollback requirements', 'Emergency change rules and retrospective approval within a set window', 'Post-implementation review for failed, emergency and major changes', 'Evidence and record retention', 'Exceptions and risk acceptance', 'Monitoring and metrics', 'Communication and training', 'Version control and review triggers']} />
          <h3 className={H}>Lifecycle applied</h3>
          <p className={P}>Draft with Engineering, IT, Security, business owners and Legal where relevant. Approve at the right authority. Publish one controlled version. Train affected teams. Configure tickets, repositories and CI/CD to enforce it. Test that evidence is produced. Review at the organisation's chosen interval (annual is common, not a universal law) and sooner after incidents, audit findings or major changes.</p>
          <h3 className={H}>Spoken answer (about 60 seconds)</h3>
          <p className={P}>"A change is requested and classified. Standard changes are pre-approved; normal and major changes get an impact and risk assessment and approval at the right level. It is built and tested, then release is authorised and deployed with a rollback plan. We validate it worked, close it with evidence, and review failed changes to improve. Emergency changes can go first with a named approver, but must be reviewed and documented afterwards."</p>
          <p className={P}><strong>Small-team scenario:</strong> if the same engineer can merge and deploy, a compensating control such as required peer review plus a weekly review of all production deployments by a lead may be accepted. Auditors judge this case by case.</p>
        </div>
      </details>
      <details className={BOX} id="incident-policy-blueprint">
        <summary className={SUM}>Incident Management policy and end-to-end workflow (NIST SP 800-61r3)</summary>
        <div className="mt-3">
          <p className={P}>Separate two things: the ongoing preparation and governance the organisation maintains, and the response to a specific incident. Deep practice is in <Link className="ui-link" to="/knowledge?topic=tabletop">Tabletop Exercise</Link> and the Security Operations playbook on the home page.</p>
          <h3 className={H}>Policy blueprint</h3>
          <Ul items={['Purpose, scope and definitions of event, incident and breach (a breach is an incident that affects personal or regulated data and may trigger notification)', 'Categories and severity levels with response targets', 'Reporting channels for staff, customers and vendors', 'Roles, authority, escalation and backups (incident commander, technical lead, communications, legal and privacy)', 'Evidence and incident record handling', 'Containment and recovery decision rights', 'Legal, privacy and contract notification assessment', 'Internal and external communications, including out-of-band channels', 'Vendor, insurer and external support escalation', 'Record retention and exceptions', 'Annual testing through a tabletop or live exercise', 'Post-incident review and corrective action tracking', 'Owner, approver, version, effective date, training and review triggers']} />
          <h3 className={H}>Workflow</h3>
          <Ol items={[
            'Prepare and govern: approved plan, severity definitions, named commander and backups, contacts, tools, templates, exercises.',
            'Detect and report: record time and source; preserve logs.',
            'Triage and declare: confirm it is an incident, set severity and impact, assign roles, open a restricted record, set update cadence.',
            'Contain: proportionate steps such as isolating a device or revoking credentials; record approvals; preserve evidence.',
            'Analyse and eradicate: scope, cause, persistence; remove the cause; rotate credentials; involve vendors or specialists.',
            'Recover and communicate: restore from trusted sources, validate, monitor, give approved updates.',
            'Assess notification duties: legal or privacy owner decides, based on jurisdiction, contracts and current rules. Deadlines differ by law and trigger; for example India\'s DPDP Rules are covered on the DPDPA page. Record the decision.',
            'Close and improve: blameless review, root cause, actions with owners and dates, update risks, runbooks and training.',
          ]} />
          <h3 className={H}>Scenario: phishing leads to account takeover</h3>
          <p className={P}>A user reports a phishing email after entering credentials. The SOC confirms a sign-in from an unusual location and declares a medium-severity incident. Containment: reset the password, revoke sessions and tokens, check mailbox rules. Analysis: what the account accessed and whether data was taken. Recovery: restore any changed settings and monitor. Legal and privacy assess whether personal data was exposed and whether notification applies. Lessons: phishing-resistant MFA for that group.</p>
          <h3 className={H}>Evidence an auditor would request</h3>
          <Ul items={['Approved policy and plan', 'Incident register', 'Sample incident records with timeline and approvals', 'Notification decision records', 'Post-incident reviews and corrective action status', 'Tabletop exercise reports']} />
          <Src links={[['NIST SP 800-61 Rev. 3', 'https://csrc.nist.gov/pubs/sp/800/61/r3/final']]} />
        </div>
      </details>
    </>
  );
}
