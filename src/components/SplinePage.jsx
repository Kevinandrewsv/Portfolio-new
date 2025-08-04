import React, { useRef, useState, useEffect } from 'react';
import Spline from '@splinetool/react-spline';

// URL for your Spline scene
const splineSceneUrl = 'https://prod.spline.design/ja76CGhf2AJW9uNI/scene.splinecode';

export default function OptimizedSplineScene() {
  const containerRef = useRef(null);
  const [isIntersecting, setIsIntersecting] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);

  // --- Step 1: Preload the scene as soon as the component is mounted ---
  useEffect(() => {
    // This effect runs once on component mount.
    // We create a <link> element to instruct the browser to preload the scene file.
    // The browser will download it with a low priority without blocking other resources.
    const link = document.createElement('link');
    link.rel = 'preload';
    link.as = 'fetch'; // Spline scenes are fetched
    link.href = splineSceneUrl;
    link.crossOrigin = 'anonymous';
    document.head.appendChild(link);

    // Clean up the link element when the component unmounts
    return () => {
      document.head.removeChild(link);
    };
  }, []);

  // --- Step 2: Use IntersectionObserver to detect when to render the scene ---
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsIntersecting(true);
          observer.disconnect(); // We only need to trigger this once
        }
      },
      {
        rootMargin: '200px', // Start loading when the user is 200px away
      }
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => {
      if (containerRef.current) {
        observer.unobserve(containerRef.current);
      }
    };
  }, []);

  return (
    <section
      id="spline-scene"
      ref={containerRef}
      className="w-full h-screen bg-black flex items-center justify-center relative"
      aria-label="Interactive 3D scene"
    >
      {/* --- Step 3: High-Fidelity Image Placeholder ---
        This image is a static snapshot of your Spline scene. It loads instantly.
        It's visible until the actual Spline scene signals it's ready via onLoad.
      */}
      <img
        src="/spline-placeholder.jpg" // IMPORTANT: Create this image!
        alt="A placeholder image for the 3D scene."
        className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-1000 ${
          isLoaded ? 'opacity-0' : 'opacity-100'
        }`}
      />

      {/* --- Step 4: Conditional & Graceful Rendering of the Spline Scene ---
        The Spline component is only mounted when `isIntersecting` is true.
        The `onLoad` event from Spline sets `isLoaded` to true, which fades out the placeholder.
      */}
      {isIntersecting && (
        <div className="absolute inset-0 w-full h-full">
            <Spline
              scene={splineSceneUrl}
              onLoad={() => setIsLoaded(true)}
              style={{
                // Start transparent and fade in
                opacity: isLoaded ? 1 : 0,
                transition: 'opacity 1s ease-in-out',
                pointerEvents: 'none' // As in your original code
              }}
            />
        </div>
      )}
    </section>
  );
}