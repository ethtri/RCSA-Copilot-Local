import assert from 'node:assert/strict';
import {readFile} from 'node:fs/promises';
import {createInitial,requirements,score,band,currentRating,draftHandoff,sendAssessment,sendChallenge,respond,completeReview,seedScene,responseCoverage,reportSignature} from '../src/scripts/demo/model.js';
import {assessmentView} from '../src/scripts/demo/assessment.js';
import {reportsView,reportContext} from '../src/scripts/demo/reports.js';
const data=JSON.parse(await readFile(new URL('../assets/data/workflow-demo.json',import.meta.url),'utf8'));
const ids=new Set(data.sources.map(x=>x.id));
assert.equal(ids.size,data.sources.length);
for(const r of data.risks){for(const id of r.sources)assert(ids.has(id));for(const kind of ['inherent','residual']){assert(r[kind].likelihoodRationale.trim());assert(r[kind].impactRationale.trim());assert(score(r[kind])>=1&&score(r[kind])<=25);}for(const id of r.controls)assert(data.controls.some(c=>c.id===id));}
for(const c of data.controls){assert(ids.has(c.source));assert(ids.has(c.test));}
assert(new Date(data.sources.find(x=>x.id==='test').date)<new Date(data.sources.find(x=>x.id==='procedure').date));
for(const [n,b] of [[1,'Low'],[4,'Low'],[5,'Moderate'],[9,'Moderate'],[10,'Elevated'],[15,'Elevated'],[16,'High'],[25,'High']])assert.equal(band(n),b);
const fresh=createInitial(data);assert.equal(score(currentRating(fresh,'unauthorized')),8);assert.equal(sendAssessment(fresh),false);assert.equal(sendChallenge(fresh),false);assert.equal(completeReview(fresh),false);
const s=seedScene(data,'submitted');assert(requirements(s).every(x=>x.done));assert.equal(score(currentRating(s,'unauthorized')),12);
const ratings=structuredClone(s.risks);assert.equal(completeReview(s),false);assert.equal(sendChallenge(s),true);s.role='second';assert.equal(respond(s),false);s.role='first';s.response=data.responses.revised;assert.equal(respond(s),true);assert.equal(completeReview(s),false);s.role='second';s.assessmentView='agree';s.reviewerRationale='The scope is addressed; completion evidence remains due.';s.responseSufficient='return';assert.equal(completeReview(s),true);assert.equal(s.reviewed,false);assert.equal(s.challengeStatus,'open');s.role='first';assert.equal(respond(s),true);s.role='second';s.responseSufficient='yes';assert.equal(completeReview(s),true);assert.equal(s.reviewed,true);assert.deepEqual(s.risks,ratings,'Review/action transitions must not alter ratings');
assert(responseCoverage(data.responses.revised).every(x=>x.done));assert(responseCoverage(data.responses.initial).some(x=>!x.done));
s.risks.unauthorized.residual={...s.risks.unauthorized.residual,likelihood:2,impact:3};s.dependency='dismissed';assert(draftHandoff(s).includes('Moderate (6)'));assert(draftHandoff(s).includes('dismissed'));assert.equal(score(reportContext(data,s).projection.risks.unauthorized.residual),12,'Reviewed reports must preserve the submitted rating even if the live draft is modified');
for(const stage of ['changes','inherent','controls','discovery','residual','response','review'])for(const role of ['first','second']){const v=seedScene(data,'start');v.role=role;assert(assessmentView(data,v,stage).includes('<h1>'));}
for(const scene of ['start','discovery','submitted','challenge','response','complete']){const v=seedScene(data,scene);assert(v.risks.unauthorized);assert(reportsView(data,v).includes('Source index'));}
const confirmationState=seedScene(data,'complete');const signature=reportSignature(confirmationState);confirmationState.action.evidence+=' Additional evidence';assert.notEqual(reportSignature(confirmationState),signature,'Report confirmation must expire when underlying evidence changes');
const independent=createInitial(data);s.action.title='Changed draft';assert.notEqual(independent.action.title,s.action.title);
const supporting=seedScene(data,'submitted'); supporting.role='first';supporting.submitted=false;supporting.risks.details.residualConfirmed=false;assert.equal(sendAssessment(supporting),false);supporting.risks.details.residual={...supporting.risks.details.residual,likelihood:5,impact:4};supporting.selectedRisk='details';assert(assessmentView(data,supporting,'residual').includes('Above the threshold'));supporting.risks.details.responseAction.evidence='';supporting.risks.details.residualConfirmed=true;assert.equal(sendAssessment(supporting),false);
const missing=seedScene(data,'challenge');missing.action.evidence='';assert.equal(respond(missing),false);
const snap=seedScene(data,'submitted');const originalEvidence=snap.snapshots[0].action.evidence;snap.action.evidence='Changed revision';assert.equal(snap.snapshots[0].action.evidence,originalEvidence);
console.log('PASS: fixture integrity, rating bands, human/role guards, challenge return/resolution, rating preservation, frozen reviewed-report consistency, all scene/stage rendering, and reset isolation.');
