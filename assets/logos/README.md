# Logo sources

Drop the original logo files in here, then run:

```bash
npm run marks
```

Full color and a white background are both fine. Each file becomes a monochrome
alpha mask in `public/marks`, cropped to the shape, with white and near-white
turned fully transparent. The site fills those masks with `currentColor`, so a
mark inherits ink or paper from whichever variant renders it and the palette
stays at two tones.

Filenames are matched loosely, so no renaming needed. These four keys are
already placed in `src/content/marks.ts`:

| Key | Matches filenames containing |
| --- | --- |
| `stanford` | stanford, cardinal, tree |
| `san-jose` | san jose, sanjose, sj26 |
| `copper-sky` | copper, sky |
| `princeton-beijing` | princeton, beijing, pagoda, pib |

Anything else gets a key from its filename and needs a placement entry in
`src/content/marks.ts` before it will render.

This directory holds source art only. It is not served, and nothing here is
bundled.
