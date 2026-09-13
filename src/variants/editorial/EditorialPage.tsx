"use client";

import { motion, useScroll, useTransform } from "motion/react";
import { useRef } from "react";
import { experience, featuredProjects, profile, variantBySlug } from "@/content";
import Reveal from "@/components/motion/Reveal";
import LineMask from "@/components/motion/LineMask";
import DrawRule from "@/components/motion/DrawRule";
import Counter from "@/components/motion/Counter";
import ScrollProgress from "@/components/motion/ScrollProgress";
import ProjectArt from "@/components/ProjectArt";
import SmoothScroll from "@/components/SmoothScroll";
import VariantSwitcher from "@/components/chrome/VariantSwitcher";
import { expo } from "@/lib/motion";

const meta = variantBySlug("editorial")!;

export default function EditorialPage() {
  return (
    <div className="grain min-h-screen bg-paper text-ink selection:bg-ink selection:text-paper">
      <SmoothScroll />
      <ScrollProgress className="bg-ink" height={2} />
      <RunningHead />
      <Masthead />
      <Statement />
      <Ledger />
      <Work />
      <Projects />
      <Apparatus />
      <Colophon />
      <VariantSwitcher current="editorial" tone="paper" />
    </div>
  );
}

/* ---------------------------------------------------------------- running head */

function RunningHead() {
  const { scrollYProgress } = useScroll();
  const opacity = useTransform(scrollYProgress, [0, 0.06, 0.1], [0, 0, 1]);
  const y = useTransform(scrollYProgress, [0.06, 0.1], [-12, 0]);

  return (
    <motion.header
      style={{ opacity, y }}
      className="fixed inset-x-0 top-0 z-40 border-b border-ink/15 bg-paper/85 backdrop-blur-md"
    >
      <div className="gutter flex items-baseline justify-between py-2.5 font-mono text-[10px] tracking-[0.16em] uppercase">
        <span>{profile.name}</span>
        <span className="hidden opacity-55 sm:block">{profile.role}</span>
        <span className="tabular opacity-55">
          {meta.index} / {meta.name}
        </span>
      </div>
    </motion.header>
  );
}

/* -------------------------------------------------------------------- masthead */

function Masthead() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "22%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.85], [1, 0]);
  const tracking = useTransform(scrollYProgress, [0, 1], ["-0.045em", "0.02em"]);

  return (
    <header ref={ref} className="gutter relative flex min-h-[100svh] flex-col justify-between pt-20 pb-10">
      <div className="grid grid-cols-12 gap-x-6 gap-y-8 pt-[8vh]">
        <div className="col-span-12 md:col-span-2">
          <Reveal delay={0.1}>
            <p className="font-mono text-[10px] leading-relaxed tracking-[0.16em] uppercase">
              <span className="tabular block opacity-45">Version {meta.index}</span>
              <span className="block">{meta.name}</span>
            </p>
          </Reveal>
        </div>

        <motion.div style={{ y, opacity }} className="col-span-12 md:col-span-10">
          <motion.h1
            style={{ letterSpacing: tracking }}
            className="optical hang font-display text-[clamp(3.25rem,23vw,20rem)]"
          >
            <LineMask lines={["Bennett", "McAulay"]} stagger={0.12} />
          </motion.h1>
        </motion.div>
      </div>

      <div className="grid grid-cols-12 items-end gap-x-6 gap-y-8">
        <div className="col-span-12 md:col-span-5 md:col-start-3">
          <DrawRule className="mb-4" delay={0.6} />
          <Reveal delay={0.75}>
            <p className="max-w-[46ch] text-lg leading-snug text-balance sm:text-xl">
              {profile.tagline}
            </p>
          </Reveal>
        </div>
        <div className="col-span-6 md:col-span-2 md:col-start-9">
          <DrawRule className="mb-4" delay={0.7} />
          <Reveal delay={0.85}>
            <dl className="space-y-1 font-mono text-[10px] tracking-[0.12em] uppercase">
              <Row k="Based" v={profile.location} />
              <Row k="Degree" v="B.S. Econ / M.S. CS" />
              <Row k="Class of" v={profile.education.graduation} />
            </dl>
          </Reveal>
        </div>
        <div className="col-span-6 md:col-span-2">
          <DrawRule className="mb-4" delay={0.8} />
          <Reveal delay={0.95}>
            <ul className="space-y-1 font-mono text-[10px] tracking-[0.12em] uppercase">
              <li>
                <a className="border-b border-ink/30 pb-px hover:border-ink" href={`mailto:${profile.email}`}>
                  Email
                </a>
              </li>
              <li>
                <a
                  className="border-b border-ink/30 pb-px hover:border-ink"
                  href={profile.github}
                  target="_blank"
                  rel="noreferrer"
                >
                  GitHub
                </a>
              </li>
              <li>
                <a className="border-b border-ink/30 pb-px hover:border-ink" href={profile.resumeHref}>
                  Resume, PDF
                </a>
              </li>
            </ul>
          </Reveal>
        </div>
      </div>
    </header>
  );
}

