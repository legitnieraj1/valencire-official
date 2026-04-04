import React, { createContext, useState, useEffect } from 'react';

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // Load from local storage stub
  useEffect(() => {
    try {
      const data = localStorage.getItem('valencire_cart');
      if (data) {
        setCart(JSON.parse(data));
      }
    } catch (e) {
      console.log('Error loading cart', e);
    }
  }, []);

  useEffect(() => {
    try {
      localStorage.setItem('valencire_cart', JSON.stringify(cart));
    } catch (e) {}
  }, [cart]);

  const addToCart = (product, size) => {
    setCart(prev => {
      const existing = prev.find(item => item.id === product.id && item.size === size);
      if (existing) {
        return prev.map(item =>
          (item.id === product.id && item.size === size)
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      } else {
        return [...prev, {
          id: product.id,
          name: product.name,
          price: product.price,
          size: size,
          image: product.images.back, // use appropriate image
          quantity: 1
        }];
      }
    });
    // show notification logically later
  };

  const updateQuantity = (id, size, change) => {
    setCart(prev => {
      return prev.map(item => {
        if (item.id === id && item.size === size) {
          const newQ = item.quantity + change;
          return { ...item, quantity: newQ };
        }
        return item;
      }).filter(item => item.quantity > 0);
    });
  };

  const removeItem = (id, size) => {
    setCart(prev => prev.filter(item => !(item.id === id && item.size === size)));
  };

  const toggleCart = () => {
    setIsCartOpen(!isCartOpen);
    setIsMenuOpen(false);
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
    setIsCartOpen(false);
  };
  
  const closePanels = () => {
    setIsMenuOpen(false);
    setIsCartOpen(false);
  };

  return (
    <CartContext.Provider value={{
      cart,
      addToCart,
      updateQuantity,
      removeItem,
      isCartOpen,
      isMenuOpen,
      toggleCart,
      toggleMenu,
      closePanels
    }}>
      {children}
    </CartContext.Provider>
  );
};
