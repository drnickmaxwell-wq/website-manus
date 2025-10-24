import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import JsonLd from '@/lib/seo/JsonLd';
import {
  treatments,
  getTreatment,
  type TreatmentCategory,
} from '@/content/treatments';
import TreatmentHero from '../../(components)/TreatmentHero';
import KeyFacts from '../../(components)/KeyFacts';
import ViewerPanel from '../../(components)/ViewerPanel';
import BeforeAfter from '../../(components)/BeforeAfter';
import ProcessSteps from '../../(components)/ProcessSteps';
import FAQs from '../../(components)/FAQs';
import FinanceSnippet from '../../(components)/FinanceSnippet';

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://example.com';
const MEDICAL_BUSINESS = {
  name: "St Mary's House Dental Care",
  url: SITE_URL,
  telephone: '01273 453109',
  logo: `${SITE_URL}/logos/horizontal-title-magenta-512.png`,
  address: {
    '@type': 'PostalAddress',
    streetAddress: "St Mary's House, St Mary's Road",
    addressLocality: 'Shoreham-by-Sea',
    addressRegion: 'West Sussex',
    postalCode: 'BN43 5ZA',
    addressCountry: 'GB',
  },
};

function absoluteUrl(path: string) {
  try {
    return new URL(path, SITE_URL).toString();
  } catch {
    return path;
  }
}

