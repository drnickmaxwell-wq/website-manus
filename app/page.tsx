// app/page.tsx
import React from "react";
import { ChatProvider } from "@/contexts/ChatProvider";
import ChatDock from "@/components/chat/ChatDock";
import ChatOverlay from "@/components/chat/ChatOverlay";

import VideoHero from "@/components/sections/home/VideoHero";
import WaveHighlight from "@/components/brand/WaveHighlight";
import Why3D from "@/components/sections/home/Why3D";
import Technology from "@/components/sections/home/Technology";
import Gallery from "@/components/sections/home/Gallery";
import FinanceAndTools from "@/components/sections/home/FinanceAndTools";
import Reviews from "@/components/sections/home/Reviews";
import CtaRibbon from "@/components/sections/home/CtaRibbon";
import Footer_Lux from "@/components/layout/Footer_Lux";
import JsonLd from "@/lib/seo/JsonLd";

export default function Home() {
  return (
    <ChatProvider>
      <main>
        {/* Hero video with gradient fallback (component already in repo) */}
        <VideoHero />

        {/* Champagne wave CTA ribbon */}
        <WaveHighlight />

        <Why3D />
        <Technology />
        <Gallery />
        <FinanceAndTools />
        <Reviews />
        <CtaRibbon />
        <Footer_Lux />

        <JsonLd
          type="LocalBusiness"
          data={{
            name: "St Mary's House Dental Care",
            url: "https://smhdental.co.uk",
            telephone: "+44 1273 453109",
            address: {
              "@type": "PostalAddress",
              streetAddress: "St Mary's Road",
              addressLocality: "Shoreham-by-Sea",
              addressRegion: "West Sussex",
              postalCode: "BN43 5ZA",
              addressCountry: "GB",
            },
          }}
        />
      </main>

      {/* Overlay lives outside <main> so it can cover nav/footer */}
      <ChatDock />
      <ChatOverlay />
    </ChatProvider>
  );
}
