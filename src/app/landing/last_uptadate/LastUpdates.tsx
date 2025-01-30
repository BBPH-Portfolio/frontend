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
   <div className="h-auto mb-20 text-black mt-36 dark:text-color1">
  <div className="w-[88%] mx-auto max-w-[100.75rem]">
    <div className="flex items-center justify-center w-full mt-20">
      <h2 className="font-[HelveticaExtraBold] text-4xl sm:text-5xl md:text-6xl">
        updates
      </h2>
    </div>

    <div className="grid grid-cols-1 gap-6 mt-10 md:grid-cols-4 sm:mt-20 sm:gap-10 md:gap-14">
      
      <div className="relative flex justify-center aspect-square md:col-start-1 md:row-start-1">
        <div>
          <GetTexts />
          {token && <DialogText />}
        </div>
      </div>

  
      <div className="relative flex items-center justify-center md:col-start-1 md:row-start-2">
        <GetImage1 />
        {token && <DialogImage />}
      </div>

    
      <div className="relative flex justify-center md:col-start-2 md:row-start-2">
        <div>
          <GetTexts2 />
          {token && <DialogText2 />}
        </div>
      </div>

      <div className="relative flex items-center justify-center md:col-start-2 md:row-start-1">
        <GetImage2 />
        {token && <DialogImage2 />}
      </div>

      
      <div className="relative justify-center hidden md:flex md:col-start-3 md:row-start-1">
        <div>
          <GetTexts3 />
          {token && <DialogText3 />}
        </div>
      </div>

      <div className="relative items-center justify-center hidden md:flex md:col-start-3 md:row-start-2">
        <GetImage3 />
        {token && <DialogImage3 />}
      </div>

      <div className="relative justify-center hidden md:flex md:col-start-4 md:row-start-1">
        <div>
          <GetTexts4 />
          {token && <DialogText4 />}
        </div>
      </div>

      <div className="relative justify-center hidden md:flex md:col-start-4 md:row-start-2">
        <div>
          <GetTexts5 />
          {token && <DialogText5 />}
        </div>
      </div>
    </div>
  </div>
</div>
    </>
  );
};

export default LastUpdates;
