# wnlin.org Architecture

Static resume site hosted on Cloudflare Pages, sourced from GitHub, and served on `wnlin.org` via Cloudflare DNS.

```mermaid
flowchart LR
  dev[GitHub Repo\nwnlin.org] -->|Deploy| pages[Cloudflare Pages\nStatic Hosting]
  pages --> dns[Cloudflare DNS\nCNAME: wnlin.org -> Pages]
  dns --> users[Visitors\nhttps://wnlin.org]
```
