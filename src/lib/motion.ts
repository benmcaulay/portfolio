import type { Transition } from "motion/react";

/** Long, heavy ease. The default for anything large moving into place. */
export const expo: Transition = {
  duration: 1.1,
  ease: [0.16, 1, 0.3, 1],
};

export const expoFast: Transition = {
  duration: 0.66,
  ease: [0.16, 1, 0.3, 1],
};

export const quint: Transition = {
  duration: 0.9,
  ease: [0.83, 0, 0.17, 1],
};

export const springSoft: Transition = {
  type: "spring",
  stiffness: 120,
  damping: 22,
  mass: 0.9,
};

export const springTight: Transition = {
  type: "spring",
  stiffness: 380,
  damping: 34,
  mass: 0.6,
};

/** Standard viewport trigger. Fires once, a little before the element lands. */
export const onceInView = { once: true, margin: "-12% 0px -12% 0px" } as const;
export const onceInViewLate = { once: true, margin: "-25% 0px -25% 0px" } as const;

/** Split a string into words, keeping the trailing space with each word. */
export const toWords = (s: string) => s.split(/(\s+)/).filter((t) => t.length > 0);

/** Split a string into characters, preserving spaces as non-breaking. */
export const toChars = (s: string) => Array.from(s);
