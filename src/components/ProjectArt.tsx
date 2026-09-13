"use client";

import { motion, useReducedMotion } from "motion/react";
import type { Project } from "@/content";
import { onceInView } from "@/lib/motion";

/**
 * A drawn mark for each project. Deterministic, stroke-only, currentColor, so
 * it inherits whichever polarity the variant is running.
 */
export default function ProjectArt({
  art,
  className,
  strokeWidth = 1,
}: {
  art: Project["art"];
  className?: string;
  strokeWidth?: number;
}) {
  const reduced = useReducedMotion();
  const draw = {
    initial: reduced ? undefined : { pathLength: 0, opacity: 0 },
    whileInView: reduced ? undefined : { pathLength: 1, opacity: 1 },
    viewport: onceInView,
  };

  const common = {
    fill: "none",
    stroke: "currentColor",
    strokeWidth,
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
    vectorEffect: "non-scaling-stroke" as const,
  };

  return (
    <svg
      viewBox="0 0 600 420"
      className={className}
      role="img"
      aria-hidden
      preserveAspectRatio="xMidYMid meet"
    >
      {art === "provenance" && <Provenance common={common} draw={draw} />}
      {art === "globe" && <Globe common={common} draw={draw} />}
      {art === "grid" && <GridArt common={common} draw={draw} />}
      {art === "silhouette" && <Silhouette common={common} draw={draw} />}
      {art === "orchestrator" && <Orchestrator common={common} draw={draw} />}
      {art === "distribution" && <Distribution common={common} draw={draw} />}
    </svg>
  );
}

type Shared = {
  common: Record<string, unknown>;
  draw: Record<string, unknown>;
};

/* A page of document lines, one blank boxed, with a leader to its source quote. */
function Provenance({ common, draw }: Shared) {
  const lines = [420, 380, 440, 300, 410, 250, 430, 360, 290];
  return (
    <g>
      <rect x="40" y="40" width="240" height="340" {...common} opacity={0.5} />
      <rect x="320" y="40" width="240" height="340" {...common} opacity={0.5} />
      {lines.map((w, i) => (
        <motion.line
          key={`l${i}`}
          x1={60}
          y1={78 + i * 34}
          x2={60 + (w / 440) * 200}
          y2={78 + i * 34}
          {...common}
          opacity={0.35}
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true }}
          style={{ transformOrigin: "left" }}
          transition={{ duration: 0.5, delay: i * 0.04, ease: [0.16, 1, 0.3, 1] }}
        />
      ))}
      {/* The filled blank. */}
      <motion.rect
        x="56"
        y="168"
        width="120"
        height="24"
        {...common}
        strokeWidth={2}
        initial={{ opacity: 0, scaleX: 0.4 }}
        whileInView={{ opacity: 1, scaleX: 1 }}
        viewport={{ once: true }}
        style={{ transformOrigin: "left" }}
        transition={{ duration: 0.7, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
      />
      {/* The quote it came from. */}
      <motion.rect
        x="336"
        y="236"
        width="150"
        height="24"
        {...common}
        strokeWidth={2}
        initial={{ opacity: 0, scaleX: 0.4 }}
        whileInView={{ opacity: 1, scaleX: 1 }}
        viewport={{ once: true }}
        style={{ transformOrigin: "left" }}
        transition={{ duration: 0.7, delay: 0.75, ease: [0.16, 1, 0.3, 1] }}
      />
      {lines.map((w, i) => (
        <line
          key={`r${i}`}
          x1={336}
          y1={78 + i * 34}
          x2={336 + (w / 440) * 190}
          y2={78 + i * 34}
          {...common}
          opacity={i === 5 ? 0 : 0.2}
        />
      ))}
      {/* The leader. This is the whole idea of the project in one curve. */}
      <motion.path
        d="M176 180 C 240 180, 260 248, 336 248"
        {...common}
        strokeWidth={1.5}
        strokeDasharray="4 5"
        {...draw}
        transition={{ duration: 1, delay: 0.9, ease: [0.16, 1, 0.3, 1] }}
      />
    </g>
  );
}

