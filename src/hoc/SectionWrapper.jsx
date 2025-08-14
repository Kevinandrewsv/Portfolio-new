import React from "react";
import { motion } from "framer-motion";
import { staggerContainer } from "../utils/motion";

/**
 * SectionWrapper HOC
 * - Keeps scroll-mt so anchor scrolling offsets for the fixed nav.
 * - Does NOT add top padding so wrapped components control their own spacing.
 */
const SectionWrapper = (Component, idName) =>
  function HOC() {
    return (
      <motion.section
        id={idName}
        variants={staggerContainer()}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.25 }}
        className="
          sm:px-16 px-6
          /* removed pt-20 lg:pt-24 so inner components control spacing */
          pb-8
          max-w-7xl mx-auto
          /* keep scroll-mt so anchors are offset for the fixed nav */
          scroll-mt-[80px] lg:scroll-mt-[96px]
          relative
        "
      >
        <Component />
      </motion.section>
    );
  };

export default SectionWrapper;
