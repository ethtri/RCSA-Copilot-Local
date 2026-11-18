import {icon} from './ui.js?v=20261116.3';

const chapters = [
  {
    title: 'Spot the change',
    text: 'See how a new urgent-wire route changes the scope of a quarterly assessment.',
    link: 'View scope',
    route: 'assessment/changes'
  },
  {
    title: 'Inspect the evidence',
    text: 'See why the September test of 25 standard wires left the urgent route untested.',
    link: 'View controls',
    route: 'assessment/controls'
  },
  {
    title: 'Record the decision',
    text: 'Follow the owner’s ratings, outstanding actions and independent review in one report.',
    link: 'View report',
    route: 'reports'
  }
];

export function homeView() {
  return `<main id="main" class="product-home" tabindex="-1">
    <div class="home-cover">
      <img class="home-engraving" src="/assets/images/engraved-paper.webp" alt="" width="2060" height="763" fetchpriority="high">
      <header class="home-masthead">
        <span class="home-identity" aria-label="RCSA Accelerator"><span>RCSA</span> Accelerator</span>
        <a class="home-workspace-link" href="#/work">Open workspace ${icon('arrow',18)}</a>
      </header>
      <section class="home-intro" aria-labelledby="home-title">
        <h1 id="home-title">See what changed.<br><em>Know what to review.</em></h1>
        <p>Review AI-prepared findings against bank records, confirm risk ratings and send the assessment for independent review.</p>
        <a class="home-enter" href="#/work">Enter the demo ${icon('arrow',21)}</a>
      </section>
    </div>
    <section class="home-case" aria-labelledby="home-case-title">
      <div class="home-case-heading">
        <h2 id="home-case-title">Inside the wire-transfer assessment</h2>
        <p>Q4 2026 <span aria-hidden="true">·</span> Payments Operations</p>
      </div>
      <div class="home-chapters">
        ${chapters.map(chapter=>`<article><h3>${chapter.title}</h3><p>${chapter.text}</p><a href="#/${chapter.route}">${chapter.link} ${icon('arrow',17)}</a></article>`).join('')}
      </div>
    </section>
  </main>`;
}
