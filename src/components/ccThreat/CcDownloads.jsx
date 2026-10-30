import { Download } from 'lucide-react';
import TemplateDownloadButton from '../templates/TemplateDownloadButton.jsx';
import { useAuth } from '../../context/AuthContext.jsx';

export const CC_FILES = {
  ttx: [
    { name: 'TTX modules: 13 domains + 3 capstones, facilitator guide, notification decision tree', file: 'tabletop-exercises_contact-center_template.docx' },
    { name: 'Printable inject cards', file: 'tabletop-exercises_inject-cards_template.docx' },
    { name: 'Sign-in sheet, maturity scores and action tracker', file: 'tabletop-exercises_sign-in-and-actions_template.xlsx' },
    { name: 'After-action report', file: 'tabletop-exercises_after-action-report_template.docx' },
  ],
  risk: [{ name: 'Contact-centre risk register (STRIDE + LINDDUN) with 5x5 legend and heat map', file: 'risk-matrices_contact-center_template.xlsx' }],
  mapping: [{ name: 'Framework crosswalk: ISO 27001/27701, NIST CSF 2.0, 800-53, Privacy Framework, CIS v8, SOC 2, GDPR, ATT&CK', file: 'framework-mapping_contact-center_template.xlsx' }],
  access: [{ name: 'Contact-centre access review checklist (cloud, PIM/JIT, cluster, vault, CRM, telephony, forensic logs)', file: 'access-controls_contact-center_template.xlsx' }],
  vendor: [{ name: 'Vendor security and privacy questionnaire, processor checklist, contract clause checklist', file: 'vendor-governance_contact-center_template.xlsx' }],
  interview: [{ name: '20 Q&As: STRIDE, LINDDUN, trade-offs, container, SIP, logging, privacy by design, incident command', file: 'interview-prep_contact-center_template.docx' }],
};

export default function CcDownloads({ groups, title = 'Contact-centre threat model templates' }) {
  const { user } = useAuth();
  const items = groups.flatMap(g => CC_FILES[g]);
  return (
    <div className="my-4 rounded-xl border border-violet-200 dark:border-violet-800 bg-violet-50/60 dark:bg-violet-900/10 p-4">
      <h4 className="flex items-center gap-2 font-bold text-sm text-gray-900 dark:text-white mb-2"><Download className="w-4 h-4" aria-hidden="true" />{title}</h4>
      {!user ? <p className="text-sm text-gray-600 dark:text-gray-400">Log in to download these templates.</p> : (
        <ul className="space-y-2">{items.map(t => (
          <li key={t.file} className="flex items-center justify-between gap-3 text-sm text-gray-800 dark:text-gray-200"><span>{t.name}</span><TemplateDownloadButton template={t} compact /></li>
        ))}</ul>
      )}
    </div>
  );
}