/* Orthographic globe with graticule and three great-circle arcs. */
function Globe({ common, draw }: Shared) {
  const cx = 300;
  const cy = 210;
  const r = 160;
  const lats = [-60, -30, 0, 30, 60];
  const lons = [-60, -30, 0, 30, 60];
  return (
    <g>
      <motion.circle
        cx={cx}
        cy={cy}
        r={r}
        {...common}
        {...draw}
        transition={{ duration: 1.4, ease: [0.16, 1, 0.3, 1] }}
      />
      {lats.map((lat, i) => {
        const y = cy - r * Math.sin((lat * Math.PI) / 180);
        const rx = r * Math.cos((lat * Math.PI) / 180);
        return (
          <ellipse
            key={`lat${i}`}
            cx={cx}
            cy={y}
            rx={rx}
            ry={rx * 0.12}
            {...common}
            opacity={0.22}
          />
        );
      })}
      {lons.map((lon, i) => {
        const rx = Math.abs(r * Math.sin((lon * Math.PI) / 180)) || 0.6;
        return (
          <ellipse key={`lon${i}`} cx={cx} cy={cy} rx={rx} ry={r} {...common} opacity={0.22} />
        );
      })}
      {[
        "M180 150 C 240 96, 372 104, 424 168",
        "M196 292 C 268 336, 360 320, 410 252",
        "M162 230 C 240 196, 350 214, 432 196",
      ].map((d, i) => (
        <motion.path
          key={`arc${i}`}
          d={d}
          {...common}
          strokeWidth={2}
          {...draw}
          transition={{ duration: 1.2, delay: 0.5 + i * 0.22, ease: [0.16, 1, 0.3, 1] }}
        />
      ))}
      {[
        [180, 150],
        [424, 168],
        [196, 292],
        [410, 252],
        [162, 230],
        [432, 196],
      ].map(([x, y], i) => (
        <motion.circle
          key={`pt${i}`}
          cx={x}
          cy={y}
          r={4}
          fill="currentColor"
          stroke="none"
          initial={{ scale: 0 }}
          whileInView={{ scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 1.1 + i * 0.06, ease: [0.16, 1, 0.3, 1] }}
        />
      ))}
    </g>
  );
}

/* A closet grid with one slot held open, and a rail axis beneath it. */
function GridArt({ common }: Shared) {
  const cols = 5;
  const rows = 3;
  const w = 92;
  const h = 96;
  const x0 = 50;
  const y0 = 40;
  const open = 7;
  return (
    <g>
      {Array.from({ length: cols * rows }).map((_, i) => {
        const cx = x0 + (i % cols) * (w + 12);
        const cy = y0 + Math.floor(i / cols) * (h + 12);
        const isOpen = i === open;
        return (
          <motion.g
            key={i}
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: i * 0.035, ease: [0.16, 1, 0.3, 1] }}
          >
            <rect
              x={cx}
              y={cy}
              width={w}
              height={h}
              {...common}
              strokeDasharray={isOpen ? "5 5" : undefined}
              opacity={isOpen ? 0.9 : 0.42}
            />
            {!isOpen && (
              <>
                <path
                  d={`M${cx + 22} ${cy + 26} h${w - 44} v${h - 52} h-${w - 44} z`}
                  {...common}
                  opacity={0.3}
                />
                <path d={`M${cx + w / 2} ${cy + 12} v14`} {...common} opacity={0.3} />
              </>
            )}
          </motion.g>
        );
      })}
      <line x1="50" y1="376" x2="550" y2="376" {...common} opacity={0.5} />
      {[0.04, 0.13, 0.2, 0.36, 0.44, 0.62, 0.78, 0.95].map((t, i) => (
        <motion.line
          key={`tick${i}`}
          x1={50 + t * 500}
          y1={366}
          x2={50 + t * 500}
          y2={386}
          {...common}
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 0.75 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4, delay: 0.7 + i * 0.05 }}
        />
      ))}
    </g>
  );
}

