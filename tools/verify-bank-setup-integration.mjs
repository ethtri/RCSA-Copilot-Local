import assert from 'node:assert/strict';
import {readFile} from 'node:fs/promises';
import {createInitial,seedScene,startOwnerRevision,sendAssessment,completeReview,requirements,assessmentProjection,emptyResponse} from '../src/scripts/demo/model.js';
import {beginPolicyDraft,mutateBankSetupField,reviewPolicyDraft,applyPolicyDraft,thresholdFor,policyFor} from '../src/scripts/demo/bank-policy.js';
import {responseComplete} from '../src/scripts/demo/responses.js';
import {responseWorkspace} from '../src/scripts/demo/response-view.js';
import {assessmentView} from '../src/scripts/demo/assessment.js';
import {ownerReviewReport} from '../src/scripts/demo/assessment-context.js';
import {reportContext,reportsView,buildReportHtml} from '../src/scripts/demo/reports.js';
import {ratingProposal,applyProposal} from '../src/scripts/demo/upgrade-model.js';
import {preparedRefresh,proposalDialog} from '../src/scripts/demo/upgrade-view.js';

const load=async name=>JSON.parse(await readFile(new URL(`../assets/data/${name}.json`,import.meta.url),'utf8'));
const [workflow,intelligence,research,context,assistance]=await Promise.all(['workflow-demo','risk-intelligence','research-demo','assessment-context','control-assistance'].map(load));
const data={...workflow,intelligence,research,context,assistance,sources:[...workflow.sources,...intelligence.sources,...research.sources,...context.sources]};
function approveSetup(s,fields){
 s.role='admin';assert(beginPolicyDraft(s).ok);
 for(const [field,value]of Object.entries(fields))mutateBankSetupField(s,`bankSetup.${field}`,value);
 assert(reviewPolicyDraft(s,{ownerName:data.owner}).ok);assert(applyPolicyDraft(s,{ownerName:data.owner}).ok);s.role='first';
}

// Threshold configuration changes the actual response requirement, not only its label.
const initial=createInitial(data);initial.risks.unauthorized.residual=structuredClone(workflow.risks.find(r=>r.id==='unauthorized').residual);initial.risks.unauthorized.riskResponse=emptyResponse(data.owner);
assert.equal(thresholdFor(initial),9);assert.equal(responseComplete(initial,'unauthorized'),false,'Score 12 requires an explicit response under threshold 9.');
const before=JSON.stringify(initial.risks.unauthorized.residual);initial.role='admin';assert(beginPolicyDraft(initial).ok);mutateBankSetupField(initial,'bankSetup.tolerance','15');assert.equal(responseComplete(initial,'unauthorized'),false,'An unsaved setup draft has no effect on the assessment.');assert(reviewPolicyDraft(initial).ok);assert.equal(thresholdFor(initial),9,'Reviewing the setting does not apply it.');assert(applyPolicyDraft(initial).ok);initial.role='first';
assert.equal(thresholdFor(initial),15);assert.equal(responseComplete(initial,'unauthorized'),true,'Score 12 does not require a response under the saved threshold 15.');assert.equal(JSON.stringify(initial.risks.unauthorized.residual),before,'Changing policy does not change a risk score.');
const configuredResponse=responseWorkspace(data,initial);assert.match(configuredResponse,/Response threshold: 15/,'Response workspace shows the configured threshold.');assert.match(configuredResponse,/Draft rating · not confirmed/,'A configured threshold does not confirm the prepared rating.');assert(!configuredResponse.includes('Within the threshold'),'An unconfirmed rating must not be presented as confirmed within the threshold.');assert.match(assessmentView(data,initial,'changes'),/Response required above 15/);assert.match(ownerReviewReport(data,initial),/Response required above 15/);
initial.risks.unauthorized.residualConfirmed=true;assert.match(reportsView(data,initial),/Response required above 15/);assert.match(reportContext(data,initial).summary,/No confirmed risk is above the bank’s threshold/);

