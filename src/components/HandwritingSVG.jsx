"use client";

import React, { useEffect, useMemo, useState, useRef } from "react";

/**
 * HandwritingSVG — typing animation (controlled).
 * Minimal, safe fixes:
 *  - no pointer-events blocking
 *  - aria-live for accessibility
 *  - default text color
 *  - slightly higher zIndex for visibility above overlays
 */
export default function HandwritingSVG({
  text = "“ Thanks for visiting ! ”",
  className = "",
  fontFamily = "Great Vibes, cursive",
  fontUrl = null,
  minHeight = 160,
  fontSize = null,
  textStyle = {},
  lineClassName = "",
  debug = false,
  respectReducedMotion = true, // when true, will check prefers-reduced-motion

  // typing controls
  startControlled = false,
  start = false,
  typingSpeed = 65,
  initialDelay = 80,
  pauseBetweenLines = 400,

  ...props
}) {
  const lines = useMemo(() => (Array.isArray(text) ? text : [text]), [text]);

  const computedFontSize =
    fontSize ?? Math.min(40, Math.max(20, Math.floor(minHeight * 0.45)));

  const [displayedLines, setDisplayedLines] = useState(
    Array(lines.length).fill("")
  );
  const [typing, setTyping] = useState(false);
  const cancelledRef = useRef(false);

  useEffect(() => {
    cancelledRef.current = false;

    // respect reduced motion preference (if requested)
    if (respectReducedMotion) {
      try {
        const mq = window.matchMedia?.("(prefers-reduced-motion: reduce)");
        if (mq?.matches) {
          setDisplayedLines([...lines]);
          return;
        }
      } catch (e) {
        // ignore and fallback to normal typing
      }
    }

    if (startControlled && !start) return;
    if (typing) return;

    setTyping(true);

    let startTimer = null;

    async function runTyping() {
      for (let i = 0; i < lines.length; i++) {
        const line = lines[i];
        let current = "";
        for (let j = 0; j < line.length; j++) {
          if (cancelledRef.current) return;
          current += line[j];
          setDisplayedLines((prev) => {
            const copy = [...prev];
            copy[i] = current;
            return copy;
          });
          await new Promise((r) => setTimeout(r, typingSpeed));
        }
        // pause between lines (useful if array of lines)
        await new Promise((r) => setTimeout(r, pauseBetweenLines));
      }
    }

    startTimer = setTimeout(runTyping, initialDelay);

    return () => {
      cancelledRef.current = true;
      clearTimeout(startTimer);
      setTyping(false);
    };
    // dependencies intentionally include controls that affect typing start
  }, [
    start,
    startControlled,
    lines,
    typingSpeed,
    initialDelay,
    pauseBetweenLines,
    respectReducedMotion,
  ]);

  // ensure a visible color by default
  const mergedTextStyle = {
    color: textStyle.color ?? "#fff",
    ...textStyle,
  };

  const textSpanStyle = {
    fontFamily,
    fontSize: computedFontSize,
    lineHeight: 1.05,
    whiteSpace: "pre-wrap",
    textAlign: "center",
    // keep other passed styles
    ...mergedTextStyle,
  };

  // zIndex set high to ensure text renders above your footer blur layer
  const wrapperStyle = {
    minHeight,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    // no pointerEvents: leave it interactive so layout/stacking works properly
    position: "relative",
    zIndex: 60,
  };

  return (
    <div
      className={`flex items-center justify-center px-4 ${className}`}
      style={wrapperStyle}
      {...props}
    >
      <style>
        {fontUrl
          ? `@import url('${fontUrl}');`
          : "@import url('https://fonts.googleapis.com/css2?family=Great+Vibes&display=swap');"}
      </style>

      {/* accessibility: announce typing updates politely */}
      <div
        aria-live="polite"
        role="status"
        className="typing-wrapper"
        style={{ textAlign: "center", width: "100%" }}
      >
        {displayedLines.map((line, idx) => (
          <div
            key={`line-${idx}`}
            className={`typing-line ${lineClassName}`}
            style={textSpanStyle}
          >
            {line}
          </div>
        ))}
      </div>

      {debug && (
        <div style={{ position: "absolute", top: -18, fontSize: 10, color: "rgba(255,255,255,0.5)" }}>
          typing: {displayedLines.join(" / ")}
        </div>
      )}
    </div>
  );
}
