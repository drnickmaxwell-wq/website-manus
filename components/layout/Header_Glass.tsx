"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useId, useState } from "react";
import type { CSSProperties } from "react";

type NavItem = { label: string; href: string };

const NAV_ITEMS: NavItem[] = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  { label: "Patient Info", href: "/patient-info" },
  { label: "Contact", href: "/contact" },
  { label: "Treatments", href: "/treatments" },
  { label: "Fees & Plans", href: "/fees" },
];

const glassSurfaceStyle: CSSProperties = {
  backgroundColor: "color-mix(in srgb, var(--smh-bg) 82%, transparent)",
  borderColor: "color-mix(in srgb, var(--smh-text) 18%, transparent)",
  boxShadow: "var(--shadow-elevate-light)",
};

const glassButtonStyle: CSSProperties = {
  backgroundColor: "color-mix(in srgb, var(--smh-bg) 86%, transparent)",
  borderColor: "color-mix(in srgb, var(--smh-text) 20%, transparent)",
};

const overlayBackdropStyle: CSSProperties = {
  backgroundColor: "color-mix(in srgb, var(--smh-text) 68%, transparent)",
};

const panelSurfaceStyle: CSSProperties = {
  backgroundColor: "color-mix(in srgb, var(--smh-bg) 90%, transparent)",
  borderColor: "color-mix(in srgb, var(--smh-text) 16%, transparent)",
  boxShadow: "var(--shadow-elevate-light)",
};

export default function Header_Glass() {
  const [open, setOpen] = useState(false);
  const menuId = useId();

  useEffect(() => {
    if (!open) return undefined;
    const original = document.documentElement.style.overflow;
    document.documentElement.style.overflow = "hidden";
    return () => {
      document.documentElement.style.overflow = original;
    };
  }, [open]);

  return (
    <header className="sticky top-0 z-50">
      <div className="relative mx-auto max-w-6xl px-4 sm:px-6">
        <div
          className="mt-4 flex items-center justify-between rounded-full px-4 py-3 backdrop-blur-xl transition-colors"
          style={glassSurfaceStyle}
        >
          <div className="flex items-center gap-3">
            <Link href="/" aria-label="St Mary’s House Dental">
              <Image
                src="/brand/logo.svg"
                alt="St Mary’s House Dental"
                width={128}
                height={36}
                className="h-8 w-auto"
                priority
              />
            </Link>
          </div>
          <nav className="hidden items-center gap-6 text-sm font-medium sm:flex">
            {NAV_ITEMS.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="relative inline-flex items-center rounded-full px-3 py-2 text-[color:var(--smh-text-muted)] transition-colors hover:text-[color:var(--smh-text)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[color:var(--smh-primary-teal)]"
              >
                {item.label}
              </Link>
            ))}
          </nav>
          <div className="hidden items-center gap-3 sm:flex">
            <Link
              href="/emergency"
              className="rounded-full px-4 py-2 text-sm font-semibold text-[color:var(--smh-accent-gold)] transition focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[color:var(--smh-primary-teal)]"
              style={{
                borderColor: "var(--smh-accent-gold)",
                borderWidth: 1,
                borderStyle: "solid",
                boxShadow: "var(--glow-gold)",
              }}
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
            className="inline-flex items-center justify-center rounded-full p-2 text-[color:var(--smh-text)] transition focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[color:var(--smh-primary-teal)] sm:hidden"
            style={glassButtonStyle}
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
              {open ? <path d="M6 18L18 6M6 6l12 12" /> : <path d="M4 7h16M4 12h16M4 17h16" />}
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
    if (!open) return undefined;
    const keyListener = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onClose();
      }
    };
    window.addEventListener("keydown", keyListener);
    return () => window.removeEventListener("keydown", keyListener);
  }, [open, onClose]);

  return (
    <div
      className={`${open ? "pointer-events-auto" : "pointer-events-none"} fixed inset-0 z-40 sm:hidden`}
      aria-hidden={!open}
    >
      <div
        className={`absolute inset-0 transition-opacity ${open ? "opacity-100" : "opacity-0"}`}
        style={overlayBackdropStyle}
        onClick={onClose}
      />
      <div
        id={menuId}
        role="dialog"
        aria-modal="true"
        className={`absolute right-0 top-0 flex h-full w-72 max-w-[85%] transform flex-col gap-6 overflow-y-auto px-6 py-6 backdrop-blur-xl transition-transform duration-300 ease-out ${open ? "translate-x-0" : "translate-x-full"}`}
        style={panelSurfaceStyle}
      >
        <div className="flex items-center justify-between">
          <span className="text-sm font-semibold text-[color:var(--smh-text)]">Menu</span>
          <button
            type="button"
            onClick={onClose}
            className="rounded-full p-2 text-[color:var(--smh-text)] transition focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[color:var(--smh-primary-teal)]"
            style={glassButtonStyle}
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
              className="rounded-lg px-3 py-2 text-base font-medium text-[color:var(--smh-text)] transition hover:text-[color:var(--smh-primary-teal)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[color:var(--smh-primary-teal)]"
            >
              {item.label}
            </Link>
          ))}
        </nav>
        <div className="mt-auto flex flex-col gap-3">
          <Link
            href="/emergency"
            onClick={onClose}
            className="rounded-full px-4 py-2 text-center text-sm font-semibold text-[color:var(--smh-accent-gold)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[color:var(--smh-primary-teal)]"
            style={{
              borderColor: "var(--smh-accent-gold)",
              borderWidth: 1,
              borderStyle: "solid",
              boxShadow: "var(--glow-gold)",
            }}
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
