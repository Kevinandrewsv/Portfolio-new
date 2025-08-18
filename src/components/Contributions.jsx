"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import GitHubCalendar from "react-github-calendar";
import { cn } from "@/lib/utils";

/* --------------------------------------------------------------------------
   LampContainer (adjusted z-indexes and spacing to avoid overlay issues)
   -------------------------------------------------------------------------- */
export const LampContainer = ({ children, className }) => {
  return (
    <div
      className={cn(
        // outer background is now pure black
        "relative flex min-h-screen flex-col items-center justify-center overflow-visible  w-full rounded-md z-0 pt-12",
        className
      )}
    >
      <div className="relative flex w-full flex-1 scale-y-125 items-center justify-center isolate">
        {/* Left light cone - background layer (LOW z) */}
        <motion.div
          initial={{ opacity: 0.5, width: "15rem" }}
          whileInView={{ opacity: 1, width: "30rem" }}
          transition={{ delay: 0.3, duration: 0.8, ease: "easeInOut" }}
          style={{
            backgroundImage: `conic-gradient(var(--conic-position), var(--tw-gradient-stops))`,
          }}
          className="absolute inset-auto right-1/2 h-56 overflow-visible w-[30rem] bg-gradient-conic from-purple-500 via-transparent to-transparent text-white [--conic-position:from_70deg_at_center_top] z-10"
        >
          <div className="absolute w-full left-0 bg-black h-40 bottom-0 z-20 [mask-image:linear-gradient(to_top,white,transparent)]" />
          <div className="absolute w-40 h-full left-0 bg-black bottom-0 z-20 [mask-image:linear-gradient(to_right,white,transparent)]" />
        </motion.div>

        {/* Right light cone - background layer (LOW z) */}
        <motion.div
          initial={{ opacity: 0.5, width: "15rem" }}
          whileInView={{ opacity: 1, width: "30rem" }}
          transition={{ delay: 0.3, duration: 0.8, ease: "easeInOut" }}
          style={{
            backgroundImage: `conic-gradient(var(--conic-position), var(--tw-gradient-stops))`,
          }}
          className="absolute inset-auto left-1/2 h-56 w-[30rem] bg-gradient-conic from-transparent via-transparent to-purple-500 text-white [--conic-position:from_290deg_at_center_top] z-10"
        >
          <div className="absolute w-40 h-full right-0 bg-black bottom-0 z-20 [mask-image:linear-gradient(to_left,white,transparent)]" />
          <div className="absolute w-full right-0 bg-black h-40 bottom-0 z-20 [mask-image:linear-gradient(to_top,white,transparent)]" />
        </motion.div>

        {/* soft background blur behind everything (LOW z) */}
        <div className="absolute top-1/2 h-48 w-full translate-y-12 scale-x-150 bg-black blur-2xl z-5 pointer-events-none" />

        {/* subtle overlay/backdrop (VERY low opacity, behind content) */}
        <div className="absolute top-1/2 h-48 w-full bg-transparent opacity-10 backdrop-blur-md z-15 pointer-events-none" />

        {/* cyan glow (LOW z) */}
        <div className="absolute inset-auto h-36 w-[28rem] -translate-y-1/2 rounded-full bg-purple-500 opacity-50 blur-3xl z-10 pointer-events-none" />

        {/* radial glow (LOW z) */}
        <motion.div
          initial={{ width: "8rem" }}
          whileInView={{ width: "16rem" }}
          transition={{ delay: 0.3, duration: 0.8, ease: "easeInOut" }}
          className="absolute inset-auto h-36 w-64 -translate-y-[6rem] rounded-full bg-purple-400 blur-2xl z-10 pointer-events-none"
        />

        {/* top thin beam line (LOW z) */}
        <motion.div
          initial={{ width: "15rem" }}
          whileInView={{ width: "30rem" }}
          transition={{ delay: 0.3, duration: 0.8, ease: "easeInOut" }}
          className="absolute inset-auto h-0.5 w-[30rem] -translate-y-[7rem] bg-purple-400 z-10 pointer-events-none"
        />
      </div>

      {/* CONTENT container: placed above the lamp visuals (HIGHER z) and with reduced negative translate to avoid clipping */}
      <div className="relative z-50 flex -translate-y-40 flex-col items-center px-5 w-full">
        {children}
      </div>
    </div>
  );
};

/* --------------------------------------------------------------------------
   ContributionsLamp component - heading + GitHub calendar inside lamp
   -------------------------------------------------------------------------- */
export default function ContributionsLamp() {
  const [totalContributions, setTotalContributions] = useState(0);

  const theme = {
    dark: ["#f4ecec8f", "#6254aeff", "#d94cb6", "#e015c2ff", "#7b0d49ff"],
  };

  return (
    <LampContainer>
      {/* Heading (ensure it's higher than background elements) */}
      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.18, duration: 0.6 }}
        className="mb-6 z-20 bg-white bg-clip-text text-transparent text-3xl md:text-5xl font-extrabold text-center"
        style={{ zIndex: 20 }}
      >
        My GitHub Contributions
      </motion.h2>

      {/* Card (higher z so it sits atop any background shapes) */}
      <div
        className="w-full max-w-6xl p-6 bg-[#0f0f0f] rounded-3xl shadow-lg border border-[#eb3b91]/20 relative overflow-hidden mt-12"
        style={{ zIndex: 60 }}
      >
        <style>{`
          /* hide the built-in year picker title */
          .contrib-calendar > div:first-child > h2 { display: none !important; }

          /* ensure SVG label color */
          .contrib-calendar svg text { fill: #cfcfcf !important; }

          /* center legend below grid */
          .contrib-calendar .contrib-legend { justify-content: center !important; }

          /* spacing above grid */
          .contrib-calendar .calendar { margin-top: 0; }

          /* ensure grid is responsive and doesn't overflow */
          .contrib-calendar > div { display: block; width: 100%; max-width: 100%; }

          /* rounded contribution squares and hover */
          .contrib-calendar .contribution-day { rx: 4; ry: 4; transition: transform 120ms ease; }
          .contrib-calendar .contribution-day:hover { transform: scale(1.05); }

          /* legend blocks */
          .contrib-legend .legend-item rect { rx: 4; ry: 4; }
        `}</style>

        <div className="contrib-calendar ">
          <GitHubCalendar
            username="kevinandrewsv"
            blockSize={15}
            blockMargin={6}
            fontSize={13}
            theme={theme}
            colorScheme="dark"
            monthLabels={[
              "Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec",
            ]}
            showWeekdayLabels={true}
            transformData={(contribs) => {
              setTotalContributions(
                contribs.reduce((sum, day) => sum + day.count, 0)
              );
              return contribs;
            }}
          />
        </div>

        {/* Legend */}
        <div className="mt-6 flex justify-center items-center space-x-3 text-sm text-[#ccc]">
          <span>Less</span>
          {theme.dark.map((clr, i) => (
            <div key={i} className="w-4 h-4 rounded-md border border-white/10" style={{ backgroundColor: clr }} />
          ))}
          <span>More</span>
        </div>

        {/* Total */}
        <p className="mt-6 text-center text-lg text-[#ccc]">
          Total contributions in the last year:{" "}
          <span className="font-semibold text-white">{totalContributions}</span>
        </p>
      </div>
    </LampContainer>
  );
}
