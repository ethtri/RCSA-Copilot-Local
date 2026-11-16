import {assessmentProjection,reviewedProjection,score} from './model.js?v=20261116.3';
// Local reference adapter. No network, credentials or production authorization.
const copy=value=>structuredClone(value);
export const EXTERNAL_IDS={assessment:'RCSA-PAY-2026-Q4-0142',risk:'RISK-WT-014',action:'ACT-PAY-028',risks:{unauthorized:'RISK-WT-014',details:'RISK-WT-015',cutoff:'RISK-WT-016'},controls:{callback:'CTRL-PAY-041',approval:'CTRL-PAY-042','details-check':'CTRL-PAY-043',queue:'CTRL-PAY-044','customer-confirmation':'CTRL-PAY-045'}};
export const METHOD_PROFILES={five:{name:'Five-point assessment',scale:'1–5 likelihood × 1–5 impact',fit:true},four:{name:'Four-point assessment',scale:'1–4 likelihood × 1–4 impact',fit:false}};
export function exchangeState(s){
 const g=s.grc??={profile:'five',tab:'record',status:'not-imported',baseline:null,preview:null,pending:null,lastAck:null,fault:'none',sequence:0,events:[],reference:{version:7,id:EXTERNAL_IDS.assessment,record:{riskId:EXTERNAL_IDS.risk,residual:8,owner:'Payments Operations',conclusion:'Standard-wire assessment',reviewState:'Prior cycle',evidenceIds:['WT-25'],action:null,note:'Original reference record'}}};
 g.riskMappings??={...EXTERNAL_IDS.risks};g.controlMappings??={...EXTERNAL_IDS.controls};g.events??=[];return g;
}
const log=(g,actor,action,detail)=>g.events.push({at:new Date().toISOString(),actor,action,detail});
const recordedOperations=records=>copy({actions:records?.actions||{},decisions:records?.decisions||{},evidenceRequests:records?.evidenceRequests||{},archivedActions:records?.archivedActions||[],archivedDecisions:records?.archivedDecisions||[]});
export function reviewedPayload(s){
 if(!s.submitted||!s.reviewed)return null;
 const snapshot=reviewedProjection(s);
 if(!snapshot)return null;
 const g=exchangeState(s),risks=Object.values(snapshot.risks||{}).filter(r=>!r.removed).map(r=>{const action=r.id==='unauthorized'?snapshot.action:r.responseAction;return {localId:r.id,riskId:g.riskMappings[r.id]||null,name:r.name,residualConfirmed:!!r.residualConfirmed,residual:score(r.residual),inherent:copy(r.inherent),prior:copy(r.prior||null),conclusion:r.controlConclusion?.text||'',controls:(r.controls||[]).map(id=>({localId:id,externalId:g.controlMappings[id]||null,status:snapshot.controls.find(c=>c.id===id)?.status||'Current'})),evidenceIds:[...(r.sources||[])],response:copy(r.riskResponse||{}),action:r.riskResponse?.created&&r.riskResponse.strategy!=='accept'?{id:r.id==='unauthorized'?EXTERNAL_IDS.action:`ACT-${g.riskMappings[r.id]||r.id}`,title:action?.title||'',owner:action?.owner||'',due:action?.due||'',evidence:action?.evidence||''}:null};});
 if(risks.some(r=>!r.residualConfirmed||r.residual===null))return null;
 const primary=risks.find(r=>r.localId==='unauthorized')||risks[0];if(!primary)return null;
 return {assessmentId:EXTERNAL_IDS.assessment,riskId:primary.riskId,submissionVersion:snapshot.version,residual:primary.residual,owner:g.baseline?.record?.owner||'Payments Operations',conclusion:primary.conclusion,reviewState:'Reviewed · management decision separate',reviewerRationale:snapshot.review.rationale,review:copy(snapshot.review),ratingMethod:copy(snapshot.ratingMethod),risks,controls:risks.flatMap(r=>r.controls),evidenceIds:[...new Set(risks.flatMap(r=>r.evidenceIds))],evidenceVersions:snapshot.sources.map(src=>({id:src.id,version:src.version||src.date||null})),action:primary.action,linkedRecords:recordedOperations(snapshot.operations),managementDecision:'Only an explicit management event can approve a request'};
}
export const payloadKey=s=>JSON.stringify(reviewedPayload(s));
export function readinessIssues(s){
 const g=exchangeState(s),p=assessmentProjection(s,'current'),issues=[];
 if(!METHOD_PROFILES[g.profile]?.fit||p?.ratingMethod?.id!=='likelihood-impact-5-v1'||p?.ratingMethod?.version!==1)issues.push({kind:'method',id:g.profile,name:METHOD_PROFILES[g.profile]?.name||'Unknown rating method',owner:'Morgan Chen · GRC administrator',nextStep:'Agree the rating mapping and method version. No automatic conversion is allowed.'});
 for(const r of Object.values(p?.risks||s.risks||{}).filter(r=>!r.removed)){
  if(!g.riskMappings[r.id])issues.push({kind:'risk',id:r.id,name:r.name,owner:'Morgan Chen · GRC administrator',nextStep:'Assign the bank’s risk identifier before sync.'});
  for(const id of r.controls||[])if(!g.controlMappings[id]){const control=p?.controls?.find(c=>c.id===id)||s.customControls?.find(c=>c.id===id);if(!issues.some(x=>x.kind==='control'&&x.id===id))issues.push({kind:'control',id,name:control?.name||id,owner:'Morgan Chen · GRC administrator',nextStep:`Assign a bank control identifier. Used by ${r.name}.`});}
 }
 return issues;
}
export function configureMapping(s,kind,id,externalId){
 const g=exchangeState(s);if(s.role!=='admin'||!['risk','control'].includes(kind)||!String(externalId||'').trim()||!/^[-A-Za-z0-9_]{3,80}$/.test(externalId))return false;
 const p=assessmentProjection(s,'current');if(kind==='risk'?!p?.risks?.[id]:!Object.values(p?.risks||{}).some(r=>r.controls?.includes(id)))return false;
 const collection=kind==='risk'?g.riskMappings:g.controlMappings;if(Object.entries(collection).some(([key,value])=>key!==id&&value===externalId))return false;
 collection[id]=String(externalId).trim();log(g,'Morgan Chen','Mapped bank identifier',`${kind} ${id} → ${collection[id]}. Assessment text and ratings unchanged.`);return true;
}
export function exchangeBlocker(s){
 const g=exchangeState(s);
 if(!g.baseline)return 'Import the reference record first.';
 if(!METHOD_PROFILES[g.profile]?.fit)return 'The four-point scale requires an agreed mapping. Ratings are not automatically converted.';
 const payload=reviewedPayload(s);
 if(!payload)return 'Complete owner submission and independent review before preparing an update.';
 if(g.lastAck?.key===payloadKey(s))return 'This reviewed submission has already updated the reference record.';
 const issue=readinessIssues(s)[0];if(issue)return `${issue.name}: ${issue.nextStep} Owner: ${issue.owner}`;
 return '';
}
export function importReference(s,actor='Assessment owner'){
 const g=exchangeState(s);if(s.role!=='first'||g.pending)return false;
 if(g.baseline&&g.status!=='conflict')return false;
 g.baseline=copy(g.reference);g.preview=null;g.status='imported';
 log(g,actor,'Imported reference record',`Source version ${g.baseline.version}; local assessment work preserved.`);return true;
}
export function prepareUpdate(s,actor='Assessment owner'){
 const g=exchangeState(s);if(s.role!=='first'||g.pending||exchangeBlocker(s))return false;
 g.preview={payload:reviewedPayload(s),key:payloadKey(s),baseVersion:g.baseline.version};g.status='preview';
 log(g,actor,'Prepared update preview',`Owner submission ${g.preview.payload.submissionVersion}; no transfer authorized.`);return true;
}
export function authorizeUpdate(s,attested,actor='Assessment owner'){
 const g=exchangeState(s);if(s.role!=='first'||!attested||g.pending||exchangeBlocker(s)||!g.preview||g.preview.key!==payloadKey(s))return false;
 if(g.lastAck?.key===g.preview.key){g.status='synchronized';return false;}
 g.pending={id:`EXCHANGE-${++g.sequence}`,payload:copy(g.preview.payload),key:g.preview.key,baseVersion:g.preview.baseVersion,actor};g.status='pending';
 log(g,actor,'Authorized reference update',`${g.pending.id}; awaiting confirmation of delivery.`);return true;
}
function performDelivery(s){
 const g=exchangeState(s),request=g.pending;
 if(!request||!['pending','failed'].includes(g.status))return false;
 if(exchangeBlocker(s)||request.key!==payloadKey(s)){g.pending=null;g.preview=null;g.status='imported';log(g,request.actor,'Cancelled stale update','The reviewed assessment or mapping changed. Prepare and authorize a new preview.');return false;}
 if(g.fault==='stale'){g.reference.version++;g.reference.record.note='The GRC owner updated the reference record.';g.fault='none';}
 if(request.baseVersion!==g.reference.version){g.status='conflict';log(g,'Reference adapter','Rejected stale version',`Expected source version ${request.baseVersion}; current source version ${g.reference.version}. No fields overwritten.`);return false;}
 if(g.fault==='transport'){if(request.mode==='automatic')g.fault='none';g.status='failed';log(g,'Reference adapter','Delivery failed',`${request.id}; no acknowledgment and no reference changes. Retry retains the same request ID.`);return false;}
 const p=request.payload;
 g.reference.record={...g.reference.record,assessmentId:EXTERNAL_IDS.assessment,residual:p.residual,conclusion:p.conclusion,reviewState:p.reviewState,reviewerRationale:p.reviewerRationale,evidenceIds:copy(p.evidenceIds),controls:copy(p.controls),risks:copy(p.risks),review:copy(p.review),ratingMethod:copy(p.ratingMethod),linkedRecords:copy(p.linkedRecords),action:p.action?{...(g.reference.record.action||{status:'Open'}),...copy(p.action)}:g.reference.record.action};g.reference.version++;
 g.lastAck={id:request.id,key:request.key,sourceVersion:g.reference.version,submissionVersion:request.payload.submissionVersion,at:new Date().toISOString()};g.pending=null;g.preview=null;g.status='synchronized';g.baseline=copy(g.reference);
 log(g,'Reference adapter','Acknowledged update',`${g.lastAck.id}; source version ${g.reference.version}; action ${request.payload.action?.id||'none'} saved once without creating a duplicate.`);return true;
}
export function deliverUpdate(s){return s.role==='first'?performDelivery(s):false;}
// The configured local worker is separate from interactive owner permissions.
export function deliverConfiguredUpdate(s){const g=exchangeState(s);return g.automatic&&g.pending?.mode==='automatic'?performDelivery(s):false;}
export function reconcileReference(s,attested,actor='Assessment owner'){
 const g=exchangeState(s);if(s.role!=='first'||g.status!=='conflict'||!attested)return false;
 g.pending=null;g.preview=null;g.baseline=copy(g.reference);g.status='imported';
 log(g,actor,'Reconciled source version',`Using source version ${g.reference.version}. The reviewed submission is saved. Authorize the new update before sending it.`);return true;
}
export function setMethodProfile(s,profile){
 const g=exchangeState(s);if(s.role!=='first'||g.pending||!METHOD_PROFILES[profile])return false;
 g.profile=profile;g.preview=null;if(g.status==='preview')g.status='imported';return true;
}
