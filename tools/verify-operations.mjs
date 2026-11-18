import assert from 'node:assert/strict';
import {readFile} from 'node:fs/promises';
import {seedScene,sendAssessment,completeReview} from '../src/scripts/demo/model.js';
import {ensureOperations,handleOperationsField,saveAction,reviewAction,saveDecision,decideRequest,decisionStatus,operationsSummary,saveEvidenceRequest,handleOperations,reconcileResponseRecords,actionIsActive,actionView,decisionView} from '../src/scripts/demo/operations.js';
import {readinessIssues,configureMapping,reviewedPayload,payloadKey} from '../src/scripts/demo/grc-exchange.js';
import {refreshAutomaticSync,finishAutomaticSync} from '../src/scripts/demo/grc-sync.js';
import {ratingProposal,applyProposal} from '../src/scripts/demo/upgrade-model.js';

const data=JSON.parse(await readFile(new URL('../assets/data/workflow-demo.json',import.meta.url),'utf8'));
const s=seedScene(data,'complete');s.role='first';const ops=ensureOperations(s),assessment=JSON.stringify(s.risks),submissions=JSON.stringify(s.snapshots);
assert.equal(ops.actions.unauthorized.status,'planned');assert.equal(reviewAction(s,'unauthorized','closed','I did it').ok,false);
handleOperationsField(s,'action.unauthorized.owner','');assert.equal(saveAction(s,'unauthorized').ok,false,'Incomplete ownership cannot be saved.');
handleOperationsField(s,'action.unauthorized.due','2026-02-31');const badDate=saveAction(s,'unauthorized');assert.equal(badDate.ok,false);assert(badDate.errors.some(e=>e.field==='action.unauthorized.due'),'An impossible calendar date identifies the exact field.');handleOperationsField(s,'action.unauthorized.due','2026-11-28');
handleOperationsField(s,'action.unauthorized.owner','Payments Operations');handleOperationsField(s,'action.unauthorized.progress','Verification source has been configured.');assert(saveAction(s,'unauthorized',{start:true}).ok);
handleOperationsField(s,'action.unauthorized.evidenceChoice','unauthorized-implementation');assert(saveAction(s,'unauthorized',{submitEvidence:true}).ok);
assert.equal(reviewAction(s,'unauthorized','closed','Looks complete').ok,false,'Executor cannot close their action.');s.role='second';assert.equal(reviewAction(s,'unauthorized','closed','Looks complete').ok,false,'Assessment review is not assurance closure authority.');
s.role='assurance';assert.equal(reviewAction(s,'unauthorized','closed','').ok,false);assert(reviewAction(s,'unauthorized','returned','Implementation is documented, but testing is missing.').ok);assert.equal(ops.actions.unauthorized.status,'returned');
s.role='first';handleOperationsField(s,'action.unauthorized.evidenceChoice','unauthorized-test');assert(saveAction(s,'unauthorized',{submitEvidence:true}).ok);s.role='assurance';assert(reviewAction(s,'unauthorized','closed','The testing pack meets the recorded scope and closure requirements.').ok);
assert.equal(operationsSummary(s).openActions,0);assert.equal(JSON.stringify(s.risks),assessment);assert.equal(JSON.stringify(s.snapshots),submissions,'Closure never rewrites the assessment version.');
const eventCount=ops.actions.unauthorized.events.length;assert.equal(reviewAction(s,'unauthorized','closed','Duplicate closure').ok,false);assert.equal(ops.actions.unauthorized.events.length,eventCount);
ops.drafts['action.unauthorized'].progress='Unrecorded executor draft';assert(!actionView(data,s,'unauthorized').includes('Unrecorded executor draft'),'Assurance sees the recorded work, not an executor draft.');

// Management request preparation, return, approval and explicit-date expiry.
s.role='first';assert.equal(saveDecision(s,'unauthorized',{submit:true}).ok,false);
for(const [key,value] of Object.entries({owner:'Casey Bennett',forum:'Payments Risk Committee',targetDate:'2026-11-19',reviewDate:'2026-11-28',reason:'Continue service while targeted testing completes.',conditions:'Use independent verification and review exceptions daily.'}))handleOperationsField(s,`decision.unauthorized.${key}`,value);
assert(saveDecision(s,'unauthorized',{submit:true}).ok);assert.equal(decideRequest(s,'unauthorized','approved',{decisionReason:'Approved'}).ok,false);
s.role='management';assert(decideRequest(s,'unauthorized','returned',{decisionReason:'State the daily monitoring owner.'}).ok);s.role='first';handleOperationsField(s,'decision.unauthorized.conditions','Payments Operations reviews exceptions daily.');assert(saveDecision(s,'unauthorized',{submit:true}).ok);
s.role='management';assert(decideRequest(s,'unauthorized','approved',{decisionReason:'The temporary conditions are acceptable.',conditions:'Independent verification; daily exception monitoring.',reviewDate:'2026-11-28'}).ok);assert.equal(decisionStatus(s,ops.decisions.unauthorized),'approved');
s.asOf='2026-11-29';assert.equal(decisionStatus(s,ops.decisions.unauthorized),'expired');assert.equal(JSON.stringify(s.risks),assessment);assert.equal(JSON.stringify(s.snapshots),submissions);

