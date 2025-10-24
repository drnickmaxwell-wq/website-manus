import Link from 'next/link';
import ParticlesLayer from '@/components/brand/ParticlesLayer';
import CtaBook from './(components)/CtaBook';
import {
  getTreatment,
  TREATMENT_CATEGORY_TITLES,
  type TreatmentCategory,
} from '@/content/treatments';

type LayoutProps = {
  children: React.ReactNode;
  params: { category?: TreatmentCategory; slug?: string };
};

export default function TreatmentsLayout({ children, params }: LayoutProps) {
  const crumbs: { href: string; label: string }[] = [
    { href: '/', label: 'Home' },
    { href: '/treatments', label: 'Treatments' },
  ];

  if (params?.category) {
    const label = TREATMENT_CATEGORY_TITLES[params.category] ?? params.category;
    crumbs.push({ href: `/treatments/${params.category}`, label });
  }

  if (params?.category && params?.slug) {
    const treatment = getTreatment(params.category, params.slug);
    crumbs.push({ href: `/treatments/${params.category}/${params.slug}`, label: treatment?.name ?? params.slug });
  }

  return (
    <div className="relative">
      <header className="relative isolate overflow-hidden bg-[radial-gradient(circle_at_top,_rgba(194,24,91,0.35),_transparent_60%),_radial-gradient(circle_at_bottom,_rgba(21,193,182,0.28),_transparent_70%)] py-16 text-white">
        <ParticlesLayer mode="auto" variant="gold" className="opacity-60" />
        <div
          className="absolute inset-x-0 bottom-0 h-40"
          style={{
            maskImage: 'url(/waves/smh-wave-mask.svg)',
            WebkitMaskImage: 'url(/waves/smh-wave-mask.svg)',
            maskSize: 'cover',
            WebkitMaskSize: 'cover',
            maskRepeat: 'no-repeat',
            WebkitMaskRepeat: 'no-repeat',
          }}
        />
        <div className="relative z-10 mx-auto flex max-w-6xl flex-col gap-6 px-6">
          <nav aria-label="Breadcrumb" className="text-xs uppercase tracking-[0.3em] text-white/70">
            <ol className="flex flex-wrap gap-2">
              {crumbs.map((crumb, index) => (
                <li key={crumb.href} className="flex items-center gap-2">
                  {index > 0 && <span aria-hidden>•</span>}
                  {index === crumbs.length - 1 ? (
                    <span>{crumb.label}</span>
                  ) : (
                    <Link href={crumb.href} className="transition hover:text-white">
                      {crumb.label}
                    </Link>
                  )}
                </li>
              ))}
            </ol>
          </nav>
          <div>
            <p className="text-sm font-semibold tracking-[0.4em] text-white/70">SMH DENTAL TREATMENTS</p>
            <h1 className="mt-3 text-3xl font-semibold sm:text-4xl lg:text-5xl">Precision-led care tailored to your smile.</h1>
            <p className="mt-3 max-w-2xl text-sm text-white/80 sm:text-base">
              Explore cosmetic artistry, restorative craftsmanship, and orthodontic refinement delivered in a calm, champagne-lit environment.
            </p>
          </div>
        </div>
      </header>
      <main className="mx-auto max-w-6xl space-y-12 px-6 py-12 sm:py-16">{children}</main>
      <CtaBook />
    </div>
  );
}
