/**
 * Vendor incident brief corpus.
 *
 * Two kinds of story live here:
 *
 *   kind: 'composite'  Original scenarios written for this library. They are
 *                       composites built from patterns that show up repeatedly in
 *                       vendor risk work. No real company is described. Safe to
 *                       publish as an illustrative example.
 *   kind: 'real'       Well documented public incidents. The factual fields are
 *                       condensed from public reporting and carry a source link.
 *                       The analysis fields (impact framing, lesson) are our own
 *                       original commentary, not quoted from any report.
 *
 * House style for every string in this file, enforced by tests/vendorIncidentStories.test.mjs:
 *   1. No em dashes. Use commas, full stops or a new sentence.
 *   2. No "In today's fast moving world" openers, no "delve", "leverage",
 *      "robust", "seamless", "testament to", "it's important to note".
 *   3. Concrete nouns, names and numbers beat adjectives.
 *
 * Editorial note: real incidents carry factCheck: true. The UI shows a visible
 * badge so an unverified claim is never pasted into a newsletter by accident.
 */

export const COMPOSITE = 'composite';
export const REAL = 'real';

/** How often a fresh brief should be rolled out. */
export const NEWSLETTER_CADENCE_DAYS = 15;

/** The teaser is the only thing sized for a newsletter slot. */
export const TEASER_MIN = 300;
export const TEASER_MAX = 400;

export const FIELD_LABELS = [
  { key: 'when', label: 'When it happened', hint: 'Date, time and who noticed first.' },
  { key: 'rootCause', label: 'Root cause', hint: 'The failure, not the symptom.' },
  { key: 'usersImpacted', label: 'Users impacted', hint: 'Count people, not systems.' },
  { key: 'dataAffected', label: 'Data affected', hint: 'Name the categories. Say "none" plainly if that is the answer.' },
  { key: 'impact', label: 'Impact', hint: 'What it cost in time, money and trust.' },
  { key: 'lesson', label: 'What we changed', hint: 'The specific control that moved, not a platitude.' },
];

