import {assessmentProjection} from './model.js?v=20261118.8';
import {button,esc} from './ui.js?v=20261118.8';

// Align words from both frozen submissions. Bound memory for long pasted rationales.
function changedPhrases(before,after){
  const words=text=>text.match(/\S+\s*/g)||[];
  const left=words(before),right=words(after);
  if(left.length*right.length>160000)return [before,after].map(text=>esc(text));
  const matches=Array.from({length:left.length+1},()=>new Uint32Array(right.length+1));
  for(let i=left.length-1;i>=0;i--)for(let j=right.length-1;j>=0;j--){
    matches[i][j]=left[i].trimEnd()===right[j].trimEnd()
      ?1+matches[i+1][j+1]:Math.max(matches[i+1][j],matches[i][j+1]);
  }
  const previous=[],revised=[];
  let i=0,j=0;
  while(i<left.length||j<right.length){
    if(i<left.length&&j<right.length&&left[i].trimEnd()===right[j].trimEnd()){
      previous.push(esc(left[i++]));revised.push(esc(right[j++]));
    }else if(i<left.length&&(j===right.length||matches[i+1][j]>=matches[i][j+1])){
      previous.push(`<mark>${esc(left[i++])}</mark>`);
    }else revised.push(`<mark>${esc(right[j++])}</mark>`);
  }
  return [previous.join(''),revised.join('')];
}

function sourceLinks(version,risk){
  const sources=version.sources.filter(item=>risk?.sources?.includes(item.id));
  return sources.map(item=>button(esc(item.title),'source',`class="source-link" data-version="${Number(version.version)}" data-source="${esc(item.id)}"`)).join('');
}

export function revisionComparison(state,current){
  if(current.draft||current.version<2)return '';
  const previous=assessmentProjection(state,Number(current.version)-1);
  if(!previous)return '';
  const entries=[];
  for(const id of new Set([...Object.keys(previous.risks),...Object.keys(current.risks)])){
    const a=previous.risks[id],b=current.risks[id],name=esc(b?.name||a?.name);
    if(!a||a.removed||!b||b.removed){
      if(Boolean(a&&!a.removed)!==Boolean(b&&!b.removed))entries.push(`<p><strong>${name}</strong> · ${b&&!b.removed?'Added to scope':'Removed from scope'}</p>`);
      continue;
    }
    const changes=[];
    for(const stage of ['inherent','residual'])for(const dimension of ['likelihood','impact']){
      const key=dimension+'Rationale',before=a[stage]?.[key]||'',after=b[stage]?.[key]||'';
      if(before===after)continue;
      const columns=changedPhrases(before,after).map((html,i)=>`<div><strong>${i?'Revised':'Previous'} · v${Number(i?current.version:previous.version)}</strong><p>${html||'No recorded rationale'}</p></div>`).join('');
      changes.push(`<h4>${stage==='inherent'?'Before':'After'} controls · ${dimension}</h4><div class="revision-columns">${columns}</div>`);
    }
    for(const stage of ['inherent','residual']){
      const position=r=>[r[stage]?.likelihood,r[stage]?.impact].join(' × ');
      if(position(a)!==position(b))changes.push(`<p><strong>${stage==='residual'?'After':'Before'} controls</strong> · ${esc(position(a))} → ${esc(position(b))}</p>`);
    }
    const describe=value=>Array.isArray(value)?value.join(', '):String(value??'None');
    function changedField(label,before,after){
      if(describe(before)===describe(after))return;
      changes.push(`<p><strong>${esc(label)}</strong> · ${esc(describe(before))} → ${esc(describe(after))}</p>`);
    }
    const plan=(v,r)=>r.id==='unauthorized'?v.action:r.responseAction;
    changedField('Control conclusion',a.controlConclusion?.text,b.controlConclusion?.text);
    changedField('Controls',a.controls,b.controls);
    changedField('Supporting records',a.sources,b.sources);
    for(const [key,label] of Object.entries({title:'Action',owner:'Action owner',due:'Action due',evidence:'Evidence needed'})){
      changedField(label,plan(previous,a)?.[key],plan(current,b)?.[key]);
    }
    for(const [label,before,after] of [
      ['Control ratings',a.controlEffectiveness,b.controlEffectiveness],
      ['Risk coverage',a.mappingApplicability,b.mappingApplicability],
      ['Risk response',a.riskResponse,b.riskResponse]
    ]){
      if(JSON.stringify(before)!==JSON.stringify(after))changes.push(`<p><strong>${label}</strong> · Updated in version ${current.version}</p>`);
    }
    if(changes.length)entries.push(`<article><h3>${name}</h3>${changes.join('')}<details><summary>Supporting evidence by version</summary>${[previous,current].map((v,i)=>`<div><strong>Version ${Number(v.version)}</strong> ${sourceLinks(v,i?b:a)||'No preserved sources'}</div>`).join('')}</details></article>`);
  }
  return `<section class="sheet revision-comparison"><h2>Changes since the previous submission</h2><p>Version ${Number(previous.version)} to version ${Number(current.version)} · ${esc(current.assessmentScope?.owner||'Owner not recorded')}</p>${entries.join('')||'<p>The compared risk records are unchanged.</p>'}</section>`;
}
