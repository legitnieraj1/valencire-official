"use client";
import Header from "@/components/ck/Header";
import Footer from "@/components/ck/Footer";
import Image from "next/image";
import { useState } from "react";

interface Product {
  name: string;
  price: string;
  image: string;
  hoverImage?: string;
  href: string;
  category: "shirts" | "trousers";
}

const allProducts: Product[] = [
  { name: "Sky Blue Linen Shirt",   price: "₹2,999", image: "/images/skyblue1.JPG",       hoverImage: "/images/skyblue2.JPG",       href: "/en/products/sky-blue-linen-shirt", category: "shirts" },
  { name: "Black Oxford Shirt",     price: "₹3,499", image: "/images/BLACKSHIRT.JPG",                                                href: "/en/products/black-oxford-shirt", category: "shirts" },
  { name: "Old Money Glow Shirt",   price: "₹3,299", image: "/images/oldmoney-glow1.JPG",  hoverImage: "/images/oldmoney-glow2.JPG", href: "/en/products/old-money-glow-shirt", category: "shirts" },
  { name: "Old Money Linen Shirt",  price: "₹3,199", image: "/images/oldmoney-glow3.JPG",  hoverImage: "/images/oldmoney-glow4.JPG", href: "/en/products/old-money-linen-shirt", category: "shirts" },
  { name: "Burgundy Pleated Trousers", price: "₹3,999", image: "/images/burgundy-trousers1.JPG", hoverImage: "/images/burgundy-trousers2.JPG", href: "/en/products/burgundy-pleated-trousers", category: "trousers" },
  { name: "Burgundy Trousers II",      price: "₹3,799", image: "/images/burgundy-trousers3.JPG", hoverImage: "/images/burgundy-trousers4.JPG", href: "/en/products/burgundy-trousers-ii", category: "trousers" },
  { name: "Gray Pleated Trousers",     price: "₹3,499", image: "/images/gray-trousers1.JPG",     hoverImage: "/images/gray-trousers2.JPG",     href: "/en/products/gray-pleated-trousers", category: "trousers" },
  { name: "Gray Trousers II",          price: "₹3,299", image: "/images/gray-trousers2.JPG",                                                    href: "/en/products/gray-trousers-ii", category: "trousers" },
];

function ProductCard({ product, cols }: { product: Product; cols: number }) {
  const [hovered, setHovered] = useState(false);
  const [liked, setLiked] = useState(false);

  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="relative flex flex-col group bg-white border-r border-b border-gray-100 p-4 transition-all duration-300 hover:shadow-[0_4px_20px_rgba(0,0,0,0.03)]"
    >
      {/* Wishlist Heart Icon (Jacquemus style) */}
      <button
        onClick={(e) => {
          e.preventDefault();
          e.stopPropagation();
          setLiked(!liked);
        }}
        className="absolute top-6 right-6 z-20 p-2 rounded-full bg-white/80 backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300 shadow-sm"
        aria-label="Add to wishlist"
      >
        <svg
          width="15"
          height="15"
          viewBox="0 0 24 24"
          fill={liked ? "#000" : "none"}
          stroke="#000"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="transition-colors"
        >
          <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
        </svg>
      </button>

      {/* Image Block */}
      <a href={product.href} className="block overflow-hidden bg-[#f7f7f7] relative w-full aspect-[3/4]">
        <Image
          src={product.image}
          alt={product.name}
          fill
          className="object-cover object-top transition-transform duration-700 ease-out group-hover:scale-[1.025]"
          sizes="(max-width: 768px) 50vw, 25vw"
          style={{ opacity: hovered && product.hoverImage ? 0 : 1, transition: "opacity 0.4s ease" }}
        />
        {product.hoverImage && (
          <Image
            src={product.hoverImage}
            alt={product.name}
            fill
            className="object-cover object-top transition-transform duration-700 ease-out group-hover:scale-[1.025]"
            sizes="(max-width: 768px) 50vw, 25vw"
            style={{ opacity: hovered ? 1 : 0, transition: "opacity 0.4s ease" }}
          />
        )}
      </a>

      {/* Description Info */}
      <a href={product.href} className="block mt-4 text-left">
        <h3 className="text-xs font-normal tracking-wide text-black group-hover:text-gray-500 transition-colors uppercase">
          {product.name}
        </h3>
        <p className="text-[11px] font-light text-gray-500 mt-1">
          {product.price}
        </p>
      </a>
    </div>
  );
}

