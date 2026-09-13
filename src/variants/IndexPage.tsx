"use client";

import Link from "next/link";
import { motion, useScroll, useSpring, useTransform } from "motion/react";
import { useRef } from "react";
import { profile, variants, type VariantMeta } from "@/content";
import SmoothScroll from "@/components/SmoothScroll";
import LineMask from "@/components/motion/LineMask";
import Reveal from "@/components/motion/Reveal";
import DrawRule from "@/components/motion/DrawRule";
import Marquee from "@/components/motion/Marquee";
import { expo } from "@/lib/motion";

export default function IndexPage() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 200, damping: 40 });

  return (
    <main className="grain bg-paper text-ink">
      <SmoothScroll />
      <motion.div
        aria-hidden
        style={{ scaleX }}
        className="fixed inset-x-0 top-0 z-50 h-0.5 origin-left bg-ink"
      />

      <Cover />

      <div className="border-y border-ink/15 py-3">
        <Marquee baseVelocity={-38} scrollFactor={4} repeat={3}>
          {variants.map((v) => (
            <span key={v.slug} className="flex items-center">
              <span className="px-6 font-mono text-[11px] tracking-[0.2em] whitespace-nowrap uppercase">
                {v.index} {v.name}
              </span>
              <span className="opacity-30">&#9679;</span>
            </span>
          ))}
        </Marquee>
      </div>

      <ol>
        {variants.map((v, i) => (
          <li key={v.slug}>
            <Panel variant={v} index={i} />
          </li>
        ))}
      </ol>

      <Outro />
    </main>
  );
}

/* ---------------------------------------------------------------------- cover */

function Cover() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "26%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  return (
    <header ref={ref} className="gutter flex min-h-[100svh] flex-col justify-between py-8">
      <div className="flex items-baseline justify-between font-mono text-[10px] tracking-[0.18em] uppercase">
        <span>{profile.name}</span>
        <span className="hidden opacity-45 sm:block">{profile.role}</span>
        <span className="tabular opacity-45">
          {String(variants.length).padStart(2, "0")} versions
        </span>
      </div>

      <motion.div style={{ y, opacity }}>
        <h1 className="optical hang font-display text-[clamp(3rem,13vw,14rem)]">
          <LineMask lines={["Four", "versions"]} stagger={0.12} />
        </h1>
        <DrawRule className="mt-8 mb-6" delay={0.45} />
        <div className="grid grid-cols-12 gap-x-6 gap-y-6">
          <Reveal delay={0.6} className="col-span-12 md:col-span-5">
            <p className="max-w-[44ch] text-lg leading-snug text-pretty sm:text-xl">
              The same resume, the same work, four different arguments about how a portfolio should
              move. Black and white throughout, because color is a crutch when the typography has
              to carry it.
            </p>
          </Reveal>
          <Reveal delay={0.7} className="col-span-12 md:col-span-3 md:col-start-7">
            <p className="max-w-[30ch] font-mono text-[10px] leading-relaxed tracking-[0.12em] uppercase opacity-55">
              Scroll to compare. Open any version, then use the switcher at the bottom, or press 1
              through 4, to jump between them without losing your place.
            </p>
          </Reveal>
          <Reveal delay={0.8} className="col-span-12 md:col-span-2 md:col-start-11">
            <ul className="space-y-1 font-mono text-[10px] tracking-[0.12em] uppercase">
              {variants.map((v) => (
                <li key={v.slug}>
                  <Link
                    href={`/v/${v.slug}`}
                    className="group flex items-baseline gap-2 border-b border-ink/20 pb-1 hover:border-ink"
                  >
                    <span className="tabular opacity-45">{v.index}</span>
                    <span className="flex-1">{v.name}</span>
                    <span className="transition-transform group-hover:translate-x-0.5">&rarr;</span>
                  </Link>
                </li>
              ))}
            </ul>
          </Reveal>
        </div>
      </motion.div>

      <p className="font-mono text-[10px] tracking-[0.18em] uppercase opacity-40">
        Scroll
      </p>
    </header>
  );
}

/* ---------------------------------------------------------------------- panel */

/**
 * One full-height panel per version. Polarity alternates so the seam between
 * panels is the transition, and the specimen line is set in that version's
 * own typeface.
 */
