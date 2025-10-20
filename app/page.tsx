import BrandHeroGradient from "@/components/brand/BrandHeroGradient";
import BrandButton from "@/components/brand/BrandButton";
import { ChatProvider } from "@/contexts/ChatProvider";
import ChatDock from "@/components/chat/ChatDock";
import ChatOverlay from "@/components/chat/ChatOverlay";
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
        <BrandHeroGradient className="smh-hero-gradient-bg">
          <h1 className="smh-heading text-3xl md:text-5xl mb-3">St Mary’s House Dental Care</h1>
          <p className="max-w-prose smh-text-dim mb-6">Quiet luxury, 3D-first dentistry in West Sussex.</p>
          <div className="flex gap-3">
            <BrandButton as="a" href="/contact">Book Consultation</BrandButton>
            <BrandButton as="a" href="/treatments">Explore Treatments</BrandButton>
          </div>
        </BrandHeroGradient>
        <Why3D />
        <Technology />
        <Gallery />
        <FinanceAndTools />
        <Reviews />
        <CtaRibbon />
        <Footer_Lux />
        {/* Temporary verification preview */}
        <section className="relative py-8">
          <div className="mx-auto w-full max-w-[var(--maxw,1200px)] px-6">
            <div className="rounded-xl overflow-hidden h-28 relative smh-hero-gradient-bg">
              <div aria-hidden className="absolute inset-0 smh-film-grain" />
              <div aria-hidden className="absolute inset-0 smh-particles-gold" />
            </div>
            <div className="mt-3 text-sm smh-text-dim">
              Gradient + grain + particles preview (remove later).
            </div>
          </div>
        </section>
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
        <ChatDock />
        <ChatOverlay />
      </main>
    </ChatProvider>
  );
}
