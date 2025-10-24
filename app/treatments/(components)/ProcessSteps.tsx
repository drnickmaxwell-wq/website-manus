import type { Treatment } from '@/content/treatments';

type ProcessStepsProps = {
  steps: Treatment['steps'];
};

export default function ProcessSteps({ steps }: ProcessStepsProps) {
  if (!steps || steps.length === 0) return null;

  return (
    <section className="rounded-3xl border border-white/20 bg-white/70 p-6 shadow-sm backdrop-blur dark:bg-white/10 sm:p-10">
      <h2 className="text-xl font-semibold text-[var(--smh-text)] dark:text-white">Treatment journey</h2>
      <ol className="mt-6 space-y-6 md:grid md:grid-cols-2 md:gap-8 md:space-y-0">
        {steps.map((step, index) => (
          <li key={step} className="relative rounded-2xl border border-white/40 bg-white/80 p-5 shadow-sm dark:bg-white/10">
            <span className="absolute -left-4 -top-4 flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-r from-[var(--smh-primary-magenta)] to-[var(--smh-primary-teal)] text-sm font-semibold text-white shadow-lg">
              {index + 1}
            </span>
            <p className="pl-6 text-sm font-medium text-[var(--smh-text)] dark:text-white">{step}</p>
          </li>
        ))}
      </ol>
    </section>
  );
}
