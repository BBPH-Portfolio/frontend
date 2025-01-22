import { useMixBlend } from "@/store/store";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { useDarkMode } from "./Navbar";
import { useRouter, usePathname } from "next/navigation"; 
import Switch from "../Switch";

const DropDonwn = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { mixBlend, setMixBlend } = useMixBlend();
  const [lastScrollY, setLastScrollY] = useState(0);
  const [showNavbar, setShowNavbar] = useState(true);
  const { isDarkMode } = useDarkMode();
  const router = useRouter();
  const pathname = usePathname();


  const navRef = useRef<HTMLButtonElement>(null);

  const handleMenuToggle = () => {
    setIsOpen(!isOpen);
    setMixBlend(!mixBlend);
    console.log("mix:", mixBlend);
  };

  useEffect(() => {
    if (navRef.current) {
      gsap.set(navRef.current, { y: "-100%", opacity: 0 });
      gsap.to(navRef.current, {
        y: "0%",
        opacity: 1,
        duration: 1.5,
        ease: "power2.out",
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
          ease: "power2.out",
        });
      } else {
        gsap.to(navRef.current, {
          y: "-200%",
          opacity: 0,
          duration: 1,
          ease: "power2.out",
        });
      }
    }
  }, [showNavbar]);

  const handleNavClick = async (
    e: React.MouseEvent<HTMLAnchorElement, MouseEvent>,
    sectionId: string
  ) => {
    e.preventDefault();
    setIsOpen(false);  
  
    if (pathname === '/') {
      const element = document.getElementById(sectionId);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    } else {
      router.push('/');
      setTimeout(() => {
        const element = document.getElementById(sectionId);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
        }
      }, 100);
    }
  };

  return (
    <>
     <Switch />
      <button
        onClick={handleMenuToggle}
        className="cursor-none relative z-50"
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
          <div className="text-black dark:text-white text-left">
            <div className="space-y-8">
              <Link
                href="/about"
                className="block text-8xl  font-bold font-sans hover:text-gray-200 cursor-none transition-all duration-500 dark:hover:text-gray-400"
              >
                notes
              </Link>
              <Link
                href="/gallery"
                className="block text-8xl font-bold font-sans hover:text-gray-200 cursor-none transition-all duration-500 dark:hover:text-gray-400"
              >
                gallery
              </Link>
              <a
                href="#services"
                onClick={(e) => handleNavClick(e, "services")}
                className="block text-8xl font-bold font-sans hover:text-gray-200 cursor-none transition-all duration-500 dark:hover:text-gray-400"
              >
                services
              </a>
              <a
                href="#updates"
                onClick={(e) => handleNavClick(e, "updates")}
                className="block text-8xl font-bold font-sans hover:text-gray-200 cursor-none transition-all duration-500 dark:hover:text-gray-400"
              >
                updates
              </a>
              <a
                href="#contact"
                onClick={(e) => handleNavClick(e, "contact")}
                className="block text-8xl font-bold font-sans hover:text-gray-200 cursor-none transition-all duration-500 dark:hover:text-gray-400"
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
