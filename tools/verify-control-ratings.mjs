import assert from 'node:assert/strict';
import {readFile} from 'node:fs/promises';
import {assessmentProjection,currentRating,incompleteKeyControl,migrateSession,saveControlRatings,seedScene,startOwnerRevision,sendAssessment} from '../src/scripts/demo/model.js';
import {buildReportHtml} from '../src/scripts/demo/reports.js';

const data=JSON.parse(await readFile(new URL('../assets/data/workflow-demo.json',import.meta.url),'utf8'));
const s=seedScene(data,'submitted');
const rating=structuredClone(s.risks.unauthorized.controlEffectiveness.callback);
assert.equal(saveControlRatings(s,'unauthorized','callback',rating).ok,false);
s.role='first';
assert.equal(saveControlRatings(s,'unauthorized','callback',rating).ok,false);
assert.equal(startOwnerRevision(s,data),true);

const r=s.risks.unauthorized;
const residual=structuredClone(r.residual);
const confirmed=structuredClone(currentRating(s,r.id));
const original=assessmentProjection(s,1,data);
rating.operation={rating:'effective',sourceId:'',rationale:'Claim that needs evidence'};
assert.deepEqual(saveControlRatings(s,r.id,'callback',rating).errors.map(e=>e.field),['control-rating.operation.sourceId']);
rating.operation={rating:'ineffective',sourceId:'not-a-source',rationale:'A reference must exist'};
assert.equal(saveControlRatings(s,r.id,'callback',rating).ok,false);
assert.deepEqual(r.controlEffectiveness.callback,original.risks[r.id].controlEffectiveness.callback);

rating.operation={rating:'insufficient-evidence',sourceId:'',rationale:'   '};
assert.equal(saveControlRatings(s,r.id,'callback',rating).ok,false);
rating.operation.rationale='The post-change population has not been tested.';
assert.equal(saveControlRatings(s,r.id,'callback',rating).changed,true);
assert.equal(saveControlRatings(s,r.id,'callback',rating).changed,false);
assert.equal(r.controlsConfirmed,false);
assert.equal(r.residualConfirmed,false);
assert.deepEqual(r.residual,residual);
assert.deepEqual(currentRating(s,r.id),confirmed);
assert.equal(incompleteKeyControl(s,r),undefined);
assert.equal(sendAssessment(s),false);
assert.deepEqual(assessmentProjection(s,1,data),original);
assert.match(buildReportHtml(data,s),/The post-change population has not been tested/);
assert.deepEqual(migrateSession(JSON.parse(JSON.stringify(s)),data).state.risks[r.id].controlEffectiveness.callback,rating);

delete r.controlEffectiveness.approval;
assert.equal(incompleteKeyControl(s,r).id,'approval');
assert.equal(saveControlRatings(s,r.id,'customer-confirmation',rating).ok,false);
console.log('PASS: control rating validation, owner permissions, version history, report evidence, draft persistence and residual risk confirmation.');
