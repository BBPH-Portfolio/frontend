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

const ServiceSection = () => {
  const [token, setToken] = useState(false);
  const [isTransitioning, setIsTransitioning] = useState(false);

  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    if (storedToken) setToken(true);
  }, []);

  const [images, setImages] = useState<
    Array<{
      _id: string;
      url: string;
      subsection: string;
    }>
  >([]);

  const [currentImage, setCurrentImage] = useState<string | null>(null);

  useEffect(() => {
    const fetchImages = async () => {
      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/images/section/services`
        );
        if (response.ok) {
          const data = await response.json();
          setImages(data);
          setCurrentImage(data[0]?.url || null);
        } else {
          console.error("Error al obtener las imágenes:", response.status);
        }
      } catch (error) {
        console.error("Error general:", error);
      }
    };

    fetchImages();
  }, []);

  const handleHover = async (subsection: string) => {
    setIsTransitioning(true);
    const image = images.find((img) => img.subsection === subsection);
    if (image) {
      await new Promise((resolve) => setTimeout(resolve, 300));
      setCurrentImage(image.url);
      setIsTransitioning(false);
    }
  };

  return (
    <>
      <section className="mb-[20rem] h-auto grid grid-cols-1 2xl:grid-cols-2 grid-rows-1 gap-24 text-black dark:text-color1">
        <section className="flex justify-center relative items-center mt-[7rem] 2xl:mt-0">
          {currentImage && (
            <div className="w-full max-w-[90%] min-h-[400px] relative">
              <img
                src={currentImage}
                alt="Imagen de servicio"
                className={`w-full h-full object-contain transition-all duration-500 ease-in-out ${
                  isTransitioning ? "opacity-0" : "opacity-100"
                }`}
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
