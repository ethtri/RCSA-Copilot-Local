# Automatic GRC synchronization contract

`grc-exchange.js` and `grc-sync.js` implement a local reference record and a configured background worker. No network requests, credentials, real authentication or supported bank connector are involved. State optionally persists in this tab's sessionStorage. The Demo workspace disclosure and integration settings state these limits.

## Existing connection and review policy

The UI assumes the bank connection is configured. Source identity and baseline become available automatically, without changing local risk judgments. The primary navigation has no transfer console. Settings > Integrations contains connection policy, record identity, sync history and exceptions. Legacy `/handoff` links open assessment review.

The configured policy queues only an immutable snapshot matching the current owner submission after independent review has completed. Drafts, submissions awaiting review and returned responses never publish. The existing owner and reviewer confirmations are the authorization gates; there is no second transfer attestation. The worker acts separately from interactive owner permissions and never impersonates the first-line user. Interactive source-conflict resolution remains owner-only.

The static app calls `refreshAutomaticSync` before rendering and schedules one queued acknowledgment after 650ms to illustrate asynchronous delivery. Failures or conflicts stop the queue until retry or resolution. This is a demo scheduler, not a durable service; it runs only while the page is open. A production connector must implement the agreed authorization, durable queue and retry policy independently.

## Data and write boundaries

External assessment `RCSA-PAY-2026-Q4-0142` contains the original risks `RISK-WT-014` / `RISK-WT-015` / `RISK-WT-016`. Original library controls map to `CTRL-PAY-041` through `CTRL-PAY-045`; the original unauthorized-transfer action keeps `ACT-PAY-028`. Added risks and controls require an explicit identifier assignment by the local GRC administrator. The source starts at version 7. An acknowledgment increments it once and records the request ID, reviewed submission version, payload key and timestamp.

The all-risk payload comes from the same `reviewedProjection` used by reporting. `risks[]` names each local and external risk, confirmed rating, prior and inherent positions, control relationships, evidence IDs, response and linked action plan. The payload also pins its rating-method version, review conclusion, evidence versions and submitted operational records. Primary-risk compatibility fields remain available to the local reference adapter. Bank-owned owner, unknown metadata and existing bank action status/metadata are retained. Stable action identity prevents duplicate actions. Sync itself does not approve management decisions, close testing or assert control effectiveness.

Four-point methodology, an incompatible method version, and risks or controls without external mappings pause the queue. Readiness checks run before submission and again before sync. They identify each affected record, the GRC administrator and the required next step. No added record is silently excluded. Ratings are never converted silently. A changed or reopened review invalidates any queued update. A new owner revision retains the acknowledged source record and last-synced version while the new draft remains local.

## Operational update contract

Action execution, evidence requests and management decisions have independent record versions and event histories in `state.operations`. A submitted assessment freezes the operational context available at submission; subsequent execution and management decisions do not edit that snapshot.

After the reviewed assessment is acknowledged, changes to operational records queue a separate `OPERATIONS-N` request. Its key binds the assessment version and exact operational records. Acknowledgment writes `reference.record.operationalRecords`, leaving the original `reference.record.linkedRecords`, reviewed risk payload and bank-owned action status intact. The local operational record can show a valid assurance closure or management approval; the sync worker cannot create those decisions. Unchanged operational records do not produce repeated updates.

Operational requests use the same bounded connection failure and source-version conflict behavior. A failed retry keeps its request ID. A source conflict preserves both records for owner comparison. Work performed during an unreviewed owner revision waits for the next eligible reviewed update; it does not publish a draft assessment.

## Local administrator recovery

The presenter’s GRC administrator perspective can assign unique bank risk/control identifiers to the named missing records. The handler rejects other perspectives and duplicate identifiers. The administrator can select the agreed five-point method for the prepared mismatch scenario; it does not convert scores. An unknown assessment method still needs an explicit agreed method contract. Saving configuration preserves owner work, review conclusions and frozen evidence, and the configured worker resumes only when all readiness checks pass.

## Exceptions

- Failed delivery changes no source fields and retains the same request. Retry uses that ID. Presenter-only connection interruption is consumed once so recovery can be demonstrated. Repeated renders do not retry or append duplicate events.
- A stale source version pauses the update without overwriting fields. Settings compare current source and reviewed values. The owner can keep the reviewed assessment after comparison; the submitted source-version token must still match. This establishes a new baseline and queues the reviewed update under the configured policy. A second source change pauses it again.
- Missing mappings or incompatible methods require GRC-administrator configuration. No pretend automatic mapping or score conversion is exposed.

Local sync events remain separate from assessment decision history and immutable submission snapshots. Reset clears the synthetic workspace. Presenter scene shortcuts retain the connection state; separate testing tabs or confirmed reset are needed for independent fault demonstrations.

The implementation checklist export describes proposed pilot responsibilities and acceptance/exit conditions. It makes no production-connectivity, staffing, certification, ROI or service-level claim.
