"use client";

import React, { useEffect, useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { cn } from "@/lib/utils";


export const FlipWords = ({
  words = [],
  duration = 5000,
  className = "",
  wordClasses = [],
  wordGradients = [],
  wordStyles = [],
}) => {
  const normalized = useMemo(
    () =>
      (words || []).map((w, i) =>
        typeof w === "string"
          ? { text: w, className: wordClasses[i] || "" }
          : { text: w?.text ?? "", className: w?.className ?? wordClasses[i] ?? "" }
      ),
    [words, wordClasses]
  );

  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (!normalized || normalized.length === 0) return undefined;
    const safeDuration = Math.max(200, Number(duration) || 3000);
    const id = setInterval(() => {
      setIndex((prev) => (prev + 1) % normalized.length);
    }, safeDuration);
    return () => clearInterval(id);
  }, [normalized, duration]);

  if (!normalized || normalized.length === 0) return null;

  const current = normalized[index];

  // pick gradient for current index
  const gradientForCurrent =
    (Array.isArray(wordGradients) && wordGradients[index]) ||
    (Array.isArray(wordStyles) && wordStyles[index]) ||
    null;

  // style to apply on the element that actually contains the text (per-letter)
  const gradientStyleForLetters = gradientForCurrent
    ? {
        backgroundImage: gradientForCurrent,
        WebkitBackgroundClip: "text",
        backgroundClip: "text",
        color: "transparent",
        WebkitTextFillColor: "transparent",
      }
    : undefined;

  return (
    <span aria-live="polite" aria-atomic="true" className="inline-block relative">
      <AnimatePresence initial={false} mode="wait">
        <motion.span
          className={cn("inline-block relative whitespace-nowrap", className || "", current.className || "")}
          key={`flipwords-${index}-${current.text}`}
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{
            opacity: 0,
            y: -28,
            x: 28,
            filter: "blur(6px)",
            scale: 1.6,
            transition: { duration: 0.45, ease: "easeInOut" },
          }}
          transition={{ type: "spring", stiffness: 120, damping: 18, duration: 0.32 }}
        >
          {current.text.split(" ").map((word, wIdx) => (
            <motion.span
              key={`${current.text}-word-${wIdx}`}
              initial={{ opacity: 0, y: 8, filter: "blur(6px)" }}
              animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              exit={{ opacity: 0 }}
              transition={{ delay: wIdx * 0.05, duration: 0.28, ease: "easeOut" }}
              className="inline-block whitespace-nowrap"
            >
              {word.split("").map((letter, lIdx) => (
                <motion.span
                  key={`${current.text}-letter-${wIdx}-${lIdx}`}
                  initial={{ opacity: 0, y: 6, filter: "blur(6px)" }}
                  animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                  transition={{
                    delay: wIdx * 0.05 + lIdx * 0.025,
                    duration: 0.16,
                    ease: "easeOut",
                  }}
                  className="inline-block"
                  // <-- apply the gradient style to the letter span (this is what makes the gradient visible)
                  style={gradientStyleForLetters}
                >
                  {letter}
                </motion.span>
              ))}
              <span className="inline-block">&nbsp;</span>
            </motion.span>
          ))}
        </motion.span>
      </AnimatePresence>
    </span>
  );
};

export default FlipWords;
