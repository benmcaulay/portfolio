"use client";

import {
  motion,
  useMotionValueEvent,
  useReducedMotion,
  useScroll,
  useTransform,
} from "motion/react";
import { useEffect, useRef, useState } from "react";
import { experience, featuredProjects, profile, variantBySlug } from "@/content";
import SmoothScroll from "@/components/SmoothScroll";
import VariantSwitcher from "@/components/chrome/VariantSwitcher";
import Counter from "@/components/motion/Counter";
import ProjectArt from "@/components/ProjectArt";
import { onceInView } from "@/lib/motion";

const meta = variantBySlug("terminal")!;

const SECTIONS = [
  { id: "boot", label: "boot" },
  { id: "whoami", label: "whoami" },
  { id: "metrics", label: "metrics" },
  { id: "work", label: "work" },
  { id: "projects", label: "projects" },
  { id: "stack", label: "stack" },
  { id: "contact", label: "contact" },
] as const;

export default function TerminalPage() {
  const [grid, setGrid] = useState(true);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key.toLowerCase() === "g" && !e.metaKey && !e.ctrlKey) setGrid((g) => !g);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  return (
    <div className="on-ink min-h-screen bg-ink font-mono text-paper">
      <SmoothScroll />
      {grid && <GridOverlay />}
      <Hud gridOn={grid} onToggleGrid={() => setGrid((g) => !g)} />
      <Boot />
      <Whoami />
      <Metrics />
      <Work />
      <Projects />
      <Stack />
      <Contact />
      <VariantSwitcher current="terminal" tone="ink" />
    </div>
  );
}

/* --------------------------------------------------------------- grid overlay */

function GridOverlay() {
  return (
    <div
      aria-hidden
      className="pointer-events-none fixed inset-0 z-[5] opacity-[0.07]"
      style={{
        backgroundImage:
          "repeating-linear-gradient(to right, #fff 0 1px, transparent 1px 6.25%), repeating-linear-gradient(to bottom, #fff 0 1px, transparent 1px 24px)",
      }}
    />
  );
}

/* ------------------------------------------------------------------------ hud */

function Hud({ gridOn, onToggleGrid }: { gridOn: boolean; onToggleGrid: () => void }) {
  const { scrollY, scrollYProgress } = useScroll();
  const [readout, setReadout] = useState({ y: 0, pct: 0 });
  const [section, setSection] = useState<string>("boot");
  const [vw, setVw] = useState(0);

  useMotionValueEvent(scrollY, "change", (v) => {
    setReadout((r) => ({ ...r, y: Math.round(v) }));
  });
  useMotionValueEvent(scrollYProgress, "change", (v) => {
    setReadout((r) => ({ ...r, pct: Math.round(v * 100) }));
  });

  useEffect(() => {
    const onResize = () => setVw(window.innerWidth);
    onResize();
    window.addEventListener("resize", onResize);

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (visible) setSection(visible.target.id);
      },
      { rootMargin: "-45% 0px -45% 0px", threshold: [0, 0.2, 0.6, 1] },
    );
    SECTIONS.forEach((s) => {
      const el = document.getElementById(s.id);
      if (el) observer.observe(el);
    });

    return () => {
      window.removeEventListener("resize", onResize);
      observer.disconnect();
    };
  }, []);

  return (
    <header className="fixed inset-x-0 top-0 z-40 border-b border-paper/25 bg-ink/92 backdrop-blur">
      <div className="gutter flex items-center justify-between gap-4 py-2 text-[10px] tracking-[0.08em] uppercase">
        <span className="whitespace-nowrap">
          <span className="opacity-45">user@</span>mcaulay
          <span className="opacity-45">:~/</span>
          {section}
        </span>

        <nav className="hidden items-center gap-4 md:flex">
          {SECTIONS.slice(1).map((s) => (
            <a
              key={s.id}
              href={`#${s.id}`}
              className={`transition-opacity ${
                section === s.id ? "opacity-100 underline underline-offset-4" : "opacity-45 hover:opacity-85"
              }`}
            >
              {s.label}
            </a>
          ))}
        </nav>

        <span className="tabular flex items-center gap-3 whitespace-nowrap">
          <span className="hidden opacity-45 sm:inline">{vw}px</span>
          <span className="opacity-45">y={String(readout.y).padStart(5, "0")}</span>
          <span>{String(readout.pct).padStart(3, "0")}%</span>
          <button
            type="button"
            onClick={onToggleGrid}
            className="border border-paper/35 px-1.5 py-0.5 hover:bg-paper hover:text-ink"
            aria-pressed={gridOn}
          >
            grid {gridOn ? "on" : "off"}
          </button>
        </span>
      </div>
      <motion.div
        aria-hidden
        style={{ scaleX: scrollYProgress }}
        className="h-px origin-left bg-paper"
      />
    </header>
  );
}

