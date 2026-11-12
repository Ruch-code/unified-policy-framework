// Infrastructure and network security audit guide.
// Generic content: no client or employer names.

export const INTRO =
  'What to ask, what to inspect and what good looks like when auditing core infrastructure and network controls. Each section pairs the concept with the audit questions and the evidence to request.';

export const ASSET_INVENTORY = [
  ['Hardware', 'Network appliances (routers, switches, wireless APs), security devices (firewalls, log collectors), servers (physical, virtual, cloud), endpoints (laptops, desktops, mobiles, peripherals)', 'Is every device in a discovery scan of the IP range also in the inventory? Is each asset tagged to an owner?'],
  ['Software', 'Applications that directly support operations, plus supporting web, database, policy and access-control software, with manufacturer, version and dependencies', 'Are versions current and supported? Are end-of-life items on a risk register with an exception?'],
  ['Lifecycle', 'Procurement, change of owner, return for repair, disposal', 'Is reconciliation done monthly or quarterly? On disposal, is media wiped or degaussed and a destruction certificate retained?'],
];

export const NETWORK_BASICS = [
  ['LAN', 'Network within a limited area such as a floor or building.'],
  ['WAN', 'Connects geographically separate networks over long distances.'],
  ['Hub', 'Layer 1 device that repeats traffic to every port. Rare in corporate networks today.'],
  ['Switch', 'Layer 2 device that learns MAC addresses and forwards frames only to the right port. Supports VLANs to split broadcast domains.'],
  ['Router', 'Layer 3 device that forwards packets between networks using IP addresses and chooses the best path.'],
];

export const OSI_TCPIP = [
  ['7 Application', 'Application (TCP/IP layer 4)', 'HTTP, DNS, SMTP', 'WAF, application-level / proxy firewall, web filtering'],
  ['6 Presentation', 'Application', 'Data format, encryption, compression (TLS is often placed here conceptually)', 'Content inspection'],
  ['5 Session', 'Application', 'Session set-up and teardown', 'Circuit-level gateway'],
  ['4 Transport', 'Transport (TCP/IP layer 3)', 'TCP, UDP, ports', 'Stateful firewall, port rules'],
  ['3 Network', 'Internet (TCP/IP layer 2)', 'IPv4, IPv6, ICMP', 'Packet-filtering firewall, ACLs on routers'],
  ['2 Data link', 'Network access (TCP/IP layer 1)', 'Ethernet, MAC addresses, VLANs', 'Port security, 802.1X'],
  ['1 Physical', 'Network access', 'Cables, radio', 'Physical security'],
];

export const FIREWALL_TYPES = [
  ['Packet filtering', 'Layer 3 and 4', 'Allows or denies by source/destination IP, port and protocol using ACLs. Fast but has no session awareness.'],
  ['Circuit-level gateway', 'Layer 5', 'Validates the TCP handshake and session. Traffic appears to come from the gateway.'],
  ['Stateful inspection', 'Layer 3 and 4', 'Keeps a state table of connections. Return traffic is allowed only if it matches an established session (for example a DNS reply matching an internal query).'],
  ['Application-level / proxy', 'Up to layer 7', 'Sits between client and server, understands the protocol and can block actions (for example FTP "put") or file types such as executables.'],
  ['Web application firewall (WAF)', 'Layer 7', 'Protects web apps from SQL injection, XSS and similar. Uses OWASP Core Rule Set or custom rules. Network, host or cloud-delivered. Actions: allow, alert, block.'],
  ['Next-generation (NGFW)', 'Layers 3 to 7', 'Stateful firewall plus application awareness, user identity, IPS and threat intelligence.'],
  ['Personal / host-based', 'Endpoint', 'Runs on the laptop or server and filters inbound and outbound traffic, useful when the device is off the corporate network.'],
];

