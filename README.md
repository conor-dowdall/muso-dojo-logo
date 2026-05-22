# Muso Dojo Logo

A small web component and browser-based logo lab for Muso Dojo brand artwork,
headers, social assets, and app icons.

GitHub Pages: https://conor-dowdall.github.io/muso-dojo-logo/

## Files

- `index.html`: the logo lab UI.
- `muso-dojo-logo.mjs`: the `<muso-dojo-logo>` web component.
- `logo-config.mjs`: shared brand, size, color, and lockup constants.
- `wave-fields.mjs`: harmonic wave presets and point-generation helpers.
- `Stick-Regular.ttf`: the bundled Stick font.
- `OFL.txt`: the Stick font license.
- `site.webmanifest`: example PWA install metadata.

## Component

```html
<script type="module" src="./muso-dojo-logo.mjs"></script>

<muso-dojo-logo
  variant="hero"
  tone="on-dark"
></muso-dojo-logo>
```

Variants:

- `hero`: wide centered lockup.
- `app`: compact app header lockup.
- `stacked`: square social or splash layout.
- `icon`: mark-only app icon artwork.
- `wordmark`: title and subtitle only.
- `social-square`: square social artwork with subtle harmonic wave texture.
- `video-title-card`: 1920 x 1080 video title artwork with subtle harmonic
  wave texture.
- `play-feature`: 1024 x 500 Google Play feature graphic on a filled dark
  canvas.
- `youtube-banner`: 2560 x 1440 channel banner with the critical lockup inside
  the centered 1546 x 423 all-devices safe area and subtle harmonic wave
  artwork for larger crops.

Logo treatments:

- `on-dark`: pure white `#ffffff` text on pure black `#000000` artwork.
- `on-light`: pure black `#000000` text on pure white `#ffffff` artwork.

Color convention:

- Finished artwork uses pure black, pure white, and the Muso Dojo rainbow
  gradient. Shadows and guide UI may use alpha, but the brand surfaces and text
  stay anchored to `#000000` and `#ffffff`.
- The rainbow is intentionally perceptual rather than mathematically additive:
  red, orange, yellow, green, cyan, blue, and purple stops give the mark a full
  rainbow read without making the yellow/cyan bands disappear on white.
- `logo-config.mjs` is the source of truth for brand colors, tone backgrounds,
  and rainbow gradient stops. The component uses those same constants for SVG
  previews and canvas exports.

Brand text and layout:

- The title, subtitle, and mark are fixed constants in `logo-config.mjs`:
  `Muso Dojo`, `Play Music`, and `M`.
- Wide horizontal artwork uses the shared `HORIZONTAL_LOCKUP_SYSTEM` in
  `logo-config.mjs`. The component measures the fitted title, mark, and
  subtitle, then places equal inner edge gaps around the `M`. That keeps the
  hero, video title card, Play feature graphic, and YouTube banner visually
  related even though their canvases have different proportions.

Other attributes:

- `mark-frame`: `plain` by default for the standalone rainbow mark, `halo` as an
  opt-in contrast fallback for difficult transparent placements, or `disc` for
  older badge-style artwork.
- `background`: optional SVG/export background color.
- `theme`: older compatibility alias. Prefer `tone`.

## Lab

Open `index.html` from GitHub Pages or any local static server to choose the
logo treatment and artwork background. The brand title, subtitle, and mark are
fixed in the component. The lab is dark-mode only, while the logo treatment
selector still supports `Dark on light` for light-surface exports. Artwork
background defaults to `Tone filled`, which is the recommended finished-export
setting. Use `Transparent` when you want a reusable source layer for GIMP or
another composition tool. Export buttons generate PNG or WebP files from the
live component. The Play feature graphic card exports a PNG for Google Play's
1024 x 500 requirement. The Play feature graphic and YouTube banner live in a
separate store/channel section because they always use filled canvases. The
YouTube banner preview includes crop guides for placement, but those guides are
not included in exported files.

## Brand Placement

Use `variant="app"` for calm app chrome: sign-in, dashboards, settings, account
areas, launch states, and lightweight documentation. It should feel like a
compact lockup inside the product, not a full banner across the whole viewport.

For desktop, keep the app top bar around 56-72px tall. Use the app lockup at
roughly 170-220px wide, then let navigation, progress, search, or account
actions carry the remaining space.

For mobile, keep the top bar around 48-56px tall. If the full app lockup feels
too dense, use the standalone icon mark with app-native title text:

```html
<muso-dojo-logo
  variant="icon"
  tone="on-dark"
></muso-dojo-logo>
```

Avoid the full app header on interactive practice, lesson, quiz, ear-training,
or instrument-work pages. In those places, use a small home control, favicon,
icon mark, or no visible branding so the learning task stays light.

The App Icons section exports fixed-background icon PNGs used by this site.
These do not follow the lab's global artwork background setting, because each
target has its own required canvas treatment:

- `favicon-32x32.png`
- `apple-touch-icon.png`
- `icon192x192.png`
- `icon512x512.png`
- `icon-maskable-192x192.png`
- `icon-maskable-512x512.png`

Keep the exported icon files in the served root so browsers, iOS, and install
prompts can request them. The manifest lists the PWA install icons; the 32x32
favicon is linked from the document head and can be scaled down by browsers
that need a smaller tab icon.

Standard favicons and PWA `purpose: any` icons use `mark-frame="plain"` on a
transparent canvas to avoid compositing rings in Bubblewrap-generated Android
artwork. Apple touch and maskable icons use the same plain mark on a black
full-bleed canvas, with the important artwork kept inside the maskable safe
area. Finished dark artwork exports use `#000000`; finished light artwork
exports use `#ffffff`; the lab UI keeps a softer near-black page surface so
controls remain comfortable.

The harmonic wave texture is reserved for large artwork exports. Keep it out of
favicons, transparent PWA icons, the app header, and reusable wordmark assets so
the core mark remains crisp at small sizes and in product chrome.

## Export API

```js
const logo = document.querySelector("muso-dojo-logo");

await logo.download({
  width: 1600,
  height: 450,
  tone: "on-dark",
  type: "image/png",
  background: "#000000",
});

const blob = await logo.toBlob({
  width: 1080,
  height: 1080,
  tone: "on-light",
  type: "image/webp",
  background: "transparent",
});
```

## Font And License

This project uses the Stick font from Fontworks:

https://github.com/fontworks-fonts/Stick

The bundled font file is `Stick-Regular.ttf`. It is licensed under the SIL Open
Font License 1.1, included in this repo as `OFL.txt`.

In practical terms:

- You may use Stick in logos, app branding, exported images, videos, websites,
  and commercial software.
- You may bundle/embed the font in an app or website.
- If you distribute the font file, include the copyright notice and `OFL.txt`.
- Do not sell the font file by itself.
- Do not redistribute the font under a different license.
- Documents and images created with the font, including exported logo PNG/WebP
  files, do not have to be licensed under the OFL.

The relevant copyright notice is:

```text
Copyright 2020 The Stick Project Authors (https://github.com/fontworks-fonts/Stick)
```
