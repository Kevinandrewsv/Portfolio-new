"use client";

import React, { createContext, useState, useContext, useRef, useEffect } from "react";
import { motion } from "framer-motion";
import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";

import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

// Icons for Links
import { BsLink45Deg } from "react-icons/bs";
import { BiCodeAlt } from "react-icons/bi";
import { TfiServer } from "react-icons/tfi";

// React-Icons for Technologies
import { FaReact, FaNodeJs, FaHtml5, FaCss3Alt, FaGitAlt, FaFigma } from "react-icons/fa";
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

// GlowingEffect (unchanged)
import { GlowingEffect } from "./glowing-effect";

/* ----------------- tiny CN util ----------------- */
export function cn(...inputs) {
  return twMerge(clsx(inputs));
}

/* ----------------- Card 3D helpers ----------------- */
/*
 These are your CardContainer / CardBody / CardItem implementations (kept
 behaviorally identical), placed here so everything lives in one file.
*/
const MouseEnterContext = createContext(undefined);

export const CardContainer = ({ children, className, containerClassName }) => {
  const containerRef = useRef(null);
  const [isMouseEntered, setIsMouseEntered] = useState(false);

  const handleMouseMove = (e) => {
    if (!containerRef.current) return;
    const { left, top, width, height } = containerRef.current.getBoundingClientRect();
    const x = (e.clientX - left - width / 2) / 25;
    const y = (e.clientY - top - height / 2) / 25;
    // small local rotation for subtle parallax on overlay — won't touch your main tilt.
    containerRef.current.style.transform = `rotateY(${x}deg) rotateX(${y}deg)`;
  };

  const handleMouseEnter = () => {
    setIsMouseEntered(true);
  };

  const handleMouseLeave = () => {
    if (!containerRef.current) return;
    setIsMouseEntered(false);
    containerRef.current.style.transform = `rotateY(0deg) rotateX(0deg)`;
  };

  return (
    <MouseEnterContext.Provider value={[isMouseEntered, setIsMouseEntered]}>
      {/* wrapper adds perspective so translateZ in CardItem is visible */}
      <div
        className={cn("w-full h-full", containerClassName)}
        style={{ perspective: "1200px", WebkitPerspective: "1200px" }}
      >
        <div
          ref={containerRef}
          onMouseEnter={handleMouseEnter}
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
          className={cn("w-full h-full transition-all duration-200 ease-linear", className)}
          style={{ transformStyle: "preserve-3d", WebkitTransformStyle: "preserve-3d" }}
        >
          {children}
        </div>
      </div>
    </MouseEnterContext.Provider>
  );
};

export const CardBody = ({ children, className }) => {
  return (
    <div
      className={cn(
        // keep preserve-3d for children
        "w-full h-full [transform-style:preserve-3d] [&>*]:[transform-style:preserve-3d]",
        className
      )}
    >
      {children}
    </div>
  );
};

/* ----------------- UPDATED CardItem -----------------
   Now also animates opacity + a subtle slide (enterOffsetY) so
   inner text (title/desc/buttons) visibly pop on hover.
   No other behavior changed.
*/
export const CardItem = ({
  as: Tag = "div",
  children,
  className,
  translateX = 0,
  translateY = 0,
  translateZ = 0,
  rotateX = 0,
  rotateY = 0,
  rotateZ = 0,
  enterOffsetY = 8, // slide distance when hidden
  ...rest
}) => {
  const ref = useRef(null);
  const [isMouseEntered] = useMouseEnter();

  useEffect(() => {
    handleAnimations();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isMouseEntered, translateX, translateY, translateZ, rotateX, rotateY, rotateZ]);

  const handleAnimations = () => {
    if (!ref.current) return;

    const prefersReducedMotion =
      typeof window !== "undefined" && window.matchMedia
        ? window.matchMedia("(prefers-reduced-motion: reduce)").matches
        : false;

    const cleanedZ = prefersReducedMotion ? Math.min(translateZ, 18) : translateZ;
    const cleanedRX = prefersReducedMotion ? Math.min(rotateX, 6) : rotateX;
    const cleanedRY = prefersReducedMotion ? Math.min(rotateY, 6) : rotateY;

    if (isMouseEntered) {
      // show: translateZ (depth), restore opacity and remove slide offset
      const rotXCalc = `calc(var(--my, 0) * ${cleanedRX}deg)`;
      const rotYCalc = `calc(var(--mx, 0) * ${cleanedRY}deg)`;

      ref.current.style.transition = "transform 260ms cubic-bezier(.2,.9,.2,1), opacity 220ms ease";
      ref.current.style.transform = `translate3d(${translateX}px, ${translateY}px, ${cleanedZ}px) rotateX(${rotXCalc}) rotateY(${rotYCalc}) rotateZ(${rotateZ}deg)`;
      ref.current.style.opacity = "1";
      ref.current.style.transformStyle = "preserve-3d";
      ref.current.style.backfaceVisibility = "hidden";
      ref.current.style.WebkitBackfaceVisibility = "hidden";
      ref.current.style.willChange = "transform, opacity";
    } else {
      // hide: slight downward offset + 0 opacity; keep transform reset simple
      ref.current.style.transition = "transform 220ms cubic-bezier(.2,.9,.2,1), opacity 180ms ease";
      ref.current.style.opacity = "0";
      ref.current.style.transform = `translate3d(0px, ${enterOffsetY}px, 0px) rotateX(0deg) rotateY(0deg) rotateZ(0deg)`;
      ref.current.style.willChange = "opacity, transform";
    }
  };

  return (
    <Tag
      ref={ref}
      className={cn("w-fit transition duration-200 ease-linear", className)}
      {...rest}
    >
      {children}
    </Tag>
  );
};