function Row({ k, v }: { k: string; v: string }) {
  return (
    <div className="flex items-baseline justify-between gap-3">
      <dt className="opacity-45">{k}</dt>
      <dd className="text-right">{v}</dd>
    </div>
  );
}

/* ------------------------------------------------------------------- statement */

function Statement() {
  return (
    <Section label="Statement" index="I">
      <div className="max-w-[62ch] space-y-7">
        {profile.intro.map((para, i) => (
          <Reveal key={i} delay={i * 0.08} y={20}>
            <p className="font-display text-[clamp(1.375rem,2.6vw,2.125rem)] leading-[1.28] text-pretty">
              {para}
            </p>
          </Reveal>
        ))}
      </div>
    </Section>
  );
}

/* ---------------------------------------------------------------------- ledger */

function Ledger() {
  return (
    <Section label="Ledger" index="II">
      <ul className="grid grid-cols-2 gap-x-8 gap-y-12 sm:grid-cols-3">
        {profile.metrics.map((m, i) => (
          <li key={m.label}>
            <DrawRule className="mb-5" delay={i * 0.05} duration={0.9} />
            <Reveal delay={0.1 + i * 0.05}>
              <p className="font-display text-[clamp(2.5rem,6vw,4.75rem)] leading-none">
                <Counter
                  to={m.value}
                  prefix={"prefix" in m ? (m.prefix as string) : ""}
                  suffix={m.suffix}
                />
              </p>
              <p className="mt-3 max-w-[22ch] text-sm leading-snug">{m.label}</p>
              <p className="mt-1 font-mono text-[10px] tracking-[0.12em] uppercase opacity-45">
                {m.context}
              </p>
            </Reveal>
          </li>
        ))}
      </ul>
    </Section>
  );
}

/* ------------------------------------------------------------------------ work */

function Work() {
  return (
    <Section label="Experience" index="III">
      <ol>
        {experience.map((role, i) => (
          <li key={role.id} className="group">
            <DrawRule className="mb-7" duration={1} />
            <div className="grid grid-cols-12 gap-x-6 gap-y-5 pb-14">
              <div className="col-span-12 sm:col-span-4">
                <Reveal delay={0.04}>
                  <p className="font-mono text-[10px] tracking-[0.14em] uppercase opacity-45">
                    <span className="tabular">{String(i + 1).padStart(2, "0")}</span>
                    <span className="mx-2">/</span>
                    {role.start} &rarr; {role.end}
                  </p>
                  <h3 className="mt-3 font-display text-[clamp(1.5rem,3.1vw,2.5rem)] leading-[1.05] text-balance">
                    {role.org}
                  </h3>
                  <p className="mt-2 text-sm">{role.title}</p>
                  <p className="font-mono text-[10px] tracking-[0.12em] uppercase opacity-45">
                    {role.place}
                  </p>
                </Reveal>
              </div>

              <div className="col-span-12 sm:col-span-7 sm:col-start-6">
                <Reveal delay={0.1}>
                  <p className="mb-6 max-w-[52ch] text-base leading-snug text-pretty sm:text-lg">
                    {role.summary}
                  </p>
                </Reveal>
                <ul className="space-y-4">
                  {role.bullets.map((b, bi) => (
                    <Reveal as="li" key={bi} delay={0.14 + bi * 0.05} y={16}>
                      <span className="flex gap-4">
                        <span className="tabular mt-[0.4em] shrink-0 font-mono text-[9px] opacity-35">
                          {String(bi + 1).padStart(2, "0")}
                        </span>
                        <span className="max-w-[64ch] text-[0.9375rem] leading-relaxed opacity-80">
                          {b}
                        </span>
                      </span>
                    </Reveal>
                  ))}
                </ul>
                {role.stack && (
                  <Reveal delay={0.3}>
                    <p className="mt-6 font-mono text-[10px] tracking-[0.12em] uppercase opacity-45">
                      {role.stack.join("  /  ")}
                    </p>
                  </Reveal>
                )}
              </div>
            </div>
          </li>
        ))}
      </ol>
    </Section>
  );
}

