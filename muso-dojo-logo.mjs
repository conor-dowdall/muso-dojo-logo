import {
  BRAND,
  BRAND_COLORS,
  DEFAULTS,
  GRADIENT_STOPS,
  HAS_SUBTITLE,
  HORIZONTAL_LOCKUPS,
  LOGO_TONE_COLORS,
  MARK_FRAME_SETTINGS,
  VALID_MARK_FRAMES,
  VALID_TONES,
  VALID_VARIANTS,
  VIEW_BOXES,
} from "./logo-config.mjs";
import { WAVE_FIELDS, wavePathData, wavePoints } from "./wave-fields.mjs";

const SVG_NS = "http://www.w3.org/2000/svg";
const ALPHA_COLORS = BRAND_COLORS.alpha;
const DARK_TONE_COLORS = LOGO_TONE_COLORS["on-dark"];
const LIGHT_TONE_COLORS = LOGO_TONE_COLORS["on-light"];

class MusoDojoLogo extends HTMLElement {
  static observedAttributes = [
    "background",
    "mark-frame",
    "theme",
    "tone",
    "variant",
  ];

  #gradientId;
  #measureCanvas;
  #svg;

  constructor() {
    super();

    this.#gradientId = `muso-logo-gradient-${
      Math.random()
        .toString(36)
        .slice(2)
    }`;

    const shadowRoot = this.attachShadow({ mode: "open" });
    shadowRoot.innerHTML = /* HTML */ `
      <style>
        :host {
          --muso-logo-font-family: "Stick", "Trebuchet MS", Arial, sans-serif;
          --muso-logo-text-color: ${DARK_TONE_COLORS.text};
          --muso-logo-disc-stroke-color: ${ALPHA_COLORS.white12};
          --muso-logo-halo-inner-color: ${ALPHA_COLORS.white34};
          --muso-logo-halo-outer-color: ${ALPHA_COLORS.black56};
          --muso-logo-shadow-color: ${ALPHA_COLORS.black36};
          --muso-logo-text-shadow-blur: 4px;
          --muso-logo-text-shadow-color: ${ALPHA_COLORS.black32};
          --muso-logo-text-shadow-offset-y: 2px;
          --muso-logo-mark-shadow-blur: 3px;
          --muso-logo-mark-shadow-color: ${ALPHA_COLORS.black28};
          --muso-logo-mark-shadow-offset-y: 1px;
          --muso-logo-background-color: ${BRAND_COLORS.transparent};
          --_muso-logo-aspect: 1600 / 450;

          display: block;
          box-sizing: border-box;
          aspect-ratio: var(--_muso-logo-aspect);
          color: var(--muso-logo-text-color);
        }

        :host([variant="app"]) {
          --_muso-logo-aspect: 560 / 180;
        }

        :host([variant="stacked"]) {
          --_muso-logo-aspect: 1 / 1;
        }

        :host([variant="icon"]) {
          --_muso-logo-aspect: 1 / 1;
        }

        :host([variant="wordmark"]) {
          --_muso-logo-aspect: 1200 / 320;
        }

        :host([variant="social-square"]) {
          --_muso-logo-aspect: 1 / 1;
        }

        :host([variant="video-title-card"]) {
          --_muso-logo-aspect: 16 / 9;
        }

        :host([variant="play-feature"]) {
          --_muso-logo-aspect: 1024 / 500;
        }

        :host([variant="youtube-banner"]) {
          --_muso-logo-aspect: 16 / 9;
        }

        :host([theme="light"]),
        :host([tone="on-light"]) {
          --muso-logo-text-color: ${LIGHT_TONE_COLORS.text};
          --muso-logo-disc-stroke-color: ${ALPHA_COLORS.black16};
          --muso-logo-shadow-color: ${ALPHA_COLORS.black18};
          --muso-logo-text-shadow-blur: 0;
          --muso-logo-text-shadow-color: ${BRAND_COLORS.transparent};
          --muso-logo-text-shadow-offset-y: 0;
          --muso-logo-mark-shadow-blur: 3px;
          --muso-logo-mark-shadow-color: ${ALPHA_COLORS.black22};
          --muso-logo-mark-shadow-offset-y: 1px;
        }

        :host([tone="on-dark"]) {
          --muso-logo-text-color: ${DARK_TONE_COLORS.text};
          --muso-logo-disc-stroke-color: ${ALPHA_COLORS.white12};
          --muso-logo-shadow-color: ${ALPHA_COLORS.black36};
          --muso-logo-text-shadow-blur: 4px;
          --muso-logo-text-shadow-color: ${ALPHA_COLORS.black32};
          --muso-logo-text-shadow-offset-y: 2px;
          --muso-logo-mark-shadow-blur: 3px;
          --muso-logo-mark-shadow-color: ${ALPHA_COLORS.black28};
          --muso-logo-mark-shadow-offset-y: 1px;
        }

        :host([variant="app"][tone="on-light"]),
        :host([variant="app"][theme="light"]:not([tone])) {
          --muso-logo-shadow-color: ${ALPHA_COLORS.black12};
        }

