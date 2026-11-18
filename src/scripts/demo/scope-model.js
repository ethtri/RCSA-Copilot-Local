import {invalidateRisk,record,reviewerConflict} from './model.js?v=20261118.8';


export const DEFAULT_SCOPE=Object.freeze({process:'Wire transfers',owner:'Alex Morgan',period:'Q4 2026',channels:'Standard and urgent wire payments',systems:'Wire processing platform; customer-contact directory; verification service',inScope:'Payment instructions, contact changes, verification, approval and release before cutoff.',outOfScope:'Settlement-service infrastructure and non-wire payment services.'});
const coverageKeys=['process','period','channels','systems','inScope','outOfScope'];
const keys=['process','owner','period','channels','systems','inScope','outOfScope'];
const clone=value=>structuredClone(value);
const editable=s=>s.role==='first'&&!s.submitted;
export const defaultScope=(data={})=>({...DEFAULT_SCOPE,owner:data.owner||DEFAULT_SCOPE.owner});
export function scopeRecord(s){
 const value=s.submitted?s.snapshots?.find(v=>Number(v.version)===Number(s.versionNumber))?.assessmentScope:s.draft===false?s.assessmentScope:s.assessmentScope||DEFAULT_SCOPE;
 return value?clone(value):null;
}
export function preparedScopeMatches(s){const scope=scopeRecord(s);return !!scope&&coverageKeys.every(key=>scope[key]===DEFAULT_SCOPE[key]);}
// Default fields do not change old session content keys; explicit edits do.
export function scopeContent(s){const scope=s.assessmentScope;return scope&&keys.some(key=>scope[key]!==DEFAULT_SCOPE[key])?clone(scope):null;}
export function beginScopeEdit(s){if(!editable(s))return false;s.scopeDraft=clone(scopeRecord(s)||DEFAULT_SCOPE);return true;}
export function cancelScopeEdit(s){delete s.scopeDraft;delete s.scopeRiskDraft;}
export function mutateScopeField(s,key,value){
 if(key.startsWith('scopeDraft.')){const field=key.slice(11);if(editable(s)&&s.scopeDraft&&keys.includes(field))s.scopeDraft[field]=String(value);return true;}
 if(key==='scopeRiskDraft.reason'){if(editable(s)&&s.scopeRiskDraft)s.scopeRiskDraft.reason=String(value);return true;}
 return false;
}
export function saveScope(s,data={}){
 if(!editable(s)||!s.scopeDraft)return {ok:false,message:'Only the assessment owner can save scope changes in a draft.'};
 const next=Object.fromEntries(keys.map(key=>[key,String(s.scopeDraft[key]||'').trim()]));
 if(keys.some(key=>!next[key]))return {ok:false,message:'Complete each scope field. Enter None if a boundary or system does not apply.'};
 if(keys.some(key=>next[key].length>2000))return {ok:false,message:'Keep each scope field under 2,000 characters.'};
 if(reviewerConflict(s,next.owner))return {ok:false,message:'Assign a different owner or change the independent reviewer in Bank setup.'};
 const previous=scopeRecord(s)||DEFAULT_SCOPE,changed=keys.some(key=>next[key]!==previous[key]);
 delete s.scopeDraft;
 if(!changed)return {ok:true,message:'Scope is unchanged.'};
 s.assessmentScope=next;s.scope=false;s.reportConfirmed='';
 if(coverageKeys.some(key=>next[key]!==previous[key])){
  for(const risk of Object.values(s.risks||{}))if(!risk.removed)invalidateRisk(s,risk.id,{inherent:true,controls:true});
 }
 record(s,data.owner||'Alex Morgan','Updated assessment scope.','Scope needs confirmation. Existing scores and wording were retained; changed coverage requires fresh risk and control confirmations.');
 return {ok:true,message:'Scope saved. Review the risk list and confirm the coverage.'};
}
export function confirmScope(s,data={}){
 if(!editable(s))return {ok:false,message:'Only the assessment owner can confirm scope in a draft.'};
 const scope=scopeRecord(s),risks=Object.values(s.risks||{}).filter(r=>!r.removed);
 if(s.scopeDraft)return {ok:false,message:'Save or cancel scope edits before confirming.'};
 if(!scope||keys.some(key=>!String(scope[key]||'').trim())||!risks.length)return {ok:false,message:'Complete the scope and include at least one risk before confirming.'};
 if(!s.scope){s.scope=true;record(s,data.owner||'Alex Morgan','Confirmed assessment scope.',`${scope.process} · ${scope.period} · ${risks.length} included risks. Assigned owner: ${scope.owner}.`);}
 return {ok:true,message:'Scope confirmed.'};
}
export function excludeScopeRisk(s,data,id,reason){
 const risk=s.risks?.[id];
 if(!editable(s)||!risk||risk.removed||!String(reason||'').trim())return {ok:false,message:'Enter a reason before excluding a risk from this assessment.'};
 if(Object.values(s.risks).filter(r=>!r.removed).length<2)return {ok:false,message:'Keep at least one risk in this assessment.'};
 risk.removed=true;risk.scopeExclusion={reason:String(reason).trim(),actor:data.owner||'Alex Morgan',date:s.asOf};s.scope=false;s.reportConfirmed='';
 if(s.selectedRisk===id)s.selectedRisk=Object.values(s.risks).find(r=>!r.removed)?.id;
 record(s,data.owner||'Alex Morgan',`Excluded ${risk.name} from the current assessment.`,risk.scopeExclusion.reason);
 return {ok:true,message:'Risk excluded from this assessment. Its record and earlier versions are retained.'};
}
export function restoreScopeRisk(s,data,id){
 const risk=s.risks?.[id];if(!editable(s)||!risk?.removed||!risk.scopeExclusion)return {ok:false,message:'This risk cannot be restored here.'};
 risk.removed=false;delete risk.scopeExclusion;invalidateRisk(s,id,{inherent:true,controls:true});s.scope=false;
 record(s,data.owner||'Alex Morgan',`Included ${risk.name} in this assessment again.`,'Scores and wording retained; fresh confirmations required.');
 return {ok:true,message:'Risk restored. Review its assessment before confirming.'};
}
