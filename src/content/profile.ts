export const profile = {
  name: "Bennett McAulay",
  shortName: "Ben McAulay",
  initials: "BM",
  role: "Product and AI Engineer",
  tagline:
    "Economics and computer science at Stanford. I build AI systems that refuse to guess, and I write the policy that governs them.",
  location: "San Diego, CA",
  email: "ooo@stanford.edu",
  phone: "(858) 888-3907",
  github: "https://github.com/benmcaulay",
  githubHandle: "benmcaulay",
  resumeHref: "/Bennett_McAulay_Resume.pdf",
  /** Long-form intro. Split into paragraphs so variants can stage them differently. */
  intro: [
    "I work where diligence meets engineering. At a venture fund I pull apart nine-figure claims and ship the internal tooling that makes the pulling apart repeatable. At a city privacy office I audited the model deciding which thirty-eight thousand properties get a knock on the door, and found the production code did not match its own specification.",
    "The through line is provenance. Every system I build can show you where its answer came from, and say NEEDS REVIEW when it cannot. The same instinct shows up in policy work: I argued that a credential for deploying AI agents should make you deploy one, live, instead of answering multiple choice questions about it.",
  ],
  /** One-line statements used for kinetic and marquee treatments. */
  manifesto: [
    "Provenance over confidence",
    "On-device over over-the-wire",
    "A blank beats a fabrication",
    "Test the doing, not the describing",
    "Ship the boring pipeline",
  ],
  education: {
    school: "Stanford University",
    place: "Palo Alto, CA",
    degrees: [
      { label: "B.A. Economics", note: "" },
      { label: "M.S. Computer Science", note: "Coterm" },
    ],
    gpa: "3.8",
    graduation: "June 2027",
    /** Completed, and worth naming. */
    coursework: [
      { code: "ECON 149", title: "Management Economics", note: "Case-based seminar, 40-student cap, A+" },
      { code: "CS 124", title: "From Languages to Information", note: "Natural language processing" },
      { code: "CS 153", title: "Frontier Systems", note: "" },
      { code: "CS 109", title: "Probability for Computer Scientists", note: "" },
      { code: "ECON 131", title: "The Chinese Economy", note: "" },
      { code: "ECON 178", title: "Behavioral Economics", note: "" },
      { code: "ECON 102B", title: "Applied Econometrics", note: "" },
      { code: "CHINLANG 103", title: "Third-Year Modern Chinese", note: "" },
      { code: "CS 21SI", title: "AI for Social Good", note: "" },
      { code: "EMED 127", title: "Health Care Leadership", note: "" },
    ],
    /** Autumn 2026, in progress. */
    inProgress: [
      { code: "CS 224W", title: "Machine Learning with Graphs" },
      { code: "CS 329X", title: "Human Centered NLP" },
      { code: "CS 145", title: "Introduction to Big Data Systems" },
      { code: "CS 148", title: "Computer Graphics and Imaging" },
      { code: "ECON 170", title: "Globalization and Growth" },
    ],
    inProgressTerm: "Autumn 2026",
  },
  /** Scroll-driven counters for the work ledger. Each is on the record. */
  metrics: [
    { value: 30, suffix: "+", label: "inbound deals diligenced", context: "Copper Sky Capital" },
    { value: 500, prefix: "$", suffix: "K", label: "investment, technical diligence led", context: "and onboarded the firm as a client of the target" },
    { value: 900, suffix: "+", label: "member agencies reached", context: "GovAI Coalition credential framework" },
    { value: 38, suffix: "k", label: "properties narrowed to an outreach list", context: "San José Rent Registry audit" },
    { value: 50, suffix: "%", label: "discovery latency cut", context: "Verbatim, local inference" },
    { value: 30, suffix: "%", label: "firm efficiency gained", context: "Straus Meyers LLP" },
  ],
  skills: [
    {
      group: "Languages and runtimes",
      items: ["Python", "TypeScript", "SQL", "R", "Stata"],
    },
    {
      group: "ML and AI",
      items: [
        "PyTorch",
        "Scikit-learn",
        "Pandas / NumPy",
        "LLM integration",
        "Local inference and quantization",
        "Retrieval and grounding",
        "OCR pipelines",
        "Agent design and review gates",
      ],
    },
    {
      group: "Analysis",
      items: [
        "SaaS metrics (LTV, CAC, churn)",
        "Financial modeling",
        "Statistical analysis",
        "Model auditing",
        "Data modeling",
        "Strategic reporting",
      ],
    },
    {
      group: "Policy",
      items: [
        "AI governance frameworks",
        "Assessment and credential design",
        "Privacy and data handling policy",
        "Public-sector technology review",
      ],
    },
    {
      group: "Spoken",
      items: [
        "English (native)",
        "Mandarin (advanced speaking and reading)",
        "German (advanced speaking, reading, and writing)",
      ],
    },
  ],
} as const;

export type Profile = typeof profile;
