// Markdown outline for a risk assessment report. Generic placeholders only.
export const REPORT_OUTLINE_MD = `# Risk Assessment Report: Example Co.

Assessment period: [start date] to [end date]
Report date: [date]
Prepared by: Security Lead
Approved by: Approver

## 1. Scope
- Systems, services and locations in scope
- Data types in scope (customer data, personal data, financial data)
- Vendors and subservice organisations in scope
- Exclusions and why

## 2. Methodology
- Framework alignment: ISO/IEC 27001:2022 6.1.2, 6.1.3, 8.2, 8.3; ISO 31000; NIST SP 800-30; SOC 2 CC3.1 to CC3.4
- Likelihood scale (1 to 5) and impact scale (1 to 5) with definitions
- Score = likelihood x impact; bands: 1 to 4 Low, 5 to 9 Medium, 10 to 16 High, 17 to 25 Critical
- Risk appetite statement
- How fraud (CC3.3) and changes (CC3.4) were considered

## 3. Participants (roles)
| Role | Responsibility |
| --- | --- |
| Security Lead | Facilitated the assessment |
| CTO | Technology risks and treatment owner |
| Risk Owner(s) | Scored and accepted ownership of risks |
| Approver | Approved treatment plans and risk acceptances |

## 4. Summary heatmap
Insert the 5 x 5 heatmap showing the count of risks per likelihood and impact cell, inherent and residual.

## 5. Top risks
| ID | Scenario | Inherent | Residual | Owner | Treatment |
| --- | --- | --- | --- | --- | --- |
| R-x | | | | | |

## 6. Treatment plans
For each risk above appetite: linked controls, actions, owner, due date, status.

## 7. Accepted risks with sign-off
| ID | Scenario | Residual score | Reason for acceptance | Approver | Date | Next review |
| --- | --- | --- | --- | --- | --- | --- |

## 8. Changes since the last assessment
New, closed and re-scored risks, and the events that triggered changes.

## 9. Next review date
[date, no later than 12 months from this report, or sooner on a trigger event]
`;
