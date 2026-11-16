import {thresholdFor,policyFor,reviewerFor} from './bank-policy.js?v=20261116.1';
import {esc,button,field,formatDate,statusBadge,emptyState,icon} from './ui.js?v=20261116.1';

export const OPERATION_ROLES={first:'Alex Morgan',second:'Jordan Lee',assurance:'Avery Patel',management:'Casey Bennett',admin:'Morgan Chen'};
export const demoAsOf=s=>/^\d{4}-\d{2}-\d{2}$/.test(s.demoAsOf||s.asOf||'')?(s.demoAsOf||s.asOf):'2026-11-14';
const clone=value=>structuredClone(value);
const score=value=>value?Number(value.likelihood)*Number(value.impact):null;
const actor=s=>s.role==='second'?reviewerFor(s):OPERATION_ROLES[s.role]||'Read-only visitor';
const stamp=s=>demoAsOf(s);
const riskAction=(s,r)=>r.id==='unauthorized'?s.action:r.responseAction;
const bump=(s,record,event,detail='')=>{record.version++;record.events.push({version:record.version,at:stamp(s),actor:actor(s),event,detail});s.reportConfirmed='';};
const hasText=value=>!!String(value||'').trim();
const dateValid=value=>/^\d{4}-\d{2}-\d{2}$/.test(value||'')&&!Number.isNaN(Date.parse(value+'T00:00:00Z'))&&new Date(value+'T00:00:00Z').toISOString().slice(0,10)===value;
const validationError=(field,message)=>({field,message});

export function ensureOperations(s){
 const ops=s.operations??={actions:{},decisions:{},drafts:{}};
 ops.actions??={};ops.decisions??={};ops.drafts??={};ops.evidenceRequests??={};
 for(const r of Object.values(s.risks||{})){
  if(r.removed)continue;
  const response=r.riskResponse||{},plan=riskAction(s,r)||{};
  if(response.created&&response.strategy!=='accept'&&!ops.actions[r.id])ops.actions[r.id]={id:`ACT-${r.id}`,riskId:r.id,assessmentVersion:s.versionNumber||'draft',version:1,title:plan.title||`Complete the plan for ${r.name}`,owner:plan.owner||response.owner||'',executor:OPERATION_ROLES.first,due:plan.due||'',status:'planned',progress:'',requiredEvidence:plan.evidence||'',receivedEvidence:[],implementationTasks:clone(s.controlAssistance?.plans?.[r.id]?.implementationTasks||[]),testingTasks:clone(s.controlAssistance?.plans?.[r.id]?.validationTasks||[]),events:[{version:1,at:stamp(s),actor:'Assessment record',event:'Action plan recorded',detail:'Execution and closure are separate from assessment review.'}]};
  const confirmed=r.residualConfirmed?r.residual:r.lastConfirmedResidual;

 }
 return ops;
}

export function prepareManagementRequest(s,riskId=s.selectedRisk){
 const r=s.risks?.[riskId],response=r?.riskResponse;
 if(s.role!=='first'||s.submitted||!r||!response?.created||!(score(r.residual)>thresholdFor(s)||response.strategy==='accept'))return false;
 const ops=ensureOperations(s);
 if(!ops.decisions[r.id])ops.decisions[r.id]={id:`DEC-${r.id}`,riskId:r.id,assessmentVersion:s.versionNumber||'draft',version:1,kind:response.strategy==='accept'?'acceptance':'continue',status:'draft',owner:response.decisionOwner||OPERATION_ROLES.management,forum:'Payments Risk Committee',targetDate:'2026-11-19',reviewDate:response.reviewDate||'2026-11-28',conditions:response.conditions||'',reason:response.rationale||'',question:response.strategy==='accept'?`May the bank accept ${r.name.toLowerCase()} until the review date?`:`May the activity continue while the plan for ${r.name.toLowerCase()} is completed?`,events:[{version:1,at:stamp(s),actor:'Assessment record',event:'Decision request prepared',detail:'The assessment owner must submit this request. It is not an approval.'}]};
 return !!ops.decisions[r.id];
}

