import {exchangeState,reviewedPayload,payloadKey,METHOD_PROFILES,deliverConfiguredUpdate,readinessIssues} from './grc-exchange.js?v=20261118.8';
import {ensureOperations,decisionStatus} from './operations.js?v=20261118.8';

const log=(g,actor,action,detail)=>g.events.push({at:new Date().toISOString(),actor,action,detail});
const issueFor=(g,kind)=>({
 connection:{kind,title:'The GRC update could not be confirmed.',detail:'Your reviewed assessment is saved. Retry the update; the same request is used to avoid duplicates.'},
 conflict:{kind,title:'The GRC record changed during this review.',detail:'Your reviewed assessment is saved. Compare it with the latest GRC record before choosing which changes to keep.'},
 method:{kind,title:'The rating methods do not match.',detail:'Your assessment is saved. Your GRC administrator needs to agree the rating mapping before updates can sync.'},
 mapping:{kind,title:'A record needs a GRC identifier.',detail:'Your assessment is saved. Your GRC administrator needs to map the named risks or controls before this update can sync.'}
})[kind];

export function operationalPayload(s,records=ensureOperations(s)){
 return {assessmentVersion:s.versionNumber,actions:Object.values(records.actions||{}).map(a=>structuredClone(a)),decisions:Object.values(records.decisions||{}).map(d=>({...structuredClone(d),status:decisionStatus(s,d)})),evidenceRequests:Object.values(records.evidenceRequests||{}).map(e=>structuredClone(e))};
}
function refreshOperationalSync(s,g){
 const payload=operationalPayload(s),key=JSON.stringify(payload);
 if(g.lastOperationalKey===key){g.pending=null;g.issue=null;g.status='synchronized';return false;}
 if(g.status==='conflict'){g.issue=issueFor(g,'conflict');return false;}
 if(g.status==='failed'){g.issue=issueFor(g,'connection');return false;}
 if(g.pending?.mode!=='operational'||g.pending.key!==key){g.pending={id:`OPERATIONS-${++g.sequence}`,mode:'operational',payload,key,baseVersion:g.baseline.version,actor:'Configured operational policy'};log(g,'GRC connection','Queued operational update',`Assessment ${payload.assessmentVersion}; separately versioned action and decision events.`);}
 g.status='pending';g.issue=null;return true;
}
function deliverOperationalSync(s,g){
 const request=g.pending;if(!request||request.mode!=='operational')return false;
 if(request.key!==JSON.stringify(operationalPayload(s))){g.pending=null;g.status='synchronized';return false;}
 if(g.fault==='stale'){g.reference.version++;g.reference.record.note='The GRC owner updated the reference record.';g.fault='none';}
 if(request.baseVersion!==g.reference.version){g.status='conflict';g.issue=issueFor(g,'conflict');return false;}
 if(g.fault==='transport'){g.fault='none';g.status='failed';g.issue=issueFor(g,'connection');return false;}
 g.reference.record.operationalRecords=structuredClone(request.payload);g.reference.version++;g.baseline=structuredClone(g.reference);g.lastOperationalKey=request.key;g.operationalAck={id:request.id,key:request.key,sourceVersion:g.reference.version,assessmentVersion:request.payload.assessmentVersion};g.pending=null;g.issue=null;g.status='synchronized';log(g,'GRC connection','Acknowledged operational update',`${request.id}; original reviewed assessment payload retained.`);return true;
}

