// src/components/ShinyText.jsx
import React from "react";

/**
 * ShinyText
 * Props:
 *  - text: string
 *  - disabled: boolean (if true, no animation)
 *  - speed: number (seconds)
 *  - className: extra tailwind classes
 *
 * Implementation notes:
 *  - Uses a two-layer background: bottom layer is the base gradient,
 *    top layer is the moving "shimmer" gradient.
 *  - Animation duration is controlled with CSS var --shine-duration (set via inline style).
 */
const ShinyText = ({ text, disabled = false, speed = 5, className = "" }) => {
  const style = {
    // two layered background: top = shimmer, bottom = base gradient
    backgroundImage:
      "linear-gradient(120deg, rgba(255,255,255,0) 40%, rgba(255,255,255,0.85) 50%, rgba(255,255,255,0) 60%), linear-gradient(90deg, #8b5cf6, #f472b6)",
    // top layer is larger so it visibly glides
    backgroundSize: "200% 100%, 100% 100%",
    // Use CSS variable for animation duration so tailwind animation can reference it
    //--shine-duration is read by tailwind animation entry: shine var(--shine-duration, 5s) ...
    "--shine-duration": `${speed}s`,
    WebkitBackgroundClip: "text",
    backgroundClip: "text",
    color: "transparent",
  };

  return (
    <span
      className={`inline-block bg-clip-text ${disabled ? "" : "animate-shine"} ${className}`}
      style={style}
      aria-hidden={disabled ? "false" : "true"}
    >
      {text}
    </span>
  );
};

export default ShinyText;
