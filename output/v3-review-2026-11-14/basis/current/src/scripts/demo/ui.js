import {band, score} from './model.js?v=20261114.6';
export const esc = value => String(value ?? '').replace(/[&<>"']/g, c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
export function icon(name, size=18) {
  const paths = {arrow:'<path d="M4 12h16m-6-6 6 6-6 6"/>',chevron:'<path d="m9 5 7 7-7 7"/>',close:'<path d="m6 6 12 12M18 6 6 18"/>',check:'<path d="m5 12 4 4L19 6"/>',source:'<path d="M14 3H5v18h14V8zM14 3v6h5M8 13h8M8 17h6"/>',reset:'<path d="M3 10a9 9 0 1 1 1 8M3 4v6h6"/>',info:'<circle cx="12" cy="12" r="9"/><path d="M12 11v6m0-10v1"/>',menu:'<path d="M4 6h16M4 12h16M4 18h16"/>',back:'<path d="M20 12H4m6-6-6 6 6 6"/>'};
  return `<svg width="${size}" height="${size}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${paths[name] || paths.source}</svg>`;
}
export const button=(label,action,options='')=>`<button type="button" data-action="${action}" ${options}>${label}</button>`;
export const link=(label,action,options='')=>button(`${label} ${icon('arrow',16)}`,action,`class="text-link" ${options}`);
export const badge=(value)=>`<span class="risk-label ${band(value).toLowerCase()}"><i></i>${band(value)} <span class="score">${value}</span></span>`;
export const ratingBadge=r=>badge(score(r));
export const sourceLink=(label,id)=>button(`${esc(label)} ${icon('source',15)}`,'source',`class="source-link" data-source="${id}"`);
export function field(label, key, value, {area=false, help='', type='text', readOnly=false}={}) {
  const id='field-'+key.replaceAll('.','-');
  return `<label class="field" for="${id}"><span>${esc(label)}</span>${area ? `<textarea id="${id}" aria-label="${esc(label)}" ${help?`aria-describedby="${id}-help"`:""} data-field="${key}" rows="3" ${readOnly?'readonly':''}>${esc(value)}</textarea>` : `<input id="${id}" aria-label="${esc(label)}" ${help?`aria-describedby="${id}-help"`:""} data-field="${key}" type="${type}" value="${esc(value)}" ${readOnly?'readonly':''}>`}${help?`<small id="${id}-help">${esc(help)}</small>`:''}</label>`;
}
export const aiNote=(text,source='procedure')=>`<div class="ai-note"><span class="ai-mark" aria-hidden="true">AI</span><div><span class="attribution">AI insight</span><p>${esc(text)}</p></div>${sourceLink('View basis',source)}</div>`;
export function matrix(likelihood,impact) {
  const l=Number(likelihood), p=Number(impact);
  const selected=Number.isInteger(l)&&l>=1&&l<=5&&Number.isInteger(p)&&p>=1&&p<=5;
  const summary=`Risk matrix. Likelihood increases from 1 at the left to 5 at the right. Impact increases from 1 at the bottom to 5 at the top. ${selected?`Selected likelihood ${l} of 5, impact ${p} of 5; score ${l*p}, ${band(l*p)} risk.`:'No rating selected.'} Low: 1–4. Moderate: 5–9. Elevated: 10–15. High: 16–25.`;
  // Every cell has fixed vector geometry; the score marker is a separate overlay.
  const cells=Array.from({length:25},(_,i)=>{
    const y=5-Math.floor(i/5), x=i%5+1;
    return `<rect class="rmx-cell rmx-cell--${band(x*y).toLowerCase()}" data-likelihood="${x}" data-impact="${y}" x="${45+(x-1)*29}" y="${8+(5-y)*29}" width="27" height="27" rx="2"/>`;
  }).join('');
  const ticks=Array.from({length:5},(_,i)=>`<text class="rmx-tick rmx-tick--likelihood" x="${58.5+i*29}" y="170">${i+1}</text><text class="rmx-tick rmx-tick--impact" x="30" y="${137.5-i*29}" dominant-baseline="central">${i+1}</text>`).join('');
  const marker=selected?`<g class="rmx-selection" data-score="${l*p}" transform="translate(${58.5+(l-1)*29} ${21.5+(5-p)*29})"><circle r="11.5"/><text dominant-baseline="central">${l*p}</text></g>`:'';
  return `<div class="rmx-chart"><svg class="rmx-svg" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 200" width="200" height="200" role="img" aria-label="${esc(summary)}"><g aria-hidden="true">${cells}<path class="rmx-axis" d="M45 157H188m-4-3 4 3-4 3M38 151V8m-3 4 3-4 3 4"/>${ticks}<text class="rmx-axis-label" x="116.5" y="190">Likelihood</text><text class="rmx-axis-label" transform="translate(13 79.5) rotate(-90)" dominant-baseline="central">Impact</text>${marker}</g></svg></div>`;
}
export function formatDate(value) { return new Date(value+'T12:00:00').toLocaleDateString('en-US',{month:'short',day:'numeric',year:'numeric'}); }
