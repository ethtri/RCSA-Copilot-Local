import {controlDetails,riskDetails} from './record-details.js?v=20261116.3';
import {riskEntries,assessmentProjection} from './model.js?v=20261116.3';
import {controlAssistanceView} from './control-assistance-view.js?v=20261116.3';
import {controlConclusion} from './research.js?v=20261116.3';
import {contextualPrompt} from './risk-intelligence.js?v=20261116.3';
import {esc,icon,button,link,sourceLink} from './ui.js?v=20261116.3';
import {controlsLibrary,mappingApplicability,mappingNeedsReview} from './mappings.js?v=20261116.3';
import {controlRatingRow} from './control-ratings.js';

const locked=s=>s.role!=='first'||s.submitted;
const disabled=s=>locked(s)?'disabled':'';
const proposed=c=>String(c.status||'').toLowerCase()==='proposed'||c.proposed===true;
const library=(data,s)=>controlsLibrary(data,s);
const find=(data,s,id)=>library(data,s).find(c=>c.id===id);
const action=(text,name,s,attrs='',primary=false)=>button(text,name,`class="button ${primary?'primary':''}" ${disabled(s)} ${attrs}`);
export function controlRelationshipMap(r,controls,shared,judgment='',selectedControl=''){
 const label=judgment==='confirmed'?'Confirmed shared source':judgment==='dismissed'?'Shared-source suggestion dismissed':judgment==='qualified'?'Possible shared source · owner caveat':'Possible shared source · Suggested';
 const explanation=judgment==='confirmed'?'The owner confirmed that both checks use this record.':judgment==='dismissed'?'No shared-source conclusion is recorded. The original suggestion remains in the history.':judgment==='qualified'?'The owner recorded a caveat. Read the assessment before relying on this relationship.':'The procedure descriptions suggest a shared record. Owner judgment is still needed.';
 return `<div class="record-relationship-map ${shared?'has-shared-source':''}" data-judgment="${esc(judgment)}" role="group" aria-label="Recorded control relationships for ${esc(r.name)}">${shared&&judgment!=='dismissed'?'<svg class="record-map-wires" aria-hidden="true"></svg>':''}<div class="record-map-risk"><span class="label">Risk</span><strong>${esc(r.name)}</strong><span class="record-map-link-label">Mapped to</span></div><div class="record-map-controls" role="list" aria-label="Mapped controls">${controls.map(c=>`<div role="listitem" ${shared&&['callback','approval'].includes(c.id)?'data-shared-control':''}>${button(`<span class="record-map-node-kind">${proposed(c)?'Proposed · not implemented':'Mapped control'}</span><strong>${esc(c.name)}</strong><span class="record-map-node-owner">${esc(c.owner||'Owner not recorded')}</span><span class="record-map-open">Inspect control ${icon('chevron',15)}</span>`,'control',`class="record-map-control ${proposed(c)?'is-proposed':''}" data-control="${esc(c.id)}" aria-pressed="${selectedControl===c.id}"`)}</div>`).join('')}</div>${shared?`<div class="record-map-sources"><span class="label">${esc(label)}</span>${judgment==='dismissed'?'<strong>Customer-contact record</strong>':`<button type="button" class="shared-source-toggle" aria-pressed="false" data-action="highlight-shared-source">Customer-contact record ${icon('source',16)}</button>`}<p>${esc(explanation)}</p><div class="record-map-source-links">${controls.filter(c=>['callback','approval'].includes(c.id)&&c.source).map(c=>sourceLink(c.name+' description',c.source)).join('')}</div></div>`:''}</div><p class="record-map-note">This map shows recorded relationships. A mapping or proposed design does not establish that a control is in place or works.</p>`;
}
function coverageLabel(data,s,r,c){
 const value=mappingApplicability(data,s,r.id,c.id).conclusion;
 const label=value==='unassessed'?'Risk coverage needs your review':value==='limited'?'Limited risk coverage':value==='none'?'No current risk coverage':value==='covers'?(proposed(c)?'Expected coverage · proposed design':'Expected risk coverage'):'';
 return label?`<p class="mapped-coverage ${value==='unassessed'?'cm-coverage-pending':''}">${esc(label)}</p>`:'';
}
function mappedControlsOverview(data,s,r,controls){
 const readOnly=locked(s),groups=[{label:'Current controls',items:controls.filter(c=>!proposed(c))},{label:'Proposed controls',items:controls.filter(proposed)}];
 return `<section class="mapped-controls-overview" aria-label="Controls mapped to ${esc(r.name)}">
 <div class="mapped-controls-heading"><h2>Controls mapped to this risk</h2>${readOnly?'':action('Add a control','mapping-add',s)}</div>
 ${groups.filter(group=>group.items.length).map(group=>`<div class="mapped-controls-group"><h3>${group.label} <span>(${group.items.length})</span></h3>
 ${group.label==='Proposed controls'?'<p class="mapped-controls-note">Not implemented or tested. These provide no current protection.</p>':''}
 <ul>${group.items.map(c=>{
  const attrs=`data-control="${esc(c.id)}"`;
  return `<li><div><h4>${esc(c.name)}</h4><p>${esc(c.purpose||'Open the control record to review its purpose.')}</p>
  ${coverageLabel(data,s,r,c)}</div>
  <div class="mapped-control-actions">${button('View details','control',`class="button quiet" ${attrs} aria-label="View details: ${esc(c.name)}"`)}
  ${readOnly?'':`<details class="mapped-control-menu"><summary aria-label="Manage ${esc(c.name)}">Manage</summary><div>
   ${action('Edit risk link','mapping-edit',s,attrs)}${action('Replace','mapping-replace',s,attrs)}${action('Remove','mapping-remove-review',s,attrs)}
  </div></details>`}</div>${controlRatingRow(r,c,readOnly)}</li>`;
 }).join('')}</ul></div>`).join('')}
 ${!controls.length?'<p class="mapped-controls-note">No controls are mapped to this risk. Use <strong>Add a control</strong> to link an existing control or propose a new one.</p>':'<p class="mapped-controls-note">A risk link shows which controls to assess. It does not prove that they work.</p>'}</section>`;
}
export function controlsWorkspace(data,s){
  // Recorded control records resolve from the submitted context; incoming evidence is handled elsewhere.
  const recorded=s.submitted?assessmentProjection(s,'current',data):null;
  if(s.submitted&&!recorded)return `<section class="cm-workspace"><header class="page-heading"><h1>Recorded controls unavailable</h1><p>This submission has no preserved control context. It has not been reconstructed from the current library.</p></header></section>`;
  if(recorded){
    const selected=recorded.risks?.[s.selectedRisk]?s.selectedRisk:Object.keys(recorded.risks||{})[0];
    const definitions=recorded.controls||[],missing=[...new Set(Object.values(recorded.risks||{}).flatMap(r=>r.controls||[]))].filter(id=>!definitions.some(c=>c.id===id)).map(id=>({id,name:'Definition not preserved: '+id,definitionUnavailable:true,owner:'Owner not preserved',design:'This control definition was not preserved with the submission.',evidence:'Operating evidence was not preserved with the submission.'}));
    data={...data,controls:[...definitions,...missing],sources:recorded.sources||[],risks:Object.values(recorded.risks||{})};
    s={...s,selectedRisk:selected,risks:recorded.risks,customControls:[],controlAssistance:recorded.controlAssistance||{},dependency:recorded.dependency||'',qualification:recorded.qualification||''};
  }
  const r=s.risks[s.selectedRisk],controls=(r.controls||[]).map(id=>find(data,s,id)).filter(Boolean),shared=r.controls?.includes('callback')&&r.controls?.includes('approval');
  const c=controls.find(c=>c.id===s.selectedControl)||controls[0],readonly=locked(s),currentCount=controls.filter(c=>!proposed(c)).length,proposedCount=controls.length-currentCount,position=`${currentCount} current${proposedCount?' · '+proposedCount+' proposed':''}`;
  const mappedSuggestion=controls.find(c=>proposed(c)&&String(c.name).trim().toLowerCase()==='independent contact verification');
  const html=`<section class="cm-workspace"><header class="cm-heading"><div><h1>Assess controls</h1><p>Review the controls, check the evidence and record your assessment.</p></div>${readonly&&s.role==='first'?button('Start new draft','owner-revision','class="button primary"'):''}</header>
  ${s.submitted?`<div class="cm-version-note"><span>Version ${s.versionNumber} · ${s.reviewed?'Reviewed':'In review'}. ${s.role==='first'?'Start a new assessment draft to change control links.':`Control changes belong to ${esc(data.owner)}.`}</span>${button('Inspect submitted version','version',`class="text-link" data-version="${s.versionNumber}"`)}</div>`:s.revisionOf?`<div class="cm-version-note"><span>New draft · based on version ${s.revisionOf}</span>${button('Inspect prior version','version',`class="text-link" data-version="${s.revisionOf}"`)}</div>`:''}
  <nav class="cm-risks" aria-label="Risk under assessment"><label class="risk-select-mobile"><span>Risk</span><select data-risk-select aria-label="Risk under assessment">${riskEntries(s).map(x=>`<option value="${esc(x.id)}" ${r.id===x.id?'selected':''}>${esc(x.name)}</option>`).join('')}</select></label>${riskEntries(s).map(x=>button(esc(x.name),'risk',`class="cm-risk-tab ${r.id===x.id?'selected':''}" data-risk="${esc(x.id)}" aria-pressed="${r.id===x.id}"`)).join('')}</nav>
  ${mappedControlsOverview(data,s,r,controls)}
  ${riskDetails(data,s,r)}
  <div class="controls-working-grid controls-streamlined">${controlAssistanceView(data,s,{relationships:controls.length?controlRelationshipMap(r,controls,shared,s.dependency,s.selectedControl):''})}
  <section class="sheet control-owner-assessment"><h2>Your assessment</h2>${controlConclusion(data,s)}${mappingNeedsReview(data,s,r.id)?'<p class="cm-coverage-notice" role="status">Some risk links need your judgment. Use Manage → Edit risk link beside each control before confirming.</p>':''}${!controls.length?`<label class="attestation cm-empty-attest"><input id="no-controls-attest" type="checkbox" ${r.noControlsConfirmed?'checked':''} ${readonly?'disabled':''}> I confirm that no controls are currently mapped and will reflect this in the assessment.</label>`:''}</section></div>
  ${c?controlDetails(data,s,c):''}
  ${contextualPrompt(data,s,'controls')}<div class="step-footer">${link('Back to risk before controls','navigate','data-route="assessment/inherent"')}${readonly?'<span class="quiet-status">Assessment record · read-only</span>':action(`Confirm control assessment ${icon('arrow',16)}`,'confirm-controls',s,'',true)}</div></section>`;
  return recorded?html.replaceAll('data-action="source"',`data-action="source" data-version="${Number(recorded.version)}"`):html;
}
function dialogField(label,key,value,{area=false,required=true,readOnly=false}={}){
  return `<label class="field" for="mapping-${key}"><span>${esc(label)}</span>${area?`<textarea id="mapping-${key}" name="mapping-${key}" data-field="mapping.${key}" aria-label="${esc(label)}" rows="3" ${readOnly?'readonly':''} ${required?'required':''}>${esc(value)}</textarea>`:`<input id="mapping-${key}" name="mapping-${key}" data-field="mapping.${key}" aria-label="${esc(label)}" value="${esc(value)}" ${readOnly?'readonly':''} ${required?'required':''}>`}</label>`;
}
export function mappingDialog(data,s,{mode='add',controlId=''}={}){
  const r=s.risks[s.selectedRisk],draft=s.mappingDraft||{},editing=mode==='edit',replacing=mode==='replace',c=find(data,s,controlId),tab=draft.mode==='create'?'create':'existing';
  const choices=library(data,s).filter(c=>!r.controls.includes(c.id)), access={readOnly:locked(s)};
  const selected=draft.controlId||choices[0]?.id||'';
  const rationale=draft.rationale??(editing?r.mappingRationale?.[controlId]||c?.purpose||'':'');
  const current=editing?mappingApplicability(data,s,r.id,controlId).conclusion:'unassessed',applicability=draft.applicability??current;
  return `<div class="cm-mapping-dialog"><span class="label">${esc(r.name)}</span><h2 id="dialog-title">${editing?'Assess this control’s coverage':replacing?'Replace this risk link':'Link a control to this risk'}</h2><p>${editing?'Explain this control’s coverage for this risk. The shared control definition stays unchanged.':replacing?`Choose a replacement for ${esc(c?.name||'the selected control')}. The change is recorded together when you save.`:'Use a control already in the library, or propose a new one.'}</p>
  ${editing?`<div class="cm-dialog-current"><strong>${esc(c?.name)}</strong><span>${esc(c?.owner)}</span></div>`:`<div class="cm-dialog-tabs" role="group" aria-label="Control mapping approach">${button('Existing control','mapping-mode',`class="button ${tab==='existing'?'primary':''}" data-mode="existing" aria-pressed="${tab==='existing'}" ${disabled(s)}`)}${button('Create a control','mapping-mode',`class="button ${tab==='create'?'primary':''}" data-mode="create" aria-pressed="${tab==='create'}" ${disabled(s)}`)}</div>`}
  ${!editing&&tab==='existing'?`<label class="field" for="mapping-control"><span>Control from the library</span><select id="mapping-control" name="mapping-control" aria-label="Control from the library" data-field="mapping.controlId" ${!choices.length||locked(s)?'disabled':''}>${choices.length?choices.map(x=>`<option value="${esc(x.id)}" ${x.id===selected?'selected':''}>${esc(x.name)}${proposed(x)?' · Proposed':''}</option>`).join(''):'<option value="">All available controls are already mapped</option>'}</select></label>${!choices.length?'<p class="cm-dialog-note">Create a proposed control, or return to edit an existing mapping.</p>':''}`:''}
  ${!editing&&tab==='create'?`<p class="cm-proposed">New controls start as proposed, not implemented.</p>${dialogField('Control name','name',draft.name||'',access)}${dialogField('Accountable owner','owner',draft.owner||'',access)}${dialogField('What the control should achieve','purpose',draft.purpose||'',access)}${dialogField('Proposed design','design',draft.design||'',{...access,area:true})}`:''}
  ${dialogField('Why does this control fit the risk?','rationale',rationale,{...access,area:true})}<p class="cm-dialog-note">Describe the risk or cause addressed and any limits to the expected coverage.</p>
  <label class="field" for="mapping-applicability"><span>How well does the design address this risk?</span><select id="mapping-applicability" aria-label="How well does the design address this risk?" name="mapping-applicability" data-field="mapping.applicability" aria-describedby="mapping-coverage-note" ${disabled(s)}>${[...(current==='prepared'?[['prepared','Keep the prepared assessment']]:[]),['unassessed','Not yet assessed'],['covers','Design is expected to address this risk'],['limited','Limited coverage for this risk'],['none','No current coverage for this risk']].map(([value,label])=>`<option value="${value}" ${applicability===value?'selected':''}>${esc(label)}</option>`).join('')}</select></label><p id="mapping-coverage-note" class="cm-dialog-note">Record your risk-specific judgment, or leave it unassessed for later review. Judging the design does not prove that the control is in place or works. Proposed controls provide no current protection.</p>
  <div class="button-group">${action(editing?'Save mapping':replacing?'Replace mapping':tab==='create'?'Create and map proposed control':'Map selected control','mapping-save',s,`data-operation="${mode}" data-mode="${editing?'edit':tab}" data-control="${esc(controlId)}" ${!editing&&tab==='existing'&&!choices.length?'disabled':''}`,true)}${button('Cancel','close-dialog','class="button quiet"')}</div></div>`;
}
export function removalDialog(data,s,controlId){
  const r=s.risks[s.selectedRisk],c=find(data,s,controlId);
  return `<div class="cm-mapping-dialog"><span class="label">${esc(r.name)}</span><h2 id="dialog-title">Remove this mapping?</h2><p><strong>${esc(c?.name||'This control')}</strong> will no longer be mapped to this risk. Its definition and mappings to other risks are retained.</p><p class="cm-dialog-note">Review the remaining coverage and reconfirm the control assessment. Risk ratings stay unchanged until you assess them.</p><div class="button-group">${action('Remove mapping','mapping-remove',s,`data-control="${esc(controlId)}"`,true)}${button('Keep mapping','close-dialog','class="button"')}</div></div>`;
}
