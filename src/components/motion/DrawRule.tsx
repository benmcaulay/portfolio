"use client";

import { motion, useReducedMotion } from "motion/react";
import { onceInView } from "@/lib/motion";

type Props = {
  className?: string;
  delay?: number;
  duration?: number;
  vertical?: boolean;
  /** Thickness in pixels. */
  weight?: number;
};

/** A hairline that draws itself from its origin. The editorial workhorse. */
export default function DrawRule({
  className,
  delay = 0,
  duration = 1.2,
  vertical = false,
  weight = 1,
}: Props) {
  const reduced = useReducedMotion();
  const axis = vertical ? "scaleY" : "scaleX";

  return (
    <motion.span
      aria-hidden
      className={className}
      style={{
        display: "block",
        background: "currentColor",
        opacity: 0.28,
        transformOrigin: vertical ? "top" : "left",
        ...(vertical ? { width: weight, height: "100%" } : { height: weight, width: "100%" }),
      }}
      initial={reduced ? undefined : { [axis]: 0 }}
      whileInView={reduced ? undefined : { [axis]: 1 }}
      viewport={onceInView}
      transition={{ duration, ease: [0.83, 0, 0.17, 1], delay }}
    />
  );
}
