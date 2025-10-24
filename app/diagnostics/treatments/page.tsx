import Link from 'next/link';
import { treatments, TREATMENT_CATEGORY_TITLES } from '@/content/treatments';

export default function TreatmentsDiagnostics() {
  return (
    <main className="mx-auto max-w-5xl space-y-6 px-6 py-10">
      <header className="rounded-2xl border border-white/20 bg-white/60 p-6 shadow-sm backdrop-blur dark:bg-white/10">
        <h1 className="text-2xl font-semibold text-[var(--smh-text)] dark:text-white">Treatments data explorer</h1>
        <p className="mt-2 text-sm text-[var(--smh-text-muted)] dark:text-white/70">
          All treatment entries currently registered in <code>content/treatments</code>.
        </p>
      </header>
      <table className="w-full overflow-hidden rounded-2xl border border-white/20 text-sm shadow-sm">
        <thead className="bg-white/70 text-left uppercase tracking-[0.3em] text-[var(--smh-text-muted)] dark:bg-white/5 dark:text-white/60">
          <tr>
            <th className="px-4 py-3">Category</th>
            <th className="px-4 py-3">Name</th>
            <th className="px-4 py-3">Slug</th>
            <th className="px-4 py-3">Summary</th>
          </tr>
        </thead>
        <tbody>
          {treatments.map((treatment) => (
            <tr key={`${treatment.category}-${treatment.slug}`} className="odd:bg-white/60 even:bg-white/40 dark:odd:bg-white/10 dark:even:bg-white/5">
              <td className="px-4 py-3 font-medium text-[var(--smh-text)] dark:text-white">
                {TREATMENT_CATEGORY_TITLES[treatment.category] ?? treatment.category}
              </td>
              <td className="px-4 py-3 text-[var(--smh-text)] dark:text-white">
                <Link href={`/treatments/${treatment.category}/${treatment.slug}`} className="gradient-text lux-gold-flash">
                  {treatment.name}
                </Link>
              </td>
              <td className="px-4 py-3 text-[var(--smh-text-muted)] dark:text-white/70">{treatment.slug}</td>
              <td className="px-4 py-3 text-[var(--smh-text-muted)] dark:text-white/70">{treatment.summary}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </main>
  );
}
