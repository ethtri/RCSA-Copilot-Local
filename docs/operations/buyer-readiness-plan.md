# Buyer readiness implementation plan

Update: the manual GRC handoff UI described below was superseded by the user-approved [automatic-sync experience](automatic-grc-sync-plan.md). Keep integration work in the background; do not restore the transfer console to primary navigation.

Status: implemented and verified locally. See [verification and independent rechecks](../../output/buyer-readiness-implementation-2026-11-14/verification.md).

November 14, 2026. Implement the simulated buying committee recommendations in the existing local HTML/ES-module app. This authorizes no live GRC connector, production identity, bank data ingestion or external service.

1. Add a GRC handoff workspace using the existing design system and generated reference `docs/ux/concepts/buyer-readiness/grc-handoff.png`. Use the same header, serif headings, green actions, white sheets, thin borders and readable native tables. Preserve existing assessment routes.
2. Implement a local reference adapter with stable external assessment/risk/control/action IDs, explicit field ownership and versioned import. Import binds the reference baseline without overwriting local work. Only a reviewed immutable owner submission may be previewed and explicitly authorized for transfer by the owner.
3. Separate preparation, authorization/pending, delivery and acknowledgment. Exercise stale upstream version, transport failure, safe retry and explicit rebase. No silent merge; no duplicate action on repeated delivery; retain attributable local exchange events. Editing/revising after preview invalidates that preview. Show the resulting reference record and retain source/evidence IDs.
4. Demonstrate methodology fit with a compatible five-point mapping and an incompatible four-point profile. Changing profiles never converts live assessment ratings. Incompatible/unconfirmed mapping blocks transfer; explain configuration versus future implementation work.
5. Put rating fields before expandable history; show current controls/owner conclusion before optional suggestions; provide compact changed/unchanged risk review entry points. Retain evidence depth, authority checks and human confirmation.
6. Suppress stale reply suggestions and green original-question cues when a reviewer returns new clarification. Display the latest exact request as unresolved; require a fresh owner reply and attestation, with explicit bounded-assistance limits.
7. Add an in-app pilot guide and downloadable local implementation brief covering actual/proposed/undecided capabilities, bank/vendor responsibilities, data and identity decisions, pilot acceptance and exit. Do not invent staff names, references, service commitments, certifications or production architecture.
8. Verify pure state transitions and regressions, then browser import→review→preview→authorize→conflict→reconcile→retry→ack; inspect task-first and mobile views. Request independent buyer re-review after implementation.

Intentional concept deviations: show actual confirmed/draft state instead of the concept's illustrative fixed 12; no invented successful import or timestamp before interaction; use a semantic numbered list instead of decorative connector graphics. Support states/tabs inherit the same component system. Screenshots and verification evidence are deliverables for this task.
