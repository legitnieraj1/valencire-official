"use client";
import Image from "next/image";
import { motion } from "framer-motion";

const signatureContainerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.12, // Calligraphic delay between letters
      delayChildren: 0.2, // Cinematic initial pause
    }
  }
} as const;

const letterVariants = {
  hidden: { 
    opacity: 0, 
    y: 18, 
    scale: 0.75, 
    skewX: 12,
    filter: "blur(4px)" 
  },
  visible: { 
    opacity: 1, 
    y: 0, 
    scale: 1, 
    skewX: 0,
    filter: "blur(0px)",
    transition: { 
      type: "spring" as const, 
      stiffness: 90, 
      damping: 13 
    } 
  }
} as const;

export default function HeritageSection() {
  return (
    <section className="relative w-full overflow-hidden" style={{ minHeight: "100vh" }}>
      <div className="grid grid-cols-2 h-full w-full absolute inset-0">
        <div className="relative overflow-hidden">
          <Image
            src="/images/gray-pleated-trousers1.JPG"
            alt="Valenciré gray pleated trousers"
            fill
            className="object-cover object-center"
            sizes="50vw"
          />
        </div>
        <div className="relative overflow-hidden">
          <Image
            src="/images/gray-pleated-trousers2.JPG"
            alt="Valenciré gray pleated trousers street"
            fill
            className="object-cover object-center"
            sizes="50vw"
          />
        </div>
      </div>

      {/* Valenciré signature — center-upper area between the two panels */}
      <motion.div
        variants={signatureContainerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.4 }}
        style={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%) rotate(-20deg)",
          pointerEvents: "none",
          zIndex: 10,
          textAlign: "center",
          whiteSpace: "nowrap",
        }}
      >
        <span
          style={{
            fontFamily: "'Snell Roundhand', var(--font-snell), 'Dancing Script', cursive",
            fontSize: "clamp(52px, 7vw, 110px)",
            fontWeight: 400,
            color: "rgba(180, 120, 100, 0.92)",
            lineHeight: 1,
            display: "inline-block",
            letterSpacing: "0.02em",
            textShadow: "0 2px 18px rgba(0,0,0,0.35)",
          }}
        >
          {/* V */}
          <motion.span
            variants={letterVariants}
            style={{ display: "inline-block", fontSize: "1.12em", transformOrigin: "bottom left" }}
          >
            V
          </motion.span>
          
          {/* alencire */}
          {["a", "l", "e", "n", "c", "i", "r", "e"].map((char, index) => (
            <motion.span
              key={index}
              variants={letterVariants}
              style={{ display: "inline-block", transformOrigin: "bottom left" }}
            >
              {char}
            </motion.span>
          ))}
        </span>
      </motion.div>

      <div className="absolute bottom-14 left-10 text-white max-w-[380px] z-10">
        <h2
          className="font-light leading-[0.9] mb-4"
          style={{ fontSize: "clamp(56px, 7vw, 100px)", letterSpacing: "-0.015em" }}
        >
          Old Money
        </h2>
        <p
          className="mb-6 leading-relaxed opacity-90"
          style={{
            fontFamily: "var(--font-cormorant), 'Cormorant Garamond', serif",
            fontSize: 15,
            fontWeight: 300,
            fontStyle: "italic",
            letterSpacing: "0.01em",
            maxWidth: 340,
          }}
        >
          Quiet luxury in motion. Classic silhouettes reimagined for the modern gentleman.
        </p>
        <div className="flex items-center gap-6">
          <a
            href="/en/trouser-pants"
            className="hover:opacity-60 transition-opacity"
            style={{
              fontFamily: "var(--font-cormorant), 'Cormorant Garamond', serif",
              fontSize: 14,
              fontWeight: 700,
              letterSpacing: "0.08em",
              textDecoration: "none",
              color: "white",
              borderBottom: "1px solid rgba(255,255,255,0.6)",
              paddingBottom: 2,
            }}
          >
            Shop Trousers
          </a>
          <a
            href="/en/shirts"
            className="hover:opacity-60 transition-opacity"
            style={{
              fontFamily: "var(--font-cormorant), 'Cormorant Garamond', serif",
              fontSize: 14,
              fontWeight: 700,
              letterSpacing: "0.08em",
              textDecoration: "none",
              color: "white",
              borderBottom: "1px solid rgba(255,255,255,0.6)",
              paddingBottom: 2,
            }}
          >
            Shop Shirts
          </a>
        </div>
      </div>
    </section>
  );
}
