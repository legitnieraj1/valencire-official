import React, { useState, useContext } from 'react';
import { products } from '../data/products';
import { CartContext } from '../context/CartContext';
import { useRouter } from 'next/router';
import Head from 'next/head';
import ReviewsCarousel from '../components/ReviewsCarousel';




export default function Home() {
  const [currentFilter, setCurrentFilter] = useState('all');
  const { addToCart } = useContext(CartContext);
  const router = useRouter();

  const filteredProducts = currentFilter === 'all'
    ? products
    : products.filter(p => p.category === currentFilter || (currentFilter === 'new' && p.new));

  const [selectedSizes, setSelectedSizes] = useState({});

  const handleSizeSelect = (productId, size) => {
    setSelectedSizes(prev => ({ ...prev, [productId]: size }));
  };

  const handleAddToCart = (product) => {
    const size = selectedSizes[product.id] || 'M';
    addToCart(product, size);
  };

  const handleSubscribe = (e) => {
    e.preventDefault();
    alert('Thank you for subscribing!');
    e.target.reset();
  };

  const scrollToShop = () => {
    const shop = document.getElementById('shop');
    if (shop) shop.scrollIntoView({ behavior: 'smooth' });
  };

  const scrollToShopWithFilter = (filter) => {
    setCurrentFilter(filter);
    setTimeout(() => {
      document.getElementById('shop')?.scrollIntoView({ behavior: 'smooth' });
    }, 60);
  };

  return (
    <>
      <Head>
        <title>VALENCIRE® — Crafted for the Extraordinary</title>
        <meta name="description" content="Premium Indian streetwear. Compression, Oversized, and Limited Edition drops. Shop Valencire." />
      </Head>

      {/* ================= HERO ================= */}
      <section className="hero">
        <video className="hero-video-desktop" autoPlay muted loop playsInline>
          <source src="/video.mp4" type="video/mp4" />
        </video>
        <video className="hero-video-mobile" autoPlay muted loop playsInline>
          <source src="/videomobile.mp4" type="video/mp4" />
        </video>
        <div className="hero-overlay"></div>

        <div className="hero-content">
          <p className="hero-eyebrow">New Season Drop</p>
          <h1 className="hero-headline">VALE<br />NCIRE®</h1>
          <button className="shop-btn" onClick={scrollToShop}>
            SHOP THE COLLECTION
          </button>
        </div>
      </section>

      {/* ================= FILTER BAR ================= */}
      <div className="filter-bar">
        {[
          { key: 'all',         label: 'All' },
          { key: 'compression', label: 'Compression' },
          { key: 'oversized',   label: 'Oversized' },
          { key: 'new',         label: 'New Arrivals' },
        ].map(f => (
          <button
            key={f.key}
            className={`filter-btn ${currentFilter === f.key ? 'active' : ''}`}
            onClick={() => setCurrentFilter(f.key)}
          >
            {f.label}
          </button>
        ))}
      </div>

      {/* ================= COLLECTION ================= */}
      <section className="shop" id="shop">
        <div className="section-header-row">
          <h2 className="section-title">COLLECTION</h2>
          <span className="section-discover" onClick={scrollToShop}>
            Discover More →
          </span>
        </div>

        <div className="products">
          {filteredProducts.map((product) => (
            <div className="card" key={product.id}>
              <div className="image-wrap" onClick={() => router.push(`/product?product=${product.id}`)}>
                <img src={product.images.back} className="back" alt={product.name} />
                <img src={product.images.front} className="front" alt={product.name} />
                {product.new && <div className="badge">NEW</div>}
              </div>
              <div className="card-info">
                <h3
                  className="card-title"
                  onClick={() => router.push(`/product?product=${product.id}`)}
                  style={{ cursor: 'pointer' }}
                >
                  {product.name}
                </h3>
                <p className="card-price">₹{product.price.toLocaleString()}</p>
                <div className="size-selector">
                  {['S', 'M', 'L', 'XL'].map(size => (
                    <button
                      key={size}
                      className={`size-btn ${(selectedSizes[product.id] || 'M') === size ? 'selected' : ''}`}
                      onClick={() => handleSizeSelect(product.id, size)}
                    >
                      {size}
                    </button>
                  ))}
                </div>
                <button className="card-btn" onClick={() => handleAddToCart(product)}>
                  ADD TO CART
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ================= ARCHIVE VIDEO SECTION ================= */}
      <section className="archive-video-section">
        <video autoPlay muted loop playsInline className="archive-video">
          <source src="/archive.mp4" type="video/mp4" />
        </video>
      </section>

      {/* ================= BEST SELLERS ================= */}
      <section className="bestsellers-section">
        <div className="bestsellers-header">
          <h2 className="bestsellers-title">BEST SELLERS</h2>
          <button className="bestsellers-discover" onClick={() => scrollToShopWithFilter('all')}>
            Discover More
          </button>
        </div>
        <div className="bestsellers-row">
          {products.map(product => (
            <div
              key={product.id}
              className="bs-card"
              onClick={() => router.push(`/product?product=${product.id}`)}
            >
              {product.new && <span className="bs-badge">NEW</span>}
              <div className="bs-img-wrap">
                <img src={product.images.back} alt={product.name} loading="lazy" />
              </div>
              <div className="bs-info">
                <p className="bs-name">{product.name}</p>
                <p className="bs-price">₹{product.price.toLocaleString()}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ================= VALGUIDE IMAGE ================= */}
      <section className="valguide-image-section">
        <img
          src="/VALENCIREGUIDE.png"
          alt="Valencire Guide"
          className="valguide-full-img"
        />
      </section>


      {/* ================= REVIEWS ================= */}
      <ReviewsCarousel />

      {/* ================= NEWSLETTER ================= */}
      <section className="newsletter">
        <p className="newsletter-eyebrow">Members Only</p>
        <h2>JOIN THE ARCHIVE</h2>
        <p>Early access to limited drops, exclusive collections, and member-only benefits.</p>
        <form className="newsletter-form" onSubmit={handleSubscribe}>
          <input type="email" placeholder="YOUR EMAIL ADDRESS" required />
          <button type="submit">SUBSCRIBE</button>
        </form>
      </section>
    </>
  );
}
