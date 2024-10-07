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

  // Lista de etiquetas con rutas únicas
  const sections = [
    { label: "PORTRAIT", route: "/gallery" },
    { label: "COMMERCIAL", route: "/gallery/commercial" },
    { label: "RAW", route: "/gallery/raw" },
    { label: "MANIFESTO", route: "/about" }
  ];

  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    if (storedToken) setToken(true);
  }, []);

  return (
    <section className="h-auto grid grid-cols-1 gap-4 text-black dark:text-color1 mt-[-5rem] xl:grid-cols-2">
      <section className="pt-40 relative h-[55rem]">
        <GetTexts />
        {token && <DialogText />}
        <div className="relative mt-[8rem]">
          {sections.map(({ label, route }, idx) => (
            <Link href={route} key={label}>
              <div
                className="border-b border-black dark:border-white flex items-center h-[4rem] justify-between text-[1rem] tracking-[.3rem] relative overflow-hidden group dark:hover:text-black hover:text-white cursor-none"
                onMouseEnter={() => setHoverIndex(idx)}
                onMouseLeave={() => setHoverIndex(null)}
              >
                <h2 className="z-10 relative transition-transform duration-300 group-hover:translate-x-2">{`0${idx + 1}`}</h2>
                <h2 className="z-10 relative transition-transform duration-300 group-hover:-translate-x-2">{label}</h2>
                <div
                  className="absolute inset-0 bg-black dark:bg-white transition-all duration-300 ease-out opacity-0 group-hover:opacity-20 transform -translate-x-full group-hover:translate-x-0"
                />
              </div>
            </Link>
          ))}
          <div
            className="absolute inset-0 bg-black dark:bg-white transition-all duration-300 ease-out pointer-events-none"
            style={{
              opacity: hoverIndex !== null ? 1.2 : 0,
              transform: `translateY(${hoverIndex !== null ? hoverIndex * 64 : 0}px)`,
              height: '4rem',
            }}
          />
        </div>
      </section>

      <section className="flex justify-center relative xl:justify-end xl:mt-0 mt-[8rem]">
        <GetImage />
        {token && <DialogImage />}
      </section>
    </section>
  );
};

export default PictureSection;;