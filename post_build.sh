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
if command -v curl >/dev/null 2>&1; then
  if ! curl -fsS "https://www.google.com/ping?sitemap=${SITEMAP_URL}"; then
    echo "Warning: sitemap ping failed (curl returned non-zero)." >&2
  fi
elif command -v wget >/dev/null 2>&1; then
  if ! wget -qO- "https://www.google.com/ping?sitemap=${SITEMAP_URL}"; then
    echo "Warning: sitemap ping failed (wget returned non-zero)." >&2
  fi
else
  echo "Warning: neither curl nor wget is available; skip ping." >&2
fi

echo "Post-build complete."