// A new draft setup must not rewrite the reviewed policy, ratings or downloaded report basis.
const historical=seedScene(data,'complete'),originalSnapshot=JSON.stringify(historical.snapshots),oldProjection=assessmentProjection(historical,1,data);
assert.equal(thresholdFor(oldProjection),9);historical.role='first';assert(startOwnerRevision(historical,data));approveSetup(historical,{tolerance:'15',policyName:'Payments review policy'});
assert.equal(JSON.stringify(historical.snapshots),originalSnapshot);assert.equal(thresholdFor(assessmentProjection(historical,1,data)),9);assert.equal(thresholdFor(assessmentProjection(historical,'current',data)),15);
historical.reportWorkspace={selectedVersion:'1'};const archived=reportContext(data,historical);assert.match(archived.summary,/1 confirmed risk is above the bank’s threshold/);assert.match(buildReportHtml(data,historical,archived),/Response required above 9/);assert(!buildReportHtml(data,historical,archived).includes('Payments review policy'),'Archived HTML uses its frozen policy name.');
historical.reportWorkspace.selectedVersion='current';for(const risk of Object.values(historical.risks))risk.residualConfirmed=true;assert.match(reportContext(data,historical).summary,/No confirmed risk is above the bank’s threshold/);assert.match(buildReportHtml(data,historical),/Response required above 15/);

// The configured reviewer is the person recorded on the real independent review decision.
const namedReviewer=seedScene(data,'discovery');approveSetup(namedReviewer,{reviewerName:'Avery Shah'});namedReviewer.dependency='confirmed';namedReviewer.risks.unauthorized.residualConfirmed=true;
assert(sendAssessment(namedReviewer),'A prepared, complete owner assessment can be submitted.');namedReviewer.role='second';namedReviewer.assessmentView='agree';namedReviewer.reviewerRationale='The evidence limits and follow-up work are clear.';assert(completeReview(namedReviewer));assert.equal(namedReviewer.reviewConclusions.at(-1).actor,'Avery Shah');assert.equal(assessmentProjection(namedReviewer,'current',data).review.actor,'Avery Shah');assert.match(reportsView(data,namedReviewer),/Avery Shah/);

// A different meaning of rating levels cannot reuse the authored numeric suggestion.
const custom=createInitial(data);const oldRating=JSON.stringify(custom.risks.unauthorized.residual);approveSetup(custom,{'likelihood.2':'Plausible','impactDefinitions.3':'A bank-defined major effect assessed under the Payments policy.'});
const suggestion=ratingProposal(data,custom,'unauthorized','residual');assert.equal(suggestion.supported,false,'Prepared numeric ratings are withheld after definitions change.');assert.match(suggestion.summary,/definitions changed/);assert.equal(applyProposal(custom,data,suggestion.id).ok,false);assert.equal(JSON.stringify(custom.risks.unauthorized.residual),oldRating);
assert.match(preparedRefresh(data,custom),/available test does not cover urgent payments/,'The useful evidence insight remains available.');assert.match(proposalDialog(data,custom,suggestion.id),/test does not cover urgent payments/);assert(!proposalDialog(data,custom,suggestion.id).includes('data-action="upgrade-apply-proposal"'),'Unsupported numeric changes have no Apply action.');

// Required linked evidence blocks a submission; making it optional has a real effect.
const evidence=seedScene(data,'discovery');evidence.role='first';evidence.dependency='confirmed';evidence.risks.unauthorized.residualConfirmed=true;evidence.risks.unauthorized.sources=['missing-bank-record'];
const missing=requirements(evidence).filter(row=>row.label.includes('supporting records linked'));assert(missing.some(row=>row.risk==='unauthorized'&&!row.done));assert.equal(sendAssessment(evidence),false,'Required evidence must be available before submission.');
approveSetup(evidence,{requireEvidence:'false'});assert.equal(policyFor(evidence).requireEvidence,false);assert(!requirements(evidence).some(row=>row.label.includes('supporting records linked')));assert(sendAssessment(evidence),'The configured optional-evidence rule is honored, while other confirmations remain required.');
const optionalSnapshot=JSON.stringify(evidence.snapshots);evidence.role='first';assert(startOwnerRevision(evidence,data));approveSetup(evidence,{requireEvidence:'true'});assert.equal(evidence.risks.unauthorized.controlsConfirmed,false);assert.equal(evidence.risks.unauthorized.residualConfirmed,false);assert.equal(evidence.risks.unauthorized.riskResponse.needsReview,true,'Requiring evidence again also reopens the linked response judgment.');assert.equal(JSON.stringify(evidence.snapshots),optionalSnapshot,'The stricter evidence rule does not rewrite earlier submissions.');assert(requirements(evidence).some(row=>row.risk==='unauthorized'&&row.label.includes('supporting records linked')&&!row.done));

console.log('Bank setup integration passed: response threshold, forms, frozen reports, reviewer identity, guarded AI ratings and evidence requirements.');
