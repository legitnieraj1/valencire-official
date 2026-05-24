"use client";
import { useState, useEffect } from "react";
import { Search, ShoppingBag, Heart, User, X, Menu } from "lucide-react";

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [isDark, setIsDark] = useState(true);
  const [isMobile, setIsMobile] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [wishlistOpen, setWishlistOpen] = useState(false);
  const [cartOpen, setCartOpen] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  useEffect(() => {
    const NAV_MID = 45;
    const detect = () => {
      const sections = document.querySelectorAll("[data-nav-theme]");
      let theme = "dark";
      sections.forEach((s) => {
        const rect = s.getBoundingClientRect();
        if (rect.top <= NAV_MID && rect.bottom > NAV_MID) {
          theme = s.getAttribute("data-nav-theme") ?? "dark";
        }
      });
      setIsDark(theme === "dark");
    };
    detect();
    window.addEventListener("scroll", detect, { passive: true });
    return () => window.removeEventListener("scroll", detect);
  }, []);

  const color = isDark ? "#fff" : "#000";

  const renderSearchOverlay = () => {
    return (
      <>
        {/* Backdrop overlay */}
        <div
          className={`fixed inset-0 bg-black/40 z-[90] transition-opacity duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] ${
            searchOpen ? "opacity-100 pointer-events-auto backdrop-blur-sm" : "opacity-0 pointer-events-none"
          }`}
          onClick={() => setSearchOpen(false)}
        />

        {/* Rolling search panel */}
        <div
          className="fixed top-0 left-0 right-0 bg-white z-[100] border-b border-gray-200 transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] overflow-y-auto max-h-[90vh]"
          style={{
            transform: searchOpen ? "translateY(0)" : "translateY(-100%)",
          }}
        >
          <div className="max-w-[1440px] mx-auto px-6 md:px-16 pt-6 pb-12">
            {/* Top Bar: Search Input */}
            <div className="flex items-center justify-between border-b border-gray-100 pb-4">
              <div className="flex items-center flex-1 gap-4">
                <Search className="text-gray-400" size={20} strokeWidth={1.5} />
                <input
                  type="text"
                  placeholder="Search"
                  className="w-full text-xl md:text-2xl font-light text-black placeholder-gray-300 focus:outline-none border-none bg-transparent"
                  autoFocus={searchOpen}
                />
              </div>
              <button
                onClick={() => setSearchOpen(false)}
                className="text-black hover:opacity-60 transition-opacity p-2"
                aria-label="Close search"
              >
                <X size={22} strokeWidth={1.5} />
              </button>
            </div>

            {/* Grid Content */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12 mt-8 text-left">
              {/* Column 1: Popular Searches */}
              <div>
                <h4 className="text-[11px] font-semibold uppercase tracking-[0.12em] text-gray-400 mb-4">
                  Popular Searches
                </h4>
                <ul className="space-y-3">
                  <li>
                    <a
                      href="/en/collections"
                      className="text-[13px] font-light text-black hover:text-gray-500 transition-colors block"
                    >
                      Valenciré Spring/Summer 2026 Collections
                    </a>
                  </li>
                  <li>
                    <a
                      href="/en/shirts"
                      className="text-[13px] font-light text-black hover:text-gray-500 transition-colors block"
                    >
                      Shirts
                    </a>
                  </li>
                  <li>
                    <a
                      href="/en/trouser-pants"
                      className="text-[13px] font-light text-black hover:text-gray-500 transition-colors block"
                    >
                      Trousers
                    </a>
                  </li>
                  <li>
                    <a
                      href="/en/trouser-pants"
                      className="text-[13px] font-light text-black hover:text-gray-500 transition-colors block"
                    >
                      Wide Pleated Trousers
                    </a>
                  </li>
                  <li>
                    <a
                      href="/en/shirts"
                      className="text-[13px] font-light text-black hover:text-gray-500 transition-colors block"
                    >
                      Pointed Collar Shirts
                    </a>
                  </li>
                </ul>
              </div>

              {/* Column 2: Services */}
              <div>
                <h4 className="text-[11px] font-semibold uppercase tracking-[0.12em] text-gray-400 mb-4">
                  Services
                </h4>
                <ul className="space-y-3">
                  <li>
                    <a
                      href="#locations"
                      className="text-[13px] font-light text-black hover:text-gray-500 transition-colors block"
                    >
                      Store Locator
                    </a>
                  </li>
                  <li>
                    <a
                      href="#contact"
                      className="text-[13px] font-light text-black hover:text-gray-500 transition-colors block"
                    >
                      Contact Us
                    </a>
                  </li>
                </ul>
              </div>

              {/* Column 3: New In */}
              <div>
                <h4 className="text-[11px] font-semibold uppercase tracking-[0.12em] text-gray-400 mb-4">
                  New In
                </h4>
                <div className="space-y-4">
                  {/* Product 1 */}
                  <a
                    href="/en/trouser-pants"
                    className="flex items-center gap-3.5 group"
                  >
                    <div className="w-12 h-12 md:w-14 md:h-14 bg-gray-100 flex-shrink-0 overflow-hidden">
                      <img
                        src="/images/gray-pleated-trousers1.JPG"
                        alt="Wide Pleated Trousers (Gray)"
                        className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-300"
                      />
                    </div>
                    <span className="text-[13px] font-light text-black group-hover:text-gray-500 transition-colors">
                      Wide Pleated Trousers (Gray)
                    </span>
                  </a>

                  {/* Product 2 */}
                  <a
                    href="/en/shirts"
                    className="flex items-center gap-3.5 group"
                  >
                    <div className="w-12 h-12 md:w-14 md:h-14 bg-gray-100 flex-shrink-0 overflow-hidden">
                      <img
                        src="/images/BLACKSHIRT.JPG"
                        alt="Pointed Collar Shirt (Black)"
                        className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-300"
                      />
                    </div>
                    <span className="text-[13px] font-light text-black group-hover:text-gray-500 transition-colors">
                      Pointed Collar Shirt (Black)
                    </span>
                  </a>

                  {/* Product 3 */}
                  <a
                    href="/en/trouser-pants"
                    className="flex items-center gap-3.5 group"
                  >
                    <div className="w-12 h-12 md:w-14 md:h-14 bg-gray-100 flex-shrink-0 overflow-hidden">
                      <img
                        src="/images/burgundy-trousers1.JPG"
                        alt="Sartorial Burgundy Trousers"
                        className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-300"
                      />
                    </div>
                    <span className="text-[13px] font-light text-black group-hover:text-gray-500 transition-colors">
                      Sartorial Burgundy Trousers
                    </span>
                  </a>

                  {/* Product 4 */}
                  <a
                    href="/en/shirts"
                    className="flex items-center gap-3.5 group"
                  >
                    <div className="w-12 h-12 md:w-14 md:h-14 bg-gray-100 flex-shrink-0 overflow-hidden">
                      <img
                        src="/images/skyblue1.JPG"
                        alt="Sky Blue Silk Shirt"
                        className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-300"
                      />
                    </div>
                    <span className="text-[13px] font-light text-black group-hover:text-gray-500 transition-colors">
                      Sky Blue Silk Shirt
                    </span>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </>
    );
  };

  const renderWishlistDrawer = () => {
    return (
      <>
        {/* Dark Backdrop */}
        <div
          className={`fixed inset-0 bg-black/40 z-[110] transition-opacity duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] ${
            wishlistOpen ? "opacity-100 pointer-events-auto backdrop-blur-sm" : "opacity-0 pointer-events-none"
          }`}
          onClick={() => setWishlistOpen(false)}
        />

        {/* Slide-out Drawer */}
        <div
          className={`fixed top-0 right-0 bottom-0 w-full max-w-[400px] bg-white z-[120] shadow-2xl border-l border-gray-100 transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] flex flex-col font-sans`}
          style={{
            transform: wishlistOpen ? "translateX(0)" : "translateX(100%)",
          }}
        >
          {/* Header */}
          <div className="flex items-center justify-between px-6 py-5 border-b border-gray-100">
            <span className="text-[13px] font-semibold uppercase tracking-[0.15em] text-black">
              Favorites
            </span>
            <button
              onClick={() => setWishlistOpen(false)}
              className="text-black hover:opacity-60 transition-opacity p-1"
              aria-label="Close favorites"
            >
              <X size={18} strokeWidth={1.2} />
            </button>
          </div>

          {/* Body */}
          <div className="flex-1 flex flex-col justify-center items-center px-8 text-center bg-white">
            <span className="text-[13px] font-semibold uppercase tracking-[0.16em] text-black mb-2">
              Create a Wishlist
            </span>
            <p className="text-xs text-gray-400 font-light leading-relaxed max-w-[280px] mb-8">
              You have not saved any items yet. Explore valencire.com and add products to your wishlist.
            </p>

            {/* Action Buttons (Jacquemus inspired) */}
            <div className="w-full space-y-3">
              <button
                onClick={() => setWishlistOpen(false)}
                className="w-full bg-black text-white hover:bg-gray-900 transition-colors py-3.5 text-xs font-semibold uppercase tracking-[0.16em] border border-black"
              >
                Log In
              </button>
              <button
                onClick={() => setWishlistOpen(false)}
                className="w-full bg-white text-black hover:bg-gray-50 transition-colors py-3.5 text-xs font-semibold uppercase tracking-[0.16em] border border-gray-200"
              >
                Create an Account
              </button>
            </div>
          </div>
        </div>
      </>
    );
  };

  const renderCartDrawer = () => {
    return (
      <>
        {/* Dark Backdrop */}
        <div
          className={`fixed inset-0 bg-black/40 z-[110] transition-opacity duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] ${
            cartOpen ? "opacity-100 pointer-events-auto backdrop-blur-sm" : "opacity-0 pointer-events-none"
          }`}
          onClick={() => setCartOpen(false)}
        />

        {/* Slide-out Drawer */}
        <div
          className={`fixed top-0 right-0 bottom-0 w-full max-w-[400px] bg-white z-[120] shadow-2xl border-l border-gray-100 transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] flex flex-col font-sans`}
          style={{
            transform: cartOpen ? "translateX(0)" : "translateX(100%)",
          }}
        >
          {/* Header */}
          <div className="flex items-center justify-between px-6 py-5 border-b border-gray-100">
            <span className="text-[13px] font-semibold uppercase tracking-[0.15em] text-black">
              Shopping Bag
            </span>
            <button
              onClick={() => setCartOpen(false)}
              className="text-black hover:opacity-60 transition-opacity p-1"
              aria-label="Close shopping bag"
            >
              <X size={18} strokeWidth={1.2} />
            </button>
          </div>

          {/* Body (Prada empty state) */}
          <div className="flex-1 flex flex-col justify-center items-center px-8 text-center bg-white">
            <p className="text-[13px] font-light text-black mb-3">
              Your shopping bag is empty
            </p>
            <a
              href="#login"
              onClick={() => setCartOpen(false)}
              className="text-[11px] font-light text-gray-500 hover:text-black transition-colors underline underline-offset-4 tracking-wider uppercase"
            >
              Log in or create your personal account
            </a>
          </div>

          {/* Bottom Bar (Tommy Hilfiger style) */}
          <div className="border-t border-gray-100 px-6 py-6 bg-white space-y-4">
            <div className="flex items-center justify-between text-xs tracking-wider uppercase">
              <span className="text-gray-400">Subtotal (0 items)</span>
              <span className="font-semibold text-black">₹0</span>
            </div>
            <button
              disabled
              className="w-full bg-gray-100 text-gray-400 cursor-not-allowed py-3.5 text-xs font-semibold uppercase tracking-[0.16em]"
            >
              Review + Checkout
            </button>
            <p className="text-[10px] text-gray-400 tracking-wider text-center font-light uppercase">
              Shipping &amp; Taxes Calculated at Checkout
            </p>
          </div>
        </div>
      </>
    );
  };

  /* ── Mobile header ── */
  if (isMobile) {
    return (
      <header
        className="fixed left-0 right-0 z-50"
        style={{ top: 0, background: "transparent" }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            padding: "0 20px",
            height: 56,
            position: "relative",
          }}
        >
          {/* Left: hamburger */}
          <button
            onClick={() => setMenuOpen(true)}
            aria-label="Open menu"
            style={{
              background: "none",
              border: "none",
              cursor: "pointer",
              padding: 0,
              color,
              display: "flex",
              flexDirection: "column",
              gap: 5,
              alignItems: "flex-start",
            }}
          >
            {/* Custom thin lines hamburger */}
            <span style={{ display: "block", width: 22, height: 1, background: color, transition: "background 0.3s" }} />
            <span style={{ display: "block", width: 16, height: 1, background: color, transition: "background 0.3s" }} />
          </button>

          {/* Center: Logo */}
          <a
            href="/"
            style={{
              position: "absolute",
              left: "50%",
              transform: "translateX(-50%)",
              textDecoration: "none",
            }}
          >
            <img
              src="/images/black%20valencire%20text%20logo.png"
              alt="Valenciré"
              style={{
                height: 22,
                width: "auto",
                display: "block",
                filter: "invert(1)",
                transition: "filter 0.3s",
              }}
            />
          </a>

          {/* Right: Search and Cart icons */}
          <div className="flex items-center gap-4">
            <button
              onClick={() => setSearchOpen(true)}
              aria-label="Search"
              style={{ color, transition: "color 0.3s", background: "none", border: "none", cursor: "pointer", padding: 0 }}
            >
              <Search size={18} strokeWidth={1.2} />
            </button>
            <button
              onClick={() => setCartOpen(true)}
              aria-label="Cart"
              style={{ color, transition: "color 0.3s", background: "none", border: "none", cursor: "pointer", padding: 0 }}
            >
              <ShoppingBag size={18} strokeWidth={1.2} />
            </button>
          </div>
        </div>

        {/* Mobile full-screen menu */}
        {menuOpen && (
          <div className="fixed inset-0 bg-white z-50 flex flex-col animate-fade-in font-sans">
            {/* Top Bar */}
            <div className="flex items-center justify-between px-6 h-14 border-b border-gray-100">
              {/* Left Search Icon (Bottega Veneta style) */}
              <button
                onClick={() => {
                  setMenuOpen(false);
                  setSearchOpen(true);
                }}
                className="text-black hover:opacity-60 transition-opacity p-1"
                aria-label="Open search"
              >
                <Search size={18} strokeWidth={1.2} />
              </button>

              {/* Center Logo */}
              <a href="/" onClick={() => setMenuOpen(false)}>
                <img
                  src="/images/black%20valencire%20text%20logo.png"
                  alt="Valenciré"
                  style={{ height: 20, width: "auto" }}
                />
              </a>

              {/* Right Close Button */}
              <button
                onClick={() => setMenuOpen(false)}
                aria-label="Close"
                className="text-black hover:opacity-60 transition-opacity p-1"
              >
                <X size={20} strokeWidth={1.2} />
              </button>
            </div>

            {/* Scrollable links body (Lemaire typographic layout + Bottega chevron details) */}
            <div className="flex-1 overflow-y-auto px-6 py-6 text-left flex flex-col justify-between">
              <div>
                {/* Main designer collection categories */}
                <nav className="flex flex-col">
                  {[
                    { label: "Spring/Summer 2026", href: "/en/collections" },
                    { label: "Sartorial Trousers", href: "/en/trouser-pants" },
                    { label: "Pointed Collar Shirts", href: "/en/shirts" },
                    { label: "The Linen Collection", href: "/en/shirts" },
                    { label: "Atelier Custom Suitings", href: "/en/trouser-pants" },
                    { label: "Heritage & Craft", href: "#heritage" },
                  ].map((item) => (
                    <a
                      key={item.label}
                      href={item.href}
                      onClick={() => setMenuOpen(false)}
                      className="flex items-center justify-between py-4 border-b border-gray-100 text-[13px] font-normal tracking-[0.08em] uppercase text-black hover:text-gray-500 transition-colors"
                    >
                      <span>{item.label}</span>
                      <span className="text-[12px] text-gray-400 font-light">›</span>
                    </a>
                  ))}
                </nav>

                {/* Secondary navigation links */}
                <div className="mt-8 space-y-3.5">
                  {[
                    { label: "Customer Care", href: "#contact" },
                    { label: "My Account", href: "#account" },
                    { label: "Store Locator", href: "#locations" },
                  ].map((item) => (
                    <a
                      key={item.label}
                      href={item.href}
                      onClick={() => setMenuOpen(false)}
                      className="text-xs text-gray-400 hover:text-black transition-colors block font-light tracking-wider"
                    >
                      {item.label}
                    </a>
                  ))}
                </div>
              </div>

              {/* Bottom region & contact settings */}
              <div className="mt-12 pt-5 border-t border-gray-100 flex items-center justify-between text-[11px] text-gray-500 font-light tracking-wider">
                <span className="flex items-center gap-1.5 cursor-pointer hover:text-black transition-colors">
                  🌐 India | English
                </span>
                <a
                  href="#contact"
                  onClick={() => setMenuOpen(false)}
                  className="hover:text-black transition-colors underline underline-offset-4"
                >
                  Contact Us
                </a>
              </div>
            </div>
          </div>
        )}
      {renderSearchOverlay()}
      {renderWishlistDrawer()}
      {renderCartDrawer()}
      </header>
    );
  }

  /* ── Desktop header ── */
  return (
    <header
      className="fixed left-0 right-0 z-50"
      style={{ top: 0, background: "transparent" }}
    >
      <div
        className="max-w-[1440px] mx-auto px-8 h-[64px] flex items-center justify-between"
        style={{ position: "relative" }}
      >
        {/* Left: India + Contact Us */}
        <div className="flex items-center gap-5">
          <button
            className="flex items-center gap-1.5 hover:opacity-70 transition-opacity"
            style={{
              color,
              transition: "color 0.3s",
              fontSize: 11,
              letterSpacing: "0.03em",
              fontWeight: 400,
              background: "none",
              border: "none",
              cursor: "pointer",
              padding: 0,
            }}
            aria-label="Select region: India"
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
              <circle cx="12" cy="12" r="10" />
              <path d="M2 12h20M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
            </svg>
            India
          </button>

          <a
            href="#contact"
            className="flex items-center gap-1.5 hover:opacity-70 transition-opacity"
            style={{
              color,
              transition: "color 0.3s",
              fontSize: 11,
              letterSpacing: "0.03em",
              fontWeight: 400,
              textDecoration: "none",
            }}
          >
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
              <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 12 19.79 19.79 0 0 1 1.61 3.4 2 2 0 0 1 3.6 1.24h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L7.91 9a16 16 0 0 0 6 6l.92-.92a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 21.49 16h.51a2 2 0 0 1 .94 1.92z" />
            </svg>
            Contact Us
          </a>
        </div>

        {/* Center: Logo */}
        <a
          href="/"
          className="absolute left-1/2 -translate-x-1/2 hover:opacity-80 transition-opacity"
          style={{ textDecoration: "none" }}
        >
          <img
            src="/images/black%20valencire%20text%20logo.png"
            alt="Valenciré"
            style={{
              height: 28,
              width: "auto",
              display: "block",
              filter: "invert(1)",
              transition: "filter 0.3s",
            }}
          />
        </a>

        {/* Right: icons */}
        <div className="flex items-center gap-5">
          <button onClick={() => setSearchOpen(true)} className="hover:opacity-60 transition-opacity" aria-label="Search"
            style={{ color, transition: "color 0.3s", background: "none", border: "none", cursor: "pointer", padding: 0 }}>
            <Search size={17} strokeWidth={1.3} />
          </button>
          <button onClick={() => setWishlistOpen(true)} className="hover:opacity-60 transition-opacity" aria-label="Wishlist"
            style={{ color, transition: "color 0.3s", background: "none", border: "none", cursor: "pointer", padding: 0 }}>
            <Heart size={17} strokeWidth={1.3} />
          </button>
          <button className="hover:opacity-60 transition-opacity" aria-label="Account"
            style={{ color, transition: "color 0.3s", background: "none", border: "none", cursor: "pointer", padding: 0 }}>
            <User size={17} strokeWidth={1.3} />
          </button>
          <button onClick={() => setCartOpen(true)} className="hover:opacity-60 transition-opacity" aria-label="Cart"
            style={{ color, transition: "color 0.3s", background: "none", border: "none", cursor: "pointer", padding: 0 }}>
            <ShoppingBag size={17} strokeWidth={1.3} />
          </button>
        </div>
      </div>

      {/* Desktop full-screen menu (unused on desktop but kept for safety) */}
      {menuOpen && (
        <div className="fixed inset-0 bg-white z-50 flex flex-col">
          <div className="flex items-center justify-between px-8 h-16 border-b border-gray-100">
            <a href="/"><img src="/images/black%20valencire%20text%20logo.png" alt="Valenciré" style={{ height: 22, width: "auto" }} /></a>
            <button onClick={() => setMenuOpen(false)} aria-label="Close"><X size={18} strokeWidth={1.3} /></button>
          </div>
          <nav className="flex flex-col px-8 py-10 gap-8">
            <a href="/en/shirts" className="text-[22px] font-light tracking-wide text-gray-900 hover:opacity-50" onClick={() => setMenuOpen(false)}>Shirtings</a>
            <a href="/en/trouser-pants" className="text-[22px] font-light tracking-wide text-gray-900 hover:opacity-50" onClick={() => setMenuOpen(false)}>Trousers</a>
          </nav>
        </div>
      )}
      {renderSearchOverlay()}
      {renderWishlistDrawer()}
      {renderCartDrawer()}
    </header>
  );
}
