"use client";

import React, { useEffect, useRef, useState } from "react";
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

// GlowingEffect (kept as you requested)
import { GlowingEffect } from "./glowing-effect";

/**
 * WorksSection - shows project cards with stronger visible separation (glow + shadow)
 */
export default function WorksSection() {
  const [hoveredId, setHoveredId] = useState(null);
  const [pointer, setPointer] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handlePointer = (e) => {
      setPointer({ x: e.clientX, y: e.clientY });

      const elements = document.elementsFromPoint(e.clientX, e.clientY);
      let foundId = null;
      for (let el of elements) {
        const card = el.closest && el.closest("[data-project-card]");
        if (card && card.dataset && card.dataset.projectCard) {
          foundId = card.dataset.projectCard;
          break;
        }
      }
      setHoveredId(foundId);
    };

    window.addEventListener("pointermove", handlePointer, { passive: true });
    return () => window.removeEventListener("pointermove", handlePointer);
  }, []);

  return (
    <motion.section
      id="projects"
      variants={staggerContainer()}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.15 }}
      className={`${styles.padding} pt-24 pb-12 mx-auto max-w-7xl`}
    >
      {/* Banner */}
      <section className="w-full py-12 md:py-2 relative overflow-hidden flex justify-center items-center">
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
        {projects.map((p, i) => {
          const id = `project-${i}`;
          return (
            <ProjectCard
              key={id}
              id={id}
              index={i}
              hovered={hoveredId === id}
              pointer={pointer}
              setHoveredId={setHoveredId}
              {...p}
            />
          );
        })}
      </div>
    </motion.section>
  );
}

/* ---------- TechIcon ---------- */
const TechIcon = ({ name }) => {
  const size = 24;
  const classes = "text-gray-400 transition-transform hover:scale-125";
  const mapKey = String(name).toLowerCase().replace(/[\s.-]/g, "");

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

/* ---------- ProjectCard ---------- */
const ProjectCard = ({
  id,
  index,
  hovered,
  pointer,
  setHoveredId,
  name,
  description,
  tags = [],
  image,
  live_link,
  client_link,
  server_link,
}) => {
  const wrapperRef = useRef(null);
  const tiltTimeoutRef = useRef(null);

  useEffect(() => {
    const el = wrapperRef.current;
    if (!el) return;
    if (!hovered) {
      el.style.transform = "perspective(1000px) rotateX(0deg) rotateY(0deg)";
      el.style.zIndex = "";
      return;
    }

    // keep hovered card above other cards but below the site nav (nav uses z-50)
    el.style.zIndex = "20";

    const rect = el.getBoundingClientRect();
    const x = pointer.x - rect.left;
    const y = pointer.y - rect.top;

    if (x < 0 || x > rect.width || y < 0 || y > rect.height) {
      el.style.transform = `perspective(1000px) rotateX(0deg) rotateY(0deg)`;
      return;
    }

    const rotY = ((x - rect.width / 2) / (rect.width / 2)) * 8;
    const rotX = ((y - rect.height / 2) / (rect.height / 2)) * -8;
    el.style.transform = `perspective(1000px) rotateX(${rotX}deg) rotateY(${rotY}deg)`;

    if (tiltTimeoutRef.current) clearTimeout(tiltTimeoutRef.current);
    tiltTimeoutRef.current = setTimeout(() => {
      if (!hovered && el) {
        el.style.zIndex = "";
      }
    }, 500);

    return () => {
      if (tiltTimeoutRef.current) {
        clearTimeout(tiltTimeoutRef.current);
        tiltTimeoutRef.current = null;
      }
    };
  }, [hovered, pointer]);

  const handleFocus = () => setHoveredId(id);
  const handleBlur = () => setHoveredId(null);

  return (
    <motion.div variants={fadeIn("up", "spring", index * 0.25, 0.8)}>
      <div
        ref={wrapperRef}
        data-project-card={id}
        tabIndex={0}
        onFocus={handleFocus}
        onBlur={handleBlur}
        role="group"
        aria-label={`Project card ${name}`}
        className="relative rounded-2xl overflow-visible transition-all duration-200 ease-out will-change-transform"
        style={{
          transformStyle: "preserve-3d",
        }}
      >
        {/* Keep GlowingEffect (non-interactive) */}
        <GlowingEffect
          spread={40}
          glow={true}
          disabled={false}
          proximity={120}
          inactiveZone={0.02}
          borderWidth={3}
          className="pointer-events-none absolute inset-0 rounded-2xl"
        />

        {/* Extra visible glow layers behind the card (two radial layers) */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -inset-6 rounded-2xl"
          style={{
            zIndex: 0,
            transform: "translateZ(0)",
            background:
              "radial-gradient(400px 200px at 10% 80%, rgba(103,115,222,0.20), transparent 20%), radial-gradient(300px 160px at 90% 20%, rgba(235,59,145,0.10), transparent 22%)",
            filter: "blur(28px)",
            opacity: 1,
          }}
        />

        {/* Card body — strong ambient shadow so it pops */}
        <div
          className="relative w-full h-[450px] bg-[#030014] rounded-2xl"
          style={{
            zIndex: 10,
            boxShadow:
              "0 40px 120px rgba(10,10,12,0.75), 0 18px 48px rgba(103,115,222,0.18), 0 8px 24px rgba(235,59,145,0.06)",
          }}
        >
          {/* subtle gradient overlay (kept as-is) */}
          <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-[#eb3b91]/[0.12] to-[#6773de]/[0.12] opacity-0 transition-opacity duration-300 pointer-events-none" />

          {/* MAIN CONTENT — fill the rounded container fully (no 1px inset) */}
          <div
            className="absolute inset-0 bg-[#030014] rounded-2xl flex flex-col justify-between p-5"
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
              {tags.map((t, idx) => (
                <TechIcon
                  key={typeof t === "string" ? `${t}-${idx}` : t.name || idx}
                  name={typeof t === "string" ? t : t.name}
                />
              ))}
            </div>
          </div>

          {/* Overlay (hover) — keep z low so nav stays click-through */}
          <div
            className={`absolute inset-0 flex flex-col justify-center items-center gap-4 p-5 bg-black/60 backdrop-blur-sm rounded-2xl transition-opacity duration-200 ${
              hovered ? "opacity-100 pointer-events-auto z-20" : "opacity-0 pointer-events-none"
            }`}
            style={{ transform: "translateZ(60px)" }}
            aria-hidden={!hovered}
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
                  className="flex items-center justify-center w-12 h-12 rounded-full bg-gradient-to-br from-[#eb3b91] to-[#6773de] hover:from-[#d82c80] hover:to-[#5562d4] transition-all duration-200 transform hover:scale-110 pointer-events-auto"
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
                  className="flex items-center justify-center w-12 h-12 rounded-full bg-gray-700/80 hover:bg-gray-800/80 transition-all duration-200 transform hover:scale-110 pointer-events-auto"
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
                  className="flex items-center justify-center w-12 h-12 rounded-full bg-gray-700/80 hover:bg-gray-800/80 transition-all duration-200 transform hover:scale-110 pointer-events-auto"
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
