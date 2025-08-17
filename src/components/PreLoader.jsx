// src/components/PreLoader.jsx
import React from "react";

/**
 * PreLoader — original loader markup untouched.
 * Added a non-invasive "new-tech" visual shell + welcome text.
 */
const PreLoader = () => {
  const wrapperStyle = {
    position: "fixed",
    inset: 0,
    zIndex: 9999,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "column", // stack loader + text
    backgroundColor: "var(--page-bg, #000)",
    background:
      "linear-gradient(180deg, rgba(0,0,0,1) 0%, rgba(0,0,0,0.95) 100%)",
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
      {/* Inline decorative CSS only — does not alter your loader DOM */}
      <style>{`
        .preloader-decor {
          position: absolute;
          inset: 0;
          pointer-events: none;
          overflow: hidden;
          z-index: 9998;
        }

        .holo {
          position: absolute;
          width: 680px;
          height: 360px;
          left: 50%;
          top: 48%;
          transform: translate(-50%, -50%);
          background: radial-gradient(closest-side, rgba(103,115,222,0.14), rgba(235,59,145,0.06) 30%, transparent 55%);
          filter: blur(36px) saturate(120%);
          opacity: 0.95;
          mix-blend-mode: screen;
          animation: holoShift 6s ease-in-out infinite;
          border-radius: 14px;
        }

        .holo::after {
          content: "";
          position: absolute;
          inset: 0;
          background: linear-gradient(90deg, rgba(235,59,145,0.04), rgba(103,115,222,0.06));
          pointer-events: none;
        }

        @keyframes holoShift {
          0% { transform: translate(-52%, -50%) scale(1); }
          50% { transform: translate(-48%, -52%) scale(1.04); }
          100% { transform: translate(-52%, -50%) scale(1); }
        }

        .scanline {
          position: absolute;
          width: 220%;
          height: 120%;
          left: 50%;
          top: 50%;
          transform: translate(-50%, -50%);
          background: linear-gradient(90deg, rgba(255,255,255,0.00) 0%, rgba(255,255,255,0.06) 48%, rgba(255,255,255,0.00) 100%);
          mix-blend-mode: overlay;
          opacity: 0.06;
          animation: scan 2.6s linear infinite;
          pointer-events: none;
        }

        @keyframes scan {
          0% { transform: translate(-120%, -50%) rotate(-6deg); opacity: 0.03; }
          50% { transform: translate(20%, -50%) rotate(-6deg); opacity: 0.09; }
          100% { transform: translate(120%, -50%) rotate(-6deg); opacity: 0.03; }
        }

        .particle {
          position: absolute;
          width: 8px;
          height: 8px;
          border-radius: 999px;
          background: linear-gradient(180deg, #eb3b91, #6773de);
          opacity: 0.9;
          filter: blur(0.6px) saturate(120%);
          transform-origin: center;
          mix-blend-mode: screen;
          animation: floaty 4.8s ease-in-out infinite;
        }
        .particle.a { left: calc(50% - 160px); top: calc(50% - 42px); animation-delay: 0s; }
        .particle.b { left: calc(50% + 140px); top: calc(50% - 22px); animation-delay: 1.1s; transform: scale(0.9); }
        .particle.c { left: calc(50% + 22px); top: calc(50% + 74px); animation-delay: 2.2s; transform: scale(0.7); opacity: 0.75; }

        @keyframes floaty {
          0% { transform: translateY(0) scale(1); opacity: 0.9; }
          50% { transform: translateY(-10px) scale(1.06); opacity: 1; }
          100% { transform: translateY(0) scale(1); opacity: 0.9; }
        }

        .corner-circuit {
          position: absolute;
          width: 96px;
          height: 56px;
          pointer-events: none;
          opacity: 0.9;
          mix-blend-mode: screen;
        }
        .corner-circuit svg { width: 100%; height: 100%; display:block; }

        .vignette {
          position: absolute;
          inset: 0;
          background: radial-gradient(ellipse at center, rgba(0,0,0,0) 40%, rgba(0,0,0,0.6) 100%);
          pointer-events: none;
        }

        .loader-card {
          position: relative;
          z-index: 9999;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 24px;
        }

        /* welcome text style */
        .welcome-text {
          margin-top: 28px;
          font-size: 1.5rem;
          font-weight: 600;
          background: linear-gradient(90deg, #eb3b91, #6773de);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          letter-spacing: 0.5px;
          text-align: center;
          animation: fadeInText 1.6s ease-in-out;
        }

        @keyframes fadeInText {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>

      {/* decorative layer */}
      <div className="preloader-decor" aria-hidden="true">
        <div className="holo" />
        <div className="scanline" />
        <div className="particle a" />
        <div className="particle b" />
        <div className="particle c" />

        {/* top-left circuit accent */}
        <div className="corner-circuit" style={{ left: 18, top: 18 }}>
          <svg viewBox="0 0 96 56" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
            <path d="M4 44 L28 44 L42 30 L66 30 L92 4" stroke="url(#g1)" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
            <circle cx="4" cy="44" r="2.2" fill="#eb3b91" />
            <circle cx="92" cy="4" r="2.2" fill="#6773de" />
            <defs>
              <linearGradient id="g1" x1="0" x2="1"><stop offset="0" stopColor="#eb3b91"/><stop offset="1" stopColor="#6773de"/></linearGradient>
            </defs>
          </svg>
        </div>

        {/* bottom-right circuit accent */}
        <div className="corner-circuit" style={{ right: 18, bottom: 18, transform: "rotate(180deg)" }}>
          <svg viewBox="0 0 96 56" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
            <path d="M4 44 L28 44 L42 30 L66 30 L92 4" stroke="url(#g2)" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
            <circle cx="4" cy="44" r="2.2" fill="#6773de" />
            <circle cx="92" cy="4" r="2.2" fill="#eb3b91" />
            <defs>
              <linearGradient id="g2" x1="0" x2="1"><stop offset="0" stopColor="#6773de"/><stop offset="1" stopColor="#eb3b91"/></linearGradient>
            </defs>
          </svg>
        </div>

        <div className="vignette" />
      </div>

      {/* === ORIGINAL loader === */}
      <div
        className="loader-wrapper loader-card"
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

        <span className="sr-only">Loading…</span>
      </div>

      {/* Welcome text under loader */}
      <p className="welcome-text">Welcome To Kevin Andrews Portfolio</p>
    </div>
  );
};

export default PreLoader;
