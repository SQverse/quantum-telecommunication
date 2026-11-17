# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## What this is

Static marketing website for **LPK Quantum Telecommunication** (quantumtelecom.id), a smartphone-technician training institute. All content is in Indonesian. Plain HTML/CSS/JS: no build step, no package manager, no tests, no linter. Libraries load from CDNs: Swiper 11 (Swiper 10 on `menu/news.html`), Phosphor Icons 2.1 (bold weight only, `unpkg.com/@phosphor-icons/web@2.1.1/src/bold/style.css`), Animate.css, and Google Fonts (Poppins, Open Sans, Montserrat, Roboto Condensed).

**Icons:** Font Awesome was removed in Nov 2026. Write icons as `<i class="ph-bold ph-NAME"></i>` (e.g. `ph-whatsapp-logo`, `ph-arrow-right`, `ph-map-pin`, `ph-calendar-blank`, `ph-caret-down`; names at phosphoricons.com). Only the bold weight is loaded, so `ph`, `ph-fill` or `ph-duotone` classes won't render. The mobile menu JS toggles `ph-list` ↔ `ph-x`. `qx-style` enlarges icons slightly via `:where(.ph-bold)` (zero specificity, so any explicit font-size on an icon still wins).

## Running / previewing

Open `index.html` directly in a browser, or serve the repo root with any static server (for example `python -m http.server`). To check a layout without a browser window, take a screenshot with headless Chrome:

```
"/c/Program Files/Google/Chrome/Application/chrome.exe" --headless=new --hide-scrollbars --virtual-time-budget=8000 --window-size=1440,900 --screenshot=out.png "file:///C:/Users/HP/Desktop/quantum-telecommunication/index.html"
```

Headless Chrome won't render windows narrower than about 500px. For a phone-width check (390px), load the page inside a 390px-wide `<iframe>` in a wrapper HTML file and screenshot that wrapper. CSS entrance animations may still be mid-fade when the screenshot is taken.

## Structure

- `index.html` is the homepage, about 5,000 lines. All of its CSS is in one inline `<style>` block in `<head>`, and all of its JS is in inline `<script>` blocks at the end of `<body>`.
- `menu/*.html` holds the subpages (about, programs, alumni, news, materi, detail pages, landing page). `menu/kerjasama/*.html` holds the partnership/portfolio pages (pemerintah, swasta, internasional).
- `assets/photos/...` holds all images, grouped by use (`hero/`, `CTA/`, `logo/`, `mitra/`, `section/`, ...). Many filenames contain spaces or double extensions (e.g. `logo titan.jpg.jpeg`), so reference them exactly.
- `documentation/` contains `.md` files that actually hold **HTML snippets**, not prose:
  - `template-berita.md` is the copy-paste template for a news card.
  - `news.md` and `doc.md` are saved HTML drafts or snapshots.

  The root `news.md` is also an HTML snapshot.
- `index1.html` is an older backup copy of the homepage. No page links to it, so don't edit it unless asked.
- `quantum-lab/` is a separate Firebase Hosting placeholder and is not linked from the site.

## Architecture notes that span files

