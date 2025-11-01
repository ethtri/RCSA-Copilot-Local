# Dashboard Data Contract (v1.0.0)

**Source payload:** `assets/data/dashboard-metrics.mock.json`  
**Last verified:** 2025-11-03 by Agent A08 – Data Contracts Steward  
**Verification evidence:** `Get-Content -Raw 'assets/data/dashboard-metrics.mock.json' | ConvertFrom-Json` executed in PowerShell to confirm schema and field coverage (see agent log 2025-11-03).

This contract defines how the dashboard shell (`src/pages/dashboard/`) binds mock metrics to design-system components. The contract inherits UX expectations from `docs/ux/cx-director-audit.md` and the legacy dashboard markup (`C:\Projects\RCSA_Demp_V6\frontend-examples\dashboard\dashboard.html`).

## Top-Level Schema
| JSON path | Type | Description | UI binding |
| --- | --- | --- | --- |
| `version` | string (semver) | Payload version for change tracking. | Surface in telemetry or console logs only; not rendered. |
| `updatedAt` | string (ISO 8601) | Timestamp of payload refresh. | Display as “Last updated” timestamp near header summary. |
| `summary` | object | High-level reporting context. | Drives banner chips above KPI grid. |
| `kpis` | array<object> | Executive tiles showing the four lead KPIs. | Maps to KPI card grid in main column. |
| `trendSeries` | array<object> | Time-series blocks feeding spark/line charts. | Each entry renders as a trend card with chart + target line. |
| `alerts` | array<object> | Operational alerts requiring attention. | Renders in secondary column or marquee card. |
| `actionQueue` | object | Owner + backlog of remediation tasks. | Renders as “Action Queue” card with owner header and item list. |
| `dataQuality` | object | Data freshness indicators. | Display as footer callout beneath dashboard grid. |

## Summary Banner (`summary`)
| JSON path | Type | Format & validation | UI binding & behavior |
| --- | --- | --- | --- |
| `summary.reportingWindow` | string | Free text (`Q3 FY25`, `Oct 2025`). | Title chip next to page heading. Keep typography token `fcb-eyebrow`. |
| `summary.refreshFrequency` | string | Expect `{Cadence} {HH:MM TZ}`. | Secondary caption below heading (“Refreshes Daily 06:00 ET”). |
| `summary.dataMode` | string enum (`mock`, `live`, `staging`) | Lowercase code. | Render as status pill (e.g., “Mock data”) using neutral badge token. Drives tooltip explaining source. |

## KPI Tiles (`kpis[]`)
Each KPI renders inside a design-system card (`fcb-card`) with numeric headline, trend chip, and narrative tooltip.

| JSON path | Type | Format & validation | UI binding & behavior |
| --- | --- | --- | --- |
| `kpis[].id` | string (slug) | Use lowercase with hyphens. | Data attribute for automation hooks (`data-kpi-id`). |
| `kpis[].label` | string | <= 45 chars for layout. | Card heading (`fcb-h6`). |
| `kpis[].value` | number | Integer or decimal. | Main metric. Apply locale formatting via `Intl.NumberFormat`. |
| `kpis[].unit` | string enum (`percent`, `count`, `days`) | Case-sensitive. | Controls suffix and aria-label (`37 percent`, `18 issues`). |
| `kpis[].trend.direction` | string enum (`up`, `down`, `flat`) | Values align with arrow icons. | Render directional arrow + color (up=success token, down=danger). `flat` should map to neutral. |
| `kpis[].trend.percentage` | number | Signed delta. Negative allowed when direction=`down`. | Display as `+5.2 ppt` or `-9.1 ppt`. Use sign from value, not direction. |
| `kpis[].target` | number | Same scale as `value`. | Show as tertiary text (“Target 35”). |
| `kpis[].changeNarrative` | string | Sentence case narrative. | Tooltip / expandable hint below metric. Required for accessibility summary. |

