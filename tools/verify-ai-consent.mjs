import assert from 'node:assert/strict';
import {readFile} from 'node:fs/promises';
import {createInitial,seedScene,currentRating,score,sourceRecords} from '../src/scripts/demo/model.js';
import {ratingProposal,refreshProposals,discoverRisks,applyProposal,addDiscoveredRisk,checkAssessmentClaims} from '../src/scripts/demo/upgrade-model.js';
import {preparedRefresh,riskDiscovery,ratingSuggestion,proposalDialog,discoveryDialog} from '../src/scripts/demo/upgrade-view.js';
import {recommendationSet,coverageAnalysis,preparePlan} from '../src/scripts/demo/control-assistance.js';
import {reviewControlRecommendation,useControlRecommendation,applyAssistancePlan} from '../src/scripts/demo/control-assistance-actions.js';
import {controlAssistanceView,recommendationDialog} from '../src/scripts/demo/control-assistance-view.js';
import {responseDraft,responseDraftDialog,applyResponseDraft} from '../src/scripts/demo/response-view.js';
import {replySuggestion,replyCoverage} from '../src/scripts/demo/reply-assistance.js';
import {saveRiskResponse} from '../src/scripts/demo/responses.js';
import {ensureOperations,operationsSummary,prepareManagementRequest} from '../src/scripts/demo/operations.js';
import {dashboardView} from '../src/scripts/demo/dashboard.js';
import {assessmentView} from '../src/scripts/demo/assessment.js';
import {reportsView,buildReportHtml} from '../src/scripts/demo/reports.js';
import {analysisWorkspace} from '../src/scripts/demo/analysis-workspace.js';

const fixture=async name=>JSON.parse(await readFile(new URL(`../assets/data/${name}.json`,import.meta.url),'utf8'));
const workflow=await fixture('workflow-demo');
const intelligence=await fixture('risk-intelligence');
const research=await fixture('research-demo');
const context=await fixture('assessment-context');
const assistance=await fixture('control-assistance');
const data={...workflow,intelligence,research,context,assistance,sources:[...workflow.sources,...intelligence.sources,...research.sources,...context.sources]};

// Proposal caches, editor drafts and selected tabs are presentation state. These
// are the assessment, work and evidence records that viewing must not change.
function records(s){
 return structuredClone({risks:s.risks,customControls:s.customControls,action:s.action,
  assessmentSources:sourceRecords(data,s),additionalSources:s.additionalSources,
  method:s.evidenceContext?.ratingMethod,dependency:s.dependency,qualification:s.qualification,
  question:s.question,response:s.response,history:s.history,snapshots:s.snapshots,
  controlDecisions:s.controlAssistance?.decisions||[],controlPlans:s.controlAssistance?.plans||{},
  actions:s.operations?.actions||{},decisions:s.operations?.decisions||{},evidenceRequests:s.operations?.evidenceRequests||{},
  submitted:s.submitted,reviewed:s.reviewed,versionNumber:s.versionNumber});
}
function onlyViews(s,label,view){
 const before=records(s);view();const after=records(s);
 const changed=Object.keys(before).filter(key=>JSON.stringify(after[key])!==JSON.stringify(before[key]));
 assert.equal(changed.join(', '),'',`${label} changed records without approval: ${changed.join(', ')}`);
}

