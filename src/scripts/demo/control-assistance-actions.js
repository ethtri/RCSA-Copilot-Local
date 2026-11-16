import {ensureAssistance,recommendationSet,coverageAnalysis,preparePlan,controlSetSignature,recordAssistanceDecision,checkControlClaim} from './control-assistance.js?v=20261116.3';
import {recommendationDialog,dismissalDialog,planDialog,claimCheckDialog} from './control-assistance-view.js?v=20261116.3';
import {controlsLibrary,saveMapping,invalidateMapping} from './mappings.js?v=20261116.3';
import {record} from './model.js?v=20261116.3';
import {actionFor} from './responses.js?v=20261116.3';

const editable=s=>s.role==='first'&&!s.submitted;
const designFields=['name','owner','purpose','design','frequency','population','informationSource','exceptions','evidenceRetained','validation'];
const trim=value=>String(value??'').trim();
const candidateFor=(data,s,id)=>recommendationSet(data,s).find(c=>c.id===id);
const mappedCandidate=(data,s,c)=>controlsLibrary(data,s).find(control=>s.risks[s.selectedRisk].controls.includes(control.id)&&(c.kind==='existing'?control.id===c.existingControlId:control.assistance?.candidateId===c.id&&control.assistance.riskId===s.selectedRisk));
const boundSignature=(s,c)=>JSON.stringify([c,s.risks[s.selectedRisk].mappingRationale?.[c.id],s.risks[s.selectedRisk].mappingApplicability?.[c.id]]);
export function reviewControlRecommendation(data,s,candidateId){
  const candidate=candidateFor(data,s,candidateId);if(!candidate)return null;
  const ca=ensureAssistance(s),id=s.selectedRisk,key=id+':'+candidate.id,control=mappedCandidate(data,s,candidate);
  ca.drafts??={};if(ca.draft?.candidateId&&ca.draft?.riskId)ca.drafts[ca.draft.riskId+':'+ca.draft.candidateId]=structuredClone(ca.draft);
  const saved=ca.drafts[key],signature=control?boundSignature(s,control):'';
  if(editable(s)&&saved&&saved.boundControlId===(control?.id||null)&&saved.baseControlSignature===signature)ca.draft=structuredClone(saved);
  else ca.draft={...structuredClone(candidate.designDraft||{}),...(control&&candidate.kind!=='existing'?Object.fromEntries(designFields.map(field=>[field,control[field]||''])):{}),candidateId:candidate.id,riskId:id,rationale:control?s.risks[id].mappingRationale?.[control.id]||candidate.addresses:candidate.addresses||candidate.summary,applicability:control?s.risks[id].mappingApplicability?.[control.id]?.conclusion||'unassessed':'unassessed',boundControlId:control?.id||null,baseControlSignature:signature};
  return ca.draft;
}
export function validPlanDate(value){return /^\d{4}-\d{2}-\d{2}$/.test(value)&&!Number.isNaN(Date.parse(value+'T12:00:00Z'))&&new Date(value+'T12:00:00Z').toISOString().slice(0,10)===value&&value>='2026-11-14';}
export function parsePlanTasks(text,{validation=false}={}){
  const lines=trim(text).split('\n').map(line=>line.trim()).filter(Boolean);
  if(!lines.length)return null;
  const tasks=lines.map(line=>{const [title,owner,due,evidence,...extra]=line.split('|').map(trim);return {title,owner,due,evidence:evidence||'',extra};});
  if(tasks.some(t=>!t.title||!t.owner||!validPlanDate(t.due)||t.extra.length||validation&&!t.evidence))return null;
  return tasks.map(({extra,...task})=>task);
}
function validTasks(tasks,{validation=false}={}){
  if(!Array.isArray(tasks)||!tasks.length)return null;
  const result=tasks.map(t=>({title:trim(t.title),owner:trim(t.owner),due:trim(t.due),evidence:trim(t.evidence)}));
  return result.some(t=>!t.title||!t.owner||!validPlanDate(t.due)||validation&&!t.evidence)?null:result;
}
export function syncAssistancePlanField(s,key,value){
  const id=s.selectedRisk,ca=s.controlAssistance,linked=ca?.plans?.[id];if(!linked)return;
  const planKey=key.startsWith('riskResponse.')?({protection:'protection',protectionOwner:'protectionOwner',protectionDue:'protectionDue',owner:'owner',rationale:'rationale'})[key.slice(13)]:key.startsWith('responseAction.')?key.slice(15):key.startsWith('action.')&&id==='unauthorized'?key.slice(7):null;
  if(!['title','owner','due','evidence','protection','protectionOwner','protectionDue','rationale'].includes(planKey))return;
  linked[planKey]=value;linked.ownerEdited=true;
  if(ca.planDraft?.riskId===id&&ca.planDraft.candidateId===linked.candidateId){ca.planDraft[planKey]=value;ca.planDraft.ownerEdited=true;}
}
export function detachAssistancePlan(s,riskId=s.selectedRisk){
  const ca=s.controlAssistance,plan=ca?.plans?.[riskId];if(!editable(s)||!plan)return false;
  ca.archivedPlans??=[];ca.archivedPlans.push({...structuredClone(plan),detached:true,status:'Earlier plan',detachedAgainstVersion:s.versionNumber||0});
  delete ca.plans[riskId];if(ca.planDraft?.riskId===riskId)ca.planDraft=null;
  s.reportConfirmed='';record(s,'Alex Morgan',`Detached the earlier AI plan for ${s.risks[riskId].name}.`,'The plan and tasks are retained in history. The owner must review and record the current risk response separately.');return true;
}

