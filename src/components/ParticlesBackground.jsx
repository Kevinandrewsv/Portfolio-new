import React, { useCallback } from "react";
import { loadFull } from "tsparticles";
import { Particles } from "react-tsparticles";

const ParticlesBackground = () => {
  const particlesInit = useCallback(async (engine) => {
    // loadFull loads all the tsParticles features
    await loadFull(engine);
  }, []);

  return (
    <Particles
      id="tsparticles"
      init={particlesInit}
      options={{
        fullScreen: {
          enable: true,
          zIndex: -1  // send it behind everything
        },
        background: {
          color: { value: "#0d47a1" }  // or "transparent"
        },
        fpsLimit: 60,
        interactivity: {
          detectsOn: "canvas",
          events: {
            onHover: {
              enable: true,
              mode: "grab"
            },
            onClick: {
              enable: true,
              mode: "push"
            },
            resize: true
          },
          modes: {
            grab: {
              distance: 200,
              line_linked: {
                opacity: 0.5
              }
            },
            push: {
              quantity: 4
            }
          }
        },
        particles: {
          color: { value: "#ffffff" },
          links: {
            color: "#ffffff",
            distance: 150,
            enable: true,
            opacity: 0.3,
            width: 1
          },
          collisions: {
            enable: false
          },
          move: {
            direction: "none",
            enable: true,
            outModes: "out",
            random: false,
            speed: 1.5,
            straight: false
          },
          number: {
            density: {
              enable: true,
              area: 800
            },
            value: 80
          },
          opacity: {
            value: 0.4
          },
          shape: {
            type: "circle"
          },
          size: {
            value: { min: 1, max: 4 }
          }
        },
        detectRetina: true
      }}
    />
  );
};

export default ParticlesBackground;
