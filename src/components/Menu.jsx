// src/components/Menu.jsx
import React, { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";
import { fadeIn } from "../utils/motion";

/**
 * StarWrapper: keeps the scroll-mt spacing and shared motion props.
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
  const [active, setActive] = useState("Home");
  const navRef = useRef(null);

  const navItems = [
    { label: "Home", id: "home" },
    { label: "Skills", id: "skills" },
    { label: "Projects", id: "projects" },
    { label: "Contributions", id: "contributions" },
    { label: "Contact", id: "contact" },
  ];

  const activeStyles = {
    Home: "text-white font-semibold",
    Skills: "text-white font-semibold",
    Projects: "text-white font-semibold",
    Contributions: "text-white font-semibold",
    Contact: "text-white font-semibold",
  };

  const indicatorStyles = {
    Home: "bg-indigo-600",
    Skills: "bg-purple-600",
    Projects: "bg-green-600",
    Contributions: "bg-pink-600",
    Contact: "bg-yellow-600",
  };

  const lampBg = {
    Home: "bg-indigo-500/10",
    Skills: "bg-purple-500/10",
    Projects: "bg-green-500/10",
    Contributions: "bg-pink-500/10",
    Contact: "bg-yellow-500/10",
  };

  // defensive small normalizer for class / attr strings (handles SVGAnimatedString etc.)
  const normStr = (val) => {
    if (!val && val !== 0) return "";
    if (typeof val === "string") return val.toLowerCase();
    if (val && typeof val === "object") {
      if (typeof val.baseVal === "string") return val.baseVal.toLowerCase();
      try {
        return String(val).toLowerCase();
      } catch (e) {
        return "";
      }
    }
    return String(val).toLowerCase();
  };

  // Lightweight section finder used only for active detection.
  const findSectionElement = (id) => {
    if (!id) return null;
    const needle = id.toLowerCase();

    const byId = document.getElementById(id);
    if (byId) return byId;

    const byAttr = document.querySelector(`[data-section="${id}"], [data-nav="${id}"], [aria-label="${id}"], [name="${id}"]`);
    if (byAttr) return byAttr;

    // prefer top-level semantic containers only
    const containers = Array.from(document.querySelectorAll("section, main, [role='region']"));
    for (const s of containers) {
      const idAttr = normStr(s.id);
      const dataSection = normStr(s.getAttribute && s.getAttribute("data-section"));
      const aria = normStr(s.getAttribute && s.getAttribute("aria-label"));
      const name = normStr(s.getAttribute && s.getAttribute("name"));
      const cls = normStr(s.className || (s.getAttribute && s.getAttribute("class")));
      if (idAttr === needle || dataSection === needle || aria === needle || name === needle) return s;
      if (
        (idAttr && idAttr.includes(needle)) ||
        (dataSection && dataSection.includes(needle)) ||
        (aria && aria.includes(needle)) ||
        (cls && cls.includes(needle))
      ) {
        return s;
      }
    }

    return null;
  };

  // Click handler: call centralized scroll function on window (provided by App)
  const handleClick = (label, id) => {
    setActive(label);
    try {
      if (typeof window !== "undefined" && typeof window.scrollToSection === "function") {
        window.scrollToSection(id);
      } else {
        // fallback: basic native behavior
        const el = findSectionElement(id);
        if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    } catch (e) {
      // fallback safe
      const el = findSectionElement(id);
      if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  // Active tracking: simple, robust scroll listener (no programmatic lock)
  useEffect(() => {
    const ids = navItems.map((i) => i.id || i.label.toLowerCase());

    const updateActive = () => {
      const navEl = navRef.current;
      const navHeight = navEl ? Math.round(navEl.getBoundingClientRect().height) : Number.parseInt(getComputedStyle(document.documentElement).getPropertyValue("--nav-height") || "80", 10);
      const scrollPos = window.scrollY + navHeight + 12;
      let current = "Home";
      for (let i = 0; i < ids.length; i++) {
        const id = ids[i];
        const el = findSectionElement(id);
        if (el) {
          const top = el.offsetTop || (el.getBoundingClientRect().top + window.pageYOffset);
          if (scrollPos >= top) current = navItems[i].label;
        }
      }
      setActive((prev) => (prev === current ? prev : current));
    };

    window.addEventListener("scroll", updateActive, { passive: true });
    window.addEventListener("resize", updateActive);
    updateActive();
    return () => {
      window.removeEventListener("scroll", updateActive);
      window.removeEventListener("resize", updateActive);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <motion.div variants={fadeIn("top", "spring", 0.5, 2)}>
      <div
        ref={navRef}
        // add site-nav so App can measure nav height centrally
        className="site-nav fixed bottom-0 sm:top-0 left-1/2 -translate-x-1/2 z-50 mb-6 sm:mb-0 sm:pt-6 pointer-events-auto"
      >
        <div className="flex items-center gap-3 bg-white/5 border border-white/10 backdrop-blur-lg py-1 px-2 rounded-full shadow-lg">
          {navItems.map((item) => {
            const isActive = active === item.label;
            const lightBg = lampBg[item.label];
            const topBarClass = indicatorStyles[item.label];

            return (
              <button
                key={item.label}
                type="button"
                onClick={() => handleClick(item.label, item.id)}
                onMouseDown={(e) => e.preventDefault()}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") {
                    e.preventDefault();
                    handleClick(item.label, item.id);
                  }
                }}
                aria-current={isActive ? "page" : undefined}
                className={`relative cursor-pointer text-sm font-semibold px-5 py-2 rounded-full transition-colors
                  ${isActive ? activeStyles[item.label] : "text-gray-100 hover:text-white/90"}
                  focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-indigo-500
                `}
              >
                <span className="hidden md:inline">{item.label}</span>
                <span className="md:hidden">{item.label.charAt(0)}</span>

                {isActive && (
                  <motion.div
                    layoutId="lamp"
                    initial={false}
                    transition={{ type: "spring", stiffness: 300, damping: 30 }}
                    // make decorative lamp non-interactive so it never blocks hover/clicks
                    className={`absolute inset-0 w-full rounded-full -z-10 ${lightBg} pointer-events-none`}
                    aria-hidden="true"
                    style={{ pointerEvents: "none" }}
                  >
                    <div
                      className={`absolute -top-2 left-1/2 -translate-x-1/2 w-8 h-1 rounded-full ${topBarClass} pointer-events-none`}
                      aria-hidden="true"
                    >
                      <div
                        className="absolute -top-2 -left-2 w-12 h-6 rounded-full blur-md opacity-30 pointer-events-none"
                        style={{ backgroundColor: "currentColor", pointerEvents: "none" }}
                        aria-hidden="true"
                      />
                      <div
                        className="absolute -top-1 left-0 w-8 h-6 rounded-full blur-md opacity-20 pointer-events-none"
                        style={{ backgroundColor: "currentColor", pointerEvents: "none" }}
                        aria-hidden="true"
                      />
                      <div
                        className="absolute top-0 left-2 w-4 h-4 rounded-full blur-sm opacity-20 pointer-events-none"
                        style={{ backgroundColor: "currentColor", pointerEvents: "none" }}
                        aria-hidden="true"
                      />
                    </div>
                  </motion.div>
                )}
              </button>
            );
          })}
        </div>
      </div>
    </motion.div>
  );
};

export default StarWrapper(Menu, "menu");