/** Explicit owner incorporation; proposed designs never mutate the library baseline. */
export function useControlRecommendation(data,s,draft){
  if(!editable(s)||draft.riskId!==s.selectedRisk)return {ok:false,message:'Only the assessment owner can add a recommendation to this risk draft.'};
  const candidate=candidateFor(data,s,draft.candidateId);if(!candidate)return {ok:false,message:'No suggestion is available for this selection. Return to the current recommendations.'};
  const ca=ensureAssistance(s),r=s.risks[s.selectedRisk],already=mappedCandidate(data,s,candidate);
  if(!trim(draft.rationale))return {ok:false,message:'Explain how this control addresses the risk and where its coverage is limited.'};
  if(candidate.kind!=='existing'&&designFields.some(key=>!trim(draft[key])))return {ok:false,message:'Complete the control details, owner and testing approach before adding the design.'};
  const control=candidate.kind==='existing'?undefined:Object.fromEntries(designFields.map(key=>[key,trim(draft[key])]));
  if(control)Object.assign(control,{basis:candidate.sourceIds[0]||null,enhancementOf:candidate.kind==='enhance'?candidate.existingControlId:null,assistance:{candidateId:candidate.id,riskId:r.id,kind:candidate.kind,objective:ca.objectiveByRisk[r.id]||'core',sourceIds:[...candidate.sourceIds]}});
  let ok;
  if(control&&already){
    if(already.status!=='Proposed'||!['unassessed','covers','limited','none'].includes(draft.applicability))return {ok:false,message:'Only proposed designs can be edited here. Review existing controls in the current mappings.'};
    const unchanged=designFields.every(key=>trim(already[key])===control[key])&&r.mappingRationale?.[already.id]===trim(draft.rationale)&&r.mappingApplicability?.[already.id]?.conclusion===(draft.applicability||'unassessed');
    if(unchanged)return {ok:false,message:'This design is already mapped. Make a change before saving.'};
    Object.assign(already,control);r.mappingRationale[already.id]=trim(draft.rationale);r.mappingApplicability[already.id]={conclusion:draft.applicability};s.selectedControl=already.id;invalidateMapping(s,r.id,`Revised the proposed control design for ${r.name}.`);ok=true;
  }else ok=saveMapping(data,s,{mode:already?'edit':'add',controlId:already?.id||candidate.existingControlId||'',rationale:trim(draft.rationale),applicability:draft.applicability||'unassessed',control});
  if(!ok)return {ok:false,message:'The control could not be mapped. Check its details and coverage assessment, then try again.'};
  const controlId=s.selectedControl;
  const mapped=controlsLibrary(data,s).find(control=>control.id===controlId);ca.draft={...structuredClone(draft),boundControlId:controlId,baseControlSignature:boundSignature(s,mapped)};
  recordAssistanceDecision(s,{riskId:r.id,candidateId:candidate.id,kind:candidate.kind,disposition:'used',rationale:trim(draft.rationale),controlId,objective:ca.objectiveByRisk[r.id]||'core',sourceIds:candidate.sourceIds,controlSetSignature:controlSetSignature(data,s,r.id)});
  ca.openByRisk??={};ca.tabByRisk??={};ca.openByRisk[r.id]=true;ca.tabByRisk[r.id]='coverage';
  s.reportConfirmed='';return {ok:true,controlId,message:candidate.kind==='existing'?'Control mapped. Review the remaining coverage.':'Proposed control added. It still needs implementation and testing.'};
}

