import {band, score} from './model.js?v=20261116.3';
export const esc = value => String(value ?? '').replace(/[&<>"']/g, c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const ICON_PATHS = Object.freeze({
  insight:'<path d="m12 3 2.4 6.6L21 12l-6.6 2.4L12 21l-2.4-6.6L3 12l6.6-2.4L12 3Z"/><path d="M20 2v4m-2-2h4"/>',
  arrow:'<path d="M4 12h16m-6-6 6 6-6 6"/>',chevron:'<path d="m9 5 7 7-7 7"/>',close:'<path d="m6 6 12 12M18 6 6 18"/>',check:'<path d="m5 12 4 4L19 6"/>',source:'<path d="M14 3H5v18h14V8zM14 3v6h5M8 13h8M8 17h6"/>',reset:'<path d="M3 10a9 9 0 1 1 1 8M3 4v6h6"/>',info:'<circle cx="12" cy="12" r="9"/><path d="M12 11v6m0-10v1"/>',menu:'<path d="M4 6h16M4 12h16M4 18h16"/>',back:'<path d="M20 12H4m6-6-6 6 6 6"/>',
  clock:'<circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/>',wait:'<circle cx="12" cy="12" r="9"/><path d="M9 8v8m6-8v8"/>',sync:'<path d="M20 7v5h-5M4 17v-5h5M5.5 7a7.5 7.5 0 0 1 12.6-2L20 7M4 17l1.9 2A7.5 7.5 0 0 0 18.5 17"/>',warning:'<path d="m12 3 10 18H2L12 3Z M12 9v5m0 3v.1"/>',error:'<circle cx="12" cy="12" r="9"/><path d="m9 9 6 6m0-6-6 6"/>',empty:'<path d="m3 12 3-7h12l3 7v7H3V12Zm0 0h5l2 3h4l2-3h5"/>',add:'<path d="M12 5v14M5 12h14"/>',download:'<path d="M12 3v12m-5-5 5 5 5-5M4 17v4h16v-4"/>',print:'<path d="M7 8V3h10v5M7 17H3V8h18v9h-4M7 14h10v7H7v-7ZM17 11h.1"/>',help:'<circle cx="12" cy="12" r="9"/><path d="M9.5 9a2.5 2.5 0 0 1 5 0c0 2-2.5 2-2.5 4m0 3v.1"/>',draft:'<circle cx="12" cy="12" r="8" stroke-dasharray="3 3"/>',return:'<path d="m8 4-5 5 5 5M3 9h11a6 6 0 0 1 0 12"/>',blocked:'<circle cx="12" cy="12" r="9"/><path d="m6 18 12-12"/>',dashboard:'<path d="M3 3h7v7H3V3Zm11 0h7v7h-7V3ZM3 14h7v7H3v-7Zm11 0h7v7h-7v-7Z"/>',assessment:'<path d="M9 4H5v17h14V4h-4M9 3h6v4H9V3Zm-1 9 2 2 5-5M8 18h7"/>',report:'<path d="M14 3H5v18h14V8zM14 3v6h5M8 17v-3m4 3v-5m4 5v-2"/>',shield:'<path d="m12 3 8 3v6c0 5-8 9-8 9s-8-4-8-9V6l8-3Zm-4 9 3 3 5-6"/>',history:'<path d="M3 11a9 9 0 1 1 2 7M3 5v6h6m3-4v5l3 2"/>',external:'<path d="M14 3h7v7m0-7-10 10M10 3H3v18h18v-7"/>',eye:'<path d="M2 12s4-7 10-7 10 7 10 7-4 7-10 7S2 12 2 12Z"/><circle cx="12" cy="12" r="3"/>'
});
export const ICON_NAMES=Object.freeze(Object.keys(ICON_PATHS));
export function icon(name, size=18) {
  const approved=Object.hasOwn(ICON_PATHS,name),key=approved?name:'help',dimension=Number.isFinite(Number(size))?Math.max(10,Math.min(48,Number(size))):18;
  return `<svg class="product-icon" data-icon="${key}" ${approved?'':'data-icon-fallback="true" '}width="${dimension}" height="${dimension}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" focusable="false">${ICON_PATHS[key]}</svg>`;
}
export const RISK_BANDS=Object.freeze({
  low:Object.freeze({label:'Low',min:1,max:4,ink:'#155239',fill:'#cde5d6',border:'#a8cbb5'}),
  moderate:Object.freeze({label:'Moderate',min:5,max:9,ink:'#704e10',fill:'#f6dfac',border:'#dcc184'}),
  elevated:Object.freeze({label:'Elevated',min:10,max:15,ink:'#783b20',fill:'#eeb694',border:'#d49973'}),
  high:Object.freeze({label:'High',min:16,max:25,ink:'#59201c',fill:'#d68e86',border:'#b96961'})
});
export const STATUS_TONES=Object.freeze({
  neutral:Object.freeze({ink:'#465950',fill:'#f1f4f2',border:'#ccd7d0'}),progress:Object.freeze({ink:'#26536b',fill:'#eef4f8',border:'#bfd0dc'}),success:Object.freeze({ink:'#155239',fill:'#eef5ef',border:'#c4d9cb'}),warning:Object.freeze({ink:'#78500c',fill:'#fff4d9',border:'#e5cd8e'}),danger:Object.freeze({ink:'#8d3027',fill:'#fff0ed',border:'#e4b4ac'})
});
const STATUS_DEFINITIONS=Object.freeze({
  'refresh-due':['Refresh due','warning','clock'],'response-needed':['Response needed','warning','warning'],'changes-requested':['Changes requested','warning','return'],'awaiting-review':['Awaiting review','progress','clock'],'needs-confirmation':['Needs confirmation','warning','warning'],'evidence-needed':['Evidence needed','warning','warning'],'scope-to-review':['Scope to review','warning','info'],'evidence-received':['Evidence received','progress','source'],'evidence-requested':['Evidence requested','progress','clock'],'follow-up-due':['Follow-up due','warning','clock'],deferred:['Deferred','neutral','clock'],'ready-to-submit':['Ready to submit','success','check'],'refresh-in-progress':['Refresh in progress','progress','sync'],'reply-needed':['Reply needed','warning','return'],'reply-received':['Reply received','progress','source'],'draft-request':['Draft request','neutral','draft'],'acceptance-approved':['Acceptance approved','success','check'],'acceptance-expired':['Acceptance expired','warning','clock'],'approval-expired':['Approval expired','warning','clock'],'review-completed':['Review completed','success','check'],
  superseded:['Superseded','neutral','history'],requested:['Requested','progress','clock'],received:['Received','progress','source'],'not-sent':['Not sent','neutral','draft'],'returned-for-changes':['Returned for changes','warning','return'],
  draft:['Draft','neutral','draft'],'not-recorded':['Not recorded','neutral','empty'],'not-assessed':['Not assessed','neutral','draft'],'not-required':['Not required','neutral','info'],planned:['Planned','neutral','clock'],pending:['Pending','progress','clock'],waiting:['Waiting','progress','clock'],queued:['Queued','progress','clock'],submitted:['Submitted','progress','clock'],'in-review':['In review','progress','clock'],'in-progress':['In progress','progress','sync'],'evidence-submitted':['Evidence submitted','progress','source'],'awaiting-decision':['Awaiting decision','progress','clock'],syncing:['Syncing','progress','sync'],connected:['Connected','success','check'],imported:['Imported','success','check'],confirmed:['Confirmed','success','check'],reviewed:['Reviewed','success','check'],approved:['Approved','success','check'],closed:['Closed','success','check'],complete:['Complete','success','check'],completed:['Completed','success','check'],synced:['Synced','success','check'],synchronized:['Synchronized','success','check'],returned:['Returned for changes','warning','return'],'needs-review':['Needs review','warning','warning'],'needs-attention':['Needs attention','warning','warning'],attention:['Needs attention','warning','warning'],paused:['Paused','warning','wait'],expired:['Expired','warning','clock'],conflict:['Conflict','warning','warning'],readiness:['Readiness check','neutral','info'],blocked:['Blocked','danger','blocked'],failed:['Failed','danger','error'],error:['Error','danger','error'],declined:['Declined','danger','blocked']
});
export function statusBadge(status,{label='',title='',className=''}={}){
  const key=String(status||'not-recorded').trim().toLowerCase().replace(/[\s_]+/g,'-'),definition=STATUS_DEFINITIONS[key]||[String(status||'Not recorded').replace(/[-_]+/g,' '),'neutral','help'];
  return `<span class="pv-status pv-status--${definition[1]}${className?' '+esc(className):''}" data-status="${esc(key)}"${title?` title="${esc(title)}"`:''}>${icon(definition[2],15)}<span>${esc(label||definition[0])}</span></span>`;
}
// This one CSS source is installed by the app and embedded in standalone reports.
export const BADGE_CSS=`:root{${Object.entries(RISK_BANDS).flatMap(([key,value])=>['ink','fill','border'].map(role=>`--risk-${key}-${role}:${value[role]};`)).join('')}${Object.entries(STATUS_TONES).flatMap(([key,value])=>['ink','fill','border'].map(role=>`--status-${key}-${role}:${value[role]};`)).join('')}}
.product-icon{display:inline-block;flex:none;vertical-align:-.12em}
.risk-label{display:inline-flex;align-items:center;gap:7px;max-width:100%;min-height:28px;padding:3px 8px;border:1px solid;border-radius:6px;font-family:var(--ui,system-ui,sans-serif);font-size:13px;font-weight:600;line-height:1.5;white-space:nowrap;font-variant-numeric:tabular-nums}
.risk-label i{width:6px;height:6px;flex:none;border-radius:50%;background:currentColor}
.risk-label .score{font-size:inherit;font-weight:700;opacity:1;margin-left:2px}
${Object.keys(RISK_BANDS).map(key=>`.risk-label.${key}{color:var(--risk-${key}-ink);background:var(--risk-${key}-fill);border-color:var(--risk-${key}-border)}.rmx-chart .rmx-cell--${key}{fill:var(--risk-${key}-fill)}`).join('\n')}
.no-rating{display:inline-flex;align-items:center;padding:3px 8px;min-height:28px;border:1px solid var(--status-neutral-border);border-radius:6px;background:var(--status-neutral-fill);color:var(--status-neutral-ink);font-size:13px;line-height:1.5}
.pv-status{display:inline-flex;align-items:center;gap:6px;min-height:28px;max-width:100%;padding:3px 8px;border:1px solid;border-radius:6px;font:500 12px/1.5 var(--ui,system-ui,sans-serif);vertical-align:middle;font-variant-numeric:tabular-nums}
.pv-status>span{min-width:0;overflow-wrap:anywhere}
.pv-status>.product-icon{width:15px;height:15px;flex:none}
${Object.keys(STATUS_TONES).map(key=>`.pv-status--${key}{color:var(--status-${key}-ink);background:var(--status-${key}-fill);border-color:var(--status-${key}-border)}`).join('\n')}
.pv-status[data-status="syncing"]>.product-icon{animation:pv-sync 1.6s linear infinite}
@keyframes pv-sync{to{transform:rotate(360deg)}}
@media(prefers-reduced-motion:reduce){.pv-status[data-status="syncing"]>.product-icon{animation:none}}
@media print{.pv-status[data-status="syncing"]>.product-icon{animation:none}.pv-status,.risk-label{-webkit-print-color-adjust:exact;print-color-adjust:exact}}
`;
export function emptyState({title='No records to show',description='',icon:iconName,action='',details='',compact=false,tone='neutral',heading='h2'}={}){
  const kind=['neutral','warning','error','success'].includes(tone)?tone:'neutral',tag=['h1','h2','h3'].includes(heading)?heading:'h2';
  return `<section class="product-state product-state--${kind}${compact?' product-state--compact':''}"${kind==='error'?' role="alert"':''}><span class="product-state-icon" aria-hidden="true">${icon(iconName||({neutral:'empty',warning:'warning',error:'error',success:'check'})[kind],24)}</span><div class="product-state-content"><${tag}>${esc(title)}</${tag}>${description?`<p>${esc(description)}</p>`:''}${details?`<details class="product-state-details"><summary>Details</summary><pre>${esc(details)}</pre></details>`:''}${action?`<div class="product-state-actions">${action}</div>`:''}</div></section>`;
}
export function loadingState({title='Preparing your workspace',description='Loading assessment records.',compact=false,heading='h2'}={}){
  const tag=['h1','h2','h3'].includes(heading)?heading:'h2';
  return `<section class="product-state product-state--loading${compact?' product-state--compact':''}" role="status" aria-live="polite" aria-busy="true"><span class="product-state-icon" aria-hidden="true">${icon('sync',24)}</span><div class="product-state-content"><${tag}>${esc(title)}</${tag}>${description?`<p>${esc(description)}</p>`:''}<div class="product-state-skeleton" aria-hidden="true"><span></span><span></span><span></span></div></div></section>`;
}
export const button=(label,action,options='')=>`<button type="button" data-action="${action}" ${options}>${label}</button>`;
export const link=(label,action,options='')=>button(`${label} ${icon('arrow',16)}`,action,`class="text-link" ${options}`);
export const badge=value=>Number.isInteger(Number(value))&&Number(value)>=1&&Number(value)<=25?`<span class="risk-label ${band(Number(value)).toLowerCase()}"><i aria-hidden="true"></i>${band(Number(value))} <span class="score">${Number(value)}</span></span>`:'<span class="no-rating">Not assessed</span>';
export const ratingBadge=r=>r&&Number(r.likelihood)>0&&Number(r.impact)>0?badge(score(r)):'<span class="no-rating">Not assessed</span>';
export const sourceLink=(label,id)=>button(`${esc(label)} ${icon('source',15)}`,'source',`class="source-link" data-source="${id}"`);
export function field(label, key, value, {area=false, help='', type='text', readOnly=false}={}) {
  const id='field-'+key.replaceAll('.','-');
  return `<label class="field" for="${id}"><span>${esc(label)}</span>${area ? `<textarea id="${id}" aria-label="${esc(label)}" ${help?`aria-describedby="${id}-help"`:""} data-field="${key}" rows="3" ${readOnly?'readonly':''}>${esc(value)}</textarea>` : `<input id="${id}" aria-label="${esc(label)}" ${help?`aria-describedby="${id}-help"`:""} data-field="${key}" type="${type}" value="${esc(value)}" ${readOnly?'readonly':''}>`}${help?`<small id="${id}-help">${esc(help)}</small>`:''}</label>`;
}
export const aiLabel=(label='AI insights')=>`<span class="ai-section-label">${icon('insight',19)}<span>${esc(label)}</span></span>`;
export const aiNote=(text,source='procedure')=>`<div class="ai-note"><span class="ai-mark" aria-hidden="true">${icon('insight',18)}</span><div><span class="attribution">AI insight</span><p>${esc(text)}</p></div>${sourceLink('View basis',source)}</div>`;
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
