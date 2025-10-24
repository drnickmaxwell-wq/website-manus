import Link from 'next/link';
import {
  treatments,
  TREATMENT_CATEGORY_TITLES,
  type Treatment,
} from '@/content/treatments';

const categoryCopy: Record<string, string> = {
  cosmetic:
    'Smile artistry that enhances symmetry, brightness, and proportion with minimally invasive techniques.',
  restorative:
    'Advanced restorative care that rebuilds strength and function with digital precision and handcrafted detail.',
  orthodontic:
    'Modern orthodontics with discreet aligners and smart tracking for guided tooth movement.',
  preventive:
    'Personalised hygiene and prevention protocols to keep gums healthy and smiles luminous.',
  specialist:
    'Referral services and advanced treatments delivered by our multidisciplinary team.',
};

export default function TreatmentsLanding() {
  const grouped = treatments.reduce<Record<string, Treatment[]>>((acc, treatment) => {
    acc[treatment.category] = acc[treatment.category] ?? [];
    acc[treatment.category]!.push(treatment);
    return acc;
  }, {} as Record<string, Treatment[]>);

  return (
    <section className="space-y-8">
      {Object.entries(grouped).map(([category, list]) => (
        <div key={category} className="rounded-3xl border border-white/20 bg-white/70 p-6 shadow-sm backdrop-blur dark:bg-white/10 sm:p-10">
          <div className="flex flex-wrap items-end justify-between gap-4">
            <div>
              <h2 className="text-2xl font-semibold text-[var(--smh-text)] dark:text-white capitalize">
                {TREATMENT_CATEGORY_TITLES[category as keyof typeof TREATMENT_CATEGORY_TITLES] ?? category}
              </h2>
              <p className="mt-2 max-w-2xl text-sm text-[var(--smh-text-muted)] dark:text-white/70">
                {categoryCopy[category] ?? 'Explore personalised care pathways curated by our specialists.'}
              </p>
            </div>
            <span className="text-xs uppercase tracking-[0.3em] text-[var(--smh-text-muted)] dark:text-white/60">
              {list.length} {list.length === 1 ? 'treatment' : 'treatments'}
            </span>
          </div>
          <ul className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {list.map((treatment) => (
              <li key={treatment.slug}>
                <Link
                  href={`/treatments/${treatment.category}/${treatment.slug}`}
                  className="block h-full rounded-2xl border border-white/30 bg-white/80 p-5 shadow-sm transition hover:-translate-y-1 hover:border-[var(--smh-primary-magenta)] hover:shadow-lg hover:shadow-[var(--smh-primary-magenta)]/20 dark:bg-white/10"
                >
                  <span className="text-xs uppercase tracking-[0.3em] text-[var(--smh-text-muted)] dark:text-white/60">{treatment.category}</span>
                  <h3 className="mt-2 text-lg font-semibold text-[var(--smh-text)] dark:text-white">{treatment.name}</h3>
                  <p className="mt-2 text-sm text-[var(--smh-text-muted)] dark:text-white/70">{treatment.summary}</p>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      ))}
    </section>
  );
}
