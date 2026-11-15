import {record} from './model.js?v=20261114.6';

export const controlsLibrary=(data,s)=>[...data.controls,...(s.customControls||[])];
export const sharedPair=s=>['callback','approval'].every(id=>s.risks.unauthorized.controls.includes(id));
const coverageConclusions=['unassessed','covers','limited','none'];
// Library evidence belongs to a control. Applicability belongs to its relationship with a risk.
export function mappingApplicability(data,s,riskId,controlId){
  const stored=s.risks[riskId]?.mappingApplicability?.[controlId];
  if(stored&&[...coverageConclusions,'prepared'].includes(stored.conclusion))return stored;
  const original=data.risks.find(r=>r.id===riskId)?.controls.includes(controlId);
  return {conclusion:original?'prepared':'unassessed'};
}
export function mappingNeedsReview(data,s,riskId=s.selectedRisk){
  return (s.risks[riskId]?.controls||[]).some(id=>mappingApplicability(data,s,riskId,id).conclusion==='unassessed');
}
export function invalidateMapping(s,riskId,text){
  const r=s.risks[riskId];r.controlsConfirmed=false;r.residualConfirmed=false;r.noControlsConfirmed=false;
  if(r.riskResponse?.created)r.riskResponse.needsReview=true;
  s.reportConfirmed='';s.handoff='';
  if(riskId==='unauthorized'){s.dependency='';s.qualification='';}
  record(s,'Alex Morgan',text,'Control and residual conclusions require renewed confirmation. Prior decisions remain in history.');
}
export function saveMapping(data,s,{mode='add',oldId='',controlId='',rationale='',control,applicability}){
  if(s.role!=='first'||s.submitted||!rationale.trim())return false;
  const r=s.risks[s.selectedRisk];let newControl;
  if(!['add','edit','replace'].includes(mode)||mode==='replace'&&!r.controls.includes(oldId)||mode==='edit'&&(!r.controls.includes(controlId)||control))return false;
  if(applicability!==undefined&&!coverageConclusions.includes(applicability)&&!(mode==='edit'&&applicability==='prepared'&&mappingApplicability(data,s,r.id,controlId).conclusion==='prepared'))return false;
  if(control){
    if(!['name','owner','purpose','design'].every(k=>control[k]?.trim()))return false;
    controlId='proposed-'+((s.customControls||[]).length+1);
    newControl={...control,id:controlId,status:'Proposed',operation:'Not implemented or tested',designConclusion:'Proposed design · requires owner review',evidence:'No operating evidence recorded.',source:control.basis||null,test:null};
  }
  if(!newControl&&!controlsLibrary(data,s).some(c=>c.id===controlId))return false;
  if(mode==='replace'){
    if(!r.controls.includes(oldId)||r.controls.some(id=>id===controlId&&id!==oldId))return false;
    r.controls=r.controls.map(id=>id===oldId?controlId:id);delete r.mappingRationale?.[oldId];delete r.mappingApplicability?.[oldId];
  }else if(mode==='edit'){
    if(!r.controls.includes(controlId))return false;
  }else {if(r.controls.includes(controlId))return false;r.controls.push(controlId);}
  if(newControl){s.customControls??=[];s.customControls.push(newControl);}
  r.mappingRationale??={};r.mappingApplicability??={};
  if(mode!=='edit')r.mappingApplicability[controlId]={conclusion:applicability||'unassessed'};
  else if(applicability!==undefined)r.mappingApplicability[controlId]={conclusion:applicability};
  r.mappingRationale[controlId]=rationale.trim();s.selectedControl=controlId;
  invalidateMapping(s,r.id,`${mode==='replace'?'Replaced':mode==='edit'?'Updated':'Added'} a control mapping for ${r.name}.`);return true;
}
export function removeMapping(s,id){
  if(s.role!=='first'||s.submitted)return false;
  const r=s.risks[s.selectedRisk];if(!r.controls.includes(id))return false;
  r.controls=r.controls.filter(c=>c!==id);delete r.mappingRationale?.[id];delete r.mappingApplicability?.[id];
  invalidateMapping(s,r.id,`Removed control mapping ${id} from ${r.name}; the control remains in the library.`);return true;
}
