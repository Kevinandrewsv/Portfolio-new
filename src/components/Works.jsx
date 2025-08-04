// src/components/Works.jsx
import React, { useRef } from "react";
import { motion } from "framer-motion";
import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";

// Icons for Links
import { BsLink45Deg } from "react-icons/bs";
import { BiCodeAlt } from "react-icons/bi";
import { TfiServer } from "react-icons/tfi";

// Icons for Technologies
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
      <motion.div variants={fadeIn("", "", 0.1, 1)} className="text-center mb-16">
        <h2
          className={`${styles.sectionHeadText} bg-gradient-to-r from-[#eb3b91] to-[#6773de] bg-clip-text text-transparent`}
        >
          My Work
        </h2>
        <p className="mt-4 text-gray-400 text-[17px] max-w-3xl mx-auto leading-[30px]">
          The following projects showcase my skills through real-world examples. Each is briefly described with links to code
          repositories and live demos, reflecting my ability to solve complex problems and work with diverse technologies.
        </p>
      </motion.div>

      <div className="mt-20 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-14">
        {projects.map((p, i) => (
          <ProjectCard key={`project-${i}`} index={i} {...p} />
        ))}
      </div>
    </motion.section>
  );
}

const TechIcon = ({ name, color }) => {
  const iconSize = 24;
  const iconProps = { size: iconSize, className: color || "text-gray-400" };
  const iconMap = {
    react: <FaReact {...iconProps} />,
    nodejs: <FaNodeJs {...iconProps} />,
    mongodb: <SiMongodb {...iconProps} />,
    tailwind: <SiTailwindcss {...iconProps} />,
    firebase: <SiFirebase {...iconProps} />,
    nextjs: <SiNextdotjs {...iconProps} />,
    redux: <SiRedux {...iconProps} />,
    vite: <SiVite {...iconProps} />,
    express: <SiExpress {...iconProps} />,
    typescript: <SiTypescript {...iconProps} />,
    javascript: <SiJavascript {...iconProps} />,
    html5: <FaHtml5 {...iconProps} />,
    css3: <FaCss3Alt {...iconProps} />,
    git: <FaGitAlt {...iconProps} />,
    figma: <FaFigma {...iconProps} />,
  };
  const normalized = name.toLowerCase().replace(/[\s.-]/g, "");
  const icon = iconMap[normalized];
  if (!icon) return <span className={`text-xs font-semibold ${color || "text-pink-400"}`}>#{name}</span>;
  return <div title={name} className="transition-transform hover:scale-125">{icon}</div>;
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
    const rect = el.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const cx = rect.width / 2;
    const cy = rect.height / 2;
    const rotY = ((x - cx) / cx) * 10;
    const rotX = ((y - cy) / cy) * -10;
    el.style.transform = `perspective(1000px) rotateX(${rotX}deg) rotateY(${rotY}deg)`;
  };

  const handleMouseLeave = () => {
    const el = wrapperRef.current;
    if (!el) return;
    el.style.transform = `perspective(1000px) rotateX(0deg) rotateY(0deg)`;
  };

  return (
    <motion.div variants={fadeIn("up", "spring", index * 0.3, 0.8)}>
      {/* Gradient border + glow on hover + 3D tilt */}
      <div
        ref={wrapperRef}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        className="
          group
          rounded-2xl
          p-[1px]
          bg-gradient-to-br from-[#eb3b91]/60 to-[#6773de]/60
          overflow-hidden
          transition-all duration-300 ease-out
          hover:shadow-[0_0_8px_rgba(235,59,145,0.7),0_0_16px_rgba(235,59,145,0.5),0_0_24px_rgba(103,115,222,0.7),0_0_32px_rgba(103,115,222,0.4)]
        "
        style={{ transformStyle: "preserve-3d" }}
      >
        {/* Inner card */}
        <div className="relative w-full h-[450px] bg-[#030014] rounded-2xl">
          {/* Hover aura */}
          <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-[#eb3b91]/[0.15] to-[#6773de]/[0.15] opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

          {/* Main content */}
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
              <p className="mt-2 text-gray-400 text-sm line-clamp-2">{description}</p>
            </div>
            <div className="flex flex-wrap gap-4 items-center mt-4">
              {tags.map((t) => (
                <TechIcon key={t.name} name={t.name} color={t.color} />
              ))}
            </div>
          </div>

          {/* Link overlay */}
          <div
            className="absolute inset-0 flex flex-col justify-center items-center gap-4 p-5 bg-black/60 backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-2xl"
            style={{ transform: "translateZ(60px)" }}
          >
            <h3 className="text-white font-bold text-2xl text-center">{name}</h3>
            <p className="text-gray-300 text-sm max-w-sm text-center">{description}</p>
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