export function actionIsActive(s,record){const risk=s.risks?.[record.riskId],response=risk?.riskResponse;return !risk?.removed&&!risk?.deleted&&!record.superseded&&!!response?.created&&response.strategy!=='accept';}
export function decisionStatus(s,record){return record.status==='approved'&&dateValid(record.reviewDate)&&record.reviewDate<demoAsOf(s)?'expired':record.status;}
export function operationalProjection(s){
 const ops=ensureOperations(s);
 return {asOf:demoAsOf(s),actions:[...Object.values(ops.actions),...(ops.archivedActions||[])].map(a=>({...clone(a),active:actionIsActive(s,a)})),decisions:[...Object.values(ops.decisions),...(ops.archivedDecisions||[])].map(d=>({...clone(d),active:!!s.risks[d.riskId]&&!d.superseded&&!s.risks[d.riskId]?.removed&&!s.risks[d.riskId]?.deleted,status:decisionStatus(s,d)})),evidenceRequests:clone(Object.values(ops.evidenceRequests))};
}
export function operationsSummary(s){
 const records=operationalProjection(s);
 return {...records,openActions:records.actions.filter(a=>a.active&&a.status!=='closed').length,pendingDecisions:records.decisions.filter(d=>d.active&&['draft','submitted','returned'].includes(d.status)).length};
}
const input=(s,key,label,value,{area=false,type='text',readOnly=false}={})=>`<label class="field"><span>${esc(label)}</span>${area?`<textarea rows="3" data-ops-field="${esc(key)}" aria-label="${esc(label)}" ${readOnly?'readonly':''}>${esc(value)}</textarea>`:`<input type="${type}" data-ops-field="${esc(key)}" aria-label="${esc(label)}" value="${esc(value)}" ${readOnly?'readonly':''}>`}</label>`;
const eventsView=record=>`<details class="disclosure"><summary>History · ${record.events.length} events</summary><ol class="decision-history">${record.events.map(e=>`<li><strong>${esc(e.event)}</strong><p>${esc(e.detail)}</p><span>${esc(e.actor)} · ${esc(e.at)} · record version ${e.version}</span></li>`).join('')}</ol></details>`;
const taskView=tasks=>tasks.length?`<ul>${tasks.map(t=>`<li>${esc(typeof t==='string'?t:t.title)}${t.owner?` · ${esc(t.owner)}`:''}${t.due?` · ${esc(t.due)}`:''}</li>`).join('')}</ul>`:'<p class="small muted">No separate tasks recorded. Use the linked action requirements.</p>';
const labels={planned:'Planned','in-progress':'In progress','evidence-submitted':'Evidence submitted',returned:'Returned',closed:'Closed',draft:'Draft',submitted:'Awaiting decision',approved:'Approved',declined:'Declined',expired:'Expired'};
// Record progress is derived from recorded events. It never estimates task completion.
export function recordProgressModel(s,record,kind='action'){
 const events=record.events||[],last=name=>[...events].reverse().find(e=>name.test(e.event||''));
 const status=kind==='decision'?decisionStatus(s,record):record.status;
 const entry=(label,event,state='pending',detail='')=>({label,state,date:event?.at||'',detail});
 if(kind==='decision'){
  const prepared=events.find(e=>/Decision request prepared|Request draft saved/.test(e.event||'')),submitted=last(/^Request submitted$/),decision=record.outcome?last(/^(Approved|Declined|Returned) request$/):null;
  const outcome=record.outcome,terminal=['approved','declined','expired'].includes(status);
  const steps=[entry('Request prepared',prepared,'done'),entry('Submitted',submitted,submitted?'done':status==='draft'?'current':'pending'),entry('Management decision',decision,status==='returned'?'returned':terminal?'done':status==='submitted'?'current':'pending',status==='returned'?'Changes requested':terminal?(status==='expired'?'Approval recorded':labels[status]):''),{label:'Review or expiry',state:status==='expired'?'expired':status==='approved'?'current':status==='declined'?'not-applicable':'pending',date:terminal&&status!=='declined'?record.reviewDate:'',detail:status==='expired'?'Approval expired':status==='approved'?'Approval remains conditional':status==='declined'?'No approval granted':''}];
  const next=status==='submitted'?{owner:record.owner||OPERATION_ROLES.management,role:'Management decision owner',text:'Review the request and record a decision.'}:['draft','returned','expired'].includes(status)?{owner:OPERATION_ROLES.first,role:'Assessment owner',text:status==='expired'?'Renew the request before relying on an approval.':status==='returned'?'Revise the request and submit it again.':'Complete the request and submit it for a decision.'}:status==='approved'?{owner:record.owner||OPERATION_ROLES.management,role:'Decision owner',text:'Keep the approval conditions under review until the expiry date.'}:{owner:'',role:'Decision recorded',text:'The declined request grants no permission to continue.'};
  return {kind,status,steps,next,outcome:outcome?{actor:outcome.actor,date:outcome.at}:null};
 }
 const prepared=events.find(e=>/Action plan recorded/.test(e.event||'')),submitted=last(/^Evidence submitted$/),review=record.closure?last(/^(Action closed|Evidence returned)$/):null,closed=status==='closed',returned=status==='returned';
 const steps=[entry('Plan recorded',prepared,'done'),entry('Evidence submitted',submitted,submitted?'done':!closed&&!returned?'current':'pending'),entry('Assurance review',review,returned?'returned':closed?'done':status==='evidence-submitted'?'current':'pending',returned?'Evidence needs more work':closed?'Closure supported':''),entry('Closed',closed?review:null,closed?'done':'pending')];
 const inactive=!actionIsActive(s,record);
 const next=inactive?{owner:'',role:'History retained',text:'This plan was superseded by a different response.'}:closed?{owner:'',role:'Action closed',text:'Closure is recorded. Reassess the risk separately if needed.'}:status==='evidence-submitted'?{owner:OPERATION_ROLES.assurance,role:'Control assurance',text:'Review the submitted evidence and close or return the action.'}:{owner:record.executor||record.owner||OPERATION_ROLES.first,role:'Person doing the work',text:returned?'Address the assurance findings and submit updated evidence.':'Complete the work and submit evidence for assurance review.'};
 return {kind,status:inactive?'superseded':status,steps,next};
}
export function recordProgressView(s,record,kind='action'){
 const progress=recordProgressModel(s,record,kind),date=value=>dateValid(value)?formatDate(value):value||'Not yet recorded';
 return `<section class="record-progress" aria-label="${kind==='decision'?'Management request':'Action'} progress"><div class="record-progress-heading"><h2>${kind==='decision'?'Decision progress':'Action progress'}</h2>${statusBadge(progress.status,{label:record.superseded?'Superseded':labels[progress.status]||progress.status})}</div><ol class="record-progress-steps">${progress.steps.map((step,i)=>`<li class="record-progress-step is-${step.state}"${step.state==='current'?' aria-current="step"':''}><span class="record-progress-mark" aria-hidden="true">${step.state==='done'?icon('check',16):step.state==='returned'||step.state==='expired'?icon('warning',16):i+1}</span><div><strong>${esc(step.label)}</strong><span>${esc(step.state==='not-applicable'?'Not applicable':date(step.date))}</span>${step.detail?`<small>${esc(step.detail)}</small>`:''}</div></li>`).join('')}</ol><div class="record-next-step"><span class="label">${progress.next.owner?'Who acts next':'Record status'}</span><p><strong>${esc(progress.next.role)}${progress.next.owner?`: ${esc(progress.next.owner)}`:''}</strong></p><p>${esc(progress.next.text)}</p></div></section>`;
}
const draftFor=(s,type,id,record)=>ensureOperations(s).drafts[`${type}.${id}`]??=clone(record);
const errorsView=(s,key)=>s.operations?.errors?.[key]?.length?`<div class="validation-summary" tabindex="-1" role="alert"><strong>Check these details</strong><ul>${s.operations.errors[key].map(e=>`<li>${esc(e.message||e)}</li>`).join('')}</ul></div>`:'';
const evidenceChoices=r=>[
 {id:`${r.id}-implementation`,title:`Implementation record · ${r.name}`,detail:'Prepared synthetic record of the change, accountable owner and implementation date.'},
 {id:`${r.id}-test`,title:`Test results · ${r.name}`,detail:'Prepared synthetic test pack with population, sample, exceptions and results. Assurance must judge whether it meets the closure requirements.'}
];

