import assert from 'node:assert/strict';
import {readFile} from 'node:fs/promises';
import {createInitial,seedScene,completeReview,startOwnerRevision} from '../src/scripts/demo/model.js';
import {exchangeState,EXTERNAL_IDS} from '../src/scripts/demo/grc-exchange.js';
import {refreshAutomaticSync,finishAutomaticSync,retryAutomaticSync,resolveSyncConflict,automaticSyncStatus} from '../src/scripts/demo/grc-sync.js';
import {syncStatusLine,integrationSettingsView} from '../src/scripts/demo/grc-view.js';

const data=JSON.parse(await readFile(new URL('../assets/data/workflow-demo.json',import.meta.url),'utf8'));
const draft=createInitial(data),originalRisks=JSON.stringify(draft.risks);
assert.equal(refreshAutomaticSync(draft),false);
assert(draft.grc.baseline);assert.equal(draft.grc.pending,null);assert.equal(draft.grc.reference.version,7);
assert.equal(JSON.stringify(draft.risks),originalRisks,'Connection bootstrap must not replace owner work.');
assert.match(automaticSyncStatus(draft).text,/sync after review/);
for(const scene of ['submitted','challenge','response']){
 const s=seedScene(data,scene);assert.equal(refreshAutomaticSync(s),false);
 assert.equal(finishAutomaticSync(s),false);assert.equal(s.grc.reference.version,7);
}
const returned=seedScene(data,'response');returned.responseSufficient='return';assert(completeReview(returned));
assert.equal(refreshAutomaticSync(returned),false);assert.equal(finishAutomaticSync(returned),false);

// Existing reviewer confirmation is the trigger. No owner impersonation or extra transfer step.
const reviewed=seedScene(data,'response');assert(completeReview(reviewed));
const g=exchangeState(reviewed);g.reference.record.owner='Bank record owner';g.reference.record.bankMetadata='Keep';
g.reference.record.action={id:EXTERNAL_IDS.action,status:'Bank-owned status',bankMetadata:'Keep action metadata'};
const immutable=JSON.stringify(reviewed.snapshots),historyLength=reviewed.history.length;
assert(refreshAutomaticSync(reviewed));assert.equal(reviewed.role,'second');assert.equal(g.reference.version,7);
const request=g.pending.id;assert.match(automaticSyncStatus(reviewed).text,/Syncing/);
assert(finishAutomaticSync(reviewed));assert.equal(g.reference.version,8);assert.equal(g.lastAck.id,request);
assert.equal(g.reference.record.residual,12);assert.equal(g.reference.record.owner,'Bank record owner');
assert.equal(g.reference.record.bankMetadata,'Keep');assert.equal(g.reference.record.action.status,'Bank-owned status');
assert.equal(g.reference.record.action.bankMetadata,'Keep action metadata');assert.equal(g.reference.record.action.id,EXTERNAL_IDS.action);
assert.equal(reviewed.role,'second');assert.equal(JSON.stringify(reviewed.snapshots),immutable);
assert.equal(reviewed.history.length,historyLength,'Sync history is separate from assessment decisions.');
for(let i=0;i<4;i++){assert.equal(refreshAutomaticSync(reviewed),false);assert.equal(finishAutomaticSync(reviewed),false);}
assert.equal(g.reference.version,8);assert.equal(g.sequence,1);
assert.match(syncStatusLine(reviewed),/Synced to GRC · Version 2/);
assert(!/Import reference|Authorize reference|Deliver pending/.test(integrationSettingsView(data,reviewed)));

reviewed.role='first';assert(startOwnerRevision(reviewed,data));assert.equal(refreshAutomaticSync(reviewed),false);
assert.equal(g.lastAck.submissionVersion,2);assert.equal(g.reference.version,8);assert.match(automaticSyncStatus(reviewed).detail,/Version 2 is synced/);

const fail=seedScene(data,'complete');refreshAutomaticSync(fail);const failId=fail.grc.pending.id;fail.grc.fault='transport';
assert.equal(finishAutomaticSync(fail),false);assert.equal(fail.grc.status,'failed');
const failureEvents=fail.grc.events.length;
for(let i=0;i<4;i++)assert.equal(refreshAutomaticSync(fail),false);
assert.equal(fail.grc.events.length,failureEvents,'Rendering must not loop retries.');
assert.equal(fail.grc.pending.id,failId);assert.equal(fail.grc.reference.version,7);
assert.equal(automaticSyncStatus(fail).kind,'attention');assert.match(integrationSettingsView(data,fail),/Retry sync/);
assert(retryAutomaticSync(fail));assert(finishAutomaticSync(fail));assert.equal(fail.grc.lastAck.id,failId);assert.equal(fail.grc.reference.version,8);

const conflict=seedScene(data,'complete');refreshAutomaticSync(conflict);conflict.grc.fault='stale';
assert.equal(finishAutomaticSync(conflict),false);assert.equal(conflict.grc.status,'conflict');
assert.equal(conflict.grc.reference.record.residual,8);assert.equal(refreshAutomaticSync(conflict),false);
assert.equal(resolveSyncConflict(conflict,8),false,'Reviewer cannot choose owner changes.');
assert(!integrationSettingsView(data,conflict).includes('data-action="sync-keep-reviewed"'));
conflict.role='first';assert.equal(resolveSyncConflict(conflict,7),false,'Reject a stale comparison.');
assert(resolveSyncConflict(conflict,8));assert(finishAutomaticSync(conflict));assert.equal(conflict.grc.reference.version,9);
assert.equal(conflict.grc.sequence,2);assert.equal(conflict.grc.reference.record.residual,12);

const stale=seedScene(data,'complete');refreshAutomaticSync(stale);stale.role='first';startOwnerRevision(stale,data);
assert.equal(finishAutomaticSync(stale),false);assert.equal(stale.grc.pending,null);assert.equal(stale.grc.reference.version,7);
const method=seedScene(data,'complete');exchangeState(method).profile='four';
assert.equal(refreshAutomaticSync(method),false);assert.equal(method.grc.issue.kind,'method');assert.equal(method.grc.pending,null);
assert.equal(method.grc.reference.record.residual,8);
const mapping=seedScene(data,'complete');mapping.snapshots.at(-1).risks.unauthorized.controls.push('unmapped');
assert.equal(refreshAutomaticSync(mapping),false);assert.equal(mapping.grc.issue.kind,'mapping');assert.equal(mapping.grc.pending,null);

console.log('PASS: automatic reviewed-version sync, draft/return guards, owner permissions, immutable submissions, bank-owned fields, idempotency, bounded retry, source comparison, revision invalidation and method/control mapping pauses.');
