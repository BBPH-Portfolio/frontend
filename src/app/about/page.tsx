"use client";
import Navbar from "@/components/navbar/Navbar";
import { useEffect, useState } from "react";
import { GetImage } from "./components/Images/GetImage";
import { DialogImage } from "./components/Images/DialogImage";
import { GetTexts } from "./components/Texts/GetTexts";
import DialogText from "./components/Texts/DialogText";
import DropDonwn from "@/components/navbar/DropDonwn";
import { useMixBlend } from "@/store/store";
import Switch from "@/components/Switch";
import { ChevronLeft } from "lucide-react";
import Link from "next/link";
import Background from "@/components/navbar/Background";

const About = () => {
  const [token, setToken] = useState(false);
  const { mixBlend } = useMixBlend();
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    if (storedToken) setToken(true);
  }, []);
  return (
    <>
      <Switch />
      <div className="flex justify-center w-full relative">
        
      <div className="z-50">
          <Background isOpen={isOpen} setIsOpen={setIsOpen} />
        </div>

        <div className="fixed w-[88%] mx-auto max-w-[90.75rem] top-14 justify-end flex items-center mix-blend-difference z-50">
          <DropDonwn setIsOpen={setIsOpen} isOpen={isOpen} />
        </div>
        <div
          className={`z-[1] hidden fixed w-[88%] mx-auto max-w-[90.75rem] justify-end items-end ${
            mixBlend ? "mix-blend-difference" : ""
          }`}
        >
          <Navbar />
        </div>

        <div className="absolute top-12 left-[11.5%] hover:scale-125 transition-all duration-300">
          <Link href="/" className="cursor-none">
            <div className="p-4">
              <ChevronLeft className="size-10 text-black dark:text-white" />
            </div>
          </Link>
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

          <div className="relative lg:sticky lg:top-20 h-fit max-h-screen flex justify-center mt-10 sm:mt-0">
            <GetImage />
            {token && <DialogImage />}
          </div>
        </div>
      </section>
    </>
  );
};

export default About;
