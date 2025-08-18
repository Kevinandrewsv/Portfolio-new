"use client";
import React, { useEffect, useRef, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { cn } from "@/lib/utils";
import { FiGithub, FiLinkedin, FiTwitter } from "react-icons/fi";

/**
 * src/components/Footer.jsx
 * - UI/design unchanged
 * - Navigation behavior: robust section-finder + smooth scroll with header offset fallback
 */

export default function Footer() {
  const reduce = useReducedMotion();
  const navRef = useRef(null);
  const [active, setActive] = useState("Home");

  const navItems = [
    { label: "Home", id: "home" },
    { label: "Projects", id: "projects" },
    { label: "Skills", id: "skills" },
    { label: "Contact", id: "contact" },
  ];

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

  // Find a section element by id or common attributes (same logic as your Menu)
  const findSectionElement = (id) => {
    if (!id) return null;
    const needle = id.toLowerCase();

    const byId = document.getElementById(id);
    if (byId) return byId;

    const byAttr = document.querySelector(
      `[data-section="${id}"], [data-nav="${id}"], [aria-label="${id}"], [name="${id}"]`
    );
    if (byAttr) return byAttr;

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

  // Try to read a nav/header height (from CSS var or fallback)
  const readNavHeight = () => {
    try {
      const cssVar = getComputedStyle(document.documentElement).getPropertyValue("--nav-height");
      const parsed = Number.parseInt(cssVar || "", 10);
      if (!Number.isNaN(parsed) && parsed > 0) return parsed;
    } catch (e) {
      // ignore
    }
    // if we can measure the site nav (footer's navRef is used only as a fallback)
    try {
      if (navRef.current) return Math.round(navRef.current.getBoundingClientRect().height);
    } catch (e) {
      // ignore
    }
    // default header height to subtract (tweak if your header is taller)
    return 80;
  };

  // Scroll-to logic that respects header offset (reliable fallback)
  const scrollToElementWithOffset = (el, offset = 0) => {
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const targetY = window.pageYOffset + rect.top - Math.max(0, offset) - 12; // small extra gap
    window.scrollTo({
      top: Math.max(0, Math.round(targetY)),
      behavior: "smooth",
    });
  };

  // centralized click handler — uses app-provided window.scrollToSection if available,
  // otherwise uses the offset-aware fallback above
  const handleClick = (label, id, e) => {
    if (e && typeof e.preventDefault === "function") e.preventDefault();
    setActive(label);

    try {
      if (typeof window !== "undefined" && typeof window.scrollToSection === "function") {
        // if app provides a helper, prefer that (it might include offset logic)
        window.scrollToSection(id);
        return;
      }
      const el = findSectionElement(id);
      if (el) {
        const offset = readNavHeight();
        scrollToElementWithOffset(el, offset);
      } else {
        // fallback: try native scrollIntoView
        const maybe = document.querySelector(`#${id}`);
        if (maybe) maybe.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    } catch (err) {
      const el = findSectionElement(id);
      if (el) {
        const offset = readNavHeight();
        scrollToElementWithOffset(el, offset);
      }
    }
  };

  // Active tracking so the footer can highlight the currently visible section
  useEffect(() => {
    const ids = navItems.map((i) => i.id || i.label.toLowerCase());

    const updateActive = () => {
      const navEl = navRef.current;
      const navHeight = navEl
        ? Math.round(navEl.getBoundingClientRect().height)
        : Number.parseInt(getComputedStyle(document.documentElement).getPropertyValue("--nav-height") || "80", 10);
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
    // run once on mount
    updateActive();
    return () => {
      window.removeEventListener("scroll", updateActive);
      window.removeEventListener("resize", updateActive);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <FooterContainer className="bg-transparent">
      <motion.div
        initial={reduce ? {} : { opacity: 0.25, y: 60, scale: 0.98 }}
        whileInView={reduce ? {} : { opacity: 1, y: 0, scale: 1 }}
        viewport={{ once: true }}
        transition={{ delay: 0.15, duration: 0.9, ease: "easeInOut" }}
        className="w-full max-w-7xl px-6 md:px-8 lg:px-12 xl:px-16 2xl:px-20 my-12"
      >
        <div className="mx-auto flex w-full flex-col items-center gap-6 py-40 md:flex-row md:justify-between md:items-center transform translate-y-20">
          <div className="flex flex-col items-center gap-1 text-center md:items-start md:text-left mt-12">
            <span className="text-lg font-bold tracking-tight text-white drop-shadow-[0_6px_18px_rgba(0,0,0,0.75)]">
              Kevin Andrews
            </span>
            <span className="text-sm text-slate-300 drop-shadow-[0_6px_18px_rgba(0,0,0,0.6)]">
              Full Stack Developer • Code • UI
            </span>
          </div>

          {/* Middle: small nav (visual design unchanged) */}
          <nav ref={navRef} className="flex gap-6 text-sm mt-4" aria-label="Footer navigation">
            {navItems.map((item) => {
              const isActive = active === item.label;
              return (
                <a
                  key={item.label}
                  href={`#${item.id}`}
                  onClick={(e) => handleClick(item.label, item.id, e)}
                  aria-current={isActive ? "page" : undefined}
                  className="rounded px-2 py-1 font-semibold text-white hover:text-slate-300 transition-colors drop-shadow-[0_4px_10px_rgba(0,0,0,0)]"
                >
                  {item.label}
                </a>
              );
            })}
          </nav>

          {/* Right: Connect block (design unchanged) */}
          <div className="flex flex-col items-center md:items-center mt-12">
            <span className="mb-2 text-lg font-semibold text-white drop-shadow-[0_6px_18px_rgba(0,0,0,0.75)]">
              Connect
            </span>

            <div className="flex gap-4">
              <a
                href="#"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="GitHub"
                className="group p-2 rounded hover:scale-105 transform transition text-slate-200 hover:text-white drop-shadow-[0_4px_10px_rgba(0,0,0,0.6)]"
              >
                <FiGithub className="h-5 w-5" aria-hidden="true" />
              </a>

              <a
                href="#"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn"
                className="group p-2 rounded hover:scale-105 transform transition text-slate-200 hover:text-white drop-shadow-[0_4px_10px_rgba(0,0,0,0.6)]"
              >
                <FiLinkedin className="h-5 w-5" aria-hidden="true" />
              </a>

              <a
                href="#"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Twitter"
                className="group p-2 rounded hover:scale-105 transform transition text-slate-200 hover:text-white drop-shadow-[0_4px_10px_rgba(0,0,0,0.6)]"
              >
                <FiTwitter className="h-5 w-5" aria-hidden="true" />
              </a>
            </div>
          </div>
        </div>

        <div className="mx-auto w-full max-w-7xl">
          <div className="mt-2 border-t border-slate-800/50 pt-4 text-center text-xs text-slate-400">
            © {new Date().getFullYear()} Kevin Andrews
          </div>
        </div>
      </motion.div>
    </FooterContainer>
  );
}

/**
 * FooterContainer
 * - Improved frosted panel implementation: border removed
 */
export const FooterContainer = ({ children, className }) => {
  return (
    <div
      className={cn("relative w-full overflow-hidden z-0", className)}
      style={{ pointerEvents: "auto" }}
    >
      {/* Background video (full-bleed) */}
      <video
        className="absolute inset-0 -z-10 h-full w-full object-cover"
        style={{ objectPosition: "50% 42%" }}
        autoPlay
        muted
        loop
        playsInline
        aria-hidden="true"
      >
        <source src="/video/Blackhole.webm" type="video/webm" />
        <source src="/video/Blackhole.mp4" type="video/mp4" />
      </video>

      {/* Dark overlay (keeps contrast) */}
      <div className="absolute inset-0 -z-11 bg-gradient-to-t from-black/92 via-black/64 to-black/36 pointer-events-none" />

      {/* subtle top fade */}
      <div className="absolute inset-x-0 top-0 h-24 -z-10 bg-gradient-to-b from-black/80 to-transparent pointer-events-none" />

      {/* -------------------------
          FROSTED PANEL (NO BORDER)
          - border removed so no white outline
          ------------------------- */}
      <div
        className="absolute left-1/2 -translate-x-1/2 bottom-0 z-20 w-full max-w-7xl px-8 pb-8 pointer-events-none"
        aria-hidden="true"
      >
        <div
          /* border removed here */
          className="w-full rounded-2xl shadow-inner  backdrop-blur-lg"
          style={{
            height: "260px",
            WebkitBackdropFilter: "blur(16px)",
            backdropFilter: "blur(16px)",
          }}
        />
      </div>

      {/* existing glow/lamp (masked to avoid overlapping) */}
      <div
        className="absolute inset-x-0 bottom-0 -z-20 h-44 md:h-56 lg:h-64 pointer-events-none"
        style={{
          WebkitMaskImage: "linear-gradient(to top, transparent 0%, black 35%)",
          maskImage: "linear-gradient(to top, transparent 0%, black 35%)",
        }}
      >
        {/* left conic */}
        <motion.div
          initial={{ opacity: 0.16, scaleX: 0.95, scaleY: 0.95 }}
          whileInView={{ opacity: 0.42, scaleX: 1, scaleY: 1.02 }}
          viewport={{ once: true }}
          transition={{ delay: 0.18, duration: 1.0, ease: "easeInOut" }}
          className="absolute -left-40 bottom-0 h-full w-1/3 rounded-full blur-3xl"
          style={{
            transform: "translateY(12px)",
            background:
              "radial-gradient(1100px 380px at 8% 100%, rgba(25,197,255,0.28), rgba(8,10,12,0) 48%)",
          }}
        />

        {/* right conic */}
        <motion.div
          initial={{ opacity: 0.12, scaleX: 0.95 }}
          whileInView={{ opacity: 0.38, scaleX: 1.02 }}
          viewport={{ once: true }}
          transition={{ delay: 0.22, duration: 1.1, ease: "easeInOut" }}
          className="absolute -right-40 bottom-0 h-full w-1/3 rounded-full blur-3xl"
          style={{
            transform: "translateY(12px)",
            background:
              "radial-gradient(1100px 400px at 92% 100%, rgba(8,200,176,0.22), rgba(8,10,12,0) 48%)",
          }}
        />

        {/* center cyan pool */}
        <motion.div
          initial={{ opacity: 0.18, scale: 0.98 }}
          whileInView={{ opacity: 0.62, scale: 1.03 }}
          viewport={{ once: true }}
          transition={{ delay: 0.16, duration: 1.0, ease: "easeInOut" }}
          className="absolute left-1/2 -translate-x-1/2 bottom-6 z-10 h-36 w-11/12 max-w-[1400px] rounded-full blur-4xl"
          style={{
            transform: "translateY(8px)",
            background:
              "radial-gradient(760px 170px at 50% 34%, rgba(56,189,248,0.22), rgba(99,102,241,0.12) 36%, rgba(0,0,0,0) 60%)",
            WebkitMaskImage: "linear-gradient(to top, transparent 0%, black 25%)",
            maskImage: "linear-gradient(to top, transparent 0%, black 25%)",
          }}
        />

        {/* thin cyan line above the copyright area */}
        <motion.div
          initial={{ width: "22%" }}
          whileInView={{ width: "68%" }}
          viewport={{ once: true }}
          transition={{ delay: 0.28, duration: 0.95, ease: "easeInOut" }}
          className="absolute left-1/2 -translate-x-1/2 bottom-3 h-[1px] rounded bg-cyan-400/60"
          style={{ maxWidth: "1050px", transform: "translateY(6px)" }}
        />
      </div>

      {/* content wrapper ensures proper z stacking (children sit above the frosted panel) */}
      <div className="relative z-30 flex items-center justify-center py-12 md:py-8">
        {children}
      </div>
    </div>
  );
};
