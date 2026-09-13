export const profile = {
  name: "Bennett McAulay",
  shortName: "Ben McAulay",
  initials: "BM",
  role: "Product and AI Engineer",
  tagline: "Economics and computer science at Stanford. I build AI systems that refuse to guess.",
  location: "San Diego, CA",
  email: "ooo@stanford.edu",
  phone: "(858) 888-3907",
  github: "https://github.com/benmcaulay",
  githubHandle: "benmcaulay",
  resumeHref: "/Bennett_McAulay_Resume.pdf",
  /** Long-form intro. Split into paragraphs so variants can stage them differently. */
  intro: [
    "I work where diligence meets engineering. At a venture fund I pull apart nine-figure claims and ship the internal tooling that makes the pulling apart repeatable. At a city privacy office I audited the model deciding which thirty-eight thousand properties get a knock on the door.",
    "The through line is provenance. Every system I build can show you where its answer came from, and say NEEDS REVIEW when it cannot.",
  ],
  /** One-line statements used for kinetic and marquee treatments. */
  manifesto: [
    "Provenance over confidence",
    "On-device over over-the-wire",
    "A blank beats a fabrication",
    "Ship the boring pipeline",
  ],
  education: {
    school: "Stanford University",
    place: "Palo Alto, CA",
    degrees: [
      { label: "B.S. Economics", note: "" },
      { label: "M.S. Computer Science", note: "Coterm" },
    ],
    gpa: "3.8",
    graduation: "June 2027",
    involvement: [
      "President, Stanford Club Water Polo",
      "Social Chair, Phi Kappa Psi",
      "Residential Student Leader and Treasurer for 107 first-year students",
      "Affiliated Stanford Entrepreneurial Students",
    ],
  },
  /** Scroll-driven counters. Each is verifiable from the resume. */
  metrics: [
    { value: 9, suffix: "", label: "inbound deals diligenced", context: "Copper Sky Capital" },
    { value: 12.5, prefix: "$", suffix: "M", label: "raise led on diligence", context: "at $40M pre-money" },
    { value: 900, suffix: "+", label: "member agencies reached", context: "GovAI Coalition framework" },
    { value: 38, suffix: "k", label: "properties narrowed", context: "San José Rent Registry audit" },
    { value: 50, suffix: "%", label: "discovery latency cut", context: "Verbatim, local 8B models" },
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
      ],
    },
    {
      group: "Analysis",
      items: [
        "SaaS metrics (LTV, CAC, churn)",
        "Financial modeling",
        "Statistical analysis",
        "Data modeling",
        "Strategic reporting",
      ],
    },
    {
      group: "Spoken",
      items: ["English (native)", "Mandarin (advanced)", "German (advanced)"],
    },
    {
      group: "Practice",
      items: [
        "Agile project management",
        "Cross-functional collaboration",
        "Stakeholder communication",
      ],
    },
  ],
} as const;

export type Profile = typeof profile;