const fresh=createInitial(data),initialConfirmed=score(currentRating(fresh,'unauthorized'));
onlyViews(fresh,'Opening Changes and its AI findings',()=>{
 preparedRefresh(data,fresh);riskDiscovery(data,fresh);discoverRisks(data,fresh);refreshProposals(data,fresh);
});
assert(!fresh.additionalSources.some(source=>source.id==='retry-test'),'Viewing a suggested risk must not add its evidence to the assessment');
onlyViews(fresh,'Opening rating suggestions and the field editor',()=>{
 const p=ratingProposal(data,fresh,'unauthorized','residual');ratingSuggestion(data,fresh,'residual');proposalDialog(data,fresh,p.id);checkAssessmentClaims(data,fresh);
});
onlyViews(fresh,'Opening the suggested risk editor',()=>discoveryDialog(data,fresh,'duplicate-release'));
onlyViews(fresh,'Opening control findings, design and plan previews',()=>{
 recommendationSet(data,fresh);coverageAnalysis(data,fresh);controlAssistanceView(data,fresh);
 const candidate=recommendationSet(data,fresh).find(c=>c.kind==='new');assert(candidate);
 reviewControlRecommendation(data,fresh,candidate.id);recommendationDialog(data,fresh,candidate.id);preparePlan(data,fresh,'unauthorized',candidate.id);
});
onlyViews(fresh,'Opening a response suggestion',()=>{responseDraft(data,fresh);responseDraftDialog(data,fresh);});
assert.equal(score(currentRating(fresh,'unauthorized')),initialConfirmed);

// Applying selected fields requires its own action. It changes only the selected
// draft field, never confirms the assessment or creates a response/work item.
const selected=createInitial(data),p=ratingProposal(data,selected,'unauthorized','residual');
const prior=structuredClone(selected.risks.unauthorized.residual),changedReason='The available standard-wire test does not establish urgent-route operation.';
assert(applyProposal(selected,data,p.id,{fields:['likelihoodRationale'],values:{likelihoodRationale:changedReason}}).ok);
assert.equal(selected.risks.unauthorized.residual.likelihood,prior.likelihood);
assert.equal(selected.risks.unauthorized.residual.impact,prior.impact);
assert.equal(selected.risks.unauthorized.residual.impactRationale,prior.impactRationale);
assert.equal(selected.risks.unauthorized.residual.likelihoodRationale,changedReason);
assert.equal(selected.risks.unauthorized.residualConfirmed,false);
assert.equal(score(currentRating(selected,'unauthorized')),initialConfirmed);
assert.equal(selected.risks.unauthorized.riskResponse.created,false);
assert.deepEqual(selected.operations.actions,{});assert.deepEqual(selected.operations.decisions,{});
const readOnly=createInitial(data),ro=ratingProposal(data,readOnly,'unauthorized','residual');readOnly.role='second';const roBefore=records(readOnly);
assert.equal(applyProposal(readOnly,data,ro.id).ok,false);assert.deepEqual(records(readOnly),roBefore);

// A risk and its evidence join the assessment only after Add draft risk. That
// action does not invent a prior rating or confirm any rating/control judgment.
const added=createInitial(data);discoverRisks(data,added);assert(!added.risks['duplicate-release']);
assert(addDiscoveredRisk(added,data,'duplicate-release').ok);
const newRisk=added.risks['duplicate-release'];assert(newRisk);
assert.equal(newRisk.prior,null);assert.equal(currentRating(added,newRisk.id),null);
assert(!newRisk.inherentConfirmed&&!newRisk.controlsConfirmed&&!newRisk.residualConfirmed);
assert(sourceRecords(data,added).some(source=>source.id==='retry-test'));
assert.deepEqual(added.operations.actions,{});assert.deepEqual(added.operations.decisions,{});

// An explicit design approval adds a PROPOSED control. Neither this nor its
// approved plan draft claims implementation, confirms a rating or records work.
const design=createInitial(data),candidate=recommendationSet(data,design).find(c=>c.kind==='new');
const draft=reviewControlRecommendation(data,design,candidate.id);draft.applicability='covers';
assert.equal(design.customControls.length,0);
assert(useControlRecommendation(data,design,draft).ok);
const mapped=design.customControls.find(c=>c.id===design.selectedControl);assert(mapped);
assert.equal(mapped.status,'Proposed');assert(design.risks.unauthorized.controls.includes(mapped.id));
assert.equal(score(currentRating(design,'unauthorized')),initialConfirmed);
assert.equal(design.risks.unauthorized.riskResponse.created,false);
const plan=preparePlan(data,design,'unauthorized',candidate.id);assert(plan);
plan.protectionOwner??=plan.owner;plan.protectionDue??=plan.due;
assert(applyAssistancePlan(data,design,plan).ok);
assert.equal(design.risks.unauthorized.riskResponse.created,false);
assert.deepEqual(design.operations.actions,{});assert.deepEqual(design.operations.decisions,{});

