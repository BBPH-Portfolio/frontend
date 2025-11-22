"use client";
import { useState, useEffect } from "react";
import { GetTexts1 } from "./components/text1/GetTexts";
import DialogText1 from "./components/text1/DialogText";
import { GetTexts2 } from "./components/text2/GetTexts";
import { DialogText2 } from "./components/text2/DialogText";
import { GetTexts3 } from "./components/text3/GetTexts";
import { DialogText3 } from "./components/text3/DialogText";
import { GetTexts4 } from "./components/text4/GetTexts";
import { DialogText4 } from "./components/text4/DialogText";
import { GetTextsTitle } from "./components/title/GetTexts";
import DialogTextTitle from "./components/title/DialogText";
import { create } from "zustand";
import Image from "next/image";
import Link from "next/link";
import { ChevronDown, ChevronUp } from "lucide-react";

interface Image {
  _id: string;
  url: string;
  subsection: string;
}

interface ServiceStore {
  images: Image[];
  currentImage: string | null;
  isTransitioning: boolean;
  setImages: (images: Image[]) => void;
  setCurrentImage: (url: string | null) => void;
  setIsTransitioning: (isTransitioning: boolean) => void;
  fetchImages: () => Promise<void>;
  handleHover: (subsection: string) => Promise<void>;
}

export const useServiceStore = create<ServiceStore>((set, get) => ({
  images: [],
  currentImage: null,
  isTransitioning: false,

  setImages: (images) => set({ images }),
  setCurrentImage: (currentImage) => set({ currentImage }),
  setIsTransitioning: (isTransitioning) => set({ isTransitioning }),

  fetchImages: async () => {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/images/section/services`
      );
      if (response.ok) {
        const data = await response.json();
        set({ images: data, currentImage: data[0]?.url || null });
      } else {
        console.error("Error al obtener las imágenes:", response.status);
      }
    } catch (error) {
      console.error("Error general:", error);
    }
  },

  handleHover: async (subsection) => {
    set({ isTransitioning: true });
    const image = get().images.find((img) => img.subsection === subsection);
    if (image) {
      await new Promise((resolve) => setTimeout(resolve, 300));
      set({ currentImage: image.url, isTransitioning: false });
    }
  },
}));

const ServiceSection = () => {
  const [token, setToken] = useState(false);
  const [expandedIndex, setExpandedIndex] = useState<number | null>(null);
  const [isDesktop, setIsDesktop] = useState(false);
  const { images, currentImage, isTransitioning, fetchImages, handleHover } =
    useServiceStore();

  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    if (storedToken) setToken(true);
  }, []);

  useEffect(() => {
    fetchImages();
  }, []);

  useEffect(() => {
    const checkDesktop = () => {
      setIsDesktop(window.matchMedia("(hover: hover)").matches);
    };
    checkDesktop();
    window.addEventListener("resize", checkDesktop);
    return () => window.removeEventListener("resize", checkDesktop);
  }, []);

  const services = ["01", "02", "03", "04"];
  const serviceRoutes = [
    "/services/01",
    "/services/02",
    "/services/03",
    "/services/04",
  ];

  const handleMouseEnter = (index: number, subsection: string) => {
    if (isDesktop) {
      setExpandedIndex(index);
      handleHover(subsection);
    }
  };

  const handleMouseLeave = () => {
    if (isDesktop) {
      setExpandedIndex(null);
    }
  };

  return (
    <>
      <section className="mb-[20rem] h-auto grid grid-cols-1 2xl:grid-cols-2 grid-rows-1 gap-24 text-black dark:text-color1">
        <section className="flex justify-center relative items-center mt-[7rem] 2xl:mt-0">
          {currentImage && (
            <div className="w-full max-w-[90%] min-h-[400px] relative">
              <Image
                src={currentImage}
                alt="Imagen de servicio"
                width={1000}
                height={1000}
                className={`w-full h-full object-contain transition-all duration-500 ease-in-out ${
                  isTransitioning ? "opacity-0" : "opacity-100"
                }`}
                priority
                loading="eager"
              />
            </div>
          )}
        </section>

        <section className="relative pt-10">
          <div>
            <GetTextsTitle placement="trigger" />
            <br />
            <GetTextsTitle placement="content" />
            {token && <DialogTextTitle />}
          </div>
          <div className="w-full mt-[7rem]">
            {services.map((subsection, index) => (
              <div
                key={index}
                className="relative border-b border-black dark:border-white"
              >
                {token && (
                  <div className="absolute top-10 left-0 z-20 pointer-events-auto">
                    {index === 0 && (
                      <DialogText1
                        imageId={
                          images.find((img) => img.subsection === "01")?._id
                        }
                      />
                    )}
                    {index === 1 && (
                      <DialogText2
                        imageId={
                          images.find((img) => img.subsection === "02")?._id
                        }
                      />
                    )}
                    {index === 2 && (
                      <DialogText3
                        imageId={
                          images.find((img) => img.subsection === "03")?._id
                        }
                      />
                    )}
                    {index === 3 && (
                      <DialogText4
                        imageId={
                          images.find((img) => img.subsection === "04")?._id
                        }
                      />
                    )}
                  </div>
                )}

                <Link href={serviceRoutes[index]} className="block cursor-none">
                  <div
                    className="relative py-10 group"
                    onMouseEnter={() => handleMouseEnter(index, subsection)}
                    onMouseLeave={handleMouseLeave}
                  >
                    <div
                      className="w-screen h-[100px] absolute right-[0rem]"
                      onMouseEnter={() => handleMouseEnter(index, subsection)}
                      onMouseLeave={handleMouseLeave}
                    />
                    <div className="flex justify-between w-full items-center">
                      <div className="flex-1">
                        {index === 0 && <GetTexts1 placement="trigger" />}
                        {index === 1 && <GetTexts2 placement="trigger" />}
                        {index === 2 && <GetTexts3 placement="trigger" />}
                        {index === 3 && <GetTexts4 placement="trigger" />}
                      </div>
                      <div className="transition-transform duration-300">
                        {expandedIndex === index && isDesktop ? (
                          <ChevronUp className="w-5 h-5" />
                        ) : (
                          <ChevronDown className="w-5 h-5" />
                        )}
                      </div>
                    </div>

                    <div
                      className={`overflow-hidden transition-all duration-300 ease-in-out ${
                        expandedIndex === index && isDesktop
                          ? "max-h-96 opacity-100 mt-4"
                          : "max-h-0 opacity-0"
                      }`}
                    >
                      <div className="pb-4 sm:text-[1rem] text-sm">
                        {index === 0 && <GetTexts1 placement="content" />}
                        {index === 1 && <GetTexts2 placement="content" />}
                        {index === 2 && <GetTexts3 placement="content" />}
                        {index === 3 && <GetTexts4 placement="content" />}
                      </div>
                    </div>
                  </div>
                </Link>
              </div>
            ))}
          </div>
        </section>
      </section>
    </>
  );
};

export default ServiceSection;
