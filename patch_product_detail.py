import re

with open("src/components/ck/ProductDetail.tsx", "r") as f:
    content = f.read()

# Insert ZaraTabs
zara_tabs_code = """    </div>
  );
}

function ZaraTabs({ product }: { product: ProductData }) {
  const [activeTab, setActiveTab] = useState<"DESCRIPTION" | "COMPOSITION" | "MEASUREMENTS">("DESCRIPTION");

  return (
    <div className="w-full font-sans">
      {/* Tabs Header */}
      <div className="flex items-center gap-6 border-b border-gray-100 mb-6 pb-4 overflow-x-auto no-scrollbar">
        {(["DESCRIPTION", "COMPOSITION", "MEASUREMENTS"] as const).map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`text-[10px] font-semibold tracking-[0.15em] uppercase whitespace-nowrap transition-colors ${
              activeTab === tab ? "text-black" : "text-gray-400 hover:text-gray-600"
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Tabs Content */}
      <div className="text-[12px] text-gray-500 font-light leading-relaxed tracking-wide min-h-[120px]">
        {activeTab === "DESCRIPTION" && (
          <div className="animate-fade-in">
            <p className="mb-4">{product.description}</p>
            <ul className="list-disc pl-4 space-y-1.5">
              {product.details.map((d) => (
                <li key={d}>{d}</li>
              ))}
            </ul>
          </div>
        )}
        {activeTab === "COMPOSITION" && (
          <div className="animate-fade-in">
            <p className="mb-2 uppercase text-[10px] font-semibold text-black tracking-widest">Fabric</p>
            <p className="mb-4">{product.fabric}</p>
            <p className="mb-2 uppercase text-[10px] font-semibold text-black tracking-widest">Care Instructions</p>
            <p>Dry clean only or cold hand wash. Do not tumble dry. Cool iron inside out.</p>
          </div>
        )}
        {activeTab === "MEASUREMENTS" && (
          <div className="animate-fade-in">
            <p className="mb-2 uppercase text-[10px] font-semibold text-black tracking-widest">Fit</p>
            <p className="mb-4">{product.fit}</p>
            <p>Model is 185cm / 6'1" and is wearing size M/32.</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default function ProductDetail({ product }: { product: ProductData }) {"""

content = content.replace('    </div>\n  );\n}\n\nexport default function ProductDetail({ product }: { product: ProductData }) {', zara_tabs_code)

# Replace the mobile block
mobile_block_start = "  /* ──────────────────────────────────────────────────────────\n     MOBILE RESPONSIVE PORTRAIT ONLY LAYOUT (Fendi / Hermès Vibe)\n     ────────────────────────────────────────────────────────── */"
desktop_block_start = "  /* ──────────────────────────────────────────────────────────\n     EXISTING DESKTOP LANDING PAGE LAYOUT (UNTOUCHED)\n     ────────────────────────────────────────────────────────── */"

