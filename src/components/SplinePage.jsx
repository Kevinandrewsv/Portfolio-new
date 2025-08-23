import React, { useRef, useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import Spline from '@splinetool/react-spline';

// URL for your Spline scene
const splineSceneUrl = 'https://prod.spline.design/ja76CGhf2AJW9uNI/scene.splinecode';

export default function SplinePage() {
  const containerRef = useRef(null);
  const location = useLocation(); // ensure Router is above
  const [isIntersecting, setIsIntersecting] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);

  // responsive / mobile control
  const [isMobile, setIsMobile] = useState(false);
  const [userRequestedLoadOnMobile, setUserRequestedLoadOnMobile] = useState(false);

  // Preload the scene file (keeps your previous preload logic)
  useEffect(() => {
    const link = document.createElement('link');
    link.rel = 'preload';
    link.as = 'fetch';
    link.href = splineSceneUrl;
    link.crossOrigin = 'anonymous';
    document.head.appendChild(link);
    return () => {
      document.head.removeChild(link);
    };
  }, []);

  // detect mobile via matchMedia (updates on resize / orientation change)
  useEffect(() => {
    const mq = window.matchMedia('(max-width: 1023px)'); // <= lg breakpoint treated as mobile
    const set = () => setIsMobile(mq.matches);
    set();
    mq.addEventListener?.('change', set);
    return () => mq.removeEventListener?.('change', set);
  }, []);

  // If we landed on home ("/"), start loading immediately
  useEffect(() => {
    if (location.pathname === '/') {
      setIsIntersecting(true);
    }
  }, [location.pathname]);

  // Intersection observer — will flip isIntersecting when container is near viewport
  useEffect(() => {
    if (isIntersecting) return;

    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsIntersecting(true);
          obs.disconnect();
        }
      },
      { rootMargin: '200px' }
    );

    if (containerRef.current) obs.observe(containerRef.current);
    return () => {
      try {
        if (containerRef.current) obs.unobserve(containerRef.current);
      } catch (e) {}
    };
  }, [isIntersecting]);

  // decide whether to actually mount Spline:
  // - On desktop: mount when intersecting
  // - On mobile: mount only if userRequestedLoadOnMobile || (optional) you can allow auto-load if tiny scenes
  const shouldMountSpline = isIntersecting && (!isMobile || userRequestedLoadOnMobile);

  return (
    <section
      id="spline-scene"
      ref={containerRef}
      aria-label="Interactive 3D scene"
      className="
        w-full
        relative
        flex
        items-center
        justify-center
        overflow-hidden
        "
      /* responsive height:
         - mobile: ~60vh so it doesn't steal full screen
         - tablet: 80vh
         - desktop/lg: full viewport height
       */
      style={{ minHeight: isMobile ? '60vh' : '100vh' }}
    >
      {/* Static placeholder (always shown beneath until scene fades in) */}
      <img
        src="/spline-placeholder.jpg"
        alt="A placeholder image for the 3D scene."
        className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-1000 ${
          isLoaded ? 'opacity-0' : 'opacity-100'
        }`}
      />

      {/* Mobile overlay: show CTA to load scene (only on mobile and if not yet requested) */}
      {isMobile && !userRequestedLoadOnMobile && (
        <div
          className="absolute inset-0 flex flex-col items-center justify-center p-4"
          aria-hidden={false}
        >
          <div className="max-w-[92%] text-center  backdrop-blur-sm border border-white/6 rounded-2xl px-4 py-3">
            <p className="text-sm text-white mb-2">Interactive 3D scene — heavy on data</p>
            <p className="text-[12px] text-slate-300 mb-3">Tap to load the interactive experience (recommended on Wi-Fi)</p>
            <div className="flex items-center justify-center gap-3">
              <button
                onClick={() => setUserRequestedLoadOnMobile(true)}
                className="px-4 py-2 rounded-full bg-white/6 border border-white/10 text-white text-sm hover:scale-105 transition"
                aria-label="Load 3D scene"
              >
                Load 3D Scene
              </button>
              <button
                onClick={() => {
                  // optional: let users open a high-res still or view on desktop
                  // for now we'll just keep placeholder; you can change this to navigate
                }}
                className="px-3 py-2 rounded-full bg-transparent text-slate-300 text-sm"
              >
                Keep placeholder
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Mount the real Spline component once conditions are met */}
      {shouldMountSpline && (
        <div className="absolute inset-0 w-full h-full">
          {/* small loader centered while Spline isn't ready */}
          {!isLoaded && (
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
              <div
                role="status"
                aria-live="polite"
                className="flex flex-col items-center gap-2"
              >
                <svg
                  className="animate-spin h-8 w-8 text-white/90"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  />
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8v8z"
                  />
                </svg>
                <span className="text-xs text-white/80">Loading 3D scene…</span>
              </div>
            </div>
          )}

          <Spline
            scene={splineSceneUrl}
            onLoad={() => setIsLoaded(true)}
            style={{
              opacity: isLoaded ? 1 : 0,
              transition: 'opacity 1s ease-in-out',
              // enable pointer events on desktop or if the mobile user explicitly requested the scene
              pointerEvents: !isMobile || userRequestedLoadOnMobile ? 'auto' : 'none',
              width: '100%',
              height: '100%',
            }}
          />
        </div>
      )}
    </section>
  );
}
