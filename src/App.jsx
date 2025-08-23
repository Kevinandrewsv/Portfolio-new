// src/App.jsx
import React, { useEffect, useState, lazy, Suspense } from "react";
import About from "./components/About";
import Works from "./components/Works";
import Menu from "./components/Menu";
import Services from "./components/Services";
import MySkills from "./components/MySkills";
import Contributions from "./components/Contributions";
import Contact from "./components/Contact";
import PreLoader from "./components/PreLoader";
import ScrollProgress from "./components/ScrollProgress";
import Footer from "./components/Footer";

import "./index.css";
import { initLenis } from "./lib/lenis";

/**
 * Performance-minded App.jsx
 * - Lazy-loads heavy components (SplinePage, InteractiveBackground)
 * - Detects low-end devices / prefers-reduced-motion and disables heavy work
 * - Guards initLenis and other expensive inits
 * - Provides simple fallbacks shown while lazy components load
 */

/* -------------------------
   Lazy (heavy) components
   ------------------------- */
const SplinePage = lazy(() => import("./components/SplinePage"));
const InteractiveBackground = lazy(() => import("./components/InteractiveBackground"));

/* -------------------------
   Helpers
   ------------------------- */
const isReducedMotion = () =>
  typeof window !== "undefined" &&
  window.matchMedia &&
  window.matchMedia("(prefers-reduced-motion: reduce)").matches;

const isLowEndDevice = () => {
  if (typeof navigator === "undefined") return false;
  // heuristics: low device memory or few cores OR small viewport -> treat as low-end
  const mem = navigator.deviceMemory || 4;
  const cores = navigator.hardwareConcurrency || 4;
  const smallScreen = typeof window !== "undefined" && window.innerWidth <= 768;
  // conservative threshold: <2GB or <=2 cores (phones and older devices)
  return mem < 2 || cores <= 2 || smallScreen;
};

/* 🔎 robust section finder (unchanged logic, safer guards) */
const findSectionElement = (id) => {
  if (!id || typeof document === "undefined") return null;
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
    const cls =
      typeof s.className === "string"
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

/* -------------------------
   universal scroll helper
   ------------------------- */
const scrollToSection = (id, { duration = 1.0, extraGap = 8 } = {}) => {
  if (typeof window === "undefined") return;
  const prefersReduced = isReducedMotion();

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

/* -------------------------
   ScrollToTop Button
   ------------------------- */
const ScrollToTopButton = () => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const onScroll = () => setVisible(window.pageYOffset > 300);
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const scrollToTop = (opts = {}) => {
    const { duration = 1.0 } = opts;
    const prefersReduced = isReducedMotion();

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

/* -------------------------
   App Component
   ------------------------- */
const App = () => {
  const [loading, setLoading] = useState(true);
  // runtime flags
  const [reducedPerf, setReducedPerf] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 1200); // shorter preloader for perceived speed
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    let mounted = true;

    // decide if we should reduce heavy work on this device
    const low = isLowEndDevice() || isReducedMotion();
    if (mounted) setReducedPerf(low);

    (async () => {
      // load smoothscroll polyfill always (lightweight) so older browsers are fine
      try {
        const smoothscroll = await import("smoothscroll-polyfill");
        smoothscroll?.polyfill?.();
      } catch (e) {
        // ignore
      }

      // only init Lenis when device is not low-end and user didn't request reduced motion
      try {
        if (!low) {
          initLenis({ duration: 1.0, lerp: 0.075 });
        } else {
          // Ensure window.lenis is undefined for safety on low devices
          if (window.lenis) delete window.lenis;
        }
      } catch (e) {
        // fail silently; prefer app to remain usable
      }
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

  // particle count: lower on reducedPerf devices
  const particleCount = reducedPerf ? 8 : 28;

  return (
    <>
      <ScrollProgress />
      <div className="bg-primary overflow-hidden relative">
        {/* InteractiveBackground is lazy-loaded and receives a reduced particleCount on low-end devices */}
        <Suspense fallback={<div aria-hidden="true" className="pointer-events-none"> </div>}>
          <InteractiveBackground particleCount={particleCount} />
        </Suspense>

        {/* HERO / HOME */}
        <div id="home" className="h-[100vh] relative overflow-visible">
          <Menu />
          <About />
          <button
            type="button"
            aria-label="Scroll to services"
            className="scroll-btn"
            onClick={() => scrollToSection("services")}
          />
        </div>

        {/* SERVICES + SKILLS */}
        <div className="pt-10">
          <section id="services" aria-label="Services">
            <Services />
          </section>

          <section id="skills" aria-label="Skills">
            <MySkills />
          </section>
        </div>

        {/* SplinePage is lazy-loaded. On reducedPerf devices SplinePage itself should internally render a simplified fallback.
            If you want, add logic inside components/SplinePage to early-return a static image when it detects reducedPerf (via a prop or global flag). */}
        <Suspense
          fallback={
            <div aria-hidden="true" className="w-full h-[320px] flex items-center justify-center">
              {/* lightweight placeholder */}
              <div className="text-sm opacity-70">3D content loading…</div>
            </div>
          }
        >
          <SplinePage />
        </Suspense>

        <section id="projects" aria-label="Projects">
          <Works />
        </section>

        <section id="contributions" className="pt-20" aria-label="Contributions">
          <Contributions />
        </section>

        <section id="contact" aria-label="Contact">
          <Contact />
        </section>

        <Footer />
        <ScrollToTopButton />
      </div>
    </>
  );
};

export default App;
