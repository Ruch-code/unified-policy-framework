// Common cryptographic algorithms: each one is a collapsible card with a flow chart, pros and cons, and where it is used.
import { Flow, Note } from './TopicExtras.jsx';

const H = 'text-gray-900 dark:text-white';
const TXT = 'text-gray-700 dark:text-slate-300';
const BOX = 'rounded-2xl border border-gray-200 dark:border-slate-700 bg-white dark:bg-[#1e293b] p-4 group';
const SUM = `cursor-pointer list-none flex items-start justify-between gap-3 font-bold ${H}`;

const ALGORITHMS = [
  {
    family: 'Symmetric',
    items: [
      {
        id: 'aes-128',
        name: 'AES-128 (GCM mode)',
        tag: 'Symmetric block cipher, 128-bit key',
        summary: 'AES with a 128-bit key and 10 rounds. In GCM mode it encrypts and authenticates in one pass (AEAD), so tampering is detected before any plaintext is returned.',
        flow: [
          ['Key and nonce', 'A 128-bit secret key shared by both sides, plus a unique 96-bit nonce for every message.'],
          ['Counter keystream', 'AES encrypts an incrementing counter block (nonce + counter) to produce a keystream.'],
          ['XOR with plaintext', 'Plaintext is XORed with the keystream to give ciphertext of the same length.'],
          ['GHASH tag', 'Ciphertext and any associated data (headers) are hashed with GHASH to make a 128-bit authentication tag.'],
          ['Decrypt and verify', 'Receiver recomputes the tag; if it does not match, the message is rejected and nothing is decrypted.'],
        ],
        pros: ['Very fast, with AES-NI hardware acceleration on almost every modern CPU', 'Authenticated encryption: confidentiality and integrity together', 'Still secure against all known practical attacks; approved in FIPS 140-3 and most frameworks', 'Smaller key and fewer rounds than AES-256, so slightly quicker'],
        cons: ['Reusing a nonce with the same key is catastrophic: it leaks plaintext XORs and lets an attacker forge tags', 'Lower margin against future quantum attacks (Grover reduces it to about 64-bit strength)', 'Some policies (CNSA, certain government data) require 256-bit keys', 'Slow on devices without AES hardware support, and software versions risk timing side channels'],
        use: 'TLS 1.2 and 1.3 cipher suites, VPNs, general application data where AES-256 is not mandated.',
      },
      {
        id: 'aes-256',
        name: 'AES-256 (GCM mode)',
        tag: 'Symmetric block cipher, 256-bit key',
        summary: 'Same design as AES-128 but with a 256-bit key and 14 rounds. The default answer for "encryption at rest" in SOC 2, ISO 27001, HIPAA and PCI DSS evidence.',
        flow: [
          ['KMS issues data key', 'A 256-bit data key is generated, usually by a KMS, and itself wrapped by a master key (envelope encryption).'],
          ['Nonce per message', 'A unique 96-bit nonce is chosen for each encryption with that key.'],
          ['14 rounds of AES', 'Counter blocks are encrypted through 14 rounds of substitution, permutation and key mixing to make the keystream.'],
          ['Ciphertext + tag', 'Plaintext is XORed with the keystream and a GHASH tag is computed over ciphertext and associated data.'],
          ['Store or send', 'Ciphertext, nonce, tag and the wrapped data key are stored together; the plaintext key is discarded from memory.'],
        ],
        pros: ['Largest security margin of the common ciphers, and considered quantum-resistant at about 128-bit post-quantum strength', 'Meets the strictest requirements (CNSA, government Top Secret, most customer questionnaires)', 'Hardware accelerated, so the cost over AES-128 is small (about 40 percent more rounds)', 'Universally supported by cloud KMS, databases and storage services'],
        cons: ['Same nonce-reuse risk as any GCM use', 'GCM limits: rotate keys before about 2^32 messages per key with random nonces', 'Encryption is only as strong as key management; a leaked key defeats it', 'Slightly slower than AES-128 and ChaCha20 on low-end hardware'],
        use: 'Encryption at rest (S3, EBS, RDS, Azure Storage, GCS), backups, disk encryption (BitLocker, FileVault use AES in XTS mode), TLS.',
      },
      {
        id: 'chacha20',
        name: 'ChaCha20-Poly1305',
        tag: 'Symmetric stream cipher + MAC, 256-bit key',
        summary: 'A stream cipher (ChaCha20) paired with a one-time authenticator (Poly1305). Built only from add, rotate and XOR, so it is fast and constant-time in plain software.',
        flow: [
          ['Key and nonce', 'A 256-bit key and a unique 96-bit nonce (XChaCha20 uses 192-bit nonces, safe to pick at random).'],
          ['Poly1305 key', 'Block 0 of the ChaCha20 keystream is used to derive a one-time Poly1305 authentication key.'],
          ['20 rounds keystream', 'Each 64-byte block runs 20 rounds of add, rotate, XOR (ARX) over the key, nonce and counter.'],
          ['XOR with plaintext', 'Plaintext is XORed with the keystream to produce ciphertext.'],
          ['Poly1305 tag', 'A 128-bit tag over ciphertext and associated data; the receiver verifies it before decrypting.'],
        ],
        pros: ['Faster than AES on phones, IoT and CPUs without AES hardware', 'Naturally constant-time, so resistant to cache-timing side channels', 'Simple design that is easy to implement correctly', 'Standard in TLS 1.3, WireGuard, SSH and Signal'],
        cons: ['Same nonce-reuse danger as AES-GCM (XChaCha20 reduces it)', 'Not FIPS 140 approved, which matters for FedRAMP, some US government and regulated customers', 'Slower than AES-GCM on servers that have AES-NI', 'Less familiar to auditors; may need explaining in evidence'],
        use: 'Mobile and browser TLS, WireGuard VPN, SSH, messaging apps, embedded devices.',
      },
    ],
  },
  {
    family: 'Asymmetric',
    items: [
      {
        id: 'rsa',
        name: 'RSA',
        tag: 'Asymmetric, based on factoring large integers',
        summary: 'A public/private key pair where the public key encrypts or verifies and the private key decrypts or signs. Security rests on the difficulty of factoring the product of two large primes.',
        flow: [
          ['Key generation', 'Pick two large primes p and q; n = p x q (2048 bits or more). Public key (n, e), private key d.'],
          ['Share public key', 'Public key is published, usually inside an X.509 certificate signed by a CA.'],
          ['Encrypt (OAEP)', 'Sender pads the message with OAEP and computes ciphertext = m^e mod n. In practice this only wraps a symmetric key.'],
          ['Decrypt', 'Private key holder computes m = c^d mod n and removes the padding.'],
          ['Sign (PSS)', 'For signatures, the hash of the message is signed with d; anyone verifies with e.'],
        ],
        pros: ['Supported everywhere: certificates, HSMs, code signing, legacy systems', 'One algorithm does both encryption and signatures', 'Signature verification is very fast', 'Well studied for over 45 years'],
        cons: ['Large keys: 2048-bit minimum, 3072-bit for use past 2030 (NIST)', 'Slow key generation and private-key operations compared with elliptic curves', 'RSA key exchange has no forward secrecy (removed from TLS 1.3)', 'Padding mistakes (PKCS#1 v1.5) have led to real attacks; broken by a large quantum computer (Shor)'],
        use: 'TLS certificates, code and document signing, SSH keys on older systems, key wrapping in KMS and HSMs.',
      },
      {
        id: 'ecdhe',
        name: 'ECDHE (key exchange)',
        tag: 'Elliptic Curve Diffie-Hellman Ephemeral',
        summary: 'Two parties agree on a shared secret over an open network without ever sending it. "Ephemeral" means a fresh key pair every session, which gives forward secrecy.',
        flow: [
          ['Agree curve', 'Client and server agree a curve, typically X25519 or P-256.'],
          ['Fresh key pairs', 'Each side generates a new random private key and computes its public point for this session only.'],
          ['Exchange public points', 'Public points are sent in the clear (ClientHello / ServerHello key_share in TLS 1.3).'],
          ['Compute shared secret', 'Each side multiplies the other\'s public point by its own private key; both get the same secret.'],
          ['Derive keys and discard', 'HKDF turns the secret into AES or ChaCha20 session keys; the ephemeral private keys are deleted.'],
        ],
        pros: ['Forward secrecy: stealing the server\'s long-term key later cannot decrypt past sessions', 'Small keys (256-bit) with strength similar to 3072-bit RSA', 'Fast, with only one round trip in TLS 1.3', 'Mandatory in TLS 1.3, so it is the default for modern traffic'],
        cons: ['Does not authenticate anyone by itself; needs a signature (RSA, ECDSA, Ed25519) to stop man-in-the-middle', 'Ephemeral keys make passive decryption for inspection or debugging harder', 'Broken by a large quantum computer, so hybrid post-quantum exchange (X25519 + ML-KEM) is being rolled out', 'Weak curves or poor random numbers break it'],
        use: 'Every TLS 1.3 handshake, SSH, WireGuard, Signal, IPsec IKEv2.',
      },
      {
        id: 'ecdsa',
        name: 'ECDSA (signatures)',
        tag: 'Elliptic Curve Digital Signature Algorithm',
        summary: 'Proves a message came from the holder of a private key and was not altered. Uses NIST curves such as P-256 and P-384.',
        flow: [
          ['Key pair', 'Private key is a random number d; public key Q = d x G on the curve (P-256 or P-384).'],
          ['Hash message', 'The message is hashed with SHA-256 or SHA-384.'],
          ['Random nonce k', 'A secret per-signature value k is generated (RFC 6979 derives it deterministically).'],
          ['Produce (r, s)', 'r comes from k x G; s combines the hash, d, r and k. The signature is the pair (r, s).'],
          ['Verify', 'Anyone with Q recomputes a curve point from the hash and (r, s) and checks it matches r.'],
        ],
        pros: ['Small keys and signatures (64 bytes for P-256) versus RSA', 'FIPS approved and widely supported in certificates, HSMs and cloud KMS', 'Faster signing than RSA', 'Standard in Web PKI, code signing and blockchains'],
        cons: ['Reusing or leaking the nonce k exposes the private key (the PlayStation 3 and several wallet breaches)', 'Complex to implement safely; side channels are common', 'Verification is slower than RSA', 'Broken by a large quantum computer (move to ML-DSA over time)'],
        use: 'ECDSA TLS certificates, AWS KMS signing, JWT ES256 tokens, Bitcoin and Ethereum transactions.',
      },
      {
        id: 'ed25519',
        name: 'Ed25519 (signatures)',
        tag: 'EdDSA on Curve25519',
        summary: 'A modern signature scheme designed to be fast and hard to misuse. The nonce is derived from the key and message, so the ECDSA nonce failure cannot happen.',
        flow: [
          ['Key pair', '32-byte random seed is hashed with SHA-512 to make the private scalar; public key is a 32-byte curve point.'],
          ['Deterministic nonce', 'Nonce r = hash(private prefix + message), so no random number generator is needed per signature.'],
          ['Compute R', 'R = r x B, where B is the curve base point.'],
          ['Compute S', 'S = r + hash(R, public key, message) x private scalar. Signature is (R, S), 64 bytes.'],
          ['Verify', 'Check S x B equals R + hash(R, A, M) x A; one equation, constant time.'],
        ],
        pros: ['Very fast signing and verification', 'Deterministic: immune to bad-random-number key leaks', 'Constant-time by design, resisting side-channel attacks', 'Tiny keys (32 bytes) and signatures (64 bytes); now FIPS 186-5 approved'],
        cons: ['Support in older HSMs, PKI and enterprise tools is still catching up', 'Fewer public CAs issue Ed25519 TLS certificates', 'Signatures only; it does not encrypt', 'Broken by a large quantum computer, like all elliptic curve schemes'],
        use: 'SSH keys (ssh-keygen -t ed25519), Git commit signing, WireGuard, Signal, package and container signing (Sigstore, minisign).',
      },
    ],
  },
];