/** Fills a reviewable response draft; creating a risk response remains a separate action. */
export function applyAssistancePlan(data,s,draft){
  if(!editable(s)||draft?.riskId!==s.selectedRisk)return {ok:false,message:'Only the assessment owner can add a plan to this risk draft.'};
  const candidate=candidateFor(data,s,draft.candidateId);if(!candidate)return {ok:false,message:'Choose a current control suggestion and generate a new plan.'};
  if(!mappedCandidate(data,s,candidate))return {ok:false,message:'Map this control or proposed design before adding its plan to the response.'};
  if(draft.controlSetSignature!==controlSetSignature(data,s,s.selectedRisk))return {ok:false,message:'The control assessment changed. Generate an updated plan. Your earlier draft is saved.'};
  if(['title','owner','evidence','protection','protectionOwner'].some(key=>!trim(draft[key]))||!validPlanDate(draft.due)||!validPlanDate(draft.protectionDue))return {ok:false,message:'Add the plan details, control improvement, owners and evidence needed to close the action. Due dates must be November 14, 2026 or later.'};
  const implementationTasks=draft.implementationText!==undefined?parsePlanTasks(draft.implementationText):validTasks(draft.implementationTasks);
  const validationTasks=draft.validationText!==undefined?parsePlanTasks(draft.validationText,{validation:true}):validTasks(draft.validationTasks,{validation:true});
  if(!implementationTasks||!validationTasks)return {ok:false,message:'For each task, add the work, owner and a date of November 14, 2026 or later. Testing tasks also need the evidence they will produce.'};
  const r=s.risks[s.selectedRisk],ca=ensureAssistance(s);
  const plan={...structuredClone(draft),implementationTasks,validationTasks,needsReview:false,status:'Draft in response',applied:true};
  ca.plans[r.id]=plan;ca.planDraft=structuredClone(plan);
  Object.assign(r.riskResponse,{strategy:'mitigate',rationale:trim(draft.rationale)||candidate.conclusion||candidate.summary,owner:trim(draft.owner),protection:trim(draft.protection),protectionOwner:trim(draft.protectionOwner),protectionDue:draft.protectionDue,protectionStatus:'proposed',needsReview:true});
  Object.assign(actionFor(s,r.id),{title:trim(draft.title),owner:trim(draft.owner),due:draft.due,evidence:trim(draft.evidence)});
  r.residualConfirmed=false;s.reportConfirmed='';s.handoff='';
  record(s,'Alex Morgan',`Used the implementation and validation plan for ${r.name}.`,`${implementationTasks.length} implementation tasks; ${validationTasks.length} validation tasks. Response draft requires owner review and recording.`);
  return {ok:true,message:'Plan added to the response draft. Review and record your risk response.'};
}

export function markAssistancePlanForReview(s,riskId){
  const ca=s.controlAssistance;if(!ca)return;
  if(ca.plans?.[riskId])ca.plans[riskId].needsReview=true;
  if(ca.planDraft?.riskId===riskId)ca.planDraft.needsReview=true;
}

