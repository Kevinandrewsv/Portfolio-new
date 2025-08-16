// src/App.jsx
import React, { useEffect, useState } from "react";
import InteractiveBackground from "./components/InteractiveBackground";
import About from "./components/About";
import Works from "./components/Works";
import Menu from "./components/Menu";
import Services from "./components/Services";
import MySkills from "./components/MySkills";
import Contributions from "./components/Contributions";
import SplinePage from "./components/SplinePage";
import Contact from "./components/Contact";
import PreLoader from "./components/PreLoader";
import ScrollProgress from "./components/ScrollProgress";

import "./index.css"; // <-- load your full stylesheet (includes scroll-to-top styles)
import { styles } from "./style";
import { initLenis } from "./lib/lenis";

/**
 * Helper: robust element lookup for sections
 */
const findSectionElement = (id) => {
  if (!id) return null;
  let el = document.getElementById(id);
  if (el) return el;

  el = document.querySelector(
    `[data-section="${id}"], [data-nav="${id}"], [aria-label="${id}"], [name="${id}"]`
  );
  if (el) return el;

  // last resort: substring match
  const candidates = Array.from(
    document.querySelectorAll("section, main, [role='region'], [data-section], [data-nav]")
  );
  const needle = id.toLowerCase();

  for (const s of candidates) {
    const idAttr = (s.id || "").toLowerCase();
    const dataSection = (s.getAttribute("data-section") || "").toLowerCase();
    const aria = (s.getAttribute("aria-label") || "").toLowerCase();

    // 👇 FIX: ensure className is safely converted to a string
    const cls = typeof s.className === "string"
      ? s.className.toLowerCase()
      : (s.getAttribute("class") || "").toLowerCase();

    if (
      idAttr.includes(needle) ||
      dataSection.includes(needle) ||
      aria.includes(needle) ||
      cls.includes(needle)
    ) {
      return s;
    }
  }
  return null;
};

/**
 * Centralized scroll helper used by App-level anchors (prefers Lenis if present).
 * Keeps nav offset into account via CSS var --nav-height (set in App effect).
 */
const scrollToSection = (id, { duration = 1.0, extraGap = 8 } = {}) => {
  const prefersReduced =
    typeof window !== "undefined" &&
    window.matchMedia &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  const navHeightRaw =
    getComputedStyle(document.documentElement).getPropertyValue("--nav-height") || "";
  const navHeight = Number.parseInt(navHeightRaw, 10) || 80;

  if (!id) {
    const target = 0;
    try {
      if (window.lenis && typeof window.lenis.scrollTo === "function") {
        if (prefersReduced) window.scrollTo({ top: 0, behavior: "auto" });
        else window.lenis.scrollTo(target, { duration });
        return;
      }
    } catch (e) {}
    const behavior = prefersReduced ? "auto" : "smooth";
    window.scrollTo({ top: target, behavior });
    return;
  }

  const el = findSectionElement(id);
  if (!el) {
    scrollToSection(null);
    return;
  }

  const elTop = el.getBoundingClientRect().top + window.pageYOffset;
  const cs = getComputedStyle(el);
  const cssScrollMarginTop =
    Number.parseInt(
      cs && (cs.scrollMarginTop || cs.getPropertyValue("scroll-margin-top")) || 0,
      10
    ) || 0;

  const targetY = Math.max(
    Math.round(elTop - navHeight - extraGap - cssScrollMarginTop),
    0
  );

  try {
    if (window.lenis && typeof window.lenis.scrollTo === "function") {
      if (prefersReduced) window.scrollTo({ top: targetY, behavior: "auto" });
      else window.lenis.scrollTo(Math.round(targetY), { duration });
      return;
    }
  } catch (e) {}

  try {
    if (typeof el.scrollIntoView === "function") {
      el.scrollIntoView({
        behavior: prefersReduced ? "auto" : "smooth",
        block: "start",
      });

      if (!prefersReduced) {
        window.setTimeout(() => {
          window.scrollTo({ top: Math.round(targetY), behavior: "auto" });
        }, 420);
      } else {
        window.scrollTo({ top: Math.round(targetY), behavior: "auto" });
      }
      return;
    }
  } catch (err) {}

  const behavior = prefersReduced ? "auto" : "smooth";
  window.scrollTo({ top: Math.round(targetY), behavior });
};

