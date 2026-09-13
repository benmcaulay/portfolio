"use client";

import { motion, useReducedMotion } from "motion/react";
import type { ReactNode } from "react";
import { expo, onceInView } from "@/lib/motion";

type Props = {
  children: ReactNode;
  /** Seconds of delay before this element starts. */
  delay?: number;
  /** Pixels travelled. Negative pulls from above. */
  y?: number;
  x?: number;
  blur?: boolean;
  className?: string;
  as?: "div" | "span" | "li" | "p" | "section";
};

/** Fade, travel, and optional defocus, once, as the element enters. */
export default function Reveal({
  children,
  delay = 0,
  y = 26,
  x = 0,
  blur = false,
  className,
  as = "div",
}: Props) {
  const reduced = useReducedMotion();
  const MotionTag = motion[as] as typeof motion.div;

  if (reduced) {
    const Tag = as;
    return <Tag className={className}>{children}</Tag>;
  }

  return (
    <MotionTag
      className={className}
      initial={{ opacity: 0, y, x, filter: blur ? "blur(10px)" : "blur(0px)" }}
      whileInView={{ opacity: 1, y: 0, x: 0, filter: "blur(0px)" }}
      viewport={onceInView}
      transition={{ ...expo, delay }}
    >
      {children}
    </MotionTag>
  );
}
