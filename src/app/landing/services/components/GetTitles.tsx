"use client";
import { useEffect } from "react";
import { useTitlesStore } from "../store/UseTitlesStore";
import { fetchTitles } from "../hooks/FetchTitles";
import { useLanguage } from "@/components/navbar/Navbar";
import Link from "next/link";
import { usePathname } from "next/navigation";

export const GetTitles = () => {
  const { titles, setTitles } = useTitlesStore();
  const { Spanish } = useLanguage();
  const pathname = usePathname();

  useEffect(() => {
    const loadTitles = async () => {
      const language = Spanish ? "es" : "en";
      const data = await fetchTitles(language);
      if (data) {
        setTitles(data);
      }
    };

    loadTitles();
  }, [Spanish, setTitles]);

  const serviceRoutes = [
    "/services/01",
    "/services/02",
    "/services/03",
    "/services/04",
  ];

  const getActiveIndex = () => {
    if (pathname?.includes("/01")) return 0;
    if (pathname?.includes("/02")) return 1;
    if (pathname?.includes("/03")) return 2;
    if (pathname?.includes("/04")) return 3;
    return -1;
  };

  const activeIndex = getActiveIndex();


  
  return (
    <div className="gap-0 xl:gap-14 w-fit flex relative left-[7%] md:left-[16%] top-20 justify-between xl:flex-row flex-col xl:mt-0 mt-28 pb-10">
      {titles.map((title, index) => (
        <div key={index} className="mt-6 xl:mt-[4rem] md:text-[1rem] text-sm flex">
          <Link
            href={serviceRoutes[index]}
            className={`cursor-none mr-0 xl:mr-2 tracking-[.3rem] flex-shrink-0 ${
              activeIndex === index
                ? "text-black dark:text-color1"
                : "text-[#8B8B8B]"
            }`}
          >
            {title}
          </Link>
        </div>
      ))}
    </div>
  );
};
