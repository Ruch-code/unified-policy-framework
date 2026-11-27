import { Link } from 'react-router-dom';
import ToolkitModule, { ModuleTable } from './ToolkitModule.jsx';
import SortableGrid from '../kb/SortableGrid.jsx';

// Infrastructure management consulting: assess, optimise, migrate, secure, report and support.
const P = 'text-sm text-gray-700 dark:text-gray-300';
const H3 = 'mt-4 mb-1 font-semibold text-gray-900 dark:text-white';
const Ul = ({ items }) => <ul className={`list-disc pl-5 space-y-1 ${P}`}>{items.map((x) => <li key={x}>{x}</li>)}</ul>;

const WORKSTREAMS = [
  ['1. Performance assessment', 'SolarWinds, Nagios, Zabbix, PRTG', 'Baseline CPU, memory, disk, network and application response; find bottlenecks and single points of failure', 'Assessment report with findings ranked by business impact', 'ISO 27001 A.8.6 capacity, A.8.16 monitoring; SOC 2 A1.1, CC7.2'],
  ['2. Virtualisation optimisation', 'VMware vSphere, Microsoft Hyper-V', 'Right-size VMs, consolidate hosts, set HA and load balancing, remove idle and orphaned VMs, plan capacity growth', 'Optimisation plan with savings and risk per change', 'A.8.6, A.8.14 redundancy, A.8.9 configuration'],
  ['3. Cloud migration', 'AWS, Azure (migration and landing zone tooling)', 'Discover workloads and dependencies, pick a strategy per workload, design the landing zone, migrate in waves, validate and cut over', 'Migration plan, wave schedule, runbooks, rollback plans', 'A.5.23 cloud services, A.8.32 change, A.5.30 ICT continuity; SOC 2 CC8.1'],
  ['4. Network security posture', 'Cisco, Fortinet firewalls and network devices', 'Review segmentation, firewall rules, VPN and remote access, device hardening, firmware and logging', 'Security posture report with prioritised fixes', 'A.8.20 to A.8.22 network security, A.8.9; SOC 2 CC6.6; PCI DSS Req 1'],
  ['5. Documentation and reporting', 'Microsoft Office (Word, Excel, PowerPoint, Visio)', 'Write architecture, current and target state, runbooks, status reports and executive summaries', 'Reports, decks, diagrams, RAID log', 'A.5.37 documented operating procedures'],
  ['6. Operations support', 'ServiceNow with ITIL 4 practices', 'Work incidents, problems and changes through the service desk; find root causes and prevent repeats', 'Tickets, problem records, known errors, change records', 'A.5.24 to A.5.27, A.8.32; SOC 2 CC7.3 to CC7.5, CC8.1'],
];

