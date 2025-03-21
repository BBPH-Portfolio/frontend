import { useMixBlend } from "@/store/store";
import React, { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { useLanguage } from "./Navbar";

interface IDropDonwn {
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  isOpen: boolean;
}

const DropDonwn = ({setIsOpen, isOpen}: IDropDonwn) => {
  const { mixBlend, setMixBlend } = useMixBlend();
  const [lastScrollY, setLastScrollY] = useState(0);
  const [showNavbar, setShowNavbar] = useState(true);
  const { Spanish, setLanguage } = useLanguage();

  const navRef = useRef<HTMLButtonElement>(null);
  const buttonref = useRef<HTMLButtonElement>(null);

  const handleMenuToggle = () => {
    setIsOpen(!isOpen);
    setMixBlend(!mixBlend);
    console.log("mix:", mixBlend);
  };

  useEffect(() => {
    [navRef, buttonref].forEach((ref) => {
      if (ref.current) {
        gsap.set(ref.current, { y: "-100%", opacity: 0 });
        gsap.to(ref.current, {
          y: "0%",
          opacity: 1,
          duration: 1.5,
          ease: "power2.out",
        });
      }
    });
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      if (currentScrollY > lastScrollY) {
        setShowNavbar(false);
      } else {
        setShowNavbar(true);
      }

      setLastScrollY(currentScrollY);
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [lastScrollY]);

  useEffect(() => {
    [navRef, buttonref].forEach((ref) => {
      if (ref.current) {
        if (showNavbar) {
          gsap.to(ref.current, {
            y: "0%",
            opacity: 1,
            duration: 1,
            ease: "power2.out",
          });
        } else {
          gsap.to(ref.current, {
            y: "-200%",
            opacity: 0,
            duration: 1,
            ease: "power2.out",
          });
        }
      }
    });
  }, [showNavbar]);

  const handleChangueLanguage = () => {
    setLanguage(!Spanish);
  };

  return (
    <>
      <button
        onClick={handleChangueLanguage}
        className={`text-white dark:text-white cursor-none sm:mr-32 mr-0 sm:relative sm:-top-1 absolute top-[3rem] sm:text-[1rem] text-sm tracking-[.3rem] transition-[filter] duration-500 ${ isOpen ? "blur" : ""}`}
        ref={buttonref}
      >
        {Spanish ? "ENG" : "ES"} 
      </button>
      <button
        onClick={handleMenuToggle}
        className="relative cursor-none"
        ref={navRef}
      >
        <div
          className={`relative h-5 w-7 transition-all duration-200 ${
            isOpen ? "rotate-45" : ""
          }`}
        >
          <span
              className={`absolute left-0 top-0 h-[2px] w-full bg-white dark:bg-white transition-all duration-200 ${
              isOpen ? "top-1/2 -translate-y-1/2 rotate-90" : "top-0"
            }`}
          />
          <span
            className={`absolute left-0 top-1/2 h-[2px] w-full bg-white dark:bg-white -translate-y-1/2 transition-all duration-200 ${
              isOpen ? "left-1/2 -translate-x-1/2 rotate-0" : "left-0"
            }`}
          />
        </div>
      </button>
    </>
  );
};

export default DropDonwn;
