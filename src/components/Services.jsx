// src/components/Services.jsx
import React from "react";
import { motion, useAnimation } from "framer-motion";
import { styles } from "../style";
import SectionWrapper from "../hoc/SectionWrapper";
import { fadeIn, textVariant } from "../utils/motion";
import myPhoto from "../assets/myPhoto.png";

import ShinyText from "./ShinyText";
import ScrollReveal from "./ScrollReveal";

import { 
  FaLaptopCode, 
  FaServer, 
  FaMobileAlt, 
  FaDatabase, 
  FaCogs,
  FaPencilRuler
} from "react-icons/fa";

const circleSize = 256;
const strokeWidth = 4;
const radius = (circleSize - strokeWidth) / 2;
const circumference = 2 * Math.PI * radius;

const Services = () => {
  const controls = useAnimation();

  React.useEffect(() => {
    controls.start("draw");
  }, [controls]);

  return (
    <>
      {/* “About Me” banner */}
      <section
        id="about"
        className="w-full py-12 md:py-2 relative overflow-hidden flex justify-center items-center"
      >
        <h1 className="absolute inset-0 flex justify-center items-center text-[5rem] md:text-[6rem] font-black text-white opacity-5 pointer-events-none uppercase">
          About Me
        </h1>
        <motion.div
          variants={fadeIn("up", "spring", 0.2, 1)}
          className="relative z-10 text-center"
        >
          <h2 className={styles.sectionHeadText}>About Me</h2>
        </motion.div>
      </section>

      {/* Content below */}
      <div id="services" className="px-4 md:px-12 lg:px-0 mt-8">
        <motion.div variants={textVariant()} className="text-center mb-8">
          <div className="flex items-center justify-center gap-2">
            <div className="h-px w-12 bg-gray-600" />
            <div className="h-1 w-1 bg-purple-500 rounded-full" />
            <div className="h-px w-12 bg-gray-600" />
          </div>
          <p className="mt-2 text-gray-400 uppercase tracking-widest text-xs md:text-sm">
            More About Me
          </p>
        </motion.div>

        {/* stacked on mobile, side-by-side on md+; portrait vertically centered on md+ */}
        <div
          className="
            flex flex-col md:flex-row
            justify-center md:justify-start
            items-start md:items-center
            gap-y-10
            md:gap-y-0
            gap-x-0
            md:gap-x-32
            xl:gap-x-60
          "
        >
          {/* Portrait – fixed size flex item */}
          <motion.div
            initial="hidden"
            animate={controls}
            whileHover="hover"
            className="hidden md:flex flex-none relative w-[240px] lg:w-[256px] h-[240px] lg:h-[256px] group cursor-pointer self-center"
            style={{ WebkitTransformOrigin: "center", transformOrigin: "center" }}
          >
            <motion.div
              className="absolute inset-0"
              animate={{ rotate: [0, 2, 0, -2, 0] }}
              transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
              style={{ transformOrigin: "center" }}
            />

            <svg
              width={circleSize}
              height={circleSize}
              viewBox={`0 0 ${circleSize} ${circleSize}`}
              className="absolute inset-0 z-0 pointer-events-none"
              style={{ transformOrigin: "center" }}
            >
              <motion.circle
                cx={circleSize / 2}
                cy={circleSize / 2}
                r={radius}
                stroke="rgba(80,83,197,255)"
                strokeWidth={strokeWidth}
                fill="none"
                strokeDasharray={circumference}
                initial={{ strokeDashoffset: circumference }}
                variants={{
                  draw: {
                    strokeDashoffset: 0,
                    transition: { delay: 0.2, duration: 0.8, ease: "easeOut" },
                  },
                }}
              />
            </svg>

            <motion.div
              className="absolute inset-0 rounded-full"
              style={{ boxShadow: "0 0 0 rgba(80,120,220,0.0)", transformOrigin: "center" }}
              variants={{
                draw: {
                  boxShadow: [
                    "0 0 0 rgba(80,120,220,0.0)",
                    "0 0 40px rgba(230, 33, 158, 0.6)",
                    "0 0 32px rgba(230, 33, 158, 0.6)",
                  ],
                  transition: { delay: 1.0, duration: 0.5, ease: "easeOut" },
                },
                hover: {
                  boxShadow: "0 0 60px rgba(230, 33, 158, 0.6)",
                  transition: { duration: 0.3 },
                },
              }}
            />

            <motion.img
              src={myPhoto}
              alt="Portrait"
              className="absolute inset-0 m-auto w-[216px] lg:w-[224px] h-[216px] lg:h-[224px] rounded-full object-cover z-10 ring-4 ring-white"
              initial={{ scale: 0.98 }}
              animate={{ scale: [0.98, 1.02, 1] }}
              whileHover={{ scale: 1.05 }}
              transition={{ delay: 1.0, duration: 0.45, ease: "easeOut" }}
              style={{ transformOrigin: "center" }}
            />
          </motion.div>

          {/* Text & “What I Do” pills */}
          <motion.div
            variants={fadeIn("right", "tween", 0.4, 1)}
            className="w-full md:flex-1 md:max-w-[720px] text-between md:text-left"
          >
            <h3 className="text-white text-2xl md:text-3xl font-semibold mb-4">
              Hey! I’m{" "}
              <ShinyText
                text="KEVIN"
                disabled={false}
                speed={3} 
                className="font-bold"
              />
            </h3>

            <ScrollReveal
              baseOpacity={0}
              enableBlur={true}
              baseRotation={3}
              blurStrength={4}
              containerClassName=""
              textClassName="text-secondary text-[16px] md:text-[17px] leading-[26px] md:leading-[30px] mb-6 font-semibold"
            >
              {`A full stack developer driven by curiosity and a passion for building meaningful solutions, I thrive at the intersection of creativity and code. I take pride in writing clean, maintainable software and enjoy diving into new technologies to solve complex problems. Whether it’s brainstorming an innovative feature or refining a user experience, I bring a blend of technical rigor and a collaborative spirit to every project.`}
            </ScrollReveal>

            <ScrollReveal
              baseOpacity={0}
              enableBlur={true}
              baseRotation={3}
              blurStrength={4}
              containerClassName=""
              textClassName="text-secondary text-[16px] md:text-[17px] leading-[26px] md:leading-[30px] mb-8 font-semibold"
            >
              {`I’m on the lookout for an environment where continuous learning and teamwork are core values. I love rolling up my sleeves alongside talented peers, sharing ideas, and iterating until we deliver real impact. If you’re seeking a dedicated developer who’s eager to contribute, grow, and help shape the future of your product, let’s connect and make something great happen together!`}
            </ScrollReveal>

            <h4 className="text-white text-lg font-medium mb-4">What I Do</h4>
            <div className="flex flex-wrap justify-center md:justify-start gap-4">
              <button className="px-4 py-2 flex items-center gap-2 bg-gray-900 rounded-full">
                <FaLaptopCode className="text-purple-400 w-5 h-5" />
                <span className="text-gray-200 text-sm">Frontend Development</span>
              </button>
              <button className="px-4 py-2 flex items-center gap-2 bg-gray-900 rounded-full">
                <FaServer className="text-orange-400 w-5 h-5" />
                <span className="text-gray-200 text-sm">Backend Development</span>
              </button>
              <button className="px-4 py-2 flex items-center gap-2 bg-gray-900 rounded-full">
                <FaMobileAlt className="text-green-400 w-5 h-5" />
                <span className="text-gray-200 text-sm">Mobile App Development</span>
              </button>
              <button className="px-4 py-2 flex items-center gap-2 bg-gray-900 rounded-full">
                <FaDatabase className="text-blue-400 w-5 h-5" />
                <span className="text-gray-200 text-sm">Database Management</span>
              </button>
              <button className="px-4 py-2 flex items-center gap-2 bg-gray-900 rounded-full">
                <FaCogs className="text-yellow-400 w-5 h-5" />
                <span className="text-gray-200 text-sm">DevOps</span>
              </button>
               <button className="px-4 py-2 flex items-center gap-2 bg-gray-900 rounded-full">
                <FaPencilRuler className="text-pink-400 w-5 h-5" />
                <span className="text-gray-200 text-sm">UI/UX Design</span>
              </button>
            </div>
          </motion.div>
        </div>
      </div>
    </>
  );
};

export default SectionWrapper(Services, "about");
