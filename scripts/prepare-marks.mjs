/**
 * Turns logo files into monochrome alpha masks.
 *
 * Drop any logo into assets/logos (png, jpg, webp or svg, white background or
 * transparent, full color) and run `npm run marks`. Each one comes out as a PNG
 * in public/marks whose alpha channel carries the shape and whose colour
 * channels are pure white. The site uses them as CSS masks filled with
 * currentColor, so a mark picks up ink or paper from whichever variant is
 * rendering it and never introduces a third colour.
 *
 * White and near-white pixels become fully transparent, so the white plate
 * behind a logo disappears without any manual cutout.
 */
import { readdir, mkdir, writeFile } from "node:fs/promises";
import { join, parse } from "node:path";
import sharp from "sharp";

const IN = "assets/logos";
const OUT = "public/marks";
const MAX_EDGE = 1600;

/** Filenames are matched loosely so you do not have to rename anything. */
const ALIASES = [
  { key: "stanford", match: /stanford|cardinal|tree/i },
  { key: "san-jose", match: /san.?jos|sj26|sanjose/i },
  { key: "copper-sky", match: /copper|sky/i },
  { key: "princeton-beijing", match: /princeton|beijing|pagoda|pib/i },
];

const slug = (name) =>
  name
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");

const keyFor = (name) => ALIASES.find((a) => a.match.test(name))?.key ?? slug(name);

/**
 * Lift mid-tones so a mid-value brand colour (the crimson in a Stanford S, the
 * copper in Copper Sky) reads as solid shape rather than a half-transparent
 * ghost, while genuine near-white stays fully clear.
 */
const curve = (v) => {
  if (v <= 10) return 0;
  const n = (v - 10) / 245;
  return Math.round(255 * Math.pow(n, 0.62));
};

const LUT = Uint8Array.from({ length: 256 }, (_, i) => curve(i));


async function convert(file) {
  const src = join(IN, file);
  const key = keyFor(parse(file).name);

  const { data, info } = await sharp(src, { density: 400 })
    .resize({
      width: MAX_EDGE,
      height: MAX_EDGE,
      fit: "inside",
      withoutEnlargement: true,
    })
    /* Flatten first so an already-transparent logo and a white-plate logo both
       reduce to the same thing: dark shape on white. */
    .flatten({ background: "#ffffff" })
    .greyscale()
    /* greyscale() alone still emits three interleaved sRGB channels. Asking for
       the b-w colourspace is what actually makes the raw buffer one byte per
       pixel, which the alpha maths below depends on. */
    .toColourspace("b-w")
    .raw()
    .toBuffer({ resolveWithObject: true });

  const { width, height } = info;
  if (info.channels !== 1) {
    throw new Error(`expected a single channel, got ${info.channels}`);
  }

  /* Build RGBA by hand: white everywhere, shape carried entirely in alpha. */
  const rgba = Buffer.allocUnsafe(width * height * 4);
  for (let i = 0; i < width * height; i++) {
    const a = LUT[255 - data[i]];
    const o = i * 4;
    rgba[o] = 255;
    rgba[o + 1] = 255;
    rgba[o + 2] = 255;
    rgba[o + 3] = a;
  }

  /*
   * Crop to the shape so the mask fills its box predictably. sharp's trim
   * compares colour channels, and every colour channel here is white by
   * design, so the box has to come from the alpha channel directly.
   */
  const box = alphaBounds(rgba, width, height);
  if (!box) throw new Error("mask came out fully transparent, is the source all white?");

  const out = join(OUT, `${key}.png`);
  const buf = await sharp(rgba, { raw: { width, height, channels: 4 } })
    .extract(box)
    .png({ compressionLevel: 9 })
    .toBuffer({ resolveWithObject: true });

  await writeFile(out, buf.data);
  return { key, out, width: buf.info.width, height: buf.info.height };
}

/** Tightest box containing any non-transparent pixel, read off the alpha byte. */
function alphaBounds(rgba, width, height) {
  let top = -1;
  let left = width;
  let right = -1;
  let bottom = -1;
  for (let y = 0; y < height; y++) {
    for (let x = 0; x < width; x++) {
      if (rgba[(y * width + x) * 4 + 3] === 0) continue;
      if (top < 0) top = y;
      bottom = y;
      if (x < left) left = x;
      if (x > right) right = x;
    }
  }
  if (top < 0) return null;
  return { left, top, width: right - left + 1, height: bottom - top + 1 };
}

const main = async () => {
  await mkdir(OUT, { recursive: true });
  let files = [];
  try {
    files = (await readdir(IN)).filter((f) => /\.(png|jpe?g|webp|avif|svg)$/i.test(f));
  } catch {
    console.error(`No ${IN} directory. Create it and drop the logo files in.`);
    process.exit(1);
  }
  if (!files.length) {
    console.error(`No image files in ${IN}. Drop the logos in and run this again.`);
    process.exit(1);
  }

  const results = [];
  for (const f of files) {
    try {
      results.push(await convert(f));
    } catch (err) {
      console.error(`  failed  ${f}: ${err.message}`);
    }
  }

  console.log(`\nWrote ${results.length} mask${results.length === 1 ? "" : "s"} to ${OUT}:\n`);
  for (const r of results) {
    console.log(`  ${r.key.padEnd(20)} ${r.width}x${r.height}`);
  }
  /* The site only renders a mark whose file is really present, so record what
     this run produced. A mask image that fails to load is ignored by the
     browser, which would paint a solid block instead of a logo. */
  const keys = results.map((r) => r.key).sort();
  await writeFile(
    "src/content/marks.generated.ts",
    `/**\n * Written by \`npm run marks\`. Do not edit by hand.\n *\n * Lists which mask files actually exist in public/marks, so a brand mark is\n * only ever rendered when its PNG is really there. A CSS mask whose image\n * fails to load is ignored by the browser, which would paint the element as a\n * solid block, so this list is the guard against that.\n */\nexport const availableMarks: readonly string[] = [\n${keys
      .map((k) => `  "${k}",`)
      .join("\n")}\n];\n`,
  );

  const known = ["stanford", "san-jose", "copper-sky", "princeton-beijing"];
  const unplaced = keys.filter((k) => !known.includes(k));
  if (unplaced.length) {
    console.log(`Not yet placed in src/content/marks.ts: ${unplaced.join(", ")}`);
  }
  console.log("");
};

main();
