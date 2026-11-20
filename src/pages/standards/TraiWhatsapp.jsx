import LearningFrameworkPage from "../../components/LearningFrameworkPage.jsx";

// India commercial messaging: TRAI TCCCPR 2018 with DLT registration, and Meta WhatsApp Business Platform / BSP obligations.
// Items marked [VERIFY] need checking against the current TRAI regulations, directions and Meta policy pages before relying on them.
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
      description: 'Commercial SMS and voice in India must run on the telecom operators\' distributed ledger (DLT) platforms under the TRAI Telecom Commercial Communications Customer Preference Regulations, 2018 (TCCCPR).',
      tasks: [
        {
          title: 'Confirm who is a principal entity and who is a telemarketer',
          control: 'Under TCCCPR, the business sending commercial messages is the principal entity (PE, also called the sender or enterprise). Platforms and aggregators that deliver messages for it are registered telemarketers (TMs). Each has its own registration and obligations.',
          how: 'List every brand, product and legal entity that sends SMS or calls, and every aggregator or CPaaS provider used. If you are a CPaaS or messaging platform, you are usually the telemarketer for your customers and must check that each customer is a registered PE.',
          check: 'Register of principal entities and telemarketers with their DLT entity IDs.'
        },
        {
          title: 'Register the entity on a DLT platform',
          control: 'Principal entities register once on an access provider\'s DLT portal (operators such as Jio, Airtel, Vi and BSNL run them). Registration is shared across operators. [VERIFY current portal list and documents required]',
          how: 'Register with the legal entity details and authorised signatory, and keep the registration current when entity details change.',
          check: 'DLT entity registration ID and approval record.'
        },
        {
          title: 'Register headers (sender IDs)',
          control: 'Every SMS header used by the business must be registered on DLT and linked to the entity. Headers are categorised as promotional or transactional/service, and the header type must match the message category. [VERIFY current header format rules]',
          how: 'Inventory all headers in use, register each one, and remove unregistered or unused headers.',
          check: 'Header register exported from the DLT portal, matched to headers seen in sending logs.'
        },
        {
          title: 'Register content templates by category',
          control: 'Message content must match a template registered on DLT with the right category: promotional, transactional, service implicit or service explicit. Messages that do not match a registered template are blocked by the operator scrubbing system. [VERIFY category definitions in the current regulations]',
          how: 'Register a template for each message type with placeholders for variable parts. Keep a template owner and review templates when the product or wording changes.',
          check: 'Template register with category, owner and approval date; sample of sent messages matched to templates.'
        }
      ]
    },
    {
      week: 2,
      title: 'L2 Operations: consent, preferences and traceability',
      days: 'Days 11-20',
      description: 'Make sure every commercial message has the right consent, respects user preferences and can be traced end to end.',
      tasks: [
        {
          title: 'Capture and register consent for promotional and service explicit messages',
          control: 'Promotional messages to customers who have opted out of commercial communication, and service explicit messages, need explicit consent. Under the DLT framework consent is captured through registered consent templates and verified by the operator. [VERIFY consent acquisition process and current rules for customers on the do-not-disturb preference list]',
          how: 'Register consent templates on DLT, record consent with date, channel and purpose, and honour revocation promptly.',
          check: 'Consent records for a sample of recipients, consent templates and revocation handling log.'
        },
        {
          title: 'Respect customer preferences (DND)',
          control: 'Customers can register preferences that block some or all promotional communication. Operators scrub promotional traffic against these preferences before delivery.',
          how: 'Do not try to route promotional content through transactional or service templates to avoid scrubbing. Review templates for category misuse.',
          check: 'Template category review and any operator complaints or penalties.'
        },
        {
          title: 'Whitelist links, call-back numbers and app links',
          control: 'TRAI directions in 2024 required URLs, APK links, OTT links and call-back numbers inside messages to be whitelisted against registered templates, and messages with non-whitelisted links to be blocked. [VERIFY direction dates and current scope]',
          how: 'Register every domain and link used in templates. Use your own domains rather than generic shorteners unless the shortener is registered.',
          check: 'Whitelisted URL list matched to links in sent templates.'
        },
        {
          title: 'Message traceability through the delivery chain',
          control: 'TRAI required the chain from principal entity through each telemarketer to the operator to be declared and bound on DLT, so every message can be traced to its sender. Messages with an undeclared or broken chain are rejected. [VERIFY implementation date and current requirements]',
          how: 'Declare each aggregator in the chain on the DLT portal and keep it current when you change providers.',
          check: 'Chain declaration records on DLT and delivery reports showing no chain-related rejections.'
        }
      ]
    },
    {
      week: 3,
      title: 'L3 WhatsApp Business Platform and BSP obligations',
      days: 'Days 21-30',
      description: 'WhatsApp business messaging is governed by Meta\'s policies rather than TRAI. Businesses access it directly through the Cloud API or through a Business Solution Provider (BSP), also called a Tech Provider or partner.',
      tasks: [
        {
          title: 'Know the roles: business, BSP and Meta',
          control: 'The business owns the WhatsApp Business Account, the phone number and the relationship with its customers. A BSP builds and runs the integration for the business. Meta provides the platform and enforces its policies on both. [VERIFY current Meta partner programme naming]',
          how: 'Record who owns each WhatsApp Business Account, which BSP has access, and what each party can see and do. Review BSP access when contracts change.',
          check: 'Account ownership register and BSP access list.'
        },
        {
          title: 'Opt-in before business-initiated messages',
          control: 'Meta\'s WhatsApp Business Messaging Policy requires the business to get opt-in from people before sending them messages, and to honour requests to stop. [VERIFY current policy wording]',
          how: 'Collect opt-in with a clear description of what messages the person will receive, record it with timestamp and source, and handle opt-outs across channels.',
          check: 'Opt-in records for sampled recipients and opt-out handling log.'
        },
        {
          title: 'Use approved message templates outside the customer service window',
          control: 'Business-initiated messages use templates that Meta reviews and approves, in categories such as marketing, utility and authentication. Free-form replies are allowed within the customer service window after the customer messages the business. [VERIFY window length and current categories]',
          how: 'Register templates with the right category, avoid putting promotional content in utility templates, and track template rejections and quality.',
          check: 'Template list with category and approval status.'
        },
        {
          title: 'Stay within commerce and content policies',
          control: 'Meta restricts certain goods, services and content on WhatsApp under its Commerce Policy and Business Messaging Policy. Poor quality ratings and user blocks can reduce messaging limits or lead to restrictions.',
          how: 'Review use cases against the policies before launch, monitor quality ratings and blocks, and act on warnings.',
          check: 'Policy review notes for each use case and quality rating history.'
        },
        {
          title: 'Protect data and contracts',
          control: 'Message content and phone numbers are personal data under the DPDP Act. Meta acts as a processor for Cloud API messages under its data processing terms, and the BSP is usually a processor or sub-processor for the business. [VERIFY Meta data processing terms and Cloud API data retention]',
          how: 'List Meta and the BSP as sub-processors where they handle customer data, sign data processing terms with the BSP, limit message content retention, and secure API tokens and webhooks.',
          check: 'Sub-processor list, signed DPA with the BSP, retention settings and token management records.'
        },
        {
          title: 'Account security and verification',
          control: 'Business verification and two-step verification protect the account and phone number from takeover.',
          how: 'Complete Meta business verification, enable two-step verification on the number, restrict admin roles in Business Manager and review them quarterly.',
          check: 'Verification status, admin role list and access review record.'
        }
      ]
    }
  ],
  milestones: [
    { day: 10, label: 'Entity, headers and templates registered', color: 'blue' },
    { day: 20, label: 'Consent, links and chain declared', color: 'purple' },
    { day: 30, label: 'WhatsApp opt-in, templates and contracts in place', color: 'green' }
  ],
  referenceUrl: 'https://www.trai.gov.in'
};

export default function TraiWhatsapp() {
  return <LearningFrameworkPage framework={FRAMEWORK} />;
}

export { FRAMEWORK };
