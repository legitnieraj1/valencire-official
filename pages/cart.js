import React, { useContext, useState, useEffect } from 'react';
import Head from 'next/head';
import { CartContext } from '../context/CartContext';
import Link from 'next/link';
import { useRouter } from 'next/router';

export default function Cart() {
  const { cart, updateQuantity, removeItem } = useContext(CartContext);
  const [discountApplied, setDiscountApplied] = useState(false);
  const [couponCode, setCouponCode] = useState('');
  const router = useRouter();

  const subtotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const discount = discountApplied ? subtotal * 0.1 : 0;
  const total = subtotal - discount;

  // Replicating dynamic backgrounds from cart.js
  const productGradients = {
    1: "linear-gradient(135deg, #22002e 0%, #000 50%, #12001a 100%)", // Amethyst
    2: "linear-gradient(135deg, #2a0000 0%, #000 50%, #1a0000 100%)", // Blood Red
    3: "linear-gradient(135deg, #001428 0%, #000 50%, #000814 100%)"  // Phantom Blue
  };

  const bgStyle = cart.length > 0 
    ? (productGradients[cart[0].id] || "linear-gradient(135deg, #1a0000 0%, #000 50%, #0a0a1a 100%)")
    : "#0a0a0a";

  const applyCoupon = () => {
    const code = couponCode.trim().toUpperCase();
    if (code === 'VALENCIRE10') {
      if (!discountApplied) {
        setDiscountApplied(true);
        alert('✓ Coupon applied! 10% discount added');
        setCouponCode('');
      } else {
        alert('Coupon already applied');
      }
    } else if (code) {
      alert('Invalid coupon code');
    }
  };

  const checkout = async () => {
    if (cart.length === 0) {
      alert('Your cart is empty!');
      return;
    }
    
    // Minimal mock for the checkout preserving the HTML behavior
    try {
      if (typeof window !== 'undefined' && !window.supabase) {
        alert("Payment system is currently unavailable. Please check your connection.");
        return;
      }
      const client = window.supabase.createClient('https://crqeqejgdrjujsuvihsx.supabase.co', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImNycWVxZWpnZHJqdWpzdXZpaHN4Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjY1NjMxMTgsImV4cCI6MjA4MjEzOTExOH0.0Cb4nLFM8g6Aq6XRglrrXNpKknGAf30GfHy0QMqmjbA');
      const { data: { session } } = await client.auth.getSession();
      
      if (!session) {
        if (confirm("You need to be logged in to checkout. Go to login page?")) {
          router.push('/account');
        }
        return;
      }

      const confirmMsg = `Order Summary:\n\nSubtotal: ₹${subtotal.toLocaleString()}\nDiscount: ₹${discount.toLocaleString()}\nShipping: FREE\nTotal: ₹${total.toLocaleString()}\n\nProceed to place order?`;
      if (confirm(confirmMsg)) {
        const { data: orderData, error: orderError } = await client.from('orders').insert([{
           user_id: session.user.id,
           total_amount: total,
           items: cart,
           status: 'pending'
        }]).select();

        if (orderError) throw orderError;
        
        try {
          await window.emailjs.send('service_r7tqr9o', 'template_w9rl8ib', {
            order_id: orderData[0].id,
            customer_email: session.user.email,
            customer_name: session.user.user_metadata?.full_name || session.user.email,
            order_total: total,
            order_items: JSON.stringify(cart, null, 2)
          });
        } catch(ignore) {}

        // Clear cart globally
        cart.forEach(item => removeItem(item.id, item.size));
        alert('✓ Order placed successfully!\\n\\nConfirmation email sent to ' + session.user.email);
        router.push('/');
      }
    } catch (e) {
      alert('Error placing order: ' + (e.message || e.text || e));
    }
  };

  return (
    <>
      <Head>
        <title>Your Cart | VALENCIRĖ®</title>
        <script src="https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2" async></script>
        <script type="text/javascript" src="https://cdn.jsdelivr.net/npm/@emailjs/browser@3/dist/email.min.js" async></script>
        <script dangerouslySetInnerHTML={{__html: `setTimeout(() => { if(window.emailjs) window.emailjs.init("3OqsLW-uTKYF8oWlV"); }, 500);`}} />
      </Head>

      <style dangerouslySetInnerHTML={{ __html: `
        .cart-page-body {
            background: ${bgStyle};
            color: #f5f5f5;
            font-family: "Helvetica Neue", "Futura", Arial, sans-serif;
            min-height: 100vh;
            transition: background 1s ease;
            overflow-x: hidden;
        }
        .cart-header-local {
            position: sticky;
            top: 0;
            height: 80px;
            background: rgba(10, 10, 10, .85);
            backdrop-filter: blur(30px);
            border-bottom: 1px solid rgba(255, 255, 255, .08);
            display: flex;
            align-items: center;
            justify-content: center;
            z-index: 500;
            box-shadow: 0 4px 30px rgba(0, 0, 0, .3);
        }
        .cart-header-local img {
            height: 110px;
            cursor: pointer;
            transition: transform .3s ease, filter .3s ease;
        }
        .cart-header-local img:hover {
            transform: scale(1.05);
            filter: brightness(1.2);
        }
        .cart-page {
            max-width: 1500px;
            margin: 80px auto;
            padding: 0 60px;
            display: grid;
            grid-template-columns: 2fr 1fr;
            gap: 60px;
            animation: fadeIn .6s ease;
        }
        @keyframes fadeIn {
            from { opacity: 0; transform: translateY(20px); }
            to { opacity: 1; transform: translateY(0); }
        }
        .cart-box {
            background: radial-gradient(ellipse at top, rgba(255, 255, 255, 0.05), rgba(0, 0, 0, 0.97));
            border-radius: 28px;
            border: 1px solid rgba(255, 255, 255, 0.1);
            padding: 40px;
            box-shadow: 0 20px 60px rgba(0, 0, 0, .5);
            transition: border-color .3s ease;
        }
        .cart-box:hover { border-color: rgba(255, 255, 255, .15); }
        .cart-title {
            font-size: 22px;
            letter-spacing: 4px;
            margin-bottom: 40px;
            font-weight: 400;
            text-transform: uppercase;
            position: relative;
            padding-bottom: 15px;
        }
        .cart-title::after {
            content: ''; position: absolute; bottom: 0; left: 0; width: 60px; height: 2px;
            background: linear-gradient(90deg, #f5f5f5, transparent);
        }
        .cart-item {
            display: grid; grid-template-columns: 120px 1fr; gap: 28px; padding: 30px 0;
            border-bottom: 1px solid rgba(255, 255, 255, .06); animation: slideIn .4s ease; transition: transform .3s ease;
        }
        @keyframes slideIn { from { opacity: 0; transform: translateX(-20px); } to { opacity: 1; transform: translateX(0); } }
        .cart-item:hover { transform: translateX(5px); }
        .cart-item:last-child { border-bottom: none; }
        .cart-item-img {
            width: 120px; height: 160px; object-fit: cover; border-radius: 14px; background: #151515;
            box-shadow: 0 8px 24px rgba(0, 0, 0, .4); transition: transform .3s ease, box-shadow .3s ease;
        }
        .cart-item-img:hover { transform: scale(1.05); box-shadow: 0 12px 36px rgba(0, 0, 0, .6); }
        .cart-item-details h4 { letter-spacing: 2px; margin-bottom: 8px; font-weight: 400; font-size: 16px; }
        .cart-item-details p { font-size: 13px; opacity: .6; margin-bottom: 12px; }
        .cart-item-price { font-size: 18px; margin-bottom: 14px; font-weight: 600; background: linear-gradient(135deg, #fff, #aaa); -webkit-background-clip: text; -webkit-text-fill-color: transparent; }
        .qty-control { display: flex; align-items: center; gap: 14px; margin-top: 16px; }
        .qty-btn { width: 32px; height: 32px; border-radius: 50%; background: rgba(255, 255, 255, .05); border: 1px solid rgba(255, 255, 255, .25); color: white; cursor: pointer; display: flex; align-items: center; justify-content: center; font-size: 16px; transition: all .3s ease; }
        .qty-btn:hover { background: rgba(255, 255, 255, .15); transform: scale(1.1); }
        .qty-btn:active { transform: scale(.95); }
        .qty-display { min-width: 30px; text-align: center; font-weight: 600; font-size: 15px; }
        .remove-item { font-size: 11px; opacity: .5; cursor: pointer; margin-top: 12px; letter-spacing: 1px; transition: all .3s ease; text-transform: uppercase; display: inline-block; }
        .remove-item:hover { opacity: 1; color: #c41e3a; transform: translateX(3px); }
        .summary { background: radial-gradient(ellipse at top, rgba(255, 255, 255, 0.05), rgba(0, 0, 0, 0.97)); border-radius: 28px; border: 1px solid rgba(255, 255, 255, 0.1); padding: 40px; height: fit-content; position: sticky; top: 100px; box-shadow: 0 20px 60px rgba(0, 0, 0, .5); transition: border-color .3s ease; }
        .summary:hover { border-color: rgba(255, 255, 255, .15); }
        .summary h3 { font-size: 18px; letter-spacing: 4px; margin-bottom: 30px; font-weight: 400; text-transform: uppercase; position: relative; padding-bottom: 15px; }
        .summary h3::after { content: ''; position: absolute; bottom: 0; left: 0; width: 50px; height: 2px; background: linear-gradient(90deg, #f5f5f5, transparent); }
        .summary-row { display: flex; justify-content: space-between; margin-bottom: 16px; font-size: 14px; transition: opacity .3s ease; }
        .summary-row:hover { opacity: .8; }
        .summary-row.total { font-size: 20px; font-weight: 600; margin-top: 30px; padding-top: 20px; border-top: 1px solid rgba(255, 255, 255, .15); background: linear-gradient(135deg, #fff, #ccc); -webkit-background-clip: text; -webkit-text-fill-color: transparent; }
        .coupon { margin: 26px 0; display: flex; gap: 10px; }
        .coupon input { flex: 1; padding: 14px 18px; border-radius: 999px; border: 1px solid rgba(255, 255, 255, .2); background: rgba(255, 255, 255, .06); color: white; font-size: 13px; letter-spacing: 1px; transition: all .3s ease; }
        .coupon input:focus { outline: none; border-color: rgba(255, 255, 255, .4); background: rgba(255, 255, 255, .1); }
        .coupon button { padding: 14px 26px; border-radius: 999px; border: none; background: #f5f5f5; color: #000; cursor: pointer; font-weight: 600; letter-spacing: 2px; transition: all .3s ease; font-size: 11px; text-transform: uppercase; }
        .coupon button:hover { background: #fff; transform: translateY(-2px); box-shadow: 0 8px 24px rgba(245, 245, 245, .25); }
        .buy-btn { width: 100%; margin-top: 30px; padding: 18px; border-radius: 999px; border: none; background: linear-gradient(135deg, #f5f5f5, #e0e0e0); color: #000; font-weight: 700; letter-spacing: 3px; cursor: pointer; transition: all .4s ease; font-size: 12px; text-transform: uppercase; box-shadow: 0 8px 24px rgba(245, 245, 245, .15); }
        .buy-btn:hover { background: linear-gradient(135deg, #fff, #f5f5f5); transform: translateY(-3px); }
        .buy-btn:disabled { opacity: .6; cursor: not-allowed; transform: none; }
        .empty-cart { text-align: center; opacity: .5; padding: 80px 0; font-size: 15px; letter-spacing: 2px; animation: fadeIn .6s ease; }
        .empty-cart-link { display: inline-block; margin-top: 20px; padding: 12px 32px; background: rgba(255, 255, 255, 0.1); border: 1px solid rgba(255, 255, 255, 0.3); border-radius: 999px; color: #f5f5f5; text-decoration: none; letter-spacing: 2px; font-size: 12px; transition: all .3s ease; }
        .empty-cart-link:hover { background: rgba(255, 255, 255, 0.15); border-color: rgba(255, 255, 255, 0.5); transform: translateY(-2px); }
        .discount-row { color: #4ade80; font-weight: 500; }
        @media(max-width:900px) {
            .cart-page { grid-template-columns: 1fr; padding: 0 24px; gap: 40px; margin: 40px auto; }
            .summary { position: static; }
            .cart-item { grid-template-columns: 100px 1fr; gap: 20px; }
            .cart-item-img { width: 100px; height: 130px; }
            .cart-header-local img { height: 90px; }
        }
        @media(max-width:600px) {
            .cart-page { padding: 0 16px; }
            .coupon { flex-direction: column; }
            .coupon button { width: 100%; }
        }
      `}} />

      <div className="cart-page-body">
        <header className="cart-header-local">
            <Link href="/">
              <img src="/LOGO BRO.png" alt="VALENCIRĖ®" />
            </Link>
        </header>

        <section className="cart-page">
            <div className="cart-box">
                <div className="cart-title">Your Cart</div>
                <div id="cartItems">
                  {cart.length === 0 ? (
                    <div className="empty-cart">
                      Your cart is empty
                      <br/>
                      <Link href="/" className="empty-cart-link">Continue Shopping</Link>
                    </div>
                  ) : (
                    cart.map(item => (
                      <div className="cart-item" key={`${item.id}-${item.size}`}>
                        <img src={item.image} className="cart-item-img" alt={item.name} />
                        <div className="cart-item-details">
                          <h4>{item.name}</h4>
                          <p>Size: {item.size}</p>
                          <div className="cart-item-price">₹{item.price.toLocaleString()}</div>
                          <div className="qty-control">
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
            </div>

            <div className="summary">
                <h3>Order Summary</h3>
                <div className="summary-row">
                    <span>Subtotal</span>
                    <span>₹{subtotal.toLocaleString()}</span>
                </div>
                <div className="summary-row">
                    <span>Shipping</span>
                    <span>FREE</span>
                </div>
                {discountApplied && (
                  <div className="summary-row discount-row">
                      <span>Discount (10%)</span>
                      <span>-₹{discount.toLocaleString()}</span>
                  </div>
                )}
                <div className="coupon">
                    <input 
                      type="text" 
                      placeholder="Enter coupon code" 
                      value={couponCode} 
                      onChange={(e) => setCouponCode(e.target.value)}
                      disabled={discountApplied} 
                    />
                    <button onClick={applyCoupon}>APPLY</button>
                </div>
                <div className="summary-row total">
                    <span>Total</span>
                    <span>₹{total.toLocaleString()}</span>
                </div>
                <button className="buy-btn" onClick={checkout}>Buy Now</button>
            </div>
        </section>
      </div>
    </>
  );
}

Cart.getLayout = function getLayout(page) {
  return page;
};
