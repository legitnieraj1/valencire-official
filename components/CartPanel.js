import React, { useContext } from 'react';
import { useRouter } from 'next/router';
import { CartContext } from '../context/CartContext';

export default function CartPanel() {
  const router = useRouter();
  const { cart, isCartOpen, toggleCart, updateQuantity, removeItem } = useContext(CartContext);

  const subtotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);

  const handleCheckout = () => {
    toggleCart();
    router.push('/checkout');
  };

  return (
    <div className={`cart-panel ${isCartOpen ? 'active' : ''}`} id="cartPanel">
        <div className="cart-header">
            <h2>YOUR CART</h2>
            <span className="close-btn" onClick={toggleCart}>✕</span>
        </div>

        <div className="cart-items" id="cartItems">
            {cart.length === 0 ? (
                <div className="cart-empty">Your cart is empty</div>
            ) : (
                cart.map((item) => (
                  <div className="cart-item" key={`${item.id}-${item.size}`}>
                    <img src={item.image} className="cart-item-img" alt={item.name} />
                    <div className="cart-item-details">
                      <div className="cart-item-title">{item.name}</div>
                      <div className="cart-item-meta">Size: {item.size}</div>
                      <div className="cart-item-price">₹{item.price.toLocaleString()}</div>
                      <div className="quantity-control">
                        <button className="qty-btn" onClick={() => updateQuantity(item.id, item.size, -1)}>−</button>
                        <span className="qty-display">{item.quantity}</span>
                        <button className="qty-btn" onClick={() => updateQuantity(item.id, item.size, 1)}>+</button>
                      </div>
                      <div className="remove-item" onClick={() => removeItem(item.id, item.size)}>Remove</div>
                    </div>
                  </div>
                ))
            )}
        </div>

        <div className="cart-summary" id="cartSummary" style={{ display: cart.length > 0 ? 'block' : 'none' }}>
            <div className="summary-row">
                <span>Subtotal</span>
                <span id="subtotal">₹{subtotal.toLocaleString()}</span>
            </div>
            <div className="summary-row">
                <span>Shipping</span>
                <span>Free</span>
            </div>
            <div className="summary-row total">
                <span>Total</span>
                <span id="total">₹{subtotal.toLocaleString()}</span>
            </div>
            <button className="checkout-btn" onClick={handleCheckout}>PROCEED TO CHECKOUT</button>
        </div>
    </div>
  );
}