export default function CollectionsPage({
  initialCategory = "all",
}: {
  initialCategory?: "all" | "shirts" | "trousers";
}) {
  const [activeCategory, setActiveCategory] = useState<"all" | "shirts" | "trousers">(initialCategory);
  const [cols, setCols] = useState<2 | 3 | 4>(4);

  const filteredProducts = allProducts.filter(
    (p) => activeCategory === "all" || p.category === activeCategory
  );

  return (
    <div className="min-h-screen bg-white text-black font-sans flex flex-col">
      <Header />

      {/* Collections Heading & Filter Block */}
      <div className="pt-24 pb-8 px-6 md:px-16 border-b border-gray-100">
        {/* Breadcrumb Trail */}
        <div className="text-[10px] uppercase tracking-[0.2em] text-gray-400 mb-3">
          Collections / Spring-Summer 2026
        </div>

        {/* Title */}
        <h1 className="text-3xl md:text-4xl font-light tracking-wide text-black font-serif mb-6 uppercase">
          Spring/Summer 2026
        </h1>

        {/* Categories Horizontal Navigation Bar (Bottega / Prada hybrid style) */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex items-center flex-wrap gap-x-6 gap-y-2 border-b md:border-none border-gray-100 pb-3 md:pb-0">
            {[
              { label: "View All", value: "all" },
              { label: "Shirtings", value: "shirts" },
              { label: "Trousers", value: "trousers" },
            ].map((cat) => (
              <button
                key={cat.value}
                onClick={() => setActiveCategory(cat.value as any)}
                className={`text-xs uppercase tracking-[0.16em] transition-all pb-1 ${
                  activeCategory === cat.value
                    ? "font-semibold text-black border-b border-black"
                    : "font-normal text-gray-400 hover:text-black border-b border-transparent"
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>

          {/* Grid Layout Toggles (Jacquemus inspired) */}
          <div className="flex items-center justify-between md:justify-end gap-8 text-[11px] uppercase tracking-wider text-gray-500">
            {/* Column Switcher */}
            <div className="hidden md:flex items-center gap-3">
              <span>View by</span>
              <div className="flex items-center gap-1.5">
                {[2, 3, 4].map((n) => (
                  <button
                    key={n}
                    onClick={() => setCols(n as any)}
                    className={`w-6 h-6 border flex items-center justify-center transition-all ${
                      cols === n
                        ? "border-black text-black font-semibold"
                        : "border-gray-200 text-gray-400 hover:border-black hover:text-black"
                    }`}
                  >
                    {n}
                  </button>
                ))}
              </div>
            </div>

            {/* Counts and Filters */}
            <div className="flex items-center gap-6 w-full md:w-auto justify-between md:justify-end">
              <span>{filteredProducts.length} Products</span>
              <button className="flex items-center gap-1 text-black font-medium hover:opacity-60 transition-opacity">
                Filter &amp; Sort
                <span className="text-[10px]">▼</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Dynamic Product Catalog Grid */}
      <div
        className={`grid grid-cols-2 transition-all duration-500 bg-white ${
          cols === 2
            ? "md:grid-cols-2"
            : cols === 3
            ? "md:grid-cols-3"
            : "md:grid-cols-4"
        }`}
      >
        {filteredProducts.map((p) => (
          <ProductCard key={p.name} product={p} cols={cols} />
        ))}
      </div>

      {/* Full-width editorial divider (Bottega / Prada vibe) */}
      <div className="relative w-full h-[60vh] md:h-[80vh] overflow-hidden mt-12">
        <Image
          src="/images/gray-trousers1.JPG"
          alt="Valenciré SS 2026 Campaign"
          fill
          className="object-cover object-center"
          sizes="100vw"
        />
        {/* Soft elegant shadow overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-black/10 to-transparent" />

        {/* Text Overlay */}
        <div className="absolute bottom-10 left-6 md:bottom-16 md:left-16 text-left text-white max-w-md">
          <h2 className="text-3xl md:text-5xl font-light tracking-wide font-serif leading-tight">
            Old Money
          </h2>
          <p className="text-[10px] md:text-xs tracking-[0.2em] uppercase text-gray-300 mt-3.5">
            Classic silhouettes built for the modern gentleman.
          </p>
        </div>
      </div>

      <Footer />
    </div>
  );
}
