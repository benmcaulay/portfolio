import type { Metadata } from "next";
import KineticPage from "@/variants/kinetic/KineticPage";
import { variantBySlug } from "@/content";

const meta = variantBySlug("kinetic")!;

export const metadata: Metadata = {
  title: meta.name,
  description: meta.tagline,
};

export default function Page() {
  return <KineticPage />;
}
