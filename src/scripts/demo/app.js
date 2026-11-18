import {homeView} from './home-view.js?v=20261118.8';
import {carryForwardDialog,confirmCarryForward} from './carry-forward.js?v=20261118.8';
import {scopeRecord,preparedScopeMatches,beginScopeEdit,mutateScopeField,saveScope,cancelScopeEdit,confirmScope,excludeScopeRisk,restoreScopeRisk} from './scope-model.js?v=20261118.8';
import {manualRiskForm,scopeEditor,scopeExclusionDialog} from './scope-workspace.js?v=20261118.8';
import {mutateControlFit} from './control-fit.js?v=20261118.8';
import {incomingTestDialog,receiveSignalTest} from './evidence-update.js?v=20261118.8';
import {insightDrawer} from './inline-insights.js?v=20261118.8';
import {bankSetupView,handleBankSetupActions} from './bank-setup.js?v=20261118.8';
import {policyFor,thresholdFor,reviewerFor,mutateBankSetupField} from './bank-policy.js?v=20261118.8';
import {addOwnerRisk,suggestionSources} from './upgrade-model.js?v=20261118.8';
import {handleUpgradeActions,mutateUpgradeField} from './upgrade-view.js?v=20261118.8';
import {actionView,decisionView,operationsSummary,reconcileResponseRecords,ensureOperations,handleOperations,handleOperationsField} from './operations.js?v=20261118.8';
import {focusBookmark,restoreBookmark,showValidation,clearFieldError,focusFieldError} from './interactions.js?v=20261118.7';
import {heatmapGroupDialog} from './visuals.js?v=20261118.8';
import {integrationSettingsView,syncStatusLine,pilotText,handleGrcActions} from './grc-view.js?v=20261118.8';
import {exchangeState} from './grc-exchange.js?v=20261118.8';
import {refreshAutomaticSync,finishAutomaticSync,retryAutomaticSync,resolveSyncConflict} from './grc-sync.js?v=20261118.8';
import {replySuggestion,replyCoverage} from './reply-assistance.js?v=20261118.8';
import {ensureAssistance} from './control-assistance.js?v=20261118.8';
import {handleControlAssistanceAction,markAssistancePlanForReview,syncAssistancePlanField} from './control-assistance-actions.js?v=20261118.8';
import {historyInsight} from './assessment-context.js?v=20261118.8';
import {receiveEvidence,reviseFromEvidence,controlDefaults} from './research.js?v=20261118.8';
import {versionDialog} from './versions.js?v=20261118.8';
import {controlLibraryDialog,ownerRevisionDialog} from './control-library.js?v=20261118.8';
import {dashboardView,assessmentLaunch} from './dashboard.js?v=20261118.8';
import {mappingDialog,removalDialog} from './controls.js?v=20261118.8';
import {controlRatingDialog,controlRatingEvidence} from './control-ratings.js?v=20261118.8';
import {controlsLibrary,saveMapping,removeMapping,sharedPair,mappingNeedsReview} from './mappings.js?v=20261118.8';
import {nextResponseRisk,discardOptionalResponse,saveRiskResponse,responseErrors,setResponseStrategy,actionFor} from './responses.js?v=20261118.8';
import {responseDraft,responseDraftDialog,applyResponseDraft} from './response-view.js?v=20261118.8';
import {askFollowup,requirements,ratingReasonsComplete,createInitial,migrateSession,sourceRecords,assessmentProjection,validRating,score,band,record,sendAssessment,sendChallenge,respond,completeReview,seedScene,startOwnerRevision,LIKELIHOOD,IMPACT,responseCoverage,reportSignature,actionComplete,isKeyControl,incompleteKeyControl,saveControlRatings} from './model.js?v=20261118.8';
import {esc,icon,button,emptyState,loadingState,BADGE_CSS} from './ui.js?v=20261118.8';
import {earlierStep} from './assessment-navigation.js?v=20261118.8';
import {assessmentView} from './assessment.js?v=20261118.8';
import {analysisPrompts} from './risk-intelligence.js?v=20261118.8';
import {workView} from './work.js?v=20261118.8';
import {reportsView,handleReportActions} from './reports.js?v=20261118.8';
const STORAGE='rcsa-workflow-demo-v1', app=document.getElementById('app'), dialog=document.getElementById('detail-dialog');
let data,state,lastFocus,dialogOrigin,toastTimer,syncTimer,registerRequested=false,storageWarning=false,recoveryAvailable=false,route;
const dialogParents=[];
const badgeStyle=document.createElement('style');badgeStyle.dataset.productVisuals='badges';badgeStyle.textContent=BADGE_CSS;document.head.append(badgeStyle);
function readRoute(){
 const raw=location.hash.replace(/^#\/?/,'');
 if(!raw)return new URLSearchParams(location.search).get('presenter')==='1'?'work':'home';
 if(raw==='handoff'||raw==='assessment/analysis'||raw==='assessment/research'){
  const origin=raw==='assessment/research'?state?.researchReturn:state?.analysisReturn;
  const stage=['inherent','controls','discovery','residual','review','changes','response'].includes(origin)?origin:'inherent';
  const next=raw==='handoff'?'assessment/review':'assessment/'+stage;
  if(state)history.replaceState(history.state,'','#/'+next);
  return next;
 }
 return /^(home|work|reports|settings\/(integrations|bank)|assessment\/(changes|inherent|controls|discovery|residual|response|review|action|decision))$/.test(raw)?raw:'work';
}
function save(){try{sessionStorage.setItem(STORAGE,JSON.stringify({...state,scopeDraft:undefined,scopeRiskDraft:undefined}));}catch{storageWarning=true;}const indicator=document.getElementById('draft-status');if(indicator)indicator.textContent=storageWarning?'Draft is only in memory; reload will lose changes.':state.submitted?'Recorded version '+state.versionNumber:'Draft saved in this session';}
function notify(text){if(/^(Complete|Add |Choose |Confirm |Check |Only |No |A submitted|Record your|Assess coverage|Enter )/.test(text)){showValidation(text,dialog.open?dialog:document.getElementById('main'));return;}const t=document.getElementById('toast');clearTimeout(toastTimer);t.textContent=text;t.classList.add('visible');toastTimer=setTimeout(()=>t.classList.remove('visible'),3500);}
function navigate(next){const hash='#/'+next;if(location.hash===hash){if(route===next)render(true);return;}location.hash=hash;}
function header(){const scope=scopeRecord(state),current=route.split('/')[0],launch=assessmentLaunch(state),assessmentRoute=current==='assessment'?route:'assessment/'+launch.stage;return `<header class="app-header"><div class="header-inner"><a href="#/home" class="wordmark" aria-label="RCSA home">RCSA</a><nav aria-label="Primary navigation">${[['work','Dashboard'],['assessment','Assessments'],['reports','Reports']].map(([id,label])=>`<a href="#/${id==='assessment'?assessmentRoute:id}" ${id==='assessment'&&current!=='assessment'?`data-action="resume-assessment" data-risk="${esc(launch.risk)}" data-route="${assessmentRoute}"`:''} ${current===id?'aria-current="page"':''}>${label}</a>`).join('')}</nav><details class="workspace-disclosure"><summary>Demo workspace</summary><p>Synthetic records. AI suggestions and incoming replies are prepared for this example. Connections can be configured for a bank; this demo uses local records. No external system is contacted. No live search is performed. Changes remain in this browser session.</p></details>${recoveryAvailable?button('Download preserved draft','recover-draft','class="button quiet"'):''}<div class="header-user"><span class="header-period">${esc(scope?.period||'Recorded assessment')}</span><span class="avatar">${({first:'AM',second:reviewerFor(state).trim().split(/\s+/).map(part=>part[0]).slice(0,2).join(''),assurance:'AP',management:'CB',admin:'MC'})[state.role]||'AM'}</span></div></div></header>`;}
function presenter(){if(new URLSearchParams(location.search).get('presenter')!=='1')return '';return `<details class="presentation-tools" data-edit="presenter" ${state.editPanels?.presenter?'open':''}><summary>Presentation controls</summary><div class="sample-disclosure">Presenter tools replace this tab’s draft with a selected scenario. Changes remain in this browser session.</div><footer class="demo-footer"><div class="presenter-controls"><label>Perspective<select id="demo-role" aria-label="Demo perspective"><option value="first" ${state.role==='first'?'selected':''}>Assessment owner</option><option value="second" ${state.role==='second'?'selected':''}>Independent reviewer</option>${[['assurance','Control assurance'],['management','Management decision owner'],['admin','Bank administrator']].map(([id,label])=>`<option value="${id}" ${state.role===id?'selected':''}>${label}</option>`).join('')}</select></label><label>Jump to<select id="demo-scene" aria-label="Jump to demo scene"><option value="">Choose a scene</option><option value="start">Start of refresh</option><option value="discovery">Shared-source discovery</option><option value="submitted">Submitted for review</option><option value="challenge">Open challenge</option><option value="response">Response received</option><option value="complete">Review completed</option><option value="new-evidence">New evidence received</option></select></label><label>Demo as-of date<input id="demo-as-of" type="date" aria-label="Demo as-of date" data-ops-field="demo.asOf" value="${esc(state.asOf||'2026-11-14')}" required></label><label>Next GRC update<select aria-label="Next GRC update" data-sync-scenario><option value="none" ${exchangeState(state).fault==='none'?'selected':''}>Normal sync</option><option value="stale" ${exchangeState(state).fault==='stale'?'selected':''}>GRC record changes</option><option value="transport" ${exchangeState(state).fault==='transport'?'selected':''}>Connection interruption</option></select></label>${button(`${icon('reset',15)} Reset`,'reset','class="reset-button"')}</div></footer></details>`;}
function runtimeData(){
 const casesFor=cases=>!preparedScopeMatches(state)?{}:Object.fromEntries(Object.entries(cases||{}).filter(([id,entry])=>{const risk=state.risks[id];if(!risk||risk.removed||risk.scenarioId==='owner-defined')return false;return !(risk.extensions||[]).some(extension=>!entry.coveredExtensionIds?.includes(extension.candidateId));}));
 return {...data,presenterEnabled:new URLSearchParams(location.search).get('presenter')==='1',reviewer:reviewerFor(state),risks:Object.values(state.risks).filter(r=>!r.removed),sources:sourceRecords(data,state),assistance:{...data.assistance,cases:casesFor({...data.assistance?.cases,...state.preparedAssistance?.cases})},intelligence:{...data.intelligence,cases:casesFor({...data.intelligence?.cases,...state.preparedIntelligence?.cases})}};
}
// Measure the actual cards so connector ends remain attached after reflow.
const mapLayout=new ResizeObserver(entries=>{
  const map=entries[0]?.target.closest('.record-relationship-map');
  if(!map?.isConnected)return;
  const lines=map.querySelector('.record-map-wires');
  const source=map.querySelector('.record-map-sources');
  const bounds=map.getBoundingClientRect();
  if(!bounds.width||!source||!lines)return;
  const dest=source.getBoundingClientRect(),endX=dest.left-bounds.left,endY=dest.top-bounds.top+dest.height/2;
  lines.replaceChildren();
  for(const row of map.querySelectorAll('[data-shared-control]')){
    const box=row.getBoundingClientRect(),x=box.right-bounds.left,y=box.top-bounds.top+box.height/2;
    const path=document.createElementNS('http://www.w3.org/2000/svg','path');
    path.setAttribute('d',`M${x} ${y} H${(x+endX)/2} V${endY} H${endX}`);
    lines.append(path);
  }
});
function focusPageHeading(){
 const heading=app.querySelector('h1');
 if(heading){heading.tabIndex=-1;heading.focus({preventScroll:true});}
 window.scrollTo({top:0,behavior:'instant'});
}
function render(focus=false){
 if(route.startsWith('assessment/')&&state.risks[state.selectedRisk]&&history.state?.assessmentRisk!==state.selectedRisk){
  history.replaceState({...history.state,assessmentRisk:state.selectedRisk},'');
 }
 const bookmark=focus?null:focusBookmark(app);
 refreshAutomaticSync(state);save();
 document.title='RCSA · '+(route==='work'?'Dashboard':route==='reports'?'Reports':route==='settings/bank'?'Bank setup':route==='settings/integrations'?'Connections':scopeRecord(state)?.process||'Assessment');
 ensureOperations(state);
 const content=route==='work'?dashboardView(runtimeData(),state):route==='reports'?reportsView(runtimeData(),state):route==='assessment/action'?actionView(runtimeData(),state):route==='assessment/decision'?decisionView(runtimeData(),state):route==='settings/bank'?bankSetupView(data,state):route==='settings/integrations'?integrationSettingsView(runtimeData(),state):assessmentView(runtimeData(),state,route.split('/')[1]);
 const syncVisible=false; // Connection configuration is secondary to the assessment story.
 app.innerHTML=header()+`<main id="main" tabindex="-1" class="workspace ${route==='assessment/discovery'?'discovery-workspace':''}${['assessment/action','assessment/decision'].includes(route)?' record-workspace':''}"><div id="draft-status" class="draft-status" role="status">${storageWarning?'Draft is only in memory; reload will lose changes.':state.submitted?'Recorded version '+state.versionNumber:'Draft saved in this session'}</div>${syncVisible?syncStatusLine(state):''}${content}</main><footer class="product-footer"><span>${esc(scopeRecord(state)?.process||'Assessment')} · ${esc(scopeRecord(state)?.period||'Period not preserved')}</span><span class="footer-settings"><span>Assigned owner: ${esc(scopeRecord(state)?.owner||'Not preserved')}</span><a href="#/settings/bank">Bank setup</a></span></footer>`+presenter();
 mapLayout.disconnect();
 const relationship=app.querySelector('.record-relationship-map.has-shared-source');
 if(relationship && relationship.dataset.judgment!=='dismissed'){
   mapLayout.observe(relationship);
   for(const node of relationship.querySelectorAll('[data-shared-control],.record-map-sources'))mapLayout.observe(node);
 }
 if(focus)focusPageHeading();
 if(!focus)restoreBookmark(bookmark,app);
 if(state.grc.status==='pending'&&!syncTimer)syncTimer=setTimeout(()=>{syncTimer=null;finishAutomaticSync(state);save();if(route==='settings/integrations')render();},650);
}
function mutateField(key,value){
 if(key==='returnTarget'){
  if(state.role==='second'&&state.submitted){state.returnTarget=value;save();}
  return;
 }
 if(key==='revisionAnswer'){
  if(state.role==='first'&&!state.submitted&&state.revisionRequest){state.revisionAnswer=value;save();}
  return;
 }
 if(key.startsWith('control-rating.'))return;
 if(mutateScopeField(state,key,value)){save();return;}
  if(mutateControlFit(state,key,value)){save();return;}
 if(key==='replyRiskId'){if(state.role==='first'&&state.challengeStatus==='open'&&state.risks[value])state.replyRiskId=value;save();return;}
 if(mutateBankSetupField(state,key,value)){save();return;}
 if(mutateUpgradeField(state,key,value)){save();return;}
 if(key.startsWith('ops.')&&handleOperationsField(state,key.slice(4),value)){save();return;}
  if(key.startsWith('caDraft.')){if(state.role!=='first'||state.submitted)return;ensureAssistance(state).draft??={};state.controlAssistance.draft[key.slice(8)]=value;save();return;}
  if(key.startsWith('caPlanDraft.')){if(state.role!=='first'||state.submitted)return;ensureAssistance(state).planDraft??={};state.controlAssistance.planDraft[key.slice(12)]=value;state.controlAssistance.planDraft.ownerEdited=true;save();return;}
  if(key.startsWith('caPlanTask.')){if(state.role!=='first'||state.submitted)return;const [,kind,index,field]=key.split('.'),draft=state.controlAssistance?.planDraft;if(!draft||!['implementation','validation'].includes(kind)||!['title','owner','due','evidence'].includes(field)||!draft[kind+'Tasks']?.[Number(index)])return;draft[kind+'Tasks'][Number(index)][field]=value;delete draft[kind+'Text'];draft.ownerEdited=true;save();return;}
  if(key.startsWith('mapping.')){state.mappingDraft??={};if(key==='mapping.controlId')state.mappingDraft.applicability='unassessed';state.mappingDraft[key.slice(8)]=value;return;}
  if(key.startsWith('riskResponse.')){if(state.role!=='first'||state.submitted)return;const r=state.risks[state.selectedRisk];if(key==='riskResponse.strategy'){const previous=r.riskResponse.strategy;if(previous&&previous!==value&&(state.operations?.actions?.[r.id]||state.operations?.decisions?.[r.id])){state.pendingStrategy={riskId:r.id,previous,next:value};render();showDialog(`<h2 id="dialog-title">Change response approach?</h2><p>The previous linked action and decision request will be kept in history and replaced by the new approach. Their history remains available.</p>${button('Change approach and retain history','confirm-strategy','class="button primary"')}${button('Keep current approach','close-dialog','class="button"')}`);return;}setResponseStrategy(state,r.id,value);reconcileResponseRecords(state,r.id,previous,value);save();return;}r.riskResponse[key.slice(13)]=value;r.riskResponse.needsReview=true;}
  else if(key.startsWith('responseAction.')){if(state.role!=='first'||state.submitted)return;actionFor(state,state.selectedRisk)[key.slice(15)]=value;state.risks[state.selectedRisk].riskResponse.needsReview=true;}
  else if(key.startsWith('risk.')){if(state.role!=='first'||state.submitted)return;const [,kind,name]=key.split('.');if(!['inherent','residual','responseAction','controlConclusion'].includes(kind))return;const r=state.risks[state.selectedRisk];r[kind]??={};if(name==='rating')Object.assign(r[kind],value);else r[kind][name]=['likelihood','impact'].includes(name)?Math.max(1,Math.min(5,Number(value)||1)):value;if(kind!=='responseAction')r[kind==='controlConclusion'?'controlsConfirmed':kind+'Confirmed']=false;if(kind==='controlConclusion'){r.residualConfirmed=false;if(r.riskResponse.created)r.riskResponse.needsReview=true;}if(r.riskResponse.created)r.riskResponse.needsReview=true;}
  else if(key.startsWith('action.')){if(state.role!=='first'||(state.submitted&&state.challengeStatus!=='open'))return;state.action[key.slice(7)]=value;}
  else if(['qualification','handoff','question','response','reviewerRationale','responseSufficient','assessmentView'].includes(key)){const reviewer=['question','reviewerRationale','responseSufficient','assessmentView'].includes(key);if(reviewer?state.role!=='second':state.role!=='first')return;state[key]=value;if(key==='responseSufficient'&&value==='return')state.assessmentView='';
  if(key==='response'||key==='question'){if(key==='question')state.replyRiskId='';delete state.replyUndo;delete state.replyDraft;}}
  if(key.startsWith('risk.controlConclusion.'))markAssistancePlanForReview(state,state.selectedRisk);
  syncAssistancePlanField(state,key,value);
  state.reportConfirmed='';save();
}
function focusRegister(){const heading=document.getElementById('dash-register-heading');if(heading){heading.setAttribute('tabindex','-1');heading.focus({preventScroll:true});heading.scrollIntoView({block:'start',behavior:'instant'});}}
function currentRiskValid(kind){const r=state.risks[state.selectedRisk][kind];return validRating(r)&&ratingReasonsComplete(r);}
function showDialog(body){
 dialog.classList.remove('source-drawer','insight-drawer');
  const open=dialog.open,oldTitle=dialog.querySelector('#dialog-title')?.textContent,scrollTop=dialog.scrollTop;
  if(!open){
    lastFocus=dialogOrigin||document.activeElement;
    lastFocus?.closest('.scope-risk-row')?.classList.add('is-inspecting');
    dialogParents.length=0;
  }
  dialog.innerHTML=`<button class="dialog-close icon-button" data-action="close-dialog" aria-label="Close details">${icon('close',22)}</button>${body}`;
  if(!open)dialog.showModal();
  else if(oldTitle===dialog.querySelector('#dialog-title')?.textContent)dialog.scrollTop=scrollTop;
  else dialog.scrollTop=0;
}
function openControlRatings(controlId){
 const projection=assessmentProjection(state,'current',data),risk=projection?.risks[state.selectedRisk];
 const control=projection?.controls.find(c=>c.id===controlId);
 if(!risk||!risk.controls?.includes(controlId)||!isKeyControl(risk,control))return;
 showDialog(controlRatingDialog(risk,control,projection.sources,{readOnly:state.submitted||state.role!=='first',version:state.submitted?projection.version:null}));
}
function sourceDialog(id,version){
  const sources=route==='reports'||version?assessmentProjection(state,version||'current',runtimeData())?.sources||[]:sourceRecords(data,state);
  const recordedSource=sources.find(x=>x.id===id),source=recordedSource||(route!=='reports'&&!version?suggestionSources().find(x=>x.id===id):null);if(!source)return showDialog('<h2 id="dialog-title">Source unavailable for this version</h2><p>This record was not available in the selected assessment. Choose another linked source or assessment version.</p>');
  if(dialog.open){
    // Keep the live editor nodes: values, listeners and focus survive evidence inspection.
    const title=dialog.querySelector('#dialog-title')?.textContent||'',returnLabel=dialog.querySelector('.control-rating-dialog')?'Back to ratings':dialog.querySelector('.insight-detail')?'Back to insight':dialog.querySelector('.ca-plan-dialog')?'Back to implementation plan':dialog.querySelector('.ca-recommendation-dialog')?'Back to control design':'Back to '+(title.toLowerCase().includes('plan')?'implementation plan':'draft');
    const parent={nodes:[...dialog.childNodes],focus:document.activeElement,scrollTop:dialog.scrollTop,className:dialog.className,returnLabel};
    dialogParents.push(parent);
  }
  const back=dialogParents.length?button(`${icon('arrow',15)} ${esc(dialogParents.at(-1).returnLabel)}`,'dialog-back','class="text-link dialog-back"'):'';
  showDialog(`${back}<span class="label">${recordedSource?'Source evidence':'AI suggestion source'}</span><h2 id="dialog-title">${esc(source.title)}</h2>${!recordedSource?'<p class="small muted">Not linked to this assessment. These records are added only if you choose to add or extend the suggested risk.</p>':''}<p class="source-reference">${[source.reference,source.date].filter(Boolean).map(esc).join(' · ')}</p><blockquote class="source-quote cited-passage">${esc(source.excerpt||'Excerpt unavailable').replace(/^(.*?[.!?])(?=\s|$)/,'<strong>$1</strong>')}</blockquote><h3>Scope</h3><p>${esc(source.scope||'Scope unavailable')}</p>${source.url?.startsWith('https://')?`<a class="text-link" href="${esc(source.url)}" target="_blank" rel="noopener">Read the original public source</a>`:''}`);
  dialog.classList.add('source-drawer');
  (dialog.querySelector('.dialog-back')||dialog.querySelector('.dialog-close'))?.focus({preventScroll:true});
}
function definitions(){const p=policyFor(state);showDialog(`<h2 id="dialog-title">How your bank rates risk</h2><p>${esc(p.policyName)} · Setup version ${p.policyVersion}</p><p>${esc(p.policyReference)}. Assess how likely the event is and how severe its impact could be during this quarter.</p><div class="table-scroll" role="region" tabindex="0" aria-label="Bank rating definitions"><table><thead><tr><th>Level</th><th>Likelihood</th><th>Impact</th></tr></thead><tbody>${p.likelihood.map((x,i)=>`<tr><td>${i+1}</td><td><strong>${esc(x)}</strong><p>${esc(p.likelihoodDefinitions[i])}</p></td><td><strong>${esc(p.impact[i])}</strong><p>${esc(p.impactDefinitions[i])}</p></td></tr>`).join('')}</tbody></table></div><h3>Likelihood × impact</h3><p>Low 1–4 · Moderate 5–9 · Elevated 10–15 · High 16–25.</p><p>A score above ${thresholdFor(state)} requires a response under this setup. The response does not approve the risk.</p><p>Rate risk before controls separately from risk after controls. Planned work does not reduce current risk.</p><p>Independent reviewer: ${esc(reviewerFor(state))}.</p><a href="#/settings/bank" data-action="navigate" data-route="settings/bank" class="text-link">View bank setup</a>`);}
function closeDialog(){
  const parent=dialogParents.pop();
  if(parent){dialog.replaceChildren(...parent.nodes);dialog.className=parent.className;dialog.scrollTop=parent.scrollTop;parent.focus?.focus({preventScroll:true});return;}
  if(dialog.querySelector('.scope-editor,.scope-exclusion-editor')){cancelScopeEdit(state);save();}
  dialog.close();
}
dialog.addEventListener('cancel',()=>{if(dialog.querySelector('.scope-editor,.scope-exclusion-editor')){cancelScopeEdit(state);save();}});
function highlightMap(event){
 const target=event.target.closest?.('.map-key-row,.portfolio-marker');
 if(!target)return;
 const map=target.closest('.portfolio-map');
 const active=event.type==='focusin'||event.type==='pointerover';
 for(const item of map.querySelectorAll('[data-likelihood][data-impact]')){
  item.classList.toggle('map-highlight',active && !!target.dataset.likelihood && item.dataset.likelihood===target.dataset.likelihood && item.dataset.impact===target.dataset.impact);
 }
}
for(const event of ['pointerover','pointerout','focusin','focusout'])app.addEventListener(event,highlightMap);
document.addEventListener('toggle',e=>{
 if(e.target.matches?.('details.request-edit')&&!e.target.open&&e.target.isConnected){
  render();app.querySelector('.request-edit summary')?.focus({preventScroll:true});
 }
},true);
document.addEventListener('toggle',e=>{if(e.target.matches?.('details[data-edit]')&&state){state.editPanels??={};state.editPanels[e.target.dataset.edit]=e.target.open;save();}},true);
dialog.addEventListener('submit',e=>{
 const form=e.target;
 if(form.id==='manual-risk-form'){
  e.preventDefault();const fields=new FormData(form);
  const result=addOwnerRisk(state,data,Object.fromEntries(fields),fields.getAll('source'));
  if(!result.ok){form.querySelector('[role="alert"]').textContent=result.message;return;}
  closeDialog();save();render(true);notify('Risk added. Review the inventory and confirm scope.');return;
 }
 if(form.id!=='control-rating-form')return;
 e.preventDefault();
 const values=new FormData(form);
 const ratings=Object.fromEntries(['design','operation'].map(d=>[d,Object.fromEntries(['rating','sourceId','rationale'].map(key=>[key,values.get(d+'.'+key)]))]));
 const {ok,errors,changed}=saveControlRatings(state,form.dataset.risk,form.dataset.control,ratings);
 if(!ok)return showValidation(errors||'These ratings can only be edited in an owner draft.',dialog);
 if(changed)markAssistancePlanForReview(state,form.dataset.risk);
 closeDialog();save();render();
 notify(changed?'Ratings saved. Review your control and risk conclusions before confirming.':'Ratings saved.');
});
document.addEventListener('input',e=>{
 if(e.target.matches('[data-source-filter]')){
  const term=e.target.value.trim().toLowerCase();
  for(const label of e.target.form.querySelectorAll('fieldset label'))label.hidden=!label.textContent.toLowerCase().includes(term)&&!label.querySelector('input').checked;
  return;
 }
 clearFieldError(e.target);if(e.target.dataset.opsField&&handleOperationsField(state,e.target.dataset.opsField,e.target.value)){save();return;}if(e.target.dataset.field)mutateField(e.target.dataset.field,e.target.value);if(e.target.dataset.field==='response'){document.querySelector('[data-action="undo-reply"]')?.remove();const list=document.querySelector('.coverage-list');if(list)list.innerHTML=replyCoverage(data,state,responseCoverage).map(c=>`<li>${icon(c.done?'check':'info',17)}<span>${c.label}</span><small>${c.done?'Mentioned in draft':'Not mentioned'}</small></li>`).join('');}});
document.addEventListener('change',e=>{
  dialogOrigin=null;
  if(e.target.id==='demo-as-of'){
   const value=e.target.value,valid=/^\d{4}-\d{2}-\d{2}$/.test(value)&&!Number.isNaN(Date.parse(value+'T00:00:00Z'))&&new Date(value+'T00:00:00Z').toISOString().slice(0,10)===value;
   if(!valid)return showValidation([{field:'demo.asOf',message:'Enter a valid demo as-of date.'}],document.querySelector('.presentation-tools'));
   state.asOf=value;delete state.demoAsOf;state.editPanels??={};state.editPanels.presenter=true;save();render();notify('Demo date updated. Risk ratings are unchanged.');return;
  }
  if(e.target.dataset.opsField&&handleOperationsField(state,e.target.dataset.opsField,e.target.value)){save();return;}
  if(e.target.matches('[data-risk-select]')){state.selectedRisk=e.target.value;state.analysisPane='overview';save();return render();}
  if(e.target.matches('[data-sync-scenario]')){if(['none','stale','transport'].includes(e.target.value))exchangeState(state).fault=e.target.value;save();return;}
  if(e.target.matches('[data-response-risk]')){state.selectedRisk=e.target.value;delete state.responseEditor;save();return render(true);}
  if(e.target.matches('[data-assessment-step]'))return navigate('assessment/'+e.target.value);
  if(e.target.matches('[data-analysis-pane]')){state.analysisPane=e.target.value;state.intelligenceTab=e.target.value;state.researchTab=e.target.value;save();return render();}
  if(e.target.matches('[data-control-assistance-view]')){const ca=ensureAssistance(state);ca.openByRisk[state.selectedRisk]=true;ca.tabByRisk[state.selectedRisk]=e.target.value;save();render();document.getElementById('control-assistance-view')?.focus({preventScroll:true});return;}
  if(e.target.id==='demo-role'){if(new URLSearchParams(location.search).get('presenter')!=='1')return;state.role=e.target.value;save();if(['assurance','management','admin'].includes(state.role)){navigate(state.role==='admin'?'settings/bank':'assessment/'+(state.role==='management'?'decision':'action'));}else if(route==='work'||route==='reports'){render(true);}else{const launch=assessmentLaunch(state);state.selectedRisk=launch.risk;save();navigate('assessment/'+launch.stage);}notify(({first:'Assessment owner',second:'Independent reviewer',assurance:'Control assurance',management:'Management decision owner',admin:'Bank administrator'})[state.role]+' view');}
  else if(e.target.id==='demo-scene'&&e.target.value){const scene=e.target.value,exchange=state.grc;state=seedScene(data,scene==='new-evidence'?'submitted':scene);if(exchange)state.grc=exchange;if(scene==='new-evidence'){receiveEvidence(state);state.researchTab='evidence';state.researchReturn='review';state.analysisPane='evidence';state.analysisStage='residual';state.analysisReturn='review';}save();navigate(scene==='new-evidence'?'assessment/analysis':scene==='start'?'work':scene==='discovery'?'assessment/discovery':scene==='complete'?'reports':'assessment/review');notify('Scene loaded');}
  else if(e.target.dataset.field?.startsWith('control-rating.')){
   const preview=dialog.querySelector(`[data-rating-preview="${e.target.dataset.ratingSource}"]`);
   if(preview)preview.innerHTML=controlRatingEvidence(sourceRecords(data,state).find(source=>source.id===e.target.value),{preview:true});
  }
  else if(e.target.dataset.field){mutateField(e.target.dataset.field,e.target.value);if(e.target.dataset.field.startsWith('mapping.')){if(e.target.dataset.field==='mapping.controlId')showDialog(mappingDialog(data,state,state.mappingContext));}else if(e.target.tagName==='SELECT'||e.target.name==='risk-response-strategy')render();}
});
function pickRiskRating(cell){
 const kind=route?.split('/')[1];
 if(!state||state.role!=='first'||state.submitted||!['inherent','residual'].includes(kind))return;
 const rating={likelihood:Number(cell.dataset.likelihood),impact:Number(cell.dataset.impact)};
 if(!validRating(rating))return;
 const current=state.risks[state.selectedRisk][kind];
 if(Number(current.likelihood)===rating.likelihood&&Number(current.impact)===rating.impact)return;
 cell.focus({preventScroll:true});
 mutateField('risk.'+kind+'.rating',rating);
 render();
}
document.addEventListener('keydown',e=>{
 const cell=e.target.closest?.('[data-action="pick-risk-rating"]');
 if(!cell)return;
 if(e.key==='Enter'||e.key===' '){e.preventDefault();return pickRiskRating(cell);}
 const offsets={ArrowLeft:[-1,0],ArrowRight:[1,0],ArrowUp:[0,1],ArrowDown:[0,-1]};
 const offset=offsets[e.key];
 if(!Array.isArray(offset))return;
 e.preventDefault();
 const likelihood=Number(cell.dataset.likelihood)+offset[0],impact=Number(cell.dataset.impact)+offset[1];
 const next=cell.parentElement.querySelector(`[data-likelihood="${likelihood}"][data-impact="${impact}"]`);
 if(!next)return;
 cell.setAttribute('tabindex','-1');
 next.setAttribute('tabindex','0');
 next.focus();
});
document.addEventListener('click',e=>{
  if(e.target.closest('.skip-link')){e.preventDefault();document.getElementById('main')?.focus();return;}
  const toast=document.getElementById('toast');
  if(toast.classList.contains('visible')){clearTimeout(toastTimer);toast.classList.remove('visible');}
  const el=e.target.closest('[data-action]');if(!el||el.disabled||!state)return;const action=el.dataset.action;
  if(action==='pick-risk-rating')return pickRiskRating(el);
  dialogOrigin=el;
  const ctx={data:runtimeData(),state,el,showDialog,closeDialog,showValidation,notify,save,render,navigate,route};
  if(action==='signal-review-test'){showDialog(incomingTestDialog(data,state));dialog.classList.add('source-drawer','insight-drawer');return;}
   if(action==='signal-add-test'){if(!receiveSignalTest(state,data))return notify('Only the assessment owner can add new evidence to a draft.');save();closeDialog();render();return notify('Test added. AI analysis updated; review your control and risk conclusions.');}
   if(action==='manual-risk'&&state.role==='first'&&!state.submitted)return showDialog(manualRiskForm(data,state));
   if(action==='scope-edit'){if(beginScopeEdit(state)){save();showDialog(scopeEditor(state));}return;}
   if(action==='scope-cancel'){cancelScopeEdit(state);save();closeDialog();return;}
   if(action==='scope-save'){const result=saveScope(state,data);if(!result.ok)return notify(result.message);save();closeDialog();render();return notify(result.message);}
   if(action==='scope-exclude-review'){if(state.role!=='first'||state.submitted||!state.risks[el.dataset.risk]||state.risks[el.dataset.risk].removed)return;state.scopeRiskDraft={id:el.dataset.risk,reason:''};showDialog(scopeExclusionDialog(state,el.dataset.risk));return;}
   if(action==='scope-exclude'){const result=excludeScopeRisk(state,data,el.dataset.risk,state.scopeRiskDraft?.reason);if(!result.ok)return notify(result.message);cancelScopeEdit(state);save();closeDialog();render();return notify(result.message);}
   if(action==='scope-restore'){const result=restoreScopeRisk(state,data,el.dataset.risk);if(!result.ok)return notify(result.message);save();render();return notify(result.message);}
   if(action==='carry-forward-review'){showDialog(carryForwardDialog(runtimeData(),state,el.dataset.risk));return;}
   if(action==='carry-forward-confirm'){const result=confirmCarryForward(runtimeData(),state,el.dataset.risk);if(!result.ok)return notify(result.message);save();closeDialog();render();return notify(result.message);}
   if(handleBankSetupActions(ctx))return;
  if(handleUpgradeActions(ctx))return;
  if(handleOperations(ctx)||handleReportActions(ctx)||handleGrcActions(ctx))return;
  if(action==='confirm-strategy'){const change=state.pendingStrategy;if(change&&state.role==='first'&&!state.submitted){setResponseStrategy(state,change.riskId,change.next);reconcileResponseRecords(state,change.riskId,change.previous,change.next);delete state.pendingStrategy;save();closeDialog();render();}return;}
  if(action==='recover-draft'){const raw=sessionStorage.getItem(STORAGE+'-preserved');if(raw){const url=URL.createObjectURL(new Blob([raw],{type:'application/json'})),a=document.createElement('a');a.href=url;a.download='rcsa-preserved-draft.json';a.click();setTimeout(()=>URL.revokeObjectURL(url),1000);}return;}
  if(action==='resume-assessment'){e.preventDefault();state.selectedRisk=el.dataset.risk;save();return navigate(el.dataset.route);}
  if(action==='grc-download'){const url=URL.createObjectURL(new Blob([pilotText()],{type:'text/plain;charset=utf-8'}));const a=document.createElement('a');a.href=url;a.download='rcsa-implementation-checklist.txt';a.click();setTimeout(()=>URL.revokeObjectURL(url),1000);return;}
  if(action==='sync-retry'){if(!retryAutomaticSync(state))return notify('Open sync details to review the current status.');save();return render();}
  if(action==='sync-keep-reviewed'){const resolved=resolveSyncConflict(state,el.dataset.sourceVersion);save();render();if(!resolved)notify('The source or review changed. Compare the latest records before continuing.');return;}
  if(handleControlAssistanceAction({data:runtimeData(),state,el,showDialog,closeDialog,notify,save,render,navigate}))return;
  if(action==='highlight-shared-source'){
    el.setAttribute('aria-pressed',String(el.getAttribute('aria-pressed')!=='true'));
    return;
  }
  if(action==='navigate'){if(el.dataset.route==='reports'&&el.dataset.version){state.reportWorkspace??={};state.reportWorkspace.selectedVersion=el.dataset.version==='current'?'current':Number(el.dataset.version);save();}if(dialog.open)closeDialog();return navigate(el.dataset.route);}
  if(action==='source')return sourceDialog(el.dataset.source,el.dataset.version||(route==='reports'?state.reportWorkspace?.selectedVersion:null));
  if(action==='history-rationale'){
    state.historyDraft={risk:el.dataset.risk,kind:el.dataset.kind,text:historyInsight(data,state,el.dataset.risk,el.dataset.kind)};
    const r=state.risks[state.historyDraft.risk],kind=state.historyDraft.kind;
    return showDialog(`<span class="label">AI · history and context</span><h2 id="dialog-title">Explain the assessment in context.</h2><h3>Your current likelihood rationale</h3><p>${esc(r[kind].likelihoodRationale)}</p><h3>Suggested addition</h3><p>${esc(state.historyDraft.text)}</p><p class="small muted">Using this addition preserves your existing text and rating choices. Review the combined rationale and reconfirm the assessment.</p>${state.role==='first'&&!state.submitted?button('Add to my rationale','use-history-rationale','class="button primary"'):''}`);
  }
  if(action==='use-history-rationale'&&state.role==='first'&&!state.submitted&&state.historyDraft){const d=state.historyDraft;state.selectedRisk=d.risk;mutateField('risk.'+d.kind+'.likelihoodRationale',state.risks[d.risk][d.kind].likelihoodRationale+' '+d.text);closeDialog();render();return notify('Context added to your rationale. Review and confirm when ready.');}

  if(action==='insight-details'||action==='research-open'||action==='open-intelligence'||action==='ai-risk-analysis'){
    const insightState=el.dataset.risk&&state.risks[el.dataset.risk]?{...state,selectedRisk:el.dataset.risk}:state;
    const stage=el.dataset.stage||(route.endsWith('/inherent')?'inherent':'residual'),pane=el.dataset.pane||el.dataset.tab;
    showDialog(insightDrawer(runtimeData(),insightState,{stage,index:el.dataset.insight,pane:pane==='research'?'research':'finding'}));
    dialog.classList.add('source-drawer','insight-drawer');dialog.querySelector('.dialog-close')?.focus({preventScroll:true});return;
  }
  if(action==='analysis-group'||action==='analysis-pane'){state.analysisPane=el.dataset.pane;state.intelligenceTab=state.analysisPane;state.researchTab=state.analysisPane;save();return render();}
  if(action==='analysis-back')return navigate('assessment/'+(state.analysisReturn||state.researchReturn||'changes'));
  if(action==='research-tab'){state.researchTab=el.dataset.tab;save();return render();}
  if(action==='research-return')return navigate('assessment/'+(state.researchReturn||'changes'));
  if(action==='event-match'&&state.role==='first'&&!state.submitted){state.eventMatch=el.dataset.value;record(state,data.owner,'Recorded event connection: '+state.eventMatch);save();return render();}
  if(action==='receive-evidence'){if(!receiveEvidence(state))return;state.researchTab='evidence';state.researchReturn='review';state.analysisPane='evidence';state.analysisStage='residual';state.analysisReturn='review';save();showDialog(insightDrawer(runtimeData(),state,{stage:'residual'}));dialog.classList.add('source-drawer','insight-drawer');return;}
  if(action==='evidence-revise'){if(!reviseFromEvidence(state,data))return;save();navigate('assessment/controls');return notify('Owner draft created. Review the wording and reconfirm changed conclusions.');}

  if(action==='intelligence-tab'){state.intelligenceTab=el.dataset.tab;state.analysisPane=el.dataset.tab;state.intelligenceSignal='';save();render();return;}
  if(action==='intelligence-signal'){state.intelligenceTab='signals';state.analysisPane='signals';state.intelligenceSource='';state.intelligenceSignal=el.dataset.signal;save();render();const target=document.getElementById(state.intelligenceSignal);target?.focus({preventScroll:true});target?.scrollIntoView({block:'center',behavior:'instant'});return;}
  if(action==='intelligence-return')return navigate('assessment/'+(state.analysisReturn||el.dataset.stage||'inherent'));
  if(action==='ai-review-question'&&state.role==='second'&&state.submitted&&!state.reviewed&&state.challengeStatus!=='open'){
    const reviewData=runtimeData(),prompt=analysisPrompts(reviewData,state,'review')[0];if(!prompt)return showDialog('<h2 id="dialog-title">No prepared question covers this risk</h2><p>Check the linked evidence and write your own question for this risk.</p>');
    return showDialog(`<span class="label">AI review draft</span><h2 id="dialog-title">A question grounded in the evidence.</h2><p>${esc(prompt.question)}</p><div class="button-group">${prompt.sourceIds.map(id=>button(esc(runtimeData().sources.find(source=>source.id===id)?.title||id),'source',`class="button" data-source="${esc(id)}"`)).join('')}</div><p class="small muted">Using this draft replaces the question in your editor. Review and edit it before sending.</p>${button('Use this question','use-review-question','class="button primary"')}`);
  }
  if(action==='use-review-question'&&state.role==='second'&&state.submitted&&!state.reviewed&&state.challengeStatus!=='open'){
    const reviewData=runtimeData(),prompt=analysisPrompts(reviewData,state,'review')[0];if(!prompt)return showDialog('<h2 id="dialog-title">No prepared question covers this risk</h2><p>Check the linked evidence and write your own question for this risk.</p>');state.question=prompt.question;save();closeDialog();render();return notify('Question draft added. Review it before sending.');
  }
  if(action==='definitions')return definitions();
  if(action==='control-library')return showDialog(controlLibraryDialog(data,state));
  if(action==='owner-revision'&&state.role==='first'&&state.submitted){state.revisionCandidate='';return showDialog(ownerRevisionDialog(data,state));}
  if(action==='library-map'&&state.role==='first'){
    const id=el.dataset.control;
    if(state.risks[state.selectedRisk].controls.includes(id))return;
    if(state.submitted){state.revisionCandidate=id;return showDialog(ownerRevisionDialog(data,state,id));}
    state.mappingContext={mode:'add',controlId:''};state.mappingDraft={mode:'existing',controlId:id,applicability:'unassessed',rationale:''};
    return showDialog(mappingDialog(data,state,state.mappingContext));
  }
  if(action==='library-create'&&state.role==='first'&&!state.submitted){state.mappingContext={mode:'add',controlId:''};state.mappingDraft={mode:'create',applicability:'unassessed'};return showDialog(mappingDialog(data,state,state.mappingContext));}
  if(action==='confirm-owner-revision'){
    const candidate=state.revisionCandidate;
    if(!startOwnerRevision(state,data))return notify('Only the assessment owner can start a revision of a submitted assessment.');
    state.revisionCandidate='';save();closeDialog();render(true);
    if(candidate){state.mappingContext={mode:'add',controlId:''};state.mappingDraft={mode:'existing',controlId:candidate,applicability:'unassessed',rationale:''};showDialog(mappingDialog(data,state,state.mappingContext));}
    return notify('Owner revision started. The earlier version is preserved.');
  }
  if(action==='dashboard-filter'){state.dashboardFilter=el.dataset.filter;save();render();document.querySelector('.dash-queue')?.scrollIntoView({block:'nearest',behavior:'instant'});return;}
  if(action==='open-register'){state.dashboardFilter='all';save();if(route==='work'){render();focusRegister();}else{registerRequested=true;navigate('work');}return;}
  if(action==='heatmap-group')return showDialog(heatmapGroupDialog(state,Number(el.dataset.likelihood),Number(el.dataset.impact)));
  if(action==='open-risk'){if(!state.risks[el.dataset.risk]||state.risks[el.dataset.risk].removed)return;if(dialog.open)closeDialog();state.selectedRisk=el.dataset.risk;save();return navigate('assessment/'+(el.dataset.stage||'residual'));}
  if(action==='open-response'){state.selectedRisk=el.dataset.risk||state.selectedRisk;save();return navigate('assessment/response');}
  if(action==='edit-response'&&state.role==='first'&&!state.submitted){state.responseEditor=state.selectedRisk;save();return render(true);}
  if(action==='finish-response'||action==='discard-response'){
   if(action==='discard-response'){discardOptionalResponse(state);delete state.responseEditor;}
   const next=nextResponseRisk(state);if(next)state.selectedRisk=next.id;
   save();return navigate(next?'assessment/response':'assessment/review');
  }
  if(action==='save-risk-response'){
   if(!saveRiskResponse(state))return showValidation(responseErrors(state,state.selectedRisk),document.getElementById('main'));delete state.responseEditor;
   if(state.risks[state.selectedRisk].riskResponse.strategy==='accept'){save();return navigate('assessment/decision');}
   const next=nextResponseRisk(state);if(next)state.selectedRisk=next.id;save();navigate(next?'assessment/response':'assessment/review');return notify(next?'Response recorded. Review the next risk.':'Response recorded. Review the assessment before sending.');}
  if(action==='ai-response')return showDialog(responseDraftDialog(runtimeData(),state));
  if(action==='use-response-draft'&&state.role==='first'&&!state.submitted){if(!applyResponseDraft(runtimeData(),state,{replace:el.dataset.replace==='true'}))return notify('Choose a response approach before drafting.');closeDialog();save();render(true);return notify('Draft added. Review and record the response.');}
  if(action==='ai-change-brief')return showDialog(`<span class="label">AI change briefing · 2 sources</span><h2 id="dialog-title">The process changed after the test.</h2><div class="brief-timeline"><article><strong>September 15 · Control test</strong><p>25 standard-wire samples. The urgent route was outside the tested population.</p></article><article><strong>October 5 · Procedure change</strong><p>A new urgent exception route was introduced with supervisory approval.</p></article></div><p>Review the control conclusion and response before relying on the standard-route result for urgent requests.</p><div class="button-group">${button('Inspect control test','source','class="button" data-source="test"')}${button('Inspect procedure','source','class="button" data-source="procedure"')}</div>`);
  if(['mapping-add','mapping-edit','mapping-replace','mapping-ai-draft'].includes(action)&&state.role==='first'&&!state.submitted){const mode=action==='mapping-edit'?'edit':action==='mapping-replace'?'replace':'add';state.mappingContext={mode,controlId:el.dataset.control||''};state.mappingDraft={mode:action==='mapping-ai-draft'?'create':'existing'};if(action==='mapping-edit')state.mappingDraft.rationale=state.risks[state.selectedRisk].mappingRationale[el.dataset.control]||'';if(action==='mapping-ai-draft')Object.assign(state.mappingDraft,{aiBasis:'incident',name:'Independent contact verification',owner:data.team,purpose:'Verify urgent requests after contact changes',design:'Verify urgent requests using an independently established source after contact changes. Document the verification before release and test its operation.',rationale:'Addresses the risk from contact changes seen in the October near miss. This is a proposed design; evidence is still needed to show it is in place and works.'});return showDialog(mappingDialog(data,state,state.mappingContext));}
  if(action==='mapping-mode'){state.mappingDraft.mode=el.dataset.mode;state.mappingDraft.applicability='unassessed';return showDialog(mappingDialog(data,state,state.mappingContext));}
  if(action==='mapping-save'){state.editPanels??={};state.editPanels.mappings=true;const value=id=>document.getElementById('mapping-'+id)?.value||'',creating=el.dataset.mode==='create';const ok=saveMapping(data,state,{mode:el.dataset.operation,oldId:el.dataset.control,controlId:el.dataset.mode==='edit'?el.dataset.control:value('control'),rationale:value('rationale'),applicability:value('applicability')||undefined,control:creating?{basis:state.mappingDraft.aiBasis||null,name:value('name'),owner:value('owner'),purpose:value('purpose'),design:value('design')}:undefined});if(!ok)return notify('Complete the control details and coverage rationale. Choose an unmapped control.');closeDialog();save();render();return notify('Mapping saved. Reconfirm control and residual conclusions.');}
  if(action==='mapping-remove-review')return showDialog(removalDialog(data,state,el.dataset.control));
  if(action==='mapping-remove'){if(!removeMapping(state,el.dataset.control))return;closeDialog();save();render();return notify('Mapping removed. The control remains in the library.');}
  if(action==='version'){const content=versionDialog(data,state,el.dataset.version);if(content)return showDialog(content);return;}
  if(action==='close-dialog'||action==='dialog-back')return closeDialog();
  if(action==='reset')return showDialog(`<h2 id="dialog-title">Start a fresh walkthrough?</h2><p>This clears the current demo's local drafts and recorded decisions, restoring the initial synthetic scenario.</p><div class="button-group">${button('Reset demo','confirm-reset','class="button primary"')}${button('Keep working','close-dialog','class="button"')}</div>`);
  if(action==='confirm-reset'){state=createInitial(data);save();closeDialog();navigate('work');return notify('Workspace restored.');}
  if(action==='risk'){state.selectedRisk=el.dataset.risk;if(state.selectedRisk!=='unauthorized'&&['event','claims','options','evidence','research'].includes(state.analysisPane))state.analysisPane='overview';state.intelligenceSource='';state.intelligenceSignal='';save();return render();}
  if(action==='control'){state.selectedControl=el.dataset.control;save();render();const detail=document.querySelector('.cm-evidence');if(detail){detail.open=true;const parent=detail.closest('.ca-current-controls');if(parent)parent.open=true;detail.querySelector('summary')?.focus({preventScroll:true});detail.scrollIntoView({block:'nearest',behavior:'instant'});}return;}
  if(action==='control-rating-open')return openControlRatings(el.dataset.control);
  if(action==='open-process'){state.selectedRisk=el.dataset.risk;save();return navigate(el.dataset.risk==='unauthorized'?(state.submitted?'assessment/review':'assessment/changes'):'assessment/inherent');}
  if(['role-review','role-first','role-response'].includes(action)){if(new URLSearchParams(location.search).get('presenter')!=='1')return;state.role=action==='role-review'?'second':'first';save();return navigate('assessment/review');}
  if(action==='qualify'){const d=document.getElementById('qualification-details');d.open=true;d.querySelector('textarea').focus();return;}
  if(action==='confirm-scope'){const result=confirmScope(state,data);if(!result.ok)return notify(result.message);save();return navigate(earlierStep(state)?.route||'assessment/residual');}
  if(action==='confirm-inherent'&&state.role==='first'&&!state.submitted){if(!currentRiskValid('inherent'))return notify('Explain the likelihood and impact before confirming.');const r=state.risks[state.selectedRisk];r.inherentConfirmed=true;if(r.preparedBaseline)r.preparedBaseline.reviewedStages=[...new Set([...(r.preparedBaseline.reviewedStages||[]),'inherent'])];record(state,data.owner,`Confirmed inherent assessment for ${r.name}: ${band(score(r.inherent))} (${score(r.inherent)}).`);save();return navigate(earlierStep(state)?.route||'assessment/residual');}
  if(action==='confirm-controls'&&state.role==='first'&&!state.submitted){
   const r=state.risks[state.selectedRisk];
   if(mappingNeedsReview(data,state,r.id))return notify('Assess coverage for each newly mapped control before confirming. Use Edit mapping.');
   const missingRating=incompleteKeyControl(state,r);
   if(missingRating)return openControlRatings(missingRating.id);
   if(!r.controls.length&&!document.getElementById('no-controls-attest')?.checked)return notify('Confirm that no controls are mapped before continuing.');
   r.noControlsConfirmed=!r.controls.length;r.controlConclusion??={text:controlDefaults[r.id]};if(!r.controlConclusion.text.trim())return notify('Record your control conclusion before confirming.');r.controlsConfirmed=true;if(r.preparedBaseline)r.preparedBaseline.reviewedStages=[...new Set([...(r.preparedBaseline.reviewedStages||[]),'controls'])];record(state,data.owner,'Confirmed the control assessment and its evidence limitations.');save();return navigate(earlierStep(state)?.route||'assessment/residual');
  }
  if(action==='dependency'&&state.role==='first'&&!state.submitted){const value=el.dataset.decision;if(value==='qualified'&&state.qualification.trim().length<5)return notify('Add a short note or explain what is still unknown.');state.dependency=value;record(state,data.owner,`${value==='confirmed'?'Confirmed':value==='qualified'?'Qualified':'Dismissed'} the suggested shared-source relationship. Ratings unchanged.`);save();render();return notify('Your judgment is recorded. Risk ratings are unchanged.');}
  if(action==='confirm-residual'&&state.role==='first'&&!state.submitted){const basis=earlierStep(state);
    if(basis){navigate(basis.route);return notify('Confirm this step before confirming the remaining risk.');}
    if(!validRating(state.risks[state.selectedRisk].residual))return notify('Choose likelihood and impact before confirming the risk rating.');
    if(!currentRiskValid('residual')){const rating=state.risks[state.selectedRisk].residual;return showValidation(['likelihood','impact'].filter(d=>!rating[d+'Rationale']?.trim()||rating[d+'Rationale'].startsWith('Carried forward from the previous assessment. Review ')).map(d=>({field:'risk.residual.'+d+'Rationale',message:'Explain the '+d+' using the current evidence.'})),document.getElementById('main'));}
    const r=state.risks[state.selectedRisk];r.residualConfirmed=true;if(r.preparedBaseline)r.preparedBaseline.reviewedStages=[...new Set([...(r.preparedBaseline.reviewedStages||[]),'residual'])];r.lastConfirmedResidual=structuredClone(r.residual);record(state,data.owner,`Confirmed residual assessment for ${r.name}: ${band(score(r.residual))} (${score(r.residual)}).`);
    const next=nextResponseRisk(state);
    if(next)state.selectedRisk=next.id;
    save();
    return navigate(next?'assessment/response':'assessment/review');
  }
  if(action==='submit'){if(!document.getElementById('owner-attest')?.checked)return focusFieldError(document.getElementById('owner-attest'),'Confirm the assessment before sending it.');if(!sendAssessment(state))return notify('Complete the assessment confirmations before sending.');save();render(true);return notify('Assessment submitted for independent review.');}
  if(action==='challenge'){if(!sendChallenge(state))return notify('A submitted assessment and a review question are needed.');save();render();return notify('Review question recorded. The owner can now respond.');}
  if(action==='prepared-response'&&state.role==='first'&&state.challengeStatus==='open'){
    const suggestion=replySuggestion(data,state);if(!suggestion)return notify('No response suggestion is available for this question.');
    state.replyDraft={question:state.question,clarification:state.reviewReturn?.rationale||'',text:suggestion.text};
    return showDialog(`<h2 id="dialog-title">Review response suggestion</h2><p>${esc(suggestion.text)}</p><p>Your current reply is preserved until you choose how to insert this suggestion.</p><div class="button-group">${button('Replace reply','insert-reply','class="button primary" data-mode="replace"')}${button('Append to reply','insert-reply','class="button" data-mode="append"')}${button('Cancel','close-dialog','class="button"')}</div>`);
  }
  if(action==='insert-reply'&&state.role==='first'&&state.challengeStatus==='open'&&state.replyDraft?.question===state.question&&(state.replyDraft.clarification||'')===(state.reviewReturn?.rationale||'')){state.replyUndo={before:state.response,question:state.question};state.response=el.dataset.mode==='append'?[state.response,state.replyDraft.text].filter(Boolean).join('\n\n'):state.replyDraft.text;delete state.replyDraft;state.reportConfirmed='';closeDialog();save();return render();}
  if(action==='undo-reply'&&state.role==='first'&&state.challengeStatus==='open'&&state.replyUndo?.question===state.question){state.response=state.replyUndo.before;delete state.replyUndo;state.reportConfirmed='';save();return render();}
  if(action==='respond'){if(!document.getElementById('response-attest')?.checked)return focusFieldError(document.getElementById('response-attest'),'Confirm your reply before sending it.');if(!respond(state))return notify(state.ownerRevisionRequired?'Complete a new assessment draft and send it for review before replying.':'Enter your reply before sending.');save();render(true);return notify('Reply and owner confirmation recorded.');}
  if(action==='ask-followup'){
    if(!askFollowup(state))return notify('Enter the question you want the owner to answer.');
    save();render(true);return notify('Follow-up sent. The owner will reply.');
  }
  if(action==='jump-decision'){const target=document.getElementById('decision-heading');target?.focus();target?.scrollIntoView({block:'start'});return;}
  if(action==='save-revision-answer'){save();render(true);return notify(state.revisionAnswer?.trim()?'Response saved. Review your summary and send the revised version.':'Enter a response to the reviewer.');}
  if(action==='jump-revision'){document.querySelector('[data-field="revisionAnswer"]')?.focus();return;}
  if(action==='complete-review'){
   const decision=document.querySelector('select[data-field="assessmentView"]');
   if(decision&&!state.assessmentView){decision.id||='assessment-decision';return focusFieldError(decision,'Choose your decision.');}
   const reason=document.querySelector('textarea[data-field="reviewerRationale"]');
   if(reason&&!state.reviewerRationale?.trim()){reason.id||='decision-reason';return focusFieldError(reason,'Explain what led to your decision.');}
   if(!document.getElementById('reviewer-attest')?.checked)return focusFieldError(document.getElementById('reviewer-attest'),'Confirm your decision before recording it.');if(!completeReview(state))return notify(!state.assessmentView?'Choose your assessment decision.':!state.reviewerRationale.trim()?'Explain your decision.':'Check the reply assessment and reviewer assignment before recording your decision.');save();render(true);return notify(state.reviewed?'Independent review complete. View the report for the recorded decision.':'Returned to the owner for clarification.');}
});
dialog.addEventListener('click',e=>{if(e.target===dialog)closeDialog();});
dialog.addEventListener('cancel',e=>{e.preventDefault();closeDialog();});
dialog.addEventListener('close',()=>{
  const target=lastFocus?.isConnected?lastFocus:lastFocus?.dataset?.action?[...app.querySelectorAll('[data-action]')].find(node=>Object.entries(lastFocus.dataset).every(([key,value])=>node.dataset[key]===value)):null;
  app.querySelector('.scope-risk-row.is-inspecting')?.classList.remove('is-inspecting');
  target?.focus({preventScroll:true});dialogOrigin=null;
});
const recordFiles=['workflow-demo','risk-intelligence','research-demo','assessment-context','control-assistance','assessment-signals'];
let workspaceLoad, navigationId=0;
async function loadWorkspace(){
 const records=await Promise.all(recordFiles.map(async name=>{
  const response=await fetch('/assets/data/'+name+'.json?v=20261118.1');
  if(!response.ok)throw new Error('Assessment records unavailable');
  return response.json();
 }));
 const [workflow,intelligence,research,context,assistance,signals]=records;
 data={...workflow,intelligence,research,context,assistance,signals,sources:[...workflow.sources,...intelligence.sources,...research.sources,...context.sources,...signals.sources]};
 state=createInitial(data);
 try{
  const raw=sessionStorage.getItem(STORAGE);
  if(raw){
   const result=migrateSession(JSON.parse(raw),data);
   if(result.error){sessionStorage.setItem(STORAGE+'-preserved',raw);recoveryAvailable=true;}
   else state=result.state;
  }
 }catch{
  try{
   const raw=sessionStorage.getItem(STORAGE);
   if(raw){sessionStorage.setItem(STORAGE+'-preserved',raw);recoveryAvailable=true;}
  }catch{storageWarning=true;}
 }
 if(!state.submitted){
  const known=new Set(state.evidenceContext.sources.map(source=>source.id));
  for(const source of signals.sources)if(!known.has(source.id))state.evidenceContext.sources.push(structuredClone(source));
 }
 ensureAssistance(state);
}
async function showRoute(focus=false){
 const visit=++navigationId;
 route=readRoute();
 if(route==='home'){
  mapLayout.disconnect();
  document.title='RCSA Accelerator · Overview';
  app.innerHTML=homeView();
  if(focus)focusPageHeading();
  return;
 }
 try{
  if(!state){
   app.innerHTML=`<main id="main" class="startup-state">${loadingState({title:'Preparing your workspace',description:'Loading assessment records.',heading:'h1'})}</main>`;
   workspaceLoad??=loadWorkspace().catch(error=>{workspaceLoad=null;state=null;throw error;});
   await workspaceLoad;
  }
  if(visit!==navigationId)return;
  route=readRoute();
  const previousRisk=history.state?.assessmentRisk;
  if(route.startsWith('assessment/')&&state.risks[previousRisk]&&!state.risks[previousRisk].removed)state.selectedRisk=previousRisk;
  render(focus);
  if(registerRequested&&route==='work'){registerRequested=false;focusRegister();}
 }catch(error){
  if(visit!==navigationId)return;
  app.innerHTML=`<main id="main" tabindex="-1" class="startup-state">${emptyState({title:'The workspace could not load',heading:'h1',description:'The assessment records are unavailable. Try loading the workspace again.',icon:'error',tone:'error',action:'<button type="button" class="button primary" data-retry-workspace>Try again</button>',details:error.message})}</main>`;
  app.querySelector('[data-retry-workspace]').addEventListener('click',()=>showRoute(true));
 }
}
window.addEventListener('hashchange',()=>{
 if(dialog.open){dialogParents.length=0;cancelScopeEdit(state);dialog.close();}
 showRoute(true);
});
showRoute();
