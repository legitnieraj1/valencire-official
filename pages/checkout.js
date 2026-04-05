import React, { useState, useContext, useEffect } from 'react';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { motion } from 'framer-motion';
import { CartContext } from '../context/CartContext';
import styles from '../styles/checkout.module.css';

const loadRazorpay = () => {
  return new Promise((resolve) => {
    const script = document.createElement('script');
    script.src = 'https://checkout.razorpay.com/v1/checkout.js';
    script.onload = () => resolve(true);
    script.onerror = () => resolve(false);
    document.body.appendChild(script);
  });
};

export default function Checkout() {
  const router = useRouter();
  const { cart, clearCart } = useContext(CartContext);
  const [loading, setLoading] = useState(false);

  const subtotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    state: '',
    pincode: ''
  });

  // Redirect to cart if empty
  useEffect(() => {
    if (cart.length === 0) {
      router.push('/');
    }
  }, [cart, router]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handlePayment = async (e) => {
    e.preventDefault();

    if (cart.length === 0) return;

    setLoading(true);

    const isLoaded = await loadRazorpay();
    if (!isLoaded) {
      alert('Razorpay SDK failed to load. Are you online?');
      setLoading(false);
      return;
    }

    try {
      // Create backend order
      const res = await fetch('/api/create-razorpay-order', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        // Subtotal + any shipping fees etc.
        body: JSON.stringify({ amount: subtotal })
      });

      if (!res.ok) throw new Error('Order creation failed');
      
      const order = await res.json();

      const options = {
        key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID || 'rzp_test_SDiRFPP28IeoVs', // fallback test key
        amount: order.amount,
        currency: order.currency,
        name: 'VALENCIRE®',
        description: 'Payment for your Valencire Exclusive order',
        image: '/valencire main logo.png',
        order_id: order.id,
        handler: function (response) {
          // On Success
          // You could ping your server /api/verify-payment with response details here
          clearCart();
          router.push('/success');
        },
        prefill: {
          name: `${formData.firstName} ${formData.lastName}`,
          email: formData.email,
          contact: formData.phone,
        },
        theme: {
          color: '#0A0A0A',
        },
      };

      const paymentObject = new window.Razorpay(options);
      paymentObject.open();

    } catch (err) {
      console.error(err);
      alert('Failed to initiate payment.');
    }

    setLoading(false);
  };

  if (cart.length === 0) return null; // let useEffect redirect naturally

  return (
    <>
      <Head>
        <title>Checkout | VALENCIRE®</title>
      </Head>

      <motion.div 
        className={styles.checkoutWrapper}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.8, ease: "anticipate" }}
      >
        
        {/* LEFT COLUMN - FORM */}
        <div className={styles.leftCol}>
          <div className={styles.logo} onClick={() => router.push('/')}>
            VALENCIRE®
          </div>

          <h2 className={styles.sectionTitle}>1. Shipping Details</h2>

          <form onSubmit={handlePayment} className={styles.formGrid}>
            <div className={styles.inputGroup}>
              <input type="text" name="firstName" id="firstName" className={styles.inputField} placeholder=" " required value={formData.firstName} onChange={handleChange} />
              <label htmlFor="firstName" className={styles.inputLabel}>First Name</label>
            </div>
            
            <div className={styles.inputGroup}>
              <input type="text" name="lastName" id="lastName" className={styles.inputField} placeholder=" " required value={formData.lastName} onChange={handleChange} />
              <label htmlFor="lastName" className={styles.inputLabel}>Last Name</label>
            </div>

            <div className={`${styles.inputGroup} ${styles.fullWidth}`}>
              <input type="email" name="email" id="email" className={styles.inputField} placeholder=" " required value={formData.email} onChange={handleChange} />
              <label htmlFor="email" className={styles.inputLabel}>Email Address</label>
            </div>

            <div className={`${styles.inputGroup} ${styles.fullWidth}`}>
              <input type="tel" name="phone" id="phone" className={styles.inputField} placeholder=" " required value={formData.phone} onChange={handleChange} />
              <label htmlFor="phone" className={styles.inputLabel}>Mobile Number</label>
            </div>

            <div className={`${styles.inputGroup} ${styles.fullWidth}`}>
              <input type="text" name="address" id="address" className={styles.inputField} placeholder=" " required value={formData.address} onChange={handleChange} />
              <label htmlFor="address" className={styles.inputLabel}>Shipping Address</label>
            </div>

            <div className={styles.inputGroup}>
              <input type="text" name="city" id="city" className={styles.inputField} placeholder=" " required value={formData.city} onChange={handleChange} />
              <label htmlFor="city" className={styles.inputLabel}>City</label>
            </div>

            <div className={styles.inputGroup}>
              <input type="text" name="state" id="state" className={styles.inputField} placeholder=" " required value={formData.state} onChange={handleChange} />
              <label htmlFor="state" className={styles.inputLabel}>State</label>
            </div>

            <div className={styles.inputGroup}>
              <input type="text" name="pincode" id="pincode" className={styles.inputField} placeholder=" " required value={formData.pincode} onChange={handleChange} />
              <label htmlFor="pincode" className={styles.inputLabel}>Pincode</label>
            </div>

            <button type="submit" className={styles.checkoutBtn} disabled={loading}>
              {loading ? 'PROCESSING...' : 'PROCEED TO PAYMENT'}
            </button>
          </form>
        </div>

        {/* RIGHT COLUMN - SUMMARY */}
        <div className={styles.rightCol}>
          <h2 className={styles.sectionTitle}>Order Summary</h2>

          <div className={styles.summaryItemsList}>
            {cart.map((item) => (
              <div key={`${item.id}-${item.size}`} className={styles.summaryItem}>
                <img src={item.image} alt={item.name} />
                <div className={styles.itemDetails}>
                  <div className={styles.itemTitle}>{item.name}</div>
                  <div className={styles.itemMeta}>Size: {item.size} | Qty: {item.quantity}</div>
                </div>
                <div className={styles.itemPrice}>₹{(item.price * item.quantity).toLocaleString()}</div>
              </div>
            ))}
          </div>

          <div style={{ marginTop: '40px' }}>
            <div className={styles.totalsRow}>
              <span>Subtotal</span>
              <span>₹{subtotal.toLocaleString()}</span>
            </div>
            <div className={styles.totalsRow}>
              <span>Express Shipping</span>
              <span>FREE</span>
            </div>
            <div className={`${styles.totalsRow} ${styles.grandTotal}`}>
              <span>Total</span>
              <span>₹{subtotal.toLocaleString()}</span>
            </div>
          </div>
        </div>

      </motion.div>
    </>
  );
}

// Since this is a standalone checkout, bypass standard layout if standard layout has massive headers/footers.
// We provide a distinct, minimalist luxury checkout experience.
Checkout.getLayout = function getLayout(page) {
  return page;
};