function Panel({ variant, index }: { variant: VariantMeta; index: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const dark = index % 2 === 1;
  const y = useTransform(scrollYProgress, [0, 1], ["8%", "-8%"]);
  const clip = useTransform(scrollYProgress, [0, 0.35], [12, 0]);
  const clipPath = useTransform(clip, (v) => `inset(${v}% 0% 0% 0%)`);

  const face =
    variant.slug === "editorial"
      ? "font-display"
      : variant.slug === "kinetic"
        ? "font-kinetic uppercase"
        : variant.slug === "terminal"
          ? "font-mono uppercase"
          : "font-sans font-semibold uppercase";

  return (
    <motion.div
      ref={ref}
      style={{ clipPath }}
      className={`${dark ? "on-ink bg-ink text-paper" : "bg-paper text-ink"} relative overflow-hidden`}
    >
      <Link
        href={`/v/${variant.slug}`}
        className="group block min-h-[92svh] py-16"
        aria-label={`Open version ${variant.index}, ${variant.name}`}
      >
        <div className="gutter flex min-h-[inherit] flex-col justify-between gap-12">
          <div className="flex items-baseline justify-between font-mono text-[10px] tracking-[0.18em] uppercase">
            <span className="tabular">Version {variant.index}</span>
            <span className="opacity-45">
              {variant.polarity === "both"
                ? "Inverts"
                : variant.polarity === "ink"
                  ? "White on black"
                  : "Black on white"}
            </span>
          </div>

          <motion.div style={{ y }}>
            <h2
              className={`${face} optical text-[clamp(2.5rem,11vw,10rem)] leading-[0.86] transition-opacity`}
            >
              <LineMask lines={variant.name.split(" ")} stagger={0.1} />
            </h2>
            <p className="mt-8 max-w-[40ch] text-[clamp(1.125rem,2.2vw,1.75rem)] leading-snug text-pretty">
              {variant.tagline}
            </p>
          </motion.div>

          <div className="grid grid-cols-12 gap-x-6 gap-y-8">
            <Reveal className="col-span-12 md:col-span-5">
              <p className="font-mono text-[10px] tracking-[0.16em] uppercase opacity-45">
                What the scroll does
              </p>
              <p className="mt-3 max-w-[48ch] text-[0.9375rem] leading-relaxed opacity-85">
                {variant.motion}
              </p>
            </Reveal>
            <Reveal delay={0.08} className="col-span-12 md:col-span-4">
              <p className="font-mono text-[10px] tracking-[0.16em] uppercase opacity-45">
                Type
              </p>
              <p className="mt-3 max-w-[40ch] text-[0.9375rem] leading-relaxed opacity-85">
                {variant.type}
              </p>
            </Reveal>
            <div className="col-span-12 flex items-end md:col-span-2 md:col-start-11 md:justify-end">
              <span className="inline-flex items-center gap-2 border-b border-current/40 pb-1 font-mono text-[10px] tracking-[0.16em] uppercase group-hover:border-current">
                Open
                <span className="inline-block transition-transform group-hover:translate-x-1">
                  &rarr;
                </span>
              </span>
            </div>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}

/* ---------------------------------------------------------------------- outro */

function Outro() {
  return (
    <footer className="gutter border-t border-ink/15 py-20">
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-15%" }}
        transition={expo}
      >
        <p className="font-mono text-[10px] tracking-[0.18em] uppercase opacity-45">
          Pick a favorite and it becomes the front door
        </p>
        <p className="mt-6 max-w-[52ch] font-display text-[clamp(1.5rem,3.4vw,2.75rem)] leading-[1.15] text-pretty">
          Every version reads from one content file, so the copy stays in sync no matter which one
          ships.
        </p>
        <div className="mt-12 flex flex-wrap items-baseline justify-between gap-6 border-t border-ink/15 pt-6 font-mono text-[10px] tracking-[0.14em] uppercase">
          <a href={`mailto:${profile.email}`} className="hover:opacity-60">
            {profile.email}
          </a>
          <a href={profile.github} target="_blank" rel="noreferrer" className="hover:opacity-60">
            github.com/{profile.githubHandle}
          </a>
          <a href={profile.resumeHref} className="hover:opacity-60">
            Resume, PDF
          </a>
          <span className="opacity-40">{profile.location}</span>
        </div>
      </motion.div>
    </footer>
  );
}
