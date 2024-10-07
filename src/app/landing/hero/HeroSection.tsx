"use client";
import React, { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { GetText } from "./components/textRight/GetTexts";
import DialogText from "./components/textRight/Dialog";
import { GetTextLeft } from "./components/textLeft/GetTexts";
import DialogTextLeft from "./components/textLeft/Dialog";

const HeroSection = () => {
  const titleRef = useRef<HTMLHeadingElement>(null);
  const scrollTextRef = useRef<HTMLSpanElement>(null);
  const servicesTextRef = useRef<HTMLSpanElement>(null);
  const [token, setToken] = useState(false);
  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    if (storedToken) setToken(true);
  }, []);

  useEffect(() => {
    const titleSpans = titleRef.current?.querySelectorAll("span");

    if (titleSpans) {
      gsap.set(titleSpans, { y: "100%", opacity: 0 });
      gsap.to(titleSpans, {
        y: "0%",
        opacity: 1,
        stagger: 0.2,
        duration: 1.5,
        ease: "power3.out",
      });
    }

    if (scrollTextRef.current) {
      gsap.set(scrollTextRef.current, { y: "100%", opacity: 0 });
      gsap.to(scrollTextRef.current, {
        y: "0%",
        opacity: 1,
        delay: 1,
        duration: 1.5,
        ease: "power3.out",
      });
    }

    if (servicesTextRef.current) {
      gsap.set(servicesTextRef.current, { y: "100%", opacity: 0 });
      gsap.to(servicesTextRef.current, {
        y: "0%",
        opacity: 1,
        delay: 1.5,
        duration: 1.5,
        ease: "power3.out",
      });
    }
  }, []);

  return (
    <section className="h-screen flex items-center justify-center relative">
      <h1
        className="Title text-[3rem] xl:text-[8rem] sm:text-[6rem] text-black dark:text-color1 font-[HelveticaExtraBold] leading-[6.5rem] overflow-hidden "
        ref={titleRef}
      >
        <span className="block ml-[3.6rem] overflow-hidden">
          <span>LIGHTING IS</span>
        </span>
        <br />
        <span className="block overflow-hidden mt-[-9.5rem] xl:mt-[-6rem] sm:mt-[-7.5rem]">
          <span>EVERYTHING</span>
        </span>
      </h1>

      <GetText />
      {token && <DialogText />}

      <GetTextLeft/>
      {token && <DialogTextLeft />}
    </section>
  );
};

export default HeroSection;
