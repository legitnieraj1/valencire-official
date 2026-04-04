import React, { useContext, useEffect, useState } from 'react';
import Link from 'next/link';
import { CartContext } from '../context/CartContext';
import { useRouter } from 'next/router';

export default function Header() {
  const { toggleCart, toggleMenu, cart } = useContext(CartContext);
  const [scrolled, setScrolled] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const cartItemCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  const handleCollectionClick = () => {
    if (router.pathname === '/') {
      const shop = document.getElementById('shop');
      if (shop) shop.scrollIntoView({ behavior: 'smooth' });
    } else {
      router.push('/#shop');
    }
  };

  return (
    <header className={scrolled ? 'scrolled' : ''} id="header">
      <div className="header-left">
        <div className="nav-link" onClick={handleCollectionClick}>Shop</div>
        <div className="nav-link" onClick={() => router.push('/about')}>About</div>
      </div>

      <div className="logo">
        <Link href="/">
          <div className="logo-container" style={{ cursor: 'pointer' }}>
            <img src="/white valencire.png" alt="VALENCIRE" className="logo-white" />
            <img src="/LOGO BRO.png" alt="VALENCIRE" className="logo-black" />
          </div>
        </Link>
      </div>

      <div className="header-right">
        {/* Search icon */}
        <svg className="icon" viewBox="0 0 24 24" style={{ cursor: 'pointer' }}>
          <circle cx="11" cy="11" r="7"></circle>
          <line x1="16.65" y1="16.65" x2="21" y2="21"></line>
        </svg>

        {/* Account icon — desktop only */}
        <svg
          className="icon icon-desktop"
          viewBox="0 0 24 24"
          onClick={() => router.push('/account')}
          style={{ cursor: 'pointer' }}
        >
          <circle cx="12" cy="8" r="4"></circle>
          <path d="M4 20c2-4 14-4 16 0"></path>
        </svg>

        {/* Cart icon */}
        <div className="icon-wrapper" onClick={toggleCart}>
          <svg className="icon" viewBox="0 0 24 24">
            <path d="M6 7h12l-1 13H7z"></path>
            <path d="M9 7V5a3 3 0 0 1 6 0v2"></path>
          </svg>
          <div className={`cart-count ${cartItemCount > 0 ? 'active' : ''}`}>
            {cartItemCount}
          </div>
        </div>

        {/* Menu text — desktop */}
        <span className="nav-link nav-menu-desktop" onClick={toggleMenu}>MENU</span>

        {/* Hamburger — mobile only */}
        <button className="hamburger" onClick={toggleMenu} aria-label="Open menu">
          <span></span>
          <span></span>
          <span></span>
        </button>
      </div>
    </header>
  );
}