/* ----------------------------------------------------------------------- boot */

const BOOT_LINES = [
  "$ whoami",
  `> ${profile.name.toLowerCase().replace(" ", "_")}`,
  "$ cat ./role",
  `> ${profile.role}`,
  "$ cat ./thesis",
  "> provenance over confidence",
  "> a blank beats a fabrication",
  "$ ls ./projects | wc -l",
  `> ${String(featuredProjects.length).padStart(2, "0")}`,
  "$ ./portfolio --render",
];

function Boot() {
  const reduced = useReducedMotion();
  const [typed, setTyped] = useState(0);
  const shown = reduced ? BOOT_LINES.length : typed;

  useEffect(() => {
    if (reduced !== false) return;
    let i = 0;
    const tick = () => {
      i += 1;
      setTyped(i);
      if (i < BOOT_LINES.length) {
        timer = window.setTimeout(tick, 130 + Math.random() * 90);
      }
    };
    let timer = window.setTimeout(tick, 420);
    return () => window.clearTimeout(timer);
  }, [reduced]);

  return (
    <section
      id="boot"
      className="gutter relative flex min-h-[100svh] flex-col justify-between pt-16 pb-12"
    >
      <div className="pt-[8vh]">
        <pre className="text-[clamp(0.6875rem,1.5vw,0.9375rem)] leading-[1.9]">
          {BOOT_LINES.slice(0, shown).map((l, i) => (
            <div key={i} className={l.startsWith("$") ? "" : "opacity-60"}>
              {l}
            </div>
          ))}
          {shown < BOOT_LINES.length && (
            <span className="inline-block h-[1em] w-[0.55em] translate-y-[0.12em] animate-pulse bg-paper" />
          )}
        </pre>
      </div>

      <div>
        <h1 className="text-[clamp(2.25rem,9.5vw,9rem)] leading-[0.92] font-bold tracking-[-0.05em] uppercase">
          BENNETT
          <br />
          MCAULAY
        </h1>
        <AsciiRule className="mt-8" />
        <dl className="mt-6 grid grid-cols-2 gap-x-6 gap-y-3 text-[10px] tracking-[0.08em] uppercase sm:grid-cols-4">
          <Field k="location" v={profile.location} />
          <Field k="school" v="Stanford University" />
          <Field k="degrees" v="B.S. Econ / M.S. CS" />
          <Field k="available" v="June 2027" />
        </dl>
      </div>
    </section>
  );
}

function Field({ k, v }: { k: string; v: string }) {
  return (
    <div>
      <dt className="opacity-45">{k}</dt>
      <dd className="mt-1">{v}</dd>
    </div>
  );
}

/* ----------------------------------------------------------------- ascii rule */

/**
 * A rule made of characters, wiped in from the left. The mask lands on glyph
 * boundaries, so it reads as filling one character at a time without any
 * measuring.
 */
