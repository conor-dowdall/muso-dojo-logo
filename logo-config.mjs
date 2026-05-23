export const BRAND = Object.freeze({
  mark: "M",
  subtitle: "Play Music",
  title: "Muso Dojo",
});

export const HAS_SUBTITLE = Boolean(BRAND.subtitle);

export const DEFAULTS = {
  markFrame: "plain",
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
  black: "#000000",
  white: "#ffffff",
  transparent: "transparent",
  alpha: Object.freeze({
    black10: "rgb(0 0 0 / 0.1)",
    black12: "rgb(0 0 0 / 0.12)",
    black16: "rgb(0 0 0 / 0.16)",
    black18: "rgb(0 0 0 / 0.18)",
    black22: "rgb(0 0 0 / 0.22)",
    black28: "rgb(0 0 0 / 0.28)",
    black32: "rgb(0 0 0 / 0.32)",
    black36: "rgb(0 0 0 / 0.36)",
    black56: "rgb(0 0 0 / 0.56)",
    white12: "rgb(255 255 255 / 0.12)",
    white34: "rgb(255 255 255 / 0.34)",
  }),
  rainbow: RAINBOW_COLORS,
});

export const LOGO_TONE_COLORS = Object.freeze({
  "on-dark": Object.freeze({
    background: BRAND_COLORS.black,
    text: BRAND_COLORS.white,
  }),
  "on-light": Object.freeze({
    background: BRAND_COLORS.white,
    text: BRAND_COLORS.black,
  }),
});

export const VIEW_BOXES = {
  hero: { width: 1600, height: 450 },
  app: { width: 560, height: 180 },
  stacked: { width: 1080, height: 1080 },
  icon: { width: 512, height: 512 },
  wordmark: { width: 1200, height: 320 },
  "social-square": { width: 1080, height: 1080 },
  "video-title-card": { width: 1920, height: 1080 },
  "play-feature": { width: 1024, height: 500 },
  "youtube-banner": { width: 2560, height: 1440 },
};

export const HORIZONTAL_LOCKUP_SYSTEM = {
  // Keep wide lockups related by spacing visible edges, not text centers.
  innerGapRatio: 0.72,
  subtitleMaxWidthRatio: 3.9,
  subtitleSizeRatio: 0.68,
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
    innerGapRatio,
    markRadius,
    markX: options.markX ?? box.width / 2,
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
export const VALID_TONES = new Set(["on-light", "on-dark"]);
export const VALID_MARK_FRAMES = new Set(Object.keys(MARK_FRAME_SETTINGS));
