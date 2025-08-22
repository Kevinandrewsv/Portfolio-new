"use client";

import React, { useEffect, useMemo, useState, useRef } from "react";

/**
 * HandwritingSVG — typing animation (controlled).
 * zIndex intentionally high so it sits above footer blur panel/video.
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
  respectReducedMotion = true,

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

    function checkPrefersReduced() {
      try {
        const mq = window?.matchMedia?.("(prefers-reduced-motion: reduce)");
        if (typeof respectReducedMotion === "boolean") {
          return Boolean(respectReducedMotion) || Boolean(mq?.matches);
        }
        return Boolean(mq?.matches);
      } catch {
        return false;
      }
    }

    if (checkPrefersReduced()) {
      setDisplayedLines([...lines]);
      return;
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
        await new Promise((r) => setTimeout(r, pauseBetweenLines));
      }
    }

    startTimer = setTimeout(runTyping, initialDelay);
    return () => {
      cancelledRef.current = true;
      clearTimeout(startTimer);
      setTyping(false);
    };
  }, [
    start,
    startControlled,
    lines,
    typingSpeed,
    initialDelay,
    pauseBetweenLines,
    respectReducedMotion,
  ]);

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
    ...mergedTextStyle,
  };

  // Intentionally high zIndex to ensure this element sits above blur/video
  const wrapperStyle = {
    minHeight,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    position: "relative",
    zIndex: 1100,
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
        <div
          style={{
            position: "absolute",
            top: -18,
            fontSize: 10,
            color: "rgba(255,255,255,0.5)",
            zIndex: 9999,
          }}
        >
          typing: {displayedLines.join(" / ")}
        </div>
      )}
    </div>
  );
}