function AsciiRule({ className, char = "=" }: { className?: string; char?: string }) {
  return (
    <motion.div
      aria-hidden
      className={`overflow-hidden text-[10px] leading-none whitespace-nowrap opacity-45 ${className ?? ""}`}
      initial={{ clipPath: "inset(0 100% 0 0)" }}
      whileInView={{ clipPath: "inset(0 0% 0 0)" }}
      viewport={onceInView}
      transition={{ duration: 1.1, ease: [0.83, 0, 0.17, 1] }}
    >
      {char.repeat(600)}
    </motion.div>
  );
}

/* --------------------------------------------------------------------- whoami */

function Whoami() {
  return (
    <Block id="whoami" cmd="cat ./about.txt">
      <div className="grid grid-cols-12 gap-x-6 gap-y-8">
        <div className="col-span-12 lg:col-span-7">
          {profile.intro.map((p, i) => (
            <motion.p
              key={i}
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={onceInView}
              transition={{ duration: 0.7, delay: i * 0.12 }}
              className="mb-6 max-w-[74ch] text-[0.9375rem] leading-[1.85]"
            >
              {p}
            </motion.p>
          ))}
        </div>
        <div className="col-span-12 lg:col-span-4 lg:col-start-9">
          <p className="mb-3 text-[10px] tracking-[0.1em] uppercase opacity-45">./principles</p>
          <ul className="space-y-2 text-[0.8125rem]">
            {profile.manifesto.map((m, i) => (
              <motion.li
                key={m}
                initial={{ opacity: 0, x: -8 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={onceInView}
                transition={{ duration: 0.5, delay: i * 0.08 }}
                className="border-l border-paper/30 pl-3"
              >
                {m}
              </motion.li>
            ))}
          </ul>
        </div>
      </div>
    </Block>
  );
}

/* -------------------------------------------------------------------- metrics */

function Metrics() {
  return (
    <Block id="metrics" cmd="./report --metrics">
      <div className="grid grid-cols-2 gap-px bg-paper/25 md:grid-cols-3">
        {profile.metrics.map((m) => (
          <div key={m.label} className="bg-ink p-5">
            <p className="tabular text-[clamp(1.75rem,5vw,3.25rem)] leading-none font-bold tracking-[-0.04em]">
              <Counter
                to={m.value}
                prefix={"prefix" in m ? (m.prefix as string) : ""}
                suffix={m.suffix}
              />
            </p>
            <p className="mt-3 text-[0.75rem] leading-snug">{m.label}</p>
            <p className="mt-1 text-[10px] tracking-[0.06em] uppercase opacity-45">{m.context}</p>
          </div>
        ))}
      </div>
    </Block>
  );
}

/* ----------------------------------------------------------------------- work */

function Work() {
  return (
    <Block id="work" cmd="git log --author=mcaulay">
      <ol className="space-y-0">
        {experience.map((role, i) => (
          <li key={role.id} className="border-t border-paper/25 last:border-b">
            <div className="grid grid-cols-12 gap-x-6 gap-y-4 py-7">
              <div className="col-span-12 md:col-span-4">
                <p className="tabular text-[10px] tracking-[0.1em] uppercase opacity-45">
                  commit {String(i + 1).padStart(2, "0")} / {role.start} &rarr; {role.end}
                </p>
                <h3 className="mt-3 text-[clamp(1rem,2.2vw,1.5rem)] leading-tight font-bold uppercase">
                  {role.org}
                </h3>
                <p className="mt-2 text-[0.8125rem] opacity-75">{role.title}</p>
                <p className="text-[10px] tracking-[0.08em] uppercase opacity-45">{role.place}</p>
                {role.stack && (
                  <ul className="mt-4 flex flex-wrap gap-1.5">
                    {role.stack.map((s) => (
                      <li key={s} className="border border-paper/30 px-1.5 py-0.5 text-[10px]">
                        {s}
                      </li>
                    ))}
                  </ul>
                )}
              </div>
              <ul className="col-span-12 space-y-3 md:col-span-8">
                {role.bullets.map((b, bi) => (
                  <motion.li
                    key={bi}
                    initial={{ opacity: 0, x: -10 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={onceInView}
                    transition={{ duration: 0.55, delay: bi * 0.06 }}
                    className="flex gap-3 text-[0.8125rem] leading-[1.8]"
                  >
                    <span className="shrink-0 opacity-40">+</span>
                    <span className="max-w-[80ch] opacity-85">{b}</span>
                  </motion.li>
                ))}
              </ul>
            </div>
          </li>
        ))}
      </ol>
    </Block>
  );
}

/* ------------------------------------------------------------------- projects */

function Projects() {
  return (
    <Block id="projects" cmd="ls -la ./projects">
      <div className="grid grid-cols-1 gap-px bg-paper/25 lg:grid-cols-2">
        {featuredProjects.map((p) => (
          <ProjectSheet key={p.id} project={p} />
        ))}
      </div>
    </Block>
  );
}

function ProjectSheet({ project }: { project: (typeof featuredProjects)[number] }) {
  const [open, setOpen] = useState(false);

  return (
    <article className="flex flex-col bg-ink p-5">
      <header className="flex items-baseline justify-between gap-3">
        <p className="tabular text-[10px] tracking-[0.1em] uppercase opacity-45">
          {project.index} / {project.year}
        </p>
        <p className="text-[10px] tracking-[0.1em] uppercase opacity-45">
          {project.privateSource ? "private" : "public"}
        </p>
      </header>

      <h3 className="mt-3 text-[clamp(1.125rem,2.6vw,1.75rem)] leading-tight font-bold uppercase">
        {project.title}
        {project.altTitle && <span className="ml-2 text-[0.6em] opacity-45">{project.altTitle}</span>}
      </h3>
      <p className="mt-1 text-[10px] tracking-[0.08em] uppercase opacity-55">{project.kicker}</p>

      <div className="my-5 border border-paper/20 p-4">
        <ProjectArt art={project.art} className="h-auto w-full" />
      </div>

      <p className="text-[0.8125rem] leading-[1.8] opacity-85">{project.blurb}</p>

      <dl className="mt-5 text-[11px]">
        {project.facts.map((f) => (
          <div
            key={f.k}
            className="flex items-baseline justify-between gap-3 border-t border-paper/20 py-1.5"
          >
            <dt className="opacity-45">{f.k}</dt>
            <dd className="tabular text-right">{f.v}</dd>
          </div>
        ))}
      </dl>

      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        className="mt-5 w-fit border border-paper/35 px-2 py-1 text-[10px] tracking-[0.1em] uppercase hover:bg-paper hover:text-ink"
        aria-expanded={open}
      >
        {open ? "collapse" : "read more"}
      </button>

      <motion.div
        initial={false}
        animate={{ height: open ? "auto" : 0, opacity: open ? 1 : 0 }}
        transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
        className="overflow-hidden"
      >
        <div className="space-y-4 pt-5">
          {project.body.map((b, i) => (
            <p key={i} className="max-w-[78ch] text-[0.8125rem] leading-[1.85] opacity-75">
              {b}
            </p>
          ))}
        </div>
      </motion.div>

      <ul className="mt-5 flex flex-wrap gap-1.5">
        {project.stack.map((s) => (
          <li key={s} className="border border-paper/30 px-1.5 py-0.5 text-[10px]">
            {s}
          </li>
        ))}
      </ul>

      <div className="mt-auto flex flex-wrap gap-x-4 gap-y-2 pt-5 text-[10px] tracking-[0.1em] uppercase">
        {project.links.map((l) => (
          <a
            key={l.href}
            href={l.href}
            target="_blank"
            rel="noreferrer"
            className="underline underline-offset-4 hover:no-underline"
          >
            {l.label} &rarr;
          </a>
        ))}
        {project.privateSource && !project.links.length && (
          <span className="opacity-35">no public endpoint</span>
        )}
      </div>
    </article>
  );
}

/* ---------------------------------------------------------------------- stack */

function Stack() {
  return (
    <Block id="stack" cmd="cat ./stack.json">
      <div className="grid grid-cols-12 gap-x-6 gap-y-10">
        <div className="col-span-12 lg:col-span-7">
          <ul className="space-y-6">
            {profile.skills.map((g) => (
              <li key={g.group}>
                <p className="text-[10px] tracking-[0.1em] uppercase opacity-45">{g.group}</p>
                <ul className="mt-2 flex flex-wrap gap-1.5">
                  {g.items.map((item, i) => (
                    <motion.li
                      key={item}
                      initial={{ opacity: 0, y: 6 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={onceInView}
                      transition={{ duration: 0.4, delay: i * 0.025 }}
                      className="border border-paper/30 px-2 py-1 text-[11px]"
                    >
                      {item}
                    </motion.li>
                  ))}
                </ul>
              </li>
            ))}
          </ul>
        </div>
        <div className="col-span-12 lg:col-span-4 lg:col-start-9">
          <p className="text-[10px] tracking-[0.1em] uppercase opacity-45">./education</p>
          <p className="mt-3 text-lg font-bold uppercase">{profile.education.school}</p>
          <p className="text-[0.8125rem] opacity-75">
            {profile.education.degrees.map((d) => d.label).join(" / ")}
          </p>
          <p className="tabular mt-1 text-[10px] tracking-[0.08em] uppercase opacity-45">
            gpa {profile.education.gpa} / grad {profile.education.graduation}
          </p>
          <AsciiRule className="my-5" char="-" />
          <ul className="space-y-2 text-[0.8125rem] opacity-80">
            {profile.education.involvement.map((it) => (
              <li key={it} className="flex gap-2">
                <span className="opacity-40">*</span>
                <span>{it}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </Block>
  );
}

/* -------------------------------------------------------------------- contact */

function Contact() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end end"] });
  const chars = useTransform(scrollYProgress, [0, 0.8], [0, 1]);

  return (
    <footer id="contact" className="gutter pt-24 pb-16">
      <AsciiRule className="mb-10" char="#" />
      <p className="text-[10px] tracking-[0.1em] uppercase opacity-45">{'$ mail -s "hello"'}</p>
      <a
        href={`mailto:${profile.email}`}
        ref={ref as React.RefObject<HTMLAnchorElement>}
        className="mt-5 block text-[clamp(1.5rem,6.5vw,5.5rem)] leading-[0.95] font-bold tracking-[-0.04em] break-all hover:underline hover:underline-offset-[0.12em]"
      >
        {profile.email}
      </a>
      <motion.div
        aria-hidden
        style={{ scaleX: chars }}
        className="mt-6 h-px origin-left bg-paper opacity-45"
      />
      <dl className="mt-10 grid grid-cols-2 gap-x-6 gap-y-5 text-[10px] tracking-[0.08em] uppercase sm:grid-cols-4">
        <Field k="phone" v={profile.phone} />
        <Field k="github" v={`/${profile.githubHandle}`} />
        <Field k="resume" v="PDF, one page" />
        <Field k="status" v="open to 2027 roles" />
      </dl>
      <p className="mt-14 text-[10px] tracking-[0.08em] uppercase opacity-35">
        {meta.index} {meta.name}. Set in JetBrains Mono. Press G to toggle the grid, 1 to 4 to
        switch versions.
      </p>
    </footer>
  );
}

/* ---------------------------------------------------------------------- block */

function Block({
  id,
  cmd,
  children,
}: {
  id: string;
  cmd: string;
  children: React.ReactNode;
}) {
  return (
    <section id={id} className="gutter scroll-mt-16 border-t border-paper/25 py-16">
      <div className="mb-8 flex items-baseline gap-3">
        <span className="opacity-45">$</span>
        <h2 className="text-[0.8125rem] tracking-[0.06em]">{cmd}</h2>
      </div>
      {children}
    </section>
  );
}
