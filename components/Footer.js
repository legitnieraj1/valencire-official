import React from 'react';
import Link from 'next/link';

export default function Footer() {
  return (
    <footer>
      <div className="footer-grid">

        <div className="footer-col">
          <h4>VALENCIRE®</h4>
          <a href="#">
            <svg className="footer-social-icon" viewBox="0 0 24 24">
              <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
              <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/>
              <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/>
            </svg>
            Instagram
          </a>
          <a href="#">
            <svg className="footer-social-icon" viewBox="0 0 24 24">
              <path d="M23 3a10.9 10.9 0 0 1-3.14 1.53 4.48 4.48 0 0 0-7.86 3v1A10.66 10.66 0 0 1 3 4s-4 9 5 13a11.64 11.64 0 0 1-7 2c9 5 20 0 20-11.5a4.5 4.5 0 0 0-.08-.83A7.72 7.72 0 0 0 23 3z"/>
            </svg>
            Twitter / X
          </a>
          <a href="#">
            <svg className="footer-social-icon" viewBox="0 0 24 24">
              <path d="M22.54 6.42a2.78 2.78 0 0 0-1.95-1.96C18.88 4 12 4 12 4s-6.88 0-8.59.46a2.78 2.78 0 0 0-1.95 1.96A29 29 0 0 0 1 12a29 29 0 0 0 .46 5.58A2.78 2.78 0 0 0 3.41 19.54C5.12 20 12 20 12 20s6.88 0 8.59-.46a2.78 2.78 0 0 0 1.95-1.96A29 29 0 0 0 23 12a29 29 0 0 0-.46-5.58z"/>
              <polygon points="9.75 15.02 15.5 12 9.75 8.98 9.75 15.02"/>
            </svg>
            YouTube
          </a>
        </div>

        <div className="footer-col">
          <h4>SHOP</h4>
          <Link href="/#shop">New Arrivals</Link>
          <Link href="/#shop">Compression</Link>
          <Link href="/#shop">Oversized</Link>
          <Link href="/#shop">Archive</Link>
        </div>

        <div className="footer-col">
          <h4>SUPPORT</h4>
          <a href="#">Shipping & Returns</a>
          <a href="#">Size Guide</a>
          <a href="#">FAQ</a>
          <a href="#">Contact Us</a>
        </div>

        <div className="footer-col">
          <h4>LEGAL</h4>
          <a href="#">Privacy Policy</a>
          <a href="#">Terms of Service</a>
          <a href="#">Cookie Policy</a>
        </div>

      </div>

      <div className="footer-bottom">
        © {new Date().getFullYear()} VALENCIRE®. ALL RIGHTS RESERVED.
      </div>
    </footer>
  );
}
