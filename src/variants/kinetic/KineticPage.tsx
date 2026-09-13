"use client";

import {
  motion,
  useMotionTemplate,
  useScroll,
  useSpring,
  useTransform,
  useVelocity,
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
import Marquee from "@/components/motion/Marquee";
import CharReveal from "@/components/motion/CharReveal";
import Counter from "@/components/motion/Counter";
import Reveal from "@/components/motion/Reveal";
import ProjectArt from "@/components/ProjectArt";
import BrandMark from "@/components/BrandMark";
import { expo, onceInView } from "@/lib/motion";

const meta = variantBySlug("kinetic")!;

export default function KineticPage() {
  return (
    <div className="bg-paper text-ink">
      <SmoothScroll />
      <Wordmark />
      <Belt text={profile.manifesto} />
      <Statement />
      <NumbersBand />
      <Wordmarks />
      <RolesBand />
      <LeadershipBand />
      <SkillsBand />
      <Sendoff />
      <VariantSwitcher current="kinetic" tone="paper" />
    </div>
  );
}

/* -------------------------------------------------------------------- wordmark */

/** The name, set edge to edge, skewing under scroll acceleration. */
function Wordmark() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollY, scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });
  const velocity = useVelocity(scrollY);
  const smoothV = useSpring(velocity, { stiffness: 300, damping: 50 });
  const skew = useTransform(smoothV, [-2500, 0, 2500], [-7, 0, 7], { clamp: true });
  const stretch = useTransform(smoothV, [-2500, 0, 2500], [1.06, 1, 0.94], { clamp: true });
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "-34%"]);

  return (
    <header ref={ref} className="relative h-[130vh]">
      <div className="sticky top-0 flex h-screen flex-col justify-between overflow-hidden pt-6 pb-8">
        <div className="gutter flex items-start justify-between font-mono text-[10px] tracking-[0.18em] uppercase">
          <p className="max-w-[26ch] leading-relaxed">
            {profile.role}
            <br />
            <span className="opacity-45">{profile.location}</span>
          </p>
          <p className="tabular text-right leading-relaxed opacity-45">
            {meta.index} / {meta.name}
            <br />
            {profile.education.graduation}
          </p>
        </div>

        <motion.div style={{ y }} className="w-full">
          <motion.h1
            style={{ skewY: skew, scaleY: stretch }}
            className="w-full px-[0.5vw] text-center font-kinetic text-[25.5vw] leading-[0.8] tracking-[-0.02em] uppercase"
          >
            <span className="block">
              <CharReveal text="BENNETT" stagger={0.035} mode="rise" />
            </span>
            <span className="block">
              <CharReveal text="MCAULAY" stagger={0.035} mode="rise" delay={0.22} />
            </span>
          </motion.h1>
        </motion.div>

        <div className="gutter flex items-end justify-between font-mono text-[10px] tracking-[0.18em] uppercase">
          <p className="max-w-[34ch] leading-relaxed">{profile.tagline}</p>
          <p className="hidden opacity-40 md:block">Keep scrolling</p>
        </div>
      </div>
    </header>
  );
}

/* ----------------------------------------------------------------------- belts */

function Belt({
  text,
  tone = "paper",
  velocity = -55,
}: {
  text: readonly string[];
  tone?: "paper" | "ink";
  velocity?: number;
}) {
  const dark = tone === "ink";
  return (
    <div
      className={`border-y py-4 ${
        dark ? "on-ink border-paper/20 bg-ink text-paper" : "border-ink/20 bg-paper text-ink"
      }`}
    >
      <Marquee baseVelocity={velocity} scrollFactor={5} repeat={3}>
        {text.map((t, i) => (
          <span key={i} className="flex items-center">
            <span className="px-6 font-kinetic text-[clamp(1.75rem,4.4vw,3.5rem)] leading-none tracking-[0.01em] whitespace-nowrap uppercase">
              {t}
            </span>
            <span className="text-lg opacity-35">&#9679;</span>
          </span>
        ))}
      </Marquee>
    </div>
  );
}

