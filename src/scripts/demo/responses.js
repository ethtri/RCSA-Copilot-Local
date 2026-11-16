import {prepareManagementRequest} from './operations.js?v=20261116.3';
import {thresholdFor,policyFor,reviewerFor} from './bank-policy.js?v=20261116.3';
import {score,validRating,actionComplete,record} from './model.js?v=20261116.3';
export const RESPONSE_OPTIONS=[['mitigate','Strengthen controls','Improve protection and close the evidence gap.'],['accept','Ask management to accept the risk','Request a time-limited decision with monitoring.'],['avoid','Change or stop activity','Remove exposure through a process change.'],['transfer','Transfer part of the risk','Assess the arrangement and the risk retained.']];
export const actionFor=(s,id)=>id==='unauthorized'?s.action:s.risks[id]?.responseAction;
const dateValid=(value,s)=>/^\d{4}-\d{2}-\d{2}$/.test(value||'')&&!Number.isNaN(Date.parse(value+'T12:00:00Z'))&&new Date(value+'T12:00:00Z').toISOString().slice(0,10)===value&&value>=(s.asOf||'2026-11-14');
export function responseErrors(s,id=s.selectedRisk){
 const r=s.risks?.[id],v=r?.riskResponse,errors=[];
 if(!v)return [{field:'riskResponse.strategy',message:'Choose a response for this risk.'}];
 const require=(key,message)=>{if(!String(v[key]||'').trim())errors.push({field:'riskResponse.'+key,message});};
 if(!RESPONSE_OPTIONS.some(x=>x[0]===v.strategy))errors.push({field:'riskResponse.strategy',message:'Choose a response approach.'});
 require('rationale','Explain why this approach fits the risk.');require('owner','Enter the response owner.');
 if(v.strategy==='accept'){
  if(!dateValid(v.reviewDate,s))errors.push({field:'riskResponse.reviewDate',message:'Choose a valid review date on or after the demo date.'});
  require('conditions','State the proposed limits or conditions.');require('monitoring','Explain how the exposure will be monitored.');require('decisionOwner','Name the person or forum asked to decide.');
 }else if(v.strategy){
  require('protection',v.strategy==='avoid'?'Describe the activity change.':v.strategy==='transfer'?'Describe the proposed transfer arrangement.':'Describe the change to make.');require('protectionOwner','Enter the owner of the change.');
  if(!dateValid(v.protectionDue,s))errors.push({field:'riskResponse.protectionDue',message:'Choose a valid change date on or after the demo date.'});
  const action=actionFor(s,id);if(!actionComplete({action,asOf:s.asOf}))errors.push({field:'responseAction.title',message:'Complete the action, owner, due date and evidence needed.'});
  if(v.strategy==='avoid')require('customerImpact','Describe the customer and process effects.');
  if(v.strategy==='transfer'){require('retainedExposure','Explain which risk the bank will retain.');require('counterpartyEvidence','State what evidence is needed from the counterparty.');}
 }
 return errors;
}
export function responseComplete(s,id){const r=s.risks?.[id],v=r?.riskResponse;if(!r||!validRating(r.residual))return false;return score(r.residual)<=thresholdFor(s)&&!v?.needsReview||!!(v?.created&&!v.needsReview&&responseErrors(s,id).length===0);}
export function setResponseStrategy(s,id,strategy){
 if(s.role!=='first'||s.submitted||!s.risks?.[id]||!RESPONSE_OPTIONS.some(x=>x[0]===strategy))return false;
 const r=s.risks[id],v=r.riskResponse,previous=v.strategy;if(previous===strategy)return true;
 if(v.created){r.responseHistory??=[];r.responseHistory.push({...structuredClone(v),replacedAt:s.asOf});}
 v.strategy=strategy;v.created=false;v.needsReview=true;r.residualConfirmed=false;s.reportConfirmed='';
 if(s.controlAssistance?.plans?.[id]&&strategy!=='mitigate')s.controlAssistance.plans[id].needsReview=true;
 for(const record of [s.operations?.actions?.[id],s.operations?.decisions?.[id]])if(record)record.needsReview=true;
 record(s,'Alex Morgan',`Changed response approach for ${r.name}.`,`${previous||'No approach'} → ${strategy}. Existing linked work is retained for review.`);return true;
}
export function saveRiskResponse(s){
 if(s.role!=='first'||s.submitted||responseErrors(s).length)return false;
 const r=s.risks[s.selectedRisk],v=r.riskResponse;v.created=true;v.needsReview=false;v.recordedStrategy=v.strategy;prepareManagementRequest(s,r.id);s.reportConfirmed='';record(s,'Alex Morgan',`Recorded risk response for ${r.name}: ${RESPONSE_OPTIONS.find(x=>x[0]===v.strategy)[1]}.`,v.rationale);return true;
}
