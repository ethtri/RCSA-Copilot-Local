const {chromium}=require(process.env.PLAYWRIGHT_MODULE||'playwright');
const assert=require('node:assert/strict');
const path=require('node:path');
(async()=>{
 const browser=await chromium.launch({headless:true,channel:'chrome'});
 const page=await browser.newPage({viewport:{width:1440,height:1000}});
 const errors=[];page.on('pageerror',e=>errors.push(e.message));
 const click=async name=>page.getByRole('button',{name,exact:true}).first().click();
 const presentation=async()=>{if(await page.locator('.presentation-tools').getAttribute('open')===null)await page.locator('.presentation-tools>summary').click();};
 try{
  await page.goto('http://127.0.0.1:8000/src/?presenter=1#/work');await presentation();await page.getByLabel('Jump to demo scene',{exact:true}).selectOption('complete');await presentation();await page.getByLabel('Demo perspective',{exact:true}).selectOption('first');
  await page.goto('http://127.0.0.1:8000/src/#/assessment/controls');await page.getByRole('button',{name:'Incorrect payment details',exact:true}).click();
  const prior=await page.evaluate(()=>JSON.parse(sessionStorage.getItem('rcsa-workflow-demo-v1')).snapshots);
  await click('Browse control library');assert(await page.getByRole('heading',{name:'Control library',exact:true}).isVisible());
  const candidate=page.locator('.library-card').filter({has:page.getByRole('heading',{name:'Customer payment confirmation',exact:true})});
  await candidate.getByRole('button',{name:'Map in owner revision',exact:true}).click();assert(await page.getByRole('heading',{name:'Start an owner revision?',exact:true}).isVisible());
  await click('Back to library');assert.deepEqual(await page.evaluate(()=>JSON.parse(sessionStorage.getItem('rcsa-workflow-demo-v1')).snapshots),prior);
  await candidate.getByRole('button',{name:'Map in owner revision',exact:true}).click();await page.getByRole('dialog').getByRole('button',{name:'Start owner revision',exact:true}).click();
  assert.equal(await page.getByLabel('Control from the library',{exact:true}).inputValue(),'customer-confirmation');
  await page.getByLabel('Explain how this control addresses the risk',{exact:true}).fill('Adds customer confirmation to the operator entry check. Assess shared sources; standard-route evidence only.');await page.getByLabel('How well does the design address this risk?',{exact:true}).selectOption('limited');await click('Map selected control');
  assert((await page.locator('.cm-table').innerText()).includes('Customer payment confirmation'));assert((await page.locator('.cm-version-note').innerText()).includes('Owner revision'));
  assert.deepEqual(await page.evaluate(()=>JSON.parse(sessionStorage.getItem('rcsa-workflow-demo-v1')).snapshots),prior);
  await click('Inspect prior version');assert((await page.getByRole('dialog').innerText()).includes('Second-line review'));
  const priorDetails=page.locator('.version-risk').filter({has:page.getByRole('heading',{name:'Incorrect payment details',exact:true})});
  await priorDetails.locator('.version-mappings>summary').click();assert((await priorDetails.innerText()).includes('Payment detail check'));assert(!(await priorDetails.innerText()).includes('Customer payment confirmation'));assert((await priorDetails.innerText()).includes('Mapping rationale:'));
  await priorDetails.locator('.version-evidence>summary').click();assert((await priorDetails.innerText()).includes('Test PD-08'));assert((await priorDetails.innerText()).includes('25 standard payment-detail checks'));await click('Close details');
  await page.getByRole('heading',{level:1}).click();await page.screenshot({path:path.resolve('assets/screenshots/control-mapping-owner-revision.png'),fullPage:true,animations:'disabled'});
  await page.setViewportSize({width:390,height:844});await click('Browse control library');assert(await page.getByRole('dialog').isVisible());await page.screenshot({path:path.resolve('assets/screenshots/control-library-mobile.png'),fullPage:true,animations:'disabled'});await click('Close details');
  await presentation();await page.getByLabel('Demo perspective',{exact:true}).selectOption('second');await click('Browse control library');assert.equal(await page.getByRole('button',{name:'Map to this risk',exact:true}).count(),0);assert.equal(await page.getByRole('button',{name:'Map in owner revision',exact:true}).count(),0);
  assert.deepEqual(errors,[]);console.log('PASS: browse submitted library, cancel safely, start owner revision, map sample control, preserve prior assessment/review, mobile library and second-line read-only browsing.');
 }finally{await browser.close();}
})().catch(e=>{console.error(e);process.exitCode=1});
