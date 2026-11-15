# Automatic GRC synchronization contract

`grc-exchange.js` and `grc-sync.js` implement a local reference record and a configured background worker. No network requests, credentials, real authentication or supported bank connector are involved. State optionally persists in this tab's sessionStorage. The Demo workspace disclosure and integration settings state these limits.

## Existing connection and review policy

The UI assumes the bank connection is configured. Source identity and baseline become available automatically, without changing local risk judgments. The primary navigation has no transfer console. Settings > Integrations contains connection policy, record identity, sync history and exceptions. Legacy `/handoff` links open assessment review.

The configured policy queues only an immutable snapshot matching the current owner submission after independent review has completed. Drafts, submissions awaiting review and returned responses never publish. The existing owner and reviewer confirmations are the authorization gates; there is no second transfer attestation. The worker acts separately from interactive owner permissions and never impersonates the first-line user. Interactive source-conflict resolution remains owner-only.

The static app calls `refreshAutomaticSync` before rendering and schedules one queued acknowledgment after 650ms to illustrate asynchronous delivery. Failures or conflicts stop the queue until retry or resolution. This is a demo scheduler, not a durable service; it runs only while the page is open. A production connector must implement the agreed authorization, durable queue and retry policy independently.

## Data and write boundaries

External assessment `RCSA-PAY-2026-Q4-0142`, risk `RISK-WT-014`, controls `CTRL-PAY-041` / `CTRL-PAY-042`, and action `ACT-PAY-028` identify the reference records. The source starts at version 7. An acknowledgment increments it once and records the request ID, reviewed submission version, payload key and timestamp.

Writes share the existing allowlisted patch: confirmed residual score, control conclusion, review state/rationale, evidence references, control relationships and action title/owner/due/evidence. Bank-owned owner, risk identity, unknown metadata and existing action status/metadata are retained. Stable action identity prevents duplicate actions. Sync does not approve management decisions, close testing or assert control effectiveness.

Four-point methodology and controls without external mappings pause the queue. Ratings are never converted silently. A changed or reopened review invalidates any queued update. A new owner revision retains the acknowledged source record and last-synced version while the new draft remains local.

## Exceptions

- Failed delivery changes no source fields and retains the same request. Retry uses that ID. Presenter-only connection interruption is consumed once so recovery can be demonstrated. Repeated renders do not retry or append duplicate events.
- A stale source version pauses the update without overwriting fields. Settings compare current source and reviewed values. The owner can keep the reviewed assessment after comparison; the submitted source-version token must still match. This establishes a new baseline and queues the reviewed update under the configured policy. A second source change pauses it again.
- Missing mappings or incompatible methods require GRC-administrator configuration. No pretend automatic mapping or score conversion is exposed.

Local sync events remain separate from assessment decision history and immutable submission snapshots. Reset clears the synthetic workspace. Presenter scene shortcuts retain the connection state; separate testing tabs or confirmed reset are needed for independent fault demonstrations.

The implementation checklist export describes proposed pilot responsibilities and acceptance/exit conditions. It makes no production-connectivity, staffing, certification, ROI or service-level claim.
