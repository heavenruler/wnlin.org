#!/usr/bin/env node
/**
 * Post-build hook for Cloudflare Pages using Node (no bash dependency).
 * 1) Checks that index.html exists in repo root.
 * 2) Pings Google with sitemap URL (raw + encoded) to notify updates.
 */

const fs = require('fs');
const https = require('https');
const path = require('path');

const SITEMAP_URL = process.env.SITEMAP_URL || 'https://wnlin.org/sitemap.xml';

function log(msg) {
  console.log(msg);
}

function warn(msg) {
  console.warn(`Warning: ${msg}`);
}

function fileExists(p) {
  try {
    return fs.statSync(p).isFile();
  } catch {
    return false;
  }
}

function request(url) {
  return new Promise((resolve) => {
    https
      .get(url, (res) => {
        // Drain data to free socket.
        res.resume();
        const ok = res.statusCode >= 200 && res.statusCode < 300;
        resolve({ ok, status: res.statusCode });
      })
      .on('error', (err) => resolve({ ok: false, error: err.message }));
  });
}

async function pingSitemap(urls) {
  for (const url of urls) {
    const res = await request(url);
    if (res.ok) {
      log(`Pinged: ${url}`);
      return true;
    }
    warn(`Ping failed (${res.status || res.error}) for ${url}`);
  }
  return false;
}

async function main() {
  log('Post-build (node): verifying static assets...');
  const indexPath = path.join(process.cwd(), 'index.html');
  if (!fileExists(indexPath)) {
    throw new Error('index.html not found in repo root; adjust build command or paths.');
  }

  log(`Post-build (node): pinging Google with sitemap ${SITEMAP_URL}...`);
  const encoded = encodeURIComponent(SITEMAP_URL);
  const urls = [
    `https://www.google.com/ping?sitemap=${SITEMAP_URL}`,
    `https://www.google.com/ping?sitemap=${encoded}`,
  ];

  const ok = await pingSitemap(urls);
  if (!ok) {
    warn('Sitemap ping failed for both raw and encoded URLs. Build continues.');
  }
  log('Post-build complete.');
}

main().catch((err) => {
  console.error(err.message || err);
  process.exit(1);
});
