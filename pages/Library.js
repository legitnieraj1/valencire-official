import React, { useState } from 'react';
import Head from 'next/head';
import Link from 'next/link';

export default function Library() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <>
      <Head>
        <title>VALENCIRÉ® Official Site</title>
      </Head>

      <style dangerouslySetInnerHTML={{ __html: `
        .library-body {
          background: #000;
          color: #fff;
          font-family: "Helvetica Neue", Arial, sans-serif;
          min-height: 100vh;
          overflow-x: hidden;
        }

        /* ================= HEADER ================= */
        .lib-header {
          position: fixed;
          top: 0;
          width: 100%;
          height: 72px;
          display: flex;
          align-items: center;
          justify-content: center;
          background: rgba(0,0,0,0.55);
          backdrop-filter: blur(22px);
          border-bottom: 1px solid rgba(255,255,255,0.12);
          z-index: 5000;
        }

        .lib-logo {
          position: absolute;
          left: 50%;
          transform: translateX(-50%);
        }

        .lib-logo img {
          height: 170px;
          cursor: pointer;
        }

        .lib-header-right {
          position: absolute;
          right: 40px;
          display: flex;
          align-items: center;
          gap: 26px;
        }

        .lib-icon {
          width: 18px;
          height: 18px;
          stroke: #fff;
          stroke-width: 1.6;
          fill: none;
          cursor: pointer;
          opacity: .85;
        }

        .lib-icon:hover { opacity: 1; }

        .lib-menu-text {
          font-size: 13px;
          letter-spacing: 2px;
          cursor: pointer;
          opacity: .85;
        }

        .lib-menu-text:hover { opacity: 1; }

        /* ================= HERO ================= */
        .lib-hero {
          width: 100vw;
          height: 100vh;
          position: relative;
        }

        .lib-hero video {
          position: absolute;
          inset: 0;
          width: 100%;
          height: 100%;
          object-fit: cover;
          filter: brightness(.9) contrast(1.05);
        }

        .lib-shop-btn {
          position: absolute;
          bottom: 120px;
          left: 50%;
          transform: translateX(-50%);
          padding: 16px 44px;
          border-radius: 999px;
          background: rgba(255,255,255,0.18);
          backdrop-filter: blur(25px);
          border: 1px solid rgba(255,255,255,0.35);
          letter-spacing: 3px;
          font-size: 14px;
          cursor: pointer;
          color: #fff;
          transition: 0.3s ease;
        }
        
        .lib-shop-btn:hover {
            background: rgba(255,255,255,0.3);
        }

        /* ================= SHOP ================= */
        .lib-shop {
          padding: 140px 80px;
        }

        .lib-products {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(360px, 1fr));
          gap: 60px;
        }

        .lib-card {
          border-radius: 34px;
          padding: 30px;
          background: linear-gradient(145deg, rgba(255,255,255,0.12), rgba(255,255,255,0.02));
          backdrop-filter: blur(30px);
          border: 1px solid rgba(255,255,255,0.18);
          transition: .4s ease;
        }

        .lib-card:hover { transform: translateY(-10px); }

        .lib-image-wrap {
          position: relative;
          border-radius: 26px;
          overflow: hidden;
          margin-bottom: 28px;
        }

        .lib-image-wrap img {
          width: 100%;
          transition: opacity .5s ease;
        }

        .lib-image-wrap .front {
          position: absolute;
          inset: 0;
          opacity: 0;
        }

        .lib-image-wrap:hover .front { opacity: 1; }
        .lib-image-wrap:hover .back { opacity: 0; }

        .lib-card h3 {
          letter-spacing: 2px;
          margin-bottom: 6px;
        }

        .lib-card p {
          opacity: .7;
          margin-bottom: 22px;
        }

        .lib-card button {
          width: 100%;
          padding: 18px;
          border-radius: 999px;
          border: none;
          font-weight: bold;
          cursor: pointer;
        }

        .add-purple { background: #7b4cff; color: #fff; }
        .add-red { background: #c61d1d; color: #fff; }

        /* ================= NEWSLETTER ================= */
        .lib-newsletter {
          padding: 160px 80px 120px;
          text-align: center;
          background: linear-gradient(to bottom, rgba(255,255,255,0.04), #000);
          border-top: 1px solid rgba(255,255,255,0.12);
        }

        .lib-newsletter h2 {
          font-size: 28px;
          letter-spacing: 4px;
          margin-bottom: 18px;
        }

        .lib-newsletter p {
          opacity: .7;
          max-width: 520px;
          margin: 0 auto 40px;
          line-height: 1.6;
        }

        .lib-newsletter-form {
          display: flex;
          justify-content: center;
          gap: 14px;
          flex-wrap: wrap;
        }

        .lib-newsletter input {
          padding: 18px 22px;
          min-width: 280px;
          background: rgba(255,255,255,0.08);
          border: 1px solid rgba(255,255,255,0.25);
          border-radius: 999px;
          color: #fff;
          outline: none;
        }

        .lib-newsletter input::placeholder {
          color: rgba(255,255,255,0.6);
        }

        .lib-newsletter button {
          padding: 18px 38px;
          border-radius: 999px;
          border: 1px solid rgba(255,255,255,0.35);
          background: rgba(255,255,255,0.18);
          backdrop-filter: blur(20px);
          letter-spacing: 2px;
          color: #fff;
          cursor: pointer;
        }

        .lib-newsletter button:hover {
          background: rgba(255,255,255,0.25);
        }

        /* ================= FOOTER ================= */
        .lib-footer {
          padding: 90px 80px 60px;
          background: #000;
          border-top: 1px solid rgba(255,255,255,0.12);
        }

        .lib-footer-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
          gap: 60px;
        }

        .lib-footer-col h4 {
          letter-spacing: 3px;
          margin-bottom: 20px;
          font-size: 14px;
        }

        .lib-footer-col a {
          display: block;
          text-decoration: none;
          color: #fff;
          opacity: .7;
          margin-bottom: 14px;
          font-size: 13px;
        }

        .lib-footer-col a:hover { opacity: 1; }

        .lib-footer-bottom {
          margin-top: 70px;
          text-align: center;
          font-size: 12px;
          opacity: .6;
          letter-spacing: 2px;
        }

        /* ================= MENU PANEL ================= */
        .lib-menu-panel {
          position: fixed;
          top: 0;
          right: -420px;
          width: 400px;
          height: 100vh;
          background: rgba(0,0,0,0.85);
          backdrop-filter: blur(30px);
          padding: 40px;
          transition: .45s ease;
          z-index: 6000;
        }

        .lib-menu-panel.active { right: 0; }

        .lib-menu-panel h2 {
          letter-spacing: 3px;
          margin-bottom: 30px;
        }

        .lib-menu-item {
          font-size: 16px;
          letter-spacing: 2px;
          margin-bottom: 18px;
          cursor: pointer;
          opacity: .85;
        }

        .lib-menu-item:hover { opacity: 1; }

        .lib-close-btn {
          position: absolute;
          top: 20px;
          right: 20px;
          font-size: 20px;
          cursor: pointer;
        }
        
        @media(max-width: 768px) {
            .lib-shop {
                padding: 60px 20px;
            }
            .lib-newsletter {
                padding: 80px 20px;
            }
            .lib-footer {
                padding: 60px 20px;
            }
        }
      `}} />

      <div className="library-body">
        
        {/* ================= HEADER ================= */}
        <header className="lib-header">
          <div className="lib-logo">
            <Link href="/">
                <img src="/LOGO BRO.png" alt="VALENCIRÉ" />
            </Link>
          </div>

          <div className="lib-header-right">
            <svg className="lib-icon" viewBox="0 0 24 24" onClick={() => window.location.href='/account'}>
              <circle cx="11" cy="11" r="7"></circle>
              <line x1="16.65" y1="16.65" x2="21" y2="21"></line>
            </svg>

            <svg className="lib-icon" viewBox="0 0 24 24" onClick={() => window.location.href='/account'}>
              <circle cx="12" cy="8" r="4"></circle>
              <path d="M4 20c2-4 14-4 16 0"></path>
            </svg>

            <svg className="lib-icon" viewBox="0 0 24 24" onClick={() => window.location.href='/cart'}>
              <path d="M6 7h12l-1 13H7z"></path>
              <path d="M9 7V5a3 3 0 0 1 6 0v2"></path>
            </svg>

            <span className="lib-menu-text" onClick={() => setIsMenuOpen(true)}>MENU</span>
          </div>
        </header>

        {/* ================= HERO ================= */}
        <section className="lib-hero">
          <video autoPlay muted loop playsInline>
            <source src="/video.mp4" type="video/mp4" />
          </video>

          <button className="lib-shop-btn"
            onClick={() => {
              const shopSection = document.getElementById('shop');
              if (shopSection) {
                  shopSection.scrollIntoView({behavior: 'smooth'});
              }
            }}>
            SHOP
          </button>
        </section>

        {/* ================= SHOP ================= */}
        <section className="lib-shop" id="shop">
          <div className="lib-products">

            <div className="lib-card">
              <div className="lib-image-wrap" onClick={() => window.location.href='/product?product=1'}>
                <img src="/BACK 1.png" className="back" alt="Back 1" />
                <img src="/FRONT 1.png" className="front" alt="Front 1" />
              </div>
              <h3>blood noir™</h3>
              <p>₹1,800</p>
              <button className="add-purple" onClick={() => window.location.href='/product?product=1'}>Add to Cart</button>
            </div>

            <div className="lib-card">
              <div className="lib-image-wrap" onClick={() => window.location.href='/product?product=2'}>
                <img src="/BACK 2.png" className="back" alt="Back 2" />
                <img src="/FRONT 3.png" className="front" alt="Front 3" />
              </div>
              <h3>blood noir™</h3>
              <p>₹1,800</p>
              <button className="add-red" onClick={() => window.location.href='/product?product=2'}>Add to Cart</button>
            </div>

          </div>
        </section>

        {/* ================= NEWSLETTER ================= */}
        <section className="lib-newsletter">
          <h2>STAY CLOSE</h2>
          <p>Be the first to access limited drops, private releases, and members-only pricing.</p>
          <form className="lib-newsletter-form" onSubmit={(e) => { e.preventDefault(); alert("Joined successfully"); }}>
            <input type="email" placeholder="Enter your email" required />
            <button type="submit">JOIN</button>
          </form>
        </section>

        {/* ================= FOOTER ================= */}
        <footer className="lib-footer">
          <div className="lib-footer-grid">
            <div className="lib-footer-col">
              <h4>VALENCIRÉ®</h4>
              <Link href="/about">About</Link>
              <Link href="#">Craftsmanship</Link>
              <Link href="#">Journal</Link>
            </div>
            <div className="lib-footer-col">
              <h4>SHOP</h4>
              <Link href="#">Compression</Link>
              <Link href="#">Oversized</Link>
              <Link href="#">Limited Drops</Link>
            </div>
            <div className="lib-footer-col">
              <h4>SUPPORT</h4>
              <Link href="#">Contact</Link>
              <Link href="#">Shipping</Link>
              <Link href="#">Returns</Link>
            </div>
            <div className="lib-footer-col">
              <h4>FOLLOW</h4>
              <Link href="#">Instagram</Link>
              <Link href="#">X (Twitter)</Link>
              <Link href="#">YouTube</Link>
            </div>
          </div>
          <div className="lib-footer-bottom">
            © 2025 VALENCIRÉ® — AIN’T FOR AVERAGE
          </div>
        </footer>

        {/* ================= MENU PANEL ================= */}
        <div className={`lib-menu-panel ${isMenuOpen ? 'active' : ''}`}>
          <span className="lib-close-btn" onClick={() => setIsMenuOpen(false)}>✕</span>
          <h2>MENU</h2>
          <div className="lib-menu-item">Compression T-Shirts</div>
          <div className="lib-menu-item">Oversized T-Shirts</div>
        </div>
      </div>
    </>
  );
}

Library.getLayout = function getLayout(page) {
    return page;
};
