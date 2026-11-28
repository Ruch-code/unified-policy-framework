import { Link } from 'react-router-dom';
import { Layers, Siren, Shield, Globe, Key, Mail, Workflow, Lock, ArrowRight, Search, Network } from 'lucide-react';

// Network and security fundamentals: one place for defence in depth, OSI attacks, common network attacks,
// IDS and IPS, proxies, API gateways, NAT, VPN protocols, authentication methods and email authentication.
const P = 'text-sm leading-relaxed text-gray-700 dark:text-gray-300';
const H = 'mt-4 mb-1 text-sm font-semibold text-gray-900 dark:text-white';
const TH = 'p-2 text-left font-semibold text-gray-900 dark:text-white bg-gray-50 dark:bg-gray-900';
const TD = 'p-2 align-top border-t border-gray-100 dark:border-gray-700 text-gray-700 dark:text-gray-300';

function Table({ head, rows, min = 640 }) {
  return (
    <div className="overflow-x-auto my-2" tabIndex={0} role="region" aria-label={head.join(', ')}>
      <table className="w-full text-sm" style={{ minWidth: min }}>
        <thead><tr>{head.map((h) => <th key={h} scope="col" className={TH}>{h}</th>)}</tr></thead>
        <tbody>{rows.map((r) => <tr key={r[0]}>{r.map((c, j) => <td key={j} className={`${TD} ${j === 0 ? 'font-medium' : ''}`}>{c}</td>)}</tr>)}</tbody>
      </table>
    </div>
  );
}

function Flow({ steps }) {
  return (
    <ol className="flex flex-col md:flex-row md:flex-wrap gap-2 my-2">
      {steps.map((s, i) => (
        <li key={s} className="flex items-center gap-2 text-sm">
          <span className="rounded-lg border border-indigo-200 dark:border-indigo-800 bg-indigo-50 dark:bg-indigo-900/20 px-2.5 py-1.5 text-gray-800 dark:text-gray-200"><strong>{i + 1}.</strong> {s}</span>
          {i < steps.length - 1 && <ArrowRight className="hidden md:block w-4 h-4 text-gray-400" aria-hidden="true" />}
        </li>
      ))}
    </ol>
  );
}

const SECTIONS = [
  ['nf-layers', 'Seven layers of security', Layers],
  ['nf-firewall', 'How a firewall decides', Shield],
  ['nf-attacks', 'Common network attacks', Siren],
  ['nf-ids', 'IDS vs IPS', Shield],
  ['nf-proxy', 'Proxies and API gateways', Globe],
  ['nf-nat', 'NAT', Workflow],
  ['nf-dns', 'DNS record types', Search],
  ['nf-vpn', 'VPN protocols', Lock],
  ['nf-auth', 'Authentication methods', Key],
  ['nf-email', 'How email is delivered and checked', Mail],
];

function Sec({ id, title, icon: Icon, children }) {
  return (
    <details id={id} className="rounded-xl border border-gray-200 dark:border-gray-700 p-4 scroll-mt-24">
      <summary className="cursor-pointer flex items-center gap-2 font-bold text-gray-900 dark:text-white"><Icon className="w-5 h-5 text-indigo-600" aria-hidden="true" />{title}</summary>
      <div className="mt-2">{children}</div>
    </details>
  );
}

