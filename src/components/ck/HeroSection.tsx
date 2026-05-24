"use client";
import { useState, useEffect, useRef } from "react";

const slides = [
  { image: "/images/IMG_9420.jpeg", label: "New Collection", href: "/en/shirts" },
  { image: "/images/mm.JPG", label: "Old Money", href: "/en/trouser-pants" },
];

function getSlideStyle(index: number, current: number, prev: number): React.CSSProperties {
  const transition = "transform 500ms cubic-bezier(0.25, 0.46, 0.45, 0.94)";
  const goingBackward = current < prev;

  if (index === current) {
    return { transform: "translate3d(0, 0, 0)", zIndex: goingBackward ? 1 : 2, transition };
  }
  if (goingBackward && index === prev) {
    return { transform: "translate3d(0, 100%, 0)", zIndex: 2, transition };
  }
  if (index < current) {
    return { transform: "translate3d(0, 0, -1px)", zIndex: 1, transition };
  }
  return { transform: "translate3d(0, 100%, 0)", zIndex: 1, transition };
}

const CORMORANT = "var(--font-cormorant), 'Cormorant Garamond', Georgia, serif";

export default function HeroSection() {
  const [current, setCurrent] = useState(0);
  const [isMobile, setIsMobile] = useState(false);
  const prevRef = useRef(0);
  const sectionRef = useRef<HTMLElement>(null);
  const cooldown = useRef(false);

  /* Detect mobile */
  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  const goTo = (i: number) => {
    prevRef.current = current;
    setCurrent(i);
  };

  /* Autoplay slide rotation (every 6 seconds) */
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((c) => {
        const next = (c + 1) % slides.length;
        prevRef.current = c;
        return next;
      });
    }, 6000);
    return () => clearInterval(timer);
  }, []);

  /* Wheel-to-slide (desktop only) */
  useEffect(() => {
    if (isMobile) return;
    const section = sectionRef.current;
    if (!section) return;

    const onWheel = (e: WheelEvent) => {
      const rect = section.getBoundingClientRect();
      const inView = rect.top <= 10 && rect.bottom >= window.innerHeight * 0.5;
      if (!inView) return;
      if (cooldown.current) { e.preventDefault(); return; }

      if (e.deltaY > 0 && current < slides.length - 1) {
        e.preventDefault();
        cooldown.current = true;
        prevRef.current = current;
        setCurrent((c) => Math.min(c + 1, slides.length - 1));
        setTimeout(() => { cooldown.current = false; }, 600);
      } else if (e.deltaY < 0 && current > 0) {
        e.preventDefault();
        cooldown.current = true;
        prevRef.current = current;
        setCurrent((c) => Math.max(c - 1, 0));
        setTimeout(() => { cooldown.current = false; }, 600);
      }
    };

    window.addEventListener("wheel", onWheel, { passive: false });
    return () => window.removeEventListener("wheel", onWheel);
  }, [current, isMobile]);

  /* Touch gestures & vertical scroll pinning (mobile only) */
  useEffect(() => {
    if (!isMobile) return;
    const section = sectionRef.current;
    if (!section) return;

    let startY = 0;
    let startX = 0;

    const onTouchStartLocal = (e: TouchEvent) => {
      startY = e.touches[0].clientY;
      startX = e.touches[0].clientX;
    };

    const onTouchMoveLocal = (e: TouchEvent) => {
      if (cooldown.current) return;
      const dy = startY - e.touches[0].clientY;
      const dx = startX - e.touches[0].clientX;

      // Handle vertical gestures (scroll pinning)
      if (Math.abs(dy) > Math.abs(dx) && Math.abs(dy) > 15) {
        // Swiping up (trying to scroll down)
        if (dy > 0 && current < slides.length - 1) {
          if (e.cancelable) e.preventDefault();
          cooldown.current = true;
          prevRef.current = current;
          setCurrent(current + 1);
          setTimeout(() => { cooldown.current = false; }, 600);
        }
        // Swiping down (trying to scroll up)
        else if (dy < 0 && current > 0 && window.scrollY <= 5) {
          if (e.cancelable) e.preventDefault();
          cooldown.current = true;
          prevRef.current = current;
          setCurrent(current - 1);
          setTimeout(() => { cooldown.current = false; }, 600);
        }
      }
      
      // Handle horizontal swipe
      else if (Math.abs(dx) > Math.abs(dy) && Math.abs(dx) > 40) {
        if (dx > 0 && current < slides.length - 1) {
          cooldown.current = true;
          prevRef.current = current;
          setCurrent(current + 1);
          setTimeout(() => { cooldown.current = false; }, 600);
        } else if (dx < 0 && current > 0) {
          cooldown.current = true;
          prevRef.current = current;
          setCurrent(current - 1);
          setTimeout(() => { cooldown.current = false; }, 600);
        }
      }
    };

    section.addEventListener("touchstart", onTouchStartLocal, { passive: true });
    section.addEventListener("touchmove", onTouchMoveLocal, { passive: false });

    return () => {
      section.removeEventListener("touchstart", onTouchStartLocal);
      section.removeEventListener("touchmove", onTouchMoveLocal);
    };
  }, [current, isMobile]);

  return (
    <section
      ref={sectionRef}
      className="relative w-full bg-black"
      style={{ height: "100svh", overflow: "hidden" }}
    >
      {/* ─── Background slides ─── */}
      {slides.map((slide, i) => (
        <div
          key={i}
          style={{
            position: "absolute",
            inset: 0,
            ...getSlideStyle(i, current, prevRef.current),
          }}
        >
          <img
            src={slide.image}
            alt={slide.label}
            style={{
              width: "100%",
              height: "100%",
              objectFit: isMobile ? "cover" : "contain",
              objectPosition: isMobile ? "center top" : "center center",
              display: "block",
              transform: isMobile ? "none" : "scale(1.2)",
              transformOrigin: "center center",
            }}
          />
          {/* Vignette — heavier at bottom on mobile for text legibility */}
          <div
            style={{
              position: "absolute",
              inset: 0,
              background: isMobile
                ? "linear-gradient(to bottom, rgba(0,0,0,0.02) 0%, rgba(0,0,0,0.08) 50%, rgba(0,0,0,0.72) 100%)"
                : "linear-gradient(to bottom, rgba(0,0,0,0.08) 0%, rgba(0,0,0,0.18) 45%, rgba(0,0,0,0.52) 100%)",
            }}
          />
        </div>
      ))}

      {/* ── Zone 1: Newsletter — hidden on mobile ── */}
      {!isMobile && (
        <div
          style={{
            position: "absolute",
            top: "22%",
            left: 0,
            right: 0,
            zIndex: 10,
            display: "flex",
            justifyContent: "center",
            userSelect: "none",
            textAlign: "center",
            padding: "0 32px",
          }}
        >
          <p
            style={{
              fontFamily: CORMORANT,
              fontSize: "clamp(10px, 1.1vw, 12px)",
              fontWeight: 300,
              fontStyle: "italic",
              letterSpacing: "0.06em",
              color: "rgba(255,255,255,0.55)",
              margin: 0,
              lineHeight: 1.4,
            }}
          >
            Get the latest updates by subscribing to our{" "}
            <a
              href="#newsletter"
              style={{
                color: "rgba(255,255,255,0.55)",
                textDecoration: "underline",
                textUnderlineOffset: "3px",
                textDecorationColor: "rgba(255,255,255,0.3)",
                fontStyle: "italic",
              }}
            >
              newsletter
            </a>
          </p>
        </div>
      )}

      {/* ── Zone 2+3: Title + Nav ── */}
      <div
        style={{
          position: "absolute",
          // Mobile: pin to bottom with padding; Desktop: 65% from top
          ...(isMobile
            ? { bottom: "10%", left: 0, right: 0 }
            : { top: "65%", left: 0, right: 0, transform: "translateY(-50%)" }),
          zIndex: 10,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: isMobile ? "10px" : "14px",
          userSelect: "none",
          textAlign: "center",
          padding: isMobile ? "0 24px" : "0 32px",
        }}
      >
        {/* Season title */}
        <h1
          style={{
            fontFamily: CORMORANT,
            fontSize: isMobile ? "20px" : "clamp(22px, 3.2vw, 38px)",
            fontWeight: 500,
            letterSpacing: isMobile ? "0.18em" : "0.28em",
            textTransform: "uppercase",
            color: "rgba(255,255,255,0.97)",
            lineHeight: 1,
            margin: 0,
          }}
        >
          Spring/Summer{" "}
          <span style={{ fontStyle: "italic", fontWeight: 400, letterSpacing: "0.1em" }}>
            2026
          </span>
        </h1>

        {/* Category nav */}
        <nav
          aria-label="Shop by category"
          style={{
            display: "flex",
            alignItems: "center",
            gap: isMobile ? "18px" : "clamp(20px, 3.5vw, 44px)",
          }}
        >
          <a
            href="/en/shirts"
            style={{
              fontFamily: CORMORANT,
              fontSize: isMobile ? "10px" : "clamp(10.5px, 1.15vw, 13.5px)",
              fontWeight: 400,
              letterSpacing: "0.3em",
              textTransform: "uppercase",
              color: "rgba(255,255,255,0.88)",
              textDecoration: "none",
              borderBottom: "0.5px solid rgba(255,255,255,0.45)",
              paddingBottom: "3px",
              transition: "color 0.3s ease, border-color 0.3s ease",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.color = "rgba(255,255,255,0.5)";
              e.currentTarget.style.borderBottomColor = "rgba(255,255,255,0.2)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.color = "rgba(255,255,255,0.88)";
              e.currentTarget.style.borderBottomColor = "rgba(255,255,255,0.45)";
            }}
          >
            Shirtings
          </a>

          <span
            aria-hidden="true"
            style={{
              display: "block",
              width: "0.5px",
              height: "10px",
              background: "rgba(255,255,255,0.25)",
              flexShrink: 0,
            }}
          />

          <a
            href="/en/trouser-pants"
            style={{
              fontFamily: CORMORANT,
              fontSize: isMobile ? "10px" : "clamp(10.5px, 1.15vw, 13.5px)",
              fontWeight: 400,
              letterSpacing: "0.3em",
              textTransform: "uppercase",
              color: "rgba(255,255,255,0.88)",
              textDecoration: "none",
              borderBottom: "0.5px solid rgba(255,255,255,0.45)",
              paddingBottom: "3px",
              transition: "color 0.3s ease, border-color 0.3s ease",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.color = "rgba(255,255,255,0.5)";
              e.currentTarget.style.borderBottomColor = "rgba(255,255,255,0.2)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.color = "rgba(255,255,255,0.88)";
              e.currentTarget.style.borderBottomColor = "rgba(255,255,255,0.45)";
            }}
          >
            Trousers
          </a>
        </nav>

        {/* Mobile: Discover CTA + chevron */}
        {isMobile && (
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: 6,
              marginTop: 8,
            }}
          >
            <a
              href={slides[current].href}
              style={{
                fontFamily: CORMORANT,
                fontSize: "9px",
                fontWeight: 500,
                letterSpacing: "0.35em",
                textTransform: "uppercase",
                color: "rgba(255,255,255,0.7)",
                textDecoration: "none",
              }}
            >
              Discover
            </a>
            <svg width="10" height="6" viewBox="0 0 10 6" fill="none">
              <path d="M1 1L5 5L9 1" stroke="rgba(255,255,255,0.5)" strokeWidth="0.8" />
            </svg>
          </div>
        )}
      </div>

      {/* ─── Slide indicators ─── */}
      <div
        style={{
          position: "absolute",
          bottom: isMobile ? 16 : 28,
          left: 0,
          right: 0,
          zIndex: 10,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          gap: 7,
        }}
      >
        {slides.map((_, i) => (
          <button
            key={i}
            onClick={() => goTo(i)}
            style={{
              width: i === current ? 24 : 6,
              height: 1,
              background: "white",
              opacity: i === current ? 0.85 : 0.3,
              border: "none",
              padding: 0,
              cursor: "pointer",
              transition: "width 0.45s ease, opacity 0.45s ease",
              borderRadius: 0,
            }}
            aria-label={`Slide ${i + 1}`}
          />
        ))}
      </div>

      {/* ─── Click zones prev / next (active on all devices for easy tap/click navigation) ─── */}
      <>
        <button
          style={{ position: "absolute", left: 0, top: 0, bottom: 0, width: "33%", zIndex: 9, background: "none", border: "none", cursor: "default" }}
          onClick={() => goTo(Math.max(current - 1, 0))}
          aria-label="Previous slide"
        />
        <button
          style={{ position: "absolute", right: 0, top: 0, bottom: 0, width: "33%", zIndex: 9, background: "none", border: "none", cursor: "default" }}
          onClick={() => goTo(Math.min(current + 1, slides.length - 1))}
          aria-label="Next slide"
        />
      </>
    </section>
  );
}