// hook
export const useMouseEnter = () => {
  const context = useContext(MouseEnterContext);
  if (context === undefined) {
    throw new Error("useMouseEnter must be used within a MouseEnterProvider");
  }
  return context;
};

/* ----------------- WorksSection (main) ----------------- */

export default function WorksSection() {
  const [hoveredId, setHoveredId] = useState(null);

  // mutable pointer store (no state) — passed down to cards
  const pointerRef = useRef({ x: -1, y: -1 });

  // rAF scheduling flag (keeps pointer processing cheap)
  const rafScheduled = useRef(false);

  // the last id we reported to state (so we only set state when it changes)
  const lastReportedId = useRef(null);

  useEffect(() => {
    const handlePointerMove = (e) => {
      pointerRef.current.x = e.clientX;
      pointerRef.current.y = e.clientY;

      // schedule a single rAF if one isn't pending
      if (!rafScheduled.current) {
        rafScheduled.current = true;
        requestAnimationFrame(processPointer);
      }
    };

    const processPointer = () => {
      rafScheduled.current = false;

      const p = pointerRef.current;
      if (p.x < 0 || p.y < 0) {
        // if pointer outside viewport, clear hover
        if (lastReportedId.current !== null) {
          lastReportedId.current = null;
          setHoveredId(null);
        }
        return;
      }

      // find nearest element at the pointer and locate the project card
      let foundId = null;
      try {
        const elements = document.elementsFromPoint(p.x, p.y);
        for (const el of elements) {
          // find closest ancestor with data-project-card attribute
          const card = el.closest && el.closest("[data-project-card]");
          if (card && card.dataset && card.dataset.projectCard) {
            foundId = card.dataset.projectCard;
            break;
          }
        }
      } catch (err) {
        // elementsFromPoint might throw in some environments; ignore
        foundId = null;
      }

      // report only when changed
      if (foundId !== lastReportedId.current) {
        lastReportedId.current = foundId;
        setHoveredId(foundId);
      }
    };

    window.addEventListener("pointermove", handlePointerMove, { passive: true });

    // also handle pointerleave from window so hover clears when pointer leaves page
    const handlePointerLeave = () => {
      pointerRef.current.x = -1;
      pointerRef.current.y = -1;
      if (lastReportedId.current !== null) {
        lastReportedId.current = null;
        setHoveredId(null);
      }
    };
    window.addEventListener("pointerout", handlePointerLeave, { passive: true });
    window.addEventListener("pointerleave", handlePointerLeave, { passive: true });

    return () => {
      window.removeEventListener("pointermove", handlePointerMove);
      window.removeEventListener("pointerout", handlePointerLeave);
      window.removeEventListener("pointerleave", handlePointerLeave);
    };
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
              setHoveredId={setHoveredId}
              pointerRef={pointerRef}
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

  return iconMap[mapKey] || <span className="text-xs font-semibold text-pink-400">#{name}</span>;
};

/* ---------- ProjectCard (optimized, single rAF while hovered) ---------- */
const ProjectCard = ({
  id,
  index,
  hovered,
  setHoveredId,
  pointerRef,
  name,
  description,
  tags = [],
  image,
  live_link,
  client_link,
  server_link,
}) => {
  const wrapperRef = useRef(null);
  const overlayRef = useRef(null);
  const tiltTimeoutRef = useRef(null);
  const rafRef = useRef(null);
  const rectRef = useRef(null);
  const resizeObserverRef = useRef(null);

  // compute rect cheaply with ResizeObserver and update on scroll/resize
  useEffect(() => {
    const el = wrapperRef.current;
    if (!el) return;

    const computeRect = () => {
      rectRef.current = el.getBoundingClientRect();
    };
    computeRect();

    const obs = new ResizeObserver(computeRect);
    obs.observe(el);
    resizeObserverRef.current = obs;

    const onScroll = () => computeRect();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll, { passive: true });

    return () => {
      obs.disconnect();
      resizeObserverRef.current = null;
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  // only run a single rAF loop while this card is hovered (so at most one active rAF)
  useEffect(() => {
    const el = wrapperRef.current;
    if (!el) return;

    const resetVars = () => {
      try {
        el.style.setProperty("--rotX", "0deg");
        el.style.setProperty("--rotY", "0deg");
        el.style.zIndex = "";
      } catch {}
    };

    if (!hovered) {
      resetVars();
      if (rafRef.current) {
        cancelAnimationFrame(rafRef.current);
        rafRef.current = null;
      }
      if (tiltTimeoutRef.current) {
        clearTimeout(tiltTimeoutRef.current);
        tiltTimeoutRef.current = null;
      }
      return;
    }

    // hovered: bring card to front and start rAF loop
    el.style.zIndex = "9999";

    // ensure rect is fresh
    rectRef.current = el.getBoundingClientRect();

    let frameCount = 0;
    const loop = () => {
      frameCount++;
      // optional frame-skip to ~30fps on heavy devices
      if (frameCount % 2 === 0) {
        const rect = rectRef.current;
        const globalMouse = (pointerRef && pointerRef.current) || null;

        if (!rect || !globalMouse) {
          el.style.setProperty("--rotX", "0deg");
          el.style.setProperty("--rotY", "0deg");
        } else {
          const x = globalMouse.x - rect.left;
          const y = globalMouse.y - rect.top;

          if (x < 0 || x > rect.width || y < 0 || y > rect.height) {
            el.style.setProperty("--rotX", "0deg");
            el.style.setProperty("--rotY", "0deg");
          } else {
            const rotY = ((x - rect.width / 2) / (rect.width / 2)) * 8;
            const rotX = ((y - rect.height / 2) / (rect.height / 2)) * -8;
            el.style.setProperty("--rotX", `${rotX.toFixed(2)}deg`);
            el.style.setProperty("--rotY", `${rotY.toFixed(2)}deg`);
          }
        }
      }

      rafRef.current = requestAnimationFrame(loop);
    };

    rafRef.current = requestAnimationFrame(loop);

    // safety: clear zIndex after a bit when hover ends
    if (tiltTimeoutRef.current) {
      clearTimeout(tiltTimeoutRef.current);
      tiltTimeoutRef.current = null;
    }
    tiltTimeoutRef.current = setTimeout(() => {
      tiltTimeoutRef.current = null;
    }, 1000);

    return () => {
      if (rafRef.current) {
        cancelAnimationFrame(rafRef.current);
        rafRef.current = null;
      }
      if (tiltTimeoutRef.current) {
        clearTimeout(tiltTimeoutRef.current);
        tiltTimeoutRef.current = null;
      }
      resetVars();
    };
  }, [hovered, pointerRef]);

  // keyboard accessible focus/blur still control hover state
  const handleFocus = () => setHoveredId(id);
  const handleBlur = () => setHoveredId(null);

  // simple enters/leaves for immediate UX
  const handleMouseEnter = () => setHoveredId(id);
  const handleMouseLeave = () => setHoveredId(null);

  return (
    <motion.div variants={fadeIn("up", "spring", index * 0.25, 0.8)}>
      <div
        ref={wrapperRef}
        data-project-card={id}
        tabIndex={0}
        onFocus={handleFocus}
        onBlur={handleBlur}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        onTouchStart={() => setHoveredId(id)}
        onTouchEnd={() => setHoveredId(null)}
        role="group"
        aria-label={`Project card ${name}`}
        className={`relative rounded-2xl overflow-visible transition-all duration-200 ease-out ${
          hovered ? "will-change-transform" : ""
        }`}
        style={{
          transformStyle: "preserve-3d",
          transform: `perspective(1000px) rotateX(var(--rotX, 0deg)) rotateY(var(--rotY, 0deg))`,
          zIndex: hovered ? 9999 : "auto",
        }}
      >
        {/* Glow */}
        <GlowingEffect
          spread={40}
          glow={true}
          disabled={false}
          proximity={120}
          inactiveZone={0.02}
          borderWidth={3}
          className="pointer-events-none absolute inset-0 rounded-2xl"
        />

        {/* Extra glow layers */}
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

        {/* Card body */}
        <div
          className="relative w-full h-[450px] bg-[#030014] rounded-2xl"
          style={{
            zIndex: 10,
            boxShadow:
              "0 40px 120px rgba(10,10,12,0.75), 0 18px 48px rgba(103,115,222,0.18), 0 8px 24px rgba(235,59,145,0.06)",
          }}
        >
          {/* gradient overlay */}
          <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-[#eb3b91]/[0.12] to-[#6773de]/[0.12] opacity-0 transition-opacity duration-300 pointer-events-none" />

          {/* MAIN CONTENT */}
          <div
            className="absolute inset-0 bg-[#030014] rounded-2xl flex flex-col justify-between p-5"
            style={{
              transform: "translateZ(16px)",
              transformStyle: "preserve-3d",
              WebkitTransformStyle: "preserve-3d",
            }}
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
              <p className="mt-2 text-white text-sm line-clamp-2">{description}</p>
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

          {/* Overlay (hover) - we use CardContainer / CardBody / CardItem here so children pop in 3D */}
          <div
            ref={overlayRef}
            className={`absolute inset-0 flex flex-col justify-center items-center gap-4 p-5 bg-black/60 md:backdrop-blur-md motion-reduce:backdrop-blur-none rounded-2xl transition-opacity duration-200 ${
              hovered ? "opacity-100" : "opacity-0"
            }`}
            style={{
              zIndex: 50,
              // keep overlay itself flat; CardContainer inside will provide perspective for children
              transform: "translate3d(0,0,0)",
              transformStyle: "preserve-3d",
              WebkitTransformStyle: "preserve-3d",
              pointerEvents: hovered ? "auto" : "none",
            }}
            aria-hidden={!hovered}
            onPointerDown={(e) => e.stopPropagation()}
            onClick={(e) => e.stopPropagation()}
          >
            {/* CardContainer gives perspective context and toggles isMouseEntered for CardItem */}
            <CardContainer containerClassName="h-full w-full" className="h-full">
              <CardBody className="h-full flex flex-col justify-center items-center gap-4 p-5 bg-transparent">
                <CardItem
                  as="h3"
                  translateZ={64}
                  rotateX={0}
                  className="text-white font-bold text-2xl text-center"
                >
                  {name}
                </CardItem>

                <CardItem
                  as="p"
                  translateZ={40}
                  className="text-gray-300 text-sm max-w-sm text-center"
                >
                  {description}
                </CardItem>

                <div className="mt-4">
                  <CardItem as="div" translateZ={84} className="flex gap-4 items-center">
                    {live_link && (
                      <a
                        href={live_link}
                        target="_blank"
                        rel="noopener noreferrer"
                        title="Live Demo"
                        className="flex items-center justify-center w-12 h-12 rounded-full bg-gradient-to-br from-[#eb3b91] to-[#6773de] hover:from-[#d82c80] hover:to-[#5562d4] transition-all duration-200 transform hover:scale-110"
                        onClick={(e) => e.stopPropagation()}
                        onTouchStart={(e) => e.stopPropagation()}
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
                        className="flex items-center justify-center w-12 h-12 rounded-full bg-gray-700/80 hover:bg-gray-800/80 transition-all duration-200 transform hover:scale-110"
                        onClick={(e) => e.stopPropagation()}
                        onTouchStart={(e) => e.stopPropagation()}
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
                        className="flex items-center justify-center w-12 h-12 rounded-full bg-gray-700/80 hover:bg-gray-800/80 transition-all duration-200 transform hover:scale-110"
                        onClick={(e) => e.stopPropagation()}
                        onTouchStart={(e) => e.stopPropagation()}
                      >
                        <TfiServer size={20} className="text-white" />
                      </a>
                    )}
                  </CardItem>
                </div>
              </CardBody>
            </CardContainer>
          </div>
        </div>
      </div>
    </motion.div>
  );
};
