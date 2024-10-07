"use client";

import React, { useRef, useState, useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
import { useLayoutEffect } from "react";
import { GetImage1 } from "./components/Img1/Images/GetImage";
import { DialogImage } from "./components/Img1/Images/DialogImage";
import { GetTexts } from "./components/Img1/Texts/GetTexts";
import DialogText from "./components/Img1/Texts/DialogText";
import { GetImage2 } from "./components/Img2/Images/GetImage";
import { DialogImage2 } from "./components/Img2/Images/DialogImage";
import { GetTexts2 } from "./components/Img2/Texts/GetTexts";
import { DialogText2 } from "./components/Img2/Texts/DialogText";
import { GetImage3 } from "./components/Img3/Images/GetImage";
import { DialogImage3 } from "./components/Img3/Images/DialogImage";
import { GetTexts3 } from "./components/Img3/Texts/GetTexts";
import { DialogText3 } from "./components/Img3/Texts/DialogText";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const LandScapeSection = () => {
  const sectionRef = useRef(null);
  const triggerRef = useRef(null);
  const [token, setToken] = useState(false);

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
    <section className="overflow-hidden mt-[10rem]" ref={triggerRef}>
      <div ref={sectionRef} className="flex w-[300vw] h-screen">
        <div className="w-screen h-full flex justify-center items-center relative">
          <GetTexts />
          {token && <DialogText />}
          <GetImage1 />
          {token && <DialogImage />}
        </div>

        <div className="w-screen h-full flex justify-center items-center relative">
          <GetTexts2 />
          {token && <DialogText2 />}
          <GetImage2 />
          {token && <DialogImage2 />}
        </div>

        <div className="w-screen h-full flex justify-center items-center relative">
          <GetTexts3 />
          {token && <DialogText3 />}

          <GetImage3 />
          {token && <DialogImage3 />}
        </div>
      </div>
    </section>
  );
};

export default LandScapeSection;
