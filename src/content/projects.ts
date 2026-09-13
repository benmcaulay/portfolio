export type ProjectLink = {
  label: string;
  href: string;
  kind: "demo" | "source" | "writeup";
};

export type Project = {
  id: string;
  /** Display title. */
  title: string;
  /** Native-script or alternate title, rendered smaller where a variant wants it. */
  altTitle?: string;
  index: string;
  year: string;
  kicker: string;
  /** One sentence. Used in compact lists and as the card headline. */
  blurb: string;
  /** Two to four sentences. Used on the expanded views. */
  body: string[];
  /** Short, punchy facts. Rendered as a data sheet in the terminal variant. */
  facts: { k: string; v: string }[];
  stack: string[];
  links: ProjectLink[];
  /** true when the source repo is private and only a demo or writeup is linkable. */
  privateSource: boolean;
  /** Which procedural monochrome mark to draw for this project. */
  art: "provenance" | "globe" | "grid" | "silhouette" | "orchestrator" | "distribution";
  featured: boolean;
};

export const projects: Project[] = [
  {
    id: "verbatim",
    title: "Verbatim",
    index: "01",
    year: "2025",
    kicker: "Private legal template assistant",
    blurb:
      "Fills the blanks in a law firm's templates from its own case files, on one Mac in the office, and shows the exact sentence every value came from.",
    body: [
      "Verbatim reads a matter's case file, fills a firm-authored template, and carries a verbatim supporting quote plus document and page for every value it writes. Parsing, retrieval, and language-model inference all run on hardware the firm controls. The only network endpoint it touches is an Ollama runtime bound to localhost, so no protected health information or work product ever leaves the machine.",
      "The important behavior is the refusal. Anything that cannot be grounded in the case file comes back as NEEDS REVIEW rather than invented, and a grounding check throws away any filled value whose supporting quote is not actually present in the retrieved source. A plausible looking fabrication is worse than a blank.",
      "Real firm templates do not use template syntax. Lawyers mark blanks with underscores, bracket checkboxes, label-colon pairs, and all-caps sentinels. A deterministic detector normalizes those conventions at import, which took the shipped affidavit template from zero detected blanks to nineteen.",
    ],
    facts: [
      { k: "Discovery latency", v: "50% reduction" },
      { k: "Model size", v: "8B parameters, quantized" },
      { k: "Runtime", v: "Under two minutes" },
      { k: "Network egress", v: "None" },
      { k: "Inputs", v: "PDF, scanned PDF, DOCX, EML, XLSX" },
    ],
    stack: ["Ollama", "Tesseract", "Poppler", "TypeScript", "FastAPI", "SQL", "Supabase"],
    links: [
      { label: "Source (course version)", href: "https://github.com/benmcaulay/cs153project", kind: "source" },
    ],
    privateSource: true,
    art: "provenance",
    featured: true,
  },
  {
    id: "making-space",
    title: "Making Space",
    index: "02",
    year: "2026",
    kicker: "Digital closet with virtual try-on",
    blurb:
      "Own less of it, wear more of it. A personal closet that generates studio-grade ghost-mannequin photos and puts saved outfits on your own body.",
    body: [
      "Upload a clothing picture and get back the clean, centered, product-page image you would otherwise need a photographer and a light tent for. Upload a few photos of yourself and see a saved outfit on you. Background removal runs client-side and free; ghost-mannequin generation runs on Gemini, with footwear routed to a different model because Gemini will not obey the shoes-upright-at-45-degrees pose no matter where the instruction sits in the prompt.",
      "The other half is the Space ledger: what came in, what went out, and roughly how much hanging rail that freed. Four separate figures, never fused into a single score, because a score invites you to game it. The Rail view lays the closet out on a time-since-worn axis so the gaps are visible instead of implied.",
      "Product lookup goes through a search API rather than the model, since a model with no web access can name a garment but not price it, and a fabricated price silently corrupts the wishlist budget.",
    ],
    facts: [
      { k: "Try-on", v: "Outfit onto user photos" },
      { k: "Background removal", v: "Client-side, no API cost" },
      { k: "Ghost mannequin", v: "Gemini, with a footwear exception" },
      { k: "Ledger", v: "Four unfused figures" },
    ],
    stack: ["Next.js", "TypeScript", "Gemini", "fal", "SerpAPI", "Supabase"],
    links: [
      { label: "Live", href: "https://makingspace.vercel.app", kind: "demo" },
      { label: "Source", href: "https://github.com/benmcaulay/wardrobe", kind: "source" },
    ],
    privateSource: false,
    art: "grid",
    featured: true,
  },
  {
    id: "skylines",
    title: "Skylines",
    index: "03",
    year: "2026",
    kicker: "Every flight you have ever taken",
    blurb:
      "A spinning orthographic globe of great-circle arcs, 6,072 airports and 1,762 carriers inlined, with no build step at all.",
    body: [
      "A flight log in the spirit of OpenFlights, with the two things OpenFlights makes harder than they need to be. Adding an airline is one field: type any part of a name or an IATA code, your own carriers sort to the top, and if nothing matches the first option creates it inline. Round trips are one entry, with the return segment written automatically reversed.",
      "Per-airport stats, route and airline analysis, and great-circle arcs drawn on canvas. Accounts are optional. Signed out, everything lives in the browser; signed in, flights sync to Postgres and follow you between devices under row level security.",
      "Static HTML, no framework, no bundler. One index.html with the world geometry and the airport database inlined, and it deploys to Vercel as-is.",
    ],
    facts: [
      { k: "Airports", v: "6,072 inlined" },
      { k: "Carriers", v: "1,762 searchable" },
      { k: "Build step", v: "None" },
      { k: "Auth", v: "Optional, local-first" },
    ],
    stack: ["Canvas", "Static HTML", "Supabase", "Postgres", "RLS"],
    links: [
      { label: "Live", href: "https://skylines-indol.vercel.app", kind: "demo" },
      { label: "Source", href: "https://github.com/benmcaulay/Skylines", kind: "source" },
    ],
    privateSource: false,
    art: "globe",
    featured: true,
  },
  {
    id: "kexing",
    title: "Kexing",
    altTitle: "可行",
    index: "04",
    year: "2026",
    kicker: "Practical Chinese for travelers",
    blurb:
      "The Mandarin you actually need at a ticket window, built from three months of needing it and not having it.",
    body: [
      "Kexing teaches the language of getting somewhere: buying a high-speed rail ticket, asking what a dish contains, arguing politely about a fare. It came out of an intensive immersion summer in Beijing and travel across six provinces, where the gap between classroom Mandarin and counter Mandarin was obvious daily.",
      "Content is organized by situation rather than by textbook chapter, so a lesson maps onto a thing you are about to do in the next ten minutes.",
    ],
    facts: [
      { k: "Organizing principle", v: "Situation, not chapter" },
      { k: "Origin", v: "Princeton in Beijing, 2024" },
      { k: "Scope", v: "Travel and transit Mandarin" },
    ],
    stack: ["Next.js", "TypeScript", "Supabase"],
    links: [{ label: "Live", href: "https://kexing-olive.vercel.app", kind: "demo" }],
    privateSource: true,
    art: "grid",
    featured: true,
  },
  {
    id: "spotter-school",
    title: "Spotter School",
    index: "05",
    year: "2026",
    kicker: "Airliner identification from the ground",
    blurb:
      "Twenty-one aircraft types and twenty-eight liveries, taught the way a spotter actually reads a plane: fastest cue first, then nose, engines, wingtips, gear, tail, sound.",
    body: [
      "Every type entry lists the types it gets mistaken for and how to break the tie, including how to separate the stretch variants. The Identify tool takes what you can see and shrinks the candidate list in front of you, showing how many types would survive each answer. The quiz draws its distractors from declared look-alikes rather than at random, and explains the cue you should have caught.",
      "Every photograph is a real ground-perspective shot, hotlinked from Wikimedia Commons under a free license and credited to its photographer on the image itself. Images were harvested from categories that specifically hold taxiing and final-approach frames, then ranked for framing and resolution and spread across operators so a gallery is not eight aircraft in one livery.",
    ],
    facts: [
      { k: "Aircraft types", v: "21" },
      { k: "Liveries", v: "28 carriers" },
      { k: "Quiz", v: "10 real photographs per round" },
      { k: "Image licensing", v: "CC BY, CC BY-SA, CC0, PD" },
    ],
    stack: ["TypeScript", "Next.js", "Wikimedia Commons API"],
    links: [],
    privateSource: true,
    art: "silhouette",
    featured: true,
  },
  {
    id: "pentathlon",
    title: "Modern Pentathlon Smart Coach",
    index: "06",
    year: "2025",
    kicker: "Where should an athlete spend the next hour",
    blurb:
      "A five-discipline training allocator fit on Tokyo 2020 and Paris 2024 Olympic finals data, rebalancing itself as the athlete's numbers move.",
    body: [
      "Modern pentathlon scoring means an hour spent on fencing is an hour not spent on the laser run, and the right split is different for every athlete. The model uses maximum likelihood estimation and Monte Carlo simulation over two Olympic finals to estimate where marginal training time buys the most total score.",
      "Thompson sampling handles the part that static optimization cannot: as new performance data arrives, the recommendation rebalances rather than committing to the plan it made in January.",
    ],
    facts: [
      { k: "Data", v: "Tokyo 2020 and Paris 2024 finals" },
      { k: "Estimation", v: "Maximum likelihood" },
      { k: "Simulation", v: "Monte Carlo" },
      { k: "Allocation", v: "Thompson sampling" },
    ],
    stack: ["Python", "Pandas", "NumPy", "Stata"],
    links: [],
    privateSource: true,
    art: "distribution",
    featured: true,
  },
  {
    id: "startup-rig",
    title: "startup-rig",
    index: "07",
    year: "2026",
    kicker: "An always-on orchestrator for one founder's projects",
    blurb:
      "Polls every project for a heartbeat, asks a model what broke when one stops answering, then either redeploys it or escalates to a human.",
    body: [
      "Two jobs run on a schedule. Health checks hit each project's monitor URL and, on failure, ask Claude to diagnose before firing the deploy hook or escalating. Ideation generates and scores new ideas into a backlog. A read-mostly dashboard sits over the same Postgres database as a control room.",
      "Every change the coder authors lands as a proposal behind an approve, apply, push gate, and the orchestrator and dashboard run as separate processes in separate virtualenvs so neither can drag the other's dependencies in.",
    ],
    facts: [
      { k: "Scheduled jobs", v: "Health checks and ideation" },
      { k: "Human gate", v: "Approve, apply, push" },
      { k: "Isolation", v: "Two processes, two virtualenvs" },
      { k: "Store", v: "Postgres, five tables" },
    ],
    stack: ["Python", "Flask", "HTMX", "Postgres", "systemd", "Claude API"],
    links: [],
    privateSource: true,
    art: "orchestrator",
    featured: false,
  },
];

export const featuredProjects = projects.filter((p) => p.featured);
