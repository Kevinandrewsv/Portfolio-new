"use client";

import React, { useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { cn } from "../lib/utils";
import { FiGithub, FiLinkedin, FiInstagram } from "react-icons/fi";
import HandwritingSVG from "./HandwritingSVG"; // adjust path if your structure differs

export default function Footer() {
  const reduced = useReducedMotion(); // returns true when user prefers reduced motion
  const [started, setStarted] = useState(false);

  return (
    <FooterContainer className="bg-transparent">
      <motion.div
        initial={reduced ? {} : { opacity: 0.25, y: 60, scale: 0.98 }}
        whileInView={reduced ? {} : { opacity: 1, y: 0, scale: 1 }}
        viewport={{ once: true }}
        transition={{ delay: 0.12, duration: 0.9, ease: "easeInOut" }}
        className="w-full max-w-7xl px-6 md:px-8 lg:px-12 xl:px-16 2xl:px-20 my-12"
      >
        <div
          className="mx-auto relative flex w-full flex-col items-center gap-6 py-40 md:flex-row md:justify-between md:items-center"
          style={{ transform: "translateY(96px)" }}
        >
          <div className="flex flex-col items-center gap-1 text-center md:items-start md:text-left mt-12 md:mt-0 md:flex-none">
            <span className="text-lg font-bold tracking-tight text-white drop-shadow-[0_6px_18px_rgba(0,0,0,0.75)]">
              Kevin Andrews
            </span>
            <span className="text-sm text-slate-300 drop-shadow-[0_6px_18px_rgba(0,0,0,0.6)]">
              Full Stack Developer • Code • UI
            </span>
          </div>

          <motion.div
            onViewportEnter={() => setStarted(true)}
            viewport={{ once: true }}
            className="flex-1 flex items-center justify-center px-4 relative"
            style={{ minHeight: 160, zIndex: 40 }}
          >
            <HandwritingSVG
              startControlled={true}
              start={started}
              text="“ Thanks for visiting ! ”"
              typingSpeed={65}
              initialDelay={80}
              pauseBetweenLines={300}
              fontSize={60}
              textStyle={{
                letterSpacing: "0.6px",
                color: "#ffffffff",
                textShadow: "0 6px 18px rgba(59, 4, 72, 1)",
                WebkitTextStroke: "0.4px rgba(0, 0, 0, 0.28)",
              }}
              debug={false}
              // pass the reduced-motion preference so the component can respect it
              respectReducedMotion={reduced}
            />
          </motion.div>

          <div className="flex flex-col items-center md:items-center mt-6 md:mt-0 md:flex-none">
            <span className="mb-2 text-lg font-semibold text-white drop-shadow-[0_6px_18px_rgba(0,0,0,0.75)]">
              Connect
            </span>

            <div className="flex gap-4">
              <a
                href="https://github.com/Kevinandrewsv"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="GitHub"
                className="group p-2 rounded hover:scale-105 transform transition text-slate-200 hover:text-white drop-shadow-[0_4px_10px_rgba(0,0,0,0.6)]"
              >
                <FiGithub className="h-5 w-5" aria-hidden="true" />
              </a>

              <a
                href="https://www.linkedin.com/in/kevinandrewsv/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn"
                className="group p-2 rounded hover:scale-105 transform transition text-slate-200 hover:text-white drop-shadow-[0_4px_10px_rgba(0,0,0,0.6)]"
              >
                <FiLinkedin className="h-5 w-5" aria-hidden="true" />
              </a>

              <a
                href="https://www.instagram.com/kevinandrewsv/" // <- replace this with your Instagram URL
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
                className="group p-2 rounded hover:scale-105 transform transition text-slate-200 hover:text-white drop-shadow-[0_4px_10px_rgba(0,0,0,0.6)]"
              >
                <FiInstagram className="h-5 w-5" aria-hidden="true" />
              </a>
            </div>
          </div>
        </div>

        {/* copyright */}
        <div className="mx-auto w-full max-w-7xl">
          <div className="mt-2 border-t border-slate-800/50 pt-4 text-center text-xs text-slate-400">
            © {new Date().getFullYear()} Kevin Andrews
          </div>
        </div>
      </motion.div>
    </FooterContainer>
  );
}

/* FooterContainer — adjusted z-index so children are above blurred panel */
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
        className="absolute left-1/2 -translate-x-1/2 bottom-0 z-20 w-full max-w-7xl px-8 pb-14 pointer-events-none"
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

      {/* children area sits above the blur panel */}
      <div className="relative z-40 flex items-center justify-center py-12 md:py-8">
        {children}
      </div>
    </div>
  );
};
