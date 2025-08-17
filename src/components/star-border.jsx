// src/components/star-border.jsx
import React from "react";
import { cn } from "@/lib/utils";

/**
 * StarBorder — Glossy Capsule CTA (sheen removed)
 *
 * Props:
 * - as, color, speed, variant, size, className, children
 *
 * Note: innerBorder and chevron are explicitly consumed here so they are NOT forwarded
 *       to the DOM (prevents React warnings about unknown DOM attributes).
 */
export function StarBorder({
  as: Component = "button",
  color,
  speed = "8s",
  variant = "glassy",
  size = "compact",
  className = "",
  children,
  innerBorder = false, // removed from ...props so won't be forwarded
  chevron = false,      // removed from ...props so won't be forwarded
  ...props
}) {
  const haloColor = color || "rgba(120,130,255,0.95)";

  const sizes = {
    compact: {
      pad: "px-4 py-2",
      heightClass: "h-10",
      text: "text-sm",
      radius: "rounded-full",
    },
    md: {
      pad: "px-5 py-2.5",
      heightClass: "h-12",
      text: "text-base",
      radius: "rounded-full",
    },
  };

  const s = sizes[size] || sizes.compact;

  const topAnim = `star-movement-top ${speed} linear infinite`;
  const bottomAnim = `star-movement-bottom ${speed} linear infinite`;
  // gloss shimmer slower and very soft
  const glossAnim = `gloss-shimmer ${Math.max(parseFloat(speed) / 2 || 4, 3)}s linear infinite`;

  const roleProps =
    Component === "a" && (!props.href || props.href === "#")
      ? { role: "button", tabIndex: 0 }
      : {};

  const innerClass = innerBorder ? "has-inner-border" : "";

  return (
    <Component
      {...roleProps}
      {...props} // safe: innerBorder & chevron are no longer in props
      className={cn(
        "group relative inline-flex items-center overflow-hidden select-none",
        s.pad,
        s.heightClass,
        s.radius,
        "transform-gpu transition-all duration-250 ease-out",
        "focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-indigo-400",
        innerClass,
        className
      )}
      title={props.title || (typeof children === "string" ? children : "Action")}
    >
      {/* Background glass blur (base) */}
      <div
        aria-hidden
        className={cn(
          "absolute inset-0 z-0",
          "backdrop-blur-xl",
          "bg-white/6 dark:bg-black/30"
        )}
        style={{
          backgroundImage:
            "linear-gradient(180deg, rgba(255,255,255,0.06) 0%, rgba(255,255,255,0.02) 40%, rgba(255,255,255,0.01) 100%)",
        }}
      />

      {/* halo - bottom moving radial */}
      <div
        aria-hidden
        style={{
          background: `radial-gradient(circle, ${haloColor}, transparent 12%)`,
          opacity: 0.28,
          mixBlendMode: "screen",
          animation: bottomAnim,
        }}
        className="absolute w-[320%] h-[60%] bottom-[-18px] right-[-240%] rounded-full z-0 pointer-events-none group-hover:opacity-40"
      />

      {/* halo - top moving radial */}
      <div
        aria-hidden
        style={{
          background: `radial-gradient(circle, ${haloColor}, transparent 10%)`,
          opacity: 0.16,
          mixBlendMode: "screen",
          animation: topAnim,
        }}
        className="absolute w-[320%] h-[60%] top-[-18px] left-[-240%] rounded-full z-0 pointer-events-none group-hover:opacity-36"
      />

      {/* glossy highlight (moving) - softened stripe (no hard edges) */}
      <div
        aria-hidden
        style={{
          background:
            "linear-gradient(90deg, rgba(255,255,255,0.18) 0%, rgba(255,255,255,0.08) 30%, rgba(255,255,255,0.04) 60%, rgba(255,255,255,0.02) 100%)",
          filter: "blur(10px)",
          opacity: 0.75,
          animation: glossAnim,
          borderRadius: "999px",
        }}
        className="absolute -left-[90%] top-0 bottom-0 w-[220%] z-10 pointer-events-none"
      />

      {/* inner subtle stroke / depth */}
      <div
        aria-hidden
        className="absolute inset-0 rounded-full z-30 pointer-events-none"
        style={{
          boxShadow: "inset 0 1px 0 rgba(255,255,255,0.06), inset 0 -6px 18px rgba(2,6,23,0.45)",
        }}
      />

      {/* content */}
      <span
        className={cn(
          "relative z-40 inline-flex items-center gap-3 font-semibold",
          s.text,
          "text-white/95"
        )}
      >
        {children}

        {/* render chevron only when truthy (never forwarded as DOM attr) */}
        {chevron && (
          <svg
            aria-hidden="true"
            width="12"
            height="12"
            viewBox="0 0 24 24"
            className="ml-1"
            focusable="false"
          >
            <path d="M8 9l4 4 4-4" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        )}
      </span>
    </Component>
  );
}

export default StarBorder;
