"use client";

import React, { useEffect, useRef, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { cn } from "@/lib/utils";
import { FiGithub, FiLinkedin, FiTwitter } from "react-icons/fi";

/**
 * src/components/Footer.jsx
 * Adjustment: middle handwriting block now spans the footer area (md:inset-y-0)
 * and uses flex centering so the text is perfectly centered both horizontally and vertically.
 * Only layout changes for centering; animation/visuals unchanged.
 */

export default function Footer() {
  const reduce = useReducedMotion();

  const SVGHandwrite = ({
    text = '“ Thanks for visiting ! ”',
    baseDelay = 240,
    drawDuration = 2000,
    fillFadeDuration = 360,
    fontSize = 64,
  }) => {
    const svgRef = useRef(null);
    const textRef = useRef(null);
    const [pathLen, setPathLen] = useState(0);
    const [started, setStarted] = useState(false);
    const [fillVisible, setFillVisible] = useState(reduce);

    useEffect(() => {
      if (reduce) {
        setPathLen(0);
        setStarted(true);
        setFillVisible(true);
        return;
      }

      const tEl = textRef.current;
      let len = 0;
      try {
        len = tEl && tEl.getComputedTextLength ? tEl.getComputedTextLength() : 0;
      } catch (e) {
        len = 0;
      }
      if (!len || Number.isNaN(len) || len <= 0) {
        len = Math.max(1, text.length * (fontSize * 0.6));
      }

      setPathLen(len);
      setStarted(false);
      setFillVisible(false);

      const startTimer = window.setTimeout(() => {
        setStarted(true);
        const fillTimer = window.setTimeout(() => {
          setFillVisible(true);
        }, drawDuration + 80);
        svgRef.current && (svgRef.current._fillTimer = fillTimer);
      }, baseDelay);

      return () => {
        clearTimeout(startTimer);
        if (svgRef.current && svgRef.current._fillTimer) {
          clearTimeout(svgRef.current._fillTimer);
        }
      };
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [text, drawDuration, baseDelay, reduce]);

    const strokeStyle = {
      strokeDasharray: pathLen || 0,
      strokeDashoffset: started ? 0 : pathLen || 0,
      transition: reduce ? "none" : `stroke-dashoffset ${drawDuration}ms cubic-bezier(.2,.9,.2,1)`,
      strokeLinecap: "round",
    };

    const fillStyle = {
      transition: reduce ? "none" : `opacity ${fillFadeDuration}ms ease-in`,
      opacity: fillVisible ? 1 : 0,
    };

    return (
      <div
        className="svg-handwrite-wrapper"
        style={{ display: "inline-block", transformOrigin: "left center" }}
      >
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Great+Vibes&display=swap"
        />

        <style>{`
          .svg-handwrite {
            display: block;
            overflow: visible;
            width: 640px;
            max-width: 78vw;
          }

          .svg-text {
            font-family: 'Great Vibes', cursive;
            font-weight: 400;
            fill: #ffffff;
            paint-order: stroke fill markers;
          }

          .svg-text, .svg-stroke {
            filter: drop-shadow(0 6px 18px rgba(0,0,0,0.65));
          }

          @media (prefers-reduced-motion: reduce) {
            .svg-stroke { transition: none !important; }
            .svg-fill { transition: none !important; opacity: 1 !important; }
          }
        `}</style>

        <svg
          ref={svgRef}
          className="svg-handwrite"
          viewBox="0 0 900 120"
          preserveAspectRatio="xMidYMid meet"
          aria-hidden={false}
          role="img"
        >
          <text
            ref={textRef}
            className="svg-text svg-stroke"
            x="12"
            y="80"
            fontSize={fontSize}
            stroke="#ffffff"
            strokeWidth={4}
            fill="none"
            style={strokeStyle}
          >
            {text}
          </text>

          <text
            className="svg-text svg-fill"
            x="12"
            y="80"
            fontSize={fontSize}
            fill="#000000ff"
            stroke="none"
            style={fillStyle}
            aria-hidden={false}
          >
            {text}
          </text>
        </svg>
      </div>
    );
  };

  return (
    <FooterContainer className="bg-transparent">
      <motion.div
        initial={reduce ? {} : { opacity: 0.25, y: 60, scale: 0.98 }}
        whileInView={reduce ? {} : { opacity: 1, y: 0, scale: 1 }}
        viewport={{ once: true }}
        transition={{ delay: 0.12, duration: 0.9, ease: "easeInOut" }}
        className="w-full max-w-7xl px-6 md:px-8 lg:px-12 xl:px-16 2xl:px-20 my-12"
      >
        {/* relative so absolutely-positioned middle block sits inside this area */}
        <div className="mx-auto relative flex w-full flex-col items-center gap-6 py-40 md:flex-row md:justify-between md:items-center transform translate-y-20">
          <div className="flex flex-col items-center gap-1 text-center md:items-start md:text-left mt-12">
            <span className="text-lg font-bold tracking-tight text-white drop-shadow-[0_6px_18px_rgba(0,0,0,0.75)]">
              Kevin Andrews
            </span>
            <span className="text-sm text-slate-300 drop-shadow-[0_6px_18px_rgba(0,0,0,0.6)]">
              Full Stack Developer • Code • UI
            </span>
          </div>

          {/* CENTERED middle block:
              - On md+ we absolutely inset the element on both x and y (inset-x-0 + inset-y-0),
                then use flex centering to guarantee exact center location.
              - On small screens it remains static (flex layout) and centered naturally.
          */}
          <div
            className="mt-14 flex items-center justify-center md:absolute md:inset-x-0 md:inset-y-0"
            aria-hidden={false}
            style={{ pointerEvents: "none" }} // purely visual, avoids accidental overlap
          >
            <div className="w-full flex items-center justify-center ml-80">
              <motion.div
                initial={{ opacity: 0, y: 6 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.9, ease: "easeOut" }}
                style={{ pointerEvents: "auto" }}
              >
                <SVGHandwrite
                  text={'“ Thanks for visiting ! ”'}
                  baseDelay={240}
                  drawDuration={2000}
                  fillFadeDuration={360}
                  fontSize={64}
                />
              </motion.div>
            </div>
          </div>

          <div className="flex flex-col items-center md:items-center mt-12">
            <span className="mb-2 text-lg font-semibold text-white drop-shadow-[0_6px_18px_rgba(0,0,0,0.75)]">
              Connect
            </span>

            <div className="flex gap-4">
              <a
                href="#"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="GitHub"
                className="group p-2 rounded hover:scale-105 transform transition text-slate-200 hover:text-white drop-shadow-[0_4px_10px_rgba(0,0,0,0.6)]"
              >
                <FiGithub className="h-5 w-5" aria-hidden="true" />
              </a>

              <a
                href="#"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn"
                className="group p-2 rounded hover:scale-105 transform transition text-slate-200 hover:text-white drop-shadow-[0_4px_10px_rgba(0,0,0,0.6)]"
              >
                <FiLinkedin className="h-5 w-5" aria-hidden="true" />
              </a>

              <a
                href="#"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Twitter"
                className="group p-2 rounded hover:scale-105 transform transition text-slate-200 hover:text-white drop-shadow-[0_4px_10px_rgba(0,0,0,0.6)]"
              >
                <FiTwitter className="h-5 w-5" aria-hidden="true" />
              </a>
            </div>
          </div>
        </div>

        <div className="mx-auto w-full max-w-7xl">
          <div className="mt-2 border-t border-slate-800/50 pt-4 text-center text-xs text-slate-400">
            © {new Date().getFullYear()} Kevin Andrews
          </div>
        </div>
      </motion.div>
    </FooterContainer>
  );
}

/**
 * FooterContainer (unchanged)
 */
export const FooterContainer = ({ children, className }) => {
  return (
    <div
      className={cn("relative w-full overflow-hidden z-0", className)}
      style={{ pointerEvents: "auto" }}
    >
      <video
        className="absolute inset-0 -z-10 h-full w-full object-cover"
        style={{ objectPosition: "50% 42%" }}
        autoPlay
        muted
        loop
        playsInline
        aria-hidden="true"
      >
        <source src="/video/Blackhole.webm" type="video/webm" />
        <source src="/video/Blackhole.mp4" type="video/mp4" />
      </video>

      <div className="absolute inset-0 -z-11 bg-gradient-to-t from-black/92 via-black/64 to-black/36 pointer-events-none" />
      <div className="absolute inset-x-0 top-0 h-24 -z-10 bg-gradient-to-b from-black/80 to-transparent pointer-events-none" />

      <div
        className="absolute left-1/2 -translate-x-1/2 bottom-0 z-20 w-full max-w-7xl px-8 pb-8 pointer-events-none"
        aria-hidden="true"
      >
        <div
          className="w-full rounded-2xl shadow-inner backdrop-blur-lg"
          style={{
            height: "260px",
            WebkitBackdropFilter: "blur(16px)",
            backdropFilter: "blur(16px)",
          }}
        />
      </div>

      <div
        className="absolute inset-x-0 bottom-0 -z-20 h-44 md:h-56 lg:h-64 pointer-events-none"
        style={{
          WebkitMaskImage: "linear-gradient(to top, transparent 0%, black 35%)",
          maskImage: "linear-gradient(to top, transparent 0%, black 35%)",
        }}
      >
        <motion.div
          initial={{ opacity: 0.16, scaleX: 0.95, scaleY: 0.95 }}
          whileInView={{ opacity: 0.42, scaleX: 1, scaleY: 1.02 }}
          viewport={{ once: true }}
          transition={{ delay: 0.18, duration: 1.0, ease: "easeInOut" }}
          className="absolute -left-40 bottom-0 h-full w-1/3 rounded-full blur-3xl"
          style={{
            transform: "translateY(12px)",
            background:
              "radial-gradient(1100px 380px at 8% 100%, rgba(25,197,255,0.28), rgba(8,10,12,0) 48%)",
          }}
        />
        <motion.div
          initial={{ opacity: 0.12, scaleX: 0.95 }}
          whileInView={{ opacity: 0.38, scaleX: 1.02 }}
          viewport={{ once: true }}
          transition={{ delay: 0.22, duration: 1.1, ease: "easeInOut" }}
          className="absolute -right-40 bottom-0 h-full w-1/3 rounded-full blur-3xl"
          style={{
            transform: "translateY(12px)",
            background:
              "radial-gradient(1100px 400px at 92% 100%, rgba(8,200,176,0.22), rgba(8,10,12,0) 48%)",
          }}
        />
        <motion.div
          initial={{ opacity: 0.18, scale: 0.98 }}
          whileInView={{ opacity: 0.62, scale: 1.03 }}
          viewport={{ once: true }}
          transition={{ delay: 0.16, duration: 1.0, ease: "easeInOut" }}
          className="absolute left-1/2 -translate-x-1/2 bottom-6 z-10 h-36 w-11/12 max-w-[1400px] rounded-full blur-4xl"
          style={{
            transform: "translateY(8px)",
            background:
              "radial-gradient(760px 170px at 50% 34%, rgba(56,189,248,0.22), rgba(99,102,241,0.12) 36%, rgba(0,0,0,0) 60%)",
            WebkitMaskImage: "linear-gradient(to top, transparent 0%, black 25%)",
            maskImage: "linear-gradient(to top, transparent 0%, black 25%)",
          }}
        />
        <motion.div
          initial={{ width: "22%" }}
          whileInView={{ width: "68%" }}
          viewport={{ once: true }}
          transition={{ delay: 0.28, duration: 0.95, ease: "easeInOut" }}
          className="absolute left-1/2 -translate-x-1/2 bottom-3 h-[1px] rounded bg-cyan-400/60"
          style={{ maxWidth: "1050px", transform: "translateY(6px)" }}
        />
      </div>

      <div className="relative z-30 flex items-center justify-center py-12 md:py-8">
        {children}
      </div>
    </div>
  );
};
