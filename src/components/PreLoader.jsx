// src/components/PreLoader.jsx
import React from "react";

/**
 * PreLoader — visible even if tailwind color names or CSS variables are missing.
 * It uses inline fallback styles for background and stroke colors so it's reliable.
 */
const PreLoader = () => {
  const wrapperStyle = {
    position: "fixed",
    inset: 0,
    zIndex: 9999,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    // fallback background if .bg-primary is not defined
    backgroundColor: "var(--page-bg, #000)",
    // optional light overlay so shapes are visible if your background is dark
    // remove or tune alpha as you like
    background: "linear-gradient(180deg, rgba(0,0,0,1) 0%, rgba(0,0,0,0.95) 100%)",
  };

  const svgCommon = {
    width: "72px",
    height: "72px",
    display: "block",
    stroke: "var(--loader-stroke, rgba(255,255,255,0.9))",
    strokeWidth: 4,
    fill: "none",
  };

  return (
    <div
      className="preloader"
      style={wrapperStyle}
      role="status"
      aria-live="polite"
      aria-label="Loading"
    >
      <div
        className="loader-wrapper"
        style={{ display: "flex", gap: 24, alignItems: "center", justifyContent: "center" }}
      >
        {/* Circle */}
        <div className="loader" aria-hidden="true" style={{ width: 72, height: 72 }}>
          <svg viewBox="0 0 80 80" className="svg-circle" role="img" aria-hidden="true" style={svgCommon}>
            <circle r="32" cy="40" cx="40" />
          </svg>
        </div>

        {/* Triangle */}
        <div className="loader triangle" aria-hidden="true" style={{ width: 72, height: 72 }}>
          <svg viewBox="0 0 86 80" className="svg-triangle" role="img" aria-hidden="true" style={svgCommon}>
            <polygon points="43 8 79 72 7 72" />
          </svg>
        </div>

        {/* Rectangle */}
        <div className="loader" aria-hidden="true" style={{ width: 72, height: 72 }}>
          <svg viewBox="0 0 80 80" className="svg-rect" role="img" aria-hidden="true" style={svgCommon}>
            <rect height="64" width="64" y="8" x="8" />
          </svg>
        </div>

        <span className="sr-only" style={{ position: "absolute", width: 1, height: 1, overflow: "hidden", clip: "rect(1px, 1px, 1px, 1px)" }}>
          Loading…
        </span>
      </div>
    </div>
  );
};

export default PreLoader;
