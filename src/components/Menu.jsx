// src/components/Menu.jsx
import React, { useState, useRef } from "react";
import { motion } from "framer-motion";
import { fadeIn } from "../utils/motion";
import { FiMenu, FiX } from "react-icons/fi";

/**
 * StarWrapper HOC (keeps your scroll-mt adjustments)
 */
const StarWrapper = (Component, idName) =>
  function HOC() {
    return (
      <motion.section
        id={idName}
        variants={fadeIn("top", "spring", 0.5, 2)}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.25 }}
        className="
          sm:px-16 px-6
          pt-20 lg:pt-24 pb-8
          max-w-7xl mx-auto
          scroll-mt-[80px] lg:scroll-mt-[96px]
        "
      >
        <Component />
      </motion.section>
    );
  };

const Menu = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [active, setActive] = useState("Home");
  const navRef = useRef(null);

  const activeStyles = {
    Home:          "bg-indigo-500 bg-opacity-80 text-white font-semibold",
    Skills:        "bg-purple-500 bg-opacity-80 text-white font-semibold",
    Projects:      "bg-green-500 bg-opacity-80 text-white font-semibold",
    Contributions: "bg-pink-500 bg-opacity-80 text-white font-semibold",
    Contact:       "bg-yellow-500 bg-opacity-80 text-white font-semibold",
  };

  const indicatorStyles = {
    Home:          "bg-indigo-600",
    Skills:        "bg-purple-600",
    Projects:      "bg-green-600",
    Contributions: "bg-pink-600",
    Contact:       "bg-yellow-600",
  };

  const navItems = [
    { label: "Home" },
    { label: "Skills" },
    { label: "Projects" },
    { label: "Contributions" },
    { label: "Contact" },
  ];

  // compute and perform scroll while accounting for the fixed nav height
  const scrollToSection = (id) => {
    const el = document.getElementById(id);
    if (!el) return;

    const doScroll = () => {
      const elTop = el.getBoundingClientRect().top + window.pageYOffset;
      const navEl = document.querySelector(".site-nav");
      const navHeight = navEl ? Math.round(navEl.getBoundingClientRect().height) : 0;
      const extraGap = 8; // small gap below the nav
      const targetY = Math.max(elTop - navHeight - extraGap, 0);
      window.scrollTo({ top: targetY, behavior: "smooth" });
    };

    if (isOpen) {
      setIsOpen(false);
      setTimeout(doScroll, 120);
    } else {
      doScroll();
    }
  };

  const handleClick = (label) => {
    setActive(label);

    if (label === "Home") {
      if (isOpen) {
        setIsOpen(false);
        setTimeout(() => window.scrollTo({ top: 0, behavior: "smooth" }), 120);
      } else {
        window.scrollTo({ top: 0, behavior: "smooth" });
      }
    } else {
      scrollToSection(label.toLowerCase());
    }
  };

  return (
    <motion.div variants={fadeIn("top", "spring", 0.5, 2)}>
      {/* Full-screen blur overlay only when menu is open */}
      <div
        aria-hidden
        className={`fixed inset-0 transition-all duration-300 pointer-events-none
          ${isOpen ? "backdrop-blur-xl bg-black/30 pointer-events-auto z-30" : "bg-transparent z-0"}
        `}
      />

      {/* Navigation */}
      <div
        className="fixed top-0 left-0 w-full z-40 flex justify-center py-4 site-nav"
        ref={navRef}
      >
        {/* Mobile toggle */}
        <button
          onClick={() => setIsOpen((o) => !o)}
          aria-expanded={isOpen}
          aria-label={isOpen ? "Close menu" : "Open menu"}
          className="absolute left-6 lg:hidden z-50 text-gray-200 hover:text-gray-400"
        >
          {isOpen ? <FiX size={24} /> : <FiMenu size={24} />}
        </button>

        {/* Nav items */}
        <ul
          className={`
            bg-opacity-10 backdrop-blur-md
            border border-white/10 shadow-lg shadow-black/40
            rounded-full px-6 py-2
            flex flex-col lg:flex-row items-center
            space-y-4 lg:space-y-0 lg:space-x-8
            text-gray-100
            transition-transform duration-300
            relative z-50
            ${isOpen ? "translate-y-0" : "-translate-y-full"} lg:translate-y-0
          `}
        >
          {navItems.map(({ label }) => {
            const isActive = active === label;
            return (
              <li
                key={label}
                className="relative cursor-pointer"
                onClick={() => handleClick(label)}
              >
                {isActive && (
                  <span
                    className={`
                      absolute -top-4 left-1/2 transform -translate-x-1/2
                      w-8 h-1.5 rounded-full ${indicatorStyles[label]} z-50
                    `}
                  />
                )}
                <div
                  className={`flex items-center gap-2 px-3 py-1 rounded-full transition
                    ${isActive ? activeStyles[label] : "hover:bg-white hover:bg-opacity-10"}
                  `}
                >
                  <span>{label}</span>
                </div>
              </li>
            );
          })}
        </ul>
      </div>
    </motion.div>
  );
};

export default StarWrapper(Menu, "menu");