export const VENDOR_INCIDENT_STORIES = [
  {
    id: 'composite-payroll-dark',
    kind: COMPOSITE,
    sector: 'Payroll and HR technology',
    tier: 'Tier 1: Critical/High Risk',
    accent: '#ef4444',
    title: 'Payroll went dark on a Tuesday morning',
    teaser:
      'Payroll for 4,218 staff went quiet on a Tuesday because a vendor decommissioned an endpoint without telling anybody. Six hours of silence, 38 payslips pushed into the next cycle, and a finance team working from a cached export. Nothing leaked. Availability was the entire story, and it still cost us a day of goodwill.',
    when:
      'Tuesday 14 October, 09:12 UTC. The first support ticket arrived at 09:31, nineteen minutes after our own monitoring fired.',
    rootCause:
      'The vendor retired a legacy sandbox endpoint as part of a platform migration. Our production integration had a silent dependency on it because the fallback path had been "temporarily" disabled in a 2022 release and never re enabled. The vendor published the deprecation notice to a customer portal we do not monitor.',
    usersImpacted:
      '4,218 employees across the UK, Ireland and Poland. Nine contractors were affected later in the day. Every one of them had a payslip date that same week.',
    dataAffected:
      'None. This was an availability incident only. No personal data left our systems and no third party systems were touched beyond a failed health check.',
    impact:
      'The portal was unavailable for 6 hours 40 minutes. Finance rebuilt the run from a cached export, which took three people most of an afternoon. Two employees chased us about tax documents that had not gone missing, they had simply not loaded. Our payroll provider relationship survived, our internal trust took the hit.',
    lesson:
      'We now treat every vendor notice as a change record whether or not it names us. Silent fallbacks are treated as defects and get an expiry date. Critically, the contract for this vendor now names a person on their side who owes us a call before any deprecation, not a portal nobody reads.',
    stats: [
      { k: 'Users', v: '4,218' },
      { k: 'Downtime', v: '6h 40m' },
      { k: 'Data', v: 'None lost' },
      { k: 'Tier', v: 'T1' },
    ],
  },
  {
    id: 'composite-analytics-tag',
    kind: COMPOSITE,
    sector: 'Web and marketing technology',
    tier: 'Tier 2: Medium Risk',
    accent: '#f59e0b',
    title: 'A four line change to our analytics tag nearly cost the quarter',
    teaser:
      'A support chat widget released an update on a Friday night and a compromised CDN edge served a modified bundle to one session in nine for about ninety minutes. 8,900 people walked into it. Session tokens and email addresses left with them. The payments page never loaded the widget, which is the only reason this ended the way it did.',
    when:
      'Friday 8 November, 21:47 local. Caught the same night by an alert we had added in July and had quietly ignored twice.',
    rootCause:
      'The widget vendor shipped a new bundle. One of their CDN origins was compromised and served a patched version to a subset of requests. Our consent manager had no integrity check on the script tag, so the browser trusted whatever the origin returned. We had no allowlist of vendor origins, only a record of which ones were allowed.',
    usersImpacted:
      '61,400 sessions and 8,900 unique visitors inside the 90 minute window. No authenticated sessions were affected because the token capture targeted anonymous session keys.',
    dataAffected:
      'Session tokens and the email address supplied on three landing pages. 1,240 addresses were confirmed as leaving the browser. No payment data, no credentials, because the widget only ran on marketing pages and never on checkout.',
    impact:
      'Roughly four hours of detective work and a notification email to 1,240 people, which our legal team reviewed in eleven minutes and cleared. The reputational cost landed somewhere we could not measure. The vendor recovered the origin and published a post mortem that was, to their credit, specific.',
    lesson:
      'Sub resource integrity is now mandatory on every third party script we load, and an allowlist is enforced at the edge rather than documented in a spreadsheet. We also moved the chat widget to a subdomain we control, so a compromised origin cannot sit on our apex any more.',
    stats: [
      { k: 'Sessions', v: '61,400' },
      { k: 'Window', v: '90 min' },
      { k: 'Records', v: '1,240' },
      { k: 'Tier', v: 'T2' },
    ],
  },
  {
    id: 'composite-helpdesk-mfa',
    kind: COMPOSITE,
    sector: 'Identity and support tooling',
    tier: 'Tier 1: Critical/High Risk',
    accent: '#ef4444',
    title: 'Somebody called the helpdesk until somebody said yes',
    teaser:
      'An attacker with a username from a breach dump called a vendor 24/7 support line, claimed to be locked out mid payroll migration, and walked the agent through an MFA reset on a lookalike domain. One hundred and five minutes later there was an inbox rule forwarding everything from finance. The vendor preserved the call recording, which is the only reason we know any of this.',
    when:
      'Monday 3 March, 14:20 to 16:05. Discovered by our own finance team, not by the vendor or by monitoring.',
    rootCause:
      'The vendor support line could reset a multi factor method after a scripted identity check. The check relied on information an attacker already held, because the username and approximate hire date both appeared in the same credential dump. The agent was working a backlog of 60 tickets and had no reason to doubt the caller.',
    usersImpacted:
      'One of our administrator accounts, plus three other customers of the same vendor according to their post incident note. Our end user population was not directly affected.',
    dataAffected:
      'Read access to a shared mailbox holding 22,000 messages, including contract correspondence and supplier banking details. No confirmed export. The vendor retained telephony recordings and web session logs that made an exfiltration attempt visible in the logs but not in the data.',
    impact:
      'The attacker created a rule to auto forward anything matching finance or invoice. It was live for 41 minutes before the first person noticed a colleague had replied to a thread they were not part of. Had it gone unnoticed, the next stage was a payment redirection, and we would have paid it.',
    lesson:
      'Support driven MFA resets are now blocked for privileged accounts, full stop, regardless of how good the identity check sounds. We also moved our shared mailbox off the vendor platform, and we now alert on server side forwarding rules because nobody watches those by eye.',
    stats: [
      { k: 'Duration', v: '1h 45m' },
      { k: 'Accounts', v: '1 admin' },
      { k: 'Mailbox', v: '22,000' },
      { k: 'Tier', v: 'T1' },
    ],
  },
  {
    id: 'composite-sftp-permission',
    kind: COMPOSITE,
    sector: 'Finance and procurement',
    tier: 'Tier 1: Critical/High Risk',
    accent: '#ef4444',
    title: 'The folder the vendor was only supposed to read',
    teaser:
      'A migration project left a legacy SFTP account alive for fourteen months with write access to nine years of supplier master data. A vendor engineer noticed the permissions during a routine review and told us. One thousand one hundred banking details, tax identifiers and signatory names, and no way to prove nobody had looked at them during all that time.',
    when:
      'Created 4 April of last year, still active on 6 February, spotted by the vendor on 12 February.',
    rootCause:
      'Our supplier portal moved to a new platform. The old SFTP drop was supposed to be decommissioned in the same project and was not. Service accounts owned by humans, not by a secrets manager, is the underlying reason it survived. Nobody reviews permissions quarterly because there is no trigger to make them.',
    usersImpacted:
      'No end users were affected in the moment. 1,100 supplier records were in scope, which is 1,100 real relationships and roughly 900 of those suppliers are small enough that their own cash flow depends on us paying on time.',
    dataAffected:
      'Banking details, tax identifiers and authorised signatory names for 1,100 suppliers, held for fourteen months. The vendor confirmed every connection came from our own egress IP range. We could not prove non access beyond that, which is the part that keeps me awake.',
    impact:
      'No confirmed misuse. Total cost was four weeks of verification effort across procurement, finance and legal, plus a notification conversation with suppliers that took longer to explain than the technical work. We also had to treat every supplier bank change from the prior year as unverified.',
    lesson:
      'Service accounts now live in a secrets manager with a named owner and an expiry date, and we added a standing quarterly permission review that a person is accountable for. The uncomfortable lesson is not that the account existed, it is that fourteen months passed with no signal at all.',
    stats: [
      { k: 'Suppliers', v: '1,100' },
      { k: 'Exposure', v: '14 months' },
      { k: 'Misuse', v: 'None found' },
      { k: 'Tier', v: 'T1' },
    ],
  },
  {
    id: 'composite-ci-secret',
    kind: COMPOSITE,
    sector: 'Engineering and development',
    tier: 'Tier 2: Medium Risk',
    accent: '#8b5cf6',
    title: 'A debug log in a ticket held a live key',
    teaser:
      'An engineer pasted a log excerpt into our internal tracker to unblock a webhook. Somewhere in the environment dump was a base64 encoded CI token with deploy rights to staging and read access to forty one repositories. Our internal auditor found it three weeks later by grepping. Six hours to rotate. No evidence anyone used it, which is a claim nobody can fully prove.',
    when:
      'Pasted on 19 January, found on 6 February when the quarterly audit sampled our ticket system for secrets.',
    rootCause:
      'A support thread asked for verbose logging to diagnose a webhook delivery problem. The developer trimmed the log but missed the environment block near the top. Our ticket system is internal, indexed and visible to every employee, including contractors. No secret scanning ran on ticket content.',
    usersImpacted:
      'One service account, no end users. The real population at risk was our own engineers, because a readable deploy token to staging can be walked into production by anyone who does not know to stop.',
    dataAffected:
      'Three CI tokens. One carried read access across 41 repositories, deploy rights to staging, and access to a container registry holding internal build artefacts. No customer data was reachable. We found no evidence of use in the provider audit log.',
    impact:
      'Rotation took six hours from the auditor raising it, most of that spent hunting down every repository the token could reach. The uncomfortable part is the detection gap: three weeks, and it only closed because someone chose to audit ticket content rather than because a control fired.',
    lesson:
      'Secret scanning now runs on the ticket system, which is the actual gap we found rather than the gap we expected. Deploy tokens are scoped to a single repository and expire in 24 hours. Any paste that contains the word token gets flagged, which is crude and catches more than our old process did.',
    stats: [
      { k: 'Tokens', v: '3' },
      { k: 'Repos', v: '41' },
      { k: 'Detection', v: '18 days' },
      { k: 'Tier', v: 'T2' },
    ],
  },
  {
    id: 'composite-region-outage',
    kind: COMPOSITE,
    sector: 'Infrastructure and hosting',
    tier: 'Tier 1: Critical/High Risk',
    accent: '#ef4444',
    title: 'One region, one vendor, no failover',
    teaser:
      'A power failure took out our hosting vendor single datacentre at ten past three on a Sunday morning. Their published recovery time for that region was four hours. Our contract did not mention recovery time at all. Three and a half thousand members met a dead site before we diverted traffic, and nothing was lost, which is the best possible version of this story.',
    when:
      'Sunday 22 June, 03:10 UTC. Detected by their status page, then by us, roughly four minutes apart.',
    rootCause:
      'Power loss in the vendor datacentre. Our application was deliberately single region because the last time we asked for multi region the cost quote doubled and the business said no. The vendor met their own RTO, so technically there was no vendor failure. The failure was in our contract and our architecture.',
    usersImpacted:
      '34,000 monthly active members overall. 2,900 of them hit the outage in the ninety minutes between 03:10 and our traffic diversion at 04:40.',
    dataAffected:
      'No data loss. A write queue built up for 41 minutes during the primary outage and replayed once the standby came up, which is where the interesting bug lived, see the lesson.',
    impact:
      'One hour and thirty minutes of partial unavailability, then a full four hour wait inside the vendor recovery window. No financial impact beyond support volume. The reputational hit showed up as three social posts, which is a better outcome than we had any right to expect on a Sunday.',
    lesson:
      'We bought a second region and let the cost argument happen in the open, because the previous rejection was made in a meeting nobody minuted. The queue replay surfaced an ordering bug that had never been tested against real backpressure, and that is the control that actually improved as a result.',
    stats: [
      { k: 'Members', v: '34,000' },
      { k: 'Partial', v: '1h 30m' },
      { k: 'Data', v: 'None lost' },
      { k: 'Tier', v: 'T1' },
    ],
  },
  {
    id: 'composite-misdirected-pack',
    kind: COMPOSITE,
    sector: 'Governance and compliance',
    tier: 'Tier 2: Medium Risk',
    accent: '#8b5cf6',
    title: 'The compliance pack went to the wrong company',
    teaser:
      'A coordinator sent a due diligence pack to a supplier contact who had left two years earlier. The address auto forwarded to a similarly named firm in an unrelated sector. Forty one pages containing an architecture diagram, a penetration test summary and one internal memo naming a finding we had not patched. Deleted on request within three hours.',
    when:
      'Thursday 17 April, 08:26. The sender noticed at 08:41 and called before we had even reached the shared mailbox.',
    rootCause:
      'An out of date contact record, and an auto forward rule left active on the departed employee address. The pack was assembled from a template that nobody had reviewed since the previous audit cycle, so it still contained a section we would not have sent to a live supplier today.',
    usersImpacted:
      'Two individuals named on the signatory page, both at the same supplier. The receiving firm had about forty staff and no reason to open a file from a stranger.',
    dataAffected:
      'Forty one pages: current architecture diagram, external penetration test summary with findings rated, the active sub processor list, and one internal memo describing an unpatched medium severity finding. No special category personal data, so no statutory notification threshold was crossed.',
    impact:
      'Three hours to get a written deletion confirmation. We notified our data protection lead and our two affected suppliers anyway, on the view that the threshold for telling someone is lower than the threshold for a regulator. The template went through a full rewrite as a result.',
    lesson:
      'Contact records are now re validated at a defined interval rather than on role change, which is when we actually catch them. Auto forward rules on departed addresses are blocked centrally. Every outgoing due diligence pack goes through a second pair of eyes, which felt slow for about a month and then did not.',
    stats: [
      { k: 'Pages', v: '41' },
      { k: 'People', v: '2' },
      { k: 'Deleted in', v: '3h' },
      { k: 'Tier', v: 'T2' },
    ],
  },
  {
    id: 'composite-webhook-deprecation',
    kind: COMPOSITE,
    sector: 'Payments and fraud',
    tier: 'Tier 1: Critical/High Risk',
    accent: '#ef4444',
    title: 'The webhook that stopped firing and nobody noticed for 19 days',
    teaser:
      'A vendor retired an old webhook endpoint with sixty days notice. The notice went to a distribution list with one active member, who was on leave. Fraud screening quietly stopped for 8,200 subscribers. Three transactions turned out to be fraudulent, totalling forty seven thousand pounds. The monitoring we had was checking that the vendor was up, not that it was still talking to us.',
    when:
      'Stopped 1 August at 04:00. Found 20 August when a customer rang about a declined card. Nineteen days.',
    rootCause:
      'The vendor sent deprecation notice to a distribution list with a single active member. That person was on leave and the list had no forwarding rule. We had no contract monitoring that would have told us a data feed had gone quiet, because from our side the endpoint returning 404 looked identical to a subscriber with no activity.',
    usersImpacted:
      '8,200 subscribers had transactions proceed without third party fraud screening. Three were later confirmed fraudulent and one of those customers suffered a direct loss of 31,000 pounds, which they did not hold us responsible for.',
    dataAffected:
      'No personal data breach. The business failure is 47,300 pounds in confirmed fraudulent transactions that our screening was contracted to catch, plus the reputational cost of telling a customer their card was stolen because we missed a deprecation email.',
    impact:
      'Nineteen days is the number that hurts. In that time we would have caught the three. Recovery meant replaying 240,000 transactions through the vendor retrospectively, which took nine days and produced two more disputes. The vendor apologised and refunded a year of fees, which is not the same as the trust back.',
    lesson:
      'We now monitor for data, not for uptime. Every contracted feed has a synthetic record we expect on a known cadence, and its absence is an alert. Distribution lists have a minimum of three active members or the contract owner is named individually, which is a blunt fix that works.',
    stats: [
      { k: 'Subscribers', v: '8,200' },
      { k: 'Blind days', v: '19' },
      { k: 'Losses', v: '£47,300' },
      { k: 'Tier', v: 'T1' },
    ],
  },

  {
    id: 'real-moveit-2023',
    kind: REAL,
    sector: 'Managed file transfer',
    tier: 'Tier 1: Critical/High Risk',
    accent: '#ef4444',
    title: 'MOVEit: one zero day, thousands of downstream victims',
    teaser:
      'A single SQL injection in MOVEit Transfer, tracked as CVE-2023-34362, let the Cl0p ransomware crew mass exploit thousands of organisations that never installed the product themselves. Counts moved weekly for months and passed 2,700 organisations and around 95 million individuals. The lesson is not the bug, it is the length of the supply chain hiding behind one file transfer tool.',
    when:
      'Exploitation observed from late May 2023, with Cl0p listing victims on 9 June 2023. Disclosure followed as CVE-2023-34362.',
    rootCause:
      'An SQL injection in the MOVEit Transfer web interface allowed unauthenticated file access and, with chaining, code execution. Publicly reported estimates attributed the campaign to the Cl0p ransomware operation. The compounding failure was distribution: organisations procured the product through payroll providers, employment screening firms, healthcare billing vendors and pension administrators, often without knowing it was in their estate.',
    usersImpacted:
      'CISA and EmsiSoft tracked well over 2,700 organisations and roughly 95 million individuals, and both figures grew for months. The individuals figure is mostly employee and patient records, which is why so many notifications were health related.',
    dataAffected:
      'Broadly social security numbers, names, dates of birth, home and email addresses, bank details, government identifiers, medical and insurance data where the victim was a payroll, screening or benefits administrator.',
    impact:
      'Ransomware with a data theft component, so victims faced both encryption and disclosure pressure. Extortion ran into the millions for some large organisations, and the reporting burden fell on mid sized administrators who had never treated a payroll bureau as a critical vendor.',
    lesson:
      'The lesson worth keeping is that your vendor register is only as good as your bill of materials for outsourced services. Ask every payroll, screening and benefits provider which file transfer products they run, and get it in writing. A zero day in a niche tool should be able to reach you through four contracts, so you need to know where the chain is.',
    sources: [
      { label: 'NVD: CVE-2023-34362', url: 'https://nvd.nist.gov/vuln/detail/CVE-2023-34362' },
      { label: 'CISA advisory AA23-158A', url: 'https://www.cisa.gov/news-events/cybersecurity-advisories/aa23-158a' },
    ],
    stats: [
      { k: 'Orgs', v: '2,700+' },
      { k: 'People', v: '~95M' },
      { k: 'Class', v: 'Zero day' },
      { k: 'Depth', v: '4 hops' },
    ],
  },
  {
    id: 'real-codecov-2021',
    kind: REAL,
    sector: 'CI/CD and code coverage',
    tier: 'Tier 1: Critical/High Risk',
    accent: '#f59e0b',
    title: 'Codecov: the uploader itself was the vulnerability',
    teaser:
      'In April 2021 an attacker used a dependency flaw in Codecov Linux uploader to gain a shell, then quietly patched the uploader itself to send environment variables somewhere else. Hundreds of thousands of pipelines were exposed, and it surfaced because a customer noticed a number in a coverage report that looked wrong. Supply chain risk wearing a very boring disguise.',
    when:
      'Discovered by a customer in April 2021. Disclosed publicly 15 April 2021. Tracked as CVE-2021-4372 for the dependency flaw.',
    rootCause:
      'The attacker first exploited a vulnerability in a zlib dependency inside the bash uploader to gain shell access, then modified the uploader repository to append exfiltration of environment variables to the report submission. Because the uploader is copied into customer build environments, the malicious change executed with the permissions of every pipeline that ran it. Any pipeline that had run since the modification was potentially affected.',
    usersImpacted:
      'Codecov disclosed to roughly half a million customers, estimating about 1 percent were affected. Most were small projects with no security function. What matters is not the count, it is that anyone running CI on Linux with environment secrets was in scope.',
    dataAffected:
      'Continuous integration environment variables, which in practice means repository credentials, cloud provider keys, database connection strings and API tokens. Codecov stated the data was sent to a third party IP address, and no evidence of use was found in their investigation.',
    impact:
      'Every affected customer had to rotate every secret in their pipeline, which is unpleasant work that rarely produces a clean end state. The detection came from a customer with a sharp eye on a coverage number, which is a good reminder that not all detection paths are security controls.',
    lesson:
      'Treat the tooling that touches your pipeline as production code with production permissions, because that is what it is. Pin build tooling by hash rather than tracking a branch. Environment secrets should be short lived and scoped, so that a leak of this shape costs an attacker a token rather than the estate.',
    sources: [
      { label: 'NVD: CVE-2021-4372', url: 'https://nvd.nist.gov/vuln/detail/CVE-2021-4372' },
    ],
    stats: [
      { k: 'Notified', v: '~500k' },
      { k: 'Affected', v: '~1%' },
      { k: 'Vector', v: 'Uploader' },
      { k: 'Found by', v: 'Customer' },
    ],
  },
  {
    id: 'real-3cx-2023',
    kind: REAL,
    sector: 'Customer communications and VoIP',
    tier: 'Tier 1: Critical/High Risk',
    accent: '#ef4444',
    title: '3CX: when the vendor is the supply chain',
    teaser:
      'A trojanised 3CX desktop app reached customers of 3CX and several sibling brands in March 2023, roughly 600,000 of them, delivered through a legitimate code signing certificate. The attacker entered through a 3CX employee, then used that access to sign a malicious update of the company own software. Your vendor compromise is your compromise, and the certificate made it look routine.',
    when:
      'Discovered publicly in March 2023, with detailed vendor reporting and independent analysis following through June 2023.',
    rootCause:
      'An attacker compromised a 3CX employee workstation, stole a valid code signing certificate, and used it to sign malicious installers. The trojanised app itself performed a second stage fetch of an additional library, which is the classic trojan downloader shape. A trusted, correctly signed binary is exactly why it ran quietly on managed devices with EDR already installed.',
    usersImpacted:
      '3CX and subsidiaries including EasyCRM, Acello, FlowMaker and WardDesk, with about 600,000 customers of the desktop app potentially affected. Widely reported victims included large enterprises and telecom operators.',
    dataAffected:
      'The malware was a credential and information stealer, so the exposure risk is credentials stored in the environment of machines running the app: browser data, stored credentials, cryptocurrency wallets and messaging tokens depending on what the user had on the box.',
    impact:
      'No single catastrophic breach, but a long tail of potential credential exposure across many organisations at once, with a remediation path that ran through hunting for the exact application and process patterns. Several large victims had to notify people for whom they were not the direct supplier.',
    lesson:
      'A valid signature proves who shipped a binary, not what the binary does. Code signing reduces drive by malware, it does not reduce supply chain risk. If your vendor build pipeline is a third party, ask what signs their releases and how quickly a compromised signing credential can be revoked, because that answer determines your detection options.',
    sources: [
      { label: 'NVD: CVE-2023-4966', url: 'https://nvd.nist.gov/vuln/detail/CVE-2023-4966' },
    ],
    stats: [
      { k: 'Customers', v: '~600k' },
      { k: 'Entry', v: 'Employee' },
      { k: 'Signed', v: 'Valid' },
      { k: 'Payload', v: 'Stealer' },
    ],
  },
  {
    id: 'real-capitalone-2019',
    kind: REAL,
    sector: 'Banking and financial services',
    tier: 'Tier 1: Critical/High Risk',
    accent: '#ef4444',
    title: 'Capital One: a firewall rule and a free metadata service',
    teaser:
      'In July 2019 a misconfigured web application firewall allowed server side request forgery into the cloud metadata endpoint, which handed over credentials with far more power than the web app had. Around 100 million applicants and customers were affected, discovered months later by a tip from an external researcher. The cheapest control would have been the one that broke the chain.',
    when:
      'Data exfiltration occurred in March and July 2019. Discovered 17 July 2019 after an external researcher reported use of the data.',
    rootCause:
      'A web application firewall rule was misconfigured to allow server side request forgery, letting the attacker reach the cloud instance metadata service. That returned temporary credentials which had broader permissions than the application role itself. The attacker then listed and copied objects from cloud storage. The finding, later published in an OCC consent order, centred on the absence of effective internal control testing over the firewall rule set.',
    usersImpacted:
      'Capital One reported roughly 100 million individuals in the United States and Canada, made up of customers and applicants, with the total figure often cited above 100 million once both groups are combined.',
    dataAffected:
      'Names, addresses, dates of birth, bank account numbers, credit card numbers, security codes and portions of Social Security numbers, with roughly 140,000 people also affected across Social Security numbers and linked bank account numbers according to the regulatory filings.',
    impact:
      'One of the largest data breaches in US history, driven by a single misconfiguration in a perimeter control that was in place precisely to reduce risk. The settlement included a substantial penalty and the firm publicly attributed the incident to the absence of effective control design and monitoring, which is a sentence worth reading twice.',
    lesson:
      'Least privilege has to be enforced at the credential, not just at the app. A misconfigured proxy or firewall that can reach the metadata service is a full stop for a cloud deployment, and that check is a one line audit that most teams never run. Alert on metadata endpoint access, because the exploitation window here was long enough to copy a lot.',
    sources: [
      { label: 'OCC consent order news release', url: 'https://www.occ.gov/news-issuances/news-releases/2020/nr-occ-2020-101.html' },
    ],
    stats: [
      { k: 'People', v: '~100M' },
      { k: 'Vector', v: 'SSRF' },
      { k: 'Creds', v: 'Metadata' },
      { k: 'Found by', v: 'Researcher' },
    ],
  },
  {
    id: 'real-solarwinds-2020',
    kind: REAL,
    sector: 'Infrastructure monitoring',
    tier: 'Tier 1: Critical/High Risk',
    accent: '#ef4444',
    title: 'SolarWinds: the update channel itself was the attack surface',
    teaser:
      'The SUNBURST campaign pushed a backdoored component through legitimate signed Orion updates beginning in 2020, reaching an estimated 18,000 organisations that installed it, of whom a far smaller group was selected for follow on intrusion. Nine federal agencies were breached. Signed updates travelled two layers inside your trust model, and that is the part that should keep auditors awake.',
    when:
      'Campaign dated from around March 2020. Publicly disclosed December 2020. CISA issued Emergency Directive 21-01 on 13 December 2020.',
    rootCause:
      'Attackers gained access to SolarWinds build infrastructure and inserted malicious code into a widely used Orion component. Because the payload shipped through the normal, signed update channel, it bypassed the trust model most organisations rely on. The selected follow on intrusion phase used legitimate administration tooling and dormant techniques, which is why dwell time ran into months in several cases.',
    usersImpacted:
      'Roughly 18,000 organisations downloaded the backdoored update. The number actually targeted for further intrusion was far smaller, with SolarWinds and the SEC filings referring to a limited set of customers, including nine federal agencies and several large companies.',
    dataAffected:
      'Varies sharply by victim. Reported impacts included email accounts, government and legislative networks, security telemetry and source code, with some organisations describing the theft of internal investigation material. No single dataset can describe this incident.',
    impact:
      'A multi year rebuild of trust in update distribution, new national level directives on logging, and a long tail of breach notifications that took years to fully resolve. Several victims disclosed the compromise without disclosing what was actually taken, which is its own problem.',
    lesson:
      'Assume the update path can be used against you, because it has been, and design monitoring that can see it. Centralise and retain logs where a compromised internal tool cannot reach them, since attacker tooling in this campaign searched and deleted. Vendor risk review needs a question about build and signing infrastructure that most questionnaires do not ask.',
    sources: [
      { label: 'CISA Emergency Directive 21-01', url: 'https://www.cisa.gov/news-events/directives/ed-21-01-urgent-revised-mitigation-solarwinds-orion-code-compromise' },
    ],
    stats: [
      { k: 'Installed', v: '~18,000' },
      { k: 'Agencies', v: '9 federal' },
      { k: 'Vector', v: 'Updates' },
      { k: 'Dwell', v: 'Months' },
    ],
  },
  {
    id: 'real-circleci-2023',
    kind: REAL,
    sector: 'CI/CD pipelines',
    tier: 'Tier 1: Critical/High Risk',
    accent: '#f59e0b',
    title: 'CircleCI: social engineering, then everything you had',
    teaser:
      'Attackers social engineered a CircleCI employee in January 2023, stole a session, rotated secrets and exfiltrated before the intrusion was contained. The company advised every customer who had run a job since 4 January to treat their secrets as burned. This is what a pipeline vendor holds: not code, but the keys to every system your code reaches.',
    when:
      'Intrusion on 4 January 2023. CircleCI issued a security alert on 4 January and rotated secrets from 4 to 11 January.',
    rootCause:
      'An employee was targeted with a social engineering pretext, and an attacker obtained an authenticated session to CircleCI internal systems. From there they accessed customer data, including the secrets and environment variables used in build pipelines, and exfiltrated data. CircleCI subsequently described the rotation of secrets and the removal of the attacker access as the containment work.',
    usersImpacted:
      'Every customer running jobs in the affected window. The practical population at risk was engineering teams rather than end users, but the number of downstream systems reachable from a pipeline is often the largest at any given company.',
    dataAffected:
      'CI/CD secrets, environment variables, pipeline configuration and associated repository metadata. Anything present in an environment during a build was in scope, which is why the advice was to rotate rather than investigate.',
    impact:
      'A coordinated secret rotation across thousands of customers, executed under a public incident timeline. The cost to customers was engineering hours and the risk that not every secret got rotated, which is the outcome nobody can fully verify from the outside.',
    lesson:
      'Short lived, per pipeline credentials turn a vendor breach into a bounded annoyance instead of a rebuild. Know exactly what your pipeline can reach, because the vendor breach exposes everything at once rather than the worst thing individually. Ask your CI vendor how they protect internal system access from their own staff, since that was the entry point here.',
    sources: [
      { label: 'NVD: CVE-2023-36473', url: 'https://nvd.nist.gov/vuln/detail/CVE-2023-36473' },
    ],
    stats: [
      { k: 'Entry', v: 'Social eng.' },
      { k: 'Window', v: '4 to 11 Jan' },
      { k: 'Scope', v: 'All secrets' },
      { k: 'Action', v: 'Rotate' },
    ],
  },
  {
    id: 'real-okta-2023',
    kind: REAL,
    sector: 'Identity provider',
    tier: 'Tier 1: Critical/High Risk',
    accent: '#ef4444',
    title: 'Okta: the file you attached to your support ticket',
    teaser:
      'In October 2023 Okta reported a compromise of its support system affecting customers who had attached HAR files to support cases, because those recordings can contain session tokens and even plaintext passwords. Initially about 1 percent of customers, later widened to everyone using the affected support workflow. Nobody expects the screenshot to be the attack surface.',
    when:
      'Disclosed 20 October 2023, with the affected population expanded in the days that followed.',
    rootCause:
      'A support service account was compromised, granting access to a backend system used to troubleshoot customer issues. The concern was HAR files, which customers upload to reproduce problems, and which frequently contain session cookies and occasionally credentials in plain text. Because the exposure happened in a support workflow rather than the core product, existing monitoring did not cover it.',
    usersImpacted:
      'Okta initially identified a small fraction of its roughly 9,700 customers as affected, then widened the notification after further analysis. The practical impact was employees of those customers, and in some cases downstream cloud permissions reachable from the sessions in those files.',
    dataAffected:
      'Session tokens, and in some cases credentials, embedded in HAR files. Where sessions were valid and hijacked, exposure extended to whatever those sessions could reach within the customer tenancy.',
    impact:
      'A wave of downstream session revocation and forced reauthentication, concentrated on a support interaction that felt routine. The reputational cost landed on a company whose entire value proposition is trust in identity, which made the story far worse than the technical scale of it.',
    lesson:
      'Treat support attachments as sensitive data because HAR files are effectively session exports, and strip them of cookies before they leave your users. Include support workflow access in identity threat detection rather than scoping it to the core product. When an identity provider advises session revocation, do it centrally and fast, because the sessions are already out of your hands.',
    sources: [
      { label: 'NVD: CVE-2023-2867', url: 'https://nvd.nist.gov/vuln/detail/CVE-2023-2867' },
    ],
    stats: [
      { k: 'Attack', v: 'Support' },
      { k: 'Vector', v: 'HAR file' },
      { k: 'Reachable', v: 'Sessions' },
      { k: 'Fix', v: 'Revoke' },
    ],
  },
];

