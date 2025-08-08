import React, { useRef, useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import Spline from '@splinetool/react-spline';

// URL for your Spline scene
const splineSceneUrl = 'https://prod.spline.design/ja76CGhf2AJW9uNI/scene.splinecode';

export default function SplinePage() {
  const containerRef = useRef(null);
  const location = useLocation();         // ← make sure Router is up above!
  const [isIntersecting, setIsIntersecting] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);

  // Preload the scene file
  useEffect(() => {
    const link = document.createElement('link');
    link.rel = 'preload';
    link.as = 'fetch';
    link.href = splineSceneUrl;
    link.crossOrigin = 'anonymous';
    document.head.appendChild(link);
    return () => document.head.removeChild(link);
  }, []);

  // If we landed on home ("/"), start loading immediately
  useEffect(() => {
    if (location.pathname === '/') {
      setIsIntersecting(true);
    }
  }, [location.pathname]);

  // Otherwise, watch for intersection
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
      if (containerRef.current) obs.unobserve(containerRef.current);
    };
  }, [isIntersecting]);

  return (
    <section
      id="spline-scene"
      ref={containerRef}
      className="w-full h-screen bg-black flex items-center justify-center relative"
      aria-label="Interactive 3D scene"
    >
      {/* Static placeholder */}
      <img
        src="/spline-placeholder.jpg"
        alt="A placeholder image for the 3D scene."
        className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-1000 ${
          isLoaded ? 'opacity-0' : 'opacity-100'
        }`}
      />

      {/* Mount the real Spline component once we're intersecting (or on home) */}
      {isIntersecting && (
        <div className="absolute inset-0 w-full h-full">
          <Spline
            scene={splineSceneUrl}
            onLoad={() => setIsLoaded(true)}
            style={{
              opacity: isLoaded ? 1 : 0,
              transition: 'opacity 1s ease-in-out',
              pointerEvents: 'none',
            }}
          />
        </div>
      )}
    </section>
  );
}
