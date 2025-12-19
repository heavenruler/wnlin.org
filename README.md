# wnlin.org Architecture

Static resume site hosted on Cloudflare Pages, sourced from GitHub, and served on `wnlin.org` via Cloudflare DNS.

```
來源儲存庫 (https://github.com/heavenruler/wnlin.org)
   ↓ 觸發部署  
Cloudflare Pages（靜態託管）  
   ↓ 綁定  
Cloudflare DNS（CNAME：wnlin.org → Pages）  
   ↓  
終端訪客（https://wnlin.org）
```

### CI/CD 流程

- 提交到 `main`（或指定 branch）後，GitHub 透過 Pages integration 觸發 Cloudflare Pages 的 build hook。
- Pages 以內建 Node/PNPM 環境跑 `npm install && npm run build`（對此站而言僅需打包靜態檔）；產出結果放在 `public` 目錄。
- Build 完成即自動部署至 Preview URL；經檢查無誤後合併/標記為 Production，Cloudflare 即替換 `wnlin.org` 的正式版本。
- `_worker.js` 一併由 wrangler 發佈，確保最新安全標頭與行為覆蓋所有請求。

### Header Security A 評分

為通過常見掃描工具的「Header Security A」等級，Worker 層面注入下列 HTTP 標頭：

- **Content-Security-Policy**：限制 `default/script/style/img/font/connect/frame` 等來源，僅允許自家網域與必要的 Google 服務，降低 XSS/資料外洩風險。
- **Strict-Transport-Security (HSTS)**：`max-age=31536000; includeSubDomains; preload`，強制 1 年 TLS 並啟用預載，避免降級攻擊。
- **X-Frame-Options**：設定 `SAMEORIGIN`，防止點擊劫持。
- **X-Content-Type-Options**：`nosniff`，讓瀏覽器不猜測 MIME type，阻擋惡意混淆。
- **Referrer-Policy**：`strict-origin-when-cross-origin`，僅在相同來源傳完整 referrer，保護敏感 URL。
- **Permissions-Policy**：停用 `geolocation`、`camera`、`microphone` 等瀏覽器權限，縮減攻擊面。

範例回應（節錄）：

```
HTTP/2 200
date: Fri, 19 Dec 2025 14:27:07 GMT
content-type: text/html
cache-control: public, max-age=0, must-revalidate
etag: "058d50287ee96111e5442cea0e90d930"
strict-transport-security: max-age=31536000; includeSubDomains; preload
x-content-type-options: nosniff
referrer-policy: strict-origin-when-cross-origin
permissions-policy: geolocation=(), camera=(), microphone=()
x-frame-options: SAMEORIGIN
content-security-policy: default-src 'self'; script-src 'self' 'unsafe-inline' https://www.googletagmanager.com https://www.google-analytics.com https://pagead2.googlesyndication.com https://securepubads.g.doubleclick.net https://cdn-cookieyes.com https://static.cloudflareinsights.com https://ep2.adtrafficquality.google https://fundingchoicesmessages.google.com; style-src 'self' 'unsafe-inline' https://fonts.googleapis.com https://cdnjs.cloudflare.com; img-src 'self' https://www.google-analytics.com https: data:; font-src 'self' https://fonts.gstatic.com https://cdnjs.cloudflare.com data:; connect-src 'self' https://www.google-analytics.com https://*.google-analytics.com https://analytics.google.com https://www.googletagmanager.com https://pagead2.googlesyndication.com https://securepubads.g.doubleclick.net https://stats.g.doubleclick.net https://ep1.adtrafficquality.google https://ep2.adtrafficquality.google https://cdn-cookieyes.com https://log.cookieyes.com https://fundingchoicesmessages.google.com; frame-src https://www.googletagmanager.com https://fundingchoicesmessages.google.com https://ep1.adtrafficquality.google https://ep2.adtrafficquality.google https://www.google.com https://pagead2.googlesyndication.com https://googleads.g.doubleclick.net https://securepubads.g.doubleclick.net; object-src 'none'; base-uri 'self'
server: cloudflare
```

## 技術棧說明

- **前端**：純 `index.html` + `styles.css` + `scripts.js` 的靜態組合，使用 Google Fonts（Space Grotesk、DM Sans）與 Font Awesome Icons（cdnjs）補強排版與圖示。
- **AMP 版本**：`index.amp.html` 提供輕量版內容，遵循 AMP 元件與驗證規範，便於行動裝置快取與搜尋優化。
- **部署與網路層**：程式碼位於 GitHub，透過 Cloudflare Pages 自動建置發佈；`_worker.js` 作為 Cloudflare Worker 代理，注入 CSP/Security headers（HSTS、Permissions-Policy、Referrer-Policy 等）並保護資源載入。
- **分析與追蹤**：在 HTML 中直接載入 GA4 (`G-GVHQ00L7T7`) 與 Google Tag Manager (GTM-NQQQJPDZ) 片段，使用 dataLayer 初始化方式推送事件。
- **配置與工具**：`wrangler.toml` 管理 Cloudflare Pages/Workers 設定；`ads.txt`、`robots.txt`、`sitemap.xml`、`social-card.png/svg` 等輔助檔案支援 SEO 與社群預覽。
