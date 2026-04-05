import React from 'react';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { motion } from 'framer-motion';

export default function Success() {
  const router = useRouter();

  return (
    <>
      <Head>
        <title>Order Confirmed | VALENCIRE®</title>
        <link href="https://fonts.googleapis.com/css2?family=Pinyon+Script&display=swap" rel="stylesheet" />
        <style>{`
          .liquid-glass-text {
            font-family: 'Pinyon Script', cursive;
            font-size: clamp(60px, 12vw, 120px);
            font-weight: 400;
            margin: 0;
            line-height: 1.2;
            
            /* Liquid glass effect */
            background: linear-gradient(
              135deg,
              rgba(255,255,255,0.9) 0%,
              rgba(255,255,255,1) 40%,
              rgba(255,255,255,0.3) 60%,
              rgba(255,255,255,0.8) 100%
            );
            background-size: 200% auto;
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
            text-shadow: 
              0px 4px 20px rgba(255,255,255,0.15),
              0px 1px 2px rgba(255,255,255,0.4);
            
            animation: shine 4s linear infinite;
          }

          @keyframes shine {
            to {
              background-position: 200% center;
            }
          }
        `}</style>
      </Head>

      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 1.2, ease: "easeInOut" }}
        style={{
          minHeight: '100vh',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor: '#050505',
          color: '#FFF',
          padding: '20px',
          textAlign: 'center',
          position: 'relative',
          overflow: 'hidden'
        }}
      >
        {/* Ambient background glow */}
        <div style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: '60vw',
          height: '60vw',
          background: 'radial-gradient(circle, rgba(255,255,255,0.03) 0%, rgba(255,255,255,0) 70%)',
          pointerEvents: 'none',
          zIndex: 0
        }} />

        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.8, duration: 1, ease: "easeOut" }}
          style={{ position: 'relative', zIndex: 1 }}
        >
          <div style={{
            color: '#888',
            fontFamily: 'var(--font, Inter)',
            fontSize: '11px',
            letterSpacing: '4px',
            textTransform: 'uppercase',
            marginBottom: '10px'
          }}>
            V A L E N C I R E
          </div>

          <h1 className="liquid-glass-text">
            Thank You
          </h1>
          
          <div style={{
            width: '1px',
            height: '40px',
            background: 'linear-gradient(to bottom, rgba(255,255,255,0.5), transparent)',
            margin: '30px auto'
          }} />
          
          <p style={{
            color: '#AAA',
            fontFamily: 'var(--font, Inter)',
            fontSize: '13px',
            letterSpacing: '1.5px',
            maxWidth: '380px',
            lineHeight: 1.8,
            margin: '0 auto 50px'
          }}>
            Your payment was successful. The signature pieces you acquired are being prepared for dispatch.
          </p>

          <button 
            onClick={() => router.push('/')}
            style={{
              padding: '14px 36px',
              border: '1px solid rgba(255,255,255,0.3)',
              background: 'rgba(255,255,255,0.03)',
              backdropFilter: 'blur(10px)',
              color: '#FFF',
              fontFamily: 'var(--font, Inter)',
              textTransform: 'uppercase',
              letterSpacing: '3px',
              fontSize: '10px',
              fontWeight: 600,
              cursor: 'pointer',
              transition: 'all 0.4s ease',
              borderRadius: '2px'
            }}
            onMouseOver={(e) => {
              e.currentTarget.style.background = '#FFF';
              e.currentTarget.style.color = '#000';
            }}
            onMouseOut={(e) => {
              e.currentTarget.style.background = 'rgba(255,255,255,0.03)';
              e.currentTarget.style.color = '#FFF';
            }}
          >
            RETURN TO ARCHIVE
          </button>
        </motion.div>
      </motion.div>
    </>
  );
}

Success.getLayout = function getLayout(page) {
  return page; // Cinematic standalone page
};
