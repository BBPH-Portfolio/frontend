"use client";

import React, { useRef, useState, useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
import { useLayoutEffect } from "react";
import { GetImage1 } from "./components/Img1/Images/GetImage";
import { DialogImage } from "./components/Img1/Images/DialogImage";

import { GetImage2 } from "./components/Img2/Images/GetImage";
import { DialogImage2 } from "./components/Img2/Images/DialogImage";


import { GetImage3 } from "./components/Img3/Images/GetImage";
import { DialogImage3 } from "./components/Img3/Images/DialogImage";


if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const LandScapeSection = () => {
  const sectionRef = useRef(null);
  const triggerRef = useRef(null);
  const [token, setToken] = useState(false);
  const [currentSection, setCurrentSection] = useState(1);

  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    if (storedToken) setToken(true);
  }, []);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const mm = gsap.matchMedia();

      mm.add("(min-width: 300px)", () => {
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: triggerRef.current,
            start: "top top",
            end: "+=300%",
            scrub: 2,
            pin: true,
            anticipatePin: 1,
            onUpdate: (self) => {
              const progress = self.progress;
              if (progress < 1/3) {
                setCurrentSection(1);
              } else if (progress < 2/3) {
                setCurrentSection(2);
              } else {
                setCurrentSection(3);
              }
            }
          },
        });

        tl.to(sectionRef.current, {
          translateX: "-200vw",
          ease: "none",
          duration: 1,
        });

        return () => {
          tl.kill();
          ScrollTrigger.getAll().forEach((t) => t.kill());
        };
      });

      return () => mm.revert();
    }, triggerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section className="overflow-hidden mt-[20rem] relative" ref={triggerRef}>
      <nav className="absolute flex justify-between w-screen top-[85%]  z-10 items-center p-16 font-[DmSansBold] text-lg">
        <div className="flex relative">
          <span className="mix-blend-difference">{currentSection}</span>

          <div className="border border-black w-40 h-0 mt-[13px] mx-5" />

          <span>3</span>
        </div>
        <div className=" hidden md:block">Scroll to find my projects</div>
      </nav>
      <div ref={sectionRef} className="flex w-[300vw] h-screen">
        <div className="w-screen h-full flex justify-center items-center relative">
          {/* <GetTexts />
          {token && <DialogText />} */}
          <GetImage1 />
          {token && <DialogImage />}
        </div>

        <div className="w-screen h-full flex justify-center items-center relative">
          {/* <GetTexts2 />
          {token && <DialogText2 />} */}
          <GetImage2 />
          {token && <DialogImage2 />}
        </div>

        <div className="w-screen h-full flex justify-center items-center relative">
          {/* <GetTexts3 />
          {token && <DialogText3 />} */}

          <GetImage3 />
          {token && <DialogImage3 />}
        </div>
      </div>
    </section>
  );
};

export default LandScapeSection;