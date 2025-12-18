// Google Tag Manager
(function (w, d, s, l, i) {
  w[l] = w[l] || [];
  w[l].push({ 'gtm.start': new Date().getTime(), event: 'gtm.js' });
  var f = d.getElementsByTagName(s)[0];
  var j = d.createElement(s);
  var dl = l !== 'dataLayer' ? '&l=' + l : '';
  j.async = true;
  j.src = 'https://www.googletagmanager.com/gtm.js?id=' + i + dl;
  f.parentNode.insertBefore(j, f);
})(window, document, 'script', 'dataLayer', 'GTM-NQQQJPDZ');

// Google Analytics (gtag)
window.dataLayer = window.dataLayer || [];
function gtag() { dataLayer.push(arguments); }
(function loadGtag() {
  var g = document.createElement('script');
  g.async = true;
  g.src = 'https://www.googletagmanager.com/gtag/js?id=G-GVHQ00L7T7';
  var f = document.getElementsByTagName('script')[0];
  f.parentNode.insertBefore(g, f);
})();
gtag('js', new Date());
gtag('config', 'G-GVHQ00L7T7');

// Projects show more/less toggle
document.addEventListener('DOMContentLoaded', () => {
  const toggle = document.getElementById('projects-toggle');
  const hiddenProjects = Array.from(document.querySelectorAll('.hidden-project'));
  const grid = document.getElementById('projects-grid');

  if (toggle && hiddenProjects.length && grid) {
    grid.classList.add('projects-collapsed');
    toggle.addEventListener('click', () => {
      const expanded = grid.classList.contains('projects-collapsed');
      grid.classList.toggle('projects-collapsed', !expanded);
      toggle.setAttribute('aria-expanded', expanded ? 'true' : 'false');
      toggle.textContent = expanded ? 'Show less' : 'Show more';
    });
  }

  // Language switcher (placeholder translations)
  const langButtons = Array.from(document.querySelectorAll('.lang-button'));
  const translations = {
    en: {
      'hero.eyebrow': 'Product-focused engineer — performance, reliability, velocity first',
      'hero.headline': 'Building dependable data platforms and systems with reliability-first design.',
      'hero.lede': 'Delivering DBA/DBRE and systems architecture with a focus on high availability, observability, platformization, and distributed systems—hands-on execution paired with systematic decisions for stability, speed, and long-term evolution.'
    },
    'zh-TW': {
      // Placeholder: defaults to English for now
    },
    'zh-CN': {
      // Placeholder: defaults to English for now
    }
  };

  const i18nDefaults = {};
  const i18nNodes = Array.from(document.querySelectorAll('[data-i18n]'));
  i18nNodes.forEach((node) => {
    const key = node.dataset.i18n;
    if (!i18nDefaults[key]) {
      i18nDefaults[key] = node.textContent.trim();
    }
  });

  function applyLanguage(lang) {
    document.documentElement.setAttribute('lang', lang);
    i18nNodes.forEach((node) => {
      const key = node.dataset.i18n;
      const value =
        (translations[lang] && translations[lang][key]) ||
        (translations.en && translations.en[key]) ||
        i18nDefaults[key] ||
        node.textContent;
      node.textContent = value;
    });
    langButtons.forEach((btn) => {
      btn.classList.toggle('active', btn.dataset.lang === lang);
    });
  }

  langButtons.forEach((btn) => {
    btn.addEventListener('click', () => {
      applyLanguage(btn.dataset.lang);
    });
  });
});
