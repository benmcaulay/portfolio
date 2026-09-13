"use client";

import { motion, useReducedMotion, useScroll, useSpring, useTransform } from "motion/react";
import { useRef } from "react";
import { hasMark, markPlacements } from "@/content/marks";

/**
 * A logo run very large and very quiet behind a section.
 *
 * The PNG is used as a CSS mask over a currentColor fill, never as an image, so
 * the mark inherits whichever polarity its variant is running and the palette
 * stays at two tones. Renders nothing at all unless the mask file exists.
 */
export default function BrandMark({
  mark,
  className,
  size,
  opacity,
  anchor,
}: {
  mark: string | undefined;
  className?: string;
  /** Overrides the registry default. */
  size?: string;
  opacity?: number;
  anchor?: "left" | "right" | "center";
}) {
  const ref = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const place = mark ? markPlacements[mark] : undefined;
  const depth = place?.depth ?? -0.2;
  const raw = useTransform(scrollYProgress, [0, 1], [`${-depth * 50}%`, `${depth * 50}%`]);
  const y = useSpring(raw, { stiffness: 90, damping: 30, mass: 0.5 });
  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [1.04, 1.12, 1.04]);

  if (!hasMark(mark) || !place) return null;

  const side = anchor ?? place.anchor;
  const edge =
    side === "left"
      ? { left: "-8%" }
      : side === "right"
        ? { right: "-8%" }
        : { left: "50%", translate: "-50% 0" };

  return (
    <div
      ref={ref}
      aria-hidden
      className={`pointer-events-none absolute inset-y-0 -z-10 overflow-hidden ${className ?? ""}`}
      style={side === "center" ? { left: 0, right: 0 } : edge}
    >
      <motion.div
        style={{
          y: reduced ? 0 : y,
          scale: reduced ? 1 : scale,
          width: size ?? place.size,
          aspectRatio: "1 / 1",
          opacity: opacity ?? place.opacity ?? 0.07,
          backgroundColor: "currentColor",
          maskImage: `url(/marks/${mark}.png)`,
          WebkitMaskImage: `url(/marks/${mark}.png)`,
          maskRepeat: "no-repeat",
          WebkitMaskRepeat: "no-repeat",
          maskSize: "contain",
          WebkitMaskSize: "contain",
          maskPosition: "center",
          WebkitMaskPosition: "center",
          translate: `0 ${place.offsetY ?? "0%"}`,
        }}
        className="absolute top-1/2 -translate-y-1/2"
      />
    </div>
  );
}
