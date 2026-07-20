# Muso Dojo Logo

A small web component and browser-based logo lab for Muso Dojo brand artwork,
headers, social assets, and app icons.

GitHub Pages: https://conor-dowdall.github.io/muso-dojo-logo/

## Files

- `index.html`: the logo lab UI.
- `muso-dojo-logo.mjs`: the `<muso-dojo-logo>` web component.
- `logo-config.mjs`: shared brand, size, color, and lockup constants.
- `Stick-Regular.ttf`: the bundled Stick font.
- `OFL.txt`: the Stick font license.
- `site.webmanifest`: example PWA install metadata.

## Component

```html
<script type="module" src="./muso-dojo-logo.mjs"></script>

<muso-dojo-logo
  variant="hero"
  theme="dark"
></muso-dojo-logo>
```

Variants:

- `hero`: wide centered lockup.
- `stacked`: square social or splash layout.
- `icon`: mark-only app icon artwork.
- `wordmark`: title and subtitle only.
- `social-square`: square social artwork with a centered stacked lockup.
- `video-title-card`: 1920 x 1080 video title artwork.
- `play-feature`: 1024 x 500 Google Play feature graphic on a filled dark
  canvas.
- `youtube-banner`: 2560 x 1440 channel banner with the critical lockup inside
  the centered 1546 x 423 all-devices safe area.

Logo themes mirror the main Muso Dojo app's `--color-base` and `--color-text`
pairs:

- `dark`: `#f7f8fb` text on `#08090d` artwork.
- `light`: `#18181b` text on `#fbfbfd` artwork.
- `ocean`: `#eefbff` text on `#06131e` artwork.
- `purple`: `#f7f1ff` text on `#140f22` artwork.

Color convention:

- Finished artwork uses the selected app theme's base/text pair and the Muso
  Dojo rainbow gradient. Shadows and guide UI may still use alpha black or
  white where needed for depth and contrast.
- Light-theme artwork gives the rainbow mark a restrained neutral keyline so
  its yellow and green sections remain defined without softening the mark.
- The rainbow is intentionally perceptual rather than mathematically additive:
  red, orange, yellow, green, cyan, blue, and purple stops give the mark a full
  rainbow read without making the yellow/cyan bands disappear on white.
- `logo-config.mjs` is the source of truth for brand colors, theme backgrounds,
  and rainbow gradient stops. The component uses those same constants for SVG
  previews and canvas exports.

Brand text and layout:

- The title, subtitle, and mark are fixed constants in `logo-config.mjs`:
  `Muso Dojo`, `Play Music`, and `M`.
- Wide horizontal artwork uses the shared `HORIZONTAL_LOCKUP_SYSTEM` in
  `logo-config.mjs`. The component measures the fitted title, mark, and
  subtitle, places equal inner edge gaps around the `M`, and optically centers
  the complete group. That keeps the hero, video title card, Play feature
  graphic, and YouTube banner visually related even though their canvases have
  different proportions.

Other attributes:

- `mark-frame`: `plain` by default for the standalone rainbow mark, `halo` as an
  opt-in contrast fallback for difficult transparent placements, or `disc` for
  older badge-style artwork.
- `background`: optional SVG/export background color.
- `theme`: `dark`, `light`, `ocean`, or `purple`.
- `tone`: compatibility alias for older embeds. `on-dark` maps to `dark` and
  `on-light` maps to `light`.

## Lab

Open `index.html` from GitHub Pages or any local static server to choose the
logo theme and artwork background. The brand title, subtitle, and mark are
fixed in the component. Artwork background defaults to `Theme filled`, which
is the recommended finished-export setting. Use `Transparent` when you want a
reusable source layer for GIMP or another composition tool. Export buttons
generate PNG or WebP files from the live component. The Play feature graphic
card exports a PNG for Google Play's 1024 x 500 requirement. The Play feature
graphic and YouTube banner live in a separate store/channel section because
they always use filled canvases. The YouTube banner preview includes crop
guides for placement, but those guides are not included in exported files.

## Brand Placement

For product chrome, combine the standalone icon mark with app-native title text
so the header can respond naturally to its available space:

```html
<muso-dojo-logo
  variant="icon"
  theme="dark"
></muso-dojo-logo>
```

Avoid full branding lockups on interactive practice, lesson, quiz,
ear-training, or instrument-work pages. In those places, use a small home
control, favicon, icon mark, or no visible branding so the learning task stays
light.

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
artwork. The 32px favicon intentionally exports the same mark at a slightly
larger source scale so the tiny browser tab icon has stronger presence. Apple
touch and maskable icons use the same plain mark on a dark full-bleed canvas,
with the important artwork kept inside the maskable safe area. Finished dark
artwork exports use `#08090d`; finished light artwork exports use `#fbfbfd`;
the lab UI keeps a softer near-black page surface so controls remain
comfortable.

## Export API

```js
const logo = document.querySelector("muso-dojo-logo");

await logo.download({
  width: 1600,
  height: 450,
  theme: "dark",
  type: "image/png",
  background: "#08090d",
});

const blob = await logo.toBlob({
  width: 1080,
  height: 1080,
  theme: "purple",
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
