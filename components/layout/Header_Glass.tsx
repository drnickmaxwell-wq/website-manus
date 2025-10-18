"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useId, useState } from "react";

type NavItem = { label: string; href: string };

const NAV_ITEMS: NavItem[] = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  { label: "Patient Info", href: "/patient-info" },
  { label: "Contact", href: "/contact" },
  { label: "Treatments", href: "/treatments" },
  { label: "Fees & Plans", href: "/fees" },
];

export default function HeaderGlass() {
  const [open, setOpen] = useState(false);
  const menuId = useId();

  useEffect(() => {
    if (!open) return;
    const original = document.documentElement.style.overflow;
    document.documentElement.style.overflow = "hidden";
    return () => {
      document.documentElement.style.overflow = original;
    };
  }, [open]);

  return (
    <header className="sticky top-0 z-50">
      <div className="relative mx-auto max-w-6xl px-4 sm:px-6">
        <div className="mt-4 flex items-center justify-between rounded-full border border-white/20 bg-white/70 px-4 py-3 shadow-sm backdrop-blur-md transition-colors dark:bg-black/40">
          <div className="flex items-center gap-3">
            <Link href="/" aria-label="St Mary’s House Dental">
              <Image src="/brand/logo.svg" alt="St Mary’s House Dental" width={128} height={36} className="h-8 w-auto" priority />
            </Link>
          </div>
          <nav className="hidden items-center gap-6 text-sm font-medium sm:flex">
            {NAV_ITEMS.map((item) => (
              <Link key={item.href} href={item.href} className="relative inline-flex items-center rounded-full px-3 py-2 text-[color:var(--smh-text-muted)] transition-colors hover:text-[color:var(--smh-text)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[color:var(--smh-primary-teal)]">
                {item.label}
              </Link>
            ))}
          </nav>
          <div className="hidden items-center gap-3 sm:flex">
            <Link
              href="/emergency"
              className="rounded-full border border-[color:var(--smh-accent-gold)] px-4 py-2 text-sm font-semibold text-[color:var(--smh-accent-gold)] transition hover:bg-[color:var(--smh-accent-gold)] hover:text-black focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[color:var(--smh-primary-teal)]"
            >
              Emergency
            </Link>
            <Link
              href="/contact"
              className="smh-btn rounded-full px-4 py-2 text-sm font-semibold focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[color:var(--smh-primary-teal)]"
            >
              Book Consultation
            </Link>
          </div>
          <button
            type="button"
            aria-expanded={open}
            aria-controls={menuId}
            onClick={() => setOpen((value) => !value)}
            className="inline-flex sm:hidden rounded-full border border-white/20 bg-white/70 p-2 text-[color:var(--smh-text)] transition hover:border-white/40 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[color:var(--smh-primary-teal)] dark:bg-black/40"
            aria-label={open ? "Close menu" : "Open menu"}
          >
            <span className="sr-only">{open ? "Close menu" : "Open menu"}</span>
            <svg
              aria-hidden
              className="h-5 w-5"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              {open ? (
                <path d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path d="M4 7h16M4 12h16M4 17h16" />
              )}
            </svg>
          </button>
        </div>
      </div>
      <MobileMenu open={open} onClose={() => setOpen(false)} menuId={menuId} />
    </header>
  );
}

type MobileMenuProps = { open: boolean; onClose: () => void; menuId: string };

function MobileMenu({ open, onClose, menuId }: MobileMenuProps) {
  useEffect(() => {
    if (!open) return;
    const keyListener = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onClose();
      }
    };
    window.addEventListener("keydown", keyListener);
    return () => window.removeEventListener("keydown", keyListener);
  }, [open, onClose]);

  return (
    <div className={`${open ? "pointer-events-auto" : "pointer-events-none"} fixed inset-0 z-40 sm:hidden`}>
      <div
        className={`absolute inset-0 bg-black/40 transition-opacity ${open ? "opacity-100" : "opacity-0"}`}
        aria-hidden
        onClick={onClose}
      />
      <div
        id={menuId}
        role="dialog"
        aria-modal="true"
        className={`absolute right-0 top-0 h-full w-72 max-w-[85%] transform bg-white/90 p-6 shadow-lg backdrop-blur-md transition-transform duration-300 ease-out dark:bg-[#111317]/90 ${open ? "translate-x-0" : "translate-x-full"}`}
      >
        <div className="mb-6 flex items-center justify-between">
          <span className="text-sm font-semibold text-[color:var(--smh-text)]">Menu</span>
          <button
            type="button"
            onClick={onClose}
            className="rounded-full border border-white/30 bg-white/70 p-2 text-[color:var(--smh-text)] hover:border-white/60 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[color:var(--smh-primary-teal)] dark:bg-black/40"
          >
            <span className="sr-only">Close menu</span>
            <svg
              aria-hidden
              className="h-5 w-5"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        <nav className="flex flex-col gap-3">
          {NAV_ITEMS.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              onClick={onClose}
              className="rounded-lg px-3 py-2 text-base font-medium text-[color:var(--smh-text)] transition hover:bg-white/60 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[color:var(--smh-primary-teal)] dark:hover:bg-white/10"
            >
              {item.label}
            </Link>
          ))}
        </nav>
        <div className="mt-8 flex flex-col gap-3">
          <Link
            href="/emergency"
            onClick={onClose}
            className="rounded-full border border-[color:var(--smh-accent-gold)] px-4 py-2 text-center text-sm font-semibold text-[color:var(--smh-accent-gold)] hover:bg-[color:var(--smh-accent-gold)] hover:text-black focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[color:var(--smh-primary-teal)]"
          >
            Emergency
          </Link>
          <Link
            href="/contact"
            onClick={onClose}
            className="smh-btn rounded-full px-4 py-2 text-center text-sm font-semibold focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[color:var(--smh-primary-teal)]"
          >
            Book Consultation
          </Link>
        </div>
      </div>
    </div>
  );
}
