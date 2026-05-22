import { VIEW_BOXES } from "./logo-config.mjs";

const TAU = Math.PI * 2;
const WAVE_OPACITY_SCALE = 2.1;

function normalizeWave(wave) {
  return {
    ...wave,
    opacity: Math.min(1, wave.opacity * WAVE_OPACITY_SCALE),
  };
}

function createWaveField({ mirrorPhaseOffset = 0.18, overscanX, samples, topRows, viewBox }) {
  // Mirror placement, but offset phase so the field feels musical rather than stamped.
  const normalizedTopRows = topRows.map(normalizeWave);
  const mirroredRows = [...normalizedTopRows].reverse().map((wave) => ({
    ...wave,
    baseline: viewBox.height - wave.baseline,
    phase: wave.mirrorPhase ?? wrapPhase(wave.phase + mirrorPhaseOffset),
  }));

  return {
    range: {
      endX: viewBox.width * (1 + overscanX),
      samples,
      startX: -viewBox.width * overscanX,
    },
    viewBox,
    waves: [...normalizedTopRows, ...mirroredRows],
  };
}

function wrapPhase(phase) {
  return ((phase % 1) + 1) % 1;
}

export const WAVE_FIELDS = {
  "social-square": createWaveField({
    mirrorPhaseOffset: 0.23,
    overscanX: 0.09,
    samples: 220,
    viewBox: VIEW_BOXES["social-square"],
    topRows: [
      {
        amplitude: 15,
        baseline: 44,
        cycles: 3,
        opacity: 0.04,
        phase: 0,
        width: 1.35,
      },
      {
        amplitude: 14,
        baseline: 100,
        cycles: 6,
        opacity: 0.045,
        phase: 0.18,
        width: 1.35,
      },
      {
        amplitude: 22,
        baseline: 166,
        cycles: 4,
        opacity: 0.058,
        phase: 0.34,
        width: 2,
      },
    ],
  }),

  "video-title-card": createWaveField({
    mirrorPhaseOffset: 0.21,
    overscanX: 0.1,
    samples: 280,
    viewBox: VIEW_BOXES["video-title-card"],
    topRows: [
      {
        amplitude: 16,
        baseline: 62,
        cycles: 3,
        opacity: 0.035,
        phase: 0,
        width: 1.5,
      },
      {
        amplitude: 28,
        baseline: 172,
        cycles: 5,
        opacity: 0.06,
        phase: 0.18,
        width: 2.2,
      },
      {
        amplitude: 24,
        baseline: 284,
        cycles: 8,
        opacity: 0.045,
        phase: 0.34,
        width: 1.55,
      },
      {
        amplitude: 36,
        baseline: 396,
        cycles: 4,
        opacity: 0.075,
        phase: 0.5,
        width: 2.8,
      },
    ],
  }),

  "play-feature": createWaveField({
    mirrorPhaseOffset: 0.22,
    overscanX: 0.09375,
    samples: 180,
    viewBox: VIEW_BOXES["play-feature"],
    topRows: [
      {
        amplitude: 10,
        baseline: 32,
        cycles: 3,
        opacity: 0.05,
        phase: 0,
        width: 1.25,
      },
      {
        amplitude: 14,
        baseline: 96,
        cycles: 5,
        opacity: 0.075,
        phase: 0.2,
        width: 1.75,
      },
      {
        amplitude: 15,
        baseline: 162,
        cycles: 4,
        opacity: 0.065,
        phase: 0.42,
        width: 1.5,
      },
    ],
  }),

  "youtube-banner": createWaveField({
    mirrorPhaseOffset: 0.2,
    overscanX: 0.1,
    samples: 320,
    viewBox: VIEW_BOXES["youtube-banner"],
    topRows: [
      {
        amplitude: 22,
        baseline: 42,
        cycles: 4,
        opacity: 0.05,
        phase: 0,
        width: 1.75,
      },
      {
        amplitude: 32,
        baseline: 158,
        cycles: 6,
        opacity: 0.07,
        phase: 0.16,
        width: 2.5,
      },
      {
        amplitude: 40,
        baseline: 288,
        cycles: 5,
        opacity: 0.11,
        phase: 0.36,
        width: 3.25,
      },
      {
        amplitude: 28,
        baseline: 422,
        cycles: 9,
        opacity: 0.055,
        phase: 0.52,
        width: 1.9,
      },
    ],
  }),
};

export function wavePathData(wave, field, round = identity) {
  const [start, ...points] = wavePoints(wave, field, round);
  const commands = [`M ${round(start[0])} ${round(start[1])}`];

  for (const [x, y] of points) {
    commands.push(`L ${round(x)} ${round(y)}`);
  }

  return commands.join(" ");
}

export function wavePoints(wave, field, round = identity) {
  const { endX, samples, startX } = field.range;
  const width = endX - startX;

  return Array.from({ length: samples + 1 }, (_, index) => {
    const x = startX + (width * index) / samples;
    return [round(x), round(waveY(wave, x, field))];
  });
}

function waveY(wave, x, field) {
  const progress = x / field.viewBox.width;
  const phase = wave.phase || 0;

  return wave.baseline +
    wave.amplitude * Math.sin(TAU * (wave.cycles * progress + phase));
}

function identity(value) {
  return value;
}
