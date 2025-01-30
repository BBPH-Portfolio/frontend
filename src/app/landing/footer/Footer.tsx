"use client";
import Image from "next/image";
import Logo from "../../../../public/media/logo_blanco.png";
import Logo_black from "../../../../public/media/logo_negro1.png";
import { useDarkMode } from "@/components/navbar/Navbar";
import TimeDisplay from "./components/Date";
import Link from "next/link";

const Footer = () => {
  const { isDarkMode } = useDarkMode();
  const image = isDarkMode ? Logo : Logo_black;

  return (
    <section className="relative h-screen pt-20">
      <div className="w-[88%] mx-auto max-w-[100.75rem] text-black dark:text-color1 h-full">
        <div className="flex flex-col items-start justify-between w-full md:flex-row md:items-center">
          <div>
            <h3 className="text-2xl md:text-3xl font-[HelveticaMediumItalic]">
              LET&apos;S CREATE
            </h3>
          </div>
          <div className="flex absolute top-[14.5%] right-[16%]">
            <span className="text-4xl">
              <TimeDisplay />
            </span>

            <div className="bg-black dark:bg-white w-[5rem] rounded-3xl text-color1 dark:text-black flex items-center justify-center">
              <span className="md:text-lg text-[1rem] py-2 font-[HelveticaExtraBold]">
                BOG
              </span>
            </div>
          </div>
        </div>

        <div className="flex items-center justify-center w-full h-full ">
          <Image
            quality={100}
            src={image}
            alt="Logo"
            draggable={false}
            className="w-[18rem]"
          />
        </div>

        <div className="w-full flex flex-col justify-between items-start mt-[-5em] ">
          <div className="font-[HelveticaHairline] tracking-[2px] flex md:flex-row flex-col">
            <h3 className="transition-all duration-300 ease-in-out hover:text-[#575757]">
              <Link
                href="https://mail.google.com/mail/?view=cm&fs=1&to=brianbecerraph@gmail.com"
                target="_blank"
                className="cursor-none"
              >
                Brianbecerraph@gmail.com
              </Link>
            </h3>
            <h3 className="ml-0 transition-all duration-300 ease-in-out hover:text-[#575757] md:ml-5">
              <Link
                href="https://wa.me/573134503971"
                target="_blank"
                className="cursor-none"
              >
                <span className="font-[HelveticaMedium] ">+57 </span>
                313 450 3971
              </Link>
            </h3>
          </div>

          <div className="font-[HelveticaHairline] tracking-[2px] absolute right-[2rem] xl:right-[10rem] xl:top-[60%] sm:flex hidden">
            <span className="mr-5 transition-all duration-300 ease-in-out hover:text-[#575757]">
              <Link
                href="https://www.instagram.com/bbphstudio/"
                target="_blank"
                className="cursor-none"
              >
                Instagram
              </Link>
            </span>
            <span className="transition-all duration-300 ease-in-out hover:text-[#575757]">
              <Link
                href="https://www.linkedin.com/in/brianbecerrasabogal/"
                target="_blank"
                className="cursor-none"
              >
                Linkedin
              </Link>
            </span>
          </div>

          <div className="font-[HelveticaHairline] tracking-[2px] relative sm:hidden flex">
            <Link
              href="https://www.instagram.com/bbphstudio/"
              target="_blank"
              className="cursor-none"
            >
              Instagram
            </Link>
            <span className="transition-all duration-300 ease-in-out hover:text-[#575757]">
              <Link
                href="https://www.linkedin.com/in/brianbecerrasabogal/"
                target="_blank"
                className="cursor-none"
              >
                Linkedin
              </Link>
            </span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Footer;
