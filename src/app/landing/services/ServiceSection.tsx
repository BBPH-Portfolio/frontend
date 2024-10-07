"use client";
import { useState, useEffect } from "react";
import { ArrowUp } from "lucide-react";
import { GetImageS } from "./components/Images/GetImage";
import { DialogImage } from "./components/Images/DialogImage";
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
          <div className="flex justify-center 2xl:block 2xl:justify-normal">
            <div className="flex flex-col items-center grid-cols-1 grid-rows-2 mt-40 gap-x-4 2xl:w-auto w-[30rem] md:w-[45rem] sm:grid-cols-2 sm:grid">
              <div className="border-y border-black dark:border-white flex h-auto flex-col w-[14rem] md:w-[20rem]">
                <div className="py-4">
                  <h2 className="text-2xl mb-2 font-[HelveticaMedium]">
                    CREATIVE
                  </h2>
                  <p className=" md:text-[1rem] text-[0.8rem] text-[#8B8B8B]">
                    DIVE INTO CONCEPTS TO FIND THE ONE THAT SUITS BEST FOR A
                    PERSONA / BRAND
                  </p>
                  <div className="flex items-center mt-4">
                    <div className="bg-black dark:bg-white h-[2rem] w-[2rem]  rounded-full flex items-center justify-center cursor-pointer">
                      {" "}
                      <ArrowUp className="text-white dark:text-black rotate-45" />{" "}
                    </div>
                  </div>
                </div>
              </div>

              <div className="border-y border-black dark:border-white flex h-auto flex-col w-[14rem] md:w-[20rem]">
                <div className="py-4">
                  <h2 className="text-2xl mb-2 font-[HelveticaMedium]">
                    LIGHTING STUDIO
                  </h2>
                  <p className="md:text-[1rem] text-[0.8rem] text-[#8B8B8B]">
                    SHAPING AN IDEA ON PAPER BRINGS THE BEST CAMPAIGNS
                  </p>
                  <div className="flex items-center mt-4">
                    <div className="bg-black dark:bg-white h-[2rem] w-[2rem]  rounded-full flex items-center justify-center cursor-pointer">
                      {" "}
                      <ArrowUp className="text-white dark:text-black rotate-45" />{" "}
                    </div>
                  </div>
                </div>
              </div>

              <div className="border-b border-black dark:border-white flex h-auto flex-col w-[14rem] md:w-[20rem] ">
                <div className="py-4">
                  <h2 className="text-2xl mb-2 font-[HelveticaMedium]">
                    EQUIPMENT
                  </h2>
                  <p className="md:text-[1rem] text-[0.8rem] text-[#8B8B8B]">
                    TECH EQUIPMENT IS SO IMPORTANT TO CREATE GOOD IDEAS
                  </p>
                  <div className="flex items-center mt-4">
                    <div className="bg-black dark:bg-white h-[2rem] w-[2rem]  rounded-full flex items-center justify-center cursor-pointer">
                      {" "}
                      <ArrowUp className="text-white dark:text-black rotate-45" />{" "}
                    </div>
                  </div>
                </div>
              </div>

              <div className="border-b border-black dark:border-white flex h-auto flex-col w-[14rem] md:w-[20rem]">
                <div className="py-4">
                  <h2 className="text-2xl mb-2 font-[HelveticaMedium]">
                    CREW ON OF SET
                  </h2>
                  <p className="md:text-[1rem] text-[0.8rem] text-[#8B8B8B]">
                    TEAMS TO WORK HAND IN HAND TO ACHIEVE SOMETHING IMPRESSIVE
                  </p>
                  <div className="flex items-center mt-4">
                    <div className="bg-black dark:bg-white h-[2rem] w-[2rem]  rounded-full flex items-center justify-center cursor-pointer">
                      <ArrowUp className="text-white dark:text-black rotate-45" />{" "}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
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
