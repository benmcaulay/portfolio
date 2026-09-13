"use client";

import {
  motion,
  useScroll,
  useSpring,
  useTransform,
  type MotionValue,
} from "motion/react";
import { useRef } from "react";
import {
  affiliations,
  experience,
  featuredProjects,
  leadership,
  profile,
  variantBySlug,
} from "@/content";
import SmoothScroll from "@/components/SmoothScroll";
import VariantSwitcher from "@/components/chrome/VariantSwitcher";
import StickyStage from "@/components/motion/StickyStage";
import Counter from "@/components/motion/Counter";
import Reveal from "@/components/motion/Reveal";
import LineMask from "@/components/motion/LineMask";
import ProjectArt from "@/components/ProjectArt";
import BrandMark from "@/components/BrandMark";
import { expo, onceInView } from "@/lib/motion";

const meta = variantBySlug("cinematic")!;

export default function CinematicPage() {
  return (
    <div className="on-ink grain min-h-screen bg-ink text-paper">
      <SmoothScroll />
      <Hud />
      <Title />
      <Aperture />
      <Ledger />
      <Reel />
      <Roles />
      <Leadership />
      <Coda />
      <VariantSwitcher current="cinematic" tone="ink" />
    </div>
  );
}

/* ------------------------------------------------------------------------- hud */

function Hud() {
  const { scrollYProgress } = useScroll();
  const pct = useTransform(scrollYProgress, (v) => `${Math.round(v * 100)}`.padStart(3, "0"));
  const scaleY = useSpring(scrollYProgress, { stiffness: 200, damping: 40 });

  return (
    <>
      <div className="pointer-events-none fixed inset-x-0 top-0 z-40 mix-blend-difference">
        <div className="gutter flex items-baseline justify-between py-4 font-mono text-[10px] tracking-[0.18em] text-paper uppercase">
          <span>{profile.name}</span>
          <span className="hidden md:block">{meta.name}</span>
          <motion.span className="tabular">{pct}</motion.span>
        </div>
      </div>
      <div className="pointer-events-none fixed top-0 right-0 z-40 hidden h-full w-px bg-paper/15 md:block">
        <motion.div
          style={{ scaleY }}
          className="h-full w-full origin-top bg-paper"
        />
      </div>
    </>
  );
}

/* ----------------------------------------------------------------------- title */

function Title() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const scale = useTransform(scrollYProgress, [0, 1], [1, 1.42]);
  const tracking = useTransform(scrollYProgress, [0, 1], ["-0.05em", "0.24em"]);
  const opacity = useTransform(scrollYProgress, [0, 0.75], [1, 0]);
  const blur = useTransform(scrollYProgress, [0, 1], ["blur(0px)", "blur(14px)"]);
  const subY = useTransform(scrollYProgress, [0, 1], ["0%", "-180%"]);
  const vignette = useTransform(scrollYProgress, [0, 1], [0.15, 0.9]);

  return (
    <div ref={ref} className="relative h-[210vh]">
      <div className="sticky top-0 flex h-screen items-center justify-center overflow-hidden">
        {/* Depth field. Concentric rings receding, which gives the scale move something to bite on. */}
        <Rings progress={scrollYProgress} />

        <motion.div
          style={{ opacity: vignette }}
          className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_35%,#000_100%)]"
        />

        <motion.h1
          style={{ scale, letterSpacing: tracking, opacity, filter: blur }}
          className="gutter relative z-10 text-center text-[clamp(2.75rem,11vw,11rem)] leading-[0.85] font-semibold"
        >
          <LineMask lines={["BENNETT", "MCAULAY"]} stagger={0.14} />
        </motion.h1>

        <motion.div
          style={{ y: subY, opacity }}
          className="gutter absolute bottom-12 z-10 flex w-full items-end justify-between font-mono text-[10px] tracking-[0.18em] uppercase"
        >
          <p className="max-w-[28ch] leading-relaxed opacity-70">{profile.role}</p>
          <p className="hidden opacity-40 sm:block">Scroll</p>
          <p className="max-w-[24ch] text-right leading-relaxed opacity-70">{profile.location}</p>
        </motion.div>
      </div>
    </div>
  );
}

function Rings({ progress }: { progress: MotionValue<number> }) {
  return (
    <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
      {[0, 1, 2, 3, 4, 5].map((i) => (
        <Ring key={i} progress={progress} depth={i} />
      ))}
    </div>
  );
}

