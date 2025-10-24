import { notFound } from 'next/navigation';
import Link from 'next/link';
import {
  treatmentsByCategory,
  TREATMENT_CATEGORY_TITLES,
  type TreatmentCategory,
} from '@/content/treatments';

const grouped = treatmentsByCategory();

export default function TreatmentCategoryPage({ params }: { params: { category: TreatmentCategory } }) {
  const list = grouped[params.category];
  if (!list) {
    notFound();
    return null;
  }

  const title = TREATMENT_CATEGORY_TITLES[params.category] ?? params.category;

  return (
    <section className="space-y-6">
      <header className="rounded-3xl border border-white/20 bg-white/70 p-6 shadow-sm backdrop-blur dark:bg-white/10 sm:p-10">
        <h1 className="text-2xl font-semibold text-[var(--smh-text)] dark:text-white">{title}</h1>
        <p className="mt-2 text-sm text-[var(--smh-text-muted)] dark:text-white/70">
          Explore our {title.toLowerCase()} services crafted for your smile goals.
        </p>
      </header>
      <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {list.map((treatment) => (
          <li key={treatment.slug}>
            <Link
              href={`/treatments/${treatment.category}/${treatment.slug}`}
              className="block h-full rounded-2xl border border-white/30 bg-white/80 p-5 shadow-sm transition hover:-translate-y-1 hover:border-[var(--smh-primary-magenta)] hover:shadow-lg hover:shadow-[var(--smh-primary-magenta)]/20 dark:bg-white/10"
            >
              <h2 className="text-lg font-semibold text-[var(--smh-text)] dark:text-white">{treatment.name}</h2>
              <p className="mt-2 text-sm text-[var(--smh-text-muted)] dark:text-white/70">{treatment.summary}</p>
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
}

export async function generateStaticParams() {
  return Object.keys(grouped).map((category) => ({ category }));
}
