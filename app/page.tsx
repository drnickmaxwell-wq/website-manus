// app/page.tsx
import React from "react";
import { ChatProvider } from "@/contexts/ChatProvider";
import ChatDock from "@/components/chat/ChatDock";
import ChatOverlay from "@/components/chat/ChatOverlay";

import Hero_Champagne from "@/components/hero/Hero_Champagne";
import WaveHighlight from "@/components/brand/WaveHighlight";
import SignatureServices from "@/components/sections/SignatureServices";
import TechnologyByTheSea from "@/components/sections/TechnologyByTheSea";
import PatientStories from "@/components/sections/PatientStories";
import FeesAndPlans from "@/components/sections/FeesAndPlans";
import FAQsBand from "@/components/sections/FAQsBand";
import GoldCTARibbon from "@/components/sections/GoldCTARibbon";
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
        title="St Mary’s House Dental Care"
        lead="Quiet luxury. 3D-first dentistry by the sea — veneers, implants, and aligners with digital precision."
        ctas={[
          { label: "Book Consultation", href: "/contact" },
          { label: "Explore Treatments", href: "/treatments" },
        ]}
      />

      <main className="relative z-10">

        {/* Champagne wave CTA ribbon */}
        <WaveHighlight />

        {/* New Champagne sections */}
        <SignatureServices />
        <TechnologyByTheSea />
        <PatientStories />
        <FeesAndPlans />
        <FAQsBand />
        <GoldCTARibbon />

        {/* Existing sections */}
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