// Previewing a response leaves owner edits intact. Choosing to apply fills the
// draft; Record risk response remains a separate, explicit commitment.
const response=createInitial(data);response.risks.unauthorized.riskResponse.rationale='Keep my owner explanation.';
response.risks.unauthorized.residual.likelihood=3;
onlyViews(response,'Previewing a response with existing owner edits',()=>responseDraftDialog(data,response));
assert(applyResponseDraft(data,response));
assert.equal(response.risks.unauthorized.riskResponse.rationale,'Keep my owner explanation.');
assert.equal(response.risks.unauthorized.riskResponse.created,false);
assert.deepEqual(response.operations.actions,{});assert.deepEqual(response.operations.decisions,{});
assert(saveRiskResponse(response));assert.equal(response.risks.unauthorized.riskResponse.created,true);
const requested=response.operations.decisions.unauthorized;assert(requested);
assert.equal(requested.status,'draft','Recording a response can prepare only a draft management request');
assert.equal(requested.kind,'continue');assert.equal(requested.outcome,undefined,'Preparing a request must never grant approval');
assert(!requested.events.some(event=>/approved|declined/i.test(event.event)));

// A confirmed high rating by itself is not consent to create a management
// request. Rendering, summaries and AI previews must not materialize one.
const confirmed=createInitial(data),highRisk=confirmed.risks.unauthorized;
highRisk.residual.likelihood=3;highRisk.residualConfirmed=true;
highRisk.lastConfirmedResidual=structuredClone(highRisk.residual);
onlyViews(confirmed,'Viewing a confirmed high-risk assessment',()=>{
 ensureOperations(confirmed);operationsSummary(confirmed);preparedRefresh(data,confirmed);
 riskDiscovery(data,confirmed);responseDraftDialog(data,confirmed);
 dashboardView(data,confirmed);reportsView(data,confirmed);buildReportHtml(data,confirmed);
 for(const stage of ['changes','inherent','controls','residual','review'])assessmentView(data,confirmed,stage);
 analysisWorkspace(data,confirmed);
});
assert.deepEqual(confirmed.operations.decisions,{});
const noRecordedResponse=records(confirmed);
assert.equal(prepareManagementRequest(confirmed,'unauthorized'),false);
assert.deepEqual(records(confirmed),noRecordedResponse,'A management request requires a recorded owner response');
for(const lock of ['second','assurance','management','admin','submitted']){
 const locked=createInitial(data);locked.risks.unauthorized.residual.likelihood=3;
 locked.risks.unauthorized.riskResponse.created=true;
 if(lock==='submitted')locked.submitted=true;else locked.role=lock;
 const before=records(locked);
 assert.equal(prepareManagementRequest(locked,'unauthorized'),false);
 assert.deepEqual(records(locked),before,`${lock} must not prepare a management request`);
}

const reply=seedScene(data,'challenge');reply.response='My reply remains mine.';
onlyViews(reply,'Previewing a reviewer reply',()=>{replySuggestion(data,reply);replyCoverage(data,reply);});
assert.equal(reply.response,'My reply remains mine.');
assert.equal(reply.challengeStatus,'open');

console.log('PASS: AI finding and editor previews leave assessment, evidence and work records unchanged; selected-field, proposed control and draft risk approvals are bounded; only owner response recording prepares an unapproved management request; confirmed high-risk views and other roles cannot create one; owner edits and confirmed ratings are preserved.');