export default function InfraConsultingTopic() {
  const m = {
    title: 'Infrastructure Management Consulting',
    what: 'Helping clients get more from their IT environment: assess performance, optimise virtualised and cloud resources, migrate workloads, strengthen network security, report clearly and support operations, all tied back to business goals.',
    when: 'At the start of an engagement (assessment), before major changes (optimisation or migration), after incidents, and as an annual health check.',
    tags: ['Infrastructure', 'Cloud migration', 'Virtualisation', 'ITIL', 'Monitoring'],
    intro: (
      <>
        <h3 className={H3}>Engagement lifecycle</h3>
        <ModuleTable head={['Phase', 'What happens', 'Output']} rows={[
          ['Discover', 'Stakeholder interviews, business goals, scope, current inventory and diagrams', 'Scope and success measures'],
          ['Assess', 'Monitoring data, configuration reviews, capacity and security posture', 'Findings ranked by business impact'],
          ['Recommend', 'Options with cost, risk and effort; a roadmap', 'Solution recommendations and business case'],
          ['Implement', 'Changes delivered through change management in planned waves', 'Change records, test results, cut-over evidence'],
          ['Handover', 'Runbooks, training, monitoring thresholds and support model', 'Operational documentation and sign-off'],
        ]} />

        <h3 className={H3}>Six workstreams, tools and controls</h3>
        <SortableGrid label="Infrastructure consulting workstreams" headers={['Workstream', 'Example tools', 'What you do', 'Deliverable', 'Control link']} rows={WORKSTREAMS} file="infra-consulting-workstreams" min={1100} />
        <p className="text-xs text-gray-500 dark:text-slate-400">Tool names are examples of what clients commonly use, not endorsements.</p>

        <h3 className={H3}>Performance assessment with monitoring tools</h3>
        <Ul items={[
          'Collect at least two to four weeks of data so peaks such as month-end are captured.',
          'Watch sustained CPU and memory pressure, disk latency and queue depth, network errors and saturation, and application response time.',
          'Set alert thresholds from the baseline, not defaults, and make sure every alert has an owner.',
          'Check monitoring coverage against the asset inventory: unmonitored systems are a finding on their own.',
        ]} />

        <h3 className={H3}>Virtualisation optimisation</h3>
        <Ul items={[
          'Right-size: reduce VMs with consistently low use; add resources where demand is constantly high.',
          'Watch over-commitment of CPU and memory and its effect on performance (for example CPU ready time in VMware).',
          'Use HA and resource balancing (for example vSphere HA and DRS, or Hyper-V failover clustering) for critical workloads.',
          'Remove old snapshots, idle and orphaned VMs, and unsupported host and guest versions.',
          'Licensing changes can drive platform decisions, so include cost and support dates in the plan.',
        ]} />

        <h3 className={H3}>Cloud migration strategies</h3>
        <ModuleTable head={['Strategy', 'Meaning', 'Use when']} rows={[
          ['Retire', 'Switch it off', 'No longer needed'],
          ['Retain', 'Keep it where it is for now', 'Not ready, or constraints such as latency or regulation'],
          ['Rehost', 'Lift and shift to cloud VMs', 'Speed matters more than optimisation'],
          ['Relocate', 'Move a virtualised platform as-is (for example VMware to a cloud-hosted VMware service)', 'Large VMware estates needing a fast move'],
          ['Repurchase', 'Replace with SaaS', 'A commercial product does the job'],
          ['Replatform', 'Small changes to use managed services, such as a managed database', 'Quick wins without a rewrite'],
          ['Refactor', 'Re-architect for cloud-native services', 'Scalability or agility justifies the effort'],
        ]} />
        <Ul items={[
          'Map dependencies before planning waves, so linked systems move together.',
          'Build a landing zone first: account or subscription structure, identity, network, logging, guardrails and cost tags.',
          'Every wave has a tested rollback plan and a cut-over checklist.',
          'Use the AWS and Azure Well-Architected Frameworks to review the target design.',
        ]} />

        <h3 className={H3}>Network security posture review</h3>
        <Ul items={[
          'Segmentation: production, user, management and guest networks separated, with rules between them.',
          'Firewall rules: owner and reason for each rule, no any-any rules, unused rules removed.',
          'Remote access: VPN with MFA, limited admin access to network devices, logging to the SIEM.',
          'Device hygiene: supported firmware, patched against known vulnerabilities, hardened configurations, backups of configurations.',
        ]} />
        <p className={P}>The detailed rule review, port tables and auditor evidence are in the <Link className="ui-link" to="/knowledge?topic=infra-review">Infrastructure Security Review Playbook</Link>.</p>

        <h3 className={H3}>ITIL 4 practices in ServiceNow</h3>
        <ModuleTable head={['Practice', 'Purpose', 'Good sign']} rows={[
          ['Incident management', 'Restore normal service quickly', 'Priority based on impact and urgency; SLAs met'],
          ['Problem management', 'Find and remove root causes', 'Known errors recorded; repeat incidents fall'],
          ['Change enablement', 'Make changes safely', 'Risk-based approval; low failed change rate'],
          ['Service request management', 'Handle standard requests', 'Catalogue items with approvals built in'],
          ['Monitoring and event management', 'Turn alerts into action', 'Monitoring tools create tickets automatically'],
        ]} />
      </>
    ),
    steps: [
      'Agree business goals and scope with the client sponsor.',
      'Collect inventory, diagrams and monitoring data; interview operations teams.',
      'Analyse performance, capacity, cost and security posture.',
      'Write recommendations with cost, risk and effort, and a phased roadmap.',
      'Support implementation through change management, in waves with rollback plans.',
      'Hand over runbooks, monitoring thresholds and reports, and agree success measures.',
    ],
    test: [
      'Compare before and after metrics such as utilisation, response time and incident volume.',
      'Confirm monitoring covers every system in the inventory.',
      'Check that changes were approved, tested and reversible.',
      'Re-run the network posture checks after fixes.',
    ],
    evidence: ['Assessment report and monitoring exports', 'Optimisation and migration plans', 'Change records and test results', 'Network review results and remediation tickets', 'Status reports and stakeholder sign-off'],
    pitfalls: ['Recommending tools before understanding business goals.', 'Migrating without a dependency map.', 'Using default monitoring thresholds that create noise.', 'Skipping rollback plans for cut-over.', 'Reports full of data but no clear recommendation or owner.'],
    maps: ['ISO 27001:2022 A.5.23, A.5.30, A.5.37, A.8.6, A.8.9, A.8.14, A.8.16, A.8.20 to A.8.22, A.8.32', 'SOC 2 A1.1, CC6.6, CC7.2, CC8.1', 'ITIL 4', 'AWS and Azure Well-Architected Frameworks'],
    source: 'ITIL 4 (AXELOS); AWS migration strategies; AWS and Azure Well-Architected Frameworks',
    verified: '27 Nov 2026',
  };
  return <ToolkitModule m={m} />;
}
