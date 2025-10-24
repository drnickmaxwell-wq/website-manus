import Link from 'next/link';

type FinanceSnippetProps = {
  priceGuide: string;
  apr?: string;
};

export default function FinanceSnippet({ priceGuide, apr = 'Representative 9.9% APR' }: FinanceSnippetProps) {
  return (
    <section className="rounded-3xl border border-white/20 bg-white/70 p-6 shadow-sm backdrop-blur dark:bg-white/10 sm:p-10">
      <div className="flex flex-col gap-4 text-[var(--smh-text)] dark:text-white sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="text-xl font-semibold">Finance illustration</h2>
          <p className="text-sm text-[var(--smh-text-muted)] dark:text-white/70">{apr}</p>
        </div>
        <div className="text-right">
          <p className="text-sm uppercase tracking-[0.3em] text-[var(--smh-text-muted)] dark:text-white/60">Guide</p>
          <p className="text-lg font-semibold">{priceGuide}</p>
        </div>
      </div>
      <p className="mt-4 text-sm text-[var(--smh-text-muted)] dark:text-white/60">
        Monthly payments subject to status. Speak to our treatment coordinator for a bespoke illustration tailored to your plan.
      </p>
      <Link
        href="/finance"
        className="mt-6 inline-flex items-center justify-center rounded-full border border-transparent bg-gradient-to-r from-[var(--smh-primary-magenta)] to-[var(--smh-primary-teal)] px-6 py-3 text-sm font-semibold uppercase tracking-[0.3em] text-white shadow-lg transition hover:shadow-xl"
      >
        Explore finance options
      </Link>
    </section>
  );
}
