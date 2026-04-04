import React, { useState, useEffect, useContext } from 'react';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { products } from '../data/products';
import { CartContext } from '../context/CartContext';

export default function Product() {
  const router = useRouter();
  const { product: productIdParam } = router.query;
  const { addToCart, cart } = useContext(CartContext);

  const [product, setProduct] = useState(null);
  const [size, setSize] = useState('M');
  const [quantity, setQuantity] = useState(1);
  const [showStickyBar, setShowStickyBar] = useState(false);

  useEffect(() => {
    if (productIdParam) {
      const found = products.find(p => p.id === parseInt(productIdParam, 10));
      setProduct(found || products[0]);
    } else {
      setProduct(products[0]);
    }
  }, [productIdParam]);

  useEffect(() => {
    const handleScroll = () => setShowStickyBar(window.scrollY > 300);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  if (!product) return <div style={{ minHeight: '100vh', background: '#FFFFFF' }} />;

  const changeQty = (amount) => setQuantity(prev => Math.max(1, prev + amount));

  const handleAddToCart = () => {
    addToCart(product, size, quantity);
  };

  return (
    <>
      <Head>
        <title>{product.name} — VALENCIRE®</title>
        <meta name="description" content={product.desc} />
      </Head>

      <style dangerouslySetInnerHTML={{ __html: `
        /* ══════════════════════════════════════════════════
           PRODUCT PAGE — SICSENSE EDITORIAL LIGHT THEME
           ══════════════════════════════════════════════════ */

        body {
          background: #FFFFFF;
          color: #0A0A0A;
          font-family: 'Inter', 'Helvetica Neue', Arial, sans-serif;
          overflow-x: hidden;
          -webkit-font-smoothing: antialiased;
        }

        /* ─── Sticky Action Bar ─── */
        .sticky-action-bar {
          position: fixed;
          bottom: 24px;
          left: 50%;
          transform: translateX(-50%) translateY(120%);
          width: calc(100% - 48px);
          max-width: 520px;
          background: #0A0A0A;
          border: 1px solid rgba(255,255,255,0.08);
          padding: 14px 20px;
          border-radius: 2px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          z-index: 6000;
          transition: transform 0.4s cubic-bezier(0.4, 0, 0.2, 1);
        }

        .sticky-action-bar.visible {
          transform: translateX(-50%) translateY(0);
        }

        .sticky-info { display: flex; flex-direction: column; gap: 2px; }

        .sticky-price {
          font-size: 16px; font-weight: 700; color: #fff; letter-spacing: 1px;
        }

        .sticky-size {
          font-size: 11px; color: rgba(255,255,255,0.5);
          text-transform: uppercase; letter-spacing: 2px;
        }

        .sticky-btn {
          background: #fff; color: #0A0A0A; border: none;
          padding: 11px 28px; border-radius: 2px; font-size: 11px;
          font-weight: 800; letter-spacing: 2px; text-transform: uppercase;
          cursor: pointer; transition: opacity 200ms ease;
          font-family: 'Inter', sans-serif;
        }

        .sticky-btn:hover { opacity: 0.85; }

        /* ─── Product Hero ─── */
        .prod-hero {
          min-height: 100vh;
          padding-top: 100px;
          display: flex;
          align-items: center;
          justify-content: center;
          background: #FFFFFF;
        }

        .prod-content-wrap {
          width: 100%;
          max-width: 1400px;
          padding: 40px 8%;
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 80px;
          align-items: start;
        }

        .prod-text {
          opacity: 0;
          animation: pFadeLeft 600ms ease forwards;
        }

        .prod-eyebrow {
          font-size: 10px; letter-spacing: 4px; color: #8A8A8A;
          margin-bottom: 16px; text-transform: uppercase; font-weight: 600;
        }

        .prod-title {
          font-size: clamp(32px, 4.5vw, 60px);
          letter-spacing: 3px; line-height: 1.05; margin-bottom: 18px;
          font-weight: 900; color: #0A0A0A; text-transform: uppercase;
        }

        .prod-desc {
          font-size: 14px; line-height: 1.8; color: #3A3A3A;
          margin-bottom: 24px; letter-spacing: 0.3px;
        }

        .prod-price {
          font-size: 28px; letter-spacing: 2px; margin-bottom: 32px;
          font-weight: 700; color: #0A0A0A;
        }

        .prod-divider {
          margin-top: 28px; padding-top: 28px; border-top: 1px solid #E8E8E8;
        }

        .prod-label {
          font-size: 10px; letter-spacing: 3px; color: #8A8A8A;
          margin-bottom: 14px; text-transform: uppercase; font-weight: 700;
        }

        .prod-sizes {
          display: flex; gap: 8px; margin-bottom: 24px; flex-wrap: wrap;
        }

        .prod-size-btn {
          padding: 10px 18px;
          background: transparent; border: 1px solid #E0E0E0; color: #0A0A0A;
          font-size: 11px; letter-spacing: 2px; cursor: pointer;
          transition: all 200ms ease; text-transform: uppercase;
          font-family: 'Inter', sans-serif; font-weight: 600; border-radius: 2px;
        }

        .prod-size-btn:hover { border-color: #0A0A0A; }

        .prod-size-btn.active {
          background: #0A0A0A; color: #fff; border-color: #0A0A0A;
        }

        .prod-qty {
          display: flex; align-items: center; gap: 20px; margin-bottom: 28px;
        }

        .prod-qty-label {
          font-size: 10px; letter-spacing: 3px; color: #8A8A8A;
          text-transform: uppercase; font-weight: 700;
        }

        .prod-qty-ctrl {
          display: flex; align-items: center;
          border: 1px solid #E0E0E0; border-radius: 2px; overflow: hidden;
        }

        .prod-qty-btn {
          width: 40px; height: 40px; background: transparent; border: none;
          border-left: 1px solid #E0E0E0; color: #0A0A0A; cursor: pointer;
          font-size: 18px; display: flex; align-items: center; justify-content: center;
          transition: background 200ms ease; font-family: 'Inter', sans-serif;
        }

        .prod-qty-btn:first-child { border-left: none; }
        .prod-qty-btn:hover { background: #F5F4F0; }

        .prod-qty-num {
          font-size: 14px; min-width: 48px; text-align: center;
          letter-spacing: 2px; font-weight: 600; padding: 0 4px;
        }

        .prod-cta { display: flex; gap: 12px; flex-wrap: wrap; }

        .prod-btn-primary {
          flex: 1; min-width: 180px; padding: 16px 32px; font-size: 11px;
          letter-spacing: 3px; cursor: pointer; transition: background 200ms ease;
          text-transform: uppercase; font-weight: 800; background: #0A0A0A;
          color: #fff; border: none; border-radius: 2px;
          font-family: 'Inter', sans-serif;
        }

        .prod-btn-primary:hover { background: #2a2a2a; }

        .prod-btn-secondary {
          flex: 1; min-width: 180px; padding: 16px 32px; font-size: 11px;
          letter-spacing: 3px; cursor: pointer; transition: all 200ms ease;
          text-transform: uppercase; font-weight: 700; background: transparent;
          color: #0A0A0A; border: 1.5px solid #0A0A0A; border-radius: 2px;
          font-family: 'Inter', sans-serif;
        }

        .prod-btn-secondary:hover { background: #0A0A0A; color: #fff; }

        /* ─── Product Image Card ─── */
        .prod-images {
          opacity: 0;
          animation: pFadeRight 600ms ease forwards 200ms;
          display: flex; align-items: center; justify-content: center;
        }

        .image-hover-card {
          position: relative; width: 100%; max-width: 520px;
          aspect-ratio: 3 / 4; border-radius: 2px; overflow: hidden;
          background: #F5F4F0; border: 1px solid #E8E8E8; cursor: pointer;
        }

        .image-hover-card img {
          position: absolute; inset: 0; width: 100%; height: 100%;
          object-fit: contain;
          transition: opacity 400ms ease, transform 400ms ease;
        }

        .img-back { opacity: 1; transform: scale(1); }
        .img-front { opacity: 0; transform: scale(1.03); }

        @media (min-width: 769px) {
          .image-hover-card:hover .img-back { opacity: 0; transform: scale(1.04); }
          .image-hover-card:hover .img-front { opacity: 1; transform: scale(1); }
        }

        .image-label {
          position: absolute; bottom: 16px; left: 50%;
          transform: translateX(-50%); padding: 6px 16px;
          font-size: 9px; letter-spacing: 3px;
          background: rgba(10,10,10,0.75); border-radius: 999px;
          color: #fff; text-transform: uppercase; font-weight: 700; z-index: 10;
        }

        /* ─── Features ─── */
        .prod-features {
          padding: 100px 8%; background: #F5F4F0; border-top: 1px solid #E8E8E8;
        }

        .prod-section-header {
          text-align: center; max-width: 600px; margin: 0 auto 64px;
        }

        .prod-section-label {
          font-size: 10px; letter-spacing: 4px; color: #8A8A8A;
          margin-bottom: 10px; text-transform: uppercase; font-weight: 700;
        }

        .prod-section-title {
          font-size: clamp(24px, 3vw, 38px); letter-spacing: 5px;
          font-weight: 900; text-transform: uppercase; color: #0A0A0A;
          line-height: 1.05;
        }

        .prod-section-desc {
          margin-top: 12px; font-size: 14px; line-height: 1.8;  color: #8A8A8A;
        }

        .prod-features-grid {
          display: grid; grid-template-columns: repeat(2, 1fr);
          gap: 2px; max-width: 960px; margin: 0 auto;
        }

        .feature-card {
          padding: 36px 32px; background: #FFFFFF;
          transition: box-shadow 200ms ease;
        }

        .feature-card:hover { box-shadow: 0 4px 20px rgba(0,0,0,0.05); }

        .feature-icon {
          width: 44px; height: 44px; margin-bottom: 18px;
          display: flex; align-items: center; justify-content: center;
          background: #F5F4F0; border-radius: 2px;
        }

        .feature-icon svg {
          width: 20px; height: 20px; stroke: #0A0A0A;
          stroke-width: 1.5; fill: none;
        }

        .feature-card h3 {
          font-size: 12px; letter-spacing: 2.5px; margin-bottom: 10px;
          font-weight: 800; text-transform: uppercase; color: #0A0A0A;
        }

        .feature-card p { font-size: 13px; line-height: 1.75; color: #3A3A3A; }

        /* ─── Specs ─── */
        .prod-specs {
          padding: 100px 8%; background: #FFFFFF; border-top: 1px solid #E8E8E8;
        }

        .prod-specs-container { max-width: 860px; margin: 0 auto; }

        .prod-specs-grid {
          display: grid; grid-template-columns: repeat(2, 1fr);
          border: 1px solid #E8E8E8; margin-top: 48px;
        }

        .spec-item {
          padding: 22px 26px; background: #FFFFFF; display: flex;
          flex-direction: column; gap: 6px;
          border-bottom: 1px solid #E8E8E8; border-right: 1px solid #E8E8E8;
        }

        .spec-item:nth-child(even) { border-right: none; }

        .spec-label {
          font-size: 10px; letter-spacing: 3px; color: #8A8A8A;
          text-transform: uppercase; font-weight: 700;
        }

        .spec-value { font-size: 14px; font-weight: 600; color: #0A0A0A; }

        /* ─── Animations ─── */
        @keyframes pFadeLeft {
          from { opacity: 0; transform: translateX(-24px); }
          to   { opacity: 1; transform: translateX(0); }
        }

        @keyframes pFadeRight {
          from { opacity: 0; transform: translateX(24px); }
          to   { opacity: 1; transform: translateX(0); }
        }

        /* ─── Responsive ─── */
        @media (max-width: 1024px) {
          .prod-content-wrap {
            grid-template-columns: 1fr; gap: 40px; padding: 60px 6% 40px;
          }
          .prod-images { order: -1; }
        }

        @media (max-width: 768px) {
          .prod-hero { padding-top: 80px; }
          .prod-content-wrap { padding: 48px 20px 32px; gap: 28px; }
          .prod-title { font-size: 32px; letter-spacing: 2px; }
          .prod-price { font-size: 22px; margin-bottom: 20px; }
          .prod-features, .prod-specs { padding: 56px 20px; }
          .prod-features-grid { grid-template-columns: 1fr; }
          .prod-specs-grid { grid-template-columns: 1fr; }
          .spec-item:nth-child(even) { border-right: 1px solid #E8E8E8; }
          .prod-cta { flex-direction: column; }
          .prod-btn-primary, .prod-btn-secondary { width: 100%; }
          .image-hover-card { max-width: 100%; }
        }
      ` }} />

      <div style={{ background: '#FFFFFF', color: '#0A0A0A', minHeight: '100vh' }}>

        {/* ── Sticky Action Bar ── */}
        <div className={`sticky-action-bar ${showStickyBar ? 'visible' : ''}`}>
          <div className="sticky-info">
            <div className="sticky-price">₹{product.price.toLocaleString()}</div>
            <div className="sticky-size">Size: {size}</div>
          </div>
          <button className="sticky-btn" onClick={handleAddToCart}>ADD TO CART</button>
        </div>

        {/* ── Hero ── */}
        <section className="prod-hero">
          <div className="prod-content-wrap">
            <div className="prod-text">
              <div className="prod-eyebrow">NEW ARRIVAL</div>
              <h1 className="prod-title">{product.name}</h1>
              <p className="prod-desc">{product.desc}</p>
              <div className="prod-price">₹{product.price.toLocaleString()}</div>

              <div className="prod-divider">
                <div className="prod-label">SELECT SIZE</div>
                <div className="prod-sizes">
                  {['S', 'M', 'L', 'XL', 'XXL'].map(s => (
                    <button
                      key={s}
                      className={`prod-size-btn ${size === s ? 'active' : ''}`}
                      onClick={() => setSize(s)}
                    >
                      {s}
                    </button>
                  ))}
                </div>

                <div className="prod-qty">
                  <span className="prod-qty-label">Quantity</span>
                  <div className="prod-qty-ctrl">
                    <button className="prod-qty-btn" onClick={() => changeQty(-1)}>−</button>
                    <span className="prod-qty-num">{quantity}</span>
                    <button className="prod-qty-btn" onClick={() => changeQty(1)}>+</button>
                  </div>
                </div>

                <div className="prod-cta">
                  <button className="prod-btn-primary" onClick={handleAddToCart}>
                    ADD TO CART — ₹{(product.price * quantity).toLocaleString()}
                  </button>
                  <button className="prod-btn-secondary" onClick={() => {
                    handleAddToCart();
                    router.push('/');
                  }}>
                    BUY NOW
                  </button>
                </div>
              </div>
            </div>

            <div className="prod-images">
              <div className="image-hover-card">
                <img src={product.images.back} className="img-back" alt={`${product.name} back`} />
                <img src={product.images.front} className="img-front" alt={`${product.name} front`} />
                <div className="image-label">HOVER TO REVEAL</div>
              </div>
            </div>
          </div>
        </section>

        {/* ── Features ── */}
        <section className="prod-features">
          <div className="prod-section-header">
            <div className="prod-section-label">CRAFTED FOR PERFECTION</div>
            <h2 className="prod-section-title">PREMIUM ENGINEERING</h2>
            <p className="prod-section-desc">Every detail meticulously designed. Every thread purposefully placed.</p>
          </div>

          <div className="prod-features-grid">
            <div className="feature-card">
              <div className="feature-icon">
                <svg viewBox="0 0 24 24"><path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/></svg>
              </div>
              <h3>Advanced Compression</h3>
              <p>Engineered to optimize blood flow and muscle support during intense activity.</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">
                <svg viewBox="0 0 24 24"><path d="M3 15v4c0 1.1.9 2 2 2h14a2 2 0 0 0 2-2v-4M17 8l-5-5-5 5M12 3v12"/></svg>
              </div>
              <h3>Moisture Wicking</h3>
              <p>Premium hydrophobic fibers keep you dry by rapidly dispersing sweat.</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">
                <svg viewBox="0 0 24 24"><circle cx="12" cy="12" r="10"/><path d="M12 8v4l3 3"/></svg>
              </div>
              <h3>Long-lasting Durability</h3>
              <p>Triple-needle stitch construction ensures the fabric lasts through every session.</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">
                <svg viewBox="0 0 24 24"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/></svg>
              </div>
              <h3>Skin-Friendly Fabric</h3>
              <p>Hypoallergenic materials designed to be gentle on all skin types.</p>
            </div>
          </div>
        </section>

        {/* ── Specs ── */}
        <section className="prod-specs">
          <div className="prod-specs-container">
            <div className="prod-section-header">
              <div className="prod-section-label">PRODUCT DETAILS</div>
              <h2 className="prod-section-title">SPECIFICATIONS</h2>
            </div>
            <div className="prod-specs-grid">
              <div className="spec-item">
                <span className="spec-label">Material</span>
                <span className="spec-value">75% Nylon, 25% Spandex</span>
              </div>
              <div className="spec-item">
                <span className="spec-label">Weight</span>
                <span className="spec-value">220 GSM</span>
              </div>
              <div className="spec-item">
                <span className="spec-label">Fit</span>
                <span className="spec-value">Compression / True to size</span>
              </div>
              <div className="spec-item">
                <span className="spec-label">Care</span>
                <span className="spec-value">Machine wash cold, air dry</span>
              </div>
              <div className="spec-item">
                <span className="spec-label">Origin</span>
                <span className="spec-value">Made in India</span>
              </div>
              <div className="spec-item">
                <span className="spec-label">Finish</span>
                <span className="spec-value">Matte + Anti-odor treatment</span>
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}

Product.getLayout = function getLayout(page) {
  return page;
};
