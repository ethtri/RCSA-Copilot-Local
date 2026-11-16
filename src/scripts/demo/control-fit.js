import {preparedScopeMatches} from './scope-model.js?v=20261115.20';
import {esc,icon} from './ui.js?v=20261115.20';

const OPTIONS=Object.freeze({
 contactSource:[['same-record','Current customer-contact record'],['separate-source','Separate verified contact source']],
 workflow:[['manual','Manual payment workflow'],['case-system','Configurable case workflow']],
 staffing:[['shared-team','Shared operations team'],['separate-checker','Separate verification capacity']]
});
const DEFAULTS=Object.freeze({contactSource:'same-record',workflow:'manual',staffing:'shared-team'});
export function bankFitContext(s){
 const raw=s.controlAssistance?.bankContext||{};
 return Object.fromEntries(Object.entries(OPTIONS).map(([key,values])=>[key,values.some(([id])=>raw[key]===id)?raw[key]:DEFAULTS[key]]));
}
export function mutateControlFit(s,key,value){
 if(!key.startsWith('controlFit.'))return false;
 const field=key.slice(11);
 if(s.role!=='first'||s.submitted||!OPTIONS[field]?.some(([id])=>id===value))return false;
 s.controlAssistance??={};s.controlAssistance.bankContext={...bankFitContext(s),[field]:value};
 return true;
}
const preferredKind=(s,c)=>{const id=s.risks?.[s.selectedRisk]?.scenarioId||s.selectedRisk;return id==='unauthorized'?(c.contactSource==='separate-source'&&c.staffing==='separate-checker'&&c.workflow==='case-system'?'new':'enhance'):id==='details'?(c.workflow==='case-system'?'new':'enhance'):id==='cutoff'?(c.contactSource==='separate-source'&&c.staffing==='separate-checker'?'new':c.workflow==='case-system'?'enhance':'existing'):'enhance';};
export function explainControlFit(data,s,candidate){
 const c=bankFitContext(s),risk=s.risks?.[s.selectedRisk],id=risk?.scenarioId||risk?.id,kind=candidate.kind;
 if(!preparedScopeMatches(s)||!risk||id==='owner-defined'||risk.extensions?.length)return {recommended:false,label:'Needs individual review',reason:'The current scope needs an owner review before this prepared option can be compared.',requirements:[],evidence:'Review the definition and the evidence for the current risk.'};
 const independent=c.contactSource==='separate-source',workflow=c.workflow==='case-system',capacity=c.staffing==='separate-checker';
 let reason='',requirements=[],evidence='Test the changed design with the relevant payments before relying on it.';
 if(id==='unauthorized'){
  if(kind==='existing'){
   reason='Useful for checking the recipient and amount, but it does not resolve the sender-identity gap.';
   requirements=['Keep identity verification separate from payment-detail confirmation.'];
   evidence='The standard-payment test does not establish urgent-request identity verification.';
  }else if(kind==='enhance'){
   reason=workflow?'Improve the existing callback process and use the case workflow to retain verification and approval evidence.':'Improve the current callback process without starting a separate verification service.';
   requirements=[independent?'Confirm the separate contact source is approved, maintained and protected from the payment request.':'Agree a verified contact source separate from the amended customer-contact record.',workflow?'Confirm the case workflow can hold a release until required evidence is recorded.':'Keep a controlled verification log and hold requests staff cannot verify.'];
   evidence='Test urgent requests, recent contact changes and failed-verification holds.';
  }else{
   reason=capacity?'A separate verification role can provide a clear second step before an urgent payment is released.':'A separate verification step is an option, but the shared team needs enough capacity to run it before cutoff.';
   requirements=[independent?'Confirm the verifier uses the approved separate contact source.':'Establish and approve an independent verification source first.',capacity?'Assign accountability, absence cover and escalation for the separate checker.':'Assign a checker and absence cover; do not assume additional staff are available.',workflow?'Confirm the case workflow can record the check and block an incomplete release.':'Design a manual release hold or confirm a system change is feasible.'];
   evidence='Test independent-source use, release holds, urgent volumes and staff cover.';
  }
 }else if(id==='details'){
  if(kind==='existing'){
   reason='Customer confirmation can catch incorrect details. It still needs a clear link to the final instruction released.';
   requirements=['Confirm the channel supports the payments and amendments in scope.'];
   evidence='Obtain tests covering changed instructions, not only standard payments.';
  }else if(kind==='enhance'){
   reason='Add a recheck after an amendment to the current second-operator process.';
   requirements=[workflow?'Use the case history to record the amendment and recheck, subject to a workflow review.':'Record which instruction was checked and require a fresh check after an amendment.',capacity?'Assign the recheck to a separate checker with absence cover.':'Confirm the shared team can complete rechecks before release.'];
   evidence='Trace the instruction from the last amendment through recheck and release.';
  }else{
   reason=workflow?'An instruction-version check could use the existing case workflow, if the release step can validate the final version.':'A final instruction-version check needs a reliable record linking the checked instruction to release.';
   requirements=[workflow?'Confirm version history and release validation are supported; configuration is not assumed.':'Define a controlled version reference or confirm a workflow change is practical.','Agree who resolves a mismatch and when a payment must be held.'];
   evidence='Test late amendments, mismatched versions and blocked releases.';
  }
 }else if(id==='cutoff'){
  if(kind==='existing'){
   reason='Start by testing the existing monitoring and escalation process before adding a new backup design.';
   requirements=['Run a longer-outage scenario with peak payment volumes.','Confirm escalation timing, staff cover and customer communications.'];
   evidence='Record whether payments can still meet cutoff during a longer outage.';
  }else if(kind==='enhance'){
   reason=workflow?'Use the case workflow to raise an earlier outage alert and assign an owner before the queue becomes critical.':'Add a clear early escalation trigger to the current queue-monitoring process.';
   requirements=[workflow?'Confirm alert timing, routing and acknowledgement in the current workflow.':'Set a trigger the team can monitor and an escalation owner.','Check whether escalation leaves enough time to complete verification.'];
   evidence='Test the trigger against a prolonged outage and simultaneous peak demand.';
  }else{
   reason=capacity?'Separate verification capacity may support a backup process if it remains available during the same outage.':'A backup process needs staff and an approved verification route that remain available during an outage.';
   requirements=[independent?'Confirm the separate source remains available during the outage.':'Approve an alternative verification source and access path.',capacity?'Agree backup authority, absence cover and handoff to the main team.':'Identify available backup staff and test capacity; a plan is not extra staffing.'];
   evidence='Test outage independence, peak throughput and recovery back to the main process.';
  }
 }else{
  reason='Review this option against the current process and the available implementation evidence.';
  requirements=['Confirm systems, staffing, policy approval and the payments covered.'];
 }
 const recommended=candidate.disposition!=='dismissed'&&kind===preferredKind(s,c)&&!(id==='unauthorized'&&kind==='existing');
 return {recommended,label:recommended?'Suggested first':id==='unauthorized'&&kind==='existing'?'Limited fit for this gap':'Alternative to review',reason,requirements,evidence,owner:candidate.designDraft?.owner||data.team||'Payments Operations'};
}
export function rankControlOptions(data,s,items){
 return [...items].sort((a,b)=>Number(a.disposition==='dismissed')-Number(b.disposition==='dismissed')||Number(explainControlFit(data,s,b).recommended)-Number(explainControlFit(data,s,a).recommended));
}
export function controlFitView(data,s){
 const c=bankFitContext(s),locked=s.role!=='first'||s.submitted;
 const fields=[['contactSource','Contact information'],['workflow','Payment workflow'],['staffing','Verification staffing']];
 return `<details class="control-fit-context" data-edit="control-fit-context" ${s.editPanels?.['control-fit-context']?'open':''}><summary>${icon('info',16)}<span>Bank context</span><small>${c.workflow==='manual'?'Manual workflow':'Case workflow'} · ${c.staffing==='shared-team'?'shared team':'separate checker'}</small></summary><div class="control-fit-context-body"><p>Use these working assumptions to compare options. Confirm them with the process owner before changing a control.</p><div class="control-fit-fields">${fields.map(([key,label])=>`<label class="field"><span>${label}</span><select data-field="controlFit.${key}" aria-label="${label}" ${locked?'disabled':''}>${OPTIONS[key].map(([id,text])=>`<option value="${id}" ${c[key]===id?'selected':''}>${text}</option>`).join('')}</select></label>`).join('')}</div><p class="small muted">Changing an assumption updates the suggestions only. It does not change controls, ratings or work records.</p></div></details>`;
}
export function controlFitDetails(data,s,candidate){
 const fit=explainControlFit(data,s,candidate);
 return `<section class="control-fit-detail" aria-label="Fit for the bank"><h3>Fit for the bank</h3><p>${esc(fit.reason)}</p><dl><div><dt>Owner to involve</dt><dd>${esc(fit.owner||'Owner to confirm')}</dd></div><div><dt>Before using this option</dt><dd><ul>${fit.requirements.map(text=>`<li>${esc(text)}</li>`).join('')}</ul></dd></div><div><dt>Evidence needed</dt><dd>${esc(fit.evidence)}</dd></div></dl></section>`;
}
