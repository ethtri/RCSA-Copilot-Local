const {chromium}=require(process.env.PLAYWRIGHT_MODULE||'playwright');
const assert=require('node:assert/strict');
const path=require('node:path');
(async()=>{
 const browser=await chromium.launch({headless:true,channel:'chrome'});
 const page=await browser.newPage({viewport:{width:1440,height:1100}}),errors=[];
 page.on('pageerror',e=>errors.push(e.message));
 page.on('response',r=>{if(r.status()>=400)errors.push(`${r.status()} ${r.url()}`);});
 const base='http://127.0.0.1:8000/src/';
 const click=async name=>{if(name.startsWith('Back to '))name='Back to assessment';if(name==='Explore related signals')name=page.url().endsWith('/controls')?'Examine the evidence':page.url().endsWith('/response')?'Compare response options':'Inspect supporting and counter-evidence';const loc=page.getByRole('button',{name,exact:true}).first();if(!await loc.isVisible()&&(/^(Signals|Sources)/.test(name)||name==='Overview'))await page.getByRole('button',{name:name==='Overview'?'Briefing':'Evidence',exact:true}).click();await loc.click();};
 const fill=async(name,value)=>{const loc=page.getByLabel(name,{exact:true});await loc.waitFor({state:'attached'});for(const d of (await loc.locator('xpath=ancestor::details').all()).reverse())if(await d.getAttribute('open')===null)await d.locator(':scope>summary').click();await loc.fill(value);};
 const snapshot=()=>page.evaluate(()=>{
  const s=JSON.parse(sessionStorage.getItem('rcsa-workflow-demo-v1'));
  return {risks:s.risks,action:s.action,question:s.question,submitted:s.submitted,snapshots:s.snapshots,history:s.history};
 });
 const capture=async file=>{await page.getByRole('heading',{level:1}).click();await page.screenshot({path:path.resolve('assets/screenshots/'+file+'.png'),animations:'disabled'});};
 try{
  await page.goto(base+'#/assessment/inherent');
  // Equal rendered geometry in the actual sidebar, including the selected middle cell.
  await click('Incorrect payment details');
  const cells=await page.locator('.rmx-cell').evaluateAll(els=>els.map(el=>{const r=el.getBoundingClientRect();return {w:r.width,h:r.height};}));
  assert.equal(cells.length,25);assert(cells.every(r=>Math.abs(r.w-r.h)<.05&&Math.abs(r.h-cells[0].h)<.05));
  assert((await page.locator('.rmx-svg').getAttribute('aria-label')).includes('Likelihood increases from 1 at the left'));
  assert((await page.locator('.rmx-svg').getAttribute('aria-label')).includes('Impact increases from 1 at the bottom'));
  await capture('assessment-heatmap-refined');
  const before=await snapshot();
  await click('Explore risk analysis');
  assert((await page.locator('.ri-lens').innerText()).includes('Before considering controls'));
  assert((await page.locator('.ri-reasoning').innerText()).includes('Observed in the records'));
  assert((await page.locator('.ri-reasoning').innerText()).includes('Suggested interpretation'));
  await click('Signals 4');assert((await page.locator('.ri-signals-view').innerText()).includes('Late amendment')||(await page.locator('.ri-signals-view').innerText()).includes('late amendment'));
  assert((await page.locator('.ri-signals-view').innerText()).includes('$84,000'));
  await click('Sources 4');await page.locator('.ri-source-record').first().getByRole('button',{name:'Open source',exact:true}).click();assert((await page.getByRole('dialog').innerText()).includes('Recalled payment detail error'));await click('Close details');
  await click('Back to inherent risk');
  await click('Delayed execution');await click('Queue service review');
  assert(page.url().endsWith('/assessment/analysis'));
  assert((await page.locator('.ri-source-context').innerText()).includes('Queue service review'));
  assert(await page.locator('.ri-signals-view').isVisible());
  assert((await page.locator('.ri-signals-view').innerText()).includes('seventeen-minute'));
  assert((await page.locator('.ri-signals-view').innerText()).includes('$180'));
  assert.equal(await page.getByRole('dialog').isVisible(),false);
  await click('Read original excerpt');assert((await page.getByRole('dialog').innerText()).includes('Queue service review'));await click('Close details');
  await click('Unauthorized wire transfer');assert.equal(await page.locator('.ri-source-context').count(),0);
  await click('Overview');assert((await page.locator('.ri-reading-main').innerText()).includes('Seven logged urgent requests'));
  await capture('risk-analysis-desktop');
  assert.deepEqual(await snapshot(),before,'Analysis must not change judgments, history or workflow state');
  await click('Back to inherent risk');await page.getByRole('link',{name:'04Residual risk & response',exact:true}).click();await click('Explore risk analysis');
  assert((await page.locator('.ri-lens').innerText()).includes('Current, evidenced protection'));
  assert((await page.locator('.ri-boundary').innerText()).includes('A proposed action cannot establish current protection'));
  await click('Back to residual risk');
  await page.goto(base+'#/assessment/controls');await click('Explore related signals');assert.equal(await page.evaluate(()=>JSON.parse(sessionStorage.getItem('rcsa-workflow-demo-v1')).analysisReturn),'controls');await click('Back to control mapping');assert(page.url().endsWith('/assessment/controls'));
  await page.goto(base+'#/assessment/response');await page.getByRole('radio',{name:/Strengthen controls/}).check();await fill('Response rationale','Human rationale remains unchanged while inspecting connected events.');
  await click('Explore related signals');assert.equal(await page.evaluate(()=>JSON.parse(sessionStorage.getItem('rcsa-workflow-demo-v1')).analysisReturn),'response');await click('Back to risk response');assert.equal(await page.getByLabel('Response rationale',{exact:true}).inputValue(),'Human rationale remains unchanged while inspecting connected events.');
  await page.goto(base+'#/assessment/inherent');await click('Incorrect payment details');await page.goto(base+'#/assessment/response');await click('Review AI draft');assert((await page.getByRole('dialog').innerText()).includes('PI-12'));assert((await page.getByRole('dialog').innerText()).includes('version released'));await click('Close details');
  await page.goto(base+'#/assessment/inherent');await click('Delayed execution');await page.goto(base+'#/assessment/response');await click('Review AI draft');assert((await page.getByRole('dialog').innerText()).includes('QI-04'));assert((await page.getByRole('dialog').innerText()).includes('sustained'));await click('Use this draft');assert.equal(await page.getByLabel('Action',{exact:true}).inputValue(),'Review cutoff resilience under peak load and outage');assert.equal(await page.evaluate(()=>JSON.parse(sessionStorage.getItem('rcsa-workflow-demo-v1')).risks.cutoff.riskResponse.created),false);
  await page.locator('.presentation-tools>summary').click();await page.getByLabel('Jump to demo scene',{exact:true}).selectOption('submitted');
  await page.locator('.presentation-tools>summary').click();await page.getByLabel('Demo perspective',{exact:true}).selectOption('second');
  await fill('Question for the assessment owner','My review question must survive opening a source and related analysis.');
  await click('Explore related signals');assert.equal(await page.evaluate(()=>JSON.parse(sessionStorage.getItem('rcsa-workflow-demo-v1')).analysisReturn),'review');await click('Back to assessment review');assert.equal(await page.getByLabel('Question for the assessment owner',{exact:true}).inputValue(),'My review question must survive opening a source and related analysis.');
  const questionState=await snapshot();await click('Review question draft');assert(await page.getByRole('heading',{name:'A question grounded in the evidence.',exact:true}).isVisible());await click('Close details');assert.equal(await page.getByLabel('Question for the assessment owner',{exact:true}).inputValue(),questionState.question);await click('Review question draft');await click('Use this question');assert.notEqual(await page.getByLabel('Question for the assessment owner',{exact:true}).inputValue(),questionState.question);assert.equal(await page.evaluate(()=>JSON.parse(sessionStorage.getItem('rcsa-workflow-demo-v1')).challengeStatus),'none');
  // Review is explicitly about the named authorization risk, even after another risk was selected.
  await page.goto(base+'#/assessment/inherent');await click('Incorrect payment details');await page.goto(base+'#/assessment/review');await click('Explore related signals');assert.equal(await page.locator('.ri-risk-choice[aria-pressed="true"]').innerText(),'Unauthorized wire transfer');
  const overflow=[];
  for(const width of [1440,834,390]){
   await page.setViewportSize({width,height:width===390?844:1100});
   for(const mode of ['Overview','Signals 4','Sources 7']){
    await click(mode);const size=await page.evaluate(()=>({viewport:innerWidth,content:document.documentElement.scrollWidth}));if(size.content>size.viewport+1)overflow.push({width,mode,...size});
   }
   if(width===390){await click('Signals 4');await capture('risk-analysis-mobile');}
  }
  assert.deepEqual(overflow,[]);assert.deepEqual(errors,[]);
  console.log('PASS: equal sidebar heatmap, explicit axes, risk-specific events/near misses/issues, distinct source context and original excerpts, inherent/residual boundaries, review/mapping/response return paths, human text and ratings preserved, 1440/834/390 layouts.');
 }finally{await browser.close();}
})().catch(e=>{console.error(e);process.exitCode=1;});
