"use client";

import { motion, useScroll, useSpring } from "motion/react";

/** A one pixel readout of how far down the document you are. */
export default function ScrollProgress({
  className = "bg-current",
  height = 2,
}: {
  className?: string;
  height?: number;
}) {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 220, damping: 40, restDelta: 0.001 });

  return (
    <motion.div
      aria-hidden
      className={`fixed inset-x-0 top-0 z-50 origin-left ${className}`}
      style={{ scaleX, height }}
    />
  );
}
