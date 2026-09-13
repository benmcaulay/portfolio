"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { AnimatePresence, motion } from "motion/react";
import { useEffect, useState } from "react";
import { variants } from "@/content";
import { expoFast, springTight } from "@/lib/motion";

/**
 * Persistent way out of whichever version you are looking at. Collapsed to a
 * single label until hovered or focused, so it never competes with the page.
 */
export default function VariantSwitcher({
  current,
  tone = "ink",
}: {
  current: string;
  tone?: "ink" | "paper";
}) {
  const [open, setOpen] = useState(false);
  const router = useRouter();
  const active = variants.find((v) => v.slug === current);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
      /* Number keys jump between versions. */
      const n = Number(e.key);
      if (n >= 1 && n <= variants.length && !e.metaKey && !e.ctrlKey) {
        const target = variants[n - 1];
        if (target.slug !== current) router.push(`/v/${target.slug}`);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [current, router]);

  const fg = tone === "ink" ? "text-paper" : "text-ink";
  const bg = tone === "ink" ? "bg-ink" : "bg-paper";
  const edge = tone === "ink" ? "border-paper/25" : "border-ink/20";

  return (
    <div
      className="fixed right-3 bottom-3 z-[70] sm:right-5 sm:bottom-5"
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}
    >
      <motion.div
        layout
        transition={springTight}
        className={`${bg} ${fg} ${edge} pointer-events-auto flex items-center gap-1 rounded-full border p-1 font-mono text-[10px] tracking-[0.14em] uppercase shadow-[0_2px_30px_rgba(0,0,0,0.25)] backdrop-blur`}
      >
        <AnimatePresence initial={false} mode="popLayout">
          {open ? (
            variants.map((v, i) => {
              const isCurrent = v.slug === current;
              return (
                <motion.div
                  key={v.slug}
                  layout
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ ...expoFast, delay: i * 0.03 }}
                >
                  <Link
                    href={`/v/${v.slug}`}
                    aria-current={isCurrent ? "page" : undefined}
                    className={`block rounded-full px-3 py-2 transition-opacity ${
                      isCurrent
                        ? tone === "ink"
                          ? "bg-paper text-ink"
                          : "bg-ink text-paper"
                        : "opacity-55 hover:opacity-100"
                    }`}
                  >
                    <span className="tabular">{v.index}</span>
                    <span className="ml-2 hidden sm:inline">{v.name}</span>
                  </Link>
                </motion.div>
              );
            })
          ) : (
            <motion.button
              key="closed"
              layout
              type="button"
              onFocus={() => setOpen(true)}
              onClick={() => setOpen(true)}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={expoFast}
              className="flex items-center gap-2 rounded-full px-4 py-2"
            >
              <span className="tabular opacity-55">{active?.index}</span>
              <span>{active?.name}</span>
              <span className="opacity-40">/ switch</span>
            </motion.button>
          )}
        </AnimatePresence>
        {open && (
          <motion.div layout initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
            <Link
              href="/"
              className="block rounded-full px-3 py-2 opacity-55 transition-opacity hover:opacity-100"
            >
              Index
            </Link>
          </motion.div>
        )}
      </motion.div>
    </div>
  );
}
