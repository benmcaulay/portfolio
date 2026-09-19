# Decisions

Durable memory for this repo: one short entry per non-obvious decision or
gotcha, append-only. **Read it before re-deriving why something is the way it
is**, and add to it when something costs real time.

Format is `**YYYY-MM-DD · area · One-line claim.**` followed by a short
paragraph. The one-line claim is the part that gets read, so make it a claim
and not a topic. graphify indexes this file alongside the code, and
`startup-rig`'s Memory page graphs every repo's copy together.

Seeded 2026-09-19 from facts already recorded elsewhere in the estate --
mostly in `startup-rig`'s own `DECISIONS.md`, its `config/projects.yaml`
comments, and its audit notes. It is deliberately short: entries here were all
paid for once. Nothing was invented to fill it out, because a file full of
decisions nobody made stops being read.

**2026-09-19 · monitoring · `portfolio.vercel.app` is NOT this site. It is a
stranger's.** That hostname returns HTTP 200 and serves someone else's Next.js
tutorial page, titled "Reo Katsumi Portfolio". It was once wired into
`startup-rig` as this project's `monitor_url` purely on the strength of a
rename plus a 200, and the health check passed happily against a site with no
connection to this repo. **A 200 proves something is there, not that it is
yours.** Verify page content before trusting any URL you inferred.

**2026-09-19 · deploy · The canonical domain this code declares,
`bennettmcaulay.com`, is not registered.** `metadataBase` in
`src/app/layout.tsx`, `base` in `src/app/sitemap.ts` and the sitemap URL in
`src/app/robots.ts` all point at it, and `whois` returns "No match for domain
BENNETTMCAULAY.COM" -- it does not resolve, so every canonical URL, the
sitemap and the OG metadata currently reference a host that does not exist.
Register it before deploying, or change the three constants; shipping as-is
means search engines are handed a dead canonical.

**2026-09-19 · deploy · Nothing is deployed anywhere findable.** No Vercel
project in either the team or the personal scope, no GitHub Pages, no
homepage field on the repo. `startup-rig` therefore carries a blank
`monitor_url` on purpose: blank means "skip the check", whereas a guessed URL
means a false green.

**2026-09-19 · naming · This is the live repo. `benmcaulay-portfolio` is
retired.** Confirmed by Ben on 2026-09-19. Note that `startup-rig` still
tracks this project under the stale key `benmcaulay-portfolio`, because 841
rows of history key off that name; the `git_remote` there is correct.

**2026-09-19 · history · This repo is unrelated to `benmcaulay-portfolio`;
it replaced it rather than being renamed from it.** They share no merge-base
-- 4 commits here against 33 there -- which is why the old remote returns
"Repository not found" instead of redirecting. Any tooling that assumed a
GitHub rename redirect was wrong about this pair.