export const FIREWALL_AUDIT = [
  ['Placement', 'Where are firewalls placed (perimeter, between zones, in front of the DMZ, cloud security groups)? Is there a current network diagram?', 'Network diagram, firewall inventory'],
  ['Rule review', 'Are rules reviewed periodically (commonly every 6 months for PCI DSS, at least annually elsewhere)? Who signs off?', 'Last rule review record with reviewer and actions'],
  ['Change control', 'Do rule changes go through the change process with approval, testing and a back-out plan? Is anything automated?', 'Sample of change tickets matched to rule changes'],
  ['Overly permissive rules', 'Any "any/any" source, destination or service rules? Insecure services such as Telnet, FTP or plain HTTP allowed inbound?', 'Rule export with flagged rules and justification'],
  ['Unused rules', 'Hit counts show when a rule was last used. Zero-hit rules should be removed or justified.', 'Hit-count report'],
  ['Default deny', 'Is the final rule an explicit deny all, with logging?', 'Rule base export'],
  ['Patching', 'Is firewall firmware patched as vendor releases come out?', 'Firmware version vs vendor advisories'],
  ['Logging and monitoring', 'Are firewall logs sent to the SIEM and reviewed? Inbound and outbound (egress) both in scope?', 'SIEM source list, sample alerts'],
];

export const TRAFFIC_CHECKS = [
  ['Source and destination', 'Is the source IP legitimate and the destination authorised to receive the traffic?'],
  ['Port analysis', 'Is the port needed for the service? Is the secure version used (443 over 80)?'],
  ['Rules and ACLs', 'Does an approved rule permit this traffic?'],
  ['Protocol inspection', 'Deep packet inspection confirms the protocol matches the service and encryption is in place.'],
  ['IDS / IPS', 'Is traffic monitored for known attack patterns with real-time alerts and automatic blocking?'],
  ['Ingress and egress filtering', 'Ingress blocks unwanted inbound traffic. Egress controls what leaves, for example blocking outbound connections to unknown FTP servers.'],
];

export const PORTS = [
  ['20 / 21', 'FTP (data / control)', 'Plaintext, credentials exposed. Replace with SFTP (22) or FTPS.'],
  ['22', 'SSH / SFTP', 'Encrypted. Restrict source IPs, use keys, disable root login.'],
  ['23', 'Telnet', 'Plaintext. Should not be allowed.'],
  ['25', 'SMTP (server to server)', 'Spoofing and relay risk if not secured. Use STARTTLS.'],
  ['53', 'DNS (UDP and TCP)', 'Restrict to approved resolvers to limit DNS tunnelling.'],
  ['80', 'HTTP', 'Plaintext. Redirect to 443.'],
  ['143 / 993', 'IMAP / IMAPS', 'Use 993 (TLS).'],
  ['443', 'HTTPS', 'Encrypted with TLS. Enforce TLS 1.2 or higher.'],
  ['465 / 587', 'SMTP submission (TLS / STARTTLS)', 'Client mail submission with authentication.'],
  ['3389', 'RDP', 'Never expose to the internet. Use VPN or bastion with MFA.'],
  ['8080', 'HTTP alternate', 'Often used by proxies and test servers. Check why it is open.'],
];

export const EMAIL_SECURITY = [
  ['SPF', 'DNS TXT record listing the servers allowed to send mail for the domain.', 'Record exists, ends in -all or ~all, no more than 10 DNS lookups.'],
  ['DKIM', 'Sending server signs mail with a private key; receiver checks the signature with the public key in DNS. Proves the message was not altered.', 'Selector published, key at least 2048-bit, rotated.'],
  ['DMARC', 'Tells receivers what to do when SPF or DKIM fails and the domain does not align: none, quarantine or reject. Sends reports to the owner.', 'Policy at p=quarantine or p=reject (p=none is monitoring only), rua reporting address set.'],
  ['Secure email gateway', 'Filters inbound mail for malware, phishing, spam and risky attachments.', 'Gateway in front of mail server or cloud-native equivalent; quarantine reports.'],
  ['Transport encryption', 'TLS between mail servers and to clients.', 'TLS 1.2 or higher enforced, older versions disabled.'],
  ['Account protection', 'MFA on mailboxes, no legacy authentication, generic error messages on failed login so attackers cannot confirm valid users.', 'IdP conditional access export'],
];