## Trend Series (`trendSeries[]`)
| JSON path | Type | Format & validation | UI binding & behavior |
| --- | --- | --- | --- |
| `trendSeries[].id` | string (slug) | Unique per chart. | Wrapper `id` for canvas/SVG. |
| `trendSeries[].title` | string | <= 60 chars. | Card heading. |
| `trendSeries[].description` | string | Sentence describing business value. | Intro paragraph; ensures accessible chart summary. |
| `trendSeries[].series[].name` | string | Series label. | Legend + tooltip label. |
| `trendSeries[].series[].values[].date` | string (YYYY-MM-DD) | ISO date without time. | X-axis tick; convert to locale display (`Sep 1`). |
| `trendSeries[].series[].values[].value` | number | Real number. | Data point plotted. |
| `trendSeries[].series[].target` | number | Optional threshold per series. | Render as horizontal target guide; include aria note in description. |

## Alerts (`alerts[]`)
| JSON path | Type | Format & validation | UI binding & behavior |
| --- | --- | --- | --- |
| `alerts[].id` | string (slug) | Unique. | `data-alert-id` for instrumentation. |
| `alerts[].severity` | string enum (`high`, `medium`, `low`) | Lowercase. | Map to badge tokens (`--fcb-danger`, `--fcb-warning`, `--fcb-info`). |
| `alerts[].title` | string | <= 80 chars. | Alert heading. |
| `alerts[].message` | string | Multi-sentence allowed. | Body copy. Ensure accessible summary. |
| `alerts[].cta.label` | string | Action verb phrase. | Primary button text. |
| `alerts[].cta.href` | string (URL or path) | Relative path expected. | Button link. Validate for static site routing. |

## Action Queue (`actionQueue`)
| JSON path | Type | Format & validation | UI binding & behavior |
| --- | --- | --- | --- |
| `actionQueue.owner` | string | Team or role. | Card subtitle (“Owner: First Line Risk Office”). |
| `actionQueue.items[].id` | string | Unique slug. | `data-action-id`. |
| `actionQueue.items[].title` | string | <= 80 chars. | List item heading. |
| `actionQueue.items[].status` | string enum (`not-started`, `in-progress`, `blocked`, `complete`) | Lowercase. `complete` not present yet but reserved. | Render as status pill; map to color tokens (neutral, info, danger, success). |
| `actionQueue.items[].dueDate` | string (YYYY-MM-DD) | ISO date. | Display as “Due Oct 15, 2025”. Highlight overdue by comparing to today. |
| `actionQueue.items[].owner` | string | Individual or group. | Secondary text line. |
| `actionQueue.items[].linkedRiskId` | string | Must match `wizard` risk IDs. | Link to wizard step or risk detail. Validate against wizard contract. |
| `actionQueue.items[].tags[]` | array<string> | Lowercase tokens. | Render as chips for filtering; align with design-system pill styling. |

## Data Quality (`dataQuality`)
| JSON path | Type | Format & validation | UI binding & behavior |
| --- | --- | --- | --- |
| `dataQuality.completeness` | integer (0-100) | Percentage. | Progress badge (“Completeness 96%”). |
| `dataQuality.lagDays` | integer | Non-negative. | Text string (“Lag: 1 day”). Apply pluralization. |
| `dataQuality.notes` | string | Freeform. | Body copy in muted callout; required for context. |

## Known Gaps & Follow-Ups
- Confirm styling tokens for `alerts[].severity` and `actionQueue.items[].status` so pill colors match WS-03 guidance (needs WS-03 + design-system input).
- Decide whether `summary.dataMode` should toggle mock-data banner globally; update Definition of Done if global behavior adopted.
- Determine visualization component for `trendSeries` (native SVG vs. lightweight chart helper). Document implementation notes once selected.
- Establish cross-check automation to ensure `actionQueue.items[].linkedRiskId` lines up with wizard risk IDs (add lint script or schema validation).

## Change Management
- Update this contract when payload structure changes and log the revision in `docs/operations/decision-register.md`.
- Notify WS-05 owners; delivery plan updated (2025-11-03) to point at this contract for implementation readiness.
