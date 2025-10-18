import Header_Glass from "@/components/layout/Header_Glass";
import Hero_Champagne from "@/components/hero/Hero_Champagne";
import Footer_Glow from "@/components/footer/Footer_Glow";
import { ChatProvider } from "@/app/contexts/ChatProvider";
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
        <Header_Glass />
        <Hero_Champagne {...HERO_PROPS} />
        <main className="flex-1">
          <section className="mx-auto flex w-full max-w-6xl items-center justify-center px-6 py-24 text-center text-[color:var(--smh-text-muted)]">
            <p>Additional Champagne modules will arrive here.</p>
          </section>
        </main>
        <Footer_Glow />
        <ChatDock />
        <ChatOverlay />
      </div>
    </ChatProvider>
  );
}
