// Terms of Use and Privacy Policy text. Plain-language; edit when the site's features change.
export const LEGAL_UPDATED = '12 November 2026';

export const TERMS = [
  ['About this site', 'OneLens is a personal knowledge site about governance, risk and compliance, written and maintained by Ruchi Kandpal. It offers playbooks, templates, crosswalks and tools for learning and planning compliance work.'],
  ['Not professional advice', 'Content is general guidance for education and planning. It is not legal, audit, financial or security advice for your organisation, and using it does not create any advisory relationship. Laws, standards and regulator guidance change; check the current official texts and consult qualified professionals before relying on anything here.'],
  ['No certification or assurance', 'Completing playbook tasks, using a template or following a checklist on this site does not certify, attest to or prove compliance with any framework, law or standard.'],
  ['Accounts', 'Some areas require an account. Accounts are approved manually and may be suspended or removed at any time, for example for misuse. Keep your password private and tell the site owner if you think your account has been misused.'],
  ['Acceptable use', 'Do not attempt to break, overload, scrape at scale or bypass the security of the site, share your account, or submit unlawful content, personal data about other people, or confidential information you are not allowed to share. Do not paste personal or confidential data into the assistant.'],
  ['Templates and content', 'You may use and adapt the templates and guidance inside your own organisation. Do not republish or sell the site content as your own. Framework names and standards belong to their respective owners; summaries here are paraphrased and are not official texts.'],
  ['AI assistant', 'The assistant generates answers automatically and can be wrong or out of date. Check any answer against the source before acting on it.'],
  ['AI-generated content and ownership', 'Some content on the site and all assistant answers are produced with the help of AI tools and are reviewed by the site owner where practical. AI output may resemble existing material and may not be protected by copyright. You are responsible for checking anything you reuse, especially in client deliverables, and for not entering material you do not have the right to share.'],
  ['Trademarks', 'Product, framework and company names such as ISO, AICPA, SOC 2, HITRUST, PCI DSS, SailPoint, Jira and ServiceNow are trademarks of their owners. They are used only to identify those products and standards; no endorsement or affiliation is implied.'],
  ['Eligibility', 'The site is for professionals and learners aged 18 or over. You must be 18 or older to create an account or subscribe to the newsletter.'],
  ['Paid services, refunds and cancellation', 'The site does not currently sell any paid plan, subscription or product, so no refund or cancellation terms apply. If paid features are added, their price, renewal, cancellation and refund terms will be shown before you pay.'],
  ['Donations', 'Donations are voluntary, made directly on a public blockchain, and are not refundable. They do not buy any service, priority or access.'],
  ['Availability and liability', 'The site is provided as is, without warranties of any kind, and may change, pause or stop at any time. To the extent the law allows, the site owner is not liable for losses arising from use of the site or reliance on its content.'],
  ['External links', 'Links to other sites are provided for convenience. Their content and privacy practices are their owners\' responsibility.'],
  ['Changes to these terms', 'These terms may be updated. The date at the top shows the latest version; continuing to use the site after a change means you accept the updated terms.'],
];

export const PRIVACY = [
  ['Who is responsible', 'Ruchi Kandpal operates this site and decides how the personal data described here is used. Questions or requests can be sent through the data request form at /data-request or the LinkedIn profile linked in the site footer.'],
  ['What is collected, and why', [
    ['Account registration', 'Name and email address, plus your password stored only as a secure hash. Used to create, approve and secure your account. The site owner is notified by email when someone registers. Legal basis: performing the service you asked for (your account).'],
    ['Password reset', 'Your email address and a single-use reset token, used to send the reset link. Legal basis: performing the service.'],
    ['Newsletter', 'Your email address, if you subscribe, used only to send the newsletter. Every issue includes an unsubscribe option. Legal basis: your consent, given when you subscribe; you can withdraw it at any time.'],
    ['AI assistant and interview practice', 'Questions and answers you type are sent to Google\'s Gemini API to generate a reply. Under Google\'s terms for its free API tier, Google may use these inputs and outputs to improve its products, and they may be reviewed by people. A daily and per-minute usage count is kept against your account to prevent abuse. Do not enter personal, client or confidential information. Legal basis: performing the service you asked for, and legitimate interest in preventing abuse.'],
    ['Data and privacy requests', 'If you send a request through the data request form, your name, email address, the request type and your message are emailed to the site owner so the request can be handled. Legal basis: legal obligation to respond to privacy rights requests.'],
    ['Visitor counter', 'A single running total of visits. No personal data or IP address is stored for it.'],
    ['Browser storage', 'Your sign-in token, progress on playbooks, theme choice, filters and similar settings are saved in your own browser (local storage). Only the sign-in token is sent to the site, to keep you signed in. Clearing your browser data removes them. See the Cookie Policy for details.'],
    ['Fonts and flag images', 'Fonts are loaded from Google Fonts and country flag images from flagcdn.com. Like any web request, these providers receive your IP address and browser details when the files load.'],
  ]],
  ['What is not collected', 'The site does not use advertising or third-party analytics trackers, does not sell or share personal data for advertising, and does not process card payments. Voice features run in your browser.'],
  ['Service providers', 'Personal data is processed by providers that run the site for the owner: web hosting and serverless functions, the account database, email delivery, and the AI model provider for the assistant. They may process data outside your country under their own safeguards.'],
  ['How long it is kept', 'Account data is kept while your account exists and deleted when you ask for the account to be removed. Newsletter addresses are deleted when you unsubscribe. Assistant usage counts expire after a short period.'],
  ['Your rights', 'Depending on where you live (for example under the GDPR, UK GDPR, India\'s DPDP Act or US state privacy laws), you can ask to access, correct, delete or receive a copy of your personal data, object to its use, or withdraw consent. Use the data request form at /data-request. Requests are answered within 30 days. You can unsubscribe from the newsletter at any time using the link in any email. You can also complain to your local data protection authority.'],
  ['Security', 'Passwords are hashed, traffic is encrypted in transit, and administrative access is restricted. No system is completely secure, so avoid storing sensitive information in your account.'],
  ['Children', 'The site is intended for professionals aged 18 or over and is not directed at children. If you believe a child has created an account or subscribed, use the data request form and the data will be deleted.'],
  ['Changes to this policy', 'This policy may be updated when the site changes. The date at the top shows the latest version.'],
];

