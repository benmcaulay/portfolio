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

**2026-09-19 · deploy · This project has no Vercel deployment to monitor.**
Its Vercel project is absent from both the team and the personal scope, so
`startup-rig` deliberately carries a blank `monitor_url` rather than a guess.
Blank means "skip the check"; a guessed URL means a false green.

**2026-09-19 · history · This repo is unrelated to the local
`benmcaulay-portfolio` clone.** They share no merge-base -- 4 commits here
against 33 there -- so despite the naming this is not a rename of it. See that
repo's own `DECISIONS.md`: its remote no longer exists.
