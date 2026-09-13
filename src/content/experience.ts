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
  /** Key into the brand mark registry, for the large background logo. */
  mark?: string;
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
    mark: "copper-sky",
    summary:
      "Technical and financial diligence on more than thirty inbound deals, plus the internal agents that made the firm's reporting run itself.",
    bullets: [
      "Led technical and financial diligence on 30+ inbound deals, producing diligence memos, TAM models, and IC-ready materials that surfaced material risks including unverified patents, revenue-engagement inversions, and inflated market-sizing assumptions.",
      "Led technical diligence on a $500K investment, and participated in onboarding the firm as a new client of the target's proprietary SaaS platform.",
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
    title: "Stanford in Government Fellow",
    place: "San José, CA",
    start: "July 2026",
    end: "August 2026",
    year: "2026",
    mark: "san-jose",
    summary:
      "Authored the first draft of a public-sector AI credential now under review by 900+ agencies, and found the eviction-risk model in production did not match its own specification.",
    bullets: [
      "Co-authored the Civic AI Professional (CAIP) credential framework, a two-tier assessment standard for public-sector AI use and development, now under review by the GovAI Coalition's AI Training Working Group, a body drawn from 900+ member agencies across seven countries.",
      "Drafted the credential's assessment design, graduated retake policy, and evaluator conflict-of-interest rules, and set the two-tier structure separating everyday AI use from AI tool building.",
      "Argued successfully for a performance-based exam over the standard multiple-choice format: certifying that someone can deploy an agent safely means watching them deploy one, live. The working group adopted it as a differentiator over the credential it replaced.",
      "Audited an XGBoost and Random Forest eviction-risk model covering roughly 38,000 Rent Registry properties for the Housing Department, identifying a discrepancy between the design specification and the production code and prompting a correction applied to all subsequent runs.",
      "Evaluated the equity and effectiveness of city-deployed public safety sensing technology, including camera and audio recorder networks, and helped the office share AI and privacy practices with peer jurisdictions.",
      "Built models supporting earthquake relief with disaster response coordinators from Colombia, and coordinated imagery acquisition inside the city's damage assessment effort.",
    ],
    stack: ["XGBoost", "Random Forest", "Model auditing", "Assessment design", "Policy drafting"],
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
      "First AI hire at the firm. Built Verbatim on an air-gapped local-inference stack so protected health information never left the building.",
    bullets: [
      "As the firm's first AI hire, built Verbatim, an NLP document automation and due diligence tool for litigation workflows, improving firm efficiency by 30% and accelerating evaluation of high-stakes legal assets.",
      "Ran the system on a secure local-inference architecture using quantized models, an air-gapped vector store, and OCR for scanned records, keeping protected health information on firm hardware.",
      "Partnered directly with litigation teams to map workflows, identify bottlenecks, and co-develop tailored AI solutions for case preparation, discovery, and compliance tracking across insurer and hospital-system clients.",
    ],
    stack: ["Local inference", "Quantized models", "Vector search", "OCR", "TypeScript"],
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
    mark: "princeton-beijing",
    summary:
      "Sixty days at Beijing Normal University under a pledge not to speak English, with travel across six provinces.",
    bullets: [
      "Completed a 60-day intensive Mandarin immersion program at Beijing Normal University under a pledge not to speak English, with advanced coursework, field studies, and travel across six provinces.",
    ],
    stack: ["Mandarin"],
  },
];
