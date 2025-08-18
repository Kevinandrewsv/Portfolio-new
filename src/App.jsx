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
import Footer from "./components/Footer"; 

import "./index.css"; 
import { initLenis } from "./lib/lenis";

/* 🔎 robust section finder */
const findSectionElement = (id) => {
  if (!id) return null;
  let el = document.getElementById(id);
  if (el) return el;

  el = document.querySelector(
    `[data-section="${id}"], [data-nav="${id}"], [aria-label="${id}"], [name="${id}"]`
  );
  if (el) return el;

  const candidates = Array.from(
    document.querySelectorAll("section, main, [role='region'], [data-section], [data-nav]")
  );
  const needle = id.toLowerCase();

  for (const s of candidates) {
    const idAttr = (s.id || "").toLowerCase();
    const dataSection = (s.getAttribute("data-section") || "").toLowerCase();
    const aria = (s.getAttribute("aria-label") || "").toLowerCase();
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

/* 🔎 universal scroll helper */
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
    if (window.lenis?.scrollTo && !prefersReduced) {
      window.lenis.scrollTo(target, { duration });
      return;
    }
    window.scrollTo({ top: target, behavior: prefersReduced ? "auto" : "smooth" });
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
    Number.parseInt(cs.scrollMarginTop || cs.getPropertyValue("scroll-margin-top") || 0, 10) || 0;

  const targetY = Math.max(Math.round(elTop - navHeight - extraGap - cssScrollMarginTop), 0);

  if (window.lenis?.scrollTo && !prefersReduced) {
    window.lenis.scrollTo(Math.round(targetY), { duration });
    return;
  }

  el.scrollIntoView({
    behavior: prefersReduced ? "auto" : "smooth",
    block: "start",
  });

  if (!prefersReduced) {
    setTimeout(() => {
      window.scrollTo({ top: Math.round(targetY), behavior: "auto" });
    }, 420);
  }
};

/* 🔴 ScrollToTop Button (red theme) */
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
      window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;

    if (window.lenis?.scrollTo && !prefersReduced) {
      window.lenis.scrollTo(0, { duration });
      return;
    }
    window.scrollTo({ top: 0, behavior: prefersReduced ? "auto" : "smooth" });
  };

  const onKeyDown = (e) => {
    if (["Enter", " ", "Spacebar"].includes(e.key)) {
      e.preventDefault();
      scrollToTop();
    }
  };

  return (
    <button
      aria-label="Scroll to top"
      title="Back to top"
      className={`fixed right-6 bottom-6 z-50 flex items-center justify-center rounded-full bg-red-600 text-white shadow-lg transition-all duration-300 ease-out focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-red-500 hover:bg-red-700 active:scale-90
        ${visible ? "scale-100 opacity-100" : "scale-0 opacity-0 pointer-events-none"}
        md:right-8 md:bottom-8`}
      onClick={() => scrollToTop()}
      onKeyDown={onKeyDown}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="h-6 w-6"
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
    (async () => {
      try {
        const smoothscroll = await import("smoothscroll-polyfill");
        smoothscroll?.polyfill?.();
      } catch {}
      try {
        initLenis({ duration: 1.0, lerp: 0.075 });
      } catch {}
    })();

    const updateNavHeight = () => {
      const navEl = document.querySelector(".site-nav");
      const height = navEl ? Math.round(navEl.getBoundingClientRect().height) : 80;
      document.documentElement.style.setProperty("--nav-height", `${height}px`);
      document.documentElement.style.setProperty("scroll-padding-top", `${height}px`);
    };
    updateNavHeight();

    window.scrollToSection = scrollToSection;
    window.addEventListener("resize", updateNavHeight);

    if (document.fonts?.ready) {
      document.fonts.ready.then(() => mounted && updateNavHeight());
    }

    return () => {
      mounted = false;
      window.removeEventListener("resize", updateNavHeight);
      if (window.scrollToSection === scrollToSection) delete window.scrollToSection;
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
        <section id="contributions" className="pt-20">
          <Contributions />
        </section>
        <Contact />

        <Footer />
        <ScrollToTopButton />
      </div>
    </>
  );
};

export default App;
