"use client";

import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";

export const Loader = () => {
  const textRef = useRef<HTMLHeadingElement | null>(null);

  useEffect(() => {
    if (textRef.current) {
      
      gsap.fromTo(
        textRef.current,
        { opacity: 0 }, 
        {
          opacity: 1,
          duration: 2,
          yoyo: true, 
          repeat: 1, 
          ease: "power1.inOut", 
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
