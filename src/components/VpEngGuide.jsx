import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { PARTS, HOW, RUBRIC_SCALE, QUESTIONS, SCENARIOS, K8S, ACCESS, LAST_ROUND } from '../data/vpEngGuide.js';

// Knowledge Base topic: interview guide for a VP of Engineering assessing a Lead GRC candidate.
export const VPG_PARTS = PARTS;
const CARD = 'rounded-2xl border border-surface-200 dark:border-surface-dark-200 bg-white dark:bg-slate-900/60 p-4 md:p-6 mb-6 scroll-mt-24';
const H2 = 'text-lg font-bold text-navy-900 dark:text-text-dark-primary mb-2';
const P = 'text-sm text-gray-700 dark:text-text-dark-secondary';
const TH = 'p-2 text-left font-semibold text-navy-900 dark:text-text-dark-primary bg-surface-50 dark:bg-slate-800 align-top';
const TD = 'p-2 align-top border-t border-surface-200 dark:border-surface-dark-200 text-gray-700 dark:text-text-dark-secondary';
const LBL = 'font-semibold text-navy-900 dark:text-text-dark-primary';

function Table({ head, rows, min = 760 }) {
  return (
    <div className="overflow-x-auto" tabIndex={0} role="region" aria-label={head.join(', ')}>
      <table className="w-full text-sm" style={{ minWidth: min }}>
        <thead><tr>{head.map((h) => <th key={h} scope="col" className={TH}>{h}</th>)}</tr></thead>
        <tbody>{rows.map((r, i) => <tr key={i}>{r.map((c, j) => <td key={j} className={`${TD} ${j === 0 ? 'font-medium' : ''}`}>{c}</td>)}</tr>)}</tbody>
      </table>
    </div>
  );
}
const List = ({ items }) => <ul className={`list-disc pl-5 space-y-1 ${P}`}>{items.map((x) => <li key={x}>{x}</li>)}</ul>;
const Section = ({ id, title, children }) => <details open id={`vpg-${id}`} className={CARD}><summary className="cursor-pointer list-none"><h2 className={`${H2} inline`}>{title}</h2></summary><div className="mt-2">{children}</div></details>;

export default function VpEngGuide() {
  useEffect(() => {
    const els = PARTS.map(([id]) => document.getElementById(`vpg-${id}`)).filter(Boolean);
    if (!els.length || typeof IntersectionObserver === 'undefined') return undefined;
    const io = new IntersectionObserver((entries) => {
      const vis = entries.filter((e) => e.isIntersecting).sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
      if (vis[0]) window.dispatchEvent(new CustomEvent('kb-subsection', { detail: vis[0].target.id.replace('vpg-', '') }));
    }, { rootMargin: '-90px 0px -60% 0px' });
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);

  return (
    <div className="min-w-0">
      <section className={CARD}>
        <h2 className="text-xl font-bold text-navy-900 dark:text-text-dark-primary mb-2">VP of Engineering Interview Guide: Lead GRC</h2>
        <p className={P}>For an engineering leader interviewing a Lead GRC candidate. Each competency has a main question, a model answer in conversational form, follow-up probes that expose shallow experience, red flags, and two columns: technical depth (what an engineer will recognise) and compliance vocabulary (what the candidate should also name). Candidates can use the same material to prepare; the candidate-side answers for this round are in <Link className="ui-link" to="/#interview-prep">Interview Prep</Link> under Lead GRC Engineer, VP Infrastructure round.</p>
      </section>

      <Section id="how" title="How to use this guide"><List items={HOW} /></Section>

      <Section id="lastround" title="Last-round engineering questions">
        <p className={`mb-2 ${P}`}>For an engineering leader who is strong on infrastructure, Java and platforms but less deep in formal compliance. These connect GRC to systems you already run. CI/CD change evidence, cloud production access, Kubernetes, questionnaires, audit ownership, risk and AI are covered in the competency questions below.</p>
        <div className="space-y-3">
          {LAST_ROUND.map(([topic, q, a, ex, probe, flags]) => (
            <details key={topic} className="rounded-xl border border-surface-200 dark:border-surface-dark-200 p-4">
              <summary className="cursor-pointer font-semibold text-navy-900 dark:text-text-dark-primary">{topic}: <span className="font-normal">{q}</span></summary>
              <div className="mt-3 space-y-2">
                <p className={P}><span className={LBL}>Strong answer: </span>"{a}"</p>
                <p className={P}><span className={LBL}>Engineering example: </span>{ex}</p>
                <p className={P}><span className={LBL}>Follow-up probe: </span>{probe}</p>
                <p className={P}><span className={LBL}>Red flags: </span>{flags}</p>
              </div>
            </details>
          ))}
        </div>
      </Section>

      <Section id="rubric" title="Scoring rubric (1 to 5)">
        <Table head={['Score', 'What it means']} rows={RUBRIC_SCALE} min={560} />
        <div className="mt-3">
          <Table head={['Competency', 'Sounds like a 2', 'Sounds like a 5']} rows={QUESTIONS.map((q) => [q.c, q.score2, q.score5])} min={760} />
        </div>
      </Section>

      <Section id="questions" title="Competency questions">
        <div className="space-y-3">
          {QUESTIONS.map((q) => (
            <details key={q.c} className="rounded-xl border border-surface-200 dark:border-surface-dark-200 p-4">
              <summary className="cursor-pointer font-semibold text-navy-900 dark:text-text-dark-primary">{q.c}: <span className="font-normal">{q.q}</span></summary>
              <div className="mt-3 space-y-3">
                <p className={P}><span className={LBL}>Strong answer: </span>"{q.a}"</p>
                {q.example && <p className={P}><span className={LBL}>Engineering example: </span>{q.example}</p>}
                <div><p className={`${LBL} text-sm mb-1`}>Follow-up probes</p><List items={q.probes} /></div>
                <div><p className={`${LBL} text-sm mb-1`}>Red flags</p><List items={q.redFlags} /></div>
                <Table head={['Technical depth to listen for', 'Compliance vocabulary to expect']} rows={[[q.technical, q.vocab]]} min={560} />
              </div>
            </details>
          ))}
        </div>
      </Section>

      <Section id="scenarios" title="Scenario questions">
        <Table head={['Scenario', 'Strong answer', 'Probes', 'Red flags']} rows={SCENARIOS} min={1200} />
      </Section>

      <Section id="k8s" title="Kubernetes control expectations">
        <p className={`mb-2 ${P}`}>What a strong candidate expects to see. Testing commands per cloud are in the <Link className="ui-link" to="/knowledge?topic=cloud-testing">Cloud Control Testing Guide</Link>.</p>
        <Table head={['Control', 'What good looks like', 'How to check', 'Compliance mapping']} rows={K8S} min={1000} />
      </Section>

      <Section id="access" title="Production access designs by cloud">
        <p className={`mb-2 ${P}`}>The pattern is the same in every cloud: people come through SSO with MFA, standing access is read-only, elevation is temporary, approved and logged, guardrails stop the worst actions, logs are locked away from admins, and break-glass is monitored.</p>
        <Table head={['Cloud', 'Design element', 'How it works', 'Evidence']} rows={ACCESS} min={1000} />
      </Section>
    </div>
  );
}