export function actionView(data,s,riskId=s.selectedRisk){
 const ops=ensureOperations(s),r=s.risks[riskId],a=ops.actions[riskId];
 if(s.selectedEvidenceRequest&&ops.evidenceRequests[s.selectedEvidenceRequest])return evidenceRequestView(data,s,s.selectedEvidenceRequest);
 if(!r||!a)return emptyState({title:'No action has been recorded',description:'Create a risk response with a linked action first.',action:button('Back to assessment','open-risk',`class="button" data-risk="${esc(riskId||'unauthorized')}" data-stage="residual"`)});
 const active=actionIsActive(s,a),canExecute=s.role==='first'&&active&&a.status!=='closed',canReview=s.role==='assurance'&&active&&a.status==='evidence-submitted',draft=draftFor(s,'action',riskId,a),d=canExecute?draft:{...a,reviewReason:draft.reviewReason||''},key=`action.${riskId}`;
 return `<div class="operations-view"><div class="ri-topline">${button('Back to dashboard','navigate','class="text-link" data-route="work"')}<span>${esc(r.name)} · ${esc(a.id)}</span></div><header class="page-heading"><h1>${esc(a.title)}</h1><p>Action version ${a.version} · As of ${demoAsOf(s)}</p></header>${recordProgressView(s,a)}${!active?'<p class="return-feedback">This plan is retained for history. The current response no longer uses it.</p>':''}<div class="review-report-layout"><section class="sheet"><h2>Action record</h2>${errorsView(s,key)}<div class="two-columns">${input(s,`${key}.owner`,'Accountable owner',d.owner,{readOnly:!canExecute})}${input(s,`${key}.executor`,'Person doing the work',d.executor,{readOnly:!canExecute})}${input(s,`${key}.due`,'Due date',d.due,{type:'date',readOnly:!canExecute})}</div>${input(s,`${key}.progress`,'Progress update',d.progress,{area:true,readOnly:!canExecute})}${canExecute?`<div class="button-group">${button('Save progress','ops-save-action',`class="button" data-risk="${r.id}"`)}${a.status==='planned'?button('Start work','ops-start-action',`class="button primary" data-risk="${r.id}"`):''}</div>`:''}<details class="disclosure"><summary>Implementation and testing tasks</summary><h3>Implementation</h3>${taskView(a.implementationTasks)}<h3>Testing</h3>${taskView(a.testingTasks)}</details><h3>Evidence required</h3><p>${esc(a.requiredEvidence||'No requirement recorded. Update the response plan before closure.')}</p><h3>Evidence received</h3>${a.receivedEvidence.length?`<ul>${a.receivedEvidence.map(e=>`<li><strong>${esc(e.title)}</strong><p>${esc(e.detail)}</p><small>Prepared synthetic evidence · ${esc(e.actor)} · ${esc(e.at)}</small></li>`).join('')}</ul>`:'<p>No evidence submitted.</p>'}${canExecute?`<label class="field"><span>Prepared evidence to submit</span><select aria-label="Prepared evidence to submit" data-ops-field="${key}.evidenceChoice"><option value="">Choose a synthetic evidence record</option>${evidenceChoices(r).map(e=>`<option value="${e.id}" ${d.evidenceChoice===e.id?'selected':''}>${esc(e.title)}</option>`).join('')}</select></label>${button('Submit evidence for closure review','ops-submit-evidence',`class="button primary" data-risk="${r.id}"`)}<p class="small muted">This uses a prepared local receipt. No file is uploaded.</p>`:''}${eventsView(a)}</section><aside class="sheet"><h2>Closure review</h2><p>Assurance reviewer: ${OPERATION_ROLES.assurance}</p>${a.closure?`<p><strong>${esc(a.closure.outcome)}</strong> · ${esc(a.closure.actor)} · ${esc(a.closure.at)}</p><p>${esc(a.closure.reason)}</p>`:'<p>The person submitting evidence cannot close this action.</p>'}${canReview?`${input(s,`${key}.reviewReason`,'Reason for closure or return',d.reviewReason||'',{area:true})}<div class="button-group">${button('Close action','ops-close-action',`class="button primary" data-risk="${r.id}"`)}${button('Return evidence','ops-return-action',`class="button" data-risk="${r.id}"`)}</div>`:`<p class="small muted">${a.status==='closed'?'This action is closed.':a.status==='evidence-submitted'?'Use the Control assurance perspective to review the evidence.':'Submit evidence before assurance can close the action.'}</p>`}<p class="small muted">Closing work does not change the risk rating or the submitted assessment.</p></aside></div></div>`;
}

