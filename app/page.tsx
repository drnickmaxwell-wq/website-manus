// app/page.tsx
import React from "react";
import { ChatProvider } from "@/contexts/ChatProvider";
import ChatDock from "@/components/chat/ChatDock";
import ChatOverlay from "@/components/chat/ChatOverlay";

import Hero_Champagne from "@/components/hero/Hero_Champagne";
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
      <Hero_Champagne
        title="Experience Luxury Dental Care by the Sea"
        lead="Quiet luxury, 3D-first dentistry in West Sussex. From same-day veneers to digital twin smile simulations, we’re ‘Going the Extra Smile’."
        ctas={[
          { label: "Book Consultation", href: "/contact" },
          { label: "Watch Our Story", href: "#" },
        ]}
      />

      <main className="relative z-10">

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
