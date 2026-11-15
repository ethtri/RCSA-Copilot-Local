# Concept generation prompts

Built-in Image Gen, November 14, 2026. Existing four screens edited non-destructively; nine missing screens/states generated with approved references. Final user review is pending.

## Shared brief

High-fidelity complete banking RCSA application UI concept. Preserve approved reference's white canvas, cool very light grey sidebar, ink text, deep teal primary buttons, restrained amber risk cautions, professional sans typography, clean open layouts with fine dividers. No gradients, decorative icons, hero marketing, excess cards, arbitrary confidence metrics. Desktop composition 1600x1000 landscape16:10, generous gutters, readable 14-16px body. ONE common shell: sidebar 230px at1600 width, "RCSA" wordmark, "My work", "Assessments", "Reports", bottom "Illustrative demo". Top context bar ONLY role/team, no search/bell/help icons. On assessment screens common header "Wire transfers" subtitle "Q4 2026 refresh · Payments Operations"; identical thin UNDERLINED stage navigation "What changed", "Inherent risk", "Controls", "Residual risk & response", "Review". Primary actions same flat deep teal, radius6. Sources in persistent right panel, qualifications visible. Dates FIXED test Sep 15, 2026; urgent-route procedure Oct 5, 2026; near miss Oct 20, 2026; assessment Nov 14, 2026; testing action due Nov 28, 2026. Rating vocabulary likelihood1 Rare,2 Unlikely,3 Possible,4 Likely,5 Almost certain; impact1 Minor,2 Moderate,3 Significant,4 Major,5 Severe. Only numeric axes1-5 on any matrices, with glossary link. Band score1-4Low,5-9Moderate,10-15Elevated,16-25High. Main inherent4x4=16High; prior residual2x4=8Moderate; refreshed current3x4=12Elevated. Two other processes Payment details and Cutoff management both current Moderate6. Ratings chosen by humans, planned actions never reduce current risk. Keep all UI text native-implementable later. Concept image only. 

## assessment-workspace-v2

Reference: assessment-workspace.png

EDIT reference preserving composition. Standardize shell and header to common spec. Inherent risk selected. Keep forms, likelihood4 Likely, impact4 Major, separate rationales, prior/current High16, human confirmation button. Replace decorative orange heatmap by precisely cell-banded 5x5 matrix: grey-green1-4, desaturated teal5-9, amber10-15, muted terracotta16-25, selected4,4 labelled16. Thin borders, numeric axes only. AI note label Suggested rather than unqualified warning. Remove utility header icons. No extra sections.

## shared-dependency-v2

Reference: shared-dependency.png

EDIT preserve original dependency diagram/evidence panel; standardize shared header/stage UNDERLINE Controls selected and sidebar geometry. Within content smaller heading 'Two checks. One shared dependency.' Keep two nodes Callback verification and Supervisory approval connected to Customer-contact record and 'Owner confirmation needed'. Right evidence panel dates both Oct5 2026, actual procedure excerpts. Text 'A shared source does not prove that either control failed.' Evidence coverage note test Sep15 before new route Oct5. Owner confirms via single primary 'Confirm dependency', quiet 'Dismiss suggestion'. No sidebar accent stripe. No utility icons.

## first-line-dashboard-v2

Reference: first-line-dashboard.png

EDIT preserve first-line dashboard layout. My work selected. Header 'Payments Operations · First line' only. State is INITIAL REFRESH before ratings confirmed: Wire transfers current confirmed risk Moderate8 (prior approved), assessment Refresh due, task Review changes due Nov19 2026; two other processes Moderate6 Reviewed. Current risk summary Moderate3 processes, remove Elevated1. No open reviewer question in initial state: replace Payment verification task with 'Procedure update · Scope confirmation needed'. Testing action not yet created, replace callback task with 'Testing evidence · Check coverage'. Bottom simple timeline 'Assessment refresh · Nov 19, 2026' and 'Next evidence review · Nov 28, 2026'. No stale dates or action implying test complete. Keep elegant airy dashboard.

