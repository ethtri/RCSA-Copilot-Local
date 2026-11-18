// Shared DOM behavior. Business state and authority stay in the model.
export function focusBookmark(root=document){
 const el=document.activeElement;if(!el||!root.contains(el))return null;
 return {id:el.id,data:{...el.dataset},tag:el.tagName,start:el.selectionStart,end:el.selectionEnd,scroll:window.scrollY};
}
export function restoreBookmark(mark,root=document){
 if(!mark)return;
 let el=mark.id?document.getElementById(mark.id):[...root.querySelectorAll('[data-action],[data-field],[data-ops-field],[data-risk-select],[data-analysis-pane],[data-sync-scenario]')].find(x=>x.tagName===mark.tag&&Object.entries(mark.data).every(([k,v])=>x.dataset[k]===v));
 if(!el){el=root.querySelector('main h1');if(el)el.tabIndex=-1;}
 if(el){el.focus({preventScroll:true});if(typeof mark.start==='number'&&el.setSelectionRange)try{el.setSelectionRange(mark.start,mark.end);}catch{} window.scrollTo({top:mark.scroll,behavior:'instant'});}
}
export function showValidation(message,root){
 const errors=Array.isArray(message)?message:[];
 root.querySelector('.validation-summary')?.remove();
 const summary=document.createElement('div');summary.className='validation-summary';summary.setAttribute('role','alert');summary.tabIndex=-1;summary.textContent=errors.length?errors.map(e=>e.message||e).join(' '):message;
 const fields=[...root.querySelectorAll('input:not([type=checkbox]):not([type=radio]),textarea,select')].filter(el=>!el.disabled&&!el.readOnly&&el.getClientRects().length);
 const missing=errors.length?fields.filter(el=>errors.some(e=>e.field===(el.dataset.field||el.dataset.opsField))):fields.filter(el=>(el.required||el.dataset.field||el.dataset.opsField)&&!el.value.trim());
 for(const [i,el] of missing.entries()){
  clearFieldError(el);
  const id=el.id||(el.id='invalid-field-'+i),label=el.getAttribute('aria-label')||el.closest('label')?.querySelector('span')?.textContent||'this field';
  el.setAttribute('aria-invalid','true');const error=document.createElement('small');error.id=id+'-error';error.className='field-error';error.textContent=errors.find(e=>e.field===(el.dataset.field||el.dataset.opsField))?.message||'Complete '+label.charAt(0).toLowerCase()+label.slice(1)+'.';
  el.after(error);el.setAttribute('aria-describedby',[el.getAttribute('aria-describedby'),error.id].filter(Boolean).join(' '));
 }
 root.prepend(summary);(missing[0]||summary).focus({preventScroll:true});(missing[0]||summary).scrollIntoView({block:'center',behavior:'instant'});
}
export function focusFieldError(el,message){
 if(!el)return;
 clearFieldError(el);
 const host=el.closest('fieldset')||el.closest('label')||el;
 const error=document.createElement('p');
 error.className='field-error';error.id=el.id+'-error';
 error.setAttribute('role','alert');error.textContent=message;
 host.after(error);
 el.setAttribute('aria-invalid','true');
 el.setAttribute('aria-describedby',[el.getAttribute('aria-describedby'),error.id].filter(Boolean).join(' '));
 el.focus({preventScroll:true});
 el.scrollIntoView({block:'center',behavior:'instant'});
}
export function clearFieldError(el){if(!el.matches('[aria-invalid]'))return;el.removeAttribute('aria-invalid');const id=el.id+'-error';document.getElementById(id)?.remove();el.setAttribute('aria-describedby',(el.getAttribute('aria-describedby')||'').split(' ').filter(x=>x!==id).join(' '));}
