import '../styles/globals.css';
import { CartProvider } from '../context/CartContext';
import Layout from '../components/Layout';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { useState, useEffect, useRef } from 'react';
import VideoLoader from '../components/VideoLoader';
import { products } from '../data/products';

// ─── Asset preloaders ──────────────────────────────────────────────────────

/** Preload a single image; always resolves (never rejects). */
function preloadImage(src) {
  return new Promise((resolve) => {
    if (!src) return resolve();
    const img = new window.Image();
    img.onload = img.onerror = resolve;
    img.src = src;
  });
}

/**
 * Give the browser a nudge to start buffering a video file.
 * We only need the first few frames, so `canplay` is sufficient.
 * Falls back after 4 s to never block the loader indefinitely.
 */
function preloadVideo(src) {
  return new Promise((resolve) => {
    if (!src) return resolve();
    const v = document.createElement('video');
    v.muted   = true;
    v.preload = 'auto';
    const cleanup = () => { v.src = ''; resolve(); };
    const timer   = setTimeout(cleanup, 4000);
    v.oncanplay = () => { clearTimeout(timer); cleanup(); };
    v.onerror   = () => { clearTimeout(timer); resolve(); };
    v.src = src;
  });
}

// ─── All assets we want ready before the loader dismisses ─────────────────

function buildAssetList() {
  const imageSrcs = [
    '/LOGO BRO.png',
    '/valencire main logo.png',
    // All product images (auto-derived from data)
    ...products.flatMap(p => [p.images.back, p.images.front].filter(Boolean)),
  ];

  const videoSrcs = [
    '/video.mp4',
    '/videomobile.mp4',
  ];

  return [
    ...imageSrcs.map(preloadImage),
    ...videoSrcs.map(preloadVideo),
  ];
}

// Minimum time (ms) the loader must stay visible so the video gets screen time
const MIN_LOADER_MS = 2800;

// ─── App ──────────────────────────────────────────────────────────────────

function MyApp({ Component, pageProps }) {
  const router = useRouter();

  const [loaderActive,  setLoaderActive]  = useState(true);
  const [isInitialLoad, setIsInitialLoad] = useState(true);
  const initialDone = useRef(false);

  /* ─── INITIAL LOAD: preload everything while the video plays ─────────── */
  useEffect(() => {
    if (initialDone.current) return;
    if (typeof window === 'undefined') return;

    const startTime = Date.now();

    const finish = () => {
      if (initialDone.current) return;
      initialDone.current = true;
      setLoaderActive(false);
      setIsInitialLoad(false);
    };

    // Build the list inside the effect so `window` / `document` are available
    const assetPromises = buildAssetList();

    // Wait for ALL assets AND minimum display time, whichever is last
    Promise.all(assetPromises).then(() => {
      const elapsed   = Date.now() - startTime;
      const remaining = Math.max(0, MIN_LOADER_MS - elapsed);
      setTimeout(finish, remaining);
    });

    // Safety net: never block longer than 8 s total
    const safetyTimer = setTimeout(finish, 8000);
    return () => clearTimeout(safetyTimer);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  /* ─── ROUTE TRANSITIONS: smart threshold ─────────────────────────────── */
  useEffect(() => {
    const handleStart = (url) => {
      if (url.split('?')[0] !== router.asPath.split('?')[0]) {
        setLoaderActive(true);
      }
    };
    const handleEnd = () => setLoaderActive(false);

    router.events.on('routeChangeStart',    handleStart);
    router.events.on('routeChangeComplete', handleEnd);
    router.events.on('routeChangeError',    handleEnd);

    return () => {
      router.events.off('routeChangeStart',    handleStart);
      router.events.off('routeChangeComplete', handleEnd);
      router.events.off('routeChangeError',    handleEnd);
    };
  }, [router]);

  const getLayout = Component.getLayout || ((page) => <Layout>{page}</Layout>);

  return (
    <CartProvider>
      <Head>
        <title>VALENCIRE® — Crafted for the Extraordinary</title>
        <meta name="description" content="Premium Indian streetwear — compression, oversized, and limited edition drops. Shop Valencire." />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        {/* Google Fonts — Inter */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800;900&display=swap" rel="stylesheet" />
        {/* Preload the loader videos themselves so they play without buffering */}
        <link rel="preload" as="video" href="/smoothloader.mp4" />
        <link rel="preload" as="video" href="/smoothloader-mobile.mp4" />
      </Head>

      {/*
        immediate=true  → bypass threshold, show straight away (initial open)
        immediate=false → only show if route transition takes > 350 ms
      */}
      <VideoLoader
        active={loaderActive}
        immediate={isInitialLoad}
        onDone={() => setLoaderActive(false)}
      />

      {getLayout(<Component {...pageProps} />)}
    </CartProvider>
  );
}

export default MyApp;
