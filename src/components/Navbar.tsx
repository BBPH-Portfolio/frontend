"use client";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Menu } from "lucide-react";
import { create } from "zustand";
import { gsap } from "gsap";

interface DarkModeState {
  isDarkMode: boolean;
  toggleDarkMode: () => void;
  setDarkMode: (mode: boolean) => void;
}

export const useDarkMode = create<DarkModeState>((set) => ({
  isDarkMode: false,
  toggleDarkMode: () => {
    set((state) => ({ isDarkMode: !state.isDarkMode }));
  },
  setDarkMode: (mode) => {
    set(() => ({ isDarkMode: mode }));
  },
}));

interface LanguageState {
  Spanish: boolean;
  setLanguage: (language: boolean) => void;
}

export const useLanguage = create<LanguageState>((set) => ({
  Spanish: true, 
  setLanguage: (language: boolean) => {
    set(() => ({ Spanish: language })); 
  },
}));

const Navbar = () => {
  const navRef = useRef<HTMLElement>(null);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [showNavbar, setShowNavbar] = useState(true);
  const { isDarkMode, setDarkMode } = useDarkMode();
  const { Spanish, setLanguage } = useLanguage();

  useEffect(() => {
    const updateTheme = () => {
      const colombiaTime = new Date(
        new Date().toLocaleString("en-US", { timeZone: "America/Bogota" })
      );
      const hours = colombiaTime.getHours();
      const minutes = colombiaTime.getMinutes();

      const isDarkTime =
        hours > 17 ||
        hours < 5 ||
        (hours === 17 && minutes >= 30) ||
        (hours === 5 && minutes < 30);

      setDarkMode(isDarkTime);

      if (isDarkTime) {
        document.documentElement.classList.add("dark");
        document.body.classList.remove("bg-white");
        document.body.classList.add("bg-[#141414]");
        localStorage.setItem("theme", "dark");
      } else {
        document.documentElement.classList.remove("dark");
        document.body.classList.remove("bg-[#141414]");
        document.body.classList.add("bg-white");
        localStorage.setItem("theme", "light");
      }
    };

    updateTheme();

    const interval = setInterval(updateTheme, 60000);

    return () => clearInterval(interval);
  }, [setDarkMode]);

  useEffect(() => {
    if (navRef.current) {
      gsap.set(navRef.current, { y: "-100%", opacity: 0 });
      gsap.to(navRef.current, {
        y: "0%",
        opacity: 1,
        duration: 1.5,
        ease: "power3.out",
      });
    }
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
    if (navRef.current) {
      if (showNavbar) {
        gsap.to(navRef.current, {
          y: "0%",
          opacity: 1,
          duration: 1,
          ease: "power3.out",
        });
      } else {
        gsap.to(navRef.current, {
          y: "-100%",
          opacity: 0,
          duration: 1,
          ease: "power3.out",
        });
      }
    }
  }, [showNavbar]);

  const handleChangueLanguage = () => {
    setLanguage(!Spanish); 
  };

  return (
    <>
      <nav className="text-white pt-10" ref={navRef}>
        <div className="flex justify-between">
          <div className="hidden md:flex">
            <Link
              href="/"
              className="w-[15vw] cursor-none font-[HelveticaLight] tracking-[.4rem] text-[.7rem] transition-all duration-300 ease-in-out hover:text-[#575757]"
            >
              HOME
            </Link>
            <Link
              href="/about"
              className="cursor-none font-[HelveticaLight] tracking-[.4rem] text-[.7rem] transition-all duration-300 ease-in-out hover:text-[#575757]"
            >
              ABOUT
            </Link>
          </div>
          <div className="w-auto">
            <h1 className="font-[HelveticaExBold] text-6xl">BBPH</h1>
            <p className="font-[HelveticaThin] tracking-[9.3px] text-[10px] mt-[8px] pl-[3.5px]">
              LIGHT STUDIO
            </p>
          </div>
          <div className="hidden md:flex">
            <Link
              href="/gallery"
              className="w-[15vw] cursor-none font-[HelveticaLight] tracking-[.4rem] text-[.7rem] transition-all duration-300 ease-in-out hover:text-[#575757]"
            >
              GALLERY
            </Link>
            <Link
              className="cursor-none font-[HelveticaLight] tracking-[.4rem] text-[.7rem] transition-all duration-300 ease-in-out hover:text-[#575757]"
              href="#"
              onClick={handleChangueLanguage}
            >
              { Spanish ? "ENGLISH" : "ESPAÑOL" }
            </Link>
          </div>

          <Sheet>
            <SheetTrigger asChild>
              <button className="md:hidden">
                <Menu className="h-[3.8rem] w-[3rem]" />
              </button>
            </SheetTrigger>
            <SheetContent
              side="right"
              className="border-none text-black dark:text-color1"
            >
              <nav className="flex flex-col text-black dark:text-color1 text-lg pt-10">
                <Link
                  href="/"
                  className="text-lg p-10 text-center font-[HelveticaLight] tracking-[.4rem] text-[.7rem]"
                >
                  HOME
                </Link>
                <Link
                  href="/about"
                  className="text-lg p-10 text-center font-[HelveticaLight] tracking-[.4rem] text-[.7rem]"
                >
                  ABOUT
                </Link>
                <Link
                  href="/gallery"
                  className="text-lg p-10 text-center font-[HelveticaLight] tracking-[.4rem] text-[.7rem]"
                >
                  GALLERY
                </Link>
                <button className="text-lg p-10 text-center font-[HelveticaLight] tracking-[.4rem] text-[.7rem]">
                  {isDarkMode ? "LIGHT" : "DARK"}
                </button>
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </nav>
    </>
  );
};

export default Navbar;
