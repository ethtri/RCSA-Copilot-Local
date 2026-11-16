import assert from 'node:assert/strict';
import {readFile} from 'node:fs/promises';
import {createInitial,seedScene,sourceRecords,migrateSession,startOwnerRevision,sendAssessment,requirements} from '../src/scripts/demo/model.js';
import {addDiscoveredRisk,ratingProposal,applyProposal} from '../src/scripts/demo/upgrade-model.js';
import {carryForwardNeedsReview,confirmCarryForward} from '../src/scripts/demo/carry-forward.js';
import {priorInherent,proposalDialog} from '../src/scripts/demo/upgrade-view.js';
import {insightContext,inlineInsights} from '../src/scripts/demo/inline-insights.js';
import {recommendationSet} from '../src/scripts/demo/control-assistance.js';
import {saveMapping} from '../src/scripts/demo/mappings.js';
import {replyIntents,replySuggestion} from '../src/scripts/demo/reply-assistance.js';
import {responseSummary,responseWorkspace} from '../src/scripts/demo/response-view.js';
import {reportContext} from '../src/scripts/demo/reports.js';

const load=async name=>JSON.parse(await readFile(new URL('../assets/data/'+name,import.meta.url),'utf8'));
const [workflow,intelligence,context,signals,assistance,research]=await Promise.all(['workflow-demo.json','risk-intelligence.json','assessment-context.json','assessment-signals.json','control-assistance.json','research-demo.json'].map(load));
const data={...workflow,intelligence,context,signals,assistance,sources:[...workflow.sources,...intelligence.sources,...context.sources,...signals.sources,...research.sources]};

// A banking leader should see the genuine prior-cycle comparison and the bank's criteria.
const comparison=createInitial(data),risk=comparison.risks.unauthorized;
const historical=priorInherent(data,comparison,risk);
assert.equal(historical?.value,16);
assert.equal(historical?.sourceId,'history-q3');
const proposal=ratingProposal(data,comparison,'unauthorized','inherent');
const proposalHtml=proposalDialog(data,comparison,proposal.id);
assert(proposalHtml.includes('Previous cycle')&&proposalHtml.includes('16'));
assert(proposalHtml.includes('4 · Likely')&&proposalHtml.includes('4 · Major'));
assert.equal(priorInherent(data,comparison,{...risk,scenarioId:'owner-defined'}),null);
const noHistory=structuredClone(comparison);
noHistory.evidenceContext.sources=noHistory.evidenceContext.sources.filter(source=>!source.id.startsWith('history-'));
const noHistoryData={...data,sources:data.sources.filter(source=>!source.id.startsWith('history-'))};
assert.equal(priorInherent(noHistoryData,noHistory,noHistory.risks.unauthorized),null,'Missing records must not become an invented comparison');

// Adding a recognized proposal must retain useful advice without giving planned work credit.
const planned=createInitial(data),original=structuredClone(planned.risks.unauthorized.residual);
const candidate=recommendationSet(data,planned).find(item=>item.kind==='enhance');
assert(candidate);
assert(saveMapping(data,planned,{rationale:candidate.addresses,applicability:'covers',control:{...candidate.designDraft,basis:candidate.sourceIds[0],assistance:{riskId:'unauthorized',candidateId:candidate.id,kind:candidate.kind}}}));
const mapped=planned.customControls.at(-1),recommended=ratingProposal(data,planned,'unauthorized','residual');
assert(recommended.supported,'Recognized proposed improvement should not erase the existing evidence-backed recommendation');
assert.equal(recommended.proposed.likelihood,3);assert.equal(recommended.proposed.impact,4);
assert.match(recommended.proposed.likelihoodRationale,/no additional current protection|not implemented or tested/);
assert.deepEqual(planned.risks.unauthorized.residual,original,'Preparing recommendations does not change owner ratings');
const signature=recommended.inputSignature;mapped.design+=' Require a retained release decision.';
const edited=ratingProposal(data,planned,'unauthorized','residual');
assert.notEqual(edited.inputSignature,signature,'Operational design changes invalidate the proposal basis');
mapped.proposed=false;mapped.status='Implemented';
assert.equal(ratingProposal(data,planned,'unauthorized','residual').supported,false,'Implementation claims need a new assessment');
const removed=structuredClone(planned);removed.risks.unauthorized.controls=removed.risks.unauthorized.controls.filter(id=>id!=='callback');
assert.equal(ratingProposal(data,removed,'unauthorized','residual').supported,false);

// AI must be able to draft a complete answer to the question it recommended asking.
const reply=seedScene(data,'submitted');reply.selectedRisk='unauthorized';reply.questionRiskId='unauthorized';reply.challengeStatus='open';
reply.question='How does the residual conclusion distinguish the tested standard route from urgent requests, and what evidence will resolve WI-07?';
const intents=replyIntents(reply.question);
for(const intent of ['scope','rating','evidence'])assert(intents.includes(intent),'Question intent: '+intent);
const answer=replySuggestion(data,reply);
assert(answer.cues.some(cue=>cue.id==='scope'));assert(answer.cues.some(cue=>cue.id==='rating'));assert(answer.cues.some(cue=>cue.id==='evidence'));
assert.match(answer.text,/standard-route sample cannot establish operation on urgent requests/);
assert.match(answer.text,/risk-after-controls rating/);assert(answer.sourceIds.every(id=>sourceRecords(data,reply).some(source=>source.id===id)));

