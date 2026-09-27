import { FRAMEWORK as Iso27001La } from '../pages/standards/Iso27001La.jsx';
import { FRAMEWORK as Iso27001Li } from '../pages/standards/Iso27001Li.jsx';
import { FRAMEWORK as Iso31000 } from '../pages/standards/Iso31000.jsx';
import { FRAMEWORK as Iso27701 } from '../pages/standards/Iso27701.jsx';
import { FRAMEWORK as PciDss } from '../pages/standards/PciDss.jsx';
import { FRAMEWORK as Soc2 } from '../pages/standards/Soc2.jsx';
import { FRAMEWORK as Hipaa } from '../pages/standards/Hipaa.jsx';
import { FRAMEWORK as Nist } from '../pages/standards/Nist.jsx';
import { FRAMEWORK as CippeUs } from '../pages/standards/CippeUs.jsx';
import { FRAMEWORK as Hitrust } from '../pages/standards/Hitrust.jsx';
import { FRAMEWORK as Coppa } from '../pages/standards/Coppa.jsx';
import { FRAMEWORK as CcpaCpra } from '../pages/standards/CcpaCpra.jsx';
import { FRAMEWORK as Gdpr } from '../pages/standards/Gdpr.jsx';
import { FRAMEWORK as CippeEu } from '../pages/standards/CippeEu.jsx';
import { FRAMEWORK as Dpdpa } from '../pages/standards/Dpdpa.jsx';
import { FRAMEWORK as Sebi } from '../pages/standards/SecuritiesExchangeBoardIndia.jsx';
import { FRAMEWORK as Rbi } from '../pages/standards/ReserveBankOfIndia.jsx';
import { FRAMEWORK as Cscrf } from '../pages/standards/Cscrf.jsx';
import { FRAMEWORK as CertIn } from '../pages/standards/CertIn.jsx';
import { FRAMEWORK as Lgpd } from '../pages/standards/Lgpd.jsx';
import { FRAMEWORK as Pdpa } from '../pages/standards/Pdpa.jsx';
import { FRAMEWORK as Pipl } from '../pages/standards/Pipl.jsx';
import { FRAMEWORK as Cis } from '../pages/standards/Cis.jsx';
import { FRAMEWORK as FedRamp } from '../pages/standards/FedRamp.jsx';
import { FRAMEWORK as Iso22317 } from '../pages/standards/Iso22317.jsx';
import { FRAMEWORK as Aigp } from '../pages/standards/Aigp.jsx';

export const FRAMEWORKS = {
  [Iso27001La.id]: Iso27001La,
  [Iso27001Li.id]: Iso27001Li,
  [Iso31000.id]: Iso31000,
  [Iso27701.id]: Iso27701,
  [PciDss.id]: PciDss,
  [Soc2.id]: Soc2,
  [Hipaa.id]: Hipaa,
  [Nist.id]: Nist,
  [CippeUs.id]: CippeUs,
  [Hitrust.id]: Hitrust,
  [Coppa.id]: Coppa,
  [CcpaCpra.id]: CcpaCpra,
  [Gdpr.id]: Gdpr,
  [CippeEu.id]: CippeEu,
  [Dpdpa.id]: Dpdpa,
  [Sebi.id]: Sebi,
  [Rbi.id]: Rbi,
  [Cscrf.id]: Cscrf,
  [CertIn.id]: CertIn,
  [Lgpd.id]: Lgpd,
  [Pdpa.id]: Pdpa,
  [Pipl.id]: Pipl,
   [Cis.id]: Cis,
   [FedRamp.id]: FedRamp,
  [Iso22317.id]: Iso22317,
   [Aigp.id]: Aigp,
 };

export function getFramework(id) {
  return FRAMEWORKS[id] || null;
}
