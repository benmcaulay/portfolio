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

- `profile.ts` name, intro, the metric counters, skills, education, coursework
- `experience.ts` roles, with both a one-line summary and full bullets so
  different versions can pitch at different densities
- `leadership.ts` leadership roles, with their own inline figures
- `projects.ts` per project blurb, long body, a facts table, stack and links
- `variants.ts` the four design directions, used by the index page
- `marks.ts` placement for the large background logos
- `site.ts` which version answers `/`

Editing a number in `profile.ts` updates it in all four versions.

## Background logos

Employer and school marks run very large and very quiet behind the sections
they belong to. They are never used as images: each one is a PNG whose alpha
channel carries the shape, applied as a CSS mask over a `currentColor` fill, so
a mark inherits ink or paper from whichever version is rendering it and the
palette stays at two tones.

To add or replace one, drop the original file into `assets/logos` and run:

```bash
npm run marks
```

Colour and a white background are both fine. White and near-white become fully
transparent, mid-tone brand colours are lifted so they read as solid shape
rather than a half-transparent ghost, and each mask is cropped tight to its
artwork. See [`assets/logos/README.md`](assets/logos/README.md) for the
filename to key mapping.

Nothing renders until the mask file exists. `npm run marks` rewrites
`src/content/marks.generated.ts` with the list of masks actually present, and
`BrandMark` returns null for anything not on it, because a CSS mask whose image
fails to load is ignored by the browser and would paint a solid block.

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
- **Counters can never display a wrong number.** These are figures off a
  resume, so the count-up has two guards. The target renders until the
  animation reports progress, which covers no JavaScript and reduced motion and
  is also what gets server rendered. A timer then snaps to the target if the
  animation has not finished when it should have, which covers the stall case:
  `animate` emits its first value immediately and then depends on
  `requestAnimationFrame`, which a browser freezes outright in a background
  tab. Without the second guard a figure sticks on its first frame and reads
  81 where it should read 1,900.
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