## second-line-dashboard-v2

Reference: second-line-dashboard.png

EDIT preserve dashboard composition and typography, fix My work selected in sidebar. Context 'Operational Risk · Second line'. Snapshot SUBMITTED before challenge: wire Elevated12 Awaiting review, other2Moderate6Reviewed. Matrix numeric axes1-5 only; amber marker at likelihood3 impact4 Wire transfers, teal grouped marker at likelihood2 impact3 '2 processes'. No verbal axis labels. Review status Awaiting1 Reviewed2. REMOVE Open challenge1 and Questions to resolve from this pre-challenge snapshot; replace with 'Suggested review focus' and text 'Does the proposed test cover urgent wires after contact changes?' marked Suggested, not raised. Teal 'Review assessment' primary, no utility icons, no colored row side-stripe.

## what-changed

Reference: assessment-workspace.png

NEW SCREEN using reference as style only. What changed stage selected. Title 'Focus on what changed'. Three airy source rows: 'Urgent-wire route introduced' Oct5, 'Fraud attempt intercepted' Oct20, 'Latest test predates the change' Sep15. Main focus selected procedure with two-column 'Previous procedure' / 'Current procedure', concise highlighted new text 'Urgent requests may use the exception route with supervisory approval.' Right persistent panel 'Why it matters' Suggested 'The test covered standard wires before the urgent route existed.' Source title/date/excerpt visible. Bottom owner control 'Relevant to this assessment' checked and primary 'Confirm scope'. No numeric ratings yet.

## control-evidence

Reference: assessment-workspace.png

NEW SCREEN Controls selected. Heading 'What do the controls support?' Left compact list Callback verification selected; Supervisory approval. Main separates 'Design' documented objective verify request with registered contact, owner Payments Operations; 'Operating evidence' latest test Sep15, population standard wires, 'No exceptions in tested sample'. Explicit visible 'Urgent route not tested'. Right panel 'Test scope' actual excerpt '25 standard-wire samples reviewed. Urgent exception route not in scope.' Suggested 'This evidence does not establish performance of the route introduced Oct5.' Secondary inline discovery link 'Inspect shared contact source'. Human selects operating conclusion 'Not established for urgent route'; primary 'Confirm control assessment'. No automatic failure or risk score deduction.

## residual-response

Reference: assessment-workspace.png

NEW SCREEN Residual risk & response selected. Heading 'Confirm the risk that remains'. Compact top prior/current comparison 'Prior Moderate8' 'Current Elevated12'. Main editable human form Likelihood3 Possible, rationale 'Urgent exception route introduces exposure not covered by current testing.' Impact4 Major separate rationale 'Unauthorized payment could cause material loss.' RIGHT succinct assessment basis 'Inherent High16', 'Urgent route untested', 'Shared contact source confirmed', 'Above demo tolerance'. Lower open action row 'Test urgent-wire verification and contact changes', owner Payments Operations, due Nov28 2026, closure evidence 'Document test population, exceptions and independent verification.' AI suggestion small 'Check that training alone addresses the identified cause.' Current risk qualification visible 'Planned actions do not change current risk.' Primary Confirm residual assessment. Legible fit no clipping.

## first-line-handoff

Reference: assessment-workspace.png

NEW SCREEN Review selected. Heading 'Review and send'. Main concise key-value summary Scope Wire transfers Q4, Inherent High16, Current residual Elevated12, urgent route coverage Not established, contact dependency Confirmed by owner. Action Targeted testing / Owner Payments Operations / DueNov28 / StatusOpen. Right panel 'Suggested handoff summary' concise paragraph preserving elevated risk, shared source and testing limitation, links 'Edit summary' 'View sources'. Bottom checked owner attestation 'I confirm the assessment and its recorded limitations.' name 'Alex Morgan · Assessment owner' Nov14 2026. Primary 'Send for review'. Separate clear management disposition 'Escalation recorded · Decision pending', not risk acceptance. Visually clean compact decision record.

## second-line-review