export const DEFENCE_IN_DEPTH = [
  ['Network segregation', 'Separate production, test and development into different VLANs or VPCs. Block lateral movement between them and restrict who reaches test data. Small organisations may use cloud accounts or projects instead of VLANs.', 'Network diagram, security group / ACL rules between segments'],
  ['DMZ', 'A subnet between two firewalls (or two firewall zones) that hosts internet-facing servers such as web, mail relay and reverse proxies, so the internal LAN is never reached directly from the internet.', 'DMZ rule set showing no direct inbound path to the LAN'],
  ['VPN', 'Encrypts traffic between a remote user or site and the network. Site-to-site (gateway-to-gateway) links offices; remote access (host-to-gateway) connects users. Common protocols: IPsec (layer 3) and SSL/TLS. Authentication via RADIUS or LDAP / directory, with MFA.', 'VPN config, MFA enforcement, split-tunnel decision and justification'],
  ['Split tunnelling', 'Only corporate traffic goes through the VPN; other traffic (for example collaboration tools) goes direct. Reduces load but weakens inspection, so it needs a documented risk decision.', 'Approved exception list'],
  ['Bastion host', 'Hardened jump server that is the only way into sensitive systems. Must have MFA, role-based access, strong SSH key management and full session logging.', 'Access list, MFA config, session logs'],
  ['Anti-malware / EDR', 'EDR monitors endpoint behaviour, detects threats and can isolate a device. Check coverage across all OS types, automatic signature updates (at least daily), scheduled scans, tamper protection, and an approved exception for any unsupported legacy system.', 'Console coverage report vs asset inventory, update status, exception sign-offs'],
  ['Web filtering / secure web gateway', 'Blocks malicious and restricted categories. Category choices depend on business need and must be approved.', 'Category policy, block logs'],
  ['DLP', 'Endpoint (USB, uploads), network and email channels. Alerts go to the SOC and personal-data incidents to the privacy team.', 'DLP policy, sample alert and its handling, log retention'],
];

export const WIRELESS = [
  ['Guest Wi-Fi', 'Internet only, isolated from the corporate network, captive portal or rotating password.'],
  ['Corporate Wi-Fi', 'WPA2-Enterprise or WPA3 with 802.1X and certificate or directory authentication. WEP and WPA (TKIP) must not be used.'],
  ['Audit check', 'Can a guest device reach any internal IP? Are rogue access points scanned for?'],
];

export const CRYPTO = [
  ['Encoding', 'Reversible format change for transport or storage, no secret (Base64, ASCII, Unicode). Not a security control.'],
  ['Hashing', 'One-way fixed-length digest used for integrity and password storage (SHA-256; bcrypt or Argon2 for passwords). Cannot be reversed.'],
  ['Encryption', 'Reversible with a key, protects confidentiality. Symmetric: AES. Asymmetric: RSA, ECC. Diffie-Hellman is a key exchange method, not data encryption.'],
  ['Data in transit', 'TLS 1.2 or higher (HTTPS), SSH / SFTP, IPsec for VPNs.'],
  ['Data at rest', 'AES-256 at disk, database or application level. Keys held in a KMS or HSM (for example a cloud key vault), with rotation and restricted access.'],
  ['Digital signature', 'Hash signed with a private key. Proves origin and integrity, not confidentiality.'],
];

export const VULN_VS_PENTEST = [
  ['Goal', 'Find known weaknesses (CVEs, missing patches, misconfigurations) at scale', 'Prove whether weaknesses can be exploited to reach critical assets ("crown jewels")'],
  ['Method', 'Automated tool', 'Manual testing by skilled testers, helped by tools'],
  ['Frequency', 'At least quarterly; continuous for internet-facing assets', 'At least annually and after major change'],
  ['Variants', 'Authenticated (credentialed, deeper, fewer false positives) and unauthenticated (attacker view from outside)', 'Black box (no knowledge), grey box (partial, such as a user account), white box (full knowledge)'],
  ['Output', 'Findings assigned to owners and fixed within SLA', 'Report with exploited paths, risk rating, retest'],
];

export const TEAMS = [
  ['Red team', 'Offensive. Simulates a real adversary, including social engineering and physical access.'],
  ['Blue team', 'Defensive. Detects and responds (SOC).'],
  ['Purple team', 'Red and blue working together to improve detections.'],
  ['Honeypot', 'Decoy system that draws attackers away from real assets and reveals their techniques.'],
];

export const BUG_BOUNTY = [
  ['Public vs private', 'Public programmes are open to anyone. Private programmes are invite-only. Both normally pay rewards; a vulnerability disclosure programme (VDP) is the no-payment version.'],
  ['Common rules', 'Stay in scope, no DoS, no social engineering, no access to other users\' data, report privately, no public disclosure without approval.'],
  ['Why it helps', 'Finds business-logic flaws (for example a transfer of a negative amount) that scanners miss.'],
];