// Local simulation of a preconfigured connector. Never sends network requests.
export function refreshAutomaticSync(s){
 const g=exchangeState(s);g.automatic=true;g.destination='Bank GRC';g.preview=null;
 if(!g.baseline){g.baseline=structuredClone(g.reference);g.status='imported';log(g,'GRC connection','Source record available',`Source version ${g.reference.version}; assessment work retained.`);}
 const payload=reviewedPayload(s),key=payloadKey(s);
 if(!payload){
  if(g.pending)log(g,'GRC connection','Cancelled outdated update','The assessment needs review before another update can sync.');
  g.pending=null;g.issue=null;g.status=g.lastAck?'synchronized':'imported';return false;
 }
 if(g.lastAck?.key===key)return refreshOperationalSync(s,g);
 if(g.pending?.key!==key){g.pending=null;if(['failed','pending'].includes(g.status))g.status='imported';}
 const readiness=readinessIssues(s),invalid=readiness.some(i=>i.kind==='method')?'method':readiness.length?'mapping':null;
 if(invalid){g.pending=null;g.status='blocked';g.issue={...issueFor(g,invalid),detail:readiness.map(i=>`${i.name}: ${i.nextStep} Owner: ${i.owner}`).join(' '),records:readiness};return false;}
 if(g.status==='conflict'){g.issue=issueFor(g,'conflict');return false;}
 if(g.status==='failed'){g.issue=issueFor(g,'connection');return false;}
 g.issue=null;
 if(!g.pending){
  g.pending={id:`EXCHANGE-${++g.sequence}`,mode:'automatic',payload:structuredClone(payload),key,baseVersion:g.baseline.version,actor:'Configured review policy'};
  log(g,'GRC connection','Queued reviewed assessment',`Submission ${payload.submissionVersion}; required review completed.`);
 }else g.pending.mode='automatic';
 g.status='pending';return true;
}

export function finishAutomaticSync(s){
 const g=exchangeState(s);
 refreshAutomaticSync(s);
 if(g.status!=='pending')return false;
 if(g.pending?.mode==='operational')return deliverOperationalSync(s,g);
 if(g.pending?.mode!=='automatic')return false;
 const initialRecords=g.pending.payload.linkedRecords;
 const delivered=deliverConfiguredUpdate(s);
 if(delivered){const current=operationalPayload(s),hasExecution=[...current.actions,...current.decisions,...current.evidenceRequests].some(record=>record.version>1);g.lastOperationalKey=JSON.stringify(hasExecution?operationalPayload(s,initialRecords):current);if(!hasExecution)g.reference.record.operationalRecords=structuredClone(current);}
 g.issue=g.status==='failed'?issueFor(g,'connection'):g.status==='conflict'?issueFor(g,'conflict'):null;
 return delivered;
}

export function retryAutomaticSync(s){
 const g=exchangeState(s);
 refreshAutomaticSync(s);
 if(g.status!=='failed'||!g.pending)return false;
 g.status='pending';g.issue=null;
 log(g,'GRC connection','Retry requested',`${g.pending.id}; reviewed values unchanged.`);
 return true;
}

export function resolveSyncConflict(s,expectedSourceVersion){
 const g=exchangeState(s);
 if(s.role!=='first'||g.status!=='conflict'||!reviewedPayload(s)||Number(expectedSourceVersion)!==g.reference.version)return false;
 g.baseline=structuredClone(g.reference);g.pending=null;g.status='imported';g.issue=null;
 log(g,'Assessment owner','Kept reviewed assessment after comparison',`Compared with GRC version ${g.reference.version}. Bank-owned fields remain unchanged.`);
 return refreshAutomaticSync(s);
}

export function automaticSyncStatus(s){
 const g=exchangeState(s);
 if(g.issue)return {kind:'attention',text:'GRC sync needs attention',detail:g.issue.detail};
 if(!s.submitted)return {kind:'quiet',text:'GRC connected · sync after review',detail:g.lastAck?`Version ${g.lastAck.submissionVersion} is synced. This draft will sync after review.`:'Draft changes stay here until the required review is complete.'};
 if(!s.reviewed)return {kind:'quiet',text:'Syncs to GRC after review',detail:'The GRC record stays unchanged while this assessment is being reviewed.'};
 if(g.status==='synchronized'&&g.lastAck?.key===payloadKey(s))return {kind:'synced',text:`Synced to GRC · Version ${g.lastAck.submissionVersion}`,detail:'The reviewed assessment and separately versioned operational records are up to date in the local GRC record.'};
 return {kind:'pending',text:'Syncing to GRC…',detail:'Your reviewed assessment is saved. The update is awaiting confirmation.'};
}
