import assert from 'node:assert/strict';
import {readFile} from 'node:fs/promises';
import {createInitial,seedScene,startOwnerRevision,sendAssessment,completeReview,blankRating} from '../src/scripts/demo/model.js';
import {reportsView,reportContext,confirmReport,buildReportHtml,handleReportActions} from '../src/scripts/demo/reports.js';
import {ensureOperations,handleOperationsField,saveAction} from '../src/scripts/demo/operations.js';

const data=JSON.parse(await readFile(new URL('../assets/data/workflow-demo.json',import.meta.url),'utf8'));
const completed=seedScene(data,'complete');completed.role='first';completed.selectedRisk='details';
const assessed=JSON.stringify(completed.risks),snapshots=JSON.stringify(completed.snapshots),html=reportsView(data,completed);
for(const risk of data.risks){assert(html.includes(risk.name));assert(html.includes(`data-risk="${risk.id}"`),'Each report drill-down names its own risk.');}
assert(html.includes('All assessed risks'));assert(html.includes('Work records'));assert(html.includes('View action record'));
assert.equal(JSON.stringify(completed.risks),assessed);assert.equal(JSON.stringify(completed.snapshots),snapshots);assert.equal(completed.selectedRisk,'details');
assert.equal(reportContext(data,completed).projection.review.rationale,completed.reviewConclusions.at(-1).rationale);

// Confirmation pins actual edited text and exact linked-record versions.
reportsView(data,completed);const w=completed.reportWorkspace;w.summaries['1']={text:'Owner-written summary: urgent payments need testing.'};
assert(confirmReport(data,completed));assert(reportContext(data,completed).confirmed);
const saved=JSON.stringify(w.editions[0]),savedHtml=w.editions[0].html;
assert(savedHtml.includes('Owner-written summary: urgent payments need testing.'));
assert(savedHtml.startsWith('<!doctype html>'));assert(savedHtml.includes('@media print'));assert(savedHtml.includes('Standard-wire control test'));assert(savedHtml.includes(data.sources.find(s=>s.id==='test').excerpt));
for(const risk of data.risks)assert(savedHtml.includes(risk.name));
const unsafe='<script>alert("unsafe")</script><img src=x onerror=alert(1)>';
w.summaries['1'].text=unsafe;const safe=buildReportHtml(data,completed);assert(!safe.includes(unsafe));assert(safe.includes('&lt;script&gt;'));assert(safe.includes('&lt;img'));
assert(!reportContext(data,completed).confirmed,'Edited summary requires renewed confirmation.');
w.summaries['1'].text='Owner-written summary: urgent payments need testing.';assert(reportContext(data,completed).confirmed);
handleOperationsField(completed,'action.unauthorized.progress','Implementation work has started.');assert(saveAction(completed,'unauthorized',{start:true}).ok);
assert(!reportContext(data,completed).confirmed,'Operational version changes invalidate latest report confirmation.');assert.equal(JSON.stringify(w.editions[0]),saved,'Archived report edition remains unchanged.');

// Selecting an old submission never pulls in a live draft or a later source excerpt.
assert(startOwnerRevision(completed,data));completed.risks.unauthorized.controlConclusion.text='A later draft conclusion';
completed.evidenceContext.sources.find(s=>s.id==='test').excerpt='A later source excerpt';w.selectedVersion=1;
const historical=buildReportHtml(data,completed);assert(!historical.includes('A later draft conclusion'));assert(!historical.includes('A later source excerpt'));assert(historical.includes(data.sources.find(s=>s.id==='test').excerpt));
assert.equal(JSON.stringify(w.editions[0]),saved);

// An added fourth risk has no invented prior score and is covered by the reviewed export.
const fourth=seedScene(data,'discovery');fourth.role='first';fourth.dependency='confirmed';fourth.risks.unauthorized.residualConfirmed=true;
fourth.risks.duplicate={...structuredClone(fourth.risks.details),id:'duplicate',name:'Duplicate wire release',description:'A retry could release the same payment twice.',prior:null,lastConfirmedResidual:null,controls:[],noControlsConfirmed:true,mappingApplicability:{},mappingRationale:{},controlConclusion:{text:'No current control is mapped. The owner assessed this explicitly.'},sources:['test']};
fourth.risks.duplicate.riskResponse.created=false;assert(sendAssessment(fourth));fourth.role='second';fourth.assessmentView='agree';fourth.reviewerRationale='The four-risk assessment and stated limits are supported.';assert(completeReview(fourth));
const full=buildReportHtml(data,fourth);assert(full.includes('Duplicate wire release'));assert(full.includes('No previous assessment'));assert.equal(Object.keys(reportContext(data,fourth).projection.risks).length,4);
const fresh=createInitial(data);fresh.risks.duplicate={...structuredClone(fourth.risks.duplicate),inherent:blankRating(),residual:blankRating(),inherentConfirmed:false,controlsConfirmed:false,residualConfirmed:false};
const missing=reportsView(data,fresh);assert(missing.includes('Not assessed'));assert(!missing.includes('Low (0)'));

// Perspective guards protect confirmation and typed edits through the public field handler.
const readOnly=seedScene(data,'complete');readOnly.role='management';assert.equal(confirmReport(data,readOnly),false);handleOperationsField(readOnly,'report.summary','Unauthorized edit');assert.equal(readOnly.reportWorkspace?.draftSummary,undefined);
console.log('PASS: all-risk report, named drill-downs, frozen version/source projection, editable text confirmation, operational invalidation, immutable editions, safe standalone HTML, added-risk/missing-prior states and role guards.');
