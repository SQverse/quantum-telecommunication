# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## What this is

Static marketing website for **LPK Quantum Telecommunication** (quantumtelecom.id), a smartphone-technician training institute. All content is in Indonesian. Plain HTML/CSS/JS: no build step, no package manager, no tests, no linter. Libraries load from CDNs: Swiper 11 (Swiper 10 on `menu/news.html`), Font Awesome 6.4, Animate.css, and Google Fonts (Poppins, Open Sans, Montserrat, Roboto Condensed).

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
- **Brand colors** are CSS variables declared in each page's `:root`: `--blue-gradient` (#4a90e2 → #1a3c6e), `--blue-dark` #1a3c6e, `--accent-orange` #ff8c42, `--accent-gradient`.
- **The CSS in `index.html` has accumulated over time.** The same selector (e.g. `.hero-content`, `.hero-title`, `section`) is often redefined in several places further down the file, sometimes with `!important`, so later rules win. Before changing a component, grep for every definition of its selector. For a redesign, prefer new class names over patching old selectors. The current homepage hero uses `.hero-full*`, and the homepage sections added in the Nov 2026 revision (Pilih Kelas, Kenapa, Dipercaya, Alumni, Cara Daftar, FAQ, Kabar) use `.hq-*` classes whose CSS sits at the end of the `<style>` block. The older `.hero*`, `.features-*`, `.program-depth-*` and `.coop-*` rules are unused leftovers.
- **Global section fade-in:** `section { opacity: 0; transform: translateY(20px) }` stays hidden until JS adds `.visible` on scroll. Any section that should be visible immediately (like the hero) has to override `opacity: 1; transform: none`.
- **Fixed header:** the header is `position: fixed` and about 70px tall, and `html` has `scroll-padding-top: 80px`. Full-height sections need top padding to clear it.
- **Swiper instances** are created in a `DOMContentLoaded` handler near the end of `index.html` (`.instructor-slider`, `.sponsor-swiper`, `.banner-slider__swiper`). If you remove a slider's markup, also remove its `new Swiper(...)` call.
- **News** (`menu/news.html`): each article is a `.news-item` card with `data-category` set to `liputan` (media coverage), `kegiatan` (activities), or `video` (YouTube tutorials); the filter tabs also have `semua`. Cards are ordered newest first. To add an article, copy the snippet from `documentation/template-berita.md`, put the image in `assets/photos/section/`, and insert the card into `menu/news.html`.
- **WhatsApp contact:** registration/CTA links go to `https://wa.me/6282171727337`, usually with a `?text=` message naming the class so the admin knows where the chat came from.
- **Nav and footer links** are the same set on every page (Beranda, Tentang Kami, Program, Portofolio, Alumni, Kabar) and use relative paths. The footer year is filled by JS from `.js-year`.
- **SEO files:** `sitemap.xml` and `robots.txt` live at the root, and `404.html` uses root-absolute paths because the host serves it at any URL. Add new pages to `sitemap.xml`. The homepage has `EducationalOrganization` JSON-LD; the two detail pages have `Course` JSON-LD.

## Conventions

- HTML files use **CRLF** line endings. Preserve them when editing with scripts; Python's text mode converts them to LF.
- Commit messages are short and informal Indonesian/English (e.g. "add berita ...", "fix ..."). Work happens directly on `main`, which is pushed to `github.com/SQverse/quantum-telecommunication`.
