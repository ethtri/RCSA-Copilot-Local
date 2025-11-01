# Wizard Data Contract (v1.0.0)

**Source payload:** `assets/data/wizard-insights.mock.json`  
**Last verified:** 2025-11-03 by Agent A08 – Data Contracts Steward  
**Verification evidence:** `Get-Content -Raw 'assets/data/wizard-insights.mock.json' | ConvertFrom-Json` executed in PowerShell to inspect each array/object (documented in agent log 2025-11-03).

This contract covers the assessment wizard experience (`src/pages/wiz-assessment/`), aligning with UX pillars in `docs/ux/cx-director-audit.md` and component guidance in `docs/ux/pattern-library/wizard-step-card.html`.

## Top-Level Schema
| JSON path | Type | Description | UI binding |
| --- | --- | --- | --- |
| `version` | string (semver) | Payload version for compatibility checks. | Logged for telemetry; not displayed. |
| `process` | object | Core workflow metadata (title, steps, modes). | Drives wizard header, progress indicator, and mode selector. |
| `risks` | array<object> | Risk catalog powering selection panes. | Populates step card risk list + badges. |
| `controls` | array<object> | Control library for mapping steps. | Feeds control chips and detail drawers. |
| `insights` | object | AI highlight messaging + metrics. | Powers automation sidebar and KPI badges. |
| `riskRelationships` | array<object> | Connective tissue between risks, steps, controls, strategies. | Supports contextual highlights per step. |
| `responseLibrary` | object | Strategies and action items backlog. | Populates response planning panes + exports. |
| `exportTemplates` | object | Executive summary wiring. | Guides export/print templates. |

## Process Definition (`process`)
| JSON path | Type | Format & validation | UI binding & behavior |
| --- | --- | --- | --- |
| `process.defaultName` | string | <= 60 chars. | Fallback heading when custom name omitted. |
| `process.displayName` | string | <= 75 chars. | Primary wizard hero title. |
| `process.stepCount` | integer | Must equal `process.steps.length`. | Input to progress meter denominator. |
| `process.steps[]` | array<object> | Ordered step descriptors. | Each entry maps 1:1 to wizard panes (`wizard-step-card`). |
| `process.steps[].id` | string (slug) | Unique. | Step key for routing/state. |
| `process.steps[].label` | string | Short step title. | Progress chip text + card header eyebrow. |
| `process.steps[].description` | string | <= 160 chars. | Intro paragraph beneath header. |
| `process.steps[].order` | integer | Sequential (1..n). | Drives progress numbering. |
| `process.steps[].milestone` | string enum (`Discover`, `Quantify`, `Plan`, `Validate`, `Respond`, `Finalize`) | Title case. | Milestone pill; align colors with milestone palette. |
| `process.steps[].objective` | string | Sentence case. | Secondary text in header. |
| `process.steps[].ownerRole` | string | Role label. | Display in metadata row (“Owner: Risk Steward”). |
| `process.steps[].deliverables[]` | array<string> | 1-3 items typical. | Render as bullet list inside step card. |
| `process.steps[].durationDays` | integer | Positive. | Show as timeline chip (“~2 days”). |
| `process.steps[].riskId` | string | Must match `risks[].id`. | Default focus risk for pane. |
| `process.steps[].linkedRiskIds[]` | array<string> | Optional extras. | Used for multi-risk context callouts; dedupe & validate. |
| `process.modes[]` | array<object> | Optional toggles (guided vs rapid). | Render as segmented control when more than one entry present. |
| `process.modes[].id` | string | Slug. | `data-mode-id` and analytics key. |
| `process.modes[].label` | string | <= 45 chars. | Visible toggle label. |
| `process.modes[].description` | string | <= 120 chars. | Tooltip/assistive text. |

