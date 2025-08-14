// src/lib/lenis.js
// Initializes Lenis once and provides getters for other modules/components.
// Usage: call initLenis() once (e.g., in index.jsx) and import getLenis() where needed.

import Lenis from "lenis";

let lenis = null;

export function initLenis(options = {}) {
  if (typeof window === "undefined") return null;
  if (lenis) return lenis;

  lenis = new Lenis({
    duration: options.duration ?? 1.0,
    easing: options.easing ?? (t => Math.min(1, 1.001 - Math.pow(2, -10 * t))),
    smooth: options.smooth ?? true,
    lerp: options.lerp ?? 0.075,
    orientation: options.orientation ?? "vertical",
    wheelMultiplier: options.wheelMultiplier ?? 1,
    ...options,
  });

  // RAF loop
  function raf(time) {
    lenis.raf(time);
    requestAnimationFrame(raf);
  }
  requestAnimationFrame(raf);

  // Optional global for debugging in browser console
  if (typeof window !== "undefined") window._lenis = lenis;

  return lenis;
}

export function getLenis() {
  return lenis;
}
