// src/components/About.jsx
import React, { useEffect, useState, useRef } from "react";
import { styles } from "../style";
import moment from "moment/moment";
import { socialLinks } from "../constant";
import { motion, AnimatePresence } from "framer-motion";
import { IconContext } from "react-icons";
import { fadeIn, staggerContainer } from "../utils/motion";
import Typed from "typed.js";
import { RainbowButton } from "./RainbowButton";
import { StarBorder } from "./star-border";

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

  const skillGradients = {
    JavaScript: "bg-gradient-to-r from-yellow-400 to-yellow-600",
    "React.js": "bg-gradient-to-r from-blue-400 to-blue-600",
    "Next.js": "bg-gradient-to-r from-gray-200 to-gray-400",
    "Node.js": "bg-gradient-to-r from-green-400 to-green-600",
    "Express.js": "bg-gradient-to-r from-purple-400 to-purple-600",
    "Nest.js": "bg-gradient-to-r from-red-400 to-red-600",
    MongoDB: "bg-gradient-to-r from-green-600 to-green-800",
    MySQL: "bg-gradient-to-r from-blue-600 to-blue-800",
    PostgreSQL: "bg-gradient-to-r from-indigo-600 to-indigo-800",
    AWS: "bg-gradient-to-r from-orange-400 to-orange-600",
  };

  const [skillIdx, setSkillIdx] = useState(0);

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
      if (style.display === "none" || style.visibility === "hidden" || style.opacity === "0") return false;
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

  useEffect(() => {
    const iv = setInterval(() => {
      setSkillIdx((i) => (i + 1) % skills.length);
    }, 2850);
    return () => clearInterval(iv);
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

            <motion.p variants={fadeIn("right", "spring", 0.5, 1)} className={`${styles.heroSubText} inline-flex items-center text-white`}>
              Full stack Developer in&nbsp;
              <span style={{ position: "relative", display: "inline-block" }}>
                <AnimatePresence initial={false} mode="wait">
                  <motion.span
                    key={skillIdx}
                    variants={{
                      initial: { y: 10, opacity: 0, filter: "blur(6px)" },
                      animate: { y: 0, opacity: 1, filter: "blur(0px)" },
                      exit: { y: -10, opacity: 0, filter: "blur(6px)" },
                    }}
                    initial="initial"
                    animate="animate"
                    exit="exit"
                    transition={{ duration: 0.35, ease: "easeInOut" }}
                    className={`whitespace-nowrap inline-block bg-clip-text text-transparent ${skillGradients[skills[skillIdx]]}`}
                  >
                    {skills[skillIdx]}
                  </motion.span>
                </AnimatePresence>
              </span>
            </motion.p>

            <motion.div variants={fadeIn("right", "spring", 0.6, 1)}>
              <div className="mt-6 text-xl">
                <h1 className="text-white tracking-wide font-bold">
                  while (
                  <span ref={codeElDesktopRef} className="bg-gradient-to-r from-[#ec008c] to-[#ff2727] text-transparent bg-clip-text" />
                  )&#123;
                  <br />
                  <span className="bg-gradient-to-l from-[#43c7fb] to-[#c438fb] text-transparent bg-clip-text">tryAgain();</span>
                  <br />
                  <span>
                    if(
                    <span className="bg-gradient-to-r from-[#ec008c] to-[#ff2727] text-transparent bg-clip-text">dead</span>
                    )&#123;
                  </span>
                  <br />
                  <span className="ml-5 bg-gradient-to-l from-[#43c7fb] to-[#c438fb] text-transparent bg-clip-text">break;</span>
                  <br />
                  &#125;
                  <br />
                  &#125;
                </h1>

                <div className="mt-6 flex items-center gap-4">
                  <motion.div variants={fadeIn("right", "spring", 0.7, 1)}>
                    <RainbowButton
                      href="./constant/Kevin_Andrews_Resume.pdf"
                      download
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
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4" aria-hidden>
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
                  <a
                    title={socialLink.name}
                    href={socialLink.link}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <socialLink.icon
                      size={25}
                      className="hover:-translate-y-1 hover:text-sky-500 duration-200 transition cursor-pointer"
                    />
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
                <span className="inline-block text-4xl sm:text-5xl font-extrabold bg-clip-text text-transparent bg-gradient-to-l from-[#eb3b91] to-[#6773de]" aria-hidden>Kevin</span>
                <span className="inline-block text-4xl sm:text-5xl font-extrabold bg-clip-text text-transparent bg-gradient-to-l from-[#eb3b91] to-[#6773de]" aria-hidden>Andrews</span>
              </div>
            </motion.div>

            <motion.p variants={fadeIn("right", "spring", 0.5, 1)} className="text-white text-center mt-3 text-sm">
              Full stack Developer in&nbsp;
              <span style={{ position: "relative", display: "inline-block" }}>
                <AnimatePresence initial={false} mode="wait">
                  <motion.span
                    key={skillIdx}
                    variants={{
                      initial: { y: 8, opacity: 0, filter: "blur(6px)" },
                      animate: { y: 0, opacity: 1, filter: "blur(0px)" },
                      exit: { y: -8, opacity: 0, filter: "blur(6px)" },
                    }}
                    initial="initial"
                    animate="animate"
                    exit="exit"
                    transition={{ duration: 0.33, ease: "easeInOut" }}
                    className={`whitespace-nowrap inline-block bg-clip-text text-transparent text-sm ${skillGradients[skills[skillIdx]]}`}
                  >
                    {skills[skillIdx]}
                  </motion.span>
                </AnimatePresence>
              </span>
            </motion.p>

            <motion.div variants={fadeIn("right", "spring", 0.6, 1)}>
              <div className="mt-5 text-sm bg-transparent px-1">
                <h1 className="text-white tracking-wide font-bold text-sm leading-relaxed">
                  while (
                  <span ref={codeElMobileRef} className="bg-gradient-to-r from-[#ec008c] to-[#ff2727] text-transparent bg-clip-text" />
                  )&#123;
                  <br />
                  <span className="bg-gradient-to-l from-[#43c7fb] to-[#c438fb] text-transparent bg-clip-text">tryAgain();</span>
                  <br />
                  <span>if(<span className="bg-gradient-to-r from-[#ec008c] to-[#ff2727] text-transparent bg-clip-text">dead</span>)&#123;</span>
                  <br />
                  <span className="ml-5 bg-gradient-to-l from-[#43c7fb] to-[#c438fb] text-transparent bg-clip-text">break;</span>
                  <br />
                  &#125;
                  <br />
                  &#125;
                </h1>
              </div>

              <div className="mt-6 flex flex-col gap-3 px-2">
                <motion.div variants={fadeIn("right", "spring", 0.7, 1)}>
                  <RainbowButton
                    href="/Kevin_Andrews_Resume.pdf"
                    download
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
                    <a key={`mobile-social-${idx}`} title={socialLink.name} href={socialLink.link} target="_blank" rel="noopener noreferrer" className="hover:-translate-y-1 transition-transform">
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