Reference: assessment-workspace.png

NEW SCREEN same shared assessment layout, context Operational Risk Second line. Review stage selected. Heading 'Review the conclusion and its evidence'. Main two open columns 'First-line conclusion' current Elevated12, rationale, control qualification; 'Evidence to inspect' procedureOct5, testSep15, near missOct20, shared contact record link. Persistent right panel 'Suggested question' text 'How will targeted testing cover urgent wires after contact changes, and how will interim verification avoid the same dependency?' Buttons quiet Edit question and primary Send challenge. Submitted version1 ownerAlexMorgan, reviewerJordanLee. Reviewer's conclusion not set yet. Do not show AI as owner of question. No risk adjustment control for reviewer.

## challenge-response

Reference: assessment-workspace.png

NEW SCREEN review stage, context Payments Operations First line. Heading 'Respond to the review question'. Small header Open challenge from Jordan Lee, linked Callback verification and testing action. Main thread reviewer question 'Will testing include urgent requests after contact changes? How will interim checks avoid the same contact source?' Below RESPONSE editor prepared substantive text 'Include post-change urgent requests and recently amended contact records. Record exceptions and document the independent source used for verification.' Right panel 'Response coverage' Suggested: Test population Addressed, Contact changes Addressed, Closure evidence Needs detail. Inline closure evidence field 'Provide test results, exceptions and proof of verification source.' Renewed owner attestation version2 visible. Primary 'Confirm revision and respond'. Open testing action dueNov28 remains separate. Teal/white clean no chat bubbles or avatars overload.

## leadership-report

Reference: second-line-dashboard.png

NEW SCREEN Reports selected; no assessment stepper, role Operational Risk Second line. Heading 'Wire-transfer assessment summary'. Subtitle Q4 2026 Nov14 2026, 'Review completed' separate from 'Testing action open' and 'Management decision pending'. Hero narrative normal sized text 'Current residual risk remains elevated while targeted testing of the urgent route is outstanding.' Main elegant comparison rows Inherent High16 unchanged; prior residual Moderate8; current residual Elevated12. Accessible simple horizontal comparison chart labelled exact8and12 not numeric hero cards. Section 'What changed' procedure updatedOct5, standard test predates change, two checks share contact record. 'Management response' targeted test ownerPaymentsOperations dueNov28Open. Slim right source index with traceable links Prior assessment, Procedure, Test scope, Review history. Bottom reviewerJordanLee reviewed version2 and ownerAlexMorgan confirmed. Quiet 'View assessment', primary 'Confirm report narrative'. No implication risk reduced or accepted.

## assessment-mobile

Reference: assessment-workspace.png

NEW RESPONSIVE CONCEPT portrait mobile390x844 composition, high resolution readable. Preserve white/teal same design. Sidebar collapses to menu button topRCSA and First line. Wire transfers header. Horizontal compact step control '2 of 5 · Inherent risk', previous/next cues. Risk selector Unauthorized wire transfer. 'Risk before controls' form single column likelihood4Likely, impact4Major, separate short rationale paragraphs, compact score High16 with 'View rating guide' control opens persistent accessible sheet (closed in this concept). Bottom action Confirm inherent assessment full width, stable clear footer. No 3column desktop squeezed, no 5x5 heatmap dominating. Show complete viewport and natural scroll continuation, no clipping button.

## review-tablet

Reference: assessment-workspace.png

NEW RESPONSIVE TABLET CONCEPT portrait834x1112 composition high resolution. Same design. Narrow collapsed icon rail with text current Assessments accessible menu. Header Wire transfers Q4, Operational Risk Second line. Compact five-stage navigation Review selected. Main 'Review and challenge'. Stacked firstline conclusion Elevated12 with untested route qualifier, evidence rows. Right drawer overlays part with clear close button title 'Test scope' sourceSep15, excerpt25standardwires before urgent route. Underlying suggested question visible enough readable. Bottom Send challenge action outside drawer no clipped primary. Drawer keyboard-friendly persistent UI, generous text readable rather than tiny dense desktop.

