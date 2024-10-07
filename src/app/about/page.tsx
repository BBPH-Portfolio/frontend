"use client";
import Navbar from "@/components/Navbar";
import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { GetImage } from "./components/Images/GetImage";
import { DialogImage } from "./components/Images/DialogImage";
import { GetTexts } from "./components/Texts/GetTexts";
import DialogText from "./components/Texts/DialogText";

const About = () => {
  const titleRef = useRef<HTMLHeadingElement | null>(null);
  const title2Ref = useRef<HTMLHeadingElement | null>(null);
  const bodyRef = useRef<HTMLParagraphElement | null>(null);
  const [token, setToken] = useState(false);

  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    if (storedToken) setToken(true);
  }, []);
  return (
    <>
      <div className="flex justify-center w-full">
        <div className="mix-blend-difference z-[1] fixed w-[88%] mx-auto max-w-[90.75rem]">
          <Navbar />
        </div>
      </div>

      <section className="w-[88%] mx-auto max-w-[90.75rem]">
        <section className=" text-black dark:text-white flex h-auto items-center mb-20 lg:mb-0">
          <div className="grid grid-cols-1 lg:grid-cols-2 grid-rows-1 gap-4 mt-[20rem] lg:mt-[10rem]">
            <div className="grid grid-cols-1 grid-rows-2 gap-0">
              <div>
                <h2 className="text-[5rem] font-[mukta] overflow-hidden leading-[4.5rem]">
                  <span className="animate-prueba block" ref={titleRef}>
                    I CREATE DIGITAL FUTURE.
                  </span>
                </h2>
              </div>

              <div className="flex items-end relative">
                <GetTexts />
                {token && <DialogText />}
              </div>
            </div>

            <div className="flex justify-center relative">
              {" "}
              <GetImage />
              {token && <DialogImage />}
            </div>
          </div>
        </section>
      </section>
    </>
  );
};

export default About;