function Ring({ progress, depth }: { progress: MotionValue<number>; depth: number }) {
  const scale = useTransform(progress, [0, 1], [1 + depth * 0.22, 2.6 + depth * 0.5]);
  const opacity = useTransform(progress, [0, 0.6, 1], [0.16 - depth * 0.02, 0.1, 0]);
  return (
    <motion.span
      style={{ scale, opacity }}
      className="absolute aspect-square w-[42vmin] rounded-full border border-paper"
    />
  );
}

/* -------------------------------------------------------------------- aperture */

function Aperture() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  /* An iris that opens across the statement, then closes behind it. */
  const inset = useTransform(scrollYProgress, [0.1, 0.45, 0.62, 0.95], [42, 0, 0, 42]);
  const clip = useTransform(inset, (v) => `inset(${v}% ${v / 2}% ${v}% ${v / 2}%)`);
  const scale = useTransform(scrollYProgress, [0.1, 0.5, 0.95], [1.18, 1, 1.1]);

  return (
    <section ref={ref} className="relative py-[14vh]">
      <motion.div
        style={{ clipPath: clip, scale }}
        className="gutter border-y border-paper/15 bg-g-950 py-[16vh]"
      >
        <div className="mx-auto max-w-5xl space-y-10">
          {profile.intro.map((p, i) => (
            <Reveal key={i} delay={i * 0.1} y={30} blur>
              <p className="text-[clamp(1.375rem,3.4vw,2.75rem)] leading-[1.14] font-medium tracking-[-0.02em] text-pretty">
                {p}
              </p>
            </Reveal>
          ))}
        </div>
      </motion.div>
    </section>
  );
}

/* ---------------------------------------------------------------------- ledger */

