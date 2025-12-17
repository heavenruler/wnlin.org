#!/usr/bin/env bash
set -euo pipefail

# Post-build hook for Cloudflare Pages.
# 1) Ensures site files exist (root static site).
# 2) Pings Google to re-crawl the sitemap after deploy.

SITEMAP_URL=${SITEMAP_URL:-"https://wnlin.org/sitemap.xml"}

echo "Post-build: verifying static assets..."
if [ ! -f "index.html" ]; then
  echo "Error: index.html not found in repo root; adjust build command or paths." >&2
  exit 1
fi

echo "Post-build: pinging Google with sitemap ${SITEMAP_URL}..."

# Try both raw URL and encoded URL (some environments dislike the encoded version).
ENCODED_SITEMAP_URL=$(
  python3 - <<'PY' "$SITEMAP_URL"
import sys, urllib.parse
print(urllib.parse.quote(sys.argv[1], safe=""))
PY
)

PING_URLS=(
  "https://www.google.com/ping?sitemap=${SITEMAP_URL}"
  "https://www.google.com/ping?sitemap=${ENCODED_SITEMAP_URL}"
)

ping_ok=false
for url in "${PING_URLS[@]}"; do
  if command -v curl >/dev/null 2>&1; then
    if curl -fsS "$url" >/dev/null; then
      echo "Pinged: $url"
      ping_ok=true
      break
    fi
  elif command -v wget >/dev/null 2>&1; then
    if wget -qO- "$url" >/dev/null; then
      echo "Pinged: $url"
      ping_ok=true
      break
    fi
  else
    echo "Warning: neither curl nor wget is available; skip ping." >&2
    break
  fi
done

if [ "$ping_ok" = false ]; then
  echo "Warning: sitemap ping failed for both raw and encoded URLs." >&2
fi

echo "Post-build complete."
