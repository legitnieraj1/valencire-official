import Image from "next/image";

export default function UnderwearSection() {
  return (
    <section className="relative w-full overflow-hidden" style={{ minHeight: "100vh" }}>
      <Image
        src="/images/BLACKSHIRT.JPG"
        alt="Valenciré night collection"
        fill
        className="object-cover object-center"
        sizes="100vw"
      />

      <div className="absolute bottom-14 left-10 text-white max-w-[320px]">
        <h2
          className="font-light leading-[0.95] mb-4"
          style={{ fontSize: "clamp(40px, 5vw, 72px)", letterSpacing: "-0.01em" }}
        >
          After Dark
        </h2>
        <p
          className="mb-6 leading-relaxed opacity-95"
          style={{
            fontFamily: "var(--font-cormorant), 'Cormorant Garamond', serif",
            fontSize: 15,
            fontWeight: 300,
            fontStyle: "italic",
            letterSpacing: "0.01em",
          }}
        >
          Precision tailoring for the evening. Bold silhouettes refined for every occasion.
        </p>
        <div className="flex items-center gap-6">
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
        </div>
      </div>
    </section>
  );
}
