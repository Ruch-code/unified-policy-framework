import { FileText, Shield, CheckCircle, AlertTriangle, Calendar, CalendarDays, Lock, UserCheck, Building2, Users, Briefcase, GraduationCap, ArrowRight, ChevronRight } from 'lucide-react';

function ScopeDocStructure({ isDark = false }) {
  return (
    <section className="py-8" id="scope-doc-structure">
      <div className="container mx-auto px-4">
        <div className="grc-card p-6 mb-8">
          <h2 className="text-2xl font-bold text-navy-900 dark:text-text-dark-primary mb-4 flex items-center gap-2">
            <span className="w-8 h-8 rounded-xl bg-rose-600 text-white flex items-center justify-center">
              <FileText className="w-5 h-5" />
            </span>
            Structure of a Good ISMS Scope Document
          </h2>
          <p className="text-navy-600 dark:text-text-dark-secondary mb-4">
            Mirror the typical "ISMS Scope / Scope of the ISMS" policy layout used in compliance platforms:
          </p>
          <ol className="space-y-2 list-decimal list-inside text-sm text-navy-600 dark:text-text-dark-secondary">
            <li>Purpose</li>
            <li>Scope statement (one paragraph, certificate-ready)</li>
            <li>In-scope: organizational units, locations, products/services, systems and assets, data types</li>
            <li>Out-of-scope items, each with a written justification</li>
            <li>Interfaces and dependencies with external parties</li>
            <li>Context summary (internal and external issues) and interested parties with their requirements</li>
            <li>Roles: ISMS owner, approver (top management)</li>
            <li>Review frequency and triggers</li>
            <li>Version history and approval record</li>
          </ol>
        </div>

      </div>
    </section>
  );
}

export default ScopeDocStructure;