export default function NetworkFundamentals() {
  const open = (id) => { const el = document.getElementById(id); if (el) { el.open = true; el.scrollIntoView({ behavior: 'smooth' }); } };
  const S = Object.fromEntries(SECTIONS.map(([id, t, ic]) => [id, { id, title: t, icon: ic }]));
  return (
    <div className="space-y-3">
      <section className="rounded-2xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 p-5">
        <h2 className="text-xl font-bold text-gray-900 dark:text-white">Network and security fundamentals</h2>
        <p className={P}>Plain-language explainers that build on the audit tables above (network basics and devices, OSI layers with attacks, firewall types, ports, email security and cryptography). Jump to a topic:</p>
        <nav aria-label="Topics on this page" className="mt-3 flex flex-wrap gap-2">
          {SECTIONS.map(([id, t, Icon]) => (
            <button key={id} type="button" onClick={() => open(id)} className="inline-flex items-center gap-1.5 rounded-full border border-indigo-200 dark:border-indigo-800 px-3 py-1 text-xs font-medium text-indigo-700 dark:text-indigo-300 hover:bg-indigo-50 dark:hover:bg-indigo-900/30">
              <Icon className="w-3.5 h-3.5" aria-hidden="true" />{t}
            </button>
          ))}
        </nav>
        <p className="mt-3 text-xs text-gray-600 dark:text-gray-400">Related: <Link className="ui-link" to="/knowledge?topic=edp">How HTTPS works and symmetric vs asymmetric encryption</Link> · <Link className="ui-link" to="/knowledge?topic=crypto-algorithms">Cryptographic algorithms</Link> · <Link className="ui-link" to="/knowledge?topic=infra-review">VPN, allow-lists, ingress, egress and default deny</Link></p>
      </section>

      <Sec {...S['nf-layers']}>
        <p className={P}>No single control stops every attack, so controls are stacked in layers. If one fails, the next still protects you.</p>
        <Table head={['Layer', 'What it protects', 'Example controls']} rows={[
          ['Physical', 'Buildings, data centres and hardware', 'Badge access, CCTV, locked racks, visitor logs'],
          ['Perimeter', 'The edge where your network meets others', 'Firewalls, VPN gateways, DDoS protection, email gateway'],
          ['Network', 'Traffic inside the network', 'Segmentation, IDS and IPS, network access control'],
          ['Endpoint', 'Laptops, servers and mobiles', 'EDR, patching, disk encryption, device management'],
          ['Application', 'Software and APIs', 'Secure coding, WAF, code and dependency scanning, API gateway'],
          ['Data', 'Stored and transmitted data', 'Encryption, DLP, backups, access control on data'],
          ['People', 'Staff behaviour', 'Awareness training, phishing simulations, clear reporting routes'],
        ]} />
      </Sec>


      <Sec {...S['nf-firewall']}>
        <p className={P}>A firewall checks each connection against its rules and allows or blocks it. The firewall types (packet filtering, stateful, proxy, WAF, next generation) are compared in the table above; this is the decision path.</p>
        <Flow steps={['Client sends a request', 'Firewall checks source, destination, port and protocol against the rules', 'Stateful check: is this a new connection or part of an existing one?', 'Application checks where supported: URL, content, file type, intrusion signatures', 'Match an allow rule: forward. No match: default deny drops and logs it', 'Reply comes back through the firewall and is checked against the connection state']} />
        <Table head={['Inspection level', 'Checks']} rows={[
          ['Packet filtering', 'Allow or block by IP address, port, protocol, source and destination; default deny rule'],
          ['Stateful inspection', 'Tracks connection state, verifies new connections, applies timeouts, checks sequence numbers'],
          ['Application layer', 'Content inspection, URL and file type filtering, intrusion detection and prevention, anomaly detection'],
        ]} min={560} />
      </Sec>

      <Sec {...S['nf-attacks']}>
        <Table head={['Attack', 'How it works', 'Key defences']} rows={[
          ['Man in the middle (MITM)', 'The attacker sits between two parties and reads or changes traffic while both think they are talking directly.', 'TLS everywhere, certificate validation, HSTS, avoid untrusted Wi-Fi without VPN'],
          ['ARP spoofing', 'On a local network the attacker answers ARP requests with its own MAC address, so traffic meant for another device goes to the attacker.', 'Dynamic ARP inspection, segmentation, encrypted protocols'],
          ['IP spoofing', 'Packets carry a fake source IP to hide the sender or impersonate a trusted host. Common in reflection DDoS.', 'Ingress and egress filtering of spoofed addresses, do not trust IP alone'],
          ['DNS spoofing', 'A false DNS answer sends the victim to a fake server.', 'DNSSEC, trusted resolvers, TLS certificate checks'],
          ['Botnet', 'Many infected devices controlled from command-and-control servers, used for DDoS, spam or credential stuffing.', 'Patching, EDR, egress filtering to block command-and-control traffic'],
          ['Rootkit', 'Malware that hides itself in the operating system and keeps a backdoor open.', 'Secure boot, EDR, integrity monitoring, rebuild rather than clean'],
          ['DDoS', 'Traffic from many sources overwhelms a service.', 'DDoS protection service, CDN, rate limiting, capacity planning'],
        ]} min={820} />
        <h3 className={H}>Example: SSDP reflection and amplification DDoS</h3>
        <p className={P}>SSDP (Simple Service Discovery Protocol, part of Universal Plug and Play) lets devices such as cameras, printers and TVs announce themselves on a local network, using UDP port 1900. When these devices are exposed to the internet, attackers abuse them:</p>
        <Flow steps={['Attacker scans the internet for devices answering SSDP', 'Sends small discovery requests with the victim\'s IP as the fake source', 'Each device replies with a much larger response to the victim', 'The combined replies flood the victim']} />
        <p className={P}>Defences: do not expose UPnP or SSDP to the internet, block inbound UDP 1900 at the perimeter, filter spoofed source addresses, and use a DDoS protection service.</p>
      </Sec>

      <Sec {...S['nf-ids']}>
        <Table head={['', 'IDS (intrusion detection system)', 'IPS (intrusion prevention system)']} rows={[
          ['What it does', 'Watches traffic or hosts and raises alerts', 'Watches traffic and also blocks what it judges malicious'],
          ['Where it sits', 'Out of band, on a copy of traffic (network IDS) or on the host (host IDS)', 'Inline, usually behind the firewall, so traffic passes through it'],
          ['Logging', 'Detailed alerts and logs for investigation', 'Records blocks; focuses on stopping threats, so alert detail can be lighter'],
          ['Effect of a false positive', 'An unnecessary alert', 'Legitimate traffic is blocked, which can stop business services'],
          ['Typical use', 'Visibility and investigation, sensitive segments where blocking is risky', 'Stopping known attacks at the perimeter and between key segments'],
        ]} />
        <p className={P}>Many organisations run both, often as features of a next-generation firewall, and send alerts to the SIEM. Place sensors where traffic matters: behind the internet edge, in front of public services, and between user and server networks. Start an IPS in detect-only mode, tune it, then switch on blocking. Audit check: signatures are updated, alerts reach the SOC, and tuning decisions are recorded.</p>
      </Sec>

      <Sec {...S['nf-proxy']}>
        <Table head={['', 'Forward proxy', 'Reverse proxy']} rows={[
          ['Sits in front of', 'Your users', 'Your servers'],
          ['Acts on behalf of', 'Clients going out to the internet', 'Servers receiving requests from the internet'],
          ['Used for', 'Web filtering, malware scanning, egress control, logging user browsing', 'Load balancing, TLS termination, WAF, caching, hiding internal servers'],
          ['Example', 'Secure web gateway for staff', 'Load balancer or CDN in front of a website'],
        ]} />
        <h3 className={H}>API gateway</h3>
        <p className={P}>An API gateway is a specialised reverse proxy that is the single entry point for API calls. It routes each request to the right backend (microservices, databases, external APIs) and applies common controls in one place:</p>
        <Table head={['Function', 'What it does']} rows={[
          ['Authentication and authorisation', 'Checks API keys, OAuth tokens or mutual TLS before a request reaches a backend'],
          ['Rate limiting and usage plans', 'Throttles clients to stop abuse and protect capacity'],
          ['Request validation and transformation', 'Rejects malformed requests and converts formats between client and backend'],
          ['Logging and metrics', 'Records every call for monitoring, troubleshooting and audit'],
          ['Caching', 'Returns repeat responses quickly and reduces backend load'],
          ['Versioning and staging', 'Runs several API versions and test stages side by side'],
        ]} min={560} />
        <p className={P}>Audit check: no backend is reachable around the gateway, authentication is enforced on every route, and gateway logs go to the SIEM.</p>
      </Sec>

      <Sec {...S['nf-nat']}>
        <p className={P}>Network address translation (NAT) lets many devices with private IP addresses (for example 192.168.x.x) share one public IP address. The router rewrites the source address and port on the way out, records the mapping in a NAT table, and reverses it for the reply.</p>
        <Flow steps={['Laptop 192.168.3.6 sends to a web server', 'Router swaps the source to its public IP and a port', 'Mapping saved in the NAT table', 'Reply arrives at the public IP and port', 'Router looks up the table and forwards to the laptop']} />
        <p className={P}>Security notes: NAT hides internal addresses but is not a firewall; inbound connections still need explicit firewall rules. Fixed outbound NAT addresses are useful for supplier allow-lists. Keep NAT and firewall logs so you can trace a public IP and port back to the internal device during an investigation.</p>
      </Sec>

      <Sec {...S['nf-dns']}>
        <Table head={['Record', 'Purpose', 'Example', 'Security note']} rows={[
          ['A', 'Maps a name to an IPv4 address', 'www.example.com to 192.0.2.10', 'Remove records pointing to retired IPs'],
          ['AAAA', 'Maps a name to an IPv6 address', 'www.example.com to 2001:db8::10', 'Same as A'],
          ['CNAME', 'Alias from one name to another', 'shop.example.com to a hosted provider', 'Dangling CNAMEs to deleted cloud resources allow subdomain takeover'],
          ['MX', 'Mail servers for the domain', 'example.com to mail.example.com', 'Only approved mail providers'],
          ['NS', 'Authoritative name servers for the domain', 'example.com to ns1.provider.net', 'Protect the registrar account with MFA and registry lock'],
          ['TXT', 'Free text, used for verification and email policies', 'SPF, DKIM keys, DMARC, domain verification', 'Review regularly; old verification records can be removed'],
          ['PTR', 'Reverse lookup from IP to name', '192.0.2.10 to mail.example.com', 'Mail servers need matching reverse DNS'],
          ['SRV', 'Location of a service (host and port)', 'SIP or directory services', 'Expose only what external users need'],
          ['SOA', 'Zone details: primary server, admin contact, serial number', 'One per zone', 'Restrict zone transfers'],
          ['CAA', 'Which certificate authorities may issue certificates for the domain', 'example.com allows one named CA', 'Stops unapproved CAs issuing certificates'],
        ]} min={900} />
      </Sec>

      <Sec {...S['nf-vpn']}>
        <p className={P}>How a VPN works and how to secure it is in the <Link className="ui-link" to="/knowledge?topic=infra-review">Infrastructure Security Review Playbook</Link>. This table covers the protocols you will see.</p>
        <Table head={['Protocol', 'Notes', 'Use today?']} rows={[
          ['IPsec (IKEv2)', 'Standard for site-to-site and many remote access VPNs', 'Yes'],
          ['OpenVPN', 'Open source, TLS-based, widely supported', 'Yes'],
          ['WireGuard', 'Modern, small code base, fast, uses current cryptography', 'Yes'],
          ['SSL/TLS VPN', 'Runs over HTTPS (port 443), often browser or client based', 'Yes, keep the gateway patched'],
          ['SSTP', 'Microsoft protocol that tunnels over TLS', 'Mainly in Windows environments'],
          ['L2TP', 'Provides no encryption itself; used together with IPsec', 'Legacy; prefer IKEv2'],
          ['PPTP', 'Old protocol with known weaknesses', 'No, retire it'],
          ['SoftEther', 'Open source, multi-protocol VPN software', 'Possible; check it is centrally managed'],
          ['GRE and MPLS', 'Tunnelling and carrier network technologies that do not encrypt by themselves', 'Only with IPsec or another encryption layer'],
        ]} min={600} />
        <h3 className={H}>SSL/TLS VPN vs IPsec VPN</h3>
        <Table head={['', 'SSL/TLS VPN', 'IPsec VPN']} rows={[
          ['Works at', 'Transport and application layers, over HTTPS', 'Network layer: all IP traffic'],
          ['Client', 'Browser or light client', 'Installed client or a router at a remote site'],
          ['Gives access to', 'Specific applications such as web apps, email or portals', 'Whole networks or subnets'],
          ['Best for', 'Remote staff needing a few internal apps', 'Site-to-site links and full network access'],
          ['Encryption', 'TLS with modern ciphers such as AES-GCM', 'IPsec with modern ciphers such as AES-GCM; retire 3DES'],
        ]} min={700} />
        <p className={P}>Other names you will see: cloud VPN (a VPN gateway run as a cloud service) and double VPN (traffic routed through two VPN servers, mainly a consumer privacy feature).</p>
      </Sec>

      <Sec {...S['nf-auth']}>
        <Table head={['Method', 'How it works', 'Strengths', 'Watch out for']} rows={[
          ['Username and password', 'The client sends credentials over an encrypted channel; the server compares them with a stored salted hash.', 'Simple and universal', 'Phishing and reuse; always add MFA'],
          ['SSH keys', 'The client holds a private key and the server stores its public key. The server sends a challenge only the private key holder can answer, so the key itself never travels.', 'No password to steal or guess', 'Unmanaged keys, keys without passphrases, keys left after people leave'],
          ['OAuth 2.0', 'The resource owner approves access, an authorisation server issues an access token, and the app uses the token to call the resource server.', 'Apps never see the user\'s password; access can be scoped and revoked', 'Over-broad scopes, long-lived tokens, unreviewed third-party app grants'],
          ['Certificates and mutual TLS', 'The server proves its identity with a certificate issued by a certificate authority. In mutual TLS the client presents a certificate too, and each side checks the other.', 'Strong machine-to-machine authentication', 'Expired certificates, weak certificate lifecycle management'],
        ]} min={900} />
        <p className={P}>Note: OAuth 2.0 is an authorisation framework. When it is used to sign users in, OpenID Connect adds the identity layer on top.</p>
      </Sec>

      <Sec {...S['nf-email']}>
        <h3 className={H}>Delivery</h3>
        <Table head={['Component or protocol', 'Role']} rows={[
          ['Mail user agent (MUA)', 'The email app the person uses, such as Outlook or a webmail client'],
          ['SMTP submission (587 with STARTTLS, or 465)', 'The app sends the message to the sender\'s mail server, with authentication'],
          ['Mail transfer agent (MTA) and SMTP (25)', 'The sender\'s server finds the recipient\'s server from its MX record and relays the message, with STARTTLS where supported'],
          ['IMAP (993) or POP3 (995)', 'The recipient\'s app fetches the message; use the TLS versions'],
        ]} min={600} />
        <h3 className={H}>Checks on arrival</h3>
        <Flow steps={['Email arrives', 'Receiver checks SPF', 'Receiver checks DKIM signature', 'DMARC checks alignment with the From domain', 'Pass: inbox. Fail: apply the policy (none, quarantine or reject)', 'Reports sent to the domain owner']} />
        <p className={P}>What SPF, DKIM and DMARC each do, and what good looks like, is in the email security table above. Remember domains that never send mail: publish SPF -all and DMARC reject for them too.</p>
      </Sec>
    </div>
  );
}
