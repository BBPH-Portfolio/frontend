import { useMixBlend } from "@/store/store";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { useDarkMode, useLanguage } from "./Navbar";
import { useRouter, usePathname } from "next/navigation";
import Switch from "../Switch";

const DropDonwn = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { mixBlend, setMixBlend } = useMixBlend();
  const [lastScrollY, setLastScrollY] = useState(0);
  const [showNavbar, setShowNavbar] = useState(true);
  const { Spanish, setLanguage } = useLanguage();
  const { isDarkMode } = useDarkMode();
  const router = useRouter();
  const pathname = usePathname();

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

  const handleChangueLanguage = () => {
    setLanguage(!Spanish);
  };

  return (
    <>
      <button
        onClick={handleChangueLanguage}
        className="text-black dark:text-white cursor-none sm:mr-5 mr-0 sm:relative sm:top-0 absolute top-[6rem] md:text-[1rem] text-sm"
        ref={buttonref}
      >
        {Spanish ? "english" : "español"}
      </button>
      <Switch />
      <button
        onClick={handleMenuToggle}
        className="relative z-50 cursor-none"
        ref={navRef}
      >
        <div
          className={`relative h-5 w-7 transition-all duration-200 ${
            isOpen ? "rotate-45" : ""
          }`}
        >
          <span
            className={`absolute left-0 top-0 h-[2px] w-full bg-black dark:bg-white transition-all duration-200 ${
              isOpen ? "top-1/2 -translate-y-1/2 rotate-90" : "top-0"
            }`}
          />
          <span
            className={`absolute left-0 top-1/2 h-[2px] w-full bg-black dark:bg-white -translate-y-1/2 transition-all duration-200 ${
              isOpen ? "left-1/2 -translate-x-1/2 rotate-0" : "left-0"
            }`}
          />
        </div>
      </button>

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

export default DropDonwn;
