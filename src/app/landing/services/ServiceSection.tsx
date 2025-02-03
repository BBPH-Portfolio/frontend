"use client";
import { useState, useEffect } from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
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
  const { images, currentImage, isTransitioning, fetchImages, handleHover } =
    useServiceStore();

  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    if (storedToken) setToken(true);
  }, []);

  useEffect(() => {
    fetchImages();
  }, []);

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

          {["01", "02", "03", "04"].map((subsection, index) => (
            <div
              key={index}
              className="absolute hidden sm:block top-0 right-0 w-screen h-[100px] mt-[23rem]"
              style={{ top: `${7 * index}rem` }}
              onMouseEnter={() => handleHover(subsection)}
            />
          ))}

          <Accordion type="single" collapsible className="w-full mt-[7rem]">
            {["01", "02", "03", "04"].map((subsection, index) => (
              <AccordionItem
                key={index}
                value={`item-${index + 1}`}
                className="border-b border-black dark:border-white"
                onMouseEnter={() => handleHover(subsection)}
              >
                <AccordionTrigger className="relative py-10 cursor-none">
                  <div className="flex justify-between w-full">
                    {index === 0 && <GetTexts1 placement="trigger" />}
                    {index === 1 && <GetTexts2 placement="trigger" />}
                    {index === 2 && <GetTexts3 placement="trigger" />}
                    {index === 3 && <GetTexts4 placement="trigger" />}
                    {token && (
                      <>
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
                      </>
                    )}
                    <h2 className="sm:text-[1rem] text-sm tracking-[.3rem]">
                      {subsection}
                    </h2>
                  </div>
                </AccordionTrigger>
                <AccordionContent>
                  <p className="pb-4 sm:text-[1rem] text-sm">
                    {index === 0 && <GetTexts1 placement="content" />}
                    {index === 1 && <GetTexts2 placement="content" />}
                    {index === 2 && <GetTexts3 placement="content" />}
                    {index === 3 && <GetTexts4 placement="content" />}
                  </p>
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </section>
      </section>
    </>
  );
};

export default ServiceSection;
