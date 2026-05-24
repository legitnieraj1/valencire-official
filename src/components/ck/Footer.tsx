"use client";


export default function Footer() {
  return (
    <footer className="w-full bg-white text-black border-t border-gray-200" style={{ fontFamily: "var(--font-cormorant), Georgia, serif" }}>
      {/* Layer 1: Giant Centered Logo */}
      <div className="w-full max-w-[1440px] mx-auto px-6 md:px-16 py-10 md:py-16 flex justify-center items-center">
        <img
          src="/images/black%20valencire%20text%20logo.png"
          alt="Valenciré"
          className="w-[90%] md:w-[75%] max-w-[1000px] h-auto object-contain"
        />
      </div>

      {/* Divider */}
      <div className="w-full border-b border-gray-200" />

      {/* Layer 3: Store Locator and Country / Region (aligned to right columns in 4-col grid) */}
      <div className="w-full max-w-[1440px] mx-auto px-6 md:px-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 py-8">
          <div className="hidden md:block" />
          <div className="hidden md:block" />
          <div>
            <h3 className="text-[11px] font-semibold tracking-[0.08em] text-black mb-2 uppercase">
              Store locator
            </h3>
            <a
              href="#locations"
              className="text-[11px] text-gray-500 hover:text-black transition-colors"
            >
              Our locations
            </a>
          </div>
          <div>
            <h3 className="text-[11px] font-semibold tracking-[0.08em] text-black mb-2 uppercase">
              Country / Region
            </h3>
            <a
              href="#region"
              className="text-[11px] text-gray-500 hover:text-black transition-colors inline-flex items-center gap-1"
            >
              India | English <span className="text-[10px] text-gray-400">›</span>
            </a>
          </div>
        </div>
      </div>

      {/* Divider */}
      <div className="w-full border-b border-gray-200" />

      {/* Layer 5: Main Link Columns (4-col grid) */}
      <div className="w-full max-w-[1440px] mx-auto px-6 md:px-16">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-x-8 gap-y-10 py-12">
          {/* Column 1 */}
          <div>
            <h3 className="text-[11px] font-semibold tracking-[0.08em] text-black mb-4 uppercase">
              Do you need help?
            </h3>
            <ul className="space-y-2.5">
              <li>
                <a href="#authenticity" className="text-[11px] text-gray-500 hover:text-black transition-colors">
                  Authenticity
                </a>
              </li>
              <li>
                <a href="#gift-guide" className="text-[11px] text-gray-500 hover:text-black transition-colors">
                  The Gift Guide
                </a>
              </li>
              <li>
                <a href="#greeting-card" className="text-[11px] text-gray-500 hover:text-black transition-colors">
                  Digital Greeting Card
                </a>
              </li>
            </ul>
          </div>

          {/* Column 2 */}
          <div>
            <h3 className="text-[11px] font-semibold tracking-[0.08em] text-black mb-4 uppercase">
              Legal area
            </h3>
            <ul className="space-y-2.5">
              <li>
                <a href="#privacy" className="text-[11px] text-gray-500 hover:text-black transition-colors">
                  Privacy Policy
                </a>
              </li>
              <li>
                <a href="#cookies" className="text-[11px] text-gray-500 hover:text-black transition-colors">
                  Cookie Policy
                </a>
              </li>
              <li>
                <a href="#cookie-settings" className="text-[11px] text-gray-500 hover:text-black transition-colors">
                  Cookie Settings
                </a>
              </li>
              <li>
                <a href="#accessibility" className="text-[11px] text-gray-500 hover:text-black transition-colors">
                  Accessibility statement
                </a>
              </li>
              <li>
                <a href="#apps-accessibility" className="text-[11px] text-gray-500 hover:text-black transition-colors">
                  Apps accessibility statement
                </a>
              </li>
            </ul>
          </div>

          {/* Column 3 */}
          <div>
            <h3 className="text-[11px] font-semibold tracking-[0.08em] text-black mb-4 uppercase">
              Legal area
            </h3>
            <ul className="space-y-2.5">
              <li>
                <a href="#privacy-2" className="text-[11px] text-gray-500 hover:text-black transition-colors">
                  Privacy Policy
                </a>
              </li>
              <li>
                <a href="#accessibility-2" className="text-[11px] text-gray-500 hover:text-black transition-colors">
                  Accessibility statement
                </a>
              </li>
            </ul>
          </div>

          {/* Column 4 */}
          <div>
            <h3 className="text-[11px] font-semibold tracking-[0.08em] text-black mb-4 uppercase">
              Our company
            </h3>
            <ul className="space-y-2.5">
              <li>
                <a href="#valencire" className="text-[11px] text-gray-500 hover:text-black transition-colors">
                  Valenciré
                </a>
              </li>
              <li>
                <a href="#atelier" className="text-[11px] text-gray-500 hover:text-black transition-colors">
                  Valenciré Atelier
                </a>
              </li>
              <li>
                <a href="#sartorial" className="text-[11px] text-gray-500 hover:text-black transition-colors">
                  Valenciré Sartorial
                </a>
              </li>
              <li>
                <a href="#maison" className="text-[11px] text-gray-500 hover:text-black transition-colors">
                  Valenciré Maison
                </a>
              </li>
              <li>
                <a href="#careers" className="text-[11px] text-gray-500 hover:text-black transition-colors inline-flex items-center gap-1">
                  Careers <span className="text-[9px]">↗</span>
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Divider */}
      <div className="w-full border-b border-gray-200" />

      {/* Layer 7: Social Media Icons */}
      <div className="w-full max-w-[1440px] mx-auto px-6 md:px-16 py-6">
        <div className="flex items-center gap-6">
          <a
            href="https://instagram.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-black hover:opacity-60 transition-opacity"
            aria-label="Instagram"
          >
            <svg
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
              <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
              <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
            </svg>
          </a>
          <a
            href="https://facebook.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-black hover:opacity-60 transition-opacity"
            aria-label="Facebook"
          >
            <svg
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
            </svg>
          </a>
          <a
            href="https://youtube.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-black hover:opacity-60 transition-opacity"
            aria-label="YouTube"
          >
            <svg
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M22.54 6.42a2.78 2.78 0 0 0-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 0 0-1.94 2A29 29 0 0 0 1 11.75a29 29 0 0 0 .46 5.33A2.78 2.78 0 0 0 3.4 19c1.72.46 8.6.46 8.6.46s6.88 0 8.6-.46a2.78 2.78 0 0 0 1.94-2 29 29 0 0 0 .46-5.25 29 29 0 0 0-.46-5.33z" />
              <polygon points="9.75 15.02 15.5 11.75 9.75 8.48 9.75 15.02" />
            </svg>
          </a>
        </div>
      </div>

      {/* Layer 8: Copyright Black Bar */}
      <div className="w-full bg-black py-4 px-6 md:px-16">
        <div className="max-w-[1440px] mx-auto flex items-center justify-between text-[10px] tracking-wider text-gray-400">
          <span>Copyright © 2026 Valenciré S.p.A. - All Rights Reserved</span>
        </div>
      </div>
    </footer>
  );
}
