"use client";
import React, { useEffect, useState } from "react";

import { GetText } from "./components/textRight/GetTexts";
import DialogText from "./components/textRight/Dialog";
import { GetTextLeft } from "./components/textLeft/GetTexts";
import DialogTextLeft from "./components/textLeft/Dialog";
import Link from "next/link";
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
      <div
        className="absolute top-[13rem] left-0 bg-[#c38fff] p-2 
      transition-all duration-300 ease-in-out 
      hover:scale-105 hover:shadow-lg 
      hover:bg-[#9436ff]"
      >
        <Link
          className="text-sm italic text-white dark:text-black 
      transition-colors duration-300 
      group-hover:text-gray-300 dark:group-hover:text-gray-700 cursor-none"
          href="https://mail.google.com/mail/?view=cm&fs=1&to=brianbecerraph@gmail.com"
          target="_blank"
        >
          LET&apos;S CREATE
        </Link>
      </div>
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
