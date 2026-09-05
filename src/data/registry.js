import { FRAMEWORK as Iso27001La } from '../pages/standards/Iso27001La';
import { FRAMEWORK as Iso27001Li } from '../pages/standards/Iso27001Li';
import { FRAMEWORK as Iso31000 } from '../pages/standards/Iso31000';
import { FRAMEWORK as Iso27701 } from '../pages/standards/Iso27701';
import { FRAMEWORK as PciDss } from '../pages/standards/PciDss';
import { FRAMEWORK as Soc2 } from '../pages/standards/Soc2';
import { FRAMEWORK as Hipaa } from '../pages/standards/Hipaa';
import { FRAMEWORK as Nist } from '../pages/standards/Nist';
import { FRAMEWORK as CippeUs } from '../pages/standards/CippeUs';
import { FRAMEWORK as Hitrust } from '../pages/standards/Hitrust';
import { FRAMEWORK as Coppa } from '../pages/standards/Coppa';
import { FRAMEWORK as CcpaCpra } from '../pages/standards/CcpaCpra';
import { FRAMEWORK as Gdpr } from '../pages/standards/Gdpr';
import { FRAMEWORK as CippeEu } from '../pages/standards/CippeEu';
import { FRAMEWORK as Dpdpa } from '../pages/standards/Dpdpa';
import { FRAMEWORK as Sebi } from '../pages/standards/SecuritiesExchangeBoardIndia';
import { FRAMEWORK as Rbi } from '../pages/standards/ReserveBankOfIndia';
import { FRAMEWORK as Cscrf } from '../pages/standards/Cscrf';
import { FRAMEWORK as CertIn } from '../pages/standards/CertIn';
import { FRAMEWORK as Lgpd } from '../pages/standards/Lgpd';
import { FRAMEWORK as Pdpa } from '../pages/standards/Pdpa';
import { FRAMEWORK as Pipl } from '../pages/standards/Pipl';
import { FRAMEWORK as Cis } from '../pages/standards/Cis';
import { FRAMEWORK as FedRamp } from '../pages/standards/FedRamp';

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
 };

export function getFramework(id) {
  return FRAMEWORKS[id] || null;
}
