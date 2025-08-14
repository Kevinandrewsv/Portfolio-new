// src/components/About.jsx
import React, { useEffect, useState, useRef } from "react";
import { styles } from "../style";
import moment from "moment/moment";
import { socialLinks } from "../constant";
import { motion, AnimatePresence } from "framer-motion";
import { IconContext } from "react-icons";
import { fadeIn, staggerContainer } from "../utils/motion";
import Typed from "typed.js";

const About = () => {
  const [greetings, setGreetings] = useState("");
  const currentHour = moment().hour();
  const codeEl = useRef(null);

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

  useEffect(() => {
    const typed = new Typed(codeEl.current, {
      strings: ["success != true", "error != false", "!motivated"],
      typeSpeed: 110,
      backSpeed: 80,
      backDelay: 2300,
      loop: true,
      showCursor: false,
    });
    return () => typed.destroy();
  }, []);

  useEffect(() => {
    const iv = setInterval(() => {
      setSkillIdx((i) => (i + 1) % skills.length);
    }, 2850);
    return () => clearInterval(iv);
  }, []);

  const name = "Kevin Andrews".split("");
  const letterVariant = {
    rest: { y: 0, scale: 1, rotate: 0 },
    hover: {
      y: -8,
      scale: 1.25,
      rotate: 10,
      transition: { type: "spring", stiffness: 500, damping: 30 },
    },
  };

  return (
    <motion.section
      id="about"
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
      <span className="hash-span" id="about" aria-hidden="true" />

      <motion.div className="flex justify-between">
        <motion.div variants={fadeIn("right", "spring", 0.2, 1)}>
          {/* Greeting */}
          <motion.h1
            variants={fadeIn("right", "tween", 0.3, 1)}
            className="flex items-center animate-pulse font-semibold -mt-20 mb-5 w-fit gap-2"
          >
            <span className="orange-text-gradient">{`Hi, ${greetText}`}</span>
            <span className="text-white">{greetEmoji}</span>
          </motion.h1>

          {/* Name with gradient + hover */}
          <motion.p
            variants={fadeIn("right", "spring", 0.4, 1)}
            className={styles.heroHeadText}
          >
            I’m{" "}
            {name.map((char, idx) => (
              <motion.span
                key={idx}
                variants={letterVariant}
                initial="rest"
                whileHover="hover"
                animate="rest"
                className="inline-block bg-clip-text text-transparent bg-gradient-to-l from-[#eb3b91] to-[#6773de]"
              >
                {char}
              </motion.span>
            ))}
          </motion.p>

          {/* Hero sub-text */}
          <motion.p
            variants={fadeIn("right", "spring", 0.5, 1)}
            className={`${styles.heroSubText} inline-flex items-center text-white`}
          >
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
                  className={
                    `whitespace-nowrap inline-block bg-clip-text text-transparent ` +
                    skillGradients[skills[skillIdx]]
                  }
                >
                  {skills[skillIdx]}
                </motion.span>
              </AnimatePresence>
            </span>
          </motion.p>

          {/* Code block animation */}
          <motion.div variants={fadeIn("right", "spring", 0.6, 1)}>
            <div className="mt-6 text-xl">
              <h1 className="text-white tracking-wide font-bold">
                while (
                <span
                  ref={codeEl}
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

              {/* Buttons */}
              <div className="mt-6 flex gap-4">
                <motion.a
                  variants={fadeIn("right", "spring", 0.7, 1)}
                  href="/Kevin_Andrews_Resume.pdf"
                  download
                  className="px-6 py-2 bg-gradient-to-r from-[#eb3b91] to-[#6773de] text-white font-semibold rounded-full hover:scale-105 transition-transform"
                >
                  Download CV
                </motion.a>
                <motion.a
                  variants={fadeIn("right", "spring", 0.8, 1)}
                  href="#contact"
                  className="px-6 py-2 border-2 border-indigo-500 text-indigo-400 font-semibold rounded-full hover:bg-indigo-500 hover:text-white transition duration-200"
                >
                  Contact Me
                </motion.a>
              </div>
            </div>
          </motion.div>
        </motion.div>

        {/* Social icons */}
        <motion.div
          variants={fadeIn("left", "spring", 0.5, 1)}
          className="text-indigo-400 opacity-90 space-y-9 mt-8"
        >
          {socialLinks.map((socialLink, idx) => (
            <motion.div
              key={idx}
              variants={fadeIn("left", "spring", 0.6 + idx * 0.1, 1)}
            >
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
    </motion.section>
  );
};

export default About;
