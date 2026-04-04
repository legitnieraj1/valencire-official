import React, { useContext } from 'react';
import { CartContext } from '../context/CartContext';
import Link from 'next/link';

export default function MenuPanel() {
  const { isMenuOpen, toggleMenu } = useContext(CartContext);

  return (
    <div className={`menu-panel ${isMenuOpen ? 'active' : ''}`} id="menuPanel">
        <div className="cart-header">
            <h2>MENU</h2>
            <span className="close-btn" onClick={toggleMenu}>✕</span>
        </div>
        <div className="menu-item" onClick={toggleMenu}><Link href="/#shop">Collection</Link></div>
        <div className="menu-item" onClick={toggleMenu}><Link href="/about">About Us</Link></div>
        <div className="menu-item">Craftsmanship</div>
        <div className="menu-item">Size Guide</div>
        <div className="menu-item">Contact</div>
        <div className="menu-item">Shipping Information</div>
    </div>
  );
}
