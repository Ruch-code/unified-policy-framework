// November 2026 cybersecurity news deep dives, written for GRC readers. Conversational, no tables.
const P = 'text-sm text-gray-700 dark:text-gray-300';

const STORIES = [
  {
    id: 'fbi', title: 'FBI employee data stolen through the FBI jobs portal',
    src: [['Reuters via Tribune', 'https://tribune.com.pk/story/2631214/hacked-fbi-data-has-sensitive-information-about-employees-intelligence-roles'], ['Federal News Network', 'https://federalnewsnetwork.com/cybersecurity/2026/09/fbi-investigates-apparent-breach-of-its-jobs-website-hackers-claim-to-have-sensitive-employee-data/']],
    points: [
      'In late September 2026 the ShinyHunters group claimed it had stolen data on current and former FBI employees, and the FBI said a criminal group was claiming a compromise of its FBIJobs.gov portal.',
      'Reuters reviewed a 5,000-line sample covering names, addresses, phone numbers, dates of birth, Social Security numbers and emergency contacts, plus job assignments, some in sensitive units.',
      'The group claimed 2 to 3 terabytes in total. Reuters confirmed details for a subset of people but could not authenticate everything, so treat the full size as a claim.',
      'The FBI said the cause was still undetermined at the time. Later reporting in November said the impact extended to Justice Department personnel.',
      'Why it matters: a recruitment portal is rarely treated as a crown-jewel system, yet it held some of the most sensitive personal data the organisation has.',
      'For employees in sensitive roles, a home address leak is a physical safety risk, not only a privacy one.',
      'Lesson one: classify systems by the data they hold, not by how important the business process feels. HR and hiring platforms often hold the richest identity data.',
      'Lesson two: applicant and employee data should not live in the same store as current job assignments unless there is a clear need.',
      'Lesson three: third-party HR and recruitment platforms need the same vendor assessment as finance or customer systems.',
      'Controls to check: data minimisation and retention on HR systems, encryption at rest, access logging on bulk exports, and alerts for unusual download volumes.',
      'Incident response lesson: have a plan for protecting staff personally, including address suppression and identity monitoring, not only for notifying regulators.',
      'Interview angle: if asked about the most underrated data risk, HR and recruitment systems are a strong, specific answer.',
    ],
  },
  {
    id: 'usda', title: 'USDA security incident forces password resets and outages',
    src: [['Nextgov', 'https://www.nextgov.com/cybersecurity/2026/11/usda-grapples-security-breach-it-staff-take-multiple-systems-offline/417350/']],
    points: [
      'In mid November 2026 the USDA security operations centre found a security incident, according to an internal email reported by Nextgov.',
      'To contain it, IT reset all database passwords across environments, which forced application resets and caused outages over several days.',
      'Affected services included financial tools that process payments between the agency and farmers, and applications that show loan and aid status.',
      'Some staff also had VPN problems. A bulletin warned of intermittent outages through the week.',
      'At the time of reporting it was not known who was behind it or whether data was taken.',
      'Separately, US agencies including USDA warned in November about attacks on industrial refrigeration and cold chain systems.',
      'Why it matters: a broad credential reset is a valid containment move, but done without dependency mapping it turns a security incident into an availability incident.',
      'Lesson one: keep an up-to-date map of which applications use which database credentials, so rotation can be staged.',
      'Lesson two: move service credentials into a secrets manager with automated rotation, so a mass reset is routine, not an emergency.',
      'Lesson three: communication matters. Staff reported being poorly informed, which slows recovery and fuels rumours.',
      'Controls to check: credential rotation runbooks, application dependency maps, BCP for payment systems, and internal incident communication templates.',
      'Interview angle: a good answer to "how would you contain a credential compromise" mentions staged rotation and business impact, not only "reset everything".',
    ],
  },
  {
    id: 'ai-exploits', title: 'Attackers using autonomous AI to find and exploit flaws',
    src: [['IT Brief (Google Threat Intelligence Group findings)', 'https://itbrief.com.au/story/google-warns-of-autonomous-ai-attacks-finding-flaws']],
    points: [
      'In November 2026 Google Threat Intelligence Group and Mandiant reported their first observation of a threat actor using an AI agent to find vulnerabilities and build exploits without human involvement.',
      'In one case, attackers exploiting newly disclosed flaws went from initial foothold to full domain admin within minutes.',
      'Another framework on an exposed server kept scanning web applications and automatically prepared and ran exploits.',
      'Google reported zero-day exploits rising from about eight a month in 2025 to eleven a month in 2026, reaching 22 in August.',
      'Google also highlighted frameworks that reverse security patches to build exploits for newly fixed flaws, which makes patch speed even more important.',
      'Many of these frameworks left clear forensic traces, which suggests they favour speed over stealth.',
      'Why it matters: the time between a patch being released and it being exploited is shrinking from weeks to hours.',
      'Lesson one: revisit patch SLAs for internet-facing systems. Critical external flaws may need hours, not the classic 15 or 30 days.',
      'Lesson two: protect AI API keys and cloud quotas, because attackers use stolen access to run these tools.',
      'Lesson three: secure AI coding assistant configuration files, which Google flagged as a target.',
      'Controls to check: asset inventory of internet-facing systems, emergency patch process, virtual patching with WAF rules, and detection tuned for fast lateral movement.',
      'Interview angle: when asked how AI changes the threat landscape, cite speed of exploitation and what that means for patch policy.',
    ],
  },
  {
    id: 'vmware', title: 'China-linked group used a VMware ESX zero-day to hide its tracks',
    src: [['Help Net Security', 'https://www.helpnetsecurity.com/2026-10-29/php2shell-fragnesia-vmware-esx-zero-day/']],
    points: [
      'CVE-2026-41709 is an insufficient logging flaw in VMware ESX, the bare-metal hypervisor.',
      'A China-nexus group tracked as Warp Panda exploited it as a zero-day in an intrusion in early 2026, reducing audit trail visibility.',
      'The group typically gets in through internet-facing edge devices, moves into vCenter and deploys custom malware.',
      'Broadcom fixed the flaw in July 2026. CrowdStrike reported it.',
      'CISA added it to the Known Exploited Vulnerabilities catalog on 28 October 2026 with a federal deadline of 11 November.',
      'Why it matters: the flaw did not give access by itself. It helped the attacker avoid being seen, which is exactly what an espionage group needs.',
      'Lesson one: hypervisors and management planes are tier-zero assets. Compromise there means every virtual machine is exposed.',
      'Lesson two: do not rely only on logs stored on the device you are protecting. Forward them off the host as they are created.',
      'Lesson three: edge devices remain the most common way in. Patch and monitor VPNs, firewalls and gateways first.',
      'Controls to check: isolated management network for vCenter and ESX, MFA on management access, central log forwarding, and integrity checks on hypervisor configuration.',
      'Audit angle: ask for evidence that hypervisor logs reach the SIEM and that someone reviews alerts from them.',
      'Interview angle: explain why an insufficient logging flaw can be as serious as a remote code execution flaw for a targeted attacker.',
    ],
  },
  {
    id: 'kev', title: 'CISA adds four exploited flaws to KEV with a three-day deadline',
    src: [['eSecurity Planet', 'https://www.esecurityplanet.com/vulnerabilities/news-cisa-kev-gpustack-freeswitch-openssh-ibm-november-2026/']],
    points: [
      'On 9 November 2026 CISA added four actively exploited vulnerabilities to its KEV catalog.',
      'They were an authentication bypass in GPUStack before 2.2.0, a command injection in FreeSWITCH through SIP message handling, an authentication bypass in OpenSSH on certain Linux systems using musl libc without PAM, and an authorisation bypass in IBM Aspera Faspex 5.0.0 to 5.0.19.',
      'Federal civilian agencies had until 12 November, three days, and the deadline included forensic triage.',
      'Why it matters: the short deadline reflects how quickly exploitation now follows disclosure.',
      'GPUStack is AI infrastructure for running models on GPUs, a reminder that AI tooling is now on the exploited list.',
      'The OpenSSH issue affects specific builds only, so knowing exactly what you run matters more than ever.',
      'Lesson one: use KEV as a priority signal even if you are not a US agency. Exploited beats high CVSS.',
      'Lesson two: keep a software inventory precise enough to answer "do we run musl-based OpenSSH without PAM" in minutes.',
      'Lesson three: patching is not the end. The forensic triage requirement means checking whether you were already compromised.',
      'Controls to check: SBOM or software inventory, KEV-driven SLA in the vulnerability policy, and a compromise assessment step for exploited flaws.',
      'Audit angle: sample KEV entries from the period and check time to remediation against your policy.',
      'Interview angle: describe how you would prioritise 500 open vulnerabilities using exploitation status, exposure and asset criticality.',
    ],
  },
  {
    id: 'chrome', title: 'Chrome update fixes 83 security issues',
    src: [['Malwarebytes', 'https://www.malwarebytes.com/?p=488521']],
    points: [
      'Google released Chrome 157.0.8103.78/.79 on 11 November 2026 with 83 security fixes.',
      'Five were rated Critical, all use-after-free bugs.',
      'The report did not say whether any were being exploited.',
      'It was described as the second Chrome update that week.',
      'Why it matters: the browser is where staff open email links, SaaS apps and AI tools, so it is one of the largest attack surfaces in any company.',
      'Use-after-free bugs are memory safety flaws that attackers often chain to escape the browser sandbox.',
      'Lesson one: Chrome downloads updates automatically but only applies them on restart. Users who never restart stay exposed.',
      'Lesson two: manage browsers centrally with policies that force relaunch within a set time.',
      'Lesson three: include browsers in vulnerability reporting, not only operating systems.',
      'Controls to check: browser version compliance report, forced relaunch policy, extension allow-list.',
      'Audit angle: ask for the percentage of endpoints on the current browser version a week after release.',
      'Interview angle: a strong patch management answer covers browsers and their extensions, not just servers.',
    ],
  },
  {
    id: 'vendors', title: 'Visa, Mastercard and JPMorgan Chase third-party incident',
    src: [['BleepingComputer', 'https://www.bleepingcomputer.com/news/security/vendor-data-breach-exposes-chase-visa-mastercard-customer-info/']],
    points: [
      'This incident is covered in detail, with remediation and controls, in Vendor Risk under "Recent third-party incidents".',
      'In short: attackers allegedly used a data analytics vendor\'s credentials to reach customer cloud environments through IAM roles granted to that vendor.',
      'Chase said marketing data such as names and emails may have been accessed. Visa and Mastercard said payment data was not affected.',
      'The key lesson is that cross-account roles given to vendors need least privilege, monitoring and regular recertification.',
      'Data shared with marketing and analytics vendors should be minimised before it leaves.',
      'Expect targeted phishing using the leaked contact details.',
      'Controls to check: inventory of all third-party roles in cloud accounts and alerting on their use.',
      'Contract angle: require prompt incident notice and strong credential protection from vendors.',
      'Audit angle: ask how the company knows which vendors can reach which data.',
      'Board angle: concentration risk when one analytics vendor serves many large clients.',
      'Customer angle: clear communication that payments were not affected helps limit panic.',
      'Interview angle: use this as a current example of why vendor access reviews matter.',
    ],
  },
];

