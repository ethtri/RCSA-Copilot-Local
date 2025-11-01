const PARTIAL_ATTRIBUTE = 'data-partial-src';
const TITLE_PREFIX = 'RCSA Demo';

function executeScripts(container) {
  const scripts = Array.from(container.querySelectorAll('script'));
  scripts.forEach((script) => {
    const runnable = document.createElement('script');
    Array.from(script.attributes).forEach(({ name, value }) => {
      runnable.setAttribute(name, value);
    });

    if (script.textContent) {
      runnable.textContent = script.textContent;
    }

    document.body.appendChild(runnable);
    script.remove();
  });
}

async function injectPartial(node) {
  const src = node.getAttribute(PARTIAL_ATTRIBUTE);
  if (!src) {
    return;
  }

  try {
    const response = await fetch(src);
    if (!response.ok) {
      throw new Error(`${response.status} ${response.statusText}`);
    }

    const html = await response.text();
    node.innerHTML = html;
    executeScripts(node);
  } catch (error) {
    console.error(`Partial load failed for ${src}: ${error.message}`);
    node.innerHTML = `<!-- Failed to load partial: ${src} -->`;
  }
}

function applyPageTitle() {
  const pageTitle = document.body?.getAttribute('data-page-title');
  if (!pageTitle) {
    return;
  }

  document.title = `${TITLE_PREFIX} | ${pageTitle}`;
}

async function bootstrapPartials() {
  const nodes = Array.from(document.querySelectorAll(`[${PARTIAL_ATTRIBUTE}]`));
  await Promise.all(nodes.map((node) => injectPartial(node)));
  applyPageTitle();
  document.dispatchEvent(new CustomEvent('rcsa:partials-ready'));
}

document.addEventListener('DOMContentLoaded', () => {
  bootstrapPartials().catch((error) => {
    console.error(`Partial bootstrap failed: ${error.message}`);
  });
});
