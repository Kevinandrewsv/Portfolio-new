// src/App.jsx
import React, { useEffect, useState } from "react";
import About from "./components/About";
import Works from "./components/Works";
import Menu from "./components/Menu";
import Services from "./components/Services";
import MySkills from "./components/MySkills";
import Contributions from "./components/Contributions";  // no .jsx extension needed
import Contact from "./components/Contact";
import PreLoader from "./components/PreLoader";
import ScrollProgress from "./components/ScrollProgress";

import "../src/buttonStyle.css";
import { styles } from "./style";

const App = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate an asynchronous operation
    const timer = setTimeout(() => setLoading(false), 2000);
    return () => clearTimeout(timer);
  }, []);

  if (loading) return <PreLoader />;

  return (
    <>
      {/* scroll progress indicator */}
      <ScrollProgress />

      <div className="bg-primary overflow-hidden">
        <div id="stars" />
        <div id="stars2" />
        <div id="stars3" />

        {/* Hero section */}
        <div className="h-[100vh]">
          <Menu />
          <About />
        </div>

        {/* Optional anchor for “scroll to top” */}
        <a className="scroll-btn" />

        {/* Services & Skills */}
        <div className="pt-10">
          <Services />
          <MySkills />
        </div>

        {/* Portfolio Works */}
        <Works />

        {/* ← Your new contributions graph section */}
        <section className="pt-16">
          <Contributions />
        </section>

        {/* Contact */}
        <Contact />

        {/* Footer */}
        <h1 className={`${styles.heroSubText} text-center py-4`}>
          Made by Kevin Andrews
        </h1>
      </div>
    </>
  );
};

export default App;