// [name, where it is stored, purpose, how long it lasts, category]
export const COOKIE_INTRO = 'This site does not set any cookies of its own and does not use advertising or analytics trackers. It stores a few items in your browser\'s local storage so the site works and remembers your settings. This policy lists them.';
export const STORAGE_ITEMS = [
  ['compliance_token', 'Local storage', 'Keeps you signed in after you log in.', 'Until you sign out or the token expires', 'Strictly necessary'],
  ['compliance-dark', 'Local storage', 'Remembers light or dark mode.', 'Until you clear browser data', 'Preference you choose'],
  ['compliance_chat_mode, compliance_chat_widget_open', 'Local storage', 'Remembers which assistant tab you use and whether the chat is open.', 'Until you clear browser data', 'Preference you choose'],
  ['Playbook progress, filters and similar settings', 'Local storage', 'Saves your progress and view settings on this device.', 'Until you clear browser data', 'Preference you choose'],
  ['onelens_interview_coach', 'Session storage', 'Keeps your current practice interview if you reload the page.', 'Until you close the tab', 'Strictly necessary for the feature'],
];
export const COOKIE_SECTIONS = [
  ['Third-party requests', 'Fonts load from Google Fonts and flag images from flagcdn.com. These providers receive your IP address and browser details when the files load, under their own privacy policies. They are not used to track you on this site.'],
  ['Do you need to accept anything?', 'No. Everything listed is either needed for the site to work or is a setting you chose. None of it tracks you or is shared with advertisers, so there is no cookie banner. If tracking or analytics are ever added, you will be asked for consent first.'],
  ['How to remove these items', 'Sign out to remove the sign-in token. Clearing site data in your browser settings removes everything else.'],
];

export const DISCLAIMER = 'Content on this site is general guidance for education and planning, not legal, audit, financial or security advice. Check official sources and consult a qualified professional before acting on it.';

// [component, licence, attribution or note]
export const LICENSES_INTRO = 'This site is built with open-source software and openly licensed data. The main components and their licences are listed below. Each licence text is available from the project\'s repository or package page.';
export const LICENSES = [
  ['React, React DOM, React Router', 'MIT', 'Copyright Meta Platforms, Inc. and contributors; Remix Software'],
  ['Vite, Tailwind CSS', 'MIT', 'Build tools'],
  ['three.js and react-globe.gl', 'MIT', 'Interactive globe'],
  ['world-countries', 'ODbL 1.0', 'Country data from the world-countries project by Mohammed Le Doze, made available under the Open Database License. Any rights in individual contents of the database are licensed under the Database Contents License.'],
  ['world-atlas and topojson-client', 'ISC', 'Map shapes derived from Natural Earth, which is in the public domain.'],
  ['Country flags', 'Free to use', 'Flag images from Flagpedia (flagcdn.com).'],
  ['IBM Plex fonts', 'SIL Open Font License 1.1', 'Copyright IBM Corp., served by Google Fonts.'],
  ['docx, JSZip, SheetJS (xlsx)', 'MIT; MIT or GPLv3 (JSZip, used under MIT); Apache 2.0', 'Document, archive and spreadsheet generation'],
  ['mongoose, bcryptjs, jose, axios', 'MIT', 'Server functions'],
  ['Resend and Netlify SDKs', 'MIT', 'Email delivery and hosting'],
];
