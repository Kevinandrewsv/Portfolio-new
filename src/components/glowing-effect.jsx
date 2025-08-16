"use client";

import React, { memo, useCallback, useEffect, useRef } from "react";

// tiny classnames helper
const cn = (...args) => args.filter(Boolean).join(" ");

const GlowingEffect = memo(function GlowingEffect(props) {
  const {
    blur = 0,
    inactiveZone = 0.7,
    proximity = 72,
    spread = 20,
    variant = "default",
    glow = true,
    className,
    movementDuration = 0.9,
    borderWidth = 3,
    // Keep `disabled` prop available in case you want to fully disable the effect,
    // but default to false so it works out of the box
    disabled = false,
  } = props;

  const containerRef = useRef(null);
  const lastPosition = useRef({ x: 0, y: 0 });
  const rafRef = useRef(null);
  const animCancelRef = useRef(null);

  // small rAF animator (ease-out cubic)
  const animateValue = (from, to, { duration = 0.9, onUpdate } = {}) => {
    if (animCancelRef.current) {
      cancelAnimationFrame(animCancelRef.current);
      animCancelRef.current = null;
    }
    const start = performance.now();
    const durMs = Math.max(1, duration * 1000);

    const step = (now) => {
      let t = (now - start) / durMs;
      if (t > 1) t = 1;
      const eased = 1 - Math.pow(1 - t, 3); // easeOutCubic
      const value = from + (to - from) * eased;
      onUpdate(value);
      if (t < 1) {
        animCancelRef.current = requestAnimationFrame(step);
      } else {
        animCancelRef.current = null;
      }
    };

    animCancelRef.current = requestAnimationFrame(step);
    return () => {
      if (animCancelRef.current) {
        cancelAnimationFrame(animCancelRef.current);
        animCancelRef.current = null;
      }
    };
  };

  const handleMove = useCallback(
    (pointerEvent) => {
      const element = containerRef.current;
      if (!element) return;

      // throttle via rAF
      if (rafRef.current) {
        cancelAnimationFrame(rafRef.current);
      }

      rafRef.current = requestAnimationFrame(() => {
        const rect = element.getBoundingClientRect();
        const mouseX = pointerEvent?.clientX ?? lastPosition.current.x;
        const mouseY = pointerEvent?.clientY ?? lastPosition.current.y;
        if (pointerEvent) lastPosition.current = { x: mouseX, y: mouseY };

        const center = [rect.left + rect.width * 0.5, rect.top + rect.height * 0.5];
        const distanceFromCenter = Math.hypot(mouseX - center[0], mouseY - center[1]);
        const inactiveRadius = 0.5 * Math.min(rect.width, rect.height) * inactiveZone;

        // If pointer is inside the small central inactive zone, hide the highlight
        if (distanceFromCenter < inactiveRadius) {
          element.style.setProperty("--active", "0");
          return;
        }

        const isNear =
          mouseX > rect.left - proximity &&
          mouseX < rect.left + rect.width + proximity &&
          mouseY > rect.top - proximity &&
          mouseY < rect.top + rect.height + proximity;

        element.style.setProperty("--active", isNear ? "1" : "0");

        if (!isNear) return;

        const currentAngle = parseFloat(element.style.getPropertyValue("--start")) || 0;
        let targetAngle =
          (180 * Math.atan2(mouseY - center[1], mouseX - center[0])) / Math.PI + 90;

        const angleDiff = ((targetAngle - currentAngle + 180) % 360) - 180;
        const newAngle = currentAngle + angleDiff;

        animateValue(currentAngle, newAngle, {
          duration: movementDuration,
          onUpdate: (v) => {
            element.style.setProperty("--start", String(v));
          },
        });
      });
    },
    [inactiveZone, proximity, movementDuration]
  );

  useEffect(() => {
    if (disabled) return;

    const onPointer = (e) => handleMove(e);
    // Always listen globally (no race on mount/unmount). The effect will only
    // activate for pointers near the element.
    window.addEventListener("pointermove", onPointer, { passive: true });
    window.addEventListener("scroll", () => handleMove(), { passive: true });

    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      if (animCancelRef.current) cancelAnimationFrame(animCancelRef.current);
      window.removeEventListener("pointermove", onPointer);
      window.removeEventListener("scroll", () => handleMove());
    };
  }, [handleMove, disabled]);

  const gradient =
    variant === "white"
      ? `repeating-conic-gradient(from 236.84deg at 50% 50%, var(--black), var(--black) calc(25% / var(--repeating-conic-gradient-times)))`
      : `radial-gradient(circle, #dd7bbb 10%, #dd7bbb00 20%),
         radial-gradient(circle at 40% 40%, #d79f1e 5%, #d79f1e00 15%),
         radial-gradient(circle at 60% 60%, #5a922c 10%, #5a922c00 20%),
         radial-gradient(circle at 40% 60%, #4c7894 10%, #4c789400 20%),
         repeating-conic-gradient(
           from 236.84deg at 50% 50%,
           #dd7bbb 0%,
           #d79f1e calc(25% / var(--repeating-conic-gradient-times)),
           #5a922c calc(50% / var(--repeating-conic-gradient-times)),
           #4c7894 calc(75% / var(--repeating-conic-gradient-times)),
           #dd7bbb calc(100% / var(--repeating-conic-gradient-times))
         )`;

  return (
    <div
      ref={containerRef}
      style={{
        "--blur": `${blur}px`,
        "--spread": spread,
        "--start": "0",
        "--active": "0",
        "--glowingeffect-border-width": `${borderWidth}px`,
        "--repeating-conic-gradient-times": "5",
        "--gradient": gradient,
      }}
      className={cn(
        "pointer-events-none absolute inset-0 rounded-[inherit] opacity-100 transition-opacity",
        blur > 0 && "blur-[var(--blur)]",
        className
      )}
      aria-hidden="true"
    >
      <div
        className={cn(
          "glow rounded-[inherit]",
          'after:content-[""] after:rounded-[inherit] after:absolute after:inset-[calc(-1*var(--glowingeffect-border-width))]',
          "after:[border:var(--glowingeffect-border-width)_solid_transparent]",
          "after:[background:var(--gradient)] after:[background-attachment:fixed]",
          "after:opacity-[var(--active)] after:transition-opacity after:duration-300",
          "after:[mask-clip:padding-box,border-box]",
          "after:[mask-composite:intersect]",
          "after:[mask-image:linear-gradient(#0000,#0000),conic-gradient(from_calc((var(--start)-var(--spread))*1deg),#00000000_0deg,#fff,#00000000_calc(var(--spread)*2deg))]"
        )}
      />
    </div>
  );
});

GlowingEffect.displayName = "GlowingEffect";

export { GlowingEffect };
