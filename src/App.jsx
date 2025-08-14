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

    // Respect users who prefer reduced motion
    const prefersReduced =
      typeof window !== "undefined" &&
      window.matchMedia &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    // If Lenis exists, prefer its API for consistent smoothness
    try {
      if (window.lenis && typeof window.lenis.scrollTo === "function") {
        if (prefersReduced) {
          // Reduced-motion users: use instant native jump
          window.scrollTo({ top: 0, behavior: "auto" });
        } else {
          // Lenis typically expects duration in seconds
          window.lenis.scrollTo(0, { duration });
        }
        return;
      }
    } catch (e) {
      // fallback to native behavior below
    }

    // Native fallback: smooth unless user prefers reduced motion
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
      {/* Up chevron */}
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

  // Preloader simulation
  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 2000);
    return () => clearTimeout(timer);
  }, []);

  // Initialize Lenis & smoothscroll polyfill, and keep CSS --nav-height in sync
  useEffect(() => {
    let mounted = true;

    const setupScroll = async () => {
      try {
        const smoothscroll = await import("smoothscroll-polyfill");
        if (smoothscroll && smoothscroll.polyfill) smoothscroll.polyfill();
      } catch (e) {
        // ignore
      }

      try {
        initLenis({ duration: 1.0, lerp: 0.075 });
      } catch (e) {
        // ignore
      }
    };

    setupScroll();

    const updateNavHeight = () => {
      const navEl = document.querySelector(".site-nav");
      const height = navEl ? Math.round(navEl.getBoundingClientRect().height) : 80;
      document.documentElement.style.setProperty("--nav-height", `${height}px`);
      document.documentElement.style.setProperty("scroll-padding-top", `${height}px`);
    };

    updateNavHeight();

    window.addEventListener("resize", updateNavHeight);
    if (document.fonts && document.fonts.ready) {
      document.fonts.ready.then(() => {
        if (mounted) updateNavHeight();
      });
    }

    return () => {
      mounted = false;
      window.removeEventListener("resize", updateNavHeight);
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
          <a href="#services" aria-label="Scroll to services" className="scroll-btn" />
        </div>

        <div className="pt-10">
          <Services />
          <MySkills />
        </div>

        <SplinePage />
        <Works />
        <section className="pt-16">
          <Contributions />
        </section>
        <Contact />

        <h1 className={`${styles.heroSubText} text-center py-4`}>Made by Kevin Andrews</h1>

        {/* Scroll to top button */}
        <ScrollToTopButton />
      </div>
    </>
  );
};

export default App;
