import {controlDefaults} from './assessment-content.js?v=20261114.6';
import {responseComplete,RESPONSE_OPTIONS} from './responses.js?v=20261114.6';
export const STAGES = ['changes', 'inherent', 'controls', 'residual', 'review'];
export const LABELS = ['What changed', 'Inherent risk', 'Controls', 'Residual risk & response', 'Review'];
export const LIKELIHOOD = ['Rare', 'Unlikely', 'Possible', 'Likely', 'Almost certain'];
export const IMPACT = ['Minor', 'Moderate', 'Significant', 'Major', 'Severe'];
export const score = rating => Number(rating.likelihood) * Number(rating.impact);
export function band(value) { return value <= 4 ? 'Low' : value <= 9 ? 'Moderate' : value <= 15 ? 'Elevated' : 'High'; }
export function createInitial(data) {
  return {version: 2, dashboardFilter:'all', customControls:[], role: 'first', selectedRisk: 'unauthorized', selectedControl: 'callback', scope: false,
    dependency: '', qualification: '', submitted: false, challengeStatus: 'none', reviewed: false,
    response: data.responses.initial, question: data.challenge, reviewerRationale: '', assessmentView:'',
    responseSufficient: 'yes', reviewReturn:null, handoff: '', action: structuredClone(data.action),
    risks: Object.fromEntries(data.risks.map(r => [r.id, {...structuredClone(r), controlConclusion:{text:controlDefaults[r.id]}, mappingRationale:Object.fromEntries(r.controls.map(id=>[id,data.controls.find(c=>c.id===id)?.purpose||''])), noControlsConfirmed:false, lastConfirmedResidual:structuredClone(r.id==='unauthorized'?r.prior:r.residual), riskResponse:{protection:r.id==='unauthorized'?'Require an independently established verification source before releasing urgent requests after contact changes.':r.id==='details'?'Link the checked instruction version to release and repeat the check after an amendment.':'Provide an approved fallback and early escalation for verification outages near cutoff.',protectionOwner:'Payments Operations',protectionDue:'2026-11-28',protectionStatus:'proposed',created:false,needsReview:false,strategy:'',rationale:'',owner:'Payments Operations',reviewDate:'2026-11-28'}, responseAction:{title:`Review controls for ${r.name.toLowerCase()}`,owner:'Payments Operations',due:'2026-11-28',evidence:'Document the control review, findings and supporting completion evidence.'},
      inherentConfirmed: r.id !== 'unauthorized', controlsConfirmed: r.id !== 'unauthorized', residualConfirmed: r.id !== 'unauthorized'}])),
    history: [], snapshots: [], reviewConclusions:[], revisionOf:null, versionNumber: 0};
}
export function actionComplete(s) { return !!s.action && !!s.action.title?.trim() && !!s.action.owner?.trim() && /^\d{4}-\d{2}-\d{2}$/.test(s.action.due) && s.action.due >= '2026-11-14' && !!s.action.evidence?.trim(); }
export function requirements(s) {
  const r = s.risks.unauthorized;
  return [{label:'Scope confirmed', done:s.scope}, {label:'Inherent assessment confirmed',done:r.inherentConfirmed},
    {label:'Control assessment confirmed',done:r.controlsConfirmed&&!Object.values(r.mappingApplicability||{}).some(x=>x.conclusion==='unassessed')}, {label:'Shared-source suggestion considered',done:!['callback','approval'].every(id=>r.controls.includes(id))||!!s.dependency},
    {label:'Residual assessment confirmed',done:r.residualConfirmed},
    ...Object.values(s.risks).filter(r=>r.id!=='unauthorized').map(r=>({label:`${r.name} assessment confirmed`,done:r.inherentConfirmed&&r.controlsConfirmed&&!Object.values(r.mappingApplicability||{}).some(x=>x.conclusion==='unassessed')&&r.residualConfirmed&&responseComplete(s,r.id)})),
    {label:'Required risk responses recorded',done:Object.keys(s.risks).every(id=>responseComplete(s,id))}];
}
export function currentRating(s, id) {
  const r = s.risks[id]; return r.residualConfirmed?r.residual:(r.lastConfirmedResidual||r.prior);
}
export function acceptanceStatus(s,id='unauthorized') {
  const r=s.risks[id];
  if(!r.riskResponse.created)return 'Response not yet recorded';
  if(!s.submitted)return 'Draft acceptance request';
  return r.residualConfirmed&&score(currentRating(s,id))>9?'Acceptance decision pending':'No above-tolerance acceptance required';
}
export function reportSignature(s) { return JSON.stringify([s.risks,s.submitted,s.reviewed,s.challengeStatus,s.versionNumber,s.dependency,s.qualification,s.action,s.reviewerRationale]); }
function snapshot(s) {
  s.snapshots ??= [];
  s.snapshots.push({version:s.versionNumber,risks:structuredClone(s.risks),action:structuredClone(s.action),customControls:structuredClone(s.customControls),dependency:s.dependency,qualification:s.qualification,handoff:s.handoff||draftHandoff(s),question:s.question,response:s.response,newEvidenceReceived:!!s.newEvidenceReceived,eventMatch:s.eventMatch||'Unvalidated',assessmentView:s.assessmentView,date:'Nov 14, 2026'});
}
export function draftHandoff(s) {
  const r = currentRating(s, 'unauthorized');
  const relationship = !['callback','approval'].every(id=>s.risks.unauthorized.controls.includes(id))?'The mapped controls have changed; the earlier shared-source finding is superseded.':s.dependency === 'confirmed' ? 'The shared contact source is confirmed.' : s.dependency === 'qualified' ? `The shared-source finding is qualified: ${s.qualification}` : s.dependency === 'dismissed' ? 'The owner dismissed the shared-source suggestion.' : 'The shared-source suggestion awaits owner judgment.';
  const v=s.risks.unauthorized.riskResponse;const response=v.created?`Response: ${RESPONSE_OPTIONS.find(o=>o[0]===v.strategy)?.[1]}. ${v.strategy==='accept'?acceptanceStatus(s)+'.':'Linked action remains open.'}`:'A risk response has not yet been recorded.';
  return `The urgent-route change requires review. ${relationship} Current confirmed residual risk is ${band(score(r))} (${score(r)}). ${response} Management disposition is tracked separately.`;
}
export function record(s, actor, text, detail='') { s.history.push({actor, text, detail, date:'Nov 14, 2026'}); }
export function startOwnerRevision(s,data) {
  if(s.role!=='first'||!s.submitted)return false;
  const base=s.versionNumber;
  s.reviewConclusions??=[];
  if(!s.reviewConclusions.some(v=>v.version===base))s.reviewConclusions.push({version:base,status:s.reviewed?'Reviewed':'In review',rationale:s.reviewerRationale,assessmentView:s.assessmentView,question:s.question,response:s.response,returned:structuredClone(s.reviewReturn||null)});
  s.revisionOf=base;s.submitted=false;s.reviewed=false;s.challengeStatus='none';s.reviewReturn=null;s.reviewerRationale='';s.assessmentView='';s.responseSufficient='yes';s.reportConfirmed='';
  s.question=data?.challenge||s.question;s.response=data?.responses.initial||s.response;
  record(s,'Alex Morgan',`Started an owner revision from version ${base}.`,'The earlier submission and review are preserved. Changed conclusions require renewed confirmation and owner attestation.');
  return true;
}
export function sendAssessment(s) {
  if(s.role !== 'first' || s.submitted || !requirements(s).every(x=>x.done)) return false;
  s.submitted = true; s.versionNumber++; s.reviewed = false;
  snapshot(s); record(s,'Alex Morgan',`Confirmed and submitted assessment version ${s.versionNumber}.`); return true;
}
export function sendChallenge(s) {
  if(s.role !== 'second' || !s.submitted || !s.question.trim() || s.reviewed) return false;
  s.challengeStatus = 'open';s.reviewReturn=null; record(s,'Jordan Lee','Raised a review question about test scope and the shared contact source.',s.question); return true;
}
export function responseCoverage(text) {
  return [
    {label:'Urgent requests and test population',done:/urgent/i.test(text) && /test|sample|population/i.test(text)},
    {label:'Recently changed contact records',done:/contact/i.test(text) && /chang|amend/i.test(text)},
    {label:'Independent verification source',done:/independent/i.test(text) && /source|verif/i.test(text)},
    {label:'Results and closure evidence',done:/result|closure|evidence|exception/i.test(text)}
  ];
}
export function respond(s) {
  if(s.role !== 'first' || s.challengeStatus !== 'open' || !s.response.trim() || !responseComplete(s,'unauthorized')) return false;
  s.challengeStatus = 'responded'; s.versionNumber++;
  snapshot(s);record(s,'Alex Morgan',`Responded and renewed owner attestation for version ${s.versionNumber}.`,s.response); return true;
}
export function completeReview(s) {
  if(s.role !== 'second' || !s.submitted || s.challengeStatus !== 'responded' || !s.reviewerRationale.trim() || !['agree','return'].includes(s.assessmentView)) return false;
  if(s.responseSufficient === 'return'||s.assessmentView==='return') { s.challengeStatus = 'open';s.reviewReturn={rationale:s.reviewerRationale,version:s.versionNumber};record(s,'Jordan Lee','Returned the response for clarification.',s.reviewerRationale); return true; }
  s.reviewed = true; s.challengeStatus = 'resolved';
  record(s,'Jordan Lee',`Completed review of version ${s.versionNumber}; ${s.risks.unauthorized.riskResponse.strategy==='accept'?acceptanceStatus(s).toLowerCase():'linked actions remain open'}.`); return true;
}
export function seedScene(data, scene) {
  const s = createInitial(data);
  if(scene === 'start') return s;
  s.scope = true; s.dependency = 'confirmed';
  s.risks.unauthorized.riskResponse={...s.risks.unauthorized.riskResponse,created:true,needsReview:false,strategy:'mitigate',rationale:'Test the urgent route and establish independent verification before reassessing the exposure.',owner:'Payments Operations',reviewDate:'2026-11-28'};
  Object.values(s.risks).forEach(r=>{r.inherentConfirmed=true;r.controlsConfirmed=true;r.residualConfirmed=true;r.lastConfirmedResidual=structuredClone(r.residual);});
  if(scene === 'discovery') {s.risks.unauthorized.residualConfirmed=false;s.dependency='';return s;}
  sendAssessment(s); s.role='second';
  if(scene === 'submitted') return s;
  sendChallenge(s); s.role='first';
  if(scene === 'challenge') return s;
  s.response=data.responses.revised;respond(s);s.role='second';s.assessmentView='agree';s.reviewerRationale='The revised plan addresses the requested scope. Completion evidence remains due.';
  if(scene === 'response') return s;
  completeReview(s);return s;
}