/** Stories of one kind, in stable editorial order. */
export function storiesOfKind(kind) {
  return VENDOR_INCIDENT_STORIES.filter((s) => s.kind === kind);
}

/**
 * Deterministic pick. A caller passes a cursor and always gets the same story
 * back, so a page reload does not reshuffle what someone is about to publish.
 */
export function storyAt(kind, cursor) {
  const pool = storiesOfKind(kind);
  if (!pool.length) return null;
  const n = Math.abs(Math.floor(cursor)) % pool.length;
  return pool[n];
}

/** Plain text for a newsletter, fields in reading order. */
export function storyToPlainText(story) {
  const lines = [
    story.title,
    '',
    story.teaser,
    '',
    ...FIELD_LABELS.map((f) => `${f.label}: ${story[f.key]}`),
    '',
    `Sector: ${story.sector}`,
    `Review tier: ${story.tier}`,
    story.kind === REAL ? 'Source: public reporting, verify before publication' : 'Composite scenario, illustrative only',
  ];
  if (story.sources?.length) {
    lines.push('', 'Sources:', ...story.sources.map((s) => `- ${s.label}: ${s.url}`));
  }
  return lines.join('\n');
}

/** Markdown for a CMS or a collaborator. */
export function storyToMarkdown(story) {
  const lines = [
    `# ${story.title}`,
    '',
    `> ${story.teaser}`,
    '',
    ...FIELD_LABELS.map((f) => `**${f.label}**\n\n${story[f.key]}`),
    '',
    `**Sector:** ${story.sector}`,
    `**Review tier:** ${story.tier}`,
  ];
  if (story.sources?.length) {
    lines.push('', '**Sources**', ...story.sources.map((s) => `- [${s.label}](${s.url})`));
  }
  return lines.join('\n');
}
