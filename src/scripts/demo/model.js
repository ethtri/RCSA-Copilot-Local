import {carryForwardNeedsReview} from './carry-forward.js?v=20261115.20';
import {defaultScope,scopeContent} from './scope-model.js?v=20261115.20';
import {prepareManagementRequest} from './operations.js?v=20261115.20';
import {evidenceRequired,reviewerFor,defaultPolicy,thresholdFor} from './bank-policy.js?v=20261115.20';
import {controlDefaults} from './assessment-content.js?v=20261115.20';
import {responseComplete,RESPONSE_OPTIONS} from './responses.js?v=20261115.20';
export const SCHEMA_VERSION=3;
export const STAGES=['changes','inherent','controls','residual','review'];
export const LABELS=['What changed','Inherent risk','Controls','Residual risk & response','Review'];
export const LIKELIHOOD=['Rare','Unlikely','Possible','Likely','Almost certain'];
export const IMPACT=['Minor','Moderate','Significant','Major','Severe'];
const copy=value=>structuredClone(value);
export const blankRating=()=>({likelihood:null,impact:null,likelihoodRationale:'',impactRationale:''});
export const validRating=r=>!!r&&['likelihood','impact'].every(k=>Number.isInteger(Number(r[k]))&&Number(r[k])>=1&&Number(r[k])<=5);
export const score=r=>validRating(r)?Number(r.likelihood)*Number(r.impact):null;
export function band(v){return v===null||v===undefined||!Number.isFinite(Number(v))?'Not assessed':v<=4?'Low':v<=9?'Moderate':v<=15?'Elevated':'High';}
export const riskEntries=s=>Object.values(s.risks||{}).filter(r=>!r.removed);
// The authored service reply is not available until its explicit receipt event.
export const sourceAvailable=(source,s)=>source.id==='signals-urgent-test'?!!s.signalTestReceived:source.id!=='service-clarification'||!!s.newEvidenceReceived;
export const sourceRecords=(data,s)=>[...(data?.sources||s.evidenceContext?.sources||[]),...(s.additionalSources||[])].filter((r,i,rows)=>sourceAvailable(r,s)&&rows.findIndex(x=>x.id===r.id)===i);
export const DEFAULT_METHOD=defaultPolicy();
export function emptyResponse(owner=''){return {created:false,needsReview:false,strategy:'',rationale:'',owner,reviewDate:'',protection:'',protectionOwner:owner,protectionDue:'',protectionStatus:'proposed',conditions:'',monitoring:'',decisionOwner:'',customerImpact:'',retainedExposure:'',counterpartyEvidence:''};}
function initialRisk(r,data){
 const prepared=['details','cutoff'].includes(r.id);
 return {...copy(r),residual:r.id==='unauthorized'&&r.prior?{...copy(r.prior),likelihoodRationale:'Carried forward from the previous assessment. Review the new evidence before confirming this rating.',impactRationale:'Carried forward from the previous assessment. Review the potential loss and customer impact.'}:copy(r.residual),preparedBaseline:{origin:'Prepared example',detail:'Starting records for this demo. Earlier approvals are not included.'},baselineControls:copy(r.controls||[]),controlConclusion:{text:controlDefaults[r.id]||''},mappingRationale:Object.fromEntries((r.controls||[]).map(id=>[id,data.controls?.find(c=>c.id===id)?.purpose||''])),mappingApplicability:{},noControlsConfirmed:false,lastConfirmedResidual:copy(r.id==='unauthorized'?r.prior:prepared?r.residual:null),riskResponse:{...emptyResponse(data.team||'Payments Operations'),reviewDate:'2026-11-28',protectionDue:'2026-11-28',protection:r.id==='unauthorized'?'Require an independently established verification source before releasing urgent requests after contact changes.':r.id==='details'?'Link the checked instruction version to release and repeat the check after an amendment.':r.id==='cutoff'?'Provide an approved fallback and early escalation for verification outages near cutoff.':''},responseAction:{id:'action-'+r.id,title:`Review controls for ${r.name.toLowerCase()}`,owner:data.team||'Payments Operations',due:'2026-11-28',evidence:'Document the control review, findings and supporting completion evidence.'},inherentConfirmed:prepared,controlsConfirmed:prepared,residualConfirmed:prepared};
}
export function createInitial(data){
 const risks=Object.fromEntries(data.risks.map(r=>[r.id,initialRisk(r,data)]));
 return {version:3,schemaVersion:3,asOf:'2026-11-14',dashboardFilter:'all',customControls:[],additionalSources:[],role:'first',selectedRisk:risks.unauthorized?'unauthorized':Object.keys(risks)[0],selectedControl:'callback',scope:false,assessmentScope:defaultScope(data),dependency:'',qualification:'',submitted:false,challengeStatus:'none',reviewed:false,reviewStatus:'draft',response:'',question:data.challenge||'',replyRiskId:'',questionRiskId:risks.unauthorized?'unauthorized':Object.keys(risks)[0],reviewerRationale:'',assessmentView:'',responseSufficient:'yes',reviewReturn:null,handoff:'',action:copy(data.action||{}),risks,controlAssistance:{decisions:[],plans:{},objectiveByRisk:{},openByRisk:{},tabByRisk:{},selectedByRisk:{}},history:[],snapshots:[],reviewConclusions:[],conversations:[],revisionOf:null,versionNumber:0,proposals:{},discoveryDecisions:[],operations:{actions:{},decisions:{}},evidenceContext:{sources:copy(data.sources||[]),controls:copy(data.controls||[]),ratingMethod:copy(data.ratingMethod||DEFAULT_METHOD)}};
}
export function migrateSession(raw,data){
 if(!raw||typeof raw!=='object'||![2,3].includes(raw.version)||!raw.risks||!Array.isArray(raw.history)||!Array.isArray(raw.snapshots))return {state:null,migrated:false,error:'The saved session has an unsupported or incomplete format. Your original saved data has not been changed.'};
 try{
  const state={...createInitial(data),...copy(raw),version:3,schemaVersion:3};
  state.conversations??=[];state.reviewConclusions??=[];state.proposals??={};state.discoveryDecisions??=[];state.additionalSources??=[];state.operations??={actions:{},decisions:{}};
  state.reviewStatus=raw.reviewStatus||(raw.reviewed?'reviewed':raw.submitted?'in-review':'draft');
  // Historical submissions retain their original content. Missing evidence context stays unknown.
  for(const r of Object.values(state.risks)){r.mappingApplicability??={};r.baselineControls??=copy(data.risks.find(x=>x.id===r.id)?.controls||[]);r.sources??=[];r.controls??=[];r.riskResponse={...emptyResponse(r.owner||data.team||''),...(r.riskResponse||{})};r.responseAction??={id:'action-'+r.id,title:'',owner:'',due:'',evidence:''};}
  if(!state.risks[state.selectedRisk])state.selectedRisk=riskEntries(state)[0]?.id;
  if(raw.version===2&&raw.submitted)state.legacyReviewBasis={version:raw.versionNumber,contentKey:assessmentContentKey(state)};
  if(raw.version===2&&raw.reviewed&&!state.reviewConclusions.some(v=>Number(v.version)===Number(raw.versionNumber)))state.reviewConclusions.push({version:raw.versionNumber,status:'Reviewed',rationale:raw.reviewerRationale||'',assessmentView:raw.assessmentView||'agree',actor:'Jordan Lee',date:raw.asOf||'2026-11-14',migrated:true});
  return {state,migrated:raw.version!==3,error:null};
 }catch{return {state:null,migrated:false,error:'This saved session could not be read. Preserve the original data before starting again.'};}
}
export function actionComplete(s){return !!s.action&&['title','owner','evidence'].every(k=>String(s.action[k]||'').trim())&&/^\d{4}-\d{2}-\d{2}$/.test(s.action.due)&&s.action.due>=(s.asOf||'2026-11-14');}
export function requirements(s){
 const risks=riskEntries(s),rows=[{label:'Assessment scope confirmed',done:!!s.scope&&!s.scopeDraft,risk:risks[0]?.id||'',stage:'changes'}];
 for(const r of risks){
  if(carryForwardNeedsReview(s,r))rows.push({key:'carry-forward',label:`${r.name}: starting assessment reviewed for this cycle`,done:false,risk:r.id,stage:'review'});
  if(evidenceRequired(s))rows.push({label:`${r.name}: supporting records linked`,done:(r.sources||[]).length>0&&(r.sources||[]).every(id=>sourceRecords(null,s).some(source=>source.id===id)),risk:r.id,stage:'inherent'});
  rows.push({label:`${r.name}: risk before controls confirmed`,done:!!r.inherentConfirmed&&validRating(r.inherent),risk:r.id,stage:'inherent'});
  rows.push({label:`${r.name}: controls assessed`,done:!!r.controlsConfirmed&&!Object.values(r.mappingApplicability||{}).some(x=>x.conclusion==='unassessed')&&!!r.controlConclusion?.text?.trim()&&((r.controls||[]).length>0||r.noControlsConfirmed),risk:r.id,stage:'controls'});
  if(r.id==='unauthorized'&&['callback','approval'].every(id=>r.controls.includes(id)))rows.push({label:'Shared information source reviewed',done:!!s.dependency,risk:r.id,stage:'discovery'});
  rows.push({label:`${r.name}: risk after controls confirmed`,done:!!r.residualConfirmed&&validRating(r.residual),risk:r.id,stage:'residual'});
  rows.push({label:`${r.name}: required response recorded`,done:responseComplete(s,r.id),risk:r.id,stage:'response'});
 }
 for(const [id,plan]of Object.entries(s.controlAssistance?.plans||{}))rows.push({label:`${s.risks[id]?.name||'Control'}: plan up to date`,done:!plan.needsReview,risk:id,stage:'controls'});
 return rows;
}
export function currentRating(s,id){const r=s.risks?.[id];return r?(r.residualConfirmed&&validRating(r.residual)?r.residual:r.lastConfirmedResidual||r.prior||null):null;}
export function acceptanceStatus(s,id=s.selectedRisk){const r=s.risks?.[id];if(!r?.riskResponse?.created)return 'Response not yet recorded';return !s.submitted?'Draft acceptance request':r.residualConfirmed?'Acceptance decision pending':'Acceptance request needs assessment confirmation';}
export function reportSignature(s){return JSON.stringify([s.risks,s.submitted,s.reviewed,s.challengeStatus,s.versionNumber,s.dependency,s.qualification,s.action,s.reviewerRationale,s.controlAssistance?.decisions,s.controlAssistance?.plans,s.operations,s.report?.selectedVersion,s.report?.summaryByVersion,s.assessmentScope]);}
export function assessmentContentKey(s){const fields=[s.risks,s.action,s.customControls,s.controlAssistance?.decisions,s.controlAssistance?.plans,s.dependency,s.qualification,s.handoff||''];if(s.evidenceContext?.ratingMethod?.policyVersion)fields.push(s.evidenceContext.ratingMethod);const coverage=scopeContent(s);if(coverage)fields.push(coverage);return JSON.stringify(fields);}
export function snapshot(s){
 const c=s.evidenceContext||{},entry={version:s.versionNumber,assessmentScope:copy(s.assessmentScope||null),scope:!!s.scope,risks:copy(s.risks),action:copy(s.action),customControls:copy(s.customControls||[]),controlAssistance:copy(s.controlAssistance||{decisions:[],plans:{}}),operations:copy(s.operations||{actions:{},decisions:{}}),dependency:s.dependency,qualification:s.qualification,handoff:s.handoff||draftHandoff(s),question:s.question,response:s.response,conversations:copy(s.conversations||[]),newEvidenceReceived:!!s.newEvidenceReceived,signalTestReceived:!!s.signalTestReceived,eventMatch:s.eventMatch||'Unvalidated',assessmentView:s.assessmentView,date:s.asOf||'2026-11-14',sources:copy(sourceRecords(null,s)),controls:copy([...(c.controls||[]),...(s.customControls||[])]),ratingMethod:copy(c.ratingMethod||DEFAULT_METHOD),contentKey:assessmentContentKey(s)};
 s.snapshots??=[];s.snapshots.push(entry);return copy(entry);
}
export const getSubmission=(s,version=s.versionNumber)=>{const v=s.snapshots?.find(x=>Number(x.version)===Number(version));return v?copy(v):null;};
export function assessmentProjection(s,version='current',data){
 const draft=version==='current'&&!s.submitted,number=version==='current'?s.versionNumber:Number(version);
 const snap=draft?{version:number,assessmentScope:s.assessmentScope||null,scope:!!s.scope,signalTestReceived:!!s.signalTestReceived,risks:s.risks,action:s.action,customControls:s.customControls,controlAssistance:s.controlAssistance,operations:s.operations,sources:sourceRecords(data,s),controls:[...(s.evidenceContext?.controls||data?.controls||[]),...(s.customControls||[])],ratingMethod:s.evidenceContext?.ratingMethod||DEFAULT_METHOD,date:s.asOf,handoff:s.handoff,dependency:s.dependency,qualification:s.qualification}:s.snapshots?.find(v=>Number(v.version)===number);
 if(!snap)return null;
 const conclusion=[...(s.reviewConclusions||[])].reverse().find(v=>Number(v.version)===number),review=conclusion?{status:conclusion.status,rationale:conclusion.rationale||'',actor:conclusion.actor||'Jordan Lee',date:conclusion.date,assessmentView:conclusion.assessmentView}:{status:draft?'Draft':'In review',rationale:'',actor:'',date:null};
 return copy({...snap,draft,sources:(snap.sources||[]).filter(source=>sourceAvailable(source,draft?s:snap)),controls:snap.controls||[],ratingMethod:snap.ratingMethod||null,legacyContextUnavailable:!snap.sources||!snap.controls||!snap.ratingMethod,review});
}
export function reviewedProjection(s,version=s.versionNumber){const p=assessmentProjection(s,version);return p?.review.status==='Reviewed'?p:null;}
export function draftHandoff(s){const relationship=s.risks.unauthorized?` Shared-source suggestion: ${({confirmed:'confirmed by the owner',qualified:'saved with the owner’s note',dismissed:'dismissed by the owner'})[s.dependency]||'awaiting owner review'}.${s.qualification?' '+s.qualification:''}`:'';return riskEntries(s).map(r=>{const n=score(currentRating(s,r.id)),v=r.riskResponse;return `${r.name}: ${n===null?'not yet assessed':`${band(n)} (${n})`}. ${v?.created?`Response: ${RESPONSE_OPTIONS.find(o=>o[0]===v.strategy)?.[1]||'Recorded'}. ${v.strategy==='accept'?acceptanceStatus(s,r.id)+'.':''}`:r.residualConfirmed&&score(r.residual)<=thresholdFor(s)?'No additional response required at the confirmed rating.':'No response recorded.'}`;}).join(' ')+relationship+' Open actions and management decisions are tracked separately.';}
export function record(s,actor,text,detail=''){s.history??=[];s.history.push({actor,text,detail,date:s.asOf||'2026-11-14'});}
export function invalidateRisk(s,id,{inherent=false,controls=false}={}){const r=s.risks?.[id];if(!r)return false;if(inherent)r.inherentConfirmed=false;if(controls)r.controlsConfirmed=false;r.residualConfirmed=false;if(r.riskResponse?.created)r.riskResponse.needsReview=true;if(s.controlAssistance?.plans?.[id])s.controlAssistance.plans[id].needsReview=true;s.reportConfirmed='';return true;}
export function startOwnerRevision(s,data){
 if(s.role!=='first'||!s.submitted)return false;
 const base=s.versionNumber;if(!s.reviewConclusions?.some(v=>Number(v.version)===base)){s.reviewConclusions??=[];s.reviewConclusions.push({version:base,status:s.reviewed?'Reviewed':s.reviewStatus==='returned'?'Returned':'In review',rationale:s.reviewerRationale,assessmentView:s.assessmentView,question:s.question,response:s.response,returned:copy(s.reviewReturn||null),actor:reviewerFor(s),date:s.asOf});}
 const preservedScope=s.snapshots?.find(v=>Number(v.version)===Number(base))?.assessmentScope;if(preservedScope)s.assessmentScope=copy(preservedScope);else{s.assessmentScope=defaultScope(data);s.scope=false;}delete s.scopeDraft;delete s.scopeRiskDraft;s.revisionOf=base;s.submitted=false;s.reviewed=false;s.reviewStatus='draft';s.challengeStatus='none';s.reviewReturn=null;s.reviewerRationale='';s.assessmentView='';s.responseSufficient='yes';s.reportConfirmed='';s.question=data?.challenge||'';s.response='';s.ownerRevisionRequired=false;record(s,data?.owner||'Alex Morgan',`Started an owner revision from version ${base}.`,'The earlier submission and review are preserved.');return true;
}
export function sendAssessment(s){if(s.role!=='first'||s.submitted||!requirements(s).every(x=>x.done))return false;s.submitted=true;s.versionNumber++;s.reviewed=false;s.reviewStatus='in-review';s.challengeStatus='none';s.reviewReturn=null;s.assessmentView='';s.reviewerRationale='';snapshot(s);record(s,'Alex Morgan',`Confirmed and submitted assessment version ${s.versionNumber}.`);return true;}
export function sendChallenge(s){if(s.role!=='second'||!s.submitted||!s.question?.trim()||s.reviewed||s.reviewStatus==='returned'||s.challengeStatus==='open')return false;s.challengeStatus='open';s.reviewReturn=null;s.questionRiskId=s.selectedRisk||s.questionRiskId;s.replyRiskId='';s.conversations??=[];s.conversations.push({id:'conversation-'+(s.conversations.length+1),kind:'question',riskId:s.questionRiskId,submissionVersion:s.versionNumber,text:s.question,actor:reviewerFor(s),date:s.asOf});record(s,reviewerFor(s),'Sent a review question.',s.question);return true;}
export function responseCoverage(text){return [{label:'Urgent requests and test population',done:/urgent/i.test(text)&&/test|sample|population/i.test(text)},{label:'Recently changed contact records',done:/contact/i.test(text)&&/chang|amend/i.test(text)},{label:'Independent verification source',done:/independent/i.test(text)&&/source|verif/i.test(text)},{label:'Results and completion evidence',done:/result|closure|evidence|exception/i.test(text)}];}
export function respond(s){
 if(s.role!=='first'||!s.submitted||s.challengeStatus!=='open'||!s.response?.trim())return false;
 const snap=s.snapshots?.find(v=>v.version===s.versionNumber);if((snap?.contentKey||s.legacyReviewBasis?.version===s.versionNumber&&s.legacyReviewBasis.contentKey)&&(snap?.contentKey||s.legacyReviewBasis.contentKey)!==assessmentContentKey(s)){s.ownerRevisionRequired=true;return false;}
 s.challengeStatus='responded';s.responseSufficient='';s.conversations??=[];s.conversations.push({id:'conversation-'+(s.conversations.length+1),kind:'reply',riskId:s.questionRiskId||s.selectedRisk,submissionVersion:s.versionNumber,text:s.response,actor:'Alex Morgan',date:s.asOf});record(s,'Alex Morgan',`Replied about assessment version ${s.versionNumber}.`,s.response);return true;
}
export function completeReview(s){
 if(s.role!=='second'||!s.submitted||s.reviewed||!s.reviewerRationale?.trim()||!['agree','return'].includes(s.assessmentView))return false;
 const snap=s.snapshots?.find(v=>v.version===s.versionNumber);if(!snap||(snap.contentKey||s.legacyReviewBasis?.version===s.versionNumber&&s.legacyReviewBasis.contentKey)&&(snap.contentKey||s.legacyReviewBasis.contentKey)!==assessmentContentKey(s))return false;
 if(s.challengeStatus==='responded'&&s.assessmentView==='agree'&&!['yes','return'].includes(s.responseSufficient))return false;
 if(s.assessmentView==='return'){s.reviewStatus='returned';s.reviewed=false;s.challengeStatus='returned';s.reviewReturn={type:'assessment',rationale:s.reviewerRationale,version:s.versionNumber};s.ownerRevisionRequired=true;}
 else if(s.responseSufficient==='return'&&s.challengeStatus==='responded'){s.challengeStatus='open';s.reviewReturn={type:'reply',rationale:s.reviewerRationale,version:s.versionNumber};record(s,reviewerFor(s),'Returned the reply for clarification.',s.reviewerRationale);return true;}
 else{if(s.challengeStatus==='open'||s.reviewStatus==='returned')return false;s.reviewed=true;s.reviewStatus='reviewed';s.challengeStatus='resolved';}
 s.reviewConclusions??=[];s.reviewConclusions.push({version:s.versionNumber,status:s.reviewed?'Reviewed':'Returned',rationale:s.reviewerRationale,assessmentView:s.assessmentView,actor:reviewerFor(s),date:s.asOf});record(s,reviewerFor(s),`${s.reviewed?'Completed review':'Returned assessment'} of version ${s.versionNumber}.`,s.reviewerRationale);return true;
}
export function seedScene(data,scene){
 const s=createInitial(data);if(scene==='start')return s;s.scope=true;s.dependency='confirmed';const main=s.risks.unauthorized;if(main)main.residual=copy(data.risks.find(r=>r.id==='unauthorized').residual);
 if(main)main.riskResponse={...main.riskResponse,created:true,needsReview:false,strategy:'mitigate',rationale:'Test the urgent route and establish independent verification before reassessing the exposure.',owner:'Payments Operations',reviewDate:'2026-11-28'};
 if(main)prepareManagementRequest(s,main.id);riskEntries(s).forEach(r=>{r.inherentConfirmed=true;r.controlsConfirmed=true;r.residualConfirmed=true;r.lastConfirmedResidual=copy(r.residual);if(r.preparedBaseline)r.preparedBaseline.reviewed=true;});if(scene==='discovery'){main.residualConfirmed=false;s.dependency='';return s;}
 sendAssessment(s);s.role='second';if(scene==='submitted')return s;sendChallenge(s);s.role='first';if(scene==='challenge')return s;s.response=data.responses.revised;respond(s);s.role='second';s.assessmentView='agree';s.reviewerRationale='The revised plan addresses the requested scope. Completion evidence remains due.';s.responseSufficient='yes';if(scene==='response')return s;completeReview(s);return s;
}
