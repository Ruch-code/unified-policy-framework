// Reference tables for the medical device software page. Checked November 2026; confirm against current FDA and IEC sources.

// [standard or rule, what it covers, who needs it, how it is demonstrated, current status]
export const MD_STANDARDS = [
  ['FDA 510(k) (premarket notification)', 'Shows a new device is substantially equivalent to a legally marketed predicate.', 'Most Class II devices, and some Class I, sold in the US.', 'Submission in eSTAR; FDA clearance letter.', 'Ongoing; eSTAR is the required format.'],
  ['ISO 13485:2016', 'Quality management system for medical device organisations.', 'Manufacturers and many suppliers worldwide; the basis of the US QMSR.', 'Certification audit by an accredited body, or MDSAP; FDA inspection in the US.', 'Incorporated into FDA\'s Quality Management System Regulation (21 CFR 820) from 2 February 2026.'],
  ['IEC 62304', 'Software lifecycle processes for medical device software.', 'Anyone developing device software or software in a device.', 'Development plan, requirements, architecture, verification, maintenance and problem resolution records; FDA recognised standard.', 'Edition 1 with Amendment 1:2015 applies. Edition 2 is in final draft and widens the scope to health software.'],
  ['ISO 14971:2019', 'Risk management for medical devices across the lifecycle.', 'All device manufacturers.', 'Risk management plan, file and report.', 'Current; FDA recognised standard.'],
  ['FD&C Act section 524B and FDA premarket cybersecurity guidance', 'Cybersecurity for cyber devices: vulnerability monitoring, coordinated disclosure, patching and an SBOM.', 'Devices with software that can connect to the internet.', 'Cybersecurity documentation in the premarket submission.', 'In force for submissions; FDA guidance updated over time.'],
  ['IEC 81001-5-1', 'Secure development lifecycle for health software.', 'Health and device software developers.', 'Secure development process records.', 'Current; recognised by FDA and harmonised in the EU.'],
];

// 510(k) timeline: [phase, typical timing, what happens, output]
export const MD_TIMELINE = [
  ['Pre-Submission (optional)', 'About 70 to 75 days to a meeting after the request', 'FDA gives written feedback on predicate choice and testing plans.', 'Pre-Submission feedback'],
  ['Design, verification and validation', 'Months, depending on the device', 'Design controls, software lifecycle, risk management, cybersecurity and performance testing.', 'Design history file and test reports'],
  ['eSTAR submission', 'When testing is complete', 'Submit the 510(k) in eSTAR with the user fee.', 'Submission receipt'],
  ['Technical screening', 'About 15 days', 'FDA checks the eSTAR is complete before substantive review.', 'Accepted for review, or hold'],
  ['Substantive review', 'FDA goal of 90 review days, excluding time on hold', 'FDA reviews equivalence and may send an additional information request, which pauses the clock.', 'Questions or a decision'],
  ['Additional information response', 'Up to 180 days to respond', 'Answer FDA questions with evidence.', 'Response package'],
  ['Decision and listing', 'After review', 'Substantially equivalent (cleared) or not; then register and list the device.', 'Clearance letter, registration and listing'],
];

// How the frameworks connect to the rest of this site: [this framework, connects to, how]
export const MD_LINKS = [
  ['IEC 62304 and FDA cybersecurity', 'SOC 2 and ISO 27001', 'Change management, vulnerability management and access controls overlap with the secure development and patching evidence FDA expects.'],
  ['ISO 13485', 'ISO 27001 and ISO 42001', 'All are management system standards with document control, internal audit, management review and corrective action.'],
  ['Medical device data', 'HIPAA', 'A device that stores or transmits patient data for a covered entity may also need HIPAA safeguards and a BAA.'],
  ['AI-enabled devices', 'EU AI Act and ISO 42001', 'AI devices may also be high-risk AI systems under the EU AI Act; a predetermined change control plan covers planned model updates in the US.'],
];
