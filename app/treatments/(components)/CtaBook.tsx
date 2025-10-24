'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';

export default function CtaBook() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const update = () => {
      const doc = document.documentElement;
      const scrollable = doc.scrollHeight - doc.clientHeight;
      if (scrollable <= 0) {
        setVisible(true);
        return;
      }
      const progress = doc.scrollTop / scrollable;
      setVisible(progress >= 0.35);
    };

    update();
    window.addEventListener('scroll', update, { passive: true });
    window.addEventListener('resize', update);
    return () => {
      window.removeEventListener('scroll', update);
      window.removeEventListener('resize', update);
    };
  }, []);

  return (
    <div
      className={`pointer-events-none fixed inset-x-0 bottom-4 z-40 flex justify-center transition duration-500 ${visible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'}`}
      aria-hidden={!visible}
    >
      <Link
        href="/booking"
        className="pointer-events-auto inline-flex items-center justify-center gap-3 rounded-full bg-gradient-to-r from-[var(--smh-primary-magenta)] to-[var(--smh-primary-teal)] px-7 py-3 text-sm font-semibold uppercase tracking-[0.3em] text-white shadow-2xl shadow-[var(--smh-primary-magenta)]/25"
      >
        Book your consultation
      </Link>
    </div>
  );
}
