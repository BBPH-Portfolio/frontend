"use client";
import React, { useEffect, useState } from "react";

import { GetText } from "./components/textRight/GetTexts";
import DialogText from "./components/textRight/Dialog";
import { GetTextLeft } from "./components/textLeft/GetTexts";
import DialogTextLeft from "./components/textLeft/Dialog";
import { GetTextTitle } from "./components/title/GetTexts";
import DialogTextTitle from "./components/title/Dialog";

const HeroSection = () => {
  const [token, setToken] = useState(false);
  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    if (storedToken) setToken(true);
  }, []);

  return (
    <section className="relative flex items-center justify-center h-screen">
      <div className="relative">
        <GetTextTitle />
        {token && <DialogTextTitle />}
      </div>

      <GetText />
      {token && <DialogText />}

      <GetTextLeft />
      {token && <DialogTextLeft />}
    </section>
  );
};

export default HeroSection;
