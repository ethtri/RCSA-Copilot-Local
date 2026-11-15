# Automatic GRC synchronization

Status: implemented and verified. [Results and visual QA](../../output/automatic-grc-sync-2026-11-14/verification.md).

User-approved behavior: the bank connection is already configured. Normal users complete their assessment and review; permitted updates synchronize automatically. Exceptions require attention, connection administration is secondary, and the main navigation contains Dashboard, Assessments and Reports.

## Design before implementation

This is a focused workflow change within the existing design system. Reuse the current report/assessment layouts, green and cool-gray palette, serif headings, sans-serif UI text, source links and button treatments. No new image concept is needed for this small existing-system change. The current report screenshot captured before implementation is the layout reference; the following intentional changes form the accepted specification.

- Remove GRC Handoff from primary navigation. Old `/handoff` links open the assessment review.
- Add one quiet, linked status line above assessment/report content. Draft: `GRC connected · sync after review`. Submitted: `Syncs to GRC after review`. Queued: `Syncing to GRC…`. Acknowledged: `Synced to GRC · Version N`. Failure/conflict/configuration mismatch: `GRC sync needs attention`.
- Keep assessment headings, ratings, owner/reviewer decisions and management approval separate from sync. Completing review is the existing trigger; no extra export/import/authorization steps.
- Put connection details under Settings > Integrations, reachable from the footer or sync status. Use one settings sheet, factual field rows and existing typography. Connection type is generic `Bank GRC`, with no unsupported vendor claim. Show automatic sync policy, stable record ID and acknowledged version. Keep the local simulation disclosure visible in Demo workspace and connection details.
- Present failures with a useful explanation and retry. Present source conflicts with a comparison of source versus reviewed assessment and an explicit owner choice. Incompatible methods or missing control IDs pause updates. Preserve original bank fields and immutable submissions.
- Keep the implementation checklist as a secondary settings download. Presenter-only controls can exercise connection failure/source change without exposing a transfer console in the product flow.

## Implementation and verification

1. Add an automatic policy queue and guarded acknowledgment to the local adapter; share the existing allowlisted write logic. Bootstrap the source reference without changing local draft work. A reviewer action may trigger the configured system worker, without granting the reviewer owner-edit privileges.
2. Render passive status; schedule only queued updates. Never requeue on every render after a failure or conflict. Invalidate requests if the reviewed version changes. Reuse request IDs on retry and preserve acknowledged history when an owner starts a revision.
3. Replace the transfer console with secondary integration settings, migrate the old route, remove old manual action handlers, and expose error examples only in presenter controls.
4. Verify automatic review-to-sync, drafts/review returns, immutable snapshots, role boundaries, idempotency, retry, source conflict resolution, mapping/method guards, and existing workflow regressions.
5. Browser-check desktop and mobile, including normal reviewed state and exception recovery. Compare copy, primary navigation, status hierarchy, palette/type, settings spacing and mobile wrapping with the accepted existing design. Reset temporary viewport overrides and preserve the user's current work.