/* ------------------------------------------------------------------- statement */

function Statement() {
  return (
    <section className="gutter py-[16vh]">
      <div className="mx-auto max-w-6xl">
        {profile.intro.map((para, i) => (
          <p
            key={i}
            className="mb-10 font-kinetic text-[clamp(1.5rem,4.6vw,3.75rem)] leading-[1.02] tracking-[-0.01em] uppercase"
          >
            <WordRise text={para} />
          </p>
        ))}
      </div>
    </section>
  );
}

/** Word-level rise. Readable at paragraph length where per-character is not. */
function WordRise({ text }: { text: string }) {
  const words = text.split(" ");
  return (
    <>
      {words.map((w, i) => (
        <span key={i} className="inline-block overflow-hidden align-bottom">
          <motion.span
            className="inline-block"
            initial={{ y: "108%" }}
            whileInView={{ y: "0%" }}
            viewport={onceInView}
            transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1], delay: i * 0.013 }}
          >
            {w}
            {i < words.length - 1 ? " " : ""}
          </motion.span>
        </span>
      ))}
    </>
  );
}

/* --------------------------------------------------------------- numbers band */

/** Inverts to black. The seam between polarities is the section break. */
function NumbersBand() {
  return (
    <section className="on-ink bg-ink py-[14vh] text-paper">
      <div className="gutter">
        <p className="mb-16 font-mono text-[10px] tracking-[0.2em] uppercase opacity-45">
          Receipts
        </p>
        <ul>
          {profile.metrics.map((m, i) => (
            <li key={m.label} className="border-t border-paper/20 last:border-b">
              <motion.div
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={onceInView}
                transition={{ ...expo, delay: i * 0.05 }}
                className="group flex flex-wrap items-baseline gap-x-8 gap-y-2 py-6"
              >
                <span className="tabular w-[5.5ch] shrink-0 font-kinetic text-[clamp(2.5rem,7vw,5.5rem)] leading-[0.86]">
                  <Counter
                    to={m.value}
                    prefix={"prefix" in m ? (m.prefix as string) : ""}
                    suffix={m.suffix}
                  />
                </span>
                <span className="flex-1 font-kinetic text-[clamp(1.125rem,2.6vw,2rem)] leading-tight uppercase">
                  {m.label}
                </span>
                <span className="font-mono text-[10px] tracking-[0.14em] uppercase opacity-45 transition-opacity group-hover:opacity-90">
                  {m.context}
                </span>
              </motion.div>
            </li>
          ))}
        </ul>
      </div>
      <div className="mt-[12vh]">
        <Belt
          text={["Selected work", "Selected work", "Selected work"]}
          tone="ink"
          velocity={70}
        />
      </div>
    </section>
  );
}

/* -------------------------------------------------------- projects as wordmarks */

function Wordmarks() {
  return (
    <section className="on-ink bg-ink pb-[10vh] text-paper">
      <ol>
        {featuredProjects.map((p, i) => (
          <li key={p.id}>
            <ProjectWordmark project={p} flip={i % 2 === 1} />
          </li>
        ))}
      </ol>
    </section>
  );
}

