"use client";

import {
  motion,
  useAnimationFrame,
  useMotionValue,
  useScroll,
  useSpring,
  useTransform,
  useVelocity,
  useReducedMotion,
} from "motion/react";
import { useRef, type ReactNode } from "react";

type Props = {
  children: ReactNode;
  /** Pixels per second at rest. Negative runs right to left. */
  baseVelocity?: number;
  /** How hard scroll velocity pushes the belt. 0 disables the coupling. */
  scrollFactor?: number;
  className?: string;
  repeat?: number;
};

/**
 * A belt that always drifts, speeds up with the scroll, and reverses direction
 * when the visitor scrolls back up.
 */
export default function Marquee({
  children,
  baseVelocity = -40,
  scrollFactor = 4,
  className,
  repeat = 4,
}: Props) {
  const reduced = useReducedMotion();
  const baseX = useMotionValue(0);
  const { scrollY } = useScroll();
  const scrollVelocity = useVelocity(scrollY);
  const smooth = useSpring(scrollVelocity, { damping: 50, stiffness: 400 });
  const factor = useTransform(smooth, [-1400, 0, 1400], [-scrollFactor, 0, scrollFactor], {
    clamp: false,
  });
  const direction = useRef(1);

  useAnimationFrame((_t, delta) => {
    if (reduced) return;
    let moveBy = direction.current * baseVelocity * (delta / 1000);
    const f = factor.get();
    if (f < 0) direction.current = -1;
    else if (f > 0) direction.current = 1;
    moveBy += direction.current * moveBy * Math.abs(f);
    baseX.set(baseX.get() + moveBy);
  });

  /* One belt is 100% wide; wrapping across a single belt width keeps it seamless. */
  const x = useTransform(baseX, (v) => `${wrap(-100 / repeat, 0, v / 10)}%`);

  return (
    <div className={`relative w-full overflow-hidden ${className ?? ""}`}>
      <motion.div className="flex w-max flex-nowrap" style={{ x }}>
        {Array.from({ length: repeat }).map((_, i) => (
          <span key={i} className="flex shrink-0 items-center" aria-hidden={i > 0}>
            {children}
          </span>
        ))}
      </motion.div>
    </div>
  );
}

function wrap(min: number, max: number, v: number) {
  const range = max - min;
  const boundedValue = ((((v - min) % range) + range) % range) + min;
  return boundedValue;
}