export function reconcileResponseRecords(s,riskId,previousStrategy,nextStrategy){
 if(s.role!=='first'||s.submitted||previousStrategy===nextStrategy)return false;
 const ops=ensureOperations(s);ops.archivedActions??=[];ops.archivedDecisions??=[];
 for(const [collection,archive] of [['actions','archivedActions'],['decisions','archivedDecisions']]){
  const record=ops[collection][riskId];if(!record)continue;
  record.superseded=true;bump(s,record,'Superseded by response change',`${previousStrategy||'Unselected'} → ${nextStrategy}. The earlier record and its events are retained.`);ops[archive].push(clone(record));delete ops[collection][riskId];delete ops.drafts[`${collection==='actions'?'action':'decision'}.${riskId}`];
 }
 return true;
}

function evidenceRequestEditor(data,s,error=''){
 const d=ensureOperations(s).requestDraft||{};
 return `<h2 id="dialog-title">Request evidence</h2><p>${esc(s.risks[d.riskId]?.name||'Assessment evidence')} · Local work item</p>${error?`<p class="validation-summary" role="alert">${esc(error)}</p>`:''}${input(s,'evidence.title','Evidence needed',d.title||'',{area:true})}${input(s,'evidence.owner','Person or team providing it',d.owner||'')}${input(s,'evidence.due','Target date',d.due||'',{type:'date'})}${input(s,'evidence.records','Records and scope to provide',d.records||'',{area:true})}<p class="small muted">This records a local request. No email or external message is sent.</p>${button('Record evidence request','ops-save-evidence-request','class="button primary"')}`;
}
export function saveEvidenceRequest(s){
 const ops=ensureOperations(s),d=ops.requestDraft;if(s.role!=='first'||!d||!s.risks[d.riskId])return {ok:false,errors:['Only the assessment owner can request evidence.']};
 const errors=[];for(const [key,message] of [['title','Enter the evidence needed.'],['owner','Name the evidence provider.'],['records','Describe the requested records and scope.']])if(!hasText(d[key]))errors.push(validationError(`evidence.${key}`,message));if(!dateValid(d.due))errors.push(validationError('evidence.due','Enter a valid target date.'));if(errors.length)return {ok:false,errors};
 const id=`EVID-${Object.keys(ops.evidenceRequests).length+1}`,record={...clone(d),id,version:1,status:'requested',events:[{version:1,at:stamp(s),actor:actor(s),event:'Evidence requested locally',detail:d.records}]};ops.evidenceRequests[id]=record;delete ops.requestDraft;s.reportConfirmed='';return {ok:true,id};
}
function markReceivedEvidenceForReview(s,request){
 for(const proposal of Object.values(s.proposals||{}))if(proposal.riskId===request.riskId){proposal.status='stale';proposal.history??=[];proposal.history.push({status:'stale',reason:'New requested evidence received',requestId:request.id,requestVersion:request.version,date:stamp(s)});}
 const assistance=s.controlAssistance,plan=assistance?.plans?.[request.riskId];if(plan)plan.needsReview=true;
 if(assistance?.planDraft?.riskId===request.riskId)assistance.planDraft.needsReview=true;
}
export function evidenceRequestView(data,s,id){
 const request=ensureOperations(s).evidenceRequests[id];if(!request)return emptyState({icon:'source',title:'Evidence request not found',description:'This request is not available in the current workspace.',action:button('Back to dashboard','navigate','class="button" data-route="work"')});
 return `<div class="operations-view"><div class="ri-topline">${button('Back to dashboard','navigate','class="text-link" data-route="work"')}</div><header class="page-heading"><h1>${esc(request.title)}</h1><p>${request.status==='received'?'Received · needs owner assessment':'Evidence requested'} · ${esc(request.id)} · record version ${request.version}</p></header><section class="sheet"><dl class="facts"><div><dt>Provider</dt><dd>${esc(request.owner)}</dd></div><div><dt>Target date</dt><dd>${esc(request.due)}</dd></div><div><dt>Risk</dt><dd>${esc(s.risks[request.riskId]?.name||request.riskId)}</dd></div></dl><h2>Requested records and scope</h2><p>${esc(request.records)}</p>${request.receipt?`<h2>Receipt</h2><p>${esc(request.receipt.detail)}</p><p>${esc(request.receipt.actor)} · ${esc(request.receipt.at)}</p>`:''}${s.role==='first'&&request.status==='requested'?button('Receive prepared evidence pack','ops-receive-evidence',`class="button primary" data-request="${esc(id)}"`):''}<p class="small muted">The receipt is simulated. Receiving a record does not show that a control works or change a rating.</p>${eventsView(request)}</section></div>`;
}

