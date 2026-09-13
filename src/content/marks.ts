import { availableMarks } from "./marks.generated";

export type MarkPlacement = {
  /** Accessible name, used only where a mark is not purely decorative. */
  label: string;
  /** Width as a share of the viewport. These run large on purpose. */
  size: string;
  /** Which edge the mark bleeds off. */
  anchor: "left" | "right" | "center";
  /** Vertical nudge, as a share of the mark's own height. */
  offsetY?: string;
  /** Resting opacity on a white ground. Doubled on a black ground. */
  opacity?: number;
  /** Parallax depth. Negative drifts against the scroll. */
  depth?: number;
};

export const markPlacements: Record<string, MarkPlacement> = {
  stanford: {
    label: "Stanford University",
    size: "clamp(18rem, 46vw, 56rem)",
    anchor: "right",
    offsetY: "-8%",
    opacity: 0.07,
    depth: -0.22,
  },
  "san-jose": {
    label: "City of San José",
    size: "clamp(20rem, 62vw, 80rem)",
    anchor: "left",
    offsetY: "6%",
    opacity: 0.08,
    depth: -0.16,
  },
  "copper-sky": {
    label: "Copper Sky Capital",
    size: "clamp(22rem, 66vw, 84rem)",
    anchor: "right",
    offsetY: "0%",
    opacity: 0.07,
    depth: -0.2,
  },
  "princeton-beijing": {
    label: "Princeton in Beijing",
    size: "clamp(16rem, 40vw, 46rem)",
    anchor: "left",
    offsetY: "-4%",
    opacity: 0.09,
    depth: -0.26,
  },
};

export const hasMark = (key: string | undefined): key is string =>
  !!key && availableMarks.includes(key) && key in markPlacements;