## Focused corrections

{
  "visual": [
    {
      "key": "second-line-dashboard-v3",
      "path": "C:/Repos/RCSA_Accelerator/docs/ux/concepts/2026-11-14/second-line-dashboard.png",
      "prompt": "Precisely edit this approved dashboard screenshot, preserving its composition and spacious proportions. Do NOT add new sections, side panels, assessment stage tabs, source lists or glossary. Change sidebar selected item to My work. Remove utility icons in top-right. Keep heading Focus your review and its three process rows. Wire transfers Awaiting review; two other processes Reviewed. Change risk matrix axes to ONLY numbers1–5 (remove all verbal axis descriptions); amber point at3,4 labelled Wire transfers Elevated12; teal point at2,3 labelled 2 processes Moderate6. Keep Reviewed2 Awaiting1. Remove Open challenge bar entirely because this snapshot is before a challenge. Replace bottom Questions to resolve heading with Suggested review focus and sentence Does the proposed test cover urgent wires after contact changes? Remove Raised by reviewer wording; add small Suggested label. Do not invent dates. Keep existing white/grey/teal design, flat buttons, crisp readable native UI mock."
    },
    {
      "key": "shared-dependency-v3",
      "path": "C:/Users/ethtr/.codex/generated_images/01a1daeb-fc2d-7bb2-9153-7fb68fadc050/exec-493ebed2-0b3f-4edb-acf3-2c3dd56908be.png",
      "prompt": "Edit this exact UI image only to normalize the shell. Keep dependency diagram, source excerpts, source dates and human decisions EXACTLY. Replace top context header with Payments Operations · First line. Add main page heading Wire transfers with subtitle Q4 2026 refresh · Payments Operations, then thin UNDERLINED TEXT TABS What changed / Inherent risk / Controls / Residual risk & response / Review. Remove stage circles and connector lines entirely, Controls tab underlined teal. Make inside discovery heading smaller to fit. Preserve all other content, clear typography, spacious white/teal design and readable diagram. No new panels/fields."
    },
    {
      "key": "assessment-workspace-v3",
      "path": "C:/Users/ethtr/.codex/generated_images/01a1daeb-fc2d-7bb2-9153-7fb68fadc050/exec-144b30a8-7089-4330-9c66-12e83a92d9d3.png",
      "prompt": "Edit exact screenshot preserving body form and composition. Header context should read Payments Operations · First line. Risk list retains Unauthorized wire transfer, Incorrect payment details, Delayed execution (not process names). Simplify right Rating guide: remove Sources section and tiny cramped glossary paragraphs. Matrix is a neutral VERY LIGHT GREY 5×5 grid with numeric axes1-5; ONLY selected4,4 cell has muted terracotta with16 and teal outline. NO other cell colors. Under it clean text High16; sentence Score = likelihood × impact. Four compact rating bands Low1–4 Moderate5–9 Elevated10–15 High16–25 with small swatches. One link View rating definitions opens details later. Keep separate likelihood4Likely and impact4Major rationales. No invented sections. Preserve whitespace, fonts, teal confirm action."
    }
  ],
  "headers": [
    [
      "what-changed",
      "exec-afa86a27-fb30-4b11-a4cf-89fd95bdaeeb.png",
      ""
    ],
    [
      "control-evidence",
      "exec-d292e766-997a-474a-9084-d6170f9353e8.png",
      ""
    ],
    [
      "residual-response",
      "exec-2be5c021-3b84-4acf-91eb-d020a0104001.png",
      "CRITICAL replace subtitle 'Assess the risk after considering existing controls and planned actions.' with EXACT 'Assess the risk after considering existing controls.' Planned actions MUST NOT be included in current risk. In Sources change 'Control test (urgent route)' to 'Control test (standard route)'. Keep bottom planned-actions-do-not-change-current-risk qualification."
    ],
    [
      "first-line-handoff",
      "exec-ca536a1a-4088-445c-add8-10d071116c72.png",
      ""
    ]
  ]
}