        :host([variant="app"]:not([tone]):not([theme])),
        :host([variant="app"][tone="on-dark"]),
        :host([variant="app"][theme="dark"]:not([tone])) {
          --muso-logo-text-shadow-blur: 2px;
          --muso-logo-text-shadow-color: ${ALPHA_COLORS.black22};
          --muso-logo-text-shadow-offset-y: 1px;
        }

        *,
        *::before,
        *::after {
          box-sizing: inherit;
        }

        svg {
          display: block;
          width: 100%;
          height: 100%;
          overflow: visible;
        }

        text {
          font-family: var(--muso-logo-font-family);
          letter-spacing: 0;
        }

        .logo-background {
          fill: var(--muso-logo-background-color);
        }

        .logo-title {
          fill: var(--muso-logo-text-color);
          font-weight: 400;
        }

        .logo-subtitle {
          fill: var(--muso-logo-text-color);
          font-weight: 400;
        }

        .logo-title,
        .logo-subtitle {
          filter: drop-shadow(
            0 var(--muso-logo-text-shadow-offset-y)
              var(--muso-logo-text-shadow-blur)
              var(--muso-logo-text-shadow-color)
          );
        }

        .logo-disc {
          fill: ${BRAND_COLORS.black};
          filter: drop-shadow(0 14px 18px var(--muso-logo-shadow-color));
          stroke: var(--muso-logo-disc-stroke-color);
          stroke-width: 2.5;
        }

        :host([variant="app"]) .logo-disc {
          filter: drop-shadow(0 8px 12px var(--muso-logo-shadow-color));
          stroke-width: 2;
        }

        .logo-mark {
          paint-order: stroke fill;
          stroke-linecap: round;
          stroke-linejoin: round;
        }

        .logo-mark-halo {
          fill: none;
        }

        .logo-mark-halo--outer {
          stroke: var(--muso-logo-halo-outer-color);
        }

        .logo-mark-halo--inner {
          stroke: var(--muso-logo-halo-inner-color);
        }

        .logo-mark-fill {
          filter: drop-shadow(
            0 var(--muso-logo-mark-shadow-offset-y)
              var(--muso-logo-mark-shadow-blur)
              var(--muso-logo-mark-shadow-color)
          );
          stroke: none;
        }

