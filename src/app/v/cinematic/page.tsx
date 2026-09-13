import type { Metadata } from "next";
import CinematicPage from "@/variants/cinematic/CinematicPage";
import { variantBySlug } from "@/content";

const meta = variantBySlug("cinematic")!;

export const metadata: Metadata = {
  title: meta.name,
  description: meta.tagline,
};

export default function Page() {
  return <CinematicPage />;
}
