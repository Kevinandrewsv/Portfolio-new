// src/App.jsx
import React, { useEffect, useState } from "react";
import InteractiveBackground from "./components/InteractiveBackground"; // <-- new
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

import "../src/buttonStyle.css";
import { styles } from "./style";
import { initLenis } from "./lib/lenis";

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

    // Initialize smoothscroll polyfill (optional) and Lenis (graceful if not installed)
    const setupScroll = async () => {
      // Polyfill native smooth scroll in older browsers if available
      try {
        const smoothscroll = await import("smoothscroll-polyfill");
        if (smoothscroll && smoothscroll.polyfill) smoothscroll.polyfill();
      } catch (e) {
        // polyfill not installed — ignore
      }

      // Initialize Lenis (if lenis is installed). initLenis is safe if lenis missing it will throw,
      // so we wrap it. If you didn't install lenis, this silently fails and native smooth scrolling remains.
      try {
        initLenis({ duration: 1.0, lerp: 0.075 });
      } catch (e) {
        // Lenis not available or initialization failed. fallback to native smooth scroll.
        // console.warn("Lenis init failed:", e);
      }
    };

    setupScroll();

    // Keep CSS var --nav-height updated to match measured header (.site-nav)
    const updateNavHeight = () => {
      const navEl = document.querySelector(".site-nav");
      const height = navEl ? Math.round(navEl.getBoundingClientRect().height) : 80;
      document.documentElement.style.setProperty("--nav-height", `${height}px`);
      // Also keep scroll-padding-top for fallback CSS-only anchors
      document.documentElement.style.setProperty("scroll-padding-top", `${height}px`);
    };

    updateNavHeight();

    // Recompute on resize and when fonts load (fonts can change layout)
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
      {/* make this relative so our absolute background sits inside */}
      <div className="bg-primary overflow-hidden relative">
        {/* interactive background — place it BEFORE content so it's behind */}
        <InteractiveBackground particleCount={28} />

        {/* make your content stack above background: set z-index if needed */}
        <div className="h-[100vh] relative overflow-visible"> {/* hero container is positioned */}
          <Menu />
          <About />

          {/* Scroll button placed inside the hero so it is positioned relative to this container */}
          <a
            href="#services"
            aria-label="Scroll to services"
            className="scroll-btn"
          />
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

        <h1 className={`${styles.heroSubText} text-center py-4`}>
          Made by Kevin Andrews
        </h1>
      </div>
    </>
  );
};

export default App;