export function handleControlAssistanceAction(ctx){
  const {data,state:s,el,showDialog,closeDialog,notify,save,render,navigate}=ctx,action=el.dataset.action;
  if(!action?.startsWith('ca-'))return false;
  if(['ca-edit-plan','ca-detach-plan','ca-generate-plan'].includes(action)&&el.dataset.risk&&s.risks[el.dataset.risk])s.selectedRisk=el.dataset.risk;
  const ca=ensureAssistance(s),id=s.selectedRisk;
  ca.openByRisk??={};ca.tabByRisk??={};ca.selectedByRisk??={};
  const persist=()=>{save();render();};
  if(action==='ca-open'){ca.openByRisk[id]=true;ca.tabByRisk[id]='recommendations';persist();return true;}
  if(action==='ca-tab'){ca.openByRisk[id]=true;ca.tabByRisk[id]=['recommendations','coverage','plan'].includes(el.dataset.tab)?el.dataset.tab:'recommendations';persist();return true;}
  if(action==='ca-select'){ca.selectedByRisk[id]=el.dataset.candidate;persist();return true;}
  if(action==='ca-detach-plan'){if(!detachAssistancePlan(s,id)){notify('Only the assessment owner can unlink a plan in a draft.');return true;}save();render();notify('Earlier plan saved in history. Review and record the current response.');return true;}
  if(action==='ca-add-task'||action==='ca-remove-task'){
    if(!editable(s)||ca.planDraft?.riskId!==id)return true;
    const kind=el.dataset.kind;if(!['implementation','validation'].includes(kind))return true;
    const field=kind+'Tasks';ca.planDraft[field]??=[];let focusIndex;
    if(action==='ca-add-task'){ca.planDraft[field].push({title:'',owner:ca.planDraft.owner||'',due:ca.planDraft.due||'',evidence:''});focusIndex=ca.planDraft[field].length-1;}
    else {const index=Number(el.dataset.index);if(Number.isInteger(index)&&index>=0&&index<ca.planDraft[field].length){ca.planDraft[field].splice(index,1);focusIndex=Math.min(index,ca.planDraft[field].length-1);}}
    delete ca.planDraft[kind+'Text'];ca.planDraft.ownerEdited=true;save();showDialog(planDialog(data,s));
    const focusTarget=focusIndex>=0?document.getElementById(`ca-plan-${kind}-${focusIndex}-title`):document.querySelector(`[data-action="ca-add-task"][data-kind="${kind}"]`);
    focusTarget?.focus({preventScroll:true});focusTarget?.scrollIntoView({block:'nearest',behavior:'instant'});return true;
  }
  if(action==='ca-review'){
    const c=candidateFor(data,s,el.dataset.candidate);if(!c){notify('No suggestion is available. Return to the current recommendations.');return true;}
    ca.selectedByRisk[id]=c.id;
    reviewControlRecommendation(data,s,c.id);
    save();showDialog(recommendationDialog(data,s,c.id));return true;
  }
  if(action==='ca-dismiss'){
    if(!editable(s)){notify('The assessment owner can accept or dismiss suggestions in a draft.');return true;}
    showDialog(dismissalDialog(data,s,el.dataset.candidate));return true;
  }
  if(action==='ca-record-dismiss'){
    const c=candidateFor(data,s,el.dataset.candidate),rationale=document.getElementById('ca-dismiss-reason')?.value||'';
    if(!c||!recordAssistanceDecision(s,{riskId:id,candidateId:c.id,kind:c.kind,disposition:'dismissed',rationale,sourceIds:c?.sourceIds,controlSetSignature:controlSetSignature(data,s,id)})){notify('Add your reason before recording this decision.');return true;}
    s.reportConfirmed='';save();closeDialog();render();notify('Suggestion dismissed. Your reason is saved.');return true;
  }
  if(action==='ca-use'){
    const result=useControlRecommendation(data,s,ca.draft||{});if(!result.ok){notify(result.message);return true;}
    save();closeDialog();render();notify(result.message);return true;
  }
  if(action==='ca-generate-plan'){
    const existing=ca.planDraft?.riskId===id?ca.planDraft:null;
    // An edited draft is retained until an explicit regeneration action.
    if(existing?.ownerEdited&&el.dataset.regenerate!=='true'){showDialog(planDialog(data,s));return true;}
    const selectedCandidate=el.dataset.candidate||ca.selectedByRisk[id]||recommendationSet(data,s).find(candidate=>candidate.kind==='new')?.id;
    const draft=preparePlan(data,s,id,selectedCandidate);
    if(!draft){notify('Choose a current control suggestion before generating a plan.');return true;}
    const c=candidateFor(data,s,draft.candidateId);draft.protectionOwner??=draft.owner;draft.protectionDue??=draft.due;draft.rationale??=c?.summary||'';
    ca.planDraft=draft;ca.openByRisk[id]=true;ca.tabByRisk[id]='plan';save();render();showDialog(planDialog(data,s));return true;
  }
  if(action==='ca-edit-plan'){
    if(ca.planDraft?.riskId!==id){const p=ca.plans[id];if(p)ca.planDraft=structuredClone(p);else{notify('Generate a plan from a control recommendation first.');return true;}}
    for(const kind of ['implementation','validation'])if(ca.planDraft[kind+'Text']!==undefined){const tasks=parsePlanTasks(ca.planDraft[kind+'Text'],{validation:kind==='validation'});if(tasks){ca.planDraft[kind+'Tasks']=tasks;delete ca.planDraft[kind+'Text'];}}
    save();showDialog(planDialog(data,s));return true;
  }
  if(action==='ca-apply-plan'){
    const result=applyAssistancePlan(data,s,ca.planDraft);if(!result.ok){notify(result.message);return true;}
    save();closeDialog();navigate('assessment/response');notify(result.message);return true;
  }
  if(action==='ca-use-conclusion'){
    if(!editable(s)){notify('Only the owner can change a draft conclusion.');return true;}
    const text=el.dataset.conclusion==='claim'?ca.claimResult?.suggestedText:coverageAnalysis(data,s,id).conclusion;
    if(!text){notify('No conclusion draft is available. Review the sources and write your conclusion.');return true;}
    const r=s.risks[id];r.controlConclusion={text};r.controlsConfirmed=false;r.residualConfirmed=false;if(r.riskResponse.created)r.riskResponse.needsReview=true;
    markAssistancePlanForReview(s,id);s.reportConfirmed='';s.handoff='';record(s,'Alex Morgan',`Used a source-backed control conclusion draft for ${r.name}.`,text);save();if(document.getElementById('detail-dialog')?.open)closeDialog();render();notify('Conclusion draft added. Review it before confirming controls.');return true;
  }
  if(action==='ca-check-claim'){
    ca.claimResult=checkControlClaim(data,s,s.risks[id].controlConclusion?.text||'',id);save();showDialog(claimCheckDialog(data,s,ca.claimResult));return true;
  }
  return true;
}
