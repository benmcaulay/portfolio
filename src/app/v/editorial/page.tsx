import type { Metadata } from "next";
import EditorialPage from "@/variants/editorial/EditorialPage";
import { variantBySlug } from "@/content";

const meta = variantBySlug("editorial")!;

export const metadata: Metadata = {
  title: meta.name,
  description: meta.tagline,
};

export default function Page() {
  return <EditorialPage />;
}
