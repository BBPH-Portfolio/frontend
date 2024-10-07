"use client";
import Image from "next/image";
import Logo from "../../../../public/media/logo_blanco.png";
import Logo_black from "../../../../public/media/logo_negro1.png";
import { useDarkMode } from "@/components/Navbar";
import TimeDisplay from "./components/Date";

const Footer = () => {
  const { isDarkMode } = useDarkMode();
  const image = isDarkMode ? Logo : Logo_black;

  return (
    <section className="h-screen pt-20 relative">
      <div className="w-[88%] mx-auto max-w-[100.75rem] text-black dark:text-color1 h-full">
        <div className="w-full flex justify-between items-start flex-col md:flex-row md:items-center">
          <div>
            <h3 className="text-3xl font-[HelveticaMediumItalic]">
              LET&apos;S CREATE
            </h3>
          </div>
          <div className="flex absolute top-[14.5%] right-[16%]">
            <span className="text-4xl">
              <TimeDisplay />
            </span>

            <div className="bg-black dark:bg-white w-[5rem] rounded-3xl text-color1 dark:text-black flex items-center justify-center">
              <span className="text-lg py-2 font-[HelveticaExtraBold]">
                BOG
              </span>
            </div>
          </div>
        </div>

        <div className="h-full w-full flex justify-center items-center ">
          <Image
            src={image}
            alt="Logo"
            draggable={false}
            className="w-[28rem]"
          />
        </div>

        <div className="w-full flex flex-col justify-between items-start mt-[-5em] ">
          <div className="font-[HelveticaHairline] tracking-[2px] flex md:flex-row flex-col">
            <h3 className="transition-all duration-300 ease-in-out hover:text-[#575757]">
              Brianbecerraph@gmail.com
            </h3>
            <h3 className="ml-0 transition-all duration-300 ease-in-out hover:text-[#575757] md:ml-5">
              <span className="font-[HelveticaMedium] ">+57 </span>
              313 450 3971
            </h3>
          </div>

          <div className="font-[HelveticaHairline] tracking-[2px] absolute right-[2rem] xl:right-[10rem] xl:top-[60%] sm:flex hidden">
            <span className="mr-5 transition-all duration-300 ease-in-out hover:text-[#575757]">
              Instagram
            </span>
            <span className="transition-all duration-300 ease-in-out hover:text-[#575757]">
              Linkedin
            </span>
          </div>

          <div className="font-[HelveticaHairline] tracking-[2px] relative sm:hidden flex">
            <span className="mr-5 transition-all duration-300 ease-in-out hover:text-[#575757]">
              Instagram
            </span>
            <span className="transition-all duration-300 ease-in-out hover:text-[#575757]">
              Linkedin
            </span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Footer;
