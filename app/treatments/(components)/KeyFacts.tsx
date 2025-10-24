import { CalendarRange, Clock, PiggyBank, Shield } from 'lucide-react';

type KeyFactsProps = {
  appointmentLength?: string;
  timeToResult: string;
  downtime: string;
  durability: string;
  priceGuide: string;
};

export default function KeyFacts({ appointmentLength, timeToResult, downtime, durability, priceGuide }: KeyFactsProps) {
  const facts = [
    {
      title: 'Treatment timeline',
      value: timeToResult,
      description: appointmentLength ?? 'Appointment length tailored to your plan.',
      Icon: Clock,
    },
    {
      title: 'Downtime',
      value: downtime,
      description: 'How quickly you can return to daily life.',
      Icon: CalendarRange,
    },
    {
      title: 'Longevity',
      value: durability,
      description: 'Average lifespan with recommended maintenance.',
      Icon: Shield,
    },
    {
      title: 'Investment guide',
      value: priceGuide,
      description: 'Finance illustrations available on request.',
      Icon: PiggyBank,
    },
  ];

  return (
    <section className="rounded-3xl border border-white/20 bg-white/60 p-6 shadow-sm backdrop-blur dark:bg-white/10 dark:text-white sm:p-10">
      <div className="mb-6 flex items-center justify-between gap-6">
        <h2 className="text-xl font-semibold text-[var(--smh-text)] dark:text-white">Key facts</h2>
        <span className="text-xs uppercase tracking-[0.3em] text-[var(--smh-text-muted)] dark:text-white/70">Snapshot</span>
      </div>
      <dl className="grid gap-6 md:grid-cols-2">
        {facts.map(({ title, value, description, Icon }) => (
          <div key={title} className="group flex flex-col gap-2 rounded-2xl border border-transparent bg-white/70 p-5 shadow-sm transition hover:border-[var(--smh-primary-magenta)] hover:shadow-lg hover:shadow-[var(--smh-primary-magenta)]/20 dark:bg-white/10">
            <div className="flex items-center gap-3">
              <span className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-[var(--smh-primary-magenta)] to-[var(--smh-primary-teal)] text-white shadow-sm">
                <Icon className="h-4 w-4" aria-hidden />
              </span>
              <dt className="text-sm font-semibold uppercase tracking-wide text-[var(--smh-text-muted)] dark:text-white/60">{title}</dt>
            </div>
            <dd className="text-lg font-medium text-[var(--smh-text)] dark:text-white">{value}</dd>
            <p className="text-sm text-[var(--smh-text-muted)] dark:text-white/60">{description}</p>
          </div>
        ))}
      </dl>
    </section>
  );
}
