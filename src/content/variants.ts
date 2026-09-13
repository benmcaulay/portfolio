export type VariantMeta = {
  slug: string;
  /** Numbered label, e.g. "01". */
  index: string;
  name: string;
  /** One line describing the design direction. */
  tagline: string;
  /** What the scroll actually does, in plain terms. */
  motion: string;
  /** Type treatment summary. */
  type: string;
  /** "paper" for black-on-white, "ink" for white-on-black, "both" when it inverts. */
  polarity: "paper" | "ink" | "both";
};

export const variants: VariantMeta[] = [
  {
    slug: "editorial",
    index: "01",
    name: "Swiss Editorial",
    tagline: "A design annual that happens to be a resume.",
    motion:
      "Pinned section headers, hairline rules that draw themselves, column reveals staggered by line, a masthead that compresses into a rule as you leave it.",
    type: "Instrument Serif display against Inter Tight, strict twelve-column grid.",
    polarity: "paper",
  },
  {
    slug: "cinematic",
    index: "02",
    name: "Cinematic Scroll",
    tagline: "Full-bleed chapters, scale-and-mask transitions, sticky project stages.",
    motion:
      "Scroll-driven scale and clip on every chapter, parallax depth layers, a horizontal project stage that advances under a pinned viewport, and a title that tracks apart as it exits.",
    type: "Inter Tight at poster weight, heavy letter-spacing negatives.",
    polarity: "ink",
  },
  {
    slug: "kinetic",
    index: "03",
    name: "Kinetic Type",
    tagline: "Typography is the whole interface.",
    motion:
      "Velocity-reactive marquees that change direction with your scroll, per-character reveals, a wordmark that skews under acceleration, and full-page polarity inversions at section seams.",
    type: "Anton at display scale, clamped to the viewport edge to edge.",
    polarity: "both",
  },
  {
    slug: "terminal",
    index: "04",
    name: "Terminal Brutalist",
    tagline: "Monospace, visible grid, nothing eased to hide the machine.",
    motion:
      "Scroll-driven counters, a live readout of scroll position and section, ASCII rules that fill character by character, and dense data-sheet cards that expand in place.",
    type: "JetBrains Mono throughout, on a visible baseline grid.",
    polarity: "ink",
  },
];

export const variantBySlug = (slug: string) => variants.find((v) => v.slug === slug);
