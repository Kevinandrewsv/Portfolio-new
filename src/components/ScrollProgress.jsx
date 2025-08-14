// src/components/ScrollProgress.jsx
import { useState, useEffect, useRef } from "react";

export default function ScrollProgress() {
  const [scrollPct, setScrollPct] = useState(0);
  const ticking = useRef(false);

  useEffect(() => {
    const handleScroll = () => {
      if (!ticking.current) {
        requestAnimationFrame(() => {
          const scrollTop = window.scrollY;
          const docHeight =
            document.documentElement.scrollHeight - window.innerHeight;
          setScrollPct(docHeight > 0 ? scrollTop / docHeight : 0);
          ticking.current = false;
        });
        ticking.current = true;
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div
      className="
        fixed right-4
        top-1/2 transform -translate-y-1/2
        h-64
        w-1
        rounded-full
        bg-gray-800
        overflow-hidden
        z-50
      "
    >
      <div
        className="
          w-full
          bg-gradient-to-t
          from-[#eb3b91]
          to-[#6773de]
          origin-top
        "
        style={{ height: `${scrollPct * 100}%` }}
      />
    </div>
  );
}
