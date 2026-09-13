import type { Metadata } from "next";
import TerminalPage from "@/variants/terminal/TerminalPage";
import { variantBySlug } from "@/content";

const meta = variantBySlug("terminal")!;

export const metadata: Metadata = {
  title: meta.name,
  description: meta.tagline,
};

export default function Page() {
  return <TerminalPage />;
}
