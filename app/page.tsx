import HeaderGlass from "@/components/layout/Header_Glass";
import HeroChampagne from "@/components/hero/Hero_Champagne";
import FooterGlow from "@/components/footer/Footer_Glow";
import { ChatProvider } from "@/contexts/ChatProvider";
import ChatDock from "@/components/chat/ChatDock";
import ChatOverlay from "@/components/chat/ChatOverlay";

const HERO_PROPS = {
  title: "Experience Luxury Dental Care by the Sea",
  lead: "Quiet luxury, 3D-first dentistry in West Sussex. From same-day veneers to digital twin smile simulations, we’re 'Going the Extra Smile'.",
  ctas: [
    { label: "Book Consultation", href: "/contact" },
    { label: "Watch Our Story", href: "#" },
  ],
};

export default function Home() {
  return (
    <ChatProvider>
      <div className="flex min-h-screen flex-col bg-[color:var(--smh-bg)] text-[color:var(--smh-text)]">
        <HeaderGlass />
        <main className="flex-1">
          <HeroChampagne {...HERO_PROPS} />
        </main>
        <FooterGlow />
        <ChatDock />
        <ChatOverlay />
      </div>
    </ChatProvider>
  );
}