function ProjectWordmark({
  project,
  flip,
}: {
  project: (typeof featuredProjects)[number];
  flip: boolean;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  /* The title sweeps across as you pass it, so it reads like a belt of its own. */
  const x = useTransform(scrollYProgress, [0, 1], flip ? ["8%", "-8%"] : ["-8%", "8%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.25, 0.75, 1], [0.25, 1, 1, 0.25]);

  /*
   * Set to fit. Anton runs about 0.46em per uppercase character, so dividing the
   * line box by the title length keeps a long name like Modern Pentathlon Smart
   * Coach on one readable line instead of several viewports wide.
   */
  const fit = `min(13.5vw, ${Math.round(1800 / Math.max(project.title.length, 1)) / 10}vw)`;

  return (
    <article ref={ref} className="overflow-x-clip border-t border-paper/20 py-[8vh]">
      <motion.h3
        style={{ x, opacity, fontSize: fit }}
        className="whitespace-nowrap font-kinetic leading-[0.82] uppercase"
      >
        {project.title}
        {project.altTitle && (
          <span className="ml-[0.15em] align-super text-[0.22em] opacity-45">
            {project.altTitle}
          </span>
        )}
      </motion.h3>

      <div className="gutter mt-8 grid grid-cols-12 gap-x-8 gap-y-8">
        <div className="col-span-12 md:col-span-3">
          <p className="tabular font-mono text-[10px] tracking-[0.18em] uppercase opacity-45">
            {project.index} / {project.year}
          </p>
          <p className="mt-3 font-mono text-[10px] tracking-[0.14em] uppercase">
            {project.kicker}
          </p>
          <div className="mt-6 flex flex-col gap-2 font-mono text-[10px] tracking-[0.16em] uppercase">
            {project.links.map((l) => (
              <a
                key={l.href}
                href={l.href}
                target="_blank"
                rel="noreferrer"
                className="group inline-flex w-fit items-center gap-1.5 border-b border-paper/40 pb-px hover:border-paper"
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
        </div>

        <div className="col-span-12 md:col-span-5">
          <p className="text-[clamp(1.0625rem,1.9vw,1.375rem)] leading-snug text-pretty">
            {project.blurb}
          </p>
          <p className="mt-6 max-w-[62ch] text-[0.9375rem] leading-relaxed opacity-65">
            {project.body[0]}
          </p>
          <p className="mt-6 font-mono text-[10px] tracking-[0.12em] uppercase opacity-45">
            {project.stack.join("  /  ")}
          </p>
        </div>

        <div className="col-span-12 md:col-span-3 md:col-start-10">
          <div className="border border-paper/20 p-5">
            <ProjectArt art={project.art} className="h-auto w-full" />
          </div>
        </div>
      </div>
    </article>
  );
}

/* ------------------------------------------------------------------ roles band */

function RolesBand() {
  return (
    <section className="bg-paper py-[14vh] text-ink">
      <div className="gutter mb-14 flex items-baseline justify-between font-mono text-[10px] tracking-[0.2em] uppercase">
        <p>Where I have worked</p>
        <p className="tabular opacity-45">{String(experience.length).padStart(2, "0")} posts</p>
      </div>
      <ol>
        {experience.map((role, i) => (
          <li key={role.id}>
            <RoleRow role={role} index={i} />
          </li>
        ))}
      </ol>
    </section>
  );
}

function RoleRow({ role, index }: { role: (typeof experience)[number]; index: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const fill = useTransform(scrollYProgress, [0.15, 0.5], ["0%", "100%"]);
  const width = useMotionTemplate`${fill}`;

  return (
    <div ref={ref} className="group relative overflow-hidden border-t border-ink/20 last:border-b">
      {/* A wipe that paints the row as it arrives, then holds. */}
      <motion.span
        aria-hidden
        style={{ width }}
        className="absolute inset-y-0 left-0 bg-ink"
      />
      <div className="gutter relative grid grid-cols-12 items-baseline gap-x-8 gap-y-4 py-8 text-paper mix-blend-difference">
        <p className="tabular col-span-3 font-mono text-[10px] tracking-[0.16em] uppercase md:col-span-1">
          {String(index + 1).padStart(2, "0")}
        </p>
        <h3 className="col-span-9 font-kinetic text-[clamp(1.5rem,5vw,4rem)] leading-[0.9] uppercase md:col-span-6">
          {role.orgShort}
        </h3>
        <p className="col-span-12 font-mono text-[10px] tracking-[0.14em] uppercase md:col-span-2">
          {role.title}
        </p>
        <p className="col-span-12 font-mono text-[10px] tracking-[0.14em] uppercase md:col-span-3 md:text-right">
          {role.start} &rarr; {role.end}
        </p>
        <p className="col-span-12 max-w-[70ch] text-[0.9375rem] leading-relaxed md:col-span-9 md:col-start-2">
          {role.summary}
        </p>
      </div>
    </div>
  );
}

/* -------------------------------------------------------------- leadership band */

function LeadershipBand() {
  const lantana = leadership.find((r) => r.id === "lantana")!;

  return (
    <section className="on-ink relative overflow-hidden bg-ink py-[14vh] text-paper">
      <div className="gutter">
        <p className="mb-10 font-mono text-[10px] tracking-[0.2em] uppercase opacity-45">
          Leadership
        </p>
        <h2 className="max-w-[24ch] font-kinetic text-[clamp(1.75rem,5.4vw,4.25rem)] leading-[1] uppercase">
          <WordRise text={lantana.summary} />
        </h2>

        <ul className="mt-16 grid grid-cols-2 gap-x-8 gap-y-10 md:grid-cols-4">
          {(lantana.figures ?? []).map((f, i) => (
            <Reveal as="li" key={f.label} delay={i * 0.06} y={20}>
              <span className="block border-t border-paper/25 pt-4">
                <span className="tabular block font-kinetic text-[clamp(2.25rem,6vw,4.5rem)] leading-[0.86]">
                  <Counter to={f.value} prefix={f.prefix ?? ""} suffix={f.suffix ?? ""} />
                </span>
                <span className="mt-3 block font-mono text-[10px] leading-snug tracking-[0.12em] uppercase opacity-50">
                  {f.label}
                </span>
              </span>
            </Reveal>
          ))}
        </ul>
      </div>

      <div className="mt-[12vh]">
        <Belt
          text={leadership.map((r) => r.title)}
          tone="ink"
          velocity={-64}
        />
      </div>

      <ol className="gutter mt-[8vh]">
        {leadership.map((role, i) => (
          <li key={role.id} className="border-t border-paper/25 last:border-b">
            <Reveal delay={i * 0.03} y={14}>
              <div className="flex flex-wrap items-baseline gap-x-6 gap-y-1 py-5">
                <span className="tabular w-full font-mono text-[10px] tracking-[0.14em] uppercase opacity-45 sm:w-[9rem] sm:shrink-0">
                  {role.start} &rarr; {role.end}
                </span>
                <span className="flex-1 font-kinetic text-[clamp(1.125rem,2.6vw,1.875rem)] leading-tight uppercase">
                  {role.title}
                </span>
                <span className="font-mono text-[10px] tracking-[0.12em] uppercase opacity-45">
                  {role.current ? "Current" : role.org}
                </span>
              </div>
            </Reveal>
          </li>
        ))}
      </ol>
    </section>
  );
}

/* ----------------------------------------------------------------- skills band */

function SkillsBand() {
  const all = profile.skills.flatMap((g) => g.items);
  return (
    <section className="relative overflow-hidden bg-paper pb-[10vh]">
      <Belt text={all} velocity={-90} />
      <BrandMark mark="stanford" anchor="right" opacity={0.06} />
      <div className="gutter mt-[10vh] grid grid-cols-12 gap-x-8 gap-y-10">
        <div className="col-span-12 md:col-span-5">
          <p className="font-mono text-[10px] tracking-[0.2em] uppercase opacity-45">Education</p>
          <h3 className="mt-4 font-kinetic text-[clamp(2rem,6vw,4.5rem)] leading-[0.88] uppercase">
            {profile.education.school}
          </h3>
          <p className="mt-4 text-lg">
            {profile.education.degrees.map((d) => d.label).join(" and ")}
          </p>
          <p className="mt-1 font-mono text-[10px] tracking-[0.14em] uppercase opacity-45">
            GPA {profile.education.gpa} / Graduating {profile.education.graduation}
          </p>
        </div>
        <div className="col-span-12 md:col-span-3 md:col-start-7">
          <p className="font-mono text-[10px] tracking-[0.2em] uppercase opacity-45">
            Selected coursework
          </p>
          <ul className="mt-5 space-y-2.5">
            {profile.education.coursework.map((c, i) => (
              <Reveal as="li" key={c.code} delay={i * 0.04} y={14}>
                <span className="block border-t border-ink/15 pt-2.5 text-[0.9375rem] leading-snug">
                  {c.title}
                  <span className="tabular ml-2 font-mono text-[10px] tracking-[0.08em] uppercase opacity-45">
                    {c.code}
                  </span>
                  {c.note && (
                    <span className="block font-mono text-[10px] tracking-[0.08em] uppercase opacity-45">
                      {c.note}
                    </span>
                  )}
                </span>
              </Reveal>
            ))}
          </ul>
        </div>
        <div className="col-span-12 md:col-span-3 md:col-start-10">
          <p className="font-mono text-[10px] tracking-[0.2em] uppercase opacity-45">
            In progress, {profile.education.inProgressTerm}
          </p>
          <ul className="mt-5 space-y-2.5">
            {profile.education.inProgress.map((c, i) => (
              <Reveal as="li" key={c.code} delay={i * 0.04} y={14}>
                <span className="block border-t border-ink/15 pt-2.5 text-[0.9375rem] leading-snug">
                  {c.title}
                  <span className="tabular ml-2 font-mono text-[10px] tracking-[0.08em] uppercase opacity-45">
                    {c.code}
                  </span>
                </span>
              </Reveal>
            ))}
          </ul>
          <p className="mt-8 border-t border-ink/15 pt-3 font-mono text-[10px] leading-relaxed tracking-[0.1em] uppercase opacity-45">
            {affiliations.join(", ")}
          </p>
        </div>
      </div>
    </section>
  );
}

/* --------------------------------------------------------------------- sendoff */

function Sendoff() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end end"] });
  const scale = useTransform(scrollYProgress, [0, 1], [0.7, 1]);

  return (
    <footer ref={ref} className="on-ink overflow-hidden bg-ink pt-[12vh] pb-10 text-paper">
      <Belt text={["Hire me", "Email me", "Hire me", "Email me"]} tone="ink" velocity={110} />
      <motion.a
        href={`mailto:${profile.email}`}
        style={{ scale }}
        className="mt-[10vh] block origin-bottom overflow-x-clip px-[0.5vw] text-center font-kinetic text-[min(17vw,24rem)] leading-[0.8] uppercase"
      >
        <SkewLine>{profile.email.split("@")[0]}</SkewLine>
        <span className="block text-[0.34em] tracking-[0.1em] opacity-55">
          @{profile.email.split("@")[1]}
        </span>
      </motion.a>

      <div className="gutter mt-[10vh] flex flex-wrap items-baseline justify-between gap-6 border-t border-paper/20 pt-6 font-mono text-[10px] tracking-[0.14em] uppercase">
        <span>{profile.phone}</span>
        <a href={profile.github} target="_blank" rel="noreferrer" className="hover:opacity-60">
          github.com/{profile.githubHandle}
        </a>
        <a href={profile.resumeHref} className="hover:opacity-60">
          Resume, PDF
        </a>
        <span className="opacity-40">Set in Anton</span>
        <span className="opacity-40">
          {meta.index} {meta.name}
        </span>
      </div>
    </footer>
  );
}

function SkewLine({ children }: { children: React.ReactNode }) {
  const { scrollY } = useScroll();
  const v = useVelocity(scrollY);
  const smooth = useSpring(v, { stiffness: 280, damping: 48 });
  const skew = useTransform(smooth, [-2400, 0, 2400], [8, 0, -8], { clamp: true });
  return (
    <motion.span style={{ skewX: skew }} className="block">
      {children}
    </motion.span>
  );
}