export function decisionView(data,s,riskId=s.selectedRisk){
 const ops=ensureOperations(s),r=s.risks[riskId],record=ops.decisions[riskId];
 if(!r||!record)return emptyState({title:'No management request is recorded',description:'Review the risk assessment and response before preparing a management request.',action:button('Back to assessment','open-risk',`class="button" data-risk="${esc(riskId||'unauthorized')}" data-stage="residual"`)});
 const key=`decision.${riskId}`,status=decisionStatus(s,record),ownerEdit=s.role==='first'&&['draft','returned','expired'].includes(status),managerEdit=s.role==='management'&&status==='submitted',d=ownerEdit||managerEdit?draftFor(s,'decision',riskId,record):record;
 return `<div class="operations-view"><div class="ri-topline">${button('Back to dashboard','navigate','class="text-link" data-route="work"')}<span>${esc(r.name)} · ${esc(record.id)}</span></div><header class="page-heading"><h1>${record.kind==='acceptance'?'Request temporary risk acceptance':'Request permission to continue'}</h1><p>Request version ${record.version} · As of ${demoAsOf(s)}</p></header>${recordProgressView(s,record,'decision')}<section class="sheet">${errorsView(s,key)}<p class="report-decision-question">${esc(record.question)}</p><div class="two-columns">${input(s,`${key}.owner`,'Decision owner',d.owner,{readOnly:!ownerEdit})}${input(s,`${key}.forum`,'Decision committee or meeting',d.forum,{readOnly:!ownerEdit})}${input(s,`${key}.targetDate`,'Decision due date',d.targetDate,{type:'date',readOnly:!ownerEdit})}${input(s,`${key}.reviewDate`,'Expiry or review date',d.reviewDate,{type:'date',readOnly:!ownerEdit&&!managerEdit})}</div>${input(s,`${key}.reason`,'Why this decision is needed',d.reason,{area:true,readOnly:!ownerEdit})}${input(s,`${key}.conditions`,'Conditions and limits',d.conditions,{area:true,readOnly:!ownerEdit&&!managerEdit})}${ownerEdit?`<div class="button-group">${button('Save request draft','ops-save-decision',`class="button" data-risk="${r.id}"`)}${button('Submit for management decision','ops-submit-decision',`class="button primary" data-risk="${r.id}"`)}</div>`:''}${managerEdit?`${input(s,`${key}.decisionReason`,'Reason for your decision',d.decisionReason||'',{area:true})}<div class="button-group">${button('Approve with conditions','ops-approve-decision',`class="button primary" data-risk="${r.id}"`)}${button('Return for changes','ops-return-decision',`class="button" data-risk="${r.id}"`)}${button('Decline request','ops-decline-decision',`class="button quiet" data-risk="${r.id}"`)}</div>`:''}${record.outcome?`<div class="confirmation"><strong>${esc(labels[status])}</strong> · ${esc(record.outcome.actor)} · ${esc(record.outcome.at)}<p>${esc(record.outcome.reason)}</p></div>`:''}${status==='expired'?'<p class="return-feedback">The approval has expired as of the demo date. The owner must renew the request; there is no continuing approval.</p>':''}<p class="small muted">Only the Management decision owner perspective can approve or decline. A decision does not close actions or lower the confirmed risk rating.</p>${eventsView(record)}</section></div>`;
}

