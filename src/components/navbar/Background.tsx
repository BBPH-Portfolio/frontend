
import Link from "next/link";
import { useDarkMode } from "./Navbar";
import { useRouter, usePathname } from "next/navigation";
import React from "react";

interface IBackground {
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  isOpen: boolean;
}

const Background = ({setIsOpen, isOpen}: IBackground) => {
    const { isDarkMode } = useDarkMode();
    const router = useRouter();
    const pathname = usePathname();

    const handleNavClick = async (
        e: React.MouseEvent<HTMLAnchorElement, MouseEvent>,
        sectionId: string
      ) => {
        e.preventDefault();
        setIsOpen(false);
    
        if (pathname === "/") {
          const element = document.getElementById(sectionId);
          if (element) {
            element.scrollIntoView({ behavior: "smooth" });
          }
        } else {
          router.push("/");
          setTimeout(() => {
            const element = document.getElementById(sectionId);
            if (element) {
              element.scrollIntoView({ behavior: "smooth" });
            }
          }, 100);
        }
      };
    
  return (
  <>
  
  <div
        className={`fixed inset-0 backdrop-blur-[0.7rem] transition-all duration-500 z-20
    ${isOpen ? "opacity-100" : "opacity-0 pointer-events-none"} ${
          isDarkMode ? "bg-black/60" : "bg-white/60"
        }`}
      >
        <div
          className={`w-full h-full flex items-center justify-left ml-[2rem] md:ml-[15rem] transition-all duration-500
      ${isOpen ? "scale-100 opacity-100" : "scale-95 opacity-0"}`}
        >
          <div className="text-left text-black dark:text-white">
            <div className="space-y-8">
              <Link
                href="/about"
                className="block font-sans text-6xl font-bold transition-all duration-500 md:text-8xl hover:text-gray-200 cursor-none dark:hover:text-gray-400"
              >
                notes
              </Link>
              <Link
                href="/gallery"
                className="block font-sans text-6xl font-bold transition-all duration-500 md:text-8xl hover:text-gray-200 cursor-none dark:hover:text-gray-400"
              >
                gallery
              </Link>
              <a
                href="#services"
                onClick={(e) => handleNavClick(e, "services")}
                className="block font-sans text-6xl font-bold transition-all duration-500 md:text-8xl hover:text-gray-200 cursor-none dark:hover:text-gray-400"
              >
                services
              </a>
              <a
                href="#updates"
                onClick={(e) => handleNavClick(e, "updates")}
                className="block font-sans text-6xl font-bold transition-all duration-500 md:text-8xl hover:text-gray-200 cursor-none dark:hover:text-gray-400"
              >
                updates
              </a>
              <a
                href="#contact"
                onClick={(e) => handleNavClick(e, "contact")}
                className="block font-sans text-6xl font-bold transition-all duration-500 md:text-8xl hover:text-gray-200 cursor-none dark:hover:text-gray-400"
              >
                contact
              </a>
            </div>
          </div>
        </div>
      </div>
  
  </>
  );
};

export default Background;