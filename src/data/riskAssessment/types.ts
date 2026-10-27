// Shared types for the Risk Assessment & Treatment module.
// All content lives in the sibling data files so it can be edited without touching components.

export type Cia = 'C' | 'I' | 'A';

export type TreatmentOption = 'Mitigate' | 'Transfer' | 'Avoid' | 'Accept';

export type WorkflowState =
  | 'Identified'
  | 'Assessed'
  | 'Treatment planned'
  | 'Treatment incomplete'
  | 'Treatment OK'
  | 'Pending approval'
  | 'Approved'
  | 'Review due';

export type ApprovalStatus = 'Not submitted' | 'Pending approval' | 'Approved' | 'Rejected';

export interface ScaleLevel {
  value: number;
  label: string;
  definition: string;
}

export interface ScoreBand {
  label: 'Low' | 'Medium' | 'High' | 'Critical';
  min: number;
  max: number;
  color: string;
  text: string;
  action: string;
}

export interface Control {
  id: string;
  name: string;
  description: string;
  soc2: string[];
  otherMappings?: string[];
  tests: string[];
  evidence: string[];
}

export interface RiskRow {
  id: string;
  scenario: string;
  categories: string[];
  cia: Cia[];
  owner: string;
  approver: string;
  likelihood: number;
  impact: number;
  treatment: TreatmentOption;
  treatmentStatus: WorkflowState;
  residualLikelihood: number;
  residualImpact: number;
  approvalStatus: ApprovalStatus;
  controls: string[];
  identifiedDate: string;
  lastReviewedDate: string;
  approvalDate: string;
  recommended?: boolean;
  note?: string;
  source?: 'seed' | 'library';
}

export interface LibraryScenario {
  id: string;
  category: string;
  scenario: string;
  cia: Cia[];
  likelihood: number;
  impact: number;
  controls?: string[];
}

export interface CrossCheckRow {
  ref: string;
  requirement: string;
  whatToDo: string;
  controls: string[];
  tests: string[];
  evidence: string[];
}

export interface FrameworkCrossCheck {
  id: string;
  name: string;
  summary: string;
  rows: CrossCheckRow[];
}
