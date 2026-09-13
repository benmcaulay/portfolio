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
 * The displayed number stays at the true target until the animation actually
 * produces a frame. These are figures off a resume, and a frame loop that never
 * runs (a tab loaded in the background, a throttled renderer, no JavaScript at
 * all) must not leave a wrong number on screen. It also means the correct value
 * is what gets server rendered.
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
    const controls = animate(from, to, {
      duration,
      ease: [0.16, 1, 0.3, 1],
      onUpdate: (v) => setAnimated(v),
    });
    return () => controls.stop();
  }, [inView, reduced, from, to, duration]);

  const value = animated ?? to;

  return (
    <span ref={ref} className={`tabular ${className ?? ""}`}>
      {prefix}
      {value.toFixed(places)}
      {suffix}
    </span>
  );
}
