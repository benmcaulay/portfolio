"use client";

import { motion, useScroll, useSpring, useTransform, useReducedMotion } from "motion/react";
import { useRef, type ReactNode } from "react";

type Props = {
  children: ReactNode;
  /** Negative moves against the scroll, positive with it. In viewport heights. */
  depth?: number;
  className?: string;
  /** Also scale slightly on the way through. */
  scaleTo?: number;
  stiffness?: number;
};

/** Depth layer. Reads its own position so it works anywhere in the document. */
export default function Parallax({
  children,
  depth = -0.18,
  className,
  scaleTo,
  stiffness = 140,
}: Props) {
  const ref = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const raw = useTransform(scrollYProgress, [0, 1], [`${-depth * 50}%`, `${depth * 50}%`]);
  const y = useSpring(raw, { stiffness, damping: 30, mass: 0.4 });
  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [1, scaleTo ?? 1, 1]);

  return (
    <div ref={ref} className={className}>
      <motion.div style={reduced ? undefined : { y, scale: scaleTo ? scale : 1 }}>
        {children}
      </motion.div>
    </div>
  );
}
