export const BRAND = Object.freeze({
  mark: "M",
  subtitle: "Play Music",
  title: "Muso Dojo",
});

export const HAS_SUBTITLE = Boolean(BRAND.subtitle);

export const DEFAULTS = {
  markFrame: "plain",
  theme: "dark",
  tone: "on-dark",
  variant: "hero",
};

const RAINBOW_COLORS = Object.freeze({
  blue: "#3a7bff",
  cyan: "#20caff",
  green: "#27df62",
  orange: "#ff9d2e",
  purple: "#b879ff",
  red: "#ff4b31",
  yellow: "#ffd84a",
});

export const BRAND_COLORS = Object.freeze({
  darkBase: "#08090d",
  darkText: "#f7f8fb",
  lightBase: "#fbfbfd",
  lightText: "#18181b",
  transparent: "transparent",
  alpha: Object.freeze({
    black10: "rgb(0 0 0 / 0.1)",
    black16: "rgb(0 0 0 / 0.16)",
    black18: "rgb(0 0 0 / 0.18)",
    black28: "rgb(0 0 0 / 0.28)",
    black36: "rgb(0 0 0 / 0.36)",
    black56: "rgb(0 0 0 / 0.56)",
    white12: "rgb(255 255 255 / 0.12)",
    white34: "rgb(255 255 255 / 0.34)",
  }),
  rainbow: RAINBOW_COLORS,
});

export const LOGO_THEME_COLORS = Object.freeze({
  dark: Object.freeze({
    background: BRAND_COLORS.darkBase,
    text: BRAND_COLORS.darkText,
  }),
  light: Object.freeze({
    background: BRAND_COLORS.lightBase,
    text: BRAND_COLORS.lightText,
  }),
  ocean: Object.freeze({
    background: "#06131e",
    text: "#eefbff",
  }),
  purple: Object.freeze({
    background: "#140f22",
    text: "#f7f1ff",
  }),
});

export const TONE_THEMES = Object.freeze({
  "on-dark": "dark",
  "on-light": "light",
});

// Compatibility map for existing consumers of the two-treatment API.
export const LOGO_TONE_COLORS = Object.freeze(
  Object.fromEntries(
    Object.entries(TONE_THEMES).map(([tone, theme]) => [
      tone,
      LOGO_THEME_COLORS[theme],
    ]),
  ),
);

export const VIEW_BOXES = {
  hero: { width: 1600, height: 450 },
  stacked: { width: 1080, height: 1080 },
  icon: { width: 512, height: 512 },
  wordmark: { width: 1200, height: 320 },
  "social-square": { width: 1080, height: 1080 },
  "video-title-card": { width: 1920, height: 1080 },
  "video-title-card-portrait": { width: 1080, height: 1920 },
  "play-feature": { width: 1024, height: 500 },
  "youtube-banner": { width: 2560, height: 1440 },
};

export const STACKED_LOCKUPS = Object.freeze({
  stacked: Object.freeze({
    markRadius: 192,
    markY: 385,
    subtitleY: 760,
    titleY: 650,
  }),
  "social-square": Object.freeze({
    markRadius: 200,
    markY: 400,
    subtitleY: 760,
    titleY: 650,
  }),
  "video-title-card-portrait": Object.freeze({
    markRadius: 220,
    markY: 820,
    subtitleY: 1270,
    titleY: 1150,
  }),
});

export const HORIZONTAL_LOCKUP_SYSTEM = {
  // Keep wide lockups related by spacing visible edges, not text centers.
  innerGapRatio: 0.64,
  subtitleMaxWidthRatio: 3.9,
  subtitleSizeRatio: 0.59,
  titleMaxWidthRatio: 4.1,
  titleSizeRatio: 0.74,
};

export const HORIZONTAL_LOCKUPS = {
  hero: horizontalLockup("hero", { markRadius: 124 }),
  "play-feature": horizontalLockup("play-feature", { markRadius: 88 }),
  "video-title-card": horizontalLockup("video-title-card", {
    markRadius: 142,
  }),
  "youtube-banner": horizontalLockup("youtube-banner", { markRadius: 118 }),
};

function horizontalLockup(variant, options = {}) {
  const box = VIEW_BOXES[variant];
  const markRadius = options.markRadius;
  const innerGapRatio =
    options.innerGapRatio ?? HORIZONTAL_LOCKUP_SYSTEM.innerGapRatio;

  return {
    centerX: options.centerX ?? box.width / 2,
    innerGapRatio,
    markRadius,
    subtitleMaxWidth: Math.round(
      markRadius * HORIZONTAL_LOCKUP_SYSTEM.subtitleMaxWidthRatio,
    ),
    subtitlePreferredSize: Math.round(
      markRadius * HORIZONTAL_LOCKUP_SYSTEM.subtitleSizeRatio,
    ),
    textY: options.textY ?? box.height / 2,
    titleMaxWidth: Math.round(
      markRadius * HORIZONTAL_LOCKUP_SYSTEM.titleMaxWidthRatio,
    ),
    titlePreferredSize: Math.round(
      markRadius * HORIZONTAL_LOCKUP_SYSTEM.titleSizeRatio,
    ),
  };
}

export const MARK_FRAME_SETTINGS = {
  plain: {
    maxWidthRatio: 1.52,
    minSizeRatio: 0.74,
    preferredSizeRatio: 1.86,
    strokeWidthRatio: 0,
    verticalScale: 0.84,
    visualCenterOffsetRatio: 0,
  },
  disc: {
    maxWidthRatio: 1.18,
    minSizeRatio: 0.62,
    preferredSizeRatio: 1.42,
    strokeWidthRatio: 0.03,
    verticalScale: 0.84,
    visualCenterOffsetRatio: 0,
  },
  halo: {
    haloInnerStrokeWidthRatio: 0.034,
    haloOuterStrokeWidthRatio: 0.074,
    maxWidthRatio: 1.48,
    minSizeRatio: 0.76,
    preferredSizeRatio: 1.8,
    strokeWidthRatio: 0,
    verticalScale: 0.84,
    visualCenterOffsetRatio: 0,
  },
};

export const GRADIENT_STOPS = Object.freeze([
  { color: RAINBOW_COLORS.red, name: "red", offset: 0 },
  { color: RAINBOW_COLORS.red, name: "red-hold", offset: 0.1 },
  { color: RAINBOW_COLORS.orange, name: "orange", offset: 0.24 },
  { color: RAINBOW_COLORS.yellow, name: "yellow", offset: 0.4 },
  { color: RAINBOW_COLORS.green, name: "green", offset: 0.56 },
  { color: RAINBOW_COLORS.cyan, name: "cyan", offset: 0.72 },
  { color: RAINBOW_COLORS.blue, name: "blue", offset: 0.82 },
  { color: RAINBOW_COLORS.purple, name: "purple-start", offset: 0.92 },
  { color: RAINBOW_COLORS.purple, name: "purple", offset: 1 },
]);

export const VALID_VARIANTS = new Set(Object.keys(VIEW_BOXES));
export const VALID_THEMES = new Set(Object.keys(LOGO_THEME_COLORS));
export const VALID_TONES = new Set(Object.keys(TONE_THEMES));
export const VALID_MARK_FRAMES = new Set(Object.keys(MARK_FRAME_SETTINGS));
