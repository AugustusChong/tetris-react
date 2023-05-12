import { useCallback } from "react";
import Particles from "react-particles";
import { loadFull } from "tsparticles";
import { particleConfig } from "./particle-config";

const ParticleBackground = () => {
  const particlesInit = useCallback(async (engine) => {
    console.log(engine);
    await loadFull(engine);
  }, []);

  const particlesLoaded = useCallback(async (container) => {
    await console.log(container);
  }, []);

  return (
    <Particles
      options={particleConfig}
      init={particlesInit}
      loaded={particlesLoaded}
    />
  );
};

export default ParticleBackground;
