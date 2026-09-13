import type { Metadata, Viewport } from "next";
import { Inter_Tight, Instrument_Serif, JetBrains_Mono, Anton } from "next/font/google";
import "./globals.css";
import { profile } from "@/content";

const interTight = Inter_Tight({
  subsets: ["latin"],
  variable: "--font-inter-tight",
  display: "swap",
});

const instrumentSerif = Instrument_Serif({
  subsets: ["latin"],
  weight: "400",
  style: ["normal", "italic"],
  variable: "--font-instrument-serif",
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jetbrains-mono",
  display: "swap",
});

const anton = Anton({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-anton",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: `${profile.name} / ${profile.role}`,
    template: `%s / ${profile.name}`,
  },
  description: profile.tagline,
  metadataBase: new URL("https://bennettmcaulay.com"),
  openGraph: {
    title: `${profile.name} / ${profile.role}`,
    description: profile.tagline,
    type: "website",
  },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#ffffff" },
    { media: "(prefers-color-scheme: dark)", color: "#000000" },
  ],
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="en"
      className={`no-motion ${interTight.variable} ${instrumentSerif.variable} ${jetbrainsMono.variable} ${anton.variable}`}
    >
      <head>
        {/*
          Drop the no-motion class as early as possible, before first paint, so
          the staged entrance styles apply for anyone running JavaScript and the
          document still reads without it.
        */}
        <script
          dangerouslySetInnerHTML={{
            __html: `document.documentElement.classList.remove('no-motion')`,
          }}
        />
      </head>
      <body>{children}</body>
    </html>
  );
}