export const APPSEC = [
  ['SAST', 'Analyses source or compiled code without running it. Runs early, in the IDE or CI pipeline.'],
  ['DAST', 'Tests the running application from outside, finds runtime issues such as XSS, SQL injection and misconfigured headers. Runs against test or staging.'],
  ['SDLC gates', 'Design review and threat model, secure coding, unit and regression tests, SAST / SCA in CI, DAST before release, approved change to production.'],
];

export const THREAT_MODELS = [
  ['STRIDE', 'Spoofing, Tampering, Repudiation, Information disclosure, Denial of service, Elevation of privilege. Per component or data flow.'],
  ['PASTA', 'Process for Attack Simulation and Threat Analysis. Seven risk-centric stages tied to business impact.'],
  ['OCTAVE', 'Organisation-level, asset and risk focused, run by internal teams.'],
  ['VAST', 'Visual, Agile and Simple Threat modelling. Scales across agile teams.'],
  ['Threat intelligence', 'Feeds and sector sharing on emerging threats, used to update detection playbooks and awareness campaigns.'],
];

export const OPS = [
  ['Patch management', 'Central tooling pushes or devices pull patches (for example Microsoft Intune / Autopatch or Configuration Manager for Windows, Jamf for macOS). Patches tested first, released through change control, emergency process for actively exploited zero-days.', 'Patch compliance report, SLA by severity'],
  ['Configuration management', 'Systems built to a hardening baseline such as CIS Benchmarks. Deviations documented and approved; legacy systems get a formal exception.', 'Baseline, compliance scan results, exception register'],
  ['DoS / DDoS', 'DoS exhausts a resource from one source; DDoS uses many sources. Controls: ISP or cloud scrubbing, CDN, WAF, rate limiting, authentication, monitoring.', 'DDoS service contract, rate-limit config'],
  ['Discovery scans', 'Map the network for unknown devices and open ports.', 'Scan output reconciled to inventory'],
  ['Identity and access', 'Interactive (human) and non-interactive (service accounts, cron jobs). Joiners get role-based "birthright" access only. Review privileged and local accounts, apply least privilege and zero trust.', 'Access review, privileged account list'],
  ['Data classification', 'Interview data owners, classify with a scheme (for example Public, Internal, Confidential, Restricted), apply labels, use discovery tools to find sensitive data in structured and unstructured stores.', 'Classification policy, label coverage report'],
  ['Data retention', 'Logs and data kept for a defined period, then deleted manually or by automated job, in line with law and contracts. Backups tested.', 'Retention schedule, deletion job evidence'],
];

export const BCDR = [
  ['RTO', 'Recovery Time Objective: the maximum acceptable time to restore a service after disruption.'],
  ['RPO', 'Recovery Point Objective: the maximum acceptable data loss, measured in time back to the last good copy.'],
  ['BCP', 'Organisation-wide plan to keep critical business functions running during and after disruption.'],
  ['DRP', 'Subset of the BCP focused on restoring IT systems and data.'],
  ['Tiering', 'Not every system needs the same recovery level. Set RTO / RPO from a business impact analysis.'],
  ['Cloud / SaaS', 'Shared responsibility: confirm the provider\'s resilience (SOC 2, uptime history) and plan for your part, such as backups of SaaS data.'],
  ['Testing', 'Restore tests and tabletop exercises at least annually, with lessons learned tracked.'],
];

export const PHISHING = [
  ['Greed or excitement', '"You have won a prize." Unexpected reward pushes a click.'],
  ['Urgency or fear', '"Your password expires today." Panic stops the user checking the sender.'],
  ['Compassion', 'Fake charity appeals asking for donations or card details.'],
  ['Authority', '"This is the CEO, process this payment now." Business email compromise.'],
  ['Metrics', 'Track both click rate (lower is better) and report rate (higher is better). A rising report rate shows a healthy security culture.'],
];

export const RISK_REGISTER = [
  ['Risk ID', 'Unique reference'],
  ['Description', 'Threat, vulnerability and affected asset'],
  ['Category', 'Operational, financial, compliance, technology, etc.'],
  ['Likelihood and impact', 'Rated on a defined scale'],
  ['Inherent and residual score', 'Before and after controls'],
  ['Owner', 'Accountable person'],
  ['Treatment', 'Mitigate, transfer (for example insurance), avoid or accept'],
  ['Status and dates', 'Identified, last reviewed, target date'],
];

