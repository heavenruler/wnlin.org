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
      'hero.lede': 'Delivering DBA/DBRE and systems architecture with a focus on high availability, observability, platformization, and distributed systems—hands-on execution paired with systematic decisions for stability, speed, and long-term evolution.',
      'hero.focus': 'Current focus — DBRE, platform enablement, self-service, distributed systems',
      'hero.role': 'Database Architect / DBRE',
      'hero.bullet1': 'Lead product × DBA collaboration to shorten DB change cycles through self-service and guardrails.',
      'hero.bullet2': 'Design DB workflows and platforms that raise delivery speed while controlling risk.',
      'hero.bullet3': 'Mentor teams on product thinking and DB reliability via standards, tooling, and hands-on reviews.',
      'hero.location.label': 'Location',
      'hero.location.value': 'Taipei / Remote',
      'overview.eyebrow': 'Overview',
      'overview.heading': 'What I bring',
      'overview.lede': 'Covering end-to-end database architecture across RDBMS, NoSQL, HTAP, and cloud platforms to deliver resilient, performant services.',
      'overview.card1.title': 'Architecture',
      'overview.card1.body': 'Design end-to-end data architectures across RDBMS, NoSQL, and HTAP with clear patterns for scaling and governance.',
      'overview.card2.title': 'Reliability',
      'overview.card2.body': 'DBRE mindset: build resilient services with SLOs, HA/backup drills, and observability that keeps performance predictable.',
      'overview.card3.title': 'Platform enablement',
      'overview.card3.body': 'Ship reusable platforms, guardrails, and tooling so product teams move faster without sacrificing stability.'
    },
    'zh-TW': {
      'hero.eyebrow': '以性能、穩定度、交付速度為核心的產品導向工程師',
      'hero.headline': '以可靠性優先設計，打造穩健的資料平台與系統。',
      'hero.lede': '專注高可用、可觀測、平台化與分散式系統的 DBA/DBRE 與系統架構實務，結合動手落地與系統化決策，提升穩定度、交付速度與長期演進能力。',
      'hero.focus': '當前重點 — DBRE、平台化、自主化、分散式系統',
      'hero.role': '資料庫架構師 / DBRE',
      'hero.bullet1': '主導產品 × DBA 協作，透過自助化與防呆縮短資料庫變更周期。',
      'hero.bullet2': '設計資料庫作業流程與平台，在控管風險下提升交付速度。',
      'hero.bullet3': '透過規範、工具與實作，培養團隊的產品思維與資料庫可靠性意識。',
      'hero.location.label': '地點',
      'hero.location.value': '台北 / 遠端',
      'overview.eyebrow': '概覽',
      'overview.heading': '我能帶來的價值',
      'overview.lede': '涵蓋 RDBMS、NoSQL、HTAP 與雲端平台的端到端資料庫架構，交付高韌性與高效能的服務。',
      'overview.card1.title': '架構',
      'overview.card1.body': '設計涵蓋 RDBMS、NoSQL 與 HTAP 的端到端資料架構，並提供可擴展、可治理的清晰模式。',
      'overview.card2.title': '可靠性',
      'overview.card2.body': '以 DBRE 思維打造具 SLO、演練與可觀測性的韌性服務，維持穩定且可預期的效能。',
      'overview.card3.title': '平台賦能',
      'overview.card3.body': '交付可重用的平台、保護欄與工具，讓產品團隊在維持穩定性的前提下加速前進。'
    },
    'zh-CN': {
      'hero.eyebrow': '以性能、稳定度、交付速度为核心的产品导向工程师',
      'hero.headline': '以可靠性优先设计，打造稳健的数据平台与系统。',
      'hero.lede': '专注高可用、可观测、平台化与分布式系统的 DBA/DBRE 与系统架构实务，结合动手落地与系统化决策，提升稳定度、交付速度与长期演进能力。',
      'hero.focus': '当前重点 — DBRE、平台化、自助化、分布式系统',
      'hero.role': '数据库架构师 / DBRE',
      'hero.bullet1': '主导产品 × DBA 协作，通过自助化和防呆缩短数据库变更周期。',
      'hero.bullet2': '设计数据库作业流程与平台，在控管风险下提升交付速度。',
      'hero.bullet3': '通过规范、工具与实作，培养团队的产品思维与数据库可靠性意识。',
      'hero.location.label': '地点',
      'hero.location.value': '台北 / 远程',
      'overview.eyebrow': '总览',
      'overview.heading': '我能带来的价值',
      'overview.lede': '覆盖 RDBMS、NoSQL、HTAP 与云端平台的端到端数据库架构，交付高韧性与高性能的服务。',
      'overview.card1.title': '架构',
      'overview.card1.body': '设计覆盖 RDBMS、NoSQL 与 HTAP 的端到端数据架构，提供可扩展、可治理的清晰模式。',
      'overview.card2.title': '可靠性',
      'overview.card2.body': '以 DBRE 思维打造具 SLO、演练与可观测性的韧性服务，保持稳定且可预期的性能。',
      'overview.card3.title': '平台赋能',
      'overview.card3.body': '交付可复用的平台、保护栏与工具，让产品团队在保持稳定性的前提下加速前进。'
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
