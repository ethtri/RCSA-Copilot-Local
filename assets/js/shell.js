const NAV_STATE_ATTRIBUTE = 'shellNavState';
const NAV_READY_ATTRIBUTE = 'shellNavReady';

function updateCurrentYear() {
  const year = new Date().getFullYear();
  document.querySelectorAll('[data-current-year]').forEach((node) => {
    node.textContent = year;
  });
}

function normalisePathname(href) {
  try {
    const url = new URL(href, window.location.origin);
    return url.pathname.replace(/index\.html$/i, '').replace(/\/+$/, '') || '/';
  } catch {
    return '/';
  }
}

function setActiveNavigationLink(nav) {
  const currentPath = normalisePathname(window.location.pathname);
  const links = Array.from(nav.querySelectorAll('a[href]'));

  links.forEach((link) => {
    const linkPath = normalisePathname(link.href);
    if (linkPath === currentPath) {
      link.setAttribute('aria-current', 'page');
    } else {
      link.removeAttribute('aria-current');
    }
  });
}

function collapseOnEscape(event, closeNav) {
  if (event.key === 'Escape') {
    closeNav();
  }
}

function enhanceNavigation() {
  const nav = document.querySelector('[data-shell-nav]');
  const toggle = document.querySelector('[data-shell-nav-toggle]');

  if (!nav) {
    return;
  }

  if (nav.dataset[NAV_READY_ATTRIBUTE] === 'true') {
    setActiveNavigationLink(nav);
    return;
  }

  const setState = (state) => {
    nav.dataset[NAV_STATE_ATTRIBUTE] = state;
    if (toggle) {
      toggle.setAttribute('aria-expanded', state === 'open' ? 'true' : 'false');
    }
  };

  const openNav = () => setState('open');
  const closeNav = () => setState('closed');

  const handleToggle = () => {
    const nextState = nav.dataset[NAV_STATE_ATTRIBUTE] === 'open' ? 'closed' : 'open';
    setState(nextState);
    if (nextState === 'open') {
      nav.querySelector('a, button')?.focus();
    }
  };

  toggle?.addEventListener('click', (event) => {
    event.preventDefault();
    handleToggle();
  });

  document.addEventListener('keyup', (event) => collapseOnEscape(event, closeNav));
  window.addEventListener('resize', () => {
    if (window.innerWidth > 1024) {
      closeNav();
    }
  });

  nav.addEventListener('click', (event) => {
    const target = event.target;
    if (target instanceof HTMLElement && target.tagName === 'A') {
      closeNav();
    }
  });

  setState('closed');
  setActiveNavigationLink(nav);
  nav.dataset[NAV_READY_ATTRIBUTE] = 'true';
}

function autoFocusMain() {
  const main = document.getElementById('page-content');
  const shouldFocus =
    main && main.hasAttribute('tabindex') && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (shouldFocus) {
    main.focus();
  }
}

function initialiseShell() {
  updateCurrentYear();
  enhanceNavigation();
  autoFocusMain();
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initialiseShell);
} else {
  initialiseShell();
}

document.addEventListener('rcsa:partials-ready', initialiseShell);
