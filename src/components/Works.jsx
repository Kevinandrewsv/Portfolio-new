// src/components/Works.jsx
import React, { useRef } from "react";
import { motion } from "framer-motion";
import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";

// Icons for Links
import { BsLink45Deg } from "react-icons/bs";
import { BiCodeAlt } from "react-icons/bi";
import { TfiServer } from "react-icons/tfi";

// React-Icons for Technologies
import {
  FaReact,
  FaNodeJs,
  FaHtml5,
  FaCss3Alt,
  FaGitAlt,
  FaFigma,
} from "react-icons/fa";
import {
  SiMongodb,
  SiTailwindcss,
  SiFirebase,
  SiNextdotjs,
  SiRedux,
  SiVite,
  SiExpress,
  SiTypescript,
  SiJavascript,
  SiAmazonaws,
  SiPostgresql,
} from "react-icons/si";

import { styles } from "../style";
import { projects } from "../constant";
import { fadeIn, staggerContainer } from "../utils/motion";

export default function WorksSection() {
  return (
    <motion.section
      id="projects"
      variants={staggerContainer()}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.15 }}
      className={`${styles.padding} pt-24 pb-12 mx-auto max-w-7xl`}
    >
      {/* Banner (matches your "About Me" style exactly) */}
      <section
        className="w-full py-12 md:py-2 relative overflow-hidden flex justify-center items-center"
      >
        <h1 className="absolute inset-0 flex justify-center items-center text-[5rem] md:text-[6rem] font-black text-white opacity-5 pointer-events-none uppercase">
          Projects
        </h1>

        <motion.div
          variants={fadeIn("up", "spring", 0.2, 1)}
          className="relative z-10 text-center"
        >
          <h2
            className={`${styles.sectionHeadText} bg-gradient-to-r from-[#eb3b91] to-[#6773de] bg-clip-text text-transparent`}
          >
            Projects
          </h2>
        </motion.div>
      </section>

      <div className="mt-20 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-14">
        {projects.map((p, i) => (
          <ProjectCard key={`project-${i}`} index={i} {...p} />
        ))}
      </div>
    </motion.section>
  );
}

// Always render a React-Icon based on tag.name
const TechIcon = ({ name }) => {
  const size = 24;
  const classes = "text-gray-400 transition-transform hover:scale-125";
  const mapKey = name.toLowerCase().replace(/[\s.-]/g, "");

  const iconMap = {
    react: <FaReact size={size} className={classes} />,
    reactjs: <FaReact size={size} className={classes} />,
    nodejs: <FaNodeJs size={size} className={classes} />,
    mongodb: <SiMongodb size={size} className={classes} />,
    tailwindcss: <SiTailwindcss size={size} className={classes} />,
    tailwind: <SiTailwindcss size={size} className={classes} />,
    firebase: <SiFirebase size={size} className={classes} />,
    nextjs: <SiNextdotjs size={size} className={classes} />,
    redux: <SiRedux size={size} className={classes} />,
    vite: <SiVite size={size} className={classes} />,
    expressjs: <SiExpress size={size} className={classes} />,
    express: <SiExpress size={size} className={classes} />,
    typescript: <SiTypescript size={size} className={classes} />,
    ts: <SiTypescript size={size} className={classes} />,
    javascript: <SiJavascript size={size} className={classes} />,
    html5: <FaHtml5 size={size} className={classes} />,
    css3: <FaCss3Alt size={size} className={classes} />,
    git: <FaGitAlt size={size} className={classes} />,
    figma: <FaFigma size={size} className={classes} />,
    aws: <SiAmazonaws size={size} className={classes} />,
    amazonwebservices: <SiAmazonaws size={size} className={classes} />,
    postgresql: <SiPostgresql size={size} className={classes} />,
  };

  return (
    iconMap[mapKey] || (
      <span className="text-xs font-semibold text-pink-400">#{name}</span>
    )
  );
};