/* -------------------------------------------------------------------- projects */

function Projects() {
  return (
    <Section label="Selected work" index="IV">
      <ol className="space-y-24">
        {featuredProjects.map((p) => (
          <li key={p.id}>
            <DrawRule className="mb-8" duration={1.1} />
            <article className="grid grid-cols-12 gap-x-6 gap-y-10">
              <div className="col-span-12 lg:col-span-5">
                <Reveal>
                  <p className="tabular font-mono text-[10px] tracking-[0.16em] uppercase opacity-45">
                    {p.index} / {p.year}
                  </p>
                  <h3 className="mt-4 font-display text-[clamp(2rem,5vw,3.75rem)] leading-[0.98] text-balance">
                    {p.title}
                    {p.altTitle && (
                      <span className="ml-3 align-middle text-[0.4em] opacity-45">{p.altTitle}</span>
                    )}
                  </h3>
                  <p className="mt-3 font-mono text-[10px] tracking-[0.14em] uppercase opacity-55">
                    {p.kicker}
                  </p>
                </Reveal>

                <Reveal delay={0.08}>
                  <p className="mt-7 max-w-[44ch] text-lg leading-snug text-pretty">{p.blurb}</p>
                </Reveal>

                <Reveal delay={0.14}>
                  <dl className="mt-8 space-y-2 border-t border-ink/15 pt-5 font-mono text-[10px] tracking-[0.1em] uppercase">
                    {p.facts.map((f) => (
                      <div key={f.k} className="flex items-baseline justify-between gap-4">
                        <dt className="opacity-45">{f.k}</dt>
                        <dd className="text-right">{f.v}</dd>
                      </div>
                    ))}
                  </dl>
                </Reveal>

                <Reveal delay={0.2}>
                  <div className="mt-7 flex flex-wrap items-center gap-x-5 gap-y-2 font-mono text-[10px] tracking-[0.14em] uppercase">
                    {p.links.map((l) => (
                      <a
                        key={l.href}
                        href={l.href}
                        target="_blank"
                        rel="noreferrer"
                        className="group inline-flex items-center gap-1.5 border-b border-ink/35 pb-px transition-colors hover:border-ink"
                      >
                        {l.label}
                        <span className="inline-block transition-transform group-hover:translate-x-0.5">
                          &rarr;
                        </span>
                      </a>
                    ))}
                    {p.privateSource && (
                      <span className="opacity-40">
                        {p.links.length ? "Source private" : "Private repository"}
                      </span>
                    )}
                  </div>
                </Reveal>
              </div>

              <div className="col-span-12 lg:col-span-6 lg:col-start-7">
                <motion.div
                  initial={{ opacity: 0, scale: 0.97 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true, margin: "-10%" }}
                  transition={expo}
                  className="border border-ink/15 p-6 sm:p-10"
                >
                  <ProjectArt art={p.art} className="h-auto w-full" strokeWidth={1} />
                </motion.div>

                <div className="mt-8 space-y-5">
                  {p.body.map((para, bi) => (
                    <Reveal key={bi} delay={bi * 0.06} y={18}>
                      <p className="max-w-[68ch] text-[0.9375rem] leading-relaxed opacity-80">
                        {para}
                      </p>
                    </Reveal>
                  ))}
                </div>

                <Reveal delay={0.2}>
                  <p className="mt-7 font-mono text-[10px] tracking-[0.12em] uppercase opacity-45">
                    {p.stack.join("  /  ")}
                  </p>
                </Reveal>
              </div>
            </article>
          </li>
        ))}
      </ol>
    </Section>
  );
}

/* ------------------------------------------------------------------- apparatus */