new_mobile_block = """  /* ──────────────────────────────────────────────────────────
     MOBILE RESPONSIVE PORTRAIT ONLY LAYOUT (Luxury Hybrid)
     ────────────────────────────────────────────────────────── */
  if (isMobile) {
    const recommendedSlugs = product.category === "shirts"
      ? ["burgundy-pleated-trousers", "gray-pleated-trousers"]
      : ["sky-blue-linen-shirt", "black-oxford-shirt"];

    return (
      <div className="min-h-screen bg-white text-black font-sans flex flex-col pb-24 relative overflow-x-hidden">
        <Header />

        {/* 1. Image Slider Section (Hermès / Fendi hybrid) */}
        <div
          ref={sliderRef}
          className="relative w-full aspect-[4/5] bg-[#f5f5f5] overflow-hidden select-none touch-pan-y"
          onMouseDown={(e) => onDragStart(e.clientX)}
          onMouseMove={(e) => onDragMove(e.clientX)}
          onMouseUp={onDragEnd}
          onMouseLeave={onDragEnd}
          onTouchStart={(e) => onDragStart(e.touches[0].clientX)}
          onTouchMove={(e) => onDragMove(e.touches[0].clientX)}
          onTouchEnd={onDragEnd}
        >
          {/* Back Arrow overlaid on top-left */}
          <a
            href="/en/collections"
            className="absolute top-20 left-4 z-30 w-8 h-8 rounded-full bg-white/50 backdrop-blur-md flex items-center justify-center text-black border border-white/20 hover:bg-white transition-colors"
            aria-label="Back to collections"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2">
              <line x1="19" y1="12" x2="5" y2="12" />
              <polyline points="12 19 5 12 12 5" />
            </svg>
          </a>

          {/* Slider Strip */}
          <div
            className="flex h-full transition-transform duration-500 ease-[cubic-bezier(0.25,0.46,0.45,0.94)]"
            style={{
              transform: `translateX(-${currentSlide * 100}%)`,
              width: `${totalSlides * 100}%`,
            }}
          >
            {product.images.map((src, i) => (
              <div key={i} className="w-full h-full relative" style={{ flex: "0 0 100%" }}>
                <Image
                  src={src}
                  alt={product.name}
                  fill
                  className="object-contain object-center"
                  sizes="100vw"
                  priority={i === 0}
                  draggable={false}
                />
              </div>
            ))}
          </div>

          {/* Slide Indicator Count on bottom-left (Louboutin style) */}
          <div className="absolute bottom-5 left-5 z-20 flex items-center gap-3 bg-white/60 backdrop-blur-md px-3 py-1.5 rounded-full border border-white/30 shadow-sm">
            <button onClick={(e) => { e.stopPropagation(); goTo(currentSlide - 1); }} disabled={currentSlide === 0} className="text-black disabled:opacity-30">
              <ChevronLeft />
            </button>
            <span className="text-[10px] font-semibold tracking-[0.1em] text-black">
              {currentSlide + 1} / {totalSlides}
            </span>
            <button onClick={(e) => { e.stopPropagation(); goTo(currentSlide + 1); }} disabled={currentSlide === totalSlides - 1} className="text-black disabled:opacity-30">
              <ChevronRight />
            </button>
          </div>

          {/* Dot Indicators on bottom-center (Hermès style) */}
          <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-20 flex items-center gap-1.5">
            {product.images.map((_, i) => (
              <button
                key={i}
                onClick={(e) => { e.stopPropagation(); goTo(i); }}
                className={`h-1.5 rounded-full transition-all duration-300 ${
                  i === currentSlide ? "w-5 bg-black" : "w-1.5 bg-black/20"
                }`}
                aria-label={`Slide ${i + 1}`}
              />
            ))}
          </div>
        </div>

        {/* 2. Product Information (Christian Louboutin / Fendi hybrid) */}
        <div className="px-5 pt-7 flex flex-col text-left">
          {/* Breadcrumbs & Tag */}
          <div className="flex items-center justify-between mb-3">
            <span className="text-[9px] font-semibold uppercase tracking-[0.15em] text-[#c0392b]">
              {product.category === "shirts" ? "FEW ITEMS LEFT" : "NEW IN"}
            </span>
            <span className="text-[9px] tracking-[0.18em] uppercase text-gray-400">
              COLLECTIONS / {product.category === "shirts" ? "SHIRTS" : "TROUSERS"}
            </span>
          </div>

          {/* Name & Heart Row */}
          <div className="flex items-start justify-between gap-4">
            <h1 className="text-2xl md:text-3xl font-serif text-black uppercase tracking-wide leading-tight" style={{ fontFamily: "var(--font-cormorant), serif" }}>
              {product.name}
            </h1>
            <button
              onClick={() => setLiked(!liked)}
              className="p-1 text-black active:scale-90 transition-transform mt-1"
              aria-label="Add to wishlist"
            >
              <svg
                width="22"
                height="22"
                viewBox="0 0 24 24"
                fill={liked ? "#000" : "none"}
                stroke="#000"
                strokeWidth="1.2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
              </svg>
            </button>
          </div>

          {/* Subtitle / Material */}
          <span className="text-[11px] text-gray-500 font-light mt-1.5 uppercase tracking-widest">
            {product.fabric}
          </span>

          {/* Price */}
          <span className="text-lg font-medium text-black mt-4 font-sans tracking-wide">
            {product.price} <span className="text-[10px] text-gray-400 font-light ml-1">MRP INCL. OF ALL TAXES</span>
          </span>

          {/* Colors Selection Swatches (Hermès inspired) */}
          <div className="mt-8">
            <span className="text-[10px] font-semibold uppercase tracking-[0.15em] text-black block mb-3">
              Color: <span className="font-light ml-1">{product.category === "shirts" ? "Atelier Sky Blue" : "Sartorial Burgundy"}</span>
            </span>
            <div className="flex items-center gap-3">
              {/* Active Swatch */}
              <div className="p-0.5 rounded-full border border-black flex items-center justify-center">
                <div className="w-9 h-9 rounded-full overflow-hidden relative">
                  <Image
                    src={product.images[0]}
                    alt="Color swatch"
                    fill
                    className="object-cover object-center"
                  />
                </div>
              </div>
              {/* Other Swatches (Dummy for aesthetic purposes) */}
              <div className="p-0.5 rounded-full border border-transparent flex items-center justify-center hover:border-gray-300 transition-colors">
                <div className="w-9 h-9 rounded-full overflow-hidden relative opacity-60">
                  <Image
                    src={product.category === "shirts" ? "/images/BLACKSHIRT.JPG" : "/images/gray-trousers1.JPG"}
                    alt="Color swatch"
                    fill
                    className="object-cover object-center"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Size Select Toggles & Links (Fendi inspired) */}
          <div className="mt-10">
            <div className="flex items-center justify-between text-[11px] mb-3">
              <button className="text-gray-500 underline underline-offset-4 font-light tracking-wide uppercase">
                Find your size
              </button>
              <button className="text-gray-500 underline underline-offset-4 font-light tracking-wide uppercase">
                Size Guide
              </button>
            </div>

            {/* Custom Sleek Dropdown Selection Button */}
            <button
              onClick={() => setSizePickerOpen(!sizePickerOpen)}
              className="w-full h-12 border border-gray-300 rounded-full px-5 flex items-center justify-between text-xs tracking-wider uppercase font-medium hover:border-black transition-colors"
            >
              <span>{selectedSize ? `Size: ${selectedSize}` : "Select size"}</span>
              <svg
                width="12"
                height="8"
                viewBox="0 0 12 8"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.2"
                className={`transition-transform duration-300 ${sizePickerOpen ? "rotate-180" : ""}`}
              >
                <path d="M1 1L6 6L11 1" />
              </svg>
            </button>

            {/* Slide-down Size Selector Panel */}
            <div
              className={`transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] overflow-hidden ${
                sizePickerOpen ? "max-h-[300px] mt-4 opacity-100" : "max-h-0 opacity-0"
              }`}
            >
              <div className="grid grid-cols-4 gap-2.5 bg-white p-1">
                {product.sizes.map((s) => (
                  <button
                    key={s}
                    onClick={() => {
                      setSelectedSize(s);
                      setSizePickerOpen(false);
                    }}
                    className={`h-11 rounded-full text-[11px] font-semibold tracking-wider flex items-center justify-center transition-all ${
                      selectedSize === s
                        ? "bg-black text-white border-black"
                        : "bg-white text-black border border-gray-200 hover:border-black"
                    }`}
                  >
                    {s}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Zara-Style Interactive Tabs Block */}
          <div className="mt-10 pt-8 border-t border-gray-100">
            <ZaraTabs product={product} />
          </div>

          {/* Complete the Look Section */}
          <div className="mt-12 pt-8 border-t border-gray-100 mb-6">
            <h3 className="text-sm font-semibold tracking-[0.15em] uppercase text-black mb-6 text-center" style={{ fontFamily: "var(--font-cormorant), serif" }}>
              Complete the Look
            </h3>
            <div className="flex gap-4 overflow-x-auto pb-6 snap-x -mx-5 px-5 no-scrollbar">
              {recommendedSlugs.map((recSlug) => {
                const isRecShirt = recSlug.includes("shirt");
                const recName = isRecShirt ? "Sky Blue Linen Shirt" : "Burgundy Pleated Trousers";
                const recPrice = isRecShirt ? "₹2,999" : "₹3,999";
                const recImg = isRecShirt ? "/images/skyblue1.JPG" : "/images/burgundy-trousers1.JPG";
                return (
                  <a href={`/en/products/${recSlug}`} key={recSlug} className="snap-start flex-shrink-0 w-[180px] group">
                    <div className="relative w-full aspect-[3/4] bg-[#f5f5f5] overflow-hidden mb-3">
                      <Image
                        src={recImg}
                        alt={recName}
                        fill
                        className="object-cover object-center group-hover:scale-105 transition-transform duration-700"
                      />
                    </div>
                    <h4 className="text-[11px] font-medium tracking-wide uppercase text-black mb-1">{recName}</h4>
                    <p className="text-[11px] font-light text-gray-500">{recPrice}</p>
                  </a>
                );
              })}
            </div>
          </div>
        </div>

        {/* Sticky Floating CTA Cart Button Row (H&M / Fendi inspired) */}
        <div className="fixed bottom-0 left-0 right-0 bg-white/85 backdrop-blur-md border-t border-gray-100 p-4 pb-6 z-40 flex items-center gap-3">
          <button
            onClick={() => {
              if (!selectedSize) {
                setSizePickerOpen(true);
                return;
              }
              alert(`Added ${product.name} (Size ${selectedSize}) to bag!`);
            }}
            className="w-full bg-black text-white hover:bg-gray-900 active:scale-[0.99] transition-all py-3.5 rounded-full text-[11px] font-semibold uppercase tracking-[0.16em] flex items-center justify-center gap-2 shadow-xl"
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
              <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z" />
              <line x1="3" y1="6" x2="21" y2="6" />
              <path d="M16 10a4 4 0 0 1-8 0" />
            </svg>
            ADD TO BAG — {product.price}
          </button>
        </div>

        {/* Extra padding at bottom so scroll clears the sticky CTA */}
        <div className="h-10"></div>
        <Footer />
      </div>
    );
  }\n\n"""

# Do the split safely
start_idx = content.find(mobile_block_start)
end_idx = content.find(desktop_block_start)

if start_idx != -1 and end_idx != -1:
    new_content = content[:start_idx] + new_mobile_block + content[end_idx:]
    with open("src/components/ck/ProductDetail.tsx", "w") as f:
        f.write(new_content)
    print("Patched ProductDetail.tsx successfully")
else:
    print("Could not find blocks to patch")