const ScrollToTopButton = () => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.pageYOffset > 300);
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const scrollToTop = (opts = {}) => {
    const { duration = 1.0 } = opts;
    const prefersReduced =
      typeof window !== "undefined" &&
      window.matchMedia &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    try {
      if (window.lenis && typeof window.lenis.scrollTo === "function") {
        if (prefersReduced) {
          window.scrollTo({ top: 0, behavior: "auto" });
        } else {
          window.lenis.scrollTo(0, { duration });
        }
        return;
      }
    } catch (e) {}

    const behavior = prefersReduced ? "auto" : "smooth";
    window.scrollTo({ top: 0, behavior });
  };

  const onKeyDown = (e) => {
    if (e.key === "Enter" || e.key === " " || e.key === "Spacebar") {
      e.preventDefault();
      scrollToTop();
    }
  };

  return (
    <button
      aria-label="Scroll to top"
      title="Back to top"
      className={`scroll-to-top fixed right-6 bottom-6 z-50 transform transition-transform duration-200 ease-out focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-indigo-500
        ${visible ? "scale-100 opacity-100" : "scale-0 opacity-0 pointer-events-none"}
        md:right-8 md:bottom-8`}
      onClick={() => scrollToTop()}
      onKeyDown={onKeyDown}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="h-5 w-5"
        viewBox="0 0 20 20"
        fill="currentColor"
        aria-hidden="true"
      >
        <path d="M10 6.293L4.146 12.147a.5.5 0 10.708.707L10 7.707l5.146 5.147a.5.5 0 00.708-.707L10 6.293z" />
      </svg>
    </button>
  );
};

const App = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 2000);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    let mounted = true;

    const setupScroll = async () => {
      try {
        const smoothscroll = await import("smoothscroll-polyfill");
        if (smoothscroll && smoothscroll.polyfill) smoothscroll.polyfill();
      } catch (e) {}

      try {
        initLenis({ duration: 1.0, lerp: 0.075 });
      } catch (e) {}
    };

    setupScroll();

    const updateNavHeight = () => {
      const navEl = document.querySelector(".site-nav");
      const height = navEl ? Math.round(navEl.getBoundingClientRect().height) : 80;
      document.documentElement.style.setProperty("--nav-height", `${height}px`);
      document.documentElement.style.setProperty("scroll-padding-top", `${height}px`);
    };

    updateNavHeight();

    try {
      window.scrollToSection = scrollToSection;
    } catch (e) {}

    window.addEventListener("resize", updateNavHeight);
    if (document.fonts && document.fonts.ready) {
      document.fonts.ready.then(() => {
        if (mounted) updateNavHeight();
      });
    }

    return () => {
      mounted = false;
      window.removeEventListener("resize", updateNavHeight);
      try {
        if (window.scrollToSection === scrollToSection) {
          delete window.scrollToSection;
        }
      } catch (e) {}
    };
  }, []);

  if (loading) return <PreLoader />;

  return (
    <>
      <ScrollProgress />
      <div className="bg-primary overflow-hidden relative">
        <InteractiveBackground particleCount={28} />

        <div className="h-[100vh] relative overflow-visible">
          <Menu />
          <About />
          <button 
            type="button"
            aria-label="Scroll to services"
            className="scroll-btn"
            onClick={() => scrollToSection("services")}
          />
        </div>

        <div className="pt-10">
          <Services />
          <MySkills />
        </div>

        <SplinePage />
        <Works />
        <section id="contributions" className="pt-16">
          <Contributions />
        </section>
        <Contact />

        <h1 className={`${styles.heroSubText} text-center py-4`}>
          Made by Kevin Andrews
        </h1>

        <ScrollToTopButton />
      </div>
    </>
  );
};

export default App;
