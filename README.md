# Portfolio

Four scroll-driven versions of the same portfolio, in black and white.

Everything reads from one content layer, so the copy, the numbers and the
project list stay in sync no matter which version ships. Pick a favorite, point
the front door at it, and the other three stay reachable.

## The versions

| Route | Name | Direction |
| --- | --- | --- |
| `/` | Index | Walks through all four, one full-height panel each, polarity alternating at every seam |
| `/v/editorial` | Swiss Editorial | Black on white. Instrument Serif masthead set to fill its measure, strict twelve column grid, hairlines that draw themselves, sticky section marks |
| `/v/cinematic` | Cinematic Scroll | White on black. A title that scales and tracks apart as it leaves, an iris that opens across the statement, and a pinned horizontal project stage |
| `/v/kinetic` | Kinetic Type | Inverts. Anton edge to edge, velocity-reactive marquees that reverse with your scroll, per-word reveals, project titles as sweeping wordmarks |
| `/v/terminal` | Terminal Brutalist | White on black. JetBrains Mono, a visible grid you can toggle with `G`, a boot sequence, live scroll readout, dense data-sheet project cards |

Inside any version, the switcher in the bottom right jumps between them, or
press `1` through `4`.

## Picking the front door

Set one value in [`src/content/site.ts`](src/content/site.ts):

```ts
export const frontDoor = "editorial";
```

`"index"` keeps the comparison page at `/`. Any variant slug promotes that
version to `/` while leaving all four at `/v/<slug>`.

## Content

All copy lives in `src/content` and nothing is hardcoded into a layout:

- `profile.ts` name, intro, the metric counters, skills, education
- `experience.ts` roles, with both a one-line summary and full bullets so
  different versions can pitch at different densities
- `projects.ts` per project blurb, long body, a facts table, stack and links
- `variants.ts` the four design directions, used by the index page
- `site.ts` which version answers `/`

Editing a number in `profile.ts` updates it in all four versions.

## Design constraints

Black, white, and the gray ramp between them. No accent color anywhere, which
means the typography and the scroll have to carry the whole thing.

A few decisions worth knowing about:

- **The grain overlay does not use `mix-blend-mode`.** A fixed full-viewport
  blended layer pulls the entire document into one compositing group, and on
  pages this tall that cost enough paint time to stall the main thread. A flat
  low-opacity overlay looks the same in a two-tone palette and composites free.
- **`overflow-x: clip` sits on `html`, not just `body`.** Several versions push
  belts and display type past the viewport edge on purpose. Clipping `body`
  alone leaves the root scrollable, which shows up as a sideways drag on touch.
- **Counters show their true value until the frame loop produces a frame.**
  These are figures off a resume. A tab loaded in the background, a throttled
  renderer or no JavaScript at all must not leave a wrong number on screen, so
  the target is what renders first and the count-up only takes over once it is
  actually running.
- **Entrance staging is behind a `no-motion` class** that a blocking inline
  script removes before first paint. Without JavaScript the page still reads as
  a document instead of a blank sheet, since anything staged at `opacity: 0` or
  pushed outside a clipping parent would otherwise never come back.
- **Project marks are drawn, not screenshotted.** Each project gets a
  stroke-only SVG in `currentColor`, so it inherits whichever polarity the
  version is running and stays inside the palette.

## Stack

Next.js 16 (App Router, static), React 19, Tailwind 4, Motion 13 for the
scroll-linked and viewport-triggered work, Lenis for smooth scroll. Lenis is
skipped entirely for anyone who asks for reduced motion, and every animation
has a reduced-motion path.

## Running it

```bash
npm install
npm run dev
```

```bash
npm run build
```

Deploys to Vercel as-is. Every route is statically prerendered.