const RAG = [
  'Picture an AI agent with a RAG knowledge base that can read tickets, query a database and call internal APIs. Each story above has a version that runs through that agent.',
  'Credential theft like the vendor and USDA cases: if the agent uses long-lived service credentials, one stolen key gives the attacker everything the agent can reach. Give agents their own scoped, short-lived identities.',
  'Sensitive data in the wrong store, like the FBI case: if HR or personal data is indexed into the vector store, any user who can query the agent may retrieve it. Enforce permissions at retrieval and keep sensitive sources out of general indexes.',
  'Fast automated exploitation, like the Google findings: an agent that browses or reads external content can be fed instructions (prompt injection). Treat retrieved content as data, not commands, and put high-impact tools behind approval.',
  'Logging gaps, like the VMware case: if you cannot see which documents were retrieved and which tools were called, you cannot investigate. Log prompts, retrieved document IDs, tool calls, model version and user.',
  'Exploited components, like the KEV entries: model servers and AI infrastructure such as GPUStack are now targets. Keep them in the vulnerability programme and off the public internet.',
  'Browser and extension risk, like the Chrome update: AI coding assistants and extensions run with the user\'s access. Allow-list them and keep them current.',
  'Incident response for an agent: kill switch for tool use, revoke the agent\'s credentials, preserve logs, identify what was retrieved or changed, and notify data owners.',
  'For the wider architecture, see "Session management and offboarding for RAG and agentic AI" on the AI Governance page.',
];

