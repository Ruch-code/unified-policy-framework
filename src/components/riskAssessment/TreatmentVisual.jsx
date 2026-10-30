import { ShieldCheck, ArrowRightLeft, Ban, CheckCircle2 } from 'lucide-react';
import { TREATMENTS, WORKFLOW } from '../../data/riskAssessment/methodology';

const OPT = {
  Mitigate: { icon: ShieldCheck, cls: 'border-emerald-300 bg-emerald-50 dark:bg-emerald-900/20 dark:border-emerald-800', tx: 'text-emerald-800 dark:text-emerald-200', effect: 'Lowers likelihood or impact' },
  Transfer: { icon: ArrowRightLeft, cls: 'border-sky-300 bg-sky-50 dark:bg-sky-900/20 dark:border-sky-800', tx: 'text-sky-800 dark:text-sky-200', effect: 'Shifts financial impact, not accountability' },
  Avoid: { icon: Ban, cls: 'border-rose-300 bg-rose-50 dark:bg-rose-900/20 dark:border-rose-800', tx: 'text-rose-800 dark:text-rose-200', effect: 'Removes the risk by stopping the activity' },
  Accept: { icon: CheckCircle2, cls: 'border-amber-300 bg-amber-50 dark:bg-amber-900/20 dark:border-amber-800', tx: 'text-amber-800 dark:text-amber-200', effect: 'Keeps the risk, with documented sign-off' },
};

function Q({ x, y, w = 200, text }) {
  return <g><rect x={x} y={y} width={w} height={46} rx={10} className="fill-indigo-50 stroke-indigo-400 dark:fill-indigo-950 dark:stroke-indigo-500" strokeWidth="1.5" />
    <text x={x + w / 2} y={y + 28} textAnchor="middle" className="fill-indigo-900 dark:fill-indigo-100" fontSize="12" fontWeight="600">{text}</text></g>;
}
function Out({ x, y, label, sub, tone }) {
  const c = { em: 'fill-emerald-100 stroke-emerald-500 dark:fill-emerald-950 dark:stroke-emerald-600', sk: 'fill-sky-100 stroke-sky-500 dark:fill-sky-950 dark:stroke-sky-600', ro: 'fill-rose-100 stroke-rose-500 dark:fill-rose-950 dark:stroke-rose-600', am: 'fill-amber-100 stroke-amber-500 dark:fill-amber-950 dark:stroke-amber-600' }[tone];
  return <g><rect x={x} y={y} width={150} height={50} rx={25} className={c} strokeWidth="1.5" />
    <text x={x + 75} y={y + 22} textAnchor="middle" className="fill-gray-900 dark:fill-gray-100" fontSize="13" fontWeight="700">{label}</text>
    <text x={x + 75} y={y + 38} textAnchor="middle" className="fill-gray-600 dark:fill-gray-300" fontSize="10">{sub}</text></g>;
}
function A({ d, label, lx, ly }) {
  return <g><path d={d} fill="none" className="stroke-gray-400 dark:stroke-gray-500" strokeWidth="1.5" markerEnd="url(#ra-arr)" />
    {label && <text x={lx} y={ly} className="fill-gray-500 dark:fill-gray-400" fontSize="11" fontWeight="700">{label}</text>}</g>;
}

