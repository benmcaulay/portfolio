"use client";

import { motion, useReducedMotion } from "motion/react";
import { onceInView, expo } from "@/lib/motion";

type Props = {
  /** Each string is one visual line. Line breaks are yours to choose. */
  lines: string[];
  className?: string;
  lineClassName?: string;
  stagger?: number;
  delay?: number;
  /** Reveal from below (default) or above. */
  from?: "below" | "above";
};

/**
 * Per-line reveal. Each line sits in its own overflow-hidden box and slides up
 * out of it, which is the effect that reads as "typeset itself".
 */
export default function LineMask({
  lines,
  className,
  lineClassName,
  stagger = 0.08,
  delay = 0,
  from = "below",
}: Props) {
  const reduced = useReducedMotion();
  const offset = from === "below" ? "110%" : "-110%";

  return (
    <span className={className}>
      {lines.map((line, i) => (
        <span key={i} className="line-clip">
          {reduced ? (
            <span className={lineClassName}>{line}</span>
          ) : (
            <motion.span
              className={lineClassName}
              style={{ display: "block", willChange: "transform" }}
              initial={{ y: offset }}
              whileInView={{ y: "0%" }}
              viewport={onceInView}
              transition={{ ...expo, delay: delay + i * stagger }}
            >
              {line}
            </motion.span>
          )}
        </span>
      ))}
    </span>
  );
}