export function handleOperationsField(s,key,value){
 if(key.startsWith('report.')){if(!['first','second'].includes(s.role))return true;s.reportWorkspace??={};s.reportWorkspace.draftSummary=String(value);return true;}
 if(key.startsWith('grc.')){if(s.role!=='admin')return true;s.grc??={};s.grc.mappingDraft??={};s.grc.mappingDraft[key.slice(4)]=String(value);return true;}
 if(key.startsWith('evidence.')){if(s.role!=='first')return true;const ops=ensureOperations(s);if(ops.requestDraft)ops.requestDraft[key.slice(9)]=String(value);return true;}
 const [type,id,name]=key.split('.');if(!['action','decision'].includes(type))return false;
 const ops=ensureOperations(s),record=ops[type==='action'?'actions':'decisions'][id];if(!record)return true;
 const allowed=type==='action'?(s.role==='first'&&actionIsActive(s,record)&&record.status!=='closed'?['owner','executor','due','progress','evidenceChoice']:s.role==='assurance'&&record.status==='evidence-submitted'?['reviewReason']:[]):(s.role==='first'&&['draft','returned','expired'].includes(decisionStatus(s,record))?['owner','forum','targetDate','reviewDate','conditions','reason']:s.role==='management'&&record.status==='submitted'?['reviewDate','conditions','decisionReason']:[]);
 if(allowed.includes(name))draftFor(s,type,id,record)[name]=String(value);
 return true;
}

