// src/components/ScrollProgress.jsx
import { useState, useEffect } from "react";

export default function ScrollProgress() {
  const [scrollPct, setScrollPct] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const docHeight =
        document.documentElement.scrollHeight - window.innerHeight;
      setScrollPct(docHeight > 0 ? scrollTop / docHeight : 0);
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
        h-64        /* adjust height if needed */
        w-1         /* slim width */
        rounded-full
        bg-gray-800
        overflow-hidden
        z-50
      "
    >
      <div
        className="
          w-full
          bg-gradient-to-t       /* gradient direction: bottom → top */
          from-[#eb3b91]
          to-[#6773de]
          origin-top
          transition-all
          duration-200
          ease-out
        "
        style={{ height: `${scrollPct * 100}%` }}
      />
    </div>
  );
}