export async function generateStaticParams() {
  return treatments.map((treatment) => ({ category: treatment.category, slug: treatment.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: { category: TreatmentCategory; slug: string };
}): Promise<Metadata> {
  const treatment = getTreatment(params.category, params.slug);
  if (!treatment) {
    return { title: 'Treatment not found' };
  }

  const title = `${treatment.name} | St Mary's House Dental Care`;
  const description = treatment.summary;
  const canonical = `${SITE_URL}/treatments/${params.category}/${params.slug}`;

  return {
    title,
    description,
    alternates: { canonical },
    keywords: treatment.keywords,
    openGraph: {
      title,
      description,
      type: 'article',
      url: canonical,
      images: [
        {
          url: absoluteUrl(treatment.heroImage),
          alt: `${treatment.name} hero image`,
        },
      ],
    },
  };
}

function renderMarkdown(markdown: string) {
  const blocks = markdown.split(/\n\s*\n/);
  return blocks
    .map((block, index) => {
      const trimmed = block.trim();
      if (!trimmed) return null;
      if (trimmed.startsWith('### ')) {
        return (
          <h3 key={`heading-${index}`} className="mt-6 text-lg font-semibold text-[var(--smh-text)] dark:text-white">
            {trimmed.replace(/^###\s*/, '')}
          </h3>
        );
      }
      const lines = trimmed.split('\n');
      return (
        <p key={`paragraph-${index}`} className="mt-3 text-sm leading-relaxed text-[var(--smh-text-muted)] dark:text-white/70">
          {lines.map((line, lineIndex) => (
            <span key={lineIndex}>
              {line}
              {lineIndex < lines.length - 1 && <br />}
            </span>
          ))}
        </p>
      );
    })
    .filter(Boolean);
}

type PageProps = { params: { category: TreatmentCategory; slug: string } };

export default function TreatmentPage({ params }: PageProps) {
  const treatment = getTreatment(params.category, params.slug);

  if (!treatment) {
    notFound();
    return null;
  }

  const canonical = `${SITE_URL}/treatments/${params.category}/${params.slug}`;

  return (
    <>
      <JsonLd
        type="WebPage"
        data={{
          name: treatment.name,
          url: canonical,
          description: treatment.summary,
          keywords: treatment.keywords,
        }}
      />
      <JsonLd type="MedicalBusiness" data={MEDICAL_BUSINESS} />
      <JsonLd
        type="TherapeuticProcedure"
        data={{
          name: treatment.name,
          description: treatment.summary,
          procedureType: 'DentalProcedure',
          url: canonical,
          image: absoluteUrl(treatment.heroImage),
        }}
      />
      {treatment.indications.map((condition) => (
        <JsonLd
          key={condition}
          type="MedicalCondition"
          data={{
            name: condition,
            description: `${treatment.name} is often recommended for ${condition}.`,
          }}
        />
      ))}
      {treatment.indications.map((condition, index) => (
        <JsonLd
          key={`indication-${condition}-${index}`}
          type="TreatmentIndication"
          data={{
            name: `${treatment.name} indication`,
            description: `${condition} managed with ${treatment.name}.`,
            guideline: `${treatment.name} clinical pathway`,
          }}
        />
      ))}
      <TreatmentHero
        category={treatment.category}
        name={treatment.name}
        summary={treatment.summary}
        intro={treatment.intro}
        heroImage={treatment.heroImage}
      />
      <div className="grid gap-10">
        <KeyFacts
          appointmentLength={treatment.appointmentLength}
          timeToResult={treatment.timeToResult}
          downtime={treatment.downtime}
          durability={treatment.durability}
          priceGuide={treatment.priceGuide}
        />
        <ViewerPanel
          src={treatment.modelSrc}
          poster={treatment.posterImage}
          alt={`${treatment.name} interactive model`}
          notes={treatment.benefits}
        />
        <section className="grid gap-10 lg:grid-cols-[minmax(0,2fr)_minmax(0,1fr)]">
          <article className="space-y-4 rounded-3xl border border-white/20 bg-white/70 p-6 shadow-sm backdrop-blur dark:bg-white/10 sm:p-10">
            <h2 className="text-xl font-semibold text-[var(--smh-text)] dark:text-white">How it works</h2>
            <div>{renderMarkdown(treatment.howItWorks)}</div>
            <h3 className="mt-8 text-lg font-semibold text-[var(--smh-text)] dark:text-white">Aftercare</h3>
            <ul className="mt-3 space-y-2 text-sm text-[var(--smh-text-muted)] dark:text-white/70">
              {treatment.aftercare.map((item) => (
                <li key={item} className="flex items-start gap-3">
                  <span className="mt-1 h-2 w-2 rounded-full bg-gradient-to-r from-[var(--smh-primary-magenta)] to-[var(--smh-primary-teal)]" aria-hidden />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </article>
          <aside className="space-y-6">
            <div className="rounded-3xl border border-white/20 bg-white/70 p-6 shadow-sm backdrop-blur dark:bg-white/10">
              <h3 className="text-sm font-semibold uppercase tracking-[0.3em] text-[var(--smh-text-muted)] dark:text-white/60">Risks</h3>
              <ul className="mt-3 space-y-2 text-sm text-[var(--smh-text-muted)] dark:text-white/70">
                {treatment.risks.map((risk) => (
                  <li key={risk} className="flex items-start gap-2">
                    <span aria-hidden className="mt-1 h-1.5 w-1.5 rounded-full bg-[var(--smh-primary-magenta)]" />
                    <span>{risk}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="rounded-3xl border border-white/20 bg-white/70 p-6 shadow-sm backdrop-blur dark:bg-white/10">
              <h3 className="text-sm font-semibold uppercase tracking-[0.3em] text-[var(--smh-text-muted)] dark:text-white/60">Ideal for</h3>
              <ul className="mt-3 space-y-2 text-sm text-[var(--smh-text-muted)] dark:text-white/70">
                {treatment.indications.map((indication) => (
                  <li key={indication} className="flex items-start gap-2">
                    <span aria-hidden className="mt-1 h-1.5 w-1.5 rounded-full bg-[var(--smh-primary-teal)]" />
                    <span>{indication}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="rounded-3xl border border-white/20 bg-white/70 p-6 shadow-sm backdrop-blur dark:bg-white/10">
              <h3 className="text-sm font-semibold uppercase tracking-[0.3em] text-[var(--smh-text-muted)] dark:text-white/60">Contraindications</h3>
              <ul className="mt-3 space-y-2 text-sm text-[var(--smh-text-muted)] dark:text-white/70">
                {treatment.contraindications.map((contra) => (
                  <li key={contra} className="flex items-start gap-2">
                    <span aria-hidden className="mt-1 h-1.5 w-1.5 rounded-full bg-[var(--smh-primary-magenta)]" />
                    <span>{contra}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="rounded-3xl border border-white/20 bg-white/70 p-6 shadow-sm backdrop-blur dark:bg-white/10">
              <h3 className="text-sm font-semibold uppercase tracking-[0.3em] text-[var(--smh-text-muted)] dark:text-white/60">Further reading</h3>
              <ul className="mt-3 space-y-2 text-sm text-[var(--smh-text-muted)] dark:text-white/70">
                {treatment.readingList.map((item) => (
                  <li key={item.url}>
                    <a
                      href={item.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="gradient-text lux-gold-flash"
                    >
                      {item.title}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </aside>
        </section>
        {treatment.beforeImage && treatment.afterImage && (
          <BeforeAfter
            before={{ label: 'Before', image: treatment.beforeImage }}
            after={{ label: 'After', image: treatment.afterImage }}
          />
        )}
        <ProcessSteps steps={treatment.steps} />
        <FinanceSnippet priceGuide={treatment.priceGuide} />
        <FAQs faqs={treatment.faqs} />
      </div>
    </>
  );
}
