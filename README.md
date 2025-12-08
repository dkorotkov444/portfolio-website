# portfolio-website

This repository contains a small personal portfolio website (static HTML/CSS/JS) used to showcase training and development projects.

Summary
-------
- Purpose: a lightweight, static portfolio with pages for Home, About, Work (projects) and Contact.
- Tech: plain HTML, CSS and a small amount of vanilla JavaScript (no framework required).

Key files and folders
---------------------
- `index.html`, `about.html`, `work.html`, `contact.html` — top-level pages.
- `css/style.production.css` — production-ready stylesheet (autoprefixed build output). This file is loaded by the pages.
- `css/styles.css` — human-editable source stylesheet (contains CSS variables and easier-to-edit rules). Keep this as the source of truth while developing.
- `js/site.js` — small site scripts (modal lightbox, a11y helpers).
- `js/tota11y.min.js` — accessibility helper included on the pages (optional developer tool).
- `img/` — images and screenshots used on the site.

Current state
-------------
- The `index.html` home page includes a comprehensive skills section organized into four categories: Backend Development, Frontend Development, Mobile Development, and Additional Technologies. The skills grid uses CSS Grid with responsive layouts (1 column on mobile to 4 columns on XL screens at 1400px+).
- The `work.html` page contains four project cards (REEL Movie App, Meet Event Finder, Pokedex, and Chat Demo App) with thumbnails and accessible modal previews. The Chat Demo App includes a dedicated video modal for playing the demo video.
- Inline CSS and JS that were previously embedded in `work.html` have been extracted into `css/styles.css` and `js/site.js`; pages load the production stylesheet `css/style.production.css`.
- Modal system provides keyboard handling (Escape to close) and focus management. Video modal supports play, pause, and fullscreen controls.
- Responsive gallery layout: uses CSS Grid with `auto-fit` and `minmax()` to adapt across all screen sizes—from 1 column on mobile to 4 columns on XL screens (1400px+).

Run locally (development)
-------------------------
There is no build tool required to preview the site. Two easy options (PowerShell / Bash on Windows):


- Using Node + serve (recommended if Node is installed):

	npx serve -s . -l 8000

	Then open http://localhost:8000/work.html

Note: linting and accessibility checks were performed during development (examples: htmlhint, pa11y, Lighthouse).

Editing the site
----------------
- To edit the project gallery, open `work.html` and update or add `<article class="project-card">` entries inside the `.gallery` container. Each card has:
	- a thumbnail anchor with `data-full="img/…"` that opens the modal preview
	- a title linked to the live demo
	- a short description and an Objective paragraph
	- Live demo / Source links and technology badges
- Screenshots live in `img/`. Use reasonably-sized JPG/PNG files and consider adding `srcset` for responsive images.

CSS workflow recommendation
--------------------------
- Current setup: pages include the production CSS (`css/style.production.css`) for best browser compatibility. `css/styles.css` contains the more readable source rules and variables.
- Recommended workflow (for automated builds): use PostCSS + Autoprefixer (and optional cssnano) to generate `style.production.css` from `styles.css`.

Accessibility and validation
----------------------------
- Images have alt text and the modal toggles `aria-hidden`. The modal includes a focus trap and ESC handling.
- For further improvements: add a proper focus trap library for robust keyboard trapping, and use `inert` (or set `aria-hidden` on the main content) when the modal is open to prevent screen reader confusion.



