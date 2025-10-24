import type { Metadata } from "next";
import "../styles/tokens/smh-champagne-tokens.css";
import "../styles/tokens/smh-particles-drift.css";
import "../styles/fallback-textures.css";
import "./globals.css";
import "@/styles/particles-drift.css";
import "@/styles/champagne-particles.css";
import { Playfair_Display, Inter } from "next/font/google";
import { ThemeProvider } from "@/components/providers/theme-provider";
import { SimpleChatbot } from "@/components/ai/simple-chatbot";
import { JsonLd, organizationSchema } from "@/components/seo/json-ld";

const playfair = Playfair_Display({
  subsets: ["latin"],
  display: "swap",
  weight: ["400", "500", "700"],
  variable: "--font-serif",
});

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-sans",
});

export const metadata: Metadata = {
  title: "St Mary’s House Dental Care",
  description:
    "Luxury dental care with advanced 3D planning and patient-first experience.",
};

async function shouldExposeWebmMeta() {
  if (typeof window !== "undefined") {
    return false;
  }

  try {
    const fs = await import("node:fs");
    const path = await import("node:path");
    const candidates = [
      "/textures/particles-gold-animated.webm",
      "/textures/particles-magenta-animated.webm",
      "/textures/particles-teal-animated.webm",
    ];
    const base = process.cwd();
    return candidates.some((rel) => {
      const full = path.join(base, "public", rel.replace(/^\/+/, ""));
      try {
        const stats = fs.statSync(full);
        return stats.size > 2048;
      } catch {
        return false;
      }
    });
  } catch {
    return false;
  }
}

export default async function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const exposeWebmMeta = await shouldExposeWebmMeta();

  return (
    <html lang="en" className={`scroll-smooth ${playfair.variable} ${inter.variable}`}>
      <head>
        {/* Favicon & manifest */}
        <link rel="icon" href="/logos/flower-32.png" sizes="32x32" />
        <link rel="icon" href="/logos/flower-192.png" sizes="192x192" />
        <link rel="apple-touch-icon" href="/logos/flower-192.png" />
        <link rel="manifest" href="/manifest.json" />

        {/* Viewport (was missing / causing mobile issues) */}
        <meta name="viewport" content="width=device-width, initial-scale=1" />

        {/* Theme meta */}
        <meta name="theme-color" content="#C2185B" />
        <meta name="msapplication-TileColor" content="#C2185B" />
        <meta name="msapplication-config" content="/browserconfig.xml" />

        {/* Preloads */}
        <link rel="preload" as="image" href="/videos/hero/hero-poster.jpg" />
        {exposeWebmMeta ? <meta name="smh-has-webm" content="1" /> : null}
      </head>

      <body className="antialiased min-h-screen bg-background text-foreground">
        <JsonLd data={organizationSchema} />
        <ThemeProvider>
          {children}
          <SimpleChatbot />
        </ThemeProvider>
      </body>
    </html>
  );
}