function DecisionTree() {
  return (
    <svg viewBox="0 0 860 420" className="w-full h-auto" role="img" aria-label="Decision tree for choosing a risk treatment option">
      <defs><marker id="ra-arr" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto"><path d="M0,0 L10,5 L0,10 z" className="fill-gray-400 dark:fill-gray-500" /></marker></defs>
      <Q x={30} y={20} w={220} text="Residual score within appetite?" />
      <A d="M140 66 L140 118" label="No" lx={148} ly={96} />
      <A d="M250 43 L640 43 L640 80" label="Yes" lx={420} ly={36} />
      <Out x={565} y={82} label="Accept" sub="Risk Owner signs off" tone="am" />
      <Q x={30} y={120} w={220} text="Is the activity worth the risk?" />
      <A d="M250 143 L380 143 L380 300" label="No" lx={300} ly={136} />
      <Out x={305} y={302} label="Avoid" sub="Stop or redesign it" tone="ro" />
      <A d="M140 166 L140 218" label="Yes" lx={148} ly={196} />
      <Q x={20} y={220} w={240} text="Can controls reduce it at fair cost?" />
      <A d="M140 266 L140 300" label="Yes" lx={148} ly={290} />
      <Out x={65} y={302} label="Mitigate" sub="Add or fix controls" tone="em" />
      <A d="M260 243 L560 243 L560 218" label="No" lx={400} ly={236} />
      <Q x={460} y={170} w={220} text="Can financial impact be shifted?" />
      <A d="M680 193 L770 193 L770 300" label="Yes" lx={700} ly={186} />
      <Out x={695} y={302} label="Transfer" sub="Insurance or contract" tone="sk" />
      <A d="M570 216 L570 300" label="No" lx={578} ly={262} />
      <Out x={495} y={302} label="Accept" sub="Approver sign-off (above appetite)" tone="am" />
      <text x={430} y={400} textAnchor="middle" className="fill-gray-500 dark:fill-gray-400" fontSize="11">Options can be combined: for example mitigate first, then transfer or accept what remains.</text>
    </svg>
  );
}

function Lifecycle() {
  const pos = [[90, 70], [270, 70], [450, 70], [630, 70], [630, 230], [450, 230], [270, 230], [90, 230]];
  const order = ['Identified', 'Assessed', 'Treatment planned', 'Treatment incomplete', 'Treatment OK', 'Pending approval', 'Approved', 'Review due'];
  const tone = { Identified: 'slate', Assessed: 'indigo', 'Treatment planned': 'indigo', 'Treatment incomplete': 'rose', 'Treatment OK': 'emerald', 'Pending approval': 'amber', Approved: 'emerald', 'Review due': 'amber' };
  const cls = { slate: 'fill-slate-100 stroke-slate-400 dark:fill-slate-800 dark:stroke-slate-500', indigo: 'fill-indigo-50 stroke-indigo-400 dark:fill-indigo-950 dark:stroke-indigo-500', rose: 'fill-rose-50 stroke-rose-400 dark:fill-rose-950 dark:stroke-rose-500', emerald: 'fill-emerald-50 stroke-emerald-500 dark:fill-emerald-950 dark:stroke-emerald-600', amber: 'fill-amber-50 stroke-amber-500 dark:fill-amber-950 dark:stroke-amber-600' };
  const meaning = Object.fromEntries(WORKFLOW.map(w => [w.state, w.meaning]));
  const W = 150, H = 54;
  return (
    <svg viewBox="0 0 800 330" className="w-full h-auto" role="img" aria-label="Risk workflow lifecycle from Identified to Approved, with a review loop">
      <defs><marker id="ra-arr2" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto"><path d="M0,0 L10,5 L0,10 z" className="fill-gray-400 dark:fill-gray-500" /></marker></defs>
      {[[0, 1], [1, 2], [2, 3]].map(([a, b]) => <path key={a} d={`M${pos[a][0] + W / 2} ${pos[a][1]} L${pos[b][0] - W / 2} ${pos[b][1]}`} className="stroke-gray-400 dark:stroke-gray-500" strokeWidth="1.5" markerEnd="url(#ra-arr2)" />)}
      <path d={`M${pos[3][0]} ${pos[3][1] + H / 2} L${pos[4][0]} ${pos[4][1] - H / 2}`} className="stroke-emerald-500" strokeWidth="1.5" markerEnd="url(#ra-arr2)" />
      <text x={640} y={155} className="fill-emerald-700 dark:fill-emerald-300" fontSize="10" fontWeight="700">controls evidenced</text>
      <path d={`M${pos[3][0] + W / 2} ${pos[3][1] - 10} C 790 0, 560 0, ${pos[2][0] + 30} ${pos[2][1] - H / 2}`} fill="none" className="stroke-rose-400" strokeDasharray="4 3" strokeWidth="1.5" markerEnd="url(#ra-arr2)" />
      <text x={600} y={18} className="fill-rose-600 dark:fill-rose-300" fontSize="10" fontWeight="700">gap: re-plan treatment</text>
      {[[4, 5], [5, 6], [6, 7]].map(([a, b]) => <path key={a} d={`M${pos[a][0] - W / 2} ${pos[a][1]} L${pos[b][0] + W / 2} ${pos[b][1]}`} className="stroke-gray-400 dark:stroke-gray-500" strokeWidth="1.5" markerEnd="url(#ra-arr2)" />)}
      <path d={`M${pos[5][0]} ${pos[5][1] + H / 2} C ${pos[5][0]} 320, ${pos[2][0] + 200} 320, ${pos[2][0] + 200} 200 L ${pos[2][0] + 200} 120`} fill="none" className="stroke-rose-400" strokeDasharray="4 3" strokeWidth="1.5" />
      <text x={470} y={318} className="fill-rose-600 dark:fill-rose-300" fontSize="10" fontWeight="700">rejected by Approver</text>
      <path d={`M${pos[7][0]} ${pos[7][1] - H / 2} L${pos[0][0]} ${pos[0][1] + H / 2 + 60}`} className="stroke-amber-500" strokeWidth="1.5" />
      <path d={`M${pos[0][0]} ${pos[0][1] + H / 2 + 60} L${pos[1][0] - 30} ${pos[1][1] + H / 2}`} className="stroke-amber-500" strokeWidth="1.5" markerEnd="url(#ra-arr2)" />
      <text x={100} y={168} className="fill-amber-700 dark:fill-amber-300" fontSize="10" fontWeight="700">annual or trigger: re-score</text>
      {order.map((s, i) => <g key={s}><title>{meaning[s]}</title>
        <rect x={pos[i][0] - W / 2} y={pos[i][1] - H / 2} width={W} height={H} rx={12} className={cls[tone[s]]} strokeWidth="1.5" />
        <text x={pos[i][0]} y={pos[i][1] - 4} textAnchor="middle" className="fill-gray-500 dark:fill-gray-400" fontSize="10" fontWeight="700">{i + 1}</text>
        <text x={pos[i][0]} y={pos[i][1] + 12} textAnchor="middle" className="fill-gray-900 dark:fill-gray-100" fontSize="12" fontWeight="700">{s}</text></g>)}
    </svg>
  );
}

