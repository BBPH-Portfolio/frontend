"use client";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";

import { create } from "zustand";
import { gsap } from "gsap";
import { useMixBlend } from "@/store/store";
import { useRouter } from "next/navigation";

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
  const { isDarkMode } = useDarkMode();
  const { mixBlend } = useMixBlend();

  useEffect(() => {
    if (isDarkMode) {
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
  }, [isDarkMode]);

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


  const router = useRouter();

  const handleNav = () => {
    router.push("/");
  };

  return (
    <>
      <nav
        className="absolute top-10 left-[0%] md:left-1/2 translate-x-0 md:-translate-x-1/2 z-40"
        ref={navRef}
      >
        <div className="flex justify-center">
          <div className="text-left md:text-center" onClick={handleNav}>
            <Link
              className={`font-[HelveticaExBold] md:text-[3rem] text-[2rem] cursor-none select-none 
                ${mixBlend ? "text-white" : "text-black dark:text-white"}`}
              href={"/"}
            >
              BBPH
            </Link>
            <p
              className={`font-[HelveticaThin] md:tracking-[7.3px] tracking-[3.8px] md:text-[8px] text-[7px] mt-[8px] pl-[4.4px] select-none ${
                mixBlend ? "text-white" : "text-black dark:text-white"
              }`}
            >
              LIGHT STUDIO
            </p>
          </div>
        </div>
      </nav>
    </>
  );
};

export default Navbar;
