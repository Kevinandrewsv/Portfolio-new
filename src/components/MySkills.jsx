// src/components/MySkills.jsx
import React from "react";
import { motion } from "framer-motion";
import { styles } from "../style";
import { fadeIn, staggerContainer } from "../utils/motion";
import {
  SiJavascript,
  SiTypescript,
  SiReact,
  SiRedux,
  SiNextdotjs,
  SiThreedotjs,
  SiTailwindcss,
  SiSanity,
  SiFigma,
  SiNodedotjs,
  SiExpress,
  SiNestjs,
  SiPython,
  SiDjango,
  SiMongodb,
  SiMysql,
  SiPostgresql,
  SiAwsamplify,
  SiDocker,
  SiKubernetes,
} from "react-icons/si";

// flat list of techs with background gradients
const techList = [
  { name: "JavaScript",   Icon: SiJavascript, gradientBg: "from-yellow-400 via-orange-500 to-red-500" },
  { name: "TypeScript",   Icon: SiTypescript, gradientBg: "from-blue-400 via-blue-600 to-indigo-600" },
  { name: "React.js",     Icon: SiReact,       gradientBg: "from-cyan-300 via-blue-500 to-purple-500" },
  { name: "Redux",        Icon: SiRedux,       gradientBg: "from-violet-400 via-purple-600 to-indigo-600" },
  { name: "Next.js",      Icon: SiNextdotjs,   gradientBg: "from-gray-300 via-gray-500 to-gray-700" },
  { name: "Three.js",     Icon: SiThreedotjs,  gradientBg: "from-teal-300 via-cyan-500 to-blue-500" },
  { name: "Tailwind CSS", Icon: SiTailwindcss, gradientBg: "from-sky-400 via-cyan-400 to-blue-400" },
  { name: "Sanity",       Icon: SiSanity,      gradientBg: "from-pink-300 via-pink-500 to-pink-700" },
  { name: "Figma",        Icon: SiFigma,       gradientBg: "from-orange-300 via-red-400 to-pink-500" },
  { name: "Node.js",      Icon: SiNodedotjs,   gradientBg: "from-green-400 via-emerald-500 to-teal-500" },
  { name: "Express.js",   Icon: SiExpress,     gradientBg: "from-gray-600 via-gray-700 to-gray-800" },
  { name: "Nest.js",      Icon: SiNestjs,      gradientBg: "from-red-400 via-red-600 to-red-800" },
  { name: "Python",       Icon: SiPython,      gradientBg: "from-yellow-500 via-yellow-600 to-yellow-700" },
  { name: "Django",       Icon: SiDjango,      gradientBg: "from-green-600 via-green-700 to-green-800" },
  { name: "MongoDB",      Icon: SiMongodb,     gradientBg: "from-green-500 via-green-600 to-emerald-700" },
  { name: "MySQL",        Icon: SiMysql,       gradientBg: "from-blue-600 via-blue-700 to-blue-800" },
  { name: "PostgreSQL",   Icon: SiPostgresql,  gradientBg: "from-indigo-600 via-indigo-700 to-indigo-800" },
  { name: "AWS",          Icon: SiAwsamplify,  gradientBg: "from-yellow-400 via-orange-400 to-yellow-600" },
  { name: "Docker",       Icon: SiDocker,      gradientBg: "from-blue-400 via-sky-500 to-blue-600" },
  { name: "Kubernetes",   Icon: SiKubernetes,  gradientBg: "from-indigo-400 via-blue-600 to-indigo-700" },
];

// SVG path parameters
const PERIMETER = 632; // ~4 × 158
const HEAD      = 100; // visible “comet head” length
const TAIL      = PERIMETER - HEAD;

const SkillCard = ({ name, Icon, gradientBg }) => {
  const gradId = `cometGrad-${name.replace(/\s+/g, "")}`;

  return (
    <div className="relative w-[140px] h-[140px]">
      {/* SVG “comet” border */}
      <motion.svg
        className="absolute inset-0 pointer-events-none"
        viewBox="0 0 160 160"
        initial={{ strokeDashoffset: 0 }}
        animate={{ strokeDashoffset: -PERIMETER }}
        transition={{ duration: 3.5, ease: "linear", repeat: Infinity }}
      >
        <defs>
          <linearGradient
            id={gradId}
            x1="0%" y1="0%" x2="100%" y2="0%"
            gradientUnits="userSpaceOnUse"
          >
            <stop offset="0%"   stopColor="#eb3b91" stopOpacity="0.5" />
            <stop offset="100%" stopColor="#6773de" stopOpacity="0.5" />
          </linearGradient>
        </defs>
        <rect
          x="1" y="1"
          width="158" height="158"
          rx="12" ry="12"
          fill="none"
          stroke={`url(#${gradId})`}
          strokeWidth="0.8"
          strokeDasharray={`${HEAD} ${TAIL}`}
          strokeLinecap="round"
        />
      </motion.svg>

      {/* Card content (still has scale/rotate on hover) */}
      <motion.div
        whileHover={{ scale: 1.05, rotate: 1 }}
        className="relative border border-white/10 rounded-xl w-full h-full p-4 flex flex-col items-center justify-center text-white shadow-md hover:shadow-xl transition-all duration-300 ease-in-out"
      >
        <div
          className={`w-14 h-14 mb-3 flex items-center justify-center rounded-full bg-gradient-to-br ${gradientBg}`}
        >
          <Icon className="text-white text-2xl" />
        </div>
        <p className="text-sm font-medium text-center">{name}</p>
      </motion.div>
    </div>
  );
};

const MySkills = () => {
  return (
    <motion.section
      id="skills"
      className="w-full pt-16"
      variants={staggerContainer(0.12, 0.04)}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.15 }}
    >
      {/* Banner (same styling as About Me) */}
      <section
        id="skills-banner"
        className="w-full py-12 md:py-2 relative overflow-hidden flex justify-center items-center"
      >
        <h1 className="absolute inset-0 flex justify-center items-center text-[5rem] md:text-[6rem] font-black text-white opacity-5 pointer-events-none uppercase">
          My Skills
        </h1>

        <motion.div
          variants={fadeIn("up", "spring", 0.2, 1)}
          className="relative z-10 text-center"
        >
          <h2 className={styles.sectionHeadText}>My Skills</h2>
        </motion.div>
      </section>

      {/* Description */}
      <motion.p
        variants={fadeIn("up", "tween", 0.25, 0.6)}
        className="text-center text-secondary text-[17px] max-w-xl mx-auto mb-12 leading-relaxed px-4 md:px-12 lg:px-20"
      >
        A collection of tools and technologies I use to build modern web applications.
      </motion.p>

      {/* Skills Grid - constrained width and staggered child animations */}
      <section className="pb-24">
        <div className="max-w-6xl mx-auto px-4 md:px-6 lg:px-8">
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-x-6 gap-y-10 place-items-center">
            {techList.map((tech, idx) => (
              <motion.div
                key={tech.name}
                variants={fadeIn("up", "spring", idx * 0.06, 0.6)}
                className="w-full flex justify-center"
              >
                <SkillCard {...tech} />
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </motion.section>
  );
};

export default MySkills;