## Risk Catalog (`risks[]`)
| JSON path | Type | Format & validation | UI binding & behavior |
| --- | --- | --- | --- |
| `risks[].id` | string (slug) | Unique. | Checkbox `id`/`value`. Must remain stable for cross-links. |
| `risks[].title` | string | <= 80 chars. | Risk card heading. |
| `risks[].category` | string | Taxonomy label. | Subtitle badge; map to color tokens by taxonomy. |
| `risks[].description` | string | Paragraph length allowed. | Risk description copy. |
| `risks[].defaultLikelihood` | integer (1-5) | Aligns with 5x5 matrix scale. | Pre-populates inherent matrix. |
| `risks[].defaultImpact` | integer (1-5) | Aligns with 5x5 matrix scale. | Pre-populates inherent matrix. |
| `risks[].tags[]` | array<string> | Lowercase keywords. | Render as filter chips (optional). |
| `risks[].aiSummary` | string | <= 160 chars. | Tooltip / AI highlight snippet. |
| `risks[].controlsSuggested[]` | array<string> | IDs expected in `controls`. | Cross-reference for quick add actions. |
| `risks[].owner` | string | Team/role. | Display in metadata row or detail drawer. |
| `risks[].primaryStepId` | string | Must match step `id`. | Drives default pane association. |
| `risks[].relatedStepIds[]` | array<string> | Additional step IDs. | Highlight relevant steps in progress indicator. |
| `risks[].relatedControlIds[]` | array<string> | Control IDs. | Pre-select control chips. |
| `risks[].residualTarget` | number | Target residual score (0-25). | Visualized in residual heat map and summary callout. |

## Control Library (`controls[]`)
| JSON path | Type | Format & validation | UI binding & behavior |
| --- | --- | --- | --- |
| `controls[].id` | string (slug) | Unique. | `data-control-id`. |
| `controls[].title` | string | <= 80 chars. | Control card heading. |
| `controls[].type` | string enum (`preventive`, `detective`, `corrective`) | Lowercase. | Drives badge color (`preventive`=primary, `detective`=info, `corrective`=warning). |
| `controls[].description` | string | Short paragraph. | Body copy in control list. |
| `controls[].linkedRisks[]` | array<string> | Valid risk IDs. | Filter controls by risk context. |
| `controls[].effectivenessRange.min` | integer (1-5) | Range lower bound. | Display as slider defaults / textual range. |
| `controls[].effectivenessRange.max` | integer (1-5) | Range upper bound. | Use to cap rating inputs. |

## AI Insights (`insights`)
| JSON path | Type | Format & validation | UI binding & behavior |
| --- | --- | --- | --- |
| `insights.aiHighlights[]` | array<object> | Highlight cards. | Populate automation sidebar callouts. |
| `insights.aiHighlights[].id` | string | Unique highlight slug. | `data-highlight-id`. |
| `insights.aiHighlights[].riskId` | string | Valid risk ID. | Determines which pane surfaces the highlight. |
| `insights.aiHighlights[].message` | string | <= 160 chars. | Card body copy. |
| `insights.aiHighlights[].nextBestAction` | string | Action sentence. | CTA text or checklist entry. |
| `insights.aiHighlights[].confidence` | number (0-1) | Decimal 2dp. | Render as badge (“78% confidence”). |
| `insights.badgeThresholds.controlCoverage` | integer | Percentage. | Defines “success” badge gating for coverage metric. |
| `insights.badgeThresholds.riskReduction` | integer | Percentage. | Use for progress meter gating. |
| `insights.badgeThresholds.issueClosureRate` | integer | Percentage. | Drives “on track” vs “lagging” badge. |
| `insights.metrics.riskReduction` | integer | Percentage. | Display in metric tiles near progress indicator. |
| `insights.metrics.controlCoverage` | integer | Percentage. | Metric tile. |
| `insights.metrics.automationUplift` | integer | Percentage. | Metric tile or tooltip. |

## Risk Relationships (`riskRelationships[]`)
These objects provide a join table linking risks, steps, controls, strategies, and insights for context-aware UI states.