export default function TreatmentVisual() {
  return (
    <div className="space-y-5">
      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
        {TREATMENTS.map(t => { const o = OPT[t.option]; const I = o.icon; return (
          <div key={t.option} className={`rounded-xl border p-4 ${o.cls}`}>
            <div className={`flex items-center gap-2 font-bold ${o.tx}`}><I className="w-5 h-5" aria-hidden="true" />{t.option}</div>
            <p className={`text-[11px] font-semibold mt-1 ${o.tx}`}>{o.effect}</p>
            <p className="text-xs mt-2 text-gray-700 dark:text-gray-300"><strong>When:</strong> {t.when}</p>
            <p className="text-xs mt-1 text-gray-700 dark:text-gray-300"><strong>Example:</strong> {t.example}</p>
          </div>); })}
      </div>
      <div className="rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 p-3">
        <h4 className="font-semibold text-sm text-gray-900 dark:text-white mb-1">Which option? Decision tree</h4>
        <DecisionTree />
      </div>
      <div className="rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 p-3">
        <h4 className="font-semibold text-sm text-gray-900 dark:text-white mb-1">Approval workflow lifecycle</h4>
        <p className="text-xs text-gray-600 dark:text-gray-400 mb-1">Hover a state for its meaning. Dashed lines are loops back when evidence is missing or the Approver rejects.</p>
        <Lifecycle />
        <dl className="grid sm:grid-cols-2 gap-x-4 gap-y-1 text-xs text-gray-700 dark:text-gray-300 mt-2">{WORKFLOW.map((w, i) => <div key={w.state}><dt className="inline font-bold">{i + 1}. {w.state}:</dt> <dd className="inline">{w.meaning}</dd></div>)}</dl>
      </div>
    </div>
  );
}
