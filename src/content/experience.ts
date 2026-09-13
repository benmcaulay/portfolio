export type Role = {
  id: string;
  org: string;
  orgShort: string;
  title: string;
  place: string;
  start: string;
  end: string;
  /** Sort key, newest first. */
  year: string;
  /** One line for compact and kinetic treatments. */
  summary: string;
  bullets: string[];
  stack?: string[];
};

export const experience: Role[] = [
  {
    id: "copper-sky",
    org: "Copper Sky Capital",
    orgShort: "Copper Sky",
    title: "Intern",
    place: "San Diego, CA",
    start: "May 2026",
    end: "Present",
    year: "2026",
    summary:
      "Technical and financial diligence on nine inbound deals, plus the internal agents that made the firm's reporting run itself.",
    bullets: [
      "Led technical and financial diligence on 9 inbound deals, including a $12.5M raise at $40M pre-money, producing diligence memos, TAM models, and IC-ready materials that surfaced material risks such as unverified patents, revenue-engagement inversions, and inflated market-sizing assumptions across the portfolio.",
      "Designed and shipped an automated transcript ingestion pipeline (Power Automate, Zoom API) that polls on a two-hour cycle, discovering, deduplicating, and cleaning recordings across firm accounts, eliminating manual meeting documentation.",
      "Built a portfolio KPI and financial health agent whose human-approval review queue secured partner buy-in for write access; adopted firm-wide for monthly reporting across ARR, burn, cash, and retention.",
      "Piloted an email inbox triage agent across three partner accounts, and authored the firm's AI data-handling policy governing how confidential third-party information is handled across AI platforms.",
    ],
    stack: ["Power Automate", "Zoom API", "LLM agents", "Financial modeling"],
  },
  {
    id: "san-jose",
    org: "City of San José, Office of Digital Privacy",
    orgShort: "City of San José",
    title: "Cardinal Quarter Fellow",
    place: "San José, CA",
    start: "June 2026",
    end: "August 2026",
    year: "2026",
    summary:
      "Wrote a public-sector AI credential standard for 900+ agencies and audited the eviction-risk model behind a citywide outreach list.",
    bullets: [
      "Co-authored the Civic AI Professional (CAIP) credential framework, a two-tier assessment standard for public-sector AI use and development, for the GovAI Coalition's AI Training Working Group spanning 900+ member agencies across 7 countries.",
      "Audited an XGBoost and Random Forest eviction-risk prediction model for the Housing Department, separating intended design from actual implementation to narrow roughly 38,000 Rent Registry properties into a targeted outreach list.",
      "Evaluated the equity and effectiveness of city-deployed priority public safety sensing technology including camera and audio recorder networks, and helped the Office of Digital Privacy share AI and privacy best practices with peer jurisdictions.",
    ],
    stack: ["XGBoost", "Random Forest", "Model auditing", "Policy design"],
  },
  {
    id: "straus-meyers",
    org: "Straus Meyers LLP",
    orgShort: "Straus Meyers",
    title: "Product and AI Engineer",
    place: "San Diego, CA",
    start: "June 2025",
    end: "August 2025",
    year: "2025",
    summary:
      "First AI hire at the firm. Built an air-gapped NLP document pipeline so protected health information never left the building.",
    bullets: [
      "As the firm's first AI hire, developed an NLP document automation and due diligence tool to streamline litigation workflows, improving firm efficiency by 30% and accelerating evaluation of high-stakes legal assets.",
      "Built on a secure local-inference architecture using quantized models and an air-gapped vector store, keeping protected health information on firm hardware to ensure strict privacy compliance.",
      "Partnered directly with litigation teams to map workflows, identify bottlenecks, and co-develop tailored AI solutions for case preparation, discovery, and compliance tracking across insurer and hospital-system clients.",
    ],
    stack: ["Local inference", "Quantized models", "Vector search", "TypeScript"],
  },
  {
    id: "princeton-beijing",
    org: "Princeton in Beijing Program",
    orgShort: "Princeton in Beijing",
    title: "Language Immersion Student",
    place: "Beijing, China",
    start: "June 2024",
    end: "August 2024",
    year: "2024",
    summary:
      "Intensive Mandarin immersion: advanced coursework, field studies, and travel across six provinces.",
    bullets: [
      "Completed intensive Mandarin immersion program covering advanced coursework, field studies, and travel across six provinces.",
    ],
    stack: ["Mandarin"],
  },
];
