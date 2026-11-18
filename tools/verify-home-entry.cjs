// Run with the local preview open. PLAYWRIGHT_MODULE can point to an installed Playwright.
const {chromium}=require(process.env.PLAYWRIGHT_MODULE||'playwright');
const assert=require('node:assert/strict');

(async()=>{
  const base=new URL(process.env.RCSA_PREVIEW_URL||'http://127.0.0.1:8000/src/');
  const storageKey='rcsa-workflow-demo-v1';
  const browser=await chromium.launch({channel:'chrome',headless:true});
  try{
    const page=await browser.newPage();
    const faults=[];
    page.on('pageerror',error=>faults.push(error.message));
    const enter=page.getByRole('link',{name:'Enter the demo',exact:true});
    const main=page.locator('main#main');
    const stored=()=>page.evaluate(key=>sessionStorage.getItem(key),storageKey);
    const records=[];
    page.on('request',request=>{
      if(new URL(request.url()).pathname.startsWith('/assets/data/'))records.push(request.url());
    });
    await page.goto(new URL('/',base).href);
    await enter.waitFor();
    assert.equal(await main.count(),1);
    assert.equal(await page.locator('.app-header').count(),0);
    assert.equal(records.length,0);
    assert.equal(await stored(),null);

    await page.keyboard.press('Tab');
    await page.keyboard.press('Enter');
    assert(await main.evaluate(el=>document.activeElement===el));
    await enter.click();
    await page.locator('.dashboard-view').waitFor();
    await page.goBack();
    await enter.waitFor();
    await page.goForward();
    await page.locator('.dashboard-view').waitFor();

    await page.getByRole('button',{name:'Start assessment refresh',exact:true}).click();
    const evidence=page.getByRole('button',{name:'View evidence for Unauthorized wire transfer',exact:true});
    await evidence.click();
    assert.match(await page.locator('.cited-passage').innerText(),/25 standard-wire samples/i);
    await page.keyboard.press('Escape');
    assert(await evidence.evaluate(el=>document.activeElement===el));

    await page.goto(new URL('#/assessment/inherent',base).href);
    const field=page.locator('[data-field="risk.inherent.likelihoodRationale"]');
    await field.fill('Locally verified draft retained between visits.');
    const saved=await stored();
    await page.getByRole('link',{name:'RCSA home',exact:true}).click();
    await enter.waitFor();
    await page.reload();
    await enter.waitFor();
    assert.equal(await stored(),saved);
    await enter.click();
    await page.locator('.dashboard-view').waitFor();
    await page.goto(new URL('#/assessment/inherent',base).href);
    assert.equal(await field.inputValue(),'Locally verified draft retained between visits.');

    await page.goto(new URL('/?presenter=1#/reports',base).href);
    await page.locator('.report-document').waitFor();
    assert.equal(new URL(page.url()).search,'?presenter=1');
    assert.equal(await page.locator('.presentation-tools').count(),1);
    await page.goto(new URL('?presenter=1',base).href);
    await page.locator('.dashboard-view').waitFor();

    // Entering the dashboard and immediately going Back while fixtures are loading
    // must not replace the home page when those requests finish.
    const delayed=await browser.newPage();
    let release,started;
    const gate=new Promise(resolve=>{release=resolve;});
    const requested=new Promise(resolve=>{started=resolve;});
    await delayed.route('**/workflow-demo.json*',async request=>{
      started();
      await gate;
      await request.continue();
    });
    await delayed.goto(base.href);
    await delayed.locator('a[href="#/work"]').first().click();
    await requested;
    await delayed.goBack();
    await delayed.locator('a[href="#/work"]').first().waitFor();
    const completed=delayed.waitForResponse(response=>response.url().includes('workflow-demo.json'));
    release();
    await (await completed).finished();
    await delayed.locator('a[href="#/work"]').first().click();
    await delayed.locator('.dashboard-view').waitFor();
    // An unavailable fixture should allow retry on the originally requested page.
    const retry=await browser.newPage();
    let failOnce=true;
    await retry.route('**/workflow-demo.json*',request=>{
      if(failOnce){
        failOnce=false;
        return request.fulfill({status:503,body:'Unavailable'});
      }
      return request.continue();
    });
    await retry.goto(new URL('#/reports',base).href);
    await retry.getByRole('button',{name:'Try again',exact:true}).click();
    await retry.locator('.report-document').waitFor();
    assert.equal(new URL(retry.url()).hash,'#/reports');
    assert.deepEqual(faults,[]);
    console.log('Home, direct links, history navigation, deferred loading, and saved drafts passed.');
  }finally{await browser.close();}
})().catch(error=>{console.error(error);process.exitCode=1;});
