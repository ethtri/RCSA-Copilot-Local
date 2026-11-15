// Bounded suggestions for the simulated workspace. Unknown questions stay editable.
const normalize=value=>String(value||'').toLowerCase().replace(/[^a-z0-9 ]/g,'').replace(/\s+/g,' ').trim();
export function replySuggestion(data,s){
 if(s.reviewReturn)return null;
 const question=normalize(s.question);
 if(question===normalize(data.challenge))return {text:data.responses.revised,kind:'scope'};
 if(/^who owns (?:the )?(?:november 28 |nov 28 )?testing action$/.test(question))return {text:`${s.action.owner} owns the testing action: ${s.action.title}. The recorded due date is ${s.action.due}.`,kind:'owner'};
 return null;
}
export function replyCoverage(data,s,scopeCoverage){
 if(s.reviewReturn)return [];
 const suggestion=replySuggestion(data,s);
 if(suggestion?.kind==='scope')return scopeCoverage(s.response);
 if(suggestion?.kind==='owner')return [{label:'Recorded action owner',done:!!s.action.owner&&s.response.toLowerCase().includes(s.action.owner.toLowerCase())}];
 return [];
}