// Local evidence work preserves the requested scope and records a bounded receipt.
s.role='first';const pending=ratingProposal(data,s,'details','residual');s.controlAssistance.plans.details={riskId:'details',needsReview:false};s.controlAssistance.planDraft={riskId:'details',needsReview:false};ops.requestDraft={riskId:'details',sourceId:'details-test',title:'Post-amendment testing',owner:'Payments QA',due:'2026-12-04',records:'The latest instruction version checked before release.'};const request=saveEvidenceRequest(s);assert(request.ok);
handleOperations({data,state:s,el:{dataset:{action:'ops-receive-evidence',request:request.id}},notify:()=>{},save:()=>{},render:()=>{}});
assert.equal(ops.evidenceRequests[request.id].status,'received');assert(s.additionalSources.some(x=>x.id===`receipt-${request.id}`));assert.equal(JSON.stringify(s.risks),assessment);
assert.equal(s.proposals[pending.id].status,'stale');assert(s.controlAssistance.plans.details.needsReview);assert(s.controlAssistance.planDraft.needsReview);assert.equal(JSON.stringify(s.snapshots),submissions,'Evidence receipt leaves the submitted assessment unchanged.');

// Strategy changes preserve earlier action history without contradictory active work.
const switcher=seedScene(data,'discovery');switcher.role='first';ensureOperations(switcher);const oldAction=JSON.stringify(switcher.operations.actions.unauthorized);
assert(reconcileResponseRecords(switcher,'unauthorized','mitigate','accept'));switcher.risks.unauthorized.riskResponse.strategy='accept';ensureOperations(switcher);
assert.equal(switcher.operations.actions.unauthorized,undefined);assert.equal(switcher.operations.archivedActions.length,1);assert(switcher.operations.archivedActions[0].events.length>JSON.parse(oldAction).events.length);assert.equal(operationsSummary(switcher).openActions,0);
switcher.risks.unauthorized.removed=true;assert.equal(actionIsActive(switcher,switcher.operations.archivedActions[0]),false);

// Added risk/control IDs are named, recoverable and included in the exact reviewed payload.
const all=seedScene(data,'discovery');all.role='first';all.dependency='confirmed';all.risks.unauthorized.residualConfirmed=true;
all.customControls.push({id:'retry-gate',name:'Duplicate-release gate',status:'Proposed',design:'Check the payment identifier before retry.',owner:'Payments Operations'});
all.risks.duplicate={...structuredClone(all.risks.details),id:'duplicate',name:'Duplicate wire release',description:'A retry could release the same payment twice.',prior:null,lastConfirmedResidual:null,controls:['retry-gate'],mappingRationale:{'retry-gate':'Detect repeated release identifiers.'},mappingApplicability:{'retry-gate':{conclusion:'limited'}},controlConclusion:{text:'The new gate is proposed and offers no current protection.'},sources:['test']};
ensureOperations(all);all.operations.drafts['action.unauthorized']={...structuredClone(all.operations.actions.unauthorized),progress:'Unrecorded operational draft'};assert(sendAssessment(all));all.role='second';all.assessmentView='agree';all.reviewerRationale='Four-risk assessment reviewed with proposed-control limits.';assert(completeReview(all));
assert.equal(refreshAutomaticSync(all),false);const issues=readinessIssues(all);assert(issues.some(i=>i.name==='Duplicate wire release'));assert(issues.some(i=>i.name==='Duplicate-release gate'));
assert.equal(configureMapping(all,'risk','duplicate','RISK-WT-017'),false);all.role='admin';assert(configureMapping(all,'risk','duplicate','RISK-WT-017'));assert(configureMapping(all,'control','retry-gate','CTRL-PAY-046'));assert.equal(configureMapping(all,'control','retry-gate','CTRL-PAY-041'),false,'Bank identifiers cannot be reused.');
assert(refreshAutomaticSync(all));const sent=reviewedPayload(all);assert.equal(sent.risks.length,4);assert.equal(sent.risks.find(r=>r.localId==='duplicate').riskId,'RISK-WT-017');assert.equal(sent.review.rationale,all.reviewConclusions.at(-1).rationale);assert.equal(sent.linkedRecords.drafts,undefined,'Unrecorded operational input is not part of the reviewed GRC payload.');assert(finishAutomaticSync(all));assert.equal(all.grc.reference.record.risks.length,4);
const key=payloadKey(all),frozen=JSON.stringify(all.grc.reference.record.linkedRecords),before=all.grc.reference.version;
all.role='first';handleOperationsField(all,'action.unauthorized.progress','The independent source is now configured.');assert(saveAction(all,'unauthorized',{start:true}).ok);assert.equal(payloadKey(all),key,'Later work cannot mutate the reviewed assessment payload.');assert(refreshAutomaticSync(all));assert.equal(all.grc.pending.mode,'operational');const operationId=all.grc.pending.id;assert(finishAutomaticSync(all));assert.equal(all.grc.reference.version,before+1);assert.equal(JSON.stringify(all.grc.reference.record.linkedRecords),frozen);assert.equal(all.grc.operationalAck.id,operationId);assert.equal(refreshAutomaticSync(all),false,'Operational updates are idempotent.');
console.log('PASS: action/assurance authority, evidence return/closure, decision return/approval/expiry, local evidence receipts, strategy archives, added-risk mapping recovery, exact all-risk review projection and separate idempotent operational updates.');