function ProsCons({ pros, cons }) {
  return (
    <div className="grid sm:grid-cols-2 gap-3">
      <div className="rounded-lg border border-emerald-200 bg-emerald-50 dark:bg-emerald-900/20 dark:border-emerald-800 p-3">
        <p className="text-sm font-bold text-emerald-800 dark:text-emerald-300">Pros</p>
        <ul className="mt-1 list-disc pl-5 text-sm text-emerald-900 dark:text-emerald-100 space-y-1">{pros.map((p) => <li key={p}>{p}</li>)}</ul>
      </div>
      <div className="rounded-lg border border-red-200 bg-red-50 dark:bg-red-900/20 dark:border-red-800 p-3">
        <p className="text-sm font-bold text-red-800 dark:text-red-300">Cons</p>
        <ul className="mt-1 list-disc pl-5 text-sm text-red-900 dark:text-red-100 space-y-1">{cons.map((c) => <li key={c}>{c}</li>)}</ul>
      </div>
    </div>
  );
}

function Algorithm({ a }) {
  return (
    <details className={BOX} id={`algo-${a.id}`}>
      <summary className={SUM}>
        <span>
          <span className="block">{a.name}</span>
          <span className="block text-xs font-normal text-gray-500 dark:text-slate-400">{a.tag}</span>
        </span>
        <span aria-hidden="true" className="text-gray-400 transition-transform group-open:rotate-90">▶</span>
      </summary>
      <div className="mt-3 space-y-4">
        <p className={`text-sm ${TXT}`}>{a.summary}</p>
        <div>
          <p className={`text-sm font-bold mb-2 ${H}`}>How it works</p>
          <Flow label={`${a.name} flow`} steps={a.flow} />
        </div>
        <ProsCons pros={a.pros} cons={a.cons} />
        <p className={`text-sm ${TXT}`}><span className={`font-semibold ${H}`}>Where you see it: </span>{a.use}</p>
      </div>
    </details>
  );
}

export default function CryptoAlgorithms() {
  return (
    <div className="space-y-6">
      <div className="rounded-2xl border border-indigo-100 bg-indigo-50 dark:bg-indigo-900/30 dark:border-indigo-800 p-4 text-sm text-indigo-900 dark:text-indigo-200">
        Symmetric algorithms use one shared key and do the bulk encryption. Asymmetric algorithms use a key pair to agree that shared key (ECDHE) and to prove identity (RSA, ECDSA, Ed25519). A TLS 1.3 connection uses both: ECDHE to agree keys, a certificate signature to authenticate the server, then AES-GCM or ChaCha20-Poly1305 for the data. Open any card for its flow chart and pros and cons.
      </div>
      {ALGORITHMS.map((g) => (
        <section key={g.family}>
          <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">{g.family}</h3>
          <div className="space-y-3">{g.items.map((a) => <Algorithm key={a.id} a={a} />)}</div>
        </section>
      ))}
      <Note>Audit tip: auditors usually ask for the cipher configuration (TLS scan or load balancer policy), KMS key rotation settings and a key management procedure. Name the algorithm and key length in policy, for example "AES-256-GCM at rest, TLS 1.2+ with ECDHE in transit".</Note>
    </div>
  );
}
