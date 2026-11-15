// Local reference adapter. No network, credentials or production authorization.
const copy=value=>structuredClone(value);
export const EXTERNAL_IDS={assessment:'RCSA-PAY-2026-Q4-0142',risk:'RISK-WT-014',action:'ACT-PAY-028',controls:{callback:'CTRL-PAY-041',approval:'CTRL-PAY-042'}};
export const METHOD_PROFILES={five:{name:'Five-point assessment',scale:'1–5 likelihood × 1–5 impact',fit:true},four:{name:'Four-point assessment',scale:'1–4 likelihood × 1–4 impact',fit:false}};
export function exchangeState(s){
 return s.grc??={profile:'five',tab:'record',status:'not-imported',baseline:null,preview:null,pending:null,lastAck:null,fault:'none',sequence:0,events:[],reference:{version:7,id:EXTERNAL_IDS.assessment,record:{riskId:EXTERNAL_IDS.risk,residual:8,owner:'Payments Operations',conclusion:'Standard-wire assessment',reviewState:'Prior cycle',evidenceIds:['WT-25'],action:null,note:'Original reference record'}}};
}
const log=(g,actor,action,detail)=>g.events.push({at:new Date().toISOString(),actor,action,detail});
export function reviewedPayload(s){
 if(!s.submitted||!s.reviewed)return null;
 const snapshot=s.snapshots?.find(v=>v.version===s.versionNumber);
 if(!snapshot)return null;
 const risk=snapshot.risks.unauthorized;
 if(!risk.residualConfirmed)return null;
 return {assessmentId:EXTERNAL_IDS.assessment,riskId:EXTERNAL_IDS.risk,submissionVersion:snapshot.version,residual:Number(risk.residual.likelihood)*Number(risk.residual.impact),owner:s.grc?.baseline?.record?.owner||'Payments Operations',conclusion:risk.controlConclusion?.text||'',reviewState:'Reviewed · management decision separate',reviewerRationale:s.reviewerRationale,controls:risk.controls.map(id=>({localId:id,externalId:EXTERNAL_IDS.controls[id]||null})),evidenceIds:[...risk.sources],action:risk.riskResponse?.created&&risk.riskResponse.strategy!=='accept'?{id:EXTERNAL_IDS.action,title:snapshot.action.title,owner:snapshot.action.owner,due:snapshot.action.due,evidence:snapshot.action.evidence}:null,managementDecision:'Not approved by this exchange'};
}
export const payloadKey=s=>JSON.stringify(reviewedPayload(s));
export function exchangeBlocker(s){
 const g=exchangeState(s);
 if(!g.baseline)return 'Import the reference record first.';
 if(!METHOD_PROFILES[g.profile]?.fit)return 'The four-point scale requires an agreed mapping. Ratings are not automatically converted.';
 const payload=reviewedPayload(s);
 if(!payload)return 'Complete owner submission and independent review before preparing an update.';
 if(g.lastAck?.key===payloadKey(s))return 'This reviewed submission has already updated the reference record.';
 if(payload.controls.some(c=>!c.externalId))return 'Assign a GRC control ID to each added control before transfer. This example supports the two original controls.';
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
 g.reference.record={...g.reference.record,assessmentId:EXTERNAL_IDS.assessment,residual:p.residual,conclusion:p.conclusion,reviewState:p.reviewState,reviewerRationale:p.reviewerRationale,evidenceIds:copy(p.evidenceIds),controls:copy(p.controls),action:p.action?{...(g.reference.record.action||{status:'Open'}),...copy(p.action)}:g.reference.record.action};g.reference.version++;
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
