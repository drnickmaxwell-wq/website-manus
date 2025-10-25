import Hero_Champagne from "@/components/hero/Hero_Champagne";

let Legacy: any = () => <div className="h-40 grid place-items-center">Legacy hero not found</div>;
try {
  Legacy = require("@/components/sections/home/VideoHero").default;
} catch {}

export default function CompareHeroes() {
  return (
    <div className="p-6 space-y-8">
      <h1 className="text-2xl font-semibold">Hero Comparison</h1>
      <section>
        <h2 className="text-lg mb-2">Champagne Hero (should be on homepage)</h2>
        <Hero_Champagne
          title="Champagne Hero"
          lead="Magenta→Teal 135°, wave mask, grain + subtle particles."
          ctas={[{ label: "Looks right?", href: "/" }]}
        />
      </section>
      <section className="mt-8">
        <h2 className="text-lg mb-2">Legacy Hero (should NOT be on homepage)</h2>
        <Legacy />
      </section>
    </div>
  );
}
