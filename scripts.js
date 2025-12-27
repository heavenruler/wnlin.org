
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

  const menuToggle = document.querySelector('.menu-toggle');
  const navLinks = document.getElementById('nav-links');
  const desktopQuery = typeof window.matchMedia === 'function'
    ? window.matchMedia('(min-width: 721px)')
    : null;

  const syncMenuState = () => {
    if (!menuToggle || !navLinks || !desktopQuery) return;
    if (desktopQuery.matches) {
      navLinks.hidden = false;
      navLinks.classList.remove('is-open');
      menuToggle.setAttribute('aria-expanded', 'true');
    } else {
      navLinks.hidden = true;
      navLinks.classList.remove('is-open');
      menuToggle.setAttribute('aria-expanded', 'false');
    }
  };

  if (menuToggle && navLinks && desktopQuery) {
    syncMenuState();
    if (typeof desktopQuery.addEventListener === 'function') {
      desktopQuery.addEventListener('change', syncMenuState);
    } else if (typeof desktopQuery.addListener === 'function') {
      desktopQuery.addListener(syncMenuState);
    }

    menuToggle.addEventListener('click', () => {
      if (desktopQuery.matches) return;
      const expanded = menuToggle.getAttribute('aria-expanded') === 'true';
      const next = !expanded;
      menuToggle.setAttribute('aria-expanded', next ? 'true' : 'false');
      navLinks.hidden = !next;
      navLinks.classList.toggle('is-open', next);
    });
  } else if (navLinks) {
    navLinks.hidden = false;
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
      'hero.specialties.label': 'Specialties',
      'hero.specialties.value': 'Database architecture, DBRE, observability, hybrid cloud',
      'hero.stack.label': 'Preferred stack',
      'hero.stack.value': 'RDBMS (MySQL, MariaDB) / Connection-pooling proxy layer (ProxySQL) / NoSQL (Redis, MongoDB) / Distributed Database Architecture (TiDB) · Terraform/Ansible · Prometheus/Grafana',
      'cta.viewExperience': 'View Experience',
      'overview.eyebrow': 'Overview',
      'overview.heading': 'What I bring',
      'overview.lede': 'Covering end-to-end database architecture across RDBMS, NoSQL, HTAP, and cloud platforms to deliver resilient, performant services.',
      'overview.card1.title': 'Architecture',
      'overview.card1.body': 'Design end-to-end data architectures across RDBMS, NoSQL, and HTAP with clear patterns for scaling and governance.',
      'overview.card2.title': 'Reliability',
      'overview.card2.body': 'DBRE mindset: build resilient services with SLOs, HA/backup drills, and observability that keeps performance predictable.',
      'overview.card3.title': 'Platform enablement',
      'overview.card3.body': 'Ship reusable platforms, guardrails, and tooling so product teams move faster without sacrificing stability.',
      'certs.eyebrow': 'Certifications',
      'certs.heading': 'Credentials',
      'certs.view': 'View credential',
      'education.eyebrow': 'Education',
      'education.heading': 'Academic',
      'education.school': 'Shu-Te University',
      'education.degree': 'M.S. Computer Science',
      'education.city': 'Kaohsiung',
      'skills.eyebrow': 'Toolbox',
      'skills.heading': 'Skills',
      'experience.eyebrow': 'Experience',
      'experience.heading': 'Recent roles',
      'experience.104.eyebrow': '2018 — Present',
      'experience.104.title': 'Database Administrator (DBA) · 104 Corp',
      'experience.104.subtitle': 'Jan 2018 — Now',
      'experience.104.tag': 'Database Operations',
      'experience.104.b1': 'Database stewardship for core 104 workloads, ensuring dependable daily operations.',
      'experience.104.b2': 'Performance monitoring and tuning to keep databases running efficiently.',
      'experience.104.b3': 'Hybrid cloud database system maintenance across distributed environments.',
      'experience.104.b4': 'High availability through backup planning and validation drills.',
      'experience.104.b5': 'Technical consulting and managed/open-source support to maximize application performance.',
      'experience.pixnet.eyebrow': '2014 — 2017',
      'experience.pixnet.title': 'Network Systems Engineer · PIXNET',
      'experience.pixnet.subtitle': 'Feb 2014 — Dec 2017 · Taipei',
      'experience.pixnet.tag': 'Systems Operations',
      'experience.pixnet.b1': 'Managed and operated production networked systems.',
      'experience.pixnet.b2': 'Administered databases to ensure availability and reliability.',
      'projects.eyebrow': 'Selected work',
      'projects.heading': 'Projects',
      'projects.lede': 'Architecture advising to maximize performance and reliability across hybrid cloud data stacks.',
      'talks.eyebrow': 'Talks & Conferences',
      'talks.heading': 'Speaking',
      'talks.card1.title': 'Hardening and Stabilizing 104\'s Database Architecture',
      'talks.card1.subtitle': '104 TechCon Engineering Conference · Presenter',
      'talks.card1.tag': 'Database Architecture',
      'talks.card1.body': 'Shared practices to harden and stabilize 104’s database service architecture across hybrid environments.',
      'talks.card1.cta': 'View talk',
      'projects.wnlin.title': 'wnlin.org Architecture Stack',
      'projects.wnlin.category': 'Infra',
      'projects.wnlin.body': 'Static resume site hardened with Cloudflare Pages + Worker CSP, GA4/GTM + Consent Mode, and tailored SEO assets.',
      'projects.wnlin.tag1': 'Cloudflare Pages',
      'projects.wnlin.tag2': 'Workers CSP',
      'projects.wnlin.tag3': 'GA4 & GCM'
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
      'hero.specialties.label': '專長',
      'hero.specialties.value': '資料庫架構、DBRE、可觀測性、混合雲',
      'hero.stack.label': '偏好技術',
      'hero.stack.value': 'RDBMS（MySQL、MariaDB）/連線池代理層（ProxySQL）/NoSQL（Redis、MongoDB）/分散式資料庫架構（TiDB） · Terraform/Ansible · Prometheus/Grafana',
      'cta.viewExperience': '查看經歷',
      'overview.eyebrow': '概覽',
      'overview.heading': '我能帶來的價值',
      'overview.lede': '涵蓋 RDBMS、NoSQL、HTAP 與雲端平台的端到端資料庫架構，交付高韌性與高效能的服務。',
      'overview.card1.title': '架構',
      'overview.card1.body': '設計涵蓋 RDBMS、NoSQL 與 HTAP 的端到端資料架構，並提供可擴展、可治理的清晰模式。',
      'overview.card2.title': '可靠性',
      'overview.card2.body': '以 DBRE 思維打造具 SLO、演練與可觀測性的韌性服務，維持穩定且可預期的效能。',
      'overview.card3.title': '平台賦能',
      'overview.card3.body': '交付可重用的平台、保護欄與工具，讓產品團隊在維持穩定性的前提下加速前進。',
      'certs.eyebrow': '認證',
      'certs.heading': '憑證',
      'certs.view': '查看憑證',
      'education.eyebrow': '學歷',
      'education.heading': '學術',
      'education.school': '樹德科技大學',
      'education.degree': '資訊工程所碩士',
      'education.city': '高雄',
      'skills.eyebrow': '工具箱',
      'skills.heading': '技能',
      'experience.eyebrow': '經歷',
      'experience.heading': '近期職務',
      'experience.104.eyebrow': '2018 — 至今',
      'experience.104.title': '資料庫管理師 (DBA) · 104 人力銀行',
      'experience.104.subtitle': '2018 年 1 月 — 至今',
      'experience.104.tag': '資料庫營運',
      'experience.104.b1': '負責 104 核心工作負載的資料庫管理，確保日常營運穩定。',
      'experience.104.b2': '進行效能監控與調校，維持資料庫高效運行。',
      'experience.104.b3': '維護分散式與混合雲資料庫系統。',
      'experience.104.b4': '透過備份規劃與驗證演練，實現高可用性。',
      'experience.104.b5': '提供技術諮詢與託管/開源支援，最大化應用效能。',
      'experience.pixnet.eyebrow': '2014 — 2017',
      'experience.pixnet.title': '網路系統工程師 · PIXNET',
      'experience.pixnet.subtitle': '2014 年 2 月 — 2017 年 12 月 · 台北',
      'experience.pixnet.tag': '系統營運',
      'experience.pixnet.b1': '管理並維運生產環境的網路系統。',
      'experience.pixnet.b2': '維護資料庫以確保可用性與可靠性。',
      'projects.eyebrow': '精選作品',
      'projects.heading': '專案',
      'projects.lede': '提供混合雲資料堆疊的架構顧問，提升效能與可靠性。',
      'talks.eyebrow': '演講與會議',
      'talks.heading': '演講',
      'talks.card1.title': '強化與穩定 104 資料庫服務架構',
      'talks.card1.subtitle': '104 TechCon 工程年會 · 講者',
      'talks.card1.tag': '資料庫架構',
      'talks.card1.body': '分享在混合環境下強化與穩定 104 資料庫服務架構的實務作法。',
      'talks.card1.cta': '查看演講',
      'projects.wnlin.title': 'wnlin.org 技術棧',
      'projects.wnlin.category': '基礎架構',
      'projects.wnlin.body': '以 Cloudflare Pages + Worker CSP 佈署的靜態履歷站，整合 GA4/GTM 與 Consent Mode 並強化 SEO 資產。',
      'projects.wnlin.tag1': 'Cloudflare Pages',
      'projects.wnlin.tag2': 'Workers CSP',
      'projects.wnlin.tag3': 'GA4 與 GCM'
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
      'hero.specialties.label': '专长',
      'hero.specialties.value': '数据库架构、DBRE、可观测性、混合云',
      'hero.stack.label': '偏好技术',
      'hero.stack.value': 'RDBMS（MySQL、MariaDB）/连接池代理层（ProxySQL）/NoSQL（Redis、MongoDB）/分布式数据库架构（TiDB） · Terraform/Ansible · Prometheus/Grafana',
      'cta.viewExperience': '查看经历',
      'overview.eyebrow': '总览',
      'overview.heading': '我能带来的价值',
      'overview.lede': '覆盖 RDBMS、NoSQL、HTAP 与云端平台的端到端数据库架构，交付高韧性与高性能的服务。',
      'overview.card1.title': '架构',
      'overview.card1.body': '设计覆盖 RDBMS、NoSQL 与 HTAP 的端到端数据架构，提供可扩展、可治理的清晰模式。',
      'overview.card2.title': '可靠性',
      'overview.card2.body': '以 DBRE 思维打造具 SLO、演练与可观测性的韧性服务，保持稳定且可预期的性能。',
      'overview.card3.title': '平台赋能',
      'overview.card3.body': '交付可复用的平台、保护栏与工具，让产品团队在保持稳定性的前提下加速前进。',
      'certs.eyebrow': '认证',
      'certs.heading': '凭证',
      'certs.view': '查看凭证',
      'education.eyebrow': '学历',
      'education.heading': '学术',
      'education.school': '树德科技大学',
      'education.degree': '资讯工程所硕士',
      'education.city': '高雄',
      'skills.eyebrow': '工具箱',
      'skills.heading': '技能',
      'experience.eyebrow': '经历',
      'experience.heading': '近期职务',
      'experience.104.eyebrow': '2018 — 至今',
      'experience.104.title': '数据库管理员 (DBA) · 104 人力银行',
      'experience.104.subtitle': '2018 年 1 月 — 至今',
      'experience.104.tag': '数据库运营',
      'experience.104.b1': '负责 104 核心工作负载的数据库管理，确保日常运营稳定。',
      'experience.104.b2': '进行性能监控与调优，保持数据库高效运行。',
      'experience.104.b3': '维护分布式与混合云数据库系统。',
      'experience.104.b4': '通过备份规划与验证演练，实现高可用性。',
      'experience.104.b5': '提供技术咨询与托管/开源支持，最大化应用性能。',
      'experience.pixnet.eyebrow': '2014 — 2017',
      'experience.pixnet.title': '网络系统工程师 · PIXNET',
      'experience.pixnet.subtitle': '2014 年 2 月 — 2017 年 12 月 · 台北',
      'experience.pixnet.tag': '系统运营',
      'experience.pixnet.b1': '管理并运维生产环境的网络系统。',
      'experience.pixnet.b2': '维护数据库以确保可用性与可靠性。',
      'projects.eyebrow': '精选作品',
      'projects.heading': '项目',
      'projects.lede': '针对混合云数据堆栈提供架构顾问，最大化性能与可靠性。',
      'talks.eyebrow': '演讲与会议',
      'talks.heading': '演讲',
      'talks.card1.title': '强化与稳定 104 数据库服务架构',
      'talks.card1.subtitle': '104 TechCon 工程年会 · 讲者',
      'talks.card1.tag': '数据库架构',
      'talks.card1.body': '分享在混合环境下强化与稳定 104 数据库服务架构的实践做法。',
      'talks.card1.cta': '查看演讲',
      'projects.wnlin.title': 'wnlin.org 技术栈',
      'projects.wnlin.category': '基础架构',
      'projects.wnlin.body': '以 Cloudflare Pages + Worker CSP 部署的静态履历站，整合 GA4/GTM 与 Consent Mode，并强化 SEO 资产。',
      'projects.wnlin.tag1': 'Cloudflare Pages',
      'projects.wnlin.tag2': 'Workers CSP',
      'projects.wnlin.tag3': 'GA4 与 GCM'
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
