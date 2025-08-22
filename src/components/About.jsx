"use client";

import React, { useEffect, useRef, useState } from "react";
import { styles } from "../style";
import moment from "moment/moment";
import { socialLinks } from "../constant";
import { motion } from "framer-motion";
import { IconContext } from "react-icons";
import { fadeIn, staggerContainer } from "../utils/motion";
import Typed from "typed.js";
import { RainbowButton } from "./RainbowButton";
import { StarBorder } from "./star-border";
import { FlipWords } from "./ui/flip-words"; // named export

// ✅ Import your resume from assets
import ResumePDF from "../assets/KevinAndrewsResume.pdf";

const About = () => {
  const [greetings, setGreetings] = useState("");
  const currentHour = moment().hour();

  const codeElDesktopRef = useRef(null);
  const codeElMobileRef = useRef(null);
  const typedRef = useRef(null);

  const skills = [
    "JavaScript",
    "React.js",
    "Next.js",
    "Node.js",
    "Express.js",
    "Nest.js",
    "MongoDB",
    "MySQL",
    "PostgreSQL",
    "AWS",
  ];

  // Tailwind-like color approximations as explicit CSS gradients (used as inline styles).
  // These are safe and guaranteed to render via inline background-image + background-clip:text.
  const skillCssGradients = {
    JavaScript: "linear-gradient(90deg, #FBBF24 0%, #D97706 100%)", // yellow-400 -> yellow-600
    "React.js": "linear-gradient(90deg, #60A5FA 0%, #2563EB 100%)", // blue-400 -> blue-600
    "Next.js": "linear-gradient(90deg, #E5E7EB 0%, #9CA3AF 100%)", // gray-200 -> gray-400
    "Node.js": "linear-gradient(90deg, #34D399 0%, #16A34A 100%)", // green-400 -> green-600
    "Express.js": "linear-gradient(90deg, #C084FC 0%, #7C3AED 100%)", // purple-400 -> purple-600
    "Nest.js": "linear-gradient(90deg, #FB7185 0%, #DC2626 100%)", // red-400 -> red-600
    MongoDB: "linear-gradient(90deg, #16A34A 0%, #166534 100%)", // green-600 -> green-800
    MySQL: "linear-gradient(90deg, #2563EB 0%, #1E40AF 100%)", // blue-600 -> blue-800
    PostgreSQL: "linear-gradient(90deg, #4F46E5 0%, #3730A3 100%)", // indigo-600 -> indigo-800
    AWS: "linear-gradient(90deg, #FB923C 0%, #F97316 100%)", // orange-400 -> orange-600
  };

  // Build an array of CSS gradient strings in the same order as skills[]
  const skillGradientsArray = skills.map((s) => skillCssGradients[s] || "linear-gradient(90deg,#43c7fb,#c438fb)");

  const [greetText, greetEmoji] = React.useMemo(() => {
    const parts = greetings.split(" ");
    const emoji = parts.pop();
    return [parts.join(" "), emoji];
  }, [greetings]);

  useEffect(() => {
    if (currentHour >= 5 && currentHour < 12) setGreetings("Good Morning 🌅");
    else if (currentHour < 18) setGreetings("Good Afternoon ☀️");
    else setGreetings("Good Evening 🌙");
  }, [currentHour]);

  const isVisible = (el) => {
    if (!el) return false;
    try {
      const style = window.getComputedStyle(el);
      if (style.display === "none" || style.visibility === "hidden" || style.opacity === "0")
        return false;
      const rect = el.getBoundingClientRect();
      if (rect.width === 0 && rect.height === 0) return false;
      return true;
    } catch (e) {
      return !!(el && el.offsetHeight);
    }
  };

  useEffect(() => {
    const candidates = [codeElDesktopRef.current, codeElMobileRef.current].filter(Boolean);
    let target = null;
    if (candidates.length === 1) target = candidates[0];
    else {
      for (const c of candidates) {
        if (isVisible(c)) {
          target = c;
          break;
        }
      }
      if (!target) target = candidates[0] || null;
    }

    if (!target) return undefined;

    const typed = new Typed(target, {
      strings: ["success != true", "error != false", "!motivated"],
      typeSpeed: 110,
      backSpeed: 80,
      backDelay: 2300,
      loop: true,
      showCursor: false,
    });
    typedRef.current = typed;

    return () => {
      try {
        if (typedRef.current) {
          typedRef.current.destroy();
          typedRef.current = null;
        }
      } catch (e) {}
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <motion.section
      id="about"
      variants={staggerContainer()}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.25 }}
      className="sm:px-16 px-6 pt-8 lg:pt-24 pb-8 max-w-7xl mx-auto scroll-mt-[80px] lg:scroll-mt-[96px] relative"
    >
      <span className="hash-span" aria-hidden="true" />

      {/* DESKTOP */}
      <div className="hidden lg:block">
        <motion.div className="flex justify-between items-start gap-8">
          <motion.div variants={fadeIn("right", "spring", 0.2, 1)} className="flex-1">
            <motion.h1
              variants={fadeIn("right", "tween", 0.3, 1)}
              className="flex items-center animate-pulse font-semibold -mt-20 mb-5 w-fit gap-2"
            >
              <span className="orange-text-gradient">{`Hi, ${greetText}`}</span>
              <span className="text-white">{greetEmoji}</span>
            </motion.h1>

            <motion.p variants={fadeIn("right", "spring", 0.4, 1)} className={styles.heroHeadText}>
              I’m{" "}
              <span className="inline-block bg-clip-text text-transparent bg-gradient-to-l from-[#eb3b91] to-[#6773de]">
                Kevin Andrews
              </span>
            </motion.p>

            <motion.p
              variants={fadeIn("right", "spring", 0.5, 1)}
              className={`${styles.heroSubText} inline-flex items-center text-white`}
            >
              Full stack Developer in&nbsp;
              <span style={{ position: "relative", display: "inline-block" }}>
                {/* pass explicit CSS gradients (wordGradients) so text is visible for every browser */}
                <FlipWords
                  words={skills}
                  duration={3850}
                  className="whitespace-nowrap inline-block text-2xl"
                  wordGradients={skillGradientsArray}
                />
              </span>
            </motion.p>

            <motion.div variants={fadeIn("right", "spring", 0.6, 1)}>
              <div className="mt-6 text-xl">
                <h1 className="text-white tracking-wide font-bold">
                  while (
                  <span
                    ref={codeElDesktopRef}
                    className="bg-gradient-to-r from-[#ec008c] to-[#ff2727] text-transparent bg-clip-text"
                  />
                  )&#123;
                  <br />
                  <span className="bg-gradient-to-l from-[#43c7fb] to-[#c438fb] text-transparent bg-clip-text">
                    tryAgain();
                  </span>
                  <br />
                  <span>
                    if(
                    <span className="bg-gradient-to-r from-[#ec008c] to-[#ff2727] text-transparent bg-clip-text">
                      dead
                    </span>
                    )&#123;
                  </span>
                  <br />
                  <span className="ml-5 bg-gradient-to-l from-[#43c7fb] to-[#c438fb] text-transparent bg-clip-text">
                    break;
                  </span>
                  <br />
                  &#125;
                  <br />
                  &#125;
                </h1>

                <div className="mt-6 flex items-center gap-4">
                  {/* ✅ Fixed Resume button for Desktop */}
                  <motion.div variants={fadeIn("right", "spring", 0.7, 1)}>
                    <RainbowButton
                      href={ResumePDF}
                      download="KevinAndrewsResume.pdf"
                      className="text-white font-semibold rounded-full hover:scale-105 transition-transform h-12 px-6 min-w-[180px]"
                      aria-label="Download Kevin Andrews resume"
                    >
                      Resume
                    </RainbowButton>
                  </motion.div>

                  <motion.div variants={fadeIn("right", "spring", 0.8, 1)}>
                    <StarBorder
                      as="a"
                      href="#contact"
                      variant="glassy"
                      innerBorder={true}
                      speed="8s"
                      size="md"
                      chevron={false}
                      className="h-12 px-6 min-w-[180px] flex items-center justify-center"
                      aria-label="Contact Kevin Andrews"
                      title="Contact Kevin Andrews"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-4 w-4"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="1.4"
                        aria-hidden
                      >
                        <path d="M2 7v10a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V7" strokeLinecap="round" strokeLinejoin="round" />
                        <path d="M22 7l-10 7L2 7" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                      <span>Contact Me</span>
                    </StarBorder>
                  </motion.div>
                </div>
              </div>
            </motion.div>
          </motion.div>

          <motion.div
            variants={fadeIn("left", "spring", 0.5, 1)}
            className="text-indigo-400 opacity-90 space-y-9  w-44 flex-shrink-0 self-start lg:self-center flex flex-col items-end"
          >
            {socialLinks.map((socialLink, idx) => (
              <motion.div key={idx} variants={fadeIn("left", "spring", 0.6 + idx * 0.1, 1)}>
                <IconContext.Provider value={{ className: "icon-class" }}>
                  <a title={socialLink.name} href={socialLink.link} target="_blank" rel="noopener noreferrer">
                    <socialLink.icon size={25} className="hover:-translate-y-1 hover:text-sky-500 duration-200 transition cursor-pointer" />
                  </a>
                </IconContext.Provider>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </div>

      {/* MOBILE */}
      <div className="lg:hidden">
        <motion.div className="flex flex-col items-center">
          <motion.div variants={fadeIn("right", "spring", 0.2, 1)} className="w-full max-w-md mx-auto px-4">
            <motion.h1 variants={fadeIn("right", "tween", 0.3, 1)} className="flex items-center animate-pulse font-semibold mt-2 mb-3 justify-center gap-2 text-sm">
              <span className="orange-text-gradient">{`Hi, ${greetText}`}</span>
              <span className="text-white">{greetEmoji}</span>
            </motion.h1>

            <motion.div variants={fadeIn("right", "spring", 0.4, 1)} className="text-center">
              <p className="text-white text-sm">I’m</p>
              <div className="mt-2 flex justify-center items-center gap-3 leading-tight">
                <span className="inline-block text-4xl sm:text-5xl font-extrabold bg-clip-text text-transparent bg-gradient-to-l from-[#eb3b91] to-[#6773de]" aria-hidden>
                  Kevin
                </span>
                <span className="inline-block text-4xl sm:text-5xl font-extrabold bg-clip-text text-transparent bg-gradient-to-l from-[#eb3b91] to-[#6773de]" aria-hidden>
                  Andrews
                </span>
              </div>
            </motion.div>

            <motion.p variants={fadeIn("right", "spring", 0.5, 1)} className="text-white text-center mt-3 text-sm">
              Full stack Developer in&nbsp;
              <span style={{ position: "relative", display: "inline-block" }}>
                <FlipWords
                  words={skills}
                  duration={3850}
                  className="whitespace-nowrap inline-block text-lg"
                  wordGradients={skillGradientsArray}
                />
              </span>
            </motion.p>

            <motion.div variants={fadeIn("right", "spring", 0.6, 1)}>
              <div className="mt-5 text-sm bg-transparent px-1">
                <h1 className="text-white tracking-wide font-bold text-sm leading-relaxed">
                  while (
                  <span
                    ref={codeElMobileRef}
                    className="bg-gradient-to-r from-[#ec008c] to-[#ff2727] text-transparent bg-clip-text"
                  />
                  )&#123;
                  <br />
                  <span className="bg-gradient-to-l from-[#43c7fb] to-[#c438fb] text-transparent bg-clip-text">
                    tryAgain();
                  </span>
                  <br />
                  <span>
                    if(
                    <span className="bg-gradient-to-r from-[#ec008c] to-[#ff2727] text-transparent bg-clip-text">
                      dead
                    </span>
                    )&#123;
                  </span>
                  <br />
                  <span className="ml-5 bg-gradient-to-l from-[#43c7fb] to-[#c438fb] text-transparent bg-clip-text">
                    break;
                  </span>
                  <br />
                  &#125;
                  <br />
                  &#125;
                </h1>
              </div>

              <div className="mt-6 flex flex-col gap-3 px-2">
                {/* ✅ Fixed Resume button for Mobile */}
                <motion.div variants={fadeIn("right", "spring", 0.7, 1)}>
                  <RainbowButton
                    href={ResumePDF}
                    download="Kevin_Andrews_Resume.pdf"
                    className="w-full text-center text-white font-semibold rounded-full hover:scale-105 transition-transform h-12 px-6"
                  >
                    Resume
                  </RainbowButton>
                </motion.div>

                <motion.div variants={fadeIn("right", "spring", 0.8, 1)}>
                  <StarBorder
                    as="a"
                    href="#contact"
                    variant="glassy"
                    innerBorder={true}
                    speed="8s"
                    size="md"
                    className="w-full h-12 px-6 flex items-center justify-center"
                    aria-label="Contact Kevin Andrews"
                    title="Contact Kevin Andrews"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4" aria-hidden>
                      <path d="M2 7v10a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V7" strokeLinecap="round" strokeLinejoin="round" />
                      <path d="M22 7l-10 7L2 7" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                    <span>Contact Me</span>
                  </StarBorder>
                </motion.div>
              </div>

              <div className="flex w-full justify-end gap-6 mt-6">
                <IconContext.Provider value={{ className: "icon-class" }}>
                  {socialLinks.map((socialLink, idx) => (
                    <a
                      key={`mobile-social-${idx}`}
                      title={socialLink.name}
                      href={socialLink.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="hover:-translate-y-1 transition-transform"
                    >
                      <socialLink.icon size={20} className="text-indigo-300" />
                    </a>
                  ))}
                </IconContext.Provider>
              </div>
            </motion.div>
          </motion.div>
        </motion.div>
      </div>
    </motion.section>
  );
};

export default About;
