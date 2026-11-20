import LearningFrameworkPage from "../../components/LearningFrameworkPage.jsx";

// India commercial messaging: TRAI TCCCPR 2018 with DLT registration, and Meta WhatsApp Business Platform / BSP obligations.
// Verified 20 Nov 2026 against TRAI's TCCCPR Second Amendment Regulations (12 Feb 2025), TRAI directions of 20 Aug 2024 and related press releases,
// Meta's WhatsApp Business Messaging Policy, opt-in guidance and Cloud API data privacy page.
const FRAMEWORK = {
  id: 'trai-whatsapp',
  name: 'TRAI TCCCPR, DLT registration and WhatsApp Business Platform',
  shortName: 'TRAI DLT and WhatsApp',
  region: 'India',
  flag: 'in',
  basePath: '/trai-whatsapp',
  color: 'orange',
  weeks: [
    {
      week: 1,
      title: 'L1 Foundation: TCCCPR scope and DLT registration',
      days: 'Days 1-10',
      description: 'Commercial SMS and calls in India are governed by the TRAI Telecom Commercial Communications Customer Preference Regulations, 2018 (TCCCPR), as amended, including the Second Amendment Regulations of 12 February 2025. Access providers use distributed ledger technology (DLT) for entity registration, content template registration, and recording preferences and consent.',
      tasks: [
        {
          title: 'Confirm who is the sender and who is the telemarketer',
          control: 'The business sending commercial communication is the sender, also called the principal entity. Registered telemarketers connect senders to access providers, including those acting as aggregators or delivering messages.',
          how: 'List every brand and legal entity that sends commercial SMS or calls, and every aggregator or messaging platform used. A messaging or CPaaS platform carrying customer traffic usually acts as a telemarketer for its customers.',
          check: 'Register of senders and telemarketers in the delivery chain, with their DLT registration details.'
        },
        {
          title: 'Register the entity on DLT',
          control: 'Senders must register with an access provider before sending commercial communication; DLT is used for entity registration.',
          how: 'Register the legal entity and authorised signatory, and keep the registration current when entity details change.',
          check: 'DLT entity registration record.'
        },
        {
          title: 'Use only registered headers, with the right suffix',
          control: 'Commercial communication may only use registered headers or the designated number series. Under the 2025 amendment, SMS headers carry a suffix showing the message type: -P promotional, -S service, -T transactional and -G government.',
          how: 'Inventory every header in use, register it, map it to the right message type, and retire unused headers. For calls, promotional calls use the 140 series and transactional and service calls the 1600 series.',
          check: 'Header register matched to headers seen in sending logs.'
        },
        {
          title: 'Register content templates',
          control: 'Senders must register content templates with access providers before sending commercial messages. A template has fixed and variable parts, and messages are checked against it before delivery.',
          how: 'Register a template for each message type with the correct category, give each template an owner, and re-register when the wording changes.',
          check: 'Template register with category, owner and registration date; a sample of sent messages matched to templates.'
        }
      ]
    },
    {
      week: 2,
      title: 'L2 Operations: consent, preferences and traceability',
      days: 'Days 11-20',
      description: 'Make sure commercial messages respect consent and customer preferences, contain only whitelisted links and numbers, and can be traced to the sender.',
      tasks: [
        {
          title: 'Manage consent under the 2025 rules',
          control: 'Customer preferences and consent are recorded on DLT. Under the 2025 amendment, a sender must wait 90 days after a customer opts out before asking for consent again, consent to complete an ongoing transaction lasts 7 days, and implied consent for transactional and service messages lasts only for the duration of the contract.',
          how: 'Record consent with date, purpose and channel, honour opt-outs, block re-consent requests for 90 days after an opt-out, and get explicit consent where implied consent has ended.',
          check: 'Consent and opt-out records for a sample of recipients.'
        },
        {
          title: 'Whitelist URLs, APKs, OTT links and call-back numbers',
          control: 'TRAI\'s 12 May 2023 direction requires only whitelisted URLs, APKs, OTT links and call-back numbers in content templates. Its 20 August 2024 direction set 1 September 2024 as the date from which traffic containing non-whitelisted ones is not permitted; TRAI later allowed a one-month extension.',
          how: 'Register every domain, app link and call-back number used in templates. Where a URL has fixed and variable parts, whitelist the fixed part.',
          check: 'Whitelisted list matched to the links and numbers in registered templates.'
        },
        {
          title: 'Make every message traceable',
          control: 'The 20 August 2024 direction requires messages from senders to recipients to be traceable, and messages where the chain of telemarketers is not defined or does not match to be rejected. The original deadline was 1 November 2024 and was later extended.',
          how: 'Declare each telemarketer in the chain on DLT and update it whenever you change providers.',
          check: 'Chain declarations and delivery reports showing no chain-related rejections.'
        },
        {
          title: 'Watch complaints and penalties',
          control: 'The 2025 amendment extended the customer complaint window from 3 to 7 days, and tightened action against senders: the threshold changed to 5 complaints in 10 days, a first violation bars outgoing services for 15 days, and further violations lead to disconnection for one year and blacklisting.',
          how: 'Monitor complaints and operator notices, investigate quickly, and fix template or consent problems at the root.',
          check: 'Complaint log with outcomes and any operator notices.'
        }
      ]
    },
    {
      week: 3,
      title: 'L3 WhatsApp Business Platform and solution partners',
      days: 'Days 21-30',
      description: 'WhatsApp business messaging is governed by Meta\'s WhatsApp Business Messaging Policy rather than TRAI. Businesses use the Cloud API directly or through a Meta partner; Meta\'s partner programme includes Solution Partners and Tech Providers.',
      tasks: [
        {
          title: 'Know the roles: business, partner and Meta',
          control: 'The business owns the WhatsApp Business Account and the relationship with its customers. A Solution Partner or Tech Provider builds or runs the integration. Meta provides the platform and enforces its policies.',
          how: 'Record who owns each WhatsApp Business Account, which partner has access, and what each can see and do. Review partner access when contracts change.',
          check: 'Account ownership register and partner access list.'
        },
        {
          title: 'Get opt-in before business-initiated messages',
          control: 'The policy allows businesses to contact people only after receiving opt-in. Meta\'s opt-in guidance requires clearly stating that the person is opting in to messages over WhatsApp, naming the business, and complying with applicable law. Businesses must respect requests to block, discontinue or opt out, on or off WhatsApp.',
          how: 'Collect opt-in with WhatsApp and the business name shown, record timestamp and source, and handle opt-outs across all channels.',
          check: 'Opt-in records for sampled recipients and the opt-out handling log.'
        },
        {
          title: 'Use approved templates outside the 24-hour window',
          control: 'A business may reply without a template within the 24-hour customer service window, which opens and resets with each user message. Outside it, only approved message templates may be sent. Meta categorises templates as marketing, utility and authentication.',
          how: 'Register templates with the right category, keep promotional content out of utility templates, and track rejections and recategorisation.',
          check: 'Template list with category and approval status.'
        },
        {
          title: 'Manage quality and commerce rules',
          control: 'WhatsApp may limit or remove access after significant negative feedback, and users can block or report businesses. Businesses using catalogs or other commerce features must follow the Meta Commerce Policy.',
          how: 'Review each use case against the policies before launch, monitor quality and blocks, and act on warnings quickly.',
          check: 'Policy review notes per use case and quality history.'
        },
        {
          title: 'Data protection and contracts',
          control: 'For the Cloud API, Meta states it acts as a data processor or service provider for the business where the law recognises that role, messages have a maximum retention period of 30 days, and messages are encrypted between the user and the Cloud API with the Signal protocol and encrypted at rest. The Meta Hosting Terms for Cloud API apply, with sub-processor lists in Meta\'s data processing terms.',
          how: 'Treat phone numbers and message content as personal data under the DPDP Act, list Meta and any partner as sub-processors where they handle customer data, sign data processing terms with the partner, and secure API tokens and webhooks.',
          check: 'Sub-processor list, partner contract terms and token management records.'
        },
        {
          title: 'Secure the business account',
          control: 'Account takeover lets an attacker message customers in the business\'s name, so admin access needs the same care as any production system.',
          how: 'Restrict admin roles in Meta Business Manager, require strong authentication for admins, complete business verification, and review admin access quarterly.',
          check: 'Admin role list and access review record.'
        }
      ]
    }
  ],
  milestones: [
    { day: 10, label: 'Entity, headers and templates registered', color: 'blue' },
    { day: 20, label: 'Consent, links and chain in place', color: 'purple' },
    { day: 30, label: 'WhatsApp opt-in, templates and contracts ready', color: 'green' }
  ],
  referenceUrl: 'https://www.trai.gov.in'
};

export default function TraiWhatsapp() {
  return <LearningFrameworkPage framework={FRAMEWORK} />;
}

export { FRAMEWORK };
