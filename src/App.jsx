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

const App = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 2000);
    return () => clearTimeout(timer);
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
