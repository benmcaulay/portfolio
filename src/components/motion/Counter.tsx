"use client";

import { animate, useInView, useReducedMotion } from "motion/react";
import { useEffect, useRef, useState } from "react";

type Props = {
  to: number;
  from?: number;
  decimals?: number;
  prefix?: string;
  suffix?: string;
  duration?: number;
  className?: string;
};

/**
 * Counts up once, on entry, in tabular figures so the box never reflows.
 *
 * These are figures off a resume, so the count-up is never allowed to leave a
 * wrong number on screen. Two guards, because the animation can stall rather
 * than simply not start:
 *
 *  1. The target is what renders until the animation reports progress, so a
 *     frame loop that never runs (no JavaScript, reduced motion) shows the real
 *     value, and that is also what gets server rendered.
 *  2. A timer snaps to the target if the animation has not finished slightly
 *     after it should have. `animate` emits its first value immediately and
 *     then depends on requestAnimationFrame, which a browser freezes entirely
 *     in a background tab. Without this the display would stick on the first
 *     frame, reading 81 where it should read 1,900.
 */
export default function Counter({
  to,
  from = 0,
  decimals,
  prefix = "",
  suffix = "",
  duration = 1.6,
  className,
}: Props) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-15% 0px" });
  const reduced = useReducedMotion();
  const places = decimals ?? (Number.isInteger(to) ? 0 : 1);
  const [animated, setAnimated] = useState<number | null>(null);

  useEffect(() => {
    if (!inView || reduced) return;

    let settled = false;
    const controls = animate(from, to, {
      duration,
      ease: [0.16, 1, 0.3, 1],
      onUpdate: (v) => {
        if (!settled) setAnimated(v);
      },
      onComplete: () => {
        settled = true;
        setAnimated(null);
      },
    });

    const guard = window.setTimeout(
      () => {
        settled = true;
        controls.stop();
        setAnimated(null);
      },
      duration * 1000 + 500,
    );

    return () => {
      window.clearTimeout(guard);
      controls.stop();
    };
  }, [inView, reduced, from, to, duration]);

  const value = animated ?? to;

  /* Group thousands, so a seat count reads 1,900 rather than 1900. */
  const shown = value.toLocaleString("en-US", {
    minimumFractionDigits: places,
    maximumFractionDigits: places,
  });

  return (
    <span ref={ref} className={`tabular ${className ?? ""}`}>
      {prefix}
      {shown}
      {suffix}
    </span>
  );
}
