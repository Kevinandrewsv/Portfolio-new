// src/components/InteractiveBackground.jsx
import React, { useEffect, useRef } from "react";

/**
 * Enhanced DOM-based interactive background (no <canvas>).
 *
 * Props:
 *  - particleCount (number) default: 28
 *  - maxSize (number) max particle diameter in px
 *  - minSize (number) min particle diameter in px
 *  - interactionStrength (number) how strongly particles move toward pointer
 *
 * Note: this variant renders neutral/glassy (non-colored) balls.
 */
const InteractiveBackground = ({
  particleCount = 28,
  maxSize = 48,
  minSize = 12,
  interactionStrength = 0.18,
}) => {
  const containerRef = useRef(null);
  const particlesRef = useRef([]);
  const rafRef = useRef(null);
  const mouse = useRef({ x: 0.5, y: 0.5, px: 0.5, py: 0.5 });
  const paused = useRef(false);
  const visibleRef = useRef(true);

  // neutral palette (we keep everything glassy / white / translucent)
  const neutralColor = "rgba(255,255,255,0.12)";

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // adapt particle count for tiny screens to save perf
    const finalCount =
      window.innerWidth < 720 ? Math.max(6, Math.floor(particleCount * 0.5)) : particleCount;

    // create particles (DOM nodes appended to container to avoid rerendering)
    const particles = [];
    for (let i = 0; i < finalCount; i++) {
      const el = document.createElement("div");
      el.className = "interactive-particle enhanced";
      const size = Math.round(minSize + Math.random() * (maxSize - minSize));
      el.style.width = `${size}px`;
      el.style.height = `${size}px`;
      // base position stored in data attrs as percentages
      const leftPct = Math.random() * 100;
      const topPct = Math.random() * 100;
      el.style.left = `${leftPct}%`;
      el.style.top = `${topPct}%`;
      el.dataset.baseLeft = `${leftPct}`;
      el.dataset.baseTop = `${topPct}`;
      el.dataset.depth = (0.5 + Math.random() * 1.6).toString(); // depth influences parallax and movement
      el.dataset.size = `${size}`;
      el.style.opacity = `${0.28 + Math.random() * 0.7}`;

      // ---------- GLASSY NEUTRAL STYLING ----------
      // neutral glass: white highlight -> soft translucent white body
      el.style.background = `radial-gradient(circle at 30% 28%, rgba(255,255,255,0.82) 0%, rgba(255,255,255,0.36) 8%, rgba(255,255,255,0.14) 45%)`;

      // glass edge
      el.style.border = `1px solid rgba(255,255,255,0.14)`;
      el.style.borderRadius = "999px";

      // soft inset shadow for depth + gentle outer blur (use neutral darker shadow)
      const outerBlur = Math.min(16, Math.round(size / 1.6));
      const insetY = Math.min(5, Math.round(size / 6));
      const insetBlur = Math.min(10, Math.round(size / 3));
      el.style.boxShadow = `inset 0 ${insetY}px ${insetBlur}px rgba(0,0,0,0.14), 0 3px ${outerBlur}px rgba(0,0,0,0.09)`;

      // tiny element blur to soften hard edges
      el.style.filter = `blur(${Math.min(1.0, Math.max(0.12, size / 44))}px)`;

      // backdropFilter for extra frosted effect (best-effort; optional)
      el.style.backdropFilter = "blur(4px)";
      el.style.webkitBackdropFilter = "blur(4px)";

      el.style.pointerEvents = "none";
      // include filter in willChange because we're animating transform + opacity + small blur
      el.style.willChange = "transform, opacity, filter";
      // ---------- END GLASSY NEUTRAL STYLING ----------

      container.appendChild(el);
      particles.push(el);
    }
    particlesRef.current = particles;

    // PERF: don't run when tab hidden, or if container not visible
    const onVisibility = () => {
      paused.current = document.hidden || !visibleRef.current;
      if (!paused.current && !rafRef.current) rafRef.current = requestAnimationFrame(tick);
      if (paused.current && rafRef.current) {
        cancelAnimationFrame(rafRef.current);
        rafRef.current = null;
      }
    };

    // pause when component scrolled out of view
    const observer = new IntersectionObserver(
      (entries) => {
        visibleRef.current = entries[0].isIntersecting;
        onVisibility();
      },
      { root: null, threshold: 0.05 }
    );
    observer.observe(container);

    document.addEventListener("visibilitychange", onVisibility);

    // pointer handling (throttled-ish by the RAF smoothing)
    const rect = () => container.getBoundingClientRect();
    const onPointer = (ev) => {
      if (ev.touches && ev.touches[0]) ev = ev.touches[0];
      const r = rect();
      const x = ((ev.clientX - r.left) / r.width) || 0;
      const y = ((ev.clientY - r.top) / r.height) || 0;
      mouse.current.x = Math.max(0, Math.min(1, x));
      mouse.current.y = Math.max(0, Math.min(1, y));
      // store css vars for subtle background gradient use
      container.style.setProperty("--mx", `${(mouse.current.x * 100).toFixed(2)}%`);
      container.style.setProperty("--my", `${(mouse.current.y * 100).toFixed(2)}%`);
    };

    // on pointer down -> ripple + neutral burst micro-particles
    const onDown = (ev) => {
      if (ev.touches && ev.touches[0]) ev = ev.touches[0];
      const r = rect();
      const cx = ev.clientX - r.left;
      const cy = ev.clientY - r.top;
      const ripple = document.createElement("div");
      ripple.className = "interactive-ripple";
      ripple.style.left = `${cx}px`;
      ripple.style.top = `${cy}px`;
      container.appendChild(ripple);
      setTimeout(() => ripple.remove(), 900);

      // burst: spawn a few temporary neutral micro particles that fade away
      const burstCount = Math.min(10, Math.max(4, Math.round(finalCount * 0.18)));
      for (let i = 0; i < burstCount; i++) {
        const b = document.createElement("div");
        b.className = "interactive-burst";
        const s = 5 + Math.random() * 8;
        b.style.width = `${s}px`;
        b.style.height = `${s}px`;
        b.style.left = `${cx + (Math.random() - 0.5) * 36}px`;
        b.style.top = `${cy + (Math.random() - 0.5) * 36}px`;
        b.style.opacity = "0.95";
        // neutral radial (white -> transparent)
        b.style.background = `radial-gradient(circle, rgba(255,255,255,0.92), rgba(255,255,255,0.22))`;
        container.appendChild(b);
        // animate using CSS animation, remove after done
        setTimeout(() => b.remove(), 850 + Math.random() * 300);
      }
    };

    // smoothing + physics tick
    let last = performance.now();
    const tick = (t) => {
      if (paused.current) {
        rafRef.current = null;
        return;
      }
      const dt = Math.min(40, t - last);
      last = t;
      // lerp pointer for smoothness
      const lerpAmount = Math.min(0.35, dt / 160);
      mouse.current.px += (mouse.current.x - mouse.current.px) * lerpAmount;
      mouse.current.py += (mouse.current.y - mouse.current.py) * lerpAmount;

      const w = container.clientWidth;
      const h = container.clientHeight;
      const pxCenter = mouse.current.px * w;
      const pyCenter = mouse.current.py * h;

      particlesRef.current.forEach((el, i) => {
        const depth = parseFloat(el.dataset.depth || "1");
        const baseLeftPercent = parseFloat(el.dataset.baseLeft || "50");
        const baseTopPercent = parseFloat(el.dataset.baseTop || "50");
        const baseX = (baseLeftPercent / 100) * w;
        const baseY = (baseTopPercent / 100) * h;

        // pointer vector
        const dx = pxCenter - baseX;
        const dy = pyCenter - baseY;
        const dist = Math.sqrt(dx * dx + dy * dy);
        // interaction radius scales with depth and screen size
        const radius = 220 + depth * 90;
        // attraction vs gentle repel based on distance
        const influence = Math.max(-1, Math.min(1, (radius - dist) / radius));

        // offset influenced by pointer, depth, and global interactionStrength
        const offsetX = (dx / (radius || 1)) * influence * (20 * depth) * interactionStrength * 6;
        const offsetY = (dy / (radius || 1)) * influence * (12 * depth) * interactionStrength * 6;

        // small floating motion
        const floatX = Math.sin((t / (2000 + i * 23)) + i) * (2 + depth * 2);
        const floatY = Math.cos((t / (1700 + i * 17)) + i * 1.3) * (1 + depth * 1.2);

        const tx = baseX + offsetX + floatX;
        const ty = baseY + offsetY + floatY;

        // subtle scale effect when pointer is close (kept small for neutral look)
        const proximityScale = Math.max(1, 1 + (Math.max(0, (radius - dist) / radius) * 0.10));
        el.style.transform = `translate3d(${tx - baseX}px, ${ty - baseY}px, 0) scale(${proximityScale})`;
        // neutral opacity flicker to add life
        const baseOpacity = Math.min(1, parseFloat(el.style.opacity || "0.9"));
        el.style.opacity = `${Math.max(0.18, Math.min(1, baseOpacity + (Math.max(0, (radius - dist) / (radius * 4)))) )}`;
      });

      rafRef.current = requestAnimationFrame(tick);
    };

    // reduced-motion users: disable fancy movement, keep static subtle gradient
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduceMotion) {
      // minimal motion
      particlesRef.current.forEach((el) => {
        el.style.transition = "opacity 400ms linear, transform 400ms linear";
      });
    }

    // hook events (use named handlers for correct removal)
    const touchMoveHandler = (e) => {
      if (e.touches && e.touches[0]) onPointer(e.touches[0]);
    };
    const touchStartHandler = (e) => {
      if (e.touches && e.touches[0]) onDown(e.touches[0]);
    };

    window.addEventListener("pointermove", onPointer, { passive: true });
    window.addEventListener("pointerdown", onDown, { passive: true });
    window.addEventListener("touchmove", touchMoveHandler, { passive: true });
    window.addEventListener("touchstart", touchStartHandler, { passive: true });

    // start loop
    paused.current = document.hidden || !visibleRef.current;
    if (!paused.current) rafRef.current = requestAnimationFrame(tick);

    // cleanup
    return () => {
      // remove particles & bursts & ripples
      particlesRef.current.forEach((el) => el.remove());
      particlesRef.current = [];
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      observer.disconnect();
      document.removeEventListener("visibilitychange", onVisibility);
      window.removeEventListener("pointermove", onPointer);
      window.removeEventListener("pointerdown", onDown);
      window.removeEventListener("touchmove", touchMoveHandler);
      window.removeEventListener("touchstart", touchStartHandler);
    };
  }, [particleCount, maxSize, minSize, interactionStrength]);

  return <div ref={containerRef} className="interactive-bg enhanced-bg" aria-hidden="true" />;
};

export default InteractiveBackground;
