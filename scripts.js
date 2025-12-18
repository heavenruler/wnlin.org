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
  const hiddenProjects = document.querySelectorAll('.hidden-project');

  if (toggle && hiddenProjects.length) {
    toggle.addEventListener('click', () => {
      const expanded = toggle.getAttribute('aria-expanded') === 'true';
      hiddenProjects.forEach((card) => {
        card.style.display = expanded ? 'none' : '';
      });
      toggle.setAttribute('aria-expanded', expanded ? 'false' : 'true');
      toggle.textContent = expanded ? 'Show more' : 'Show less';
    });
  }
});
