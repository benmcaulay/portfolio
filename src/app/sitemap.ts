import type { MetadataRoute } from "next";
import { variants } from "@/content";

const base = "https://bennettmcaulay.com";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { url: base, changeFrequency: "monthly", priority: 1 },
    ...variants.map((v) => ({
      url: `${base}/v/${v.slug}`,
      changeFrequency: "monthly" as const,
      priority: 0.8,
    })),
  ];
}
