// src/components/Menu.jsx
import React, { useState } from "react";
import { motion } from "framer-motion";
import { fadeIn } from "../utils/motion";
import {
  FiHome,
  FiTool,
  FiFolder,
  FiCode,
  FiMail,
  FiMenu,
  FiX,
} from "react-icons/fi";

// 1) StarWrapper now includes scroll-mt so scrollIntoView accounts for nav height
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
    { label: "Home",          icon: <FiHome size={20} /> },
    { label: "Skills",        icon: <FiTool size={20} /> },
    { label: "Projects",      icon: <FiFolder size={20} /> },
    { label: "Contributions", icon: <FiCode size={20} /> },
    { label: "Contact",       icon: <FiMail size={20} /> },
  ];

  const scrollToSection = (id) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  const handleClick = (label) => {
    setActive(label);
    if (label === "Home") {
      window.scrollTo({ top: 0, behavior: "smooth" });
    } else {
      scrollToSection(label.toLowerCase());
    }
    setIsOpen(false);
  };

  return (
    <motion.div variants={fadeIn("top", "spring", 0.5, 2)}>
      <div className="fixed top-0 left-0 w-full z-50 flex justify-center py-4">
        {/* Mobile toggle */}
        <button
          onClick={() => setIsOpen((o) => !o)}
          className="absolute left-6 lg:hidden z-50 text-gray-200 hover:text-gray-400"
        >
          {isOpen ? <FiX size={24} /> : <FiMenu size={24} />}
        </button>

        {/* Nav items */}
        <ul
          className={`
            bg-white bg-opacity-10 backdrop-blur-md
            border border-white/20 shadow-lg shadow-black/40
            rounded-full px-6 py-2
            flex flex-col lg:flex-row items-center
            space-y-4 lg:space-y-0 lg:space-x-8
            text-gray-100
            transition-transform duration-300
            relative z-40
            ${isOpen ? "translate-y-0" : "-translate-y-full"} lg:translate-y-0
          `}
        >
          {navItems.map(({ label, icon }) => {
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
                  className={`
                    flex items-center gap-2 px-3 py-1 rounded-full transition
                    ${
                      isActive
                        ? activeStyles[label]
                        : "hover:bg-white hover:bg-opacity-10"
                    }
                  `}
                >
                  {icon}
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