| JSON path | Type | UI binding & behavior |
| --- | --- | --- |
| `riskRelationships[].riskId` | string | Primary key; must match `risks[].id`. |
| `riskRelationships[].primaryStepId` | string | Step shown as “primary focus” chip. |
| `riskRelationships[].supportingStepIds[]` | array<string> | Additional steps to highlight in navigation/wizard timeline. |
| `riskRelationships[].controlIds[]` | array<string> | Prefills control selections or quick links. |
| `riskRelationships[].strategyIds[]` | array<string> | Maps to `responseLibrary.strategies`. |
| `riskRelationships[].insightIds[]` | array<string> | Associates AI highlights; can be empty array. |
| `riskRelationships[].summary` | string | Display as contextual summary near residual overview. |

## Response Library (`responseLibrary`)
| JSON path | Type | Format & validation | UI binding & behavior |
| --- | --- | --- | --- |
| `responseLibrary.strategies[]` | array<object> | Strategy catalog. | Populate dropdown or checklist in response-planning step. |
| `responseLibrary.strategies[].id` | string | Unique slug. | Data key for linking from `riskRelationships`. |
| `responseLibrary.strategies[].title` | string | <= 80 chars. | Strategy heading. |
| `responseLibrary.strategies[].description` | string | <= 160 chars. | Tooltip / body copy. |
| `responseLibrary.strategies[].linkedRisks[]` | array<string> | Valid risk IDs. | Filter strategies by active risk. |
| `responseLibrary.actionItems[]` | array<object> | Planned remediation backlog. | Render as list in response step and export summary. |
| `responseLibrary.actionItems[].id` | string | Unique slug. | `data-action-id`. |
| `responseLibrary.actionItems[].title` | string | <= 80 chars. | List heading. |
| `responseLibrary.actionItems[].description` | string | <= 160 chars. | Supporting copy. |
| `responseLibrary.actionItems[].ownerRole` | string | Role string. | Secondary text. |
| `responseLibrary.actionItems[].dueInDays` | integer | Positive. | Convert to due date or relative timeframe (“Due in 14 days”). |
| `responseLibrary.actionItems[].linkedRiskId` | string | Valid risk ID. | Filtered display when risk selected. |
| `responseLibrary.actionItems[].recommendedControls[]` | array<string> | Control IDs. | Show as quick-link chips. |

## Export Templates (`exportTemplates`)
| JSON path | Type | Format & validation | UI binding & behavior |
| --- | --- | --- | --- |
| `exportTemplates.summary` | string | Document title. | Heading when generating PDF/print summary. |
| `exportTemplates.dataPoints[]` | array<object> | Data bindings for exports. | Map to key-value list. |
| `exportTemplates.dataPoints[].label` | string | Printable label. | Render as left column. |
| `exportTemplates.dataPoints[].valuePath` | string | JSONPath-like pointer. | Implementation must resolve arrays (`[].`) before export. |
| `exportTemplates.dataPoints[].format` | string enum (`string`, `list`, `percent`) | Controls formatting helper. | Ensure percent values append `%` and lists join with `•` bullets. |

## Known Gaps & Follow-Ups
- `exportTemplates.dataPoints[].valuePath` references `risks.selected[]`, but the payload does not ship a `selected` property. Implementation should maintain selection state client-side and extend export resolver accordingly. Track this gap with WS-06 before build start.
- Milestone-to-color mapping is unspecified; coordinate with WS-03 to align milestone badges to design tokens.
- Confirm whether `insights.metrics` should mirror dashboard KPI formatting (percent vs absolute). Document shared helper once chosen.
- Require schema validation to ensure `riskRelationships[].controlIds[]` and `responseLibrary.actionItems[].recommendedControls[]` only include IDs found in `controls[]`.

## Change Management
- Update this contract whenever fields are added/removed from `wizard-insights.mock.json` and log corresponding decision (e.g., `D-YYYY-MM-DD-##`) in `docs/operations/decision-register.md`.
- WS-06 relies on this mapping to satisfy Definition of Done data requirements; delivery plan updated 2025-11-03 to reference this contract.
