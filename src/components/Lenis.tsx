"use client";

import { useEffect } from "react";
import Lenis from "@studio-freight/lenis";

const LenisProvider = () => {
  useEffect(() => {
    const lenis = new Lenis({
      duration: 2, // Velocidad de scroll
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), 
 
    });

    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    return () => {

      lenis.destroy();
    };
  }, []);

  return null; 
};

export default LenisProvider;