function Ledger() {
  return (
    <section className="gutter py-[12vh]">
      <p className="mb-14 font-mono text-[10px] tracking-[0.2em] uppercase opacity-40">
        By the numbers
      </p>
      <div className="grid grid-cols-1 gap-px bg-paper/15 sm:grid-cols-2 lg:grid-cols-3">
        {profile.metrics.map((m, i) => (
          <motion.div
            key={m.label}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={onceInView}
            transition={{ ...expo, delay: i * 0.06 }}
            className="group relative overflow-hidden bg-ink p-8 sm:p-10"
          >
            <span className="absolute inset-0 -translate-y-full bg-paper transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:translate-y-0" />
            <span className="relative block transition-colors duration-500 group-hover:text-ink">
              <span className="tabular block text-[clamp(3rem,7vw,5.5rem)] leading-none font-semibold tracking-[-0.045em]">
                <Counter
                  to={m.value}
                  prefix={"prefix" in m ? (m.prefix as string) : ""}
                  suffix={m.suffix}
                />
              </span>
              <span className="mt-5 block max-w-[24ch] text-base leading-snug">{m.label}</span>
              <span className="mt-2 block font-mono text-[10px] tracking-[0.14em] uppercase opacity-45">
                {m.context}
              </span>
            </span>
          </motion.div>
        ))}
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------------ reel */

/**
 * The centerpiece. One pinned viewport; the project stack advances horizontally
 * under it while each slide scales, masks, and hands off to the next.
 */
function Reel() {
  const count = featuredProjects.length;

  return (
    <StickyStage length={count * 1.55} className="relative">
      {(progress) => <ReelStage progress={progress} count={count} />}
    </StickyStage>
  );
}

function ReelStage({ progress, count }: { progress: MotionValue<number>; count: number }) {
  const x = useTransform(progress, [0, 1], ["0%", `-${(count - 1) * 100}%`]);
  const smoothX = useSpring(x, { stiffness: 90, damping: 26, mass: 0.5 });
  const label = useTransform(progress, (v) =>
    String(Math.min(count, Math.floor(v * count) + 1)).padStart(2, "0"),
  );

  return (
    <div className="relative h-full w-full">
      <motion.div style={{ x: smoothX }} className="flex h-full" >
        {featuredProjects.map((p, i) => (
          <Slide key={p.id} project={p} index={i} count={count} progress={progress} />
        ))}
      </motion.div>

      <div className="gutter pointer-events-none absolute inset-x-0 bottom-0 flex items-center justify-between border-t border-paper/15 py-4 font-mono text-[10px] tracking-[0.18em] uppercase">
        <span className="opacity-40">Selected work</span>
        <span className="tabular">
          <motion.span>{label}</motion.span>
          <span className="opacity-40"> / {String(count).padStart(2, "0")}</span>
        </span>
      </div>
    </div>
  );
}

function Slide({
  project,
  index,
  count,
  progress,
}: {
  project: (typeof featuredProjects)[number];
  index: number;
  count: number;
  progress: MotionValue<number>;
}) {
  /* Where this slide sits in the pinned scroll, 0 at center. */
  const center = index / (count - 1 || 1);
  const span = 1 / (count - 1 || 1);
  const local = useTransform(progress, [center - span, center, center + span], [-1, 0, 1], {
    clamp: true,
  });
  const scale = useTransform(local, [-1, 0, 1], [0.86, 1, 0.86]);
  const opacity = useTransform(local, [-1, -0.55, 0, 0.55, 1], [0, 0.25, 1, 0.25, 0]);
  const artX = useTransform(local, [-1, 0, 1], ["26%", "0%", "-26%"]);
  const textX = useTransform(local, [-1, 0, 1], ["-14%", "0%", "14%"]);

  return (
    <div className="relative h-full w-screen shrink-0">
      <motion.div
        style={{ scale, opacity }}
        className="gutter grid h-full grid-cols-12 items-center gap-x-8 pt-16 pb-24"
      >
        <motion.div style={{ x: textX }} className="col-span-12 lg:col-span-5">
          <p className="tabular font-mono text-[10px] tracking-[0.2em] uppercase opacity-45">
            {project.index} / {project.year}
          </p>
          <h3 className="mt-5 text-[clamp(2.25rem,5.5vw,4.5rem)] leading-[0.92] font-semibold tracking-[-0.04em] text-balance">
            {project.title}
          </h3>
          {project.altTitle && (
            <p className="mt-2 text-2xl opacity-40">{project.altTitle}</p>
          )}
          <p className="mt-4 font-mono text-[10px] tracking-[0.16em] uppercase opacity-55">
            {project.kicker}
          </p>
          <p className="mt-7 max-w-[46ch] text-lg leading-snug opacity-85 text-pretty">
            {project.blurb}
          </p>
          <p className="mt-7 max-w-[40ch] font-mono text-[10px] leading-relaxed tracking-[0.12em] uppercase opacity-40">
            {project.stack.join("  /  ")}
          </p>
          <div className="mt-6 flex flex-wrap gap-x-5 gap-y-2 font-mono text-[10px] tracking-[0.16em] uppercase">
            {project.links.map((l) => (
              <a
                key={l.href}
                href={l.href}
                target="_blank"
                rel="noreferrer"
                className="group inline-flex items-center gap-1.5 border-b border-paper/40 pb-px hover:border-paper"
              >
                {l.label}
                <span className="inline-block transition-transform group-hover:translate-x-0.5">
                  &rarr;
                </span>
              </a>
            ))}
            {project.privateSource && !project.links.length && (
              <span className="opacity-35">Private repository</span>
            )}
          </div>
        </motion.div>

        <motion.div
          style={{ x: artX }}
          className="col-span-12 hidden lg:col-span-6 lg:col-start-7 lg:block"
        >
          <div className="relative border border-paper/15 p-10">
            <ProjectArt art={project.art} className="h-auto w-full" />
            <span className="tabular absolute -top-3 left-6 bg-ink px-2 font-mono text-[10px] tracking-[0.16em] uppercase opacity-45">
              Fig. {project.index}
            </span>
          </div>
          <dl className="mt-6 grid grid-cols-2 gap-x-8 gap-y-2 font-mono text-[10px] tracking-[0.1em] uppercase">
            {project.facts.slice(0, 4).map((f) => (
              <div key={f.k} className="flex items-baseline justify-between gap-3 border-t border-paper/15 pt-2">
                <dt className="opacity-40">{f.k}</dt>
                <dd className="text-right">{f.v}</dd>
              </div>
            ))}
          </dl>
        </motion.div>
      </motion.div>
    </div>
  );
}

/* ----------------------------------------------------------------------- roles */

function Roles() {
  return (
    <section className="gutter py-[14vh]">
      <p className="mb-16 font-mono text-[10px] tracking-[0.2em] uppercase opacity-40">
        Experience
      </p>
      <ol className="space-y-px bg-paper/15">
        {experience.map((role, i) => (
          <li key={role.id}>
            <RoleBlock role={role} index={i} />
          </li>
        ))}
      </ol>
    </section>
  );
}

function RoleBlock({ role, index }: { role: (typeof experience)[number]; index: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], ["6%", "-6%"]);

  return (
    <div ref={ref} className="relative overflow-hidden bg-ink py-14">
      <BrandMark mark={role.mark} opacity={0.12} />
      <motion.div style={{ y }} className="relative grid grid-cols-12 gap-x-8 gap-y-6">
        <div className="col-span-12 lg:col-span-4">
          <p className="tabular font-mono text-[10px] tracking-[0.18em] uppercase opacity-40">
            {String(index + 1).padStart(2, "0")} / {role.start} &rarr; {role.end}
          </p>
          <h3 className="mt-4 text-[clamp(1.5rem,3.4vw,2.75rem)] leading-[1] font-semibold tracking-[-0.035em] text-balance">
            {role.org}
          </h3>
          <p className="mt-3 text-sm opacity-70">
            {role.title}, {role.place}
          </p>
        </div>
        <div className="col-span-12 lg:col-span-7 lg:col-start-6">
          <Reveal>
            <p className="max-w-[54ch] text-[clamp(1.0625rem,1.8vw,1.375rem)] leading-snug text-pretty">
              {role.summary}
            </p>
          </Reveal>
          <ul className="mt-8 space-y-4">
            {role.bullets.map((b, bi) => (
              <Reveal as="li" key={bi} delay={bi * 0.05} y={18}>
                <span className="block max-w-[68ch] border-l border-paper/20 pl-5 text-[0.9375rem] leading-relaxed opacity-70">
                  {b}
                </span>
              </Reveal>
            ))}
          </ul>
        </div>
      </motion.div>
    </div>
  );
}

/* ------------------------------------------------------------------ leadership */

function Leadership() {
  return (
    <section className="gutter relative py-[14vh]">
      <BrandMark mark="stanford" opacity={0.1} />
      <p className="relative mb-16 font-mono text-[10px] tracking-[0.2em] uppercase opacity-40">
        Leadership
      </p>

      <div className="relative grid grid-cols-12 gap-x-8 gap-y-10">
        <div className="col-span-12 lg:col-span-7">
          <Reveal>
            <p className="max-w-[40ch] text-[clamp(1.5rem,3.4vw,2.75rem)] leading-[1.1] font-semibold tracking-[-0.03em] text-balance">
              {leadership[1].summary}
            </p>
          </Reveal>
          <ul className="mt-10 space-y-4">
            {(leadership[1].detail ?? []).map((d, i) => (
              <Reveal as="li" key={i} delay={i * 0.06} y={18}>
                <span className="block max-w-[66ch] border-l border-paper/20 pl-5 text-[0.9375rem] leading-relaxed opacity-70">
                  {d}
                </span>
              </Reveal>
            ))}
          </ul>
        </div>

        <div className="col-span-12 lg:col-span-4 lg:col-start-9">
          <ul className="grid grid-cols-2 gap-px bg-paper/15">
            {(leadership[1].figures ?? []).map((f, i) => (
              <motion.li
                key={f.label}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={onceInView}
                transition={{ ...expo, delay: i * 0.06 }}
                className="bg-ink p-5"
              >
                <span className="tabular block text-[clamp(1.5rem,3.4vw,2.5rem)] leading-none font-semibold tracking-[-0.04em]">
                  <Counter to={f.value} prefix={f.prefix ?? ""} suffix={f.suffix ?? ""} />
                </span>
                <span className="mt-3 block font-mono text-[10px] leading-snug tracking-[0.12em] uppercase opacity-50">
                  {f.label}
                </span>
              </motion.li>
            ))}
          </ul>
        </div>
      </div>

      <ol className="relative mt-20 space-y-px bg-paper/15">
        {leadership.map((role) => (
          <li
            key={role.id}
            className="group flex flex-wrap items-baseline gap-x-6 gap-y-2 bg-ink py-5"
          >
            <span className="w-full font-mono text-[10px] tracking-[0.16em] uppercase opacity-40 sm:w-[9rem] sm:shrink-0">
              {role.start} &rarr; {role.end}
            </span>
            <span className="flex-1 text-[clamp(1rem,1.8vw,1.25rem)] leading-snug">
              {role.title}
              {role.current && (
                <span className="ml-3 align-middle font-mono text-[10px] tracking-[0.14em] uppercase opacity-45">
                  Current
                </span>
              )}
            </span>
            <span className="font-mono text-[10px] tracking-[0.14em] uppercase opacity-40 transition-opacity group-hover:opacity-80">
              {role.org}
            </span>
          </li>
        ))}
      </ol>

      <p className="relative mt-8 font-mono text-[10px] tracking-[0.14em] uppercase opacity-40">
        Also a member of {affiliations.join(", ")}
      </p>
    </section>
  );
}

/* ------------------------------------------------------------------------ coda */

function Coda() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end end"] });
  const scale = useTransform(scrollYProgress, [0, 1], [0.82, 1]);
  const tracking = useTransform(scrollYProgress, [0, 1], ["0.3em", "-0.03em"]);
  const opacity = useTransform(scrollYProgress, [0, 0.4], [0.2, 1]);

  return (
    <footer ref={ref} className="relative flex min-h-[110vh] flex-col justify-center overflow-hidden">
      <div className="gutter">
        <div className="mb-16 grid grid-cols-12 gap-x-8 gap-y-10 border-b border-paper/15 pb-16">
          <div className="col-span-12 md:col-span-4">
            <p className="font-mono text-[10px] tracking-[0.2em] uppercase opacity-40">
              Education
            </p>
            <p className="mt-4 text-[clamp(1.25rem,2.4vw,1.875rem)] leading-tight font-semibold tracking-[-0.02em]">
              {profile.education.school}
            </p>
            <ul className="mt-3 space-y-0.5 text-sm opacity-80">
              {profile.education.degrees.map((d) => (
                <li key={d.label}>
                  {d.label}
                  {d.note && <span className="opacity-50"> ({d.note})</span>}
                </li>
              ))}
            </ul>
            <p className="mt-2 font-mono text-[10px] tracking-[0.14em] uppercase opacity-40">
              GPA {profile.education.gpa} / Graduating {profile.education.graduation}
            </p>
            <p className="mt-6 font-mono text-[10px] leading-relaxed tracking-[0.12em] uppercase opacity-40">
              {affiliations.join(", ")}
            </p>
          </div>

          <div className="col-span-12 md:col-span-4">
            <p className="font-mono text-[10px] tracking-[0.2em] uppercase opacity-40">
              Selected coursework
            </p>
            <ul className="mt-4 space-y-2">
              {profile.education.coursework.map((c, i) => (
                <Reveal as="li" key={c.code} delay={i * 0.03} y={12}>
                  <span className="flex gap-3 border-t border-paper/15 pt-2 text-[0.875rem] leading-snug">
                    <span className="tabular w-[6rem] shrink-0 font-mono text-[10px] tracking-[0.08em] uppercase opacity-45">
                      {c.code}
                    </span>
                    <span className="opacity-80">
                      {c.title}
                      {c.note && <span className="block opacity-55">{c.note}</span>}
                    </span>
                  </span>
                </Reveal>
              ))}
            </ul>
          </div>

          <div className="col-span-12 md:col-span-3 md:col-start-10">
            <p className="font-mono text-[10px] tracking-[0.2em] uppercase opacity-40">
              In progress, {profile.education.inProgressTerm}
            </p>
            <ul className="mt-4 space-y-2">
              {profile.education.inProgress.map((c, i) => (
                <Reveal as="li" key={c.code} delay={i * 0.03} y={12}>
                  <span className="block border-t border-paper/15 pt-2 text-[0.875rem] leading-snug opacity-80">
                    {c.title}
                    <span className="tabular mt-0.5 block font-mono text-[10px] tracking-[0.08em] uppercase opacity-45">
                      {c.code}
                    </span>
                  </span>
                </Reveal>
              ))}
            </ul>
            <p className="mt-8 font-mono text-[10px] tracking-[0.14em] uppercase opacity-40">
              Available for 2027 full-time roles
            </p>
          </div>
        </div>

        <motion.a
          href={`mailto:${profile.email}`}
          style={{ scale, letterSpacing: tracking, opacity }}
          className="block origin-left text-[clamp(2.5rem,14vw,13rem)] leading-[0.82] font-semibold"
        >
          GET IN
          <br />
          TOUCH
        </motion.a>

        <div className="mt-16 flex flex-wrap items-baseline justify-between gap-6 border-t border-paper/15 pt-6 font-mono text-[10px] tracking-[0.14em] uppercase">
          <a href={`mailto:${profile.email}`} className="hover:opacity-60">
            {profile.email}
          </a>
          <span className="opacity-60">{profile.phone}</span>
          <a href={profile.github} target="_blank" rel="noreferrer" className="hover:opacity-60">
            github.com/{profile.githubHandle}
          </a>
          <a href={profile.resumeHref} className="hover:opacity-60">
            Resume, PDF
          </a>
          <span className="opacity-35">
            {meta.index} {meta.name}
          </span>
        </div>
      </div>
    </footer>
  );
}
