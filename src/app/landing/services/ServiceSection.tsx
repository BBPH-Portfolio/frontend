"use client";
import { useState, useEffect } from "react";
import { GetImageS } from "./components/Images/GetImage";
import { DialogImage } from "./components/Images/DialogImage";
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

const ServiceSection = () => {
  const [token, setToken] = useState(false);

  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    if (storedToken) setToken(true);
  }, []);

  return (
    <>
      <section className="mt-[3rem] h-auto grid grid-cols-1 2xl:grid-cols-2 grid-rows-1 gap-4 text-black dark:text-color1">
        <section className="pt-40">
          <h2 className="font-[HelveticaExtraBold] text-5xl">
            PRODUCTS & SERVICES
            <br />
          </h2>
          <Accordion type="single" collapsible className="w-full mt-[9rem]">
            <AccordionItem
              value="item-1"
              className="border-t border-black dark:border-white "
            >
              <AccordionTrigger className="py-4 cursor-none relative">
                <div>
                  <GetTexts1 />
                  {token && <DialogText1 />}
                </div>
              </AccordionTrigger>
              <AccordionContent>
                <p className="pb-4">
                  Contenido detallado sobre servicios creativos...
                </p>
              </AccordionContent>
            </AccordionItem>

            <AccordionItem
              value="item-2"
              className="border-b border-black dark:border-white"
            >
              <AccordionTrigger className="py-4 cursor-none relative">
                <div>
                  <GetTexts2 />
                  {token && <DialogText2 />}
                </div>
              </AccordionTrigger>
              <AccordionContent>
                <p className="pb-4">
                  Información sobre nuestro estudio de iluminación...
                </p>
              </AccordionContent>
            </AccordionItem>

            <AccordionItem
              value="item-3"
              className="border-b border-black dark:border-white"
            >
              <AccordionTrigger className="py-4 cursor-none relative">
                <div>
                  <GetTexts3 />
                  {token && <DialogText3 />}
                </div>
              </AccordionTrigger>
              <AccordionContent>
                <p className="pb-4">
                  Detalles sobre nuestro equipamiento tecnológico...
                </p>
              </AccordionContent>
            </AccordionItem>

            <AccordionItem
              value="item-4"
              className="border-b border-black dark:border-white"
            >
              <AccordionTrigger className="py-4 cursor-none relative">
                <div>
                  <GetTexts4 />
                  {token && <DialogText4 />}
                </div>
              </AccordionTrigger>
              <AccordionContent>
                <p className="pb-4">
                  Información sobre nuestro equipo de producción...
                </p>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </section>

        <section className="flex justify-center relative items-center mt-[7rem] 2xl:mt-0">
          <GetImageS />
          {token && <DialogImage />}
        </section>
      </section>
    </>
  );
};

export default ServiceSection;
