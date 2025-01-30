"use client";
import { useEffect, useState } from "react";
import { DialogImage } from "./components/Images/DialogImage";
import { GetImage } from "./components/Images/GetImage";
import { GetTexts } from "./components/Texts/GetTexts";
import DialogText from "./components/Texts/DialogText";
import Link from "next/link";

const PictureSection = () => {
  const [token, setToken] = useState(false);
  const [hoverIndex, setHoverIndex] = useState<number | null>(null);

  const sections = [
    { label: "NOTES", route: "/about" },
    { label: "COMMERCIAL", route: "/gallery/commercial" },
    { label: "RAW", route: "/gallery/raw" },
  ];

  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    if (storedToken) setToken(true);
  }, []);

  return (
    <section className="h-auto grid grid-cols-1 gap-4 text-black dark:text-color1 xl:grid-cols-2 mb-[10rem]">
      
    <section className="pt-40 relative h-[55rem]">
      <GetTexts />
      {token && <DialogText />}

      <div className="relative mt-[5rem]">
        {sections.map(({ label, route }, idx) => (
          <Link href={route} key={label}>
            <div
              className="border-b border-black dark:border-white flex items-center h-[9rem] justify-between text-[1rem] tracking-[.3rem] relative overflow-hidden group dark:hover:text-black hover:text-white cursor-none"
              onMouseEnter={() => setHoverIndex(idx)}
              onMouseLeave={() => setHoverIndex(null)}
            >
              <h2 className="relative z-10 transition-transform duration-300 group-hover:translate-x-2 sm:text-[1rem] text-sm">{`0${idx + 1}`}</h2>
              <h2 className="relative z-10 transition-transform duration-300 group-hover:-translate-x-2 sm:text-[1rem] text-sm">{label}</h2>
              <div
                className="absolute inset-0 transition-all duration-300 ease-out transform -translate-x-full bg-black opacity-0 dark:bg-white group-hover:opacity-20 group-hover:translate-x-0"
              />
            </div>
          </Link>
        ))}
        <div
          className="absolute inset-0 transition-all duration-500 ease-out bg-black pointer-events-none dark:bg-white"
          style={{
            opacity: hoverIndex !== null ? 1.2 : 0,
            transform: `translateY(${hoverIndex !== null ? hoverIndex * 144 : 0}px)`,
            height: '9rem',
          }}
        />
      </div>
    </section>

    <section className="relative flex justify-center mt-10 xl:justify-end xl:mt-0">
      <GetImage />
      {token && <DialogImage />}
    </section>
  </section>
  );
};

export default PictureSection;
