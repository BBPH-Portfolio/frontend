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
      <section className="mt-[8rem] h-auto grid grid-cols-1 2xl:grid-cols-2 grid-rows-1 gap-4 text-black dark:text-color1">
        <section className="flex justify-center relative items-center mt-[7rem] 2xl:mt-0">
          <GetImageS />
          {token && <DialogImage />}
        </section>

        <section className="pt-10">
          <h2 className="font-[HelveticaExtraBold] text-5xl text-left">
            products & services
            <br />
          </h2>

          <p className="text-[1.2rem] xl:text-[1.3rem] pt-[4rem] font-[HelveticaLight] w-auto lg:w-[38rem] text-justify">
            WE LOVE CREATING WAYS TO CONNECT, CHECK OUT OUR PRODUCTS AND
            SERVICES
          </p>

          <Accordion type="single" collapsible className="w-full mt-[7rem]">
            <AccordionItem
              value="item-1"
              className="border-b border-black dark:border-white "
            >
              <AccordionTrigger className="relative py-7 cursor-none">
                <div className="flex justify-between w-full">
                  <GetTexts1 placement="trigger" />
                  {token && <DialogText1 />}
                  <h2 className="text-2xl font-[HelveticaMedium]">01</h2>
                </div>
              </AccordionTrigger>
              <AccordionContent>
                <p className="pb-4">
                  <GetTexts1 placement="content" />
                </p>
              </AccordionContent>
            </AccordionItem>

            <AccordionItem
              value="item-2"
              className="border-b border-black dark:border-white"
            >
              <AccordionTrigger className="relative py-7 cursor-none">
                <div className="flex justify-between w-full">
                  <GetTexts2 placement="trigger" />
                  {token && <DialogText2 />}
                  <h2 className="text-2xl font-[HelveticaMedium]">02</h2>
                </div>
              </AccordionTrigger>
              <AccordionContent>
                <p className="pb-4">
                  <GetTexts2 placement="content" />
                </p>
              </AccordionContent>
            </AccordionItem>

            <AccordionItem
              value="item-3"
              className="border-b border-black dark:border-white"
            >
              <AccordionTrigger className="relative py-7 cursor-none">
                <div className="flex justify-between w-full">
                  <GetTexts3 placement="trigger" />
                  {token && <DialogText3 />}
                  <h2 className="text-2xl font-[HelveticaMedium]">03</h2>
                </div>
              </AccordionTrigger>
              <AccordionContent>
                <p className="pb-4">
                  <GetTexts3 placement="content" />
                </p>
              </AccordionContent>
            </AccordionItem>

            <AccordionItem
              value="item-4"
              className="border-b border-black dark:border-white"
            >
              <AccordionTrigger className="relative py-7 cursor-none">
                <div className="flex justify-between w-full">
                  <GetTexts4 placement="trigger" />
                  {token && <DialogText4 />}
                  <h2 className="text-2xl font-[HelveticaMedium]">04</h2>
                </div>
              </AccordionTrigger>
              <AccordionContent>
                <p className="pb-4">
                  <GetTexts4 placement="content" />
                </p>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </section>
      </section>
    </>
  );
};

export default ServiceSection;
