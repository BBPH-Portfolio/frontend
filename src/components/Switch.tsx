import { useEffect, useRef, useState } from "react";
import { useDarkMode } from "./navbar/Navbar";
import { gsap } from "gsap";

const Switch = () => {
  const { setDarkMode, isDarkMode } = useDarkMode();
  const [showNavbar, setShowNavbar] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const navRef = useRef<HTMLDivElement>(null);

  const handleThemeChange = () => {
    setDarkMode(!isDarkMode);
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
          y: "-110%",
          opacity: 0,
          duration: 1,
          ease: "power2.out",
        });
      }
    }
  }, [showNavbar]);

  return (
    <div className="sm:relative sm:top-0 sm:right-0 absolute mr-5 top-10 -right-5" ref={navRef}> 
      <style jsx>{`
        .theme-checkbox {
          --toggle-size: 10px;
          font-size: var(--toggle-size);
          background-size: 205%;
          transition: all 0.4s;
        }
        .theme-checkbox:checked {
          background-position: 100%;
        }
        .theme-checkbox::before {
          content: "";
          transition: all 0.4s;
          background-size: 205%;
        }
        .theme-checkbox:checked::before {
          left: calc(100% - 2.25em - 0.438em);
          background-position: 0;
        }
      `}</style>
      <input
        type="checkbox"
        checked={isDarkMode}
        onChange={handleThemeChange}
        className="theme-checkbox appearance-none w-[6.25em] h-[3.125em] 
                   bg-gradient-to-r from-[#efefef] from-50% to-[#2a2a2a] to-50% 
                   bg-[position:0] rounded-full cursor-none relative
                   before:w-[2.25em] before:h-[2.25em] before:absolute 
                   before:top-[0.438em] before:left-[0.438em] 
                   before:rounded-full
                   before:bg-gradient-to-r before:from-[#efefef] before:from-50% 
                   before:to-[#2a2a2a] before:to-50% before:bg-[position:100%]"
      />
    </div>
  );
};

export default Switch;
