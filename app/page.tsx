import BrandHeroGradient from "@/components/brand/BrandHeroGradient";
import BrandButton from "@/components/brand/BrandButton";
import { ChatProvider } from "@/contexts/ChatProvider";
import ChatDock from "@/components/chat/ChatDock";
import ChatOverlay from "@/components/chat/ChatOverlay";
export default function Home(){
  return (
    <ChatProvider>
      <main>
        <BrandHeroGradient>
          <h1 className="smh-heading text-3xl md:text-5xl mb-3">St Mary’s House Dental Care</h1>
          <p className="max-w-prose smh-text-dim mb-6">Quiet luxury, 3D-first dentistry in West Sussex.</p>
          <div className="flex gap-3">
            <BrandButton as="a" href="/contact">Book Consultation</BrandButton>
            <BrandButton as="a" href="/treatments">Explore Treatments</BrandButton>
          </div>
        </BrandHeroGradient>
        <ChatDock/>
        <ChatOverlay/>
      </main>
    </ChatProvider>
  );
}
