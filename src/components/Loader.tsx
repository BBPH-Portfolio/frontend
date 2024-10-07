"use client";

import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";

export const Loader = () => {
  const textRef = useRef<HTMLHeadingElement | null>(null);

  useEffect(() => {
    if (textRef.current) {
      // Animación GSAP: de opacidad 0 a 1, y luego de regreso a 0
      gsap.fromTo(
        textRef.current,
        { opacity: 0 }, // Empieza con opacidad 0
        {
          opacity: 1, // Aumenta opacidad a 1 (visible)
          duration: 2, // Duración de 2 segundos para aparecer
          yoyo: true, // Yoyo para revertir la animación
          repeat: 1, // Repite una vez para volver a opacidad 0
          ease: "power1.inOut", // Efecto de easing suave
        }
      );
    }
  }, []);

  return (
    <div className="w-full h-screen flex items-center justify-center z-50">
      <p className="font-[HelveticaLight] tracking-[2.5vw] text-[0.7rem] text-black dark:text-white" ref={textRef}>
        LIGHT STUDIO
      </p>
    </div>
  );
};
