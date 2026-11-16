import {preparedScopeMatches,scopeRecord} from './scope-model.js?v=20261115.20';
import {assessmentProjection,sourceRecords} from './model.js?v=20261115.20';
import {esc,icon,sourceLink} from './ui.js?v=20261115.20';

// Prepared classifications describe these sample records, not a bank's configured taxonomy.
const RISK_CONTEXT=Object.freeze({
 unauthorized:{type:'External fraud · customer impersonation',cause:'A false customer request or a change to customer-contact details could lead staff to act on an unauthorized instruction.',harm:'Payment loss, recovery work and disruption to the customer’s business.',scope:'Standard and urgent wire instructions, including requests after a customer-contact change.'},
 details:{type:'Payment processing · incorrect instructions',cause:'Manual entry or a later amendment could leave the payment details different from the customer’s verified instruction.',harm:'A misdirected payment, recovery work, delayed settlement and customer disruption.',scope:'Beneficiary and amount details from instruction entry through amendments and release.'},
 cutoff:{type:'Payment processing · delayed settlement',cause:'Processing peaks, verification delays or a service outage could leave too little time before cutoff.',harm:'Settlement on a later business day, service costs and disruption to the customer’s obligations.',scope:'Wire queues, verification and escalation before the processing cutoff.'}
});
const CONTROL_CONTEXT=Object.freeze({
 callback:{type:'Preventive · manual verification',frequency:'Before payment release; the procedure records an urgent-route exception.',population:'Wire requests checked against the registered customer contact.'},
 approval:{type:'Preventive · manual authorization',frequency:'Before payment release.',population:'Wire instructions and confirmation records reviewed by a separate supervisor.'},
 'details-check':{type:'Preventive · manual comparison',frequency:'When a second operator checks the entered payment details.',population:'Entered beneficiary and amount compared with the verified instruction.'},
 queue:{type:'Detective · monitoring and escalation',frequency:'Before processing cutoff; the monitoring interval is not recorded.',population:'Payments awaiting processing near cutoff.'},
 'customer-confirmation':{type:'Preventive · customer confirmation',frequency:'Before a standard wire is released.',population:'Standard-wire beneficiary and amount confirmations through the authenticated channel.'}
});
const CONTROL_DESIGNS=Object.freeze({
 callback:'A callback to the registered customer contact verifies the request before release. The urgent-route exception requires supervisory approval.',
 approval:'A separate supervisor reviews the instruction and confirmation against the customer-contact record before authorizing release.',
 'details-check':'A second operator compares entered beneficiary and amount against the verified instruction.',
 queue:'The queue is monitored before cutoff; delayed items are escalated to the duty supervisor.',
 'customer-confirmation':'The customer confirms beneficiary and amount through the authenticated payment channel before a standard wire is released. This supplements the operator entry check; it does not by itself establish independent identity verification for an urgent request.'
});
const rows=items=>`<dl class="record-details-grid">${items.map(([label,value])=>`<div><dt>${esc(label)}</dt><dd>${esc(value||'Not recorded')}</dd></div>`).join('')}</dl>`;
const disclosure=(kind,summary,body)=>`<details class="record-details ${kind}-record-details${kind==='control'?' cm-evidence':''}"><summary>${icon('info',16)}<span>${esc(summary)}</span></summary><div class="record-details-body">${body}</div></details>`;
function context(data,s){
 const projection=s.submitted?assessmentProjection(s,'current',data):null;
 return {projection,records:projection?.sources||sourceRecords(data,s),controls:projection?.controls||[...(data.controls||[]),...(s.customControls||[])],risks:projection?.risks||s.risks};
}
export function riskDetails(data,s,r){
 const c=context(data,s),risk=c.risks?.[r.id];
 if(s.submitted&&!c.projection)return disclosure('risk','Risk details','<p>The risk details were not preserved with this submission.</p>');
 const seeded=preparedScopeMatches(s)&&risk&&risk.scenarioId!=='owner-defined'&&!risk.extensions?.length?RISK_CONTEXT[risk.scenarioId||risk.id]:null;
 const controls=(risk?.controls||[]).map(id=>c.controls.find(x=>x.id===id)?.name||id);
 const sources=(risk?.sources||[]).map(id=>c.records.find(x=>x.id===id)).filter(Boolean);
 const source=(label,id)=>c.projection?sourceLink(label,id).replace('data-action="source"',`data-action="source" data-version="${Number(c.projection.version)}"`):sourceLink(label,id);
 return disclosure('risk','Risk details',`${rows([
 ['Risk ID',risk?.id],['Risk type',risk?.riskType||seeded?.type||'Not recorded for this scope'],['Assessment owner',risk?.owner||(c.projection?'Not preserved with this version':data.owner)||'Not recorded'],['Process',risk?.process||scopeRecord(s)?.process||'Not preserved'],['In scope',risk?.scope||seeded?.scope||'Review the current description and scope with the owner.'],['Possible causes',risk?.cause||risk?.causes||seeded?.cause||'Not recorded for this scope'],['What could happen',risk?.event||risk?.description],['Possible harm',risk?.harm||risk?.consequences||seeded?.harm||'Not recorded for this scope'],['Mapped controls',controls.join(' · ')||'None mapped'],['Systems and data',risk?.systems||'Named systems and data owners are not recorded.']
 ])}<p class="record-details-note">Risk type and scope describe this sample record. The bank’s own risk categories and system names can be recorded here.</p>${sources.length?`<div class="record-details-sources"><span class="label">Linked records</span>${sources.map(x=>source(x.title,x.id)).join('')}</div>`:''}`);
}
export function controlDetails(data,s,control,{summary}={}){
 const c=context(data,s);
 if(s.submitted&&!c.projection)return disclosure('control',summary||'Inspect '+control.name,'<p>The control definition and evidence were not preserved with this submission.</p>');
 const stored=c.controls.find(x=>x.id===control.id)||control,proposed=stored.proposed===true||String(stored.status||'').toLowerCase()==='proposed';
 const seed=!stored.definitionUnavailable&&!proposed&&stored.design===CONTROL_DESIGNS[stored.id]?CONTROL_CONTEXT[stored.id]:null;
 const test=!proposed&&c.records.find(x=>x.id===stored.test),basis=c.records.find(x=>x.id===stored.source);
 const mapped=Object.values(c.risks||{}).filter(r=>(r.controls||[]).includes(stored.id)).map(r=>r.name);
 const source=(label,id)=>c.projection?sourceLink(label,id).replace('data-action="source"',`data-action="source" data-version="${Number(c.projection.version)}"`):sourceLink(label,id);
 return disclosure('control',summary||'Inspect '+stored.name,`${rows([
 ['Control ID',stored.id],['Status',proposed?'Proposed · not implemented':stored.definitionUnavailable?'Definition not preserved':'Current library control'],['Control owner',stored.owner],['Control objective',stored.purpose],['Control type',stored.type||seed?.type||'Not recorded'],['When it runs',stored.frequency||seed?.frequency||'Not recorded'],['Payments covered by the design',stored.population||seed?.population||'Not recorded'],['How it works',stored.design],['Systems and information used',stored.informationSource||'See the control description. Named systems are not recorded.'],['Evidence to retain',stored.evidenceRetained||'Retention requirements are not recorded in this definition.'],['Exceptions and escalation',stored.exceptions||'See the control description; separate exception handling is not recorded.'],['Operating evidence',proposed?'No implementation or test evidence recorded.':stored.evidence],['Test scope and date',test?`${test.scope} · ${test.date}`:'No test population or period recorded.'],['Mapped risks',mapped.join(' · ')||'No risks mapped']
 ])}<p class="record-details-note">A design or a clean test sample does not prove that the control works for every payment. Risk-specific coverage is recorded in the risk link.</p><div class="record-details-sources">${basis?source(proposed?'Suggestion basis':'Control description',basis.id):''}${test&&test.id!==basis?.id?source('Test scope',test.id):''}</div>`);
}
