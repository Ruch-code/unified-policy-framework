// Every framework mapping workbook on the site. Each JSON file is the single source for its .xlsx and its preview.
import EDP from './edp.json';
import CHANGE from './changeManagement.json';
import SECRETS from './secrets.json';
import ZERO_TRUST from './zeroTrust.json';

export const ALL_MAPPINGS = [
  { data: EDP, where: 'Knowledge Base > Endpoint & Data Protection' },
  { data: CHANGE, where: 'Knowledge Base > Change Management' },
  { data: SECRETS, where: 'Knowledge Base > Secrets Scanning' },
  { data: ZERO_TRUST, where: 'Knowledge Base > Zero Trust and Shadow IT' },
];
