"use client";

import { useScroll, useTransform, type MotionValue } from "motion/react";
import { useRef, type ReactNode } from "react";

type Props = {
  /** Total scroll length, in viewport heights. More means a slower advance. */
  length?: number;
  className?: string;
  stageClassName?: string;
  children: (progress: MotionValue<number>) => ReactNode;
};

/**
 * Pins a full-height stage and hands its children a 0 to 1 progress value for
 * the duration of the pin. Everything scroll-jacked in the cinematic variant
 * is built on this.
 */
export default function StickyStage({
  length = 3,
  className,
  stageClassName,
  children,
}: Props) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end end"] });

  return (
    <div ref={ref} className={className} style={{ height: `${length * 100}vh` }}>
      <div className={`sticky top-0 h-screen overflow-hidden ${stageClassName ?? ""}`}>
        {children(scrollYProgress)}
      </div>
    </div>
  );
}

/** Slice a stage's progress into a per-item window with soft edges. */
export function useSlice(
  progress: MotionValue<number>,
  index: number,
  count: number,
  feather = 0.5,
) {
  const span = 1 / count;
  const start = index * span;
  const end = start + span;
  const pad = span * feather;
  return useTransform(
    progress,
    [start - pad, start, end, end + pad],
    [0, 1, 1, 0],
    { clamp: true },
  );
}