const ProjectCard = ({
  index,
  name,
  description,
  tags,
  image,
  live_link,
  client_link,
  server_link,
}) => {
  const wrapperRef = useRef(null);

  const handleMouseMove = (e) => {
    const el = wrapperRef.current;
    if (!el) return;
    const { left, width, height } = el.getBoundingClientRect();
    const x = e.clientX - left;
    const y = e.clientY - el.getBoundingClientRect().top;
    const rotY = ((x - width / 2) / (width / 2)) * 10;
    const rotX = ((y - height / 2) / (height / 2)) * -10;
    el.style.transform = `perspective(1000px) rotateX(${rotX}deg) rotateY(${rotY}deg)`;
  };
  const handleMouseLeave = () => {
    const el = wrapperRef.current;
    if (!el) return;
    el.style.transform = `perspective(1000px) rotateX(0deg) rotateY(0deg)`;
  };

  return (
    <motion.div variants={fadeIn("up", "spring", index * 0.3, 0.8)}>
      <div
        ref={wrapperRef}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        className="group rounded-2xl p-[1px] bg-gradient-to-br from-[#eb3b91]/60 to-[#6773de]/60 overflow-hidden transition-all duration-300 ease-out hover:shadow-[0_0_8px_rgba(235,59,145,0.7),0_0_16px_rgba(235,59,145,0.5),0_0_24px_rgba(103,115,222,0.7),0_0_32px_rgba(103,115,222,0.4)]"
        style={{ transformStyle: "preserve-3d" }}
      >
        <div className="relative w-full h-[450px] bg-[#030014] rounded-2xl">
          <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-[#eb3b91]/[0.15] to-[#6773de]/[0.15] opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          <div
            className="absolute inset-[1px] bg-[#030014] rounded-2xl flex flex-col justify-between p-5"
            style={{ transform: "translateZ(20px)" }}
          >
            <div>
              <div className="relative w-full h-[200px] mb-4">
                <LazyLoadImage
                  src={image}
                  alt={`${name} preview`}
                  effect="blur"
                  className="w-full h-full object-cover rounded-lg"
                />
              </div>
              <h3 className="text-white font-bold text-2xl">{name}</h3>
              <p className="mt-2 text-gray-400 text-sm line-clamp-2">
                {description}
              </p>
            </div>
            <div className="flex flex-wrap gap-4 items-center mt-4">
              {tags.map((t) => (
                <TechIcon key={t.name} name={t.name} />
              ))}
            </div>
          </div>
          <div
            className="absolute inset-0 flex flex-col justify-center items-center gap-4 p-5 bg-black/60 backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-2xl"
            style={{ transform: "translateZ(60px)" }}
          >
            <h3 className="text-white font-bold text-2xl text-center">
              {name}
            </h3>
            <p className="text-gray-300 text-sm max-w-sm text-center">
              {description}
            </p>
            <div className="mt-4 flex gap-4">
              {live_link && (
                <a
                  href={live_link}
                  target="_blank"
                  rel="noopener noreferrer"
                  title="Live Demo"
                  className="flex items-center justify-center w-12 h-12 rounded-full bg-gradient-to-br from-[#eb3b91] to-[#6773de] hover:from-[#d82c80] hover:to-[#5562d4] transition-all duration-300 transform hover:scale-110"
                >
                  <BsLink45Deg size={24} className="text-white" />
                </a>
              )}
              {client_link && (
                <a
                  href={client_link}
                  target="_blank"
                  rel="noopener noreferrer"
                  title="Client Code"
                  className="flex items-center justify-center w-12 h-12 rounded-full bg-gray-700/80 hover:bg-gray-800/80 transition-all duration-300 transform hover:scale-110"
                >
                  <BiCodeAlt size={24} className="text-white" />
                </a>
              )}
              {server_link && (
                <a
                  href={server_link}
                  target="_blank"
                  rel="noopener noreferrer"
                  title="Server Code"
                  className="flex items-center justify-center w-12 h-12 rounded-full bg-gray-700/80 hover:bg-gray-800/80 transition-all duration-300 transform hover:scale-110"
                >
                  <TfiServer size={20} className="text-white" />
                </a>
              )}
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};