export const RISK_STEPS = [
  ['1', 'Define scope and identify assets'],
  ['2', 'Identify threats (internal and external) and vulnerabilities'],
  ['3', 'Assess existing controls'],
  ['4', 'Rate likelihood and impact to get a risk score'],
  ['5', 'Compare the score with risk appetite: below it, accept; above it, treat'],
  ['6', 'Choose treatment and controls (technical such as MFA, administrative such as policy, physical such as CCTV or biometrics)'],
  ['7', 'Document, monitor and review on a set cycle'],
];

export const QUANT = [
  ['SLE', 'Single Loss Expectancy = Asset Value x Exposure Factor'],
  ['ARO', 'Annualised Rate of Occurrence = expected number of events per year'],
  ['ALE', 'Annualised Loss Expectancy = SLE x ARO. Compare with the yearly cost of a control to justify spend.'],
];

export const INSECURE_PORTS = [
  ['20 / 21', 'FTP', 'Sends files and credentials in plaintext', 'SFTP (22) or FTPS (990)'],
  ['23', 'Telnet', 'Plaintext remote login, credentials sniffable', 'SSH (22)'],
  ['25', 'SMTP (no TLS)', 'Plaintext mail, open relay and spoofing risk', 'SMTP with STARTTLS (25 / 587) or SMTPS (465)'],
  ['53', 'DNS', 'Unencrypted; abused for tunnelling and amplification DDoS', 'Restrict to approved resolvers; DNS over TLS (853) or HTTPS (443)'],
  ['69', 'TFTP', 'No authentication at all', 'SFTP (22)'],
  ['80', 'HTTP', 'Plaintext web traffic, session hijacking', 'HTTPS (443) with redirect and HSTS'],
  ['110', 'POP3', 'Plaintext mailbox login', 'POP3S (995)'],
  ['137-139, 445', 'NetBIOS / SMB', 'Ransomware and worm target (for example WannaCry); never internet-facing', 'Block at perimeter; SMBv3 with encryption internally, SMBv1 disabled'],
  ['143', 'IMAP', 'Plaintext mailbox login', 'IMAPS (993)'],
  ['161 / 162', 'SNMP v1 / v2c', 'Community strings sent in plaintext', 'SNMPv3 with authentication and encryption'],
  ['389', 'LDAP', 'Directory binds in plaintext', 'LDAPS (636) or LDAP with StartTLS'],
  ['1433 / 3306 / 5432', 'Databases (SQL Server, MySQL, PostgreSQL)', 'Should never be reachable from the internet', 'Private network only, TLS enforced'],
  ['3389', 'RDP', 'Brute force and exploit target when exposed', 'VPN or bastion with MFA; Network Level Authentication'],
  ['8080', 'HTTP alternate', 'Often a forgotten proxy, admin or test server', 'Close or move behind HTTPS'],
];

export const SECURE_PORTS = [
  ['22', 'SSH / SFTP', 'Encrypted shell and file transfer', 'Key-based auth, no root login, restrict source IPs'],
  ['443', 'HTTPS', 'TLS-encrypted web traffic', 'TLS 1.2 or higher, weak ciphers disabled'],
  ['465 / 587', 'SMTPS / SMTP submission', 'Authenticated, encrypted mail sending', 'Enforce authentication and TLS'],
  ['636', 'LDAPS', 'Encrypted directory queries', 'Valid certificates'],
  ['853', 'DNS over TLS', 'Encrypted DNS lookups', 'Approved resolvers only'],
  ['989 / 990', 'FTPS', 'FTP over TLS', 'Prefer SFTP where possible'],
  ['993', 'IMAPS', 'Encrypted mailbox access', 'MFA on mailbox'],
  ['995', 'POP3S', 'Encrypted mailbox download', 'MFA on mailbox'],
  ['500 / 4500 (UDP)', 'IPsec VPN (IKE / NAT-T)', 'Encrypted site-to-site or remote access', 'Strong ciphers, MFA for users'],
];

export const PORT_NOTE =
  'A port is not secure on its own: an encrypted port is only as safe as its TLS version, authentication and who can reach it. Audit rule: insecure ports should be closed or justified with a documented exception, and every open port should map to a business need.';
