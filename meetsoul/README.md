# 遇缘阁 MeetSoul Crystal — Mobile-First Website

A bilingual (中文 / EN), mobile-first showcase site built to the design brief.
Static HTML/CSS/JS — no build step. Open `index.html` or serve the `meetsoul/`
folder with any static host (e.g. GitHub Pages).

## Pages
| File | Page |
|---|---|
| `index.html` | Home — hero, trust strip, entry cards, bestsellers, free-matching lead magnet, Guide teaser |
| `shop.html` | Shop — sticky search + filter bottom sheet (intention / format / size / colour / price), product grid |
| `product.html` | Product Detail — swipe gallery, size selector with **pre-calculated totals**, sticky "Order via WhatsApp" CTA, accordions, "pairs well with" |
| `guide.html` | Guide — crystal meanings, bead-size guide, which-hand, care (non-medical language) |
| `about.html` | About — story, sourcing philosophy, reviews |
| `contact.html` | Contact — WhatsApp, hours, address, shipping (RM5/RM12), TnG payment, returns, FAQ |

## Assets
- `assets/styles.css` — design system: brand tokens (§8.5), 4px spacing scale, rem typography, components.
- `assets/data.js` — bilingual product data (`name_zh`/`name_en` …) + filter taxonomies.
- `assets/app.js` — i18n toggle (persisted, no reload), nav, filter sheet, gallery, accordions, reveal-on-scroll, WhatsApp deep links.
- `assets/shop.js` — shop grid + search/filter logic.
- `assets/product.js` — product detail rendering + sticky CTA.

## ⚠️ Before going live — two placeholders to replace
1. **WhatsApp number** — edit `WA_NUMBER` at the top of `assets/data.js`
   (international format, no `+`, e.g. `60123456789`). All WhatsApp links use it.
2. **Product photography** — image slots currently use soft gradient placeholders.
   Drop in real **WebP** photos (clean product shot first, include an on-wrist
   shot), lazy-loaded, hero/first image < ~150KB (brief §8.7), with descriptive
   alt text per stone.

## Notes
- Default language is Chinese; choice is remembered via `localStorage` and swaps
  in place without losing scroll position (brief §8.10).
- Pricing is per-bead but **shown as a total per size** so customers don't do math
  (brief §7). Edit the `sizes` array per product in `data.js`.
- Copy intentionally avoids medical claims ("traditionally associated with…")
  per Malaysian advertising rules (brief §3).
- Respects `prefers-reduced-motion`; tap targets ≥ 44px; safe-area padding for the
  iPhone home indicator.
