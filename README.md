# wnlin.org Architecture

Static resume site hosted on Cloudflare Pages, sourced from GitHub, and served on `wnlin.org` via Cloudflare DNS.

```mermaid
flowchart LR
  dev[GitHub Repo\nwnlin.org] -->|Deploy| pages[Cloudflare Pages\nStatic Hosting]
  pages --> dns[Cloudflare DNS\nCNAME: wnlin.org -> Pages]
  dns --> users[Visitors\nhttps://wnlin.org]
```

## Cloudflare Pages 部署與自動 Ping Sitemap

- Build command：`bash post_build.sh`
- Output directory：`/`（根目錄）
- 環境變數（可選）：`SITEMAP_URL=https://wnlin.org/sitemap.xml`

`post_build.sh` 會：
1) 確認 repo root 有 `index.html`（避免路徑錯誤）。
2) 部署完成後自動對 Google 發送 Sitemap ping (`https://www.google.com/ping?sitemap=...`)，通知內容更新。
