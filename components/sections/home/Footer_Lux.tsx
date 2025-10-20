import React from "react";

export default function Footer_Lux() {
  return (
    <footer className="relative mt-10">
      <div aria-hidden className="smh-wave-divider" />
      <div className="relative bg-[#0B0E12] text-white">
        <div aria-hidden className="absolute inset-0 smh-film-grain" />
        <div className="mx-auto w-full max-w-[var(--maxw,1200px)] px-6 py-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          <div>
            <h3 className="font-semibold mb-3">St Mary’s House Dental Care</h3>
            <p className="smh-text-dim">
              St Mary’s House, St Mary’s Road, Shoreham-by-Sea, BN43 5ZA
            </p>
            <p className="smh-text-dim mt-2">
              01273 453109 · info@smhdental.co.uk
            </p>
          </div>
          <div>
            <h4 className="font-semibold mb-3">Treatments</h4>
            <ul className="space-y-2 smh-text-dim">
              <li>
                <a href="/treatments/3d-printed-veneers">3D Printed Veneers</a>
              </li>
              <li>
                <a href="/treatments/implants">Implants</a>
              </li>
              <li>
                <a href="/treatments/teeth-whitening">Whitening</a>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold mb-3">Patients</h4>
            <ul className="space-y-2 smh-text-dim">
              <li>
                <a href="/fees">Fees &amp; Finance</a>
              </li>
              <li>
                <a href="/faqs">FAQs</a>
              </li>
              <li>
                <a href="/contact">Contact</a>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold mb-3">Newsletter</h4>
            <form className="flex gap-2">
              <input
                className="flex-1 smh-glass rounded-xl px-3 py-2 text-black"
                placeholder="Email"
              />
              <button className="smh-btn">Join</button>
            </form>
          </div>
        </div>
        <div className="border-t border-white/10 py-4 text-center smh-text-dim">
          © {new Date().getFullYear()} St Mary’s House Dental Care — All rights reserved.
        </div>
      </div>
    </footer>
  );
}
