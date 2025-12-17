# wnlin.org

Static, single-page resume for WN Lin.

## Getting started

- Open `index.html` in a browser, or run a quick server with `python3 -m http.server` and visit http://localhost:8000.
- Edit the copy in `index.html` to reflect your experience (roles, dates, projects, links).
- Adjust colors or typography in `styles.css` by updating the CSS variables near the top.
- Export your PDF resume and place it as `resume.pdf` in the project root to enable the download button.

## Deploying to GitHub Pages

1. Push the files to your GitHub repository.
2. In repository settings, enable GitHub Pages with the root of `main` as the source.
3. Wait for the deployment to finish; your resume will be live at the Pages URL provided by GitHub.

## Deploying to Cloudflare Pages

- Use Framework preset **None**, leave Build command **empty**, and set Output directory to `/`.
- If you prefer keeping a build command, you can run `npx wrangler deploy` thanks to the included `wrangler.toml`, which points Wrangler to serve the static assets from the repo root. Ensure your Cloudflare account credentials are available in the Pages build environment.