- **No shared stylesheet or partials.** Every page duplicates its own `<head>`, header/nav, footer, `:root` color variables, and CSS inline. A change to the nav, footer, colors, or contact info has to be made in each HTML file separately.
- **Relative paths depend on folder depth.** `index.html` uses `assets/...` and `menu/...`. Pages in `menu/` use `../assets/...` and `../index.html`. Pages in `menu/kerjasama/` use `../../`.
- **Brand colors** are CSS variables declared in each page's `:root`: `--blue-gradient` (#4a90e2 → #1a3c6e), `--blue-dark` #1a3c6e, `--accent-orange` #ff8c42, `--accent-gradient`. **Color rule (Nov 2026):** there is no orange any more. Despite their names, `--accent-orange` (#1592d8), `--accent-orange-dark` (#064ec1), `--accent-orange-light` (#5cc8f0) and `--accent-gradient` (#16a5e4 → #064ec1, the logo gradient) now hold cyan/blue values; don't reintroduce #ff8c42. CTA buttons (daftar/WhatsApp/primary buttons, navbar `.qh-cta`, footer "Chat Admin", `.hq-btn--solid`, hero primary button) use the logo gradient. Every other accent (eyebrows, icons, badges, bullets, underlines, timeline, slider dots, links, prices) uses the logo cyan: #16a5e4 for fills, #0e95d6 for text on light backgrounds, #5cc8f0 for text on dark backgrounds, #e6f6fd soft background, gradient #16a5e4 → #064ec1. WhatsApp green (#25d366) only on buttons that open WhatsApp. detail-offline/online keep their own token names (`--gold-*`), but those now hold the cyan scale too; only the landing page keeps its real gold palette.
- **The CSS in `index.html` has accumulated over time.** The same selector (e.g. `.hero-content`, `.hero-title`, `section`) is often redefined in several places further down the file, sometimes with `!important`, so later rules win. Before changing a component, grep for every definition of its selector. For a redesign, prefer new class names over patching old selectors. The current homepage hero uses `.hero-full*`, and the homepage sections added in the Nov 2026 revision (Pilih Kelas, Kenapa, Dipercaya, Alumni, Cara Daftar, FAQ, Kabar) use `.hq-*` classes whose CSS sits at the end of the `<style>` block. The older `.hero*`, `.features-*`, `.program-depth-*` and `.coop-*` rules are unused leftovers. `menu/about.html` and `menu/programs.html` were rebuilt the same way (Nov 2026): sections use the homepage `.hq-*`/`.qk-*` classes copied into a page `<style id="ab-style">`/`<style id="pg-style">`, plus page-specific `ab-*`/`pg-*` classes; their older CSS is unused leftover. The Pilih Kelas cards now use `.qk-*` (grouped Android/iPhone rows, gradient header with brand icon, price block pinned to the bottom, 10px-radius full-width buttons, a `.qk-help` consult card filling the iPhone row; on phones each group is a horizontal scroll-snap carousel). Homepage `.hq-btn` buttons are 10px-radius, not pills.
- **Global section fade-in:** `section { opacity: 0; transform: translateY(20px) }` stays hidden until JS adds `.visible` on scroll. Any section that should be visible immediately (like the hero) has to override `opacity: 1; transform: none`.
- **Fixed header:** the header is `position: fixed` and about 70px tall, and `html` has `scroll-padding-top: 80px`. Full-height sections need top padding to clear it.
- **Swiper instances** are created in a `DOMContentLoaded` handler near the end of `index.html` (`.instructor-slider`, `.sponsor-swiper`, `.banner-slider__swiper`). If you remove a slider's markup, also remove its `new Swiper(...)` call.
- **News** (`menu/news.html`): each article is a `.news-item` card with `data-category` set to `liputan` (media coverage), `kegiatan` (activities), or `video` (YouTube tutorials); the filter tabs also have `semua`. Cards are ordered newest first. To add an article, copy the snippet from `documentation/template-berita.md`, put the image in `assets/photos/section/`, and insert the card into `menu/news.html`.
- **WhatsApp contact:** registration/CTA links go to `https://wa.me/6282171727337`, usually with a `?text=` message naming the class so the admin knows where the chat came from.
- **Nav and footer links** are the same set on every page (Beranda, Tentang Kami, Program, Portofolio, Alumni, Kabar) and use relative paths. The footer year is filled by JS from `.js-year`.
- **Navbar** is `<header class="qh qh-fixed header--top">` on every page with a navbar: fixed and transparent (white logo/links) over the dark hero, turning white once scrolled past it. The toggle is a small script (`#qh-top-script` on subpages, inline on index/about) that looks for the hero (`.hero-full`, `.ab-hero`, `.qp-hero`, `.hero-programs-v2`, `.hero-small`, `.news-hero`, `header.hero`); every page's first block must therefore be a dark hero with ~70px extra top padding. Program, Alumni, Kabar and the three Portofolio pages use the shared photo hero `.qp-hero` (`<style id="qp-style">`, identical on each, breadcrumb lives inside it as `.qp-crumb`); other pages get their padding from a per-page `<style id="qh-top-style">`. Markup keeps the old class names (`.header-content`, `.logo`, `.dropdown`, `.mobile-menu-btn`) so each page's existing toggle JS still works; the look comes from a `<style id="qh-style">` block before `</head>` that is identical on every page and overrides the old per-page header CSS. Pages without their own nav JS (roadshow, detail-offline, detail-online) get a `<script id="qh-script">` before `</body>`. The landing page has no navbar on purpose. Default look is white frosted glass (blur lives on `header.qh::before`, not on the header itself, because a `backdrop-filter` on the header would break the fixed mobile drawer), dark Poppins links, `.active` link as a light-blue pill, and an orange `.qh-cta` "Daftar" WhatsApp button. Desktop hides the link icons; the mobile drawer shows them.
- **Look & feel (Nov 2026 refresh):** each page has a `<style id="qx-style">` before `</head>` (identical everywhere) that sets soft navy-tinted `--shadow`/`--shadow-hover`, `--r:12px`, and makes every `.section-title`/`.section-header` heading match the homepage `.hq-head` style (navy Poppins 800, no orange underline, gray subtitle). Radius scale: cards/boxes 10–12px, big panels/frames 16px, buttons/badges/chips stay pill-shaped, avatars stay 50%. Avoid black/slate (#000, #0f172a) for buttons or sections; use `--blue-dark` #1a3c6e.
- **Footer** is `<footer class="qf">` with `.qf-*` classes; its CSS is a `<style id="qf-style">` block just before `</head>` on each page (identical everywhere; sizes are in px so they don't depend on page CSS). On phones (≤600px) the footer is `min-height:100svh` and compacted so it fills exactly one screen (map hidden; extra tightening at `max-height:780px`). Keep it fitting one screen if you add content. The old `.footer-*`, `.map-container`, `.copyright` rules are unused leftovers. `detail-offline.html`, `detail-online.html` and the landing page keep their own minimal footer by design.
- **SEO files:** `sitemap.xml` and `robots.txt` live at the root, and `404.html` uses root-absolute paths because the host serves it at any URL. Add new pages to `sitemap.xml`. The homepage has `EducationalOrganization` JSON-LD; the two detail pages have `Course` JSON-LD.

## Conventions

- HTML files use **CRLF** line endings. Preserve them when editing with scripts; Python's text mode converts them to LF.
- Commit messages are short and informal Indonesian/English (e.g. "add berita ...", "fix ..."). Work happens directly on `main`, which is pushed to `github.com/SQverse/quantum-telecommunication`.
