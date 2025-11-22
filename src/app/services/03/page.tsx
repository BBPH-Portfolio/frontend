"use client";
import Navbar from "@/components/navbar/Navbar";
import { useEffect, useState } from "react";
import DropDonwn from "@/components/navbar/DropDonwn";
import { useMixBlend } from "@/store/store";
import Switch from "@/components/Switch";
import { ChevronLeft } from "lucide-react";
import Link from "next/link";
import Background from "@/components/navbar/Background";
import { GetTitles } from "@/app/landing/services/components/GetTitles";
import { GetTexts } from "./components/GetTexts";
import DialogText from "./components/DialogText";
import { GetImage } from "./components/GetImage";
import { DialogImage } from "./components/DialogImage";

const Service03 = () => {
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
          <Link href="/#services" className="cursor-none">
            <div className="p-4">
              <ChevronLeft className="size-10 text-black dark:text-white" />
            </div>
          </Link>
        </div>
      </div>

      <GetTitles />

      <section className="w-[88%] mx-auto max-w-[90.75rem] text-black dark:text-white">
        <div className="flex flex-col mt-[6rem] lg:mt-[9rem] mb-20">
          <div className="relative">
            <GetTexts />
            {token && <DialogText />}
          </div>
          <div className="relative">
            <GetImage />
            {token && <DialogImage />}
          </div>
        </div>
      </section>
    </>
  );
};

export default Service03;
