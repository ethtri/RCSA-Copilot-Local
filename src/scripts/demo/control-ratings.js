import {CONTROL_RATING_DIMENSIONS,CONTROL_RATING_LABELS,isKeyControl} from './model.js?v=20261116.3';
import {button,esc,icon,sourceLink} from './ui.js?v=20261116.3';

const prompts={
 design:'Does the control address this risk?',
 operation:'Did the control work in practice?'
};
const ratingTones={'effective':'success','partially-effective':'warning','ineffective':'danger','insufficient-evidence':'neutral'};
const ratingValue=rating=>`<strong class="control-rating-value" data-tone="${ratingTones[rating]||'neutral'}">${esc(CONTROL_RATING_LABELS[rating]||'Not rated')}</strong>`;

export function controlRatingRow(risk,control,readOnly){
 if(!isKeyControl(risk,control))return '';
 const ratings=risk.controlEffectiveness?.[control.id];
 if(readOnly&&!ratings)return '';
 const name=readOnly?'View ratings':ratings?'Edit ratings':'Rate control';
 return `<div class="control-rating-row">
  <dl>${[['design','Design'],['operation','Operation']].map(([key,label])=>`<div><dt>${label}</dt><dd>${ratingValue(ratings?.[key]?.rating)}</dd></div>`).join('')}</dl>
  ${button(name+' '+icon('chevron',15),'control-rating-open',`class="text-link control-rating-action" data-control="${esc(control.id)}" aria-label="${name}: ${esc(control.name)}"`)}
 </div>`;
}

export function controlRatingEvidence(source,{offline=false,version,preview=false}={}){
 if(!source)return '';
 const reference=[source.date,source.scope].filter(Boolean).map(esc).join(' · ');
 const link=sourceLink(preview?'Read source':source.title,esc(source.id)).replace('data-action="source"',`data-action="source"${version?' data-version="'+Number(version)+'"':''}`);
 return `<div class="control-rating-evidence${preview?' control-rating-evidence--preview':''}">${offline?`<strong>${esc(source.title)}</strong>`:link}${reference?`<p class="small muted">${reference}</p>`:''}</div>`;
}

export function recordedControlRatings(risk,control,sources,options){
 const ratings=risk.controlEffectiveness?.[control.id];
 if(!ratings)return '';
 return `<dl class="control-rating-record">${Object.entries(CONTROL_RATING_DIMENSIONS).map(([key,label])=>{
  const {rating,sourceId,rationale}=ratings[key]||{};
  return `<div><dt>${label}</dt><dd>${ratingValue(rating)}${rationale?`<p>${esc(rationale)}</p>`:''}${controlRatingEvidence(sources.find(source=>source.id===sourceId),options)||'<p class="small muted">No source linked</p>'}</dd></div>`;
 }).join('')}</dl>`;
}

export function controlRatingDialog(risk,control,sources,{readOnly=false,version}={}){
 const ratings=risk.controlEffectiveness?.[control.id];
 const linked=new Set([control.source,control.test,...(risk.sources||[])]);
 const sourceGroups=[
  ['Linked records',sources.filter(source=>linked.has(source.id))],
  ['Other records',sources.filter(source=>!linked.has(source.id))]
 ];
 const fields=Object.entries(CONTROL_RATING_DIMENSIONS).map(([key,label])=>{
  const {rating='',sourceId='',rationale=''}=ratings?.[key]||{};
  const id=name=>`control-rating-${key}-${name}`;
  const attrs=name=>`id="${id(name)}" name="${key}.${name}" data-field="control-rating.${key}.${name}"`;
  return `<fieldset><legend>${label}</legend>
   <p class="muted rating-question" id="${id('question')}">${prompts[key]}</p>
   <label class="field" for="${id('rating')}"><span id="${id('rating-label')}">Rating</span><select ${attrs('rating')} aria-labelledby="${id('rating-label')}" aria-describedby="${id('question')}" required>
    <option value="">Choose a rating</option>
    ${Object.entries(CONTROL_RATING_LABELS).map(([value,text])=>`<option value="${value}" ${value===rating?'selected':''}>${text}</option>`).join('')}
   </select></label>
   <label class="field" for="${id('sourceId')}"><span id="${id('evidence-label')}">Evidence</span><select ${attrs('sourceId')} aria-labelledby="${id('evidence-label')}" data-rating-source="${key}">
    <option value="">Choose a source</option>
    ${sourceGroups.filter(([,records])=>records.length).map(([label,records])=>`<optgroup label="${label}">${records.map(source=>`<option value="${esc(source.id)}" ${source.id===sourceId?'selected':''}>${esc(source.title)}</option>`).join('')}</optgroup>`).join('')}
   </select></label>
   <div data-rating-preview="${key}" aria-live="polite">${controlRatingEvidence(sources.find(source=>source.id===sourceId),{preview:true})}</div>
   <label class="field" for="${id('rationale')}"><span id="${id('rationale-label')}">Why this rating?</span><textarea ${attrs('rationale')} aria-labelledby="${id('rationale-label')}" rows="3" required>${esc(rationale)}</textarea></label>
  </fieldset>`;
 }).join('');
 return `<section class="control-rating-dialog">
  <h2 id="dialog-title">${readOnly?'Control ratings':'Rate control'}</h2>
  <p class="control-rating-context"><strong>${esc(control.name)}</strong> · ${esc(risk.name)}</p>
  ${readOnly?recordedControlRatings(risk,control,sources,{version})||'<p>No effectiveness ratings recorded.</p>':`
   <p class="muted rating-guidance">If evidence is insufficient, say what’s missing. Link any source you reviewed.</p>
   <form id="control-rating-form" data-control="${esc(control.id)}" data-risk="${esc(risk.id)}" novalidate>
    <div class="control-rating-fields">${fields}</div>
    <footer class="control-rating-footer">${button('Cancel','close-dialog','class="button quiet"')}<button type="submit" class="button primary">Save ratings</button></footer>
   </form>`}
 </section>`;
}
