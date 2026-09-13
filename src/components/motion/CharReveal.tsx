"use client";

import { motion, useReducedMotion } from "motion/react";
import { onceInView, toChars } from "@/lib/motion";

type Props = {
  text: string;
  className?: string;
  delay?: number;
  stagger?: number;
  /** "rise" slides each glyph up; "flip" rotates it in on the X axis. */
  mode?: "rise" | "flip" | "scatter";
};

/** Per-character entrance. Kept off long paragraphs, where it reads as noise. */
export default function CharReveal({
  text,
  className,
  delay = 0,
  stagger = 0.022,
  mode = "rise",
}: Props) {
  const reduced = useReducedMotion();
  if (reduced) return <span className={className}>{text}</span>;

  const chars = toChars(text);

  const initial =
    mode === "flip"
      ? { rotateX: -92, y: "36%", opacity: 0 }
      : mode === "scatter"
        ? { y: "60%", opacity: 0, scale: 0.82, filter: "blur(6px)" }
        : { y: "104%", opacity: 1 };

  const target =
    mode === "flip"
      ? { rotateX: 0, y: "0%", opacity: 1 }
      : mode === "scatter"
        ? { y: "0%", opacity: 1, scale: 1, filter: "blur(0px)" }
        : { y: "0%", opacity: 1 };

  return (
    <span className={className} aria-label={text} style={{ display: "inline-block" }}>
      {chars.map((c, i) => (
        <span
          key={i}
          aria-hidden
          style={{
            display: "inline-block",
            overflow: mode === "rise" ? "hidden" : "visible",
            verticalAlign: "bottom",
            perspective: mode === "flip" ? 600 : undefined,
          }}
        >
          <motion.span
            style={{ display: "inline-block", willChange: "transform" }}
            initial={initial}
            whileInView={target}
            viewport={onceInView}
            transition={{
              duration: mode === "scatter" ? 0.8 : 0.95,
              ease: [0.16, 1, 0.3, 1],
              delay: delay + i * stagger,
            }}
          >
            {c === " " ? " " : c}
          </motion.span>
        </span>
      ))}
    </span>
  );
}
