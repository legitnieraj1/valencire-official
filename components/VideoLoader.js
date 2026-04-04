import { useEffect, useRef, useState, useCallback } from 'react';

const ROUTE_THRESHOLD_MS = 350; // Only show for slow route transitions
const FADE_IN_MS  = 180;
const FADE_OUT_MS = 500;

/**
 * VideoLoader
 *
 * Props:
 *   active    {boolean}  — true = loading in progress
 *   immediate {boolean}  — skip threshold, show straight away (used for initial page load)
 *   onDone    {function} — called once overlay has fully faded out
 */
export default function VideoLoader({ active, immediate, onDone }) {
  const overlayRef      = useRef(null);
  const videoRef        = useRef(null);
  const thresholdTimer  = useRef(null);
  const fadeOutTimer    = useRef(null);
  const shownRef        = useRef(false);   // true once we've committed to showing

  const [visible,   setVisible]   = useState(false);
  const [isMobile,  setIsMobile]  = useState(false);

  // Detect mobile once (SSR-safe)
  useEffect(() => {
    if (typeof window === 'undefined') return;
    const mobile =
      window.innerWidth <= 768 ||
      /android|iphone|ipad|ipod|mobile/i.test(navigator.userAgent);
    setIsMobile(mobile);
  }, []);

  /* ─── Fade-out ─────────────────────────────────────────────────────────── */
  const triggerFadeOut = useCallback(() => {
    clearTimeout(fadeOutTimer.current);
    const el = overlayRef.current;

    if (!el) {
      setVisible(false);
      shownRef.current = false;
      onDone?.();
      return;
    }

    el.style.transition = `opacity ${FADE_OUT_MS}ms cubic-bezier(0.4,0,0.2,1)`;
    el.style.opacity    = '0';

    fadeOutTimer.current = setTimeout(() => {
      setVisible(false);
      shownRef.current = false;
      onDone?.();
    }, FADE_OUT_MS + 30);
  }, [onDone]);

  /* ─── React to active / immediate changes ─────────────────────────────── */
  useEffect(() => {
    clearTimeout(thresholdTimer.current);
    clearTimeout(fadeOutTimer.current);

    if (active) {
      if (immediate) {
        // Initial page load → show overlay right now, no waiting
        shownRef.current = true;
        setVisible(true);
      } else {
        // Route transition → only show if still loading after threshold
        thresholdTimer.current = setTimeout(() => {
          shownRef.current = true;
          setVisible(true);
        }, ROUTE_THRESHOLD_MS);
      }
    } else {
      // Loading finished
      if (shownRef.current) {
        triggerFadeOut();
      } else {
        clearTimeout(thresholdTimer.current);
        onDone?.();
      }
    }

    return () => clearTimeout(thresholdTimer.current);
  }, [active, immediate, triggerFadeOut, onDone]);

  /* ─── Fade-in + play video once overlay is in the DOM ─────────────────── */
  useEffect(() => {
    if (!visible) return;

    const el  = overlayRef.current;
    const vid = videoRef.current;

    if (el) {
      el.style.opacity    = '0';
      el.style.transition = `opacity ${FADE_IN_MS}ms ease`;
      void el.offsetHeight; // force reflow
      el.style.opacity = '1';
    }

    if (vid) {
      vid.currentTime = 0;
      vid.play().catch(() => {/* autoplay blocked — overlay still shows */});
    }
  }, [visible]);

  /* ─── Cleanup ──────────────────────────────────────────────────────────── */
  useEffect(() => () => {
    clearTimeout(thresholdTimer.current);
    clearTimeout(fadeOutTimer.current);
  }, []);

  if (!visible) return null;

  const src = isMobile ? '/smoothloader-mobile.mp4' : '/smoothloader.mp4';

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: `
        .vl-overlay {
          position: fixed;
          inset: 0;
          background: #000;
          z-index: 99999;
          overflow: hidden;
          pointer-events: all;
        }
        .vl-video {
          position: absolute;
          inset: 0;
          width: 100%;
          height: 100%;
          object-fit: cover;
          display: block;
        }
      `}} />

      <div className="vl-overlay" ref={overlayRef} aria-hidden="true">
        <video
          ref={videoRef}
          className="vl-video"
          src={src}
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
          disablePictureInPicture
          controlsList="nodownload nofullscreen noremoteplayback"
        />
      </div>
    </>
  );
}
