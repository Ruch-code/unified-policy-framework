import { Copy, FileText, Shield, CheckCircle, Calendar, CalendarDays, Lock, UserCheck, Building2, Users, Briefcase, GraduationCap, ArrowRight, ChevronRight, AlertTriangle } from 'lucide-react';

const TEMPLATE_ID = 'scope-statement-template-text';
const copyTemplate = async (e) => {
  const el = document.getElementById(TEMPLATE_ID);
  const btn = e.currentTarget;
  try { await navigator.clipboard.writeText(el ? el.innerText.trim() : ''); btn.dataset.copied = '1'; btn.lastChild.textContent = ' Copied'; setTimeout(() => { btn.lastChild.textContent = ' Copy Template'; }, 1500); } catch { /* clipboard blocked */ }
};

function ScopeStatementTemplate({ isDark = false }) {
  return (
    <section className="py-8" id="scope-statement-template">
      <div className="container mx-auto px-4">
        <div className="grc-card p-6 mb-8">
          <h2 className="text-2xl font-bold text-navy-900 dark:text-text-dark-primary mb-4 flex items-center gap-2">
            <span className="w-8 h-8 rounded-xl bg-indigo-600 text-white flex items-center justify-center">
              <FileText className="w-5 h-5" />
            </span>
            Scope Statement Template
          </h2>
          <p className="text-navy-600 dark:text-text-dark-secondary mb-4">
            Copy and fill in. Include in all exports:
          </p>
          <div id={TEMPLATE_ID} className="bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 rounded-xl p-4 font-mono text-sm whitespace-pre-wrap text-slate-700 dark:text-slate-300">
The Information Security Management System of [Legal entity name] applies to the [design, development, operation, support] of [product or service name], delivered from [locations or 'a remote-first workforce'] and hosted on [cloud provider and regions]. It covers [teams or functions], the supporting information assets, systems and processes, in accordance with the Statement of Applicability version [x.y] dated [date].
          </div>
          <p className="mt-4 text-sm text-navy-600 dark:text-text-dark-secondary">
            <strong>Example (Small Remote SaaS):</strong> The Information Security Management System of Acme Corp Ltd applies to the design, development, operation, and support of Acme SaaS Platform, delivered from a remote-first workforce and hosted on AWS eu-west-1. It covers Engineering, Product, Operations and Security teams, the supporting information assets, systems and processes, in accordance with the Statement of Applicability version 1.0 dated 2024-01-15.
          </p>
          <p className="mt-4 text-sm text-navy-600 dark:text-text-dark-secondary">
            <strong>Example (Large Multi-site Enterprise):</strong> The Information Security Management System of GlobalCorp plc applies to the design, development, operation and support of GlobalPay Payment Gateway, delivered from London HQ (UK), Frankfurt DC (DE), Singapore DC (SG) and hosted on AWS eu-west-1, eu-central-1, ap-southeast-1. It covers Engineering, Product, Operations, Security, Finance and HR teams, the supporting information assets, systems and processes, in accordance with the Statement of Applicability version 2.3 dated 2024-06-01.
          </p>
          <div className="mt-6 p-4 rounded-xl border border-indigo-200 dark:border-indigo-800 bg-indigo-50 dark:bg-indigo-900/30">
            <h3 className="font-bold text-indigo-700 dark:text-indigo-400 mb-2 flex items-center gap-2">
              <FileText className="w-5 h-5" />
              Copy to Clipboard
            </h3>
            <button type="button" onClick={copyTemplate} className="btn btn-primary mt-2 px-3 py-1.5 rounded-lg text-sm">
              <Copy className="w-4 h-4" /><span> Copy Template</span>
            </button>
          </div>
        </div>

      </div>
    </section>
  );
}

export default ScopeStatementTemplate;