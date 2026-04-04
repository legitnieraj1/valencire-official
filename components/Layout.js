import React from 'react';
import Header from './Header';
import Footer from './Footer';
import CartPanel from './CartPanel';
import MenuPanel from './MenuPanel';

export default function Layout({ children }) {
  return (
    <>
      <Header />
      <main>
        {children}
      </main>
      <Footer />
      <CartPanel />
      <MenuPanel />
    </>
  );
}