// A carried-forward draft must not look like a confirmed threshold decision.
const pending=createInitial(data),pendingRisk=pending.risks.unauthorized;
assert.equal(pendingRisk.residualConfirmed,false);
assert.match(responseSummary(pending,pendingRisk),/Draft rating · not confirmed/);
const pendingHtml=responseWorkspace(data,pending);
assert(pendingHtml.includes('Draft rating · not confirmed')&&pendingHtml.includes('Back to control review'));
assert(!pendingHtml.includes('<strong>Within the threshold</strong>'));

// A report should explain the material change, and retain the remaining work after review.
const completed=seedScene(data,'complete'),summary=reportContext(data,completed).suggestion;
assert.match(summary,/Largest confirmed change: Unauthorized wire transfer, from 8 to 12/);
assert.match(summary,/Owner’s explanation:/);assert.match(summary,/Next action:/);assert.match(summary,/Owner:/);
assert.match(summary,/management decision/);assert.match(summary,/Planned work and management decisions do not lower current ratings/);

// The AI-discovered risk needs real source-backed insight as soon as the owner adds it.
const discovered=createInitial(data);
assert(addDiscoveredRisk(discovered,data,'duplicate-release'));
discovered.selectedRisk='duplicate-release';
for(const stage of ['inherent','residual']){
 const before=structuredClone(discovered.risks['duplicate-release']);
 const insight=insightContext(data,discovered,stage);
 assert(insight.supported,'Added risk has prepared '+stage+' evidence');
 assert(insight.findings.length>=2&&insight.findings.every(finding=>finding.sourceIds.length));
 assert(inlineInsights(data,discovered,stage).includes('Suggested assessment'));
 assert.deepEqual(discovered.risks['duplicate-release'],before);
}
const bespoke=structuredClone(discovered);bespoke.risks['duplicate-release'].scenarioId='owner-defined';
assert.equal(insightContext(data,bespoke,'inherent').supported,false,'Bespoke risk scope must not reuse prepared conclusions');

// An older submitted session must retain newly accepted analysis records in its next version.
const oldData={...data,signals:undefined,sources:data.sources.filter(source=>!source.id.startsWith('signals-'))};
const oldSubmitted=seedScene(oldData,'submitted'),oldVersion=JSON.stringify(oldSubmitted.snapshots[0]);
assert(!oldSubmitted.snapshots[0].sources.some(source=>source.id==='signals-unauthorized'));
const migrated=migrateSession(oldSubmitted,data);assert.equal(migrated.error,null);
const revision=migrated.state;revision.role='first';
assert(startOwnerRevision(revision,data));
assert(!sourceRecords(null,revision).some(source=>source.id==='signals-unauthorized'),'Migration alone must not silently accept new evidence');
const freshProposal=ratingProposal(data,revision,'unauthorized','inherent');
assert(freshProposal.supported&&freshProposal.analysis.sourceIds.includes('signals-unauthorized'));
const rejectedKey=JSON.stringify([revision.risks,revision.evidenceContext]);
assert.equal(applyProposal(revision,data,freshProposal.id,{fields:['likelihoodRationale','unsupportedField']}).ok,false);
assert.equal(JSON.stringify([revision.risks,revision.evidenceContext]),rejectedKey,'Rejected application must not partially retain sources or change judgments');
assert(applyProposal(revision,data,freshProposal.id,{fields:['likelihoodRationale']}).ok);
assert(revision.risks.unauthorized.sources.includes('signals-unauthorized'));
assert(sourceRecords(null,revision).some(source=>source.id==='signals-unauthorized'),'Explicit acceptance must retain the exact analysis source for snapshotting');
const acceptedSource=structuredClone(sourceRecords(null,revision).find(source=>source.id==='signals-unauthorized'));
for(const id of ['details','cutoff'])if(carryForwardNeedsReview(revision,revision.risks[id]))assert(confirmCarryForward(data,revision,id).ok);
// Simulate the owner's explicit reconfirmation after reviewing the selected wording.
revision.risks.unauthorized.inherentConfirmed=true;
revision.risks.unauthorized.residualConfirmed=true;
revision.risks.unauthorized.riskResponse.needsReview=false;
assert(requirements(revision).every(item=>item.done),JSON.stringify(requirements(revision).filter(item=>!item.done)));
assert(sendAssessment(revision));
const revisedVersion=revision.snapshots.find(snapshot=>snapshot.version===2);
assert(revisedVersion.risks.unauthorized.sources.includes('signals-unauthorized'));
assert.deepEqual(revisedVersion.sources.find(source=>source.id==='signals-unauthorized'),acceptedSource);
assert.equal(JSON.stringify(revision.snapshots[0]),oldVersion,'The older submitted assessment and its original evidence remain unchanged');

console.log('PASS: banking-leader regressions, including atomic acceptance and retained analysis sources across migration and owner revision.');
