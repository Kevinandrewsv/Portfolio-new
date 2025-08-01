import React from "react";
import { motion } from "framer-motion";
import { staggerContainer } from "../utils/motion";

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
          pt-20 lg:pt-24 pb-8
          max-w-7xl mx-auto
          scroll-mt-[80px] lg:scroll-mt-[96px]
          relative
        "
      >
        {/* dummy anchor so scrollIntoView() always lands here */}
        <span
          className="hash-span"
          id={idName}
          aria-hidden="true"
        />

        {/* now render the wrapped component */}
        <Component />
      </motion.section>
    );
  };

export default SectionWrapper;