export default function ThreatNewsNov2026() {
  return (
    <div className="space-y-3">
      <p className={P}>Recent security news, explained in plain language for GRC, audit and security leaders: what happened, why it matters, the lessons and the controls to check. Facts are as reported at the time and may change. Analysis is our own.</p>
      {STORIES.map((s) => (
        <details key={s.id} id={`news-${s.id}`} className="rounded-xl border border-gray-200 dark:border-gray-700 p-4">
          <summary className="cursor-pointer font-semibold text-gray-900 dark:text-white">{s.title}</summary>
          <ol className={`list-decimal pl-5 mt-2 space-y-1 ${P}`}>{s.points.map((x) => <li key={x}>{x}</li>)}</ol>
          <p className="mt-2 text-xs text-gray-500 dark:text-gray-400">Source: {s.src.map(([l, u], k) => <span key={u}>{k ? ', ' : ''}<a className="ui-link" href={u} target="_blank" rel="noreferrer">{l}</a></span>)}</p>
        </details>
      ))}
      <details id="news-ai-agent" className="rounded-xl border border-rose-200 dark:border-rose-800 p-4">
        <summary className="cursor-pointer font-semibold text-gray-900 dark:text-white">What these incidents would look like through an AI agent with RAG</summary>
        <ul className={`list-disc pl-5 mt-2 space-y-1 ${P}`}>{RAG.map((x) => <li key={x}>{x}</li>)}</ul>
      </details>
    </div>
  );
}
