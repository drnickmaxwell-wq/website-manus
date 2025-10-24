import Image from 'next/image';
import type { Treatment, TreatmentCategory } from '@/content/treatments';
import { TREATMENT_CATEGORY_TITLES } from '@/content/treatments';
import ParticlesLayer from '@/components/brand/ParticlesLayer';

type TreatmentHeroProps = Pick<Treatment, 'name' | 'summary' | 'intro' | 'heroImage'> & {
  category: TreatmentCategory;
};

export default function TreatmentHero({ name, summary, intro, heroImage, category }: TreatmentHeroProps) {
  const categoryLabel = TREATMENT_CATEGORY_TITLES[category] ?? 'Treatments';

  return (
    <section className="relative isolate overflow-hidden rounded-3xl border border-white/10 bg-[var(--smh-bg)] text-white shadow-xl">
      <div className="absolute inset-0">
        <Image
          src={heroImage}
          alt="Luxurious gradient backdrop"
          fill
          priority
          className="object-cover"
        />
      </div>
      <ParticlesLayer mode="auto" variant="gold" className="opacity-50" />
      <div
        className="absolute inset-x-0 bottom-0 h-48"
        style={{
          maskImage: 'url(/waves/smh-wave-mask.svg)',
          WebkitMaskImage: 'url(/waves/smh-wave-mask.svg)',
          maskSize: 'cover',
          WebkitMaskSize: 'cover',
          maskRepeat: 'no-repeat',
          WebkitMaskRepeat: 'no-repeat',
        }}
      />
      <div className="relative z-10 grid gap-6 px-6 py-16 sm:px-10 sm:py-20 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] lg:items-end">
        <div className="space-y-4">
          <span className="inline-flex items-center rounded-full border border-white/30 bg-white/10 px-4 py-1 text-xs font-semibold uppercase tracking-[0.28em] text-white/90 backdrop-blur">
            {categoryLabel}
          </span>
          <h1 className="text-3xl font-semibold text-white sm:text-4xl lg:text-5xl">{name}</h1>
          <p className="max-w-2xl text-base text-white/90 sm:text-lg">{summary}</p>
        </div>
        <p className="max-w-3xl text-sm text-white/80 sm:text-base lg:text-lg">
          {intro}
        </p>
      </div>
    </section>
  );
}
