import React, { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";
import { fadeIn } from "../utils/motion";
import { FiMenu, FiX } from "react-icons/fi";

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

  const navItems = [
    { label: "Home" },
    { label: "Skills" },
    { label: "Projects" },
    { label: "Contributions" },
    { label: "Contact" },
  ];

  const activeStyles = {
    Home: "bg-indigo-500 bg-opacity-80 text-white font-semibold",
    Skills: "bg-purple-500 bg-opacity-80 text-white font-semibold",
    Projects: "bg-green-500 bg-opacity-80 text-white font-semibold",
    Contributions: "bg-pink-500 bg-opacity-80 text-white font-semibold",
    Contact: "bg-yellow-500 bg-opacity-80 text-white font-semibold",
  };

  const indicatorStyles = {
    Home: "bg-indigo-600",
    Skills: "bg-purple-600",
    Projects: "bg-green-600",
    Contributions: "bg-pink-600",
    Contact: "bg-yellow-600",
  };

  const scrollToSection = (id) => {
    const el = document.getElementById(id);
    if (!el) return;
    const navHeight = navRef.current
      ? Math.round(navRef.current.getBoundingClientRect().height)
      : 0;
    const extraGap = 8;
    const y = el.getBoundingClientRect().top + window.pageYOffset - navHeight - extraGap;
    if (isOpen) {
      setIsOpen(false);
      setTimeout(() => window.scrollTo({ top: y, behavior: "smooth" }), 120);
    } else {
      window.scrollTo({ top: y, behavior: "smooth" });
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

  // 🔹 Detect section in view and update active tab
  useEffect(() => {
    const sectionIds = navItems.map((item) => item.label.toLowerCase());
    const navHeight = navRef.current
      ? Math.round(navRef.current.getBoundingClientRect().height)
      : 0;

    const onScroll = () => {
      const scrollPos = window.scrollY + navHeight + 10; // small offset
      let current = "Home";

      for (let id of sectionIds) {
        const section = document.getElementById(id);
        if (section && scrollPos >= section.offsetTop) {
          current = section.id.charAt(0).toUpperCase() + section.id.slice(1);
        }
      }
      setActive(current);
    };

    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <motion.div variants={fadeIn("top", "spring", 0.5, 2)}>
      {/* Overlay */}
      <div
        aria-hidden
        className={`fixed inset-0 transition-all duration-300 pointer-events-none
          ${isOpen ? "backdrop-blur-xl bg-black/30 pointer-events-auto z-30" : "bg-transparent z-0"}
        `}
      />
      {/* Navbar */}
      <div
        className="fixed top-0 left-0 w-full z-40 flex justify-center py-4 site-nav"
        ref={navRef}
      >
        <button
          onClick={() => setIsOpen((o) => !o)}
          className="absolute left-6 lg:hidden z-50 text-gray-200 hover:text-gray-400"
        >
          {isOpen ? <FiX size={24} /> : <FiMenu size={24} />}
        </button>
        <ul
          className={`bg-opacity-10 backdrop-blur-md border border-white/10 shadow-lg shadow-black/40
            rounded-full px-6 py-2 flex flex-col lg:flex-row items-center
            space-y-4 lg:space-y-0 lg:space-x-8 text-gray-100
            transition-transform duration-300 relative z-50
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
                    className={`absolute -top-4 left-1/2 transform -translate-x-1/2 w-8 h-1.5 rounded-full ${indicatorStyles[label]} z-50`}
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