export function saveAction(s,id,{start=false,submitEvidence=false}={}){
 const ops=ensureOperations(s),a=ops.actions[id];if(s.role!=='first'||!a||!actionIsActive(s,a)||a.status==='closed')return {ok:false,errors:['Only the person doing the work can update this open action.']};
 const d=draftFor(s,'action',id,a),errors=[];
 if(!hasText(d.owner))errors.push(validationError(`action.${id}.owner`,'Enter the accountable owner.'));if(!hasText(d.executor))errors.push(validationError(`action.${id}.executor`,'Enter the person doing the work.'));if(!dateValid(d.due))errors.push(validationError(`action.${id}.due`,'Enter a valid due date.'));
 const evidence=submitEvidence?evidenceChoices(s.risks[id]).find(e=>e.id===d.evidenceChoice):null;if(submitEvidence&&!evidence)errors.push(validationError(`action.${id}.evidenceChoice`,'Choose the prepared evidence to submit.'));
 if(errors.length)return {ok:false,errors};
 Object.assign(a,{owner:d.owner.trim(),executor:d.executor.trim(),due:d.due,progress:d.progress||''});
 if(submitEvidence){a.receivedEvidence.push({...clone(evidence),at:stamp(s),actor:actor(s),synthetic:true});a.status='evidence-submitted';delete a.closure;bump(s,a,'Evidence submitted',evidence.title);}else{if(start)a.status='in-progress';bump(s,a,start?'Work started':'Progress saved',a.progress);}
 ops.drafts[`action.${id}`]={...clone(a),reviewReason:''};return {ok:true};
}
export function reviewAction(s,id,outcome,reason){
 const ops=ensureOperations(s),a=ops.actions[id];
 if(s.role!=='assurance'||!a||!actionIsActive(s,a)||a.status!=='evidence-submitted'||!['closed','returned'].includes(outcome))return {ok:false,errors:['Only assurance can review submitted evidence.']};
 if(!hasText(reason))return {ok:false,errors:[validationError(`action.${id}.reviewReason`,'Explain why the evidence supports closure or needs more work.')]};
 if(!a.receivedEvidence.length||a.receivedEvidence.at(-1).actor===actor(s)||a.executor===actor(s))return {ok:false,errors:['Closure needs evidence submitted and work performed by a different person.']};
 a.status=outcome;a.closure={outcome:labels[outcome],actor:actor(s),at:stamp(s),reason:String(reason).trim()};bump(s,a,outcome==='closed'?'Action closed':'Evidence returned',a.closure.reason);ops.drafts[`action.${id}`]=clone(a);return {ok:true};
}
export function saveDecision(s,id,{submit=false}={}){
 const ops=ensureOperations(s),record=ops.decisions[id];if(s.role!=='first'||!record||!['draft','returned','expired'].includes(decisionStatus(s,record)))return {ok:false,errors:['Only the assessment owner can prepare this request.']};
 const d=draftFor(s,'decision',id,record),errors=[];
 for(const [key,label] of [['owner','Name the decision owner.'],['forum','Name the decision committee or meeting.'],['reason','Explain why this decision is needed.'],['conditions','Set the proposed conditions and limits.']])if(!hasText(d[key]))errors.push(validationError(`decision.${id}.${key}`,label));
 if(!dateValid(d.targetDate))errors.push(validationError(`decision.${id}.targetDate`,'Enter a valid decision due date.'));if(!dateValid(d.reviewDate)||d.reviewDate<demoAsOf(s))errors.push(validationError(`decision.${id}.reviewDate`,'Choose an expiry or review date on or after the demo date.'));
 if(errors.length)return {ok:false,errors};for(const key of ['owner','forum','targetDate','reviewDate','reason','conditions'])record[key]=d[key];record.status=submit?'submitted':'draft';delete record.outcome;bump(s,record,submit?'Request submitted':'Request draft saved',submit?`Sent locally to ${record.owner}; no external message was sent.`:record.reason);ops.drafts[`decision.${id}`]=clone(record);return {ok:true};
}
export function decideRequest(s,id,outcome,values={}){
 const ops=ensureOperations(s),record=ops.decisions[id];if(s.role!=='management'||!record||record.status!=='submitted'||!['approved','declined','returned'].includes(outcome))return {ok:false,errors:['Only management can decide a submitted request.']};
 const errors=[];if(!hasText(values.decisionReason))errors.push(validationError(`decision.${id}.decisionReason`,'Explain your decision.'));if(outcome==='approved'){if(!hasText(values.conditions))errors.push(validationError(`decision.${id}.conditions`,'Record the approval conditions.'));if(!dateValid(values.reviewDate)||values.reviewDate<demoAsOf(s))errors.push(validationError(`decision.${id}.reviewDate`,'Choose an expiry or review date on or after the demo date.'));}if(errors.length)return {ok:false,errors};
 if(outcome==='approved'){record.conditions=values.conditions;record.reviewDate=values.reviewDate;}record.status=outcome;record.outcome={actor:actor(s),at:stamp(s),reason:values.decisionReason};bump(s,record,`${labels[outcome]} request`,values.decisionReason);ops.drafts[`decision.${id}`]=clone(record);return {ok:true};
}
export function handleOperations({data,state:s,el,showDialog,closeDialog,showValidation,notify,save,render,navigate}){
 const action=el.dataset.action;if(!action?.startsWith('ops-')&&action!=='request-evidence')return false;
 const id=el.dataset.risk||s.selectedRisk;
 if(action==='request-evidence'){if(s.role!=='first'){notify('Only the assessment owner can request evidence.');return true;}const ops=ensureOperations(s);ops.requestDraft??={riskId:id,sourceId:el.dataset.source||'',title:`Evidence for ${s.risks[id]?.name||'the assessment'}`,owner:'Payments Operations',due:'2026-11-28',records:''};save();showDialog(evidenceRequestEditor(data,s));return true;}
 if(action==='ops-save-evidence-request'){const result=saveEvidenceRequest(s);if(!result.ok){showDialog(evidenceRequestEditor(data,s,result.errors.map(e=>e.message||e).join(' ')));showValidation?.(result.errors,document.getElementById('detail-dialog'));return true;}closeDialog?.();save();render();notify('Evidence request recorded locally. No message was sent.');return true;}
 if(action==='ops-open-evidence'){const request=ensureOperations(s).evidenceRequests[el.dataset.request];if(!request)return true;s.selectedEvidenceRequest=request.id;s.selectedRisk=request.riskId;save();navigate('assessment/action');return true;}
 if(action==='ops-receive-evidence'){const request=ensureOperations(s).evidenceRequests[el.dataset.request];if(s.role!=='first'||!request||request.status!=='requested')return true;request.status='received';request.receipt={at:stamp(s),actor:'Prepared provider receipt',detail:`A synthetic pack was received for: ${request.records}. The owner must inspect its scope and draw a conclusion.`};bump(s,request,'Prepared evidence received',request.receipt.detail);s.additionalSources??=[];s.additionalSources.push({id:`receipt-${request.id}`,title:request.title,reference:request.id,date:stamp(s),version:request.version,scope:request.records,excerpt:request.receipt.detail});markReceivedEvidenceForReview(s,request);save();render();return true;}
 if(action==='ops-open-action'||action==='ops-open-decision'){delete s.selectedEvidenceRequest;s.selectedRisk=id;save();navigate(action==='ops-open-action'?'assessment/action':'assessment/decision');return true;}
 const ops=ensureOperations(s),type=action.includes('decision')?'decision':'action',record=ops[type==='action'?'actions':'decisions'][id],draft=record?draftFor(s,type,id,record):{};let result;
 if(action==='ops-save-action'||action==='ops-start-action'||action==='ops-submit-evidence')result=saveAction(s,id,{start:action==='ops-start-action',submitEvidence:action==='ops-submit-evidence'});
 else if(action==='ops-close-action'||action==='ops-return-action')result=reviewAction(s,id,action==='ops-close-action'?'closed':'returned',draft.reviewReason);
 else if(action==='ops-save-decision'||action==='ops-submit-decision')result=saveDecision(s,id,{submit:action==='ops-submit-decision'});
 else if(['ops-approve-decision','ops-return-decision','ops-decline-decision'].includes(action))result=decideRequest(s,id,({'ops-approve-decision':'approved','ops-return-decision':'returned','ops-decline-decision':'declined'})[action],draft);
 else return false;
 ops.errors??={};ops.errors[`${type}.${id}`]=result.errors||[];save();render();if(result.ok)notify(type==='action'?'Action record updated. Risk ratings are unchanged.':'Decision request updated. Risk ratings are unchanged.');else if(showValidation)showValidation(result.errors,document.getElementById('main'));else notify('Complete the highlighted fields. '+result.errors.map(e=>e.message||e).join(' '));return true;
}
