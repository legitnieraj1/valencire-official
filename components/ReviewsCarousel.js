import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, Star } from 'lucide-react';

const reviews = [
  {
    id: 1,
    title: "EXCELLENT QUALITY",
    text: "The compression fit is insane. Feels like a second skin and the material quality is legit premium. Will definitely order again.",
    author: "ARJUN K. — MUMBAI",
    rating: 5,
  },
  {
    id: 2,
    title: "BEST FIT EVER",
    text: "Finally a brand that understands body-fit without being uncomfortable. The stitching and finish are top-tier for the price.",
    author: "RAHUL M. — DELHI",
    rating: 5,
  },
  {
    id: 3,
    title: "PREMIUM STREETWEAR",
    text: "Oversized tee fits exactly how I wanted. Clean design, no unnecessary logos. This is what Indian streetwear should be.",
    author: "PRIYA S. — BANGALORE",
    rating: 5,
  }
];

export default function ReviewsCarousel() {
  const [activeIndex, setActiveIndex] = useState(0);

  const nextSlide = () => {
    setActiveIndex((prev) => (prev + 1) % reviews.length);
  };

  const prevSlide = () => {
    setActiveIndex((prev) => (prev - 1 + reviews.length) % reviews.length);
  };

  // Auto-play
  useEffect(() => {
    const interval = setInterval(() => {
      nextSlide();
    }, 5000);
    return () => clearInterval(interval);
  }, [activeIndex]);

  const getPositionStyles = (index) => {
    const diff = (index - activeIndex + reviews.length) % reviews.length;
    
    // Active
    if (diff === 0) {
      return {
        x: '0%',
        scale: 1,
        rotateY: 0,
        zIndex: 3,
        opacity: 1,
        filter: 'blur(0px)'
      };
    }
    // Right
    if (diff === 1) {
      return {
        x: '60%',
        scale: 0.85,
        rotateY: -15,
        zIndex: 2,
        opacity: 0.6,
        filter: 'blur(2px)'
      };
    }
    // Left
    if (diff === 2) {
      return {
        x: '-60%',
        scale: 0.85,
        rotateY: 15,
        zIndex: 2,
        opacity: 0.6,
        filter: 'blur(2px)'
      };
    }
    
    return {
      x: '0%',
      scale: 0.5,
      opacity: 0,
    };
  };

  return (
    <section 
      style={{
        position: 'relative',
        width: '100%',
        minHeight: '80vh',
        backgroundImage: 'url(/bg.png)',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundAttachment: 'fixed',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        padding: '80px 20px',
        overflow: 'hidden'
      }}
    >
      <div 
        style={{
          position: 'absolute',
          inset: 0,
          backgroundColor: 'rgba(0,0,0,0.5)',
          backdropFilter: 'blur(4px)',
          zIndex: 0
        }}
      />
      
      <div style={{ position: 'relative', zIndex: 1, width: '100%', maxWidth: '1200px', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <div style={{ textAlign: 'center', marginBottom: '60px' }}>
          <h2 style={{ 
            fontSize: 'clamp(28px, 4vw, 42px)', 
            letterSpacing: '5px', 
            fontWeight: 900, 
            color: '#fff', 
            textTransform: 'uppercase',
            margin: 0
          }}>
            WHAT THEY SAY
          </h2>
          <div style={{ width: '60px', height: '3px', background: '#fff', margin: '20px auto 0' }} />
        </div>

        <div 
          style={{ 
            position: 'relative', 
            width: '100%', 
            maxWidth: '800px', 
            height: '350px',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            perspective: '1200px'
          }}
        >
          <AnimatePresence initial={false}>
            {reviews.map((review, index) => {
              const styles = getPositionStyles(index);
              return (
                <motion.div
                  key={review.id}
                  initial={false}
                  animate={{
                    x: styles.x,
                    scale: styles.scale,
                    rotateY: styles.rotateY,
                    zIndex: styles.zIndex,
                    opacity: styles.opacity,
                    filter: styles.filter
                  }}
                  transition={{ 
                    duration: 0.6, 
                    ease: [0.32, 0.72, 0, 1]
                  }}
                  style={{
                    position: 'absolute',
                    width: '100%',
                    maxWidth: '400px',
                    backgroundColor: '#fff',
                    borderRadius: '4px',
                    padding: '40px 30px',
                    boxShadow: '0 20px 40px rgba(0,0,0,0.3)',
                    transformStyle: 'preserve-3d',
                    cursor: styles.scale === 1 ? 'default' : 'pointer'
                  }}
                  onClick={() => setActiveIndex(index)}
                >
                  <div style={{ display: 'flex', gap: '4px', marginBottom: '20px', color: '#000' }}>
                    {[...Array(review.rating)].map((_, i) => (
                      <Star key={i} size={16} fill="#000" strokeWidth={0} />
                    ))}
                  </div>
                  
                  <h3 style={{ 
                    fontSize: '18px', 
                    fontWeight: 800, 
                    letterSpacing: '2px', 
                    color: '#000',
                    margin: '0 0 16px',
                    textTransform: 'uppercase'
                  }}>
                    {review.title}
                  </h3>
                  
                  <p style={{ 
                    fontSize: '14px', 
                    color: '#555', 
                    lineHeight: 1.8,
                    margin: '0 0 30px',
                    minHeight: '80px'
                  }}>
                    "{review.text}"
                  </p>
                  
                  <div style={{
                    fontSize: '12px',
                    fontWeight: 700,
                    letterSpacing: '2px',
                    color: '#000',
                    textTransform: 'uppercase',
                    borderTop: '1px solid #eee',
                    paddingTop: '20px'
                  }}>
                    {review.author}
                  </div>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </div>

        <div style={{ display: 'flex', gap: '20px', marginTop: '40px' }}>
          <button 
            onClick={prevSlide}
            style={{
              width: '50px',
              height: '50px',
              borderRadius: '50%',
              border: '1px solid rgba(255,255,255,0.3)',
              background: 'transparent',
              color: '#fff',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer',
              transition: 'all 0.3s ease'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = '#fff';
              e.currentTarget.style.color = '#000';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = 'transparent';
              e.currentTarget.style.color = '#fff';
            }}
          >
            <ChevronLeft size={24} />
          </button>
          
          <button 
            onClick={nextSlide}
            style={{
              width: '50px',
              height: '50px',
              borderRadius: '50%',
              border: '1px solid rgba(255,255,255,0.3)',
              background: 'transparent',
              color: '#fff',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer',
              transition: 'all 0.3s ease'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = '#fff';
              e.currentTarget.style.color = '#000';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = 'transparent';
              e.currentTarget.style.color = '#fff';
            }}
          >
            <ChevronRight size={24} />
          </button>
        </div>
      </div>
    </section>
  );
}
