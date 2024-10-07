import Image from "next/image";
import First_project from "../../../../public/media/First_project.png";
import { GetImage1 } from "./components/Img1/Images/GetImage";
import { useState, useEffect } from "react";
import { DialogImage } from "./components/Img1/Images/DialogImage";
import { GetImage2 } from "./components/img2/Images/GetImage";
import { DialogImage2 } from "./components/img2/Images/DialogImage";
import { GetImage3 } from "./components/Img3/Images/GetImage";
import { DialogImage3 } from "./components/Img3/Images/DialogImage";
import { GetTexts } from "./components/text1/GetTexts";
import DialogText from "./components/text1/DialogText";
import { GetTexts2 } from "./components/text2/GetTexts";
import DialogText2 from "./components/text2/DialogText";
import { GetTexts3 } from "./components/text3/GetTexts";
import DialogText3 from "./components/text3/DialogText";
import { GetTexts4 } from "./components/text4/GetTexts";
import DialogText4 from "./components/text4/DialogText";
import { GetTexts5 } from "./components/text5/GetTexts";
import DialogText5 from "./components/text5/DialogText";

const LastUpdates = () => {
  const [token, setToken] = useState(false);

  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    if (storedToken) setToken(true);
  }, []);

  return (
    <>
      <div className="h-auto mt-28 mb-20 text-black dark:text-color1">
        <div className="w-[88%] mx-auto max-w-[100.75rem]">
          <div className="w-full flex items-center justify-center mt-20">
            <h2 className="font-[HelveticaExtraBold] text-5xl">
              LATEST UPDATES
            </h2>
          </div>

          <div className="grid grid-cols-2 grid-rows-1 gap-0 mt-[5rem] xl:grid-cols-4">
            <div className="flex flex-col border-r border-black dark:border-white h-auto mb-20 xl:mb-0">
              <section className="p-3 pr-5 relative">
                <div>
                  <GetTexts />
                  {token && <DialogText />}
                </div>

                <div className="flex justify-center xl:block relative">
                  <GetImage1 />
                  {token && <DialogImage />}
                </div>
              </section>
            </div>

            <div className="flex flex-col border-black dark:border-white h-auto xl:border-r">
              <section className="p-5">
                <div className="w-full flex justify-center relative">
                  <GetImage2 />
                  {token && <DialogImage2 />}
                </div>
                <div className="relative">
                  <GetTexts2 />
                  {token && <DialogText2 />}
                </div>
              </section>
            </div>

            <div className="hidden flex-col border-r border-black dark:border-white h-auto lg:flex">
              <section className="p-5">
                <div className="w-full flex justify-center relative">
                  <GetImage3 />
                  {token && <DialogImage3 />}
                </div>
                <div className="relative">
                  <GetTexts3 />
                  {token && <DialogText3 />}
                </div>
              </section>
            </div>

            <div className="hidden flex-col border-black dark:border-white h-auto xl:border-r lg:flex">
              <section className="p-5">
                <div className="relative">
                  <GetTexts4 />
                  {token && <DialogText4 />}
                </div>

                <div className="pt-5 flex">
                  <div className="h-0 w-full border border-black dark:border-white my-10"></div>
                </div>

                <div className="relative">
                  <GetTexts5 />
                  {token && <DialogText5 />}
                </div>
              </section>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default LastUpdates;