        .logo-banner-line {
          fill: none;
          opacity: var(--muso-logo-banner-line-opacity);
          stroke: url(#${this.#gradientId});
          stroke-linecap: round;
          stroke-linejoin: round;
        }
      </style>

      <svg part="svg"></svg>
    `;

    this.#svg = shadowRoot.querySelector("svg");
  }

  connectedCallback() {
    this.#render();

    if (document.fonts?.ready) {
      document.fonts.ready.then(() => {
        if (this.isConnected) {
          this.#render();
        }
      });
    }
  }

  attributeChangedCallback() {
    if (this.isConnected) {
      this.#render();
    }
  }

  get variant() {
    const variant = this.getAttribute("variant") || DEFAULTS.variant;
    return VALID_VARIANTS.has(variant) ? variant : DEFAULTS.variant;
  }

  get tone() {
    const tone = this.getAttribute("tone");

    if (VALID_TONES.has(tone)) {
      return tone;
    }

    const theme = this.getAttribute("theme");

    if (theme === "dark") {
      return "on-dark";
    }

    if (theme === "light") {
      return "on-light";
    }

    return DEFAULTS.tone;
  }

  get markFrame() {
    const markFrame = this.getAttribute("mark-frame") || DEFAULTS.markFrame;
    return VALID_MARK_FRAMES.has(markFrame) ? markFrame : DEFAULTS.markFrame;
  }

  get intrinsicSize() {
    return VIEW_BOXES[this.variant];
  }

  async toBlob({
    background,
    height = this.intrinsicSize.height,
    quality = 0.98,
    tone,
    type = "image/png",
    width = this.intrinsicSize.width,
  } = {}) {
    if (document.fonts?.ready) {
      await document.fonts.ready;
    }

    const canvas = document.createElement("canvas");
    this.drawToCanvas(canvas, { background, height, tone, width });

    return new Promise((resolve, reject) => {
      canvas.toBlob(
        (blob) => {
          if (blob) {
            resolve(blob);
          } else {
            reject(new Error(`Unable to export ${type}.`));
          }
        },
        type,
        quality,
      );
    });
  }

  async download({
    background,
    filename,
    height = this.intrinsicSize.height,
    quality = 0.98,
    tone,
    type = "image/png",
    width = this.intrinsicSize.width,
  } = {}) {
    const exportTone = VALID_TONES.has(tone) ? tone : this.tone;
    const blob = await this.toBlob({
      background,
      height,
      quality,
      tone,
      type,
      width,
    });
    const extension = type === "image/webp" ? "webp" : "png";
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");

    link.href = url;
    link.download = filename ||
      `muso-dojo-logo-${this.variant}-${exportTone}-${width}x${height}.${extension}`;
    link.click();
    setTimeout(() => URL.revokeObjectURL(url), 0);
  }

  drawToCanvas(
    canvas,
    {
      background,
      height = this.intrinsicSize.height,
      tone,
      width = this.intrinsicSize.width,
    } = {},
  ) {
    const variant = this.variant;
    const restoreTone = this.#temporarilySetTone(tone);
    const box = VIEW_BOXES[variant];
    const canvasWidth = Math.max(1, Math.round(width));
    const canvasHeight = Math.max(1, Math.round(height));
    const context = canvas.getContext("2d");

    try {
      canvas.width = canvasWidth;
      canvas.height = canvasHeight;

      context.clearRect(0, 0, canvasWidth, canvasHeight);

      const colors = this.#colors();
      const backgroundColor = background ?? colors.background;

      if (backgroundColor && backgroundColor !== BRAND_COLORS.transparent) {
        context.fillStyle = backgroundColor;
        context.fillRect(0, 0, canvasWidth, canvasHeight);
      }

      const scale = Math.min(
        canvasWidth / box.width,
        canvasHeight / box.height,
      );
      const offsetX = (canvasWidth - box.width * scale) / 2;
      const offsetY = (canvasHeight - box.height * scale) / 2;

      context.save();
      context.translate(offsetX, offsetY);
      context.scale(scale, scale);
      this.#drawVariant(context, variant, box, colors);
      context.restore();
    } finally {
      restoreTone();
    }
  }

  #render() {
    const variant = this.variant;
    const box = VIEW_BOXES[variant];

    this.#svg.replaceChildren();
    this.#svg.setAttribute("viewBox", `0 0 ${box.width} ${box.height}`);
    this.#svg.setAttribute("role", "img");
    this.#svg.setAttribute("aria-label", this.#accessibleLabel());

    this.#svg.append(this.#gradientDefinition());
    const background = this.#element("rect", {
      class: "logo-background",
      height: box.height,
      width: box.width,
      x: 0,
      y: 0,
    });

    if (this.hasAttribute("background")) {
      background.style.fill = this.getAttribute("background");
    }

    this.#svg.append(background);

    this.#renderVariant(variant, box);
  }

  #renderVariant(variant, box) {
    switch (variant) {
      case "app":
        this.#renderApp(box);
        return;
      case "stacked":
        this.#renderStacked(box);
        return;
      case "icon":
        this.#renderIcon(box);
        return;
      case "wordmark":
        this.#renderWordmark(box);
        return;
      case "social-square":
        this.#renderSocialSquare(box);
        return;
      case "video-title-card":
        this.#renderVideoTitleCard();
        return;
      case "play-feature":
        this.#renderPlayFeature();
        return;
      case "youtube-banner":
        this.#renderYoutubeBanner();
        return;
      default:
        this.#renderHero(box);
    }
  }

  #renderHero() {
    this.#appendHorizontalLockup(HORIZONTAL_LOCKUPS.hero);
  }

  #renderApp() {
    const hasSubtitle = HAS_SUBTITLE;

    this.#appendMark(82, 90, 54);
    this.#appendText({
      anchor: "start",
      className: "logo-title",
      maxWidth: 360,
      preferredSize: hasSubtitle ? 56 : 64,
      text: BRAND.title,
      x: 160,
      y: hasSubtitle ? 68 : 90,
    });

    if (hasSubtitle) {
      this.#appendText({
        anchor: "start",
        className: "logo-subtitle",
        maxWidth: 340,
        minSize: 20,
        preferredSize: 27,
        text: BRAND.subtitle,
        x: 162,
        y: 124,
      });
    }
  }

  #renderStacked(box) {
    this.#appendMark(box.width / 2, 330, 184);
    this.#appendText({
      className: "logo-title",
      maxWidth: 880,
      preferredSize: 112,
      text: BRAND.title,
      x: box.width / 2,
      y: 650,
    });

    if (HAS_SUBTITLE) {
      this.#appendText({
        className: "logo-subtitle",
        maxWidth: 760,
        minSize: 34,
        preferredSize: 56,
        text: BRAND.subtitle,
        x: box.width / 2,
        y: 760,
      });
    }
  }

  #renderIcon(box) {
    this.#appendMark(box.width / 2, box.height / 2, this.#iconMarkRadius(box));
  }

  #renderWordmark(box) {
    const hasSubtitle = HAS_SUBTITLE;

    this.#appendText({
      className: "logo-title",
      maxWidth: 1080,
      preferredSize: hasSubtitle ? 112 : 132,
      text: BRAND.title,
      x: box.width / 2,
      y: hasSubtitle ? 124 : box.height / 2,
    });

    if (hasSubtitle) {
      this.#appendText({
        className: "logo-subtitle",
        maxWidth: 920,
        minSize: 30,
        preferredSize: 46,
        text: BRAND.subtitle,
        x: box.width / 2,
        y: 224,
      });
    }
  }

  #renderSocialSquare(box) {
    this.#appendWaveField(WAVE_FIELDS["social-square"]);
    this.#renderStacked(box);
  }

  #renderVideoTitleCard() {
    this.#appendWaveField(WAVE_FIELDS["video-title-card"]);
    this.#appendHorizontalLockup(HORIZONTAL_LOCKUPS["video-title-card"]);
  }

  #renderPlayFeature() {
    this.#appendWaveField(WAVE_FIELDS["play-feature"]);
    this.#appendHorizontalLockup(HORIZONTAL_LOCKUPS["play-feature"]);
  }

  #renderYoutubeBanner() {
    this.#appendWaveField(WAVE_FIELDS["youtube-banner"]);
    this.#appendHorizontalLockup(HORIZONTAL_LOCKUPS["youtube-banner"]);
  }

  #appendHorizontalLockup(lockup) {
    const layout = this.#horizontalLockupLayout(lockup);

    this.#appendText({
      className: "logo-title",
      fontSize: layout.title.fontSize,
      maxWidth: layout.title.maxWidth,
      preferredSize: layout.title.preferredSize,
      text: BRAND.title,
      x: layout.title.x,
      y: layout.title.y,
    });

    this.#appendMark(layout.mark.x, layout.mark.y, layout.mark.radius);

    if (HAS_SUBTITLE) {
      this.#appendText({
        className: "logo-subtitle",
        fontSize: layout.subtitle.fontSize,
        maxWidth: layout.subtitle.maxWidth,
        preferredSize: layout.subtitle.preferredSize,
        text: BRAND.subtitle,
        x: layout.subtitle.x,
        y: layout.subtitle.y,
      });
    }
  }

  #horizontalLockupLayout(lockup) {
    // Measure the fitted glyphs so the M has equal visible breathing room.
    const titleFontSize = this.#fitText(
      BRAND.title,
      lockup.titleMaxWidth,
      lockup.titlePreferredSize,
      40,
      400,
    );
    const subtitleFontSize = HAS_SUBTITLE
      ? this.#fitText(
        BRAND.subtitle,
        lockup.subtitleMaxWidth,
        lockup.subtitlePreferredSize,
        40,
        400,
      )
      : 0;
    const titleWidth = this.#textWidth(BRAND.title, titleFontSize, 400);
    const subtitleWidth = HAS_SUBTITLE
      ? this.#textWidth(BRAND.subtitle, subtitleFontSize, 400)
      : 0;
    const markWidth = this.#markVisualWidth(lockup.markRadius);
    const innerGap = lockup.innerGap ??
      lockup.markRadius * lockup.innerGapRatio;

    return {
      mark: {
        radius: lockup.markRadius,
        x: lockup.markX,
        y: lockup.textY,
      },
      subtitle: {
        fontSize: subtitleFontSize,
        maxWidth: lockup.subtitleMaxWidth,
        preferredSize: lockup.subtitlePreferredSize,
        x: lockup.markX + markWidth / 2 + innerGap + subtitleWidth / 2,
        y: lockup.textY,
      },
      title: {
        fontSize: titleFontSize,
        maxWidth: lockup.titleMaxWidth,
        preferredSize: lockup.titlePreferredSize,
        x: lockup.markX - markWidth / 2 - innerGap - titleWidth / 2,
        y: lockup.textY,
      },
    };
  }

  #appendWaveField(field) {
    for (const wave of field.waves) {
      this.#svg.append(
        this.#element("path", {
          class: "logo-banner-line",
          d: this.#wavePathData(wave, field),
          style: `--muso-logo-banner-line-opacity: ${wave.opacity}`,
          "stroke-width": wave.width,
        }),
      );
    }
  }

  #appendText({
    anchor = "middle",
    className,
    fontSize,
    maxWidth,
    minSize = 40,
    preferredSize,
    text,
    weight = 400,
    x,
    y,
  }) {
    const resolvedFontSize = fontSize ??
      this.#fitText(text, maxWidth, preferredSize, minSize, weight);

    this.#svg.append(
      this.#element(
        "text",
        {
          class: className,
          "dominant-baseline": "middle",
          "font-size": this.#round(resolvedFontSize),
          "font-weight": weight,
          "text-anchor": anchor,
          x,
          y,
        },
        text,
      ),
    );
  }

  #appendMark(x, y, radius) {
    const markFrame = this.markFrame;
    const markSettings = this.#markSettings(markFrame);
    const markSize = this.#markSize(radius, markFrame);
    const markCenterY = y + radius * markSettings.visualCenterOffsetRatio;
    const markGroup = this.#element("g");
    const marks = [];

    if (markFrame === "disc") {
      this.#svg.append(
        this.#element("circle", {
          class: "logo-disc",
          cx: x,
          cy: y,
          r: radius,
        }),
      );

      marks.push(
        this.#markTextElement({
          className: "logo-mark",
          fill: `url(#${this.#gradientId})`,
          markSize,
          stroke: `url(#${this.#gradientId})`,
          strokeWidth: this.#markStrokeWidth(radius, markFrame),
          x,
        }),
      );
    } else {
      if (markFrame === "halo") {
        marks.push(
          this.#markTextElement({
            className: "logo-mark logo-mark-halo logo-mark-halo--outer",
            fill: "none",
            markSize,
            strokeWidth: this.#haloOuterStrokeWidth(radius),
            x,
          }),
          this.#markTextElement({
            className: "logo-mark logo-mark-halo logo-mark-halo--inner",
            fill: "none",
            markSize,
            strokeWidth: this.#haloInnerStrokeWidth(radius),
            x,
          }),
        );
      }

      marks.push(
        this.#markTextElement({
          className: "logo-mark logo-mark-fill",
          fill: `url(#${this.#gradientId})`,
          markSize,
          stroke: "none",
          strokeWidth: 0,
          x,
        }),
      );
    }

    markGroup.append(...marks);
    this.#svg.append(markGroup);

    for (const mark of marks) {
      this.#centerSvgText(mark, markCenterY);
    }

    markGroup.setAttribute(
      "transform",
      `translate(${this.#round(x)} ${this.#round(markCenterY)}) ` +
        `scale(1 ${markSettings.verticalScale}) ` +
        `translate(${-this.#round(x)} ${-this.#round(markCenterY)})`,
    );
  }

  #markTextElement({
    className,
    fill,
    markSize,
    stroke,
    strokeWidth,
    x,
  }) {
    const attributes = {
      class: className,
      fill,
      "font-size": this.#round(markSize),
      "font-weight": 700,
      "stroke-width": this.#round(strokeWidth),
      "text-anchor": "middle",
      x,
      y: 0,
    };

    if (stroke) {
      attributes.stroke = stroke;
    }

    return this.#element("text", attributes, BRAND.mark);
  }

  #drawVariant(context, variant, box, colors) {
    switch (variant) {
      case "app":
        this.#drawApp(context, colors);
        return;
      case "stacked":
        this.#drawStacked(context, box, colors);
        return;
      case "icon":
        this.#drawMark(
          context,
          box.width / 2,
          box.height / 2,
          this.#iconMarkRadius(box),
          colors,
        );
        return;
      case "wordmark":
        this.#drawWordmark(context, box, colors);
        return;
      case "social-square":
        this.#drawSocialSquare(context, box, colors);
        return;
      case "video-title-card":
        this.#drawVideoTitleCard(context, colors);
        return;
      case "play-feature":
        this.#drawPlayFeature(context, colors);
        return;
      case "youtube-banner":
        this.#drawYoutubeBanner(context, colors);
        return;
      default:
        this.#drawHero(context, box, colors);
    }
  }

  #drawHero(context, box, colors) {
    this.#drawHorizontalLockup(context, colors, HORIZONTAL_LOCKUPS.hero);
  }

  #drawApp(context, colors) {
    const hasSubtitle = HAS_SUBTITLE;

    this.#drawMark(context, 82, 90, 54, colors);
    this.#drawText(context, {
      anchor: "left",
      color: colors.text,
      maxWidth: 360,
      preferredSize: hasSubtitle ? 56 : 64,
      text: BRAND.title,
      x: 160,
      y: hasSubtitle ? 68 : 90,
    });

    if (hasSubtitle) {
      this.#drawText(context, {
        anchor: "left",
        color: colors.subtitle,
        maxWidth: 340,
        minSize: 20,
        preferredSize: 27,
        text: BRAND.subtitle,
        x: 162,
        y: 124,
      });
    }
  }

  #drawStacked(context, box, colors) {
    this.#drawMark(context, box.width / 2, 330, 184, colors);
    this.#drawText(context, {
      color: colors.text,
      maxWidth: 880,
      preferredSize: 112,
      text: BRAND.title,
      x: box.width / 2,
      y: 650,
    });

    if (HAS_SUBTITLE) {
      this.#drawText(context, {
        color: colors.subtitle,
        maxWidth: 760,
        minSize: 34,
        preferredSize: 56,
        text: BRAND.subtitle,
        x: box.width / 2,
        y: 760,
      });
    }
  }

  #drawWordmark(context, box, colors) {
    const hasSubtitle = HAS_SUBTITLE;

    this.#drawText(context, {
      color: colors.text,
      maxWidth: 1080,
      preferredSize: hasSubtitle ? 112 : 132,
      text: BRAND.title,
      x: box.width / 2,
      y: hasSubtitle ? 124 : box.height / 2,
    });

    if (hasSubtitle) {
      this.#drawText(context, {
        color: colors.subtitle,
        maxWidth: 920,
        minSize: 30,
        preferredSize: 46,
        text: BRAND.subtitle,
        x: box.width / 2,
        y: 224,
      });
    }
  }

  #drawSocialSquare(context, box, colors) {
    this.#drawWaveField(context, WAVE_FIELDS["social-square"]);
    this.#drawStacked(context, box, colors);
  }

  #drawVideoTitleCard(context, colors) {
    this.#drawWaveField(context, WAVE_FIELDS["video-title-card"]);
    this.#drawHorizontalLockup(
      context,
      colors,
      HORIZONTAL_LOCKUPS["video-title-card"],
    );
  }

  #drawPlayFeature(context, colors) {
    this.#drawWaveField(context, WAVE_FIELDS["play-feature"]);
    this.#drawHorizontalLockup(
      context,
      colors,
      HORIZONTAL_LOCKUPS["play-feature"],
    );
  }

  #drawYoutubeBanner(context, colors) {
    this.#drawWaveField(context, WAVE_FIELDS["youtube-banner"]);
    this.#drawHorizontalLockup(
      context,
      colors,
      HORIZONTAL_LOCKUPS["youtube-banner"],
    );
  }

  #drawHorizontalLockup(context, colors, lockup) {
    const layout = this.#horizontalLockupLayout(lockup);

    this.#drawText(context, {
      color: colors.text,
      fontSize: layout.title.fontSize,
      maxWidth: layout.title.maxWidth,
      preferredSize: layout.title.preferredSize,
      text: BRAND.title,
      x: layout.title.x,
      y: layout.title.y,
    });

    this.#drawMark(
      context,
      layout.mark.x,
      layout.mark.y,
      layout.mark.radius,
      colors,
    );

    if (HAS_SUBTITLE) {
      this.#drawText(context, {
        color: colors.subtitle,
        fontSize: layout.subtitle.fontSize,
        maxWidth: layout.subtitle.maxWidth,
        preferredSize: layout.subtitle.preferredSize,
        text: BRAND.subtitle,
        x: layout.subtitle.x,
        y: layout.subtitle.y,
      });
    }
  }

  #drawWaveField(context, field) {
    const gradient = context.createLinearGradient(
      0,
      0,
      field.viewBox.width,
      0,
    );

    for (const stop of GRADIENT_STOPS) {
      gradient.addColorStop(stop.offset, stop.color);
    }

    context.save();
    context.strokeStyle = gradient;
    context.lineCap = "round";
    context.lineJoin = "round";

    for (const wave of field.waves) {
      const points = this.#wavePoints(wave, field);
      const [start, ...rest] = points;

      context.globalAlpha = wave.opacity;
      context.lineWidth = wave.width;
      context.beginPath();
      context.moveTo(start[0], start[1]);

      for (const [x, y] of rest) {
        context.lineTo(x, y);
      }

      context.stroke();
    }

    context.restore();
  }

  #drawMark(context, x, y, radius, colors) {
    const markFrame = this.markFrame;
    const markSettings = this.#markSettings(markFrame);
    const markSize = this.#markSize(radius, markFrame);

    if (markFrame === "disc") {
      context.save();
      context.shadowBlur = radius * 0.15;
      context.shadowColor = colors.shadow;
      context.shadowOffsetY = radius * 0.08;
      context.fillStyle = colors.disc;
      context.beginPath();
      context.arc(x, y, radius, 0, Math.PI * 2);
      context.fill();
      context.restore();

      context.save();
      context.strokeStyle = colors.discStroke;
      context.lineWidth = Math.max(1, radius * 0.018);
      context.beginPath();
      context.arc(x, y, radius, 0, Math.PI * 2);
      context.stroke();
      context.restore();
    }

    context.save();
    context.font = `700 ${markSize}px ${this.#fontFamily()}`;
    context.textAlign = "center";
    context.lineCap = "round";
    context.lineJoin = "round";
    context.lineWidth = this.#markStrokeWidth(radius);

    const metrics = context.measureText(BRAND.mark);
    const bounds = this.#textBounds(metrics, x);
    const gradient = context.createLinearGradient(
      bounds.left,
      y,
      bounds.right,
      y,
    );

    for (const stop of GRADIENT_STOPS) {
      gradient.addColorStop(stop.offset, stop.color);
    }

    const centerY = y + radius * markSettings.visualCenterOffsetRatio;
    const alphabeticBaseline = this.#centeredAlphabeticBaseline(
      metrics,
      centerY,
    );
    const drawAtBaseline = (draw) => {
      if (alphabeticBaseline === null) {
        context.textBaseline = "middle";
        draw(centerY);
        return;
      }

      context.textBaseline = "alphabetic";
      draw(alphabeticBaseline);
    };

    context.translate(x, centerY);
    context.scale(1, markSettings.verticalScale);
    context.translate(-x, -centerY);

    if (markFrame === "halo") {
      context.strokeStyle = colors.haloOuter;
      context.lineWidth = this.#haloOuterStrokeWidth(radius);
      drawAtBaseline((baseline) =>
        context.strokeText(BRAND.mark, x, baseline)
      );

      context.strokeStyle = colors.haloInner;
      context.lineWidth = this.#haloInnerStrokeWidth(radius);
      drawAtBaseline((baseline) =>
        context.strokeText(BRAND.mark, x, baseline)
      );
    } else if (markFrame === "disc") {
      context.strokeStyle = gradient;
      context.lineWidth = this.#markStrokeWidth(radius, markFrame);
      drawAtBaseline((baseline) =>
        context.strokeText(BRAND.mark, x, baseline)
      );
    }

    context.shadowBlur = colors.markShadowBlur;
    context.shadowColor = colors.markShadowColor;
    context.shadowOffsetY = colors.markShadowOffsetY;
    context.fillStyle = gradient;
    drawAtBaseline((baseline) => context.fillText(BRAND.mark, x, baseline));
    context.restore();
  }

  #drawText(
    context,
    {
      anchor = "center",
      color,
      fontSize,
      maxWidth,
      minSize = 40,
      preferredSize,
      text,
      weight = 400,
      x,
      y,
    },
  ) {
    const resolvedFontSize = fontSize ??
      this.#fitText(text, maxWidth, preferredSize, minSize, weight);
    const textShadow = this.#textShadow();

    context.save();
    context.fillStyle = color;
    context.font = `${weight} ${resolvedFontSize}px ${this.#fontFamily()}`;
    context.shadowBlur = textShadow.blur;
    context.shadowColor = textShadow.color;
    context.shadowOffsetY = textShadow.offsetY;
    context.textAlign = anchor;
    context.textBaseline = "middle";
    context.fillText(text, x, y);
    context.restore();
  }

  #fitText(text, maxWidth, preferredSize, minSize, weight = 400) {
    const context = this.#measureContext();
    let size = preferredSize;

    context.font = `${weight} ${size}px ${this.#fontFamily()}`;

    const measuredWidth = context.measureText(text).width;

    if (measuredWidth > maxWidth) {
      size = Math.max(minSize, (maxWidth / measuredWidth) * preferredSize);
    }

    return size;
  }

  #textWidth(text, fontSize, weight = 400) {
    const context = this.#measureContext();
    context.font = `${weight} ${fontSize}px ${this.#fontFamily()}`;
    return context.measureText(text).width;
  }

  #markVisualWidth(radius) {
    if (this.markFrame === "disc") {
      return radius * 2;
    }

    const strokePadding = this.markFrame === "halo"
      ? this.#haloOuterStrokeWidth(radius)
      : this.#markStrokeWidth(radius);

    return this.#textWidth(BRAND.mark, this.#markSize(radius), 700) +
      strokePadding;
  }

  #iconMarkRadius(box) {
    const base = Math.min(box.width, box.height);
    if (this.markFrame === "disc") {
      return base * 0.449;
    }

    if (this.markFrame === "halo") {
      return base * 0.47;
    }

    return base * 0.49;
  }

  #markSettings(markFrame = this.markFrame) {
    return MARK_FRAME_SETTINGS[markFrame] || MARK_FRAME_SETTINGS.plain;
  }

  #markSize(radius, markFrame = this.markFrame) {
    const markSettings = this.#markSettings(markFrame);

    return this.#fitText(
      BRAND.mark,
      radius * markSettings.maxWidthRatio,
      radius * markSettings.preferredSizeRatio,
      radius * markSettings.minSizeRatio,
      700,
    );
  }

  #markStrokeWidth(radius, markFrame = this.markFrame) {
    return radius * this.#markSettings(markFrame).strokeWidthRatio;
  }

  #haloInnerStrokeWidth(radius) {
    return radius * this.#markSettings("halo").haloInnerStrokeWidthRatio;
  }

  #haloOuterStrokeWidth(radius) {
    return radius * this.#markSettings("halo").haloOuterStrokeWidthRatio;
  }

  #centerSvgText(textElement, centerY) {
    const fontSize = Number.parseFloat(
      textElement.getAttribute("font-size") || "",
    );
    const weight = textElement.getAttribute("font-weight") || 700;

    if (Number.isFinite(fontSize)) {
      const context = this.#measureContext();

      context.font = `${weight} ${fontSize}px ${this.#fontFamily()}`;

      const baseline = this.#centeredAlphabeticBaseline(
        context.measureText(textElement.textContent || ""),
        centerY,
      );

      if (baseline !== null) {
        textElement.removeAttribute("dominant-baseline");
        textElement.setAttribute("y", this.#round(baseline));
        return;
      }
    }

    try {
      const box = textElement.getBBox();

      if (box.height > 0) {
        textElement.setAttribute(
          "y",
          this.#round(centerY - box.y - box.height / 2),
        );
        return;
      }
    } catch {
      textElement.setAttribute("dominant-baseline", "middle");
      textElement.setAttribute("y", this.#round(centerY));
      return;
    }

    textElement.setAttribute("dominant-baseline", "middle");
    textElement.setAttribute("y", this.#round(centerY));
  }

  #textBounds(metrics, anchorX) {
    const fallbackHalfWidth = Math.max(1, metrics.width / 2);
    const left = Number.isFinite(metrics.actualBoundingBoxLeft)
      ? anchorX - metrics.actualBoundingBoxLeft
      : anchorX - fallbackHalfWidth;
    const right = Number.isFinite(metrics.actualBoundingBoxRight)
      ? anchorX + metrics.actualBoundingBoxRight
      : anchorX + fallbackHalfWidth;

    if (right > left) {
      return { left, right };
    }

    return {
      left: anchorX - fallbackHalfWidth,
      right: anchorX + fallbackHalfWidth,
    };
  }

  #centeredAlphabeticBaseline(metrics, centerY) {
    if (
      Number.isFinite(metrics.actualBoundingBoxAscent) &&
      Number.isFinite(metrics.actualBoundingBoxDescent)
    ) {
      return centerY +
        (metrics.actualBoundingBoxAscent - metrics.actualBoundingBoxDescent) /
          2;
    }

    return null;
  }

  #measureContext() {
    if (!this.#measureCanvas) {
      this.#measureCanvas = document.createElement("canvas");
    }

    return this.#measureCanvas.getContext("2d");
  }

  #fontFamily() {
    const value = getComputedStyle(this)
      .getPropertyValue("--muso-logo-font-family")
      .trim();

    return value || `"Stick", "Trebuchet MS", Arial, sans-serif`;
  }

  #colors() {
    const textShadow = this.#textShadow();
    const markShadow = this.#markShadow();
    const text = this.#cssVar("--muso-logo-text-color", BRAND_COLORS.black);

    return {
      background: this.#attributeOrCss(
        "background",
        "--muso-logo-background-color",
        BRAND_COLORS.transparent,
      ),
      disc: BRAND_COLORS.black,
      discStroke: this.#cssVar(
        "--muso-logo-disc-stroke-color",
        ALPHA_COLORS.black10,
      ),
      haloInner: this.#cssVar(
        "--muso-logo-halo-inner-color",
        ALPHA_COLORS.white34,
      ),
      haloOuter: this.#cssVar(
        "--muso-logo-halo-outer-color",
        ALPHA_COLORS.black56,
      ),
      markShadowBlur: markShadow.blur,
      markShadowColor: markShadow.color,
      markShadowOffsetY: markShadow.offsetY,
      shadow: this.#cssVar("--muso-logo-shadow-color", ALPHA_COLORS.black16),
      subtitle: text,
      text,
      textShadowBlur: textShadow.blur,
      textShadowColor: textShadow.color,
      textShadowOffsetY: textShadow.offsetY,
    };
  }

  #textShadow() {
    return {
      blur: this.#cssNumber("--muso-logo-text-shadow-blur", 0),
      color: this.#cssVar(
        "--muso-logo-text-shadow-color",
        BRAND_COLORS.transparent,
      ),
      offsetY: this.#cssNumber("--muso-logo-text-shadow-offset-y", 0),
    };
  }

  #markShadow() {
    return {
      blur: this.#cssNumber("--muso-logo-mark-shadow-blur", 0),
      color: this.#cssVar(
        "--muso-logo-mark-shadow-color",
        BRAND_COLORS.transparent,
      ),
      offsetY: this.#cssNumber("--muso-logo-mark-shadow-offset-y", 0),
    };
  }

  #temporarilySetTone(tone) {
    if (!VALID_TONES.has(tone) || tone === this.getAttribute("tone")) {
      return () => {};
    }

    const previousTone = this.getAttribute("tone");
    this.setAttribute("tone", tone);

    return () => {
      if (previousTone === null) {
        this.removeAttribute("tone");
        return;
      }

      this.setAttribute("tone", previousTone);
    };
  }

  #attributeOrCss(attribute, property, fallback) {
    return this.getAttribute(attribute) || this.#cssVar(property, fallback);
  }

  #cssVar(property, fallback) {
    const value = getComputedStyle(this).getPropertyValue(property).trim();
    return value || fallback;
  }

  #cssNumber(property, fallback) {
    const value = Number.parseFloat(this.#cssVar(property, `${fallback}`));
    return Number.isFinite(value) ? value : fallback;
  }

  #gradientDefinition() {
    const defs = this.#element("defs");
    const gradient = this.#element("linearGradient", {
      id: this.#gradientId,
      x1: "0%",
      x2: "100%",
      y1: "0%",
      y2: "0%",
    });

    gradient.append(
      ...GRADIENT_STOPS.map((stop) =>
        this.#element("stop", {
          offset: `${stop.offset * 100}%`,
          "stop-color": stop.color,
        })
      ),
    );

    defs.append(gradient);
    return defs;
  }

  #wavePathData(wave, field) {
    return wavePathData(wave, field, (value) => this.#round(value));
  }

  #wavePoints(wave, field) {
    return wavePoints(wave, field, (value) => this.#round(value));
  }

  #element(tagName, attributes = {}, text) {
    const element = document.createElementNS(SVG_NS, tagName);

    for (const [name, value] of Object.entries(attributes)) {
      element.setAttribute(name, value);
    }

    if (text !== undefined) {
      element.textContent = text;
    }

    return element;
  }

  #accessibleLabel() {
    return [BRAND.title, BRAND.subtitle].filter(Boolean).join(" ");
  }

  #round(value) {
    return Math.round(value * 100) / 100;
  }
}

if (!customElements.get("muso-dojo-logo")) {
  customElements.define("muso-dojo-logo", MusoDojoLogo);
}

export default MusoDojoLogo;