/* Airliner planform. Read the wingtips, then the engines, then the tail. */
function Silhouette({ common, draw }: Shared) {
  return (
    <g>
      <motion.path
        d="M300 44 C 312 74, 318 126, 320 176 L 470 250 L 470 274 L 321 236 C 321 268, 318 306, 313 334 L 344 358 L 344 372 L 300 362 L 256 372 L 256 358 L 287 334 C 282 306, 279 268, 279 236 L 130 274 L 130 250 L 280 176 C 282 126, 288 74, 300 44 Z"
        {...common}
        strokeWidth={1.5}
        {...draw}
        transition={{ duration: 2, ease: [0.16, 1, 0.3, 1] }}
      />
      {[
        [236, 244],
        [364, 244],
      ].map(([x, y], i) => (
        <motion.ellipse
          key={i}
          cx={x}
          cy={y}
          rx={13}
          ry={26}
          {...common}
          initial={{ opacity: 0, scale: 0.6 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 1.1 + i * 0.12, ease: [0.16, 1, 0.3, 1] }}
        />
      ))}
      {/* Cue callouts. */}
      {[
        [470, 262, 540, 262],
        [130, 262, 60, 262],
        [300, 372, 300, 402],
      ].map(([x1, y1, x2, y2], i) => (
        <motion.line
          key={`cue${i}`}
          x1={x1}
          y1={y1}
          x2={x2}
          y2={y2}
          {...common}
          strokeDasharray="3 4"
          opacity={0.5}
          initial={{ pathLength: 0 }}
          whileInView={{ pathLength: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 1.4 + i * 0.1 }}
        />
      ))}
    </g>
  );
}

/* Scheduler ring feeding a small node graph, with a gate in the middle. */
function Orchestrator({ common, draw }: Shared) {
  const nodes: [number, number][] = [
    [120, 110],
    [120, 310],
    [480, 110],
    [480, 310],
    [300, 60],
    [300, 360],
  ];
  return (
    <g>
      <motion.circle
        cx={300}
        cy={210}
        r={62}
        {...common}
        {...draw}
        transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
      />
      <motion.path
        d="M300 148 A 62 62 0 0 1 362 210"
        {...common}
        strokeWidth={3}
        {...draw}
        transition={{ duration: 1, delay: 0.9 }}
      />
      {nodes.map(([x, y], i) => (
        <g key={i}>
          <motion.line
            x1={300}
            y1={210}
            x2={x}
            y2={y}
            {...common}
            opacity={0.32}
            strokeDasharray={i % 2 ? "4 5" : undefined}
            initial={{ pathLength: 0 }}
            whileInView={{ pathLength: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.3 + i * 0.09, ease: [0.16, 1, 0.3, 1] }}
          />
          <motion.rect
            x={x - 30}
            y={y - 17}
            width={60}
            height={34}
            {...common}
            initial={{ opacity: 0, scale: 0.7 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.55, delay: 0.6 + i * 0.09, ease: [0.16, 1, 0.3, 1] }}
          />
        </g>
      ))}
      <rect x="282" y="196" width="36" height="28" {...common} strokeWidth={2} />
      <path d="M290 210 l7 8 l14 -17" {...common} strokeWidth={2} />
    </g>
  );
}

/* Five overlapping densities, one per pentathlon discipline. */
function Distribution({ common, draw }: Shared) {
  const curves = [
    { mu: 170, sigma: 52, h: 150 },
    { mu: 240, sigma: 38, h: 190 },
    { mu: 300, sigma: 64, h: 130 },
    { mu: 372, sigma: 44, h: 172 },
    { mu: 430, sigma: 34, h: 110 },
  ];
  const base = 350;
  const path = (mu: number, sigma: number, h: number) => {
    const pts: string[] = [];
    for (let x = 40; x <= 560; x += 8) {
      const y = base - h * Math.exp(-((x - mu) ** 2) / (2 * sigma ** 2));
      pts.push(`${x} ${y.toFixed(1)}`);
    }
    return `M${pts.join(" L")}`;
  };
  return (
    <g>
      <line x1="40" y1={base} x2="560" y2={base} {...common} opacity={0.5} />
      {curves.map((c, i) => (
        <motion.path
          key={i}
          d={path(c.mu, c.sigma, c.h)}
          {...common}
          strokeWidth={i === 1 ? 2.4 : 1.2}
          opacity={i === 1 ? 1 : 0.42}
          {...draw}
          transition={{ duration: 1.5, delay: i * 0.16, ease: [0.16, 1, 0.3, 1] }}
        />
      ))}
      {curves.map((c, i) => (
        <motion.line
          key={`m${i}`}
          x1={c.mu}
          y1={base - c.h}
          x2={c.mu}
          y2={base}
          {...common}
          strokeDasharray="3 5"
          opacity={0.3}
          initial={{ pathLength: 0 }}
          whileInView={{ pathLength: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.9 + i * 0.1 }}
        />
      ))}
    </g>
  );
}
