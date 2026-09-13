export type LeadershipRole = {
  id: string;
  org: string;
  title: string;
  place?: string;
  start: string;
  end: string;
  /** One line. The claim, not the duty list. */
  summary: string;
  detail?: string[];
  /** Numbers attached to this role, rendered inline. */
  figures?: { value: number; prefix?: string; suffix?: string; label: string }[];
  /** Current, as of now. Variants can mark these. */
  current?: boolean;
};

export const leadership: LeadershipRole[] = [
  {
    id: "toussaint",
    org: "Stanford Residential Education",
    title: "Resident Student Leader, Toussaint Louverture House",
    place: "Palo Alto, CA",
    start: "2026",
    end: "2027",
    current: true,
    summary: "Newly appointed for the 2026 to 2027 academic year.",
  },
  {
    id: "lantana",
    org: "Stanford Residential Education",
    title: "Resident Assistant and Treasurer, Lantana House",
    place: "Palo Alto, CA",
    start: "September 2025",
    end: "2026",
    summary:
      "Ran the budget and programming for a 107-resident first-year house, and talked the University into letting that house put Malala Yousafzai on stage at Memorial Auditorium.",
    detail: [
      "Resident Assistant to 107 first-year students and Treasurer for the house, managing the residence budget and endowed fund requests.",
      "Originated and delivered a residence-hosted Malala Yousafzai lecture at Memorial Auditorium, securing $140,000 in Riddell Endowed Fund support for the residence's contribution and coordinating logistics across multiple University offices. The event sold out all 1,900 seats.",
      "The hard part was not the logistics. It was convincing University staff that a first-year residence could deliver an event at that scale, then running the cross-office coordination to prove it.",
    ],
    figures: [
      { value: 107, label: "first-year residents" },
      { value: 70, prefix: "$", suffix: "K", label: "residence budget" },
      { value: 140, prefix: "$", suffix: "K", label: "endowed fund secured" },
      { value: 1900, label: "seats, sold out" },
    ],
  },
  {
    id: "club-water-polo",
    org: "Stanford Club Water Polo",
    title: "President",
    place: "Palo Alto, CA",
    start: "2024",
    end: "2025",
    summary:
      "Roster, scheduling, travel, and budget for a student-run team in regional collegiate play. Third year on the team.",
  },
  {
    id: "poway-coach",
    org: "Poway Valley Water Polo",
    title: "Coach, 12U and 14U boys",
    place: "Poway, CA",
    start: "2020",
    end: "2024",
    summary:
      "Five seasons of youth water polo: running practices, developing players, managing game-day rotations.",
  },
  {
    id: "phi-kappa-psi",
    org: "Phi Kappa Psi",
    title: "Social Chair",
    place: "Palo Alto, CA",
    start: "2024",
    end: "2025",
    summary: "Planned and budgeted chapter social programming across the academic year.",
  },
  {
    id: "eagle-scout",
    org: "Boy Scouts of America",
    title: "Eagle Scout",
    start: "2016",
    end: "2023",
    summary:
      "Twelve years in Scouting, leading patrols of younger Scouts on extended backcountry expeditions.",
  },
  {
    id: "foundation-liaison",
    org: "High school Foundation board",
    title: "Student liaison",
    start: "2022",
    end: "2023",
    summary:
      "Sole student voice to a twelve-member board of school administrators, delivering weekly reports of action items and concerns gathered from the student body.",
  },
  {
    id: "hs-captain",
    org: "High school athletics",
    title: "Captain, swim and water polo",
    start: "2022",
    end: "2023",
    summary: "Captained both teams in senior year.",
  },
];

/** Affiliations that are membership rather than a role. */
export const affiliations = ["Affiliated Stanford Entrepreneurial Students (ASES)"];