function Apparatus() {
  return (
    <Section label="Apparatus" index="V">
      <div className="grid grid-cols-12 gap-x-6 gap-y-12">
        <div className="col-span-12 lg:col-span-7">
          <ul className="space-y-10">
            {profile.skills.map((g, i) => (
              <li key={g.group}>
                <DrawRule className="mb-4" delay={i * 0.04} duration={0.8} />
                <Reveal delay={0.06 + i * 0.04}>
                  <h3 className="font-mono text-[10px] tracking-[0.16em] uppercase opacity-45">
                    {g.group}
                  </h3>
                  <p className="mt-3 text-lg leading-snug text-pretty">
                    {g.items.join(", ")}
                  </p>
                </Reveal>
              </li>
            ))}
          </ul>
        </div>

        <div className="col-span-12 lg:col-span-4 lg:col-start-9">
          <DrawRule className="mb-4" duration={0.8} />
          <Reveal>
            <h3 className="font-mono text-[10px] tracking-[0.16em] uppercase opacity-45">
              Education
            </h3>
            <p className="mt-4 font-display text-[clamp(1.5rem,2.6vw,2.125rem)] leading-tight">
              {profile.education.school}
            </p>
            <ul className="mt-3 space-y-0.5 text-sm">
              {profile.education.degrees.map((d) => (
                <li key={d.label}>
                  {d.label}
                  {d.note && <span className="opacity-45"> ({d.note})</span>}
                </li>
              ))}
            </ul>
            <p className="mt-2 font-mono text-[10px] tracking-[0.12em] uppercase opacity-45">
              GPA {profile.education.gpa} / Graduating {profile.education.graduation}
            </p>
            <ul className="mt-8 space-y-2 border-t border-ink/15 pt-5 text-[0.875rem] leading-snug opacity-80">
              {profile.education.involvement.map((it) => (
                <Reveal as="li" key={it} y={14}>
                  {it}
                </Reveal>
              ))}
            </ul>
          </Reveal>
        </div>
      </div>
    </Section>
  );
}

/* -------------------------------------------------------------------- colophon */

function Colophon() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end end"] });
  const y = useTransform(scrollYProgress, [0, 1], ["18%", "0%"]);

  return (
    <footer ref={ref} className="gutter overflow-hidden border-t border-ink/15 pt-20 pb-10">
      <motion.div style={{ y }}>
        <p className="font-mono text-[10px] tracking-[0.16em] uppercase opacity-45">
          Available for 2027 full-time roles
        </p>
        <a
          href={`mailto:${profile.email}`}
          className="optical hang mt-6 block font-display text-[clamp(2.25rem,11vw,10rem)] leading-[0.9]"
        >
          <LineMask lines={["Say hello"]} />
        </a>
        <div className="mt-14 grid grid-cols-12 gap-y-6 border-t border-ink/15 pt-6 font-mono text-[10px] tracking-[0.12em] uppercase">
          <p className="col-span-12 sm:col-span-4">{profile.email}</p>
          <p className="col-span-6 sm:col-span-3">{profile.phone}</p>
          <p className="col-span-6 sm:col-span-2">
            <a href={profile.github} target="_blank" rel="noreferrer" className="hover:opacity-100">
              /{profile.githubHandle}
            </a>
          </p>
          <p className="col-span-12 opacity-45 sm:col-span-3 sm:text-right">
            {meta.index} {meta.name}. Set in Instrument Serif and Inter Tight.
          </p>
        </div>
      </motion.div>
    </footer>
  );
}

/* --------------------------------------------------------------------- section */

function Section({
  label,
  index,
  children,
}: {
  label: string;
  index: string;
  children: React.ReactNode;
}) {
  return (
    <section className="gutter border-t border-ink/15 py-24 sm:py-32">
      <div className="grid grid-cols-12 gap-x-6 gap-y-10">
        <div className="col-span-12 md:col-span-2">
          <div className="md:sticky md:top-24">
            <Reveal>
              <p className="font-mono text-[10px] leading-relaxed tracking-[0.16em] uppercase">
                <span className="tabular block opacity-40">{index}</span>
                <span className="block">{label}</span>
              </p>
            </Reveal>
          </div>
        </div>
        <div className="col-span-12 md:col-span-10">{children}</div>
      </div>
    </section>
  );
}
