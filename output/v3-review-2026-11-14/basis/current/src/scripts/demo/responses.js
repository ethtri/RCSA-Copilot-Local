import {score,actionComplete,record} from './model.js?v=20261114.6';
export const RESPONSE_OPTIONS=[['mitigate','Strengthen controls','Improve protection and close the evidence gap.'],['accept','Request acceptance','Escalate the current exposure for a separate decision.'],['avoid','Change or stop activity','Remove the exposure through a process change.'],['transfer','Share the exposure','Arrange risk transfer and assess what remains.']];
export const actionFor=(s,id)=>id==='unauthorized'?s.action:s.risks[id].responseAction;
export const responseComplete=(s,id)=>{
  const r=s.risks[id],v=r.riskResponse;
  return score(r.residual)<=9&&!v?.needsReview||!!(v?.created&&!v.needsReview&&v.rationale.trim()&&v.owner.trim()&&RESPONSE_OPTIONS.some(x=>x[0]===v.strategy)&&(v.strategy==='accept'?/^\d{4}-\d{2}-\d{2}$/.test(v.reviewDate)&&v.reviewDate>='2026-11-14':actionComplete({action:actionFor(s,id)})));
};
export function saveRiskResponse(s){
  if(s.role!=='first'||s.submitted)return false;
  const r=s.risks[s.selectedRisk],v=r.riskResponse;
  if(!v.strategy||!v.rationale.trim()||!v.owner.trim()||!RESPONSE_OPTIONS.some(x=>x[0]===v.strategy))return false;
  if(v.strategy!=='accept'&&(!v.protection?.trim()||!v.protectionOwner?.trim()||!/^\d{4}-\d{2}-\d{2}$/.test(v.protectionDue)||v.protectionDue<'2026-11-14'))return false;
  if(v.strategy==='accept'?!(v.reviewDate>='2026-11-14'):!actionComplete({action:actionFor(s,r.id)}))return false;
  v.created=true;v.needsReview=false;s.reportConfirmed='';record(s,'Alex Morgan',`Created risk response for ${r.name}: ${RESPONSE_OPTIONS.find(x=>x[0]===v.strategy)[1]}.`,v.rationale);return true;
}
