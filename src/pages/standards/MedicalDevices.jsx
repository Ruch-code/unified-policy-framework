import LearningFrameworkPage from "../../components/LearningFrameworkPage.jsx";
import MedicalDeviceReference from "../../components/playbook/MedicalDeviceReference.jsx";

// Medical device software: FDA 510(k), ISO 13485 and IEC 62304, with ISO 14971 risk management
// and FDA premarket cybersecurity. Regulatory details checked November 2026; confirm against current FDA and IEC sources.
const FRAMEWORK = {
  id: "medical-device-software",
  name: "Medical Device Software: FDA 510(k), ISO 13485 and IEC 62304",
  color: "green",
  region: "United States and international",
  flag: "us",
  flagAnimation: "float",
  basePath: "/medical-devices",
  referenceUrl: "https://www.fda.gov/medical-devices/premarket-submissions-selecting-and-preparing-correct-submission/premarket-notification-510k",
  milestones: [
    { day: 7, label: "Device classified and regulatory path chosen" },
    { day: 14, label: "Quality system and design controls in place" },
    { day: 21, label: "Software lifecycle, risk and cybersecurity files complete" },
    { day: 28, label: "510(k) submitted and post-market processes running" },
  ],
  weeks: [
    {
      week: 1,
      title: "Classification and Regulatory Path",
      days: "Days 1 to 7",
      description: "Decide whether the product is a regulated device, how it is classified, and which route to market applies.",
      tasks: [
        {
          title: "Decide whether the software is a medical device",
          hours: 2,
          control: "Software is a device when it is intended to diagnose, treat, mitigate, cure or prevent disease, or affect the structure or function of the body. Some software functions are excluded or fall under FDA enforcement discretion, such as general wellness apps and certain clinical decision support that lets the clinician independently review the basis for a recommendation.",
          how: "Write a clear intended use and indications for use statement. Compare each software function against FDA's guidance on device software functions and clinical decision support, and record the reasoning.",
          check: "A signed regulatory assessment states whether each function is a device, not a device, or under enforcement discretion, with the guidance relied on.",
        },
        {
          title: "Classify the device and choose the route to market",
          hours: 3,
          control: "FDA classifies devices as Class I, II or III by risk. Most Class II devices need a 510(k) showing substantial equivalence to a legally marketed predicate. Novel low-to-moderate risk devices without a predicate use De Novo; Class III devices need premarket approval (PMA).",
          how: "Search the FDA product classification and 510(k) databases for the product code and candidate predicates. Compare intended use and technological characteristics with each predicate.",
          check: "The product code, device class, regulation number and chosen predicate are documented, with a rationale for the route (510(k), De Novo or PMA).",
        },
        {
          title: "Pick the 510(k) type and plan a Pre-Submission",
          hours: 2,
          control: "A Traditional 510(k) is the default. A Special 510(k) covers certain changes to your own cleared device, and an Abbreviated 510(k) relies on guidance documents and recognised standards. A Pre-Submission (Q-Sub) lets you get FDA feedback on testing plans before submitting.",
          how: "Decide the 510(k) type. For new technology or uncertain testing, request a Pre-Submission meeting with specific questions on predicate choice, performance testing and cybersecurity.",
          check: "The submission type is recorded, and any Pre-Submission feedback is filed and reflected in the test plan.",
        },
        {
          title: "Plan for other markets at the same time",
          hours: 2,
          control: "Outside the US, ISO 13485 certification is usually required (for example under the EU MDR, UK MDR and Health Canada), often through the Medical Device Single Audit Program (MDSAP), which one audit can satisfy for several regulators.",
          how: "List target markets, their classification of the device and whether MDSAP fits. Build one technical file that can feed the 510(k) and other submissions.",
          check: "A market plan shows each jurisdiction, its route, and the shared evidence.",
        },
      ],
    },
    {
      week: 2,
      title: "Quality Management System (ISO 13485 and FDA QMSR)",
      days: "Days 8 to 14",
      description: "Build the quality system that every device decision rests on. In the US, the Quality Management System Regulation has incorporated ISO 13485:2016 since 2 February 2026.",
      tasks: [
        {
          title: "Set up the quality manual and document control",
          hours: 3,
          control: "ISO 13485:2016 requires a documented QMS covering management responsibility, resources, product realisation and measurement. Documents and records must be controlled, approved and retained. Under the QMSR, FDA can inspect management review, internal audit and supplier audit records.",
          how: "Write the quality manual and core procedures, set up an electronic document control system with approval workflows and version history, and define record retention.",
          check: "Procedures are approved and current, records are retrievable, and staff work from the controlled versions.",
        },
        {
          title: "Implement design controls",
          hours: 4,
          control: "Design and development must be planned and controlled: user needs, design inputs, outputs, reviews, verification, validation, transfer and changes, all kept in a design history file.",
          how: "Create a design and development plan, trace user needs to inputs, outputs, verification and validation in a traceability matrix, and hold formal design reviews at each phase.",
          check: "The traceability matrix shows every requirement verified and validated, and design review minutes are signed.",
        },
        {
          title: "Control suppliers and outsourced processes",
          hours: 2,
          control: "Suppliers that affect product quality, including cloud hosting and software component providers, must be evaluated, approved and monitored, with quality agreements where appropriate.",
          how: "Keep an approved supplier list with risk-based criteria, quality agreements for critical suppliers, and periodic re-evaluation.",
          check: "Critical suppliers are approved, monitored, and covered by agreements; supplier audit reports are available.",
        },
        {
          title: "Run CAPA, complaints and management review",
          hours: 3,
          control: "Corrective and preventive action (CAPA), complaint handling, internal audit and management review keep the QMS effective. In the US, complaints must also be assessed for medical device reporting.",
          how: "Define CAPA and complaint procedures with timelines, investigation and effectiveness checks; schedule internal audits and management reviews.",
          check: "CAPAs are closed with effectiveness verified, complaints are evaluated for reportability, and management review minutes cover the required inputs.",
        },
      ],
    },
    {
      week: 3,
      title: "Software Lifecycle, Risk and Cybersecurity (IEC 62304, ISO 14971)",
      days: "Days 15 to 21",
      description: "Show that the software was built, verified and maintained under a defined lifecycle, with risks and security threats controlled.",
      tasks: [
        {
          title: "Classify the software and plan the lifecycle (IEC 62304)",
          hours: 3,
          control: "IEC 62304 sets lifecycle processes for medical device software. Under the current edition (2006 with Amendment 1:2015), each software system gets safety class A (no injury possible), B (non-serious injury possible) or C (death or serious injury possible), which sets how much documentation and testing is required. A second edition is in final draft; it widens the scope to health software and reduces the classes to two levels.",
          how: "Assign the safety class from the risk analysis, write the software development plan, and decompose the architecture into software items so lower-risk items can be segregated.",
          check: "The safety class and its rationale are recorded, and the development plan covers requirements, architecture, design, testing, release, maintenance and problem resolution.",
        },
        {
          title: "Manage SOUP and third-party components",
          hours: 2,
          control: "Software of unknown provenance (SOUP), such as open-source libraries, must be identified with version, purpose and known anomalies, and assessed for risk.",
          how: "Maintain a SOUP list from the dependency manifest, record the requirements each component must meet, and monitor published vulnerabilities and anomalies.",
          check: "Every component in the build appears in the SOUP list or software bill of materials with version and risk assessment.",
        },
        {
          title: "Run risk management (ISO 14971)",
          hours: 3,
          control: "ISO 14971:2019 requires a risk management process across the device lifecycle: hazard identification, risk estimation and evaluation, risk controls, residual risk and benefit-risk, and production and post-production monitoring.",
          how: "Keep a risk management plan and file, link software hazards to risk controls and verification, and review residual risk against the benefit.",
          check: "The risk management report concludes that overall residual risk is acceptable, and every risk control is verified.",
        },
        {
          title: "Prepare the premarket cybersecurity file",
          hours: 4,
          control: "Under section 524B of the FD&C Act, a cyber device (one that includes software and can connect to the internet) must come with a plan to monitor and address vulnerabilities, coordinated disclosure, processes for updates and patches, and a software bill of materials (SBOM). FDA's premarket cybersecurity guidance sets out the expected documentation, such as threat modelling, security architecture and testing.",
          how: "Produce a threat model, security architecture views, SBOM, security risk assessment, penetration test results and a vulnerability management plan. IEC 81001-5-1 can structure the secure development lifecycle.",
          check: "Each cybersecurity item FDA expects is present, traceable to design and risk controls, and the SBOM matches the release build.",
        },
        {
          title: "Verify and validate the software",
          hours: 3,
          control: "Verification shows the software meets its requirements; validation shows the device meets user needs in the intended use environment, including usability (IEC 62366-1) where relevant.",
          how: "Run unit, integration and system testing per the safety class, perform validation with representative users, and record anomalies and their resolution.",
          check: "Test reports cover every requirement, open anomalies are assessed for risk, and validation results support the intended use.",
        },
      ],
    },
    {
      week: 4,
      title: "Submission and Post-Market",
      days: "Days 22 to 28",
      description: "File the 510(k), respond to FDA, and keep the device compliant once it is on the market.",
      tasks: [
        {
          title: "Assemble and submit the 510(k) in eSTAR",
          hours: 4,
          control: "510(k) submissions go to FDA in the electronic eSTAR template. The file shows substantial equivalence: device description, intended use, comparison with the predicate, software documentation at the right level, cybersecurity, performance testing and labelling.",
          how: "Complete eSTAR section by section from the technical file, pay the user fee, and keep a cross-reference from each eSTAR answer to the controlled source document.",
          check: "The eSTAR file is complete with no missing mandatory sections, and every claim links to evidence in the design history file.",
        },
        {
          title: "Handle FDA review and additional information requests",
          hours: 2,
          control: "FDA first checks the submission is complete, then reviews it. If FDA sends an additional information request, the review clock stops until you respond, and a submission is considered withdrawn if you do not respond in time.",
          how: "Assign a response lead, track each FDA question to an owner and due date, and answer with evidence rather than argument.",
          check: "Responses are filed on time and each FDA question is closed with a reference to supporting evidence.",
        },
        {
          title: "Register, list and label after clearance",
          hours: 2,
          control: "After clearance, the establishment must register and list the device with FDA, apply unique device identification (UDI) where required, and use only cleared claims in labelling and marketing.",
          how: "Complete registration and listing, submit UDI data where applicable, and run a claims review before any marketing material goes out.",
          check: "Registration and listing are current, UDI data is submitted, and marketing claims match the cleared indications.",
        },
        {
          title: "Run post-market surveillance and vulnerability management",
          hours: 3,
          control: "Once marketed, manufacturers must handle complaints, report adverse events (medical device reporting), manage corrections and removals, and monitor and fix cybersecurity vulnerabilities across the device's life.",
          how: "Monitor complaints, field data and vulnerability sources, assess each against risk files, and release patches under change control.",
          check: "Post-market data feeds back into risk management, reportable events are filed, and vulnerabilities are triaged and fixed within the plan's timelines.",
        },
        {
          title: "Control changes to the cleared device",
          hours: 2,
          control: "Changes to a cleared device may need a new 510(k). FDA guidance on deciding when to submit a 510(k) for a software change helps decide, and a predetermined change control plan (PCCP) can authorise planned changes, notably for AI-enabled devices, in advance.",
          how: "Assess every change with a documented decision on whether a new submission is needed, and consider a PCCP for planned model or software updates.",
          check: "Each release has a regulatory change assessment on file, consistent with FDA guidance and any authorised PCCP.",
        },
      ],
    },
  ],
};

export default function MedicalDevices() {
  return (
    <>
      <LearningFrameworkPage framework={FRAMEWORK} />
      <MedicalDeviceReference />
    </>
  );
}

export { FRAMEWORK };
