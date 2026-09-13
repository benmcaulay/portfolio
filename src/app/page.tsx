import type { Metadata } from "next";
import IndexPage from "@/variants/IndexPage";
import EditorialPage from "@/variants/editorial/EditorialPage";
import CinematicPage from "@/variants/cinematic/CinematicPage";
import KineticPage from "@/variants/kinetic/KineticPage";
import TerminalPage from "@/variants/terminal/TerminalPage";
import { frontDoor } from "@/content/site";
import { profile, variantBySlug } from "@/content";

const chosen = frontDoor === "index" ? null : variantBySlug(frontDoor);

export const metadata: Metadata = chosen
  ? { title: `${profile.name} / ${profile.role}`, description: profile.tagline }
  : {
      title: "Four versions",
      description:
        "Four scroll-driven versions of the same portfolio, in black and white. Pick one.",
    };

export default function Page() {
  switch (frontDoor) {
    case "editorial":
      return <EditorialPage />;
    case "cinematic":
      return <CinematicPage />;
    case "kinetic":
      return <KineticPage />;
    case "terminal":
      return <TerminalPage />;
    default:
      return <IndexPage />;
  }
}
