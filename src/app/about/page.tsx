"use client";
import Navbar from "@/components/navbar/Navbar";
import { useEffect, useState } from "react";
import { GetImage } from "./components/Images/GetImage";
import { DialogImage } from "./components/Images/DialogImage";
import { GetTexts } from "./components/Texts/GetTexts";
import DialogText from "./components/Texts/DialogText";
import DropDonwn from "@/components/navbar/DropDonwn";
import { useMixBlend } from "@/store/store";

const About = () => {
  const [token, setToken] = useState(false);
  const { mixBlend } = useMixBlend();

  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    if (storedToken) setToken(true);
  }, []);
  return (
    <>
      <div className="flex justify-center w-full">
        <div className="z-[100] fixed w-[88%] mx-auto max-w-[90.75rem] top-14 justify-end flex items-center">
          <DropDonwn />
        </div>
        <div
          className={`z-[1] fixed w-[88%] mx-auto max-w-[90.75rem] justify-end flex items-end   ${
            mixBlend ? "mix-blend-difference" : ""
          }`}
        >
          <Navbar />
        </div>
      </div>

      <section className="w-[88%] mx-auto max-w-[90.75rem] text-black dark:text-white">
        <div className="grid grid-cols-1 lg:grid-cols-2 grid-rows-1 gap-4 mt-[6rem] lg:mt-[20rem] mb-20">
          <div>
            <div className="relative flex flex-col mt-64">
              <GetTexts />
              {token && <DialogText />}
            </div>
          </div>

          <div className="relative flex justify-center mt-10 sm:mt-0">
            <GetImage />
            {token && <DialogImage />}
          </div>
        </div>
      </section>
    </>
  );
};

export default About;
